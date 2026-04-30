"use strict";
/**
 * toolkit.ts — @hrms/shared Validation Toolkit
 *
 * 7 framework-agnostic validators for HR field validation.
 * All return { ok: boolean; message?: string } — Zod .refine() compatible.
 * Zero external dependencies: no React, Zod, NestJS, class-validator.
 *
 * Algorithm reference:
 *   Thai National ID checksum (BRD Appendix 5):
 *     weights = [13,12,11,10,9,8,7,6,5,4,3,2] for digits d1..d12
 *     sum = Σ(di × wi)
 *     check = (11 − sum mod 11) mod 10
 *     valid iff d13 === check
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.thaiNationalId = thaiNationalId;
exports.thaiPhone = thaiPhone;
exports.email = email;
exports.dobBeforeHire = dobBeforeHire;
exports.salaryCurrencyPair = salaryCurrencyPair;
exports.contractEndDateRequired = contractEndDateRequired;
exports.nameNoDigits = nameNoDigits;
// Supported currencies — single source of truth for salaryCurrencyPair
const SUPPORTED_CURRENCIES = new Set([
    'THB',
    'USD',
    'EUR',
    'SGD',
    'JPY',
    'CNY',
    'GBP',
    'AUD',
    'HKD',
    'MYR',
]);
// ---------------------------------------------------------------------------
// 1. thaiNationalId
// ---------------------------------------------------------------------------
/**
 * Validates a Thai National ID number.
 * - Must be exactly 13 numeric digits (string)
 * - Last digit must satisfy the mod-11 checksum
 * - Prefix 8 or 9 (foreigner sentinels) are treated normally — checksum still applies
 */
function thaiNationalId(value) {
    if (!value || value.length !== 13) {
        return { ok: false, message: 'เลขบัตรประชาชนต้องมี 13 หลัก' };
    }
    if (!/^\d{13}$/.test(value)) {
        return { ok: false, message: 'เลขบัตรประชาชนต้องเป็นตัวเลขเท่านั้น' };
    }
    const weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + parseInt(value[i], 10) * w, 0);
    const expectedCheck = (11 - (sum % 11)) % 10;
    const actualCheck = parseInt(value[12], 10);
    if (actualCheck !== expectedCheck) {
        return { ok: false, message: 'เลขบัตรประชาชนไม่ถูกต้อง (checksum ไม่ผ่าน)' };
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 2. thaiPhone
// ---------------------------------------------------------------------------
/**
 * Validates a Thai phone number.
 * Accepted formats:
 *   - +66XXXXXXXXX (9 digits after +66, e.g. +66812345678)
 *   - 0XXXXXXXX   (8 digits after 0, landline, total 9 chars)
 *   - 0XXXXXXXXX  (9 digits after 0, mobile, total 10 chars)
 */
function thaiPhone(value) {
    if (!value) {
        return { ok: false, message: 'กรุณากรอกเบอร์โทรศัพท์' };
    }
    // Regex: (+66 or 0) followed by 8 or 9 digits
    const pattern = /^(\+66|0)[0-9]{8,9}$/;
    if (!pattern.test(value)) {
        return {
            ok: false,
            message: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ตัวอย่าง: 0812345678 หรือ +66812345678)',
        };
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 3. email
// ---------------------------------------------------------------------------
/**
 * Validates an email address (RFC 5322-lite).
 * Requires: localPart @ domain . tld
 */
function email(value) {
    if (!value) {
        return { ok: false, message: 'กรุณากรอกอีเมล' };
    }
    // RFC 5322-lite: local@domain.tld — allows +, dots, hyphens, plus aliases
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
        return { ok: false, message: 'รูปแบบอีเมลไม่ถูกต้อง (ตัวอย่าง: name@example.com)' };
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 4. dobBeforeHire
// ---------------------------------------------------------------------------
/**
 * Cross-field validator: date of birth must be at least minAge years before hireDate.
 * @param dob       - Date of birth
 * @param hireDate  - Hire date (null = invalid)
 * @param minAge    - Minimum age at hire date (default 15)
 */
function dobBeforeHire(dob, hireDate, minAge = 15) {
    if (!hireDate || !(hireDate instanceof Date) || isNaN(hireDate.getTime())) {
        return { ok: false, message: 'วันที่เริ่มงานไม่ถูกต้อง' };
    }
    if (!dob || !(dob instanceof Date) || isNaN(dob.getTime())) {
        return { ok: false, message: 'วันเกิดไม่ถูกต้อง' };
    }
    if (dob >= hireDate) {
        return { ok: false, message: 'วันเกิดต้องก่อนวันที่เริ่มงาน' };
    }
    // Calculate age in full years at hire date
    const ageMs = hireDate.getTime() - dob.getTime();
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25);
    if (ageYears < minAge) {
        return {
            ok: false,
            message: `พนักงานต้องมีอายุอย่างน้อย ${minAge} ปี ณ วันเริ่มงาน`,
        };
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 5. salaryCurrencyPair
// ---------------------------------------------------------------------------
/**
 * Validates salary amount + currency pair.
 * - amount must be > 0
 * - currency must be in SUPPORTED_CURRENCIES
 */
function salaryCurrencyPair(amount, ccy) {
    if (amount <= 0) {
        return { ok: false, message: 'เงินเดือนต้องมากกว่า 0' };
    }
    if (!SUPPORTED_CURRENCIES.has(ccy)) {
        return {
            ok: false,
            message: `สกุลเงิน "${ccy}" ไม่รองรับ (รองรับ: ${[...SUPPORTED_CURRENCIES].join(', ')})`,
        };
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 6. contractEndDateRequired
// ---------------------------------------------------------------------------
/**
 * Validates that contract end date is provided when employee class is CONTRACT.
 * PERMANENT and other classes do not require an end date.
 */
function contractEndDateRequired(employeeClass, endDate) {
    if (employeeClass === 'CONTRACT') {
        if (!endDate || !(endDate instanceof Date) || isNaN(endDate.getTime())) {
            return {
                ok: false,
                message: 'พนักงานประเภท CONTRACT ต้องระบุวันสิ้นสุดสัญญา',
            };
        }
    }
    return { ok: true };
}
// ---------------------------------------------------------------------------
// 7. nameNoDigits
// ---------------------------------------------------------------------------
/**
 * Validates that a name field contains no digit characters.
 * Supports Thai, English, and mixed-language names.
 * Spaces and special name characters (hyphens, apostrophes) are allowed.
 */
function nameNoDigits(value) {
    if (value === undefined || value === null) {
        return { ok: false, message: 'กรุณากรอกชื่อ' };
    }
    if (/\d/.test(value)) {
        return { ok: false, message: 'ชื่อต้องไม่มีตัวเลข' };
    }
    return { ok: true };
}
//# sourceMappingURL=toolkit.js.map
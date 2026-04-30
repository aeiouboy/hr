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
export interface ValidationResult {
    ok: boolean;
    message?: string;
}
/**
 * Validates a Thai National ID number.
 * - Must be exactly 13 numeric digits (string)
 * - Last digit must satisfy the mod-11 checksum
 * - Prefix 8 or 9 (foreigner sentinels) are treated normally — checksum still applies
 */
export declare function thaiNationalId(value: string): ValidationResult;
/**
 * Validates a Thai phone number.
 * Accepted formats:
 *   - +66XXXXXXXXX (9 digits after +66, e.g. +66812345678)
 *   - 0XXXXXXXX   (8 digits after 0, landline, total 9 chars)
 *   - 0XXXXXXXXX  (9 digits after 0, mobile, total 10 chars)
 */
export declare function thaiPhone(value: string): ValidationResult;
/**
 * Validates an email address (RFC 5322-lite).
 * Requires: localPart @ domain . tld
 */
export declare function email(value: string): ValidationResult;
/**
 * Cross-field validator: date of birth must be at least minAge years before hireDate.
 * @param dob       - Date of birth
 * @param hireDate  - Hire date (null = invalid)
 * @param minAge    - Minimum age at hire date (default 15)
 */
export declare function dobBeforeHire(dob: Date | null | undefined, hireDate: Date | null | undefined, minAge?: number): ValidationResult;
/**
 * Validates salary amount + currency pair.
 * - amount must be > 0
 * - currency must be in SUPPORTED_CURRENCIES
 */
export declare function salaryCurrencyPair(amount: number, ccy: string): ValidationResult;
/**
 * Validates that contract end date is provided when employee class is CONTRACT.
 * PERMANENT and other classes do not require an end date.
 */
export declare function contractEndDateRequired(employeeClass: string, endDate: Date | null | undefined): ValidationResult;
/**
 * Validates that a name field contains no digit characters.
 * Supports Thai, English, and mixed-language names.
 * Spaces and special name characters (hyphens, apostrophes) are allowed.
 */
export declare function nameNoDigits(value: string): ValidationResult;
//# sourceMappingURL=toolkit.d.ts.map
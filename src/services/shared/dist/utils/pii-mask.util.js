"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskNationalId = maskNationalId;
exports.maskBankAccount = maskBankAccount;
exports.maskEmail = maskEmail;
/**
 * Masks a national ID, showing only the last 4 characters.
 * Example: "1234567890123" → "*********0123"
 */
function maskNationalId(nationalId) {
    if (!nationalId || nationalId.length < 4) {
        return nationalId;
    }
    const visiblePart = nationalId.slice(-4);
    const maskedPart = '*'.repeat(nationalId.length - 4);
    return maskedPart + visiblePart;
}
/**
 * Masks a bank account number, showing only the last 4 digits.
 * Example: "1234567890" → "******7890"
 */
function maskBankAccount(accountNumber) {
    if (!accountNumber || accountNumber.length < 4) {
        return accountNumber;
    }
    const visiblePart = accountNumber.slice(-4);
    const maskedPart = '*'.repeat(accountNumber.length - 4);
    return maskedPart + visiblePart;
}
/**
 * Masks an email address.
 * Example: "john.doe@company.com" → "j*****e@company.com"
 */
function maskEmail(email) {
    if (!email || !email.includes('@')) {
        return email;
    }
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
        return `${local[0]}*@${domain}`;
    }
    return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`;
}
//# sourceMappingURL=pii-mask.util.js.map
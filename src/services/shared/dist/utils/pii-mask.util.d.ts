/**
 * Masks a national ID, showing only the last 4 characters.
 * Example: "1234567890123" → "*********0123"
 */
export declare function maskNationalId(nationalId: string): string;
/**
 * Masks a bank account number, showing only the last 4 digits.
 * Example: "1234567890" → "******7890"
 */
export declare function maskBankAccount(accountNumber: string): string;
/**
 * Masks an email address.
 * Example: "john.doe@company.com" → "j*****e@company.com"
 */
export declare function maskEmail(email: string): string;
//# sourceMappingURL=pii-mask.util.d.ts.map
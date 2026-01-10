/**
 * Data Masking Utilities
 * Mask sensitive data like bank accounts, national IDs, etc.
 */

const MaskUtils = (function() {
    return {
        /**
         * Mask bank account number
         * Shows first 2 and last 4 digits: XX-XXXX-1234
         * @param {string} accountNumber
         * @returns {string}
         */
        bankAccount(accountNumber) {
            if (!accountNumber) return '-';
            const cleaned = accountNumber.replace(/[-\s]/g, '');
            if (cleaned.length < 6) return '****';

            const visible = cleaned.slice(-4);
            const maskedPart = '*'.repeat(cleaned.length - 4);

            // Format with dashes for readability
            return `${maskedPart.slice(0, -4)}-${maskedPart.slice(-4, -2)}**-${visible}`;
        },

        /**
         * Mask national ID
         * Shows first 1 and last 4 digits: X-XXXX-XXXXX-XX-1234
         * @param {string} nationalId
         * @returns {string}
         */
        nationalId(nationalId) {
            if (!nationalId) return '-';
            const cleaned = nationalId.replace(/[-\s]/g, '');
            if (cleaned.length !== 13) return '****';

            // Thai National ID format: X-XXXX-XXXXX-XX-X
            return `${cleaned[0]}-****-*****-**-${cleaned.slice(-1)}`;
        },

        /**
         * Mask email address
         * Shows first 2 chars and domain: ch***@example.com
         * @param {string} email
         * @returns {string}
         */
        email(email) {
            if (!email) return '-';
            const atIndex = email.indexOf('@');
            if (atIndex < 2) return email;

            const localPart = email.substring(0, atIndex);
            const domain = email.substring(atIndex);

            const visibleChars = Math.min(2, localPart.length);
            const maskedChars = Math.max(0, localPart.length - visibleChars);

            return `${localPart.substring(0, visibleChars)}${'*'.repeat(maskedChars)}${domain}`;
        },

        /**
         * Mask phone number
         * Shows last 4 digits: ***-***-5678
         * @param {string} phone
         * @returns {string}
         */
        phone(phone) {
            if (!phone) return '-';
            const cleaned = phone.replace(/[-\s]/g, '');
            if (cleaned.length < 4) return '****';

            const visible = cleaned.slice(-4);
            const maskedLength = cleaned.length - 4;

            // Determine format based on whether it starts with +
            if (phone.startsWith('+')) {
                return `+**-***-***-${visible}`;
            }
            return `***-***-${visible}`;
        },

        /**
         * Mask credit card number
         * Shows last 4 digits: **** **** **** 1234
         * @param {string} cardNumber
         * @returns {string}
         */
        creditCard(cardNumber) {
            if (!cardNumber) return '-';
            const cleaned = cardNumber.replace(/[-\s]/g, '');
            if (cleaned.length < 4) return '****';

            const visible = cleaned.slice(-4);
            return `**** **** **** ${visible}`;
        },

        /**
         * Mask salary/amount
         * Shows range: THB ***,***
         * @param {number} amount
         * @param {boolean} showMasked - If true, show masked. If false, show actual
         * @param {string} currency
         * @returns {string}
         */
        salary(amount, showMasked = true, currency = 'THB') {
            if (!amount && amount !== 0) return '-';

            if (showMasked) {
                return `${currency} ***,***`;
            }

            // Format with Thai number format
            return `${currency} ${amount.toLocaleString('th-TH')}`;
        },

        /**
         * Generic string masking
         * @param {string} str - String to mask
         * @param {number} visibleStart - Number of visible characters at start
         * @param {number} visibleEnd - Number of visible characters at end
         * @param {string} maskChar - Character to use for masking
         * @returns {string}
         */
        string(str, visibleStart = 2, visibleEnd = 2, maskChar = '*') {
            if (!str) return '-';
            if (str.length <= visibleStart + visibleEnd) return str;

            const start = str.substring(0, visibleStart);
            const end = str.substring(str.length - visibleEnd);
            const maskLength = str.length - visibleStart - visibleEnd;

            return `${start}${maskChar.repeat(maskLength)}${end}`;
        },

        /**
         * Unmask function (for display in edit mode)
         * Returns the original value if available
         * @param {string} maskedValue
         * @param {string} originalValue
         * @returns {string}
         */
        unmask(maskedValue, originalValue) {
            return originalValue || maskedValue;
        },

        /**
         * Check if a value is masked (contains asterisks)
         * @param {string} value
         * @returns {boolean}
         */
        isMasked(value) {
            return value && value.includes('*');
        },

        /**
         * Format currency amount
         * @param {number} amount
         * @param {string} currency
         * @param {string} locale
         * @returns {string}
         */
        currency(amount, currency = 'THB', locale = 'th-TH') {
            if (amount === null || amount === undefined) return '-';

            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency
            }).format(amount);
        },

        /**
         * Format number with thousand separators
         * @param {number} num
         * @param {string} locale
         * @returns {string}
         */
        number(num, locale = 'th-TH') {
            if (num === null || num === undefined) return '-';
            return num.toLocaleString(locale);
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MaskUtils;
}

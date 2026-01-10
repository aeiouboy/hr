/**
 * Validation Utilities
 * Form field validation rules with Thai/English error messages
 */

const ValidationUtils = (function() {
    // Validation rule definitions
    const rules = {
        required: (value) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        },

        email: (value) => {
            if (!value) return true; // Skip if empty (use required for mandatory)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },

        phone: (value) => {
            if (!value) return true;
            // Thai phone: 0x-xxx-xxxx or +66-x-xxx-xxxx
            const phoneRegex = /^(\+?66|0)[0-9]{1,2}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
            return phoneRegex.test(value.replace(/\s/g, ''));
        },

        nationalId: (value) => {
            if (!value) return true;
            // Thai National ID: 13 digits
            const idRegex = /^[0-9]{13}$/;
            return idRegex.test(value.replace(/[-\s]/g, ''));
        },

        postalCode: (value) => {
            if (!value) return true;
            // Thai postal code: 5 digits
            const postalRegex = /^[0-9]{5}$/;
            return postalRegex.test(value);
        },

        date: (value) => {
            if (!value) return true;
            const d = new Date(value);
            return !isNaN(d.getTime());
        },

        futureDate: (value) => {
            if (!value) return true;
            const d = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return d >= today;
        },

        pastDate: (value) => {
            if (!value) return true;
            const d = new Date(value);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            return d <= today;
        },

        minLength: (value, min) => {
            if (!value) return true;
            return value.length >= min;
        },

        maxLength: (value, max) => {
            if (!value) return true;
            return value.length <= max;
        },

        numeric: (value) => {
            if (!value) return true;
            return /^[0-9]+$/.test(value);
        },

        decimal: (value) => {
            if (!value) return true;
            return /^[0-9]+(\.[0-9]+)?$/.test(value);
        },

        alphanumeric: (value) => {
            if (!value) return true;
            return /^[a-zA-Z0-9]+$/.test(value);
        },

        url: (value) => {
            if (!value) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        },

        match: (value, targetValue) => {
            return value === targetValue;
        },

        pattern: (value, regex) => {
            if (!value) return true;
            return regex.test(value);
        },

        custom: (value, validatorFn) => {
            return validatorFn(value);
        }
    };

    return {
        /**
         * Validate a single value against rules
         * @param {*} value - Value to validate
         * @param {object} validationRules - Rules to apply
         * @returns {object} { valid: boolean, errors: string[] }
         */
        validate(value, validationRules) {
            const errors = [];
            const lang = i18n?.getLanguage() || 'en';

            for (const [rule, param] of Object.entries(validationRules)) {
                if (param === false) continue; // Skip disabled rules

                let isValid = true;
                let errorKey = rule;

                switch (rule) {
                    case 'required':
                        isValid = rules.required(value);
                        break;
                    case 'email':
                        isValid = rules.email(value);
                        break;
                    case 'phone':
                        isValid = rules.phone(value);
                        break;
                    case 'nationalId':
                        isValid = rules.nationalId(value);
                        break;
                    case 'postalCode':
                        isValid = rules.postalCode(value);
                        break;
                    case 'date':
                        isValid = rules.date(value);
                        break;
                    case 'futureDate':
                        isValid = rules.futureDate(value);
                        break;
                    case 'pastDate':
                        isValid = rules.pastDate(value);
                        break;
                    case 'minLength':
                        isValid = rules.minLength(value, param);
                        break;
                    case 'maxLength':
                        isValid = rules.maxLength(value, param);
                        break;
                    case 'numeric':
                        isValid = rules.numeric(value);
                        break;
                    case 'decimal':
                        isValid = rules.decimal(value);
                        errorKey = 'numeric';
                        break;
                    case 'alphanumeric':
                        isValid = rules.alphanumeric(value);
                        break;
                    case 'url':
                        isValid = rules.url(value);
                        break;
                    case 'match':
                        isValid = rules.match(value, param);
                        break;
                    case 'pattern':
                        isValid = rules.pattern(value, param);
                        break;
                    case 'custom':
                        isValid = rules.custom(value, param);
                        break;
                }

                if (!isValid) {
                    let errorMessage = i18n?.t(`validation.${errorKey}`) || errorKey;

                    // Replace placeholders
                    if (rule === 'minLength') {
                        errorMessage = errorMessage.replace('{min}', param);
                    } else if (rule === 'maxLength') {
                        errorMessage = errorMessage.replace('{max}', param);
                    }

                    errors.push(errorMessage);
                }
            }

            return {
                valid: errors.length === 0,
                errors
            };
        },

        /**
         * Validate a form (multiple fields)
         * @param {object} formData - Field values keyed by field name
         * @param {object} formRules - Validation rules keyed by field name
         * @returns {object} { valid: boolean, errors: { [fieldName]: string[] } }
         */
        validateForm(formData, formRules) {
            const errors = {};
            let valid = true;

            for (const [fieldName, fieldRules] of Object.entries(formRules)) {
                const value = formData[fieldName];
                const result = this.validate(value, fieldRules);

                if (!result.valid) {
                    valid = false;
                    errors[fieldName] = result.errors;
                }
            }

            return { valid, errors };
        },

        /**
         * Get validation rules for common field types
         * @param {string} fieldType
         * @returns {object}
         */
        getRulesForType(fieldType) {
            const commonRules = {
                email: { email: true },
                phone: { phone: true },
                nationalId: { nationalId: true },
                postalCode: { postalCode: true },
                date: { date: true },
                futureDate: { date: true, futureDate: true },
                pastDate: { date: true, pastDate: true },
                number: { numeric: true },
                text: { maxLength: 200 },
                longText: { maxLength: 1000 },
                name: { minLength: 2, maxLength: 100 },
                url: { url: true }
            };

            return commonRules[fieldType] || {};
        },

        /**
         * Check if a single rule passes
         * @param {string} rule
         * @param {*} value
         * @param {*} param
         * @returns {boolean}
         */
        checkRule(rule, value, param) {
            if (rules[rule]) {
                return rules[rule](value, param);
            }
            return true;
        },

        /**
         * Format validation error for display
         * @param {string[]} errors
         * @returns {string}
         */
        formatErrors(errors) {
            if (!errors || errors.length === 0) return '';
            return errors.join('. ');
        },

        /**
         * Check if field has errors
         * @param {object} formErrors
         * @param {string} fieldName
         * @returns {boolean}
         */
        hasError(formErrors, fieldName) {
            return formErrors && formErrors[fieldName] && formErrors[fieldName].length > 0;
        },

        /**
         * Get first error for a field
         * @param {object} formErrors
         * @param {string} fieldName
         * @returns {string}
         */
        getFirstError(formErrors, fieldName) {
            if (this.hasError(formErrors, fieldName)) {
                return formErrors[fieldName][0];
            }
            return '';
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationUtils;
}

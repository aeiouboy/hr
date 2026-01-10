/**
 * Date Utilities
 * Format dates in Thai/English with various formats
 */

const DateUtils = (function() {
    // Thai month names
    const thaiMonths = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const thaiMonthsShort = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    // English month names
    const englishMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const englishMonthsShort = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Parse date string to Date object
    function parseDate(dateStr) {
        if (!dateStr) return null;
        if (dateStr instanceof Date) return dateStr;
        return new Date(dateStr);
    }

    // Convert to Buddhist Era (Thai year)
    function toBuddhistYear(year) {
        return year + 543;
    }

    return {
        /**
         * Format date with various patterns
         * @param {string|Date} date - Date to format
         * @param {string} format - Format pattern (short, medium, long, full, iso)
         * @param {string} lang - Language (en, th)
         * @returns {string}
         */
        format(date, format = 'medium', lang = null) {
            const d = parseDate(date);
            if (!d || isNaN(d.getTime())) return '-';

            const currentLang = lang || i18n?.getLanguage() || 'en';
            const day = d.getDate();
            const month = d.getMonth();
            const year = d.getFullYear();

            const months = currentLang === 'th' ? thaiMonths : englishMonths;
            const monthsShort = currentLang === 'th' ? thaiMonthsShort : englishMonthsShort;
            const displayYear = currentLang === 'th' ? toBuddhistYear(year) : year;

            switch (format) {
                case 'short':
                    // DD/MM/YYYY
                    return `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${displayYear}`;

                case 'medium':
                    // DD MMM YYYY (e.g., 15 Jan 2024)
                    return `${day} ${monthsShort[month]} ${displayYear}`;

                case 'long':
                    // DD Month YYYY (e.g., 15 January 2024)
                    return `${day} ${months[month]} ${displayYear}`;

                case 'full':
                    // Day, DD Month YYYY
                    const days = currentLang === 'th'
                        ? ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
                        : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return `${days[d.getDay()]}, ${day} ${months[month]} ${displayYear}`;

                case 'iso':
                    // YYYY-MM-DD
                    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                case 'monthYear':
                    // Month YYYY
                    return `${months[month]} ${displayYear}`;

                case 'monthYearShort':
                    // MMM YYYY
                    return `${monthsShort[month]} ${displayYear}`;

                default:
                    return `${day} ${monthsShort[month]} ${displayYear}`;
            }
        },

        /**
         * Format date with time
         * @param {string|Date} date
         * @param {boolean} includeSeconds
         * @param {string} lang
         * @returns {string}
         */
        formatDateTime(date, includeSeconds = false, lang = null) {
            const d = parseDate(date);
            if (!d || isNaN(d.getTime())) return '-';

            const datePart = this.format(d, 'medium', lang);
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            const seconds = String(d.getSeconds()).padStart(2, '0');

            if (includeSeconds) {
                return `${datePart} ${hours}:${minutes}:${seconds}`;
            }
            return `${datePart} ${hours}:${minutes}`;
        },

        /**
         * Format relative time (e.g., "2 hours ago", "in 3 days")
         * @param {string|Date} date
         * @param {string} lang
         * @returns {string}
         */
        formatRelative(date, lang = null) {
            const d = parseDate(date);
            if (!d || isNaN(d.getTime())) return '-';

            const now = new Date();
            const diff = now - d;
            const absDiff = Math.abs(diff);
            const currentLang = lang || i18n?.getLanguage() || 'en';
            const isPast = diff > 0;

            const units = [
                { ms: 31536000000, en: 'year', th: 'ปี' },
                { ms: 2592000000, en: 'month', th: 'เดือน' },
                { ms: 604800000, en: 'week', th: 'สัปดาห์' },
                { ms: 86400000, en: 'day', th: 'วัน' },
                { ms: 3600000, en: 'hour', th: 'ชั่วโมง' },
                { ms: 60000, en: 'minute', th: 'นาที' }
            ];

            for (const unit of units) {
                const value = Math.floor(absDiff / unit.ms);
                if (value >= 1) {
                    if (currentLang === 'th') {
                        return isPast ? `${value} ${unit.th}ที่แล้ว` : `ใน ${value} ${unit.th}`;
                    } else {
                        const plural = value > 1 ? 's' : '';
                        return isPast ? `${value} ${unit.en}${plural} ago` : `in ${value} ${unit.en}${plural}`;
                    }
                }
            }

            return currentLang === 'th' ? 'เมื่อกี้' : 'just now';
        },

        /**
         * Calculate years of service
         * @param {string|Date} startDate
         * @param {string|Date} endDate - Optional, defaults to today
         * @param {string} lang
         * @returns {string}
         */
        calculateYearsOfService(startDate, endDate = new Date(), lang = null) {
            const start = parseDate(startDate);
            const end = parseDate(endDate);
            if (!start || isNaN(start.getTime())) return '-';

            const currentLang = lang || i18n?.getLanguage() || 'en';

            let years = end.getFullYear() - start.getFullYear();
            let months = end.getMonth() - start.getMonth();
            let days = end.getDate() - start.getDate();

            if (days < 0) {
                months--;
                days += 30;
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const parts = [];
            if (years > 0) {
                parts.push(currentLang === 'th' ? `${years} ปี` : `${years} year${years > 1 ? 's' : ''}`);
            }
            if (months > 0) {
                parts.push(currentLang === 'th' ? `${months} เดือน` : `${months} month${months > 1 ? 's' : ''}`);
            }
            if (parts.length === 0) {
                parts.push(currentLang === 'th' ? `${days} วัน` : `${days} day${days > 1 ? 's' : ''}`);
            }

            return parts.join(' ');
        },

        /**
         * Check if date is in the future
         * @param {string|Date} date
         * @returns {boolean}
         */
        isFuture(date) {
            const d = parseDate(date);
            return d && d > new Date();
        },

        /**
         * Check if date is in the past
         * @param {string|Date} date
         * @returns {boolean}
         */
        isPast(date) {
            const d = parseDate(date);
            return d && d < new Date();
        },

        /**
         * Check if date is today
         * @param {string|Date} date
         * @returns {boolean}
         */
        isToday(date) {
            const d = parseDate(date);
            if (!d) return false;
            const today = new Date();
            return d.getDate() === today.getDate() &&
                   d.getMonth() === today.getMonth() &&
                   d.getFullYear() === today.getFullYear();
        },

        /**
         * Get today's date in ISO format
         * @returns {string}
         */
        today() {
            return this.format(new Date(), 'iso');
        },

        /**
         * Add days to a date
         * @param {string|Date} date
         * @param {number} days
         * @returns {Date}
         */
        addDays(date, days) {
            const d = parseDate(date);
            if (!d) return null;
            d.setDate(d.getDate() + days);
            return d;
        },

        /**
         * Get first day of month
         * @param {string|Date} date
         * @returns {Date}
         */
        firstDayOfMonth(date) {
            const d = parseDate(date);
            if (!d) return null;
            return new Date(d.getFullYear(), d.getMonth(), 1);
        },

        /**
         * Get last day of month
         * @param {string|Date} date
         * @returns {Date}
         */
        lastDayOfMonth(date) {
            const d = parseDate(date);
            if (!d) return null;
            return new Date(d.getFullYear(), d.getMonth() + 1, 0);
        },

        /**
         * Parse ISO date string
         * @param {string} dateStr
         * @returns {Date|null}
         */
        parse(dateStr) {
            return parseDate(dateStr);
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
}

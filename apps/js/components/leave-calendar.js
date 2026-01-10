/**
 * Leave Calendar Component
 * Monthly calendar visualization for leave requests
 */

const LeaveCalendarComponent = (function() {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    /**
     * Get Thai public holidays
     * @param {number} year
     * @returns {array}
     */
    function getPublicHolidays(year) {
        return [
            { date: `${year}-01-01`, name: "New Year's Day", nameTh: 'วันขึ้นปีใหม่' },
            { date: `${year}-02-10`, name: 'Makha Bucha Day', nameTh: 'วันมาฆบูชา' },
            { date: `${year}-04-06`, name: 'Chakri Memorial Day', nameTh: 'วันจักรี' },
            { date: `${year}-04-13`, name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
            { date: `${year}-04-14`, name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
            { date: `${year}-04-15`, name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
            { date: `${year}-05-01`, name: 'National Labor Day', nameTh: 'วันแรงงานแห่งชาติ' },
            { date: `${year}-05-04`, name: 'Coronation Day', nameTh: 'วันฉัตรมงคล' },
            { date: `${year}-06-03`, name: "Queen's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ' },
            { date: `${year}-07-28`, name: "King's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษา ร.10' },
            { date: `${year}-08-12`, name: "Mother's Day", nameTh: 'วันแม่แห่งชาติ' },
            { date: `${year}-10-13`, name: 'King Rama IX Memorial Day', nameTh: 'วันคล้ายวันสวรรคต ร.9' },
            { date: `${year}-10-23`, name: 'Chulalongkorn Day', nameTh: 'วันปิยมหาราช' },
            { date: `${year}-12-05`, name: "Father's Day", nameTh: 'วันพ่อแห่งชาติ' },
            { date: `${year}-12-10`, name: 'Constitution Day', nameTh: 'วันรัฐธรรมนูญ' },
            { date: `${year}-12-31`, name: "New Year's Eve", nameTh: 'วันสิ้นปี' }
        ];
    }

    /**
     * Check if date is weekend
     * @param {Date} date
     * @returns {boolean}
     */
    function isWeekend(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    /**
     * Check if date is public holiday
     * @param {Date} date
     * @returns {object|null}
     */
    function isHoliday(date) {
        const dateStr = DateUtils.format(date, 'iso');
        const holidays = getPublicHolidays(date.getFullYear());
        return holidays.find(h => h.date === dateStr);
    }

    /**
     * Get leaves for a specific date
     * @param {Date} date
     * @param {array} leaves
     * @returns {array}
     */
    function getLeavesForDate(date, leaves) {
        const dateStr = DateUtils.format(date, 'iso');
        return leaves.filter(leave => {
            const start = new Date(leave.startDate);
            const end = new Date(leave.endDate);
            const checkDate = new Date(dateStr);
            return checkDate >= start && checkDate <= end;
        });
    }

    /**
     * Get leave type color
     * @param {string} type
     * @returns {object}
     */
    function getLeaveTypeColor(type) {
        const colors = {
            annual: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
            sick: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500' },
            personal: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-500' },
            maternity: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-500' },
            paternity: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-500' },
            ordination: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-500' },
            military: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' },
            compensatory: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' }
        };
        return colors[type] || colors.annual;
    }

    return {
        /**
         * Render the calendar
         * @param {object} options
         * @returns {string}
         */
        render(options = {}) {
            const {
                leaves = [],
                teamLeaves = [],
                showTeam = false,
                containerId = 'leave-calendar'
            } = options;

            const allLeaves = showTeam ? [...leaves, ...teamLeaves] : leaves;
            const isThai = i18n.isThai();

            const daysOfWeek = isThai
                ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            const monthNames = isThai
                ? ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                   'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                : ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];

            // Get first day and number of days in month
            const firstDay = new Date(currentYear, currentMonth, 1);
            const lastDay = new Date(currentYear, currentMonth + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startDayOfWeek = firstDay.getDay();

            // Get days from previous month
            const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

            // Build calendar grid
            let calendarDays = [];
            let dayCounter = 1;
            let nextMonthDay = 1;

            for (let row = 0; row < 6; row++) {
                for (let col = 0; col < 7; col++) {
                    const cellIndex = row * 7 + col;

                    if (cellIndex < startDayOfWeek) {
                        // Previous month days
                        const day = prevMonthLastDay - (startDayOfWeek - cellIndex - 1);
                        calendarDays.push({
                            day,
                            date: new Date(currentYear, currentMonth - 1, day),
                            isOtherMonth: true,
                            isCurrentMonth: false
                        });
                    } else if (dayCounter <= daysInMonth) {
                        // Current month days
                        const date = new Date(currentYear, currentMonth, dayCounter);
                        calendarDays.push({
                            day: dayCounter,
                            date,
                            isOtherMonth: false,
                            isCurrentMonth: true,
                            isToday: DateUtils.isToday(date),
                            isWeekend: isWeekend(date),
                            holiday: isHoliday(date),
                            leaves: getLeavesForDate(date, allLeaves)
                        });
                        dayCounter++;
                    } else {
                        // Next month days
                        calendarDays.push({
                            day: nextMonthDay,
                            date: new Date(currentYear, currentMonth + 1, nextMonthDay),
                            isOtherMonth: true,
                            isCurrentMonth: false
                        });
                        nextMonthDay++;
                    }
                }
            }

            return `
                <div id="${containerId}" class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <!-- Calendar Header -->
                    <div class="flex items-center justify-between px-4 py-3 border-b">
                        <button onclick="LeaveCalendarComponent.prevMonth('${containerId}')"
                                class="p-2 hover:bg-gray-100 rounded-lg transition min-h-[44px] min-w-[44px]"
                                aria-label="${isThai ? 'เดือนก่อนหน้า' : 'Previous month'}">
                            <span class="material-icons">chevron_left</span>
                        </button>
                        <h3 class="text-lg font-semibold text-gray-900">
                            ${monthNames[currentMonth]} ${isThai ? (currentYear + 543) : currentYear}
                        </h3>
                        <button onclick="LeaveCalendarComponent.nextMonth('${containerId}')"
                                class="p-2 hover:bg-gray-100 rounded-lg transition min-h-[44px] min-w-[44px]"
                                aria-label="${isThai ? 'เดือนถัดไป' : 'Next month'}">
                            <span class="material-icons">chevron_right</span>
                        </button>
                    </div>

                    <!-- Days of Week Header -->
                    <div class="grid grid-cols-7 border-b bg-gray-50">
                        ${daysOfWeek.map((day, index) => `
                            <div class="py-2 text-center text-sm font-medium ${index === 0 || index === 6 ? 'text-red-500' : 'text-gray-600'}">
                                ${day}
                            </div>
                        `).join('')}
                    </div>

                    <!-- Calendar Grid -->
                    <div class="grid grid-cols-7">
                        ${calendarDays.map(cell => this.renderCalendarCell(cell, showTeam)).join('')}
                    </div>

                    <!-- Legend -->
                    <div class="px-4 py-3 border-t bg-gray-50">
                        <div class="flex flex-wrap gap-4 text-xs">
                            <div class="flex items-center gap-1">
                                <span class="w-3 h-3 rounded-full bg-blue-100 border border-blue-500"></span>
                                <span>${isThai ? 'ลาพักร้อน' : 'Annual'}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-3 h-3 rounded-full bg-orange-100 border border-orange-500"></span>
                                <span>${isThai ? 'ลาป่วย' : 'Sick'}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-3 h-3 rounded-full bg-purple-100 border border-purple-500"></span>
                                <span>${isThai ? 'ลากิจ' : 'Personal'}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="w-3 h-3 rounded-full bg-red-100 border border-red-500"></span>
                                <span>${isThai ? 'วันหยุด' : 'Holiday'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single calendar cell
         * @param {object} cell
         * @param {boolean} showTeam
         * @returns {string}
         */
        renderCalendarCell(cell, showTeam) {
            const isThai = i18n.isThai();
            let cellClasses = 'min-h-[80px] p-1 border-b border-r relative';

            if (cell.isOtherMonth) {
                cellClasses += ' bg-gray-50 text-gray-400';
            } else if (cell.isWeekend) {
                cellClasses += ' bg-red-50';
            } else if (cell.holiday) {
                cellClasses += ' bg-red-50';
            }

            if (cell.isToday) {
                cellClasses += ' ring-2 ring-inset ring-cg-red';
            }

            const dayClasses = cell.isWeekend || cell.holiday
                ? 'text-red-500 font-medium'
                : (cell.isOtherMonth ? 'text-gray-400' : 'text-gray-900');

            return `
                <div class="${cellClasses}">
                    <div class="flex items-center justify-between">
                        <span class="text-sm ${dayClasses}">${cell.day}</span>
                        ${cell.holiday ? `
                            <span class="material-icons text-xs text-red-500" title="${isThai ? cell.holiday.nameTh : cell.holiday.name}">
                                celebration
                            </span>
                        ` : ''}
                    </div>

                    ${cell.leaves?.length > 0 ? `
                        <div class="mt-1 space-y-1">
                            ${cell.leaves.slice(0, 3).map(leave => {
                                const colors = getLeaveTypeColor(leave.type);
                                const name = showTeam && leave.employeeName
                                    ? (isThai ? leave.employeeNameTh || leave.employeeName : leave.employeeName)
                                    : (isThai ? leave.typeNameTh : leave.typeNameEn);
                                return `
                                    <div class="text-xs truncate px-1 py-0.5 rounded ${colors.bg} ${colors.text} border-l-2 ${colors.border}"
                                         title="${name}">
                                        ${name}
                                    </div>
                                `;
                            }).join('')}
                            ${cell.leaves.length > 3 ? `
                                <div class="text-xs text-gray-500 px-1">+${cell.leaves.length - 3}</div>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Navigate to previous month
         * @param {string} containerId
         */
        prevMonth(containerId) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            this.refresh(containerId);
        },

        /**
         * Navigate to next month
         * @param {string} containerId
         */
        nextMonth(containerId) {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            this.refresh(containerId);
        },

        /**
         * Go to today
         * @param {string} containerId
         */
        goToToday(containerId) {
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            this.refresh(containerId);
        },

        /**
         * Refresh the calendar
         * @param {string} containerId
         */
        refresh(containerId) {
            const container = document.getElementById(containerId);
            if (container && window.LeaveRequestPage) {
                const options = LeaveRequestPage.getCalendarOptions?.() || {};
                options.containerId = containerId;
                container.outerHTML = this.render(options);
            }
        },

        /**
         * Set month/year
         * @param {number} month
         * @param {number} year
         */
        setDate(month, year) {
            currentMonth = month;
            currentYear = year;
        },

        /**
         * Get current month/year
         * @returns {object}
         */
        getCurrentDate() {
            return { month: currentMonth, year: currentYear };
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeaveCalendarComponent;
}

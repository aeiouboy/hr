/**
 * Time Management Page
 * Work shift configuration, assignment management, attendance tracking, and anomaly detection
 */

const TimeManagementPage = (function() {
    let activeTab = 'shifts';
    let shifts = [];
    let shiftAssignments = [];
    let selectedShift = null;
    let calendarData = null;
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();

    // Attendance data
    let attendanceRecords = [];
    let detectedAnomalies = [];
    let importHistory = [];
    let monthlySummary = null;
    let attendanceFilter = {
        startDate: null,
        endDate: null,
        employeeId: 'all',
        status: 'all'
    };
    let importWizardStep = 1;
    let importFileData = null;
    let columnMapping = {};

    return {
        /**
         * Render the time management page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');
            const hasData = shifts.length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();
            const isManager = RBAC.isManager();
            const isHR = RBAC.hasPermission('manage_shifts');

            // Define tabs
            const tabs = [
                { id: 'shifts', icon: 'schedule', label: i18n.t('timeManagement.shifts') },
                { id: 'assignments', icon: 'assignment_ind', label: i18n.t('timeManagement.assignments') },
                { id: 'calendar', icon: 'calendar_month', label: i18n.t('timeManagement.calendar') },
                { id: 'attendance', icon: 'fingerprint', label: i18n.t('attendance.title') },
                { id: 'anomalies', icon: 'warning', label: i18n.t('attendance.anomalies') },
                { id: 'import', icon: 'upload_file', label: i18n.t('attendance.import') },
                { id: 'summary', icon: 'analytics', label: i18n.t('attendance.summary') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('timeManagement.title')}</h1>
                        ${isHR ? `
                            <button onclick="TimeManagementPage.openShiftForm()"
                                    class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]"
                                    aria-label="${i18n.t('timeManagement.addShift')}">
                                <span class="material-icons text-sm" aria-hidden="true">add</span>
                                ${i18n.t('timeManagement.addShift')}
                            </button>
                        ` : ''}
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('timeManagement.title')}">
                        ${tabs.map(tab => `
                            <button onclick="TimeManagementPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    id="tab-${tab.id}"
                                    aria-selected="${activeTab === tab.id}"
                                    aria-controls="tabpanel-${tab.id}">
                                <span class="material-icons text-sm" aria-hidden="true">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="time-management-tab-content" role="tabpanel" aria-labelledby="tab-${activeTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render active tab content
         * @returns {string}
         */
        renderTabContent() {
            switch (activeTab) {
                case 'shifts':
                    return this.renderShiftsTab();
                case 'assignments':
                    return this.renderAssignmentsTab();
                case 'calendar':
                    return this.renderCalendarTab();
                case 'attendance':
                    return this.renderAttendanceTab();
                case 'anomalies':
                    return this.renderAnomaliesTab();
                case 'import':
                    return this.renderImportTab();
                case 'summary':
                    return this.renderSummaryTab();
                default:
                    return this.renderShiftsTab();
            }
        },

        /**
         * Render shifts list tab
         * @returns {string}
         */
        renderShiftsTab() {
            const isThai = i18n.isThai();
            const isHR = RBAC.hasPermission('manage_shifts');
            const activeShifts = shifts.filter(s => s.status === 'active');

            if (activeShifts.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4" aria-hidden="true">schedule</span>
                        <p class="text-lg">${i18n.t('timeManagement.noShifts')}</p>
                    </div>
                `;
            }

            return `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${activeShifts.map(shift => this.renderShiftCard(shift, isHR)).join('')}
                </div>
            `;
        },

        /**
         * Render a single shift card
         * @param {object} shift
         * @param {boolean} canEdit
         * @returns {string}
         */
        renderShiftCard(shift, canEdit) {
            const isThai = i18n.isThai();
            const name = isThai ? shift.nameTh : shift.nameEn;
            const description = isThai ? shift.descriptionTh : shift.descriptionEn;

            const badges = [];
            if (shift.isNightShift) {
                badges.push(`<span class="px-2 py-1 text-xs font-medium bg-gray-800 text-white rounded-full">${i18n.t('timeManagement.nightShift')}</span>`);
            }
            if (shift.isFlexible) {
                badges.push(`<span class="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-full">${i18n.t('timeManagement.flexible')}</span>`);
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition" role="article" aria-label="${name}">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: ${shift.color}20;">
                                <span class="material-icons" style="color: ${shift.color};" aria-hidden="true">schedule</span>
                            </div>
                            <div>
                                <h3 class="font-semibold text-gray-900">${name}</h3>
                                <p class="text-sm text-gray-500">${shift.code}</p>
                            </div>
                        </div>
                        ${canEdit ? `
                            <button onclick="TimeManagementPage.openShiftForm('${shift.id}')"
                                    class="p-2 text-gray-400 hover:text-cg-red transition rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('common.edit')} ${name}">
                                <span class="material-icons text-sm" aria-hidden="true">edit</span>
                            </button>
                        ` : ''}
                    </div>

                    <p class="text-sm text-gray-600 mb-4">${description}</p>

                    <!-- Time Details -->
                    <div class="space-y-2 mb-4">
                        <div class="flex items-center gap-2 text-sm">
                            <span class="material-icons text-gray-400 text-sm" aria-hidden="true">access_time</span>
                            <span class="text-gray-700">${shift.startTime} - ${shift.endTime}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <span class="material-icons text-gray-400 text-sm" aria-hidden="true">restaurant</span>
                            <span class="text-gray-700">${i18n.t('timeManagement.breakTime')}: ${shift.breakStartTime} - ${shift.breakEndTime}</span>
                        </div>
                        <div class="flex items-center gap-2 text-sm">
                            <span class="material-icons text-gray-400 text-sm" aria-hidden="true">timer</span>
                            <span class="text-gray-700">${shift.workHours} ${i18n.t('timeManagement.hours')}</span>
                        </div>
                        ${shift.isFlexible && shift.coreStartTime ? `
                            <div class="flex items-center gap-2 text-sm">
                                <span class="material-icons text-gray-400 text-sm" aria-hidden="true">lock_clock</span>
                                <span class="text-gray-700">${i18n.t('timeManagement.coreHours')}: ${shift.coreStartTime} - ${shift.coreEndTime}</span>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Badges -->
                    ${badges.length > 0 ? `
                        <div class="flex flex-wrap gap-2">
                            ${badges.join('')}
                        </div>
                    ` : ''}

                    <!-- View Details Button -->
                    <button onclick="TimeManagementPage.viewShiftDetails('${shift.id}')"
                            class="mt-4 w-full py-2 text-sm font-medium text-cg-info bg-blue-50 rounded-lg hover:bg-blue-100 transition min-h-[44px]">
                        ${i18n.t('timeManagement.viewDetails')}
                    </button>
                </div>
            `;
        },

        /**
         * Render assignments tab
         * @returns {string}
         */
        renderAssignmentsTab() {
            const isThai = i18n.isThai();
            const isHR = RBAC.hasPermission('manage_shifts');

            if (shiftAssignments.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4" aria-hidden="true">assignment_ind</span>
                        <p class="text-lg">${i18n.t('timeManagement.noAssignments')}</p>
                    </div>
                `;
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <!-- Filters -->
                    <div class="p-4 border-b bg-gray-50 flex flex-wrap gap-4">
                        <select onchange="TimeManagementPage.filterAssignments(this.value)"
                                class="px-3 py-2 border rounded-lg text-sm min-h-[44px]"
                                aria-label="${i18n.t('timeManagement.filterByShift')}">
                            <option value="all">${isThai ? 'กะทั้งหมด' : 'All Shifts'}</option>
                            ${shifts.map(s => `
                                <option value="${s.id}">${isThai ? s.nameTh : s.nameEn}</option>
                            `).join('')}
                        </select>
                    </div>

                    <!-- Assignments Table -->
                    <div class="overflow-x-auto">
                        <table class="w-full" role="table" aria-label="${i18n.t('timeManagement.assignments')}">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('timeManagement.employee')}
                                    </th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('timeManagement.shift')}
                                    </th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('timeManagement.effectiveDate')}
                                    </th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ${i18n.t('workflow.status')}
                                    </th>
                                    ${isHR ? `
                                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('common.actions')}
                                        </th>
                                    ` : ''}
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200" id="assignments-list">
                                ${shiftAssignments.map(assignment => this.renderAssignmentRow(assignment, isHR)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single assignment row
         * @param {object} assignment
         * @param {boolean} canEdit
         * @returns {string}
         */
        renderAssignmentRow(assignment, canEdit) {
            const isThai = i18n.isThai();
            const employeeName = isThai ? assignment.employeeNameTh : assignment.employeeName;
            const shiftName = isThai ? assignment.shiftNameTh : assignment.shiftName;
            const shift = shifts.find(s => s.id === assignment.shiftId);

            const statusColors = {
                active: 'bg-green-100 text-green-800',
                inactive: 'bg-gray-100 text-gray-800',
                pending: 'bg-yellow-100 text-yellow-800'
            };

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-3">
                            <div class="font-medium text-gray-900">${employeeName}</div>
                        </div>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full" style="background-color: ${shift?.color || '#6B7280'};" aria-hidden="true"></div>
                            <span class="text-gray-900">${shiftName}</span>
                            <span class="text-gray-500">(${assignment.shiftCode})</span>
                        </div>
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap text-gray-600">
                        ${DateUtils.format(assignment.effectiveStartDate, 'medium')}
                        ${assignment.effectiveEndDate ? ` - ${DateUtils.format(assignment.effectiveEndDate, 'medium')}` : ''}
                    </td>
                    <td class="px-4 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${statusColors[assignment.status] || statusColors.pending}">
                            ${i18n.t(`timeManagement.status.${assignment.status}`)}
                        </span>
                    </td>
                    ${canEdit ? `
                        <td class="px-4 py-4 whitespace-nowrap text-right">
                            <button onclick="TimeManagementPage.editAssignment('${assignment.id}')"
                                    class="text-cg-info hover:underline text-sm min-h-[44px] px-2"
                                    aria-label="${i18n.t('common.edit')} ${employeeName}">
                                ${i18n.t('common.edit')}
                            </button>
                        </td>
                    ` : ''}
                </tr>
            `;
        },

        /**
         * Render calendar tab
         * @returns {string}
         */
        renderCalendarTab() {
            const isThai = i18n.isThai();
            const monthNames = isThai
                ? ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                   'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
                : ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];

            const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
            const dayNames = isThai
                ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            // Get first day of month (0 = Sunday, 1 = Monday, etc.)
            const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <!-- Calendar Header -->
                    <div class="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <button onclick="TimeManagementPage.previousMonth()"
                                    class="p-2 rounded-lg hover:bg-gray-100 transition min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('accessibility.previousPage')}">
                                <span class="material-icons" aria-hidden="true">chevron_left</span>
                            </button>
                            <h2 class="text-xl font-semibold text-gray-900">
                                ${monthNames[currentMonth - 1]} ${isThai ? (currentYear + 543) : currentYear}
                            </h2>
                            <button onclick="TimeManagementPage.nextMonth()"
                                    class="p-2 rounded-lg hover:bg-gray-100 transition min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('accessibility.nextPage')}">
                                <span class="material-icons" aria-hidden="true">chevron_right</span>
                            </button>
                        </div>
                        <button onclick="TimeManagementPage.goToToday()"
                                class="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition min-h-[44px]">
                            ${i18n.t('timeManagement.today')}
                        </button>
                    </div>

                    <!-- Calendar Legend -->
                    <div class="p-4 border-b bg-gray-50 flex flex-wrap gap-4 text-sm">
                        ${shifts.slice(0, 5).map(shift => `
                            <div class="flex items-center gap-2">
                                <div class="w-4 h-4 rounded" style="background-color: ${shift.color};" aria-hidden="true"></div>
                                <span>${shift.code} - ${isThai ? shift.nameTh : shift.nameEn}</span>
                            </div>
                        `).join('')}
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-red-100 border border-red-300" aria-hidden="true"></div>
                            <span>${i18n.t('timeManagement.holiday')}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 rounded bg-gray-100" aria-hidden="true"></div>
                            <span>${i18n.t('timeManagement.weekend')}</span>
                        </div>
                    </div>

                    <!-- Calendar Grid -->
                    <div class="overflow-x-auto">
                        ${this.renderCalendarGrid(daysInMonth, firstDayOfMonth, dayNames)}
                    </div>
                </div>
            `;
        },

        /**
         * Render calendar grid
         * @param {number} daysInMonth
         * @param {number} firstDay
         * @param {array} dayNames
         * @returns {string}
         */
        renderCalendarGrid(daysInMonth, firstDay, dayNames) {
            const isThai = i18n.isThai();
            const today = new Date();
            const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() + 1 === currentMonth;

            // Employee shift calendar data
            const employees = calendarData?.employees || [];

            // Build day headers
            const headerCells = dayNames.map(day => `
                <th class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase min-w-[40px]">${day}</th>
            `).join('');

            // Build date header row
            let dateHeaderCells = '';
            for (let i = 0; i < firstDay; i++) {
                dateHeaderCells += '<td class="px-1 py-1 text-center text-gray-300"></td>';
            }
            for (let day = 1; day <= daysInMonth; day++) {
                const isToday = isCurrentMonth && today.getDate() === day;
                const dayOfWeek = new Date(currentYear, currentMonth - 1, day).getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                dateHeaderCells += `
                    <td class="px-1 py-1 text-center ${isWeekend ? 'bg-gray-50' : ''}">
                        <span class="${isToday ? 'bg-cg-red text-white rounded-full px-2 py-1' : 'text-gray-700'} text-sm font-medium">
                            ${day}
                        </span>
                    </td>
                `;
            }

            // Build employee rows
            const employeeRows = employees.map(emp => {
                const employeeName = isThai ? emp.employeeNameTh : emp.employeeName;

                let cells = '';
                for (let i = 0; i < firstDay; i++) {
                    cells += '<td class="px-1 py-2"></td>';
                }

                for (let day = 1; day <= daysInMonth; day++) {
                    const shiftData = emp.shifts[day];
                    const shift = shiftData ? shifts.find(s => s.id === shiftData.shiftId) : null;
                    const dayOfWeek = new Date(currentYear, currentMonth - 1, day).getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                    let cellClass = 'px-1 py-2 text-center';
                    let cellContent = '';
                    let bgColor = '';

                    if (shiftData?.isHoliday) {
                        bgColor = 'bg-red-100';
                        cellContent = `<span class="text-xs text-red-600 font-medium" title="${isThai ? shiftData.holidayNameTh : shiftData.holidayName}">H</span>`;
                    } else if (shiftData?.isLeave) {
                        bgColor = 'bg-yellow-100';
                        cellContent = `<span class="text-xs text-yellow-700 font-medium">${i18n.t('leave.type.' + shiftData.leaveType).charAt(0)}</span>`;
                    } else if (isWeekend) {
                        bgColor = 'bg-gray-50';
                        cellContent = shift ? `<span class="text-xs text-gray-400">${shift.code}</span>` : '';
                    } else if (shift) {
                        cellContent = `
                            <span class="inline-block w-6 h-6 rounded text-xs text-white font-medium leading-6"
                                  style="background-color: ${shift.color};"
                                  title="${isThai ? shift.nameTh : shift.nameEn}">
                                ${shift.code.charAt(0)}
                            </span>
                        `;
                    }

                    cells += `<td class="${cellClass} ${bgColor}">${cellContent}</td>`;
                }

                return `
                    <tr class="border-t hover:bg-gray-50">
                        <td class="px-4 py-2 whitespace-nowrap sticky left-0 bg-white">
                            <div class="flex items-center gap-2">
                                <img src="${emp.photo}" alt="" class="w-8 h-8 rounded-full" aria-hidden="true">
                                <div>
                                    <div class="font-medium text-gray-900 text-sm">${employeeName}</div>
                                    <div class="text-xs text-gray-500">${isThai ? emp.departmentTh : emp.department}</div>
                                </div>
                            </div>
                        </td>
                        ${cells}
                    </tr>
                `;
            }).join('');

            return `
                <table class="w-full min-w-max" role="grid" aria-label="${i18n.t('timeManagement.calendar')}">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 min-w-[200px]">
                                ${i18n.t('timeManagement.employee')}
                            </th>
                            ${headerCells}
                        </tr>
                        <tr class="bg-white border-b">
                            <td class="px-4 py-1 sticky left-0 bg-white"></td>
                            ${dateHeaderCells}
                        </tr>
                    </thead>
                    <tbody>
                        ${employeeRows.length > 0 ? employeeRows : `
                            <tr>
                                <td colspan="${8 + daysInMonth}" class="px-4 py-8 text-center text-gray-500">
                                    ${i18n.t('timeManagement.noCalendarData')}
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            `;
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            Router.refresh();
        },

        /**
         * Navigate to previous month
         */
        previousMonth() {
            currentMonth--;
            if (currentMonth < 1) {
                currentMonth = 12;
                currentYear--;
            }
            this.loadCalendarData();
            Router.refresh();
        },

        /**
         * Navigate to next month
         */
        nextMonth() {
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
            this.loadCalendarData();
            Router.refresh();
        },

        /**
         * Go to current month
         */
        goToToday() {
            const today = new Date();
            currentMonth = today.getMonth() + 1;
            currentYear = today.getFullYear();
            this.loadCalendarData();
            Router.refresh();
        },

        /**
         * Open shift form modal
         * @param {string} shiftId - Optional shift ID for editing
         */
        openShiftForm(shiftId = null) {
            const isThai = i18n.isThai();
            const shift = shiftId ? shifts.find(s => s.id === shiftId) : null;
            const isEdit = !!shift;

            ModalComponent.open({
                title: isEdit ? i18n.t('timeManagement.editShift') : i18n.t('timeManagement.addShift'),
                size: 'lg',
                content: `
                    <form id="shift-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'code',
                                label: i18n.t('timeManagement.shiftCode'),
                                value: shift?.code || '',
                                required: true,
                                maxLength: 5
                            })}
                            ${FormFieldComponent.text({
                                name: 'nameEn',
                                label: i18n.t('timeManagement.shiftNameEn'),
                                value: shift?.nameEn || '',
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'nameTh',
                                label: i18n.t('timeManagement.shiftNameTh'),
                                value: shift?.nameTh || '',
                                required: true
                            })}
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'startTime',
                                label: i18n.t('timeManagement.startTime'),
                                type: 'time',
                                value: shift?.startTime || '08:30',
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'endTime',
                                label: i18n.t('timeManagement.endTime'),
                                type: 'time',
                                value: shift?.endTime || '17:30',
                                required: true
                            })}
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'breakStartTime',
                                label: i18n.t('timeManagement.breakStart'),
                                type: 'time',
                                value: shift?.breakStartTime || '12:00',
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'breakEndTime',
                                label: i18n.t('timeManagement.breakEnd'),
                                type: 'time',
                                value: shift?.breakEndTime || '13:00',
                                required: true
                            })}
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${FormFieldComponent.text({
                                name: 'workHours',
                                label: i18n.t('timeManagement.workHours'),
                                type: 'number',
                                value: shift?.workHours || 8,
                                required: true
                            })}
                            ${FormFieldComponent.checkbox({
                                name: 'isNightShift',
                                label: i18n.t('timeManagement.nightShift'),
                                checked: shift?.isNightShift || false
                            })}
                            ${FormFieldComponent.checkbox({
                                name: 'isFlexible',
                                label: i18n.t('timeManagement.flexible'),
                                checked: shift?.isFlexible || false
                            })}
                        </div>
                        ${FormFieldComponent.textarea({
                            name: 'descriptionEn',
                            label: i18n.t('timeManagement.descriptionEn'),
                            value: shift?.descriptionEn || '',
                            rows: 2
                        })}
                        ${FormFieldComponent.textarea({
                            name: 'descriptionTh',
                            label: i18n.t('timeManagement.descriptionTh'),
                            value: shift?.descriptionTh || '',
                            rows: 2
                        })}
                    </form>
                `,
                actions: [
                    {
                        label: i18n.t('common.cancel'),
                        onclick: 'ModalComponent.close()'
                    },
                    {
                        label: i18n.t('common.save'),
                        primary: true,
                        onclick: `TimeManagementPage.saveShift('${shiftId || ''}')`
                    }
                ]
            });
        },

        /**
         * Save shift data
         * @param {string} shiftId
         */
        async saveShift(shiftId) {
            const formData = FormFieldComponent.getFormData('shift-form');

            // Validate required fields
            if (!formData.code || !formData.nameEn || !formData.nameTh) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                if (shiftId) {
                    await API.updateShift(shiftId, formData);
                } else {
                    await API.createShift(formData);
                }

                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Save shift error:', error);
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * View shift details
         * @param {string} shiftId
         */
        viewShiftDetails(shiftId) {
            const isThai = i18n.isThai();
            const shift = shifts.find(s => s.id === shiftId);
            if (!shift) return;

            const name = isThai ? shift.nameTh : shift.nameEn;
            const description = isThai ? shift.descriptionTh : shift.descriptionEn;

            ModalComponent.open({
                title: name,
                size: 'md',
                content: `
                    <div class="space-y-4">
                        <div class="flex items-center gap-4 p-4 rounded-lg" style="background-color: ${shift.color}20;">
                            <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background-color: ${shift.color};">
                                <span class="material-icons text-white text-2xl" aria-hidden="true">schedule</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">${name}</h3>
                                <p class="text-gray-500">${shift.code}</p>
                            </div>
                        </div>

                        <p class="text-gray-600">${description}</p>

                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500">${i18n.t('timeManagement.workingHours')}</p>
                                <p class="font-medium text-gray-900">${shift.startTime} - ${shift.endTime}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('timeManagement.breakTime')}</p>
                                <p class="font-medium text-gray-900">${shift.breakStartTime} - ${shift.breakEndTime}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('timeManagement.totalHours')}</p>
                                <p class="font-medium text-gray-900">${shift.workHours} ${i18n.t('timeManagement.hours')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('timeManagement.breakDuration')}</p>
                                <p class="font-medium text-gray-900">${shift.breakMinutes} ${i18n.t('timeManagement.minutes')}</p>
                            </div>
                        </div>

                        ${shift.isFlexible && shift.coreStartTime ? `
                            <div class="p-3 bg-emerald-50 rounded-lg">
                                <p class="text-sm text-emerald-700">
                                    <span class="font-medium">${i18n.t('timeManagement.coreHours')}:</span>
                                    ${shift.coreStartTime} - ${shift.coreEndTime}
                                </p>
                            </div>
                        ` : ''}

                        <div class="flex flex-wrap gap-2">
                            ${shift.isNightShift ? `
                                <span class="px-3 py-1 text-sm font-medium bg-gray-800 text-white rounded-full">
                                    ${i18n.t('timeManagement.nightShift')}
                                </span>
                            ` : ''}
                            ${shift.isFlexible ? `
                                <span class="px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded-full">
                                    ${i18n.t('timeManagement.flexible')}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Filter assignments by shift
         * @param {string} shiftId
         */
        filterAssignments(shiftId) {
            const container = document.getElementById('assignments-list');
            if (!container) return;

            const isHR = RBAC.hasPermission('manage_shifts');
            const filtered = shiftId === 'all'
                ? shiftAssignments
                : shiftAssignments.filter(a => a.shiftId === shiftId);

            container.innerHTML = filtered.map(a => this.renderAssignmentRow(a, isHR)).join('');
        },

        /**
         * Edit assignment
         * @param {string} assignmentId
         */
        editAssignment(assignmentId) {
            const isThai = i18n.isThai();
            const assignment = shiftAssignments.find(a => a.id === assignmentId);
            if (!assignment) return;

            const employeeName = isThai ? assignment.employeeNameTh : assignment.employeeName;

            ModalComponent.open({
                title: `${i18n.t('common.edit')}: ${employeeName}`,
                size: 'md',
                content: `
                    <form id="assignment-form" class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="font-medium text-gray-900">${employeeName}</p>
                        </div>

                        ${FormFieldComponent.select({
                            name: 'shiftId',
                            label: i18n.t('timeManagement.shift'),
                            value: assignment.shiftId,
                            required: true,
                            options: shifts.map(s => ({
                                value: s.id,
                                label: isThai ? s.nameTh : s.nameEn
                            }))
                        })}

                        ${FormFieldComponent.date({
                            name: 'effectiveStartDate',
                            label: i18n.t('timeManagement.effectiveDate'),
                            value: assignment.effectiveStartDate,
                            required: true
                        })}

                        ${FormFieldComponent.date({
                            name: 'effectiveEndDate',
                            label: i18n.t('timeManagement.endDate'),
                            value: assignment.effectiveEndDate || ''
                        })}
                    </form>
                `,
                actions: [
                    {
                        label: i18n.t('common.cancel'),
                        onclick: 'ModalComponent.close()'
                    },
                    {
                        label: i18n.t('common.save'),
                        primary: true,
                        onclick: `TimeManagementPage.saveAssignment('${assignmentId}')`
                    }
                ]
            });
        },

        /**
         * Save assignment
         * @param {string} assignmentId
         */
        async saveAssignment(assignmentId) {
            const formData = FormFieldComponent.getFormData('assignment-form');

            if (!formData.shiftId || !formData.effectiveStartDate) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                await API.updateShiftAssignment(assignmentId, formData);
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Save assignment error:', error);
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * Load calendar data for current month
         */
        async loadCalendarData() {
            try {
                calendarData = await API.getShiftCalendar(currentYear, currentMonth);
            } catch (error) {
                console.error('Error loading calendar data:', error);
                // Use mock data as fallback
                calendarData = MockShiftData.getShiftCalendarForMonth(currentYear, currentMonth);
            }
        },

        /**
         * Load all data
         */
        async loadData() {
            try {
                // Load shifts
                shifts = await API.getShifts();

                // Load shift assignments
                shiftAssignments = await API.getShiftAssignments();

                // Load calendar data
                await this.loadCalendarData();

            } catch (error) {
                console.error('Error loading time management data:', error);
                // Use mock data as fallback
                shifts = MockShiftData.shifts || [];
                shiftAssignments = MockShiftData.shiftAssignments || [];
                calendarData = MockShiftData.shiftCalendar || null;
            }

            // Load attendance data (always use mock for now)
            attendanceRecords = MockAttendanceData.attendanceRecords || [];
            detectedAnomalies = MockAttendanceData.detectedAnomalies || [];
            importHistory = MockAttendanceData.importHistory || [];
            monthlySummary = MockAttendanceData.getMonthlySummary('2026-01');
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'shifts';
            currentMonth = new Date().getMonth() + 1;
            currentYear = new Date().getFullYear();
            await this.loadData();

            // Re-render the page content after data is loaded
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Render skeleton
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 200px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${[1, 2, 3, 4, 5, 6].map(() => `
                            <div class="skeleton shimmer" style="height: 250px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // ==========================================
        // ATTENDANCE TAB
        // ==========================================

        /**
         * Render attendance records tab
         * @returns {string}
         */
        renderAttendanceTab() {
            const isThai = i18n.isThai();
            const isHR = RBAC.hasPermission('manage_shifts');

            // Default date range to current month
            const today = new Date();
            const startDate = attendanceFilter.startDate || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-01`;
            const endDate = attendanceFilter.endDate || today.toISOString().split('T')[0];

            const statusOptions = [
                { value: 'all', label: i18n.t('common.all') },
                { value: 'present', label: i18n.t('attendance.statusLabels.present') },
                { value: 'absent', label: i18n.t('attendance.statusLabels.absent') },
                { value: 'incomplete', label: i18n.t('attendance.statusLabels.incomplete') }
            ];

            return `
                <div class="space-y-6">
                    <!-- Filters -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label for="att-start-date" class="block text-sm font-medium text-gray-700 mb-1">
                                    ${i18n.t('attendance.startDate')}
                                </label>
                                <input type="date" id="att-start-date"
                                       value="${startDate}"
                                       onchange="TimeManagementPage.updateAttendanceFilter('startDate', this.value)"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red min-h-[44px]"
                                       aria-label="${i18n.t('attendance.startDate')}">
                            </div>
                            <div>
                                <label for="att-end-date" class="block text-sm font-medium text-gray-700 mb-1">
                                    ${i18n.t('attendance.endDate')}
                                </label>
                                <input type="date" id="att-end-date"
                                       value="${endDate}"
                                       onchange="TimeManagementPage.updateAttendanceFilter('endDate', this.value)"
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red min-h-[44px]"
                                       aria-label="${i18n.t('attendance.endDate')}">
                            </div>
                            <div>
                                <label for="att-status" class="block text-sm font-medium text-gray-700 mb-1">
                                    ${i18n.t('attendance.status')}
                                </label>
                                <select id="att-status"
                                        onchange="TimeManagementPage.updateAttendanceFilter('status', this.value)"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red min-h-[44px]"
                                        aria-label="${i18n.t('attendance.status')}">
                                    ${statusOptions.map(opt => `
                                        <option value="${opt.value}" ${attendanceFilter.status === opt.value ? 'selected' : ''}>
                                            ${opt.label}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>
                            <div class="flex items-end">
                                <button onclick="TimeManagementPage.searchAttendance()"
                                        class="w-full px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px] flex items-center justify-center gap-2">
                                    <span class="material-icons text-sm" aria-hidden="true">search</span>
                                    ${i18n.t('common.search')}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Attendance Records Table -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="overflow-x-auto">
                            <table class="w-full" role="table" aria-label="${i18n.t('attendance.title')}">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.employee')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.date')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.checkIn')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.checkOut')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.workingHours')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.status')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('attendance.source')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200" id="attendance-records-list">
                                    ${this.renderAttendanceRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render attendance table rows
         * @returns {string}
         */
        renderAttendanceRows() {
            const isThai = i18n.isThai();
            const filteredRecords = this.getFilteredAttendanceRecords();

            if (filteredRecords.length === 0) {
                return `
                    <tr>
                        <td colspan="7" class="px-4 py-8 text-center text-gray-500">
                            <span class="material-icons text-4xl mb-2" aria-hidden="true">event_busy</span>
                            <p>${i18n.t('attendance.noRecords')}</p>
                        </td>
                    </tr>
                `;
            }

            return filteredRecords.map(record => {
                const employeeName = isThai ? record.employeeNameTh : record.employeeName;
                const source = record.checkInSource ? MockAttendanceData.getSourceById(record.checkInSource) : null;
                const sourceName = source ? (isThai ? source.nameTh : source.nameEn) : '-';

                const statusColors = {
                    present: 'bg-green-100 text-green-800',
                    absent: 'bg-red-100 text-red-800',
                    incomplete: 'bg-yellow-100 text-yellow-800',
                    leave: 'bg-blue-100 text-blue-800'
                };

                const hasAnomalies = record.anomalies && record.anomalies.length > 0;

                return `
                    <tr class="hover:bg-gray-50 ${hasAnomalies ? 'border-l-4 border-l-yellow-400' : ''}">
                        <td class="px-4 py-4 whitespace-nowrap">
                            <div class="font-medium text-gray-900">${employeeName}</div>
                            <div class="text-sm text-gray-500">${record.employeeId}</div>
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-gray-700">
                            ${DateUtils.format(record.date, 'medium')}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            ${record.actualCheckIn ? `
                                <div class="flex items-center gap-1">
                                    <span class="${record.isLate ? 'text-red-600 font-medium' : 'text-gray-700'}">${record.actualCheckIn}</span>
                                    ${record.isLate ? `<span class="text-xs text-red-600">(+${record.lateMinutes}${i18n.t('attendance.min')})</span>` : ''}
                                </div>
                            ` : `<span class="text-red-500">${i18n.t('attendance.missing')}</span>`}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            ${record.actualCheckOut ? `
                                <div class="flex items-center gap-1">
                                    <span class="${record.isEarlyDeparture ? 'text-orange-600 font-medium' : 'text-gray-700'}">${record.actualCheckOut}</span>
                                    ${record.isEarlyDeparture ? `<span class="text-xs text-orange-600">(-${record.earlyMinutes}${i18n.t('attendance.min')})</span>` : ''}
                                </div>
                            ` : `<span class="text-red-500">${i18n.t('attendance.missing')}</span>`}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            ${record.workingHours !== null ? `
                                <span class="${record.workingHours < 8 ? 'text-orange-600' : 'text-gray-700'}">
                                    ${record.workingHours.toFixed(2)} ${i18n.t('timeManagement.hours')}
                                </span>
                                ${record.overtimeHours > 0 ? `
                                    <span class="text-xs text-purple-600">(+${record.overtimeHours.toFixed(1)} OT)</span>
                                ` : ''}
                            ` : '-'}
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap">
                            <span class="px-2 py-1 text-xs font-medium rounded-full ${statusColors[record.status] || 'bg-gray-100 text-gray-800'}">
                                ${i18n.t('attendance.statusLabels.' + record.status)}
                            </span>
                        </td>
                        <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div title="${record.checkInLocation || ''}">${sourceName}</div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        /**
         * Get filtered attendance records
         * @returns {array}
         */
        getFilteredAttendanceRecords() {
            let records = [...attendanceRecords];

            if (attendanceFilter.startDate) {
                records = records.filter(r => r.date >= attendanceFilter.startDate);
            }
            if (attendanceFilter.endDate) {
                records = records.filter(r => r.date <= attendanceFilter.endDate);
            }
            if (attendanceFilter.status && attendanceFilter.status !== 'all') {
                records = records.filter(r => r.status === attendanceFilter.status);
            }
            if (attendanceFilter.employeeId && attendanceFilter.employeeId !== 'all') {
                records = records.filter(r => r.employeeId === attendanceFilter.employeeId);
            }

            return records.sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        /**
         * Update attendance filter
         * @param {string} field
         * @param {string} value
         */
        updateAttendanceFilter(field, value) {
            attendanceFilter[field] = value;
        },

        /**
         * Search attendance records
         */
        async searchAttendance() {
            try {
                // In real implementation, this would call the API
                const filteredRecords = this.getFilteredAttendanceRecords();
                const container = document.getElementById('attendance-records-list');
                if (container) {
                    container.innerHTML = this.renderAttendanceRows();
                }
            } catch (error) {
                console.error('Error searching attendance:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        // ==========================================
        // ANOMALIES TAB
        // ==========================================

        /**
         * Render anomalies detection tab
         * @returns {string}
         */
        renderAnomaliesTab() {
            const isThai = i18n.isThai();
            const isHR = RBAC.hasPermission('manage_shifts');
            const openAnomalies = detectedAnomalies.filter(a => a.status === 'open');
            const resolvedAnomalies = detectedAnomalies.filter(a => a.status === 'resolved');

            const severityCounts = {
                critical: openAnomalies.filter(a => a.severity === 'critical').length,
                high: openAnomalies.filter(a => a.severity === 'high').length,
                medium: openAnomalies.filter(a => a.severity === 'medium').length,
                low: openAnomalies.filter(a => a.severity === 'low').length
            };

            return `
                <div class="space-y-6">
                    <!-- Anomaly Summary Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-red-600" aria-hidden="true">error</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-red-700">${severityCounts.critical}</p>
                                    <p class="text-sm text-red-600">${i18n.t('attendance.severity.critical')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-orange-600" aria-hidden="true">warning</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-orange-700">${severityCounts.high}</p>
                                    <p class="text-sm text-orange-600">${i18n.t('attendance.severity.high')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-yellow-600" aria-hidden="true">info</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-yellow-700">${severityCounts.medium}</p>
                                    <p class="text-sm text-yellow-600">${i18n.t('attendance.severity.medium')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-blue-600" aria-hidden="true">low_priority</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-blue-700">${severityCounts.low}</p>
                                    <p class="text-sm text-blue-600">${i18n.t('attendance.severity.low')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Configuration Panel -->
                    ${isHR ? `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <h3 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span class="material-icons text-gray-500" aria-hidden="true">settings</span>
                                ${i18n.t('attendance.anomalyConfig')}
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        ${i18n.t('attendance.lateThreshold')}
                                    </label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" value="${MockAttendanceData.config.lateThresholdMinutes}"
                                               class="w-20 px-3 py-2 border border-gray-300 rounded-lg min-h-[44px]"
                                               aria-label="${i18n.t('attendance.lateThreshold')}">
                                        <span class="text-gray-500">${i18n.t('attendance.minutes')}</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        ${i18n.t('attendance.earlyDepartureThreshold')}
                                    </label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" value="${MockAttendanceData.config.earlyDepartureThresholdMinutes}"
                                               class="w-20 px-3 py-2 border border-gray-300 rounded-lg min-h-[44px]"
                                               aria-label="${i18n.t('attendance.earlyDepartureThreshold')}">
                                        <span class="text-gray-500">${i18n.t('attendance.minutes')}</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        ${i18n.t('attendance.consecutiveAbsenceAlert')}
                                    </label>
                                    <div class="flex items-center gap-2">
                                        <input type="number" value="${MockAttendanceData.config.consecutiveAbsenceAlertDays}"
                                               class="w-20 px-3 py-2 border border-gray-300 rounded-lg min-h-[44px]"
                                               aria-label="${i18n.t('attendance.consecutiveAbsenceAlert')}">
                                        <span class="text-gray-500">${i18n.t('attendance.days')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Open Anomalies -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50 flex items-center justify-between">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-yellow-500" aria-hidden="true">warning</span>
                                ${i18n.t('attendance.openAnomalies')} (${openAnomalies.length})
                            </h3>
                            ${isHR ? `
                                <button onclick="TimeManagementPage.runAnomalyDetection()"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px] flex items-center gap-2">
                                    <span class="material-icons text-sm" aria-hidden="true">refresh</span>
                                    ${i18n.t('attendance.runDetection')}
                                </button>
                            ` : ''}
                        </div>

                        ${openAnomalies.length === 0 ? `
                            <div class="p-8 text-center text-gray-500">
                                <span class="material-icons text-4xl mb-2" aria-hidden="true">check_circle</span>
                                <p>${i18n.t('attendance.noAnomalies')}</p>
                            </div>
                        ` : `
                            <div class="divide-y divide-gray-200">
                                ${openAnomalies.map(anomaly => this.renderAnomalyCard(anomaly, isHR)).join('')}
                            </div>
                        `}
                    </div>

                    <!-- Resolved Anomalies -->
                    ${resolvedAnomalies.length > 0 ? `
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div class="p-4 border-b bg-gray-50">
                                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                    <span class="material-icons text-green-500" aria-hidden="true">check_circle</span>
                                    ${i18n.t('attendance.resolvedAnomalies')} (${resolvedAnomalies.length})
                                </h3>
                            </div>
                            <div class="divide-y divide-gray-200">
                                ${resolvedAnomalies.slice(0, 5).map(anomaly => this.renderAnomalyCard(anomaly, false)).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render anomaly card
         * @param {object} anomaly
         * @param {boolean} canResolve
         * @returns {string}
         */
        renderAnomalyCard(anomaly, canResolve) {
            const isThai = i18n.isThai();
            const employeeName = isThai ? anomaly.employeeNameTh : anomaly.employeeName;
            const typeInfo = MockAttendanceData.getAnomalyTypeInfo(anomaly.type);

            const severityColors = {
                critical: 'bg-red-100 text-red-800 border-red-300',
                high: 'bg-orange-100 text-orange-800 border-orange-300',
                medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                low: 'bg-blue-100 text-blue-800 border-blue-300'
            };

            const severityIcons = {
                critical: 'error',
                high: 'warning',
                medium: 'info',
                low: 'low_priority'
            };

            let detailsHtml = '';
            if (anomaly.type === 'late_arrival') {
                detailsHtml = `${i18n.t('attendance.scheduled')}: ${anomaly.details.scheduledTime}, ${i18n.t('attendance.actual')}: ${anomaly.details.actualTime} (+${anomaly.details.differenceMinutes} ${i18n.t('attendance.min')})`;
            } else if (anomaly.type === 'missing_checkout') {
                detailsHtml = `${i18n.t('attendance.checkIn')}: ${anomaly.details.checkIn}, ${i18n.t('attendance.expectedCheckOut')}: ${anomaly.details.expectedCheckout}`;
            } else if (anomaly.type === 'early_departure') {
                detailsHtml = `${i18n.t('attendance.scheduled')}: ${anomaly.details.scheduledEnd}, ${i18n.t('attendance.actual')}: ${anomaly.details.actualEnd} (-${anomaly.details.differenceMinutes} ${i18n.t('attendance.min')})`;
            } else if (anomaly.type === 'unapproved_ot') {
                detailsHtml = `${i18n.t('attendance.overtime')}: ${anomaly.details.overtimeHours.toFixed(1)} ${i18n.t('timeManagement.hours')}`;
            } else if (anomaly.type === 'consecutive_absence') {
                detailsHtml = `${anomaly.details.consecutiveDays} ${i18n.t('attendance.days')} (${i18n.t('attendance.since')} ${DateUtils.format(anomaly.details.startDate, 'short')})`;
            }

            return `
                <div class="p-4 hover:bg-gray-50 ${anomaly.status === 'resolved' ? 'bg-gray-50' : ''}">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex items-start gap-3">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center ${severityColors[anomaly.severity]}">
                                <span class="material-icons text-lg" aria-hidden="true">${typeInfo?.icon || severityIcons[anomaly.severity]}</span>
                            </div>
                            <div>
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="font-medium text-gray-900">${employeeName}</span>
                                    <span class="px-2 py-0.5 text-xs rounded-full ${severityColors[anomaly.severity]}">
                                        ${i18n.t('attendance.severity.' + anomaly.severity)}
                                    </span>
                                </div>
                                <p class="text-sm text-gray-700 mb-1">
                                    ${isThai ? typeInfo?.labelTh : typeInfo?.labelEn}
                                </p>
                                <p class="text-xs text-gray-500">${detailsHtml}</p>
                                <p class="text-xs text-gray-400 mt-1">
                                    ${DateUtils.format(anomaly.date, 'medium')}
                                </p>
                                ${anomaly.resolution ? `
                                    <div class="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                                        <span class="font-medium">${i18n.t('attendance.resolution')}:</span> ${anomaly.resolution}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        ${canResolve && anomaly.status === 'open' ? `
                            <button onclick="TimeManagementPage.resolveAnomaly('${anomaly.id}')"
                                    class="px-3 py-1 text-sm text-cg-red border border-cg-red rounded-lg hover:bg-red-50 transition min-h-[36px]">
                                ${i18n.t('attendance.resolve')}
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Run anomaly detection
         */
        async runAnomalyDetection() {
            ToastComponent.info(i18n.t('attendance.runningDetection'));

            // Simulate detection process
            setTimeout(() => {
                ToastComponent.success(i18n.t('attendance.detectionComplete'));
                Router.refresh();
            }, 1500);
        },

        /**
         * Resolve an anomaly
         * @param {string} anomalyId
         */
        resolveAnomaly(anomalyId) {
            const anomaly = detectedAnomalies.find(a => a.id === anomalyId);
            if (!anomaly) return;

            const isThai = i18n.isThai();
            const employeeName = isThai ? anomaly.employeeNameTh : anomaly.employeeName;
            const typeInfo = MockAttendanceData.getAnomalyTypeInfo(anomaly.type);

            ModalComponent.open({
                title: i18n.t('attendance.resolveAnomaly'),
                size: 'md',
                content: `
                    <div class="space-y-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <p class="font-medium text-gray-900">${employeeName}</p>
                            <p class="text-sm text-gray-600">${isThai ? typeInfo?.labelTh : typeInfo?.labelEn}</p>
                            <p class="text-sm text-gray-500">${DateUtils.format(anomaly.date, 'medium')}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                ${i18n.t('attendance.resolutionNote')}
                            </label>
                            <textarea id="resolution-note"
                                      rows="3"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red"
                                      placeholder="${i18n.t('attendance.resolutionPlaceholder')}"
                                      aria-label="${i18n.t('attendance.resolutionNote')}"></textarea>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('attendance.resolve'), primary: true, onclick: `TimeManagementPage.confirmResolveAnomaly('${anomalyId}')` }
                ]
            });
        },

        /**
         * Confirm resolve anomaly
         * @param {string} anomalyId
         */
        confirmResolveAnomaly(anomalyId) {
            const note = document.getElementById('resolution-note')?.value;
            if (!note) {
                ToastComponent.error(i18n.t('attendance.resolutionRequired'));
                return;
            }

            // Update anomaly in mock data
            const anomalyIndex = detectedAnomalies.findIndex(a => a.id === anomalyId);
            if (anomalyIndex >= 0) {
                detectedAnomalies[anomalyIndex].status = 'resolved';
                detectedAnomalies[anomalyIndex].resolution = note;
                detectedAnomalies[anomalyIndex].resolvedAt = new Date().toISOString();
                detectedAnomalies[anomalyIndex].resolvedBy = 'HR Admin';
            }

            ModalComponent.close();
            ToastComponent.success(i18n.t('attendance.anomalyResolved'));
            Router.refresh();
        },

        // ==========================================
        // IMPORT TAB
        // ==========================================

        /**
         * Render import tab
         * @returns {string}
         */
        renderImportTab() {
            const isThai = i18n.isThai();
            const isHR = RBAC.hasPermission('manage_shifts');

            return `
                <div class="space-y-6">
                    <!-- Import Wizard -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-cg-red" aria-hidden="true">upload_file</span>
                                ${i18n.t('attendance.importWizard')}
                            </h3>
                        </div>

                        <!-- Wizard Steps -->
                        <div class="p-4 border-b">
                            <div class="flex items-center justify-center gap-4" role="progressbar" aria-valuenow="${importWizardStep}" aria-valuemin="1" aria-valuemax="4">
                                ${[1, 2, 3, 4].map(step => `
                                    <div class="flex items-center ${step < 4 ? 'flex-1' : ''}">
                                        <div class="flex items-center gap-2">
                                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                                ${importWizardStep >= step ? 'bg-cg-red text-white' : 'bg-gray-200 text-gray-500'}">
                                                ${step}
                                            </div>
                                            <span class="hidden sm:inline text-sm ${importWizardStep >= step ? 'text-gray-900 font-medium' : 'text-gray-500'}">
                                                ${i18n.t('attendance.importStep' + step)}
                                            </span>
                                        </div>
                                        ${step < 4 ? `
                                            <div class="flex-1 h-0.5 mx-4 ${importWizardStep > step ? 'bg-cg-red' : 'bg-gray-200'}"></div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Wizard Content -->
                        <div class="p-6">
                            ${this.renderImportWizardContent()}
                        </div>
                    </div>

                    <!-- Import History -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-gray-500" aria-hidden="true">history</span>
                                ${i18n.t('attendance.importHistory')}
                            </h3>
                        </div>

                        ${importHistory.length === 0 ? `
                            <div class="p-8 text-center text-gray-500">
                                <span class="material-icons text-4xl mb-2" aria-hidden="true">folder_open</span>
                                <p>${i18n.t('attendance.noImportHistory')}</p>
                            </div>
                        ` : `
                            <div class="overflow-x-auto">
                                <table class="w-full" role="table" aria-label="${i18n.t('attendance.importHistory')}">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ${i18n.t('attendance.fileName')}
                                            </th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ${i18n.t('attendance.importDate')}
                                            </th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ${i18n.t('attendance.period')}
                                            </th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ${i18n.t('attendance.records')}
                                            </th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ${i18n.t('attendance.status')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        ${importHistory.map(imp => this.renderImportHistoryRow(imp)).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render import wizard content based on current step
         * @returns {string}
         */
        renderImportWizardContent() {
            const isThai = i18n.isThai();

            switch (importWizardStep) {
                case 1:
                    return `
                        <div class="text-center">
                            <div class="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-cg-red transition cursor-pointer"
                                 onclick="document.getElementById('import-file-input').click()"
                                 ondragover="event.preventDefault(); this.classList.add('border-cg-red', 'bg-red-50');"
                                 ondragleave="this.classList.remove('border-cg-red', 'bg-red-50');"
                                 ondrop="TimeManagementPage.handleFileDrop(event)"
                                 role="button"
                                 tabindex="0"
                                 aria-label="${i18n.t('attendance.uploadFile')}">
                                <span class="material-icons text-5xl text-gray-400 mb-4" aria-hidden="true">cloud_upload</span>
                                <p class="text-lg font-medium text-gray-700 mb-2">${i18n.t('attendance.dragDropFile')}</p>
                                <p class="text-sm text-gray-500 mb-4">${i18n.t('attendance.supportedFormats')}</p>
                                <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition min-h-[44px]">
                                    ${i18n.t('attendance.browseFiles')}
                                </button>
                            </div>
                            <input type="file" id="import-file-input" accept=".csv,.xlsx,.xls" class="hidden"
                                   onchange="TimeManagementPage.handleFileSelect(event)"
                                   aria-label="${i18n.t('attendance.selectFile')}">

                            <!-- Template Download -->
                            <div class="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                                <p class="text-sm text-blue-800 mb-2">
                                    <span class="material-icons text-sm align-middle mr-1" aria-hidden="true">info</span>
                                    ${i18n.t('attendance.templateInfo')}
                                </p>
                                <button onclick="TimeManagementPage.downloadTemplate()"
                                        class="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                    <span class="material-icons text-sm" aria-hidden="true">download</span>
                                    ${i18n.t('attendance.downloadTemplate')}
                                </button>
                            </div>
                        </div>
                    `;

                case 2:
                    const templates = MockAttendanceData.columnMappingTemplates;
                    const previewData = importFileData?.preview || [];
                    const headers = importFileData?.headers || [];

                    return `
                        <div class="space-y-6">
                            <!-- Template Selection -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    ${i18n.t('attendance.selectTemplate')}
                                </label>
                                <div class="flex flex-wrap gap-2">
                                    ${templates.map(tpl => `
                                        <button onclick="TimeManagementPage.applyMappingTemplate('${tpl.id}')"
                                                class="px-4 py-2 border border-gray-300 rounded-lg hover:border-cg-red hover:text-cg-red transition min-h-[44px]">
                                            ${isThai ? tpl.nameTh : tpl.name}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Column Mapping -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${this.renderColumnMappingFields(headers)}
                            </div>

                            <!-- Data Preview -->
                            ${previewData.length > 0 ? `
                                <div>
                                    <h4 class="text-sm font-medium text-gray-700 mb-2">${i18n.t('attendance.dataPreview')}</h4>
                                    <div class="overflow-x-auto border rounded-lg">
                                        <table class="w-full text-sm">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    ${headers.map(h => `<th class="px-3 py-2 text-left">${h}</th>`).join('')}
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y">
                                                ${previewData.slice(0, 5).map(row => `
                                                    <tr>
                                                        ${headers.map(h => `<td class="px-3 py-2">${row[h] || '-'}</td>`).join('')}
                                                    </tr>
                                                `).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Navigation -->
                            <div class="flex justify-between pt-4 border-t">
                                <button onclick="TimeManagementPage.setImportStep(1)"
                                        class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition min-h-[44px]">
                                    ${i18n.t('common.back')}
                                </button>
                                <button onclick="TimeManagementPage.validateImportData()"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                                    ${i18n.t('attendance.validateData')}
                                </button>
                            </div>
                        </div>
                    `;

                case 3:
                    const validationResults = importFileData?.validationResults || { valid: 0, invalid: 0, errors: [] };

                    return `
                        <div class="space-y-6">
                            <!-- Validation Summary -->
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="p-4 bg-green-50 rounded-lg text-center">
                                    <p class="text-3xl font-bold text-green-700">${validationResults.valid}</p>
                                    <p class="text-sm text-green-600">${i18n.t('attendance.validRecords')}</p>
                                </div>
                                <div class="p-4 bg-red-50 rounded-lg text-center">
                                    <p class="text-3xl font-bold text-red-700">${validationResults.invalid}</p>
                                    <p class="text-sm text-red-600">${i18n.t('attendance.invalidRecords')}</p>
                                </div>
                                <div class="p-4 bg-blue-50 rounded-lg text-center">
                                    <p class="text-3xl font-bold text-blue-700">${validationResults.valid + validationResults.invalid}</p>
                                    <p class="text-sm text-blue-600">${i18n.t('attendance.totalRecords')}</p>
                                </div>
                            </div>

                            <!-- Validation Errors -->
                            ${validationResults.errors.length > 0 ? `
                                <div class="border border-red-200 rounded-lg overflow-hidden">
                                    <div class="p-3 bg-red-50 border-b border-red-200">
                                        <h4 class="text-sm font-medium text-red-800 flex items-center gap-2">
                                            <span class="material-icons text-sm" aria-hidden="true">error</span>
                                            ${i18n.t('attendance.validationErrors')} (${validationResults.errors.length})
                                        </h4>
                                    </div>
                                    <div class="max-h-60 overflow-y-auto">
                                        <table class="w-full text-sm">
                                            <thead class="bg-gray-50 sticky top-0">
                                                <tr>
                                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.row')}</th>
                                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.field')}</th>
                                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.error')}</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y">
                                                ${validationResults.errors.slice(0, 20).map(err => `
                                                    <tr>
                                                        <td class="px-3 py-2">${err.row}</td>
                                                        <td class="px-3 py-2">${err.field}</td>
                                                        <td class="px-3 py-2 text-red-600">${err.error}</td>
                                                    </tr>
                                                `).join('')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ` : `
                                <div class="p-4 bg-green-50 rounded-lg text-center">
                                    <span class="material-icons text-4xl text-green-500 mb-2" aria-hidden="true">check_circle</span>
                                    <p class="text-green-700 font-medium">${i18n.t('attendance.allRecordsValid')}</p>
                                </div>
                            `}

                            <!-- Navigation -->
                            <div class="flex justify-between pt-4 border-t">
                                <button onclick="TimeManagementPage.setImportStep(2)"
                                        class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition min-h-[44px]">
                                    ${i18n.t('common.back')}
                                </button>
                                <button onclick="TimeManagementPage.executeImport()"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]"
                                        ${validationResults.valid === 0 ? 'disabled' : ''}>
                                    ${i18n.t('attendance.importData')} (${validationResults.valid} ${i18n.t('attendance.records')})
                                </button>
                            </div>
                        </div>
                    `;

                case 4:
                    return `
                        <div class="text-center py-8">
                            <span class="material-icons text-6xl text-green-500 mb-4" aria-hidden="true">check_circle</span>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">${i18n.t('attendance.importSuccess')}</h3>
                            <p class="text-gray-600 mb-6">${i18n.t('attendance.importSuccessMessage')}</p>
                            <div class="flex justify-center gap-4">
                                <button onclick="TimeManagementPage.resetImportWizard()"
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition min-h-[44px]">
                                    ${i18n.t('attendance.importAnother')}
                                </button>
                                <button onclick="TimeManagementPage.switchTab('attendance')"
                                        class="px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                                    ${i18n.t('attendance.viewRecords')}
                                </button>
                            </div>
                        </div>
                    `;

                default:
                    return '';
            }
        },

        /**
         * Render column mapping fields
         * @param {array} headers
         * @returns {string}
         */
        renderColumnMappingFields(headers) {
            const fields = [
                { key: 'employeeId', label: i18n.t('attendance.columnEmployeeId'), required: true },
                { key: 'date', label: i18n.t('attendance.columnDate'), required: true },
                { key: 'checkIn', label: i18n.t('attendance.columnCheckIn'), required: false },
                { key: 'checkOut', label: i18n.t('attendance.columnCheckOut'), required: false },
                { key: 'shiftCode', label: i18n.t('attendance.columnShift'), required: false },
                { key: 'source', label: i18n.t('attendance.columnSource'), required: false }
            ];

            return fields.map(field => `
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                        ${field.label} ${field.required ? '<span class="text-red-500">*</span>' : ''}
                    </label>
                    <select id="mapping-${field.key}"
                            onchange="TimeManagementPage.updateColumnMapping('${field.key}', this.value)"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red min-h-[44px]"
                            aria-label="${field.label}">
                        <option value="">${i18n.t('attendance.selectColumn')}</option>
                        ${headers.map(h => `
                            <option value="${h}" ${columnMapping[field.key] === h ? 'selected' : ''}>${h}</option>
                        `).join('')}
                    </select>
                </div>
            `).join('');
        },

        /**
         * Render import history row
         * @param {object} imp
         * @returns {string}
         */
        renderImportHistoryRow(imp) {
            const statusColors = {
                completed: 'bg-green-100 text-green-800',
                failed: 'bg-red-100 text-red-800',
                processing: 'bg-yellow-100 text-yellow-800'
            };

            return `
                <tr class="hover:bg-gray-50">
                    <td class="px-4 py-4">
                        <div class="flex items-center gap-2">
                            <span class="material-icons text-gray-400" aria-hidden="true">
                                ${imp.sourceType === 'csv' ? 'description' : imp.sourceType === 'excel' ? 'grid_on' : 'cloud'}
                            </span>
                            <div>
                                <p class="font-medium text-gray-900">${imp.fileName}</p>
                                <p class="text-xs text-gray-500">${imp.importedBy}</p>
                            </div>
                        </div>
                    </td>
                    <td class="px-4 py-4 text-gray-600">
                        ${DateUtils.format(imp.importDate, 'medium')}
                    </td>
                    <td class="px-4 py-4 text-gray-600">
                        ${DateUtils.format(imp.period.start, 'short')} - ${DateUtils.format(imp.period.end, 'short')}
                    </td>
                    <td class="px-4 py-4">
                        <span class="text-green-600">${imp.successfulRecords}</span> /
                        <span class="${imp.failedRecords > 0 ? 'text-red-600' : 'text-gray-600'}">${imp.totalRecords}</span>
                        ${imp.failedRecords > 0 ? `
                            <button onclick="TimeManagementPage.showImportErrors('${imp.id}')"
                                    class="ml-2 text-xs text-red-600 hover:underline">
                                (${imp.failedRecords} ${i18n.t('attendance.failed')})
                            </button>
                        ` : ''}
                    </td>
                    <td class="px-4 py-4">
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${statusColors[imp.status]}">
                            ${i18n.t('attendance.importStatus.' + imp.status)}
                        </span>
                    </td>
                </tr>
            `;
        },

        /**
         * Handle file selection
         * @param {Event} event
         */
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                this.processImportFile(file);
            }
        },

        /**
         * Handle file drop
         * @param {Event} event
         */
        handleFileDrop(event) {
            event.preventDefault();
            event.target.classList.remove('border-cg-red', 'bg-red-50');
            const file = event.dataTransfer.files[0];
            if (file) {
                this.processImportFile(file);
            }
        },

        /**
         * Process import file
         * @param {File} file
         */
        processImportFile(file) {
            const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
                ToastComponent.error(i18n.t('attendance.invalidFileType'));
                return;
            }

            // Simulate file parsing
            ToastComponent.info(i18n.t('attendance.parsingFile'));

            setTimeout(() => {
                // Mock parsed data
                importFileData = {
                    fileName: file.name,
                    fileSize: file.size,
                    headers: ['Employee ID', 'Date', 'Check In', 'Check Out', 'Shift', 'Device'],
                    preview: [
                        { 'Employee ID': 'EMP001', 'Date': '2026-01-02', 'Check In': '08:25', 'Check Out': '17:35', 'Shift': 'REG', 'Device': 'Biometric' },
                        { 'Employee ID': 'EMP001', 'Date': '2026-01-03', 'Check In': '08:52', 'Check Out': '17:30', 'Shift': 'REG', 'Device': 'Mobile' },
                        { 'Employee ID': 'EMP_DR001', 'Date': '2026-01-02', 'Check In': '09:30', 'Check Out': '18:30', 'Shift': 'FLX', 'Device': 'Mobile' },
                        { 'Employee ID': 'EMP_DR002', 'Date': '2026-01-02', 'Check In': '08:28', 'Check Out': '17:32', 'Shift': 'REG', 'Device': 'Biometric' }
                    ],
                    totalRows: 250
                };

                importWizardStep = 2;
                ToastComponent.success(i18n.t('attendance.fileLoaded'));
                Router.refresh();
            }, 1000);
        },

        /**
         * Apply mapping template
         * @param {string} templateId
         */
        applyMappingTemplate(templateId) {
            const template = MockAttendanceData.columnMappingTemplates.find(t => t.id === templateId);
            if (template) {
                columnMapping = { ...template.mappings };
                Router.refresh();
                ToastComponent.success(i18n.t('attendance.templateApplied'));
            }
        },

        /**
         * Update column mapping
         * @param {string} field
         * @param {string} column
         */
        updateColumnMapping(field, column) {
            columnMapping[field] = column;
        },

        /**
         * Validate import data
         */
        validateImportData() {
            if (!columnMapping.employeeId || !columnMapping.date) {
                ToastComponent.error(i18n.t('attendance.requiredMappingsMissing'));
                return;
            }

            ToastComponent.info(i18n.t('attendance.validatingData'));

            setTimeout(() => {
                // Simulate validation
                importFileData.validationResults = {
                    valid: 245,
                    invalid: 5,
                    errors: [
                        { row: 45, field: 'date', error: 'Invalid date format' },
                        { row: 78, field: 'employeeId', error: 'Employee not found' },
                        { row: 112, field: 'checkIn', error: 'Invalid time format' },
                        { row: 156, field: 'employeeId', error: 'Missing required field' },
                        { row: 201, field: 'id', error: 'Duplicate record' }
                    ]
                };

                importWizardStep = 3;
                Router.refresh();
            }, 1500);
        },

        /**
         * Execute import
         */
        executeImport() {
            ToastComponent.info(i18n.t('attendance.importing'));

            setTimeout(() => {
                importWizardStep = 4;
                ToastComponent.success(i18n.t('attendance.importComplete'));
                Router.refresh();
            }, 2000);
        },

        /**
         * Set import wizard step
         * @param {number} step
         */
        setImportStep(step) {
            importWizardStep = step;
            Router.refresh();
        },

        /**
         * Reset import wizard
         */
        resetImportWizard() {
            importWizardStep = 1;
            importFileData = null;
            columnMapping = {};
            Router.refresh();
        },

        /**
         * Download import template
         */
        downloadTemplate() {
            ToastComponent.info(i18n.t('attendance.downloadingTemplate'));
            // In real implementation, this would trigger a file download
        },

        /**
         * Show import errors
         * @param {string} importId
         */
        showImportErrors(importId) {
            const imp = importHistory.find(i => i.id === importId);
            if (!imp || !imp.errorLog) return;

            ModalComponent.open({
                title: i18n.t('attendance.importErrors'),
                size: 'lg',
                content: `
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.row')}</th>
                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.field')}</th>
                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.value')}</th>
                                    <th class="px-3 py-2 text-left">${i18n.t('attendance.error')}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${imp.errorLog.map(err => `
                                    <tr>
                                        <td class="px-3 py-2">${err.row}</td>
                                        <td class="px-3 py-2">${err.field}</td>
                                        <td class="px-3 py-2 text-gray-500">${err.value || '-'}</td>
                                        <td class="px-3 py-2 text-red-600">${err.error}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        // ==========================================
        // SUMMARY TAB
        // ==========================================

        /**
         * Render summary tab
         * @returns {string}
         */
        renderSummaryTab() {
            const isThai = i18n.isThai();
            const summary = monthlySummary || MockAttendanceData.getMonthlySummary('2026-01');

            if (!summary) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4" aria-hidden="true">analytics</span>
                        <p class="text-lg">${i18n.t('attendance.noSummaryData')}</p>
                    </div>
                `;
            }

            const stats = summary.overallStats;

            return `
                <div class="space-y-6">
                    <!-- Period Selector -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex flex-wrap items-center gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    ${i18n.t('attendance.selectPeriod')}
                                </label>
                                <input type="month" id="summary-period"
                                       value="${currentYear}-${String(currentMonth).padStart(2, '0')}"
                                       onchange="TimeManagementPage.loadMonthlySummary(this.value)"
                                       class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cg-red focus:border-cg-red min-h-[44px]"
                                       aria-label="${i18n.t('attendance.selectPeriod')}">
                            </div>
                            <button onclick="TimeManagementPage.exportSummary()"
                                    class="mt-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition min-h-[44px] flex items-center gap-2">
                                <span class="material-icons text-sm" aria-hidden="true">download</span>
                                ${i18n.t('attendance.exportReport')}
                            </button>
                        </div>
                    </div>

                    <!-- Overall Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-blue-600" aria-hidden="true">groups</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${stats.totalEmployees}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('attendance.totalEmployees')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-green-600" aria-hidden="true">trending_up</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${stats.averageAttendanceRate.toFixed(1)}%</p>
                                    <p class="text-sm text-gray-500">${i18n.t('attendance.attendanceRate')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-red-600" aria-hidden="true">schedule</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${stats.totalLateDays}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('attendance.totalLateDays')}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span class="material-icons text-purple-600" aria-hidden="true">more_time</span>
                                </div>
                                <div>
                                    <p class="text-2xl font-bold text-gray-900">${stats.totalOvertimeHours.toFixed(1)}</p>
                                    <p class="text-sm text-gray-500">${i18n.t('attendance.totalOT')} (${i18n.t('timeManagement.hours')})</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Department Summary -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-gray-500" aria-hidden="true">business</span>
                                ${i18n.t('attendance.departmentSummary')}
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full" role="table" aria-label="${i18n.t('attendance.departmentSummary')}">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.department')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.employees')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.attendanceRate')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.lateDays')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.absentDays')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.overtime')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${summary.departmentSummary.map(dept => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-4 font-medium text-gray-900">
                                                ${isThai ? dept.departmentTh : dept.department}
                                            </td>
                                            <td class="px-4 py-4 text-center text-gray-700">${dept.totalEmployees}</td>
                                            <td class="px-4 py-4 text-center">
                                                <span class="${dept.averageAttendanceRate >= 95 ? 'text-green-600' : dept.averageAttendanceRate >= 90 ? 'text-yellow-600' : 'text-red-600'} font-medium">
                                                    ${dept.averageAttendanceRate.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td class="px-4 py-4 text-center text-gray-700">${dept.totalLateDays}</td>
                                            <td class="px-4 py-4 text-center text-gray-700">${dept.totalAbsentDays}</td>
                                            <td class="px-4 py-4 text-center text-gray-700">${dept.totalOvertimeHours.toFixed(1)} h</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Employee Details -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="p-4 border-b bg-gray-50">
                            <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-gray-500" aria-hidden="true">person</span>
                                ${i18n.t('attendance.employeeSummary')}
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full" role="table" aria-label="${i18n.t('attendance.employeeSummary')}">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.employee')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.present')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.late')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.absent')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.workingHours')}
                                        </th>
                                        <th scope="col" class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                            ${i18n.t('attendance.attendanceRate')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    ${summary.employees.map(emp => `
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-4">
                                                <div class="font-medium text-gray-900">
                                                    ${isThai ? emp.employeeNameTh : emp.employeeName}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    ${isThai ? emp.departmentTh : emp.department}
                                                </div>
                                            </td>
                                            <td class="px-4 py-4 text-center text-green-600 font-medium">${emp.presentDays}/${emp.workingDays}</td>
                                            <td class="px-4 py-4 text-center ${emp.lateDays > 0 ? 'text-red-600 font-medium' : 'text-gray-700'}">${emp.lateDays}</td>
                                            <td class="px-4 py-4 text-center ${emp.absentDays > 0 ? 'text-red-600 font-medium' : 'text-gray-700'}">${emp.absentDays}</td>
                                            <td class="px-4 py-4 text-center text-gray-700">${emp.totalWorkingHours.toFixed(1)} h</td>
                                            <td class="px-4 py-4 text-center">
                                                <span class="${emp.attendanceRate >= 95 ? 'text-green-600' : emp.attendanceRate >= 90 ? 'text-yellow-600' : 'text-red-600'} font-medium">
                                                    ${emp.attendanceRate.toFixed(1)}%
                                                </span>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Load monthly summary for a given period
         * @param {string} period - Format: YYYY-MM
         */
        async loadMonthlySummary(period) {
            const [year, month] = period.split('-');
            currentYear = parseInt(year);
            currentMonth = parseInt(month);

            try {
                monthlySummary = MockAttendanceData.getMonthlySummary(period);
                Router.refresh();
            } catch (error) {
                console.error('Error loading summary:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Export summary report
         */
        exportSummary() {
            ToastComponent.info(i18n.t('attendance.exportingReport'));
            // In real implementation, this would trigger a file download
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeManagementPage;
}

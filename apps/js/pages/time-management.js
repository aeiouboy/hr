/**
 * Time Management Page
 * Work shift configuration and assignment management
 */

const TimeManagementPage = (function() {
    let activeTab = 'shifts';
    let shifts = [];
    let shiftAssignments = [];
    let selectedShift = null;
    let calendarData = null;
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = new Date().getFullYear();

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
                { id: 'calendar', icon: 'calendar_month', label: i18n.t('timeManagement.calendar') }
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
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeManagementPage;
}

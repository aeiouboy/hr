/**
 * Leave Request Page
 * Employee self-service leave request functionality
 */

const LeaveRequestPage = (function() {
    let activeTab = 'balances';
    let leaveBalances = {};
    let leaveRequests = [];
    let teamLeaves = [];
    let showTeamCalendar = false;

    return {
        /**
         * Render the leave request page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');
            const hasData = Object.keys(leaveBalances).length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();
            const isManager = RBAC.isManager();

            // Define tabs
            const tabs = [
                { id: 'balances', icon: 'account_balance_wallet', label: i18n.t('leave.balances') },
                { id: 'request', icon: 'add_circle', label: i18n.t('leave.newRequest') },
                { id: 'history', icon: 'history', label: i18n.t('leave.history') },
                { id: 'calendar', icon: 'calendar_month', label: i18n.t('leave.calendar') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('leave.title')}</h1>
                        <button onclick="LeaveRequestPage.switchTab('request')"
                                class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            <span class="material-icons text-sm">add</span>
                            ${i18n.t('leave.newRequest')}
                        </button>
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist">
                        ${tabs.map(tab => `
                            <button onclick="LeaveRequestPage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="leave-tab-content">
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
                case 'balances':
                    return this.renderBalancesTab();
                case 'request':
                    return this.renderRequestTab();
                case 'history':
                    return this.renderHistoryTab();
                case 'calendar':
                    return this.renderCalendarTab();
                default:
                    return this.renderBalancesTab();
            }
        },

        /**
         * Render balances tab
         * @returns {string}
         */
        renderBalancesTab() {
            const isThai = i18n.isThai();
            const balances = Object.values(leaveBalances);
            const employee = AppState.get('currentEmployee');
            const gender = employee?.personalInfo?.gender?.toLowerCase() || 'male';

            // Filter balances based on gender
            const filteredBalances = balances.filter(balance => {
                if (balance.applicableGender && balance.applicableGender !== gender) {
                    return false;
                }
                return true;
            });

            if (filteredBalances.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4">event_busy</span>
                        <p class="text-lg">${i18n.t('leave.noBalanceData')}</p>
                    </div>
                `;
            }

            return `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${filteredBalances.map(balance => this.renderBalanceCard(balance)).join('')}
                </div>
            `;
        },

        /**
         * Render a single balance card
         * @param {object} balance
         * @returns {string}
         */
        renderBalanceCard(balance) {
            const isThai = i18n.isThai();
            const name = isThai ? balance.nameTh : balance.nameEn;
            const percentage = balance.entitled > 0 ? ((balance.remaining / balance.entitled) * 100) : 0;
            const isLowBalance = percentage < 20 && balance.remaining > 0;

            // Get color based on type
            const colors = this.getLeaveTypeColors(balance.type);

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center gap-2">
                            <div class="w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center">
                                <span class="material-icons ${colors.text}">event_available</span>
                            </div>
                            <div>
                                <h3 class="font-medium text-gray-900">${name}</h3>
                                ${balance.expiryDate ? `
                                    <p class="text-xs text-gray-500">
                                        ${i18n.t('leave.expiryDate')}: ${DateUtils.format(balance.expiryDate, 'short')}
                                    </p>
                                ` : ''}
                            </div>
                        </div>
                        ${isLowBalance ? `
                            <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                ${i18n.t('leave.warning.lowBalance')}
                            </span>
                        ` : ''}
                    </div>

                    <!-- Progress Bar -->
                    <div class="mb-4">
                        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full ${colors.bar} transition-all duration-300"
                                 style="width: ${percentage}%"></div>
                        </div>
                    </div>

                    <!-- Stats -->
                    <div class="grid grid-cols-4 gap-2 text-center text-sm">
                        <div>
                            <p class="text-gray-500">${i18n.t('leave.entitled')}</p>
                            <p class="font-bold text-gray-900">${balance.entitled}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">${i18n.t('leave.used')}</p>
                            <p class="font-bold text-gray-900">${balance.used}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">${i18n.t('leave.pending')}</p>
                            <p class="font-bold text-yellow-600">${balance.pending}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">${i18n.t('leave.remaining')}</p>
                            <p class="font-bold ${colors.text}">${balance.remaining}</p>
                        </div>
                    </div>

                    ${balance.carryOver ? `
                        <div class="mt-3 pt-3 border-t text-xs text-gray-500">
                            ${i18n.t('leave.carryOver')}: ${balance.carryOver} ${i18n.t('leave.days')}
                        </div>
                    ` : ''}

                    <!-- Quick Request Button -->
                    <button onclick="LeaveRequestPage.openRequestForm('${balance.type}')"
                            class="mt-4 w-full py-2 text-sm font-medium ${colors.text} ${colors.bg} rounded-lg hover:opacity-80 transition"
                            ${balance.remaining <= 0 ? 'disabled' : ''}>
                        ${i18n.t('leave.request')}
                    </button>
                </div>
            `;
        },

        /**
         * Render request tab (form)
         * @returns {string}
         */
        renderRequestTab() {
            const isThai = i18n.isThai();
            const leaveTypes = Object.values(leaveBalances).filter(b => b.remaining > 0);
            const employee = AppState.get('currentEmployee');
            const teamMembers = MockEmployeeData.teamMembers || [];

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form id="leave-request-form" onsubmit="LeaveRequestPage.handleSubmit(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-6">
                                <!-- Leave Type -->
                                ${FormFieldComponent.select({
                                    name: 'leaveType',
                                    label: i18n.t('leave.selectType'),
                                    required: true,
                                    options: leaveTypes.map(lt => ({
                                        value: lt.type,
                                        label: `${isThai ? lt.nameTh : lt.nameEn} (${lt.remaining} ${i18n.t('leave.days')} ${isThai ? 'คงเหลือ' : 'left'})`
                                    })),
                                    onChange: 'LeaveRequestPage.onLeaveTypeChange(this.value)'
                                })}

                                <!-- Start Date -->
                                ${FormFieldComponent.date({
                                    name: 'startDate',
                                    label: i18n.t('leave.startDate'),
                                    required: true,
                                    min: DateUtils.today(),
                                    onChange: 'LeaveRequestPage.calculateDuration()'
                                })}

                                <!-- End Date -->
                                ${FormFieldComponent.date({
                                    name: 'endDate',
                                    label: i18n.t('leave.endDate'),
                                    required: true,
                                    min: DateUtils.today(),
                                    onChange: 'LeaveRequestPage.calculateDuration()'
                                })}

                                <!-- Half Day Option -->
                                <div id="half-day-section" class="hidden">
                                    ${FormFieldComponent.checkbox({
                                        name: 'isHalfDay',
                                        label: i18n.t('leave.halfDay'),
                                        onChange: 'LeaveRequestPage.toggleHalfDay(this.checked)'
                                    })}
                                    <div id="half-day-options" class="hidden mt-2 ml-6">
                                        ${FormFieldComponent.radio({
                                            name: 'halfDayPeriod',
                                            options: [
                                                { value: 'morning', label: i18n.t('leave.morning') },
                                                { value: 'afternoon', label: i18n.t('leave.afternoon') }
                                            ]
                                        })}
                                    </div>
                                </div>

                                <!-- Duration Display -->
                                <div id="duration-display" class="hidden p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-600">${i18n.t('leave.duration')}</p>
                                    <p class="text-2xl font-bold text-cg-red">
                                        <span id="duration-days">0</span> ${i18n.t('leave.workingDays')}
                                    </p>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-6">
                                <!-- Reason -->
                                ${FormFieldComponent.textarea({
                                    name: 'reason',
                                    label: i18n.t('leave.reason'),
                                    required: true,
                                    rows: 3,
                                    placeholder: isThai ? 'ระบุเหตุผลในการลา' : 'Please provide a reason for your leave'
                                })}

                                <!-- Substitute Person -->
                                ${FormFieldComponent.select({
                                    name: 'substitutePerson',
                                    label: i18n.t('leave.substitute'),
                                    required: false,
                                    helperText: i18n.t('leave.substituteDesc'),
                                    options: [
                                        { value: '', label: isThai ? 'เลือกผู้รับมอบงาน' : 'Select substitute person' },
                                        ...teamMembers.map(tm => ({
                                            value: tm.employeeId,
                                            label: isThai ? tm.nameTh : tm.name
                                        }))
                                    ]
                                })}

                                <!-- Medical Certificate (for sick leave) -->
                                <div id="medical-cert-section" class="hidden">
                                    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                                        <p class="text-sm text-yellow-700 flex items-center gap-2">
                                            <span class="material-icons text-sm">warning</span>
                                            ${i18n.t('leave.medicalCertRequired')}
                                        </p>
                                    </div>
                                    ${FormFieldComponent.file({
                                        name: 'medicalCert',
                                        label: i18n.t('leave.medicalCert'),
                                        accept: 'image/*,.pdf'
                                    })}
                                </div>

                                <!-- Attachment -->
                                ${FormFieldComponent.file({
                                    name: 'attachment',
                                    label: i18n.t('leave.attachment'),
                                    accept: 'image/*,.pdf',
                                    helperText: isThai ? 'ไฟล์ที่รองรับ: รูปภาพ, PDF' : 'Supported: Images, PDF'
                                })}
                            </div>
                        </div>

                        <!-- Warning Messages -->
                        <div id="leave-warnings" class="hidden mt-6 space-y-2"></div>

                        <!-- Form Actions -->
                        <div class="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-end">
                            <button type="button"
                                    onclick="LeaveRequestPage.switchTab('balances')"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                                ${i18n.t('common.cancel')}
                            </button>
                            <button type="submit"
                                    class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                ${i18n.t('leave.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            `;
        },

        /**
         * Render history tab
         * @returns {string}
         */
        renderHistoryTab() {
            const isThai = i18n.isThai();
            const requests = leaveRequests.sort((a, b) =>
                new Date(b.submittedAt) - new Date(a.submittedAt)
            );

            if (requests.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4">history</span>
                        <p class="text-lg">${i18n.t('leave.noHistoryData')}</p>
                    </div>
                `;
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <!-- Filters -->
                    <div class="p-4 border-b bg-gray-50 flex flex-wrap gap-4">
                        <select onchange="LeaveRequestPage.filterHistory(this.value)"
                                class="px-3 py-2 border rounded-lg text-sm">
                            <option value="all">${isThai ? 'ทั้งหมด' : 'All Status'}</option>
                            <option value="pending">${i18n.t('leave.status.pending')}</option>
                            <option value="approved">${i18n.t('leave.status.approved')}</option>
                            <option value="rejected">${i18n.t('leave.status.rejected')}</option>
                        </select>
                    </div>

                    <!-- History List -->
                    <div class="divide-y divide-gray-200" id="leave-history-list">
                        ${requests.map(request => this.renderHistoryItem(request)).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render a single history item
         * @param {object} request
         * @returns {string}
         */
        renderHistoryItem(request) {
            const isThai = i18n.isThai();
            const typeName = isThai ? request.typeNameTh : request.typeNameEn;
            const colors = this.getLeaveTypeColors(request.type);

            const statusConfig = {
                pending: { class: 'bg-yellow-100 text-yellow-800', icon: 'pending' },
                approved: { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                rejected: { class: 'bg-red-100 text-red-800', icon: 'cancel' },
                cancelled: { class: 'bg-gray-100 text-gray-800', icon: 'block' }
            };
            const status = statusConfig[request.status] || statusConfig.pending;

            return `
                <div class="p-4 hover:bg-gray-50">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0">
                                <span class="material-icons ${colors.text}">event_available</span>
                            </div>
                            <div class="min-w-0">
                                <h3 class="font-medium text-gray-900">${typeName}</h3>
                                <p class="text-sm text-gray-600">
                                    ${DateUtils.format(request.startDate, 'medium')} - ${DateUtils.format(request.endDate, 'medium')}
                                    <span class="text-gray-400">|</span>
                                    ${request.days} ${request.days === 1 ? i18n.t('leave.day') : i18n.t('leave.days')}
                                    ${request.halfDay ? `(${isThai ? (request.halfDay === 'morning' ? 'ครึ่งเช้า' : 'ครึ่งบ่าย') : request.halfDay})` : ''}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${i18n.t('leave.submittedDate')}: ${DateUtils.formatDateTime(request.submittedAt)}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.class}">
                                <span class="material-icons text-xs">${status.icon}</span>
                                ${i18n.t(`leave.status.${request.status}`)}
                            </span>

                            ${request.status === 'pending' ? `
                                <button onclick="LeaveRequestPage.cancelRequest('${request.id}')"
                                        class="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition">
                                    ${i18n.t('leave.cancelRequest')}
                                </button>
                            ` : ''}

                            <button onclick="LeaveRequestPage.viewRequestDetails('${request.id}')"
                                    class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition">
                                ${i18n.t('leave.viewDetails')}
                            </button>
                        </div>
                    </div>

                    ${request.reason ? `
                        <div class="mt-3 ml-16 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                            ${isThai ? request.reasonTh || request.reason : request.reason}
                        </div>
                    ` : ''}

                    ${request.status === 'approved' && request.approvedByName ? `
                        <div class="mt-2 ml-16 text-xs text-gray-500">
                            ${i18n.t('leave.approvedBy')}: ${request.approvedByName}
                            | ${i18n.t('leave.approvedDate')}: ${DateUtils.format(request.approvedDate, 'medium')}
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render calendar tab
         * @returns {string}
         */
        renderCalendarTab() {
            const isThai = i18n.isThai();
            const isManager = RBAC.isManager();

            return `
                <div class="space-y-4">
                    ${isManager ? `
                        <div class="flex items-center gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox"
                                       id="show-team-calendar"
                                       ${showTeamCalendar ? 'checked' : ''}
                                       onchange="LeaveRequestPage.toggleTeamCalendar(this.checked)"
                                       class="w-4 h-4 text-cg-red border-gray-300 rounded focus:ring-cg-red">
                                <span class="text-sm text-gray-700">
                                    ${i18n.t('leave.teamCalendar')}
                                </span>
                            </label>
                        </div>
                    ` : ''}

                    ${LeaveCalendarComponent.render({
                        leaves: leaveRequests.filter(r => r.status === 'approved' || r.status === 'pending'),
                        teamLeaves: showTeamCalendar ? teamLeaves : [],
                        showTeam: showTeamCalendar,
                        containerId: 'leave-calendar'
                    })}
                </div>
            `;
        },

        /**
         * Get calendar options for refresh
         * @returns {object}
         */
        getCalendarOptions() {
            return {
                leaves: leaveRequests.filter(r => r.status === 'approved' || r.status === 'pending'),
                teamLeaves: showTeamCalendar ? teamLeaves : [],
                showTeam: showTeamCalendar
            };
        },

        /**
         * Toggle team calendar visibility
         * @param {boolean} show
         */
        toggleTeamCalendar(show) {
            showTeamCalendar = show;
            const container = document.getElementById('leave-calendar');
            if (container) {
                container.outerHTML = LeaveCalendarComponent.render(this.getCalendarOptions());
            }
        },

        /**
         * Get leave type colors
         * @param {string} type
         * @returns {object}
         */
        getLeaveTypeColors(type) {
            const colors = {
                annual: { bg: 'bg-blue-100', text: 'text-blue-600', bar: 'bg-blue-500' },
                sick: { bg: 'bg-orange-100', text: 'text-orange-600', bar: 'bg-orange-500' },
                personal: { bg: 'bg-purple-100', text: 'text-purple-600', bar: 'bg-purple-500' },
                maternity: { bg: 'bg-pink-100', text: 'text-pink-600', bar: 'bg-pink-500' },
                paternity: { bg: 'bg-teal-100', text: 'text-teal-600', bar: 'bg-teal-500' },
                ordination: { bg: 'bg-amber-100', text: 'text-amber-600', bar: 'bg-amber-500' },
                military: { bg: 'bg-gray-100', text: 'text-gray-600', bar: 'bg-gray-500' },
                compensatory: { bg: 'bg-green-100', text: 'text-green-600', bar: 'bg-green-500' }
            };
            return colors[type] || colors.annual;
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const container = document.getElementById('leave-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent();
            }

            // Update tab buttons styling and aria-selected
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const btnTabId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                const isActive = btnTabId === activeTab;

                btn.setAttribute('aria-selected', isActive.toString());
                btn.classList.toggle('bg-white', isActive);
                btn.classList.toggle('text-cg-red', isActive);
                btn.classList.toggle('shadow-sm', isActive);
                btn.classList.toggle('text-gray-600', !isActive);
                btn.classList.toggle('hover:text-gray-900', !isActive);
            });
        },

        /**
         * Open request form with pre-selected type
         * @param {string} leaveType
         */
        openRequestForm(leaveType) {
            activeTab = 'request';
            Router.refresh();

            // Pre-select the leave type after render
            setTimeout(() => {
                const select = document.querySelector('[name="leaveType"]');
                if (select) {
                    select.value = leaveType;
                    this.onLeaveTypeChange(leaveType);
                }
            }, 100);
        },

        /**
         * Handle leave type change
         * @param {string} type
         */
        onLeaveTypeChange(type) {
            const medicalSection = document.getElementById('medical-cert-section');
            if (medicalSection) {
                medicalSection.classList.toggle('hidden', type !== 'sick');
            }
        },

        /**
         * Calculate leave duration
         */
        calculateDuration() {
            const startDate = document.querySelector('[name="startDate"]')?.value;
            const endDate = document.querySelector('[name="endDate"]')?.value;

            if (!startDate || !endDate) return;

            const start = new Date(startDate);
            const end = new Date(endDate);

            if (end < start) {
                document.querySelector('[name="endDate"]').value = startDate;
                return;
            }

            // Calculate working days (excluding weekends)
            let workingDays = 0;
            const current = new Date(start);
            while (current <= end) {
                const day = current.getDay();
                if (day !== 0 && day !== 6) {
                    workingDays++;
                }
                current.setDate(current.getDate() + 1);
            }

            // Show/hide half day option (only for single day)
            const halfDaySection = document.getElementById('half-day-section');
            if (halfDaySection) {
                halfDaySection.classList.toggle('hidden', startDate !== endDate);
            }

            // Check for half day
            const isHalfDay = document.querySelector('[name="isHalfDay"]')?.checked;
            if (isHalfDay && startDate === endDate) {
                workingDays = 0.5;
            }

            // Update duration display
            const durationDisplay = document.getElementById('duration-display');
            const durationDays = document.getElementById('duration-days');
            if (durationDisplay && durationDays) {
                durationDisplay.classList.remove('hidden');
                durationDays.textContent = workingDays;
            }

            // Validate and show warnings
            this.validateRequest(workingDays);
        },

        /**
         * Toggle half day options
         * @param {boolean} checked
         */
        toggleHalfDay(checked) {
            const halfDayOptions = document.getElementById('half-day-options');
            if (halfDayOptions) {
                halfDayOptions.classList.toggle('hidden', !checked);
            }
            this.calculateDuration();
        },

        /**
         * Validate leave request
         * @param {number} days
         */
        validateRequest(days) {
            const warnings = [];
            const isThai = i18n.isThai();

            // Get selected leave type
            const leaveType = document.querySelector('[name="leaveType"]')?.value;
            const balance = leaveBalances[leaveType];

            if (balance && days > balance.remaining) {
                warnings.push({
                    type: 'error',
                    message: i18n.t('leave.warning.exceedsBalance')
                });
            }

            if (days > 5) {
                warnings.push({
                    type: 'warning',
                    message: i18n.t('leave.warning.hrApprovalRequired')
                });
            }

            if (leaveType === 'sick' && days >= 3) {
                warnings.push({
                    type: 'warning',
                    message: i18n.t('leave.warning.medicalCertNeeded')
                });
            }

            // Display warnings
            const warningsContainer = document.getElementById('leave-warnings');
            if (warningsContainer) {
                if (warnings.length > 0) {
                    warningsContainer.classList.remove('hidden');
                    warningsContainer.innerHTML = warnings.map(w => `
                        <div class="flex items-center gap-2 p-3 rounded-lg ${w.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}">
                            <span class="material-icons text-sm">${w.type === 'error' ? 'error' : 'warning'}</span>
                            <span class="text-sm">${w.message}</span>
                        </div>
                    `).join('');
                } else {
                    warningsContainer.classList.add('hidden');
                }
            }
        },

        /**
         * Handle form submission
         * @param {Event} event
         */
        async handleSubmit(event) {
            event.preventDefault();

            const formData = FormFieldComponent.getFormData('leave-request-form');

            // Validate required fields
            if (!formData.leaveType || !formData.startDate || !formData.endDate || !formData.reason) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            // Check balance
            const balance = leaveBalances[formData.leaveType];
            const daysRequested = parseFloat(document.getElementById('duration-days')?.textContent || 0);

            if (balance && daysRequested > balance.remaining) {
                ToastComponent.error(i18n.t('leave.warning.exceedsBalance'));
                return;
            }

            // Confirm submission
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('leave.submit'),
                message: i18n.t('leave.confirmSubmit'),
                confirmText: i18n.t('leave.submit'),
                icon: 'event_available'
            });

            if (!confirmed) return;

            try {
                const result = await API.submitLeaveRequest({
                    type: formData.leaveType,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    days: daysRequested,
                    halfDay: formData.isHalfDay ? formData.halfDayPeriod : null,
                    reason: formData.reason,
                    substitutePerson: formData.substitutePerson,
                    attachment: formData.attachment
                });

                ToastComponent.success(i18n.t('leave.requestSubmitted'));

                // Reload data and switch to history tab
                await this.loadData();
                this.switchTab('history');

            } catch (error) {
                console.error('Leave request error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Cancel a leave request
         * @param {string} requestId
         */
        async cancelRequest(requestId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('leave.cancelRequest'),
                message: i18n.t('leave.confirmCancel'),
                confirmText: i18n.t('leave.cancel'),
                icon: 'cancel'
            });

            if (!confirmed) return;

            try {
                await API.cancelLeaveRequest(requestId);
                ToastComponent.success(i18n.t('leave.requestCancelled'));
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Cancel request error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * View request details
         * @param {string} requestId
         */
        viewRequestDetails(requestId) {
            const request = leaveRequests.find(r => r.id === requestId);
            if (!request) return;

            const isThai = i18n.isThai();
            const typeName = isThai ? request.typeNameTh : request.typeNameEn;
            const reason = isThai ? (request.reasonTh || request.reason) : request.reason;

            ModalComponent.open({
                title: typeName,
                size: 'md',
                content: `
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500">${i18n.t('leave.startDate')}</p>
                                <p class="font-medium">${DateUtils.format(request.startDate, 'long')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('leave.endDate')}</p>
                                <p class="font-medium">${DateUtils.format(request.endDate, 'long')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('leave.duration')}</p>
                                <p class="font-medium">${request.days} ${i18n.t('leave.days')} ${request.halfDay ? `(${isThai ? (request.halfDay === 'morning' ? 'ครึ่งเช้า' : 'ครึ่งบ่าย') : request.halfDay})` : ''}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('workflow.status')}</p>
                                <p class="font-medium">${i18n.t(`leave.status.${request.status}`)}</p>
                            </div>
                        </div>

                        <div>
                            <p class="text-gray-500 text-sm mb-1">${i18n.t('leave.reason')}</p>
                            <p class="p-3 bg-gray-50 rounded-lg">${reason}</p>
                        </div>

                        ${request.substitutePersonName ? `
                            <div>
                                <p class="text-gray-500 text-sm">${i18n.t('leave.substitute')}</p>
                                <p class="font-medium">${request.substitutePersonName}</p>
                            </div>
                        ` : ''}

                        ${request.approvedByName ? `
                            <div class="pt-4 border-t">
                                <p class="text-gray-500 text-sm">${i18n.t('leave.approvedBy')}</p>
                                <p class="font-medium">${request.approvedByName}</p>
                                <p class="text-sm text-gray-500">${DateUtils.formatDateTime(request.approvedDate)}</p>
                            </div>
                        ` : ''}
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Filter history by status
         * @param {string} status
         */
        filterHistory(status) {
            const container = document.getElementById('leave-history-list');
            if (!container) return;

            const filtered = status === 'all'
                ? leaveRequests
                : leaveRequests.filter(r => r.status === status);

            container.innerHTML = filtered.map(r => this.renderHistoryItem(r)).join('');
        },

        /**
         * Load leave data
         */
        async loadData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load leave balances
                leaveBalances = await API.getLeaveBalances(employee.employeeId);

                // Load leave requests
                leaveRequests = await API.getLeaveRequests(employee.employeeId);

                // Load team leaves (for managers)
                if (RBAC.isManager()) {
                    teamLeaves = await API.getTeamLeaves(employee.employeeId);
                }

            } catch (error) {
                console.error('Error loading leave data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'balances';
            showTeamCalendar = false;
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
                            <div class="skeleton shimmer" style="height: 200px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeaveRequestPage;
}

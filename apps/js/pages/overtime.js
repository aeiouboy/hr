/**
 * Overtime Request Page
 * Employee self-service overtime request functionality
 * Thai Labor Law compliant with max 36 hours/week limit
 */

const OvertimePage = (function() {
    let activeTab = 'summary';
    let otRequests = [];
    let monthlySummary = {};
    let departmentBudget = {};
    let selectedMonth = null;

    return {
        /**
         * Render the overtime page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');
            const hasData = otRequests.length > 0 || Object.keys(monthlySummary).length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            const isThai = i18n.isThai();
            const isManager = RBAC.isManager();

            // Define tabs
            const tabs = [
                { id: 'summary', icon: 'summarize', label: i18n.t('overtime.summary') },
                { id: 'request', icon: 'add_circle', label: i18n.t('overtime.newRequest') },
                { id: 'history', icon: 'history', label: i18n.t('overtime.history') },
                { id: 'reports', icon: 'assessment', label: i18n.t('overtime.reports') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('overtime.title')}</h1>
                            <p class="mt-1 text-sm text-gray-500">${i18n.t('overtime.subtitle')}</p>
                        </div>
                        <button onclick="OvertimePage.switchTab('request')"
                                class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]"
                                aria-label="${i18n.t('overtime.newRequest')}">
                            <span class="material-icons text-sm">add</span>
                            ${i18n.t('overtime.newRequest')}
                        </button>
                    </div>

                    <!-- Weekly Limit Warning Banner -->
                    ${this.renderWeeklyLimitBanner()}

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist" aria-label="${i18n.t('overtime.tabs')}">
                        ${tabs.map(tab => `
                            <button onclick="OvertimePage.switchTab('${tab.id}')"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition whitespace-nowrap min-h-[44px]
                                        ${activeTab === tab.id ? 'bg-white text-cg-red shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                                    role="tab"
                                    aria-selected="${activeTab === tab.id}"
                                    aria-controls="ot-tab-content">
                                <span class="material-icons text-sm">${tab.icon}</span>
                                <span class="hidden sm:inline">${tab.label}</span>
                            </button>
                        `).join('')}
                    </div>

                    <!-- Tab Content -->
                    <div id="ot-tab-content" role="tabpanel">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Render weekly limit warning banner
         * @returns {string}
         */
        renderWeeklyLimitBanner() {
            const employee = AppState.get('currentEmployee');
            if (!employee) return '';

            // Get current week's start date (Monday)
            const today = new Date();
            const dayOfWeek = today.getDay();
            const monday = new Date(today);
            monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
            const weekStart = monday.toISOString().split('T')[0];

            const weeklyCheck = MockOvertimeData.checkWeeklyLimit(employee.employeeId, weekStart, 0);
            const usagePercentage = (weeklyCheck.currentHours / weeklyCheck.maxHours) * 100;

            if (usagePercentage < 50) return '';

            const warningLevel = usagePercentage >= 90 ? 'red' : usagePercentage >= 75 ? 'yellow' : 'blue';
            const colors = {
                red: 'bg-red-50 border-red-200 text-red-700',
                yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
                blue: 'bg-blue-50 border-blue-200 text-blue-700'
            };

            return `
                <div class="mb-6 p-4 rounded-lg border ${colors[warningLevel]}" role="alert">
                    <div class="flex items-center gap-3">
                        <span class="material-icons">${warningLevel === 'red' ? 'warning' : 'info'}</span>
                        <div class="flex-1">
                            <p class="font-medium">${i18n.t('overtime.weeklyLimit')}: ${weeklyCheck.currentHours} / ${weeklyCheck.maxHours} ${i18n.t('overtime.hoursUsed')}</p>
                            <p class="text-sm">${i18n.t('overtime.remainingHours')}: ${weeklyCheck.remaining} ${i18n.t('overtime.hours')}</p>
                        </div>
                        <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="h-full ${warningLevel === 'red' ? 'bg-red-500' : warningLevel === 'yellow' ? 'bg-yellow-500' : 'bg-blue-500'}"
                                 style="width: ${Math.min(usagePercentage, 100)}%"></div>
                        </div>
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
                case 'summary':
                    return this.renderSummaryTab();
                case 'request':
                    return this.renderRequestTab();
                case 'history':
                    return this.renderHistoryTab();
                case 'reports':
                    return this.renderReportsTab();
                default:
                    return this.renderSummaryTab();
            }
        },

        /**
         * Render summary tab
         * @returns {string}
         */
        renderSummaryTab() {
            const isThai = i18n.isThai();
            const otTypes = MockOvertimeData.getOTTypes();
            const limits = MockOvertimeData.getOTLimits();

            // Get current month summary
            const now = new Date();
            const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
            const summary = monthlySummary || MockOvertimeData.getMonthlySummary('E001', currentMonth);

            return `
                <div class="space-y-6">
                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span class="material-icons text-blue-600">schedule</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.totalHours')}</p>
                                    <p class="text-xl font-bold text-gray-900">${summary.totalHours || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="material-icons text-green-600">payments</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.totalAmount')}</p>
                                    <p class="text-xl font-bold text-gray-900">${(summary.totalAmount || 0).toLocaleString()} ${isThai ? 'บาท' : 'THB'}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <span class="material-icons text-yellow-600">pending</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.pendingRequests')}</p>
                                    <p class="text-xl font-bold text-gray-900">${summary.pending || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span class="material-icons text-purple-600">check_circle</span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.approvedRequests')}</p>
                                    <p class="text-xl font-bold text-gray-900">${summary.approved || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- OT Types and Rates -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <h2 class="text-lg font-medium text-gray-900">${i18n.t('overtime.typesAndRates')}</h2>
                        </div>
                        <div class="p-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                ${otTypes.map(type => `
                                    <div class="p-4 rounded-lg ${this.getOTTypeColor(type.id)} border">
                                        <div class="flex items-center justify-between mb-2">
                                            <span class="font-medium">${isThai ? type.nameTh : type.nameEn}</span>
                                            <span class="text-lg font-bold">${type.rate}x</span>
                                        </div>
                                        <p class="text-sm opacity-80">${isThai ? type.descriptionTh : type.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Thai Labor Law Compliance Info -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200">
                            <h2 class="text-lg font-medium text-gray-900 flex items-center gap-2">
                                <span class="material-icons text-cg-red">gavel</span>
                                ${i18n.t('overtime.laborLaw')}
                            </h2>
                        </div>
                        <div class="p-4">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="p-3 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.maxWeeklyOT')}</p>
                                    <p class="text-lg font-bold text-gray-900">${limits.maxWeeklyHours} ${i18n.t('overtime.hoursPerWeek')}</p>
                                </div>
                                <div class="p-3 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.normalWorkHours')}</p>
                                    <p class="text-lg font-bold text-gray-900">${limits.normalWorkHours} ${i18n.t('overtime.hoursPerDay')}</p>
                                </div>
                                <div class="p-3 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.minRestPeriod')}</p>
                                    <p class="text-lg font-bold text-gray-900">${limits.minRestPeriod} ${i18n.t('overtime.minutes')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Requests -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                            <h2 class="text-lg font-medium text-gray-900">${i18n.t('overtime.recentRequests')}</h2>
                            <button onclick="OvertimePage.switchTab('history')"
                                    class="text-sm text-cg-red hover:underline">
                                ${i18n.t('common.viewMore')}
                            </button>
                        </div>
                        <div class="divide-y divide-gray-200">
                            ${otRequests.slice(0, 3).map(request => this.renderRequestItem(request)).join('')}
                            ${otRequests.length === 0 ? `
                                <div class="p-8 text-center text-gray-500">
                                    <span class="material-icons text-4xl mb-2">schedule</span>
                                    <p>${i18n.t('overtime.noRequests')}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render request tab (form)
         * @returns {string}
         */
        renderRequestTab() {
            const isThai = i18n.isThai();
            const otTypes = MockOvertimeData.getOTTypes();
            const employee = AppState.get('currentEmployee');

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <form id="ot-request-form" onsubmit="OvertimePage.handleSubmit(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-6">
                                <!-- Date -->
                                ${FormFieldComponent.date({
                                    name: 'otDate',
                                    label: i18n.t('overtime.date'),
                                    required: true,
                                    onChange: 'OvertimePage.onDateChange(this.value)'
                                })}

                                <!-- OT Type (auto-detected but can be overridden) -->
                                <div id="ot-type-display" class="p-4 bg-gray-50 rounded-lg hidden">
                                    <p class="text-sm text-gray-500 mb-1">${i18n.t('overtime.detectedType')}</p>
                                    <p class="text-lg font-medium" id="ot-type-label"></p>
                                    <input type="hidden" name="otType" id="ot-type-input">
                                </div>

                                <!-- Start Time -->
                                ${FormFieldComponent.time({
                                    name: 'startTime',
                                    label: i18n.t('overtime.startTime'),
                                    required: true,
                                    onChange: 'OvertimePage.calculateHours()'
                                })}

                                <!-- End Time -->
                                ${FormFieldComponent.time({
                                    name: 'endTime',
                                    label: i18n.t('overtime.endTime'),
                                    required: true,
                                    onChange: 'OvertimePage.calculateHours()'
                                })}

                                <!-- Hours Calculation Display -->
                                <div id="hours-display" class="hidden p-4 bg-gray-50 rounded-lg">
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <p class="text-sm text-gray-500">${i18n.t('overtime.totalHours')}</p>
                                            <p class="text-2xl font-bold text-cg-red" id="total-hours">0</p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500">${i18n.t('overtime.estimatedAmount')}</p>
                                            <p class="text-2xl font-bold text-green-600" id="estimated-amount">0 ${isThai ? 'บาท' : 'THB'}</p>
                                        </div>
                                    </div>
                                    <div id="night-premium-info" class="hidden mt-3 pt-3 border-t">
                                        <p class="text-sm text-purple-600 flex items-center gap-2">
                                            <span class="material-icons text-sm">nights_stay</span>
                                            ${i18n.t('overtime.nightPremiumIncluded')}
                                        </p>
                                    </div>
                                </div>

                                <!-- Pre-approval Option -->
                                ${FormFieldComponent.checkbox({
                                    name: 'preApproved',
                                    label: i18n.t('overtime.preApproval'),
                                    helperText: i18n.t('overtime.preApprovalDesc')
                                })}
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-6">
                                <!-- Reason -->
                                ${FormFieldComponent.select({
                                    name: 'reasonCategory',
                                    label: i18n.t('overtime.reasonCategory'),
                                    required: true,
                                    options: [
                                        { value: 'project', label: isThai ? 'งานโปรเจกต์' : 'Project Work' },
                                        { value: 'deadline', label: isThai ? 'งานเร่งด่วน/เดดไลน์' : 'Urgent/Deadline' },
                                        { value: 'maintenance', label: isThai ? 'ซ่อมบำรุง/ดูแลระบบ' : 'Maintenance' },
                                        { value: 'meeting', label: isThai ? 'ประชุม' : 'Meeting' },
                                        { value: 'training', label: isThai ? 'อบรม' : 'Training' },
                                        { value: 'other', label: isThai ? 'อื่นๆ' : 'Other' }
                                    ]
                                })}

                                <!-- Detailed Reason -->
                                ${FormFieldComponent.textarea({
                                    name: 'reason',
                                    label: i18n.t('overtime.reason'),
                                    required: true,
                                    rows: 2,
                                    placeholder: isThai ? 'ระบุเหตุผลในการทำ OT' : 'Please provide a reason for overtime'
                                })}

                                <!-- Work Description -->
                                ${FormFieldComponent.textarea({
                                    name: 'workDescription',
                                    label: i18n.t('overtime.workDescription'),
                                    required: true,
                                    rows: 3,
                                    placeholder: isThai ? 'อธิบายงานที่จะทำในช่วง OT' : 'Describe the work to be done during OT'
                                })}

                                <!-- Attachment -->
                                ${FormFieldComponent.file({
                                    name: 'attachment',
                                    label: i18n.t('overtime.attachment'),
                                    accept: 'image/*,.pdf',
                                    helperText: isThai ? 'ไฟล์ที่รองรับ: รูปภาพ, PDF' : 'Supported: Images, PDF'
                                })}
                            </div>
                        </div>

                        <!-- Warning Messages -->
                        <div id="ot-warnings" class="hidden mt-6 space-y-2"></div>

                        <!-- Form Actions -->
                        <div class="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-end">
                            <button type="button"
                                    onclick="OvertimePage.switchTab('summary')"
                                    class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition min-h-[44px]">
                                ${i18n.t('common.cancel')}
                            </button>
                            <button type="submit"
                                    class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                                ${i18n.t('overtime.submit')}
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
            const requests = otRequests.sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

            return `
                <div class="space-y-4">
                    <!-- Filters -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div class="flex flex-wrap gap-4">
                            <select onchange="OvertimePage.filterHistory('status', this.value)"
                                    class="px-3 py-2 border rounded-lg text-sm min-h-[44px]"
                                    aria-label="${i18n.t('overtime.filterByStatus')}">
                                <option value="all">${isThai ? 'ทุกสถานะ' : 'All Status'}</option>
                                <option value="pending">${i18n.t('overtime.status.pending')}</option>
                                <option value="approved">${i18n.t('overtime.status.approved')}</option>
                                <option value="completed">${i18n.t('overtime.status.completed')}</option>
                                <option value="rejected">${i18n.t('overtime.status.rejected')}</option>
                            </select>
                            <select onchange="OvertimePage.filterHistory('type', this.value)"
                                    class="px-3 py-2 border rounded-lg text-sm min-h-[44px]"
                                    aria-label="${i18n.t('overtime.filterByType')}">
                                <option value="all">${isThai ? 'ทุกประเภท' : 'All Types'}</option>
                                <option value="weekday">${i18n.t('overtime.type.weekday')}</option>
                                <option value="weekend">${i18n.t('overtime.type.weekend')}</option>
                                <option value="holiday">${i18n.t('overtime.type.holiday')}</option>
                            </select>
                        </div>
                    </div>

                    <!-- History List -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="divide-y divide-gray-200" id="ot-history-list">
                            ${requests.length > 0 ? requests.map(request => this.renderHistoryItem(request)).join('') : `
                                <div class="p-8 text-center text-gray-500">
                                    <span class="material-icons text-4xl mb-2">history</span>
                                    <p>${i18n.t('overtime.noHistory')}</p>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render reports tab
         * @returns {string}
         */
        renderReportsTab() {
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const currentYear = new Date().getFullYear();
            const yearlyReport = MockOvertimeData.getYearlyReport(employee?.employeeId || 'E001', currentYear);

            return `
                <div class="space-y-6">
                    <!-- Year Selector -->
                    <div class="flex justify-end">
                        <select onchange="OvertimePage.loadYearlyReport(this.value)"
                                class="px-4 py-2 border rounded-lg text-sm min-h-[44px]"
                                aria-label="${i18n.t('overtime.selectYear')}">
                            <option value="${currentYear}">${currentYear}</option>
                            <option value="${currentYear - 1}">${currentYear - 1}</option>
                        </select>
                    </div>

                    <!-- Yearly Summary -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">${i18n.t('overtime.yearlyTotal')}</h3>
                            <div class="space-y-4">
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.totalHours')}</p>
                                    <p class="text-3xl font-bold text-cg-red">${yearlyReport.totalHours}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.totalAmount')}</p>
                                    <p class="text-3xl font-bold text-green-600">${yearlyReport.totalAmount.toLocaleString()} ${isThai ? 'บาท' : 'THB'}</p>
                                </div>
                            </div>
                        </div>

                        <!-- By Type Breakdown -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">${i18n.t('overtime.byType')}</h3>
                            <div class="space-y-3">
                                ${Object.entries(yearlyReport.byType).map(([type, data]) => `
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-600">${i18n.t(`overtime.type.${type}`)}</span>
                                        <div class="text-right">
                                            <span class="text-sm font-medium">${data.hours} ${i18n.t('overtime.hours')}</span>
                                            <span class="text-xs text-gray-400 ml-2">${data.amount.toLocaleString()} ${isThai ? 'บาท' : 'THB'}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Department Budget -->
                        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">${i18n.t('overtime.departmentBudget')}</h3>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="text-gray-500">${i18n.t('overtime.used')}</span>
                                        <span class="font-medium">${departmentBudget.usedBudget?.toLocaleString() || 0} / ${departmentBudget.monthlyBudget?.toLocaleString() || 0}</span>
                                    </div>
                                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div class="h-full bg-cg-red transition-all duration-300"
                                             style="width: ${departmentBudget.monthlyBudget ? (departmentBudget.usedBudget / departmentBudget.monthlyBudget * 100) : 0}%"></div>
                                    </div>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">${i18n.t('overtime.remainingBudget')}</p>
                                    <p class="text-xl font-bold text-gray-900">${departmentBudget.remainingBudget?.toLocaleString() || 0} ${isThai ? 'บาท' : 'THB'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Monthly Breakdown Chart (Text-based) -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">${i18n.t('overtime.monthlyBreakdown')}</h3>
                        <div class="space-y-3">
                            ${Object.entries(yearlyReport.byMonth).map(([month, data]) => {
                                const monthName = new Date(month + '-01').toLocaleDateString(isThai ? 'th-TH' : 'en-US', { month: 'short', year: 'numeric' });
                                const maxHours = Math.max(...Object.values(yearlyReport.byMonth).map(m => m.hours));
                                const percentage = maxHours > 0 ? (data.hours / maxHours * 100) : 0;
                                return `
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm text-gray-600 w-24">${monthName}</span>
                                        <div class="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                                            <div class="h-full bg-cg-red rounded-full flex items-center justify-end pr-2"
                                                 style="width: ${percentage}%">
                                                ${percentage > 20 ? `<span class="text-xs text-white font-medium">${data.hours}h</span>` : ''}
                                            </div>
                                        </div>
                                        ${percentage <= 20 ? `<span class="text-xs text-gray-600">${data.hours}h</span>` : ''}
                                        <span class="text-sm text-gray-500 w-24 text-right">${data.amount.toLocaleString()}</span>
                                    </div>
                                `;
                            }).join('')}
                            ${Object.keys(yearlyReport.byMonth).length === 0 ? `
                                <p class="text-center text-gray-500 py-4">${i18n.t('overtime.noDataForYear')}</p>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render a single request item in summary
         * @param {object} request
         * @returns {string}
         */
        renderRequestItem(request) {
            const isThai = i18n.isThai();
            const status = this.getStatusConfig(request.status);

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-full ${this.getOTTypeColor(request.otType)} flex items-center justify-center">
                                <span class="material-icons text-sm">${this.getOTTypeIcon(request.otType)}</span>
                            </div>
                            <div>
                                <p class="font-medium text-gray-900">${DateUtils.format(request.date, 'medium')}</p>
                                <p class="text-sm text-gray-500">${i18n.t(`overtime.type.${request.otType}`)} - ${request.hours} ${i18n.t('overtime.hours')}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-sm font-medium text-gray-900">${(request.amount || 0).toLocaleString()} ${isThai ? 'บาท' : 'THB'}</span>
                            <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.class}">
                                <span class="material-icons text-xs">${status.icon}</span>
                                ${i18n.t(`overtime.status.${request.status}`)}
                            </span>
                        </div>
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
            const status = this.getStatusConfig(request.status);

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full ${this.getOTTypeColor(request.otType)} flex items-center justify-center flex-shrink-0">
                                <span class="material-icons">${this.getOTTypeIcon(request.otType)}</span>
                            </div>
                            <div class="min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <h3 class="font-medium text-gray-900">${i18n.t(`overtime.type.${request.otType}`)}</h3>
                                    <span class="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">${request.rate}x</span>
                                </div>
                                <p class="text-sm text-gray-600">
                                    ${DateUtils.format(request.date, 'long')}
                                    <span class="text-gray-400">|</span>
                                    ${request.startTime} - ${request.endTime}
                                    <span class="text-gray-400">|</span>
                                    ${request.hours} ${i18n.t('overtime.hours')}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${isThai ? request.reasonTh || request.reason : request.reason}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 flex-shrink-0">
                            <div class="text-right">
                                <p class="font-medium text-gray-900">${(request.amount || 0).toLocaleString()} ${isThai ? 'บาท' : 'THB'}</p>
                                <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.class}">
                                    <span class="material-icons text-xs">${status.icon}</span>
                                    ${i18n.t(`overtime.status.${request.status}`)}
                                </span>
                            </div>

                            <button onclick="OvertimePage.viewRequestDetails('${request.id}')"
                                    class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('overtime.viewDetails')}">
                                <span class="material-icons">visibility</span>
                            </button>

                            ${request.status === 'pending' ? `
                                <button onclick="OvertimePage.cancelRequest('${request.id}')"
                                        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition min-h-[44px] min-w-[44px]"
                                        aria-label="${i18n.t('overtime.cancelRequest')}">
                                    <span class="material-icons">cancel</span>
                                </button>
                            ` : ''}

                            ${request.status === 'approved' && !request.postConfirmed ? `
                                <button onclick="OvertimePage.postConfirm('${request.id}')"
                                        class="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition min-h-[44px]">
                                    ${i18n.t('overtime.postConfirm')}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Get OT type color classes
         * @param {string} type
         * @returns {string}
         */
        getOTTypeColor(type) {
            const colors = {
                weekday: 'bg-blue-100 text-blue-700 border-blue-200',
                weekend: 'bg-orange-100 text-orange-700 border-orange-200',
                holiday: 'bg-red-100 text-red-700 border-red-200',
                night: 'bg-purple-100 text-purple-700 border-purple-200'
            };
            return colors[type] || colors.weekday;
        },

        /**
         * Get OT type icon
         * @param {string} type
         * @returns {string}
         */
        getOTTypeIcon(type) {
            const icons = {
                weekday: 'work',
                weekend: 'weekend',
                holiday: 'celebration',
                night: 'nights_stay'
            };
            return icons[type] || 'schedule';
        },

        /**
         * Get status configuration
         * @param {string} status
         * @returns {object}
         */
        getStatusConfig(status) {
            const configs = {
                pending: { class: 'bg-yellow-100 text-yellow-800', icon: 'pending' },
                approved: { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                completed: { class: 'bg-blue-100 text-blue-800', icon: 'task_alt' },
                rejected: { class: 'bg-red-100 text-red-800', icon: 'cancel' },
                cancelled: { class: 'bg-gray-100 text-gray-800', icon: 'block' }
            };
            return configs[status] || configs.pending;
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const container = document.getElementById('ot-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent();
            }

            // Update tab buttons styling
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
         * Handle date change - auto-detect OT type
         * @param {string} dateValue
         */
        onDateChange(dateValue) {
            if (!dateValue) return;

            const otType = MockOvertimeData.determineOTType(dateValue);
            const otTypes = MockOvertimeData.getOTTypes();
            const typeInfo = otTypes.find(t => t.id === otType);
            const isThai = i18n.isThai();

            const typeDisplay = document.getElementById('ot-type-display');
            const typeLabel = document.getElementById('ot-type-label');
            const typeInput = document.getElementById('ot-type-input');

            if (typeDisplay && typeLabel && typeInput) {
                typeDisplay.classList.remove('hidden');
                typeLabel.textContent = `${isThai ? typeInfo.nameTh : typeInfo.nameEn} (${typeInfo.rate}x)`;
                typeInput.value = otType;
            }

            this.calculateHours();
        },

        /**
         * Calculate OT hours and amount
         */
        calculateHours() {
            const startTime = document.querySelector('[name="startTime"]')?.value;
            const endTime = document.querySelector('[name="endTime"]')?.value;
            const otType = document.getElementById('ot-type-input')?.value;

            if (!startTime || !endTime) return;

            // Parse times
            const [startHour, startMin] = startTime.split(':').map(Number);
            const [endHour, endMin] = endTime.split(':').map(Number);

            let startMinutes = startHour * 60 + startMin;
            let endMinutes = endHour * 60 + endMin;

            // Handle overnight shifts
            if (endMinutes <= startMinutes) {
                endMinutes += 24 * 60;
            }

            const totalMinutes = endMinutes - startMinutes;
            const hours = Math.round((totalMinutes / 60) * 100) / 100;

            // Calculate night premium hours (22:00-06:00)
            let nightHours = 0;
            const nightStart = 22 * 60; // 22:00
            const nightEnd = 6 * 60;    // 06:00

            // Simplified night hours calculation
            if (endHour >= 22 || endHour < 6) {
                // Work extends into night premium time
                if (endHour >= 22) {
                    nightHours = (endMinutes - nightStart) / 60;
                } else {
                    nightHours = endMinutes / 60;
                }
                nightHours = Math.max(0, Math.min(nightHours, hours));
            }

            // Get hourly rate (mock)
            const hourlyRate = 250; // Mock hourly rate
            const rate = MockOvertimeData.getOTRates()[otType] || 1.5;
            const baseAmount = hours * hourlyRate * rate;
            const nightPremiumAmount = nightHours * hourlyRate * 0.5;
            const totalAmount = baseAmount + nightPremiumAmount;

            // Update display
            const hoursDisplay = document.getElementById('hours-display');
            const totalHoursEl = document.getElementById('total-hours');
            const estimatedAmountEl = document.getElementById('estimated-amount');
            const nightPremiumInfo = document.getElementById('night-premium-info');
            const isThai = i18n.isThai();

            if (hoursDisplay && totalHoursEl && estimatedAmountEl) {
                hoursDisplay.classList.remove('hidden');
                totalHoursEl.textContent = hours;
                estimatedAmountEl.textContent = `${Math.round(totalAmount).toLocaleString()} ${isThai ? 'บาท' : 'THB'}`;

                if (nightPremiumInfo) {
                    nightPremiumInfo.classList.toggle('hidden', nightHours === 0);
                }
            }

            // Validate and show warnings
            this.validateRequest(hours);
        },

        /**
         * Validate OT request
         * @param {number} hours
         */
        validateRequest(hours) {
            const warnings = [];
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const otDate = document.querySelector('[name="otDate"]')?.value;

            if (!otDate || !employee) return;

            // Check weekly limit
            const weekStart = this.getWeekStart(otDate);
            const weeklyCheck = MockOvertimeData.checkWeeklyLimit(employee.employeeId, weekStart, hours);

            if (!weeklyCheck.withinLimit) {
                warnings.push({
                    type: 'error',
                    message: i18n.t('overtime.warning.exceedsWeeklyLimit')
                        .replace('{current}', weeklyCheck.currentHours)
                        .replace('{max}', weeklyCheck.maxHours)
                });
            } else if (weeklyCheck.totalHours > weeklyCheck.maxHours * 0.8) {
                warnings.push({
                    type: 'warning',
                    message: i18n.t('overtime.warning.nearingLimit')
                        .replace('{remaining}', weeklyCheck.remaining)
                });
            }

            // Check daily hours
            const limits = MockOvertimeData.getOTLimits();
            if (hours > limits.maxDailyHours) {
                warnings.push({
                    type: 'warning',
                    message: i18n.t('overtime.warning.exceedsDailyRecommended')
                        .replace('{hours}', limits.maxDailyHours)
                });
            }

            // Display warnings
            const warningsContainer = document.getElementById('ot-warnings');
            if (warningsContainer) {
                if (warnings.length > 0) {
                    warningsContainer.classList.remove('hidden');
                    warningsContainer.innerHTML = warnings.map(w => `
                        <div class="flex items-center gap-2 p-3 rounded-lg ${w.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}" role="alert">
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
         * Get week start date (Monday)
         * @param {string} dateStr
         * @returns {string}
         */
        getWeekStart(dateStr) {
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();
            const monday = new Date(date);
            monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
            return monday.toISOString().split('T')[0];
        },

        /**
         * Handle form submission
         * @param {Event} event
         */
        async handleSubmit(event) {
            event.preventDefault();

            const formData = FormFieldComponent.getFormData('ot-request-form');
            const isThai = i18n.isThai();

            // Validate required fields
            if (!formData.otDate || !formData.startTime || !formData.endTime || !formData.reason || !formData.workDescription) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            // Get calculated hours
            const hours = parseFloat(document.getElementById('total-hours')?.textContent || 0);
            if (hours <= 0) {
                ToastComponent.error(i18n.t('overtime.error.invalidHours'));
                return;
            }

            // Check weekly limit
            const employee = AppState.get('currentEmployee');
            const weekStart = this.getWeekStart(formData.otDate);
            const weeklyCheck = MockOvertimeData.checkWeeklyLimit(employee.employeeId, weekStart, hours);

            if (!weeklyCheck.withinLimit) {
                ToastComponent.error(i18n.t('overtime.error.weeklyLimitExceeded'));
                return;
            }

            // Confirm submission
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('overtime.submit'),
                message: i18n.t('overtime.confirmSubmit'),
                confirmText: i18n.t('overtime.submit'),
                icon: 'schedule'
            });

            if (!confirmed) return;

            try {
                const otType = document.getElementById('ot-type-input')?.value || 'weekday';
                const hourlyRate = 250; // Mock hourly rate
                const rate = MockOvertimeData.getOTRates()[otType] || 1.5;
                const amount = hours * hourlyRate * rate;

                const requestData = {
                    employeeId: employee.employeeId,
                    employeeName: employee.personalInfo?.firstNameEn + ' ' + employee.personalInfo?.lastNameEn,
                    employeeNameTh: employee.personalInfo?.firstNameTh + ' ' + employee.personalInfo?.lastNameTh,
                    date: formData.otDate,
                    dayType: MockOvertimeData.determineOTType(formData.otDate),
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    hours: hours,
                    otType: otType,
                    rate: rate,
                    hourlyRate: hourlyRate,
                    amount: amount,
                    reason: formData.reason,
                    reasonTh: formData.reason,
                    workDescription: formData.workDescription,
                    workDescriptionTh: formData.workDescription,
                    preApproved: formData.preApproved === 'on' || formData.preApproved === true
                };

                const result = await MockOvertimeData.submitOTRequest(requestData);

                ToastComponent.success(i18n.t('overtime.requestSubmitted'));

                // Reload data and switch to history tab
                await this.loadData();
                this.switchTab('history');

            } catch (error) {
                console.error('OT request error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Cancel an OT request
         * @param {string} requestId
         */
        async cancelRequest(requestId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('overtime.cancelRequest'),
                message: i18n.t('overtime.confirmCancel'),
                confirmText: i18n.t('common.confirm'),
                icon: 'cancel'
            });

            if (!confirmed) return;

            try {
                await MockOvertimeData.cancelOTRequest(requestId);
                ToastComponent.success(i18n.t('overtime.requestCancelled'));
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Cancel request error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Post-confirm completed OT
         * @param {string} requestId
         */
        async postConfirm(requestId) {
            const request = MockOvertimeData.getOTRequest(requestId);
            if (!request) return;

            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('overtime.postConfirmTitle'),
                size: 'md',
                content: `
                    <form id="post-confirm-form" class="space-y-4">
                        <input type="hidden" name="requestId" value="${requestId}">
                        <div class="p-4 bg-gray-50 rounded-lg mb-4">
                            <p class="text-sm text-gray-600">${i18n.t('overtime.originalRequest')}</p>
                            <p class="font-medium">${DateUtils.format(request.date, 'long')} - ${request.hours} ${i18n.t('overtime.hours')}</p>
                        </div>
                        ${FormFieldComponent.number({
                            name: 'actualHours',
                            label: i18n.t('overtime.actualHours'),
                            value: request.hours,
                            min: 0.5,
                            max: 12,
                            step: 0.5,
                            required: true
                        })}
                        ${FormFieldComponent.textarea({
                            name: 'notes',
                            label: i18n.t('overtime.completionNotes'),
                            rows: 3,
                            placeholder: isThai ? 'หมายเหตุเพิ่มเติม (ถ้ามี)' : 'Additional notes (optional)'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('overtime.confirm'), primary: true, onclick: 'OvertimePage.submitPostConfirm()' }
                ]
            });
        },

        /**
         * Submit post-confirmation
         */
        async submitPostConfirm() {
            const formData = FormFieldComponent.getFormData('post-confirm-form');

            if (!formData.actualHours) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                await MockOvertimeData.postConfirmOT(formData.requestId, parseFloat(formData.actualHours), formData.notes);
                ToastComponent.success(i18n.t('overtime.postConfirmSuccess'));
                ModalComponent.close();
                await this.loadData();
                Router.refresh();
            } catch (error) {
                console.error('Post confirm error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * View request details
         * @param {string} requestId
         */
        viewRequestDetails(requestId) {
            const request = MockOvertimeData.getOTRequest(requestId);
            if (!request) return;

            const isThai = i18n.isThai();
            const status = this.getStatusConfig(request.status);

            ModalComponent.open({
                title: i18n.t('overtime.requestDetails'),
                size: 'lg',
                content: `
                    <div class="space-y-4">
                        <!-- Status Badge -->
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500">${i18n.t('overtime.requestId')}: ${request.id}</span>
                            <span class="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${status.class}">
                                <span class="material-icons text-sm">${status.icon}</span>
                                ${i18n.t(`overtime.status.${request.status}`)}
                            </span>
                        </div>

                        <!-- Request Info Grid -->
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.date')}</p>
                                <p class="font-medium">${DateUtils.format(request.date, 'long')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.type')}</p>
                                <p class="font-medium">${i18n.t(`overtime.type.${request.otType}`)} (${request.rate}x)</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.time')}</p>
                                <p class="font-medium">${request.startTime} - ${request.endTime}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.hours')}</p>
                                <p class="font-medium">${request.hours} ${i18n.t('overtime.hours')}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.amount')}</p>
                                <p class="font-medium text-green-600">${(request.amount || 0).toLocaleString()} ${isThai ? 'บาท' : 'THB'}</p>
                            </div>
                            <div>
                                <p class="text-gray-500">${i18n.t('overtime.preApproval')}</p>
                                <p class="font-medium">${request.preApproved ? i18n.t('common.yes') : i18n.t('common.no')}</p>
                            </div>
                        </div>

                        <!-- Reason -->
                        <div>
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('overtime.reason')}</p>
                            <p class="p-3 bg-gray-50 rounded-lg text-sm">${isThai ? request.reasonTh || request.reason : request.reason}</p>
                        </div>

                        <!-- Work Description -->
                        <div>
                            <p class="text-sm text-gray-500 mb-1">${i18n.t('overtime.workDescription')}</p>
                            <p class="p-3 bg-gray-50 rounded-lg text-sm">${isThai ? request.workDescriptionTh || request.workDescription : request.workDescription}</p>
                        </div>

                        <!-- Approval Info -->
                        ${request.approvedByName ? `
                            <div class="pt-4 border-t">
                                <p class="text-sm text-gray-500">${i18n.t('overtime.approvedBy')}</p>
                                <p class="font-medium">${request.approvedByName}</p>
                                <p class="text-sm text-gray-500">${DateUtils.formatDateTime(request.approvedAt)}</p>
                            </div>
                        ` : ''}

                        <!-- Rejection Info -->
                        ${request.rejectionReason ? `
                            <div class="pt-4 border-t">
                                <p class="text-sm text-red-500">${i18n.t('overtime.rejectionReason')}</p>
                                <p class="p-3 bg-red-50 rounded-lg text-sm text-red-700">${isThai ? request.rejectionReasonTh || request.rejectionReason : request.rejectionReason}</p>
                            </div>
                        ` : ''}

                        <!-- Post-confirmation Info -->
                        ${request.postConfirmed ? `
                            <div class="pt-4 border-t">
                                <p class="text-sm text-green-600 flex items-center gap-2">
                                    <span class="material-icons text-sm">verified</span>
                                    ${i18n.t('overtime.postConfirmedAt')}: ${DateUtils.formatDateTime(request.postConfirmedAt)}
                                </p>
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
         * Filter history
         * @param {string} filterType
         * @param {string} value
         */
        filterHistory(filterType, value) {
            const employee = AppState.get('currentEmployee');
            const filters = {};

            if (filterType === 'status' && value !== 'all') {
                filters.status = value;
            }
            if (filterType === 'type' && value !== 'all') {
                filters.otType = value;
            }

            const filtered = MockOvertimeData.getOTRequests(employee?.employeeId || 'E001', filters);
            const container = document.getElementById('ot-history-list');

            if (container) {
                if (filtered.length > 0) {
                    container.innerHTML = filtered.map(r => this.renderHistoryItem(r)).join('');
                } else {
                    container.innerHTML = `
                        <div class="p-8 text-center text-gray-500">
                            <span class="material-icons text-4xl mb-2">history</span>
                            <p>${i18n.t('overtime.noHistory')}</p>
                        </div>
                    `;
                }
            }
        },

        /**
         * Load yearly report
         * @param {string} year
         */
        loadYearlyReport(year) {
            // Re-render reports tab with new year
            const container = document.getElementById('ot-tab-content');
            if (container && activeTab === 'reports') {
                container.innerHTML = this.renderReportsTab();
            }
        },

        /**
         * Load overtime data
         */
        async loadData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load OT requests
                otRequests = MockOvertimeData.getOTRequests(employee.employeeId);

                // Load monthly summary
                const now = new Date();
                const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                monthlySummary = MockOvertimeData.getMonthlySummary(employee.employeeId, currentMonth);

                // Load department budget
                departmentBudget = MockOvertimeData.getDepartmentBudget('D001');

            } catch (error) {
                console.error('Error loading overtime data:', error);
                ToastComponent.error(i18n.t('error.loadFailed'));
            }
        },

        /**
         * Initialize page
         */
        async init() {
            activeTab = 'summary';
            await this.loadData();
            // Re-render the page content after data is loaded
            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render();
            }
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 200px; height: 32px; margin-bottom: 8px;"></div>
                    <div class="skeleton shimmer" style="width: 300px; height: 20px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        ${[1, 2, 3, 4].map(() => `
                            <div class="skeleton shimmer" style="height: 100px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                    <div class="skeleton shimmer" style="height: 300px; border-radius: 8px;"></div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OvertimePage;
}

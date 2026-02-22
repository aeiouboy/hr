/**
 * Resignation Checklist Page
 * Handles resignation recording, clearance checklist, and final settlement
 */

const ResignationPage = (function() {
    let currentTab = 'recording';
    let currentResignation = null;

    return {
        /**
         * Render the resignation page
         * @returns {string}
         */
        render() {
            const employee = AppState.get('currentEmployee');
            if (!employee) {
                return this.renderSkeleton();
            }

            // Get current resignation if exists
            currentResignation = MockResignationData.sampleResignation;

            return `
                <div class="max-w-7xl mx-auto px-4 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold text-gray-900">${i18n.t('resignation.title')}</h1>
                        <p class="text-gray-600 mt-1">${i18n.t('resignation.subtitle')}</p>
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="mb-6" role="tablist" aria-label="${i18n.t('resignation.title')}">
                        <div class="border-b border-gray-200">
                            <nav class="-mb-px flex space-x-8" aria-label="${i18n.t('resignation.tabs')}">
                                ${this.renderTab('recording', 'edit_note', i18n.t('resignation.tabRecording'))}
                                ${this.renderTab('clearance', 'checklist', i18n.t('resignation.tabClearance'))}
                                ${this.renderTab('settlement', 'payments', i18n.t('resignation.tabSettlement'))}
                            </nav>
                        </div>
                    </div>

                    <!-- Tab Content -->
                    <div id="resignation-tab-content" role="tabpanel" aria-labelledby="tab-${currentTab}">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize the page
         */
        init() {
            currentTab = 'recording';
            currentResignation = MockResignationData.sampleResignation;
        },

        /**
         * Render a tab button
         */
        renderTab(tabId, icon, label) {
            const isActive = currentTab === tabId;
            const activeClass = isActive
                ? 'border-cg-red text-cg-red'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

            return `
                <button
                    id="tab-${tabId}"
                    role="tab"
                    aria-selected="${isActive}"
                    aria-controls="panel-${tabId}"
                    class="group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeClass} transition-colors"
                    onclick="ResignationPage.switchTab('${tabId}')"
                >
                    <span class="material-icons text-xl mr-2">${icon}</span>
                    ${label}
                </button>
            `;
        },

        /**
         * Switch to a different tab
         */
        switchTab(tabId) {
            currentTab = tabId;
            const contentContainer = document.getElementById('resignation-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderTabContent();
            }
            // Update tab states
            document.querySelectorAll('[role="tab"]').forEach(tab => {
                const isActive = tab.id === `tab-${tabId}`;
                tab.setAttribute('aria-selected', isActive);
                if (isActive) {
                    tab.classList.remove('border-transparent', 'text-gray-500');
                    tab.classList.add('border-cg-red', 'text-cg-red');
                } else {
                    tab.classList.remove('border-cg-red', 'text-cg-red');
                    tab.classList.add('border-transparent', 'text-gray-500');
                }
            });
        },

        /**
         * Render current tab content
         */
        renderTabContent() {
            switch (currentTab) {
                case 'recording':
                    return this.renderRecordingTab();
                case 'clearance':
                    return this.renderClearanceTab();
                case 'settlement':
                    return this.renderSettlementTab();
                default:
                    return this.renderRecordingTab();
            }
        },

        /**
         * Render Resignation Recording Tab
         */
        renderRecordingTab() {
            const hasResignation = currentResignation !== null;
            const isThai = i18n.isThai();

            if (hasResignation) {
                return this.renderExistingResignation();
            }

            return `
                <div class="space-y-6">
                    ${CardComponent.render({
                        id: 'resignation-form-card',
                        title: i18n.t('resignation.newResignation'),
                        icon: 'edit_note',
                        content: `
                            <form id="resignation-form" class="space-y-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Resignation Date -->
                                    ${FormFieldComponent.date({
                                        name: 'resignationDate',
                                        label: i18n.t('resignation.resignationDate'),
                                        required: true,
                                        value: DateUtils.today(),
                                        min: DateUtils.today()
                                    })}

                                    <!-- Last Working Date -->
                                    ${FormFieldComponent.date({
                                        name: 'lastWorkingDate',
                                        label: i18n.t('resignation.lastWorkingDate'),
                                        required: true,
                                        min: DateUtils.today(),
                                        hint: i18n.t('resignation.noticePeriodHint')
                                    })}

                                    <!-- Reason Type -->
                                    ${FormFieldComponent.select({
                                        name: 'reasonType',
                                        label: i18n.t('resignation.reasonType'),
                                        required: true,
                                        placeholder: i18n.t('common.select'),
                                        options: MockResignationData.resignationReasons.map(r => ({
                                            value: r.value,
                                            label: isThai ? r.labelTh : r.labelEn
                                        }))
                                    })}

                                    <!-- Notice Period (auto-calculated) -->
                                    ${FormFieldComponent.text({
                                        name: 'noticePeriod',
                                        label: i18n.t('resignation.noticePeriod'),
                                        readonly: true,
                                        value: '30',
                                        hint: i18n.t('resignation.noticePeriodDays')
                                    })}
                                </div>

                                <!-- Reason Details -->
                                ${FormFieldComponent.textarea({
                                    name: 'reasonDetails',
                                    label: i18n.t('resignation.reasonDetails'),
                                    rows: 3,
                                    placeholder: isThai ? 'กรุณาระบุเหตุผลในการลาออก...' : 'Please provide details about your resignation...'
                                })}

                                <!-- Exit Interview Section -->
                                <div class="border-t pt-6 mt-6">
                                    <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                        <span class="material-icons mr-2 text-cg-red">record_voice_over</span>
                                        ${i18n.t('resignation.exitInterview')}
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        ${FormFieldComponent.checkbox({
                                            name: 'exitInterviewScheduled',
                                            label: i18n.t('resignation.scheduleExitInterview'),
                                            checked: true
                                        })}
                                        ${FormFieldComponent.date({
                                            name: 'exitInterviewDate',
                                            label: i18n.t('resignation.exitInterviewDate'),
                                            min: DateUtils.today()
                                        })}
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div class="flex justify-end gap-4 pt-4 border-t">
                                    <button type="button" class="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition" onclick="Router.navigate('profile')">
                                        ${i18n.t('common.cancel')}
                                    </button>
                                    <button type="button" class="px-6 py-2 text-white bg-cg-red rounded-lg hover:bg-red-700 transition flex items-center" onclick="ResignationPage.submitResignation()">
                                        <span class="material-icons mr-2">send</span>
                                        ${i18n.t('resignation.submitResignation')}
                                    </button>
                                </div>
                            </form>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render existing resignation details
         */
        renderExistingResignation() {
            const r = currentResignation;
            const isThai = i18n.isThai();
            const statusConfig = this.getStatusConfig(r.status);

            return `
                <div class="space-y-6">
                    <!-- Status Banner -->
                    <div class="bg-${statusConfig.bgColor}-50 border border-${statusConfig.bgColor}-200 rounded-lg p-4 flex items-center">
                        <span class="material-icons text-${statusConfig.bgColor}-600 mr-3">${statusConfig.icon}</span>
                        <div>
                            <p class="font-medium text-${statusConfig.bgColor}-800">
                                ${i18n.t('resignation.status')}: ${MockResignationData.getResignationStatusLabel(r.status, isThai)}
                            </p>
                            <p class="text-sm text-${statusConfig.bgColor}-600">
                                ${i18n.t('resignation.submittedOn')} ${DateUtils.format(r.createdDate, 'long')}
                            </p>
                        </div>
                    </div>

                    <!-- Resignation Details -->
                    ${CardComponent.render({
                        id: 'resignation-details-card',
                        title: i18n.t('resignation.resignationDetails'),
                        icon: 'description',
                        content: CardComponent.dataGrid([
                            { label: i18n.t('resignation.resignationDate'), value: DateUtils.format(r.resignationDate, 'long') },
                            { label: i18n.t('resignation.lastWorkingDate'), value: DateUtils.format(r.lastWorkingDate, 'long') },
                            { label: i18n.t('resignation.reasonType'), value: MockResignationData.getResignationReasonLabel(r.reasonType, isThai) },
                            { label: i18n.t('resignation.noticePeriod'), value: `${r.noticePeriod} ${i18n.t('resignation.days')}` },
                            { label: i18n.t('resignation.reasonDetails'), value: r.reasonDetails || '-' }
                        ])
                    })}

                    <!-- Exit Interview -->
                    ${CardComponent.render({
                        id: 'exit-interview-card',
                        title: i18n.t('resignation.exitInterview'),
                        icon: 'record_voice_over',
                        content: `
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-gray-900">${i18n.t('resignation.exitInterviewDate')}</p>
                                    <p class="text-gray-600">${r.exitInterviewDate ? DateUtils.format(r.exitInterviewDate, 'long') : i18n.t('resignation.notScheduled')}</p>
                                </div>
                                <span class="px-3 py-1 rounded-full text-sm font-medium ${r.exitInterviewCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                                    ${r.exitInterviewCompleted ? i18n.t('resignation.completed') : i18n.t('resignation.scheduled')}
                                </span>
                            </div>
                        `
                    })}

                    <!-- Clearance Progress Summary -->
                    ${this.renderClearanceProgress()}
                </div>
            `;
        },

        /**
         * Render clearance progress summary
         */
        renderClearanceProgress() {
            if (!currentResignation?.clearanceItems) {
                return '';
            }

            const items = currentResignation.clearanceItems;
            const total = items.length;
            const completed = items.filter(i => i.status === 'completed' || i.status === 'not_applicable').length;
            const pending = items.filter(i => i.status === 'pending').length;
            const inProgress = items.filter(i => i.status === 'in_progress').length;
            const percentage = Math.round((completed / total) * 100);

            return CardComponent.render({
                id: 'clearance-progress-card',
                title: i18n.t('resignation.clearanceProgress'),
                icon: 'task_alt',
                content: `
                    <div class="space-y-4">
                        <!-- Progress Bar -->
                        <div>
                            <div class="flex justify-between mb-2">
                                <span class="text-sm font-medium text-gray-700">${i18n.t('resignation.overallProgress')}</span>
                                <span class="text-sm font-medium text-gray-700">${percentage}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-3" role="progressbar" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
                                <div class="bg-cg-red h-3 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-4 pt-4">
                            <div class="text-center p-3 bg-green-50 rounded-lg">
                                <p class="text-2xl font-bold text-green-600">${completed}</p>
                                <p class="text-xs text-green-800">${i18n.t('resignation.completed')}</p>
                            </div>
                            <div class="text-center p-3 bg-blue-50 rounded-lg">
                                <p class="text-2xl font-bold text-blue-600">${inProgress}</p>
                                <p class="text-xs text-blue-800">${i18n.t('resignation.inProgress')}</p>
                            </div>
                            <div class="text-center p-3 bg-yellow-50 rounded-lg">
                                <p class="text-2xl font-bold text-yellow-600">${pending}</p>
                                <p class="text-xs text-yellow-800">${i18n.t('resignation.pending')}</p>
                            </div>
                        </div>

                        <!-- View Details Link -->
                        <div class="text-center pt-4">
                            <button onclick="ResignationPage.switchTab('clearance')" class="text-cg-red hover:text-red-700 font-medium inline-flex items-center">
                                ${i18n.t('resignation.viewClearanceDetails')}
                                <span class="material-icons ml-1">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                `
            });
        },

        /**
         * Render Clearance Checklist Tab
         */
        renderClearanceTab() {
            if (!currentResignation) {
                return this.renderNoResignation();
            }

            const isThai = i18n.isThai();
            const categories = MockResignationData.clearanceCategories;

            return `
                <div class="space-y-6">
                    ${categories.map(category => this.renderClearanceCategory(category, isThai)).join('')}
                </div>
            `;
        },

        /**
         * Render a clearance category section
         */
        renderClearanceCategory(category, isThai) {
            const items = currentResignation.clearanceItems.filter(i => i.categoryId === category.value);
            if (items.length === 0) return '';

            const completedCount = items.filter(i => i.status === 'completed' || i.status === 'not_applicable').length;
            const totalCount = items.length;

            return CardComponent.render({
                id: `clearance-${category.value}`,
                title: isThai ? category.labelTh : category.labelEn,
                icon: category.icon,
                headerExtra: `
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${completedCount === totalCount ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${completedCount}/${totalCount}
                    </span>
                `,
                content: `
                    <div class="divide-y divide-gray-100">
                        ${items.map(item => this.renderClearanceItem(item, category.value, isThai)).join('')}
                    </div>
                `
            });
        },

        /**
         * Render a single clearance item
         */
        renderClearanceItem(item, categoryId, isThai) {
            const itemLabel = MockResignationData.getClearanceItemLabel(categoryId, item.itemId, isThai);
            const statusConfig = this.getClearanceStatusConfig(item.status);
            const responsibleLabel = MockResignationData.getResponsiblePartyLabel(item.responsibleParty, isThai);

            return `
                <div class="py-4 flex items-start justify-between">
                    <div class="flex items-start">
                        <span class="material-icons mt-0.5 mr-3 ${statusConfig.iconClass}">${statusConfig.icon}</span>
                        <div>
                            <p class="font-medium text-gray-900">${itemLabel}</p>
                            <p class="text-sm text-gray-500">
                                ${i18n.t('resignation.responsibleParty')}: ${responsibleLabel}
                            </p>
                            ${item.notes ? `<p class="text-sm text-gray-400 mt-1">${item.notes}</p>` : ''}
                            ${item.signOffDate ? `
                                <p class="text-xs text-green-600 mt-1">
                                    ${i18n.t('resignation.signedOffOn')} ${DateUtils.format(item.signOffDate, 'medium')}
                                </p>
                            ` : ''}
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${statusConfig.badgeClass}">
                            ${MockResignationData.getClearanceStatusLabel(item.status, isThai)}
                        </span>
                        ${item.status === 'pending' || item.status === 'in_progress' ? `
                            <button
                                onclick="ResignationPage.updateClearanceItem('${item.id}')"
                                class="p-1 text-gray-400 hover:text-cg-red transition"
                                title="${i18n.t('resignation.updateStatus')}"
                                aria-label="${i18n.t('resignation.updateStatus')}"
                            >
                                <span class="material-icons text-xl">edit</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render Settlement Tab
         */
        renderSettlementTab() {
            if (!currentResignation) {
                return this.renderNoResignation();
            }

            const settlement = currentResignation.finalSettlement;
            const isThai = i18n.isThai();

            // Calculate totals
            const grossTotal = settlement.outstandingSalary + settlement.leaveEncashment + settlement.bonus;
            const netPayable = grossTotal - settlement.deductions;
            const totalWithPF = netPayable + settlement.providentFund;

            return `
                <div class="space-y-6">
                    <!-- Settlement Status -->
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center">
                        <span class="material-icons text-purple-600 mr-3">account_balance_wallet</span>
                        <div>
                            <p class="font-medium text-purple-800">${i18n.t('resignation.settlementStatus')}</p>
                            <p class="text-sm text-purple-600">
                                ${settlement.status === 'pending' ? i18n.t('resignation.settlementPending') : i18n.t('resignation.settlementProcessed')}
                            </p>
                        </div>
                    </div>

                    <!-- Earnings -->
                    ${CardComponent.render({
                        id: 'settlement-earnings',
                        title: i18n.t('resignation.earnings'),
                        icon: 'add_circle',
                        content: `
                            <div class="space-y-3">
                                ${this.renderSettlementRow(i18n.t('resignation.outstandingSalary'), settlement.outstandingSalary)}
                                ${this.renderSettlementRow(i18n.t('resignation.leaveEncashment'), settlement.leaveEncashment)}
                                ${this.renderSettlementRow(i18n.t('resignation.bonus'), settlement.bonus)}
                                <div class="border-t pt-3 mt-3">
                                    ${this.renderSettlementRow(i18n.t('resignation.grossTotal'), grossTotal, true)}
                                </div>
                            </div>
                        `
                    })}

                    <!-- Deductions -->
                    ${CardComponent.render({
                        id: 'settlement-deductions',
                        title: i18n.t('resignation.deductions'),
                        icon: 'remove_circle',
                        content: `
                            <div class="space-y-3">
                                ${this.renderSettlementRow(i18n.t('resignation.loansAdvances'), settlement.deductions, false, true)}
                                <div class="border-t pt-3 mt-3">
                                    ${this.renderSettlementRow(i18n.t('resignation.totalDeductions'), settlement.deductions, true, true)}
                                </div>
                            </div>
                        `
                    })}

                    <!-- Provident Fund -->
                    ${CardComponent.render({
                        id: 'settlement-pf',
                        title: i18n.t('resignation.providentFund'),
                        icon: 'savings',
                        content: `
                            <div class="space-y-3">
                                ${this.renderSettlementRow(i18n.t('resignation.pfBalance'), settlement.providentFund)}
                                <p class="text-sm text-gray-500">${i18n.t('resignation.pfNote')}</p>
                            </div>
                        `
                    })}

                    <!-- Final Settlement Summary -->
                    ${CardComponent.render({
                        id: 'settlement-summary',
                        title: i18n.t('resignation.finalSettlementSummary'),
                        icon: 'summarize',
                        content: `
                            <div class="bg-gray-50 rounded-lg p-6">
                                <div class="space-y-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">${i18n.t('resignation.netPayable')}</span>
                                        <span class="text-xl font-bold text-gray-900">THB ${this.formatCurrency(netPayable)}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">${i18n.t('resignation.providentFund')}</span>
                                        <span class="text-xl font-bold text-gray-900">THB ${this.formatCurrency(settlement.providentFund)}</span>
                                    </div>
                                    <div class="border-t pt-4">
                                        <div class="flex justify-between items-center">
                                            <span class="text-lg font-medium text-gray-900">${i18n.t('resignation.totalSettlement')}</span>
                                            <span class="text-2xl font-bold text-cg-red">THB ${this.formatCurrency(totalWithPF)}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Payment Details -->
                                <div class="mt-6 pt-6 border-t">
                                    <h4 class="font-medium text-gray-900 mb-3">${i18n.t('resignation.paymentDetails')}</h4>
                                    <div class="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span class="text-gray-500">${i18n.t('resignation.paymentDate')}</span>
                                            <p class="font-medium">${settlement.finalPaymentDate ? DateUtils.format(settlement.finalPaymentDate, 'long') : i18n.t('resignation.tbd')}</p>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">${i18n.t('resignation.bankAccount')}</span>
                                            <p class="font-medium">${settlement.bankAccount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render a settlement row
         */
        renderSettlementRow(label, amount, isTotal = false, isDeduction = false) {
            const fontClass = isTotal ? 'font-bold text-gray-900' : 'text-gray-600';
            const amountClass = isDeduction ? 'text-red-600' : 'text-gray-900';

            return `
                <div class="flex justify-between items-center">
                    <span class="${fontClass}">${label}</span>
                    <span class="${isTotal ? 'font-bold' : ''} ${amountClass}">
                        ${isDeduction ? '-' : ''} THB ${this.formatCurrency(amount)}
                    </span>
                </div>
            `;
        },

        /**
         * Render no resignation message
         */
        renderNoResignation() {
            return `
                <div class="text-center py-12">
                    <span class="material-icons text-6xl text-gray-300">pending_actions</span>
                    <h3 class="mt-4 text-lg font-medium text-gray-900">${i18n.t('resignation.noResignation')}</h3>
                    <p class="mt-2 text-gray-500">${i18n.t('resignation.noResignationDesc')}</p>
                    <button onclick="ResignationPage.switchTab('recording')" class="mt-6 px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                        ${i18n.t('resignation.startResignation')}
                    </button>
                </div>
            `;
        },

        /**
         * Submit resignation
         */
        async submitResignation() {
            const formData = FormFieldComponent.getFormData('resignation-form');

            // Validate
            const validation = ValidationUtils.validateForm(formData, {
                resignationDate: { required: true },
                lastWorkingDate: { required: true },
                reasonType: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            // Confirm submission
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('resignation.confirmSubmitTitle'),
                message: i18n.t('resignation.confirmSubmitMessage'),
                confirmText: i18n.t('resignation.submitResignation'),
                icon: 'warning'
            });

            if (!confirmed) return;

            try {
                // Simulate API call
                AppState.setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Create resignation record
                currentResignation = {
                    id: 'RES_' + Date.now(),
                    employeeId: AppState.get('currentEmployee')?.employeeId,
                    ...formData,
                    noticePeriod: this.calculateNoticePeriod(formData.resignationDate, formData.lastWorkingDate),
                    status: 'pending_approval',
                    createdDate: new Date().toISOString().split('T')[0],
                    clearanceItems: MockResignationData.generateClearanceChecklist('employee', 'IT'),
                    finalSettlement: {
                        status: 'pending',
                        outstandingSalary: 0,
                        leaveEncashment: 0,
                        bonus: 0,
                        deductions: 0,
                        providentFund: 0
                    }
                };

                AppState.setLoading(false);
                ToastComponent.success(i18n.t('resignation.submitSuccess'));
                Router.refresh();

            } catch (error) {
                AppState.setLoading(false);
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * Update clearance item status
         */
        async updateClearanceItem(itemId) {
            const item = currentResignation.clearanceItems.find(i => i.id === itemId);
            if (!item) return;

            const isThai = i18n.isThai();
            const itemLabel = MockResignationData.getClearanceItemLabel(item.categoryId, item.itemId, isThai);

            ModalComponent.open({
                title: i18n.t('resignation.updateClearanceItem'),
                size: 'md',
                content: `
                    <form id="clearance-update-form" class="space-y-4">
                        <input type="hidden" name="itemId" value="${itemId}">
                        <p class="text-gray-600 mb-4">${itemLabel}</p>
                        ${FormFieldComponent.select({
                            name: 'status',
                            label: i18n.t('resignation.status'),
                            value: item.status,
                            required: true,
                            options: MockResignationData.clearanceStatuses.map(s => ({
                                value: s.value,
                                label: isThai ? s.labelTh : s.labelEn
                            }))
                        })}
                        ${FormFieldComponent.textarea({
                            name: 'notes',
                            label: i18n.t('resignation.notes'),
                            value: item.notes || '',
                            rows: 2
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'ResignationPage.saveClearanceUpdate()' }
                ]
            });
        },

        /**
         * Save clearance item update
         */
        async saveClearanceUpdate() {
            const formData = FormFieldComponent.getFormData('clearance-update-form');
            const item = currentResignation.clearanceItems.find(i => i.id === formData.itemId);

            if (item) {
                item.status = formData.status;
                item.notes = formData.notes;
                if (formData.status === 'completed') {
                    item.signOffDate = new Date().toISOString().split('T')[0];
                    item.signOffBy = AppState.get('currentUser')?.id;
                }
            }

            ModalComponent.close();
            ToastComponent.success(i18n.t('toast.saveSuccess'));

            // Re-render the clearance tab
            const contentContainer = document.getElementById('resignation-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderClearanceTab();
            }
        },

        /**
         * Calculate notice period in days
         */
        calculateNoticePeriod(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        },

        /**
         * Format currency
         */
        formatCurrency(amount) {
            return new Intl.NumberFormat('th-TH').format(amount);
        },

        /**
         * Get status configuration
         */
        getStatusConfig(status) {
            const configs = {
                'draft': { icon: 'edit', bgColor: 'gray' },
                'pending_approval': { icon: 'pending', bgColor: 'yellow' },
                'approved': { icon: 'check_circle', bgColor: 'blue' },
                'pending_clearance': { icon: 'checklist', bgColor: 'orange' },
                'clearance_completed': { icon: 'verified', bgColor: 'teal' },
                'final_settlement': { icon: 'payments', bgColor: 'purple' },
                'completed': { icon: 'task_alt', bgColor: 'green' },
                'cancelled': { icon: 'cancel', bgColor: 'red' }
            };
            return configs[status] || configs['draft'];
        },

        /**
         * Get clearance status configuration
         */
        getClearanceStatusConfig(status) {
            const configs = {
                'pending': { icon: 'radio_button_unchecked', iconClass: 'text-yellow-500', badgeClass: 'bg-yellow-100 text-yellow-800' },
                'in_progress': { icon: 'pending', iconClass: 'text-blue-500', badgeClass: 'bg-blue-100 text-blue-800' },
                'completed': { icon: 'check_circle', iconClass: 'text-green-500', badgeClass: 'bg-green-100 text-green-800' },
                'not_applicable': { icon: 'do_not_disturb_on', iconClass: 'text-gray-400', badgeClass: 'bg-gray-100 text-gray-600' }
            };
            return configs[status] || configs['pending'];
        },

        /**
         * Render skeleton loading state
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 py-6 space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 5 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResignationPage;
}

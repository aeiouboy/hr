/**
 * Transfer Request Page
 * Employee transfer workflow functionality
 * Supports: Internal, Inter-company, Cross-BG, and Temporary Assignment transfers
 */

const TransferRequestPage = (function() {
    let activeTab = 'overview';
    let transferHistory = [];
    let pendingTransfers = [];
    let currentStep = 1;
    let formData = {};

    // Transfer type configurations
    const transferTypes = {
        internal: {
            id: 'internal',
            labelEn: 'Internal Transfer',
            labelTh: 'โอนย้ายภายในบริษัท',
            descEn: 'Transfer within the same company',
            descTh: 'การโอนย้ายภายในบริษัทเดียวกัน',
            icon: 'swap_horiz',
            color: 'blue',
            approvalSteps: 3
        },
        intercompany: {
            id: 'intercompany',
            labelEn: 'Inter-company Transfer',
            labelTh: 'โอนย้ายระหว่างบริษัท',
            descEn: 'Transfer between companies in the same Business Group',
            descTh: 'การโอนย้ายระหว่างบริษัทในกลุ่มธุรกิจเดียวกัน',
            icon: 'business',
            color: 'purple',
            approvalSteps: 4
        },
        crossbg: {
            id: 'crossbg',
            labelEn: 'Cross-BG Transfer',
            labelTh: 'โอนย้ายข้ามกลุ่มธุรกิจ',
            descEn: 'Transfer between different Business Groups',
            descTh: 'การโอนย้ายระหว่างกลุ่มธุรกิจที่แตกต่างกัน',
            icon: 'corporate_fare',
            color: 'orange',
            approvalSteps: 4
        },
        secondment: {
            id: 'secondment',
            labelEn: 'Temporary Assignment / Secondment',
            labelTh: 'การปฏิบัติงานชั่วคราว / ยืมตัว',
            descEn: 'Temporary assignment to another position',
            descTh: 'การมอบหมายงานชั่วคราวในตำแหน่งอื่น',
            icon: 'schedule',
            color: 'teal',
            approvalSteps: 3
        }
    };

    // Transfer reasons
    const transferReasons = [
        { value: 'career_development', labelEn: 'Career Development', labelTh: 'การพัฒนาอาชีพ' },
        { value: 'business_needs', labelEn: 'Business Needs', labelTh: 'ความจำเป็นทางธุรกิจ' },
        { value: 'personal_request', labelEn: 'Personal Request', labelTh: 'ขอโอนย้ายส่วนตัว' },
        { value: 'restructuring', labelEn: 'Organization Restructuring', labelTh: 'การปรับโครงสร้างองค์กร' },
        { value: 'performance', labelEn: 'Performance-based', labelTh: 'ตามผลการปฏิบัติงาน' },
        { value: 'project', labelEn: 'Project Assignment', labelTh: 'มอบหมายโปรเจกต์' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ];

    return {
        /**
         * Render the transfer request page
         * @param {object} params - Route parameters
         * @returns {string}
         */
        render(params) {
            const isLoading = AppState.get('isLoading');
            const hasData = transferHistory.length > 0 || pendingTransfers.length > 0;

            if (isLoading && !hasData) {
                return this.renderSkeleton();
            }

            // If viewing a specific transfer request
            if (params?.id) {
                return this.renderTransferDetails(params.id);
            }

            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const canInitiateTransfer = RBAC.hasPermission('initiate_transfer') || RBAC.isManager();

            // Define tabs
            const tabs = [
                { id: 'overview', icon: 'dashboard', label: i18n.t('transfer.overview') },
                { id: 'new', icon: 'add_circle', label: i18n.t('transfer.newRequest') },
                { id: 'history', icon: 'history', label: i18n.t('transfer.history') },
                { id: 'timeline', icon: 'timeline', label: i18n.t('transfer.careerTimeline') }
            ];

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('transfer.title')}</h1>
                            <p class="text-gray-600 mt-1">${i18n.t('transfer.subtitle')}</p>
                        </div>
                        ${canInitiateTransfer ? `
                            <button onclick="TransferRequestPage.switchTab('new')"
                                    class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                <span class="material-icons text-sm">add</span>
                                ${i18n.t('transfer.newRequest')}
                            </button>
                        ` : ''}
                    </div>

                    <!-- Tabs Navigation -->
                    <div class="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6 overflow-x-auto" role="tablist">
                        ${tabs.map(tab => `
                            <button onclick="TransferRequestPage.switchTab('${tab.id}')"
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
                    <div id="transfer-tab-content">
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
                case 'overview':
                    return this.renderOverviewTab();
                case 'new':
                    return this.renderNewTransferTab();
                case 'history':
                    return this.renderHistoryTab();
                case 'timeline':
                    return this.renderTimelineTab();
                default:
                    return this.renderOverviewTab();
            }
        },

        /**
         * Render overview tab
         * @returns {string}
         */
        renderOverviewTab() {
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const currentPosition = employee?.employmentInfo?.organization || {};
            const job = employee?.employmentInfo?.job || {};

            return `
                <div class="space-y-6">
                    <!-- Current Position Card -->
                    ${CardComponent.render({
                        id: 'current-position-card',
                        title: i18n.t('transfer.currentPosition'),
                        icon: 'work',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.company')}</p>
                                    <p class="font-medium text-gray-900">${currentPosition.company || '-'}</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.position')}</p>
                                    <p class="font-medium text-gray-900">${currentPosition.position || '-'}</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.department')}</p>
                                    <p class="font-medium text-gray-900">${currentPosition.department || '-'}</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.businessUnit')}</p>
                                    <p class="font-medium text-gray-900">${currentPosition.businessUnit || '-'}</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.workLocation')}</p>
                                    <p class="font-medium text-gray-900">${currentPosition.workLocation || '-'}</p>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <p class="text-sm text-gray-500">${i18n.t('employment.supervisor')}</p>
                                    <p class="font-medium text-gray-900">${job.supervisorName || '-'}</p>
                                </div>
                            </div>
                        `
                    })}

                    <!-- Pending Transfers -->
                    ${this.renderPendingTransfersSection()}

                    <!-- Transfer Types Info -->
                    ${CardComponent.render({
                        id: 'transfer-types-card',
                        title: i18n.t('transfer.transferTypes'),
                        icon: 'info',
                        collapsible: true,
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                ${Object.values(transferTypes).map(type => `
                                    <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer"
                                         onclick="TransferRequestPage.startNewTransfer('${type.id}')">
                                        <div class="flex items-start gap-3">
                                            <div class="w-10 h-10 rounded-full bg-${type.color}-100 flex items-center justify-center flex-shrink-0">
                                                <span class="material-icons text-${type.color}-600">${type.icon}</span>
                                            </div>
                                            <div>
                                                <h4 class="font-medium text-gray-900">${isThai ? type.labelTh : type.labelEn}</h4>
                                                <p class="text-sm text-gray-500">${isThai ? type.descTh : type.descEn}</p>
                                                <p class="text-xs text-gray-400 mt-1">
                                                    ${type.approvalSteps} ${i18n.t('transfer.approvalSteps')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render pending transfers section
         * @returns {string}
         */
        renderPendingTransfersSection() {
            if (pendingTransfers.length === 0) {
                return '';
            }

            const isThai = i18n.isThai();

            return CardComponent.render({
                id: 'pending-transfers-card',
                title: `${i18n.t('transfer.pendingTransfers')} (${pendingTransfers.length})`,
                icon: 'pending_actions',
                headerClass: 'bg-yellow-50',
                content: `
                    <div class="space-y-3">
                        ${pendingTransfers.map(transfer => `
                            <div class="p-4 border border-yellow-200 bg-yellow-50/50 rounded-lg">
                                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div class="flex items-center gap-2">
                                            <span class="material-icons text-yellow-600">${transferTypes[transfer.type]?.icon || 'swap_horiz'}</span>
                                            <h4 class="font-medium text-gray-900">
                                                ${isThai ? transferTypes[transfer.type]?.labelTh : transferTypes[transfer.type]?.labelEn}
                                            </h4>
                                        </div>
                                        <p class="text-sm text-gray-600 mt-1">
                                            ${transfer.targetPosition} - ${transfer.targetDepartment}
                                        </p>
                                        <p class="text-xs text-gray-500 mt-1">
                                            ${i18n.t('transfer.effectiveDate')}: ${DateUtils.format(transfer.effectiveDate, 'medium')}
                                        </p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        ${this.renderApprovalProgress(transfer)}
                                        <button onclick="TransferRequestPage.viewTransferDetails('${transfer.id}')"
                                                class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition">
                                            ${i18n.t('common.viewMore')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `
            });
        },

        /**
         * Render approval progress indicator
         * @param {object} transfer
         * @returns {string}
         */
        renderApprovalProgress(transfer) {
            const totalSteps = transfer.approvers?.length || 4;
            const currentStep = transfer.currentStep || 1;
            const percentage = ((currentStep - 1) / totalSteps) * 100;

            return `
                <div class="flex items-center gap-2">
                    <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-yellow-500 transition-all" style="width: ${percentage}%"></div>
                    </div>
                    <span class="text-xs text-gray-500">${currentStep}/${totalSteps}</span>
                </div>
            `;
        },

        /**
         * Render new transfer tab (multi-step wizard)
         * @returns {string}
         */
        renderNewTransferTab() {
            const isThai = i18n.isThai();

            // Wizard steps
            const steps = [
                { id: 1, label: i18n.t('transfer.step.selectType'), icon: 'category' },
                { id: 2, label: i18n.t('transfer.step.sourceInfo'), icon: 'location_on' },
                { id: 3, label: i18n.t('transfer.step.targetInfo'), icon: 'flag' },
                { id: 4, label: i18n.t('transfer.step.details'), icon: 'description' },
                { id: 5, label: i18n.t('transfer.step.review'), icon: 'fact_check' }
            ];

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <!-- Wizard Progress -->
                    <div class="p-4 border-b bg-gray-50">
                        <div class="flex items-center justify-between max-w-3xl mx-auto">
                            ${steps.map((step, index) => `
                                <div class="flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}">
                                    <div class="flex flex-col items-center">
                                        <div class="w-10 h-10 rounded-full flex items-center justify-center
                                            ${currentStep > step.id ? 'bg-green-500 text-white' :
                                              currentStep === step.id ? 'bg-cg-red text-white' :
                                              'bg-gray-200 text-gray-500'}">
                                            ${currentStep > step.id ?
                                              '<span class="material-icons text-sm">check</span>' :
                                              `<span class="material-icons text-sm">${step.icon}</span>`}
                                        </div>
                                        <span class="text-xs mt-1 text-center hidden sm:block
                                            ${currentStep === step.id ? 'text-cg-red font-medium' : 'text-gray-500'}">
                                            ${step.label}
                                        </span>
                                    </div>
                                    ${index < steps.length - 1 ? `
                                        <div class="flex-1 h-0.5 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}"></div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Step Content -->
                    <div class="p-6">
                        ${this.renderWizardStep()}
                    </div>

                    <!-- Navigation -->
                    <div class="p-4 border-t flex justify-between">
                        <button onclick="TransferRequestPage.prevStep()"
                                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition
                                    ${currentStep === 1 ? 'invisible' : ''}">
                            <span class="flex items-center gap-1">
                                <span class="material-icons text-sm">arrow_back</span>
                                ${i18n.t('common.back')}
                            </span>
                        </button>
                        ${currentStep < 5 ? `
                            <button onclick="TransferRequestPage.nextStep()"
                                    class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                <span class="flex items-center gap-1">
                                    ${i18n.t('common.next')}
                                    <span class="material-icons text-sm">arrow_forward</span>
                                </span>
                            </button>
                        ` : `
                            <button onclick="TransferRequestPage.submitTransfer()"
                                    class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                <span class="flex items-center gap-1">
                                    <span class="material-icons text-sm">send</span>
                                    ${i18n.t('transfer.submit')}
                                </span>
                            </button>
                        `}
                    </div>
                </div>
            `;
        },

        /**
         * Render current wizard step content
         * @returns {string}
         */
        renderWizardStep() {
            switch (currentStep) {
                case 1:
                    return this.renderStep1_SelectType();
                case 2:
                    return this.renderStep2_SourceInfo();
                case 3:
                    return this.renderStep3_TargetInfo();
                case 4:
                    return this.renderStep4_Details();
                case 5:
                    return this.renderStep5_Review();
                default:
                    return this.renderStep1_SelectType();
            }
        },

        /**
         * Step 1: Select Transfer Type
         */
        renderStep1_SelectType() {
            const isThai = i18n.isThai();

            return `
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-xl font-bold text-gray-900 mb-6">${i18n.t('transfer.step.selectType')}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${Object.values(transferTypes).map(type => `
                            <label class="relative cursor-pointer">
                                <input type="radio" name="transferType" value="${type.id}"
                                       ${formData.transferType === type.id ? 'checked' : ''}
                                       onchange="TransferRequestPage.updateFormData('transferType', '${type.id}')"
                                       class="sr-only peer">
                                <div class="p-4 border-2 rounded-lg transition
                                    peer-checked:border-cg-red peer-checked:bg-red-50
                                    hover:border-gray-300">
                                    <div class="flex items-start gap-3">
                                        <div class="w-12 h-12 rounded-full bg-${type.color}-100 flex items-center justify-center">
                                            <span class="material-icons text-${type.color}-600">${type.icon}</span>
                                        </div>
                                        <div class="flex-1">
                                            <h4 class="font-medium text-gray-900">${isThai ? type.labelTh : type.labelEn}</h4>
                                            <p class="text-sm text-gray-500 mt-1">${isThai ? type.descTh : type.descEn}</p>
                                        </div>
                                        <span class="material-icons text-cg-red opacity-0 peer-checked:opacity-100 transition">
                                            check_circle
                                        </span>
                                    </div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Step 2: Source (Current) Information
         */
        renderStep2_SourceInfo() {
            const employee = AppState.get('currentEmployee');
            const currentPosition = employee?.employmentInfo?.organization || {};
            const job = employee?.employmentInfo?.job || {};

            return `
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">${i18n.t('transfer.step.sourceInfo')}</h2>
                    <p class="text-gray-500 mb-6">${i18n.t('transfer.sourceInfoDesc')}</p>

                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="flex items-center gap-3 mb-4">
                            <img src="${employee?.photo || 'https://via.placeholder.com/64'}"
                                 alt="" class="w-16 h-16 rounded-full border-2 border-white shadow">
                            <div>
                                <p class="font-medium text-gray-900">
                                    ${employee?.personalInfo?.firstNameEn} ${employee?.personalInfo?.lastNameEn}
                                </p>
                                <p class="text-sm text-gray-500">${employee?.employeeId}</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.company')}</p>
                                <p class="font-medium">${currentPosition.company || '-'}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.businessUnit')}</p>
                                <p class="font-medium">${currentPosition.businessUnit || '-'}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.department')}</p>
                                <p class="font-medium">${currentPosition.department || '-'}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.position')}</p>
                                <p class="font-medium">${currentPosition.position || '-'}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.supervisor')}</p>
                                <p class="font-medium">${job.supervisorName || '-'}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-400 uppercase">${i18n.t('employment.workLocation')}</p>
                                <p class="font-medium">${currentPosition.workLocation || '-'}</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-sm text-blue-700 flex items-center gap-2">
                            <span class="material-icons text-sm">info</span>
                            ${i18n.t('transfer.sourceInfoNote')}
                        </p>
                    </div>
                </div>
            `;
        },

        /**
         * Step 3: Target Information
         */
        renderStep3_TargetInfo() {
            const isThai = i18n.isThai();
            const companies = MockLookupData.transferCompanies || this.getDefaultCompanies();
            const departments = MockLookupData.transferDepartments || this.getDefaultDepartments();
            const positions = MockLookupData.transferPositions || this.getDefaultPositions();

            return `
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">${i18n.t('transfer.step.targetInfo')}</h2>
                    <p class="text-gray-500 mb-6">${i18n.t('transfer.targetInfoDesc')}</p>

                    <form id="target-info-form" class="space-y-6">
                        ${formData.transferType === 'intercompany' || formData.transferType === 'crossbg' ? `
                            ${FormFieldComponent.select({
                                name: 'targetCompany',
                                label: i18n.t('transfer.targetCompany'),
                                required: true,
                                value: formData.targetCompany,
                                placeholder: i18n.t('common.select'),
                                options: companies.map(c => ({
                                    value: c.code,
                                    label: isThai ? c.nameTh : c.nameEn
                                }))
                            })}
                        ` : ''}

                        ${FormFieldComponent.select({
                            name: 'targetBusinessUnit',
                            label: i18n.t('transfer.targetBusinessUnit'),
                            required: true,
                            value: formData.targetBusinessUnit,
                            placeholder: i18n.t('common.select'),
                            options: this.getBusinessUnits().map(bu => ({
                                value: bu.code,
                                label: isThai ? bu.nameTh : bu.nameEn
                            }))
                        })}

                        ${FormFieldComponent.select({
                            name: 'targetDepartment',
                            label: i18n.t('transfer.targetDepartment'),
                            required: true,
                            value: formData.targetDepartment,
                            placeholder: i18n.t('common.select'),
                            options: departments.map(d => ({
                                value: d.code,
                                label: isThai ? d.nameTh : d.nameEn
                            }))
                        })}

                        ${FormFieldComponent.select({
                            name: 'targetPosition',
                            label: i18n.t('transfer.targetPosition'),
                            required: true,
                            value: formData.targetPosition,
                            placeholder: i18n.t('common.select'),
                            options: positions.map(p => ({
                                value: p.code,
                                label: isThai ? p.nameTh : p.nameEn
                            }))
                        })}

                        ${FormFieldComponent.text({
                            name: 'targetSupervisor',
                            label: i18n.t('transfer.targetSupervisor'),
                            required: true,
                            value: formData.targetSupervisor,
                            placeholder: isThai ? 'ระบุชื่อหัวหน้างานใหม่' : 'Enter new supervisor name'
                        })}

                        ${FormFieldComponent.text({
                            name: 'targetWorkLocation',
                            label: i18n.t('transfer.targetWorkLocation'),
                            value: formData.targetWorkLocation,
                            placeholder: isThai ? 'ระบุสถานที่ทำงานใหม่' : 'Enter new work location'
                        })}
                    </form>
                </div>
            `;
        },

        /**
         * Step 4: Transfer Details
         */
        renderStep4_Details() {
            const isThai = i18n.isThai();
            const isSecondment = formData.transferType === 'secondment';

            return `
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">${i18n.t('transfer.step.details')}</h2>
                    <p class="text-gray-500 mb-6">${i18n.t('transfer.detailsDesc')}</p>

                    <form id="transfer-details-form" class="space-y-6">
                        ${FormFieldComponent.date({
                            name: 'effectiveDate',
                            label: i18n.t('transfer.effectiveDate'),
                            required: true,
                            value: formData.effectiveDate,
                            min: DateUtils.today()
                        })}

                        ${isSecondment ? `
                            ${FormFieldComponent.date({
                                name: 'endDate',
                                label: i18n.t('transfer.endDate'),
                                required: true,
                                value: formData.endDate,
                                min: formData.effectiveDate || DateUtils.today(),
                                hint: i18n.t('transfer.endDateHint')
                            })}
                        ` : ''}

                        ${FormFieldComponent.select({
                            name: 'transferReason',
                            label: i18n.t('transfer.reason'),
                            required: true,
                            value: formData.transferReason,
                            placeholder: i18n.t('common.select'),
                            options: transferReasons.map(r => ({
                                value: r.value,
                                label: isThai ? r.labelTh : r.labelEn
                            }))
                        })}

                        ${FormFieldComponent.textarea({
                            name: 'transferComments',
                            label: i18n.t('transfer.comments'),
                            value: formData.transferComments,
                            rows: 4,
                            placeholder: isThai ? 'ระบุรายละเอียดเพิ่มเติม' : 'Provide additional details'
                        })}

                        <div class="border-t pt-6">
                            <h3 class="font-medium text-gray-900 mb-4">${i18n.t('transfer.salaryAdjustment')}</h3>

                            ${FormFieldComponent.radio({
                                name: 'salaryChange',
                                label: '',
                                value: formData.salaryChange || 'no_change',
                                options: [
                                    { value: 'no_change', label: i18n.t('transfer.salary.noChange') },
                                    { value: 'increase', label: i18n.t('transfer.salary.increase') },
                                    { value: 'decrease', label: i18n.t('transfer.salary.decrease') }
                                ],
                                onChange: 'TransferRequestPage.toggleSalaryDetails(this.value)'
                            })}

                            <div id="salary-adjustment-details" class="${formData.salaryChange === 'no_change' || !formData.salaryChange ? 'hidden' : ''} mt-4 space-y-4">
                                ${FormFieldComponent.text({
                                    name: 'salaryAdjustmentAmount',
                                    label: i18n.t('transfer.salary.amount'),
                                    type: 'number',
                                    value: formData.salaryAdjustmentAmount,
                                    placeholder: '0'
                                })}

                                ${FormFieldComponent.textarea({
                                    name: 'salaryAdjustmentReason',
                                    label: i18n.t('transfer.salary.reason'),
                                    value: formData.salaryAdjustmentReason,
                                    rows: 2
                                })}
                            </div>
                        </div>

                        ${FormFieldComponent.file({
                            name: 'attachments',
                            label: i18n.t('transfer.attachments'),
                            accept: 'image/*,.pdf,.doc,.docx',
                            multiple: true,
                            hint: isThai ? 'รองรับไฟล์: รูปภาพ, PDF, Word' : 'Supported: Images, PDF, Word'
                        })}
                    </form>
                </div>
            `;
        },

        /**
         * Step 5: Review and Submit
         */
        renderStep5_Review() {
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const transferType = transferTypes[formData.transferType];
            const selectedReason = transferReasons.find(r => r.value === formData.transferReason);

            return `
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-xl font-bold text-gray-900 mb-2">${i18n.t('transfer.step.review')}</h2>
                    <p class="text-gray-500 mb-6">${i18n.t('transfer.reviewDesc')}</p>

                    <!-- Transfer Type -->
                    <div class="bg-${transferType?.color || 'gray'}-50 border border-${transferType?.color || 'gray'}-200 rounded-lg p-4 mb-6">
                        <div class="flex items-center gap-3">
                            <span class="material-icons text-${transferType?.color || 'gray'}-600">${transferType?.icon || 'swap_horiz'}</span>
                            <div>
                                <p class="font-medium text-gray-900">
                                    ${isThai ? transferType?.labelTh : transferType?.labelEn}
                                </p>
                                <p class="text-sm text-gray-500">
                                    ${isThai ? transferType?.descTh : transferType?.descEn}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Summary Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <!-- From (Source) -->
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-gray-500 uppercase mb-3 flex items-center gap-1">
                                <span class="material-icons text-sm">logout</span>
                                ${i18n.t('transfer.from')}
                            </h4>
                            <div class="space-y-2 text-sm">
                                <p><span class="text-gray-500">${i18n.t('employment.company')}:</span>
                                   <span class="font-medium">${employee?.employmentInfo?.organization?.company || '-'}</span></p>
                                <p><span class="text-gray-500">${i18n.t('employment.department')}:</span>
                                   <span class="font-medium">${employee?.employmentInfo?.organization?.department || '-'}</span></p>
                                <p><span class="text-gray-500">${i18n.t('employment.position')}:</span>
                                   <span class="font-medium">${employee?.employmentInfo?.organization?.position || '-'}</span></p>
                            </div>
                        </div>

                        <!-- To (Target) -->
                        <div class="bg-green-50 rounded-lg p-4">
                            <h4 class="text-sm font-medium text-green-700 uppercase mb-3 flex items-center gap-1">
                                <span class="material-icons text-sm">login</span>
                                ${i18n.t('transfer.to')}
                            </h4>
                            <div class="space-y-2 text-sm">
                                ${formData.targetCompany ? `
                                    <p><span class="text-gray-500">${i18n.t('employment.company')}:</span>
                                       <span class="font-medium">${this.getCompanyName(formData.targetCompany)}</span></p>
                                ` : ''}
                                <p><span class="text-gray-500">${i18n.t('employment.department')}:</span>
                                   <span class="font-medium">${this.getDepartmentName(formData.targetDepartment)}</span></p>
                                <p><span class="text-gray-500">${i18n.t('employment.position')}:</span>
                                   <span class="font-medium">${this.getPositionName(formData.targetPosition)}</span></p>
                                <p><span class="text-gray-500">${i18n.t('employment.supervisor')}:</span>
                                   <span class="font-medium">${formData.targetSupervisor || '-'}</span></p>
                            </div>
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="border border-gray-200 rounded-lg p-4 mb-6">
                        <h4 class="font-medium text-gray-900 mb-3">${i18n.t('transfer.transferDetails')}</h4>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500">${i18n.t('transfer.effectiveDate')}</p>
                                <p class="font-medium">${DateUtils.format(formData.effectiveDate, 'long')}</p>
                            </div>
                            ${formData.endDate ? `
                                <div>
                                    <p class="text-gray-500">${i18n.t('transfer.endDate')}</p>
                                    <p class="font-medium">${DateUtils.format(formData.endDate, 'long')}</p>
                                </div>
                            ` : ''}
                            <div>
                                <p class="text-gray-500">${i18n.t('transfer.reason')}</p>
                                <p class="font-medium">${isThai ? selectedReason?.labelTh : selectedReason?.labelEn}</p>
                            </div>
                            ${formData.salaryChange && formData.salaryChange !== 'no_change' ? `
                                <div>
                                    <p class="text-gray-500">${i18n.t('transfer.salaryAdjustment')}</p>
                                    <p class="font-medium ${formData.salaryChange === 'increase' ? 'text-green-600' : 'text-red-600'}">
                                        ${formData.salaryChange === 'increase' ? '+' : '-'}${formData.salaryAdjustmentAmount || 0} THB
                                    </p>
                                </div>
                            ` : ''}
                        </div>
                        ${formData.transferComments ? `
                            <div class="mt-4 pt-4 border-t">
                                <p class="text-gray-500 text-sm">${i18n.t('transfer.comments')}</p>
                                <p class="mt-1">${formData.transferComments}</p>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Approval Chain -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 class="font-medium text-blue-900 mb-3 flex items-center gap-2">
                            <span class="material-icons text-sm">verified_user</span>
                            ${i18n.t('transfer.approvalChain')}
                        </h4>
                        <div class="flex items-center gap-2 overflow-x-auto pb-2">
                            ${this.getApprovalChain(formData.transferType).map((approver, index, arr) => `
                                <div class="flex items-center">
                                    <div class="flex flex-col items-center min-w-[100px]">
                                        <div class="w-10 h-10 rounded-full bg-white border-2 border-blue-300 flex items-center justify-center">
                                            <span class="material-icons text-blue-600 text-sm">${approver.icon}</span>
                                        </div>
                                        <span class="text-xs text-blue-800 mt-1 text-center">${approver.label}</span>
                                    </div>
                                    ${index < arr.length - 1 ? `
                                        <span class="material-icons text-blue-300 mx-2">arrow_forward</span>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render history tab
         * @returns {string}
         */
        renderHistoryTab() {
            const isThai = i18n.isThai();

            if (transferHistory.length === 0) {
                return `
                    <div class="text-center py-12 text-gray-500">
                        <span class="material-icons text-5xl mb-4">history</span>
                        <p class="text-lg">${i18n.t('transfer.noHistory')}</p>
                    </div>
                `;
            }

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div class="divide-y divide-gray-200">
                        ${transferHistory.map(transfer => this.renderHistoryItem(transfer)).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render history item
         * @param {object} transfer
         * @returns {string}
         */
        renderHistoryItem(transfer) {
            const isThai = i18n.isThai();
            const type = transferTypes[transfer.type];
            const statusConfig = {
                pending: { class: 'bg-yellow-100 text-yellow-800', icon: 'pending' },
                approved: { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                rejected: { class: 'bg-red-100 text-red-800', icon: 'cancel' },
                completed: { class: 'bg-blue-100 text-blue-800', icon: 'done_all' }
            };
            const status = statusConfig[transfer.status] || statusConfig.pending;

            return `
                <div class="p-4 hover:bg-gray-50 transition">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 rounded-full bg-${type?.color || 'gray'}-100 flex items-center justify-center flex-shrink-0">
                                <span class="material-icons text-${type?.color || 'gray'}-600">${type?.icon || 'swap_horiz'}</span>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-900">
                                    ${isThai ? type?.labelTh : type?.labelEn}
                                </h4>
                                <p class="text-sm text-gray-600">
                                    ${transfer.sourcePosition} -> ${transfer.targetPosition}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${i18n.t('transfer.effectiveDate')}: ${DateUtils.format(transfer.effectiveDate, 'medium')}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${status.class}">
                                <span class="material-icons text-xs">${status.icon}</span>
                                ${i18n.t(`transfer.status.${transfer.status}`)}
                            </span>
                            <button onclick="TransferRequestPage.viewTransferDetails('${transfer.id}')"
                                    class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition">
                                ${i18n.t('common.viewMore')}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render career timeline tab
         * @returns {string}
         */
        renderTimelineTab() {
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const careerHistory = this.getCareerHistory();

            return `
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center gap-3 mb-6">
                        <img src="${employee?.photo || 'https://via.placeholder.com/64'}"
                             alt="" class="w-16 h-16 rounded-full border-2 border-gray-200">
                        <div>
                            <h2 class="text-xl font-bold text-gray-900">
                                ${employee?.personalInfo?.firstNameEn} ${employee?.personalInfo?.lastNameEn}
                            </h2>
                            <p class="text-gray-500">
                                ${i18n.t('transfer.unifiedEmployeeId')}: ${employee?.employeeId}
                            </p>
                        </div>
                    </div>

                    <!-- Timeline -->
                    <div class="relative">
                        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        ${careerHistory.map((entry, index) => `
                            <div class="relative pl-14 pb-8 ${index === careerHistory.length - 1 ? 'pb-0' : ''}">
                                <div class="absolute left-4 w-5 h-5 rounded-full ${index === 0 ? 'bg-cg-red' : 'bg-gray-400'} border-4 border-white shadow"></div>

                                <div class="bg-${index === 0 ? 'red-50 border-red-200' : 'gray-50 border-gray-200'} border rounded-lg p-4">
                                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <h4 class="font-medium text-gray-900">${entry.position}</h4>
                                        <span class="text-sm text-gray-500">${DateUtils.format(entry.startDate, 'medium')} - ${entry.endDate ? DateUtils.format(entry.endDate, 'medium') : i18n.t('transfer.present')}</span>
                                    </div>
                                    <p class="text-sm text-gray-600">${entry.company}</p>
                                    <p class="text-sm text-gray-500">${entry.department}</p>
                                    ${entry.movementType ? `
                                        <span class="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                            ${isThai ? entry.movementTypeTh : entry.movementTypeEn}
                                        </span>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        /**
         * Render transfer details view
         * @param {string} transferId
         * @returns {string}
         */
        renderTransferDetails(transferId) {
            const transfer = [...pendingTransfers, ...transferHistory].find(t => t.id === transferId);

            if (!transfer) {
                return `
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                        <div class="text-center py-12 text-gray-500">
                            <span class="material-icons text-5xl mb-4">error</span>
                            <p class="text-lg">${i18n.t('transfer.notFound')}</p>
                            <button onclick="Router.navigate('/transfer-request')"
                                    class="mt-4 px-4 py-2 bg-cg-red text-white rounded-lg">
                                ${i18n.t('common.backToHome')}
                            </button>
                        </div>
                    </div>
                `;
            }

            const isThai = i18n.isThai();
            const type = transferTypes[transfer.type];

            return `
                <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
                    <button onclick="Router.navigate('/transfer-request')"
                            class="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-1">
                        <span class="material-icons">arrow_back</span>
                        ${i18n.t('transfer.backToList')}
                    </button>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div class="flex items-start justify-between mb-6">
                            <div class="flex items-center gap-4">
                                <div class="w-14 h-14 rounded-full bg-${type?.color || 'gray'}-100 flex items-center justify-center">
                                    <span class="material-icons text-${type?.color || 'gray'}-600 text-2xl">${type?.icon || 'swap_horiz'}</span>
                                </div>
                                <div>
                                    <h1 class="text-2xl font-bold text-gray-900">
                                        ${isThai ? type?.labelTh : type?.labelEn}
                                    </h1>
                                    <p class="text-gray-500">ID: ${transfer.id}</p>
                                </div>
                            </div>
                            ${this.renderStatusBadge(transfer.status)}
                        </div>

                        <!-- Transfer Details -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h4 class="font-medium text-gray-700 mb-3">${i18n.t('transfer.from')}</h4>
                                <div class="space-y-2 text-sm">
                                    <p><span class="text-gray-500">${i18n.t('employment.company')}:</span> ${transfer.sourceCompany}</p>
                                    <p><span class="text-gray-500">${i18n.t('employment.department')}:</span> ${transfer.sourceDepartment}</p>
                                    <p><span class="text-gray-500">${i18n.t('employment.position')}:</span> ${transfer.sourcePosition}</p>
                                </div>
                            </div>
                            <div class="bg-green-50 rounded-lg p-4">
                                <h4 class="font-medium text-green-700 mb-3">${i18n.t('transfer.to')}</h4>
                                <div class="space-y-2 text-sm">
                                    <p><span class="text-gray-500">${i18n.t('employment.company')}:</span> ${transfer.targetCompany}</p>
                                    <p><span class="text-gray-500">${i18n.t('employment.department')}:</span> ${transfer.targetDepartment}</p>
                                    <p><span class="text-gray-500">${i18n.t('employment.position')}:</span> ${transfer.targetPosition}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Approval Progress -->
                        ${this.renderDetailedApprovalProgress(transfer)}
                    </div>
                </div>
            `;
        },

        /**
         * Render status badge
         * @param {string} status
         * @returns {string}
         */
        renderStatusBadge(status) {
            const config = {
                pending: { class: 'bg-yellow-100 text-yellow-800', label: i18n.t('transfer.status.pending') },
                approved: { class: 'bg-green-100 text-green-800', label: i18n.t('transfer.status.approved') },
                rejected: { class: 'bg-red-100 text-red-800', label: i18n.t('transfer.status.rejected') },
                completed: { class: 'bg-blue-100 text-blue-800', label: i18n.t('transfer.status.completed') }
            };
            const statusInfo = config[status] || config.pending;

            return `<span class="px-3 py-1 text-sm font-medium rounded-full ${statusInfo.class}">${statusInfo.label}</span>`;
        },

        /**
         * Render detailed approval progress
         * @param {object} transfer
         * @returns {string}
         */
        renderDetailedApprovalProgress(transfer) {
            const approvers = transfer.approvers || [];

            return `
                <div class="border-t pt-6">
                    <h4 class="font-medium text-gray-900 mb-4">${i18n.t('transfer.approvalProgress')}</h4>
                    <div class="space-y-4">
                        ${approvers.map((approver, index) => `
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center
                                    ${approver.status === 'approved' ? 'bg-green-100' :
                                      approver.status === 'rejected' ? 'bg-red-100' :
                                      approver.status === 'pending' && transfer.currentStep === index + 1 ? 'bg-yellow-100' :
                                      'bg-gray-100'}">
                                    <span class="material-icons text-sm
                                        ${approver.status === 'approved' ? 'text-green-600' :
                                          approver.status === 'rejected' ? 'text-red-600' :
                                          approver.status === 'pending' && transfer.currentStep === index + 1 ? 'text-yellow-600' :
                                          'text-gray-400'}">
                                        ${approver.status === 'approved' ? 'check_circle' :
                                          approver.status === 'rejected' ? 'cancel' :
                                          'schedule'}
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="font-medium text-gray-900">${approver.role}</p>
                                            <p class="text-sm text-gray-500">${approver.user?.name || '-'}</p>
                                        </div>
                                        ${approver.actionDate ? `
                                            <span class="text-xs text-gray-500">${DateUtils.formatDateTime(approver.actionDate)}</span>
                                        ` : ''}
                                    </div>
                                    ${approver.comments ? `
                                        <p class="mt-2 text-sm text-gray-600 bg-gray-50 rounded p-2">${approver.comments}</p>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        },

        // ===== Helper Methods =====

        /**
         * Get default companies list
         */
        getDefaultCompanies() {
            return [
                { code: 'RIS', nameEn: 'RIS (C015)', nameTh: 'RIS (C015)' },
                { code: 'CDS', nameEn: 'Central Department Store', nameTh: 'เซ็นทรัล ดีพาร์ทเมนท์ สโตร์' },
                { code: 'ROB', nameEn: 'Robinson', nameTh: 'โรบินสัน' },
                { code: 'TOPS', nameEn: 'Tops Supermarket', nameTh: 'ท็อปส์ ซูเปอร์มาร์เก็ต' },
                { code: 'POWER', nameEn: 'Power Buy', nameTh: 'เพาเวอร์บาย' },
                { code: 'CPN', nameEn: 'Central Pattana', nameTh: 'เซ็นทรัลพัฒนา' }
            ];
        },

        /**
         * Get default departments list
         */
        getDefaultDepartments() {
            return [
                { code: 'PM', nameEn: 'Product Management', nameTh: 'ผลิตภัณฑ์' },
                { code: 'IT', nameEn: 'Information Technology', nameTh: 'เทคโนโลยีสารสนเทศ' },
                { code: 'HR', nameEn: 'Human Resources', nameTh: 'ทรัพยากรบุคคล' },
                { code: 'FIN', nameEn: 'Finance', nameTh: 'การเงิน' },
                { code: 'MKT', nameEn: 'Marketing', nameTh: 'การตลาด' },
                { code: 'OPS', nameEn: 'Operations', nameTh: 'ปฏิบัติการ' },
                { code: 'SCM', nameEn: 'Supply Chain', nameTh: 'ซัพพลายเชน' }
            ];
        },

        /**
         * Get default positions list
         */
        getDefaultPositions() {
            return [
                { code: 'PM_MGR', nameEn: 'Product Manager', nameTh: 'ผู้จัดการผลิตภัณฑ์' },
                { code: 'PM_SR', nameEn: 'Senior Product Manager', nameTh: 'ผู้จัดการผลิตภัณฑ์อาวุโส' },
                { code: 'DEV_SR', nameEn: 'Senior Developer', nameTh: 'นักพัฒนาอาวุโส' },
                { code: 'DEV_LEAD', nameEn: 'Tech Lead', nameTh: 'หัวหน้าทีมเทคนิค' },
                { code: 'HR_MGR', nameEn: 'HR Manager', nameTh: 'ผู้จัดการ HR' },
                { code: 'HR_BP', nameEn: 'HR Business Partner', nameTh: 'พันธมิตรทรัพยากรบุคคล' },
                { code: 'FIN_MGR', nameEn: 'Finance Manager', nameTh: 'ผู้จัดการการเงิน' }
            ];
        },

        /**
         * Get business units
         */
        getBusinessUnits() {
            return [
                { code: 'RIS_BU', nameEn: 'RIS Business Unit', nameTh: 'หน่วยธุรกิจ RIS' },
                { code: 'RETAIL_BU', nameEn: 'Retail Business Unit', nameTh: 'หน่วยธุรกิจค้าปลีก' },
                { code: 'FOOD_BU', nameEn: 'Food Business Unit', nameTh: 'หน่วยธุรกิจอาหาร' },
                { code: 'PROP_BU', nameEn: 'Property Business Unit', nameTh: 'หน่วยธุรกิจอสังหาริมทรัพย์' }
            ];
        },

        /**
         * Get company name by code
         */
        getCompanyName(code) {
            const company = this.getDefaultCompanies().find(c => c.code === code);
            return i18n.isThai() ? company?.nameTh : company?.nameEn;
        },

        /**
         * Get department name by code
         */
        getDepartmentName(code) {
            const dept = this.getDefaultDepartments().find(d => d.code === code);
            return i18n.isThai() ? dept?.nameTh : dept?.nameEn;
        },

        /**
         * Get position name by code
         */
        getPositionName(code) {
            const pos = this.getDefaultPositions().find(p => p.code === code);
            return i18n.isThai() ? pos?.nameTh : pos?.nameEn;
        },

        /**
         * Get approval chain based on transfer type
         */
        getApprovalChain(transferType) {
            const isThai = i18n.isThai();
            const chains = {
                internal: [
                    { icon: 'person', label: isThai ? 'หัวหน้างานปัจจุบัน' : 'Current Manager' },
                    { icon: 'supervisor_account', label: isThai ? 'หัวหน้างานใหม่' : 'Target Manager' },
                    { icon: 'admin_panel_settings', label: isThai ? 'HR' : 'HR' }
                ],
                intercompany: [
                    { icon: 'person', label: isThai ? 'หัวหน้างานปัจจุบัน' : 'Current Manager' },
                    { icon: 'supervisor_account', label: isThai ? 'หัวหน้างานใหม่' : 'Target Manager' },
                    { icon: 'admin_panel_settings', label: isThai ? 'HR (บริษัทต้นทาง)' : 'HR (Source)' },
                    { icon: 'verified_user', label: isThai ? 'HR (บริษัทปลายทาง)' : 'HR (Target)' }
                ],
                crossbg: [
                    { icon: 'person', label: isThai ? 'หัวหน้างานปัจจุบัน' : 'Current Manager' },
                    { icon: 'supervisor_account', label: isThai ? 'หัวหน้างานใหม่' : 'Target Manager' },
                    { icon: 'admin_panel_settings', label: isThai ? 'HR (บริษัทต้นทาง)' : 'HR (Source)' },
                    { icon: 'verified_user', label: isThai ? 'HR (บริษัทปลายทาง)' : 'HR (Target)' }
                ],
                secondment: [
                    { icon: 'person', label: isThai ? 'หัวหน้างานปัจจุบัน' : 'Current Manager' },
                    { icon: 'supervisor_account', label: isThai ? 'หัวหน้างานใหม่' : 'Target Manager' },
                    { icon: 'admin_panel_settings', label: isThai ? 'HR' : 'HR' }
                ]
            };
            return chains[transferType] || chains.internal;
        },

        /**
         * Get career history for timeline
         */
        getCareerHistory() {
            const employee = AppState.get('currentEmployee');

            // Mock career history data
            return [
                {
                    position: employee?.employmentInfo?.organization?.position || 'Product Manager',
                    company: employee?.employmentInfo?.organization?.company || 'RIS',
                    department: employee?.employmentInfo?.organization?.department || 'Product Management',
                    startDate: employee?.employmentInfo?.details?.currentJobEffectiveDate || '2022-01-01',
                    endDate: null,
                    movementType: null
                },
                {
                    position: 'Senior Product Analyst',
                    company: 'RIS (C015)',
                    department: 'Product Management (30040490)',
                    startDate: '2019-06-01',
                    endDate: '2021-12-31',
                    movementType: 'promotion',
                    movementTypeEn: 'Promotion',
                    movementTypeTh: 'เลื่อนตำแหน่ง'
                },
                {
                    position: 'Product Analyst',
                    company: 'Central Department Store',
                    department: 'Digital Products',
                    startDate: '2017-03-01',
                    endDate: '2019-05-31',
                    movementType: 'transfer',
                    movementTypeEn: 'Inter-company Transfer',
                    movementTypeTh: 'โอนย้ายระหว่างบริษัท'
                },
                {
                    position: 'Business Analyst',
                    company: 'Central Department Store',
                    department: 'Business Intelligence',
                    startDate: '2015-04-01',
                    endDate: '2017-02-28',
                    movementType: 'hire',
                    movementTypeEn: 'New Hire',
                    movementTypeTh: 'เริ่มงาน'
                }
            ];
        },

        // ===== Actions =====

        /**
         * Switch tab
         */
        switchTab(tabId) {
            activeTab = tabId;
            if (tabId === 'new') {
                currentStep = 1;
                formData = {};
            }
            this.refreshContent();
        },

        /**
         * Start new transfer with pre-selected type
         */
        startNewTransfer(type) {
            formData = { transferType: type };
            currentStep = 1;
            activeTab = 'new';
            this.refreshContent();
        },

        /**
         * Update form data
         */
        updateFormData(field, value) {
            formData[field] = value;
        },

        /**
         * Toggle salary adjustment details
         */
        toggleSalaryDetails(value) {
            formData.salaryChange = value;
            const details = document.getElementById('salary-adjustment-details');
            if (details) {
                details.classList.toggle('hidden', value === 'no_change');
            }
        },

        /**
         * Go to next step
         */
        nextStep() {
            if (!this.validateCurrentStep()) {
                return;
            }

            // Collect form data from current step
            this.collectStepData();

            if (currentStep < 5) {
                currentStep++;
                this.refreshContent();
            }
        },

        /**
         * Go to previous step
         */
        prevStep() {
            if (currentStep > 1) {
                currentStep--;
                this.refreshContent();
            }
        },

        /**
         * Validate current step
         */
        validateCurrentStep() {
            switch (currentStep) {
                case 1:
                    if (!formData.transferType) {
                        ToastComponent.error(i18n.t('transfer.validation.selectType'));
                        return false;
                    }
                    return true;
                case 2:
                    return true; // Source info is read-only
                case 3:
                    const targetFields = ['targetDepartment', 'targetPosition', 'targetSupervisor'];
                    if (formData.transferType === 'intercompany' || formData.transferType === 'crossbg') {
                        targetFields.unshift('targetCompany');
                    }
                    for (const field of targetFields) {
                        if (!formData[field]) {
                            ToastComponent.error(i18n.t('validation.required'));
                            return false;
                        }
                    }
                    return true;
                case 4:
                    if (!formData.effectiveDate || !formData.transferReason) {
                        ToastComponent.error(i18n.t('validation.required'));
                        return false;
                    }
                    if (formData.transferType === 'secondment' && !formData.endDate) {
                        ToastComponent.error(i18n.t('validation.required'));
                        return false;
                    }
                    return true;
                default:
                    return true;
            }
        },

        /**
         * Collect data from current step forms
         */
        collectStepData() {
            let form;
            switch (currentStep) {
                case 3:
                    form = document.getElementById('target-info-form');
                    break;
                case 4:
                    form = document.getElementById('transfer-details-form');
                    break;
            }

            if (form) {
                const formDataObj = new FormData(form);
                formDataObj.forEach((value, key) => {
                    formData[key] = value;
                });
            }
        },

        /**
         * Submit transfer request
         */
        async submitTransfer() {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('transfer.confirmSubmit'),
                message: i18n.t('transfer.confirmSubmitDesc'),
                confirmText: i18n.t('transfer.submit'),
                icon: 'send'
            });

            if (!confirmed) return;

            try {
                AppState.setLoading(true);

                // Create transfer request via workflow engine
                const employee = AppState.get('currentEmployee');
                const result = await API.submitTransferRequest({
                    type: formData.transferType,
                    employeeId: employee.employeeId,
                    sourceCompany: employee.employmentInfo?.organization?.company,
                    sourceDepartment: employee.employmentInfo?.organization?.department,
                    sourcePosition: employee.employmentInfo?.organization?.position,
                    targetCompany: formData.targetCompany || employee.employmentInfo?.organization?.company,
                    targetBusinessUnit: formData.targetBusinessUnit,
                    targetDepartment: formData.targetDepartment,
                    targetPosition: formData.targetPosition,
                    targetSupervisor: formData.targetSupervisor,
                    targetWorkLocation: formData.targetWorkLocation,
                    effectiveDate: formData.effectiveDate,
                    endDate: formData.endDate,
                    reason: formData.transferReason,
                    comments: formData.transferComments,
                    salaryChange: formData.salaryChange,
                    salaryAdjustmentAmount: formData.salaryAdjustmentAmount,
                    salaryAdjustmentReason: formData.salaryAdjustmentReason
                });

                ToastComponent.success(i18n.t('transfer.submitSuccess'));

                // Reset and go to overview
                formData = {};
                currentStep = 1;
                activeTab = 'overview';
                await this.loadData();
                this.refreshContent();

            } catch (error) {
                console.error('Transfer submission error:', error);
                ToastComponent.error(i18n.t('error.generic'));
            } finally {
                AppState.setLoading(false);
            }
        },

        /**
         * View transfer details
         */
        viewTransferDetails(transferId) {
            Router.navigate(`/transfer-request/${transferId}`);
        },

        /**
         * Refresh content
         */
        refreshContent() {
            const container = document.getElementById('transfer-tab-content');
            if (container) {
                container.innerHTML = this.renderTabContent();
            }

            // Update tab buttons
            document.querySelectorAll('[role="tab"]').forEach(btn => {
                const tabId = btn.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                const isActive = tabId === activeTab;

                btn.setAttribute('aria-selected', isActive.toString());
                btn.classList.toggle('bg-white', isActive);
                btn.classList.toggle('text-cg-red', isActive);
                btn.classList.toggle('shadow-sm', isActive);
                btn.classList.toggle('text-gray-600', !isActive);
            });
        },

        /**
         * Load transfer data
         */
        async loadData() {
            try {
                const employee = AppState.get('currentEmployee');
                if (!employee) return;

                // Load pending transfers
                pendingTransfers = await API.getPendingTransfers(employee.employeeId);

                // Load transfer history
                transferHistory = await API.getTransferHistory(employee.employeeId);

            } catch (error) {
                console.error('Error loading transfer data:', error);
            }
        },

        /**
         * Initialize page
         */
        async init(params) {
            activeTab = 'overview';
            currentStep = 1;
            formData = {};
            await this.loadData();

            const content = document.getElementById('main-content');
            if (content) {
                content.innerHTML = this.render(params);
            }
        },

        /**
         * Render skeleton loading
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 300px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px; margin-bottom: 24px;"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${[1, 2, 3, 4].map(() => `
                            <div class="skeleton shimmer" style="height: 150px; border-radius: 8px;"></div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransferRequestPage;
}

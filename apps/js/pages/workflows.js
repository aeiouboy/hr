/**
 * Workflows Page
 * Pending workflows management
 */

const WorkflowsPage = (function() {
    let activeTab = 'forApproval';

    return {
        /**
         * Render workflows page
         * @returns {string}
         */
        render() {
            const isLoading = AppState.get('isLoading');

            // Show skeleton while loading
            if (isLoading) {
                return this.renderSkeleton();
            }

            const isManager = RBAC.isManager();

            // Get workflow counts
            const forApproval = MockWorkflowData.forApproval?.length || 0;
            const sentBack = MockWorkflowData.sentBack?.length || 0;
            const approved = MockWorkflowData.approved?.length || 0;
            const reassigned = MockWorkflowData.reassigned?.length || 0;

            const tabs = [
                { id: 'forApproval', label: i18n.t('workflow.forApproval'), labelTh: 'รอการอนุมัติ', count: forApproval, show: isManager },
                { id: 'sentBack', label: i18n.t('workflow.sentBack'), labelTh: 'ส่งกลับแก้ไข', count: sentBack, show: true },
                { id: 'approved', label: i18n.t('workflow.approved'), labelTh: 'อนุมัติแล้ว', count: approved, show: isManager },
                { id: 'reassigned', label: i18n.t('workflow.reassigned'), labelTh: 'โอนไปให้ผู้อื่น', count: reassigned, show: isManager }
            ].filter(t => t.show);

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <h1 class="text-2xl font-bold text-gray-900 mb-6">${i18n.t('workflow.title')}</h1>

                    <!-- Summary Cards -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        ${tabs.map(tab => `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition ${activeTab === tab.id ? 'ring-2 ring-cg-red' : ''}"
                                 onclick="WorkflowsPage.switchTab('${tab.id}')">
                                <p class="text-3xl font-bold ${tab.count > 0 ? 'text-cg-red' : 'text-gray-400'}">${tab.count}</p>
                                <p class="text-sm text-gray-600">${i18n.isThai() ? tab.labelTh : tab.label}</p>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Workflow List -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200" id="workflow-list">
                        ${this.renderWorkflowList()}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            activeTab = RBAC.isManager() ? 'forApproval' : 'sentBack';
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            activeTab = tabId;
            const listContainer = document.getElementById('workflow-list');
            if (listContainer) {
                listContainer.innerHTML = this.renderWorkflowList();
            }

            // Update summary card highlighting
            document.querySelectorAll('.grid > div').forEach(card => {
                card.classList.remove('ring-2', 'ring-cg-red');
            });
            event.currentTarget?.classList.add('ring-2', 'ring-cg-red');
        },

        /**
         * Render workflow list
         * @returns {string}
         */
        renderWorkflowList() {
            const workflows = MockWorkflowData[activeTab] || [];

            if (workflows.length === 0) {
                return `
                    <div class="py-12 text-center text-gray-500">
                        <span class="material-icons text-5xl mb-4">assignment_turned_in</span>
                        <p class="text-lg">${i18n.t('workflow.noRequests')}</p>
                    </div>
                `;
            }

            return `
                <div class="divide-y divide-gray-200">
                    ${workflows.map(workflow => this.renderWorkflowItem(workflow)).join('')}
                </div>
            `;
        },

        /**
         * Render single workflow item
         * @param {object} workflow
         * @returns {string}
         */
        renderWorkflowItem(workflow) {
            const isThai = i18n.isThai();
            const requestType = MockLookupData.requestTypes.find(t => t.value === workflow.type);
            const typeLabel = requestType
                ? (isThai ? requestType.labelTh : requestType.labelEn)
                : workflow.type;

            const statusConfig = {
                pending: { class: 'bg-yellow-100 text-yellow-800', icon: 'pending' },
                approved: { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                rejected: { class: 'bg-red-100 text-red-800', icon: 'cancel' },
                sentBack: { class: 'bg-orange-100 text-orange-800', icon: 'undo' }
            };

            const config = statusConfig[workflow.status] || statusConfig.pending;

            return `
                <div class="p-4 hover:bg-gray-50">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div class="flex items-start gap-4">
                            <img src="${workflow.requestedBy.photo}"
                                 alt="${workflow.requestedBy.name}"
                                 class="w-12 h-12 rounded-full object-cover">
                            <div>
                                <h3 class="font-medium text-gray-900">${typeLabel}</h3>
                                <p class="text-sm text-gray-600">
                                    ${i18n.t('workflow.requestedBy')}: ${isThai ? (workflow.requestedBy.nameTh || workflow.requestedBy.name) : workflow.requestedBy.name}
                                </p>
                                <p class="text-xs text-gray-500 mt-1">
                                    ${i18n.t('workflow.requestDate')}: ${DateUtils.format(workflow.submittedAt, 'medium')}
                                    | ${i18n.t('common.effectiveDate')}: ${DateUtils.format(workflow.effectiveDate, 'medium')}
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <span class="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.class}">
                                <span class="material-icons text-xs">${config.icon}</span>
                                ${i18n.t(`workflow.${workflow.status}`)}
                            </span>

                            ${activeTab === 'forApproval' ? `
                                <div class="flex items-center gap-2">
                                    <button class="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            onclick="WorkflowsPage.approveWorkflow('${workflow.id}')">
                                        ${i18n.t('workflow.approve')}
                                    </button>
                                    <button class="px-3 py-1.5 text-sm border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition"
                                            onclick="WorkflowsPage.sendBackWorkflow('${workflow.id}')">
                                        ${i18n.t('workflow.sendBack')}
                                    </button>
                                    <button class="px-3 py-1.5 text-sm border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                                            onclick="WorkflowsPage.rejectWorkflow('${workflow.id}')">
                                        ${i18n.t('workflow.reject')}
                                    </button>
                                </div>
                            ` : `
                                <button class="px-3 py-1.5 text-sm text-cg-info hover:bg-blue-50 rounded-lg transition"
                                        onclick="WorkflowsPage.viewDetails('${workflow.id}')">
                                    ${i18n.t('workflow.viewDetails')}
                                </button>
                            `}
                        </div>
                    </div>

                    <!-- Changes Preview -->
                    ${workflow.changes ? `
                        <div class="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                            <p class="font-medium text-gray-700 mb-2">${workflow.changes.section}</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                ${Object.entries(workflow.changes.newValues || {}).map(([key, value]) => {
                                    const oldValue = workflow.changes.oldValues?.[key];
                                    return `
                                        <div>
                                            <span class="text-gray-500">${key}:</span>
                                            ${oldValue ? `<span class="text-red-500 line-through mr-2">${oldValue}</span>` : ''}
                                            <span class="text-green-600">${value}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * View workflow details
         * @param {string} workflowId
         */
        viewDetails(workflowId) {
            const workflow = MockWorkflowData.requests.find(w => w.id === workflowId);
            if (!workflow) return;

            const isThai = i18n.isThai();
            const requestType = MockLookupData.requestTypes.find(t => t.value === workflow.type);
            const typeLabel = requestType ? (isThai ? requestType.labelTh : requestType.labelEn) : workflow.type;

            ModalComponent.open({
                title: typeLabel,
                size: 'lg',
                content: `
                    <div class="space-y-6">
                        <!-- Requester Info -->
                        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <img src="${workflow.requestedBy.photo}" class="w-14 h-14 rounded-full">
                            <div>
                                <p class="font-medium text-gray-900">${isThai ? (workflow.requestedBy.nameTh || workflow.requestedBy.name) : workflow.requestedBy.name}</p>
                                <p class="text-sm text-gray-500">${i18n.t('workflow.requestDate')}: ${DateUtils.formatDateTime(workflow.submittedAt)}</p>
                                <p class="text-sm text-gray-500">${i18n.t('common.effectiveDate')}: ${DateUtils.format(workflow.effectiveDate, 'long')}</p>
                            </div>
                        </div>

                        <!-- Changes -->
                        ${workflow.changes ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">${isThai ? 'การเปลี่ยนแปลง' : 'Changes'}</h4>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="font-medium text-gray-700 mb-3">${workflow.changes.section}</p>
                                    <div class="space-y-2">
                                        ${Object.entries(workflow.changes.newValues || {}).map(([key, value]) => {
                                            const oldValue = workflow.changes.oldValues?.[key];
                                            return `
                                                <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                                                    <span class="text-gray-600">${key}</span>
                                                    <div class="text-right">
                                                        ${oldValue ? `<span class="text-red-500 line-through mr-3">${oldValue}</span>` : ''}
                                                        <span class="text-green-600 font-medium">${value}</span>
                                                    </div>
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>
                                </div>
                            </div>
                        ` : ''}

                        <!-- Attachments -->
                        ${workflow.attachments?.length > 0 ? `
                            <div>
                                <h4 class="font-medium text-gray-900 mb-3">${isThai ? 'เอกสารแนบ' : 'Attachments'}</h4>
                                <div class="space-y-2">
                                    ${workflow.attachments.map(att => `
                                        <div class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <span class="material-icons text-gray-500">attach_file</span>
                                            <span class="flex-1">${att.name}</span>
                                            <span class="text-sm text-gray-500">${att.size}</span>
                                            <button class="p-1 hover:bg-gray-200 rounded">
                                                <span class="material-icons text-sm text-cg-info">download</span>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Approval Flow -->
                        <div>
                            <h4 class="font-medium text-gray-900 mb-3">${isThai ? 'ขั้นตอนการอนุมัติ' : 'Approval Flow'}</h4>
                            <div class="space-y-3">
                                ${workflow.approvers?.map((approver, index) => {
                                    const isCurrentStep = index === workflow.currentStep - 1;
                                    const isPastStep = index < workflow.currentStep - 1;

                                    return `
                                        <div class="flex items-center gap-4">
                                            <div class="w-8 h-8 rounded-full flex items-center justify-center ${
                                                isPastStep ? 'bg-green-100' :
                                                isCurrentStep ? 'bg-yellow-100' : 'bg-gray-100'
                                            }">
                                                <span class="material-icons text-sm ${
                                                    isPastStep ? 'text-green-600' :
                                                    isCurrentStep ? 'text-yellow-600' : 'text-gray-400'
                                                }">
                                                    ${isPastStep ? 'check' : isCurrentStep ? 'pending' : 'circle'}
                                                </span>
                                            </div>
                                            <div class="flex-1">
                                                <p class="font-medium text-gray-900">${approver.role}</p>
                                                <p class="text-sm text-gray-500">${approver.user?.name || '-'}</p>
                                            </div>
                                            <span class="text-sm ${
                                                isPastStep ? 'text-green-600' :
                                                isCurrentStep ? 'text-yellow-600' : 'text-gray-400'
                                            }">
                                                ${isPastStep ? (isThai ? 'อนุมัติแล้ว' : 'Approved') :
                                                  isCurrentStep ? (isThai ? 'รอดำเนินการ' : 'Pending') :
                                                  (isThai ? 'รอคิว' : 'Waiting')}
                                            </span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                `,
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Approve workflow
         */
        async approveWorkflow(workflowId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('workflow.approve'),
                message: i18n.isThai() ? 'คุณต้องการอนุมัติคำขอนี้หรือไม่?' : 'Are you sure you want to approve this request?',
                confirmText: i18n.t('workflow.approve'),
                icon: 'check_circle'
            });

            if (confirmed) {
                try {
                    await API.approveWorkflow(workflowId, {});
                    ToastComponent.success(i18n.t('toast.approveSuccess'));
                    Router.refresh();
                } catch (error) {
                    ToastComponent.error(i18n.t('error.generic'));
                }
            }
        },

        /**
         * Reject workflow
         */
        async rejectWorkflow(workflowId) {
            ModalComponent.open({
                title: i18n.t('workflow.reject'),
                size: 'md',
                content: `
                    <form id="reject-form">
                        ${FormFieldComponent.textarea({
                            name: 'reason',
                            label: i18n.t('workflow.reason'),
                            required: true,
                            rows: 4,
                            placeholder: i18n.isThai() ? 'กรุณาระบุเหตุผลในการปฏิเสธ' : 'Please provide a reason for rejection'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('workflow.reject'),
                        primary: true,
                        onclick: `WorkflowsPage.submitReject('${workflowId}')`
                    }
                ]
            });
        },

        async submitReject(workflowId) {
            const formData = FormFieldComponent.getFormData('reject-form');

            if (!formData.reason?.trim()) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                await API.rejectWorkflow(workflowId, formData);
                ToastComponent.success(i18n.t('toast.rejectSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Send back workflow
         */
        async sendBackWorkflow(workflowId) {
            ModalComponent.open({
                title: i18n.t('workflow.sendBack'),
                size: 'md',
                content: `
                    <form id="sendback-form">
                        ${FormFieldComponent.textarea({
                            name: 'reason',
                            label: i18n.t('workflow.reason'),
                            required: true,
                            rows: 4,
                            placeholder: i18n.isThai() ? 'กรุณาระบุเหตุผลในการส่งกลับ' : 'Please provide a reason for sending back'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('workflow.sendBack'),
                        primary: true,
                        onclick: `WorkflowsPage.submitSendBack('${workflowId}')`
                    }
                ]
            });
        },

        async submitSendBack(workflowId) {
            const formData = FormFieldComponent.getFormData('sendback-form');

            if (!formData.reason?.trim()) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            try {
                await API.sendBackWorkflow(workflowId, formData);
                ToastComponent.success(i18n.t('toast.sendBackSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.generic'));
            }
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 200px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="mb-4">
                        <div class="skeleton shimmer" style="width: 100%; height: 48px; border-radius: 8px;"></div>
                    </div>
                    ${SkeletonComponent.renderTableSkeleton(8, 5)}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowsPage;
}

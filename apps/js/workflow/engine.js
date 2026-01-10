/**
 * Workflow Engine
 * Process workflow submissions, approvals, rejections
 */

const WorkflowEngine = (function() {
    return {
        /**
         * Create a new workflow request
         * @param {object} options
         * @returns {Promise<object>}
         */
        async createRequest(options) {
            const {
                type,
                section,
                field,
                oldValues,
                newValues,
                effectiveDate,
                attachments = []
            } = options;

            const employee = AppState.get('currentEmployee');
            const changeType = WorkflowRules.getChangeType(section, field || 'default');

            // Validate submission
            const validation = WorkflowRules.validateSubmission(changeType, employee);
            if (!validation.valid) {
                throw new Error(validation.message);
            }

            // Check if requires approval
            if (!WorkflowRules.requiresApproval(changeType)) {
                // Self-service: Apply immediately
                return this.applySelfServiceChange(options);
            }

            // Create workflow request
            const approvers = WorkflowRules.getApprovers(changeType, employee);

            const request = {
                type: changeType,
                status: 'pending',
                requestedBy: {
                    id: employee.employeeId,
                    name: employee.personalInfo?.firstNameEn + ' ' + employee.personalInfo?.lastNameEn,
                    nameTh: employee.personalInfo?.firstNameTh + ' ' + employee.personalInfo?.lastNameTh,
                    photo: employee.photo
                },
                effectiveDate,
                currentStep: 1,
                totalSteps: approvers.length,
                approvers,
                changes: {
                    section,
                    oldValues,
                    newValues
                },
                attachments
            };

            // Submit to API
            const result = await API.submitWorkflowRequest(request);

            // Send notifications
            WorkflowNotifications.notifyApprover(result.data);

            return result;
        },

        /**
         * Apply self-service change immediately
         * @param {object} options
         * @returns {Promise<object>}
         */
        async applySelfServiceChange(options) {
            const { section, newValues } = options;
            const employee = AppState.get('currentEmployee');

            let result;

            switch (section) {
                case 'contactInfo':
                    result = await API.updateContactInfo(employee.employeeId, newValues);
                    break;
                case 'emergencyContact':
                    if (options.action === 'add') {
                        result = await API.addEmergencyContact(employee.employeeId, newValues);
                    } else if (options.action === 'edit') {
                        result = await API.updateEmergencyContact(employee.employeeId, options.id, newValues);
                    } else if (options.action === 'delete') {
                        result = await API.deleteEmergencyContact(employee.employeeId, options.id);
                    }
                    break;
                default:
                    throw new Error('Unknown self-service change type');
            }

            // Show success message
            ToastComponent.success(i18n.t('toast.saveSuccess'));

            return result;
        },

        /**
         * Approve a workflow request
         * @param {string} requestId
         * @param {object} options
         * @returns {Promise<object>}
         */
        async approve(requestId, options = {}) {
            const user = AppState.get('currentUser');
            const workflow = MockWorkflowData.requests.find(r => r.id === requestId);

            if (!workflow) {
                throw new Error('Workflow not found');
            }

            // Check permission
            if (!WorkflowRules.canApprove(user, workflow, workflow.currentStep)) {
                throw new Error(i18n.t('error.unauthorized'));
            }

            // Update current approver status
            const currentApprover = workflow.approvers[workflow.currentStep - 1];
            currentApprover.status = 'approved';
            currentApprover.actionDate = new Date().toISOString();
            currentApprover.comments = options.comments;

            // Check if more approvals needed
            const nextStep = WorkflowRules.getNextStep(workflow);

            if (nextStep) {
                // Move to next step
                workflow.currentStep = nextStep;
                WorkflowNotifications.notifyApprover(workflow);
            } else {
                // Fully approved - apply changes
                workflow.status = 'approved';
                workflow.completedAt = new Date().toISOString();
                await this.applyApprovedChanges(workflow);
                WorkflowNotifications.notifyRequester(workflow, 'approved');
            }

            return { success: true, workflow };
        },

        /**
         * Reject a workflow request
         * @param {string} requestId
         * @param {object} options
         * @returns {Promise<object>}
         */
        async reject(requestId, options = {}) {
            const user = AppState.get('currentUser');
            const workflow = MockWorkflowData.requests.find(r => r.id === requestId);

            if (!workflow) {
                throw new Error('Workflow not found');
            }

            if (!WorkflowRules.canApprove(user, workflow, workflow.currentStep)) {
                throw new Error(i18n.t('error.unauthorized'));
            }

            // Update status
            workflow.status = 'rejected';
            workflow.rejectedAt = new Date().toISOString();
            workflow.rejectionReason = options.reason;

            const currentApprover = workflow.approvers[workflow.currentStep - 1];
            currentApprover.status = 'rejected';
            currentApprover.actionDate = new Date().toISOString();
            currentApprover.comments = options.reason;

            // Notify requester
            WorkflowNotifications.notifyRequester(workflow, 'rejected');

            return { success: true, workflow };
        },

        /**
         * Send back a workflow request
         * @param {string} requestId
         * @param {object} options
         * @returns {Promise<object>}
         */
        async sendBack(requestId, options = {}) {
            const user = AppState.get('currentUser');
            const workflow = MockWorkflowData.requests.find(r => r.id === requestId);

            if (!workflow) {
                throw new Error('Workflow not found');
            }

            if (!WorkflowRules.canApprove(user, workflow, workflow.currentStep)) {
                throw new Error(i18n.t('error.unauthorized'));
            }

            // Update status
            workflow.status = 'sentBack';
            workflow.sentBackAt = new Date().toISOString();
            workflow.sendBackReason = options.reason;

            // Notify requester
            WorkflowNotifications.notifyRequester(workflow, 'sentBack');

            return { success: true, workflow };
        },

        /**
         * Resubmit a sent-back request
         * @param {string} requestId
         * @param {object} updatedData
         * @returns {Promise<object>}
         */
        async resubmit(requestId, updatedData) {
            const workflow = MockWorkflowData.requests.find(r => r.id === requestId);

            if (!workflow || workflow.status !== 'sentBack') {
                throw new Error('Cannot resubmit this request');
            }

            // Update the request
            workflow.status = 'pending';
            workflow.currentStep = 1;
            workflow.changes.newValues = { ...workflow.changes.newValues, ...updatedData };
            workflow.resubmittedAt = new Date().toISOString();

            // Reset approver statuses
            workflow.approvers.forEach(a => {
                a.status = 'pending';
                delete a.actionDate;
                delete a.comments;
            });

            // Notify approver
            WorkflowNotifications.notifyApprover(workflow);

            return { success: true, workflow };
        },

        /**
         * Apply approved changes to employee data
         * @param {object} workflow
         */
        async applyApprovedChanges(workflow) {
            const employee = AppState.get('currentEmployee');
            const { section, newValues } = workflow.changes;

            switch (section) {
                case 'Personal Information':
                    await API.updatePersonalInfo(employee.employeeId, newValues);
                    break;
                case 'Address Information':
                    await API.updateAddress(employee.employeeId, newValues);
                    break;
                case 'Dependents':
                    if (workflow.changes.action === 'add') {
                        await API.addDependent(employee.employeeId, newValues);
                    } else {
                        await API.updateDependent(employee.employeeId, workflow.changes.id, newValues);
                    }
                    break;
                // Add more cases as needed
            }

            // Record in history
            this.recordHistory(workflow);
        },

        /**
         * Record change in history
         * @param {object} workflow
         */
        recordHistory(workflow) {
            const employee = AppState.get('currentEmployee');
            const section = workflow.changes.section.toLowerCase().replace(/\s+/g, '');

            if (!employee.history) {
                employee.history = {};
            }
            if (!employee.history[section]) {
                employee.history[section] = [];
            }

            Object.entries(workflow.changes.newValues || {}).forEach(([field, newValue]) => {
                const oldValue = workflow.changes.oldValues?.[field];
                employee.history[section].unshift({
                    id: `hist_${Date.now()}`,
                    field,
                    oldValue,
                    newValue,
                    changedBy: workflow.requestedBy.name,
                    changedAt: new Date().toISOString(),
                    effectiveDate: workflow.effectiveDate,
                    workflowId: workflow.id
                });
            });
        },

        /**
         * Get pending workflows for current user
         * @returns {array}
         */
        getPendingWorkflows() {
            const user = AppState.get('currentUser');
            return MockWorkflowData.requests.filter(r => {
                if (r.status !== 'pending') return false;
                const currentApprover = r.approvers[r.currentStep - 1];
                return currentApprover?.user?.id === user.employeeId ||
                       RBAC.hasRole(currentApprover?.roleId, user);
            });
        },

        /**
         * Get user's submitted requests
         * @returns {array}
         */
        getMyRequests() {
            const user = AppState.get('currentUser');
            return MockWorkflowData.requests.filter(r =>
                r.requestedBy.id === user.employeeId
            );
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowEngine;
}

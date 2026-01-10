/**
 * Workflow Rules Configuration
 * Define approval rules by change type
 */

const WorkflowRules = (function() {
    // Approval rules configuration
    const rules = {
        // Self-service changes (no approval needed)
        selfService: [
            'contact_info_personal_email',
            'contact_info_personal_mobile',
            'contact_info_home_phone',
            'emergency_contact_add',
            'emergency_contact_edit',
            'emergency_contact_delete'
        ],

        // Single-level approval (Manager only)
        managerApproval: [
            'personal_info_nickname',
            'contact_info_business_phone'
        ],

        // Two-level approval (Manager + HR Admin)
        managerAndHRApproval: [
            'personal_info_change',
            'address_change',
            'dependent_add',
            'dependent_edit',
            'dependent_delete',
            // Advanced information changes require HR verification for sensitive personal data
            'advanced_info_change'
        ],

        // Three-level approval (Manager + HR Admin + HR Manager)
        fullApproval: [
            'bank_account_change',
            'national_id_change',
            'employment_change',
            'compensation_change',
            // Work permit changes require full approval chain for legal compliance
            'work_permit_change'
        ]
    };

    // Approver roles by level
    const approverRoles = {
        1: { role: 'manager', name: 'Manager' },
        2: { role: 'hr_admin', name: 'HR Admin' },
        3: { role: 'hr_manager', name: 'HR Manager' }
    };

    return {
        /**
         * Check if a change type requires approval
         * @param {string} changeType
         * @returns {boolean}
         */
        requiresApproval(changeType) {
            return !rules.selfService.includes(changeType);
        },

        /**
         * Get approval levels required for a change type
         * @param {string} changeType
         * @returns {number}
         */
        getApprovalLevels(changeType) {
            if (rules.selfService.includes(changeType)) return 0;
            if (rules.managerApproval.includes(changeType)) return 1;
            if (rules.managerAndHRApproval.includes(changeType)) return 2;
            if (rules.fullApproval.includes(changeType)) return 3;
            return 2; // Default to manager + HR approval
        },

        /**
         * Get approvers for a change request
         * @param {string} changeType
         * @param {object} employee
         * @returns {array}
         */
        getApprovers(changeType, employee) {
            const levels = this.getApprovalLevels(changeType);
            const approvers = [];

            for (let i = 1; i <= levels; i++) {
                const roleConfig = approverRoles[i];
                approvers.push({
                    step: i,
                    role: roleConfig.name,
                    roleId: roleConfig.role,
                    user: this.findApprover(roleConfig.role, employee),
                    status: 'pending'
                });
            }

            return approvers;
        },

        /**
         * Find appropriate approver for a role
         * @param {string} role
         * @param {object} employee
         * @returns {object}
         */
        findApprover(role, employee) {
            switch (role) {
                case 'manager':
                    // Get employee's supervisor
                    const supervisor = employee?.orgChart?.supervisor;
                    return supervisor ? {
                        id: supervisor.id,
                        name: supervisor.name
                    } : null;

                case 'hr_admin':
                    // In real app, would lookup HR admin for employee's org
                    return { id: 'HR001', name: 'HR Administrator' };

                case 'hr_manager':
                    // In real app, would lookup HR manager
                    return { id: 'HRM001', name: 'HR Manager' };

                default:
                    return null;
            }
        },

        /**
         * Check if user can approve at a specific step
         * @param {object} user
         * @param {object} workflow
         * @param {number} step
         * @returns {boolean}
         */
        canApprove(user, workflow, step) {
            const approver = workflow.approvers?.[step - 1];
            if (!approver) return false;

            // Check if user is the designated approver
            if (approver.user?.id === user.employeeId) return true;

            // Check if user has the required role
            return RBAC.hasRole(approver.roleId, user);
        },

        /**
         * Get next step after approval
         * @param {object} workflow
         * @returns {number|null}
         */
        getNextStep(workflow) {
            const currentStep = workflow.currentStep;
            const totalSteps = workflow.approvers?.length || 0;

            if (currentStep >= totalSteps) return null;
            return currentStep + 1;
        },

        /**
         * Check if workflow is fully approved
         * @param {object} workflow
         * @returns {boolean}
         */
        isFullyApproved(workflow) {
            return workflow.approvers?.every(a => a.status === 'approved');
        },

        /**
         * Get change type category
         * @param {string} section
         * @param {string} field
         * @returns {string}
         */
        getChangeType(section, field) {
            const mapping = {
                personalInfo: {
                    nickname: 'personal_info_nickname',
                    default: 'personal_info_change'
                },
                contactInfo: {
                    personalEmail: 'contact_info_personal_email',
                    personalMobile: 'contact_info_personal_mobile',
                    homePhone: 'contact_info_home_phone',
                    businessPhone: 'contact_info_business_phone',
                    default: 'contact_info_change'
                },
                address: {
                    default: 'address_change'
                },
                emergencyContact: {
                    add: 'emergency_contact_add',
                    edit: 'emergency_contact_edit',
                    delete: 'emergency_contact_delete'
                },
                dependent: {
                    add: 'dependent_add',
                    edit: 'dependent_edit',
                    delete: 'dependent_delete'
                },
                bankAccount: {
                    default: 'bank_account_change'
                }
            };

            const sectionMapping = mapping[section];
            if (!sectionMapping) return 'general_change';

            return sectionMapping[field] || sectionMapping.default || 'general_change';
        },

        /**
         * Validate if change can be submitted
         * @param {string} changeType
         * @param {object} employee
         * @returns {object} { valid: boolean, message: string }
         */
        validateSubmission(changeType, employee) {
            // Check for pending requests of same type
            const pendingRequest = MockWorkflowData.requests.find(r =>
                r.type === changeType &&
                r.requestedBy.id === employee.employeeId &&
                r.status === 'pending'
            );

            if (pendingRequest) {
                return {
                    valid: false,
                    message: i18n.isThai()
                        ? 'คุณมีคำขอประเภทนี้ที่รอดำเนินการอยู่แล้ว'
                        : 'You already have a pending request of this type'
                };
            }

            return { valid: true };
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowRules;
}

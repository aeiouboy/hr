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
            'advanced_info_change',
            // Extended leave requests (over 5 days) require HR approval
            'leave_request_extended'
        ],

        // Single-level approval for leave (Manager only)
        managerApprovalOnly: [
            'leave_request'
        ],

        // Three-level approval (Manager + HR Admin + HR Manager)
        fullApproval: [
            'bank_account_change',
            'national_id_change',
            'employment_change',
            'compensation_change',
            // Work permit changes require full approval chain for legal compliance
            'work_permit_change'
        ],

        // HR Manager + Finance Director approval for payroll
        payrollApproval: [
            'payroll_run'
        ],

        // Transfer-specific approvals
        internalTransfer: [
            'transfer_internal'
        ],
        intercompanyTransfer: [
            'transfer_intercompany',
            'transfer_crossbg'
        ],
        secondmentTransfer: [
            'transfer_secondment'
        ]
    };

    // Transfer approver roles by type
    const transferApproverRoles = {
        internal: [
            { step: 1, role: 'current_manager', name: 'Current Manager' },
            { step: 2, role: 'target_manager', name: 'Target Manager' },
            { step: 3, role: 'hr_admin', name: 'HR Admin' }
        ],
        intercompany: [
            { step: 1, role: 'current_manager', name: 'Current Manager' },
            { step: 2, role: 'target_manager', name: 'Target Manager' },
            { step: 3, role: 'hr_source', name: 'HR (Source Company)' },
            { step: 4, role: 'hr_target', name: 'HR (Target Company)' }
        ],
        crossbg: [
            { step: 1, role: 'current_manager', name: 'Current Manager' },
            { step: 2, role: 'target_manager', name: 'Target Manager' },
            { step: 3, role: 'hr_source', name: 'HR (Source Company)' },
            { step: 4, role: 'hr_target', name: 'HR (Target Company)' }
        ],
        secondment: [
            { step: 1, role: 'current_manager', name: 'Current Manager' },
            { step: 2, role: 'target_manager', name: 'Target Manager' },
            { step: 3, role: 'hr_admin', name: 'HR Admin' }
        ]
    };

    // Approver roles by level
    const approverRoles = {
        1: { role: 'manager', name: 'Manager' },
        2: { role: 'hr_admin', name: 'HR Admin' },
        3: { role: 'hr_manager', name: 'HR Manager' }
    };

    // Special approver roles for payroll
    const payrollApproverRoles = {
        1: { role: 'hr_manager', name: 'HR Manager' },
        2: { role: 'finance_director', name: 'Finance Director' }
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
            if (rules.managerApprovalOnly?.includes(changeType)) return 1;
            if (rules.managerAndHRApproval.includes(changeType)) return 2;
            if (rules.payrollApproval?.includes(changeType)) return 2; // HR Manager + Finance Director
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

            // Use special payroll approvers for payroll runs
            const roleConfigs = rules.payrollApproval?.includes(changeType)
                ? payrollApproverRoles
                : approverRoles;

            for (let i = 1; i <= levels; i++) {
                const roleConfig = roleConfigs[i];
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

                case 'finance_director':
                    // In real app, would lookup Finance Director
                    return { id: 'FIN001', name: 'Finance Director' };

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
        },

        /**
         * Get transfer approval levels based on transfer type
         * @param {string} transferType - internal, intercompany, crossbg, secondment
         * @returns {number}
         */
        getTransferApprovalLevels(transferType) {
            const levels = {
                internal: 3,
                intercompany: 4,
                crossbg: 4,
                secondment: 3
            };
            return levels[transferType] || 3;
        },

        /**
         * Get transfer approvers
         * @param {string} transferType
         * @param {object} transferData
         * @returns {array}
         */
        getTransferApprovers(transferType, transferData) {
            const approverConfig = transferApproverRoles[transferType] || transferApproverRoles.internal;
            const approvers = [];

            approverConfig.forEach(config => {
                let approverUser = null;

                switch (config.role) {
                    case 'current_manager':
                        approverUser = {
                            id: transferData.currentSupervisorId || 'MGR001',
                            name: transferData.currentSupervisorName || 'Current Manager'
                        };
                        break;
                    case 'target_manager':
                        approverUser = {
                            id: transferData.targetSupervisorId || 'MGR002',
                            name: transferData.targetSupervisor || 'Target Manager'
                        };
                        break;
                    case 'hr_admin':
                    case 'hr_source':
                        approverUser = { id: 'HR001', name: 'HR Administrator (Source)' };
                        break;
                    case 'hr_target':
                        approverUser = { id: 'HR002', name: 'HR Administrator (Target)' };
                        break;
                    default:
                        approverUser = null;
                }

                approvers.push({
                    step: config.step,
                    role: config.name,
                    roleId: config.role,
                    user: approverUser,
                    status: 'pending'
                });
            });

            return approvers;
        },

        /**
         * Check if user can approve transfer at specific step
         * @param {object} user
         * @param {object} transfer
         * @param {number} step
         * @returns {boolean}
         */
        canApproveTransfer(user, transfer, step) {
            const approver = transfer.approvers?.[step - 1];
            if (!approver) return false;

            // Check if user is the designated approver
            if (approver.user?.id === user.employeeId) return true;

            // Check if user has the required role
            return RBAC.hasRole(approver.roleId, user);
        },

        /**
         * Apply transfer changes after full approval
         * @param {object} transfer
         * @param {object} employee
         * @returns {object} Updated employee
         */
        applyTransferChanges(transfer, employee) {
            // Store previous position in history
            const previousPosition = {
                company: employee.employmentInfo?.organization?.company,
                businessUnit: employee.employmentInfo?.organization?.businessUnit,
                department: employee.employmentInfo?.organization?.department,
                position: employee.employmentInfo?.organization?.position,
                supervisor: employee.employmentInfo?.job?.supervisorName,
                workLocation: employee.employmentInfo?.organization?.workLocation,
                endDate: transfer.effectiveDate,
                movementType: transfer.type
            };

            // Initialize transfer history if not exists
            if (!employee.transferHistory) {
                employee.transferHistory = [];
            }

            // Add to history
            employee.transferHistory.unshift({
                id: `TH_${Date.now()}`,
                ...previousPosition,
                effectiveDate: employee.employmentInfo?.details?.currentJobEffectiveDate,
                createdAt: new Date().toISOString()
            });

            // Update current position (only for permanent transfers, not secondments)
            if (transfer.type !== 'secondment') {
                employee.employmentInfo.organization = {
                    ...employee.employmentInfo.organization,
                    company: transfer.targetCompany || employee.employmentInfo.organization.company,
                    businessUnit: transfer.targetBusinessUnit,
                    department: transfer.targetDepartment,
                    position: transfer.targetPosition,
                    workLocation: transfer.targetWorkLocation
                };

                employee.employmentInfo.job = {
                    ...employee.employmentInfo.job,
                    supervisorName: transfer.targetSupervisor
                };

                employee.employmentInfo.details = {
                    ...employee.employmentInfo.details,
                    currentJobEffectiveDate: transfer.effectiveDate,
                    currentYearsInJob: '0 years',
                    currentPositionEffectiveDate: transfer.effectiveDate,
                    currentYearsInPosition: '0 years'
                };
            } else {
                // For secondment, track temporary assignment
                employee.secondmentInfo = {
                    isOnSecondment: true,
                    originalPosition: previousPosition,
                    temporaryPosition: {
                        company: transfer.targetCompany,
                        department: transfer.targetDepartment,
                        position: transfer.targetPosition,
                        supervisor: transfer.targetSupervisor
                    },
                    startDate: transfer.effectiveDate,
                    endDate: transfer.endDate
                };
            }

            return employee;
        },

        /**
         * Get post-transfer notification recipients
         * @param {object} transfer
         * @returns {array}
         */
        getPostTransferNotificationRecipients(transfer) {
            const recipients = [];

            // IT Department for system access changes
            recipients.push({
                type: 'IT',
                reason: 'System access and email updates',
                reasonTh: 'อัปเดตการเข้าถึงระบบและอีเมล'
            });

            // Payroll for compensation changes
            recipients.push({
                type: 'Payroll',
                reason: 'Salary and benefits updates',
                reasonTh: 'อัปเดตเงินเดือนและสวัสดิการ'
            });

            // Admin for physical access and equipment
            recipients.push({
                type: 'Admin',
                reason: 'Access card and equipment transfer',
                reasonTh: 'โอนบัตรเข้าอาคารและอุปกรณ์'
            });

            // For cross-company transfers, add additional recipients
            if (transfer.type === 'intercompany' || transfer.type === 'crossbg') {
                recipients.push({
                    type: 'Legal',
                    reason: 'Contract updates',
                    reasonTh: 'อัปเดตสัญญาจ้าง'
                });
            }

            return recipients;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowRules;
}

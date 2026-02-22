/**
 * Role-Based Access Control (RBAC) Utilities
 * Permission checking based on user role
 */

const RBAC = (function() {
    // Role hierarchy (higher roles include permissions of lower roles)
    const roleHierarchy = {
        hr_manager: ['hr_admin', 'manager', 'employee'],
        hr_admin: ['manager', 'employee'],
        manager: ['employee'],
        employee: []
    };

    // Permission definitions by role
    const permissions = {
        employee: [
            'view_own_profile',
            'view_own_employment',
            'view_own_compensation',
            'view_own_benefits',
            'edit_own_contact',
            'edit_own_emergency_contacts',
            'add_own_emergency_contacts',
            'delete_own_emergency_contacts',
            'view_own_payslips',
            'download_own_payslips',
            'view_own_workflows',
            'submit_own_workflows',
            'view_org_chart'
        ],
        manager: [
            'view_team_profiles',
            'view_team_employment',
            'view_team_org_chart',
            'approve_workflows',
            'reject_workflows',
            'send_back_workflows',
            'view_team_summary',
            'view_pending_approvals',
            'view_positions'
        ],
        hr_admin: [
            'view_all_profiles',
            'edit_all_profiles',
            'view_all_employment',
            'edit_all_employment',
            'view_all_compensation',
            'view_all_benefits',
            'manage_workflows',
            'configure_workflows',
            'view_reports',
            'export_data',
            'view_positions',
            'edit_positions',
            'manage_positions'
        ],
        hr_manager: [
            'approve_sensitive_workflows',
            'view_salary_details',
            'edit_compensation',
            'manage_benefits',
            'view_all_reports',
            'manage_users',
            'configure_system'
        ]
    };

    // Field-level permissions (which fields can be edited by which roles)
    const fieldPermissions = {
        personalInfo: {
            employee: ['nickname'],
            manager: [],
            hr_admin: ['salutation', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'nationality', 'maritalStatus'],
            hr_manager: ['all']
        },
        contactInfo: {
            employee: ['personalEmail', 'personalMobile', 'homePhone'],
            manager: [],
            hr_admin: ['businessEmail', 'businessPhone'],
            hr_manager: ['all']
        },
        address: {
            employee: ['all'], // Requires approval
            manager: [],
            hr_admin: ['all'],
            hr_manager: ['all']
        },
        emergencyContacts: {
            employee: ['all'], // Self-service
            manager: [],
            hr_admin: ['all'],
            hr_manager: ['all']
        },
        employment: {
            employee: [],
            manager: [],
            hr_admin: ['all'],
            hr_manager: ['all']
        },
        compensation: {
            employee: [],
            manager: [],
            hr_admin: [],
            hr_manager: ['all']
        },
        advancedInfo: {
            employee: [], // Employees can only view, not edit
            manager: [], // Managers cannot edit advanced info
            hr_admin: ['all'], // HR Admin can edit all advanced info fields
            hr_manager: ['all'] // HR Manager can edit all advanced info fields
        }
    };

    // Actions that require workflow approval
    const workflowRequired = {
        personalInfo: ['firstName', 'lastName', 'nationalId', 'dateOfBirth', 'nationality'],
        address: ['all'],
        bank: ['all'],
        dependents: ['all']
    };

    // Self-service actions (no approval needed)
    const selfService = {
        contactInfo: ['personalEmail', 'personalMobile', 'homePhone'],
        emergencyContacts: ['all']
    };

    /**
     * Get all permissions for a role (including inherited)
     */
    function getAllPermissions(role) {
        const allPerms = new Set(permissions[role] || []);

        // Add inherited permissions
        const inherited = roleHierarchy[role] || [];
        for (const inheritedRole of inherited) {
            const inheritedPerms = permissions[inheritedRole] || [];
            inheritedPerms.forEach(p => allPerms.add(p));
        }

        return Array.from(allPerms);
    }

    /**
     * Get current user from state
     */
    function getCurrentUser() {
        return AppState?.get('currentUser') || null;
    }

    return {
        /**
         * Check if user has a specific permission
         * @param {string} permission
         * @param {object} user - Optional user object (defaults to current user)
         * @returns {boolean}
         */
        hasPermission(permission, user = null) {
            const currentUser = user || getCurrentUser();
            if (!currentUser) return false;

            const userPermissions = getAllPermissions(currentUser.role);
            return userPermissions.includes(permission);
        },

        /**
         * Check if user has any of the specified permissions
         * @param {string[]} permissionList
         * @param {object} user
         * @returns {boolean}
         */
        hasAnyPermission(permissionList, user = null) {
            return permissionList.some(p => this.hasPermission(p, user));
        },

        /**
         * Check if user has all of the specified permissions
         * @param {string[]} permissionList
         * @param {object} user
         * @returns {boolean}
         */
        hasAllPermissions(permissionList, user = null) {
            return permissionList.every(p => this.hasPermission(p, user));
        },

        /**
         * Check if user has a specific role
         * @param {string} role
         * @param {object} user
         * @returns {boolean}
         */
        hasRole(role, user = null) {
            const currentUser = user || getCurrentUser();
            if (!currentUser) return false;

            if (currentUser.role === role) return true;

            // Check inherited roles
            const inherited = roleHierarchy[currentUser.role] || [];
            return inherited.includes(role);
        },

        /**
         * Check if user can edit a specific field
         * @param {string} section - Section name (personalInfo, contactInfo, etc.)
         * @param {string} fieldName - Field name
         * @param {object} user
         * @returns {boolean}
         */
        canEditField(section, fieldName, user = null) {
            const currentUser = user || getCurrentUser();
            if (!currentUser) return false;

            const sectionPerms = fieldPermissions[section];
            if (!sectionPerms) return false;

            // Check from highest role down
            const roles = [currentUser.role, ...(roleHierarchy[currentUser.role] || [])];

            for (const role of roles) {
                const rolePerms = sectionPerms[role];
                if (rolePerms) {
                    if (rolePerms.includes('all') || rolePerms.includes(fieldName)) {
                        return true;
                    }
                }
            }

            return false;
        },

        /**
         * Check if a field change requires workflow approval
         * @param {string} section
         * @param {string} fieldName
         * @returns {boolean}
         */
        requiresWorkflow(section, fieldName) {
            const sectionWorkflow = workflowRequired[section];
            if (!sectionWorkflow) return false;

            return sectionWorkflow.includes('all') || sectionWorkflow.includes(fieldName);
        },

        /**
         * Check if a field can be changed via self-service
         * @param {string} section
         * @param {string} fieldName
         * @returns {boolean}
         */
        isSelfService(section, fieldName) {
            const sectionSelfService = selfService[section];
            if (!sectionSelfService) return false;

            return sectionSelfService.includes('all') || sectionSelfService.includes(fieldName);
        },

        /**
         * Check if user can view another employee's data
         * @param {string} targetEmployeeId
         * @param {object} user
         * @returns {boolean}
         */
        canViewEmployee(targetEmployeeId, user = null) {
            const currentUser = user || getCurrentUser();
            if (!currentUser) return false;

            // Can always view own data
            if (currentUser.employeeId === targetEmployeeId) return true;

            // HR roles can view all
            if (this.hasRole('hr_admin', currentUser)) return true;

            // Managers can view team members
            if (this.hasPermission('view_team_profiles', currentUser)) {
                // In real app, check if target is in team
                return true;
            }

            return false;
        },

        /**
         * Check if user can approve workflows
         * @param {string} workflowType
         * @param {object} user
         * @returns {boolean}
         */
        canApproveWorkflow(workflowType, user = null) {
            const currentUser = user || getCurrentUser();
            if (!currentUser) return false;

            // Sensitive workflows require HR Manager
            const sensitiveWorkflows = ['compensation_change', 'termination', 'promotion'];
            if (sensitiveWorkflows.includes(workflowType)) {
                return this.hasPermission('approve_sensitive_workflows', currentUser);
            }

            return this.hasPermission('approve_workflows', currentUser);
        },

        /**
         * Get user's role display name
         * @param {string} role
         * @param {string} lang
         * @returns {string}
         */
        getRoleDisplayName(role, lang = null) {
            const currentLang = lang || i18n?.getLanguage() || 'en';

            const roleNames = {
                en: {
                    employee: 'Employee',
                    manager: 'Manager',
                    hr_admin: 'HR Administrator',
                    hr_manager: 'HR Manager'
                },
                th: {
                    employee: 'พนักงาน',
                    manager: 'ผู้จัดการ',
                    hr_admin: 'เจ้าหน้าที่ HR',
                    hr_manager: 'ผู้จัดการ HR'
                }
            };

            return roleNames[currentLang]?.[role] || role || 'User';
        },

        /**
         * Get all permissions for current user
         * @returns {string[]}
         */
        getCurrentUserPermissions() {
            const currentUser = getCurrentUser();
            if (!currentUser) return [];
            return getAllPermissions(currentUser.role);
        },

        /**
         * Check if current user is a manager or higher
         * @returns {boolean}
         */
        isManager() {
            return this.hasRole('manager');
        },

        /**
         * Check if current user is HR
         * @returns {boolean}
         */
        isHR() {
            return this.hasRole('hr_admin');
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RBAC;
}

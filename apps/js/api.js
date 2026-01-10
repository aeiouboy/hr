/**
 * API Module
 * Mock API client with simulated delays for realistic UX
 */

const API = (function() {
    // Simulated network delay (ms)
    const NETWORK_DELAY = 300;

    // Session timeout (30 minutes in milliseconds)
    const SESSION_TIMEOUT = 30 * 60 * 1000;

    // Session warning threshold (5 minutes before expiry)
    const SESSION_WARNING_THRESHOLD = 5 * 60 * 1000;

    // Maximum retry attempts
    const MAX_RETRIES = 3;

    // Retry delay in milliseconds (exponential backoff: 1s, 2s, 4s)
    const RETRY_DELAYS = [1000, 2000, 4000];

    /**
     * Custom NetworkError class
     */
    class NetworkError extends Error {
        constructor(message) {
            super(message);
            this.name = 'NetworkError';
            this.isNetworkError = true;
        }
    }

    // Simulate network delay
    function delay(ms = NETWORK_DELAY) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Generate random ID
    function generateId() {
        return Math.random().toString(36).substring(2, 15);
    }

    // Deep clone utility
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * Check if browser is online
     */
    function checkOnlineStatus() {
        return navigator.onLine;
    }

    /**
     * Initialize session timeout tracking
     */
    function initializeSession() {
        const expiryTime = Date.now() + SESSION_TIMEOUT;
        localStorage.setItem('sessionExpiry', expiryTime.toString());

        if (window.AppState) {
            AppState.set('sessionExpiry', expiryTime);
            AppState.set('sessionExpired', false);
        }
    }

    /**
     * Update session activity
     */
    function updateSessionActivity() {
        const expiryTime = Date.now() + SESSION_TIMEOUT;
        localStorage.setItem('sessionExpiry', expiryTime.toString());

        if (window.AppState) {
            AppState.set('sessionExpiry', expiryTime);
            AppState.set('sessionExpired', false);
            AppState.set('showSessionWarning', false);
        }
    }

    /**
     * Check session timeout
     */
    function checkSessionTimeout() {
        const expiryTime = parseInt(localStorage.getItem('sessionExpiry') || '0', 10);
        const now = Date.now();
        const timeUntilExpiry = expiryTime - now;

        // Session expired
        if (timeUntilExpiry <= 0) {
            if (window.AppState) {
                AppState.set('sessionExpired', true);
            }
            return false;
        }

        // Show warning if within threshold
        if (timeUntilExpiry <= SESSION_WARNING_THRESHOLD) {
            const showingWarning = window.AppState?.get('showSessionWarning');
            if (!showingWarning && window.AppState) {
                AppState.set('showSessionWarning', true);
            }
        }

        return true;
    }

    /**
     * Retry wrapper with exponential backoff
     * @param {Function} asyncFn - Async function to retry
     * @param {number} maxRetries - Maximum number of retry attempts
     * @returns {Function} Wrapped function with retry logic
     */
    function withRetry(asyncFn, maxRetries = MAX_RETRIES) {
        return async function(...args) {
            let lastError;

            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                try {
                    return await asyncFn.apply(this, args);
                } catch (error) {
                    lastError = error;

                    // Don't retry on non-network errors
                    if (!error.isNetworkError && error.name !== 'NetworkError') {
                        throw error;
                    }

                    // Don't retry if out of attempts
                    if (attempt >= maxRetries) {
                        console.error(`Max retries (${maxRetries}) exceeded for API call`);
                        throw error;
                    }

                    // Wait before retrying (exponential backoff)
                    const retryDelay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
                    console.warn(`API call failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${retryDelay}ms...`);
                    await delay(retryDelay);
                }
            }

            throw lastError;
        };
    }

    /**
     * Wrapper to manage loading state for async operations
     * @param {Function} asyncFn - Async function to wrap
     * @returns {Function} Wrapped function that manages loading state
     */
    function withLoading(asyncFn) {
        return async function(...args) {
            try {
                AppState.setLoading(true);

                // Check if online before making API call
                if (!checkOnlineStatus()) {
                    throw new NetworkError('You are offline. Please check your internet connection.');
                }

                // Check session timeout
                if (!checkSessionTimeout()) {
                    throw new Error('Session expired. Please refresh the page.');
                }

                // Update session activity on each API call
                updateSessionActivity();

                const result = await asyncFn.apply(this, args);
                return result;
            } catch (error) {
                // Update connection state if network error
                if (error.isNetworkError || !checkOnlineStatus()) {
                    if (window.AppState) {
                        AppState.set('isOnline', false);
                    }
                }
                throw error;
            } finally {
                AppState.setLoading(false);
            }
        };
    }

    // Internal API methods (without loading wrapper)
    const internalAPI = {
        /**
         * Get employee by ID
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getEmployee(employeeId) {
            await delay();
            const employee = clone(MockEmployeeData.employee);
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        },

        /**
         * Get current logged-in user
         * @returns {Promise<object>}
         */
        async getCurrentUser() {
            await delay(100);
            return clone(MockEmployeeData.currentUser);
        },

        /**
         * Update employee personal info
         * @param {string} employeeId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async updatePersonalInfo(employeeId, data) {
            await delay(500);
            // Merge with existing data
            Object.assign(MockEmployeeData.employee.personalInfo, data);
            return { success: true, data: clone(MockEmployeeData.employee.personalInfo) };
        },

        /**
         * Update contact information (self-service)
         * @param {string} employeeId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async updateContactInfo(employeeId, data) {
            await delay(400);
            Object.assign(MockEmployeeData.employee.contactInfo, data);
            return { success: true, data: clone(MockEmployeeData.employee.contactInfo) };
        },

        /**
         * Update address information
         * @param {string} employeeId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async updateAddress(employeeId, data) {
            await delay(500);
            const addresses = MockEmployeeData.employee.addresses;
            const index = addresses.findIndex(a => a.addressType === data.addressType);
            if (index !== -1) {
                addresses[index] = { ...addresses[index], ...data };
            } else {
                addresses.push(data);
            }
            return { success: true, data: clone(addresses) };
        },

        /**
         * Get emergency contacts
         * @param {string} employeeId
         * @returns {Promise<array>}
         */
        async getEmergencyContacts(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.emergencyContacts || []);
        },

        /**
         * Add emergency contact (self-service)
         * @param {string} employeeId
         * @param {object} contact
         * @returns {Promise<object>}
         */
        async addEmergencyContact(employeeId, contact) {
            await delay(400);
            const newContact = {
                id: generateId(),
                ...contact
            };
            MockEmployeeData.employee.emergencyContacts.push(newContact);
            return { success: true, data: newContact };
        },

        /**
         * Update emergency contact
         * @param {string} employeeId
         * @param {string} contactId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async updateEmergencyContact(employeeId, contactId, data) {
            await delay(400);
            const contacts = MockEmployeeData.employee.emergencyContacts;
            const index = contacts.findIndex(c => c.id === contactId);
            if (index !== -1) {
                contacts[index] = { ...contacts[index], ...data };
                return { success: true, data: clone(contacts[index]) };
            }
            throw new Error('Contact not found');
        },

        /**
         * Delete emergency contact
         * @param {string} employeeId
         * @param {string} contactId
         * @returns {Promise<object>}
         */
        async deleteEmergencyContact(employeeId, contactId) {
            await delay(300);
            const contacts = MockEmployeeData.employee.emergencyContacts;
            const index = contacts.findIndex(c => c.id === contactId);
            if (index !== -1) {
                contacts.splice(index, 1);
                return { success: true };
            }
            throw new Error('Contact not found');
        },

        /**
         * Get dependents
         * @param {string} employeeId
         * @returns {Promise<array>}
         */
        async getDependents(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.dependents || []);
        },

        /**
         * Add dependent
         * @param {string} employeeId
         * @param {object} dependent
         * @returns {Promise<object>}
         */
        async addDependent(employeeId, dependent) {
            await delay(400);
            const newDependent = {
                id: generateId(),
                ...dependent
            };
            MockEmployeeData.employee.dependents.push(newDependent);
            return { success: true, data: newDependent };
        },

        /**
         * Update dependent
         * @param {string} employeeId
         * @param {string} dependentId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async updateDependent(employeeId, dependentId, data) {
            await delay(400);
            const dependents = MockEmployeeData.employee.dependents;
            const index = dependents.findIndex(d => d.id === dependentId);
            if (index !== -1) {
                dependents[index] = { ...dependents[index], ...data };
                return { success: true, data: clone(dependents[index]) };
            }
            throw new Error('Dependent not found');
        },

        /**
         * Delete dependent
         * @param {string} employeeId
         * @param {string} dependentId
         * @returns {Promise<object>}
         */
        async deleteDependent(employeeId, dependentId) {
            await delay(300);
            const dependents = MockEmployeeData.employee.dependents;
            const index = dependents.findIndex(d => d.id === dependentId);
            if (index !== -1) {
                dependents.splice(index, 1);
                return { success: true };
            }
            throw new Error('Dependent not found');
        },

        /**
         * Update work permit information
         * @param {string} employeeId
         * @param {object} workPermitData
         * @returns {Promise<object>}
         */
        async updateWorkPermit(employeeId, workPermitData) {
            await delay(1500);

            // Check if workflow approval is required
            const requiresApproval = WorkflowRules.requiresApproval('work_permit_change');

            if (requiresApproval) {
                // Submit workflow request
                const employee = MockEmployeeData.employee;
                const workflowRequest = await WorkflowEngine.submitRequest({
                    type: 'work_permit_change',
                    requestedBy: {
                        id: employee.employeeId,
                        name: `${employee.personalInfo.firstNameEn} ${employee.personalInfo.lastNameEn}`
                    },
                    changes: {
                        before: clone(employee.workPermit),
                        after: workPermitData
                    },
                    employee: employee
                });

                return {
                    success: true,
                    requiresApproval: true,
                    workflowId: workflowRequest.id,
                    message: i18n.isThai()
                        ? 'ส่งคำขอเรียบร้อยแล้ว รอการอนุมัติ'
                        : 'Request submitted successfully, pending approval'
                };
            }

            // Direct update without approval
            MockEmployeeData.employee.workPermit = { ...MockEmployeeData.employee.workPermit, ...workPermitData };
            return { success: true, data: clone(MockEmployeeData.employee.workPermit) };
        },

        /**
         * Upload work permit document
         * @param {string} employeeId
         * @param {File} file
         * @returns {Promise<object>}
         */
        async uploadPermitDocument(employeeId, file) {
            await delay(1000);
            // Mock file upload by generating a fake URL
            const mockUrl = `/uploads/permits/${employeeId}_${Date.now()}.pdf`;
            return {
                success: true,
                url: mockUrl,
                fileName: file.name || 'work_permit.pdf'
            };
        },

        /**
         * Update advanced information
         * @param {string} employeeId
         * @param {object} advancedInfoData
         * @returns {Promise<object>}
         */
        async updateAdvancedInfo(employeeId, advancedInfoData) {
            await delay(1500);

            // Check if workflow approval is required
            const requiresApproval = WorkflowRules.requiresApproval('advanced_info_change');

            if (requiresApproval) {
                // Submit workflow request
                const employee = MockEmployeeData.employee;
                const workflowRequest = await WorkflowEngine.submitRequest({
                    type: 'advanced_info_change',
                    requestedBy: {
                        id: employee.employeeId,
                        name: `${employee.personalInfo.firstNameEn} ${employee.personalInfo.lastNameEn}`
                    },
                    changes: {
                        before: clone(employee.advancedInfo),
                        after: advancedInfoData
                    },
                    employee: employee
                });

                return {
                    success: true,
                    requiresApproval: true,
                    workflowId: workflowRequest.id,
                    message: i18n.isThai()
                        ? 'ส่งคำขอเรียบร้อยแล้ว รอการอนุมัติ'
                        : 'Request submitted successfully, pending approval'
                };
            }

            // Direct update without approval (for HR Manager)
            MockEmployeeData.employee.advancedInfo = { ...MockEmployeeData.employee.advancedInfo, ...advancedInfoData };
            return { success: true, data: clone(MockEmployeeData.employee.advancedInfo) };
        },

        /**
         * Get employment information
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getEmploymentInfo(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.employmentInfo);
        },

        /**
         * Get compensation information
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getCompensation(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.compensation);
        },

        /**
         * Get benefits
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getBenefits(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.benefits);
        },

        /**
         * Get organization chart
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getOrgChart(employeeId) {
            await delay();
            return clone(MockEmployeeData.employee.orgChart);
        },

        /**
         * Get payslips list
         * @param {string} employeeId
         * @param {object} options
         * @returns {Promise<array>}
         */
        async getPayslips(employeeId, options = {}) {
            await delay();
            return clone(MockEmployeeData.employee.payslips || []);
        },

        /**
         * Download payslip
         * @param {string} employeeId
         * @param {string} payslipId
         * @returns {Promise<Blob>}
         */
        async downloadPayslip(employeeId, payslipId) {
            await delay(1000);
            // Return mock blob
            return new Blob(['Mock payslip content'], { type: 'application/pdf' });
        },

        /**
         * Download E-Letter
         * @param {string} employeeId
         * @param {string} letterId
         * @returns {Promise<Blob>}
         */
        async downloadELetter(employeeId, letterId) {
            await delay(1000);
            return new Blob(['Mock E-Letter content'], { type: 'application/pdf' });
        },

        /**
         * Download Certificate
         * @param {string} employeeId
         * @param {string} courseId
         * @returns {Promise<Blob>}
         */
        async downloadCertificate(employeeId, courseId) {
            await delay(1000);
            return new Blob(['Mock certificate content'], { type: 'application/pdf' });
        },

        /**
         * Download OHS Document
         * @param {string} employeeId
         * @param {string} docId
         * @returns {Promise<Blob>}
         */
        async downloadOHSDocument(employeeId, docId) {
            await delay(1000);
            return new Blob(['Mock OHS document content'], { type: 'application/pdf' });
        },

        /**
         * Download Individual Document
         * @param {string} employeeId
         * @param {string} docId
         * @returns {Promise<Blob>}
         */
        async downloadIndividualDocument(employeeId, docId) {
            await delay(1000);
            return new Blob(['Mock individual document content'], { type: 'application/pdf' });
        },

        /**
         * Download Tax Document
         * @param {string} employeeId - The employee ID
         * @param {string} taxDocId - The tax document ID
         * @returns {Promise<Blob>}
         */
        async downloadTaxDocument(employeeId, taxDocId) {
            await delay(1000);
            return new Blob(['Mock tax document content'], { type: 'application/pdf' });
        },

        /**
         * Get change history
         * @param {string} employeeId
         * @param {string} section
         * @param {object} options
         * @returns {Promise<array>}
         */
        async getHistory(employeeId, section, options = {}) {
            await delay();
            return clone(MockEmployeeData.employee.history?.[section] || []);
        },

        /**
         * Submit workflow request
         * @param {object} request
         * @returns {Promise<object>}
         */
        async submitWorkflowRequest(request) {
            await delay(500);
            const newRequest = {
                id: generateId(),
                status: 'pending',
                submittedAt: new Date().toISOString(),
                ...request
            };
            MockWorkflowData.requests.push(newRequest);
            return { success: true, data: newRequest };
        },

        /**
         * Get pending workflows
         * @param {string} userId
         * @param {string} type - 'forApproval' | 'sentBack' | 'approved' | 'reassigned'
         * @returns {Promise<array>}
         */
        async getPendingWorkflows(userId, type = 'forApproval') {
            await delay();
            return clone(MockWorkflowData[type] || []);
        },

        /**
         * Approve workflow request
         * @param {string} requestId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async approveWorkflow(requestId, data = {}) {
            await delay(500);
            const request = MockWorkflowData.requests.find(r => r.id === requestId);
            if (request) {
                request.status = 'approved';
                request.approvedAt = new Date().toISOString();
                request.approverComments = data.comments;
                return { success: true, data: clone(request) };
            }
            throw new Error('Request not found');
        },

        /**
         * Reject workflow request
         * @param {string} requestId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async rejectWorkflow(requestId, data = {}) {
            await delay(500);
            const request = MockWorkflowData.requests.find(r => r.id === requestId);
            if (request) {
                request.status = 'rejected';
                request.rejectedAt = new Date().toISOString();
                request.rejectionReason = data.reason;
                return { success: true, data: clone(request) };
            }
            throw new Error('Request not found');
        },

        /**
         * Send back workflow request
         * @param {string} requestId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async sendBackWorkflow(requestId, data = {}) {
            await delay(500);
            const request = MockWorkflowData.requests.find(r => r.id === requestId);
            if (request) {
                request.status = 'sentBack';
                request.sentBackAt = new Date().toISOString();
                request.sendBackReason = data.reason;
                return { success: true, data: clone(request) };
            }
            throw new Error('Request not found');
        },

        /**
         * Get notifications
         * @param {string} userId
         * @returns {Promise<array>}
         */
        async getNotifications(userId) {
            await delay(200);
            return clone(MockWorkflowData.notifications || []);
        },

        /**
         * Mark notification as read
         * @param {string} notificationId
         * @returns {Promise<object>}
         */
        async markNotificationRead(notificationId) {
            await delay(100);
            const notification = MockWorkflowData.notifications.find(n => n.id === notificationId);
            if (notification) {
                notification.read = true;
                return { success: true };
            }
            throw new Error('Notification not found');
        },

        /**
         * Get lookup data
         * @param {string} type
         * @returns {Promise<array>}
         */
        async getLookup(type) {
            await delay(100);
            return clone(MockLookupData[type] || []);
        },

        /**
         * Search employees
         * @param {string} query
         * @returns {Promise<array>}
         */
        async searchEmployees(query) {
            await delay(300);
            // Return mock search results
            return [clone(MockEmployeeData.employee)];
        },

        /**
         * Get team members (for managers)
         * @param {string} managerId
         * @returns {Promise<array>}
         */
        async getTeamMembers(managerId) {
            await delay();
            return clone(MockEmployeeData.teamMembers || []);
        }
    };

    // Define which methods should have retry logic (read operations only)
    const retryableMethods = [
        'getEmployee',
        'getCurrentUser',
        'getEmployment',
        'getCompensation',
        'getPayslips',
        'getTaxDocuments',
        'getBenefits',
        'getProfileDetails',
        'getScorecard',
        'getWorkflows',
        'getNotifications',
        'getLookup',
        'searchEmployees',
        'getTeamMembers'
    ];

    // Public API - wrap all methods with loading state management and retry logic
    const publicAPI = {};
    Object.keys(internalAPI).forEach(key => {
        // Apply retry logic to read operations
        if (retryableMethods.includes(key)) {
            publicAPI[key] = withLoading(withRetry(internalAPI[key]));
        } else {
            // Don't retry write operations to prevent duplicate submissions
            publicAPI[key] = withLoading(internalAPI[key]);
        }
    });

    // Expose session management functions
    publicAPI.initializeSession = initializeSession;
    publicAPI.updateSessionActivity = updateSessionActivity;
    publicAPI.checkSessionTimeout = checkSessionTimeout;

    return publicAPI;
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}

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
         * Get payslips list (basic)
         * @param {string} employeeId
         * @param {object} options
         * @returns {Promise<array>}
         */
        async getPayslips(employeeId, options = {}) {
            await delay();
            return clone(MockEmployeeData.employee.payslips || []);
        },

        /**
         * Get detailed payslips list
         * @param {string} employeeId
         * @param {number} year - Optional year filter
         * @returns {Promise<array>}
         */
        async getPayslipList(employeeId, year = null) {
            await delay();
            let payslips = clone(MockEmployeeData.employee.detailedPayslips || []);

            // Filter by year if specified
            if (year && year !== 'all') {
                payslips = payslips.filter(p => p.period.year === parseInt(year));
            }

            // Sort by date descending
            payslips.sort((a, b) => {
                const dateA = new Date(a.payDate);
                const dateB = new Date(b.payDate);
                return dateB - dateA;
            });

            return payslips;
        },

        /**
         * Get payslip detail
         * @param {string} employeeId
         * @param {string} payslipId
         * @returns {Promise<object>}
         */
        async getPayslipDetail(employeeId, payslipId) {
            await delay();
            const payslips = MockEmployeeData.employee.detailedPayslips || [];
            const payslip = payslips.find(p => p.id === payslipId);

            if (!payslip) {
                throw new Error('Payslip not found');
            }

            return clone(payslip);
        },

        /**
         * Get tax documents list
         * @param {string} employeeId
         * @param {number} year - Optional year filter
         * @returns {Promise<array>}
         */
        async getTaxDocuments(employeeId, year = null) {
            await delay();
            let documents = clone(MockEmployeeData.employee.taxDocuments || []);

            // Filter by year if specified
            if (year && year !== 'all') {
                documents = documents.filter(d => d.taxYear === parseInt(year));
            }

            // Sort by year descending, then by type
            documents.sort((a, b) => {
                if (b.taxYear !== a.taxYear) {
                    return b.taxYear - a.taxYear;
                }
                return a.type.localeCompare(b.type);
            });

            return documents;
        },

        /**
         * Download payslip PDF
         * @param {string} employeeId
         * @param {string} payslipId
         * @returns {Promise<Blob>}
         */
        async downloadPayslipPdf(employeeId, payslipId) {
            await delay(1000);

            // Log document access
            await this.logDocumentAccess(employeeId, 'payslip', payslipId, 'download');

            // Return mock blob
            return new Blob(['Mock payslip PDF content'], { type: 'application/pdf' });
        },

        /**
         * Download tax document PDF
         * @param {string} employeeId
         * @param {string} docId
         * @returns {Promise<Blob>}
         */
        async downloadTaxDocumentPdf(employeeId, docId) {
            await delay(1000);

            // Log document access
            await this.logDocumentAccess(employeeId, 'tax_document', docId, 'download');

            // Return mock blob
            return new Blob(['Mock tax document PDF content'], { type: 'application/pdf' });
        },

        /**
         * Log document access for audit trail
         * @param {string} employeeId
         * @param {string} docType - 'payslip' | 'tax_document'
         * @param {string} docId
         * @param {string} action - 'view' | 'download'
         * @returns {Promise<object>}
         */
        async logDocumentAccess(employeeId, docType, docId, action) {
            // In production, this would log to an audit table
            const logEntry = {
                id: generateId(),
                employeeId: employeeId,
                documentType: docType,
                documentId: docId,
                action: action,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                ipAddress: '127.0.0.1' // Mock IP
            };

            console.log('[Audit] Document access logged:', logEntry);

            return { success: true, logId: logEntry.id };
        },

        /**
         * Download payslip (legacy)
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
        },

        /**
         * Get leave balances
         * @param {string} employeeId
         * @returns {Promise<object>}
         */
        async getLeaveBalances(employeeId) {
            await delay();
            return clone(MockEmployeeData.leaveBalances || {});
        },

        /**
         * Get leave requests
         * @param {string} employeeId
         * @returns {Promise<array>}
         */
        async getLeaveRequests(employeeId) {
            await delay();
            return clone(MockEmployeeData.leaveRequests || []);
        },

        /**
         * Get team leaves (for managers)
         * @param {string} managerId
         * @returns {Promise<array>}
         */
        async getTeamLeaves(managerId) {
            await delay();
            return clone(MockEmployeeData.teamLeaves || []);
        },

        /**
         * Submit leave request
         * @param {object} leaveData
         * @returns {Promise<object>}
         */
        async submitLeaveRequest(leaveData) {
            await delay(500);

            const employee = MockEmployeeData.employee;
            const leaveType = MockLookupData.leaveTypes.find(lt => lt.value === leaveData.type);

            // Create new leave request
            const newRequest = {
                id: 'LR' + generateId().substring(0, 6).toUpperCase(),
                employeeId: employee.employeeId,
                type: leaveData.type,
                typeNameEn: leaveType?.labelEn || leaveData.type,
                typeNameTh: leaveType?.labelTh || leaveData.type,
                startDate: leaveData.startDate,
                endDate: leaveData.endDate,
                days: leaveData.days,
                halfDay: leaveData.halfDay || null,
                reason: leaveData.reason,
                reasonTh: leaveData.reason,
                substitutePersonId: leaveData.substitutePerson || null,
                substitutePersonName: leaveData.substitutePerson
                    ? MockEmployeeData.teamMembers?.find(tm => tm.employeeId === leaveData.substitutePerson)?.name
                    : null,
                attachments: leaveData.attachment ? [leaveData.attachment] : [],
                status: 'pending',
                approvedBy: null,
                approvedByName: null,
                approvedDate: null,
                submittedAt: new Date().toISOString(),
                comments: null
            };

            // Add to mock data
            MockEmployeeData.leaveRequests.push(newRequest);

            // Update balance (pending)
            if (MockEmployeeData.leaveBalances[leaveData.type]) {
                MockEmployeeData.leaveBalances[leaveData.type].pending += leaveData.days;
            }

            // Create workflow request if approval is needed
            const requiresApproval = WorkflowRules.requiresApproval('leave_request');
            if (requiresApproval) {
                const workflowRequest = await WorkflowEngine.submitRequest({
                    type: 'leave_request',
                    requestedBy: {
                        id: employee.employeeId,
                        name: `${employee.personalInfo.firstNameEn} ${employee.personalInfo.lastNameEn}`,
                        nameTh: `${employee.personalInfo.firstNameTh} ${employee.personalInfo.lastNameTh}`,
                        photo: employee.personalInfo.photo
                    },
                    changes: {
                        section: leaveType?.labelEn || 'Leave Request',
                        newValues: {
                            'Start Date': leaveData.startDate,
                            'End Date': leaveData.endDate,
                            'Days': leaveData.days,
                            'Reason': leaveData.reason
                        }
                    },
                    effectiveDate: leaveData.startDate,
                    employee: employee,
                    relatedId: newRequest.id
                });

                newRequest.workflowId = workflowRequest.id;
            }

            return { success: true, data: clone(newRequest) };
        },

        /**
         * Cancel leave request
         * @param {string} requestId
         * @returns {Promise<object>}
         */
        async cancelLeaveRequest(requestId) {
            await delay(300);

            const requests = MockEmployeeData.leaveRequests;
            const index = requests.findIndex(r => r.id === requestId);

            if (index === -1) {
                throw new Error('Leave request not found');
            }

            const request = requests[index];

            // Can only cancel pending requests
            if (request.status !== 'pending') {
                throw new Error('Can only cancel pending requests');
            }

            // Update status
            request.status = 'cancelled';

            // Update balance (remove from pending)
            if (MockEmployeeData.leaveBalances[request.type]) {
                MockEmployeeData.leaveBalances[request.type].pending -= request.days;
            }

            return { success: true };
        },

        /**
         * Approve leave request (for managers)
         * @param {string} requestId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async approveLeaveRequest(requestId, data = {}) {
            await delay(500);

            const requests = MockEmployeeData.leaveRequests;
            const request = requests.find(r => r.id === requestId);

            if (!request) {
                throw new Error('Leave request not found');
            }

            const currentUser = MockEmployeeData.currentUser;

            request.status = 'approved';
            request.approvedBy = currentUser.employeeId;
            request.approvedByName = currentUser.username;
            request.approvedDate = new Date().toISOString();
            request.comments = data.comments;

            // Update balance (move from pending to used)
            if (MockEmployeeData.leaveBalances[request.type]) {
                const balance = MockEmployeeData.leaveBalances[request.type];
                balance.pending -= request.days;
                balance.used += request.days;
                balance.remaining -= request.days;
            }

            // Send notification to requester
            if (typeof WorkflowNotifications !== 'undefined') {
                WorkflowNotifications.notifyRequester({ requestedBy: { id: request.employeeId } }, 'approved');
            }

            return { success: true, data: clone(request) };
        },

        /**
         * Reject leave request (for managers)
         * @param {string} requestId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async rejectLeaveRequest(requestId, data = {}) {
            await delay(500);

            const requests = MockEmployeeData.leaveRequests;
            const request = requests.find(r => r.id === requestId);

            if (!request) {
                throw new Error('Leave request not found');
            }

            request.status = 'rejected';
            request.comments = data.reason;

            // Update balance (remove from pending)
            if (MockEmployeeData.leaveBalances[request.type]) {
                MockEmployeeData.leaveBalances[request.type].pending -= request.days;
            }

            // Send notification to requester
            if (typeof WorkflowNotifications !== 'undefined') {
                WorkflowNotifications.notifyRequester({ requestedBy: { id: request.employeeId } }, 'rejected');
            }

            return { success: true, data: clone(request) };
        },

        // ========================================
        // Employee Transfer API Methods
        // ========================================

        /**
         * Get pending transfers for an employee
         * @param {string} employeeId
         * @returns {Promise<array>}
         */
        async getPendingTransfers(employeeId) {
            await delay();
            // Return mock pending transfers
            return clone(MockEmployeeData.pendingTransfers || []);
        },

        /**
         * Get transfer history for an employee
         * @param {string} employeeId
         * @returns {Promise<array>}
         */
        async getTransferHistory(employeeId) {
            await delay();
            // Return mock transfer history
            return clone(MockEmployeeData.transferHistory || []);
        },

        /**
         * Submit a transfer request
         * @param {object} transferData
         * @returns {Promise<object>}
         */
        async submitTransferRequest(transferData) {
            await delay(500);

            const employee = MockEmployeeData.employee;

            // Get approvers based on transfer type
            const approvers = WorkflowRules.getTransferApprovers(transferData.type, {
                currentSupervisorId: employee.employmentInfo?.job?.supervisorId,
                currentSupervisorName: employee.employmentInfo?.job?.supervisorName,
                targetSupervisor: transferData.targetSupervisor
            });

            // Create new transfer request
            const newTransfer = {
                id: 'TR' + generateId().substring(0, 8).toUpperCase(),
                employeeId: employee.employeeId,
                type: transferData.type,
                status: 'pending',
                currentStep: 1,

                // Source info
                sourceCompany: transferData.sourceCompany || employee.employmentInfo?.organization?.company,
                sourceDepartment: transferData.sourceDepartment || employee.employmentInfo?.organization?.department,
                sourcePosition: transferData.sourcePosition || employee.employmentInfo?.organization?.position,
                sourceSupervisor: employee.employmentInfo?.job?.supervisorName,

                // Target info
                targetCompany: transferData.targetCompany || employee.employmentInfo?.organization?.company,
                targetBusinessUnit: transferData.targetBusinessUnit,
                targetDepartment: transferData.targetDepartment,
                targetPosition: transferData.targetPosition,
                targetSupervisor: transferData.targetSupervisor,
                targetWorkLocation: transferData.targetWorkLocation,

                // Dates
                effectiveDate: transferData.effectiveDate,
                endDate: transferData.endDate || null,

                // Details
                reason: transferData.reason,
                comments: transferData.comments,
                salaryChange: transferData.salaryChange || 'no_change',
                salaryAdjustmentAmount: transferData.salaryAdjustmentAmount,
                salaryAdjustmentReason: transferData.salaryAdjustmentReason,

                // Workflow
                approvers: approvers,
                requestedBy: {
                    id: employee.employeeId,
                    name: `${employee.personalInfo?.firstNameEn} ${employee.personalInfo?.lastNameEn}`,
                    nameTh: `${employee.personalInfo?.firstNameTh} ${employee.personalInfo?.lastNameTh}`,
                    photo: employee.photo
                },
                submittedAt: new Date().toISOString(),
                completedAt: null
            };

            // Initialize mock data arrays if not exist
            if (!MockEmployeeData.pendingTransfers) {
                MockEmployeeData.pendingTransfers = [];
            }

            // Add to pending transfers
            MockEmployeeData.pendingTransfers.push(newTransfer);

            // Send notification to first approver
            if (typeof WorkflowNotifications !== 'undefined') {
                WorkflowNotifications.notifyApprover(newTransfer);
            }

            return { success: true, data: clone(newTransfer) };
        },

        /**
         * Approve a transfer request
         * @param {string} transferId
         * @param {object} options - { comments }
         * @returns {Promise<object>}
         */
        async approveTransfer(transferId, options = {}) {
            await delay(500);

            const transfers = MockEmployeeData.pendingTransfers || [];
            const transfer = transfers.find(t => t.id === transferId);

            if (!transfer) {
                throw new Error('Transfer request not found');
            }

            const currentUser = MockEmployeeData.currentUser;

            // Update current approver
            const currentApprover = transfer.approvers[transfer.currentStep - 1];
            if (currentApprover) {
                currentApprover.status = 'approved';
                currentApprover.actionDate = new Date().toISOString();
                currentApprover.comments = options.comments;
                currentApprover.approvedBy = currentUser.employeeId;
            }

            // Check if more approvals needed
            if (transfer.currentStep < transfer.approvers.length) {
                transfer.currentStep++;
                // Notify next approver
                if (typeof WorkflowNotifications !== 'undefined') {
                    WorkflowNotifications.notifyApprover(transfer);
                }
            } else {
                // Fully approved
                transfer.status = 'approved';
                transfer.completedAt = new Date().toISOString();

                // Move to history
                if (!MockEmployeeData.transferHistory) {
                    MockEmployeeData.transferHistory = [];
                }
                MockEmployeeData.transferHistory.unshift(clone(transfer));

                // Remove from pending
                const index = transfers.indexOf(transfer);
                if (index > -1) {
                    transfers.splice(index, 1);
                }

                // Apply transfer changes to employee
                const employee = MockEmployeeData.employee;
                WorkflowRules.applyTransferChanges(transfer, employee);

                // Send post-transfer notifications
                const recipients = WorkflowRules.getPostTransferNotificationRecipients(transfer);
                console.log('Post-transfer notifications sent to:', recipients);

                // Notify requester
                if (typeof WorkflowNotifications !== 'undefined') {
                    WorkflowNotifications.notifyRequester(transfer, 'approved');
                }
            }

            return { success: true, data: clone(transfer) };
        },

        /**
         * Reject a transfer request
         * @param {string} transferId
         * @param {object} options - { reason }
         * @returns {Promise<object>}
         */
        async rejectTransfer(transferId, options = {}) {
            await delay(500);

            const transfers = MockEmployeeData.pendingTransfers || [];
            const transfer = transfers.find(t => t.id === transferId);

            if (!transfer) {
                throw new Error('Transfer request not found');
            }

            const currentUser = MockEmployeeData.currentUser;

            // Update current approver
            const currentApprover = transfer.approvers[transfer.currentStep - 1];
            if (currentApprover) {
                currentApprover.status = 'rejected';
                currentApprover.actionDate = new Date().toISOString();
                currentApprover.comments = options.reason;
                currentApprover.rejectedBy = currentUser.employeeId;
            }

            transfer.status = 'rejected';
            transfer.rejectedAt = new Date().toISOString();
            transfer.rejectionReason = options.reason;

            // Move to history
            if (!MockEmployeeData.transferHistory) {
                MockEmployeeData.transferHistory = [];
            }
            MockEmployeeData.transferHistory.unshift(clone(transfer));

            // Remove from pending
            const index = transfers.indexOf(transfer);
            if (index > -1) {
                transfers.splice(index, 1);
            }

            // Notify requester
            if (typeof WorkflowNotifications !== 'undefined') {
                WorkflowNotifications.notifyRequester(transfer, 'rejected');
            }

            return { success: true, data: clone(transfer) };
        },

        /**
         * Get transfer details by ID
         * @param {string} transferId
         * @returns {Promise<object>}
         */
        async getTransferDetails(transferId) {
            await delay();

            // Check pending transfers first
            const pending = (MockEmployeeData.pendingTransfers || []).find(t => t.id === transferId);
            if (pending) return clone(pending);

            // Check history
            const history = (MockEmployeeData.transferHistory || []).find(t => t.id === transferId);
            if (history) return clone(history);

            throw new Error('Transfer request not found');
        },

        // ========================================
        // Performance & Goal Management API Methods
        // ========================================

        /**
         * Get G-BEST competencies
         * @returns {Promise<array>}
         */
        async getGbestCompetencies() {
            await delay();
            return clone(MockEmployeeData.gbestCompetencies || []);
        },

        /**
         * Get goals for an employee
         * @param {string} employeeId
         * @param {object} filters - Optional filters { period, category, status }
         * @returns {Promise<array>}
         */
        async getGoals(employeeId, filters = {}) {
            await delay();
            let goals = clone(MockEmployeeData.goals || []).filter(g => g.employeeId === employeeId);

            // Apply filters
            if (filters.period && filters.period !== 'all') {
                goals = goals.filter(g => g.period === filters.period);
            }
            if (filters.category && filters.category !== 'all') {
                goals = goals.filter(g => g.category === filters.category);
            }
            if (filters.status && filters.status !== 'all') {
                goals = goals.filter(g => g.status === filters.status);
            }
            if (filters.year && filters.year !== 'all') {
                goals = goals.filter(g => g.period.includes(filters.year));
            }

            // Sort by category order: KPI, G-BEST, Development, then by weight descending
            const categoryOrder = { kpi: 1, gbest: 2, development: 3 };
            goals.sort((a, b) => {
                const catDiff = (categoryOrder[a.category] || 99) - (categoryOrder[b.category] || 99);
                if (catDiff !== 0) return catDiff;
                return b.weight - a.weight;
            });

            return goals;
        },

        /**
         * Get a single goal by ID
         * @param {string} goalId
         * @returns {Promise<object>}
         */
        async getGoal(goalId) {
            await delay();
            const goal = MockEmployeeData.goals?.find(g => g.id === goalId);
            if (!goal) {
                throw new Error('Goal not found');
            }
            return clone(goal);
        },

        /**
         * Create a new goal
         * @param {object} goalData
         * @returns {Promise<object>}
         */
        async createGoal(goalData) {
            await delay(500);

            const employee = MockEmployeeData.employee;
            const newGoal = {
                id: 'GOAL' + generateId().substring(0, 6).toUpperCase(),
                employeeId: employee.employeeId,
                name: goalData.name,
                description: goalData.description,
                category: goalData.category,
                gbestCode: goalData.gbestCode || null,
                metric: goalData.metric,
                target: goalData.target,
                actual: 0,
                weight: goalData.weight,
                period: goalData.period,
                startDate: goalData.startDate,
                endDate: goalData.endDate,
                status: 'draft',
                progress: 0,
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
                createdBy: employee.employeeId,
                approvedBy: null,
                approvedDate: null,
                signedOffEmployee: false,
                signedOffEmployeeDate: null,
                signedOffManager: false,
                signedOffManagerDate: null,
                reviewComments: null
            };

            MockEmployeeData.goals.push(newGoal);

            // Log goal creation
            MockEmployeeData.goalApprovals.push({
                id: 'GA' + generateId().substring(0, 6).toUpperCase(),
                goalId: newGoal.id,
                action: 'created',
                fromStatus: null,
                toStatus: 'draft',
                performedBy: employee.employeeId,
                performedByName: `${employee.personalInfo.firstNameEn} ${employee.personalInfo.lastNameEn}`,
                performedAt: new Date().toISOString(),
                comments: null
            });

            return { success: true, data: clone(newGoal) };
        },

        /**
         * Update an existing goal
         * @param {string} goalId
         * @param {object} goalData
         * @returns {Promise<object>}
         */
        async updateGoal(goalId, goalData) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const index = goals.findIndex(g => g.id === goalId);

            if (index === -1) {
                throw new Error('Goal not found');
            }

            const goal = goals[index];

            // Can only update draft or sent_back goals
            if (!['draft', 'sent_back'].includes(goal.status)) {
                throw new Error('Can only edit goals in draft or sent back status');
            }

            // Update allowed fields
            const updatableFields = ['name', 'description', 'category', 'gbestCode', 'metric', 'target', 'weight', 'period', 'startDate', 'endDate'];
            updatableFields.forEach(field => {
                if (goalData[field] !== undefined) {
                    goal[field] = goalData[field];
                }
            });
            goal.updatedAt = new Date().toISOString().split('T')[0];

            return { success: true, data: clone(goal) };
        },

        /**
         * Delete a goal
         * @param {string} goalId
         * @returns {Promise<object>}
         */
        async deleteGoal(goalId) {
            await delay(300);

            const goals = MockEmployeeData.goals;
            const index = goals.findIndex(g => g.id === goalId);

            if (index === -1) {
                throw new Error('Goal not found');
            }

            const goal = goals[index];

            // Can only delete draft goals
            if (goal.status !== 'draft') {
                throw new Error('Can only delete goals in draft status');
            }

            goals.splice(index, 1);

            return { success: true };
        },

        /**
         * Submit goal for review
         * @param {string} goalId
         * @returns {Promise<object>}
         */
        async submitGoalForReview(goalId) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const goal = goals.find(g => g.id === goalId);

            if (!goal) {
                throw new Error('Goal not found');
            }

            if (!['draft', 'sent_back'].includes(goal.status)) {
                throw new Error('Can only submit draft or sent back goals');
            }

            const previousStatus = goal.status;
            goal.status = 'submitted';
            goal.updatedAt = new Date().toISOString().split('T')[0];

            const employee = MockEmployeeData.employee;

            // Log submission
            MockEmployeeData.goalApprovals.push({
                id: 'GA' + generateId().substring(0, 6).toUpperCase(),
                goalId: goal.id,
                action: 'submitted',
                fromStatus: previousStatus,
                toStatus: 'submitted',
                performedBy: employee.employeeId,
                performedByName: `${employee.personalInfo.firstNameEn} ${employee.personalInfo.lastNameEn}`,
                performedAt: new Date().toISOString(),
                comments: null
            });

            return { success: true, data: clone(goal) };
        },

        /**
         * Approve a goal (for managers)
         * @param {string} goalId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async approveGoal(goalId, data = {}) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const goal = goals.find(g => g.id === goalId);

            if (!goal) {
                throw new Error('Goal not found');
            }

            if (goal.status !== 'submitted') {
                throw new Error('Can only approve submitted goals');
            }

            goal.status = 'approved';
            goal.approvedBy = MockEmployeeData.currentUser.employeeId;
            goal.approvedDate = new Date().toISOString().split('T')[0];
            goal.reviewComments = data.comments || null;
            goal.updatedAt = new Date().toISOString().split('T')[0];

            // Log approval
            MockEmployeeData.goalApprovals.push({
                id: 'GA' + generateId().substring(0, 6).toUpperCase(),
                goalId: goal.id,
                action: 'approved',
                fromStatus: 'submitted',
                toStatus: 'approved',
                performedBy: MockEmployeeData.currentUser.employeeId,
                performedByName: MockEmployeeData.currentUser.username,
                performedAt: new Date().toISOString(),
                comments: data.comments || null
            });

            return { success: true, data: clone(goal) };
        },

        /**
         * Send back a goal for revision (for managers)
         * @param {string} goalId
         * @param {object} data
         * @returns {Promise<object>}
         */
        async sendBackGoal(goalId, data = {}) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const goal = goals.find(g => g.id === goalId);

            if (!goal) {
                throw new Error('Goal not found');
            }

            if (goal.status !== 'submitted') {
                throw new Error('Can only send back submitted goals');
            }

            goal.status = 'sent_back';
            goal.reviewComments = data.reason || data.comments || null;
            goal.updatedAt = new Date().toISOString().split('T')[0];

            // Log send back
            MockEmployeeData.goalApprovals.push({
                id: 'GA' + generateId().substring(0, 6).toUpperCase(),
                goalId: goal.id,
                action: 'sent_back',
                fromStatus: 'submitted',
                toStatus: 'sent_back',
                performedBy: MockEmployeeData.currentUser.employeeId,
                performedByName: MockEmployeeData.currentUser.username,
                performedAt: new Date().toISOString(),
                comments: data.reason || data.comments || null
            });

            return { success: true, data: clone(goal) };
        },

        /**
         * Sign off goal (employee or manager)
         * @param {string} goalId
         * @param {string} role - 'employee' or 'manager'
         * @returns {Promise<object>}
         */
        async signOffGoal(goalId, role) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const goal = goals.find(g => g.id === goalId);

            if (!goal) {
                throw new Error('Goal not found');
            }

            if (goal.status !== 'approved') {
                throw new Error('Can only sign off approved goals');
            }

            const currentUser = MockEmployeeData.currentUser;

            if (role === 'employee') {
                goal.signedOffEmployee = true;
                goal.signedOffEmployeeDate = new Date().toISOString().split('T')[0];
            } else if (role === 'manager') {
                goal.signedOffManager = true;
                goal.signedOffManagerDate = new Date().toISOString().split('T')[0];
            }

            // If both signed off, move to in_progress
            if (goal.signedOffEmployee && goal.signedOffManager) {
                goal.status = 'in_progress';
            }

            goal.updatedAt = new Date().toISOString().split('T')[0];

            // Log sign-off
            MockEmployeeData.goalApprovals.push({
                id: 'GA' + generateId().substring(0, 6).toUpperCase(),
                goalId: goal.id,
                action: role === 'employee' ? 'signoff_employee' : 'signoff_manager',
                fromStatus: 'approved',
                toStatus: goal.status,
                performedBy: currentUser.employeeId,
                performedByName: currentUser.username,
                performedAt: new Date().toISOString(),
                comments: null
            });

            return { success: true, data: clone(goal) };
        },

        /**
         * Update goal progress
         * @param {string} goalId
         * @param {object} progressData - { actual, comment, evidence }
         * @returns {Promise<object>}
         */
        async updateGoalProgress(goalId, progressData) {
            await delay(500);

            const goals = MockEmployeeData.goals;
            const goal = goals.find(g => g.id === goalId);

            if (!goal) {
                throw new Error('Goal not found');
            }

            if (!['in_progress', 'approved'].includes(goal.status)) {
                throw new Error('Can only update progress for in-progress or approved goals');
            }

            const previousActual = goal.actual;
            const previousProgress = goal.progress;

            // Update actual value
            goal.actual = progressData.actual;

            // Calculate new progress based on metric type
            let newProgress = 0;
            switch (goal.metric) {
                case 'percentage':
                    newProgress = Math.min(100, Math.round((goal.actual / goal.target) * 100));
                    break;
                case 'number':
                    newProgress = Math.min(100, Math.round((goal.actual / goal.target) * 100));
                    break;
                case 'yesno':
                    newProgress = goal.actual === 1 ? 100 : 0;
                    break;
                case 'rating':
                    newProgress = Math.min(100, Math.round((goal.actual / goal.target) * 100));
                    break;
                default:
                    newProgress = Math.min(100, Math.round((goal.actual / goal.target) * 100));
            }
            goal.progress = newProgress;

            // Mark as completed if 100%
            if (newProgress >= 100) {
                goal.status = 'completed';
            }

            goal.updatedAt = new Date().toISOString().split('T')[0];

            const employee = MockEmployeeData.employee;

            // Log progress update
            MockEmployeeData.goalHistory.push({
                id: 'GH' + generateId().substring(0, 6).toUpperCase(),
                goalId: goal.id,
                employeeId: employee.employeeId,
                previousActual: previousActual,
                newActual: goal.actual,
                previousProgress: previousProgress,
                newProgress: newProgress,
                comment: progressData.comment || null,
                commentTh: progressData.commentTh || progressData.comment || null,
                evidence: progressData.evidence || null,
                createdAt: new Date().toISOString(),
                createdBy: employee.employeeId
            });

            return { success: true, data: clone(goal) };
        },

        /**
         * Get goal history (progress updates)
         * @param {string} goalId
         * @returns {Promise<array>}
         */
        async getGoalHistory(goalId) {
            await delay();
            const history = (MockEmployeeData.goalHistory || []).filter(h => h.goalId === goalId);
            // Sort by date descending
            history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            return clone(history);
        },

        /**
         * Get goal approval history (workflow)
         * @param {string} goalId
         * @returns {Promise<array>}
         */
        async getGoalApprovals(goalId) {
            await delay();
            const approvals = (MockEmployeeData.goalApprovals || []).filter(a => a.goalId === goalId);
            // Sort by date ascending (chronological)
            approvals.sort((a, b) => new Date(a.performedAt) - new Date(b.performedAt));
            return clone(approvals);
        },

        /**
         * Calculate total weight for a period
         * @param {string} employeeId
         * @param {string} period
         * @returns {Promise<object>}
         */
        async calculateGoalWeights(employeeId, period) {
            await delay(100);

            const goals = (MockEmployeeData.goals || []).filter(g =>
                g.employeeId === employeeId &&
                g.period === period &&
                !['draft'].includes(g.status) // Exclude draft goals from weight calculation
            );

            const total = goals.reduce((sum, g) => sum + (g.weight || 0), 0);
            const byCategory = {
                kpi: goals.filter(g => g.category === 'kpi').reduce((sum, g) => sum + (g.weight || 0), 0),
                gbest: goals.filter(g => g.category === 'gbest').reduce((sum, g) => sum + (g.weight || 0), 0),
                development: goals.filter(g => g.category === 'development').reduce((sum, g) => sum + (g.weight || 0), 0)
            };

            return {
                total,
                remaining: 100 - total,
                isValid: total === 100,
                byCategory
            };
        },

        /**
         * Get overall goal progress for a period
         * @param {string} employeeId
         * @param {string} period
         * @returns {Promise<object>}
         */
        async getOverallProgress(employeeId, period) {
            await delay(100);

            const goals = (MockEmployeeData.goals || []).filter(g =>
                g.employeeId === employeeId &&
                g.period === period &&
                ['in_progress', 'completed'].includes(g.status)
            );

            if (goals.length === 0) {
                return { overall: 0, byCategory: {} };
            }

            // Weighted average progress
            let totalWeight = 0;
            let weightedProgress = 0;
            const byCategory = { kpi: 0, gbest: 0, development: 0 };
            const categoryWeights = { kpi: 0, gbest: 0, development: 0 };

            goals.forEach(g => {
                const weight = g.weight || 0;
                totalWeight += weight;
                weightedProgress += (g.progress || 0) * weight;
                byCategory[g.category] += (g.progress || 0) * weight;
                categoryWeights[g.category] += weight;
            });

            // Calculate category averages
            Object.keys(byCategory).forEach(cat => {
                if (categoryWeights[cat] > 0) {
                    byCategory[cat] = Math.round(byCategory[cat] / categoryWeights[cat]);
                }
            });

            return {
                overall: totalWeight > 0 ? Math.round(weightedProgress / totalWeight) : 0,
                byCategory,
                goalsCount: goals.length,
                completedCount: goals.filter(g => g.status === 'completed').length
            };
        },

        // ========================================
        // Performance Evaluation API Methods
        // ========================================

        /**
         * Get evaluation weights configuration
         * @returns {Promise<object>}
         */
        async getEvaluationWeights() {
            await delay(100);
            return clone(MockEmployeeData.evaluationWeights || {
                kpi: 50,
                gbest: 30,
                attendance: 10,
                manager: 10
            });
        },

        /**
         * Get attendance data for an employee
         * @param {string} employeeId
         * @param {string} period
         * @returns {Promise<object>}
         */
        async getAttendanceData(employeeId, period) {
            await delay();
            return clone(MockEmployeeData.attendanceData || {
                workDays: 220,
                attendedDays: 215,
                lateDays: 3,
                absentDays: 2,
                attendanceScore: 4.5,
                period: period
            });
        },

        /**
         * Get evaluations for an employee
         * @param {string} employeeId
         * @param {object} filters - Optional filters { period, status }
         * @returns {Promise<array>}
         */
        async getEvaluations(employeeId, filters = {}) {
            await delay();
            let evaluations = clone(MockEmployeeData.evaluations || []).filter(e => e.employeeId === employeeId);

            // Apply filters
            if (filters.period && filters.period !== 'all') {
                evaluations = evaluations.filter(e => e.period === filters.period);
            }
            if (filters.status && filters.status !== 'all') {
                evaluations = evaluations.filter(e => e.status === filters.status);
            }

            // Sort by period descending
            evaluations.sort((a, b) => b.period.localeCompare(a.period));

            return evaluations;
        },

        /**
         * Get a single evaluation by ID
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async getEvaluation(evaluationId) {
            await delay();
            const evaluation = MockEmployeeData.evaluations?.find(e => e.id === evaluationId);
            if (!evaluation) {
                throw new Error('Evaluation not found');
            }
            return clone(evaluation);
        },

        /**
         * Get current/active evaluation for a period
         * @param {string} employeeId
         * @param {string} period
         * @returns {Promise<object|null>}
         */
        async getCurrentEvaluation(employeeId, period) {
            await delay();
            const evaluation = MockEmployeeData.evaluations?.find(e =>
                e.employeeId === employeeId && e.period === period
            );
            return evaluation ? clone(evaluation) : null;
        },

        /**
         * Create a new evaluation
         * @param {object} evaluationData
         * @returns {Promise<object>}
         */
        async createEvaluation(evaluationData) {
            await delay(500);

            const employee = MockEmployeeData.employee;
            const newEvaluation = {
                id: 'EVAL' + generateId().substring(0, 6).toUpperCase(),
                employeeId: employee.employeeId,
                period: evaluationData.period,
                periodLabel: evaluationData.periodLabel || {
                    en: `Annual Review ${evaluationData.period}`,
                    th: `การประเมินประจำปี ${parseInt(evaluationData.period) + 543}`
                },
                status: 'self_assessment',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                kpiScore: null,
                gbestRatings: {
                    selfAssessment: null,
                    managerAssessment: null,
                    averageScore: null
                },
                attendanceScore: null,
                managerAssessment: null,
                strengths: null,
                areasForImprovement: null,
                finalRating: null,
                workflow: {
                    selfAssessmentDate: null,
                    selfAssessmentBy: null,
                    managerReviewDate: null,
                    managerReviewBy: null,
                    calibrationDate: null,
                    calibrationBy: null,
                    confirmationDate: null,
                    confirmationBy: null,
                    acknowledgmentDate: null,
                    acknowledgmentBy: null
                }
            };

            MockEmployeeData.evaluations.push(newEvaluation);
            return { success: true, data: clone(newEvaluation) };
        },

        /**
         * Save self-assessment for G-BEST competencies
         * @param {string} evaluationId
         * @param {object} gbestData - { G: { score, comment }, B: {...}, ... }
         * @returns {Promise<object>}
         */
        async saveSelfAssessment(evaluationId, gbestData) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'self_assessment') {
                throw new Error('Can only save self-assessment in self_assessment status');
            }

            evaluation.gbestRatings.selfAssessment = gbestData;
            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Submit self-assessment (transition to manager_review)
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async submitSelfAssessment(evaluationId) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'self_assessment') {
                throw new Error('Can only submit from self_assessment status');
            }

            if (!evaluation.gbestRatings?.selfAssessment) {
                throw new Error('Please complete self-assessment before submitting');
            }

            const employee = MockEmployeeData.employee;
            evaluation.status = 'manager_review';
            evaluation.workflow.selfAssessmentDate = new Date().toISOString();
            evaluation.workflow.selfAssessmentBy = employee.employeeId;
            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Save manager assessment
         * @param {string} evaluationId
         * @param {object} assessmentData - { gbestRatings, managerScore, comment, strengths, areasForImprovement }
         * @returns {Promise<object>}
         */
        async saveManagerAssessment(evaluationId, assessmentData) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'manager_review') {
                throw new Error('Can only save manager assessment in manager_review status');
            }

            // Update G-BEST manager ratings
            if (assessmentData.gbestRatings) {
                evaluation.gbestRatings.managerAssessment = assessmentData.gbestRatings;

                // Calculate average G-BEST score
                const selfRatings = Object.values(evaluation.gbestRatings.selfAssessment || {}).map(r => r.score);
                const managerRatings = Object.values(assessmentData.gbestRatings).map(r => r.score);
                const allRatings = [...selfRatings, ...managerRatings];
                evaluation.gbestRatings.averageScore = allRatings.length > 0
                    ? parseFloat((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1))
                    : null;
            }

            // Update manager overall assessment
            if (assessmentData.managerScore !== undefined) {
                evaluation.managerAssessment = {
                    score: assessmentData.managerScore,
                    comment: assessmentData.comment || null
                };
            }

            // Update strengths and areas for improvement
            if (assessmentData.strengths) {
                evaluation.strengths = assessmentData.strengths;
            }
            if (assessmentData.areasForImprovement) {
                evaluation.areasForImprovement = assessmentData.areasForImprovement;
            }

            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Submit manager assessment (transition to calibration)
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async submitManagerAssessment(evaluationId) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'manager_review') {
                throw new Error('Can only submit from manager_review status');
            }

            if (!evaluation.gbestRatings?.managerAssessment || !evaluation.managerAssessment) {
                throw new Error('Please complete manager assessment before submitting');
            }

            const currentUser = MockEmployeeData.currentUser;
            evaluation.status = 'calibration';
            evaluation.workflow.managerReviewDate = new Date().toISOString();
            evaluation.workflow.managerReviewBy = currentUser.employeeId;
            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Submit calibration (transition to confirmed)
         * @param {string} evaluationId
         * @param {object} calibrationData - { adjustments, comment }
         * @returns {Promise<object>}
         */
        async submitCalibration(evaluationId, calibrationData = {}) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'calibration') {
                throw new Error('Can only submit calibration from calibration status');
            }

            const currentUser = MockEmployeeData.currentUser;
            evaluation.status = 'confirmed';
            evaluation.workflow.calibrationDate = new Date().toISOString();
            evaluation.workflow.calibrationBy = currentUser.employeeId;
            evaluation.updatedAt = new Date().toISOString();

            // Calculate and set final rating
            await this.calculateFinalRating(evaluationId);

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Confirm evaluation (transition to confirmed)
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async confirmEvaluation(evaluationId) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'calibration') {
                throw new Error('Can only confirm from calibration status');
            }

            const currentUser = MockEmployeeData.currentUser;
            evaluation.status = 'confirmed';
            evaluation.workflow.confirmationDate = new Date().toISOString();
            evaluation.workflow.confirmationBy = currentUser.employeeId;
            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Acknowledge evaluation (employee final acknowledgment)
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async acknowledgeEvaluation(evaluationId) {
            await delay(500);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            if (evaluation.status !== 'confirmed') {
                throw new Error('Can only acknowledge from confirmed status');
            }

            const employee = MockEmployeeData.employee;
            evaluation.status = 'acknowledged';
            evaluation.workflow.acknowledgmentDate = new Date().toISOString();
            evaluation.workflow.acknowledgmentBy = employee.employeeId;
            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation) };
        },

        /**
         * Calculate final rating based on all components
         * @param {string} evaluationId
         * @returns {Promise<object>}
         */
        async calculateFinalRating(evaluationId) {
            await delay(200);

            const evaluations = MockEmployeeData.evaluations;
            const evaluation = evaluations.find(e => e.id === evaluationId);

            if (!evaluation) {
                throw new Error('Evaluation not found');
            }

            const weights = MockEmployeeData.evaluationWeights || {
                kpi: 50,
                gbest: 30,
                attendance: 10,
                manager: 10
            };

            // Get KPI score from goals
            let kpiScore = 0;
            if (evaluation.kpiScore?.weightedScore) {
                kpiScore = evaluation.kpiScore.weightedScore;
            } else {
                // Calculate from goals
                const goals = (MockEmployeeData.goals || []).filter(g =>
                    g.employeeId === evaluation.employeeId &&
                    g.period.includes(evaluation.period)
                );
                if (goals.length > 0) {
                    let totalWeight = 0;
                    let weightedScore = 0;
                    goals.forEach(g => {
                        const weight = g.weight || 0;
                        // Convert progress (0-100) to rating (1-5)
                        const rating = Math.min(5, Math.max(1, Math.round((g.progress / 100) * 4 + 1)));
                        totalWeight += weight;
                        weightedScore += rating * weight;
                    });
                    kpiScore = totalWeight > 0 ? parseFloat((weightedScore / totalWeight).toFixed(1)) : 0;
                }
            }

            // Get G-BEST average score
            const gbestScore = evaluation.gbestRatings?.averageScore || 0;

            // Get attendance score
            const attendanceScore = evaluation.attendanceScore?.score || 0;

            // Get manager assessment score
            const managerScore = evaluation.managerAssessment?.score || 0;

            // Calculate weighted score (on 5-point scale)
            const breakdown = {
                kpi: { weight: weights.kpi, score: kpiScore, weighted: (kpiScore * weights.kpi / 100) * 20 },
                gbest: { weight: weights.gbest, score: gbestScore, weighted: (gbestScore * weights.gbest / 100) * 20 },
                attendance: { weight: weights.attendance, score: attendanceScore, weighted: (attendanceScore * weights.attendance / 100) * 20 },
                manager: { weight: weights.manager, score: managerScore, weighted: (managerScore * weights.manager / 100) * 20 }
            };

            const weightedScore = breakdown.kpi.weighted + breakdown.gbest.weighted + breakdown.attendance.weighted + breakdown.manager.weighted;

            // Determine rating (1-5) from weighted score
            let rating = 3;
            if (weightedScore >= 90) rating = 5;
            else if (weightedScore >= 75) rating = 4;
            else if (weightedScore >= 50) rating = 3;
            else if (weightedScore >= 25) rating = 2;
            else rating = 1;

            // Get rating labels
            const ratingLabels = {
                5: { en: 'Outstanding', th: 'ดีเด่น' },
                4: { en: 'Exceeds Expectations', th: 'ดีมาก' },
                3: { en: 'Meets Expectations', th: 'ดี' },
                2: { en: 'Below Expectations', th: 'ต้องปรับปรุง' },
                1: { en: 'Unsatisfactory', th: 'ไม่เป็นที่พอใจ' }
            };

            evaluation.finalRating = {
                weightedScore: parseFloat(weightedScore.toFixed(1)),
                rating: rating,
                ratingLabel: ratingLabels[rating],
                breakdown: breakdown,
                finalComment: evaluation.finalRating?.finalComment || null
            };

            evaluation.updatedAt = new Date().toISOString();

            return { success: true, data: clone(evaluation.finalRating) };
        },

        /**
         * Calculate KPI score from goals for an evaluation
         * @param {string} employeeId
         * @param {string} period
         * @returns {Promise<object>}
         */
        async calculateKpiScore(employeeId, period) {
            await delay(200);

            const goals = (MockEmployeeData.goals || []).filter(g =>
                g.employeeId === employeeId &&
                g.period.includes(period) &&
                g.category === 'kpi'
            );

            if (goals.length === 0) {
                return {
                    weightedScore: null,
                    totalGoals: 0,
                    completedGoals: 0,
                    averageProgress: 0,
                    details: []
                };
            }

            let totalWeight = 0;
            let weightedScore = 0;
            let totalProgress = 0;

            const details = goals.map(g => {
                const weight = g.weight || 0;
                // Convert progress to rating (1-5)
                const score = Math.min(5, Math.max(1, Math.round((g.progress / 100) * 4 + 1)));
                totalWeight += weight;
                weightedScore += score * weight;
                totalProgress += g.progress;

                return {
                    goalId: g.id,
                    name: g.name,
                    weight: weight,
                    progress: g.progress,
                    score: g.status === 'completed' ? score : null
                };
            });

            const avgScore = totalWeight > 0 ? parseFloat((weightedScore / totalWeight).toFixed(1)) : null;

            return {
                weightedScore: avgScore,
                totalGoals: goals.length,
                completedGoals: goals.filter(g => g.status === 'completed').length,
                averageProgress: goals.length > 0 ? Math.round(totalProgress / goals.length) : 0,
                details: details
            };
        },

        // =====================================
        // SHIFT MANAGEMENT APIs
        // =====================================

        /**
         * Get all work shifts
         * @returns {Promise<Array>}
         */
        async getShifts() {
            await delay();
            updateSessionActivity();

            // Return mock data
            return clone(MockShiftData.shifts || []);
        },

        /**
         * Get shift by ID
         * @param {string} shiftId
         * @returns {Promise<Object>}
         */
        async getShift(shiftId) {
            await delay();
            updateSessionActivity();

            const shift = MockShiftData.getShiftById(shiftId);
            if (!shift) {
                throw new Error('Shift not found');
            }
            return clone(shift);
        },

        /**
         * Create a new shift
         * @param {Object} shiftData
         * @returns {Promise<Object>}
         */
        async createShift(shiftData) {
            await delay(500);
            updateSessionActivity();

            const newShift = {
                id: 'shift_' + generateId(),
                ...shiftData,
                status: 'active',
                effectiveDate: new Date().toISOString().split('T')[0]
            };

            // In real implementation, this would save to database
            MockShiftData.shifts.push(newShift);
            return clone(newShift);
        },

        /**
         * Update an existing shift
         * @param {string} shiftId
         * @param {Object} shiftData
         * @returns {Promise<Object>}
         */
        async updateShift(shiftId, shiftData) {
            await delay(500);
            updateSessionActivity();

            const index = MockShiftData.shifts.findIndex(s => s.id === shiftId);
            if (index === -1) {
                throw new Error('Shift not found');
            }

            MockShiftData.shifts[index] = {
                ...MockShiftData.shifts[index],
                ...shiftData
            };

            return clone(MockShiftData.shifts[index]);
        },

        /**
         * Get shift assignments
         * @param {string} employeeId - Optional filter by employee
         * @returns {Promise<Array>}
         */
        async getShiftAssignments(employeeId = null) {
            await delay();
            updateSessionActivity();

            let assignments = MockShiftData.shiftAssignments || [];
            if (employeeId) {
                assignments = assignments.filter(a => a.employeeId === employeeId);
            }
            return clone(assignments);
        },

        /**
         * Update shift assignment
         * @param {string} assignmentId
         * @param {Object} assignmentData
         * @returns {Promise<Object>}
         */
        async updateShiftAssignment(assignmentId, assignmentData) {
            await delay(500);
            updateSessionActivity();

            const index = MockShiftData.shiftAssignments.findIndex(a => a.id === assignmentId);
            if (index === -1) {
                throw new Error('Assignment not found');
            }

            // Update assignment
            const shift = MockShiftData.getShiftById(assignmentData.shiftId);
            MockShiftData.shiftAssignments[index] = {
                ...MockShiftData.shiftAssignments[index],
                shiftId: assignmentData.shiftId,
                shiftCode: shift?.code || '',
                shiftName: shift?.nameEn || '',
                shiftNameTh: shift?.nameTh || '',
                effectiveStartDate: assignmentData.effectiveStartDate,
                effectiveEndDate: assignmentData.effectiveEndDate || null
            };

            return clone(MockShiftData.shiftAssignments[index]);
        },

        /**
         * Get shift calendar for a specific month
         * @param {number} year
         * @param {number} month
         * @returns {Promise<Object>}
         */
        async getShiftCalendar(year, month) {
            await delay();
            updateSessionActivity();

            // Return mock calendar data
            const calendar = MockShiftData.getShiftCalendarForMonth(year, month);
            return calendar ? clone(calendar) : {
                year,
                month,
                employees: []
            };
        }
    };

    // Define which methods should have retry logic (read operations only)
    const retryableMethods = [
        'getEmployee',
        'getCurrentUser',
        'getEmployment',
        'getCompensation',
        'getPayslips',
        'getPayslipList',
        'getPayslipDetail',
        'getTaxDocuments',
        'getBenefits',
        'getProfileDetails',
        'getScorecard',
        'getWorkflows',
        'getNotifications',
        'getLookup',
        'searchEmployees',
        'getTeamMembers',
        'getLeaveBalances',
        'getLeaveRequests',
        'getTeamLeaves',
        // Goal-related read operations
        'getGbestCompetencies',
        'getGoals',
        'getGoal',
        'getGoalHistory',
        'getGoalApprovals',
        'calculateGoalWeights',
        'getOverallProgress',
        // Evaluation-related read operations
        'getEvaluationWeights',
        'getAttendanceData',
        'getEvaluations',
        'getEvaluation',
        'getCurrentEvaluation',
        'calculateKpiScore',
        // Shift management read operations
        'getShifts',
        'getShift',
        'getShiftAssignments',
        'getShiftCalendar'
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

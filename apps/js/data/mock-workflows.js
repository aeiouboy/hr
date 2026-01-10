/**
 * Mock Workflow Data
 * Sample workflow requests and notifications
 */

const MockWorkflowData = {
    // All workflow requests
    requests: [
        {
            id: 'wf_001',
            type: 'address_change',
            status: 'pending',
            requestedBy: {
                id: 'EMP_DR001',
                name: 'Natthapong Chai',
                nameTh: 'ณัฐพงษ์ ไชย',
                photo: 'https://i.pravatar.cc/150?img=14'
            },
            submittedAt: '2024-01-05T09:30:00Z',
            effectiveDate: '2024-02-01',
            currentStep: 1,
            totalSteps: 2,
            approvers: [
                {
                    step: 1,
                    role: 'Manager',
                    user: { id: 'EMP001', name: 'Chatchai Tangsiri' },
                    status: 'pending'
                },
                {
                    step: 2,
                    role: 'HR Admin',
                    user: { id: 'HR001', name: 'HR Administrator' },
                    status: 'pending'
                }
            ],
            changes: {
                section: 'Address Information',
                oldValues: {
                    addressLine1: '123 Old Street',
                    district: 'Old District',
                    province: 'Bangkok'
                },
                newValues: {
                    addressLine1: '456 New Street',
                    district: 'New District',
                    province: 'Bangkok'
                }
            },
            attachments: [
                { name: 'house_registration.pdf', size: '1.2 MB' }
            ],
            comments: []
        },
        {
            id: 'wf_002',
            type: 'personal_info_change',
            status: 'pending',
            requestedBy: {
                id: 'EMP_DR002',
                name: 'Siriporn Kaewdee',
                nameTh: 'ศิริพร แก้วดี',
                photo: 'https://i.pravatar.cc/150?img=15'
            },
            submittedAt: '2024-01-04T14:15:00Z',
            effectiveDate: '2024-01-15',
            currentStep: 1,
            totalSteps: 2,
            approvers: [
                {
                    step: 1,
                    role: 'Manager',
                    user: { id: 'EMP001', name: 'Chatchai Tangsiri' },
                    status: 'pending'
                },
                {
                    step: 2,
                    role: 'HR Admin',
                    user: { id: 'HR001', name: 'HR Administrator' },
                    status: 'pending'
                }
            ],
            changes: {
                section: 'Personal Information',
                oldValues: {
                    maritalStatus: 'Single'
                },
                newValues: {
                    maritalStatus: 'Married'
                }
            },
            attachments: [
                { name: 'marriage_certificate.pdf', size: '2.5 MB' }
            ],
            comments: []
        },
        {
            id: 'wf_003',
            type: 'dependent_add',
            status: 'pending',
            requestedBy: {
                id: 'EMP_DR003',
                name: 'Worachai Limpakit',
                nameTh: 'วรชัย ลิมปกิจ',
                photo: 'https://i.pravatar.cc/150?img=16'
            },
            submittedAt: '2024-01-03T11:45:00Z',
            effectiveDate: '2024-01-10',
            currentStep: 1,
            totalSteps: 3,
            approvers: [
                {
                    step: 1,
                    role: 'Manager',
                    user: { id: 'EMP001', name: 'Chatchai Tangsiri' },
                    status: 'pending'
                },
                {
                    step: 2,
                    role: 'HR Admin',
                    user: { id: 'HR001', name: 'HR Administrator' },
                    status: 'pending'
                },
                {
                    step: 3,
                    role: 'HR Manager',
                    user: { id: 'HRM001', name: 'HR Manager' },
                    status: 'pending'
                }
            ],
            changes: {
                section: 'Dependents',
                action: 'add',
                newValues: {
                    name: 'Baby Limpakit',
                    relationship: 'Child',
                    dateOfBirth: '2024-01-01'
                }
            },
            attachments: [
                { name: 'birth_certificate.pdf', size: '1.8 MB' }
            ],
            comments: []
        }
    ],

    // Grouped by status for easy access
    get forApproval() {
        return this.requests.filter(r => r.status === 'pending' &&
            r.approvers[r.currentStep - 1]?.user?.id === MockEmployeeData.currentUser.employeeId);
    },

    get sentBack() {
        return this.requests.filter(r => r.status === 'sentBack' &&
            r.requestedBy.id === MockEmployeeData.currentUser.employeeId);
    },

    get approved() {
        return this.requests.filter(r => r.status === 'approved' &&
            r.approvers.some(a => a.user?.id === MockEmployeeData.currentUser.employeeId && a.status === 'approved'));
    },

    get reassigned() {
        return this.requests.filter(r => r.status === 'reassigned');
    },

    get myRequests() {
        return this.requests.filter(r => r.requestedBy.id === MockEmployeeData.currentUser.employeeId);
    },

    // Notifications
    notifications: [
        {
            id: 'notif_001',
            type: 'workflow_pending',
            title: 'New Approval Request',
            titleTh: 'คำขออนุมัติใหม่',
            message: 'Natthapong Chai submitted an address change request',
            messageTh: 'ณัฐพงษ์ ไชย ส่งคำขอเปลี่ยนที่อยู่',
            timestamp: '2024-01-05T09:30:00Z',
            read: false,
            actionUrl: '#/workflows',
            relatedId: 'wf_001'
        },
        {
            id: 'notif_002',
            type: 'workflow_pending',
            title: 'New Approval Request',
            titleTh: 'คำขออนุมัติใหม่',
            message: 'Siriporn Kaewdee submitted a personal information change request',
            messageTh: 'ศิริพร แก้วดี ส่งคำขอเปลี่ยนข้อมูลส่วนตัว',
            timestamp: '2024-01-04T14:15:00Z',
            read: false,
            actionUrl: '#/workflows',
            relatedId: 'wf_002'
        },
        {
            id: 'notif_003',
            type: 'workflow_pending',
            title: 'New Approval Request',
            titleTh: 'คำขออนุมัติใหม่',
            message: 'Worachai Limpakit submitted a request to add dependent',
            messageTh: 'วรชัย ลิมปกิจ ส่งคำขอเพิ่มผู้พึ่งพิง',
            timestamp: '2024-01-03T11:45:00Z',
            read: true,
            actionUrl: '#/workflows',
            relatedId: 'wf_003'
        },
        {
            id: 'notif_004',
            type: 'info',
            title: 'Payslip Available',
            titleTh: 'สลิปเงินเดือนพร้อมดาวน์โหลด',
            message: 'Your December 2023 payslip is now available',
            messageTh: 'สลิปเงินเดือนธันวาคม 2566 พร้อมดาวน์โหลดแล้ว',
            timestamp: '2023-12-25T08:00:00Z',
            read: true,
            actionUrl: '#/profile/compensation'
        },
        {
            id: 'notif_005',
            type: 'reminder',
            title: 'Benefits Enrollment Reminder',
            titleTh: 'เตือนลงทะเบียนสวัสดิการ',
            message: 'Open enrollment period ends on January 31, 2024',
            messageTh: 'ระยะเวลาลงทะเบียนสิ้นสุดวันที่ 31 มกราคม 2567',
            timestamp: '2024-01-02T09:00:00Z',
            read: true,
            actionUrl: '#/profile/benefits'
        }
    ],

    // Workflow history (completed requests)
    history: [
        {
            id: 'wf_hist_001',
            type: 'contact_change',
            status: 'approved',
            requestedBy: {
                id: 'EMP001',
                name: 'Chatchai Tangsiri'
            },
            submittedAt: '2023-11-15T10:00:00Z',
            completedAt: '2023-11-16T14:30:00Z',
            effectiveDate: '2023-11-20',
            changes: {
                section: 'Contact Information',
                oldValues: { personalMobile: '+66 81 111 2222' },
                newValues: { personalMobile: '+66 81 234 5678' }
            },
            approvers: [
                {
                    role: 'Manager',
                    user: { name: 'Prawit Wongsuwan' },
                    status: 'approved',
                    actionDate: '2023-11-16T14:30:00Z',
                    comments: 'Approved'
                }
            ]
        },
        {
            id: 'wf_hist_002',
            type: 'address_change',
            status: 'approved',
            requestedBy: {
                id: 'EMP001',
                name: 'Chatchai Tangsiri'
            },
            submittedAt: '2023-05-20T09:00:00Z',
            completedAt: '2023-05-22T11:00:00Z',
            effectiveDate: '2023-06-01',
            changes: {
                section: 'Address Information',
                oldValues: { addressLine1: '789 Ratchada Road' },
                newValues: { addressLine1: '456/78 Silom Complex' }
            },
            approvers: [
                {
                    role: 'Manager',
                    user: { name: 'Prawit Wongsuwan' },
                    status: 'approved',
                    actionDate: '2023-05-21T10:00:00Z'
                },
                {
                    role: 'HR Admin',
                    user: { name: 'HR Administrator' },
                    status: 'approved',
                    actionDate: '2023-05-22T11:00:00Z'
                }
            ]
        }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockWorkflowData;
}

/**
 * Mock Resignation Data
 * Sample data for resignation/offboarding workflow
 */

const MockResignationData = {
    // Resignation reasons
    resignationReasons: [
        { value: 'voluntary', labelEn: 'Voluntary Resignation', labelTh: 'ลาออกด้วยความสมัครใจ' },
        { value: 'involuntary', labelEn: 'Involuntary Termination', labelTh: 'ถูกเลิกจ้าง' },
        { value: 'retirement', labelEn: 'Retirement', labelTh: 'เกษียณอายุ' },
        { value: 'contract_end', labelEn: 'Contract End', labelTh: 'สิ้นสุดสัญญา' },
        { value: 'mutual_agreement', labelEn: 'Mutual Agreement', labelTh: 'ข้อตกลงร่วม' },
        { value: 'health_reasons', labelEn: 'Health Reasons', labelTh: 'เหตุผลด้านสุขภาพ' },
        { value: 'relocation', labelEn: 'Relocation', labelTh: 'ย้ายที่อยู่' },
        { value: 'career_change', labelEn: 'Career Change', labelTh: 'เปลี่ยนสายงาน' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ],

    // Clearance item categories
    clearanceCategories: [
        { value: 'it_equipment', labelEn: 'IT Equipment', labelTh: 'อุปกรณ์ไอที', icon: 'computer' },
        { value: 'company_property', labelEn: 'Company Property', labelTh: 'ทรัพย์สินบริษัท', icon: 'business_center' },
        { value: 'finance', labelEn: 'Finance & Loans', labelTh: 'การเงินและเงินกู้', icon: 'account_balance' },
        { value: 'documents', labelEn: 'Documents', labelTh: 'เอกสาร', icon: 'description' },
        { value: 'knowledge_transfer', labelEn: 'Knowledge Transfer', labelTh: 'การถ่ายทอดความรู้', icon: 'school' },
        { value: 'access_security', labelEn: 'Access & Security', labelTh: 'การเข้าถึงและความปลอดภัย', icon: 'security' }
    ],

    // Standard clearance items template
    clearanceItemsTemplate: {
        it_equipment: [
            { id: 'it_001', item: 'laptop', labelEn: 'Laptop/Notebook', labelTh: 'แล็ปท็อป/โน้ตบุ๊ก', required: true },
            { id: 'it_002', item: 'mobile_phone', labelEn: 'Company Mobile Phone', labelTh: 'โทรศัพท์มือถือบริษัท', required: false },
            { id: 'it_003', item: 'access_card', labelEn: 'Access Card/Badge', labelTh: 'บัตรพนักงาน', required: true },
            { id: 'it_004', item: 'usb_storage', labelEn: 'USB/External Storage', labelTh: 'USB/อุปกรณ์จัดเก็บข้อมูล', required: false },
            { id: 'it_005', item: 'headset', labelEn: 'Headset/Audio Equipment', labelTh: 'หูฟัง/อุปกรณ์เสียง', required: false },
            { id: 'it_006', item: 'monitor', labelEn: 'External Monitor', labelTh: 'จอภาพ', required: false }
        ],
        company_property: [
            { id: 'cp_001', item: 'company_car', labelEn: 'Company Car', labelTh: 'รถบริษัท', required: false },
            { id: 'cp_002', item: 'parking_card', labelEn: 'Parking Card', labelTh: 'บัตรจอดรถ', required: false },
            { id: 'cp_003', item: 'uniform', labelEn: 'Uniform', labelTh: 'ชุดยูนิฟอร์ม', required: false },
            { id: 'cp_004', item: 'office_keys', labelEn: 'Office Keys', labelTh: 'กุญแจสำนักงาน', required: true },
            { id: 'cp_005', item: 'locker_key', labelEn: 'Locker Key', labelTh: 'กุญแจล็อกเกอร์', required: false }
        ],
        finance: [
            { id: 'fin_001', item: 'company_loan', labelEn: 'Company Loan Settlement', labelTh: 'ชำระหนี้เงินกู้บริษัท', required: true },
            { id: 'fin_002', item: 'advance_payment', labelEn: 'Advance Payment Settlement', labelTh: 'ชำระเงินยืมทดรอง', required: true },
            { id: 'fin_003', item: 'expense_claims', labelEn: 'Pending Expense Claims', labelTh: 'เคลียร์ค่าใช้จ่ายค้างจ่าย', required: true },
            { id: 'fin_004', item: 'credit_card', labelEn: 'Company Credit Card', labelTh: 'บัตรเครดิตบริษัท', required: false },
            { id: 'fin_005', item: 'petty_cash', labelEn: 'Petty Cash Settlement', labelTh: 'เคลียร์เงินสดย่อย', required: false }
        ],
        documents: [
            { id: 'doc_001', item: 'confidential_docs', labelEn: 'Return Confidential Documents', labelTh: 'คืนเอกสารลับ', required: true },
            { id: 'doc_002', item: 'project_files', labelEn: 'Project Files Handover', labelTh: 'ส่งมอบไฟล์โครงการ', required: true },
            { id: 'doc_003', item: 'nda_confirmation', labelEn: 'NDA Acknowledgment', labelTh: 'ยืนยัน NDA', required: true },
            { id: 'doc_004', item: 'exit_form', labelEn: 'Exit Form Signed', labelTh: 'ลงนามแบบฟอร์มลาออก', required: true }
        ],
        knowledge_transfer: [
            { id: 'kt_001', item: 'successor_training', labelEn: 'Train Successor/Replacement', labelTh: 'ฝึกอบรมผู้สืบทอดงาน', required: true },
            { id: 'kt_002', item: 'documentation', labelEn: 'Process Documentation', labelTh: 'จัดทำเอกสารขั้นตอนงาน', required: true },
            { id: 'kt_003', item: 'pending_tasks', labelEn: 'Complete/Handover Pending Tasks', labelTh: 'ส่งมอบงานค้าง', required: true },
            { id: 'kt_004', item: 'contacts_handover', labelEn: 'Customer/Vendor Contact Handover', labelTh: 'ส่งมอบผู้ติดต่อลูกค้า/ผู้ขาย', required: false }
        ],
        access_security: [
            { id: 'sec_001', item: 'email_deactivation', labelEn: 'Email Account Deactivation', labelTh: 'ปิดบัญชีอีเมล', required: true },
            { id: 'sec_002', item: 'system_access', labelEn: 'System Access Revocation', labelTh: 'เพิกถอนสิทธิ์ระบบ', required: true },
            { id: 'sec_003', item: 'vpn_access', labelEn: 'VPN Access Revocation', labelTh: 'เพิกถอนสิทธิ์ VPN', required: true },
            { id: 'sec_004', item: 'cloud_storage', labelEn: 'Cloud Storage Backup/Cleanup', labelTh: 'สำรอง/ลบข้อมูลคลาวด์', required: true },
            { id: 'sec_005', item: 'physical_access', labelEn: 'Physical Access Revocation', labelTh: 'เพิกถอนสิทธิ์เข้าอาคาร', required: true }
        ]
    },

    // Responsible parties for sign-off
    responsibleParties: [
        { value: 'direct_manager', labelEn: 'Direct Manager', labelTh: 'หัวหน้างานโดยตรง' },
        { value: 'it_department', labelEn: 'IT Department', labelTh: 'ฝ่ายไอที' },
        { value: 'hr_department', labelEn: 'HR Department', labelTh: 'ฝ่ายทรัพยากรบุคคล' },
        { value: 'finance_department', labelEn: 'Finance Department', labelTh: 'ฝ่ายการเงิน' },
        { value: 'security_department', labelEn: 'Security Department', labelTh: 'ฝ่ายรักษาความปลอดภัย' },
        { value: 'admin_department', labelEn: 'Admin Department', labelTh: 'ฝ่ายธุรการ' }
    ],

    // Sample resignation record
    currentResignation: null,

    // Resignation history (for demonstration)
    resignationHistory: [],

    // Sample active resignation (for testing)
    sampleResignation: {
        id: 'RES_001',
        employeeId: 'EMP001',
        resignationDate: '2026-01-10',
        lastWorkingDate: '2026-02-10',
        reasonType: 'voluntary',
        reasonDetails: 'Pursuing a new opportunity',
        noticePeriod: 30,
        exitInterviewScheduled: true,
        exitInterviewDate: '2026-02-05',
        exitInterviewCompleted: false,
        status: 'pending_clearance',
        createdDate: '2026-01-05',
        createdBy: 'EMP001',
        approvedDate: '2026-01-06',
        approvedBy: 'MGR001',
        clearanceItems: [
            // IT Equipment
            { id: 'cl_001', categoryId: 'it_equipment', itemId: 'it_001', status: 'pending', responsibleParty: 'it_department', signOffBy: null, signOffDate: null, notes: '' },
            { id: 'cl_002', categoryId: 'it_equipment', itemId: 'it_003', status: 'completed', responsibleParty: 'it_department', signOffBy: 'IT_001', signOffDate: '2026-01-08', notes: 'Card returned' },
            // Finance
            { id: 'cl_003', categoryId: 'finance', itemId: 'fin_001', status: 'not_applicable', responsibleParty: 'finance_department', signOffBy: 'FIN_001', signOffDate: '2026-01-07', notes: 'No outstanding loan' },
            { id: 'cl_004', categoryId: 'finance', itemId: 'fin_002', status: 'pending', responsibleParty: 'finance_department', signOffBy: null, signOffDate: null, notes: 'THB 5,000 pending' },
            // Documents
            { id: 'cl_005', categoryId: 'documents', itemId: 'doc_001', status: 'pending', responsibleParty: 'direct_manager', signOffBy: null, signOffDate: null, notes: '' },
            { id: 'cl_006', categoryId: 'documents', itemId: 'doc_004', status: 'completed', responsibleParty: 'hr_department', signOffBy: 'HR_001', signOffDate: '2026-01-05', notes: '' },
            // Knowledge Transfer
            { id: 'cl_007', categoryId: 'knowledge_transfer', itemId: 'kt_001', status: 'in_progress', responsibleParty: 'direct_manager', signOffBy: null, signOffDate: null, notes: 'Training scheduled for 01/20' },
            { id: 'cl_008', categoryId: 'knowledge_transfer', itemId: 'kt_002', status: 'pending', responsibleParty: 'direct_manager', signOffBy: null, signOffDate: null, notes: '' },
            // Access Security
            { id: 'cl_009', categoryId: 'access_security', itemId: 'sec_001', status: 'pending', responsibleParty: 'it_department', signOffBy: null, signOffDate: null, notes: 'Scheduled for last working day' },
            { id: 'cl_010', categoryId: 'access_security', itemId: 'sec_002', status: 'pending', responsibleParty: 'it_department', signOffBy: null, signOffDate: null, notes: '' }
        ],
        finalSettlement: {
            calculatedDate: null,
            status: 'pending',
            outstandingSalary: 45000,
            leaveEncashment: 12500,
            bonus: 0,
            deductions: 5000,
            providentFund: 85000,
            finalPaymentAmount: null,
            finalPaymentDate: null,
            bankAccount: 'xxx-xxx-4567',
            notes: ''
        }
    },

    // Clearance status options
    clearanceStatuses: [
        { value: 'pending', labelEn: 'Pending', labelTh: 'รอดำเนินการ', color: 'yellow' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'blue' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'green' },
        { value: 'not_applicable', labelEn: 'N/A', labelTh: 'ไม่เกี่ยวข้อง', color: 'gray' }
    ],

    // Resignation statuses
    resignationStatuses: [
        { value: 'draft', labelEn: 'Draft', labelTh: 'ร่าง', color: 'gray' },
        { value: 'pending_approval', labelEn: 'Pending Approval', labelTh: 'รออนุมัติ', color: 'yellow' },
        { value: 'approved', labelEn: 'Approved', labelTh: 'อนุมัติแล้ว', color: 'blue' },
        { value: 'pending_clearance', labelEn: 'Pending Clearance', labelTh: 'รอตรวจสอบ', color: 'orange' },
        { value: 'clearance_completed', labelEn: 'Clearance Completed', labelTh: 'ตรวจสอบเสร็จสิ้น', color: 'teal' },
        { value: 'final_settlement', labelEn: 'Final Settlement', labelTh: 'จ่ายเงินสุดท้าย', color: 'purple' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'green' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก', color: 'red' }
    ],

    // Helper methods
    getResignationReasonLabel(value, isThai) {
        const reason = this.resignationReasons.find(r => r.value === value);
        return reason ? (isThai ? reason.labelTh : reason.labelEn) : value;
    },

    getCategoryLabel(value, isThai) {
        const category = this.clearanceCategories.find(c => c.value === value);
        return category ? (isThai ? category.labelTh : category.labelEn) : value;
    },

    getClearanceStatusLabel(value, isThai) {
        const status = this.clearanceStatuses.find(s => s.value === value);
        return status ? (isThai ? status.labelTh : status.labelEn) : value;
    },

    getResignationStatusLabel(value, isThai) {
        const status = this.resignationStatuses.find(s => s.value === value);
        return status ? (isThai ? status.labelTh : status.labelEn) : value;
    },

    getResponsiblePartyLabel(value, isThai) {
        const party = this.responsibleParties.find(p => p.value === value);
        return party ? (isThai ? party.labelTh : party.labelEn) : value;
    },

    getClearanceItemLabel(categoryId, itemId, isThai) {
        const items = this.clearanceItemsTemplate[categoryId];
        if (!items) return itemId;
        const item = items.find(i => i.id === itemId);
        return item ? (isThai ? item.labelTh : item.labelEn) : itemId;
    },

    // Generate clearance checklist based on employee type/department
    generateClearanceChecklist(employeeType, department) {
        const checklist = [];
        let id = 1;

        // All employees get basic items
        const categories = Object.keys(this.clearanceItemsTemplate);

        categories.forEach(categoryId => {
            const items = this.clearanceItemsTemplate[categoryId];
            items.forEach(item => {
                // Add required items always, optional items based on employee type
                if (item.required || Math.random() > 0.5) {
                    checklist.push({
                        id: `cl_${String(id++).padStart(3, '0')}`,
                        categoryId: categoryId,
                        itemId: item.id,
                        status: 'pending',
                        responsibleParty: this.getDefaultResponsibleParty(categoryId),
                        signOffBy: null,
                        signOffDate: null,
                        notes: ''
                    });
                }
            });
        });

        return checklist;
    },

    // Get default responsible party for a category
    getDefaultResponsibleParty(categoryId) {
        const mapping = {
            'it_equipment': 'it_department',
            'company_property': 'admin_department',
            'finance': 'finance_department',
            'documents': 'direct_manager',
            'knowledge_transfer': 'direct_manager',
            'access_security': 'it_department'
        };
        return mapping[categoryId] || 'hr_department';
    },

    // Calculate final settlement
    calculateFinalSettlement(resignation, employee) {
        const baseSalary = employee?.compensation?.baseSalary || 45000;
        const workingDays = this.calculateWorkingDays(resignation.resignationDate, resignation.lastWorkingDate);
        const totalDays = new Date(resignation.lastWorkingDate).getDate();

        // Pro-rated salary for partial month
        const outstandingSalary = Math.round((baseSalary / totalDays) * workingDays);

        // Leave encashment (unused leave days * daily rate)
        const unusedLeave = employee?.leaveBalance?.annual?.remaining || 5;
        const dailyRate = baseSalary / 30;
        const leaveEncashment = Math.round(unusedLeave * dailyRate);

        // Deductions (loans, advances, etc.)
        const deductions = resignation.finalSettlement?.deductions || 0;

        // Provident fund
        const providentFund = employee?.providentFund?.balance || 0;

        return {
            outstandingSalary,
            leaveEncashment,
            bonus: 0,
            deductions,
            providentFund,
            finalPaymentAmount: outstandingSalary + leaveEncashment - deductions,
            grossTotal: outstandingSalary + leaveEncashment + providentFund,
            netTotal: outstandingSalary + leaveEncashment + providentFund - deductions
        };
    },

    // Calculate working days between two dates
    calculateWorkingDays(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let count = 0;
        const current = new Date(start);

        while (current <= end) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }

        return count;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockResignationData;
}

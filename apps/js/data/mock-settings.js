/**
 * Mock Settings Data
 * Default settings, Thai tax brackets, social security, leave policies
 */

const MockSettingsData = {
    // General Settings
    general: {
        language: 'th',
        dateFormat: 'buddhist', // 'buddhist' or 'gregorian'
        theme: 'system' // 'light', 'dark', 'system'
    },

    // Company Settings
    company: {
        name: 'Central Group Co., Ltd.',
        nameTh: 'บริษัท เซ็นทรัล กรุ๊ป จำกัด',
        logo: null,
        taxId: '0105556123456',
        socialSecurityNo: '10-12345678-9',
        address: {
            line1: '306 Silom Road',
            line2: 'Bangrak',
            district: 'Bangrak',
            province: 'Bangkok',
            postalCode: '10500',
            country: 'Thailand'
        },
        addressTh: {
            line1: '306 ถนนสีลม',
            line2: 'แขวงบางรัก',
            district: 'เขตบางรัก',
            province: 'กรุงเทพมหานคร',
            postalCode: '10500',
            country: 'ประเทศไทย'
        }
    },

    // Thai Progressive Tax Brackets for 2567 (2024)
    taxBrackets: [
        { min: 0, max: 150000, rate: 0, description: '0 - 150,000', descriptionTh: '0 - 150,000' },
        { min: 150001, max: 300000, rate: 5, description: '150,001 - 300,000', descriptionTh: '150,001 - 300,000' },
        { min: 300001, max: 500000, rate: 10, description: '300,001 - 500,000', descriptionTh: '300,001 - 500,000' },
        { min: 500001, max: 750000, rate: 15, description: '500,001 - 750,000', descriptionTh: '500,001 - 750,000' },
        { min: 750001, max: 1000000, rate: 20, description: '750,001 - 1,000,000', descriptionTh: '750,001 - 1,000,000' },
        { min: 1000001, max: 2000000, rate: 25, description: '1,000,001 - 2,000,000', descriptionTh: '1,000,001 - 2,000,000' },
        { min: 2000001, max: 5000000, rate: 30, description: '2,000,001 - 5,000,000', descriptionTh: '2,000,001 - 5,000,000' },
        { min: 5000001, max: null, rate: 35, description: '5,000,001+', descriptionTh: '5,000,001 ขึ้นไป' }
    ],

    // Social Security Configuration
    socialSecurity: {
        employeeRate: 5, // 5%
        employerRate: 5, // 5%
        maxContributionBase: 15000, // THB per month
        maxEmployeeContribution: 750, // THB per month (5% of 15,000)
        maxEmployerContribution: 750 // THB per month
    },

    // Provident Fund Settings
    providentFund: {
        enabled: true,
        employeeMinRate: 3,
        employeeMaxRate: 15,
        employeeDefaultRate: 5,
        employerRate: 5,
        vestingSchedule: [
            { years: 0, percentage: 0 },
            { years: 1, percentage: 20 },
            { years: 2, percentage: 40 },
            { years: 3, percentage: 60 },
            { years: 4, percentage: 80 },
            { years: 5, percentage: 100 }
        ]
    },

    // Leave Types Configuration (per Thai Labor Law)
    leaveTypes: [
        {
            id: 'annual',
            code: 'AL',
            name: 'Annual Leave',
            nameTh: 'วันลาพักร้อน',
            daysPerYear: 6,
            accrualType: 'yearly', // 'monthly', 'yearly', 'front_loaded'
            carryForwardLimit: 6,
            carryForwardExpiry: 6, // months
            requiresCertificate: false,
            certificateAfterDays: null,
            paidLeave: true,
            minServiceDays: 365, // 1 year minimum service
            maxConsecutiveDays: 15,
            advanceNoticeDays: 3,
            active: true,
            description: 'Minimum 6 days per year after 1 year of service',
            descriptionTh: 'อย่างน้อย 6 วันต่อปี หลังทำงานครบ 1 ปี'
        },
        {
            id: 'sick',
            code: 'SL',
            name: 'Sick Leave',
            nameTh: 'วันลาป่วย',
            daysPerYear: 30,
            accrualType: 'front_loaded',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: true,
            certificateAfterDays: 3, // Doctor certificate required after 3 consecutive days
            paidLeave: true,
            minServiceDays: 0,
            maxConsecutiveDays: 30,
            advanceNoticeDays: 0,
            active: true,
            description: 'Up to 30 days per year, doctor certificate required after 3 days',
            descriptionTh: 'สูงสุด 30 วันต่อปี ใบรับรองแพทย์หลัง 3 วัน'
        },
        {
            id: 'personal',
            code: 'PL',
            name: 'Personal Leave',
            nameTh: 'วันลากิจ',
            daysPerYear: 3,
            accrualType: 'front_loaded',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: false,
            certificateAfterDays: null,
            paidLeave: true,
            minServiceDays: 0,
            maxConsecutiveDays: 3,
            advanceNoticeDays: 1,
            active: true,
            description: 'Up to 3 days per year for personal matters',
            descriptionTh: 'สูงสุด 3 วันต่อปีสำหรับธุระส่วนตัว'
        },
        {
            id: 'maternity',
            code: 'MAT',
            name: 'Maternity Leave',
            nameTh: 'วันลาคลอดบุตร',
            daysPerYear: 98,
            accrualType: 'event_based',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: true,
            certificateAfterDays: 0,
            paidLeave: true,
            paidDays: 45, // Company pays 45 days, Social Security pays 45 days
            minServiceDays: 0,
            maxConsecutiveDays: 98,
            advanceNoticeDays: 30,
            active: true,
            description: '98 days for maternity (45 days paid by employer)',
            descriptionTh: '98 วันสำหรับคลอดบุตร (45 วันจ่ายโดยนายจ้าง)'
        },
        {
            id: 'military',
            code: 'MIL',
            name: 'Military Leave',
            nameTh: 'วันลาทหาร',
            daysPerYear: 60,
            accrualType: 'event_based',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: true,
            certificateAfterDays: 0,
            paidLeave: true,
            minServiceDays: 0,
            maxConsecutiveDays: 60,
            advanceNoticeDays: 14,
            active: true,
            description: 'Up to 60 days per year for military service',
            descriptionTh: 'สูงสุด 60 วันต่อปีสำหรับการรับราชการทหาร'
        },
        {
            id: 'ordination',
            code: 'ORD',
            name: 'Ordination Leave',
            nameTh: 'วันลาบวช',
            daysPerYear: 15,
            accrualType: 'event_based',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: true,
            certificateAfterDays: 0,
            paidLeave: true,
            minServiceDays: 365,
            maxConsecutiveDays: 15,
            advanceNoticeDays: 30,
            active: true,
            description: 'Up to 15 days for Buddhist ordination (once per employment)',
            descriptionTh: 'สูงสุด 15 วันสำหรับการบวช (ครั้งเดียวต่อการจ้างงาน)'
        },
        {
            id: 'sterilization',
            code: 'STR',
            name: 'Sterilization Leave',
            nameTh: 'วันลาทำหมัน',
            daysPerYear: 3,
            accrualType: 'event_based',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: true,
            certificateAfterDays: 0,
            paidLeave: true,
            minServiceDays: 0,
            maxConsecutiveDays: 3,
            advanceNoticeDays: 7,
            active: true,
            description: 'Leave for sterilization procedure',
            descriptionTh: 'วันลาสำหรับการทำหมัน'
        },
        {
            id: 'training',
            code: 'TRN',
            name: 'Training Leave',
            nameTh: 'วันลาอบรม',
            daysPerYear: 30,
            accrualType: 'yearly',
            carryForwardLimit: 0,
            carryForwardExpiry: null,
            requiresCertificate: false,
            certificateAfterDays: null,
            paidLeave: true,
            minServiceDays: 180,
            maxConsecutiveDays: 30,
            advanceNoticeDays: 7,
            active: true,
            description: 'Leave for approved training and development',
            descriptionTh: 'วันลาสำหรับการอบรมและพัฒนาที่ได้รับอนุมัติ'
        }
    ],

    // Workflow Configuration
    workflows: {
        approvalLevels: [
            {
                id: 'level1',
                name: 'Direct Manager',
                nameTh: 'ผู้จัดการโดยตรง',
                role: 'manager',
                order: 1,
                required: true
            },
            {
                id: 'level2',
                name: 'HR Administrator',
                nameTh: 'เจ้าหน้าที่ HR',
                role: 'hr_admin',
                order: 2,
                required: false
            },
            {
                id: 'level3',
                name: 'HR Manager',
                nameTh: 'ผู้จัดการ HR',
                role: 'hr_manager',
                order: 3,
                required: false
            }
        ],
        autoApproveRules: [
            {
                id: 'rule1',
                leaveType: 'sick',
                maxDays: 3,
                active: true,
                description: 'Auto-approve sick leave up to 3 days',
                descriptionTh: 'อนุมัติอัตโนมัติลาป่วยไม่เกิน 3 วัน'
            },
            {
                id: 'rule2',
                leaveType: 'personal',
                maxDays: 1,
                active: true,
                description: 'Auto-approve personal leave up to 1 day',
                descriptionTh: 'อนุมัติอัตโนมัติลากิจไม่เกิน 1 วัน'
            }
        ],
        delegationSettings: {
            enabled: true,
            maxDelegationDays: 30,
            allowRedelegation: false,
            notifyDelegator: true,
            notifyDelegatee: true
        }
    },

    // Notification Settings
    notifications: {
        email: {
            enabled: true,
            digestFrequency: 'immediate', // 'immediate', 'daily', 'weekly'
            types: {
                workflowPending: true,
                workflowApproved: true,
                workflowRejected: true,
                leaveReminder: true,
                payslipAvailable: true,
                documentExpiry: true,
                systemAnnouncement: true
            }
        },
        inApp: {
            enabled: true,
            showBadge: true,
            playSound: false,
            types: {
                workflowPending: true,
                workflowApproved: true,
                workflowRejected: true,
                leaveReminder: true,
                payslipAvailable: true,
                documentExpiry: true,
                systemAnnouncement: true,
                teamUpdates: true
            }
        },
        reminders: {
            leaveBalanceReminder: true,
            leaveBalanceThreshold: 5, // Remind when balance is 5 days or less
            documentExpiryDays: 30, // Remind 30 days before expiry
            performanceReviewDays: 14 // Remind 14 days before review due
        }
    },

    // Payroll Configuration
    payroll: {
        paymentCycle: 'monthly', // 'monthly', 'bi-weekly', 'weekly'
        payDay: 25, // Day of month
        cutoffDay: 20, // Day of month for payroll cutoff
        currency: 'THB',
        bankInfo: {
            defaultBank: 'Bangkok Bank',
            supportedBanks: [
                { code: 'BBL', name: 'Bangkok Bank', nameTh: 'ธนาคารกรุงเทพ' },
                { code: 'KBANK', name: 'Kasikorn Bank', nameTh: 'ธนาคารกสิกรไทย' },
                { code: 'SCB', name: 'Siam Commercial Bank', nameTh: 'ธนาคารไทยพาณิชย์' },
                { code: 'KTB', name: 'Krungthai Bank', nameTh: 'ธนาคารกรุงไทย' },
                { code: 'TMB', name: 'TMB Thanachart Bank', nameTh: 'ธนาคารทหารไทยธนชาต' },
                { code: 'BAY', name: 'Bank of Ayudhya', nameTh: 'ธนาคารกรุงศรีอยุธยา' }
            ]
        },
        overtimeRates: {
            regularDay: 1.5, // 1.5x for overtime on regular days
            holiday: 3.0, // 3x for work on holidays
            holidayOvertime: 3.0 // 3x for overtime on holidays
        }
    },

    // Helper methods
    getLeaveTypeById(id) {
        return this.leaveTypes.find(lt => lt.id === id);
    },

    getTaxBracket(income) {
        return this.taxBrackets.find(b =>
            income >= b.min && (b.max === null || income <= b.max)
        );
    },

    calculateTax(annualIncome) {
        let remainingIncome = annualIncome;
        let totalTax = 0;

        for (const bracket of this.taxBrackets) {
            if (remainingIncome <= 0) break;

            const taxableAmount = bracket.max
                ? Math.min(remainingIncome, bracket.max - bracket.min + 1)
                : remainingIncome;

            totalTax += taxableAmount * (bracket.rate / 100);
            remainingIncome -= taxableAmount;
        }

        return totalTax;
    },

    calculateSocialSecurity(monthlyIncome) {
        const contributionBase = Math.min(monthlyIncome, this.socialSecurity.maxContributionBase);
        const employeeContribution = Math.min(
            contributionBase * (this.socialSecurity.employeeRate / 100),
            this.socialSecurity.maxEmployeeContribution
        );
        const employerContribution = Math.min(
            contributionBase * (this.socialSecurity.employerRate / 100),
            this.socialSecurity.maxEmployerContribution
        );

        return {
            employeeContribution,
            employerContribution,
            totalContribution: employeeContribution + employerContribution
        };
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockSettingsData;
}

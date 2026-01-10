/**
 * Mock Payroll Data
 * Payroll master setup configuration for RIS HR System
 * Includes earning types, deduction types, tax configuration, and bank information
 */

const MockPayrollData = {
    // Company payroll settings
    companySettings: {
        companyId: 'RIS_C015',
        companyName: 'RIS',
        companyNameTh: 'บริษัท อาร์ไอเอส จำกัด',
        taxRegistrationNumber: '0105555000001', // เลขประจำตัวผู้เสียภาษี
        socialSecurityEmployerNumber: '1234567890', // เลขที่นายจ้างประกันสังคม
        socialSecurityBranch: 'สำนักงานใหญ่',
        providentFundLicense: 'PVD-2024-00001',
        providentFundName: 'กองทุนสำรองเลี้ยงชีพ RIS',
        providentFundNameEn: 'RIS Provident Fund',
        defaultPayFrequency: 'monthly',
        paymentCutoffDay: 25,
        paymentDay: 30,
        fiscalYearStart: '01-01',
        fiscalYearEnd: '12-31',
        currency: 'THB',
        currencySymbol: '\u0E3F',
        effectiveDate: '2024-01-01',
        lastUpdatedBy: 'HR Admin',
        lastUpdatedDate: '2024-01-15'
    },

    // Earning types configuration
    earningTypes: [
        {
            id: 'EARN001',
            code: 'BASE_SALARY',
            nameEn: 'Base Salary',
            nameTh: 'เงินเดือน',
            category: 'regular',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: true,
            frequency: 'monthly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5100-001',
            description: 'Monthly base salary payment',
            descriptionTh: 'เงินเดือนพื้นฐานรายเดือน',
            sortOrder: 1
        },
        {
            id: 'EARN002',
            code: 'POSITION_ALLOWANCE',
            nameEn: 'Position Allowance',
            nameTh: 'ค่าตำแหน่ง',
            category: 'allowance',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: true,
            frequency: 'monthly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5100-002',
            description: 'Position-based allowance',
            descriptionTh: 'เบี้ยเลี้ยงตำแหน่งงาน',
            sortOrder: 2
        },
        {
            id: 'EARN003',
            code: 'HOUSING_ALLOWANCE',
            nameEn: 'Housing Allowance',
            nameTh: 'ค่าที่พักอาศัย',
            category: 'allowance',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5100-003',
            description: 'Monthly housing allowance',
            descriptionTh: 'เงินช่วยเหลือค่าที่พักอาศัยรายเดือน',
            sortOrder: 3
        },
        {
            id: 'EARN004',
            code: 'TRANSPORTATION',
            nameEn: 'Transportation Allowance',
            nameTh: 'ค่าเดินทาง',
            category: 'allowance',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5100-004',
            description: 'Transportation expense allowance',
            descriptionTh: 'เบี้ยเลี้ยงค่าเดินทาง',
            sortOrder: 4
        },
        {
            id: 'EARN005',
            code: 'MEAL_ALLOWANCE',
            nameEn: 'Meal Allowance',
            nameTh: 'ค่าอาหาร',
            category: 'allowance',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5100-005',
            description: 'Daily meal allowance',
            descriptionTh: 'เบี้ยเลี้ยงค่าอาหาร',
            sortOrder: 5
        },
        {
            id: 'EARN006',
            code: 'OT_REGULAR',
            nameEn: 'Overtime (Regular)',
            nameTh: 'ค่าล่วงเวลา (ปกติ)',
            category: 'overtime',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'hourly',
            multiplier: 1.5,
            isActive: true,
            glAccountCode: '5200-001',
            description: 'Overtime pay at 1.5x regular rate (weekdays)',
            descriptionTh: 'ค่าล่วงเวลา 1.5 เท่า (วันธรรมดา)',
            sortOrder: 10
        },
        {
            id: 'EARN007',
            code: 'OT_HOLIDAY',
            nameEn: 'Overtime (Holiday)',
            nameTh: 'ค่าล่วงเวลา (วันหยุด)',
            category: 'overtime',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'hourly',
            multiplier: 3.0,
            isActive: true,
            glAccountCode: '5200-002',
            description: 'Overtime pay at 3x regular rate (holidays)',
            descriptionTh: 'ค่าล่วงเวลา 3 เท่า (วันหยุดนักขัตฤกษ์)',
            sortOrder: 11
        },
        {
            id: 'EARN008',
            code: 'OT_WEEKEND',
            nameEn: 'Overtime (Weekend)',
            nameTh: 'ค่าล่วงเวลา (วันหยุดสุดสัปดาห์)',
            category: 'overtime',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'hourly',
            multiplier: 2.0,
            isActive: true,
            glAccountCode: '5200-003',
            description: 'Overtime pay at 2x regular rate (weekends)',
            descriptionTh: 'ค่าล่วงเวลา 2 เท่า (วันหยุดสุดสัปดาห์)',
            sortOrder: 12
        },
        {
            id: 'EARN009',
            code: 'COMMISSION',
            nameEn: 'Commission',
            nameTh: 'ค่าคอมมิชชั่น',
            category: 'variable',
            taxable: true,
            includeInSocialSecurity: true,
            includeInProvidentFund: false,
            frequency: 'monthly',
            calculationType: 'percentage',
            isActive: true,
            glAccountCode: '5300-001',
            description: 'Sales commission based on performance',
            descriptionTh: 'ค่านายหน้าจากการขาย',
            sortOrder: 20
        },
        {
            id: 'EARN010',
            code: 'ANNUAL_BONUS',
            nameEn: 'Annual Bonus',
            nameTh: 'โบนัสประจำปี',
            category: 'bonus',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'annual',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5400-001',
            description: 'Annual performance bonus',
            descriptionTh: 'โบนัสประจำปีตามผลงาน',
            sortOrder: 30
        },
        {
            id: 'EARN011',
            code: 'SIGNING_BONUS',
            nameEn: 'Signing Bonus',
            nameTh: 'โบนัสแรกเข้า',
            category: 'bonus',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'one-time',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5400-002',
            description: 'One-time signing bonus for new hires',
            descriptionTh: 'โบนัสจ่ายครั้งเดียวเมื่อเริ่มงาน',
            sortOrder: 31
        },
        {
            id: 'EARN012',
            code: 'INCENTIVE',
            nameEn: 'Performance Incentive',
            nameTh: 'เงินจูงใจ',
            category: 'variable',
            taxable: true,
            includeInSocialSecurity: false,
            includeInProvidentFund: false,
            frequency: 'quarterly',
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '5300-002',
            description: 'Quarterly performance incentive',
            descriptionTh: 'เงินจูงใจตามผลงานรายไตรมาส',
            sortOrder: 21
        }
    ],

    // Deduction types configuration
    deductionTypes: [
        {
            id: 'DED001',
            code: 'INCOME_TAX',
            nameEn: 'Personal Income Tax',
            nameTh: 'ภาษีเงินได้บุคคลธรรมดา',
            category: 'tax',
            mandatory: true,
            calculationType: 'progressive',
            isActive: true,
            glAccountCode: '2200-001',
            description: 'Personal income tax withholding (ภ.ง.ด.1)',
            descriptionTh: 'ภาษีหัก ณ ที่จ่าย ภ.ง.ด.1',
            sortOrder: 1
        },
        {
            id: 'DED002',
            code: 'SOCIAL_SECURITY',
            nameEn: 'Social Security',
            nameTh: 'ประกันสังคม',
            category: 'social',
            mandatory: true,
            calculationType: 'percentage',
            rate: 5.0,
            maxAmount: 750,
            minAmount: 0,
            basedOn: 'social_security_wage',
            isActive: true,
            glAccountCode: '2200-002',
            description: 'Employee social security contribution (5%)',
            descriptionTh: 'เงินสมทบประกันสังคมส่วนลูกจ้าง (5%)',
            sortOrder: 2
        },
        {
            id: 'DED003',
            code: 'PROVIDENT_FUND_EE',
            nameEn: 'Provident Fund (Employee)',
            nameTh: 'กองทุนสำรองเลี้ยงชีพ (พนักงาน)',
            category: 'provident',
            mandatory: false,
            calculationType: 'percentage',
            rate: 5.0,
            minRate: 2.0,
            maxRate: 15.0,
            isActive: true,
            glAccountCode: '2200-003',
            description: 'Employee provident fund contribution',
            descriptionTh: 'เงินสะสมกองทุนสำรองเลี้ยงชีพส่วนพนักงาน',
            sortOrder: 3
        },
        {
            id: 'DED004',
            code: 'PROVIDENT_FUND_ER',
            nameEn: 'Provident Fund (Employer)',
            nameTh: 'กองทุนสำรองเลี้ยงชีพ (นายจ้าง)',
            category: 'provident',
            mandatory: false,
            calculationType: 'percentage',
            rate: 5.0,
            minRate: 2.0,
            maxRate: 15.0,
            isActive: true,
            glAccountCode: '5500-001',
            description: 'Employer provident fund contribution',
            descriptionTh: 'เงินสมทบกองทุนสำรองเลี้ยงชีพส่วนนายจ้าง',
            sortOrder: 4
        },
        {
            id: 'DED005',
            code: 'HOUSING_LOAN',
            nameEn: 'Housing Loan Deduction',
            nameTh: 'หักเงินกู้ที่อยู่อาศัย',
            category: 'loan',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2300-001',
            description: 'Monthly housing loan repayment',
            descriptionTh: 'หักชำระเงินกู้สำหรับที่อยู่อาศัยรายเดือน',
            sortOrder: 10
        },
        {
            id: 'DED006',
            code: 'EMERGENCY_LOAN',
            nameEn: 'Emergency Loan Deduction',
            nameTh: 'หักเงินกู้ฉุกเฉิน',
            category: 'loan',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2300-002',
            description: 'Emergency loan repayment',
            descriptionTh: 'หักชำระเงินกู้ฉุกเฉิน',
            sortOrder: 11
        },
        {
            id: 'DED007',
            code: 'CAR_LOAN',
            nameEn: 'Car Loan Deduction',
            nameTh: 'หักเงินกู้รถยนต์',
            category: 'loan',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2300-003',
            description: 'Car loan repayment',
            descriptionTh: 'หักชำระเงินกู้สินเชื่อรถยนต์',
            sortOrder: 12
        },
        {
            id: 'DED008',
            code: 'COOPERATIVE_SAVING',
            nameEn: 'Cooperative Savings',
            nameTh: 'เงินออมสหกรณ์',
            category: 'saving',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2400-001',
            description: 'Cooperative savings deduction',
            descriptionTh: 'หักเงินสะสมสหกรณ์ออมทรัพย์',
            sortOrder: 20
        },
        {
            id: 'DED009',
            code: 'COOPERATIVE_LOAN',
            nameEn: 'Cooperative Loan',
            nameTh: 'เงินกู้สหกรณ์',
            category: 'loan',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2400-002',
            description: 'Cooperative loan repayment',
            descriptionTh: 'หักชำระเงินกู้สหกรณ์',
            sortOrder: 21
        },
        {
            id: 'DED010',
            code: 'HEALTH_INSURANCE',
            nameEn: 'Health Insurance Premium',
            nameTh: 'เบี้ยประกันสุขภาพ',
            category: 'insurance',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2500-001',
            description: 'Additional health insurance premium',
            descriptionTh: 'เบี้ยประกันสุขภาพเพิ่มเติม',
            sortOrder: 30
        },
        {
            id: 'DED011',
            code: 'LIFE_INSURANCE',
            nameEn: 'Life Insurance Premium',
            nameTh: 'เบี้ยประกันชีวิต',
            category: 'insurance',
            mandatory: false,
            calculationType: 'fixed',
            isActive: true,
            glAccountCode: '2500-002',
            description: 'Life insurance premium deduction',
            descriptionTh: 'หักเบี้ยประกันชีวิต',
            sortOrder: 31
        },
        {
            id: 'DED012',
            code: 'ABSENCE',
            nameEn: 'Absence Deduction',
            nameTh: 'หักขาดงาน',
            category: 'other',
            mandatory: false,
            calculationType: 'daily',
            isActive: true,
            glAccountCode: '2600-001',
            description: 'Deduction for unauthorized absence',
            descriptionTh: 'หักเงินสำหรับการขาดงานโดยไม่ได้รับอนุญาต',
            sortOrder: 40
        },
        {
            id: 'DED013',
            code: 'LATE_DEDUCTION',
            nameEn: 'Late Arrival Deduction',
            nameTh: 'หักมาสาย',
            category: 'other',
            mandatory: false,
            calculationType: 'per_occurrence',
            isActive: true,
            glAccountCode: '2600-002',
            description: 'Deduction for late arrivals',
            descriptionTh: 'หักเงินสำหรับการมาสาย',
            sortOrder: 41
        }
    ],

    // Thai tax brackets for 2024 (personal income tax)
    taxBrackets: {
        year: 2024,
        description: 'Thai Personal Income Tax Rates 2024',
        descriptionTh: 'อัตราภาษีเงินได้บุคคลธรรมดา ปี 2567',
        currency: 'THB',
        brackets: [
            {
                minIncome: 0,
                maxIncome: 150000,
                rate: 0,
                label: 'Exempt',
                labelTh: 'ยกเว้น'
            },
            {
                minIncome: 150001,
                maxIncome: 300000,
                rate: 5,
                label: '5%',
                labelTh: '5%'
            },
            {
                minIncome: 300001,
                maxIncome: 500000,
                rate: 10,
                label: '10%',
                labelTh: '10%'
            },
            {
                minIncome: 500001,
                maxIncome: 750000,
                rate: 15,
                label: '15%',
                labelTh: '15%'
            },
            {
                minIncome: 750001,
                maxIncome: 1000000,
                rate: 20,
                label: '20%',
                labelTh: '20%'
            },
            {
                minIncome: 1000001,
                maxIncome: 2000000,
                rate: 25,
                label: '25%',
                labelTh: '25%'
            },
            {
                minIncome: 2000001,
                maxIncome: 5000000,
                rate: 30,
                label: '30%',
                labelTh: '30%'
            },
            {
                minIncome: 5000001,
                maxIncome: null,
                rate: 35,
                label: '35%',
                labelTh: '35%'
            }
        ],
        standardDeductions: {
            personal: 60000,
            spouse: 60000,
            childPerPerson: 30000,
            parentPerPerson: 30000,
            lifeInsuranceMax: 100000,
            healthInsuranceMax: 25000,
            providentFundMax: 500000,
            socialSecurityMax: 9000,
            homeLoanInterestMax: 100000,
            donationMax: 10, // percentage of net income
            shoppingStimulus: 50000 // varies by year
        },
        notes: [
            'Net income after deductions of 60,000 THB personal allowance',
            'First 150,000 THB exempt from tax',
            'Social Security contribution max 750 THB/month'
        ],
        notesTh: [
            'หักค่าใช้จ่ายส่วนตัว 60,000 บาท',
            'เงินได้สุทธิ 150,000 บาทแรก ได้รับยกเว้น',
            'ประกันสังคมหักสูงสุด 750 บาท/เดือน'
        ]
    },

    // Social Security configuration for 2024
    socialSecurityConfig: {
        year: 2024,
        employeeRate: 5.0,
        employerRate: 5.0,
        maxWageBase: 15000,
        maxContribution: 750,
        minWageBase: 1650,
        effectiveDate: '2024-01-01',
        description: 'Social Security contribution rates for 2024',
        descriptionTh: 'อัตราเงินสมทบประกันสังคม ปี 2567',
        components: {
            sickness: 1.5,
            maternity: 0.5,
            invalidity: 1.0,
            death: 0.5,
            childAllowance: 0.5,
            oldAge: 1.0
        }
    },

    // Provident fund configuration
    providentFundConfig: {
        fundName: 'RIS Provident Fund',
        fundNameTh: 'กองทุนสำรองเลี้ยงชีพ RIS',
        licenseNumber: 'PVD-2024-00001',
        minEmployeeRate: 2.0,
        maxEmployeeRate: 15.0,
        minEmployerRate: 2.0,
        maxEmployerRate: 15.0,
        vestingSchedule: [
            { years: 0, percentage: 0 },
            { years: 1, percentage: 20 },
            { years: 2, percentage: 40 },
            { years: 3, percentage: 60 },
            { years: 4, percentage: 80 },
            { years: 5, percentage: 100 }
        ],
        investmentOptions: [
            { code: 'FIXED', nameEn: 'Fixed Income Fund', nameTh: 'กองทุนตราสารหนี้' },
            { code: 'BALANCED', nameEn: 'Balanced Fund', nameTh: 'กองทุนผสม' },
            { code: 'EQUITY', nameEn: 'Equity Fund', nameTh: 'กองทุนตราสารทุน' }
        ]
    },

    // Bank information list (Thai banks)
    banks: [
        {
            code: 'BBL',
            swiftCode: 'BKKBTHBK',
            nameEn: 'Bangkok Bank',
            nameTh: 'ธนาคารกรุงเทพ',
            shortName: 'BBL',
            isActive: true
        },
        {
            code: 'KBANK',
            swiftCode: 'KASITHBK',
            nameEn: 'Kasikorn Bank',
            nameTh: 'ธนาคารกสิกรไทย',
            shortName: 'KBANK',
            isActive: true
        },
        {
            code: 'KTB',
            swiftCode: 'KRABORIBR',
            nameEn: 'Krung Thai Bank',
            nameTh: 'ธนาคารกรุงไทย',
            shortName: 'KTB',
            isActive: true
        },
        {
            code: 'SCB',
            swiftCode: 'SICOTHBK',
            nameEn: 'Siam Commercial Bank',
            nameTh: 'ธนาคารไทยพาณิชย์',
            shortName: 'SCB',
            isActive: true
        },
        {
            code: 'BAY',
            swiftCode: 'AYUDTHBK',
            nameEn: 'Bank of Ayudhya (Krungsri)',
            nameTh: 'ธนาคารกรุงศรีอยุธยา',
            shortName: 'Krungsri',
            isActive: true
        },
        {
            code: 'TMB',
            swiftCode: 'TABORIBK',
            nameEn: 'TMBThanachart Bank',
            nameTh: 'ธนาคารทหารไทยธนชาต',
            shortName: 'TTB',
            isActive: true
        },
        {
            code: 'CIMB',
            swiftCode: 'UBOBTHBK',
            nameEn: 'CIMB Thai Bank',
            nameTh: 'ธนาคารซีไอเอ็มบีไทย',
            shortName: 'CIMB',
            isActive: true
        },
        {
            code: 'UOB',
            swiftCode: 'UOBTTHBK',
            nameEn: 'United Overseas Bank (Thai)',
            nameTh: 'ธนาคารยูโอบี',
            shortName: 'UOB',
            isActive: true
        },
        {
            code: 'TISCO',
            swiftCode: 'TFPCTHB1',
            nameEn: 'TISCO Bank',
            nameTh: 'ธนาคารทิสโก้',
            shortName: 'TISCO',
            isActive: true
        },
        {
            code: 'KKP',
            swiftCode: 'IKIATHBK',
            nameEn: 'Kiatnakin Phatra Bank',
            nameTh: 'ธนาคารเกียรตินาคินภัทร',
            shortName: 'KKP',
            isActive: true
        },
        {
            code: 'LH',
            swiftCode: 'LABORIBK',
            nameEn: 'Land and Houses Bank',
            nameTh: 'ธนาคารแลนด์ แอนด์ เฮ้าส์',
            shortName: 'LH Bank',
            isActive: true
        },
        {
            code: 'GSB',
            swiftCode: 'GABORIBK',
            nameEn: 'Government Savings Bank',
            nameTh: 'ธนาคารออมสิน',
            shortName: 'GSB',
            isActive: true
        },
        {
            code: 'BAAC',
            swiftCode: 'BAABORIBK',
            nameEn: 'Bank for Agriculture and Agricultural Cooperatives',
            nameTh: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร (ธ.ก.ส.)',
            shortName: 'BAAC',
            isActive: true
        }
    ],

    // Earning categories for grouping
    earningCategories: [
        { code: 'regular', nameEn: 'Regular Pay', nameTh: 'เงินเดือนประจำ' },
        { code: 'allowance', nameEn: 'Allowances', nameTh: 'เบี้ยเลี้ยง/ค่าตอบแทน' },
        { code: 'overtime', nameEn: 'Overtime', nameTh: 'ค่าล่วงเวลา' },
        { code: 'variable', nameEn: 'Variable Pay', nameTh: 'ค่าตอบแทนผันแปร' },
        { code: 'bonus', nameEn: 'Bonus', nameTh: 'โบนัส' }
    ],

    // Deduction categories for grouping
    deductionCategories: [
        { code: 'tax', nameEn: 'Taxes', nameTh: 'ภาษี' },
        { code: 'social', nameEn: 'Social Security', nameTh: 'ประกันสังคม' },
        { code: 'provident', nameEn: 'Provident Fund', nameTh: 'กองทุนสำรองเลี้ยงชีพ' },
        { code: 'loan', nameEn: 'Loans', nameTh: 'เงินกู้/สินเชื่อ' },
        { code: 'saving', nameEn: 'Savings', nameTh: 'เงินออม' },
        { code: 'insurance', nameEn: 'Insurance', nameTh: 'ประกันภัย' },
        { code: 'other', nameEn: 'Other Deductions', nameTh: 'หักอื่นๆ' }
    ],

    // Payment methods
    paymentMethods: [
        { code: 'bank_transfer', nameEn: 'Bank Transfer', nameTh: 'โอนเข้าบัญชีธนาคาร' },
        { code: 'cheque', nameEn: 'Cheque', nameTh: 'เช็ค' },
        { code: 'cash', nameEn: 'Cash', nameTh: 'เงินสด' }
    ],

    // Pay frequencies
    payFrequencies: [
        { code: 'monthly', nameEn: 'Monthly', nameTh: 'รายเดือน' },
        { code: 'semi-monthly', nameEn: 'Semi-monthly', nameTh: 'รายปักษ์' },
        { code: 'weekly', nameEn: 'Weekly', nameTh: 'รายสัปดาห์' },
        { code: 'quarterly', nameEn: 'Quarterly', nameTh: 'รายไตรมาส' },
        { code: 'annual', nameEn: 'Annual', nameTh: 'รายปี' },
        { code: 'one-time', nameEn: 'One-time', nameTh: 'ครั้งเดียว' }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockPayrollData;
}

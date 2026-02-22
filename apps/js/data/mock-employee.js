/**
 * Mock Employee Data
 * Sample data matching PRD schema for development and testing
 */

const MockEmployeeData = {
    // Current logged-in user
    currentUser: {
        id: 'user_001',
        employeeId: 'EMP001',
        username: 'chongrak.t',
        role: 'manager', // employee, manager, hr_admin, hr_manager
        permissions: ['view_profile', 'edit_contact', 'edit_emergency', 'view_team', 'approve_workflow']
    },

    // Employee data
    employee: {
        employeeId: 'EMP001',
        photo: 'https://i.pravatar.cc/150?img=11',

        // Personal Information
        personalInfo: {
            salutationEn: 'Mr.',
            salutationTh: 'นาย',
            firstNameEn: 'Chongrak',
            firstNameTh: 'จงรักษ์',
            middleNameEn: '',
            lastNameEn: 'Tanaka',
            lastNameTh: 'ทานากะ',
            nickname: 'Chong',
            gender: 'male',
            dateOfBirth: '1988-05-12',
            nationality: 'Thai',
            nationalId: '1234567890123',
            maritalStatus: 'married',
            maritalStatusSince: '2018-11-15',
            effectiveDate: '2020-01-01'
        },

        // Advanced Personal Information
        advancedInfo: {
            religion: 'buddhist',
            bloodType: 'O+',
            militaryStatus: 'completed',
            visaType: null,
            visaNumber: null,
            visaIssueDate: null,
            visaExpiryDate: null,
            effectiveDate: '2020-01-01'
        },

        // Contact Information
        contactInfo: {
            businessEmail: 'chongrak.t@centralgroup.com',
            personalEmail: 'chongrak.tanaka@gmail.com',
            businessPhone: '+66 2 021 9000',
            personalMobile: '+66 89 123 4567',
            homePhone: '+66 2 987 6543'
        },

        // Address Information
        addresses: [
            {
                id: 'addr_001',
                addressType: 'permanent',
                addressLine1: '123/45 Sukhumvit Road',
                addressLine2: 'Soi Sukhumvit 21',
                subDistrict: 'Khlong Toei Nuea',
                district: 'Watthana',
                province: 'Bangkok',
                postalCode: '10110',
                country: 'Thailand',
                effectiveDate: '2020-01-01'
            },
            {
                id: 'addr_002',
                addressType: 'current',
                addressLine1: '456/78 Silom Complex',
                addressLine2: 'Tower A, Unit 2501',
                subDistrict: 'Silom',
                district: 'Bang Rak',
                province: 'Bangkok',
                postalCode: '10500',
                country: 'Thailand',
                effectiveDate: '2023-06-01'
            }
        ],

        // Emergency Contacts
        emergencyContacts: [
            {
                id: 'ec_001',
                name: 'Yuki Tanaka',
                nameTh: 'ยูกิ ทานากะ',
                relationship: 'spouse',
                phone: '+66 82 345 6789',
                isPrimary: true
            },
            {
                id: 'ec_002',
                name: 'Hiroshi Tanaka',
                nameTh: 'ฮิโรชิ ทานากะ',
                relationship: 'parent',
                phone: '+66 89 012 3456',
                isPrimary: false
            }
        ],

        // Dependents
        dependents: [
            {
                id: 'dep_001',
                name: 'Yuki Tanaka',
                nameTh: 'ยูกิ ทานากะ',
                relationship: 'spouse',
                dateOfBirth: '1990-03-15',
                nationalId: '9876543210123',
                gender: 'female'
            },
            {
                id: 'dep_002',
                name: 'Sakura Tanaka',
                nameTh: 'ซากุระ ทานากะ',
                relationship: 'child',
                dateOfBirth: '2020-06-20',
                nationalId: '1122334455667',
                gender: 'female'
            }
        ],

        // Work Permit Information (for foreign nationals)
        workPermit: {
            permitNumber: 'WP-2024-123456',
            issueDate: '2024-01-15',
            expiryDate: '2026-03-20',
            issuingAuthority: 'Department of Employment, Ministry of Labour',
            status: 'active',
            permitType: 'non_immigrant_b',
            attachmentUrl: '/uploads/permits/WP-2024-123456.pdf'
        },

        // Employment Information
        employmentInfo: {
            details: {
                hireDate: '2015-04-01',
                originalStartDate: '2015-04-01',
                seniorityStartDate: '2015-04-01',
                yearsOfService: '8 years 9 months',
                passProbationDate: '2015-07-01',
                currentJobEffectiveDate: '2022-01-01',
                currentYearsInJob: '2 years',
                currentPositionEffectiveDate: '2022-01-01',
                currentYearsInPosition: '2 years'
            },
            organization: {
                company: 'RIS (C015)',
                position: 'Product Manager (40128307)',
                group: 'CG Thailand (60000000)',
                businessUnit: 'RIS (10000019)',
                function: 'RIS (20000106)',
                department: 'Product Management (30040490)',
                storeBranchCode: 'HO (T020_1295)',
                hrDistrict: 'CU - CG Corporate unit - RIS',
                costCenter: '90991 (C01590991)',
                workLocation: 'Silom Tower (50000128)'
            },
            job: {
                employeeStatus: 'Active',
                supervisorId: 'EMP_SUP001',
                supervisorName: 'Rungrote Amnuaysopon',
                country: 'Thailand',
                jobFamily: 'Digital & IT - Product Owner',
                jobCode: 'Product Owner/Manager TL3',
                jobRole: 'Product Owner/Manager TL3',
                jobType: 'Back Office',
                employeeGroup: 'A - Permanent (A)',
                contractType: 'Regular',
                contractEndDate: null
            },

            // Job Relationships
            jobRelationships: {
                dottedLineManagers: [
                    {
                        id: 'EMP_DL001',
                        name: 'Somchai Sukhothai',
                        nameTh: 'สมชาย สุโขทัย',
                        title: 'Regional Director - APAC Digital',
                        photo: 'https://i.pravatar.cc/150?img=15',
                        email: 'somchai.s@central.co.th',
                        phone: '+66 2 123 4567 ext. 1234'
                    }
                ],
                matrixManagers: [
                    {
                        id: 'EMP_MM001',
                        name: 'Siriporn Rattanakosin',
                        nameTh: 'ศิริพร รัตนโกสินทร์',
                        title: 'Digital Transformation Program Manager',
                        photo: 'https://i.pravatar.cc/150?img=16',
                        email: 'siriporn.r@central.co.th',
                        phone: '+66 2 234 5678 ext. 2345'
                    }
                ],
                hrBusinessPartners: [
                    {
                        id: 'EMP_HRBP001',
                        name: 'Nattaya Ayutthaya',
                        nameTh: 'ณัฐยา อยุธยา',
                        title: 'HR Business Partner - Digital & IT',
                        photo: 'https://i.pravatar.cc/150?img=17',
                        email: 'nattaya.a@central.co.th',
                        phone: '+66 2 345 6789 ext. 3456'
                    }
                ],
                administrativeAssistants: [
                    {
                        id: 'EMP_AA001',
                        name: 'Pornpimol Chiang Mai',
                        nameTh: 'พรพิมล เชียงใหม่',
                        title: 'Executive Assistant to CTO',
                        photo: 'https://i.pravatar.cc/150?img=18',
                        email: 'pornpimol.c@central.co.th',
                        phone: '+66 2 456 7890 ext. 4567'
                    }
                ]
            }
        },

        // Organization Chart (matching real org structure)
        orgChart: {
            employee: {
                id: 'EMP001',
                name: 'Chongrak Tanaka',
                nameTh: 'จงรักษ์ ทานากะ',
                title: 'Product Manager',
                titleTh: 'ผู้จัดการผลิตภัณฑ์',
                photo: 'https://i.pravatar.cc/150?img=11',
                headcount: 2,
                totalHeadcount: 2
            },
            supervisor: {
                id: 'EMP_SUP001',
                name: 'Rungrote Amnuaysopon',
                nameTh: 'รุ่งโรจน์ อำนวยสพน',
                title: 'Head of Product',
                titleTh: 'หัวหน้าฝ่ายผลิตภัณฑ์',
                photo: 'https://i.pravatar.cc/150?img=12',
                headcount: 7,
                totalHeadcount: 9
            },
            supervisorOfSupervisor: {
                id: 'EMP_SUP002',
                name: 'Kajorn Kanjanawarin',
                nameTh: 'ขจร กาญจนวรินทร์',
                title: 'Head of IT Strategy & Products',
                titleTh: 'หัวหน้าฝ่ายกลยุทธ์ไอทีและผลิตภัณฑ์',
                photo: 'https://i.pravatar.cc/150?img=13',
                headcount: 20,
                totalHeadcount: 129
            },
            // Extended hierarchy (for full org chart view)
            extendedHierarchy: [
                {
                    id: 'EMP_L3',
                    name: 'Maneerat Suramethakul',
                    nameTh: 'มณีรัตน์ สุระเมทกุล',
                    title: 'Head of IT Strategy, Application & International',
                    titleTh: 'หัวหน้าฝ่ายกลยุทธ์ไอที แอปพลิเคชันและต่างประเทศ',
                    photo: 'https://i.pravatar.cc/150?img=20',
                    headcount: 7,
                    totalHeadcount: 266
                },
                {
                    id: 'EMP_L2',
                    name: 'Rutchapon Vongsatitporn',
                    nameTh: 'รัชพล วงศ์สถิตย์พร',
                    title: 'CIO',
                    titleTh: 'ประธานเจ้าหน้าที่ฝ่ายสารสนเทศ',
                    photo: 'https://i.pravatar.cc/150?img=21',
                    headcount: 5,
                    totalHeadcount: 465
                },
                {
                    id: 'EMP_L1',
                    name: 'Suthisarn Chirathivat',
                    nameTh: 'สุทธิศาสน์ จิราธิวัฒน์',
                    title: 'CEO - CRC',
                    titleTh: 'ประธานเจ้าหน้าที่บริหาร - CRC',
                    photo: 'https://i.pravatar.cc/150?img=22',
                    headcount: 18,
                    totalHeadcount: 59002
                },
                {
                    id: 'EMP_L0',
                    name: 'Tos Chirathivat',
                    nameTh: 'ทศ จิราธิวัฒน์',
                    title: 'Executive Chairman & CEO',
                    titleTh: 'ประธานกรรมการบริหารและประธานเจ้าหน้าที่บริหาร',
                    photo: 'https://i.pravatar.cc/150?img=23',
                    headcount: 16,
                    totalHeadcount: 67704
                }
            ],
            directReports: [
                {
                    id: 'EMP_DR001',
                    name: 'Naruechon Woraphatphawan',
                    nameTh: 'นฤชล วรพัฒน์พาวัลย์',
                    title: 'Functional Trainee (ProNext)',
                    titleTh: 'พนักงานฝึกหัด (ProNext)',
                    photo: 'https://i.pravatar.cc/150?img=14'
                },
                {
                    id: 'EMP_DR002',
                    name: 'Punnapa Thianchai',
                    nameTh: 'ปุณณภา เทียนชัย',
                    title: 'Functional Trainee (ProNext)',
                    titleTh: 'พนักงานฝึกหัด (ProNext)',
                    photo: 'https://i.pravatar.cc/150?img=15'
                }
            ]
        },

        // Compensation
        compensation: {
            paymentInfo: {
                jobCountry: 'Thailand',
                paymentMethod: 'Direct Deposit',
                payType: 'Monthly',
                bank: 'Bangkok Bank',
                accountNumber: '1234567890' // Will be masked
            },
            payroll: {
                grossAmount: 120000,
                currency: 'THB'
            }
        },

        // Detailed Payslips (last 12 months)
        detailedPayslips: [
            {
                id: 'ps_202512',
                employeeId: 'EMP001',
                period: { month: 12, year: 2025, label: 'December 2025', labelTh: 'ธันวาคม 2568' },
                payDate: '2025-12-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 5000,
                    otherEarnings: 0,
                    total: 120000
                },
                deductions: {
                    tax: 12500,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 750,
                    total: 25000
                },
                netPay: 95000,
                ytd: { grossPay: 1440000, tax: 150000, socialSecurity: 9000, providentFund: 72000 }
            },
            {
                id: 'ps_202511',
                employeeId: 'EMP001',
                period: { month: 11, year: 2025, label: 'November 2025', labelTh: 'พฤศจิกายน 2568' },
                payDate: '2025-11-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 3500,
                    otherEarnings: 0,
                    total: 118500
                },
                deductions: {
                    tax: 12300,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 450,
                    total: 24500
                },
                netPay: 94000,
                ytd: { grossPay: 1320000, tax: 137500, socialSecurity: 8250, providentFund: 66000 }
            },
            {
                id: 'ps_202510',
                employeeId: 'EMP001',
                period: { month: 10, year: 2025, label: 'October 2025', labelTh: 'ตุลาคม 2568' },
                payDate: '2025-10-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 2000,
                    otherEarnings: 3000,
                    total: 120000
                },
                deductions: {
                    tax: 12500,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 750,
                    total: 25000
                },
                netPay: 95000,
                ytd: { grossPay: 1201500, tax: 125200, socialSecurity: 7500, providentFund: 60000 }
            },
            {
                id: 'ps_202509',
                employeeId: 'EMP001',
                period: { month: 9, year: 2025, label: 'September 2025', labelTh: 'กันยายน 2568' },
                payDate: '2025-09-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 4500,
                    otherEarnings: 0,
                    total: 119500
                },
                deductions: {
                    tax: 12400,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 350,
                    total: 24500
                },
                netPay: 95000,
                ytd: { grossPay: 1081500, tax: 112700, socialSecurity: 6750, providentFund: 54000 }
            },
            {
                id: 'ps_202508',
                employeeId: 'EMP001',
                period: { month: 8, year: 2025, label: 'August 2025', labelTh: 'สิงหาคม 2568' },
                payDate: '2025-08-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 6000,
                    otherEarnings: 0,
                    total: 121000
                },
                deductions: {
                    tax: 12600,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 650,
                    total: 25000
                },
                netPay: 96000,
                ytd: { grossPay: 962000, tax: 100300, socialSecurity: 6000, providentFund: 48000 }
            },
            {
                id: 'ps_202507',
                employeeId: 'EMP001',
                period: { month: 7, year: 2025, label: 'July 2025', labelTh: 'กรกฎาคม 2568' },
                payDate: '2025-07-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 3000,
                    otherEarnings: 2000,
                    total: 120000
                },
                deductions: {
                    tax: 12500,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 750,
                    total: 25000
                },
                netPay: 95000,
                ytd: { grossPay: 841000, tax: 87700, socialSecurity: 5250, providentFund: 42000 }
            },
            {
                id: 'ps_202506',
                employeeId: 'EMP001',
                period: { month: 6, year: 2025, label: 'June 2025', labelTh: 'มิถุนายน 2568' },
                payDate: '2025-06-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 4000,
                    otherEarnings: 0,
                    total: 119000
                },
                deductions: {
                    tax: 12350,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 400,
                    total: 24500
                },
                netPay: 94500,
                ytd: { grossPay: 721000, tax: 75200, socialSecurity: 4500, providentFund: 36000 }
            },
            {
                id: 'ps_202505',
                employeeId: 'EMP001',
                period: { month: 5, year: 2025, label: 'May 2025', labelTh: 'พฤษภาคม 2568' },
                payDate: '2025-05-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 2500,
                    otherEarnings: 2500,
                    total: 120000
                },
                deductions: {
                    tax: 12500,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 750,
                    total: 25000
                },
                netPay: 95000,
                ytd: { grossPay: 602000, tax: 62850, socialSecurity: 3750, providentFund: 30000 }
            },
            {
                id: 'ps_202504',
                employeeId: 'EMP001',
                period: { month: 4, year: 2025, label: 'April 2025', labelTh: 'เมษายน 2568' },
                payDate: '2025-04-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 1500,
                    otherEarnings: 0,
                    total: 116500
                },
                deductions: {
                    tax: 12100,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 150,
                    total: 24000
                },
                netPay: 92500,
                ytd: { grossPay: 482000, tax: 50350, socialSecurity: 3000, providentFund: 24000 }
            },
            {
                id: 'ps_202503',
                employeeId: 'EMP001',
                period: { month: 3, year: 2025, label: 'March 2025', labelTh: 'มีนาคม 2568' },
                payDate: '2025-03-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 5500,
                    otherEarnings: 0,
                    total: 120500
                },
                deductions: {
                    tax: 12550,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 700,
                    total: 25000
                },
                netPay: 95500,
                ytd: { grossPay: 365500, tax: 38250, socialSecurity: 2250, providentFund: 18000 }
            },
            {
                id: 'ps_202502',
                employeeId: 'EMP001',
                period: { month: 2, year: 2025, label: 'February 2025', labelTh: 'กุมภาพันธ์ 2568' },
                payDate: '2025-02-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 3000,
                    otherEarnings: 2000,
                    total: 120000
                },
                deductions: {
                    tax: 12500,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 750,
                    total: 25000
                },
                netPay: 95000,
                ytd: { grossPay: 245000, tax: 25700, socialSecurity: 1500, providentFund: 12000 }
            },
            {
                id: 'ps_202501',
                employeeId: 'EMP001',
                period: { month: 1, year: 2025, label: 'January 2025', labelTh: 'มกราคม 2568' },
                payDate: '2025-01-25',
                earnings: {
                    baseSalary: 95000,
                    positionAllowance: 15000,
                    colAllowance: 5000,
                    overtime: 4000,
                    otherEarnings: 6000,
                    total: 125000
                },
                deductions: {
                    tax: 13200,
                    socialSecurity: 750,
                    providentFund: 6000,
                    loans: 5000,
                    otherDeductions: 1050,
                    total: 26000
                },
                netPay: 99000,
                ytd: { grossPay: 125000, tax: 13200, socialSecurity: 750, providentFund: 6000 }
            }
        ],

        // Legacy payslips for backward compatibility
        payslips: [
            { id: 'ps_202312', period: 'December 2023', payDate: '2023-12-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202311', period: 'November 2023', payDate: '2023-11-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202310', period: 'October 2023', payDate: '2023-10-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202309', period: 'September 2023', payDate: '2023-09-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202308', period: 'August 2023', payDate: '2023-08-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202307', period: 'July 2023', payDate: '2023-07-25', grossAmount: 120000, netAmount: 95000 }
        ],

        // Tax Documents (expanded)
        taxDocuments: [
            {
                id: 'tax_2025_50tawi',
                type: 'withholding_cert',
                typeNameEn: 'Withholding Tax Certificate (50 ทวิ)',
                typeNameTh: 'หนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ)',
                taxYear: 2025,
                issueDate: '2026-01-15',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2025_ss',
                type: 'social_security',
                typeNameEn: 'Social Security Statement',
                typeNameTh: 'ใบแจ้งยอดประกันสังคม',
                taxYear: 2025,
                issueDate: '2026-01-20',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2025_pf',
                type: 'provident_fund',
                typeNameEn: 'Provident Fund Statement',
                typeNameTh: 'ใบแจ้งยอดกองทุนสำรองเลี้ยงชีพ',
                taxYear: 2025,
                issueDate: '2026-01-25',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2024_50tawi',
                type: 'withholding_cert',
                typeNameEn: 'Withholding Tax Certificate (50 ทวิ)',
                typeNameTh: 'หนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ)',
                taxYear: 2024,
                issueDate: '2025-01-15',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2024_ss',
                type: 'social_security',
                typeNameEn: 'Social Security Statement',
                typeNameTh: 'ใบแจ้งยอดประกันสังคม',
                taxYear: 2024,
                issueDate: '2025-01-20',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2024_pf',
                type: 'provident_fund',
                typeNameEn: 'Provident Fund Statement',
                typeNameTh: 'ใบแจ้งยอดกองทุนสำรองเลี้ยงชีพ',
                taxYear: 2024,
                issueDate: '2025-01-25',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2023_50tawi',
                type: 'withholding_cert',
                typeNameEn: 'Withholding Tax Certificate (50 ทวิ)',
                typeNameTh: 'หนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ)',
                taxYear: 2023,
                issueDate: '2024-01-15',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2023_ss',
                type: 'social_security',
                typeNameEn: 'Social Security Statement',
                typeNameTh: 'ใบแจ้งยอดประกันสังคม',
                taxYear: 2023,
                issueDate: '2024-01-20',
                employeeId: 'EMP001'
            },
            {
                id: 'tax_2023_pf',
                type: 'provident_fund',
                typeNameEn: 'Provident Fund Statement',
                typeNameTh: 'ใบแจ้งยอดกองทุนสำรองเลี้ยงชีพ',
                taxYear: 2023,
                issueDate: '2024-01-25',
                employeeId: 'EMP001'
            }
        ],

        // Benefits
        benefits: {
            enrollments: [
                {
                    id: 'ben_001',
                    planName: 'Group Health Insurance - Plan A',
                    planType: 'Health',
                    coverage: 'Employee + Family',
                    enrollmentDate: '2015-04-01',
                    effectiveDate: '2015-04-01',
                    status: 'Active',
                    dependentsCovered: 2
                },
                {
                    id: 'ben_002',
                    planName: 'Life Insurance',
                    planType: 'Life',
                    coverage: '3x Annual Salary',
                    enrollmentDate: '2015-04-01',
                    effectiveDate: '2015-04-01',
                    status: 'Active',
                    dependentsCovered: 0
                },
                {
                    id: 'ben_003',
                    planName: 'Provident Fund',
                    planType: 'Retirement',
                    coverage: '5% Employee + 5% Employer',
                    enrollmentDate: '2015-04-01',
                    effectiveDate: '2015-04-01',
                    status: 'Active',
                    dependentsCovered: 0
                }
            ]
        },

        // Profile Details
        profileDetails: {
            education: [
                {
                    id: 'edu_001',
                    degree: "Master's Degree",
                    institution: 'Chulalongkorn University',
                    major: 'Business Administration',
                    graduationYear: 2012
                },
                {
                    id: 'edu_002',
                    degree: "Bachelor's Degree",
                    institution: 'Thammasat University',
                    major: 'Computer Science',
                    graduationYear: 2008
                }
            ],
            previousEmployment: [
                {
                    id: 'prev_001',
                    companyName: 'Agoda Services',
                    jobTitle: 'Senior Product Analyst',
                    startDate: '2012-06-01',
                    endDate: '2015-03-31'
                },
                {
                    id: 'prev_002',
                    companyName: 'True Corporation',
                    jobTitle: 'Business Analyst',
                    startDate: '2008-07-01',
                    endDate: '2012-05-31'
                }
            ],
            languages: [
                { id: 'lang_001', language: 'Thai', speaking: 'Native', reading: 'Native', writing: 'Native' },
                { id: 'lang_002', language: 'English', speaking: 'Fluent', reading: 'Fluent', writing: 'Fluent' },
                { id: 'lang_003', language: 'Japanese', speaking: 'Basic', reading: 'Basic', writing: 'Basic' }
            ],
            certifications: [
                {
                    id: 'cert_001',
                    name: 'Certified Scrum Product Owner (CSPO)',
                    issuer: 'Scrum Alliance',
                    issueDate: '2020-03-15',
                    expiryDate: '2026-03-15'
                },
                {
                    id: 'cert_002',
                    name: 'AWS Certified Solutions Architect',
                    issuer: 'Amazon Web Services',
                    issueDate: '2021-08-20',
                    expiryDate: '2024-08-20'
                }
            ],
            awards: [
                {
                    id: 'award_001',
                    name: 'Employee of the Year',
                    issuer: 'Central Group',
                    date: '2022-12-15'
                },
                {
                    id: 'award_002',
                    name: 'Innovation Award',
                    issuer: 'RIS',
                    date: '2021-06-30'
                }
            ],
            mobility: {
                willingToRelocate: true,
                preferredLocations: ['Bangkok', 'Singapore', 'Hong Kong']
            },
            eLetters: [
                {
                    id: 'eletter_001',
                    letterType: 'annual_bonus',
                    title: 'Annual Bonus Letter FY2023',
                    fiscalYear: '2023',
                    issueDate: '2024-01-15',
                    downloadUrl: '/api/documents/eletter_001.pdf'
                },
                {
                    id: 'eletter_002',
                    letterType: 'merit_increment',
                    title: 'Merit Increment Letter FY2023',
                    fiscalYear: '2023',
                    issueDate: '2023-04-01',
                    downloadUrl: '/api/documents/eletter_002.pdf'
                },
                {
                    id: 'eletter_003',
                    letterType: 'annual_bonus',
                    title: 'Annual Bonus Letter FY2022',
                    fiscalYear: '2022',
                    issueDate: '2023-01-15',
                    downloadUrl: '/api/documents/eletter_003.pdf'
                }
            ],
            learningHistory: [
                {
                    id: 'learning_001',
                    courseName: 'CG Leadership Development Program',
                    courseCode: 'LDP-2023',
                    provider: 'Central Group Academy',
                    startDate: '2023-01-10',
                    endDate: '2023-06-30',
                    status: 'completed',
                    completionDate: '2023-06-30',
                    certificateUrl: '/api/documents/cert_learning_001.pdf',
                    credits: 40
                },
                {
                    id: 'learning_002',
                    courseName: 'Advanced Product Management',
                    courseCode: 'APM-101',
                    provider: 'Product School',
                    startDate: '2023-08-01',
                    endDate: '2023-10-31',
                    status: 'completed',
                    completionDate: '2023-10-31',
                    certificateUrl: '/api/documents/cert_learning_002.pdf',
                    credits: 20
                },
                {
                    id: 'learning_003',
                    courseName: 'Fire Safety Training',
                    courseCode: 'FST-2024',
                    provider: 'Central Group Safety',
                    startDate: '2024-01-15',
                    endDate: '2024-01-15',
                    status: 'completed',
                    completionDate: '2024-01-15',
                    certificateUrl: '/api/documents/cert_learning_003.pdf',
                    credits: 4
                },
                {
                    id: 'learning_004',
                    courseName: 'AI for Product Managers',
                    courseCode: 'AI-PM-2024',
                    provider: 'Online Learning Platform',
                    startDate: '2024-03-01',
                    endDate: '2024-05-31',
                    status: 'in_progress',
                    completionDate: null,
                    certificateUrl: null,
                    credits: 15
                },
                {
                    id: 'learning_005',
                    courseName: 'Data Analytics Fundamentals',
                    courseCode: 'DAF-2024',
                    provider: 'Central Group Academy',
                    startDate: '2024-06-01',
                    endDate: '2024-08-31',
                    status: 'registered',
                    completionDate: null,
                    certificateUrl: null,
                    credits: 12
                }
            ],
            ohsCertificates: [
                {
                    id: 'ohs_cert_001',
                    certificateName: 'First Aid Certificate',
                    certificateNumber: 'FA-2023-001234',
                    issuer: 'Thai Red Cross Society',
                    issueDate: '2023-03-15',
                    expiryDate: '2026-03-15',
                    status: 'active'
                },
                {
                    id: 'ohs_cert_002',
                    certificateName: 'Fire Warden Certificate',
                    certificateNumber: 'FW-2023-005678',
                    issuer: 'Central Group Safety Department',
                    issueDate: '2023-06-20',
                    expiryDate: '2025-06-20',
                    status: 'expiring_soon'
                },
                {
                    id: 'ohs_cert_003',
                    certificateName: 'Basic Occupational Health and Safety',
                    certificateNumber: 'OHS-2022-009012',
                    issuer: 'Ministry of Labour',
                    issueDate: '2022-01-10',
                    expiryDate: '2024-01-10',
                    status: 'expired'
                }
            ],
            ohsDocuments: [
                {
                    id: 'ohs_doc_001',
                    documentName: 'Workplace Safety Assessment 2023',
                    documentType: 'Assessment Report',
                    issueDate: '2023-12-01',
                    downloadUrl: '/api/documents/ohs_doc_001.pdf',
                    description: 'Annual workplace safety assessment and recommendations'
                },
                {
                    id: 'ohs_doc_002',
                    documentName: 'Emergency Evacuation Plan',
                    documentType: 'Procedure',
                    issueDate: '2023-06-15',
                    downloadUrl: '/api/documents/ohs_doc_002.pdf',
                    description: 'Building evacuation procedures and assembly points'
                },
                {
                    id: 'ohs_doc_003',
                    documentName: 'Chemical Handling Guidelines',
                    documentType: 'Guidelines',
                    issueDate: '2023-08-20',
                    downloadUrl: '/api/documents/ohs_doc_003.pdf',
                    description: 'Safe handling procedures for workplace chemicals'
                },
                {
                    id: 'ohs_doc_004',
                    documentName: 'COVID-19 Safety Protocol',
                    documentType: 'Protocol',
                    issueDate: '2023-01-05',
                    downloadUrl: '/api/documents/ohs_doc_004.pdf',
                    description: 'Workplace pandemic safety measures and guidelines'
                }
            ],
            individualDocuments: [
                {
                    id: 'ind_doc_001',
                    documentName: 'Performance Review 2023',
                    documentType: 'Performance Review',
                    uploadDate: '2024-01-15T10:30:00Z',
                    fileSize: '524288',
                    downloadUrl: '/api/documents/ind_doc_001.pdf',
                    uploadedBy: 'Prawit Wongsuwan'
                },
                {
                    id: 'ind_doc_002',
                    documentName: 'Training Acknowledgement Form',
                    documentType: 'Acknowledgement',
                    uploadDate: '2023-06-20T14:15:00Z',
                    fileSize: '102400',
                    downloadUrl: '/api/documents/ind_doc_002.pdf',
                    uploadedBy: 'Chatchai Tangsiri'
                },
                {
                    id: 'ind_doc_003',
                    documentName: 'Confidentiality Agreement',
                    documentType: 'Agreement',
                    uploadDate: '2023-04-10T09:00:00Z',
                    fileSize: '204800',
                    downloadUrl: '/api/documents/ind_doc_003.pdf',
                    uploadedBy: 'HR Department'
                },
                {
                    id: 'ind_doc_004',
                    documentName: 'Equipment Assignment Form',
                    documentType: 'Assignment',
                    uploadDate: '2023-03-05T11:45:00Z',
                    fileSize: '153600',
                    downloadUrl: '/api/documents/ind_doc_004.pdf',
                    uploadedBy: 'IT Department'
                }
            ]
        },

        // Change History
        history: {
            personalInfo: [
                {
                    id: 'hist_001',
                    field: 'maritalStatus',
                    oldValue: 'Single',
                    newValue: 'Married',
                    changedBy: 'Chatchai Tangsiri',
                    changedAt: '2015-06-20T10:30:00Z',
                    effectiveDate: '2015-06-20'
                }
            ],
            contactInfo: [
                {
                    id: 'hist_002',
                    field: 'personalMobile',
                    oldValue: '+66 81 111 2222',
                    newValue: '+66 81 234 5678',
                    changedBy: 'Chatchai Tangsiri',
                    changedAt: '2023-01-15T14:20:00Z',
                    effectiveDate: '2023-01-15'
                }
            ],
            addresses: [
                {
                    id: 'hist_003',
                    field: 'currentAddress',
                    oldValue: '789 Ratchada Road',
                    newValue: '456/78 Silom Complex',
                    changedBy: 'Chatchai Tangsiri',
                    changedAt: '2023-06-01T09:00:00Z',
                    effectiveDate: '2023-06-01'
                }
            ]
        },

        // Scorecard
        scorecard: {
            competencies: [
                {
                    id: 'comp_001',
                    name: 'Driving for Profitable Growth',
                    nameTh: 'ขับเคลื่อนการเติบโตอย่างมีกำไร',
                    rating: 4,
                    description: 'Consistently delivers profitable growth through strategic initiatives and market expansion.'
                },
                {
                    id: 'comp_002',
                    name: 'Striving to Meet Customer Satisfaction',
                    nameTh: 'มุ่งมั่นสร้างความพึงพอใจให้ลูกค้า',
                    rating: 5,
                    description: 'Exceeds customer expectations through innovative product solutions and responsive service.'
                },
                {
                    id: 'comp_003',
                    name: 'Building Organization Excellence',
                    nameTh: 'สร้างความเป็นเลิศให้องค์กร',
                    rating: 4,
                    description: 'Establishes best practices and drives operational improvements across the organization.'
                },
                {
                    id: 'comp_004',
                    name: 'Promoting Sustainable Collaborations',
                    nameTh: 'ส่งเสริมความร่วมมืออย่างยั่งยืน',
                    rating: 4,
                    description: 'Builds strong cross-functional partnerships and fosters a collaborative team culture.'
                },
                {
                    id: 'comp_005',
                    name: 'Developing People',
                    nameTh: 'พัฒนาบุคลากร',
                    rating: 5,
                    description: 'Actively mentors team members and creates opportunities for professional growth.'
                },
                {
                    id: 'comp_006',
                    name: 'Leading Innovation',
                    nameTh: 'นำนวัตกรรม',
                    rating: 4,
                    description: 'Champions innovative approaches and drives digital transformation initiatives.'
                }
            ],
            assessmentHistory: [
                {
                    id: 'assess_001',
                    program: '2023 Mid-Year Review',
                    programTh: 'การประเมินกลางปี 2023',
                    assessmentDate: '2023-06-30',
                    assessor: 'Prawit Wongsuwan',
                    status: 'Completed'
                },
                {
                    id: 'assess_002',
                    program: '2022 Annual Performance Review',
                    programTh: 'การประเมินประจำปี 2022',
                    assessmentDate: '2022-12-31',
                    assessor: 'Prawit Wongsuwan',
                    status: 'Completed'
                },
                {
                    id: 'assess_003',
                    program: '2022 Mid-Year Review',
                    programTh: 'การประเมินกลางปี 2022',
                    assessmentDate: '2022-06-30',
                    assessor: 'Prawit Wongsuwan',
                    status: 'Completed'
                }
            ],
            assessmentSummary: {
                overallRating: 4.3,
                ratingLabel: 'Exceeds Expectations',
                ratingLabelTh: 'เกินความคาดหวัง',
                period: '2023',
                summary: 'Chatchai consistently exceeds expectations across all competency areas. His leadership in product innovation and team development has been exceptional.'
            },
            keySuccesses: [
                {
                    id: 'success_001',
                    title: 'Launched New Mobile App Platform',
                    titleTh: 'เปิดตัวแพลตฟอร์มแอปมือถือใหม่',
                    description: 'Led the successful launch of the new mobile commerce platform, achieving 200% of target user adoption within first quarter.',
                    date: '2023-03-15',
                    impact: 'High'
                },
                {
                    id: 'success_002',
                    title: 'Customer Satisfaction Improvement',
                    titleTh: 'ปรับปรุงความพึงพอใจของลูกค้า',
                    description: 'Implemented customer feedback loop resulting in 30% increase in customer satisfaction scores.',
                    date: '2023-06-20',
                    impact: 'High'
                },
                {
                    id: 'success_003',
                    title: 'Team Development Initiative',
                    titleTh: 'โครงการพัฒนาทีม',
                    description: 'Established mentoring program that improved team performance metrics by 25%.',
                    date: '2023-09-10',
                    impact: 'Medium'
                }
            ],
            strengths: [
                {
                    id: 'strength_001',
                    area: 'Strategic Thinking',
                    areaTh: 'การคิดเชิงกลยุทธ์',
                    description: 'Demonstrates excellent ability to align product roadmap with business objectives.'
                },
                {
                    id: 'strength_002',
                    area: 'Leadership',
                    areaTh: 'ภาวะผู้นำ',
                    description: 'Effectively leads and motivates cross-functional teams to achieve ambitious goals.'
                },
                {
                    id: 'strength_003',
                    area: 'Innovation',
                    areaTh: 'นวัตกรรม',
                    description: 'Consistently brings creative solutions and drives digital transformation.'
                }
            ],
            developmentAreas: [
                {
                    id: 'dev_001',
                    area: 'Financial Acumen',
                    areaTh: 'ความเข้าใจทางการเงิน',
                    description: 'Could benefit from deeper understanding of financial modeling and P&L management.',
                    priority: 'Medium'
                },
                {
                    id: 'dev_002',
                    area: 'Regional Market Knowledge',
                    areaTh: 'ความรู้ตลาดภูมิภาค',
                    description: 'Opportunity to expand knowledge of Southeast Asian market dynamics.',
                    priority: 'Low'
                }
            ],
            careerAspirations: {
                shortTerm: {
                    goal: 'Senior Product Manager',
                    goalTh: 'ผู้จัดการผลิตภัณฑ์อาวุโส',
                    timeframe: '1-2 years',
                    description: 'Advance to senior product management role with P&L responsibility.'
                },
                longTerm: {
                    goal: 'Head of Product',
                    goalTh: 'หัวหน้าฝ่ายผลิตภัณฑ์',
                    timeframe: '3-5 years',
                    description: 'Lead product organization and drive overall product strategy for business unit.'
                }
            },
            developmentObjectives: [
                {
                    id: 'obj_001',
                    objective: 'Complete MBA Program',
                    objectiveTh: 'จบหลักสูตร MBA',
                    description: 'Enroll in executive MBA program to strengthen business and financial skills.',
                    targetDate: '2025-12-31',
                    progress: 30,
                    status: 'In Progress'
                },
                {
                    id: 'obj_002',
                    objective: 'Regional Market Expansion Project',
                    objectiveTh: 'โครงการขยายตลาดภูมิภาค',
                    description: 'Lead product launch in Vietnam and Philippines markets.',
                    targetDate: '2024-06-30',
                    progress: 60,
                    status: 'In Progress'
                },
                {
                    id: 'obj_003',
                    objective: 'Mentorship Program',
                    objectiveTh: 'โปรแกรมการให้คำปรึกษา',
                    description: 'Mentor 2-3 junior product managers over next year.',
                    targetDate: '2024-12-31',
                    progress: 45,
                    status: 'In Progress'
                }
            ],
            talentReference: {
                talentPool: 'High Potential',
                talentPoolTh: 'ศักยภาพสูง',
                potentialRating: 'High',
                readinessForPromotion: 'Ready Now',
                readinessForPromotionTh: 'พร้อมในปัจจุบัน',
                successionPosition: 'Head of Product',
                notes: 'Strong candidate for senior leadership roles. Demonstrates high potential for advancement.'
            },
            performancePotentialMatrix: {
                performance: 3, // 1=Low, 2=Medium, 3=High
                potential: 3,   // 1=Low, 2=Medium, 3=High
                boxPosition: 9, // Top-right box (High Performance + High Potential = Stars)
                boxLabel: 'Stars',
                boxLabelTh: 'ดาว'
            },
            finalCalibration: {
                overallRating: 4.3,
                ratingLabel: 'Exceeds Expectations',
                ratingLabelTh: 'เกินความคาดหวัง',
                calibrationDate: '2023-12-15',
                calibratedBy: 'Suthep Thuaksuban',
                calibratedByTitle: 'CTO',
                comments: 'Chatchai has demonstrated exceptional performance and leadership. Recommended for accelerated development track and senior role consideration.'
            }
        }
    },

    // Leave Balances
    leaveBalances: {
        annual: {
            type: 'annual',
            nameEn: 'Annual Leave',
            nameTh: 'วันลาพักร้อน',
            entitled: 15,
            used: 8,
            pending: 2,
            remaining: 5,
            carryOver: 5,
            expiryDate: '2026-03-31'
        },
        sick: {
            type: 'sick',
            nameEn: 'Sick Leave',
            nameTh: 'วันลาป่วย',
            entitled: 30,
            used: 3,
            pending: 0,
            remaining: 27,
            requiresMedicalCert: true,
            medicalCertDays: 3
        },
        personal: {
            type: 'personal',
            nameEn: 'Personal Leave',
            nameTh: 'วันลากิจ',
            entitled: 3,
            used: 1,
            pending: 0,
            remaining: 2
        },
        maternity: {
            type: 'maternity',
            nameEn: 'Maternity Leave',
            nameTh: 'วันลาคลอดบุตร',
            entitled: 98,
            used: 0,
            pending: 0,
            remaining: 98,
            applicableGender: 'female'
        },
        paternity: {
            type: 'paternity',
            nameEn: 'Paternity Leave',
            nameTh: 'วันลาดูแลบุตร',
            entitled: 15,
            used: 0,
            pending: 0,
            remaining: 15,
            applicableGender: 'male'
        },
        ordination: {
            type: 'ordination',
            nameEn: 'Ordination Leave',
            nameTh: 'วันลาบวช',
            entitled: 15,
            used: 0,
            pending: 0,
            remaining: 15,
            applicableGender: 'male',
            maxPerCareer: 1
        },
        military: {
            type: 'military',
            nameEn: 'Military Leave',
            nameTh: 'วันลาทหาร',
            entitled: 60,
            used: 0,
            pending: 0,
            remaining: 60,
            applicableGender: 'male',
            nationality: 'Thai'
        },
        compensatory: {
            type: 'compensatory',
            nameEn: 'Compensatory Leave',
            nameTh: 'วันหยุดชดเชย',
            entitled: 3,
            used: 1,
            pending: 0,
            remaining: 2,
            expiryDate: '2026-12-31'
        }
    },

    // Leave Requests History
    leaveRequests: [
        {
            id: 'LR001',
            employeeId: 'EMP001',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'วันลาพักร้อน',
            startDate: '2025-12-23',
            endDate: '2025-12-27',
            days: 3,
            halfDay: null,
            reason: 'Year-end vacation with family',
            reasonTh: 'ลาพักร้อนช่วงปีใหม่กับครอบครัว',
            substitutePersonId: 'EMP_DR001',
            substitutePersonName: 'Natthapong Chai',
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-12-15',
            submittedAt: '2025-12-10T09:30:00Z',
            comments: null
        },
        {
            id: 'LR002',
            employeeId: 'EMP001',
            type: 'sick',
            typeNameEn: 'Sick Leave',
            typeNameTh: 'วันลาป่วย',
            startDate: '2025-11-18',
            endDate: '2025-11-19',
            days: 2,
            halfDay: null,
            reason: 'Flu symptoms, need rest',
            reasonTh: 'มีอาการไข้หวัด ต้องการพักผ่อน',
            substitutePersonId: null,
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-11-18',
            submittedAt: '2025-11-18T08:00:00Z',
            comments: null
        },
        {
            id: 'LR003',
            employeeId: 'EMP001',
            type: 'personal',
            typeNameEn: 'Personal Leave',
            typeNameTh: 'วันลากิจ',
            startDate: '2025-10-15',
            endDate: '2025-10-15',
            days: 1,
            halfDay: null,
            reason: 'Personal business at bank',
            reasonTh: 'ธุระส่วนตัวที่ธนาคาร',
            substitutePersonId: null,
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-10-14',
            submittedAt: '2025-10-12T14:00:00Z',
            comments: null
        },
        {
            id: 'LR004',
            employeeId: 'EMP001',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'วันลาพักร้อน',
            startDate: '2026-01-20',
            endDate: '2026-01-24',
            days: 5,
            halfDay: null,
            reason: 'Family trip to Chiang Mai',
            reasonTh: 'เดินทางไปเที่ยวเชียงใหม่กับครอบครัว',
            substitutePersonId: 'EMP_DR002',
            substitutePersonName: 'Siriporn Kaewdee',
            attachments: [],
            status: 'pending',
            approvedBy: null,
            approvedByName: null,
            approvedDate: null,
            submittedAt: '2026-01-08T10:15:00Z',
            comments: null
        },
        {
            id: 'LR005',
            employeeId: 'EMP001',
            type: 'compensatory',
            typeNameEn: 'Compensatory Leave',
            typeNameTh: 'วันหยุดชดเชย',
            startDate: '2025-09-05',
            endDate: '2025-09-05',
            days: 1,
            halfDay: null,
            reason: 'Compensatory for weekend work on Aug 30',
            reasonTh: 'ชดเชยการทำงานวันเสาร์ที่ 30 สิงหาคม',
            substitutePersonId: null,
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-09-03',
            submittedAt: '2025-09-01T11:00:00Z',
            comments: null
        },
        {
            id: 'LR006',
            employeeId: 'EMP001',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'วันลาพักร้อน',
            startDate: '2025-08-11',
            endDate: '2025-08-15',
            days: 5,
            halfDay: null,
            reason: 'Summer vacation',
            reasonTh: 'พักร้อนช่วงฤดูร้อน',
            substitutePersonId: 'EMP_DR001',
            substitutePersonName: 'Natthapong Chai',
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-07-28',
            submittedAt: '2025-07-25T09:00:00Z',
            comments: null
        },
        {
            id: 'LR007',
            employeeId: 'EMP001',
            type: 'sick',
            typeNameEn: 'Sick Leave',
            typeNameTh: 'วันลาป่วย',
            startDate: '2025-06-10',
            endDate: '2025-06-10',
            days: 0.5,
            halfDay: 'morning',
            reason: 'Medical appointment',
            reasonTh: 'นัดพบแพทย์',
            substitutePersonId: null,
            attachments: [],
            status: 'approved',
            approvedBy: 'EMP_SUP001',
            approvedByName: 'Prawit Wongsuwan',
            approvedDate: '2025-06-09',
            submittedAt: '2025-06-08T16:30:00Z',
            comments: null
        }
    ],

    // Team Leave Calendar Data (for manager view)
    teamLeaves: [
        {
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ไชย',
            photo: 'https://i.pravatar.cc/150?img=14',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'วันลาพักร้อน',
            startDate: '2026-01-13',
            endDate: '2026-01-17',
            days: 5,
            status: 'approved'
        },
        {
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            photo: 'https://i.pravatar.cc/150?img=15',
            type: 'sick',
            typeNameEn: 'Sick Leave',
            typeNameTh: 'วันลาป่วย',
            startDate: '2026-01-09',
            endDate: '2026-01-09',
            days: 1,
            status: 'approved'
        },
        {
            employeeId: 'EMP_DR003',
            employeeName: 'Worachai Limpakit',
            employeeNameTh: 'วรชัย ลิมปกิจ',
            photo: 'https://i.pravatar.cc/150?img=16',
            type: 'personal',
            typeNameEn: 'Personal Leave',
            typeNameTh: 'วันลากิจ',
            startDate: '2026-01-22',
            endDate: '2026-01-22',
            days: 1,
            status: 'pending'
        }
    ],

    // G-BEST Competencies (Central Group behavioral competencies)
    gbestCompetencies: [
        {
            code: 'G',
            nameEn: 'Guest Focus',
            nameTh: 'มุ่งเน้นลูกค้า',
            descriptionEn: 'Prioritize customer satisfaction and deliver exceptional service experience',
            descriptionTh: 'ให้ความสำคัญกับความพึงพอใจของลูกค้าและส่งมอบประสบการณ์การบริการที่เป็นเลิศ'
        },
        {
            code: 'B',
            nameEn: 'Business Acumen',
            nameTh: 'ความเฉียบแหลมทางธุรกิจ',
            descriptionEn: 'Understand business dynamics and drive profitable growth',
            descriptionTh: 'เข้าใจพลวัตทางธุรกิจและขับเคลื่อนการเติบโตอย่างมีกำไร'
        },
        {
            code: 'E',
            nameEn: 'Execution Excellence',
            nameTh: 'ความเป็นเลิศในการดำเนินงาน',
            descriptionEn: 'Execute with precision, efficiency, and excellence',
            descriptionTh: 'ดำเนินงานอย่างแม่นยำ มีประสิทธิภาพ และเป็นเลิศ'
        },
        {
            code: 'S',
            nameEn: 'Self Development',
            nameTh: 'การพัฒนาตนเอง',
            descriptionEn: 'Continuously learn, grow, and adapt to new challenges',
            descriptionTh: 'เรียนรู้ เติบโต และปรับตัวต่อความท้าทายใหม่อย่างต่อเนื่อง'
        },
        {
            code: 'T',
            nameEn: 'Teamwork',
            nameTh: 'การทำงานเป็นทีม',
            descriptionEn: 'Collaborate effectively and build strong partnerships',
            descriptionTh: 'ทำงานร่วมกันอย่างมีประสิทธิภาพและสร้างความร่วมมือที่เข้มแข็ง'
        }
    ],

    // Performance Goals
    goals: [
        {
            id: 'GOAL001',
            employeeId: 'EMP001',
            name: { en: 'Increase Product Revenue', th: 'เพิ่มรายได้จากผลิตภัณฑ์' },
            description: { en: 'Achieve 15% year-over-year revenue growth through new product features', th: 'บรรลุการเติบโตของรายได้ 15% เมื่อเทียบกับปีก่อนผ่านฟีเจอร์ผลิตภัณฑ์ใหม่' },
            category: 'kpi',
            gbestCode: null,
            metric: 'percentage',
            target: 15,
            actual: 12,
            weight: 30,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'in_progress',
            progress: 80,
            createdAt: '2025-01-15',
            updatedAt: '2025-11-15',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL002',
            employeeId: 'EMP001',
            name: { en: 'Customer Satisfaction Score', th: 'คะแนนความพึงพอใจลูกค้า' },
            description: { en: 'Maintain customer satisfaction score above 4.5 out of 5', th: 'รักษาคะแนนความพึงพอใจลูกค้าให้มากกว่า 4.5 จาก 5' },
            category: 'kpi',
            gbestCode: null,
            metric: 'rating',
            target: 5,
            actual: 4.7,
            weight: 25,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'in_progress',
            progress: 94,
            createdAt: '2025-01-15',
            updatedAt: '2025-10-30',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL003',
            employeeId: 'EMP001',
            name: { en: 'Team Member Development', th: 'การพัฒนาสมาชิกในทีม' },
            description: { en: 'Mentor 3 junior team members and help them achieve their development goals', th: 'เป็นพี่เลี้ยงให้สมาชิกทีมระดับจูเนียร์ 3 คนและช่วยให้พวกเขาบรรลุเป้าหมายการพัฒนา' },
            category: 'gbest',
            gbestCode: 'T',
            metric: 'number',
            target: 3,
            actual: 2,
            weight: 15,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'in_progress',
            progress: 67,
            createdAt: '2025-01-15',
            updatedAt: '2025-09-20',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL004',
            employeeId: 'EMP001',
            name: { en: 'Customer-Centric Product Improvements', th: 'การปรับปรุงผลิตภัณฑ์โดยมุ่งเน้นลูกค้า' },
            description: { en: 'Implement 5 customer feedback-driven product improvements', th: 'ดำเนินการปรับปรุงผลิตภัณฑ์ตามความคิดเห็นของลูกค้า 5 รายการ' },
            category: 'gbest',
            gbestCode: 'G',
            metric: 'number',
            target: 5,
            actual: 4,
            weight: 10,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'in_progress',
            progress: 80,
            createdAt: '2025-01-15',
            updatedAt: '2025-08-15',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL005',
            employeeId: 'EMP001',
            name: { en: 'Complete AWS Solutions Architect Recertification', th: 'สอบใบรับรอง AWS Solutions Architect ใหม่' },
            description: { en: 'Renew AWS Solutions Architect certification before expiry', th: 'ต่ออายุใบรับรอง AWS Solutions Architect ก่อนหมดอายุ' },
            category: 'development',
            gbestCode: null,
            metric: 'yesno',
            target: 1,
            actual: 0,
            weight: 10,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'in_progress',
            progress: 0,
            createdAt: '2025-01-15',
            updatedAt: '2025-01-15',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL006',
            employeeId: 'EMP001',
            name: { en: 'Data Analytics Course Completion', th: 'เรียนจบหลักสูตรวิเคราะห์ข้อมูล' },
            description: { en: 'Complete advanced data analytics course from Central Group Academy', th: 'เรียนจบหลักสูตรวิเคราะห์ข้อมูลขั้นสูงจาก Central Group Academy' },
            category: 'development',
            gbestCode: null,
            metric: 'yesno',
            target: 1,
            actual: 1,
            weight: 10,
            period: '2025',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            status: 'completed',
            progress: 100,
            createdAt: '2025-01-15',
            updatedAt: '2025-06-30',
            createdBy: 'EMP001',
            approvedBy: 'EMP_SUP001',
            approvedDate: '2025-01-20',
            signedOffEmployee: true,
            signedOffEmployeeDate: '2025-01-18',
            signedOffManager: true,
            signedOffManagerDate: '2025-01-20'
        },
        {
            id: 'GOAL007',
            employeeId: 'EMP001',
            name: { en: 'New Mobile App Features', th: 'ฟีเจอร์แอปมือถือใหม่' },
            description: { en: 'Launch 2 new mobile app features for Q1 2026', th: 'เปิดตัวฟีเจอร์แอปมือถือใหม่ 2 รายการสำหรับไตรมาส 1 ปี 2569' },
            category: 'kpi',
            gbestCode: null,
            metric: 'number',
            target: 2,
            actual: 0,
            weight: 20,
            period: 'Q1-2026',
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            status: 'draft',
            progress: 0,
            createdAt: '2026-01-05',
            updatedAt: '2026-01-05',
            createdBy: 'EMP001',
            approvedBy: null,
            approvedDate: null,
            signedOffEmployee: false,
            signedOffEmployeeDate: null,
            signedOffManager: false,
            signedOffManagerDate: null
        },
        {
            id: 'GOAL008',
            employeeId: 'EMP001',
            name: { en: 'Process Improvement Initiative', th: 'โครงการปรับปรุงกระบวนการ' },
            description: { en: 'Identify and implement 3 process improvements to reduce development cycle time by 20%', th: 'ระบุและดำเนินการปรับปรุงกระบวนการ 3 รายการเพื่อลดเวลาในรอบการพัฒนาลง 20%' },
            category: 'gbest',
            gbestCode: 'E',
            metric: 'number',
            target: 3,
            actual: 0,
            weight: 15,
            period: 'Q1-2026',
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            status: 'submitted',
            progress: 0,
            createdAt: '2026-01-05',
            updatedAt: '2026-01-08',
            createdBy: 'EMP001',
            approvedBy: null,
            approvedDate: null,
            signedOffEmployee: false,
            signedOffEmployeeDate: null,
            signedOffManager: false,
            signedOffManagerDate: null,
            reviewComments: null
        }
    ],

    // Goal History (progress update tracking)
    goalHistory: [
        {
            id: 'GH001',
            goalId: 'GOAL001',
            employeeId: 'EMP001',
            previousActual: 10,
            newActual: 12,
            previousProgress: 67,
            newProgress: 80,
            comment: 'Q3 revenue exceeded expectations with successful campaign launch',
            commentTh: 'รายได้ไตรมาส 3 เกินความคาดหมายจากการเปิดตัวแคมเปญที่ประสบความสำเร็จ',
            evidence: null,
            createdAt: '2025-11-15T10:30:00Z',
            createdBy: 'EMP001'
        },
        {
            id: 'GH002',
            goalId: 'GOAL001',
            employeeId: 'EMP001',
            previousActual: 7,
            newActual: 10,
            previousProgress: 47,
            newProgress: 67,
            comment: 'Strong Q2 performance driven by new feature adoption',
            commentTh: 'ผลงาน Q2 ที่แข็งแกร่งจากการยอมรับฟีเจอร์ใหม่',
            evidence: null,
            createdAt: '2025-08-15T14:00:00Z',
            createdBy: 'EMP001'
        },
        {
            id: 'GH003',
            goalId: 'GOAL002',
            employeeId: 'EMP001',
            previousActual: 4.5,
            newActual: 4.7,
            previousProgress: 90,
            newProgress: 94,
            comment: 'Customer satisfaction improved after implementing feedback system',
            commentTh: 'ความพึงพอใจลูกค้าดีขึ้นหลังจากใช้ระบบรับฟีดแบ็ก',
            evidence: null,
            createdAt: '2025-10-30T09:15:00Z',
            createdBy: 'EMP001'
        },
        {
            id: 'GH004',
            goalId: 'GOAL003',
            employeeId: 'EMP001',
            previousActual: 1,
            newActual: 2,
            previousProgress: 33,
            newProgress: 67,
            comment: 'Siriporn completed her development program successfully',
            commentTh: 'ศิริพรสำเร็จโปรแกรมการพัฒนาแล้ว',
            evidence: null,
            createdAt: '2025-09-20T16:45:00Z',
            createdBy: 'EMP001'
        },
        {
            id: 'GH005',
            goalId: 'GOAL006',
            employeeId: 'EMP001',
            previousActual: 0,
            newActual: 1,
            previousProgress: 0,
            newProgress: 100,
            comment: 'Completed data analytics course with distinction',
            commentTh: 'สำเร็จหลักสูตรวิเคราะห์ข้อมูลด้วยเกียรตินิยม',
            evidence: '/uploads/certificates/data-analytics-cert-2025.pdf',
            createdAt: '2025-06-30T11:00:00Z',
            createdBy: 'EMP001'
        }
    ],

    // Goal Approvals (workflow tracking)
    goalApprovals: [
        {
            id: 'GA001',
            goalId: 'GOAL001',
            action: 'submitted',
            fromStatus: 'draft',
            toStatus: 'submitted',
            performedBy: 'EMP001',
            performedByName: 'Chatchai Tangsiri',
            performedAt: '2025-01-18T09:00:00Z',
            comments: null
        },
        {
            id: 'GA002',
            goalId: 'GOAL001',
            action: 'approved',
            fromStatus: 'submitted',
            toStatus: 'approved',
            performedBy: 'EMP_SUP001',
            performedByName: 'Prawit Wongsuwan',
            performedAt: '2025-01-20T10:30:00Z',
            comments: 'Well-defined goals with clear metrics. Approved.'
        },
        {
            id: 'GA003',
            goalId: 'GOAL001',
            action: 'signoff_employee',
            fromStatus: 'approved',
            toStatus: 'approved',
            performedBy: 'EMP001',
            performedByName: 'Chatchai Tangsiri',
            performedAt: '2025-01-18T14:00:00Z',
            comments: null
        },
        {
            id: 'GA004',
            goalId: 'GOAL001',
            action: 'signoff_manager',
            fromStatus: 'approved',
            toStatus: 'in_progress',
            performedBy: 'EMP_SUP001',
            performedByName: 'Prawit Wongsuwan',
            performedAt: '2025-01-20T15:00:00Z',
            comments: 'Both parties have signed off. Goal is now active.'
        },
        {
            id: 'GA005',
            goalId: 'GOAL008',
            action: 'submitted',
            fromStatus: 'draft',
            toStatus: 'submitted',
            performedBy: 'EMP001',
            performedByName: 'Chatchai Tangsiri',
            performedAt: '2026-01-08T11:00:00Z',
            comments: null
        }
    ],

    // Evaluation Configuration (default weights for performance evaluation)
    evaluationWeights: {
        kpi: 50,
        gbest: 30,
        attendance: 10,
        manager: 10
    },

    // Attendance Data for evaluation scoring
    attendanceData: {
        workDays: 220,
        attendedDays: 215,
        lateDays: 3,
        absentDays: 2,
        attendanceScore: 4.5,
        period: '2025'
    },

    // Performance Evaluations
    evaluations: [
        {
            id: 'EVAL001',
            employeeId: 'EMP001',
            period: '2024',
            periodLabel: { en: 'Annual Review 2024', th: 'การประเมินประจำปี 2567' },
            status: 'acknowledged',
            createdAt: '2024-11-01T09:00:00Z',
            updatedAt: '2025-01-15T14:30:00Z',

            // Section 1: KPI Results (auto-calculated from goals)
            kpiScore: {
                weightedScore: 4.2,
                totalGoals: 6,
                completedGoals: 5,
                averageProgress: 84,
                details: [
                    { goalId: 'GOAL_2024_01', name: { en: 'Revenue Growth', th: 'การเติบโตของรายได้' }, weight: 30, score: 4.5 },
                    { goalId: 'GOAL_2024_02', name: { en: 'Customer Retention', th: 'การรักษาลูกค้า' }, weight: 25, score: 4.0 },
                    { goalId: 'GOAL_2024_03', name: { en: 'Product Launch', th: 'เปิดตัวผลิตภัณฑ์' }, weight: 20, score: 4.5 },
                    { goalId: 'GOAL_2024_04', name: { en: 'Team Growth', th: 'การเติบโตของทีม' }, weight: 15, score: 3.5 },
                    { goalId: 'GOAL_2024_05', name: { en: 'Process Improvement', th: 'การปรับปรุงกระบวนการ' }, weight: 10, score: 4.0 }
                ]
            },

            // Section 2: G-BEST Competency Ratings
            gbestRatings: {
                selfAssessment: {
                    G: { score: 4, comment: { en: 'Strong focus on customer needs', th: 'มุ่งเน้นความต้องการลูกค้าอย่างแข็งแกร่ง' } },
                    B: { score: 4, comment: { en: 'Good business understanding', th: 'เข้าใจธุรกิจดี' } },
                    E: { score: 5, comment: { en: 'Excellent execution track record', th: 'ประวัติการดำเนินงานยอดเยี่ยม' } },
                    S: { score: 4, comment: { en: 'Actively pursuing learning opportunities', th: 'แสวงหาโอกาสเรียนรู้อย่างกระตือรือร้น' } },
                    T: { score: 4, comment: { en: 'Collaborate well with cross-functional teams', th: 'ทำงานร่วมกับทีมข้ามสายงานได้ดี' } }
                },
                managerAssessment: {
                    G: { score: 4, comment: { en: 'Consistently prioritizes customer satisfaction', th: 'ให้ความสำคัญกับความพึงพอใจลูกค้าอย่างสม่ำเสมอ' } },
                    B: { score: 4, comment: { en: 'Demonstrates solid business acumen', th: 'แสดงความเฉียบแหลมทางธุรกิจที่แข็งแกร่ง' } },
                    E: { score: 4, comment: { en: 'Delivers results with high quality', th: 'ส่งมอบผลลัพธ์ด้วยคุณภาพสูง' } },
                    S: { score: 5, comment: { en: 'Exceptional growth mindset', th: 'มี Growth Mindset ที่โดดเด่น' } },
                    T: { score: 4, comment: { en: 'Effective team player and mentor', th: 'เป็นสมาชิกทีมและพี่เลี้ยงที่มีประสิทธิภาพ' } }
                },
                averageScore: 4.2
            },

            // Section 3: Attendance Score
            attendanceScore: {
                score: 4.5,
                workDays: 220,
                attendedDays: 218,
                lateDays: 2,
                absentDays: 0,
                details: { en: 'Excellent attendance record with minimal tardiness', th: 'บันทึกการเข้างานยอดเยี่ยมด้วยการมาสายน้อยมาก' }
            },

            // Section 4: Manager Overall Assessment
            managerAssessment: {
                score: 4,
                comment: {
                    en: 'Chatchai has demonstrated exceptional leadership in driving product initiatives. He consistently delivers high-quality results and has grown significantly as a people leader this year.',
                    th: 'ชาติชายแสดงให้เห็นถึงความเป็นผู้นำที่โดดเด่นในการขับเคลื่อนโครงการผลิตภัณฑ์ เขาส่งมอบผลลัพธ์คุณภาพสูงอย่างสม่ำเสมอและเติบโตอย่างมีนัยสำคัญในฐานะผู้นำคนในปีนี้'
                }
            },

            // Section 5: Strengths and Areas for Improvement
            strengths: {
                en: '• Strategic thinking and product vision\n• Customer-centric approach\n• Team mentorship and development\n• Cross-functional collaboration',
                th: '• การคิดเชิงกลยุทธ์และวิสัยทัศน์ผลิตภัณฑ์\n• แนวทางที่มุ่งเน้นลูกค้า\n• การเป็นพี่เลี้ยงและการพัฒนาทีม\n• การทำงานร่วมกับทีมข้ามสายงาน'
            },
            areasForImprovement: {
                en: '• Financial acumen and P&L management\n• Regional market expansion knowledge\n• Stakeholder communication at senior levels',
                th: '• ความเข้าใจทางการเงินและการจัดการ P&L\n• ความรู้ด้านการขยายตลาดภูมิภาค\n• การสื่อสารกับผู้มีส่วนได้ส่วนเสียระดับสูง'
            },

            // Section 6: Final Rating
            finalRating: {
                weightedScore: 84.5,
                rating: 4,
                ratingLabel: { en: 'Exceeds Expectations', th: 'ดีมาก' },
                breakdown: {
                    kpi: { weight: 50, score: 4.2, weighted: 42 },
                    gbest: { weight: 30, score: 4.2, weighted: 25.2 },
                    attendance: { weight: 10, score: 4.5, weighted: 9 },
                    manager: { weight: 10, score: 4, weighted: 8 }
                },
                finalComment: {
                    en: 'Chatchai has exceeded expectations in FY2024. He is recommended for continued development toward senior leadership roles.',
                    th: 'ชาติชายทำได้เกินความคาดหวังในปีงบประมาณ 2567 แนะนำให้มีการพัฒนาต่อเนื่องไปสู่ตำแหน่งผู้นำระดับสูง'
                }
            },

            // Workflow tracking
            workflow: {
                selfAssessmentDate: '2024-11-15T10:00:00Z',
                selfAssessmentBy: 'EMP001',
                managerReviewDate: '2024-12-01T14:30:00Z',
                managerReviewBy: 'EMP_SUP001',
                calibrationDate: '2024-12-15T09:00:00Z',
                calibrationBy: 'EMP_HRBP001',
                confirmationDate: '2025-01-05T11:00:00Z',
                confirmationBy: 'EMP_SUP001',
                acknowledgmentDate: '2025-01-10T09:30:00Z',
                acknowledgmentBy: 'EMP001'
            }
        },
        {
            id: 'EVAL002',
            employeeId: 'EMP001',
            period: '2025',
            periodLabel: { en: 'Annual Review 2025', th: 'การประเมินประจำปี 2568' },
            status: 'self_assessment',
            createdAt: '2025-11-01T09:00:00Z',
            updatedAt: '2025-11-01T09:00:00Z',

            // Section 1: KPI Results (auto-calculated from current goals)
            kpiScore: {
                weightedScore: null,
                totalGoals: 6,
                completedGoals: 1,
                averageProgress: 70,
                details: [
                    { goalId: 'GOAL001', name: { en: 'Increase Product Revenue', th: 'เพิ่มรายได้จากผลิตภัณฑ์' }, weight: 30, score: null },
                    { goalId: 'GOAL002', name: { en: 'Customer Satisfaction Score', th: 'คะแนนความพึงพอใจลูกค้า' }, weight: 25, score: null },
                    { goalId: 'GOAL003', name: { en: 'Team Member Development', th: 'การพัฒนาสมาชิกในทีม' }, weight: 15, score: null },
                    { goalId: 'GOAL004', name: { en: 'Customer-Centric Product Improvements', th: 'การปรับปรุงผลิตภัณฑ์โดยมุ่งเน้นลูกค้า' }, weight: 10, score: null },
                    { goalId: 'GOAL005', name: { en: 'Complete AWS Solutions Architect Recertification', th: 'สอบใบรับรอง AWS Solutions Architect ใหม่' }, weight: 10, score: null },
                    { goalId: 'GOAL006', name: { en: 'Data Analytics Course Completion', th: 'เรียนจบหลักสูตรวิเคราะห์ข้อมูล' }, weight: 10, score: 5 }
                ]
            },

            // Section 2: G-BEST Competency Ratings - pending self-assessment
            gbestRatings: {
                selfAssessment: null,
                managerAssessment: null,
                averageScore: null
            },

            // Section 3: Attendance Score
            attendanceScore: {
                score: 4.5,
                workDays: 220,
                attendedDays: 215,
                lateDays: 3,
                absentDays: 2,
                details: { en: 'Good attendance record', th: 'บันทึกการเข้างานดี' }
            },

            // Section 4: Manager Overall Assessment - pending
            managerAssessment: null,

            // Section 5: Strengths and Areas for Improvement - pending
            strengths: null,
            areasForImprovement: null,

            // Section 6: Final Rating - pending
            finalRating: null,

            // Workflow tracking
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
        }
    ],

    // Team members (for managers)
    teamMembers: [
        {
            employeeId: 'EMP_DR001',
            name: 'Natthapong Chai',
            nameTh: 'ณัฐพงษ์ ไชย',
            title: 'Senior Product Analyst',
            photo: 'https://i.pravatar.cc/150?img=14',
            email: 'natthapong.c@centralgroup.com'
        },
        {
            employeeId: 'EMP_DR002',
            name: 'Siriporn Kaewdee',
            nameTh: 'ศิริพร แก้วดี',
            title: 'Product Analyst',
            photo: 'https://i.pravatar.cc/150?img=15',
            email: 'siriporn.k@centralgroup.com'
        },
        {
            employeeId: 'EMP_DR003',
            name: 'Worachai Limpakit',
            nameTh: 'วรชัย ลิมปกิจ',
            title: 'Associate Product Manager',
            photo: 'https://i.pravatar.cc/150?img=16',
            email: 'worachai.l@centralgroup.com'
        }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockEmployeeData;
}

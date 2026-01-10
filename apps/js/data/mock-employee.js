/**
 * Mock Employee Data
 * Sample data matching PRD schema for development and testing
 */

const MockEmployeeData = {
    // Current logged-in user
    currentUser: {
        id: 'user_001',
        employeeId: 'EMP001',
        username: 'chatchai.t',
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
            firstNameEn: 'Chatchai',
            firstNameTh: 'ชาติชาย',
            middleNameEn: '',
            lastNameEn: 'Tangsiri',
            lastNameTh: 'ทังศิริ',
            nickname: 'Chat',
            gender: 'male',
            dateOfBirth: '1985-03-15',
            nationality: 'Thai',
            nationalId: '1234567890123',
            maritalStatus: 'married',
            maritalStatusSince: '2015-06-20',
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
            businessEmail: 'chatchai.t@centralgroup.com',
            personalEmail: 'chatchai.tangsiri@gmail.com',
            businessPhone: '+66 2 123 4567',
            personalMobile: '+66 81 234 5678',
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
                name: 'Supaporn Tangsiri',
                nameTh: 'สุภาพร ทังศิริ',
                relationship: 'spouse',
                phone: '+66 82 345 6789',
                isPrimary: true
            },
            {
                id: 'ec_002',
                name: 'Somchai Tangsiri',
                nameTh: 'สมชาย ทังศิริ',
                relationship: 'parent',
                phone: '+66 89 012 3456',
                isPrimary: false
            }
        ],

        // Dependents
        dependents: [
            {
                id: 'dep_001',
                name: 'Supaporn Tangsiri',
                nameTh: 'สุภาพร ทังศิริ',
                relationship: 'spouse',
                dateOfBirth: '1987-08-22',
                nationalId: '9876543210123',
                gender: 'female'
            },
            {
                id: 'dep_002',
                name: 'Patchara Tangsiri',
                nameTh: 'พัชรา ทังศิริ',
                relationship: 'child',
                dateOfBirth: '2018-04-10',
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
                supervisorName: 'Prawit Wongsuwan',
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

        // Organization Chart
        orgChart: {
            employee: {
                id: 'EMP001',
                name: 'Chatchai Tangsiri',
                title: 'Product Manager',
                photo: 'https://i.pravatar.cc/150?img=11'
            },
            supervisor: {
                id: 'EMP_SUP001',
                name: 'Prawit Wongsuwan',
                title: 'Head of Product',
                photo: 'https://i.pravatar.cc/150?img=12'
            },
            supervisorOfSupervisor: {
                id: 'EMP_SUP002',
                name: 'Suthep Thuaksuban',
                title: 'CTO',
                photo: 'https://i.pravatar.cc/150?img=13'
            },
            directReports: [
                {
                    id: 'EMP_DR001',
                    name: 'Natthapong Chai',
                    title: 'Senior Product Analyst',
                    photo: 'https://i.pravatar.cc/150?img=14'
                },
                {
                    id: 'EMP_DR002',
                    name: 'Siriporn Kaewdee',
                    title: 'Product Analyst',
                    photo: 'https://i.pravatar.cc/150?img=15'
                },
                {
                    id: 'EMP_DR003',
                    name: 'Worachai Limpakit',
                    title: 'Associate Product Manager',
                    photo: 'https://i.pravatar.cc/150?img=16'
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

        // Payslips
        payslips: [
            { id: 'ps_202312', period: 'December 2023', payDate: '2023-12-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202311', period: 'November 2023', payDate: '2023-11-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202310', period: 'October 2023', payDate: '2023-10-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202309', period: 'September 2023', payDate: '2023-09-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202308', period: 'August 2023', payDate: '2023-08-25', grossAmount: 120000, netAmount: 95000 },
            { id: 'ps_202307', period: 'July 2023', payDate: '2023-07-25', grossAmount: 120000, netAmount: 95000 }
        ],

        // Tax Documents
        taxDocuments: [
            { id: 'tax_2025_50tawi', documentType: '50 Tawi Form', taxYear: '2025', issueDate: '2025-01-15', description: 'Withholding Tax Certificate 2025' },
            { id: 'tax_2025_annual', documentType: 'Annual Tax Summary', taxYear: '2025', issueDate: '2025-01-20', description: 'Annual Income Tax Summary 2025' },
            { id: 'tax_2024_50tawi', documentType: '50 Tawi Form', taxYear: '2024', issueDate: '2024-01-15', description: 'Withholding Tax Certificate 2024' },
            { id: 'tax_2024_annual', documentType: 'Annual Tax Summary', taxYear: '2024', issueDate: '2024-01-20', description: 'Annual Income Tax Summary 2024' },
            { id: 'tax_2023_50tawi', documentType: '50 Tawi Form', taxYear: '2023', issueDate: '2023-01-15', description: 'Withholding Tax Certificate 2023' },
            { id: 'tax_2023_annual', documentType: 'Annual Tax Summary', taxYear: '2023', issueDate: '2023-01-20', description: 'Annual Income Tax Summary 2023' }
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

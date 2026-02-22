/**
 * Mock Onboarding Data
 * Pre-boarding, day-one checklists, employee ID generation, orientation, and probation setup
 */

const MockOnboardingData = {
    // Current onboarding status for a new hire
    currentOnboarding: {
        employeeId: 'NEW-2026-001',
        candidateName: 'Somchai Jaidee',
        candidateNameTh: 'สมชาย ใจดี',
        position: 'Software Engineer',
        positionTh: 'วิศวกรซอฟต์แวร์',
        department: 'Technology',
        departmentTh: 'ฝ่ายเทคโนโลยี',
        startDate: '2026-01-20',
        status: 'pre_boarding',
        hrCoordinator: 'Nattaya Srisuk',
        hrCoordinatorId: 'EMP003',
        mentor: null,
        mentorId: null,
        probationEndDate: '2026-04-20',
        createdAt: '2026-01-05T09:00:00Z',
        updatedAt: '2026-01-10T14:30:00Z'
    },

    // Pre-boarding checklist items
    preboardingChecklist: [
        {
            id: 'pb-001',
            categoryEn: 'Document Collection',
            categoryTh: 'การเก็บเอกสาร',
            items: [
                {
                    id: 'pb-001-1',
                    titleEn: 'National ID Card Copy',
                    titleTh: 'สำเนาบัตรประชาชน',
                    descriptionEn: 'Valid copy of national ID card (both sides)',
                    descriptionTh: 'สำเนาบัตรประชาชนที่ถูกต้อง (หน้า-หลัง)',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-08',
                    completedBy: 'HR Admin'
                },
                {
                    id: 'pb-001-2',
                    titleEn: 'House Registration Copy',
                    titleTh: 'สำเนาทะเบียนบ้าน',
                    descriptionEn: 'Copy of house registration document',
                    descriptionTh: 'สำเนาทะเบียนบ้าน',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-08',
                    completedBy: 'HR Admin'
                },
                {
                    id: 'pb-001-3',
                    titleEn: 'Bank Account Book Copy',
                    titleTh: 'สำเนาสมุดบัญชีธนาคาร',
                    descriptionEn: 'Copy of bank account passbook for salary transfer',
                    descriptionTh: 'สำเนาสมุดบัญชีธนาคารสำหรับโอนเงินเดือน',
                    required: true,
                    status: 'pending',
                    completedDate: null,
                    completedBy: null
                },
                {
                    id: 'pb-001-4',
                    titleEn: 'Education Certificate',
                    titleTh: 'ใบรับรองการศึกษา',
                    descriptionEn: 'Certified copies of educational certificates',
                    descriptionTh: 'สำเนาใบรับรองการศึกษาที่รับรองสำเนาถูกต้อง',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-07',
                    completedBy: 'HR Admin'
                },
                {
                    id: 'pb-001-5',
                    titleEn: 'Previous Employment Certificate',
                    titleTh: 'หนังสือรับรองการทำงานเดิม',
                    descriptionEn: 'Certificate from previous employer(s)',
                    descriptionTh: 'หนังสือรับรองการทำงานจากบริษัทเดิม',
                    required: false,
                    status: 'not_applicable',
                    completedDate: null,
                    completedBy: null
                },
                {
                    id: 'pb-001-6',
                    titleEn: 'Photos (1 inch, 2 inch)',
                    titleTh: 'รูปถ่าย (1 นิ้ว, 2 นิ้ว)',
                    descriptionEn: 'Recent photos for ID card and documents',
                    descriptionTh: 'รูปถ่ายปัจจุบันสำหรับทำบัตรและเอกสาร',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-08',
                    completedBy: 'HR Admin'
                }
            ]
        },
        {
            id: 'pb-002',
            categoryEn: 'Background Verification',
            categoryTh: 'การตรวจสอบประวัติ',
            items: [
                {
                    id: 'pb-002-1',
                    titleEn: 'Criminal Background Check',
                    titleTh: 'ตรวจสอบประวัติอาชญากรรม',
                    descriptionEn: 'Police clearance certificate verification',
                    descriptionTh: 'ตรวจสอบใบรับรองความประพฤติจากสถานีตำรวจ',
                    required: true,
                    status: 'in_progress',
                    completedDate: null,
                    completedBy: null,
                    estimatedCompletion: '2026-01-15'
                },
                {
                    id: 'pb-002-2',
                    titleEn: 'Reference Check',
                    titleTh: 'ตรวจสอบบุคคลอ้างอิง',
                    descriptionEn: 'Verification of professional references',
                    descriptionTh: 'ตรวจสอบกับบุคคลอ้างอิงทางวิชาชีพ',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-06',
                    completedBy: 'Recruitment Team'
                },
                {
                    id: 'pb-002-3',
                    titleEn: 'Education Verification',
                    titleTh: 'ตรวจสอบวุฒิการศึกษา',
                    descriptionEn: 'Verification of educational qualifications',
                    descriptionTh: 'ตรวจสอบความถูกต้องของวุฒิการศึกษา',
                    required: true,
                    status: 'completed',
                    completedDate: '2026-01-07',
                    completedBy: 'Recruitment Team'
                }
            ]
        },
        {
            id: 'pb-003',
            categoryEn: 'Medical Examination',
            categoryTh: 'การตรวจสุขภาพ',
            items: [
                {
                    id: 'pb-003-1',
                    titleEn: 'Pre-employment Health Check',
                    titleTh: 'ตรวจสุขภาพก่อนเข้าทำงาน',
                    descriptionEn: 'Complete medical examination at designated hospital',
                    descriptionTh: 'ตรวจสุขภาพครบถ้วนที่โรงพยาบาลที่กำหนด',
                    required: true,
                    status: 'pending',
                    completedDate: null,
                    completedBy: null,
                    appointmentDate: '2026-01-14',
                    hospital: 'Bangkok Hospital'
                },
                {
                    id: 'pb-003-2',
                    titleEn: 'Drug Screening',
                    titleTh: 'ตรวจสารเสพติด',
                    descriptionEn: 'Mandatory drug screening test',
                    descriptionTh: 'การตรวจสารเสพติดตามข้อบังคับ',
                    required: true,
                    status: 'pending',
                    completedDate: null,
                    completedBy: null
                }
            ]
        },
        {
            id: 'pb-004',
            categoryEn: 'Equipment Request',
            categoryTh: 'การขออุปกรณ์',
            items: [
                {
                    id: 'pb-004-1',
                    titleEn: 'Laptop/Computer',
                    titleTh: 'แล็ปท็อป/คอมพิวเตอร์',
                    descriptionEn: 'Request work computer based on job requirements',
                    descriptionTh: 'ขอคอมพิวเตอร์ทำงานตามข้อกำหนดของตำแหน่ง',
                    required: true,
                    status: 'in_progress',
                    completedDate: null,
                    completedBy: null,
                    requestId: 'IT-REQ-2026-0042',
                    estimatedDelivery: '2026-01-18'
                },
                {
                    id: 'pb-004-2',
                    titleEn: 'Mobile Phone',
                    titleTh: 'โทรศัพท์มือถือ',
                    descriptionEn: 'Company mobile phone (if applicable)',
                    descriptionTh: 'โทรศัพท์มือถือบริษัท (ถ้ามี)',
                    required: false,
                    status: 'not_applicable',
                    completedDate: null,
                    completedBy: null
                },
                {
                    id: 'pb-004-3',
                    titleEn: 'Access Card Request',
                    titleTh: 'ขอบัตรเข้าอาคาร',
                    descriptionEn: 'Building access card request',
                    descriptionTh: 'ขอบัตรเข้าอาคารสำนักงาน',
                    required: true,
                    status: 'pending',
                    completedDate: null,
                    completedBy: null
                }
            ]
        }
    ],

    // Day-one checklist items
    dayOneChecklist: [
        {
            id: 'do-001',
            categoryEn: 'Welcome Kit',
            categoryTh: 'ชุดต้อนรับ',
            items: [
                {
                    id: 'do-001-1',
                    titleEn: 'Welcome Package Distribution',
                    titleTh: 'แจกชุดต้อนรับ',
                    descriptionEn: 'Receive company welcome package including handbook, stationery',
                    descriptionTh: 'รับชุดต้อนรับรวมถึงคู่มือพนักงานและเครื่องเขียน',
                    required: true,
                    status: 'pending',
                    assignedTo: 'HR Admin',
                    estimatedTime: '09:00'
                },
                {
                    id: 'do-001-2',
                    titleEn: 'Employee ID Card',
                    titleTh: 'บัตรพนักงาน',
                    descriptionEn: 'Collect employee ID card',
                    descriptionTh: 'รับบัตรพนักงาน',
                    required: true,
                    status: 'pending',
                    assignedTo: 'HR Admin',
                    estimatedTime: '09:30'
                },
                {
                    id: 'do-001-3',
                    titleEn: 'Company Uniform',
                    titleTh: 'ชุดยูนิฟอร์ม',
                    descriptionEn: 'Receive company uniform (if applicable)',
                    descriptionTh: 'รับชุดยูนิฟอร์มบริษัท (ถ้ามี)',
                    required: false,
                    status: 'not_applicable',
                    assignedTo: 'HR Admin',
                    estimatedTime: '09:30'
                }
            ]
        },
        {
            id: 'do-002',
            categoryEn: 'Workstation Setup',
            categoryTh: 'การจัดเตรียมโต๊ะทำงาน',
            items: [
                {
                    id: 'do-002-1',
                    titleEn: 'Desk Assignment',
                    titleTh: 'จัดสรรโต๊ะทำงาน',
                    descriptionEn: 'Show assigned desk and workspace',
                    descriptionTh: 'แนะนำโต๊ะและพื้นที่ทำงานที่จัดไว้ให้',
                    required: true,
                    status: 'pending',
                    assignedTo: 'Admin',
                    estimatedTime: '10:00'
                },
                {
                    id: 'do-002-2',
                    titleEn: 'Computer Setup',
                    titleTh: 'ติดตั้งคอมพิวเตอร์',
                    descriptionEn: 'Setup computer and required software',
                    descriptionTh: 'ติดตั้งคอมพิวเตอร์และซอฟต์แวร์ที่จำเป็น',
                    required: true,
                    status: 'pending',
                    assignedTo: 'IT Support',
                    estimatedTime: '10:30'
                },
                {
                    id: 'do-002-3',
                    titleEn: 'Office Tour',
                    titleTh: 'พาชมออฟฟิศ',
                    descriptionEn: 'Tour of office facilities (pantry, restrooms, meeting rooms)',
                    descriptionTh: 'พาชมสิ่งอำนวยความสะดวก (ห้องครัว, ห้องน้ำ, ห้องประชุม)',
                    required: true,
                    status: 'pending',
                    assignedTo: 'HR Buddy',
                    estimatedTime: '11:00'
                }
            ]
        },
        {
            id: 'do-003',
            categoryEn: 'System Access',
            categoryTh: 'การเข้าถึงระบบ',
            items: [
                {
                    id: 'do-003-1',
                    titleEn: 'Email Account Activation',
                    titleTh: 'เปิดใช้งานอีเมล',
                    descriptionEn: 'Activate company email and set password',
                    descriptionTh: 'เปิดใช้งานอีเมลบริษัทและตั้งรหัสผ่าน',
                    required: true,
                    status: 'pending',
                    assignedTo: 'IT Support',
                    estimatedTime: '10:30'
                },
                {
                    id: 'do-003-2',
                    titleEn: 'HR System Access',
                    titleTh: 'เข้าถึงระบบ HR',
                    descriptionEn: 'Setup access to HR self-service portal',
                    descriptionTh: 'ตั้งค่าการเข้าถึงระบบ HR self-service',
                    required: true,
                    status: 'pending',
                    assignedTo: 'HR Admin',
                    estimatedTime: '11:30'
                },
                {
                    id: 'do-003-3',
                    titleEn: 'Department Systems Access',
                    titleTh: 'เข้าถึงระบบแผนก',
                    descriptionEn: 'Setup access to department-specific systems',
                    descriptionTh: 'ตั้งค่าการเข้าถึงระบบเฉพาะของแผนก',
                    required: true,
                    status: 'pending',
                    assignedTo: 'IT Support',
                    estimatedTime: '14:00'
                }
            ]
        },
        {
            id: 'do-004',
            categoryEn: 'Orientation Schedule',
            categoryTh: 'กำหนดการปฐมนิเทศ',
            items: [
                {
                    id: 'do-004-1',
                    titleEn: 'HR Orientation',
                    titleTh: 'ปฐมนิเทศ HR',
                    descriptionEn: 'Company policies, benefits overview, compliance',
                    descriptionTh: 'นโยบายบริษัท, ภาพรวมสวัสดิการ, การปฏิบัติตามกฎระเบียบ',
                    required: true,
                    status: 'pending',
                    assignedTo: 'HR Team',
                    estimatedTime: '13:00',
                    duration: '2 hours'
                },
                {
                    id: 'do-004-2',
                    titleEn: 'Team Introduction',
                    titleTh: 'แนะนำทีม',
                    descriptionEn: 'Meet team members and understand team structure',
                    descriptionTh: 'พบสมาชิกในทีมและทำความเข้าใจโครงสร้างทีม',
                    required: true,
                    status: 'pending',
                    assignedTo: 'Direct Manager',
                    estimatedTime: '15:00',
                    duration: '1 hour'
                },
                {
                    id: 'do-004-3',
                    titleEn: 'Lunch with Team',
                    titleTh: 'รับประทานอาหารกลางวันกับทีม',
                    descriptionEn: 'Welcome lunch with immediate team',
                    descriptionTh: 'รับประทานอาหารกลางวันต้อนรับกับทีม',
                    required: false,
                    status: 'pending',
                    assignedTo: 'Team',
                    estimatedTime: '12:00',
                    duration: '1 hour'
                }
            ]
        }
    ],

    // Employee ID configuration
    employeeIdConfig: {
        prefix: 'CG',
        format: 'CG-YYYY-NNNNNN',
        currentSequence: 45892,
        lastGenerated: '2026-01-09',
        yearReset: false // Does not reset sequence each year
    },

    // Generated employee ID preview
    generatedEmployeeId: {
        employeeId: 'CG-2026-045893',
        generatedAt: '2026-01-10T10:00:00Z',
        status: 'pending_confirmation',
        idCardRequested: false,
        userAccountCreated: false
    },

    // Orientation program
    orientationProgram: [
        {
            id: 'orient-001',
            categoryEn: 'Mandatory Training',
            categoryTh: 'การอบรมภาคบังคับ',
            items: [
                {
                    id: 'orient-001-1',
                    titleEn: 'Company Culture & Values',
                    titleTh: 'วัฒนธรรมและค่านิยมองค์กร',
                    descriptionEn: 'Understanding Central Group culture and core values',
                    descriptionTh: 'ทำความเข้าใจวัฒนธรรมและค่านิยมหลักของเซ็นทรัล',
                    type: 'e-learning',
                    duration: '2 hours',
                    dueDate: '2026-01-27',
                    status: 'not_started',
                    mandatory: true,
                    courseCode: 'CG-CULTURE-101'
                },
                {
                    id: 'orient-001-2',
                    titleEn: 'Code of Conduct',
                    titleTh: 'จรรยาบรรณพนักงาน',
                    descriptionEn: 'Business ethics and code of conduct training',
                    descriptionTh: 'อบรมจริยธรรมทางธุรกิจและจรรยาบรรณ',
                    type: 'e-learning',
                    duration: '1.5 hours',
                    dueDate: '2026-01-27',
                    status: 'not_started',
                    mandatory: true,
                    courseCode: 'CG-COC-101'
                },
                {
                    id: 'orient-001-3',
                    titleEn: 'Information Security Awareness',
                    titleTh: 'ความตระหนักด้านความปลอดภัยข้อมูล',
                    descriptionEn: 'IT security policies and best practices',
                    descriptionTh: 'นโยบายความปลอดภัย IT และแนวปฏิบัติที่ดี',
                    type: 'e-learning',
                    duration: '1 hour',
                    dueDate: '2026-01-27',
                    status: 'not_started',
                    mandatory: true,
                    courseCode: 'CG-SEC-101'
                },
                {
                    id: 'orient-001-4',
                    titleEn: 'PDPA (Data Privacy) Training',
                    titleTh: 'อบรม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล',
                    descriptionEn: 'Personal Data Protection Act compliance',
                    descriptionTh: 'การปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล',
                    type: 'e-learning',
                    duration: '1 hour',
                    dueDate: '2026-01-27',
                    status: 'not_started',
                    mandatory: true,
                    courseCode: 'CG-PDPA-101'
                },
                {
                    id: 'orient-001-5',
                    titleEn: 'Workplace Safety',
                    titleTh: 'ความปลอดภัยในสถานที่ทำงาน',
                    descriptionEn: 'Occupational health and safety training',
                    descriptionTh: 'อบรมอาชีวอนามัยและความปลอดภัย',
                    type: 'classroom',
                    duration: '3 hours',
                    scheduledDate: '2026-01-22',
                    location: 'Training Room A',
                    status: 'registered',
                    mandatory: true,
                    courseCode: 'CG-OHS-101'
                }
            ]
        },
        {
            id: 'orient-002',
            categoryEn: 'Meet the Team',
            categoryTh: 'พบปะทีม',
            items: [
                {
                    id: 'orient-002-1',
                    titleEn: 'Manager One-on-One',
                    titleTh: 'พบผู้จัดการตัวต่อตัว',
                    descriptionEn: 'Initial meeting with direct manager',
                    descriptionTh: 'พบผู้จัดการโดยตรงครั้งแรก',
                    type: 'meeting',
                    scheduledDate: '2026-01-20',
                    scheduledTime: '15:00',
                    duration: '1 hour',
                    status: 'scheduled',
                    mandatory: true,
                    with: 'Siriporn Tangsiri',
                    withId: 'EMP001'
                },
                {
                    id: 'orient-002-2',
                    titleEn: 'Department Head Introduction',
                    titleTh: 'แนะนำตัวกับหัวหน้าแผนก',
                    descriptionEn: 'Brief meeting with department head',
                    descriptionTh: 'พบหัวหน้าแผนกโดยย่อ',
                    type: 'meeting',
                    scheduledDate: '2026-01-21',
                    scheduledTime: '10:00',
                    duration: '30 minutes',
                    status: 'pending',
                    mandatory: true,
                    with: 'Pravit Wongchai',
                    withId: 'EMP010'
                },
                {
                    id: 'orient-002-3',
                    titleEn: 'Team Welcome Session',
                    titleTh: 'ต้อนรับจากทีม',
                    descriptionEn: 'Team introduction and welcome activity',
                    descriptionTh: 'แนะนำทีมและกิจกรรมต้อนรับ',
                    type: 'meeting',
                    scheduledDate: '2026-01-20',
                    scheduledTime: '16:00',
                    duration: '1 hour',
                    status: 'scheduled',
                    mandatory: false
                }
            ]
        },
        {
            id: 'orient-003',
            categoryEn: 'Policy Acknowledgment',
            categoryTh: 'รับทราบนโยบาย',
            items: [
                {
                    id: 'orient-003-1',
                    titleEn: 'Employee Handbook Acknowledgment',
                    titleTh: 'รับทราบคู่มือพนักงาน',
                    descriptionEn: 'Read and acknowledge employee handbook',
                    descriptionTh: 'อ่านและรับทราบคู่มือพนักงาน',
                    type: 'document',
                    dueDate: '2026-01-22',
                    status: 'pending',
                    mandatory: true,
                    documentUrl: '/documents/employee-handbook-2026.pdf'
                },
                {
                    id: 'orient-003-2',
                    titleEn: 'IT Acceptable Use Policy',
                    titleTh: 'นโยบายการใช้งาน IT',
                    descriptionEn: 'Acknowledge IT acceptable use policy',
                    descriptionTh: 'รับทราบนโยบายการใช้งานระบบ IT',
                    type: 'document',
                    dueDate: '2026-01-22',
                    status: 'pending',
                    mandatory: true,
                    documentUrl: '/documents/it-policy.pdf'
                },
                {
                    id: 'orient-003-3',
                    titleEn: 'Non-Disclosure Agreement',
                    titleTh: 'ข้อตกลงไม่เปิดเผยข้อมูล',
                    descriptionEn: 'Sign confidentiality and NDA agreement',
                    descriptionTh: 'ลงนามข้อตกลงรักษาความลับ',
                    type: 'signature',
                    dueDate: '2026-01-20',
                    status: 'pending',
                    mandatory: true
                }
            ]
        },
        {
            id: 'orient-004',
            categoryEn: 'Mentor Assignment',
            categoryTh: 'การมอบหมายพี่เลี้ยง',
            items: [
                {
                    id: 'orient-004-1',
                    titleEn: 'Mentor Introduction',
                    titleTh: 'แนะนำพี่เลี้ยง',
                    descriptionEn: 'Meet assigned mentor/buddy',
                    descriptionTh: 'พบพี่เลี้ยงที่ได้รับมอบหมาย',
                    type: 'meeting',
                    status: 'pending',
                    mandatory: true,
                    mentorAssigned: false
                }
            ]
        }
    ],

    // Available mentors for assignment
    availableMentors: [
        {
            id: 'EMP005',
            name: 'Wichai Sombat',
            nameTh: 'วิชัย สมบัติ',
            position: 'Senior Software Engineer',
            positionTh: 'วิศวกรซอฟต์แวร์อาวุโส',
            department: 'Technology',
            departmentTh: 'ฝ่ายเทคโนโลยี',
            yearsWithCompany: 5,
            menteeCount: 1,
            maxMentees: 2,
            skills: ['Java', 'React', 'Cloud'],
            rating: 4.8
        },
        {
            id: 'EMP006',
            name: 'Kannika Pradit',
            nameTh: 'กรรณิกา ประดิษฐ์',
            position: 'Software Engineer',
            positionTh: 'วิศวกรซอฟต์แวร์',
            department: 'Technology',
            departmentTh: 'ฝ่ายเทคโนโลยี',
            yearsWithCompany: 3,
            menteeCount: 0,
            maxMentees: 2,
            skills: ['JavaScript', 'Node.js', 'AWS'],
            rating: 4.6
        },
        {
            id: 'EMP007',
            name: 'Supachai Lertsiri',
            nameTh: 'ศุภชัย เลิศศิริ',
            position: 'Tech Lead',
            positionTh: 'หัวหน้าทีมเทคนิค',
            department: 'Technology',
            departmentTh: 'ฝ่ายเทคโนโลยี',
            yearsWithCompany: 7,
            menteeCount: 2,
            maxMentees: 3,
            skills: ['Architecture', 'DevOps', 'Leadership'],
            rating: 4.9
        }
    ],

    // Probation setup
    probationSetup: {
        startDate: '2026-01-20',
        endDate: '2026-04-20',
        duration: 90, // days
        status: 'not_started',
        evaluationSchedule: [
            {
                id: 'eval-001',
                titleEn: '30-Day Review',
                titleTh: 'ประเมิน 30 วัน',
                dueDate: '2026-02-19',
                status: 'pending',
                evaluator: 'Direct Manager',
                evaluatorId: 'EMP001',
                completed: false,
                rating: null,
                comments: null
            },
            {
                id: 'eval-002',
                titleEn: '60-Day Review',
                titleTh: 'ประเมิน 60 วัน',
                dueDate: '2026-03-21',
                status: 'pending',
                evaluator: 'Direct Manager',
                evaluatorId: 'EMP001',
                completed: false,
                rating: null,
                comments: null
            },
            {
                id: 'eval-003',
                titleEn: '90-Day Final Review',
                titleTh: 'ประเมินสุดท้าย 90 วัน',
                dueDate: '2026-04-18',
                status: 'pending',
                evaluator: 'Direct Manager',
                evaluatorId: 'EMP001',
                completed: false,
                rating: null,
                comments: null,
                includesHRReview: true
            }
        ],
        goals: [
            {
                id: 'goal-001',
                titleEn: 'Complete all mandatory training',
                titleTh: 'ผ่านการอบรมภาคบังคับทั้งหมด',
                targetDate: '2026-02-20',
                weight: 20,
                status: 'not_started',
                progress: 0
            },
            {
                id: 'goal-002',
                titleEn: 'Successfully deliver first project task',
                titleTh: 'ส่งมอบงานโปรเจกต์แรกสำเร็จ',
                targetDate: '2026-03-15',
                weight: 40,
                status: 'not_started',
                progress: 0
            },
            {
                id: 'goal-003',
                titleEn: 'Demonstrate core technical competencies',
                titleTh: 'แสดงให้เห็นถึงความสามารถทางเทคนิคหลัก',
                targetDate: '2026-04-15',
                weight: 40,
                status: 'not_started',
                progress: 0
            }
        ],
        reminders: [
            {
                id: 'remind-001',
                type: 'evaluation_due',
                titleEn: '30-Day Review Due',
                titleTh: 'ครบกำหนดประเมิน 30 วัน',
                triggerDate: '2026-02-17',
                recipients: ['manager', 'hr'],
                sent: false
            },
            {
                id: 'remind-002',
                type: 'evaluation_due',
                titleEn: '60-Day Review Due',
                titleTh: 'ครบกำหนดประเมิน 60 วัน',
                triggerDate: '2026-03-19',
                recipients: ['manager', 'hr'],
                sent: false
            },
            {
                id: 'remind-003',
                type: 'probation_ending',
                titleEn: 'Probation Ending Soon',
                titleTh: 'ใกล้หมดระยะทดลองงาน',
                triggerDate: '2026-04-10',
                recipients: ['manager', 'hr', 'employee'],
                sent: false
            },
            {
                id: 'remind-004',
                type: 'final_evaluation',
                titleEn: 'Final Evaluation Due',
                titleTh: 'ครบกำหนดประเมินสุดท้าย',
                triggerDate: '2026-04-15',
                recipients: ['manager', 'hr'],
                sent: false
            }
        ]
    },

    // Onboarding summary statistics
    statistics: {
        totalNewHires: {
            thisMonth: 12,
            thisQuarter: 35,
            thisYear: 35
        },
        preboardingCompletion: {
            documentsCollected: 85,
            backgroundChecksPassed: 92,
            medicalExamsCompleted: 78
        },
        orientationCompletion: {
            mandatoryTraining: 88,
            policyAcknowledgment: 95,
            mentorAssignment: 75
        },
        probationSuccess: {
            passRate: 94,
            averageDuration: 87 // days
        }
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockOnboardingData;
}

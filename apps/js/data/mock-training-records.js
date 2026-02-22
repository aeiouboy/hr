/**
 * Mock Training Records Data
 * Training history, evaluations, certificates, and competency links
 */

const MockTrainingRecords = {
    // Training records for the current employee
    trainingRecords: [
        {
            id: 'TR001',
            courseCode: 'CG-LEAD-001',
            courseNameEn: 'Leadership Excellence Program',
            courseNameTh: 'โปรแกรมพัฒนาความเป็นผู้นำ',
            descriptionEn: 'Comprehensive leadership development program covering strategic thinking, team management, and decision making.',
            descriptionTh: 'โปรแกรมพัฒนาความเป็นผู้นำแบบครบวงจร ครอบคลุมการคิดเชิงกลยุทธ์ การบริหารทีม และการตัดสินใจ',
            trainingType: 'internal',
            category: 'leadership',
            provider: 'Central Group Academy',
            instructorName: 'Dr. Somchai Thongchai',
            startDate: '2025-03-15',
            endDate: '2025-03-17',
            duration: 24, // hours
            location: 'Central World, Bangkok',
            status: 'completed',
            completionDate: '2025-03-17',
            certificateId: 'CERT-2025-001',
            cost: 45000,
            currency: 'THB',
            paidBy: 'company',
            linkedCompetencies: ['leadership', 'strategic_thinking', 'team_management'],
            linkedIdpGoals: ['IDP-2025-001'],
            preAssessmentScore: 65,
            postAssessmentScore: 88,
            evaluations: {
                reaction: 4.5,
                learning: 4.2,
                behavior: null, // assessed later
                results: null // assessed later
            },
            instructorRating: 4.7,
            courseRating: 4.5,
            feedback: 'Excellent program with practical insights',
            attachments: ['certificate.pdf', 'course_materials.zip']
        },
        {
            id: 'TR002',
            courseCode: 'CG-TECH-042',
            courseNameEn: 'Advanced Data Analytics with Python',
            courseNameTh: 'การวิเคราะห์ข้อมูลขั้นสูงด้วย Python',
            descriptionEn: 'Hands-on training on data analysis, visualization, and machine learning fundamentals using Python.',
            descriptionTh: 'การฝึกอบรมเชิงปฏิบัติด้านการวิเคราะห์ข้อมูล การแสดงผลข้อมูล และพื้นฐานการเรียนรู้ของเครื่องด้วย Python',
            trainingType: 'external',
            category: 'technical',
            provider: 'Tech Academy Thailand',
            instructorName: 'Ajarn Prasert Wongsawan',
            startDate: '2025-06-10',
            endDate: '2025-06-14',
            duration: 40,
            location: 'Online',
            status: 'completed',
            completionDate: '2025-06-14',
            certificateId: 'CERT-2025-002',
            cost: 35000,
            currency: 'THB',
            paidBy: 'company',
            linkedCompetencies: ['data_analysis', 'technical_skills', 'problem_solving'],
            linkedIdpGoals: ['IDP-2025-002'],
            preAssessmentScore: 45,
            postAssessmentScore: 82,
            evaluations: {
                reaction: 4.8,
                learning: 4.5,
                behavior: 4.0,
                results: null
            },
            instructorRating: 4.9,
            courseRating: 4.6,
            feedback: 'Very comprehensive and well-structured course',
            attachments: ['certificate.pdf']
        },
        {
            id: 'TR003',
            courseCode: 'CG-SOFT-015',
            courseNameEn: 'Effective Communication Skills',
            courseNameTh: 'ทักษะการสื่อสารอย่างมีประสิทธิภาพ',
            descriptionEn: 'Workshop on professional communication, presentation skills, and stakeholder management.',
            descriptionTh: 'เวิร์คช็อปด้านการสื่อสารเชิงวิชาชีพ ทักษะการนำเสนอ และการจัดการผู้มีส่วนได้ส่วนเสีย',
            trainingType: 'internal',
            category: 'soft_skills',
            provider: 'Central Group Academy',
            instructorName: 'Khun Apinya Srisawat',
            startDate: '2025-08-20',
            endDate: '2025-08-21',
            duration: 16,
            location: 'Central Embassy, Bangkok',
            status: 'in_progress',
            completionDate: null,
            certificateId: null,
            cost: 15000,
            currency: 'THB',
            paidBy: 'company',
            linkedCompetencies: ['communication', 'presentation', 'interpersonal_skills'],
            linkedIdpGoals: ['IDP-2025-003'],
            preAssessmentScore: 70,
            postAssessmentScore: null,
            evaluations: {
                reaction: null,
                learning: null,
                behavior: null,
                results: null
            },
            instructorRating: null,
            courseRating: null,
            feedback: null,
            attachments: []
        },
        {
            id: 'TR004',
            courseCode: 'CG-COMP-008',
            courseNameEn: 'Annual Compliance Training',
            courseNameTh: 'การอบรมด้านการปฏิบัติตามกฎระเบียบประจำปี',
            descriptionEn: 'Mandatory annual compliance training covering anti-corruption, data privacy, and workplace ethics.',
            descriptionTh: 'การอบรมภาคบังคับประจำปีครอบคลุมการต่อต้านการทุจริต ความเป็นส่วนตัวของข้อมูล และจริยธรรมในการทำงาน',
            trainingType: 'mandatory',
            category: 'compliance',
            provider: 'Central Group Academy',
            instructorName: 'E-Learning System',
            startDate: '2025-01-05',
            endDate: '2025-01-05',
            duration: 4,
            location: 'Online',
            status: 'completed',
            completionDate: '2025-01-05',
            certificateId: 'CERT-2025-003',
            cost: 0,
            currency: 'THB',
            paidBy: 'company',
            linkedCompetencies: ['compliance', 'ethics'],
            linkedIdpGoals: [],
            preAssessmentScore: null,
            postAssessmentScore: 95,
            evaluations: {
                reaction: 4.0,
                learning: 4.2,
                behavior: null,
                results: null
            },
            instructorRating: null,
            courseRating: 4.0,
            feedback: 'Clear and concise content',
            attachments: ['certificate.pdf']
        },
        {
            id: 'TR005',
            courseCode: 'CG-CERT-001',
            courseNameEn: 'Project Management Professional (PMP)',
            courseNameTh: 'การจัดการโครงการมืออาชีพ (PMP)',
            descriptionEn: 'Preparation course for PMP certification exam.',
            descriptionTh: 'หลักสูตรเตรียมสอบใบรับรอง PMP',
            trainingType: 'certification',
            category: 'professional',
            provider: 'PMI Thailand Chapter',
            instructorName: 'Various Instructors',
            startDate: '2024-09-01',
            endDate: '2024-11-30',
            duration: 60,
            location: 'Hybrid',
            status: 'completed',
            completionDate: '2024-11-30',
            certificateId: 'CERT-2024-PMP',
            certificationNumber: 'PMP-123456',
            certificationExpiry: '2027-11-30',
            cost: 85000,
            currency: 'THB',
            paidBy: 'shared', // 50-50
            linkedCompetencies: ['project_management', 'planning', 'risk_management'],
            linkedIdpGoals: ['IDP-2024-005'],
            preAssessmentScore: 55,
            postAssessmentScore: 78,
            evaluations: {
                reaction: 4.6,
                learning: 4.4,
                behavior: 4.3,
                results: 4.5
            },
            instructorRating: 4.5,
            courseRating: 4.7,
            feedback: 'Well-prepared for the certification exam',
            attachments: ['pmp_certificate.pdf', 'pdu_log.pdf']
        },
        {
            id: 'TR006',
            courseCode: 'CG-SAFE-002',
            courseNameEn: 'Occupational Health and Safety',
            courseNameTh: 'อาชีวอนามัยและความปลอดภัย',
            descriptionEn: 'OHS training required for all employees.',
            descriptionTh: 'การอบรมด้านอาชีวอนามัยและความปลอดภัยสำหรับพนักงานทุกคน',
            trainingType: 'mandatory',
            category: 'safety',
            provider: 'Safety First Thailand',
            instructorName: 'Khun Wichai Saetang',
            startDate: '2025-02-10',
            endDate: '2025-02-10',
            duration: 8,
            location: 'Central Plaza Ladprao',
            status: 'completed',
            completionDate: '2025-02-10',
            certificateId: 'CERT-2025-OHS',
            cost: 2500,
            currency: 'THB',
            paidBy: 'company',
            linkedCompetencies: ['safety_awareness', 'risk_management'],
            linkedIdpGoals: [],
            preAssessmentScore: null,
            postAssessmentScore: 92,
            evaluations: {
                reaction: 4.2,
                learning: 4.0,
                behavior: null,
                results: null
            },
            instructorRating: 4.3,
            courseRating: 4.1,
            feedback: 'Practical and useful content',
            attachments: ['certificate.pdf']
        }
    ],

    // Training summary by category
    trainingSummary: {
        totalHours: 152,
        completedCourses: 5,
        inProgressCourses: 1,
        plannedCourses: 0,
        totalCost: 182500,
        companyPaid: 167500,
        selfPaid: 7500,
        sharedPaid: 7500,
        byCategory: {
            leadership: { hours: 24, courses: 1 },
            technical: { hours: 40, courses: 1 },
            soft_skills: { hours: 16, courses: 1 },
            compliance: { hours: 4, courses: 1 },
            professional: { hours: 60, courses: 1 },
            safety: { hours: 8, courses: 1 }
        },
        byYear: {
            2024: { hours: 60, courses: 1, cost: 85000 },
            2025: { hours: 92, courses: 5, cost: 97500 }
        }
    },

    // Certificates
    certificates: [
        {
            id: 'CERT-2025-001',
            certificateNumber: 'CG-2025-LEAD-0142',
            courseNameEn: 'Leadership Excellence Program',
            courseNameTh: 'โปรแกรมพัฒนาความเป็นผู้นำ',
            issueDate: '2025-03-17',
            expiryDate: null, // No expiry
            issuedBy: 'Central Group Academy',
            status: 'active',
            verificationCode: 'VER-CG-2025-001-ABC123',
            qrCode: 'https://verify.centralgroup.com/cert/CG-2025-LEAD-0142',
            downloadUrl: '/certificates/CERT-2025-001.pdf'
        },
        {
            id: 'CERT-2025-002',
            certificateNumber: 'TAT-2025-DATA-0089',
            courseNameEn: 'Advanced Data Analytics with Python',
            courseNameTh: 'การวิเคราะห์ข้อมูลขั้นสูงด้วย Python',
            issueDate: '2025-06-14',
            expiryDate: null,
            issuedBy: 'Tech Academy Thailand',
            status: 'active',
            verificationCode: 'VER-TAT-2025-002-DEF456',
            qrCode: 'https://verify.techacademy.co.th/cert/TAT-2025-DATA-0089',
            downloadUrl: '/certificates/CERT-2025-002.pdf'
        },
        {
            id: 'CERT-2025-003',
            certificateNumber: 'CG-2025-COMP-1205',
            courseNameEn: 'Annual Compliance Training',
            courseNameTh: 'การอบรมด้านการปฏิบัติตามกฎระเบียบประจำปี',
            issueDate: '2025-01-05',
            expiryDate: '2026-01-05',
            issuedBy: 'Central Group Academy',
            status: 'active',
            verificationCode: 'VER-CG-2025-003-GHI789',
            qrCode: 'https://verify.centralgroup.com/cert/CG-2025-COMP-1205',
            downloadUrl: '/certificates/CERT-2025-003.pdf'
        },
        {
            id: 'CERT-2024-PMP',
            certificateNumber: 'PMP-123456',
            courseNameEn: 'Project Management Professional',
            courseNameTh: 'การจัดการโครงการมืออาชีพ',
            issueDate: '2024-12-15',
            expiryDate: '2027-12-15',
            issuedBy: 'Project Management Institute',
            status: 'active',
            verificationCode: 'PMI-PMP-123456',
            qrCode: 'https://www.pmi.org/verify/PMP-123456',
            downloadUrl: '/certificates/CERT-2024-PMP.pdf'
        },
        {
            id: 'CERT-2025-OHS',
            certificateNumber: 'OHS-2025-5678',
            courseNameEn: 'Occupational Health and Safety',
            courseNameTh: 'อาชีวอนามัยและความปลอดภัย',
            issueDate: '2025-02-10',
            expiryDate: '2026-02-10',
            issuedBy: 'Safety First Thailand',
            status: 'active',
            verificationCode: 'VER-SFT-2025-5678',
            qrCode: 'https://verify.safetyfirst.co.th/cert/OHS-2025-5678',
            downloadUrl: '/certificates/CERT-2025-OHS.pdf'
        }
    ],

    // Certificate templates
    certificateTemplates: [
        { id: 'TPL001', name: 'Standard Training Certificate', category: 'general', isDefault: true },
        { id: 'TPL002', name: 'Leadership Program Certificate', category: 'leadership', isDefault: false },
        { id: 'TPL003', name: 'Technical Certification', category: 'technical', isDefault: false },
        { id: 'TPL004', name: 'Compliance Certificate', category: 'compliance', isDefault: false },
        { id: 'TPL005', name: 'Safety Certificate', category: 'safety', isDefault: false }
    ],

    // Competency mapping
    competencyLinks: [
        {
            competencyId: 'leadership',
            competencyNameEn: 'Leadership',
            competencyNameTh: 'ความเป็นผู้นำ',
            currentLevel: 3,
            targetLevel: 4,
            trainingContributions: ['TR001'],
            lastUpdated: '2025-03-17',
            progressPercentage: 75
        },
        {
            competencyId: 'data_analysis',
            competencyNameEn: 'Data Analysis',
            competencyNameTh: 'การวิเคราะห์ข้อมูล',
            currentLevel: 3,
            targetLevel: 4,
            trainingContributions: ['TR002'],
            lastUpdated: '2025-06-14',
            progressPercentage: 80
        },
        {
            competencyId: 'project_management',
            competencyNameEn: 'Project Management',
            competencyNameTh: 'การจัดการโครงการ',
            currentLevel: 4,
            targetLevel: 4,
            trainingContributions: ['TR005'],
            lastUpdated: '2024-11-30',
            progressPercentage: 100
        },
        {
            competencyId: 'communication',
            competencyNameEn: 'Communication',
            competencyNameTh: 'การสื่อสาร',
            currentLevel: 2,
            targetLevel: 4,
            trainingContributions: ['TR003'],
            lastUpdated: '2025-08-20',
            progressPercentage: 50
        }
    ],

    // IDP progress linked to training
    idpProgress: [
        {
            goalId: 'IDP-2025-001',
            goalNameEn: 'Develop Leadership Skills',
            goalNameTh: 'พัฒนาทักษะความเป็นผู้นำ',
            targetDate: '2025-12-31',
            status: 'in_progress',
            progress: 60,
            linkedTraining: ['TR001'],
            completedActions: 3,
            totalActions: 5
        },
        {
            goalId: 'IDP-2025-002',
            goalNameEn: 'Master Data Analytics',
            goalNameTh: 'เชี่ยวชาญการวิเคราะห์ข้อมูล',
            targetDate: '2025-12-31',
            status: 'in_progress',
            progress: 75,
            linkedTraining: ['TR002'],
            completedActions: 3,
            totalActions: 4
        },
        {
            goalId: 'IDP-2025-003',
            goalNameEn: 'Improve Communication',
            goalNameTh: 'พัฒนาทักษะการสื่อสาร',
            targetDate: '2025-12-31',
            status: 'in_progress',
            progress: 40,
            linkedTraining: ['TR003'],
            completedActions: 2,
            totalActions: 5
        }
    ],

    // Skill matrix (department level)
    skillMatrix: {
        departmentId: 'IT',
        departmentNameEn: 'Information Technology',
        departmentNameTh: 'เทคโนโลยีสารสนเทศ',
        skills: [
            {
                skillId: 'python',
                skillNameEn: 'Python Programming',
                skillNameTh: 'การเขียนโปรแกรม Python',
                requiredLevel: 3,
                currentLevel: 3,
                gap: 0,
                relevantTraining: ['TR002']
            },
            {
                skillId: 'data_viz',
                skillNameEn: 'Data Visualization',
                skillNameTh: 'การแสดงผลข้อมูล',
                requiredLevel: 3,
                currentLevel: 2,
                gap: 1,
                relevantTraining: ['TR002']
            },
            {
                skillId: 'pm',
                skillNameEn: 'Project Management',
                skillNameTh: 'การจัดการโครงการ',
                requiredLevel: 3,
                currentLevel: 4,
                gap: -1,
                relevantTraining: ['TR005']
            }
        ]
    },

    // Training categories lookup
    trainingCategories: [
        { value: 'leadership', labelEn: 'Leadership', labelTh: 'ภาวะผู้นำ', color: 'purple' },
        { value: 'technical', labelEn: 'Technical', labelTh: 'ทักษะทางเทคนิค', color: 'blue' },
        { value: 'soft_skills', labelEn: 'Soft Skills', labelTh: 'ทักษะอ่อน', color: 'green' },
        { value: 'compliance', labelEn: 'Compliance', labelTh: 'การปฏิบัติตามกฎ', color: 'orange' },
        { value: 'professional', labelEn: 'Professional', labelTh: 'วิชาชีพ', color: 'teal' },
        { value: 'safety', labelEn: 'Safety', labelTh: 'ความปลอดภัย', color: 'red' },
        { value: 'language', labelEn: 'Language', labelTh: 'ภาษา', color: 'indigo' },
        { value: 'onboarding', labelEn: 'Onboarding', labelTh: 'ปฐมนิเทศ', color: 'pink' }
    ],

    // Training types lookup
    trainingTypes: [
        { value: 'internal', labelEn: 'Internal Training', labelTh: 'อบรมภายใน' },
        { value: 'external', labelEn: 'External Training', labelTh: 'อบรมภายนอก' },
        { value: 'mandatory', labelEn: 'Mandatory', labelTh: 'ภาคบังคับ' },
        { value: 'certification', labelEn: 'Certification', labelTh: 'ใบรับรองวิชาชีพ' },
        { value: 'online', labelEn: 'Online/E-Learning', labelTh: 'ออนไลน์' },
        { value: 'workshop', labelEn: 'Workshop', labelTh: 'เวิร์คช็อป' },
        { value: 'conference', labelEn: 'Conference/Seminar', labelTh: 'การประชุม/สัมมนา' }
    ],

    // Training status lookup
    trainingStatuses: [
        { value: 'planned', labelEn: 'Planned', labelTh: 'วางแผนแล้ว', color: 'gray', icon: 'event' },
        { value: 'registered', labelEn: 'Registered', labelTh: 'ลงทะเบียนแล้ว', color: 'blue', icon: 'how_to_reg' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'orange', icon: 'pending' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'green', icon: 'check_circle' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก', color: 'red', icon: 'cancel' },
        { value: 'failed', labelEn: 'Failed', labelTh: 'ไม่ผ่าน', color: 'red', icon: 'error' }
    ],

    // Kirkpatrick evaluation levels
    kirkpatrickLevels: [
        { level: 1, key: 'reaction', labelEn: 'Reaction', labelTh: 'ความพึงพอใจ', descriptionEn: 'How participants felt about the training', descriptionTh: 'ผู้เข้าร่วมรู้สึกอย่างไรกับการอบรม' },
        { level: 2, key: 'learning', labelEn: 'Learning', labelTh: 'การเรียนรู้', descriptionEn: 'What participants learned', descriptionTh: 'ผู้เข้าร่วมได้เรียนรู้อะไร' },
        { level: 3, key: 'behavior', labelEn: 'Behavior', labelTh: 'พฤติกรรม', descriptionEn: 'How participants apply what they learned', descriptionTh: 'ผู้เข้าร่วมนำสิ่งที่เรียนรู้ไปใช้อย่างไร' },
        { level: 4, key: 'results', labelEn: 'Results', labelTh: 'ผลลัพธ์', descriptionEn: 'Business impact of the training', descriptionTh: 'ผลกระทบทางธุรกิจจากการอบรม' }
    ],

    // Department training report
    departmentReport: {
        departmentId: 'IT',
        departmentNameEn: 'Information Technology',
        departmentNameTh: 'เทคโนโลยีสารสนเทศ',
        period: '2025',
        totalEmployees: 45,
        employeesWithTraining: 42,
        participationRate: 93.3,
        totalHours: 3240,
        averageHoursPerEmployee: 72,
        totalBudget: 2500000,
        actualSpend: 2150000,
        budgetUtilization: 86,
        completionRates: {
            mandatory: 98,
            optional: 75,
            certification: 60
        },
        topCourses: [
            { courseName: 'Annual Compliance Training', participants: 45 },
            { courseName: 'Agile Project Management', participants: 32 },
            { courseName: 'Cloud Computing Fundamentals', participants: 28 }
        ]
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockTrainingRecords;
}

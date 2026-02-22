/**
 * Mock Recruitment Data
 * Job postings, applications, and candidate data
 */

const MockRecruitmentData = {
    // Job requisitions/postings
    jobPostings: [
        {
            id: 'JOB-001',
            positionId: 'POS-001',
            positionTitle: 'Senior Software Engineer',
            positionTitleTh: 'วิศวกรซอฟต์แวร์อาวุโส',
            department: 'Information Technology',
            departmentTh: 'ฝ่ายเทคโนโลยีสารสนเทศ',
            company: 'Central Retail Corporation',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            jobFamily: 'Technology',
            jobFamilyTh: 'เทคโนโลยี',
            employmentType: 'full_time',
            salaryRangeMin: 80000,
            salaryRangeMax: 120000,
            currency: 'THB',
            postingDate: '2025-12-15',
            closingDate: '2026-02-15',
            status: 'open',
            headcount: 2,
            filledCount: 0,
            description: 'We are looking for a Senior Software Engineer to join our IT team. The ideal candidate will have strong experience in web development and cloud technologies.',
            descriptionTh: 'เรากำลังมองหาวิศวกรซอฟต์แวร์อาวุโสเพื่อร่วมงานกับทีม IT ผู้สมัครที่เหมาะสมควรมีประสบการณ์ที่แข็งแกร่งในการพัฒนาเว็บและเทคโนโลยีคลาวด์',
            requirements: [
                "Bachelor's degree in Computer Science or related field",
                "5+ years of experience in software development",
                "Strong proficiency in JavaScript, TypeScript, and modern frameworks",
                "Experience with cloud platforms (AWS, GCP, or Azure)",
                "Good communication skills in English"
            ],
            requirementsTh: [
                "ปริญญาตรีสาขาวิทยาการคอมพิวเตอร์หรือสาขาที่เกี่ยวข้อง",
                "ประสบการณ์ 5 ปีขึ้นไปในการพัฒนาซอฟต์แวร์",
                "มีความชำนาญใน JavaScript, TypeScript และ framework ใหม่ๆ",
                "มีประสบการณ์กับ cloud platforms (AWS, GCP หรือ Azure)",
                "มีทักษะการสื่อสารภาษาอังกฤษที่ดี"
            ],
            benefits: [
                "Competitive salary and annual bonus",
                "Health and life insurance",
                "Provident fund",
                "Employee discount",
                "Flexible working hours"
            ],
            benefitsTh: [
                "เงินเดือนที่แข่งขันได้และโบนัสประจำปี",
                "ประกันสุขภาพและประกันชีวิต",
                "กองทุนสำรองเลี้ยงชีพ",
                "ส่วนลดพนักงาน",
                "เวลาทำงานยืดหยุ่น"
            ],
            jdAttachment: '/documents/jd/senior-software-engineer.pdf',
            hiringManager: 'EMP-003',
            hiringManagerName: 'Somchai Techakarn',
            hrRecruiter: 'EMP-010',
            hrRecruiterName: 'Nattaya HR',
            applicationCount: 25,
            isInternal: true,
            isExternal: true
        },
        {
            id: 'JOB-002',
            positionId: 'POS-002',
            positionTitle: 'HR Business Partner',
            positionTitleTh: 'พันธมิตรธุรกิจทรัพยากรบุคคล',
            department: 'Human Resources',
            departmentTh: 'ฝ่ายทรัพยากรบุคคล',
            company: 'Central Retail Corporation',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            jobFamily: 'Human Resources',
            jobFamilyTh: 'ทรัพยากรบุคคล',
            employmentType: 'full_time',
            salaryRangeMin: 60000,
            salaryRangeMax: 90000,
            currency: 'THB',
            postingDate: '2025-12-20',
            closingDate: '2026-01-31',
            status: 'open',
            headcount: 1,
            filledCount: 0,
            description: 'We are seeking an experienced HR Business Partner to support our business units.',
            descriptionTh: 'เรากำลังมองหา HR Business Partner ที่มีประสบการณ์เพื่อสนับสนุนหน่วยธุรกิจของเรา',
            requirements: [
                "Bachelor's degree in HR, Business Administration, or related field",
                "5+ years of HR experience with HRBP role",
                "Strong understanding of Thai labor law",
                "Excellent interpersonal and communication skills"
            ],
            requirementsTh: [
                "ปริญญาตรีสาขา HR, บริหารธุรกิจ หรือสาขาที่เกี่ยวข้อง",
                "ประสบการณ์ 5 ปีขึ้นไปในตำแหน่ง HRBP",
                "มีความเข้าใจกฎหมายแรงงานไทยเป็นอย่างดี",
                "มีทักษะการสื่อสารและมนุษยสัมพันธ์ที่ดีเยี่ยม"
            ],
            benefits: [
                "Competitive salary package",
                "Health insurance coverage",
                "Learning and development opportunities"
            ],
            benefitsTh: [
                "แพ็คเกจเงินเดือนที่แข่งขันได้",
                "ประกันสุขภาพครอบคลุม",
                "โอกาสในการเรียนรู้และพัฒนา"
            ],
            jdAttachment: '/documents/jd/hr-business-partner.pdf',
            hiringManager: 'EMP-005',
            hiringManagerName: 'Pranee Suksri',
            hrRecruiter: 'EMP-010',
            hrRecruiterName: 'Nattaya HR',
            applicationCount: 18,
            isInternal: true,
            isExternal: true
        },
        {
            id: 'JOB-003',
            positionId: 'POS-003',
            positionTitle: 'Store Manager',
            positionTitleTh: 'ผู้จัดการร้าน',
            department: 'Retail Operations',
            departmentTh: 'ฝ่ายปฏิบัติการค้าปลีก',
            company: 'Central Food Retail',
            location: 'Chiang Mai',
            locationTh: 'เชียงใหม่',
            jobFamily: 'Retail',
            jobFamilyTh: 'ค้าปลีก',
            employmentType: 'full_time',
            salaryRangeMin: 45000,
            salaryRangeMax: 65000,
            currency: 'THB',
            postingDate: '2026-01-01',
            closingDate: '2026-02-28',
            status: 'open',
            headcount: 3,
            filledCount: 1,
            description: 'Looking for experienced Store Managers to lead our new store in Chiang Mai.',
            descriptionTh: 'กำลังมองหาผู้จัดการร้านที่มีประสบการณ์เพื่อนำทีมร้านใหม่ในเชียงใหม่',
            requirements: [
                "Bachelor's degree or equivalent",
                "3+ years of retail management experience",
                "Strong leadership and team management skills",
                "Ability to work flexible hours including weekends"
            ],
            requirementsTh: [
                "ปริญญาตรีหรือเทียบเท่า",
                "ประสบการณ์บริหารค้าปลีก 3 ปีขึ้นไป",
                "มีทักษะความเป็นผู้นำและการบริหารทีมที่แข็งแกร่ง",
                "สามารถทำงานเวลายืดหยุ่นรวมถึงวันหยุดสุดสัปดาห์"
            ],
            benefits: [
                "Performance bonus",
                "Staff discount",
                "Career advancement opportunities"
            ],
            benefitsTh: [
                "โบนัสตามผลงาน",
                "ส่วนลดพนักงาน",
                "โอกาสก้าวหน้าในสายงาน"
            ],
            jdAttachment: null,
            hiringManager: 'EMP-008',
            hiringManagerName: 'Wichai Retail',
            hrRecruiter: 'EMP-011',
            hrRecruiterName: 'Suda Recruiter',
            applicationCount: 42,
            isInternal: true,
            isExternal: true
        },
        {
            id: 'JOB-004',
            positionId: 'POS-004',
            positionTitle: 'Marketing Specialist',
            positionTitleTh: 'ผู้เชี่ยวชาญด้านการตลาด',
            department: 'Marketing',
            departmentTh: 'ฝ่ายการตลาด',
            company: 'Central Retail Corporation',
            location: 'Bangkok',
            locationTh: 'กรุงเทพมหานคร',
            jobFamily: 'Marketing',
            jobFamilyTh: 'การตลาด',
            employmentType: 'full_time',
            salaryRangeMin: 35000,
            salaryRangeMax: 50000,
            currency: 'THB',
            postingDate: '2025-11-01',
            closingDate: '2025-12-31',
            status: 'closed',
            headcount: 1,
            filledCount: 1,
            description: 'Seeking a creative Marketing Specialist to drive our digital campaigns.',
            descriptionTh: 'กำลังมองหาผู้เชี่ยวชาญการตลาดที่สร้างสรรค์เพื่อขับเคลื่อนแคมเปญดิจิทัลของเรา',
            requirements: [
                "Bachelor's degree in Marketing or related field",
                "2+ years of digital marketing experience",
                "Proficiency in social media platforms",
                "Creative thinking and analytical skills"
            ],
            requirementsTh: [
                "ปริญญาตรีสาขาการตลาดหรือสาขาที่เกี่ยวข้อง",
                "ประสบการณ์ 2 ปีขึ้นไปในการตลาดดิจิทัล",
                "มีความชำนาญในแพลตฟอร์มโซเชียลมีเดีย",
                "มีความคิดสร้างสรรค์และทักษะการวิเคราะห์"
            ],
            benefits: [],
            benefitsTh: [],
            jdAttachment: null,
            hiringManager: 'EMP-012',
            hiringManagerName: 'Kanokwan Marketing',
            hrRecruiter: 'EMP-010',
            hrRecruiterName: 'Nattaya HR',
            applicationCount: 56,
            isInternal: true,
            isExternal: true
        }
    ],

    // Applications
    applications: [
        {
            id: 'APP-001',
            jobId: 'JOB-001',
            candidateId: 'CAND-001',
            appliedDate: '2025-12-20',
            status: 'interview',
            statusHistory: [
                { status: 'new', date: '2025-12-20', updatedBy: 'System', notes: 'Application received' },
                { status: 'screening', date: '2025-12-22', updatedBy: 'Nattaya HR', notes: 'Resume reviewed, meets requirements' },
                { status: 'interview', date: '2025-12-28', updatedBy: 'Nattaya HR', notes: 'Phone screening completed, scheduled for interview' }
            ],
            source: 'internal',
            referralEmployeeId: null,
            notes: 'Strong candidate with relevant experience',
            interviewSchedule: [
                {
                    date: '2026-01-15',
                    time: '10:00',
                    type: 'technical',
                    interviewers: ['Somchai Techakarn'],
                    location: 'Meeting Room 5A',
                    status: 'scheduled'
                }
            ],
            cvAttachment: '/documents/cv/cv-001.pdf',
            coverLetter: 'I am excited to apply for the Senior Software Engineer position...'
        },
        {
            id: 'APP-002',
            jobId: 'JOB-001',
            candidateId: 'CAND-002',
            appliedDate: '2025-12-18',
            status: 'screening',
            statusHistory: [
                { status: 'new', date: '2025-12-18', updatedBy: 'System', notes: 'Application received' },
                { status: 'screening', date: '2025-12-21', updatedBy: 'Nattaya HR', notes: 'Under review' }
            ],
            source: 'external',
            referralEmployeeId: null,
            notes: '',
            interviewSchedule: [],
            cvAttachment: '/documents/cv/cv-002.pdf',
            coverLetter: ''
        },
        {
            id: 'APP-003',
            jobId: 'JOB-001',
            candidateId: 'CAND-003',
            appliedDate: '2025-12-25',
            status: 'new',
            statusHistory: [
                { status: 'new', date: '2025-12-25', updatedBy: 'System', notes: 'Application received' }
            ],
            source: 'referral',
            referralEmployeeId: 'EMP-001',
            notes: 'Referred by Somchai',
            interviewSchedule: [],
            cvAttachment: '/documents/cv/cv-003.pdf',
            coverLetter: 'Dear Hiring Manager, I was referred by my colleague...'
        },
        {
            id: 'APP-004',
            jobId: 'JOB-002',
            candidateId: 'CAND-004',
            appliedDate: '2025-12-22',
            status: 'offer',
            statusHistory: [
                { status: 'new', date: '2025-12-22', updatedBy: 'System', notes: 'Application received' },
                { status: 'screening', date: '2025-12-23', updatedBy: 'Nattaya HR', notes: 'Excellent background' },
                { status: 'interview', date: '2025-12-26', updatedBy: 'Nattaya HR', notes: 'Interview scheduled' },
                { status: 'offer', date: '2026-01-05', updatedBy: 'Pranee Suksri', notes: 'Offer extended' }
            ],
            source: 'external',
            referralEmployeeId: null,
            notes: 'Top candidate, made offer',
            interviewSchedule: [
                {
                    date: '2025-12-28',
                    time: '14:00',
                    type: 'hr',
                    interviewers: ['Nattaya HR'],
                    location: 'Online',
                    status: 'completed'
                },
                {
                    date: '2026-01-02',
                    time: '10:00',
                    type: 'hiring_manager',
                    interviewers: ['Pranee Suksri'],
                    location: 'Meeting Room 3B',
                    status: 'completed'
                }
            ],
            cvAttachment: '/documents/cv/cv-004.pdf',
            coverLetter: 'With 8 years of HR experience...'
        },
        {
            id: 'APP-005',
            jobId: 'JOB-003',
            candidateId: 'CAND-005',
            appliedDate: '2026-01-02',
            status: 'rejected',
            statusHistory: [
                { status: 'new', date: '2026-01-02', updatedBy: 'System', notes: 'Application received' },
                { status: 'screening', date: '2026-01-03', updatedBy: 'Suda Recruiter', notes: 'Does not meet minimum requirements' },
                { status: 'rejected', date: '2026-01-03', updatedBy: 'Suda Recruiter', notes: 'Insufficient experience' }
            ],
            source: 'external',
            referralEmployeeId: null,
            notes: 'Less than 1 year experience',
            interviewSchedule: [],
            cvAttachment: '/documents/cv/cv-005.pdf',
            coverLetter: ''
        }
    ],

    // Candidates
    candidates: [
        {
            id: 'CAND-001',
            firstName: 'Prapat',
            firstNameTh: 'ประพัฒน์',
            lastName: 'Wongsakul',
            lastNameTh: 'วงศ์สกุล',
            email: 'prapat.w@email.com',
            phone: '081-234-5678',
            currentCompany: 'Tech Solutions Co., Ltd.',
            currentPosition: 'Software Engineer',
            yearsOfExperience: 6,
            education: [
                {
                    degree: "bachelor",
                    institution: "Chulalongkorn University",
                    major: "Computer Engineering",
                    graduationYear: 2019
                }
            ],
            workExperience: [
                {
                    company: 'Tech Solutions Co., Ltd.',
                    position: 'Software Engineer',
                    startDate: '2020-03',
                    endDate: null,
                    description: 'Full-stack development using React and Node.js'
                },
                {
                    company: 'ABC Digital',
                    position: 'Junior Developer',
                    startDate: '2019-06',
                    endDate: '2020-02',
                    description: 'Web development and maintenance'
                }
            ],
            skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS'],
            linkedInUrl: 'https://linkedin.com/in/prapat-w',
            isInternal: true,
            internalEmployeeId: 'EMP-020'
        },
        {
            id: 'CAND-002',
            firstName: 'Siriwan',
            firstNameTh: 'ศิริวรรณ',
            lastName: 'Jantawong',
            lastNameTh: 'จันทะวงศ์',
            email: 'siriwan.j@email.com',
            phone: '089-876-5432',
            currentCompany: 'Digital Agency',
            currentPosition: 'Lead Developer',
            yearsOfExperience: 8,
            education: [
                {
                    degree: "master",
                    institution: "Asian Institute of Technology",
                    major: "Information Technology",
                    graduationYear: 2016
                }
            ],
            workExperience: [
                {
                    company: 'Digital Agency',
                    position: 'Lead Developer',
                    startDate: '2019-01',
                    endDate: null,
                    description: 'Leading development team for enterprise projects'
                }
            ],
            skills: ['Java', 'Python', 'React', 'Cloud Architecture'],
            linkedInUrl: 'https://linkedin.com/in/siriwan-j',
            isInternal: false,
            internalEmployeeId: null
        },
        {
            id: 'CAND-003',
            firstName: 'Natthawut',
            firstNameTh: 'ณัฐวุฒิ',
            lastName: 'Chaiyasit',
            lastNameTh: 'ชัยสิทธิ์',
            email: 'natthawut.c@email.com',
            phone: '086-111-2222',
            currentCompany: 'StartUp Inc.',
            currentPosition: 'Senior Developer',
            yearsOfExperience: 5,
            education: [
                {
                    degree: "bachelor",
                    institution: "King Mongkut's University of Technology",
                    major: "Software Engineering",
                    graduationYear: 2020
                }
            ],
            workExperience: [],
            skills: ['JavaScript', 'Vue.js', 'Python', 'Docker'],
            linkedInUrl: null,
            isInternal: false,
            internalEmployeeId: null
        },
        {
            id: 'CAND-004',
            firstName: 'Kamonwan',
            firstNameTh: 'กมลวรรณ',
            lastName: 'Phromma',
            lastNameTh: 'พรหมมา',
            email: 'kamonwan.p@email.com',
            phone: '082-333-4444',
            currentCompany: 'Global HR Consulting',
            currentPosition: 'HR Manager',
            yearsOfExperience: 8,
            education: [
                {
                    degree: "master",
                    institution: "Thammasat University",
                    major: "Human Resource Management",
                    graduationYear: 2016
                }
            ],
            workExperience: [
                {
                    company: 'Global HR Consulting',
                    position: 'HR Manager',
                    startDate: '2018-06',
                    endDate: null,
                    description: 'Managing HR operations for multiple clients'
                }
            ],
            skills: ['HRBP', 'Labor Law', 'Talent Acquisition', 'Employee Relations'],
            linkedInUrl: 'https://linkedin.com/in/kamonwan-p',
            isInternal: false,
            internalEmployeeId: null
        },
        {
            id: 'CAND-005',
            firstName: 'Chakrit',
            firstNameTh: 'ชาคริต',
            lastName: 'Maneerat',
            lastNameTh: 'มณีรัตน์',
            email: 'chakrit.m@email.com',
            phone: '095-555-6666',
            currentCompany: 'Fresh Graduate',
            currentPosition: 'N/A',
            yearsOfExperience: 0,
            education: [
                {
                    degree: "bachelor",
                    institution: "Kasetsart University",
                    major: "Business Administration",
                    graduationYear: 2025
                }
            ],
            workExperience: [],
            skills: ['Customer Service', 'MS Office'],
            linkedInUrl: null,
            isInternal: false,
            internalEmployeeId: null
        }
    ],

    // Application statuses with workflow
    applicationStatuses: [
        { value: 'new', labelEn: 'New', labelTh: 'ใหม่', color: 'bg-blue-100 text-blue-800', icon: 'fiber_new' },
        { value: 'screening', labelEn: 'Screening', labelTh: 'คัดกรอง', color: 'bg-yellow-100 text-yellow-800', icon: 'search' },
        { value: 'interview', labelEn: 'Interview', labelTh: 'สัมภาษณ์', color: 'bg-purple-100 text-purple-800', icon: 'event' },
        { value: 'offer', labelEn: 'Offer', labelTh: 'ข้อเสนอ', color: 'bg-green-100 text-green-800', icon: 'handshake' },
        { value: 'hired', labelEn: 'Hired', labelTh: 'รับเข้าทำงาน', color: 'bg-green-500 text-white', icon: 'check_circle' },
        { value: 'rejected', labelEn: 'Rejected', labelTh: 'ปฏิเสธ', color: 'bg-red-100 text-red-800', icon: 'cancel' }
    ],

    // Employment types
    employmentTypes: [
        { value: 'full_time', labelEn: 'Full-time', labelTh: 'งานประจำเต็มเวลา' },
        { value: 'part_time', labelEn: 'Part-time', labelTh: 'งานพาร์ทไทม์' },
        { value: 'contract', labelEn: 'Contract', labelTh: 'สัญญาจ้าง' },
        { value: 'intern', labelEn: 'Internship', labelTh: 'ฝึกงาน' }
    ],

    // Interview types
    interviewTypes: [
        { value: 'phone', labelEn: 'Phone Screening', labelTh: 'สัมภาษณ์ทางโทรศัพท์' },
        { value: 'hr', labelEn: 'HR Interview', labelTh: 'สัมภาษณ์ HR' },
        { value: 'technical', labelEn: 'Technical Interview', labelTh: 'สัมภาษณ์เทคนิค' },
        { value: 'hiring_manager', labelEn: 'Hiring Manager', labelTh: 'สัมภาษณ์ผู้จัดการ' },
        { value: 'panel', labelEn: 'Panel Interview', labelTh: 'สัมภาษณ์คณะกรรมการ' },
        { value: 'final', labelEn: 'Final Interview', labelTh: 'สัมภาษณ์รอบสุดท้าย' }
    ],

    // Application sources
    applicationSources: [
        { value: 'internal', labelEn: 'Internal Application', labelTh: 'สมัครภายใน' },
        { value: 'external', labelEn: 'External Application', labelTh: 'สมัครภายนอก' },
        { value: 'referral', labelEn: 'Employee Referral', labelTh: 'พนักงานแนะนำ' },
        { value: 'agency', labelEn: 'Recruitment Agency', labelTh: 'บริษัทจัดหางาน' },
        { value: 'linkedin', labelEn: 'LinkedIn', labelTh: 'LinkedIn' },
        { value: 'jobsdb', labelEn: 'JobsDB', labelTh: 'JobsDB' }
    ],

    // Locations for filtering
    locations: [
        { value: 'Bangkok', labelEn: 'Bangkok', labelTh: 'กรุงเทพมหานคร' },
        { value: 'Chiang Mai', labelEn: 'Chiang Mai', labelTh: 'เชียงใหม่' },
        { value: 'Phuket', labelEn: 'Phuket', labelTh: 'ภูเก็ต' },
        { value: 'Pattaya', labelEn: 'Pattaya', labelTh: 'พัทยา' },
        { value: 'Khon Kaen', labelEn: 'Khon Kaen', labelTh: 'ขอนแก่น' }
    ],

    // Departments for filtering
    departments: [
        { value: 'Information Technology', labelEn: 'Information Technology', labelTh: 'เทคโนโลยีสารสนเทศ' },
        { value: 'Human Resources', labelEn: 'Human Resources', labelTh: 'ทรัพยากรบุคคล' },
        { value: 'Retail Operations', labelEn: 'Retail Operations', labelTh: 'ปฏิบัติการค้าปลีก' },
        { value: 'Marketing', labelEn: 'Marketing', labelTh: 'การตลาด' },
        { value: 'Finance', labelEn: 'Finance', labelTh: 'การเงิน' },
        { value: 'Supply Chain', labelEn: 'Supply Chain', labelTh: 'ซัพพลายเชน' }
    ],

    // Job families for filtering
    jobFamilies: [
        { value: 'Technology', labelEn: 'Technology', labelTh: 'เทคโนโลยี' },
        { value: 'Human Resources', labelEn: 'Human Resources', labelTh: 'ทรัพยากรบุคคล' },
        { value: 'Retail', labelEn: 'Retail', labelTh: 'ค้าปลีก' },
        { value: 'Marketing', labelEn: 'Marketing', labelTh: 'การตลาด' },
        { value: 'Finance', labelEn: 'Finance & Accounting', labelTh: 'การเงินและบัญชี' },
        { value: 'Operations', labelEn: 'Operations', labelTh: 'ปฏิบัติการ' }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockRecruitmentData;
}

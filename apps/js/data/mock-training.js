/**
 * Mock Training Data
 * Training catalog, courses, enrollments, and roadmaps
 */

const MockTrainingData = {
    // Training Categories
    categories: [
        { id: 'cat-1', code: 'ONBOARD', nameEn: 'Onboarding', nameTh: 'ปฐมนิเทศ', icon: 'flag', color: 'blue' },
        { id: 'cat-2', code: 'LEADERSHIP', nameEn: 'Leadership Development', nameTh: 'การพัฒนาภาวะผู้นำ', icon: 'groups', color: 'purple' },
        { id: 'cat-3', code: 'TECHNICAL', nameEn: 'Technical Skills', nameTh: 'ทักษะเทคนิค', icon: 'engineering', color: 'green' },
        { id: 'cat-4', code: 'SOFT', nameEn: 'Soft Skills', nameTh: 'ทักษะอ่อน', icon: 'psychology', color: 'orange' },
        { id: 'cat-5', code: 'COMPLIANCE', nameEn: 'Compliance & Safety', nameTh: 'การปฏิบัติตามกฎระเบียบและความปลอดภัย', icon: 'verified_user', color: 'red' },
        { id: 'cat-6', code: 'DIGITAL', nameEn: 'Digital Transformation', nameTh: 'การเปลี่ยนผ่านดิจิทัล', icon: 'computer', color: 'teal' },
        { id: 'cat-7', code: 'RETAIL', nameEn: 'Retail Operations', nameTh: 'การดำเนินงานค้าปลีก', icon: 'store', color: 'amber' },
        { id: 'cat-8', code: 'SERVICE', nameEn: 'Customer Service', nameTh: 'บริการลูกค้า', icon: 'support_agent', color: 'pink' }
    ],

    // Delivery Methods
    deliveryMethods: [
        { value: 'classroom', labelEn: 'Classroom', labelTh: 'ห้องเรียน', icon: 'school' },
        { value: 'online', labelEn: 'Online/E-Learning', labelTh: 'ออนไลน์/อีเลิร์นนิง', icon: 'computer' },
        { value: 'blended', labelEn: 'Blended Learning', labelTh: 'การเรียนแบบผสมผสาน', icon: 'shuffle' },
        { value: 'workshop', labelEn: 'Workshop', labelTh: 'เวิร์คช็อป', icon: 'build' },
        { value: 'onthejob', labelEn: 'On-the-Job Training', labelTh: 'การฝึกอบรมขณะทำงาน', icon: 'work' },
        { value: 'seminar', labelEn: 'Seminar', labelTh: 'สัมมนา', icon: 'mic' }
    ],

    // Training Locations
    locations: [
        { id: 'loc-1', nameEn: 'Central Academy - Lat Phrao', nameTh: 'Central Academy - ลาดพร้าว', address: 'Central Plaza Lat Phrao, 17th Floor' },
        { id: 'loc-2', nameEn: 'Central Academy - Silom', nameTh: 'Central Academy - สีลม', address: 'Central Tower, 25th Floor' },
        { id: 'loc-3', nameEn: 'Central Academy - Pattaya', nameTh: 'Central Academy - พัทยา', address: 'Central Pattaya, 5th Floor' },
        { id: 'loc-4', nameEn: 'Online - MS Teams', nameTh: 'ออนไลน์ - MS Teams', address: 'Virtual Classroom' },
        { id: 'loc-5', nameEn: 'Online - LMS Platform', nameTh: 'ออนไลน์ - ระบบ LMS', address: 'Self-paced Learning' }
    ],

    // Instructors
    instructors: [
        {
            id: 'inst-1',
            nameEn: 'Somchai Prasert',
            nameTh: 'สมชาย ประเสริฐ',
            title: 'Senior Training Manager',
            expertise: ['Leadership', 'Management'],
            avatar: null
        },
        {
            id: 'inst-2',
            nameEn: 'Nattaya Srisuwan',
            nameTh: 'ณัฐญา ศรีสุวรรณ',
            title: 'Learning Specialist',
            expertise: ['Soft Skills', 'Communication'],
            avatar: null
        },
        {
            id: 'inst-3',
            nameEn: 'Tanawat Kittipong',
            nameTh: 'ธนวัฒน์ กิตติพงษ์',
            title: 'IT Training Lead',
            expertise: ['Digital Skills', 'Technical'],
            avatar: null
        },
        {
            id: 'inst-4',
            nameEn: 'Pranee Charoensuk',
            nameTh: 'ปราณี เจริญสุข',
            title: 'Compliance Officer',
            expertise: ['Compliance', 'Safety'],
            avatar: null
        },
        {
            id: 'inst-5',
            nameEn: 'Worapong Sitthi',
            nameTh: 'วรพงศ์ สิทธิ์',
            title: 'Retail Operations Expert',
            expertise: ['Retail', 'Customer Service'],
            avatar: null
        }
    ],

    // Course Catalog
    courses: [
        {
            id: 'CRS-001',
            code: 'ONB-101',
            nameEn: 'New Employee Orientation',
            nameTh: 'ปฐมนิเทศพนักงานใหม่',
            descriptionEn: 'Comprehensive orientation program for new employees covering company culture, policies, and benefits.',
            descriptionTh: 'โปรแกรมปฐมนิเทศสำหรับพนักงานใหม่ครอบคลุมวัฒนธรรมองค์กร นโยบาย และสวัสดิการ',
            categoryId: 'cat-1',
            deliveryMethod: 'blended',
            duration: 8, // hours
            credits: 1,
            level: 'beginner',
            mandatory: true,
            prerequisites: [],
            instructorIds: ['inst-1', 'inst-2'],
            maxParticipants: 30,
            materials: [
                { name: 'Employee Handbook', type: 'pdf', size: '2.5 MB' },
                { name: 'Benefits Guide', type: 'pdf', size: '1.8 MB' },
                { name: 'IT Security Guidelines', type: 'pdf', size: '890 KB' }
            ],
            objectives: [
                { en: 'Understand company vision, mission, and values', th: 'เข้าใจวิสัยทัศน์ พันธกิจ และค่านิยมของบริษัท' },
                { en: 'Learn about employee benefits and policies', th: 'เรียนรู้สวัสดิการและนโยบายพนักงาน' },
                { en: 'Navigate internal systems and tools', th: 'ใช้งานระบบและเครื่องมือภายใน' }
            ],
            targetAudience: ['All new employees'],
            status: 'active',
            rating: 4.5,
            reviewCount: 128
        },
        {
            id: 'CRS-002',
            code: 'LDR-201',
            nameEn: 'Leadership Essentials',
            nameTh: 'พื้นฐานภาวะผู้นำ',
            descriptionEn: 'Foundation course for emerging leaders covering core leadership competencies and team management.',
            descriptionTh: 'หลักสูตรพื้นฐานสำหรับผู้นำรุ่นใหม่ครอบคลุมสมรรถนะภาวะผู้นำและการบริหารทีม',
            categoryId: 'cat-2',
            deliveryMethod: 'classroom',
            duration: 16,
            credits: 2,
            level: 'intermediate',
            mandatory: false,
            prerequisites: ['CRS-001'],
            instructorIds: ['inst-1'],
            maxParticipants: 25,
            materials: [
                { name: 'Leadership Workbook', type: 'pdf', size: '3.2 MB' },
                { name: 'Case Studies', type: 'pdf', size: '1.5 MB' }
            ],
            objectives: [
                { en: 'Develop effective communication skills', th: 'พัฒนาทักษะการสื่อสารที่มีประสิทธิภาพ' },
                { en: 'Learn to motivate and engage teams', th: 'เรียนรู้การสร้างแรงจูงใจและการมีส่วนร่วมของทีม' },
                { en: 'Master delegation and accountability', th: 'เชี่ยวชาญการมอบหมายงานและความรับผิดชอบ' }
            ],
            targetAudience: ['Supervisors', 'Team Leads', 'Aspiring Managers'],
            status: 'active',
            rating: 4.7,
            reviewCount: 89
        },
        {
            id: 'CRS-003',
            code: 'LDR-301',
            nameEn: 'Advanced People Management',
            nameTh: 'การบริหารคนขั้นสูง',
            descriptionEn: 'Advanced course on people management strategies including performance management, coaching, and talent development.',
            descriptionTh: 'หลักสูตรขั้นสูงเกี่ยวกับกลยุทธ์การบริหารคน รวมถึงการบริหารผลงาน การโค้ช และการพัฒนาความสามารถ',
            categoryId: 'cat-2',
            deliveryMethod: 'workshop',
            duration: 24,
            credits: 3,
            level: 'advanced',
            mandatory: false,
            prerequisites: ['CRS-002'],
            instructorIds: ['inst-1', 'inst-2'],
            maxParticipants: 20,
            materials: [
                { name: 'People Management Guide', type: 'pdf', size: '4.1 MB' },
                { name: 'Coaching Templates', type: 'xlsx', size: '256 KB' }
            ],
            objectives: [
                { en: 'Master performance coaching techniques', th: 'เชี่ยวชาญเทคนิคการโค้ชผลงาน' },
                { en: 'Handle difficult conversations effectively', th: 'จัดการบทสนทนาที่ยากลำบากอย่างมีประสิทธิภาพ' },
                { en: 'Build high-performing teams', th: 'สร้างทีมที่มีผลงานสูง' }
            ],
            targetAudience: ['Managers', 'Senior Supervisors'],
            status: 'active',
            rating: 4.8,
            reviewCount: 45
        },
        {
            id: 'CRS-004',
            code: 'CMP-101',
            nameEn: 'Workplace Safety Fundamentals',
            nameTh: 'พื้นฐานความปลอดภัยในสถานที่ทำงาน',
            descriptionEn: 'Essential safety training covering hazard identification, emergency procedures, and workplace safety regulations.',
            descriptionTh: 'การอบรมความปลอดภัยที่จำเป็นครอบคลุมการระบุอันตราย ขั้นตอนฉุกเฉิน และกฎระเบียบความปลอดภัย',
            categoryId: 'cat-5',
            deliveryMethod: 'online',
            duration: 4,
            credits: 1,
            level: 'beginner',
            mandatory: true,
            prerequisites: [],
            instructorIds: ['inst-4'],
            maxParticipants: 100,
            materials: [
                { name: 'Safety Handbook', type: 'pdf', size: '2.1 MB' },
                { name: 'Emergency Contact Card', type: 'pdf', size: '120 KB' }
            ],
            objectives: [
                { en: 'Identify workplace hazards', th: 'ระบุอันตรายในสถานที่ทำงาน' },
                { en: 'Respond to emergencies properly', th: 'ตอบสนองต่อเหตุฉุกเฉินอย่างถูกต้อง' },
                { en: 'Comply with safety regulations', th: 'ปฏิบัติตามกฎระเบียบความปลอดภัย' }
            ],
            targetAudience: ['All employees'],
            status: 'active',
            rating: 4.3,
            reviewCount: 256
        },
        {
            id: 'CRS-005',
            code: 'DIG-101',
            nameEn: 'Digital Literacy for Retail',
            nameTh: 'ความรู้ดิจิทัลสำหรับค้าปลีก',
            descriptionEn: 'Introduction to digital tools and technologies used in modern retail operations.',
            descriptionTh: 'บทนำเครื่องมือและเทคโนโลยีดิจิทัลที่ใช้ในการดำเนินงานค้าปลีกสมัยใหม่',
            categoryId: 'cat-6',
            deliveryMethod: 'online',
            duration: 6,
            credits: 1,
            level: 'beginner',
            mandatory: false,
            prerequisites: [],
            instructorIds: ['inst-3'],
            maxParticipants: 50,
            materials: [
                { name: 'Digital Tools Guide', type: 'pdf', size: '3.5 MB' }
            ],
            objectives: [
                { en: 'Use POS systems effectively', th: 'ใช้ระบบ POS อย่างมีประสิทธิภาพ' },
                { en: 'Navigate inventory management tools', th: 'ใช้งานเครื่องมือจัดการสินค้าคงคลัง' },
                { en: 'Understand omnichannel operations', th: 'เข้าใจการดำเนินงาน Omnichannel' }
            ],
            targetAudience: ['Store staff', 'Retail associates'],
            status: 'active',
            rating: 4.4,
            reviewCount: 112
        },
        {
            id: 'CRS-006',
            code: 'SVC-201',
            nameEn: 'Excellence in Customer Service',
            nameTh: 'ความเป็นเลิศด้านการบริการลูกค้า',
            descriptionEn: 'Comprehensive training on delivering exceptional customer experiences aligned with Central Group service standards.',
            descriptionTh: 'การอบรมครอบคลุมการส่งมอบประสบการณ์ลูกค้าที่เป็นเลิศตามมาตรฐานบริการของกลุ่มเซ็นทรัล',
            categoryId: 'cat-8',
            deliveryMethod: 'classroom',
            duration: 8,
            credits: 1,
            level: 'intermediate',
            mandatory: false,
            prerequisites: ['CRS-001'],
            instructorIds: ['inst-2', 'inst-5'],
            maxParticipants: 30,
            materials: [
                { name: 'Service Excellence Guide', type: 'pdf', size: '2.8 MB' },
                { name: 'Customer Scenario Cards', type: 'pdf', size: '890 KB' }
            ],
            objectives: [
                { en: 'Deliver personalized customer experiences', th: 'ส่งมอบประสบการณ์ลูกค้าที่เป็นส่วนตัว' },
                { en: 'Handle complaints professionally', th: 'จัดการข้อร้องเรียนอย่างมืออาชีพ' },
                { en: 'Build customer loyalty', th: 'สร้างความภักดีของลูกค้า' }
            ],
            targetAudience: ['Customer-facing staff', 'Service teams'],
            status: 'active',
            rating: 4.6,
            reviewCount: 78
        },
        {
            id: 'CRS-007',
            code: 'SOF-101',
            nameEn: 'Effective Communication Skills',
            nameTh: 'ทักษะการสื่อสารที่มีประสิทธิภาพ',
            descriptionEn: 'Master verbal and written communication skills for professional success.',
            descriptionTh: 'เชี่ยวชาญทักษะการสื่อสารด้วยวาจาและลายลักษณ์อักษรเพื่อความสำเร็จในอาชีพ',
            categoryId: 'cat-4',
            deliveryMethod: 'blended',
            duration: 12,
            credits: 2,
            level: 'beginner',
            mandatory: false,
            prerequisites: [],
            instructorIds: ['inst-2'],
            maxParticipants: 25,
            materials: [
                { name: 'Communication Workbook', type: 'pdf', size: '1.9 MB' }
            ],
            objectives: [
                { en: 'Present ideas clearly and confidently', th: 'นำเสนอความคิดอย่างชัดเจนและมั่นใจ' },
                { en: 'Write effective business emails', th: 'เขียนอีเมลธุรกิจที่มีประสิทธิภาพ' },
                { en: 'Practice active listening', th: 'ฝึกการฟังอย่างตั้งใจ' }
            ],
            targetAudience: ['All employees'],
            status: 'active',
            rating: 4.5,
            reviewCount: 95
        },
        {
            id: 'CRS-008',
            code: 'RET-301',
            nameEn: 'Store Management Excellence',
            nameTh: 'ความเป็นเลิศในการบริหารร้าน',
            descriptionEn: 'Advanced training for store managers covering operations, team leadership, and financial management.',
            descriptionTh: 'การอบรมขั้นสูงสำหรับผู้จัดการร้านครอบคลุมการดำเนินงาน การนำทีม และการบริหารการเงิน',
            categoryId: 'cat-7',
            deliveryMethod: 'workshop',
            duration: 32,
            credits: 4,
            level: 'advanced',
            mandatory: false,
            prerequisites: ['CRS-002', 'CRS-006'],
            instructorIds: ['inst-1', 'inst-5'],
            maxParticipants: 15,
            materials: [
                { name: 'Store Operations Manual', type: 'pdf', size: '5.2 MB' },
                { name: 'Financial Dashboard Guide', type: 'pdf', size: '1.2 MB' }
            ],
            objectives: [
                { en: 'Optimize store operations', th: 'เพิ่มประสิทธิภาพการดำเนินงานร้าน' },
                { en: 'Manage P&L effectively', th: 'บริหารกำไรขาดทุนอย่างมีประสิทธิภาพ' },
                { en: 'Lead and develop store teams', th: 'นำและพัฒนาทีมร้าน' }
            ],
            targetAudience: ['Store Managers', 'Assistant Store Managers'],
            status: 'active',
            rating: 4.9,
            reviewCount: 34
        },
        {
            id: 'CRS-009',
            code: 'CMP-201',
            nameEn: 'Data Privacy and PDPA Compliance',
            nameTh: 'ความเป็นส่วนตัวของข้อมูลและการปฏิบัติตาม PDPA',
            descriptionEn: 'Understanding Thailand Personal Data Protection Act and implementing data privacy practices.',
            descriptionTh: 'ทำความเข้าใจพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคลและการปฏิบัติตามความเป็นส่วนตัวของข้อมูล',
            categoryId: 'cat-5',
            deliveryMethod: 'online',
            duration: 3,
            credits: 1,
            level: 'beginner',
            mandatory: true,
            prerequisites: [],
            instructorIds: ['inst-4'],
            maxParticipants: 200,
            materials: [
                { name: 'PDPA Quick Reference', type: 'pdf', size: '780 KB' },
                { name: 'Data Handling Checklist', type: 'pdf', size: '320 KB' }
            ],
            objectives: [
                { en: 'Understand PDPA requirements', th: 'เข้าใจข้อกำหนด PDPA' },
                { en: 'Handle personal data correctly', th: 'จัดการข้อมูลส่วนบุคคลอย่างถูกต้อง' },
                { en: 'Respond to data requests', th: 'ตอบสนองต่อคำขอข้อมูล' }
            ],
            targetAudience: ['All employees'],
            status: 'active',
            rating: 4.2,
            reviewCount: 312
        },
        {
            id: 'CRS-010',
            code: 'DIG-201',
            nameEn: 'Data Analytics for Business',
            nameTh: 'การวิเคราะห์ข้อมูลสำหรับธุรกิจ',
            descriptionEn: 'Introduction to data analytics concepts and tools for making data-driven business decisions.',
            descriptionTh: 'บทนำแนวคิดและเครื่องมือการวิเคราะห์ข้อมูลสำหรับการตัดสินใจทางธุรกิจบนพื้นฐานข้อมูล',
            categoryId: 'cat-6',
            deliveryMethod: 'blended',
            duration: 16,
            credits: 2,
            level: 'intermediate',
            mandatory: false,
            prerequisites: ['CRS-005'],
            instructorIds: ['inst-3'],
            maxParticipants: 25,
            materials: [
                { name: 'Analytics Workbook', type: 'pdf', size: '4.5 MB' },
                { name: 'Sample Datasets', type: 'xlsx', size: '2.1 MB' }
            ],
            objectives: [
                { en: 'Interpret business data', th: 'ตีความข้อมูลธุรกิจ' },
                { en: 'Create meaningful reports', th: 'สร้างรายงานที่มีความหมาย' },
                { en: 'Make data-driven decisions', th: 'ตัดสินใจบนพื้นฐานข้อมูล' }
            ],
            targetAudience: ['Analysts', 'Managers', 'Business Leads'],
            status: 'active',
            rating: 4.6,
            reviewCount: 56
        }
    ],

    // Class Schedules
    classSchedules: [
        {
            id: 'SCH-001',
            courseId: 'CRS-001',
            startDate: '2026-01-20',
            endDate: '2026-01-20',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-1',
            instructorIds: ['inst-1', 'inst-2'],
            currentParticipants: 18,
            maxParticipants: 30,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-01-15'
        },
        {
            id: 'SCH-002',
            courseId: 'CRS-001',
            startDate: '2026-02-10',
            endDate: '2026-02-10',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-2',
            instructorIds: ['inst-1'],
            currentParticipants: 25,
            maxParticipants: 30,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-02-05'
        },
        {
            id: 'SCH-003',
            courseId: 'CRS-002',
            startDate: '2026-01-27',
            endDate: '2026-01-28',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-1',
            instructorIds: ['inst-1'],
            currentParticipants: 20,
            maxParticipants: 25,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-01-22'
        },
        {
            id: 'SCH-004',
            courseId: 'CRS-004',
            startDate: '2026-01-15',
            endDate: '2026-01-15',
            startTime: '00:00',
            endTime: '23:59',
            locationId: 'loc-5',
            instructorIds: ['inst-4'],
            currentParticipants: 45,
            maxParticipants: 100,
            status: 'open',
            language: 'en',
            registrationDeadline: '2026-01-14'
        },
        {
            id: 'SCH-005',
            courseId: 'CRS-006',
            startDate: '2026-02-03',
            endDate: '2026-02-03',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-1',
            instructorIds: ['inst-2', 'inst-5'],
            currentParticipants: 28,
            maxParticipants: 30,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-01-29'
        },
        {
            id: 'SCH-006',
            courseId: 'CRS-009',
            startDate: '2026-01-13',
            endDate: '2026-01-13',
            startTime: '00:00',
            endTime: '23:59',
            locationId: 'loc-5',
            instructorIds: ['inst-4'],
            currentParticipants: 89,
            maxParticipants: 200,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-01-12'
        },
        {
            id: 'SCH-007',
            courseId: 'CRS-003',
            startDate: '2026-02-17',
            endDate: '2026-02-19',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-1',
            instructorIds: ['inst-1', 'inst-2'],
            currentParticipants: 12,
            maxParticipants: 20,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-02-10'
        },
        {
            id: 'SCH-008',
            courseId: 'CRS-008',
            startDate: '2026-03-03',
            endDate: '2026-03-06',
            startTime: '09:00',
            endTime: '17:00',
            locationId: 'loc-2',
            instructorIds: ['inst-1', 'inst-5'],
            currentParticipants: 8,
            maxParticipants: 15,
            status: 'open',
            language: 'th',
            registrationDeadline: '2026-02-24'
        }
    ],

    // Training Roadmaps by Job Family/Level
    roadmaps: [
        {
            id: 'RM-001',
            nameEn: 'Retail Associate Development Path',
            nameTh: 'เส้นทางพัฒนาพนักงานค้าปลีก',
            jobFamily: 'Retail',
            level: 'Staff',
            courses: [
                { courseId: 'CRS-001', mandatory: true, sequence: 1, timeframe: 'First 30 days' },
                { courseId: 'CRS-004', mandatory: true, sequence: 2, timeframe: 'First 30 days' },
                { courseId: 'CRS-009', mandatory: true, sequence: 3, timeframe: 'First 30 days' },
                { courseId: 'CRS-005', mandatory: true, sequence: 4, timeframe: 'First 90 days' },
                { courseId: 'CRS-006', mandatory: true, sequence: 5, timeframe: 'First 90 days' },
                { courseId: 'CRS-007', mandatory: false, sequence: 6, timeframe: 'First year' }
            ]
        },
        {
            id: 'RM-002',
            nameEn: 'Supervisor Development Path',
            nameTh: 'เส้นทางพัฒนาหัวหน้างาน',
            jobFamily: 'All',
            level: 'Supervisor',
            courses: [
                { courseId: 'CRS-002', mandatory: true, sequence: 1, timeframe: 'First 90 days as supervisor' },
                { courseId: 'CRS-007', mandatory: true, sequence: 2, timeframe: 'First 6 months' },
                { courseId: 'CRS-006', mandatory: false, sequence: 3, timeframe: 'First year' }
            ]
        },
        {
            id: 'RM-003',
            nameEn: 'Store Manager Development Path',
            nameTh: 'เส้นทางพัฒนาผู้จัดการร้าน',
            jobFamily: 'Retail',
            level: 'Manager',
            courses: [
                { courseId: 'CRS-002', mandatory: true, sequence: 1, timeframe: 'Pre-requisite' },
                { courseId: 'CRS-003', mandatory: true, sequence: 2, timeframe: 'First 6 months' },
                { courseId: 'CRS-008', mandatory: true, sequence: 3, timeframe: 'First year' },
                { courseId: 'CRS-010', mandatory: false, sequence: 4, timeframe: 'Second year' }
            ]
        }
    ],

    // Employee Enrollments (current user)
    myEnrollments: [
        {
            id: 'ENR-001',
            courseId: 'CRS-001',
            scheduleId: 'SCH-001',
            employeeId: 'EMP-001',
            status: 'completed',
            enrollmentDate: '2024-01-05',
            completionDate: '2024-01-15',
            score: 92,
            certificate: 'CERT-ONB-001-2024',
            certificateUrl: '/certificates/cert-onb-001.pdf',
            attendanceRate: 100,
            feedback: null
        },
        {
            id: 'ENR-002',
            courseId: 'CRS-004',
            scheduleId: null,
            employeeId: 'EMP-001',
            status: 'completed',
            enrollmentDate: '2024-01-10',
            completionDate: '2024-01-12',
            score: 88,
            certificate: 'CERT-CMP-001-2024',
            certificateUrl: '/certificates/cert-cmp-001.pdf',
            attendanceRate: 100,
            feedback: null
        },
        {
            id: 'ENR-003',
            courseId: 'CRS-009',
            scheduleId: null,
            employeeId: 'EMP-001',
            status: 'completed',
            enrollmentDate: '2024-01-20',
            completionDate: '2024-01-20',
            score: 95,
            certificate: 'CERT-PDPA-001-2024',
            certificateUrl: '/certificates/cert-pdpa-001.pdf',
            attendanceRate: 100,
            feedback: null
        },
        {
            id: 'ENR-004',
            courseId: 'CRS-002',
            scheduleId: 'SCH-003',
            employeeId: 'EMP-001',
            status: 'enrolled',
            enrollmentDate: '2026-01-08',
            completionDate: null,
            score: null,
            certificate: null,
            certificateUrl: null,
            attendanceRate: null,
            feedback: null
        },
        {
            id: 'ENR-005',
            courseId: 'CRS-007',
            scheduleId: null,
            employeeId: 'EMP-001',
            status: 'in_progress',
            enrollmentDate: '2026-01-02',
            completionDate: null,
            score: null,
            certificate: null,
            certificateUrl: null,
            attendanceRate: null,
            progress: 45,
            feedback: null
        }
    ],

    // Waitlist entries
    waitlist: [
        {
            id: 'WL-001',
            courseId: 'CRS-006',
            scheduleId: 'SCH-005',
            employeeId: 'EMP-001',
            requestDate: '2026-01-07',
            position: 3,
            status: 'waiting',
            notificationSent: false
        }
    ],

    // Enrollment Status options
    enrollmentStatuses: [
        { value: 'pending_approval', labelEn: 'Pending Approval', labelTh: 'รออนุมัติ', color: 'yellow', icon: 'hourglass_empty' },
        { value: 'approved', labelEn: 'Approved', labelTh: 'อนุมัติแล้ว', color: 'blue', icon: 'check' },
        { value: 'enrolled', labelEn: 'Enrolled', labelTh: 'ลงทะเบียนแล้ว', color: 'blue', icon: 'how_to_reg' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'orange', icon: 'play_circle' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'green', icon: 'task_alt' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก', color: 'gray', icon: 'cancel' },
        { value: 'no_show', labelEn: 'No Show', labelTh: 'ไม่มาเรียน', color: 'red', icon: 'event_busy' },
        { value: 'waitlisted', labelEn: 'Waitlisted', labelTh: 'รอคิว', color: 'purple', icon: 'schedule' }
    ],

    // Course Levels
    courseLevels: [
        { value: 'beginner', labelEn: 'Beginner', labelTh: 'เริ่มต้น', color: 'green' },
        { value: 'intermediate', labelEn: 'Intermediate', labelTh: 'ปานกลาง', color: 'blue' },
        { value: 'advanced', labelEn: 'Advanced', labelTh: 'ขั้นสูง', color: 'purple' }
    ],

    // Training Rooms
    trainingRooms: [
        { id: 'room-1', locationId: 'loc-1', name: 'Training Room A', capacity: 30, equipment: ['Projector', 'Whiteboard', 'Video Conference'] },
        { id: 'room-2', locationId: 'loc-1', name: 'Training Room B', capacity: 20, equipment: ['Projector', 'Whiteboard'] },
        { id: 'room-3', locationId: 'loc-1', name: 'Computer Lab', capacity: 25, equipment: ['Computers', 'Projector'] },
        { id: 'room-4', locationId: 'loc-2', name: 'Conference Hall', capacity: 50, equipment: ['Projector', 'Sound System', 'Stage'] },
        { id: 'room-5', locationId: 'loc-2', name: 'Meeting Room 1', capacity: 15, equipment: ['TV Screen', 'Whiteboard'] }
    ],

    // Room Bookings
    roomBookings: [
        {
            id: 'BK-001',
            roomId: 'room-1',
            scheduleId: 'SCH-001',
            date: '2026-01-20',
            startTime: '09:00',
            endTime: '17:00',
            bookedBy: 'inst-1',
            status: 'confirmed'
        },
        {
            id: 'BK-002',
            roomId: 'room-1',
            scheduleId: 'SCH-003',
            date: '2026-01-27',
            startTime: '09:00',
            endTime: '17:00',
            bookedBy: 'inst-1',
            status: 'confirmed'
        }
    ],

    // Helper functions
    getCourseById(courseId) {
        return this.courses.find(c => c.id === courseId);
    },

    getCategoryById(categoryId) {
        return this.categories.find(c => c.id === categoryId);
    },

    getInstructorById(instructorId) {
        return this.instructors.find(i => i.id === instructorId);
    },

    getLocationById(locationId) {
        return this.locations.find(l => l.id === locationId);
    },

    getSchedulesByCourse(courseId) {
        return this.classSchedules.filter(s => s.courseId === courseId && s.status === 'open');
    },

    getUpcomingSchedules() {
        const today = new Date().toISOString().split('T')[0];
        return this.classSchedules.filter(s => s.startDate >= today && s.status === 'open')
            .sort((a, b) => a.startDate.localeCompare(b.startDate));
    },

    getMyRoadmap(jobFamily, level) {
        return this.roadmaps.find(r =>
            (r.jobFamily === jobFamily || r.jobFamily === 'All') &&
            r.level === level
        );
    },

    getEnrollmentStatus(courseId) {
        return this.myEnrollments.find(e => e.courseId === courseId);
    },

    getMandatoryCourses() {
        return this.courses.filter(c => c.mandatory);
    },

    getCoursesByCategory(categoryId) {
        return this.courses.filter(c => c.categoryId === categoryId);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockTrainingData;
}

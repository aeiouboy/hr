/**
 * Mock IDP (Individual Development Plan) Data
 * Development plans, competencies, and action items
 */

const MockIDPData = {
    // Competency framework for gap analysis
    competencies: [
        {
            id: 'comp-001',
            code: 'LEAD-01',
            nameEn: 'Leadership & Influence',
            nameTh: 'ภาวะผู้นำและอิทธิพล',
            descriptionEn: 'Ability to inspire, guide, and influence others towards achieving goals',
            descriptionTh: 'ความสามารถในการสร้างแรงบันดาลใจ ชี้แนะ และมีอิทธิพลต่อผู้อื่นเพื่อบรรลุเป้าหมาย',
            category: 'leadership',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Understands leadership concepts', descTh: 'เข้าใจแนวคิดภาวะผู้นำ' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Demonstrates leadership in team settings', descTh: 'แสดงภาวะผู้นำในทีม' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Leads cross-functional initiatives', descTh: 'นำโครงการข้ามสายงาน' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Transforms organizational culture', descTh: 'เปลี่ยนแปลงวัฒนธรรมองค์กร' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Industry thought leader', descTh: 'ผู้นำทางความคิดระดับอุตสาหกรรม' }
            ]
        },
        {
            id: 'comp-002',
            code: 'COMM-01',
            nameEn: 'Communication Skills',
            nameTh: 'ทักษะการสื่อสาร',
            descriptionEn: 'Ability to convey information clearly and effectively',
            descriptionTh: 'ความสามารถในการถ่ายทอดข้อมูลอย่างชัดเจนและมีประสิทธิภาพ',
            category: 'soft_skills',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Can communicate simple ideas', descTh: 'สื่อสารแนวคิดง่ายๆ ได้' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Effective team communication', descTh: 'สื่อสารในทีมได้อย่างมีประสิทธิภาพ' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Presents to large audiences', descTh: 'นำเสนอต่อผู้ฟังจำนวนมากได้' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Executive-level communication', descTh: 'สื่อสารระดับผู้บริหาร' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Master communicator and coach', descTh: 'นักสื่อสารและโค้ชระดับมาสเตอร์' }
            ]
        },
        {
            id: 'comp-003',
            code: 'ANAL-01',
            nameEn: 'Data Analysis',
            nameTh: 'การวิเคราะห์ข้อมูล',
            descriptionEn: 'Ability to interpret data and derive actionable insights',
            descriptionTh: 'ความสามารถในการตีความข้อมูลและสรุปข้อมูลเชิงลึกที่นำไปปฏิบัติได้',
            category: 'technical',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Understands basic data concepts', descTh: 'เข้าใจแนวคิดข้อมูลพื้นฐาน' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Creates basic reports', descTh: 'สร้างรายงานพื้นฐานได้' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Advanced analytics and visualization', descTh: 'การวิเคราะห์และการแสดงผลขั้นสูง' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Predictive analytics', descTh: 'การวิเคราะห์เชิงพยากรณ์' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Data science leadership', descTh: 'ผู้นำด้านวิทยาศาสตร์ข้อมูล' }
            ]
        },
        {
            id: 'comp-004',
            code: 'PROJ-01',
            nameEn: 'Project Management',
            nameTh: 'การบริหารโครงการ',
            descriptionEn: 'Ability to plan, execute, and complete projects successfully',
            descriptionTh: 'ความสามารถในการวางแผน ดำเนินการ และทำโครงการให้สำเร็จ',
            category: 'management',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Task management', descTh: 'จัดการงานได้' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Manages small projects', descTh: 'จัดการโครงการขนาดเล็ก' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Manages complex projects', descTh: 'จัดการโครงการที่ซับซ้อน' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Program management', descTh: 'บริหารโปรแกรม' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Portfolio management', descTh: 'บริหารพอร์ตโฟลิโอ' }
            ]
        },
        {
            id: 'comp-005',
            code: 'CUST-01',
            nameEn: 'Customer Focus',
            nameTh: 'มุ่งเน้นลูกค้า',
            descriptionEn: 'Ability to understand and meet customer needs effectively',
            descriptionTh: 'ความสามารถในการเข้าใจและตอบสนองความต้องการของลูกค้าอย่างมีประสิทธิภาพ',
            category: 'business',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Responds to customer requests', descTh: 'ตอบสนองคำขอลูกค้า' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Anticipates customer needs', descTh: 'คาดการณ์ความต้องการลูกค้า' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Creates customer solutions', descTh: 'สร้างโซลูชันสำหรับลูกค้า' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Drives customer experience strategy', descTh: 'ขับเคลื่อนกลยุทธ์ประสบการณ์ลูกค้า' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Industry CX thought leader', descTh: 'ผู้นำทางความคิดด้าน CX ระดับอุตสาหกรรม' }
            ]
        },
        {
            id: 'comp-006',
            code: 'INNOV-01',
            nameEn: 'Innovation & Creativity',
            nameTh: 'นวัตกรรมและความคิดสร้างสรรค์',
            descriptionEn: 'Ability to generate new ideas and implement innovative solutions',
            descriptionTh: 'ความสามารถในการสร้างไอเดียใหม่และนำโซลูชันนวัตกรรมไปใช้',
            category: 'leadership',
            levels: [
                { level: 1, labelEn: 'Basic', labelTh: 'พื้นฐาน', descEn: 'Open to new ideas', descTh: 'เปิดรับไอเดียใหม่' },
                { level: 2, labelEn: 'Developing', labelTh: 'กำลังพัฒนา', descEn: 'Contributes ideas in brainstorming', descTh: 'มีส่วนร่วมในการระดมความคิด' },
                { level: 3, labelEn: 'Proficient', labelTh: 'เชี่ยวชาญ', descEn: 'Implements innovative solutions', descTh: 'นำโซลูชันนวัตกรรมไปใช้' },
                { level: 4, labelEn: 'Advanced', labelTh: 'ขั้นสูง', descEn: 'Leads innovation initiatives', descTh: 'นำโครงการนวัตกรรม' },
                { level: 5, labelEn: 'Expert', labelTh: 'ผู้เชี่ยวชาญ', descEn: 'Transforms business through innovation', descTh: 'เปลี่ยนแปลงธุรกิจผ่านนวัตกรรม' }
            ]
        }
    ],

    // Competency categories
    competencyCategories: [
        { value: 'leadership', labelEn: 'Leadership', labelTh: 'ภาวะผู้นำ' },
        { value: 'technical', labelEn: 'Technical Skills', labelTh: 'ทักษะเทคนิค' },
        { value: 'soft_skills', labelEn: 'Soft Skills', labelTh: 'ทักษะอ่อน' },
        { value: 'management', labelEn: 'Management', labelTh: 'การบริหาร' },
        { value: 'business', labelEn: 'Business Acumen', labelTh: 'ความเฉียบแหลมทางธุรกิจ' }
    ],

    // Employee competency assessments (gap analysis data)
    employeeCompetencies: {
        'EMP001': [
            { competencyId: 'comp-001', currentLevel: 2, requiredLevel: 4, assessmentDate: '2025-12-01', priority: 'high' },
            { competencyId: 'comp-002', currentLevel: 3, requiredLevel: 4, assessmentDate: '2025-12-01', priority: 'medium' },
            { competencyId: 'comp-003', currentLevel: 2, requiredLevel: 3, assessmentDate: '2025-12-01', priority: 'high' },
            { competencyId: 'comp-004', currentLevel: 3, requiredLevel: 4, assessmentDate: '2025-12-01', priority: 'medium' },
            { competencyId: 'comp-005', currentLevel: 4, requiredLevel: 4, assessmentDate: '2025-12-01', priority: 'low' },
            { competencyId: 'comp-006', currentLevel: 2, requiredLevel: 3, assessmentDate: '2025-12-01', priority: 'medium' }
        ]
    },

    // Development action types
    developmentActionTypes: [
        { value: 'training', labelEn: 'Training Program', labelTh: 'โปรแกรมอบรม', icon: 'school' },
        { value: 'on_the_job', labelEn: 'On-the-Job Learning', labelTh: 'การเรียนรู้จากงาน', icon: 'work' },
        { value: 'mentoring', labelEn: 'Mentoring/Coaching', labelTh: 'การเป็นพี่เลี้ยง/โค้ชชิ่ง', icon: 'people' },
        { value: 'job_rotation', labelEn: 'Job Rotation', labelTh: 'หมุนเวียนงาน', icon: 'swap_horiz' },
        { value: 'self_study', labelEn: 'Self-Study', labelTh: 'ศึกษาด้วยตนเอง', icon: 'auto_stories' },
        { value: 'project', labelEn: 'Project Assignment', labelTh: 'การมอบหมายโครงการ', icon: 'assignment' },
        { value: 'certification', labelEn: 'Certification', labelTh: 'การรับรอง', icon: 'verified' },
        { value: 'conference', labelEn: 'Conference/Seminar', labelTh: 'ประชุม/สัมมนา', icon: 'groups' }
    ],

    // IDP status options
    idpStatuses: [
        { value: 'draft', labelEn: 'Draft', labelTh: 'ร่าง', color: 'bg-gray-100 text-gray-800' },
        { value: 'pending_approval', labelEn: 'Pending Approval', labelTh: 'รอการอนุมัติ', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'approved', labelEn: 'Approved', labelTh: 'อนุมัติแล้ว', color: 'bg-green-100 text-green-800' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'bg-blue-100 text-blue-800' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'bg-purple-100 text-purple-800' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก', color: 'bg-red-100 text-red-800' }
    ],

    // Action item status options
    actionStatuses: [
        { value: 'not_started', labelEn: 'Not Started', labelTh: 'ยังไม่เริ่ม', color: 'bg-gray-100 text-gray-800' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'bg-blue-100 text-blue-800' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'bg-green-100 text-green-800' },
        { value: 'on_hold', labelEn: 'On Hold', labelTh: 'ระงับชั่วคราว', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก', color: 'bg-red-100 text-red-800' }
    ],

    // Priority options
    priorities: [
        { value: 'high', labelEn: 'High', labelTh: 'สูง', color: 'bg-red-100 text-red-800' },
        { value: 'medium', labelEn: 'Medium', labelTh: 'ปานกลาง', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'low', labelEn: 'Low', labelTh: 'ต่ำ', color: 'bg-green-100 text-green-800' }
    ],

    // Sample IDPs for employee
    idps: {
        'EMP001': [
            {
                id: 'idp-001',
                employeeId: 'EMP001',
                title: 'Leadership Development Program 2026',
                titleTh: 'โปรแกรมพัฒนาภาวะผู้นำ 2026',
                year: 2026,
                status: 'in_progress',
                createdDate: '2025-11-15',
                approvedDate: '2025-11-20',
                approvedBy: 'MGR001',
                approverName: 'Somchai Prasert',
                managerSignOff: true,
                managerSignOffDate: '2025-11-20',
                employeeSignOff: true,
                employeeSignOffDate: '2025-11-18',
                overallProgress: 45,
                developmentAreas: [
                    {
                        id: 'da-001',
                        competencyId: 'comp-001',
                        currentLevel: 2,
                        targetLevel: 4,
                        gap: 2,
                        priority: 'high',
                        actions: [
                            {
                                id: 'act-001',
                                type: 'training',
                                title: 'Leadership Excellence Program',
                                titleTh: 'โปรแกรมความเป็นเลิศด้านภาวะผู้นำ',
                                description: 'Complete the Central Group Leadership Excellence Program (3 modules)',
                                descriptionTh: 'เรียนจบโปรแกรมความเป็นเลิศด้านภาวะผู้นำของ Central Group (3 โมดูล)',
                                startDate: '2026-01-15',
                                endDate: '2026-04-30',
                                status: 'in_progress',
                                progress: 67,
                                resources: 'LMS Course ID: LEAD-2026-001',
                                lmsLink: 'https://lms.centralgroup.com/course/LEAD-2026-001',
                                milestones: [
                                    { id: 'm1', title: 'Module 1 - Self Leadership', completed: true, completedDate: '2026-02-15' },
                                    { id: 'm2', title: 'Module 2 - Team Leadership', completed: true, completedDate: '2026-03-20' },
                                    { id: 'm3', title: 'Module 3 - Organizational Leadership', completed: false, targetDate: '2026-04-30' }
                                ],
                                managerSupport: 'Weekly coaching sessions with manager'
                            },
                            {
                                id: 'act-002',
                                type: 'mentoring',
                                title: 'Executive Mentoring Program',
                                titleTh: 'โปรแกรมพี่เลี้ยงระดับผู้บริหาร',
                                description: 'Monthly mentoring sessions with Director',
                                descriptionTh: 'เข้าร่วมการประชุมพี่เลี้ยงรายเดือนกับผู้อำนวยการ',
                                startDate: '2026-01-01',
                                endDate: '2026-06-30',
                                status: 'in_progress',
                                progress: 50,
                                resources: 'Mentor: Khun Pravit Charoenpanich (Director)',
                                milestones: [
                                    { id: 'm1', title: 'Q1 Mentoring Sessions (3)', completed: true, completedDate: '2026-03-30' },
                                    { id: 'm2', title: 'Q2 Mentoring Sessions (3)', completed: false, targetDate: '2026-06-30' }
                                ],
                                managerSupport: 'Facilitate meeting schedule coordination'
                            }
                        ]
                    },
                    {
                        id: 'da-002',
                        competencyId: 'comp-003',
                        currentLevel: 2,
                        targetLevel: 3,
                        gap: 1,
                        priority: 'high',
                        actions: [
                            {
                                id: 'act-003',
                                type: 'training',
                                title: 'Advanced Excel & Power BI',
                                titleTh: 'Excel ขั้นสูงและ Power BI',
                                description: 'Complete data analytics certification',
                                descriptionTh: 'เรียนจบการรับรองการวิเคราะห์ข้อมูล',
                                startDate: '2026-02-01',
                                endDate: '2026-05-31',
                                status: 'not_started',
                                progress: 0,
                                resources: 'LinkedIn Learning + Internal Training',
                                lmsLink: 'https://lms.centralgroup.com/course/DATA-2026-001',
                                milestones: [
                                    { id: 'm1', title: 'Excel Advanced Functions', completed: false, targetDate: '2026-03-15' },
                                    { id: 'm2', title: 'Power BI Fundamentals', completed: false, targetDate: '2026-04-30' },
                                    { id: 'm3', title: 'Data Visualization Project', completed: false, targetDate: '2026-05-31' }
                                ],
                                managerSupport: 'Provide real business data for practice'
                            },
                            {
                                id: 'act-004',
                                type: 'project',
                                title: 'Sales Analytics Dashboard Project',
                                titleTh: 'โครงการ Dashboard วิเคราะห์ยอดขาย',
                                description: 'Lead the development of regional sales dashboard',
                                descriptionTh: 'นำการพัฒนา Dashboard ยอดขายระดับภูมิภาค',
                                startDate: '2026-04-01',
                                endDate: '2026-07-31',
                                status: 'not_started',
                                progress: 0,
                                resources: 'Project Team: 3 members, Budget: 50,000 THB',
                                milestones: [
                                    { id: 'm1', title: 'Requirements Gathering', completed: false, targetDate: '2026-04-15' },
                                    { id: 'm2', title: 'Dashboard Design', completed: false, targetDate: '2026-05-31' },
                                    { id: 'm3', title: 'Development & Testing', completed: false, targetDate: '2026-07-15' },
                                    { id: 'm4', title: 'Go-Live', completed: false, targetDate: '2026-07-31' }
                                ],
                                managerSupport: 'Sponsor the project and provide stakeholder access'
                            }
                        ]
                    }
                ]
            },
            {
                id: 'idp-002',
                employeeId: 'EMP001',
                title: 'Technical Skills Enhancement 2025',
                titleTh: 'การพัฒนาทักษะเทคนิค 2025',
                year: 2025,
                status: 'completed',
                createdDate: '2024-12-01',
                approvedDate: '2024-12-10',
                approvedBy: 'MGR001',
                approverName: 'Somchai Prasert',
                managerSignOff: true,
                managerSignOffDate: '2025-12-15',
                employeeSignOff: true,
                employeeSignOffDate: '2025-12-15',
                overallProgress: 100,
                developmentAreas: [
                    {
                        id: 'da-003',
                        competencyId: 'comp-004',
                        currentLevel: 2,
                        targetLevel: 3,
                        gap: 1,
                        priority: 'high',
                        actions: [
                            {
                                id: 'act-005',
                                type: 'certification',
                                title: 'PMP Certification',
                                titleTh: 'การรับรอง PMP',
                                description: 'Obtain Project Management Professional certification',
                                descriptionTh: 'ได้รับการรับรอง Project Management Professional',
                                startDate: '2025-01-01',
                                endDate: '2025-09-30',
                                status: 'completed',
                                progress: 100,
                                resources: 'PMI Prep Course + Exam Fee',
                                certificationDate: '2025-09-15',
                                certificationNumber: 'PMP-3245678',
                                milestones: [
                                    { id: 'm1', title: 'Complete Prep Course', completed: true, completedDate: '2025-06-30' },
                                    { id: 'm2', title: 'Pass PMP Exam', completed: true, completedDate: '2025-09-15' }
                                ],
                                managerSupport: 'Covered certification costs'
                            }
                        ]
                    }
                ]
            }
        ]
    },

    // Available training programs (for action item selection)
    trainingPrograms: [
        {
            id: 'tp-001',
            code: 'LEAD-2026-001',
            nameEn: 'Leadership Excellence Program',
            nameTh: 'โปรแกรมความเป็นเลิศด้านภาวะผู้นำ',
            provider: 'Central Group Academy',
            duration: '3 months',
            competencies: ['comp-001', 'comp-002'],
            lmsLink: 'https://lms.centralgroup.com/course/LEAD-2026-001'
        },
        {
            id: 'tp-002',
            code: 'DATA-2026-001',
            nameEn: 'Data Analytics Certification',
            nameTh: 'การรับรองการวิเคราะห์ข้อมูล',
            provider: 'Central Group Academy',
            duration: '4 months',
            competencies: ['comp-003'],
            lmsLink: 'https://lms.centralgroup.com/course/DATA-2026-001'
        },
        {
            id: 'tp-003',
            code: 'PM-2026-001',
            nameEn: 'Project Management Fundamentals',
            nameTh: 'พื้นฐานการบริหารโครงการ',
            provider: 'PMI Thailand',
            duration: '2 months',
            competencies: ['comp-004'],
            lmsLink: 'https://lms.centralgroup.com/course/PM-2026-001'
        },
        {
            id: 'tp-004',
            code: 'CX-2026-001',
            nameEn: 'Customer Experience Excellence',
            nameTh: 'ความเป็นเลิศด้านประสบการณ์ลูกค้า',
            provider: 'Central Group Academy',
            duration: '2 months',
            competencies: ['comp-005'],
            lmsLink: 'https://lms.centralgroup.com/course/CX-2026-001'
        }
    ],

    // Certifications earned
    certifications: {
        'EMP001': [
            {
                id: 'cert-001',
                name: 'Project Management Professional (PMP)',
                issuer: 'Project Management Institute',
                issueDate: '2025-09-15',
                expiryDate: '2028-09-15',
                credentialId: 'PMP-3245678',
                relatedCompetency: 'comp-004',
                relatedIdp: 'idp-002'
            }
        ]
    },

    // Helper functions
    getCompetencyById(id) {
        return this.competencies.find(c => c.id === id);
    },

    getIDPsByEmployeeId(employeeId) {
        return this.idps[employeeId] || [];
    },

    getEmployeeCompetencies(employeeId) {
        return this.employeeCompetencies[employeeId] || [];
    },

    getStatusConfig(status) {
        return this.idpStatuses.find(s => s.value === status) || this.idpStatuses[0];
    },

    getActionStatusConfig(status) {
        return this.actionStatuses.find(s => s.value === status) || this.actionStatuses[0];
    },

    getPriorityConfig(priority) {
        return this.priorities.find(p => p.value === priority) || this.priorities[1];
    },

    getActionTypeConfig(type) {
        return this.developmentActionTypes.find(t => t.value === type) || this.developmentActionTypes[0];
    },

    getCertifications(employeeId) {
        return this.certifications[employeeId] || [];
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockIDPData;
}

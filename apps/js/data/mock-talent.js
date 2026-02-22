/**
 * Mock Talent Data
 * Data for Talent Identification and Hi-Po employee tracking
 */

const MockTalentData = {
    // Talent Criteria Configuration
    talentCriteria: {
        id: 'TC-001',
        effectiveDate: '2025-01-01',
        performanceThresholds: {
            exceptional: { min: 4.5, max: 5.0, label: 'Exceptional', labelTh: 'ยอดเยี่ยม' },
            exceeds: { min: 3.5, max: 4.49, label: 'Exceeds Expectations', labelTh: 'เกินความคาดหวัง' },
            meets: { min: 2.5, max: 3.49, label: 'Meets Expectations', labelTh: 'ตามความคาดหวัง' },
            below: { min: 1.5, max: 2.49, label: 'Below Expectations', labelTh: 'ต่ำกว่าความคาดหวัง' },
            unsatisfactory: { min: 1.0, max: 1.49, label: 'Unsatisfactory', labelTh: 'ไม่เป็นที่พอใจ' }
        },
        potentialThresholds: {
            high: { min: 4.0, max: 5.0, label: 'High Potential', labelTh: 'ศักยภาพสูง' },
            medium: { min: 2.5, max: 3.99, label: 'Medium Potential', labelTh: 'ศักยภาพปานกลาง' },
            low: { min: 1.0, max: 2.49, label: 'Low Potential', labelTh: 'ศักยภาพต่ำ' }
        },
        minimumYearsInService: 1,
        hiPoRequirements: {
            minPerformance: 3.5,
            minPotential: 4.0,
            minYearsInService: 2,
            maxAge: 45
        },
        lastUpdatedBy: 'HR Admin',
        lastUpdatedAt: '2025-01-01T09:00:00Z'
    },

    // 9-Box Grid Definitions
    nineBoxGrid: {
        boxes: [
            // Low Potential Row (bottom)
            { id: 'low-low', position: { x: 0, y: 0 }, performance: 'low', potential: 'low',
              label: 'Questionable', labelTh: 'ควรทบทวน', color: '#EF4444',
              description: 'Low performance and low potential. Consider performance improvement plan or role reassignment.' },
            { id: 'meets-low', position: { x: 1, y: 0 }, performance: 'meets', potential: 'low',
              label: 'Effective', labelTh: 'มีประสิทธิภาพ', color: '#F59E0B',
              description: 'Meets expectations but limited growth potential. Optimize in current role.' },
            { id: 'high-low', position: { x: 2, y: 0 }, performance: 'high', potential: 'low',
              label: 'Trusted Professional', labelTh: 'ผู้เชี่ยวชาญที่เชื่อถือได้', color: '#10B981',
              description: 'High performer but limited potential. Maintain engagement and leverage expertise.' },

            // Medium Potential Row (middle)
            { id: 'low-medium', position: { x: 0, y: 1 }, performance: 'low', potential: 'medium',
              label: 'Inconsistent Player', labelTh: 'ผู้เล่นไม่สม่ำเสมอ', color: '#F59E0B',
              description: 'Has potential but not performing. Identify barriers and provide support.' },
            { id: 'meets-medium', position: { x: 1, y: 1 }, performance: 'meets', potential: 'medium',
              label: 'Core Employee', labelTh: 'พนักงานหลัก', color: '#22C55E',
              description: 'Solid performer with moderate potential. Provide development opportunities.' },
            { id: 'high-medium', position: { x: 2, y: 1 }, performance: 'high', potential: 'medium',
              label: 'High Professional', labelTh: 'มืออาชีพระดับสูง', color: '#3B82F6',
              description: 'High performer with moderate potential. Consider lateral moves or specialized roles.' },

            // High Potential Row (top)
            { id: 'low-high', position: { x: 0, y: 2 }, performance: 'low', potential: 'high',
              label: 'Rough Diamond', labelTh: 'เพชรในตม', color: '#F59E0B',
              description: 'High potential but underperforming. Investigate root causes, consider new challenges.' },
            { id: 'meets-high', position: { x: 1, y: 2 }, performance: 'meets', potential: 'high',
              label: 'Emerging Talent', labelTh: 'พรสวรรค์กำลังโต', color: '#8B5CF6',
              description: 'Good performer with high potential. Accelerate development, assign stretch goals.' },
            { id: 'high-high', position: { x: 2, y: 2 }, performance: 'high', potential: 'high',
              label: 'Star', labelTh: 'ดาวเด่น', color: '#D91E32',
              description: 'Top talent - highest performance and potential. Fast-track for leadership roles.' }
        ],
        axes: {
            x: { label: 'Performance', labelTh: 'ผลงาน', levels: ['Low', 'Meets', 'High'] },
            y: { label: 'Potential', labelTh: 'ศักยภาพ', levels: ['Low', 'Medium', 'High'] }
        }
    },

    // Sample Talent Profiles
    talentProfiles: [
        {
            employeeId: 'EMP001',
            employeeName: 'Somchai Kasikorn',
            employeeNameTh: 'สมชาย กสิกร',
            position: 'Senior Software Engineer',
            positionTh: 'วิศวกรซอฟต์แวร์อาวุโส',
            department: 'IT Development',
            departmentTh: 'พัฒนาระบบสารสนเทศ',
            company: 'Central Group',
            photoUrl: null,
            hireDate: '2020-03-15',
            yearsOfService: 4.8,
            age: 32,
            performanceRating: 4.5,
            potentialRating: 4.8,
            nineBoxPosition: 'high-high',
            isHiPo: true,
            riskOfLoss: 'medium',
            riskOfLossReason: 'Approached by competitor',
            promotionReadiness: 'ready_now',
            successorTo: ['Head of Engineering'],
            performanceHistory: [
                { year: 2024, rating: 4.5, period: 'Annual' },
                { year: 2023, rating: 4.2, period: 'Annual' },
                { year: 2022, rating: 3.8, period: 'Annual' }
            ],
            competencies: [
                { name: 'Technical Excellence', nameT: 'ความเป็นเลิศทางเทคนิค', rating: 5, maxRating: 5 },
                { name: 'Leadership', nameTh: 'ภาวะผู้นำ', rating: 4, maxRating: 5 },
                { name: 'Innovation', nameTh: 'นวัตกรรม', rating: 5, maxRating: 5 },
                { name: 'Communication', nameTh: 'การสื่อสาร', rating: 4, maxRating: 5 },
                { name: 'Problem Solving', nameTh: 'การแก้ปัญหา', rating: 5, maxRating: 5 }
            ],
            careerAspirations: {
                shortTerm: 'Lead a development team',
                shortTermTh: 'เป็นหัวหน้าทีมพัฒนา',
                longTerm: 'Chief Technology Officer',
                longTermTh: 'ผู้บริหารเทคโนโลยีสูงสุด',
                willingToRelocate: true,
                preferredLocations: ['Bangkok', 'Singapore']
            },
            developmentActions: [
                { action: 'Leadership Development Program', status: 'in_progress', dueDate: '2025-06-30' },
                { action: 'Project Management Certification', status: 'planned', dueDate: '2025-12-31' }
            ],
            calibrationNotes: 'Strong technical leader. Ready for team lead promotion.',
            lastCalibrationDate: '2024-12-15'
        },
        {
            employeeId: 'EMP002',
            employeeName: 'Naree Srisawat',
            employeeNameTh: 'นารี ศรีสวัสดิ์',
            position: 'Marketing Manager',
            positionTh: 'ผู้จัดการฝ่ายการตลาด',
            department: 'Marketing',
            departmentTh: 'การตลาด',
            company: 'Central Group',
            photoUrl: null,
            hireDate: '2019-07-01',
            yearsOfService: 5.5,
            age: 35,
            performanceRating: 4.8,
            potentialRating: 4.5,
            nineBoxPosition: 'high-high',
            isHiPo: true,
            riskOfLoss: 'low',
            riskOfLossReason: null,
            promotionReadiness: 'ready_now',
            successorTo: ['VP Marketing'],
            performanceHistory: [
                { year: 2024, rating: 4.8, period: 'Annual' },
                { year: 2023, rating: 4.5, period: 'Annual' },
                { year: 2022, rating: 4.3, period: 'Annual' }
            ],
            competencies: [
                { name: 'Strategic Thinking', nameTh: 'การคิดเชิงกลยุทธ์', rating: 5, maxRating: 5 },
                { name: 'Leadership', nameTh: 'ภาวะผู้นำ', rating: 5, maxRating: 5 },
                { name: 'Digital Marketing', nameTh: 'การตลาดดิจิทัล', rating: 5, maxRating: 5 },
                { name: 'Team Management', nameTh: 'การบริหารทีม', rating: 4, maxRating: 5 },
                { name: 'Stakeholder Management', nameTh: 'การบริหารผู้มีส่วนได้ส่วนเสีย', rating: 4, maxRating: 5 }
            ],
            careerAspirations: {
                shortTerm: 'VP Marketing',
                shortTermTh: 'รองประธานฝ่ายการตลาด',
                longTerm: 'Chief Marketing Officer',
                longTermTh: 'ผู้บริหารการตลาดสูงสุด',
                willingToRelocate: true,
                preferredLocations: ['Bangkok']
            },
            developmentActions: [
                { action: 'Executive Leadership Program', status: 'completed', dueDate: '2024-09-30' },
                { action: 'International Assignment - Singapore', status: 'in_progress', dueDate: '2025-06-30' }
            ],
            calibrationNotes: 'Exceptional leader. Strong candidate for VP role.',
            lastCalibrationDate: '2024-12-15'
        },
        {
            employeeId: 'EMP003',
            employeeName: 'Wichai Boonsong',
            employeeNameTh: 'วิชัย บุญส่ง',
            position: 'Sales Executive',
            positionTh: 'เจ้าหน้าที่ขาย',
            department: 'Sales',
            departmentTh: 'ฝ่ายขาย',
            company: 'Central Group',
            photoUrl: null,
            hireDate: '2022-01-15',
            yearsOfService: 2.9,
            age: 28,
            performanceRating: 3.2,
            potentialRating: 4.2,
            nineBoxPosition: 'meets-high',
            isHiPo: false,
            riskOfLoss: 'low',
            riskOfLossReason: null,
            promotionReadiness: 'ready_1_year',
            successorTo: [],
            performanceHistory: [
                { year: 2024, rating: 3.2, period: 'Annual' },
                { year: 2023, rating: 3.0, period: 'Annual' }
            ],
            competencies: [
                { name: 'Customer Relations', nameTh: 'การสร้างความสัมพันธ์ลูกค้า', rating: 4, maxRating: 5 },
                { name: 'Negotiation', nameTh: 'การเจรจาต่อรอง', rating: 3, maxRating: 5 },
                { name: 'Product Knowledge', nameTh: 'ความรู้ผลิตภัณฑ์', rating: 4, maxRating: 5 },
                { name: 'Communication', nameTh: 'การสื่อสาร', rating: 4, maxRating: 5 },
                { name: 'Time Management', nameTh: 'การบริหารเวลา', rating: 3, maxRating: 5 }
            ],
            careerAspirations: {
                shortTerm: 'Senior Sales Executive',
                shortTermTh: 'เจ้าหน้าที่ขายอาวุโส',
                longTerm: 'Sales Manager',
                longTermTh: 'ผู้จัดการฝ่ายขาย',
                willingToRelocate: false,
                preferredLocations: ['Bangkok']
            },
            developmentActions: [
                { action: 'Advanced Sales Training', status: 'planned', dueDate: '2025-03-31' }
            ],
            calibrationNotes: 'Shows potential for growth. Needs more challenging assignments.',
            lastCalibrationDate: '2024-12-15'
        },
        {
            employeeId: 'EMP004',
            employeeName: 'Pranee Jaidee',
            employeeNameTh: 'ปราณี ใจดี',
            position: 'HR Business Partner',
            positionTh: 'พันธมิตรทรัพยากรบุคคล',
            department: 'Human Resources',
            departmentTh: 'ทรัพยากรบุคคล',
            company: 'Central Group',
            photoUrl: null,
            hireDate: '2018-05-01',
            yearsOfService: 6.7,
            age: 38,
            performanceRating: 4.0,
            potentialRating: 3.5,
            nineBoxPosition: 'high-medium',
            isHiPo: false,
            riskOfLoss: 'low',
            riskOfLossReason: null,
            promotionReadiness: 'ready_2_years',
            successorTo: [],
            performanceHistory: [
                { year: 2024, rating: 4.0, period: 'Annual' },
                { year: 2023, rating: 3.8, period: 'Annual' },
                { year: 2022, rating: 4.0, period: 'Annual' }
            ],
            competencies: [
                { name: 'HR Expertise', nameTh: 'ความเชี่ยวชาญด้าน HR', rating: 5, maxRating: 5 },
                { name: 'Employee Relations', nameTh: 'ความสัมพันธ์พนักงาน', rating: 4, maxRating: 5 },
                { name: 'Strategic Thinking', nameTh: 'การคิดเชิงกลยุทธ์', rating: 3, maxRating: 5 },
                { name: 'Change Management', nameTh: 'การบริหารการเปลี่ยนแปลง', rating: 4, maxRating: 5 },
                { name: 'Communication', nameTh: 'การสื่อสาร', rating: 4, maxRating: 5 }
            ],
            careerAspirations: {
                shortTerm: 'Senior HR Business Partner',
                shortTermTh: 'พันธมิตรทรัพยากรบุคคลอาวุโส',
                longTerm: 'HR Director',
                longTermTh: 'ผู้อำนวยการทรัพยากรบุคคล',
                willingToRelocate: false,
                preferredLocations: ['Bangkok']
            },
            developmentActions: [
                { action: 'Strategic HR Certification', status: 'in_progress', dueDate: '2025-06-30' }
            ],
            calibrationNotes: 'Solid HR professional. Focus on strategic thinking development.',
            lastCalibrationDate: '2024-12-15'
        },
        {
            employeeId: 'EMP005',
            employeeName: 'Thanakorn Petcharat',
            employeeNameTh: 'ธนากร เพชรรัตน์',
            position: 'Finance Analyst',
            positionTh: 'นักวิเคราะห์การเงิน',
            department: 'Finance',
            departmentTh: 'การเงิน',
            company: 'Central Group',
            photoUrl: null,
            hireDate: '2021-09-01',
            yearsOfService: 3.3,
            age: 29,
            performanceRating: 3.5,
            potentialRating: 3.5,
            nineBoxPosition: 'meets-medium',
            isHiPo: false,
            riskOfLoss: 'medium',
            riskOfLossReason: 'Seeking higher compensation',
            promotionReadiness: 'ready_1_year',
            successorTo: [],
            performanceHistory: [
                { year: 2024, rating: 3.5, period: 'Annual' },
                { year: 2023, rating: 3.3, period: 'Annual' },
                { year: 2022, rating: 3.2, period: 'Annual' }
            ],
            competencies: [
                { name: 'Financial Analysis', nameTh: 'การวิเคราะห์การเงิน', rating: 4, maxRating: 5 },
                { name: 'Attention to Detail', nameTh: 'ความใส่ใจในรายละเอียด', rating: 4, maxRating: 5 },
                { name: 'Excel/Data Skills', nameTh: 'ทักษะ Excel/ข้อมูล', rating: 4, maxRating: 5 },
                { name: 'Business Acumen', nameTh: 'ความเข้าใจธุรกิจ', rating: 3, maxRating: 5 },
                { name: 'Communication', nameTh: 'การสื่อสาร', rating: 3, maxRating: 5 }
            ],
            careerAspirations: {
                shortTerm: 'Senior Finance Analyst',
                shortTermTh: 'นักวิเคราะห์การเงินอาวุโส',
                longTerm: 'Finance Manager',
                longTermTh: 'ผู้จัดการฝ่ายการเงิน',
                willingToRelocate: true,
                preferredLocations: ['Bangkok', 'Singapore']
            },
            developmentActions: [
                { action: 'CFA Level 1', status: 'in_progress', dueDate: '2025-06-30' }
            ],
            calibrationNotes: 'Solid performer. Monitor retention risk.',
            lastCalibrationDate: '2024-12-15'
        }
    ],

    // Talent Pool Summary by Department
    talentPoolByDepartment: [
        { department: 'IT Development', departmentTh: 'พัฒนาระบบสารสนเทศ', total: 45, hiPo: 8, stars: 3, atRisk: 2 },
        { department: 'Marketing', departmentTh: 'การตลาด', total: 32, hiPo: 5, stars: 2, atRisk: 1 },
        { department: 'Sales', departmentTh: 'ฝ่ายขาย', total: 120, hiPo: 15, stars: 5, atRisk: 8 },
        { department: 'Human Resources', departmentTh: 'ทรัพยากรบุคคล', total: 25, hiPo: 3, stars: 1, atRisk: 1 },
        { department: 'Finance', departmentTh: 'การเงิน', total: 38, hiPo: 4, stars: 2, atRisk: 3 },
        { department: 'Operations', departmentTh: 'ปฏิบัติการ', total: 85, hiPo: 10, stars: 3, atRisk: 5 }
    ],

    // 9-Box Distribution Summary
    nineBoxDistribution: {
        'high-high': { count: 16, percentage: 4.6 },
        'high-medium': { count: 28, percentage: 8.1 },
        'high-low': { count: 35, percentage: 10.1 },
        'meets-high': { count: 22, percentage: 6.4 },
        'meets-medium': { count: 145, percentage: 42.0 },
        'meets-low': { count: 48, percentage: 13.9 },
        'low-high': { count: 8, percentage: 2.3 },
        'low-medium': { count: 25, percentage: 7.2 },
        'low-low': { count: 18, percentage: 5.2 }
    },

    // Calibration Sessions
    calibrationSessions: [
        {
            id: 'CAL-2024-001',
            name: 'Q4 2024 Annual Talent Review',
            nameTh: 'ทบทวน Talent ประจำปี Q4 2024',
            status: 'completed',
            date: '2024-12-15',
            facilitator: 'HR Director',
            participants: ['VP HR', 'VP Sales', 'VP Marketing', 'VP IT', 'VP Finance', 'VP Operations'],
            departmentsReviewed: ['Sales', 'Marketing', 'IT Development', 'Finance', 'Operations'],
            employeesReviewed: 345,
            notes: 'Successfully calibrated all business units. Key action items assigned.',
            actionItems: [
                { item: 'Create succession plan for VP Marketing role', assignee: 'HR Director', dueDate: '2025-01-31', status: 'in_progress' },
                { item: 'Implement retention plan for at-risk Hi-Pos', assignee: 'HR Business Partners', dueDate: '2025-02-28', status: 'planned' },
                { item: 'Launch accelerated development program for Stars', assignee: 'Learning & Development', dueDate: '2025-03-31', status: 'planned' }
            ]
        },
        {
            id: 'CAL-2024-002',
            name: 'Mid-Year Talent Check-in',
            nameTh: 'ทบทวน Talent กลางปี',
            status: 'completed',
            date: '2024-07-15',
            facilitator: 'HR Director',
            participants: ['VP HR', 'VP Sales', 'VP IT'],
            departmentsReviewed: ['Sales', 'IT Development'],
            employeesReviewed: 165,
            notes: 'Focused review on critical talent in Sales and IT.',
            actionItems: []
        }
    ],

    // Promotion Readiness Options
    promotionReadinessOptions: [
        { value: 'ready_now', labelEn: 'Ready Now', labelTh: 'พร้อมทันที' },
        { value: 'ready_1_year', labelEn: 'Ready in 1 Year', labelTh: 'พร้อมใน 1 ปี' },
        { value: 'ready_2_years', labelEn: 'Ready in 2+ Years', labelTh: 'พร้อมใน 2+ ปี' },
        { value: 'not_ready', labelEn: 'Not Ready', labelTh: 'ยังไม่พร้อม' }
    ],

    // Risk of Loss Options
    riskOfLossOptions: [
        { value: 'high', labelEn: 'High Risk', labelTh: 'ความเสี่ยงสูง', color: '#EF4444' },
        { value: 'medium', labelEn: 'Medium Risk', labelTh: 'ความเสี่ยงปานกลาง', color: '#F59E0B' },
        { value: 'low', labelEn: 'Low Risk', labelTh: 'ความเสี่ยงต่ำ', color: '#22C55E' }
    ],

    // Development Action Status Options
    developmentActionStatusOptions: [
        { value: 'planned', labelEn: 'Planned', labelTh: 'วางแผนแล้ว' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก' }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockTalentData;
}

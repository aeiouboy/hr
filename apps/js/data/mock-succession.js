/**
 * Mock Succession Planning Data
 * Sample data for succession planning module
 */

const MockSuccessionData = {
    // Critical positions in the organization
    criticalPositions: [
        {
            id: 'pos_001',
            positionCode: '40128301',
            positionTitle: 'Chief Technology Officer',
            positionTitleTh: 'ประธานเจ้าหน้าที่เทคโนโลยี',
            department: 'Technology',
            departmentTh: 'เทคโนโลยี',
            company: 'RIS (C015)',
            isCritical: true,
            riskLevel: 'high', // high, medium, low
            riskReason: 'Single point of failure, specialized expertise',
            riskReasonTh: 'จุดเสี่ยงหลัก, ความเชี่ยวชาญเฉพาะทาง',
            incumbent: {
                id: 'EMP_CTO001',
                name: 'Suthep Thuaksuban',
                nameTh: 'สุเทพ ถั่กศุบาล',
                photo: 'https://i.pravatar.cc/150?img=13',
                employeeId: 'EMP_SUP002',
                yearsInRole: 5,
                retirementDate: '2030-06-15',
                flightRisk: 'low'
            },
            successors: [
                {
                    id: 'succ_001',
                    employeeId: 'EMP_SUP001',
                    name: 'Prawit Wongsuwan',
                    nameTh: 'ประวิตร วงศ์สุวรรณ',
                    photo: 'https://i.pravatar.cc/150?img=12',
                    currentPosition: 'Head of Product',
                    currentPositionTh: 'หัวหน้าผลิตภัณฑ์',
                    readiness: 'ready_1_2_years', // ready_now, ready_1_2_years, ready_3_plus_years
                    developmentGaps: [
                        { area: 'Infrastructure Management', areaTh: 'การจัดการโครงสร้างพื้นฐาน', priority: 'high' },
                        { area: 'Board Presentations', areaTh: 'การนำเสนอต่อคณะกรรมการ', priority: 'medium' }
                    ],
                    developmentActions: [
                        {
                            id: 'dev_001',
                            action: 'Leadership Development Program',
                            actionTh: 'โปรแกรมพัฒนาภาวะผู้นำ',
                            type: 'training',
                            status: 'in_progress',
                            targetDate: '2026-06-30',
                            progress: 60
                        },
                        {
                            id: 'dev_002',
                            action: 'Shadow CTO in Board Meetings',
                            actionTh: 'ติดตาม CTO ในการประชุมคณะกรรมการ',
                            type: 'mentoring',
                            status: 'planned',
                            targetDate: '2026-03-31',
                            progress: 0
                        }
                    ],
                    potentialRating: 'high',
                    performanceRating: 'exceeds_expectations',
                    nominatedDate: '2024-01-15',
                    nominatedBy: 'CEO'
                },
                {
                    id: 'succ_002',
                    employeeId: 'EMP001',
                    name: 'Chatchai Tangsiri',
                    nameTh: 'ชาติชาย ทังศิริ',
                    photo: 'https://i.pravatar.cc/150?img=11',
                    currentPosition: 'Product Manager',
                    currentPositionTh: 'ผู้จัดการผลิตภัณฑ์',
                    readiness: 'ready_3_plus_years',
                    developmentGaps: [
                        { area: 'Executive Leadership', areaTh: 'ภาวะผู้นำระดับบริหาร', priority: 'high' },
                        { area: 'Enterprise Architecture', areaTh: 'สถาปัตยกรรมองค์กร', priority: 'high' },
                        { area: 'Budget Management', areaTh: 'การบริหารงบประมาณ', priority: 'medium' }
                    ],
                    developmentActions: [
                        {
                            id: 'dev_003',
                            action: 'MBA Executive Program',
                            actionTh: 'โปรแกรม MBA สำหรับผู้บริหาร',
                            type: 'education',
                            status: 'planned',
                            targetDate: '2027-12-31',
                            progress: 0
                        },
                        {
                            id: 'dev_004',
                            action: 'Cross-functional Project Lead',
                            actionTh: 'หัวหน้าโครงการข้ามสายงาน',
                            type: 'stretch_assignment',
                            status: 'in_progress',
                            targetDate: '2026-09-30',
                            progress: 30
                        }
                    ],
                    potentialRating: 'high',
                    performanceRating: 'meets_expectations',
                    nominatedDate: '2024-06-01',
                    nominatedBy: 'CTO'
                }
            ],
            coverageStatus: 'partial', // full, partial, at_risk
            lastReviewDate: '2025-09-15',
            nextReviewDate: '2026-03-15'
        },
        {
            id: 'pos_002',
            positionCode: '40128305',
            positionTitle: 'Head of Product',
            positionTitleTh: 'หัวหน้าผลิตภัณฑ์',
            department: 'Product Management',
            departmentTh: 'บริหารผลิตภัณฑ์',
            company: 'RIS (C015)',
            isCritical: true,
            riskLevel: 'medium',
            riskReason: 'Key revenue driver, market knowledge',
            riskReasonTh: 'ตัวขับเคลื่อนรายได้หลัก, ความรู้ตลาด',
            incumbent: {
                id: 'EMP_HOP001',
                name: 'Prawit Wongsuwan',
                nameTh: 'ประวิตร วงศ์สุวรรณ',
                photo: 'https://i.pravatar.cc/150?img=12',
                employeeId: 'EMP_SUP001',
                yearsInRole: 3,
                retirementDate: null,
                flightRisk: 'medium'
            },
            successors: [
                {
                    id: 'succ_003',
                    employeeId: 'EMP001',
                    name: 'Chatchai Tangsiri',
                    nameTh: 'ชาติชาย ทังศิริ',
                    photo: 'https://i.pravatar.cc/150?img=11',
                    currentPosition: 'Product Manager',
                    currentPositionTh: 'ผู้จัดการผลิตภัณฑ์',
                    readiness: 'ready_1_2_years',
                    developmentGaps: [
                        { area: 'Team Leadership', areaTh: 'การนำทีม', priority: 'medium' },
                        { area: 'Strategic Planning', areaTh: 'การวางแผนกลยุทธ์', priority: 'medium' }
                    ],
                    developmentActions: [
                        {
                            id: 'dev_005',
                            action: 'Lead Product Team Expansion',
                            actionTh: 'นำการขยายทีมผลิตภัณฑ์',
                            type: 'stretch_assignment',
                            status: 'in_progress',
                            targetDate: '2026-06-30',
                            progress: 45
                        }
                    ],
                    potentialRating: 'high',
                    performanceRating: 'exceeds_expectations',
                    nominatedDate: '2024-03-01',
                    nominatedBy: 'Head of Product'
                },
                {
                    id: 'succ_004',
                    employeeId: 'EMP_DR001',
                    name: 'Natthapong Chai',
                    nameTh: 'ณัฐพงศ์ ไชย',
                    photo: 'https://i.pravatar.cc/150?img=14',
                    currentPosition: 'Senior Product Analyst',
                    currentPositionTh: 'นักวิเคราะห์ผลิตภัณฑ์อาวุโส',
                    readiness: 'ready_3_plus_years',
                    developmentGaps: [
                        { area: 'Product Strategy', areaTh: 'กลยุทธ์ผลิตภัณฑ์', priority: 'high' },
                        { area: 'Stakeholder Management', areaTh: 'การจัดการผู้มีส่วนได้ส่วนเสีย', priority: 'high' }
                    ],
                    developmentActions: [
                        {
                            id: 'dev_006',
                            action: 'Product Management Certification',
                            actionTh: 'ใบรับรองการจัดการผลิตภัณฑ์',
                            type: 'training',
                            status: 'completed',
                            targetDate: '2025-12-31',
                            progress: 100
                        }
                    ],
                    potentialRating: 'medium',
                    performanceRating: 'meets_expectations',
                    nominatedDate: '2025-01-15',
                    nominatedBy: 'Product Manager'
                }
            ],
            coverageStatus: 'full',
            lastReviewDate: '2025-10-01',
            nextReviewDate: '2026-04-01'
        },
        {
            id: 'pos_003',
            positionCode: '40128310',
            positionTitle: 'Head of HR',
            positionTitleTh: 'หัวหน้าฝ่ายทรัพยากรบุคคล',
            department: 'Human Resources',
            departmentTh: 'ทรัพยากรบุคคล',
            company: 'RIS (C015)',
            isCritical: true,
            riskLevel: 'high',
            riskReason: 'Incumbent retiring within 2 years',
            riskReasonTh: 'ผู้ดำรงตำแหน่งจะเกษียณภายใน 2 ปี',
            incumbent: {
                id: 'EMP_HHR001',
                name: 'Somjai Prasert',
                nameTh: 'สมใจ ประเสริฐ',
                photo: 'https://i.pravatar.cc/150?img=20',
                employeeId: 'EMP_HR001',
                yearsInRole: 12,
                retirementDate: '2027-04-30',
                flightRisk: 'low'
            },
            successors: [
                {
                    id: 'succ_005',
                    employeeId: 'EMP_HRBP001',
                    name: 'Nattaya Ayutthaya',
                    nameTh: 'ณัฐยา อยุธยา',
                    photo: 'https://i.pravatar.cc/150?img=17',
                    currentPosition: 'HR Business Partner',
                    currentPositionTh: 'พันธมิตรทรัพยากรบุคคล',
                    readiness: 'ready_now',
                    developmentGaps: [
                        { area: 'Labor Law Expertise', areaTh: 'ความเชี่ยวชาญกฎหมายแรงงาน', priority: 'low' }
                    ],
                    developmentActions: [
                        {
                            id: 'dev_007',
                            action: 'HR Leadership Shadowing',
                            actionTh: 'ติดตามผู้นำ HR',
                            type: 'mentoring',
                            status: 'completed',
                            targetDate: '2025-12-31',
                            progress: 100
                        }
                    ],
                    potentialRating: 'high',
                    performanceRating: 'exceeds_expectations',
                    nominatedDate: '2023-06-01',
                    nominatedBy: 'Head of HR'
                }
            ],
            coverageStatus: 'full',
            lastReviewDate: '2025-11-01',
            nextReviewDate: '2026-05-01'
        },
        {
            id: 'pos_004',
            positionCode: '40128315',
            positionTitle: 'Head of Finance',
            positionTitleTh: 'หัวหน้าฝ่ายการเงิน',
            department: 'Finance',
            departmentTh: 'การเงิน',
            company: 'RIS (C015)',
            isCritical: true,
            riskLevel: 'high',
            riskReason: 'No identified successors',
            riskReasonTh: 'ไม่มีผู้สืบทอดที่ระบุไว้',
            incumbent: {
                id: 'EMP_HFN001',
                name: 'Wichai Somchai',
                nameTh: 'วิชัย สมชาย',
                photo: 'https://i.pravatar.cc/150?img=21',
                employeeId: 'EMP_FN001',
                yearsInRole: 7,
                retirementDate: null,
                flightRisk: 'high'
            },
            successors: [],
            coverageStatus: 'at_risk',
            lastReviewDate: '2025-08-15',
            nextReviewDate: '2026-02-15'
        }
    ],

    // Dashboard metrics
    dashboardMetrics: {
        totalCriticalPositions: 4,
        positionsWithSuccessors: 3,
        coverageRatio: 75,
        readyNowRatio: 25,
        avgSuccessorsPerPosition: 1.75,
        highRiskPositions: 2,
        mediumRiskPositions: 1,
        lowRiskPositions: 1,
        upcomingRetirements: 1,
        actionItemsDue: 3
    },

    // Development action types
    developmentTypes: [
        { value: 'training', labelEn: 'Training Program', labelTh: 'โปรแกรมฝึกอบรม' },
        { value: 'education', labelEn: 'Formal Education', labelTh: 'การศึกษาอย่างเป็นทางการ' },
        { value: 'mentoring', labelEn: 'Mentoring/Coaching', labelTh: 'การให้คำปรึกษา/โค้ชชิ่ง' },
        { value: 'stretch_assignment', labelEn: 'Stretch Assignment', labelTh: 'งานท้าทาย' },
        { value: 'rotation', labelEn: 'Job Rotation', labelTh: 'การหมุนเวียนงาน' },
        { value: 'shadowing', labelEn: 'Job Shadowing', labelTh: 'การติดตามงาน' },
        { value: 'project', labelEn: 'Special Project', labelTh: 'โครงการพิเศษ' }
    ],

    // Readiness levels
    readinessLevels: [
        { value: 'ready_now', labelEn: 'Ready Now', labelTh: 'พร้อมปัจจุบัน', color: 'bg-green-100 text-green-800' },
        { value: 'ready_1_2_years', labelEn: '1-2 Years', labelTh: '1-2 ปี', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'ready_3_plus_years', labelEn: '3+ Years', labelTh: '3+ ปี', color: 'bg-orange-100 text-orange-800' }
    ],

    // Risk levels
    riskLevels: [
        { value: 'high', labelEn: 'High Risk', labelTh: 'ความเสี่ยงสูง', color: 'bg-red-100 text-red-800' },
        { value: 'medium', labelEn: 'Medium Risk', labelTh: 'ความเสี่ยงปานกลาง', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'low', labelEn: 'Low Risk', labelTh: 'ความเสี่ยงต่ำ', color: 'bg-green-100 text-green-800' }
    ],

    // Coverage status
    coverageStatuses: [
        { value: 'full', labelEn: 'Full Coverage', labelTh: 'ครอบคลุมเต็มที่', color: 'bg-green-100 text-green-800' },
        { value: 'partial', labelEn: 'Partial Coverage', labelTh: 'ครอบคลุมบางส่วน', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'at_risk', labelEn: 'At Risk', labelTh: 'มีความเสี่ยง', color: 'bg-red-100 text-red-800' }
    ],

    // Potential employees for nomination
    potentialSuccessors: [
        {
            id: 'EMP_DR001',
            name: 'Natthapong Chai',
            nameTh: 'ณัฐพงศ์ ไชย',
            position: 'Senior Product Analyst',
            positionTh: 'นักวิเคราะห์ผลิตภัณฑ์อาวุโส',
            photo: 'https://i.pravatar.cc/150?img=14',
            potentialRating: 'high',
            performanceRating: 'exceeds_expectations'
        },
        {
            id: 'EMP_DR002',
            name: 'Siriporn Kaewdee',
            nameTh: 'ศิริพร แก้วดี',
            position: 'Product Analyst',
            positionTh: 'นักวิเคราะห์ผลิตภัณฑ์',
            photo: 'https://i.pravatar.cc/150?img=15',
            potentialRating: 'medium',
            performanceRating: 'meets_expectations'
        },
        {
            id: 'EMP_DR003',
            name: 'Worachai Limpakit',
            nameTh: 'วรชัย ลิมปกิจ',
            position: 'Associate Product Manager',
            positionTh: 'ผู้จัดการผลิตภัณฑ์ช่วย',
            photo: 'https://i.pravatar.cc/150?img=16',
            potentialRating: 'high',
            performanceRating: 'exceeds_expectations'
        }
    ],

    /**
     * Get position by ID
     * @param {string} positionId
     * @returns {object|null}
     */
    getPositionById(positionId) {
        return this.criticalPositions.find(p => p.id === positionId) || null;
    },

    /**
     * Get positions filtered by risk level
     * @param {string} riskLevel
     * @returns {array}
     */
    getPositionsByRisk(riskLevel) {
        if (riskLevel === 'all') return this.criticalPositions;
        return this.criticalPositions.filter(p => p.riskLevel === riskLevel);
    },

    /**
     * Get positions filtered by coverage status
     * @param {string} status
     * @returns {array}
     */
    getPositionsByCoverage(status) {
        if (status === 'all') return this.criticalPositions;
        return this.criticalPositions.filter(p => p.coverageStatus === status);
    },

    /**
     * Get all successors across all positions
     * @returns {array}
     */
    getAllSuccessors() {
        const successors = [];
        this.criticalPositions.forEach(pos => {
            pos.successors.forEach(succ => {
                successors.push({
                    ...succ,
                    targetPosition: pos.positionTitle,
                    targetPositionTh: pos.positionTitleTh,
                    positionId: pos.id
                });
            });
        });
        return successors;
    },

    /**
     * Get pending development actions
     * @returns {array}
     */
    getPendingActions() {
        const actions = [];
        this.criticalPositions.forEach(pos => {
            pos.successors.forEach(succ => {
                succ.developmentActions.forEach(action => {
                    if (action.status !== 'completed') {
                        actions.push({
                            ...action,
                            successorName: succ.name,
                            successorNameTh: succ.nameTh,
                            targetPosition: pos.positionTitle,
                            targetPositionTh: pos.positionTitleTh
                        });
                    }
                });
            });
        });
        // Sort by target date
        return actions.sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate));
    },

    /**
     * Get readiness label
     * @param {string} readiness
     * @param {boolean} isThai
     * @returns {string}
     */
    getReadinessLabel(readiness, isThai = false) {
        const level = this.readinessLevels.find(l => l.value === readiness);
        return level ? (isThai ? level.labelTh : level.labelEn) : readiness;
    },

    /**
     * Get readiness color class
     * @param {string} readiness
     * @returns {string}
     */
    getReadinessColor(readiness) {
        const level = this.readinessLevels.find(l => l.value === readiness);
        return level ? level.color : 'bg-gray-100 text-gray-800';
    },

    /**
     * Get risk label
     * @param {string} risk
     * @param {boolean} isThai
     * @returns {string}
     */
    getRiskLabel(risk, isThai = false) {
        const level = this.riskLevels.find(l => l.value === risk);
        return level ? (isThai ? level.labelTh : level.labelEn) : risk;
    },

    /**
     * Get risk color class
     * @param {string} risk
     * @returns {string}
     */
    getRiskColor(risk) {
        const level = this.riskLevels.find(l => l.value === risk);
        return level ? level.color : 'bg-gray-100 text-gray-800';
    },

    /**
     * Get coverage label
     * @param {string} status
     * @param {boolean} isThai
     * @returns {string}
     */
    getCoverageLabel(status, isThai = false) {
        const s = this.coverageStatuses.find(c => c.value === status);
        return s ? (isThai ? s.labelTh : s.labelEn) : status;
    },

    /**
     * Get coverage color class
     * @param {string} status
     * @returns {string}
     */
    getCoverageColor(status) {
        const s = this.coverageStatuses.find(c => c.value === status);
        return s ? s.color : 'bg-gray-100 text-gray-800';
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockSuccessionData;
}

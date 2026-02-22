/**
 * Mock Overtime Data
 * Thai Labor Law compliant OT data and calculations
 */

const MockOvertimeData = (function() {
    // Thai Labor Law OT Rate multipliers
    const OT_RATES = {
        weekday: 1.5,        // OT on normal workday after 8 hours
        weekend: 2.0,        // OT on rest days (weekends)
        holiday: 3.0,        // OT on public holidays
        weekdayNight: 1.5,   // Night premium (10pm-6am) - additional
        nightPremium: 0.5    // Additional premium for night shift
    };

    // Thai Labor Law limits
    const OT_LIMITS = {
        maxWeeklyHours: 36,      // Maximum OT hours per week
        maxDailyHours: 4,        // Recommended max daily OT
        minRestPeriod: 20,       // Minimum rest period in minutes after 5 hours
        normalWorkHours: 8       // Standard work hours before OT kicks in
    };

    // OT Types
    const OT_TYPES = [
        {
            id: 'weekday',
            code: 'OT-WD',
            nameEn: 'Weekday Overtime',
            nameTh: 'OT วันธรรมดา',
            rate: 1.5,
            description: 'Regular overtime on normal working days after 8 hours',
            descriptionTh: 'ค่าล่วงเวลาวันธรรมดาหลังจากทำงาน 8 ชั่วโมง'
        },
        {
            id: 'weekend',
            code: 'OT-WE',
            nameEn: 'Weekend Overtime',
            nameTh: 'OT วันหยุด',
            rate: 2.0,
            description: 'Overtime on rest days (Saturday/Sunday)',
            descriptionTh: 'ค่าล่วงเวลาวันหยุดสัปดาห์'
        },
        {
            id: 'holiday',
            code: 'OT-HD',
            nameEn: 'Holiday Overtime',
            nameTh: 'OT วันหยุดนักขัตฤกษ์',
            rate: 3.0,
            description: 'Overtime on public holidays',
            descriptionTh: 'ค่าล่วงเวลาวันหยุดนักขัตฤกษ์'
        },
        {
            id: 'night',
            code: 'OT-NT',
            nameEn: 'Night Shift Premium',
            nameTh: 'ค่ากะกลางคืน',
            rate: 0.5,
            description: 'Additional premium for work between 22:00-06:00',
            descriptionTh: 'ค่าเบี้ยเลี้ยงกะกลางคืน (22:00-06:00)'
        }
    ];

    // Approval workflow steps
    const APPROVAL_WORKFLOW = [
        {
            step: 1,
            role: 'manager',
            nameEn: 'Direct Manager Approval',
            nameTh: 'อนุมัติโดยหัวหน้างาน'
        },
        {
            step: 2,
            role: 'hr',
            nameEn: 'HR Verification',
            nameTh: 'ตรวจสอบโดย HR',
            condition: 'hours > 10'  // Only for high-hour requests
        },
        {
            step: 3,
            role: 'finance',
            nameEn: 'Budget Validation',
            nameTh: 'ตรวจสอบงบประมาณ',
            condition: 'amount > 10000'  // Only for high-cost requests
        }
    ];

    // Mock OT Requests
    const otRequests = [
        {
            id: 'OT-2026-001',
            employeeId: 'E001',
            employeeName: 'Somchai Prasert',
            employeeNameTh: 'สมชาย ประเสริฐ',
            date: '2026-01-08',
            dayType: 'weekday',
            startTime: '18:00',
            endTime: '21:00',
            hours: 3,
            otType: 'weekday',
            rate: 1.5,
            hourlyRate: 250,
            amount: 1125,  // 3 * 250 * 1.5
            reason: 'System maintenance and deployment',
            reasonTh: 'ดูแลระบบและติดตั้งซอฟต์แวร์',
            workDescription: 'Completed server maintenance and deployed new application version',
            workDescriptionTh: 'ทำการบำรุงรักษาเซิร์ฟเวอร์และติดตั้งแอปพลิเคชันเวอร์ชันใหม่',
            preApproved: true,
            status: 'approved',
            submittedAt: '2026-01-07T09:00:00',
            approvedAt: '2026-01-07T14:30:00',
            approvedBy: 'M001',
            approvedByName: 'Wanchai Srisuk',
            postConfirmed: true,
            postConfirmedAt: '2026-01-09T09:00:00'
        },
        {
            id: 'OT-2026-002',
            employeeId: 'E001',
            employeeName: 'Somchai Prasert',
            employeeNameTh: 'สมชาย ประเสริฐ',
            date: '2026-01-11',
            dayType: 'weekend',
            startTime: '09:00',
            endTime: '15:00',
            hours: 6,
            otType: 'weekend',
            rate: 2.0,
            hourlyRate: 250,
            amount: 3000,  // 6 * 250 * 2.0
            reason: 'Urgent client project deadline',
            reasonTh: 'งานเร่งด่วนจากลูกค้า',
            workDescription: 'Complete client presentation materials and demo preparation',
            workDescriptionTh: 'เตรียมเอกสารนำเสนอและ Demo สำหรับลูกค้า',
            preApproved: true,
            status: 'pending',
            submittedAt: '2026-01-09T10:00:00',
            approvedAt: null,
            approvedBy: null,
            postConfirmed: false
        },
        {
            id: 'OT-2026-003',
            employeeId: 'E001',
            employeeName: 'Somchai Prasert',
            employeeNameTh: 'สมชาย ประเสริฐ',
            date: '2025-12-25',
            dayType: 'holiday',
            startTime: '10:00',
            endTime: '18:00',
            hours: 8,
            otType: 'holiday',
            rate: 3.0,
            hourlyRate: 250,
            amount: 6000,  // 8 * 250 * 3.0
            reason: 'Emergency production issue',
            reasonTh: 'แก้ไขปัญหา Production ฉุกเฉิน',
            workDescription: 'Resolved critical production database issue',
            workDescriptionTh: 'แก้ไขปัญหาฐานข้อมูล Production ที่สำคัญ',
            preApproved: false,
            status: 'approved',
            submittedAt: '2025-12-26T08:00:00',
            approvedAt: '2025-12-26T10:00:00',
            approvedBy: 'M001',
            approvedByName: 'Wanchai Srisuk',
            postConfirmed: true,
            postConfirmedAt: '2025-12-27T09:00:00'
        },
        {
            id: 'OT-2026-004',
            employeeId: 'E001',
            employeeName: 'Somchai Prasert',
            employeeNameTh: 'สมชาย ประเสริฐ',
            date: '2026-01-06',
            dayType: 'weekday',
            startTime: '18:00',
            endTime: '22:30',
            hours: 4.5,
            otType: 'weekday',
            rate: 1.5,
            hourlyRate: 250,
            amount: 1687.50,
            hasNightPremium: true,
            nightHours: 0.5,
            nightPremiumAmount: 62.50,  // 0.5 * 250 * 0.5
            totalAmount: 1750,
            reason: 'Month-end report preparation',
            reasonTh: 'เตรียมรายงานสิ้นเดือน',
            workDescription: 'Prepared financial reports and reconciliation',
            workDescriptionTh: 'เตรียมรายงานทางการเงินและกระทบยอด',
            preApproved: true,
            status: 'completed',
            submittedAt: '2026-01-05T15:00:00',
            approvedAt: '2026-01-05T16:30:00',
            approvedBy: 'M001',
            approvedByName: 'Wanchai Srisuk',
            postConfirmed: true,
            postConfirmedAt: '2026-01-07T09:00:00',
            paidAt: '2026-01-10T00:00:00'
        },
        {
            id: 'OT-2026-005',
            employeeId: 'E001',
            employeeName: 'Somchai Prasert',
            employeeNameTh: 'สมชาย ประเสริฐ',
            date: '2026-01-03',
            dayType: 'weekday',
            startTime: '18:00',
            endTime: '20:00',
            hours: 2,
            otType: 'weekday',
            rate: 1.5,
            hourlyRate: 250,
            amount: 750,
            reason: 'Team meeting and planning',
            reasonTh: 'ประชุมทีมและวางแผน',
            workDescription: 'Quarterly planning meeting with regional team',
            workDescriptionTh: 'ประชุมวางแผนรายไตรมาสกับทีมภูมิภาค',
            preApproved: true,
            status: 'rejected',
            submittedAt: '2026-01-02T14:00:00',
            rejectedAt: '2026-01-03T09:00:00',
            rejectedBy: 'M001',
            rejectedByName: 'Wanchai Srisuk',
            rejectionReason: 'Meeting can be rescheduled to normal working hours',
            rejectionReasonTh: 'การประชุมสามารถจัดในเวลาทำการได้'
        }
    ];

    // Monthly OT summary
    const monthlyOTSummary = {
        '2026-01': {
            totalHours: 13.5,
            totalAmount: 10875,
            byType: {
                weekday: { hours: 7.5, amount: 2812.50 },
                weekend: { hours: 6, amount: 3000, pending: true },
                holiday: { hours: 0, amount: 0 },
                night: { hours: 0.5, amount: 62.50 }
            },
            requests: 4,
            approved: 2,
            pending: 1,
            rejected: 1,
            weeklyHours: [
                { week: 1, hours: 7.5, limit: 36, percentage: 20.83 },
                { week: 2, hours: 6, limit: 36, percentage: 16.67 }
            ]
        },
        '2025-12': {
            totalHours: 8,
            totalAmount: 6000,
            byType: {
                weekday: { hours: 0, amount: 0 },
                weekend: { hours: 0, amount: 0 },
                holiday: { hours: 8, amount: 6000 },
                night: { hours: 0, amount: 0 }
            },
            requests: 1,
            approved: 1,
            pending: 0,
            rejected: 0
        }
    };

    // Department OT budget
    const departmentBudget = {
        departmentId: 'D001',
        departmentName: 'IT Department',
        departmentNameTh: 'ฝ่ายเทคโนโลยีสารสนเทศ',
        monthlyBudget: 100000,
        usedBudget: 45000,
        remainingBudget: 55000,
        fiscalYear: 2026,
        month: 1,
        alerts: [
            {
                type: 'info',
                message: 'Budget utilization at 45%',
                messageTh: 'ใช้งบประมาณไปแล้ว 45%'
            }
        ]
    };

    // Thai public holidays for OT type detection
    const publicHolidays2026 = [
        { date: '2026-01-01', name: "New Year's Day", nameTh: 'วันขึ้นปีใหม่' },
        { date: '2026-02-26', name: 'Makha Bucha Day', nameTh: 'วันมาฆบูชา' },
        { date: '2026-04-06', name: 'Chakri Memorial Day', nameTh: 'วันจักรี' },
        { date: '2026-04-13', name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
        { date: '2026-04-14', name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
        { date: '2026-04-15', name: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
        { date: '2026-05-01', name: 'Labour Day', nameTh: 'วันแรงงานแห่งชาติ' },
        { date: '2026-05-04', name: 'Coronation Day', nameTh: 'วันฉัตรมงคล' },
        { date: '2026-05-13', name: 'Visakha Bucha Day', nameTh: 'วันวิสาขบูชา' },
        { date: '2026-06-03', name: "Queen's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษาสมเด็จพระราชินี' },
        { date: '2026-07-11', name: 'Asanha Bucha Day', nameTh: 'วันอาสาฬหบูชา' },
        { date: '2026-07-12', name: 'Buddhist Lent Day', nameTh: 'วันเข้าพรรษา' },
        { date: '2026-07-28', name: "King's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษา ร.10' },
        { date: '2026-08-12', name: "Mother's Day", nameTh: 'วันแม่แห่งชาติ' },
        { date: '2026-10-13', name: 'King Bhumibol Memorial Day', nameTh: 'วันคล้ายวันสวรรคต ร.9' },
        { date: '2026-10-23', name: 'Chulalongkorn Day', nameTh: 'วันปิยมหาราช' },
        { date: '2026-12-05', name: "Father's Day", nameTh: 'วันพ่อแห่งชาติ' },
        { date: '2026-12-10', name: 'Constitution Day', nameTh: 'วันรัฐธรรมนูญ' },
        { date: '2026-12-31', name: "New Year's Eve", nameTh: 'วันสิ้นปี' }
    ];

    return {
        // Get all OT types
        getOTTypes() {
            return [...OT_TYPES];
        },

        // Get OT rates
        getOTRates() {
            return { ...OT_RATES };
        },

        // Get OT limits (Thai Labor Law)
        getOTLimits() {
            return { ...OT_LIMITS };
        },

        // Get approval workflow
        getApprovalWorkflow() {
            return [...APPROVAL_WORKFLOW];
        },

        // Get OT requests for employee
        getOTRequests(employeeId, filters = {}) {
            let requests = otRequests.filter(r => r.employeeId === employeeId);

            if (filters.status) {
                requests = requests.filter(r => r.status === filters.status);
            }

            if (filters.startDate) {
                requests = requests.filter(r => r.date >= filters.startDate);
            }

            if (filters.endDate) {
                requests = requests.filter(r => r.date <= filters.endDate);
            }

            if (filters.otType) {
                requests = requests.filter(r => r.otType === filters.otType);
            }

            return requests.sort((a, b) => new Date(b.date) - new Date(a.date));
        },

        // Get single OT request
        getOTRequest(requestId) {
            return otRequests.find(r => r.id === requestId) || null;
        },

        // Get monthly summary
        getMonthlySummary(employeeId, yearMonth) {
            return monthlyOTSummary[yearMonth] || {
                totalHours: 0,
                totalAmount: 0,
                byType: {
                    weekday: { hours: 0, amount: 0 },
                    weekend: { hours: 0, amount: 0 },
                    holiday: { hours: 0, amount: 0 },
                    night: { hours: 0, amount: 0 }
                },
                requests: 0,
                approved: 0,
                pending: 0,
                rejected: 0
            };
        },

        // Get department budget
        getDepartmentBudget(departmentId) {
            return { ...departmentBudget };
        },

        // Check if date is a public holiday
        isPublicHoliday(dateStr) {
            return publicHolidays2026.find(h => h.date === dateStr) || null;
        },

        // Get public holidays
        getPublicHolidays(year) {
            return publicHolidays2026.filter(h => h.date.startsWith(year.toString()));
        },

        // Determine OT type based on date
        determineOTType(dateStr) {
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();

            // Check if public holiday first
            if (this.isPublicHoliday(dateStr)) {
                return 'holiday';
            }

            // Check if weekend (Saturday = 6, Sunday = 0)
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                return 'weekend';
            }

            // Default to weekday
            return 'weekday';
        },

        // Calculate OT amount
        calculateOTAmount(hours, hourlyRate, otType, hasNightPremium = false, nightHours = 0) {
            const rate = OT_RATES[otType] || 1.5;
            let amount = hours * hourlyRate * rate;

            // Add night premium if applicable
            if (hasNightPremium && nightHours > 0) {
                amount += nightHours * hourlyRate * OT_RATES.nightPremium;
            }

            return Math.round(amount * 100) / 100;
        },

        // Check weekly OT limit
        checkWeeklyLimit(employeeId, weekStartDate, additionalHours) {
            // Get existing OT hours for the week
            const weekEnd = new Date(weekStartDate);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const weekRequests = otRequests.filter(r =>
                r.employeeId === employeeId &&
                r.date >= weekStartDate &&
                r.date <= weekEnd.toISOString().split('T')[0] &&
                r.status !== 'rejected'
            );

            const currentWeeklyHours = weekRequests.reduce((sum, r) => sum + r.hours, 0);
            const totalAfterRequest = currentWeeklyHours + additionalHours;

            return {
                currentHours: currentWeeklyHours,
                requestedHours: additionalHours,
                totalHours: totalAfterRequest,
                maxHours: OT_LIMITS.maxWeeklyHours,
                withinLimit: totalAfterRequest <= OT_LIMITS.maxWeeklyHours,
                remaining: Math.max(0, OT_LIMITS.maxWeeklyHours - currentWeeklyHours)
            };
        },

        // Submit new OT request
        async submitOTRequest(requestData) {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const newRequest = {
                id: `OT-2026-${String(otRequests.length + 1).padStart(3, '0')}`,
                ...requestData,
                status: 'pending',
                submittedAt: new Date().toISOString()
            };

            otRequests.push(newRequest);
            return newRequest;
        },

        // Cancel OT request
        async cancelOTRequest(requestId) {
            await new Promise(resolve => setTimeout(resolve, 300));

            const request = otRequests.find(r => r.id === requestId);
            if (request && request.status === 'pending') {
                request.status = 'cancelled';
                request.cancelledAt = new Date().toISOString();
                return true;
            }
            return false;
        },

        // Post-confirm OT (after completion)
        async postConfirmOT(requestId, actualHours, notes) {
            await new Promise(resolve => setTimeout(resolve, 300));

            const request = otRequests.find(r => r.id === requestId);
            if (request && request.status === 'approved') {
                request.postConfirmed = true;
                request.postConfirmedAt = new Date().toISOString();
                request.actualHours = actualHours;
                request.postConfirmNotes = notes;
                request.status = 'completed';
                return true;
            }
            return false;
        },

        // Get yearly OT report
        getYearlyReport(employeeId, year) {
            const yearRequests = otRequests.filter(r =>
                r.employeeId === employeeId &&
                r.date.startsWith(year.toString()) &&
                (r.status === 'approved' || r.status === 'completed')
            );

            const report = {
                year,
                totalHours: 0,
                totalAmount: 0,
                byMonth: {},
                byType: {
                    weekday: { hours: 0, amount: 0 },
                    weekend: { hours: 0, amount: 0 },
                    holiday: { hours: 0, amount: 0 },
                    night: { hours: 0, amount: 0 }
                }
            };

            yearRequests.forEach(r => {
                report.totalHours += r.hours;
                report.totalAmount += r.amount || 0;

                const month = r.date.substring(0, 7);
                if (!report.byMonth[month]) {
                    report.byMonth[month] = { hours: 0, amount: 0, requests: 0 };
                }
                report.byMonth[month].hours += r.hours;
                report.byMonth[month].amount += r.amount || 0;
                report.byMonth[month].requests++;

                if (report.byType[r.otType]) {
                    report.byType[r.otType].hours += r.hours;
                    report.byType[r.otType].amount += r.amount || 0;
                }
            });

            return report;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockOvertimeData;
}

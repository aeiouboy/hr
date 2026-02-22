/**
 * Mock Attendance Data
 * Time attendance records, anomaly detection, and import history
 */

const MockAttendanceData = {
    // Attendance Configuration
    config: {
        lateThresholdMinutes: 15, // Minutes after shift start considered late
        earlyDepartureThresholdMinutes: 30, // Minutes before shift end considered early departure
        overtimeApprovalRequired: true,
        consecutiveAbsenceAlertDays: 3,
        workHoursPerDay: 8,
        breakMinutes: 60
    },

    // Source devices/locations for attendance
    sources: [
        { id: 'src_001', code: 'MAIN_OFFICE', nameEn: 'Main Office Biometric', nameTh: 'สแกนนิ้วสำนักงานใหญ่', type: 'biometric' },
        { id: 'src_002', code: 'MOBILE_APP', nameEn: 'Mobile App GPS', nameTh: 'แอปมือถือ GPS', type: 'mobile' },
        { id: 'src_003', code: 'CARD_READER', nameEn: 'Card Reader Gate', nameTh: 'เครื่องรูดบัตรประตู', type: 'card' },
        { id: 'src_004', code: 'BRANCH_01', nameEn: 'Branch 01 Terminal', nameTh: 'เครื่องลงเวลาสาขา 01', type: 'biometric' },
        { id: 'src_005', code: 'WEB_PORTAL', nameEn: 'Web Portal', nameTh: 'ระบบเว็บ', type: 'web' }
    ],

    // Anomaly types
    anomalyTypes: [
        { id: 'missing_checkin', labelEn: 'Missing Check-in', labelTh: 'ไม่ลงเวลาเข้า', severity: 'high', icon: 'login' },
        { id: 'missing_checkout', labelEn: 'Missing Check-out', labelTh: 'ไม่ลงเวลาออก', severity: 'high', icon: 'logout' },
        { id: 'late_arrival', labelEn: 'Late Arrival', labelTh: 'มาสาย', severity: 'medium', icon: 'schedule' },
        { id: 'early_departure', labelEn: 'Early Departure', labelTh: 'กลับก่อนเวลา', severity: 'medium', icon: 'exit_to_app' },
        { id: 'unapproved_ot', labelEn: 'OT Without Approval', labelTh: 'ทำล่วงเวลาไม่ได้รับอนุมัติ', severity: 'low', icon: 'more_time' },
        { id: 'consecutive_absence', labelEn: 'Consecutive Absences', labelTh: 'ขาดงานติดต่อกัน', severity: 'critical', icon: 'event_busy' },
        { id: 'location_mismatch', labelEn: 'Location Mismatch', labelTh: 'สถานที่ไม่ตรง', severity: 'medium', icon: 'location_off' }
    ],

    // Attendance Records (sample data for January 2026)
    attendanceRecords: [
        // Employee EMP001 - Regular employee
        {
            id: 'att_001',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-02',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:25',
            actualCheckOut: '17:35',
            checkInSource: 'src_001',
            checkInLocation: 'Silom Tower, Floor 25',
            checkOutSource: 'src_001',
            checkOutLocation: 'Silom Tower, Floor 25',
            workingHours: 8.17,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'present',
            anomalies: []
        },
        {
            id: 'att_002',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-03',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:52',
            actualCheckOut: '17:30',
            checkInSource: 'src_002',
            checkInLocation: 'Mobile GPS - Silom Area',
            checkOutSource: 'src_001',
            checkOutLocation: 'Silom Tower, Floor 25',
            workingHours: 7.63,
            overtimeHours: 0,
            isLate: true,
            isEarlyDeparture: false,
            lateMinutes: 22,
            earlyMinutes: 0,
            status: 'present',
            anomalies: ['late_arrival']
        },
        {
            id: 'att_003',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-06',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:30',
            actualCheckOut: null,
            checkInSource: 'src_001',
            checkInLocation: 'Silom Tower, Floor 25',
            checkOutSource: null,
            checkOutLocation: null,
            workingHours: null,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'incomplete',
            anomalies: ['missing_checkout']
        },
        {
            id: 'att_004',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-07',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:28',
            actualCheckOut: '19:45',
            checkInSource: 'src_001',
            checkInLocation: 'Silom Tower, Floor 25',
            checkOutSource: 'src_001',
            checkOutLocation: 'Silom Tower, Floor 25',
            workingHours: 10.28,
            overtimeHours: 2.28,
            overtimeApproved: false,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'present',
            anomalies: ['unapproved_ot']
        },
        {
            id: 'att_005',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-08',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:30',
            actualCheckOut: '16:45',
            checkInSource: 'src_001',
            checkInLocation: 'Silom Tower, Floor 25',
            checkOutSource: 'src_001',
            checkOutLocation: 'Silom Tower, Floor 25',
            workingHours: 7.25,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: true,
            lateMinutes: 0,
            earlyMinutes: 45,
            status: 'present',
            anomalies: ['early_departure']
        },
        // Employee EMP_DR001 - Flexible shift
        {
            id: 'att_006',
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ชัย',
            date: '2026-01-02',
            shiftId: 'shift_005',
            shiftCode: 'FLX',
            scheduledStart: '07:00',
            scheduledEnd: '19:00',
            actualCheckIn: '09:30',
            actualCheckOut: '18:30',
            checkInSource: 'src_002',
            checkInLocation: 'Mobile GPS - Home',
            checkOutSource: 'src_002',
            checkOutLocation: 'Mobile GPS - Home',
            workingHours: 8.0,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'present',
            anomalies: []
        },
        {
            id: 'att_007',
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ชัย',
            date: '2026-01-03',
            shiftId: 'shift_005',
            shiftCode: 'FLX',
            scheduledStart: '07:00',
            scheduledEnd: '19:00',
            actualCheckIn: null,
            actualCheckOut: null,
            checkInSource: null,
            checkInLocation: null,
            checkOutSource: null,
            checkOutLocation: null,
            workingHours: 0,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'absent',
            anomalies: ['missing_checkin', 'missing_checkout']
        },
        // Employee EMP_DR002 - Regular
        {
            id: 'att_008',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            date: '2026-01-02',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: '08:28',
            actualCheckOut: '17:32',
            checkInSource: 'src_001',
            checkInLocation: 'Silom Tower, Floor 25',
            checkOutSource: 'src_001',
            checkOutLocation: 'Silom Tower, Floor 25',
            workingHours: 8.07,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'present',
            anomalies: []
        },
        {
            id: 'att_009',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            date: '2026-01-03',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: null,
            actualCheckOut: null,
            checkInSource: null,
            checkInLocation: null,
            checkOutSource: null,
            checkOutLocation: null,
            workingHours: 0,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'absent',
            anomalies: ['missing_checkin', 'missing_checkout']
        },
        {
            id: 'att_010',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            date: '2026-01-06',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            scheduledStart: '08:30',
            scheduledEnd: '17:30',
            actualCheckIn: null,
            actualCheckOut: null,
            checkInSource: null,
            checkInLocation: null,
            checkOutSource: null,
            checkOutLocation: null,
            workingHours: 0,
            overtimeHours: 0,
            isLate: false,
            isEarlyDeparture: false,
            lateMinutes: 0,
            earlyMinutes: 0,
            status: 'absent',
            anomalies: ['missing_checkin', 'missing_checkout', 'consecutive_absence']
        }
    ],

    // Import History
    importHistory: [
        {
            id: 'imp_001',
            fileName: 'attendance_jan_2026_week1.csv',
            importDate: '2026-01-08T09:30:00Z',
            importedBy: 'HR Admin',
            importedByEmail: 'hr.admin@centralgroup.com',
            totalRecords: 250,
            successfulRecords: 245,
            failedRecords: 5,
            status: 'completed',
            period: { start: '2026-01-02', end: '2026-01-08' },
            sourceType: 'csv',
            errorLog: [
                { row: 45, error: 'Invalid date format', field: 'date', value: '01-02-26' },
                { row: 78, error: 'Employee not found', field: 'employeeId', value: 'EMP999' },
                { row: 112, error: 'Invalid time format', field: 'checkIn', value: '25:30' },
                { row: 156, error: 'Missing required field', field: 'employeeId', value: null },
                { row: 201, error: 'Duplicate record', field: 'id', value: 'att_001' }
            ]
        },
        {
            id: 'imp_002',
            fileName: 'biometric_export_dec2025.xlsx',
            importDate: '2026-01-02T08:15:00Z',
            importedBy: 'HR Admin',
            importedByEmail: 'hr.admin@centralgroup.com',
            totalRecords: 1200,
            successfulRecords: 1198,
            failedRecords: 2,
            status: 'completed',
            period: { start: '2025-12-01', end: '2025-12-31' },
            sourceType: 'excel',
            errorLog: [
                { row: 567, error: 'Employee on leave', field: 'employeeId', value: 'EMP_LEAVE01' },
                { row: 890, error: 'Invalid shift code', field: 'shiftCode', value: 'UNKNOWN' }
            ]
        },
        {
            id: 'imp_003',
            fileName: 'mobile_attendance_jan.csv',
            importDate: '2026-01-09T14:00:00Z',
            importedBy: 'System Sync',
            importedByEmail: 'system@centralgroup.com',
            totalRecords: 150,
            successfulRecords: 150,
            failedRecords: 0,
            status: 'completed',
            period: { start: '2026-01-02', end: '2026-01-09' },
            sourceType: 'api',
            errorLog: []
        }
    ],

    // Column mapping templates for import
    columnMappingTemplates: [
        {
            id: 'tpl_001',
            name: 'Standard CSV',
            nameTh: 'CSV มาตรฐาน',
            mappings: {
                employeeId: 'Employee ID',
                date: 'Date',
                checkIn: 'Check In',
                checkOut: 'Check Out',
                shiftCode: 'Shift',
                source: 'Source'
            }
        },
        {
            id: 'tpl_002',
            name: 'Biometric System Export',
            nameTh: 'ส่งออกจากระบบสแกนนิ้ว',
            mappings: {
                employeeId: 'EMP_NO',
                date: 'ATT_DATE',
                checkIn: 'TIME_IN',
                checkOut: 'TIME_OUT',
                shiftCode: 'SHIFT_CD',
                source: 'DEVICE_ID'
            }
        },
        {
            id: 'tpl_003',
            name: 'Mobile App Export',
            nameTh: 'ส่งออกจากแอปมือถือ',
            mappings: {
                employeeId: 'user_id',
                date: 'attendance_date',
                checkIn: 'clock_in_time',
                checkOut: 'clock_out_time',
                shiftCode: 'assigned_shift',
                source: 'device_type',
                location: 'gps_location'
            }
        }
    ],

    // Monthly Summary Data
    monthlySummary: {
        '2026-01': {
            employees: [
                {
                    employeeId: 'EMP001',
                    employeeName: 'Chatchai Tangsiri',
                    employeeNameTh: 'ชาติชาย ทังศิริ',
                    department: 'Product Management',
                    departmentTh: 'การจัดการผลิตภัณฑ์',
                    workingDays: 22,
                    presentDays: 20,
                    absentDays: 0,
                    lateDays: 2,
                    earlyDepartureDays: 1,
                    leaveDays: 2,
                    totalWorkingHours: 168.5,
                    totalOvertimeHours: 5.5,
                    anomalyCount: 4,
                    attendanceRate: 95.45
                },
                {
                    employeeId: 'EMP_DR001',
                    employeeName: 'Natthapong Chai',
                    employeeNameTh: 'ณัฐพงษ์ ชัย',
                    department: 'Product Management',
                    departmentTh: 'การจัดการผลิตภัณฑ์',
                    workingDays: 22,
                    presentDays: 19,
                    absentDays: 2,
                    lateDays: 0,
                    earlyDepartureDays: 0,
                    leaveDays: 1,
                    totalWorkingHours: 152.0,
                    totalOvertimeHours: 0,
                    anomalyCount: 2,
                    attendanceRate: 86.36
                },
                {
                    employeeId: 'EMP_DR002',
                    employeeName: 'Siriporn Kaewdee',
                    employeeNameTh: 'ศิริพร แก้วดี',
                    department: 'Product Management',
                    departmentTh: 'การจัดการผลิตภัณฑ์',
                    workingDays: 22,
                    presentDays: 18,
                    absentDays: 3,
                    lateDays: 1,
                    earlyDepartureDays: 0,
                    leaveDays: 1,
                    totalWorkingHours: 144.0,
                    totalOvertimeHours: 2.0,
                    anomalyCount: 5,
                    attendanceRate: 81.82
                }
            ],
            departmentSummary: [
                {
                    department: 'Product Management',
                    departmentTh: 'การจัดการผลิตภัณฑ์',
                    totalEmployees: 15,
                    averageAttendanceRate: 92.5,
                    totalLateDays: 12,
                    totalAbsentDays: 5,
                    totalOvertimeHours: 45.5
                },
                {
                    department: 'Engineering',
                    departmentTh: 'วิศวกรรม',
                    totalEmployees: 25,
                    averageAttendanceRate: 94.2,
                    totalLateDays: 8,
                    totalAbsentDays: 3,
                    totalOvertimeHours: 120.0
                },
                {
                    department: 'Human Resources',
                    departmentTh: 'ทรัพยากรบุคคล',
                    totalEmployees: 10,
                    averageAttendanceRate: 98.5,
                    totalLateDays: 2,
                    totalAbsentDays: 1,
                    totalOvertimeHours: 15.0
                }
            ],
            overallStats: {
                totalEmployees: 150,
                averageAttendanceRate: 93.8,
                totalWorkingDays: 22,
                totalLateDays: 45,
                totalAbsentDays: 18,
                totalOvertimeHours: 350.5,
                anomalyCount: 67
            }
        }
    },

    // Detected Anomalies
    detectedAnomalies: [
        {
            id: 'ano_001',
            type: 'late_arrival',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-03',
            details: {
                scheduledTime: '08:30',
                actualTime: '08:52',
                differenceMinutes: 22
            },
            severity: 'medium',
            status: 'open',
            createdAt: '2026-01-03T08:52:00Z',
            resolvedAt: null,
            resolvedBy: null,
            resolution: null
        },
        {
            id: 'ano_002',
            type: 'missing_checkout',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-06',
            details: {
                checkIn: '08:30',
                expectedCheckout: '17:30'
            },
            severity: 'high',
            status: 'open',
            createdAt: '2026-01-06T18:00:00Z',
            resolvedAt: null,
            resolvedBy: null,
            resolution: null
        },
        {
            id: 'ano_003',
            type: 'unapproved_ot',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-07',
            details: {
                scheduledEnd: '17:30',
                actualEnd: '19:45',
                overtimeHours: 2.28
            },
            severity: 'low',
            status: 'open',
            createdAt: '2026-01-07T19:45:00Z',
            resolvedAt: null,
            resolvedBy: null,
            resolution: null
        },
        {
            id: 'ano_004',
            type: 'consecutive_absence',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            date: '2026-01-06',
            details: {
                startDate: '2026-01-03',
                consecutiveDays: 3,
                leaveApproved: false
            },
            severity: 'critical',
            status: 'open',
            createdAt: '2026-01-06T09:00:00Z',
            resolvedAt: null,
            resolvedBy: null,
            resolution: null
        },
        {
            id: 'ano_005',
            type: 'early_departure',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            date: '2026-01-08',
            details: {
                scheduledEnd: '17:30',
                actualEnd: '16:45',
                differenceMinutes: 45
            },
            severity: 'medium',
            status: 'resolved',
            createdAt: '2026-01-08T16:45:00Z',
            resolvedAt: '2026-01-08T17:00:00Z',
            resolvedBy: 'HR Admin',
            resolution: 'Approved early departure for medical appointment'
        }
    ],

    // Helper methods
    getAttendanceByEmployee(employeeId, startDate, endDate) {
        return this.attendanceRecords.filter(record => {
            const recordDate = new Date(record.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return record.employeeId === employeeId && recordDate >= start && recordDate <= end;
        });
    },

    getAttendanceByDate(date) {
        return this.attendanceRecords.filter(record => record.date === date);
    },

    getAnomaliesByEmployee(employeeId) {
        return this.detectedAnomalies.filter(anomaly => anomaly.employeeId === employeeId);
    },

    getOpenAnomalies() {
        return this.detectedAnomalies.filter(anomaly => anomaly.status === 'open');
    },

    getAnomaliesBySeverity(severity) {
        return this.detectedAnomalies.filter(anomaly => anomaly.severity === severity);
    },

    getMonthlySummary(yearMonth) {
        return this.monthlySummary[yearMonth] || null;
    },

    getImportHistory() {
        return this.importHistory.sort((a, b) => new Date(b.importDate) - new Date(a.importDate));
    },

    getSourceById(sourceId) {
        return this.sources.find(s => s.id === sourceId);
    },

    getAnomalyTypeInfo(typeId) {
        return this.anomalyTypes.find(t => t.id === typeId);
    },

    calculateWorkingHours(checkIn, checkOut, breakMinutes = 60) {
        if (!checkIn || !checkOut) return 0;
        const [inHour, inMin] = checkIn.split(':').map(Number);
        const [outHour, outMin] = checkOut.split(':').map(Number);
        const totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin) - breakMinutes;
        return Math.max(0, totalMinutes / 60);
    },

    detectAnomalies(attendanceRecord, shift, config = this.config) {
        const anomalies = [];

        // Missing check-in
        if (!attendanceRecord.actualCheckIn && attendanceRecord.status !== 'leave') {
            anomalies.push('missing_checkin');
        }

        // Missing check-out
        if (!attendanceRecord.actualCheckOut && attendanceRecord.actualCheckIn && attendanceRecord.status !== 'leave') {
            anomalies.push('missing_checkout');
        }

        // Late arrival (only for non-flexible shifts)
        if (attendanceRecord.actualCheckIn && shift && !shift.isFlexible) {
            const [schedHour, schedMin] = shift.startTime.split(':').map(Number);
            const [actHour, actMin] = attendanceRecord.actualCheckIn.split(':').map(Number);
            const schedMinutes = schedHour * 60 + schedMin;
            const actualMinutes = actHour * 60 + actMin;
            if (actualMinutes - schedMinutes > config.lateThresholdMinutes) {
                anomalies.push('late_arrival');
            }
        }

        // Early departure
        if (attendanceRecord.actualCheckOut && shift) {
            const [schedHour, schedMin] = shift.endTime.split(':').map(Number);
            const [actHour, actMin] = attendanceRecord.actualCheckOut.split(':').map(Number);
            const schedMinutes = schedHour * 60 + schedMin;
            const actualMinutes = actHour * 60 + actMin;
            if (schedMinutes - actualMinutes > config.earlyDepartureThresholdMinutes) {
                anomalies.push('early_departure');
            }
        }

        // Unapproved OT
        if (attendanceRecord.overtimeHours > 0 && !attendanceRecord.overtimeApproved && config.overtimeApprovalRequired) {
            anomalies.push('unapproved_ot');
        }

        return anomalies;
    },

    // Validate import data
    validateImportRow(row, columnMapping) {
        const errors = [];

        // Required fields
        if (!row[columnMapping.employeeId]) {
            errors.push({ field: 'employeeId', error: 'Missing required field' });
        }
        if (!row[columnMapping.date]) {
            errors.push({ field: 'date', error: 'Missing required field' });
        }

        // Date format validation
        const dateValue = row[columnMapping.date];
        if (dateValue && !/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
            errors.push({ field: 'date', error: 'Invalid date format (expected YYYY-MM-DD)' });
        }

        // Time format validation
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (row[columnMapping.checkIn] && !timeRegex.test(row[columnMapping.checkIn])) {
            errors.push({ field: 'checkIn', error: 'Invalid time format (expected HH:MM)' });
        }
        if (row[columnMapping.checkOut] && !timeRegex.test(row[columnMapping.checkOut])) {
            errors.push({ field: 'checkOut', error: 'Invalid time format (expected HH:MM)' });
        }

        return errors;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockAttendanceData;
}

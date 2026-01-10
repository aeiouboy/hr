/**
 * Mock Shift Data
 * Work shift configurations and employee shift assignments
 */

const MockShiftData = {
    // Shift Definitions
    shifts: [
        {
            id: 'shift_001',
            code: 'REG',
            nameEn: 'Regular Day',
            nameTh: 'กะปกติ',
            descriptionEn: 'Standard office hours',
            descriptionTh: 'เวลาทำงานปกติสำนักงาน',
            startTime: '08:30',
            endTime: '17:30',
            breakStartTime: '12:00',
            breakEndTime: '13:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: false,
            isFlexible: false,
            color: '#3B82F6', // blue-500
            status: 'active',
            effectiveDate: '2020-01-01'
        },
        {
            id: 'shift_002',
            code: 'MOR',
            nameEn: 'Morning Shift',
            nameTh: 'กะเช้า',
            descriptionEn: 'Early morning shift for retail operations',
            descriptionTh: 'กะเช้าสำหรับงานค้าปลีก',
            startTime: '06:00',
            endTime: '15:00',
            breakStartTime: '10:00',
            breakEndTime: '11:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: false,
            isFlexible: false,
            color: '#F59E0B', // amber-500
            status: 'active',
            effectiveDate: '2020-01-01'
        },
        {
            id: 'shift_003',
            code: 'EVE',
            nameEn: 'Evening Shift',
            nameTh: 'กะบ่าย',
            descriptionEn: 'Afternoon to evening shift',
            descriptionTh: 'กะบ่ายถึงเย็น',
            startTime: '14:00',
            endTime: '23:00',
            breakStartTime: '18:00',
            breakEndTime: '19:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: false,
            isFlexible: false,
            color: '#8B5CF6', // violet-500
            status: 'active',
            effectiveDate: '2020-01-01'
        },
        {
            id: 'shift_004',
            code: 'NIG',
            nameEn: 'Night Shift',
            nameTh: 'กะกลางคืน',
            descriptionEn: 'Overnight shift with night differential',
            descriptionTh: 'กะกลางคืนได้รับค่าตอบแทนพิเศษ',
            startTime: '22:00',
            endTime: '07:00',
            breakStartTime: '02:00',
            breakEndTime: '03:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: true,
            isFlexible: false,
            color: '#1F2937', // gray-800
            status: 'active',
            effectiveDate: '2020-01-01'
        },
        {
            id: 'shift_005',
            code: 'FLX',
            nameEn: 'Flexible Hours',
            nameTh: 'เวลายืดหยุ่น',
            descriptionEn: 'Flexible working hours with core time 10:00-16:00',
            descriptionTh: 'เวลาทำงานยืดหยุ่น ต้องอยู่ 10:00-16:00',
            startTime: '07:00',
            endTime: '19:00',
            breakStartTime: '12:00',
            breakEndTime: '13:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: false,
            isFlexible: true,
            coreStartTime: '10:00',
            coreEndTime: '16:00',
            color: '#10B981', // emerald-500
            status: 'active',
            effectiveDate: '2022-01-01'
        },
        {
            id: 'shift_006',
            code: 'WFH',
            nameEn: 'Work From Home',
            nameTh: 'ทำงานจากบ้าน',
            descriptionEn: 'Remote work arrangement',
            descriptionTh: 'การทำงานจากที่พัก',
            startTime: '08:30',
            endTime: '17:30',
            breakStartTime: '12:00',
            breakEndTime: '13:00',
            workHours: 8,
            breakMinutes: 60,
            isNightShift: false,
            isFlexible: true,
            color: '#EC4899', // pink-500
            status: 'active',
            effectiveDate: '2020-03-01'
        }
    ],

    // Shift Types for filtering
    shiftTypes: [
        { value: 'all', labelEn: 'All Types', labelTh: 'ทั้งหมด' },
        { value: 'regular', labelEn: 'Regular', labelTh: 'ปกติ' },
        { value: 'night', labelEn: 'Night', labelTh: 'กะกลางคืน' },
        { value: 'flexible', labelEn: 'Flexible', labelTh: 'ยืดหยุ่น' }
    ],

    // Employee Shift Assignments
    shiftAssignments: [
        {
            id: 'sa_001',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            shiftName: 'Regular Day',
            shiftNameTh: 'กะปกติ',
            effectiveStartDate: '2024-01-01',
            effectiveEndDate: null,
            status: 'active',
            createdAt: '2023-12-15T09:00:00Z',
            createdBy: 'HR Admin'
        },
        {
            id: 'sa_002',
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ชัย',
            shiftId: 'shift_005',
            shiftCode: 'FLX',
            shiftName: 'Flexible Hours',
            shiftNameTh: 'เวลายืดหยุ่น',
            effectiveStartDate: '2024-06-01',
            effectiveEndDate: null,
            status: 'active',
            createdAt: '2024-05-20T14:30:00Z',
            createdBy: 'HR Admin'
        },
        {
            id: 'sa_003',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            shiftId: 'shift_001',
            shiftCode: 'REG',
            shiftName: 'Regular Day',
            shiftNameTh: 'กะปกติ',
            effectiveStartDate: '2024-01-01',
            effectiveEndDate: null,
            status: 'active',
            createdAt: '2023-12-15T09:00:00Z',
            createdBy: 'HR Admin'
        },
        {
            id: 'sa_004',
            employeeId: 'EMP_DR003',
            employeeName: 'Worachai Limpakit',
            employeeNameTh: 'วรชัย ลิ้มภักดี',
            shiftId: 'shift_002',
            shiftCode: 'MOR',
            shiftName: 'Morning Shift',
            shiftNameTh: 'กะเช้า',
            effectiveStartDate: '2025-01-01',
            effectiveEndDate: null,
            status: 'active',
            createdAt: '2024-12-01T10:00:00Z',
            createdBy: 'HR Admin'
        }
    ],

    // Monthly Shift Calendar (Sample for January 2026)
    shiftCalendar: {
        year: 2026,
        month: 1,
        employees: [
            {
                employeeId: 'EMP001',
                employeeName: 'Chatchai Tangsiri',
                employeeNameTh: 'ชาติชาย ทังศิริ',
                department: 'Product Management',
                departmentTh: 'การจัดการผลิตภัณฑ์',
                photo: 'https://i.pravatar.cc/150?img=11',
                shifts: {
                    1: { shiftId: 'shift_001', shiftCode: 'REG', isHoliday: true, holidayName: "New Year's Day", holidayNameTh: 'วันขึ้นปีใหม่' },
                    2: { shiftId: 'shift_001', shiftCode: 'REG' },
                    3: { shiftId: 'shift_001', shiftCode: 'REG' },
                    4: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    5: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    6: { shiftId: 'shift_001', shiftCode: 'REG' },
                    7: { shiftId: 'shift_001', shiftCode: 'REG' },
                    8: { shiftId: 'shift_001', shiftCode: 'REG' },
                    9: { shiftId: 'shift_001', shiftCode: 'REG' },
                    10: { shiftId: 'shift_001', shiftCode: 'REG' },
                    11: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    12: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    13: { shiftId: 'shift_001', shiftCode: 'REG' },
                    14: { shiftId: 'shift_001', shiftCode: 'REG' },
                    15: { shiftId: 'shift_001', shiftCode: 'REG' },
                    16: { shiftId: 'shift_001', shiftCode: 'REG' },
                    17: { shiftId: 'shift_001', shiftCode: 'REG', isLeave: true, leaveType: 'annual' },
                    18: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    19: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    20: { shiftId: 'shift_001', shiftCode: 'REG' },
                    21: { shiftId: 'shift_001', shiftCode: 'REG' },
                    22: { shiftId: 'shift_001', shiftCode: 'REG' },
                    23: { shiftId: 'shift_001', shiftCode: 'REG' },
                    24: { shiftId: 'shift_001', shiftCode: 'REG' },
                    25: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    26: { shiftId: 'shift_001', shiftCode: 'REG', isWeekend: true },
                    27: { shiftId: 'shift_001', shiftCode: 'REG' },
                    28: { shiftId: 'shift_001', shiftCode: 'REG' },
                    29: { shiftId: 'shift_001', shiftCode: 'REG' },
                    30: { shiftId: 'shift_001', shiftCode: 'REG' },
                    31: { shiftId: 'shift_001', shiftCode: 'REG' }
                }
            },
            {
                employeeId: 'EMP_DR001',
                employeeName: 'Natthapong Chai',
                employeeNameTh: 'ณัฐพงษ์ ชัย',
                department: 'Product Management',
                departmentTh: 'การจัดการผลิตภัณฑ์',
                photo: 'https://i.pravatar.cc/150?img=14',
                shifts: {
                    1: { shiftId: 'shift_005', shiftCode: 'FLX', isHoliday: true, holidayName: "New Year's Day", holidayNameTh: 'วันขึ้นปีใหม่' },
                    2: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    3: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    4: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    5: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    6: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    7: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    8: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    9: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    10: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    11: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    12: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    13: { shiftId: 'shift_006', shiftCode: 'WFH' },
                    14: { shiftId: 'shift_006', shiftCode: 'WFH' },
                    15: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    16: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    17: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    18: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    19: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    20: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    21: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    22: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    23: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    24: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    25: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    26: { shiftId: 'shift_005', shiftCode: 'FLX', isWeekend: true },
                    27: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    28: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    29: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    30: { shiftId: 'shift_005', shiftCode: 'FLX' },
                    31: { shiftId: 'shift_005', shiftCode: 'FLX' }
                }
            }
        ]
    },

    // Helper methods
    getShiftById(shiftId) {
        return this.shifts.find(s => s.id === shiftId);
    },

    getShiftByCode(code) {
        return this.shifts.find(s => s.code === code);
    },

    getActiveShifts() {
        return this.shifts.filter(s => s.status === 'active');
    },

    getEmployeeShiftAssignments(employeeId) {
        return this.shiftAssignments.filter(sa => sa.employeeId === employeeId);
    },

    getCurrentShiftForEmployee(employeeId) {
        const today = new Date().toISOString().split('T')[0];
        return this.shiftAssignments.find(sa =>
            sa.employeeId === employeeId &&
            sa.status === 'active' &&
            sa.effectiveStartDate <= today &&
            (!sa.effectiveEndDate || sa.effectiveEndDate >= today)
        );
    },

    getShiftCalendarForMonth(year, month) {
        // In real implementation, this would fetch from API
        if (this.shiftCalendar.year === year && this.shiftCalendar.month === month) {
            return this.shiftCalendar;
        }
        return null;
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockShiftData;
}

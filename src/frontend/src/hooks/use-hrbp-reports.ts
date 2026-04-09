'use client';

import { useMemo, useState } from 'react';

export interface AttendanceReport {
 period: string;
 department: string;
 headcount: number;
 avgAttendanceRate: number;
 lateRate: number;
 absentRate: number;
 totalWorkHours: number;
 totalOTHours: number;
}

export interface LeaveReport {
 period: string;
 department: string;
 leaveType: string;
 totalDays: number;
 employeeCount: number;
 utilizationRate: number;
}

export interface OvertimeReport {
 period: string;
 department: string;
 totalHours: number;
 totalAmount: number;
 employeeCount: number;
 avgHoursPerPerson: number;
 typeBreakdown: {
 weekday: number;
 weekend: number;
 holiday: number;
 };
}

const ATTENDANCE_REPORTS: AttendanceReport[] = [
 { period:'2026-01', department:'Retail Operations', headcount: 42, avgAttendanceRate: 96.8, lateRate: 4.9, absentRate: 1.1, totalWorkHours: 7050, totalOTHours: 320 },
 { period:'2026-01', department:'Customer Experience', headcount: 36, avgAttendanceRate: 95.9, lateRate: 5.7, absentRate: 1.4, totalWorkHours: 5990, totalOTHours: 280 },
 { period:'2026-01', department:'Frontline Operations', headcount: 28, avgAttendanceRate: 96.4, lateRate: 4.2, absentRate: 1.0, totalWorkHours: 4700, totalOTHours: 198 },
 { period:'2026-02', department:'Retail Operations', headcount: 43, avgAttendanceRate: 97.1, lateRate: 4.5, absentRate: 0.9, totalWorkHours: 7240, totalOTHours: 334 },
 { period:'2026-02', department:'Customer Experience', headcount: 37, avgAttendanceRate: 96.3, lateRate: 5.4, absentRate: 1.2, totalWorkHours: 6175, totalOTHours: 295 },
 { period:'2026-02', department:'Frontline Operations', headcount: 29, avgAttendanceRate: 96.9, lateRate: 4.0, absentRate: 0.8, totalWorkHours: 4875, totalOTHours: 210 },
 { period:'2026-03', department:'Retail Operations', headcount: 43, avgAttendanceRate: 97.4, lateRate: 4.1, absentRate: 0.8, totalWorkHours: 7390, totalOTHours: 348 },
 { period:'2026-03', department:'Customer Experience', headcount: 37, avgAttendanceRate: 96.7, lateRate: 5.0, absentRate: 1.1, totalWorkHours: 6290, totalOTHours: 308 },
 { period:'2026-03', department:'Frontline Operations', headcount: 30, avgAttendanceRate: 97.2, lateRate: 3.7, absentRate: 0.7, totalWorkHours: 5030, totalOTHours: 226 },
];

const LEAVE_REPORTS: LeaveReport[] = [
 { period:'2026-03', department:'Retail Operations', leaveType:'annual', totalDays: 98, employeeCount: 28, utilizationRate: 61.5 },
 { period:'2026-03', department:'Retail Operations', leaveType:'sick', totalDays: 42, employeeCount: 19, utilizationRate: 26.4 },
 { period:'2026-03', department:'Retail Operations', leaveType:'personal', totalDays: 20, employeeCount: 12, utilizationRate: 12.1 },
 { period:'2026-03', department:'Customer Experience', leaveType:'annual', totalDays: 84, employeeCount: 25, utilizationRate: 58.7 },
 { period:'2026-03', department:'Customer Experience', leaveType:'sick', totalDays: 47, employeeCount: 21, utilizationRate: 32.8 },
 { period:'2026-03', department:'Customer Experience', leaveType:'personal', totalDays: 12, employeeCount: 9, utilizationRate: 8.5 },
 { period:'2026-03', department:'Frontline Operations', leaveType:'annual', totalDays: 64, employeeCount: 18, utilizationRate: 54.3 },
 { period:'2026-03', department:'Frontline Operations', leaveType:'sick', totalDays: 34, employeeCount: 16, utilizationRate: 29.1 },
 { period:'2026-03', department:'Frontline Operations', leaveType:'personal', totalDays: 10, employeeCount: 7, utilizationRate: 8.4 },
];

const OVERTIME_REPORTS: OvertimeReport[] = [
 { period:'2026-01', department:'Retail Operations', totalHours: 320, totalAmount: 168000, employeeCount: 26, avgHoursPerPerson: 12.3, typeBreakdown: { weekday: 196, weekend: 104, holiday: 20 } },
 { period:'2026-01', department:'Customer Experience', totalHours: 280, totalAmount: 145600, employeeCount: 22, avgHoursPerPerson: 12.7, typeBreakdown: { weekday: 172, weekend: 92, holiday: 16 } },
 { period:'2026-01', department:'Frontline Operations', totalHours: 198, totalAmount: 104400, employeeCount: 15, avgHoursPerPerson: 13.2, typeBreakdown: { weekday: 121, weekend: 63, holiday: 14 } },
 { period:'2026-02', department:'Retail Operations', totalHours: 334, totalAmount: 176200, employeeCount: 27, avgHoursPerPerson: 12.4, typeBreakdown: { weekday: 204, weekend: 108, holiday: 22 } },
 { period:'2026-02', department:'Customer Experience', totalHours: 295, totalAmount: 153100, employeeCount: 23, avgHoursPerPerson: 12.8, typeBreakdown: { weekday: 180, weekend: 98, holiday: 17 } },
 { period:'2026-02', department:'Frontline Operations', totalHours: 210, totalAmount: 110600, employeeCount: 16, avgHoursPerPerson: 13.1, typeBreakdown: { weekday: 127, weekend: 68, holiday: 15 } },
 { period:'2026-03', department:'Retail Operations', totalHours: 348, totalAmount: 183900, employeeCount: 27, avgHoursPerPerson: 12.9, typeBreakdown: { weekday: 210, weekend: 114, holiday: 24 } },
 { period:'2026-03', department:'Customer Experience', totalHours: 308, totalAmount: 160300, employeeCount: 24, avgHoursPerPerson: 12.8, typeBreakdown: { weekday: 188, weekend: 101, holiday: 19 } },
 { period:'2026-03', department:'Frontline Operations', totalHours: 226, totalAmount: 118700, employeeCount: 17, avgHoursPerPerson: 13.3, typeBreakdown: { weekday: 136, weekend: 73, holiday: 17 } },
];

export function useHRBPReports() {
 const [departmentFilter, setDepartmentFilter] = useState<string>('all');

 const departments = useMemo(
 () => ['all', ...Array.from(new Set(ATTENDANCE_REPORTS.map((report) => report.department)))],
 []
 );

 const attendanceReports = useMemo(() => {
 if (departmentFilter ==='all') return ATTENDANCE_REPORTS;
 return ATTENDANCE_REPORTS.filter((report) => report.department === departmentFilter);
 }, [departmentFilter]);

 const leaveReports = useMemo(() => {
 if (departmentFilter ==='all') return LEAVE_REPORTS;
 return LEAVE_REPORTS.filter((report) => report.department === departmentFilter);
 }, [departmentFilter]);

 const overtimeReports = useMemo(() => {
 if (departmentFilter ==='all') return OVERTIME_REPORTS;
 return OVERTIME_REPORTS.filter((report) => report.department === departmentFilter);
 }, [departmentFilter]);

 const summaryMetrics = useMemo(() => {
 const attendanceCount = attendanceReports.length || 1;
 const leaveCount = leaveReports.length || 1;
 const overtimeCount = overtimeReports.length || 1;

 const avgAttendanceRate = attendanceReports.reduce((sum, report) => sum + report.avgAttendanceRate, 0) / attendanceCount;
 const avgLateRate = attendanceReports.reduce((sum, report) => sum + report.lateRate, 0) / attendanceCount;
 const leaveUtilization = leaveReports.reduce((sum, report) => sum + report.utilizationRate, 0) / leaveCount;
 const monthlyOTCost = overtimeReports.reduce((sum, report) => sum + report.totalAmount, 0) / overtimeCount;
 const headcount = Array.from(new Set(attendanceReports.map((report) => `${report.period}-${report.department}`))).reduce((sum, key) => {
 const report = attendanceReports.find((item) => `${item.period}-${item.department}` === key);
 return sum + (report?.headcount ?? 0);
 }, 0);

 const uniqueMonths = Array.from(new Set(overtimeReports.map((report) => report.period))).sort();
 const otCostsByMonth = uniqueMonths.map((month) =>
 overtimeReports
 .filter((report) => report.period === month)
 .reduce((sum, report) => sum + report.totalAmount, 0)
 );

 const otCostTrend =
 otCostsByMonth.length >= 2
 ? ((otCostsByMonth[otCostsByMonth.length - 1] - otCostsByMonth[0]) / Math.max(otCostsByMonth[0], 1)) * 100
 : 0;

 return {
 avgAttendanceRate,
 avgLateRate,
 leaveUtilization,
 monthlyOTCost,
 headcount,
 otCostTrend,
 };
 }, [attendanceReports, leaveReports, overtimeReports]);

 return {
 departments,
 departmentFilter,
 setDepartmentFilter,
 attendanceReports,
 leaveReports,
 overtimeReports,
 summaryMetrics,
 };
}

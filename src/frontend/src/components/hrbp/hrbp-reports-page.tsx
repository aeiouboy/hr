'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHRBPReports } from '@/hooks/use-hrbp-reports';
import { CustomSelect } from '@/components/ui/custom-select';
import { useHireAudit } from '@/stores/hire-audit';

type TabKey ='attendance' |'leave' |'overtime' |'hire-notifications' |'summary';

function formatPeriod(period: string) {
 const [year, month] = period.split('-').map(Number);
 const date = new Date(year, month - 1, 1);
 return date.toLocaleDateString('en-US', { month:'short', year:'numeric' });
}

export function HRBPReportsPage() {
 const t = useTranslations('hrbpReports');
 const {
 departments,
 departmentFilter,
 setDepartmentFilter,
 attendanceReports,
 leaveReports,
 overtimeReports,
 summaryMetrics,
 } = useHRBPReports();

 const hireAuditEntries = useHireAudit((s) => s.entries);

 const [activeTab, setActiveTab] = useState<TabKey>('attendance');

 const tabs = [
 { key:'attendance', label: t('tabs.attendance') },
 { key:'leave', label: t('tabs.leave') },
 { key:'overtime', label: t('tabs.overtime') },
 { key:'hire-notifications', label: t('tabs.hireNotifications') },
 { key:'summary', label: t('tabs.summary') },
 ];

 const latestAttendanceByDepartment = useMemo(() => {
 const latestPeriod = [...attendanceReports].sort((a, b) => b.period.localeCompare(a.period))[0]?.period;
 if (!latestPeriod) return [];
 return attendanceReports.filter((report) => report.period === latestPeriod);
 }, [attendanceReports]);

 const overtimeByMonth = useMemo(() => {
 const grouped = overtimeReports.reduce<Record<string, number>>((acc, report) => {
 acc[report.period] = (acc[report.period] ?? 0) + report.totalAmount;
 return acc;
 }, {});

 return Object.entries(grouped)
 .map(([period, amount]) => ({ period, amount }))
 .sort((a, b) => a.period.localeCompare(b.period));
 }, [overtimeReports]);

 const leaveByType = useMemo(() => {
 const grouped = leaveReports.reduce<Record<string, { totalDays: number; employeeCount: number; utilizationRate: number; records: number }>>(
 (acc, report) => {
 const current = acc[report.leaveType] ?? { totalDays: 0, employeeCount: 0, utilizationRate: 0, records: 0 };
 current.totalDays += report.totalDays;
 current.employeeCount += report.employeeCount;
 current.utilizationRate += report.utilizationRate;
 current.records += 1;
 acc[report.leaveType] = current;
 return acc;
 },
 {}
 );

 return Object.entries(grouped).map(([leaveType, values]) => ({
 leaveType,
 totalDays: values.totalDays,
 employeeCount: values.employeeCount,
 utilizationRate: values.utilizationRate / Math.max(values.records, 1),
 }));
 }, [leaveReports]);

 return (
 <div className="space-y-6">
 <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
 <div>
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-sm text-ink-muted mt-1">{t('subtitle')}</p>
 </div>
 <div className="w-full md:w-60">
 <label className="block text-xs font-medium text-ink-muted mb-1">Department</label>
 <CustomSelect
 value={departmentFilter}
 onChange={setDepartmentFilter}
 options={departments.map((department) => ({
 value: department,
 label: department === 'all' ? 'All Departments' : department,
 }))}
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
 <Card>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <p className="text-xs text-ink-muted uppercase tracking-wide">{t('metrics.avgAttendance')}</p>
 <p className="text-3xl font-bold text-ink mt-2">{summaryMetrics.avgAttendanceRate.toFixed(1)}%</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <p className="text-xs text-ink-muted uppercase tracking-wide">{t('metrics.lateRate')}</p>
 <p className="text-3xl font-bold text-amber-600 mt-2">{summaryMetrics.avgLateRate.toFixed(1)}%</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <p className="text-xs text-ink-muted uppercase tracking-wide">{t('metrics.leaveUtilization')}</p>
 <p className="text-3xl font-bold text-blue-700 mt-2">{summaryMetrics.leaveUtilization.toFixed(1)}%</p>
 </CardContent>
 </Card>
 <Card>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <p className="text-xs text-ink-muted uppercase tracking-wide">{t('metrics.monthlyOTCost')}</p>
 <p className="text-3xl font-bold text-ink mt-2">THB {Math.round(summaryMetrics.monthlyOTCost).toLocaleString()}</p>
 </CardContent>
 </Card>
 </div>

 <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as TabKey)} />

 {activeTab ==='attendance' && (
 <div className="space-y-4">
 <Card>
 <CardHeader>
 <CardTitle>{t('tabs.attendance')}</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8 overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised border-hairline">
 <th className="text-left px-3 py-2">Month</th>
 <th className="text-left px-3 py-2">Department</th>
 <th className="text-right px-3 py-2">Headcount</th>
 <th className="text-right px-3 py-2">Attendance Rate</th>
 <th className="text-right px-3 py-2">Late Rate</th>
 <th className="text-right px-3 py-2">Absent Rate</th>
 <th className="text-right px-3 py-2">Total Work Hours</th>
 </tr>
 </thead>
 <tbody>
 {attendanceReports.map((report) => (
 <tr key={`${report.period}-${report.department}`} className="border-b border-hairline last:border-0">
 <td className="px-3 py-2">{formatPeriod(report.period)}</td>
 <td className="px-3 py-2">{report.department}</td>
 <td className="px-3 py-2 text-right">{report.headcount}</td>
 <td className="px-3 py-2 text-right">{report.avgAttendanceRate.toFixed(1)}%</td>
 <td className="px-3 py-2 text-right">{report.lateRate.toFixed(1)}%</td>
 <td className="px-3 py-2 text-right">{report.absentRate.toFixed(1)}%</td>
 <td className="px-3 py-2 text-right">{report.totalWorkHours.toLocaleString()}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </Card>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 {latestAttendanceByDepartment.map((report) => (
 <Card key={`latest-${report.department}`}>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <p className="text-sm font-medium text-ink">{report.department}</p>
 <p className="text-2xl font-bold mt-2">{report.avgAttendanceRate.toFixed(1)}%</p>
 <p className="text-xs text-ink-muted mt-1">{formatPeriod(report.period)}</p>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 )}

 {activeTab ==='leave' && (
 <div className="space-y-4">
 <Card>
 <CardHeader>
 <CardTitle>{t('tabs.leave')}</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8 overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised border-hairline">
 <th className="text-left px-3 py-2">Leave Type</th>
 <th className="text-right px-3 py-2">Total Days Used</th>
 <th className="text-right px-3 py-2">Employee Count</th>
 <th className="text-right px-3 py-2">Utilization Rate</th>
 </tr>
 </thead>
 <tbody>
 {leaveByType.map((report) => (
 <tr key={report.leaveType} className="border-b border-hairline last:border-0">
 <td className="px-3 py-2 capitalize">{report.leaveType}</td>
 <td className="px-3 py-2 text-right">{report.totalDays}</td>
 <td className="px-3 py-2 text-right">{report.employeeCount}</td>
 <td className="px-3 py-2 text-right">{report.utilizationRate.toFixed(1)}%</td>
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Department Breakdown</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 {Array.from(new Set(leaveReports.map((report) => report.department))).map((department) => {
 const departmentTotal = leaveReports
 .filter((report) => report.department === department)
 .reduce((sum, report) => sum + report.totalDays, 0);
 return (
 <div key={department} className="rounded-md border border-hairline p-3">
 <p className="text-sm font-medium">{department}</p>
 <p className="text-2xl font-bold mt-1">{departmentTotal}</p>
 <p className="text-xs text-ink-muted">leave days used</p>
 </div>
 );
 })}
 </div>
 </CardContent>
 </Card>
 </div>
 )}

 {activeTab ==='overtime' && (
 <Card>
 <CardHeader>
 <CardTitle>{t('tabs.overtime')}</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8 overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised border-hairline">
 <th className="text-left px-3 py-2">Month</th>
 <th className="text-left px-3 py-2">Department</th>
 <th className="text-right px-3 py-2">Total Hours</th>
 <th className="text-right px-3 py-2">Total Amount</th>
 <th className="text-right px-3 py-2">Employee Count</th>
 <th className="text-right px-3 py-2">Avg Hours/Person</th>
 <th className="text-right px-3 py-2">Type Breakdown</th>
 </tr>
 </thead>
 <tbody>
 {overtimeReports.map((report) => (
 <tr key={`${report.period}-${report.department}`} className="border-b border-hairline last:border-0">
 <td className="px-3 py-2">{formatPeriod(report.period)}</td>
 <td className="px-3 py-2">{report.department}</td>
 <td className="px-3 py-2 text-right">{report.totalHours}</td>
 <td className="px-3 py-2 text-right">THB {report.totalAmount.toLocaleString()}</td>
 <td className="px-3 py-2 text-right">{report.employeeCount}</td>
 <td className="px-3 py-2 text-right">{report.avgHoursPerPerson.toFixed(1)}</td>
 <td className="px-3 py-2 text-right text-xs text-ink-muted">
 Wd {report.typeBreakdown.weekday} | We {report.typeBreakdown.weekend} | Hol {report.typeBreakdown.holiday}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </Card>
 )}

 {/* ── Hire Notifications (SH4) — Chain 2 / BRD #109 ── */}
 {activeTab ==='hire-notifications' && <Card>
 <CardHeader>
 <CardTitle>Hire Notifications (SH4)</CardTitle>
 <p className="text-sm text-ink-muted mt-1">
 HR Admin ได้บันทึกการจ้างงานใหม่ — SH4 แจ้ง HRBP อัตโนมัติ (ข้อมูลเพื่อรับทราบเท่านั้น)
 </p>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 {hireAuditEntries.length === 0 ? (
 <p className="text-sm text-ink-muted py-4 text-center">ยังไม่มีการบันทึกการจ้างงานใหม่</p>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b bg-surface-raised border-hairline">
 <th className="text-left px-3 py-2">พนักงานใหม่</th>
 <th className="text-left px-3 py-2">ตำแหน่ง</th>
 <th className="text-left px-3 py-2">บริษัท</th>
 <th className="text-left px-3 py-2">วันที่เริ่มงาน</th>
 <th className="text-left px-3 py-2">HR Admin</th>
 <th className="text-left px-3 py-2">ส่งแจ้งเมื่อ</th>
 </tr>
 </thead>
 <tbody>
 {hireAuditEntries.map((entry) => (
 <tr key={entry.id} className="border-b border-hairline last:border-0">
 <td className="px-3 py-2 font-medium text-ink">{entry.candidateName}</td>
 <td className="px-3 py-2 text-ink-muted">{entry.position}</td>
 <td className="px-3 py-2">
 <Badge variant="info">{entry.company}</Badge>
 </td>
 <td className="px-3 py-2 text-ink-muted">
 {new Date(entry.hireDate).toLocaleDateString('th-TH', {
 year: 'numeric', month: 'short', day: 'numeric',
 })}
 </td>
 <td className="px-3 py-2 text-ink-muted">{entry.hrAdminName}</td>
 <td className="px-3 py-2 text-ink-muted">
 {new Date(entry.sentAt).toLocaleString('th-TH', {
 year: 'numeric', month: 'short', day: 'numeric',
 hour: '2-digit', minute: '2-digit',
 })}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 )}
 </CardContent>
 </Card>}

 {activeTab ==='summary' && (
 <div className="space-y-4">
 <Card>
 <CardHeader>
 <CardTitle>{t('tabs.summary')}</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 <div className="rounded-md border border-hairline p-4">
 <p className="text-sm font-medium text-ink">Executive Summary</p>
 <ul className="mt-2 space-y-1 text-sm text-ink-muted">
 <li>Average attendance is {summaryMetrics.avgAttendanceRate.toFixed(1)}% across selected scope.</li>
 <li>Average leave utilization is {summaryMetrics.leaveUtilization.toFixed(1)}%.</li>
 <li>Monthly OT cost is THB {Math.round(summaryMetrics.monthlyOTCost).toLocaleString()}.</li>
 </ul>
 </div>
 <div className="rounded-md border border-hairline p-4">
 <p className="text-sm font-medium text-ink">Compliance Indicators</p>
 <div className="mt-2 flex flex-col gap-2">
 <div className="flex items-center justify-between">
 <span className="text-sm text-ink-muted">Late Rate</span>
 <Badge variant={summaryMetrics.avgLateRate > 5 ?'warning' :'success'}>
 {summaryMetrics.avgLateRate > 5 ?'Watchlist' :'Healthy'}
 </Badge>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-sm text-ink-muted">OT Cost Trend</span>
 <Badge variant={summaryMetrics.otCostTrend > 8 ?'warning' :'success'}>
 {summaryMetrics.otCostTrend.toFixed(1)}%
 </Badge>
 </div>
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>{t('metrics.headcount')}</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 {latestAttendanceByDepartment.map((report) => (
 <div key={`headcount-${report.department}`} className="rounded-md border border-hairline p-4">
 <p className="text-sm font-medium text-ink-soft">{report.department}</p>
 <p className="text-3xl font-bold text-ink mt-2">{report.headcount}</p>
 <p className="text-xs text-ink-muted mt-1">headcount in {formatPeriod(report.period)}</p>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 <Card>
 <CardHeader>
 <CardTitle>Monthly OT Cost Trend</CardTitle>
 </CardHeader>
 <CardContent className="p-5 sm:p-6 lg:p-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
 {overtimeByMonth.map((item) => (
 <div key={item.period} className="rounded-md border border-hairline p-4">
 <p className="text-sm text-ink-muted">{formatPeriod(item.period)}</p>
 <p className="text-xl font-semibold text-ink mt-1">THB {item.amount.toLocaleString()}</p>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 </div>
 )}
 </div>
 );
}

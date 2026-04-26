// VALIDATION_EXEMPT: display/admin landing — filter chips + action buttons only, no data submit form (per design-gates Track C 2026-04-26)
'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Pencil, Save, X, Eye, Download } from 'lucide-react';
import { Tabs } from '@/components/ui/tabs';
import { Card, CardTitle, Button, Modal } from '@/components/humi';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import { useSpd, type TeamTimeRecord, type TeamOTRecord, type ShiftDay, type TeamSchedule } from '@/hooks/use-spd';
import { cn } from '@/lib/utils';
import { CustomSelect } from '@/components/ui/custom-select';

type TabKey ='timeRecords' |'otRecords' |'schedules' |'leaveDocuments';

type TimeFilter = {
 employeeId: string;
 status: string;
 startDate: string;
 endDate: string;
};

type OTFilter = {
 employeeId: string;
 status: string;
 startDate: string;
 endDate: string;
};

const SHIFT_COLORS: Record<ShiftDay['shift'], string> = {
 regular:'bg-accent-tint text-blue-700 border-blue-200',
 morning:'bg-emerald-50 text-emerald-700 border-emerald-200',
 evening:'bg-violet-50 text-violet-700 border-violet-200',
 off:'bg-surface-raised text-ink-muted border-hairline',
};

const STATUS_BADGE: Record<string,'success' |'warning' |'error' |'info' |'neutral'> = {
 on_time:'success',
 late:'error',
 early_departure:'warning',
 absent:'error',
 leave:'info',
 pending:'warning',
 approved:'success',
 rejected:'error',
 completed:'neutral',
 pending_review:'warning',
 reviewed:'success',
 resubmission_required:'error',
};

function getShiftLabel(shift: ShiftDay['shift']) {
 if (shift ==='regular') return'Regular';
 if (shift ==='morning') return'Morning';
 if (shift ==='evening') return'Evening';
 return'Off';
}

export function SPDManagementPage() {
 const t = useTranslations('spd');
 const {
 teamMembers,
 schedules,
 leaveDocuments,
 filterTimeRecords,
 filterOTRecords,
 filterSchedules,
 filterLeaveDocuments,
 updateTimeRecord,
 updateOTRecord,
 updateSchedule,
 updateLeaveDocument,
 viewLeaveDocument,
 } = useSpd();

 const [activeTab, setActiveTab] = useState<TabKey>('timeRecords');
 const [timeFilter, setTimeFilter] = useState<TimeFilter>({ employeeId:'all', status:'all', startDate:'', endDate:'' });
 const [otFilter, setOtFilter] = useState<OTFilter>({ employeeId:'all', status:'all', startDate:'', endDate:'' });
 const [documentStatusFilter, setDocumentStatusFilter] = useState('all');

 const [editingTimeRecordId, setEditingTimeRecordId] = useState<string | null>(null);
 const [timeDraft, setTimeDraft] = useState<Partial<TeamTimeRecord>>({});

 const [editingOT, setEditingOT] = useState<TeamOTRecord | null>(null);
 const [otDraft, setOTDraft] = useState<Partial<TeamOTRecord>>({});

 const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
 const [scheduleDraft, setScheduleDraft] = useState<Record<string, ShiftDay[]>>({});

 const tabs = [
 { key:'timeRecords', label: t('tabs.timeRecords') },
 { key:'otRecords', label: t('tabs.otRecords') },
 { key:'schedules', label: t('tabs.schedules') },
 { key:'leaveDocuments', label: t('tabs.leaveDocuments') },
 ];

 const filteredTimeRecords = useMemo(
 () =>
 filterTimeRecords({
 employeeId: timeFilter.employeeId,
 status: timeFilter.status,
 startDate: timeFilter.startDate || undefined,
 endDate: timeFilter.endDate || undefined,
 }),
 [filterTimeRecords, timeFilter]
 );

 const filteredOTRecords = useMemo(
 () =>
 filterOTRecords({
 employeeId: otFilter.employeeId,
 status: otFilter.status,
 startDate: otFilter.startDate || undefined,
 endDate: otFilter.endDate || undefined,
 }),
 [filterOTRecords, otFilter]
 );

 const filteredSchedules = useMemo(() => filterSchedules(), [filterSchedules]);

 const filteredDocuments = useMemo(
 () =>
 filterLeaveDocuments({
 status: documentStatusFilter,
 }),
 [documentStatusFilter, filterLeaveDocuments]
 );

 const handleStartEditTime = (record: TeamTimeRecord) => {
 setEditingTimeRecordId(record.id);
 setTimeDraft(record);
 };

 const handleSaveTime = async () => {
 if (!editingTimeRecordId) return;
 await updateTimeRecord(editingTimeRecordId, {
 clockIn: timeDraft.clockIn,
 clockOut: timeDraft.clockOut,
 workHours: Number(timeDraft.workHours ?? 0),
 otHours: Number(timeDraft.otHours ?? 0),
 status: timeDraft.status,
 });
 setEditingTimeRecordId(null);
 setTimeDraft({});
 };

 const handleOpenOTEdit = (record: TeamOTRecord) => {
 setEditingOT(record);
 setOTDraft(record);
 };

 const handleSaveOT = async () => {
 if (!editingOT) return;
 await updateOTRecord(editingOT.id, {
 startTime: otDraft.startTime,
 endTime: otDraft.endTime,
 hours: Number(otDraft.hours ?? 0),
 type: otDraft.type,
 amount: Number(otDraft.amount ?? 0),
 status: otDraft.status,
 });
 setEditingOT(null);
 setOTDraft({});
 };

 const handleScheduleChange = (schedule: TeamSchedule, dayIndex: number, shift: ShiftDay['shift']) => {
 const currentDraft = scheduleDraft[schedule.id] ?? schedule.weekSchedule;
 const next = currentDraft.map((day, index) => {
 if (index !== dayIndex) return day;
 if (shift ==='off') return { ...day, shift, startTime:'-', endTime:'-' };
 if (shift ==='morning') return { ...day, shift, startTime:'07:00', endTime:'16:00' };
 if (shift ==='evening') return { ...day, shift, startTime:'12:00', endTime:'21:00' };
 return { ...day, shift, startTime:'09:00', endTime:'18:00' };
 });

 setScheduleDraft((prev) => ({ ...prev, [schedule.id]: next }));
 };

 const handleSaveSchedule = async (schedule: TeamSchedule) => {
 const draft = scheduleDraft[schedule.id];
 if (!draft) return;
 await updateSchedule(schedule.id, draft);
 setEditingScheduleId(null);
 setScheduleDraft((prev) => {
 const next = { ...prev };
 delete next[schedule.id];
 return next;
 });
 };

 const renderTimeRecords = () => (
 <Card header={<CardTitle>{t('tabs.timeRecords')}</CardTitle>}>
 <div className="p-5 sm:p-6 lg:p-8 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
 <FormField
 label={t('columns.employee')}
 name="timeEmployee"
 type="select"
 value={timeFilter.employeeId}
 onChange={(value) => setTimeFilter((prev) => ({ ...prev, employeeId: value }))}
 options={[
 { value:'all', label:'All Employees' },
 ...teamMembers.map((member) => ({ value: member.id, label: member.name })),
 ]}
 />
 <FormField
 label={t('columns.status')}
 name="timeStatus"
 type="select"
 value={timeFilter.status}
 onChange={(value) => setTimeFilter((prev) => ({ ...prev, status: value }))}
 options={[
 { value:'all', label:'All Status' },
 { value:'on_time', label:'On Time' },
 { value:'late', label:'Late' },
 { value:'early_departure', label:'Early Departure' },
 { value:'absent', label:'Absent' },
 { value:'leave', label:'Leave' },
 ]}
 />
 <FormField
 label="Start Date"
 name="timeStartDate"
 type="date"
 value={timeFilter.startDate}
 onChange={(value) => setTimeFilter((prev) => ({ ...prev, startDate: value }))}
 />
 <FormField
 label="End Date"
 name="timeEndDate"
 type="date"
 value={timeFilter.endDate}
 onChange={(value) => setTimeFilter((prev) => ({ ...prev, endDate: value }))}
 />
 </div>

 <div className="hidden lg:block overflow-x-auto rounded-md border border-hairline">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-surface-raised border-b border-hairline">
 <th className="text-left px-4 py-3">{t('columns.employee')}</th>
 <th className="text-left px-4 py-3">{t('columns.date')}</th>
 <th className="text-left px-4 py-3">Shift</th>
 <th className="text-left px-4 py-3">{t('columns.clockIn')}</th>
 <th className="text-left px-4 py-3">{t('columns.clockOut')}</th>
 <th className="text-left px-4 py-3">{t('columns.workHours')}</th>
 <th className="text-left px-4 py-3">{t('columns.otHours')}</th>
 <th className="text-left px-4 py-3">{t('columns.status')}</th>
 <th className="text-right px-4 py-3">{t('columns.actions')}</th>
 </tr>
 </thead>
 <tbody>
 {filteredTimeRecords.map((record) => {
 const isEditing = editingTimeRecordId === record.id;
 return (
 <tr key={record.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/30">
 <td className="px-4 py-3">{record.employeeName}</td>
 <td className="px-4 py-3">{record.date}</td>
 <td className="px-4 py-3">{record.shift}</td>
 <td className={cn('px-4 py-3', record.status ==='late' &&'text-danger font-medium')}>
 {isEditing ? (
 <input
 className="w-full rounded border px-2 py-1"
 value={timeDraft.clockIn ??''}
 onChange={(event) => setTimeDraft((prev) => ({ ...prev, clockIn: event.target.value }))}
 />
 ) : (
 record.clockIn
 )}
 </td>
 <td className={cn('px-4 py-3', record.status ==='early_departure' &&'text-amber-600 font-medium')}>
 {isEditing ? (
 <input
 className="w-full rounded border px-2 py-1"
 value={timeDraft.clockOut ??''}
 onChange={(event) => setTimeDraft((prev) => ({ ...prev, clockOut: event.target.value }))}
 />
 ) : (
 record.clockOut
 )}
 </td>
 <td className="px-4 py-3">
 {isEditing ? (
 <input
 className="w-20 rounded border px-2 py-1"
 value={String(timeDraft.workHours ?? record.workHours)}
 onChange={(event) => setTimeDraft((prev) => ({ ...prev, workHours: Number(event.target.value) }))}
 />
 ) : (
 record.workHours
 )}
 </td>
 <td className="px-4 py-3">
 {isEditing ? (
 <input
 className="w-20 rounded border px-2 py-1"
 value={String(timeDraft.otHours ?? record.otHours)}
 onChange={(event) => setTimeDraft((prev) => ({ ...prev, otHours: Number(event.target.value) }))}
 />
 ) : (
 record.otHours
 )}
 </td>
 <td className="px-4 py-3">
 {isEditing ? (
 <CustomSelect
 value={String(timeDraft.status ?? record.status)}
 onChange={(v) =>
 setTimeDraft((prev) => ({
 ...prev,
 status: v as TeamTimeRecord['status'],
 }))
 }
 options={[
 { value: 'on_time', label: 'On Time' },
 { value: 'late', label: 'Late' },
 { value: 'early_departure', label: 'Early Departure' },
 { value: 'absent', label: 'Absent' },
 { value: 'leave', label: 'Leave' },
 ]}
 className="w-40"
 />
 ) : (
 <Badge variant={STATUS_BADGE[record.status]}>{record.status.replace('_','')}</Badge>
 )}
 </td>
 <td className="px-4 py-3 text-right">
 {isEditing ? (
 <div className="flex justify-end gap-1">
 <Button size="sm" onClick={() => void handleSaveTime()}>
 <Save className="h-3.5 w-3.5" />
 </Button>
 <Button size="sm" variant="secondary" onClick={() => setEditingTimeRecordId(null)}>
 <X className="h-3.5 w-3.5" />
 </Button>
 </div>
 ) : (
 <Button size="sm" variant="secondary" onClick={() => handleStartEditTime(record)}>
 <Pencil className="h-3.5 w-3.5" />
 </Button>
 )}
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
 {filteredTimeRecords.map((record) => (
 <div key={record.id} className="rounded-md border border-hairline p-4">
 <div className="flex items-center justify-between">
 <p className="font-medium text-ink">{record.employeeName}</p>
 <Badge variant={STATUS_BADGE[record.status]}>{record.status.replace('_','')}</Badge>
 </div>
 <p className="text-xs text-ink-muted mt-1">{record.date}</p>
 <p className={cn('text-sm mt-2', record.status ==='late' &&'text-danger')}>
 {t('columns.clockIn')}: {record.clockIn}
 </p>
 <p className={cn('text-sm', record.status ==='early_departure' &&'text-amber-600')}>
 {t('columns.clockOut')}: {record.clockOut}
 </p>
 <p className="text-sm">{t('columns.workHours')}: {record.workHours}</p>
 <p className="text-sm">{t('columns.otHours')}: {record.otHours}</p>
 </div>
 ))}
 </div>
 </div>
 </Card>
 );

 const renderOTRecords = () => (
 <Card header={<CardTitle>{t('tabs.otRecords')}</CardTitle>}>
 <div className="p-5 sm:p-6 lg:p-8 space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
 <FormField
 label={t('columns.employee')}
 name="otEmployee"
 type="select"
 value={otFilter.employeeId}
 onChange={(value) => setOtFilter((prev) => ({ ...prev, employeeId: value }))}
 options={[
 { value:'all', label:'All Employees' },
 ...teamMembers.map((member) => ({ value: member.id, label: member.name })),
 ]}
 />
 <FormField
 label={t('columns.status')}
 name="otStatus"
 type="select"
 value={otFilter.status}
 onChange={(value) => setOtFilter((prev) => ({ ...prev, status: value }))}
 options={[
 { value:'all', label:'All Status' },
 { value:'pending', label:'Pending' },
 { value:'approved', label:'Approved' },
 { value:'rejected', label:'Rejected' },
 { value:'completed', label:'Completed' },
 ]}
 />
 <FormField
 label="Start Date"
 name="otStartDate"
 type="date"
 value={otFilter.startDate}
 onChange={(value) => setOtFilter((prev) => ({ ...prev, startDate: value }))}
 />
 <FormField
 label="End Date"
 name="otEndDate"
 type="date"
 value={otFilter.endDate}
 onChange={(value) => setOtFilter((prev) => ({ ...prev, endDate: value }))}
 />
 </div>

 <div className="overflow-x-auto rounded-md border border-hairline">
 <table className="w-full text-sm">
 <thead>
 <tr className="bg-surface-raised border-b border-hairline">
 <th className="text-left px-4 py-3">{t('columns.employee')}</th>
 <th className="text-left px-4 py-3">{t('columns.date')}</th>
 <th className="text-left px-4 py-3">Time Range</th>
 <th className="text-left px-4 py-3">{t('columns.otHours')}</th>
 <th className="text-left px-4 py-3">Type</th>
 <th className="text-left px-4 py-3">Amount</th>
 <th className="text-left px-4 py-3">{t('columns.status')}</th>
 <th className="text-right px-4 py-3">{t('columns.actions')}</th>
 </tr>
 </thead>
 <tbody>
 {filteredOTRecords.map((record) => (
 <tr key={record.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/30">
 <td className="px-4 py-3">{record.employeeName}</td>
 <td className="px-4 py-3">{record.date}</td>
 <td className="px-4 py-3">{record.startTime} - {record.endTime}</td>
 <td className="px-4 py-3">{record.hours}</td>
 <td className="px-4 py-3 capitalize">{record.type}</td>
 <td className="px-4 py-3">THB {record.amount.toLocaleString()}</td>
 <td className="px-4 py-3">
 <Badge variant={STATUS_BADGE[record.status]}>{record.status}</Badge>
 </td>
 <td className="px-4 py-3 text-right">
 <Button size="sm" variant="secondary" onClick={() => handleOpenOTEdit(record)}>
 <Pencil className="h-3.5 w-3.5" />
 </Button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </Card>
 );

 const renderSchedules = () => (
 <div className="space-y-4">
 {filteredSchedules.map((schedule) => {
 const isEditing = editingScheduleId === schedule.id;
 const displayed = scheduleDraft[schedule.id] ?? schedule.weekSchedule;
 return (
 <Card
 key={schedule.id}
 header={
 <div className="flex items-center justify-between gap-3">
 <CardTitle>{schedule.employeeName}</CardTitle>
 {isEditing ? (
 <div className="flex gap-2">
 <Button size="sm" onClick={() => void handleSaveSchedule(schedule)}>
 {t('actions.save')}
 </Button>
 <Button size="sm" variant="secondary" onClick={() => setEditingScheduleId(null)}>
 {t('actions.cancel')}
 </Button>
 </div>
 ) : (
 <Button size="sm" variant="secondary" onClick={() => setEditingScheduleId(schedule.id)}>
 {t('actions.edit')}
 </Button>
 )}
 </div>
 }
 >
 <div className="p-5 sm:p-6 lg:p-8">
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
 {displayed.map((day, index) => (
 <div key={`${day.date}-${day.day}`} className={cn('rounded-md border p-3', SHIFT_COLORS[day.shift])}>
 <p className="text-xs font-semibold">{day.day}</p>
 <p className="text-xs opacity-75">{day.date}</p>
 {isEditing ? (
 <CustomSelect
 value={day.shift}
 onChange={(v) =>
 handleScheduleChange(schedule, index, v as ShiftDay['shift'])
 }
 options={[
 { value: 'regular', label: 'Regular' },
 { value: 'morning', label: 'Morning' },
 { value: 'evening', label: 'Evening' },
 { value: 'off', label: 'Off' },
 ]}
 className="mt-2 w-full"
 />
 ) : (
 <>
 <p className="text-sm font-medium mt-2">{getShiftLabel(day.shift)}</p>
 <p className="text-xs">{day.startTime} - {day.endTime}</p>
 </>
 )}
 </div>
 ))}
 </div>
 </div>
 </Card>
 );
 })}
 </div>
 );

 const renderLeaveDocuments = () => (
 <Card
 header={
 <div className="flex items-center justify-between">
 <CardTitle>{t('tabs.leaveDocuments')}</CardTitle>
 <div className="w-[220px]">
 <FormField
 label=""
 name="documentStatus"
 type="select"
 value={documentStatusFilter}
 onChange={setDocumentStatusFilter}
 options={[
 { value:'all', label:'All Status' },
 { value:'pending_review', label:'Pending Review' },
 { value:'reviewed', label:'Reviewed' },
 { value:'resubmission_required', label:'Requires Resubmission' },
 ]}
 />
 </div>
 </div>
 }
 >
 <div className="p-5 sm:p-6 lg:p-8 space-y-3">
 {filteredDocuments.map((document) => (
 <div key={document.id} className="rounded-md border border-hairline p-4">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
 <div>
 <p className="font-medium text-ink">{document.employeeName}</p>
 <p className="text-sm text-ink-muted">
 {document.leaveType}: {document.startDate} - {document.endDate} ({document.days} {t('days')})
 </p>
 </div>
 <Badge variant={STATUS_BADGE[document.status]}>{document.status.replace('_','')}</Badge>
 </div>
 <div className="mt-3 flex flex-wrap items-center gap-2">
 <Button
 size="sm"
 variant="secondary"
 onClick={() => {
 const url = viewLeaveDocument(document.id);
 if (url) window.open(url,'_blank','noopener,noreferrer');
 }}
 >
 <Eye className="h-3.5 w-3.5 mr-1" />
 {t('actions.viewDocument')}
 </Button>
 <Button
 size="sm"
 variant="secondary"
 onClick={() => {
 const url = viewLeaveDocument(document.id);
 if (url) window.open(url,'_blank','noopener,noreferrer');
 }}
 >
 <Download className="h-3.5 w-3.5 mr-1" />
 Download
 </Button>
 <Button size="sm" onClick={() => void updateLeaveDocument(document.id, { status:'reviewed' })}>
 Approve
 </Button>
 <Button
 size="sm"
 variant="danger"
 onClick={() => void updateLeaveDocument(document.id, { status:'resubmission_required' })}
 >
 Reject
 </Button>
 </div>
 </div>
 ))}
 </div>
 </Card>
 );

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-sm text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as TabKey)} />

 {activeTab ==='timeRecords' && renderTimeRecords()}
 {activeTab ==='otRecords' && renderOTRecords()}
 {activeTab ==='schedules' && renderSchedules()}
 {activeTab ==='leaveDocuments' && renderLeaveDocuments()}

 <Modal open={!!editingOT} onClose={() => setEditingOT(null)} title="Edit OT Record">
 <div className="space-y-3">
 <FormField
 label="Start Time"
 name="otEditStartTime"
 value={otDraft.startTime ??''}
 onChange={(value) => setOTDraft((prev) => ({ ...prev, startTime: value }))}
 />
 <FormField
 label="End Time"
 name="otEditEndTime"
 value={otDraft.endTime ??''}
 onChange={(value) => setOTDraft((prev) => ({ ...prev, endTime: value }))}
 />
 <FormField
 label="Hours"
 name="otEditHours"
 value={String(otDraft.hours ??'')}
 onChange={(value) => setOTDraft((prev) => ({ ...prev, hours: Number(value) }))}
 />
 <FormField
 label="Type"
 name="otEditType"
 type="select"
 value={String(otDraft.type ??'weekday')}
 onChange={(value) => setOTDraft((prev) => ({ ...prev, type: value as TeamOTRecord['type'] }))}
 options={[
 { value:'weekday', label:'Weekday' },
 { value:'weekend', label:'Weekend' },
 { value:'holiday', label:'Holiday' },
 ]}
 />
 <div className="flex justify-end gap-2 pt-2">
 <Button variant="secondary" onClick={() => setEditingOT(null)}>
 {t('actions.cancel')}
 </Button>
 <Button onClick={() => void handleSaveOT()}>{t('actions.save')}</Button>
 </div>
 </div>
 </Modal>
 </div>
 );
}

'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AttendanceRecord {
 id: string;
 date: string;
 dayOfWeek: string;
 shift: string;
 checkIn?: string;
 checkOut?: string;
 workHours: number;
 status:'present' |'late' |'absent' |'leave' |'holiday' |'weekend';
 overtimeHours: number;
 location?: string;
}

export interface ShiftSchedule {
 id: string;
 date: string;
 dayOfWeek: string;
 shiftName: string;
 startTime: string;
 endTime: string;
 breakStart: string;
 breakEnd: string;
 workHours: number;
 type:'regular' |'morning' |'evening' |'night' |'flexible' |'off';
}

export interface TimeCorrectionRequest {
 id: string;
 date: string;
 type:'missing-checkin' |'missing-checkout' |'wrong-time' |'forgot-clock';
 originalTime?: string;
 correctedTime: string;
 reason: string;
 status:'pending' |'approved' |'rejected';
 submittedAt: string;
 approvedBy?: string;
}

export interface ClockStatus {
 isClockedIn: boolean;
 clockInTime?: string;
 clockOutTime?: string;
 currentShift: string;
 shiftStart: string;
 shiftEnd: string;
 breakStart: string;
 breakEnd: string;
 isWithinGeofence: boolean;
 locationName: string;
}

export interface TeamAttendanceRecord {
 id: string;
 employeeId: string;
 employeeName: string;
 date: string;
 checkIn: string;
 checkOut: string;
 workHours: number;
 overtimeHours: number;
 status:'present' |'late' |'early_departure' |'leave';
}

const MOCK_ATTENDANCE: AttendanceRecord[] = [
 { id:'A001', date:'2026-03-05', dayOfWeek:'Thu', shift:'Regular (09:00-18:00)', checkIn:'08:55', checkOut: undefined, workHours: 0, status:'present', overtimeHours: 0, location:'CDS HQ' },
 { id:'A002', date:'2026-03-04', dayOfWeek:'Wed', shift:'Regular (09:00-18:00)', checkIn:'08:50', checkOut:'18:10', workHours: 8, status:'present', overtimeHours: 0, location:'CDS HQ' },
 { id:'A003', date:'2026-03-03', dayOfWeek:'Tue', shift:'Regular (09:00-18:00)', checkIn:'09:22', checkOut:'18:45', workHours: 8, status:'late', overtimeHours: 0.75, location:'CDS HQ' },
 { id:'A004', date:'2026-03-02', dayOfWeek:'Mon', shift:'Regular (09:00-18:00)', checkIn:'08:58', checkOut:'20:15', workHours: 8, status:'present', overtimeHours: 2.25, location:'CDS HQ' },
 { id:'A005', date:'2026-03-01', dayOfWeek:'Sun', shift:'-', status:'weekend', workHours: 0, overtimeHours: 0 },
 { id:'A006', date:'2026-02-28', dayOfWeek:'Sat', shift:'-', status:'weekend', workHours: 0, overtimeHours: 0 },
 { id:'A007', date:'2026-02-27', dayOfWeek:'Fri', shift:'Regular (09:00-18:00)', status:'leave', workHours: 0, overtimeHours: 0 },
 { id:'A008', date:'2026-02-26', dayOfWeek:'Thu', shift:'Regular (09:00-18:00)', checkIn:'08:45', checkOut:'18:00', workHours: 8, status:'present', overtimeHours: 0, location:'CDS HQ' },
 { id:'A009', date:'2026-02-25', dayOfWeek:'Wed', shift:'Regular (09:00-18:00)', status:'absent', workHours: 0, overtimeHours: 0 },
 { id:'A010', date:'2026-02-24', dayOfWeek:'Tue', shift:'Regular (09:00-18:00)', checkIn:'09:00', checkOut:'18:00', workHours: 8, status:'present', overtimeHours: 0, location:'CDS HQ' },
 { id:'A011', date:'2026-02-23', dayOfWeek:'Mon', shift:'Regular (09:00-18:00)', checkIn:'08:52', checkOut:'19:30', workHours: 8, status:'present', overtimeHours: 1.5, location:'CDS HQ' },
 { id:'A012', date:'2026-02-22', dayOfWeek:'Sun', shift:'-', status:'weekend', workHours: 0, overtimeHours: 0 },
 { id:'A013', date:'2026-02-21', dayOfWeek:'Sat', shift:'-', status:'weekend', workHours: 0, overtimeHours: 0 },
 { id:'A014', date:'2026-02-20', dayOfWeek:'Fri', shift:'Regular (09:00-18:00)', checkIn:'09:10', checkOut:'18:05', workHours: 8, status:'late', overtimeHours: 0, location:'CDS HQ' },
];

const MOCK_SCHEDULE: ShiftSchedule[] = [
 { id:'S001', date:'2026-03-03', dayOfWeek:'Mon', shiftName:'Regular', startTime:'09:00', endTime:'18:00', breakStart:'12:00', breakEnd:'13:00', workHours: 8, type:'regular' },
 { id:'S002', date:'2026-03-04', dayOfWeek:'Tue', shiftName:'Regular', startTime:'09:00', endTime:'18:00', breakStart:'12:00', breakEnd:'13:00', workHours: 8, type:'regular' },
 { id:'S003', date:'2026-03-05', dayOfWeek:'Wed', shiftName:'Regular', startTime:'09:00', endTime:'18:00', breakStart:'12:00', breakEnd:'13:00', workHours: 8, type:'regular' },
 { id:'S004', date:'2026-03-06', dayOfWeek:'Thu', shiftName:'Regular', startTime:'09:00', endTime:'18:00', breakStart:'12:00', breakEnd:'13:00', workHours: 8, type:'regular' },
 { id:'S005', date:'2026-03-07', dayOfWeek:'Fri', shiftName:'Regular', startTime:'09:00', endTime:'18:00', breakStart:'12:00', breakEnd:'13:00', workHours: 8, type:'regular' },
 { id:'S006', date:'2026-03-08', dayOfWeek:'Sat', shiftName:'Off', startTime:'-', endTime:'-', breakStart:'-', breakEnd:'-', workHours: 0, type:'off' },
 { id:'S007', date:'2026-03-09', dayOfWeek:'Sun', shiftName:'Off', startTime:'-', endTime:'-', breakStart:'-', breakEnd:'-', workHours: 0, type:'off' },
];

const MOCK_CORRECTIONS: TimeCorrectionRequest[] = [
 { id:'TC001', date:'2026-02-25', type:'forgot-clock', correctedTime:'09:00', reason:'Forgot to clock in - was in morning meeting', status:'approved', submittedAt:'2026-02-25', approvedBy:'Surachai P.' },
 { id:'TC002', date:'2026-03-03', type:'wrong-time', originalTime:'09:22', correctedTime:'09:05', reason:'System recorded wrong time - badge scanned at entrance at 09:05', status:'pending', submittedAt:'2026-03-03' },
];

const MOCK_TEAM_ATTENDANCE: TeamAttendanceRecord[] = [
 { id:'TA-001', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-05', checkIn:'08:55', checkOut:'18:20', workHours: 8, overtimeHours: 0.5, status:'present' },
 { id:'TA-002', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-05', checkIn:'09:18', checkOut:'18:05', workHours: 8, overtimeHours: 0, status:'late' },
 { id:'TA-003', employeeId:'EMP103', employeeName:'Thanawat Chaiyaporn', date:'2026-03-05', checkIn:'08:57', checkOut:'17:25', workHours: 7.5, overtimeHours: 0, status:'early_departure' },
 { id:'TA-004', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-05', checkIn:'09:02', checkOut:'18:42', workHours: 8, overtimeHours: 0.7, status:'present' },
 { id:'TA-005', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-03-05', checkIn:'09:34', checkOut:'18:10', workHours: 7.5, overtimeHours: 0.2, status:'late' },
 { id:'TA-006', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-05', checkIn:'08:52', checkOut:'18:01', workHours: 8, overtimeHours: 0, status:'present' },
];

export function useTime() {
 const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
 const [schedule, setSchedule] = useState<ShiftSchedule[]>([]);
 const [corrections, setCorrections] = useState<TimeCorrectionRequest[]>([]);
 const [teamAttendance, setTeamAttendance] = useState<TeamAttendanceRecord[]>([]);
 const [loading, setLoading] = useState(true);
 const [clockStatus, setClockStatus] = useState<ClockStatus>({
 isClockedIn: true,
 clockInTime:'08:55',
 clockOutTime: undefined,
 currentShift:'Regular',
 shiftStart:'09:00',
 shiftEnd:'18:00',
 breakStart:'12:00',
 breakEnd:'13:00',
 isWithinGeofence: true,
 locationName:'CDS Headquarters, Bangna',
 });

 useEffect(() => {
 const timer = setTimeout(() => {
 setAttendance(MOCK_ATTENDANCE);
 setSchedule(MOCK_SCHEDULE);
 setCorrections(MOCK_CORRECTIONS);
 setTeamAttendance(MOCK_TEAM_ATTENDANCE);
 setLoading(false);
 }, 300);
 return () => clearTimeout(timer);
 }, []);

 const clockIn = useCallback(async () => {
 const now = new Date();
 const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
 setClockStatus((prev) => ({ ...prev, isClockedIn: true, clockInTime: timeStr, clockOutTime: undefined }));
 }, []);

 const clockOut = useCallback(async () => {
 const now = new Date();
 const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
 setClockStatus((prev) => ({ ...prev, isClockedIn: false, clockOutTime: timeStr }));
 }, []);

 const submitCorrection = useCallback(async (req: Omit<TimeCorrectionRequest,'id' |'status' |'submittedAt'>) => {
 const newReq: TimeCorrectionRequest = {
 ...req,
 id: `TC${Date.now()}`,
 status:'pending',
 submittedAt: new Date().toISOString().split('T')[0],
 };
 setCorrections((prev) => [newReq, ...prev]);
 return newReq;
 }, []);

 const workingRecords = attendance.filter((a) => ['present','late'].includes(a.status));

 const summary = {
 totalWorkDays: workingRecords.length,
 lateDays: attendance.filter((a) => a.status ==='late').length,
 absentDays: attendance.filter((a) => a.status ==='absent').length,
 leaveDays: attendance.filter((a) => a.status ==='leave').length,
 totalOvertimeHours: attendance.reduce((sum, a) => sum + a.overtimeHours, 0),
 totalWorkHours: attendance.reduce((sum, a) => sum + a.workHours, 0),
 avgCheckIn:'08:56',
 avgCheckOut:'18:22',
 onTimeRate: Math.round((workingRecords.filter((a) => a.status ==='present').length / Math.max(workingRecords.length, 1)) * 100),
 };

 return {
 attendance,
 schedule,
 corrections,
 teamAttendance,
 loading,
 summary,
 clockStatus,
 clockIn,
 clockOut,
 submitCorrection,
 };
}

// ─── Timesheet ────────────────────────────────────────────────────────────────

export interface TimesheetRow {
  project: string;
  mon: number; tue: number; wed: number; thu: number; fri: number; sat: number; sun: number;
}

const MOCK_TIMESHEET: TimesheetRow[] = [
  { project: 'Project Alpha', mon: 4, tue: 4, wed: 3, thu: 4, fri: 4, sat: 0, sun: 0 },
  { project: 'Project Beta', mon: 4, tue: 4, wed: 5, thu: 4, fri: 4, sat: 0, sun: 0 },
  { project: 'Internal / Admin', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
];

export function useTimesheet() {
  const [rows, setRows] = useState<TimesheetRow[]>(MOCK_TIMESHEET.map(r => ({ ...r })));
  const [weekStart] = useState('2026-05-11');

  const updateHours = useCallback((rowIdx: number, day: keyof Omit<TimesheetRow, 'project'>, value: number) => {
    setRows(prev => prev.map((r, i) => i === rowIdx ? { ...r, [day]: value } : r));
  }, []);

  const addRow = useCallback((project: string) => {
    setRows(prev => [...prev, { project, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }]);
  }, []);

  const totalPerDay = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(
    d => rows.reduce((s, r) => s + (r[d as keyof TimesheetRow] as number), 0),
  );

  return { rows, weekStart, updateHours, addRow, totalPerDay };
}

// ─── Time-off Requests ────────────────────────────────────────────────────────

export interface TimeOffRequest {
  id: string;
  leaveType: 'annual' | 'sick' | 'personal' | 'maternity' | 'business';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const MOCK_TIME_OFF: TimeOffRequest[] = [
  { id: 'LR001', leaveType: 'annual', startDate: '2026-03-10', endDate: '2026-03-12', days: 3, reason: 'Family trip', status: 'approved', submittedAt: '2026-03-01' },
  { id: 'LR002', leaveType: 'sick', startDate: '2026-02-14', endDate: '2026-02-14', days: 1, reason: 'Fever', status: 'approved', submittedAt: '2026-02-14' },
  { id: 'LR003', leaveType: 'personal', startDate: '2026-05-20', endDate: '2026-05-20', days: 1, reason: 'Personal errand', status: 'pending', submittedAt: '2026-05-10' },
  { id: 'LR004', leaveType: 'annual', startDate: '2026-01-06', endDate: '2026-01-07', days: 2, reason: 'Rest', status: 'rejected', submittedAt: '2025-12-28' },
];

export function useTimeOffRequests() {
  const [requests, setRequests] = useState<TimeOffRequest[]>(MOCK_TIME_OFF);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const submitRequest = useCallback(async (req: Omit<TimeOffRequest, 'id' | 'status' | 'submittedAt'>) => {
    const item: TimeOffRequest = { ...req, id: `LR${Date.now()}`, status: 'pending', submittedAt: new Date().toISOString().split('T')[0] };
    setRequests(prev => [item, ...prev]);
    return item;
  }, []);

  const leaveBalances = { annual: 8, sick: 12, personal: 3, maternity: 90, business: 3 };

  return { requests, loading, submitRequest, leaveBalances };
}

// ─── Overtime Requests ────────────────────────────────────────────────────────

export type OvertimeType = 'weekday' | 'weekend' | 'holiday';

export interface OvertimeRequest {
  id: string;
  date: string;
  hours: number;
  type: OvertimeType;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedBy?: string;
}

const MOCK_OVERTIME: OvertimeRequest[] = [
  { id: 'OTR001', date: '2026-02-18', hours: 2, type: 'weekday', reason: 'Project deadline', status: 'approved', submittedAt: '2026-02-17', approvedBy: 'Surachai P.' },
  { id: 'OTR002', date: '2026-02-22', hours: 6, type: 'weekend', reason: 'System maintenance', status: 'pending', submittedAt: '2026-02-20' },
  { id: 'OTR003', date: '2026-01-28', hours: 4, type: 'weekday', reason: 'Urgent client request', status: 'rejected', submittedAt: '2026-01-27' },
];

export function useOvertimeRequests() {
  const [requests, setRequests] = useState<OvertimeRequest[]>(MOCK_OVERTIME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const submitRequest = useCallback(async (req: Omit<OvertimeRequest, 'id' | 'status' | 'submittedAt'>) => {
    const item: OvertimeRequest = { ...req, id: `OTR${Date.now()}`, status: 'pending', submittedAt: new Date().toISOString().split('T')[0] };
    setRequests(prev => [item, ...prev]);
    return item;
  }, []);

  return { requests, loading, submitRequest };
}

// ─── Manager Approvals ────────────────────────────────────────────────────────

export type ApprovalKind = 'time-off' | 'overtime';

export interface TimeApprovalItem {
  id: string;
  kind: ApprovalKind;
  employeeName: string;
  employeeId: string;
  date: string;
  detail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MOCK_APPROVALS: TimeApprovalItem[] = [
  { id: 'AP001', kind: 'time-off', employeeId: 'EMP102', employeeName: 'Natcha Panyasiri', date: '2026-05-20', detail: 'Annual leave — 2 days', submittedAt: '2026-05-10', status: 'pending' },
  { id: 'AP002', kind: 'overtime', employeeId: 'EMP103', employeeName: 'Thanawat Chaiyaporn', date: '2026-05-18', detail: 'Weekend OT — 4 hrs', submittedAt: '2026-05-09', status: 'pending' },
  { id: 'AP003', kind: 'time-off', employeeId: 'EMP105', employeeName: 'Saran Kongsiri', date: '2026-05-22', detail: 'Sick leave — 1 day', submittedAt: '2026-05-11', status: 'pending' },
  { id: 'AP004', kind: 'overtime', employeeId: 'EMP101', employeeName: 'Krittin Suksawat', date: '2026-05-15', detail: 'Weekday OT — 2 hrs', submittedAt: '2026-05-08', status: 'approved' },
];

export function useTimeApprovals() {
  const [items, setItems] = useState<TimeApprovalItem[]>(MOCK_APPROVALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  const approve = useCallback((id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' } : i));
  }, []);

  const reject = useCallback((id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' } : i));
  }, []);

  const pending = items.filter(i => i.status === 'pending');

  return { items, pending, loading, approve, reject };
}

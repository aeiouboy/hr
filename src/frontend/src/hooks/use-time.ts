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
  status: 'present' | 'late' | 'absent' | 'leave' | 'holiday' | 'weekend';
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
  type: 'regular' | 'morning' | 'evening' | 'night' | 'flexible' | 'off';
}

export interface TimeCorrectionRequest {
  id: string;
  date: string;
  type: 'missing-checkin' | 'missing-checkout' | 'wrong-time' | 'forgot-clock';
  originalTime?: string;
  correctedTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
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
  status: 'present' | 'late' | 'early_departure' | 'leave';
}

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'A001', date: '2026-03-05', dayOfWeek: 'Thu', shift: 'Regular (09:00-18:00)', checkIn: '08:55', checkOut: undefined, workHours: 0, status: 'present', overtimeHours: 0, location: 'CDS HQ' },
  { id: 'A002', date: '2026-03-04', dayOfWeek: 'Wed', shift: 'Regular (09:00-18:00)', checkIn: '08:50', checkOut: '18:10', workHours: 8, status: 'present', overtimeHours: 0, location: 'CDS HQ' },
  { id: 'A003', date: '2026-03-03', dayOfWeek: 'Tue', shift: 'Regular (09:00-18:00)', checkIn: '09:22', checkOut: '18:45', workHours: 8, status: 'late', overtimeHours: 0.75, location: 'CDS HQ' },
  { id: 'A004', date: '2026-03-02', dayOfWeek: 'Mon', shift: 'Regular (09:00-18:00)', checkIn: '08:58', checkOut: '20:15', workHours: 8, status: 'present', overtimeHours: 2.25, location: 'CDS HQ' },
  { id: 'A005', date: '2026-03-01', dayOfWeek: 'Sun', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A006', date: '2026-02-28', dayOfWeek: 'Sat', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A007', date: '2026-02-27', dayOfWeek: 'Fri', shift: 'Regular (09:00-18:00)', status: 'leave', workHours: 0, overtimeHours: 0 },
  { id: 'A008', date: '2026-02-26', dayOfWeek: 'Thu', shift: 'Regular (09:00-18:00)', checkIn: '08:45', checkOut: '18:00', workHours: 8, status: 'present', overtimeHours: 0, location: 'CDS HQ' },
  { id: 'A009', date: '2026-02-25', dayOfWeek: 'Wed', shift: 'Regular (09:00-18:00)', status: 'absent', workHours: 0, overtimeHours: 0 },
  { id: 'A010', date: '2026-02-24', dayOfWeek: 'Tue', shift: 'Regular (09:00-18:00)', checkIn: '09:00', checkOut: '18:00', workHours: 8, status: 'present', overtimeHours: 0, location: 'CDS HQ' },
  { id: 'A011', date: '2026-02-23', dayOfWeek: 'Mon', shift: 'Regular (09:00-18:00)', checkIn: '08:52', checkOut: '19:30', workHours: 8, status: 'present', overtimeHours: 1.5, location: 'CDS HQ' },
  { id: 'A012', date: '2026-02-22', dayOfWeek: 'Sun', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A013', date: '2026-02-21', dayOfWeek: 'Sat', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A014', date: '2026-02-20', dayOfWeek: 'Fri', shift: 'Regular (09:00-18:00)', checkIn: '09:10', checkOut: '18:05', workHours: 8, status: 'late', overtimeHours: 0, location: 'CDS HQ' },
];

const MOCK_SCHEDULE: ShiftSchedule[] = [
  { id: 'S001', date: '2026-03-03', dayOfWeek: 'Mon', shiftName: 'Regular', startTime: '09:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00', workHours: 8, type: 'regular' },
  { id: 'S002', date: '2026-03-04', dayOfWeek: 'Tue', shiftName: 'Regular', startTime: '09:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00', workHours: 8, type: 'regular' },
  { id: 'S003', date: '2026-03-05', dayOfWeek: 'Wed', shiftName: 'Regular', startTime: '09:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00', workHours: 8, type: 'regular' },
  { id: 'S004', date: '2026-03-06', dayOfWeek: 'Thu', shiftName: 'Regular', startTime: '09:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00', workHours: 8, type: 'regular' },
  { id: 'S005', date: '2026-03-07', dayOfWeek: 'Fri', shiftName: 'Regular', startTime: '09:00', endTime: '18:00', breakStart: '12:00', breakEnd: '13:00', workHours: 8, type: 'regular' },
  { id: 'S006', date: '2026-03-08', dayOfWeek: 'Sat', shiftName: 'Off', startTime: '-', endTime: '-', breakStart: '-', breakEnd: '-', workHours: 0, type: 'off' },
  { id: 'S007', date: '2026-03-09', dayOfWeek: 'Sun', shiftName: 'Off', startTime: '-', endTime: '-', breakStart: '-', breakEnd: '-', workHours: 0, type: 'off' },
];

const MOCK_CORRECTIONS: TimeCorrectionRequest[] = [
  { id: 'TC001', date: '2026-02-25', type: 'forgot-clock', correctedTime: '09:00', reason: 'Forgot to clock in - was in morning meeting', status: 'approved', submittedAt: '2026-02-25', approvedBy: 'Surachai P.' },
  { id: 'TC002', date: '2026-03-03', type: 'wrong-time', originalTime: '09:22', correctedTime: '09:05', reason: 'System recorded wrong time - badge scanned at entrance at 09:05', status: 'pending', submittedAt: '2026-03-03' },
];

const MOCK_TEAM_ATTENDANCE: TeamAttendanceRecord[] = [
  { id: 'TA-001', employeeId: 'EMP101', employeeName: 'Krittin Suksawat', date: '2026-03-05', checkIn: '08:55', checkOut: '18:20', workHours: 8, overtimeHours: 0.5, status: 'present' },
  { id: 'TA-002', employeeId: 'EMP102', employeeName: 'Natcha Panyasiri', date: '2026-03-05', checkIn: '09:18', checkOut: '18:05', workHours: 8, overtimeHours: 0, status: 'late' },
  { id: 'TA-003', employeeId: 'EMP103', employeeName: 'Thanawat Chaiyaporn', date: '2026-03-05', checkIn: '08:57', checkOut: '17:25', workHours: 7.5, overtimeHours: 0, status: 'early_departure' },
  { id: 'TA-004', employeeId: 'EMP104', employeeName: 'Pimchanok Ratanakul', date: '2026-03-05', checkIn: '09:02', checkOut: '18:42', workHours: 8, overtimeHours: 0.7, status: 'present' },
  { id: 'TA-005', employeeId: 'EMP105', employeeName: 'Saran Kongsiri', date: '2026-03-05', checkIn: '09:34', checkOut: '18:10', workHours: 7.5, overtimeHours: 0.2, status: 'late' },
  { id: 'TA-006', employeeId: 'EMP106', employeeName: 'Waranya Intarasri', date: '2026-03-05', checkIn: '08:52', checkOut: '18:01', workHours: 8, overtimeHours: 0, status: 'present' },
];

export function useTime() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [schedule, setSchedule] = useState<ShiftSchedule[]>([]);
  const [corrections, setCorrections] = useState<TimeCorrectionRequest[]>([]);
  const [teamAttendance, setTeamAttendance] = useState<TeamAttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [clockStatus, setClockStatus] = useState<ClockStatus>({
    isClockedIn: true,
    clockInTime: '08:55',
    clockOutTime: undefined,
    currentShift: 'Regular',
    shiftStart: '09:00',
    shiftEnd: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    isWithinGeofence: true,
    locationName: 'CDS Headquarters, Bangna',
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
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setClockStatus((prev) => ({ ...prev, isClockedIn: true, clockInTime: timeStr, clockOutTime: undefined }));
  }, []);

  const clockOut = useCallback(async () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setClockStatus((prev) => ({ ...prev, isClockedIn: false, clockOutTime: timeStr }));
  }, []);

  const submitCorrection = useCallback(async (req: Omit<TimeCorrectionRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newReq: TimeCorrectionRequest = {
      ...req,
      id: `TC${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setCorrections((prev) => [newReq, ...prev]);
    return newReq;
  }, []);

  const workingRecords = attendance.filter((a) => ['present', 'late'].includes(a.status));

  const summary = {
    totalWorkDays: workingRecords.length,
    lateDays: attendance.filter((a) => a.status === 'late').length,
    absentDays: attendance.filter((a) => a.status === 'absent').length,
    leaveDays: attendance.filter((a) => a.status === 'leave').length,
    totalOvertimeHours: attendance.reduce((sum, a) => sum + a.overtimeHours, 0),
    totalWorkHours: attendance.reduce((sum, a) => sum + a.workHours, 0),
    avgCheckIn: '08:56',
    avgCheckOut: '18:22',
    onTimeRate: Math.round((workingRecords.filter((a) => a.status === 'present').length / Math.max(workingRecords.length, 1)) * 100),
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

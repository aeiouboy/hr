'use client';

import { useState, useEffect } from 'react';

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
}

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'A001', date: '2026-02-16', dayOfWeek: 'Mon', shift: 'Regular (09:00-18:00)', checkIn: '08:55', checkOut: '18:10', workHours: 8, status: 'present', overtimeHours: 0 },
  { id: 'A002', date: '2026-02-17', dayOfWeek: 'Tue', shift: 'Regular (09:00-18:00)', checkIn: '09:15', checkOut: '18:30', workHours: 8, status: 'late', overtimeHours: 0.5 },
  { id: 'A003', date: '2026-02-18', dayOfWeek: 'Wed', shift: 'Regular (09:00-18:00)', checkIn: '08:50', checkOut: '20:00', workHours: 8, status: 'present', overtimeHours: 2 },
  { id: 'A004', date: '2026-02-19', dayOfWeek: 'Thu', shift: 'Regular (09:00-18:00)', checkIn: '09:00', checkOut: '18:05', workHours: 8, status: 'present', overtimeHours: 0 },
  { id: 'A005', date: '2026-02-20', dayOfWeek: 'Fri', shift: 'Regular (09:00-18:00)', status: 'leave', workHours: 0, overtimeHours: 0 },
  { id: 'A006', date: '2026-02-21', dayOfWeek: 'Sat', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A007', date: '2026-02-22', dayOfWeek: 'Sun', shift: '-', status: 'weekend', workHours: 0, overtimeHours: 0 },
  { id: 'A008', date: '2026-02-09', dayOfWeek: 'Mon', shift: 'Regular (09:00-18:00)', checkIn: '08:45', checkOut: '18:00', workHours: 8, status: 'present', overtimeHours: 0 },
  { id: 'A009', date: '2026-02-10', dayOfWeek: 'Tue', shift: 'Regular (09:00-18:00)', status: 'absent', workHours: 0, overtimeHours: 0 },
  { id: 'A010', date: '2026-02-11', dayOfWeek: 'Wed', shift: 'Regular (09:00-18:00)', checkIn: '09:00', checkOut: '18:00', workHours: 8, status: 'present', overtimeHours: 0 },
];

export function useTime() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAttendance(MOCK_ATTENDANCE);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const summary = {
    totalWorkDays: attendance.filter((a) => ['present', 'late'].includes(a.status)).length,
    lateDays: attendance.filter((a) => a.status === 'late').length,
    absentDays: attendance.filter((a) => a.status === 'absent').length,
    leaveDays: attendance.filter((a) => a.status === 'leave').length,
    totalOvertimeHours: attendance.reduce((sum, a) => sum + a.overtimeHours, 0),
    totalWorkHours: attendance.reduce((sum, a) => sum + a.workHours, 0),
  };

  return { attendance, loading, summary };
}

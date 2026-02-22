'use client';

import { useState, useEffect, useCallback } from 'react';

// --- Types ---

export type LeaveType =
  | 'annual'
  | 'sick'
  | 'personal'
  | 'maternity'
  | 'paternity'
  | 'ordination'
  | 'military'
  | 'unpaid';

export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export type HalfDayPeriod = 'morning' | 'afternoon';

export interface LeaveBalance {
  type: LeaveType;
  nameEn: string;
  nameTh: string;
  entitled: number;
  used: number;
  pending: number;
  remaining: number;
  carryOver?: number;
  expiryDate?: string;
}

export interface LeaveRequest {
  id: string;
  type: LeaveType;
  typeNameEn: string;
  typeNameTh: string;
  startDate: string;
  endDate: string;
  days: number;
  halfDay?: HalfDayPeriod | null;
  reason: string;
  status: LeaveStatus;
  substituteId?: string;
  substitutePersonName?: string;
  attachmentUrl?: string;
  submittedAt: string;
  approvedByName?: string;
  approvedDate?: string;
  rejectedByName?: string;
  rejectedDate?: string;
  rejectionReason?: string;
}

export interface CalendarEvent {
  id: string;
  type: LeaveType;
  typeNameEn: string;
  typeNameTh: string;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  employeeName?: string;
}

export interface ThaiHoliday {
  date: string;
  nameEn: string;
  nameTh: string;
}

// --- Mock Data ---

const MOCK_BALANCES: LeaveBalance[] = [
  { type: 'annual', nameEn: 'Annual Leave', nameTh: 'ลาพักร้อน', entitled: 15, used: 5, pending: 1, remaining: 9 },
  { type: 'sick', nameEn: 'Sick Leave', nameTh: 'ลาป่วย', entitled: 30, used: 3, pending: 0, remaining: 27 },
  { type: 'personal', nameEn: 'Personal Leave', nameTh: 'ลากิจ', entitled: 6, used: 2, pending: 0, remaining: 4 },
  { type: 'maternity', nameEn: 'Maternity Leave', nameTh: 'ลาคลอด', entitled: 98, used: 0, pending: 0, remaining: 98 },
  { type: 'paternity', nameEn: 'Paternity Leave', nameTh: 'ลาเพื่อดูแลภรรยาคลอด', entitled: 15, used: 0, pending: 0, remaining: 15 },
  { type: 'ordination', nameEn: 'Ordination Leave', nameTh: 'ลาอุปสมบท', entitled: 15, used: 0, pending: 0, remaining: 15 },
  { type: 'military', nameEn: 'Military Leave', nameTh: 'ลาเพื่อรับราชการทหาร', entitled: 60, used: 0, pending: 0, remaining: 60 },
  { type: 'unpaid', nameEn: 'Unpaid Leave', nameTh: 'ลาไม่รับค่าจ้าง', entitled: 0, used: 0, pending: 0, remaining: 0 },
];

const MOCK_REQUESTS: LeaveRequest[] = [
  {
    id: 'LR-001',
    type: 'annual',
    typeNameEn: 'Annual Leave',
    typeNameTh: 'ลาพักร้อน',
    startDate: '2026-03-10',
    endDate: '2026-03-14',
    days: 5,
    reason: 'Family vacation',
    status: 'approved',
    substituteId: 'EMP_DR001',
    substitutePersonName: 'Naruechon Woraphatphawan',
    submittedAt: '2026-02-15T09:00:00Z',
    approvedByName: 'Rungrote Amnuaysopon',
    approvedDate: '2026-02-16T10:30:00Z',
  },
  {
    id: 'LR-002',
    type: 'sick',
    typeNameEn: 'Sick Leave',
    typeNameTh: 'ลาป่วย',
    startDate: '2026-02-05',
    endDate: '2026-02-05',
    days: 1,
    reason: 'Not feeling well',
    status: 'approved',
    submittedAt: '2026-02-05T07:30:00Z',
    approvedByName: 'Rungrote Amnuaysopon',
    approvedDate: '2026-02-05T08:00:00Z',
  },
  {
    id: 'LR-003',
    type: 'personal',
    typeNameEn: 'Personal Leave',
    typeNameTh: 'ลากิจ',
    startDate: '2026-03-20',
    endDate: '2026-03-20',
    days: 0.5,
    halfDay: 'morning',
    reason: 'Personal errand',
    status: 'pending',
    submittedAt: '2026-02-20T14:00:00Z',
  },
  {
    id: 'LR-004',
    type: 'annual',
    typeNameEn: 'Annual Leave',
    typeNameTh: 'ลาพักร้อน',
    startDate: '2026-01-06',
    endDate: '2026-01-06',
    days: 1,
    reason: 'Day off',
    status: 'rejected',
    submittedAt: '2025-12-28T10:00:00Z',
    rejectedByName: 'Rungrote Amnuaysopon',
    rejectedDate: '2025-12-29T09:00:00Z',
    rejectionReason: 'Team understaffed on that date',
  },
  {
    id: 'LR-005',
    type: 'sick',
    typeNameEn: 'Sick Leave',
    typeNameTh: 'ลาป่วย',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    days: 3,
    reason: 'Flu',
    status: 'approved',
    attachmentUrl: '/uploads/medical-cert-005.pdf',
    submittedAt: '2026-01-20T08:00:00Z',
    approvedByName: 'Rungrote Amnuaysopon',
    approvedDate: '2026-01-20T09:15:00Z',
  },
];

const MOCK_HOLIDAYS: ThaiHoliday[] = [
  { date: '2026-01-01', nameEn: "New Year's Day", nameTh: 'วันขึ้นปีใหม่' },
  { date: '2026-02-26', nameEn: 'Makha Bucha Day', nameTh: 'วันมาฆบูชา' },
  { date: '2026-04-06', nameEn: 'Chakri Memorial Day', nameTh: 'วันจักรี' },
  { date: '2026-04-13', nameEn: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
  { date: '2026-04-14', nameEn: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
  { date: '2026-04-15', nameEn: 'Songkran Festival', nameTh: 'วันสงกรานต์' },
  { date: '2026-05-01', nameEn: 'Labour Day', nameTh: 'วันแรงงานแห่งชาติ' },
  { date: '2026-05-13', nameEn: 'Visakha Bucha Day', nameTh: 'วันวิสาขบูชา' },
  { date: '2026-06-03', nameEn: "Queen's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าฯ' },
  { date: '2026-07-28', nameEn: "King's Birthday", nameTh: 'วันเฉลิมพระชนมพรรษา ร.10' },
  { date: '2026-08-12', nameEn: "Mother's Day", nameTh: 'วันแม่แห่งชาติ' },
  { date: '2026-10-23', nameEn: 'Chulalongkorn Day', nameTh: 'วันปิยมหาราช' },
  { date: '2026-12-05', nameEn: "Father's Day", nameTh: 'วันพ่อแห่งชาติ' },
  { date: '2026-12-10', nameEn: 'Constitution Day', nameTh: 'วันรัฐธรรมนูญ' },
  { date: '2026-12-31', nameEn: "New Year's Eve", nameTh: 'วันสิ้นปี' },
];

const MOCK_SUBSTITUTE_EMPLOYEES = [
  { id: 'EMP_DR001', nameEn: 'Naruechon Woraphatphawan', nameTh: 'นฤชล วรภัทรภาวัน' },
  { id: 'EMP_DR002', nameEn: 'Punnapa Thianchai', nameTh: 'พรรณปา เธียรชัย' },
  { id: 'EMP_SUP001', nameEn: 'Rungrote Amnuaysopon', nameTh: 'รุ่งโรจน์ อำนวยโสภณ' },
];

// --- Hook ---

export function useLeave(employeeId?: string) {
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [holidays, setHolidays] = useState<ThaiHoliday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with real API calls
        await new Promise((r) => setTimeout(r, 400));
        setBalances(MOCK_BALANCES);
        setRequests(MOCK_REQUESTS);
        setHolidays(MOCK_HOLIDAYS);
      } catch {
        setError('Failed to load leave data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [employeeId]);

  const submitRequest = useCallback(
    async (data: {
      type: LeaveType;
      startDate: string;
      endDate: string;
      days: number;
      halfDay?: HalfDayPeriod | null;
      reason: string;
      substituteId?: string;
    }) => {
      setSubmitting(true);
      try {
        // TODO: Replace with real API call
        await new Promise((r) => setTimeout(r, 500));
        const typeInfo = MOCK_BALANCES.find((b) => b.type === data.type);
        const newRequest: LeaveRequest = {
          id: `LR-${Date.now()}`,
          type: data.type,
          typeNameEn: typeInfo?.nameEn || data.type,
          typeNameTh: typeInfo?.nameTh || data.type,
          startDate: data.startDate,
          endDate: data.endDate,
          days: data.days,
          halfDay: data.halfDay,
          reason: data.reason,
          status: 'pending',
          substituteId: data.substituteId,
          substitutePersonName: MOCK_SUBSTITUTE_EMPLOYEES.find((e) => e.id === data.substituteId)?.nameEn,
          submittedAt: new Date().toISOString(),
        };
        setRequests((prev) => [newRequest, ...prev]);
        // Update balance
        setBalances((prev) =>
          prev.map((b) =>
            b.type === data.type ? { ...b, pending: b.pending + data.days, remaining: b.remaining - data.days } : b
          )
        );
        return newRequest;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  const cancelRequest = useCallback(async (requestId: string) => {
    // TODO: Replace with real API call
    await new Promise((r) => setTimeout(r, 300));
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'cancelled' as LeaveStatus } : r))
    );
  }, []);

  const calendarEvents: CalendarEvent[] = requests
    .filter((r) => r.status === 'approved' || r.status === 'pending')
    .map((r) => ({
      id: r.id,
      type: r.type,
      typeNameEn: r.typeNameEn,
      typeNameTh: r.typeNameTh,
      startDate: r.startDate,
      endDate: r.endDate,
      status: r.status,
    }));

  return {
    balances,
    requests,
    holidays,
    calendarEvents,
    substituteEmployees: MOCK_SUBSTITUTE_EMPLOYEES,
    loading,
    error,
    submitting,
    submitRequest,
    cancelRequest,
  };
}

'use client';

import { useCallback, useMemo, useState } from 'react';

export interface TeamMember {
 id: string;
 name: string;
 photo: string;
 position: string;
 department: string;
}

export type TeamRecordStatus ='on_time' |'late' |'early_departure' |'absent' |'leave';

export interface TeamTimeRecord {
 id: string;
 employeeId: string;
 employeeName: string;
 date: string;
 shift: string;
 clockIn: string;
 clockOut: string;
 workHours: number;
 otHours: number;
 status: TeamRecordStatus;
 isEdited: boolean;
}

export type TeamOTStatus ='pending' |'approved' |'rejected' |'completed';

export interface TeamOTRecord {
 id: string;
 employeeId: string;
 employeeName: string;
 date: string;
 startTime: string;
 endTime: string;
 hours: number;
 type:'weekday' |'weekend' |'holiday';
 status: TeamOTStatus;
 amount: number;
}

export interface ShiftDay {
 day: string;
 date: string;
 shift:'regular' |'morning' |'evening' |'off';
 startTime: string;
 endTime: string;
}

export interface TeamSchedule {
 id: string;
 employeeId: string;
 employeeName: string;
 weekSchedule: ShiftDay[];
}

export type LeaveDocumentStatus ='pending_review' |'reviewed' |'resubmission_required';

export interface LeaveDocument {
 id: string;
 employeeId: string;
 employeeName: string;
 leaveType: string;
 startDate: string;
 endDate: string;
 days: number;
 status: LeaveDocumentStatus;
 hasDocument: boolean;
 documentUrl: string;
}

interface RecordFilter {
 employeeId?: string;
 status?: string;
 startDate?: string;
 endDate?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
 {
 id:'EMP101',
 name:'Krittin Suksawat',
 photo:'https://i.pravatar.cc/80?img=12',
 position:'Senior Store Supervisor',
 department:'Retail Operations',
 },
 {
 id:'EMP102',
 name:'Natcha Panyasiri',
 photo:'https://i.pravatar.cc/80?img=5',
 position:'Visual Merchandising Specialist',
 department:'Retail Operations',
 },
 {
 id:'EMP103',
 name:'Thanawat Chaiyaporn',
 photo:'https://i.pravatar.cc/80?img=60',
 position:'Stock & Inventory Officer',
 department:'Retail Operations',
 },
 {
 id:'EMP104',
 name:'Pimchanok Ratanakul',
 photo:'https://i.pravatar.cc/80?img=32',
 position:'Customer Experience Lead',
 department:'Customer Experience',
 },
 {
 id:'EMP105',
 name:'Saran Kongsiri',
 photo:'https://i.pravatar.cc/80?img=14',
 position:'Sales Associate',
 department:'Customer Experience',
 },
 {
 id:'EMP106',
 name:'Waranya Intarasri',
 photo:'https://i.pravatar.cc/80?img=25',
 position:'Cashier Supervisor',
 department:'Frontline Operations',
 },
];

const TIME_RECORDS: TeamTimeRecord[] = [
 { id:'TR001', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'08:55', clockOut:'18:20', workHours: 8, otHours: 0.5, status:'on_time', isEdited: false },
 { id:'TR002', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'09:18', clockOut:'18:05', workHours: 8, otHours: 0, status:'late', isEdited: false },
 { id:'TR003', employeeId:'EMP103', employeeName:'Thanawat Chaiyaporn', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'08:57', clockOut:'17:25', workHours: 7.5, otHours: 0, status:'early_departure', isEdited: false },
 { id:'TR004', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'09:02', clockOut:'18:42', workHours: 8, otHours: 0.7, status:'on_time', isEdited: false },
 { id:'TR005', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'09:34', clockOut:'18:10', workHours: 7.5, otHours: 0.2, status:'late', isEdited: false },
 { id:'TR006', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-05', shift:'Regular (09:00-18:00)', clockIn:'08:52', clockOut:'18:01', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR007', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'08:50', clockOut:'18:30', workHours: 8, otHours: 0.5, status:'on_time', isEdited: false },
 { id:'TR008', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'09:24', clockOut:'18:07', workHours: 8, otHours: 0.1, status:'late', isEdited: false },
 { id:'TR009', employeeId:'EMP103', employeeName:'Thanawat Chaiyaporn', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'08:58', clockOut:'17:58', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR010', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'08:55', clockOut:'18:15', workHours: 8, otHours: 0.3, status:'on_time', isEdited: false },
 { id:'TR011', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'09:00', clockOut:'17:20', workHours: 7.3, otHours: 0, status:'early_departure', isEdited: false },
 { id:'TR012', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-04', shift:'Regular (09:00-18:00)', clockIn:'08:49', clockOut:'18:00', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR013', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'08:56', clockOut:'18:05', workHours: 8, otHours: 0.1, status:'on_time', isEdited: false },
 { id:'TR014', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'09:11', clockOut:'18:02', workHours: 8, otHours: 0, status:'late', isEdited: false },
 { id:'TR015', employeeId:'EMP103', employeeName:'Thanawat Chaiyaporn', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'08:59', clockOut:'18:01', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR016', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'08:53', clockOut:'18:38', workHours: 8, otHours: 0.6, status:'on_time', isEdited: false },
 { id:'TR017', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'09:05', clockOut:'18:05', workHours: 8, otHours: 0, status:'late', isEdited: false },
 { id:'TR018', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-03', shift:'Regular (09:00-18:00)', clockIn:'08:47', clockOut:'17:55', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR019', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'08:52', clockOut:'18:11', workHours: 8, otHours: 0.2, status:'on_time', isEdited: false },
 { id:'TR020', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'09:16', clockOut:'18:06', workHours: 8, otHours: 0.1, status:'late', isEdited: false },
 { id:'TR021', employeeId:'EMP103', employeeName:'Thanawat Chaiyaporn', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'08:55', clockOut:'17:58', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR022', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'08:54', clockOut:'18:25', workHours: 8, otHours: 0.4, status:'on_time', isEdited: false },
 { id:'TR023', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'08:58', clockOut:'18:00', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
 { id:'TR024', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-02', shift:'Regular (09:00-18:00)', clockIn:'08:51', clockOut:'18:02', workHours: 8, otHours: 0, status:'on_time', isEdited: false },
];

const OT_RECORDS: TeamOTRecord[] = [
 { id:'TOT001', employeeId:'EMP101', employeeName:'Krittin Suksawat', date:'2026-03-01', startTime:'18:00', endTime:'21:00', hours: 3, type:'weekend', status:'approved', amount: 1950 },
 { id:'TOT002', employeeId:'EMP102', employeeName:'Natcha Panyasiri', date:'2026-03-04', startTime:'18:00', endTime:'20:00', hours: 2, type:'weekday', status:'pending', amount: 900 },
 { id:'TOT003', employeeId:'EMP104', employeeName:'Pimchanok Ratanakul', date:'2026-03-03', startTime:'18:30', endTime:'21:00', hours: 2.5, type:'weekday', status:'approved', amount: 1125 },
 { id:'TOT004', employeeId:'EMP105', employeeName:'Saran Kongsiri', date:'2026-02-28', startTime:'10:00', endTime:'15:00', hours: 5, type:'weekend', status:'completed', amount: 3000 },
 { id:'TOT005', employeeId:'EMP106', employeeName:'Waranya Intarasri', date:'2026-03-02', startTime:'18:00', endTime:'19:30', hours: 1.5, type:'weekday', status:'rejected', amount: 0 },
];

const SCHEDULES: TeamSchedule[] = TEAM_MEMBERS.map((member, idx) => ({
 id: `TS-${member.id}`,
 employeeId: member.id,
 employeeName: member.name,
 weekSchedule: [
 { day:'Mon', date:'2026-03-09', shift:'regular', startTime:'09:00', endTime:'18:00' },
 { day:'Tue', date:'2026-03-10', shift:'regular', startTime:'09:00', endTime:'18:00' },
 { day:'Wed', date:'2026-03-11', shift: idx % 2 === 0 ?'morning' :'regular', startTime: idx % 2 === 0 ?'07:00' :'09:00', endTime: idx % 2 === 0 ?'16:00' :'18:00' },
 { day:'Thu', date:'2026-03-12', shift: idx % 3 === 0 ?'evening' :'regular', startTime: idx % 3 === 0 ?'12:00' :'09:00', endTime: idx % 3 === 0 ?'21:00' :'18:00' },
 { day:'Fri', date:'2026-03-13', shift:'regular', startTime:'09:00', endTime:'18:00' },
 { day:'Sat', date:'2026-03-14', shift: idx % 2 === 0 ?'off' :'morning', startTime: idx % 2 === 0 ?'-' :'08:00', endTime: idx % 2 === 0 ?'-' :'17:00' },
 { day:'Sun', date:'2026-03-15', shift:'off', startTime:'-', endTime:'-' },
 ],
}));

const LEAVE_DOCUMENTS: LeaveDocument[] = [
 {
 id:'LD001',
 employeeId:'EMP102',
 employeeName:'Natcha Panyasiri',
 leaveType:'Sick Leave',
 startDate:'2026-03-12',
 endDate:'2026-03-14',
 days: 3,
 status:'pending_review',
 hasDocument: true,
 documentUrl:'/uploads/medical-cert-natcha.pdf',
 },
 {
 id:'LD002',
 employeeId:'EMP104',
 employeeName:'Pimchanok Ratanakul',
 leaveType:'Personal Leave',
 startDate:'2026-03-20',
 endDate:'2026-03-20',
 days: 1,
 status:'reviewed',
 hasDocument: true,
 documentUrl:'/uploads/personal-doc-pimchanok.pdf',
 },
 {
 id:'LD003',
 employeeId:'EMP105',
 employeeName:'Saran Kongsiri',
 leaveType:'Sick Leave',
 startDate:'2026-03-01',
 endDate:'2026-03-03',
 days: 3,
 status:'resubmission_required',
 hasDocument: true,
 documentUrl:'/uploads/medical-cert-saran.pdf',
 },
 {
 id:'LD004',
 employeeId:'EMP106',
 employeeName:'Waranya Intarasri',
 leaveType:'Maternity Leave',
 startDate:'2026-04-01',
 endDate:'2026-04-30',
 days: 30,
 status:'pending_review',
 hasDocument: true,
 documentUrl:'/uploads/maternity-doc-waranya.pdf',
 },
];

function applyDateRange<T extends { date?: string; startDate?: string }>(
 records: T[],
 startDate?: string,
 endDate?: string,
 dateField:'date' |'startDate' ='date'
): T[] {
 return records.filter((record) => {
 const targetDate = record[dateField];
 if (!targetDate) return false;
 if (startDate && targetDate < startDate) return false;
 if (endDate && targetDate > endDate) return false;
 return true;
 });
}

export function useSpd() {
 const [teamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
 const [timeRecords, setTimeRecords] = useState<TeamTimeRecord[]>(TIME_RECORDS);
 const [otRecords, setOtRecords] = useState<TeamOTRecord[]>(OT_RECORDS);
 const [schedules, setSchedules] = useState<TeamSchedule[]>(SCHEDULES);
 const [leaveDocuments, setLeaveDocuments] = useState<LeaveDocument[]>(LEAVE_DOCUMENTS);

 const updateTimeRecord = useCallback(async (recordId: string, updates: Partial<TeamTimeRecord>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setTimeRecords((prev) => prev.map((record) => (record.id === recordId ? { ...record, ...updates, isEdited: true } : record)));
 }, []);

 const updateOTRecord = useCallback(async (recordId: string, updates: Partial<TeamOTRecord>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setOtRecords((prev) => prev.map((record) => (record.id === recordId ? { ...record, ...updates } : record)));
 }, []);

 const updateSchedule = useCallback(async (scheduleId: string, weekSchedule: ShiftDay[]) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setSchedules((prev) => prev.map((schedule) => (schedule.id === scheduleId ? { ...schedule, weekSchedule } : schedule)));
 }, []);

 const updateLeaveDocument = useCallback(async (documentId: string, updates: Partial<LeaveDocument>) => {
 await new Promise((resolve) => setTimeout(resolve, 220));
 setLeaveDocuments((prev) => prev.map((document) => (document.id === documentId ? { ...document, ...updates } : document)));
 }, []);

 const viewLeaveDocument = useCallback((documentId: string) => {
 const found = leaveDocuments.find((document) => document.id === documentId);
 return found?.documentUrl ?? null;
 }, [leaveDocuments]);

 const filterTimeRecords = useCallback((filter: RecordFilter) => {
 let result = [...timeRecords];
 if (filter.employeeId && filter.employeeId !=='all') {
 result = result.filter((record) => record.employeeId === filter.employeeId);
 }
 if (filter.status && filter.status !=='all') {
 result = result.filter((record) => record.status === filter.status);
 }
 return applyDateRange(result, filter.startDate, filter.endDate,'date');
 }, [timeRecords]);

 const filterOTRecords = useCallback((filter: RecordFilter) => {
 let result = [...otRecords];
 if (filter.employeeId && filter.employeeId !=='all') {
 result = result.filter((record) => record.employeeId === filter.employeeId);
 }
 if (filter.status && filter.status !=='all') {
 result = result.filter((record) => record.status === filter.status);
 }
 return applyDateRange(result, filter.startDate, filter.endDate,'date');
 }, [otRecords]);

 const filterSchedules = useCallback((employeeId?: string) => {
 if (!employeeId || employeeId ==='all') return schedules;
 return schedules.filter((schedule) => schedule.employeeId === employeeId);
 }, [schedules]);

 const filterLeaveDocuments = useCallback((filter: RecordFilter) => {
 let result = [...leaveDocuments];
 if (filter.employeeId && filter.employeeId !=='all') {
 result = result.filter((document) => document.employeeId === filter.employeeId);
 }
 if (filter.status && filter.status !=='all') {
 result = result.filter((document) => document.status === filter.status);
 }
 return applyDateRange(result, filter.startDate, filter.endDate,'startDate');
 }, [leaveDocuments]);

 const summary = useMemo(() => ({
 totalMembers: teamMembers.length,
 lateCount: timeRecords.filter((record) => record.status ==='late').length,
 pendingOT: otRecords.filter((record) => record.status ==='pending').length,
 pendingDocuments: leaveDocuments.filter((document) => document.status ==='pending_review').length,
 }), [teamMembers.length, timeRecords, otRecords, leaveDocuments]);

 return {
 teamMembers,
 timeRecords,
 otRecords,
 schedules,
 leaveDocuments,
 summary,
 updateTimeRecord,
 updateOTRecord,
 updateSchedule,
 updateLeaveDocument,
 viewLeaveDocument,
 filterTimeRecords,
 filterOTRecords,
 filterSchedules,
 filterLeaveDocuments,
 };
}

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { managerDashboardApi, type TeamSummary as ApiTeamSummary, type TeamMember as ApiTeamMember, type CalendarEvent as ApiCalendarEvent, type UrgentAlert as ApiUrgentAlert, type OrgNode } from '@/lib/manager-dashboard-api';
import { useAuthStore } from '@/stores/auth-store';
import { countDirectReports } from '@/lib/scope-filter';
import { ALL_PORTED_EMPLOYEES, EMP_BY_LOGIN } from '@/lib/all-ported-employees';

export type { OrgNode };

export interface TeamMember {
 id: string;
 name: string;
 position: string;
 department: string;
 costCenter: string;
 managerId: string | null;
 managerName: string | null;
 avatar: string;
 status:'active' |'on-leave' |'probation';
 joinDate: string;
 probationEnd?: string;
}

export interface PendingApproval {
 id: string;
 type:'leave' |'expense' |'overtime' |'change-request';
 employeeName: string;
 employeeId: string;
 summary: string;
 amount?: number;
 dates?: string;
 submittedAt: string;
 urgent: boolean;
}

export interface UrgentAlert {
 id: string;
 type:'probation' |'work-permit' |'training' |'birthday' |'anniversary';
 title: string;
 description: string;
 dueDate: string;
 severity:'critical' |'high' |'normal';
}

export interface CalendarEvent {
 id: string;
 date: string;
 employeeName: string;
 type:'leave' |'training' |'meeting' |'shift' |'annual_leave' |'sick_leave' |'wfh' |'holiday';
 label: string;
}

export interface TeamStats {
 totalMembers: number;
 activeToday: number;
 onLeaveToday: number;
 pendingApprovals: number;
 inProbation: number;
}

export interface Position {
 positionCode: string;
 positionTitle: string;
 department: string;
 costCenter: string;
 headcountActual: number;
 headcountBudget: number;
}

export interface MovementEvent {
 id: string;
 date: string;             // ISO 'YYYY-MM-DD'
 type: 'joiner' | 'leaver' | 'transfer';
 employeeName: string;     // Thai name
 details: string;          // Thai context
}

const MOCK_TEAM: TeamMember[] = [
 { id:'EMP001', name:'สมชาย ใจดี', position:'Senior Developer', department:'ฝ่ายไอที', costCenter:'CC-1001', managerId: null, managerName: null, avatar:'สช', status:'active', joinDate:'2023-06-15' },
 { id:'EMP002', name:'พลอย สุขสวัสดิ์', position:'UX Designer', department:'ฝ่ายไอที', costCenter:'CC-1001', managerId:'EMP001', managerName:'สมชาย ใจดี', avatar:'พส', status:'active', joinDate:'2024-01-10' },
 { id:'EMP003', name:'ณัฐพงศ์ แก้วสาย', position:'QA Engineer', department:'ฝ่ายไอที', costCenter:'CC-1001', managerId:'EMP001', managerName:'สมชาย ใจดี', avatar:'ณก', status:'on-leave', joinDate:'2023-09-01' },
 { id:'EMP004', name:'รัชนี บุญศรี', position:'Junior Developer', department:'ฝ่ายการเงิน', costCenter:'CC-2001', managerId:'EMP006', managerName:'มาลี ศรีพันธ์', avatar:'รบ', status:'probation', joinDate:'2025-12-01', probationEnd:'2026-05-31' },
 { id:'EMP005', name:'กฤษ ตระหนักวงศ์', position:'DevOps Engineer', department:'ฝ่ายขาย', costCenter:'CC-3001', managerId: null, managerName: null, avatar:'กต', status:'active', joinDate:'2024-03-15' },
 { id:'EMP006', name:'มาลี ศรีพันธ์', position:'Business Analyst', department:'ฝ่ายการเงิน', costCenter:'CC-2001', managerId:'EMP005', managerName:'กฤษ ตระหนักวงศ์', avatar:'มศ', status:'active', joinDate:'2022-11-20' },
];

const MOCK_APPROVALS: PendingApproval[] = [
 { id:'APR001', type:'leave', employeeName:'Nattapong Kaewsai', employeeId:'EMP003', summary:'Annual Leave: 3 days (Feb 24-26)', dates:'2026-02-24 to 2026-02-26', submittedAt:'2026-02-20', urgent: true },
 { id:'APR002', type:'expense', employeeName:'Somchai Jaidee', employeeId:'EMP001', summary:'Travel expense: Client visit Bangkok', amount: 2800, submittedAt:'2026-02-19', urgent: false },
 { id:'APR003', type:'overtime', employeeName:'Krit Tanawan', employeeId:'EMP005', summary:'OT Request: 4 hours (Server migration)', dates:'2026-02-22', submittedAt:'2026-02-21', urgent: true },
 { id:'APR004', type:'leave', employeeName:'Ploy Suksawat', employeeId:'EMP002', summary:'Sick Leave: 1 day (Feb 22)', dates:'2026-02-22', submittedAt:'2026-02-22', urgent: true },
 { id:'APR005', type:'expense', employeeName:'Malee Sriphan', employeeId:'EMP006', summary:'Meal expense: Team lunch', amount: 1500, submittedAt:'2026-02-18', urgent: false },
 // APR006 'Bank account update' removed — bank changes go to SPD via
 // /admin/change-requests per BRD #166, not manager queue (Ken UAT 2026-04-26)
];

const MOCK_ALERTS: UrgentAlert[] = [
 { id:'ALT001', type:'probation', title:'Probation Ending', description:'Ratchanee Boonsri - probation ends May 31', dueDate:'2026-05-31', severity:'high' },
 { id:'ALT002', type:'training', title:'Training Due', description:'Krit Tanawan - Security compliance training overdue', dueDate:'2026-02-15', severity:'critical' },
 { id:'ALT003', type:'birthday', title:'Upcoming Birthday', description:'Ploy Suksawat - February 28', dueDate:'2026-02-28', severity:'normal' },
 { id:'ALT004', type:'anniversary', title:'Work Anniversary', description:'Malee Sriphan - 4 years on Nov 20', dueDate:'2026-11-20', severity:'normal' },
 { id:'ALT005', type:'work-permit', title:'Work Permit Expiring', description:'Contract renewal needed for EMP009', dueDate:'2026-04-15', severity:'high' },
];

const MOCK_CALENDAR: CalendarEvent[] = [
 { id:'CE001', date:'2026-02-22', employeeName:'Nattapong K.', type:'leave', label:'Sick Leave' },
 { id:'CE002', date:'2026-02-24', employeeName:'Nattapong K.', type:'leave', label:'Annual Leave' },
 { id:'CE003', date:'2026-02-25', employeeName:'Nattapong K.', type:'leave', label:'Annual Leave' },
 { id:'CE004', date:'2026-02-26', employeeName:'Nattapong K.', type:'leave', label:'Annual Leave' },
 { id:'CE005', date:'2026-02-23', employeeName:'Krit T.', type:'training', label:'Security Training' },
 { id:'CE006', date:'2026-02-27', employeeName:'Team', type:'meeting', label:'Sprint Review' },
 { id:'CE007', date:'2026-02-16', employeeName:'Somchai J.', type:'wfh', label:'Work from Home' },
 { id:'CE008', date:'2026-02-17', employeeName:'Ploy S.', type:'annual_leave', label:'Annual Leave' },
 { id:'CE009', date:'2026-02-10', employeeName:'Malee S.', type:'sick_leave', label:'Sick Leave' },
 { id:'CE010', date:'2026-02-03', employeeName:'Krit T.', type:'shift', label:'Morning Shift' },
];

export const MOCK_POSITIONS: Position[] = [
 { positionCode:'POS-IT-001', positionTitle:'นักพัฒนาซอฟต์แวร์อาวุโส', department:'ฝ่ายไอที', costCenter:'CC-1001', headcountActual: 3, headcountBudget: 4 },
 { positionCode:'POS-IT-002', positionTitle:'นักออกแบบ UX/UI', department:'ฝ่ายไอที', costCenter:'CC-1001', headcountActual: 1, headcountBudget: 2 },
 { positionCode:'POS-IT-003', positionTitle:'วิศวกร DevOps', department:'ฝ่ายไอที', costCenter:'CC-1001', headcountActual: 2, headcountBudget: 2 },
 { positionCode:'POS-FIN-001', positionTitle:'นักวิเคราะห์ธุรกิจ', department:'ฝ่ายการเงิน', costCenter:'CC-2001', headcountActual: 2, headcountBudget: 3 },
 { positionCode:'POS-FIN-002', positionTitle:'นักบัญชีอาวุโส', department:'ฝ่ายการเงิน', costCenter:'CC-2001', headcountActual: 1, headcountBudget: 1 },
 { positionCode:'POS-SALES-001', positionTitle:'ผู้จัดการฝ่ายขาย', department:'ฝ่ายขาย', costCenter:'CC-3001', headcountActual: 1, headcountBudget: 2 },
 { positionCode:'POS-SALES-002', positionTitle:'ตัวแทนขาย', department:'ฝ่ายขาย', costCenter:'CC-3001', headcountActual: 3, headcountBudget: 3 },
];

export const MOCK_MOVEMENT: MovementEvent[] = [
 { id:'MV001', date:'2026-04-20', type:'joiner', employeeName:'วิชัย มั่นคง', details:'เข้าฝ่ายไอที' },
 { id:'MV002', date:'2026-04-15', type:'transfer', employeeName:'พลอย สุขสวัสดิ์', details:'ย้าย ฝ่ายไอที → ฝ่ายขาย' },
 { id:'MV003', date:'2026-04-10', type:'leaver', employeeName:'ประทีป วงศ์สว่าง', details:'ออกจากบริษัท' },
 { id:'MV004', date:'2026-04-05', type:'joiner', employeeName:'สุดา ทองคำ', details:'เข้าฝ่ายการเงิน' },
 { id:'MV005', date:'2026-03-28', type:'transfer', employeeName:'ณัฐพงศ์ แก้วสาย', details:'ย้าย ฝ่ายขาย → ฝ่ายไอที' },
 { id:'MV006', date:'2026-03-20', type:'leaver', employeeName:'กานต์ รุ่งเรือง', details:'ออกจากบริษัท' },
 { id:'MV007', date:'2026-03-15', type:'joiner', employeeName:'มนัส พันธุ์ดี', details:'เข้าฝ่ายขาย' },
 { id:'MV008', date:'2026-03-08', type:'transfer', employeeName:'รัชนี บุญศรี', details:'ย้าย ฝ่ายการเงิน → ฝ่ายไอที' },
];

// Build hierarchy from managerId chain (Direct mode base).
// dottedLineManagerId = สายไขว้ (Matrix mode overlay):
//   พลอย → สายตรงถึง สมชาย / สายไขว้ถึง กฤษ
//   ณัฐพงศ์ → สายตรงถึง สมชาย / สายไขว้ถึง มาลี
const MOCK_ORG: OrgNode = {
 id: 'MGR001',
 name: 'คุณ (ผู้จัดการ)',
 position: 'ผู้จัดการไอที',
 children: [
  {
   id: 'EMP001',
   name: 'สมชาย ใจดี',
   position: 'Senior Developer',
   children: [
    { id: 'EMP002', name: 'พลอย สุขสวัสดิ์', position: 'UX Designer', dottedLineManagerId: 'EMP005' },
    { id: 'EMP003', name: 'ณัฐพงศ์ แก้วสาย', position: 'QA Engineer', dottedLineManagerId: 'EMP006' },
   ],
  },
  {
   id: 'EMP005',
   name: 'กฤษ ตระหนักวงศ์',
   position: 'DevOps Engineer',
   children: [
    {
     id: 'EMP006',
     name: 'มาลี ศรีพันธ์',
     position: 'Business Analyst',
     children: [
      { id: 'EMP004', name: 'รัชนี บุญศรี', position: 'Junior Developer' },
     ],
    },
   ],
  },
 ],
};

// Races a promise against a timeout; rejects if the timeout fires first.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
 return Promise.race([
 promise,
 new Promise<never>((_, reject) =>
 setTimeout(() => reject(new Error('API timeout')), ms)
 ),
 ]);
}

// How long to wait for the backend before falling back to mock data (ms).
const API_TIMEOUT = 3000;

export function useManagerDashboard() {
 const [team, setTeam] = useState<TeamMember[]>([]);
 const [approvals, setApprovals] = useState<PendingApproval[]>([]);
 const [alerts, setAlerts] = useState<UrgentAlert[]>([]);
 const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
 const [orgChart, setOrgChart] = useState<OrgNode | null>(null);
 const [loading, setLoading] = useState(true);
 const [calMonth, setCalMonth] = useState(new Date().getMonth() + 1);
 const [calYear, setCalYear] = useState(new Date().getFullYear());

 useEffect(() => {
 const load = async () => {
 setLoading(true);
 try {
 const [summaryRes, membersRes, alertsRes, orgRes] = await Promise.allSettled([
 withTimeout(managerDashboardApi.getTeamSummary(), API_TIMEOUT),
 withTimeout(managerDashboardApi.getTeamMembers(), API_TIMEOUT),
 withTimeout(managerDashboardApi.getUrgentAlerts(), API_TIMEOUT),
 withTimeout(managerDashboardApi.getOrgChart(), API_TIMEOUT),
 ]);

 if (membersRes.status ==='fulfilled') {
 setTeam(membersRes.value.map((m) => ({
 id: m.id,
 name: m.name,
 position: m.position,
 department: m.department,
 costCenter: '',
 managerId: null,
 managerName: null,
 avatar: m.name.split('').map((n) => n[0]).join('').slice(0, 2),
 status: m.status ==='present' ?'active' : m.status ==='leave' ?'on-leave' : m.status ==='wfh' ?'active' :'active',
 joinDate:'',
 })));
 } else {
 setTeam(MOCK_TEAM);
 }

 if (alertsRes.status ==='fulfilled') {
 setAlerts(alertsRes.value.map((a) => ({
 id: a.id,
 type: a.type as UrgentAlert['type'],
 title: a.title,
 description: a.message,
 dueDate: a.dueDate ??'',
 severity: a.priority ==='high' ?'critical' : a.priority ==='medium' ?'high' :'normal',
 })));
 } else {
 setAlerts(MOCK_ALERTS);
 }

 if (orgRes.status ==='fulfilled') {
 setOrgChart(orgRes.value);
 } else {
 setOrgChart(MOCK_ORG);
 }

 // Keep approvals from mock for now
 setApprovals(MOCK_APPROVALS);
 } catch {
 setTeam(MOCK_TEAM);
 setApprovals(MOCK_APPROVALS);
 setAlerts(MOCK_ALERTS);
 setOrgChart(MOCK_ORG);
 } finally {
 setLoading(false);
 }
 };
 load();
 }, []);

 // Fetch calendar on month change
 const fetchCalendar = useCallback(async () => {
 try {
 const res = await withTimeout(
 managerDashboardApi.getTeamCalendar(calMonth, calYear),
 API_TIMEOUT
 );
 setCalendarEvents(res.events.map((e, i) => ({
 id: `CE-${i}`,
 date: e.date,
 employeeName: e.employeeName,
 type: e.type as CalendarEvent['type'],
 label: e.label ?? e.type,
 })));
 } catch {
 setCalendarEvents(MOCK_CALENDAR);
 }
 }, [calMonth, calYear]);

 useEffect(() => {
 fetchCalendar();
 }, [fetchCalendar]);

 // Track A2 (autopilot 2026-04-26): real subordinate count from scope-filter lib.
 // Reads current persona's emp-id (view-as aware via auth-store) → counts direct
 // reports in the 212-employee SF-real pool. Falls back to team.length when emp-id
 // can't be resolved (unauthenticated test runs / unmapped login).
 const currentEmail = useAuthStore((s) => s.email);
 const directReportsCount = useMemo(() => {
   if (!currentEmail) return team.length;
   const empId = EMP_BY_LOGIN[currentEmail];
   if (!empId) return team.length;
   return countDirectReports(ALL_PORTED_EMPLOYEES, empId);
 }, [currentEmail, team.length]);

 const stats: TeamStats = {
 totalMembers: directReportsCount,
 activeToday: team.filter((m) => m.status ==='active').length,
 onLeaveToday: team.filter((m) => m.status ==='on-leave').length,
 pendingApprovals: approvals.length,
 inProbation: team.filter((m) => m.status ==='probation').length,
 };

 const approveRequest = (id: string) => {
 setApprovals((prev) => prev.filter((a) => a.id !== id));
 };

 const rejectRequest = (id: string) => {
 setApprovals((prev) => prev.filter((a) => a.id !== id));
 };

 const bulkApprove = (ids: string[]) => {
 setApprovals((prev) => prev.filter((a) => !ids.includes(a.id)));
 };

 const bulkReject = (ids: string[]) => {
 setApprovals((prev) => prev.filter((a) => !ids.includes(a.id)));
 };

 return {
 team, approvals, alerts, calendarEvents, orgChart, stats, loading,
 calMonth, calYear, setCalMonth, setCalYear,
 approveRequest, rejectRequest, bulkApprove, bulkReject,
 positions: MOCK_POSITIONS,
 movementEvents: MOCK_MOVEMENT,
 };
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { managerDashboardApi, type TeamSummary as ApiTeamSummary, type TeamMember as ApiTeamMember, type CalendarEvent as ApiCalendarEvent, type UrgentAlert as ApiUrgentAlert, type OrgNode } from '@/lib/manager-dashboard-api';

export type { OrgNode };

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  status: 'active' | 'on-leave' | 'probation';
  joinDate: string;
  probationEnd?: string;
}

export interface PendingApproval {
  id: string;
  type: 'leave' | 'expense' | 'overtime' | 'change-request';
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
  type: 'probation' | 'work-permit' | 'training' | 'birthday' | 'anniversary';
  title: string;
  description: string;
  dueDate: string;
  severity: 'critical' | 'high' | 'normal';
}

export interface CalendarEvent {
  id: string;
  date: string;
  employeeName: string;
  type: 'leave' | 'training' | 'meeting' | 'shift' | 'annual_leave' | 'sick_leave' | 'wfh' | 'holiday';
  label: string;
}

export interface TeamStats {
  totalMembers: number;
  activeToday: number;
  onLeaveToday: number;
  pendingApprovals: number;
  inProbation: number;
}

const MOCK_TEAM: TeamMember[] = [
  { id: 'EMP001', name: 'Somchai Jaidee', position: 'Senior Developer', department: 'IT', avatar: 'SJ', status: 'active', joinDate: '2023-06-15' },
  { id: 'EMP002', name: 'Ploy Suksawat', position: 'UX Designer', department: 'IT', avatar: 'PS', status: 'active', joinDate: '2024-01-10' },
  { id: 'EMP003', name: 'Nattapong Kaewsai', position: 'QA Engineer', department: 'IT', avatar: 'NK', status: 'on-leave', joinDate: '2023-09-01' },
  { id: 'EMP004', name: 'Ratchanee Boonsri', position: 'Junior Developer', department: 'IT', avatar: 'RB', status: 'probation', joinDate: '2025-12-01', probationEnd: '2026-05-31' },
  { id: 'EMP005', name: 'Krit Tanawan', position: 'DevOps Engineer', department: 'IT', avatar: 'KT', status: 'active', joinDate: '2024-03-15' },
  { id: 'EMP006', name: 'Malee Sriphan', position: 'Business Analyst', department: 'IT', avatar: 'MS', status: 'active', joinDate: '2022-11-20' },
];

const MOCK_APPROVALS: PendingApproval[] = [
  { id: 'APR001', type: 'leave', employeeName: 'Nattapong Kaewsai', employeeId: 'EMP003', summary: 'Annual Leave: 3 days (Feb 24-26)', dates: '2026-02-24 to 2026-02-26', submittedAt: '2026-02-20', urgent: true },
  { id: 'APR002', type: 'expense', employeeName: 'Somchai Jaidee', employeeId: 'EMP001', summary: 'Travel expense: Client visit Bangkok', amount: 2800, submittedAt: '2026-02-19', urgent: false },
  { id: 'APR003', type: 'overtime', employeeName: 'Krit Tanawan', employeeId: 'EMP005', summary: 'OT Request: 4 hours (Server migration)', dates: '2026-02-22', submittedAt: '2026-02-21', urgent: true },
  { id: 'APR004', type: 'leave', employeeName: 'Ploy Suksawat', employeeId: 'EMP002', summary: 'Sick Leave: 1 day (Feb 22)', dates: '2026-02-22', submittedAt: '2026-02-22', urgent: true },
  { id: 'APR005', type: 'expense', employeeName: 'Malee Sriphan', employeeId: 'EMP006', summary: 'Meal expense: Team lunch', amount: 1500, submittedAt: '2026-02-18', urgent: false },
  { id: 'APR006', type: 'change-request', employeeName: 'Ratchanee Boonsri', employeeId: 'EMP004', summary: 'Bank account update request', submittedAt: '2026-02-17', urgent: false },
];

const MOCK_ALERTS: UrgentAlert[] = [
  { id: 'ALT001', type: 'probation', title: 'Probation Ending', description: 'Ratchanee Boonsri - probation ends May 31', dueDate: '2026-05-31', severity: 'high' },
  { id: 'ALT002', type: 'training', title: 'Training Due', description: 'Krit Tanawan - Security compliance training overdue', dueDate: '2026-02-15', severity: 'critical' },
  { id: 'ALT003', type: 'birthday', title: 'Upcoming Birthday', description: 'Ploy Suksawat - February 28', dueDate: '2026-02-28', severity: 'normal' },
  { id: 'ALT004', type: 'anniversary', title: 'Work Anniversary', description: 'Malee Sriphan - 4 years on Nov 20', dueDate: '2026-11-20', severity: 'normal' },
  { id: 'ALT005', type: 'work-permit', title: 'Work Permit Expiring', description: 'Contract renewal needed for EMP009', dueDate: '2026-04-15', severity: 'high' },
];

const MOCK_CALENDAR: CalendarEvent[] = [
  { id: 'CE001', date: '2026-02-22', employeeName: 'Nattapong K.', type: 'leave', label: 'Sick Leave' },
  { id: 'CE002', date: '2026-02-24', employeeName: 'Nattapong K.', type: 'leave', label: 'Annual Leave' },
  { id: 'CE003', date: '2026-02-25', employeeName: 'Nattapong K.', type: 'leave', label: 'Annual Leave' },
  { id: 'CE004', date: '2026-02-26', employeeName: 'Nattapong K.', type: 'leave', label: 'Annual Leave' },
  { id: 'CE005', date: '2026-02-23', employeeName: 'Krit T.', type: 'training', label: 'Security Training' },
  { id: 'CE006', date: '2026-02-27', employeeName: 'Team', type: 'meeting', label: 'Sprint Review' },
  { id: 'CE007', date: '2026-02-16', employeeName: 'Somchai J.', type: 'wfh', label: 'Work from Home' },
  { id: 'CE008', date: '2026-02-17', employeeName: 'Ploy S.', type: 'annual_leave', label: 'Annual Leave' },
  { id: 'CE009', date: '2026-02-10', employeeName: 'Malee S.', type: 'sick_leave', label: 'Sick Leave' },
  { id: 'CE010', date: '2026-02-03', employeeName: 'Krit T.', type: 'shift', label: 'Morning Shift' },
];

const MOCK_ORG: OrgNode = {
  id: 'MGR001',
  name: 'You (Manager)',
  position: 'IT Manager',
  children: MOCK_TEAM.map((m) => ({
    id: m.id,
    name: m.name,
    position: m.position,
  })),
};

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
          managerDashboardApi.getTeamSummary(),
          managerDashboardApi.getTeamMembers(),
          managerDashboardApi.getUrgentAlerts(),
          managerDashboardApi.getOrgChart(),
        ]);

        if (membersRes.status === 'fulfilled') {
          setTeam(membersRes.value.map((m) => ({
            id: m.id,
            name: m.name,
            position: m.position,
            department: m.department,
            avatar: m.name.split(' ').map((n) => n[0]).join('').slice(0, 2),
            status: m.status === 'present' ? 'active' : m.status === 'leave' ? 'on-leave' : m.status === 'wfh' ? 'active' : 'active',
            joinDate: '',
          })));
        } else {
          setTeam(MOCK_TEAM);
        }

        if (alertsRes.status === 'fulfilled') {
          setAlerts(alertsRes.value.map((a) => ({
            id: a.id,
            type: a.type as UrgentAlert['type'],
            title: a.title,
            description: a.message,
            dueDate: a.dueDate ?? '',
            severity: a.priority === 'high' ? 'critical' : a.priority === 'medium' ? 'high' : 'normal',
          })));
        } else {
          setAlerts(MOCK_ALERTS);
        }

        if (orgRes.status === 'fulfilled') {
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
      const res = await managerDashboardApi.getTeamCalendar(calMonth, calYear);
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

  const stats: TeamStats = {
    totalMembers: team.length,
    activeToday: team.filter((m) => m.status === 'active').length,
    onLeaveToday: team.filter((m) => m.status === 'on-leave').length,
    pendingApprovals: approvals.length,
    inProbation: team.filter((m) => m.status === 'probation').length,
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
  };
}

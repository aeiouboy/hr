import { api } from './api';

export interface TeamSummary {
  totalMembers: number;
  presentToday: number;
  presentPercentage: number;
  onLeaveToday: number;
  onLeaveNames: string[];
  pendingApprovals: number;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  department: string;
  status: 'present' | 'leave' | 'wfh' | 'absent';
  leaveType?: string;
}

export interface CalendarEvent {
  date: string;
  employeeId: string;
  employeeName: string;
  type: 'shift' | 'annual_leave' | 'sick_leave' | 'wfh' | 'holiday';
  label?: string;
}

export interface TeamCalendarResponse {
  events: CalendarEvent[];
  month: number;
  year: number;
}

export interface UrgentAlert {
  id: string;
  type: 'overdue_approval' | 'probation_ending' | 'work_permit_expiring' | 'training_due' | 'birthday' | 'anniversary';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  relatedEmployeeId?: string;
  dueDate?: string;
}

export interface OrgNode {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  children?: OrgNode[];
}

const MGR_BASE = '/v1/manager';

export const managerDashboardApi = {
  getTeamSummary: () =>
    api.get<TeamSummary>(`${MGR_BASE}/team-summary`),

  getTeamMembers: () =>
    api.get<TeamMember[]>(`${MGR_BASE}/team-members`),

  getTeamCalendar: (month: number, year: number) =>
    api.get<TeamCalendarResponse>(`${MGR_BASE}/team-calendar?month=${month}&year=${year}`),

  getUrgentAlerts: () =>
    api.get<UrgentAlert[]>(`${MGR_BASE}/alerts`),

  getOrgChart: () =>
    api.get<OrgNode>(`${MGR_BASE}/org-chart`),
};

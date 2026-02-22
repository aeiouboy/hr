export class TeamSummaryDto {
  total_members: number;
  active_count: number;
  on_leave_count: number;
  pending_approvals_count: number;
  on_probation_count: number;
}

export class UrgentAlertDto {
  id: string;
  type: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  related_id?: string;
  created_at: Date;
}

export class DashboardResponseDto {
  team_summary: TeamSummaryDto;
  urgent_alerts: UrgentAlertDto[];
  pending_approvals: PendingApprovalResponseDto[];
  direct_reports: DirectReportDto[];
}

export class PendingApprovalResponseDto {
  id: string;
  request_type: string;
  requester_id: string;
  requester_name?: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  submitted_at: Date;
  due_date?: Date;
}

export class DirectReportDto {
  employee_id: string;
  first_name_en?: string;
  first_name_th?: string;
  last_name_en?: string;
  last_name_th?: string;
  job_title?: string;
  department?: string;
  status: string;
  photo_url?: string;
}

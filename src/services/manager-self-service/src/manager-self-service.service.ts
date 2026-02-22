import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class ManagerSelfServiceService {
  constructor(private readonly prisma: PrismaService) {}

  private isManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('manager') || user.roles.includes('hr_manager');
  }

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private assertManager(user: CurrentUserInterface): void {
    if (!this.isManager(user) && !this.isHr(user)) {
      throw new ForbiddenException('Only managers can access this resource');
    }
  }

  async getDashboard(managerId: string, currentUser: CurrentUserInterface) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot access another manager\'s dashboard');
    }

    const [teamMembers, pendingApprovals] = await Promise.all([
      this.prisma.teamMember.findMany({
        where: { manager_id: managerId },
      }),
      this.prisma.pendingApproval.findMany({
        where: { approver_id: managerId, status: 'pending' },
        orderBy: { submitted_at: 'desc' },
      }),
    ]);

    // Fetch current leave entries for team members
    const teamMemberIds = teamMembers.map((m: any) => m.employee_id);
    const currentLeaves = await this.prisma.teamLeaveEntry.findMany({
      where: {
        employee_id: { in: teamMemberIds },
        status: 'approved',
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
    });

    const activeMembers = teamMembers.filter((m: any) => m.status === 'active');
    const onProbation = teamMembers.filter((m: any) => m.probation_end && m.probation_end > new Date());

    // Build urgent alerts from overdue or expiring approvals
    const urgentAlerts = pendingApprovals
      .filter((a: any) => a.priority === 'high' || (a.due_date && a.due_date <= new Date()))
      .map((a: any) => ({
        id: a.id,
        type: a.request_type,
        message: `${a.request_type} request from ${a.requester_name || a.requester_id} requires attention`,
        priority: (a.due_date && a.due_date <= new Date()) ? 'high' as const : (a.priority as 'high' | 'medium' | 'low'),
        related_id: a.id,
        created_at: a.submitted_at,
      }));

    return {
      team_summary: {
        total_members: teamMembers.length,
        active_count: activeMembers.length,
        on_leave_count: currentLeaves.length,
        pending_approvals_count: pendingApprovals.length,
        on_probation_count: onProbation.length,
      },
      urgent_alerts: urgentAlerts,
      pending_approvals: pendingApprovals.map((a: any) => ({
        id: a.id,
        request_type: a.request_type,
        requester_id: a.requester_id,
        requester_name: a.requester_name,
        title: a.title,
        description: a.description,
        status: a.status,
        priority: a.priority,
        submitted_at: a.submitted_at,
        due_date: a.due_date,
      })),
      direct_reports: teamMembers.map((m: any) => ({
        employee_id: m.employee_id,
        first_name_en: m.first_name_en,
        first_name_th: m.first_name_th,
        last_name_en: m.last_name_en,
        last_name_th: m.last_name_th,
        job_title: m.job_title,
        department: m.department,
        status: m.status,
        photo_url: m.photo_url,
      })),
    };
  }

  async getTeamMembers(managerId: string, currentUser: CurrentUserInterface) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot access another manager\'s team');
    }

    const members = await this.prisma.teamMember.findMany({
      where: { manager_id: managerId },
      orderBy: { first_name_en: 'asc' },
    });

    return members.map((m: any) => ({
      employee_id: m.employee_id,
      first_name_en: m.first_name_en,
      first_name_th: m.first_name_th,
      last_name_en: m.last_name_en,
      last_name_th: m.last_name_th,
      job_title: m.job_title,
      department: m.department,
      status: m.status,
      photo_url: m.photo_url,
      hire_date: m.hire_date,
      probation_end: m.probation_end,
    }));
  }

  async getPendingApprovals(managerId: string, currentUser: CurrentUserInterface, filters?: { type?: string; priority?: string }) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot access another manager\'s approvals');
    }

    const where: any = { approver_id: managerId, status: 'pending' };
    if (filters?.type) {
      where.request_type = filters.type;
    }
    if (filters?.priority) {
      where.priority = filters.priority;
    }

    return this.prisma.pendingApproval.findMany({
      where,
      orderBy: { submitted_at: 'desc' },
    });
  }

  async approveReject(approvalId: string, action: 'approved' | 'rejected', currentUser: CurrentUserInterface, comment?: string) {
    this.assertManager(currentUser);

    const approval = await this.prisma.pendingApproval.findUnique({
      where: { id: approvalId },
    });

    if (!approval) {
      throw new NotFoundException('Approval request not found');
    }

    if (approval.approver_id !== currentUser.id && !this.isHr(currentUser)) {
      throw new ForbiddenException('Not authorized to act on this approval');
    }

    if (approval.status !== 'pending') {
      throw new BadRequestException('This request has already been resolved');
    }

    const updated = await this.prisma.pendingApproval.update({
      where: { id: approvalId },
      data: {
        status: action,
        resolved_at: new Date(),
        resolved_by: currentUser.id,
      },
    });

    await this.prisma.managerAuditLog.create({
      data: {
        manager_id: currentUser.id,
        action: action === 'approved' ? 'approve_request' : 'reject_request',
        entity_type: 'pending_approval',
        entity_id: approvalId,
        details: { comment, request_type: approval.request_type, requester_id: approval.requester_id },
      },
    });

    return updated;
  }

  async bulkApproveReject(approvalIds: string[], action: 'approved' | 'rejected', currentUser: CurrentUserInterface, comment?: string) {
    this.assertManager(currentUser);

    if (approvalIds.length > 50) {
      throw new BadRequestException('Cannot process more than 50 approvals at once');
    }

    const approvals: any[] = await this.prisma.pendingApproval.findMany({
      where: { id: { in: approvalIds } },
    });

    // Validate all belong to this manager and are pending
    const unauthorized = approvals.filter((a: any) => a.approver_id !== currentUser.id && !this.isHr(currentUser));
    if (unauthorized.length > 0) {
      throw new ForbiddenException('Not authorized to act on some of these approvals');
    }

    const nonPending = approvals.filter((a: any) => a.status !== 'pending');
    if (nonPending.length > 0) {
      throw new BadRequestException(`${nonPending.length} request(s) have already been resolved`);
    }

    const notFound = approvalIds.filter((id: string) => !approvals.find((a: any) => a.id === id));
    if (notFound.length > 0) {
      throw new NotFoundException(`${notFound.length} approval(s) not found`);
    }

    // Update all in a transaction
    const results: any[] = await this.prisma.$transaction(
      approvalIds.map((id: string) =>
        this.prisma.pendingApproval.update({
          where: { id },
          data: {
            status: action,
            resolved_at: new Date(),
            resolved_by: currentUser.id,
          },
        }),
      ),
    );

    // Audit log for bulk action
    await this.prisma.managerAuditLog.create({
      data: {
        manager_id: currentUser.id,
        action: `bulk_${action}`,
        entity_type: 'pending_approval',
        entity_id: null,
        details: { approval_ids: approvalIds, comment, count: approvalIds.length },
      },
    });

    return { processed: results.length, action };
  }

  async getTeamCalendar(managerId: string, currentUser: CurrentUserInterface, query?: { start_date?: string; end_date?: string }) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot access another manager\'s team calendar');
    }

    const teamMembers = await this.prisma.teamMember.findMany({
      where: { manager_id: managerId },
    });

    const teamMemberIds = teamMembers.map((m: any) => m.employee_id);

    const where: any = {
      employee_id: { in: teamMemberIds },
    };

    if (query?.start_date) {
      where.end_date = { gte: new Date(query.start_date) };
    }
    if (query?.end_date) {
      where.start_date = { lte: new Date(query.end_date) };
    }

    return this.prisma.teamLeaveEntry.findMany({
      where,
      orderBy: { start_date: 'asc' },
    });
  }

  async getDashboardConfig(managerId: string, currentUser: CurrentUserInterface) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot access another manager\'s config');
    }

    let config = await this.prisma.managerDashboardConfig.findUnique({
      where: { manager_id: managerId },
    });

    if (!config) {
      config = await this.prisma.managerDashboardConfig.create({
        data: {
          manager_id: managerId,
          widgets: ['team_summary', 'pending_approvals', 'team_calendar', 'urgent_alerts'],
          preferences: { theme: 'default' },
        },
      });
    }

    return config;
  }

  async updateDashboardConfig(managerId: string, data: { widgets?: any; preferences?: any }, currentUser: CurrentUserInterface) {
    this.assertManager(currentUser);

    if (currentUser.id !== managerId) {
      throw new ForbiddenException('Cannot update another manager\'s config');
    }

    return this.prisma.managerDashboardConfig.upsert({
      where: { manager_id: managerId },
      update: data,
      create: {
        manager_id: managerId,
        widgets: data.widgets || [],
        preferences: data.preferences || {},
      },
    });
  }
}

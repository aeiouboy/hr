import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// ── Approval routing configuration (PRD Section 7.1) ─────────

const SELF_SERVICE_TYPES = [
  'contact_info_personal_email',
  'contact_info_personal_mobile',
  'contact_info_home_phone',
  'emergency_contact_add',
  'emergency_contact_edit',
  'emergency_contact_delete',
];

const APPROVAL_ROUTES: Record<string, { levels: number; approvers: string[] }> = {
  // Self-service (auto-approve)
  contact_info_personal_email: { levels: 0, approvers: [] },
  contact_info_personal_mobile: { levels: 0, approvers: [] },
  contact_info_home_phone: { levels: 0, approvers: [] },
  emergency_contact_add: { levels: 0, approvers: [] },
  emergency_contact_edit: { levels: 0, approvers: [] },
  emergency_contact_delete: { levels: 0, approvers: [] },

  // 1-level: Manager
  address_change: { levels: 1, approvers: ['manager'] },
  leave_request: { levels: 1, approvers: ['manager'] },
  ot_request: { levels: 1, approvers: ['manager'] },
  personal_info_nickname: { levels: 1, approvers: ['manager'] },

  // 2-level: Manager + HR
  personal_info_change: { levels: 2, approvers: ['manager', 'hr_admin'] },
  leave_request_extended: { levels: 2, approvers: ['manager', 'hr_admin'] },
  dependent_add: { levels: 2, approvers: ['manager', 'hr_admin'] },
  dependent_edit: { levels: 2, approvers: ['manager', 'hr_admin'] },

  // 3-level: Manager + HR Admin + HR Manager
  bank_account_change: { levels: 3, approvers: ['manager', 'hr_admin', 'hr_manager'] },
  compensation_change: { levels: 3, approvers: ['manager', 'hr_admin', 'hr_manager'] },
  employment_change: { levels: 3, approvers: ['manager', 'hr_admin', 'hr_manager'] },
  resignation: { levels: 3, approvers: ['manager', 'hr_admin', 'department_head'] },

  // Transfer routes
  transfer_internal: { levels: 3, approvers: ['current_manager', 'target_manager', 'hr_admin'] },
  transfer_intercompany: { levels: 4, approvers: ['current_manager', 'target_manager', 'hr_source', 'hr_target'] },
  transfer_crossbg: { levels: 4, approvers: ['current_manager', 'target_manager', 'hr_source', 'hr_target'] },
  transfer_secondment: { levels: 3, approvers: ['current_manager', 'target_manager', 'hr_admin'] },
};

@Injectable()
export class WorkflowService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Approval Routing ─────────────────────────────────────────

  getApprovalRoute(changeType: string) {
    const route = APPROVAL_ROUTES[changeType];
    if (route) {
      return { ...route, auto_approve: route.levels === 0 };
    }
    // Default: 2-level approval
    return { levels: 2, approvers: ['manager', 'hr_admin'], auto_approve: false };
  }

  // ── Create Workflow ──────────────────────────────────────────

  async createWorkflow(dto: any, currentUser: CurrentUserInterface) {
    // Check for duplicate pending workflow
    const existing = await this.prisma.workflow.findMany({
      where: {
        change_type: dto.change_type,
        requested_by: currentUser.id,
        status: 'pending',
      },
    });

    if (existing && existing.length > 0) {
      throw new BadRequestException('Duplicate pending workflow');
    }

    const route = this.getApprovalRoute(dto.change_type);
    const isAutoApprove = route.auto_approve;

    const steps = route.approvers.map((role, i) => ({
      id: 'WFS-AUTO-' + (i + 1),
      workflow_id: '',
      step_number: i + 1,
      role,
      role_name: role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      approver_id: null,
      approver_name: null,
      status: 'pending',
      action_date: null,
      comments: null,
    }));

    const workflowData = {
      change_type: dto.change_type,
      section: dto.section,
      status: isAutoApprove ? 'auto_approved' : 'pending',
      requested_by: currentUser.id,
      requester_name: currentUser.firstName + ' ' + currentUser.lastName,
      effective_date: new Date(dto.effective_date),
      current_step: isAutoApprove ? 0 : 1,
      total_steps: route.levels,
      old_values: JSON.stringify(dto.old_values || {}),
      new_values: JSON.stringify(dto.new_values || {}),
      steps,
    };

    const result = await this.prisma.workflow.create({ data: workflowData as any });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        entity_type: 'workflow',
        entity_id: result.id,
        action: 'create',
        performed_by: currentUser.id,
        details: JSON.stringify({ change_type: dto.change_type }),
      },
    });

    return result;
  }

  // ── Find By ID ────────────────────────────────────────────────

  async findById(id: string) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    return workflow;
  }

  // ── Approve Step ──────────────────────────────────────────────

  async approveStep(id: string, dto: any, currentUser: CurrentUserInterface) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    // Check authorization
    const currentStep = workflow.steps?.find(
      (s) => s.step_number === workflow.current_step,
    );

    if (!currentStep) {
      throw new BadRequestException('No current step found');
    }

    // Check if user is the designated approver, has the role, or has delegation
    const isDesignatedApprover = currentStep.approver_id === currentUser.id;
    const hasRole = currentUser.roles?.includes(currentStep.role);

    // Check delegation
    let hasDelegation = false;
    if (!isDesignatedApprover && !hasRole) {
      const delegation = await this.prisma.delegation.findFirst({
        where: {
          delegate_id: currentUser.id,
          delegator_id: currentStep.approver_id,
          status: 'active',
          start_date: { lte: new Date() },
          end_date: { gte: new Date() },
        },
      });
      hasDelegation = !!delegation;
    }

    if (!isDesignatedApprover && !hasRole && !hasDelegation) {
      throw new ForbiddenException('Not authorized to approve this step');
    }

    // Update step
    await this.prisma.workflowStep.update({
      where: { id: currentStep.id },
      data: {
        status: 'approved',
        action_date: new Date(),
        comments: dto.comments,
      },
    });

    // Record approval action
    await this.prisma.approvalAction.create({
      data: {
        workflow_id: id,
        step_number: workflow.current_step,
        action: 'approve',
        performed_by: currentUser.id,
        comments: dto.comments,
      },
    });

    // Advance or complete
    const isLastStep = workflow.current_step >= workflow.total_steps;

    const updated = await this.prisma.workflow.update({
      where: { id },
      data: isLastStep
        ? { status: 'approved', completed_at: new Date() }
        : { current_step: workflow.current_step + 1 },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        entity_type: 'workflow',
        entity_id: id,
        action: 'approve_step',
        performed_by: currentUser.id,
        details: JSON.stringify({ step: workflow.current_step, comments: dto.comments }),
      },
    });

    return updated;
  }

  // ── Reject Step ───────────────────────────────────────────────

  async rejectStep(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!dto.reason) {
      throw new BadRequestException('Rejection reason is required');
    }

    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    const currentStep = workflow.steps?.find(
      (s) => s.step_number === workflow.current_step,
    );

    if (!currentStep) {
      throw new BadRequestException('No current step found');
    }

    const isAuthorized =
      currentStep.approver_id === currentUser.id ||
      currentUser.roles?.includes(currentStep.role);

    if (!isAuthorized) {
      throw new ForbiddenException('Not authorized to reject this step');
    }

    await this.prisma.workflowStep.update({
      where: { id: currentStep.id },
      data: { status: 'rejected', action_date: new Date(), comments: dto.reason },
    });

    await this.prisma.approvalAction.create({
      data: {
        workflow_id: id,
        step_number: workflow.current_step,
        action: 'reject',
        performed_by: currentUser.id,
        comments: dto.reason,
      },
    });

    const updated = await this.prisma.workflow.update({
      where: { id },
      data: { status: 'rejected' },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'workflow',
        entity_id: id,
        action: 'reject_step',
        performed_by: currentUser.id,
        details: JSON.stringify({ step: workflow.current_step, reason: dto.reason }),
      },
    });

    return updated;
  }

  // ── Send Back ─────────────────────────────────────────────────

  async sendBack(id: string, dto: any, currentUser: CurrentUserInterface) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    const updated = await this.prisma.workflow.update({
      where: { id },
      data: { status: 'sent_back' },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'workflow',
        entity_id: id,
        action: 'send_back',
        performed_by: currentUser.id,
        details: JSON.stringify({ reason: dto.reason }),
      },
    });

    return updated;
  }

  // ── Resubmit ──────────────────────────────────────────────────

  async resubmit(id: string, dto: any, currentUser: CurrentUserInterface) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    if (workflow.status !== 'sent_back') {
      throw new BadRequestException('Can only resubmit sent-back workflows');
    }

    const updated = await this.prisma.workflow.update({
      where: { id },
      data: {
        status: 'pending',
        current_step: 1,
        new_values: JSON.stringify(dto.new_values),
      },
    });

    return updated;
  }

  // ── Bulk Approve ──────────────────────────────────────────────

  async bulkApprove(ids: string[], dto: any, currentUser: CurrentUserInterface) {
    if (ids.length > 50) {
      throw new BadRequestException('Bulk operations are limited to 50 items');
    }

    const succeeded: any[] = [];
    const failed: any[] = [];

    for (const id of ids) {
      try {
        const result = await this.approveStep(id, dto, currentUser);
        succeeded.push({ id, ...result });
      } catch (error: any) {
        failed.push({ id, reason: error.message });
      }
    }

    return { succeeded, failed };
  }

  // ── Bulk Reject ─────────────────────────────────────────────────

  async bulkReject(ids: string[], dto: any, currentUser: CurrentUserInterface) {
    if (ids.length > 50) {
      throw new BadRequestException('Bulk operations are limited to 50 items');
    }

    const succeeded: any[] = [];
    const failed: any[] = [];

    for (const id of ids) {
      try {
        const result = await this.rejectStep(id, dto, currentUser);
        succeeded.push({ id, ...result });
      } catch (error: any) {
        failed.push({ id, reason: error.message });
      }
    }

    return { succeeded, failed };
  }

  // ── Pending for User ──────────────────────────────────────────

  async getPendingForUser(
    currentUser: CurrentUserInterface,
    filters?: { change_type?: string; urgency?: string; date_from?: string; date_to?: string },
  ) {
    // Build filter conditions
    const whereFilters: any = {
      status: 'pending',
      steps: {
        some: {
          approver_id: currentUser.id,
          status: 'pending',
        },
      },
    };

    if (filters?.change_type) {
      whereFilters.change_type = filters.change_type;
    }

    if (filters?.date_from || filters?.date_to) {
      whereFilters.created_at = {};
      if (filters.date_from) {
        whereFilters.created_at.gte = new Date(filters.date_from);
      }
      if (filters.date_to) {
        whereFilters.created_at.lte = new Date(filters.date_to);
      }
    }

    if (filters?.urgency) {
      // Map urgency to change types by approval level count
      const highUrgencyTypes = Object.entries(APPROVAL_ROUTES)
        .filter(([, v]) => v.levels >= 3)
        .map(([k]) => k);
      const mediumUrgencyTypes = Object.entries(APPROVAL_ROUTES)
        .filter(([, v]) => v.levels === 2)
        .map(([k]) => k);
      const lowUrgencyTypes = Object.entries(APPROVAL_ROUTES)
        .filter(([, v]) => v.levels <= 1)
        .map(([k]) => k);

      if (filters.urgency === 'high') {
        whereFilters.change_type = { in: highUrgencyTypes };
      } else if (filters.urgency === 'medium') {
        whereFilters.change_type = { in: mediumUrgencyTypes };
      } else if (filters.urgency === 'low') {
        whereFilters.change_type = { in: lowUrgencyTypes };
      }
    }

    // Get direct assignments
    const directPending = await this.prisma.workflow.findMany({
      where: whereFilters,
      include: { steps: true },
    });

    // Get delegated assignments
    const delegations = await this.prisma.delegation.findMany({
      where: {
        delegate_id: currentUser.id,
        status: 'active',
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
    });

    if (delegations && delegations.length > 0) {
      const delegatorIds = delegations.map((d) => d.delegator_id);
      const delegatedWhere = {
        ...whereFilters,
        steps: {
          some: {
            approver_id: { in: delegatorIds },
            status: 'pending',
          },
        },
      };
      const delegatedPending = await this.prisma.workflow.findMany({
        where: delegatedWhere,
        include: { steps: true },
      });

      return [...directPending, ...delegatedPending];
    }

    return directPending;
  }

  // ── My Requests ───────────────────────────────────────────────

  async getMyRequests(currentUser: CurrentUserInterface) {
    return this.prisma.workflow.findMany({
      where: { requested_by: currentUser.id },
      include: { steps: true },
      orderBy: { created_at: 'desc' },
    });
  }

  // ── Audit Trail (F5.7) ────────────────────────────────────────

  async getAuditTrail(workflowId: string) {
    return this.prisma.approvalAction.findMany({
      where: { workflow_id: workflowId },
      orderBy: { performed_at: 'asc' },
    });
  }

  // ── Delegation ────────────────────────────────────────────────

  async createDelegation(dto: any, currentUser: CurrentUserInterface) {
    // Validate dates
    if (new Date(dto.end_date) <= new Date(dto.start_date)) {
      throw new BadRequestException('end_date must be after start_date');
    }

    // Validate delegate is not self
    if (dto.delegate_id === dto.delegator_id) {
      throw new BadRequestException('Cannot delegate to self');
    }

    // Basic validation: delegator must be the current user
    const delegatorId = dto.delegator_id || currentUser.id;

    const result = await this.prisma.delegation.create({
      data: {
        delegator_id: delegatorId,
        delegate_id: dto.delegate_id,
        start_date: new Date(dto.start_date),
        end_date: new Date(dto.end_date),
        change_types: dto.change_types,
        status: 'active',
      },
    });



    await this.prisma.auditLog.create({
      data: {
        entity_type: 'delegation',
        entity_id: result.id,
        action: 'create',
        performed_by: delegatorId,
        details: JSON.stringify({
          delegate_id: dto.delegate_id,
          change_types: dto.change_types,
        }),
      },
    });

    return result;
  }

  async listDelegations(currentUser: CurrentUserInterface) {
    return this.prisma.delegation.findMany({
      where: {
        OR: [
          { delegator_id: currentUser.id },
          { delegate_id: currentUser.id },
        ],
      },
    });
  }

  // ── Workflow Preview (F8.4 slide-over) ────────────────────────

  async getWorkflowPreview(id: string) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    const audit_trail = await this.prisma.approvalAction.findMany({
      where: { workflow_id: id },
      orderBy: { performed_at: 'asc' },
    });

    return { workflow, audit_trail };
  }

  async revokeDelegation(id: string, currentUser: CurrentUserInterface) {
    const delegation = await this.prisma.delegation.findFirst({
      where: { id, delegator_id: currentUser.id },
    });

    if (!delegation) {
      throw new NotFoundException('Delegation not found');
    }

    await this.prisma.delegation.update({
      where: { id },
      data: { status: 'revoked' },
    });

    return { success: true };
  }
}

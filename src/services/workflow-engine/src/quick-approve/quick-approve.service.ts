import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

interface PendingFilter {
  type?: string;
  urgency?: 'urgent' | 'normal' | 'low';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface BulkApproveInput {
  ids: string[];
  reason?: string;
}

interface BulkRejectInput {
  ids: string[];
  reason: string;
}

interface CreateDelegationInput {
  delegate_to: string;
  start_date: string;
  end_date: string;
  workflow_types: string[];
}

@Injectable()
export class QuickApproveService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Urgency Calculation ────────────────────────────────────

  private calculateUrgency(createdAt: Date): 'urgent' | 'normal' | 'low' {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays > 3) return 'urgent';
    if (diffDays >= 1) return 'normal';
    return 'low';
  }

  private urgencyOrder(urgency: string): number {
    switch (urgency) {
      case 'urgent': return 0;
      case 'normal': return 1;
      case 'low': return 2;
      default: return 3;
    }
  }

  // ── Pending Requests Aggregation ───────────────────────────

  async getPendingRequests(currentUser: CurrentUserInterface, filter: PendingFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 20;

    // Build where clause for direct assignments
    const baseWhere: any = {
      status: 'pending',
      steps: {
        some: {
          approver_id: currentUser.id,
          status: 'pending',
        },
      },
    };

    if (filter.type) {
      baseWhere.change_type = filter.type;
    }

    if (filter.dateFrom || filter.dateTo) {
      baseWhere.created_at = {};
      if (filter.dateFrom) baseWhere.created_at.gte = new Date(filter.dateFrom);
      if (filter.dateTo) baseWhere.created_at.lte = new Date(filter.dateTo);
    }

    if (filter.search) {
      baseWhere.OR = [
        { requester_name: { contains: filter.search, mode: 'insensitive' } },
        { change_type: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    // Get direct pending workflows
    let workflows = await this.prisma.workflow.findMany({
      where: baseWhere,
      include: { steps: true },
      orderBy: { created_at: 'asc' },
    });

    // Get delegated workflows via ApprovalDelegation
    const activeDelegations = await (this.prisma as any).approvalDelegation?.findMany?.({
      where: {
        delegate_id: currentUser.id,
        is_active: true,
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
    }) || [];

    if (activeDelegations.length > 0) {
      const delegatorIds = activeDelegations.map((d: any) => d.delegator_id);
      const delegatedWhere = {
        ...baseWhere,
        steps: {
          some: {
            approver_id: { in: delegatorIds },
            status: 'pending',
          },
        },
      };

      const delegatedWorkflows = await this.prisma.workflow.findMany({
        where: delegatedWhere,
        include: { steps: true },
        orderBy: { created_at: 'asc' },
      });

      // Merge without duplicates
      const existingIds = new Set(workflows.map((w: any) => w.id));
      for (const dw of delegatedWorkflows) {
        if (!existingIds.has(dw.id)) {
          workflows.push(dw);
        }
      }
    }

    // Also check old delegation model
    const oldDelegations = await this.prisma.delegation.findMany({
      where: {
        delegate_id: currentUser.id,
        status: 'active',
        start_date: { lte: new Date() },
        end_date: { gte: new Date() },
      },
    });

    if (oldDelegations.length > 0) {
      const delegatorIds = oldDelegations.map((d: any) => d.delegator_id);
      const delegatedWorkflows = await this.prisma.workflow.findMany({
        where: {
          status: 'pending',
          steps: {
            some: {
              approver_id: { in: delegatorIds },
              status: 'pending',
            },
          },
        },
        include: { steps: true },
      });

      const existingIds = new Set(workflows.map((w: any) => w.id));
      for (const dw of delegatedWorkflows) {
        if (!existingIds.has(dw.id)) {
          workflows.push(dw);
        }
      }
    }

    // Calculate urgency for each workflow
    const enriched = workflows.map((wf: any) => ({
      ...wf,
      urgency: this.calculateUrgency(new Date(wf.created_at)),
    }));

    // Filter by urgency if specified
    let filtered = enriched;
    if (filter.urgency) {
      filtered = enriched.filter((wf) => wf.urgency === filter.urgency);
    }

    // Sort: urgent first, then by created_at ascending (oldest first)
    filtered.sort((a, b) => {
      const urgDiff = this.urgencyOrder(a.urgency) - this.urgencyOrder(b.urgency);
      if (urgDiff !== 0) return urgDiff;
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    // Type counts (on all enriched, before pagination)
    const typeCounts: Record<string, number> = {};
    for (const wf of enriched) {
      typeCounts[wf.change_type] = (typeCounts[wf.change_type] || 0) + 1;
    }

    // Paginate
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return { data, total, typeCounts, page, limit };
  }

  // ── Bulk Approve ───────────────────────────────────────────

  async bulkApprove(dto: BulkApproveInput, currentUser: CurrentUserInterface) {
    if (dto.ids.length > 50) {
      throw new BadRequestException('Maximum 50 items per batch');
    }

    return this.prisma.$transaction(async (tx: any) => {
      const workflows = await tx.workflow.findMany({
        where: { id: { in: dto.ids } },
        include: { steps: true },
      });

      const workflowMap = new Map(workflows.map((w: any) => [w.id, w]));

      let approved = 0;
      const failed: Array<{ id: string; reason: string }> = [];

      for (const id of dto.ids) {
        const wf = workflowMap.get(id);

        if (!wf) {
          failed.push({ id, reason: 'Workflow not found' });
          continue;
        }

        if (wf.status !== 'pending') {
          failed.push({ id, reason: `Workflow not in pending status (current: ${wf.status})` });
          continue;
        }

        const currentStep = wf.steps?.find((s: any) => s.step_number === wf.current_step && s.status === 'pending');
        if (!currentStep) {
          failed.push({ id, reason: 'No pending step found' });
          continue;
        }

        // Check authorization
        const isApprover = currentStep.approver_id === currentUser.id;
        const hasRole = currentUser.roles?.includes(currentStep.role);

        let hasDelegation = false;
        if (!isApprover && !hasRole) {
          const delegation = await tx.delegation?.findFirst?.({
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

        if (!isApprover && !hasRole && !hasDelegation) {
          failed.push({ id, reason: 'Not authorized to approve this workflow' });
          continue;
        }

        // Approve the step
        await tx.workflowStep.update({
          where: { id: currentStep.id },
          data: {
            status: 'approved',
            action_date: new Date(),
            comments: dto.reason,
          },
        });

        // Record approval action
        await tx.approvalAction.create({
          data: {
            workflow_id: id,
            step_number: wf.current_step,
            action: 'approve',
            performed_by: currentUser.id,
            comments: dto.reason,
          },
        });

        // Advance or complete
        const isLastStep = wf.current_step >= wf.total_steps;
        await tx.workflow.update({
          where: { id },
          data: isLastStep
            ? { status: 'approved', completed_at: new Date() }
            : { current_step: wf.current_step + 1 },
        });

        // Audit log
        await tx.auditLog.create({
          data: {
            entity_type: 'workflow',
            entity_id: id,
            action: 'bulk_approve',
            performed_by: currentUser.id,
            details: JSON.stringify({ reason: dto.reason }),
          },
        });

        approved++;
      }

      return { approved, failed };
    });
  }

  // ── Bulk Reject ────────────────────────────────────────────

  async bulkReject(dto: BulkRejectInput, currentUser: CurrentUserInterface) {
    if (dto.ids.length > 50) {
      throw new BadRequestException('Maximum 50 items per batch');
    }

    if (!dto.reason || dto.reason.trim() === '') {
      throw new BadRequestException('Reason is required for rejection');
    }

    return this.prisma.$transaction(async (tx: any) => {
      const workflows = await tx.workflow.findMany({
        where: { id: { in: dto.ids } },
        include: { steps: true },
      });

      const workflowMap = new Map(workflows.map((w: any) => [w.id, w]));

      let rejected = 0;
      const failed: Array<{ id: string; reason: string }> = [];

      for (const id of dto.ids) {
        const wf = workflowMap.get(id);

        if (!wf) {
          failed.push({ id, reason: 'Workflow not found' });
          continue;
        }

        if (wf.status !== 'pending') {
          failed.push({ id, reason: `Workflow not in pending status (current: ${wf.status})` });
          continue;
        }

        const currentStep = wf.steps?.find((s: any) => s.step_number === wf.current_step && s.status === 'pending');
        if (!currentStep) {
          failed.push({ id, reason: 'No pending step found' });
          continue;
        }

        const isApprover = currentStep.approver_id === currentUser.id;
        const hasRole = currentUser.roles?.includes(currentStep.role);

        if (!isApprover && !hasRole) {
          failed.push({ id, reason: 'Not authorized to reject this workflow' });
          continue;
        }

        await tx.workflowStep.update({
          where: { id: currentStep.id },
          data: {
            status: 'rejected',
            action_date: new Date(),
            comments: dto.reason,
          },
        });

        await tx.approvalAction.create({
          data: {
            workflow_id: id,
            step_number: wf.current_step,
            action: 'reject',
            performed_by: currentUser.id,
            comments: dto.reason,
          },
        });

        await tx.workflow.update({
          where: { id },
          data: { status: 'rejected' },
        });

        await tx.auditLog.create({
          data: {
            entity_type: 'workflow',
            entity_id: id,
            action: 'bulk_reject',
            performed_by: currentUser.id,
            details: JSON.stringify({ reason: dto.reason }),
          },
        });

        rejected++;
      }

      return { rejected, failed };
    });
  }

  // ── Request Detail (Slide-over Preview F8.4) ───────────────

  async getRequestDetail(id: string, currentUser: CurrentUserInterface) {
    const workflow = await this.prisma.workflow.findUnique({
      where: { id },
      include: { steps: true },
    });

    if (!workflow) {
      throw new NotFoundException('Workflow not found');
    }

    const timeline = await this.prisma.approvalAction.findMany({
      where: { workflow_id: id },
      orderBy: { performed_at: 'asc' },
    });

    const newValues = workflow.new_values ? JSON.parse(workflow.new_values as string) : {};
    const oldValues = workflow.old_values ? JSON.parse(workflow.old_values as string) : {};

    return {
      id: workflow.id,
      change_type: workflow.change_type,
      status: workflow.status,
      section: workflow.section,
      effective_date: workflow.effective_date,
      created_at: workflow.created_at,
      requester: {
        id: workflow.requested_by,
        name: workflow.requester_name,
      },
      steps: workflow.steps,
      timeline,
      details: newValues,
      old_values: oldValues,
      urgency: this.calculateUrgency(new Date(workflow.created_at)),
    };
  }

  // ── Delegation (F8.6) ──────────────────────────────────────

  async createDelegation(dto: CreateDelegationInput, currentUser: CurrentUserInterface) {
    // Validate not self-delegation
    if (dto.delegate_to === currentUser.id) {
      throw new BadRequestException('Cannot delegate to yourself');
    }

    // Validate date range
    if (new Date(dto.end_date) <= new Date(dto.start_date)) {
      throw new BadRequestException('end_date must be after start_date');
    }

    // Check for circular delegation
    const reverseActive = await (this.prisma as any).approvalDelegation.findFirst({
      where: {
        delegator_id: dto.delegate_to,
        delegate_id: currentUser.id,
        is_active: true,
      },
    });

    if (reverseActive) {
      throw new BadRequestException('Circular delegation is not allowed');
    }

    const result = await (this.prisma as any).approvalDelegation.create({
      data: {
        delegator_id: currentUser.id,
        delegate_id: dto.delegate_to,
        start_date: new Date(dto.start_date),
        end_date: new Date(dto.end_date),
        workflow_types: dto.workflow_types,
        is_active: true,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'approval_delegation',
        entity_id: result.id,
        action: 'create',
        performed_by: currentUser.id,
        details: JSON.stringify({
          delegate_to: dto.delegate_to,
          workflow_types: dto.workflow_types,
        }),
      },
    });

    return result;
  }

  async getDelegations(currentUser: CurrentUserInterface) {
    return (this.prisma as any).approvalDelegation.findMany({
      where: {
        OR: [
          { delegator_id: currentUser.id },
          { delegate_id: currentUser.id },
        ],
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async revokeDelegation(id: string, currentUser: CurrentUserInterface) {
    const delegation = await (this.prisma as any).approvalDelegation.findFirst({
      where: { id, delegator_id: currentUser.id, is_active: true },
    });

    if (!delegation) {
      throw new NotFoundException('Delegation not found');
    }

    return (this.prisma as any).approvalDelegation.update({
      where: { id },
      data: {
        is_active: false,
        revoked_at: new Date(),
        revoked_by: currentUser.id,
      },
    });
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OcrService } from '../ocr/ocr.service';
import { PolicyService } from '../policy/policy.service';
import { type CurrentUserInterface } from 'hrms-shared';

const ALLOWED_CLAIM_TYPES = ['medical', 'travel', 'meal', 'equipment', 'other'];
const APPROVER_ROLES = ['manager', 'hr_admin', 'hr_manager', 'finance_director'];

@Injectable()
export class ClaimsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ocrService: OcrService,
    private readonly policyService: PolicyService,
  ) {}

  async createClaim(dto: any, currentUser: CurrentUserInterface) {
    if (!ALLOWED_CLAIM_TYPES.includes(dto.claim_type)) {
      throw new BadRequestException(`Invalid claim_type: ${dto.claim_type}`);
    }

    if (dto.amount < 0) {
      throw new BadRequestException('Amount must be non-negative');
    }

    const claim = await this.prisma.claimRequest.create({
      data: {
        employee_id: currentUser.id,
        claim_type: dto.claim_type,
        amount: dto.amount,
        currency: 'THB',
        receipt_date: new Date(dto.receipt_date),
        receipt_url: dto.receipt_url || null,
        status: 'draft',
      },
    });

    // Trigger OCR if receipt is provided
    if (dto.receipt_url) {
      await this.ocrService.processReceipt(claim.id, dto.receipt_url);
    }

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        entity_type: 'claim',
        entity_id: claim.id,
        action: 'create',
        performed_by: currentUser.id,
        details: JSON.stringify({ claim_type: dto.claim_type, amount: dto.amount }),
      },
    });

    return claim;
  }

  async submitClaim(id: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.employee_id !== currentUser.id) {
      throw new ForbiddenException('Not authorized to submit this claim');
    }

    if (claim.status !== 'draft') {
      throw new BadRequestException('Only draft claims can be submitted');
    }

    // Policy validation
    const validation = await this.policyService.validateClaim({
      claim_type: claim.claim_type,
      amount: Number(claim.amount),
      employee_id: claim.employee_id,
    });

    if (!validation.valid) {
      throw new BadRequestException(validation.errors.join('; '));
    }

    // Check auto-approve
    const rule = await this.policyService.getApplicableRule(claim.claim_type);
    const isAutoApprove =
      rule &&
      (rule as any).auto_approve_threshold &&
      Number(claim.amount) <= (rule as any).auto_approve_threshold;

    const updateData: any = {
      submitted_at: new Date(),
    };

    if (isAutoApprove) {
      updateData.status = 'approved';
      updateData.approved_at = new Date();
      updateData.approved_by = 'system';
    } else {
      updateData.status = 'submitted';
    }

    const updated = await this.prisma.claimRequest.update({
      where: { id },
      data: updateData,
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'claim',
        entity_id: id,
        action: isAutoApprove ? 'auto_approve' : 'submit',
        performed_by: currentUser.id,
      },
    });

    return updated;
  }

  async approveClaim(id: string, dto: any, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.status !== 'submitted') {
      throw new BadRequestException('Only submitted claims can be approved');
    }

    // Check that user has an approver role
    const hasApproverRole = currentUser.roles?.some((r) => APPROVER_ROLES.includes(r));
    if (!hasApproverRole) {
      throw new ForbiddenException('Not authorized to approve claims');
    }

    const updated = await this.prisma.claimRequest.update({
      where: { id },
      data: {
        status: 'approved',
        approved_at: new Date(),
        approved_by: currentUser.id,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'claim',
        entity_id: id,
        action: 'approve',
        performed_by: currentUser.id,
        details: JSON.stringify({ comments: dto.comments }),
      },
    });

    return updated;
  }

  async rejectClaim(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!dto.reason) {
      throw new BadRequestException('Rejection reason is required');
    }

    const claim = await this.prisma.claimRequest.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.status !== 'submitted') {
      throw new BadRequestException('Only submitted claims can be rejected');
    }

    const hasApproverRole = currentUser.roles?.some((r) => APPROVER_ROLES.includes(r));
    if (!hasApproverRole) {
      throw new ForbiddenException('Not authorized to reject claims');
    }

    const updated = await this.prisma.claimRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        rejection_reason: dto.reason,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'claim',
        entity_id: id,
        action: 'reject',
        performed_by: currentUser.id,
        details: JSON.stringify({ reason: dto.reason }),
      },
    });

    return updated;
  }

  async findById(id: string) {
    const claim = await this.prisma.claimRequest.findUnique({
      where: { id },
      include: { ocr_result: true, policy_rule: true },
    });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    return claim;
  }

  async getMyClaimHistory(currentUser: CurrentUserInterface) {
    return this.prisma.claimRequest.findMany({
      where: { employee_id: currentUser.id },
      orderBy: { created_at: 'desc' },
      include: { ocr_result: true },
    });
  }

  async getYtdSpending(employeeId: string, claimType: string) {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const result = await this.prisma.claimRequest.aggregate({
      where: {
        employee_id: employeeId,
        claim_type: claimType,
        status: 'approved',
        receipt_date: { gte: startOfYear },
      },
      _sum: { amount: true },
    });

    const total = Number(result._sum?.amount) || 0;

    return {
      total,
      claim_type: claimType,
    };
  }

  async getPendingClaims(currentUser: CurrentUserInterface) {
    const hasApproverRole = currentUser.roles?.some((r) => APPROVER_ROLES.includes(r));
    if (!hasApproverRole) {
      throw new ForbiddenException('Not authorized to view pending claims');
    }

    return this.prisma.claimRequest.findMany({
      where: { status: 'submitted' },
      orderBy: { created_at: 'desc' },
      include: { ocr_result: true },
    });
  }

  async updateClaim(id: string, dto: any, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.employee_id !== currentUser.id) {
      throw new ForbiddenException('Not authorized to update this claim');
    }

    if (claim.status !== 'draft') {
      throw new BadRequestException('Only draft claims can be updated');
    }

    return this.prisma.claimRequest.update({
      where: { id },
      data: dto,
    });
  }

  async deleteClaim(id: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id } });

    if (!claim) {
      throw new NotFoundException('Claim not found');
    }

    if (claim.employee_id !== currentUser.id) {
      throw new ForbiddenException('Not authorized to delete this claim');
    }

    if (claim.status !== 'draft') {
      throw new BadRequestException('Only draft claims can be deleted');
    }

    return this.prisma.claimRequest.update({
      where: { id },
      data: { status: 'deleted' },
    });
  }
}

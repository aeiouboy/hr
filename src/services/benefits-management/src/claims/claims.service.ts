import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ClaimFilterDto } from './dto/claim-filter.dto';

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 10_000_000; // 10MB
const AUTO_APPROVE_THRESHOLD = 1000; // THB
const FINANCE_THRESHOLD = 25000; // THB

@Injectable()
export class SmartClaimsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Receipt Upload & OCR ──────────────────────────────────────────

  async uploadReceipt(claimId: string, file: any, currentUser: CurrentUserInterface) {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
      throw new BadRequestException('Unsupported file format. Only JPG, PNG, and PDF are allowed.');
    }
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('File size exceeds 10MB limit.');
    }

    const ext = file.originalname.split('.').pop()?.toLowerCase() || '';

    return this.prisma.oCRResult.create({
      data: {
        receipt_file_name: file.originalname,
        receipt_file_type: ext,
        receipt_file_size: file.size,
      },
    });
  }

  async processOCR(ocrResultId: string) {
    const result = await this.prisma.oCRResult.findUnique({
      where: { id: ocrResultId },
    });
    if (!result) {
      throw new NotFoundException('OCR result not found');
    }

    const autoPopulate = (result as any).confidence_score >= 0.8;

    return {
      ...result,
      auto_populate: autoPopulate,
      warning: autoPopulate ? undefined : 'Low confidence OCR result. Please verify extracted data manually.',
    };
  }

  // ── Policy Validation ─────────────────────────────────────────────

  async validateClaim(claim: any) {
    const rules = await this.prisma.policyRule.findMany({
      where: { is_active: true },
    });

    const results: any[] = [];

    for (const rule of rules) {
      if (rule.category && rule.category !== claim.category) {
        continue;
      }

      const isBlocking = rule.rule_type === 'hard_limit' || rule.rule_type === 'required_document' || rule.rule_type === 'category_restriction';
      let passed = true;
      let message: string | undefined;

      switch (rule.condition_field) {
        case 'max_amount': {
          const maxAmount = parseFloat(rule.condition_value);
          passed = claim.amount <= maxAmount;
          if (!passed) message = `Amount ${claim.amount} exceeds max ${maxAmount}`;
          break;
        }
        case 'monthly_cap': {
          const monthlyCap = parseFloat(rule.condition_value);
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

          const approved = await this.prisma.claimRequest.findMany({
            where: {
              employee_id: claim.employee_id,
              status: 'approved',
              created_at: { gte: startOfMonth, lte: endOfMonth },
            },
          });
          const spent = approved.reduce(
            (s: number, c: any) => s + (typeof c.amount === 'number' ? c.amount : parseFloat(c.amount)),
            0,
          );
          passed = spent + claim.amount <= monthlyCap;
          if (!passed) message = `Total monthly spending exceeds monthly cap ${monthlyCap}`;
          break;
        }
        case 'required_docs': {
          passed = !!claim.receipt_id;
          if (!passed) message = 'Required receipt document is missing';
          break;
        }
        case 'eligible_categories': {
          const eligible: string[] = JSON.parse(rule.condition_value);
          passed = eligible.includes(claim.category);
          if (!passed) message = `Category '${claim.category}' is not eligible`;
          break;
        }
      }

      results.push({
        rule_name: rule.name,
        passed,
        is_blocking: isBlocking,
        message,
      });
    }

    return results;
  }

  // ── Claim CRUD ────────────────────────────────────────────────────

  async createClaim(dto: CreateClaimDto, currentUser: CurrentUserInterface) {
    return this.prisma.claimRequest.create({
      data: {
        employee_id: (currentUser as any).employee_id,
        category: dto.category,
        amount: dto.amount,
        currency: dto.currency || 'THB',
        description: dto.description,
        status: 'draft',
      },
    });
  }

  async submitClaim(claimId: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id: claimId } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'draft') {
      throw new BadRequestException('Only draft claims can be submitted');
    }

    // Trigger policy validation
    await this.validateClaim(claim);

    return this.prisma.claimRequest.update({
      where: { id: claimId },
      data: {
        status: 'submitted',
        submitted_at: new Date(),
      },
    });
  }

  async processClaim(claimId: string) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id: claimId } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'submitted') {
      throw new BadRequestException('Only submitted claims can be processed');
    }

    const amount = typeof claim.amount === 'number' ? claim.amount : parseFloat(claim.amount as any);

    // Auto-approve logic
    if (amount <= AUTO_APPROVE_THRESHOLD) {
      const validationResults = await this.validateClaim(claim);
      const hasBlockingFailure = validationResults.some((r: any) => r.is_blocking && !r.passed);

      if (!hasBlockingFailure) {
        return this.prisma.claimRequest.update({
          where: { id: claimId },
          data: {
            status: 'approved',
            auto_approved: true,
            approved_at: new Date(),
          },
        });
      }
    }

    // Finance approval routing
    const updateData: any = { status: 'processing' };
    if (amount > FINANCE_THRESHOLD) {
      updateData.requires_finance_approval = true;
    }

    return this.prisma.claimRequest.update({
      where: { id: claimId },
      data: updateData,
    });
  }

  async approveClaim(claimId: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id: claimId } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'processing') {
      throw new BadRequestException('Only processing claims can be approved');
    }

    return this.prisma.claimRequest.update({
      where: { id: claimId },
      data: {
        status: 'approved',
        approved_by: currentUser.id,
        approved_at: new Date(),
      },
    });
  }

  async rejectClaim(claimId: string, reason: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({ where: { id: claimId } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'processing') {
      throw new BadRequestException('Only processing claims can be rejected');
    }

    return this.prisma.claimRequest.update({
      where: { id: claimId },
      data: {
        status: 'rejected',
        rejected_by: currentUser.id,
        rejected_reason: reason,
      },
    });
  }

  // ── History & Reporting ───────────────────────────────────────────

  async getClaimHistory(employeeId: string, filters: ClaimFilterDto, currentUser: CurrentUserInterface) {
    const where: any = { employee_id: employeeId };

    if (filters.status) where.status = filters.status;
    if (filters.category) where.category = filters.category;
    if (filters.from || filters.to) {
      where.created_at = {};
      if (filters.from) where.created_at.gte = new Date(filters.from);
      if (filters.to) where.created_at.lte = new Date(filters.to);
    }

    const [data, total] = await Promise.all([
      this.prisma.claimRequest.findMany({
        where,
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.claimRequest.count({ where }),
    ]);

    return { data, total, page: filters.page };
  }

  async getYTDSpending(employeeId: string, currentUser: CurrentUserInterface) {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const claims = await this.prisma.claimRequest.findMany({
      where: {
        employee_id: employeeId,
        status: 'approved',
        created_at: { gte: startOfYear },
      },
    });

    const byCategory = new Map<string, number>();
    for (const claim of claims) {
      const amount = typeof claim.amount === 'number' ? claim.amount : parseFloat(claim.amount as any);
      const current = byCategory.get(claim.category) || 0;
      byCategory.set(claim.category, current + amount);
    }

    return Array.from(byCategory.entries()).map(([category, total]) => ({ category, total }));
  }

  async getClaimById(claimId: string, currentUser: CurrentUserInterface) {
    const claim = await this.prisma.claimRequest.findUnique({
      where: { id: claimId },
      include: {
        policy_checks: true,
        ocr_result: true,
      },
    });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    return claim;
  }
}

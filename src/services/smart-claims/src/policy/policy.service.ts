import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ValidateClaimInput {
  claim_type: string;
  amount: number;
  employee_id: string;
  has_receipt?: boolean;
  has_doctor_cert?: boolean;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

@Injectable()
export class PolicyService {
  constructor(private readonly prisma: PrismaService) {}

  async getApplicableRule(claimType: string) {
    const now = new Date();
    return this.prisma.policyRule.findFirst({
      where: {
        claim_type: claimType,
        is_active: true,
        effective_from: { lte: now },
        OR: [{ effective_to: null }, { effective_to: { gte: now } }],
      },
    });
  }

  async validateClaim(input: ValidateClaimInput): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    const rule = await this.getApplicableRule(input.claim_type);

    if (!rule) {
      return { valid: true, errors: [], warnings: [] };
    }

    // Check max_amount per claim
    if (input.amount > (rule as any).max_amount) {
      errors.push(
        `Amount ${input.amount} exceeds max_amount of ${(rule as any).max_amount} THB per claim`,
      );
    }

    // Check monthly cap
    const monthlySpent = await this.getMonthlySpending(input.employee_id, input.claim_type);
    if (monthlySpent + input.amount > (rule as any).max_amount_per_month) {
      errors.push(
        `Total monthly spending would exceed monthly cap of ${(rule as any).max_amount_per_month} THB`,
      );
    }

    // Check required documents (warnings, not errors)
    if ((rule as any).requires_receipt && input.has_receipt === false) {
      warnings.push('A receipt is required for this claim type');
    }

    if ((rule as any).requires_doctor_cert && input.has_doctor_cert === false) {
      warnings.push('A doctor certificate is required for this claim type');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  async isAutoApprovable(claimType: string, amount: number): Promise<boolean> {
    const rule = await this.getApplicableRule(claimType);
    if (!rule || !(rule as any).auto_approve_threshold) {
      return false;
    }
    return amount <= (rule as any).auto_approve_threshold;
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

    // Get monthly cap from policy
    const rule = await this.getApplicableRule(claimType);
    const monthlyCap = rule ? Number((rule as any).max_amount_per_month) : 0;
    const remaining = Math.max(0, monthlyCap - total);

    return {
      total,
      claim_type: claimType,
      remaining_monthly: remaining,
    };
  }

  async createPolicyRule(dto: any) {
    return this.prisma.policyRule.create({
      data: {
        rule_name: dto.rule_name,
        claim_type: dto.claim_type,
        max_amount: dto.max_amount,
        max_amount_per_month: dto.max_amount_per_month,
        auto_approve_threshold: dto.auto_approve_threshold || null,
        requires_receipt: dto.requires_receipt ?? true,
        requires_doctor_cert: dto.requires_doctor_cert ?? false,
        min_days_notice: dto.min_days_notice ?? 0,
        effective_from: dto.effective_from ? new Date(dto.effective_from) : new Date(),
        effective_to: dto.effective_to ? new Date(dto.effective_to) : null,
        eligible_grades: dto.eligible_grades || null,
        is_active: true,
      },
    });
  }

  async listPolicyRules() {
    return this.prisma.policyRule.findMany({
      where: { is_active: true },
    });
  }

  async updatePolicyRule(id: string, dto: any) {
    await this.prisma.policyRule.findUnique({ where: { id } });
    return this.prisma.policyRule.update({
      where: { id },
      data: dto,
    });
  }

  async deactivatePolicyRule(id: string) {
    await this.prisma.policyRule.findUnique({ where: { id } });
    return this.prisma.policyRule.update({
      where: { id },
      data: { is_active: false },
    });
  }

  private async getMonthlySpending(employeeId: string, claimType: string): Promise<number> {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const result = await this.prisma.claimRequest.aggregate({
      where: {
        employee_id: employeeId,
        claim_type: claimType,
        status: 'approved',
        receipt_date: { gte: startOfMonth },
      },
      _sum: { amount: true },
    });

    return Number(result._sum?.amount) || 0;
  }
}

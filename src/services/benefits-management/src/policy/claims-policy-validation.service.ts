import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

export interface ClaimValidationResult {
  rule: string;
  type: 'hard' | 'soft';
  passed: boolean;
  message: string;
}

const SINGLE_CLAIM_CAP = 50000; // THB
const MONTHLY_SPENDING_CAP = 50000; // THB per month
const ELIGIBLE_CATEGORIES = ['medical', 'dental', 'travel', 'meals', 'wellness', 'education'];

@Injectable()
export class ClaimsPolicyValidationService {
  constructor(private readonly prisma: PrismaService) {}

  async validateClaimSubmission(
    claim: {
      employee_id: string;
      category: string;
      amount: number;
      currency?: string;
      description?: string;
      receipt_id?: string;
      vendor_name?: string;
      claim_date?: string;
      documents?: string[];
    },
    currentUser: CurrentUserInterface,
  ): Promise<ClaimValidationResult[]> {
    const results: ClaimValidationResult[] = [];

    const [capResult, monthlyResult, docsResult, categoryResult, duplicateResult] = await Promise.all([
      this.checkSingleClaimCap(claim),
      this.checkMonthlySpendingCap(claim),
      this.checkRequiredDocuments(claim),
      this.checkEligibleCategory(claim),
      this.checkDuplicateClaim(claim),
    ]);

    results.push(capResult, monthlyResult, docsResult, categoryResult, duplicateResult);

    return results;
  }

  private async checkSingleClaimCap(claim: {
    amount: number;
  }): Promise<ClaimValidationResult> {
    if (claim.amount > SINGLE_CLAIM_CAP) {
      return {
        rule: 'single_claim_cap',
        type: 'hard',
        passed: false,
        message: `Amount exceeds single claim cap: ${claim.amount} THB (max ${SINGLE_CLAIM_CAP} THB)`,
      };
    }

    return {
      rule: 'single_claim_cap',
      type: 'hard',
      passed: true,
      message: `Amount within single claim cap: ${claim.amount} THB`,
    };
  }

  private async checkMonthlySpendingCap(claim: {
    employee_id: string;
    amount: number;
  }): Promise<ClaimValidationResult> {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const monthlyApproved = await this.prisma.claimRequest.findMany({
      where: {
        employee_id: claim.employee_id,
        status: { in: ['approved', 'submitted', 'processing'] },
        created_at: { gte: monthStart, lte: monthEnd },
      },
    });

    const ytdSpending = monthlyApproved.reduce((sum: number, c: any) => sum + c.amount, 0);
    const totalAfterClaim = ytdSpending + claim.amount;

    if (totalAfterClaim > MONTHLY_SPENDING_CAP) {
      return {
        rule: 'monthly_spending_cap',
        type: 'hard',
        passed: false,
        message: `Exceeds monthly spending cap: ${ytdSpending} THB spent + ${claim.amount} THB = ${totalAfterClaim} THB (max ${MONTHLY_SPENDING_CAP} THB)`,
      };
    }

    return {
      rule: 'monthly_spending_cap',
      type: 'hard',
      passed: true,
      message: `Within monthly spending cap: ${totalAfterClaim} THB of ${MONTHLY_SPENDING_CAP} THB`,
    };
  }

  private async checkRequiredDocuments(claim: {
    documents?: string[];
    receipt_id?: string;
  }): Promise<ClaimValidationResult> {
    const hasDocuments = (claim.documents && claim.documents.length > 0) || !!claim.receipt_id;

    if (!hasDocuments) {
      return {
        rule: 'required_documents',
        type: 'soft',
        passed: false,
        message: 'No supporting documents attached. Please attach receipt or supporting documents.',
      };
    }

    return {
      rule: 'required_documents',
      type: 'soft',
      passed: true,
      message: 'Required documents attached',
    };
  }

  private async checkEligibleCategory(claim: {
    category: string;
  }): Promise<ClaimValidationResult> {
    if (!ELIGIBLE_CATEGORIES.includes(claim.category)) {
      return {
        rule: 'eligible_category',
        type: 'hard',
        passed: false,
        message: `Category '${claim.category}' is not eligible. Allowed: ${ELIGIBLE_CATEGORIES.join(', ')}`,
      };
    }

    return {
      rule: 'eligible_category',
      type: 'hard',
      passed: true,
      message: `Category '${claim.category}' is eligible`,
    };
  }

  private async checkDuplicateClaim(claim: {
    employee_id: string;
    vendor_name?: string;
    amount: number;
    claim_date?: string;
  }): Promise<ClaimValidationResult> {
    if (!claim.vendor_name || !claim.claim_date) {
      return {
        rule: 'duplicate_claim',
        type: 'hard',
        passed: true,
        message: 'No duplicate check needed (missing vendor/date)',
      };
    }

    // Query by employee + amount + status, then filter vendor in memory
    const candidates = await this.prisma.claimRequest.findMany({
      where: {
        employee_id: claim.employee_id,
        amount: claim.amount,
        status: { not: 'rejected' },
      },
    });

    // Filter duplicates by vendor name match (vendor stored in description or external)
    const duplicates = candidates.filter((c: any) =>
      c.vendor_name === claim.vendor_name || c.description?.includes(claim.vendor_name!),
    );

    if (duplicates.length > 0) {
      return {
        rule: 'duplicate_claim',
        type: 'hard',
        passed: false,
        message: `Potential duplicate claim: same vendor (${claim.vendor_name}), amount (${claim.amount} THB) found`,
      };
    }

    return {
      rule: 'duplicate_claim',
      type: 'hard',
      passed: true,
      message: 'No duplicate claim found',
    };
  }
}

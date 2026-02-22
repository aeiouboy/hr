import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { CreatePolicyRuleDto, UpdatePolicyRuleDto } from './dto/create-policy-rule.dto';

export interface PolicyCheckResult {
  rule_name: string;
  passed: boolean;
  is_blocking: boolean;
  message?: string;
}

@Injectable()
export class PolicyRulesService {
  constructor(private readonly prisma: PrismaService) {}

  private isHrManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_manager');
  }

  async getPolicyRules(category?: string) {
    const where: any = { is_active: true };
    if (category) {
      where.category = category;
    }
    return this.prisma.policyRule.findMany({ where });
  }

  async createPolicyRule(dto: CreatePolicyRuleDto, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Managers can create policy rules');
    }
    return this.prisma.policyRule.create({
      data: {
        name: dto.name,
        description: dto.description,
        rule_type: dto.rule_type,
        category: dto.category,
        condition_field: dto.condition_field,
        condition_value: dto.condition_value,
        is_active: true,
        created_by: currentUser.id,
      },
    });
  }

  async updatePolicyRule(ruleId: string, dto: UpdatePolicyRuleDto, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Managers can update policy rules');
    }
    const existing = await this.prisma.policyRule.findUnique({ where: { id: ruleId } });
    if (!existing) {
      throw new NotFoundException('Policy rule not found');
    }
    return this.prisma.policyRule.update({
      where: { id: ruleId },
      data: dto,
    });
  }

  async validateAgainstRules(claim: any): Promise<PolicyCheckResult[]> {
    // Get all active rules - both category-specific and global (null category)
    const rules = await this.prisma.policyRule.findMany({
      where: { is_active: true },
    });

    const results: PolicyCheckResult[] = [];

    for (const rule of rules) {
      // Skip category-specific rules that don't match the claim's category
      if (rule.category && rule.category !== claim.category) {
        continue;
      }

      const checkResult = await this.evaluateRule(rule, claim);
      results.push(checkResult);
    }

    return results;
  }

  private async evaluateRule(rule: any, claim: any): Promise<PolicyCheckResult> {
    const isBlocking = rule.rule_type === 'hard_limit' || rule.rule_type === 'required_document' || rule.rule_type === 'category_restriction';

    switch (rule.condition_field) {
      case 'max_amount': {
        const maxAmount = parseFloat(rule.condition_value);
        const passed = claim.amount <= maxAmount;
        return {
          rule_name: rule.name,
          passed,
          is_blocking: isBlocking,
          message: passed ? undefined : `Amount ${claim.amount} exceeds max ${maxAmount}`,
        };
      }

      case 'monthly_cap': {
        const monthlyCap = parseFloat(rule.condition_value);
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const approvedClaims = await this.prisma.claimRequest.findMany({
          where: {
            employee_id: claim.employee_id,
            status: 'approved',
            created_at: { gte: startOfMonth, lte: endOfMonth },
          },
        });

        const currentSpending = approvedClaims.reduce(
          (sum: number, c: any) => sum + (typeof c.amount === 'number' ? c.amount : parseFloat(c.amount)),
          0,
        );
        const totalAfter = currentSpending + claim.amount;
        const passed = totalAfter <= monthlyCap;
        return {
          rule_name: rule.name,
          passed,
          is_blocking: isBlocking,
          message: passed ? undefined : `Total monthly spending ${totalAfter} exceeds monthly cap ${monthlyCap}`,
        };
      }

      case 'required_docs': {
        const passed = !!claim.receipt_id;
        return {
          rule_name: rule.name,
          passed,
          is_blocking: isBlocking,
          message: passed ? undefined : 'Required receipt document is missing',
        };
      }

      case 'eligible_categories': {
        const eligible: string[] = JSON.parse(rule.condition_value);
        const passed = eligible.includes(claim.category);
        return {
          rule_name: rule.name,
          passed,
          is_blocking: isBlocking,
          message: passed ? undefined : `Category '${claim.category}' is not eligible`,
        };
      }

      default:
        return { rule_name: rule.name, passed: true, is_blocking: false };
    }
  }
}

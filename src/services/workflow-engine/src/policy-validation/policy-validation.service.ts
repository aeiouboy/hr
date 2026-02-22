import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

export interface ValidationViolation {
  rule_name: string;
  is_blocking: boolean;
  requires_justification: boolean;
  message: string;
}

export interface ValidationResult {
  can_submit: boolean;
  hard_blocks: ValidationViolation[];
  soft_warnings: ValidationViolation[];
}

@Injectable()
export class PolicyValidationService {
  constructor(private readonly prisma: PrismaService) {}

  private isHrManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_manager');
  }

  // ── Leave Validation ─────────────────────────────────────────

  async validateLeave(input: {
    employee_id: string;
    leave_type: string;
    days: number;
    remaining_balance: number;
    advance_days: number;
  }): Promise<ValidationResult> {
    const rules = await this.prisma.policyRule.findMany({
      where: { category: 'leave', is_active: true },
    });

    const hard_blocks: ValidationViolation[] = [];
    const soft_warnings: ValidationViolation[] = [];

    for (const rule of rules) {
      const violation = this.evaluateLeaveRule(rule, input);
      if (violation) {
        if (rule.rule_type === 'hard') {
          hard_blocks.push(violation);
        } else {
          soft_warnings.push(violation);
        }
      }
    }

    return {
      can_submit: hard_blocks.length === 0,
      hard_blocks,
      soft_warnings,
    };
  }

  private evaluateLeaveRule(
    rule: any,
    input: { days: number; remaining_balance: number; advance_days: number },
  ): ValidationViolation | null {
    const threshold = parseFloat(rule.condition_value);
    let actualValue: number;

    switch (rule.condition_field) {
      case 'leave_balance':
        // Check if remaining balance after deduction >= threshold
        actualValue = input.remaining_balance - input.days;
        if (!this.checkCondition(actualValue, rule.condition_op, threshold)) {
          return {
            rule_name: rule.name,
            is_blocking: rule.rule_type === 'hard',
            requires_justification: rule.rule_type === 'soft',
            message: rule.message || 'Leave balance check failed',
          };
        }
        break;

      case 'advance_days':
        actualValue = input.advance_days;
        if (!this.checkCondition(actualValue, rule.condition_op, threshold)) {
          return {
            rule_name: rule.name,
            is_blocking: rule.rule_type === 'hard',
            requires_justification: rule.rule_type === 'soft',
            message: rule.message || 'Advance notice check failed',
          };
        }
        break;
    }

    return null;
  }

  // ── Overtime Validation ──────────────────────────────────────

  async validateOvertime(input: {
    employee_id: string;
    hours: number;
    current_weekly_hours: number;
  }): Promise<ValidationResult> {
    const rules = await this.prisma.policyRule.findMany({
      where: { category: 'overtime', is_active: true },
    });

    const hard_blocks: ValidationViolation[] = [];
    const soft_warnings: ValidationViolation[] = [];

    for (const rule of rules) {
      const violation = this.evaluateOvertimeRule(rule, input);
      if (violation) {
        if (rule.rule_type === 'hard') {
          hard_blocks.push(violation);
        } else {
          soft_warnings.push(violation);
        }
      }
    }

    return {
      can_submit: hard_blocks.length === 0,
      hard_blocks,
      soft_warnings,
    };
  }

  private evaluateOvertimeRule(
    rule: any,
    input: { hours: number; current_weekly_hours: number },
  ): ValidationViolation | null {
    const threshold = parseFloat(rule.condition_value);

    switch (rule.condition_field) {
      case 'weekly_ot_hours': {
        const totalHours = input.current_weekly_hours + input.hours;
        if (!this.checkCondition(totalHours, rule.condition_op, threshold)) {
          return {
            rule_name: rule.name,
            is_blocking: rule.rule_type === 'hard',
            requires_justification: rule.rule_type === 'soft',
            message: rule.message || 'OT hours check failed',
          };
        }
        break;
      }
    }

    return null;
  }

  // ── Claims Validation ────────────────────────────────────────

  async validateClaim(input: {
    employee_id: string;
    claim_type: string;
    amount: number;
    has_receipt: boolean;
  }): Promise<ValidationResult> {
    const rules = await this.prisma.policyRule.findMany({
      where: { category: 'claims', is_active: true },
    });

    const hard_blocks: ValidationViolation[] = [];
    const soft_warnings: ValidationViolation[] = [];

    for (const rule of rules) {
      const violation = this.evaluateClaimRule(rule, input);
      if (violation) {
        if (rule.rule_type === 'hard') {
          hard_blocks.push(violation);
        } else {
          soft_warnings.push(violation);
        }
      }
    }

    return {
      can_submit: hard_blocks.length === 0,
      hard_blocks,
      soft_warnings,
    };
  }

  private evaluateClaimRule(
    rule: any,
    input: { amount: number; has_receipt: boolean },
  ): ValidationViolation | null {
    const threshold = parseFloat(rule.condition_value);

    switch (rule.condition_field) {
      case 'claim_amount':
        if (!this.checkCondition(input.amount, rule.condition_op, threshold)) {
          return {
            rule_name: rule.name,
            is_blocking: rule.rule_type === 'hard',
            requires_justification: rule.rule_type === 'soft',
            message: rule.message || 'Claim amount check failed',
          };
        }
        break;

      case 'claim_amount_no_receipt':
        // Only applies when no receipt
        if (!input.has_receipt && !this.checkCondition(input.amount, rule.condition_op, threshold)) {
          return {
            rule_name: rule.name,
            is_blocking: rule.rule_type === 'hard',
            requires_justification: rule.rule_type === 'soft',
            message: rule.message || 'Receipt required for this amount',
          };
        }
        break;
    }

    return null;
  }

  // ── Condition Evaluator ──────────────────────────────────────

  private checkCondition(actual: number, op: string, threshold: number): boolean {
    switch (op) {
      case 'gt': return actual > threshold;
      case 'gte': return actual >= threshold;
      case 'lt': return actual < threshold;
      case 'lte': return actual <= threshold;
      case 'eq': return actual === threshold;
      default: return true;
    }
  }

  // ── PolicyRule CRUD ──────────────────────────────────────────

  async createRule(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Managers can create policy rules');
    }

    return this.prisma.policyRule.create({
      data: {
        name: dto.name,
        description: dto.description || null,
        category: dto.category,
        rule_type: dto.rule_type,
        condition_field: dto.condition_field,
        condition_op: dto.condition_op,
        condition_value: dto.condition_value,
        message: dto.message || null,
        is_active: true,
        created_by: currentUser.id,
      },
    });
  }

  async listRules(category?: string) {
    const where: any = { is_active: true };
    if (category) {
      where.category = category;
    }
    return this.prisma.policyRule.findMany({ where });
  }

  async updateRule(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Managers can update policy rules');
    }

    const existing = await this.prisma.policyRule.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Policy rule not found');
    }

    return this.prisma.policyRule.update({
      where: { id },
      data: dto,
    });
  }

  async deactivateRule(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Managers can deactivate policy rules');
    }

    const existing = await this.prisma.policyRule.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Policy rule not found');
    }

    return this.prisma.policyRule.update({
      where: { id },
      data: { is_active: false },
    });
  }
}

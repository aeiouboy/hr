import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class PolicyConfigService {
  private readonly db: any;
  constructor(private readonly prisma: PrismaService) {
    this.db = prisma as any;
  }

  private isHrManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_manager');
  }

  async getPolicyRules() {
    return this.db.policyRuleConfig.findMany({
      where: { deleted_at: null },
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
  }

  async getPolicyRulesByCategory(category: string) {
    return this.db.policyRuleConfig.findMany({
      where: { category, deleted_at: null },
      orderBy: { name: 'asc' },
    });
  }

  async createPolicyRule(
    dto: {
      name: string;
      description?: string;
      category: string;
      rule_type: 'hard' | 'soft';
      condition_field: string;
      condition_operator: string;
      condition_value: string;
    },
    currentUser: CurrentUserInterface,
  ) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can create policy rules');
    }

    return this.db.policyRuleConfig.create({
      data: {
        name: dto.name,
        description: dto.description,
        category: dto.category,
        rule_type: dto.rule_type,
        condition_field: dto.condition_field,
        condition_operator: dto.condition_operator,
        condition_value: dto.condition_value,
        is_active: true,
        created_by: currentUser.id,
      },
    });
  }

  async updatePolicyRule(
    id: string,
    dto: Record<string, any>,
    currentUser: CurrentUserInterface,
  ) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can update policy rules');
    }

    const existing = await this.db.policyRuleConfig.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Policy rule not found');
    }

    return this.db.policyRuleConfig.update({
      where: { id },
      data: dto,
    });
  }

  async deletePolicyRule(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can delete policy rules');
    }

    const existing = await this.db.policyRuleConfig.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Policy rule not found');
    }

    return this.db.policyRuleConfig.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        is_active: false,
      },
    });
  }
}

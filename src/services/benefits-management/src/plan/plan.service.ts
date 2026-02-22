import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findAll(filters?: { category?: string; is_active?: boolean }) {
    const where: any = {};
    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.is_active !== undefined) {
      where.is_active = filters.is_active;
    }
    return this.prisma.benefitPlan.findMany({ where, orderBy: { created_at: 'desc' } });
  }

  async findById(id: string) {
    const plan = await this.prisma.benefitPlan.findUnique({
      where: { id },
      include: { enrollments: true },
    });
    if (!plan) {
      throw new NotFoundException('Benefit plan not found');
    }
    return plan;
  }

  async create(dto: CreatePlanDto, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create benefit plans');
    }
    return this.prisma.benefitPlan.create({
      data: {
        code: dto.code,
        name_en: dto.name_en,
        name_th: dto.name_th,
        category: dto.category,
        description_en: dto.description_en,
        description_th: dto.description_th,
        coverage_amount: dto.coverage_amount,
        employer_contribution: dto.employer_contribution ?? 0,
        employee_contribution: dto.employee_contribution ?? 0,
        is_active: dto.is_active ?? true,
        effective_date: new Date(dto.effective_date),
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
      },
    });
  }

  async update(id: string, dto: UpdatePlanDto, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update benefit plans');
    }
    const existing = await this.prisma.benefitPlan.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Benefit plan not found');
    }
    const data: any = { ...dto };
    if (dto.effective_date) {
      data.effective_date = new Date(dto.effective_date);
    }
    if (dto.end_date) {
      data.end_date = new Date(dto.end_date);
    }
    return this.prisma.benefitPlan.update({ where: { id }, data });
  }

  async deactivate(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can deactivate benefit plans');
    }
    const existing = await this.prisma.benefitPlan.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Benefit plan not found');
    }
    return this.prisma.benefitPlan.update({
      where: { id },
      data: { is_active: false },
    });
  }
}

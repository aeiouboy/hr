import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class SuccessionService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['hr_admin', 'hr_manager'].includes(r));
  }

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can create succession plans');
    }
    if (!dto.position_id || !dto.position_title) {
      throw new BadRequestException('position_id and position_title are required');
    }
    return this.prisma.successionPlan.create({
      data: {
        position_id: dto.position_id,
        position_title: dto.position_title,
        department: dto.department,
        incumbent_id: dto.incumbent_id,
        criticality: dto.criticality || 'medium',
        status: dto.status || 'active',
      },
      include: { successors: true },
    });
  }

  async findById(id: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can view succession plans');
    }
    const plan = await this.prisma.successionPlan.findUnique({
      where: { id },
      include: { successors: true },
    });
    if (!plan) throw new NotFoundException('Succession plan not found');
    return plan;
  }

  async findAll(currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can view succession plans');
    }
    return this.prisma.successionPlan.findMany({
      include: { successors: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can update succession plans');
    }
    const plan = await this.prisma.successionPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('Succession plan not found');
    return this.prisma.successionPlan.update({
      where: { id },
      data: dto,
      include: { successors: true },
    });
  }

  async addNominee(planId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can add nominees');
    }
    const plan = await this.prisma.successionPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new NotFoundException('Succession plan not found');
    if (!dto.employee_id) throw new BadRequestException('employee_id is required');
    if (!dto.readiness) throw new BadRequestException('readiness is required');
    return this.prisma.successor.create({
      data: {
        succession_plan_id: planId,
        employee_id: dto.employee_id,
        readiness: dto.readiness,
        development_gaps: dto.development_gaps,
        development_actions: dto.development_actions,
      },
    });
  }

  async removeNominee(planId: string, nomineeId: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can remove nominees');
    }
    const nominee = await this.prisma.successor.findUnique({ where: { id: nomineeId } });
    if (!nominee) throw new NotFoundException('Nominee not found');
    return this.prisma.successor.delete({ where: { id: nomineeId } });
  }

  async updateNomineeReadiness(nomineeId: string, readiness: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can update nominee readiness');
    }
    const nominee = await this.prisma.successor.findUnique({ where: { id: nomineeId } });
    if (!nominee) throw new NotFoundException('Nominee not found');
    return this.prisma.successor.update({
      where: { id: nomineeId },
      data: { readiness },
    });
  }
}

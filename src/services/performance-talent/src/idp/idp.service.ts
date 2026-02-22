import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class IdpService {
  constructor(private readonly prisma: PrismaService) {}

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  private canAccess(employeeId: string, user: CurrentUserInterface): boolean {
    return this.isManagerOrHr(user) || user.id === employeeId;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    const employeeId = dto.employee_id || currentUser.id;
    if (!this.canAccess(employeeId, currentUser)) {
      throw new ForbiddenException('Cannot create IDP for another employee');
    }
    if (!dto.title) throw new BadRequestException('Title is required');
    if (!dto.period) throw new BadRequestException('Period is required');

    return this.prisma.iDPPlan.create({
      data: {
        employee_id: employeeId,
        title: dto.title,
        status: dto.status || 'draft',
        period: dto.period,
        development_areas: dto.development_areas,
        action_items: dto.action_items,
        milestones: dto.milestones,
        mentor_id: dto.mentor_id,
      },
    });
  }

  async findById(id: string, currentUser: CurrentUserInterface) {
    const plan = await this.prisma.iDPPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('IDP plan not found');
    if (!this.canAccess(plan.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot access this IDP plan');
    }
    return plan;
  }

  async findByEmployee(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.canAccess(employeeId, currentUser)) {
      throw new ForbiddenException('Cannot access IDP plans for this employee');
    }
    return this.prisma.iDPPlan.findMany({
      where: { employee_id: employeeId },
      orderBy: { created_at: 'desc' },
    });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    const plan = await this.prisma.iDPPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('IDP plan not found');
    if (!this.canAccess(plan.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot update this IDP plan');
    }
    return this.prisma.iDPPlan.update({ where: { id }, data: dto });
  }

  async delete(id: string, currentUser: CurrentUserInterface) {
    const plan = await this.prisma.iDPPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('IDP plan not found');
    if (!this.canAccess(plan.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot delete this IDP plan');
    }
    return this.prisma.iDPPlan.delete({ where: { id } });
  }

  async signByEmployee(id: string, currentUser: CurrentUserInterface) {
    const plan = await this.prisma.iDPPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('IDP plan not found');
    if (plan.employee_id !== currentUser.id) {
      throw new ForbiddenException('Only the employee can sign their own IDP');
    }
    if (plan.status !== 'active') {
      throw new BadRequestException('IDP must be active to sign');
    }
    return this.prisma.iDPPlan.update({
      where: { id },
      data: { signed_by_employee: true },
    });
  }

  async signByManager(id: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can sign IDP plans');
    }
    const plan = await this.prisma.iDPPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('IDP plan not found');
    if (plan.status !== 'active') {
      throw new BadRequestException('IDP must be active to sign');
    }
    return this.prisma.iDPPlan.update({
      where: { id },
      data: { signed_by_manager: true, approved_by: currentUser.id, approved_at: new Date() },
    });
  }
}

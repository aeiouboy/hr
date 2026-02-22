import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  private canAccessEmployee(employeeId: string, user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['hr_admin', 'hr_manager', 'manager'].includes(r)) || user.id === employeeId;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!dto.title || !dto.title.trim()) {
      throw new BadRequestException('Title is required');
    }
    if (!dto.period) {
      throw new BadRequestException('Period is required');
    }
    if (dto.weight !== undefined && (dto.weight < 0 || dto.weight > 100)) {
      throw new BadRequestException('Weight must be between 0 and 100');
    }

    const employeeId = dto.employee_id || currentUser.id;
    if (!this.canAccessEmployee(employeeId, currentUser)) {
      throw new ForbiddenException('Cannot create goals for another employee');
    }

    return this.prisma.goal.create({
      data: {
        employee_id: employeeId,
        title: dto.title,
        description: dto.description,
        category: dto.category || 'business',
        weight: dto.weight || 0,
        target_value: dto.target_value,
        actual_value: dto.actual_value,
        unit: dto.unit,
        status: dto.status || 'draft',
        progress: dto.progress || 0,
        start_date: dto.start_date ? new Date(dto.start_date) : null,
        due_date: dto.due_date ? new Date(dto.due_date) : null,
        period: dto.period,
      },
    });
  }

  async findAllByEmployee(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.canAccessEmployee(employeeId, currentUser)) {
      throw new ForbiddenException('Cannot access goals for this employee');
    }

    return this.prisma.goal.findMany({
      where: { employee_id: employeeId },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (!this.canAccessEmployee(goal.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot access this goal');
    }

    return goal;
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (!this.canAccessEmployee(goal.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot update this goal');
    }

    if (dto.weight !== undefined && (dto.weight < 0 || dto.weight > 100)) {
      throw new BadRequestException('Weight must be between 0 and 100');
    }

    if (dto.progress !== undefined && (dto.progress < 0 || dto.progress > 100)) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    const data: any = { ...dto };
    if (data.start_date) data.start_date = new Date(data.start_date);
    if (data.due_date) data.due_date = new Date(data.due_date);
    if (data.completed_at) data.completed_at = new Date(data.completed_at);

    return this.prisma.goal.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (!this.canAccessEmployee(goal.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot delete this goal');
    }

    return this.prisma.goal.delete({ where: { id } });
  }

  async updateProgress(id: string, progress: number, actualValue: number | undefined, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }

    if (!this.canAccessEmployee(goal.employee_id, currentUser)) {
      throw new ForbiddenException('Cannot update this goal');
    }

    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    const data: any = { progress };
    if (actualValue !== undefined) data.actual_value = actualValue;
    if (progress === 100) {
      data.status = 'completed';
      data.completed_at = new Date();
    }

    return this.prisma.goal.update({
      where: { id },
      data,
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class OnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async getTemplates() {
    return this.prisma.onboardingTemplate.findMany({
      include: { tasks: { orderBy: { sort_order: 'asc' } } },
    });
  }

  async getTemplateById(id: string) {
    const template = await this.prisma.onboardingTemplate.findUnique({
      where: { id },
      include: { tasks: { orderBy: { sort_order: 'asc' } } },
    });

    if (!template) {
      throw new NotFoundException('Onboarding template not found');
    }

    return template;
  }

  async createTemplate(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create onboarding templates');
    }

    if (!dto.name_en) {
      throw new BadRequestException('Template name is required');
    }

    return this.prisma.onboardingTemplate.create({
      data: {
        name_en: dto.name_en,
        name_th: dto.name_th,
        department: dto.department,
        is_default: dto.is_default || false,
      },
    });
  }

  async getTasksByEmployee(employeeId: string) {
    return this.prisma.onboardingTask.findMany({
      where: { employee_id: employeeId },
      orderBy: { sort_order: 'asc' },
    });
  }

  async assignTemplate(templateId: string, employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can assign onboarding templates');
    }

    const template = await this.prisma.onboardingTemplate.findUnique({
      where: { id: templateId },
      include: { tasks: true },
    });

    if (!template) {
      throw new NotFoundException('Onboarding template not found');
    }

    // Create task instances for the employee
    const tasks = await Promise.all(
      template.tasks.map((task) =>
        this.prisma.onboardingTask.create({
          data: {
            employee_id: employeeId,
            category: task.category,
            title_en: task.title_en,
            title_th: task.title_th,
            description_en: task.description_en,
            description_th: task.description_th,
            required: task.required,
            sort_order: task.sort_order,
            assigned_to: task.assigned_to,
          },
        }),
      ),
    );

    return tasks;
  }

  async completeTask(taskId: string, currentUser: CurrentUserInterface) {
    const task = await this.prisma.onboardingTask.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException('Onboarding task not found');
    }

    return this.prisma.onboardingTask.update({
      where: { id: taskId },
      data: {
        status: 'completed',
        completed_date: new Date(),
        completed_by: currentUser.id,
      },
    });
  }

  async getProgress(employeeId: string) {
    const tasks = await this.prisma.onboardingTask.findMany({
      where: { employee_id: employeeId },
    });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const required = tasks.filter(t => t.required);
    const requiredCompleted = required.filter(t => t.status === 'completed').length;

    return {
      total,
      completed,
      pending: total - completed,
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      required_total: required.length,
      required_completed: requiredCompleted,
      all_required_done: requiredCompleted === required.length,
    };
  }
}

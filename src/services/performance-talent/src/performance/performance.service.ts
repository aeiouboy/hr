import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class PerformanceService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['hr_admin', 'hr_manager'].includes(r));
  }

  // --- Goals ---

  async createGoal(data: any, currentUser: CurrentUserInterface) {
    return this.prisma.goal.create({
      data: {
        employee_id: data.employee_id,
        title: data.title,
        description: data.description,
        category: data.category,
        weight: data.weight || 0,
        target_value: data.target_value,
        unit: data.unit,
        period: data.period,
        start_date: data.start_date ? new Date(data.start_date) : null,
        due_date: data.due_date ? new Date(data.due_date) : null,
      },
    });
  }

  async getGoals(employeeId: string, period?: string) {
    const where: any = { employee_id: employeeId };
    if (period) where.period = period;

    return this.prisma.goal.findMany({ where, orderBy: { created_at: 'desc' } });
  }

  async updateGoal(goalId: string, data: any, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');

    return this.prisma.goal.update({
      where: { id: goalId },
      data,
    });
  }

  async deleteGoal(goalId: string, currentUser: CurrentUserInterface) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');

    if (goal.status !== 'draft') {
      throw new ForbiddenException('Only draft goals can be deleted');
    }

    return this.prisma.goal.delete({ where: { id: goalId } });
  }

  // --- Evaluations ---

  async createEvaluation(data: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create evaluations');
    }

    return this.prisma.evaluation.create({
      data: {
        employee_id: data.employee_id,
        evaluator_id: data.evaluator_id,
        period: data.period,
        type: data.type,
      },
    });
  }

  async getEvaluation(evaluationId: string) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: { scores: true },
    });

    if (!evaluation) throw new NotFoundException('Evaluation not found');
    return evaluation;
  }

  async getEvaluations(employeeId: string, period?: string) {
    const where: any = { employee_id: employeeId };
    if (period) where.period = period;

    return this.prisma.evaluation.findMany({
      where,
      include: { scores: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async submitSelfReview(evaluationId: string, data: any, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({ where: { id: evaluationId } });
    if (!evaluation) throw new NotFoundException('Evaluation not found');

    return this.prisma.evaluation.update({
      where: { id: evaluationId },
      data: {
        self_rating: data.self_rating,
        self_comments: data.self_comments,
        status: 'self_review',
        submitted_at: new Date(),
      },
    });
  }

  async submitManagerReview(evaluationId: string, data: any, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({ where: { id: evaluationId } });
    if (!evaluation) throw new NotFoundException('Evaluation not found');

    return this.prisma.evaluation.update({
      where: { id: evaluationId },
      data: {
        manager_rating: data.manager_rating,
        manager_comments: data.manager_comments,
        strengths: data.strengths,
        improvements: data.improvements,
        status: 'manager_review',
      },
    });
  }

  async finalizeEvaluation(evaluationId: string, data: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can finalize evaluations');
    }

    const evaluation = await this.prisma.evaluation.findUnique({ where: { id: evaluationId } });
    if (!evaluation) throw new NotFoundException('Evaluation not found');

    return this.prisma.evaluation.update({
      where: { id: evaluationId },
      data: {
        final_rating: data.final_rating,
        status: 'completed',
        completed_at: new Date(),
      },
    });
  }

  // --- Competencies ---

  async getCompetencies() {
    return this.prisma.competency.findMany({
      where: { is_active: true },
      orderBy: { name: 'asc' },
    });
  }

  async createCompetency(data: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can manage competencies');
    }

    return this.prisma.competency.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        levels: data.levels,
      },
    });
  }
}

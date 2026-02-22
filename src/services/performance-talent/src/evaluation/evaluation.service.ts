import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['hr_admin', 'hr_manager'].includes(r));
  }

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can create evaluations');
    }

    if (!dto.employee_id) {
      throw new BadRequestException('employee_id is required');
    }
    if (!dto.period) {
      throw new BadRequestException('period is required');
    }

    return this.prisma.evaluation.create({
      data: {
        employee_id: dto.employee_id,
        evaluator_id: dto.evaluator_id || currentUser.id,
        period: dto.period,
        type: dto.type || 'annual',
        status: dto.status || 'draft',
        self_rating: dto.self_rating,
        manager_rating: dto.manager_rating,
        final_rating: dto.final_rating,
        self_comments: dto.self_comments,
        manager_comments: dto.manager_comments,
        strengths: dto.strengths,
        improvements: dto.improvements,
      },
      include: { scores: true },
    });
  }

  async findById(id: string, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { scores: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Employee can view own, manager/HR can view any
    if (!this.isManagerOrHr(currentUser) && evaluation.employee_id !== currentUser.id) {
      throw new ForbiddenException('Cannot access this evaluation');
    }

    return evaluation;
  }

  async findByEmployee(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser) && employeeId !== currentUser.id) {
      throw new ForbiddenException('Cannot access evaluations for this employee');
    }

    return this.prisma.evaluation.findMany({
      where: { employee_id: employeeId },
      include: { scores: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async submitSelfReview(id: string, dto: any, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { scores: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (evaluation.employee_id !== currentUser.id) {
      throw new ForbiddenException('Can only submit self-review for own evaluation');
    }

    if (evaluation.status !== 'draft' && evaluation.status !== 'self_review') {
      throw new BadRequestException('Evaluation is not in self-review stage');
    }

    return this.prisma.evaluation.update({
      where: { id },
      data: {
        self_rating: dto.self_rating,
        self_comments: dto.self_comments,
        status: 'manager_review',
        submitted_at: new Date(),
      },
      include: { scores: true },
    });
  }

  async submitManagerReview(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can submit manager reviews');
    }

    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { scores: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (evaluation.status !== 'manager_review') {
      throw new BadRequestException('Evaluation is not in manager review stage');
    }

    return this.prisma.evaluation.update({
      where: { id },
      data: {
        manager_rating: dto.manager_rating,
        manager_comments: dto.manager_comments,
        strengths: dto.strengths,
        improvements: dto.improvements,
        status: 'calibration',
      },
      include: { scores: true },
    });
  }

  async calibrate(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can calibrate evaluations');
    }

    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { scores: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (evaluation.status !== 'calibration') {
      throw new BadRequestException('Evaluation is not in calibration stage');
    }

    return this.prisma.evaluation.update({
      where: { id },
      data: {
        final_rating: dto.final_rating,
        status: 'completed',
        completed_at: new Date(),
      },
      include: { scores: true },
    });
  }

  async addScore(evaluationId: string, dto: any, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({ where: { id: evaluationId } });
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (!this.isManagerOrHr(currentUser) && evaluation.employee_id !== currentUser.id) {
      throw new ForbiddenException('Cannot add scores to this evaluation');
    }

    return this.prisma.evaluationScore.create({
      data: {
        evaluation_id: evaluationId,
        competency_id: dto.competency_id,
        self_score: dto.self_score,
        manager_score: dto.manager_score,
        final_score: dto.final_score,
        comments: dto.comments,
      },
    });
  }
}

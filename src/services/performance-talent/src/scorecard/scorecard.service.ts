import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// 6 CG Core Competencies
export const CG_COMPETENCIES = [
  { code: 'CUS', name: 'Customer Focus', name_th: 'มุ่งเน้นลูกค้า', category: 'core' },
  { code: 'INN', name: 'Innovation & Agility', name_th: 'นวัตกรรมและความคล่องตัว', category: 'core' },
  { code: 'COL', name: 'Collaboration', name_th: 'ความร่วมมือ', category: 'core' },
  { code: 'INT', name: 'Integrity & Trust', name_th: 'ความซื่อสัตย์และความไว้วางใจ', category: 'core' },
  { code: 'RES', name: 'Result Orientation', name_th: 'มุ่งเน้นผลลัพธ์', category: 'core' },
  { code: 'PEO', name: 'People Development', name_th: 'การพัฒนาบุคลากร', category: 'core' },
];

@Injectable()
export class ScorecardService {
  constructor(private readonly prisma: PrismaService) {}

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.some(r => ['manager', 'hr_admin', 'hr_manager'].includes(r));
  }

  async seedCompetencies() {
    const existing = await this.prisma.competency.findMany();
    if (existing.length > 0) return existing;

    const created = [];
    for (const comp of CG_COMPETENCIES) {
      const c = await this.prisma.competency.create({
        data: {
          name: comp.name,
          category: comp.category,
          description: `${comp.name} - ${comp.name_th}`,
          levels: [
            { level: 1, label: 'Basic', description: 'Developing' },
            { level: 2, label: 'Competent', description: 'Meeting expectations' },
            { level: 3, label: 'Proficient', description: 'Exceeding expectations' },
            { level: 4, label: 'Advanced', description: 'Role model' },
            { level: 5, label: 'Expert', description: 'Thought leader' },
          ],
          is_active: true,
        },
      });
      created.push(c);
    }
    return created;
  }

  async getCompetencies() {
    return this.prisma.competency.findMany({
      where: { is_active: true },
      orderBy: { created_at: 'asc' },
    });
  }

  async assessCompetency(evaluationId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can assess competencies');
    }

    if (!dto.competency_id) {
      throw new BadRequestException('competency_id is required');
    }

    const evaluation = await this.prisma.evaluation.findUnique({ where: { id: evaluationId } });
    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    // Check if score already exists for this competency
    const existing = await this.prisma.evaluationScore.findFirst({
      where: { evaluation_id: evaluationId, competency_id: dto.competency_id },
    });

    if (existing) {
      return this.prisma.evaluationScore.update({
        where: { id: existing.id },
        data: {
          manager_score: dto.manager_score,
          final_score: dto.final_score,
          comments: dto.comments,
        },
      });
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

  async getCompositeScore(evaluationId: string, currentUser: CurrentUserInterface) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id: evaluationId },
      include: { scores: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    if (!this.isManagerOrHr(currentUser) && evaluation.employee_id !== currentUser.id) {
      throw new ForbiddenException('Cannot access this evaluation scorecard');
    }

    const scores = evaluation.scores;
    if (scores.length === 0) {
      return { evaluation_id: evaluationId, scores: [], composite_score: 0, competency_count: 0 };
    }

    const totalScore = scores.reduce((sum, s) => sum + (s.final_score || s.manager_score || 0), 0);
    const compositeScore = totalScore / scores.length;

    return {
      evaluation_id: evaluationId,
      scores,
      composite_score: Math.round(compositeScore * 100) / 100,
      competency_count: scores.length,
    };
  }

  async getHistory(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser) && employeeId !== currentUser.id) {
      throw new ForbiddenException('Cannot access scorecard history');
    }

    return this.prisma.evaluation.findMany({
      where: { employee_id: employeeId, status: 'completed' },
      include: { scores: true },
      orderBy: { completed_at: 'desc' },
    });
  }
}

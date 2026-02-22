import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class TrainingRecordService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findByEmployee(employeeId: string) {
    return this.prisma.trainingRecord.findMany({
      where: { employee_id: employeeId },
      include: { evaluations: true },
      orderBy: { start_date: 'desc' },
    });
  }

  async findById(id: string) {
    const record = await this.prisma.trainingRecord.findUnique({
      where: { id },
      include: { evaluations: true },
    });

    if (!record) {
      throw new NotFoundException('Training record not found');
    }

    return record;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create training records');
    }

    if (!dto.course_code || !dto.course_name_en || !dto.employee_id) {
      throw new BadRequestException('course_code, course_name_en, and employee_id are required');
    }

    return this.prisma.trainingRecord.create({
      data: dto,
      include: { evaluations: true },
    });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update training records');
    }

    const record = await this.prisma.trainingRecord.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException('Training record not found');
    }

    return this.prisma.trainingRecord.update({
      where: { id },
      data: dto,
      include: { evaluations: true },
    });
  }

  async addKirkpatrickEvaluation(
    trainingRecordId: string,
    dto: { level: number; score: number; comments?: string; evidence?: string },
    currentUser: CurrentUserInterface,
  ) {
    if (!this.isHr(currentUser) && !currentUser.roles.includes('manager')) {
      throw new ForbiddenException('Only HR or managers can add evaluations');
    }

    const record = await this.prisma.trainingRecord.findUnique({ where: { id: trainingRecordId } });
    if (!record) {
      throw new NotFoundException('Training record not found');
    }

    if (dto.level < 1 || dto.level > 4) {
      throw new BadRequestException('Kirkpatrick level must be between 1 and 4');
    }

    const levelNames = ['', 'reaction', 'learning', 'behavior', 'results'];

    return this.prisma.kirkpatrickEvaluation.upsert({
      where: {
        training_record_id_level: {
          training_record_id: trainingRecordId,
          level: dto.level,
        },
      },
      update: {
        score: dto.score,
        comments: dto.comments,
        evidence: dto.evidence,
        evaluator_id: currentUser.id,
        evaluation_date: new Date(),
      },
      create: {
        training_record_id: trainingRecordId,
        level: dto.level,
        level_name: levelNames[dto.level],
        score: dto.score,
        comments: dto.comments,
        evidence: dto.evidence,
        evaluator_id: currentUser.id,
        evaluation_date: new Date(),
      },
    });
  }

  async getEvaluations(trainingRecordId: string) {
    const record = await this.prisma.trainingRecord.findUnique({ where: { id: trainingRecordId } });
    if (!record) {
      throw new NotFoundException('Training record not found');
    }

    return this.prisma.kirkpatrickEvaluation.findMany({
      where: { training_record_id: trainingRecordId },
      orderBy: { level: 'asc' },
    });
  }

  async getCertificates(employeeId: string) {
    return this.prisma.trainingRecord.findMany({
      where: {
        employee_id: employeeId,
        certificate_id: { not: null },
        status: 'completed',
      },
      select: {
        id: true,
        course_code: true,
        course_name_en: true,
        course_name_th: true,
        certificate_id: true,
        completion_date: true,
        category: true,
      },
      orderBy: { completion_date: 'desc' },
    });
  }
}

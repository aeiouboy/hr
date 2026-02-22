import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private isHrOrManager(user: CurrentUserInterface): boolean {
    return this.isHr(user) || user.roles.includes('manager');
  }

  async findByJobPosting(jobPostingId: string) {
    return this.prisma.candidate.findMany({
      where: { job_posting_id: jobPostingId },
      include: { screenings: true },
      orderBy: { applied_date: 'desc' },
    });
  }

  async findById(id: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: { screenings: true, job_posting: true },
    });

    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    return candidate;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can add candidates');
    }

    if (!dto.first_name || !dto.last_name || !dto.email || !dto.job_posting_id) {
      throw new BadRequestException('first_name, last_name, email, and job_posting_id are required');
    }

    const jobPosting = await this.prisma.jobPosting.findUnique({ where: { id: dto.job_posting_id } });
    if (!jobPosting) {
      throw new NotFoundException('Job posting not found');
    }

    return this.prisma.candidate.create({
      data: dto,
      include: { screenings: true },
    });
  }

  async updateStatus(id: string, status: string, currentUser: CurrentUserInterface) {
    if (!this.isHrOrManager(currentUser)) {
      throw new ForbiddenException('Only HR or managers can update candidate status');
    }

    const candidate = await this.prisma.candidate.findUnique({ where: { id } });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    const validStatuses = ['applied', 'screening', 'interviewing', 'offered', 'hired', 'rejected', 'withdrawn'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return this.prisma.candidate.update({
      where: { id },
      data: { status, current_stage: status },
    });
  }

  async addScreening(candidateId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrOrManager(currentUser)) {
      throw new ForbiddenException('Only HR or managers can add screening stages');
    }

    const candidate = await this.prisma.candidate.findUnique({ where: { id: candidateId } });
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    return this.prisma.screening.create({
      data: {
        candidate_id: candidateId,
        stage: dto.stage,
        status: 'pending',
        scheduled_date: dto.scheduled_date ? new Date(dto.scheduled_date) : undefined,
        interviewer_id: dto.interviewer_id,
      },
    });
  }

  async completeScreening(screeningId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrOrManager(currentUser)) {
      throw new ForbiddenException('Only HR or managers can complete screenings');
    }

    const screening = await this.prisma.screening.findUnique({ where: { id: screeningId } });
    if (!screening) {
      throw new NotFoundException('Screening not found');
    }

    return this.prisma.screening.update({
      where: { id: screeningId },
      data: {
        status: 'completed',
        completed_date: new Date(),
        score: dto.score,
        feedback: dto.feedback,
        recommendation: dto.recommendation,
      },
    });
  }

  async getPipeline(jobPostingId: string) {
    const candidates = await this.prisma.candidate.findMany({
      where: { job_posting_id: jobPostingId },
      include: { screenings: true },
    });

    const stages = ['applied', 'screening', 'interviewing', 'offered', 'hired', 'rejected'];
    const pipeline: Record<string, any[]> = {};
    for (const stage of stages) {
      pipeline[stage] = candidates.filter(c => c.current_stage === stage);
    }

    return pipeline;
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class JobPostingService {
  constructor(private readonly prisma: PrismaService) {}

  private isHrOrManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager') || user.roles.includes('manager');
  }

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findAll(filters?: { status?: string; department?: string }) {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.department) where.department = filters.department;

    return this.prisma.jobPosting.findMany({
      where,
      include: { candidates: { select: { id: true, status: true } } },
      orderBy: { posting_date: 'desc' },
    });
  }

  async findById(id: string) {
    const posting = await this.prisma.jobPosting.findUnique({
      where: { id },
      include: { candidates: true },
    });

    if (!posting) {
      throw new NotFoundException('Job posting not found');
    }

    return posting;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrOrManager(currentUser)) {
      throw new ForbiddenException('Only HR or managers can create job postings');
    }

    if (!dto.position_title || !dto.department) {
      throw new BadRequestException('Position title and department are required');
    }

    return this.prisma.jobPosting.create({
      data: {
        ...dto,
        status: 'draft',
        hiring_manager_id: dto.hiring_manager_id || currentUser.id,
      },
    });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHrOrManager(currentUser)) {
      throw new ForbiddenException('Only HR or managers can update job postings');
    }

    const posting = await this.prisma.jobPosting.findUnique({ where: { id } });
    if (!posting) {
      throw new NotFoundException('Job posting not found');
    }

    return this.prisma.jobPosting.update({
      where: { id },
      data: dto,
    });
  }

  async publish(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can publish job postings');
    }

    const posting = await this.prisma.jobPosting.findUnique({ where: { id } });
    if (!posting) {
      throw new NotFoundException('Job posting not found');
    }

    return this.prisma.jobPosting.update({
      where: { id },
      data: { status: 'open', posting_date: new Date() },
    });
  }

  async close(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can close job postings');
    }

    const posting = await this.prisma.jobPosting.findUnique({ where: { id } });
    if (!posting) {
      throw new NotFoundException('Job posting not found');
    }

    return this.prisma.jobPosting.update({
      where: { id },
      data: { status: 'closed' },
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findAll(filters?: { category?: string; level?: string; mandatory?: boolean; status?: string }) {
    const where: any = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.level) where.level = filters.level;
    if (filters?.mandatory !== undefined) where.mandatory = filters.mandatory;
    if (filters?.status) where.status = filters.status;
    else where.status = 'active';

    return this.prisma.course.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { enrollments: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create courses');
    }

    if (!dto.code || !dto.name_en) {
      throw new BadRequestException('Course code and name are required');
    }

    const existing = await this.prisma.course.findUnique({ where: { code: dto.code } });
    if (existing) {
      throw new BadRequestException('Course code already exists');
    }

    return this.prisma.course.create({ data: dto });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update courses');
    }

    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.course.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can delete courses');
    }

    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Soft delete by setting status to inactive
    return this.prisma.course.update({
      where: { id },
      data: { status: 'inactive' },
    });
  }
}

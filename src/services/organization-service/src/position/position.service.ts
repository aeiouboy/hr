import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class PositionService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findById(id: string) {
    const position = await this.prisma.position.findUnique({
      where: { id },
      include: {
        department: true,
        incumbents: true,
      },
    });

    if (!position) {
      throw new NotFoundException('Position not found');
    }

    return position;
  }

  async findAll(filters: {
    department_id?: string;
    company_id?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const { department_id, company_id, status, page = 1, limit = 10 } = filters;

    const where: any = {};
    if (department_id) where.department_id = department_id;
    if (company_id) where.company_id = company_id;
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.position.findMany({
        where,
        include: { department: true, incumbents: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.position.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create positions');
    }

    return this.prisma.position.create({
      data: {
        ...dto,
        status: dto.status || 'active',
      },
    });
  }

  async update(id: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update positions');
    }

    const position = await this.prisma.position.findUnique({ where: { id } });
    if (!position) {
      throw new NotFoundException('Position not found');
    }

    return this.prisma.position.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can delete positions');
    }

    const position = await this.prisma.position.findUnique({ where: { id } });
    if (!position) {
      throw new NotFoundException('Position not found');
    }

    return this.prisma.position.delete({ where: { id } });
  }

  async getDepartments(companyId?: string) {
    const where: any = {};
    if (companyId) where.company_id = companyId;

    return this.prisma.department.findMany({ where });
  }
}

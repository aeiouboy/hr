import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class TransferService {
  constructor(private readonly prisma: PrismaService) {}

  private canManageTransfers(user: CurrentUserInterface): boolean {
    return (
      user.roles.includes('hr_admin') ||
      user.roles.includes('hr_manager') ||
      user.roles.includes('manager')
    );
  }

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.canManageTransfers(currentUser)) {
      throw new ForbiddenException('Only HR or managers can create transfer requests');
    }

    return this.prisma.transfer.create({
      data: {
        ...dto,
        effective_date: new Date(dto.effective_date),
        status: 'pending',
        requested_by: currentUser.id,
      },
    });
  }

  async findById(id: string) {
    const transfer = await this.prisma.transfer.findUnique({ where: { id } });

    if (!transfer) {
      throw new NotFoundException('Transfer request not found');
    }

    return transfer;
  }

  async findAll(filters: {
    employee_id?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const { employee_id, status, page = 1, limit = 10 } = filters;

    const where: any = {};
    if (employee_id) where.employee_id = employee_id;
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      this.prisma.transfer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.transfer.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async approve(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can approve transfers');
    }

    const transfer = await this.prisma.transfer.findUnique({ where: { id } });
    if (!transfer) {
      throw new NotFoundException('Transfer request not found');
    }

    if (transfer.status !== 'pending') {
      throw new BadRequestException('Only pending transfers can be approved');
    }

    return this.prisma.transfer.update({
      where: { id },
      data: { status: 'approved', approved_by: currentUser.id },
    });
  }

  async reject(id: string, reason: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can reject transfers');
    }

    const transfer = await this.prisma.transfer.findUnique({ where: { id } });
    if (!transfer) {
      throw new NotFoundException('Transfer request not found');
    }

    if (transfer.status !== 'pending') {
      throw new BadRequestException('Only pending transfers can be rejected');
    }

    return this.prisma.transfer.update({
      where: { id },
      data: { status: 'rejected', rejection_reason: reason },
    });
  }
}

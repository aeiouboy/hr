import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private canApprove(user: CurrentUserInterface): boolean {
    return this.isHr(user) || user.roles.includes('manager');
  }

  async createLeaveRequest(employeeId: string, dto: any, currentUser: CurrentUserInterface) {
    // RBAC: self or HR
    if (currentUser.id !== employeeId && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot create leave request for another employee');
    }

    // Check balance
    const balance = await this.prisma.leaveBalance.findFirst({
      where: { employee_id: employeeId, leave_type_id: dto.leave_type_id, year: new Date(dto.start_date).getFullYear() },
    });

    if (!balance || balance.remaining < dto.days) {
      throw new BadRequestException('Insufficient leave balance');
    }

    // Check for date conflicts
    const conflicts = await this.prisma.leaveRequest.findMany({
      where: {
        employee_id: employeeId,
        status: { in: ['pending', 'approved'] },
        start_date: { lte: new Date(dto.end_date) },
        end_date: { gte: new Date(dto.start_date) },
      },
    });

    if (conflicts.length > 0) {
      throw new BadRequestException('Leave dates overlap with existing request');
    }

    return this.prisma.leaveRequest.create({
      data: {
        employee_id: employeeId,
        leave_type_id: dto.leave_type_id,
        start_date: new Date(dto.start_date),
        end_date: new Date(dto.end_date),
        days: dto.days,
        half_day: dto.half_day || null,
        reason: dto.reason,
        substitute_id: dto.substitute_id || null,
        status: 'pending',
      },
      include: { leave_type: true },
    });
  }

  async findById(id: string) {
    const request = await this.prisma.leaveRequest.findUnique({
      where: { id },
      include: { leave_type: true },
    });

    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    return request;
  }

  async findByEmployee(employeeId: string, filters: {
    status?: string;
    leave_type_id?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const { status, leave_type_id, page = 1, limit = 10 } = filters;

    const where: any = { employee_id: employeeId };
    if (status) where.status = status;
    if (leave_type_id) where.leave_type_id = leave_type_id;

    const [data, total] = await Promise.all([
      this.prisma.leaveRequest.findMany({
        where,
        include: { leave_type: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.leaveRequest.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async approveLeave(id: string, currentUser: CurrentUserInterface) {
    if (!this.canApprove(currentUser)) {
      throw new ForbiddenException('Only managers or HR can approve leaves');
    }

    const request = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be approved');
    }

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'approved',
        approved_by: currentUser.id,
        approved_date: new Date(),
      },
      include: { leave_type: true },
    });

    // Update balance: move from pending to used
    const balance = await this.prisma.leaveBalance.findFirst({
      where: {
        employee_id: request.employee_id,
        leave_type_id: request.leave_type_id,
        year: request.start_date.getFullYear(),
      },
    });

    if (balance) {
      await this.prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          used: balance.used + request.days,
          pending: Math.max(0, balance.pending - request.days),
          remaining: balance.remaining - request.days,
        },
      });
    }

    return updated;
  }

  async rejectLeave(id: string, reason: string, currentUser: CurrentUserInterface) {
    if (!this.canApprove(currentUser)) {
      throw new ForbiddenException('Only managers or HR can reject leaves');
    }

    const request = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be rejected');
    }

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        rejection_reason: reason,
      },
      include: { leave_type: true },
    });

    // Restore pending balance
    const balance = await this.prisma.leaveBalance.findFirst({
      where: {
        employee_id: request.employee_id,
        leave_type_id: request.leave_type_id,
        year: request.start_date.getFullYear(),
      },
    });

    if (balance) {
      await this.prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          pending: Math.max(0, balance.pending - request.days),
        },
      });
    }

    return updated;
  }

  async cancelLeave(id: string, currentUser: CurrentUserInterface) {
    const request = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!request) {
      throw new NotFoundException('Leave request not found');
    }

    // Only self or HR can cancel
    if (request.employee_id !== currentUser.id && !this.isHr(currentUser)) {
      throw new ForbiddenException('Cannot cancel another employee\'s leave');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be cancelled');
    }

    const updated = await this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'cancelled' },
      include: { leave_type: true },
    });

    // Restore pending balance
    const balance = await this.prisma.leaveBalance.findFirst({
      where: {
        employee_id: request.employee_id,
        leave_type_id: request.leave_type_id,
        year: request.start_date.getFullYear(),
      },
    });

    if (balance) {
      await this.prisma.leaveBalance.update({
        where: { id: balance.id },
        data: {
          pending: Math.max(0, balance.pending - request.days),
        },
      });
    }

    return updated;
  }

  async getLeaveTypes() {
    return this.prisma.leaveType.findMany({
      where: { is_active: true },
      orderBy: { code: 'asc' },
    });
  }

  async getBalance(employeeId: string, year: number) {
    return this.prisma.leaveBalance.findMany({
      where: { employee_id: employeeId, year },
      include: { leave_type: true },
    });
  }

  async getCalendar(employeeId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const requests = await this.prisma.leaveRequest.findMany({
      where: {
        employee_id: employeeId,
        status: { in: ['approved', 'pending'] },
        start_date: { lte: endDate },
        end_date: { gte: startDate },
      },
      include: { leave_type: true },
    });

    // Build calendar entries
    const entries: any[] = [];
    for (const req of requests) {
      const start = req.start_date > startDate ? req.start_date : startDate;
      const end = req.end_date < endDate ? req.end_date : endDate;

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        entries.push({
          date: d.toISOString().split('T')[0],
          type: req.leave_type.code,
          status: req.status,
          request_id: req.id,
        });
      }
    }

    return entries;
  }
}

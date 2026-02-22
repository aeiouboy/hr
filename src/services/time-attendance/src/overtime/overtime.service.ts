import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitOtDto } from './dto/submit-ot.dto';
import { type CurrentUserInterface } from 'hrms-shared';

// Thai labor law OT rates
const OT_RATES = {
  weekday: 1.5,
  weekend: 2.0,
  holiday: 3.0,
};

const NIGHT_PREMIUM_RATE = 0.5;
const WEEKLY_OT_LIMIT = 36;

@Injectable()
export class OvertimeService {
  constructor(private readonly prisma: PrismaService) {}

  private isManagerOrHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('manager') || user.roles.includes('hr_manager') || user.roles.includes('hr_admin');
  }

  /**
   * Calculate OT amount based on Thai labor law rates
   */
  static calculateOTAmount(hours: number, hourlyRate: number, otType: string, nightHours = 0): {
    rate: number;
    amount: number;
    nightPremiumAmount: number;
    totalAmount: number;
  } {
    const rate = OT_RATES[otType as keyof typeof OT_RATES] || 1.5;
    const amount = hours * hourlyRate * rate;
    const nightPremiumAmount = nightHours * hourlyRate * NIGHT_PREMIUM_RATE;
    const totalAmount = amount + nightPremiumAmount;

    return {
      rate,
      amount: Math.round(amount * 100) / 100,
      nightPremiumAmount: Math.round(nightPremiumAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }

  /**
   * Check weekly OT limit (36 hours per Thai labor law)
   */
  async checkWeeklyLimit(employeeId: string, weekStart: Date, additionalHours: number): Promise<{ allowed: boolean; currentHours: number; remainingHours: number }> {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const existingRequests = await this.prisma.overtimeRequest.findMany({
      where: {
        employee_id: employeeId,
        date: { gte: weekStart, lte: weekEnd },
        status: { in: ['pending', 'approved', 'completed'] },
      },
    });

    const currentHours = existingRequests.reduce((sum, r) => sum + r.hours, 0);
    const remainingHours = WEEKLY_OT_LIMIT - currentHours;

    return {
      allowed: currentHours + additionalHours <= WEEKLY_OT_LIMIT,
      currentHours,
      remainingHours: Math.max(0, remainingHours),
    };
  }

  /**
   * Submit a new OT request
   */
  async submitRequest(dto: SubmitOtDto, currentUser: CurrentUserInterface) {
    const { rate, amount, nightPremiumAmount, totalAmount } = OvertimeService.calculateOTAmount(
      dto.hours,
      dto.hourly_rate,
      dto.ot_type,
      dto.night_hours || 0,
    );

    return this.prisma.overtimeRequest.create({
      data: {
        employee_id: dto.employee_id,
        date: new Date(dto.date),
        day_type: dto.day_type,
        start_time: dto.start_time,
        end_time: dto.end_time,
        hours: dto.hours,
        ot_type: dto.ot_type,
        rate,
        hourly_rate: dto.hourly_rate,
        amount,
        has_night_premium: dto.has_night_premium ?? false,
        night_hours: dto.night_hours ?? 0,
        night_premium_amount: nightPremiumAmount,
        total_amount: totalAmount,
        reason: dto.reason,
        work_description: dto.work_description,
        pre_approved: dto.pre_approved ?? false,
        status: 'pending',
      },
    });
  }

  /**
   * Approve an OT request (manager/HR only)
   */
  async approveRequest(id: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can approve OT requests');
    }

    const request = await this.prisma.overtimeRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('OT request not found');
    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be approved');
    }

    return this.prisma.overtimeRequest.update({
      where: { id },
      data: {
        status: 'approved',
        approved_at: new Date(),
        approved_by: currentUser.id,
      },
    });
  }

  /**
   * Reject an OT request (manager/HR only)
   */
  async rejectRequest(id: string, reason: string, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can reject OT requests');
    }

    const request = await this.prisma.overtimeRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('OT request not found');
    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be rejected');
    }

    return this.prisma.overtimeRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        rejected_at: new Date(),
        rejected_by: currentUser.id,
        rejection_reason: reason,
      },
    });
  }

  /**
   * Cancel an OT request (employee can cancel own pending request)
   */
  async cancelRequest(id: string, currentUser: CurrentUserInterface) {
    const request = await this.prisma.overtimeRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('OT request not found');

    if (request.employee_id !== currentUser.id && !this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('You can only cancel your own requests');
    }

    if (request.status !== 'pending') {
      throw new BadRequestException('Only pending requests can be cancelled');
    }

    return this.prisma.overtimeRequest.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }

  /**
   * Post-confirm OT after completion
   */
  async postConfirm(id: string, actualHours: number, currentUser: CurrentUserInterface) {
    if (!this.isManagerOrHr(currentUser)) {
      throw new ForbiddenException('Only managers or HR can post-confirm OT');
    }

    const request = await this.prisma.overtimeRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('OT request not found');
    if (request.status !== 'approved') {
      throw new BadRequestException('Only approved requests can be post-confirmed');
    }

    const { rate, amount, nightPremiumAmount, totalAmount } = OvertimeService.calculateOTAmount(
      actualHours,
      request.hourly_rate,
      request.ot_type,
      request.night_hours,
    );

    return this.prisma.overtimeRequest.update({
      where: { id },
      data: {
        status: 'completed',
        hours: actualHours,
        amount,
        night_premium_amount: nightPremiumAmount,
        total_amount: totalAmount,
        post_confirmed: true,
        post_confirmed_at: new Date(),
      },
    });
  }

  /**
   * Get OT requests for an employee with filters
   */
  async getRequests(employeeId: string, filters?: { status?: string; startDate?: string; endDate?: string; otType?: string }) {
    const where: any = { employee_id: employeeId };

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.startDate || filters?.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }
    if (filters?.otType) {
      where.ot_type = filters.otType;
    }

    return this.prisma.overtimeRequest.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }
}

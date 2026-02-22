import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

export interface OTValidationResult {
  rule: string;
  type: 'hard' | 'soft';
  passed: boolean;
  message: string;
}

const WEEKLY_OT_LIMIT = 36; // Thai labor law
const DAILY_MAX_OT_HOURS = 4; // Max OT hours beyond shift
const APPROVAL_CHAIN_THRESHOLD = 2; // Hours before requiring manager chain approval

@Injectable()
export class OTPolicyValidationService {
  constructor(private readonly prisma: PrismaService) {}

  async validateOvertimeRequest(
    request: {
      employee_id: string;
      date: string;
      hours: number;
      start_time: string;
      end_time: string;
      ot_type: string;
    },
    currentUser: CurrentUserInterface,
  ): Promise<OTValidationResult[]> {
    const results: OTValidationResult[] = [];

    const [weeklyResult, dailyResult, approvalResult, duplicateResult] = await Promise.all([
      this.checkWeeklyOTLimit(request),
      this.checkDailyMaxHours(request),
      this.checkApprovalChain(request),
      this.checkDuplicateRequest(request),
    ]);

    results.push(weeklyResult, dailyResult, approvalResult, duplicateResult);

    return results;
  }

  private getWeekBounds(dateStr: string): { weekStart: Date; weekEnd: Date } {
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)); // Monday
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday
    weekEnd.setHours(23, 59, 59, 999);
    return { weekStart, weekEnd };
  }

  private async checkWeeklyOTLimit(request: {
    employee_id: string;
    date: string;
    hours: number;
  }): Promise<OTValidationResult> {
    const { weekStart, weekEnd } = this.getWeekBounds(request.date);

    const existingRequests = await this.prisma.overtimeRequest.findMany({
      where: {
        employee_id: request.employee_id,
        date: { gte: weekStart, lte: weekEnd },
        status: { in: ['pending', 'approved', 'completed'] },
      },
    });

    const currentWeeklyHours = existingRequests.reduce((sum: number, r: any) => sum + r.hours, 0);
    const totalAfterRequest = currentWeeklyHours + request.hours;

    if (totalAfterRequest > WEEKLY_OT_LIMIT) {
      return {
        rule: 'weekly_ot_limit',
        type: 'hard',
        passed: false,
        message: `Weekly OT limit exceeded: ${currentWeeklyHours}h used + ${request.hours}h requested = ${totalAfterRequest}h (max 36 hours per Thai labor law)`,
      };
    }

    return {
      rule: 'weekly_ot_limit',
      type: 'hard',
      passed: true,
      message: `Weekly OT within limit: ${totalAfterRequest}h of ${WEEKLY_OT_LIMIT}h used`,
    };
  }

  private async checkDailyMaxHours(request: {
    hours: number;
    employee_id: string;
  }): Promise<OTValidationResult> {
    if (request.hours > DAILY_MAX_OT_HOURS) {
      return {
        rule: 'daily_max_hours',
        type: 'hard',
        passed: false,
        message: `Daily OT exceeds maximum: ${request.hours}h requested, max 4 hours beyond shift allowed`,
      };
    }

    return {
      rule: 'daily_max_hours',
      type: 'hard',
      passed: true,
      message: `Daily OT within limit: ${request.hours}h of ${DAILY_MAX_OT_HOURS}h max`,
    };
  }

  private async checkApprovalChain(request: {
    hours: number;
  }): Promise<OTValidationResult> {
    if (request.hours > APPROVAL_CHAIN_THRESHOLD) {
      return {
        rule: 'approval_chain',
        type: 'soft',
        passed: false,
        message: `OT > ${APPROVAL_CHAIN_THRESHOLD} hours requires manager chain approval`,
      };
    }

    return {
      rule: 'approval_chain',
      type: 'soft',
      passed: true,
      message: 'Standard approval sufficient',
    };
  }

  private async checkDuplicateRequest(request: {
    employee_id: string;
    date: string;
  }): Promise<OTValidationResult> {
    const requestDate = new Date(request.date);
    requestDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(requestDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const existing = await this.prisma.overtimeRequest.findMany({
      where: {
        employee_id: request.employee_id,
        date: { gte: requestDate, lt: nextDay },
        status: { in: ['pending', 'approved'] },
      },
    });

    if (existing.length > 0) {
      return {
        rule: 'duplicate_request',
        type: 'hard',
        passed: false,
        message: 'Duplicate OT request: an OT request already exists for this date',
      };
    }

    return {
      rule: 'duplicate_request',
      type: 'hard',
      passed: true,
      message: 'No duplicate OT request found',
    };
  }
}

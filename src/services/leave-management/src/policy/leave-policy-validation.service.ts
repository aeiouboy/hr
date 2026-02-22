import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

export interface ValidationResult {
  rule: string;
  type: 'hard' | 'soft';
  passed: boolean;
  message: string;
}

const MINIMUM_NOTICE_DAYS = 3;
const TEAM_CAPACITY_THRESHOLD = 0.3; // 30%

@Injectable()
export class LeavePolicyValidationService {
  constructor(private readonly prisma: PrismaService) {}

  async validateLeaveRequest(
    request: {
      employee_id: string;
      leave_type_id: string;
      start_date: string;
      end_date: string;
      days: number;
      team_id?: string;
      team_size?: number;
    },
    currentUser: CurrentUserInterface,
  ): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const [balanceResult, conflictResult, noticeResult, capacityResult] = await Promise.all([
      this.checkLeaveBalance(request),
      this.checkCalendarConflict(request),
      this.checkMinimumNotice(request),
      this.checkTeamCapacity(request),
    ]);

    results.push(balanceResult, conflictResult, noticeResult, capacityResult);

    return results;
  }

  private async checkLeaveBalance(request: {
    employee_id: string;
    leave_type_id: string;
    start_date: string;
    days: number;
  }): Promise<ValidationResult> {
    const year = new Date(request.start_date).getFullYear();
    const balance = await this.prisma.leaveBalance.findFirst({
      where: {
        employee_id: request.employee_id,
        leave_type_id: request.leave_type_id,
        year,
      },
    });

    if (!balance) {
      return {
        rule: 'leave_balance',
        type: 'hard',
        passed: false,
        message: 'Insufficient leave balance: no balance record found',
      };
    }

    if (balance.remaining < request.days) {
      return {
        rule: 'leave_balance',
        type: 'hard',
        passed: false,
        message: `Insufficient leave balance: ${balance.remaining} days remaining, ${request.days} requested`,
      };
    }

    return {
      rule: 'leave_balance',
      type: 'hard',
      passed: true,
      message: `Leave balance sufficient: ${balance.remaining} days remaining`,
    };
  }

  private async checkCalendarConflict(request: {
    employee_id: string;
    start_date: string;
    end_date: string;
  }): Promise<ValidationResult> {
    const conflicts = await this.prisma.leaveRequest.findMany({
      where: {
        employee_id: request.employee_id,
        status: { in: ['pending', 'approved'] },
        start_date: { lte: new Date(request.end_date) },
        end_date: { gte: new Date(request.start_date) },
      },
    });

    if (conflicts.length > 0) {
      return {
        rule: 'calendar_conflict',
        type: 'hard',
        passed: false,
        message: 'Leave dates overlap with existing approved or pending leave',
      };
    }

    return {
      rule: 'calendar_conflict',
      type: 'hard',
      passed: true,
      message: 'No calendar conflicts found',
    };
  }

  private async checkMinimumNotice(request: {
    start_date: string;
    leave_type_id?: string;
  }): Promise<ValidationResult> {
    const startDate = new Date(request.start_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < MINIMUM_NOTICE_DAYS) {
      return {
        rule: 'minimum_notice',
        type: 'soft',
        passed: false,
        message: `Short notice: annual leave requires ${MINIMUM_NOTICE_DAYS} days notice, only ${diffDays} day(s) given`,
      };
    }

    return {
      rule: 'minimum_notice',
      type: 'soft',
      passed: true,
      message: 'Sufficient notice period provided',
    };
  }

  private async checkTeamCapacity(request: {
    employee_id: string;
    start_date: string;
    end_date: string;
    team_id?: string;
    team_size?: number;
  }): Promise<ValidationResult> {
    const teamSize = request.team_size || 10; // Default team size

    // Find team members on leave during the same period
    const teamLeaves = await this.prisma.leaveRequest.findMany({
      where: {
        employee_id: { not: request.employee_id },
        status: { in: ['approved', 'pending'] },
        start_date: { lte: new Date(request.end_date) },
        end_date: { gte: new Date(request.start_date) },
        ...(request.team_id ? {} : {}),
      },
    });

    const uniqueEmployeesOnLeave = new Set(teamLeaves.map((l: any) => l.employee_id)).size;
    const capacityUsed = (uniqueEmployeesOnLeave + 1) / teamSize; // +1 for current request

    if (capacityUsed > TEAM_CAPACITY_THRESHOLD) {
      return {
        rule: 'team_capacity',
        type: 'soft',
        passed: false,
        message: `Team capacity warning: ${uniqueEmployeesOnLeave + 1} of ${teamSize} team members would be on leave (>${Math.round(TEAM_CAPACITY_THRESHOLD * 100)}%)`,
      };
    }

    return {
      rule: 'team_capacity',
      type: 'soft',
      passed: true,
      message: 'Team has sufficient capacity',
    };
  }
}

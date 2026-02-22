import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RecordAttendanceDto } from './dto/record-attendance.dto';

interface ShiftInfo {
  start_time: string;
  end_time: string;
  break_minutes: number;
  work_hours: number;
}

interface ConfigInfo {
  late_threshold_minutes: number;
  early_departure_threshold_minutes: number;
  consecutive_absence_alert_days: number;
  work_hours_per_day: number;
  break_minutes: number;
}

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Parse HH:MM string to minutes since midnight
   */
  static parseTime(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  /**
   * Calculate working hours from check-in/check-out times
   */
  static calculateWorkingHours(checkIn: string, checkOut: string, breakMinutes: number): number {
    const inMinutes = AttendanceService.parseTime(checkIn);
    let outMinutes = AttendanceService.parseTime(checkOut);

    // Handle overnight shifts
    if (outMinutes <= inMinutes) {
      outMinutes += 24 * 60;
    }

    const totalMinutes = outMinutes - inMinutes - breakMinutes;
    return Math.max(0, Math.round((totalMinutes / 60) * 100) / 100);
  }

  /**
   * Detect anomalies in an attendance record
   */
  static detectAnomalies(
    record: { actual_check_in?: string | null; actual_check_out?: string | null; overtime_hours?: number },
    shift: ShiftInfo | null,
    config: ConfigInfo,
  ): string[] {
    const anomalies: string[] = [];

    if (!record.actual_check_in && !record.actual_check_out) {
      return anomalies;
    }

    if (!record.actual_check_in) {
      anomalies.push('missing_checkin');
    }

    if (!record.actual_check_out) {
      anomalies.push('missing_checkout');
    }

    if (shift && record.actual_check_in) {
      const scheduledStart = AttendanceService.parseTime(shift.start_time);
      const actualStart = AttendanceService.parseTime(record.actual_check_in);
      if (actualStart > scheduledStart + config.late_threshold_minutes) {
        anomalies.push('late_arrival');
      }
    }

    if (shift && record.actual_check_out) {
      const scheduledEnd = AttendanceService.parseTime(shift.end_time);
      const actualEnd = AttendanceService.parseTime(record.actual_check_out);
      if (actualEnd < scheduledEnd - config.early_departure_threshold_minutes) {
        anomalies.push('early_departure');
      }
    }

    if (record.overtime_hours && record.overtime_hours > 0) {
      anomalies.push('unapproved_ot');
    }

    return anomalies;
  }

  /**
   * Create or update an attendance record
   */
  async recordAttendance(dto: RecordAttendanceDto) {
    const date = new Date(dto.date);
    let shift: ShiftInfo | null = null;
    let scheduledStart: string | null = null;
    let scheduledEnd: string | null = null;

    if (dto.shift_id) {
      const shiftRecord = await this.prisma.shift.findUnique({ where: { id: dto.shift_id } });
      if (shiftRecord) {
        shift = shiftRecord;
        scheduledStart = shiftRecord.start_time;
        scheduledEnd = shiftRecord.end_time;
      }
    }

    const breakMinutes = shift ? shift.break_minutes : 60;
    let workingHours: number | null = null;
    let overtimeHours = 0;
    let isLate = false;
    let lateMinutes = 0;
    let isEarlyDeparture = false;
    let earlyMinutes = 0;

    if (dto.actual_check_in && dto.actual_check_out) {
      workingHours = AttendanceService.calculateWorkingHours(dto.actual_check_in, dto.actual_check_out, breakMinutes);
      const standardHours = shift ? shift.work_hours : 8;
      if (workingHours > standardHours) {
        overtimeHours = Math.round((workingHours - standardHours) * 100) / 100;
      }
    }

    if (shift && dto.actual_check_in) {
      const scheduledStartMin = AttendanceService.parseTime(shift.start_time);
      const actualStartMin = AttendanceService.parseTime(dto.actual_check_in);
      if (actualStartMin > scheduledStartMin) {
        lateMinutes = actualStartMin - scheduledStartMin;
        isLate = lateMinutes > 0;
      }
    }

    if (shift && dto.actual_check_out) {
      const scheduledEndMin = AttendanceService.parseTime(shift.end_time);
      const actualEndMin = AttendanceService.parseTime(dto.actual_check_out);
      if (actualEndMin < scheduledEndMin) {
        earlyMinutes = scheduledEndMin - actualEndMin;
        isEarlyDeparture = earlyMinutes > 0;
      }
    }

    let status = 'present';
    if (!dto.actual_check_in && !dto.actual_check_out) {
      status = 'absent';
    } else if (!dto.actual_check_in || !dto.actual_check_out) {
      status = 'incomplete';
    }

    const config: ConfigInfo = {
      late_threshold_minutes: 15,
      early_departure_threshold_minutes: 30,
      consecutive_absence_alert_days: 3,
      work_hours_per_day: 8,
      break_minutes: 60,
    };

    const anomalies = AttendanceService.detectAnomalies(
      { actual_check_in: dto.actual_check_in, actual_check_out: dto.actual_check_out, overtime_hours: overtimeHours },
      shift,
      config,
    );

    return this.prisma.attendanceRecord.upsert({
      where: {
        employee_id_date: { employee_id: dto.employee_id, date },
      },
      update: {
        shift_id: dto.shift_id,
        scheduled_start: scheduledStart,
        scheduled_end: scheduledEnd,
        actual_check_in: dto.actual_check_in,
        actual_check_out: dto.actual_check_out,
        check_in_source: dto.check_in_source,
        check_in_location: dto.check_in_location,
        check_out_source: dto.check_out_source,
        check_out_location: dto.check_out_location,
        working_hours: workingHours,
        overtime_hours: overtimeHours,
        is_late: isLate,
        late_minutes: lateMinutes,
        is_early_departure: isEarlyDeparture,
        early_minutes: earlyMinutes,
        status,
        anomalies,
      },
      create: {
        employee_id: dto.employee_id,
        date,
        shift_id: dto.shift_id,
        scheduled_start: scheduledStart,
        scheduled_end: scheduledEnd,
        actual_check_in: dto.actual_check_in,
        actual_check_out: dto.actual_check_out,
        check_in_source: dto.check_in_source,
        check_in_location: dto.check_in_location,
        check_out_source: dto.check_out_source,
        check_out_location: dto.check_out_location,
        working_hours: workingHours,
        overtime_hours: overtimeHours,
        is_late: isLate,
        late_minutes: lateMinutes,
        is_early_departure: isEarlyDeparture,
        early_minutes: earlyMinutes,
        status,
        anomalies,
      },
    });
  }

  /**
   * Get attendance records for an employee within a date range
   */
  async getByEmployee(employeeId: string, startDate: string, endDate: string) {
    return this.prisma.attendanceRecord.findMany({
      where: {
        employee_id: employeeId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: { shift: true },
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Get all attendance records for a specific date
   */
  async getByDate(date: string) {
    return this.prisma.attendanceRecord.findMany({
      where: { date: new Date(date) },
      include: { shift: true },
      orderBy: { employee_id: 'asc' },
    });
  }

  /**
   * Get monthly summary for an employee
   */
  async getMonthlySummary(employeeId: string, yearMonth: string) {
    const [yearStr, monthStr] = yearMonth.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await this.prisma.attendanceRecord.findMany({
      where: {
        employee_id: employeeId,
        date: { gte: startDate, lte: endDate },
      },
    });

    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === 'present').length;
    const absentDays = records.filter(r => r.status === 'absent').length;
    const incompleteDays = records.filter(r => r.status === 'incomplete').length;
    const leaveDays = records.filter(r => r.status === 'leave').length;
    const lateDays = records.filter(r => r.is_late).length;
    const earlyDepartureDays = records.filter(r => r.is_early_departure).length;
    const totalWorkingHours = records.reduce((sum, r) => sum + (r.working_hours || 0), 0);
    const totalOvertimeHours = records.reduce((sum, r) => sum + r.overtime_hours, 0);
    const totalLateMinutes = records.reduce((sum, r) => sum + r.late_minutes, 0);
    const totalEarlyMinutes = records.reduce((sum, r) => sum + r.early_minutes, 0);

    return {
      employee_id: employeeId,
      year_month: yearMonth,
      total_days: totalDays,
      present_days: presentDays,
      absent_days: absentDays,
      incomplete_days: incompleteDays,
      leave_days: leaveDays,
      late_days: lateDays,
      early_departure_days: earlyDepartureDays,
      total_working_hours: Math.round(totalWorkingHours * 100) / 100,
      total_overtime_hours: Math.round(totalOvertimeHours * 100) / 100,
      total_late_minutes: totalLateMinutes,
      total_early_minutes: totalEarlyMinutes,
    };
  }
}

import { AttendanceService } from '../../src/attendance/attendance.service';

const mockPrisma = {
  shift: {
    findUnique: jest.fn(),
  },
  attendanceRecord: {
    upsert: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AttendanceService(mockPrisma as any);
  });

  describe('parseTime (static)', () => {
    it('should parse HH:MM to minutes', () => {
      expect(AttendanceService.parseTime('08:00')).toBe(480);
      expect(AttendanceService.parseTime('17:30')).toBe(1050);
      expect(AttendanceService.parseTime('00:00')).toBe(0);
      expect(AttendanceService.parseTime('23:59')).toBe(1439);
    });
  });

  describe('calculateWorkingHours (static)', () => {
    it('should calculate standard working hours', () => {
      expect(AttendanceService.calculateWorkingHours('08:00', '17:00', 60)).toBe(8);
    });

    it('should subtract break time', () => {
      expect(AttendanceService.calculateWorkingHours('08:00', '17:00', 0)).toBe(9);
      expect(AttendanceService.calculateWorkingHours('08:00', '17:00', 30)).toBe(8.5);
    });

    it('should handle overnight shifts', () => {
      const hours = AttendanceService.calculateWorkingHours('22:00', '06:00', 60);
      expect(hours).toBe(7);
    });

    it('should return 0 for negative hours', () => {
      expect(AttendanceService.calculateWorkingHours('08:00', '08:30', 60)).toBe(0);
    });
  });

  describe('detectAnomalies (static)', () => {
    const shift = { start_time: '08:00', end_time: '17:00', break_minutes: 60, work_hours: 8 };
    const config = {
      late_threshold_minutes: 15,
      early_departure_threshold_minutes: 30,
      consecutive_absence_alert_days: 3,
      work_hours_per_day: 8,
      break_minutes: 60,
    };

    it('should detect missing_checkin', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: null, actual_check_out: '17:00' },
        shift,
        config,
      );
      expect(anomalies).toContain('missing_checkin');
    });

    it('should detect missing_checkout', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:00', actual_check_out: null },
        shift,
        config,
      );
      expect(anomalies).toContain('missing_checkout');
    });

    it('should detect late_arrival when beyond threshold', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:20', actual_check_out: '17:00' },
        shift,
        config,
      );
      expect(anomalies).toContain('late_arrival');
    });

    it('should NOT detect late_arrival within threshold', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:10', actual_check_out: '17:00' },
        shift,
        config,
      );
      expect(anomalies).not.toContain('late_arrival');
    });

    it('should detect early_departure when beyond threshold', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:00', actual_check_out: '16:20' },
        shift,
        config,
      );
      expect(anomalies).toContain('early_departure');
    });

    it('should NOT detect early_departure within threshold', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:00', actual_check_out: '16:40' },
        shift,
        config,
      );
      expect(anomalies).not.toContain('early_departure');
    });

    it('should detect unapproved_ot', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '08:00', actual_check_out: '19:00', overtime_hours: 2 },
        shift,
        config,
      );
      expect(anomalies).toContain('unapproved_ot');
    });

    it('should return empty array when no check-in and no check-out', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: undefined, actual_check_out: undefined },
        shift,
        config,
      );
      expect(anomalies).toEqual([]);
    });

    it('should handle null shift (no late/early detection)', () => {
      const anomalies = AttendanceService.detectAnomalies(
        { actual_check_in: '10:00', actual_check_out: '15:00' },
        null,
        config,
      );
      expect(anomalies).not.toContain('late_arrival');
      expect(anomalies).not.toContain('early_departure');
    });
  });

  describe('recordAttendance', () => {
    it('should create an attendance record', async () => {
      mockPrisma.attendanceRecord.upsert.mockResolvedValue({ id: '1', employee_id: 'EMP001' });

      const result = await service.recordAttendance({
        employee_id: 'EMP001',
        date: '2026-02-20',
        actual_check_in: '08:00',
        actual_check_out: '17:00',
      });
      expect(result.employee_id).toBe('EMP001');
      expect(mockPrisma.attendanceRecord.upsert).toHaveBeenCalled();
    });

    it('should look up shift when shift_id is provided', async () => {
      const shift = { id: 'shift-1', start_time: '08:00', end_time: '17:00', break_minutes: 60, work_hours: 8 };
      mockPrisma.shift.findUnique.mockResolvedValue(shift);
      mockPrisma.attendanceRecord.upsert.mockResolvedValue({ id: '1' });

      await service.recordAttendance({
        employee_id: 'EMP001',
        date: '2026-02-20',
        shift_id: 'shift-1',
        actual_check_in: '08:00',
        actual_check_out: '17:00',
      });

      expect(mockPrisma.shift.findUnique).toHaveBeenCalledWith({ where: { id: 'shift-1' } });
    });

    it('should set status to absent when no check-in/out', async () => {
      mockPrisma.attendanceRecord.upsert.mockImplementation(({ create }) => Promise.resolve(create));

      const result = await service.recordAttendance({
        employee_id: 'EMP001',
        date: '2026-02-20',
      });
      expect(result.status).toBe('absent');
    });

    it('should set status to incomplete when only check-in', async () => {
      mockPrisma.attendanceRecord.upsert.mockImplementation(({ create }) => Promise.resolve(create));

      const result = await service.recordAttendance({
        employee_id: 'EMP001',
        date: '2026-02-20',
        actual_check_in: '08:00',
      });
      expect(result.status).toBe('incomplete');
    });
  });

  describe('getByEmployee', () => {
    it('should return records for date range', async () => {
      const records = [{ id: '1' }, { id: '2' }];
      mockPrisma.attendanceRecord.findMany.mockResolvedValue(records);

      const result = await service.getByEmployee('EMP001', '2026-02-01', '2026-02-28');
      expect(result).toEqual(records);
      expect(mockPrisma.attendanceRecord.findMany).toHaveBeenCalledWith({
        where: {
          employee_id: 'EMP001',
          date: {
            gte: expect.any(Date),
            lte: expect.any(Date),
          },
        },
        include: { shift: true },
        orderBy: { date: 'asc' },
      });
    });
  });

  describe('getByDate', () => {
    it('should return all records for a date', async () => {
      const records = [{ id: '1' }, { id: '2' }];
      mockPrisma.attendanceRecord.findMany.mockResolvedValue(records);

      const result = await service.getByDate('2026-02-20');
      expect(result).toEqual(records);
    });
  });

  describe('getMonthlySummary', () => {
    it('should aggregate monthly stats', async () => {
      const records = [
        { status: 'present', is_late: false, is_early_departure: false, working_hours: 8, overtime_hours: 0, late_minutes: 0, early_minutes: 0 },
        { status: 'present', is_late: true, is_early_departure: false, working_hours: 7.5, overtime_hours: 0, late_minutes: 30, early_minutes: 0 },
        { status: 'absent', is_late: false, is_early_departure: false, working_hours: 0, overtime_hours: 0, late_minutes: 0, early_minutes: 0 },
        { status: 'present', is_late: false, is_early_departure: true, working_hours: 9, overtime_hours: 1, late_minutes: 0, early_minutes: 20 },
        { status: 'leave', is_late: false, is_early_departure: false, working_hours: 0, overtime_hours: 0, late_minutes: 0, early_minutes: 0 },
      ];
      mockPrisma.attendanceRecord.findMany.mockResolvedValue(records);

      const result = await service.getMonthlySummary('EMP001', '2026-02');
      expect(result.employee_id).toBe('EMP001');
      expect(result.total_days).toBe(5);
      expect(result.present_days).toBe(3);
      expect(result.absent_days).toBe(1);
      expect(result.leave_days).toBe(1);
      expect(result.late_days).toBe(1);
      expect(result.early_departure_days).toBe(1);
      expect(result.total_working_hours).toBe(24.5);
      expect(result.total_overtime_hours).toBe(1);
      expect(result.total_late_minutes).toBe(30);
      expect(result.total_early_minutes).toBe(20);
    });

    it('should return zeros for empty month', async () => {
      mockPrisma.attendanceRecord.findMany.mockResolvedValue([]);

      const result = await service.getMonthlySummary('EMP001', '2026-03');
      expect(result.total_days).toBe(0);
      expect(result.present_days).toBe(0);
      expect(result.total_working_hours).toBe(0);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OTPolicyValidationService, OTValidationResult } from './ot-policy-validation.service';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  overtimeRequest: {
    findMany: jest.fn(),
  },
  attendanceRecord: {
    findFirst: jest.fn(),
  },
  shift: {
    findFirst: jest.fn(),
  },
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Test',
  lastName: 'Employee',
  roles: ['employee'],
};

const mockShift = {
  id: 'shift-001',
  code: 'DAY',
  start_time: '09:00',
  end_time: '18:00',
  work_hours: 8,
  break_minutes: 60,
};

describe('OTPolicyValidationService', () => {
  let service: OTPolicyValidationService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OTPolicyValidationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OTPolicyValidationService>(OTPolicyValidationService);
    prisma = mockPrisma;
  });

  describe('validateOvertimeRequest', () => {
    const baseRequest = {
      employee_id: 'EMP001',
      date: '2026-03-10',
      hours: 2,
      start_time: '18:00',
      end_time: '20:00',
      ot_type: 'weekday',
    };

    it('should return all rules passed for a valid OT request', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(baseRequest, mockEmployee);

      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBeGreaterThanOrEqual(3);
      const allPassed = results.every((r: OTValidationResult) => r.passed);
      expect(allPassed).toBe(true);
    });

    it('should fail weekly_ot_limit when exceeding 36-hour weekly cap (hard rule)', async () => {
      // Already 35 hours this week
      prisma.overtimeRequest.findMany.mockResolvedValue([
        { employee_id: 'EMP001', hours: 20, status: 'approved', date: new Date('2026-03-09') },
        { employee_id: 'EMP001', hours: 15, status: 'approved', date: new Date('2026-03-08') },
      ]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 3 },
        mockEmployee,
      );

      const weeklyRule = results.find((r: OTValidationResult) => r.rule === 'weekly_ot_limit');
      expect(weeklyRule!.passed).toBe(false);
      expect(weeklyRule!.type).toBe('hard');
      expect(weeklyRule!.message).toContain('36');
    });

    it('should pass weekly_ot_limit when within 36-hour cap', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([
        { employee_id: 'EMP001', hours: 10, status: 'approved', date: new Date('2026-03-09') },
      ]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 2 },
        mockEmployee,
      );

      const weeklyRule = results.find((r: OTValidationResult) => r.rule === 'weekly_ot_limit');
      expect(weeklyRule!.passed).toBe(true);
    });

    it('should fail daily_max_hours when exceeding shift + 4 hours (hard rule)', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 5 },
        mockEmployee,
      );

      const dailyRule = results.find((r: OTValidationResult) => r.rule === 'daily_max_hours');
      expect(dailyRule!.passed).toBe(false);
      expect(dailyRule!.type).toBe('hard');
      expect(dailyRule!.message).toContain('4');
    });

    it('should pass daily_max_hours when within shift + 4 hours', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 3 },
        mockEmployee,
      );

      const dailyRule = results.find((r: OTValidationResult) => r.rule === 'daily_max_hours');
      expect(dailyRule!.passed).toBe(true);
    });

    it('should warn on approval_chain when OT > 2 hours (soft rule)', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 3 },
        mockEmployee,
      );

      const approvalRule = results.find((r: OTValidationResult) => r.rule === 'approval_chain');
      expect(approvalRule!.passed).toBe(false);
      expect(approvalRule!.type).toBe('soft');
      expect(approvalRule!.message).toContain('approval');
    });

    it('should pass approval_chain when OT <= 2 hours', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(
        { ...baseRequest, hours: 1.5 },
        mockEmployee,
      );

      const approvalRule = results.find((r: OTValidationResult) => r.rule === 'approval_chain');
      expect(approvalRule!.passed).toBe(true);
    });

    it('should fail duplicate_request when same-date OT exists (hard rule)', async () => {
      prisma.overtimeRequest.findMany.mockImplementation((args: any) => {
        // For duplicate check (filtered by exact date)
        if (args?.where?.date) {
          return Promise.resolve([
            { id: 'ot-existing', employee_id: 'EMP001', date: new Date('2026-03-10'), status: 'pending' },
          ]);
        }
        // For weekly limit check
        return Promise.resolve([]);
      });
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(baseRequest, mockEmployee);

      const dupeRule = results.find((r: OTValidationResult) => r.rule === 'duplicate_request');
      expect(dupeRule!.passed).toBe(false);
      expect(dupeRule!.type).toBe('hard');
    });

    it('should pass duplicate_request when no existing OT for date', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(baseRequest, mockEmployee);

      const dupeRule = results.find((r: OTValidationResult) => r.rule === 'duplicate_request');
      expect(dupeRule!.passed).toBe(true);
    });

    it('should include rule, type, passed, and message in each result', async () => {
      prisma.overtimeRequest.findMany.mockResolvedValue([]);
      prisma.shift.findFirst.mockResolvedValue(structuredClone(mockShift));

      const results = await service.validateOvertimeRequest(baseRequest, mockEmployee);

      for (const result of results) {
        expect(result).toHaveProperty('rule');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('passed');
        expect(result).toHaveProperty('message');
        expect(['hard', 'soft']).toContain(result.type);
      }
    });
  });
});

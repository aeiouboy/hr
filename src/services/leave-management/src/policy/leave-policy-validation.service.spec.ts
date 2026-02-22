import { Test, TestingModule } from '@nestjs/testing';
import { LeavePolicyValidationService, ValidationResult } from './leave-policy-validation.service';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  leaveBalance: {
    findFirst: jest.fn(),
  },
  leaveRequest: {
    findMany: jest.fn(),
  },
  leaveType: {
    findUnique: jest.fn(),
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

const mockBalance = {
  id: 'bal-001',
  employee_id: 'EMP001',
  leave_type_id: 'lt-annual',
  year: 2026,
  entitled: 10,
  used: 2,
  pending: 1,
  remaining: 7,
  carry_over: 0,
};

const mockLeaveType = {
  id: 'lt-annual',
  code: 'annual',
  name_en: 'Annual Leave',
  name_th: 'ลาพักร้อน',
  max_days: 10,
  requires_medical_cert: false,
  is_active: true,
};

describe('LeavePolicyValidationService', () => {
  let service: LeavePolicyValidationService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeavePolicyValidationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LeavePolicyValidationService>(LeavePolicyValidationService);
    prisma = mockPrisma;
  });

  describe('validateLeaveRequest', () => {
    const baseRequest = {
      employee_id: 'EMP001',
      leave_type_id: 'lt-annual',
      start_date: '2026-03-10',
      end_date: '2026-03-12',
      days: 3,
      team_id: 'TEAM001',
    };

    it('should return all rules passed when request is valid', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBeGreaterThanOrEqual(3);
      const balanceRule = results.find((r: ValidationResult) => r.rule === 'leave_balance');
      expect(balanceRule).toBeDefined();
      expect(balanceRule!.passed).toBe(true);
      expect(balanceRule!.type).toBe('hard');
    });

    it('should fail leave_balance rule when balance is insufficient', async () => {
      const lowBalance = { ...mockBalance, remaining: 1 };
      prisma.leaveBalance.findFirst.mockResolvedValue(lowBalance);
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(
        { ...baseRequest, days: 3 },
        mockEmployee,
      );

      const balanceRule = results.find((r: ValidationResult) => r.rule === 'leave_balance');
      expect(balanceRule!.passed).toBe(false);
      expect(balanceRule!.type).toBe('hard');
      expect(balanceRule!.message).toContain('Insufficient');
    });

    it('should fail leave_balance when no balance record exists', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(null);
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      const balanceRule = results.find((r: ValidationResult) => r.rule === 'leave_balance');
      expect(balanceRule!.passed).toBe(false);
      expect(balanceRule!.type).toBe('hard');
    });

    it('should fail calendar_conflict rule when dates overlap with approved leave', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([
        {
          id: 'lr-existing',
          employee_id: 'EMP001',
          start_date: new Date('2026-03-11'),
          end_date: new Date('2026-03-13'),
          status: 'approved',
        },
      ]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      const conflictRule = results.find((r: ValidationResult) => r.rule === 'calendar_conflict');
      expect(conflictRule!.passed).toBe(false);
      expect(conflictRule!.type).toBe('hard');
      expect(conflictRule!.message).toContain('overlap');
    });

    it('should pass calendar_conflict when no overlapping requests', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      const conflictRule = results.find((r: ValidationResult) => r.rule === 'calendar_conflict');
      expect(conflictRule!.passed).toBe(true);
    });

    it('should warn on short notice for annual leave (soft rule)', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      // Request for tomorrow (less than 3 days notice)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(tomorrow);
      dayAfter.setDate(dayAfter.getDate() + 1);

      const shortNoticeReq = {
        ...baseRequest,
        start_date: tomorrow.toISOString().split('T')[0],
        end_date: dayAfter.toISOString().split('T')[0],
        days: 1,
      };

      const results = await service.validateLeaveRequest(shortNoticeReq, mockEmployee);

      const noticeRule = results.find((r: ValidationResult) => r.rule === 'minimum_notice');
      expect(noticeRule!.passed).toBe(false);
      expect(noticeRule!.type).toBe('soft');
      expect(noticeRule!.message).toContain('notice');
    });

    it('should pass minimum_notice when sufficient notice given', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      // Request 10 days from now
      const future = new Date();
      future.setDate(future.getDate() + 10);

      const results = await service.validateLeaveRequest(
        { ...baseRequest, start_date: future.toISOString().split('T')[0] },
        mockEmployee,
      );

      const noticeRule = results.find((r: ValidationResult) => r.rule === 'minimum_notice');
      expect(noticeRule!.passed).toBe(true);
    });

    it('should warn on team_capacity when >30% of team already on leave (soft rule)', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      // 4 team members already on leave out of ~10 (>30%)
      prisma.leaveRequest.findMany.mockImplementation((args: any) => {
        if (args?.where?.employee_id === 'EMP001') return Promise.resolve([]);
        // Team leave query - return many team members on leave
        return Promise.resolve([
          { employee_id: 'EMP002', status: 'approved' },
          { employee_id: 'EMP003', status: 'approved' },
          { employee_id: 'EMP004', status: 'approved' },
          { employee_id: 'EMP005', status: 'approved' },
        ]);
      });
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(
        { ...baseRequest, team_size: 10 },
        mockEmployee,
      );

      const capacityRule = results.find((r: ValidationResult) => r.rule === 'team_capacity');
      expect(capacityRule!.passed).toBe(false);
      expect(capacityRule!.type).toBe('soft');
      expect(capacityRule!.message).toContain('team');
    });

    it('should pass team_capacity when team has available capacity', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockImplementation((args: any) => {
        if (args?.where?.employee_id === 'EMP001') return Promise.resolve([]);
        // Only 1 team member on leave
        return Promise.resolve([{ employee_id: 'EMP002', status: 'approved' }]);
      });
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(
        { ...baseRequest, team_size: 10 },
        mockEmployee,
      );

      const capacityRule = results.find((r: ValidationResult) => r.rule === 'team_capacity');
      expect(capacityRule!.passed).toBe(true);
    });

    it('should return both hard and soft rules in results', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      const hardRules = results.filter((r: ValidationResult) => r.type === 'hard');
      const softRules = results.filter((r: ValidationResult) => r.type === 'soft');
      expect(hardRules.length).toBeGreaterThanOrEqual(2);
      expect(softRules.length).toBeGreaterThanOrEqual(1);
    });

    it('should include rule, type, passed, and message in each result', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveType.findUnique.mockResolvedValue(structuredClone(mockLeaveType));

      const results = await service.validateLeaveRequest(baseRequest, mockEmployee);

      for (const result of results) {
        expect(result).toHaveProperty('rule');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('passed');
        expect(result).toHaveProperty('message');
        expect(['hard', 'soft']).toContain(result.type);
        expect(typeof result.passed).toBe('boolean');
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LeaveService } from '../../src/leave/leave.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  leaveType: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  leaveBalance: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  leaveRequest: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'chongrak.t@centralgroup.com',
  username: 'chongrak.t',
  firstName: 'Chongrak',
  lastName: 'Tanaka',
  roles: ['employee'],
};

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Manager',
  lastName: 'User',
  roles: ['manager'],
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockLeaveType: Record<string, any> = {
  id: 'lt-annual',
  code: 'annual',
  name_en: 'Annual Leave',
  name_th: 'ลาพักร้อน',
  max_days: 10,
  requires_medical_cert: false,
  medical_cert_days: null,
  applicable_gender: null,
  max_per_career: null,
  is_active: true,
};

const mockSickLeaveType: Record<string, any> = {
  id: 'lt-sick',
  code: 'sick',
  name_en: 'Sick Leave',
  name_th: 'ลาป่วย',
  max_days: 30,
  requires_medical_cert: true,
  medical_cert_days: 3,
  applicable_gender: null,
  max_per_career: null,
  is_active: true,
};

const mockBalance = {
  id: 'bal-001',
  employee_id: 'EMP001',
  leave_type_id: 'lt-annual',
  year: 2026,
  entitled: 10,
  used: 2,
  pending: 0,
  remaining: 8,
  carry_over: 0,
};

const mockLeaveRequest: Record<string, any> = {
  id: 'lr-001',
  employee_id: 'EMP001',
  leave_type_id: 'lt-annual',
  start_date: new Date('2026-03-02'),
  end_date: new Date('2026-03-04'),
  days: 3,
  half_day: null,
  reason: 'Family vacation',
  status: 'pending',
  substitute_id: null,
  attachments: null,
  approved_by: null,
  approved_date: null,
  rejection_reason: null,
  submitted_at: new Date('2026-02-20'),
  created_at: new Date('2026-02-20'),
  updated_at: new Date('2026-02-20'),
  leave_type: mockLeaveType,
};

describe('LeaveService', () => {
  let service: LeaveService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaveService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LeaveService>(LeaveService);
    prisma = mockPrismaService;
  });

  describe('createLeaveRequest', () => {
    const createDto = {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-04',
      days: 3,
      reason: 'Family vacation',
    };

    it('should create a leave request successfully', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveRequest.create.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await service.createLeaveRequest('EMP001', createDto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('lr-001');
      expect(result.status).toBe('pending');
      expect(result.employee_id).toBe('EMP001');
      expect(prisma.leaveRequest.create).toHaveBeenCalled();
    });

    it('should reject if balance is insufficient', async () => {
      const lowBalance = { ...mockBalance, remaining: 1 };
      prisma.leaveBalance.findFirst.mockResolvedValue(lowBalance);

      await expect(
        service.createLeaveRequest('EMP001', { ...createDto, days: 5 }, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject if no balance record exists', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(null);

      await expect(
        service.createLeaveRequest('EMP001', createDto, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should detect calendar conflicts with existing requests', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([structuredClone(mockLeaveRequest)]);

      await expect(
        service.createLeaveRequest('EMP001', createDto, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject if employee tries to create request for another employee', async () => {
      await expect(
        service.createLeaveRequest('EMP999', createDto, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow HR to create request for another employee', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveRequest.create.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await service.createLeaveRequest('EMP001', createDto, mockHrAdminUser);

      expect(result).toBeDefined();
    });

    it('should support half-day leave request', async () => {
      const halfDayDto = { ...createDto, half_day: 'morning', days: 0.5 };
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveRequest.create.mockResolvedValue({
        ...mockLeaveRequest,
        half_day: 'morning',
        days: 0.5,
      });

      const result = await service.createLeaveRequest('EMP001', halfDayDto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.half_day).toBe('morning');
      expect(result.days).toBe(0.5);
    });

    it('should include leave_type in created request', async () => {
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveRequest.create.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await service.createLeaveRequest('EMP001', createDto, mockEmployeeUser);

      expect(result.leave_type).toBeDefined();
      expect(result.leave_type.code).toBe('annual');
    });
  });

  describe('findById', () => {
    it('should return leave request detail with leave type', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await service.findById('lr-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('lr-001');
      expect(result.leave_type).toBeDefined();
      expect(result.leave_type.code).toBe('annual');
    });

    it('should throw NotFoundException for non-existent request', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmployee', () => {
    it('should return leave history for employee', async () => {
      prisma.leaveRequest.findMany.mockResolvedValue([structuredClone(mockLeaveRequest)]);
      prisma.leaveRequest.count.mockResolvedValue(1);

      const result = await service.findByEmployee('EMP001');

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should support pagination', async () => {
      prisma.leaveRequest.findMany.mockResolvedValue([structuredClone(mockLeaveRequest)]);
      prisma.leaveRequest.count.mockResolvedValue(25);

      const result = await service.findByEmployee('EMP001', { page: 2, limit: 10 });

      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(prisma.leaveRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 10,
          take: 10,
        }),
      );
    });

    it('should support status filter', async () => {
      prisma.leaveRequest.findMany.mockResolvedValue([]);
      prisma.leaveRequest.count.mockResolvedValue(0);

      await service.findByEmployee('EMP001', { status: 'approved' });

      expect(prisma.leaveRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'approved' }),
        }),
      );
    });
  });

  describe('approveLeave', () => {
    it('should approve a pending leave request by manager', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'approved',
        approved_by: 'MGR001',
        approved_date: new Date(),
      });
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveBalance.update.mockResolvedValue({});

      const result = await service.approveLeave('lr-001', mockManagerUser);

      expect(result.status).toBe('approved');
      expect(result.approved_by).toBe('MGR001');
      expect(prisma.leaveBalance.update).toHaveBeenCalled();
    });

    it('should reject if caller is not manager or HR', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));

      await expect(
        service.approveLeave('lr-001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if request is not pending', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'approved',
      });

      await expect(
        service.approveLeave('lr-001', mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update balance: move from pending to used', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'approved',
      });
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveBalance.update.mockResolvedValue({});

      await service.approveLeave('lr-001', mockManagerUser);

      expect(prisma.leaveBalance.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            used: mockBalance.used + mockLeaveRequest.days,
          }),
        }),
      );
    });

    it('should throw NotFoundException for non-existent request', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(null);

      await expect(
        service.approveLeave('nonexist', mockManagerUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('rejectLeave', () => {
    it('should reject a leave request with reason', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'rejected',
        rejection_reason: 'Team is short-staffed',
      });
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveBalance.update.mockResolvedValue({});

      const result = await service.rejectLeave('lr-001', 'Team is short-staffed', mockManagerUser);

      expect(result.status).toBe('rejected');
      expect(result.rejection_reason).toBe('Team is short-staffed');
    });

    it('should reject if caller is not manager or HR', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));

      await expect(
        service.rejectLeave('lr-001', 'reason', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should restore pending balance on rejection', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({ ...mockLeaveRequest, status: 'rejected' });
      const balance = { ...mockBalance, pending: 3 };
      prisma.leaveBalance.findFirst.mockResolvedValue(balance);
      prisma.leaveBalance.update.mockResolvedValue({});

      await service.rejectLeave('lr-001', 'Not approved', mockManagerUser);

      expect(prisma.leaveBalance.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            pending: 0,
          }),
        }),
      );
    });

    it('should reject if request is not pending', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'approved',
      });

      await expect(
        service.rejectLeave('lr-001', 'reason', mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('cancelLeave', () => {
    it('should allow requester to cancel their own pending request', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'cancelled',
      });
      prisma.leaveBalance.findFirst.mockResolvedValue(structuredClone(mockBalance));
      prisma.leaveBalance.update.mockResolvedValue({});

      const result = await service.cancelLeave('lr-001', mockEmployeeUser);

      expect(result.status).toBe('cancelled');
    });

    it('should reject if non-owner non-HR tries to cancel', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));

      const otherUser: CurrentUserInterface = { ...mockEmployeeUser, id: 'EMP999' };
      await expect(
        service.cancelLeave('lr-001', otherUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject cancel if request is not pending', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue({
        ...mockLeaveRequest,
        status: 'approved',
      });

      await expect(
        service.cancelLeave('lr-001', mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should restore balance on cancellation', async () => {
      prisma.leaveRequest.findUnique.mockResolvedValue(structuredClone(mockLeaveRequest));
      prisma.leaveRequest.update.mockResolvedValue({ ...mockLeaveRequest, status: 'cancelled' });
      const balance = { ...mockBalance, pending: 3 };
      prisma.leaveBalance.findFirst.mockResolvedValue(balance);
      prisma.leaveBalance.update.mockResolvedValue({});

      await service.cancelLeave('lr-001', mockEmployeeUser);

      expect(prisma.leaveBalance.update).toHaveBeenCalled();
    });
  });

  describe('getBalance', () => {
    it('should return balances for all leave types', async () => {
      const balances = [
        { ...mockBalance, leave_type: mockLeaveType },
        {
          ...mockBalance,
          id: 'bal-002',
          leave_type_id: 'lt-sick',
          entitled: 30,
          used: 1,
          remaining: 29,
          leave_type: mockSickLeaveType,
        },
      ];
      prisma.leaveBalance.findMany.mockResolvedValue(balances);

      const result = await service.getBalance('EMP001', 2026);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
    });

    it('should include entitled, used, pending, and remaining counts', async () => {
      prisma.leaveBalance.findMany.mockResolvedValue([
        { ...mockBalance, leave_type: mockLeaveType },
      ]);

      const result = await service.getBalance('EMP001', 2026);

      expect(result[0]).toHaveProperty('used');
      expect(result[0]).toHaveProperty('remaining');
      expect(result[0]).toHaveProperty('entitled');
      expect(result[0]).toHaveProperty('pending');
    });
  });

  describe('getLeaveTypes', () => {
    it('should return active leave types', async () => {
      prisma.leaveType.findMany.mockResolvedValue([mockLeaveType, mockSickLeaveType]);

      const result = await service.getLeaveTypes();

      expect(result).toHaveLength(2);
      expect(prisma.leaveType.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { is_active: true },
        }),
      );
    });
  });
});

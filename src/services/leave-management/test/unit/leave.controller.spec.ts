import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LeaveController } from '../../src/leave/leave.controller';
import { LeaveService } from '../../src/leave/leave.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockLeaveService = {
  createLeaveRequest: jest.fn(),
  findById: jest.fn(),
  findByEmployee: jest.fn(),
  approveLeave: jest.fn(),
  rejectLeave: jest.fn(),
  cancelLeave: jest.fn(),
  getBalance: jest.fn(),
  getLeaveTypes: jest.fn(),
  getCalendar: jest.fn(),
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

const mockLeaveRequest = {
  id: 'lr-001',
  employee_id: 'EMP001',
  leave_type_id: 'lt-annual',
  start_date: new Date('2026-03-02'),
  end_date: new Date('2026-03-04'),
  days: 3,
  half_day: null as string | null,
  reason: 'Family vacation',
  status: 'pending',
  leave_type: { id: 'lt-annual', code: 'annual', name_en: 'Annual Leave' },
};

describe('LeaveController', () => {
  let controller: LeaveController;
  let service: typeof mockLeaveService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveController],
      providers: [
        { provide: LeaveService, useValue: mockLeaveService },
      ],
    }).compile();

    controller = module.get<LeaveController>(LeaveController);
    service = mockLeaveService;
  });

  describe('POST /api/v1/leaves/:employeeId', () => {
    const createDto = {
      leave_type_id: 'lt-annual',
      start_date: '2026-03-02',
      end_date: '2026-03-04',
      days: 3,
      reason: 'Family vacation',
    };

    it('should return 201 with created leave request', async () => {
      service.createLeaveRequest.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await controller.createLeaveRequest('EMP001', createDto as any, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('lr-001');
      expect(result.status).toBe('pending');
      expect(service.createLeaveRequest).toHaveBeenCalledWith('EMP001', createDto, mockEmployeeUser);
    });

    it('should return 400 for validation errors', async () => {
      service.createLeaveRequest.mockRejectedValue(
        new BadRequestException('Validation failed'),
      );

      await expect(
        controller.createLeaveRequest('EMP001', {} as any, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return 400 for insufficient balance', async () => {
      service.createLeaveRequest.mockRejectedValue(
        new BadRequestException('Insufficient leave balance'),
      );

      await expect(
        controller.createLeaveRequest('EMP001', createDto as any, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('GET /api/v1/leaves/:id', () => {
    it('should return 200 with leave request detail', async () => {
      service.findById.mockResolvedValue(structuredClone(mockLeaveRequest));

      const result = await controller.findById('lr-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('lr-001');
      expect(service.findById).toHaveBeenCalledWith('lr-001');
    });

    it('should return 404 for non-existent request', async () => {
      service.findById.mockRejectedValue(
        new NotFoundException('Leave request not found'),
      );

      await expect(controller.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('GET /api/v1/leaves/employee/:employeeId', () => {
    it('should return 200 with paginated leave history', async () => {
      const paginatedResult = {
        data: [structuredClone(mockLeaveRequest)],
        total: 1,
        page: 1,
        limit: 10,
      };
      service.findByEmployee.mockResolvedValue(paginatedResult);

      const result = await controller.findByEmployee('EMP001');

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should pass pagination params to service', async () => {
      service.findByEmployee.mockResolvedValue({ data: [], total: 0, page: 2, limit: 5 });

      await controller.findByEmployee('EMP001', undefined, undefined, '2', '5');

      expect(service.findByEmployee).toHaveBeenCalledWith('EMP001', expect.objectContaining({
        page: 2,
        limit: 5,
      }));
    });
  });

  describe('PATCH /api/v1/leaves/:id/approve', () => {
    it('should return 200 with approved request (manager only)', async () => {
      const approvedRequest = {
        ...mockLeaveRequest,
        status: 'approved',
        approved_by: 'MGR001',
      };
      service.approveLeave.mockResolvedValue(approvedRequest);

      const result = await controller.approveLeave('lr-001', mockManagerUser);

      expect(result.status).toBe('approved');
      expect(service.approveLeave).toHaveBeenCalledWith('lr-001', mockManagerUser);
    });

    it('should return 403 for non-manager', async () => {
      service.approveLeave.mockRejectedValue(
        new ForbiddenException('Only managers can approve'),
      );

      await expect(
        controller.approveLeave('lr-001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('PATCH /api/v1/leaves/:id/reject', () => {
    it('should return 200 with rejected request and reason', async () => {
      const rejectedRequest = {
        ...mockLeaveRequest,
        status: 'rejected',
        rejection_reason: 'Team is short-staffed',
      };
      service.rejectLeave.mockResolvedValue(rejectedRequest);

      const result = await controller.rejectLeave(
        'lr-001',
        { reason: 'Team is short-staffed' },
        mockManagerUser,
      );

      expect(result.status).toBe('rejected');
      expect(result.rejection_reason).toBe('Team is short-staffed');
      expect(service.rejectLeave).toHaveBeenCalledWith('lr-001', 'Team is short-staffed', mockManagerUser);
    });

    it('should return 403 for non-manager', async () => {
      service.rejectLeave.mockRejectedValue(
        new ForbiddenException('Only managers can reject'),
      );

      await expect(
        controller.rejectLeave('lr-001', { reason: 'test' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('PATCH /api/v1/leaves/:id/cancel', () => {
    it('should return 200 for cancellation (only if pending)', async () => {
      const cancelledRequest = { ...mockLeaveRequest, status: 'cancelled' };
      service.cancelLeave.mockResolvedValue(cancelledRequest);

      const result = await controller.cancelLeave('lr-001', mockEmployeeUser);

      expect(result.status).toBe('cancelled');
      expect(service.cancelLeave).toHaveBeenCalledWith('lr-001', mockEmployeeUser);
    });

    it('should return 400 if request is not pending', async () => {
      service.cancelLeave.mockRejectedValue(
        new BadRequestException('Only pending requests can be cancelled'),
      );

      await expect(
        controller.cancelLeave('lr-001', mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('GET /api/v1/leaves/balance/:employeeId', () => {
    it('should return 200 with all leave type balances', async () => {
      const balances = [
        { leave_type: { code: 'annual' }, entitled: 10, used: 2, remaining: 8 },
        { leave_type: { code: 'sick' }, entitled: 30, used: 1, remaining: 29 },
      ];
      service.getBalance.mockResolvedValue(balances);

      const result = await controller.getBalance('EMP001', '2026');

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(service.getBalance).toHaveBeenCalledWith('EMP001', 2026);
    });
  });
});

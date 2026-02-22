import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { OvertimeController } from '../../src/overtime/overtime.controller';
import { OvertimeService } from '../../src/overtime/overtime.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockOvertimeService = {
  submitRequest: jest.fn(),
  approveRequest: jest.fn(),
  rejectRequest: jest.fn(),
  cancelRequest: jest.fn(),
  postConfirm: jest.fn(),
  getRequests: jest.fn(),
};

const mockManager: CurrentUserInterface = {
  id: 'MGR001',
  email: 'mgr@centralgroup.com',
  username: 'mgr.user',
  firstName: 'Manager',
  lastName: 'User',
  roles: ['manager'],
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'emp.user',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

const mockOtRequest = {
  id: 'ot-1',
  employee_id: 'EMP001',
  date: '2026-02-20',
  hours: 2,
  ot_type: 'weekday',
  status: 'pending',
  total_amount: 600,
};

describe('OvertimeController', () => {
  let controller: OvertimeController;
  let service: typeof mockOvertimeService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OvertimeController],
      providers: [
        { provide: OvertimeService, useValue: mockOvertimeService },
      ],
    }).compile();

    controller = module.get<OvertimeController>(OvertimeController);
    service = mockOvertimeService;
  });

  describe('POST /api/v1/overtime', () => {
    it('should submit an OT request', async () => {
      service.submitRequest.mockResolvedValue(mockOtRequest);
      const result = await controller.submitRequest({ employee_id: 'EMP001' } as any, mockEmployee);
      expect(result).toEqual(mockOtRequest);
    });
  });

  describe('POST /api/v1/overtime/:id/approve', () => {
    it('should approve an OT request', async () => {
      service.approveRequest.mockResolvedValue({ ...mockOtRequest, status: 'approved' });
      const result = await controller.approveRequest('ot-1', mockManager);
      expect(result.status).toBe('approved');
    });

    it('should throw ForbiddenException for non-manager', async () => {
      service.approveRequest.mockRejectedValue(new ForbiddenException());
      await expect(controller.approveRequest('ot-1', mockEmployee)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/overtime/:id/reject', () => {
    it('should reject an OT request', async () => {
      service.rejectRequest.mockResolvedValue({ ...mockOtRequest, status: 'rejected' });
      const result = await controller.rejectRequest('ot-1', 'Not justified', mockManager);
      expect(result.status).toBe('rejected');
    });
  });

  describe('POST /api/v1/overtime/:id/cancel', () => {
    it('should cancel an OT request', async () => {
      service.cancelRequest.mockResolvedValue({ ...mockOtRequest, status: 'cancelled' });
      const result = await controller.cancelRequest('ot-1', mockEmployee);
      expect(result.status).toBe('cancelled');
    });
  });

  describe('POST /api/v1/overtime/:id/confirm', () => {
    it('should post-confirm an OT request', async () => {
      service.postConfirm.mockResolvedValue({ ...mockOtRequest, status: 'completed', post_confirmed: true });
      const result = await controller.postConfirm('ot-1', 1.5, mockManager);
      expect(result.status).toBe('completed');
      expect(result.post_confirmed).toBe(true);
    });

    it('should throw NotFoundException for invalid request', async () => {
      service.postConfirm.mockRejectedValue(new NotFoundException());
      await expect(controller.postConfirm('invalid', 2, mockManager)).rejects.toThrow(NotFoundException);
    });
  });

  describe('GET /api/v1/overtime/employee/:id', () => {
    it('should return employee OT requests', async () => {
      service.getRequests.mockResolvedValue([mockOtRequest]);
      const result = await controller.getRequests('EMP001');
      expect(result).toEqual([mockOtRequest]);
    });

    it('should pass query filters to service', async () => {
      service.getRequests.mockResolvedValue([]);
      await controller.getRequests('EMP001', 'pending', '2026-02-01', '2026-02-28', 'weekday');
      expect(service.getRequests).toHaveBeenCalledWith('EMP001', {
        status: 'pending',
        startDate: '2026-02-01',
        endDate: '2026-02-28',
        otType: 'weekday',
      });
    });
  });
});

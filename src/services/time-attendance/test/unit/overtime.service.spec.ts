import { OvertimeService } from '../../src/overtime/overtime.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

const mockPrisma = {
  overtimeRequest: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser = { id: 'user-1', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const hrManager = { id: 'user-2', email: 'hrm@test.com', username: 'hrm', firstName: 'HR', lastName: 'Manager', roles: ['hr_manager'] };
const manager = { id: 'user-4', email: 'mgr@test.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'] };
const employee = { id: 'user-3', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };

const baseOtDto = {
  employee_id: 'user-3',
  date: '2026-02-20',
  day_type: 'weekday',
  start_time: '18:00',
  end_time: '20:00',
  hours: 2,
  ot_type: 'weekday',
  hourly_rate: 200,
  reason: 'Project deadline',
};

describe('OvertimeService', () => {
  let service: OvertimeService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OvertimeService(mockPrisma as any);
  });

  describe('calculateOTAmount (static)', () => {
    it('should calculate weekday OT at 1.5x', () => {
      const result = OvertimeService.calculateOTAmount(2, 200, 'weekday');
      expect(result.rate).toBe(1.5);
      expect(result.amount).toBe(600);
      expect(result.totalAmount).toBe(600);
    });

    it('should calculate weekend OT at 2.0x', () => {
      const result = OvertimeService.calculateOTAmount(4, 200, 'weekend');
      expect(result.rate).toBe(2.0);
      expect(result.amount).toBe(1600);
      expect(result.totalAmount).toBe(1600);
    });

    it('should calculate holiday OT at 3.0x', () => {
      const result = OvertimeService.calculateOTAmount(3, 200, 'holiday');
      expect(result.rate).toBe(3.0);
      expect(result.amount).toBe(1800);
      expect(result.totalAmount).toBe(1800);
    });

    it('should add night premium at 0.5x', () => {
      const result = OvertimeService.calculateOTAmount(4, 200, 'weekday', 2);
      expect(result.amount).toBe(1200); // 4 * 200 * 1.5
      expect(result.nightPremiumAmount).toBe(200); // 2 * 200 * 0.5
      expect(result.totalAmount).toBe(1400);
    });

    it('should default to 1.5x for unknown type', () => {
      const result = OvertimeService.calculateOTAmount(1, 100, 'unknown');
      expect(result.rate).toBe(1.5);
      expect(result.amount).toBe(150);
    });

    it('should handle zero hours', () => {
      const result = OvertimeService.calculateOTAmount(0, 200, 'weekday');
      expect(result.amount).toBe(0);
      expect(result.totalAmount).toBe(0);
    });

    it('should round to 2 decimal places', () => {
      const result = OvertimeService.calculateOTAmount(1, 133, 'weekday');
      expect(result.amount).toBe(199.5);
    });
  });

  describe('submitRequest', () => {
    it('should create an OT request', async () => {
      const expected = { id: 'ot-1', ...baseOtDto, status: 'pending' };
      mockPrisma.overtimeRequest.create.mockResolvedValue(expected);

      const result = await service.submitRequest(baseOtDto, employee as any);
      expect(result.status).toBe('pending');
      expect(mockPrisma.overtimeRequest.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          employee_id: 'user-3',
          hours: 2,
          rate: 1.5,
          amount: 600,
          total_amount: 600,
        }),
      });
    });

    it('should calculate amounts with night premium', async () => {
      const dto = { ...baseOtDto, has_night_premium: true, night_hours: 1 };
      mockPrisma.overtimeRequest.create.mockResolvedValue({ id: 'ot-1' });

      await service.submitRequest(dto, employee as any);
      expect(mockPrisma.overtimeRequest.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          has_night_premium: true,
          night_hours: 1,
          night_premium_amount: 100, // 1 * 200 * 0.5
          total_amount: 700, // 600 + 100
        }),
      });
    });
  });

  describe('approveRequest', () => {
    it('should approve a pending request (manager)', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', status: 'pending' });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'approved' });

      const result = await service.approveRequest('ot-1', manager as any);
      expect(result.status).toBe('approved');
    });

    it('should approve a pending request (hr_manager)', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', status: 'pending' });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'approved' });

      const result = await service.approveRequest('ot-1', hrManager as any);
      expect(result.status).toBe('approved');
    });

    it('should reject non-manager/HR users', async () => {
      await expect(service.approveRequest('ot-1', employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if request not found', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue(null);
      await expect(service.approveRequest('ot-999', manager as any)).rejects.toThrow(NotFoundException);
    });

    it('should reject already approved request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', status: 'approved' });
      await expect(service.approveRequest('ot-1', manager as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('rejectRequest', () => {
    it('should reject a pending request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', status: 'pending' });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'rejected' });

      const result = await service.rejectRequest('ot-1', 'Not justified', manager as any);
      expect(result.status).toBe('rejected');
      expect(mockPrisma.overtimeRequest.update).toHaveBeenCalledWith({
        where: { id: 'ot-1' },
        data: expect.objectContaining({
          status: 'rejected',
          rejection_reason: 'Not justified',
          rejected_by: 'user-4',
        }),
      });
    });

    it('should reject non-manager/HR users', async () => {
      await expect(service.rejectRequest('ot-1', 'reason', employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw if request not found', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue(null);
      await expect(service.rejectRequest('ot-999', 'reason', manager as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('cancelRequest', () => {
    it('should allow employee to cancel own pending request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', employee_id: 'user-3', status: 'pending' });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'cancelled' });

      const result = await service.cancelRequest('ot-1', employee as any);
      expect(result.status).toBe('cancelled');
    });

    it('should allow manager to cancel any request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', employee_id: 'user-3', status: 'pending' });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'cancelled' });

      const result = await service.cancelRequest('ot-1', manager as any);
      expect(result.status).toBe('cancelled');
    });

    it('should reject employee cancelling another employees request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', employee_id: 'user-99', status: 'pending' });

      await expect(service.cancelRequest('ot-1', employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should reject cancelling non-pending request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', employee_id: 'user-3', status: 'approved' });

      await expect(service.cancelRequest('ot-1', employee as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw if request not found', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue(null);
      await expect(service.cancelRequest('ot-999', employee as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('postConfirm', () => {
    it('should post-confirm an approved request', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({
        id: 'ot-1', status: 'approved', hourly_rate: 200, ot_type: 'weekday', night_hours: 0,
      });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'completed', post_confirmed: true });

      const result = await service.postConfirm('ot-1', 1.5, manager as any);
      expect(result.status).toBe('completed');
      expect(result.post_confirmed).toBe(true);
    });

    it('should recalculate amounts with actual hours', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({
        id: 'ot-1', status: 'approved', hourly_rate: 200, ot_type: 'weekend', night_hours: 0,
      });
      mockPrisma.overtimeRequest.update.mockResolvedValue({ id: 'ot-1', status: 'completed' });

      await service.postConfirm('ot-1', 3, manager as any);
      expect(mockPrisma.overtimeRequest.update).toHaveBeenCalledWith({
        where: { id: 'ot-1' },
        data: expect.objectContaining({
          hours: 3,
          amount: 1200, // 3 * 200 * 2.0
          total_amount: 1200,
        }),
      });
    });

    it('should reject non-manager/HR users', async () => {
      await expect(service.postConfirm('ot-1', 2, employee as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw if request not found', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue(null);
      await expect(service.postConfirm('ot-999', 2, manager as any)).rejects.toThrow(NotFoundException);
    });

    it('should reject if not in approved status', async () => {
      mockPrisma.overtimeRequest.findUnique.mockResolvedValue({ id: 'ot-1', status: 'pending' });
      await expect(service.postConfirm('ot-1', 2, manager as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('checkWeeklyLimit', () => {
    it('should allow when under 36 hours', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([
        { hours: 10 }, { hours: 10 },
      ]);

      const result = await service.checkWeeklyLimit('EMP001', new Date('2026-02-16'), 10);
      expect(result.allowed).toBe(true);
      expect(result.currentHours).toBe(20);
      expect(result.remainingHours).toBe(16);
    });

    it('should reject when exceeding 36 hours', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([
        { hours: 20 }, { hours: 15 },
      ]);

      const result = await service.checkWeeklyLimit('EMP001', new Date('2026-02-16'), 5);
      expect(result.allowed).toBe(false);
      expect(result.currentHours).toBe(35);
      expect(result.remainingHours).toBe(1);
    });

    it('should allow exactly 36 hours', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([
        { hours: 30 },
      ]);

      const result = await service.checkWeeklyLimit('EMP001', new Date('2026-02-16'), 6);
      expect(result.allowed).toBe(true);
    });

    it('should return full 36 remaining for no existing OT', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([]);

      const result = await service.checkWeeklyLimit('EMP001', new Date('2026-02-16'), 4);
      expect(result.allowed).toBe(true);
      expect(result.currentHours).toBe(0);
      expect(result.remainingHours).toBe(36);
    });
  });

  describe('getRequests', () => {
    it('should return requests for employee', async () => {
      const requests = [{ id: 'ot-1' }, { id: 'ot-2' }];
      mockPrisma.overtimeRequest.findMany.mockResolvedValue(requests);

      const result = await service.getRequests('EMP001');
      expect(result).toEqual(requests);
    });

    it('should apply status filter', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([]);

      await service.getRequests('EMP001', { status: 'pending' });
      expect(mockPrisma.overtimeRequest.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({ status: 'pending' }),
        orderBy: { date: 'desc' },
      });
    });

    it('should apply date range filter', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([]);

      await service.getRequests('EMP001', { startDate: '2026-02-01', endDate: '2026-02-28' });
      expect(mockPrisma.overtimeRequest.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({
          date: { gte: expect.any(Date), lte: expect.any(Date) },
        }),
        orderBy: { date: 'desc' },
      });
    });

    it('should apply OT type filter', async () => {
      mockPrisma.overtimeRequest.findMany.mockResolvedValue([]);

      await service.getRequests('EMP001', { otType: 'weekend' });
      expect(mockPrisma.overtimeRequest.findMany).toHaveBeenCalledWith({
        where: expect.objectContaining({ ot_type: 'weekend' }),
        orderBy: { date: 'desc' },
      });
    });
  });
});

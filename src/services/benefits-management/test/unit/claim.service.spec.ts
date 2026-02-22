import { ClaimService } from '../../src/claim/claim.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

const mockPrisma = {
  benefitClaim: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser = { id: 'HR001', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const employeeUser = { id: 'EMP001', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };
const otherEmployee = { id: 'EMP002', email: 'emp2@test.com', username: 'emp2', firstName: 'Other', lastName: 'User', roles: ['employee'] };

const mockClaim = {
  id: 'claim-1',
  employee_id: 'EMP001',
  plan_id: 'plan-1',
  claim_type: 'medical',
  amount: 5000,
  status: 'pending',
  receipt_date: new Date('2026-01-15'),
  submitted_at: new Date(),
};

describe('ClaimService', () => {
  let service: ClaimService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ClaimService(mockPrisma as any);
  });

  describe('submit', () => {
    const submitDto = {
      plan_id: 'plan-1',
      claim_type: 'medical',
      amount: 5000,
      description: 'Doctor visit',
      receipt_date: '2026-01-15',
    };

    it('should create a claim for the current user', async () => {
      mockPrisma.benefitClaim.create.mockResolvedValue({ id: 'claim-1', employee_id: 'EMP001', ...submitDto });
      const result = await service.submit(submitDto as any, employeeUser as any);
      expect(result.id).toBe('claim-1');
      expect(mockPrisma.benefitClaim.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          employee_id: 'EMP001',
          plan_id: 'plan-1',
          amount: 5000,
        }),
      });
    });

    it('should set employee_id from currentUser', async () => {
      mockPrisma.benefitClaim.create.mockResolvedValue({ id: 'claim-2', employee_id: 'HR001' });
      await service.submit(submitDto as any, hrUser as any);
      expect(mockPrisma.benefitClaim.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ employee_id: 'HR001' }),
      });
    });
  });

  describe('approve', () => {
    it('should approve a pending claim for HR', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue(mockClaim);
      mockPrisma.benefitClaim.update.mockResolvedValue({ ...mockClaim, status: 'approved' });
      const result = await service.approve('claim-1', hrUser as any);
      expect(result.status).toBe('approved');
    });

    it('should reject non-HR approval', async () => {
      await expect(service.approve('claim-1', employeeUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for invalid claim', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue(null);
      await expect(service.approve('invalid', hrUser as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for non-pending claim', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue({ ...mockClaim, status: 'approved' });
      await expect(service.approve('claim-1', hrUser as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('reject', () => {
    it('should reject a pending claim for HR', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue(mockClaim);
      mockPrisma.benefitClaim.update.mockResolvedValue({ ...mockClaim, status: 'rejected' });
      const result = await service.reject('claim-1', 'Insufficient documentation', hrUser as any);
      expect(result.status).toBe('rejected');
    });

    it('should reject non-HR rejection', async () => {
      await expect(service.reject('claim-1', 'reason', employeeUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for invalid claim', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue(null);
      await expect(service.reject('invalid', 'reason', hrUser as any)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for non-pending claim', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue({ ...mockClaim, status: 'rejected' });
      await expect(service.reject('claim-1', 'reason', hrUser as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('markPaid', () => {
    it('should mark approved claim as paid for HR', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue({ ...mockClaim, status: 'approved' });
      mockPrisma.benefitClaim.update.mockResolvedValue({ ...mockClaim, status: 'paid', paid_amount: 5000 });
      const result = await service.markPaid('claim-1', 5000, hrUser as any);
      expect(result.status).toBe('paid');
      expect(result.paid_amount).toBe(5000);
    });

    it('should reject non-HR markPaid', async () => {
      await expect(service.markPaid('claim-1', 5000, employeeUser as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException for non-approved claim', async () => {
      mockPrisma.benefitClaim.findUnique.mockResolvedValue(mockClaim); // status: pending
      await expect(service.markPaid('claim-1', 5000, hrUser as any)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getByEmployee', () => {
    it('should return claims for own employee', async () => {
      mockPrisma.benefitClaim.findMany.mockResolvedValue([mockClaim]);
      const result = await service.getByEmployee('EMP001', employeeUser as any);
      expect(result).toHaveLength(1);
    });

    it('should allow HR to view any employee claims', async () => {
      mockPrisma.benefitClaim.findMany.mockResolvedValue([]);
      await expect(service.getByEmployee('EMP001', hrUser as any)).resolves.toBeDefined();
    });

    it('should reject employee viewing others claims', async () => {
      await expect(
        service.getByEmployee('EMP001', otherEmployee as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getPending', () => {
    it('should return all pending claims', async () => {
      mockPrisma.benefitClaim.findMany.mockResolvedValue([mockClaim]);
      const result = await service.getPending();
      expect(result).toHaveLength(1);
      expect(mockPrisma.benefitClaim.findMany).toHaveBeenCalledWith({
        where: { status: 'pending' },
        orderBy: { submitted_at: 'asc' },
      });
    });
  });
});

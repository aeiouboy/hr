import { Test, TestingModule } from '@nestjs/testing';
import { SmartClaimsController } from './claims.controller';
import { SmartClaimsService } from './claims.service';
import { ForbiddenException } from '@nestjs/common';

const mockClaimsService = {
  createClaim: jest.fn(),
  uploadReceipt: jest.fn(),
  submitClaim: jest.fn(),
  getClaimHistory: jest.fn(),
  getClaimById: jest.fn(),
  getYTDSpending: jest.fn(),
  approveClaim: jest.fn(),
  rejectClaim: jest.fn(),
};

const employee = { id: 'user-1', roles: ['employee'], employee_id: 'EMP001' };
const manager = { id: 'user-2', roles: ['manager'], employee_id: 'EMP002', team_members: ['EMP001'] };
const hrAdmin = { id: 'user-3', roles: ['hr_admin'], employee_id: 'EMP003' };

describe('SmartClaimsController', () => {
  let controller: SmartClaimsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartClaimsController],
      providers: [
        { provide: SmartClaimsService, useValue: mockClaimsService },
      ],
    }).compile();

    controller = module.get<SmartClaimsController>(SmartClaimsController);
  });

  describe('POST /api/v1/benefits/claims', () => {
    it('should create a new claim', async () => {
      const dto = { category: 'medical', amount: 2000, description: 'Clinic visit' };
      const expected = { id: 'claim-1', ...dto, status: 'draft' };
      mockClaimsService.createClaim.mockResolvedValue(expected);

      const result = await controller.create(dto as any, employee as any);
      expect(result.id).toBe('claim-1');
      expect(result.status).toBe('draft');
      expect(mockClaimsService.createClaim).toHaveBeenCalledWith(dto, employee);
    });
  });

  describe('POST /api/v1/benefits/claims/:id/upload', () => {
    it('should upload receipt for a claim', async () => {
      const file = { originalname: 'receipt.jpg', size: 1_000_000 };
      const expected = { id: 'ocr-1', receipt_file_name: 'receipt.jpg' };
      mockClaimsService.uploadReceipt.mockResolvedValue(expected);

      const result = await controller.uploadReceipt('claim-1', file as any, employee as any);
      expect(result.receipt_file_name).toBe('receipt.jpg');
      expect(mockClaimsService.uploadReceipt).toHaveBeenCalledWith('claim-1', file, employee);
    });
  });

  describe('POST /api/v1/benefits/claims/:id/submit', () => {
    it('should submit a claim', async () => {
      const expected = { id: 'claim-1', status: 'submitted' };
      mockClaimsService.submitClaim.mockResolvedValue(expected);

      const result = await controller.submit('claim-1', employee as any);
      expect(result.status).toBe('submitted');
      expect(mockClaimsService.submitClaim).toHaveBeenCalledWith('claim-1', employee);
    });
  });

  describe('GET /api/v1/benefits/claims', () => {
    it('should return paginated claims list', async () => {
      const expected = { data: [{ id: 'claim-1' }], total: 1, page: 1 };
      mockClaimsService.getClaimHistory.mockResolvedValue(expected);

      const result = await controller.list({ page: 1, limit: 10 }, employee as any);
      expect(result.data).toHaveLength(1);
    });

    it('should pass filter parameters', async () => {
      mockClaimsService.getClaimHistory.mockResolvedValue({ data: [], total: 0, page: 1 });

      await controller.list({ page: 1, limit: 10, status: 'approved', category: 'medical' }, employee as any);
      expect(mockClaimsService.getClaimHistory).toHaveBeenCalledWith(
        'EMP001',
        expect.objectContaining({ status: 'approved', category: 'medical' }),
        employee,
      );
    });
  });

  describe('GET /api/v1/benefits/claims/:id', () => {
    it('should return claim detail', async () => {
      const expected = { id: 'claim-1', category: 'medical', policy_checks: [] as any[] };
      mockClaimsService.getClaimById.mockResolvedValue(expected);

      const result = await controller.getById('claim-1', employee as any);
      expect(result.id).toBe('claim-1');
    });
  });

  describe('GET /api/v1/benefits/claims/ytd-spending', () => {
    it('should return YTD spending report', async () => {
      const expected = [{ category: 'medical', total: 5000 }];
      mockClaimsService.getYTDSpending.mockResolvedValue(expected);

      const result = await controller.ytdSpending(employee as any);
      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('medical');
    });
  });

  describe('POST /api/v1/benefits/claims/:id/approve', () => {
    it('should approve a claim as manager', async () => {
      const expected = { id: 'claim-1', status: 'approved', approved_by: 'user-2' };
      mockClaimsService.approveClaim.mockResolvedValue(expected);

      const result = await controller.approve('claim-1', manager as any);
      expect(result.status).toBe('approved');
    });
  });

  describe('POST /api/v1/benefits/claims/:id/reject', () => {
    it('should reject a claim with reason', async () => {
      const expected = { id: 'claim-1', status: 'rejected', rejected_reason: 'Duplicate claim' };
      mockClaimsService.rejectClaim.mockResolvedValue(expected);

      const result = await controller.reject('claim-1', { reason: 'Duplicate claim' }, manager as any);
      expect(result.status).toBe('rejected');
      expect(result.rejected_reason).toBe('Duplicate claim');
    });
  });

  // ── RBAC ──────────────────────────────────────────────────────────

  describe('RBAC', () => {
    it('should allow employees to see only their own claims', async () => {
      mockClaimsService.getClaimHistory.mockResolvedValue({ data: [], total: 0, page: 1 });

      await controller.list({ page: 1, limit: 10 }, employee as any);
      expect(mockClaimsService.getClaimHistory).toHaveBeenCalledWith('EMP001', expect.anything(), employee);
    });

    it('should allow managers to see team member claims', async () => {
      mockClaimsService.getClaimHistory.mockResolvedValue({ data: [], total: 0, page: 1 });

      await controller.listTeamClaims({ page: 1, limit: 10 }, manager as any);
      expect(mockClaimsService.getClaimHistory).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        manager,
      );
    });

    it('should allow HR admin to see all claims', async () => {
      mockClaimsService.getClaimHistory.mockResolvedValue({ data: [], total: 0, page: 1 });

      await controller.listAll({ page: 1, limit: 10 }, hrAdmin as any);
      expect(mockClaimsService.getClaimHistory).toHaveBeenCalled();
    });

    it('should reject employee accessing other employee claims', async () => {
      mockClaimsService.getClaimById.mockRejectedValue(new ForbiddenException('Access denied'));

      await expect(controller.getById('claim-other', employee as any)).rejects.toThrow(ForbiddenException);
    });
  });
});

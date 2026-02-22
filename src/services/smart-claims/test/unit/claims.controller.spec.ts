import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsController } from '../../src/claims/claims.controller';
import { ClaimsService } from '../../src/claims/claims.service';
import { OcrService } from '../../src/ocr/ocr.service';
import { PolicyService } from '../../src/policy/policy.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockClaimsService = {
  createClaim: jest.fn(),
  submitClaim: jest.fn(),
  approveClaim: jest.fn(),
  rejectClaim: jest.fn(),
  findById: jest.fn(),
  getMyClaimHistory: jest.fn(),
  getYtdSpending: jest.fn(),
  getPendingClaims: jest.fn(),
  updateClaim: jest.fn(),
  deleteClaim: jest.fn(),
};

const mockOcrService = {
  processReceipt: jest.fn(),
  getOcrResult: jest.fn(),
  updateOcrResult: jest.fn(),
};

const mockPolicyService = {
  validateClaim: jest.fn(),
  getApplicableRule: jest.fn(),
  isAutoApprovable: jest.fn(),
  getYtdSpending: jest.fn(),
  listPolicyRules: jest.fn(),
  createPolicyRule: jest.fn(),
  updatePolicyRule: jest.fn(),
  deactivatePolicyRule: jest.fn(),
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'emp001',
  firstName: 'Test',
  lastName: 'Employee',
  roles: ['employee'],
};

const mockManager: CurrentUserInterface = {
  id: 'MGR001',
  email: 'mgr@centralgroup.com',
  username: 'mgr001',
  firstName: 'Test',
  lastName: 'Manager',
  roles: ['manager'],
};

const mockHrManager: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hrm@centralgroup.com',
  username: 'hrm001',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockClaim = {
  id: 'CLM-001',
  employee_id: 'EMP001',
  claim_type: 'medical',
  amount: 1500,
  currency: 'THB',
  status: 'draft',
  receipt_date: new Date('2026-02-20'),
};

describe('ClaimsController', () => {
  let controller: ClaimsController;
  let claimsService: typeof mockClaimsService;
  let testModule: TestingModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimsController],
      providers: [
        { provide: ClaimsService, useValue: mockClaimsService },
        { provide: OcrService, useValue: mockOcrService },
        { provide: PolicyService, useValue: mockPolicyService },
      ],
    }).compile();

    controller = module.get<ClaimsController>(ClaimsController);
    claimsService = module.get(ClaimsService);
    testModule = module;
  });

  afterEach(() => jest.clearAllMocks());

  // ── POST /claims ─────────────────────────────────────────────

  describe('POST /claims', () => {
    it('should create a new claim', async () => {
      const dto = { claim_type: 'medical', amount: 1500, receipt_date: '2026-02-20' };
      claimsService.createClaim.mockResolvedValue(structuredClone(mockClaim));

      const result = await controller.create(dto, mockEmployee);

      expect(result).toBeDefined();
      expect(claimsService.createClaim).toHaveBeenCalledWith(dto, mockEmployee);
    });
  });

  // ── POST /claims/:id/submit ──────────────────────────────────

  describe('POST /claims/:id/submit', () => {
    it('should submit a draft claim', async () => {
      claimsService.submitClaim.mockResolvedValue({ ...mockClaim, status: 'submitted' });

      const result = await controller.submit('CLM-001', mockEmployee);

      expect(result.status).toBe('submitted');
      expect(claimsService.submitClaim).toHaveBeenCalledWith('CLM-001', mockEmployee);
    });
  });

  // ── POST /claims/:id/approve ─────────────────────────────────

  describe('POST /claims/:id/approve', () => {
    it('should approve a submitted claim', async () => {
      claimsService.approveClaim.mockResolvedValue({ ...mockClaim, status: 'approved' });

      const result = await controller.approve('CLM-001', {}, mockManager);

      expect(result.status).toBe('approved');
    });
  });

  // ── POST /claims/:id/reject ──────────────────────────────────

  describe('POST /claims/:id/reject', () => {
    it('should reject a submitted claim with reason', async () => {
      const dto = { reason: 'Invalid receipt' };
      claimsService.rejectClaim.mockResolvedValue({ ...mockClaim, status: 'rejected' });

      const result = await controller.reject('CLM-001', dto, mockManager);

      expect(result.status).toBe('rejected');
    });
  });

  // ── GET /claims/:id ──────────────────────────────────────────

  describe('GET /claims/:id', () => {
    it('should return claim by ID', async () => {
      claimsService.findById.mockResolvedValue(structuredClone(mockClaim));

      const result = await controller.findById('CLM-001');

      expect(result.id).toBe('CLM-001');
    });
  });

  // ── GET /claims/my-history ───────────────────────────────────

  describe('GET /claims/my-history', () => {
    it('should return claim history for current user', async () => {
      claimsService.getMyClaimHistory.mockResolvedValue([structuredClone(mockClaim)]);

      const result = await controller.getMyHistory(mockEmployee);

      expect(result).toHaveLength(1);
    });
  });

  // ── GET /claims/ytd-spending/:type ───────────────────────────

  describe('GET /claims/ytd-spending/:type', () => {
    it('should return YTD spending for claim type', async () => {
      claimsService.getYtdSpending.mockResolvedValue({
        total: 5000,
        claim_type: 'medical',
        remaining_monthly: 10000,
      });

      const result = await controller.getYtdSpending('medical', mockEmployee);

      expect(result.total).toBe(5000);
      expect(result.claim_type).toBe('medical');
    });
  });

  // ── GET /claims/pending ──────────────────────────────────────

  describe('GET /claims/pending', () => {
    it('should return pending claims for manager', async () => {
      claimsService.getPendingClaims.mockResolvedValue([
        structuredClone({ ...mockClaim, status: 'submitted' }),
      ]);

      const result = await controller.getPending(mockManager);

      expect(result).toHaveLength(1);
    });
  });

  // ── PATCH /claims/:id ────────────────────────────────────────

  describe('PATCH /claims/:id', () => {
    it('should update a draft claim', async () => {
      claimsService.updateClaim.mockResolvedValue({ ...mockClaim, amount: 2000 });

      const result = await controller.update('CLM-001', { amount: 2000 }, mockEmployee);

      expect(result.amount).toBe(2000);
    });
  });

  // ── DELETE /claims/:id ───────────────────────────────────────

  describe('DELETE /claims/:id', () => {
    it('should delete a draft claim', async () => {
      claimsService.deleteClaim.mockResolvedValue({ success: true } as any);

      const result = await controller.remove('CLM-001', mockEmployee);

      expect((result as any).success).toBe(true);
    });
  });

  // ── OCR Endpoints ────────────────────────────────────────────

  describe('GET /claims/:id/ocr', () => {
    it('should return OCR result for a claim', async () => {
      const ocrService = testModule.get(OcrService);
      (ocrService.getOcrResult as jest.Mock).mockResolvedValue({
        id: 'OCR-001',
        confidence_score: 0.94,
        extracted_amount: 1500,
      });

      expect(ocrService.getOcrResult).toBeDefined();
    });
  });

  // ── Policy Endpoints ─────────────────────────────────────────

  describe('GET /policies', () => {
    it('should list all policy rules', async () => {
      const policyService = testModule.get(PolicyService);
      (policyService.listPolicyRules as jest.Mock).mockResolvedValue([
        { id: 'RULE-001', rule_name: 'Medical', claim_type: 'medical' },
        { id: 'RULE-002', rule_name: 'Travel', claim_type: 'travel' },
      ]);

      expect(policyService.listPolicyRules).toBeDefined();
    });
  });

  describe('POST /policies', () => {
    it('should create a policy rule (HR Manager only)', async () => {
      const policyService = testModule.get(PolicyService);
      const dto = {
        rule_name: 'New Policy',
        claim_type: 'equipment',
        max_amount: 10000,
        max_amount_per_month: 30000,
      };
      (policyService.createPolicyRule as jest.Mock).mockResolvedValue({
        id: 'RULE-NEW',
        ...dto,
      });

      expect(policyService.createPolicyRule).toBeDefined();
    });
  });

  // ── Validate Endpoint ────────────────────────────────────────

  describe('POST /claims/validate', () => {
    it('should validate claim against policy before submission', async () => {
      const policyService = testModule.get(PolicyService);
      (policyService.validateClaim as jest.Mock).mockResolvedValue({
        valid: true,
        errors: [],
        warnings: [],
      });

      expect(policyService.validateClaim).toBeDefined();
    });
  });
});

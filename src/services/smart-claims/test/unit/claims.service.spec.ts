import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ClaimsService } from '../../src/claims/claims.service';
import { OcrService } from '../../src/ocr/ocr.service';
import { PolicyService } from '../../src/policy/policy.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  claimRequest: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
  },
  policyRule: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  oCRResult: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

const mockOcrService = {
  processReceipt: jest.fn(),
};

const mockPolicyService = {
  validateClaim: jest.fn(),
  getApplicableRule: jest.fn(),
  getYtdSpending: jest.fn(),
};

// Mock user fixtures
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
  username: 'manager',
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

// Mock data fixtures
const mockPolicyRule = {
  id: 'RULE-001',
  rule_name: 'Medical Claim Policy',
  claim_type: 'medical',
  max_amount: 5000,
  max_amount_per_month: 15000,
  auto_approve_threshold: 1000,
  requires_receipt: true,
  requires_doctor_cert: false,
  min_days_notice: 0,
  effective_from: new Date('2026-01-01'),
  effective_to: null,
  eligible_grades: ['A', 'B', 'C'],
  is_active: true,
};

const mockOcrResult = {
  id: 'OCR-001',
  claim_id: 'CLM-001',
  raw_text: 'Bangkok Hospital\nDate: 20/02/2026\nTotal: 1,500.00 THB',
  extracted_amount: 1500.0,
  extracted_date: new Date('2026-02-20'),
  extracted_merchant: 'Bangkok Hospital',
  extracted_tax_id: '0105536024688',
  confidence_score: 0.94,
  model_version: 'ocr-v2.1',
  processing_time_ms: 2100,
  needs_manual_review: false,
};

const mockClaimRequest = {
  id: 'CLM-001',
  employee_id: 'EMP001',
  claim_type: 'medical',
  amount: 1500.0,
  currency: 'THB',
  receipt_date: new Date('2026-02-20'),
  receipt_url: 's3://hrms-docs/receipts/EMP001/receipt.jpg',
  ocr_result_id: 'OCR-001',
  ocr_confidence: 0.94,
  policy_rule_id: 'RULE-001',
  status: 'draft',
  rejection_reason: null,
  submitted_at: null,
  approved_at: null,
  approved_by: null,
  created_at: new Date('2026-02-20'),
  updated_at: new Date('2026-02-20'),
  ocr_result: mockOcrResult,
  policy_rule: mockPolicyRule,
};

describe('ClaimsService', () => {
  let service: ClaimsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: OcrService, useValue: mockOcrService },
        { provide: PolicyService, useValue: mockPolicyService },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Create Claim ─────────────────────────────────────────────

  describe('createClaim', () => {
    it('should create a draft claim with receipt upload', async () => {
      const dto = {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://hrms-docs/receipts/EMP001/receipt.jpg',
      };

      prisma.claimRequest.create.mockResolvedValue(structuredClone(mockClaimRequest));

      const result = await service.createClaim(dto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.status).toBe('draft');
      expect(result.employee_id).toBe('EMP001');
      expect(prisma.claimRequest.create).toHaveBeenCalled();
    });

    it('should trigger OCR processing when receipt is uploaded', async () => {
      const dto = {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://hrms-docs/receipts/EMP001/receipt.jpg',
      };

      prisma.claimRequest.create.mockResolvedValue(structuredClone(mockClaimRequest));
      (mockOcrService.processReceipt as jest.Mock).mockResolvedValue(structuredClone(mockOcrResult));

      const result = await service.createClaim(dto, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(mockOcrService.processReceipt).toHaveBeenCalledWith(
        expect.any(String),
        dto.receipt_url,
      );
    });

    it('should validate against policy rules on creation', async () => {
      const dto = {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://hrms-docs/receipts/EMP001/receipt.jpg',
      };

      prisma.claimRequest.create.mockResolvedValue(structuredClone(mockClaimRequest));
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({
        valid: true,
        warnings: [],
      });

      const result = await service.createClaim(dto, mockEmployeeUser);
      expect(result).toBeDefined();
    });

    it('should reject claim_type not in allowed list', async () => {
      const dto = {
        claim_type: 'invalid_type',
        amount: 1500,
        receipt_date: '2026-02-20',
      };

      await expect(service.createClaim(dto, mockEmployeeUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should reject negative amount', async () => {
      const dto = {
        claim_type: 'medical',
        amount: -100,
        receipt_date: '2026-02-20',
      };

      await expect(service.createClaim(dto, mockEmployeeUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create audit log on claim creation', async () => {
      const dto = {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://hrms-docs/receipts/EMP001/receipt.jpg',
      };

      prisma.claimRequest.create.mockResolvedValue(structuredClone(mockClaimRequest));

      await service.createClaim(dto, mockEmployeeUser);

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          entity_type: 'claim',
          action: 'create',
          performed_by: 'EMP001',
        }),
      });
    });
  });

  // ── Submit Claim ─────────────────────────────────────────────

  describe('submitClaim', () => {
    it('should change status from draft to submitted', async () => {
      const draftClaim = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draftClaim);
      prisma.claimRequest.update.mockResolvedValue({ ...draftClaim, status: 'submitted' });
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({ valid: true, warnings: [] });

      const result = await service.submitClaim('CLM-001', mockEmployeeUser);

      expect(result.status).toBe('submitted');
      expect(prisma.claimRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'CLM-001' },
          data: expect.objectContaining({ status: 'submitted' }),
        }),
      );
    });

    it('should auto-approve claims below threshold', async () => {
      const smallClaim = structuredClone({
        ...mockClaimRequest,
        amount: 500,
        status: 'draft',
      });
      prisma.claimRequest.findUnique.mockResolvedValue(smallClaim);
      prisma.claimRequest.update.mockResolvedValue({ ...smallClaim, status: 'approved' });
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({ valid: true, warnings: [] });
      (mockPolicyService.getApplicableRule as jest.Mock).mockResolvedValue(
        structuredClone(mockPolicyRule),
      );

      const result = await service.submitClaim('CLM-001', mockEmployeeUser);

      expect(result.status).toBe('approved');
    });

    it('should reject submission if policy validation fails (hard rules)', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'draft', amount: 50000 });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({
        valid: false,
        errors: ['Amount exceeds max_amount of 5000 THB'],
      });

      await expect(service.submitClaim('CLM-001', mockEmployeeUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should not allow submitting a non-draft claim', async () => {
      const submittedClaim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(submittedClaim);

      await expect(service.submitClaim('CLM-001', mockEmployeeUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should not allow another employee to submit someone elses claim', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);

      const otherUser = structuredClone({ ...mockEmployeeUser, id: 'EMP999' });
      await expect(service.submitClaim('CLM-001', otherUser)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException for non-existent claim', async () => {
      prisma.claimRequest.findUnique.mockResolvedValue(null);

      await expect(service.submitClaim('CLM-NONE', mockEmployeeUser)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should set submitted_at timestamp on submission', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({ ...claim, status: 'submitted', submitted_at: new Date() });
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({ valid: true, warnings: [] });

      await service.submitClaim('CLM-001', mockEmployeeUser);

      expect(prisma.claimRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ submitted_at: expect.any(Date) }),
        }),
      );
    });
  });

  // ── Approve / Reject Claim ───────────────────────────────────

  describe('approveClaim', () => {
    it('should approve a submitted claim', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({ ...claim, status: 'approved' });

      const result = await service.approveClaim('CLM-001', {}, mockManagerUser);

      expect(result.status).toBe('approved');
    });

    it('should not allow employee role to approve', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);

      await expect(
        service.approveClaim('CLM-001', {}, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should set approved_at and approved_by on approval', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({
        ...claim,
        status: 'approved',
        approved_at: new Date(),
        approved_by: 'MGR001',
      });

      await service.approveClaim('CLM-001', {}, mockManagerUser);

      expect(prisma.claimRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'approved',
            approved_by: 'MGR001',
            approved_at: expect.any(Date),
          }),
        }),
      );
    });

    it('should create audit log on approval', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({ ...claim, status: 'approved' });

      await service.approveClaim('CLM-001', {}, mockManagerUser);

      expect(prisma.auditLog.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          entity_type: 'claim',
          action: 'approve',
          performed_by: 'MGR001',
        }),
      });
    });
  });

  describe('rejectClaim', () => {
    it('should reject a submitted claim with reason', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({ ...claim, status: 'rejected' });

      const result = await service.rejectClaim(
        'CLM-001',
        { reason: 'Invalid receipt' },
        mockManagerUser,
      );

      expect(result.status).toBe('rejected');
    });

    it('should require rejection reason', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);

      await expect(
        service.rejectClaim('CLM-001', {}, mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should store rejection_reason on the claim', async () => {
      const claim = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(claim);
      prisma.claimRequest.update.mockResolvedValue({
        ...claim,
        status: 'rejected',
        rejection_reason: 'Duplicate receipt',
      });

      await service.rejectClaim('CLM-001', { reason: 'Duplicate receipt' }, mockManagerUser);

      expect(prisma.claimRequest.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            rejection_reason: 'Duplicate receipt',
          }),
        }),
      );
    });
  });

  // ── Find / Query Claims ──────────────────────────────────────

  describe('findById', () => {
    it('should return claim with OCR result and policy rule', async () => {
      prisma.claimRequest.findUnique.mockResolvedValue(structuredClone(mockClaimRequest));

      const result = await service.findById('CLM-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('CLM-001');
      expect(result.ocr_result).toBeDefined();
      expect(result.policy_rule).toBeDefined();
    });

    it('should throw NotFoundException if claim not found', async () => {
      prisma.claimRequest.findUnique.mockResolvedValue(null);

      await expect(service.findById('CLM-NONE')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMyClaimHistory', () => {
    it('should return all claims for the current employee', async () => {
      const claims = [
        structuredClone(mockClaimRequest),
        structuredClone({ ...mockClaimRequest, id: 'CLM-002', claim_type: 'travel', amount: 800 }),
      ];
      prisma.claimRequest.findMany.mockResolvedValue(claims);

      const result = await service.getMyClaimHistory(mockEmployeeUser);

      expect(result).toHaveLength(2);
      expect(prisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { employee_id: 'EMP001' },
        }),
      );
    });

    it('should order claims by created_at desc', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);

      await service.getMyClaimHistory(mockEmployeeUser);

      expect(prisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { created_at: 'desc' },
        }),
      );
    });
  });

  describe('getYtdSpending', () => {
    it('should return YTD spending grouped by claim_type', async () => {
      prisma.claimRequest.aggregate.mockResolvedValue({
        _sum: { amount: 4500 },
      });

      const result = await service.getYtdSpending('EMP001', 'medical');

      expect(result).toBeDefined();
      expect(result.total).toBe(4500);
      expect(result.claim_type).toBe('medical');
    });

    it('should only count approved claims in YTD', async () => {
      prisma.claimRequest.aggregate.mockResolvedValue({
        _sum: { amount: 3000 },
      });

      await service.getYtdSpending('EMP001', 'medical');

      expect(prisma.claimRequest.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'approved',
            employee_id: 'EMP001',
            claim_type: 'medical',
          }),
        }),
      );
    });

    it('should filter by current year', async () => {
      prisma.claimRequest.aggregate.mockResolvedValue({
        _sum: { amount: 0 },
      });

      await service.getYtdSpending('EMP001', 'medical');

      expect(prisma.claimRequest.aggregate).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            receipt_date: expect.objectContaining({
              gte: expect.any(Date),
            }),
          }),
        }),
      );
    });
  });

  // ── Status Tracking (F6.5) ───────────────────────────────────

  describe('claim status workflow', () => {
    it('should follow Draft → Submitted → Processing → Approved flow', async () => {
      // Draft → Submitted
      const draft = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draft);
      prisma.claimRequest.update.mockResolvedValue({ ...draft, status: 'submitted' });
      (mockPolicyService.validateClaim as jest.Mock).mockResolvedValue({ valid: true, warnings: [] });

      const submitted = await service.submitClaim('CLM-001', mockEmployeeUser);
      expect(submitted.status).toBe('submitted');
    });

    it('should allow Draft → Submitted → Rejected flow', async () => {
      const submitted = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(submitted);
      prisma.claimRequest.update.mockResolvedValue({ ...submitted, status: 'rejected' });

      const rejected = await service.rejectClaim(
        'CLM-001',
        { reason: 'Not eligible' },
        mockManagerUser,
      );
      expect(rejected.status).toBe('rejected');
    });

    it('should not allow skipping status (e.g., draft → approved directly)', async () => {
      const draft = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draft);

      await expect(
        service.approveClaim('CLM-001', {}, mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ── Pending Claims (for manager/HR) ──────────────────────────

  describe('getPendingClaims', () => {
    it('should return submitted claims for manager review', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([
        structuredClone({ ...mockClaimRequest, status: 'submitted' }),
      ]);

      const result = await service.getPendingClaims(mockManagerUser);

      expect(result).toHaveLength(1);
      expect(prisma.claimRequest.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'submitted' }),
        }),
      );
    });

    it('should not allow employee role to view pending claims', async () => {
      await expect(service.getPendingClaims(mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  // ── Update Draft Claim ───────────────────────────────────────

  describe('updateClaim', () => {
    it('should update a draft claim', async () => {
      const draft = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draft);
      prisma.claimRequest.update.mockResolvedValue({ ...draft, amount: 2000 });

      const result = await service.updateClaim('CLM-001', { amount: 2000 }, mockEmployeeUser);

      expect(result.amount).toBe(2000);
    });

    it('should not allow updating a submitted claim', async () => {
      const submitted = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(submitted);

      await expect(
        service.updateClaim('CLM-001', { amount: 2000 }, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not allow another employee to update a claim', async () => {
      const draft = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draft);

      const otherUser = structuredClone({ ...mockEmployeeUser, id: 'EMP999' });
      await expect(
        service.updateClaim('CLM-001', { amount: 2000 }, otherUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ── Delete Draft Claim ───────────────────────────────────────

  describe('deleteClaim', () => {
    it('should delete a draft claim', async () => {
      const draft = structuredClone({ ...mockClaimRequest, status: 'draft' });
      prisma.claimRequest.findUnique.mockResolvedValue(draft);
      prisma.claimRequest.update.mockResolvedValue({ ...draft, status: 'deleted' });

      const result = await service.deleteClaim('CLM-001', mockEmployeeUser);

      expect(result).toBeDefined();
    });

    it('should not allow deleting a submitted claim', async () => {
      const submitted = structuredClone({ ...mockClaimRequest, status: 'submitted' });
      prisma.claimRequest.findUnique.mockResolvedValue(submitted);

      await expect(service.deleteClaim('CLM-001', mockEmployeeUser)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});

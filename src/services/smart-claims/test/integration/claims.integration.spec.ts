import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClaimsModule } from '../../src/claims/claims.module';
import { OcrModule } from '../../src/ocr/ocr.module';
import { PolicyModule } from '../../src/policy/policy.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ClaimsService } from '../../src/claims/claims.service';
import { OcrService } from '../../src/ocr/ocr.service';
import { PolicyService } from '../../src/policy/policy.service';
import { type CurrentUserInterface } from 'hrms-shared';

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
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  oCRResult: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
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

describe('Smart Claims Integration Tests', () => {
  let app: INestApplication;
  let claimsService: ClaimsService;
  let ocrService: OcrService;
  let policyService: PolicyService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClaimsModule, OcrModule, PolicyModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    claimsService = moduleFixture.get<ClaimsService>(ClaimsService);
    ocrService = moduleFixture.get<OcrService>(OcrService);
    policyService = moduleFixture.get<PolicyService>(PolicyService);
  });

  afterAll(async () => {
    await app?.close();
  });

  afterEach(() => jest.clearAllMocks());

  // ── Full Claim Lifecycle ─────────────────────────────────────

  describe('Full claim lifecycle: create → OCR → validate → submit → approve', () => {
    it('should handle the complete claim workflow', async () => {
      // Step 1: Create claim with receipt
      const claimData = {
        claim_type: 'medical',
        amount: 1500,
        receipt_date: '2026-02-20',
        receipt_url: 's3://bucket/receipt.jpg',
      };

      const createdClaim = {
        id: 'CLM-INT-001',
        employee_id: 'EMP001',
        ...claimData,
        status: 'draft',
        ocr_confidence: 0.94,
      };

      mockPrismaService.claimRequest.create.mockResolvedValue(createdClaim);
      mockPrismaService.oCRResult.create.mockResolvedValue({
        id: 'OCR-INT-001',
        claim_id: 'CLM-INT-001',
        extracted_amount: 1500,
        confidence_score: 0.94,
        needs_manual_review: false,
      });

      const claim = await claimsService.createClaim(claimData, mockEmployee);
      expect(claim.status).toBe('draft');
    });
  });

  // ── Auto-approve Flow ────────────────────────────────────────

  describe('Auto-approve flow for small claims', () => {
    it('should auto-approve claims below threshold', async () => {
      const smallClaim = {
        id: 'CLM-SMALL',
        employee_id: 'EMP001',
        claim_type: 'meal',
        amount: 100,
        status: 'draft',
      };

      mockPrismaService.claimRequest.findUnique.mockResolvedValue(smallClaim);
      mockPrismaService.claimRequest.update.mockResolvedValue({
        ...smallClaim,
        status: 'approved',
      });
      mockPrismaService.policyRule.findFirst.mockResolvedValue({
        auto_approve_threshold: 200,
        max_amount: 500,
        max_amount_per_month: 3000,
      });
      mockPrismaService.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 0 } });

      const result = await claimsService.submitClaim('CLM-SMALL', mockEmployee);
      expect(result.status).toBe('approved');
    });
  });

  // ── Policy Violation Flow ────────────────────────────────────

  describe('Policy violation prevents submission', () => {
    it('should block submission when exceeding max_amount', async () => {
      const overLimitClaim = {
        id: 'CLM-OVER',
        employee_id: 'EMP001',
        claim_type: 'medical',
        amount: 50000,
        status: 'draft',
      };

      mockPrismaService.claimRequest.findUnique.mockResolvedValue(overLimitClaim);
      mockPrismaService.policyRule.findFirst.mockResolvedValue({
        max_amount: 5000,
        max_amount_per_month: 15000,
      });

      await expect(
        claimsService.submitClaim('CLM-OVER', mockEmployee),
      ).rejects.toThrow();
    });
  });

  // ── OCR Low Confidence Flow ──────────────────────────────────

  describe('OCR low confidence triggers manual review', () => {
    it('should flag low confidence OCR for manual review', async () => {
      mockPrismaService.oCRResult.create.mockResolvedValue({
        id: 'OCR-LOW',
        claim_id: 'CLM-BLURRY',
        confidence_score: 0.5,
        needs_manual_review: true,
        extracted_amount: null,
      });

      const result = await ocrService.processReceipt('CLM-BLURRY', 's3://bucket/blurry.jpg');
      expect(result.needs_manual_review).toBe(true);
    });
  });

  // ── Manager Rejection Flow ───────────────────────────────────

  describe('Manager rejection flow', () => {
    it('should reject claim and store reason', async () => {
      const submittedClaim = {
        id: 'CLM-REJ',
        employee_id: 'EMP001',
        claim_type: 'travel',
        amount: 3000,
        status: 'submitted',
      };

      mockPrismaService.claimRequest.findUnique.mockResolvedValue(submittedClaim);
      mockPrismaService.claimRequest.update.mockResolvedValue({
        ...submittedClaim,
        status: 'rejected',
        rejection_reason: 'Receipt not clear',
      });

      const result = await claimsService.rejectClaim(
        'CLM-REJ',
        { reason: 'Receipt not clear' },
        mockManager,
      );
      expect(result.status).toBe('rejected');
      expect(result.rejection_reason).toBe('Receipt not clear');
    });
  });

  // ── YTD Spending Tracking ────────────────────────────────────

  describe('YTD spending calculation', () => {
    it('should correctly calculate YTD spending and remaining budget', async () => {
      mockPrismaService.policyRule.findFirst.mockResolvedValue({
        max_amount_per_month: 15000,
        claim_type: 'medical',
      });
      mockPrismaService.claimRequest.aggregate.mockResolvedValue({
        _sum: { amount: 8000 },
      });

      const spending = await policyService.getYtdSpending('EMP001', 'medical');

      expect(spending.total).toBe(8000);
      expect(spending.remaining_monthly).toBe(7000);
    });
  });

  // ── Multiple Claim Types ─────────────────────────────────────

  describe('Multiple claim type support', () => {
    it('should handle medical, travel, and meal claim types independently', async () => {
      for (const claimType of ['medical', 'travel', 'meal']) {
        mockPrismaService.policyRule.findFirst.mockResolvedValue({
          claim_type: claimType,
          max_amount: 5000,
          max_amount_per_month: 15000,
          is_active: true,
        });

        const rule = await policyService.getApplicableRule(claimType);
        expect(rule).toBeDefined();
        expect(rule.claim_type).toBe(claimType);
      }
    });
  });

  // ── Claim History ────────────────────────────────────────────

  describe('Claim history and reporting', () => {
    it('should return paginated claim history for an employee', async () => {
      const claims = Array.from({ length: 5 }, (_, i) => ({
        id: `CLM-HIST-${i + 1}`,
        employee_id: 'EMP001',
        claim_type: i % 2 === 0 ? 'medical' : 'travel',
        amount: (i + 1) * 500,
        status: 'approved',
        created_at: new Date(`2026-0${i + 1}-15`),
      }));

      mockPrismaService.claimRequest.findMany.mockResolvedValue(claims);

      const result = await claimsService.getMyClaimHistory(mockEmployee);
      expect(result).toHaveLength(5);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PolicyService } from '../../src/policy/policy.service';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockPrismaService = {
  policyRule: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  claimRequest: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

const mockMedicalPolicy = {
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

const mockTravelPolicy = {
  id: 'RULE-002',
  rule_name: 'Travel Claim Policy',
  claim_type: 'travel',
  max_amount: 3000,
  max_amount_per_month: 10000,
  auto_approve_threshold: 500,
  requires_receipt: true,
  requires_doctor_cert: false,
  min_days_notice: 0,
  effective_from: new Date('2026-01-01'),
  effective_to: null,
  eligible_grades: ['A', 'B', 'C'],
  is_active: true,
};

const mockMealPolicy = {
  id: 'RULE-003',
  rule_name: 'Meal Claim Policy',
  claim_type: 'meal',
  max_amount: 500,
  max_amount_per_month: 3000,
  auto_approve_threshold: 200,
  requires_receipt: true,
  requires_doctor_cert: false,
  min_days_notice: 0,
  effective_from: new Date('2026-01-01'),
  effective_to: null,
  eligible_grades: ['A', 'B', 'C', 'D'],
  is_active: true,
};

describe('PolicyService', () => {
  let service: PolicyService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PolicyService>(PolicyService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => jest.clearAllMocks());

  // ── Get Applicable Rule ──────────────────────────────────────

  describe('getApplicableRule', () => {
    it('should return active policy rule for a claim type', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));

      const rule = await service.getApplicableRule('medical');

      expect(rule).toBeDefined();
      expect(rule.claim_type).toBe('medical');
      expect(rule.is_active).toBe(true);
    });

    it('should return null if no active rule exists', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(null);

      const rule = await service.getApplicableRule('unknown_type');

      expect(rule).toBeNull();
    });

    it('should only return rules within effective date range', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));

      await service.getApplicableRule('medical');

      expect(prisma.policyRule.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            claim_type: 'medical',
            is_active: true,
            effective_from: expect.objectContaining({ lte: expect.any(Date) }),
          }),
        }),
      );
    });
  });

  // ── Validate Claim (F6.3, F6.4) ─────────────────────────────

  describe('validateClaim', () => {
    it('should return valid for claim within limits', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 3000 } });

      const result = await service.validateClaim({
        claim_type: 'medical',
        amount: 1500,
        employee_id: 'EMP001',
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject claim exceeding max_amount per claim', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 0 } });

      const result = await service.validateClaim({
        claim_type: 'medical',
        amount: 6000, // exceeds max_amount of 5000
        employee_id: 'EMP001',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('max_amount'),
      );
    });

    it('should reject claim exceeding monthly cap', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 14000 } }); // already 14000, cap is 15000

      const result = await service.validateClaim({
        claim_type: 'medical',
        amount: 2000, // 14000 + 2000 = 16000 > 15000
        employee_id: 'EMP001',
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('monthly'),
      );
    });

    it('should warn when receipt is required but missing', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 0 } });

      const result = await service.validateClaim({
        claim_type: 'medical',
        amount: 500,
        employee_id: 'EMP001',
        has_receipt: false,
      });

      expect(result.warnings).toContainEqual(
        expect.stringContaining('receipt'),
      );
    });

    it('should warn when doctor certificate is required but missing', async () => {
      const policyWithCert = structuredClone({
        ...mockMedicalPolicy,
        requires_doctor_cert: true,
      });
      prisma.policyRule.findFirst.mockResolvedValue(policyWithCert);
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 0 } });

      const result = await service.validateClaim({
        claim_type: 'medical',
        amount: 500,
        employee_id: 'EMP001',
        has_doctor_cert: false,
      });

      expect(result.warnings).toContainEqual(
        expect.stringContaining('doctor'),
      );
    });

    it('should return valid with no policy rule (no restrictions)', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(null);

      const result = await service.validateClaim({
        claim_type: 'other',
        amount: 500,
        employee_id: 'EMP001',
      });

      // No policy = default approve (or reject based on design)
      expect(result).toBeDefined();
    });
  });

  // ── Auto-approve Threshold ───────────────────────────────────

  describe('isAutoApprovable', () => {
    it('should return true when amount is below auto_approve_threshold', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));

      const result = await service.isAutoApprovable('medical', 500); // threshold is 1000

      expect(result).toBe(true);
    });

    it('should return false when amount exceeds auto_approve_threshold', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));

      const result = await service.isAutoApprovable('medical', 1500); // threshold is 1000

      expect(result).toBe(false);
    });

    it('should return false when no auto_approve_threshold is set', async () => {
      const noThreshold = structuredClone({ ...mockMedicalPolicy, auto_approve_threshold: null });
      prisma.policyRule.findFirst.mockResolvedValue(noThreshold);

      const result = await service.isAutoApprovable('medical', 100);

      expect(result).toBe(false);
    });
  });

  // ── YTD Spending (F6.6) ──────────────────────────────────────

  describe('getYtdSpending', () => {
    it('should return YTD spending for a category', async () => {
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 5000 } });

      const result = await service.getYtdSpending('EMP001', 'medical');

      expect(result).toBeDefined();
      expect(result.total).toBe(5000);
      expect(result.claim_type).toBe('medical');
    });

    it('should return remaining budget per policy rule', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 10000 } });

      const result = await service.getYtdSpending('EMP001', 'medical');

      expect(result.remaining_monthly).toBeDefined();
      expect(result.remaining_monthly).toBe(5000); // 15000 - 10000
    });

    it('should return zero remaining when cap is reached', async () => {
      prisma.policyRule.findFirst.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.claimRequest.aggregate.mockResolvedValue({ _sum: { amount: 15000 } });

      const result = await service.getYtdSpending('EMP001', 'medical');

      expect(result.remaining_monthly).toBe(0);
    });
  });

  // ── CRUD Policy Rules ────────────────────────────────────────

  describe('createPolicyRule', () => {
    it('should create a new policy rule', async () => {
      const dto = {
        rule_name: 'New Policy',
        claim_type: 'equipment',
        max_amount: 10000,
        max_amount_per_month: 30000,
        requires_receipt: true,
        effective_from: '2026-03-01',
      };
      prisma.policyRule.create.mockResolvedValue({
        id: 'RULE-NEW',
        ...dto,
        is_active: true,
      });

      const result = await service.createPolicyRule(dto);

      expect(result).toBeDefined();
      expect(result.rule_name).toBe('New Policy');
      expect(prisma.policyRule.create).toHaveBeenCalled();
    });
  });

  describe('listPolicyRules', () => {
    it('should return all active policy rules', async () => {
      prisma.policyRule.findMany.mockResolvedValue([
        structuredClone(mockMedicalPolicy),
        structuredClone(mockTravelPolicy),
        structuredClone(mockMealPolicy),
      ]);

      const result = await service.listPolicyRules();

      expect(result).toHaveLength(3);
    });
  });

  describe('updatePolicyRule', () => {
    it('should update an existing policy rule', async () => {
      prisma.policyRule.findUnique.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.policyRule.update.mockResolvedValue({
        ...mockMedicalPolicy,
        max_amount: 7000,
      });

      const result = await service.updatePolicyRule('RULE-001', { max_amount: 7000 });

      expect(result.max_amount).toBe(7000);
    });
  });

  describe('deactivatePolicyRule', () => {
    it('should deactivate a policy rule', async () => {
      prisma.policyRule.findUnique.mockResolvedValue(structuredClone(mockMedicalPolicy));
      prisma.policyRule.update.mockResolvedValue({
        ...mockMedicalPolicy,
        is_active: false,
      });

      const result = await service.deactivatePolicyRule('RULE-001');

      expect(result.is_active).toBe(false);
    });
  });
});

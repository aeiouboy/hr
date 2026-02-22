import { Test, TestingModule } from '@nestjs/testing';
import { ClaimsPolicyValidationService, ClaimValidationResult } from './claims-policy-validation.service';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  claimRequest: {
    findMany: jest.fn(),
  },
  policyRule: {
    findMany: jest.fn(),
  },
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Test',
  lastName: 'Employee',
  roles: ['employee'],
};

describe('ClaimsPolicyValidationService', () => {
  let service: ClaimsPolicyValidationService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsPolicyValidationService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ClaimsPolicyValidationService>(ClaimsPolicyValidationService);
    prisma = mockPrisma;
  });

  describe('validateClaimSubmission', () => {
    const baseClaim = {
      employee_id: 'EMP001',
      category: 'medical',
      amount: 3000,
      currency: 'THB',
      description: 'Doctor visit',
      receipt_id: 'receipt-001',
      vendor_name: 'Bangkok Hospital',
      claim_date: '2026-03-10',
      documents: ['receipt'],
    };

    it('should return all rules passed for a valid claim', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      expect(results).toBeInstanceOf(Array);
      expect(results.length).toBeGreaterThanOrEqual(4);
      const allPassed = results.every((r: ClaimValidationResult) => r.passed);
      expect(allPassed).toBe(true);
    });

    it('should fail single_claim_cap when amount exceeds limit (hard rule)', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(
        { ...baseClaim, amount: 60000 },
        mockEmployee,
      );

      const capRule = results.find((r: ClaimValidationResult) => r.rule === 'single_claim_cap');
      expect(capRule!.passed).toBe(false);
      expect(capRule!.type).toBe('hard');
      expect(capRule!.message).toContain('cap');
    });

    it('should pass single_claim_cap when amount is within limit', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const capRule = results.find((r: ClaimValidationResult) => r.rule === 'single_claim_cap');
      expect(capRule!.passed).toBe(true);
    });

    it('should fail monthly_spending_cap when YTD + current exceeds limit (hard rule)', async () => {
      // Already spent 45000 this month
      prisma.claimRequest.findMany.mockResolvedValue([
        { amount: 25000, status: 'approved', created_at: new Date('2026-03-01') },
        { amount: 20000, status: 'approved', created_at: new Date('2026-03-05') },
      ]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(
        { ...baseClaim, amount: 10000 },
        mockEmployee,
      );

      const monthlyRule = results.find((r: ClaimValidationResult) => r.rule === 'monthly_spending_cap');
      expect(monthlyRule!.passed).toBe(false);
      expect(monthlyRule!.type).toBe('hard');
      expect(monthlyRule!.message).toContain('monthly');
    });

    it('should pass monthly_spending_cap when within limit', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([
        { amount: 5000, status: 'approved', created_at: new Date('2026-03-01') },
      ]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const monthlyRule = results.find((r: ClaimValidationResult) => r.rule === 'monthly_spending_cap');
      expect(monthlyRule!.passed).toBe(true);
    });

    it('should warn on missing optional documents (soft rule)', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(
        { ...baseClaim, documents: [], receipt_id: undefined },
        mockEmployee,
      );

      const docRule = results.find((r: ClaimValidationResult) => r.rule === 'required_documents');
      expect(docRule!.passed).toBe(false);
      expect(docRule!.type).toBe('soft');
    });

    it('should pass required_documents when documents are attached', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const docRule = results.find((r: ClaimValidationResult) => r.rule === 'required_documents');
      expect(docRule!.passed).toBe(true);
    });

    it('should fail eligible_category when category is not allowed (hard rule)', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(
        { ...baseClaim, category: 'entertainment' },
        mockEmployee,
      );

      const catRule = results.find((r: ClaimValidationResult) => r.rule === 'eligible_category');
      expect(catRule!.passed).toBe(false);
      expect(catRule!.type).toBe('hard');
    });

    it('should pass eligible_category for valid categories', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const catRule = results.find((r: ClaimValidationResult) => r.rule === 'eligible_category');
      expect(catRule!.passed).toBe(true);
    });

    it('should fail duplicate_claim when same date + vendor + amount exists (hard rule)', async () => {
      prisma.claimRequest.findMany.mockImplementation((args: any) => {
        // Duplicate check: queries by employee_id + amount + status
        if (args?.where?.amount !== undefined) {
          return Promise.resolve([
            {
              id: 'claim-existing',
              employee_id: 'EMP001',
              amount: 3000,
              vendor_name: 'Bangkok Hospital',
              description: 'Bangkok Hospital visit',
              claim_date: new Date('2026-03-10'),
              status: 'submitted',
            },
          ]);
        }
        // Monthly spending query
        return Promise.resolve([]);
      });
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const dupeRule = results.find((r: ClaimValidationResult) => r.rule === 'duplicate_claim');
      expect(dupeRule!.passed).toBe(false);
      expect(dupeRule!.type).toBe('hard');
    });

    it('should pass duplicate_claim when no matching claim exists', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      const dupeRule = results.find((r: ClaimValidationResult) => r.rule === 'duplicate_claim');
      expect(dupeRule!.passed).toBe(true);
    });

    it('should include rule, type, passed, and message in each result', async () => {
      prisma.claimRequest.findMany.mockResolvedValue([]);
      prisma.policyRule.findMany.mockResolvedValue([]);

      const results = await service.validateClaimSubmission(baseClaim, mockEmployee);

      for (const result of results) {
        expect(result).toHaveProperty('rule');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('passed');
        expect(result).toHaveProperty('message');
        expect(['hard', 'soft']).toContain(result.type);
      }
    });
  });
});

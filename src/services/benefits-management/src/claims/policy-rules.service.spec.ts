import { PolicyRulesService } from './policy-rules.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const mockPrisma = {
  policyRule: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  claimRequest: {
    findMany: jest.fn(),
  },
  policyCheck: {
    createMany: jest.fn(),
  },
};

const hrManager = { id: 'user-1', roles: ['hr_manager'], employee_id: 'EMP001' };
const employee = { id: 'user-2', roles: ['employee'], employee_id: 'EMP002' };

const mockRules = [
  {
    id: 'rule-1',
    name: 'max_medical_claim',
    description: 'Maximum single medical claim amount',
    rule_type: 'hard_limit',
    category: 'medical',
    condition_field: 'max_amount',
    condition_value: '5000',
    is_active: true,
    created_by: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'rule-2',
    name: 'monthly_spending_cap',
    description: 'Monthly spending cap across all categories',
    rule_type: 'hard_limit',
    category: null,
    condition_field: 'monthly_cap',
    condition_value: '20000',
    is_active: true,
    created_by: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'rule-3',
    name: 'receipt_required_all',
    description: 'Receipt document required for all claims',
    rule_type: 'required_document',
    category: null,
    condition_field: 'required_docs',
    condition_value: '["receipt"]',
    is_active: true,
    created_by: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'rule-4',
    name: 'allowed_categories',
    description: 'Restrict claim categories',
    rule_type: 'category_restriction',
    category: null,
    condition_field: 'eligible_categories',
    condition_value: '["medical","dental","travel","meals","office_supplies","training"]',
    is_active: true,
    created_by: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'rule-5',
    name: 'high_spending_warning',
    description: 'Warning when single claim exceeds 3000',
    rule_type: 'soft_warning',
    category: null,
    condition_field: 'max_amount',
    condition_value: '3000',
    is_active: true,
    created_by: 'user-1',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

describe('PolicyRulesService', () => {
  let service: PolicyRulesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PolicyRulesService(mockPrisma as any);
  });

  describe('getPolicyRules', () => {
    it('should return all active rules', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue(mockRules);

      const result = await service.getPolicyRules();
      expect(result).toHaveLength(5);
      expect(result.every((r: any) => r.is_active)).toBe(true);
    });

    it('should filter by category when provided', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([mockRules[0]]);

      const result = await service.getPolicyRules('medical');
      expect(mockPrisma.policyRule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ category: 'medical', is_active: true }),
        }),
      );
    });
  });

  describe('createPolicyRule', () => {
    it('should create a new policy rule as HR Manager', async () => {
      const dto = {
        name: 'new_rule',
        rule_type: 'hard_limit',
        condition_field: 'max_amount',
        condition_value: '10000',
      };
      const expected = { id: 'rule-new', ...dto, is_active: true, created_by: 'user-1' };
      mockPrisma.policyRule.create.mockResolvedValue(expected);

      const result = await service.createPolicyRule(dto as any, hrManager as any);
      expect(result.name).toBe('new_rule');
      expect(mockPrisma.policyRule.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ created_by: 'user-1' }),
      });
    });

    it('should reject non-HR Manager users', async () => {
      await expect(
        service.createPolicyRule({} as any, employee as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updatePolicyRule', () => {
    it('should update an existing policy rule as HR Manager', async () => {
      mockPrisma.policyRule.findUnique.mockResolvedValue(mockRules[0]);
      mockPrisma.policyRule.update.mockResolvedValue({ ...mockRules[0], condition_value: '8000' });

      const result = await service.updatePolicyRule('rule-1', { condition_value: '8000' }, hrManager as any);
      expect(result.condition_value).toBe('8000');
    });

    it('should reject non-HR Manager users', async () => {
      await expect(
        service.updatePolicyRule('rule-1', {} as any, employee as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent rule', async () => {
      mockPrisma.policyRule.findUnique.mockResolvedValue(null);
      await expect(
        service.updatePolicyRule('rule-invalid', {} as any, hrManager as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('validateAgainstRules', () => {
    const claim = {
      id: 'claim-1',
      employee_id: 'EMP002',
      category: 'medical',
      amount: 4000,
      receipt_id: 'rcpt-1',
    };

    it('should check a claim against all active rules', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue(mockRules);
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);

      const results = await service.validateAgainstRules(claim as any);
      expect(results.length).toBeGreaterThanOrEqual(mockRules.length);
      results.forEach((r: any) => {
        expect(r).toHaveProperty('rule_name');
        expect(r).toHaveProperty('passed');
        expect(typeof r.passed).toBe('boolean');
      });
    });

    it('should identify hard_limit violations as blocking', async () => {
      const overLimitClaim = { ...claim, amount: 6000 };
      mockPrisma.policyRule.findMany.mockResolvedValue([mockRules[0]]);
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);

      const results = await service.validateAgainstRules(overLimitClaim as any);
      const hardResult = results.find((r: any) => r.rule_name === 'max_medical_claim');
      expect(hardResult?.passed).toBe(false);
      expect(hardResult?.is_blocking).toBe(true);
    });

    it('should identify soft_warning violations as non-blocking', async () => {
      const highClaim = { ...claim, amount: 4000 };
      mockPrisma.policyRule.findMany.mockResolvedValue([mockRules[4]]);
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);

      const results = await service.validateAgainstRules(highClaim as any);
      const softResult = results.find((r: any) => r.rule_name === 'high_spending_warning');
      expect(softResult?.passed).toBe(false);
      expect(softResult?.is_blocking).toBe(false);
    });

    it('should handle required_document rule type', async () => {
      const noReceiptClaim = { ...claim, receipt_id: null };
      mockPrisma.policyRule.findMany.mockResolvedValue([mockRules[2]]);
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);

      const results = await service.validateAgainstRules(noReceiptClaim as any);
      const docResult = results.find((r: any) => r.rule_name === 'receipt_required_all');
      expect(docResult?.passed).toBe(false);
    });

    it('should handle category_restriction rule type', async () => {
      const invalidCategory = { ...claim, category: 'gambling' };
      mockPrisma.policyRule.findMany.mockResolvedValue([mockRules[3]]);
      mockPrisma.claimRequest.findMany.mockResolvedValue([]);

      const results = await service.validateAgainstRules(invalidCategory as any);
      const catResult = results.find((r: any) => r.rule_name === 'allowed_categories');
      expect(catResult?.passed).toBe(false);
    });
  });
});

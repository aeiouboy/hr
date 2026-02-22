import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PolicyConfigService } from './policy-config.service';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  policyRuleConfig: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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

const mockHrManager: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockPolicyRule: Record<string, any> = {
  id: 'rule-001',
  name: 'max_single_claim',
  description: 'Maximum single claim amount',
  category: 'claims',
  rule_type: 'hard',
  condition_field: 'amount',
  condition_operator: 'lte',
  condition_value: '50000',
  is_active: true,
  created_by: 'HR001',
  created_at: new Date('2026-01-01'),
  updated_at: new Date('2026-01-01'),
  deleted_at: null,
};

describe('PolicyConfigService', () => {
  let service: PolicyConfigService;
  let prisma: typeof mockPrisma;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyConfigService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PolicyConfigService>(PolicyConfigService);
    prisma = mockPrisma;
  });

  describe('getPolicyRules', () => {
    it('should return all active policy rules', async () => {
      prisma.policyRuleConfig.findMany.mockResolvedValue([structuredClone(mockPolicyRule)]);

      const result = await service.getPolicyRules();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('max_single_claim');
      expect(prisma.policyRuleConfig.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { deleted_at: null },
        }),
      );
    });

    it('should return empty array when no rules exist', async () => {
      prisma.policyRuleConfig.findMany.mockResolvedValue([]);

      const result = await service.getPolicyRules();

      expect(result).toEqual([]);
    });
  });

  describe('getPolicyRulesByCategory', () => {
    it('should filter rules by category', async () => {
      prisma.policyRuleConfig.findMany.mockResolvedValue([structuredClone(mockPolicyRule)]);

      const result = await service.getPolicyRulesByCategory('claims');

      expect(result).toHaveLength(1);
      expect(prisma.policyRuleConfig.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { category: 'claims', deleted_at: null },
        }),
      );
    });

    it('should filter by leave category', async () => {
      const leaveRule = { ...mockPolicyRule, category: 'leave', name: 'min_notice_days' };
      prisma.policyRuleConfig.findMany.mockResolvedValue([leaveRule]);

      const result = await service.getPolicyRulesByCategory('leave');

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('leave');
    });

    it('should filter by overtime category', async () => {
      const otRule = { ...mockPolicyRule, category: 'overtime', name: 'weekly_limit' };
      prisma.policyRuleConfig.findMany.mockResolvedValue([otRule]);

      const result = await service.getPolicyRulesByCategory('overtime');

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('overtime');
    });
  });

  describe('createPolicyRule', () => {
    const createDto = {
      name: 'new_rule',
      description: 'New policy rule',
      category: 'leave',
      rule_type: 'hard' as const,
      condition_field: 'days',
      condition_operator: 'lte',
      condition_value: '10',
    };

    it('should create a policy rule when called by HR Manager', async () => {
      const created: Record<string, any> = { ...createDto, id: 'rule-new', is_active: true, created_by: 'HR001', created_at: new Date(), updated_at: new Date(), deleted_at: null };
      prisma.policyRuleConfig.create.mockResolvedValue(created);

      const result = await service.createPolicyRule(createDto, mockHrManager);

      expect(result.name).toBe('new_rule');
      expect(prisma.policyRuleConfig.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'new_rule',
          created_by: 'HR001',
        }),
      });
    });

    it('should reject when called by non-HR Manager', async () => {
      await expect(
        service.createPolicyRule(createDto, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updatePolicyRule', () => {
    const updateDto = {
      condition_value: '20000',
      description: 'Updated max claim',
    };

    it('should update a policy rule when called by HR Manager', async () => {
      prisma.policyRuleConfig.findUnique.mockResolvedValue(structuredClone(mockPolicyRule));
      prisma.policyRuleConfig.update.mockResolvedValue({
        ...mockPolicyRule,
        ...updateDto,
      });

      const result = await service.updatePolicyRule('rule-001', updateDto, mockHrManager);

      expect(result.condition_value).toBe('20000');
      expect(prisma.policyRuleConfig.update).toHaveBeenCalledWith({
        where: { id: 'rule-001' },
        data: expect.objectContaining(updateDto),
      });
    });

    it('should reject when called by non-HR Manager', async () => {
      await expect(
        service.updatePolicyRule('rule-001', updateDto, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent rule', async () => {
      prisma.policyRuleConfig.findUnique.mockResolvedValue(null);

      await expect(
        service.updatePolicyRule('nonexist', updateDto, mockHrManager),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePolicyRule', () => {
    it('should soft delete by setting deleted_at', async () => {
      prisma.policyRuleConfig.findUnique.mockResolvedValue(structuredClone(mockPolicyRule));
      prisma.policyRuleConfig.update.mockResolvedValue({
        ...mockPolicyRule,
        deleted_at: new Date(),
        is_active: false,
      });

      const result = await service.deletePolicyRule('rule-001', mockHrManager);

      expect(result.deleted_at).toBeDefined();
      expect(result.is_active).toBe(false);
      expect(prisma.policyRuleConfig.update).toHaveBeenCalledWith({
        where: { id: 'rule-001' },
        data: expect.objectContaining({
          deleted_at: expect.any(Date),
          is_active: false,
        }),
      });
    });

    it('should reject when called by non-HR Manager', async () => {
      await expect(
        service.deletePolicyRule('rule-001', mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent rule', async () => {
      prisma.policyRuleConfig.findUnique.mockResolvedValue(null);

      await expect(
        service.deletePolicyRule('nonexist', mockHrManager),
      ).rejects.toThrow(NotFoundException);
    });
  });
});

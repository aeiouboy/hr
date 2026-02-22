import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PolicyValidationService } from '../../src/policy-validation/policy-validation.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  policyRule: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const hrManagerUser: CurrentUserInterface = {
  id: 'HRM001', email: 'hrm@cg.com', username: 'hrm', firstName: 'HR', lastName: 'Manager', roles: ['hr_manager'],
};
const managerUser: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'],
};
const employeeUser: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};

// ── Mock policy rules ─────────────────────────────────────────

const hardLeaveRule = {
  id: 'pr-001',
  name: 'Leave balance check',
  description: 'Cannot exceed remaining leave balance',
  category: 'leave',
  rule_type: 'hard',
  condition_field: 'leave_balance',
  condition_op: 'gte',
  condition_value: '0',
  message: 'Insufficient leave balance',
  is_active: true,
};

const softLeaveRule = {
  id: 'pr-002',
  name: 'Leave advance notice',
  description: 'Should submit leave 3 days in advance',
  category: 'leave',
  rule_type: 'soft',
  condition_field: 'advance_days',
  condition_op: 'gte',
  condition_value: '3',
  message: 'Leave request submitted with less than 3 days notice',
  is_active: true,
};

const hardOtRule = {
  id: 'pr-003',
  name: 'Weekly OT limit',
  description: 'Cannot exceed 36 hours per week (Thai labor law)',
  category: 'overtime',
  rule_type: 'hard',
  condition_field: 'weekly_ot_hours',
  condition_op: 'lte',
  condition_value: '36',
  message: 'Weekly overtime exceeds 36-hour legal limit',
  is_active: true,
};

const softOtRule = {
  id: 'pr-004',
  name: 'OT recommended limit',
  description: 'OT above 20 hours/week requires justification',
  category: 'overtime',
  rule_type: 'soft',
  condition_field: 'weekly_ot_hours',
  condition_op: 'lte',
  condition_value: '20',
  message: 'Weekly overtime exceeds recommended 20 hours — justification required',
  is_active: true,
};

const hardClaimRule = {
  id: 'pr-005',
  name: 'Claim amount cap',
  description: 'Single claim cannot exceed 50000 THB',
  category: 'claims',
  rule_type: 'hard',
  condition_field: 'claim_amount',
  condition_op: 'lte',
  condition_value: '50000',
  message: 'Claim amount exceeds maximum of 50,000 THB',
  is_active: true,
};

const softClaimRule = {
  id: 'pr-006',
  name: 'Claim receipt warning',
  description: 'Claims above 1000 THB should have receipt',
  category: 'claims',
  rule_type: 'soft',
  condition_field: 'claim_amount_no_receipt',
  condition_op: 'lte',
  condition_value: '1000',
  message: 'Claims above 1,000 THB should include a receipt',
  is_active: true,
};

describe('PolicyValidationService', () => {
  let service: PolicyValidationService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolicyValidationService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<PolicyValidationService>(PolicyValidationService);
  });

  // ── Leave Validation ─────────────────────────────────────────

  describe('validateLeave', () => {
    it('should pass when leave balance is sufficient', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardLeaveRule, softLeaveRule]);

      const result = await service.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 3,
        remaining_balance: 10,
        advance_days: 5,
      });

      expect(result.can_submit).toBe(true);
      expect(result.hard_blocks).toHaveLength(0);
      expect(result.soft_warnings).toHaveLength(0);
    });

    it('should hard-block when leave balance is insufficient', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardLeaveRule]);

      const result = await service.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 5,
        remaining_balance: 3,
        advance_days: 5,
      });

      expect(result.can_submit).toBe(false);
      expect(result.hard_blocks).toHaveLength(1);
      expect(result.hard_blocks[0].rule_name).toBe('Leave balance check');
    });

    it('should soft-warn when advance notice is insufficient', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardLeaveRule, softLeaveRule]);

      const result = await service.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 1,
        remaining_balance: 10,
        advance_days: 1,
      });

      expect(result.can_submit).toBe(true);
      expect(result.soft_warnings).toHaveLength(1);
      expect(result.soft_warnings[0].rule_name).toBe('Leave advance notice');
      expect(result.soft_warnings[0].requires_justification).toBe(true);
    });
  });

  // ── Overtime Validation ──────────────────────────────────────

  describe('validateOvertime', () => {
    it('should pass when OT is within limits', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardOtRule, softOtRule]);

      const result = await service.validateOvertime({
        employee_id: 'EMP001',
        hours: 4,
        current_weekly_hours: 10,
      });

      expect(result.can_submit).toBe(true);
      expect(result.hard_blocks).toHaveLength(0);
      expect(result.soft_warnings).toHaveLength(0);
    });

    it('should hard-block when OT exceeds 36-hour weekly limit', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardOtRule, softOtRule]);

      const result = await service.validateOvertime({
        employee_id: 'EMP001',
        hours: 8,
        current_weekly_hours: 32,
      });

      expect(result.can_submit).toBe(false);
      expect(result.hard_blocks).toHaveLength(1);
      expect(result.hard_blocks[0].message).toContain('36');
    });

    it('should soft-warn when OT exceeds recommended 20 hours', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardOtRule, softOtRule]);

      const result = await service.validateOvertime({
        employee_id: 'EMP001',
        hours: 6,
        current_weekly_hours: 18,
      });

      expect(result.can_submit).toBe(true);
      expect(result.soft_warnings).toHaveLength(1);
      expect(result.soft_warnings[0].requires_justification).toBe(true);
    });
  });

  // ── Claims Validation ────────────────────────────────────────

  describe('validateClaim', () => {
    it('should pass when claim is within cap', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardClaimRule, softClaimRule]);

      const result = await service.validateClaim({
        employee_id: 'EMP001',
        claim_type: 'medical',
        amount: 500,
        has_receipt: true,
      });

      expect(result.can_submit).toBe(true);
      expect(result.hard_blocks).toHaveLength(0);
      expect(result.soft_warnings).toHaveLength(0);
    });

    it('should hard-block when claim exceeds cap', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardClaimRule]);

      const result = await service.validateClaim({
        employee_id: 'EMP001',
        claim_type: 'medical',
        amount: 60000,
        has_receipt: true,
      });

      expect(result.can_submit).toBe(false);
      expect(result.hard_blocks).toHaveLength(1);
      expect(result.hard_blocks[0].message).toContain('50,000');
    });

    it('should soft-warn when claim above threshold has no receipt', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardClaimRule, softClaimRule]);

      const result = await service.validateClaim({
        employee_id: 'EMP001',
        claim_type: 'transport',
        amount: 2000,
        has_receipt: false,
      });

      expect(result.can_submit).toBe(true);
      expect(result.soft_warnings).toHaveLength(1);
      expect(result.soft_warnings[0].requires_justification).toBe(true);
    });
  });

  // ── Hard vs Soft rule distinction ────────────────────────────

  describe('hard vs soft rule distinction', () => {
    it('hard rule violation should block submission', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardOtRule]);

      const result = await service.validateOvertime({
        employee_id: 'EMP001',
        hours: 10,
        current_weekly_hours: 34,
      });

      expect(result.can_submit).toBe(false);
      expect(result.hard_blocks[0].is_blocking).toBe(true);
    });

    it('soft rule violation should allow submission with justification', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([softOtRule]);

      const result = await service.validateOvertime({
        employee_id: 'EMP001',
        hours: 6,
        current_weekly_hours: 18,
      });

      expect(result.can_submit).toBe(true);
      expect(result.soft_warnings[0].is_blocking).toBe(false);
      expect(result.soft_warnings[0].requires_justification).toBe(true);
    });
  });

  // ── PolicyRule CRUD (HR Manager only) ────────────────────────

  describe('PolicyRule CRUD', () => {
    it('should allow HR Manager to create policy rule', async () => {
      const newRule = { ...hardLeaveRule, id: 'pr-new' };
      mockPrisma.policyRule.create.mockResolvedValue(newRule);

      const result = await service.createRule({
        name: 'Leave balance check',
        category: 'leave',
        rule_type: 'hard',
        condition_field: 'leave_balance',
        condition_op: 'gte',
        condition_value: '0',
        message: 'Insufficient leave balance',
      }, hrManagerUser);

      expect(result.name).toBe('Leave balance check');
    });

    it('should reject non-HR-Manager creating rules', async () => {
      await expect(
        service.createRule({ name: 'Test', category: 'leave', rule_type: 'hard', condition_field: 'x', condition_op: 'gte', condition_value: '0' }, employeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject non-HR-Manager creating rules (manager)', async () => {
      await expect(
        service.createRule({ name: 'Test', category: 'leave', rule_type: 'hard', condition_field: 'x', condition_op: 'gte', condition_value: '0' }, managerUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should list active policy rules', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardLeaveRule, softLeaveRule]);

      const result = await service.listRules();

      expect(result).toHaveLength(2);
    });

    it('should list rules filtered by category', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([hardOtRule, softOtRule]);

      const result = await service.listRules('overtime');

      expect(result).toHaveLength(2);
      expect(mockPrisma.policyRule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ category: 'overtime' }),
        }),
      );
    });

    it('should update policy rule (HR Manager)', async () => {
      mockPrisma.policyRule.findUnique.mockResolvedValue(hardOtRule);
      mockPrisma.policyRule.update.mockResolvedValue({ ...hardOtRule, condition_value: '40' });

      const result = await service.updateRule('pr-003', { condition_value: '40' }, hrManagerUser);

      expect(result.condition_value).toBe('40');
    });

    it('should throw NotFoundException for non-existent rule', async () => {
      mockPrisma.policyRule.findUnique.mockResolvedValue(null);

      await expect(
        service.updateRule('nonexist', { condition_value: '40' }, hrManagerUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should deactivate policy rule (HR Manager)', async () => {
      mockPrisma.policyRule.findUnique.mockResolvedValue(hardOtRule);
      mockPrisma.policyRule.update.mockResolvedValue({ ...hardOtRule, is_active: false });

      const result = await service.deactivateRule('pr-003', hrManagerUser);

      expect(result.is_active).toBe(false);
    });

    it('should reject deactivation by non-HR-Manager', async () => {
      await expect(
        service.deactivateRule('pr-003', employeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ── Inline warning messages ──────────────────────────────────

  describe('inline warnings', () => {
    it('should return custom message from rule', async () => {
      mockPrisma.policyRule.findMany.mockResolvedValue([softLeaveRule]);

      const result = await service.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 1,
        remaining_balance: 10,
        advance_days: 1,
      });

      expect(result.soft_warnings[0].message).toBe('Leave request submitted with less than 3 days notice');
    });
  });
});

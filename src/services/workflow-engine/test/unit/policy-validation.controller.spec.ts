import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PolicyValidationController } from '../../src/policy-validation/policy-validation.controller';
import { PolicyValidationService } from '../../src/policy-validation/policy-validation.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockService = {
  validateLeave: jest.fn(),
  validateOvertime: jest.fn(),
  validateClaim: jest.fn(),
  createRule: jest.fn(),
  listRules: jest.fn(),
  updateRule: jest.fn(),
  deactivateRule: jest.fn(),
};

const mockHrManager: CurrentUserInterface = {
  id: 'HRM001', email: 'hrm@cg.com', username: 'hrm', firstName: 'HR', lastName: 'Manager', roles: ['hr_manager'],
};
const mockEmployee: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};

describe('PolicyValidationController', () => {
  let controller: PolicyValidationController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolicyValidationController],
      providers: [{ provide: PolicyValidationService, useValue: mockService }],
    }).compile();
    controller = module.get<PolicyValidationController>(PolicyValidationController);
  });

  describe('POST /leave/validate', () => {
    it('should return validation result for leave', async () => {
      mockService.validateLeave.mockResolvedValue({
        can_submit: true,
        hard_blocks: [],
        soft_warnings: [],
      });

      const result = await controller.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 2,
        remaining_balance: 10,
        advance_days: 5,
      });

      expect(result.can_submit).toBe(true);
    });

    it('should return hard blocks when balance insufficient', async () => {
      mockService.validateLeave.mockResolvedValue({
        can_submit: false,
        hard_blocks: [{ rule_name: 'Leave balance check', is_blocking: true, message: 'Insufficient' }],
        soft_warnings: [],
      });

      const result = await controller.validateLeave({
        employee_id: 'EMP001',
        leave_type: 'annual',
        days: 20,
        remaining_balance: 5,
        advance_days: 5,
      });

      expect(result.can_submit).toBe(false);
      expect(result.hard_blocks).toHaveLength(1);
    });
  });

  describe('POST /overtime/validate', () => {
    it('should return validation result for OT', async () => {
      mockService.validateOvertime.mockResolvedValue({
        can_submit: true,
        hard_blocks: [],
        soft_warnings: [],
      });

      const result = await controller.validateOvertime({
        employee_id: 'EMP001',
        hours: 4,
        current_weekly_hours: 10,
      });

      expect(result.can_submit).toBe(true);
    });
  });

  describe('POST /benefits/claims/validate', () => {
    it('should return validation result for claim', async () => {
      mockService.validateClaim.mockResolvedValue({
        can_submit: true,
        hard_blocks: [],
        soft_warnings: [],
      });

      const result = await controller.validateClaim({
        employee_id: 'EMP001',
        claim_type: 'medical',
        amount: 500,
        has_receipt: true,
      });

      expect(result.can_submit).toBe(true);
    });
  });

  describe('Policy Rule CRUD endpoints', () => {
    it('POST /policy-rules should create a rule', async () => {
      mockService.createRule.mockResolvedValue({ id: 'pr-new', name: 'Test Rule' });

      const result = await controller.createRule(
        { name: 'Test Rule', category: 'leave', rule_type: 'hard', condition_field: 'x', condition_op: 'gte', condition_value: '0' },
        mockHrManager,
      );

      expect(result.name).toBe('Test Rule');
    });

    it('GET /policy-rules should list rules', async () => {
      mockService.listRules.mockResolvedValue([{ id: 'pr-001' }, { id: 'pr-002' }]);

      const result = await controller.listRules();

      expect(result).toHaveLength(2);
    });

    it('GET /policy-rules?category=leave should filter', async () => {
      mockService.listRules.mockResolvedValue([{ id: 'pr-001' }]);

      const result = await controller.listRules('leave');

      expect(result).toHaveLength(1);
      expect(mockService.listRules).toHaveBeenCalledWith('leave');
    });

    it('PATCH /policy-rules/:id should update a rule', async () => {
      mockService.updateRule.mockResolvedValue({ id: 'pr-001', condition_value: '5' });

      const result = await controller.updateRule('pr-001', { condition_value: '5' }, mockHrManager);

      expect(result.condition_value).toBe('5');
    });

    it('DELETE /policy-rules/:id should deactivate a rule', async () => {
      mockService.deactivateRule.mockResolvedValue({ id: 'pr-001', is_active: false });

      const result = await controller.deactivateRule('pr-001', mockHrManager);

      expect(result.is_active).toBe(false);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { WorkflowService } from '../../src/workflow/workflow.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  workflow: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  workflowStep: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
  approvalAction: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  delegation: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
  $transaction: jest.fn((fn) => fn(mockPrismaService)),
};

// ── User Fixtures ──────────────────────────────────────────────

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'chongrak.t@centralgroup.com',
  username: 'chongrak.t',
  firstName: 'Chongrak',
  lastName: 'Tanaka',
  roles: ['employee'],
};

const mockManager: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Rungrote',
  lastName: 'Amnuaysopon',
  roles: ['manager'],
};

const mockHrAdmin: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockHrManager: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockFinanceDirector: CurrentUserInterface = {
  id: 'FIN001',
  email: 'finance@centralgroup.com',
  username: 'finance.director',
  firstName: 'Finance',
  lastName: 'Director',
  roles: ['finance_director'],
};

// ── Mock Data ──────────────────────────────────────────────────

const mockWorkflowRecord = {
  id: 'WF-001',
  change_type: 'personal_info_change',
  status: 'pending',
  requested_by: 'EMP001',
  requester_name: 'Chongrak Tanaka',
  effective_date: new Date('2026-03-01'),
  current_step: 1,
  total_steps: 2,
  section: 'personalInfo',
  old_values: JSON.stringify({ first_name_en: 'Chongrak' }),
  new_values: JSON.stringify({ first_name_en: 'Updated' }),
  created_at: new Date('2026-02-20'),
  updated_at: new Date('2026-02-20'),
  completed_at: null,
  steps: [
    {
      id: 'WFS-001',
      workflow_id: 'WF-001',
      step_number: 1,
      role: 'manager',
      role_name: 'Manager',
      approver_id: 'MGR001',
      approver_name: 'Rungrote Amnuaysopon',
      status: 'pending',
      action_date: null,
      comments: null,
    },
    {
      id: 'WFS-002',
      workflow_id: 'WF-001',
      step_number: 2,
      role: 'hr_admin',
      role_name: 'HR Admin',
      approver_id: 'HR001',
      approver_name: 'HR Administrator',
      status: 'pending',
      action_date: null,
      comments: null,
    },
  ],
};

describe('WorkflowService', () => {
  let service: WorkflowService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkflowService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
    prisma = mockPrismaService;
  });

  // ── Workflow Creation ──────────────────────────────────────────

  describe('createWorkflow', () => {
    const createDto = {
      change_type: 'personal_info_change',
      section: 'personalInfo',
      effective_date: '2026-03-01',
      old_values: { first_name_en: 'Chongrak' },
      new_values: { first_name_en: 'Updated' },
    };

    it('should create a workflow with correct change type and status pending', async () => {
      prisma.workflow.create.mockResolvedValue(mockWorkflowRecord);

      const result = await service.createWorkflow(createDto, mockEmployee);

      expect(result).toBeDefined();
      expect(result.change_type).toBe('personal_info_change');
      expect(result.status).toBe('pending');
      expect(result.requested_by).toBe('EMP001');
    });

    it('should determine correct approval levels for self-service changes (0 levels)', async () => {
      const selfServiceDto = {
        change_type: 'contact_info_personal_email',
        section: 'contactInfo',
        effective_date: '2026-03-01',
        old_values: { email: 'old@example.com' },
        new_values: { email: 'new@example.com' },
      };

      const selfServiceResult = {
        ...mockWorkflowRecord,
        id: 'WF-SS-001',
        change_type: 'contact_info_personal_email',
        status: 'auto_approved',
        total_steps: 0,
        steps: [],
      };
      prisma.workflow.create.mockResolvedValue(selfServiceResult);

      const result = await service.createWorkflow(selfServiceDto, mockEmployee);

      expect(result.status).toBe('auto_approved');
      expect(result.total_steps).toBe(0);
    });

    it('should determine correct approval levels for single-level approval (1 level: Manager)', async () => {
      const managerOnlyDto = {
        change_type: 'personal_info_nickname',
        section: 'personalInfo',
        effective_date: '2026-03-01',
        old_values: { nickname: 'Chong' },
        new_values: { nickname: 'CK' },
      };

      const singleLevelResult = {
        ...mockWorkflowRecord,
        id: 'WF-SL-001',
        change_type: 'personal_info_nickname',
        total_steps: 1,
        steps: [mockWorkflowRecord.steps[0]],
      };
      prisma.workflow.create.mockResolvedValue(singleLevelResult);

      const result = await service.createWorkflow(managerOnlyDto, mockEmployee);

      expect(result.total_steps).toBe(1);
    });

    it('should determine correct approval levels for two-level approval (Manager + HR Admin)', async () => {
      prisma.workflow.create.mockResolvedValue(mockWorkflowRecord);

      const result = await service.createWorkflow(createDto, mockEmployee);

      expect(result.total_steps).toBe(2);
      expect(result.steps).toHaveLength(2);
      expect(result.steps[0].role).toBe('manager');
      expect(result.steps[1].role).toBe('hr_admin');
    });

    it('should determine correct approval levels for three-level approval (Manager + HR Admin + HR Manager)', async () => {
      const bankChangeDto = {
        change_type: 'bank_account_change',
        section: 'bankAccount',
        effective_date: '2026-03-01',
        old_values: { account: '***1234' },
        new_values: { account: '***5678' },
      };

      const threeLevelResult = {
        ...mockWorkflowRecord,
        id: 'WF-TL-001',
        change_type: 'bank_account_change',
        total_steps: 3,
        steps: [
          { ...mockWorkflowRecord.steps[0], step_number: 1 },
          { ...mockWorkflowRecord.steps[1], step_number: 2 },
          {
            id: 'WFS-003',
            workflow_id: 'WF-TL-001',
            step_number: 3,
            role: 'hr_manager',
            role_name: 'HR Manager',
            approver_id: 'HRM001',
            approver_name: 'HR Manager',
            status: 'pending',
          },
        ],
      };
      prisma.workflow.create.mockResolvedValue(threeLevelResult);

      const result = await service.createWorkflow(bankChangeDto, mockEmployee);

      expect(result.total_steps).toBe(3);
      expect(result.steps).toHaveLength(3);
      expect(result.steps[2].role).toBe('hr_manager');
    });

    it('should reject duplicate pending workflow of the same change type for same employee', async () => {
      prisma.workflow.findMany.mockResolvedValue([mockWorkflowRecord]);

      await expect(
        service.createWorkflow(createDto, mockEmployee),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create workflow steps for each approval level', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.workflow.create.mockResolvedValue(mockWorkflowRecord);

      const result = await service.createWorkflow(createDto, mockEmployee);

      expect(result.steps).toBeDefined();
      expect(result.steps.length).toBeGreaterThan(0);
      result.steps.forEach((step, i) => {
        expect(step.step_number).toBe(i + 1);
        expect(step.status).toBe('pending');
      });
    });

    it('should create audit log entry for workflow creation', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.workflow.create.mockResolvedValue(mockWorkflowRecord);

      await service.createWorkflow(createDto, mockEmployee);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'workflow',
            action: 'create',
            performed_by: 'EMP001',
          }),
        }),
      );
    });
  });

  // ── Multi-Level Approval Routing ──────────────────────────────

  describe('approveStep', () => {
    it('should approve current step and advance to next step', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'approved',
        action_date: new Date(),
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        current_step: 2,
      });

      const result = await service.approveStep('WF-001', { comments: 'Looks good' }, mockManager);

      expect(result).toBeDefined();
      expect(result.current_step).toBe(2);
      expect(prisma.workflowStep.update).toHaveBeenCalled();
    });

    it('should fully approve workflow when last step is approved', async () => {
      const lastStepWorkflow = {
        ...structuredClone(mockWorkflowRecord),
        current_step: 2,
        steps: [
          { ...mockWorkflowRecord.steps[0], status: 'approved' },
          { ...mockWorkflowRecord.steps[1] },
        ],
      };
      prisma.workflow.findUnique.mockResolvedValue(lastStepWorkflow);
      prisma.workflowStep.update.mockResolvedValue({
        ...lastStepWorkflow.steps[1],
        status: 'approved',
      });
      prisma.workflow.update.mockResolvedValue({
        ...lastStepWorkflow,
        status: 'approved',
        completed_at: new Date(),
      });

      const result = await service.approveStep('WF-001', { comments: 'Final approval' }, mockHrAdmin);

      expect(result.status).toBe('approved');
      expect(result.completed_at).toBeDefined();
    });

    it('should reject approval from unauthorized user', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));

      // Employee trying to approve their own request
      await expect(
        service.approveStep('WF-001', {}, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject approval if user is not the current step approver', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));

      // HR Admin trying to approve step 1 which belongs to Manager
      await expect(
        service.approveStep('WF-001', {}, mockHrAdmin),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent workflow', async () => {
      prisma.workflow.findUnique.mockResolvedValue(null);

      await expect(
        service.approveStep('WF-NONEXIST', {}, mockManager),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create audit log for approval action', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'approved',
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        current_step: 2,
      });

      await service.approveStep('WF-001', { comments: 'Approved' }, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'workflow',
            entity_id: 'WF-001',
            action: 'approve_step',
            performed_by: 'MGR001',
          }),
        }),
      );
    });

    it('should record approval action with timestamp and comments', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'approved',
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        current_step: 2,
      });

      await service.approveStep('WF-001', { comments: 'Looks good' }, mockManager);

      expect(prisma.approvalAction.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            workflow_id: 'WF-001',
            step_number: 1,
            action: 'approve',
            performed_by: 'MGR001',
            comments: 'Looks good',
          }),
        }),
      );
    });
  });

  // ── Rejection ─────────────────────────────────────────────────

  describe('rejectStep', () => {
    it('should reject workflow and set status to rejected', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'rejected',
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        status: 'rejected',
      });

      const result = await service.rejectStep(
        'WF-001',
        { reason: 'Information incorrect' },
        mockManager,
      );

      expect(result.status).toBe('rejected');
    });

    it('should require rejection reason', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));

      await expect(
        service.rejectStep('WF-001', { reason: '' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create audit log for rejection', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'rejected',
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        status: 'rejected',
      });

      await service.rejectStep('WF-001', { reason: 'Incorrect data' }, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'reject_step',
            performed_by: 'MGR001',
          }),
        }),
      );
    });
  });

  // ── Send Back ─────────────────────────────────────────────────

  describe('sendBack', () => {
    it('should send back workflow and set status to sent_back', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        status: 'sent_back',
      });

      const result = await service.sendBack(
        'WF-001',
        { reason: 'Please update details' },
        mockManager,
      );

      expect(result.status).toBe('sent_back');
    });

    it('should allow resubmission after send back', async () => {
      const sentBackWorkflow = {
        ...structuredClone(mockWorkflowRecord),
        status: 'sent_back',
      };
      prisma.workflow.findUnique.mockResolvedValue(sentBackWorkflow);
      prisma.workflow.update.mockResolvedValue({
        ...sentBackWorkflow,
        status: 'pending',
        current_step: 1,
        new_values: JSON.stringify({ first_name_en: 'Corrected' }),
      });

      const result = await service.resubmit(
        'WF-001',
        { new_values: { first_name_en: 'Corrected' } },
        mockEmployee,
      );

      expect(result.status).toBe('pending');
      expect(result.current_step).toBe(1);
    });

    it('should reject resubmission if workflow is not in sent_back status', async () => {
      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));

      await expect(
        service.resubmit('WF-001', { new_values: {} }, mockEmployee),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ── Delegation ────────────────────────────────────────────────

  describe('delegation', () => {
    it('should create delegation from one approver to another', async () => {
      const delegationData = {
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: '2026-03-01',
        end_date: '2026-03-15',
        change_types: ['personal_info_change', 'address_change'],
      };

      const createdDelegation = {
        id: 'DEL-001',
        ...delegationData,
        status: 'active',
        created_at: new Date(),
      };
      prisma.delegation.create.mockResolvedValue(createdDelegation);

      const result = await service.createDelegation(delegationData, mockManager);

      expect(result).toBeDefined();
      expect(result.id).toBe('DEL-001');
      expect(result.delegator_id).toBe('MGR001');
      expect(result.delegate_id).toBe('MGR002');
      expect(result.status).toBe('active');
    });

    it('should allow delegate to approve on behalf of delegator', async () => {
      const delegateUser: CurrentUserInterface = {
        id: 'MGR002',
        email: 'delegate@centralgroup.com',
        username: 'delegate.mgr',
        firstName: 'Delegate',
        lastName: 'Manager',
        roles: ['manager'],
      };

      const activeDelegation = {
        id: 'DEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: new Date('2026-02-01'),
        end_date: new Date('2026-03-31'),
        change_types: ['personal_info_change'],
        status: 'active',
      };

      prisma.workflow.findUnique.mockResolvedValue(structuredClone(mockWorkflowRecord));
      prisma.delegation.findFirst.mockResolvedValue(activeDelegation);
      prisma.workflowStep.update.mockResolvedValue({
        ...mockWorkflowRecord.steps[0],
        status: 'approved',
      });
      prisma.workflow.update.mockResolvedValue({
        ...mockWorkflowRecord,
        current_step: 2,
      });

      const result = await service.approveStep('WF-001', { comments: 'Approved by delegate' }, delegateUser);

      expect(result).toBeDefined();
      expect(result.current_step).toBe(2);
    });

    it('should reject delegation if delegate does not have appropriate role', async () => {
      const delegationData = {
        delegator_id: 'MGR001',
        delegate_id: 'EMP001', // Regular employee cannot be delegate for manager approvals
        start_date: '2026-03-01',
        end_date: '2026-03-15',
        change_types: ['personal_info_change'],
      };

      // Mock: delegation create fails for invalid delegate (DB constraint / role check)
      prisma.delegation.create.mockRejectedValue(
        new BadRequestException('Delegate does not have appropriate role for approval delegation'),
      );

      await expect(
        service.createDelegation(delegationData, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should not allow delegation with end_date before start_date', async () => {
      const invalidDelegation = {
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: '2026-03-15',
        end_date: '2026-03-01', // end before start
        change_types: ['personal_info_change'],
      };

      await expect(
        service.createDelegation(invalidDelegation, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create audit log for delegation creation', async () => {
      const delegationData = {
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: '2026-03-01',
        end_date: '2026-03-15',
        change_types: ['personal_info_change'],
      };

      prisma.delegation.create.mockResolvedValue({
        id: 'DEL-001',
        ...delegationData,
        status: 'active',
      });

      await service.createDelegation(delegationData, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'delegation',
            action: 'create',
            performed_by: 'MGR001',
          }),
        }),
      );
    });
  });

  // ── Bulk Approval ─────────────────────────────────────────────

  describe('bulkApprove', () => {
    it('should approve multiple workflows at once', async () => {
      const workflows = [
        structuredClone(mockWorkflowRecord),
        {
          ...structuredClone(mockWorkflowRecord),
          id: 'WF-002',
          change_type: 'address_change',
        },
      ];

      prisma.workflow.findUnique
        .mockResolvedValueOnce(workflows[0])
        .mockResolvedValueOnce(workflows[1]);

      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update
        .mockResolvedValueOnce({ ...workflows[0], current_step: 2 })
        .mockResolvedValueOnce({ ...workflows[1], current_step: 2 });

      const result = await service.bulkApprove(
        ['WF-001', 'WF-002'],
        { comments: 'Bulk approved' },
        mockManager,
      );

      expect(result).toBeDefined();
      expect(result.succeeded).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should return partial results when some approvals fail', async () => {
      prisma.workflow.findUnique
        .mockResolvedValueOnce(structuredClone(mockWorkflowRecord))
        .mockResolvedValueOnce(null); // second workflow not found

      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ ...mockWorkflowRecord, current_step: 2 });

      const result = await service.bulkApprove(
        ['WF-001', 'WF-NONEXIST'],
        { comments: 'Bulk' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
      expect(result.failed[0].id).toBe('WF-NONEXIST');
      expect(result.failed[0].reason).toBeDefined();
    });

    it('should create audit log for each bulk approval', async () => {
      const workflows = [
        structuredClone(mockWorkflowRecord),
        {
          ...structuredClone(mockWorkflowRecord),
          id: 'WF-002',
        },
      ];

      prisma.workflow.findUnique
        .mockResolvedValueOnce(workflows[0])
        .mockResolvedValueOnce(workflows[1]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ current_step: 2 });

      await service.bulkApprove(['WF-001', 'WF-002'], { comments: 'OK' }, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledTimes(2);
    });
  });

  // ── Routing by Change Type (PRD Section 7.1) ─────────────────

  describe('getApprovalRoute', () => {
    it('should auto-approve contact_info_personal_email (self-service)', () => {
      const route = service.getApprovalRoute('contact_info_personal_email');
      expect(route.levels).toBe(0);
      expect(route.auto_approve).toBe(true);
    });

    it('should auto-approve emergency_contact_add (self-service)', () => {
      const route = service.getApprovalRoute('emergency_contact_add');
      expect(route.levels).toBe(0);
      expect(route.auto_approve).toBe(true);
    });

    it('should route address_change through Manager only', () => {
      const route = service.getApprovalRoute('address_change');
      expect(route.levels).toBe(1);
      expect(route.approvers[0]).toBe('manager');
    });

    it('should route leave_request through Manager only', () => {
      const route = service.getApprovalRoute('leave_request');
      expect(route.levels).toBe(1);
      expect(route.approvers[0]).toBe('manager');
    });

    it('should route leave_request_extended through Manager + HR', () => {
      const route = service.getApprovalRoute('leave_request_extended');
      expect(route.levels).toBe(2);
      expect(route.approvers[0]).toBe('manager');
      expect(route.approvers[1]).toBe('hr_admin');
    });

    it('should route personal_info_change through Manager + HR Admin', () => {
      const route = service.getApprovalRoute('personal_info_change');
      expect(route.levels).toBe(2);
      expect(route.approvers[0]).toBe('manager');
      expect(route.approvers[1]).toBe('hr_admin');
    });

    it('should route bank_account_change through Manager + HR Admin + HR Manager', () => {
      const route = service.getApprovalRoute('bank_account_change');
      expect(route.levels).toBe(3);
      expect(route.approvers[0]).toBe('manager');
      expect(route.approvers[1]).toBe('hr_admin');
      expect(route.approvers[2]).toBe('hr_manager');
    });

    it('should route compensation_change through HR Manager + Finance Director', () => {
      const route = service.getApprovalRoute('compensation_change');
      expect(route.levels).toBe(3);
      expect(route.approvers).toContain('hr_manager');
    });

    it('should route transfer_internal through Current Manager + Target Manager + HR', () => {
      const route = service.getApprovalRoute('transfer_internal');
      expect(route.levels).toBe(3);
      expect(route.approvers).toContain('current_manager');
      expect(route.approvers).toContain('target_manager');
      expect(route.approvers).toContain('hr_admin');
    });

    it('should route transfer_intercompany through 4 levels including HR Source + HR Dest', () => {
      const route = service.getApprovalRoute('transfer_intercompany');
      expect(route.levels).toBe(4);
      expect(route.approvers).toContain('current_manager');
      expect(route.approvers).toContain('target_manager');
      expect(route.approvers).toContain('hr_source');
      expect(route.approvers).toContain('hr_target');
    });
  });

  // ── Query Workflows ───────────────────────────────────────────

  describe('findById', () => {
    it('should return workflow with steps for valid ID', async () => {
      prisma.workflow.findUnique.mockResolvedValue(mockWorkflowRecord);

      const result = await service.findById('WF-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('WF-001');
      expect(result.steps).toHaveLength(2);
    });

    it('should throw NotFoundException for non-existent workflow', async () => {
      prisma.workflow.findUnique.mockResolvedValue(null);

      await expect(service.findById('WF-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPendingForUser', () => {
    it('should return workflows pending approval by the current user', async () => {
      const pendingWorkflows = [mockWorkflowRecord];
      prisma.workflow.findMany.mockResolvedValue(pendingWorkflows);

      const result = await service.getPendingForUser(mockManager);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('WF-001');
    });

    it('should return empty array if no pending workflows', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);

      const result = await service.getPendingForUser(mockManager);

      expect(result).toHaveLength(0);
    });

    it('should include delegated approvals in pending list', async () => {
      const delegation = {
        id: 'DEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: new Date('2026-02-01'),
        end_date: new Date('2026-03-31'),
        status: 'active',
      };
      prisma.delegation.findMany.mockResolvedValue([delegation]);
      prisma.workflow.findMany.mockResolvedValue([mockWorkflowRecord]);

      const delegateUser: CurrentUserInterface = {
        id: 'MGR002',
        email: 'delegate@centralgroup.com',
        username: 'delegate.mgr',
        firstName: 'Delegate',
        lastName: 'Manager',
        roles: ['manager'],
      };

      const result = await service.getPendingForUser(delegateUser);

      expect(result).toBeDefined();
    });
  });

  describe('getMyRequests', () => {
    it('should return workflows submitted by the current user', async () => {
      prisma.workflow.findMany.mockResolvedValue([mockWorkflowRecord]);

      const result = await service.getMyRequests(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].requested_by).toBe('EMP001');
    });
  });

  // ── Audit Trail (F5.7) ───────────────────────────────────────

  describe('getAuditTrail', () => {
    it('should return complete audit trail for a workflow', async () => {
      const auditEntries = [
        {
          id: 'AUD-001',
          entity_type: 'workflow',
          entity_id: 'WF-001',
          action: 'create',
          performed_by: 'EMP001',
          performed_at: new Date('2026-02-20T10:00:00Z'),
          details: JSON.stringify({ change_type: 'personal_info_change' }),
        },
        {
          id: 'AUD-002',
          entity_type: 'workflow',
          entity_id: 'WF-001',
          action: 'approve_step',
          performed_by: 'MGR001',
          performed_at: new Date('2026-02-20T11:00:00Z'),
          details: JSON.stringify({ step: 1, comments: 'Approved' }),
        },
      ];
      prisma.approvalAction.findMany.mockResolvedValue(auditEntries);

      const result = await service.getAuditTrail('WF-001');

      expect(result).toHaveLength(2);
      expect(result[0].action).toBe('create');
      expect(result[1].action).toBe('approve_step');
    });

    it('should return audit entries in chronological order', async () => {
      const auditEntries = [
        {
          id: 'AUD-001',
          performed_at: new Date('2026-02-20T10:00:00Z'),
          action: 'create',
        },
        {
          id: 'AUD-002',
          performed_at: new Date('2026-02-20T11:00:00Z'),
          action: 'approve_step',
        },
        {
          id: 'AUD-003',
          performed_at: new Date('2026-02-20T12:00:00Z'),
          action: 'approve_step',
        },
      ];
      prisma.approvalAction.findMany.mockResolvedValue(auditEntries);

      const result = await service.getAuditTrail('WF-001');

      for (let i = 1; i < result.length; i++) {
        expect(new Date(result[i].performed_at).getTime()).toBeGreaterThanOrEqual(
          new Date(result[i - 1].performed_at).getTime(),
        );
      }
    });
  });

  // ── Quick Approve Hub (F8) ─────────────────────────────────────

  describe('bulkReject', () => {
    it('should reject multiple workflows at once', async () => {
      const workflows = [
        structuredClone(mockWorkflowRecord),
        {
          ...structuredClone(mockWorkflowRecord),
          id: 'WF-002',
          change_type: 'address_change',
        },
      ];

      prisma.workflow.findUnique
        .mockResolvedValueOnce(workflows[0])
        .mockResolvedValueOnce(workflows[1]);

      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update
        .mockResolvedValueOnce({ ...workflows[0], status: 'rejected' })
        .mockResolvedValueOnce({ ...workflows[1], status: 'rejected' });

      const result = await service.bulkReject(
        ['WF-001', 'WF-002'],
        { reason: 'Bulk rejected' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should return partial results when some rejections fail', async () => {
      prisma.workflow.findUnique
        .mockResolvedValueOnce(structuredClone(mockWorkflowRecord))
        .mockResolvedValueOnce(null);

      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update.mockResolvedValue({ ...mockWorkflowRecord, status: 'rejected' });

      const result = await service.bulkReject(
        ['WF-001', 'WF-NONEXIST'],
        { reason: 'Rejected' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
      expect(result.failed[0].id).toBe('WF-NONEXIST');
    });

    it('should create audit log for each bulk rejection', async () => {
      const workflows = [
        structuredClone(mockWorkflowRecord),
        { ...structuredClone(mockWorkflowRecord), id: 'WF-002' },
      ];

      prisma.workflow.findUnique
        .mockResolvedValueOnce(workflows[0])
        .mockResolvedValueOnce(workflows[1]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update.mockResolvedValue({ status: 'rejected' });

      await service.bulkReject(['WF-001', 'WF-002'], { reason: 'No good' }, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledTimes(2);
    });
  });

  describe('bulk operations max limit', () => {
    it('should reject bulkApprove with more than 50 items', async () => {
      const ids = Array.from({ length: 51 }, (_, i) => `WF-${i}`);

      await expect(
        service.bulkApprove(ids, { comments: 'OK' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should accept bulkApprove with exactly 50 items', async () => {
      const ids = Array.from({ length: 50 }, (_, i) => `WF-${i}`);
      // All will fail (not found) but should not throw BadRequestException for limit
      prisma.workflow.findUnique.mockResolvedValue(null);

      const result = await service.bulkApprove(ids, { comments: 'OK' }, mockManager);

      expect(result.failed).toHaveLength(50);
    });

    it('should reject bulkReject with more than 50 items', async () => {
      const ids = Array.from({ length: 51 }, (_, i) => `WF-${i}`);

      await expect(
        service.bulkReject(ids, { reason: 'No' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getPendingForUser with filters', () => {
    const pendingWorkflows = [
      {
        ...mockWorkflowRecord,
        id: 'WF-001',
        change_type: 'personal_info_change',
        created_at: new Date('2026-02-20'),
      },
      {
        ...mockWorkflowRecord,
        id: 'WF-002',
        change_type: 'leave_request',
        created_at: new Date('2026-02-21'),
      },
      {
        ...mockWorkflowRecord,
        id: 'WF-003',
        change_type: 'bank_account_change',
        created_at: new Date('2026-02-22'),
      },
    ];

    it('should filter pending by change_type', async () => {
      prisma.workflow.findMany.mockResolvedValue([pendingWorkflows[0]]);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingForUser(mockManager, {
        change_type: 'personal_info_change',
      });

      expect(result).toHaveLength(1);
      expect(prisma.workflow.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            change_type: 'personal_info_change',
          }),
        }),
      );
    });

    it('should filter pending by urgency (criticality based on approval levels)', async () => {
      prisma.workflow.findMany.mockResolvedValue([pendingWorkflows[2]]);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingForUser(mockManager, {
        urgency: 'high',
      });

      expect(result).toBeDefined();
    });

    it('should filter pending by date range', async () => {
      prisma.workflow.findMany.mockResolvedValue([pendingWorkflows[1]]);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingForUser(mockManager, {
        date_from: '2026-02-21',
        date_to: '2026-02-21',
      });

      expect(result).toBeDefined();
      expect(prisma.workflow.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            created_at: expect.objectContaining({
              gte: expect.any(Date),
              lte: expect.any(Date),
            }),
          }),
        }),
      );
    });

    it('should combine multiple filters', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingForUser(mockManager, {
        change_type: 'leave_request',
        date_from: '2026-02-21',
      });

      expect(result).toBeDefined();
      expect(prisma.workflow.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            change_type: 'leave_request',
            created_at: expect.objectContaining({
              gte: expect.any(Date),
            }),
          }),
        }),
      );
    });
  });

  describe('getWorkflowPreview (slide-over)', () => {
    it('should return workflow with steps and audit trail for preview', async () => {
      prisma.workflow.findUnique.mockResolvedValue(mockWorkflowRecord);
      prisma.approvalAction.findMany.mockResolvedValue([
        { id: 'AUD-001', action: 'create', performed_by: 'EMP001' },
      ]);

      const result = await service.getWorkflowPreview('WF-001');

      expect(result.workflow).toBeDefined();
      expect(result.workflow.id).toBe('WF-001');
      expect(result.audit_trail).toBeDefined();
      expect(result.audit_trail).toHaveLength(1);
    });

    it('should throw NotFoundException for non-existent workflow', async () => {
      prisma.workflow.findUnique.mockResolvedValue(null);

      await expect(service.getWorkflowPreview('WF-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });
});

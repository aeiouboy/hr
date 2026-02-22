import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { WorkflowController } from '../../src/workflow/workflow.controller';
import { WorkflowService } from '../../src/workflow/workflow.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockWorkflowService = {
  createWorkflow: jest.fn(),
  findById: jest.fn(),
  approveStep: jest.fn(),
  rejectStep: jest.fn(),
  sendBack: jest.fn(),
  resubmit: jest.fn(),
  bulkApprove: jest.fn(),
  bulkReject: jest.fn(),
  getPendingForUser: jest.fn(),
  getMyRequests: jest.fn(),
  getAuditTrail: jest.fn(),
  createDelegation: jest.fn(),
  listDelegations: jest.fn(),
  revokeDelegation: jest.fn(),
  getApprovalRoute: jest.fn(),
  getWorkflowPreview: jest.fn(),
};

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

const mockWorkflowData = {
  id: 'WF-001',
  change_type: 'personal_info_change',
  status: 'pending',
  requested_by: 'EMP001',
  current_step: 1,
  total_steps: 2,
  steps: [
    { step_number: 1, role: 'manager', status: 'pending', approver_id: 'MGR001' },
    { step_number: 2, role: 'hr_admin', status: 'pending', approver_id: 'HR001' },
  ],
};

describe('WorkflowController', () => {
  let controller: WorkflowController;
  let service: typeof mockWorkflowService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowController],
      providers: [
        { provide: WorkflowService, useValue: mockWorkflowService },
      ],
    }).compile();

    controller = module.get<WorkflowController>(WorkflowController);
    service = mockWorkflowService;
  });

  describe('POST /api/v1/workflows', () => {
    const createDto = {
      change_type: 'personal_info_change',
      section: 'personalInfo',
      effective_date: '2026-03-01',
      old_values: { first_name_en: 'Chongrak' },
      new_values: { first_name_en: 'Updated' },
    };

    it('should return 201 when creating a new workflow', async () => {
      service.createWorkflow.mockResolvedValue(mockWorkflowData);

      const result = await controller.create(createDto, mockEmployee);

      expect(result).toBeDefined();
      expect(result.id).toBe('WF-001');
      expect(result.status).toBe('pending');
      expect(service.createWorkflow).toHaveBeenCalledWith(createDto, mockEmployee);
    });

    it('should return 400 for missing required fields', async () => {
      service.createWorkflow.mockRejectedValue(
        new BadRequestException('change_type is required'),
      );

      await expect(controller.create({} as any, mockEmployee)).rejects.toThrow(BadRequestException);
    });

    it('should return 400 for duplicate pending workflow', async () => {
      service.createWorkflow.mockRejectedValue(
        new BadRequestException('Duplicate pending workflow'),
      );

      await expect(controller.create(createDto, mockEmployee)).rejects.toThrow(BadRequestException);
    });
  });

  describe('GET /api/v1/workflows/:id', () => {
    it('should return 200 with workflow details', async () => {
      service.findById.mockResolvedValue(mockWorkflowData);

      const result = await controller.findById('WF-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('WF-001');
      expect(result.steps).toHaveLength(2);
    });

    it('should return 404 for non-existent workflow', async () => {
      service.findById.mockRejectedValue(new NotFoundException('Workflow not found'));

      await expect(controller.findById('WF-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/workflows/:id/approve', () => {
    it('should return 200 when step is approved', async () => {
      service.approveStep.mockResolvedValue({ ...mockWorkflowData, current_step: 2 });

      const result = await controller.approve('WF-001', { comments: 'OK' }, mockManager);

      expect(result).toBeDefined();
      expect(result.current_step).toBe(2);
    });

    it('should return 403 when unauthorized user tries to approve', async () => {
      service.approveStep.mockRejectedValue(new ForbiddenException('Not authorized'));

      await expect(
        controller.approve('WF-001', {}, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should return 404 for non-existent workflow', async () => {
      service.approveStep.mockRejectedValue(new NotFoundException());

      await expect(
        controller.approve('WF-NONEXIST', {}, mockManager),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/workflows/:id/reject', () => {
    it('should return 200 when workflow is rejected', async () => {
      service.rejectStep.mockResolvedValue({ ...mockWorkflowData, status: 'rejected' });

      const result = await controller.reject('WF-001', { reason: 'Incorrect data' }, mockManager);

      expect(result.status).toBe('rejected');
    });

    it('should return 400 when reason is missing', async () => {
      service.rejectStep.mockRejectedValue(new BadRequestException('Reason is required'));

      await expect(
        controller.reject('WF-001', { reason: '' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('POST /api/v1/workflows/:id/send-back', () => {
    it('should return 200 when workflow is sent back', async () => {
      service.sendBack.mockResolvedValue({ ...mockWorkflowData, status: 'sent_back' });

      const result = await controller.sendBack('WF-001', { reason: 'Need more info' }, mockManager);

      expect(result.status).toBe('sent_back');
    });
  });

  describe('POST /api/v1/workflows/:id/resubmit', () => {
    it('should return 200 when workflow is resubmitted', async () => {
      service.resubmit.mockResolvedValue({ ...mockWorkflowData, status: 'pending', current_step: 1 });

      const result = await controller.resubmit(
        'WF-001',
        { new_values: { first_name_en: 'Corrected' } },
        mockEmployee,
      );

      expect(result.status).toBe('pending');
      expect(result.current_step).toBe(1);
    });

    it('should return 400 if workflow is not in sent_back status', async () => {
      service.resubmit.mockRejectedValue(new BadRequestException('Cannot resubmit'));

      await expect(
        controller.resubmit('WF-001', { new_values: {} }, mockEmployee),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('POST /api/v1/workflows/bulk-approve', () => {
    it('should return 200 with success/failure counts', async () => {
      service.bulkApprove.mockResolvedValue({
        succeeded: [{ id: 'WF-001' }, { id: 'WF-002' }],
        failed: [],
      });

      const result = await controller.bulkApprove(
        { workflow_ids: ['WF-001', 'WF-002'], comments: 'Bulk approved' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should return partial results', async () => {
      service.bulkApprove.mockResolvedValue({
        succeeded: [{ id: 'WF-001' }],
        failed: [{ id: 'WF-999', reason: 'Not found' }],
      });

      const result = await controller.bulkApprove(
        { workflow_ids: ['WF-001', 'WF-999'], comments: 'Bulk' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
    });
  });

  describe('GET /api/v1/workflows/pending', () => {
    it('should return pending workflows for current user', async () => {
      service.getPendingForUser.mockResolvedValue([mockWorkflowData]);

      const result = await controller.getPending(mockManager);

      expect(result).toHaveLength(1);
    });
  });

  describe('GET /api/v1/workflows/my-requests', () => {
    it('should return workflows submitted by current user', async () => {
      service.getMyRequests.mockResolvedValue([mockWorkflowData]);

      const result = await controller.getMyRequests(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].requested_by).toBe('EMP001');
    });
  });

  describe('GET /api/v1/workflows/:id/audit-trail', () => {
    it('should return audit trail for workflow', async () => {
      service.getAuditTrail.mockResolvedValue([
        { action: 'create', performed_by: 'EMP001' },
        { action: 'approve_step', performed_by: 'MGR001' },
      ]);

      const result = await controller.getAuditTrail('WF-001');

      expect(result).toHaveLength(2);
    });

    it('should return 404 if workflow not found', async () => {
      service.getAuditTrail.mockRejectedValue(new NotFoundException());

      await expect(controller.getAuditTrail('WF-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/workflows/delegations', () => {
    it('should return 201 when creating delegation', async () => {
      const delegationDto = {
        delegate_id: 'MGR002',
        start_date: '2026-03-01',
        end_date: '2026-03-15',
        change_types: ['personal_info_change'],
      };

      service.createDelegation.mockResolvedValue({
        id: 'DEL-001',
        delegator_id: 'MGR001',
        ...delegationDto,
        status: 'active',
      });

      const result = await controller.createDelegation(delegationDto, mockManager);

      expect(result).toBeDefined();
      expect(result.id).toBe('DEL-001');
    });
  });

  describe('GET /api/v1/workflows/delegations', () => {
    it('should return delegations for current user', async () => {
      service.listDelegations.mockResolvedValue([
        { id: 'DEL-001', delegator_id: 'MGR001', delegate_id: 'MGR002', status: 'active' },
      ]);

      const result = await controller.listDelegations(mockManager);

      expect(result).toHaveLength(1);
    });
  });

  describe('DELETE /api/v1/workflows/delegations/:id', () => {
    it('should return 200 when revoking delegation', async () => {
      service.revokeDelegation.mockResolvedValue({ success: true });

      const result = await controller.revokeDelegation('DEL-001', mockManager);

      expect(result.success).toBe(true);
    });
  });

  // ── Quick Approve Hub (F8) ─────────────────────────────────────

  describe('POST /api/v1/workflows/bulk-reject', () => {
    it('should return 200 with success/failure counts', async () => {
      service.bulkReject.mockResolvedValue({
        succeeded: [{ id: 'WF-001' }, { id: 'WF-002' }],
        failed: [],
      });

      const result = await controller.bulkReject(
        { workflow_ids: ['WF-001', 'WF-002'], reason: 'Bulk rejected' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should return partial results', async () => {
      service.bulkReject.mockResolvedValue({
        succeeded: [{ id: 'WF-001' }],
        failed: [{ id: 'WF-999', reason: 'Not found' }],
      });

      const result = await controller.bulkReject(
        { workflow_ids: ['WF-001', 'WF-999'], reason: 'Rejected' },
        mockManager,
      );

      expect(result.succeeded).toHaveLength(1);
      expect(result.failed).toHaveLength(1);
    });
  });

  describe('GET /api/v1/workflows/pending with filters', () => {
    it('should pass query filters to service', async () => {
      service.getPendingForUser.mockResolvedValue([mockWorkflowData]);

      const result = await controller.getPending(mockManager, {
        change_type: 'leave_request',
        urgency: 'high',
        date_from: '2026-02-20',
        date_to: '2026-02-22',
      });

      expect(result).toHaveLength(1);
      expect(service.getPendingForUser).toHaveBeenCalledWith(
        mockManager,
        expect.objectContaining({
          change_type: 'leave_request',
          urgency: 'high',
        }),
      );
    });
  });

  describe('GET /api/v1/workflows/:id/preview', () => {
    it('should return workflow preview with audit trail', async () => {
      service.getWorkflowPreview.mockResolvedValue({
        workflow: mockWorkflowData,
        audit_trail: [{ action: 'create', performed_by: 'EMP001' }],
      });

      const result = await controller.getPreview('WF-001');

      expect(result.workflow).toBeDefined();
      expect(result.audit_trail).toHaveLength(1);
    });

    it('should return 404 for non-existent workflow', async () => {
      service.getWorkflowPreview.mockRejectedValue(new NotFoundException());

      await expect(controller.getPreview('WF-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });
});

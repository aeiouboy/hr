import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { QuickApproveService } from './quick-approve.service';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  workflow: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  workflowStep: {
    findMany: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
  approvalAction: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  approvalDelegation: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  delegation: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
  $transaction: jest.fn((fn) => fn(mockPrismaService)),
};

// ── User Fixtures ──────────────────────────────────────────────

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

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Somchai',
  lastName: 'Jaidee',
  roles: ['employee'],
};

// ── Mock Data ──────────────────────────────────────────────────

const now = new Date('2026-02-22T10:00:00Z');

const makePendingWorkflow = (overrides: any = {}) => ({
  id: 'WF-001',
  change_type: 'leave_request',
  status: 'pending',
  requested_by: 'EMP001',
  requester_name: 'Somchai Jaidee',
  effective_date: new Date('2026-03-01'),
  current_step: 1,
  total_steps: 1,
  section: 'leave',
  old_values: '{}',
  new_values: JSON.stringify({ leave_type: 'annual', days: 3 }),
  created_at: new Date('2026-02-20T10:00:00Z'),
  updated_at: new Date('2026-02-20T10:00:00Z'),
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
  ],
  ...overrides,
});

describe('QuickApproveService', () => {
  let service: QuickApproveService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.useFakeTimers({ now });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuickApproveService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<QuickApproveService>(QuickApproveService);
    prisma = mockPrismaService;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ── Pending Requests Aggregation ────────────────────────────

  describe('getPendingRequests', () => {
    it('should return paginated list of pending workflows for current user', async () => {
      const workflows = [makePendingWorkflow()];
      prisma.workflow.findMany.mockResolvedValue(workflows);
      prisma.workflow.count.mockResolvedValue(1);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, {});

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.data[0].id).toBe('WF-001');
    });

    it('should filter by workflow type', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.workflow.count.mockResolvedValue(0);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, { type: 'overtime' });

      expect(result.data).toHaveLength(0);
      expect(prisma.workflow.findMany).toHaveBeenCalled();
    });

    it('should filter by urgency level - urgent (overdue or > 3 days waiting)', async () => {
      const urgentWf = makePendingWorkflow({
        id: 'WF-URG',
        created_at: new Date('2026-02-17T10:00:00Z'), // 5 days ago = urgent
      });
      const normalWf = makePendingWorkflow({
        id: 'WF-NORM',
        created_at: new Date('2026-02-20T10:00:00Z'), // 2 days ago = normal
      });
      prisma.workflow.findMany.mockResolvedValue([urgentWf, normalWf]);
      prisma.workflow.count.mockResolvedValue(2);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, { urgency: 'urgent' });

      expect(result.data.length).toBeGreaterThanOrEqual(1);
      result.data.forEach((item) => {
        expect(item.urgency).toBe('urgent');
      });
    });

    it('should filter by urgency level - normal (1-3 days waiting)', async () => {
      const normalWf = makePendingWorkflow({
        id: 'WF-NORM',
        created_at: new Date('2026-02-20T10:00:00Z'), // 2 days ago
      });
      prisma.workflow.findMany.mockResolvedValue([normalWf]);
      prisma.workflow.count.mockResolvedValue(1);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, { urgency: 'normal' });

      result.data.forEach((item) => {
        expect(item.urgency).toBe('normal');
      });
    });

    it('should filter by urgency level - low (< 1 day waiting)', async () => {
      const lowWf = makePendingWorkflow({
        id: 'WF-LOW',
        created_at: new Date('2026-02-22T08:00:00Z'), // 2 hours ago
      });
      prisma.workflow.findMany.mockResolvedValue([lowWf]);
      prisma.workflow.count.mockResolvedValue(1);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, { urgency: 'low' });

      result.data.forEach((item) => {
        expect(item.urgency).toBe('low');
      });
    });

    it('should filter by date range', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.workflow.count.mockResolvedValue(0);
      prisma.delegation.findMany.mockResolvedValue([]);

      await service.getPendingRequests(mockManager, {
        dateFrom: '2026-02-01',
        dateTo: '2026-02-28',
      });

      expect(prisma.workflow.findMany).toHaveBeenCalled();
    });

    it('should filter by search text (requester name or change type)', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflow.count.mockResolvedValue(1);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, { search: 'Somchai' });

      expect(result).toBeDefined();
    });

    it('should sort by urgency (urgent first), then by submitted date (oldest first)', async () => {
      const urgentWf = makePendingWorkflow({
        id: 'WF-URG',
        created_at: new Date('2026-02-15T10:00:00Z'), // 7 days = urgent
      });
      const normalWf = makePendingWorkflow({
        id: 'WF-NORM',
        created_at: new Date('2026-02-20T10:00:00Z'), // 2 days = normal
      });
      const lowWf = makePendingWorkflow({
        id: 'WF-LOW',
        created_at: new Date('2026-02-22T09:00:00Z'), // 1 hour = low
      });
      prisma.workflow.findMany.mockResolvedValue([lowWf, normalWf, urgentWf]);
      prisma.workflow.count.mockResolvedValue(3);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, {});

      expect(result.data[0].urgency).toBe('urgent');
      expect(result.data[result.data.length - 1].urgency).toBe('low');
    });

    it('should return count per type for filter badges', async () => {
      const leaveWf = makePendingWorkflow({ id: 'WF-L1', change_type: 'leave_request' });
      const otWf = makePendingWorkflow({ id: 'WF-OT1', change_type: 'ot_request' });
      prisma.workflow.findMany.mockResolvedValue([leaveWf, otWf]);
      prisma.workflow.count.mockResolvedValue(2);
      prisma.delegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, {});

      expect(result.typeCounts).toBeDefined();
      expect(result.typeCounts['leave_request']).toBe(1);
      expect(result.typeCounts['ot_request']).toBe(1);
    });

    it('should apply pagination with page and limit', async () => {
      prisma.workflow.findMany.mockResolvedValue([]);
      prisma.workflow.count.mockResolvedValue(0);
      prisma.delegation.findMany.mockResolvedValue([]);

      await service.getPendingRequests(mockManager, { page: 2, limit: 10 });

      expect(prisma.workflow.findMany).toHaveBeenCalled();
    });
  });

  // ── Bulk Operations ──────────────────────────────────────────

  describe('bulkApprove', () => {
    it('should approve multiple workflow items at once', async () => {
      const wf1 = makePendingWorkflow({ id: 'WF-001' });
      const wf2 = makePendingWorkflow({ id: 'WF-002' });
      prisma.workflow.findMany.mockResolvedValue([wf1, wf2]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ status: 'approved' });

      const result = await service.bulkApprove({ ids: ['WF-001', 'WF-002'] }, mockManager);

      expect(result.approved).toBe(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should reject batch exceeding 50 items', async () => {
      const ids = Array.from({ length: 51 }, (_, i) => `WF-${i}`);

      await expect(
        service.bulkApprove({ ids }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should validate all items are in pending_approval status', async () => {
      const approvedWf = makePendingWorkflow({ id: 'WF-DONE', status: 'approved' });
      prisma.workflow.findMany.mockResolvedValue([approvedWf]);

      const result = await service.bulkApprove({ ids: ['WF-DONE'] }, mockManager);

      expect(result.approved).toBe(0);
      expect(result.failed).toHaveLength(1);
      expect(result.failed[0].id).toBe('WF-DONE');
      expect(result.failed[0].reason).toContain('pending');
    });

    it('should validate all items are assigned to current user', async () => {
      const otherWf = makePendingWorkflow({
        id: 'WF-OTHER',
        steps: [{
          id: 'WFS-X',
          workflow_id: 'WF-OTHER',
          step_number: 1,
          role: 'hr_admin',
          approver_id: 'HR001',
          status: 'pending',
        }],
      });
      prisma.workflow.findMany.mockResolvedValue([otherWf]);
      prisma.delegation.findFirst.mockResolvedValue(null);

      const result = await service.bulkApprove({ ids: ['WF-OTHER'] }, mockManager);

      expect(result.approved).toBe(0);
      expect(result.failed).toHaveLength(1);
    });

    it('should apply optional reason to all approved items', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ status: 'approved' });

      await service.bulkApprove({ ids: ['WF-001'], reason: 'All good' }, mockManager);

      expect(prisma.approvalAction.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            comments: 'All good',
          }),
        }),
      );
    });

    it('should return { approved, failed } result shape', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ status: 'approved' });

      const result = await service.bulkApprove({ ids: ['WF-001'] }, mockManager);

      expect(result).toHaveProperty('approved');
      expect(result).toHaveProperty('failed');
      expect(typeof result.approved).toBe('number');
      expect(Array.isArray(result.failed)).toBe(true);
    });

    it('should use transaction for atomicity', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'approved' });
      prisma.workflow.update.mockResolvedValue({ status: 'approved' });

      await service.bulkApprove({ ids: ['WF-001'] }, mockManager);

      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('bulkReject', () => {
    it('should reject multiple workflow items at once', async () => {
      const wf1 = makePendingWorkflow({ id: 'WF-001' });
      const wf2 = makePendingWorkflow({ id: 'WF-002' });
      prisma.workflow.findMany.mockResolvedValue([wf1, wf2]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update.mockResolvedValue({ status: 'rejected' });

      const result = await service.bulkReject(
        { ids: ['WF-001', 'WF-002'], reason: 'Policy violation' },
        mockManager,
      );

      expect(result.rejected).toBe(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should reject batch exceeding 50 items', async () => {
      const ids = Array.from({ length: 51 }, (_, i) => `WF-${i}`);

      await expect(
        service.bulkReject({ ids, reason: 'No' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should require reason for rejection', async () => {
      await expect(
        service.bulkReject({ ids: ['WF-001'], reason: '' }, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return { rejected, failed } result shape', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update.mockResolvedValue({ status: 'rejected' });

      const result = await service.bulkReject(
        { ids: ['WF-001'], reason: 'Denied' },
        mockManager,
      );

      expect(result).toHaveProperty('rejected');
      expect(result).toHaveProperty('failed');
      expect(typeof result.rejected).toBe('number');
      expect(Array.isArray(result.failed)).toBe(true);
    });

    it('should use transaction for atomicity', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflowStep.update.mockResolvedValue({ status: 'rejected' });
      prisma.workflow.update.mockResolvedValue({ status: 'rejected' });

      await service.bulkReject({ ids: ['WF-001'], reason: 'No' }, mockManager);

      expect(prisma.$transaction).toHaveBeenCalled();
    });
  });

  // ── Slide-over Preview (F8.4) ────────────────────────────────

  describe('getRequestDetail', () => {
    it('should return full detail of a single pending request', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findUnique.mockResolvedValue(wf);
      prisma.approvalAction.findMany.mockResolvedValue([]);

      const result = await service.getRequestDetail('WF-001', mockManager);

      expect(result).toBeDefined();
      expect(result.id).toBe('WF-001');
      expect(result.requester).toBeDefined();
      expect(result.timeline).toBeDefined();
    });

    it('should include requester info', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findUnique.mockResolvedValue(wf);
      prisma.approvalAction.findMany.mockResolvedValue([]);

      const result = await service.getRequestDetail('WF-001', mockManager);

      expect(result.requester.id).toBe('EMP001');
      expect(result.requester.name).toBe('Somchai Jaidee');
    });

    it('should include approval timeline', async () => {
      const wf = makePendingWorkflow();
      const actions = [
        { id: 'ACT-1', action: 'create', performed_by: 'EMP001', performed_at: new Date() },
      ];
      prisma.workflow.findUnique.mockResolvedValue(wf);
      prisma.approvalAction.findMany.mockResolvedValue(actions);

      const result = await service.getRequestDetail('WF-001', mockManager);

      expect(result.timeline).toHaveLength(1);
    });

    it('should return leave-specific detail shape for leave requests', async () => {
      const leaveWf = makePendingWorkflow({
        change_type: 'leave_request',
        new_values: JSON.stringify({ leave_type: 'annual', start_date: '2026-03-01', end_date: '2026-03-03', days: 3 }),
      });
      prisma.workflow.findUnique.mockResolvedValue(leaveWf);
      prisma.approvalAction.findMany.mockResolvedValue([]);

      const result = await service.getRequestDetail('WF-001', mockManager);

      expect(result.details.leave_type).toBe('annual');
      expect(result.details.days).toBe(3);
    });

    it('should return OT-specific detail shape for overtime requests', async () => {
      const otWf = makePendingWorkflow({
        change_type: 'ot_request',
        new_values: JSON.stringify({ hours: 4, rate: 1.5, date: '2026-03-01' }),
      });
      prisma.workflow.findUnique.mockResolvedValue(otWf);
      prisma.approvalAction.findMany.mockResolvedValue([]);

      const result = await service.getRequestDetail('WF-001', mockManager);

      expect(result.details.hours).toBe(4);
      expect(result.details.rate).toBe(1.5);
    });

    it('should throw NotFoundException for non-existent workflow', async () => {
      prisma.workflow.findUnique.mockResolvedValue(null);

      await expect(
        service.getRequestDetail('WF-NONEXIST', mockManager),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ── Delegation (F8.6) ────────────────────────────────────────

  describe('createDelegation', () => {
    const delegationDto = {
      delegate_to: 'MGR002',
      start_date: '2026-03-01',
      end_date: '2026-03-15',
      workflow_types: ['leave_request', 'ot_request'],
    };

    it('should create a delegation successfully', async () => {
      prisma.approvalDelegation.findFirst.mockResolvedValue(null);
      prisma.approvalDelegation.create.mockResolvedValue({
        id: 'ADEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: new Date('2026-03-01'),
        end_date: new Date('2026-03-15'),
        workflow_types: ['leave_request', 'ot_request'],
        is_active: true,
        created_at: new Date(),
      });

      const result = await service.createDelegation(delegationDto, mockManager);

      expect(result).toBeDefined();
      expect(result.id).toBe('ADEL-001');
      expect(result.delegator_id).toBe('MGR001');
      expect(result.delegate_id).toBe('MGR002');
      expect(result.is_active).toBe(true);
    });

    it('should validate delegate exists (not self)', async () => {
      const selfDto = { ...delegationDto, delegate_to: 'MGR001' };

      await expect(
        service.createDelegation(selfDto, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should validate date range (end_date after start_date)', async () => {
      const badDates = { ...delegationDto, start_date: '2026-03-15', end_date: '2026-03-01' };

      await expect(
        service.createDelegation(badDates, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should prevent circular delegation', async () => {
      // MGR002 already delegated to MGR001, so MGR001 delegating to MGR002 is circular
      prisma.approvalDelegation.findFirst.mockResolvedValue({
        id: 'ADEL-EXISTING',
        delegator_id: 'MGR002',
        delegate_id: 'MGR001',
        is_active: true,
      });

      await expect(
        service.createDelegation(delegationDto, mockManager),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create audit log for delegation', async () => {
      prisma.approvalDelegation.findFirst.mockResolvedValue(null);
      prisma.approvalDelegation.create.mockResolvedValue({
        id: 'ADEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        is_active: true,
      });

      await service.createDelegation(delegationDto, mockManager);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'approval_delegation',
            action: 'create',
            performed_by: 'MGR001',
          }),
        }),
      );
    });
  });

  describe('getDelegations', () => {
    it('should list active delegations for current user', async () => {
      prisma.approvalDelegation.findMany.mockResolvedValue([
        {
          id: 'ADEL-001',
          delegator_id: 'MGR001',
          delegate_id: 'MGR002',
          is_active: true,
        },
      ]);

      const result = await service.getDelegations(mockManager);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('ADEL-001');
    });

    it('should return empty array if no delegations', async () => {
      prisma.approvalDelegation.findMany.mockResolvedValue([]);

      const result = await service.getDelegations(mockManager);

      expect(result).toHaveLength(0);
    });
  });

  describe('revokeDelegation', () => {
    it('should revoke an active delegation', async () => {
      prisma.approvalDelegation.findFirst.mockResolvedValue({
        id: 'ADEL-001',
        delegator_id: 'MGR001',
        is_active: true,
      });
      prisma.approvalDelegation.update.mockResolvedValue({
        id: 'ADEL-001',
        is_active: false,
        revoked_at: new Date(),
        revoked_by: 'MGR001',
      });

      const result = await service.revokeDelegation('ADEL-001', mockManager);

      expect(result.is_active).toBe(false);
      expect(result.revoked_at).toBeDefined();
    });

    it('should throw NotFoundException for non-existent delegation', async () => {
      prisma.approvalDelegation.findFirst.mockResolvedValue(null);

      await expect(
        service.revokeDelegation('ADEL-NONEXIST', mockManager),
      ).rejects.toThrow(NotFoundException);
    });

    it('should only allow delegator to revoke their own delegation', async () => {
      prisma.approvalDelegation.findFirst.mockResolvedValue(null); // Not found for this user

      await expect(
        service.revokeDelegation('ADEL-001', mockEmployee),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delegation visibility', () => {
    it('should include delegated items in pending list when delegation is active', async () => {
      const delegatedWf = makePendingWorkflow({
        id: 'WF-DELEGATED',
        steps: [{
          id: 'WFS-D1',
          workflow_id: 'WF-DELEGATED',
          step_number: 1,
          role: 'manager',
          approver_id: 'MGR001', // original approver
          status: 'pending',
        }],
      });

      // MGR001 delegated to MGR002
      prisma.delegation.findMany.mockResolvedValue([]);
      prisma.approvalDelegation.findMany.mockResolvedValue([{
        id: 'ADEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        start_date: new Date('2026-02-01'),
        end_date: new Date('2026-03-31'),
        workflow_types: ['leave_request'],
        is_active: true,
      }]);

      // First call: direct pending, second call: delegated pending
      prisma.workflow.findMany
        .mockResolvedValueOnce([]) // direct pending for MGR002
        .mockResolvedValueOnce([delegatedWf]); // delegated items
      prisma.workflow.count.mockResolvedValue(1);

      const delegateUser: CurrentUserInterface = {
        id: 'MGR002',
        email: 'mgr2@centralgroup.com',
        username: 'manager2',
        firstName: 'Manager',
        lastName: 'Two',
        roles: ['manager'],
      };

      const result = await service.getPendingRequests(delegateUser, {});

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('WF-DELEGATED');
    });

    it('should allow original approver to still approve when delegation is active', async () => {
      const wf = makePendingWorkflow();
      prisma.workflow.findMany.mockResolvedValue([wf]);
      prisma.workflow.count.mockResolvedValue(1);
      prisma.delegation.findMany.mockResolvedValue([]);
      prisma.approvalDelegation.findMany.mockResolvedValue([]);

      const result = await service.getPendingRequests(mockManager, {});

      expect(result.data).toHaveLength(1);
    });
  });
});

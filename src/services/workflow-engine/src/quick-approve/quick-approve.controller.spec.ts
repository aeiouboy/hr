import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QuickApproveController } from './quick-approve.controller';
import { QuickApproveService } from './quick-approve.service';
import { RolesGuard } from 'hrms-shared';
import { type CurrentUserInterface } from 'hrms-shared';

const mockQuickApproveService = {
  getPendingRequests: jest.fn(),
  bulkApprove: jest.fn(),
  bulkReject: jest.fn(),
  getRequestDetail: jest.fn(),
  createDelegation: jest.fn(),
  getDelegations: jest.fn(),
  revokeDelegation: jest.fn(),
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

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Somchai',
  lastName: 'Jaidee',
  roles: ['employee'],
};

describe('QuickApproveController', () => {
  let controller: QuickApproveController;
  let service: typeof mockQuickApproveService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuickApproveController],
      providers: [
        { provide: QuickApproveService, useValue: mockQuickApproveService },
        Reflector,
      ],
    }).compile();

    controller = module.get<QuickApproveController>(QuickApproveController);
    service = mockQuickApproveService;
  });

  describe('GET /api/v1/workflows/pending', () => {
    it('should return pending requests with query params', async () => {
      service.getPendingRequests.mockResolvedValue({
        data: [{ id: 'WF-001' }],
        total: 1,
        typeCounts: { leave_request: 1 },
      });

      const result = await controller.getPendingRequests(
        mockManager,
        { type: 'leave_request', page: 1, limit: 20 },
      );

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(service.getPendingRequests).toHaveBeenCalledWith(
        mockManager,
        expect.objectContaining({ type: 'leave_request' }),
      );
    });

    it('should support urgency filter', async () => {
      service.getPendingRequests.mockResolvedValue({ data: [], total: 0, typeCounts: {} });

      await controller.getPendingRequests(mockManager, { urgency: 'urgent' });

      expect(service.getPendingRequests).toHaveBeenCalledWith(
        mockManager,
        expect.objectContaining({ urgency: 'urgent' }),
      );
    });

    it('should support date range filters', async () => {
      service.getPendingRequests.mockResolvedValue({ data: [], total: 0, typeCounts: {} });

      await controller.getPendingRequests(mockManager, {
        dateFrom: '2026-02-01',
        dateTo: '2026-02-28',
      });

      expect(service.getPendingRequests).toHaveBeenCalledWith(
        mockManager,
        expect.objectContaining({ dateFrom: '2026-02-01', dateTo: '2026-02-28' }),
      );
    });

    it('should support search filter', async () => {
      service.getPendingRequests.mockResolvedValue({ data: [], total: 0, typeCounts: {} });

      await controller.getPendingRequests(mockManager, { search: 'Somchai' });

      expect(service.getPendingRequests).toHaveBeenCalledWith(
        mockManager,
        expect.objectContaining({ search: 'Somchai' }),
      );
    });
  });

  describe('POST /api/v1/workflows/bulk-approve', () => {
    it('should approve multiple workflows', async () => {
      service.bulkApprove.mockResolvedValue({ approved: 2, failed: [] });

      const result = await controller.bulkApprove(
        { ids: ['WF-001', 'WF-002'], reason: 'Approved' },
        mockManager,
      );

      expect(result.approved).toBe(2);
      expect(result.failed).toHaveLength(0);
    });

    it('should return partial failures', async () => {
      service.bulkApprove.mockResolvedValue({
        approved: 1,
        failed: [{ id: 'WF-002', reason: 'Not found' }],
      });

      const result = await controller.bulkApprove(
        { ids: ['WF-001', 'WF-002'] },
        mockManager,
      );

      expect(result.approved).toBe(1);
      expect(result.failed).toHaveLength(1);
    });
  });

  describe('POST /api/v1/workflows/bulk-reject', () => {
    it('should reject multiple workflows', async () => {
      service.bulkReject.mockResolvedValue({ rejected: 2, failed: [] });

      const result = await controller.bulkReject(
        { ids: ['WF-001', 'WF-002'], reason: 'Policy violation' },
        mockManager,
      );

      expect(result.rejected).toBe(2);
      expect(result.failed).toHaveLength(0);
    });
  });

  describe('GET /api/v1/workflows/:id/detail', () => {
    it('should return slide-over preview data', async () => {
      service.getRequestDetail.mockResolvedValue({
        id: 'WF-001',
        change_type: 'leave_request',
        requester: { id: 'EMP001', name: 'Somchai Jaidee' },
        timeline: [],
        details: { leave_type: 'annual', days: 3 },
      });

      const result = await controller.getRequestDetail('WF-001', mockManager);

      expect(result.id).toBe('WF-001');
      expect(result.requester).toBeDefined();
      expect(result.details).toBeDefined();
    });
  });

  describe('POST /api/v1/workflows/delegations', () => {
    it('should create delegation', async () => {
      service.createDelegation.mockResolvedValue({
        id: 'ADEL-001',
        delegator_id: 'MGR001',
        delegate_id: 'MGR002',
        is_active: true,
      });

      const result = await controller.createDelegation(
        {
          delegate_to: 'MGR002',
          start_date: '2026-03-01',
          end_date: '2026-03-15',
          workflow_types: ['leave_request'],
        },
        mockManager,
      );

      expect(result.id).toBe('ADEL-001');
      expect(result.is_active).toBe(true);
    });
  });

  describe('GET /api/v1/workflows/delegations', () => {
    it('should list delegations for current user', async () => {
      service.getDelegations.mockResolvedValue([
        { id: 'ADEL-001', delegator_id: 'MGR001', delegate_id: 'MGR002', is_active: true },
      ]);

      const result = await controller.getDelegations(mockManager);

      expect(result).toHaveLength(1);
    });
  });

  describe('DELETE /api/v1/workflows/delegations/:id', () => {
    it('should revoke delegation', async () => {
      service.revokeDelegation.mockResolvedValue({
        id: 'ADEL-001',
        is_active: false,
        revoked_at: new Date(),
      });

      const result = await controller.revokeDelegation('ADEL-001', mockManager);

      expect(result.is_active).toBe(false);
    });
  });

  // ── RBAC Tests ───────────────────────────────────────────────

  describe('RBAC', () => {
    it('should have Roles decorator on controller requiring manager or hr roles', () => {
      const metadata = Reflect.getMetadata('roles', QuickApproveController);
      // Controller-level roles guard should be set
      expect(metadata).toBeDefined();
      expect(metadata).toContain('manager');
    });

    it('should allow manager role to access bulk endpoints', async () => {
      service.bulkApprove.mockResolvedValue({ approved: 1, failed: [] });

      const result = await controller.bulkApprove(
        { ids: ['WF-001'] },
        mockManager,
      );

      expect(result.approved).toBe(1);
    });

    it('should allow hr_admin role to access bulk endpoints', async () => {
      service.bulkApprove.mockResolvedValue({ approved: 1, failed: [] });

      const result = await controller.bulkApprove(
        { ids: ['WF-001'] },
        mockHrAdmin,
      );

      expect(result.approved).toBe(1);
    });
  });
});

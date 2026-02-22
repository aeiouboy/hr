import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ManagerSelfServiceController } from '../../src/manager-self-service.controller';
import { ManagerSelfServiceService } from '../../src/manager-self-service.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockService = {
  getDashboard: jest.fn(),
  getTeamMembers: jest.fn(),
  getPendingApprovals: jest.fn(),
  approveReject: jest.fn(),
  bulkApproveReject: jest.fn(),
  getTeamCalendar: jest.fn(),
  getDashboardConfig: jest.fn(),
  updateDashboardConfig: jest.fn(),
};

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Somchai',
  lastName: 'Jaidee',
  roles: ['manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Regular',
  lastName: 'Employee',
  roles: ['employee'],
};

const mockDashboardResponse = {
  team_summary: {
    total_members: 3,
    active_count: 3,
    on_leave_count: 1,
    pending_approvals_count: 2,
    on_probation_count: 1,
  },
  urgent_alerts: [
    {
      id: 'pa_001',
      type: 'leave',
      message: 'Leave request requires attention',
      priority: 'high',
      related_id: 'pa_001',
      created_at: new Date('2026-02-20'),
    },
  ],
  pending_approvals: [
    {
      id: 'pa_001',
      request_type: 'leave',
      requester_id: 'EMP001',
      requester_name: 'Somying Suksai',
      title: 'Annual Leave Request',
      status: 'pending',
      priority: 'high',
      submitted_at: new Date('2026-02-20'),
    },
  ],
  direct_reports: [
    {
      employee_id: 'EMP001',
      first_name_en: 'Somying',
      last_name_en: 'Suksai',
      job_title: 'UX Designer',
      department: 'Product',
      status: 'active',
    },
  ],
};

describe('ManagerSelfServiceController', () => {
  let controller: ManagerSelfServiceController;
  let service: typeof mockService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerSelfServiceController],
      providers: [
        { provide: ManagerSelfServiceService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ManagerSelfServiceController>(ManagerSelfServiceController);
    service = mockService;
  });

  describe('GET /api/v1/manager/:managerId/dashboard', () => {
    it('should return 200 with dashboard data', async () => {
      service.getDashboard.mockResolvedValue(mockDashboardResponse);

      const result = await controller.getDashboard('MGR001', mockManagerUser);

      expect(result).toBeDefined();
      expect(result.team_summary.total_members).toBe(3);
      expect(result.urgent_alerts).toHaveLength(1);
      expect(result.pending_approvals).toHaveLength(1);
      expect(result.direct_reports).toHaveLength(1);
      expect(service.getDashboard).toHaveBeenCalledWith('MGR001', mockManagerUser);
    });

    it('should return 403 when non-manager tries to access', async () => {
      service.getDashboard.mockRejectedValue(
        new ForbiddenException('Only managers can access this resource'),
      );

      await expect(controller.getDashboard('MGR001', mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('GET /api/v1/manager/:managerId/team', () => {
    const mockTeam = [
      {
        employee_id: 'EMP001',
        first_name_en: 'Somying',
        last_name_en: 'Suksai',
        job_title: 'UX Designer',
        status: 'active',
      },
    ];

    it('should return 200 with team members', async () => {
      service.getTeamMembers.mockResolvedValue(mockTeam);

      const result = await controller.getTeamMembers('MGR001', mockManagerUser);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
      expect(service.getTeamMembers).toHaveBeenCalledWith('MGR001', mockManagerUser);
    });

    it('should return 403 when non-manager tries to access', async () => {
      service.getTeamMembers.mockRejectedValue(
        new ForbiddenException('Only managers can access this resource'),
      );

      await expect(controller.getTeamMembers('MGR001', mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('GET /api/v1/manager/:managerId/approvals', () => {
    it('should return 200 with pending approvals', async () => {
      service.getPendingApprovals.mockResolvedValue(mockDashboardResponse.pending_approvals);

      const result = await controller.getPendingApprovals('MGR001', mockManagerUser);

      expect(result).toHaveLength(1);
      expect(service.getPendingApprovals).toHaveBeenCalledWith('MGR001', mockManagerUser, { type: undefined, priority: undefined });
    });

    it('should pass type and priority filters to service', async () => {
      service.getPendingApprovals.mockResolvedValue([]);

      await controller.getPendingApprovals('MGR001', mockManagerUser, 'leave', 'high');

      expect(service.getPendingApprovals).toHaveBeenCalledWith('MGR001', mockManagerUser, { type: 'leave', priority: 'high' });
    });
  });

  describe('PATCH /api/v1/manager/approvals/:approvalId', () => {
    it('should return 200 when approval is approved', async () => {
      const updatedApproval = { ...mockDashboardResponse.pending_approvals[0], status: 'approved' };
      service.approveReject.mockResolvedValue(updatedApproval);

      const result = await controller.approveReject('pa_001', { action: 'approved' }, mockManagerUser);

      expect(result.status).toBe('approved');
      expect(service.approveReject).toHaveBeenCalledWith('pa_001', 'approved', mockManagerUser, undefined);
    });

    it('should return 200 when approval is rejected with comment', async () => {
      const updatedApproval = { ...mockDashboardResponse.pending_approvals[0], status: 'rejected' };
      service.approveReject.mockResolvedValue(updatedApproval);

      await controller.approveReject('pa_001', { action: 'rejected', comment: 'No coverage' }, mockManagerUser);

      expect(service.approveReject).toHaveBeenCalledWith('pa_001', 'rejected', mockManagerUser, 'No coverage');
    });

    it('should return 404 when approval not found', async () => {
      service.approveReject.mockRejectedValue(new NotFoundException('Approval request not found'));

      await expect(
        controller.approveReject('nonexist', { action: 'approved' }, mockManagerUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return 400 when approval already resolved', async () => {
      service.approveReject.mockRejectedValue(new BadRequestException('already resolved'));

      await expect(
        controller.approveReject('pa_001', { action: 'approved' }, mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('POST /api/v1/manager/approvals/bulk', () => {
    it('should return 200 with bulk processing result', async () => {
      service.bulkApproveReject.mockResolvedValue({ processed: 2, action: 'approved' });

      const result = await controller.bulkApproveReject(
        { approval_ids: ['pa_001', 'pa_002'], action: 'approved' },
        mockManagerUser,
      );

      expect(result.processed).toBe(2);
      expect(result.action).toBe('approved');
    });

    it('should return 400 when exceeding bulk limit', async () => {
      service.bulkApproveReject.mockRejectedValue(
        new BadRequestException('Cannot process more than 50 approvals at once'),
      );

      await expect(
        controller.bulkApproveReject(
          { approval_ids: Array(51).fill('pa_001'), action: 'approved' },
          mockManagerUser,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('GET /api/v1/manager/:managerId/calendar', () => {
    const mockCalendar = [
      {
        id: 'le_001',
        employee_id: 'EMP001',
        employee_name: 'Somying Suksai',
        leave_type: 'annual',
        start_date: new Date('2026-02-20'),
        end_date: new Date('2026-02-22'),
        status: 'approved',
      },
    ];

    it('should return 200 with calendar entries', async () => {
      service.getTeamCalendar.mockResolvedValue(mockCalendar);

      const result = await controller.getTeamCalendar('MGR001', mockManagerUser);

      expect(result).toHaveLength(1);
      expect(result[0].leave_type).toBe('annual');
    });

    it('should pass date range filters', async () => {
      service.getTeamCalendar.mockResolvedValue([]);

      await controller.getTeamCalendar('MGR001', mockManagerUser, '2026-02-01', '2026-02-28');

      expect(service.getTeamCalendar).toHaveBeenCalledWith('MGR001', mockManagerUser, {
        start_date: '2026-02-01',
        end_date: '2026-02-28',
      });
    });
  });

  describe('GET /api/v1/manager/:managerId/config', () => {
    it('should return 200 with dashboard config', async () => {
      const mockConfig = {
        id: 'cfg_001',
        manager_id: 'MGR001',
        widgets: ['team_summary'],
        preferences: { theme: 'dark' },
      };
      service.getDashboardConfig.mockResolvedValue(mockConfig);

      const result = await controller.getDashboardConfig('MGR001', mockManagerUser);

      expect(result.manager_id).toBe('MGR001');
      expect(result.widgets).toContain('team_summary');
    });
  });

  describe('PATCH /api/v1/manager/:managerId/config', () => {
    it('should return 200 when config is updated', async () => {
      const updated = { id: 'cfg_001', manager_id: 'MGR001', widgets: ['team_summary'], preferences: { theme: 'dark' } };
      service.updateDashboardConfig.mockResolvedValue(updated);

      const result = await controller.updateDashboardConfig(
        'MGR001',
        { widgets: ['team_summary'], preferences: { theme: 'dark' } },
        mockManagerUser,
      );

      expect(result.preferences.theme).toBe('dark');
    });

    it('should return 403 when updating another manager\'s config', async () => {
      service.updateDashboardConfig.mockRejectedValue(
        new ForbiddenException('Cannot update another manager\'s config'),
      );

      await expect(
        controller.updateDashboardConfig('MGR001', {}, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

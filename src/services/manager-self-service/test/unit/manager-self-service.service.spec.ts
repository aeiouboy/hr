import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ManagerSelfServiceService } from '../../src/manager-self-service.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  teamMember: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  pendingApproval: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  teamLeaveEntry: {
    findMany: jest.fn(),
  },
  managerDashboardConfig: {
    findUnique: jest.fn(),
    create: jest.fn(),
    upsert: jest.fn(),
  },
  managerAuditLog: {
    create: jest.fn(),
  },
  $transaction: jest.fn(),
};

// Mock user fixtures
const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Somchai',
  lastName: 'Jaidee',
  roles: ['manager'],
};

const mockHrManagerUser: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee.user',
  firstName: 'Regular',
  lastName: 'Employee',
  roles: ['employee'],
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

// Mock team members
const mockTeamMembers = [
  {
    id: 'tm_001',
    employee_id: 'EMP001',
    first_name_en: 'Somying',
    first_name_th: 'สมหญิง',
    last_name_en: 'Suksai',
    last_name_th: 'สุขใส',
    job_title: 'UX Designer',
    department: 'Product',
    manager_id: 'MGR001',
    status: 'active',
    photo_url: null as any,
    hire_date: new Date('2020-01-15'),
    probation_end: null,
  },
  {
    id: 'tm_002',
    employee_id: 'EMP002',
    first_name_en: 'Pisit',
    first_name_th: 'พิสิทธิ์',
    last_name_en: 'Kanjana',
    last_name_th: 'กาญจนา',
    job_title: 'Dev Lead',
    department: 'Engineering',
    manager_id: 'MGR001',
    status: 'active',
    photo_url: null as any,
    hire_date: new Date('2019-06-01'),
    probation_end: null,
  },
  {
    id: 'tm_003',
    employee_id: 'EMP003',
    first_name_en: 'Napat',
    first_name_th: 'ณภัทร',
    last_name_en: 'Thongsri',
    last_name_th: 'ทองศรี',
    job_title: 'Junior Developer',
    department: 'Engineering',
    manager_id: 'MGR001',
    status: 'active',
    photo_url: null as any,
    hire_date: new Date('2025-12-01'),
    probation_end: new Date('2026-06-01'),
  },
];

// Mock pending approvals
const mockPendingApprovals = [
  {
    id: 'pa_001',
    request_type: 'leave',
    requester_id: 'EMP001',
    requester_name: 'Somying Suksai',
    approver_id: 'MGR001',
    status: 'pending',
    priority: 'high',
    title: 'Annual Leave Request',
    description: '3 days leave for family trip',
    metadata: null as any,
    submitted_at: new Date('2026-02-20'),
    due_date: new Date('2026-02-22'),
    resolved_at: null as any,
    resolved_by: null as any,
  },
  {
    id: 'pa_002',
    request_type: 'overtime',
    requester_id: 'EMP002',
    requester_name: 'Pisit Kanjana',
    approver_id: 'MGR001',
    status: 'pending',
    priority: 'normal',
    title: 'OT Request - Weekend',
    description: 'Weekend deployment support',
    metadata: null as any,
    submitted_at: new Date('2026-02-19'),
    due_date: null,
    resolved_at: null as any,
    resolved_by: null as any,
  },
];

// Mock leave entries
const mockLeaveEntries = [
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

describe('ManagerSelfServiceService', () => {
  let service: ManagerSelfServiceService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagerSelfServiceService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ManagerSelfServiceService>(ManagerSelfServiceService);
    prisma = mockPrismaService;
  });

  describe('getDashboard', () => {
    it('should return dashboard with team summary, alerts, approvals, and direct reports', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue(mockPendingApprovals);
      prisma.teamLeaveEntry.findMany.mockResolvedValue(mockLeaveEntries);

      const result = await service.getDashboard('MGR001', mockManagerUser);

      expect(result).toBeDefined();
      expect(result.team_summary).toBeDefined();
      expect(result.team_summary.total_members).toBe(3);
      expect(result.team_summary.active_count).toBe(3);
      expect(result.team_summary.pending_approvals_count).toBe(2);
      expect(result.team_summary.on_probation_count).toBe(1);
      expect(result.urgent_alerts).toBeDefined();
      expect(result.pending_approvals).toHaveLength(2);
      expect(result.direct_reports).toHaveLength(3);
    });

    it('should include on_leave_count from current leave entries', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue([]);
      prisma.teamLeaveEntry.findMany.mockResolvedValue(mockLeaveEntries);

      const result = await service.getDashboard('MGR001', mockManagerUser);

      expect(result.team_summary.on_leave_count).toBe(1);
    });

    it('should identify urgent alerts from high-priority or overdue approvals', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue(mockPendingApprovals);
      prisma.teamLeaveEntry.findMany.mockResolvedValue([]);

      const result = await service.getDashboard('MGR001', mockManagerUser);

      expect(result.urgent_alerts.length).toBeGreaterThanOrEqual(1);
      expect(result.urgent_alerts[0].priority).toBe('high');
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.getDashboard('MGR001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if manager tries to access another manager\'s dashboard', async () => {
      const otherManager: CurrentUserInterface = {
        ...mockManagerUser,
        id: 'MGR999',
      };

      await expect(
        service.getDashboard('MGR001', otherManager),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow HR admin to access any manager\'s dashboard', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue([]);
      prisma.teamLeaveEntry.findMany.mockResolvedValue([]);

      const result = await service.getDashboard('MGR001', mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result.team_summary).toBeDefined();
    });

    it('should allow HR manager to access any manager\'s dashboard', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue([]);
      prisma.teamLeaveEntry.findMany.mockResolvedValue([]);

      const result = await service.getDashboard('MGR001', mockHrManagerUser);

      expect(result).toBeDefined();
    });

    it('should return direct reports with employee details', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.pendingApproval.findMany.mockResolvedValue([]);
      prisma.teamLeaveEntry.findMany.mockResolvedValue([]);

      const result = await service.getDashboard('MGR001', mockManagerUser);

      expect(result.direct_reports[0].employee_id).toBe('EMP001');
      expect(result.direct_reports[0].first_name_en).toBe('Somying');
      expect(result.direct_reports[0].job_title).toBe('UX Designer');
      expect(result.direct_reports[0].status).toBe('active');
    });
  });

  describe('getTeamMembers', () => {
    it('should return all team members for the manager', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);

      const result = await service.getTeamMembers('MGR001', mockManagerUser);

      expect(result).toHaveLength(3);
      expect(result[0].employee_id).toBe('EMP001');
      expect(result[0].first_name_en).toBe('Somying');
      expect(result[0].job_title).toBe('UX Designer');
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.getTeamMembers('MGR001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if manager tries to access another manager\'s team', async () => {
      const otherManager: CurrentUserInterface = { ...mockManagerUser, id: 'MGR999' };

      await expect(
        service.getTeamMembers('MGR001', otherManager),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should include hire date and probation end for each member', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);

      const result = await service.getTeamMembers('MGR001', mockManagerUser);

      expect(result[2].hire_date).toEqual(new Date('2025-12-01'));
      expect(result[2].probation_end).toEqual(new Date('2026-06-01'));
    });
  });

  describe('getPendingApprovals', () => {
    it('should return all pending approvals for the manager', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue(mockPendingApprovals);

      const result = await service.getPendingApprovals('MGR001', mockManagerUser);

      expect(result).toHaveLength(2);
      expect(result[0].request_type).toBe('leave');
      expect(result[1].request_type).toBe('overtime');
    });

    it('should filter by request type when provided', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue([mockPendingApprovals[0]]);

      const result = await service.getPendingApprovals('MGR001', mockManagerUser, { type: 'leave' });

      expect(prisma.pendingApproval.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ request_type: 'leave' }),
        }),
      );
    });

    it('should filter by priority when provided', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue([mockPendingApprovals[0]]);

      const result = await service.getPendingApprovals('MGR001', mockManagerUser, { priority: 'high' });

      expect(prisma.pendingApproval.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ priority: 'high' }),
        }),
      );
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.getPendingApprovals('MGR001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('approveReject', () => {
    it('should approve a pending request', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue(mockPendingApprovals[0]);
      prisma.pendingApproval.update.mockResolvedValue({
        ...mockPendingApprovals[0],
        status: 'approved',
        resolved_at: expect.any(Date),
        resolved_by: 'MGR001',
      });

      const result = await service.approveReject('pa_001', 'approved', mockManagerUser);

      expect(prisma.pendingApproval.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'pa_001' },
          data: expect.objectContaining({ status: 'approved' }),
        }),
      );
    });

    it('should reject a pending request', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue(mockPendingApprovals[0]);
      prisma.pendingApproval.update.mockResolvedValue({
        ...mockPendingApprovals[0],
        status: 'rejected',
        resolved_at: expect.any(Date),
        resolved_by: 'MGR001',
      });

      const result = await service.approveReject('pa_001', 'rejected', mockManagerUser, 'Insufficient team coverage');

      expect(prisma.pendingApproval.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ status: 'rejected' }),
        }),
      );
    });

    it('should create audit log entry on approve/reject', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue(mockPendingApprovals[0]);
      prisma.pendingApproval.update.mockResolvedValue({
        ...mockPendingApprovals[0],
        status: 'approved',
      });

      await service.approveReject('pa_001', 'approved', mockManagerUser);

      expect(prisma.managerAuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            manager_id: 'MGR001',
            action: 'approve_request',
            entity_type: 'pending_approval',
            entity_id: 'pa_001',
          }),
        }),
      );
    });

    it('should throw NotFoundException if approval not found', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue(null);

      await expect(
        service.approveReject('nonexist', 'approved', mockManagerUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if not the assigned approver', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue(mockPendingApprovals[0]);

      const otherManager: CurrentUserInterface = { ...mockManagerUser, id: 'MGR999' };

      await expect(
        service.approveReject('pa_001', 'approved', otherManager),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if request already resolved', async () => {
      prisma.pendingApproval.findUnique.mockResolvedValue({
        ...mockPendingApprovals[0],
        status: 'approved',
      });

      await expect(
        service.approveReject('pa_001', 'approved', mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.approveReject('pa_001', 'approved', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('bulkApproveReject', () => {
    it('should process multiple approvals in bulk', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue(mockPendingApprovals);
      prisma.$transaction.mockResolvedValue(mockPendingApprovals.map(a => ({ ...a, status: 'approved' })));

      const result = await service.bulkApproveReject(
        ['pa_001', 'pa_002'],
        'approved',
        mockManagerUser,
      );

      expect(result.processed).toBe(2);
      expect(result.action).toBe('approved');
    });

    it('should create audit log for bulk action', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue(mockPendingApprovals);
      prisma.$transaction.mockResolvedValue(mockPendingApprovals.map(a => ({ ...a, status: 'approved' })));

      await service.bulkApproveReject(['pa_001', 'pa_002'], 'approved', mockManagerUser);

      expect(prisma.managerAuditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'bulk_approved',
            entity_type: 'pending_approval',
          }),
        }),
      );
    });

    it('should reject if more than 50 approvals', async () => {
      const tooManyIds = Array.from({ length: 51 }, (_, i) => `pa_${i}`);

      await expect(
        service.bulkApproveReject(tooManyIds, 'approved', mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if some approvals not found', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue([mockPendingApprovals[0]]);

      await expect(
        service.bulkApproveReject(['pa_001', 'pa_nonexist'], 'approved', mockManagerUser),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if some are already resolved', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue([
        mockPendingApprovals[0],
        { ...mockPendingApprovals[1], status: 'approved' },
      ]);

      await expect(
        service.bulkApproveReject(['pa_001', 'pa_002'], 'approved', mockManagerUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ForbiddenException if some approvals belong to another manager', async () => {
      prisma.pendingApproval.findMany.mockResolvedValue([
        mockPendingApprovals[0],
        { ...mockPendingApprovals[1], approver_id: 'MGR999' },
      ]);

      await expect(
        service.bulkApproveReject(['pa_001', 'pa_002'], 'approved', mockManagerUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.bulkApproveReject(['pa_001'], 'approved', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getTeamCalendar', () => {
    it('should return leave entries for all team members', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.teamLeaveEntry.findMany.mockResolvedValue(mockLeaveEntries);

      const result = await service.getTeamCalendar('MGR001', mockManagerUser);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
      expect(result[0].leave_type).toBe('annual');
    });

    it('should filter by date range when provided', async () => {
      prisma.teamMember.findMany.mockResolvedValue(mockTeamMembers);
      prisma.teamLeaveEntry.findMany.mockResolvedValue(mockLeaveEntries);

      await service.getTeamCalendar('MGR001', mockManagerUser, {
        start_date: '2026-02-01',
        end_date: '2026-02-28',
      });

      expect(prisma.teamLeaveEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            end_date: { gte: new Date('2026-02-01') },
            start_date: { lte: new Date('2026-02-28') },
          }),
        }),
      );
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.getTeamCalendar('MGR001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if manager tries to access another team\'s calendar', async () => {
      const otherManager: CurrentUserInterface = { ...mockManagerUser, id: 'MGR999' };

      await expect(
        service.getTeamCalendar('MGR001', otherManager),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getDashboardConfig', () => {
    it('should return existing config for the manager', async () => {
      const mockConfig = {
        id: 'cfg_001',
        manager_id: 'MGR001',
        widgets: ['team_summary', 'pending_approvals'],
        preferences: { theme: 'dark' },
      };
      prisma.managerDashboardConfig.findUnique.mockResolvedValue(mockConfig);

      const result = await service.getDashboardConfig('MGR001', mockManagerUser);

      expect(result).toBeDefined();
      expect(result.manager_id).toBe('MGR001');
      expect(result.widgets).toContain('team_summary');
    });

    it('should create default config if none exists', async () => {
      prisma.managerDashboardConfig.findUnique.mockResolvedValue(null);
      prisma.managerDashboardConfig.create.mockResolvedValue({
        id: 'cfg_new',
        manager_id: 'MGR001',
        widgets: ['team_summary', 'pending_approvals', 'team_calendar', 'urgent_alerts'],
        preferences: { theme: 'default' },
      });

      const result = await service.getDashboardConfig('MGR001', mockManagerUser);

      expect(result).toBeDefined();
      expect(prisma.managerDashboardConfig.create).toHaveBeenCalled();
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.getDashboardConfig('MGR001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateDashboardConfig', () => {
    it('should update manager dashboard config', async () => {
      const updateData = { widgets: ['team_summary'], preferences: { theme: 'dark' } };
      prisma.managerDashboardConfig.upsert.mockResolvedValue({
        id: 'cfg_001',
        manager_id: 'MGR001',
        ...updateData,
      });

      const result = await service.updateDashboardConfig('MGR001', updateData, mockManagerUser);

      expect(result).toBeDefined();
      expect(prisma.managerDashboardConfig.upsert).toHaveBeenCalled();
    });

    it('should reject if manager tries to update another manager\'s config', async () => {
      const otherManager: CurrentUserInterface = { ...mockManagerUser, id: 'MGR999' };

      await expect(
        service.updateDashboardConfig('MGR001', {}, otherManager),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if user is not a manager', async () => {
      await expect(
        service.updateDashboardConfig('MGR001', {}, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

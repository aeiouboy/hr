import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { ResignationService } from '../../src/resignation/resignation.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  resignation: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  clearanceItem: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
};

// Mock user fixtures
const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'somchai@centralgroup.com',
  username: 'somchai.t',
  firstName: 'Somchai',
  lastName: 'Techakarn',
  roles: ['employee'],
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'Nattaya',
  lastName: 'Srisuk',
  roles: ['hr_admin'],
};

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager.user',
  firstName: 'Siriporn',
  lastName: 'Tangsiri',
  roles: ['manager'],
};

// Mock resignation data
const mockResignation: {
  id: string;
  employee_id: string;
  employee_name: string;
  department: string;
  position: string;
  submission_date: Date;
  last_working_date: Date;
  reason_type: string;
  reason_detail: string;
  status: string;
  manager_id: string;
  manager_approved_at: Date | null;
  manager_comments: string | null;
  hr_clearance_completed: boolean;
  hr_clearance_date: Date | null;
  settlement_amount: number | null;
  settlement_date: Date | null;
  exit_interview_date: Date | null;
  exit_interview_notes: string | null;
  created_at: Date;
  updated_at: Date;
} = {
  id: 'RES-001',
  employee_id: 'EMP001',
  employee_name: 'Somchai Techakarn',
  department: 'Information Technology',
  position: 'Senior Software Engineer',
  submission_date: new Date('2026-01-10'),
  last_working_date: new Date('2026-03-10'),
  reason_type: 'voluntary',
  reason_detail: 'Pursuing a new opportunity',
  status: 'submitted',
  manager_id: 'MGR001',
  manager_approved_at: null,
  manager_comments: null,
  hr_clearance_completed: false,
  hr_clearance_date: null,
  settlement_amount: null,
  settlement_date: null,
  exit_interview_date: null,
  exit_interview_notes: null,
  created_at: new Date('2026-01-10'),
  updated_at: new Date('2026-01-10'),
};

const mockClearanceItems: Array<{
  id: string;
  resignation_id: string;
  category: string;
  item_name: string;
  item_name_th: string;
  required: boolean;
  status: string;
  completed_date: Date | null;
  completed_by: string | null;
  notes: string | null;
}> = [
  { id: 'CL-001', resignation_id: 'RES-001', category: 'it_equipment', item_name: 'Laptop/Notebook', item_name_th: 'แล็ปท็อป', required: true, status: 'pending', completed_date: null, completed_by: null, notes: null },
  { id: 'CL-002', resignation_id: 'RES-001', category: 'it_equipment', item_name: 'Access Card/Badge', item_name_th: 'บัตรพนักงาน', required: true, status: 'pending', completed_date: null, completed_by: null, notes: null },
  { id: 'CL-003', resignation_id: 'RES-001', category: 'finance', item_name: 'Company Loan Settlement', item_name_th: 'ชำระหนี้เงินกู้', required: true, status: 'pending', completed_date: null, completed_by: null, notes: null },
  { id: 'CL-004', resignation_id: 'RES-001', category: 'documents', item_name: 'Return Confidential Documents', item_name_th: 'คืนเอกสารลับ', required: true, status: 'pending', completed_date: null, completed_by: null, notes: null },
  { id: 'CL-005', resignation_id: 'RES-001', category: 'access_security', item_name: 'Email Account Deactivation', item_name_th: 'ปิดบัญชีอีเมล', required: true, status: 'pending', completed_date: null, completed_by: null, notes: null },
];

describe('ResignationService', () => {
  let service: ResignationService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResignationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ResignationService>(ResignationService);
    prisma = mockPrismaService;
  });

  describe('submitResignation', () => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 2);
    const futureDateStr = futureDate.toISOString().split('T')[0];

    const submitDto = {
      employee_id: 'EMP001',
      employee_name: 'Somchai Techakarn',
      department: 'Information Technology',
      position: 'Senior Software Engineer',
      last_working_date: futureDateStr,
      reason_type: 'voluntary',
      reason_detail: 'Pursuing a new opportunity',
      manager_id: 'MGR001',
    };

    it('should submit resignation (employee self-service)', async () => {
      prisma.resignation.findFirst.mockResolvedValue(null); // no existing resignation
      prisma.resignation.create.mockResolvedValue({
        id: 'RES-NEW',
        ...submitDto,
        last_working_date: futureDate,
        status: 'submitted',
        clearance_items: mockClearanceItems,
      });

      const result = await service.submitResignation(submitDto as any, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('RES-NEW');
      expect(result.status).toBe('submitted');
      expect(result.employee_name).toBe('Somchai Techakarn');
      expect((result as any).clearance_items).toHaveLength(5);
      expect(prisma.auditLog.create).toHaveBeenCalled();
    });

    it('should create clearance items on submission', async () => {
      prisma.resignation.findFirst.mockResolvedValue(null);
      prisma.resignation.create.mockResolvedValue({
        id: 'RES-NEW',
        ...submitDto,
        last_working_date: futureDate,
        status: 'submitted',
        clearance_items: mockClearanceItems,
      });

      const result = await service.submitResignation(submitDto as any, mockEmployeeUser);

      expect((result as any).clearance_items).toBeDefined();
      expect((result as any).clearance_items.length).toBeGreaterThan(0);
      expect(prisma.resignation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            clearance_items: expect.objectContaining({
              create: expect.any(Array),
            }),
          }),
        }),
      );
    });

    it('should reject duplicate resignation (already pending)', async () => {
      prisma.resignation.findFirst.mockResolvedValue(mockResignation);

      await expect(service.submitResignation(submitDto as any, mockEmployeeUser)).rejects.toThrow(ConflictException);
    });

    it('should validate last_working_date is in the future', async () => {
      const pastDto = { ...submitDto, last_working_date: '2020-01-01' };
      prisma.resignation.findFirst.mockResolvedValue(null);

      await expect(service.submitResignation(pastDto as any, mockEmployeeUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getResignation', () => {
    it('should get resignation by ID', async () => {
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, clearance_items: mockClearanceItems });

      const result = await service.getResignation('RES-001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('RES-001');
      expect(result.employee_name).toBe('Somchai Techakarn');
      expect(result.status).toBe('submitted');
    });

    it('should throw NotFoundException for non-existent resignation', async () => {
      prisma.resignation.findUnique.mockResolvedValue(null);

      await expect(service.getResignation('NONEXIST', mockEmployeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('managerApproveResignation', () => {
    it('should manager approve resignation', async () => {
      prisma.resignation.findUnique.mockResolvedValue(mockResignation); // status = 'submitted'
      prisma.resignation.update.mockResolvedValue({
        ...mockResignation,
        status: 'manager_approved',
        manager_approved_at: new Date(),
        manager_comments: 'Acknowledged',
      });

      const result = await service.managerApproveResignation('RES-001', 'Acknowledged', mockManagerUser);

      expect(result.status).toBe('manager_approved');
      expect((result as any).manager_comments).toBe('Acknowledged');
    });

    it('should reject manager approval by non-manager', async () => {
      await expect(
        service.managerApproveResignation('RES-001', 'comments', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('completeClearanceItem', () => {
    it('should complete individual clearance item', async () => {
      prisma.clearanceItem.findUnique.mockResolvedValue(mockClearanceItems[0]);
      prisma.clearanceItem.update.mockResolvedValue({
        ...mockClearanceItems[0],
        status: 'completed',
        completed_date: new Date(),
        completed_by: 'HR001',
      });

      const result = await service.completeClearanceItem('RES-001', 'CL-001', mockHrAdminUser);

      expect(result.status).toBe('completed');
      expect(result.completed_by).toBe('HR001');
    });

    it('should reject clearance item completion by non-HR', async () => {
      await expect(
        service.completeClearanceItem('RES-001', 'CL-001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('completeHrClearance', () => {
    it('should complete HR clearance (all required items done)', async () => {
      const completedItems = mockClearanceItems.map((item) => ({ ...item, status: 'completed' }));
      prisma.resignation.findUnique.mockResolvedValue({
        ...mockResignation,
        status: 'manager_approved',
        clearance_items: completedItems,
      });
      prisma.resignation.update.mockResolvedValue({
        ...mockResignation,
        status: 'hr_clearance',
        hr_clearance_completed: true,
        hr_clearance_date: new Date(),
      });

      const result = await service.completeHrClearance('RES-001', mockHrAdminUser);

      expect(result.status).toBe('hr_clearance');
      expect((result as any).hr_clearance_completed).toBe(true);
    });

    it('should reject HR clearance if required items not completed', async () => {
      prisma.resignation.findUnique.mockResolvedValue({
        ...mockResignation,
        status: 'manager_approved',
        clearance_items: mockClearanceItems, // all pending
      });

      await expect(service.completeHrClearance('RES-001', mockHrAdminUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('processSettlement', () => {
    it('should process settlement with amount', async () => {
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'hr_clearance' });
      prisma.resignation.update.mockResolvedValue({
        ...mockResignation,
        status: 'settlement',
        settlement_amount: 150000,
        settlement_date: new Date(),
      });

      const result = await service.processSettlement('RES-001', 150000, mockHrAdminUser);

      expect(result.status).toBe('settlement');
      expect((result as any).settlement_amount).toBe(150000);
    });

    it('should reject settlement before HR clearance', async () => {
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'manager_approved' });

      await expect(service.processSettlement('RES-001', 150000, mockHrAdminUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('completeResignation', () => {
    it('should complete resignation (final status)', async () => {
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'settlement' });
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'completed' });

      const result = await service.completeResignation('RES-001', mockHrAdminUser);

      expect(result.status).toBe('completed');
    });
  });

  describe('withdrawResignation', () => {
    it('should allow withdrawal before manager approval', async () => {
      prisma.resignation.findUnique.mockResolvedValue(mockResignation); // status = 'submitted'
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'withdrawn' });

      const result = await service.withdrawResignation('RES-001', mockEmployeeUser);

      expect(result.status).toBe('withdrawn');
    });

    it('should reject withdrawal after manager approval', async () => {
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'manager_approved' });

      await expect(service.withdrawResignation('RES-001', mockEmployeeUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('listResignations', () => {
    it('should list resignations filtered by role (HR sees all)', async () => {
      const allResignations = [mockResignation, { ...mockResignation, id: 'RES-002', employee_id: 'EMP002' }];
      prisma.resignation.findMany.mockResolvedValue(allResignations);

      const result = await service.listResignations(mockHrAdminUser);

      expect(result).toHaveLength(2);
      expect(prisma.resignation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: { clearance_items: true },
        }),
      );
    });

    it('should list resignations filtered by role (manager sees team)', async () => {
      const teamResignations = [mockResignation];
      prisma.resignation.findMany.mockResolvedValue(teamResignations);

      const result = await service.listResignations(mockManagerUser);

      expect(result).toHaveLength(1);
      expect(prisma.resignation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { manager_id: 'MGR001' },
        }),
      );
    });

    it('should list resignations filtered by role (employee sees own)', async () => {
      prisma.resignation.findMany.mockResolvedValue([mockResignation]);

      const result = await service.listResignations(mockEmployeeUser);

      expect(result).toHaveLength(1);
      expect(prisma.resignation.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { employee_id: 'EMP001' },
        }),
      );
    });
  });

  describe('getClearanceItems', () => {
    it('should get clearance items for resignation', async () => {
      prisma.resignation.findUnique.mockResolvedValue(mockResignation);
      prisma.clearanceItem.findMany.mockResolvedValue(mockClearanceItems);

      const result = await service.getClearanceItems('RES-001');

      expect(result).toHaveLength(5);
      expect(result[0].category).toBe('it_equipment');
      expect(result[0].item_name).toBe('Laptop/Notebook');
    });
  });

  describe('audit logging', () => {
    it('should create audit log for each status change', async () => {
      // Test via managerApproveResignation
      prisma.resignation.findUnique.mockResolvedValue(mockResignation);
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'manager_approved' });

      await service.managerApproveResignation('RES-001', 'Approved', mockManagerUser);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'resignation',
            entity_id: 'RES-001',
            action: 'manager_approve_resignation',
            performed_by: 'MGR001',
          }),
        }),
      );
    });
  });

  describe('workflow flow', () => {
    it('should follow correct flow: submitted -> manager_approved -> hr_clearance -> settlement -> completed', async () => {
      // Step 1: submitted (already tested via submitResignation)
      // Step 2: manager_approved
      prisma.resignation.findUnique.mockResolvedValue(mockResignation);
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'manager_approved' });
      const step2 = await service.managerApproveResignation('RES-001', 'OK', mockManagerUser);
      expect(step2.status).toBe('manager_approved');

      // Step 3: hr_clearance
      const completedItems = mockClearanceItems.map((i) => ({ ...i, status: 'completed' }));
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'manager_approved', clearance_items: completedItems });
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'hr_clearance', hr_clearance_completed: true });
      const step3 = await service.completeHrClearance('RES-001', mockHrAdminUser);
      expect(step3.status).toBe('hr_clearance');

      // Step 4: settlement
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'hr_clearance' });
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'settlement', settlement_amount: 100000 });
      const step4 = await service.processSettlement('RES-001', 100000, mockHrAdminUser);
      expect(step4.status).toBe('settlement');

      // Step 5: completed
      prisma.resignation.findUnique.mockResolvedValue({ ...mockResignation, status: 'settlement' });
      prisma.resignation.update.mockResolvedValue({ ...mockResignation, status: 'completed' });
      const step5 = await service.completeResignation('RES-001', mockHrAdminUser);
      expect(step5.status).toBe('completed');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { IdpService } from '../../src/idp/idp.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  iDPPlan: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const employeeUser: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};
const managerUser: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'],
};
const hrUser: CurrentUserInterface = {
  id: 'HR001', email: 'hr@cg.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'],
};
const otherEmployee: CurrentUserInterface = {
  id: 'EMP999', email: 'other@cg.com', username: 'other', firstName: 'Other', lastName: 'User', roles: ['employee'],
};

const mockPlan: Record<string, any> = {
  id: 'idp-001',
  employee_id: 'EMP001',
  title: 'Leadership Development Plan 2024',
  status: 'active',
  period: '2024',
  development_areas: [{ area: 'Leadership', current_level: 3, target_level: 4 }],
  action_items: [{ title: 'Leadership course', type: 'training', status: 'in_progress', due_date: '2024-06-30' }],
  milestones: [{ title: 'Complete assessment', target_date: '2024-03-31', status: 'completed' }],
  mentor_id: 'MGR001',
  approved_by: null,
  approved_at: null,
  signed_by_employee: false,
  signed_by_manager: false,
  created_at: new Date(),
  updated_at: new Date(),
};

describe('IdpService', () => {
  let service: IdpService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdpService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<IdpService>(IdpService);
  });

  describe('create', () => {
    it('should create IDP plan for own employee', async () => {
      mockPrisma.iDPPlan.create.mockResolvedValue(structuredClone(mockPlan));
      const result = await service.create({
        employee_id: 'EMP001',
        title: 'Leadership Development Plan 2024',
        period: '2024',
      }, employeeUser);
      expect(result.title).toBe('Leadership Development Plan 2024');
    });

    it('should reject employee creating plan for another', async () => {
      await expect(
        service.create({ employee_id: 'EMP999', title: 'Plan', period: '2024' }, employeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject missing title', async () => {
      await expect(
        service.create({ period: '2024' }, employeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findByEmployee', () => {
    it('should return own IDP plans', async () => {
      mockPrisma.iDPPlan.findMany.mockResolvedValue([structuredClone(mockPlan)]);
      const result = await service.findByEmployee('EMP001', employeeUser);
      expect(result).toHaveLength(1);
    });

    it('should reject employee accessing another employee plans', async () => {
      await expect(
        service.findByEmployee('EMP001', otherEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow manager to view any employee plans', async () => {
      mockPrisma.iDPPlan.findMany.mockResolvedValue([structuredClone(mockPlan)]);
      const result = await service.findByEmployee('EMP001', managerUser);
      expect(result).toHaveLength(1);
    });
  });

  describe('findById', () => {
    it('should return plan by ID for own employee', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      const result = await service.findById('idp-001', employeeUser);
      expect(result.title).toBe('Leadership Development Plan 2024');
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(null);
      await expect(service.findById('nonexist', employeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update IDP plan', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      mockPrisma.iDPPlan.update.mockResolvedValue({ ...mockPlan, title: 'Updated Plan' });
      const result = await service.update('idp-001', { title: 'Updated Plan' }, employeeUser);
      expect(result.title).toBe('Updated Plan');
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(null);
      await expect(service.update('nonexist', {}, employeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete own IDP plan', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      mockPrisma.iDPPlan.delete.mockResolvedValue(mockPlan);
      const result = await service.delete('idp-001', employeeUser);
      expect(result).toBeDefined();
    });
  });

  describe('signByEmployee', () => {
    it('should allow employee to sign own active IDP', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      mockPrisma.iDPPlan.update.mockResolvedValue({ ...mockPlan, signed_by_employee: true });
      const result = await service.signByEmployee('idp-001', employeeUser);
      expect(result.signed_by_employee).toBe(true);
    });

    it('should reject if not the employee', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      await expect(service.signByEmployee('idp-001', otherEmployee)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('signByManager', () => {
    it('should allow manager to sign IDP', async () => {
      mockPrisma.iDPPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      mockPrisma.iDPPlan.update.mockResolvedValue({
        ...mockPlan,
        signed_by_manager: true,
        approved_by: 'MGR001',
        approved_at: new Date(),
      });
      const result = await service.signByManager('idp-001', managerUser);
      expect(result.signed_by_manager).toBe(true);
      expect(result.approved_by).toBe('MGR001');
    });

    it('should reject employee signing as manager', async () => {
      await expect(service.signByManager('idp-001', employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { SuccessionService } from '../../src/succession/succession.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  successionPlan: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  successor: {
    create: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser: CurrentUserInterface = {
  id: 'HR001', email: 'hr@cg.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'],
};
const managerUser: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'],
};
const employeeUser: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};

const mockPlan: Record<string, any> = {
  id: 'sp-001',
  position_id: 'POS001',
  position_title: 'VP of Operations',
  department: 'Operations',
  incumbent_id: 'EMP100',
  criticality: 'critical',
  status: 'active',
  created_at: new Date(),
  updated_at: new Date(),
  successors: [],
};

const mockNominee: Record<string, any> = {
  id: 'succ-001',
  succession_plan_id: 'sp-001',
  employee_id: 'EMP001',
  readiness: 'ready_1_2_years',
  development_gaps: ['P&L management'],
  development_actions: ['Executive coaching'],
};

describe('SuccessionService', () => {
  let service: SuccessionService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuccessionService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<SuccessionService>(SuccessionService);
  });

  describe('create', () => {
    it('should create succession plan (manager/HR)', async () => {
      mockPrisma.successionPlan.create.mockResolvedValue(structuredClone(mockPlan));
      const result = await service.create({
        position_id: 'POS001',
        position_title: 'VP of Operations',
        criticality: 'critical',
      }, hrUser);
      expect(result.criticality).toBe('critical');
    });

    it('should reject employee creating plan', async () => {
      await expect(
        service.create({ position_id: 'POS001', position_title: 'VP' }, employeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject missing required fields', async () => {
      await expect(
        service.create({ position_id: 'POS001' }, hrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all plans for manager/HR', async () => {
      mockPrisma.successionPlan.findMany.mockResolvedValue([structuredClone(mockPlan)]);
      const result = await service.findAll(hrUser);
      expect(result).toHaveLength(1);
    });

    it('should reject employee access', async () => {
      await expect(service.findAll(employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findById', () => {
    it('should return plan by ID', async () => {
      mockPrisma.successionPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      const result = await service.findById('sp-001', managerUser);
      expect(result.position_title).toBe('VP of Operations');
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.successionPlan.findUnique.mockResolvedValue(null);
      await expect(service.findById('nonexist', hrUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('addNominee', () => {
    it('should add nominee to plan', async () => {
      mockPrisma.successionPlan.findUnique.mockResolvedValue(structuredClone(mockPlan));
      mockPrisma.successor.create.mockResolvedValue(structuredClone(mockNominee));
      const result = await service.addNominee('sp-001', {
        employee_id: 'EMP001',
        readiness: 'ready_1_2_years',
      }, hrUser);
      expect(result.readiness).toBe('ready_1_2_years');
    });

    it('should throw NotFoundException for missing plan', async () => {
      mockPrisma.successionPlan.findUnique.mockResolvedValue(null);
      await expect(
        service.addNominee('nonexist', { employee_id: 'EMP001', readiness: 'ready_now' }, hrUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeNominee', () => {
    it('should remove nominee', async () => {
      mockPrisma.successor.findUnique.mockResolvedValue(structuredClone(mockNominee));
      mockPrisma.successor.delete.mockResolvedValue(mockNominee);
      const result = await service.removeNominee('sp-001', 'succ-001', hrUser);
      expect(result).toBeDefined();
    });
  });

  describe('updateNomineeReadiness', () => {
    it('should update readiness level', async () => {
      mockPrisma.successor.findUnique.mockResolvedValue(structuredClone(mockNominee));
      mockPrisma.successor.update.mockResolvedValue({ ...mockNominee, readiness: 'ready_now' });
      const result = await service.updateNomineeReadiness('succ-001', 'ready_now', hrUser);
      expect(result.readiness).toBe('ready_now');
    });
  });
});

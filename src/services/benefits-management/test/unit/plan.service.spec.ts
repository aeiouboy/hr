import { PlanService } from '../../src/plan/plan.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const mockPrisma = {
  benefitPlan: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const hrUser = { id: 'HR001', email: 'hr@test.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'] };
const employeeUser = { id: 'EMP001', email: 'emp@test.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'] };

const mockPlan = {
  id: 'plan-1',
  code: 'HEALTH-001',
  name_en: 'Health Insurance',
  name_th: null as string | null,
  category: 'health',
  is_active: true,
  effective_date: new Date('2026-01-01'),
  created_at: new Date(),
  updated_at: new Date(),
};

describe('PlanService', () => {
  let service: PlanService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PlanService(mockPrisma as any);
  });

  describe('findAll', () => {
    it('should return all plans without filters', async () => {
      mockPrisma.benefitPlan.findMany.mockResolvedValue([mockPlan]);
      const result = await service.findAll();
      expect(result).toEqual([mockPlan]);
      expect(mockPrisma.benefitPlan.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by category', async () => {
      mockPrisma.benefitPlan.findMany.mockResolvedValue([mockPlan]);
      await service.findAll({ category: 'health' });
      expect(mockPrisma.benefitPlan.findMany).toHaveBeenCalledWith({
        where: { category: 'health' },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by active status', async () => {
      mockPrisma.benefitPlan.findMany.mockResolvedValue([]);
      await service.findAll({ is_active: true });
      expect(mockPrisma.benefitPlan.findMany).toHaveBeenCalledWith({
        where: { is_active: true },
        orderBy: { created_at: 'desc' },
      });
    });

    it('should filter by both category and active status', async () => {
      mockPrisma.benefitPlan.findMany.mockResolvedValue([]);
      await service.findAll({ category: 'dental', is_active: false });
      expect(mockPrisma.benefitPlan.findMany).toHaveBeenCalledWith({
        where: { category: 'dental', is_active: false },
        orderBy: { created_at: 'desc' },
      });
    });
  });

  describe('findById', () => {
    it('should return plan with enrollments', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue({ ...mockPlan, enrollments: [] });
      const result = await service.findById('plan-1');
      expect(result.id).toBe('plan-1');
    });

    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(null);
      await expect(service.findById('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a plan for HR user', async () => {
      const dto = {
        code: 'HEALTH-001',
        name_en: 'Health Insurance',
        category: 'health',
        effective_date: '2026-01-01',
      };
      mockPrisma.benefitPlan.create.mockResolvedValue({ id: 'plan-1', ...dto });
      const result = await service.create(dto as any, hrUser as any);
      expect(result.id).toBe('plan-1');
      expect(mockPrisma.benefitPlan.create).toHaveBeenCalled();
    });

    it('should reject non-HR user', async () => {
      await expect(
        service.create({ code: 'X', name_en: 'X', category: 'health', effective_date: '2026-01-01' } as any, employeeUser as any),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update a plan for HR user', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.benefitPlan.update.mockResolvedValue({ ...mockPlan, name_en: 'Updated' });
      const result = await service.update('plan-1', { name_en: 'Updated' } as any, hrUser as any);
      expect(result.name_en).toBe('Updated');
    });

    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(null);
      await expect(service.update('invalid', {} as any, hrUser as any)).rejects.toThrow(NotFoundException);
    });

    it('should reject non-HR user', async () => {
      await expect(service.update('plan-1', {} as any, employeeUser as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deactivate', () => {
    it('should deactivate a plan for HR user', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.benefitPlan.update.mockResolvedValue({ ...mockPlan, is_active: false });
      const result = await service.deactivate('plan-1', hrUser as any);
      expect(result.is_active).toBe(false);
    });

    it('should throw NotFoundException if plan not found', async () => {
      mockPrisma.benefitPlan.findUnique.mockResolvedValue(null);
      await expect(service.deactivate('invalid', hrUser as any)).rejects.toThrow(NotFoundException);
    });

    it('should reject non-HR user', async () => {
      await expect(service.deactivate('plan-1', employeeUser as any)).rejects.toThrow(ForbiddenException);
    });
  });
});

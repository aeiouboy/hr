import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { GoalService } from '../../src/goal/goal.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  goal: {
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

const mockGoal = {
  id: 'goal-1', employee_id: 'EMP001', title: 'Increase Revenue', description: 'Grow Q1 revenue by 20%',
  category: 'business', weight: 30, target_value: 100, actual_value: 60, unit: '%',
  status: 'active', progress: 60, start_date: new Date('2024-01-01'), due_date: new Date('2024-06-30'),
  completed_at: null as Date | null, period: '2024-H1', created_at: new Date(), updated_at: new Date(),
};

describe('GoalService', () => {
  let service: GoalService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<GoalService>(GoalService);
  });

  describe('create', () => {
    it('should create a goal for the current employee', async () => {
      const dto = { title: 'New Goal', period: '2024-H1', category: 'business', weight: 20 };
      mockPrisma.goal.create.mockResolvedValue({ id: 'goal-new', employee_id: 'EMP001', ...dto, status: 'draft', progress: 0 });
      const result = await service.create(dto, employeeUser);
      expect(result).toBeDefined();
      expect(result.id).toBe('goal-new');
      expect(mockPrisma.goal.create).toHaveBeenCalled();
    });

    it('should reject if title is empty', async () => {
      await expect(service.create({ title: '', period: '2024-H1' }, employeeUser)).rejects.toThrow(BadRequestException);
    });

    it('should reject if period is missing', async () => {
      await expect(service.create({ title: 'Goal' }, employeeUser)).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid weight', async () => {
      await expect(service.create({ title: 'Goal', period: '2024-H1', weight: 150 }, employeeUser)).rejects.toThrow(BadRequestException);
    });

    it('should allow manager to create goal for employee', async () => {
      const dto = { title: 'Team Goal', period: '2024-H1', employee_id: 'EMP001' };
      mockPrisma.goal.create.mockResolvedValue({ id: 'goal-mgr', ...dto, status: 'draft', progress: 0 });
      const result = await service.create(dto, managerUser);
      expect(result).toBeDefined();
    });

    it('should reject employee creating goal for another employee', async () => {
      const dto = { title: 'Goal', period: '2024-H1', employee_id: 'EMP999' };
      await expect(service.create(dto, employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAllByEmployee', () => {
    it('should return goals for own employee', async () => {
      mockPrisma.goal.findMany.mockResolvedValue([structuredClone(mockGoal)]);
      const result = await service.findAllByEmployee('EMP001', employeeUser);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Increase Revenue');
    });

    it('should reject employee accessing another employee goals', async () => {
      await expect(service.findAllByEmployee('EMP999', employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findById', () => {
    it('should return goal by id', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      const result = await service.findById('goal-1', employeeUser);
      expect(result.title).toBe('Increase Revenue');
    });

    it('should throw NotFoundException for non-existent goal', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(null);
      await expect(service.findById('nonexist', employeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update goal fields', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      mockPrisma.goal.update.mockResolvedValue({ ...mockGoal, title: 'Updated Goal' });
      const result = await service.update('goal-1', { title: 'Updated Goal' }, employeeUser);
      expect(result.title).toBe('Updated Goal');
    });

    it('should reject invalid progress', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      await expect(service.update('goal-1', { progress: 150 }, employeeUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete a goal', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      mockPrisma.goal.delete.mockResolvedValue(mockGoal);
      await expect(service.delete('goal-1', employeeUser)).resolves.not.toThrow();
    });
  });

  describe('updateProgress', () => {
    it('should update progress and auto-complete at 100%', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      mockPrisma.goal.update.mockResolvedValue({ ...mockGoal, progress: 100, status: 'completed' });
      const result = await service.updateProgress('goal-1', 100, 100, employeeUser);
      expect(result.progress).toBe(100);
      expect(result.status).toBe('completed');
    });

    it('should reject progress out of range', async () => {
      mockPrisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      await expect(service.updateProgress('goal-1', -5, undefined, employeeUser)).rejects.toThrow(BadRequestException);
    });
  });
});

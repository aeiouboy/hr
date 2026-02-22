import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { GoalService } from '../../src/goal/goal.service';
import { EvaluationService } from '../../src/evaluation/evaluation.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  goal: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  evaluation: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  evaluationScore: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
};

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager',
  firstName: 'Manager',
  lastName: 'Test',
  roles: ['manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  roles: ['employee'],
};

const mockHrUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockGoal: Record<string, any> = {
  id: 'goal-001',
  employee_id: 'EMP001',
  title: 'Increase Sales by 20%',
  description: 'Achieve 20% growth in Q1',
  category: 'business',
  weight: 30,
  target_value: 20,
  actual_value: null,
  unit: 'percent',
  status: 'active',
  progress: 0,
  start_date: new Date('2024-01-01'),
  due_date: new Date('2024-06-30'),
  completed_at: null,
  period: '2024-H1',
  created_at: new Date(),
  updated_at: new Date(),
};

const mockEvaluation: Record<string, any> = {
  id: 'eval-001',
  employee_id: 'EMP001',
  evaluator_id: 'MGR001',
  period: '2024-H1',
  type: 'mid_year',
  status: 'draft',
  self_rating: null,
  manager_rating: null,
  final_rating: null,
  self_comments: null,
  manager_comments: null,
  strengths: null,
  improvements: null,
  submitted_at: null,
  completed_at: null,
  created_at: new Date(),
  updated_at: new Date(),
  scores: [],
};

describe('GoalService', () => {
  let service: GoalService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();
    service = module.get<GoalService>(GoalService);
    prisma = mockPrismaService;
  });

  describe('create', () => {
    it('should create a goal for the employee', async () => {
      prisma.goal.create.mockResolvedValue(structuredClone(mockGoal));

      const result = await service.create({
        employee_id: 'EMP001',
        title: 'Increase Sales by 20%',
        category: 'business',
        weight: 30,
        period: '2024-H1',
      }, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.title).toBe('Increase Sales by 20%');
    });

    it('should reject if title is missing', async () => {
      await expect(
        service.create({ period: '2024-H1' }, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllByEmployee', () => {
    it('should return goals for an employee', async () => {
      prisma.goal.findMany.mockResolvedValue([structuredClone(mockGoal)]);

      const result = await service.findAllByEmployee('EMP001', mockEmployeeUser);

      expect(result).toHaveLength(1);
    });

    it('should reject if employee cannot access other goals', async () => {
      await expect(
        service.findAllByEmployee('OTHER001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('update', () => {
    it('should update goal progress', async () => {
      prisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      prisma.goal.update.mockResolvedValue({ ...mockGoal, progress: 50 });

      const result = await service.update('goal-001', { progress: 50 }, mockEmployeeUser);

      expect(result.progress).toBe(50);
    });

    it('should throw NotFoundException for non-existent goal', async () => {
      prisma.goal.findUnique.mockResolvedValue(null);

      await expect(
        service.update('nonexist', { progress: 50 }, mockEmployeeUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a goal owned by the employee', async () => {
      prisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      prisma.goal.delete.mockResolvedValue(mockGoal);

      const result = await service.delete('goal-001', mockEmployeeUser);
      expect(result).toBeDefined();
    });
  });

  describe('updateProgress', () => {
    it('should update progress and auto-complete at 100%', async () => {
      prisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));
      prisma.goal.update.mockResolvedValue({ ...mockGoal, progress: 100, status: 'completed' });

      const result = await service.updateProgress('goal-001', 100, undefined, mockEmployeeUser);

      expect(result.status).toBe('completed');
    });

    it('should reject invalid progress values', async () => {
      prisma.goal.findUnique.mockResolvedValue(structuredClone(mockGoal));

      await expect(
        service.updateProgress('goal-001', 150, undefined, mockEmployeeUser),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

describe('EvaluationService', () => {
  let service: EvaluationService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluationService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();
    service = module.get<EvaluationService>(EvaluationService);
    prisma = mockPrismaService;
  });

  describe('create', () => {
    it('should create evaluation for manager/HR', async () => {
      prisma.evaluation.create.mockResolvedValue(structuredClone(mockEvaluation));

      const result = await service.create({
        employee_id: 'EMP001',
        period: '2024-H1',
        type: 'mid_year',
      }, mockManagerUser);

      expect(result).toBeDefined();
      expect(result.type).toBe('mid_year');
    });

    it('should reject if not manager/HR', async () => {
      await expect(
        service.create({ employee_id: 'EMP001', period: '2024-H1' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findById', () => {
    it('should return evaluation with scores', async () => {
      prisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));

      const result = await service.findById('eval-001', mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('eval-001');
    });

    it('should throw NotFoundException for non-existent evaluation', async () => {
      prisma.evaluation.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist', mockEmployeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('submitSelfReview', () => {
    it('should submit self review', async () => {
      prisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));
      prisma.evaluation.update.mockResolvedValue({
        ...mockEvaluation,
        status: 'manager_review',
        self_rating: 4.0,
        submitted_at: new Date(),
        scores: [],
      });

      const result = await service.submitSelfReview('eval-001', {
        self_rating: 4.0,
        self_comments: 'Good progress',
      }, mockEmployeeUser);

      expect(result.status).toBe('manager_review');
      expect(result.self_rating).toBe(4.0);
    });
  });

  describe('submitManagerReview', () => {
    it('should submit manager review', async () => {
      const inReview = { ...mockEvaluation, status: 'manager_review' };
      prisma.evaluation.findUnique.mockResolvedValue(inReview);
      prisma.evaluation.update.mockResolvedValue({
        ...inReview,
        status: 'calibration',
        manager_rating: 3.5,
        scores: [],
      });

      const result = await service.submitManagerReview('eval-001', {
        manager_rating: 3.5,
        manager_comments: 'Meets expectations',
      }, mockManagerUser);

      expect(result.status).toBe('calibration');
    });
  });

  describe('calibrate', () => {
    it('should calibrate evaluation with final rating (HR only)', async () => {
      const inCalib = { ...mockEvaluation, status: 'calibration' };
      prisma.evaluation.findUnique.mockResolvedValue(inCalib);
      prisma.evaluation.update.mockResolvedValue({
        ...inCalib,
        status: 'completed',
        final_rating: 3.8,
        completed_at: new Date(),
        scores: [],
      });

      const result = await service.calibrate('eval-001', { final_rating: 3.8 }, mockHrUser);

      expect(result.status).toBe('completed');
      expect(result.final_rating).toBe(3.8);
    });

    it('should reject if not HR', async () => {
      await expect(
        service.calibrate('eval-001', { final_rating: 3.8 }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('addScore', () => {
    it('should add competency score to evaluation', async () => {
      prisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));
      prisma.evaluationScore.create.mockResolvedValue({
        id: 'score-001',
        evaluation_id: 'eval-001',
        competency_id: 'comp-001',
        self_score: 4,
        manager_score: null,
        final_score: null,
        comments: null,
      });

      const result = await service.addScore('eval-001', {
        competency_id: 'comp-001',
        self_score: 4,
      }, mockEmployeeUser);

      expect(result).toBeDefined();
      expect(result.competency_id).toBe('comp-001');
    });
  });
});

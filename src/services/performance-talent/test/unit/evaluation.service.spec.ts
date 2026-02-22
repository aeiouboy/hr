import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { EvaluationService } from '../../src/evaluation/evaluation.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  evaluation: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  evaluationScore: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
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

const mockEvaluation = {
  id: 'eval-1', employee_id: 'EMP001', evaluator_id: 'MGR001', period: '2024-H1',
  type: 'annual', status: 'draft', self_rating: null as number | null, manager_rating: null as number | null, final_rating: null as number | null,
  self_comments: null as string | null, manager_comments: null as string | null, strengths: null as string | null, improvements: null as string | null,
  submitted_at: null as Date | null, completed_at: null as Date | null, created_at: new Date(), updated_at: new Date(),
  scores: [] as any[],
};

describe('EvaluationService', () => {
  let service: EvaluationService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluationService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<EvaluationService>(EvaluationService);
  });

  describe('create', () => {
    it('should create an evaluation (manager)', async () => {
      const dto = { employee_id: 'EMP001', period: '2024-H1', type: 'annual' };
      mockPrisma.evaluation.create.mockResolvedValue({ id: 'eval-new', ...dto, status: 'draft', scores: [] });
      const result = await service.create(dto, managerUser);
      expect(result).toBeDefined();
      expect(result.id).toBe('eval-new');
    });

    it('should reject creation by regular employee', async () => {
      await expect(service.create({ employee_id: 'EMP001', period: '2024-H1' }, employeeUser)).rejects.toThrow(ForbiddenException);
    });

    it('should reject missing employee_id', async () => {
      await expect(service.create({ period: '2024-H1' }, managerUser)).rejects.toThrow(BadRequestException);
    });

    it('should reject missing period', async () => {
      await expect(service.create({ employee_id: 'EMP001' }, managerUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should return evaluation with scores', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));
      const result = await service.findById('eval-1', employeeUser);
      expect(result.id).toBe('eval-1');
      expect(result.scores).toBeDefined();
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue(null);
      await expect(service.findById('nonexist', employeeUser)).rejects.toThrow(NotFoundException);
    });

    it('should reject employee accessing another evaluation', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ ...mockEvaluation, employee_id: 'EMP999' });
      await expect(service.findById('eval-1', employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('submitSelfReview', () => {
    it('should submit self-review and advance status', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));
      mockPrisma.evaluation.update.mockResolvedValue({ ...mockEvaluation, self_rating: 4.0, status: 'manager_review', scores: [] as any[] });
      const result = await service.submitSelfReview('eval-1', { self_rating: 4.0, self_comments: 'Good year' }, employeeUser);
      expect(result.status).toBe('manager_review');
      expect(result.self_rating).toBe(4.0);
    });

    it('should reject if not own evaluation', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ ...mockEvaluation, employee_id: 'EMP999', scores: [] });
      await expect(service.submitSelfReview('eval-1', { self_rating: 4.0 }, employeeUser)).rejects.toThrow(ForbiddenException);
    });

    it('should reject if not in self-review stage', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ ...mockEvaluation, status: 'completed', scores: [] });
      await expect(service.submitSelfReview('eval-1', { self_rating: 4.0 }, employeeUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('submitManagerReview', () => {
    it('should submit manager review and advance to calibration', async () => {
      const evalInReview = { ...mockEvaluation, status: 'manager_review', scores: [] as any[] };
      mockPrisma.evaluation.findUnique.mockResolvedValue(structuredClone(evalInReview));
      mockPrisma.evaluation.update.mockResolvedValue({ ...evalInReview, manager_rating: 4.5, status: 'calibration', scores: [] as any[] });
      const result = await service.submitManagerReview('eval-1', { manager_rating: 4.5, manager_comments: 'Excellent' }, managerUser);
      expect(result.status).toBe('calibration');
    });

    it('should reject employee submitting manager review', async () => {
      await expect(service.submitManagerReview('eval-1', {}, employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('calibrate', () => {
    it('should calibrate and complete evaluation', async () => {
      const evalInCalib = { ...mockEvaluation, status: 'calibration', scores: [] as any[] };
      mockPrisma.evaluation.findUnique.mockResolvedValue(structuredClone(evalInCalib));
      mockPrisma.evaluation.update.mockResolvedValue({ ...evalInCalib, final_rating: 4.2, status: 'completed', scores: [] });
      const result = await service.calibrate('eval-1', { final_rating: 4.2 }, hrUser);
      expect(result.status).toBe('completed');
      expect(result.final_rating).toBe(4.2);
    });

    it('should reject non-HR calibration', async () => {
      await expect(service.calibrate('eval-1', {}, managerUser)).rejects.toThrow(ForbiddenException);
    });

    it('should reject calibration if not in calibration stage', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ ...mockEvaluation, status: 'draft', scores: [] });
      await expect(service.calibrate('eval-1', { final_rating: 4.0 }, hrUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('addScore', () => {
    it('should add a competency score to evaluation', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue(structuredClone(mockEvaluation));
      mockPrisma.evaluationScore.create.mockResolvedValue({ id: 'score-1', evaluation_id: 'eval-1', competency_id: 'comp-1', self_score: 4.0 });
      const result = await service.addScore('eval-1', { competency_id: 'comp-1', self_score: 4.0 }, employeeUser);
      expect(result.competency_id).toBe('comp-1');
    });
  });
});

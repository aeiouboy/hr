import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ScorecardService, CG_COMPETENCIES } from '../../src/scorecard/scorecard.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrisma = {
  competency: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  evaluation: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  evaluationScore: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
  },
};

const managerUser: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'User', roles: ['manager'],
};
const employeeUser: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'Emp', lastName: 'User', roles: ['employee'],
};

describe('ScorecardService', () => {
  let service: ScorecardService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScorecardService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
    service = module.get<ScorecardService>(ScorecardService);
  });

  it('should have 6 CG core competencies defined', () => {
    expect(CG_COMPETENCIES).toHaveLength(6);
    expect(CG_COMPETENCIES.map(c => c.code)).toEqual(['CUS', 'INN', 'COL', 'INT', 'RES', 'PEO']);
  });

  describe('getCompetencies', () => {
    it('should return active competencies', async () => {
      mockPrisma.competency.findMany.mockResolvedValue([{ id: 'c1', name: 'Leadership' }]);
      const result = await service.getCompetencies();
      expect(result).toHaveLength(1);
    });
  });

  describe('seedCompetencies', () => {
    it('should seed if none exist', async () => {
      mockPrisma.competency.findMany.mockResolvedValue([]);
      mockPrisma.competency.create.mockImplementation((args: any) => Promise.resolve({ id: 'new', ...args.data }));
      const result = await service.seedCompetencies();
      expect(result).toHaveLength(6);
      expect(mockPrisma.competency.create).toHaveBeenCalledTimes(6);
    });

    it('should skip seeding if competencies exist', async () => {
      const existing = [{ id: 'c1' }];
      mockPrisma.competency.findMany.mockResolvedValue(existing);
      const result = await service.seedCompetencies();
      expect(result).toEqual(existing);
      expect(mockPrisma.competency.create).not.toHaveBeenCalled();
    });
  });

  describe('assessCompetency', () => {
    it('should create new competency score', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ id: 'eval-1', employee_id: 'EMP001' });
      mockPrisma.evaluationScore.findFirst.mockResolvedValue(null);
      mockPrisma.evaluationScore.create.mockResolvedValue({
        id: 'sc-1', evaluation_id: 'eval-1', competency_id: 'c1', manager_score: 4,
      });
      const result = await service.assessCompetency('eval-1', {
        competency_id: 'c1',
        manager_score: 4,
      }, managerUser);
      expect(result.manager_score).toBe(4);
    });

    it('should update existing competency score', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({ id: 'eval-1', employee_id: 'EMP001' });
      mockPrisma.evaluationScore.findFirst.mockResolvedValue({ id: 'sc-1', evaluation_id: 'eval-1', competency_id: 'c1' });
      mockPrisma.evaluationScore.update.mockResolvedValue({ id: 'sc-1', manager_score: 5 });
      const result = await service.assessCompetency('eval-1', { competency_id: 'c1', manager_score: 5 }, managerUser);
      expect(result.manager_score).toBe(5);
    });

    it('should reject employee assessing competency', async () => {
      await expect(
        service.assessCompetency('eval-1', { competency_id: 'c1' }, employeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getCompositeScore', () => {
    it('should calculate composite score from evaluation scores', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({
        id: 'eval-1',
        employee_id: 'EMP001',
        scores: [
          { id: 'sc-1', final_score: 4, manager_score: 4 },
          { id: 'sc-2', final_score: 3, manager_score: 3 },
        ],
      });
      const result = await service.getCompositeScore('eval-1', employeeUser);
      expect(result.composite_score).toBe(3.5);
      expect(result.competency_count).toBe(2);
    });

    it('should return 0 for no scores', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue({
        id: 'eval-1', employee_id: 'EMP001', scores: [],
      });
      const result = await service.getCompositeScore('eval-1', employeeUser);
      expect(result.composite_score).toBe(0);
    });

    it('should throw NotFoundException', async () => {
      mockPrisma.evaluation.findUnique.mockResolvedValue(null);
      await expect(service.getCompositeScore('nonexist', employeeUser)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getHistory', () => {
    it('should return completed evaluations with scores', async () => {
      mockPrisma.evaluation.findMany.mockResolvedValue([
        { id: 'eval-1', status: 'completed', scores: [] },
      ]);
      const result = await service.getHistory('EMP001', employeeUser);
      expect(result).toHaveLength(1);
    });

    it('should reject employee viewing another history', async () => {
      await expect(service.getHistory('OTHER001', employeeUser)).rejects.toThrow(ForbiddenException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GoalController } from '../../src/goal/goal.controller';
import { GoalService } from '../../src/goal/goal.service';
import { EvaluationController } from '../../src/evaluation/evaluation.controller';
import { EvaluationService } from '../../src/evaluation/evaluation.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockGoalService = {
  create: jest.fn(),
  findAllByEmployee: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  updateProgress: jest.fn(),
};

const mockEvaluationService = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmployee: jest.fn(),
  submitSelfReview: jest.fn(),
  submitManagerReview: jest.fn(),
  calibrate: jest.fn(),
  addScore: jest.fn(),
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'John', lastName: 'Doe', roles: ['employee'],
};
const mockManager: CurrentUserInterface = {
  id: 'MGR001', email: 'mgr@cg.com', username: 'mgr', firstName: 'Mgr', lastName: 'Test', roles: ['manager'],
};
const mockHr: CurrentUserInterface = {
  id: 'HR001', email: 'hr@cg.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'],
};

describe('GoalController', () => {
  let controller: GoalController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoalController],
      providers: [{ provide: GoalService, useValue: mockGoalService }],
    }).compile();
    controller = module.get<GoalController>(GoalController);
  });

  it('should create a goal', async () => {
    mockGoalService.create.mockResolvedValue({ id: 'g1', title: 'Sales' });
    const result = await controller.create({ title: 'Sales', period: '2024-H1' }, mockEmployee);
    expect(result.title).toBe('Sales');
  });

  it('should return goals for employee', async () => {
    mockGoalService.findAllByEmployee.mockResolvedValue([{ id: 'g1' }]);
    const result = await controller.findAllByEmployee('EMP001', mockEmployee);
    expect(result).toHaveLength(1);
  });

  it('should update progress', async () => {
    mockGoalService.updateProgress.mockResolvedValue({ id: 'g1', progress: 75 });
    const result = await controller.updateProgress('g1', { progress: 75 }, mockEmployee);
    expect(result.progress).toBe(75);
  });
});

describe('EvaluationController', () => {
  let controller: EvaluationController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvaluationController],
      providers: [{ provide: EvaluationService, useValue: mockEvaluationService }],
    }).compile();
    controller = module.get<EvaluationController>(EvaluationController);
  });

  it('should create evaluation', async () => {
    mockEvaluationService.create.mockResolvedValue({ id: 'e1', type: 'annual' });
    const result = await controller.create({ employee_id: 'EMP001', period: '2024' }, mockManager);
    expect(result.type).toBe('annual');
  });

  it('should submit self review', async () => {
    mockEvaluationService.submitSelfReview.mockResolvedValue({ id: 'e1', status: 'manager_review' });
    const result = await controller.submitSelfReview('e1', { self_rating: 4.0 }, mockEmployee);
    expect(result.status).toBe('manager_review');
  });

  it('should calibrate evaluation', async () => {
    mockEvaluationService.calibrate.mockResolvedValue({ id: 'e1', status: 'completed', final_rating: 3.8 });
    const result = await controller.calibrate('e1', { final_rating: 3.8 }, mockHr);
    expect(result.status).toBe('completed');
  });
});

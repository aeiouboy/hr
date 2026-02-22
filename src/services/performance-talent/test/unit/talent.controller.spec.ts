import { Test, TestingModule } from '@nestjs/testing';
import { TalentController } from '../../src/talent/talent.controller';
import { TalentService } from '../../src/talent/talent.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockTalentService = {
  getProfile: jest.fn(),
  createOrUpdateProfile: jest.fn(),
  getNineBoxGrid: jest.fn(),
  identifyHiPo: jest.fn(),
  getTalentPool: jest.fn(),
};

const mockHr: CurrentUserInterface = {
  id: 'HR001', email: 'hr@cg.com', username: 'hr', firstName: 'HR', lastName: 'Admin', roles: ['hr_admin'],
};
const mockEmployee: CurrentUserInterface = {
  id: 'EMP001', email: 'emp@cg.com', username: 'emp', firstName: 'John', lastName: 'Doe', roles: ['employee'],
};

describe('TalentController', () => {
  let controller: TalentController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentController],
      providers: [{ provide: TalentService, useValue: mockTalentService }],
    }).compile();
    controller = module.get<TalentController>(TalentController);
  });

  it('should get talent profile', async () => {
    mockTalentService.getProfile.mockResolvedValue({ id: 'tp1', nine_box_position: 'Star' });
    const result = await controller.getProfile('EMP001', mockEmployee);
    expect(result.nine_box_position).toBe('Star');
  });

  it('should create or update profile', async () => {
    mockTalentService.createOrUpdateProfile.mockResolvedValue({ id: 'tp1', nine_box_position: 'Star' });
    const result = await controller.createOrUpdateProfile('EMP001', { performance_rating: 4.5 }, mockHr);
    expect(result).toBeDefined();
  });

  it('should get 9-box grid', async () => {
    mockTalentService.getNineBoxGrid.mockResolvedValue({ grid: { Star: [{}] }, total: 1 });
    const result = await controller.getNineBoxGrid(mockHr);
    expect(result.total).toBe(1);
  });

  it('should identify hi-po employees', async () => {
    mockTalentService.identifyHiPo.mockResolvedValue([{ id: 'tp1' }]);
    const result = await controller.identifyHiPo(mockHr);
    expect(result).toHaveLength(1);
  });
});

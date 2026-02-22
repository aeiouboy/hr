import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { SettingsController } from '../../src/settings/settings.controller';
import { SettingsService } from '../../src/settings/settings.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockSettingsService = {
  getSettings: jest.fn(),
  getSettingsByCategory: jest.fn(),
  updateSetting: jest.fn(),
  createSetting: jest.fn(),
  deleteSetting: jest.fn(),
  getLeavePolicy: jest.fn(),
  updateLeavePolicy: jest.fn(),
  getPayrollSettings: jest.fn(),
  getNotificationSettings: jest.fn(),
};

const mockHrManagerUser: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  roles: ['employee'],
};

describe('SettingsController', () => {
  let controller: SettingsController;
  let service: typeof mockSettingsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        { provide: SettingsService, useValue: mockSettingsService },
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
    service = mockSettingsService;
  });

  describe('GET /api/v1/settings', () => {
    it('should return 200 with grouped settings', async () => {
      const grouped = {
        company: [{ key: 'company.name', value: 'Central' }],
        payroll: [{ key: 'payroll.pay_period', value: 'monthly' }],
      };
      service.getSettings.mockResolvedValue(grouped);

      const result = await controller.getSettings();

      expect(result).toBeDefined();
      expect(result.company).toHaveLength(1);
      expect(result.payroll).toHaveLength(1);
    });
  });

  describe('GET /api/v1/settings/:category', () => {
    it('should return 200 with category settings', async () => {
      const settings = [{ key: 'company.name', value: 'Central' }];
      service.getSettingsByCategory.mockResolvedValue(settings);

      const result = await controller.getSettingsByCategory('company');

      expect(result).toHaveLength(1);
      expect(service.getSettingsByCategory).toHaveBeenCalledWith('company');
    });
  });

  describe('PATCH /api/v1/settings/:key', () => {
    it('should return 200 when HR Manager updates setting', async () => {
      const updated = { key: 'company.name', value: 'Updated' };
      service.updateSetting.mockResolvedValue(updated);

      const result = await controller.updateSetting('company.name', { value: 'Updated' }, mockHrManagerUser);

      expect(result.value).toBe('Updated');
      expect(service.updateSetting).toHaveBeenCalledWith('company.name', 'Updated', mockHrManagerUser);
    });

    it('should return 403 when non-HR Manager updates', async () => {
      service.updateSetting.mockRejectedValue(
        new ForbiddenException('Only HR Manager can update settings'),
      );

      await expect(
        controller.updateSetting('company.name', { value: 'x' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/settings', () => {
    it('should return 201 when HR Manager creates setting', async () => {
      const created = { id: 's1', category: 'custom', key: 'custom.test', value: 'hello' };
      service.createSetting.mockResolvedValue(created);

      const result = await controller.createSetting(
        { category: 'custom', key: 'custom.test', value: 'hello' },
        mockHrManagerUser,
      );

      expect(result).toBeDefined();
      expect(result.key).toBe('custom.test');
    });
  });

  describe('GET /api/v1/settings/leave-policy', () => {
    it('should return 200 with leave policy', async () => {
      const leavePolicy = [{ key: 'leave_policy.types', value: [] as any[] }];
      service.getLeavePolicy.mockResolvedValue(leavePolicy);

      const result = await controller.getLeavePolicy();

      expect(result).toHaveLength(1);
    });
  });

  describe('PATCH /api/v1/settings/leave-policy', () => {
    it('should return 200 when HR Manager updates leave policy', async () => {
      const updated = { key: 'leave_policy.types', value: [{ id: 'annual', daysPerYear: 10 }] };
      service.updateLeavePolicy.mockResolvedValue(updated);

      const result = await controller.updateLeavePolicy(
        { days_per_year: 10 },
        mockHrManagerUser,
      );

      expect(result).toBeDefined();
    });
  });
});

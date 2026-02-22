import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { SettingsService } from '../../src/settings/settings.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  setting: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  settingAudit: {
    create: jest.fn(),
  },
};

const mockHrManagerUser: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'employee',
  firstName: 'John',
  lastName: 'Doe',
  roles: ['employee'],
};

const mockSettings = [
  { id: 's1', category: 'company', key: 'company.name', value: { en: 'Central Group' }, is_system: true },
  { id: 's2', category: 'company', key: 'company.tax_id', value: '0105556123456', is_system: true },
  { id: 's3', category: 'leave_policy', key: 'leave_policy.types', value: [{ id: 'annual', daysPerYear: 6 }], is_system: true },
  { id: 's4', category: 'payroll', key: 'payroll.pay_period', value: 'monthly', is_system: true },
  { id: 's5', category: 'notification', key: 'notification.email', value: { enabled: true }, is_system: false },
];

describe('SettingsService', () => {
  let service: SettingsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
    prisma = mockPrismaService;
  });

  describe('getSettings', () => {
    it('should return all settings grouped by category', async () => {
      prisma.setting.findMany.mockResolvedValue(structuredClone(mockSettings));

      const result = await service.getSettings();

      expect(result).toBeDefined();
      expect(result.company).toHaveLength(2);
      expect(result.leave_policy).toHaveLength(1);
      expect(result.payroll).toHaveLength(1);
      expect(result.notification).toHaveLength(1);
    });
  });

  describe('getSettingsByCategory', () => {
    it('should return settings for specific category', async () => {
      const companySettings = mockSettings.filter(s => s.category === 'company');
      prisma.setting.findMany.mockResolvedValue(structuredClone(companySettings));

      const result = await service.getSettingsByCategory('company');

      expect(result).toHaveLength(2);
    });
  });

  describe('updateSetting', () => {
    it('should update setting value and create audit log', async () => {
      const setting = structuredClone(mockSettings[0]);
      prisma.setting.findUnique.mockResolvedValue(setting);
      prisma.setting.update.mockResolvedValue({ ...setting, value: { en: 'Updated Name' } });
      prisma.settingAudit.create.mockResolvedValue({});

      const result = await service.updateSetting('company.name', { en: 'Updated Name' }, mockHrManagerUser);

      expect(result.value).toEqual({ en: 'Updated Name' });
      expect(prisma.settingAudit.create).toHaveBeenCalled();
    });

    it('should reject if not HR Manager', async () => {
      await expect(
        service.updateSetting('company.name', 'new value', mockHrAdminUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent setting', async () => {
      prisma.setting.findUnique.mockResolvedValue(null);

      await expect(
        service.updateSetting('nonexist', 'value', mockHrManagerUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('createSetting', () => {
    it('should create new setting (HR Manager only)', async () => {
      const newSetting = { id: 's6', category: 'custom', key: 'custom.test', value: 'hello', is_system: false };
      prisma.setting.create.mockResolvedValue(newSetting);

      const result = await service.createSetting(
        { category: 'custom', key: 'custom.test', value: 'hello' },
        mockHrManagerUser,
      );

      expect(result).toBeDefined();
      expect(result.key).toBe('custom.test');
    });

    it('should reject if not HR Manager', async () => {
      await expect(
        service.createSetting({ category: 'custom', key: 'test', value: 'x' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteSetting', () => {
    it('should delete non-system setting (HR Manager only)', async () => {
      const setting = structuredClone(mockSettings[4]); // notification, is_system: false
      prisma.setting.findUnique.mockResolvedValue(setting);
      prisma.setting.delete.mockResolvedValue(setting);

      const result = await service.deleteSetting('notification.email', mockHrManagerUser);

      expect(result).toBeDefined();
      expect(prisma.setting.delete).toHaveBeenCalledWith({ where: { key: 'notification.email' } });
    });

    it('should reject deletion of system settings', async () => {
      const systemSetting = structuredClone(mockSettings[0]); // is_system: true
      prisma.setting.findUnique.mockResolvedValue(systemSetting);

      await expect(
        service.deleteSetting('company.name', mockHrManagerUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if not HR Manager', async () => {
      await expect(
        service.deleteSetting('notification.email', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getLeavePolicy', () => {
    it('should return leave type configurations', async () => {
      const leavePolicies = mockSettings.filter(s => s.category === 'leave_policy');
      prisma.setting.findMany.mockResolvedValue(structuredClone(leavePolicies));

      const result = await service.getLeavePolicy();

      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('leave_policy.types');
    });
  });

  describe('updateLeavePolicy', () => {
    it('should update leave type settings', async () => {
      const setting = structuredClone(mockSettings[2]);
      prisma.setting.findUnique.mockResolvedValue(setting);
      const updatedData = [{ id: 'annual', daysPerYear: 10 }];
      prisma.setting.update.mockResolvedValue({ ...setting, value: updatedData });
      prisma.settingAudit.create.mockResolvedValue({});

      const result = await service.updateLeavePolicy(updatedData, mockHrManagerUser);

      expect(result.value).toEqual(updatedData);
      expect(prisma.settingAudit.create).toHaveBeenCalled();
    });

    it('should reject if not HR Manager', async () => {
      await expect(
        service.updateLeavePolicy([], mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getPayrollSettings', () => {
    it('should return payroll configuration', async () => {
      const payrollSettings = mockSettings.filter(s => s.category === 'payroll');
      prisma.setting.findMany.mockResolvedValue(structuredClone(payrollSettings));

      const result = await service.getPayrollSettings();

      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('payroll.pay_period');
    });
  });

  describe('getNotificationSettings', () => {
    it('should return notification preferences', async () => {
      const notifSettings = mockSettings.filter(s => s.category === 'notification');
      prisma.setting.findMany.mockResolvedValue(structuredClone(notifSettings));

      const result = await service.getNotificationSettings();

      expect(result).toHaveLength(1);
      expect(result[0].value).toEqual({ enabled: true });
    });
  });
});

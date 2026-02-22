import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { OnboardingService } from '../../src/onboarding/onboarding.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  onboardingTemplate: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  onboardingTask: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockHrUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

const mockTemplate = {
  id: 'tpl-1',
  name_en: 'Standard Onboarding',
  name_th: 'การปฐมนิเทศมาตรฐาน',
  department: null as string | null,
  is_default: true,
  tasks: [
    {
      id: 'tpl-task-1',
      category: 'documents',
      title_en: 'National ID Card Copy',
      title_th: 'สำเนาบัตรประชาชน',
      required: true,
      sort_order: 1,
      assigned_to: 'HR',
    },
    {
      id: 'tpl-task-2',
      category: 'it_equipment',
      title_en: 'Setup Laptop',
      title_th: 'ตั้งค่าแล็ปท็อป',
      required: true,
      sort_order: 2,
      assigned_to: 'IT',
    },
  ],
};

const mockOnboardingTask = {
  id: 'task-1',
  employee_id: 'NEW-001',
  category: 'documents',
  title_en: 'National ID Card Copy',
  required: true,
  status: 'pending',
  completed_date: null as Date | null,
  completed_by: null as string | null,
  sort_order: 1,
};

describe('OnboardingService', () => {
  let service: OnboardingService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
    prisma = mockPrismaService;
  });

  describe('getTemplates', () => {
    it('should return all onboarding templates with tasks', async () => {
      prisma.onboardingTemplate.findMany.mockResolvedValue([structuredClone(mockTemplate)]);

      const result = await service.getTemplates();

      expect(result).toHaveLength(1);
      expect(result[0].name_en).toBe('Standard Onboarding');
      expect(result[0].tasks).toHaveLength(2);
    });
  });

  describe('createTemplate', () => {
    it('should create onboarding template when HR', async () => {
      prisma.onboardingTemplate.create.mockResolvedValue({
        id: 'tpl-new',
        name_en: 'IT Department Onboarding',
        department: 'IT',
      });

      const result = await service.createTemplate(
        { name_en: 'IT Department Onboarding', department: 'IT' },
        mockHrUser,
      );

      expect(result).toBeDefined();
      expect(result.name_en).toBe('IT Department Onboarding');
    });

    it('should reject creation by non-HR', async () => {
      await expect(
        service.createTemplate({ name_en: 'Test' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should require template name', async () => {
      await expect(
        service.createTemplate({}, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('assignTemplate', () => {
    it('should create task instances for employee from template', async () => {
      prisma.onboardingTemplate.findUnique.mockResolvedValue(structuredClone(mockTemplate));
      prisma.onboardingTask.create.mockImplementation((args) =>
        Promise.resolve({ id: `new-task-${Math.random()}`, ...args.data }),
      );

      const result = await service.assignTemplate('tpl-1', 'NEW-001', mockHrUser);

      expect(result).toHaveLength(2);
      expect(prisma.onboardingTask.create).toHaveBeenCalledTimes(2);
    });

    it('should reject assignment by non-HR', async () => {
      await expect(
        service.assignTemplate('tpl-1', 'NEW-001', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('completeTask', () => {
    it('should mark onboarding task as completed', async () => {
      prisma.onboardingTask.findUnique.mockResolvedValue(structuredClone(mockOnboardingTask));
      prisma.onboardingTask.update.mockResolvedValue({
        ...mockOnboardingTask,
        status: 'completed',
        completed_by: 'HR001',
        completed_date: new Date(),
      });

      const result = await service.completeTask('task-1', mockHrUser);

      expect(result.status).toBe('completed');
      expect(result.completed_by).toBe('HR001');
    });
  });

  describe('getProgress', () => {
    it('should return onboarding progress summary', async () => {
      prisma.onboardingTask.findMany.mockResolvedValue([
        { ...mockOnboardingTask, status: 'completed', required: true },
        { ...mockOnboardingTask, id: 'task-2', status: 'pending', required: true },
        { ...mockOnboardingTask, id: 'task-3', status: 'pending', required: false },
      ]);

      const result = await service.getProgress('NEW-001');

      expect(result.total).toBe(3);
      expect(result.completed).toBe(1);
      expect(result.pending).toBe(2);
      expect(result.progress).toBe(33);
      expect(result.required_total).toBe(2);
      expect(result.required_completed).toBe(1);
      expect(result.all_required_done).toBe(false);
    });
  });
});

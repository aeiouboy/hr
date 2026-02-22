import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CourseService } from '../../src/course/course.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  course: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  enrollment: {
    count: jest.fn(),
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

const mockCourse = {
  id: 'course-1',
  code: 'ONB-101',
  name_en: 'New Employee Orientation',
  name_th: 'ปฐมนิเทศพนักงานใหม่',
  description_en: 'Comprehensive orientation program',
  category: 'onboarding',
  delivery_method: 'blended',
  duration_hours: 8,
  credits: 1,
  level: 'beginner',
  mandatory: true,
  max_participants: 30,
  prerequisites: [] as string[],
  status: 'active',
  rating: 4.5,
  review_count: 128,
  instructor_ids: ['inst-1'],
  target_audience: ['All new employees'],
  enrollments: [] as any[],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('CourseService', () => {
  let service: CourseService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    prisma = mockPrismaService;
  });

  describe('findAll', () => {
    it('should return all active courses by default', async () => {
      prisma.course.findMany.mockResolvedValue([structuredClone(mockCourse)]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].code).toBe('ONB-101');
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'active' },
        }),
      );
    });

    it('should filter courses by category and level', async () => {
      prisma.course.findMany.mockResolvedValue([structuredClone(mockCourse)]);

      await service.findAll({ category: 'onboarding', level: 'beginner' });

      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category: 'onboarding',
            level: 'beginner',
          }),
        }),
      );
    });
  });

  describe('findById', () => {
    it('should return course with enrollments', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));

      const result = await service.findById('course-1');

      expect(result).toBeDefined();
      expect(result.id).toBe('course-1');
      expect(result.name_en).toBe('New Employee Orientation');
    });

    it('should throw NotFoundException for non-existent course', async () => {
      prisma.course.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new course when HR', async () => {
      const createDto = {
        code: 'LDR-201',
        name_en: 'Leadership Essentials',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
      };
      prisma.course.findUnique.mockResolvedValue(null);
      prisma.course.create.mockResolvedValue({ id: 'new-course', ...createDto });

      const result = await service.create(createDto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.code).toBe('LDR-201');
    });

    it('should reject course creation if not HR', async () => {
      await expect(
        service.create({ code: 'TEST', name_en: 'Test' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject duplicate course code', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));

      await expect(
        service.create({ code: 'ONB-101', name_en: 'Duplicate' }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should require code and name_en', async () => {
      await expect(
        service.create({ name_en: 'No Code' }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update course details when HR', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));
      prisma.course.update.mockResolvedValue({ ...mockCourse, name_en: 'Updated Name' });

      const result = await service.update('course-1', { name_en: 'Updated Name' }, mockHrUser);

      expect(result.name_en).toBe('Updated Name');
    });

    it('should reject update if not HR', async () => {
      await expect(
        service.update('course-1', { name_en: 'Updated' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('delete', () => {
    it('should soft-delete course by setting status to inactive', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));
      prisma.course.update.mockResolvedValue({ ...mockCourse, status: 'inactive' });

      const result = await service.delete('course-1', mockHrUser);

      expect(result.status).toBe('inactive');
      expect(prisma.course.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { status: 'inactive' },
        }),
      );
    });

    it('should reject delete if not HR', async () => {
      await expect(
        service.delete('course-1', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { EnrollmentService } from '../../src/enrollment/enrollment.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  course: {
    findUnique: jest.fn(),
  },
  enrollment: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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
  status: 'active',
  max_participants: 30,
};

const mockEnrollment = {
  id: 'enr-1',
  course_id: 'course-1',
  employee_id: 'EMP001',
  status: 'enrolled',
  enrollment_date: new Date(),
  completion_date: null as Date | null,
  score: null as number | null,
  progress: 0,
  certificate_id: null as string | null,
  course: mockCourse,
};

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
    prisma = mockPrismaService;
  });

  describe('findByEmployee', () => {
    it('should return enrollments for employee with course details', async () => {
      prisma.enrollment.findMany.mockResolvedValue([structuredClone(mockEnrollment)]);

      const result = await service.findByEmployee('EMP001');

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
      expect(result[0].course).toBeDefined();
    });
  });

  describe('enroll', () => {
    it('should enroll employee in a course', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));
      prisma.enrollment.findUnique.mockResolvedValue(null);
      prisma.enrollment.count.mockResolvedValue(5);
      prisma.enrollment.create.mockResolvedValue(structuredClone(mockEnrollment));

      const result = await service.enroll('course-1', 'EMP001', {});

      expect(result).toBeDefined();
      expect(result.status).toBe('enrolled');
    });

    it('should reject enrollment for non-existent course', async () => {
      prisma.course.findUnique.mockResolvedValue(null);

      await expect(service.enroll('nonexist', 'EMP001', {})).rejects.toThrow(NotFoundException);
    });

    it('should reject duplicate enrollment', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollment));

      await expect(service.enroll('course-1', 'EMP001', {})).rejects.toThrow(ConflictException);
    });

    it('should reject enrollment when course is full', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourse));
      prisma.enrollment.findUnique.mockResolvedValue(null);
      prisma.enrollment.count.mockResolvedValue(30); // max_participants

      await expect(service.enroll('course-1', 'EMP001', {})).rejects.toThrow(BadRequestException);
    });

    it('should reject enrollment for inactive course', async () => {
      prisma.course.findUnique.mockResolvedValue({ ...mockCourse, status: 'inactive' });

      await expect(service.enroll('course-1', 'EMP001', {})).rejects.toThrow(BadRequestException);
    });
  });

  describe('complete', () => {
    it('should mark enrollment as completed with score and certificate', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollment));
      prisma.enrollment.update.mockResolvedValue({
        ...mockEnrollment,
        status: 'completed',
        score: 92,
        progress: 100,
        certificate_id: 'CERT-123',
        completion_date: new Date(),
      });

      const result = await service.complete('enr-1', { score: 92 }, mockHrUser);

      expect(result.status).toBe('completed');
      expect(result.score).toBe(92);
      expect(result.certificate_id).toBeDefined();
      expect(result.progress).toBe(100);
    });

    it('should reject completion by non-HR', async () => {
      await expect(
        service.complete('enr-1', { score: 90 }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject re-completion of already completed enrollment', async () => {
      prisma.enrollment.findUnique.mockResolvedValue({ ...mockEnrollment, status: 'completed' });

      await expect(
        service.complete('enr-1', { score: 90 }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('cancel', () => {
    it('should allow employee to cancel own enrollment', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollment));
      prisma.enrollment.update.mockResolvedValue({ ...mockEnrollment, status: 'cancelled' });

      const result = await service.cancel('enr-1', mockEmployeeUser);

      expect(result.status).toBe('cancelled');
    });

    it('should prevent cancellation of completed enrollment', async () => {
      prisma.enrollment.findUnique.mockResolvedValue({ ...mockEnrollment, status: 'completed' });

      await expect(service.cancel('enr-1', mockEmployeeUser)).rejects.toThrow(BadRequestException);
    });
  });

  describe('updateProgress', () => {
    it('should update progress and set status to in_progress', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollment));
      prisma.enrollment.update.mockResolvedValue({ ...mockEnrollment, progress: 45, status: 'in_progress' });

      const result = await service.updateProgress('enr-1', 45);

      expect(result.progress).toBe(45);
      expect(result.status).toBe('in_progress');
    });

    it('should reject invalid progress values', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollment));

      await expect(service.updateProgress('enr-1', 150)).rejects.toThrow(BadRequestException);
    });
  });
});

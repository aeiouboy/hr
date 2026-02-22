import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LndController } from '../../src/lnd/lnd.controller';
import { LndService } from '../../src/lnd/lnd.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockLndService = {
  listCourses: jest.fn(),
  getCourseById: jest.fn(),
  createCourse: jest.fn(),
  updateCourse: jest.fn(),
  enrollInCourse: jest.fn(),
  cancelEnrollment: jest.fn(),
  getMyEnrollments: jest.fn(),
  getTrainingHistory: jest.fn(),
  completeTraining: jest.fn(),
  submitEvaluation: jest.fn(),
  getEvaluations: jest.fn(),
  issueCertificate: jest.fn(),
  getMyCertificates: jest.fn(),
  getCertificatesByEmployee: jest.fn(),
};

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'somchai.p@centralgroup.com',
  username: 'somchai.p',
  firstName: 'Somchai',
  lastName: 'Prasert',
  roles: ['employee'],
};

const mockHrAdmin: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'Nattaya',
  lastName: 'Srisakul',
  roles: ['hr_admin'],
};

const mockCourseData = {
  id: 'CRS-001',
  code: 'LDR-101',
  name_en: 'Leadership Fundamentals',
  name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
  category: 'leadership',
  delivery_method: 'classroom',
  duration_hours: 16,
  level: 'beginner',
  mandatory: false,
  status: 'active',
};

const mockEnrollmentData = {
  id: 'ENR-001',
  course_id: 'CRS-001',
  employee_id: 'EMP001',
  employee_name: 'Somchai Prasert',
  status: 'enrolled',
  enrolled_at: new Date('2026-02-01'),
};

describe('LndController', () => {
  let controller: LndController;
  let service: typeof mockLndService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LndController],
      providers: [
        { provide: LndService, useValue: mockLndService },
      ],
    }).compile();

    controller = module.get<LndController>(LndController);
    service = mockLndService;
  });

  // ── Course Routes ───────────────────────────────────────────────

  describe('GET /api/v1/lnd/courses', () => {
    it('should return paginated list of courses', async () => {
      service.listCourses.mockResolvedValue({
        data: [mockCourseData],
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
      });

      const result = await controller.listCourses({ page: 1, limit: 20, order: 'asc' });

      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should pass filter parameters to service', async () => {
      service.listCourses.mockResolvedValue({
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      });

      await controller.listCourses(
        { page: 1, limit: 20, order: 'asc' },
        'leadership',
        'advanced',
        'true',
      );

      expect(service.listCourses).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({ category: 'leadership', level: 'advanced', mandatory: true }),
      );
    });
  });

  describe('GET /api/v1/lnd/courses/:id', () => {
    it('should return course details', async () => {
      service.getCourseById.mockResolvedValue(mockCourseData);

      const result = await controller.getCourse('CRS-001');

      expect(result.id).toBe('CRS-001');
      expect(result.code).toBe('LDR-101');
    });

    it('should return 404 for non-existent course', async () => {
      service.getCourseById.mockRejectedValue(new NotFoundException('Course not found'));

      await expect(controller.getCourse('CRS-NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/lnd/courses', () => {
    it('should create course when HR user', async () => {
      service.createCourse.mockResolvedValue(mockCourseData);

      const dto = {
        code: 'LDR-101',
        name_en: 'Leadership Fundamentals',
        name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
      };

      const result = await controller.createCourse(dto as any, mockHrAdmin);

      expect(result).toBeDefined();
      expect(result.id).toBe('CRS-001');
      expect(service.createCourse).toHaveBeenCalledWith(dto, mockHrAdmin);
    });

    it('should return 403 when non-HR user creates course', async () => {
      service.createCourse.mockRejectedValue(new ForbiddenException('Only HR users can create courses'));

      await expect(
        controller.createCourse({} as any, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ── Enrollment Routes ───────────────────────────────────────────

  describe('POST /api/v1/lnd/enrollments', () => {
    it('should enroll employee in course', async () => {
      service.enrollInCourse.mockResolvedValue(mockEnrollmentData);

      const dto = {
        course_id: 'CRS-001',
        employee_id: 'EMP001',
        employee_name: 'Somchai Prasert',
      };

      const result = await controller.enroll(dto as any, mockEmployee);

      expect(result.id).toBe('ENR-001');
      expect(result.status).toBe('enrolled');
    });

    it('should return 400 when course is full', async () => {
      service.enrollInCourse.mockRejectedValue(new BadRequestException('Course is full'));

      await expect(
        controller.enroll({ course_id: 'CRS-001', employee_id: 'EMP001', employee_name: 'Test' } as any, mockEmployee),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('DELETE /api/v1/lnd/enrollments/:id', () => {
    it('should cancel enrollment', async () => {
      service.cancelEnrollment.mockResolvedValue({
        ...mockEnrollmentData,
        status: 'cancelled',
        cancellation_reason: 'Schedule conflict',
      });

      const result = await controller.cancelEnrollment('ENR-001', 'Schedule conflict', mockEmployee);

      expect(result.status).toBe('cancelled');
    });
  });

  describe('GET /api/v1/lnd/enrollments/my', () => {
    it('should return my enrollments', async () => {
      service.getMyEnrollments.mockResolvedValue([mockEnrollmentData]);

      const result = await controller.getMyEnrollments(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
    });
  });

  // ── Training History Routes ─────────────────────────────────────

  describe('GET /api/v1/lnd/training-history/:employeeId', () => {
    it('should return training history', async () => {
      service.getTrainingHistory.mockResolvedValue([{
        id: 'TR-001',
        employee_id: 'EMP001',
        course_code: 'LDR-101',
        status: 'completed',
      }]);

      const result = await controller.getTrainingHistory('EMP001', mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].course_code).toBe('LDR-101');
    });

    it('should return 403 when unauthorized', async () => {
      service.getTrainingHistory.mockRejectedValue(new ForbiddenException());

      await expect(
        controller.getTrainingHistory('EMP001', { ...mockEmployee, id: 'EMP999' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/lnd/training/complete', () => {
    it('should mark training as complete', async () => {
      service.completeTraining.mockResolvedValue({
        id: 'TR-001',
        status: 'completed',
        completion_date: new Date(),
      });

      const result = await controller.completeTraining({} as any, mockEmployee);

      expect(result.status).toBe('completed');
    });
  });

  // ── Evaluation Routes ───────────────────────────────────────────

  describe('POST /api/v1/lnd/evaluations', () => {
    it('should submit evaluation', async () => {
      service.submitEvaluation.mockResolvedValue({
        id: 'EVAL-001',
        training_record_id: 'TR-001',
        reaction_score: 4.5,
      });

      const result = await controller.submitEvaluation(
        { training_record_id: 'TR-001', reaction_score: 4.5 } as any,
        mockEmployee,
      );

      expect(result.reaction_score).toBe(4.5);
    });
  });

  describe('GET /api/v1/lnd/evaluations/:trainingRecordId', () => {
    it('should return evaluations for training record', async () => {
      service.getEvaluations.mockResolvedValue([
        { id: 'EVAL-001', reaction_score: 4.5, learning_score: 4.0 },
      ]);

      const result = await controller.getEvaluations('TR-001');

      expect(result).toHaveLength(1);
    });
  });

  // ── Certificate Routes ──────────────────────────────────────────

  describe('POST /api/v1/lnd/certificates', () => {
    it('should issue certificate when HR', async () => {
      service.issueCertificate.mockResolvedValue({
        id: 'CERT-001',
        certificate_number: 'CG-LDR-2026-0001',
        status: 'active',
      });

      const result = await controller.issueCertificate({} as any, mockHrAdmin);

      expect(result.certificate_number).toBe('CG-LDR-2026-0001');
    });
  });

  describe('GET /api/v1/lnd/certificates/my', () => {
    it('should return my certificates', async () => {
      service.getMyCertificates.mockResolvedValue([
        { id: 'CERT-001', employee_id: 'EMP001', certificate_number: 'CG-LDR-2026-0001' },
      ]);

      const result = await controller.getMyCertificates(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].certificate_number).toBe('CG-LDR-2026-0001');
    });
  });

  describe('GET /api/v1/lnd/certificates/employee/:employeeId', () => {
    it('should return certificates by employee', async () => {
      service.getCertificatesByEmployee.mockResolvedValue([
        { id: 'CERT-001', employee_id: 'EMP001' },
      ]);

      const result = await controller.getCertificatesByEmployee('EMP001', mockHrAdmin);

      expect(result).toHaveLength(1);
    });
  });
});

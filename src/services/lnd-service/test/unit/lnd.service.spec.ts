import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { LndService } from '../../src/lnd/lnd.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

// Mock Prisma service
const mockPrismaService = {
  course: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
  enrollment: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  trainingRecord: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  trainingEvaluation: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  certificate: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  auditLog: {
    create: jest.fn(),
  },
  $transaction: jest.fn((fn) => fn(mockPrismaService)),
};

// ── User Fixtures ──────────────────────────────────────────────

const mockEmployee: CurrentUserInterface = {
  id: 'EMP001',
  email: 'somchai.p@centralgroup.com',
  username: 'somchai.p',
  firstName: 'Somchai',
  lastName: 'Prasert',
  roles: ['employee'],
};

const mockEmployee2: CurrentUserInterface = {
  id: 'EMP002',
  email: 'siriporn.k@centralgroup.com',
  username: 'siriporn.k',
  firstName: 'Siriporn',
  lastName: 'Kaewmanee',
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

const mockHrManager: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'Pornpimol',
  lastName: 'Chaiyaporn',
  roles: ['hr_manager'],
};

// ── Mock Data ──────────────────────────────────────────────────

const mockCourseRecord = {
  id: 'CRS-001',
  code: 'LDR-101',
  name_en: 'Leadership Fundamentals',
  name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
  description_en: 'Foundation course on leadership principles',
  description_th: 'หลักสูตรพื้นฐานด้านภาวะผู้นำ',
  category: 'leadership',
  delivery_method: 'classroom',
  duration_hours: 16,
  credits: 2,
  level: 'beginner',
  mandatory: false,
  max_participants: 30,
  status: 'active',
  rating: 4.5,
  review_count: 12,
  created_at: new Date('2026-01-15'),
  updated_at: new Date('2026-01-15'),
  enrollments: [],
};

const mockAdvancedCourse = {
  id: 'CRS-002',
  code: 'LDR-301',
  name_en: 'Strategic Leadership',
  name_th: 'ภาวะผู้นำเชิงกลยุทธ์',
  description_en: 'Advanced leadership strategies for senior managers',
  description_th: 'กลยุทธ์ภาวะผู้นำขั้นสูงสำหรับผู้จัดการ',
  category: 'leadership',
  delivery_method: 'blended',
  duration_hours: 24,
  credits: 3,
  level: 'advanced',
  mandatory: false,
  max_participants: 20,
  status: 'active',
  rating: 4.8,
  review_count: 5,
  created_at: new Date('2026-01-20'),
  updated_at: new Date('2026-01-20'),
  enrollments: [],
};

const mockMandatoryCourse = {
  id: 'CRS-003',
  code: 'CMP-001',
  name_en: 'Data Privacy & PDPA Compliance',
  name_th: 'การคุ้มครองข้อมูลส่วนบุคคลและ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล',
  category: 'compliance',
  delivery_method: 'e-learning',
  duration_hours: 4,
  credits: 1,
  level: 'beginner',
  mandatory: true,
  max_participants: null,
  status: 'active',
  rating: 3.9,
  review_count: 45,
  created_at: new Date('2026-01-10'),
  updated_at: new Date('2026-01-10'),
  enrollments: [],
};

const mockEnrollmentRecord = {
  id: 'ENR-001',
  course_id: 'CRS-001',
  employee_id: 'EMP001',
  employee_name: 'Somchai Prasert',
  status: 'enrolled',
  enrolled_at: new Date('2026-02-01'),
  started_at: null,
  completed_at: null,
  cancelled_at: null,
  cancellation_reason: null,
};

const mockTrainingRecord = {
  id: 'TR-001',
  enrollment_id: 'ENR-001',
  employee_id: 'EMP001',
  course_code: 'LDR-101',
  course_name_en: 'Leadership Fundamentals',
  course_name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
  training_type: 'internal',
  category: 'leadership',
  provider: 'Central Retail Academy',
  instructor_name: 'Dr. Wichai Thongkam',
  start_date: new Date('2026-02-10'),
  end_date: new Date('2026-02-12'),
  duration_hours: 16,
  location: 'Central World Training Center',
  status: 'completed',
  completion_date: new Date('2026-02-12'),
  certificate_id: null,
  cost: 15000,
  currency: 'THB',
  paid_by: 'company',
  pre_assessment_score: 65,
  post_assessment_score: 88,
  feedback: 'Excellent course, very practical exercises',
  evaluations: [],
};

const mockCertificateRecord = {
  id: 'CERT-001',
  employee_id: 'EMP001',
  training_record_id: 'TR-001',
  certificate_number: 'CG-LDR-2026-0001',
  course_name: 'Leadership Fundamentals',
  issue_date: new Date('2026-02-15'),
  expiry_date: new Date('2028-02-15'),
  issuing_authority: 'Central Retail Academy',
  status: 'active',
  file_url: '/certificates/CG-LDR-2026-0001.pdf',
};

describe('LndService', () => {
  let service: LndService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LndService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<LndService>(LndService);
    prisma = mockPrismaService;
  });

  // ── Course Catalog ──────────────────────────────────────────────

  describe('Course Catalog', () => {
    it('should list courses with pagination', async () => {
      prisma.course.count.mockResolvedValue(2);
      prisma.course.findMany.mockResolvedValue([
        structuredClone(mockCourseRecord),
        structuredClone(mockAdvancedCourse),
      ]);

      const result = await service.listCourses({ page: 1, limit: 20, order: 'asc' });

      expect(result.data).toHaveLength(2);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.totalPages).toBe(1);
    });

    it('should filter courses by category', async () => {
      prisma.course.count.mockResolvedValue(1);
      prisma.course.findMany.mockResolvedValue([structuredClone(mockMandatoryCourse)]);

      const result = await service.listCourses(
        { page: 1, limit: 20, order: 'asc' },
        { category: 'compliance' },
      );

      expect(result.data).toHaveLength(1);
      expect(result.data[0].category).toBe('compliance');
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ category: 'compliance' }),
        }),
      );
    });

    it('should filter courses by level (beginner/intermediate/advanced)', async () => {
      prisma.course.count.mockResolvedValue(1);
      prisma.course.findMany.mockResolvedValue([structuredClone(mockAdvancedCourse)]);

      const result = await service.listCourses(
        { page: 1, limit: 20, order: 'asc' },
        { level: 'advanced' },
      );

      expect(result.data).toHaveLength(1);
      expect(result.data[0].level).toBe('advanced');
    });

    it('should filter mandatory courses only', async () => {
      prisma.course.count.mockResolvedValue(1);
      prisma.course.findMany.mockResolvedValue([structuredClone(mockMandatoryCourse)]);

      const result = await service.listCourses(
        { page: 1, limit: 20, order: 'asc' },
        { mandatory: true },
      );

      expect(result.data).toHaveLength(1);
      expect(result.data[0].mandatory).toBe(true);
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ mandatory: true }),
        }),
      );
    });

    it('should get course by ID', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourseRecord));

      const result = await service.getCourseById('CRS-001');

      expect(result).toBeDefined();
      expect(result.id).toBe('CRS-001');
      expect(result.code).toBe('LDR-101');
      expect(result.name_en).toBe('Leadership Fundamentals');
    });

    it('should throw NotFoundException for non-existent course', async () => {
      prisma.course.findUnique.mockResolvedValue(null);

      await expect(service.getCourseById('CRS-NONEXIST')).rejects.toThrow(NotFoundException);
    });

    it('should create course (HR only)', async () => {
      prisma.course.findUnique.mockResolvedValue(null); // no existing
      prisma.course.create.mockResolvedValue(structuredClone(mockCourseRecord));

      const dto = {
        code: 'LDR-101',
        name_en: 'Leadership Fundamentals',
        name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
        credits: 2,
        level: 'beginner',
      };

      const result = await service.createCourse(dto as any, mockHrAdmin);

      expect(result).toBeDefined();
      expect(result.code).toBe('LDR-101');
      expect(prisma.course.create).toHaveBeenCalled();
      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'course',
            action: 'create',
            performed_by: 'HR001',
          }),
        }),
      );
    });

    it('should reject course creation by non-HR', async () => {
      const dto = {
        code: 'LDR-101',
        name_en: 'Leadership Fundamentals',
        name_th: 'Test',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
      };

      await expect(
        service.createCourse(dto as any, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ── Enrollment ──────────────────────────────────────────────────

  describe('Enrollment', () => {
    it('should enroll employee in course', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourseRecord));
      prisma.enrollment.findFirst.mockResolvedValue(null);
      prisma.enrollment.create.mockResolvedValue(structuredClone(mockEnrollmentRecord));

      const dto = {
        course_id: 'CRS-001',
        employee_id: 'EMP001',
        employee_name: 'Somchai Prasert',
      };

      const result = await service.enrollInCourse(dto, mockEmployee);

      expect(result).toBeDefined();
      expect(result.course_id).toBe('CRS-001');
      expect(result.employee_id).toBe('EMP001');
      expect(result.status).toBe('enrolled');
    });

    it('should reject enrollment if course is full (max_participants reached)', async () => {
      const fullCourse = structuredClone(mockCourseRecord);
      fullCourse.max_participants = 2;
      fullCourse.enrollments = [
        { id: 'ENR-X1', status: 'enrolled' },
        { id: 'ENR-X2', status: 'in_progress' },
      ] as any;

      prisma.course.findUnique.mockResolvedValue(fullCourse);
      prisma.enrollment.findFirst.mockResolvedValue(null);

      const dto = {
        course_id: 'CRS-001',
        employee_id: 'EMP003',
        employee_name: 'New Employee',
      };

      await expect(service.enrollInCourse(dto, mockEmployee)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should reject duplicate enrollment (already enrolled)', async () => {
      prisma.course.findUnique.mockResolvedValue(structuredClone(mockCourseRecord));
      prisma.enrollment.findFirst.mockResolvedValue(structuredClone(mockEnrollmentRecord));

      const dto = {
        course_id: 'CRS-001',
        employee_id: 'EMP001',
        employee_name: 'Somchai Prasert',
      };

      await expect(service.enrollInCourse(dto, mockEmployee)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should reject enrollment if course is inactive', async () => {
      const inactiveCourse = structuredClone(mockCourseRecord);
      inactiveCourse.status = 'inactive';

      prisma.course.findUnique.mockResolvedValue(inactiveCourse);

      const dto = {
        course_id: 'CRS-001',
        employee_id: 'EMP001',
        employee_name: 'Somchai Prasert',
      };

      await expect(service.enrollInCourse(dto, mockEmployee)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should cancel enrollment with reason', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollmentRecord));
      prisma.enrollment.update.mockResolvedValue({
        ...structuredClone(mockEnrollmentRecord),
        status: 'cancelled',
        cancelled_at: new Date(),
        cancellation_reason: 'Schedule conflict',
      });

      const result = await service.cancelEnrollment('ENR-001', 'Schedule conflict', mockEmployee);

      expect(result.status).toBe('cancelled');
      expect(result.cancellation_reason).toBe('Schedule conflict');
    });

    it('should reject cancellation by non-owner (unless HR)', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollmentRecord));

      await expect(
        service.cancelEnrollment('ENR-001', 'Not my business', mockEmployee2),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should allow HR to cancel any enrollment', async () => {
      prisma.enrollment.findUnique.mockResolvedValue(structuredClone(mockEnrollmentRecord));
      prisma.enrollment.update.mockResolvedValue({
        ...structuredClone(mockEnrollmentRecord),
        status: 'cancelled',
        cancelled_at: new Date(),
        cancellation_reason: 'Course discontinued',
      });

      const result = await service.cancelEnrollment('ENR-001', 'Course discontinued', mockHrAdmin);

      expect(result.status).toBe('cancelled');
    });

    it('should list my enrollments', async () => {
      prisma.enrollment.findMany.mockResolvedValue([structuredClone(mockEnrollmentRecord)]);

      const result = await service.getMyEnrollments(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
    });
  });

  // ── Training History ────────────────────────────────────────────

  describe('Training History', () => {
    it('should return training history for employee', async () => {
      prisma.trainingRecord.findMany.mockResolvedValue([structuredClone(mockTrainingRecord)]);

      const result = await service.getTrainingHistory('EMP001', mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
      expect(result[0].course_code).toBe('LDR-101');
    });

    it('should allow employee to view their own history', async () => {
      prisma.trainingRecord.findMany.mockResolvedValue([structuredClone(mockTrainingRecord)]);

      const result = await service.getTrainingHistory('EMP001', mockEmployee);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });

    it('should allow HR to view any employee\'s history', async () => {
      prisma.trainingRecord.findMany.mockResolvedValue([structuredClone(mockTrainingRecord)]);

      const result = await service.getTrainingHistory('EMP001', mockHrAdmin);

      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });

    it('should reject non-HR viewing another employee\'s history', async () => {
      await expect(
        service.getTrainingHistory('EMP001', mockEmployee2),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should mark training as complete with scores', async () => {
      prisma.trainingRecord.create.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.enrollment.update.mockResolvedValue({
        ...structuredClone(mockEnrollmentRecord),
        status: 'completed',
      });

      const dto = {
        enrollment_id: 'ENR-001',
        employee_id: 'EMP001',
        course_code: 'LDR-101',
        course_name_en: 'Leadership Fundamentals',
        course_name_th: 'หลักสูตรภาวะผู้นำเบื้องต้น',
        training_type: 'internal',
        category: 'leadership',
        provider: 'Central Retail Academy',
        start_date: '2026-02-10',
        end_date: '2026-02-12',
        duration_hours: 16,
        pre_assessment_score: 65,
        post_assessment_score: 88,
      };

      const result = await service.completeTraining(dto as any, mockEmployee);

      expect(result).toBeDefined();
      expect(result.status).toBe('completed');
      expect(result.pre_assessment_score).toBe(65);
      expect(result.post_assessment_score).toBe(88);
    });

    it('should create audit log for completion', async () => {
      prisma.trainingRecord.create.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.enrollment.update.mockResolvedValue({});

      const dto = {
        enrollment_id: 'ENR-001',
        employee_id: 'EMP001',
        course_code: 'LDR-101',
        course_name_en: 'Leadership Fundamentals',
        training_type: 'internal',
        category: 'leadership',
        start_date: '2026-02-10',
        duration_hours: 16,
      };

      await service.completeTraining(dto as any, mockEmployee);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'training_record',
            action: 'complete',
            performed_by: 'EMP001',
          }),
        }),
      );
    });
  });

  // ── Kirkpatrick Evaluation ──────────────────────────────────────

  describe('Kirkpatrick Evaluation', () => {
    it('should submit reaction evaluation (level 1)', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.trainingEvaluation.create.mockResolvedValue({
        id: 'EVAL-001',
        training_record_id: 'TR-001',
        reaction_score: 4.5,
        learning_score: null,
        behavior_score: null,
        results_score: null,
        evaluated_by: 'EMP001',
        evaluated_at: new Date(),
      });

      const dto = {
        training_record_id: 'TR-001',
        reaction_score: 4.5,
      };

      const result = await service.submitEvaluation(dto, mockEmployee);

      expect(result).toBeDefined();
      expect(result.reaction_score).toBe(4.5);
      expect(result.training_record_id).toBe('TR-001');
    });

    it('should submit learning evaluation (level 2)', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.trainingEvaluation.create.mockResolvedValue({
        id: 'EVAL-002',
        training_record_id: 'TR-001',
        reaction_score: null,
        learning_score: 4.0,
        behavior_score: null,
        results_score: null,
        evaluated_by: 'EMP001',
        evaluated_at: new Date(),
      });

      const dto = {
        training_record_id: 'TR-001',
        learning_score: 4.0,
      };

      const result = await service.submitEvaluation(dto, mockEmployee);

      expect(result.learning_score).toBe(4.0);
    });

    it('should submit behavior evaluation (level 3)', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.trainingEvaluation.create.mockResolvedValue({
        id: 'EVAL-003',
        training_record_id: 'TR-001',
        reaction_score: null,
        learning_score: null,
        behavior_score: 3.8,
        results_score: null,
        evaluated_by: 'HR001',
        evaluated_at: new Date(),
      });

      const dto = {
        training_record_id: 'TR-001',
        behavior_score: 3.8,
      };

      const result = await service.submitEvaluation(dto, mockHrAdmin);

      expect(result.behavior_score).toBe(3.8);
    });

    it('should submit results evaluation (level 4)', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.trainingEvaluation.create.mockResolvedValue({
        id: 'EVAL-004',
        training_record_id: 'TR-001',
        reaction_score: null,
        learning_score: null,
        behavior_score: null,
        results_score: 4.2,
        evaluated_by: 'HRM001',
        evaluated_at: new Date(),
      });

      const dto = {
        training_record_id: 'TR-001',
        results_score: 4.2,
      };

      const result = await service.submitEvaluation(dto, mockHrManager);

      expect(result.results_score).toBe(4.2);
    });

    it('should validate score range (0-5)', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));

      const dto = {
        training_record_id: 'TR-001',
        reaction_score: 6.0, // out of range
      };

      await expect(service.submitEvaluation(dto, mockEmployee)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should reject negative scores', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));

      const dto = {
        training_record_id: 'TR-001',
        learning_score: -1,
      };

      await expect(service.submitEvaluation(dto, mockEmployee)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should get evaluations for training record', async () => {
      const evaluations = [
        {
          id: 'EVAL-001',
          training_record_id: 'TR-001',
          reaction_score: 4.5,
          learning_score: 4.0,
          behavior_score: null,
          results_score: null,
          evaluated_by: 'EMP001',
          evaluated_at: new Date(),
        },
      ];

      prisma.trainingRecord.findUnique.mockResolvedValue({
        ...structuredClone(mockTrainingRecord),
        evaluations,
      });

      const result = await service.getEvaluations('TR-001');

      expect(result).toHaveLength(1);
      expect(result[0].reaction_score).toBe(4.5);
      expect(result[0].learning_score).toBe(4.0);
    });

    it('should throw NotFoundException for non-existent training record', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(null);

      await expect(service.getEvaluations('TR-NONEXIST')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ── Certificates ────────────────────────────────────────────────

  describe('Certificates', () => {
    it('should issue certificate (HR only)', async () => {
      prisma.certificate.create.mockResolvedValue(structuredClone(mockCertificateRecord));
      prisma.trainingRecord.update.mockResolvedValue({});

      const dto = {
        employee_id: 'EMP001',
        training_record_id: 'TR-001',
        certificate_number: 'CG-LDR-2026-0001',
        course_name: 'Leadership Fundamentals',
        issue_date: '2026-02-15',
        expiry_date: '2028-02-15',
        issuing_authority: 'Central Retail Academy',
      };

      const result = await service.issueCertificate(dto as any, mockHrAdmin);

      expect(result).toBeDefined();
      expect(result.certificate_number).toBe('CG-LDR-2026-0001');
      expect(result.employee_id).toBe('EMP001');
      expect(result.status).toBe('active');
    });

    it('should reject certificate issuance by non-HR', async () => {
      const dto = {
        employee_id: 'EMP001',
        certificate_number: 'CG-LDR-2026-0001',
        course_name: 'Leadership Fundamentals',
        issue_date: '2026-02-15',
      };

      await expect(
        service.issueCertificate(dto as any, mockEmployee),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should get my certificates', async () => {
      prisma.certificate.findMany.mockResolvedValue([structuredClone(mockCertificateRecord)]);

      const result = await service.getMyCertificates(mockEmployee);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
      expect(result[0].certificate_number).toBe('CG-LDR-2026-0001');
    });

    it('should get certificates by employee (HR access)', async () => {
      prisma.certificate.findMany.mockResolvedValue([structuredClone(mockCertificateRecord)]);

      const result = await service.getCertificatesByEmployee('EMP001', mockHrAdmin);

      expect(result).toHaveLength(1);
      expect(result[0].employee_id).toBe('EMP001');
    });

    it('should allow employee to view their own certificates', async () => {
      prisma.certificate.findMany.mockResolvedValue([structuredClone(mockCertificateRecord)]);

      const result = await service.getCertificatesByEmployee('EMP001', mockEmployee);

      expect(result).toHaveLength(1);
    });

    it('should reject non-HR viewing another employee\'s certificates', async () => {
      await expect(
        service.getCertificatesByEmployee('EMP001', mockEmployee2),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should create audit log for certificate issuance', async () => {
      prisma.certificate.create.mockResolvedValue(structuredClone(mockCertificateRecord));
      prisma.trainingRecord.update.mockResolvedValue({});

      const dto = {
        employee_id: 'EMP001',
        training_record_id: 'TR-001',
        certificate_number: 'CG-LDR-2026-0001',
        course_name: 'Leadership Fundamentals',
        issue_date: '2026-02-15',
      };

      await service.issueCertificate(dto as any, mockHrAdmin);

      expect(prisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            entity_type: 'certificate',
            action: 'issue',
            performed_by: 'HR001',
          }),
        }),
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { TrainingRecordService } from '../../src/training-record/training-record.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  trainingRecord: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  kirkpatrickEvaluation: {
    findMany: jest.fn(),
    upsert: jest.fn(),
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

const mockManagerUser: CurrentUserInterface = {
  id: 'MGR001',
  email: 'manager@centralgroup.com',
  username: 'manager',
  firstName: 'Manager',
  lastName: 'User',
  roles: ['manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'employee@centralgroup.com',
  username: 'employee',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

const mockTrainingRecord = {
  id: 'tr-1',
  course_code: 'CG-LEAD-001',
  course_name_en: 'Leadership Excellence Program',
  course_name_th: 'โปรแกรมพัฒนาความเป็นผู้นำ',
  employee_id: 'EMP001',
  training_type: 'internal',
  category: 'leadership',
  provider: 'Central Group Academy',
  instructor_name: 'Dr. Somchai',
  start_date: new Date('2025-03-15'),
  end_date: new Date('2025-03-17'),
  duration_hours: 24,
  location: 'Central World, Bangkok',
  status: 'completed',
  completion_date: new Date('2025-03-17'),
  certificate_id: 'CERT-2025-001',
  cost: 45000,
  currency: 'THB',
  paid_by: 'company',
  pre_assessment_score: 65,
  post_assessment_score: 88,
  evaluations: [] as any[],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('TrainingRecordService', () => {
  let service: TrainingRecordService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingRecordService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TrainingRecordService>(TrainingRecordService);
    prisma = mockPrismaService;
  });

  describe('findByEmployee', () => {
    it('should return training records with evaluations for employee', async () => {
      prisma.trainingRecord.findMany.mockResolvedValue([structuredClone(mockTrainingRecord)]);

      const result = await service.findByEmployee('EMP001');

      expect(result).toHaveLength(1);
      expect(result[0].course_code).toBe('CG-LEAD-001');
      expect(result[0].employee_id).toBe('EMP001');
    });
  });

  describe('findById', () => {
    it('should return training record by ID', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));

      const result = await service.findById('tr-1');

      expect(result).toBeDefined();
      expect(result.id).toBe('tr-1');
    });

    it('should throw NotFoundException for non-existent record', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create training record when HR', async () => {
      const dto = {
        course_code: 'CG-TECH-042',
        course_name_en: 'Advanced Data Analytics',
        employee_id: 'EMP001',
        training_type: 'external',
        category: 'technical',
        start_date: new Date('2025-06-10'),
        end_date: new Date('2025-06-14'),
        duration_hours: 40,
      };
      prisma.trainingRecord.create.mockResolvedValue({ id: 'tr-new', ...dto, evaluations: [] });

      const result = await service.create(dto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.course_code).toBe('CG-TECH-042');
    });

    it('should reject creation by non-HR', async () => {
      await expect(
        service.create({ course_code: 'TEST', course_name_en: 'Test', employee_id: 'EMP001' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should require course_code, course_name_en, and employee_id', async () => {
      await expect(
        service.create({ course_code: 'TEST' }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('addKirkpatrickEvaluation', () => {
    it('should add Level 1 (Reaction) evaluation', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.kirkpatrickEvaluation.upsert.mockResolvedValue({
        id: 'eval-1',
        training_record_id: 'tr-1',
        level: 1,
        level_name: 'reaction',
        score: 4.5,
        evaluator_id: 'HR001',
      });

      const result = await service.addKirkpatrickEvaluation(
        'tr-1',
        { level: 1, score: 4.5, comments: 'Great course' },
        mockHrUser,
      );

      expect(result.level).toBe(1);
      expect(result.level_name).toBe('reaction');
      expect(result.score).toBe(4.5);
    });

    it('should add Level 4 (Results) evaluation', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));
      prisma.kirkpatrickEvaluation.upsert.mockResolvedValue({
        id: 'eval-4',
        training_record_id: 'tr-1',
        level: 4,
        level_name: 'results',
        score: 3.8,
        evidence: '15% increase in team productivity',
      });

      const result = await service.addKirkpatrickEvaluation(
        'tr-1',
        { level: 4, score: 3.8, evidence: '15% increase in team productivity' },
        mockManagerUser,
      );

      expect(result.level).toBe(4);
      expect(result.level_name).toBe('results');
    });

    it('should reject invalid Kirkpatrick level', async () => {
      prisma.trainingRecord.findUnique.mockResolvedValue(structuredClone(mockTrainingRecord));

      await expect(
        service.addKirkpatrickEvaluation('tr-1', { level: 5, score: 4.0 }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject evaluation by regular employee', async () => {
      await expect(
        service.addKirkpatrickEvaluation('tr-1', { level: 1, score: 4.0 }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getCertificates', () => {
    it('should return certificates for completed training', async () => {
      prisma.trainingRecord.findMany.mockResolvedValue([
        {
          id: 'tr-1',
          course_code: 'CG-LEAD-001',
          course_name_en: 'Leadership Excellence',
          certificate_id: 'CERT-2025-001',
          completion_date: new Date('2025-03-17'),
          category: 'leadership',
        },
      ]);

      const result = await service.getCertificates('EMP001');

      expect(result).toHaveLength(1);
      expect(result[0].certificate_id).toBe('CERT-2025-001');
    });
  });
});

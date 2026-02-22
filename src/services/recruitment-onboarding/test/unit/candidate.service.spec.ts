import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CandidateService } from '../../src/candidate/candidate.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  candidate: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  jobPosting: {
    findUnique: jest.fn(),
  },
  screening: {
    create: jest.fn(),
    findUnique: jest.fn(),
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

const mockCandidate = {
  id: 'cand-1',
  job_posting_id: 'job-1',
  first_name: 'Somchai',
  last_name: 'Jaidee',
  email: 'somchai@email.com',
  phone: '+66 89 123 4567',
  status: 'applied',
  current_stage: 'screening',
  applied_date: new Date(),
  screenings: [] as any[],
  job_posting: { id: 'job-1', position_title: 'Senior Software Engineer' } as any,
};

const mockScreening = {
  id: 'scr-1',
  candidate_id: 'cand-1',
  stage: 'phone_screen',
  status: 'pending',
  scheduled_date: new Date(),
};

describe('CandidateService', () => {
  let service: CandidateService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
    prisma = mockPrismaService;
  });

  describe('findByJobPosting', () => {
    it('should return candidates for a job posting with screenings', async () => {
      prisma.candidate.findMany.mockResolvedValue([structuredClone(mockCandidate)]);

      const result = await service.findByJobPosting('job-1');

      expect(result).toHaveLength(1);
      expect(result[0].first_name).toBe('Somchai');
    });
  });

  describe('findById', () => {
    it('should return candidate with job posting and screenings', async () => {
      prisma.candidate.findUnique.mockResolvedValue(structuredClone(mockCandidate));

      const result = await service.findById('cand-1');

      expect(result).toBeDefined();
      expect(result.first_name).toBe('Somchai');
      expect(result.job_posting).toBeDefined();
    });

    it('should throw NotFoundException for non-existent candidate', async () => {
      prisma.candidate.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create candidate when HR', async () => {
      const dto = {
        first_name: 'Nattaya',
        last_name: 'Srisuwan',
        email: 'nattaya@email.com',
        job_posting_id: 'job-1',
      };
      prisma.jobPosting.findUnique.mockResolvedValue({ id: 'job-1' });
      prisma.candidate.create.mockResolvedValue({ id: 'cand-new', ...dto, screenings: [] });

      const result = await service.create(dto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.first_name).toBe('Nattaya');
    });

    it('should reject creation by non-HR', async () => {
      await expect(
        service.create({ first_name: 'Test', last_name: 'User', email: 'test@email.com', job_posting_id: 'job-1' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should require first_name, last_name, email, and job_posting_id', async () => {
      await expect(
        service.create({ first_name: 'Test' }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject if job posting not found', async () => {
      prisma.jobPosting.findUnique.mockResolvedValue(null);

      await expect(
        service.create({ first_name: 'Test', last_name: 'User', email: 'test@email.com', job_posting_id: 'nonexist' }, mockHrUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStatus', () => {
    it('should update candidate status through pipeline stages', async () => {
      prisma.candidate.findUnique.mockResolvedValue(structuredClone(mockCandidate));
      prisma.candidate.update.mockResolvedValue({ ...mockCandidate, status: 'interviewing', current_stage: 'interviewing' });

      const result = await service.updateStatus('cand-1', 'interviewing', mockHrUser);

      expect(result.status).toBe('interviewing');
      expect(result.current_stage).toBe('interviewing');
    });

    it('should reject invalid status values', async () => {
      prisma.candidate.findUnique.mockResolvedValue(structuredClone(mockCandidate));

      await expect(
        service.updateStatus('cand-1', 'invalid_status', mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject status update by employee', async () => {
      await expect(
        service.updateStatus('cand-1', 'interviewing', mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('addScreening', () => {
    it('should add screening stage to candidate', async () => {
      prisma.candidate.findUnique.mockResolvedValue(structuredClone(mockCandidate));
      prisma.screening.create.mockResolvedValue({
        id: 'scr-new',
        candidate_id: 'cand-1',
        stage: 'technical_interview',
        status: 'pending',
      });

      const result = await service.addScreening('cand-1', { stage: 'technical_interview' }, mockHrUser);

      expect(result).toBeDefined();
      expect(result.stage).toBe('technical_interview');
      expect(result.status).toBe('pending');
    });
  });

  describe('completeScreening', () => {
    it('should complete screening with score and feedback', async () => {
      prisma.screening.findUnique.mockResolvedValue(structuredClone(mockScreening));
      prisma.screening.update.mockResolvedValue({
        ...mockScreening,
        status: 'completed',
        score: 85,
        feedback: 'Strong technical skills',
        recommendation: 'proceed',
      });

      const result = await service.completeScreening(
        'scr-1',
        { score: 85, feedback: 'Strong technical skills', recommendation: 'proceed' },
        mockHrUser,
      );

      expect(result.status).toBe('completed');
      expect(result.score).toBe(85);
      expect(result.recommendation).toBe('proceed');
    });
  });

  describe('getPipeline', () => {
    it('should return candidates grouped by pipeline stage', async () => {
      prisma.candidate.findMany.mockResolvedValue([
        { ...mockCandidate, current_stage: 'applied' },
        { ...mockCandidate, id: 'cand-2', current_stage: 'screening' },
        { ...mockCandidate, id: 'cand-3', current_stage: 'interviewing' },
      ]);

      const result = await service.getPipeline('job-1');

      expect(result).toBeDefined();
      expect(result.applied).toHaveLength(1);
      expect(result.screening).toHaveLength(1);
      expect(result.interviewing).toHaveLength(1);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JobPostingService } from '../../src/job-posting/job-posting.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  jobPosting: {
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

const mockJobPosting = {
  id: 'job-1',
  position_title: 'Senior Software Engineer',
  position_title_th: 'วิศวกรซอฟต์แวร์อาวุโส',
  department: 'Information Technology',
  department_th: 'ฝ่ายเทคโนโลยีสารสนเทศ',
  company: 'Central Retail Corporation',
  location: 'Bangkok',
  employment_type: 'full_time',
  salary_range_min: 80000,
  salary_range_max: 120000,
  currency: 'THB',
  status: 'open',
  headcount: 2,
  filled_count: 0,
  hiring_manager_id: 'MGR001',
  candidates: [] as any[],
  created_at: new Date(),
  updated_at: new Date(),
};

describe('JobPostingService', () => {
  let service: JobPostingService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobPostingService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<JobPostingService>(JobPostingService);
    prisma = mockPrismaService;
  });

  describe('findAll', () => {
    it('should return all job postings with candidate counts', async () => {
      prisma.jobPosting.findMany.mockResolvedValue([structuredClone(mockJobPosting)]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].position_title).toBe('Senior Software Engineer');
    });

    it('should filter by status and department', async () => {
      prisma.jobPosting.findMany.mockResolvedValue([]);

      await service.findAll({ status: 'open', department: 'IT' });

      expect(prisma.jobPosting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'open', department: 'IT' },
        }),
      );
    });
  });

  describe('findById', () => {
    it('should return job posting with candidates', async () => {
      prisma.jobPosting.findUnique.mockResolvedValue(structuredClone(mockJobPosting));

      const result = await service.findById('job-1');

      expect(result).toBeDefined();
      expect(result.position_title).toBe('Senior Software Engineer');
    });

    it('should throw NotFoundException for non-existent posting', async () => {
      prisma.jobPosting.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create job posting when HR', async () => {
      const dto = {
        position_title: 'HR Business Partner',
        department: 'Human Resources',
      };
      prisma.jobPosting.create.mockResolvedValue({ id: 'job-new', ...dto, status: 'draft' });

      const result = await service.create(dto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.status).toBe('draft');
    });

    it('should allow managers to create postings', async () => {
      const dto = {
        position_title: 'Team Lead',
        department: 'Engineering',
      };
      prisma.jobPosting.create.mockResolvedValue({ id: 'job-new', ...dto, status: 'draft' });

      const result = await service.create(dto, mockManagerUser);

      expect(result).toBeDefined();
    });

    it('should reject creation by employee', async () => {
      await expect(
        service.create({ position_title: 'Test', department: 'Test' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should require position_title and department', async () => {
      await expect(
        service.create({ position_title: 'Test' }, mockHrUser),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('publish', () => {
    it('should publish job posting when HR', async () => {
      prisma.jobPosting.findUnique.mockResolvedValue(structuredClone(mockJobPosting));
      prisma.jobPosting.update.mockResolvedValue({ ...mockJobPosting, status: 'open' });

      const result = await service.publish('job-1', mockHrUser);

      expect(result.status).toBe('open');
    });

    it('should reject publish by non-HR', async () => {
      await expect(service.publish('job-1', mockManagerUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('close', () => {
    it('should close job posting when HR', async () => {
      prisma.jobPosting.findUnique.mockResolvedValue(structuredClone(mockJobPosting));
      prisma.jobPosting.update.mockResolvedValue({ ...mockJobPosting, status: 'closed' });

      const result = await service.close('job-1', mockHrUser);

      expect(result.status).toBe('closed');
    });
  });
});

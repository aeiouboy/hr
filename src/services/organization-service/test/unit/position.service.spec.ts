import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PositionService } from '../../src/position/position.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPrismaService = {
  position: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  department: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
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
  email: 'chongrak.t@centralgroup.com',
  username: 'chongrak.t',
  firstName: 'Chongrak',
  lastName: 'Tanaka',
  roles: ['employee'],
};

const mockPosition = {
  id: 'POS001',
  position_code: '40128307',
  title_en: 'Product Manager',
  title_th: 'ผู้จัดการผลิตภัณฑ์',
  department_id: 'D001',
  company_id: 'C015',
  job_grade: 'M2',
  job_family: 'IT',
  cost_center: 'CC001',
  status: 'active',
  reports_to_position_id: 'POS002',
  headcount: 5,
  budget: 6,
  department: {
    id: 'D001',
    code: '30040490',
    name_en: 'Product Management',
    name_th: 'ฝ่ายจัดการผลิตภัณฑ์',
    company_id: 'C015',
  },
  incumbents: [
    {
      id: 'INC001',
      employee_id: 'EMP001',
      position_id: 'POS001',
      start_date: new Date('2022-01-01'),
      is_primary: true,
    },
  ],
};

const mockDepartment = {
  id: 'D001',
  code: '30040490',
  name_en: 'Product Management',
  name_th: 'ฝ่ายจัดการผลิตภัณฑ์',
  company_id: 'C015',
  parent_department_id: 'D000',
  cost_center: 'CC-RIS-PM-001',
  headcount: 25,
};

describe('PositionService', () => {
  let service: PositionService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PositionService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PositionService>(PositionService);
    prisma = mockPrismaService;
  });

  describe('findById', () => {
    it('should return a position with department and incumbents', async () => {
      prisma.position.findUnique.mockResolvedValue(mockPosition);

      const result = await service.findById('POS001');

      expect(result).toBeDefined();
      expect(result.id).toBe('POS001');
      expect(result.title_en).toBe('Product Manager');
      expect(result.department).toBeDefined();
      expect(result.department.name_en).toBe('Product Management');
      expect(result.incumbents).toHaveLength(1);
    });

    it('should throw NotFoundException for non-existent position', async () => {
      prisma.position.findUnique.mockResolvedValue(null);

      await expect(service.findById('NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return paginated list of positions', async () => {
      prisma.position.findMany.mockResolvedValue([mockPosition]);
      prisma.position.count.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.data[0].title_en).toBe('Product Manager');
    });

    it('should filter positions by department', async () => {
      prisma.position.findMany.mockResolvedValue([mockPosition]);
      prisma.position.count.mockResolvedValue(1);

      const result = await service.findAll({ department_id: 'D001', page: 1, limit: 10 });

      expect(prisma.position.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ department_id: 'D001' }),
        }),
      );
    });

    it('should filter positions by status', async () => {
      prisma.position.findMany.mockResolvedValue([]);
      prisma.position.count.mockResolvedValue(0);

      await service.findAll({ status: 'vacant', page: 1, limit: 10 });

      expect(prisma.position.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'vacant' }),
        }),
      );
    });

    it('should filter positions by company', async () => {
      prisma.position.findMany.mockResolvedValue([mockPosition]);
      prisma.position.count.mockResolvedValue(1);

      await service.findAll({ company_id: 'C015', page: 1, limit: 10 });

      expect(prisma.position.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ company_id: 'C015' }),
        }),
      );
    });
  });

  describe('create', () => {
    const createDto = {
      position_code: '40128355',
      title_en: 'New Position',
      title_th: 'ตำแหน่งใหม่',
      department_id: 'D001',
      company_id: 'C015',
      job_grade: 'M3',
      job_family: 'IT',
      cost_center: 'CC001',
      reports_to_position_id: 'POS002',
      headcount: 1,
    };

    it('should create a new position (HR only)', async () => {
      const created = { id: 'POS_NEW', ...createDto, status: 'active' };
      prisma.position.create.mockResolvedValue(created);

      const result = await service.create(createDto, mockHrAdminUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('POS_NEW');
      expect(result.title_en).toBe('New Position');
    });

    it('should reject creation by non-HR users', async () => {
      await expect(service.create(createDto, mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('update', () => {
    it('should update position details (HR only)', async () => {
      prisma.position.findUnique.mockResolvedValue(mockPosition);
      prisma.position.update.mockResolvedValue({
        ...mockPosition,
        title_en: 'Senior Product Manager',
      });

      const result = await service.update('POS001', { title_en: 'Senior Product Manager' }, mockHrAdminUser);

      expect(result.title_en).toBe('Senior Product Manager');
    });

    it('should reject update by non-HR users', async () => {
      await expect(
        service.update('POS001', { title_en: 'Hack' }, mockEmployeeUser),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException for non-existent position', async () => {
      prisma.position.findUnique.mockResolvedValue(null);

      await expect(
        service.update('NONEXIST', { title_en: 'X' }, mockHrAdminUser),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a position (HR only)', async () => {
      prisma.position.findUnique.mockResolvedValue(mockPosition);
      prisma.position.delete.mockResolvedValue(mockPosition);

      await expect(service.delete('POS001', mockHrAdminUser)).resolves.not.toThrow();
    });

    it('should reject deletion by non-HR users', async () => {
      await expect(service.delete('POS001', mockEmployeeUser)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('getDepartments', () => {
    it('should return list of departments', async () => {
      prisma.department.findMany.mockResolvedValue([mockDepartment]);

      const result = await service.getDepartments();

      expect(result).toHaveLength(1);
      expect(result[0].name_en).toBe('Product Management');
    });

    it('should filter departments by company', async () => {
      prisma.department.findMany.mockResolvedValue([mockDepartment]);

      await service.getDepartments('C015');

      expect(prisma.department.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { company_id: 'C015' },
        }),
      );
    });
  });
});

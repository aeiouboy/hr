import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OrgChartService } from '../../src/org-chart/org-chart.service';
import { PrismaService } from '../../src/prisma/prisma.service';

const mockPrismaService = {
  orgNode: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  reportingLine: {
    findMany: jest.fn(),
  },
  department: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  position: {
    findMany: jest.fn(),
  },
};

const mockOrgNodes = [
  {
    id: 'EMP_SUP001',
    employee_id: 'EMP_SUP001',
    name_en: 'Rungrote Amnuaysopon',
    name_th: 'รุ่งโรจน์ อำนวยสพน',
    position_title_en: 'Head of Product',
    department_id: 'D001',
    company_id: 'C015',
    photo_url: 'https://i.pravatar.cc/150?img=12',
    email: 'rungrote.a@central.co.th',
  },
  {
    id: 'EMP001',
    employee_id: 'EMP001',
    name_en: 'Chongrak Tanaka',
    name_th: 'จงรักษ์ ทานากะ',
    position_title_en: 'Product Manager',
    department_id: 'D001',
    company_id: 'C015',
    photo_url: 'https://i.pravatar.cc/150?img=11',
    email: 'chongrak.t@central.co.th',
  },
  {
    id: 'EMP_DR001',
    employee_id: 'EMP_DR001',
    name_en: 'Naruechon Woraphatphawan',
    name_th: 'นฤชล วรพัฒน์พาวัลย์',
    position_title_en: 'Functional Trainee',
    department_id: 'D001',
    company_id: 'C015',
    photo_url: 'https://i.pravatar.cc/150?img=14',
    email: 'naruechon.w@central.co.th',
  },
  {
    id: 'EMP_DR002',
    employee_id: 'EMP_DR002',
    name_en: 'Punnapa Thianchai',
    name_th: 'ปุณณภา เทียนชัย',
    position_title_en: 'Functional Trainee',
    department_id: 'D001',
    company_id: 'C015',
    photo_url: 'https://i.pravatar.cc/150?img=15',
    email: 'punnapa.t@central.co.th',
  },
];

const mockReportingLines = [
  { id: 'RL002', from_employee_id: 'EMP_SUP001', to_employee_id: 'EMP_SUP002', type: 'solid' },
  { id: 'RL003', from_employee_id: 'EMP001', to_employee_id: 'EMP_SUP001', type: 'solid' },
  { id: 'RL004', from_employee_id: 'EMP_DR001', to_employee_id: 'EMP001', type: 'solid' },
  { id: 'RL005', from_employee_id: 'EMP_DR002', to_employee_id: 'EMP001', type: 'solid' },
];

describe('OrgChartService', () => {
  let service: OrgChartService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrgChartService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrgChartService>(OrgChartService);
    prisma = mockPrismaService;
  });

  describe('getOrgChart', () => {
    it('should return tree structure for an employee', async () => {
      prisma.orgNode.findUnique.mockResolvedValue(mockOrgNodes[1]); // EMP001
      prisma.reportingLine.findMany.mockResolvedValue(
        mockReportingLines.filter((rl) => rl.to_employee_id === 'EMP001' && rl.type === 'solid'),
      );
      // Mock recursive calls for children
      prisma.orgNode.findMany.mockResolvedValue([mockOrgNodes[2], mockOrgNodes[3]]);

      const result = await service.getOrgChart('EMP001');

      expect(result).toBeDefined();
      expect(result.id).toBe('EMP001');
      expect(result.name_en).toBe('Chongrak Tanaka');
      expect(result.children).toBeDefined();
    });

    it('should throw NotFoundException for non-existent employee', async () => {
      prisma.orgNode.findUnique.mockResolvedValue(null);

      await expect(service.getOrgChart('NONEXIST')).rejects.toThrow(NotFoundException);
    });

    it('should include direct reports as children nodes', async () => {
      prisma.orgNode.findUnique.mockResolvedValue(mockOrgNodes[1]);
      prisma.reportingLine.findMany.mockImplementation(({ where }) => {
        if (where.to_employee_id === 'EMP001') {
          return Promise.resolve([
            { id: 'RL004', from_employee_id: 'EMP_DR001', to_employee_id: 'EMP001', type: 'solid' },
            { id: 'RL005', from_employee_id: 'EMP_DR002', to_employee_id: 'EMP001', type: 'solid' },
          ]);
        }
        return Promise.resolve([]);
      });
      prisma.orgNode.findMany.mockResolvedValue([mockOrgNodes[2], mockOrgNodes[3]]);

      const result = await service.getOrgChart('EMP001');

      expect(result.children).toBeDefined();
      expect(result.children).toHaveLength(2);
      expect(result.children[0].name_en).toBe('Naruechon Woraphatphawan');
      expect(result.children[1].name_en).toBe('Punnapa Thianchai');
    });

    it('should include position and department info in each node', async () => {
      prisma.orgNode.findUnique.mockResolvedValue(mockOrgNodes[1]);
      prisma.reportingLine.findMany.mockResolvedValue([]);
      prisma.orgNode.findMany.mockResolvedValue([]);

      const result = await service.getOrgChart('EMP001');

      expect(result.position_title_en).toBe('Product Manager');
      expect(result.department_id).toBe('D001');
      expect(result.email).toBe('chongrak.t@central.co.th');
    });
  });

  describe('getManager', () => {
    it('should return the manager of an employee', async () => {
      prisma.reportingLine.findMany.mockResolvedValue([
        { id: 'RL003', from_employee_id: 'EMP001', to_employee_id: 'EMP_SUP001', type: 'solid' },
      ]);
      prisma.orgNode.findUnique.mockResolvedValue(mockOrgNodes[0]);

      const result = await service.getManager('EMP001');

      expect(result).toBeDefined();
      expect(result.id).toBe('EMP_SUP001');
      expect(result.name_en).toBe('Rungrote Amnuaysopon');
    });

    it('should return null for top-level employee with no manager', async () => {
      prisma.reportingLine.findMany.mockResolvedValue([]);

      const result = await service.getManager('EMP_L0');

      expect(result).toBeNull();
    });
  });

  describe('getDirectReports', () => {
    it('should return direct reports for an employee', async () => {
      prisma.reportingLine.findMany.mockResolvedValue([
        { id: 'RL004', from_employee_id: 'EMP_DR001', to_employee_id: 'EMP001', type: 'solid' },
        { id: 'RL005', from_employee_id: 'EMP_DR002', to_employee_id: 'EMP001', type: 'solid' },
      ]);
      prisma.orgNode.findMany.mockResolvedValue([mockOrgNodes[2], mockOrgNodes[3]]);

      const result = await service.getDirectReports('EMP001');

      expect(result).toHaveLength(2);
      expect(result[0].name_en).toBe('Naruechon Woraphatphawan');
      expect(result[1].name_en).toBe('Punnapa Thianchai');
    });

    it('should return empty array for employee with no direct reports', async () => {
      prisma.reportingLine.findMany.mockResolvedValue([]);
      prisma.orgNode.findMany.mockResolvedValue([]);

      const result = await service.getDirectReports('EMP_DR001');

      expect(result).toHaveLength(0);
    });
  });
});

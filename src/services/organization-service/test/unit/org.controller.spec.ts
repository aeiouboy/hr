import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { PositionController } from '../../src/position/position.controller';
import { PositionService } from '../../src/position/position.service';
import { TransferController } from '../../src/transfer/transfer.controller';
import { TransferService } from '../../src/transfer/transfer.service';
import { OrgChartController } from '../../src/org-chart/org-chart.controller';
import { OrgChartService } from '../../src/org-chart/org-chart.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPositionService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getDepartments: jest.fn(),
};

const mockTransferService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  approve: jest.fn(),
  reject: jest.fn(),
};

const mockOrgChartService = {
  getOrgChart: jest.fn(),
  getManager: jest.fn(),
  getDirectReports: jest.fn(),
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
  email: 'emp@centralgroup.com',
  username: 'emp.user',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

describe('Organization Controllers', () => {
  let positionController: PositionController;
  let transferController: TransferController;
  let orgChartController: OrgChartController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionController, TransferController, OrgChartController],
      providers: [
        { provide: PositionService, useValue: mockPositionService },
        { provide: TransferService, useValue: mockTransferService },
        { provide: OrgChartService, useValue: mockOrgChartService },
      ],
    }).compile();

    positionController = module.get<PositionController>(PositionController);
    transferController = module.get<TransferController>(TransferController);
    orgChartController = module.get<OrgChartController>(OrgChartController);
  });

  describe('GET /api/v1/positions', () => {
    it('should return 200 with paginated positions', async () => {
      const mockResult = {
        data: [{ id: 'pos-001', title_en: 'Product Manager' }],
        total: 1,
        page: 1,
        limit: 10,
      };
      mockPositionService.findAll.mockResolvedValue(mockResult);

      const result = await positionController.findAll();

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should pass filter parameters to service', async () => {
      mockPositionService.findAll.mockResolvedValue({ data: [], total: 0, page: 1, limit: 10 });

      await positionController.findAll('dept-001', undefined, 'active', '1', '20');

      expect(mockPositionService.findAll).toHaveBeenCalledWith({
        department_id: 'dept-001',
        company_id: undefined,
        status: 'active',
        page: 1,
        limit: 20,
      });
    });
  });

  describe('POST /api/v1/positions', () => {
    it('should return 201 for HR creating position', async () => {
      const dto = { position_code: '123', title_en: 'New Pos', department_id: 'dept-001', company_id: 'C015' };
      mockPositionService.create.mockResolvedValue({ id: 'pos-new', ...dto });

      const result = await positionController.create(dto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.id).toBe('pos-new');
      expect(mockPositionService.create).toHaveBeenCalledWith(dto, mockHrUser);
    });

    it('should return 403 for non-HR', async () => {
      mockPositionService.create.mockRejectedValue(new ForbiddenException('Only HR can create positions'));

      await expect(positionController.create({}, mockEmployeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('GET /api/v1/org/chart/:employeeId', () => {
    it('should return 200 with org tree', async () => {
      const mockTree = {
        employee_id: 'EMP_L2',
        name_en: 'Rutchapon',
        children: [{ employee_id: 'EMP_SUP001', children: [] as any[] }],
      };
      mockOrgChartService.getOrgChart.mockResolvedValue(mockTree);

      const result = await orgChartController.getOrgChart('EMP_L2');

      expect(result).toBeDefined();
      expect(result.employee_id).toBe('EMP_L2');
      expect(result.children).toHaveLength(1);
    });

    it('should return 404 for missing employee', async () => {
      mockOrgChartService.getOrgChart.mockRejectedValue(new NotFoundException('Employee not found'));

      await expect(orgChartController.getOrgChart('NONEXIST')).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/transfers', () => {
    it('should return 201 for valid transfer request', async () => {
      const dto = {
        employee_id: 'EMP001',
        from_position_id: 'pos-001',
        to_position_id: 'pos-002',
        transfer_type: 'lateral',
        effective_date: '2027-06-01',
        reason: 'Growth',
      };
      mockTransferService.create.mockResolvedValue({ id: 'transfer-new', ...dto, status: 'pending' });

      const result = await transferController.create(dto, mockHrUser);

      expect(result).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should return 403 for unauthorized user', async () => {
      mockTransferService.create.mockRejectedValue(new ForbiddenException());

      await expect(transferController.create({}, mockEmployeeUser)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('PATCH /api/v1/transfers/:id/approve', () => {
    it('should return 200 when HR approves', async () => {
      mockTransferService.approve.mockResolvedValue({ id: 'transfer-001', status: 'approved', approved_by: 'HR001' });

      const result = await transferController.approve('transfer-001', mockHrUser);

      expect(result.status).toBe('approved');
    });
  });

  describe('GET /api/v1/org/direct-reports/:employeeId', () => {
    it('should return direct reports list', async () => {
      mockOrgChartService.getDirectReports.mockResolvedValue([
        { employee_id: 'EMP_DR001', name_en: 'Naruechon' },
        { employee_id: 'EMP_DR002', name_en: 'Punnapa' },
      ]);

      const result = await orgChartController.getDirectReports('EMP001');

      expect(result).toHaveLength(2);
    });
  });

  describe('GET /api/v1/positions/:id', () => {
    it('should return position details', async () => {
      mockPositionService.findById.mockResolvedValue({ id: 'pos-001', title_en: 'Product Manager' });

      const result = await positionController.findById('pos-001');

      expect(result.title_en).toBe('Product Manager');
    });

    it('should throw 404 for non-existent position', async () => {
      mockPositionService.findById.mockRejectedValue(new NotFoundException());

      await expect(positionController.findById('nonexist')).rejects.toThrow(NotFoundException);
    });
  });
});

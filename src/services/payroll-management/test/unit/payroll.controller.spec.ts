import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PayrollController } from '../../src/payroll/payroll.controller';
import { PayrollService } from '../../src/payroll/payroll.service';
import { type CurrentUserInterface } from 'hrms-shared';

const mockPayrollService = {
  createPayrollRun: jest.fn(),
  findPayrollRun: jest.fn(),
  processPayroll: jest.fn(),
  approvePayroll: jest.fn(),
  finalizePayroll: jest.fn(),
  getPayslip: jest.fn(),
};

const mockHrAdminUser: CurrentUserInterface = {
  id: 'HR001',
  email: 'hr.admin@centralgroup.com',
  username: 'hr.admin',
  firstName: 'HR',
  lastName: 'Admin',
  roles: ['hr_admin'],
};

const mockHrManagerUser: CurrentUserInterface = {
  id: 'HRM001',
  email: 'hr.manager@centralgroup.com',
  username: 'hr.manager',
  firstName: 'HR',
  lastName: 'Manager',
  roles: ['hr_manager'],
};

const mockEmployeeUser: CurrentUserInterface = {
  id: 'EMP001',
  email: 'emp@centralgroup.com',
  username: 'emp.user',
  firstName: 'Employee',
  lastName: 'User',
  roles: ['employee'],
};

const mockPayrollRun = {
  id: 'run-1',
  period: '2026-01',
  year: 2026,
  month: 1,
  type: 'regular',
  status: 'draft',
  total_gross: 0,
  total_deductions: 0,
  total_net: 0,
  total_employer_cost: 0,
  employee_count: 0,
  created_by: 'HR001',
  payslips: [] as any[],
};

describe('PayrollController', () => {
  let controller: PayrollController;
  let service: typeof mockPayrollService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollController],
      providers: [
        { provide: PayrollService, useValue: mockPayrollService },
      ],
    }).compile();

    controller = module.get<PayrollController>(PayrollController);
    service = mockPayrollService;
  });

  describe('POST /api/v1/payroll/runs', () => {
    it('should return 201 creating a payroll run', async () => {
      service.createPayrollRun.mockResolvedValue(mockPayrollRun);
      const result = await controller.createRun(
        { period: '2026-01' } as any,
        mockHrAdminUser,
      );
      expect(result).toEqual(mockPayrollRun);
    });

    it('should throw ForbiddenException for non-HR user', async () => {
      service.createPayrollRun.mockRejectedValue(new ForbiddenException());
      await expect(controller.createRun(
        { period: '2026-01' } as any,
        mockEmployeeUser,
      )).rejects.toThrow(ForbiddenException);
    });
  });

  describe('GET /api/v1/payroll/runs/:id', () => {
    it('should return 200 with payroll run details', async () => {
      service.findPayrollRun.mockResolvedValue(mockPayrollRun);
      const result = await controller.findRun('run-1');
      expect(result).toEqual(mockPayrollRun);
    });

    it('should throw NotFoundException for invalid ID', async () => {
      service.findPayrollRun.mockRejectedValue(new NotFoundException());
      await expect(controller.findRun('invalid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/v1/payroll/runs/:id/process', () => {
    it('should return 200 after processing payroll', async () => {
      const processedRun = { ...mockPayrollRun, status: 'processing', employee_count: 3 };
      service.processPayroll.mockResolvedValue(processedRun);
      const result = await controller.processPayroll(
        'run-1',
        { employeeCompensations: [] },
        mockHrAdminUser,
      );
      expect(result.status).toBe('processing');
    });

    it('should throw ForbiddenException for non-HR user', async () => {
      service.processPayroll.mockRejectedValue(new ForbiddenException());
      await expect(controller.processPayroll('run-1', { employeeCompensations: [] }, mockEmployeeUser))
        .rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/payroll/runs/:id/approve', () => {
    it('should return 200 for HR manager approval', async () => {
      const approvedRun = { ...mockPayrollRun, status: 'approved' };
      service.approvePayroll.mockResolvedValue(approvedRun);
      const result = await controller.approvePayroll('run-1', mockHrManagerUser);
      expect(result.status).toBe('approved');
    });

    it('should throw ForbiddenException for non-manager', async () => {
      service.approvePayroll.mockRejectedValue(new ForbiddenException());
      await expect(controller.approvePayroll('run-1', mockHrAdminUser))
        .rejects.toThrow(ForbiddenException);
    });
  });

  describe('POST /api/v1/payroll/runs/:id/finalize', () => {
    it('should return 200 after finalizing payroll', async () => {
      const finalizedRun = { ...mockPayrollRun, status: 'completed' };
      service.finalizePayroll.mockResolvedValue(finalizedRun);
      const result = await controller.finalizePayroll('run-1', mockHrAdminUser);
      expect(result.status).toBe('completed');
    });

    it('should throw ForbiddenException for non-HR user', async () => {
      service.finalizePayroll.mockRejectedValue(new ForbiddenException());
      await expect(controller.finalizePayroll('run-1', mockEmployeeUser))
        .rejects.toThrow(ForbiddenException);
    });
  });

  describe('GET /api/v1/payroll/runs/:runId/payslips/:employeeId', () => {
    it('should return 200 with decrypted payslip', async () => {
      const payslip = { id: 'ps-1', gross_salary: 110000, net_salary: 91250 };
      service.getPayslip.mockResolvedValue(payslip);
      const result = await controller.getPayslip('run-1', 'EMP001');
      expect(result.gross_salary).toBe(110000);
    });

    it('should throw NotFoundException for missing payslip', async () => {
      service.getPayslip.mockRejectedValue(new NotFoundException());
      await expect(controller.getPayslip('run-1', 'INVALID')).rejects.toThrow(NotFoundException);
    });
  });
});

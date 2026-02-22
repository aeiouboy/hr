import { PayrollService } from '../../src/payroll/payroll.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

const mockPrisma = {
  payrollRun: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  payslip: {
    createMany: jest.fn(),
    findUnique: jest.fn(),
    updateMany: jest.fn(),
  },
};

const mockEncryption = {
  encrypt: jest.fn((val: string) => `encrypted_${val}`),
  decrypt: jest.fn((val: string) => val.replace('encrypted_', '')),
  hashForSearch: jest.fn((val: string) => `hash_${val}`),
};

const mockTaxService = {};

const hrUser = { id: 'user-1', roles: ['hr_admin'], employee_id: 'EMP001' };
const hrManager = { id: 'user-2', roles: ['hr_manager'], employee_id: 'EMP002' };
const employee = { id: 'user-3', roles: ['employee'], employee_id: 'EMP003' };

describe('PayrollService', () => {
  let service: PayrollService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PayrollService(
      mockPrisma as any,
      mockEncryption as any,
      mockTaxService as any,
    );
  });

  describe('createPayrollRun', () => {
    it('should create a draft payroll run', async () => {
      const expected = { id: 'run-1', period: '2025-01', status: 'draft' };
      mockPrisma.payrollRun.create.mockResolvedValue(expected);

      const result = await service.createPayrollRun({ period: '2025-01' }, hrUser as any);
      expect(result).toEqual(expected);
      expect(mockPrisma.payrollRun.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          period: '2025-01',
          year: 2025,
          month: 1,
          status: 'draft',
          type: 'regular',
          created_by: 'user-1',
        }),
      });
    });

    it('should reject non-HR users', async () => {
      await expect(
        service.createPayrollRun({ period: '2025-01' }, employee as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject invalid period format', async () => {
      await expect(
        service.createPayrollRun({ period: 'invalid' }, hrUser as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should reject invalid month', async () => {
      await expect(
        service.createPayrollRun({ period: '2025-13' }, hrUser as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('processPayroll', () => {
    const compensations = [{
      employee_id: 'EMP001',
      base_salary: 50000,
      position_allowance: 5000,
      housing_allowance: 3000,
      transportation_allowance: 2000,
      meal_allowance: 1000,
      provident_fund_rate: 5,
      bank_code: 'BBL',
      bank_account: '1234567890',
    }];

    it('should process payroll and create payslips', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'draft' });
      mockPrisma.payslip.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.payrollRun.update.mockResolvedValue({ id: 'run-1', status: 'processing' });

      const result = await service.processPayroll('run-1', compensations, hrUser as any);
      expect(result.status).toBe('processing');
      expect(mockPrisma.payslip.createMany).toHaveBeenCalled();

      const payslipData = mockPrisma.payslip.createMany.mock.calls[0][0].data[0];
      expect(payslipData.employee_id).toBe('EMP001');
      expect(payslipData.sso_amount).toBeGreaterThan(0);
      expect(payslipData.sso_amount).toBeLessThanOrEqual(750);
      expect(payslipData.tax_amount).toBeGreaterThanOrEqual(0);
    });

    it('should reject non-HR users', async () => {
      await expect(
        service.processPayroll('run-1', compensations, employee as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if payroll run not found', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue(null);
      await expect(
        service.processPayroll('run-1', compensations, hrUser as any),
      ).rejects.toThrow(NotFoundException);
    });

    it('should reject if payroll run is not in draft status', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'completed' });
      await expect(
        service.processPayroll('run-1', compensations, hrUser as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should calculate SSO correctly (capped at 750)', async () => {
      const highSalary = [{
        ...compensations[0],
        base_salary: 100000,
        position_allowance: 50000,
      }];
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'draft' });
      mockPrisma.payslip.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.payrollRun.update.mockResolvedValue({ id: 'run-1', status: 'processing' });

      await service.processPayroll('run-1', highSalary, hrUser as any);
      const payslipData = mockPrisma.payslip.createMany.mock.calls[0][0].data[0];
      expect(payslipData.sso_amount).toBe(750);
    });

    it('should encrypt sensitive fields', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'draft' });
      mockPrisma.payslip.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.payrollRun.update.mockResolvedValue({ id: 'run-1', status: 'processing' });

      await service.processPayroll('run-1', compensations, hrUser as any);
      const payslipData = mockPrisma.payslip.createMany.mock.calls[0][0].data[0];
      expect(payslipData.gross_salary).toContain('encrypted_');
      expect(payslipData.net_salary).toContain('encrypted_');
      expect(payslipData.bank_account).toContain('encrypted_');
    });
  });

  describe('approvePayroll', () => {
    it('should approve a processing payroll run', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'processing' });
      mockPrisma.payrollRun.update.mockResolvedValue({ id: 'run-1', status: 'approved' });

      const result = await service.approvePayroll('run-1', hrManager as any);
      expect(result.status).toBe('approved');
    });

    it('should reject non-manager users', async () => {
      await expect(
        service.approvePayroll('run-1', hrUser as any),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should reject if not in processing status', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'draft' });
      await expect(
        service.approvePayroll('run-1', hrManager as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('finalizePayroll', () => {
    it('should finalize an approved payroll run', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'approved' });
      mockPrisma.payslip.updateMany.mockResolvedValue({ count: 5 });
      mockPrisma.payrollRun.update.mockResolvedValue({ id: 'run-1', status: 'completed' });

      const result = await service.finalizePayroll('run-1', hrUser as any);
      expect(result.status).toBe('completed');
      expect(mockPrisma.payslip.updateMany).toHaveBeenCalledWith({
        where: { payroll_run_id: 'run-1' },
        data: { payment_status: 'paid' },
      });
    });

    it('should reject if not approved', async () => {
      mockPrisma.payrollRun.findUnique.mockResolvedValue({ id: 'run-1', status: 'processing' });
      await expect(
        service.finalizePayroll('run-1', hrUser as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getPayslip', () => {
    it('should return decrypted payslip', async () => {
      mockPrisma.payslip.findUnique.mockResolvedValue({
        id: 'ps-1',
        gross_salary: 'encrypted_61000',
        net_salary: 'encrypted_50000',
        bank_account: 'encrypted_1234567890',
      });

      const result = await service.getPayslip('run-1', 'EMP001');
      expect(result.gross_salary).toBe(61000);
      expect(result.net_salary).toBe(50000);
      expect(result.bank_account).toBe('1234567890');
    });

    it('should throw if payslip not found', async () => {
      mockPrisma.payslip.findUnique.mockResolvedValue(null);
      await expect(service.getPayslip('run-1', 'EMP999')).rejects.toThrow(NotFoundException);
    });

    it('should handle null bank account', async () => {
      mockPrisma.payslip.findUnique.mockResolvedValue({
        id: 'ps-1',
        gross_salary: 'encrypted_61000',
        net_salary: 'encrypted_50000',
        bank_account: null,
      });

      const result = await service.getPayslip('run-1', 'EMP001');
      expect(result.bank_account).toBeNull();
    });
  });

  describe('calculateSSO (static)', () => {
    it('should cap at 750 for high salary', () => {
      expect(PayrollService.calculateSSO(100000, 50000)).toBe(750);
    });

    it('should calculate 5% for low salary', () => {
      expect(PayrollService.calculateSSO(10000, 0)).toBe(500);
    });

    it('should use wage base cap of 15000', () => {
      expect(PayrollService.calculateSSO(15000, 0)).toBe(750);
      expect(PayrollService.calculateSSO(14000, 0)).toBe(700);
    });
  });
});

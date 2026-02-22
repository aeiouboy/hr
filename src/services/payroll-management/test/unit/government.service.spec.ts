import { GovernmentService } from '../../src/government/government.service';
import { NotFoundException } from '@nestjs/common';

const mockPayrollRun = {
  id: 'run-1',
  period: '2025-01',
  status: 'completed',
  payslips: [
    {
      employee_id: 'EMP001',
      total_earnings: 61000,
      tax_amount: 3500,
      sso_amount: 750,
      provident_fund_employee: 2750,
      provident_fund_employer: 2750,
    },
    {
      employee_id: 'EMP002',
      total_earnings: 45000,
      tax_amount: 1500,
      sso_amount: 750,
      provident_fund_employee: 1500,
      provident_fund_employer: 1500,
    },
  ],
};

const mockPrisma = {
  payrollRun: {
    findFirst: jest.fn(),
  },
  governmentReport: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('GovernmentService', () => {
  let service: GovernmentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new GovernmentService(mockPrisma as any);
  });

  describe('generateReport', () => {
    it('should generate PND1 report', async () => {
      mockPrisma.payrollRun.findFirst.mockResolvedValue(mockPayrollRun);
      mockPrisma.governmentReport.create.mockImplementation(({ data }: any) => Promise.resolve({ id: 'rpt-1', ...data }));

      const result = await service.generateReport({ period: '2025-01', report_type: 'pnd1' });
      expect(result.report_type).toBe('pnd1');
      expect((result.data as any).form).toBe('PND1');
      expect((result.data as any).total_employees).toBe(2);
      expect((result.data as any).total_income).toBe(106000);
      expect((result.data as any).total_tax).toBe(5000);
    });

    it('should generate PND1 KOR report', async () => {
      mockPrisma.payrollRun.findFirst.mockResolvedValue(mockPayrollRun);
      mockPrisma.governmentReport.create.mockImplementation(({ data }: any) => Promise.resolve({ id: 'rpt-1', ...data }));

      const result = await service.generateReport({ period: '2025-01', report_type: 'pnd1_kor' });
      expect((result.data as any).form).toBe('PND1_KOR');
    });

    it('should generate SSO report', async () => {
      mockPrisma.payrollRun.findFirst.mockResolvedValue(mockPayrollRun);
      mockPrisma.governmentReport.create.mockImplementation(({ data }: any) => Promise.resolve({ id: 'rpt-1', ...data }));

      const result = await service.generateReport({ period: '2025-01', report_type: 'sso' });
      expect((result.data as any).form).toBe('SSO_MONTHLY');
      expect((result.data as any).total_sso_employee).toBe(1500);
      expect((result.data as any).total_sso_employer).toBe(1500);
    });

    it('should generate PVD report', async () => {
      mockPrisma.payrollRun.findFirst.mockResolvedValue(mockPayrollRun);
      mockPrisma.governmentReport.create.mockImplementation(({ data }: any) => Promise.resolve({ id: 'rpt-1', ...data }));

      const result = await service.generateReport({ period: '2025-01', report_type: 'pvd' });
      expect((result.data as any).form).toBe('PVD_MONTHLY');
      expect((result.data as any).total_pvd_employee).toBe(4250);
      expect((result.data as any).total_pvd_employer).toBe(4250);
    });

    it('should throw if no completed payroll run found', async () => {
      mockPrisma.payrollRun.findFirst.mockResolvedValue(null);
      await expect(
        service.generateReport({ period: '2025-01', report_type: 'pnd1' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findReports', () => {
    it('should return reports with filters', async () => {
      mockPrisma.governmentReport.findMany.mockResolvedValue([{ id: 'rpt-1' }]);
      const result = await service.findReports({ period: '2025-01', report_type: 'pnd1' });
      expect(result).toHaveLength(1);
    });

    it('should return all reports without filters', async () => {
      mockPrisma.governmentReport.findMany.mockResolvedValue([]);
      await service.findReports();
      expect(mockPrisma.governmentReport.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { generated_at: 'desc' },
      });
    });
  });
});

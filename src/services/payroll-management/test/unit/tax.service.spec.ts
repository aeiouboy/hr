import { TaxService } from '../../src/tax/tax.service';

const mockPrisma = {
  taxDeduction: {
    upsert: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaxService(mockPrisma as any);
  });

  describe('calculateAndSaveTax', () => {
    it('should calculate and upsert tax deduction', async () => {
      mockPrisma.taxDeduction.upsert.mockResolvedValue({ id: 'td-1', employee_id: 'EMP001' });

      const result = await service.calculateAndSaveTax('EMP001', 2025, 720000);
      expect(result.employee_id).toBe('EMP001');
      expect(mockPrisma.taxDeduction.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { employee_id_tax_year: { employee_id: 'EMP001', tax_year: 2025 } },
          create: expect.objectContaining({
            employee_id: 'EMP001',
            tax_year: 2025,
            annual_income: 720000,
          }),
          update: expect.objectContaining({
            annual_income: 720000,
          }),
        }),
      );
    });

    it('should include deductions in calculation', async () => {
      mockPrisma.taxDeduction.upsert.mockResolvedValue({ id: 'td-1' });

      await service.calculateAndSaveTax('EMP001', 2025, 720000, {
        socialSecurity: 9000,
        providentFund: 36000,
      });

      const call = mockPrisma.taxDeduction.upsert.mock.calls[0][0];
      expect(call.create.social_security_deduction).toBe(9000);
      expect(call.create.provident_fund_deduction).toBe(36000);
    });
  });

  describe('getEmployeeTaxSummary', () => {
    it('should return tax summary for employee', async () => {
      mockPrisma.taxDeduction.findUnique.mockResolvedValue({
        employee_id: 'EMP001',
        tax_year: 2025,
        calculated_tax: 42500,
      });

      const result = await service.getEmployeeTaxSummary('EMP001', 2025);
      expect(result.calculated_tax).toBe(42500);
    });

    it('should return null if no record', async () => {
      mockPrisma.taxDeduction.findUnique.mockResolvedValue(null);
      const result = await service.getEmployeeTaxSummary('EMP999', 2025);
      expect(result).toBeNull();
    });
  });

  describe('calculateMonthlyWithholding', () => {
    it('should return monthly withholding amount', () => {
      const result = service.calculateMonthlyWithholding(720000);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(720000 / 12);
    });

    it('should return 0 for low income', () => {
      const result = service.calculateMonthlyWithholding(100000);
      expect(result).toBe(0);
    });
  });
});

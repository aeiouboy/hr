import { ThaiPitCalculator } from '../../src/tax/thai-pit.calculator';

describe('ThaiPitCalculator', () => {
  describe('calculateExpenseDeduction', () => {
    it('should calculate 50% of income up to 100,000', () => {
      expect(ThaiPitCalculator.calculateExpenseDeduction(100000)).toBe(50000);
      expect(ThaiPitCalculator.calculateExpenseDeduction(200000)).toBe(100000);
      expect(ThaiPitCalculator.calculateExpenseDeduction(500000)).toBe(100000);
    });
  });

  describe('calculateTotalDeductions', () => {
    it('should sum all deductions with defaults', () => {
      const total = ThaiPitCalculator.calculateTotalDeductions({
        personalAllowance: 60000,
        expenseDeduction: 100000,
      });
      expect(total).toBe(160000);
    });

    it('should cap insurance and SSO deductions', () => {
      const total = ThaiPitCalculator.calculateTotalDeductions({
        personalAllowance: 60000,
        expenseDeduction: 100000,
        socialSecurity: 50000, // capped at 9000
        lifeInsurance: 200000, // capped at 100000
      });
      expect(total).toBe(60000 + 100000 + 9000 + 100000);
    });
  });

  describe('calculateTaxFromTaxableIncome', () => {
    it('should return 0 for income in the 0% bracket (<=150,000)', () => {
      expect(ThaiPitCalculator.calculateTaxFromTaxableIncome(0)).toBe(0);
      expect(ThaiPitCalculator.calculateTaxFromTaxableIncome(150000)).toBe(0);
    });

    it('should calculate 5% for taxable income 150,001 - 300,000', () => {
      // 200,000 taxable: first 150k at 0%, next 50k at 5% = 2,500
      const tax = ThaiPitCalculator.calculateTaxFromTaxableIncome(200000);
      expect(tax).toBeCloseTo(2500, 0);
    });

    it('should calculate correctly across multiple brackets', () => {
      // 500,000 taxable: 150k@0% + 150k@5%(7500) + 200k@10%(20000) = 27,500
      const tax = ThaiPitCalculator.calculateTaxFromTaxableIncome(500000);
      expect(tax).toBeCloseTo(27500, 0);
    });

    it('should calculate 35% bracket for high income', () => {
      // 6,000,000 taxable
      const tax = ThaiPitCalculator.calculateTaxFromTaxableIncome(6000000);
      expect(tax).toBeGreaterThan(1000000);
    });

    it('should return 0 for negative taxable income', () => {
      expect(ThaiPitCalculator.calculateTaxFromTaxableIncome(-50000)).toBe(0);
    });
  });

  describe('calculateAnnualTax', () => {
    it('should return 0 for low income (below deductions threshold)', () => {
      // 100,000 gross: expense=50k, personal=60k, taxable=-10k => 0
      expect(ThaiPitCalculator.calculateAnnualTax(100000)).toBe(0);
    });

    it('should return 0 for income that results in taxable below 150k', () => {
      // 300,000 gross: expense=100k, personal=60k, taxable=140k => in 0% bracket
      expect(ThaiPitCalculator.calculateAnnualTax(300000)).toBe(0);
    });

    it('should calculate tax for moderate income', () => {
      // 400,000 gross: expense=100k, personal=60k, taxable=240k
      const tax = ThaiPitCalculator.calculateAnnualTax(400000);
      expect(tax).toBeGreaterThan(0);
      expect(tax).toBeLessThan(10000);
    });

    it('should calculate tax for higher income', () => {
      // 1,000,000 gross: expense=100k, personal=60k, taxable=840k
      const tax = ThaiPitCalculator.calculateAnnualTax(1000000);
      expect(tax).toBeGreaterThan(50000);
      expect(tax).toBeLessThan(100000);
    });

    it('should account for SSO and PVD deductions', () => {
      const taxWithout = ThaiPitCalculator.calculateAnnualTax(1000000);
      const taxWith = ThaiPitCalculator.calculateAnnualTax(1000000, {
        socialSecurity: 9000,
        providentFund: 60000,
      });
      expect(taxWith).toBeLessThan(taxWithout);
    });

    it('should return 0 for zero income', () => {
      expect(ThaiPitCalculator.calculateAnnualTax(0)).toBe(0);
    });

    it('should return 0 for negative income', () => {
      expect(ThaiPitCalculator.calculateAnnualTax(-50000)).toBe(0);
    });
  });

  describe('calculateMonthlyWithholding', () => {
    it('should divide annual tax by 12', () => {
      const annualTax = ThaiPitCalculator.calculateAnnualTax(600000);
      const monthly = ThaiPitCalculator.calculateMonthlyWithholding(600000);
      expect(monthly).toBeCloseTo(annualTax / 12, 2);
    });

    it('should return 0 for low income', () => {
      expect(ThaiPitCalculator.calculateMonthlyWithholding(150000)).toBe(0);
    });
  });

  describe('getEffectiveRate', () => {
    it('should return 0 for zero income', () => {
      expect(ThaiPitCalculator.getEffectiveRate(0)).toBe(0);
    });

    it('should return a percentage', () => {
      const rate = ThaiPitCalculator.getEffectiveRate(1000000);
      expect(rate).toBeGreaterThan(0);
      expect(rate).toBeLessThan(35);
    });
  });
});

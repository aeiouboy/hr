/**
 * Thai Personal Income Tax (PIT) Calculator
 * Based on Revenue Department progressive tax brackets
 */

export interface TaxBracket {
  minIncome: number;
  maxIncome: number | null;
  rate: number;
}

export interface TaxDeductions {
  personalAllowance?: number;
  expenseDeduction?: number;
  spouseAllowance?: number;
  childAllowance?: number;
  parentAllowance?: number;
  lifeInsurance?: number;
  healthInsurance?: number;
  providentFund?: number;
  socialSecurity?: number;
  homeLoanInterest?: number;
  donation?: number;
}

const TAX_BRACKETS: TaxBracket[] = [
  { minIncome: 0, maxIncome: 150000, rate: 0 },
  { minIncome: 150001, maxIncome: 300000, rate: 5 },
  { minIncome: 300001, maxIncome: 500000, rate: 10 },
  { minIncome: 500001, maxIncome: 750000, rate: 15 },
  { minIncome: 750001, maxIncome: 1000000, rate: 20 },
  { minIncome: 1000001, maxIncome: 2000000, rate: 25 },
  { minIncome: 2000001, maxIncome: 5000000, rate: 30 },
  { minIncome: 5000001, maxIncome: null, rate: 35 },
];

const DEFAULT_PERSONAL_ALLOWANCE = 60000;
const MAX_EXPENSE_DEDUCTION = 100000;
const EXPENSE_DEDUCTION_RATE = 0.5;

export class ThaiPitCalculator {
  /**
   * Calculate total annual tax deductions from allowances
   */
  static calculateTotalDeductions(deductions: TaxDeductions = {}): number {
    const personal = deductions.personalAllowance ?? DEFAULT_PERSONAL_ALLOWANCE;
    const expense = deductions.expenseDeduction ?? 0;

    return (
      personal +
      expense +
      (deductions.spouseAllowance ?? 0) +
      (deductions.childAllowance ?? 0) +
      (deductions.parentAllowance ?? 0) +
      Math.min(deductions.lifeInsurance ?? 0, 100000) +
      Math.min(deductions.healthInsurance ?? 0, 25000) +
      Math.min(deductions.providentFund ?? 0, 500000) +
      Math.min(deductions.socialSecurity ?? 0, 9000) +
      Math.min(deductions.homeLoanInterest ?? 0, 100000) +
      (deductions.donation ?? 0)
    );
  }

  /**
   * Calculate expense deduction (50% of income, max 100,000 THB)
   */
  static calculateExpenseDeduction(annualIncome: number): number {
    return Math.min(annualIncome * EXPENSE_DEDUCTION_RATE, MAX_EXPENSE_DEDUCTION);
  }

  /**
   * Calculate annual tax based on taxable income using progressive brackets
   */
  static calculateTaxFromTaxableIncome(taxableIncome: number): number {
    if (taxableIncome <= 0) return 0;

    let tax = 0;
    let remaining = taxableIncome;

    for (const bracket of TAX_BRACKETS) {
      if (remaining <= 0) break;

      const bracketSize = bracket.maxIncome
        ? bracket.maxIncome - bracket.minIncome + 1
        : Infinity;

      const taxableInBracket = Math.min(remaining, bracketSize);
      tax += taxableInBracket * (bracket.rate / 100);
      remaining -= taxableInBracket;
    }

    return Math.round(tax * 100) / 100;
  }

  /**
   * Calculate annual tax from gross annual income with deductions
   */
  static calculateAnnualTax(annualIncome: number, deductions: TaxDeductions = {}): number {
    if (annualIncome <= 0) return 0;

    const expenseDeduction = this.calculateExpenseDeduction(annualIncome);
    const deductionsWithExpense = {
      ...deductions,
      expenseDeduction,
      personalAllowance: deductions.personalAllowance ?? DEFAULT_PERSONAL_ALLOWANCE,
    };

    const totalDeductions = this.calculateTotalDeductions(deductionsWithExpense);
    const taxableIncome = Math.max(0, annualIncome - totalDeductions);

    return this.calculateTaxFromTaxableIncome(taxableIncome);
  }

  /**
   * Calculate monthly withholding tax
   */
  static calculateMonthlyWithholding(annualIncome: number, deductions: TaxDeductions = {}): number {
    const annualTax = this.calculateAnnualTax(annualIncome, deductions);
    return Math.round((annualTax / 12) * 100) / 100;
  }

  /**
   * Get effective tax rate as percentage
   */
  static getEffectiveRate(annualIncome: number, deductions: TaxDeductions = {}): number {
    if (annualIncome <= 0) return 0;
    const annualTax = this.calculateAnnualTax(annualIncome, deductions);
    return Math.round((annualTax / annualIncome) * 10000) / 100;
  }
}

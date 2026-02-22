import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ThaiPitCalculator, TaxDeductions } from './thai-pit.calculator';

@Injectable()
export class TaxService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateAndSaveTax(employeeId: string, taxYear: number, annualIncome: number, deductions: TaxDeductions = {}) {
    const expenseDeduction = ThaiPitCalculator.calculateExpenseDeduction(annualIncome);
    const totalDeductions = ThaiPitCalculator.calculateTotalDeductions({ ...deductions, expenseDeduction });
    const taxableIncome = Math.max(0, annualIncome - totalDeductions);
    const calculatedTax = ThaiPitCalculator.calculateAnnualTax(annualIncome, deductions);

    return this.prisma.taxDeduction.upsert({
      where: { employee_id_tax_year: { employee_id: employeeId, tax_year: taxYear } },
      create: {
        employee_id: employeeId,
        tax_year: taxYear,
        annual_income: annualIncome,
        personal_allowance: deductions.personalAllowance ?? 60000,
        expense_deduction: expenseDeduction,
        spouse_allowance: deductions.spouseAllowance ?? 0,
        child_allowance: deductions.childAllowance ?? 0,
        parent_allowance: deductions.parentAllowance ?? 0,
        life_insurance: deductions.lifeInsurance ?? 0,
        health_insurance: deductions.healthInsurance ?? 0,
        provident_fund_deduction: deductions.providentFund ?? 0,
        social_security_deduction: deductions.socialSecurity ?? 0,
        home_loan_interest: deductions.homeLoanInterest ?? 0,
        donation: deductions.donation ?? 0,
        total_deductions: totalDeductions,
        taxable_income: taxableIncome,
        calculated_tax: calculatedTax,
      },
      update: {
        annual_income: annualIncome,
        expense_deduction: expenseDeduction,
        total_deductions: totalDeductions,
        taxable_income: taxableIncome,
        calculated_tax: calculatedTax,
      },
    });
  }

  async getEmployeeTaxSummary(employeeId: string, taxYear: number) {
    return this.prisma.taxDeduction.findUnique({
      where: { employee_id_tax_year: { employee_id: employeeId, tax_year: taxYear } },
    });
  }

  calculateMonthlyWithholding(annualIncome: number, deductions: TaxDeductions = {}): number {
    return ThaiPitCalculator.calculateMonthlyWithholding(annualIncome, deductions);
  }
}

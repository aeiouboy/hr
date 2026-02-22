import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { TaxService } from '../tax/tax.service';
import { ThaiPitCalculator } from '../tax/thai-pit.calculator';
import { type CurrentUserInterface } from 'hrms-shared';

const SSO_RATE = 0.05;
const SSO_MAX_WAGE_BASE = 15000;
const SSO_MAX_CONTRIBUTION = 750;

@Injectable()
export class PayrollService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
    private readonly taxService: TaxService,
  ) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  /**
   * Stage 1: Create a draft payroll run
   */
  async createPayrollRun(dto: { period: string; type?: string }, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create payroll runs');
    }

    const [yearStr, monthStr] = dto.period.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    if (!year || !month || month < 1 || month > 12) {
      throw new BadRequestException('Invalid period format. Use YYYY-MM');
    }

    return this.prisma.payrollRun.create({
      data: {
        period: dto.period,
        year,
        month,
        type: dto.type ?? 'regular',
        status: 'draft',
        created_by: currentUser.id,
      },
    });
  }

  /**
   * Stage 2: Process payroll — calculate all payslips
   */
  async processPayroll(payrollRunId: string, employeeCompensations: Array<{
    employee_id: string;
    base_salary: number;
    position_allowance: number;
    housing_allowance: number;
    transportation_allowance: number;
    meal_allowance: number;
    provident_fund_rate: number;
    bank_code?: string;
    bank_account?: string;
  }>, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can process payroll');
    }

    const run = await this.prisma.payrollRun.findUnique({ where: { id: payrollRunId } });
    if (!run) throw new NotFoundException('Payroll run not found');
    if (run.status !== 'draft') throw new BadRequestException('Payroll run must be in draft status');

    let totalGross = 0;
    let totalDeductions = 0;
    let totalNet = 0;
    let totalEmployerCost = 0;

    const payslips = [];

    for (const comp of employeeCompensations) {
      const totalEarnings = comp.base_salary + comp.position_allowance +
        comp.housing_allowance + comp.transportation_allowance + comp.meal_allowance;

      // SSO calculation
      const ssoWage = Math.min(comp.base_salary + comp.position_allowance, SSO_MAX_WAGE_BASE);
      const ssoAmount = Math.min(ssoWage * SSO_RATE, SSO_MAX_CONTRIBUTION);

      // Provident fund
      const pvdBase = comp.base_salary + comp.position_allowance;
      const pvdEmployee = pvdBase * (comp.provident_fund_rate / 100);
      const pvdEmployer = pvdBase * (comp.provident_fund_rate / 100);

      // Tax calculation (monthly withholding)
      const annualIncome = totalEarnings * 12;
      const monthlyTax = ThaiPitCalculator.calculateMonthlyWithholding(annualIncome, {
        socialSecurity: ssoAmount * 12,
        providentFund: pvdEmployee * 12,
      });

      const totalPayslipDeductions = monthlyTax + ssoAmount + pvdEmployee;
      const netSalary = totalEarnings - totalPayslipDeductions;

      totalGross += totalEarnings;
      totalDeductions += totalPayslipDeductions;
      totalNet += netSalary;
      totalEmployerCost += totalEarnings + ssoAmount + pvdEmployer;

      payslips.push({
        payroll_run_id: payrollRunId,
        employee_id: comp.employee_id,
        base_salary: comp.base_salary,
        gross_salary: this.encryption.encrypt(String(totalEarnings)),
        total_earnings: totalEarnings,
        total_deductions: totalPayslipDeductions,
        net_salary: this.encryption.encrypt(String(netSalary)),
        tax_amount: monthlyTax,
        sso_amount: ssoAmount,
        provident_fund_employee: pvdEmployee,
        provident_fund_employer: pvdEmployer,
        earnings_detail: {
          base_salary: comp.base_salary,
          position_allowance: comp.position_allowance,
          housing_allowance: comp.housing_allowance,
          transportation_allowance: comp.transportation_allowance,
          meal_allowance: comp.meal_allowance,
        },
        deductions_detail: {
          income_tax: monthlyTax,
          social_security: ssoAmount,
          provident_fund_employee: pvdEmployee,
        },
        bank_code: comp.bank_code,
        bank_account: comp.bank_account ? this.encryption.encrypt(comp.bank_account) : null,
      });
    }

    // Create payslips
    await this.prisma.payslip.createMany({ data: payslips });

    // Update payroll run
    return this.prisma.payrollRun.update({
      where: { id: payrollRunId },
      data: {
        status: 'processing',
        total_gross: totalGross,
        total_deductions: totalDeductions,
        total_net: totalNet,
        total_employer_cost: totalEmployerCost,
        employee_count: employeeCompensations.length,
      },
    });
  }

  /**
   * Stage 3: Approve payroll
   */
  async approvePayroll(payrollRunId: string, currentUser: CurrentUserInterface) {
    if (!currentUser.roles.includes('hr_manager')) {
      throw new ForbiddenException('Only HR Manager can approve payroll');
    }

    const run = await this.prisma.payrollRun.findUnique({ where: { id: payrollRunId } });
    if (!run) throw new NotFoundException('Payroll run not found');
    if (run.status !== 'processing') throw new BadRequestException('Payroll must be in processing status to approve');

    return this.prisma.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: 'approved', approved_by: currentUser.id },
    });
  }

  /**
   * Stage 4: Finalize payroll
   */
  async finalizePayroll(payrollRunId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can finalize payroll');
    }

    const run = await this.prisma.payrollRun.findUnique({ where: { id: payrollRunId } });
    if (!run) throw new NotFoundException('Payroll run not found');
    if (run.status !== 'approved') throw new BadRequestException('Payroll must be approved before finalizing');

    await this.prisma.payslip.updateMany({
      where: { payroll_run_id: payrollRunId },
      data: { payment_status: 'paid' },
    });

    return this.prisma.payrollRun.update({
      where: { id: payrollRunId },
      data: { status: 'completed' },
    });
  }

  async findPayrollRun(id: string) {
    const run = await this.prisma.payrollRun.findUnique({
      where: { id },
      include: { payslips: true },
    });
    if (!run) throw new NotFoundException('Payroll run not found');
    return run;
  }

  async getPayslip(payrollRunId: string, employeeId: string) {
    const payslip = await this.prisma.payslip.findUnique({
      where: { payroll_run_id_employee_id: { payroll_run_id: payrollRunId, employee_id: employeeId } },
    });
    if (!payslip) throw new NotFoundException('Payslip not found');

    return {
      ...payslip,
      gross_salary: parseFloat(this.encryption.decrypt(payslip.gross_salary)),
      net_salary: parseFloat(this.encryption.decrypt(payslip.net_salary)),
      bank_account: payslip.bank_account ? this.encryption.decrypt(payslip.bank_account) : null,
    };
  }

  /**
   * Calculate SSO contribution
   */
  static calculateSSO(baseSalary: number, positionAllowance: number): number {
    const ssoWage = Math.min(baseSalary + positionAllowance, SSO_MAX_WAGE_BASE);
    return Math.min(ssoWage * SSO_RATE, SSO_MAX_CONTRIBUTION);
  }
}

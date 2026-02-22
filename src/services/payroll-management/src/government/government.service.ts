import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type ReportType = 'pnd1' | 'pnd1_kor' | 'sso' | 'pvd';

@Injectable()
export class GovernmentService {
  constructor(private readonly prisma: PrismaService) {}

  async generateReport(dto: { period: string; report_type: ReportType; format?: string }) {
    const [yearStr, monthStr] = dto.period.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    const payrollRun = await this.prisma.payrollRun.findFirst({
      where: { period: dto.period, status: 'completed' },
      include: { payslips: true },
    });

    if (!payrollRun) {
      throw new NotFoundException('No completed payroll run found for this period');
    }

    let reportData: Record<string, any>;

    switch (dto.report_type) {
      case 'pnd1':
        reportData = this.generatePnd1(payrollRun, year, month);
        break;
      case 'pnd1_kor':
        reportData = this.generatePnd1Kor(payrollRun, year);
        break;
      case 'sso':
        reportData = this.generateSsoReport(payrollRun, year, month);
        break;
      case 'pvd':
        reportData = this.generatePvdReport(payrollRun, year, month);
        break;
      default:
        reportData = {};
    }

    const report = await this.prisma.governmentReport.create({
      data: {
        report_type: dto.report_type,
        period: dto.period,
        year,
        month,
        status: 'generated',
        data: reportData,
        generated_at: new Date(),
      },
    });

    return report;
  }

  async findReports(filters?: { period?: string; report_type?: string }) {
    return this.prisma.governmentReport.findMany({
      where: {
        ...(filters?.period && { period: filters.period }),
        ...(filters?.report_type && { report_type: filters.report_type }),
      },
      orderBy: { generated_at: 'desc' },
    });
  }

  private generatePnd1(payrollRun: any, year: number, month: number) {
    const entries = payrollRun.payslips.map((p: any) => ({
      employee_id: p.employee_id,
      income: p.total_earnings,
      tax_withheld: p.tax_amount,
    }));

    return {
      form: 'PND1',
      tax_year: year,
      tax_month: month,
      total_employees: entries.length,
      total_income: entries.reduce((sum: number, e: any) => sum + e.income, 0),
      total_tax: entries.reduce((sum: number, e: any) => sum + e.tax_withheld, 0),
      entries,
    };
  }

  private generatePnd1Kor(payrollRun: any, year: number) {
    const entries = payrollRun.payslips.map((p: any) => ({
      employee_id: p.employee_id,
      annual_income: p.total_earnings * 12,
      annual_tax: p.tax_amount * 12,
    }));

    return {
      form: 'PND1_KOR',
      tax_year: year,
      total_employees: entries.length,
      entries,
    };
  }

  private generateSsoReport(payrollRun: any, year: number, month: number) {
    const entries = payrollRun.payslips.map((p: any) => ({
      employee_id: p.employee_id,
      sso_employee: p.sso_amount,
      sso_employer: p.sso_amount,
    }));

    return {
      form: 'SSO_MONTHLY',
      year,
      month,
      total_employees: entries.length,
      total_sso_employee: entries.reduce((sum: number, e: any) => sum + e.sso_employee, 0),
      total_sso_employer: entries.reduce((sum: number, e: any) => sum + e.sso_employer, 0),
      entries,
    };
  }

  private generatePvdReport(payrollRun: any, year: number, month: number) {
    const entries = payrollRun.payslips.map((p: any) => ({
      employee_id: p.employee_id,
      pvd_employee: p.provident_fund_employee,
      pvd_employer: p.provident_fund_employer,
    }));

    return {
      form: 'PVD_MONTHLY',
      year,
      month,
      total_employees: entries.length,
      total_pvd_employee: entries.reduce((sum: number, e: any) => sum + e.pvd_employee, 0),
      total_pvd_employer: entries.reduce((sum: number, e: any) => sum + e.pvd_employer, 0),
      entries,
    };
  }
}

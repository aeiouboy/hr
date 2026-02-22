import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePND1(year: number, month: number, createdBy: string) {
    const period = `${year}-${String(month).padStart(2, '0')}`;

    const payrollRun = await this.prisma.payrollRun.findFirst({
      where: { period, status: 'completed' },
      include: { payslips: true },
    });

    if (!payrollRun) {
      throw new NotFoundException('No completed payroll run found for this period');
    }

    const report = await this.prisma.governmentReport.create({
      data: {
        report_type: 'pnd1',
        period,
        year,
        month,
        status: 'generated',
        generated_at: new Date(),
        submitted_by: createdBy,
        total_employees: payrollRun.payslips.length,
        total_amount: payrollRun.payslips.reduce((sum, p) => sum + p.tax_amount, 0),
        data: {
          details: payrollRun.payslips.map((p) => ({
            employee_id: p.employee_id,
            total_earnings: p.total_earnings,
            tax_amount: p.tax_amount,
          })),
        },
      },
    });

    return report;
  }

  async generateSSOReport(year: number, month: number, createdBy: string) {
    const period = `${year}-${String(month).padStart(2, '0')}`;

    const payrollRun = await this.prisma.payrollRun.findFirst({
      where: { period, status: 'completed' },
      include: { payslips: true },
    });

    if (!payrollRun) {
      throw new NotFoundException('No completed payroll run found for this period');
    }

    const totalSSO = payrollRun.payslips.reduce((sum, p) => sum + p.sso_amount, 0);

    const report = await this.prisma.governmentReport.create({
      data: {
        report_type: 'sso_report',
        period,
        year,
        month,
        status: 'generated',
        generated_at: new Date(),
        submitted_by: createdBy,
        total_employees: payrollRun.payslips.length,
        total_amount: totalSSO,
        data: {
          total_sso_employee: totalSSO,
          total_sso_employer: totalSSO,
          details: payrollRun.payslips.map((p) => ({
            employee_id: p.employee_id,
            sso_amount: p.sso_amount,
          })),
        },
      },
    });

    return report;
  }
}

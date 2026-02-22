import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollRunDto } from './dto/create-payroll-run.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post('runs')
  async createRun(
    @Body() dto: CreatePayrollRunDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.payrollService.createPayrollRun(dto, currentUser);
  }

  @Post('runs/:id/process')
  async processPayroll(
    @Param('id') id: string,
    @Body() body: { employeeCompensations: any[] },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.payrollService.processPayroll(id, body.employeeCompensations, currentUser);
  }

  @Post('runs/:id/approve')
  async approvePayroll(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.payrollService.approvePayroll(id, currentUser);
  }

  @Post('runs/:id/finalize')
  async finalizePayroll(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.payrollService.finalizePayroll(id, currentUser);
  }

  @Get('runs/:id')
  async findRun(@Param('id') id: string) {
    return this.payrollService.findPayrollRun(id);
  }

  @Get('runs/:runId/payslips/:employeeId')
  async getPayslip(
    @Param('runId') runId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return this.payrollService.getPayslip(runId, employeeId);
  }
}

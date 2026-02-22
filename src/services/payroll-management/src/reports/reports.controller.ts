import { Controller, Get, Query, ForbiddenException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('payroll/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  @Get('pnd1')
  async getPND1Report(
    @Query('year') year: string,
    @Query('month') month: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can access government reports');
    }
    return this.reportsService.generatePND1(
      parseInt(year, 10),
      parseInt(month, 10),
      currentUser.id,
    );
  }

  @Get('sso')
  async getSSOReport(
    @Query('year') year: string,
    @Query('month') month: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can access government reports');
    }
    return this.reportsService.generateSSOReport(
      parseInt(year, 10),
      parseInt(month, 10),
      currentUser.id,
    );
  }
}

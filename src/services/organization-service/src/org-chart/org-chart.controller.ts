import { Controller, Get, Param, Query } from '@nestjs/common';
import { OrgChartService } from './org-chart.service';

@Controller('org')
export class OrgChartController {
  constructor(private readonly orgChartService: OrgChartService) {}

  @Get('chart/:employeeId')
  async getOrgChart(
    @Param('employeeId') employeeId: string,
    @Query('maxDepth') maxDepth?: string,
  ) {
    return this.orgChartService.getOrgChart(
      employeeId,
      maxDepth ? parseInt(maxDepth, 10) : 5,
    );
  }

  @Get('manager/:employeeId')
  async getManager(@Param('employeeId') employeeId: string) {
    return this.orgChartService.getManager(employeeId);
  }

  @Get('direct-reports/:employeeId')
  async getDirectReports(@Param('employeeId') employeeId: string) {
    return this.orgChartService.getDirectReports(employeeId);
  }
}

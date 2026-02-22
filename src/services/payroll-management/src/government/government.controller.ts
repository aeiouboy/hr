import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GenerateReportDto } from './dto/generate-report.dto';

@Controller('government-reports')
export class GovernmentController {
  constructor(private readonly governmentService: GovernmentService) {}

  @Post()
  async generateReport(@Body() dto: GenerateReportDto) {
    return this.governmentService.generateReport(dto);
  }

  @Get()
  async findReports(
    @Query('period') period?: string,
    @Query('report_type') reportType?: string,
  ) {
    return this.governmentService.findReports({ period, report_type: reportType });
  }
}

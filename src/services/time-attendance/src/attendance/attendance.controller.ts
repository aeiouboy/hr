import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { RecordAttendanceDto } from './dto/record-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('record')
  async recordAttendance(@Body() dto: RecordAttendanceDto) {
    return this.attendanceService.recordAttendance(dto);
  }

  @Get('employee/:id')
  async getByEmployee(
    @Param('id') id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.attendanceService.getByEmployee(id, startDate, endDate);
  }

  @Get('date/:date')
  async getByDate(@Param('date') date: string) {
    return this.attendanceService.getByDate(date);
  }

  @Get('summary/:employeeId/:yearMonth')
  async getMonthlySummary(
    @Param('employeeId') employeeId: string,
    @Param('yearMonth') yearMonth: string,
  ) {
    return this.attendanceService.getMonthlySummary(employeeId, yearMonth);
  }
}

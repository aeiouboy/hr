import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string) {
    return this.enrollmentService.findByEmployee(employeeId);
  }

  @Post('courses/:courseId/enroll')
  async enroll(
    @Param('courseId') courseId: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.enroll(courseId, dto.employee_id || currentUser.id, dto);
  }

  @Patch(':id/complete')
  async complete(
    @Param('id') id: string,
    @Body() dto: { score?: number; feedback?: string },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.complete(id, dto, currentUser);
  }

  @Patch(':id/progress')
  async updateProgress(
    @Param('id') id: string,
    @Body() dto: { progress: number },
  ) {
    return this.enrollmentService.updateProgress(id, dto.progress);
  }

  @Delete(':id')
  async cancel(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.cancel(id, currentUser);
  }
}

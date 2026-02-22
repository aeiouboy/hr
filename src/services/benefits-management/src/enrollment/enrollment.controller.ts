import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { EnrollDto } from './dto/enroll.dto';
import { AddDependentDto } from './dto/add-dependent.dto';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async enroll(
    @Body() dto: EnrollDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.enroll(dto, currentUser);
  }

  @Get('employee/:id')
  async getByEmployee(
    @Param('id') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.getByEmployee(employeeId, currentUser);
  }

  @Delete(':id')
  async cancel(
    @Param('id') enrollmentId: string,
    @Body('reason') reason: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.cancel(enrollmentId, reason, currentUser);
  }

  @Post(':id/dependents')
  async addDependent(
    @Param('id') enrollmentId: string,
    @Body() dto: AddDependentDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.addDependent(enrollmentId, dto, currentUser);
  }

  @Delete('dependents/:id')
  async removeDependent(
    @Param('id') dependentId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.enrollmentService.removeDependent(dependentId, currentUser);
  }

  @Get(':id/dependents')
  async getDependents(@Param('id') enrollmentId: string) {
    return this.enrollmentService.getDependents(enrollmentId);
  }
}

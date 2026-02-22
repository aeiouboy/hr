import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeavePolicyValidationService } from '../policy/leave-policy-validation.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('api/v1/leaves')
export class LeaveController {
  constructor(
    private readonly leaveService: LeaveService,
    private readonly validationService: LeavePolicyValidationService,
  ) {}

  @Post('validate')
  async validateLeaveRequest(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.validationService.validateLeaveRequest(dto, currentUser);
  }

  @Post(':employeeId')
  async createLeaveRequest(
    @Param('employeeId') employeeId: string,
    @Body() dto: CreateLeaveRequestDto,
    currentUser: CurrentUserInterface,
  ) {
    return this.leaveService.createLeaveRequest(employeeId, dto, currentUser);
  }

  @Get('types')
  async getLeaveTypes() {
    return this.leaveService.getLeaveTypes();
  }

  @Get('balance/:employeeId')
  async getBalance(
    @Param('employeeId') employeeId: string,
    @Query('year') year: string,
  ) {
    return this.leaveService.getBalance(employeeId, parseInt(year, 10));
  }

  @Get('calendar/:employeeId')
  async getCalendar(
    @Param('employeeId') employeeId: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.leaveService.getCalendar(employeeId, parseInt(year, 10), parseInt(month, 10));
  }

  @Get('employee/:employeeId')
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('status') status?: string,
    @Query('leave_type_id') leaveTypeId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.leaveService.findByEmployee(employeeId, {
      status,
      leave_type_id: leaveTypeId,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.leaveService.findById(id);
  }

  @Patch(':id/approve')
  async approveLeave(
    @Param('id') id: string,
    currentUser: CurrentUserInterface,
  ) {
    return this.leaveService.approveLeave(id, currentUser);
  }

  @Patch(':id/reject')
  async rejectLeave(
    @Param('id') id: string,
    @Body() body: { reason: string },
    currentUser: CurrentUserInterface,
  ) {
    return this.leaveService.rejectLeave(id, body.reason, currentUser);
  }

  @Patch(':id/cancel')
  async cancelLeave(
    @Param('id') id: string,
    currentUser: CurrentUserInterface,
  ) {
    return this.leaveService.cancelLeave(id, currentUser);
  }
}

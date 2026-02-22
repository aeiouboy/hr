import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { OvertimeService } from './overtime.service';
import { OTPolicyValidationService } from '../policy/ot-policy-validation.service';
import { SubmitOtDto } from './dto/submit-ot.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('overtime')
export class OvertimeController {
  constructor(
    private readonly overtimeService: OvertimeService,
    private readonly validationService: OTPolicyValidationService,
  ) {}

  @Post('validate')
  async validateOvertimeRequest(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.validationService.validateOvertimeRequest(dto, currentUser);
  }

  @Post()
  async submitRequest(
    @Body() dto: SubmitOtDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.overtimeService.submitRequest(dto, currentUser);
  }

  @Post(':id/approve')
  async approveRequest(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.overtimeService.approveRequest(id, currentUser);
  }

  @Post(':id/reject')
  async rejectRequest(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.overtimeService.rejectRequest(id, reason, currentUser);
  }

  @Post(':id/cancel')
  async cancelRequest(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.overtimeService.cancelRequest(id, currentUser);
  }

  @Post(':id/confirm')
  async postConfirm(
    @Param('id') id: string,
    @Body('actualHours') actualHours: number,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.overtimeService.postConfirm(id, actualHours, currentUser);
  }

  @Get('employee/:id')
  async getRequests(
    @Param('id') id: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('otType') otType?: string,
  ) {
    return this.overtimeService.getRequests(id, { status, startDate, endDate, otType });
  }
}

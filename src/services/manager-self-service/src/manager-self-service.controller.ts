import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ManagerSelfServiceService } from './manager-self-service.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { ApproveRejectDto, BulkApproveRejectDto } from './dto/approve-request.dto';

@Controller('manager')
export class ManagerSelfServiceController {
  constructor(private readonly service: ManagerSelfServiceService) {}

  @Get(':managerId/dashboard')
  async getDashboard(
    @Param('managerId') managerId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.getDashboard(managerId, currentUser);
  }

  @Get(':managerId/team')
  async getTeamMembers(
    @Param('managerId') managerId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.getTeamMembers(managerId, currentUser);
  }

  @Get(':managerId/approvals')
  async getPendingApprovals(
    @Param('managerId') managerId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
    @Query('type') type?: string,
    @Query('priority') priority?: string,
  ) {
    return this.service.getPendingApprovals(managerId, currentUser, { type, priority });
  }

  @Patch('approvals/:approvalId')
  async approveReject(
    @Param('approvalId') approvalId: string,
    @Body() dto: ApproveRejectDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.approveReject(approvalId, dto.action, currentUser, dto.comment);
  }

  @Post('approvals/bulk')
  async bulkApproveReject(
    @Body() dto: BulkApproveRejectDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.bulkApproveReject(dto.approval_ids, dto.action, currentUser, dto.comment);
  }

  @Get(':managerId/calendar')
  async getTeamCalendar(
    @Param('managerId') managerId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
    @Query('start_date') start_date?: string,
    @Query('end_date') end_date?: string,
  ) {
    return this.service.getTeamCalendar(managerId, currentUser, { start_date, end_date });
  }

  @Get(':managerId/config')
  async getDashboardConfig(
    @Param('managerId') managerId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.getDashboardConfig(managerId, currentUser);
  }

  @Patch(':managerId/config')
  async updateDashboardConfig(
    @Param('managerId') managerId: string,
    @Body() body: { widgets?: any; preferences?: any },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.service.updateDashboardConfig(managerId, body, currentUser);
  }
}

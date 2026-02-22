import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuickApproveService } from './quick-approve.service';
import { CurrentUser, Roles, RolesGuard, type CurrentUserInterface } from 'hrms-shared';
import { BulkApproveDto } from './dto/bulk-approve.dto';
import { BulkRejectDto } from './dto/bulk-reject.dto';
import { CreateQuickDelegationDto } from './dto/create-delegation.dto';
import { PendingFilterDto } from './dto/pending-filter.dto';

@Controller('workflows')
@Roles('manager', 'hr_admin', 'hr_manager')
@UseGuards(RolesGuard)
export class QuickApproveController {
  constructor(private readonly quickApproveService: QuickApproveService) {}

  @Get('pending')
  async getPendingRequests(
    @CurrentUser() currentUser: CurrentUserInterface,
    @Query() filter: PendingFilterDto,
  ) {
    return this.quickApproveService.getPendingRequests(currentUser, filter);
  }

  @Post('bulk-approve')
  async bulkApprove(
    @Body() dto: BulkApproveDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.quickApproveService.bulkApprove(dto, currentUser);
  }

  @Post('bulk-reject')
  async bulkReject(
    @Body() dto: BulkRejectDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.quickApproveService.bulkReject(dto, currentUser);
  }

  @Get(':id/detail')
  async getRequestDetail(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.quickApproveService.getRequestDetail(id, currentUser);
  }

  @Post('delegations')
  async createDelegation(
    @Body() dto: CreateQuickDelegationDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.quickApproveService.createDelegation(dto, currentUser);
  }

  @Get('delegations')
  async getDelegations(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.quickApproveService.getDelegations(currentUser);
  }

  @Delete('delegations/:id')
  async revokeDelegation(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.quickApproveService.revokeDelegation(id, currentUser);
  }
}

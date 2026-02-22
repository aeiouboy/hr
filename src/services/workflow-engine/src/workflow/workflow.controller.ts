import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async create(@Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.workflowService.createWorkflow(dto, currentUser);
  }

  @Get('pending')
  async getPending(
    @CurrentUser() currentUser: CurrentUserInterface,
    @Query() filters?: { change_type?: string; urgency?: string; date_from?: string; date_to?: string },
  ) {
    return this.workflowService.getPendingForUser(currentUser, filters);
  }

  @Get('my-requests')
  async getMyRequests(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.workflowService.getMyRequests(currentUser);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.workflowService.findById(id);
  }

  @Post(':id/approve')
  async approve(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.approveStep(id, dto, currentUser);
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.rejectStep(id, dto, currentUser);
  }

  @Post(':id/send-back')
  async sendBack(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.sendBack(id, dto, currentUser);
  }

  @Post(':id/resubmit')
  async resubmit(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.resubmit(id, dto, currentUser);
  }

  @Post('bulk-approve')
  async bulkApprove(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.bulkApprove(dto.workflow_ids, dto, currentUser);
  }

  @Post('bulk-reject')
  async bulkReject(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.bulkReject(dto.workflow_ids, dto, currentUser);
  }

  @Get(':id/preview')
  async getPreview(@Param('id') id: string) {
    return this.workflowService.getWorkflowPreview(id);
  }

  @Get(':id/audit-trail')
  async getAuditTrail(@Param('id') id: string) {
    return this.workflowService.getAuditTrail(id);
  }

  @Post('delegations')
  async createDelegation(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.createDelegation(dto, currentUser);
  }

  @Get('delegations')
  async listDelegations(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.workflowService.listDelegations(currentUser);
  }

  @Delete('delegations/:id')
  async revokeDelegation(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.workflowService.revokeDelegation(id, currentUser);
  }
}

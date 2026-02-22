import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ResignationService } from './resignation.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { SubmitResignationDto } from './dto/submit-resignation.dto';

@Controller('resignations')
export class ResignationController {
  constructor(private readonly resignationService: ResignationService) {}

  @Post()
  async submitResignation(
    @Body() dto: SubmitResignationDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.submitResignation(dto, user);
  }

  @Get(':id')
  async getResignation(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.getResignation(id, user);
  }

  @Get()
  async listResignations(@CurrentUser() user: CurrentUserInterface) {
    return this.resignationService.listResignations(user);
  }

  @Post(':id/manager-approve')
  async managerApproveResignation(
    @Param('id') id: string,
    @Body('comments') comments: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.managerApproveResignation(id, comments, user);
  }

  @Post(':id/clearance/:itemId')
  async completeClearanceItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.completeClearanceItem(id, itemId, user);
  }

  @Post(':id/hr-clearance')
  async completeHrClearance(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.completeHrClearance(id, user);
  }

  @Post(':id/settlement')
  async processSettlement(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.processSettlement(id, amount, user);
  }

  @Post(':id/complete')
  async completeResignation(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.completeResignation(id, user);
  }

  @Post(':id/withdraw')
  async withdrawResignation(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.resignationService.withdrawResignation(id, user);
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { SubmitClaimDto } from './dto/submit-claim.dto';

@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Post()
  async submit(
    @Body() dto: SubmitClaimDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimService.submit(dto, currentUser);
  }

  @Get('employee/:id')
  async getByEmployee(
    @Param('id') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimService.getByEmployee(employeeId, currentUser);
  }

  @Get('pending')
  async getPending() {
    return this.claimService.getPending();
  }

  @Post(':id/approve')
  async approve(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimService.approve(id, currentUser);
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimService.reject(id, reason, currentUser);
  }

  @Post(':id/pay')
  async markPaid(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimService.markPaid(id, amount, currentUser);
  }
}

import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('referrals')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Post()
  async create(@Body() dto: CreateReferralDto, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.referralService.create(dto, currentUser);
  }

  @Get()
  async findAll(
    @Query('employee_id') employeeId?: string,
    @Query('status') status?: string,
    @Query('date_from') dateFrom?: string,
    @Query('date_to') dateTo?: string,
    @CurrentUser() currentUser?: CurrentUserInterface,
  ) {
    // Employees can only see their own referrals unless they are HR/Manager
    const isHrOrManager = currentUser?.roles?.some(r => ['hr_admin', 'hr_manager', 'manager'].includes(r));
    const effectiveEmployeeId = isHrOrManager ? employeeId : currentUser?.id;
    return this.referralService.findAll({
      employee_id: effectiveEmployeeId,
      status: status as any,
      date_from: dateFrom,
      date_to: dateTo,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string, @CurrentUser() currentUser?: CurrentUserInterface) {
    return this.referralService.findById(id);
  }

  @Patch(':id/submit')
  async submit(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.referralService.submit(id, currentUser);
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.referralService.approve(id, currentUser);
  }

  @Patch(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.referralService.reject(id, reason, currentUser);
  }

  @Patch(':id/issue')
  async issue(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.referralService.issue(id, currentUser);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.referralService.cancel(id, currentUser);
  }
}

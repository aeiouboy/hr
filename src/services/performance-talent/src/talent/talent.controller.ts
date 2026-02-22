import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { TalentService } from './talent.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('talent')
export class TalentController {
  constructor(private readonly talentService: TalentService) {}

  @Get('profile/:employeeId')
  async getProfile(@Param('employeeId') employeeId: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.talentService.getProfile(employeeId, currentUser);
  }

  @Post('profile/:employeeId')
  async createOrUpdateProfile(@Param('employeeId') employeeId: string, @Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.talentService.createOrUpdateProfile(employeeId, dto, currentUser);
  }

  @Get('nine-box')
  async getNineBoxGrid(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.talentService.getNineBoxGrid(currentUser);
  }

  @Get('hi-po')
  async identifyHiPo(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.talentService.identifyHiPo(currentUser);
  }

  @Get('pool')
  async getTalentPool(@Query('category') category: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.talentService.getTalentPool(category, currentUser);
  }
}

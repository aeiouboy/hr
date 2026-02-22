import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { SuccessionService } from './succession.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('succession')
export class SuccessionController {
  constructor(private readonly successionService: SuccessionService) {}

  @Post()
  async create(@Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.create(dto, currentUser);
  }

  @Get()
  async findAll(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.findAll(currentUser);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.findById(id, currentUser);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.update(id, dto, currentUser);
  }

  @Post(':id/nominees')
  async addNominee(@Param('id') id: string, @Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.addNominee(id, dto, currentUser);
  }

  @Delete(':id/nominees/:nomineeId')
  async removeNominee(@Param('id') id: string, @Param('nomineeId') nomineeId: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.removeNominee(id, nomineeId, currentUser);
  }

  @Patch('nominees/:nomineeId/readiness')
  async updateReadiness(@Param('nomineeId') nomineeId: string, @Body('readiness') readiness: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.successionService.updateNomineeReadiness(nomineeId, readiness, currentUser);
  }
}

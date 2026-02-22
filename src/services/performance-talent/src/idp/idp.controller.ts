import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { IdpService } from './idp.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('idp')
export class IdpController {
  constructor(private readonly idpService: IdpService) {}

  @Post()
  async create(@Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.create(dto, currentUser);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.findById(id, currentUser);
  }

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.findByEmployee(employeeId, currentUser);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.delete(id, currentUser);
  }

  @Patch(':id/sign-employee')
  async signByEmployee(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.signByEmployee(id, currentUser);
  }

  @Patch(':id/sign-manager')
  async signByManager(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.idpService.signByManager(id, currentUser);
  }
}

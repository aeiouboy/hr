import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('compensation')
export class CompensationController {
  constructor(private readonly compensationService: CompensationService) {}

  @Get(':employeeId')
  async findByEmployeeId(
    @Param('employeeId') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.compensationService.findByEmployeeId(employeeId, currentUser);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.compensationService.create(dto, currentUser);
  }

  @Patch(':employeeId')
  async update(
    @Param('employeeId') employeeId: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.compensationService.update(employeeId, dto, currentUser);
  }
}

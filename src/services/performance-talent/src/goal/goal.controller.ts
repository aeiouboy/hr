import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.create(dto, currentUser);
  }

  @Get('employee/:employeeId')
  async findAllByEmployee(
    @Param('employeeId') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.findAllByEmployee(employeeId, currentUser);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.findById(id, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.update(id, dto, currentUser);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.delete(id, currentUser);
  }

  @Patch(':id/progress')
  async updateProgress(
    @Param('id') id: string,
    @Body() body: { progress: number; actual_value?: number },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.goalService.updateProgress(id, body.progress, body.actual_value, currentUser);
  }
}

import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.create(dto, currentUser);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.findById(id, currentUser);
  }

  @Get('employee/:employeeId')
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.findByEmployee(employeeId, currentUser);
  }

  @Patch(':id/self-review')
  async submitSelfReview(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.submitSelfReview(id, dto, currentUser);
  }

  @Patch(':id/manager-review')
  async submitManagerReview(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.submitManagerReview(id, dto, currentUser);
  }

  @Patch(':id/calibrate')
  async calibrate(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.calibrate(id, dto, currentUser);
  }

  @Post(':id/scores')
  async addScore(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.evaluationService.addScore(id, dto, currentUser);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  // --- Goals ---

  @Post('goals')
  async createGoal(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.createGoal(dto, currentUser);
  }

  @Get('goals/:employeeId')
  async getGoals(
    @Param('employeeId') employeeId: string,
    @Query('period') period?: string,
  ) {
    return this.performanceService.getGoals(employeeId, period);
  }

  @Patch('goals/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.updateGoal(id, dto, currentUser);
  }

  @Delete('goals/:id')
  async deleteGoal(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.deleteGoal(id, currentUser);
  }

  // --- Evaluations ---

  @Post('evaluations')
  async createEvaluation(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.createEvaluation(dto, currentUser);
  }

  @Get('evaluations/:id')
  async getEvaluation(@Param('id') id: string) {
    return this.performanceService.getEvaluation(id);
  }

  @Patch('evaluations/:id/self-review')
  async submitSelfReview(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.submitSelfReview(id, dto, currentUser);
  }

  @Patch('evaluations/:id/manager-review')
  async submitManagerReview(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.submitManagerReview(id, dto, currentUser);
  }

  @Patch('evaluations/:id/finalize')
  async finalizeEvaluation(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.finalizeEvaluation(id, dto, currentUser);
  }

  // --- Competencies ---

  @Get('competencies')
  async getCompetencies() {
    return this.performanceService.getCompetencies();
  }

  @Post('competencies')
  async createCompetency(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.performanceService.createCompetency(dto, currentUser);
  }
}

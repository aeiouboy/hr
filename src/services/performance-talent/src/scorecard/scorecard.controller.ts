import { Controller, Get, Post, Param } from '@nestjs/common';
import { ScorecardService } from './scorecard.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('scorecard')
export class ScorecardController {
  constructor(private readonly scorecardService: ScorecardService) {}

  @Get('competencies')
  async getCompetencies() {
    return this.scorecardService.getCompetencies();
  }

  @Post('competencies/seed')
  async seedCompetencies() {
    return this.scorecardService.seedCompetencies();
  }

  @Get('evaluation/:evaluationId')
  async getCompositeScore(
    @Param('evaluationId') evaluationId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.scorecardService.getCompositeScore(evaluationId, currentUser);
  }

  @Get('history/:employeeId')
  async getHistory(
    @Param('employeeId') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.scorecardService.getHistory(employeeId, currentUser);
  }
}

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Get('job-posting/:jobPostingId')
  async findByJobPosting(@Param('jobPostingId') jobPostingId: string) {
    return this.candidateService.findByJobPosting(jobPostingId);
  }

  @Get('job-posting/:jobPostingId/pipeline')
  async getPipeline(@Param('jobPostingId') jobPostingId: string) {
    return this.candidateService.getPipeline(jobPostingId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.candidateService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.candidateService.create(dto, currentUser);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: { status: string },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.candidateService.updateStatus(id, dto.status, currentUser);
  }

  @Post(':id/screenings')
  async addScreening(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.candidateService.addScreening(id, dto, currentUser);
  }

  @Patch('screenings/:screeningId/complete')
  async completeScreening(
    @Param('screeningId') screeningId: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.candidateService.completeScreening(screeningId, dto, currentUser);
  }
}

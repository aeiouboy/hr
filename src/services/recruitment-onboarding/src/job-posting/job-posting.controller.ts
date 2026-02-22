import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('job-postings')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('department') department?: string,
  ) {
    return this.jobPostingService.findAll({ status, department });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.jobPostingService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.jobPostingService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.jobPostingService.update(id, dto, currentUser);
  }

  @Patch(':id/publish')
  async publish(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.jobPostingService.publish(id, currentUser);
  }

  @Patch(':id/close')
  async close(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.jobPostingService.close(id, currentUser);
  }
}

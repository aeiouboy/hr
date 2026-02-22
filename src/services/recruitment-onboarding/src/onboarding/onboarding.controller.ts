import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('templates')
  async getTemplates() {
    return this.onboardingService.getTemplates();
  }

  @Get('templates/:id')
  async getTemplateById(@Param('id') id: string) {
    return this.onboardingService.getTemplateById(id);
  }

  @Post('templates')
  async createTemplate(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.onboardingService.createTemplate(dto, currentUser);
  }

  @Post('templates/:templateId/assign/:employeeId')
  async assignTemplate(
    @Param('templateId') templateId: string,
    @Param('employeeId') employeeId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.onboardingService.assignTemplate(templateId, employeeId, currentUser);
  }

  @Get('employee/:employeeId/tasks')
  async getTasksByEmployee(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getTasksByEmployee(employeeId);
  }

  @Get('employee/:employeeId/progress')
  async getProgress(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getProgress(employeeId);
  }

  @Patch('tasks/:taskId/complete')
  async completeTask(
    @Param('taskId') taskId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.onboardingService.completeTask(taskId, currentUser);
  }
}

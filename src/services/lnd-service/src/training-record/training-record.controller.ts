import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { TrainingRecordService } from './training-record.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('training-records')
export class TrainingRecordController {
  constructor(private readonly trainingRecordService: TrainingRecordService) {}

  @Get('employee/:employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string) {
    return this.trainingRecordService.findByEmployee(employeeId);
  }

  @Get('employee/:employeeId/certificates')
  async getCertificates(@Param('employeeId') employeeId: string) {
    return this.trainingRecordService.getCertificates(employeeId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.trainingRecordService.findById(id);
  }

  @Post()
  async create(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.trainingRecordService.create(dto, currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.trainingRecordService.update(id, dto, currentUser);
  }

  @Post(':id/evaluations')
  async addEvaluation(
    @Param('id') id: string,
    @Body() dto: { level: number; score: number; comments?: string; evidence?: string },
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.trainingRecordService.addKirkpatrickEvaluation(id, dto, currentUser);
  }

  @Get(':id/evaluations')
  async getEvaluations(@Param('id') id: string) {
    return this.trainingRecordService.getEvaluations(id);
  }
}

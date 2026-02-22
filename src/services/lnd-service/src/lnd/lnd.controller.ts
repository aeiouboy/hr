import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { LndService } from './lnd.service';
import { CurrentUser, type CurrentUserInterface, PaginationQueryDto } from 'hrms-shared';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { EnrollDto } from './dto/enroll.dto';
import { CompleteTrainingDto } from './dto/complete-training.dto';
import { SubmitEvaluationDto } from './dto/submit-evaluation.dto';
import { IssueCertificateDto } from './dto/issue-certificate.dto';

@Controller('lnd')
export class LndController {
  constructor(private readonly lndService: LndService) {}

  // ── Course Catalog ─────────────────────────────────────────────

  @Get('courses')
  async listCourses(
    @Query() query: PaginationQueryDto,
    @Query('category') category?: string,
    @Query('level') level?: string,
    @Query('mandatory') mandatory?: string,
  ) {
    const filters: any = {};
    if (category) filters.category = category;
    if (level) filters.level = level;
    if (mandatory !== undefined) filters.mandatory = mandatory === 'true';
    return this.lndService.listCourses(query, filters);
  }

  @Get('courses/:id')
  async getCourse(@Param('id') id: string) {
    return this.lndService.getCourseById(id);
  }

  @Post('courses')
  async createCourse(
    @Body() dto: CreateCourseDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.createCourse(dto, user);
  }

  @Post('courses/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.updateCourse(id, dto, user);
  }

  // ── Enrollment ─────────────────────────────────────────────────

  @Post('enrollments')
  async enroll(
    @Body() dto: EnrollDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.enrollInCourse(dto, user);
  }

  @Delete('enrollments/:id')
  async cancelEnrollment(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.cancelEnrollment(id, reason, user);
  }

  @Get('enrollments/my')
  async getMyEnrollments(@CurrentUser() user: CurrentUserInterface) {
    return this.lndService.getMyEnrollments(user);
  }

  // ── Training History ───────────────────────────────────────────

  @Get('training-history/:employeeId')
  async getTrainingHistory(
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.getTrainingHistory(employeeId, user);
  }

  @Post('training/complete')
  async completeTraining(
    @Body() dto: CompleteTrainingDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.completeTraining(dto, user);
  }

  // ── Kirkpatrick Evaluation ─────────────────────────────────────

  @Post('evaluations')
  async submitEvaluation(
    @Body() dto: SubmitEvaluationDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.submitEvaluation(dto, user);
  }

  @Get('evaluations/:trainingRecordId')
  async getEvaluations(@Param('trainingRecordId') trainingRecordId: string) {
    return this.lndService.getEvaluations(trainingRecordId);
  }

  // ── Certificates ───────────────────────────────────────────────

  @Post('certificates')
  async issueCertificate(
    @Body() dto: IssueCertificateDto,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.issueCertificate(dto, user);
  }

  @Get('certificates/my')
  async getMyCertificates(@CurrentUser() user: CurrentUserInterface) {
    return this.lndService.getMyCertificates(user);
  }

  @Get('certificates/employee/:employeeId')
  async getCertificatesByEmployee(
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.lndService.getCertificatesByEmployee(employeeId, user);
  }
}

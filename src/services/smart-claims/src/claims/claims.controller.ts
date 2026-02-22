import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { OcrService } from '../ocr/ocr.service';
import { PolicyService } from '../policy/policy.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('claims')
export class ClaimsController {
  constructor(
    private readonly claimsService: ClaimsService,
    private readonly ocrService: OcrService,
    private readonly policyService: PolicyService,
  ) {}

  @Post()
  async create(@Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.claimsService.createClaim(dto, currentUser);
  }

  @Post(':id/submit')
  async submit(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.claimsService.submitClaim(id, currentUser);
  }

  @Post(':id/approve')
  async approve(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.approveClaim(id, dto, currentUser);
  }

  @Post(':id/reject')
  async reject(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.rejectClaim(id, dto, currentUser);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.claimsService.findById(id);
  }

  @Get('my-history')
  async getMyHistory(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.claimsService.getMyClaimHistory(currentUser);
  }

  @Get('ytd-spending/:type')
  async getYtdSpending(
    @Param('type') type: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.getYtdSpending(currentUser.id, type);
  }

  @Get('pending')
  async getPending(@CurrentUser() currentUser: CurrentUserInterface) {
    return this.claimsService.getPendingClaims(currentUser);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.updateClaim(id, dto, currentUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.claimsService.deleteClaim(id, currentUser);
  }

  @Get(':id/ocr')
  async getOcr(@Param('id') id: string) {
    return this.ocrService.getOcrResult(id);
  }

  @Post('validate')
  async validateClaim(@Body() dto: any) {
    return this.policyService.validateClaim(dto);
  }
}

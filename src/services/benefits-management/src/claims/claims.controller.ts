import { Controller, Get, Post, Param, Body, Query, ForbiddenException } from '@nestjs/common';
import { SmartClaimsService } from './claims.service';
import { ClaimsPolicyValidationService } from '../policy/claims-policy-validation.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ClaimFilterDto } from './dto/claim-filter.dto';
import { RejectClaimDto } from './dto/reject-claim.dto';

@Controller('api/v1/benefits/claims')
export class SmartClaimsController {
  constructor(
    private readonly claimsService: SmartClaimsService,
    private readonly validationService: ClaimsPolicyValidationService,
  ) {}

  @Post('validate')
  async validateClaim(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.validationService.validateClaimSubmission(dto, currentUser);
  }

  @Post()
  async create(
    @Body() dto: CreateClaimDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.createClaim(dto, currentUser);
  }

  @Post(':id/upload')
  async uploadReceipt(
    @Param('id') claimId: string,
    @Body() file: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.uploadReceipt(claimId, file, currentUser);
  }

  @Post(':id/submit')
  async submit(
    @Param('id') claimId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.submitClaim(claimId, currentUser);
  }

  @Get()
  async list(
    @Query() filters: ClaimFilterDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.getClaimHistory((currentUser as any).employee_id, filters, currentUser);
  }

  @Get('ytd-spending')
  async ytdSpending(
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.getYTDSpending((currentUser as any).employee_id, currentUser);
  }

  @Get('team')
  async listTeamClaims(
    @Query() filters: ClaimFilterDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    if (!currentUser.roles.includes('manager') && !currentUser.roles.includes('hr_admin') && !currentUser.roles.includes('hr_manager')) {
      throw new ForbiddenException('Access denied');
    }
    const teamMemberId = (currentUser as any).team_members?.[0] || (currentUser as any).employee_id;
    return this.claimsService.getClaimHistory(teamMemberId, filters, currentUser);
  }

  @Get('all')
  async listAll(
    @Query() filters: ClaimFilterDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    if (!currentUser.roles.includes('hr_admin') && !currentUser.roles.includes('hr_manager')) {
      throw new ForbiddenException('Access denied');
    }
    return this.claimsService.getClaimHistory((currentUser as any).employee_id, filters, currentUser);
  }

  @Get(':id')
  async getById(
    @Param('id') claimId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.getClaimById(claimId, currentUser);
  }

  @Post(':id/approve')
  async approve(
    @Param('id') claimId: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.approveClaim(claimId, currentUser);
  }

  @Post(':id/reject')
  async reject(
    @Param('id') claimId: string,
    @Body() dto: RejectClaimDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.claimsService.rejectClaim(claimId, dto.reason, currentUser);
  }
}

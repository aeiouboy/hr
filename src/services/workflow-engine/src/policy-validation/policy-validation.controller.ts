import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PolicyValidationService } from './policy-validation.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller()
export class PolicyValidationController {
  constructor(private readonly policyValidationService: PolicyValidationService) {}

  // ── Validation Endpoints ─────────────────────────────────────

  @Post('leave/validate')
  async validateLeave(@Body() dto: any) {
    return this.policyValidationService.validateLeave(dto);
  }

  @Post('overtime/validate')
  async validateOvertime(@Body() dto: any) {
    return this.policyValidationService.validateOvertime(dto);
  }

  @Post('benefits/claims/validate')
  async validateClaim(@Body() dto: any) {
    return this.policyValidationService.validateClaim(dto);
  }

  // ── PolicyRule CRUD ──────────────────────────────────────────

  @Post('policy-rules')
  async createRule(@Body() dto: any, @CurrentUser() currentUser: CurrentUserInterface) {
    return this.policyValidationService.createRule(dto, currentUser);
  }

  @Get('policy-rules')
  async listRules(@Query('category') category?: string) {
    return this.policyValidationService.listRules(category);
  }

  @Patch('policy-rules/:id')
  async updateRule(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.policyValidationService.updateRule(id, dto, currentUser);
  }

  @Delete('policy-rules/:id')
  async deactivateRule(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.policyValidationService.deactivateRule(id, currentUser);
  }
}

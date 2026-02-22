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
import { PolicyConfigService } from './policy-config.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';

@Controller('api/v1/settings/policy-rules')
export class PolicyConfigController {
  constructor(private readonly policyConfigService: PolicyConfigService) {}

  @Get()
  async getPolicyRules(@Query('category') category?: string) {
    if (category) {
      return this.policyConfigService.getPolicyRulesByCategory(category);
    }
    return this.policyConfigService.getPolicyRules();
  }

  @Post()
  async createPolicyRule(
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.policyConfigService.createPolicyRule(dto, currentUser);
  }

  @Patch(':id')
  async updatePolicyRule(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.policyConfigService.updatePolicyRule(id, dto, currentUser);
  }

  @Delete(':id')
  async deletePolicyRule(
    @Param('id') id: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.policyConfigService.deletePolicyRule(id, currentUser);
  }
}

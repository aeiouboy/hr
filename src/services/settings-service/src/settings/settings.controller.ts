import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CurrentUser, type CurrentUserInterface } from 'hrms-shared';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { UpdateLeavePolicyDto } from './dto/update-leave-policy.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Get('leave-policy')
  async getLeavePolicy() {
    return this.settingsService.getLeavePolicy();
  }

  @Patch('leave-policy')
  async updateLeavePolicy(
    @Body() dto: UpdateLeavePolicyDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.settingsService.updateLeavePolicy(dto, currentUser);
  }

  @Get(':category')
  async getSettingsByCategory(@Param('category') category: string) {
    return this.settingsService.getSettingsByCategory(category);
  }

  @Patch(':key')
  async updateSetting(
    @Param('key') key: string,
    @Body() dto: UpdateSettingDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.settingsService.updateSetting(key, dto.value, currentUser);
  }

  @Post()
  async createSetting(
    @Body() dto: CreateSettingDto,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.settingsService.createSetting(dto, currentUser);
  }

  @Delete(':key')
  async deleteSetting(
    @Param('key') key: string,
    @CurrentUser() currentUser: CurrentUserInterface,
  ) {
    return this.settingsService.deleteSetting(key, currentUser);
  }
}

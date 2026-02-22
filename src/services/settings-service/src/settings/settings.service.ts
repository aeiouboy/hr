import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  private isHrManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_manager');
  }

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async getSettings() {
    const settings = await this.prisma.setting.findMany({
      orderBy: [{ category: 'asc' }, { key: 'asc' }],
    });

    const grouped: Record<string, any[]> = {};
    for (const setting of settings) {
      if (!grouped[setting.category]) {
        grouped[setting.category] = [];
      }
      grouped[setting.category].push(setting);
    }

    return grouped;
  }

  async getSettingsByCategory(category: string) {
    return this.prisma.setting.findMany({
      where: { category },
      orderBy: { key: 'asc' },
    });
  }

  async updateSetting(key: string, value: any, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can update settings');
    }

    const setting = await this.prisma.setting.findUnique({ where: { key } });
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    await this.prisma.settingAudit.create({
      data: {
        setting_id: setting.id,
        old_value: setting.value,
        new_value: value,
        changed_by: currentUser.id,
      },
    });

    return this.prisma.setting.update({
      where: { key },
      data: { value, updated_by: currentUser.id },
    });
  }

  async createSetting(data: { category: string; key: string; value: any; description?: string; is_system?: boolean }, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can create settings');
    }

    return this.prisma.setting.create({
      data: {
        category: data.category,
        key: data.key,
        value: data.value,
        description: data.description,
        is_system: data.is_system || false,
        updated_by: currentUser.id,
      },
    });
  }

  async deleteSetting(key: string, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can delete settings');
    }

    const setting = await this.prisma.setting.findUnique({ where: { key } });
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }

    if (setting.is_system) {
      throw new ForbiddenException('System settings cannot be deleted');
    }

    return this.prisma.setting.delete({ where: { key } });
  }

  async getLeavePolicy() {
    return this.prisma.setting.findMany({
      where: { category: 'leave_policy' },
      orderBy: { key: 'asc' },
    });
  }

  async updateLeavePolicy(data: any, currentUser: CurrentUserInterface) {
    if (!this.isHrManager(currentUser)) {
      throw new ForbiddenException('Only HR Manager can update leave policy');
    }

    const setting = await this.prisma.setting.findUnique({
      where: { key: 'leave_policy.types' },
    });

    if (!setting) {
      throw new NotFoundException('Leave policy setting not found');
    }

    await this.prisma.settingAudit.create({
      data: {
        setting_id: setting.id,
        old_value: setting.value,
        new_value: data,
        changed_by: currentUser.id,
      },
    });

    return this.prisma.setting.update({
      where: { key: 'leave_policy.types' },
      data: { value: data, updated_by: currentUser.id },
    });
  }

  async getPayrollSettings() {
    return this.prisma.setting.findMany({
      where: { category: 'payroll' },
      orderBy: { key: 'asc' },
    });
  }

  async getNotificationSettings() {
    return this.prisma.setting.findMany({
      where: { category: 'notification' },
      orderBy: { key: 'asc' },
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findAll(activeOnly = true) {
    if (activeOnly) {
      return this.prisma.shift.findMany({ where: { is_active: true } });
    }
    return this.prisma.shift.findMany();
  }

  async findById(id: string) {
    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');
    return shift;
  }

  async create(dto: CreateShiftDto, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create shifts');
    }

    const existing = await this.prisma.shift.findUnique({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException('Shift code already exists');
    }

    return this.prisma.shift.create({
      data: {
        code: dto.code,
        name_en: dto.name_en,
        name_th: dto.name_th,
        start_time: dto.start_time,
        end_time: dto.end_time,
        is_flexible: dto.is_flexible ?? false,
        break_minutes: dto.break_minutes ?? 60,
        work_hours: dto.work_hours ?? 8,
      },
    });
  }

  async update(id: string, dto: UpdateShiftDto, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update shifts');
    }

    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');

    return this.prisma.shift.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can delete shifts');
    }

    const shift = await this.prisma.shift.findUnique({ where: { id } });
    if (!shift) throw new NotFoundException('Shift not found');

    return this.prisma.shift.update({
      where: { id },
      data: { is_active: false },
    });
  }
}

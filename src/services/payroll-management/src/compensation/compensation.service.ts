import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../encryption/encryption.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class CompensationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
  ) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findByEmployeeId(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser) && currentUser.id !== employeeId) {
      throw new ForbiddenException('Access denied');
    }

    const comp = await this.prisma.compensation.findUnique({
      where: { employee_id: employeeId },
    });

    if (!comp) {
      throw new NotFoundException('Compensation record not found');
    }

    return {
      ...comp,
      base_salary: parseFloat(this.encryption.decrypt(comp.base_salary)),
    };
  }

  async create(dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can create compensation records');
    }

    const encryptedSalary = this.encryption.encrypt(String(dto.base_salary));

    return this.prisma.compensation.create({
      data: {
        employee_id: dto.employee_id,
        base_salary: encryptedSalary,
        position_allowance: dto.position_allowance ?? 0,
        housing_allowance: dto.housing_allowance ?? 0,
        transportation_allowance: dto.transportation_allowance ?? 0,
        meal_allowance: dto.meal_allowance ?? 0,
        other_allowances: dto.other_allowances,
        effective_date: new Date(dto.effective_date),
        grade: dto.grade,
        level: dto.level,
        provident_fund_rate: dto.provident_fund_rate ?? 0,
      },
    });
  }

  async update(employeeId: string, dto: any, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can update compensation records');
    }

    const existing = await this.prisma.compensation.findUnique({
      where: { employee_id: employeeId },
    });

    if (!existing) {
      throw new NotFoundException('Compensation record not found');
    }

    const data: any = { ...dto };
    if (dto.base_salary !== undefined) {
      data.base_salary = this.encryption.encrypt(String(dto.base_salary));
    }
    if (dto.effective_date) {
      data.effective_date = new Date(dto.effective_date);
    }

    return this.prisma.compensation.update({
      where: { employee_id: employeeId },
      data,
    });
  }

  async getDecryptedBaseSalary(employeeId: string): Promise<number> {
    const comp = await this.prisma.compensation.findUnique({
      where: { employee_id: employeeId },
    });

    if (!comp) {
      throw new NotFoundException('Compensation record not found');
    }

    return parseFloat(this.encryption.decrypt(comp.base_salary));
  }
}

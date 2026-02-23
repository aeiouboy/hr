import { Injectable, NotFoundException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ReferralFilterDto } from './dto/referral-filter.dto';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class ReferralService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private isManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('manager');
  }

  async create(dto: CreateReferralDto, currentUser: CurrentUserInterface) {
    return this.prisma.hospitalReferral.create({
      data: {
        employee_id: dto.employee_id,
        employee_name: dto.employee_name,
        hospital_name: dto.hospital_name,
        hospital_branch: dto.hospital_branch,
        reason: dto.reason,
        preferred_date: new Date(dto.preferred_date),
        notes: dto.notes,
        status: 'draft',
      },
    });
  }

  async findAll(filters?: ReferralFilterDto) {
    const where: any = {};
    if (filters?.employee_id) where.employee_id = filters.employee_id;
    if (filters?.status) where.status = filters.status;
    if (filters?.date_from || filters?.date_to) {
      where.created_at = {};
      if (filters.date_from) where.created_at.gte = new Date(filters.date_from);
      if (filters.date_to) where.created_at.lte = new Date(filters.date_to);
    }
    return this.prisma.hospitalReferral.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string) {
    const referral = await this.prisma.hospitalReferral.findUnique({ where: { id } });
    if (!referral) throw new NotFoundException(`Referral ${id} not found`);
    return referral;
  }

  async submit(id: string, currentUser: CurrentUserInterface) {
    const referral = await this.findById(id);
    if (referral.employee_id !== currentUser.id) {
      throw new ForbiddenException('Only the owner can submit this referral');
    }
    if (referral.status !== 'draft') {
      throw new ConflictException('Only draft referrals can be submitted');
    }
    return this.prisma.hospitalReferral.update({
      where: { id },
      data: { status: 'pending_manager' },
    });
  }

  async approve(id: string, currentUser: CurrentUserInterface) {
    const referral = await this.findById(id);
    if (referral.status === 'pending_manager') {
      if (!this.isManager(currentUser)) {
        throw new ForbiddenException('Only managers can approve at this stage');
      }
      return this.prisma.hospitalReferral.update({
        where: { id },
        data: {
          status: 'pending_hr',
          approved_by: currentUser.id,
          approved_at: new Date(),
        },
      });
    }
    if (referral.status === 'pending_hr') {
      if (!this.isHr(currentUser)) {
        throw new ForbiddenException('Only HR can approve at this stage');
      }
      return this.prisma.hospitalReferral.update({
        where: { id },
        data: {
          status: 'approved',
          approved_by: currentUser.id,
          approved_at: new Date(),
        },
      });
    }
    throw new ConflictException(`Cannot approve referral with status: ${referral.status}`);
  }

  async reject(id: string, reason: string, currentUser: CurrentUserInterface) {
    if (!reason) throw new BadRequestException('Rejection reason is required');
    const referral = await this.findById(id);
    if (!['pending_manager', 'pending_hr'].includes(referral.status)) {
      throw new ConflictException(`Cannot reject referral with status: ${referral.status}`);
    }
    return this.prisma.hospitalReferral.update({
      where: { id },
      data: {
        status: 'rejected',
        rejected_by: currentUser.id,
        rejected_reason: reason,
      },
    });
  }

  async issue(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can issue referral letters');
    }
    const referral = await this.findById(id);
    if (referral.status !== 'approved') {
      throw new ConflictException('Only approved referrals can have letters issued');
    }
    const year = new Date().getFullYear();
    const validFrom = new Date();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // Use transaction to prevent race conditions in referral number generation
    return this.prisma.$transaction(async (tx) => {
      const count = await tx.hospitalReferral.count({
        where: {
          referral_number: { startsWith: `REF-${year}-` },
        },
      });
      const referralNumber = `REF-${year}-${String(count + 1).padStart(4, '0')}`;

      return tx.hospitalReferral.update({
        where: { id },
        data: {
          status: 'letter_issued',
          referral_number: referralNumber,
          issued_by: currentUser.id,
          issued_at: new Date(),
          valid_from: validFrom,
          valid_until: validUntil,
        },
      });
    });
  }

  async cancel(id: string, currentUser: CurrentUserInterface) {
    const referral = await this.findById(id);
    if (referral.employee_id !== currentUser.id) {
      throw new ForbiddenException('Only the owner can cancel this referral');
    }
    if (!['draft', 'submitted', 'pending_manager', 'pending_hr'].includes(referral.status)) {
      throw new ConflictException('Cannot cancel referral in current status');
    }
    return this.prisma.hospitalReferral.update({
      where: { id },
      data: { status: 'cancelled' },
    });
  }
}

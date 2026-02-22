import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { SubmitClaimDto } from './dto/submit-claim.dto';

@Injectable()
export class ClaimService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async submit(dto: SubmitClaimDto, currentUser: CurrentUserInterface) {
    return this.prisma.benefitClaim.create({
      data: {
        employee_id: currentUser.id,
        plan_id: dto.plan_id,
        claim_type: dto.claim_type,
        amount: dto.amount,
        description: dto.description,
        receipt_date: new Date(dto.receipt_date),
      },
    });
  }

  async approve(id: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can approve claims');
    }
    const claim = await this.prisma.benefitClaim.findUnique({ where: { id } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'pending') {
      throw new BadRequestException('Only pending claims can be approved');
    }
    return this.prisma.benefitClaim.update({
      where: { id },
      data: {
        status: 'approved',
        reviewed_at: new Date(),
        reviewed_by: currentUser.id,
      },
    });
  }

  async reject(id: string, reason: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can reject claims');
    }
    const claim = await this.prisma.benefitClaim.findUnique({ where: { id } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'pending') {
      throw new BadRequestException('Only pending claims can be rejected');
    }
    return this.prisma.benefitClaim.update({
      where: { id },
      data: {
        status: 'rejected',
        reviewed_at: new Date(),
        reviewed_by: currentUser.id,
        rejection_reason: reason,
      },
    });
  }

  async markPaid(id: string, amount: number, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can mark claims as paid');
    }
    const claim = await this.prisma.benefitClaim.findUnique({ where: { id } });
    if (!claim) {
      throw new NotFoundException('Claim not found');
    }
    if (claim.status !== 'approved') {
      throw new BadRequestException('Only approved claims can be marked as paid');
    }
    return this.prisma.benefitClaim.update({
      where: { id },
      data: {
        status: 'paid',
        paid_at: new Date(),
        paid_amount: amount,
      },
    });
  }

  async getByEmployee(employeeId: string, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser) && currentUser.id !== employeeId) {
      throw new ForbiddenException('Access denied');
    }
    return this.prisma.benefitClaim.findMany({
      where: { employee_id: employeeId },
      orderBy: { created_at: 'desc' },
    });
  }

  async getPending() {
    return this.prisma.benefitClaim.findMany({
      where: { status: 'pending' },
      orderBy: { submitted_at: 'asc' },
    });
  }
}

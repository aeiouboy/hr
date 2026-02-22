import { Injectable, NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';
import { SubmitResignationDto } from './dto/submit-resignation.dto';

@Injectable()
export class ResignationService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  private isManager(user: CurrentUserInterface): boolean {
    return user.roles.includes('manager');
  }

  // Default clearance items created on resignation submission
  private getDefaultClearanceItems() {
    return [
      { category: 'it_equipment', item_name: 'Laptop/Notebook', item_name_th: 'แล็ปท็อป/โน้ตบุ๊ก', required: true },
      { category: 'it_equipment', item_name: 'Access Card/Badge', item_name_th: 'บัตรพนักงาน', required: true },
      { category: 'finance', item_name: 'Company Loan Settlement', item_name_th: 'ชำระหนี้เงินกู้บริษัท', required: true },
      { category: 'finance', item_name: 'Advance Payment Settlement', item_name_th: 'ชำระเงินยืมทดรอง', required: true },
      { category: 'documents', item_name: 'Return Confidential Documents', item_name_th: 'คืนเอกสารลับ', required: true },
      { category: 'documents', item_name: 'NDA Acknowledgment', item_name_th: 'ยืนยัน NDA', required: true },
      { category: 'knowledge_transfer', item_name: 'Train Successor/Replacement', item_name_th: 'ฝึกอบรมผู้สืบทอดงาน', required: true },
      { category: 'knowledge_transfer', item_name: 'Process Documentation', item_name_th: 'จัดทำเอกสารขั้นตอนงาน', required: true },
      { category: 'access_security', item_name: 'Email Account Deactivation', item_name_th: 'ปิดบัญชีอีเมล', required: true },
      { category: 'access_security', item_name: 'System Access Revocation', item_name_th: 'เพิกถอนสิทธิ์ระบบ', required: true },
    ];
  }

  async submitResignation(dto: SubmitResignationDto, user: CurrentUserInterface) {
    // Validate last_working_date is in the future
    const lastWorkingDate = new Date(dto.last_working_date);
    if (lastWorkingDate <= new Date()) {
      throw new BadRequestException('Last working date must be in the future');
    }

    // Check for duplicate (already pending resignation for this employee)
    const existing = await this.prisma.resignation.findFirst({
      where: {
        employee_id: dto.employee_id,
        status: { in: ['submitted', 'manager_approved', 'hr_clearance', 'settlement'] },
      },
    });

    if (existing) {
      throw new ConflictException('A resignation request is already pending for this employee');
    }

    const resignation = await this.prisma.resignation.create({
      data: {
        employee_id: dto.employee_id,
        employee_name: dto.employee_name,
        department: dto.department,
        position: dto.position,
        last_working_date: lastWorkingDate,
        reason_type: dto.reason_type,
        reason_detail: dto.reason_detail,
        manager_id: dto.manager_id,
        status: 'submitted',
        clearance_items: {
          create: this.getDefaultClearanceItems(),
        },
      },
      include: { clearance_items: true },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: resignation.id,
        action: 'submit_resignation',
        performed_by: user.id,
        details: JSON.stringify({ employee_id: dto.employee_id, reason_type: dto.reason_type }),
      },
    });

    return resignation;
  }

  async getResignation(id: string, user: CurrentUserInterface) {
    const resignation = await this.prisma.resignation.findUnique({
      where: { id },
      include: { clearance_items: true },
    });

    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    return resignation;
  }

  async managerApproveResignation(id: string, comments: string, user: CurrentUserInterface) {
    if (!this.isManager(user) && !this.isHr(user)) {
      throw new ForbiddenException('Only managers can approve resignations');
    }

    const resignation = await this.prisma.resignation.findUnique({ where: { id } });
    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    if (resignation.status !== 'submitted') {
      throw new BadRequestException('Resignation must be in submitted status for manager approval');
    }

    const updated = await this.prisma.resignation.update({
      where: { id },
      data: {
        status: 'manager_approved',
        manager_approved_at: new Date(),
        manager_comments: comments,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: id,
        action: 'manager_approve_resignation',
        performed_by: user.id,
        details: JSON.stringify({ comments }),
      },
    });

    return updated;
  }

  async completeClearanceItem(resignationId: string, itemId: string, user: CurrentUserInterface) {
    if (!this.isHr(user)) {
      throw new ForbiddenException('Only HR can complete clearance items');
    }

    const item = await this.prisma.clearanceItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException('Clearance item not found');
    }

    if (item.resignation_id !== resignationId) {
      throw new BadRequestException('Clearance item does not belong to this resignation');
    }

    const updated = await this.prisma.clearanceItem.update({
      where: { id: itemId },
      data: {
        status: 'completed',
        completed_date: new Date(),
        completed_by: user.id,
      },
    });

    return updated;
  }

  async completeHrClearance(id: string, user: CurrentUserInterface) {
    if (!this.isHr(user)) {
      throw new ForbiddenException('Only HR can complete clearance');
    }

    const resignation = await this.prisma.resignation.findUnique({
      where: { id },
      include: { clearance_items: true },
    });

    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    if (resignation.status !== 'manager_approved') {
      throw new BadRequestException('Resignation must be manager approved before HR clearance');
    }

    // Check all required clearance items are completed
    const requiredItems = resignation.clearance_items.filter((item) => item.required);
    const pendingRequired = requiredItems.filter((item) => item.status !== 'completed');

    if (pendingRequired.length > 0) {
      throw new BadRequestException(
        `Cannot complete HR clearance: ${pendingRequired.length} required clearance items are not completed`,
      );
    }

    const updated = await this.prisma.resignation.update({
      where: { id },
      data: {
        status: 'hr_clearance',
        hr_clearance_completed: true,
        hr_clearance_date: new Date(),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: id,
        action: 'complete_hr_clearance',
        performed_by: user.id,
      },
    });

    return updated;
  }

  async processSettlement(id: string, amount: number, user: CurrentUserInterface) {
    if (!this.isHr(user)) {
      throw new ForbiddenException('Only HR can process settlements');
    }

    const resignation = await this.prisma.resignation.findUnique({ where: { id } });
    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    if (resignation.status !== 'hr_clearance') {
      throw new BadRequestException('HR clearance must be completed before processing settlement');
    }

    const updated = await this.prisma.resignation.update({
      where: { id },
      data: {
        status: 'settlement',
        settlement_amount: amount,
        settlement_date: new Date(),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: id,
        action: 'process_settlement',
        performed_by: user.id,
        details: JSON.stringify({ amount }),
      },
    });

    return updated;
  }

  async completeResignation(id: string, user: CurrentUserInterface) {
    if (!this.isHr(user)) {
      throw new ForbiddenException('Only HR can complete resignations');
    }

    const resignation = await this.prisma.resignation.findUnique({ where: { id } });
    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    if (resignation.status !== 'settlement') {
      throw new BadRequestException('Settlement must be processed before completing resignation');
    }

    const updated = await this.prisma.resignation.update({
      where: { id },
      data: { status: 'completed' },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: id,
        action: 'complete_resignation',
        performed_by: user.id,
      },
    });

    return updated;
  }

  async withdrawResignation(id: string, user: CurrentUserInterface) {
    const resignation = await this.prisma.resignation.findUnique({ where: { id } });
    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    // Can only withdraw before manager approval
    if (resignation.status !== 'submitted') {
      throw new BadRequestException('Resignation can only be withdrawn before manager approval');
    }

    // Employee can only withdraw their own resignation
    if (resignation.employee_id !== user.id && !this.isHr(user)) {
      throw new ForbiddenException('You can only withdraw your own resignation');
    }

    const updated = await this.prisma.resignation.update({
      where: { id },
      data: { status: 'withdrawn' },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'resignation',
        entity_id: id,
        action: 'withdraw_resignation',
        performed_by: user.id,
      },
    });

    return updated;
  }

  async listResignations(user: CurrentUserInterface) {
    if (this.isHr(user)) {
      // HR sees all
      return this.prisma.resignation.findMany({
        include: { clearance_items: true },
        orderBy: { created_at: 'desc' },
      });
    }

    if (this.isManager(user)) {
      // Manager sees their team
      return this.prisma.resignation.findMany({
        where: { manager_id: user.id },
        include: { clearance_items: true },
        orderBy: { created_at: 'desc' },
      });
    }

    // Employee sees only their own
    return this.prisma.resignation.findMany({
      where: { employee_id: user.id },
      include: { clearance_items: true },
      orderBy: { created_at: 'desc' },
    });
  }

  async getClearanceItems(resignationId: string) {
    const resignation = await this.prisma.resignation.findUnique({ where: { id: resignationId } });
    if (!resignation) {
      throw new NotFoundException('Resignation not found');
    }

    return this.prisma.clearanceItem.findMany({
      where: { resignation_id: resignationId },
    });
  }
}

import { Injectable, NotFoundException, ForbiddenException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface } from 'hrms-shared';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  private isHr(user: CurrentUserInterface): boolean {
    return user.roles.includes('hr_admin') || user.roles.includes('hr_manager');
  }

  async findByEmployee(employeeId: string) {
    return this.prisma.enrollment.findMany({
      where: { employee_id: employeeId },
      include: { course: true },
      orderBy: { enrollment_date: 'desc' },
    });
  }

  async enroll(courseId: string, employeeId: string, dto: any) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'active') {
      throw new BadRequestException('Course is not active');
    }

    // Check for duplicate enrollment
    const existing = await this.prisma.enrollment.findUnique({
      where: { course_id_employee_id: { course_id: courseId, employee_id: employeeId } },
    });
    if (existing) {
      throw new ConflictException('Already enrolled in this course');
    }

    // Check capacity
    const enrollmentCount = await this.prisma.enrollment.count({
      where: { course_id: courseId, status: { in: ['enrolled', 'in_progress'] } },
    });
    if (enrollmentCount >= course.max_participants) {
      throw new BadRequestException('Course is full');
    }

    return this.prisma.enrollment.create({
      data: {
        course_id: courseId,
        employee_id: employeeId,
        schedule_id: dto.schedule_id,
        status: 'enrolled',
      },
      include: { course: true },
    });
  }

  async complete(enrollmentId: string, dto: { score?: number; feedback?: string }, currentUser: CurrentUserInterface) {
    if (!this.isHr(currentUser)) {
      throw new ForbiddenException('Only HR can mark enrollment as complete');
    }

    const enrollment = await this.prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    if (enrollment.status === 'completed') {
      throw new BadRequestException('Enrollment already completed');
    }

    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'completed',
        completion_date: new Date(),
        score: dto.score,
        feedback: dto.feedback,
        progress: 100,
        certificate_id: `CERT-${Date.now()}`,
      },
    });
  }

  async cancel(enrollmentId: string, currentUser: CurrentUserInterface) {
    const enrollment = await this.prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    if (enrollment.status === 'completed') {
      throw new BadRequestException('Cannot cancel a completed enrollment');
    }

    // Only HR or the enrolled employee can cancel
    if (!this.isHr(currentUser) && enrollment.employee_id !== currentUser.id) {
      throw new ForbiddenException('Not authorized to cancel this enrollment');
    }

    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status: 'cancelled' },
    });
  }

  async updateProgress(enrollmentId: string, progress: number) {
    const enrollment = await this.prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    return this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress,
        status: progress > 0 ? 'in_progress' : enrollment.status,
      },
    });
  }
}

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CurrentUserInterface, PaginationQueryDto, paginate, type PaginatedResult } from 'hrms-shared';
import { CreateCourseDto, UpdateCourseDto } from './dto/create-course.dto';
import { EnrollDto } from './dto/enroll.dto';
import { CompleteTrainingDto } from './dto/complete-training.dto';
import { SubmitEvaluationDto } from './dto/submit-evaluation.dto';
import { IssueCertificateDto } from './dto/issue-certificate.dto';

// ── Helper: check if user has HR role ────────────────────────────
function isHrUser(user: CurrentUserInterface): boolean {
  return (
    user.roles?.includes('hr_admin') ||
    user.roles?.includes('hr_manager') ||
    false
  );
}

@Injectable()
export class LndService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Course Catalog ─────────────────────────────────────────────

  async listCourses(
    query: PaginationQueryDto,
    filters?: { category?: string; level?: string; mandatory?: boolean },
  ): Promise<PaginatedResult<any>> {
    const where: any = {};

    if (filters?.category) {
      where.category = filters.category;
    }
    if (filters?.level) {
      where.level = filters.level;
    }
    if (filters?.mandatory !== undefined) {
      where.mandatory = filters.mandatory;
    }

    const total = await this.prisma.course.count({ where });
    const courses = await this.prisma.course.findMany({
      where,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: { created_at: query.order || 'desc' },
    });

    return paginate(courses, total, query);
  }

  async getCourseById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { enrollments: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async createCourse(dto: CreateCourseDto, user: CurrentUserInterface) {
    if (!isHrUser(user)) {
      throw new ForbiddenException('Only HR users can create courses');
    }

    const existing = await this.prisma.course.findUnique({
      where: { code: dto.code },
    });

    if (existing) {
      throw new BadRequestException('Course code already exists');
    }

    const course = await this.prisma.course.create({
      data: {
        code: dto.code,
        name_en: dto.name_en,
        name_th: dto.name_th,
        description_en: dto.description_en,
        description_th: dto.description_th,
        category: dto.category,
        delivery_method: dto.delivery_method,
        duration_hours: dto.duration_hours,
        credits: dto.credits || 0,
        level: dto.level || 'beginner',
        mandatory: dto.mandatory || false,
        max_participants: dto.max_participants,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'course',
        entity_id: course.id,
        action: 'create',
        performed_by: user.id,
        details: JSON.stringify({ code: dto.code, name_en: dto.name_en }),
      },
    });

    return course;
  }

  async updateCourse(id: string, dto: UpdateCourseDto, user: CurrentUserInterface) {
    if (!isHrUser(user)) {
      throw new ForbiddenException('Only HR users can update courses');
    }

    const existing = await this.prisma.course.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Course not found');
    }

    const course = await this.prisma.course.update({
      where: { id },
      data: dto as any,
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'course',
        entity_id: id,
        action: 'update',
        performed_by: user.id,
        details: JSON.stringify(dto),
      },
    });

    return course;
  }

  // ── Enrollment ─────────────────────────────────────────────────

  async enrollInCourse(dto: EnrollDto, user: CurrentUserInterface) {
    const course = await this.prisma.course.findUnique({
      where: { id: dto.course_id },
      include: { enrollments: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.status !== 'active') {
      throw new BadRequestException('Cannot enroll in inactive course');
    }

    // Check for duplicate enrollment
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: {
        course_id: dto.course_id,
        employee_id: dto.employee_id,
        status: { in: ['enrolled', 'in_progress'] },
      },
    });

    if (existingEnrollment) {
      throw new BadRequestException('Employee is already enrolled in this course');
    }

    // Check max participants
    if (course.max_participants) {
      const activeEnrollments = course.enrollments.filter(
        (e) => e.status === 'enrolled' || e.status === 'in_progress',
      );
      if (activeEnrollments.length >= course.max_participants) {
        throw new BadRequestException('Course is full');
      }
    }

    const enrollment = await this.prisma.enrollment.create({
      data: {
        course_id: dto.course_id,
        employee_id: dto.employee_id,
        employee_name: dto.employee_name,
        status: 'enrolled',
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'enrollment',
        entity_id: enrollment.id,
        action: 'create',
        performed_by: user.id,
        details: JSON.stringify({ course_id: dto.course_id, employee_id: dto.employee_id }),
      },
    });

    return enrollment;
  }

  async cancelEnrollment(enrollmentId: string, reason: string, user: CurrentUserInterface) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Only the enrolled employee or HR can cancel
    if (enrollment.employee_id !== user.id && !isHrUser(user)) {
      throw new ForbiddenException('Not authorized to cancel this enrollment');
    }

    const updated = await this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        status: 'cancelled',
        cancelled_at: new Date(),
        cancellation_reason: reason,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'enrollment',
        entity_id: enrollmentId,
        action: 'cancel',
        performed_by: user.id,
        details: JSON.stringify({ reason }),
      },
    });

    return updated;
  }

  async getMyEnrollments(user: CurrentUserInterface) {
    return this.prisma.enrollment.findMany({
      where: { employee_id: user.id },
      orderBy: { enrolled_at: 'desc' },
    });
  }

  // ── Training History ───────────────────────────────────────────

  async getTrainingHistory(employeeId: string, user: CurrentUserInterface) {
    // Only the employee themselves or HR can view training history
    if (employeeId !== user.id && !isHrUser(user)) {
      throw new ForbiddenException('Not authorized to view this employee\'s training history');
    }

    return this.prisma.trainingRecord.findMany({
      where: { employee_id: employeeId },
      orderBy: { start_date: 'desc' },
    });
  }

  async completeTraining(dto: CompleteTrainingDto, user: CurrentUserInterface) {
    const record = await this.prisma.trainingRecord.create({
      data: {
        enrollment_id: dto.enrollment_id,
        employee_id: dto.employee_id,
        course_code: dto.course_code,
        course_name_en: dto.course_name_en,
        course_name_th: dto.course_name_th,
        training_type: dto.training_type,
        category: dto.category,
        provider: dto.provider,
        instructor_name: dto.instructor_name,
        start_date: new Date(dto.start_date),
        end_date: dto.end_date ? new Date(dto.end_date) : null,
        duration_hours: dto.duration_hours,
        location: dto.location,
        status: 'completed',
        completion_date: new Date(),
        cost: dto.cost,
        currency: dto.currency || 'THB',
        paid_by: dto.paid_by,
        pre_assessment_score: dto.pre_assessment_score,
        post_assessment_score: dto.post_assessment_score,
        feedback: dto.feedback,
      },
    });

    // Update enrollment status if linked
    if (dto.enrollment_id) {
      await this.prisma.enrollment.update({
        where: { id: dto.enrollment_id },
        data: {
          status: 'completed',
          completed_at: new Date(),
        },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'training_record',
        entity_id: record.id,
        action: 'complete',
        performed_by: user.id,
        details: JSON.stringify({
          course_code: dto.course_code,
          employee_id: dto.employee_id,
        }),
      },
    });

    return record;
  }

  // ── Kirkpatrick Evaluation ─────────────────────────────────────

  async submitEvaluation(dto: SubmitEvaluationDto, user: CurrentUserInterface) {
    const trainingRecord = await this.prisma.trainingRecord.findUnique({
      where: { id: dto.training_record_id },
    });

    if (!trainingRecord) {
      throw new NotFoundException('Training record not found');
    }

    // Validate score ranges (0-5)
    const scores = [dto.reaction_score, dto.learning_score, dto.behavior_score, dto.results_score];
    for (const score of scores) {
      if (score !== undefined && score !== null && (score < 0 || score > 5)) {
        throw new BadRequestException('Evaluation scores must be between 0 and 5');
      }
    }

    const evaluation = await this.prisma.trainingEvaluation.create({
      data: {
        training_record_id: dto.training_record_id,
        reaction_score: dto.reaction_score,
        learning_score: dto.learning_score,
        behavior_score: dto.behavior_score,
        results_score: dto.results_score,
        evaluated_by: user.id,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'training_evaluation',
        entity_id: evaluation.id,
        action: 'create',
        performed_by: user.id,
        details: JSON.stringify({ training_record_id: dto.training_record_id }),
      },
    });

    return evaluation;
  }

  async getEvaluations(trainingRecordId: string) {
    const trainingRecord = await this.prisma.trainingRecord.findUnique({
      where: { id: trainingRecordId },
      include: { evaluations: true },
    });

    if (!trainingRecord) {
      throw new NotFoundException('Training record not found');
    }

    return trainingRecord.evaluations;
  }

  // ── Certificates ───────────────────────────────────────────────

  async issueCertificate(dto: IssueCertificateDto, user: CurrentUserInterface) {
    if (!isHrUser(user)) {
      throw new ForbiddenException('Only HR users can issue certificates');
    }

    const certificate = await this.prisma.certificate.create({
      data: {
        employee_id: dto.employee_id,
        training_record_id: dto.training_record_id,
        certificate_number: dto.certificate_number,
        course_name: dto.course_name,
        issue_date: new Date(dto.issue_date),
        expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : null,
        issuing_authority: dto.issuing_authority,
        file_url: dto.file_url,
      },
    });

    // Link certificate to training record if provided
    if (dto.training_record_id) {
      await this.prisma.trainingRecord.update({
        where: { id: dto.training_record_id },
        data: { certificate_id: certificate.id },
      });
    }

    await this.prisma.auditLog.create({
      data: {
        entity_type: 'certificate',
        entity_id: certificate.id,
        action: 'issue',
        performed_by: user.id,
        details: JSON.stringify({
          certificate_number: dto.certificate_number,
          employee_id: dto.employee_id,
        }),
      },
    });

    return certificate;
  }

  async getMyCertificates(user: CurrentUserInterface) {
    return this.prisma.certificate.findMany({
      where: { employee_id: user.id },
      orderBy: { issue_date: 'desc' },
    });
  }

  async getCertificatesByEmployee(employeeId: string, user: CurrentUserInterface) {
    // Only the employee themselves or HR can view certificates
    if (employeeId !== user.id && !isHrUser(user)) {
      throw new ForbiddenException('Not authorized to view this employee\'s certificates');
    }

    return this.prisma.certificate.findMany({
      where: { employee_id: employeeId },
      orderBy: { issue_date: 'desc' },
    });
  }
}

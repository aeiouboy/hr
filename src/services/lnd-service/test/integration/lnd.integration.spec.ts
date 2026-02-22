import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Integration tests for Learning & Development microservice.
 * These tests run against a real database (test database via Prisma).
 * They will fail until the implementation and database setup is complete.
 */
describe('Learning & Development Integration', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean test data
    await prisma.$executeRaw`DELETE FROM "training_evaluations" WHERE training_record_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "training_records" WHERE id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "enrollments" WHERE id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "certificates" WHERE id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "courses" WHERE id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "audit_logs" WHERE entity_id LIKE 'TEST_%'`;
  });

  it('should create a course and persist it in the database', async () => {
    const course = await prisma.course.create({
      data: {
        id: 'TEST_CRS_001',
        code: 'TEST-LDR-101',
        name_en: 'Test Leadership Course',
        name_th: 'หลักสูตรทดสอบภาวะผู้นำ',
        category: 'leadership',
        delivery_method: 'classroom',
        duration_hours: 16,
        credits: 2,
        level: 'beginner',
        mandatory: false,
        max_participants: 30,
        status: 'active',
      },
    });

    expect(course.id).toBe('TEST_CRS_001');

    const found = await prisma.course.findUnique({ where: { id: 'TEST_CRS_001' } });
    expect(found).toBeDefined();
    expect(found!.code).toBe('TEST-LDR-101');
    expect(found!.name_en).toBe('Test Leadership Course');
  });

  it('should create enrollment linked to a course', async () => {
    await prisma.course.create({
      data: {
        id: 'TEST_CRS_002',
        code: 'TEST-CMP-001',
        name_en: 'Test Compliance Course',
        name_th: 'หลักสูตรทดสอบ',
        category: 'compliance',
        delivery_method: 'e-learning',
        duration_hours: 4,
        status: 'active',
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        id: 'TEST_ENR_001',
        course_id: 'TEST_CRS_002',
        employee_id: 'EMP001',
        employee_name: 'Test Employee',
        status: 'enrolled',
      },
    });

    expect(enrollment.id).toBe('TEST_ENR_001');
    expect(enrollment.course_id).toBe('TEST_CRS_002');

    const enrollments = await prisma.enrollment.findMany({
      where: { course_id: 'TEST_CRS_002' },
    });
    expect(enrollments).toHaveLength(1);
  });

  it('should create training record with evaluation', async () => {
    const record = await prisma.trainingRecord.create({
      data: {
        id: 'TEST_TR_001',
        employee_id: 'EMP001',
        course_code: 'TEST-LDR-101',
        course_name_en: 'Test Leadership Course',
        training_type: 'internal',
        category: 'leadership',
        start_date: new Date('2026-02-10'),
        end_date: new Date('2026-02-12'),
        duration_hours: 16,
        status: 'completed',
        completion_date: new Date('2026-02-12'),
        pre_assessment_score: 65,
        post_assessment_score: 88,
      },
    });

    expect(record.id).toBe('TEST_TR_001');

    const evaluation = await prisma.trainingEvaluation.create({
      data: {
        id: 'TEST_EVAL_001',
        training_record_id: 'TEST_TR_001',
        reaction_score: 4.5,
        learning_score: 4.0,
        behavior_score: 3.8,
        results_score: 4.2,
        evaluated_by: 'HR001',
      },
    });

    expect(evaluation.reaction_score).toBe(4.5);
    expect(evaluation.learning_score).toBe(4.0);

    const recordWithEvals = await prisma.trainingRecord.findUnique({
      where: { id: 'TEST_TR_001' },
      include: { evaluations: true },
    });
    expect(recordWithEvals!.evaluations).toHaveLength(1);
  });

  it('should create and query certificates', async () => {
    const cert = await prisma.certificate.create({
      data: {
        id: 'TEST_CERT_001',
        employee_id: 'EMP001',
        certificate_number: 'TEST-CG-2026-0001',
        course_name: 'Test Leadership Course',
        issue_date: new Date('2026-02-15'),
        expiry_date: new Date('2028-02-15'),
        issuing_authority: 'Central Retail Academy',
        status: 'active',
      },
    });

    expect(cert.id).toBe('TEST_CERT_001');

    const certs = await prisma.certificate.findMany({
      where: { employee_id: 'EMP001', id: { startsWith: 'TEST_' } },
    });
    expect(certs).toHaveLength(1);
    expect(certs[0].certificate_number).toBe('TEST-CG-2026-0001');
  });

  it('should track complete training flow from enrollment to certificate', async () => {
    // Step 1: Create course
    await prisma.course.create({
      data: {
        id: 'TEST_CRS_FLOW',
        code: 'TEST-FLOW-001',
        name_en: 'Flow Test Course',
        name_th: 'หลักสูตรทดสอบ',
        category: 'technical',
        delivery_method: 'classroom',
        duration_hours: 8,
        status: 'active',
      },
    });

    // Step 2: Enroll employee
    await prisma.enrollment.create({
      data: {
        id: 'TEST_ENR_FLOW',
        course_id: 'TEST_CRS_FLOW',
        employee_id: 'EMP001',
        employee_name: 'Test Employee',
        status: 'enrolled',
      },
    });

    // Step 3: Start training
    await prisma.enrollment.update({
      where: { id: 'TEST_ENR_FLOW' },
      data: { status: 'in_progress', started_at: new Date() },
    });

    // Step 4: Complete training
    await prisma.trainingRecord.create({
      data: {
        id: 'TEST_TR_FLOW',
        enrollment_id: 'TEST_ENR_FLOW',
        employee_id: 'EMP001',
        course_code: 'TEST-FLOW-001',
        course_name_en: 'Flow Test Course',
        training_type: 'internal',
        category: 'technical',
        start_date: new Date('2026-02-10'),
        end_date: new Date('2026-02-10'),
        duration_hours: 8,
        status: 'completed',
        completion_date: new Date('2026-02-10'),
        post_assessment_score: 92,
      },
    });

    await prisma.enrollment.update({
      where: { id: 'TEST_ENR_FLOW' },
      data: { status: 'completed', completed_at: new Date() },
    });

    // Step 5: Issue certificate
    await prisma.certificate.create({
      data: {
        id: 'TEST_CERT_FLOW',
        employee_id: 'EMP001',
        training_record_id: 'TEST_TR_FLOW',
        certificate_number: 'TEST-CG-FLOW-0001',
        course_name: 'Flow Test Course',
        issue_date: new Date('2026-02-12'),
        status: 'active',
      },
    });

    // Verify final state
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: 'TEST_ENR_FLOW' },
    });
    expect(enrollment!.status).toBe('completed');

    const record = await prisma.trainingRecord.findUnique({
      where: { id: 'TEST_TR_FLOW' },
    });
    expect(record!.status).toBe('completed');
    expect(record!.post_assessment_score).toBe(92);

    const cert = await prisma.certificate.findUnique({
      where: { id: 'TEST_CERT_FLOW' },
    });
    expect(cert!.status).toBe('active');
    expect(cert!.training_record_id).toBe('TEST_TR_FLOW');
  });

  it('should filter courses by status and category', async () => {
    await prisma.course.createMany({
      data: [
        {
          id: 'TEST_CRS_FILT_1',
          code: 'TEST-FILT-001',
          name_en: 'Active Leadership',
          name_th: 'Test',
          category: 'leadership',
          delivery_method: 'classroom',
          duration_hours: 8,
          status: 'active',
        },
        {
          id: 'TEST_CRS_FILT_2',
          code: 'TEST-FILT-002',
          name_en: 'Archived Compliance',
          name_th: 'Test',
          category: 'compliance',
          delivery_method: 'e-learning',
          duration_hours: 4,
          status: 'archived',
        },
      ],
    });

    const activeCourses = await prisma.course.findMany({
      where: { status: 'active', id: { startsWith: 'TEST_CRS_FILT_' } },
    });
    expect(activeCourses).toHaveLength(1);
    expect(activeCourses[0].name_en).toBe('Active Leadership');

    const complianceCourses = await prisma.course.findMany({
      where: { category: 'compliance', id: { startsWith: 'TEST_CRS_FILT_' } },
    });
    expect(complianceCourses).toHaveLength(1);
    expect(complianceCourses[0].name_en).toBe('Archived Compliance');
  });
});

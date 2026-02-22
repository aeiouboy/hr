import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Integration tests for Organization Service.
 * These tests require a real database connection.
 */
describe('Organization Service Integration', () => {
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
    await prisma.$executeRawUnsafe('DELETE FROM "incumbents" WHERE employee_id LIKE \'TEST_%\'');
    await prisma.$executeRawUnsafe('DELETE FROM "transfers" WHERE employee_id LIKE \'TEST_%\'');
    await prisma.$executeRawUnsafe('DELETE FROM "reporting_lines" WHERE from_employee_id LIKE \'TEST_%\'');
    await prisma.$executeRawUnsafe('DELETE FROM "org_nodes" WHERE employee_id LIKE \'TEST_%\'');
    await prisma.$executeRawUnsafe('DELETE FROM "positions" WHERE id LIKE \'TEST_%\'');
    await prisma.$executeRawUnsafe('DELETE FROM "departments" WHERE id LIKE \'TEST_%\'');
  });

  it('should create and retrieve a department', async () => {
    const dept = await prisma.department.create({
      data: {
        id: 'TEST_D001',
        code: 'TEST_30040490',
        name_en: 'Test Department',
        name_th: 'แผนกทดสอบ',
        company_id: 'C015',
      },
    });

    expect(dept.id).toBe('TEST_D001');

    const found = await prisma.department.findUnique({ where: { id: 'TEST_D001' } });
    expect(found).toBeDefined();
    expect(found!.name_en).toBe('Test Department');
  });

  it('should create a position linked to department', async () => {
    await prisma.department.create({
      data: {
        id: 'TEST_D002',
        code: 'TEST_30040491',
        name_en: 'Test Dept 2',
        company_id: 'C015',
      },
    });

    const position = await prisma.position.create({
      data: {
        id: 'TEST_POS001',
        position_code: 'TEST_40128307',
        title_en: 'Test Position',
        department_id: 'TEST_D002',
        company_id: 'C015',
        status: 'active',
      },
    });

    expect(position.id).toBe('TEST_POS001');

    const withDept = await prisma.position.findUnique({
      where: { id: 'TEST_POS001' },
      include: { department: true },
    });

    expect(withDept!.department.name_en).toBe('Test Dept 2');
  });

  it('should create org nodes and reporting lines', async () => {
    await prisma.orgNode.create({
      data: {
        id: 'TEST_MGR',
        employee_id: 'TEST_MGR',
        name_en: 'Test Manager',
        department_id: 'D001',
        company_id: 'C015',
      },
    });

    await prisma.orgNode.create({
      data: {
        id: 'TEST_EMP',
        employee_id: 'TEST_EMP',
        name_en: 'Test Employee',
        department_id: 'D001',
        company_id: 'C015',
      },
    });

    await prisma.reportingLine.create({
      data: {
        from_employee_id: 'TEST_EMP',
        to_employee_id: 'TEST_MGR',
        type: 'solid',
        relationship_type: 'direct',
      },
    });

    const lines = await prisma.reportingLine.findMany({
      where: { to_employee_id: 'TEST_MGR', type: 'solid' },
    });

    expect(lines).toHaveLength(1);
    expect(lines[0].from_employee_id).toBe('TEST_EMP');
  });

  it('should create and manage transfer requests', async () => {
    const transfer = await prisma.transfer.create({
      data: {
        employee_id: 'TEST_EMP001',
        from_department_id: 'D001',
        to_department_id: 'D002',
        transfer_type: 'lateral',
        effective_date: new Date('2026-06-01'),
        status: 'pending',
        requested_by: 'HR001',
      },
    });

    expect(transfer.status).toBe('pending');

    const approved = await prisma.transfer.update({
      where: { id: transfer.id },
      data: { status: 'approved', approved_by: 'HR001' },
    });

    expect(approved.status).toBe('approved');
  });

  it('should enforce unique position_code constraint', async () => {
    await prisma.department.create({
      data: {
        id: 'TEST_D003',
        code: 'TEST_30040492',
        name_en: 'Test Dept 3',
        company_id: 'C015',
      },
    });

    await prisma.position.create({
      data: {
        id: 'TEST_POS002',
        position_code: 'TEST_UNIQUE_CODE',
        title_en: 'First Position',
        department_id: 'TEST_D003',
        company_id: 'C015',
      },
    });

    await expect(
      prisma.position.create({
        data: {
          id: 'TEST_POS003',
          position_code: 'TEST_UNIQUE_CODE',
          title_en: 'Duplicate Position',
          department_id: 'TEST_D003',
          company_id: 'C015',
        },
      }),
    ).rejects.toThrow();
  });
});

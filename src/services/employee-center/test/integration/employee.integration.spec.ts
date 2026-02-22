import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Integration tests for Employee Center microservice.
 * These tests run against a real database (test database via Prisma).
 * They will fail until the implementation and database setup is complete.
 */
describe('Employee Center Integration', () => {
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
    // Clean up test data before each test
    // This will need actual Prisma model names once schema is defined
    await prisma.$executeRaw`DELETE FROM "emergency_contacts" WHERE employee_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "dependents" WHERE employee_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "work_permits" WHERE employee_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "employments" WHERE employee_id LIKE 'TEST_%'`;
    await prisma.$executeRaw`DELETE FROM "employees" WHERE id LIKE 'TEST_%'`;
  });

  it('should create and retrieve an employee from database', async () => {
    const testEmployee = {
      id: 'TEST_EMP001',
      employee_id: 'TEST_EMP001',
      first_name_en: 'Test',
      first_name_th: 'ทดสอบ',
      last_name_en: 'Employee',
      last_name_th: 'พนักงาน',
      gender: 'male',
      date_of_birth: new Date('1990-01-01'),
      nationality: 'Thai',
      national_id: '1111111111111',
      email: 'test@centralgroup.com',
    };

    const created = await prisma.employee.create({ data: testEmployee });
    expect(created.id).toBe('TEST_EMP001');

    const found = await prisma.employee.findUnique({ where: { id: 'TEST_EMP001' } });
    expect(found).toBeDefined();
    expect(found!.first_name_en).toBe('Test');
    expect(found!.last_name_en).toBe('Employee');
    expect(found!.nationality).toBe('Thai');
  });

  it('should update personal info and persist changes', async () => {
    // Create test employee
    await prisma.employee.create({
      data: {
        id: 'TEST_EMP002',
        employee_id: 'TEST_EMP002',
        first_name_en: 'Before',
        last_name_en: 'Update',
        gender: 'female',
        date_of_birth: new Date('1995-06-15'),
        nationality: 'Thai',
        national_id: '2222222222222',
        email: 'before@centralgroup.com',
      },
    });

    // Update
    const updated = await prisma.employee.update({
      where: { id: 'TEST_EMP002' },
      data: { first_name_en: 'After', nationality: 'Japanese' },
    });

    expect(updated.first_name_en).toBe('After');
    expect(updated.nationality).toBe('Japanese');

    // Verify persistence
    const fetched = await prisma.employee.findUnique({ where: { id: 'TEST_EMP002' } });
    expect(fetched!.first_name_en).toBe('After');
    expect(fetched!.nationality).toBe('Japanese');
  });

  it('should enforce unique employee_id constraint', async () => {
    await prisma.employee.create({
      data: {
        id: 'TEST_EMP003',
        employee_id: 'TEST_EMP003',
        first_name_en: 'First',
        last_name_en: 'Employee',
        gender: 'male',
        date_of_birth: new Date('1990-01-01'),
        nationality: 'Thai',
        national_id: '3333333333333',
        email: 'first@centralgroup.com',
      },
    });

    await expect(
      prisma.employee.create({
        data: {
          id: 'TEST_EMP003_DUP',
          employee_id: 'TEST_EMP003', // duplicate employee_id
          first_name_en: 'Duplicate',
          last_name_en: 'Employee',
          gender: 'female',
          date_of_birth: new Date('1991-02-02'),
          nationality: 'Thai',
          national_id: '4444444444444',
          email: 'duplicate@centralgroup.com',
        },
      }),
    ).rejects.toThrow();
  });

  it('should cascade delete emergency contacts when employee is deleted', async () => {
    // Create employee with emergency contact
    await prisma.employee.create({
      data: {
        id: 'TEST_EMP004',
        employee_id: 'TEST_EMP004',
        first_name_en: 'Cascade',
        last_name_en: 'Test',
        gender: 'male',
        date_of_birth: new Date('1985-03-10'),
        nationality: 'Thai',
        national_id: '5555555555555',
        email: 'cascade@centralgroup.com',
      },
    });

    await prisma.emergencyContact.create({
      data: {
        id: 'TEST_EC001',
        employee_id: 'TEST_EMP004',
        name: 'Emergency Person',
        relationship: 'spouse',
        phone: '+66 81 000 0000',
        is_primary: true,
      },
    });

    // Delete employee — should cascade
    await prisma.employee.delete({ where: { id: 'TEST_EMP004' } });

    const contacts = await prisma.emergencyContact.findMany({
      where: { employee_id: 'TEST_EMP004' },
    });
    expect(contacts).toHaveLength(0);
  });

  it('should return paginated results for employee list', async () => {
    // Create multiple test employees
    for (let i = 1; i <= 5; i++) {
      await prisma.employee.create({
        data: {
          id: `TEST_EMP_PAGE_${i}`,
          employee_id: `TEST_EMP_PAGE_${i}`,
          first_name_en: `Page${i}`,
          last_name_en: 'Test',
          gender: i % 2 === 0 ? 'female' : 'male',
          date_of_birth: new Date(`199${i}-01-01`),
          nationality: 'Thai',
          national_id: `${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
          email: `page${i}@centralgroup.com`,
        },
      });
    }

    const page1 = await prisma.employee.findMany({
      where: { id: { startsWith: 'TEST_EMP_PAGE_' } },
      take: 2,
      skip: 0,
      orderBy: { id: 'asc' },
    });

    const total = await prisma.employee.count({
      where: { id: { startsWith: 'TEST_EMP_PAGE_' } },
    });

    expect(page1).toHaveLength(2);
    expect(total).toBe(5);

    const page2 = await prisma.employee.findMany({
      where: { id: { startsWith: 'TEST_EMP_PAGE_' } },
      take: 2,
      skip: 2,
      orderBy: { id: 'asc' },
    });

    expect(page2).toHaveLength(2);
    expect(page2[0].id).not.toBe(page1[0].id);
  });

  it('should filter employees by department', async () => {
    // Create employees in different departments
    await prisma.employee.create({
      data: {
        id: 'TEST_EMP_DEPT_1',
        employee_id: 'TEST_EMP_DEPT_1',
        first_name_en: 'Engineering',
        last_name_en: 'Person',
        gender: 'male',
        date_of_birth: new Date('1990-01-01'),
        nationality: 'Thai',
        national_id: '6666666666666',
        email: 'eng@centralgroup.com',
      },
    });

    await prisma.employment.create({
      data: {
        employee_id: 'TEST_EMP_DEPT_1',
        department: 'Engineering',
        status: 'active',
        hire_date: new Date('2020-01-01'),
      },
    });

    await prisma.employee.create({
      data: {
        id: 'TEST_EMP_DEPT_2',
        employee_id: 'TEST_EMP_DEPT_2',
        first_name_en: 'Marketing',
        last_name_en: 'Person',
        gender: 'female',
        date_of_birth: new Date('1992-05-15'),
        nationality: 'Thai',
        national_id: '7777777777777',
        email: 'mkt@centralgroup.com',
      },
    });

    await prisma.employment.create({
      data: {
        employee_id: 'TEST_EMP_DEPT_2',
        department: 'Marketing',
        status: 'active',
        hire_date: new Date('2021-03-15'),
      },
    });

    const engineeringEmployees = await prisma.employment.findMany({
      where: {
        department: 'Engineering',
        employee_id: { startsWith: 'TEST_' },
      },
      include: { employee: true },
    });

    expect(engineeringEmployees).toHaveLength(1);
    expect(engineeringEmployees[0].employee.first_name_en).toBe('Engineering');
  });

  it('should filter employees by status (active, inactive, probation)', async () => {
    await prisma.employee.create({
      data: {
        id: 'TEST_EMP_STATUS_1',
        employee_id: 'TEST_EMP_STATUS_1',
        first_name_en: 'Active',
        last_name_en: 'Employee',
        gender: 'male',
        date_of_birth: new Date('1988-01-01'),
        nationality: 'Thai',
        national_id: '8888888888888',
        email: 'active@centralgroup.com',
      },
    });

    await prisma.employment.create({
      data: {
        employee_id: 'TEST_EMP_STATUS_1',
        department: 'IT',
        status: 'active',
        hire_date: new Date('2018-01-01'),
      },
    });

    await prisma.employee.create({
      data: {
        id: 'TEST_EMP_STATUS_2',
        employee_id: 'TEST_EMP_STATUS_2',
        first_name_en: 'Probation',
        last_name_en: 'Employee',
        gender: 'female',
        date_of_birth: new Date('1995-06-15'),
        nationality: 'Thai',
        national_id: '9999999999999',
        email: 'probation@centralgroup.com',
      },
    });

    await prisma.employment.create({
      data: {
        employee_id: 'TEST_EMP_STATUS_2',
        department: 'IT',
        status: 'probation',
        hire_date: new Date('2025-12-01'),
      },
    });

    const activeEmployees = await prisma.employment.findMany({
      where: {
        status: 'active',
        employee_id: { startsWith: 'TEST_EMP_STATUS_' },
      },
    });

    const probationEmployees = await prisma.employment.findMany({
      where: {
        status: 'probation',
        employee_id: { startsWith: 'TEST_EMP_STATUS_' },
      },
    });

    expect(activeEmployees).toHaveLength(1);
    expect(probationEmployees).toHaveLength(1);
    expect(activeEmployees[0].employee_id).toBe('TEST_EMP_STATUS_1');
    expect(probationEmployees[0].employee_id).toBe('TEST_EMP_STATUS_2');
  });
});

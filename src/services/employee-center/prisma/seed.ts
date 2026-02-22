import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding employee-center database...');

  // Create main employee (สมชาย จริงใจ / EMP001)
  const emp001 = await prisma.employee.upsert({
    where: { employee_id: 'EMP001' },
    update: {},
    create: {
      id: 'EMP001',
      employee_id: 'EMP001',
      first_name_en: 'Chongrak',
      first_name_th: 'จงรักษ์',
      last_name_en: 'Tanaka',
      last_name_th: 'ทานากะ',
      nickname: 'Chong',
      gender: 'male',
      date_of_birth: new Date('1988-05-12'),
      nationality: 'Thai',
      national_id: '1234567890123',
      religion: 'buddhist',
      blood_type: 'O+',
      marital_status: 'married',
      email: 'chongrak.t@centralgroup.com',
      personal_email: 'chongrak.tanaka@gmail.com',
      business_phone: '+66 2 021 9000',
      personal_mobile: '+66 89 123 4567',
    },
  });

  // Employment record
  await prisma.employment.upsert({
    where: { employee_id: emp001.id },
    update: {},
    create: {
      employee_id: emp001.id,
      hire_date: new Date('2015-04-01'),
      status: 'active',
      probation_end_date: new Date('2015-07-01'),
      job_title: 'Product Manager',
      position_id: '40128307',
      department: 'Product Management',
      division: 'RIS',
      location: 'Silom Tower',
      grade: 'TL3',
      level: 'Senior',
      manager_id: 'EMP_SUP001',
    },
  });

  // Address
  await prisma.address.create({
    data: {
      employee_id: emp001.id,
      address_type: 'permanent',
      address_line_1: '123/45 Sukhumvit Road',
      province: 'Bangkok',
      postal_code: '10110',
      country: 'Thailand',
    },
  });

  // Emergency contact
  await prisma.emergencyContact.create({
    data: {
      employee_id: emp001.id,
      name: 'Yuki Tanaka',
      relationship: 'spouse',
      phone: '+66 82 345 6789',
      is_primary: true,
    },
  });

  // Dependent
  await prisma.dependent.create({
    data: {
      employee_id: emp001.id,
      name: 'Yuki Tanaka',
      relationship_type: 'spouse',
      date_of_birth: new Date('1990-03-15'),
      gender: 'female',
    },
  });

  // Dependent - child
  await prisma.dependent.create({
    data: {
      employee_id: emp001.id,
      name: 'Hana Tanaka',
      relationship_type: 'child',
      date_of_birth: new Date('2018-08-20'),
      gender: 'female',
    },
  });

  // Work permit
  await prisma.workPermit.create({
    data: {
      employee_id: emp001.id,
      permit_type: 'non_immigrant_b',
      permit_number: 'WP-2024-123456',
      issue_date: new Date('2024-01-15'),
      expiry_date: new Date('2026-03-20'),
      issuing_country: 'Thailand',
      status: 'active',
    },
  });

  // Create supervisor
  const supEmp = await prisma.employee.upsert({
    where: { employee_id: 'EMP_SUP001' },
    update: {},
    create: {
      id: 'EMP_SUP001',
      employee_id: 'EMP_SUP001',
      first_name_en: 'Rungrote',
      first_name_th: 'รุ่งโรจน์',
      last_name_en: 'Amnuaysopon',
      last_name_th: 'อำนวยโสภณ',
      gender: 'male',
      date_of_birth: new Date('1975-11-03'),
      nationality: 'Thai',
      national_id: '9876543210987',
      email: 'rungrote.a@centralgroup.com',
    },
  });

  await prisma.employment.upsert({
    where: { employee_id: supEmp.id },
    update: {},
    create: {
      employee_id: supEmp.id,
      hire_date: new Date('2010-01-15'),
      status: 'active',
      job_title: 'VP of Product',
      department: 'Product Management',
      division: 'RIS',
      location: 'Silom Tower',
      grade: 'D1',
      level: 'Director',
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

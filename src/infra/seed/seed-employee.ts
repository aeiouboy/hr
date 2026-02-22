/**
 * Seed Employee Data
 * Migrates mock-employee.js data to employee-center Prisma schema
 */
import { PrismaClient } from '../../services/employee-center/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Data extracted from apps/js/data/mock-employee.js
// ---------------------------------------------------------------------------

const employees = [
  {
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
    photo_url: 'https://i.pravatar.cc/150?img=11',
    email: 'chongrak.t@centralgroup.com',
    personal_email: 'chongrak.tanaka@gmail.com',
    business_phone: '+66 2 021 9000',
    personal_mobile: '+66 89 123 4567',
  },
  {
    employee_id: 'EMP_SUP001',
    first_name_en: 'Rungrote',
    first_name_th: 'รุ่งโรจน์',
    last_name_en: 'Amnuaysopon',
    last_name_th: 'อำนวยสพน',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1982-03-20'),
    nationality: 'Thai',
    national_id: '1100200345678',
    religion: 'buddhist',
    blood_type: 'A+',
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=12',
    email: 'rungrote.a@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9130',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_SUP002',
    first_name_en: 'Kajorn',
    first_name_th: 'ขจร',
    last_name_en: 'Kanjanawarin',
    last_name_th: 'กาญจนวรินทร์',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1978-08-14'),
    nationality: 'Thai',
    national_id: '1100300456789',
    religion: 'buddhist',
    blood_type: 'B+',
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=13',
    email: 'kajorn.k@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9120',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_DR001',
    first_name_en: 'Naruechon',
    first_name_th: 'นฤชล',
    last_name_en: 'Woraphatphawan',
    last_name_th: 'วรพัฒน์พาวัลย์',
    nickname: 'Non',
    gender: 'male',
    date_of_birth: new Date('2001-05-15'),
    nationality: 'Thai',
    national_id: '1100400567890',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'single',
    photo_url: 'https://i.pravatar.cc/150?img=14',
    email: 'naruechon.w@centralgroup.com',
    personal_email: null,
    business_phone: '+66 2 021 9141',
    personal_mobile: '+66 81 111 1111',
  },
  {
    employee_id: 'EMP_DR002',
    first_name_en: 'Punnapa',
    first_name_th: 'ปุณณภา',
    last_name_en: 'Thianchai',
    last_name_th: 'เทียนชัย',
    nickname: 'Pun',
    gender: 'female',
    date_of_birth: new Date('2001-09-22'),
    nationality: 'Thai',
    national_id: '1100500678901',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'single',
    photo_url: 'https://i.pravatar.cc/150?img=15',
    email: 'punnapa.t@centralgroup.com',
    personal_email: null,
    business_phone: '+66 2 021 9142',
    personal_mobile: '+66 82 222 2222',
  },
  {
    employee_id: 'EMP_L0',
    first_name_en: 'Tos',
    first_name_th: 'ทศ',
    last_name_en: 'Chirathivat',
    last_name_th: 'จิราธิวัฒน์',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1960-01-15'),
    nationality: 'Thai',
    national_id: '1100600789012',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=23',
    email: 'tos.c@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9000',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_L1',
    first_name_en: 'Suthisarn',
    first_name_th: 'สุทธิศาสน์',
    last_name_en: 'Chirathivat',
    last_name_th: 'จิราธิวัฒน์',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1965-06-10'),
    nationality: 'Thai',
    national_id: '1100700890123',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=22',
    email: 'suthisarn.c@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9001',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_L2',
    first_name_en: 'Rutchapon',
    first_name_th: 'รัชพล',
    last_name_en: 'Vongsatitporn',
    last_name_th: 'วงศ์สถิตย์พร',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1970-11-22'),
    nationality: 'Thai',
    national_id: '1100800901234',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=21',
    email: 'rutchapon.v@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9100',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_L3',
    first_name_en: 'Maneerat',
    first_name_th: 'มณีรัตน์',
    last_name_en: 'Suramethakul',
    last_name_th: 'สุระเมทกุล',
    nickname: null,
    gender: 'female',
    date_of_birth: new Date('1975-04-05'),
    nationality: 'Thai',
    national_id: '1100901012345',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=20',
    email: 'maneerat.s@central.co.th',
    personal_email: null,
    business_phone: '+66 2 021 9110',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_ENG001',
    first_name_en: 'Somchai',
    first_name_th: 'สมชาย',
    last_name_en: 'Prasert',
    last_name_th: 'ประเสริฐ',
    nickname: null,
    gender: 'male',
    date_of_birth: new Date('1985-07-12'),
    nationality: 'Thai',
    national_id: '1101001123456',
    religion: 'buddhist',
    blood_type: 'AB+',
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=20',
    email: 'somchai.p@central.co.th',
    personal_email: null,
    business_phone: '+66 2 123 4571',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_QA001',
    first_name_en: 'Wipawee',
    first_name_th: 'วิภาวี',
    last_name_en: 'Sukhothai',
    last_name_th: 'สุโขทัย',
    nickname: null,
    gender: 'female',
    date_of_birth: new Date('1987-09-30'),
    nationality: 'Thai',
    national_id: '1101101234567',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'single',
    photo_url: 'https://i.pravatar.cc/150?img=21',
    email: 'wipawee.s@central.co.th',
    personal_email: null,
    business_phone: '+66 2 123 4572',
    personal_mobile: null,
  },
  {
    employee_id: 'EMP_HR001',
    first_name_en: 'Nattaya',
    first_name_th: 'ณัฐยา',
    last_name_en: 'Ayutthaya',
    last_name_th: 'อยุธยา',
    nickname: null,
    gender: 'female',
    date_of_birth: new Date('1984-02-18'),
    nationality: 'Thai',
    national_id: '1101201345678',
    religion: 'buddhist',
    blood_type: null,
    marital_status: 'married',
    photo_url: 'https://i.pravatar.cc/150?img=17',
    email: 'nattaya.a@central.co.th',
    personal_email: null,
    business_phone: '+66 2 345 6789',
    personal_mobile: null,
  },
];

// Employments mapped from mock-employee.js employmentInfo
const employments = [
  {
    employee_id: 'EMP001', // will be resolved to UUID
    hire_date: new Date('2015-04-01'),
    status: 'active',
    probation_end_date: new Date('2015-07-01'),
    job_title: 'Product Manager',
    position_id: 'P003',
    department: 'Product Management',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'M2',
    level: 'Manager',
    manager_id: 'EMP_SUP001',
  },
  {
    employee_id: 'EMP_SUP001',
    hire_date: new Date('2013-06-01'),
    status: 'active',
    probation_end_date: new Date('2013-09-01'),
    job_title: 'Head of Product',
    position_id: 'P002',
    department: 'Product Management',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'M1',
    level: 'Senior Manager',
    manager_id: 'EMP_SUP002',
  },
  {
    employee_id: 'EMP_SUP002',
    hire_date: new Date('2010-01-15'),
    status: 'active',
    probation_end_date: new Date('2010-04-15'),
    job_title: 'Head of IT Strategy & Products',
    position_id: 'P_HEAD_PROD',
    department: 'Product Management',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'E3',
    level: 'Executive',
    manager_id: 'EMP_L3',
  },
  {
    employee_id: 'EMP_DR001',
    hire_date: new Date('2025-07-01'),
    status: 'probation',
    probation_end_date: new Date('2026-01-01'),
    job_title: 'Functional Trainee (ProNext)',
    position_id: 'P_FT001',
    department: 'Product Management',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'P3',
    level: 'Associate',
    manager_id: 'EMP001',
  },
  {
    employee_id: 'EMP_DR002',
    hire_date: new Date('2025-07-01'),
    status: 'probation',
    probation_end_date: new Date('2026-01-01'),
    job_title: 'Functional Trainee (ProNext)',
    position_id: 'P_FT002',
    department: 'Product Management',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'P3',
    level: 'Associate',
    manager_id: 'EMP001',
  },
  {
    employee_id: 'EMP_L0',
    hire_date: new Date('1990-01-01'),
    status: 'active',
    probation_end_date: null,
    job_title: 'Executive Chairman & CEO',
    position_id: 'P_CEO',
    department: 'Executive Office',
    division: 'Executive',
    location: 'Central Group Office',
    grade: 'E1',
    level: 'Executive',
    manager_id: null,
  },
  {
    employee_id: 'EMP_L1',
    hire_date: new Date('1995-04-01'),
    status: 'active',
    probation_end_date: null,
    job_title: 'CEO - CRC',
    position_id: 'P_CEO_CRC',
    department: 'Executive Office',
    division: 'Executive',
    location: 'Central Group Office',
    grade: 'E1',
    level: 'Executive',
    manager_id: 'EMP_L0',
  },
  {
    employee_id: 'EMP_L2',
    hire_date: new Date('2005-06-01'),
    status: 'active',
    probation_end_date: null,
    job_title: 'CIO',
    position_id: 'P001',
    department: 'Technology Division',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'E2',
    level: 'Executive',
    manager_id: 'EMP_L1',
  },
  {
    employee_id: 'EMP_L3',
    hire_date: new Date('2008-03-15'),
    status: 'active',
    probation_end_date: null,
    job_title: 'Head of IT Strategy, Application & International',
    position_id: 'P_HEAD_IT',
    department: 'Technology Division',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'E3',
    level: 'Executive',
    manager_id: 'EMP_L2',
  },
  {
    employee_id: 'EMP_ENG001',
    hire_date: new Date('2012-01-15'),
    status: 'active',
    probation_end_date: new Date('2012-04-15'),
    job_title: 'Head of Engineering',
    position_id: 'P010',
    department: 'Engineering',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'M1',
    level: 'Senior Manager',
    manager_id: 'EMP_SUP002',
  },
  {
    employee_id: 'EMP_QA001',
    hire_date: new Date('2014-05-01'),
    status: 'active',
    probation_end_date: new Date('2014-08-01'),
    job_title: 'Head of QA',
    position_id: 'P020',
    department: 'Quality Assurance',
    division: 'Technology Division',
    location: 'Silom Tower',
    grade: 'M1',
    level: 'Senior Manager',
    manager_id: 'EMP_SUP002',
  },
  {
    employee_id: 'EMP_HR001',
    hire_date: new Date('2011-08-01'),
    status: 'active',
    probation_end_date: new Date('2011-11-01'),
    job_title: 'HR Director',
    position_id: 'P030',
    department: 'Human Resources',
    division: 'Corporate Services',
    location: 'Silom Tower',
    grade: 'M1',
    level: 'Senior Manager',
    manager_id: null,
  },
];

// Addresses from mock-employee.js addresses array
const addresses = [
  {
    employee_id: 'EMP001',
    address_type: 'permanent',
    address_line_1: '123/45 Sukhumvit Road',
    address_line_2: 'Soi Sukhumvit 21',
    sub_district: 'Khlong Toei Nuea',
    district: 'Watthana',
    province: 'Bangkok',
    postal_code: '10110',
    country: 'Thailand',
  },
  {
    employee_id: 'EMP001',
    address_type: 'current',
    address_line_1: '456/78 Silom Complex',
    address_line_2: 'Tower A, Unit 2501',
    sub_district: 'Silom',
    district: 'Bang Rak',
    province: 'Bangkok',
    postal_code: '10500',
    country: 'Thailand',
  },
];

// Emergency contacts from mock-employee.js
const emergencyContacts = [
  {
    employee_id: 'EMP001',
    name: 'Yuki Tanaka',
    relationship: 'spouse',
    phone: '+66 82 345 6789',
    is_primary: true,
  },
  {
    employee_id: 'EMP001',
    name: 'Hiroshi Tanaka',
    relationship: 'parent',
    phone: '+66 89 012 3456',
    is_primary: false,
  },
];

// Dependents from mock-employee.js
const dependents = [
  {
    employee_id: 'EMP001',
    name: 'Yuki Tanaka',
    relationship_type: 'spouse',
    date_of_birth: new Date('1990-03-15'),
    gender: 'female',
    national_id: '9876543210123',
    is_tax_deductible: true,
  },
  {
    employee_id: 'EMP001',
    name: 'Sakura Tanaka',
    relationship_type: 'child',
    date_of_birth: new Date('2020-06-20'),
    gender: 'female',
    national_id: '1122334455667',
    is_tax_deductible: true,
  },
];

// Work permits from mock-employee.js
const workPermits = [
  {
    employee_id: 'EMP001',
    permit_type: 'non_immigrant_b',
    permit_number: 'WP-2024-123456',
    issue_date: new Date('2024-01-15'),
    expiry_date: new Date('2026-03-20'),
    issuing_country: 'Thailand',
    status: 'active',
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedEmployees() {
  console.log('Seeding employees...');

  // Map to store employee_id -> UUID for relationship resolution
  const empIdMap: Record<string, string> = {};

  for (const emp of employees) {
    const record = await prisma.employee.upsert({
      where: { employee_id: emp.employee_id },
      create: emp,
      update: emp,
    });
    empIdMap[emp.employee_id] = record.id;
  }
  console.log(`  Seeded ${employees.length} employees`);

  // Seed employments
  console.log('Seeding employments...');
  for (const employment of employments) {
    const empUuid = empIdMap[employment.employee_id];
    if (!empUuid) {
      console.warn(`  WARNING: Employee ${employment.employee_id} not found, skipping employment`);
      continue;
    }
    const data = {
      hire_date: employment.hire_date,
      status: employment.status,
      probation_end_date: employment.probation_end_date,
      job_title: employment.job_title,
      position_id: employment.position_id,
      department: employment.department,
      division: employment.division,
      location: employment.location,
      grade: employment.grade,
      level: employment.level,
      manager_id: employment.manager_id,
    };
    await prisma.employment.upsert({
      where: { employee_id: empUuid },
      create: { employee_id: empUuid, ...data },
      update: data,
    });
  }
  console.log(`  Seeded ${employments.length} employments`);

  // Seed addresses
  console.log('Seeding addresses...');
  let addressCount = 0;
  for (const addr of addresses) {
    const empUuid = empIdMap[addr.employee_id];
    if (!empUuid) continue;
    const { employee_id, ...data } = addr;
    // Use create since addresses don't have a unique constraint on employee+type
    // Delete existing first for idempotency
    await prisma.address.deleteMany({
      where: { employee_id: empUuid, address_type: addr.address_type },
    });
    await prisma.address.create({
      data: { employee_id: empUuid, ...data },
    });
    addressCount++;
  }
  console.log(`  Seeded ${addressCount} addresses`);

  // Seed emergency contacts
  console.log('Seeding emergency contacts...');
  let ecCount = 0;
  for (const ec of emergencyContacts) {
    const empUuid = empIdMap[ec.employee_id];
    if (!empUuid) continue;
    // Delete existing for idempotency
    await prisma.emergencyContact.deleteMany({
      where: { employee_id: empUuid, name: ec.name },
    });
    await prisma.emergencyContact.create({
      data: {
        employee_id: empUuid,
        name: ec.name,
        relationship: ec.relationship,
        phone: ec.phone,
        is_primary: ec.is_primary,
      },
    });
    ecCount++;
  }
  console.log(`  Seeded ${ecCount} emergency contacts`);

  // Seed dependents
  console.log('Seeding dependents...');
  let depCount = 0;
  for (const dep of dependents) {
    const empUuid = empIdMap[dep.employee_id];
    if (!empUuid) continue;
    await prisma.dependent.deleteMany({
      where: { employee_id: empUuid, name: dep.name },
    });
    await prisma.dependent.create({
      data: {
        employee_id: empUuid,
        name: dep.name,
        relationship_type: dep.relationship_type,
        date_of_birth: dep.date_of_birth,
        gender: dep.gender,
        national_id: dep.national_id,
        is_tax_deductible: dep.is_tax_deductible,
      },
    });
    depCount++;
  }
  console.log(`  Seeded ${depCount} dependents`);

  // Seed work permits
  console.log('Seeding work permits...');
  let wpCount = 0;
  for (const wp of workPermits) {
    const empUuid = empIdMap[wp.employee_id];
    if (!empUuid) continue;
    await prisma.workPermit.deleteMany({
      where: { employee_id: empUuid, permit_number: wp.permit_number },
    });
    await prisma.workPermit.create({
      data: {
        employee_id: empUuid,
        permit_type: wp.permit_type,
        permit_number: wp.permit_number,
        issue_date: wp.issue_date,
        expiry_date: wp.expiry_date,
        issuing_country: wp.issuing_country,
        status: wp.status,
      },
    });
    wpCount++;
  }
  console.log(`  Seeded ${wpCount} work permits`);

  return empIdMap;
}

// Allow direct execution
if (require.main === module) {
  seedEmployees()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

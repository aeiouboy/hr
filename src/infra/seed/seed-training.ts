/**
 * Seed Training Data
 * Migrates mock-training.js, mock-training-records.js to learning-development schema
 */
import { PrismaClient } from '../../services/lnd-service/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Courses from MockTrainingData.courses
// ---------------------------------------------------------------------------

const courses = [
  { code: 'ONB-101', name_en: 'New Employee Orientation', name_th: 'ปฐมนิเทศพนักงานใหม่', description_en: 'Comprehensive orientation program for new employees covering company culture, policies, and benefits.', description_th: 'โปรแกรมปฐมนิเทศสำหรับพนักงานใหม่ครอบคลุมวัฒนธรรมองค์กร นโยบาย และสวัสดิการ', category: 'ONBOARD', delivery_method: 'blended', duration_hours: 8, credits: 1, level: 'beginner', mandatory: true, max_participants: 30, status: 'active', rating: 4.5, review_count: 120 },
  { code: 'LDR-201', name_en: 'Leadership Essentials', name_th: 'หลักสูตรภาวะผู้นำ', description_en: 'Foundation leadership skills for aspiring managers and team leads.', description_th: 'ทักษะพื้นฐานภาวะผู้นำสำหรับผู้จัดการและหัวหน้าทีมใหม่', category: 'LEADERSHIP', delivery_method: 'classroom', duration_hours: 16, credits: 2, level: 'intermediate', mandatory: false, max_participants: 25, status: 'active', rating: 4.7, review_count: 85 },
  { code: 'TECH-301', name_en: 'Cloud Architecture Fundamentals', name_th: 'พื้นฐานสถาปัตยกรรมคลาวด์', description_en: 'Introduction to cloud computing and architecture patterns for enterprise applications.', description_th: 'ความรู้เบื้องต้นเกี่ยวกับคลาวด์คอมพิวติ้งและรูปแบบสถาปัตยกรรมสำหรับแอปพลิเคชันองค์กร', category: 'TECHNICAL', delivery_method: 'online', duration_hours: 12, credits: 1.5, level: 'intermediate', mandatory: false, max_participants: 50, status: 'active', rating: 4.3, review_count: 200 },
  { code: 'SOFT-101', name_en: 'Effective Communication', name_th: 'การสื่อสารที่มีประสิทธิภาพ', description_en: 'Build strong communication skills for workplace interactions.', description_th: 'สร้างทักษะการสื่อสารที่เข้มแข็งสำหรับการทำงาน', category: 'SOFT', delivery_method: 'workshop', duration_hours: 6, credits: 1, level: 'beginner', mandatory: false, max_participants: 20, status: 'active', rating: 4.6, review_count: 150 },
  { code: 'CMP-101', name_en: 'Anti-Corruption & Compliance', name_th: 'การต่อต้านทุจริตและการปฏิบัติตามกฎระเบียบ', description_en: 'Mandatory compliance training covering anti-corruption policies and ethical business practices.', description_th: 'การอบรมภาคบังคับเกี่ยวกับนโยบายต่อต้านทุจริตและจริยธรรมทางธุรกิจ', category: 'COMPLIANCE', delivery_method: 'online', duration_hours: 4, credits: 0.5, level: 'beginner', mandatory: true, max_participants: 100, status: 'active', rating: 4.0, review_count: 500 },
  { code: 'DIG-201', name_en: 'Digital Transformation for Retail', name_th: 'การเปลี่ยนผ่านดิจิทัลสำหรับค้าปลีก', description_en: 'Understanding digital transformation strategies in the retail industry.', description_th: 'ทำความเข้าใจกลยุทธ์การเปลี่ยนผ่านดิจิทัลในอุตสาหกรรมค้าปลีก', category: 'DIGITAL', delivery_method: 'blended', duration_hours: 10, credits: 1.5, level: 'intermediate', mandatory: false, max_participants: 40, status: 'active', rating: 4.4, review_count: 75 },
  { code: 'RTL-101', name_en: 'Retail Operations Excellence', name_th: 'ความเป็นเลิศในการดำเนินงานค้าปลีก', description_en: 'Best practices for retail store operations, inventory management, and customer experience.', description_th: 'แนวทางปฏิบัติที่ดีที่สุดสำหรับการดำเนินงานร้านค้า การจัดการสินค้าคงคลัง และประสบการณ์ลูกค้า', category: 'RETAIL', delivery_method: 'classroom', duration_hours: 8, credits: 1, level: 'beginner', mandatory: false, max_participants: 30, status: 'active', rating: 4.2, review_count: 320 },
  { code: 'SRV-101', name_en: 'Customer Service Excellence', name_th: 'ความเป็นเลิศในการบริการลูกค้า', description_en: 'Deliver outstanding customer service aligned with Central Group standards.', description_th: 'ให้บริการลูกค้าที่โดดเด่นตามมาตรฐาน Central Group', category: 'SERVICE', delivery_method: 'workshop', duration_hours: 6, credits: 1, level: 'beginner', mandatory: false, max_participants: 25, status: 'active', rating: 4.8, review_count: 450 },
];

// Enrollments
const enrollments = [
  { course_code: 'ONB-101', employee_id: 'EMP_DR001', employee_name: 'Naruechon Woraphatphawan', status: 'completed', enrolled_at: new Date('2025-07-01'), started_at: new Date('2025-07-01'), completed_at: new Date('2025-07-03') },
  { course_code: 'ONB-101', employee_id: 'EMP_DR002', employee_name: 'Punnapa Thianchai', status: 'completed', enrolled_at: new Date('2025-07-01'), started_at: new Date('2025-07-01'), completed_at: new Date('2025-07-03') },
  { course_code: 'CMP-101', employee_id: 'EMP001', employee_name: 'Chongrak Tanaka', status: 'completed', enrolled_at: new Date('2025-03-01'), started_at: new Date('2025-03-05'), completed_at: new Date('2025-03-05') },
  { course_code: 'LDR-201', employee_id: 'EMP001', employee_name: 'Chongrak Tanaka', status: 'completed', enrolled_at: new Date('2025-06-01'), started_at: new Date('2025-06-15'), completed_at: new Date('2025-06-16') },
  { course_code: 'TECH-301', employee_id: 'EMP001', employee_name: 'Chongrak Tanaka', status: 'enrolled', enrolled_at: new Date('2026-01-10'), started_at: null, completed_at: null },
  { course_code: 'DIG-201', employee_id: 'EMP_DR001', employee_name: 'Naruechon Woraphatphawan', status: 'enrolled', enrolled_at: new Date('2026-01-15'), started_at: null, completed_at: null },
];

// Training records
const trainingRecords = [
  {
    employee_id: 'EMP001', course_code: 'CMP-101', course_name_en: 'Anti-Corruption & Compliance', course_name_th: 'การต่อต้านทุจริตและการปฏิบัติตามกฎระเบียบ', training_type: 'internal', category: 'COMPLIANCE', provider: 'Central Academy', instructor_name: 'Pranee Charoensuk', start_date: new Date('2025-03-05'), end_date: new Date('2025-03-05'), duration_hours: 4, location: 'Online - LMS Platform', status: 'completed', completion_date: new Date('2025-03-05'), cost: 0, currency: 'THB', paid_by: 'company', pre_assessment_score: 65, post_assessment_score: 92,
  },
  {
    employee_id: 'EMP001', course_code: 'LDR-201', course_name_en: 'Leadership Essentials', course_name_th: 'หลักสูตรภาวะผู้นำ', training_type: 'internal', category: 'LEADERSHIP', provider: 'Central Academy', instructor_name: 'Somchai Prasert', start_date: new Date('2025-06-15'), end_date: new Date('2025-06-16'), duration_hours: 16, location: 'Central Academy - Silom', status: 'completed', completion_date: new Date('2025-06-16'), cost: 15000, currency: 'THB', paid_by: 'company', pre_assessment_score: 70, post_assessment_score: 88,
  },
  {
    employee_id: 'EMP_DR001', course_code: 'ONB-101', course_name_en: 'New Employee Orientation', course_name_th: 'ปฐมนิเทศพนักงานใหม่', training_type: 'internal', category: 'ONBOARD', provider: 'Central Academy', instructor_name: 'Somchai Prasert', start_date: new Date('2025-07-01'), end_date: new Date('2025-07-03'), duration_hours: 8, location: 'Central Academy - Lat Phrao', status: 'completed', completion_date: new Date('2025-07-03'), cost: 0, currency: 'THB', paid_by: 'company', pre_assessment_score: null, post_assessment_score: 85,
  },
  {
    employee_id: 'EMP_DR002', course_code: 'ONB-101', course_name_en: 'New Employee Orientation', course_name_th: 'ปฐมนิเทศพนักงานใหม่', training_type: 'internal', category: 'ONBOARD', provider: 'Central Academy', instructor_name: 'Somchai Prasert', start_date: new Date('2025-07-01'), end_date: new Date('2025-07-03'), duration_hours: 8, location: 'Central Academy - Lat Phrao', status: 'completed', completion_date: new Date('2025-07-03'), cost: 0, currency: 'THB', paid_by: 'company', pre_assessment_score: null, post_assessment_score: 90,
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedTraining() {
  console.log('Seeding courses...');
  const courseIdMap: Record<string, string> = {};
  for (const course of courses) {
    const record = await prisma.course.upsert({
      where: { code: course.code },
      create: course,
      update: course,
    });
    courseIdMap[course.code] = record.id;
  }
  console.log(`  Seeded ${courses.length} courses`);

  console.log('Seeding enrollments...');
  // Clear and recreate
  await prisma.enrollment.deleteMany({});
  for (const enr of enrollments) {
    const courseId = courseIdMap[enr.course_code];
    if (!courseId) continue;
    const { course_code, ...data } = enr;
    await prisma.enrollment.create({ data: { course_id: courseId, ...data } });
  }
  console.log(`  Seeded ${enrollments.length} enrollments`);

  console.log('Seeding training records...');
  await prisma.trainingRecord.deleteMany({});
  for (const tr of trainingRecords) {
    await prisma.trainingRecord.create({ data: tr });
  }
  console.log(`  Seeded ${trainingRecords.length} training records`);
}

if (require.main === module) {
  seedTraining()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

/**
 * Seed Recruitment Data
 * Migrates mock-recruitment.js, mock-onboarding.js, mock-resignation.js
 * to recruitment-onboarding Prisma schema
 */
import { PrismaClient } from '../../services/recruitment-onboarding/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Job postings from MockRecruitmentData.jobPostings
// ---------------------------------------------------------------------------

const jobPostings = [
  {
    position_id: 'POS-001',
    position_title: 'Senior Software Engineer',
    position_title_th: 'วิศวกรซอฟต์แวร์อาวุโส',
    department: 'Information Technology',
    department_th: 'ฝ่ายเทคโนโลยีสารสนเทศ',
    company: 'Central Retail Corporation',
    location: 'Bangkok',
    location_th: 'กรุงเทพมหานคร',
    job_family: 'Technology',
    employment_type: 'full_time',
    salary_range_min: 80000,
    salary_range_max: 120000,
    currency: 'THB',
    posting_date: new Date('2025-12-15'),
    closing_date: new Date('2026-02-15'),
    status: 'open',
    headcount: 2,
    filled_count: 0,
    description: 'We are looking for a Senior Software Engineer to join our IT team.',
    description_th: 'เรากำลังมองหาวิศวกรซอฟต์แวร์อาวุโสเพื่อร่วมงานกับทีม IT',
    requirements: ["Bachelor's degree in Computer Science", "5+ years experience", "JavaScript/TypeScript proficiency", "Cloud experience"],
    benefits: ["Competitive salary", "Health insurance", "Provident fund", "Employee discount", "Flexible hours"],
    hiring_manager_id: 'EMP_ENG001',
    hr_recruiter_id: 'EMP_HR001',
    is_internal: true,
    is_external: true,
  },
  {
    position_id: 'POS-002',
    position_title: 'HR Business Partner',
    position_title_th: 'พันธมิตรธุรกิจทรัพยากรบุคคล',
    department: 'Human Resources',
    department_th: 'ฝ่ายทรัพยากรบุคคล',
    company: 'Central Retail Corporation',
    location: 'Bangkok',
    location_th: 'กรุงเทพมหานคร',
    job_family: 'Human Resources',
    employment_type: 'full_time',
    salary_range_min: 60000,
    salary_range_max: 90000,
    currency: 'THB',
    posting_date: new Date('2025-12-20'),
    closing_date: new Date('2026-01-31'),
    status: 'open',
    headcount: 1,
    filled_count: 0,
    description: 'We are seeking an experienced HR Business Partner.',
    description_th: 'เรากำลังมองหา HR Business Partner ที่มีประสบการณ์',
    requirements: ["Bachelor's degree in HR", "5+ years HRBP experience", "Thai labor law knowledge"],
    benefits: ["Competitive salary", "Health insurance", "Career development"],
    hiring_manager_id: 'EMP_HR001',
    hr_recruiter_id: 'EMP_HR001',
    is_internal: true,
    is_external: true,
  },
  {
    position_id: 'POS-003',
    position_title: 'Product Manager',
    position_title_th: 'ผู้จัดการผลิตภัณฑ์',
    department: 'Product Management',
    department_th: 'ฝ่ายจัดการผลิตภัณฑ์',
    company: 'RIS (C015)',
    location: 'Bangkok',
    location_th: 'กรุงเทพมหานคร',
    job_family: 'Technology',
    employment_type: 'full_time',
    salary_range_min: 70000,
    salary_range_max: 110000,
    currency: 'THB',
    posting_date: new Date('2026-01-05'),
    closing_date: new Date('2026-03-05'),
    status: 'open',
    headcount: 2,
    filled_count: 0,
    description: 'Seeking a Product Manager to lead product development initiatives.',
    description_th: 'กำลังมองหา Product Manager เพื่อนำโครงการพัฒนาผลิตภัณฑ์',
    requirements: ["3+ years product management experience", "Agile/Scrum knowledge", "Retail/e-commerce experience preferred"],
    benefits: ["Competitive salary", "Annual bonus", "Learning budget"],
    hiring_manager_id: 'EMP_SUP001',
    hr_recruiter_id: 'EMP_HR001',
    is_internal: true,
    is_external: true,
  },
];

// Candidates
const candidates = [
  { job_posting_index: 0, first_name: 'Thanakrit', last_name: 'Wongsawat', email: 'thanakrit.w@gmail.com', phone: '+66 89 555 1234', source: 'linkedin', status: 'screening', current_stage: 'screening', applied_date: new Date('2025-12-20') },
  { job_posting_index: 0, first_name: 'Natchanon', last_name: 'Sripong', email: 'natchanon.s@gmail.com', phone: '+66 81 666 2345', source: 'jobsdb', status: 'interview', current_stage: 'technical_interview', applied_date: new Date('2025-12-22') },
  { job_posting_index: 0, first_name: 'Warisa', last_name: 'Prasertpol', email: 'warisa.p@outlook.com', phone: '+66 92 777 3456', source: 'referral', status: 'offer', current_stage: 'offer', applied_date: new Date('2025-12-18') },
  { job_posting_index: 1, first_name: 'Siriwan', last_name: 'Meesuk', email: 'siriwan.m@gmail.com', phone: '+66 85 888 4567', source: 'company_website', status: 'screening', current_stage: 'screening', applied_date: new Date('2025-12-25') },
];

// Onboarding templates
const onboardingTemplates = [
  {
    name_en: 'Standard Onboarding',
    name_th: 'ปฐมนิเทศมาตรฐาน',
    department: null,
    is_default: true,
    tasks: [
      { category: 'documents', title_en: 'Submit ID card copy', title_th: 'ยื่นสำเนาบัตรประชาชน', required: true, sort_order: 1 },
      { category: 'documents', title_en: 'Submit bank account details', title_th: 'ยื่นรายละเอียดบัญชีธนาคาร', required: true, sort_order: 2 },
      { category: 'it_setup', title_en: 'Setup corporate email', title_th: 'ตั้งค่าอีเมลองค์กร', required: true, sort_order: 3 },
      { category: 'it_setup', title_en: 'Issue laptop and equipment', title_th: 'จ่ายแล็ปท็อปและอุปกรณ์', required: true, sort_order: 4 },
      { category: 'training', title_en: 'Complete orientation program', title_th: 'เข้าร่วมปฐมนิเทศ', required: true, sort_order: 5 },
      { category: 'training', title_en: 'Complete compliance training', title_th: 'อบรมการปฏิบัติตามกฎระเบียบ', required: true, sort_order: 6 },
      { category: 'introduction', title_en: 'Meet team members', title_th: 'แนะนำตัวกับทีม', required: false, sort_order: 7 },
      { category: 'introduction', title_en: 'Office tour', title_th: 'นำชมสำนักงาน', required: false, sort_order: 8 },
    ],
  },
];

// Resignations (synthetic data for Thai business context)
const resignations = [
  {
    employee_id: 'EMP_RESIGNED_001',
    employee_name: 'Narongrit Prasert',
    department: 'Engineering',
    reason: 'better_opportunity',
    reason_detail: 'Received offer from a larger tech company with better career prospects',
    last_working_date: new Date('2024-08-31'),
    submission_date: new Date('2024-07-31'),
    status: 'completed',
    manager_approval: 'approved',
    manager_approved_at: new Date('2024-08-02'),
    manager_id: 'EMP_ENG001',
    hr_approval: 'approved',
    hr_approved_at: new Date('2024-08-05'),
    hr_id: 'EMP_HR001',
    clearance_status: 'completed',
    settlement_status: 'paid',
    exit_interview_done: true,
    exit_interview_notes: 'Employee left for better compensation. Recommended salary review for engineering team.',
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedRecruitment() {
  // Seed job postings
  console.log('Seeding job postings...');
  const jpIds: string[] = [];
  await prisma.jobPosting.deleteMany({});
  for (const jp of jobPostings) {
    const record = await prisma.jobPosting.create({ data: jp });
    jpIds.push(record.id);
  }
  console.log(`  Seeded ${jobPostings.length} job postings`);

  // Seed candidates
  console.log('Seeding candidates...');
  for (const cand of candidates) {
    const { job_posting_index, ...data } = cand;
    await prisma.candidate.create({
      data: { job_posting_id: jpIds[job_posting_index], ...data },
    });
  }
  console.log(`  Seeded ${candidates.length} candidates`);

  // Seed onboarding templates and tasks
  console.log('Seeding onboarding templates...');
  await prisma.onboardingTask.deleteMany({});
  await prisma.onboardingTemplate.deleteMany({});
  for (const tpl of onboardingTemplates) {
    const { tasks, ...templateData } = tpl;
    const template = await prisma.onboardingTemplate.create({ data: templateData });
    for (const task of tasks) {
      await prisma.onboardingTask.create({
        data: { template_id: template.id, ...task },
      });
    }
  }
  console.log(`  Seeded ${onboardingTemplates.length} onboarding templates`);

  // Seed resignations
  console.log('Seeding resignations...');
  await prisma.resignation.deleteMany({});
  for (const res of resignations) {
    await prisma.resignation.create({ data: res });
  }
  console.log(`  Seeded ${resignations.length} resignations`);
}

if (require.main === module) {
  seedRecruitment()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

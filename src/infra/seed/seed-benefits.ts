/**
 * Seed Benefits Data
 * Creates benefit plans, enrollments, and sample claims for benefits-management schema
 */
import { PrismaClient } from '../../services/benefits-management/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Benefit Plans - Thai corporate benefits standards
// ---------------------------------------------------------------------------

const benefitPlans = [
  {
    code: 'BEN-HEALTH-001',
    name_en: 'Group Health Insurance - IPD',
    name_th: 'ประกันสุขภาพกลุ่ม - ผู้ป่วยใน',
    category: 'health',
    coverage_amount: 500000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Inpatient coverage up to 500,000 THB per year. Room rate 4,000 THB/night.',
    is_active: true,
  },
  {
    code: 'BEN-HEALTH-002',
    name_en: 'Group Health Insurance - OPD',
    name_th: 'ประกันสุขภาพกลุ่ม - ผู้ป่วยนอก',
    category: 'health',
    coverage_amount: 30000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Outpatient coverage up to 2,000 THB per visit, max 30 visits per year.',
    is_active: true,
  },
  {
    code: 'BEN-DENTAL-001',
    name_en: 'Dental Insurance',
    name_th: 'ประกันทันตกรรม',
    category: 'dental',
    coverage_amount: 10000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Dental coverage up to 10,000 THB per year.',
    is_active: true,
  },
  {
    code: 'BEN-VISION-001',
    name_en: 'Vision Care',
    name_th: 'สวัสดิการแว่นตา',
    category: 'vision',
    coverage_amount: 5000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Eyeglasses/contact lenses coverage up to 5,000 THB per year.',
    is_active: true,
  },
  {
    code: 'BEN-LIFE-001',
    name_en: 'Group Life Insurance',
    name_th: 'ประกันชีวิตกลุ่ม',
    category: 'life',
    coverage_amount: 2000000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Life insurance coverage 24x monthly salary, max 2,000,000 THB.',
    is_active: true,
  },
  {
    code: 'BEN-PVD-001',
    name_en: 'Provident Fund',
    name_th: 'กองทุนสำรองเลี้ยงชีพ',
    category: 'retirement',
    coverage_amount: 0,
    employer_contribution: 5,
    employee_contribution: 5,
    effective_date: new Date('2026-01-01'),
    description: 'Employee 3-15%, Employer 5%. Vesting: 1yr=0%, 2yr=20%, 3yr=40%, 4yr=60%, 5yr=100%.',
    is_active: true,
  },
  {
    code: 'BEN-WELFARE-001',
    name_en: 'Wellness & Fitness Benefit',
    name_th: 'สวัสดิการสุขภาพและฟิตเนส',
    category: 'welfare',
    coverage_amount: 6000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Annual fitness/wellness reimbursement up to 6,000 THB.',
    is_active: true,
  },
  {
    code: 'BEN-WELFARE-002',
    name_en: 'Annual Health Checkup',
    name_th: 'ตรวจสุขภาพประจำปี',
    category: 'welfare',
    coverage_amount: 5000,
    employer_contribution: 100,
    employee_contribution: 0,
    effective_date: new Date('2026-01-01'),
    description: 'Annual health checkup at partner hospitals, up to 5,000 THB.',
    is_active: true,
  },
];

const benefitEnrollments = [
  { employee_id: 'EMP001', plan_code: 'BEN-HEALTH-001', coverage_level: 'employee_plus_family', status: 'active', effective_date: new Date('2020-04-01') },
  { employee_id: 'EMP001', plan_code: 'BEN-HEALTH-002', coverage_level: 'employee_plus_family', status: 'active', effective_date: new Date('2020-04-01') },
  { employee_id: 'EMP001', plan_code: 'BEN-DENTAL-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2020-04-01') },
  { employee_id: 'EMP001', plan_code: 'BEN-LIFE-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2020-04-01') },
  { employee_id: 'EMP001', plan_code: 'BEN-PVD-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2020-04-01') },
  { employee_id: 'EMP001', plan_code: 'BEN-WELFARE-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2026-01-01') },
  { employee_id: 'EMP_DR001', plan_code: 'BEN-HEALTH-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2025-07-01') },
  { employee_id: 'EMP_DR001', plan_code: 'BEN-HEALTH-002', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2025-07-01') },
  { employee_id: 'EMP_DR002', plan_code: 'BEN-HEALTH-001', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2025-07-01') },
  { employee_id: 'EMP_DR002', plan_code: 'BEN-HEALTH-002', coverage_level: 'employee_only', status: 'active', effective_date: new Date('2025-07-01') },
];

const benefitClaims = [
  { employee_id: 'EMP001', plan_code: 'BEN-HEALTH-002', claim_type: 'opd', amount: 1800, receipt_date: new Date('2026-01-15'), status: 'approved', reviewed_by: 'SYSTEM', paid_amount: 1800 },
  { employee_id: 'EMP001', plan_code: 'BEN-DENTAL-001', claim_type: 'dental', amount: 3500, receipt_date: new Date('2026-01-20'), status: 'approved', reviewed_by: 'EMP_HR001', paid_amount: 3500 },
  { employee_id: 'EMP001', plan_code: 'BEN-WELFARE-001', claim_type: 'wellness', amount: 2400, receipt_date: new Date('2026-02-01'), status: 'pending', reviewed_by: null, paid_amount: null },
  { employee_id: 'EMP_DR001', plan_code: 'BEN-HEALTH-002', claim_type: 'opd', amount: 1200, receipt_date: new Date('2026-02-10'), status: 'pending', reviewed_by: null, paid_amount: null },
];

const benefitDependents = [
  { employee_id: 'EMP001', plan_code: 'BEN-HEALTH-001', name: 'Yuki Tanaka', relationship: 'spouse', date_of_birth: new Date('1990-03-15'), national_id: '9876543210123' },
  { employee_id: 'EMP001', plan_code: 'BEN-HEALTH-001', name: 'Sakura Tanaka', relationship: 'child', date_of_birth: new Date('2020-06-20'), national_id: '1122334455667' },
];

const claimPolicyRules = [
  { name: 'Medical OPD limit per visit', rule_type: 'hard_limit', category: 'medical', condition_field: 'amount', condition_value: '2000', is_active: true },
  { name: 'Dental annual limit', rule_type: 'hard_limit', category: 'dental', condition_field: 'annual_total', condition_value: '10000', is_active: true },
  { name: 'Wellness annual limit', rule_type: 'hard_limit', category: 'wellness', condition_field: 'annual_total', condition_value: '6000', is_active: true },
  { name: 'Auto-approve medical under 500 THB', rule_type: 'soft_warning', category: 'medical', condition_field: 'amount', condition_value: '500', is_active: true },
  { name: 'Receipt required for all claims', rule_type: 'required_document', category: 'all', condition_field: 'receipt', condition_value: 'required', is_active: true },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedBenefits() {
  console.log('Seeding benefit plans...');

  const planIdMap: Record<string, string> = {};
  for (const plan of benefitPlans) {
    const record = await prisma.benefitPlan.upsert({
      where: { code: plan.code },
      create: plan,
      update: plan,
    });
    planIdMap[plan.code] = record.id;
  }
  console.log(`  Seeded ${benefitPlans.length} benefit plans`);

  // Seed enrollments
  console.log('Seeding benefit enrollments...');
  let enrollCount = 0;
  for (const enr of benefitEnrollments) {
    const planId = planIdMap[enr.plan_code];
    if (!planId) continue;
    const existing = await prisma.benefitEnrollment.findUnique({
      where: { employee_id_plan_id: { employee_id: enr.employee_id, plan_id: planId } },
    });
    if (!existing) {
      const enrollment = await prisma.benefitEnrollment.create({
        data: { employee_id: enr.employee_id, plan_id: planId, coverage_level: enr.coverage_level, status: enr.status, effective_date: enr.effective_date },
      });
      // Seed dependents for this enrollment
      const deps = benefitDependents.filter((d) => d.employee_id === enr.employee_id && d.plan_code === enr.plan_code);
      for (const dep of deps) {
        await prisma.benefitDependent.create({
          data: { enrollment_id: enrollment.id, name: dep.name, relationship: dep.relationship, date_of_birth: dep.date_of_birth, national_id: dep.national_id },
        });
      }
      enrollCount++;
    }
  }
  console.log(`  Seeded ${enrollCount} benefit enrollments`);

  // Seed claims
  console.log('Seeding benefit claims...');
  let claimCount = 0;
  for (const claim of benefitClaims) {
    const planId = planIdMap[claim.plan_code];
    if (!planId) continue;
    const existing = await prisma.benefitClaim.findFirst({
      where: { employee_id: claim.employee_id, plan_id: planId, receipt_date: claim.receipt_date },
    });
    if (!existing) {
      await prisma.benefitClaim.create({
        data: { employee_id: claim.employee_id, plan_id: planId, claim_type: claim.claim_type, amount: claim.amount, receipt_date: claim.receipt_date, status: claim.status, reviewed_by: claim.reviewed_by, paid_amount: claim.paid_amount },
      });
      claimCount++;
    }
  }
  console.log(`  Seeded ${claimCount} benefit claims`);

  // Seed policy rules
  console.log('Seeding claim policy rules...');
  for (const rule of claimPolicyRules) {
    const existing = await prisma.policyRule.findFirst({ where: { name: rule.name } });
    if (!existing) {
      await prisma.policyRule.create({ data: rule });
    }
  }
  console.log(`  Seeded ${claimPolicyRules.length} claim policy rules`);
}

if (require.main === module) {
  seedBenefits()
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
}

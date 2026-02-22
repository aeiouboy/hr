/**
 * Seed Settings Data
 * Migrates mock-settings.js data to settings-service Prisma schema
 */
import { PrismaClient } from '../../services/settings-service/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Settings data extracted from apps/js/data/mock-settings.js
// ---------------------------------------------------------------------------

const settings = [
  // General
  { category: 'general', key: 'language', value: 'th', description: 'Default system language', is_system: true, updated_by: 'SYSTEM' },
  { category: 'general', key: 'date_format', value: 'buddhist', description: 'Date format (buddhist / gregorian)', is_system: true, updated_by: 'SYSTEM' },
  { category: 'general', key: 'timezone', value: 'Asia/Bangkok', description: 'System timezone', is_system: true, updated_by: 'SYSTEM' },
  { category: 'general', key: 'currency', value: 'THB', description: 'Default currency', is_system: true, updated_by: 'SYSTEM' },

  // Company
  {
    category: 'company',
    key: 'company_name',
    value: { en: 'Central Group', th: 'เซ็นทรัล กรุ๊ป' },
    description: 'Company name in EN/TH',
    is_system: false,
    updated_by: 'ADMIN',
  },
  {
    category: 'company',
    key: 'company_address',
    value: { address: '999/9 Rama I Road', sub_district: 'Pathumwan', district: 'Pathumwan', province: 'Bangkok', postal_code: '10330', country: 'Thailand' },
    description: 'Company headquarters address',
    is_system: false,
    updated_by: 'ADMIN',
  },
  { category: 'company', key: 'tax_id', value: '0107536000882', description: 'Company tax identification number', is_system: false, updated_by: 'ADMIN' },
  { category: 'company', key: 'social_security_employer_no', value: '1234567890', description: 'Social security employer number', is_system: false, updated_by: 'ADMIN' },

  // Tax brackets
  {
    category: 'tax',
    key: 'tax_brackets',
    value: [
      { min: 0, max: 150000, rate: 0 },
      { min: 150001, max: 300000, rate: 5 },
      { min: 300001, max: 500000, rate: 10 },
      { min: 500001, max: 750000, rate: 15 },
      { min: 750001, max: 1000000, rate: 20 },
      { min: 1000001, max: 2000000, rate: 25 },
      { min: 2000001, max: 5000000, rate: 30 },
      { min: 5000001, max: null, rate: 35 },
    ],
    description: 'Thai progressive income tax brackets',
    is_system: true,
    updated_by: 'SYSTEM',
  },

  // Social Security
  {
    category: 'social_security',
    key: 'config',
    value: { employee_rate: 5, employer_rate: 5, max_wage_base: 15000, max_contribution: 750 },
    description: 'Social security contribution configuration',
    is_system: true,
    updated_by: 'SYSTEM',
  },

  // Provident Fund
  {
    category: 'provident_fund',
    key: 'config',
    value: {
      employee_min_rate: 3, employee_max_rate: 15, employee_default_rate: 5, employer_rate: 5,
      vesting_schedule: [
        { years: 0, percentage: 0 }, { years: 1, percentage: 0 }, { years: 2, percentage: 20 },
        { years: 3, percentage: 40 }, { years: 4, percentage: 60 }, { years: 5, percentage: 100 },
      ],
    },
    description: 'Provident fund contribution and vesting configuration',
    is_system: true,
    updated_by: 'SYSTEM',
  },

  // Leave types
  {
    category: 'leave',
    key: 'leave_types',
    value: [
      { code: 'annual', name_en: 'Annual Leave', name_th: 'วันลาพักร้อน', max_days: 6, carry_over: true },
      { code: 'sick', name_en: 'Sick Leave', name_th: 'วันลาป่วย', max_days: 30, requires_medical_cert_days: 3 },
      { code: 'personal', name_en: 'Personal Leave', name_th: 'วันลากิจ', max_days: 3 },
      { code: 'maternity', name_en: 'Maternity Leave', name_th: 'วันลาคลอด', max_days: 98, applicable_gender: 'female' },
      { code: 'military', name_en: 'Military Service Leave', name_th: 'วันลาเกณฑ์ทหาร', max_days: 60, applicable_gender: 'male' },
      { code: 'ordination', name_en: 'Ordination Leave', name_th: 'วันลาบวช', max_days: 15, applicable_gender: 'male' },
      { code: 'sterilization', name_en: 'Sterilization Leave', name_th: 'วันลาทำหมัน', max_days: 3 },
      { code: 'training', name_en: 'Training Leave', name_th: 'วันลาฝึกอบรม', max_days: 30 },
    ],
    description: 'Leave type definitions per Thai Labor Protection Act',
    is_system: true,
    updated_by: 'SYSTEM',
  },

  // Workflow settings
  {
    category: 'workflow',
    key: 'approval_levels',
    value: {
      max_levels: 3,
      auto_approve_rules: [{ leave_type: 'sick', max_days: 3 }, { leave_type: 'personal', max_days: 1 }],
      delegation_enabled: true,
      delegation_max_days: 30,
    },
    description: 'Workflow approval configuration',
    is_system: false,
    updated_by: 'ADMIN',
  },

  // Payroll
  {
    category: 'payroll',
    key: 'cycle',
    value: { frequency: 'monthly', pay_day: 25, cutoff_day: 20, overtime_calculation: 'actual' },
    description: 'Payroll cycle configuration',
    is_system: false,
    updated_by: 'ADMIN',
  },
  {
    category: 'payroll',
    key: 'banks',
    value: [
      { code: 'BBL', name: 'Bangkok Bank' }, { code: 'KBANK', name: 'Kasikorn Bank' },
      { code: 'KTB', name: 'Krungthai Bank' }, { code: 'SCB', name: 'Siam Commercial Bank' },
      { code: 'BAY', name: 'Bank of Ayudhya' }, { code: 'TMB', name: 'TMBThanachart Bank' },
    ],
    description: 'Supported banks for salary transfer',
    is_system: false,
    updated_by: 'ADMIN',
  },

  // Employee ID format
  {
    category: 'employee',
    key: 'id_format',
    value: { prefix: 'CG', format: 'CG-YYYY-NNNNNN', current_sequence: 45892 },
    description: 'Employee ID generation format',
    is_system: true,
    updated_by: 'SYSTEM',
  },

  // Attendance config
  {
    category: 'attendance',
    key: 'config',
    value: {
      late_threshold_minutes: 15, early_departure_threshold_minutes: 15, overtime_approval_required: true,
      work_hours_per_day: 8, break_minutes: 60, check_in_sources: ['biometric', 'mobile', 'card', 'web'],
    },
    description: 'Attendance tracking configuration',
    is_system: false,
    updated_by: 'ADMIN',
  },

  // Public holidays 2026
  {
    category: 'calendar',
    key: 'public_holidays_2026',
    value: [
      { date: '2026-01-01', name_en: "New Year's Day", name_th: 'วันขึ้นปีใหม่' },
      { date: '2026-02-12', name_en: 'Makha Bucha Day', name_th: 'วันมาฆบูชา' },
      { date: '2026-04-06', name_en: 'Chakri Memorial Day', name_th: 'วันจักรี' },
      { date: '2026-04-13', name_en: 'Songkran Festival', name_th: 'วันสงกรานต์' },
      { date: '2026-04-14', name_en: 'Songkran Festival', name_th: 'วันสงกรานต์' },
      { date: '2026-04-15', name_en: 'Songkran Festival', name_th: 'วันสงกรานต์' },
      { date: '2026-05-01', name_en: 'Labor Day', name_th: 'วันแรงงานแห่งชาติ' },
      { date: '2026-05-04', name_en: 'Coronation Day', name_th: 'วันฉัตรมงคล' },
      { date: '2026-06-01', name_en: 'Visakha Bucha Day', name_th: 'วันวิสาขบูชา' },
      { date: '2026-06-03', name_en: 'Queen Suthida Birthday', name_th: 'วันเฉลิมพระชนมพรรษาสมเด็จพระราชินี' },
      { date: '2026-07-28', name_en: 'King Vajiralongkorn Birthday', name_th: 'วันเฉลิมพระชนมพรรษา ร.10' },
      { date: '2026-07-29', name_en: 'Asalha Bucha Day', name_th: 'วันอาสาฬหบูชา' },
      { date: '2026-08-12', name_en: 'Queen Sirikit Birthday', name_th: 'วันเฉลิมพระชนมพรรษาสมเด็จพระบรมราชชนนีพันปีหลวง' },
      { date: '2026-10-13', name_en: 'King Bhumibol Memorial Day', name_th: 'วันคล้ายวันสวรรคต ร.9' },
      { date: '2026-10-23', name_en: 'Chulalongkorn Day', name_th: 'วันปิยมหาราช' },
      { date: '2026-12-05', name_en: 'King Bhumibol Birthday', name_th: 'วันคล้ายวันพระราชสมภพ ร.9' },
      { date: '2026-12-10', name_en: 'Constitution Day', name_th: 'วันรัฐธรรมนูญ' },
      { date: '2026-12-31', name_en: "New Year's Eve", name_th: 'วันสิ้นปี' },
    ],
    description: 'Thai public holidays for 2026',
    is_system: true,
    updated_by: 'SYSTEM',
  },
];

const policyRules = [
  { name: 'Annual leave max days', category: 'leave', rule_type: 'hard', condition_field: 'annual_leave_days', condition_operator: 'lte', condition_value: '6', is_active: true, created_by: 'SYSTEM' },
  { name: 'Sick leave medical cert required', category: 'leave', rule_type: 'hard', condition_field: 'sick_leave_consecutive_days', condition_operator: 'gte', condition_value: '3', is_active: true, created_by: 'SYSTEM' },
  { name: 'OT weekly max hours', category: 'overtime', rule_type: 'hard', condition_field: 'weekly_ot_hours', condition_operator: 'lte', condition_value: '36', is_active: true, created_by: 'SYSTEM' },
  { name: 'Medical claim per visit limit', category: 'claims', rule_type: 'hard', condition_field: 'medical_claim_amount', condition_operator: 'lte', condition_value: '2000', is_active: true, created_by: 'SYSTEM' },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedSettings() {
  console.log('Seeding settings...');

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      create: setting,
      update: setting,
    });
  }
  console.log(`  Seeded ${settings.length} settings`);

  console.log('Seeding policy rule configs...');
  for (const rule of policyRules) {
    const existing = await prisma.policyRuleConfig.findFirst({ where: { name: rule.name } });
    if (!existing) {
      await prisma.policyRuleConfig.create({ data: rule });
    }
  }
  console.log(`  Seeded ${policyRules.length} policy rules`);
}

if (require.main === module) {
  seedSettings()
    .then(() => prisma.$disconnect())
    .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
}

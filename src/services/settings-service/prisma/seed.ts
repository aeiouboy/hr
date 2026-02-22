import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const defaultSettings = [
  { category: 'company', key: 'company.name', value: { en: 'Central Group Co., Ltd.', th: 'บริษัท เซ็นทรัล กรุ๊ป จำกัด' }, description: 'Company name', is_system: true },
  { category: 'company', key: 'company.tax_id', value: '0105556123456', description: 'Company tax ID', is_system: true },
  { category: 'company', key: 'company.address', value: { line1: '306 Silom Road', district: 'Bangrak', province: 'Bangkok', postalCode: '10500', country: 'Thailand' }, description: 'Company address', is_system: true },
  { category: 'leave_policy', key: 'leave_policy.types', value: [
    { id: 'annual', code: 'AL', name: 'Annual Leave', daysPerYear: 6, carryForwardLimit: 6, accrualType: 'yearly', active: true },
    { id: 'sick', code: 'SL', name: 'Sick Leave', daysPerYear: 30, carryForwardLimit: 0, accrualType: 'front_loaded', active: true },
    { id: 'personal', code: 'PL', name: 'Personal Leave', daysPerYear: 3, carryForwardLimit: 0, accrualType: 'front_loaded', active: true },
  ], description: 'Leave type configurations', is_system: true },
  { category: 'payroll', key: 'payroll.pay_period', value: 'monthly', description: 'Pay period', is_system: true },
  { category: 'payroll', key: 'payroll.sso_rate', value: { employeeRate: 5, employerRate: 5, maxContributionBase: 15000 }, description: 'Social security rates', is_system: true },
  { category: 'payroll', key: 'payroll.pf_default_rate', value: { employeeDefault: 5, employerRate: 5 }, description: 'Provident fund default rates', is_system: true },
  { category: 'notification', key: 'notification.email', value: { enabled: true, digestFrequency: 'immediate' }, description: 'Email notification settings', is_system: false },
  { category: 'notification', key: 'notification.in_app', value: { enabled: true, showBadge: true, playSound: false }, description: 'In-app notification settings', is_system: false },
];

async function main() {
  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('Settings seeded successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

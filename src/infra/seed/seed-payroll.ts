/**
 * Seed Payroll Data
 * Migrates mock-employee.js compensation/payslip data to payroll-management schema
 * Generates synthetic payroll runs from the detailed payslips in mock data
 */
import { PrismaClient } from '../../services/payroll-management/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Compensation data from MockEmployeeData.employee.compensation
// ---------------------------------------------------------------------------

const compensations = [
  {
    employee_id: 'EMP001',
    base_salary: 'enc_95000', // encrypted placeholder
    position_allowance: 15000,
    housing_allowance: 0,
    transportation_allowance: 0,
    meal_allowance: 0,
    other_allowances: { colAllowance: 5000 },
    effective_date: new Date('2024-01-01'),
    currency: 'THB',
    grade: 'M2',
    level: 'Manager',
    provident_fund_rate: 5,
  },
  {
    employee_id: 'EMP_SUP001',
    base_salary: 'enc_150000',
    position_allowance: 25000,
    housing_allowance: 10000,
    transportation_allowance: 5000,
    meal_allowance: 0,
    other_allowances: null,
    effective_date: new Date('2024-01-01'),
    currency: 'THB',
    grade: 'M1',
    level: 'Senior Manager',
    provident_fund_rate: 7,
  },
  {
    employee_id: 'EMP_DR001',
    base_salary: 'enc_25000',
    position_allowance: 0,
    housing_allowance: 0,
    transportation_allowance: 2000,
    meal_allowance: 1500,
    other_allowances: null,
    effective_date: new Date('2025-07-01'),
    currency: 'THB',
    grade: 'P3',
    level: 'Associate',
    provident_fund_rate: 3,
  },
  {
    employee_id: 'EMP_DR002',
    base_salary: 'enc_25000',
    position_allowance: 0,
    housing_allowance: 0,
    transportation_allowance: 2000,
    meal_allowance: 1500,
    other_allowances: null,
    effective_date: new Date('2025-07-01'),
    currency: 'THB',
    grade: 'P3',
    level: 'Associate',
    provident_fund_rate: 3,
  },
];

// ---------------------------------------------------------------------------
// Payroll runs and payslips from MockEmployeeData.employee.detailedPayslips
// ---------------------------------------------------------------------------

const payrollRuns = [
  { period: '2025-12', year: 2025, month: 12, status: 'completed', type: 'regular', total_gross: 480000, total_deductions: 100000, total_net: 380000, total_employer_cost: 520000, employee_count: 4, created_by: 'SYSTEM' },
  { period: '2025-11', year: 2025, month: 11, status: 'completed', type: 'regular', total_gross: 475000, total_deductions: 98000, total_net: 377000, total_employer_cost: 515000, employee_count: 4, created_by: 'SYSTEM' },
  { period: '2025-10', year: 2025, month: 10, status: 'completed', type: 'regular', total_gross: 480000, total_deductions: 100000, total_net: 380000, total_employer_cost: 520000, employee_count: 4, created_by: 'SYSTEM' },
];

// Payslips for EMP001 (from mock-employee.js detailedPayslips)
const payslipsEMP001 = [
  {
    period: '2025-12',
    employee_id: 'EMP001',
    base_salary: 95000,
    gross_salary: 'enc_120000',
    total_earnings: 120000,
    total_deductions: 25000,
    net_salary: 'enc_95000',
    tax_amount: 12500,
    sso_amount: 750,
    provident_fund_employee: 6000,
    provident_fund_employer: 6000,
    earnings_detail: { baseSalary: 95000, positionAllowance: 15000, colAllowance: 5000, overtime: 5000 },
    deductions_detail: { tax: 12500, socialSecurity: 750, providentFund: 6000, loans: 5000, other: 750 },
    bank_code: 'BBL',
    bank_account: 'enc_1234567890',
    payment_status: 'paid',
  },
  {
    period: '2025-11',
    employee_id: 'EMP001',
    base_salary: 95000,
    gross_salary: 'enc_118500',
    total_earnings: 118500,
    total_deductions: 24500,
    net_salary: 'enc_94000',
    tax_amount: 12300,
    sso_amount: 750,
    provident_fund_employee: 6000,
    provident_fund_employer: 6000,
    earnings_detail: { baseSalary: 95000, positionAllowance: 15000, colAllowance: 5000, overtime: 3500 },
    deductions_detail: { tax: 12300, socialSecurity: 750, providentFund: 6000, loans: 5000, other: 450 },
    bank_code: 'BBL',
    bank_account: 'enc_1234567890',
    payment_status: 'paid',
  },
  {
    period: '2025-10',
    employee_id: 'EMP001',
    base_salary: 95000,
    gross_salary: 'enc_120000',
    total_earnings: 120000,
    total_deductions: 25000,
    net_salary: 'enc_95000',
    tax_amount: 12500,
    sso_amount: 750,
    provident_fund_employee: 6000,
    provident_fund_employer: 6000,
    earnings_detail: { baseSalary: 95000, positionAllowance: 15000, colAllowance: 5000, overtime: 2000, other: 3000 },
    deductions_detail: { tax: 12500, socialSecurity: 750, providentFund: 6000, loans: 5000, other: 750 },
    bank_code: 'BBL',
    bank_account: 'enc_1234567890',
    payment_status: 'paid',
  },
];

// Tax deductions for EMP001
const taxDeductions = [
  {
    employee_id: 'EMP001',
    tax_year: 2025,
    annual_income: 1440000,
    personal_allowance: 60000,
    expense_deduction: 100000,
    spouse_allowance: 60000,
    child_allowance: 30000,
    parent_allowance: 0,
    life_insurance: 100000,
    health_insurance: 25000,
    provident_fund_deduction: 72000,
    social_security_deduction: 9000,
    home_loan_interest: 100000,
    donation: 0,
    other_deductions: 0,
    total_deductions: 556000,
    taxable_income: 884000,
    calculated_tax: 150000,
  },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedPayroll() {
  // Seed compensations
  console.log('Seeding compensations...');
  for (const comp of compensations) {
    await prisma.compensation.upsert({
      where: { employee_id: comp.employee_id },
      create: comp,
      update: comp,
    });
  }
  console.log(`  Seeded ${compensations.length} compensations`);

  // Seed payroll runs
  console.log('Seeding payroll runs...');
  const runIdMap: Record<string, string> = {};
  for (const run of payrollRuns) {
    const record = await prisma.payrollRun.upsert({
      where: { period_type: { period: run.period, type: run.type } },
      create: run,
      update: run,
    });
    runIdMap[run.period] = record.id;
  }
  console.log(`  Seeded ${payrollRuns.length} payroll runs`);

  // Seed payslips
  console.log('Seeding payslips...');
  for (const ps of payslipsEMP001) {
    const runId = runIdMap[ps.period];
    if (!runId) continue;
    const { period, ...data } = ps;
    await prisma.payslip.upsert({
      where: { payroll_run_id_employee_id: { payroll_run_id: runId, employee_id: data.employee_id } },
      create: { payroll_run_id: runId, ...data },
      update: { ...data },
    });
  }
  console.log(`  Seeded ${payslipsEMP001.length} payslips`);

  // Seed tax deductions
  console.log('Seeding tax deductions...');
  for (const td of taxDeductions) {
    await prisma.taxDeduction.upsert({
      where: { employee_id_tax_year: { employee_id: td.employee_id, tax_year: td.tax_year } },
      create: td,
      update: td,
    });
  }
  console.log(`  Seeded ${taxDeductions.length} tax deductions`);
}

if (require.main === module) {
  seedPayroll()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

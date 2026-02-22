import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Seed compensation records with encrypted base salaries
  // In production, these would be encrypted via EncryptionService
  const compensations = [
    {
      employee_id: 'EMP001',
      base_salary: '85000', // Would be encrypted in production
      position_allowance: 15000,
      housing_allowance: 5000,
      transportation_allowance: 3000,
      meal_allowance: 2000,
      effective_date: new Date('2025-01-01'),
      grade: 'M3',
      level: 'L3',
      provident_fund_rate: 5.0,
    },
    {
      employee_id: 'EMP002',
      base_salary: '45000',
      position_allowance: 5000,
      housing_allowance: 3000,
      transportation_allowance: 2000,
      meal_allowance: 1500,
      effective_date: new Date('2025-01-01'),
      grade: 'S2',
      level: 'L2',
      provident_fund_rate: 3.0,
    },
    {
      employee_id: 'EMP003',
      base_salary: '120000',
      position_allowance: 25000,
      housing_allowance: 10000,
      transportation_allowance: 5000,
      meal_allowance: 3000,
      effective_date: new Date('2025-01-01'),
      grade: 'D1',
      level: 'L5',
      provident_fund_rate: 10.0,
    },
  ];

  for (const comp of compensations) {
    await prisma.compensation.upsert({
      where: { employee_id: comp.employee_id },
      create: comp,
      update: comp,
    });
  }

  // Seed a sample completed payroll run
  const run = await prisma.payrollRun.create({
    data: {
      period: '2026-01',
      year: 2026,
      month: 1,
      status: 'completed',
      type: 'regular',
      total_gross: 340000,
      total_deductions: 52000,
      total_net: 288000,
      total_employer_cost: 360000,
      employee_count: 3,
      created_by: 'HR001',
      approved_by: 'HRM001',
    },
  });

  console.log(`Seed completed: payroll run ${run.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

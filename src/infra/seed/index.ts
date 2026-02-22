/**
 * Master Seed Runner
 * Executes all seed scripts in correct order (respecting FK dependencies)
 *
 * Usage:
 *   npx ts-node index.ts          # Run all seeds
 *   npx ts-node index.ts --only employee,organization  # Run specific seeds
 *   npx ts-node index.ts --validate  # Run seeds then validate
 */

import { seedEmployees } from './seed-employee';
import { seedOrganization } from './seed-organization';
import { seedLeave } from './seed-leave';
import { seedPayroll } from './seed-payroll';
import { seedAttendance } from './seed-attendance';
import { seedOvertime } from './seed-overtime';
import { seedTraining } from './seed-training';
import { seedRecruitment } from './seed-recruitment';
import { seedPerformance } from './seed-performance';
import { seedLocations } from './seed-locations';
import { seedWorkflows } from './seed-workflows';
import { seedBenefits } from './seed-benefits';
import { seedSettings } from './seed-settings';

// Seed execution order respects FK dependencies:
// 1. Settings (no deps - standalone config)
// 2. Employees (base entity for most FK refs)
// 3. Organization (references employees for incumbents)
// 4. Leave (references employees)
// 5. Payroll (references employees)
// 6. Attendance (references employees, shifts)
// 7. Overtime (references employees)
// 8. Training (references employees)
// 9. Recruitment (standalone - job postings, candidates)
// 10. Performance (references employees)
// 11. Locations (references employees for assignments)
// 12. Workflows (references employees for approvers)
// 13. Benefits (references employees for enrollments)

interface SeedStep {
  name: string;
  fn: () => Promise<void | Record<string, string>>;
}

const seedSteps: SeedStep[] = [
  { name: 'settings', fn: seedSettings },
  { name: 'employee', fn: seedEmployees },
  { name: 'organization', fn: seedOrganization },
  { name: 'leave', fn: seedLeave },
  { name: 'payroll', fn: seedPayroll },
  { name: 'attendance', fn: seedAttendance },
  { name: 'overtime', fn: seedOvertime },
  { name: 'training', fn: seedTraining },
  { name: 'recruitment', fn: seedRecruitment },
  { name: 'performance', fn: seedPerformance },
  { name: 'locations', fn: seedLocations },
  { name: 'workflows', fn: seedWorkflows },
  { name: 'benefits', fn: seedBenefits },
];

async function runAllSeeds() {
  const startTime = Date.now();
  const args = process.argv.slice(2);
  const onlyArg = args.find((a) => a.startsWith('--only='));
  const onlySeeds = onlyArg ? onlyArg.split('=')[1].split(',') : null;
  const shouldValidate = args.includes('--validate');

  console.log('========================================');
  console.log('  HRMS Database Seed Runner');
  console.log('========================================');
  console.log(`  Started at: ${new Date().toISOString()}`);
  if (onlySeeds) {
    console.log(`  Running only: ${onlySeeds.join(', ')}`);
  }
  console.log('');

  const results: { name: string; status: 'success' | 'error'; duration: number; error?: string }[] = [];

  for (const step of seedSteps) {
    if (onlySeeds && !onlySeeds.includes(step.name)) {
      continue;
    }

    const stepStart = Date.now();
    console.log(`\n--- Seeding: ${step.name} ---`);

    try {
      await step.fn();
      const duration = Date.now() - stepStart;
      results.push({ name: step.name, status: 'success', duration });
      console.log(`  ✓ ${step.name} completed in ${duration}ms`);
    } catch (error: unknown) {
      const duration = Date.now() - stepStart;
      const errMsg = error instanceof Error ? error.message : String(error);
      results.push({ name: step.name, status: 'error', duration, error: errMsg });
      console.error(`  ✗ ${step.name} failed: ${errMsg}`);
    }
  }

  // Summary
  const totalDuration = Date.now() - startTime;
  const succeeded = results.filter((r) => r.status === 'success').length;
  const failed = results.filter((r) => r.status === 'error').length;

  console.log('\n========================================');
  console.log('  Seed Summary');
  console.log('========================================');
  console.log(`  Total: ${results.length} seed scripts`);
  console.log(`  Success: ${succeeded}`);
  console.log(`  Failed: ${failed}`);
  console.log(`  Duration: ${totalDuration}ms`);
  console.log('========================================');

  if (failed > 0) {
    console.log('\n  Failed seeds:');
    results
      .filter((r) => r.status === 'error')
      .forEach((r) => console.log(`    - ${r.name}: ${r.error}`));
  }

  if (shouldValidate) {
    console.log('\nRunning validation...');
    const { validateSeedData } = await import('./validate-seed');
    await validateSeedData();
  }

  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runAllSeeds().catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
  });
}

export { runAllSeeds };

/**
 * Master Seed Orchestrator
 * Calls all individual seed scripts in dependency order.
 *
 * Usage:
 *   ts-node seed-all.ts                    # seed all services
 *   ts-node seed-all.ts --service employee # seed a single service
 *   ts-node seed-all.ts --validate         # run validation after seeding
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
import { seedSettings } from './seed-settings';
import { seedWorkflows } from './seed-workflows';
import { seedBenefits } from './seed-benefits';

// ---------------------------------------------------------------------------
// Seed registry - ordered by dependency
// ---------------------------------------------------------------------------

interface SeedEntry {
  name: string;
  fn: () => Promise<any>;
}

const seedRegistry: SeedEntry[] = [
  // Foundation: settings must come first (used by other services)
  { name: 'settings', fn: seedSettings },
  // Core: employees and organization (referenced by everything else)
  { name: 'employee', fn: seedEmployees },
  { name: 'organization', fn: seedOrganization },
  // Locations (used by attendance and employee)
  { name: 'locations', fn: seedLocations },
  // Leave management (depends on employees)
  { name: 'leave', fn: seedLeave },
  // Time & attendance (depends on employees, locations)
  { name: 'attendance', fn: seedAttendance },
  { name: 'overtime', fn: seedOvertime },
  // Payroll (depends on employees, settings)
  { name: 'payroll', fn: seedPayroll },
  // Learning & development (depends on employees)
  { name: 'training', fn: seedTraining },
  // Recruitment (depends on organization)
  { name: 'recruitment', fn: seedRecruitment },
  // Performance & talent (depends on employees, organization)
  { name: 'performance', fn: seedPerformance },
  // Benefits (depends on employees)
  { name: 'benefits', fn: seedBenefits },
  // Workflows (depends on employees)
  { name: 'workflows', fn: seedWorkflows },
];

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(): { service?: string; validate: boolean } {
  const args = process.argv.slice(2);
  let service: string | undefined;
  let validate = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--service' && args[i + 1]) {
      service = args[i + 1];
      i++;
    }
    if (args[i] === '--validate') {
      validate = true;
    }
  }
  return { service, validate };
}

// ---------------------------------------------------------------------------
// Main execution
// ---------------------------------------------------------------------------

async function main() {
  const { service, validate } = parseArgs();
  const startTime = Date.now();

  console.log('='.repeat(60));
  console.log('  HRMS Database Seed');
  console.log('  Central Group - NextGen HRMS');
  console.log('='.repeat(60));
  console.log('');

  if (service) {
    // Seed a single service
    const entry = seedRegistry.find((s) => s.name === service);
    if (!entry) {
      console.error(`Unknown service: ${service}`);
      console.error(`Available services: ${seedRegistry.map((s) => s.name).join(', ')}`);
      process.exit(1);
    }
    console.log(`Seeding single service: ${entry.name}`);
    console.log('-'.repeat(40));
    const t0 = Date.now();
    try {
      await entry.fn();
      console.log(`  Done in ${Date.now() - t0}ms`);
    } catch (err) {
      console.error(`  FAILED: ${err}`);
      process.exit(1);
    }
  } else {
    // Seed all services in order
    console.log(`Seeding all ${seedRegistry.length} services...`);
    console.log('');

    const results: { name: string; duration: number; status: string }[] = [];

    for (const entry of seedRegistry) {
      console.log(`[${'>>'.padEnd(4)}] ${entry.name}`);
      console.log('-'.repeat(40));
      const t0 = Date.now();
      try {
        await entry.fn();
        const duration = Date.now() - t0;
        results.push({ name: entry.name, duration, status: 'OK' });
        console.log(`  Done in ${duration}ms`);
      } catch (err) {
        const duration = Date.now() - t0;
        results.push({ name: entry.name, duration, status: 'FAILED' });
        console.error(`  FAILED in ${duration}ms: ${err}`);
        // Continue with next service instead of aborting
      }
      console.log('');
    }

    // Print summary table
    console.log('='.repeat(60));
    console.log('  Seed Summary');
    console.log('='.repeat(60));
    console.log('');
    console.log(`${'Service'.padEnd(20)} ${'Duration'.padEnd(12)} Status`);
    console.log('-'.repeat(50));
    for (const r of results) {
      console.log(`${r.name.padEnd(20)} ${(r.duration + 'ms').padEnd(12)} ${r.status}`);
    }
    console.log('-'.repeat(50));
    const totalDuration = Date.now() - startTime;
    const failedCount = results.filter((r) => r.status === 'FAILED').length;
    console.log(`Total: ${totalDuration}ms | ${results.length - failedCount}/${results.length} succeeded`);
    console.log('');

    if (failedCount > 0) {
      console.warn(`WARNING: ${failedCount} service(s) failed. Check logs above.`);
    }
  }

  // Run validation if requested
  if (validate) {
    console.log('');
    console.log('Running validation...');
    try {
      const { runValidation } = require('./validate');
      await runValidation();
    } catch (err) {
      console.error('Validation failed:', err);
    }
  }

  const totalDuration = Date.now() - startTime;
  console.log(`\nCompleted in ${totalDuration}ms`);
}

main().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});

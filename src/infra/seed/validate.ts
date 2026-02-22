/**
 * Data Validation Script
 * Checks record counts, referential integrity, and reports issues.
 *
 * Usage:
 *   ts-node validate.ts
 */

// Import all Prisma clients
import { PrismaClient as EmployeeClient } from '../../services/employee-center/generated/prisma';
import { PrismaClient as OrgClient } from '../../services/organization-service/generated/prisma';
import { PrismaClient as LeaveClient } from '../../services/leave-management/generated/prisma';
import { PrismaClient as PayrollClient } from '../../services/payroll-management/generated/prisma';
import { PrismaClient as TimeClient } from '../../services/time-attendance/generated/prisma';
import { PrismaClient as PerfClient } from '../../services/performance-talent/generated/prisma';
import { PrismaClient as BenefitsClient } from '../../services/benefits-management/generated/prisma';
import { PrismaClient as RecruitClient } from '../../services/recruitment-onboarding/generated/prisma';
import { PrismaClient as LDClient } from '../../services/lnd-service/generated/prisma';
import { PrismaClient as WorkflowClient } from '../../services/workflow-engine/generated/prisma';
import { PrismaClient as SettingsClient } from '../../services/settings-service/generated/prisma';

interface CountResult {
  service: string;
  table: string;
  count: number;
}

interface ValidationIssue {
  service: string;
  type: 'orphan' | 'missing_ref' | 'integrity';
  message: string;
}

const clients = {
  employee: new EmployeeClient(),
  org: new OrgClient(),
  leave: new LeaveClient(),
  payroll: new PayrollClient(),
  time: new TimeClient(),
  perf: new PerfClient(),
  benefits: new BenefitsClient(),
  recruit: new RecruitClient(),
  ld: new LDClient(),
  workflow: new WorkflowClient(),
  settings: new SettingsClient(),
};

async function countRecords(): Promise<CountResult[]> {
  const results: CountResult[] = [];

  // Employee Center
  results.push({ service: 'employee-center', table: 'employees', count: await clients.employee.employee.count() });
  results.push({ service: 'employee-center', table: 'employments', count: await clients.employee.employment.count() });
  results.push({ service: 'employee-center', table: 'addresses', count: await clients.employee.address.count() });
  results.push({ service: 'employee-center', table: 'emergency_contacts', count: await clients.employee.emergencyContact.count() });
  results.push({ service: 'employee-center', table: 'dependents', count: await clients.employee.dependent.count() });
  results.push({ service: 'employee-center', table: 'work_permits', count: await clients.employee.workPermit.count() });

  // Organization
  results.push({ service: 'organization', table: 'departments', count: await clients.org.department.count() });
  results.push({ service: 'organization', table: 'positions', count: await clients.org.position.count() });
  results.push({ service: 'organization', table: 'org_nodes', count: await clients.org.orgNode.count() });
  results.push({ service: 'organization', table: 'reporting_lines', count: await clients.org.reportingLine.count() });

  // Leave
  results.push({ service: 'leave', table: 'leave_types', count: await clients.leave.leaveType.count() });
  results.push({ service: 'leave', table: 'leave_balances', count: await clients.leave.leaveBalance.count() });
  results.push({ service: 'leave', table: 'leave_requests', count: await clients.leave.leaveRequest.count() });
  results.push({ service: 'leave', table: 'leave_calendar', count: await clients.leave.leaveCalendar.count() });

  // Payroll
  results.push({ service: 'payroll', table: 'compensations', count: await clients.payroll.compensation.count() });
  results.push({ service: 'payroll', table: 'payroll_runs', count: await clients.payroll.payrollRun.count() });
  results.push({ service: 'payroll', table: 'payslips', count: await clients.payroll.payslip.count() });
  results.push({ service: 'payroll', table: 'tax_deductions', count: await clients.payroll.taxDeduction.count() });

  // Time & Attendance
  results.push({ service: 'time-attendance', table: 'shifts', count: await clients.time.shift.count() });
  results.push({ service: 'time-attendance', table: 'attendance_records', count: await clients.time.attendanceRecord.count() });
  results.push({ service: 'time-attendance', table: 'overtime_requests', count: await clients.time.overtimeRequest.count() });
  results.push({ service: 'time-attendance', table: 'locations', count: await clients.time.location.count() });
  results.push({ service: 'time-attendance', table: 'employee_locations', count: await clients.time.employeeLocation.count() });

  // Performance
  results.push({ service: 'performance', table: 'competencies', count: await clients.perf.competency.count() });
  results.push({ service: 'performance', table: 'goals', count: await clients.perf.goal.count() });
  results.push({ service: 'performance', table: 'evaluations', count: await clients.perf.evaluation.count() });
  results.push({ service: 'performance', table: 'talent_profiles', count: await clients.perf.talentProfile.count() });
  results.push({ service: 'performance', table: 'succession_plans', count: await clients.perf.successionPlan.count() });
  results.push({ service: 'performance', table: 'idp_plans', count: await clients.perf.iDPPlan.count() });

  // Benefits
  results.push({ service: 'benefits', table: 'benefit_plans', count: await clients.benefits.benefitPlan.count() });
  results.push({ service: 'benefits', table: 'benefit_enrollments', count: await clients.benefits.benefitEnrollment.count() });
  results.push({ service: 'benefits', table: 'benefit_dependents', count: await clients.benefits.benefitDependent.count() });
  results.push({ service: 'benefits', table: 'benefit_claims', count: await clients.benefits.benefitClaim.count() });

  // Recruitment
  results.push({ service: 'recruitment', table: 'job_postings', count: await clients.recruit.jobPosting.count() });
  results.push({ service: 'recruitment', table: 'candidates', count: await clients.recruit.candidate.count() });
  results.push({ service: 'recruitment', table: 'onboarding_templates', count: await clients.recruit.onboardingTemplate.count() });
  results.push({ service: 'recruitment', table: 'resignations', count: await clients.recruit.resignation.count() });

  // Learning
  results.push({ service: 'learning', table: 'courses', count: await clients.ld.course.count() });
  results.push({ service: 'learning', table: 'enrollments', count: await clients.ld.enrollment.count() });
  results.push({ service: 'learning', table: 'training_records', count: await clients.ld.trainingRecord.count() });

  // Workflow
  results.push({ service: 'workflow', table: 'workflows', count: await clients.workflow.workflow.count() });
  results.push({ service: 'workflow', table: 'workflow_steps', count: await clients.workflow.workflowStep.count() });
  results.push({ service: 'workflow', table: 'policy_rules', count: await clients.workflow.policyRule.count() });

  // Settings
  results.push({ service: 'settings', table: 'settings', count: await clients.settings.setting.count() });

  return results;
}

async function checkIntegrity(): Promise<ValidationIssue[]> {
  const issues: ValidationIssue[] = [];

  // Check: employees with no employment record
  const employeesWithoutEmployment = await clients.employee.employee.findMany({
    where: { employment: null },
    select: { employee_id: true },
  });
  if (employeesWithoutEmployment.length > 0) {
    issues.push({
      service: 'employee-center',
      type: 'orphan',
      message: `${employeesWithoutEmployment.length} employee(s) without employment record: ${employeesWithoutEmployment.map((e) => e.employee_id).join(', ')}`,
    });
  }

  // Check: positions referencing non-existent departments
  const positions = await clients.org.position.findMany({ select: { position_code: true, department_id: true } });
  for (const pos of positions) {
    const dept = await clients.org.department.findUnique({ where: { id: pos.department_id } });
    if (!dept) {
      issues.push({
        service: 'organization',
        type: 'missing_ref',
        message: `Position ${pos.position_code} references non-existent department ${pos.department_id}`,
      });
    }
  }

  // Check: leave balances referencing non-existent leave types
  const balances = await clients.leave.leaveBalance.findMany({ select: { id: true, leave_type_id: true, employee_id: true } });
  for (const bal of balances) {
    const lt = await clients.leave.leaveType.findUnique({ where: { id: bal.leave_type_id } });
    if (!lt) {
      issues.push({
        service: 'leave',
        type: 'missing_ref',
        message: `Leave balance ${bal.id} references non-existent leave type ${bal.leave_type_id}`,
      });
    }
  }

  // Check: benefit enrollments referencing non-existent plans
  const enrolls = await clients.benefits.benefitEnrollment.findMany({ select: { id: true, plan_id: true } });
  for (const enr of enrolls) {
    const plan = await clients.benefits.benefitPlan.findUnique({ where: { id: enr.plan_id } });
    if (!plan) {
      issues.push({
        service: 'benefits',
        type: 'missing_ref',
        message: `Enrollment ${enr.id} references non-existent plan ${enr.plan_id}`,
      });
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
// Main validation function
// ---------------------------------------------------------------------------

export async function runValidation() {
  console.log('');
  console.log('='.repeat(60));
  console.log('  Data Validation Report');
  console.log('='.repeat(60));
  console.log('');

  // Record counts
  console.log('Record Counts:');
  console.log('-'.repeat(60));
  console.log(`${'Service'.padEnd(20)} ${'Table'.padEnd(25)} ${'Count'.padStart(6)}`);
  console.log('-'.repeat(60));

  try {
    const counts = await countRecords();
    let totalRecords = 0;
    for (const c of counts) {
      console.log(`${c.service.padEnd(20)} ${c.table.padEnd(25)} ${String(c.count).padStart(6)}`);
      totalRecords += c.count;
    }
    console.log('-'.repeat(60));
    console.log(`${'TOTAL'.padEnd(46)} ${String(totalRecords).padStart(6)}`);
    console.log('');

    // Empty table warnings
    const emptyTables = counts.filter((c) => c.count === 0);
    if (emptyTables.length > 0) {
      console.log(`WARNING: ${emptyTables.length} empty table(s):`);
      for (const t of emptyTables) {
        console.log(`  - ${t.service}.${t.table}`);
      }
      console.log('');
    }
  } catch (err) {
    console.error('Failed to count records:', err);
  }

  // Referential integrity
  console.log('Referential Integrity Checks:');
  console.log('-'.repeat(60));
  try {
    const issues = await checkIntegrity();
    if (issues.length === 0) {
      console.log('  All integrity checks passed.');
    } else {
      for (const issue of issues) {
        console.log(`  [${issue.type.toUpperCase()}] ${issue.service}: ${issue.message}`);
      }
    }
  } catch (err) {
    console.error('Failed integrity checks:', err);
  }

  console.log('');
  console.log('Validation complete.');
}

// Disconnect all clients
async function disconnectAll() {
  await Promise.all(Object.values(clients).map((c) => c.$disconnect()));
}

if (require.main === module) {
  runValidation()
    .then(() => disconnectAll())
    .catch((e) => {
      console.error(e);
      disconnectAll();
      process.exit(1);
    });
}

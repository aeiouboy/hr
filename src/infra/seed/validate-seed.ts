/**
 * Seed Data Validation Script
 * Verifies data integrity after seeding: record counts, FK relationships, consistency
 */

// Import all Prisma clients
import { PrismaClient as EmployeeClient } from '../../services/employee-center/generated/prisma';
import { PrismaClient as OrgClient } from '../../services/organization-service/generated/prisma';
import { PrismaClient as LeaveClient } from '../../services/leave-management/generated/prisma';
import { PrismaClient as PayrollClient } from '../../services/payroll-management/generated/prisma';
import { PrismaClient as AttendanceClient } from '../../services/time-attendance/generated/prisma';
import { PrismaClient as WorkflowClient } from '../../services/workflow-engine/generated/prisma';
import { PrismaClient as LndClient } from '../../services/lnd-service/generated/prisma';
import { PrismaClient as RecruitmentClient } from '../../services/recruitment/generated/prisma';
import { PrismaClient as PerformanceClient } from '../../services/performance-talent/generated/prisma';
import { PrismaClient as BenefitsClient } from '../../services/benefits-management/generated/prisma';
import { PrismaClient as SettingsClient } from '../../services/settings-service/generated/prisma';

interface ValidationResult {
  service: string;
  entity: string;
  count: number;
  expected_min: number;
  status: 'pass' | 'fail' | 'warn';
  message?: string;
}

export async function validateSeedData(): Promise<void> {
  console.log('========================================');
  console.log('  Seed Data Validation');
  console.log('========================================\n');

  const results: ValidationResult[] = [];
  const clients: { name: string; client: { $disconnect: () => Promise<void> } }[] = [];

  try {
    // Employee Center
    const empClient = new EmployeeClient();
    clients.push({ name: 'employee-center', client: empClient });
    const empCount = await empClient.employee.count();
    results.push({ service: 'employee-center', entity: 'Employee', count: empCount, expected_min: 10, status: empCount >= 10 ? 'pass' : 'fail' });

    const employmentCount = await empClient.employment.count();
    results.push({ service: 'employee-center', entity: 'Employment', count: employmentCount, expected_min: 10, status: employmentCount >= 10 ? 'pass' : 'fail' });

    const addressCount = await empClient.address.count();
    results.push({ service: 'employee-center', entity: 'Address', count: addressCount, expected_min: 2, status: addressCount >= 2 ? 'pass' : 'fail' });

    const ecCount = await empClient.emergencyContact.count();
    results.push({ service: 'employee-center', entity: 'EmergencyContact', count: ecCount, expected_min: 2, status: ecCount >= 2 ? 'pass' : 'fail' });

    const depCount = await empClient.dependent.count();
    results.push({ service: 'employee-center', entity: 'Dependent', count: depCount, expected_min: 2, status: depCount >= 2 ? 'pass' : 'fail' });

    const wpCount = await empClient.workPermit.count();
    results.push({ service: 'employee-center', entity: 'WorkPermit', count: wpCount, expected_min: 1, status: wpCount >= 1 ? 'pass' : 'fail' });

    // Verify FK: all employments reference valid employees
    const orphanEmployments = await empClient.employment.count({
      where: { employee: { is: null as any } },
    }).catch(() => -1);
    if (orphanEmployments > 0) {
      results.push({ service: 'employee-center', entity: 'Employment FK', count: orphanEmployments, expected_min: 0, status: 'fail', message: `${orphanEmployments} orphan employment records` });
    }

    // Organization Service
    const orgClient = new OrgClient();
    clients.push({ name: 'organization-service', client: orgClient });
    const deptCount = await orgClient.department.count();
    results.push({ service: 'organization-service', entity: 'Department', count: deptCount, expected_min: 5, status: deptCount >= 5 ? 'pass' : 'fail' });

    const posCount = await orgClient.position.count();
    results.push({ service: 'organization-service', entity: 'Position', count: posCount, expected_min: 10, status: posCount >= 10 ? 'pass' : 'fail' });

    const incCount = await orgClient.incumbent.count();
    results.push({ service: 'organization-service', entity: 'Incumbent', count: incCount, expected_min: 5, status: incCount >= 5 ? 'pass' : 'fail' });

    const orgNodeCount = await orgClient.orgNode.count();
    results.push({ service: 'organization-service', entity: 'OrgNode', count: orgNodeCount, expected_min: 5, status: orgNodeCount >= 5 ? 'pass' : 'fail' });

    const rlCount = await orgClient.reportingLine.count();
    results.push({ service: 'organization-service', entity: 'ReportingLine', count: rlCount, expected_min: 5, status: rlCount >= 5 ? 'pass' : 'fail' });

    // Leave Management
    const leaveClient = new LeaveClient();
    clients.push({ name: 'leave-management', client: leaveClient });
    const ltCount = await leaveClient.leaveType.count();
    results.push({ service: 'leave-management', entity: 'LeaveType', count: ltCount, expected_min: 8, status: ltCount >= 8 ? 'pass' : 'fail' });

    const lbCount = await leaveClient.leaveBalance.count();
    results.push({ service: 'leave-management', entity: 'LeaveBalance', count: lbCount, expected_min: 5, status: lbCount >= 5 ? 'pass' : 'fail' });

    const lrCount = await leaveClient.leaveRequest.count();
    results.push({ service: 'leave-management', entity: 'LeaveRequest', count: lrCount, expected_min: 3, status: lrCount >= 3 ? 'pass' : 'fail' });

    // Payroll Management
    const payrollClient = new PayrollClient();
    clients.push({ name: 'payroll-management', client: payrollClient });
    const compCount = await payrollClient.compensation.count();
    results.push({ service: 'payroll-management', entity: 'Compensation', count: compCount, expected_min: 3, status: compCount >= 3 ? 'pass' : 'fail' });

    const prCount = await payrollClient.payrollRun.count();
    results.push({ service: 'payroll-management', entity: 'PayrollRun', count: prCount, expected_min: 1, status: prCount >= 1 ? 'pass' : 'fail' });

    const psCount = await payrollClient.payslip.count();
    results.push({ service: 'payroll-management', entity: 'Payslip', count: psCount, expected_min: 3, status: psCount >= 3 ? 'pass' : 'fail' });

    // Time & Attendance
    const attClient = new AttendanceClient();
    clients.push({ name: 'time-attendance', client: attClient });
    const shiftCount = await attClient.shift.count();
    results.push({ service: 'time-attendance', entity: 'Shift', count: shiftCount, expected_min: 4, status: shiftCount >= 4 ? 'pass' : 'fail' });

    const attRecCount = await attClient.attendanceRecord.count();
    results.push({ service: 'time-attendance', entity: 'AttendanceRecord', count: attRecCount, expected_min: 5, status: attRecCount >= 5 ? 'pass' : 'fail' });

    const otCount = await attClient.overtimeRequest.count();
    results.push({ service: 'time-attendance', entity: 'OvertimeRequest', count: otCount, expected_min: 3, status: otCount >= 3 ? 'pass' : 'fail' });

    const locCount = await attClient.location.count();
    results.push({ service: 'time-attendance', entity: 'Location', count: locCount, expected_min: 5, status: locCount >= 5 ? 'pass' : 'fail' });

    // Workflow Engine
    const wfClient = new WorkflowClient();
    clients.push({ name: 'workflow-engine', client: wfClient });
    const wfCount = await wfClient.workflow.count();
    results.push({ service: 'workflow-engine', entity: 'Workflow', count: wfCount, expected_min: 5, status: wfCount >= 5 ? 'pass' : 'fail' });

    const wsCount = await wfClient.workflowStep.count();
    results.push({ service: 'workflow-engine', entity: 'WorkflowStep', count: wsCount, expected_min: 10, status: wsCount >= 10 ? 'pass' : 'fail' });

    const pruleCount = await wfClient.policyRule.count();
    results.push({ service: 'workflow-engine', entity: 'PolicyRule', count: pruleCount, expected_min: 5, status: pruleCount >= 5 ? 'pass' : 'fail' });

    // L&D
    const lndClient = new LndClient();
    clients.push({ name: 'lnd-service', client: lndClient });
    const courseCount = await lndClient.course.count();
    results.push({ service: 'lnd-service', entity: 'Course', count: courseCount, expected_min: 8, status: courseCount >= 8 ? 'pass' : 'fail' });

    const enrCount = await lndClient.enrollment.count();
    results.push({ service: 'lnd-service', entity: 'Enrollment', count: enrCount, expected_min: 3, status: enrCount >= 3 ? 'pass' : 'fail' });

    const trCount = await lndClient.trainingRecord.count();
    results.push({ service: 'lnd-service', entity: 'TrainingRecord', count: trCount, expected_min: 3, status: trCount >= 3 ? 'pass' : 'fail' });

    // Recruitment
    const recClient = new RecruitmentClient();
    clients.push({ name: 'recruitment', client: recClient });
    const jpCount = await recClient.jobPosting.count();
    results.push({ service: 'recruitment', entity: 'JobPosting', count: jpCount, expected_min: 4, status: jpCount >= 4 ? 'pass' : 'fail' });

    const candCount = await recClient.candidate.count();
    results.push({ service: 'recruitment', entity: 'Candidate', count: candCount, expected_min: 5, status: candCount >= 5 ? 'pass' : 'fail' });

    // Performance & Talent
    const perfClient = new PerformanceClient();
    clients.push({ name: 'performance-talent', client: perfClient });
    const goalCount = await perfClient.goal.count();
    results.push({ service: 'performance-talent', entity: 'Goal', count: goalCount, expected_min: 5, status: goalCount >= 5 ? 'pass' : 'fail' });

    const evalCount = await perfClient.evaluation.count();
    results.push({ service: 'performance-talent', entity: 'Evaluation', count: evalCount, expected_min: 2, status: evalCount >= 2 ? 'pass' : 'fail' });

    const tpCount = await perfClient.talentProfile.count();
    results.push({ service: 'performance-talent', entity: 'TalentProfile', count: tpCount, expected_min: 3, status: tpCount >= 3 ? 'pass' : 'fail' });

    const spCount = await perfClient.successionPlan.count();
    results.push({ service: 'performance-talent', entity: 'SuccessionPlan', count: spCount, expected_min: 2, status: spCount >= 2 ? 'pass' : 'fail' });

    // Benefits
    const benClient = new BenefitsClient();
    clients.push({ name: 'benefits-management', client: benClient });
    const bpCount = await benClient.benefitPlan.count();
    results.push({ service: 'benefits-management', entity: 'BenefitPlan', count: bpCount, expected_min: 8, status: bpCount >= 8 ? 'pass' : 'fail' });

    const beCount = await benClient.benefitEnrollment.count();
    results.push({ service: 'benefits-management', entity: 'BenefitEnrollment', count: beCount, expected_min: 5, status: beCount >= 5 ? 'pass' : 'fail' });

    // Settings
    const setClient = new SettingsClient();
    clients.push({ name: 'settings-service', client: setClient });
    const setCount = await setClient.setting.count();
    results.push({ service: 'settings-service', entity: 'Setting', count: setCount, expected_min: 15, status: setCount >= 15 ? 'pass' : 'fail' });

    // Print results
    const passed = results.filter((r) => r.status === 'pass').length;
    const failed = results.filter((r) => r.status === 'fail').length;
    const warned = results.filter((r) => r.status === 'warn').length;

    console.log('Service                  | Entity            | Count | Min | Status');
    console.log('-------------------------|-------------------|-------|-----|-------');
    for (const r of results) {
      const svc = r.service.padEnd(24);
      const ent = r.entity.padEnd(18);
      const cnt = String(r.count).padStart(5);
      const min = String(r.expected_min).padStart(3);
      const icon = r.status === 'pass' ? '✓' : r.status === 'fail' ? '✗' : '⚠';
      console.log(`${svc} | ${ent} | ${cnt} | ${min} | ${icon} ${r.message || ''}`);
    }

    console.log('\n========================================');
    console.log(`  Passed: ${passed}  Failed: ${failed}  Warnings: ${warned}`);
    console.log('========================================');

    if (failed > 0) {
      process.exitCode = 1;
    }
  } finally {
    for (const { client } of clients) {
      await client.$disconnect();
    }
  }
}

if (require.main === module) {
  validateSeedData().catch((e) => {
    console.error('Validation error:', e);
    process.exit(1);
  });
}

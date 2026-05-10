import type { SuitePersona } from '../support/personas';

export type HrTestDomain =
  | 'auth'
  | 'employee-self-service'
  | 'hr-admin'
  | 'manager-approvals'
  | 'time-benefits-payroll'
  | 'performance-learning-talent'
  | 'system-admin'
  | 'cross-cutting';

export interface HrTestCase {
  id: string;
  title: string;
  domain: HrTestDomain;
  persona: SuitePersona;
  priority: 'P0' | 'P1' | 'P2';
  tags: string[];
  schemaVersion?: number;
  objective?: string;
  preconditions?: string[];
  testDataRef?: string;
  expectedOutcome?: string;
  requirementRefs?: string[];
  severity?: 'critical' | 'high' | 'medium' | 'low';
  automationStatus?: 'automated' | 'partial' | 'manual' | 'planned';
  owner?: string;
}

export const hrFullSuiteCases: HrTestCase[] = [
  {
    id: 'HR-ESS-001',
    title: 'Employee shell and self-service routes render',
    domain: 'employee-self-service',
    persona: 'employee',
    priority: 'P0',
    tags: ['smoke', 'critical', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify employee can access primary self-service entry points.',
    preconditions: ['Employee persona is available through Humi storage auth.'],
    testDataRef: 'persona:employee/demo-shell',
    expectedOutcome: 'Employee self-service routes render with visible non-empty content.',
    requirementRefs: ['HR-ESS-SHELL'],
    severity: 'high',
    automationStatus: 'automated',
  },
  {
    id: 'HR-MGR-001',
    title: 'Manager dashboard and approval routes render',
    domain: 'manager-approvals',
    persona: 'manager',
    priority: 'P0',
    tags: ['smoke', 'critical', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify manager can access dashboard and quick approval routes.',
    preconditions: ['Manager persona is available through Humi storage auth.'],
    testDataRef: 'persona:manager/demo-approvals',
    expectedOutcome: 'Manager approval entry points render with visible non-empty content.',
    requirementRefs: ['HR-MGR-APPROVALS'],
    severity: 'high',
    automationStatus: 'automated',
  },
  {
    id: 'HR-HRBP-001',
    title: 'HRBP dashboard and talent routes render',
    domain: 'manager-approvals',
    persona: 'hrbp',
    priority: 'P0',
    tags: ['smoke', 'critical', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify HRBP can access dashboard, talent search, and approval routes.',
    preconditions: ['HRBP persona is available through Humi storage auth.'],
    testDataRef: 'persona:hrbp/demo-talent',
    expectedOutcome: 'HRBP routes render with visible non-empty content.',
    requirementRefs: ['HR-HRBP-TALENT'],
    severity: 'high',
    automationStatus: 'automated',
  },
  {
    id: 'HR-SPD-001',
    title: 'SPD approval and management routes render',
    domain: 'manager-approvals',
    persona: 'spd',
    priority: 'P0',
    tags: ['smoke', 'critical', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify SPD can access management and quick approval routes.',
    preconditions: ['SPD persona is available through Humi storage auth.'],
    testDataRef: 'persona:spd/demo-approvals',
    expectedOutcome: 'SPD routes render with visible non-empty content.',
    requirementRefs: ['HR-SPD-APPROVALS'],
    severity: 'medium',
    automationStatus: 'automated',
  },
  {
    id: 'HR-ADMIN-001',
    title: 'HR Admin core administration routes render',
    domain: 'hr-admin',
    persona: 'hr_admin',
    priority: 'P0',
    tags: ['smoke', 'critical', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify HR admin can access core administration surfaces.',
    preconditions: ['HR admin persona is available through Humi storage auth.'],
    testDataRef: 'persona:hr_admin/demo-admin',
    expectedOutcome: 'Admin routes render with visible non-empty content.',
    requirementRefs: ['HR-ADMIN-SHELL'],
    severity: 'critical',
    automationStatus: 'automated',
  },
  {
    id: 'HR-ADMIN-EMP-001',
    title: 'HR Admin employee lifecycle entry points render',
    domain: 'hr-admin',
    persona: 'hr_admin',
    priority: 'P0',
    tags: ['smoke', 'evidence'],
    schemaVersion: 2,
    objective: 'Verify HR admin can access employee lifecycle entry points.',
    preconditions: ['HR admin persona is authenticated.', 'Demo employee/lifecycle data is available.'],
    testDataRef: 'persona:hr_admin/employee-lifecycle-entrypoints',
    expectedOutcome: 'Employee directory, hire wizard, and change request queue render.',
    requirementRefs: ['HR-ADMIN-EMP-LIFECYCLE'],
    severity: 'critical',
    automationStatus: 'automated',
  },
  {
    id: 'HR-ADMIN-HIRE-001',
    title: 'HR Admin hire lifecycle QA evidence pack',
    domain: 'hr-admin',
    persona: 'hr_admin',
    priority: 'P0',
    tags: ['hr-admin-hire', 'evidence', 'scenario'],
    schemaVersion: 2,
    objective: 'Verify the hire lifecycle entry can be opened and produces QA-grade evidence metadata for the wizard path.',
    preconditions: ['HR admin persona is authenticated.', 'Only demo/seeded hire data references are used in artifacts.'],
    testDataRef: 'fixture:hire/demo-seeded-minimal-v1',
    expectedOutcome: 'Hire wizard renders, exposes step controls, and links back to lifecycle queues for follow-up review.',
    requirementRefs: ['HR-ADMIN-HIRE', 'HR-ADMIN-HIRE-EVIDENCE'],
    severity: 'critical',
    automationStatus: 'partial',
    owner: 'qa-automation',
  },
];

export function getHrTestCase(id: string): HrTestCase {
  const found = hrFullSuiteCases.find((testCase) => testCase.id === id);
  if (!found) {
    throw new Error(`Unknown HR full-suite test case: ${id}`);
  }
  return found;
}

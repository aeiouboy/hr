// STA-69-ish follow-up: mock eligibility-rule seed for the /admin/benefits/rules
// list view. Used as a graceful fallback in `listAllEligibilityRules` /
// `listEligibilityRules` when the gateway endpoint is unavailable (UI-mockup
// phase has no backend).
//
// Shape mirrors `EligibilityRule` in src/lib/workflow-api.ts. Keep this file
// import-free of workflow-api so we don't create a cycle.

export type MockEligibilityRule = {
  id: string;
  benefit_key: string;
  scope_type: 'role' | 'position' | 'department' | 'individual' | 'entitlement';
  scope_value: string;
  allow: boolean;
  max_per_month: number | null;
  max_per_year: number | null;
  auto_approve_max: number | null;
  created_by: string;
  effective_from: string;
  effective_to: string | null;
  policy_profile: string | null;
  rule_id: string | null;
  rule_name: string | null;
  plan_id: string | null;
  status: 'draft' | 'active' | 'inactive' | null;
  business_unit: string | null;
  company_code: string | null;
  employee_group: string | null;
  employee_subgroup: string | null;
  dvt_project: string | null;
  pg_from: number | null;
  pg_to: number | null;
  plan_effective: string | null;
  effective_type: 'hire_date' | 'pass_probation_date' | 'day_from_hire_date' | 'hour_from_hire_date' | null;
  waiting_period_days: number | null;
  no_of_years_from_hiring: number | null;
  hiring_date_from: string | null;
  hiring_date_to: string | null;
  claim_period: string | null;
  entitlement_amount: number | null;
  max_per_claim: number | null;
  company: string | null;
  job_code: string | null;
  additional_condition: string | null;
};

const COMMON: Pick<MockEligibilityRule,
  'created_by' | 'effective_from' | 'effective_to' | 'plan_effective' |
  'no_of_years_from_hiring' | 'hiring_date_from' | 'hiring_date_to' |
  'company' | 'company_code' | 'job_code' | 'additional_condition' |
  'rule_id' | 'rule_name' | 'plan_id' | 'status' | 'business_unit' |
  'employee_subgroup' | 'dvt_project' | 'effective_type' | 'waiting_period_days' |
  'claim_period'
> = {
  created_by: 'system-seed',
  effective_from: '2026-01-01',
  effective_to: null,
  plan_effective: 'hire_date',
  effective_type: 'hire_date',
  rule_id: null,
  rule_name: null,
  plan_id: 'TH_MAD_001',
  status: 'active',
  business_unit: null,
  company_code: 'CG',
  no_of_years_from_hiring: null,
  hiring_date_from: null,
  hiring_date_to: null,
  waiting_period_days: null,
  claim_period: null,
  employee_subgroup: null,
  dvt_project: null,
  company: 'CG',
  job_code: null,
  additional_condition: null,
};

export const MOCK_ELIGIBILITY_RULES: MockEligibilityRule[] = [
  // ── Medical reimbursement ────────────────────────────────────────────────
  {
    ...COMMON,
    id: 'rule-med-001',
    benefit_key: 'medical-reimbursement',
    scope_type: 'entitlement',
    scope_value: 'Permanent staff · PG1-PG6',
    allow: true,
    policy_profile: 'CPN',
    employee_group: 'A',
    pg_from: 1,
    pg_to: 6,
    max_per_month: null,
    max_per_year: 30000,
    auto_approve_max: 5000,
    entitlement_amount: 30000,
    max_per_claim: 5000,
  },
  {
    ...COMMON,
    id: 'rule-med-002',
    benefit_key: 'medical-reimbursement',
    scope_type: 'entitlement',
    scope_value: 'Contract staff · PG1-PG4',
    allow: true,
    policy_profile: 'CPN',
    employee_group: 'B',
    pg_from: 1,
    pg_to: 4,
    max_per_month: null,
    max_per_year: 15000,
    auto_approve_max: 3000,
    entitlement_amount: 15000,
    max_per_claim: 3000,
  },
  {
    ...COMMON,
    id: 'rule-med-003',
    benefit_key: 'medical-reimbursement',
    scope_type: 'entitlement',
    scope_value: 'Probation · capped',
    allow: true,
    policy_profile: 'CPN',
    employee_group: 'D',
    pg_from: 1,
    pg_to: 3,
    max_per_month: 2000,
    max_per_year: 6000,
    auto_approve_max: null,
    entitlement_amount: 6000,
    max_per_claim: 2000,
  },

  // ── Training ─────────────────────────────────────────────────────────────
  {
    ...COMMON,
    id: 'rule-trn-001',
    benefit_key: 'training',
    scope_type: 'entitlement',
    scope_value: 'Permanent staff · annual cap',
    allow: true,
    policy_profile: 'CPN',
    employee_group: 'A',
    pg_from: 1,
    pg_to: 6,
    max_per_month: null,
    max_per_year: 50000,
    auto_approve_max: 10000,
    entitlement_amount: 50000,
    max_per_claim: 10000,
  },
  {
    ...COMMON,
    id: 'rule-trn-002',
    benefit_key: 'training',
    scope_type: 'entitlement',
    scope_value: 'Manager+ · annual cap',
    allow: true,
    policy_profile: 'RIS',
    employee_group: 'A',
    pg_from: 4,
    pg_to: 6,
    max_per_month: null,
    max_per_year: 80000,
    auto_approve_max: 20000,
    entitlement_amount: 80000,
    max_per_claim: 20000,
  },

  // ── Travel allowance ─────────────────────────────────────────────────────
  {
    ...COMMON,
    id: 'rule-trv-001',
    benefit_key: 'travel-allowance',
    scope_type: 'entitlement',
    scope_value: 'Field staff · monthly',
    allow: true,
    policy_profile: 'CPN-FOOD',
    employee_group: 'A',
    pg_from: 1,
    pg_to: 4,
    max_per_month: 6000,
    max_per_year: 72000,
    auto_approve_max: 1500,
    entitlement_amount: 72000,
    max_per_claim: 3000,
  },

  // ── Fuel allowance ───────────────────────────────────────────────────────
  {
    ...COMMON,
    id: 'rule-fuel-001',
    benefit_key: 'fuel-allowance',
    scope_type: 'entitlement',
    scope_value: 'Field staff · mileage-based',
    allow: true,
    policy_profile: 'CPN-FOOD',
    employee_group: 'A',
    pg_from: 1,
    pg_to: 4,
    max_per_month: 6000,
    max_per_year: 72000,
    auto_approve_max: 1000,
    entitlement_amount: 72000,
    max_per_claim: 2500,
  },
  {
    ...COMMON,
    id: 'rule-fuel-002',
    benefit_key: 'fuel-allowance',
    scope_type: 'entitlement',
    scope_value: 'Delivery operations · monthly',
    allow: true,
    policy_profile: 'CRC',
    employee_group: 'B',
    pg_from: 1,
    pg_to: 3,
    max_per_month: 4000,
    max_per_year: 48000,
    auto_approve_max: 1000,
    entitlement_amount: 48000,
    max_per_claim: 1500,
  },
];

export function mockEligibilityRulesByKey(benefitKey: string): MockEligibilityRule[] {
  return MOCK_ELIGIBILITY_RULES.filter((r) => r.benefit_key === benefitKey);
}

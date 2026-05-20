import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  addEligibilityRule,
  deleteEligibilityRule,
  getEligibilityRuleHistory,
  listAllEligibilityRules,
  listEligibilityRules,
  updateEligibilityRule,
} from '@/lib/workflow-api';
import { MOCK_ELIGIBILITY_RULES } from '@/data/benefits/mock-eligibility-rules';

vi.mock('next-auth/react', () => ({
  getSession: vi.fn().mockResolvedValue(null),
}));

describe('workflow-api eligibility fallback', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it('returns mock entitlement rules when the workflow gateway is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network unavailable'));

    const rules = await listAllEligibilityRules();

    expect(rules).toHaveLength(MOCK_ELIGIBILITY_RULES.length);
    expect(rules.map((rule) => rule.id)).toContain('rule-med-001');
  });

  it('returns mock rules when the gateway responds with an empty rule set', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ benefitKey: 'medical-reimbursement', rules: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const rules = await listEligibilityRules('medical-reimbursement');

    expect(rules.map((rule) => rule.id)).toEqual(['rule-med-001', 'rule-med-002', 'rule-med-003']);
  });

  it('persists expanded STA-71 rule fields locally when the gateway is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network unavailable'));

    const created = await addEligibilityRule('medical-reimbursement', {
      scope_type: 'entitlement',
      scope_value: 'TH_MAD_001:CPN:DVT:A:1-6',
      allow: true,
      created_by: 'hr-admin',
      rule_id: 'TH_MAD_001-RULE-DVT',
      rule_name: 'DVT medical entitlement',
      plan_id: 'TH_MAD_001',
      status: 'active',
      effective_from: '2026-02-01',
      policy_profile: 'CPN',
      business_unit: 'DVT',
      company_code: 'DVT',
      job_code: 'DVT-ENG',
      employee_group: 'A',
      employee_subgroup: 'DVT-PROJECT',
      dvt_project: 'DVT-2026-A',
      pg_from: 1,
      pg_to: 6,
      effective_type: 'pass_probation_date',
      waiting_period_days: 90,
      hiring_date_from: '2026-01-01',
      hiring_date_to: '2026-12-31',
      claim_period: 'annual',
      entitlement_amount: 42000,
      max_per_year: 42000,
      max_per_claim: 7000,
      additional_condition: 'Requires DVT assignment confirmation',
    });

    expect(created.rule_name).toBe('DVT medical entitlement');
    expect(created.business_unit).toBe('DVT');
    expect(created.dvt_project).toBe('DVT-2026-A');

    let rules = await listEligibilityRules('medical-reimbursement');
    expect(rules.find((rule) => rule.id === created.id)?.waiting_period_days).toBe(90);

    const updated = await updateEligibilityRule('medical-reimbursement', created.id, {
      created_by: 'hr-admin',
      scope_type: 'entitlement',
      scope_value: created.scope_value,
      allow: true,
      rule_name: 'DVT medical entitlement updated',
      max_per_claim: 8000,
    });

    expect(updated.rule_name).toBe('DVT medical entitlement updated');
    expect(updated.max_per_claim).toBe(8000);

    await deleteEligibilityRule('medical-reimbursement', created.id);
    rules = await listEligibilityRules('medical-reimbursement');
    const deleted = rules.find((rule) => rule.id === created.id);
    expect(deleted?.status).toBe('inactive');
    expect(deleted?.effective_to).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns mock history for seeded rules when history endpoint is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network unavailable'));

    const history = await getEligibilityRuleHistory('medical-reimbursement', 'rule-med-001');

    expect(history).toHaveLength(2);
    expect(history[0].id).toBe('rule-med-001');
    expect(history[1].id).toBe('rule-med-001-prev');
  });
});

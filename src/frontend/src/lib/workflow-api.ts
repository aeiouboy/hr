import { buildAuthHeaders } from './_request';

// Client for the hr-workflow Fastify gateway (Camunda 7 BPMN orchestration).
// Pattern follows lib/api.ts but points at a separate base URL — workflow
// runs on its own port (3001 by default).

const BASE_URL = process.env.NEXT_PUBLIC_WORKFLOW_API_URL ?? 'http://localhost:3001';

export type WorkflowBenefitType = 'medical-reimbursement' | 'training' | 'travel-allowance';

export type WorkflowStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface BenefitRequestInput {
  requesterId: string;
  managerId: string;
  benefitType: WorkflowBenefitType;
  amount: number;
  description: string;
  attachmentUrl?: string;
}

export interface WorkflowStartResponse {
  /** Camunda process-instance id */
  id: string;
  definitionId: string;
  businessKey: string | null;
}

export interface WorkflowStatusResponse {
  status: WorkflowStatus;
  lastUpdate: string;
}

async function readErrorText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return res.statusText;
  }
}

export async function submitBenefitRequest(
  input: BenefitRequestInput,
): Promise<WorkflowStartResponse> {
  const headers = await buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/workflows/benefit-request/start`, {
    method: 'POST',
    headers,
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api submitBenefitRequest failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<WorkflowStartResponse>;
}

export async function getBenefitRequestStatus(instanceId: string): Promise<WorkflowStatusResponse> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/workflows/benefit-request/${encodeURIComponent(instanceId)}/status`,
    { method: 'GET', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api getBenefitRequestStatus failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<WorkflowStatusResponse>;
}

/**
 * Block until the workflow is observable (status fetch returns 200 with a
 * defined status). Closes the race window where the form completes faster
 * than Camunda creates the user task — without this, /approvals can render
 * the local Mock card before the Camunda lane has populated, and the
 * reviewer ends up approving the wrong card.
 *
 * Returns true when ready, false on timeout. Caller is expected to proceed
 * regardless (the timeout path logs a warning so the redirect doesn't hang
 * forever if Camunda is genuinely slow).
 */
export async function waitUntilWorkflowReady(
  instanceId: string,
  opts: { timeoutMs?: number; pollIntervalMs?: number } = {},
): Promise<boolean> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const pollIntervalMs = opts.pollIntervalMs ?? 250;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const status = await getBenefitRequestStatus(instanceId);
      if (status?.status) return true;
    } catch {
      // 404 / network — keep polling until deadline
    }
    await new Promise((r) => setTimeout(r, pollIntervalMs));
  }
  return false;
}

// ---------------------------------------------------------------------------
// Manager task list (Humi-styled approval page; replaces Camunda Tasklist).
// ---------------------------------------------------------------------------

export interface PendingTaskSummary {
  id: string;
  name: string;
  created: string;
  assignee: string | null;
  instanceId: string;
  processDefinitionKey: string;
  variables: {
    requesterId: string;
    managerId: string;
    benefitType: string;
    amount: number;
    description: string;
  };
}

export interface PendingTaskFilter {
  assignee?: string;
  candidateGroups?: string;
}

export async function listPendingTasks(filter: PendingTaskFilter): Promise<PendingTaskSummary[]> {
  const headers = await buildAuthHeaders();
  const params = new URLSearchParams();
  if (filter.assignee) params.set('assignee', filter.assignee);
  if (filter.candidateGroups) params.set('candidateGroups', filter.candidateGroups);

  const res = await fetch(`${BASE_URL}/workflows/tasks?${params.toString()}`, {
    method: 'GET',
    headers,
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api listPendingTasks failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<PendingTaskSummary[]>;
}

export async function completeTask(
  taskId: string,
  decision: { approved: boolean; reviewerComment?: string },
): Promise<void> {
  const headers = await buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/workflows/tasks/${encodeURIComponent(taskId)}/complete`, {
    method: 'POST',
    headers,
    body: JSON.stringify(decision),
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api completeTask failed (${res.status}): ${text}`);
  }
}

// ---------------------------------------------------------------------------
// Eligibility admin (Phase 3 — Admin UI).
// ---------------------------------------------------------------------------

export interface EligibilityRule {
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
  // STA-71 expanded rule identity / lifecycle fields
  rule_id: string | null;
  rule_name: string | null;
  plan_id: string | null;
  status: 'draft' | 'active' | 'inactive' | null;
  // SF-aligned employee fields
  policy_profile: string | null;
  business_unit: string | null;
  company: string | null;
  company_code: string | null;
  job_code: string | null;
  employee_group: string | null;
  employee_subgroup: string | null;
  dvt_project: string | null;
  pg_from: number | null;
  pg_to: number | null;
  plan_effective: string | null;
  effective_type:
    | 'hire_date'
    | 'pass_probation_date'
    | 'day_from_hire_date'
    | 'hour_from_hire_date'
    | null;
  waiting_period_days: number | null;
  no_of_years_from_hiring: number | null;
  hiring_date_from: string | null;
  hiring_date_to: string | null;
  claim_period: string | null;
  entitlement_amount: number | null;
  max_per_claim: number | null;
  additional_condition: string | null;
}

export interface EligibilityRuleInput {
  scope_type: EligibilityRule['scope_type'];
  scope_value: string;
  allow: boolean;
  max_per_month?: number | null;
  max_per_year?: number | null;
  auto_approve_max?: number | null;
  created_by: string;
  effective_from?: string | null;
  effective_to?: string | null;
  // STA-71 expanded rule identity / lifecycle fields
  rule_id?: string | null;
  rule_name?: string | null;
  plan_id?: string | null;
  status?: EligibilityRule['status'];
  // SF-aligned employee fields
  policy_profile?: string | null;
  business_unit?: string | null;
  company?: string | null;
  company_code?: string | null;
  job_code?: string | null;
  employee_group?: string | null;
  employee_subgroup?: string | null;
  dvt_project?: string | null;
  pg_from?: number | null;
  pg_to?: number | null;
  plan_effective?: string | null;
  effective_type?: EligibilityRule['effective_type'];
  waiting_period_days?: number | null;
  no_of_years_from_hiring?: number | null;
  hiring_date_from?: string | null;
  hiring_date_to?: string | null;
  claim_period?: string | null;
  entitlement_amount?: number | null;
  max_per_claim?: number | null;
  additional_condition?: string | null;
}

export interface BenefitDefinition {
  key: string;
  display_name: string;
  default_policy: 'allow' | 'deny';
  eligibility_enabled: boolean;
}

export const ALL_BENEFIT_KEYS = [
  'medical-reimbursement',
  'training',
  'travel-allowance',
  'fuel-allowance',
] as const;
export type BenefitKey = (typeof ALL_BENEFIT_KEYS)[number];

export const BENEFIT_PLAN_LABELS: Record<BenefitKey, { th: string; code: string }> = {
  'medical-reimbursement': { th: 'ค่ารักษาพยาบาล', code: 'TH_MAD_001' },
  training: { th: 'ค่าฝึกอบรม', code: 'TH_TRN_001' },
  'travel-allowance': { th: 'ค่าเดินทาง', code: 'TH_TRV_001' },
  'fuel-allowance': { th: 'เบิกค่าน้ำมัน', code: 'TH_FUL_001' },
};

const ELIGIBILITY_RULE_STORAGE_KEY = 'humi-admin-benefits-rules:eligibility:v1';

interface EligibilityRulePersistedEnvelope {
  version: number;
  rules: EligibilityRule[];
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function hasLocalEligibilityStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readPersistedEligibilityRules(): EligibilityRule[] {
  if (!hasLocalEligibilityStorage()) return [];
  try {
    const raw = window.localStorage.getItem(ELIGIBILITY_RULE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const envelope =
      (parsed as Partial<EligibilityRulePersistedEnvelope>) && typeof parsed === 'object' ? parsed : null;
    if (envelope && Array.isArray((envelope as { rules?: unknown }).rules)) {
      return (envelope as EligibilityRulePersistedEnvelope).rules.filter((rule): rule is EligibilityRule =>
        !!rule && typeof rule === 'object' && 'id' in rule,
      );
    }
    if (Array.isArray(parsed)) return parsed as EligibilityRule[];
    return [];
  } catch {
    return [];
  }
}

function writePersistedEligibilityRules(rules: EligibilityRule[]): void {
  if (!hasLocalEligibilityStorage()) return;
  try {
    const envelope: EligibilityRulePersistedEnvelope = {
      version: 1,
      rules,
    };
    window.localStorage.setItem(ELIGIBILITY_RULE_STORAGE_KEY, JSON.stringify(envelope));
  } catch {
    // Mock persistence is best-effort only; never break the UI when storage is unavailable.
  }
}

function getPersistedRulesForBenefit(rules: EligibilityRule[], benefitKey: string): EligibilityRule[] {
  return rules.filter((rule) => rule.benefit_key === benefitKey);
}

function mergeEligibilityRules(
  baseRules: EligibilityRule[],
  benefitKey?: string,
  persistedRules = readPersistedEligibilityRules(),
): EligibilityRule[] {
  const scopedPersistedRules = benefitKey ? getPersistedRulesForBenefit(persistedRules, benefitKey) : persistedRules;
  const byId = new Map<string, EligibilityRule>();
  for (const rule of baseRules) byId.set(rule.id, rule);
  for (const rule of scopedPersistedRules) byId.set(rule.id, rule);
  return Array.from(byId.values());
}

function persistEligibilityRule(rule: EligibilityRule): EligibilityRule {
  const persisted = readPersistedEligibilityRules();
  const next = new Map(persisted.map((item) => [item.id, item]));
  next.set(rule.id, rule);
  writePersistedEligibilityRules(Array.from(next.values()));
  return rule;
}

async function getMockEligibilityRuleSnapshot(benefitKey: string): Promise<EligibilityRule[]> {
  const mod = await import('@/data/benefits/mock-eligibility-rules');
  const seeded = mod.mockEligibilityRulesByKey(benefitKey) as unknown as EligibilityRule[];
  return mergeEligibilityRules(seeded, benefitKey);
}

function normalizeEligibilityRule(
  benefitKey: string,
  input: Partial<EligibilityRuleInput>,
  existing?: EligibilityRule,
): EligibilityRule {
  const planId =
    input.plan_id ??
    existing?.plan_id ??
    BENEFIT_PLAN_LABELS[benefitKey as BenefitKey]?.code ??
    benefitKey;
  const ruleId = input.rule_id ?? existing?.rule_id ?? `${planId}-RULE-${Date.now()}`;
  const entitlementAmount = input.entitlement_amount ?? existing?.entitlement_amount ?? null;
  const companyCode =
    input.company_code ?? existing?.company_code ?? input.company ?? existing?.company ?? null;
  const effectiveType = input.effective_type ?? existing?.effective_type ?? null;
  const planEffective = input.plan_effective ??
    existing?.plan_effective ??
    (effectiveType ?? null) ??
    'hire_date';

  return {
    id: existing?.id ?? ruleId,
    benefit_key: existing?.benefit_key ?? benefitKey,
    scope_type: input.scope_type ?? existing?.scope_type ?? 'entitlement',
    scope_value: input.scope_value ?? existing?.scope_value ?? ruleId,
    allow: input.allow ?? existing?.allow ?? true,
    max_per_month: input.max_per_month ?? existing?.max_per_month ?? null,
    max_per_year: input.max_per_year ?? existing?.max_per_year ?? entitlementAmount,
    auto_approve_max: input.auto_approve_max ?? existing?.auto_approve_max ?? null,
    created_by: input.created_by ?? existing?.created_by ?? 'admin',
    effective_from: input.effective_from ?? existing?.effective_from ?? todayIsoDate(),
    effective_to:
      input.effective_to === undefined ? (existing?.effective_to ?? null) : input.effective_to,
    rule_id: ruleId,
    rule_name: input.rule_name ?? existing?.rule_name ?? ruleId,
    plan_id: planId,
    status: input.status ?? existing?.status ?? 'active',
    policy_profile: input.policy_profile ?? existing?.policy_profile ?? null,
    business_unit: input.business_unit ?? existing?.business_unit ?? null,
    company: input.company ?? existing?.company ?? companyCode,
    company_code: companyCode,
    job_code: input.job_code ?? existing?.job_code ?? null,
    employee_group: input.employee_group ?? existing?.employee_group ?? null,
    employee_subgroup: input.employee_subgroup ?? existing?.employee_subgroup ?? null,
    dvt_project: input.dvt_project ?? existing?.dvt_project ?? null,
    pg_from: input.pg_from ?? existing?.pg_from ?? null,
    pg_to: input.pg_to ?? existing?.pg_to ?? null,
    plan_effective: planEffective,
    effective_type:
      effectiveType ??
      (planEffective === 'pass_probation_date'
        ? 'pass_probation_date'
        : planEffective === 'day_from_hire_date'
          ? 'day_from_hire_date'
          : planEffective === 'hour_from_hire_date'
            ? 'hour_from_hire_date'
            : existing?.effective_type ??
              (input.no_of_years_from_hiring != null ? 'day_from_hire_date' : null)),
    waiting_period_days: input.waiting_period_days ?? existing?.waiting_period_days ?? null,
    no_of_years_from_hiring:
      input.no_of_years_from_hiring ?? existing?.no_of_years_from_hiring ?? null,
    hiring_date_from: input.hiring_date_from ?? existing?.hiring_date_from ?? null,
    hiring_date_to: input.hiring_date_to ?? existing?.hiring_date_to ?? null,
    claim_period: input.claim_period ?? existing?.claim_period ?? null,
    entitlement_amount: entitlementAmount,
    max_per_claim: input.max_per_claim ?? existing?.max_per_claim ?? null,
    additional_condition: input.additional_condition ?? existing?.additional_condition ?? null,
  };
}

export async function listAllEligibilityRules(): Promise<EligibilityRule[]> {
  const results = await Promise.all(ALL_BENEFIT_KEYS.map(listEligibilityRules));
  return results.flat();
}

export async function listEligibilityRules(benefitKey: string): Promise<EligibilityRule[]> {
  // UI-mockup-phase fallback: when the workflow gateway is unavailable (no backend
  // in this phase), return the mock seed so /admin/benefits/rules has visible
  // example rows. Real gateway response takes precedence when available.
  //
  // 1500 ms hard cap via AbortController prevents the 75-second per-request
  // connection-timeout that browsers wait for an unreachable host. Without this
  // the page would hang for minutes per benefit key before showing mock data.
  const mockFallback = async () => {
    const mod = await import('@/data/benefits/mock-eligibility-rules');
    return mod.mockEligibilityRulesByKey(benefitKey) as unknown as EligibilityRule[];
  };
  try {
    const headers = await buildAuthHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    let res: Response;
    try {
      res = await fetch(
        `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility`,
        { method: 'GET', headers, signal: controller.signal },
      );
    } finally {
      clearTimeout(timeoutId);
    }
    if (!res.ok) return mergeEligibilityRules(await mockFallback(), benefitKey);
    const body = (await res.json()) as { benefitKey: string; rules: EligibilityRule[] };
    const rules = Array.isArray(body) ? (body as unknown as EligibilityRule[]) : (body.rules ?? []);
    return mergeEligibilityRules(rules.length > 0 ? rules : await mockFallback(), benefitKey).filter(
      (rule) => rule.benefit_key === benefitKey,
    );
  } catch {
    // Network error / abort / fetch threw → return mock seed
    return mergeEligibilityRules(await mockFallback(), benefitKey).filter(
      (rule) => rule.benefit_key === benefitKey,
    );
  }
}

export async function addEligibilityRule(
  benefitKey: string,
  rule: EligibilityRuleInput,
): Promise<EligibilityRule> {
  try {
    const headers = await buildAuthHeaders();
    const res = await fetch(
      `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility`,
      { method: 'POST', headers, body: JSON.stringify(rule) },
    );
    if (res.ok) return res.json() as Promise<EligibilityRule>;
  } catch {
    // UI mockup mode: persist route-local edits when the gateway is unavailable.
  }
  return persistEligibilityRule(normalizeEligibilityRule(benefitKey, rule));
}

export async function updateEligibilityRule(
  benefitKey: string,
  ruleId: string,
  input: Partial<EligibilityRuleInput>,
): Promise<EligibilityRule> {
  try {
    const headers = await buildAuthHeaders();
    const res = await fetch(
      `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}`,
      { method: 'PUT', headers, body: JSON.stringify(input) },
    );
    if (res.ok) return res.json() as Promise<EligibilityRule>;
  } catch {
    // UI mockup mode: persist route-local edits when the gateway is unavailable.
  }
  const existing = (await getMockEligibilityRuleSnapshot(benefitKey)).find(
    (rule) => rule.id === ruleId,
  );
  return persistEligibilityRule(normalizeEligibilityRule(benefitKey, input, existing));
}

export async function getEligibilityRuleHistory(
  benefitKey: string,
  ruleId: string,
): Promise<EligibilityRule[]> {
  // UI-mockup-phase fallback: 1500ms hard cap + mock history seed (current
  // version + one synthetic prior version with effective_to 2025-12-31).
  const mockFallback = async (): Promise<EligibilityRule[]> => {
    const mod = await import('@/data/benefits/mock-eligibility-rules');
    const current = mergeEligibilityRules(
      mod.MOCK_ELIGIBILITY_RULES as unknown as EligibilityRule[],
      benefitKey,
    ).find((r) => r.id === ruleId && r.benefit_key === benefitKey);
    if (!current) return [];
    const prior = {
      ...current,
      id: `${current.id}-prev`,
      effective_from: '2025-01-01',
      effective_to: '2025-12-31',
      entitlement_amount:
        current.entitlement_amount !== null ? Math.floor(current.entitlement_amount * 0.8) : null,
      max_per_year: current.max_per_year !== null ? Math.floor(current.max_per_year * 0.8) : null,
      created_by: 'system-seed',
    };
    return [current, prior] as unknown as EligibilityRule[];
  };
  try {
    const headers = await buildAuthHeaders();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    let res: Response;
    try {
      res = await fetch(
        `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}/history`,
        { method: 'GET', headers, signal: controller.signal },
      );
    } finally {
      clearTimeout(timeoutId);
    }
    if (!res.ok) return mockFallback();
    const body = (await res.json()) as { ruleId: string; history: EligibilityRule[] };
    return body.history ?? [];
  } catch {
    return mockFallback();
  }
}

export async function deleteEligibilityRule(benefitKey: string, ruleId: string): Promise<void> {
  try {
    const headers = await buildAuthHeaders();
    const res = await fetch(
      `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}`,
      { method: 'DELETE', headers },
    );
    if (res.ok) return;
  } catch {
    // UI mockup mode: persist route-local soft delete when the gateway is unavailable.
  }
  const existing = (await getMockEligibilityRuleSnapshot(benefitKey)).find(
    (rule) => rule.id === ruleId,
  );
  if (existing) {
    persistEligibilityRule({ ...existing, status: 'inactive', effective_to: todayIsoDate() });
  }
}

export async function getBenefitDefinition(benefitKey: string): Promise<BenefitDefinition> {
  const headers = await buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}`, {
    method: 'GET',
    headers,
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api getBenefitDefinition failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<BenefitDefinition>;
}

export async function updateBenefitPlan(
  benefitKey: string,
  updates: {
    display_name?: string;
    default_policy?: 'allow' | 'deny';
    recordType?: string;
    benefitTypeGroup?: string;
  },
): Promise<BenefitDefinition> {
  const headers = await buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api updateBenefitPlan failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<BenefitDefinition>;
}

export interface CreateBenefitPlanInput {
  key: string;
  displayNameTh: string;
  displayNameEn: string;
  category: string;
  recordType: string;
  benefitTypeGroup: string;
  annualLimitThb?: number | null;
  eligibilityRuleId?: string | null;
}

export async function createBenefitPlan(
  input: CreateBenefitPlanInput,
): Promise<{ id: string; key: string }> {
  const headers = await buildAuthHeaders();
  const res = await fetch(`${BASE_URL}/admin/benefits`, {
    method: 'POST',
    headers,
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api createBenefitPlan failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<{ id: string; key: string }>;
}

export async function setEligibilityEnabled(benefitKey: string, enabled: boolean): Promise<void> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility-enabled`,
    { method: 'PUT', headers, body: JSON.stringify({ enabled }) },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api setEligibilityEnabled failed (${res.status}): ${text}`);
  }
}

// ---------------------------------------------------------------------------
// Benefit-request timeline (detail page).
// ---------------------------------------------------------------------------

export interface TimelineEvent {
  activityId: string;
  activityName: string;
  activityType: 'startEvent' | 'userTask' | 'serviceTask' | 'endEvent' | string;
  startTime: string;
  endTime: string | null;
  durationMs: number | null;
  taskId: string | null;
}

export interface BenefitRequestTimeline {
  instanceId: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  submittedAt: string;
  completedAt: string | null;
  variables: Record<string, unknown>;
  timeline: TimelineEvent[];
}

export async function getBenefitRequestTimeline(
  instanceId: string,
): Promise<BenefitRequestTimeline> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/workflows/benefit-request/${encodeURIComponent(instanceId)}/timeline`,
    { method: 'GET', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api getBenefitRequestTimeline failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<BenefitRequestTimeline>;
}

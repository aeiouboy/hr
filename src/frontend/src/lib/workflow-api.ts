import { buildAuthHeaders } from './_request';

// Client for the hr-workflow Fastify gateway (Camunda 7 BPMN orchestration).
// Pattern follows lib/api.ts but points at a separate base URL — workflow
// runs on its own port (3001 by default).

const BASE_URL = process.env.NEXT_PUBLIC_WORKFLOW_API_URL ?? 'http://localhost:3001';

export type WorkflowBenefitType =
  | 'medical-reimbursement'
  | 'training'
  | 'travel-allowance';

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

export async function getBenefitRequestStatus(
  instanceId: string,
): Promise<WorkflowStatusResponse> {
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

export async function listPendingTasks(
  filter: PendingTaskFilter,
): Promise<PendingTaskSummary[]> {
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
  const res = await fetch(
    `${BASE_URL}/workflows/tasks/${encodeURIComponent(taskId)}/complete`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(decision),
    },
  );
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
  // SF-aligned fields
  policy_profile: string | null;
  employee_group: string | null;
  pg_from: number | null;
  pg_to: number | null;
  plan_effective: string | null;
  no_of_years_from_hiring: number | null;
  hiring_date_from: string | null;
  hiring_date_to: string | null;
  entitlement_amount: number | null;
  max_per_claim: number | null;
  company: string | null;
  job_code: string | null;
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
  // SF-aligned fields
  policy_profile?: string | null;
  employee_group?: string | null;
  pg_from?: number | null;
  pg_to?: number | null;
  plan_effective?: string | null;
  no_of_years_from_hiring?: number | null;
  hiring_date_from?: string | null;
  hiring_date_to?: string | null;
  entitlement_amount?: number | null;
  max_per_claim?: number | null;
  company?: string | null;
  job_code?: string | null;
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
export type BenefitKey = typeof ALL_BENEFIT_KEYS[number];

export const BENEFIT_PLAN_LABELS: Record<BenefitKey, { th: string; code: string }> = {
  'medical-reimbursement': { th: 'ค่ารักษาพยาบาล', code: 'TH_MAD_001' },
  'training':              { th: 'ค่าฝึกอบรม',      code: 'TH_TRN_001' },
  'travel-allowance':      { th: 'ค่าเดินทาง',      code: 'TH_TRV_001' },
  'fuel-allowance':        { th: 'เบิกค่าน้ำมัน',   code: 'TH_FUL_001' },
};

export async function listAllEligibilityRules(): Promise<EligibilityRule[]> {
  const results = await Promise.all(ALL_BENEFIT_KEYS.map(listEligibilityRules));
  return results.flat();
}

export async function listEligibilityRules(benefitKey: string): Promise<EligibilityRule[]> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility`,
    { method: 'GET', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api listEligibilityRules failed (${res.status}): ${text}`);
  }
  // Gateway shape: { benefitKey, rules: EligibilityRule[] }
  const body = (await res.json()) as { benefitKey: string; rules: EligibilityRule[] };
  return Array.isArray(body) ? (body as unknown as EligibilityRule[]) : (body.rules ?? []);
}

export async function addEligibilityRule(
  benefitKey: string,
  rule: EligibilityRuleInput,
): Promise<EligibilityRule> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility`,
    { method: 'POST', headers, body: JSON.stringify(rule) },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api addEligibilityRule failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<EligibilityRule>;
}

export async function updateEligibilityRule(
  benefitKey: string,
  ruleId: string,
  input: Partial<EligibilityRuleInput>,
): Promise<EligibilityRule> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}`,
    { method: 'PUT', headers, body: JSON.stringify(input) },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api updateEligibilityRule failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<EligibilityRule>;
}

export async function getEligibilityRuleHistory(
  benefitKey: string,
  ruleId: string,
): Promise<EligibilityRule[]> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}/history`,
    { method: 'GET', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api getEligibilityRuleHistory failed (${res.status}): ${text}`);
  }
  const body = (await res.json()) as { ruleId: string; history: EligibilityRule[] };
  return body.history ?? [];
}

export async function deleteEligibilityRule(benefitKey: string, ruleId: string): Promise<void> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}/eligibility/${ruleId}`,
    { method: 'DELETE', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api deleteEligibilityRule failed (${res.status}): ${text}`);
  }
}

export async function getBenefitDefinition(benefitKey: string): Promise<BenefitDefinition> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}`,
    { method: 'GET', headers },
  );
  if (!res.ok) {
    const text = await readErrorText(res);
    throw new Error(`workflow-api getBenefitDefinition failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<BenefitDefinition>;
}

export async function updateBenefitPlan(
  benefitKey: string,
  updates: { display_name?: string; default_policy?: 'allow' | 'deny' },
): Promise<BenefitDefinition> {
  const headers = await buildAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/admin/benefits/${encodeURIComponent(benefitKey)}`,
    { method: 'PUT', headers, body: JSON.stringify(updates) },
  );
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

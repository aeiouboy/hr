'use client';

import { useCallback, useEffect, useState } from 'react';
import { Trash2, Plus, ShieldCheck, ChevronDown, ChevronRight, Pencil, Clock } from 'lucide-react';

import { Card, CardEyebrow, CardTitle, Button, Modal } from '@/components/humi';
import { useToast } from '@/components/ui/toast';
import { useAuthStore } from '@/stores/auth-store';
import {
  listAllEligibilityRules,
  addEligibilityRule,
  updateEligibilityRule,
  deleteEligibilityRule,
  getEligibilityRuleHistory,
  ALL_BENEFIT_KEYS,
  BENEFIT_PLAN_LABELS,
  type EligibilityRule,
  type EligibilityRuleInput,
  type BenefitKey,
} from '@/lib/workflow-api';

// ── Constants ───────────────────────────────────────────────────────────────

const POLICY_PROFILES = ['CPN', 'RIS', 'CRC', 'CPFM', 'CPN-FOOD'] as const;
const BUSINESS_UNITS = ['CG-HQ', 'CRC', 'CPN', 'CPN-FOOD', 'DVT'] as const;
const COMPANY_CODES = ['CG', 'CRC', 'CPN', 'CPFM', 'DVT'] as const;
const EMPLOYEE_SUBGROUPS = ['ALL', 'HQ', 'STORE', 'FIELD', 'DVT-PROJECT'] as const;

const EMPLOYEE_GROUPS = [
  { value: 'A', label: 'A - Permanent (A)', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'B', label: 'B - Contract (B)', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  {
    value: 'C',
    label: 'C - Outsource (C)',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  { value: 'D', label: 'D - Probation (D)', color: 'bg-slate-50 text-slate-600 border-slate-200' },
  {
    value: 'E',
    label: 'E - Executive (E)',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  { value: 'F', label: 'F - Field (F)', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  {
    value: 'G',
    label: 'G - Graduate (G)',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  { value: 'H', label: 'H - Hourly (H)', color: 'bg-rose-50 text-rose-700 border-rose-200' },
] as const;

const EFFECTIVE_TYPE_OPTIONS = [
  { value: 'hire_date', label: 'HireDate' },
  { value: 'pass_probation_date', label: 'PassProbationDate' },
  { value: 'day_from_hire_date', label: 'DayFromHireDate' },
  { value: 'hour_from_hire_date', label: 'HourFromHireDate' },
] as const;

const CLAIM_PERIODS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Annual' },
  { value: 'per-claim', label: 'Per claim' },
] as const;

const RULE_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
] as const;

const PREVIEW_ROWS = 5;

function egColor(value: string) {
  return (
    EMPLOYEE_GROUPS.find((g) => g.value === value)?.color ??
    'bg-canvas-soft text-ink-soft border-hairline'
  );
}
function egLabel(value: string) {
  return EMPLOYEE_GROUPS.find((g) => g.value === value)?.label ?? value;
}
function effectiveTypeLabel(value: string | null | undefined) {
  return EFFECTIVE_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value ?? '-';
}
function statusClass(value: string | null | undefined) {
  if (value === 'active') return 'bg-success/10 text-success border-success/20';
  if (value === 'inactive') return 'bg-ink-faint/10 text-ink-muted border-hairline';
  return 'bg-amber-50 text-amber-700 border-amber-200';
}

// ── Main component ──────────────────────────────────────────────────────────

export function EntitlementRulesManager() {
  const { toast } = useToast();
  const userId = useAuthStore((s) => s.userId);
  const username = useAuthStore((s) => s.username);

  const [rules, setRules] = useState<EligibilityRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EligibilityRule | null>(null);
  const [editTarget, setEditTarget] = useState<EligibilityRule | null>(null);
  const [historyTarget, setHistoryTarget] = useState<EligibilityRule | null>(null);
  const [historyData, setHistoryData] = useState<EligibilityRule[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const all = await listAllEligibilityRules();
      setRules(all.filter((r) => r.scope_type === 'entitlement' && !r.effective_to));
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'โหลดข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const handleAdd = async (input: EligibilityRuleInput, benefitKey: string) => {
    const newRule = await addEligibilityRule(benefitKey, input);
    setRules((prev) => [...prev, newRule]);
    toast('success', 'เพิ่มกฎสิทธิ์เรียบร้อย');
  };

  const handleUpdate = async (input: Partial<EligibilityRuleInput>) => {
    if (!editTarget) return;
    const updated = await updateEligibilityRule(editTarget.benefit_key, editTarget.id, input);
    setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    toast('success', 'แก้ไขกฎสิทธิ์เรียบร้อย');
    setEditTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteEligibilityRule(deleteTarget.benefit_key, deleteTarget.id);
      setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      toast('success', 'ลบกฎสิทธิ์เรียบร้อย');
      setDeleteTarget(null);
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'ลบไม่สำเร็จ');
    } finally {
      setDeleting(false);
    }
  };

  const handleHistory = async (rule: EligibilityRule) => {
    if (historyTarget?.id === rule.id) {
      setHistoryTarget(null);
      return;
    }
    setHistoryTarget(rule);
    setHistoryLoading(true);
    try {
      const data = await getEligibilityRuleHistory(rule.benefit_key, rule.id);
      setHistoryData(data);
    } catch {
      toast('error', 'โหลดประวัติไม่สำเร็จ');
    } finally {
      setHistoryLoading(false);
    }
  };

  const toggleCollapse = (key: string) =>
    setCollapsed((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const toggleExpand = (key: string) =>
    setExpandedGroups((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const grouped = ALL_BENEFIT_KEYS.map((key) => ({
    key,
    plan: BENEFIT_PLAN_LABELS[key],
    rules: rules.filter((r) => r.benefit_key === key),
  }));

  return (
    <Card variant="raised" size="lg">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>CG-BE Entitlement Amount</CardEyebrow>
          <CardTitle>กฎวงเงินสิทธิ์</CardTitle>
          {rules.length > 0 && (
            <p className="mt-0.5 text-small text-ink-muted">{rules.length} กฎทั้งหมด</p>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          leadingIcon={<Plus size={14} aria-hidden />}
          onClick={() => setShowAddForm((v) => !v)}
          disabled={loading}
        >
          {showAddForm ? 'ยกเลิก' : 'เพิ่มกฎ'}
        </Button>
      </div>

      {showAddForm && (
        <RuleForm
          createdBy={userId ?? username ?? 'admin'}
          onSave={async (input, benefitKey) => {
            await handleAdd(input as EligibilityRuleInput, benefitKey!);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {loading ? (
        <p className="mt-4 text-small text-ink-muted">กำลังโหลด...</p>
      ) : (
        <div className="mt-4 space-y-3">
          {grouped.map(({ key, plan, rules: groupRules }) => {
            const isCollapsed = collapsed.has(key);
            return (
              <div key={key} className="rounded-md border border-hairline overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleCollapse(key)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 bg-canvas-soft hover:bg-canvas transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {isCollapsed ? (
                      <ChevronRight size={14} className="shrink-0 text-ink-muted" />
                    ) : (
                      <ChevronDown size={14} className="shrink-0 text-ink-muted" />
                    )}
                    <div className="min-w-0">
                      <span className="font-semibold text-ink text-body">{plan.th}</span>
                      <span className="ml-2 text-small text-ink-muted">({plan.code})</span>
                    </div>
                  </div>
                  <span className="shrink-0 inline-flex items-center rounded-full bg-surface border border-hairline px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
                    {groupRules.length} กฎ
                  </span>
                </button>

                {!isCollapsed &&
                  (() => {
                    if (groupRules.length === 0)
                      return (
                        <div className="flex items-center gap-2 px-4 py-4 text-small text-ink-muted">
                          <ShieldCheck size={16} className="text-ink-faint" aria-hidden />
                          ยังไม่มีกฎสำหรับ benefit นี้
                        </div>
                      );
                    const isExpanded = expandedGroups.has(key);
                    const visible = isExpanded ? groupRules : groupRules.slice(0, PREVIEW_ROWS);
                    const hidden = groupRules.length - PREVIEW_ROWS;
                    return (
                      <div className="divide-y divide-hairline">
                        {visible.map((rule) =>
                          editTarget?.id === rule.id ? (
                            <div
                              key={rule.id}
                              className="px-4 py-3 bg-accent/5 border-l-4 border-accent"
                            >
                              <RuleForm
                                initialRule={rule}
                                createdBy={userId ?? username ?? 'admin'}
                                onSave={async (input) => {
                                  await handleUpdate(input);
                                }}
                                onCancel={() => setEditTarget(null)}
                              />
                            </div>
                          ) : (
                            <div key={rule.id}>
                              <RuleRow
                                rule={rule}
                                onEdit={() => setEditTarget(rule)}
                                onDelete={() => setDeleteTarget(rule)}
                                onHistory={() => handleHistory(rule)}
                              />
                              {historyTarget?.id === rule.id && (
                                <div className="px-4 py-3 bg-canvas-soft border-l-4 border-accent/30 text-small">
                                  {historyLoading ? (
                                    <span className="text-ink-muted">กำลังโหลดประวัติ...</span>
                                  ) : historyData.length === 0 ? (
                                    <span className="text-ink-muted">ไม่มีประวัติ</span>
                                  ) : (
                                    <div className="space-y-1">
                                      {historyData.map((h) => (
                                        <div key={h.id} className="flex items-center gap-4">
                                          <span className="text-ink-muted tabular-nums">
                                            {new Date(h.effective_from).toLocaleDateString(
                                              'th-TH',
                                              { day: '2-digit', month: 'short', year: 'numeric' },
                                            )}
                                          </span>
                                          <span className="font-semibold text-ink tabular-nums">
                                            ฿{(h.entitlement_amount ?? 0).toLocaleString('th-TH')}
                                          </span>
                                          {h.effective_to && (
                                            <span className="text-[11px] text-ink-faint">
                                              (ยกเลิก)
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ),
                        )}
                        {groupRules.length > PREVIEW_ROWS && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(key)}
                            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-small font-medium text-accent hover:bg-canvas-soft transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                ยุบ <ChevronDown size={13} />
                              </>
                            ) : (
                              <>
                                ดูทั้งหมด (+{hidden} กฎ) <ChevronRight size={13} />
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })()}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete modal */}
      <Modal
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="ยืนยันการลบกฎสิทธิ์"
      >
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-body text-ink">
              ต้องการลบกฎ{' '}
              <span className="font-semibold">
                {BENEFIT_PLAN_LABELS[deleteTarget.benefit_key as BenefitKey]?.th ??
                  deleteTarget.benefit_key}
                {' / '}
                {deleteTarget.rule_name ?? deleteTarget.policy_profile ?? '-'}
                {' / '}
                {egLabel(deleteTarget.employee_group ?? '')}
                {deleteTarget.pg_from != null
                  ? ` PG ${deleteTarget.pg_from}–${deleteTarget.pg_to}`
                  : ''}
              </span>{' '}
              (฿{(deleteTarget.entitlement_amount ?? 0).toLocaleString('th-TH')}) ใช่หรือไม่?
            </p>
            <p className="text-small text-ink-muted">
              การลบจะตั้งค่า effective_to เป็นวันนี้ (soft-delete)
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                ยกเลิก
              </Button>
              <Button variant="danger" onClick={handleDelete} loading={deleting}>
                ลบกฎ
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}

// ── RuleRow ──────────────────────────────────────────────────────────────────

function RuleRow({
  rule,
  onEdit,
  onDelete,
  onHistory,
}: {
  rule: EligibilityRule;
  onEdit: () => void;
  onDelete: () => void;
  onHistory: () => void;
}) {
  return (
    <div className="hover:bg-canvas-soft/50 transition-colors group">
      <div className="flex items-start gap-4 px-4 py-3">
        <span
          className={`mt-0.5 shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${egColor(rule.employee_group ?? '')}`}
        >
          {rule.employee_group ?? '-'}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ink text-small">
              {rule.rule_name ?? rule.scope_value}
            </span>
            <span className="text-[11px] text-ink-muted tabular-nums">
              {rule.rule_id ?? rule.id}
            </span>
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusClass(rule.status)}`}
            >
              {rule.status ?? 'active'}
            </span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-small text-ink-muted">
              Plan:{' '}
              <span className="font-semibold text-ink">{rule.plan_id ?? rule.benefit_key}</span>
            </span>
            <span className="text-small text-ink-muted">
              Policy: <span className="font-semibold text-ink">{rule.policy_profile ?? '-'}</span>
            </span>
            <span className="text-small text-ink-muted">
              BU: <span className="font-semibold text-ink">{rule.business_unit ?? '-'}</span>
            </span>
            <span className="text-small text-ink-muted">
              Company:{' '}
              <span className="font-semibold text-ink">
                {rule.company_code ?? rule.company ?? '-'}
              </span>
            </span>
            {rule.employee_subgroup && (
              <span className="text-small text-ink-muted">
                Subgroup: <span className="font-semibold text-ink">{rule.employee_subgroup}</span>
              </span>
            )}
            {rule.job_code && (
              <span className="text-small text-ink-muted">
                Job: <span className="font-semibold text-ink">{rule.job_code}</span>
              </span>
            )}
            {rule.pg_from != null && (
              <span className="text-small text-ink-muted">
                PG:{' '}
                <span className="font-semibold text-ink tabular-nums">
                  {rule.pg_from}–{rule.pg_to}
                </span>
              </span>
            )}
            <span className="text-small text-ink-muted">
              Effective:{' '}
              <span className="font-semibold text-ink">
                {effectiveTypeLabel(rule.effective_type ?? rule.plan_effective)}
              </span>
            </span>
            {rule.waiting_period_days != null && rule.waiting_period_days > 0 && (
              <span className="text-small text-ink-muted">
                Wait:{' '}
                <span className="font-semibold text-ink tabular-nums">
                  {rule.waiting_period_days} days
                </span>
              </span>
            )}
            {rule.dvt_project && (
              <span className="text-small text-ink-muted">
                DVTProject: <span className="font-semibold text-ink">{rule.dvt_project}</span>
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-[18px] font-bold text-ink tabular-nums">
            ฿{(rule.entitlement_amount ?? 0).toLocaleString('th-TH')}
          </div>
          <div className="text-[11px] text-ink-muted tabular-nums">
            {rule.claim_period ?? 'annual'}
          </div>
          {rule.max_per_claim != null && (
            <div className="text-[11px] text-ink-muted tabular-nums">
              ต่อครั้ง ฿{rule.max_per_claim.toLocaleString('th-TH')}
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button
            type="button"
            aria-label="ดูประวัติ"
            onClick={onHistory}
            className="inline-flex items-center justify-center rounded p-1 text-ink-muted hover:bg-canvas-soft hover:text-ink transition-colors"
          >
            <Clock size={13} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="แก้ไข"
            onClick={onEdit}
            className="inline-flex items-center justify-center rounded p-1 text-ink-muted hover:bg-accent/10 hover:text-accent transition-colors"
          >
            <Pencil size={13} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="ลบ"
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded p-1 text-ink-muted hover:bg-danger/10 hover:text-danger transition-colors"
          >
            <Trash2 size={13} aria-hidden />
          </button>
        </div>
      </div>
      {rule.additional_condition && (
        <p className="mt-0.5 text-[11px] text-ink-muted pl-9 pb-2">{rule.additional_condition}</p>
      )}
    </div>
  );
}

// ── RuleForm (add + edit) ─────────────────────────────────────────────────────

interface RuleFormProps {
  initialRule?: EligibilityRule;
  createdBy: string;
  onSave: (input: Partial<EligibilityRuleInput>, benefitKey?: string) => Promise<void>;
  onCancel: () => void;
}

function RuleForm({ initialRule, createdBy, onSave, onCancel }: RuleFormProps) {
  const { toast } = useToast();
  const isEdit = !!initialRule;

  const [benefitKey, setBenefitKey] = useState<BenefitKey>(
    (initialRule?.benefit_key as BenefitKey) ?? 'medical-reimbursement',
  );
  const [ruleId, setRuleId] = useState(initialRule?.rule_id ?? initialRule?.id ?? '');
  const [ruleName, setRuleName] = useState(initialRule?.rule_name ?? '');
  const [planId, setPlanId] = useState(
    initialRule?.plan_id ?? BENEFIT_PLAN_LABELS['medical-reimbursement'].code,
  );
  const [status, setStatus] = useState<NonNullable<EligibilityRule['status']>>(
    initialRule?.status ?? 'active',
  );
  const [effectiveFrom, setEffectiveFrom] = useState(initialRule?.effective_from ?? '2026-01-01');
  const [effectiveTo, setEffectiveTo] = useState(initialRule?.effective_to ?? '');
  const [policyProfile, setPolicyProfile] = useState(initialRule?.policy_profile ?? 'CPN');
  const [businessUnit, setBusinessUnit] = useState(initialRule?.business_unit ?? 'CG-HQ');
  const [companyCode, setCompanyCode] = useState(
    initialRule?.company_code ?? initialRule?.company ?? 'CG',
  );
  const [jobCode, setJobCode] = useState(initialRule?.job_code ?? '');
  const [employeeGroup, setEmployeeGroup] = useState(initialRule?.employee_group ?? 'A');
  const [employeeSubgroup, setEmployeeSubgroup] = useState(initialRule?.employee_subgroup ?? 'ALL');
  const [dvtProject, setDvtProject] = useState(initialRule?.dvt_project ?? '');
  const [pgFrom, setPgFrom] = useState(initialRule?.pg_from?.toString() ?? '');
  const [pgTo, setPgTo] = useState(initialRule?.pg_to?.toString() ?? '');
  const [effectiveType, setEffectiveType] = useState<
    NonNullable<EligibilityRule['effective_type']>
  >(
    initialRule?.effective_type ??
      (initialRule?.plan_effective as NonNullable<EligibilityRule['effective_type']>) ??
      'hire_date',
  );
  const [waitingPeriodDays, setWaitingPeriodDays] = useState(
    initialRule?.waiting_period_days?.toString() ?? '',
  );
  const [hiringDateFrom, setHiringDateFrom] = useState(
    initialRule?.hiring_date_from ?? '1900-01-01',
  );
  const [hiringDateTo, setHiringDateTo] = useState(initialRule?.hiring_date_to ?? '9999-12-31');
  const [claimPeriod, setClaimPeriod] = useState(initialRule?.claim_period ?? 'annual');
  const [entitlementAmt, setEntitlementAmt] = useState(
    initialRule?.entitlement_amount?.toString() ?? '',
  );
  const [maxPerClaim, setMaxPerClaim] = useState(initialRule?.max_per_claim?.toString() ?? '');
  const [additionalCondition, setAdditionalCondition] = useState(
    initialRule?.additional_condition ?? '',
  );
  const [saving, setSaving] = useState(false);

  const handleBenefitChange = (next: BenefitKey) => {
    setBenefitKey(next);
    setPlanId(BENEFIT_PLAN_LABELS[next].code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) {
      toast('warning', 'กรุณาระบุ Rule Name');
      return;
    }
    if (!entitlementAmt || Number(entitlementAmt) <= 0) {
      toast('warning', 'กรุณาระบุวงเงินเบิกต่อปี');
      return;
    }
    if (pgFrom && pgTo && Number(pgFrom) > Number(pgTo)) {
      toast('warning', 'PG From ต้องน้อยกว่าหรือเท่ากับ PG To');
      return;
    }
    if (businessUnit === 'DVT' && !dvtProject.trim()) {
      toast('warning', 'กรุณาระบุ DVTProject สำหรับ Business Unit DVT');
      return;
    }
    setSaving(true);
    try {
      const pg_from = pgFrom ? parseInt(pgFrom, 10) : null;
      const pg_to = pgTo ? parseInt(pgTo, 10) : null;
      const annualLimit = parseInt(entitlementAmt, 10);
      const payload: Partial<EligibilityRuleInput> = {
        scope_type: 'entitlement',
        scope_value: `${planId}:${policyProfile}:${businessUnit}:${employeeGroup}:${pg_from ?? 'any'}-${pg_to ?? 'any'}`,
        allow: status !== 'inactive',
        created_by: createdBy,
        effective_from: effectiveFrom || new Date().toISOString().slice(0, 10),
        effective_to: effectiveTo || null,
        rule_id: ruleId.trim() || null,
        rule_name: ruleName.trim(),
        plan_id: planId.trim() || null,
        status,
        policy_profile: policyProfile,
        business_unit: businessUnit,
        company: companyCode || null,
        company_code: companyCode || null,
        job_code: jobCode || null,
        employee_group: employeeGroup,
        employee_subgroup: employeeSubgroup || null,
        dvt_project: dvtProject || null,
        pg_from,
        pg_to,
        plan_effective: effectiveType,
        effective_type: effectiveType,
        waiting_period_days: waitingPeriodDays ? parseInt(waitingPeriodDays, 10) : null,
        hiring_date_from: hiringDateFrom || '1900-01-01',
        hiring_date_to: hiringDateTo || '9999-12-31',
        claim_period: claimPeriod || null,
        entitlement_amount: annualLimit,
        max_per_year: annualLimit,
        max_per_claim: maxPerClaim ? parseInt(maxPerClaim, 10) : null,
        additional_condition: additionalCondition || null,
      };
      await onSave(payload, isEdit ? undefined : benefitKey);
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'rounded-md border border-hairline bg-surface px-3 py-2 text-small text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50';
  const labelCls = 'text-small font-medium text-ink';

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-md border border-accent/30 bg-accent/5 p-4 space-y-4"
      aria-label={isEdit ? 'แก้ไขกฎวงเงินสิทธิ์' : 'เพิ่มกฎวงเงินสิทธิ์'}
    >
      <p className="text-small font-semibold text-ink">
        {isEdit ? 'แก้ไขกฎวงเงินสิทธิ์' : 'เพิ่มกฎวงเงินสิทธิ์ใหม่'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!isEdit && (
          <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
            <label className={labelCls}>
              Benefit Plan <span className="text-danger ml-0.5">*</span>
            </label>
            <select
              value={benefitKey}
              onChange={(e) => handleBenefitChange(e.target.value as BenefitKey)}
              disabled={saving}
              className={inputCls}
            >
              {ALL_BENEFIT_KEYS.map((k) => (
                <option key={k} value={k}>
                  {BENEFIT_PLAN_LABELS[k].th} ({BENEFIT_PLAN_LABELS[k].code})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Rule ID</label>
          <input
            type="text"
            value={ruleId}
            onChange={(e) => setRuleId(e.target.value)}
            disabled={saving}
            placeholder="Auto if blank"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>
            Rule Name <span className="text-danger ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            disabled={saving}
            placeholder="เช่น Medical annual entitlement"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Plan ID</label>
          <input
            type="text"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            disabled={saving}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as NonNullable<EligibilityRule['status']>)}
            disabled={saving}
            className={inputCls}
          >
            {RULE_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Effective From</label>
          <input
            type="date"
            value={effectiveFrom}
            onChange={(e) => setEffectiveFrom(e.target.value)}
            disabled={saving}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Effective To</label>
          <input
            type="date"
            value={effectiveTo}
            onChange={(e) => setEffectiveTo(e.target.value)}
            disabled={saving}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>
            Policy Profile <span className="text-danger ml-0.5">*</span>
          </label>
          <select
            value={policyProfile}
            onChange={(e) => setPolicyProfile(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {POLICY_PROFILES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Business Unit</label>
          <select
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {BUSINESS_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Company Code</label>
          <select
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {COMPANY_CODES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Job Code</label>
          <input
            type="text"
            value={jobCode}
            onChange={(e) => setJobCode(e.target.value)}
            disabled={saving}
            placeholder="เช่น SE-01"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>
            กลุ่มพนักงาน <span className="text-danger ml-0.5">*</span>
          </label>
          <select
            value={employeeGroup}
            onChange={(e) => setEmployeeGroup(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {EMPLOYEE_GROUPS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Employee Subgroup</label>
          <select
            value={employeeSubgroup}
            onChange={(e) => setEmployeeSubgroup(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {EMPLOYEE_SUBGROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {businessUnit === 'DVT' && (
          <div className="flex flex-col gap-1">
            <label className={labelCls}>
              DVTProject <span className="text-danger ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={dvtProject}
              onChange={(e) => setDvtProject(e.target.value)}
              disabled={saving}
              placeholder="เช่น DVT-2026-A"
              className={inputCls}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Effective Type</label>
          <select
            value={effectiveType}
            onChange={(e) =>
              setEffectiveType(e.target.value as NonNullable<EligibilityRule['effective_type']>)
            }
            disabled={saving}
            className={inputCls}
          >
            {EFFECTIVE_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Waiting Period (days)</label>
          <input
            type="number"
            min={0}
            value={waitingPeriodDays}
            onChange={(e) => setWaitingPeriodDays(e.target.value)}
            disabled={saving}
            placeholder="เช่น 30"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>PG From</label>
          <input
            type="number"
            min={1}
            max={99}
            value={pgFrom}
            onChange={(e) => setPgFrom(e.target.value)}
            disabled={saving}
            placeholder="เช่น 17"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>PG To</label>
          <input
            type="number"
            min={1}
            max={99}
            value={pgTo}
            onChange={(e) => setPgTo(e.target.value)}
            disabled={saving}
            placeholder="เช่น 20"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hiring Date From</label>
          <input
            type="date"
            value={hiringDateFrom}
            onChange={(e) => setHiringDateFrom(e.target.value)}
            disabled={saving}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hiring Date To</label>
          <input
            type="date"
            value={hiringDateTo}
            onChange={(e) => setHiringDateTo(e.target.value)}
            disabled={saving}
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Claim Period</label>
          <select
            value={claimPeriod}
            onChange={(e) => setClaimPeriod(e.target.value)}
            disabled={saving}
            className={inputCls}
          >
            {CLAIM_PERIODS.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>
            Entitlement Amount (THB) <span className="text-danger ml-0.5">*</span>
          </label>
          <input
            type="number"
            min={0}
            value={entitlementAmt}
            onChange={(e) => setEntitlementAmt(e.target.value)}
            disabled={saving}
            placeholder="เช่น 70000"
            className={`${inputCls} font-semibold`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={labelCls}>Maximum Amount per Claim (THB)</label>
          <input
            type="number"
            min={0}
            value={maxPerClaim}
            onChange={(e) => setMaxPerClaim(e.target.value)}
            disabled={saving}
            placeholder="ไม่จำกัด"
            className={inputCls}
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
          <label className={labelCls}>Additional Condition</label>
          <textarea
            rows={2}
            value={additionalCondition}
            onChange={(e) => setAdditionalCondition(e.target.value)}
            disabled={saving}
            placeholder="เงื่อนไขเพิ่มเติม (ถ้ามี)"
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-hairline-soft">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={saving}>
          ยกเลิก
        </Button>
        <Button type="submit" variant="primary" size="sm" loading={saving}>
          {isEdit ? 'บันทึกการแก้ไข' : 'บันทึกกฎ'}
        </Button>
      </div>
    </form>
  );
}

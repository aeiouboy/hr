'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Trash2, Plus, ShieldCheck } from 'lucide-react';

import { Card, CardEyebrow, CardTitle, Button, Toggle, Modal } from '@/components/humi';
import { useToast } from '@/components/ui/toast';
import { useAuthStore } from '@/stores/auth-store';
import {
  listEligibilityRules,
  addEligibilityRule,
  deleteEligibilityRule,
  getBenefitDefinition,
  setEligibilityEnabled,
  type EligibilityRule,
  type EligibilityRuleInput,
  type BenefitDefinition,
} from '@/lib/workflow-api';

// ── Constants ──────────────────────────────────────────────────────────────

const BENEFIT_DISPLAY_NAMES: Record<string, string> = {
  'medical-reimbursement': 'Medical Reimbursement / ค่ารักษาพยาบาล',
  'training': 'Training / ค่าฝึกอบรม',
  'travel-allowance': 'Travel Allowance / ค่าเดินทาง',
  'fuel-allowance': 'Fuel Allowance / ค่าน้ำมัน',
};

const POLICY_PROFILES = ['CPN', 'RIS', 'CRC', 'CPFM', 'CPN-FOOD'] as const;

const EMPLOYEE_GROUPS = [
  { value: 'A', label: 'A - Permanent (A)' },
  { value: 'B', label: 'B - Contract (B)' },
  { value: 'C', label: 'C - Outsource (C)' },
  { value: 'D', label: 'D - Probation (D)' },
] as const;

const PLAN_EFFECTIVE_OPTIONS = [
  { value: 'hire_date', label: 'วันที่เริ่มงาน (Hire Date)' },
  { value: 'specific_date', label: 'วันที่กำหนด (Specific Date)' },
] as const;

// ── Page ──────────────────────────────────────────────────────────────────

export default function EligibilityAdminPage() {
  const params = useParams<{ benefitKey: string; locale: string }>();
  const benefitKey = params?.benefitKey ?? '';
  const locale = params?.locale ?? 'th';
  const router = useRouter();
  const { toast } = useToast();

  const userId = useAuthStore((s) => s.userId);
  const username = useAuthStore((s) => s.username);

  const [definition, setDefinition] = useState<BenefitDefinition | null>(null);
  const [rules, setRules] = useState<EligibilityRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingToggle, setSavingToggle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EligibilityRule | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [def, ruleList] = await Promise.all([
        getBenefitDefinition(benefitKey),
        listEligibilityRules(benefitKey),
      ]);
      setDefinition(def);
      setRules(ruleList);
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'โหลดข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  }, [benefitKey, toast]);

  useEffect(() => {
    if (benefitKey) void fetchAll();
  }, [benefitKey, fetchAll]);

  const handleToggleEnabled = async (next: boolean) => {
    if (!definition) return;
    setSavingToggle(true);
    try {
      await setEligibilityEnabled(benefitKey, next);
      setDefinition((d) => d ? { ...d, eligibility_enabled: next } : d);
      toast('success', next ? 'เปิดใช้งานระบบสิทธิ์แล้ว' : 'ปิดการใช้งานระบบสิทธิ์แล้ว');
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'บันทึกไม่สำเร็จ');
    } finally {
      setSavingToggle(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteEligibilityRule(benefitKey, deleteTarget.id);
      setRules((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      toast('success', 'ลบกฎสิทธิ์เรียบร้อย');
      setDeleteTarget(null);
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'ลบไม่สำเร็จ');
    } finally {
      setDeleting(false);
    }
  };

  const handleAdd = async (input: EligibilityRuleInput) => {
    const newRule = await addEligibilityRule(benefitKey, input);
    setRules((prev) => [...prev, newRule]);
    toast('success', 'เพิ่มกฎสิทธิ์เรียบร้อย');
  };

  const displayName =
    definition?.display_name ??
    BENEFIT_DISPLAY_NAMES[benefitKey] ??
    benefitKey;

  const entitlementRules = rules.filter((r) => r.scope_type === 'entitlement' && !r.effective_to);
  const lastUpdated =
    entitlementRules.length > 0
      ? new Date(
          Math.max(...entitlementRules.map((r) => new Date(r.effective_from).getTime())),
        ).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })
      : '-';

  if (loading) {
    return (
      <div className="space-y-6">
        <Breadcrumb locale={locale} benefitKey={benefitKey} displayName="..." />
        <p className="text-small text-ink-muted">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb locale={locale} benefitKey={benefitKey} displayName={displayName} />

      {/* Header + toggle */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>ตั้งค่าสิทธิ์การเบิก</CardEyebrow>
          <h1 className="font-display text-[28px] font-semibold text-ink">{displayName}</h1>
          <p className="mt-1 text-small text-ink-muted">
            นโยบายเริ่มต้น:{' '}
            <span className="font-medium text-ink">
              {definition?.default_policy === 'allow' ? 'อนุญาต' : 'ไม่อนุญาต'}
            </span>
          </p>
        </div>
        <div className="shrink-0">
          <Toggle
            checked={definition?.eligibility_enabled ?? false}
            onChange={handleToggleEnabled}
            disabled={savingToggle}
            label="เปิดใช้ระบบสิทธิ์ขั้นสูง"
            description="เมื่อปิด ใช้นโยบายเริ่มต้นของ benefit นี้"
          />
        </div>
      </header>

      {/* Summary chips */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryChip label="นโยบายเริ่มต้น" value={definition?.default_policy === 'allow' ? 'อนุญาต' : 'ไม่อนุญาต'} />
        <SummaryChip label="กฎที่ใช้งานอยู่" value={String(entitlementRules.length)} />
        <SummaryChip label="อัปเดตล่าสุด" value={lastUpdated} />
      </div>

      {/* Entitlement rules table */}
      <Card variant="raised" size="lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardEyebrow>CG-BE Entitlement Amount</CardEyebrow>
            <CardTitle>กฎวงเงินสิทธิ์ตาม SF</CardTitle>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leadingIcon={<Plus size={14} aria-hidden />}
            onClick={() => setShowForm((v) => !v)}
            disabled={loading}
          >
            {showForm ? 'ยกเลิก' : 'เพิ่มกฎ'}
          </Button>
        </div>

        {entitlementRules.length === 0 && !showForm ? (
          <div className="mt-4 rounded-md border border-dashed border-hairline px-4 py-8 text-center" role="status">
            <ShieldCheck size={24} className="mx-auto mb-2 text-ink-faint" aria-hidden />
            <p className="text-small text-ink-muted">ยังไม่มีกฎวงเงินสิทธิ์</p>
          </div>
        ) : entitlementRules.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-small">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">Policy Profile</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">กลุ่มพนักงาน</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">ระดับ PG</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">Plan Effective</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">วงเงินเบิกต่อปี (THB)</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">วงเงินต่อครั้ง (THB)</th>
                  <th className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">วันที่มีผล</th>
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody>
                {entitlementRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-hairline last:border-0">
                    <td className="whitespace-nowrap px-3 py-2 font-medium text-ink">
                      {rule.policy_profile ?? '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink-soft">
                      {rule.employee_group ? EMPLOYEE_GROUPS.find((g) => g.value === rule.employee_group)?.label ?? rule.employee_group : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink-soft tabular-nums">
                      {rule.pg_from != null && rule.pg_to != null ? `${rule.pg_from} – ${rule.pg_to}` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink-soft">
                      {rule.plan_effective === 'hire_date' ? 'วันที่เริ่มงาน' : 'วันที่กำหนด'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink font-semibold tabular-nums">
                      {rule.entitlement_amount != null ? `฿${rule.entitlement_amount.toLocaleString('th-TH')}` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink-soft tabular-nums">
                      {rule.max_per_claim != null ? `฿${rule.max_per_claim.toLocaleString('th-TH')}` : '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-ink-soft">
                      {new Date(rule.effective_from).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <button
                        type="button"
                        aria-label={`ลบกฎ ${rule.policy_profile ?? ''} ${rule.employee_group ?? ''}`}
                        onClick={() => setDeleteTarget(rule)}
                        className="inline-flex items-center justify-center rounded p-1 text-ink-muted hover:bg-danger/10 hover:text-danger transition-colors"
                      >
                        <Trash2 size={14} aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {showForm && (
          <AddEntitlementForm
            createdBy={userId ?? username ?? 'admin'}
            onAdd={async (input) => {
              await handleAdd(input);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </Card>

      {/* Delete confirm modal */}
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
                {deleteTarget.policy_profile ?? '-'} / {deleteTarget.employee_group ?? '-'} PG {deleteTarget.pg_from}–{deleteTarget.pg_to}
              </span>
              {' '}(฿{(deleteTarget.entitlement_amount ?? 0).toLocaleString('th-TH')}) ใช่หรือไม่?
            </p>
            <p className="text-small text-ink-muted">การลบจะตั้งค่า effective_to เป็นวันนี้ (soft-delete)</p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>ยกเลิก</Button>
              <Button variant="danger" onClick={handleDelete} loading={deleting}>ลบกฎ</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function Breadcrumb({ locale, benefitKey: _benefitKey, displayName }: { locale: string; benefitKey: string; displayName: string }) {
  const router = useRouter();
  return (
    <nav className="flex items-center gap-2 text-small text-ink-muted" aria-label="breadcrumb">
      <button type="button" onClick={() => router.push(`/${locale}/admin`)} className="hover:text-ink transition-colors">Admin</button>
      <span aria-hidden>/</span>
      <button type="button" onClick={() => router.push(`/${locale}/admin/benefits`)} className="hover:text-ink transition-colors">Benefits</button>
      <span aria-hidden>/</span>
      <button type="button" onClick={() => router.push(`/${locale}/admin/benefits/rules`)} className="hover:text-ink transition-colors">Rules</button>
      <span aria-hidden>/</span>
      <span className="font-medium text-ink">{displayName}</span>
    </nav>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <Card variant="raised" size="md">
      <CardEyebrow>{label}</CardEyebrow>
      <p className="mt-1 font-display text-[22px] font-semibold text-ink tabular-nums">{value}</p>
    </Card>
  );
}

// ── AddEntitlementForm ────────────────────────────────────────────────────────

interface AddEntitlementFormProps {
  createdBy: string;
  onAdd: (input: EligibilityRuleInput) => Promise<void>;
  onCancel: () => void;
}

function AddEntitlementForm({ createdBy, onAdd, onCancel }: AddEntitlementFormProps) {
  const { toast } = useToast();
  const [policyProfile, setPolicyProfile] = useState('CPN');
  const [employeeGroup, setEmployeeGroup] = useState('A');
  const [pgFrom, setPgFrom] = useState('');
  const [pgTo, setPgTo] = useState('');
  const [planEffective, setPlanEffective] = useState<'hire_date' | 'specific_date'>('hire_date');
  const [noOfYears, setNoOfYears] = useState('');
  const [hiringDateFrom, setHiringDateFrom] = useState('1900-01-01');
  const [hiringDateTo, setHiringDateTo] = useState('9999-12-31');
  const [entitlementAmount, setEntitlementAmount] = useState('');
  const [maxPerClaim, setMaxPerClaim] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entitlementAmount || Number(entitlementAmount) <= 0) {
      toast('warning', 'กรุณาระบุวงเงินเบิกต่อปี');
      return;
    }
    if (pgFrom && pgTo && Number(pgFrom) > Number(pgTo)) {
      toast('warning', 'ระดับ PG From ต้องน้อยกว่าหรือเท่ากับ PG To');
      return;
    }
    setSaving(true);
    try {
      const pg_from = pgFrom ? parseInt(pgFrom, 10) : null;
      const pg_to = pgTo ? parseInt(pgTo, 10) : null;
      const scopeValue = `${policyProfile}:${employeeGroup}:${pg_from ?? 'any'}-${pg_to ?? 'any'}`;
      await onAdd({
        scope_type: 'entitlement',
        scope_value: scopeValue,
        allow: true,
        created_by: createdBy,
        policy_profile: policyProfile,
        employee_group: employeeGroup,
        pg_from,
        pg_to,
        plan_effective: planEffective,
        no_of_years_from_hiring: noOfYears ? parseInt(noOfYears, 10) : null,
        hiring_date_from: hiringDateFrom || '1900-01-01',
        hiring_date_to: hiringDateTo || '9999-12-31',
        entitlement_amount: parseInt(entitlementAmount, 10),
        max_per_claim: maxPerClaim ? parseInt(maxPerClaim, 10) : null,
      });
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'บันทึกไม่สำเร็จ');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'rounded-md border border-hairline bg-surface px-3 py-2 text-small text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50';
  const labelCls = 'text-small font-medium text-ink';

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-md border border-hairline bg-canvas-soft p-4 space-y-4" aria-label="เพิ่มกฎวงเงินสิทธิ์">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Policy Profile */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Policy Profile <span className="text-danger ml-0.5">*</span></label>
          <select value={policyProfile} onChange={(e) => setPolicyProfile(e.target.value)} disabled={saving} className={inputCls}>
            {POLICY_PROFILES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Employee Group */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>กลุ่มพนักงาน <span className="text-danger ml-0.5">*</span></label>
          <select value={employeeGroup} onChange={(e) => setEmployeeGroup(e.target.value)} disabled={saving} className={inputCls}>
            {EMPLOYEE_GROUPS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </div>

        {/* Plan Effective */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Plan Effective</label>
          <select value={planEffective} onChange={(e) => setPlanEffective(e.target.value as 'hire_date' | 'specific_date')} disabled={saving} className={inputCls}>
            {PLAN_EFFECTIVE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* PG From */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>ระดับ PG From</label>
          <input type="number" min={1} max={99} value={pgFrom} onChange={(e) => setPgFrom(e.target.value)} disabled={saving} placeholder="เช่น 17" className={inputCls} />
        </div>

        {/* PG To */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>ระดับ PG To</label>
          <input type="number" min={1} max={99} value={pgTo} onChange={(e) => setPgTo(e.target.value)} disabled={saving} placeholder="เช่น 20" className={inputCls} />
        </div>

        {/* No. of Years (conditional) */}
        {planEffective === 'specific_date' && (
          <div className="flex flex-col gap-1">
            <label className={labelCls}>จำนวนปีนับจากวันเริ่มงาน</label>
            <input type="number" min={0} value={noOfYears} onChange={(e) => setNoOfYears(e.target.value)} disabled={saving} placeholder="เช่น 1" className={inputCls} />
          </div>
        )}

        {/* Entitlement Amount */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>วงเงินเบิกต่อปี (THB) <span className="text-danger ml-0.5">*</span></label>
          <input type="number" min={0} value={entitlementAmount} onChange={(e) => setEntitlementAmount(e.target.value)} disabled={saving} placeholder="เช่น 70000" className={inputCls} />
        </div>

        {/* Max per Claim */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>วงเงินต่อครั้ง (THB)</label>
          <input type="number" min={0} value={maxPerClaim} onChange={(e) => setMaxPerClaim(e.target.value)} disabled={saving} placeholder="ไม่จำกัด" className={inputCls} />
        </div>

        {/* Hiring Date From */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hiring Date From</label>
          <input type="date" value={hiringDateFrom} onChange={(e) => setHiringDateFrom(e.target.value)} disabled={saving} className={inputCls} />
        </div>

        {/* Hiring Date To */}
        <div className="flex flex-col gap-1">
          <label className={labelCls}>Hiring Date To</label>
          <input type="date" value={hiringDateTo} onChange={(e) => setHiringDateTo(e.target.value)} disabled={saving} className={inputCls} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-hairline-soft">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={saving}>ยกเลิก</Button>
        <Button type="submit" variant="primary" size="sm" loading={saving}>บันทึกกฎ</Button>
      </div>
    </form>
  );
}

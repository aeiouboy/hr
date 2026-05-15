'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

// Benefits with DB-driven eligibility editor — matches rules/[benefitKey] pages
const ELIGIBILITY_MANAGED_BENEFIT_KEYS = new Set([
  'fuel-allowance',
  'medical-reimbursement',
  'training',
  'travel-allowance',
]);
import { Card, CardEyebrow, CardTitle, Button, DataTable, FormField, FormInput, Modal } from '@/components/humi';
import { updateBenefitPlan, createBenefitPlan } from '@/lib/workflow-api';
import { Capability } from '@/components/humi';
import { BENEFIT_PLAN_REGISTRY, type BenefitPlan, type PlanCategory, type RecordType, isV2Plan } from '@/data/benefits/plan-registry';
import { PlanConfiguratorShell, type PlanConfiguratorTab } from '@/components/benefits/PlanConfiguratorShell';
import { Tab1IdentityFields, type Tab1IdentityValues } from '@/components/benefits/Tab1IdentityFields';

// ── Plan catalog — CRUD-style mockup ─────────────────────────────────────────
// Reads all 28 plans from BENEFIT_PLAN_REGISTRY.
// Columns: id, ttt, name, category, recordType chip, template, annualLimitThb, approvalChain.
// Filters: category + recordType.
// "Edit Plan" opens Modal with mock form — no save.

const CATEGORY_LABELS_TH: Record<PlanCategory, string> = {
  medical:     'การรักษาพยาบาล',
  dental:      'ทันตกรรม',
  physical:    'กายภาพ',
  gasoline:    'น้ำมันรถ',
  toll:        'ทางด่วน',
  parking:     'ที่จอดรถ',
  life:        'ชีวิต',
  gift:        'ของขวัญ',
  funeral:     'ฌาปนกิจ',
  wreath:      'พวงหรีด',
  beneficiary: 'ผู้รับผลประโยชน์',
  lifecycle:   'วงจรสวัสดิการ',
};

const CATEGORY_LABELS_EN: Record<PlanCategory, string> = {
  medical:     'Medical',
  dental:      'Dental',
  physical:    'Physical',
  gasoline:    'Gasoline',
  toll:        'Toll',
  parking:     'Parking',
  life:        'Life',
  gift:        'Gift',
  funeral:     'Funeral',
  wreath:      'Wreath',
  beneficiary: 'Beneficiary',
  lifecycle:   'Lifecycle',
};

const RECORD_TYPE_CHIP: Record<RecordType, { label: string; labelTh: string; className: string }> = {
  records:  { label: 'Records',  labelTh: 'บันทึก',  className: 'bg-canvas-soft text-ink-muted border border-hairline' },
  info:     { label: 'Info',     labelTh: 'ข้อมูล',  className: 'bg-accent-soft text-accent border border-accent/30' },
  claimable:{ label: 'Claimable',labelTh: 'เบิกได้', className: 'bg-success-soft text-success border border-success/30' },
};

const TEMPLATE_LABELS: Record<string, string> = {
  'simple-claim':      'simple-claim',
  'hospital-claim':    'hospital-claim',
  'records-flat':      'records-flat',
  'records-dependent': 'records-dependent',
  'records-computed':  'records-computed',
  'lifecycle-admin':   'lifecycle-admin',
};

const ALL_CATEGORIES = ['all', ...Object.keys(CATEGORY_LABELS_EN)] as const;
const ALL_RECORD_TYPES = ['all', 'records', 'info', 'claimable'] as const;

type FilterCategory = typeof ALL_CATEGORIES[number];
type FilterRecordType = typeof ALL_RECORD_TYPES[number];

const selectClass =
  'h-10 rounded-[var(--radius-md)] border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas';

// ── ComingNextCard — placeholder for tabs 2-9 ─────────────────────────────
function ComingNextCard({ tabId, prNumber, isTh }: { tabId: string; prNumber: string; isTh: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-canvas-soft p-6 text-center">
      <p className="text-small text-ink-muted">
        {isTh ? `แท็บ "${tabId}" — กำลังพัฒนาใน ${prNumber}` : `Tab "${tabId}" — coming in ${prNumber}`}
      </p>
    </div>
  );
}

// ── Default Tab1 identity values for Edit ─────────────────────────────────
function editPlanDefaultIdentity(plan: BenefitPlan, isTh: boolean): Tab1IdentityValues {
  const prefix: Tab1IdentityValues['prefix'] =
    plan.recordType === 'records' ? 'records'
    : plan.recordType === 'info'   ? 'info'
    : 'none';
  return {
    ttt: plan.ttt,
    planKey: plan.id,
    nameTh: plan.nameTh,
    nameEn: plan.nameEn,
    prefix,
    category: plan.category,
    schemaVersion: (plan as { schemaVersion?: 'v1' | 'v2' }).schemaVersion ?? 'v2',
    template: plan.template,
    effectiveFrom: '',
    effectiveTo: '',
  };
}

// ── TABS definition shared by both modals ─────────────────────────────────
function buildTabs(
  tab1Panel: React.ReactNode,
  isTh: boolean,
): PlanConfiguratorTab[] {
  const placeholders: Array<{ id: string; labelTh: string; labelEn: string; pr: string }> = [
    { id: 'coverage',      labelTh: 'ความคุ้มครอง', labelEn: 'Coverage',      pr: 'PR-B' },
    { id: 'eligibility',   labelTh: 'คุณสมบัติ',    labelEn: 'Eligibility',   pr: 'PR-C' },
    { id: 'claim',         labelTh: 'เคลม',          labelEn: 'Claim',         pr: 'PR-D' },
    { id: 'form',          labelTh: 'แบบฟอร์ม',      labelEn: 'Form',          pr: 'PR-E' },
    { id: 'approval',      labelTh: 'อนุมัติ',       labelEn: 'Approval',      pr: 'PR-F' },
    { id: 'payroll',       labelTh: 'เงินเดือน',     labelEn: 'Payroll',       pr: 'PR-G' },
    { id: 'notifications', labelTh: 'แจ้งเตือน',     labelEn: 'Notifications', pr: 'PR-G' },
    { id: 'audit',         labelTh: 'ประวัติ',        labelEn: 'Audit',         pr: 'PR-H' },
  ];

  return [
    {
      id: 'identity',
      labelTh: 'ข้อมูลพื้นฐาน',
      labelEn: 'Identity',
      panel: tab1Panel,
    },
    ...placeholders.map((p) => ({
      id: p.id,
      labelTh: p.labelTh,
      labelEn: p.labelEn,
      panel: <ComingNextCard tabId={p.labelEn} prNumber={p.pr} isTh={isTh} />,
    })),
  ];
}

function EditPlanModal({
  plan,
  onClose,
  isTh,
  locale,
}: {
  plan: BenefitPlan;
  onClose: () => void;
  isTh: boolean;
  locale: string;
}) {
  const [tab1Values, setTab1Values] = useState<Tab1IdentityValues>(() =>
    editPlanDefaultIdentity(plan, isTh),
  );
  const [activeTab, setActiveTab] = useState('identity');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleTab1Change = <K extends keyof Tab1IdentityValues>(
    field: K,
    value: Tab1IdentityValues[K],
  ) => {
    setTab1Values((prev) => ({ ...prev, [field]: value }));
  };

  const tab1Panel = (
    <Tab1IdentityFields
      values={tab1Values}
      onChange={handleTab1Change}
      mode="edit"
      isTh={isTh}
    />
  );

  const tabs = buildTabs(tab1Panel, isTh);

  const handleSave = async () => {
    setSaving(true);
    try {
      console.log('[EditPlanModal] Tab1 values:', tab1Values);
      await updateBenefitPlan(plan.id, { display_name: tab1Values.nameTh });
      setSaved(true);
      setTimeout(onClose, 1200);
    } catch (err) {
      console.warn('[EditPlanModal] updateBenefitPlan failed:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={isTh ? `แก้ไขแผน: ${plan.id}` : `Edit plan: ${plan.id}`}
      widthClass="max-w-3xl"
    >
      <div className="space-y-4">
        <PlanConfiguratorShell
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isTh={isTh}
        />

        {/* Eligibility rule link (v2 plans only) */}
        {isV2Plan(plan) && plan.eligibility.eligibilityRuleId && (
          <div className="pt-2 border-t border-hairline">
            <p className="mb-2 text-small font-medium text-ink">
              {isTh ? 'กฎเงื่อนไขสิทธิ์' : 'Eligibility rule'}
            </p>
            <Link
              href={`/${locale}/admin/benefits/rules?rule=${encodeURIComponent(plan.eligibility.eligibilityRuleId)}`}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-accent-soft px-2 py-1 text-[length:var(--text-eyebrow)] font-mono font-semibold text-accent hover:bg-accent/10 transition-colors duration-[var(--dur-fast)]"
            >
              {plan.eligibility.eligibilityRuleId}
            </Link>
            {ELIGIBILITY_MANAGED_BENEFIT_KEYS.has(plan.id) && (
              <Link
                href={`/${locale}/admin/benefits/rules/${plan.id}`}
                className="ml-2 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-hairline bg-canvas px-2 py-1 text-[length:var(--text-eyebrow)] font-semibold text-ink hover:border-accent hover:text-accent transition-colors duration-[var(--dur-fast)]"
              >
                {isTh ? 'ตั้งค่าฐานข้อมูล →' : 'DB editor →'}
              </Link>
            )}
          </div>
        )}

        {saved && (
          <div role="status" className="rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
            {isTh ? 'บันทึกแล้ว' : 'Saved'}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
          <Button variant="ghost" onClick={onClose}>{isTh ? 'ยกเลิก' : 'Cancel'}</Button>
          <Capability action="edit" fallback={
            <Button variant="primary" disabled>{isTh ? 'บันทึก' : 'Save'}</Button>
          }>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? (isTh ? 'กำลังบันทึก…' : 'Saving…') : (isTh ? 'บันทึก' : 'Save')}
            </Button>
          </Capability>
        </div>
      </div>
    </Modal>
  );
}

function CreatePlanModal({
  onClose,
  isTh,
}: {
  onClose: () => void;
  isTh: boolean;
}) {
  const defaultTab1: Tab1IdentityValues = {
    ttt: '',
    planKey: '',
    nameTh: '',
    nameEn: '',
    prefix: 'none',
    category: 'medical',
    schemaVersion: 'v2',
    template: 'simple-claim',
    effectiveFrom: '',
    effectiveTo: '',
  };

  const [tab1Values, setTab1Values] = useState<Tab1IdentityValues>(defaultTab1);
  const [activeTab, setActiveTab] = useState('identity');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTab1Change = <K extends keyof Tab1IdentityValues>(
    field: K,
    value: Tab1IdentityValues[K],
  ) => {
    setTab1Values((prev) => ({ ...prev, [field]: value }));
  };

  // Derive recordType inline — no useEffect
  const derivedRecordType: RecordType =
    tab1Values.prefix === 'records' ? 'records'
    : tab1Values.prefix === 'info'   ? 'info'
    : 'claimable';

  const isValid = tab1Values.planKey.trim() && tab1Values.nameTh.trim() && tab1Values.nameEn.trim();

  const handleSave = async () => {
    if (!isValid) return;
    setSaving(true);
    setError(null);
    try {
      console.log('[CreatePlanModal] Tab1 values:', tab1Values);
      await createBenefitPlan({
        key: tab1Values.planKey.trim(),
        displayNameTh: tab1Values.nameTh.trim(),
        displayNameEn: tab1Values.nameEn.trim(),
        category: tab1Values.category,
        recordType: derivedRecordType,
        annualLimitThb: null,
        eligibilityRuleId: null,
      });
      setSaved(true);
      // Plans come from a static registry import — reload so the new plan appears in the table.
      setTimeout(() => {
        onClose();
        if (typeof window !== 'undefined') window.location.reload();
      }, 1200);
    } catch (err) {
      console.warn('[CreatePlanModal] createBenefitPlan failed:', err);
      setError(err instanceof Error ? err.message : 'Create failed');
    } finally {
      setSaving(false);
    }
  };

  const tab1Panel = (
    <Tab1IdentityFields
      values={tab1Values}
      onChange={handleTab1Change}
      mode="create"
      isTh={isTh}
    />
  );

  const tabs = buildTabs(tab1Panel, isTh);

  return (
    <Modal
      open
      onClose={onClose}
      title={isTh ? 'สร้างแผนสวัสดิการใหม่' : 'Create Benefit Plan'}
      widthClass="max-w-3xl"
    >
      <div className="space-y-4">
        <PlanConfiguratorShell
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isTh={isTh}
        />

        {saved && (
          <div role="status" className="rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
            {isTh ? 'สร้างแผนสำเร็จ' : 'Plan created'}
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-[var(--radius-md)] bg-error-soft p-3 text-small font-medium text-error">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-hairline">
          <Button variant="ghost" onClick={onClose}>{isTh ? 'ยกเลิก' : 'Cancel'}</Button>
          <Capability action="edit" fallback={
            <Button variant="primary" disabled>{isTh ? 'สร้างแผน' : 'Create Plan'}</Button>
          }>
            <Button variant="primary" onClick={handleSave} disabled={saving || !isValid}>
              {saving ? (isTh ? 'กำลังสร้าง…' : 'Creating…') : (isTh ? 'สร้างแผน' : 'Create Plan')}
            </Button>
          </Capability>
        </div>
      </div>
    </Modal>
  );
}

export default function BenefitPlansPage() {
  const t = useTranslations('admin_benefits_plans');
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [filterRecordType, setFilterRecordType] = useState<FilterRecordType>('all');
  const [editingPlan, setEditingPlan] = useState<BenefitPlan | null>(null);
  const [creatingPlan, setCreatingPlan] = useState(false);

  const filteredPlans = useMemo(() => {
    return BENEFIT_PLAN_REGISTRY.filter((p) => {
      if (filterCategory !== 'all' && p.category !== filterCategory) return false;
      if (filterRecordType !== 'all' && p.recordType !== filterRecordType) return false;
      return true;
    });
  }, [filterCategory, filterRecordType]);

  const columns = useMemo(() => [
    {
      id: 'id',
      header: t('colId'),
      cell: (p: BenefitPlan) => (
        <span className="font-mono text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink">
          {p.id}
        </span>
      ),
      sortAccessor: (p: BenefitPlan) => p.id,
      className: 'w-36',
    },
    {
      id: 'ttt',
      header: t('colTtt'),
      cell: (p: BenefitPlan) => (
        <span className="font-mono text-[length:var(--text-eyebrow)] text-ink-muted">{p.ttt}</span>
      ),
      sortAccessor: (p: BenefitPlan) => p.ttt,
      className: 'w-20',
    },
    {
      id: 'name',
      header: t('colName'),
      cell: (p: BenefitPlan) => (
        <span className="text-ink">{isTh ? p.nameTh : p.nameEn}</span>
      ),
      sortAccessor: (p: BenefitPlan) => (isTh ? p.nameTh : p.nameEn),
    },
    {
      id: 'category',
      header: t('colCategory'),
      cell: (p: BenefitPlan) => (
        <span className="text-small text-ink-muted">
          {isTh ? CATEGORY_LABELS_TH[p.category] : CATEGORY_LABELS_EN[p.category]}
        </span>
      ),
      sortAccessor: (p: BenefitPlan) => p.category,
      className: 'w-32',
    },
    {
      id: 'recordType',
      header: t('colRecordType'),
      cell: (p: BenefitPlan) => {
        const chip = RECORD_TYPE_CHIP[p.recordType];
        return (
          <span className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.1em] ${chip.className}`}>
            {isTh ? chip.labelTh : chip.label}
          </span>
        );
      },
      sortAccessor: (p: BenefitPlan) => p.recordType,
      className: 'w-28',
    },
    {
      id: 'template',
      header: t('colTemplate'),
      cell: (p: BenefitPlan) => (
        <span className="font-mono text-[length:var(--text-eyebrow)] text-ink-muted">
          {TEMPLATE_LABELS[p.template] ?? p.template}
        </span>
      ),
      sortAccessor: (p: BenefitPlan) => p.template,
      className: 'w-40',
    },
    {
      id: 'limit',
      header: t('colLimit'),
      cell: (p: BenefitPlan) => (
        <span className="tabular-nums text-small text-ink">
          {p.annualLimitThb != null
            ? `฿${p.annualLimitThb.toLocaleString('th-TH')}`
            : <span className="text-ink-muted">—</span>}
        </span>
      ),
      sortAccessor: (p: BenefitPlan) => p.annualLimitThb ?? -1,
      align: 'right' as const,
      className: 'w-32',
    },
    {
      id: 'approvalChain',
      header: t('colApproval'),
      cell: (p: BenefitPlan) =>
        p.approvalChain.length === 0 ? (
          <span className="text-small text-ink-muted">—</span>
        ) : (
          <span className="text-small text-ink">
            {p.approvalChain.map((s) => s.toUpperCase()).join(' → ')}
          </span>
        ),
      className: 'w-48',
    },
    {
      id: 'actions',
      header: t('colActions'),
      headerVisuallyHidden: true,
      cell: (p: BenefitPlan) => (
        <Capability action="edit" fallback={
          <Button variant="ghost" disabled>{isTh ? 'แก้ไข' : 'Edit'}</Button>
        }>
          <Button variant="ghost" onClick={() => setEditingPlan(p)}>
            {isTh ? 'แก้ไขแผน' : 'Edit Plan'}
          </Button>
        </Capability>
      ),
      className: 'w-28',
      align: 'right' as const,
    },
  ], [isTh, t]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>{t('eyebrow')}</CardEyebrow>
          <h1 className="font-display text-[28px] font-semibold text-ink">{t('title')}</h1>
          <p className="mt-2 text-small text-ink-muted">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Capability action="editFoundation" fallback={
            <Button variant="secondary" disabled>{t('importDisabled')}</Button>
          }>
            <Button variant="secondary" disabled>{t('import')}</Button>
          </Capability>
          <Button variant="secondary" disabled>{t('export')}</Button>
          <Capability action="edit" fallback={
            <Button variant="primary" disabled>{isTh ? '+ เพิ่มแผน' : '+ Add Plan'}</Button>
          }>
            <Button variant="primary" onClick={() => setCreatingPlan(true)}>
              {isTh ? '+ เพิ่มแผน' : '+ Add Plan'}
            </Button>
          </Capability>
        </div>
      </header>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: t('statTotal'),     value: BENEFIT_PLAN_REGISTRY.length },
          { label: t('statClaimable'), value: BENEFIT_PLAN_REGISTRY.filter((p) => p.recordType === 'claimable').length },
          { label: t('statRecords'),   value: BENEFIT_PLAN_REGISTRY.filter((p) => p.recordType === 'records').length },
          { label: t('statLifecycle'), value: BENEFIT_PLAN_REGISTRY.filter((p) => p.category === 'lifecycle').length },
        ].map((stat) => (
          <Card key={stat.label} variant="raised" size="md">
            <CardEyebrow>{stat.label}</CardEyebrow>
            <p className="mt-1 font-display text-[24px] font-semibold text-ink tabular-nums">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="filter-category" className="text-small font-medium text-ink-muted whitespace-nowrap">
            {t('filterCategory')}
          </label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as FilterCategory)}
            className={selectClass}
          >
            <option value="all">{t('filterAll')}</option>
            {Object.entries(isTh ? CATEGORY_LABELS_TH : CATEGORY_LABELS_EN).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="filter-type" className="text-small font-medium text-ink-muted whitespace-nowrap">
            {t('filterType')}
          </label>
          <select
            id="filter-type"
            value={filterRecordType}
            onChange={(e) => setFilterRecordType(e.target.value as FilterRecordType)}
            className={selectClass}
          >
            <option value="all">{t('filterAll')}</option>
            <option value="claimable">{isTh ? 'เบิกได้' : 'Claimable'}</option>
            <option value="records">{isTh ? 'บันทึก' : 'Records'}</option>
            <option value="info">{isTh ? 'ข้อมูล' : 'Info'}</option>
          </select>
        </div>

        {(filterCategory !== 'all' || filterRecordType !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setFilterCategory('all'); setFilterRecordType('all'); }}
          >
            {t('clearFilters')}
          </Button>
        )}

        <span className="ml-auto self-center text-small text-ink-muted">
          {isTh ? `แสดง ${filteredPlans.length} / ${BENEFIT_PLAN_REGISTRY.length} แผน` : `Showing ${filteredPlans.length} of ${BENEFIT_PLAN_REGISTRY.length} plans`}
        </span>
      </div>

      {/* Table */}
      <DataTable
        caption={isTh ? 'ตารางแผนสวัสดิการทั้งหมด' : 'Benefit plan catalog'}
        captionVisuallyHidden
        columns={columns}
        rows={filteredPlans}
        rowKey={(p) => p.id}
        dense
        emptyState={
          <p className="text-small text-ink-muted">{t('empty')}</p>
        }
      />

      {/* Disclaimer */}
      <Card variant="raised" size="md">
        <CardEyebrow>{t('disclaimerEyebrow')}</CardEyebrow>
        <CardTitle>{t('disclaimerTitle')}</CardTitle>
        <p className="mt-2 text-small text-ink-muted">{t('disclaimerBody')}</p>
      </Card>

      {/* Edit modal */}
      {editingPlan && (
        <EditPlanModal
          plan={editingPlan}
          onClose={() => setEditingPlan(null)}
          isTh={isTh}
          locale={locale}
        />
      )}

      {/* Create modal */}
      {creatingPlan && (
        <CreatePlanModal
          onClose={() => setCreatingPlan(false)}
          isTh={isTh}
        />
      )}
    </div>
  );
}

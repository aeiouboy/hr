'use client';

import { FormField, FormInput } from '@/components/humi';
import { type PlanCategory, type WorkflowTemplate } from '@/data/benefits/plan-registry';

export type CountryCode = 'TH' | 'VN';
export type PlanStatus = 'active' | 'inactive';
export type BenefitTypeGroup = 'reimbursement-employee-hr' | 'reimbursement-hr' | 'info' | 'record';
// STA-70 follow-up (spec expanded with Enrolment / Claim condition / Legal entity sections)
export type EnrolmentMode = 'auto' | 'manual';
export type ClaimPeriod = 'year' | 'month' | 'quarter' | 'one-time' | 'lifetime';
export type EntitlementCalcMethod = 'full' | 'prorate';
export type EligibleClaimDate = '30' | '60' | '90' | 'none';

export interface Tab1IdentityValues {
  ttt: string;
  planKey: string;
  nameTh: string;
  nameEn: string;
  prefix: 'records' | 'info' | 'none';
  category: PlanCategory;
  schemaVersion: 'v1' | 'v2';
  template: WorkflowTemplate;
  effectiveFrom: string;
  effectiveTo: string;
  // STA-70 — Benefit info + Benefit type/group
  country: CountryCode;
  status: PlanStatus;
  benefitTypeGroup: BenefitTypeGroup;
  // STA-70 follow-up — Enrolment
  enrolment: EnrolmentMode;
  // STA-70 follow-up — Claim condition
  claimPeriod: ClaimPeriod;
  entitlementCalcMethod: EntitlementCalcMethod;
  eligibleClaimDate: EligibleClaimDate;
  // STA-70 follow-up — Legal entity
  company: string;
}

export interface Tab1IdentityFieldsProps {
  values: Tab1IdentityValues;
  onChange: <K extends keyof Tab1IdentityValues>(field: K, value: Tab1IdentityValues[K]) => void;
  mode: 'create' | 'edit';
  isTh: boolean;
}

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

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS_EN) as PlanCategory[];

const selectClass =
  'h-10 w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas';

const RECORD_TYPE_CHIP: Record<string, { label: string; labelTh: string; className: string }> = {
  records:  { label: 'records',   labelTh: 'records',   className: 'bg-canvas-soft text-ink-muted border border-hairline' },
  info:     { label: 'info',      labelTh: 'info',      className: 'bg-accent-soft text-accent border border-accent/30' },
  claimable:{ label: 'claimable', labelTh: 'claimable', className: 'bg-success-soft text-success border border-success/30' },
};

const TEMPLATE_OPTIONS: WorkflowTemplate[] = [
  'simple-claim',
  'hospital-claim',
  'records-flat',
  'records-dependent',
  'records-computed',
  'lifecycle-admin',
];

/**
 * Tab1IdentityFields — pure component; no internal state.
 * Parent (modal) owns all state via `values` + `onChange`.
 *
 * Fields: TTT, Plan key, nameTh, nameEn, prefix selector,
 *         category, schemaVersion, template, effectiveFrom, effectiveTo.
 */
export function Tab1IdentityFields({
  values,
  onChange,
  mode,
  isTh,
}: Tab1IdentityFieldsProps) {
  // Derive recordType inline — no useEffect
  const derivedRecordType =
    values.prefix === 'records' ? 'records'
    : values.prefix === 'info'    ? 'info'
    : 'claimable';

  const chip = RECORD_TYPE_CHIP[derivedRecordType];

  return (
    <div className="space-y-5">
      {/* 1. TTT reference */}
      <FormField
        id="tab1-ttt"
        label={isTh ? 'รหัส TTT' : 'TTT reference'}
      >
        {(cp) => (
          <FormInput
            {...cp}
            value={values.ttt}
            onChange={(e) => onChange('ttt', e.target.value)}
            placeholder="BE_06"
          />
        )}
      </FormField>

      {/* 2. Plan key */}
      <FormField
        id="tab1-planKey"
        label={isTh ? 'รหัสแผน (Plan key)' : 'Plan key'}
        required
        help={mode === 'edit' ? (isTh ? 'ไม่สามารถแก้ไขได้หลังสร้าง' : 'Cannot change after creation') : undefined}
      >
        {(cp) => (
          <FormInput
            {...cp}
            value={values.planKey}
            onChange={mode === 'edit' ? undefined : (e) => onChange('planKey', e.target.value)}
            readOnly={mode === 'edit'}
            className={mode === 'edit' ? 'bg-canvas-soft text-ink-muted' : undefined}
            placeholder="BE-MED-005"
          />
        )}
      </FormField>

      {/* 3. Plan name (TH) */}
      <FormField
        id="tab1-nameTh"
        label={isTh ? 'ชื่อแผน (ภาษาไทย)' : 'Plan name (Thai)'}
        required
      >
        {(cp) => (
          <FormInput
            {...cp}
            value={values.nameTh}
            onChange={(e) => onChange('nameTh', e.target.value)}
          />
        )}
      </FormField>

      {/* 4. Plan name (EN) */}
      <FormField
        id="tab1-nameEn"
        label={isTh ? 'ชื่อแผน (ภาษาอังกฤษ)' : 'Plan name (English)'}
        required
      >
        {(cp) => (
          <FormInput
            {...cp}
            value={values.nameEn}
            onChange={(e) => onChange('nameEn', e.target.value)}
          />
        )}
      </FormField>

      {/* 5. Plan name prefix selector → derives recordType */}
      <div className="flex flex-col gap-1.5">
        <span className="text-small font-medium text-ink">
          {isTh ? 'คำนำหน้าชื่อแผน' : 'Plan name prefix'}
        </span>
        <div className="flex flex-wrap gap-4" role="radiogroup" aria-label={isTh ? 'คำนำหน้าชื่อแผน' : 'Plan name prefix'}>
          {(['records', 'info', 'none'] as const).map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer text-small text-ink">
              <input
                type="radio"
                name="tab1-prefix"
                value={p}
                checked={values.prefix === p}
                onChange={() => onChange('prefix', p)}
                className="accent-accent"
              />
              {p === 'records' ? '[Records]' : p === 'info' ? '[Info]' : isTh ? 'ไม่มีคำนำหน้า' : 'None'}
            </label>
          ))}
        </div>
        {/* Derived recordType chip */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-small text-ink-muted">{isTh ? 'ประเภทระเบียน:' : 'Record type:'}</span>
          <span className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.1em] ${chip.className}`}>
            {isTh ? chip.labelTh : chip.label}
          </span>
        </div>
      </div>

      {/* 6. Category */}
      <FormField
        id="tab1-category"
        label={isTh ? 'หมวดหมู่' : 'Category'}
        required
      >
        {(cp) => (
          <select
            {...cp}
            value={values.category}
            onChange={(e) => onChange('category', e.target.value as PlanCategory)}
            className={selectClass}
          >
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {isTh ? CATEGORY_LABELS_TH[cat] : CATEGORY_LABELS_EN[cat]}
              </option>
            ))}
          </select>
        )}
      </FormField>

      {/* 7. schemaVersion radio */}
      <div className="flex flex-col gap-1.5">
        <span className="text-small font-medium text-ink">
          {isTh ? 'เวอร์ชันโครงสร้าง' : 'Schema version'}
        </span>
        <div className="flex flex-wrap gap-4" role="radiogroup" aria-label={isTh ? 'เวอร์ชันโครงสร้าง' : 'Schema version'}>
          {(['v1', 'v2'] as const).map((sv) => (
            <label key={sv} className="flex items-center gap-2 cursor-pointer text-small text-ink">
              <input
                type="radio"
                name="tab1-schemaVersion"
                value={sv}
                checked={values.schemaVersion === sv}
                onChange={() => onChange('schemaVersion', sv)}
                className="accent-accent"
              />
              {sv === 'v1'
                ? (isTh ? 'v1 (legacy)' : 'v1 (legacy)')
                : (isTh ? 'v2 (hybrid)' : 'v2 (hybrid)')}
            </label>
          ))}
        </div>
      </div>

      {/* 8. Template picker */}
      <FormField
        id="tab1-template"
        label={isTh ? 'เทมเพลตเวิร์กโฟลว์' : 'Workflow template'}
        required
      >
        {(cp) => (
          <select
            {...cp}
            value={values.template}
            onChange={(e) => onChange('template', e.target.value as WorkflowTemplate)}
            className={selectClass}
          >
            {TEMPLATE_OPTIONS.map((tpl) => (
              <option key={tpl} value={tpl}>{tpl}</option>
            ))}
          </select>
        )}
      </FormField>

      {/* 9. Effective dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="tab1-effectiveFrom"
          label={isTh ? 'วันที่เริ่มมีผล' : 'Effective from'}
        >
          {(cp) => (
            <FormInput
              {...cp}
              type="date"
              value={values.effectiveFrom}
              onChange={(e) => onChange('effectiveFrom', e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id="tab1-effectiveTo"
          label={isTh ? 'วันที่สิ้นสุด' : 'Effective to'}
        >
          {(cp) => (
            <FormInput
              {...cp}
              type="date"
              value={values.effectiveTo}
              onChange={(e) => onChange('effectiveTo', e.target.value)}
            />
          )}
        </FormField>
      </div>

      {/* ── STA-70 Benefit info section ─────────────────────────────────── */}
      <div className="border-t border-hairline pt-5">
        <h3 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink-muted">
          {isTh ? 'ข้อมูลสวัสดิการ (Benefit info)' : 'Benefit info'}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 10. Country */}
          <FormField
            id="tab1-country"
            label={isTh ? 'ประเทศ (Country)' : 'Country'}
            required
          >
            {(cp) => (
              <select
                {...cp}
                value={values.country}
                onChange={(e) => onChange('country', e.target.value as CountryCode)}
                className={selectClass}
              >
                <option value="TH">{isTh ? 'ไทย (TH)' : 'Thailand (TH)'}</option>
                <option value="VN">{isTh ? 'เวียดนาม (VN)' : 'Vietnam (VN)'}</option>
              </select>
            )}
          </FormField>

          {/* 11. Status */}
          <FormField
            id="tab1-status"
            label={isTh ? 'สถานะ (Status)' : 'Status'}
            required
          >
            {(cp) => (
              <select
                {...cp}
                value={values.status}
                onChange={(e) => onChange('status', e.target.value as PlanStatus)}
                className={selectClass}
              >
                <option value="active">{isTh ? 'ใช้งาน (Active)' : 'Active'}</option>
                <option value="inactive">{isTh ? 'ไม่ใช้งาน (Inactive)' : 'Inactive'}</option>
              </select>
            )}
          </FormField>
        </div>
      </div>

      {/* ── STA-70 Benefit type / group section ─────────────────────────── */}
      <div className="border-t border-hairline pt-5">
        <h3 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink-muted">
          {isTh ? 'ประเภท / กลุ่มสวัสดิการ (Benefit type / group)' : 'Benefit type / group'}
        </h3>

        {/* 12. Benefit type */}
        <FormField
          id="tab1-benefitTypeGroup"
          label={isTh ? 'ประเภทสวัสดิการ (Benefit type)' : 'Benefit type'}
          required
        >
          {(cp) => (
            <select
              {...cp}
              value={values.benefitTypeGroup}
              onChange={(e) => onChange('benefitTypeGroup', e.target.value as BenefitTypeGroup)}
              className={selectClass}
            >
              <option value="reimbursement-employee-hr">
                {isTh ? 'Reimbursement: Employee/HR' : 'Reimbursement: Employee/HR'}
              </option>
              <option value="reimbursement-hr">
                {isTh ? 'Reimbursement: HR' : 'Reimbursement: HR'}
              </option>
              <option value="info">{isTh ? 'Info.' : 'Info.'}</option>
              <option value="record">{isTh ? 'Record' : 'Record'}</option>
            </select>
          )}
        </FormField>
      </div>

      {/* ── STA-70 Enrolment section ────────────────────────────────────── */}
      <div className="border-t border-hairline pt-5">
        <h3 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink-muted">
          {isTh ? 'การลงทะเบียน (Enrolment)' : 'Enrolment'}
        </h3>

        {/* 13. Enrolment mode */}
        <FormField
          id="tab1-enrolment"
          label={isTh ? 'รูปแบบการลงทะเบียน (Enrolment)' : 'Enrolment'}
          required
        >
          {(cp) => (
            <select
              {...cp}
              value={values.enrolment}
              onChange={(e) => onChange('enrolment', e.target.value as EnrolmentMode)}
              className={selectClass}
            >
              <option value="auto">{isTh ? 'Auto Enrolment (อัตโนมัติ)' : 'Auto Enrolment'}</option>
              <option value="manual">{isTh ? 'Manual Enrolment (ลงทะเบียนเอง)' : 'Manual Enrolment'}</option>
            </select>
          )}
        </FormField>
      </div>

      {/* ── STA-70 Claim condition section ──────────────────────────────── */}
      <div className="border-t border-hairline pt-5">
        <h3 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink-muted">
          {isTh ? 'เงื่อนไขการเบิก (Claim condition)' : 'Claim condition'}
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* 14. Claim period */}
          <FormField
            id="tab1-claimPeriod"
            label={isTh ? 'รอบการเบิก (Claim period)' : 'Claim period'}
            required
          >
            {(cp) => (
              <select
                {...cp}
                value={values.claimPeriod}
                onChange={(e) => onChange('claimPeriod', e.target.value as ClaimPeriod)}
                className={selectClass}
              >
                <option value="year">{isTh ? 'รายปี (Year)' : 'Year'}</option>
                <option value="month">{isTh ? 'รายเดือน (Month)' : 'Month'}</option>
                <option value="quarter">{isTh ? 'รายไตรมาส (Quarter)' : 'Quarter'}</option>
                <option value="one-time">{isTh ? 'ครั้งเดียว (One-time)' : 'One-time'}</option>
                <option value="lifetime">{isTh ? 'ตลอดชีพ (Lifetime)' : 'Lifetime'}</option>
              </select>
            )}
          </FormField>

          {/* 15. Entitlement calculation method */}
          <FormField
            id="tab1-entitlementCalcMethod"
            label={isTh ? 'วิธีคำนวณวงเงิน (Entitlement calc)' : 'Entitlement calc method'}
            required
          >
            {(cp) => (
              <select
                {...cp}
                value={values.entitlementCalcMethod}
                onChange={(e) => onChange('entitlementCalcMethod', e.target.value as EntitlementCalcMethod)}
                className={selectClass}
              >
                <option value="full">{isTh ? 'เต็มจำนวน (Full)' : 'Full'}</option>
                <option value="prorate">{isTh ? 'ตามสัดส่วน (Prorate)' : 'Prorate'}</option>
              </select>
            )}
          </FormField>
        </div>

      </div>

      {/* ── STA-70 Legal Entity section ─────────────────────────────────── */}
      <div className="border-t border-hairline pt-5">
        <h3 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink-muted">
          {isTh ? 'นิติบุคคล (Legal Entity)' : 'Legal Entity'}
        </h3>

        {/* 17. Company */}
        <FormField
          id="tab1-company"
          label={isTh ? 'บริษัท (Company)' : 'Company'}
        >
          {(cp) => (
            <FormInput
              {...cp}
              value={values.company}
              onChange={(e) => onChange('company', e.target.value)}
              placeholder={isTh ? 'เช่น Central Group' : 'e.g. Central Group'}
            />
          )}
        </FormField>
      </div>
    </div>
  );
}

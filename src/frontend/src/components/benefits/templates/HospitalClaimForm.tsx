'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/molecules/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitPlan } from '@/data/benefits/plan-registry';
import {
  bucketsForPlan,
  getConditionalFields,
  isClaimFieldRequired,
  type ClaimFieldKey,
} from '@/data/benefits/claim-field-config';
import type { BenefitTemplateProps, SimpleClaimSubmission } from './SimpleClaimForm';
import { ConditionalClaimFields, CONDITIONAL_CLAIM_LABELS } from './ConditionalClaimFields';

// Mock dependent list — Sprint 2 will wire to real API
const MOCK_DEPENDENTS = [
  { id: 'dep-1', nameTh: 'สมหญิง ทานากะ', nameEn: 'Somying Tanaka', relationshipTh: 'คู่สมรส', relationshipEn: 'Spouse' },
  { id: 'dep-2', nameTh: 'ทาโร่ ทานากะ', nameEn: 'Taro Tanaka', relationshipTh: 'บุตร', relationshipEn: 'Child' },
];

const selectClassName =
  'h-10 w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 text-body text-ink transition-[border-color,box-shadow] duration-[var(--dur-fast)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas';

// ── HospitalClaimForm ─────────────────────────────────────────────────────────
// Template: hospital-claim
// Use cases: IPD with referral (requiresReceipt=false), dependent IPD
// Adds: hospital picker, OPD/IPD toggle, transfer doc no, dependent picker

export function HospitalClaimForm({
  plan,
  onSubmitted,
  className,
}: BenefitTemplateProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const planName = isTh ? plan.nameTh : plan.nameEn;
  const requiredDocs = isTh ? plan.requiredDocsTh : plan.requiredDocsEn;

  // STA-119: same config-driven conditional groups as SimpleClaimForm, keyed on
  // the plan's category bucket (medical: Medical/Dental, OPD/IPD, hospital type,
  // hospital name, patient-transfer, disease details, etc.).
  // HospitalClaimForm owns hospital-name + dependent natively (form.hospitalName /
  // "ชื่อโรงพยาบาล" + the dependent picker), so those conditional descriptors are
  // excluded from the shared renderer to avoid duplicate fields. The native values
  // are mapped into dynamicFields at submit so the approval mirror still sees them.
  // STA-145 Phase B: this template keeps its NATIVE hospital free-text + dependent
  // picker (it is the hospital/IPD/referral surface, not the gold "Start a claim"
  // SimpleClaimForm surface the ticket targets). So the master-list select
  // (medicalHospitalName) and its dependent "Others" field (hospitalOthers) are
  // owned/suppressed here; the dependent descriptor group is owned by the native
  // dependent picker. Admitted dates + patient-transfer + disease cascade DO render
  // via the shared renderer (see effectiveDynamic for the OPD/IPD bridge).
  const NATIVELY_OWNED_KEYS: ReadonlySet<string> = new Set([
    'opdIpd', // owned by the native Admission-type control; bridged via effectiveDynamic
    'hospitalName',
    'medicalHospitalName',
    'hospitalOthers',
    'dependentName',
    'dependentDob',
    'dependentRelationship',
  ]);
  const conditionalFields = getConditionalFields(bucketsForPlan(plan)).filter(
    (f) => !NATIVELY_OWNED_KEYS.has(f.key),
  );

  const emptyDynamic = (): Partial<Record<ClaimFieldKey, string>> => ({});

  const [form, setForm] = useState({
    admissionType: 'ipd' as 'opd' | 'ipd',
    hospitalName: '',
    transferDocNo: '',
    dependentId: '',
    receiptNo: '',
    receiptDate: '',
    receiptAmount: '',
    attachmentName: '',
  });
  // Conditional values live here so submit can thread dynamicFields through.
  const [dynamic, setDynamic] = useState<Partial<Record<ClaimFieldKey, string>>>(emptyDynamic);
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  // STA-145 Phase B — OPD/IPD is owned natively (form.admissionType, lowercase).
  // Bridge it into the conditional values (uppercase, matching OPD_IPD_OPTIONS) so
  // the shared show-if/required-if predicates (Admitted dates show only on IPD)
  // fire on this template too.
  const effectiveDynamic: Partial<Record<ClaimFieldKey, string>> = {
    ...dynamic,
    opdIpd: form.admissionType === 'ipd' ? 'IPD' : 'OPD',
  };

  const clearTransient = () => {
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearTransient();
  };

  const setDynamicField = (key: ClaimFieldKey, value: string) => {
    setDynamic((prev) => ({ ...prev, [key]: value }));
    clearTransient();
  };

  const submit = () => {
    const nextErrors: string[] = [];
    if (!form.hospitalName.trim()) {
      nextErrors.push(isTh ? 'กรุณาระบุชื่อโรงพยาบาล' : 'Hospital name is required');
    }
    if (plan.requiresDependent && !form.dependentId) {
      nextErrors.push(isTh ? 'กรุณาเลือกผู้รับสิทธิ์' : 'Dependent selection is required');
    }
    if (plan.requiresReceipt) {
      if (!form.receiptNo.trim()) {
        nextErrors.push(isTh ? 'กรุณาระบุเลขที่ใบเสร็จ' : 'Receipt number is required');
      }
      if (!form.receiptDate) {
        nextErrors.push(isTh ? 'กรุณาระบุวันที่ใบเสร็จ' : 'Receipt date is required');
      }
      const amount = Number(form.receiptAmount);
      if (!Number.isFinite(amount) || amount <= 0) {
        nextErrors.push(isTh ? 'กรุณาระบุจำนวนเงิน' : 'Amount is required');
      }
    }
    // Required config-driven conditional fields (STA-119), same as SimpleClaimForm.
    conditionalFields.forEach((f) => {
      if (
        isClaimFieldRequired(f, effectiveDynamic) &&
        !String(dynamic[f.key as ClaimFieldKey] ?? '').trim()
      ) {
        const lbl = CONDITIONAL_CLAIM_LABELS[f.key];
        const label = lbl ? (isTh ? lbl.th : lbl.en) : f.key;
        nextErrors.push((isTh ? 'กรุณาระบุ' : 'Required: ') + label);
      }
    });
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const wfId = `WF-${Date.now()}`;
    setLastWorkflowId(wfId);
    const receiptAmount = Number(form.receiptAmount);
    const submission: SimpleClaimSubmission = {
      selectedBenefit: planName,
      benefitCode: plan.id,
      claimDate: new Date().toISOString().slice(0, 10),
      receiptDate: form.receiptDate || undefined,
      remainingAmount: plan.annualLimitThb ?? undefined,
      receiptNo: form.receiptNo.trim(),
      receiptAmount: Number.isFinite(receiptAmount) ? receiptAmount : 0,
      totalClaimAmount: Number.isFinite(receiptAmount) ? receiptAmount : 0,
      remark: '',
      currency: 'THB',
      // hospitalName is owned by the native field; map it into dynamicFields so the
      // approval mirror (bucketsForType resolver) can display it alongside the others.
      // opdIpd is bridged from the native admissionType (Phase B) for the same reason.
      dynamicFields: {
        ...dynamic,
        opdIpd: form.admissionType === 'ipd' ? 'IPD' : 'OPD',
        hospitalName: form.hospitalName.trim(),
      },
    };
    setForm({ admissionType: 'ipd', hospitalName: '', transferDocNo: '', dependentId: '', receiptNo: '', receiptDate: '', receiptAmount: '', attachmentName: '' });
    setDynamic(emptyDynamic());
    setErrors([]);
    onSubmitted?.(wfId, submission);
  };

  return (
    <Card variant="raised" size="lg" className={className}>
      <CardEyebrow>{isTh ? 'เบิกสวัสดิการ · โรงพยาบาล' : 'Benefit claim · hospital'}</CardEyebrow>
      <CardTitle>{planName}</CardTitle>
      <p className="mt-2 text-small text-ink-muted">{plan.eligibilityTh}</p>

      {plan.annualLimitThb !== null && (
        <p className="mt-1 text-small font-medium text-accent">
          {isTh ? `วงเงินรายปี: ${plan.annualLimitThb.toLocaleString()} บาท` : `Annual limit: ${plan.annualLimitThb.toLocaleString()} THB`}
        </p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* OPD / IPD toggle */}
        <FormField id={`${plan.id}-admission-type`} label={isTh ? 'ประเภทการรักษา' : 'Admission type'} required>
          {(controlProps) => (
            <select
              {...controlProps}
              className={selectClassName}
              value={form.admissionType}
              onChange={(e) => setField('admissionType', e.target.value)}
            >
              <option value="opd">{isTh ? 'ผู้ป่วยนอก (OPD)' : 'Outpatient (OPD)'}</option>
              <option value="ipd">{isTh ? 'ผู้ป่วยใน (IPD)' : 'Inpatient (IPD)'}</option>
            </select>
          )}
        </FormField>

        {/* Hospital picker */}
        <FormField id={`${plan.id}-hospital-name`} label={isTh ? 'ชื่อโรงพยาบาล' : 'Hospital name'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.hospitalName}
              onChange={(e) => setField('hospitalName', e.target.value)}
              placeholder={isTh ? 'เช่น รพ.บำรุงราษฎร์' : 'e.g. Bumrungrad Hospital'}
            />
          )}
        </FormField>

        {/* Transfer doc no */}
        <FormField
          id={`${plan.id}-transfer-doc`}
          label={isTh ? 'เลขที่ใบส่งตัว' : 'Referral / transfer doc no.'}
          help={isTh ? 'กรณีมีใบส่งตัว' : 'If applicable'}
        >
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.transferDocNo}
              onChange={(e) => setField('transferDocNo', e.target.value)}
            />
          )}
        </FormField>

        {/* Dependent picker — shown when requiresDependent=true */}
        {plan.requiresDependent && (
          <FormField id={`${plan.id}-dependent`} label={isTh ? 'ผู้รับสิทธิ์ (ผู้อยู่ในอุปการะ)' : 'Dependent'} required>
            {(controlProps) => (
              <select
                {...controlProps}
                className={selectClassName}
                value={form.dependentId}
                onChange={(e) => setField('dependentId', e.target.value)}
              >
                <option value="">{isTh ? '— เลือกผู้รับสิทธิ์ —' : '— Select dependent —'}</option>
                {MOCK_DEPENDENTS.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {isTh ? `${dep.nameTh} · ${dep.relationshipTh}` : `${dep.nameEn} · ${dep.relationshipEn}`}
                  </option>
                ))}
              </select>
            )}
          </FormField>
        )}

        {/* Receipt fields — hidden when requiresReceipt=false (hospital bills company) */}
        {plan.requiresReceipt && (
          <>
            <FormField id={`${plan.id}-receipt-no`} label={isTh ? 'เลขที่ใบเสร็จ' : 'Receipt no.'} required>
              {(controlProps) => (
                <FormInput
                  {...controlProps}
                  value={form.receiptNo}
                  onChange={(e) => setField('receiptNo', e.target.value)}
                />
              )}
            </FormField>

            <FormField id={`${plan.id}-receipt-date`} label={isTh ? 'วันที่ใบเสร็จ' : 'Receipt date'} required>
              {(controlProps) => (
                <FormInput
                  {...controlProps}
                  type="date"
                  value={form.receiptDate}
                  onChange={(e) => setField('receiptDate', e.target.value)}
                />
              )}
            </FormField>

            <FormField id={`${plan.id}-receipt-amount`} label={isTh ? 'จำนวนเงิน (บาท)' : 'Amount (THB)'} required>
              {(controlProps) => (
                <FormInput
                  {...controlProps}
                  inputMode="numeric"
                  value={form.receiptAmount}
                  onChange={(e) => setField('receiptAmount', e.target.value)}
                />
              )}
            </FormField>
          </>
        )}

        {/* ── Conditional groups (config-driven, shared renderer — STA-119) ── */}
        <ConditionalClaimFields
          fields={conditionalFields}
          values={effectiveDynamic}
          onChange={setDynamicField}
          idPrefix={plan.id}
          isTh={isTh}
        />

        {/* Attachments */}
        <FileUploadField
          label={isTh ? 'เอกสารแนบ' : 'Attachments'}
          required
          maxFiles={5}
          helperText={requiredDocs.length > 0 ? requiredDocs.join(' · ') : undefined}
          className="sm:col-span-2"
          onUpload={(_, file) => setField('attachmentName', file?.filename ?? '')}
          onRemove={() => setField('attachmentName', '')}
        />
      </div>

      {errors.length > 0 && (
        <div role="alert" className="mt-4 rounded-[var(--radius-md)] bg-danger-soft p-3 text-small text-ink">
          <ul className="list-disc pl-5">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
        </div>
      )}
      {lastWorkflowId && (
        <div role="status" className="mt-4 rounded-[var(--radius-md)] bg-success-soft p-3 text-small font-medium text-ink">
          {isTh ? `ส่งคำขอ ${lastWorkflowId} แล้ว · ติดตามได้ที่ /requests` : `Submitted ${lastWorkflowId} · track at /requests`}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Capability action="edit" fallback={
          <Button variant="primary" disabled>
            {isTh ? 'ส่งคำขอเบิกสวัสดิการ' : 'Submit claim'}
          </Button>
        }>
          <Button variant="primary" onClick={submit}>
            {isTh ? 'ส่งคำขอเบิกสวัสดิการ' : 'Submit claim'}
          </Button>
        </Capability>
      </div>
    </Card>
  );
}

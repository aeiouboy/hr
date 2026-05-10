'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitPlan } from '@/data/benefits/plan-registry';
import { ApprovalChainChips, mapPlanToWorkflowType, type BenefitTemplateProps } from './SimpleClaimForm';
import { submitBenefitRequest, waitUntilWorkflowReady } from '@/lib/workflow-api';
import { useBenefitClaimsStore } from '@/stores/benefit-claims';
import { useAuthStore } from '@/stores/auth-store';
import { lookupManagerId, lookupName } from '@/lib/demo-org-chart';

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
  const tWorkflow = useTranslations('benefitWorkflow');
  const submitClaim = useBenefitClaimsStore((s) => s.submitClaim);
  const rawUserId = useAuthStore((s) => s.userId);
  // Default to 'emp-042' (Wichai Thamdee) for stable demo persona when no user is logged in
  // or when the generic placeholder 'EMP001' is set.
  const requesterId = (!rawUserId || rawUserId === 'EMP001') ? 'emp-042' : rawUserId;

  const planName = isTh ? plan.nameTh : plan.nameEn;
  const requiredDocs = isTh ? plan.requiredDocsTh : plan.requiredDocsEn;

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
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const submit = async () => {
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
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const amountForWorkflow = plan.requiresReceipt ? Number(form.receiptAmount) : 0;
    setIsSubmitting(true);
    try {
      const response = await submitBenefitRequest({
        requesterId,
        managerId: lookupManagerId(requesterId),
        benefitType: mapPlanToWorkflowType(plan),
        amount: amountForWorkflow,
        description: `${planName} · ${form.hospitalName} · ${form.admissionType.toUpperCase()}`,
      });
      // Mirror to the local Zustand store so the /requests page can render it.
      submitClaim({
        benefitType: 'medical',
        receiptNo: form.receiptNo || `HOSP-${Date.now()}`,
        receiptDate: form.receiptDate || new Date().toISOString().slice(0, 10),
        receiptAmount: amountForWorkflow,
        totalClaimAmount: amountForWorkflow,
        hospitalName: form.hospitalName,
        opdIpd: form.admissionType,
        patientTransferDocumentNo: form.transferDocNo || undefined,
        workflowInstanceId: response.id,
        workflowStatus: 'pending',
      });
      setLastWorkflowId(response.id);
      setForm({ admissionType: 'ipd', hospitalName: '', transferDocNo: '', dependentId: '', receiptNo: '', receiptDate: '', receiptAmount: '', attachmentName: '' });
      setErrors([]);
      // Block redirect until Camunda has surfaced the user task — closes the
      // /approvals race where Mock card renders before Camunda lane populates.
      await waitUntilWorkflowReady(response.id);
      onSubmitted?.(response.id);
    } catch (err) {
      const networkLike = err instanceof TypeError;
      setErrors([
        networkLike ? tWorkflow('errors.networkError') : tWorkflow('errors.submitFailed'),
      ]);
    } finally {
      setIsSubmitting(false);
    }
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

      <ApprovalChainChips chain={plan.approvalChain} />

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

        {/* Attachments */}
        <FileUploadField
          label={isTh ? 'เอกสารแนบ' : 'Attachments'}
          required
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
          {tWorkflow('success.submitted', { id: lastWorkflowId })}
          {' · '}{lookupName(requesterId, isTh ? 'th' : 'en')}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <Capability action="view" fallback={
          <Button variant="primary" disabled>
            {tWorkflow('actions.submit')}
          </Button>
        }>
          <Button variant="primary" onClick={submit} disabled={isSubmitting}>
            {isSubmitting ? tWorkflow('actions.submitting') : tWorkflow('actions.submit')}
          </Button>
        </Capability>
      </div>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput, Textarea } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitPlan } from '@/data/benefits/plan-registry';
import { ApprovalChain } from '@/components/quick-approve/ApprovalChain';

// ── Types ────────────────────────────────────────────────────────────────────

export interface BenefitTemplateProps {
  plan: BenefitPlan;
  onSubmitted?: (workflowRequestId: string, submission?: SimpleClaimSubmission) => void;
  defaultEmployeeId?: string;
  className?: string;
  selectedBenefitLabel?: string;
  remainingAmount?: number;
}

export interface SimpleClaimSubmission {
  selectedBenefit: string;
  benefitCode: string;
  claimDate: string;
  remainingAmount?: number;
  receiptNo: string;
  receiptAmount: number;
  totalClaimAmount: number;
  remark: string;
}

// ── SimpleClaimForm ───────────────────────────────────────────────────────────
// Template: simple-claim
// Use cases: OPD medical, dental, physical checkup, gasoline, toll, parking
// Renders: receipt no, receipt date, amount, attachments + approval chain

const todayIsoDate = () => new Date().toISOString().slice(0, 10);

export function SimpleClaimForm({
  plan,
  onSubmitted,
  className,
  selectedBenefitLabel,
  remainingAmount,
}: BenefitTemplateProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const planName = selectedBenefitLabel ?? (isTh ? plan.nameTh : plan.nameEn);
  const requiredDocs = isTh ? plan.requiredDocsTh : plan.requiredDocsEn;
  const visibleRemainingAmount = remainingAmount ?? plan.annualLimitThb ?? undefined;

  const [form, setForm] = useState({
    claimDate: todayIsoDate(),
    receiptNo: '',
    receiptAmount: '',
    claimAmount: '',
    remark: '',
    attachmentName: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  const setField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (lastWorkflowId) setLastWorkflowId(null);
  };

  const submit = () => {
    const nextErrors: string[] = [];
    if (!form.receiptNo.trim()) {
      nextErrors.push(isTh ? 'กรุณาระบุเลขที่ใบเสร็จ' : 'Receipt number is required');
    }
    if (!form.claimDate) {
      nextErrors.push(isTh ? 'กรุณาระบุวันที่เคลม' : 'Claim date is required');
    }
    const amount = Number(form.receiptAmount);
    const claimAmount = Number(form.claimAmount || form.receiptAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.push(isTh ? 'กรุณาระบุจำนวนเงินตามใบเสร็จ' : 'Receipt amount is required');
    }
    if (!Number.isFinite(claimAmount) || claimAmount <= 0) {
      nextErrors.push(isTh ? 'กรุณาระบุยอดเบิกสุทธิ' : 'Total claim amount is required');
    }
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const wfId = `WF-${Date.now()}`;
    setLastWorkflowId(wfId);
    setForm({
      claimDate: todayIsoDate(),
      receiptNo: '',
      receiptAmount: '',
      claimAmount: '',
      remark: '',
      attachmentName: '',
    });
    setErrors([]);
    onSubmitted?.(wfId, {
      selectedBenefit: planName,
      benefitCode: plan.id,
      claimDate: form.claimDate,
      remainingAmount: visibleRemainingAmount,
      receiptNo: form.receiptNo.trim(),
      receiptAmount: amount,
      totalClaimAmount: claimAmount,
      remark: form.remark.trim(),
    });
  };

  return (
    <Card variant="raised" size="lg" className={className}>
      <CardEyebrow>{isTh ? 'เบิกสวัสดิการ · ใบเสร็จ' : 'Benefit claim · receipt-based'}</CardEyebrow>
      <CardTitle>{planName}</CardTitle>
      <p className="mt-2 text-small text-ink-muted">{plan.eligibilityTh}</p>

      {plan.annualLimitThb !== null && (
        <p className="mt-1 text-small font-medium text-accent">
          {isTh ? `วงเงินรายปี: ${plan.annualLimitThb.toLocaleString()} บาท` : `Annual limit: ${plan.annualLimitThb.toLocaleString()} THB`}
        </p>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <FormField id={`${plan.id}-selected-benefit`} label={isTh ? 'สวัสดิการที่เลือก' : 'Selected Benefit'}>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              readOnly
              value={planName}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-claim-date`} label={isTh ? 'วันที่เคลม' : 'Claim Date'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              type="date"
              value={form.claimDate}
              onChange={(e) => setField('claimDate', e.target.value)}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-remaining-amount`} label={isTh ? 'วงเงินคงเหลือ' : 'Remaining Amount'}>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              readOnly
              value={
                visibleRemainingAmount === undefined
                  ? (isTh ? 'ตรวจสอบตามเงื่อนไขสวัสดิการ' : 'Checked by benefit rules')
                  : `฿${visibleRemainingAmount.toLocaleString('th-TH')}`
              }
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-receipt-no`} label={isTh ? 'เลขที่ใบเสร็จ/เอกสาร' : 'Receipt / doc no.'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.receiptNo}
              onChange={(e) => setField('receiptNo', e.target.value)}
              placeholder={isTh ? 'เช่น RC-2026-0001' : 'e.g. RC-2026-0001'}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-receipt-amount`} label={isTh ? 'จำนวนเงินตามใบเสร็จ (บาท)' : 'Receipt amount (THB)'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              inputMode="numeric"
              value={form.receiptAmount}
              onChange={(e) => setField('receiptAmount', e.target.value)}
            />
          )}
        </FormField>

        <FormField
          id={`${plan.id}-claim-amount`}
          label={isTh ? 'ยอดเบิกสุทธิ (บาท)' : 'Total Claim Amount (THB)'}
          help={isTh ? 'เว้นว่างเพื่อใช้ยอดตามใบเสร็จ' : 'Leave blank to use receipt amount'}
        >
          {(controlProps) => (
            <FormInput
              {...controlProps}
              inputMode="numeric"
              value={form.claimAmount}
              onChange={(e) => setField('claimAmount', e.target.value)}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-remark`} label={isTh ? 'หมายเหตุ' : 'Remark'}>
          {(controlProps) => (
            <Textarea
              {...controlProps}
              value={form.remark}
              onChange={(e) => setField('remark', e.target.value)}
              placeholder={isTh ? 'ระบุรายละเอียดเพิ่มเติมถึง SPD' : 'Add notes for SPD'}
            />
          )}
        </FormField>

        <FileUploadField
          label={isTh ? 'เอกสารแนบ' : 'Attachments'}
          required
          helperText={requiredDocs.length > 0 ? requiredDocs.join(' · ') : undefined}
          className="sm:col-span-2"
          onUpload={(_, file) => setField('attachmentName', file?.filename ?? '')}
          onRemove={() => setField('attachmentName', '')}
        />
      </div>

      {/* Approval chain */}
      <div className="mt-4 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3">
        <p className="mb-2 text-small font-medium text-ink">
          {isTh ? 'ขั้นตอนอนุมัติ' : 'Approval chain'}
        </p>
        <ApprovalChain chain={plan.approvalChain} locale={locale} />
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

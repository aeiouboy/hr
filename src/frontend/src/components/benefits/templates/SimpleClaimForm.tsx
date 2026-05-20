'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitPlan } from '@/data/benefits/plan-registry';
import { ApprovalChain } from '@/components/quick-approve/ApprovalChain';

// ── Types ────────────────────────────────────────────────────────────────────

export interface BenefitTemplateProps {
  plan: BenefitPlan;
  onSubmitted?: (workflowRequestId: string) => void;
  defaultEmployeeId?: string;
  className?: string;
}

// ── SimpleClaimForm ───────────────────────────────────────────────────────────
// Template: simple-claim
// Use cases: OPD medical, dental, physical checkup, gasoline, toll, parking
// Renders: selected benefit, claim date, remaining amount, receipt/doc no, amounts, remark, attachments + approval chain

export function SimpleClaimForm({
  plan,
  onSubmitted,
  className,
}: BenefitTemplateProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const planName = isTh ? plan.nameTh : plan.nameEn;
  const requiredDocs = isTh ? plan.requiredDocsTh : plan.requiredDocsEn;

  const [form, setForm] = useState({
    claimDate: '',
    receiptNo: '',
    receiptAmount: '',
    claimAmount: '',
    remark: '',
    attachmentName: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [lastWorkflowId, setLastWorkflowId] = useState<string | null>(null);

  const receiptAmountNumber = Number(form.receiptAmount);
  const totalClaimAmount = form.claimAmount || form.receiptAmount;
  const remainingAmount = plan.annualLimitThb === null
    ? null
    : Math.max(0, plan.annualLimitThb - (Number.isFinite(receiptAmountNumber) ? receiptAmountNumber : 0));

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
    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.push(isTh ? 'กรุณาระบุจำนวนเงินตามใบเสร็จ' : 'Receipt amount is required');
    }
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    const wfId = `WF-${Date.now()}`;
    setLastWorkflowId(wfId);
    setForm({ claimDate: '', receiptNo: '', receiptAmount: '', claimAmount: '', remark: '', attachmentName: '' });
    setErrors([]);
    onSubmitted?.(wfId);
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
        <FormField id={`${plan.id}-selected-benefit`} label={isTh ? 'สวัสดิการที่เลือก' : 'Selected benefit'}>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={planName}
              readOnly
              className="bg-canvas-soft text-ink-muted"
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-claim-date`} label={isTh ? 'วันที่เคลม' : 'Claim date'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              type="date"
              value={form.claimDate}
              onChange={(e) => setField('claimDate', e.target.value)}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-remaining-amount`} label={isTh ? 'วงเงินคงเหลือ' : 'Remaining amount'}>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={remainingAmount === null ? (isTh ? 'ไม่ระบุวงเงิน' : 'No limit configured') : `${remainingAmount.toLocaleString()} THB`}
              readOnly
              className="bg-canvas-soft text-ink-muted"
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-receipt-no`} label={isTh ? 'เลขที่ใบเสร็จ/เอกสาร' : 'Receipt no. / Document No.'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.receiptNo}
              onChange={(e) => setField('receiptNo', e.target.value)}
              placeholder={isTh ? 'เช่น RC-2026-0001' : 'e.g. RC-2026-0001'}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-receipt-amount`} label={isTh ? 'จำนวนเงินตามใบเสร็จ' : 'Receipt Amount'} required>
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
          label={isTh ? 'ยอดรวมที่ขอเบิก' : 'Total Claim Amount'}
          help={isTh ? 'เว้นว่างเพื่อใช้ยอดตามใบเสร็จ' : 'Leave blank to use receipt amount'}
        >
          {(controlProps) => (
            <FormInput
              {...controlProps}
              inputMode="numeric"
              value={totalClaimAmount}
              onChange={(e) => setField('claimAmount', e.target.value)}
            />
          )}
        </FormField>

        <FormField id={`${plan.id}-remark`} label={isTh ? 'หมายเหตุ' : 'Remark'}>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              value={form.remark}
              onChange={(e) => setField('remark', e.target.value)}
              placeholder={isTh ? 'ระบุหมายเหตุเพิ่มเติม' : 'Additional note'}
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

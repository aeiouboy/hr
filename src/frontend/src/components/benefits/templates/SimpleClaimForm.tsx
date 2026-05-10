'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { FileUploadField } from '@/components/humi/FileUploadField';
import { Capability } from '@/components/humi';
import type { BenefitPlan } from '@/data/benefits/plan-registry';
import { submitBenefitRequest, waitUntilWorkflowReady, type WorkflowBenefitType } from '@/lib/workflow-api';
import { useBenefitClaimsStore } from '@/stores/benefit-claims';
import { useAuthStore } from '@/stores/auth-store';
import { lookupManagerId, lookupName } from '@/lib/demo-org-chart';

// ── Types ────────────────────────────────────────────────────────────────────

export interface BenefitTemplateProps {
  plan: BenefitPlan;
  onSubmitted?: (workflowRequestId: string) => void;
  defaultEmployeeId?: string;
  className?: string;
}

/**
 * Map a plan to the hr-workflow gateway's benefitType discriminator.
 * Defaults to medical-reimbursement — the gateway only accepts three values
 * and most benefit plans (OPD, dental, checkup, etc.) reduce to medical.
 * Refine here when training and travel-allowance plans get distinct ids.
 */
export function mapPlanToWorkflowType(plan: BenefitPlan): WorkflowBenefitType {
  const id = plan.id.toLowerCase();
  if (id.includes('train')) return 'training';
  if (id.includes('travel')) return 'travel-allowance';
  return 'medical-reimbursement';
}

const APPROVER_STAGE_LABEL: Record<string, string> = {
  hrbp: 'HRBP',
  spd: 'SPD',
  hr_admin: 'HR Admin',
};

export function ApprovalChainChips({ chain }: { chain: BenefitPlan['approvalChain'] }) {
  if (chain.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Approval chain">
      {chain.map((stage) => (
        <span
          key={stage}
          className="rounded-full border border-hairline bg-canvas-soft px-3 py-1 text-small font-medium text-ink-muted"
        >
          {APPROVER_STAGE_LABEL[stage] ?? stage}
        </span>
      ))}
    </div>
  );
}

// ── SimpleClaimForm ───────────────────────────────────────────────────────────
// Template: simple-claim
// Use cases: OPD medical, dental, physical checkup, gasoline, toll, parking
// Renders: receipt no, receipt date, amount, attachments + approval chain

export function SimpleClaimForm({
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
    receiptNo: '',
    receiptDate: '',
    receiptAmount: '',
    claimAmount: '',
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
    if (!form.receiptNo.trim()) {
      nextErrors.push(isTh ? 'กรุณาระบุเลขที่ใบเสร็จ' : 'Receipt number is required');
    }
    if (!form.receiptDate) {
      nextErrors.push(isTh ? 'กรุณาระบุวันที่ใบเสร็จ' : 'Receipt date is required');
    }
    const amount = Number(form.receiptAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      nextErrors.push(isTh ? 'กรุณาระบุจำนวนเงินตามใบเสร็จ' : 'Receipt amount is required');
    }
    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const benefitType = mapPlanToWorkflowType(plan);
      const response = await submitBenefitRequest({
        requesterId,
        managerId: lookupManagerId(requesterId),
        benefitType,
        amount,
        description: `${planName} · ${form.receiptNo}`,
      });
      // Mirror the claim into the local Zustand store so /requests can show it.
      submitClaim({
        receiptNo: form.receiptNo,
        receiptDate: form.receiptDate,
        receiptAmount: amount,
        claimAmount: Number(form.claimAmount) || amount,
        workflowInstanceId: response.id,
        workflowStatus: 'pending',
      });
      setLastWorkflowId(response.id);
      setForm({ receiptNo: '', receiptDate: '', receiptAmount: '', claimAmount: '', attachmentName: '' });
      setErrors([]);
      // Block redirect until Camunda has surfaced the user task — closes the
      // /approvals race where Mock card renders before Camunda lane populates.
      await waitUntilWorkflowReady(response.id);
      onSubmitted?.(response.id);
    } catch (err) {
      // Surface the network/4xx failure inline via the existing errors box.
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
      <CardEyebrow>{isTh ? 'เบิกสวัสดิการ · ใบเสร็จ' : 'Benefit claim · receipt-based'}</CardEyebrow>
      <CardTitle>{planName}</CardTitle>
      <p className="mt-2 text-small text-ink-muted">{plan.eligibilityTh}</p>

      {plan.annualLimitThb !== null && (
        <p className="mt-1 text-small font-medium text-accent">
          {isTh ? `วงเงินรายปี: ${plan.annualLimitThb.toLocaleString()} บาท` : `Annual limit: ${plan.annualLimitThb.toLocaleString()} THB`}
        </p>
      )}

      <ApprovalChainChips chain={plan.approvalChain} />

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
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

        <FormField id={`${plan.id}-receipt-date`} label={isTh ? 'วันที่ใบเสร็จ/เอกสาร' : 'Receipt date'} required>
          {(controlProps) => (
            <FormInput
              {...controlProps}
              type="date"
              value={form.receiptDate}
              onChange={(e) => setField('receiptDate', e.target.value)}
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
          label={isTh ? 'จำนวนเงินที่ขอเบิก (บาท)' : 'Claim amount (THB)'}
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

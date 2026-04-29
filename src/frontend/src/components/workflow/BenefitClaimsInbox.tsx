'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { Button, Card, CardEyebrow, CardTitle } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  BENEFIT_CLAIM_STATUS_LABEL,
  BENEFIT_CLAIM_STATUS_TONE,
  BENEFIT_CLAIM_TYPE_LABEL,
  useBenefitClaimsStore,
  type BenefitClaimRequest,
} from '@/stores/benefit-claims';

function ClaimCard({ claim }: { claim: BenefitClaimRequest }) {
  const approve = useBenefitClaimsStore((s) => s.approveClaim);
  const reject = useBenefitClaimsStore((s) => s.rejectClaim);
  const sendBack = useBenefitClaimsStore((s) => s.sendBackClaim);
  const [reason, setReason] = useState('');
  const requiresReason = claim.status === 'pending_spd';

  return (
    <Card variant="raised" size="md" className="border border-hairline">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle className="text-[length:var(--text-body-lg)]">{claim.workflowRequestId}</CardTitle>
            <span className={cn('rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]', BENEFIT_CLAIM_STATUS_TONE[claim.status])}>
              {BENEFIT_CLAIM_STATUS_LABEL[claim.status]}
            </span>
          </div>
          <p className="mt-1 text-small text-ink-muted">
            {claim.employeeName} · {BENEFIT_CLAIM_TYPE_LABEL[claim.benefitType]} · {claim.benefitCode}
          </p>
          <dl className="mt-3 grid gap-2 text-small sm:grid-cols-2">
            <div><dt className="text-ink-muted">เลขที่เอกสาร</dt><dd className="font-medium text-ink">{claim.receiptNo}</dd></div>
            <div><dt className="text-ink-muted">ยอดขอเบิก</dt><dd className="font-medium text-ink">฿{claim.claimAmount.toLocaleString('th-TH')}</dd></div>
            <div><dt className="text-ink-muted">วันที่เอกสาร</dt><dd className="font-medium text-ink">{claim.receiptDate}</dd></div>
            <div><dt className="text-ink-muted">ไฟล์แนบ</dt><dd className="font-medium text-ink">{claim.attachments.map((a) => a.name).join(', ') || '—'}</dd></div>
          </dl>
          {claim.audit.length > 0 && (
            <div className="mt-3 rounded-md bg-canvas-soft p-3 text-small text-ink-muted">
              ล่าสุด: {claim.audit[claim.audit.length - 1]?.note ?? '—'}
            </div>
          )}
        </div>

        {requiresReason && (
          <div className="w-full lg:max-w-sm">
            <label htmlFor={`reason-${claim.id}`} className="text-small font-medium text-ink-soft">เหตุผล (จำเป็นเมื่อไม่อนุมัติ/ส่งกลับ)</label>
            <textarea
              id={`reason-${claim.id}`}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={3}
              className="mt-1 w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2 text-body text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="เช่น ใบเสร็จไม่ชัดเจน / กรุณาระบุโรงพยาบาล"
            />
            <div className="mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <Button variant="primary" size="sm" leadingIcon={<CheckCircle2 size={14} />} onClick={() => approve(claim.id, 'อนุมัติโดย SPD')}>
                อนุมัติ
              </Button>
              <Button variant="ghost" size="sm" leadingIcon={<RotateCcw size={14} />} disabled={!reason.trim()} onClick={() => sendBack(claim.id, reason.trim())}>
                ส่งกลับแก้ไข
              </Button>
              <Button variant="ghost" size="sm" leadingIcon={<XCircle size={14} />} disabled={!reason.trim()} onClick={() => reject(claim.id, reason.trim())}>
                ไม่อนุมัติ
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function BenefitClaimsInbox() {
  const claims = useBenefitClaimsStore((s) => s.claims);
  const pending = claims.filter((claim) => claim.status === 'pending_spd');
  const history = claims.filter((claim) => claim.status !== 'pending_spd').slice(0, 6);

  return (
    <section className="space-y-4">
      <div>
        <CardEyebrow>Benefit Reimbursement</CardEyebrow>
        <h2 className="mt-1 font-display text-[20px] font-semibold text-ink">กล่องอนุมัติคำขอเบิกสวัสดิการ</h2>
        <p className="mt-1 text-small text-ink-muted">SPD ตรวจสอบใบเสร็จ ส่งกลับแก้ไข หรืออนุมัติก่อนเข้าสู่รอบจ่ายเงิน</p>
      </div>

      {claims.length === 0 ? (
        <Card variant="raised" size="lg" className="text-center">
          <AlertCircle className="mx-auto h-6 w-6 text-ink-muted" aria-hidden />
          <p className="mt-2 text-body text-ink-muted">ยังไม่มีคำขอเบิกสวัสดิการ</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {pending.map((claim) => <ClaimCard key={claim.id} claim={claim} />)}
          {history.length > 0 && (
            <div className="space-y-3">
              <CardEyebrow>ประวัติล่าสุด</CardEyebrow>
              {history.map((claim) => <ClaimCard key={claim.id} claim={claim} />)}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

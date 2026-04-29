'use client';

import { useState } from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/humi';
import {
  BENEFIT_STATUS_LABEL,
  BENEFIT_TYPE_LABEL,
  useBenefitClaimsStore,
  type BenefitClaimRequest,
} from '@/stores/benefit-claims';

export function BenefitClaimsInbox() {
  const claims = useBenefitClaimsStore((state) => state.claims);
  const approve = useBenefitClaimsStore((state) => state.approve);
  const reject = useBenefitClaimsStore((state) => state.reject);
  const sendBack = useBenefitClaimsStore((state) => state.sendBack);
  const [reasonById, setReasonById] = useState<Record<string, string>>({});

  const pending = claims.filter((claim) => claim.status === 'pending_spd');
  const history = claims.filter((claim) => claim.status !== 'pending_spd');

  function reasonFor(id: string) {
    return reasonById[id]?.trim() ?? '';
  }

  function setReason(id: string, value: string) {
    setReasonById((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <section className="humi-card" aria-label="Benefit Reimbursement inbox">
      <div className="humi-row" style={{ justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <div>
          <div className="humi-eyebrow">Benefit Reimbursement</div>
          <h2 className="font-display text-[20px] font-semibold text-ink">สวัสดิการรอ SPD ตรวจสอบ</h2>
          <p className="text-small text-ink-muted mt-1">อนุมัติ ปฏิเสธ หรือส่งกลับให้พนักงานแก้ไข โดยเก็บ audit trail และสถานะคำร้อง</p>
        </div>
        <span className="humi-tag humi-tag--butter">{pending.length} pending</span>
      </div>

      <div className="mt-4 grid gap-3">
        {pending.length === 0 ? (
          <p className="rounded-[var(--radius-md)] bg-canvas-soft px-4 py-5 text-center text-small text-ink-muted">ไม่มีคำขอเบิกสวัสดิการที่รอตรวจสอบ</p>
        ) : (
          pending.map((claim) => (
            <BenefitClaimCard
              key={claim.id}
              claim={claim}
              reason={reasonById[claim.id] ?? ''}
              onReasonChange={(value) => setReason(claim.id, value)}
              onApprove={() => approve(claim.id, { name: 'SPD Benefits' }, reasonFor(claim.id) || undefined)}
              onReject={() => reasonFor(claim.id) && reject(claim.id, { name: 'SPD Benefits' }, reasonFor(claim.id))}
              onSendBack={() => reasonFor(claim.id) && sendBack(claim.id, { name: 'SPD Benefits' }, reasonFor(claim.id))}
            />
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-6 border-t border-hairline-soft pt-4">
          <div className="humi-eyebrow mb-2">ประวัติ Benefit Reimbursement</div>
          <div className="grid gap-2">
            {history.slice(0, 6).map((claim) => (
              <div key={claim.id} className="humi-row-item">
                <div>
                  <div className="text-body font-semibold text-ink">{claim.workflowRequestId} · {claim.employeeName}</div>
                  <div className="text-small text-ink-muted">{BENEFIT_TYPE_LABEL[claim.claimType]} · {claim.receiptNo}</div>
                </div>
                <span className="humi-tag bg-canvas-soft text-ink-muted">{BENEFIT_STATUS_LABEL[claim.status]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function BenefitClaimCard({
  claim,
  reason,
  onReasonChange,
  onApprove,
  onReject,
  onSendBack,
}: {
  claim: BenefitClaimRequest;
  reason: string;
  onReasonChange: (value: string) => void;
  onApprove: () => void;
  onReject: () => void;
  onSendBack: () => void;
}) {
  return (
    <article className="rounded-[var(--radius-lg)] border border-hairline bg-surface p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-body font-semibold text-ink">{claim.workflowRequestId} · {claim.employeeName}</div>
          <div className="mt-1 text-small text-ink-muted">
            {BENEFIT_TYPE_LABEL[claim.claimType]} · {claim.receiptNo} · ฿{claim.claimAmount.toLocaleString('th-TH')}
          </div>
          <div className="mt-1 text-small text-ink-muted">
            {claim.company} / {claim.businessUnit} · {claim.employeeGroup} · {claim.personalGrade}
          </div>
        </div>
        <span className="humi-tag humi-tag--butter">{BENEFIT_STATUS_LABEL[claim.status]}</span>
      </div>

      <div className="mt-3 grid gap-2 text-small text-ink-muted md:grid-cols-2">
        <div>Benefit code: <span className="font-medium text-ink">{claim.benefitCode}</span></div>
        <div>Receipt date: <span className="font-medium text-ink">{claim.receiptDate}</span></div>
        {claim.hospitalName ? <div>Hospital: <span className="font-medium text-ink">{claim.hospitalName}</span></div> : null}
        {claim.diseaseDetails ? <div>Disease details: <span className="font-medium text-ink">{claim.diseaseDetails}</span></div> : null}
        <div>Attachments: <span className="font-medium text-ink">{claim.attachments.map((a) => a.filename).join(', ') || 'ไม่มี'}</span></div>
      </div>

      <label className="mt-4 flex flex-col gap-1.5 text-small font-medium text-ink-soft">
        เหตุผล (จำเป็นเมื่อปฏิเสธหรือส่งกลับ)
        <textarea value={reason} onChange={(event) => onReasonChange(event.target.value)} className="min-h-[76px] rounded-[var(--radius-sm)] border border-hairline bg-canvas-soft px-3 py-2 text-body text-ink" />
      </label>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button variant="primary" leadingIcon={<Check size={14} />} onClick={onApprove} className="sm:w-auto">อนุมัติ</Button>
        <Button variant="secondary" leadingIcon={<RotateCcw size={14} />} onClick={onSendBack} disabled={!reason.trim()} className="sm:w-auto">ส่งกลับแก้ไข</Button>
        <Button variant="ghost" leadingIcon={<X size={14} />} onClick={onReject} disabled={!reason.trim()} className="sm:w-auto">ปฏิเสธ</Button>
      </div>
    </article>
  );
}

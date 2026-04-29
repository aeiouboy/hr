'use client';

import { useMemo, useState } from 'react';
import { Check, Clock, Paperclip, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/humi';
import { useAuthStore } from '@/stores/auth-store';
import { BENEFIT_STATUS_LABEL, BENEFIT_TYPE_LABEL, useBenefitClaimsStore, type BenefitClaimRequest } from '@/stores/benefit-claims';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function BenefitClaimsInbox() {
  const claims = useBenefitClaimsStore((s) => s.claims);
  const approveClaim = useBenefitClaimsStore((s) => s.approveClaim);
  const rejectClaim = useBenefitClaimsStore((s) => s.rejectClaim);
  const sendBackClaim = useBenefitClaimsStore((s) => s.sendBackClaim);
  const actorName = useAuthStore((s) => s.username) ?? 'SPD Benefits';

  const pending = useMemo(() => claims.filter((claim) => claim.status === 'pending_spd'), [claims]);
  const history = useMemo(() => claims.filter((claim) => claim.status !== 'pending_spd').slice(0, 5), [claims]);

  const actor = { role: 'spd' as const, name: actorName };

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">Benefit Reimbursement — SPD</h1>
        <p className="text-small text-ink-muted mt-1">ตรวจคำขอเบิกสวัสดิการจาก Employee Self Service พร้อม approve / reject / send back</p>
      </div>

      <div className="humi-row" style={{ gap: 12, flexWrap: 'wrap' }}>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}><Clock size={10} className="inline mr-1" aria-hidden />รอ SPD</div>
          <div className="text-body font-semibold text-ink">{pending.length} รายการ</div>
        </div>
        <div className="humi-card humi-card--cream" style={{ padding: '10px 16px', minWidth: 140 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>ประวัติ</div>
          <div className="text-body font-semibold text-ink">{history.length} รายการ</div>
        </div>
      </div>

      <section>
        <div className="humi-eyebrow" style={{ marginBottom: 10 }}>คำขอเบิกสวัสดิการรออนุมัติ</div>
        {pending.length === 0 ? (
          <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 40 }}>
            <p className="text-body text-ink-muted">ไม่มีคำขอเบิกสวัสดิการรอ SPD</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pending.map((claim) => (
              <BenefitClaimCard
                key={claim.id}
                claim={claim}
                onApprove={(note) => approveClaim(claim.id, actor, note)}
                onReject={(reason) => rejectClaim(claim.id, actor, reason)}
                onSendBack={(reason) => sendBackClaim(claim.id, actor, reason)}
              />
            ))}
          </div>
        )}
      </section>

      {history.length > 0 && (
        <section>
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>ประวัติล่าสุด</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {history.map((claim) => (
              <div key={claim.id} className="humi-card humi-card--cream" style={{ padding: '10px 14px' }}>
                <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="text-small font-medium text-ink" style={{ flex: 1 }}>{claim.workflowRequestId} — {claim.employeeName} — {claim.benefitName}</span>
                  <span className="humi-tag">{BENEFIT_STATUS_LABEL[claim.status]}</span>
                  <span className="text-small text-ink-muted">{formatDate(claim.updatedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function BenefitClaimCard({ claim, onApprove, onReject, onSendBack }: { claim: BenefitClaimRequest; onApprove: (note?: string) => void; onReject: (reason: string) => void; onSendBack: (reason: string) => void }) {
  const [mode, setMode] = useState<'none' | 'approve' | 'reject' | 'send_back'>('none');
  const [comment, setComment] = useState('');

  function submitAction() {
    const trimmed = comment.trim();
    if (mode === 'approve') onApprove(trimmed || undefined);
    if (mode === 'reject' && trimmed) onReject(trimmed);
    if (mode === 'send_back' && trimmed) onSendBack(trimmed);
    if (mode !== 'none' && (mode === 'approve' || trimmed)) {
      setMode('none');
      setComment('');
    }
  }

  return (
    <div className="humi-card" style={{ padding: 18 }}>
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 2 }}>{claim.workflowRequestId} · {claim.id}</div>
          <div className="text-body font-semibold text-ink">{BENEFIT_TYPE_LABEL[claim.benefitType]} — {claim.employeeName}</div>
          <div className="text-small text-ink-muted mt-0.5">{claim.employeeId} · ส่งเมื่อ {formatDate(claim.submittedAt)} · {claim.company}/{claim.businessUnit}</div>
        </div>
        <span className="humi-tag humi-tag--butter">{BENEFIT_STATUS_LABEL[claim.status]}</span>
      </div>

      <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>รายละเอียดคำขอ</div>
        <dl className="grid gap-2 md:grid-cols-2 text-small">
          <Info label="Benefit code" value={claim.benefitCode} />
          <Info label="ใบเสร็จ/เลขที่เอกสาร" value={claim.receiptNo} />
          <Info label="วันที่เอกสาร" value={claim.receiptDate} />
          <Info label="จำนวนเงินขอเบิก" value={`฿${claim.totalClaimAmount.toLocaleString('th-TH')}`} />
          <Info label="โรงพยาบาล" value={claim.hospitalName ?? '-'} />
          <Info label="รายละเอียดโรค/การรักษา" value={claim.diseaseDetails ?? '-'} />
        </dl>
      </div>

      <div style={{ marginTop: 12, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 12 }}>
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}><Paperclip size={11} className="inline mr-1" aria-hidden />เอกสารแนบ ({claim.attachments.length})</div>
        {claim.attachments.length === 0 ? <p className="text-small text-ink-muted">ไม่มีเอกสารแนบ</p> : claim.attachments.map((file) => (
          <div key={file.id} className="text-small text-ink" style={{ padding: '6px 10px', background: 'var(--color-canvas-soft)', borderRadius: 8 }}>{file.filename} · {file.sizeMb} MB</div>
        ))}
      </div>

      {mode === 'none' ? (
        <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
          <Button variant="ghost" size="sm" onClick={() => { setMode('send_back'); setComment(''); }}><RotateCcw size={14} aria-hidden />ส่งกลับแก้ไข</Button>
          <Button variant="ghost" size="sm" onClick={() => { setMode('reject'); setComment(''); }}><X size={14} aria-hidden />ปฏิเสธ</Button>
          <Button variant="primary" size="sm" onClick={() => { setMode('approve'); setComment(''); }}><Check size={14} aria-hidden />อนุมัติ</Button>
        </div>
      ) : (
        <div style={{ marginTop: 14, borderTop: '1px solid var(--color-hairline-soft)', paddingTop: 14 }}>
          <label className="humi-label" htmlFor={`${claim.id}-benefit-comment`}>{mode === 'approve' ? 'หมายเหตุ (ไม่บังคับ)' : 'เหตุผล *'}</label>
          <textarea id={`${claim.id}-benefit-comment`} value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="humi-input" style={{ width: '100%', minHeight: 80 }} />
          <div className="humi-row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
            <Button variant="ghost" size="sm" onClick={() => { setMode('none'); setComment(''); }}>ยกเลิก</Button>
            <Button variant={mode === 'approve' ? 'primary' : 'secondary'} size="sm" onClick={submitAction} disabled={mode !== 'approve' && !comment.trim()}>ยืนยัน</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div style={{ padding: '6px 10px', background: 'var(--color-canvas-soft)', borderRadius: 8 }}><dt className="text-ink-muted">{label}</dt><dd className="font-medium text-ink">{value}</dd></div>;
}

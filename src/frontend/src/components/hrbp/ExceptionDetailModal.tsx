'use client';

// STA-27 PR-B — ExceptionDetailModal
// Full detail view for a BenefitExceptionRecord.
// Bottom action: <ApproveTriadButtons onApprove onReject hideSendBack hideUpdate>
// Reject triggers inline confirmation with required note ≥10 chars.
// Reuses <AuditTimeline actorRole='hrbp'> from STA-28 PR-C.

import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBenefitExceptionStore } from '@/stores/benefit-exception-store';
import type { BenefitExceptionRecord } from '@/stores/benefit-exception-store';
import { AuditTimeline } from '@/components/manager/benefits/AuditTimeline';
import { ApproveTriadButtons } from '@/components/manager/benefits/ApproveTriadButtons';
import { useHrbpScope } from '@/hooks/use-hrbp-scope';

// ── Type labels (same as ExceptionsQueue — kept local to avoid shared-state coupling) ──

const TYPE_LABEL_TH: Record<string, string> = {
  foreigner_spouse: 'คู่สมรสต่างชาติ',
  cfr_skt_override: 'CFR/SKT Override',
  borrow_forward:   'ยืมสิทธิ์ล่วงหน้า',
  manual_override:  'Override อื่นๆ',
};

const TYPE_LABEL_EN: Record<string, string> = {
  foreigner_spouse: 'Foreign Spouse',
  cfr_skt_override: 'CFR/SKT Override',
  borrow_forward:   'Borrow Forward',
  manual_override:  'Manual Override',
};

const TYPE_CHIP_STYLE: Record<string, string> = {
  foreigner_spouse: 'bg-info-tint text-info border border-info/20',
  cfr_skt_override: 'bg-warning-soft text-warning border border-warning/20',
  borrow_forward:   'bg-accent-soft text-accent border border-accent/20',
  manual_override:  'bg-canvas-soft text-ink-muted border border-hairline',
};

// ── Props ─────────────────────────────────────────────────────────────────────

interface ExceptionDetailModalProps {
  record: BenefitExceptionRecord;
  isTh: boolean;
  onClose: () => void;
}

// ── Detail row helper ─────────────────────────────────────────────────────────

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="text-sm text-ink">{children}</dd>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ExceptionDetailModal({ record, isTh, onClose }: ExceptionDetailModalProps) {
  const { hrbpApproveException, hrbpRejectException, exceptions } = useBenefitExceptionStore();
  const { hrbpName } = useHrbpScope();

  // Always read latest record from store so status + audit updates live-reflect
  const liveRecord = exceptions.find((e) => e.id === record.id) ?? record;

  const [busy, setBusy] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [rejectNote, setRejectNote] = useState('');

  const isPending = liveRecord.status === 'pending_hrbp';
  const typeLabel = isTh ? TYPE_LABEL_TH : TYPE_LABEL_EN;

  // Paired record (borrow-forward)
  const pairedRecord = liveRecord.pairedRecordId
    ? exceptions.find((e) => e.id === liveRecord.pairedRecordId)
    : null;

  async function handleApprove() {
    setBusy(true);
    await hrbpApproveException(liveRecord.id, hrbpName);
    setBusy(false);
  }

  async function handleRejectConfirm() {
    if (rejectNote.trim().length < 10) return;
    setBusy(true);
    await hrbpRejectException(liveRecord.id, hrbpName, rejectNote.trim());
    setBusy(false);
    setShowRejectConfirm(false);
    setRejectNote('');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isTh ? 'รายละเอียดข้อยกเว้น' : 'Exception detail'}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col overflow-hidden bg-surface shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-hairline px-6 py-4">
          <div>
            <p className="text-xs text-ink-muted">{liveRecord.id}</p>
            <h2 className="mt-0.5 text-lg font-semibold text-ink">
              {isTh ? 'รายละเอียดข้อยกเว้น' : 'Exception Detail'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isTh ? 'ปิด' : 'Close'}
            className="rounded-[var(--radius-sm)] p-1.5 text-ink-muted hover:bg-canvas-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Type chip + status */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold',
                TYPE_CHIP_STYLE[liveRecord.exceptionType],
              )}
            >
              {typeLabel[liveRecord.exceptionType]}
            </span>
            <span
              className={cn(
                'inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold',
                liveRecord.status === 'pending_hrbp'
                  ? 'bg-warning-soft text-warning border border-warning/20'
                  : liveRecord.status === 'approved'
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-danger/10 text-danger border border-danger/20',
              )}
            >
              {liveRecord.status === 'pending_hrbp'
                ? (isTh ? 'รอ HRBP' : 'Pending HRBP')
                : liveRecord.status === 'approved'
                  ? (isTh ? 'อนุมัติแล้ว' : 'Approved')
                  : (isTh ? 'ปฏิเสธแล้ว' : 'Rejected')}
            </span>
          </div>

          {/* Employee block */}
          <div className="mb-5 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {isTh ? 'ข้อมูลพนักงาน' : 'Employee'}
            </p>
            <dl className="grid grid-cols-2 gap-3">
              <DetailRow label={isTh ? 'ชื่อ' : 'Name'}>
                {liveRecord.employeeName}
              </DetailRow>
              <DetailRow label={isTh ? 'แผนก' : 'Department'}>
                {liveRecord.department}
              </DetailRow>
              <DetailRow label={isTh ? 'รหัสพนักงาน' : 'Employee ID'}>
                {liveRecord.employeeId}
              </DetailRow>
              {liveRecord.claimId && (
                <DetailRow label={isTh ? 'เลขที่คำขอ' : 'Claim ID'}>
                  {liveRecord.claimId}
                </DetailRow>
              )}
            </dl>
          </div>

          {/* Plan info */}
          <div className="mb-5 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {isTh ? 'แผนสวัสดิการ' : 'Benefit Plan'}
            </p>
            <dl className="grid grid-cols-2 gap-3">
              <DetailRow label={isTh ? 'รหัสแผน' : 'Plan code'}>
                {liveRecord.benefitCode}
              </DetailRow>
              <DetailRow label={isTh ? 'ชื่อแผน' : 'Plan name'}>
                {liveRecord.benefitName}
              </DetailRow>
              {liveRecord.amount != null && (
                <DetailRow label={isTh ? 'จำนวนเงิน' : 'Amount'}>
                  <span
                    className={cn(
                      'font-semibold tabular-nums',
                      liveRecord.amount >= 0 ? 'text-success' : 'text-danger',
                    )}
                  >
                    {liveRecord.amount >= 0 ? '+' : ''}
                    {liveRecord.amount.toLocaleString()}
                    {isTh ? ' ฿' : ' THB'}
                  </span>
                </DetailRow>
              )}
            </dl>
          </div>

          {/* Request context */}
          <div className="mb-5 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {isTh ? 'รายละเอียดคำขอ' : 'Request context'}
            </p>
            <dl className="flex flex-col gap-3">
              <DetailRow label={isTh ? 'ยื่นโดย' : 'Requested by'}>
                {liveRecord.requestedBy}
              </DetailRow>
              <DetailRow label={isTh ? 'วันที่ยื่น' : 'Requested at'}>
                {new Date(liveRecord.requestedAt).toLocaleString(isTh ? 'th-TH' : 'en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </DetailRow>
              <DetailRow label={isTh ? 'เหตุผล' : 'Reason'}>
                <span className="text-sm leading-relaxed text-ink">{liveRecord.reason}</span>
              </DetailRow>
            </dl>
          </div>

          {/* Borrow-forward paired record link — AC-9 */}
          {pairedRecord && (
            <div className="mb-5 rounded-[var(--radius-md)] border border-accent/30 bg-accent-soft p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                {isTh ? 'รายการคู่ (ยืมสิทธิ์ล่วงหน้า)' : 'Paired record (borrow-forward)'}
              </p>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium text-ink">
                    <span
                      className={cn(
                        'mr-2 inline-block font-bold',
                        (pairedRecord.amount ?? 0) >= 0 ? 'text-success' : 'text-danger',
                      )}
                    >
                      {(pairedRecord.amount ?? 0) >= 0 ? '+' : '−'}
                      {Math.abs(pairedRecord.amount ?? 0).toLocaleString()}
                      {isTh ? ' ฿' : ' THB'}
                    </span>
                    {pairedRecord.benefitName}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">
                    {pairedRecord.id} · {pairedRecord.employeeName}
                  </div>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-semibold',
                    pairedRecord.status === 'pending_hrbp'
                      ? 'bg-warning-soft text-warning border border-warning/20'
                      : pairedRecord.status === 'approved'
                        ? 'bg-success/10 text-success border border-success/20'
                        : 'bg-danger/10 text-danger border border-danger/20',
                  )}
                >
                  <ExternalLink className="h-3 w-3" aria-hidden />
                  {pairedRecord.id}
                </span>
              </div>
            </div>
          )}

          {/* Audit timeline — reuses STA-28 PR-C component */}
          <div className="mb-4">
            <AuditTimeline entries={liveRecord.audit} isTh={isTh} />
          </div>
        </div>

        {/* Footer — action buttons (only shown when pending) */}
        {isPending && (
          <div className="border-t border-hairline px-6 py-4">
            {showRejectConfirm ? (
              /* Rejection confirmation sub-panel */
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-ink">
                  {isTh ? 'ระบุเหตุผลการปฏิเสธ' : 'Enter rejection reason'}
                </p>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  rows={3}
                  placeholder={
                    isTh
                      ? 'กรุณาระบุเหตุผลอย่างน้อย 10 ตัวอักษร...'
                      : 'Please provide at least 10 characters...'
                  }
                  className="w-full resize-none rounded-[var(--radius-sm)] border border-hairline bg-canvas-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                />
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'text-xs tabular-nums',
                      rejectNote.trim().length >= 10 ? 'text-success' : 'text-ink-muted',
                    )}
                  >
                    {rejectNote.trim().length} / 10{isTh ? ' ตัวอักษร' : ' chars'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setShowRejectConfirm(false); setRejectNote(''); }}
                      disabled={busy}
                      className="rounded-[var(--radius-sm)] border border-hairline bg-surface px-3 py-1.5 text-sm font-medium text-ink hover:bg-surface-raised disabled:opacity-50"
                    >
                      {isTh ? 'ยกเลิก' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectConfirm}
                      disabled={busy || rejectNote.trim().length < 10}
                      className="rounded-[var(--radius-sm)] bg-danger px-3 py-1.5 text-sm font-medium text-white hover:bg-danger/90 disabled:opacity-50"
                    >
                      {busy
                        ? (isTh ? 'กำลังบันทึก...' : 'Saving...')
                        : (isTh ? 'ยืนยันปฏิเสธ' : 'Confirm reject')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <ApproveTriadButtons
                isTh={isTh}
                disabled={busy}
                hideSendBack
                hideUpdate
                onApprove={handleApprove}
                onSendBack={() => {}}
                onUpdate={() => {}}
                onReject={() => setShowRejectConfirm(true)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

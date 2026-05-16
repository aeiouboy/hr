'use client';

/**
 * STA-28 PR-C — /workflows/benefit-claim/[id]
 * Manager benefit-claim detail page: full claim info + ApproveTriad + ImpactPreview + AuditTimeline.
 *
 * Q10 Decision = Option A: entitlement is auto-restored immediately on Send Back.
 * Documented in store: benefit-claims.ts > managerSendBack action.
 *
 * Phase: UI mockup — all async is mock (setTimeout 300ms), no real API.
 */

import { use, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Image,
  Paperclip,
  User,
} from 'lucide-react';

import { useBenefitClaimsStore, BENEFIT_STATUS_LABEL, type BenefitClaimStatus } from '@/stores/benefit-claims';
import { ApproveTriadButtons } from '@/components/manager/benefits/ApproveTriadButtons';
import { SLABadge } from '@/components/manager/benefits/SLABadge';
import { WorkflowParticipantsPopover, type WorkflowParticipant } from '@/components/manager/benefits/WorkflowParticipantsPopover';
import { ClaimEntitlementImpactPreview } from '@/components/manager/benefits/ClaimEntitlementImpactPreview';
import { AuditTimeline } from '@/components/manager/benefits/AuditTimeline';
import { cn } from '@/lib/utils';

// ── Status chip ───────────────────────────────────────────────────────────────

const STATUS_CHIP_STYLE: Record<BenefitClaimStatus, string> = {
  pending_manager_approval: 'bg-warning-soft text-warning border border-warning/20',
  pending_spd:              'bg-accent-soft text-accent border border-accent/20',
  send_back:                'bg-canvas-soft text-ink-muted border border-hairline',
  approved:                 'bg-success-soft text-success border border-success/20',
  rejected:                 'bg-danger-soft border border-danger/20',
};

const STATUS_LABEL_EN: Record<BenefitClaimStatus, string> = {
  pending_manager_approval: 'Pending manager approval',
  pending_spd:              'Pending SPD approval',
  send_back:                'Sent back',
  approved:                 'Approved',
  rejected:                 'Rejected',
};

// ── File icon helper ──────────────────────────────────────────────────────────

function AttachmentIcon({ filename }: { filename: string }) {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.pdf')) return <FileText className="h-4 w-4 text-ink-muted shrink-0" />;
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) {
    return <Image className="h-4 w-4 text-ink-muted shrink-0" />;
  }
  return <Paperclip className="h-4 w-4 text-ink-muted shrink-0" />;
}

// ── Confirmation modal ────────────────────────────────────────────────────────

interface ConfirmModalProps {
  open: boolean;
  isTh: boolean;
  /** 'approve' | 'send_back' */
  mode: 'approve' | 'send_back';
  onClose: () => void;
  onConfirm: (note: string) => void;
  loading: boolean;
}

function ConfirmModal({ open, isTh, mode, onClose, onConfirm, loading }: ConfirmModalProps) {
  const [note, setNote] = useState('');
  const isApprove = mode === 'approve';
  const noteValid = isApprove || note.trim().length >= 10;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-md rounded-[var(--radius-lg)] border border-hairline bg-surface shadow-[var(--shadow-card)] p-6 space-y-4">
        <h2 className="text-base font-semibold text-ink">
          {isApprove
            ? (isTh ? 'ยืนยันการอนุมัติ' : 'Confirm approval')
            : (isTh ? 'ส่งกลับแก้ไข' : 'Send back for revision')}
        </h2>
        <p className="text-sm text-ink-muted">
          {isApprove
            ? (isTh
                ? 'คำขอจะถูกส่งต่อให้ทีม SPD เพื่ออนุมัติขั้นสุดท้าย'
                : 'The claim will be forwarded to SPD for final approval.')
            : (isTh
                ? 'กรุณาระบุเหตุผลที่ส่งกลับ (อย่างน้อย 10 ตัวอักษร)'
                : 'Please provide a reason for sending back (min 10 characters).')}
        </p>

        {/* Send-back note field (M-SB-01) */}
        {!isApprove && (
          <div>
            <label className="block text-xs font-semibold text-ink-soft mb-1">
              {isTh ? 'ระบุเหตุผลที่ส่งกลับ' : 'Reason for send back'}
              <span className="text-danger ml-1">*</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={isTh ? 'เช่น เอกสารไม่ครบ...' : 'e.g. Incomplete documentation...'}
              className="w-full rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
            />
            <p className={cn('mt-1 text-xs', note.trim().length >= 10 ? 'text-ink-muted' : 'text-danger')}>
              {note.trim().length}/10{isTh ? ' ตัวอักษรขั้นต่ำ' : ' characters minimum'}
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:bg-surface-raised transition disabled:opacity-50"
          >
            {isTh ? 'ยกเลิก' : 'Cancel'}
          </button>
          <button
            type="button"
            disabled={!noteValid || loading}
            onClick={() => onConfirm(note)}
            className={cn(
              'rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50 disabled:pointer-events-none',
              isApprove
                ? 'bg-success hover:bg-success/90'
                : 'bg-warning hover:bg-warning/90',
            )}
          >
            {loading
              ? (isTh ? 'กำลังดำเนินการ…' : 'Processing…')
              : isApprove
                ? (isTh ? 'ยืนยันอนุมัติ' : 'Confirm approve')
                : (isTh ? 'ส่งกลับ' : 'Send back')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Field row ─────────────────────────────────────────────────────────────────

function FieldRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-hairline last:border-0">
      <span className="w-40 shrink-0 text-xs text-ink-muted">{label}</span>
      <span className="text-sm text-ink">{value}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

const MANAGER_NAME = 'ผู้จัดการ / Manager'; // Demo manager name for mock actions

export default function BenefitClaimDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const locale = useLocale();
  const isTh = locale !== 'en';
  const router = useRouter();

  const claim = useBenefitClaimsStore((s) => s.claims.find((c) => c.id === id));
  const managerApprove = useBenefitClaimsStore((s) => s.managerApprove);
  const managerSendBack = useBenefitClaimsStore((s) => s.managerSendBack);

  const [modalMode, setModalMode] = useState<'approve' | 'send_back' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = useCallback(async () => {
    setLoading(true);
    await managerApprove(id, MANAGER_NAME);
    setLoading(false);
    setModalMode(null);
  }, [id, managerApprove]);

  const handleSendBack = useCallback(async (note: string) => {
    setLoading(true);
    await managerSendBack(id, MANAGER_NAME, note);
    setLoading(false);
    setModalMode(null);
  }, [id, managerSendBack]);

  // ── Not found ──────────────────────────────────────────────────────────────

  if (!claim) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-ink">
          {isTh ? 'ไม่พบคำขอ' : 'Claim not found'}
        </p>
        <p className="text-sm text-ink-muted">
          {isTh ? `ไม่พบคำขอรหัส ${id}` : `No claim found with ID ${id}`}
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-2 text-sm font-medium text-ink-muted hover:bg-surface-raised transition"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          {isTh ? 'กลับ' : 'Back'}
        </button>
      </div>
    );
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const isPendingManager = claim.status === 'pending_manager_approval';
  // Entitlement: treat (originalRemainingAmount ?? remainingAmount) as the ceiling proxy
  const entitlementCeiling = (claim.originalRemainingAmount ?? claim.remainingAmount) + claim.totalClaimAmount;
  const usedBefore = entitlementCeiling - (claim.originalRemainingAmount ?? claim.remainingAmount);

  const participants: WorkflowParticipant[] = [
    { role: 'employee', name: claim.employeeName, status: 'completed' },
    {
      role: 'manager',
      name: MANAGER_NAME,
      status:
        claim.status === 'pending_manager_approval'
          ? 'pending'
          : claim.status === 'send_back'
            ? 'pending'
            : 'completed',
    },
    {
      role: 'spd',
      name: 'ทีม SPD Benefits',
      status:
        claim.status === 'approved'
          ? 'completed'
          : claim.status === 'pending_spd'
            ? 'pending'
            : 'skipped',
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-ink-muted" aria-label="breadcrumb">
          <Link href={`/${locale}`} className="hover:text-ink transition">
            {isTh ? 'หน้าหลัก' : 'Home'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <Link href={`/${locale}/quick-approve`} className="hover:text-ink transition">
            {isTh ? 'คำขอรออนุมัติ' : 'Pending approvals'}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="text-ink font-medium">{claim.id}</span>
        </nav>

        {/* Header card */}
        <div className="rounded-[var(--radius-lg)] border border-hairline bg-surface shadow-[var(--shadow-card)] p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-ink-muted">{claim.id}</span>
                <span
                  className={cn(
                    'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-semibold',
                    STATUS_CHIP_STYLE[claim.status],
                  )}
                  style={claim.status === 'rejected' ? { color: 'var(--color-danger)' } : undefined}
                >
                  {isTh ? BENEFIT_STATUS_LABEL[claim.status] : STATUS_LABEL_EN[claim.status]}
                </span>
              </div>
              <h1 className="text-lg font-bold text-ink">{claim.benefitName}</h1>
              <p className="text-sm text-ink-muted">{claim.benefitCode}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <SLABadge submittedAt={claim.submittedAt} slaHours={72} isTh={isTh} />
              <WorkflowParticipantsPopover participants={participants} isTh={isTh} />
            </div>
          </div>
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — claim details ~60% */}
          <div className="lg:col-span-3 space-y-4">
            {/* Employee block */}
            <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {isTh ? 'ข้อมูลพนักงาน' : 'Employee'}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <User className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{claim.employeeName}</p>
                  <p className="text-xs text-ink-muted">{claim.businessUnit} · {claim.personalGrade}</p>
                </div>
                <Link
                  href={`/${locale}/profile/${claim.employeeId}`}
                  className="ml-auto text-xs text-accent hover:underline"
                >
                  {isTh ? 'ดูโปรไฟล์' : 'View profile'}
                </Link>
              </div>
              <div className="text-xs text-ink-muted space-y-0.5">
                <div className="flex gap-2">
                  <span className="w-28 shrink-0">{isTh ? 'บริษัท' : 'Company'}</span>
                  <span className="text-ink">{claim.company}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-28 shrink-0">{isTh ? 'กลุ่มพนักงาน' : 'Employee group'}</span>
                  <span className="text-ink">{claim.employeeGroup}</span>
                </div>
              </div>
            </div>

            {/* Submitted fields */}
            <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {isTh ? 'รายละเอียดคำขอ' : 'Claim details'}
              </p>
              <div className="divide-y divide-hairline">
                <FieldRow label={isTh ? 'เลขที่ใบเสร็จ' : 'Receipt no.'} value={claim.receiptNo} />
                <FieldRow
                  label={isTh ? 'วันที่ใบเสร็จ' : 'Receipt date'}
                  value={new Date(claim.receiptDate).toLocaleDateString(isTh ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                />
                <FieldRow
                  label={isTh ? 'จำนวนเงินที่ขอเบิก' : 'Claim amount'}
                  value={<span className="font-semibold">฿{claim.totalClaimAmount.toLocaleString('th-TH')}</span>}
                />
                {claim.hospitalName && (
                  <FieldRow label={isTh ? 'โรงพยาบาล' : 'Hospital'} value={claim.hospitalName} />
                )}
                {claim.opdIpd && (
                  <FieldRow label="OPD / IPD" value={claim.opdIpd} />
                )}
                {claim.hospitalType && (
                  <FieldRow label={isTh ? 'ประเภทโรงพยาบาล' : 'Hospital type'} value={claim.hospitalType} />
                )}
                {claim.patientTransferDocumentNo && (
                  <FieldRow label={isTh ? 'เลขที่เอกสารย้ายโรงพยาบาล' : 'Transfer doc no.'} value={claim.patientTransferDocumentNo} />
                )}
                {claim.diseaseDetails && (
                  <FieldRow label={isTh ? 'รายละเอียดโรค' : 'Disease details'} value={claim.diseaseDetails} />
                )}
                {claim.gasolineClaimType && (
                  <FieldRow label={isTh ? 'ประเภทการเบิกน้ำมัน' : 'Gasoline type'} value={claim.gasolineClaimType} />
                )}
                {claim.dependentName && (
                  <FieldRow label={isTh ? 'ชื่อผู้รับสิทธิ์' : 'Dependent name'} value={claim.dependentName} />
                )}
                {claim.dependentRelationship && (
                  <FieldRow label={isTh ? 'ความสัมพันธ์' : 'Relationship'} value={claim.dependentRelationship} />
                )}
                <FieldRow
                  label={isTh ? 'วันที่ส่ง' : 'Submitted'}
                  value={new Date(claim.submittedAt).toLocaleString(isTh ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                />
                {claim.correctionReason && (
                  <FieldRow label={isTh ? 'เหตุผลที่ส่งกลับ' : 'Send-back reason'} value={claim.correctionReason} />
                )}
              </div>
            </div>

            {/* Attachments */}
            {claim.attachments.length > 0 && (
              <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'เอกสารแนบ' : 'Attachments'}
                  <span className="ml-1.5 font-normal text-ink-muted normal-case tracking-normal">
                    ({claim.attachments.length})
                  </span>
                </p>
                <ul className="space-y-2">
                  {claim.attachments.map((att) => (
                    <li key={att.id} className="flex items-center gap-2 text-sm text-ink">
                      <AttachmentIcon filename={att.filename ?? att.name ?? ''} />
                      <span className="flex-1 truncate">{att.filename ?? att.name}</span>
                      {att.sizeMb != null && (
                        <span className="shrink-0 text-xs text-ink-muted">
                          {att.sizeMb.toFixed(1)} MB
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right sidebar ~40% */}
          <div className="lg:col-span-2 space-y-4">
            <ClaimEntitlementImpactPreview
              usedAmount={usedBefore}
              totalEntitlement={entitlementCeiling}
              claimAmount={claim.totalClaimAmount}
              isTh={isTh}
            />

            {/* Audit timeline */}
            <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
              <AuditTimeline entries={claim.audit} isTh={isTh} />
            </div>
          </div>
        </div>

        {/* Action row */}
        {isPendingManager && (
          <div className="sticky bottom-4 z-30">
            <div className="rounded-[var(--radius-lg)] border border-hairline bg-surface shadow-[var(--shadow-card)] px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-sm text-ink-muted">
                {isTh ? 'รอการพิจารณาของหัวหน้า' : 'Awaiting manager decision'}
              </p>
              <ApproveTriadButtons
                onApprove={() => setModalMode('approve')}
                onSendBack={() => setModalMode('send_back')}
                onUpdate={() => {/* Update action — future scope */}}
                isTh={isTh}
                disabled={loading || modalMode !== null}
                hideSendBack={false}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirmation modals */}
      <ConfirmModal
        open={modalMode === 'approve'}
        isTh={isTh}
        mode="approve"
        onClose={() => setModalMode(null)}
        onConfirm={handleApprove}
        loading={loading}
      />
      <ConfirmModal
        open={modalMode === 'send_back'}
        isTh={isTh}
        mode="send_back"
        onClose={() => setModalMode(null)}
        onConfirm={handleSendBack}
        loading={loading}
      />
    </>
  );
}

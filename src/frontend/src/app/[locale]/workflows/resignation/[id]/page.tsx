'use client';

import { use, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Modal } from '@/components/humi';
import { TerminationRequestSummary } from '@/components/termination/TerminationRequestSummary';
import {
  useTerminationApprovals,
  type TerminationRequest,
} from '@/stores/termination-approvals';
import { formatDate } from '@/lib/date';
import { commitApprovedTermination } from '@/lib/termination-request';
import { useAuthStore } from '@/stores/auth-store';
import { personaTiers } from '@/lib/persona-tiers';

const APPROVER_NAME = 'ผู้จัดการ / Manager';
const HR_ADMIN_NAME = 'ผู้ดูแลระบบ HR / HR Admin';

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

// ── Avatar initials ────────────────────────────────────────────────────────────
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function daysBetween(fromIso: string, toIso: string): number {
  const ms = new Date(toIso).getTime() - new Date(fromIso).getTime();
  return Math.round(ms / 86400000);
}

// ── Eyebrow ─────────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
      {children}
    </div>
  );
}

// ── Process timeline step ────────────────────────────────────────────────────────
type StepState = 'done' | 'current' | 'pending';
function ProcessStep({
  n,
  title,
  sub,
  state,
  last,
}: {
  n: number;
  title: string;
  sub: string;
  state: StepState;
  last?: boolean;
}) {
  const dotClass =
    state === 'done'
      ? 'bg-success text-white border-success'
      : state === 'current'
        ? 'bg-accent text-white border-accent'
        : 'bg-surface text-ink-muted border-hairline';
  const titleClass =
    state === 'current' ? 'text-ink' : state === 'done' ? 'text-ink-soft' : 'text-ink-muted';
  return (
    <div className="grid grid-cols-[28px_1fr] gap-3">
      <div className="relative flex justify-center">
        <div
          className={`z-10 flex h-7 w-7 items-center justify-center rounded-full border font-display text-xs font-bold ${dotClass}`}
        >
          {state === 'done' ? <Check className="h-3.5 w-3.5" /> : n}
        </div>
        {!last && (
          <div className="absolute left-1/2 top-7 -bottom-2.5 w-0.5 -translate-x-1/2 bg-hairline" />
        )}
      </div>
      <div className="pb-4">
        <div className={`text-sm font-semibold ${titleClass}`}>{title}</div>
        <div className="mt-0.5 text-xs text-ink-muted">{sub}</div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────────
export default function ResignationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const locale = useLocale();
  const isTh = locale !== 'en';
  const router = useRouter();

  const request = useTerminationApprovals((s) =>
    s.requests.find((r) => r.id === id),
  ) as TerminationRequest | undefined;
  const approveByManager = useTerminationApprovals((s) => s.approveByManager);
  const approveByHrAdmin = useTerminationApprovals((s) => s.approve);
  const sendBackRequest = useTerminationApprovals((s) => s.sendBack);

  // Step 2 (pending_spd — "HR Admin handling" per the offboarding timeline)
  // needs its own actor gate: the page previously only ever recognized the
  // manager step, so HR Admin could never act here even after switching
  // persona. Mirrors the tier-gate pattern from workflows/probation/[id].
  const viewerRoles = useAuthStore((s) => s.roles);
  const viewerName = useAuthStore((s) => s.username);
  const viewerTiers = personaTiers(viewerRoles);
  const isManagerViewer = viewerTiers.includes('C');
  const isHrAdminViewer = viewerTiers.includes('A');

  const [sendBackOpen, setSendBackOpen] = useState(false);
  const [sendBackReason, setSendBackReason] = useState('');

  const submittedDate = request ? request.submittedAt : '';
  const submitWaitDays = useMemo(
    () => (submittedDate ? Math.max(0, daysBetween(submittedDate, new Date().toISOString())) : 0),
    [submittedDate],
  );
  if (!request) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-base font-semibold text-ink">
          {isTh ? 'ไม่พบคำขอลาออก' : 'Resignation request not found'}
        </p>
        <p className="text-sm text-ink-muted">
          {isTh ? `ไม่พบคำขอรหัส ${id}` : `No request with ID ${id}`}
        </p>
        <Link href={`/${locale}/quick-approve`} className="humi-button humi-button--secondary">
          {isTh ? 'กลับไปคิวอนุมัติ' : 'Back to approvals'}
        </Link>
      </div>
    );
  }

  const refNum = id.length <= 16 ? id : `${id.slice(0, 12)}…${id.slice(-3)}`;
  const isManagerStep = request.status === 'pending_manager';
  const isHrAdminStep = request.status === 'pending_spd';
  // Whether the CURRENTLY ACTING persona can act on THIS request's current
  // step — not just whether the request happens to be pending at all.
  const canAct = (isManagerStep && isManagerViewer) || (isHrAdminStep && isHrAdminViewer);
  const statusLabel =
    request.status === 'pending_manager'
      ? isTh ? 'รอหัวหน้าอนุมัติ' : 'Awaiting manager'
      : request.status === 'pending_spd'
        ? isTh ? 'รอ HR Admin ดำเนินการ' : 'Awaiting HR Admin'
        : request.status === 'approved'
          ? isTh ? 'อนุมัติแล้ว' : 'Approved'
          : request.status === 'sent_back'
            ? isTh ? 'ส่งกลับให้แก้ไข' : 'Sent back'
            : request.status === 'withdrawn'
              ? isTh ? 'ถอนคำขอแล้ว' : 'Withdrawn'
              : isTh ? 'ไม่อนุมัติ' : 'Rejected';

  // Footer left label mirrors the design's decision-state copy.
  const footerLeft = canAct
    ? isTh ? 'พร้อมอนุมัติ' : 'Ready to approve'
    : statusLabel;

  function handleApprove() {
    if (!request || !canAct) return;
    if (isManagerStep) {
      approveByManager(request.id, { role: 'manager', name: viewerName ?? APPROVER_NAME });
    } else {
      approveByHrAdmin(request.id, { role: 'hr_admin', name: viewerName ?? HR_ADMIN_NAME });
      commitApprovedTermination(request);
    }
    router.push(`/${locale}/quick-approve?decided=resignation-approved`);
  }

  function handleSendBack() {
    if (!request || !canAct || !sendBackReason.trim()) return;
    const actorRole = isManagerStep ? 'manager' : 'hr_admin';
    const actorName = viewerName ?? (isManagerStep ? APPROVER_NAME : HR_ADMIN_NAME);
    sendBackRequest(request.id, sendBackReason.trim(), { role: actorRole, name: actorName });
    setSendBackOpen(false);
    router.push(`/${locale}/quick-approve?decided=resignation-sent-back`);
  }

  return (
    <div className="pb-8 pt-1.5">
      {/* Page head — breadcrumb + title + SLA tag */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <nav className="humi-eyebrow flex items-center gap-1.5" aria-label="breadcrumb">
            <Link href={`/${locale}/quick-approve`} className="transition hover:text-ink">
              {isTh ? 'กล่องงาน' : 'Workbox'}
            </Link>
            <span>›</span>
            <span>{isTh ? 'คำขอลาออก' : 'Resignation'}</span>
            <span>›</span>
            <span className="text-ink-soft">{refNum}</span>
          </nav>
          <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink">
            {isTh ? 'อนุมัติการลาออก' : 'Approve resignation'}
            <span className="ml-2.5 font-medium text-ink-muted">· {request.employeeName}</span>
          </h1>
        </div>
        <span className="humi-tag humi-tag--butter inline-flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3" />
          {isTh ? `รอตอบกลับ ${submitWaitDays} วัน` : `Awaiting ${submitWaitDays} d`}
        </span>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-[1fr_340px] gap-5">
        {/* LEFT — case detail */}
        <div className="flex flex-col gap-4">
          {/* Employee header card */}
          <div className="humi-card">
            <div className="flex items-center gap-4">
              <div className="humi-avatar humi-avatar--ink flex h-16 w-16 flex-shrink-0 items-center justify-center font-display text-xl font-bold">
                {initials(request.employeeName)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-xl font-semibold tracking-tight text-ink">
                  {request.employeeName}
                </div>
                <div className="mt-1 text-sm text-ink-muted">
                  {request.employeeId}
                  {isTh ? ' · พนักงานประจำ' : ' · Full-time'}
                </div>
              </div>
              <Link
                href={`/${locale}/profile`}
                className="text-sm font-semibold text-accent transition hover:opacity-80"
              >
                {isTh ? 'ดูโปรไฟล์ →' : 'View profile →'}
              </Link>
            </div>

          </div>

          <TerminationRequestSummary request={request} locale={isTh ? 'th' : 'en'} />

        </div>

        {/* RIGHT — process timeline + replacement plan */}
        <div className="flex flex-col gap-4">
          {/* Process timeline — NOT sticky: a sticky card here overlaps the
              Backfill card below it on scroll (sticky-sibling overlap). */}
          <div className="humi-card humi-card--cream">
            <Eyebrow>{isTh ? 'กระบวนการ Offboarding' : 'Offboarding process'}</Eyebrow>
            <h3 className="mb-4 mt-1.5 font-display text-base font-semibold tracking-tight text-ink">
              {isTh ? '4 ขั้นตอน' : '4 steps'}
            </h3>

            <ProcessStep
              n={1}
              title={isTh ? 'พนักงานส่งคำขอ' : 'Employee submitted'}
              sub={formatDate(request.submittedAt, 'medium', locale)}
              state="done"
            />
            <ProcessStep
              n={2}
              title={isTh ? 'หัวหน้าอนุมัติ' : 'Manager approval'}
              sub={
                request.status === 'pending_manager'
                  ? isManagerViewer
                    ? isTh ? 'คุณอยู่ขั้นนี้' : 'You are here'
                    : isTh ? 'กำลังดำเนินการ' : 'In progress'
                  : isTh ? 'เสร็จแล้ว' : 'Done'
              }
              state={request.status === 'pending_manager' ? 'current' : 'done'}
            />
            <ProcessStep
              n={3}
              title={isTh ? 'HR Admin จัดการ' : 'HR Admin handling'}
              sub={
                request.status === 'pending_spd' && isHrAdminViewer
                  ? isTh ? 'คุณอยู่ขั้นนี้' : 'You are here'
                  : 'Clearance · final pay'
              }
              state={request.status === 'pending_spd' ? 'current' : request.status === 'approved' ? 'done' : 'pending'}
            />
            <ProcessStep
              n={4}
              title={isTh ? 'วันสุดท้าย + Exit Interview' : 'Last day + Exit Interview'}
              sub={formatDate(request.requestedLastDay, 'medium', locale)}
              state={request.status === 'approved' ? 'done' : 'pending'}
              last
            />
          </div>

        </div>
      </div>

      {/* Sticky footer — decision actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-hairline bg-surface px-6 py-4 shadow-[var(--shadow-md)]">
        <div className="flex items-center gap-2.5">
          <Check
            className={`h-4 w-4 ${canAct ? 'text-success' : 'text-ink-faint'}`}
          />
          <span className="text-sm text-ink-soft">{footerLeft}</span>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setSendBackOpen(true)}
            disabled={!canAct}
            className="humi-button humi-button--ghost disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {isTh ? 'ส่งกลับ' : 'Send back'}
          </button>
          <button
            type="button"
            onClick={handleApprove}
            disabled={!canAct}
            className="humi-button humi-button--primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowRight className="h-3.5 w-3.5" />
            {isTh ? 'อนุมัติ' : 'Approve'}
          </button>
        </div>
      </div>

      {/* Send-back reason modal */}
      <Modal
        open={sendBackOpen}
        onClose={() => setSendBackOpen(false)}
        title={isTh ? 'ส่งกลับคำขอลาออก' : 'Send back resignation request'}
        widthClass="max-w-md"
      >
        <div className="flex flex-col gap-3.5">
          <p className="text-sm text-ink-muted">
            {isTh
              ? 'ระบุเหตุผลที่ส่งกลับคำขอนี้ พนักงานจะเห็นเหตุผลดังกล่าว'
              : 'Tell the employee why this request is being sent back.'}
          </p>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-soft">
              {isTh ? 'เหตุผลในการส่งกลับ' : 'Reason for sending back'}
              <span aria-hidden className="ml-0.5 text-danger">*</span>
            </label>
            <textarea
              rows={3}
              value={sendBackReason}
              onChange={(e) => setSendBackReason(e.target.value)}
              placeholder={
                isTh ? 'เช่น ต้องการรายละเอียดเพิ่มเติม' : 'e.g. Need more details'
              }
              className="w-full resize-y rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft"
            />
          </div>
          <div className="flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setSendBackOpen(false)}
              className="humi-button humi-button--ghost"
            >
              {isTh ? 'ยกเลิก' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleSendBack}
              disabled={!sendBackReason.trim()}
              className="humi-button humi-button--danger disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {isTh ? 'ยืนยันส่งกลับ' : 'Confirm send back'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

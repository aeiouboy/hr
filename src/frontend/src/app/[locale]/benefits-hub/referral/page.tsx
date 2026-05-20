'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ArrowLeft,
  Plus,
  Minus,
  ChevronDown,
  ChevronRight,
  Download,
  Hospital,
  Clock,
  CheckCircle2,
  XCircle,
  Info,
} from 'lucide-react';
import {
  Card,
  CardEyebrow,
  CardTitle,
  Button,
  buttonVariants,
  EmptyState,
} from '@/components/humi';
import { ReferralRequestPanel } from '@/components/benefits/referral/ReferralRequestPanel';
import { benefitsHubRoute } from '@/lib/benefit-routes';
import { ApprovalChain } from '@/components/quick-approve/ApprovalChain';
import type { ApproverStage } from '@/data/benefits/plan-registry';
import { cn } from '@/lib/utils';

// Hospital referral chain: hrbp → spd → hr_admin
const REFERRAL_CHAIN: ApproverStage[] = ['hrbp', 'spd', 'hr_admin'];

type ReferralStatus =
  | 'pending_spd'
  | 'spd_reviewing'
  | 'approved'
  | 'letter_issued'
  | 'rejected'
  | 'send_back';

interface ReferralRow {
  id: string;
  coveredPersonName: string;
  hospitalName: string;
  serviceReason: string;
  preferredVisitDate: string;
  submittedAt: string;
  status: ReferralStatus;
  letterRef?: string;
  audit: Array<{
    actorName: string;
    action: string;
    comment?: string;
    at: string;
  }>;
}

const STATUS_META: Record<
  ReferralStatus,
  { th: string; en: string; tone: string; activeStage?: ApproverStage }
> = {
  pending_spd:   { th: 'รอ HRBP พิจารณา',   en: 'Pending HRBP',    tone: 'bg-warning-soft text-[color:var(--color-warning)]',                  activeStage: 'hrbp' },
  spd_reviewing: { th: 'SPD กำลังตรวจสอบ',  en: 'SPD reviewing',   tone: 'bg-warning-soft text-[color:var(--color-warning)]',                  activeStage: 'spd'  },
  approved:      { th: 'อนุมัติแล้ว',          en: 'Approved',         tone: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]', activeStage: 'hr_admin' },
  letter_issued: { th: 'ออกใบส่งตัวแล้ว',     en: 'Letter issued',   tone: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]' },
  rejected:      { th: 'ถูกปฏิเสธ',            en: 'Rejected',         tone: 'bg-danger-soft text-danger-ink' },
  send_back:     { th: 'ส่งกลับให้แก้ไข',     en: 'Returned',         tone: 'bg-accent-soft text-accent-ink' },
};

// Mock referral data — realistic seed for HR demo
const MOCK_REFERRALS: ReferralRow[] = [
  {
    id: 'REF-001',
    coveredPersonName: 'สมชาย สุขใจ',
    hospitalName: 'โรงพยาบาลกรุงเทพ สาขาสีลม',
    serviceReason: 'พบแพทย์เฉพาะทาง ออร์โธปิดิกส์',
    preferredVisitDate: '2026-05-26',
    submittedAt: '2026-05-17T09:00:00Z',
    status: 'pending_spd',
    audit: [
      { actorName: 'สมชาย สุขใจ', action: 'submit', at: '2026-05-17T09:00:00Z' },
    ],
  },
  {
    id: 'REF-002',
    coveredPersonName: 'สมชาย สุขใจ',
    hospitalName: 'โรงพยาบาลสมิติเวช สุขุมวิท',
    serviceReason: 'ตรวจสุขภาพประจำปี',
    preferredVisitDate: '2026-04-05',
    submittedAt: '2026-03-25T10:00:00Z',
    status: 'letter_issued',
    letterRef: 'EP-2026-00214',
    audit: [
      { actorName: 'สมชาย สุขใจ', action: 'submit', at: '2026-03-25T10:00:00Z' },
      { actorName: 'วิชัย HRBP', action: 'approve', at: '2026-03-26T09:00:00Z' },
      { actorName: 'กัณณิกา SPD', action: 'approve', comment: 'ออกใบส่งตัวเรียบร้อย', at: '2026-03-26T14:00:00Z' },
      { actorName: 'วรินทร์ HR Admin', action: 'approve', at: '2026-03-27T11:00:00Z' },
    ],
  },
  {
    id: 'REF-003',
    coveredPersonName: 'มณีรัตน์ สุขใจ (บุตร)',
    hospitalName: 'โรงพยาบาลเด็กสมิติเวช',
    serviceReason: 'พบกุมารแพทย์ ตรวจพัฒนาการ',
    preferredVisitDate: '2026-02-20',
    submittedAt: '2026-02-10T08:00:00Z',
    status: 'rejected',
    audit: [
      { actorName: 'สมชาย สุขใจ', action: 'submit', at: '2026-02-10T08:00:00Z' },
      { actorName: 'วิชัย HRBP', action: 'reject', comment: 'สิทธิบุตรไม่ครอบคลุมโรงพยาบาลเอกชนนี้', at: '2026-02-11T10:00:00Z' },
    ],
  },
];

const ACTIVE_STATUSES: ReferralStatus[] = ['pending_spd', 'spd_reviewing', 'approved'];

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function formatDateTime(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale === 'th' ? 'th-TH' : 'en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────────────────────

function ActiveReferralCard({ row, locale }: { row: ReferralRow; locale: string }) {
  const meta = STATUS_META[row.status];
  const days = daysSince(row.submittedAt);
  const isStale = days > 3;
  const isTh = locale !== 'en';

  return (
    <Card variant="raised" size="md" className="border-l-4 border-l-accent">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[length:var(--text-eyebrow)] uppercase tracking-[0.14em] text-ink-faint">
              {row.id}
            </span>
            <span className={cn('rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap', meta.tone)}>
              {isTh ? meta.th : meta.en}
            </span>
          </div>
          <p className="mt-1 text-body font-semibold text-ink">{row.serviceReason}</p>
          <p className="text-small text-ink-muted">
            {row.coveredPersonName} · {row.hospitalName}
          </p>
          <p className="text-small text-ink-muted">
            {isTh ? 'นัด' : 'Visit'} {formatDate(row.preferredVisitDate, locale)}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 text-right">
          <span className={cn('inline-flex items-center gap-1 text-small font-mono', isStale ? 'text-[color:var(--color-warning)] font-semibold' : 'text-ink-muted')}>
            <Clock size={12} aria-hidden />
            {days} {isTh ? 'วัน รอ' : 'd. waiting'}
          </span>
        </div>
      </div>

      <div className="mt-3 border-t border-hairline-soft pt-3">
        <ApprovalChain chain={REFERRAL_CHAIN} locale={locale} activeStage={meta.activeStage} size="sm" />
      </div>
    </Card>
  );
}

function IssuedLetterRow({ row, locale }: { row: ReferralRow; locale: string }) {
  const isTh = locale !== 'en';
  return (
    <li className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3">
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]"
      >
        <CheckCircle2 size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-ink truncate">{row.serviceReason}</p>
        <p className="text-small text-ink-muted">
          {row.hospitalName} · {isTh ? 'นัด' : 'Visit'} {formatDate(row.preferredVisitDate, locale)}
        </p>
        {row.letterRef && (
          <p className="font-mono text-[length:var(--text-eyebrow)] uppercase tracking-[0.14em] text-ink-faint mt-0.5">
            {row.letterRef}
          </p>
        )}
      </div>
      <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
        {isTh ? 'ใบส่งตัว' : 'Letter'}
      </Button>
    </li>
  );
}

function PastReferralRow({ row, locale }: { row: ReferralRow; locale: string }) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATUS_META[row.status];
  const isTh = locale !== 'en';
  const isRejected = row.status === 'rejected';

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span
            aria-hidden
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)]',
              isRejected ? 'bg-danger-soft text-danger-ink' : 'bg-canvas-soft text-ink-muted'
            )}
          >
            {isRejected ? <XCircle size={16} /> : <Hospital size={16} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-body font-medium text-ink truncate">
              {row.serviceReason}
              <span className="ml-2 font-mono text-[length:var(--text-eyebrow)] uppercase tracking-[0.14em] text-ink-faint">
                {row.id}
              </span>
            </p>
            <p className="text-small text-ink-muted truncate">
              {row.hospitalName} · {formatDate(row.preferredVisitDate, locale)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={cn('rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap', meta.tone)}>
            {isTh ? meta.th : meta.en}
          </span>
          {isRejected && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex items-center text-ink-muted hover:text-ink"
            >
              {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="sr-only">{isTh ? 'ดูเหตุผล' : 'Show reason'}</span>
            </button>
          )}
        </div>
      </div>

      {expanded && isRejected && (
        <ol className="mt-3 ml-12 space-y-1.5 border-l border-hairline-soft pl-4">
          {row.audit.map((entry, idx) => (
            <li key={idx} className="text-small">
              <span className="font-medium text-ink">{entry.actorName}</span>{' '}
              <span className="text-ink-muted">· {formatDateTime(entry.at, locale)}</span>
              {entry.comment && (
                <p className="mt-0.5 italic text-ink-muted">&ldquo;{entry.comment}&rdquo;</p>
              )}
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────

export default function BenefitReferralPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const active = MOCK_REFERRALS.filter((r) => ACTIVE_STATUSES.includes(r.status));
  const issued = MOCK_REFERRALS.filter((r) => r.status === 'letter_issued');
  const past = MOCK_REFERRALS.filter((r) => r.status === 'rejected' || r.status === 'send_back');

  const hasActive = active.length > 0;
  const [formOpen, setFormOpen] = useState(!hasActive);

  return (
    <div className="space-y-6">
      {/* Header — slim, single secondary CTA only */}
      <header className="flex items-end justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-1 min-w-0">
          <Link
            href={benefitsHubRoute(locale)}
            className="inline-flex w-fit items-center gap-1 text-small text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft size={12} aria-hidden />
            {isTh ? 'Benefits Hub' : 'Benefits Hub'}
          </Link>
          <h1 className="font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] tracking-tight text-ink">
            {isTh ? 'ใบส่งตัวโรงพยาบาล' : 'Hospital referral'}
          </h1>
        </div>
      </header>

      {/* Status summary — replaces banner + approval-chain header */}
      <section className="grid gap-3 sm:grid-cols-3">
        <Card variant="raised" size="md" className="border-l-4 border-l-[color:var(--color-warning)]">
          <CardEyebrow>{isTh ? 'อยู่ระหว่างพิจารณา' : 'In flight'}</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h2)] font-semibold text-ink tabular-nums">
            {active.length}
          </p>
          <p className="text-small text-ink-muted">
            {isTh ? 'คำขอที่รออนุมัติ' : 'awaiting approval'}
          </p>
        </Card>
        <Card variant="raised" size="md" className="border-l-4 border-l-[color:var(--color-success)]">
          <CardEyebrow>{isTh ? 'ใบส่งตัวพร้อมใช้' : 'Letters ready'}</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h2)] font-semibold text-ink tabular-nums">
            {issued.length}
          </p>
          <p className="text-small text-ink-muted">
            {isTh ? 'ดาวน์โหลดได้ทันที' : 'ready to download'}
          </p>
        </Card>
        <Card variant="raised" size="md" className="border-l-4 border-l-hairline">
          <CardEyebrow className="inline-flex items-center gap-1">
            <Info size={11} aria-hidden />
            {isTh ? 'ขั้นตอนอนุมัติ' : 'Approval flow'}
          </CardEyebrow>
          <div className="mt-2">
            <ApprovalChain chain={REFERRAL_CHAIN} locale={locale} size="md" />
          </div>
        </Card>
      </section>

      {/* Active referrals */}
      {hasActive && (
        <section aria-labelledby="referral-active-heading" className="space-y-3">
          <h2
            id="referral-active-heading"
            className="font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
          >
            {isTh ? 'คำขอที่กำลังดำเนินการ' : 'Active referrals'}
          </h2>
          <div className="space-y-3">
            {active.map((r) => (
              <ActiveReferralCard key={r.id} row={r} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* New referral — collapsible */}
      <section aria-labelledby="referral-new-heading">
        <button
          type="button"
          onClick={() => setFormOpen((v) => !v)}
          aria-expanded={formOpen}
          className={cn(
            'flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-3 text-left transition-colors',
            'hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
            formOpen && 'rounded-b-none border-b-0'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-ink"
            >
              {formOpen ? <Minus size={16} /> : <Plus size={16} />}
            </span>
            <div className="min-w-0">
              <p id="referral-new-heading" className="text-body font-semibold text-ink">
                {isTh ? 'ขอใบส่งตัวใหม่' : 'Request a new referral'}
              </p>
              <p className="text-small text-ink-muted">
                {isTh
                  ? 'ใช้ก่อนเข้ารับบริการ ไม่ใช่การเบิกย้อนหลัง'
                  : 'Use before your visit, not for post-visit claims'}
              </p>
            </div>
          </div>
          <span className="text-small text-ink-muted shrink-0">
            {formOpen ? (isTh ? 'ซ่อน' : 'Hide') : (isTh ? 'เปิดฟอร์ม' : 'Open form')}
          </span>
        </button>

        {formOpen && (
          <div className="rounded-b-[var(--radius-md)] border border-t-0 border-hairline">
            <ReferralRequestPanel onSubmitted={() => setFormOpen(false)} />
          </div>
        )}
      </section>

      {/* Issued letters */}
      {issued.length > 0 && (
        <section aria-labelledby="referral-issued-heading">
          <Card variant="raised" size="md">
            <h2
              id="referral-issued-heading"
              className="font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
            >
              {isTh ? 'ใบส่งตัวที่ออกแล้ว' : 'Issued letters'}
            </h2>
            <ul role="list" className="mt-2 divide-y divide-hairline-soft">
              {issued.map((r) => (
                <IssuedLetterRow key={r.id} row={r} locale={locale} />
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Past referrals (rejected/returned) — quiet */}
      {past.length > 0 && (
        <section aria-labelledby="referral-past-heading">
          <h2
            id="referral-past-heading"
            className="font-display text-[length:var(--text-display-h3)] font-semibold text-ink mb-3"
          >
            {isTh ? 'ประวัติคำขอ' : 'Past requests'}
          </h2>
          <Card variant="raised" size="md">
            <ul role="list" className="divide-y divide-hairline-soft">
              {past.map((r) => (
                <PastReferralRow key={r.id} row={r} locale={locale} />
              ))}
            </ul>
          </Card>
        </section>
      )}

      {/* Empty state — only when there's truly nothing */}
      {!hasActive && issued.length === 0 && past.length === 0 && (
        <EmptyState
          icon={Hospital}
          titleTh="ยังไม่มีคำขอใบส่งตัว"
          titleEn="No referrals yet"
          descTh="เปิดฟอร์มด้านบนเพื่อขอใบส่งตัวสำหรับโรงพยาบาลในเครือ"
          descEn="Open the form above to request a referral for a partner hospital."
        />
      )}
    </div>
  );
}

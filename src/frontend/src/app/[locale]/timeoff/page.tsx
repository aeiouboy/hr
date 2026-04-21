'use client';

import { useState } from 'react';
import { Check, Heart, Coffee, Sun, Plus, Paperclip, AlertCircle } from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_LEAVE_BALANCES,
  HUMI_LEAVE_PENDING,
  HUMI_LEAVE_COVERAGE,
  type LeaveKind,
} from '@/lib/humi-mock-data';
import { useTimeoffStore, type TimeoffHistoryItem, type LeaveStatus } from '@/stores/humi-timeoff-slice';

// ════════════════════════════════════════════════════════════
// /timeoff — Leave request portal
// Port of docs/design-ref/shelfly-bundle/project/screens/timeoff.jsx
// 3 balance KPIs + 3-tab panel (request / history / approvals)
// + right column with team coverage + policy callout.
// c5: Zustand persist + validation + submit → history+1 + toast
// ════════════════════════════════════════════════════════════

type TabKey = 'request' | 'history' | 'approve';

const LEAVE_TYPES: Array<{
  key: LeaveKind;
  label: string;
  hint: string;
  icon: typeof Sun;
  tileClass: string;
}> = [
  {
    key: 'vacation',
    label: 'ลาพักร้อน',
    hint: 'ได้รับค่าจ้าง',
    icon: Sun,
    tileClass: 'bg-accent-soft text-accent',
  },
  {
    key: 'sick',
    label: 'ลาป่วย',
    hint: 'ได้รับค่าจ้าง',
    icon: Heart,
    tileClass:
      'bg-[color:var(--color-accent-alt-soft)] text-[color:var(--color-accent-alt)]',
  },
  {
    key: 'personal',
    label: 'ลากิจ',
    hint: 'ได้รับค่าจ้าง',
    icon: Coffee,
    tileClass: 'bg-[color:var(--color-sage-soft)] text-ink',
  },
];

const HISTORY_TONE: Record<LeaveStatus, string> = {
  approved: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  rejected: 'bg-warning-soft text-[color:var(--color-warning)]',
  pending: 'bg-accent-soft text-[color:var(--color-accent-ink)]',
} as const;

const HISTORY_LABEL: Record<LeaveStatus, string> = {
  approved: 'อนุมัติแล้ว',
  rejected: 'ไม่อนุมัติ',
  pending: 'รออนุมัติ',
} as const;

// Simple in-memory toast (no external library)
function useToast() {
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false });
  const show = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: '', visible: false }), 3200);
  };
  return { toast, show };
}

export default function HumiTimeoffPage() {
  const [tab, setTab] = useState<TabKey>('request');
  const { toast, show: showToast } = useToast();

  return (
    <>
      {/* Toast */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-3',
            'bg-ink text-canvas shadow-lg',
            'text-body font-medium'
          )}
        >
          <Check size={16} aria-hidden />
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardEyebrow>ลางาน</CardEyebrow>
          <h1
            className={cn(
              'font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            ยื่นคำขอ · อนุมัติ · ติดตาม
          </h1>
        </div>
        <Button
          variant="primary"
          leadingIcon={<Plus size={16} />}
          onClick={() => setTab('request')}
        >
          สร้างคำขอใหม่
        </Button>
      </header>

      {/* Balance KPIs */}
      <section
        aria-label="ยอดวันลาคงเหลือ"
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {HUMI_LEAVE_BALANCES.map((b) => (
          <Card key={b.kind} variant="raised" size="md">
            <CardEyebrow>{b.label}</CardEyebrow>
            <div className="mt-2 flex items-baseline gap-2">
              <span
                className={cn(
                  'font-display font-semibold text-ink tabular-nums whitespace-nowrap',
                  'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
                )}
              >
                {b.remaining}
              </span>
              <span className="text-small text-ink-muted">{b.unitLabel}</span>
            </div>
            {b.percentUsed > 0 && (
              <div
                role="progressbar"
                aria-valuenow={b.percentUsed}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={b.label}
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
              >
                <div
                  className={cn('h-full rounded-full', b.barClass)}
                  style={{ width: `${b.percentUsed}%` }}
                />
              </div>
            )}
            <p className="mt-2 text-small text-ink-muted">{b.note}</p>
          </Card>
        ))}
      </section>

      {/* Main grid: form (1.2fr) + right column (1fr) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left — tabs + panel */}
        <Card variant="raised" size="lg">
          <div
            role="tablist"
            aria-label="มุมมองคำขอลางาน"
            className="flex flex-wrap gap-1 border-b border-hairline"
          >
            <TabButton active={tab === 'request'} onClick={() => setTab('request')}>
              คำขอใหม่
            </TabButton>
            <TabButton active={tab === 'history'} onClick={() => setTab('history')}>
              ประวัติของฉัน
            </TabButton>
            <TabButton active={tab === 'approve'} onClick={() => setTab('approve')}>
              รออนุมัติ{' '}
              <span className="font-normal text-ink-muted">
                ({HUMI_LEAVE_PENDING.length})
              </span>
            </TabButton>
          </div>

          {tab === 'request' && (
            <RequestTab onSubmitted={(msg) => { showToast(msg); setTab('history'); }} />
          )}

          {tab === 'history' && <HistoryTab />}

          {tab === 'approve' && (
            <ul role="list" className="divide-y divide-hairline pt-2">
              {HUMI_LEAVE_PENDING.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar name={p.name} tone={p.tone} size="sm" />
                    <div className="min-w-0">
                      <p className="text-body font-semibold text-ink">{p.name}</p>
                      <p className="text-small text-ink-muted">
                        {p.reason} · {p.when}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button variant="ghost" size="sm">
                      ปฏิเสธ
                    </Button>
                    <Button variant="primary" size="sm">
                      อนุมัติ
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Right column */}
        <aside className="flex flex-col gap-6">
          {/* Team coverage */}
          <Card variant="raised" size="lg">
            <CardEyebrow>ใครลาเดือนนี้</CardEyebrow>
            <CardTitle className="mt-1">การครอบคลุมของทีม</CardTitle>

            <ul role="list" className="mt-4 flex flex-col gap-3">
              {HUMI_LEAVE_COVERAGE.map((c) => (
                <li key={c.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} tone={c.tone} size="sm" />
                    <p className="flex-1 truncate text-small text-ink">
                      {c.name}
                    </p>
                    <p className="shrink-0 text-small text-ink-muted">
                      {c.dateLabel}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="relative h-1.5 overflow-hidden rounded-full bg-hairline-soft"
                  >
                    <div
                      className="absolute h-full rounded-full bg-accent"
                      style={{
                        left: `${c.offsetPct}%`,
                        width: '12%',
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Policy callout */}
          <Card
            variant="raised"
            size="lg"
            className="relative overflow-hidden bg-ink text-canvas"
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-36 w-28 rounded-full bg-accent opacity-40 blur-2xl"
            />
            <CardEyebrow className="relative text-accent">นโยบาย</CardEyebrow>
            <h3
              className={cn(
                'relative mt-1 font-display font-semibold tracking-tight',
                'text-[length:var(--text-display-h3)] leading-[var(--text-display-h3--line-height)]',
                'text-canvas'
              )}
            >
              การยกยอดวันลา
            </h3>
            <p className="relative mt-2 text-small text-canvas/70 leading-relaxed">
              วันลาพักร้อนที่ไม่ได้ใช้ สูงสุด 5 วัน สามารถยกยอดไปปีถัดไปได้
              ส่วนที่เกินจะจ่ายเป็นเงินในเช็คเงินเดือนวันที่ 15 ธันวาคม
            </p>
            <div className="relative mt-4">
              <Button variant="primary">อ่านนโยบายฉบับเต็ม</Button>
            </div>
          </Card>
        </aside>
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Request tab — form with validation
// ────────────────────────────────────────────────────────────

function RequestTab({ onSubmitted }: { onSubmitted: (msg: string) => void }) {
  const submit = useTimeoffStore((s) => s.submit);
  const [kind, setKind] = useState<LeaveKind>('vacation');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const kindLabel =
    LEAVE_TYPES.find((t) => t.key === kind)?.label ?? 'ลางาน';

  function validate() {
    const errs: Record<string, string> = {};
    if (!fromDate.trim()) errs.fromDate = 'กรุณาระบุวันที่เริ่มลา';
    if (!toDate.trim()) errs.toDate = 'กรุณาระบุวันที่สิ้นสุด';
    if (fromDate.trim() && toDate.trim() && fromDate.trim() > toDate.trim()) {
      errs.toDate = 'วันสิ้นสุดต้องไม่ก่อนวันเริ่ม';
    }
    if (reason.trim().length > 0 && reason.trim().length < 5) {
      errs.reason = 'เหตุผลต้องมีอย่างน้อย 5 ตัวอักษร';
    }
    if (!reason.trim()) errs.reason = 'กรุณาระบุเหตุผล';
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    submit({ kind, kindLabel, fromDate: fromDate.trim(), toDate: toDate.trim(), reason: reason.trim() });
    setFromDate('');
    setToDate('');
    setReason('');
    setErrors({});
    onSubmitted('ส่งคำขอลางานเรียบร้อยแล้ว · สถานะ: รออนุมัติ');
  }

  return (
    <div className="pt-6">
      <CardTitle>ยื่นคำขอลางาน</CardTitle>
      <p className="mt-1 text-small text-ink-muted">
        คำขอที่น้อยกว่า 3 วัน ระบบจะส่งไปยังผู้จัดการของคุณโดยอัตโนมัติ
      </p>

      {/* Leave type selector */}
      <div
        role="radiogroup"
        aria-label="ประเภทการลา"
        className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {LEAVE_TYPES.map((opt) => {
          const selected = kind === opt.key;
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setKind(opt.key)}
              className={cn(
                'flex flex-col items-start gap-2 rounded-[var(--radius-md)] border p-4 text-left transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                selected
                  ? 'border-ink bg-canvas-soft'
                  : 'border-hairline bg-surface hover:border-ink-faint'
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-[10px]',
                  opt.tileClass
                )}
              >
                <Icon size={16} />
              </span>
              <span className="text-body font-semibold text-ink">
                {opt.label}
              </span>
              <span className="text-small text-ink-muted">{opt.hint}</span>
            </button>
          );
        })}
      </div>

      {/* Date range */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="ตั้งแต่วันที่ *" htmlFor="leave-from" error={errors.fromDate}>
          <input
            id="leave-from"
            type="text"
            placeholder="เช่น 28 เม.ย."
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            aria-invalid={!!errors.fromDate}
            aria-describedby={errors.fromDate ? 'err-from' : undefined}
            className={cn(inputClass, errors.fromDate && 'border-[color:var(--color-warning)]')}
          />
        </Field>
        <Field label="ถึงวันที่ *" htmlFor="leave-to" error={errors.toDate}>
          <input
            id="leave-to"
            type="text"
            placeholder="เช่น 2 พ.ค."
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            aria-invalid={!!errors.toDate}
            aria-describedby={errors.toDate ? 'err-to' : undefined}
            className={cn(inputClass, errors.toDate && 'border-[color:var(--color-warning)]')}
          />
        </Field>
      </div>

      {/* Reason */}
      <Field
        label="เหตุผล *"
        htmlFor="leave-reason"
        className="mt-3"
        error={errors.reason}
      >
        <textarea
          id="leave-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="อธิบายเหตุผลการลา (อย่างน้อย 5 ตัวอักษร)"
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? 'err-reason' : undefined}
          className={cn(inputClass, 'min-h-[80px] resize-y', errors.reason && 'border-[color:var(--color-warning)]')}
        />
      </Field>

      {/* Attachment placeholder */}
      <button
        type="button"
        className={cn(
          'mt-3 flex items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-hairline px-4 py-3 text-small text-ink-muted',
          'w-full hover:border-ink-faint hover:text-ink-soft transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
        )}
      >
        <Paperclip size={14} aria-hidden />
        <span>แนบเอกสารประกอบ (ถ้ามี)</span>
      </button>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button variant="primary" onClick={handleSubmit}>
          ส่งคำขอ
        </Button>
        <Button variant="ghost">บันทึกร่าง</Button>
        <p className="ml-auto text-small text-ink-muted">
          ผู้อนุมัติ: กฤตนัย อินทรเดช (หัวหน้าสายงาน)
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// History tab — reads from Zustand store
// ────────────────────────────────────────────────────────────

function HistoryTab() {
  const history = useTimeoffStore((s) => s.history);

  if (history.length === 0) {
    return (
      <div className="py-12 text-center text-small text-ink-muted">
        ยังไม่มีประวัติการลา
      </div>
    );
  }

  return (
    <ul role="list" className="divide-y divide-hairline pt-2">
      {history.map((h: TimeoffHistoryItem) => (
        <li key={h.id} className="flex items-center gap-3 py-4">
          <Avatar name={h.kindLabel} tone="teal" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold text-ink">
              {h.fromDate}
              {h.toDate !== h.fromDate ? ` – ${h.toDate}` : ''}
            </p>
            <p className="text-small text-ink-muted">
              {h.kindLabel} · {h.reason}
            </p>
          </div>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
              HISTORY_TONE[h.status]
            )}
          >
            {HISTORY_LABEL[h.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ──────── helpers (co-located) ────────

const inputClass = cn(
  'w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-body text-ink',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  'placeholder:text-ink-faint'
);

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        '-mb-px border-b-2 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        active
          ? 'border-accent text-ink'
          : 'border-transparent text-ink-muted hover:text-ink'
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  className,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  className?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-small font-medium text-ink-soft"
      >
        {label}
        {optional && (
          <span className="ml-1 font-normal text-ink-faint">(ไม่บังคับ)</span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`err-${htmlFor}`}
          role="alert"
          className="flex items-center gap-1 text-[length:var(--text-eyebrow)] text-[color:var(--color-warning)]"
        >
          <AlertCircle size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

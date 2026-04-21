'use client';

import { useState } from 'react';
import { Check, Heart, Coffee, Sun, Plus } from 'lucide-react';
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
  HUMI_LEAVE_HISTORY,
  HUMI_LEAVE_PENDING,
  HUMI_LEAVE_COVERAGE,
  type LeaveKind,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// /timeoff — Leave request portal
// Port of docs/design-ref/shelfly-bundle/project/screens/timeoff.jsx
// 3 balance KPIs + 3-tab panel (request / history / approvals)
// + right column with team coverage + policy callout.
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

const HISTORY_TONE = {
  approved: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  rejected: 'bg-warning-soft text-[color:var(--color-warning)]',
} as const;

const HISTORY_LABEL = {
  approved: 'อนุมัติแล้ว',
  rejected: 'ไม่อนุมัติ',
} as const;

export default function HumiTimeoffPage() {
  const [tab, setTab] = useState<TabKey>('request');
  const [kind, setKind] = useState<LeaveKind>('vacation');
  const [fromDate, setFromDate] = useState('28 เม.ย.');
  const [toDate, setToDate] = useState('2 พ.ค.');
  const [note, setNote] = useState('งานแต่งงานของครอบครัวที่เชียงใหม่');

  return (
    <>
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
          <Button variant="primary" leadingIcon={<Plus size={16} />}>
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
                  <Field label="ตั้งแต่วันที่" htmlFor="leave-from">
                    <input
                      id="leave-from"
                      type="text"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="ถึงวันที่" htmlFor="leave-to">
                    <input
                      id="leave-to"
                      type="text"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Note */}
                <Field
                  label="หมายเหตุถึงหัวหน้า"
                  optional
                  htmlFor="leave-note"
                  className="mt-3"
                >
                  <textarea
                    id="leave-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                    className={cn(inputClass, 'min-h-[80px] resize-y')}
                  />
                </Field>

                {/* Confirmation callout */}
                <div
                  className={cn(
                    'mt-4 flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3',
                    'bg-accent-soft text-[color:var(--color-accent-ink)]'
                  )}
                >
                  <Check size={18} aria-hidden />
                  <p className="text-small">
                    ขอลา <strong>5 วันทำการ</strong> · มีคนทดแทนงานของคุณเพียงพอ
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button variant="primary">ส่งคำขอ</Button>
                  <Button variant="ghost">บันทึกร่าง</Button>
                  <p className="ml-auto text-small text-ink-muted">
                    ผู้อนุมัติ: กฤตนัย อินทรเดช (หัวหน้าสายงาน)
                  </p>
                </div>
              </div>
            )}

            {tab === 'history' && (
              <ul role="list" className="divide-y divide-hairline pt-2">
                {HUMI_LEAVE_HISTORY.map((h) => (
                  <li key={h.id} className="flex items-center gap-3 py-4">
                    <Avatar name={h.type} tone="teal" size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-body font-semibold text-ink">{h.when}</p>
                      <p className="text-small text-ink-muted">{h.type} · คุณ</p>
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
            )}

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

            {/* Policy callout — ink surface */}
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
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  className?: string;
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
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Plus, Check, FileText } from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_GOALS,
  HUMI_REVIEW_CYCLES,
  HUMI_FEEDBACK,
  HUMI_GOAL_TEAM,
  REVIEW_TONE_CLASS,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// /goals — Goals + performance review
// Port of docs/design-ref/shelfly-bundle/project/screens/goals.jsx
// 4 KPIs + 4-tab panel (goals / reviews / feedback / team)
// ════════════════════════════════════════════════════════════

type TabKey = 'goals' | 'reviews' | 'feedback' | 'team';

const TABS: Array<[TabKey, string]> = [
  ['goals', 'เป้าหมายของฉัน'],
  ['reviews', 'การประเมิน'],
  ['feedback', 'ข้อเสนอแนะ'],
  ['team', 'ทีมของฉัน'],
];

const KPIS: Array<{ l: string; v: string; accent: 'accent' | 'alt' | 'sage' | 'butter' }> = [
  { l: 'เป้าหมายที่อยู่ในแผน', v: '4 / 6', accent: 'accent' },
  { l: 'ความคืบหน้าของรอบ', v: '58%', accent: 'alt' },
  { l: 'ผลประเมินล่าสุด', v: 'ดีเกินคาด', accent: 'sage' },
  { l: 'Check-in ครั้งถัดไป', v: '24 เม.ย.', accent: 'butter' },
];

const TREND = [
  { h: 50, l: "H1 '67" },
  { h: 65, l: "H2 '67" },
  { h: 82, l: "H1 '68" },
  { h: 88, l: "H2 '68" },
];

export default function HumiGoalsPage() {
  const [tab, setTab] = useState<TabKey>('goals');

  return (
    <>
        {/* Page header */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardEyebrow>เป้าหมายและผลงาน</CardEyebrow>
            <h1
              className={cn(
                'font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              รอบการประเมิน · ครึ่งปีแรก 2569
            </h1>
          </div>
          <Button variant="primary" leadingIcon={<Plus size={14} />}>
            เพิ่มเป้าหมาย
          </Button>
        </header>

        {/* KPI row */}
        <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {KPIS.map((s) => (
            <Card
              key={s.l}
              variant="raised"
              size="md"
              className="border-l-4 border-transparent"
              style={{
                borderLeftColor:
                  s.accent === 'accent'
                    ? 'var(--color-accent)'
                    : s.accent === 'alt'
                      ? 'var(--color-accent-alt)'
                      : s.accent === 'sage'
                        ? 'var(--color-sage)'
                        : 'var(--color-butter)',
              }}
            >
              <CardEyebrow>{s.l}</CardEyebrow>
              <p
                className={cn(
                  'mt-1 font-display font-semibold text-ink tabular-nums whitespace-nowrap',
                  'text-[length:var(--text-display-h3)] leading-[var(--text-display-h3--line-height)]'
                )}
              >
                {s.v}
              </p>
            </Card>
          ))}
        </section>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="มุมมองเป้าหมาย"
          className="mb-6 flex flex-wrap gap-1 border-b border-hairline"
        >
          {TABS.map(([k, l]) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={cn(
                '-mb-px border-b-2 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                tab === k
                  ? 'border-accent text-ink'
                  : 'border-transparent text-ink-muted hover:text-ink'
              )}
            >
              {l}
            </button>
          ))}
        </div>

        {tab === 'goals' && <GoalsTab />}
        {tab === 'reviews' && <ReviewsTab />}
        {tab === 'feedback' && <FeedbackTab />}
        {tab === 'team' && <TeamTab />}
      </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Goals
// ────────────────────────────────────────────────────────────

function GoalsTab() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-4">
        {HUMI_GOALS.map((g) => (
          <Card key={g.id} variant="raised" size="lg">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-canvas-soft px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted whitespace-nowrap">
                    {g.category}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                      g.status === 'on-track'
                        ? 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]'
                        : 'bg-warning-soft text-[color:var(--color-warning)]'
                    )}
                  >
                    {g.statusLabel}
                  </span>
                  <span className="text-small text-ink-muted">
                    กำหนด {g.due}
                  </span>
                </div>
                <h3 className="font-display text-[length:var(--text-display-h3)] leading-snug font-semibold tracking-tight text-ink">
                  {g.title}
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    'font-display font-semibold text-ink tabular-nums',
                    'text-[length:var(--text-display-h3)] leading-[var(--text-display-h3--line-height)]'
                  )}
                >
                  {g.percent}%
                </p>
                <p className="mt-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  ความคืบหน้า
                </p>
              </div>
            </div>
            <div
              role="progressbar"
              aria-valuenow={g.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={g.title}
              className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
            >
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${g.percent}%` }}
              />
            </div>
            <ul role="list" className="mt-4 flex flex-col gap-2">
              {g.krs.map((k) => (
                <li
                  key={k.label}
                  className="flex items-start gap-2.5 text-small"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px] border-[1.5px]',
                      k.done
                        ? 'border-accent bg-accent text-white'
                        : 'border-hairline bg-transparent'
                    )}
                  >
                    {k.done && <Check size={11} />}
                  </span>
                  <span
                    className={cn(
                      k.done
                        ? 'text-ink-muted line-through'
                        : 'text-ink'
                    )}
                  >
                    {k.label}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Right column: check-in + trend */}
      <aside className="flex flex-col gap-5">
        <Card variant="raised" size="lg">
          <CardEyebrow>Check-in ครั้งถัดไป</CardEyebrow>
          <CardTitle className="mt-1">1:1 กับ กฤตนัย อินทรเดช</CardTitle>
          <p className="mt-2 text-body text-ink-soft">
            ศุกร์ 24 เม.ย. · 14:00 · 30 นาที
          </p>
          <hr className="my-4 border-hairline" />
          <p className="text-small text-ink-muted">หัวข้อสนทนา</p>
          <ul role="list" className="mt-2 flex flex-col gap-2">
            {[
              'ทบทวนความคืบหน้าโปรแกรม Stay Interview',
              'หารือความเสี่ยงโครงการนำร่องจัดตารางเอง',
              'ไอเดียเป้าหมายขยาย Q2',
            ].map((a) => (
              <li key={a} className="flex items-center gap-2 text-small text-ink">
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
                />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <Button variant="primary" block className="mt-4">
            เปิดห้อง 1:1
          </Button>
        </Card>

        <Card variant="raised" size="lg">
          <CardEyebrow>แนวโน้มผลงาน</CardEyebrow>
          <CardTitle className="mt-1">การประเมิน 4 ครั้งล่าสุด</CardTitle>
          <div
            aria-hidden
            className="mt-4 flex h-24 items-end gap-2.5"
          >
            {TREND.map((b) => (
              <div key={b.l} className="flex-1 text-center">
                <div
                  className="rounded-t-[6px] bg-accent"
                  style={{ height: `${b.h}%` }}
                />
                <p className="mt-2 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {b.l}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Reviews
// ────────────────────────────────────────────────────────────

function ReviewsTab() {
  return (
    <Card variant="raised" size="lg">
      <CardTitle>รอบการประเมิน</CardTitle>
      <ul role="list" className="mt-3 divide-y divide-hairline">
        {HUMI_REVIEW_CYCLES.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-3"
          >
            <span
              aria-hidden
              className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas-soft text-ink-muted"
            >
              <FileText size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-ink">{r.cycle}</p>
              <p className="text-small text-ink-muted">{r.due}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                  REVIEW_TONE_CLASS[r.tone]
                )}
              >
                {r.status}
              </span>
              <Button variant="ghost" size="sm">
                เปิด
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Feedback
// ────────────────────────────────────────────────────────────

function FeedbackTab() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {HUMI_FEEDBACK.map((f) => (
        <Card key={f.id} variant="raised" size="md">
          <div className="flex items-center gap-3">
            <Avatar name={f.who} tone={f.tone} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-body font-semibold text-ink">{f.who}</p>
              <p className="text-small text-ink-muted">
                {f.role} · {f.when}
              </p>
            </div>
          </div>
          <p className="mt-3 text-body text-ink-soft leading-relaxed">
            {f.text}
          </p>
        </Card>
      ))}

      {/* Give feedback CTA */}
      <Card variant="raised" size="md" tone="canvas">
        <CardEyebrow>ให้ข้อเสนอแนะกับคนอื่น</CardEyebrow>
        <CardTitle className="mt-1">
          เขียนข้อเสนอแนะให้เพื่อนร่วมงาน
        </CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          ใช้เวลาแค่ 2 นาที จะถูกบันทึกในแฟ้มพัฒนาของเขา
        </p>
        <Button
          variant="primary"
          className="mt-4"
          leadingIcon={<Plus size={14} />}
        >
          ข้อเสนอแนะใหม่
        </Button>
      </Card>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Team
// ────────────────────────────────────────────────────────────

function TeamTab() {
  return (
    <Card variant="raised" size="lg">
      <CardTitle>ลูกทีมของฉัน</CardTitle>
      <ul role="list" className="mt-3 divide-y divide-hairline">
        {HUMI_GOAL_TEAM.map((m) => (
          <li
            key={m.id}
            className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar name={m.name} tone={m.tone} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-body font-semibold text-ink">
                  {m.name}
                </p>
                <p className="text-small text-ink-muted">
                  {m.role} · เป้าหมายอยู่ในแผน {m.goalsDone}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <div
                role="progressbar"
                aria-valuenow={m.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={m.name}
                className="h-1.5 w-36 overflow-hidden rounded-full bg-hairline-soft"
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${m.percent}%` }}
                />
              </div>
              <Button variant="ghost" size="sm">
                เปิด 1:1
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

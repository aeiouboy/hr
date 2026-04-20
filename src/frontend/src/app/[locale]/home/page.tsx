import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  Check,
  X,
  Users,
  UserCheck,
  ClipboardList,
  CalendarDays,
  Circle,
} from 'lucide-react';
import { Button, Card, CardTitle, CardEyebrow } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_KPIS,
  HUMI_PENDING_REQUESTS,
  HUMI_RECENT_ACTIVITY,
  HUMI_EMPLOYEES,
  HUMI_MY_LEAVE,
  HUMI_LATEST_PAYROLL,
  AVATAR_TONE_CLASS,
  type HumiEmployee,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// Humi /home — Dashboard (overview)
// Editorial-refined layout: warm cream canvas, teal primary,
// indigo accent sparingly. Generous whitespace, hairline
// separators instead of heavy borders. Display font for KPI
// values + section titles; body copy in CPN sans.
// ════════════════════════════════════════════════════════════

const KPI_ICONS = {
  'kpi-headcount': Users,
  'kpi-present': UserCheck,
  'kpi-pending': ClipboardList,
  'kpi-my-leave': CalendarDays,
} as const;

const DELTA_TONE_CLASS = {
  up: 'text-[color:var(--color-success)]',
  down: 'text-[color:var(--color-warning)]',
  neutral: 'text-ink-muted',
} as const;

const ACTIVITY_DOT_CLASS = {
  success: 'bg-[color:var(--color-success)]',
  accent: 'bg-accent',
  warning: 'bg-[color:var(--color-warning)]',
  muted: 'bg-ink-faint',
} as const;

function employeeById(id: string): HumiEmployee | undefined {
  return HUMI_EMPLOYEES.find((e) => e.id === id);
}

export default function HumiHomePage() {
  const t = useTranslations('humiHome');

  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto w-full max-w-[var(--max-width-page)] px-6 pb-16 pt-10 sm:px-8">
        {/* ── Page header ───────────────────────────────────── */}
        <header className="mb-10 flex flex-col gap-2">
          <CardEyebrow>{t('eyebrow')}</CardEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1
              className={cn(
                'font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              {t('title')}
            </h1>
            <p className="text-body text-ink-muted">{t('subtitle')}</p>
          </div>
        </header>

        {/* ── KPI row (4 cards) ─────────────────────────────── */}
        <section
          aria-label={t('kpiLabel')}
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HUMI_KPIS.map((kpi) => {
            const Icon = KPI_ICONS[kpi.id as keyof typeof KPI_ICONS];
            const deltaClass =
              DELTA_TONE_CLASS[kpi.deltaTone ?? 'neutral'];
            return (
              <Card key={kpi.id} variant="raised" size="md">
                <div className="flex items-start justify-between gap-3">
                  <CardEyebrow>{kpi.label}</CardEyebrow>
                  {Icon && (
                    <span
                      aria-hidden
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent"
                    >
                      <Icon size={16} />
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-3 font-display font-semibold text-ink tabular-nums',
                    'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
                  )}
                >
                  {kpi.value}
                </p>
                {kpi.delta && (
                  <p className={cn('mt-1 text-small', deltaClass)}>
                    {kpi.delta}
                  </p>
                )}
              </Card>
            );
          })}
        </section>

        {/* ── Main grid: approvals (2 cols) + right column ──── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Approvals queue ── 2/3 width */}
          <div className="lg:col-span-2">
            <Card
              variant="raised"
              size="lg"
              header={
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <CardEyebrow>{t('approvalsEyebrow')}</CardEyebrow>
                    <CardTitle className="mt-1">
                      {t('approvalsTitle')}
                    </CardTitle>
                  </div>
                  <Link
                    href="/workflows"
                    className={cn(
                      'inline-flex items-center gap-1 text-small font-medium text-accent',
                      'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm'
                    )}
                  >
                    {t('viewAll')}
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              }
              flush
            >
              <ul role="list" className="divide-y divide-hairline">
                {HUMI_PENDING_REQUESTS.map((req) => {
                  const emp = employeeById(req.employeeId);
                  if (!emp) return null;
                  return (
                    <li
                      key={req.id}
                      className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-medium',
                            AVATAR_TONE_CLASS[emp.avatarTone]
                          )}
                        >
                          {emp.initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-body font-medium text-ink">
                            {emp.firstNameTh} {emp.lastNameTh}
                            <span className="font-normal text-ink-muted">
                              {' '}
                              · {req.typeLabel}
                            </span>
                          </p>
                          <p className="mt-0.5 text-small text-ink-muted">
                            {req.dateRangeLabel} &nbsp;•&nbsp;{' '}
                            {req.submittedLabel}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leadingIcon={<X size={14} />}
                          aria-label={`${t('reject')} — ${emp.firstNameTh} ${emp.lastNameTh}`}
                        >
                          {t('reject')}
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          leadingIcon={<Check size={14} />}
                          aria-label={`${t('approve')} — ${emp.firstNameTh} ${emp.lastNameTh}`}
                        >
                          {t('approve')}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>

            {/* Recent activity timeline */}
            <div className="mt-6">
              <Card
                variant="raised"
                size="lg"
                header={
                  <div className="flex flex-col">
                    <CardEyebrow>{t('activityEyebrow')}</CardEyebrow>
                    <CardTitle className="mt-1">
                      {t('activityTitle')}
                    </CardTitle>
                  </div>
                }
              >
                <ol role="list" className="relative">
                  <div
                    aria-hidden
                    className="absolute left-[5px] top-2 bottom-2 w-px bg-hairline"
                  />
                  {HUMI_RECENT_ACTIVITY.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 py-3 first:pt-1 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'relative z-10 mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-surface',
                          ACTIVITY_DOT_CLASS[item.tone]
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-body text-ink">{item.title}</p>
                        <p className="mt-0.5 text-small text-ink-muted">
                          {item.timeLabel}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>

          {/* Right column: my-leave + latest payroll */}
          <aside className="flex flex-col gap-6">
            <Card variant="raised" size="lg" tone="canvas">
              <CardEyebrow>{t('myLeaveEyebrow')}</CardEyebrow>
              <CardTitle className="mt-1">{t('myLeaveTitle')}</CardTitle>

              <dl className="mt-5 space-y-4">
                <LeaveBar
                  label={t('leaveAnnual')}
                  remaining={HUMI_MY_LEAVE.annualRemaining}
                  total={HUMI_MY_LEAVE.annualTotal}
                  tone="accent"
                />
                <LeaveBar
                  label={t('leaveSick')}
                  remaining={HUMI_MY_LEAVE.sickRemaining}
                  total={HUMI_MY_LEAVE.sickTotal}
                  tone="sage"
                />
                <LeaveBar
                  label={t('leavePersonal')}
                  remaining={HUMI_MY_LEAVE.personalRemaining}
                  total={HUMI_MY_LEAVE.personalTotal}
                  tone="indigo"
                />
              </dl>

              <div className="mt-5">
                <Link
                  href="/leave"
                  className={cn(
                    'inline-flex items-center gap-1 text-small font-medium text-accent',
                    'hover:underline'
                  )}
                >
                  {t('myLeaveCta')}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </Card>

            <Card variant="raised" size="lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <CardEyebrow>{t('payrollEyebrow')}</CardEyebrow>
                  <CardTitle className="mt-1">
                    {HUMI_LATEST_PAYROLL.periodLabel}
                  </CardTitle>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
                    'text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]',
                    'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]'
                  )}
                >
                  <Circle size={6} fill="currentColor" aria-hidden />
                  {t('payrollPaid')}
                </span>
              </div>
              <p
                className={cn(
                  'mt-4 font-display font-semibold text-ink tabular-nums',
                  'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
                )}
              >
                {HUMI_LATEST_PAYROLL.netAmountLabel}
              </p>
              <p className="mt-1 text-small text-ink-muted">
                {t('payrollPaidOn', { date: HUMI_LATEST_PAYROLL.payDateLabel })}
              </p>
              <div className="mt-4">
                <Link
                  href="/payslip"
                  className={cn(
                    'inline-flex items-center gap-1 text-small font-medium text-accent',
                    'hover:underline'
                  )}
                >
                  {t('payrollCta')}
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Helper: leave balance bar
// ────────────────────────────────────────────────────────────

function LeaveBar({
  label,
  remaining,
  total,
  tone,
}: {
  label: string;
  remaining: number;
  total: number;
  tone: 'accent' | 'sage' | 'indigo';
}) {
  const pct = Math.min(100, Math.max(0, (remaining / total) * 100));
  const trackClass: Record<typeof tone, string> = {
    accent: 'bg-accent',
    sage: 'bg-[color:var(--color-sage)]',
    indigo: 'bg-[color:var(--color-accent-alt)]',
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <dt className="text-small text-ink-soft">{label}</dt>
        <dd className="font-mono text-small text-ink tabular-nums">
          {remaining} / {total}
        </dd>
      </div>
      <div
        role="progressbar"
        aria-valuenow={remaining}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={label}
        className="h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
      >
        <div
          className={cn('h-full rounded-full', trackClass[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

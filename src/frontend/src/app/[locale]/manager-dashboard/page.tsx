'use client';

// ════════════════════════════════════════════════════════════
// /manager-dashboard — Manager landing (A-1)
// KPI strip + approval queue snippet + quick action tile grid
// + recent activity. Humi tokens only. Pattern follows /home.
// ════════════════════════════════════════════════════════════

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';
import {
  Check,
  X,
  ArrowRight,
  Clock,
  ClipboardList,
  Zap,
  ChevronRight,
  Inbox,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardEyebrow, CardTitle, Button } from '@/components/humi';
import { QuickActionsTile, MANAGER_ACTIONS, type QuickAction } from '@/components/humi/molecules/QuickActionsTile';
import {
  HUMI_PENDING_REQUESTS,
  HUMI_EMPLOYEES,
  HUMI_RECENT_ACTIVITY,
  type HumiApprovalRequest,
} from '@/lib/humi-mock-data';

// ─── Mock KPI numbers (replaced by API in prod) ─────────────────────────────

const MANAGER_KPIS = [
  { id: 'pending',     labelKey: 'kpiPending',    value: '7',    tone: 'coral'   as const },
  { id: 'teamSize',    labelKey: 'kpiTeamSize',   value: '14',   tone: 'teal'    as const },
  { id: 'weekReview',  labelKey: 'kpiWeekReview', value: '3',    tone: 'butter'  as const },
  { id: 'timeSaved',   labelKey: 'kpiTimeSaved',  value: '4.5h', tone: 'accent'  as const },
];

// Map for tone → CSS variable names for KPI cards
const KPI_TONE_STYLES: Record<string, { bg: string; text: string }> = {
  coral:  { bg: 'var(--color-coral-soft,  #fff0ee)', text: 'var(--color-coral,  #e55a4e)' },
  teal:   { bg: 'var(--color-teal-soft,   #edfaf7)', text: 'var(--color-teal,   #0aaa82)' },
  butter: { bg: 'var(--color-butter-soft, #fffbee)', text: 'var(--color-warning, #c59000)' },
  accent: { bg: 'var(--color-accent-soft, #edf0ff)', text: 'var(--color-accent,  #4b56f0)' },
};

// Severity chip labels
const SEVERITY_LABELS: Record<string, string> = {
  'leave-vacation': 'ปกติ',
  'leave-sick':     'ปกติ',
  expense:          'เร่งด่วน',
  overtime:         'ปกติ',
};

const SEVERITY_TONES: Record<string, string> = {
  'leave-vacation': 'humi-tag',
  'leave-sick':     'humi-tag',
  expense:          'humi-tag humi-tag--coral',
  overtime:         'humi-tag',
};

const AVATAR_TONE_MAP = {
  teal:   'humi-avatar humi-avatar--teal',
  sage:   'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink:    'humi-avatar humi-avatar--ink',
  indigo: 'humi-avatar humi-avatar--teal',
} as const;

const ACTIVITY_DOT: Record<string, string> = {
  success: 'var(--color-success, #28a745)',
  accent:  'var(--color-accent)',
  warning: 'var(--color-warning)',
  muted:   'var(--color-hairline)',
};

// ─── Quick actions (manager-specific) ────────────────────────────────────────
// Spec: "อนุมัติ Pending", "ดูทีมของฉัน", "รายงาน OT" + MANAGER_ACTIONS extras
const MANAGER_QUICK_ACTIONS: QuickAction[] = [
  ...MANAGER_ACTIONS,
];

export default function ManagerDashboardPage() {
  const t      = useTranslations('manager_dashboard');
  const locale = useLocale();

  const username = useAuthStore((s) => s.username);

  const queueItems = HUMI_PENDING_REQUESTS.slice(0, 5);

  return (
    <div className="pb-8">
      {/* ── Header card ──────────────────────────────────────────────────── */}
      <div className="humi-card humi-grain mb-5" style={{ overflow: 'hidden' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 110, height: 140, right: -20, top: -20, opacity: 0.75 }}
          aria-hidden
        />
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>
          {t('eyebrow')}
        </div>
        <h1 className="humi-hero-title" style={{ maxWidth: 500 }}>
          {t('greeting')}{username ? ` คุณ${username.split(' ')[0]}` : ''}
        </h1>
        <p style={{ color: 'var(--color-ink-soft)', fontSize: 14, marginTop: 6 }}>
          {t('subtitle')}
        </p>
        <div className="humi-row" style={{ marginTop: 18, gap: 10, flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}/quick-approve`}
            className="humi-button humi-button--primary"
          >
            <Inbox size={15} />
            {t('ctaApprove')}
          </Link>
        </div>
      </div>

      {/* ── KPI strip (4 cards) ──────────────────────────────────────────── */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}
      >
        {MANAGER_KPIS.map((kpi) => {
          const style = KPI_TONE_STYLES[kpi.tone];
          return (
            <div
              key={kpi.id}
              className="humi-card"
              style={{ padding: '18px 20px' }}
            >
              <div
                className="humi-eyebrow"
                style={{ marginBottom: 8, fontSize: 11 }}
              >
                {t(kpi.labelKey)}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: style.text,
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Row: Approval queue + Recent activity ────────────────────────── */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]" style={{ marginBottom: 20 }}>
        {/* Approval queue snippet */}
        <div className="humi-card">
          <div className="humi-row" style={{ marginBottom: 14 }}>
            <div>
              <div className="humi-eyebrow">{t('queueEyebrow')}</div>
              <h2
                className="mt-1 font-display font-semibold tracking-tight text-ink"
                style={{ fontSize: 18 }}
              >
                {t('queueTitle')}
              </h2>
            </div>
            <span
              className="humi-tag humi-tag--coral"
              style={{ marginLeft: 'auto' }}
            >
              {queueItems.length} {t('queueBadge')}
            </span>
          </div>

          <ul className="humi-list" role="list">
            {queueItems.map((req) => {
              const emp = HUMI_EMPLOYEES.find((e) => e.id === req.employeeId);
              if (!emp) return null;
              const tone = (emp.avatarTone === 'indigo' ? 'teal' : emp.avatarTone) as keyof typeof AVATAR_TONE_MAP;
              return (
                <li
                  key={req.id}
                  className="humi-row-item"
                  style={{ paddingTop: 10, paddingBottom: 10 }}
                >
                  <span className={AVATAR_TONE_MAP[tone]} aria-hidden>
                    {emp.initials}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                      {emp.firstNameTh} {emp.lastNameTh}
                      <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>
                        {' '}· {req.typeLabel}
                      </span>
                    </div>
                    <div
                      className="humi-row"
                      style={{ gap: 6, marginTop: 3, flexWrap: 'wrap' }}
                    >
                      <span
                        style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}
                      >
                        {req.dateRangeLabel}
                      </span>
                      <span style={{ color: 'var(--color-hairline)' }}>·</span>
                      <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                        <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />
                        {req.submittedLabel}
                      </span>
                      <span className={SEVERITY_TONES[req.type]} style={{ fontSize: 11 }}>
                        {SEVERITY_LABELS[req.type]}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/quick-approve/${req.id}`}
                    aria-label={`${t('viewDetail')} ${emp.firstNameTh}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-hairline)',
                      color: 'var(--color-ink-soft)',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronRight size={15} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: 14 }}>
            <Link
              href={`/${locale}/quick-approve`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-transparent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t('queueViewAll')} <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div className="humi-card">
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>
            {t('activityEyebrow')}
          </div>
          <h2
            className="mb-3 font-display font-semibold tracking-tight text-ink"
            style={{ fontSize: 18 }}
          >
            {t('activityTitle')}
          </h2>
          <ul className="humi-col" style={{ gap: 12 }} role="list">
            {HUMI_RECENT_ACTIVITY.slice(0, 5).map((item) => (
              <li key={item.id} className="humi-row" style={{ gap: 10, alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: ACTIVITY_DOT[item.tone],
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                  aria-hidden
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginTop: 2 }}>
                    {item.timeLabel}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Quick action tile grid ────────────────────────────────────────── */}
      <QuickActionsTile
        actions={MANAGER_QUICK_ACTIONS}
        eyebrow={t('quickActionsEyebrow')}
      />
    </div>
  );
}

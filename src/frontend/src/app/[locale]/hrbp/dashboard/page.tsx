'use client';

// ════════════════════════════════════════════════════════════
// /hrbp/dashboard — HRBP landing (A-3)
// Same layout as Manager but adds:
//   • Talent Search nav (gated by <Capability action="talentSearch">)
//   • Bulk Approve shortcut (gated by <Capability action="bulkApprove">)
//   • HRBP-scoped KPIs (company-wide, not just team)
// ════════════════════════════════════════════════════════════

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';
import {
  ArrowRight,
  Clock,
  Users,
  ChevronRight,
  Inbox,
  Search,
  BarChart3,
  ListChecks,
  Briefcase,
} from 'lucide-react';
import { Capability } from '@/components/humi';
import { QuickActionsTile, type QuickAction } from '@/components/humi/molecules/QuickActionsTile';
import { ExitFeedbackPanel } from '@/components/hrbp/ExitFeedbackPanel';
import {
  HUMI_PENDING_REQUESTS,
  HUMI_EMPLOYEES,
  HUMI_RECENT_ACTIVITY,
} from '@/lib/humi-mock-data';

// ─── Mock HRBP KPIs (company-wide scope) ──────────────────────────────────

const HRBP_KPIS = [
  { id: 'pending',    labelKey: 'kpiPending',    value: '23',    tone: 'warning' as const },
  { id: 'headcount',  labelKey: 'kpiHeadcount',  value: '1,284', tone: 'teal'   as const },
  { id: 'weekReview', labelKey: 'kpiWeekReview', value: '11',    tone: 'butter' as const },
  { id: 'timeSaved',  labelKey: 'kpiTimeSaved',  value: '12.5h', tone: 'accent' as const },
];

const KPI_TONE_STYLES: Record<string, { bg: string; text: string }> = {
  warning: { bg: 'var(--color-warning-soft)', text: 'var(--color-danger-ink)' },
  teal:    { bg: 'var(--color-accent-soft)', text: 'var(--color-accent)' },
  butter:  { bg: 'var(--color-butter-soft)', text: 'var(--color-danger-ink)' },
  accent:  { bg: 'var(--color-accent-alt-soft)', text: 'var(--color-accent-alt)' },
};

const SEVERITY_LABELS: Record<string, string> = {
  'leave-vacation': 'ปกติ',
  'leave-sick':     'ปกติ',
  expense:          'เร่งด่วน',
  overtime:         'ปกติ',
};

const SEVERITY_TONES: Record<string, string> = {
  'leave-vacation': 'humi-tag',
  'leave-sick':     'humi-tag',
  expense:          'humi-tag humi-tag--butter',
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
  success: 'var(--color-success)',
  accent:  'var(--color-accent)',
  warning: 'var(--color-warning)',
  muted:   'var(--color-hairline)',
};

// ─── Quick actions (HRBP-specific) ──────────────────────────────────────────

function makeHRBPActions(locale: string): QuickAction[] {
  return [
    {
      icon: <Inbox size={22} aria-hidden />,
      labelTh: 'อนุมัติ Pending',
      labelEn: 'Pending Approvals',
      href: `/${locale}/quick-approve`,
    },
    {
      icon: <Search size={22} aria-hidden />,
      labelTh: 'Talent Search',
      labelEn: 'Talent Search',
      href: `/${locale}/hrbp/talent-search`,
    },
    {
      icon: <BarChart3 size={22} aria-hidden />,
      labelTh: 'ดูรายงาน HRBP',
      labelEn: 'HRBP Reports',
      href: `/${locale}/hrbp/reports`,
    },
    {
      icon: <ListChecks size={22} aria-hidden />,
      labelTh: 'Bulk Approve',
      labelEn: 'Bulk Approve',
      href: `/${locale}/quick-approve/bulk`,
    },
    {
      icon: <Users size={22} aria-hidden />,
      labelTh: 'ดูพนักงานทั้งหมด',
      labelEn: 'All Employees',
      href: `/${locale}/admin/employees`,
    },
    {
      icon: <Briefcase size={22} aria-hidden />,
      labelTh: 'จัดการตำแหน่ง',
      labelEn: 'Manage Positions',
      href: `/${locale}/admin/positions`,
    },
  ];
}

export default function HRBPDashboardPage() {
  const t      = useTranslations('hrbp_dashboard');
  const locale = useLocale();

  const username = useAuthStore((s) => s.username);

  const queueItems = HUMI_PENDING_REQUESTS.slice(0, 5);

  const hrbpActions = makeHRBPActions(locale);

  return (
    <div className="pb-8">
      {/* ── Header card ──────────────────────────────────────────────────── */}
      <div className="humi-card humi-grain mb-5" style={{ overflow: 'hidden' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 110, height: 140, right: -20, top: -20, opacity: 0.75 }}
          aria-hidden
        />
        <div
          className="humi-blob humi-blob--butter hidden lg:block"
          style={{ width: 60, height: 80, right: 100, bottom: -15, opacity: 0.7 }}
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
          {/* Talent Search — HRBP-only */}
          <Capability action="talentSearch">
            <Link
              href={`/${locale}/hrbp/talent-search`}
              className="humi-button humi-button--ghost"
              data-testid="talent-search-cta"
            >
              <Search size={15} />
              {t('ctaTalentSearch')}
            </Link>
          </Capability>
          {/* Bulk Approve — HRBP-only */}
          <Capability action="bulkApprove">
            <Link
              href={`/${locale}/quick-approve/bulk`}
              className="humi-button humi-button--ghost"
              data-testid="bulk-approve-cta"
            >
              <ListChecks size={15} />
              {t('ctaBulkApprove')}
            </Link>
          </Capability>
        </div>
      </div>

      {/* ── KPI strip (4 cards) ──────────────────────────────────────────── */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}
      >
        {HRBP_KPIS.map((kpi) => {
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

      {/* ── Exit Feedback (STA-124) — read-only, admin-captured ──────────── */}
      <ExitFeedbackPanel />

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
              className="humi-tag humi-tag--butter"
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
                      <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
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
                    data-testid={`queue-item-link-${req.id}`}
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

          {/* Bulk approve shortcut — HRBP/SPD only */}
          <Capability action="bulkApprove">
            <div
              style={{
                marginTop: 12,
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-accent-soft)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              data-testid="bulk-approve-shortcut"
            >
              <ListChecks size={16} color="var(--color-accent)" aria-hidden />
              <span style={{ fontSize: 13, color: 'var(--color-accent)', fontWeight: 500, flex: 1 }}>
                {t('bulkApproveHint')}
              </span>
              <Link
                href={`/${locale}/quick-approve/bulk`}
                style={{ fontSize: 12, color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}
              >
                {t('bulkApproveAction')} →
              </Link>
            </div>
          </Capability>

          <div style={{ marginTop: 12 }}>
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

      {/* ── Talent Search nav (HRBP-only) ────────────────────────────────── */}
      <Capability action="talentSearch">
        <div
          className="humi-card"
          style={{ marginBottom: 20 }}
          data-testid="talent-search-nav"
        >
          <div className="humi-eyebrow" style={{ marginBottom: 10 }}>
            {t('talentEyebrow')}
          </div>
          <div className="humi-row" style={{ gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h2
                className="font-display font-semibold tracking-tight text-ink"
                style={{ fontSize: 18, marginBottom: 4 }}
              >
                {t('talentTitle')}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                {t('talentDesc')}
              </p>
            </div>
            <Link
              href={`/${locale}/hrbp/talent-search`}
              className="humi-button humi-button--primary"
              data-testid="talent-search-link"
            >
              <Search size={15} />
              {t('talentCta')}
            </Link>
          </div>
        </div>
      </Capability>

      {/* ── Quick action tile grid ────────────────────────────────────────── */}
      <QuickActionsTile
        actions={hrbpActions}
        eyebrow={t('quickActionsEyebrow')}
      />
    </div>
  );
}

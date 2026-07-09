'use client';

// ════════════════════════════════════════════════════════════
// /home — Humi dashboard landing
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/home.jsx
// Adapted retail → generic HR (HQ workforce, not single store).
// NO raw hex, NO red, AppShell owns sidebar+topbar.
// c2-home-functional: time-based greeting + useAuthStore username
// ════════════════════════════════════════════════════════════

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';
import {
  Plus,
  Check,
  X,
  Megaphone,
  FileText,
  ArrowRight,
  PartyPopper,
  Pin,
  type LucideIcon,
  MessageSquare,
  ThumbsUp,
  Network,
  BarChart3,
  CalendarPlus,
  Wallet,
  User,
  FilePlus,
  Clock,
  Inbox,
  Bell,
  Users2,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { isManager } from '@/lib/rbac';
import { Button } from '@/components/humi';
import { AttendanceKpiCards } from '@/components/home/AttendanceKpiCards';
import { QuickActionsTile, DEFAULT_ESS_ACTIONS, type QuickAction } from '@/components/humi/molecules/QuickActionsTile';
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService';
import type { QuickActionSize } from '@/lib/admin/types/adminSelfService';
import {
  HUMI_PENDING_REQUESTS,
  HUMI_EMPLOYEES,
  HUMI_PENDING_DOCS,
  HUMI_ANNOUNCEMENTS,
  HUMI_WEEK_RECOGNITION,
} from '@/lib/humi-mock-data';

// Lucide icon map for adminSelfService QuickActionTile icon strings.
const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  FilePlus,
  MessageSquare,
  ThumbsUp,
  Network,
  BarChart3,
  CalendarPlus,
  Wallet,
  User,
  Clock,
  Inbox,
  Bell,
  Users2,
  GraduationCap,
};

export function makeAdminQuickActions(
  tiles: {
    id: string;
    label: string;
    labelEn?: string;
    icon: string;
    href: string;
    enabled: boolean;
    order: number;
    tone?: 'teal' | 'indigo' | 'amber' | 'coral';
    size?: QuickActionSize;
  }[],
): QuickAction[] {
  return tiles
    .filter((t) => t.enabled)
    .sort((a, b) => a.order - b.order)
    .map((t) => ({
      icon: (() => {
        const Icon = ICON_MAP[t.icon];
        return Icon ? <Icon size={22} aria-hidden /> : <FileText size={22} aria-hidden />;
      })(),
      labelTh: t.label,
      labelEn: t.labelEn ?? t.label,
      href: t.href,
      tone: t.tone, // carry the design tone through so home chips aren't all-teal
      size: t.size ?? '1x1', // STA-246 — carry size so the home grid paints varied spans
    }));
}

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
  indigo: 'humi-avatar humi-avatar--teal',
} as const;

function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'สวัสดีตอนเช้า';
  if (h < 18) return 'สวัสดีตอนบ่าย';
  return 'สวัสดีตอนเย็น';

}

export default function HumiHomePage() {
  const t = useTranslations('humiHero');
  const router = useRouter();
  const username = useAuthStore((s) => s.username);
  const roles = useAuthStore((s) => s.roles);
  const greeting = getTimeGreeting();

  // BRD #182 — Quick Actions from admin config bus.
  // Read published quickActions; fall back to DEFAULT_ESS_ACTIONS if empty.
  const publishedQuickActions = useAdminSelfService((s) => s.published.quickActions);
  const quickActions: QuickAction[] = publishedQuickActions.length > 0
    ? makeAdminQuickActions(publishedQuickActions)
    : DEFAULT_ESS_ACTIONS;

  const top2 = HUMI_PENDING_REQUESTS.slice(0, 2);
  const feed = HUMI_ANNOUNCEMENTS.slice(0, 2);

  return (
    <div className="pb-8">
      {/* Top actions bar (AppShell already renders Topbar) */}
      <div className="mb-5 flex items-center justify-end">
        <Button
          variant="primary"
          leadingIcon={<Plus size={16} />}
          onClick={() => router.push('/th/requests')}
        >
          {t('newRequest')}
        </Button>
      </div>

      {/* STA-235 — manager attendance KPIs (relocated from the Team Timesheet page) */}
      {isManager(roles) && (
        <div className="mb-5">
          <AttendanceKpiCards />
        </div>
      )}

      {/* Row 1 — hero greeting (today-presence card moved to /time, STA-248) */}
      <div
        className="humi-card humi-grain"
        style={{ overflow: 'hidden', paddingRight: 'clamp(0px, 9.375vw, 150px)' }}
      >
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 120, height: 150, right: -30, top: -30, opacity: 0.85 }}
          aria-hidden
        />
        <div
          className="humi-blob humi-blob--coral hidden lg:block"
          style={{ width: 80, height: 100, right: 60, bottom: -20, opacity: 0.7 }}
          aria-hidden
        />
        <div
          className="humi-blob humi-blob--butter hidden lg:block"
          style={{ width: 44, height: 56, right: 110, top: 80, opacity: 0.9 }}
          aria-hidden
        />
        <div className="humi-eyebrow" style={{ marginBottom: 10 }}>
          {t('dateEyebrow')}
        </div>
        <h1 className="humi-hero-title" style={{ maxWidth: 460 }}>
          {greeting}{username ? ` คุณ${username.split(' ')[0]}` : ''}
          <br />
          <span className="humi-hero-title-soft">{t('greetingSub')}</span>
        </h1>
        <div className="humi-row" style={{ marginTop: 22, gap: 10, flexWrap: 'wrap' }}>
          <Link
            href="/th/timeoff"
            className="humi-button humi-button--primary"
          >
            <Check size={16} />
            {t('ctaApprove')}
          </Link>
          <Link
            href="/th/announcements"
            className="humi-button humi-button--ghost"
          >
            <Megaphone size={16} />
            {t('ctaAnnouncements')}
          </Link>
        </div>
      </div>

      {/* Row 1.5 — Quick Actions (BRD #182: from admin config bus) */}
      <div style={{ marginTop: 20 }}>
        <QuickActionsTile actions={quickActions} />
      </div>

      {/* Row 2 — approvals + docs */}
      <div
        className="grid gap-5 lg:grid-cols-[1.35fr_1fr]"
        style={{ marginTop: 20 }}
      >
        <div className="humi-card">
          <div className="humi-row" style={{ marginBottom: 6 }}>
            <div>
              <div className="humi-eyebrow">{t('pendingEyebrow')}</div>
              <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                {t('pendingTitle')}
              </h3>
            </div>
            <span
              className="humi-tag humi-tag--coral"
              style={{ marginLeft: 'auto' }}
            >
              {t('pendingTag')}
            </span>
          </div>
          <ul className="humi-list" role="list">
            {top2.map((req) => {
              const emp = HUMI_EMPLOYEES.find((e) => e.id === req.employeeId);
              if (!emp) return null;
              const tone = emp.avatarTone === 'indigo' ? 'teal' : emp.avatarTone;
              return (
                <li key={req.id} className="humi-row-item">
                  <span className={AVATAR_TONE_MAP[tone]} aria-hidden>
                    {emp.initials}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                      {emp.firstNameTh} {emp.lastNameTh}{' '}
                      <span style={{ color: 'var(--color-ink-muted)', fontWeight: 400 }}>
                        · {req.typeLabel}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 2 }}>
                      {req.dateRangeLabel} &nbsp;•&nbsp; {req.submittedLabel}
                    </div>
                  </div>
                  <div className="humi-row" style={{ gap: 8 }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      leadingIcon={<X size={14} />}
                    >
                      ปฏิเสธ
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leadingIcon={<Check size={14} />}
                    >
                      อนุมัติ
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="humi-card humi-card--cream">
          <div className="humi-eyebrow">{t('docsEyebrow')}</div>
          <h3 className="mt-1.5 mb-3.5 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
            {t('docsTitle')}
          </h3>
          {HUMI_PENDING_DOCS.map((d) => (
            <div
              key={d.id}
              className="humi-row"
              style={{
                padding: '12px 0',
                borderTop: '1px solid var(--color-hairline-soft)',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 42,
                  borderRadius: 6,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-ink-soft)',
                }}
                aria-hidden
              >
                <FileText size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                  {d.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                  {d.sub}
                </div>
              </div>
              {d.nearDue && (
                <span className="humi-tag humi-tag--butter">{t('docsNearDue')}</span>
              )}
            </div>
          ))}
          <Link
            href="/th/benefits-hub"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent px-4 py-2 text-body font-medium text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t('docsAll')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Row 3 — announcements + calendar/birthdays */}
      <div
        className="grid gap-5 lg:grid-cols-[1.35fr_1fr]"
        style={{ marginTop: 20 }}
      >
        <div className="humi-card">
          <div className="humi-row" style={{ marginBottom: 12 }}>
            <div>
              <div className="humi-eyebrow">{t('feedEyebrow')}</div>
              <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                {t('feedTitle')}
              </h3>
            </div>
            <Link
              href="/th/announcements"
              className="ml-auto inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-small font-medium text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t('openFeed')} <ArrowRight size={14} />
            </Link>
          </div>

          {feed.map((p) => (
            <article
              key={p.id}
              className={cn('humi-post', p.pinned && 'humi-post--pin')}
            >
              <div className="humi-row">
                <span className={AVATAR_TONE_MAP[p.authorTone]} aria-hidden>
                  {p.authorInitials}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-ink)' }}>
                    <b>{p.author}</b>{' '}
                    <span style={{ color: 'var(--color-ink-muted)' }}>· {p.timeLabel}</span>
                  </div>
                </div>
                {p.pinned && (
                  <span className="humi-tag humi-tag--ink">
                    <Pin size={11} /> {t('pinnedTag')}
                  </span>
                )}
              </div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  marginTop: 10,
                  fontWeight: 600,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-ink)',
                }}
              >
                {p.title}
              </h4>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: 14,
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                {p.body}
              </p>
              <div
                className="humi-row"
                style={{ marginTop: 12, gap: 10, flexWrap: 'wrap' }}
              >
                {p.reactions.map((x) => (
                  <span key={x} className="humi-tag">
                    {x}
                  </span>
                ))}
                <span className="humi-spacer" />
                <Button variant="ghost" size="sm">
                  {t('replyCta')}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Week recognition (ink card) — promoted up; calendar removed per Req3 */}
        <div
          data-testid="week-recognition"
          className="humi-card humi-card--ink"
          style={{ overflow: 'hidden', position: 'relative' }}
        >
          <div
            className="humi-blob humi-blob--teal"
            style={{ width: 90, height: 110, right: -20, bottom: -30, opacity: 0.55 }}
            aria-hidden
          />
          <div
            className="humi-eyebrow"
            style={{ color: 'var(--color-accent)' }}
          >
            <PartyPopper
              size={12}
              style={{ display: 'inline-block', verticalAlign: -2, marginRight: 4 }}
              aria-hidden
            />
            {HUMI_WEEK_RECOGNITION.eyebrow}
          </div>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-[color:var(--color-canvas-soft)]">
            {HUMI_WEEK_RECOGNITION.title}
          </h3>
          <div className="humi-row" style={{ marginTop: 14, gap: 0 }}>
            {HUMI_WEEK_RECOGNITION.initials.map((a, idx) => (
              <span
                key={a.i}
                className={AVATAR_TONE_MAP[a.tone]}
                style={{
                  border: '2px solid var(--color-ink)',
                  marginLeft: idx === 0 ? 0 : -8,
                }}
                aria-hidden
              >
                {a.i}
              </span>
            ))}
            <Button variant="primary" style={{ marginLeft: 'auto' }}>
              {t('weekGreetCta')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  ChevronRight,
  ChevronLeft,
  PartyPopper,
  Pin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/humi';
import {
  HUMI_PENDING_REQUESTS,
  HUMI_EMPLOYEES,
  HUMI_TODAY_PRESENCE,
  HUMI_PENDING_DOCS,
  HUMI_ANNOUNCEMENTS,
  HUMI_CAL_EVENTS,
  HUMI_WEEK_RECOGNITION,
} from '@/lib/humi-mock-data';

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
  indigo: 'humi-avatar humi-avatar--teal',
} as const;

const CAL_DAYS_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

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
  const greeting = getTimeGreeting();

  const top2 = HUMI_PENDING_REQUESTS.slice(0, 2);
  const feed = HUMI_ANNOUNCEMENTS.slice(0, 2);
  const ringPct = Math.round(
    (HUMI_TODAY_PRESENCE.workingCount / HUMI_TODAY_PRESENCE.totalCount) * 100,
  );

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

      {/* Row 1 — hero greeting + today presence */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        {/* Hero card */}
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

        {/* Today presence */}
        <div className="humi-card">
          <div className="humi-row" style={{ alignItems: 'flex-start' }}>
            <div>
              <div className="humi-eyebrow">{t('todayEyebrow')}</div>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
                {t('todayTitle')}
              </h3>
            </div>
            <span className="humi-tag humi-tag--accent" style={{ marginLeft: 'auto' }}>
              {t('tagLive')}
            </span>
          </div>
          <div className="humi-row" style={{ marginTop: 18, gap: 20 }}>
            <div
              className="humi-ring"
              style={{ ['--p' as string]: ringPct } as React.CSSProperties}
              role="img"
              aria-label={`${HUMI_TODAY_PRESENCE.workingCount} / ${HUMI_TODAY_PRESENCE.totalCount} ${t('ringWorkingUnit')}`}
            >
              <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                <div className="humi-ring-val">
                  {HUMI_TODAY_PRESENCE.workingCount.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                  }}
                >
                  {t('ringWorkingUnit')}
                </div>
              </div>
            </div>
            <div className="humi-col" style={{ gap: 10, flex: 1 }}>
              <LegendRow
                dotColor="var(--color-accent)"
                label={t('legendPresent')}
                value={HUMI_TODAY_PRESENCE.present}
              />
              <LegendRow
                dotColor="var(--color-warning)"
                label={t('legendAbsent')}
                value={HUMI_TODAY_PRESENCE.absent}
              />
              <LegendRow
                dotColor="var(--color-hairline)"
                label={t('legendOffShift')}
                value={HUMI_TODAY_PRESENCE.offShift}
              />
            </div>
          </div>
          <hr className="humi-divider" />
          <div className="humi-row" style={{ gap: 0 }}>
            {HUMI_TODAY_PRESENCE.teamInitials.map((initials, idx) => (
              <span
                key={initials}
                className={cn(
                  AVATAR_TONE_MAP[
                    (['teal', 'sage', 'butter', 'ink', 'teal'] as const)[idx]
                  ],
                )}
                style={{
                  marginLeft: idx === 0 ? 0 : -8,
                  border: '2px solid var(--color-surface)',
                  width: 30,
                  height: 30,
                  fontSize: 11,
                }}
                aria-hidden
              >
                {initials}
              </span>
            ))}
            <span
              style={{
                fontSize: 13,
                color: 'var(--color-ink-muted)',
                marginLeft: 8,
              }}
            >
              {HUMI_TODAY_PRESENCE.moreLabel}
            </span>
          </div>
        </div>
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
              <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
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
          <h3 className="mt-1.5 mb-3.5 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
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
              <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
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

        <div className="humi-col" style={{ gap: 20 }}>
          {/* Calendar */}
          <div className="humi-card">
            <div className="humi-row">
              <div>
                <div className="humi-eyebrow">{t('calendarEyebrow')}</div>
                <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
                  {t('calendarTitle')}
                </h3>
              </div>
              <span className="humi-spacer" />
              <button
                type="button"
                aria-label={t('prevMonth')}
                className="humi-icon-btn"
                style={{ width: 32, height: 32 }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                aria-label={t('nextMonth')}
                className="humi-icon-btn"
                style={{ width: 32, height: 32, marginLeft: 4 }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="humi-cal" style={{ marginTop: 14 }} role="grid" aria-label={t('calendarEyebrow')}>
              {CAL_DAYS_TH.map((d) => (
                <div key={d} className="humi-cal-dow" role="columnheader">
                  {d}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2;
                const off = day < 1 || day > 30;
                const has = [8, 14, 17, 21, 28].includes(day);
                const sel = day === 21;
                const range = [28, 29, 30].includes(day);
                return (
                  <div
                    key={i}
                    role="gridcell"
                    className={cn(
                      'humi-cal-day',
                      off && 'humi-cal-day--off',
                      has && 'humi-cal-day--has',
                      sel && 'humi-cal-day--sel',
                      range && 'humi-cal-day--range',
                    )}
                  >
                    {off ? '' : day}
                  </div>
                );
              })}
            </div>
            <hr className="humi-divider" />
            <div className="humi-col" style={{ gap: 10 }}>
              {HUMI_CAL_EVENTS.map((ev) => (
                <div key={ev.id} className="humi-row">
                  <div
                    style={{
                      width: 6,
                      height: 26,
                      borderRadius: 3,
                      background:
                        ev.tone === 'accent'
                          ? 'var(--color-accent)'
                          : 'var(--color-warning)',
                    }}
                    aria-hidden
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink)' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                      {ev.timeLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Week recognition (ink card) */}
          <div
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
            <h3 className="mt-2 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-[color:var(--color-canvas-soft)]">
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
    </div>
  );
}

function LegendRow({
  dotColor,
  label,
  value,
}: {
  dotColor: string;
  label: string;
  value: number;
}) {
  return (
    <div className="humi-row" style={{ justifyContent: 'space-between' }}>
      <div className="humi-row">
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: dotColor,
          }}
          aria-hidden
        />
        <span style={{ color: 'var(--color-ink-soft)', fontSize: 13 }}>{label}</span>
      </div>
      <b style={{ color: 'var(--color-ink)', fontSize: 14 }}>{value.toLocaleString()}</b>
    </div>
  );
}

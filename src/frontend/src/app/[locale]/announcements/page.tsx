'use client';

// ════════════════════════════════════════════════════════════
// /announcements — Humi team/company feed
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/announcements.jsx
// Adapted retail → generic HR (departments/functions, not stores).
// AppShell owns sidebar+topbar.
// c3-announcements-functional: filter tabs + pin toggle via Zustand persist
// ════════════════════════════════════════════════════════════

import { useTranslations } from 'next-intl';
import {
  Plus,
  Megaphone,
  Smile,
  Paperclip,
  Send,
  Pin,
  MoreHorizontal,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/humi';
import {
  HUMI_ANNOUNCEMENTS,
  HUMI_CHANNELS,
  HUMI_MY_PROFILE,
} from '@/lib/humi-mock-data';
import {
  useHumiAnnouncementsStore,
  type AnnouncementFilter,
} from '@/stores/humi-announcements-slice';

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
} as const;

const CHANNEL_DOT_COLOR = {
  teal: 'var(--color-accent)',
  butter: 'var(--color-butter)',
  sage: 'var(--color-sage)',
} as const;

export default function HumiAnnouncementsPage() {
  const t = useTranslations('humiAnnouncements');
  const { pinned, activeFilter, togglePin, setFilter } = useHumiAnnouncementsStore();

  // Filter posts by active tab
  const baseFiltered =
    activeFilter === 'all'
      ? HUMI_ANNOUNCEMENTS
      : HUMI_ANNOUNCEMENTS.filter((p) => p.kind === activeFilter);

  // Pinned posts sort to top (optimistic — uses slice pinned set)
  const filtered = [
    ...baseFiltered.filter((p) => pinned.includes(p.id) || p.pinned),
    ...baseFiltered.filter((p) => !pinned.includes(p.id) && !p.pinned),
  ];

  const filters: Array<[AnnouncementFilter, string]> = [
    ['all', t('filterAll')],
    ['ops', t('filterOps')],
    ['policy', t('filterPolicy')],
    ['recog', t('filterRecog')],
  ];

  return (
    <div className="pb-8">
      {/* Top action bar */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-small text-ink-muted">{t('subtitle')}</div>
        <Button variant="primary" leadingIcon={<Plus size={16} />}>
          {t('newPost')}
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Feed column */}
        <div>
          {/* Composer */}
          <div className="humi-card mb-4" style={{ padding: 16 }}>
            <div className="humi-row" style={{ alignItems: 'flex-start' }}>
              <span
                className={AVATAR_TONE_MAP[HUMI_MY_PROFILE.avatarTone]}
                aria-hidden
              >
                {HUMI_MY_PROFILE.initials}
              </span>
              <div style={{ flex: 1 }}>
                <button
                  type="button"
                  className="block w-full cursor-text rounded-xl bg-canvas-soft px-3.5 py-2.5 text-left text-body text-ink-muted hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t('composerPlaceholder')}
                </button>
                <div
                  className="humi-row"
                  style={{ marginTop: 10, gap: 6, flexWrap: 'wrap' }}
                >
                  <Button variant="ghost" size="sm" leadingIcon={<Megaphone size={13} />}>
                    {t('composerAnnounce')}
                  </Button>
                  <Button variant="ghost" size="sm" leadingIcon={<Smile size={13} />}>
                    {t('composerPraise')}
                  </Button>
                  <Button variant="ghost" size="sm" leadingIcon={<Paperclip size={13} />}>
                    {t('composerAttach')}
                  </Button>
                  <span className="humi-spacer" />
                  <Button variant="primary" size="sm" leadingIcon={<Send size={12} />}>
                    {t('composerSubmit')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter row */}
          <div className="mb-3.5 flex items-center gap-2">
            <div
              className="overflow-x-auto"
              style={{ WebkitOverflowScrolling: 'touch', flex: 1 }}
            >
              <div
                className="humi-tabs flex-nowrap"
                role="tablist"
                aria-label={t('filterAll')}
                style={{ width: 'max-content' }}
              >
                {filters.map(([k, l]) => (
                  <button
                    type="button"
                    key={k}
                    role="tab"
                    aria-selected={activeFilter === k}
                    onClick={() => setFilter(k)}
                    className={cn('humi-tab min-h-[44px]', activeFilter === k && 'humi-tab--active')}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <span className="humi-spacer" />
            <Button variant="ghost" size="sm" leadingIcon={<Filter size={13} />}>
              {t('filterScope')}
            </Button>
          </div>

          {/* Posts */}
          {filtered.map((p) => {
            const isPinned = pinned.includes(p.id) || p.pinned;
            return (
              <article
                key={p.id}
                className={cn('humi-post', isPinned && 'humi-post--pin')}
                style={{ marginBottom: 12 }}
              >
              <div className="humi-row">
                <span className={AVATAR_TONE_MAP[p.authorTone]} aria-hidden>
                  {p.authorInitials}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--color-ink)' }}>
                    <b>{p.author}</b>{' '}
                    <span style={{ color: 'var(--color-ink-muted)' }}>
                      · {p.channel} · {p.timeLabel}
                    </span>
                  </div>
                </div>
                {isPinned && (
                  <span className="humi-tag humi-tag--ink">
                    <Pin size={11} /> {t('pinnedTag')}
                  </span>
                )}
                {/* Pin toggle button */}
                <button
                  type="button"
                  aria-label={isPinned ? 'เลิกปักหมุด' : 'ปักหมุด'}
                  aria-pressed={isPinned}
                  className="humi-icon-btn h-11 w-11"
                  onClick={() => togglePin(p.id)}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: isPinned ? 'var(--color-accent)' : 'var(--color-ink-soft)',
                  }}
                >
                  <Pin size={14} />
                </button>
                <button
                  type="button"
                  aria-label="ตัวเลือกเพิ่มเติม"
                  className="humi-icon-btn h-11 w-11"
                  style={{
                    background: 'transparent',
                    border: 0,
                  }}
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <h3
                style={{
                  fontSize: 22,
                  marginTop: 12,
                  letterSpacing: '-0.015em',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  color: 'var(--color-ink-soft)',
                  fontSize: 14,
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {p.body}
              </p>
              <div
                className="humi-row"
                style={{ marginTop: 14, gap: 8, flexWrap: 'wrap' }}
              >
                <div className="humi-reacts">
                  {p.reactions.map((x) => (
                    <span key={x} className="humi-r">
                      {x}
                    </span>
                  ))}
                  <span className="humi-r" aria-label="เพิ่มรีแอคชัน">
                    <Smile size={12} />
                  </span>
                </div>
                <span className="humi-spacer" />
                <span
                  style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}
                >
                  {t('commentsLabel', { n: p.comments })}
                </span>
              </div>
              </article>
            );
          })}
        </div>

        {/* Right column */}
        <aside className="humi-col" style={{ gap: 16 }}>
          <div className="humi-card">
            <div className="humi-eyebrow">{t('channelsEyebrow')}</div>
            <div className="humi-col" style={{ gap: 6, marginTop: 10 }}>
              {HUMI_CHANNELS.map((ch) => (
                <div
                  key={ch.id}
                  className="humi-row"
                  style={{ padding: '8px 4px', borderRadius: 8 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: CHANNEL_DOT_COLOR[ch.tone],
                    }}
                    aria-hidden
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                    }}
                  >
                    # {ch.name}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    {ch.size}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="humi-card"
            style={{
              background: 'var(--color-warning-soft)',
              border: 0,
            }}
          >
            <div className="humi-eyebrow" style={{ color: '#6B4E14' }}>
              {t('draftEyebrow')}
            </div>
            <h3 className="mt-1.5 font-display text-[18px] font-semibold leading-[1.2] tracking-tight text-ink">
              {t('draftTitle')}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: 'var(--color-ink-soft)',
                marginTop: 6,
              }}
            >
              {t('draftMeta')}
            </p>
            <div style={{ marginTop: 12 }}>
              <Button variant="primary">{t('draftContinue')}</Button>
            </div>
          </div>

          <div className="humi-card">
            <div className="humi-eyebrow">{t('guideEyebrow')}</div>
            <p
              style={{
                fontSize: 13,
                color: 'var(--color-ink-soft)',
                marginTop: 8,
                lineHeight: 1.6,
              }}
            >
              {t('guideBody')}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Coffee,
  Heart,
  Megaphone,
  Plug,
  Shield,
  Users as UsersIcon,
  type LucideIcon,
} from 'lucide-react';
import { Avatar, Button, Card, CardEyebrow, CardTitle } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_LEARNING_CERTIFICATIONS,
  HUMI_LEARNING_COURSES,
  HUMI_LEARNING_PATH,
  HUMI_LEARNING_TEAM_READINESS,
  type HumiLearningCourse,
  type LearningCourseIcon,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// Humi /learning-directory (A12)
// Port of screens/learning_directory.jsx — retail → generic HR.
// 3-card hero row (path / certs / readiness) + tabs + 3-col grid.
// ════════════════════════════════════════════════════════════

type TabKey = 'assigned' | 'progress' | 'catalog' | 'history';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'assigned', label: 'มอบหมายให้ฉัน (ครบกำหนด 2)' },
  { key: 'progress', label: 'กำลังเรียน' },
  { key: 'catalog', label: 'คลังคอร์ส' },
  { key: 'history', label: 'เรียนจบแล้ว' },
];

const ICON_MAP: Record<LearningCourseIcon, LucideIcon> = {
  shield: Shield,
  coffee: Coffee,
  people: UsersIcon,
  plug: Plug,
  mega: Megaphone,
  heart: Heart,
};

const COURSE_TONE_RING: Record<HumiLearningCourse['tone'], string> = {
  teal: 'bg-accent-soft text-accent-ink',
  sage: 'bg-[color:var(--color-sage-soft)] text-ink',
  butter: 'bg-[color:var(--color-butter-soft)] text-ink',
  coral: 'bg-warning-soft text-[color:var(--color-warning)]',
  ink: 'bg-ink text-canvas',
};

const TAG_TONE: Record<NonNullable<HumiLearningCourse['tag']>, string> = {
  required: 'bg-warning-soft text-[color:var(--color-warning)]',
  live: 'bg-accent-soft text-accent-ink',
  self: 'bg-canvas-soft text-ink-muted',
  assigned: 'bg-canvas-soft text-ink-muted',
};

const CERT_DOT_TONE: Record<
  (typeof HUMI_LEARNING_CERTIFICATIONS)[number]['tone'],
  string
> = {
  sage: 'bg-[color:var(--color-sage)]',
  butter: 'bg-[color:var(--color-butter)]',
  teal: 'bg-[color:var(--color-accent)]',
};

export default function LearningDirectoryPage() {
  const [tab, setTab] = useState<TabKey>('assigned');

  return (
    <>
        {/* ── Page header ───────────────────────────────────── */}
        <header className="mb-8 flex flex-col gap-2">
          <CardEyebrow>ศูนย์การเรียนรู้</CardEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink whitespace-nowrap">
                การเรียนรู้
              </h1>
              <p className="mt-2 text-body text-ink-muted">
                หลักสูตรที่ได้รับมอบหมาย ใบรับรอง และคลังคอร์สของทีม
              </p>
            </div>
            <Button
              variant="primary"
              leadingIcon={<BookOpen className="h-4 w-4" />}
            >
              ดูคลังคอร์ส
            </Button>
          </div>
        </header>

        {/* ── Hero: learning path + certs + team readiness ──── */}
        <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          {/* Learning path — accent hero card */}
          <Card
            size="lg"
            className="relative overflow-hidden border-transparent bg-[linear-gradient(120deg,var(--color-accent-soft)_0%,var(--color-canvas-soft)_80%)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-6 h-28 w-24 rounded-full bg-[color:var(--color-accent)] opacity-40 blur-xl"
            />
            <CardEyebrow>{HUMI_LEARNING_PATH.eyebrow}</CardEyebrow>
            <h2 className="mt-2 font-display text-[length:var(--text-display-h2)] font-semibold tracking-tight text-ink">
              {HUMI_LEARNING_PATH.title}
            </h2>
            <p className="mt-2 text-small text-ink-soft">
              {HUMI_LEARNING_PATH.progressLabel}
            </p>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={HUMI_LEARNING_PATH.progressPct}
              aria-label="ความคืบหน้าเส้นทางการเรียนรู้"
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-hairline)]"
            >
              <span
                className="block h-full rounded-full bg-[color:var(--color-accent)]"
                style={{ width: `${HUMI_LEARNING_PATH.progressPct}%` }}
              />
            </div>
            <Button variant="primary" size="sm" className="mt-5">
              {HUMI_LEARNING_PATH.ctaLabel}
            </Button>
          </Card>

          {/* Certifications */}
          <Card size="lg">
            <CardEyebrow>ใบรับรองของฉัน</CardEyebrow>
            <CardTitle className="mt-2">ใช้งานอยู่ 3 ใบ</CardTitle>
            <ul className="mt-4 flex flex-col gap-3">
              {HUMI_LEARNING_CERTIFICATIONS.map((cert) => (
                <li
                  key={cert.name}
                  className="flex items-center gap-3 text-small"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'h-2.5 w-2.5 shrink-0 rounded-full',
                      CERT_DOT_TONE[cert.tone]
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate text-ink">
                    {cert.name}
                  </span>
                  <span className="shrink-0 text-ink-muted">
                    {cert.expiryLabel}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Team readiness */}
          <Card size="lg">
            <CardEyebrow>{HUMI_LEARNING_TEAM_READINESS.eyebrow}</CardEyebrow>
            <CardTitle className="mt-2">
              {HUMI_LEARNING_TEAM_READINESS.title}
            </CardTitle>
            <p className="mt-2 text-small text-ink-muted">
              {HUMI_LEARNING_TEAM_READINESS.subtitle}
            </p>
            <div
              className="mt-4 flex items-center"
              aria-label="สมาชิกทีมที่อบรมตรงเวลา"
            >
              {HUMI_LEARNING_TEAM_READINESS.teamInitials.map((member, i) => (
                <span
                  key={member.initials + i}
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-full',
                    'text-[11px] font-semibold',
                    'ring-2 ring-[color:var(--color-surface)]',
                    i > 0 && '-ml-2',
                    member.tone === 'teal' && 'bg-accent-soft text-accent-ink',
                    member.tone === 'sage' &&
                      'bg-[color:var(--color-sage-soft)] text-ink',
                    member.tone === 'butter' &&
                      'bg-[color:var(--color-butter-soft)] text-ink',
                    member.tone === 'ink' && 'bg-ink text-canvas'
                  )}
                  aria-hidden
                >
                  {member.initials}
                </span>
              ))}
            </div>
          </Card>
        </section>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="หมวดหลักสูตร"
          className="mb-6 flex flex-wrap gap-1 border-b border-hairline"
        >
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.key)}
                className={cn(
                  '-mb-px border-b-2 px-4 py-3 text-small font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                  active
                    ? 'border-[color:var(--color-accent)] text-ink'
                    : 'border-transparent text-ink-muted hover:text-ink-soft'
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ── Course grid ───────────────────────────────────── */}
        <section
          aria-label="หลักสูตรทั้งหมด"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {HUMI_LEARNING_COURSES.map((course) => {
            const Icon = ICON_MAP[course.icon];
            const continueAction = course.actionLabel === 'เรียนต่อ';
            return (
              <Card
                key={course.id}
                size="lg"
                className="flex flex-col"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className={cn(
                      'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]',
                      COURSE_TONE_RING[course.tone]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {course.tag && course.tag_label && (
                    <span
                      className={cn(
                        'ml-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]',
                        TAG_TONE[course.tag]
                      )}
                    >
                      {course.tag_label}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-[length:var(--text-display-h3)] leading-snug font-semibold tracking-tight text-ink">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-small text-ink-muted">
                  {course.detailLabel}
                </p>
                <hr className="mt-5 mb-4 border-t border-hairline-soft" />
                <div className="mt-auto flex items-center gap-3">
                  <span className="text-small text-ink-soft">
                    {course.statusLabel}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    trailingIcon={<ArrowRight className="h-3.5 w-3.5" />}
                    className="ml-auto"
                  >
                    {continueAction ? 'เรียนต่อ' : course.actionLabel}
                  </Button>
                </div>
              </Card>
            );
          })}
        </section>
      </>
  );
}

'use client';

import { useMemo, useState } from 'react';
import {
  BookOpen,
  Clock,
  Download,
  Mail,
  Phone,
  Plus,
  RotateCcw,
  Search,
  Send,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Avatar, Button, Card, CardEyebrow } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_ORG_PEOPLE,
  type HumiOrgPerson,
  type HumiOrgTone,
} from '@/lib/humi-mock-data';
import { useOrgChartStore } from '@/stores/humi-orgchart-slice';

// ════════════════════════════════════════════════════════════
// Humi /org-chart (A13 — OVERWRITE)
// Port of screens/orgchart.jsx — retail → generic HR.
//
// Phase B preservation note:
// The existing <OrgChart> component at components/profile/org-chart.tsx
// is left untouched (used by profile/* routes). The reference visual
// reads as: manager chain (vertical) → selected node (large) → peers row →
// direct-reports row, which does not map cleanly to that primitive. We
// re-implement the canvas inline here and keep the Search / Zoom / Reset
// toolbar from the reference as controls that target this page's state
// (no external zoom API required). Phase B may swap the canvas-slot
// internals without touching the surrounding layout.
// ════════════════════════════════════════════════════════════

type NodeSize = 'sm' | 'md' | 'lg';

const TONE_CLASS: Record<HumiOrgTone, string> = {
  teal: 'bg-accent-soft text-accent-ink',
  sage: 'bg-[color:var(--color-sage-soft)] text-ink',
  butter: 'bg-[color:var(--color-butter-soft)] text-ink',
  coral: 'bg-warning-soft text-[color:var(--color-warning)]',
  ink: 'bg-ink text-canvas',
};

const CERT_DOT_TONE: Record<'sage' | 'butter' | 'teal', string> = {
  sage: 'bg-[color:var(--color-sage)]',
  butter: 'bg-[color:var(--color-butter)]',
  teal: 'bg-[color:var(--color-accent)]',
};

function NodeCard({
  person,
  size = 'md',
  onClick,
  highlight = false,
  dim = false,
}: {
  person: HumiOrgPerson;
  size?: NodeSize;
  onClick?: () => void;
  highlight?: boolean;
  dim?: boolean;
}) {
  const dims = {
    sm: { w: 'w-36', pad: 'px-3 py-2.5', av: 'sm' as const, name: 'text-small' },
    md: { w: 'w-44', pad: 'p-3.5', av: 'sm' as const, name: 'text-body' },
    lg: {
      w: 'w-60',
      pad: 'px-5 py-4',
      av: 'md' as const,
      name: 'text-[16px]',
    },
  }[size];

  const Wrapper = onClick ? 'button' : 'div';
  return (
    <Wrapper
      {...(onClick
        ? { type: 'button' as const, onClick, 'aria-pressed': highlight }
        : {})}
      className={cn(
        'inline-flex flex-col items-center rounded-[14px] text-center transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        dims.w,
        dims.pad,
        highlight
          ? 'border border-transparent bg-accent-soft shadow-[0_12px_28px_rgba(14,27,44,0.08)]'
          : 'border border-hairline bg-surface hover:border-[color:var(--color-accent)] hover:shadow-sm',
        dim && 'opacity-30'
      )}
    >
      <span className={cn('mb-2', 'inline-block')}>
        <Avatar
          name={person.name}
          tone={person.tone === 'coral' ? 'butter' : person.tone}
          size={dims.av}
        />
      </span>
      <span
        className={cn(
          'block w-full truncate font-semibold text-ink',
          dims.name
        )}
      >
        {person.name}
      </span>
      <span className="mt-1 block w-full truncate text-[11px] text-ink-muted">
        {person.role}
      </span>
    </Wrapper>
  );
}

function Connector({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'mx-auto block w-px bg-hairline',
        compact ? 'h-3.5' : 'h-5'
      )}
    />
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="w-28 shrink-0 text-small text-ink-muted">{label}</dt>
      <dd className="min-w-0 flex-1 text-small font-medium text-ink">
        {value}
      </dd>
    </div>
  );
}

export default function OrgChartPage() {
  // Slice: search + node selection (detail panel)
  const { query, selectedId, setQuery, select } = useOrgChartStore();
  // Zoom remains local — ephemeral pan/zoom state per b1 spec (no persist)
  const [zoom, setZoom] = useState(1);

  const resolvedId = selectedId ?? 'marcus';
  const person = HUMI_ORG_PEOPLE[resolvedId] ?? HUMI_ORG_PEOPLE.marcus;
  const manager = person.managerId
    ? HUMI_ORG_PEOPLE[person.managerId]
    : null;
  const managerChain = useMemo(() => {
    const chain: HumiOrgPerson[] = [];
    let cur = person.managerId;
    while (cur && HUMI_ORG_PEOPLE[cur]) {
      chain.unshift(HUMI_ORG_PEOPLE[cur]);
      cur = HUMI_ORG_PEOPLE[cur].managerId;
    }
    return chain;
  }, [person]);
  const directReports = person.reportIds
    .map((id) => HUMI_ORG_PEOPLE[id])
    .filter(Boolean);
  const peers = manager
    ? manager.reportIds
        .filter((id) => id !== person.id)
        .map((id) => HUMI_ORG_PEOPLE[id])
        .filter(Boolean)
    : [];

  const q = query.trim().toLowerCase();
  const matches = (p: HumiOrgPerson) =>
    !q ||
    p.name.toLowerCase().includes(q) ||
    p.role.toLowerCase().includes(q) ||
    p.department.toLowerCase().includes(q);

  const resetView = () => {
    setZoom(1);
    setQuery('');
  };

  return (
    <>
        {/* ── Page header ───────────────────────────────────── */}
        <header className="mb-8 flex flex-col gap-2">
          <CardEyebrow>สายบังคับบัญชา · โปรไฟล์พนักงาน</CardEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink whitespace-nowrap">
              ผังองค์กร
            </h1>
            <Button
              variant="ghost"
              leadingIcon={<Download className="h-4 w-4" />}
            >
              ส่งออกการ์ด
            </Button>
          </div>
        </header>

        {/* ── 2-col grid: chart (1.1fr) + profile (1.5fr) ──── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1.5fr]">
          {/* LEFT — Org chart canvas */}
          <Card size="lg" className="lg:sticky lg:top-6 lg:self-start">
            {/* Toolbar: title + search + zoom + reset */}
            <div className="mb-5 flex flex-wrap items-start gap-3">
              <div className="min-w-0 flex-1">
                <CardEyebrow>สายบังคับบัญชา</CardEyebrow>
                <h2 className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold tracking-tight text-ink">
                  ผังองค์กร
                </h2>
              </div>
              <div
                role="toolbar"
                aria-label="เครื่องมือผังองค์กร"
                className="flex items-center gap-1"
              >
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                  aria-label="ย่อขนาดผัง"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ZoomOut className="h-3.5 w-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
                  aria-label="ขยายขนาดผัง"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <ZoomIn className="h-3.5 w-3.5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  aria-label="รีเซ็ตมุมมอง"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface text-ink-soft hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-5 flex items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2">
              <Search className="h-3.5 w-3.5 text-ink-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาพนักงานในผัง…"
                aria-label="ค้นหาพนักงาน"
                className="w-full bg-transparent text-small text-ink placeholder:text-ink-muted focus:outline-none"
              />
            </div>

            {/* Canvas with zoom */}
            <div
              className="overflow-x-auto"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'transform 200ms var(--ease-spring, ease)',
              }}
            >
              <div className="min-w-[360px] text-center">
                {/* Manager chain (top) */}
                {managerChain.map((m) => (
                  <div key={m.id}>
                    <NodeCard
                      person={m}
                      size="sm"
                      onClick={() => select(m.id)}
                      dim={!matches(m)}
                    />
                    <Connector />
                  </div>
                ))}

                {/* Selected (large) */}
                <NodeCard person={person} size="lg" highlight />

                {/* Peers */}
                {peers.length > 0 && manager && (
                  <>
                    <Connector compact />
                    <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                      เพื่อนร่วมทีม {peers.length} คน ใต้ {manager.name}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {peers.map((pr) => (
                        <NodeCard
                          key={pr.id}
                          person={pr}
                          size="sm"
                          onClick={() => select(pr.id)}
                          dim={!matches(pr)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Direct reports */}
                {directReports.length > 0 && (
                  <>
                    <Connector />
                    <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                      ลูกทีม · {directReports.length}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2.5">
                      {directReports.map((pr) => (
                        <NodeCard
                          key={pr.id}
                          person={pr}
                          size="sm"
                          onClick={() => select(pr.id)}
                          dim={!matches(pr)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* RIGHT — Employee profile */}
          <div className="flex flex-col gap-4">
            {/* Profile header card with gradient band + stats */}
            <Card size="lg" flush className="overflow-hidden">
              <div
                aria-hidden
                className="relative h-16 bg-[linear-gradient(110deg,var(--color-ink)_0%,var(--color-ink-soft)_100%)]"
              >
                <span className="pointer-events-none absolute -top-4 right-10 block h-28 w-24 rounded-full bg-[color:var(--color-accent)] opacity-40 blur-2xl" />
                <span className="pointer-events-none absolute top-5 right-36 block h-16 w-16 rounded-full bg-[color:var(--color-butter)] opacity-40 blur-xl" />
              </div>
              <div className="px-6 pb-5 pt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar
                    name={person.name}
                    tone={person.tone === 'coral' ? 'butter' : person.tone}
                    size="lg"
                  />
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-[length:var(--text-display-h2)] font-semibold tracking-tight text-ink">
                      {person.name}
                    </h2>
                    <p className="mt-1 text-small leading-relaxed text-ink-muted">
                      {person.title ?? person.role} · {person.department}
                      {manager && (
                        <>
                          {' · รายงานต่อ '}
                          <span className="font-semibold text-ink-soft">
                            {manager.name}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    leadingIcon={<Send className="h-3.5 w-3.5" />}
                  >
                    ส่งข้อความ
                  </Button>
                  <Button variant="primary" size="sm">
                    ดูโปรไฟล์เต็ม
                  </Button>
                </div>
              </div>
              <dl className="grid grid-cols-2 border-t border-hairline sm:grid-cols-4">
                {[
                  { label: 'อายุงาน', value: person.tenure ?? '—' },
                  {
                    label: 'ที่ตั้ง',
                    value: person.location ?? person.department,
                  },
                  {
                    label: 'ผลประเมินล่าสุด',
                    value: person.reviewSummary ?? '—',
                  },
                  {
                    label: 'วันลาคงเหลือ',
                    value: person.leaveRemaining ?? '—',
                  },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className={cn(
                      'px-4 py-3.5',
                      i > 0 && 'sm:border-l border-hairline'
                    )}
                  >
                    <CardEyebrow>{stat.label}</CardEyebrow>
                    <dd className="mt-1 font-display text-[17px] font-semibold tracking-tight text-ink">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>

            {/* Contact + Employment */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card size="md">
                <CardEyebrow>ช่องทางติดต่อ</CardEyebrow>
                <ul className="mt-3 flex flex-col gap-2.5 text-small">
                  <li className="flex items-center gap-2 text-ink-soft">
                    <Mail
                      className="h-3.5 w-3.5 text-ink-muted"
                      aria-hidden
                    />
                    <span className="truncate">{person.email ?? '—'}</span>
                  </li>
                  {person.phone && (
                    <li className="flex items-center gap-2 text-ink-soft">
                      <Phone
                        className="h-3.5 w-3.5 text-ink-muted"
                        aria-hidden
                      />
                      <span>{person.phone}</span>
                    </li>
                  )}
                  {person.timezone && (
                    <li className="flex items-center gap-2 text-ink-muted">
                      <Clock
                        className="h-3.5 w-3.5 text-ink-muted"
                        aria-hidden
                      />
                      <span>{person.timezone}</span>
                    </li>
                  )}
                  {person.language && (
                    <li className="flex items-center gap-2 text-ink-muted">
                      <BookOpen
                        className="h-3.5 w-3.5 text-ink-muted"
                        aria-hidden
                      />
                      <span>{person.language}</span>
                    </li>
                  )}
                </ul>
              </Card>
              <Card size="md">
                <CardEyebrow>ข้อมูลการจ้างงาน</CardEyebrow>
                <dl className="mt-3 flex flex-col gap-2.5">
                  {(
                    [
                      ['ประเภท', person.employmentType],
                      ['ระดับ', person.grade],
                      ['ศูนย์ต้นทุน', person.costCenter],
                      ['เริ่มงาน', person.hiredOn],
                      ['ผลตอบแทน', person.compensation],
                    ] as const
                  )
                    .filter(([, v]) => !!v)
                    .map(([label, value]) => (
                      <DetailRow
                        key={label}
                        label={label}
                        value={value as string}
                      />
                    ))}
                </dl>
              </Card>
            </div>

            {/* Skills */}
            {person.skills && (
              <Card size="md">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <CardEyebrow>ทักษะและจุดแข็ง</CardEyebrow>
                    <h3 className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold tracking-tight text-ink">
                      สิ่งที่ {person.name.split(' ')[0]} ถนัด
                    </h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    leadingIcon={<Plus className="h-3.5 w-3.5" />}
                  >
                    รับรองทักษะ
                  </Button>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center rounded-full bg-canvas-soft px-3 py-1 text-small text-ink-soft"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Goals */}
            {person.goals && (
              <Card size="md">
                <CardEyebrow>เป้าหมายครึ่งปีแรก 2568</CardEyebrow>
                <h3 className="mt-1 mb-4 font-display text-[length:var(--text-display-h3)] font-semibold tracking-tight text-ink">
                  ความคืบหน้าปัจจุบัน
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {person.goals.map((goal) => (
                    <li key={goal.label}>
                      <div className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 truncate text-small font-medium text-ink">
                          {goal.label}
                        </span>
                        <span className="text-[12px] text-ink-muted">
                          {goal.progress}%
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={goal.progress}
                        aria-label={goal.label}
                        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-hairline)]"
                      >
                        <span
                          className="block h-full rounded-full bg-[color:var(--color-accent)]"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Certifications + Upcoming */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {person.certifications && (
                <Card size="md">
                  <CardEyebrow>ใบรับรอง</CardEyebrow>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {person.certifications.map((cert) => (
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
                          {cert.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
              {person.upcoming && (
                <Card size="md">
                  <CardEyebrow>กำหนดการที่จะถึง</CardEyebrow>
                  <ul className="mt-3 flex flex-col gap-3">
                    {person.upcoming.map((event) => (
                      <li key={event.title} className="flex gap-3">
                        <span
                          aria-hidden
                          className="inline-block w-1 shrink-0 self-stretch rounded-full bg-[color:var(--color-accent)]"
                        />
                        <div className="min-w-0">
                          <p className="text-small font-medium text-ink">
                            {event.title}
                          </p>
                          <p className="text-[12px] text-ink-muted">
                            {event.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>

            {/* HR note — dark/ink card */}
            {person.hrNote && (
              <Card
                size="md"
                className="relative overflow-hidden border-transparent bg-ink text-canvas"
              >
                <span className="pointer-events-none absolute -top-6 -right-6 block h-24 w-24 rounded-full bg-[color:var(--color-accent)] opacity-30 blur-2xl" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
                  บันทึก HR · สำหรับผู้จัดการ
                </span>
                <p className="mt-2 text-small leading-relaxed text-canvas-soft">
                  {person.hrNote}
                </p>
              </Card>
            )}
          </div>
        </div>
      </>
  );
}

// Tone type guard unused here but exported type kept in mock-data for
// future consumers.
export type { HumiOrgTone };

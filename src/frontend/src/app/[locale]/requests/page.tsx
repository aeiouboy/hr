'use client';

import { useMemo, useState } from 'react';
import {
  Plus,
  FileText,
  ArrowRight,
  Search,
  Download,
  Calendar,
  Heart,
  Shield,
  Clock,
  Globe,
  BookOpen,
  Plug,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_REQUEST_CATALOG,
  HUMI_MY_REQUESTS,
  HUMI_APPROVAL_QUEUE,
  REQUEST_STATUS_META,
  ACCENT_ICON_CLASS,
  ACCENT_BAR_CLASS,
  type RequestIconKey,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// /requests — Forms/requests tracker
// Port of docs/design-ref/shelfly-bundle/project/screens/requests.jsx
// List → 3 tabs (mine / catalog / approvals), tracker summary.
// (Detail + Compose views kept as placeholders; KPIs + list + catalog
// + approval queue fully ported — retail → HR copy.)
// ════════════════════════════════════════════════════════════

type TabKey = 'mine' | 'catalog' | 'approvals';

const ICONS: Record<RequestIconKey, LucideIcon> = {
  calendar: Calendar,
  heart: Heart,
  shield: Shield,
  doc: FileText,
  clock: Clock,
  globe: Globe,
  book: BookOpen,
  plug: Plug,
  people: Users,
  arrow: ArrowRight,
};

export default function HumiRequestsPage() {
  const [tab, setTab] = useState<TabKey>('mine');

  const summary = useMemo(() => {
    const total = HUMI_MY_REQUESTS.length + 17; // stable mock "this year"
    const pending = HUMI_MY_REQUESTS.filter((r) => r.status === 'pending').length;
    const approved = HUMI_MY_REQUESTS.filter((r) => r.status === 'approved').length + 15;
    const rejected = HUMI_MY_REQUESTS.filter((r) => r.status === 'rejected').length + 3;
    return { total, pending, approved, rejected };
  }, []);

  return (
    <>
        {/* Page header */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardEyebrow>คำร้องและแบบฟอร์ม</CardEyebrow>
            <h1
              className={cn(
                'font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              ส่งคำขอ ติดตามสถานะ และอนุมัติคำร้อง
            </h1>
          </div>
          <Button variant="primary" leadingIcon={<Plus size={14} />}>
            สร้างคำร้องใหม่
          </Button>
        </header>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="มุมมองคำร้อง"
          className="mb-6 flex flex-wrap gap-1 border-b border-hairline"
        >
          <TabButton
            active={tab === 'mine'}
            onClick={() => setTab('mine')}
            count={HUMI_MY_REQUESTS.length}
          >
            คำร้องของฉัน
          </TabButton>
          <TabButton
            active={tab === 'catalog'}
            onClick={() => setTab('catalog')}
            count={HUMI_REQUEST_CATALOG.length}
          >
            แบบฟอร์มทั้งหมด
          </TabButton>
          <TabButton
            active={tab === 'approvals'}
            onClick={() => setTab('approvals')}
            count={HUMI_APPROVAL_QUEUE.length}
          >
            รออนุมัติ
          </TabButton>
        </div>

        {tab === 'mine' && <MineTab summary={summary} />}
        {tab === 'catalog' && <CatalogTab />}
        {tab === 'approvals' && <ApprovalsTab />}
      </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Mine
// ────────────────────────────────────────────────────────────

function MineTab({
  summary,
}: {
  summary: { total: number; pending: number; approved: number; rejected: number };
}) {
  const summaryCards: Array<{ l: string; n: number; accent: 'accent' | 'alt' | 'sage' | 'butter' }> = [
    { l: 'ส่งทั้งหมดปีนี้', n: summary.total, accent: 'accent' },
    { l: 'รออนุมัติ', n: summary.pending, accent: 'butter' },
    { l: 'อนุมัติแล้ว', n: summary.approved, accent: 'sage' },
    { l: 'ไม่อนุมัติ', n: summary.rejected, accent: 'alt' },
  ];

  return (
    <>
      {/* Summary tiles */}
      <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {summaryCards.map((s) => (
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
                'mt-1 font-display font-semibold text-ink tabular-nums',
                'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
              )}
            >
              {s.n}
            </p>
          </Card>
        ))}
      </section>

      {/* My list */}
      <Card variant="raised" size="lg">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <CardTitle>คำร้องของฉัน</CardTitle>
          <div
            role="search"
            className="inline-flex min-w-[220px] items-center gap-2 rounded-full border border-hairline bg-canvas-soft px-3 py-1.5 text-small text-ink-muted"
          >
            <Search size={14} aria-hidden />
            <span>ค้นหารหัสหรือหัวข้อ…</span>
          </div>
        </div>
        <ul role="list" className="divide-y divide-hairline">
          {HUMI_MY_REQUESTS.map((r) => {
            const meta = REQUEST_STATUS_META[r.status];
            return (
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
                  <p className="text-body font-semibold text-ink">
                    {r.type}{' '}
                    <span className="font-mono text-small font-normal text-ink-muted">
                      · {r.id}
                    </span>
                  </p>
                  <p className="text-small text-ink-muted">
                    {r.sub} · ส่ง {r.submitted}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                      meta.toneClass
                    )}
                  >
                    {meta.label}
                  </span>
                  <button
                    type="button"
                    aria-label={`ดู ${r.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <ArrowRight size={14} aria-hidden />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Catalog
// ────────────────────────────────────────────────────────────

function CatalogTab() {
  return (
    <>
      {/* Hero */}
      <Card
        variant="raised"
        size="lg"
        className="relative mb-6 overflow-hidden bg-gradient-to-br from-accent-soft to-canvas-soft"
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-36 w-28 rounded-full bg-accent opacity-40 blur-2xl"
        />
        <div className="relative">
          <CardEyebrow>
            แบบฟอร์มคำร้องทั้งหมด · {HUMI_REQUEST_CATALOG.length} ประเภท
          </CardEyebrow>
          <h2
            className={cn(
              'mt-2 max-w-2xl font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
            )}
          >
            เลือกแบบฟอร์มที่คุณต้องการยื่น
          </h2>
          <p className="mt-2 max-w-xl text-body text-ink-soft leading-relaxed">
            คำร้องทุกประเภทจะถูกส่งต่อไปยังผู้มีอำนาจอนุมัติโดยอัตโนมัติ
            คุณสามารถติดตามสถานะได้จากแท็บ &quot;คำร้องของฉัน&quot;
          </p>
        </div>
      </Card>

      {/* Catalog grid */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {HUMI_REQUEST_CATALOG.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <Card
              key={f.id}
              variant="raised"
              size="md"
              className="transition-transform duration-[var(--dur-fast)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-[12px]',
                    ACCENT_ICON_CLASS[f.accent]
                  )}
                >
                  <Icon size={20} />
                </span>
                <span className="rounded-full bg-canvas-soft px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted whitespace-nowrap">
                  SLA {f.sla}
                </span>
              </div>
              <CardTitle className="mt-3 text-[length:var(--text-body-lg)] leading-snug">
                {f.title}
              </CardTitle>
              <p className="mt-1 text-small text-ink-soft leading-relaxed">
                {f.subtitle}
              </p>
              <Button
                variant="ghost"
                block
                className="mt-4"
                trailingIcon={<ArrowRight size={13} />}
              >
                เริ่มกรอก
              </Button>
            </Card>
          );
        })}
      </section>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Approvals
// ────────────────────────────────────────────────────────────

function ApprovalsTab() {
  return (
    <Card variant="raised" size="lg">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <CardEyebrow>
            ในฐานะ ผู้จัดการฝ่ายบุคคล · สำนักงานใหญ่
          </CardEyebrow>
          <CardTitle className="mt-1">คำร้องที่รออนุมัติ</CardTitle>
        </div>
        <Button variant="ghost" leadingIcon={<Download size={14} />}>
          ส่งออก CSV
        </Button>
      </div>
      <ul role="list" className="divide-y divide-hairline">
        {HUMI_APPROVAL_QUEUE.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar name={r.who} tone={r.tone} size="sm" />
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-2 text-body font-semibold text-ink">
                  {r.who}
                  <span className="font-normal text-ink-muted">· {r.type}</span>
                  {r.urgent && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                        'bg-warning-soft text-[color:var(--color-warning)]'
                      )}
                    >
                      ด่วน
                    </span>
                  )}
                </p>
                <p className="text-small text-ink-muted">
                  {r.role} · {r.sub} · {r.when}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm">
                รายละเอียด
              </Button>
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
    </Card>
  );
}

// ────────── helpers ──────────

function TabButton({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
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
      {typeof count === 'number' && (
        <span className="ml-1.5 font-normal text-ink-muted">({count})</span>
      )}
    </button>
  );
}

// (ACCENT_BAR_CLASS imported for future use by sub-views; referenced here
// to keep tree-shaking predictable without adding dead imports.)
void ACCENT_BAR_CLASS;

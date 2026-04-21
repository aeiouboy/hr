'use client';

import { useMemo, useState } from 'react';
import { Check, Link2, Plus, Search } from 'lucide-react';
import { Button, Card, CardEyebrow, Toggle } from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_INTEGRATION_CATEGORIES,
  HUMI_INTEGRATION_KPIS,
  HUMI_INTEGRATIONS,
  type HumiIntegration,
  type IntegrationCategory,
  type IntegrationShape,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// Humi /integrations (A14)
// Port of screens/integrations.jsx — retail → generic HR.
// KPI row (4) → category tabs + search → 3-col integration grid.
// ════════════════════════════════════════════════════════════

function IntegrationMark({
  shape,
  toneClass,
}: {
  shape: IntegrationShape;
  toneClass: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]',
        toneClass
      )}
    >
      {shape === 'square' && (
        <span className="block h-[18px] w-[18px] rounded-[3px] bg-[color:var(--color-surface)]" />
      )}
      {shape === 'circle' && (
        <span className="block h-[18px] w-[18px] rounded-full bg-[color:var(--color-surface)]" />
      )}
      {shape === 'triangle' && (
        <span
          className="block h-0 w-0"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '16px solid var(--color-surface)',
          }}
        />
      )}
      {shape === 'bars' && (
        <span className="inline-flex items-end gap-[3px]">
          <span className="block h-4 w-1 bg-[color:var(--color-surface)]" />
          <span className="block h-2.5 w-1 bg-[color:var(--color-surface)]" />
          <span className="block h-[18px] w-1 bg-[color:var(--color-surface)]" />
        </span>
      )}
      {shape === 'split' && (
        <span
          className="block h-5 w-5 rounded-[4px]"
          style={{
            background:
              'linear-gradient(90deg, var(--color-surface) 50%, rgba(255,255,255,0.4) 50%)',
          }}
        />
      )}
      {shape === 'diamond' && (
        <span
          className="block h-4 w-4 bg-[color:var(--color-surface)]"
          style={{ transform: 'rotate(45deg)' }}
        />
      )}
    </span>
  );
}

function StatusBadge({ status }: { status: HumiIntegration['status'] }) {
  if (status === 'connected') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--color-success-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--color-success)]">
        <Check className="h-3 w-3" aria-hidden />
        เชื่อมต่อแล้ว
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-canvas-soft px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
      ยังไม่เชื่อม
    </span>
  );
}

export default function IntegrationsPage() {
  const [tab, setTab] = useState<IntegrationCategory>('all');
  const [query, setQuery] = useState('');
  // Per-integration toggle state (connected items only). Controlled here
  // so users can flip sync on/off without a real API.
  const [syncState, setSyncState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      HUMI_INTEGRATIONS.filter((i) => i.status === 'connected').map((i) => [
        i.id,
        true,
      ])
    )
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HUMI_INTEGRATIONS.filter((i) => {
      const matchCat = tab === 'all' || i.category === tab;
      const matchQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [tab, query]);

  return (
    <>
        {/* ── Page header ───────────────────────────────────── */}
        <header className="mb-8 flex flex-col gap-2">
          <CardEyebrow>ศูนย์จัดการระบบ</CardEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink whitespace-nowrap">
                จัดการระบบ
              </h1>
              <p className="mt-2 text-body text-ink-muted">
                เชื่อมต่อเครื่องมือที่องค์กรของคุณใช้อยู่แล้ว ในที่เดียว
              </p>
            </div>
            <Button variant="primary" leadingIcon={<Plus className="h-4 w-4" />}>
              ขอระบบใหม่
            </Button>
          </div>
        </header>

        {/* ── KPI row ───────────────────────────────────────── */}
        <section
          aria-label="สรุปการเชื่อมต่อ"
          className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {HUMI_INTEGRATION_KPIS.map((kpi) => (
            <Card key={kpi.key} size="md" className="relative overflow-hidden">
              <span
                aria-hidden
                className={cn(
                  'absolute left-0 top-0 h-full w-1',
                  kpi.accentClass
                )}
              />
              <div className="pl-2">
                <CardEyebrow>{kpi.label}</CardEyebrow>
                <p className="mt-1.5 font-display text-[28px] font-semibold leading-none tracking-tight text-ink">
                  {kpi.value}
                </p>
              </div>
            </Card>
          ))}
        </section>

        {/* ── Tabs + Search ─────────────────────────────────── */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label="หมวดหมู่ระบบ"
            className="flex flex-wrap gap-1"
          >
            {HUMI_INTEGRATION_CATEGORIES.map((cat) => {
              const active = cat.key === tab;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(cat.key)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-small font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                    active
                      ? 'bg-ink text-canvas'
                      : 'bg-surface text-ink-muted hover:text-ink-soft border border-hairline'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          <div className="ml-auto flex w-full items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 sm:w-auto sm:min-w-[260px]">
            <Search className="h-3.5 w-3.5 text-ink-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาระบบ…"
              aria-label="ค้นหาระบบ"
              className="w-full bg-transparent text-small text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </div>
        </div>

        {/* ── Integration grid ──────────────────────────────── */}
        <section
          aria-label="รายการระบบ"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((item) => {
            const categoryLabel = HUMI_INTEGRATION_CATEGORIES.find(
              (c) => c.key === item.category
            )?.label;
            const isConnected = item.status === 'connected';
            return (
              <Card key={item.id} size="lg" className="flex flex-col">
                <div className="flex items-start gap-3">
                  <IntegrationMark
                    shape={item.shape}
                    toneClass={item.markToneClass}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-body font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="truncate text-small text-ink-muted">
                      {categoryLabel}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-4 text-small leading-relaxed text-ink-soft">
                  {item.description}
                </p>
                <hr className="mt-5 mb-4 border-t border-hairline-soft" />
                <div className="mt-auto flex items-center gap-3">
                  {isConnected ? (
                    <>
                      <span className="text-[12px] text-ink-muted">
                        ซิงค์ล่าสุด · 4 นาทีที่แล้ว
                      </span>
                      <Toggle
                        className="ml-auto py-0"
                        checked={!!syncState[item.id]}
                        onChange={(next) =>
                          setSyncState((prev) => ({ ...prev, [item.id]: next }))
                        }
                        ariaLabel={`สลับการซิงค์ของ ${item.name}`}
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-[12px] text-ink-muted">
                        ติดตั้ง 5 นาที
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        trailingIcon={<Link2 className="h-3.5 w-3.5" />}
                        className="ml-auto"
                      >
                        เชื่อมต่อ
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </section>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-small text-ink-muted">
            ไม่พบระบบที่ตรงกับคำค้นหา
          </p>
        )}
      </>
  );
}

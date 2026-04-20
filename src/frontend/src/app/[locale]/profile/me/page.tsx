'use client';

// ════════════════════════════════════════════════════════════
// /profile/me — Humi employee self-service profile
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/profile.jsx
// Adapted retail persona → generic HR persona (HQ manager).
// AppShell owns sidebar+topbar; this file renders main-column only.
// ════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, FileText, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/humi';
import { HUMI_MY_PROFILE } from '@/lib/humi-mock-data';

type TabKey = 'personal' | 'job' | 'emergency' | 'docs' | 'tax';

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
} as const;

export default function HumiProfileMePage() {
  const t = useTranslations('humiProfile');
  const [tab, setTab] = useState<TabKey>('personal');
  const p = HUMI_MY_PROFILE;

  const tabs: Array<[TabKey, string]> = [
    ['personal', t('tabPersonal')],
    ['job', t('tabJob')],
    ['emergency', t('tabEmergency')],
    ['docs', t('tabDocs')],
    ['tax', t('tabTax')],
  ];

  return (
    <div className="pb-8">
      {/* Top action bar (subtitle shown via Topbar) */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-small text-ink-muted">
          {t('subtitle')} · {p.employeeCode}
        </div>
        <Button variant="primary" leadingIcon={<Check size={14} />}>
          {t('save')}
        </Button>
      </div>

      {/* Header card */}
      <div
        className="humi-card mb-5 flex flex-wrap items-center gap-5"
        style={{ padding: '22px 26px', position: 'relative', overflow: 'hidden' }}
      >
        <div
          className="humi-blob"
          style={{
            width: 180,
            height: 180,
            right: -60,
            top: -60,
            background: 'var(--color-accent-soft)',
            opacity: 0.45,
          }}
          aria-hidden
        />
        <span
          className={cn(AVATAR_TONE_MAP[p.avatarTone])}
          style={{
            width: 72,
            height: 72,
            fontSize: 24,
            borderRadius: 18,
            flexShrink: 0,
            position: 'relative',
          }}
          aria-hidden
        >
          {p.initials}
        </span>
        <div style={{ flex: '1 1 260px', minWidth: 0, position: 'relative' }}>
          <div
            className="humi-row"
            style={{ gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}
          >
            <h2 className="font-display text-[24px] font-semibold leading-[1.1] tracking-tight text-ink">
              {p.nameTh}
            </h2>
            <span style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
              {p.pronouns}
            </span>
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--color-ink-muted)',
              marginTop: 4,
            }}
          >
            {p.position} · {p.department} · รายงานต่อ {p.reportsTo}
          </div>
        </div>
        <div
          className="humi-row"
          style={{ gap: 8, flexShrink: 0, position: 'relative', flexWrap: 'wrap' }}
        >
          <span className="humi-tag humi-tag--sage">{t('statusActive')}</span>
          <span className="humi-tag">{p.employmentType}</span>
          <span className="humi-tag">{p.startLabel}</span>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="humi-tabs mb-5"
        role="tablist"
        aria-label={t('personalEyebrow')}
      >
        {tabs.map(([k, l]) => (
          <button
            type="button"
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={cn('humi-tab', tab === k && 'humi-tab--active')}
            onClick={() => setTab(k)}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'personal' && (
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <FieldCard eyebrow={t('personalEyebrow')} title={t('personalTitle')} rows={p.personal} labelW={180} />
          <FieldCard eyebrow={t('contactEyebrow')} title={t('contactTitle')} rows={p.contact} labelW={140} />
        </div>
      )}

      {tab === 'job' && (
        <div className="grid gap-4" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
          <FieldCard eyebrow={t('jobEyebrow')} title={t('jobTitle')} rows={p.job} labelW={160} />
          <div className="humi-col" style={{ gap: 16 }}>
            <div className="humi-card">
              <div className="humi-eyebrow">{t('compEyebrow')}</div>
              <h3 className="mt-1.5 font-display text-[22px] font-semibold leading-[1.1] tracking-tight text-ink">
                {p.comp.monthly} / เดือน
              </h3>
              <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
                {p.comp.cadence}
              </div>
              <hr className="humi-divider" />
              <div className="humi-col" style={{ gap: 10, fontSize: 13 }}>
                <CompRow label={t('compBaseLabel')} value={p.comp.base} />
                <CompRow label={t('compBonusLabel')} value={p.comp.bonus} />
                <CompRow label={t('compEquityLabel')} value={p.comp.equity} />
              </div>
            </div>
            <div className="humi-card">
              <div className="humi-eyebrow">{t('historyEyebrow')}</div>
              <div className="humi-col" style={{ gap: 14, marginTop: 10 }}>
                {p.workHistory.map((r) => (
                  <div key={r.title} className="humi-row">
                    <div
                      style={{
                        width: 6,
                        alignSelf: 'stretch',
                        background:
                          r.tone === 'teal'
                            ? 'var(--color-accent)'
                            : r.tone === 'butter'
                              ? 'var(--color-butter)'
                              : 'var(--color-sage)',
                        borderRadius: 3,
                      }}
                      aria-hidden
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                        {r.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                        {r.dates} · {r.loc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'emergency' && (
        <div className="humi-card">
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {t('emergencyTitle')}
          </h3>
          <p
            style={{
              color: 'var(--color-ink-muted)',
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {t('emergencyHelp')}
          </p>
          <div
            className="grid gap-3.5"
            style={{ gridTemplateColumns: '1fr 1fr', marginTop: 16 }}
          >
            {p.emergency.map((c) => (
              <div
                key={c.name}
                className="humi-card humi-card--tight"
                style={{ background: 'var(--color-canvas-soft)' }}
              >
                <div className="humi-row">
                  <span className={AVATAR_TONE_MAP[c.tone]} aria-hidden>
                    {c.initials}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                      {c.relation} · {c.phone}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tab === 'docs' || tab === 'tax') && (
        <div className="humi-card">
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {tab === 'docs' ? t('docsTitle') : t('taxTitle')}
          </h3>
          <ul className="humi-list mt-2.5" role="list">
            {(tab === 'tax'
              ? [
                  { n: 'ภ.ง.ด. 91 ปี 2568', d: 'ก.พ. 2568' },
                  { n: 'หนังสือรับรองการหักภาษี ณ ที่จ่าย', d: 'ม.ค. 2568' },
                  { n: '50 ทวิ — ปี 2567', d: 'ธ.ค. 2567' },
                ]
              : [
                  { n: 'สัญญาจ้างงานที่ลงนาม', d: 'ก.พ. 2568' },
                  { n: 'เอกสารรับรองสิทธิทำงาน', d: 'ม.ค. 2568' },
                  { n: 'ใบรับรองการอบรมปฐมนิเทศ', d: 'ธ.ค. 2567' },
                ]
            ).map((d) => (
              <li key={d.n} className="humi-row-item">
                <div
                  style={{
                    width: 34,
                    height: 42,
                    borderRadius: 6,
                    background: 'var(--color-canvas-soft)',
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
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--color-ink)' }}>
                    {d.n}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>
                    ยื่นเมื่อ {d.d}
                  </div>
                </div>
                <Button variant="ghost" size="sm" leadingIcon={<Download size={13} />}>
                  {t('downloadCta')}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FieldCard({
  eyebrow,
  title,
  rows,
  labelW,
}: {
  eyebrow: string;
  title: string;
  rows: ReadonlyArray<readonly [string, string]>;
  labelW: number;
}) {
  return (
    <div className="humi-card">
      <div className="humi-eyebrow">{eyebrow}</div>
      <h3 className="mt-1.5 mb-4 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
        {title}
      </h3>
      <div className="humi-col" style={{ gap: 14 }}>
        {rows.map(([l, v]) => (
          <div
            key={l}
            className="humi-row"
            style={{
              borderBottom: '1px solid var(--color-hairline-soft)',
              paddingBottom: 10,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: 'var(--color-ink-muted)',
                width: labelW,
                flexShrink: 0,
              }}
            >
              {l}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>
              {v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="humi-row">
      <span style={{ color: 'var(--color-ink-muted)' }}>{label}</span>
      <span className="humi-spacer" />
      <b style={{ color: 'var(--color-ink)' }}>{value}</b>
    </div>
  );
}

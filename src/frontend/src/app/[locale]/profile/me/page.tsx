'use client';

// ════════════════════════════════════════════════════════════
// /profile/me — Humi employee self-service profile
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/profile.jsx
// Adapted retail persona → generic HR persona (HQ manager).
// AppShell owns sidebar+topbar; this file renders main-column only.
// c1-profile-functional: Zustand persist + 5-tab switcher + edit/save/toast
// ════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, FileText, Download, Pencil, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/humi';
import { HUMI_MY_PROFILE } from '@/lib/humi-mock-data';
import { useHumiProfileStore, type ProfileTab } from '@/stores/humi-profile-slice';

// Map slice tab keys → display keys used by existing tab panels
type TabKey = 'personal' | 'job' | 'emergency' | 'docs' | 'tax';

// Mapping from Zustand ProfileTab → legacy panel key.
// NOTE: slice key `compensation` is a legacy name from an earlier sprint where
// Compensation was a standalone tab. Today's tab #3 displays "ติดต่อฉุกเฉิน"
// (Emergency) and must route to the emergency panel. Compensation cards are
// rendered inside the `job` panel.
const SLICE_TO_PANEL: Record<ProfileTab, TabKey> = {
  personal: 'personal',
  employment: 'job',
  compensation: 'emergency',
  documents: 'docs',
  activity: 'tax',
};

const AVATAR_TONE_MAP = {
  teal: 'humi-avatar humi-avatar--teal',
  sage: 'humi-avatar humi-avatar--sage',
  butter: 'humi-avatar humi-avatar--butter',
  ink: 'humi-avatar humi-avatar--ink',
} as const;

export default function HumiProfileMePage() {
  const t = useTranslations('humiProfile');
  const p = HUMI_MY_PROFILE;

  const { activeTab, isEditing, draft, saved, setTab, startEdit, updateDraft, save, cancelEdit } =
    useHumiProfileStore();

  const [toast, setToast] = useState<string | null>(null);

  // Derive panel key from slice activeTab
  const panelKey = SLICE_TO_PANEL[activeTab];

  // Auto-cancel edit when user switches tab — only the personal panel renders
  // an edit form, so leaving that panel mid-edit would strand Save/Cancel
  // buttons in the topbar with no editable content visible (Bug 2026-04-22).
  useEffect(() => {
    if (isEditing && panelKey !== 'personal') {
      cancelEdit();
    }
  }, [panelKey, isEditing, cancelEdit]);

  // Show success toast after save
  function handleSave() {
    save();
    setToast('บันทึกเรียบร้อย');
    setTimeout(() => setToast(null), 2500);
  }

  const tabs: Array<[ProfileTab, string]> = [
    ['personal', t('tabPersonal')],
    ['employment', t('tabJob')],
    ['compensation', t('tabEmergency')],
    ['documents', t('tabDocs')],
    ['activity', t('tabTax')],
  ];

  return (
    <div className="pb-8">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'var(--color-accent)',
            color: '#fff',
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: 14,
            fontWeight: 500,
            zIndex: 9999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Top action bar (subtitle shown via Topbar). Edit controls only render
          on the personal panel — that's the only tab with an inline edit form,
          so showing Save/Cancel elsewhere would leave the user with no fields
          to act on (Bug 2026-04-22). */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="text-small text-ink-muted">
          {t('subtitle')} · {p.employeeCode}
        </div>
        {panelKey === 'personal' && (
          <div className="humi-row" style={{ gap: 8 }}>
            {isEditing ? (
              <>
                <Button variant="ghost" size="sm" leadingIcon={<X size={14} />} onClick={cancelEdit}>
                  {t('profileCancelEdit')}
                </Button>
                <Button variant="primary" leadingIcon={<Check size={14} />} onClick={handleSave}>
                  {t('save')}
                </Button>
              </>
            ) : (
              <Button variant="primary" leadingIcon={<Pencil size={14} />} onClick={startEdit}>
                {t('profileEdit')}
              </Button>
            )}
          </div>
        )}
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

      {/* Tabs — controlled by Zustand slice */}
      <div
        className="mb-5 overflow-x-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="humi-tabs flex-nowrap"
          role="tablist"
          aria-label={t('personalEyebrow')}
          style={{ width: 'max-content' }}
        >
          {tabs.map(([k, l]) => (
            <button
              type="button"
              key={k}
              role="tab"
              aria-selected={activeTab === k}
              className={cn('humi-tab min-h-[44px]', activeTab === k && 'humi-tab--active')}
              onClick={() => setTab(k)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {panelKey === 'personal' && (
        <div className="grid gap-4 md:grid-cols-2">
          {isEditing ? (
            <div className="humi-card">
              <div className="humi-eyebrow">{t('contactEyebrow')}</div>
              <h3 className="mt-1.5 mb-4 font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
                {t('profileEditTitle')}
              </h3>
              <div className="humi-col" style={{ gap: 14 }}>
                <EditField label={t('profileFieldNickname')} value={draft.nickname} onChange={(v) => updateDraft({ nickname: v })} />
                <EditField label={t('profileFieldPhone')} value={draft.phone} onChange={(v) => updateDraft({ phone: v })} />
                <EditField label={t('profileFieldEmail')} value={draft.personalEmail} onChange={(v) => updateDraft({ personalEmail: v })} />
                <EditField label={t('profileFieldAddress')} value={draft.address} onChange={(v) => updateDraft({ address: v })} />
              </div>
            </div>
          ) : (
            <FieldCard eyebrow={t('personalEyebrow')} title={t('personalTitle')} rows={p.personal} labelW={180} />
          )}
          <FieldCard eyebrow={t('contactEyebrow')} title={t('contactTitle')} rows={p.contact} labelW={140} />
        </div>
      )}

      {panelKey === 'job' && (
        <div className="grid gap-4 md:grid-cols-2">
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

      {panelKey === 'emergency' && (
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
            className="grid gap-3.5 md:grid-cols-2"
            style={{ marginTop: 16 }}
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

      {(panelKey === 'docs' || panelKey === 'tax') && (
        <div className="humi-card">
          <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-tight text-ink">
            {panelKey === 'docs' ? t('docsTitle') : t('taxTitle')}
          </h3>
          <ul className="humi-list mt-2.5" role="list">
            {(panelKey === 'tax'
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
        {rows.map(([l, v]) => {
          // Section divider row: label starts with "────" and value is empty.
          // Render as full-width eyebrow heading instead of a label/value pair —
          // mirrors SF EC Core sub-section structure (Employment Details, Org Info, ...)
          if (v === '' && l.startsWith('────')) {
            const heading = l.replace(/────/g, '').trim();
            return (
              <div
                key={l}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  paddingTop: 8,
                  borderTop: '1px solid var(--color-hairline)',
                }}
              >
                {heading}
              </div>
            );
          }
          return (
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
          );
        })}
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

function EditField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="humi-row"
      style={{ borderBottom: '1px solid var(--color-hairline-soft)', paddingBottom: 10, alignItems: 'center' }}
    >
      <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', width: 140, flexShrink: 0 }}>
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-ink)',
          background: 'var(--color-canvas-soft)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 7,
          padding: '5px 10px',
          outline: 'none',
        }}
      />
    </div>
  );
}

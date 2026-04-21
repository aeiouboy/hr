'use client';

// ════════════════════════════════════════════════════════════
// Humi Settings — Sprint 1 redesign (#1 Task 6)
// Editorial 2-column: sticky sidebar (sections) + content panel.
// Default panel = ข้อมูลองค์กร; 5 other sections = "กำลังพัฒนา" stub.
// Tokens only, Thai-primary. Uses Humi primitives (Card, Button,
// FormField, FormInput, Toggle) — no legacy shadcn imports.
// ════════════════════════════════════════════════════════════

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Building2,
  Users,
  Bell,
  ShieldCheck,
  Plug,
  Info,
  type LucideIcon,
} from 'lucide-react';
import {
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  FormField,
  FormInput,
  Toggle,
} from '@/components/humi';
import { cn } from '@/lib/utils';

type SectionKey =
  | 'organization'
  | 'usersRoles'
  | 'notifications'
  | 'security'
  | 'integrations'
  | 'about';

interface SectionMeta {
  key: SectionKey;
  icon: LucideIcon;
}

const SECTION_ORDER: SectionMeta[] = [
  { key: 'organization', icon: Building2 },
  { key: 'usersRoles', icon: Users },
  { key: 'notifications', icon: Bell },
  { key: 'security', icon: ShieldCheck },
  { key: 'integrations', icon: Plug },
  { key: 'about', icon: Info },
];

export default function SettingsPage() {
  const t = useTranslations('humiSettings');
  const [active, setActive] = useState<SectionKey>('organization');

  // Local form state — surgical scope, no backend wiring.
  const [companyName, setCompanyName] = useState(t('defaults.companyName'));
  const [companyCode, setCompanyCode] = useState(t('defaults.companyCode'));
  const [fiscalYearStart, setFiscalYearStart] = useState(
    t('defaults.fiscalYearStart')
  );
  const [address, setAddress] = useState(t('defaults.address'));
  const [language, setLanguage] = useState<'th' | 'en'>('th');
  const [timezone] = useState('tzBangkok');
  const [autoSave, setAutoSave] = useState(false);

  const sections = useMemo(
    () =>
      SECTION_ORDER.map((s) => ({
        ...s,
        label: t(`sections.${s.key}`),
      })),
    [t]
  );

  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto w-full max-w-[var(--max-width-page)] px-6 py-10 md:px-10 md:py-14">
        {/* ── Page header — editorial eyebrow + display h1 ───── */}
        <header className="mb-10 md:mb-14">
          <p className="font-display text-[length:var(--text-eyebrow)] uppercase tracking-[0.22em] text-accent">
            {t('organization.eyebrow')}
          </p>
          <h1 className="mt-3 font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-2xl text-body text-ink-muted">
            {t('subtitle')}
          </p>
        </header>

        {/* ── 2-column split: 1/4 sidebar + 3/4 content ──────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(220px,1fr)_3fr] lg:gap-12">
          {/* Sidebar sections */}
          <aside>
            <nav
              aria-label={t('title')}
              className="lg:sticky lg:top-10"
            >
              <ul className="flex flex-col gap-1">
                {sections.map(({ key, label, icon: Icon }) => {
                  const isActive = key === active;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setActive(key)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'group flex w-full items-center gap-3 rounded-[var(--radius-md)]',
                          'px-3.5 py-2.5 text-left transition-[background-color,color]',
                          'duration-[var(--dur-fast)] ease-[var(--ease-spring)]',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-accent focus-visible:ring-offset-2',
                          'focus-visible:ring-offset-canvas',
                          isActive
                            ? 'bg-accent-soft text-ink'
                            : 'text-ink-soft hover:bg-canvas-soft'
                        )}
                      >
                        <Icon
                          size={18}
                          aria-hidden="true"
                          className={cn(
                            'shrink-0 transition-colors',
                            isActive ? 'text-accent' : 'text-ink-muted'
                          )}
                        />
                        <span className="text-body font-medium">{label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Content panel */}
          <section className="min-w-0">
            {active === 'organization' ? (
              <OrganizationPanel
                companyName={companyName}
                companyCode={companyCode}
                fiscalYearStart={fiscalYearStart}
                address={address}
                language={language}
                timezone={timezone}
                autoSave={autoSave}
                onCompanyName={setCompanyName}
                onCompanyCode={setCompanyCode}
                onFiscalYear={setFiscalYearStart}
                onAddress={setAddress}
                onLanguage={setLanguage}
                onAutoSave={setAutoSave}
              />
            ) : (
              <StubPanel onBack={() => setActive('organization')} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// ข้อมูลองค์กร panel — 4 cards + footer action row
// ════════════════════════════════════════════════════════════

interface OrganizationPanelProps {
  companyName: string;
  companyCode: string;
  fiscalYearStart: string;
  address: string;
  language: 'th' | 'en';
  timezone: string;
  autoSave: boolean;
  onCompanyName: (v: string) => void;
  onCompanyCode: (v: string) => void;
  onFiscalYear: (v: string) => void;
  onAddress: (v: string) => void;
  onLanguage: (v: 'th' | 'en') => void;
  onAutoSave: (v: boolean) => void;
}

function OrganizationPanel({
  companyName,
  companyCode,
  fiscalYearStart,
  address,
  language,
  timezone,
  autoSave,
  onCompanyName,
  onCompanyCode,
  onFiscalYear,
  onAddress,
  onLanguage,
  onAutoSave,
}: OrganizationPanelProps) {
  const t = useTranslations('humiSettings');

  return (
    <div className="flex flex-col gap-6">
      {/* Panel header */}
      <div>
        <CardEyebrow>{t('organization.eyebrow')}</CardEyebrow>
        <h2 className="mt-1 font-display text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)] font-semibold tracking-tight text-ink">
          {t('organization.title')}
        </h2>
        <p className="mt-1 text-small text-ink-muted">
          {t('organization.subtitle')}
        </p>
      </div>

      {/* Card 1 — ข้อมูลทั่วไป */}
      <Card>
        <div className="mb-5">
          <CardTitle>{t('organization.general.title')}</CardTitle>
          <p className="mt-1 text-small text-ink-muted">
            {t('organization.general.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label={t('organization.general.companyName')} required>
            {(props) => (
              <FormInput
                {...props}
                value={companyName}
                onChange={(e) => onCompanyName(e.target.value)}
              />
            )}
          </FormField>
          <FormField label={t('organization.general.companyCode')}>
            {(props) => (
              <FormInput
                {...props}
                value={companyCode}
                onChange={(e) => onCompanyCode(e.target.value)}
              />
            )}
          </FormField>
          <FormField
            label={t('organization.general.fiscalYearStart')}
            help={t('organization.general.fiscalYearHelp')}
            className="md:col-span-2"
          >
            {(props) => (
              <FormInput
                {...props}
                value={fiscalYearStart}
                onChange={(e) => onFiscalYear(e.target.value)}
              />
            )}
          </FormField>
        </div>
      </Card>

      {/* Card 2 — ตราสัญลักษณ์ */}
      <Card>
        <div className="mb-5">
          <CardTitle>{t('organization.logo.title')}</CardTitle>
          <p className="mt-1 text-small text-ink-muted">
            {t('organization.logo.description')}
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {/* Logo preview — cream tile with teal initial */}
          <div
            aria-hidden="true"
            className={cn(
              'relative flex h-20 w-20 shrink-0 items-center justify-center',
              'rounded-[var(--radius-lg)] bg-accent-soft',
              'ring-1 ring-hairline'
            )}
          >
            <span className="font-display text-[32px] font-semibold tracking-tight text-accent">
              {t('organization.logo.placeholder')}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="md">
              {t('organization.logo.change')}
            </Button>
            <p className="text-small text-ink-muted">
              {t('organization.logo.caption')}
            </p>
          </div>
        </div>
      </Card>

      {/* Card 3 — ที่อยู่ */}
      <Card>
        <div className="mb-5">
          <CardTitle>{t('organization.address.title')}</CardTitle>
          <p className="mt-1 text-small text-ink-muted">
            {t('organization.address.description')}
          </p>
        </div>
        <FormField label={t('organization.address.label')}>
          {(props) => (
            <textarea
              {...props}
              value={address}
              onChange={(e) => onAddress(e.target.value)}
              placeholder={t('organization.address.placeholder')}
              rows={3}
              className={cn(
                'w-full rounded-md border bg-surface px-3 py-2',
                'text-body text-ink placeholder:text-ink-faint',
                'border-hairline',
                'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
                'focus:outline-none focus:ring-2 focus:ring-accent',
                'focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent',
                'resize-y min-h-[88px]'
              )}
            />
          )}
        </FormField>
      </Card>

      {/* Card 4 — ภาษาและเขตเวลา */}
      <Card>
        <div className="mb-5">
          <CardTitle>{t('organization.locale.title')}</CardTitle>
          <p className="mt-1 text-small text-ink-muted">
            {t('organization.locale.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField label={t('organization.locale.language')}>
            {(props) => (
              <select
                {...props}
                value={language}
                onChange={(e) =>
                  onLanguage(e.target.value as 'th' | 'en')
                }
                className={cn(
                  'h-10 w-full rounded-md border bg-surface px-3',
                  'text-body text-ink',
                  'border-hairline',
                  'transition-[border-color,box-shadow] duration-[var(--dur-fast)]',
                  'focus:outline-none focus:ring-2 focus:ring-accent',
                  'focus:ring-offset-1 focus:ring-offset-canvas focus:border-accent'
                )}
              >
                <option value="th">{t('organization.locale.langTh')}</option>
                <option value="en">{t('organization.locale.langEn')}</option>
              </select>
            )}
          </FormField>
          <FormField label={t('organization.locale.timezone')}>
            {(props) => (
              <select
                {...props}
                value={timezone}
                disabled
                className={cn(
                  'h-10 w-full rounded-md border bg-canvas-soft px-3',
                  'text-body text-ink-muted',
                  'border-hairline cursor-not-allowed'
                )}
              >
                <option value="tzBangkok">
                  {t('organization.locale.tzBangkok')}
                </option>
              </select>
            )}
          </FormField>
          <div className="md:col-span-2 pt-2 border-t border-hairline">
            <Toggle
              checked={autoSave}
              onChange={onAutoSave}
              label={t('organization.autoSave.label')}
              description={t('organization.autoSave.description')}
            />
          </div>
        </div>
      </Card>

      {/* Footer action row — hairline divider + right-aligned */}
      <div className="flex flex-col-reverse gap-3 border-t border-hairline pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-ink-muted">
          {t('actions.saveHint')}
        </p>
        <div className="flex items-center gap-3">
          <Button variant="ghost">{t('actions.cancel')}</Button>
          <Button variant="primary">{t('actions.save')}</Button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// Stub panel — for Sprint 2 sections
// ════════════════════════════════════════════════════════════

function StubPanel({ onBack }: { onBack: () => void }) {
  const t = useTranslations('humiSettings');
  return (
    <Card tone="canvas" size="lg">
      <div className="flex flex-col items-start gap-4 py-8 px-2">
        <CardEyebrow>{t('stub.eyebrow')}</CardEyebrow>
        <h3 className="font-display text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)] font-semibold tracking-tight text-ink">
          {t('stub.title')}
        </h3>
        <p className="max-w-lg text-body text-ink-muted">{t('stub.body')}</p>
        <Button variant="secondary" size="md" onClick={onBack}>
          {t('stub.cta')}
        </Button>
      </div>
    </Card>
  );
}

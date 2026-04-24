'use client';

// ════════════════════════════════════════════════════════════
// /login — Humi sign-in screen
// 1:1 port of docs/design-ref/shelfly-bundle/project/screens/login.jsx
// No existing auth wiring in this repo (verified: no middleware,
// no /login route, no auth page).  Form handler posts to /th/home
// via client navigation — same as reference onNav('home').  When
// MSAL/NextAuth is added later, replace handleSubmit only.
// This page uses a full-viewport overlay (.humi-login-wrap) so it
// visually covers the AppShell layout.
// ════════════════════════════════════════════════════════════

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, Globe, ShieldCheck } from 'lucide-react';

export default function HumiLoginPage() {
  const t = useTranslations('humiLogin');
  const router = useRouter();
  const [email, setEmail] = useState('jongrak.t@humi.co.th');
  const [pw, setPw] = useState('••••••••••');
  const [remember, setRemember] = useState(true);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(auth): swap for MSAL/NextAuth when wired. Visual port only.
    router.push('/th/home');
  }

  return (
    <div className="humi-login-wrap">
      {/* Art panel */}
      <section className="humi-login-art humi-grain" aria-hidden>
        <div
          className="humi-blob humi-blob--teal"
          style={{ width: 280, height: 350, right: -80, top: -60, opacity: 0.35 }}
        />
        <div
          className="humi-blob humi-blob--coral"
          style={{ width: 180, height: 220, left: -40, bottom: 80, opacity: 0.45 }}
        />
        <div
          className="humi-blob humi-blob--butter"
          style={{ width: 80, height: 100, right: 120, bottom: 180, opacity: 0.6 }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: '-0.04em',
              color: 'var(--color-canvas-soft)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <span>{t('brand')}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-accent)',
              fontWeight: 600,
            }}
          >
            {t('eyebrow')}
          </div>
          <h1 className="humi-login-headline">
            {t('headlineLine1')}
            <br />
            {t('headlineLine2')}
          </h1>
          <p className="humi-login-body">{t('intro')}</p>

          <div className="humi-login-quote">
            <div className="humi-login-quote-body">
              &ldquo;{t('quoteBody')}&rdquo;
            </div>
            <div className="humi-row" style={{ marginTop: 14, gap: 10 }}>
              <span
                className="humi-avatar humi-avatar--sage"
                aria-hidden
              >
                ดล
              </span>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--color-canvas-soft)',
                    fontWeight: 600,
                  }}
                >
                  {t('quoteAuthor')}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(231, 227, 216, 0.6)',
                  }}
                >
                  {t('quoteRole')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form panel */}
      <section className="humi-login-form">
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 400, width: '100%' }}
          aria-label={t('formTitle')}
        >
          <div
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--color-ink-muted)',
              fontWeight: 600,
            }}
          >
            {t('welcomeEyebrow')}
          </div>
          <h1
            className="mt-2.5 font-display font-semibold leading-[1.1] tracking-tight text-ink"
            style={{ fontSize: 34 }}
          >
            {t('formTitle')}
          </h1>
          <p
            style={{
              color: 'var(--color-ink-muted)',
              fontSize: 14,
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            {t('formHelp')}
          </p>

          <div className="humi-col mt-7" style={{ gap: 14 }}>
            <label className="humi-field">
              <span>{t('emailLabel')}</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="humi-field">
              <span className="flex items-center">
                {t('pwLabel')}
                <a
                  href="#"
                  className="ml-auto text-[12px] text-ink-muted hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {t('forgotPw')}
                </a>
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </label>
            <label
              className="humi-row cursor-pointer"
              style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="sr-only"
              />
              <span
                aria-hidden
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  background: remember ? 'var(--color-accent)' : 'var(--color-hairline)',
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {remember && <Check size={11} />}
              </span>
              {t('rememberDevice')}
            </label>
            <button
              type="submit"
              className="mt-1.5 w-full humi-button humi-button--primary"
            >
              {t('submit')} <ArrowRight size={14} />
            </button>
          </div>

          <div
            className="humi-row"
            style={{ margin: '22px 0', gap: 10 }}
            aria-hidden
          >
            <hr
              style={{
                flex: 1,
                border: 0,
                borderTop: '1px solid var(--color-hairline)',
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: 'var(--color-ink-faint)',
                letterSpacing: '0.1em',
              }}
            >
              {t('divider')}
            </span>
            <hr
              style={{
                flex: 1,
                border: 0,
                borderTop: '1px solid var(--color-hairline)',
              }}
            />
          </div>

          <div className="humi-col" style={{ gap: 10 }}>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 py-3 text-body font-medium text-ink transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Globe size={15} /> {t('ssoGoogle')}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-hairline bg-surface px-4 py-3 text-body font-medium text-ink transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ShieldCheck size={15} /> {t('ssoGeneric')}
            </button>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 13,
              color: 'var(--color-ink-muted)',
            }}
          >
            {t('newMember')}{' '}
            <a
              href="mailto:hr@humi.co.th"
              className="font-semibold text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t('setupAccount')}
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}

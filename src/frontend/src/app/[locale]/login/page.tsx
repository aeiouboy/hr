// VALIDATION_EXEMPT: next-auth credentials provider validates email/password upstream — page is render-only post-auth (per design-gates Track C 2026-04-26)
'use client';

// ════════════════════════════════════════════════════════════
// /login — Humi sign-in screen
// Visual shell = 1:1 port of docs/design-ref/shelfly-bundle/project/screens/login.jsx
// Auth layer (2026-04-24 jarvis/login-admin):
//   - Real Humi logo (humi-logo-white-v3.png, Rungrote-locked G8)
//   - Mock credentials map → sets Zustand auth-store
//   - Role-based redirect: hr_admin → /{locale}/admin, else /{locale}/home
// Replace DEMO_USERS + handleSubmit when MSAL/NextAuth-Keycloak is wired.
// ════════════════════════════════════════════════════════════

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { DEMO_USERS, landingForRoles } from '@/lib/demo-users';

export default function HumiLoginPage() {
  const t = useTranslations('humiLogin');
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState('admin@humi.test');
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = DEMO_USERS[email.trim().toLowerCase()];
    if (!user) {
      setError(t('errorUnknownUser'));
      return;
    }
    if (pw !== user.password) {
      setError(t('errorBadPassword'));
      return;
    }
    setError(null);
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
    router.push(landingForRoles(user.roles, locale));
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
          <Image
            src="/humi-logo-white-v3.png"
            alt={t('brandLogoAlt')}
            width={140}
            height={48}
            priority
            style={{ height: 40, width: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ marginTop: 'auto', marginBottom: 'auto', position: 'relative', zIndex: 1, maxWidth: 460 }}>
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

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-md border border-hairline bg-canvas-soft px-3 py-2"
              style={{ fontSize: 13, color: 'var(--color-ink)' }}
            >
              <strong style={{ fontWeight: 600 }}>{t('errorTitle')}:</strong>{' '}
              {error}
            </div>
          )}

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
              <svg
                width="15"
                height="15"
                viewBox="0 0 23 23"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <rect x="1" y="1" width="10" height="10" fill="#f25022" />
                <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
                <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
                <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
              </svg>
              {t('ssoMicrosoft')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

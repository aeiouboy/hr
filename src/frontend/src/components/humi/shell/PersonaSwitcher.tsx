'use client';

// PersonaSwitcher — demo-only role proxy dropdown. Lets Ken walk the
// 5-persona approval chain in a single browser session without logout.
// - Persists nothing beyond the auth store (originalUser is saved there).
// - Switching redirects to the new persona's landing page.
// - A small "proxy mode" pill in the Topbar links back to the original.

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronDown, UserCog, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import {
  DEMO_USERS,
  PERSONA_ORDER,
  PERSONA_BADGE,
  landingForDemoUser,
} from '@/lib/demo-users';
import { cn } from '@/lib/utils';

export function PersonaSwitcher() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const currentEmail = useAuthStore((s) => s.email);
  const originalUser = useAuthStore((s) => s.originalUser);
  const switchPersona = useAuthStore((s) => s.switchPersona);
  const exitPersona = useAuthStore((s) => s.exitPersona);

  const [open, setOpen] = useState(false);

  const activeBadge = currentEmail ? PERSONA_BADGE[currentEmail] : null;
  const inProxy = originalUser !== null;

  function swapTo(email: string) {
    const user = DEMO_USERS[email];
    if (!user) return;
    switchPersona({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
    setOpen(false);
    router.push(landingForDemoUser(email, locale));
  }

  function handleExit() {
    if (!originalUser) return;
    exitPersona();
    setOpen(false);
    router.push(`/${locale}/admin`);
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'humi-row inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-small font-medium whitespace-nowrap flex-shrink-0 max-w-[240px]',
          'transition-colors duration-[var(--dur-fast)]',
          'hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          inProxy
            ? 'border-accent bg-accent-soft/40 text-ink'
            : 'border-hairline bg-surface text-ink',
        )}
        aria-label="สลับ persona สำหรับ demo"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <UserCog size={14} aria-hidden className="flex-shrink-0" />
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {inProxy ? 'สวมบทบาท' : 'เลือก Persona'}
          {activeBadge && (
            <>
              {' · '}
              <span className="font-semibold">{activeBadge.label}</span>
            </>
          )}
        </span>
        <ChevronDown size={14} aria-hidden className="flex-shrink-0" />
      </button>

      {open && (
        <>
          {/* Click-outside scrim */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="menu"
            className="humi-card"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: 260,
              padding: 8,
              zIndex: 50,
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              className="humi-eyebrow"
              style={{ padding: '6px 10px 4px' }}
            >
              สลับบทบาทเพื่อ demo
            </div>
            {PERSONA_ORDER.map((email) => {
              const user = DEMO_USERS[email];
              const badge = PERSONA_BADGE[email];
              const isActive = email === currentEmail;
              return (
                <button
                  key={email}
                  type="button"
                  role="menuitem"
                  onClick={() => !isActive && swapTo(email)}
                  disabled={isActive}
                  className={cn(
                    'w-full flex items-start gap-3 rounded-md px-2.5 py-2 text-left',
                    'transition-colors duration-[var(--dur-fast)]',
                    isActive
                      ? 'bg-accent-soft/40 cursor-default'
                      : 'hover:bg-canvas-soft',
                  )}
                >
                  <span className={`humi-tag ${badge.tone}`} style={{ flexShrink: 0 }}>
                    {badge.label}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="block text-small font-medium text-ink truncate">
                      {user.name}
                    </span>
                    <span className="block text-small text-ink-muted truncate">
                      {user.email}
                    </span>
                  </span>
                  {isActive && (
                    <span className="text-small text-accent font-medium" aria-hidden>
                      ● ใช้อยู่
                    </span>
                  )}
                </button>
              );
            })}

            {inProxy && (
              <>
                <hr
                  style={{
                    border: 0,
                    borderTop: '1px solid var(--color-hairline-soft)',
                    margin: '6px 0',
                  }}
                />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleExit}
                  className="w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-small font-medium text-ink hover:bg-canvas-soft transition-colors"
                >
                  <LogOut size={14} aria-hidden />
                  กลับไปที่ {originalUser?.username ?? 'บัญชีเดิม'}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

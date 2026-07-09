'use client';

// PersonaSwitcher — demo-only role proxy. Lets Ken walk the persona/approval
// chain in a single browser session without logout.
//
// SF-realignment (di-proxy-sf-2026-05-28):
//   - No trigger pill rendered here anymore — the entry point is the Topbar
//     avatar dropdown menu item ("Take Action on Behalf of…"). This component
//     is open/closed via the `personaPickerOpen` flag on `ui-store` (chosen
//     as the lightest open mechanism: avoids ref/event plumbing across the
//     shell, no new top-level store).
//   - Modal header copy = "Take Action on Behalf of" / "สวมบทบาทแทน".
//   - Search input filters by name, email, and role label (case-insensitive).
//   - Each row shows a secondary line of {jobTitle} · {department}.
//   - Tier letter chips (A/B/C/D) removed (di-proxy-no-tiers-2026-06-29):
//     they forced viewers to memorize an A–D code; each row already names the
//     role plainly (badge.label), so the letters were redundant noise.
//   - Switching still calls auth-store.switchPersona + routes to the persona's
//     landing. Exit (when proxying) calls exitPersona + routes to /home.

import { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useUIStore } from '@/stores/ui-store';
import {
  DEMO_USERS,
  PERSONA_ORDER,
  PERSONA_BADGE,
  landingForDemoUser,
} from '@/lib/demo-users';
import { Modal } from '@/components/humi/organisms/Modal';
import { cn } from '@/lib/utils';

export function PersonaSwitcher() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const isTh = locale !== 'en';
  const currentEmail = useAuthStore((s) => s.email);
  const originalUser = useAuthStore((s) => s.originalUser);
  const switchPersona = useAuthStore((s) => s.switchPersona);
  const exitPersona = useAuthStore((s) => s.exitPersona);
  const open = useUIStore((s) => s.personaPickerOpen);
  const setOpen = useUIStore((s) => s.setPersonaPickerOpen);

  const [query, setQuery] = useState('');

  const inProxy = originalUser !== null;

  const filteredEmails = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PERSONA_ORDER;
    return PERSONA_ORDER.filter((email) => {
      const user = DEMO_USERS[email];
      const badge = PERSONA_BADGE[email];
      const hay = `${user.name} ${user.email} ${badge?.label ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  function close() {
    setOpen(false);
    setQuery('');
  }

  function swapTo(email: string) {
    const user = DEMO_USERS[email];
    if (!user) return;
    switchPersona({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    });
    close();
    router.push(landingForDemoUser(email, locale));
  }

  function handleExit() {
    if (!originalUser) return;
    exitPersona();
    close();
    router.push(`/${locale}/home`);
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title={isTh ? 'สวมบทบาทแทน' : 'Take Action on Behalf of'}
    >
      <div className="humi-eyebrow mb-3">{isTh ? 'เลือกบทบาทที่จะสวม' : 'Choose a role to act as'}</div>

      <label className="mb-3 block">
        <span className="sr-only">
          {isTh ? 'ค้นหาด้วยชื่อ อีเมล หรือบทบาท' : 'Search by name, email, or role'}
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isTh ? 'ค้นหาด้วยชื่อ อีเมล หรือบทบาท' : 'Search by name, email, or role'
          }
          className={cn(
            'w-full rounded-md border border-hairline bg-surface px-3 py-2 text-small text-ink',
            'placeholder:text-ink-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          )}
        />
      </label>

      <div className="flex flex-col gap-1">
        {filteredEmails.map((email) => {
          const user = DEMO_USERS[email];
          const badge = PERSONA_BADGE[email];
          const isActive = email === currentEmail;
          const initials = user.name.trim().slice(0, 2);
          const secondary =
            user.jobTitle && user.department
              ? `${user.jobTitle} · ${user.department}`
              : badge
              ? `${badge.label} · ${user.id}`
              : user.id;
          return (
            <button
              key={email}
              type="button"
              onClick={() => !isActive && swapTo(email)}
              disabled={isActive}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left',
                'transition-colors duration-[var(--dur-fast)]',
                isActive ? 'bg-accent-soft/40 cursor-default' : 'hover:bg-canvas-soft',
              )}
            >
              <span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-canvas-soft text-small font-semibold text-ink"
                aria-hidden
              >
                {initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-base font-medium text-ink">{user.name}</span>
                <span className="block truncate text-small text-ink-muted">
                  {badge?.label} · {user.id}
                </span>
                <span className="block truncate text-sm text-ink-muted">{secondary}</span>
              </span>
              {isActive && (
                <span className="flex-shrink-0 text-small font-medium text-accent">
                  {isTh ? 'ใช้อยู่' : 'Active'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {inProxy && (
        <button
          type="button"
          onClick={handleExit}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-hairline px-2.5 py-2 text-small font-medium text-ink transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <LogOut size={14} aria-hidden />
          {isTh ? `กลับไปที่ ${originalUser?.username ?? 'บัญชีเดิม'}` : `Back to ${originalUser?.username ?? 'original account'}`}
        </button>
      )}

      <p className="mt-4 border-t border-hairline pt-3 text-small text-ink-muted">
        {isTh
          ? 'แสดงเฉพาะสิทธิ์ของแต่ละบทบาท'
          : 'You only see what each role may access.'}
      </p>
    </Modal>
  );
}

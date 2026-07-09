'use client';

// ════════════════════════════════════════════════════════════
// LoginAsRibbon — persistent "Acting as …" bar shown ABOVE the Topbar while an
// admin is proxying into another persona (originalUser !== null). Renders
// nothing when not impersonating.
//
// Redesign (proxy-ribbon-2026-06-09):
//   - Navy console band (bg-ink / text-canvas) instead of the old flat cream bar.
//     A dark thin strip on a light app is unmissable → defeats banner blindness,
//     while staying 100% on-brand (navy is a core Humi token). NO red/orange.
//   - Identity FLOW: "Admin {adminName} → กำลังสวมบทบาทเป็น {username}" with an
//     initial avatar, so the proxy relationship reads at a glance.
//   - Role chip shows which role the admin is now viewing as, by plain name
//     (di-proxy-no-tiers-2026-06-29: dropped the A/B/C/D letter prefix — it made
//     viewers memorize a code; the readable role label stands on its own).
//   - A pulsing teal dot signals a live, special session without alarm.
//   - Clear cream "End Proxy" button with a LogOut icon on the right.
//   - Tokens only (no hardcoded hex); bilingual TH/EN; NO-RED guardrail intact.
// ════════════════════════════════════════════════════════════

import { useRouter, useParams } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/humi/atoms/Button';
import { personaTiers, type PersonaTier } from '@/lib/persona-tiers';

const TIER_LABEL: Record<PersonaTier, { th: string; en: string }> = {
  A: { th: 'ผู้ดูแลระบบ / HR', en: 'System / HR Admin' },
  B: { th: 'People Partner', en: 'People Partner' },
  C: { th: 'ผู้จัดการ', en: 'Manager' },
  D: { th: 'พนักงาน', en: 'Employee' },
};

export function LoginAsRibbon() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const isTh = locale !== 'en';

  const username = useAuthStore((s) => s.username);
  const roles = useAuthStore((s) => s.roles);
  const originalUser = useAuthStore((s) => s.originalUser);
  const exitPersona = useAuthStore((s) => s.exitPersona);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);

  // Wait for Zustand persist rehydration so SSR/first paint matches client.
  if (!hasHydrated) return null;
  // Bar shows ONLY during impersonation; otherwise nothing.
  if (!originalUser || !username) return null;

  function handleExit() {
    exitPersona();
    router.push(`/${locale}/home`);
  }

  const adminName = originalUser.username || (isTh ? 'บัญชีเดิม' : 'original account');
  const tier = personaTiers(roles ?? [])[0]; // highest tier the impersonated persona operates at
  const a11yLabel = isTh
    ? `กำลังสวมบทบาทเป็น ${username} (จากบัญชีของ ${adminName})`
    : `Acting as ${username} (signed in as ${adminName})`;

  return (
    <div
      role="status"
      aria-label={a11yLabel}
      title={a11yLabel}
      className="flex items-center gap-3 bg-ink text-canvas px-6 py-2 shadow-[var(--shadow-card)]"
      style={{
        // Span the full width of the .humi-app grid (sidebar + main).
        gridColumn: '1 / -1',
      }}
    >
      {/* Live pulse — teal, signals a special active session (not an alarm). */}
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>

      {/* Identity flow: real admin → impersonated persona. */}
      <div className="flex min-w-0 flex-1 items-center gap-2 text-small">
        <span className="hidden truncate text-canvas/60 sm:inline">
          {isTh ? 'ผู้ดูแล' : 'Admin'} {adminName}
        </span>
        <span className="hidden text-canvas/40 sm:inline" aria-hidden>→</span>
        <span className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-canvas"
            aria-hidden
          >
            {username.trim().charAt(0)}
          </span>
          <span className="truncate font-semibold">
            {isTh ? 'กำลังสวมบทบาทเป็น' : 'Acting as'} {username}
          </span>
        </span>
        {tier && (
          <span className="ml-1 hidden flex-shrink-0 items-center rounded-[var(--radius-sm)] border border-canvas/25 bg-canvas/10 px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-wide md:inline-flex">
            {isTh ? TIER_LABEL[tier].th : TIER_LABEL[tier].en}
          </span>
        )}
      </div>

      {/* Clear cream exit button — pops on the navy band. leadingIcon keeps the
          icon a flex sibling of the label (passing it as a child stacks it). */}
      <Button
        variant="secondary"
        size="sm"
        onClick={handleExit}
        leadingIcon={<LogOut className="h-3.5 w-3.5" aria-hidden />}
        className="flex-shrink-0 whitespace-nowrap border-transparent bg-canvas text-ink hover:bg-canvas-soft"
      >
        {isTh ? 'จบการสวมบทบาท' : 'End Proxy'}
      </Button>
    </div>
  );
}

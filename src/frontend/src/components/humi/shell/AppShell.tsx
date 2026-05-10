'use client';

// ════════════════════════════════════════════════════════════
// Humi AppShell — replaces the invented 6-item AppShell with
// 1:1 port of docs/design-ref/shelfly-bundle/project/shell.jsx.
//
// Layout: aside (sticky sidebar) + main column (Topbar + page).
// Title/eyebrow is derived from current pathname via lookup.
// ⌘K (Mac) / Ctrl+K (Windows) opens CommandPalette (b5).
//
// Responsive (issue #5):
// - <lg: Sidebar hidden; hamburger toggles mobile drawer overlay
// - Drawer: fixed inset-y-0 left-0, 280px wide, backdrop, Esc close
// - Body scroll locked while drawer open
// - Drawer auto-closes on route change
// ════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { AdminShell } from '@/components/admin/shell/AdminShell';
import { useUIStore } from '@/stores/ui-store';
import { useAuthStore } from '@/stores/auth-store';
import { ensureDemoSeed } from '@/lib/demo-seed';

/** href prefix → page title shown in topbar h2.
 *  Keep 1:1 with Sidebar.tsx NAV items — every sidebar destination MUST have a
 *  title entry here, otherwise topbar falls back to 'Humi' and visually
 *  duplicates the sidebar brand logo (Ken UAT 2026-04-22 "double humi"). */
const TITLE_MAP: Array<{ prefix: string; titleKey: string }> = [
  { prefix: '/th/home', titleKey: 'home' },
  { prefix: '/en/home', titleKey: 'home' },
  { prefix: '/th/profile', titleKey: 'profile' },
  { prefix: '/en/profile', titleKey: 'profile' },
  { prefix: '/th/timeoff', titleKey: 'timeoff' },
  { prefix: '/en/timeoff', titleKey: 'timeoff' },
  { prefix: '/th/benefits-hub', titleKey: 'benefits' },
  { prefix: '/en/benefits-hub', titleKey: 'benefits' },
  { prefix: '/th/employees/me/payslip', titleKey: 'payslip' },
  { prefix: '/en/employees/me/payslip', titleKey: 'payslip' },
  { prefix: '/th/employees/me', titleKey: 'profile' },
  { prefix: '/en/employees/me', titleKey: 'profile' },
  { prefix: '/th/ess/workflows', titleKey: 'my-workflows' },
  { prefix: '/en/ess/workflows', titleKey: 'my-workflows' },
  { prefix: '/th/quick-approve', titleKey: 'quick-approve' },
  { prefix: '/en/quick-approve', titleKey: 'quick-approve' },
  { prefix: '/th/approvals', titleKey: 'approvals-inbox' },
  { prefix: '/en/approvals', titleKey: 'approvals-inbox' },
  { prefix: '/th/spd/inbox', titleKey: 'spd-inbox' },
  { prefix: '/en/spd/inbox', titleKey: 'spd-inbox' },
  { prefix: '/th/requests', titleKey: 'requests' },
  { prefix: '/en/requests', titleKey: 'requests' },
  { prefix: '/th/goals', titleKey: 'goals' },
  { prefix: '/en/goals', titleKey: 'goals' },
  { prefix: '/th/learning-directory', titleKey: 'learning' },
  { prefix: '/en/learning-directory', titleKey: 'learning' },
  { prefix: '/th/org-chart', titleKey: 'directory' },
  { prefix: '/en/org-chart', titleKey: 'directory' },
  { prefix: '/th/performance-form', titleKey: 'performance-form' },
  { prefix: '/en/performance-form', titleKey: 'performance-form' },
  { prefix: '/th/development', titleKey: 'development' },
  { prefix: '/en/development', titleKey: 'development' },
  { prefix: '/th/succession', titleKey: 'succession' },
  { prefix: '/en/succession', titleKey: 'succession' },
  { prefix: '/th/announcements', titleKey: 'announce' },
  { prefix: '/en/announcements', titleKey: 'announce' },
  { prefix: '/th/integrations', titleKey: 'integrations' },
  { prefix: '/en/integrations', titleKey: 'integrations' },
  { prefix: '/th/careers', titleKey: 'careers' },
  { prefix: '/en/careers', titleKey: 'careers' },
  { prefix: '/th/recruiting', titleKey: 'recruiting' },
  { prefix: '/en/recruiting', titleKey: 'recruiting' },
  { prefix: '/th/reports', titleKey: 'reports' },
  { prefix: '/en/reports', titleKey: 'reports' },
  { prefix: '/th/admin', titleKey: 'admin' },
  { prefix: '/en/admin', titleKey: 'admin' },
  { prefix: '/th/ess', titleKey: 'ess' },
  { prefix: '/en/ess', titleKey: 'ess' },
];

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
};

function resolveTitleKey(pathname: string, searchParams?: ReadonlyURLSearchParamsLike | null): string | null {
  const hit = TITLE_MAP.find((m) => pathname === m.prefix || pathname.startsWith(m.prefix + '/'));
  return hit?.titleKey ?? null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // ── ALL hooks declared first (Rules of Hooks: no conditional calls) ──
  // Early returns for /login, unauthenticated, and /admin live AFTER all
  // hooks register, so the hooks count stays constant across every render
  // regardless of which shell variant this instance eventually renders.
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('shell');
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { mobileMenuOpen, closeMobileMenu } = useUIStore();
  // Refs for focus management — return focus to hamburger when drawer closes,
  // and focus the first interactive element inside drawer when it opens.
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerSnapshotRef = useRef<HTMLElement | null>(null);

  const isLoginPage = pathname === '/th/login' || pathname === '/en/login';
  const locale = pathname.startsWith('/en') ? 'en' : 'th';

  // Global auth gate — every route except /login requires a session.
  // Role check for /admin/* lives in app/[locale]/admin/layout.tsx.
  useEffect(() => {
    // wait for Zustand persist rehydration before redirecting
    if (!hasHydrated) return;
    if (!isLoginPage && !isAuthenticated) {
      router.replace(`/${locale}/login`);
    }
  }, [hasHydrated, isLoginPage, isAuthenticated, locale, router]);

  // Demo seeding — idempotent. Populates SPD inbox with 2 pending + 1
  // approved request on first mount so personas land on populated data.
  useEffect(() => {
    ensureDemoSeed();
  }, []);

  // Auto-close drawer on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Esc key closes drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileMenuOpen, closeMobileMenu]);

  // Body scroll lock while drawer open — preserves any prior inline overflow
  // value (e.g. set by a modal mounted before drawer) instead of clobbering to ''.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  // Auto-close drawer when viewport crosses lg breakpoint — without this the
  // drawer state stays true while CSS hides the panel via lg:hidden, leaving
  // body scroll locked + aria-expanded out of sync.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobileMenu();
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [closeMobileMenu]);

  // Focus management — on open: snapshot the trigger (hamburger) + focus first
  // interactive element inside drawer. On close: return focus to trigger.
  useEffect(() => {
    if (mobileMenuOpen) {
      triggerSnapshotRef.current = document.activeElement as HTMLElement | null;
      // Defer one tick — drawer DOM mounts after this effect runs.
      requestAnimationFrame(() => {
        const first = drawerRef.current?.querySelector<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        first?.focus();
      });
    } else {
      triggerSnapshotRef.current?.focus();
      triggerSnapshotRef.current = null;
    }
  }, [mobileMenuOpen]);

  // ⌘K / Ctrl+K global hotkey
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      const trigger = isMac ? e.metaKey && e.key === 'k' : e.ctrlKey && e.key === 'k';
      if (trigger) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Conditional returns (safe — all hooks above ran unconditionally) ──
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (pathname.startsWith('/th/admin') || pathname.startsWith('/en/admin')) {
    return <AdminShell>{children}</AdminShell>;
  }

  const titleKey = resolveTitleKey(pathname, searchParams);
  const title = titleKey ? t(`titles.${titleKey}`) : 'Humi';

  return (
    <div className="humi-app">
      {/* Desktop sidebar — hidden below lg via .humi-sidebar CSS */}
      <Sidebar />

      {/* Mobile drawer overlay — renders only when open. Wrapper has no width
          (drop the previous `w-[256px]` which mismatched .humi-sidebar--drawer's
          280px in globals.css) — the drawer's own CSS controls the panel size.
          role="dialog" + aria-modal makes screen readers treat this as a modal
          region. id matches Topbar's aria-controls. */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30 lg:hidden humi-drawer-scrim"
            aria-hidden="true"
            onClick={closeMobileMenu}
          />
          {/* Drawer panel */}
          <div
            ref={drawerRef}
            id="humi-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t('a11y.mobileDrawer')}
            className="fixed inset-y-0 left-0 z-40 lg:hidden"
          >
            <Sidebar
              onNavigate={closeMobileMenu}
              onClose={closeMobileMenu}
              className="humi-sidebar--drawer"
            />
          </div>
        </>
      )}

      <div className="humi-main">
        <Topbar title={title} onSearchClick={() => setPaletteOpen(true)} />
        <main className="humi-page-wrap">{children}</main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

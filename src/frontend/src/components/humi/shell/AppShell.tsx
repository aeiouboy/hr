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
import { usePathname, useRouter } from 'next/navigation';
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
const TITLE_MAP: Array<{ prefix: string; title: string }> = [
  { prefix: '/th/home',               title: 'หน้าหลัก' },
  { prefix: '/en/home',               title: 'หน้าหลัก' },
  { prefix: '/th/profile',            title: 'โปรไฟล์ของฉัน' },
  { prefix: '/en/profile',            title: 'โปรไฟล์ของฉัน' },
  { prefix: '/th/timeoff',            title: 'ลางาน' },
  { prefix: '/en/timeoff',            title: 'ลางาน' },
  { prefix: '/th/benefits-hub',       title: 'เงินเดือนและสวัสดิการ' },
  { prefix: '/en/benefits-hub',       title: 'เงินเดือนและสวัสดิการ' },
  { prefix: '/th/requests',           title: 'คำร้องและแบบฟอร์ม' },
  { prefix: '/en/requests',           title: 'คำร้องและแบบฟอร์ม' },
  { prefix: '/th/goals',              title: 'เป้าหมายและผลงาน' },
  { prefix: '/en/goals',              title: 'เป้าหมายและผลงาน' },
  { prefix: '/th/learning-directory', title: 'การเรียนรู้' },
  { prefix: '/en/learning-directory', title: 'การเรียนรู้' },
  { prefix: '/th/org-chart',          title: 'ผังองค์กร' },
  { prefix: '/en/org-chart',          title: 'ผังองค์กร' },
  { prefix: '/th/performance-form',   title: 'ประเมินผลงาน' },
  { prefix: '/en/performance-form',   title: 'ประเมินผลงาน' },
  { prefix: '/th/development',        title: 'การพัฒนา' },
  { prefix: '/en/development',        title: 'การพัฒนา' },
  { prefix: '/th/succession',         title: 'สายการสืบทอด' },
  { prefix: '/en/succession',         title: 'สายการสืบทอด' },
  { prefix: '/th/announcements',      title: 'ประกาศ' },
  { prefix: '/en/announcements',      title: 'ประกาศ' },
  { prefix: '/th/integrations',       title: 'จัดการระบบ' },
  { prefix: '/en/integrations',       title: 'จัดการระบบ' },
  { prefix: '/th/careers',            title: 'ตำแหน่งว่างภายใน' },
  { prefix: '/en/careers',            title: 'ตำแหน่งว่างภายใน' },
  { prefix: '/th/recruiting',         title: 'สรรหา' },
  { prefix: '/en/recruiting',         title: 'สรรหา' },
  { prefix: '/th/reports',            title: 'รายงาน' },
  { prefix: '/en/reports',            title: 'รายงาน' },
  { prefix: '/th/admin',              title: 'ศูนย์ Admin' },
  { prefix: '/en/admin',              title: 'ศูนย์ Admin' },
  { prefix: '/th/ess',                title: 'บริการตนเอง' },
  { prefix: '/en/ess',                title: 'บริการตนเอง' },
];

function resolveTitle(pathname: string): string {
  const hit = TITLE_MAP.find(
    (m) => pathname === m.prefix || pathname.startsWith(m.prefix + '/'),
  );
  return hit?.title ?? 'Humi';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // ── ALL hooks declared first (Rules of Hooks: no conditional calls) ──
  // Early returns for /login, unauthenticated, and /admin live AFTER all
  // hooks register, so the hooks count stays constant across every render
  // regardless of which shell variant this instance eventually renders.
  const pathname = usePathname();
  const router = useRouter();
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
    return () => { document.body.style.overflow = prev; };
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

  const title = resolveTitle(pathname);

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
            aria-label="เมนูหลัก"
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
        <Topbar
          title={title}
          onSearchClick={() => setPaletteOpen(true)}
        />
        <main className="humi-page-wrap">{children}</main>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AdminSidebar } from './AdminSidebar';
import { Topbar } from '@/components/humi/shell/Topbar';
import { CommandPalette } from '@/components/humi/shell/CommandPalette';
import { useUIStore } from '@/stores/ui-store';

const TITLE_MAP: Array<{ prefix: string; titleKey: string }> = [
  { prefix: '/th/admin/hire', titleKey: 'hire' },
  { prefix: '/en/admin/hire', titleKey: 'hire' },
  { prefix: '/th/admin/employees', titleKey: 'employees' },
  { prefix: '/en/admin/employees', titleKey: 'employees' },
  { prefix: '/th/admin/reports', titleKey: 'adminReports' },
  { prefix: '/en/admin/reports', titleKey: 'adminReports' },
  { prefix: '/th/admin/self-service', titleKey: 'self-service' },
  { prefix: '/en/admin/self-service', titleKey: 'self-service' },
  { prefix: '/th/admin/users', titleKey: 'users' },
  { prefix: '/en/admin/users', titleKey: 'users' },
  { prefix: '/th/admin/system', titleKey: 'system' },
  { prefix: '/en/admin/system', titleKey: 'system' },
  { prefix: '/th/admin', titleKey: 'admin' },
  { prefix: '/en/admin', titleKey: 'admin' },
];

function resolveTitleKey(pathname: string): string {
  const hit = TITLE_MAP.find((m) => pathname === m.prefix || pathname.startsWith(m.prefix + '/'));
  return hit?.titleKey ?? 'admin';
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('shell');
  const title = t(`titles.${resolveTitleKey(pathname)}`);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { mobileMenuOpen, closeMobileMenu } = useUIStore();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const triggerSnapshotRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mobileMenuOpen, closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobileMenu();
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [closeMobileMenu]);

  useEffect(() => {
    if (mobileMenuOpen) {
      triggerSnapshotRef.current = document.activeElement as HTMLElement | null;
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

  return (
    <div className="humi-app">
      <AdminSidebar />

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 lg:hidden humi-drawer-scrim"
            aria-hidden="true"
            onClick={closeMobileMenu}
          />
          <div
            ref={drawerRef}
            id="humi-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t('a11y.adminMobileDrawer')}
            className="fixed inset-y-0 left-0 z-40 lg:hidden"
          >
            <AdminSidebar
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

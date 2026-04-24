'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { Topbar } from '@/components/humi/shell/Topbar';
import { CommandPalette } from '@/components/humi/shell/CommandPalette';
import { useUIStore } from '@/stores/ui-store';

const TITLE_MAP: Array<{ prefix: string; title: string }> = [
  { prefix: '/th/admin/hire', title: 'รับพนักงานใหม่' },
  { prefix: '/en/admin/hire', title: 'Hire Employee' },
  { prefix: '/th/admin/employees', title: 'พนักงาน' },
  { prefix: '/en/admin/employees', title: 'Employees' },
  { prefix: '/th/admin/reports', title: 'รายงาน (Admin)' },
  { prefix: '/en/admin/reports', title: 'Reports (Admin)' },
  { prefix: '/th/admin/self-service', title: 'Self-Service Config' },
  { prefix: '/en/admin/self-service', title: 'Self-Service Config' },
  { prefix: '/th/admin/users', title: 'ผู้ใช้และสิทธิ์' },
  { prefix: '/en/admin/users', title: 'Users & Permissions' },
  { prefix: '/th/admin/system', title: 'ระบบ' },
  { prefix: '/en/admin/system', title: 'System' },
  { prefix: '/th/admin', title: 'ศูนย์ Admin' },
  { prefix: '/en/admin', title: 'Admin Centre' },
];

function resolveTitle(pathname: string): string {
  const hit = TITLE_MAP.find((m) => pathname === m.prefix || pathname.startsWith(m.prefix + '/'));
  return hit?.title ?? 'ศูนย์ Admin';
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);
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
            aria-label="เมนู Admin"
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

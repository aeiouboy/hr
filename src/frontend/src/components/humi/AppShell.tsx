'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Network,
  CalendarClock,
  Wallet,
  Settings as SettingsIcon,
} from 'lucide-react';
import { Nav, type NavSection } from './Nav';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const match = (href: string) => pathname === href || pathname.startsWith(href + '/');

  const sections: NavSection[] = [
    {
      id: 'main',
      label: 'หลัก',
      items: [
        { id: 'home', label: 'ภาพรวม', href: '/th/home', icon: LayoutDashboard, active: match('/th/home') },
        { id: 'employees', label: 'พนักงาน', href: '/th/employees', icon: Users, active: match('/th/employees') },
        { id: 'org', label: 'แผนผังองค์กร', href: '/th/org-chart', icon: Network, active: match('/th/org-chart') },
      ],
    },
    {
      id: 'me',
      label: 'งานของฉัน',
      items: [
        { id: 'leave', label: 'การลา', href: '/th/leave', icon: CalendarClock, active: match('/th/leave') },
        { id: 'payslip', label: 'เงินเดือน', href: '/th/payslip', icon: Wallet, active: match('/th/payslip') },
      ],
    },
    {
      id: 'admin',
      label: 'ระบบ',
      items: [
        { id: 'settings', label: 'ตั้งค่า', href: '/th/settings', icon: SettingsIcon, active: match('/th/settings') },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="sticky top-0 h-screen w-64 shrink-0">
        <Nav
          sections={sections}
          ariaLabel="เมนูหลัก"
          brand={
            <div className="flex items-center gap-2 px-2 py-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-surface font-display text-lg font-bold">
                H
              </span>
              <span className="font-display text-lg font-semibold text-ink">Humi HR</span>
            </div>
          }
        />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

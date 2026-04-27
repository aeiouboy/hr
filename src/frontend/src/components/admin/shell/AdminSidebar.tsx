'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  BarChart3,
  Sliders,
  UserCog,
  Settings,
  Network,
  BriefcaseBusiness,
  MapPin,
  ArrowLeft,
  LogOut,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdminSidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
  className?: string;
}

type NavItem = { id: string; label: string; href: string; icon: LucideIcon };
type NavSection = { group: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    group: 'ภาพรวม',
    items: [
      { id: 'admin-home', label: 'ศูนย์ Admin', href: '/th/admin', icon: LayoutDashboard },
    ],
  },
  {
    group: 'การจ้างงาน',
    items: [
      { id: 'hire', label: 'รับพนักงานใหม่', href: '/th/admin/hire', icon: UserPlus },
      { id: 'employees', label: 'พนักงาน', href: '/th/admin/employees', icon: Users },
    ],
  },
  {
    group: 'โครงสร้างองค์กร',
    items: [
      { id: 'organization', label: 'หน่วยงาน', href: '/th/admin/organization', icon: Network },
      { id: 'jobs', label: 'งาน/Job', href: '/th/admin/jobs', icon: BriefcaseBusiness },
      { id: 'positions', label: 'ตำแหน่ง', href: '/th/admin/positions', icon: MapPin },
    ],
  },
  {
    group: 'บริหารระบบ',
    items: [
      { id: 'reports', label: 'รายงาน', href: '/th/admin/reports', icon: BarChart3 },
      { id: 'self-service', label: 'Self-Service', href: '/th/admin/self-service', icon: Sliders },
      { id: 'users', label: 'ผู้ใช้และสิทธิ์', href: '/th/admin/users', icon: UserCog },
      { id: 'system', label: 'ระบบ', href: '/th/admin/system', icon: Settings },
    ],
  },
];

function stripLocale(path: string): string {
  return path.replace(/^\/(th|en)/, '') || '/';
}

export function AdminSidebar({ onNavigate, onClose, className }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const barePath = stripLocale(pathname);
  const isActive = (href: string) => {
    const bareHref = stripLocale(href);
    if (bareHref === '/admin') return barePath === '/admin';
    return barePath === bareHref || barePath.startsWith(bareHref + '/');
  };

  return (
    <aside className={cn('humi-sidebar', className)} aria-label="เมนู Admin">
      <div className="humi-brand">
        <div className="humi-wordmark">
          <Image
            src="/humi-logo-final-2.png"
            alt="Humi"
            width={48}
            height={52}
            priority
            style={{ height: 52, width: 'auto', objectFit: 'contain' }}
          />
        </div>
        {onClose && (
          <button
            type="button"
            className="humi-icon-btn humi-drawer-close"
            aria-label="ปิดเมนู"
            onClick={onClose}
            style={{ marginLeft: 'auto' }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      <nav className="humi-nav" aria-label="เมนู Admin">
        {NAV.map((section) => (
          <div key={section.group} className="humi-nav-section">
            <div className="humi-nav-label">{section.group}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn('humi-nav-item', active && 'active')}
                  aria-current={active ? 'page' : undefined}
                  onClick={onNavigate}
                >
                  <span className="humi-nav-icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="humi-nav-text">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}

        <div className="humi-nav-section" style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href="/th/home"
            className="humi-nav-item"
            onClick={onNavigate}
          >
            <span className="humi-nav-icon" aria-hidden="true">
              <ArrowLeft size={16} />
            </span>
            <span className="humi-nav-text">กลับสู่พนักงาน</span>
          </Link>
          <Link
            href="/th/login"
            className="humi-nav-item"
            onClick={onNavigate}
          >
            <span className="humi-nav-icon" aria-hidden="true">
              <LogOut size={16} />
            </span>
            <span className="humi-nav-text">ออกจากระบบ</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}

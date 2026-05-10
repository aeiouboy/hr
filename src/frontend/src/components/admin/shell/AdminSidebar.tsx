'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AdminSidebarProps {
  onNavigate?: () => void;
  onClose?: () => void;
  className?: string;
}

type NavItem = { id: string; label: string; href: string; icon: LucideIcon };
type NavSection = { group: string; groupKey: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    group: 'ภาพรวม',
    groupKey: 'overview',
    items: [
      { id: 'admin-home', label: 'ศูนย์ Admin', href: '/th/admin', icon: LayoutDashboard },
    ],
  },
  {
    group: 'การจ้างงาน',
    groupKey: 'hiring',
    items: [
      { id: 'hire', label: 'รับพนักงานใหม่', href: '/th/admin/hire', icon: UserPlus },
      { id: 'employees', label: 'พนักงาน', href: '/th/admin/employees', icon: Users },
    ],
  },
  {
    group: 'โครงสร้างองค์กร',
    groupKey: 'orgStructure',
    items: [
      { id: 'organization', label: 'หน่วยงาน', href: '/th/admin/organization', icon: Network },
      { id: 'jobs', label: 'งาน/Job', href: '/th/admin/jobs', icon: BriefcaseBusiness },
      { id: 'positions', label: 'ตำแหน่ง', href: '/th/admin/positions', icon: MapPin },
    ],
  },
  {
    group: 'สวัสดิการ',
    groupKey: 'benefits',
    items: [
      { id: 'benefits-plans', label: 'แผนสวัสดิการ', href: '/th/admin/benefits/plans', icon: BriefcaseBusiness },
      { id: 'benefits-rules', label: 'กฎสวัสดิการ', href: '/th/admin/benefits/rules', icon: BookOpen },
    ],
  },
  {
    group: 'บริหารระบบ',
    groupKey: 'system',
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

function localizeHref(href: string, locale: string): string {
  const barePath = stripLocale(href);
  return `/${locale}${barePath}`;
}

export function AdminSidebar({ onNavigate, onClose, className }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('shell');
  const barePath = stripLocale(pathname);
  const isActive = (href: string) => {
    const bareHref = stripLocale(href);
    if (bareHref === '/admin') return barePath === '/admin';
    return barePath === bareHref || barePath.startsWith(bareHref + '/');
  };

  return (
    <aside className={cn('humi-sidebar', className)} aria-label={t('a11y.adminMenu')}>
      <div className="humi-brand">
        <div className="humi-wordmark">
          <Image
            src="/humi-logo-final-2.png"
            alt="Humi"
            width={72}
            height={78}
            priority
            style={{ height: 78, width: 'auto', objectFit: 'contain' }}
          />
        </div>
        {onClose && (
          <button
            type="button"
            className="humi-icon-btn humi-drawer-close"
            aria-label={t('a11y.closeMenu')}
            onClick={onClose}
            style={{ marginLeft: 'auto' }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      <nav className="humi-nav" aria-label={t('a11y.adminMenu')}>
        {NAV.map((section) => (
          <div key={section.groupKey} className="humi-nav-section">
            <div className="humi-nav-label">{t(`groups.${section.groupKey}`)}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const itemHref = localizeHref(item.href, locale);
              const itemLabel = t(`items.${item.id}`);
              return (
                <Link
                  key={item.id}
                  href={itemHref}
                  className={cn('humi-nav-item', active && 'active')}
                  aria-current={active ? 'page' : undefined}
                  onClick={onNavigate}
                >
                  <span className="humi-nav-icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="humi-nav-text">{itemLabel}</span>
                </Link>
              );
            })}
          </div>
        ))}

        <div className="humi-nav-section" style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link
            href={`/${locale}/home`}
            className="humi-nav-item"
            onClick={onNavigate}
          >
            <span className="humi-nav-icon" aria-hidden="true">
              <ArrowLeft size={16} />
            </span>
            <span className="humi-nav-text">{t('actions.backToEmployee')}</span>
          </Link>
          <Link
            href={`/${locale}/login`}
            className="humi-nav-item"
            onClick={onNavigate}
          >
            <span className="humi-nav-icon" aria-hidden="true">
              <LogOut size={16} />
            </span>
            <span className="humi-nav-text">{t('actions.logout')}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}

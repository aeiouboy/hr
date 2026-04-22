'use client';

// ════════════════════════════════════════════════════════════
// Humi Sidebar — ported 1:1 from
// docs/design-ref/shelfly-bundle/project/shell.jsx
// (NAV array + <Sidebar/> component).
//
// Changes vs reference:
// - <div onClick> → <Link> (a11y + real routing)
// - lucide-react icons instead of window.I glyphs (1:1 concept)
// - Thai labels kept verbatim (Rule: strict source-grounding)
// - User footer adapted from retail → HR (per task spec A1)
//
// PO direction (#3): Humi sidebar stays clean to 10 reference items.
// Legacy routes (payroll, performance, permissions, onboarding,
// workflows, government-reports, hrbp-reports, idp, locations, manager-
// dashboard, overtime, quick-approve, recruitment, resignation,
// screening, spd-management, succession, talent-management, training-
// records, hospital-referral, leave, time, and others) remain URL-
// accessible via /th/<route> but are NOT surfaced in this sidebar.
// Reason: preserves Humi information architecture per design-ref bundle.
// If expansion needed: add { id: 'legacy', label: 'เครื่องมือเพิ่มเติม' }
// under 'บริษัท' group pointing to /legacy hub page (separate sprint).
// ════════════════════════════════════════════════════════════

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  User,
  Calendar,
  Heart,
  FileText,
  Target,
  BookOpen,
  Network,
  Megaphone,
  Plug,
  Activity,
  TrendingUp,
  Users2,
  Search,
  UserPlus,
  BarChart3,
  Clock,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLocaleFromPath, swapLocale, type SupportedLocale } from '@/lib/humi-locale';

export interface SidebarProps {
  /** Called when any nav item or locale pill is clicked — used by AppShell
   *  to close the mobile drawer after navigation. */
  onNavigate?: () => void;
  /** Extra className merged onto <aside> — e.g. "humi-sidebar--drawer". */
  className?: string;
}

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  external?: boolean;
};

type NavSection = {
  group: string;
  items: NavItem[];
};

const NAV: NavSection[] = [
  {
    group: 'พื้นที่ทำงานของฉัน',
    items: [
      { id: 'home', label: 'หน้าหลัก', href: '/th/home', icon: Home },
      { id: 'profile', label: 'โปรไฟล์ของฉัน', href: '/th/profile/me', icon: User },
      { id: 'timeoff', label: 'ลางาน', href: '/th/timeoff', icon: Calendar, badge: '2' },
      { id: 'benefits', label: 'เงินเดือนและสวัสดิการ', href: '/th/benefits-hub', icon: Heart, badge: '1' },
      { id: 'requests', label: 'คำร้องและแบบฟอร์ม', href: '/th/requests', icon: FileText, badge: '1' },
      { id: 'time-attendance', label: 'เวลา & การเข้างาน', href: 'https://cnext-time.centralgroup.com', icon: Clock, external: true },
    ],
  },
  {
    group: 'บุคลากร',
    items: [
      { id: 'goals', label: 'เป้าหมายและผลงาน', href: '/th/goals', icon: Target },
      { id: 'learning', label: 'การเรียนรู้', href: '/th/learning-directory', icon: BookOpen },
      { id: 'directory', label: 'ผังองค์กร', href: '/th/org-chart', icon: Network },
      { id: 'performance-form', label: 'ประเมินผลงาน', href: '/th/performance-form', icon: Activity },
      { id: 'development', label: 'การพัฒนา', href: '/th/development', icon: TrendingUp },
      { id: 'succession', label: 'สายการสืบทอด', href: '/th/succession', icon: Users2 },
    ],
  },
  {
    group: 'บริษัท',
    items: [
      { id: 'announce', label: 'ประกาศ', href: '/th/announcements', icon: Megaphone },
      { id: 'integrations', label: 'จัดการระบบ', href: '/th/integrations', icon: Plug },
      { id: 'careers', label: 'ตำแหน่งว่างภายใน', href: '/th/careers', icon: Search },
      { id: 'recruiting', label: 'สรรหา', href: '/th/recruiting', icon: UserPlus },
      { id: 'reports', label: 'รายงาน', href: '/th/reports', icon: BarChart3 },
    ],
  },
];

/** Humi wordmark brand mark — gumdrop/person shape from reference ShelflyMark. */
function HumiMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 28 32"
      aria-hidden="true"
      style={{ color: 'var(--color-accent)' }}
    >
      <circle cx="14" cy="7" r="6" fill="currentColor" />
      <path
        d="M5 30c0-6 4-11 9-11s9 5 9 11c0 1-1 2-2 2H7c-1 0-2-1-2-2z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Strip locale prefix (/th/ or /en/) to get bare path e.g. /home */
function stripLocale(path: string): string {
  return path.replace(/^\/(th|en)/, '') || '/';
}

export function Sidebar({ onNavigate, className }: SidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  // Compare without locale prefix so /en/home matches href="/th/home"
  const barePath = stripLocale(pathname);
  const isActive = (href: string) => {
    const bareHref = stripLocale(href);
    return barePath === bareHref || barePath.startsWith(bareHref + '/');
  };
  const currentLocale = getLocaleFromPath(pathname);
  const handleLocaleSwitch = (locale: SupportedLocale) => {
    if (locale === currentLocale) return;
    router.push(swapLocale(pathname, locale));
  };

  return (
    <aside className={cn('humi-sidebar', className)} aria-label="เมนูหลัก">
      <div className="humi-brand">
        <div className="humi-wordmark">
          Hum
          <HumiMark size={20} />
        </div>
      </div>

      <nav className="humi-nav" aria-label="เมนูหลัก">
        {NAV.map((section) => (
          <div key={section.group} className="humi-nav-section">
            <div className="humi-nav-label">{section.group}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              if (item.external) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="humi-nav-item"
                    onClick={onNavigate}
                  >
                    <span className="humi-nav-icon" aria-hidden="true">
                      <Icon size={16} />
                    </span>
                    <span className="humi-nav-text">{item.label}</span>
                    <ExternalLink size={12} className="ml-auto text-ink-muted" aria-hidden="true" />
                  </a>
                );
              }
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
                  {item.badge && (
                    <span
                      className="humi-pill"
                      aria-label={`${item.badge} รายการใหม่`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="humi-sidebar-foot">
        <div className="humi-avatar coral" aria-hidden="true">
          จท
        </div>
        <div className="humi-user-meta">
          <div className="humi-user-name">จงรักษ์ ทานากะ</div>
          <div className="humi-user-role">ผู้จัดการฝ่ายบุคคล · สำนักงานใหญ่</div>
        </div>
      </div>

      {/* Locale switcher TH | EN pills */}
      <div
        className="flex items-center gap-1.5 px-4 pb-4"
        role="group"
        aria-label="เลือกภาษา"
      >
        {(['th', 'en'] as SupportedLocale[]).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => { handleLocaleSwitch(loc); onNavigate?.(); }}
            aria-pressed={currentLocale === loc}
            className={cn(
              'flex-1 rounded-md border py-1 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]',
              currentLocale === loc
                ? 'border-[color:var(--color-accent)] bg-accent-soft text-[color:var(--color-accent)]'
                : 'border-hairline bg-surface text-ink-muted hover:border-[color:var(--color-accent)] hover:text-ink-soft',
            )}
          >
            {loc === 'th' ? 'ไทย' : 'EN'}
          </button>
        ))}
      </div>
    </aside>
  );
}

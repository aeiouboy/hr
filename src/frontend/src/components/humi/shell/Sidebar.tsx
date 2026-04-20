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
// ════════════════════════════════════════════════════════════

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
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
    ],
  },
  {
    group: 'บุคลากร',
    items: [
      { id: 'goals', label: 'เป้าหมายและผลงาน', href: '/th/goals', icon: Target },
      { id: 'learning', label: 'การเรียนรู้', href: '/th/learning-directory', icon: BookOpen },
      { id: 'directory', label: 'ผังองค์กร', href: '/th/org-chart', icon: Network },
    ],
  },
  {
    group: 'บริษัท',
    items: [
      { id: 'announce', label: 'ประกาศ', href: '/th/announcements', icon: Megaphone },
      { id: 'integrations', label: 'จัดการระบบ', href: '/th/integrations', icon: Plug },
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

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="humi-sidebar" aria-label="เมนูหลัก">
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
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn('humi-nav-item', active && 'active')}
                  aria-current={active ? 'page' : undefined}
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
    </aside>
  );
}

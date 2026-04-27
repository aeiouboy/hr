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

import Image from 'next/image';
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
  Activity,
  TrendingUp,
  Users2,
  Search,
  UserPlus,
  BarChart3,
  Clock,
  ClipboardList,
  Inbox,
  Settings,
  ExternalLink,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import type { Role } from '@/lib/rbac';
// Locale helpers — moved to Topbar with locale switcher (2026-04-23)

export interface SidebarProps {
  /** Called when any nav item or locale pill is clicked — used by AppShell
   *  to close the mobile drawer after navigation. */
  onNavigate?: () => void;
  /** Called when the explicit close (X) button is clicked. Renders the close
   *  button only when this prop is provided — typically only in drawer mode. */
  onClose?: () => void;
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
  /** If set, item only renders when the current user has at least one of these roles. */
  roles?: Role[];
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
      { id: 'benefits', label: 'เงินเดือนและสวัสดิการ', href: '/th/employees/me/benefits', icon: Heart, badge: '1' },
      { id: 'requests', label: 'คำร้องและแบบฟอร์ม', href: '/th/requests', icon: FileText, badge: '1' },
      { id: 'my-workflows', label: 'คำขอของฉัน', href: '/th/ess/workflows', icon: ClipboardList },
      { id: 'time-attendance', label: 'เวลา & การเข้างาน', href: 'https://cnext-time.centralgroup.com', icon: Clock, external: true },
    ],
  },
  {
    group: 'กล่องอนุมัติ',
    items: [
      { id: 'quick-approve', label: 'คำขอรออนุมัติ', href: '/th/quick-approve', icon: ClipboardList, roles: ['manager', 'hr_admin', 'hr_manager'] },
      { id: 'spd-inbox', label: 'กล่องอนุมัติ SPD', href: '/th/spd/inbox', icon: Inbox, roles: ['spd', 'hr_admin', 'hr_manager'] },
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
      { id: 'admin', label: 'ศูนย์ Admin', href: '/th/admin', icon: Settings },
    ],
  },
];

/** Strip locale prefix (/th/ or /en/) to get bare path e.g. /home */
function stripLocale(path: string): string {
  return path.replace(/^\/(th|en)/, '') || '/';
}

export function Sidebar({ onNavigate, onClose, className }: SidebarProps = {}) {
  const pathname = usePathname();
  const userRoles = useAuthStore((s) => s.roles);
  // Compare without locale prefix so /en/home matches href="/th/home"
  const barePath = stripLocale(pathname);
  const currentLocale = pathname.match(/^\/(th|en)/)?.[1] ?? 'th';
  const isActive = (href: string) => {
    const bareHref = stripLocale(href);
    return barePath === bareHref || barePath.startsWith(bareHref + '/');
  };
  // Role-gated nav — items/sections with `roles` render only when the current
  // user owns at least one matching role.
  const hasRoleFor = (item: NavItem) =>
    !item.roles || item.roles.some((r) => userRoles.includes(r));
  const visibleSections = NAV
    .map((section) => ({ ...section, items: section.items.filter(hasRoleFor) }))
    .filter((section) => section.items.length > 0);
  return (
    <aside className={cn('humi-sidebar', className)} aria-label="เมนูหลัก">
      <div className="humi-brand">
        <div className="humi-wordmark">
          {/* Sidebar bg = navy ink (`--color-ink`). The base humi-logo.png has
              dark navy "Hum" text → invisible on navy bg. Use the pure-white
              variant for the dark sidebar. Generated via PIL pixel swap from
              the same source PNG so brand fidelity stays intact (only the
              dark luminance band gets remapped to #FFFFFF — teal person
              silhouette untouched). */}
          <Image
            src="/humi-logo-final-2.png"
            alt="Humi"
            width={72}
            height={78}
            priority
            style={{ height: 78, width: 'auto', objectFit: 'contain' }}
          />
        </div>
        {/* Explicit close affordance — only rendered in drawer mode (when
            AppShell passes onClose). Without this the user has no visible
            way to close the drawer once it covers the topbar hamburger. */}
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

      <nav className="humi-nav" aria-label="เมนูหลัก">
        {visibleSections.map((section) => (
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

      <Link
        href={`/${currentLocale}/login`}
        className="humi-sidebar-foot"
        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
        aria-label="ออกจากระบบและกลับไปหน้าเข้าสู่ระบบ"
      >
        <div className="humi-avatar coral" aria-hidden="true">
          จท
        </div>
        <div className="humi-user-meta">
          <div className="humi-user-name">จงรักษ์ ทานากะ</div>
          <div className="humi-user-role">กดเพื่อออกจากระบบ</div>
        </div>
      </Link>

      {/* Locale switcher ย้ายไป Topbar แล้ว — 2026-04-23 (แก้ bug ยื่นนอก sidebar) */}
    </aside>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Sidebar Coverage Annotations (Track C1, autopilot 2026-04-26)
// Routes that intentionally bypass the sidebar — entry point lives elsewhere
// or feature is admin-tier scaffold not yet wired. Each line follows
// `// SIDEBAR_LEGACY: <route> <reason ≥ 20 chars>` so the design-gate parser
// can recognise the explicit rationale (see core/gate/checks/sidebar-coverage.ts).
//
// Auth (1)
// SIDEBAR_LEGACY: /login pre-auth gate — never shown to authenticated users in chrome
//
// Profile / ESS canonical alt-paths (4) — superseded by /profile/me sidebar entry
// SIDEBAR_LEGACY: /employees/me alt-path superseded by canonical /profile/me sidebar entry
// SIDEBAR_LEGACY: /employees/me/payslip deep-link from /profile/me Compensation tab
// SIDEBAR_LEGACY: /ess/profile/edit reachable from /profile/me Edit button (BRD #166)
// SIDEBAR_LEGACY: /me/documents reachable from /profile/me Documents tab (BRD #173)
//
// Workflow + leave family (4) — reachable from "ลางาน" + "คำขอของฉัน" sidebar entries
// SIDEBAR_LEGACY: /overtime reachable from /timeoff OT request flow (sub-feature of timeoff)
// SIDEBAR_LEGACY: /resignation reachable from /profile/me Resignation section (BRD #172)
// SIDEBAR_LEGACY: /workflows alt-path superseded by /ess/workflows in sidebar config
// SIDEBAR_LEGACY: /workflows/probation manager-tier deep-link from probation alert email
//
// Time / attendance (1) — sidebar uses external cnext-time URL, /time is internal scaffold
// SIDEBAR_LEGACY: /time internal time-page scaffold — sidebar uses external cnext-time link
//
// Payroll cluster (6) — admin-tier scaffold pending P-B chain decision (#62 blocked)
// SIDEBAR_LEGACY: /payroll admin-tier scaffold pending P-B Infrastructure decision (#62)
// SIDEBAR_LEGACY: /payroll/processing admin-tier scaffold pending P-B chain (#62 blocked)
// SIDEBAR_LEGACY: /payroll/reports admin-tier scaffold pending P-B chain (#62 blocked)
// SIDEBAR_LEGACY: /payroll/setup admin-tier scaffold pending P-B chain (#62 blocked)
// SIDEBAR_LEGACY: /payslip reachable from /profile/me Compensation tab payslip link
//
// Reports cluster (3) — reports tile + role-specific landing pages
// SIDEBAR_LEGACY: /training-records surfaced via /learning-directory deep-link
// SIDEBAR_LEGACY: /spd-management role-gated route from SPD persona inbox flow
// SIDEBAR_LEGACY: /hospital-referral surfaced via /benefits-hub action tile (BRD #20 dep)
//
// Performance / Learning alternates (4)
// SIDEBAR_LEGACY: /performance alt-path superseded by /performance-form sidebar entry
// SIDEBAR_LEGACY: /learning alt-path superseded by /learning-directory sidebar entry
// SIDEBAR_LEGACY: /talent-management admin-tier scaffold pending Sprint 2 succession wire
// SIDEBAR_LEGACY: /idp individual-development-plan reached from performance-form action
//
// Admin-tier scaffolds (5)
// SIDEBAR_LEGACY: /locations admin-tier scaffold from /admin landing — geographic master data
// SIDEBAR_LEGACY: /permissions admin-tier scaffold from /admin landing — RBAC matrix editor
// SIDEBAR_LEGACY: /screening admin-tier scaffold from /recruiting workflow — pre-hire checks
// SIDEBAR_LEGACY: /benefits admin-tier scaffold (Benefit module deferred per #46 audit)
// SIDEBAR_LEGACY: /benefits-hub ESS landing page reached via /profile/me Compensation tab
// ════════════════════════════════════════════════════════════════════════════

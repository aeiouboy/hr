import Link from 'next/link';
import {
  CalendarPlus,
  FileText,
  FilePlus,
  User,
  Wallet,
  Network,
  BarChart3,
  Inbox,
  Clock,
  Bell,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { benefitReimbursementRoute } from '@/lib/benefit-routes';
import { SIZE_SPAN, type QuickActionSize } from '@/lib/admin/types/adminSelfService';

// ════════════════════════════════════════════════════════════
// QuickActionsTile — ESS home tile, BRD #171
// Full-width single-column card with 12 baseline actions.
// props.actions overrides baseline for BRD #182 admin config.
// C10: bilingual (labelTh + labelEn). C7: reuse humi-card/humi-eyebrow — no new CSS.
// Tone tokens: teal | indigo | amber | coral
// ════════════════════════════════════════════════════════════

export type TileTone = 'teal' | 'indigo' | 'amber' | 'coral';

// RoleName CapCase — matches adminSelfService matrices.
export type RoleName = 'Employee' | 'Manager' | 'HRBP' | 'SPD' | 'Admin';

export interface QuickAction {
  icon: React.ReactNode;
  labelTh: string;
  labelEn: string;
  href: string;
  show?: RoleName[];
  tone?: TileTone;
  /** STA-246 — tile span on the fixed 4-col grid. Absent → legacy auto-fill layout. */
  size?: QuickActionSize;
}

export interface QuickActionsTileProps {
  actions?: QuickAction[];
  /** Section eyebrow above the grid. Defaults to "เมนูลัด" (ESS). */
  eyebrow?: string;
  /** Active locale — used to pick labelEn vs labelTh display. Defaults to 'th'. */
  locale?: string;
}

// Tone → Tailwind className pairs for badge background + text.
// amber uses bg-warning-soft/text-warning (NOT bg-warning-tint — dead class).
// indigo uses CSS var inline since Tailwind does not have built-in accent-alt-soft token.
const TONE_BG: Record<TileTone, string> = {
  teal:   'bg-accent-soft',
  indigo: 'bg-[var(--color-accent-alt-soft)]',
  amber:  'bg-warning-soft',
  coral:  'bg-warning-soft',
};
const TONE_TEXT: Record<TileTone, string> = {
  teal:   'text-accent',
  indigo: 'text-[var(--color-accent-alt)]',
  amber:  'text-warning',
  coral:  'text-warning',
};

function makeIcon(Icon: LucideIcon) {
  return <Icon size={22} aria-hidden />;
}

// All 12 ESS baseline actions.
// show?: undefined means visible to all roles.
export const DEFAULT_ESS_ACTIONS: QuickAction[] = [
  {
    icon: makeIcon(CalendarPlus),
    labelTh: 'ขอลาหยุด',
    labelEn: 'Time Off',
    href: '/th/timeoff',
    tone: 'teal',
  },
  {
    icon: makeIcon(FileText),
    labelTh: 'สลิปเงินเดือน',
    labelEn: 'Payslip',
    href: '/th/payslip',
    tone: 'teal',
  },
  {
    icon: makeIcon(User),
    labelTh: 'ข้อมูลส่วนตัว',
    labelEn: 'My Profile',
    href: '/th/profile/me',
    tone: 'indigo',
  },
  {
    icon: makeIcon(Wallet),
    labelTh: 'เบิกสวัสดิการ',
    labelEn: 'Benefits Claim',
    href: benefitReimbursementRoute('th'),
    tone: 'teal',
  },
  {
    icon: makeIcon(FilePlus),
    labelTh: 'ขอเอกสาร',
    labelEn: 'Doc Request',
    href: '/th/me/documents/request',
    tone: 'indigo',
  },
  {
    icon: makeIcon(Clock),
    labelTh: 'บันทึกเวลา',
    labelEn: 'Time Clock',
    href: '/th/time-clock',
    tone: 'amber',
  },
  {
    icon: makeIcon(Inbox),
    labelTh: 'คำขอของฉัน',
    labelEn: 'My Requests',
    href: '/th/requests',
    tone: 'teal',
  },
  {
    icon: makeIcon(Bell),
    labelTh: 'ประกาศ',
    labelEn: 'Announcements',
    href: '/th/announcements',
    tone: 'amber',
  },
  {
    icon: makeIcon(Network),
    labelTh: 'แผนผังองค์กร',
    labelEn: 'Org Chart',
    href: '/th/org-chart',
    tone: 'indigo',
  },
  {
    icon: makeIcon(BarChart3),
    labelTh: 'ผลงานของฉัน',
    labelEn: 'Performance',
    href: '/th/performance',
    tone: 'coral',
    show: ['Manager', 'HRBP', 'SPD', 'Admin'],
  },
  {
    icon: makeIcon(GraduationCap),
    labelTh: 'การเรียนรู้',
    labelEn: 'Learning',
    href: '/th/learning',
    tone: 'coral',
  },
];

// Manager-tier Quick Actions — SF Employee Central pattern (Path C, autopilot
// 2026-04-26). Each tile launches a canonical page with `?scope=team` query
// param so the canonical surface filters to the manager's team. Replaces the
// 7-tab /manager-dashboard landing.
export const MANAGER_ACTIONS: QuickAction[] = [
  { icon: makeIcon(Network),   labelTh: 'แผนผังทีมฉัน',      labelEn: 'Team Org Chart', href: '/th/org-chart?scope=team',       tone: 'indigo' },
  { icon: makeIcon(BarChart3), labelTh: 'รายงานของทีมฉัน',   labelEn: 'Team Reports',   href: '/th/reports?scope=team',         tone: 'amber'  },
  { icon: makeIcon(Inbox),     labelTh: 'คำขอรออนุมัติ',     labelEn: 'Approvals',      href: '/th/quick-approve',              tone: 'coral'  },
];

export function QuickActionsTile({
  actions = DEFAULT_ESS_ACTIONS,
  eyebrow = 'เมนูลัด',
  locale = 'th',
}: QuickActionsTileProps) {
  const useTh = locale !== 'en';
  // STA-246 — when any action carries an explicit size, paint the admin-configurable
  // fixed 4-col grid (WxH spans). Size-less callers (e.g. MANAGER_ACTIONS) keep the
  // legacy responsive auto-fill layout untouched.
  const sized = actions.some((a) => !!a.size);
  const gridStyle: React.CSSProperties = sized
    ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gridAutoRows: 96,
        gridAutoFlow: 'row',
        gap: 12,
      }
    : { gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' };
  return (
    <div className="humi-card" role="region" aria-label={eyebrow}>
      <div className="humi-eyebrow" style={{ marginBottom: 14 }}>
        {eyebrow}
      </div>
      <div
        className={sized ? undefined : 'grid gap-3'}
        style={gridStyle}
      >
        {actions.map((action) => {
          const tone: TileTone = action.tone ?? 'teal';
          const bgClass   = TONE_BG[tone];
          const textClass = TONE_TEXT[tone];
          const label     = useTh ? action.labelTh : (action.labelEn ?? action.labelTh);
          const span      = sized ? SIZE_SPAN[action.size ?? '1x1'] : null;
          return (
            <Link
              key={`${action.labelTh}:${action.href}`}
              href={action.href}
              aria-label={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '16px 8px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-canvas-soft)',
                color: 'var(--color-ink)',
                textDecoration: 'none',
                transition: 'box-shadow var(--dur-base)',
                ...(span ? { gridColumn: `span ${span.cols}`, gridRow: `span ${span.rows}` } : null),
              }}
              className="humi-quick-action-item"
            >
              <span
                className={`${bgClass} ${textClass}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                }}
                aria-hidden
              >
                {action.icon}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: 'center',
                  lineHeight: 1.35,
                  color: 'var(--color-ink)',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

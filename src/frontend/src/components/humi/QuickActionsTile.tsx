import Link from 'next/link';
import { CalendarPlus, FileText, User, LogOut, type LucideIcon } from 'lucide-react';

// ════════════════════════════════════════════════════════════
// QuickActionsTile — ESS home tile, BRD #171
// Full-width single-column card with 4 baseline actions.
// props.actions overrides baseline for BRD #182 admin config.
// C10: Thai labels only. C7: reuse humi-card/humi-eyebrow — no new CSS.
// ════════════════════════════════════════════════════════════

export interface QuickAction {
  icon: React.ReactNode;
  labelTh: string;
  href: string;
}

export interface QuickActionsTileProps {
  actions?: QuickAction[];
}

function makeIcon(Icon: LucideIcon) {
  return <Icon size={22} aria-hidden />;
}

export const DEFAULT_ESS_ACTIONS: QuickAction[] = [
  { icon: makeIcon(CalendarPlus), labelTh: 'ขอลาหยุด',          href: '/timeoff'      },
  { icon: makeIcon(FileText),     labelTh: 'สลิปเงินเดือน',       href: '/payslip'      },
  { icon: makeIcon(User),         labelTh: 'ดูข้อมูลส่วนตัว',     href: '/profile/me'   },
  { icon: makeIcon(LogOut),       labelTh: 'ขอลาออก',            href: '/resignation'  },
];

export function QuickActionsTile({ actions = DEFAULT_ESS_ACTIONS }: QuickActionsTileProps) {
  return (
    <div className="humi-card" role="region" aria-label="เมนูลัด">
      <div className="humi-eyebrow" style={{ marginBottom: 14 }}>
        เมนูลัด
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            aria-label={action.labelTh}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '16px 8px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)',
              background: 'var(--color-canvas-soft)',
              color: 'var(--color-ink)',
              textDecoration: 'none',
              transition: 'box-shadow var(--dur-base)',
            }}
            className="humi-quick-action-item"
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--color-accent-soft)',
                color: 'var(--color-accent)',
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
              {action.labelTh}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

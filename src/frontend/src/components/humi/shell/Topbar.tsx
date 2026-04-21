'use client';

// ════════════════════════════════════════════════════════════
// Humi Topbar — ported 1:1 from
// docs/design-ref/shelfly-bundle/project/shell.jsx
// (<Topbar/> component).
//
// Changes vs reference:
// - <button> semantic on bell (was <button className="icon-btn">)
// - search pill wired to CommandPalette via onSearchClick prop (b5)
// - sun/moon theme toggle added beside bell (b2)
// - greeting eyebrow default preserved verbatim
// ════════════════════════════════════════════════════════════

import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';

export interface TopbarProps {
  /** h2 page title — typically derived from route */
  title: string;
  /** eyebrow above title — default: "สวัสดีตอนเช้าค่ะ คุณจงรักษ์" */
  subtitle?: string;
  /** optional extra action buttons rendered to the right of the bell */
  actions?: React.ReactNode;
  /** called when search pill is clicked (wired to CommandPalette in b5) */
  onSearchClick?: () => void;
}

export function Topbar({
  title,
  subtitle = 'สวัสดีตอนเช้าค่ะ คุณจงรักษ์',
  actions,
  onSearchClick,
}: TopbarProps) {
  const { theme, setTheme } = useUIStore();
  const isDark = theme === 'dark';

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="humi-topbar">
      <div>
        <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
          {subtitle}
        </div>
        <h2 style={{ fontSize: 24 }}>{title}</h2>
      </div>
      <div className="humi-spacer" />
      <div
        className="humi-search"
        role="search"
        aria-label="ค้นหา"
        onClick={onSearchClick}
        style={{ cursor: onSearchClick ? 'pointer' : undefined }}
      >
        <Search size={16} aria-hidden="true" />
        <span className="humi-search-placeholder">
          ค้นหาพนักงาน เอกสาร…
        </span>
        <kbd>⌘K</kbd>
      </div>
      <button
        type="button"
        className="humi-icon-btn"
        aria-label={isDark ? 'สลับโหมดสว่าง' : 'สลับโหมดมืด'}
        title={isDark ? 'สลับโหมดสว่าง' : 'สลับโหมดมืด'}
        onClick={handleThemeToggle}
      >
        {isDark ? (
          <Sun size={18} aria-hidden="true" />
        ) : (
          <Moon size={18} aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        className="humi-icon-btn"
        aria-label="การแจ้งเตือน"
        title="การแจ้งเตือน"
      >
        <Bell size={18} aria-hidden="true" />
        <span className="humi-dot-badge" aria-hidden="true" />
      </button>
      {actions}
    </div>
  );
}

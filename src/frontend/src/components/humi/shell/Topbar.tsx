'use client';

// ════════════════════════════════════════════════════════════
// Humi Topbar — ported 1:1 from
// docs/design-ref/shelfly-bundle/project/shell.jsx
// (<Topbar/> component).
//
// Changes vs reference:
// - <button> semantic on bell (was <button className="icon-btn">)
// - search is visual-only (kbd ⌘K is decorative, not functional)
// - greeting eyebrow default preserved verbatim
// ════════════════════════════════════════════════════════════

import { Bell, Search } from 'lucide-react';

export interface TopbarProps {
  /** h2 page title — typically derived from route */
  title: string;
  /** eyebrow above title — default: "สวัสดีตอนเช้าค่ะ คุณจงรักษ์" */
  subtitle?: string;
  /** optional extra action buttons rendered to the right of the bell */
  actions?: React.ReactNode;
}

export function Topbar({
  title,
  subtitle = 'สวัสดีตอนเช้าค่ะ คุณจงรักษ์',
  actions,
}: TopbarProps) {
  return (
    <div className="humi-topbar">
      <div>
        <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
          {subtitle}
        </div>
        <h2 style={{ fontSize: 24 }}>{title}</h2>
      </div>
      <div className="humi-spacer" />
      <div className="humi-search" role="search" aria-label="ค้นหา">
        <Search size={16} aria-hidden="true" />
        <span className="humi-search-placeholder">
          ค้นหาพนักงาน เอกสาร…
        </span>
        <kbd>⌘K</kbd>
      </div>
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

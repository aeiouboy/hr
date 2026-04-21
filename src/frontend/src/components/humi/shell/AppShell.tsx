'use client';

// ════════════════════════════════════════════════════════════
// Humi AppShell — replaces the invented 6-item AppShell with
// 1:1 port of docs/design-ref/shelfly-bundle/project/shell.jsx.
//
// Layout: aside (sticky sidebar) + main column (Topbar + page).
// Title/eyebrow is derived from current pathname via lookup.
// ════════════════════════════════════════════════════════════

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/** href prefix → page title shown in topbar h2 */
const TITLE_MAP: Array<{ prefix: string; title: string }> = [
  { prefix: '/th/home', title: 'หน้าหลัก' },
  { prefix: '/th/profile', title: 'โปรไฟล์ของฉัน' },
  { prefix: '/th/timeoff', title: 'ลางาน' },
  { prefix: '/th/benefits-hub', title: 'เงินเดือนและสวัสดิการ' },
  { prefix: '/th/requests', title: 'คำร้องและแบบฟอร์ม' },
  { prefix: '/th/goals', title: 'เป้าหมายและผลงาน' },
  { prefix: '/th/learning-directory', title: 'การเรียนรู้' },
  { prefix: '/th/org-chart', title: 'ผังองค์กร' },
  { prefix: '/th/announcements', title: 'ประกาศ' },
  { prefix: '/th/integrations', title: 'จัดการระบบ' },
];

function resolveTitle(pathname: string): string {
  const hit = TITLE_MAP.find(
    (m) => pathname === m.prefix || pathname.startsWith(m.prefix + '/'),
  );
  return hit?.title ?? 'Humi';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <div className="humi-app">
      <Sidebar />
      <div className="humi-main">
        <Topbar title={title} />
        <main className="humi-page-wrap">{children}</main>
      </div>
    </div>
  );
}

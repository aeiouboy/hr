// humi-command-registry.ts
// Static list of 11 navigable Humi routes for the ⌘K command palette.
// Excludes login (auth-managed). Source: NAV in Sidebar.tsx + route map.

import { BENEFITS_HUB_ROUTE } from '@/lib/benefit-routes';

export interface HumiCommand {
  id: string;
  label: string;
  route: string;
  /** Translation key under shell.items; defaults to id. */
  labelKey?: string;
  /** Locale-independent label used for search when the visible label is translated. */
  searchLabel?: string;
  /** Additional locale-independent search aliases. */
  keywords?: string[];
  /** Optional group label for display */
  group?: string;
  /** Translation key under shell.groups. */
  groupKey?: string;
}

export const HUMI_COMMANDS: HumiCommand[] = [
  { id: 'home', label: 'หน้าหลัก', route: '/home', group: 'พื้นที่ทำงานของฉัน', groupKey: 'myWorkspace' },
  {
    id: 'profile',
    label: 'โปรไฟล์ของฉัน',
    route: '/profile/me',
    searchLabel: 'My Profile',
    keywords: ['profile', 'my profile', 'โปรไฟล์'],
    group: 'พื้นที่ทำงานของฉัน',
    groupKey: 'myWorkspace',
  },
  { id: 'timeoff', label: 'ลางาน', route: '/timeoff', group: 'พื้นที่ทำงานของฉัน', groupKey: 'myWorkspace' },
  { id: 'benefits', label: 'สวัสดิการ', route: BENEFITS_HUB_ROUTE, group: 'พื้นที่ทำงานของฉัน', groupKey: 'myWorkspace' },
  { id: 'requests', label: 'คำร้องและแบบฟอร์ม', route: '/requests', group: 'พื้นที่ทำงานของฉัน', groupKey: 'myWorkspace' },
  { id: 'goals', label: 'เป้าหมายและผลงาน', route: '/goals', group: 'บุคลากร', groupKey: 'people' },
  { id: 'learning', label: 'การเรียนรู้', route: '/learning-directory', group: 'บุคลากร', groupKey: 'people' },
  { id: 'directory', label: 'ผังองค์กร', route: '/org-chart', group: 'บุคลากร', groupKey: 'people' },
  { id: 'announce', label: 'ประกาศ', route: '/announcements', group: 'บริษัท', groupKey: 'company' },
  { id: 'integrations', label: 'จัดการระบบ', route: '/integrations', group: 'บริษัท', groupKey: 'company' },
  {
    id: 'payslip',
    label: 'สลิปเงินเดือน',
    labelKey: 'payslip',
    route: '/profile/me?tab=employment#pay-statements',
    searchLabel: 'Payslips',
    keywords: ['payslip', 'payslips', 'pay slip', 'salary statement', 'salary statements', 'สลิป', 'เงินเดือน'],
    group: 'พื้นที่ทำงานของฉัน',
    groupKey: 'myWorkspace',
  },
];

/** Filter commands by query string (case-insensitive, bounded route search). */
export function filterCommands(query: string, commands: HumiCommand[] = HUMI_COMMANDS): HumiCommand[] {
  const q = query.trim().toLowerCase();
  if (!q) return commands;
  const allowRouteSearch = q.includes('/') || q.length >= 4;

  return commands.filter((command) => {
    const searchableLabels = [
      command.label,
      command.searchLabel,
      ...(command.keywords ?? []),
    ].filter((value): value is string => Boolean(value));

    return (
      searchableLabels.some((value) => value.toLowerCase().includes(q)) ||
      (allowRouteSearch && command.route.toLowerCase().includes(q))
    );
  });
}

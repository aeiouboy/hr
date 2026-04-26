// lib/demo-users.ts — single source of truth for 9 demo personas:
//   5 generic-role logins (admin/spd/hrbp/manager/employee)
//   4 SF-canonical persona names (Ken/Apinya/Worawee/Rungrote — T7 #91 follow-up)
//     mapped to RBAC-MATRIX-V2-2026-04-26 probe identities.
// Consumed by /login (form submit) and TopbarPersonaSwitcher (in-session
// role swap — admin@ acts as view-as super-user per option C from session).

import type { Role } from '@/lib/rbac';

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: Role[];
};

export const DEMO_USERS: Record<string, DemoUser> = {
  'admin@humi.test': {
    id: 'ADM001',
    name: 'ผู้ดูแลระบบ HR',
    email: 'admin@humi.test',
    password: 'admin2026',
    roles: ['hr_admin', 'hr_manager', 'spd', 'hrbp', 'manager', 'employee'],
  },
  'spd@humi.test': {
    id: 'SPD001',
    name: 'ดารณี ล. (SPD)',
    email: 'spd@humi.test',
    password: 'spd2026',
    roles: ['spd', 'employee'],
  },
  'hrbp@humi.test': {
    id: 'HRB001',
    name: 'วิทยา ส. (HRBP)',
    email: 'hrbp@humi.test',
    password: 'hrbp2026',
    roles: ['hrbp', 'employee'],
  },
  'manager@humi.test': {
    id: 'MGR001',
    name: 'พิชญ์ ม. (หัวหน้าทีม)',
    email: 'manager@humi.test',
    password: 'manager2026',
    roles: ['manager', 'employee'],
  },
  'employee@humi.test': {
    id: 'EMP001',
    name: 'สมชาย ใจดี',
    email: 'employee@humi.test',
    password: 'employee2026',
    roles: ['employee'],
  },

  // T7 — 4 SF-canonical personas from RBAC V2 probe (sf-rbac-probe-{name}-V2.json)
  'ken@humi.test': {
    id: 'KEN001',
    name: 'จงรักษ์ ทานากะ (HR Admin)',
    email: 'ken@humi.test',
    password: 'ken2026',
    roles: ['hr_admin', 'employee'],
  },
  'apinya@humi.test': {
    id: 'APN001',
    name: 'อภิญญา (HRBP — BU2)',
    email: 'apinya@humi.test',
    password: 'apinya2026',
    roles: ['hrbp', 'employee'],
  },
  'worawee@humi.test': {
    id: 'WRW001',
    name: 'วรวี (SPD)',
    email: 'worawee@humi.test',
    password: 'worawee2026',
    roles: ['spd', 'employee'],
  },
  'rungrote@humi.test': {
    id: 'RNG001',
    name: 'รุ่งโรจน์ (Manager — Finance)',
    email: 'rungrote@humi.test',
    password: 'rungrote2026',
    roles: ['manager', 'employee'],
  },
};

// Order used by the switcher UI — employee first (common target), then SF-canonical, admin last.
export const PERSONA_ORDER: Array<keyof typeof DEMO_USERS> = [
  'employee@humi.test',
  'manager@humi.test',
  'hrbp@humi.test',
  'spd@humi.test',
  'admin@humi.test',
  // T7 — SF-canonical (per RBAC V2 matrix)
  'rungrote@humi.test',
  'apinya@humi.test',
  'worawee@humi.test',
  'ken@humi.test',
];

export const PERSONA_BADGE: Record<string, { label: string; tone: string }> = {
  'admin@humi.test':    { label: 'Admin',    tone: 'humi-tag--ink' },
  'spd@humi.test':      { label: 'SPD',      tone: 'humi-tag--accent' },
  'hrbp@humi.test':     { label: 'HRBP',     tone: 'humi-tag--butter' },
  'manager@humi.test':  { label: 'Manager',  tone: 'humi-tag--sage' },
  'employee@humi.test': { label: 'Employee', tone: 'humi-tag' },
  // T7 — SF-canonical badges
  'ken@humi.test':      { label: 'Ken (HR Admin)',    tone: 'humi-tag--ink' },
  'apinya@humi.test':   { label: 'Apinya (HRBP)',     tone: 'humi-tag--butter' },
  'worawee@humi.test':  { label: 'Worawee (SPD)',     tone: 'humi-tag--accent' },
  'rungrote@humi.test': { label: 'Rungrote (Manager)', tone: 'humi-tag--sage' },
};

// Role-priority landing table — shared with login.
// First matching role wins, so a super-user (admin) lands on admin home.
//
// SF truth (see ess/profile/edit toast + edit/page.tsx:428 + DOC-F2B0E487):
//   - SPD = sole approver for the ESS personal-info queue → /spd/inbox
//   - HRBP + HR Admin edit personal info *directly* via /admin (Pattern 2,
//     no approval workflow) — their landing is /admin, not an inbox.
//   - Manager approves LEAVE, not personal info. No inbox for this journey.
const ROLE_LANDING: Array<[Role, string]> = [
  ['hr_admin', '/admin'],
  ['hr_manager', '/admin'],
  ['spd', '/spd/inbox'],
  ['hrbp', '/admin/employees'],  // HRBP uses admin direct-edit path
  ['manager', '/manager-dashboard'], // T7 — Manager lands on dashboard (was /home)
  ['employee', '/home'],
];

export function landingForRoles(roles: Role[], locale: string): string {
  for (const [role, path] of ROLE_LANDING) {
    if (roles.includes(role)) return `/${locale}${path}`;
  }
  return `/${locale}/home`;
}

/** Override the persona landing for a specific DEMO_USERS key — useful for
 *  the switcher where `admin` would normally land on /admin, but when we
 *  explicitly switch *to* admin we might prefer /admin/employees. Default
 *  falls back to landingForRoles. */
export function landingForDemoUser(email: string, locale: string): string {
  const user = DEMO_USERS[email];
  if (!user) return `/${locale}/home`;
  return landingForRoles(user.roles, locale);
}

// ════════════════════════════════════════════════════════════
// Shared 212-employee pool for /profile/me, /admin/employees,
// /manager-dashboard, /admin/change-requests.
//
// Composition: 12 existing (with SF parity overlay) + 88 synthetic
// + 100 REAL SF QAS employees (T5 Real Data Port). Synthetic kept for
// backwards compat with sprint #82-#85 fields tied to emp-001..emp-100;
// SF real adds 100 emp-sf-X with authentic Thai dept / position / hireDate.
//
// Extracted from /profile/me/page.tsx 2026-04-26 to enable scope-filter
// wire-up in /admin/employees + /manager-dashboard (Track A).
// ════════════════════════════════════════════════════════════

import { HUMI_EMPLOYEES, type HumiEmployee } from './humi-mock-data';
import { SF_PARITY_NEW_EMPLOYEES, withSfParity } from './humi-mock-data-sf-parity';
import { SF_REAL_EMPLOYEES } from './humi-mock-data-sf-real';

export const ALL_PORTED_EMPLOYEES: HumiEmployee[] = [
  ...HUMI_EMPLOYEES.map(withSfParity),
  ...SF_PARITY_NEW_EMPLOYEES,
  ...SF_REAL_EMPLOYEES,
];

// Persona → SF-parity employee mapping for view-as.
// Drives /profile/me, /manager-dashboard subordinate count, and
// /admin/employees scope filter via TopbarPersonaSwitcher.
export const EMP_BY_LOGIN: Record<string, string> = Object.freeze({
  'admin@humi.test':    'emp-005', // ผู้อำนวยการฝ่ายกลยุทธ์
  'spd@humi.test':      'emp-001', // ผู้จัดการฝ่ายทรัพยากรบุคคล
  'hrbp@humi.test':     'emp-007', // หัวหน้าทีมพัฒนาองค์กร
  'manager@humi.test':  'emp-002', // นักวิเคราะห์การเงินอาวุโส
  'employee@humi.test': 'emp-003', // วิศวกรซอฟต์แวร์อาวุโส
  // T7 — SF-canonical personas (per RBAC V2 matrix)
  'ken@humi.test':      'emp-005', // Ken — HR Admin (Director tier)
  'apinya@humi.test':   'emp-007', // Apinya — HRBP for BU
  'worawee@humi.test':  'emp-001', // Worawee — SPD final approver
  'rungrote@humi.test': 'emp-002', // Rungrote — Manager Finance
});

/** Find ported employee for the current login email. Falls back to null. */
export function employeeForLogin(email: string | null | undefined): HumiEmployee | null {
  if (!email) return null;
  const id = EMP_BY_LOGIN[email];
  if (!id) return null;
  return ALL_PORTED_EMPLOYEES.find((e) => e.id === id) ?? null;
}

/** Mask Thai national ID: keep first + last 4 digits, mask middle. */
export function maskNationalId(nid: string | undefined): string {
  if (!nid) return '—';
  const clean = nid.replace(/\D/g, '');
  if (clean.length !== 13) return nid;
  return `${clean[0]}-${clean.slice(1, 5).replace(/./g, 'X')}-${clean.slice(5, 9).replace(/./g, 'X')}-${clean.slice(9, 11)}-${clean[11]}${clean[12]}`;
}

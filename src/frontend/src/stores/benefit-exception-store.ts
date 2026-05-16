'use client';

/**
 * benefit-exception-store — STA-27 PR-A
 *
 * Zustand persisted store for HRBP-owned benefit exception records.
 * Exceptions are *terminal* artifacts (no send-back round-trip) — they are
 * admin-initiated overrides that the HRBP either approves or rejects. The
 * paired +/− borrow-forward shape lives here too (via `pairedRecordId`).
 *
 * Mock-only: all mutations resolve after a 300ms setTimeout. Audit entries
 * reuse `BenefitClaimAuditEntry` from `benefit-claims.ts` (the STA-27 widen
 * to include `actorRole: 'hrbp'` lives in that file).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BenefitClaimAuditEntry } from '@/stores/benefit-claims';

// ── Types ───────────────────────────────────────────────────────────────────

export type BenefitExceptionType =
  | 'foreigner_spouse'   // HR-EX-01 — dependent rule override for foreign spouse
  | 'cfr_skt_override'   // HR-EX-02 — CFR/SKT business-unit override
  | 'borrow_forward'     // HR-EX-03 — borrow next-year entitlement (paired +/− records)
  | 'manual_override';   // HR-EX-04..05 — generic manual override (amount/policy)

export type BenefitExceptionStatus = 'pending_hrbp' | 'approved' | 'rejected';

export interface BenefitExceptionRecord {
  id: string;
  /** Optional link back to a benefit claim (when the exception was raised against a specific claim). */
  claimId?: string;
  employeeId: string;
  employeeName: string;
  department: string;
  benefitCode: string;
  benefitName: string;
  exceptionType: BenefitExceptionType;
  /** Admin who raised the exception for HRBP review. */
  requestedBy: string;
  /** ISO timestamp. */
  requestedAt: string;
  reason: string;
  /** Optional amount delta — positive borrows entitlement forward, negative reflects the paired deduction. */
  amount?: number;
  /** Pairs a (+) borrow-forward record with its matching (−) deduction (or vice versa). */
  pairedRecordId?: string;
  status: BenefitExceptionStatus;
  audit: BenefitClaimAuditEntry[];
}

interface BenefitExceptionState {
  exceptions: BenefitExceptionRecord[];
  /** Mock-async: 300ms setTimeout, flips status → 'approved' and appends HRBP audit entry. */
  hrbpApproveException: (id: string, hrbpName: string, note?: string) => Promise<void>;
  /** Mock-async: 300ms setTimeout, flips status → 'rejected' and appends HRBP audit entry. */
  hrbpRejectException: (id: string, hrbpName: string, reason: string) => Promise<void>;
  /** Reset to initial seed — test/demo affordance. */
  clear: () => void;
}

// ── Seed records ────────────────────────────────────────────────────────────

const seedRecords: BenefitExceptionRecord[] = [
  {
    id: 'EXC-0001',
    claimId: 'BEN-CLM-0001',
    employeeId: 'EMP001',
    employeeName: 'จงรักษ์ ทานากะ',
    department: 'HR',
    benefitCode: 'BEN-DEP-MED',
    benefitName: 'ค่ารักษาผู้รับสิทธิ์ร่วม (คู่สมรสต่างชาติ)',
    exceptionType: 'foreigner_spouse',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-14T09:30:00.000Z',
    reason: 'คู่สมรสเป็นชาวต่างชาติ ไม่มีเลขบัตรประชาชนไทย ขออนุมัติเป็นกรณีพิเศษ',
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-14T09:30:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ยื่นขอข้อยกเว้นสำหรับคู่สมรสต่างชาติ',
      },
    ],
  },
  {
    id: 'EXC-0002',
    claimId: 'BEN-CLM-0002',
    employeeId: 'EMP002',
    employeeName: 'สมใจ วงษ์ดี',
    department: 'HR',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล (CFR override)',
    exceptionType: 'cfr_skt_override',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-13T14:20:00.000Z',
    reason: 'พนักงานสังกัด CFR แต่ใช้สิทธิ์ของ SKT — ขออนุมัติย้อนหลัง',
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-13T14:20:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ขอ override CFR → SKT',
      },
    ],
  },
  {
    id: 'EXC-0003',
    employeeId: 'EMP003',
    employeeName: 'ประเสริฐ มีสุข',
    department: 'Finance',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล (ยืมสิทธิ์ปีถัดไป)',
    exceptionType: 'borrow_forward',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-12T11:15:00.000Z',
    reason: 'สิทธิ์ปี 2026 หมด ขอยืมสิทธิ์ปี 2027 จำนวน 8,000 บาท',
    amount: 8000,
    pairedRecordId: 'EXC-0004',
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-12T11:15:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ยืมสิทธิ์ปีถัดไป (+8,000)',
      },
    ],
  },
  {
    id: 'EXC-0004',
    employeeId: 'EMP003',
    employeeName: 'ประเสริฐ มีสุข',
    department: 'Finance',
    benefitCode: 'BEN-MED-OPD',
    benefitName: 'ค่ารักษาพยาบาล (หักสิทธิ์ปีถัดไป)',
    exceptionType: 'borrow_forward',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-12T11:15:00.000Z',
    reason: 'รายการคู่หักของ EXC-0003 สำหรับปี 2027',
    amount: -8000,
    pairedRecordId: 'EXC-0003',
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-12T11:15:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'หักสิทธิ์ปีถัดไป (-8,000)',
      },
    ],
  },
  {
    id: 'EXC-0005',
    employeeId: 'EMP004',
    employeeName: 'วิมลรัตน์ แก้วใส',
    department: 'IT',
    benefitCode: 'BEN-FUEL',
    benefitName: 'ค่าน้ำมัน (ปรับเพดานพิเศษ)',
    exceptionType: 'manual_override',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-11T16:40:00.000Z',
    reason: 'เดินทางออกพื้นที่ต่อเนื่อง 2 สัปดาห์ ขออนุมัติเกินเพดาน 3,000 บาท',
    amount: 3000,
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-11T16:40:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ขอเพิ่มเพดานน้ำมัน',
      },
    ],
  },
  {
    id: 'EXC-0006',
    claimId: 'BEN-CLM-0004',
    employeeId: 'EMP004',
    employeeName: 'วิมลรัตน์ แก้วใส',
    department: 'IT',
    benefitCode: 'BEN-MOBILE',
    benefitName: 'ค่าโทรศัพท์ (override)',
    exceptionType: 'manual_override',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-09T10:00:00.000Z',
    reason: 'เปลี่ยนแพ็กเกจกลางเดือน — ขอปรับยอดเบิก',
    amount: 450,
    status: 'approved',
    audit: [
      {
        at: '2026-05-09T10:00:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ยื่น override ค่าโทรศัพท์',
      },
      {
        at: '2026-05-09T15:30:00.000Z',
        actorRole: 'hrbp',
        actorName: 'HRBP IT',
        action: 'approve',
        note: 'อนุมัติ override',
      },
    ],
  },
  {
    id: 'EXC-0007',
    employeeId: 'EMP005',
    employeeName: 'กิตติพงษ์ รักดี',
    department: 'Finance',
    benefitCode: 'BEN-CHECKUP',
    benefitName: 'ตรวจสุขภาพ (CFR/SKT override)',
    exceptionType: 'cfr_skt_override',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-08T13:10:00.000Z',
    reason: 'สังกัด SKT — ใช้แพ็กเกจของ CFR',
    status: 'rejected',
    audit: [
      {
        at: '2026-05-08T13:10:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ยื่น CFR/SKT override',
      },
      {
        at: '2026-05-08T17:00:00.000Z',
        actorRole: 'hrbp',
        actorName: 'HRBP Finance',
        action: 'reject',
        note: 'ไม่ตรงเงื่อนไขข้อยกเว้น CFR/SKT',
      },
    ],
  },
  {
    id: 'EXC-0008',
    employeeId: 'EMP001',
    employeeName: 'จงรักษ์ ทานากะ',
    department: 'HR',
    benefitCode: 'BEN-DEP-MED',
    benefitName: 'ค่ารักษาผู้รับสิทธิ์ร่วม (คู่สมรสต่างชาติ)',
    exceptionType: 'foreigner_spouse',
    requestedBy: 'Admin: ปิยะดา (Benefits)',
    requestedAt: '2026-05-07T09:00:00.000Z',
    reason: 'คู่สมรสต่างชาติ — ขอยกเว้นเอกสารเลขบัตรประชาชน (ตามนโยบายใหม่)',
    status: 'pending_hrbp',
    audit: [
      {
        at: '2026-05-07T09:00:00.000Z',
        actorRole: 'employee',
        actorName: 'Admin: ปิยะดา',
        action: 'submit',
        note: 'ขอยกเว้นเอกสารคู่สมรสต่างชาติ',
      },
    ],
  },
];

// ── Store ───────────────────────────────────────────────────────────────────

const nowIso = () => new Date().toISOString();

export const useBenefitExceptionStore = create<BenefitExceptionState>()(
  persist(
    (set) => ({
      exceptions: seedRecords,
      hrbpApproveException: (id, hrbpName, note) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            set((s) => ({
              exceptions: s.exceptions.map((exc) =>
                exc.id !== id
                  ? exc
                  : {
                      ...exc,
                      status: 'approved' as BenefitExceptionStatus,
                      audit: [
                        ...exc.audit,
                        {
                          at: nowIso(),
                          actorRole: 'hrbp' as const,
                          actorName: hrbpName,
                          action: 'approve' as const,
                          note: note ?? 'HRBP อนุมัติข้อยกเว้น',
                        },
                      ],
                    },
              ),
            }));
            resolve();
          }, 300);
        }),
      hrbpRejectException: (id, hrbpName, reason) =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            set((s) => ({
              exceptions: s.exceptions.map((exc) =>
                exc.id !== id
                  ? exc
                  : {
                      ...exc,
                      status: 'rejected' as BenefitExceptionStatus,
                      audit: [
                        ...exc.audit,
                        {
                          at: nowIso(),
                          actorRole: 'hrbp' as const,
                          actorName: hrbpName,
                          action: 'reject' as const,
                          note: reason,
                        },
                      ],
                    },
              ),
            }));
            resolve();
          }, 300);
        }),
      clear: () => set({ exceptions: seedRecords }),
    }),
    { name: 'humi-benefit-exceptions' },
  ),
);

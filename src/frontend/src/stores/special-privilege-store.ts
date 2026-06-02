'use client';

/**
 * special-privilege-store — STA-90 (SF BE-03 Special Privilege)
 *
 * Zustand persisted store for HR-Admin per-employee benefit overrides.
 * BE-03 has NO approval flow (unlike benefit-exception-store / BE-04) — records
 * are terminal once created. Mock-only persistence; no backend wired this phase.
 *
 * SF field naming mirrored exactly: specialBenefitGroup, planId, schedulePeriod,
 * benefitEntitlementAmount, maxPerClaim, effectiveStartDate, effectiveEndDate,
 * reason, createdBy, createdAt.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Types ───────────────────────────────────────────────────────────────────

export type SpecialPrivilegeSchedulePeriod =
  | 'year'
  | 'month'
  | 'quarter'
  | 'one-time'
  | 'lifetime';

export interface SpecialPrivilegeRecord {
  id: string;
  employeeId: string; // e.g. 'EMP-0005'
  specialBenefitGroup: boolean;
  planId: string; // references BENEFIT_PLAN_REGISTRY[].id
  schedulePeriod: SpecialPrivilegeSchedulePeriod;
  benefitEntitlementAmount: number; // วงเงิน, THB
  maxPerClaim: number; // THB
  effectiveStartDate: string; // ISO
  effectiveEndDate: string; // ISO
  reason: string; // required
  createdBy: string;
  createdAt: string; // ISO timestamp
}

interface SpecialPrivilegeState {
  records: SpecialPrivilegeRecord[];
  addPrivilege: (
    rec: Omit<SpecialPrivilegeRecord, 'id' | 'createdAt'> & { createdAt?: string },
  ) => void;
  removePrivilege: (id: string) => void;
  clear: () => void;
}

// ── Shared selector (single join path) ───────────────────────────────────────
//
// Consumed by BOTH the admin detail page (Step 4) and the profile benefits
// panel (Step 5). NOTE: this returns a FRESH `.filter()` array on every call,
// so it is NOT a stable reference. Consumers MUST guard against re-render churn
// — either wrap with `useShallow` (zustand/react/shallow) at the call site, or
// select the raw `records` array and `useMemo` the filter. Do NOT rely on
// referential equality.
export const selectPrivilegesForEmployee =
  (employeeId: string) => (s: SpecialPrivilegeState) =>
    s.records.filter((r) => r.employeeId === employeeId);

// ── Seed ─────────────────────────────────────────────────────────────────────
//
// ONE demo record against EMP-0005 (verified active + probation passed in
// MOCK_EMPLOYEES) so both the admin detail list and the /profile/me benefits
// panel render with content for the HR demo. Registry-backed (planId only) —
// not a user-facing input artifact, allowed by the mockup-data caveat.
const seedRecords: SpecialPrivilegeRecord[] = [
  {
    id: 'SP-0001',
    employeeId: 'EMP-0005',
    specialBenefitGroup: true,
    planId: 'BE-MED-002',
    schedulePeriod: 'year',
    benefitEntitlementAmount: 250000,
    maxPerClaim: 50000,
    effectiveStartDate: '2026-01-01T00:00:00.000Z',
    effectiveEndDate: '2026-12-31T00:00:00.000Z',
    reason: 'ปรับวงเงินค่ารักษาพยาบาลเป็นกรณีพิเศษตามมติผู้บริหาร (Executive committee approval)',
    createdBy: 'HR Admin',
    createdAt: '2026-05-01T03:00:00.000Z',
  },
];

// ── Store ─────────────────────────────────────────────────────────────────────

const nowIso = () => new Date().toISOString();
let seq = seedRecords.length;
const nextId = () => `SP-${String(++seq).padStart(4, '0')}`;

export const useSpecialPrivilegeStore = create<SpecialPrivilegeState>()(
  persist(
    (set) => ({
      records: seedRecords,
      addPrivilege: (rec) =>
        set((s) => ({
          records: [
            ...s.records,
            {
              ...rec,
              id: nextId(),
              createdAt: rec.createdAt ?? nowIso(),
            },
          ],
        })),
      removePrivilege: (id) =>
        set((s) => ({
          records: s.records.filter((r) => r.id !== id),
        })),
      clear: () => set({ records: seedRecords }),
    }),
    { name: 'humi-special-privileges' },
  ),
);

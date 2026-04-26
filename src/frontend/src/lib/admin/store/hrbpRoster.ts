// hrbpRoster.ts — Seeded mock HRBP roster for ClusterReview HRBP picker
// BRD #109 — HRBP assignment. TODO: replace with real backend GET /hrbp-roster.
// Names + BUs are realistic Thai HR personas.
// SF cite: RBAC-MATRIX-V2-2026-04-26.md — HRBP role covers org-unit-scoped approval

export interface HrbpEntry {
  id: string
  displayName: string
  email: string
  businessUnit: string
}

export const HRBP_ROSTER: HrbpEntry[] = [
  { id: 'HRBP-001', displayName: 'คุณสิริพร จันทร์แดง',   email: 'siriporn.j@company.th',   businessUnit: 'สำนักงานใหญ่'      },
  { id: 'HRBP-002', displayName: 'คุณธนพล ศิริวงศ์',       email: 'thanaphol.s@company.th',  businessUnit: 'ภาคเหนือ'          },
  { id: 'HRBP-003', displayName: 'คุณกมลรัตน์ บุญรัตน์',   email: 'kamonrat.b@company.th',   businessUnit: 'ภาคกลาง'          },
  { id: 'HRBP-004', displayName: 'คุณอนุชา ทองดี',         email: 'anucha.t@company.th',     businessUnit: 'ภาคใต้'           },
  { id: 'HRBP-005', displayName: 'คุณวรเมธ หิรัญรัตน์',    email: 'voramet.h@company.th',    businessUnit: 'สาขาต่างประเทศ'    },
  { id: 'HRBP-006', displayName: 'คุณนภาพร เจริญสุข',      email: 'napaporn.c@company.th',   businessUnit: 'ภาคตะวันออก'      },
  { id: 'HRBP-007', displayName: 'คุณพิมพ์ชนก ชัยประเสริฐ', email: 'pimchanok.c@company.th', businessUnit: 'ภาคตะวันออกเฉียงเหนือ' },
  { id: 'HRBP-008', displayName: 'คุณรัตนา วงศ์สกุล',      email: 'rattana.w@company.th',    businessUnit: 'กรุงเทพฯ เขตเหนือ' },
  { id: 'HRBP-009', displayName: 'คุณสมชาย พรรณราย',       email: 'somchai.p@company.th',    businessUnit: 'กรุงเทพฯ เขตใต้'  },
  { id: 'HRBP-010', displayName: 'คุณมาลี สุวรรณภูมิ',     email: 'malee.s@company.th',      businessUnit: 'ปริมณฑล'          },
]

/** Zustand-free hook: returns the static roster (no async, no network). */
export function useHrbpRoster(): HrbpEntry[] {
  return HRBP_ROSTER
}

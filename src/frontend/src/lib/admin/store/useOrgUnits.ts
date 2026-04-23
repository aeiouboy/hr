// useOrgUnits.ts — Zustand store สำหรับ Organization Unit tree (Batch 3 EC-FO)
//
// SSoT สำหรับ department hierarchy ทั้งหมด (~50 seed units, 5 companies)
// Tree traversal: getChildren(parentId) + getPath(id) สำหรับ breadcrumb
//
// TODO (scale > 500): ใช้ virtualized tree (react-arborist หรือ @tanstack/virtual)
// — depth-first traversal ยังโอเค แต่ render ทั้ง tree พร้อมกันจะช้าที่ 17K rows

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface OrgUnit {
  id: string
  code: string                 // "CEN.HR", "CEN.HR.PAYROLL"
  nameTh: string
  nameEn: string
  parentId: string | null       // root nodes have null
  company: 'CEN' | 'CRC' | 'CU' | 'CPN' | 'ROBINSON'
  effectiveStartDate: string     // ISO date
  active: boolean
}

interface OrgUnitsState {
  all: OrgUnit[]
  getAll: () => OrgUnit[]
  getChildren: (parentId: string | null) => OrgUnit[]
  getPath: (id: string) => OrgUnit[]  // breadcrumb from root → node
  upsert: (u: OrgUnit) => void
  remove: (id: string) => void
  searchFilter: (u: OrgUnit, q: string) => boolean
}

// ──────────────────────────────────────────────
// Seed data — deterministic ~50 departments
// ──────────────────────────────────────────────

function makeSeed(): OrgUnit[] {
  const units: OrgUnit[] = []

  // Level 1 — 5 roots
  const roots: Array<{ id: string; company: OrgUnit['company']; nameTh: string; nameEn: string }> = [
    { id: 'CEN',      company: 'CEN',      nameTh: 'เซ็นทรัล กรุ๊ป',            nameEn: 'Central Group HQ' },
    { id: 'CRC',      company: 'CRC',      nameTh: 'เซ็นทรัล เรสเตอรองส์',       nameEn: 'Central Restaurants Corporation' },
    { id: 'CU',       company: 'CU',       nameTh: 'เซ็นทรัล ยูนิต',             nameEn: 'Central Unit' },
    { id: 'CPN',      company: 'CPN',      nameTh: 'เซ็นทรัล พัฒนา',             nameEn: 'Central Pattana' },
    { id: 'ROBINSON', company: 'ROBINSON', nameTh: 'โรบินสัน',                  nameEn: 'Robinson' },
  ]

  roots.forEach((r) => {
    units.push({
      id: r.id,
      code: r.company,
      nameTh: r.nameTh,
      nameEn: r.nameEn,
      parentId: null,
      company: r.company,
      effectiveStartDate: '2020-01-01',
      active: true,
    })
  })

  // Level 2 — 6 departments per root
  const lvl2Depts = [
    { suffix: 'HR',    nameTh: 'ทรัพยากรบุคคล',      nameEn: 'Human Resources' },
    { suffix: 'FIN',   nameTh: 'การเงิน',             nameEn: 'Finance' },
    { suffix: 'IT',    nameTh: 'เทคโนโลยีสารสนเทศ',  nameEn: 'Information Technology' },
    { suffix: 'OPS',   nameTh: 'ปฏิบัติการ',          nameEn: 'Operations' },
    { suffix: 'SALES', nameTh: 'การขาย',              nameEn: 'Sales' },
    { suffix: 'MKT',   nameTh: 'การตลาด',             nameEn: 'Marketing' },
  ]

  roots.forEach((r) => {
    lvl2Depts.forEach((d) => {
      const id = `${r.id}.${d.suffix}`
      units.push({
        id,
        code: `${r.company}.${d.suffix}`,
        nameTh: `${r.nameTh} — ${d.nameTh}`,
        nameEn: `${r.nameEn} ${d.nameEn}`,
        parentId: r.id,
        company: r.company,
        effectiveStartDate: '2020-01-01',
        active: true,
      })
    })
  })

  // Level 3 — HR sub-depts สำหรับ CEN + CRC
  const hrL3: Array<{ suffix: string; nameTh: string; nameEn: string }> = [
    { suffix: 'PAYROLL',    nameTh: 'เงินเดือน',           nameEn: 'Payroll' },
    { suffix: 'BENEFITS',   nameTh: 'สวัสดิการ',           nameEn: 'Benefits' },
    { suffix: 'RECRUITING', nameTh: 'สรรหาบุคลากร',        nameEn: 'Recruiting' },
  ]

  // Finance sub-depts สำหรับ CEN + CRC
  const finL3: Array<{ suffix: string; nameTh: string; nameEn: string }> = [
    { suffix: 'AP',  nameTh: 'เจ้าหนี้การค้า',   nameEn: 'Accounts Payable' },
    { suffix: 'AR',  nameTh: 'ลูกหนี้การค้า',    nameEn: 'Accounts Receivable' },
    { suffix: 'TAX', nameTh: 'ภาษี',             nameEn: 'Tax' },
  ]

  ;(['CEN', 'CRC'] as const).forEach((company) => {
    const rootId = company

    // HR L3
    hrL3.forEach((d) => {
      const parentId = `${rootId}.HR`
      const id = `${parentId}.${d.suffix}`
      units.push({
        id,
        code: `${company}.HR.${d.suffix}`,
        nameTh: d.nameTh,
        nameEn: d.nameEn,
        parentId,
        company,
        effectiveStartDate: '2020-01-01',
        active: true,
      })
    })

    // Finance L3
    finL3.forEach((d) => {
      const parentId = `${rootId}.FIN`
      const id = `${parentId}.${d.suffix}`
      units.push({
        id,
        code: `${company}.FIN.${d.suffix}`,
        nameTh: d.nameTh,
        nameEn: d.nameEn,
        parentId,
        company,
        effectiveStartDate: '2020-01-01',
        active: true,
      })
    })
  })

  return units
}

const SEED = makeSeed() // ~53 units

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

export const useOrgUnits = create<OrgUnitsState>()(
  persist(
    (set, get) => ({
      all: SEED,

      getAll: () => get().all,

      getChildren: (parentId) =>
        get().all.filter((u) => u.parentId === parentId),

      getPath: (id) => {
        const { all } = get()
        const path: OrgUnit[] = []
        let current = all.find((u) => u.id === id)
        while (current) {
          path.unshift(current)
          current = current.parentId
            ? all.find((u) => u.id === current!.parentId)
            : undefined
        }
        return path
      },

      upsert: (u) =>
        set((state) => {
          const idx = state.all.findIndex((x) => x.id === u.id)
          if (idx >= 0) {
            const updated = [...state.all]
            updated[idx] = u
            return { all: updated }
          }
          return { all: [...state.all, u] }
        }),

      remove: (id) =>
        set((state) => ({ all: state.all.filter((u) => u.id !== id) })),

      searchFilter: (u, q) => {
        const lq = q.toLowerCase()
        return (
          u.code.toLowerCase().includes(lq) ||
          u.nameTh.toLowerCase().includes(lq) ||
          u.nameEn.toLowerCase().includes(lq)
        )
      },
    }),
    { name: 'org-units-store' },
  ),
)

// usePositions.ts — Zustand store สำหรับ Positions master data (Batch 3 EC-FO)
//
// SSoT สำหรับ ~300 mock positions + in-memory upsert/remove.
// Positions page (/admin/positions) consumes ผ่าน createCrudPage config.
//
// FK cross-references:
//   jobId → useJobs.all (consume only — ห้าม import useJobs ที่นี่ เพื่อหลีกเลี่ยง circular)
//   orgUnitId → useOrgUnits.all (ยังไม่มี F3 store — fallback ด้วย empty array)
//
// ห้าม persist ไปยัง localStorage — mock data is ephemeral.
// ห้าม real API calls ในไฟล์นี้.

import { create } from 'zustand'

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Position {
  id: string
  code: string              // "POS-0001"
  titleTh: string
  titleEn: string
  jobId: string             // FK → Job.id
  orgUnitId: string         // FK → OrgUnit.id
  company: string           // 'CEN'|'CRC'|'CU'|'CPN'|'ROBINSON'
  defaultHeadcount: number
  currentHeadcount: number
  active: boolean
}

interface PositionsState {
  all: Position[]
  getAll: () => Position[]
  upsert: (p: Position) => void
  remove: (id: string) => void
  searchFilter: (p: Position, q: string) => boolean
}

// ──────────────────────────────────────────────
// Mock seed — deterministic cross-product generator
// 6 families × 6 levels × 3 variants = 108 jobs → each gets ~3 positions = ~324
// ──────────────────────────────────────────────

const COMPANY_POOL = ['CEN', 'CRC', 'CU', 'CPN', 'ROBINSON'] as const

// Job codes mirror the seed in useJobs.ts (familyAbbr-NNN, seq 1-108)
const FAMILY_ABBRS = ['HR', 'ENG', 'PROC', 'SL', 'OPS', 'FIN'] as const
const LEVEL_COUNT = 6 // 6 levels per family
const VARIANT_COUNT = 3 // 3 variants per family+level = 108 total jobs

const DEPT_POOL: Array<{ id: string; nameTh: string }> = [
  { id: 'DEPT-001', nameTh: 'ฝ่ายทรัพยากรมนุษย์' },
  { id: 'DEPT-002', nameTh: 'ฝ่ายวิศวกรรมและเทคโนโลยี' },
  { id: 'DEPT-003', nameTh: 'ฝ่ายจัดซื้อและโลจิสติกส์' },
  { id: 'DEPT-004', nameTh: 'ฝ่ายขายและการตลาด' },
  { id: 'DEPT-005', nameTh: 'ฝ่ายปฏิบัติการ' },
  { id: 'DEPT-006', nameTh: 'ฝ่ายการเงินและบัญชี' },
  { id: 'DEPT-007', nameTh: 'ฝ่ายพัฒนาองค์กร' },
  { id: 'DEPT-008', nameTh: 'ฝ่ายกฎหมายและการปฏิบัติตามกฎ' },
]

const LEVEL_TITLE_TH: string[] = [
  'เจ้าหน้าที่',
  'นักวิเคราะห์',
  'อาวุโส',
  'หัวหน้า',
  'ผู้จัดการ',
  'ผู้อำนวยการ',
]

const LEVEL_TITLE_EN: string[] = [
  'Officer',
  'Analyst',
  'Senior',
  'Lead',
  'Manager',
  'Director',
]

const FAMILY_TITLE_TH: Record<string, string> = {
  HR:   'ทรัพยากรมนุษย์',
  ENG:  'วิศวกรรม',
  PROC: 'จัดซื้อ',
  SL:   'ขาย',
  OPS:  'ปฏิบัติการ',
  FIN:  'การเงิน',
}

const FAMILY_TITLE_EN: Record<string, string> = {
  HR:   'Human Resources',
  ENG:  'Engineering',
  PROC: 'Procurement',
  SL:   'Sales',
  OPS:  'Operations',
  FIN:  'Finance',
}

function generateMockPositions(): Position[] {
  const positions: Position[] = []
  let posSeq = 1
  let jobSeq = 1

  for (const abbr of FAMILY_ABBRS) {
    for (let lvlIdx = 0; lvlIdx < LEVEL_COUNT; lvlIdx++) {
      for (let v = 1; v <= VARIANT_COUNT; v++) {
        const jobCode = `${abbr}-${String(jobSeq).padStart(3, '0')}`
        const lvlTh = LEVEL_TITLE_TH[lvlIdx]
        const lvlEn = LEVEL_TITLE_EN[lvlIdx]
        const famTh = FAMILY_TITLE_TH[abbr]
        const famEn = FAMILY_TITLE_EN[abbr]

        // 3 positions per job (one per company cycle)
        const posPerJob = 3
        for (let p = 0; p < posPerJob; p++) {
          const code = `POS-${String(posSeq).padStart(4, '0')}`
          const company = COMPANY_POOL[(posSeq - 1) % COMPANY_POOL.length]
          const dept = DEPT_POOL[(posSeq - 1) % DEPT_POOL.length]
          const variant = posPerJob > 1 && p > 0 ? ` (${p + 1})` : ''

          positions.push({
            id: code,
            code,
            titleTh: `${lvlTh}${famTh}${variant}`.trim(),
            titleEn: `${famEn} ${lvlEn}${variant}`.trim(),
            jobId: jobCode,
            orgUnitId: dept.id,
            company,
            defaultHeadcount: 1 + (posSeq % 4),
            currentHeadcount: posSeq % 3,
            active: posSeq % 11 !== 0, // ~1 in 11 inactive for variety
          })

          posSeq++
        }

        jobSeq++
      }
    }
  }

  return positions
}

const MOCK_POSITIONS: Position[] = generateMockPositions()

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

export const usePositions = create<PositionsState>()((set, get) => ({
  all: MOCK_POSITIONS,

  getAll: () => get().all,

  upsert: (p) =>
    set((state) => {
      const existing = state.all.findIndex((x) => x.id === p.id)
      if (existing >= 0) {
        const next = [...state.all]
        next[existing] = p
        return { all: next }
      }
      return { all: [...state.all, p] }
    }),

  remove: (id) =>
    set((state) => ({ all: state.all.filter((p) => p.id !== id) })),

  searchFilter: (p, q) => {
    const lower = q.toLowerCase()
    return (
      p.code.toLowerCase().includes(lower) ||
      p.titleTh.includes(q) ||
      p.titleEn.toLowerCase().includes(lower) ||
      p.company.toLowerCase().includes(lower) ||
      p.jobId.toLowerCase().includes(lower) ||
      p.orgUnitId.toLowerCase().includes(lower)
    )
  },
}))

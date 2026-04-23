// useJobs.ts — Zustand store สำหรับ Jobs master data (Batch 3 EC-FO)
//
// SSoT สำหรับ ~100 mock jobs + in-memory upsert/remove.
// Jobs page (/admin/jobs) consumes ผ่าน createCrudPage config.
//
// ห้าม persist ไปยัง localStorage — mock data is ephemeral.
// ห้าม real API calls ในไฟล์นี้.

import { create } from 'zustand'

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Job {
  id: string        // same as code (job_code)
  code: string      // "HR-001", "SW-ENG", "PROC-01"
  titleTh: string
  titleEn: string
  family: string    // "HR" | "Engineering" | "Procurement" | "Sales" | "Operations" | "Finance"
  level: 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD' | 'MANAGER' | 'DIRECTOR'
  active: boolean
}

interface JobsState {
  all: Job[]
  getAll: () => Job[]
  upsert: (job: Job) => void
  remove: (id: string) => void
  searchFilter: (j: Job, q: string) => boolean
}

// ──────────────────────────────────────────────
// Mock seed — deterministic generator
// familyPool × levelPool × sequences → ~100 entries
// ──────────────────────────────────────────────

const familyPool: Array<{ key: string; label: string; abbr: string }> = [
  { key: 'HR',          label: 'Human Resources',    abbr: 'HR'   },
  { key: 'Engineering', label: 'Engineering',        abbr: 'ENG'  },
  { key: 'Procurement', label: 'Procurement',        abbr: 'PROC' },
  { key: 'Sales',       label: 'Sales',              abbr: 'SL'   },
  { key: 'Operations',  label: 'Operations',         abbr: 'OPS'  },
  { key: 'Finance',     label: 'Finance',            abbr: 'FIN'  },
]

const levelPool: Array<Job['level']> = [
  'JUNIOR', 'MID', 'SENIOR', 'LEAD', 'MANAGER', 'DIRECTOR',
]

const levelTitles: Record<Job['level'], { th: string; en: string }> = {
  JUNIOR:   { th: 'เจ้าหน้าที่', en: 'Officer' },
  MID:      { th: 'นักวิเคราะห์', en: 'Analyst' },
  SENIOR:   { th: 'อาวุโส', en: 'Senior' },
  LEAD:     { th: 'หัวหน้า', en: 'Lead' },
  MANAGER:  { th: 'ผู้จัดการ', en: 'Manager' },
  DIRECTOR: { th: 'ผู้อำนวยการ', en: 'Director' },
}

const familyTitles: Record<string, { th: string; en: string }> = {
  HR:          { th: 'ทรัพยากรมนุษย์', en: 'Human Resources' },
  Engineering: { th: 'วิศวกรรม', en: 'Engineering' },
  Procurement: { th: 'จัดซื้อ', en: 'Procurement' },
  Sales:       { th: 'ขาย', en: 'Sales' },
  Operations:  { th: 'ปฏิบัติการ', en: 'Operations' },
  Finance:     { th: 'การเงิน', en: 'Finance' },
}

function generateMockJobs(): Job[] {
  const jobs: Job[] = []
  let seq = 1

  for (const family of familyPool) {
    for (const level of levelPool) {
      // 3 variants per family+level combination → 6×6×3 = 108 ≈ 100
      for (let v = 1; v <= 3; v++) {
        const num = String(seq).padStart(3, '0')
        const code = `${family.abbr}-${num}`
        const lvl = levelTitles[level]
        const fam = familyTitles[family.key]

        jobs.push({
          id: code,
          code,
          titleTh: `${lvl.th}${fam.th} ${v > 1 ? `(${v})` : ''}`.trim(),
          titleEn: `${fam.en} ${lvl.en}${v > 1 ? ` ${v}` : ''}`.trim(),
          family: family.key,
          level,
          active: seq % 7 !== 0, // ~1 in 7 inactive for variety
        })

        seq++
      }
    }
  }

  return jobs
}

const MOCK_JOBS: Job[] = generateMockJobs()

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

export const useJobs = create<JobsState>()((set, get) => ({
  all: MOCK_JOBS,

  getAll: () => get().all,

  upsert: (job) =>
    set((state) => {
      const existing = state.all.findIndex((j) => j.id === job.id)
      if (existing >= 0) {
        const next = [...state.all]
        next[existing] = job
        return { all: next }
      }
      return { all: [...state.all, job] }
    }),

  remove: (id) =>
    set((state) => ({ all: state.all.filter((j) => j.id !== id) })),

  searchFilter: (j, q) => {
    const lower = q.toLowerCase()
    return (
      j.code.toLowerCase().includes(lower) ||
      j.titleTh.includes(q) ||
      j.titleEn.toLowerCase().includes(lower) ||
      j.family.toLowerCase().includes(lower)
    )
  },
}))

'use client'

// /admin/jobs — Jobs master-data CRUD (Batch 3 EC-FO)
// Built with createCrudPage (F6 template, Archetype C).
// No real API — uses useJobs Zustand store (mock seed ~108 entries).

import { createCrudPage } from '@/lib/admin/crud-template/createCrudPage'
import { useJobs, type Job } from '@/lib/admin/store/useJobs'

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const FAMILY_OPTIONS = [
  'HR',
  'Engineering',
  'Procurement',
  'Sales',
  'Operations',
  'Finance',
] as const

const LEVEL_OPTIONS: Array<{ value: Job['level']; labelTh: string }> = [
  { value: 'JUNIOR',   labelTh: 'เจ้าหน้าที่' },
  { value: 'MID',      labelTh: 'นักวิเคราะห์' },
  { value: 'SENIOR',   labelTh: 'อาวุโส' },
  { value: 'LEAD',     labelTh: 'หัวหน้า' },
  { value: 'MANAGER',  labelTh: 'ผู้จัดการ' },
  { value: 'DIRECTOR', labelTh: 'ผู้อำนวยการ' },
]

// ──────────────────────────────────────────────
// CRUD page
// ──────────────────────────────────────────────

const { Page } = createCrudPage<Job>({
  name: 'job',
  titleTh: 'งาน',
  titleEn: 'Jobs',

  columns: [
    { key: 'code',    label: 'รหัส',          width: 100 },
    { key: 'titleTh', label: 'ชื่องาน (TH)',  width: 220 },
    { key: 'titleEn', label: 'ชื่องาน (EN)',  width: 220 },
    { key: 'family',  label: 'กลุ่ม',         width: 130 },
    { key: 'level',   label: 'ระดับ',         width: 100 },
    {
      key: 'active',
      label: 'สถานะ',
      width: 80,
      render: (j) => (
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm, 4px)',
            fontSize: 11,
            fontWeight: 600,
            background: j.active ? 'var(--color-success-bg, #dcfce7)' : 'var(--color-canvas)',
            color: j.active ? 'var(--color-success-ink, #166534)' : 'var(--color-ink-muted)',
          }}
        >
          {j.active ? 'ใช้งาน' : 'ปิด'}
        </span>
      ),
    },
  ],

  useItems: () => useJobs((s) => s.all),

  createEmpty: (): Partial<Job> => ({
    id: '',
    code: '',
    titleTh: '',
    titleEn: '',
    family: 'HR',
    level: 'JUNIOR',
    active: true,
  }),

  upsert: (j) => {
    // id mirrors code
    useJobs.getState().upsert({ ...j, id: j.code || j.id })
  },

  remove: (id) => useJobs.getState().remove(id),

  searchFilter: (j, q) => {
    const lower = q.toLowerCase()
    return (
      j.code.toLowerCase().includes(lower) ||
      j.titleTh.includes(q) ||
      j.titleEn.toLowerCase().includes(lower) ||
      j.family.toLowerCase().includes(lower)
    )
  },

  renderForm: (job, onChange) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* รหัส */}
      <label className="humi-label">
        รหัส *
        <input
          className="humi-input"
          type="text"
          placeholder="เช่น HR-001, ENG-002"
          value={job.code ?? ''}
          onChange={(e) => onChange({ code: e.target.value })}
        />
      </label>

      {/* ชื่องาน TH */}
      <label className="humi-label">
        ชื่องาน (TH) *
        <input
          className="humi-input"
          type="text"
          placeholder="เช่น เจ้าหน้าที่ทรัพยากรมนุษย์"
          value={job.titleTh ?? ''}
          onChange={(e) => onChange({ titleTh: e.target.value })}
        />
      </label>

      {/* ชื่องาน EN */}
      <label className="humi-label">
        ชื่องาน (EN) *
        <input
          className="humi-input"
          type="text"
          placeholder="e.g. Human Resources Officer"
          value={job.titleEn ?? ''}
          onChange={(e) => onChange({ titleEn: e.target.value })}
        />
      </label>

      {/* กลุ่ม */}
      <label className="humi-label">
        กลุ่มงาน
        <select
          className="humi-input"
          value={job.family ?? 'HR'}
          onChange={(e) => onChange({ family: e.target.value })}
        >
          {FAMILY_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>

      {/* ระดับ */}
      <label className="humi-label">
        ระดับ
        <select
          className="humi-input"
          value={job.level ?? 'JUNIOR'}
          onChange={(e) => onChange({ level: e.target.value as Job['level'] })}
        >
          {LEVEL_OPTIONS.map((l) => (
            <option key={l.value} value={l.value}>{l.labelTh}</option>
          ))}
        </select>
      </label>

      {/* สถานะ */}
      <label
        className="humi-label"
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <input
          type="checkbox"
          checked={job.active ?? true}
          onChange={(e) => onChange({ active: e.target.checked })}
          style={{ width: 16, height: 16, accentColor: 'var(--color-brand)' }}
        />
        ใช้งาน
      </label>
    </div>
  ),

  emptyState: {
    titleTh: 'ไม่พบรายการงาน',
    bodyTh: 'ลองเปลี่ยนคำค้นหา หรือกด "เพิ่มรายการ" เพื่อสร้างใหม่',
  },
})

export default Page

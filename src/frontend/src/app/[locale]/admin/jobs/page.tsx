'use client'

// /admin/jobs — Jobs master-data CRUD (Batch 3 EC-FO)
// Wave 2-A: BRD #4 — FOJobCode custom fields: cust_JGMin/Max, cust_bandMatching, cust_jobType, jobFunction
// SF cite: qas-fields-2026-04-26/sf-qas-FOJobCode-2026-04-26.json#.d.results[0].cust_JGMin
// Built with createCrudPage (F6 template, Archetype C).
// No real API — uses useJobs Zustand store (mock seed ~108 entries).

import { createCrudPage } from '@/lib/admin/crud-template/createCrudPage'
import { useJobs, type Job } from '@/lib/admin/store/useJobs'
import { PICKLIST_JOB_FUNCTION } from '@hrms/shared/picklists'

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const FAMILY_OPTIONS: Array<{ value: string; labelTh: string }> = [
  { value: 'HR',          labelTh: 'ทรัพยากรบุคคล' },
  { value: 'Engineering', labelTh: 'วิศวกรรม' },
  { value: 'Procurement', labelTh: 'จัดซื้อจัดจ้าง' },
  { value: 'Sales',       labelTh: 'การขาย' },
  { value: 'Operations',  labelTh: 'ปฏิบัติการ' },
  { value: 'Finance',     labelTh: 'การเงิน' },
]

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
            <option key={f.value} value={f.value}>{f.labelTh}</option>
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

      {/* ─── BRD #4: FOJobCode custom fields ─────────────────────────────────
           SF cite: qas-fields-2026-04-26/sf-qas-FOJobCode-2026-04-26.json#.d.results[0] */}
      <div style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 12, marginTop: 4 }}>
        <p className="humi-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
          FOJobCode — ข้อมูล Job Grade &amp; Classification (BRD #4)
        </p>

        {/* cust_JGMin — SF: FOJobCode.cust_JGMin */}
        <label className="humi-label" style={{ marginBottom: 10 }}>
          Job Grade ขั้นต่ำ (JG Min) <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-ink-muted)' }}>SF: cust_JGMin</span>
          <input
            className="humi-input"
            type="text"
            placeholder="เช่น JG5"
            value={job.cust_JGMin ?? ''}
            onChange={(e) => onChange({ cust_JGMin: e.target.value || null })}
          />
        </label>

        {/* cust_JGMax — SF: FOJobCode.cust_JGMax */}
        <label className="humi-label" style={{ marginBottom: 10 }}>
          Job Grade สูงสุด (JG Max) <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-ink-muted)' }}>SF: cust_JGMax</span>
          <input
            className="humi-input"
            type="text"
            placeholder="เช่น JG9"
            value={job.cust_JGMax ?? ''}
            onChange={(e) => onChange({ cust_JGMax: e.target.value || null })}
          />
        </label>

        {/* cust_bandMatching — SF: FOJobCode.cust_bandMatching */}
        <label className="humi-label" style={{ marginBottom: 10 }}>
          Band Matching <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-ink-muted)' }}>SF: cust_bandMatching</span>
          <input
            className="humi-input"
            type="text"
            placeholder="รหัส Band Matching"
            value={job.cust_bandMatching ?? ''}
            onChange={(e) => onChange({ cust_bandMatching: e.target.value || null })}
          />
        </label>

        {/* cust_jobType — SF: FOJobCode.cust_jobType */}
        <label className="humi-label" style={{ marginBottom: 10 }}>
          ประเภทงาน (Job Type) <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-ink-muted)' }}>SF: cust_jobType</span>
          <input
            className="humi-input"
            type="text"
            placeholder="เช่น PERMANENT, CONTRACT"
            value={job.cust_jobType ?? ''}
            onChange={(e) => onChange({ cust_jobType: e.target.value || null })}
          />
        </label>

        {/* jobFunction — SF: FOJobCode.jobFunction */}
        <label className="humi-label">
          Job Function <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-ink-muted)' }}>SF: jobFunction</span>
          <select
            className="humi-input"
            value={job.jobFunction ?? ''}
            onChange={(e) => onChange({ jobFunction: e.target.value || null })}
          >
            <option value="">— เลือก Job Function —</option>
            {PICKLIST_JOB_FUNCTION.filter((f) => f.active).map((f) => (
              <option key={f.id} value={f.id}>{f.id} — {f.labelEn}</option>
            ))}
          </select>
        </label>
      </div>

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

'use client'

// /admin/positions — Positions master-data CRUD (Batch 3 EC-FO)
// Built with createCrudPage (F6 template, Archetype C).
// No real API — uses usePositions Zustand store (mock seed ~324 entries).
//
// Cross-references (consume-only — ห้าม modify):
//   useJobs    → F1 store (job dropdown)
//   useOrgUnits → F3 store (dept name display)
// If sibling store returns empty → graceful placeholder แสดงแทน

import { createCrudPage } from '@/lib/admin/crud-template/createCrudPage'
import { usePositions, type Position } from '@/lib/admin/store/usePositions'
import { useJobs } from '@/lib/admin/store/useJobs'
import { useOrgUnits } from '@/lib/admin/store/useOrgUnits'
import { PICKLIST_COMPANY } from '@hrms/shared/picklists'

// ──────────────────────────────────────────────
// Helpers — cross-reference resolvers
// ──────────────────────────────────────────────

const PLACEHOLDER_JOB = '— กรุณากำหนดงาน/หน่วยงานก่อน —'

/** แสดง "code — titleTh" สำหรับ job column, fallback เป็น jobId ถ้าไม่พบ */
function resolveJobLabel(jobId: string, jobs: ReturnType<typeof useJobs.getState>['all']): string {
  if (!jobId) return '—'
  const job = jobs.find((j) => j.id === jobId)
  return job ? `${job.code} — ${job.titleTh}` : jobId
}

/** แสดงชื่อ dept จาก orgUnitId, fallback placeholder ถ้า F3 ยังไม่โหลด */
function resolveOrgUnitLabel(orgUnitId: string, orgUnits: ReturnType<typeof useOrgUnits.getState>['all']): string {
  if (!orgUnitId) return '—'
  if (orgUnits.length === 0) return PLACEHOLDER_JOB
  const unit = orgUnits.find((u) => u.id === orgUnitId)
  return unit ? unit.nameTh : orgUnitId
}

// ──────────────────────────────────────────────
// CRUD page factory
// createCrudPage ถูกเรียกที่ module scope — hooks ที่ใช้ใน render
// ต้องผ่าน config.useItems / renderForm เป็น function ที่ Next.js
// เรียกเป็น React hooks ภายใน Page() component ตาม template.
// ──────────────────────────────────────────────

const { Page } = createCrudPage<Position>({
  name: 'position',
  titleTh: 'ตำแหน่ง',
  titleEn: 'Positions',

  columns: [
    { key: 'code',    label: 'รหัส',              width: 100 },
    { key: 'titleTh', label: 'ชื่อตำแหน่ง (TH)', width: 200 },
    { key: 'titleEn', label: 'ชื่อตำแหน่ง (EN)', width: 200 },
    { key: 'company', label: 'บริษัท',            width: 90 },
    {
      key: 'jobId',
      label: 'งาน',
      width: 180,
      render: (p) => {
        // hook-safe: ดึงจาก store.getState() ซึ่ง stable ไม่ trigger re-render ที่นี่
        // (column render เรียก once ต่อ row — ไม่ใช่ hook context)
        const jobs = useJobs.getState().all
        return resolveJobLabel(p.jobId, jobs)
      },
    },
    {
      key: 'orgUnitId',
      label: 'หน่วยงาน',
      width: 200,
      render: (p) => {
        const orgUnits = useOrgUnits.getState().all
        return resolveOrgUnitLabel(p.orgUnitId, orgUnits)
      },
    },
    {
      key: 'defaultHeadcount',
      label: 'Headcount',
      width: 100,
      render: (p) => `${p.currentHeadcount}/${p.defaultHeadcount}`,
    },
    {
      key: 'active',
      label: 'สถานะ',
      width: 75,
      render: (p) => (
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm, 4px)',
            fontSize: 11,
            fontWeight: 600,
            background: p.active ? 'var(--color-success-bg, #dcfce7)' : 'var(--color-canvas)',
            color: p.active ? 'var(--color-success-ink, #166534)' : 'var(--color-ink-muted)',
          }}
        >
          {p.active ? 'ใช้งาน' : 'ปิด'}
        </span>
      ),
    },
  ],

  useItems: () => usePositions((s) => s.all),

  createEmpty: (): Partial<Position> => ({
    id: '',
    code: '',
    titleTh: '',
    titleEn: '',
    jobId: '',
    orgUnitId: '',
    company: 'CEN',
    defaultHeadcount: 1,
    currentHeadcount: 0,
    active: true,
  }),

  upsert: (p) => {
    // id mirrors code
    usePositions.getState().upsert({ ...p, id: p.code || p.id })
  },

  remove: (id) => usePositions.getState().remove(id),

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

  renderForm: (pos, onChange) => {
    // ใช้ getState() แทน hook เพราะ renderForm ถูกเรียกภายใน Page() component
    // ซึ่งเป็น React component — safe to call getState() inline ที่นี่
    const jobs = useJobs.getState().all
    const orgUnits = useOrgUnits.getState().all
    const activeJobs = jobs.filter((j) => j.active)
    const hasJobs = activeJobs.length > 0
    const hasOrgUnits = orgUnits.length > 0

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* รหัสตำแหน่ง */}
        <label className="humi-label">
          รหัสตำแหน่ง *
          <input
            className="humi-input"
            type="text"
            placeholder="เช่น POS-0001"
            value={pos.code ?? ''}
            onChange={(e) => onChange({ code: e.target.value })}
          />
        </label>

        {/* ชื่อตำแหน่ง TH */}
        <label className="humi-label">
          ชื่อตำแหน่ง (TH) *
          <input
            className="humi-input"
            type="text"
            placeholder="เช่น ผู้จัดการทรัพยากรมนุษย์"
            value={pos.titleTh ?? ''}
            onChange={(e) => onChange({ titleTh: e.target.value })}
          />
        </label>

        {/* ชื่อตำแหน่ง EN */}
        <label className="humi-label">
          ชื่อตำแหน่ง (EN) *
          <input
            className="humi-input"
            type="text"
            placeholder="e.g. Human Resources Manager"
            value={pos.titleEn ?? ''}
            onChange={(e) => onChange({ titleEn: e.target.value })}
          />
        </label>

        {/* บริษัท */}
        <label className="humi-label">
          บริษัท
          <select
            className="humi-input"
            value={pos.company ?? 'CEN'}
            onChange={(e) => onChange({ company: e.target.value })}
          >
            {PICKLIST_COMPANY.filter((c) => c.active).map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} — {c.labelTh}
              </option>
            ))}
          </select>
        </label>

        {/* Job (FK) */}
        <label className="humi-label">
          งาน
          {hasJobs ? (
            <select
              className="humi-input"
              value={pos.jobId ?? ''}
              onChange={(e) => onChange({ jobId: e.target.value })}
            >
              <option value="">— เลือกงาน —</option>
              {activeJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.code} — {j.titleTh}
                </option>
              ))}
            </select>
          ) : (
            <div
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-canvas)',
                fontSize: 13,
                color: 'var(--color-ink-muted)',
              }}
            >
              {PLACEHOLDER_JOB}
            </div>
          )}
        </label>

        {/* หน่วยงาน (FK) */}
        <label className="humi-label">
          หน่วยงาน
          {hasOrgUnits ? (
            <select
              className="humi-input"
              value={pos.orgUnitId ?? ''}
              onChange={(e) => onChange({ orgUnitId: e.target.value })}
            >
              <option value="">— เลือกหน่วยงาน —</option>
              {orgUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nameTh}
                </option>
              ))}
            </select>
          ) : (
            <div
              style={{
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-canvas)',
                fontSize: 13,
                color: 'var(--color-ink-muted)',
              }}
            >
              {PLACEHOLDER_JOB}
            </div>
          )}
        </label>

        {/* Default Headcount */}
        <label className="humi-label">
          จำนวนพนักงานตามแผน
          <input
            className="humi-input"
            type="number"
            min={0}
            value={pos.defaultHeadcount ?? 1}
            onChange={(e) => onChange({ defaultHeadcount: Number(e.target.value) })}
          />
        </label>

        {/* Current Headcount — readonly */}
        <label className="humi-label">
          จำนวนพนักงานปัจจุบัน
          <input
            className="humi-input"
            type="number"
            readOnly
            aria-readonly="true"
            value={pos.currentHeadcount ?? 0}
            style={{ background: 'var(--color-canvas)', cursor: 'not-allowed', color: 'var(--color-ink-muted)' }}
            onChange={() => {/* readonly — computed from employees */}}
          />
          <span style={{ fontSize: 11, color: 'var(--color-ink-muted)', marginTop: 2 }}>
            คำนวณจากจำนวนพนักงานที่ active ในตำแหน่งนี้ — ไม่สามารถแก้ไขได้
          </span>
        </label>

        {/* สถานะ */}
        <label
          className="humi-label"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        >
          <input
            type="checkbox"
            checked={pos.active ?? true}
            onChange={(e) => onChange({ active: e.target.checked })}
            style={{ width: 16, height: 16, accentColor: 'var(--color-brand)' }}
          />
          ใช้งาน
        </label>
      </div>
    )
  },

  emptyState: {
    titleTh: 'ไม่พบรายการตำแหน่ง',
    bodyTh: 'ลองเปลี่ยนคำค้นหา หรือกด "เพิ่มรายการ" เพื่อสร้างใหม่',
  },
})

export default Page

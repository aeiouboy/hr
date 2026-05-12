'use client'

import { useMemo, useState } from 'react'
import {
  EC_FIELD_CATALOGUE,
  EC_FIELD_CATALOGUE_SUMMARY,
  type ECFieldCatalogueItem,
  type ECFieldProfileTab,
  type ECFieldValidationStatus,
} from '@/data/ec-field-catalogue'

const STATUS_COPY: Record<ECFieldValidationStatus, string> = {
  pending_review: 'รอ HR ตรวจสอบ',
  confirmed: 'ยืนยันแล้ว',
  needs_change: 'ต้องปรับปรุง',
  not_applicable: 'ไม่เกี่ยวข้อง',
}

const STATUS_TONE: Record<ECFieldValidationStatus, string> = {
  pending_review: 'bg-canvas-soft text-ink-muted border-hairline',
  confirmed: 'bg-accent-soft text-accent border-accent-soft',
  needs_change: 'bg-[color:var(--color-danger-soft)] text-[color:var(--color-danger)] border-[color:var(--color-danger-soft)]',
  not_applicable: 'bg-surface text-ink-muted border-hairline',
}

const PROFILE_TABS: Array<{ key: ECFieldProfileTab; label: string }> = [
  { key: 'personal', label: 'ข้อมูลส่วนตัว' },
  { key: 'employment', label: 'การจ้างงาน' },
  { key: 'compensation', label: 'ค่าตอบแทน' },
  { key: 'emergency', label: 'ติดต่อฉุกเฉิน' },
  { key: 'documents', label: 'เอกสาร' },
  { key: 'activity', label: 'กิจกรรม' },
]

type ReviewState = Record<string, { status: ECFieldValidationStatus; comment: string; timestamp: string }>

const allSections = Array.from(new Set(EC_FIELD_CATALOGUE.map((field) => field.section))).sort()
const allSubSections = Array.from(new Set(EC_FIELD_CATALOGUE.map((field) => field.subSection))).sort()
const allEmployeeGroups = Array.from(
  new Set(EC_FIELD_CATALOGUE.flatMap((field) => field.employeeGroups.map((group) => group.group))),
).sort()

function statusFor(field: ECFieldCatalogueItem, reviewState: ReviewState) {
  return reviewState[field.fieldId]?.status ?? field.validationStatus
}

function commentFor(field: ECFieldCatalogueItem, reviewState: ReviewState) {
  return reviewState[field.fieldId]?.comment ?? field.reviewerComment
}

function timestampFor(field: ECFieldCatalogueItem, reviewState: ReviewState) {
  return reviewState[field.fieldId]?.timestamp ?? field.reviewTimestamp
}

function setFieldState(
  reviewState: ReviewState,
  field: ECFieldCatalogueItem,
  next: Partial<{ status: ECFieldValidationStatus; comment: string }>,
): ReviewState {
  const previous = reviewState[field.fieldId] ?? {
    status: field.validationStatus,
    comment: field.reviewerComment,
    timestamp: field.reviewTimestamp,
  }
  return {
    ...reviewState,
    [field.fieldId]: {
      ...previous,
      ...next,
      timestamp: new Date().toISOString(),
    },
  }
}

function FieldMeta({ field }: { field: ECFieldCatalogueItem }) {
  return (
    <dl className="grid gap-2 text-xs text-ink-muted sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="font-medium text-ink">Section</dt>
        <dd>{field.section} / {field.subSection}</dd>
      </div>
      <div>
        <dt className="font-medium text-ink">Mandatory</dt>
        <dd>{field.mandatoryRule || field.conditionalRule || 'Optional'}</dd>
      </div>
      <div>
        <dt className="font-medium text-ink">Editability</dt>
        <dd>{field.editability || field.editabilityKind}</dd>
      </div>
      <div>
        <dt className="font-medium text-ink">DB reference</dt>
        <dd>{field.dbMapping.table || '—'} {field.dbMapping.field ? `· ${field.dbMapping.field}` : ''}</dd>
      </div>
    </dl>
  )
}

export default function ECFieldCataloguePage() {
  const [query, setQuery] = useState('')
  const [process, setProcess] = useState<'all' | 'Hiring' | 'Maintain'>('all')
  const [section, setSection] = useState('all')
  const [subSection, setSubSection] = useState('all')
  const [profileTab, setProfileTab] = useState<'all' | ECFieldProfileTab>('all')
  const [employeeGroup, setEmployeeGroup] = useState('all')
  const [mandatory, setMandatory] = useState<'all' | 'required' | 'conditional' | 'optional'>('all')
  const [editability, setEditability] = useState<'all' | 'editable' | 'fixed' | 'history_log' | 'unspecified'>('all')
  const [hrConfirmOnly, setHrConfirmOnly] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | ECFieldValidationStatus>('all')
  const [activeFormTab, setActiveFormTab] = useState<ECFieldProfileTab>('personal')
  const [reviewState, setReviewState] = useState<ReviewState>({})
  const [sampleValues, setSampleValues] = useState<Record<string, string>>({})

  const filteredFields = useMemo(() => {
    const search = query.trim().toLowerCase()
    return EC_FIELD_CATALOGUE.filter((field) => {
      const currentStatus = statusFor(field, reviewState)
      const matchesSearch = !search || [
        field.label,
        field.labelEn,
        field.section,
        field.subSection,
        field.validationNote,
        field.dbMapping.table,
        field.dbMapping.field,
      ].join(' ').toLowerCase().includes(search)
      return (
        matchesSearch &&
        (process === 'all' || field.process === process) &&
        (section === 'all' || field.section === section) &&
        (subSection === 'all' || field.subSection === subSection) &&
        (profileTab === 'all' || field.profileTab === profileTab) &&
        (employeeGroup === 'all' || field.employeeGroups.some((group) => group.group === employeeGroup)) &&
        (mandatory === 'all' || field.mandatoryKind === mandatory) &&
        (editability === 'all' || field.editabilityKind === editability) &&
        (!hrConfirmOnly || field.hrConfirmRequired || currentStatus === 'needs_change') &&
        (statusFilter === 'all' || currentStatus === statusFilter)
      )
    })
  }, [query, process, section, subSection, profileTab, employeeGroup, mandatory, editability, hrConfirmOnly, statusFilter, reviewState])

  const visibleFields = filteredFields.slice(0, 80)
  const formFields = EC_FIELD_CATALOGUE.filter((field) => field.profileTab === activeFormTab).slice(0, 14)
  const needsReviewCount = EC_FIELD_CATALOGUE.filter((field) => statusFor(field, reviewState) === 'needs_change' || field.hrConfirmRequired).length
  const confirmedCount = EC_FIELD_CATALOGUE.filter((field) => statusFor(field, reviewState) === 'confirmed').length

  function updateStatus(field: ECFieldCatalogueItem, status: ECFieldValidationStatus) {
    setReviewState((current) => setFieldState(current, field, { status }))
  }

  function updateComment(field: ECFieldCatalogueItem, comment: string) {
    setReviewState((current) => setFieldState(current, field, { comment }))
  }

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      <section className="humi-card humi-grain" style={{ overflow: 'hidden' }}>
        <div className="humi-eyebrow">EC FIELD CATALOGUE</div>
        <h1 className="font-display text-[24px] font-semibold text-ink">แคตตาล็อกฟิลด์ Employee Central สำหรับ HR validation</h1>
        <p className="mt-2 max-w-4xl text-small text-ink-muted">
          Prototype นี้สร้างจาก CSV แบบ build-time/static artefact เพื่อให้ HR ตรวจครบทุกฟิลด์ก่อน production sprint — ไม่มี backend, API หรือ runtime upload ใน phase นี้
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label="EC field catalogue summary">
          <div className="humi-card humi-card--cream p-4">
            <div className="humi-eyebrow">ทั้งหมด</div>
            <div className="font-display text-[26px] font-semibold text-ink" data-testid="ec-total-fields">{EC_FIELD_CATALOGUE_SUMMARY.totalFields}</div>
            <div className="text-xs text-ink-muted">CSV UI field rows</div>
          </div>
          <div className="humi-card p-4">
            <div className="humi-eyebrow">Hiring</div>
            <div className="font-display text-[22px] font-semibold text-ink">{EC_FIELD_CATALOGUE_SUMMARY.byProcess.Hiring}</div>
          </div>
          <div className="humi-card p-4">
            <div className="humi-eyebrow">Maintain</div>
            <div className="font-display text-[22px] font-semibold text-ink">{EC_FIELD_CATALOGUE_SUMMARY.byProcess.Maintain}</div>
          </div>
          <div className="humi-card p-4">
            <div className="humi-eyebrow">ต้องตรวจ</div>
            <div className="font-display text-[22px] font-semibold text-[color:var(--color-danger)]" data-testid="ec-needs-review-count">{needsReviewCount}</div>
          </div>
          <div className="humi-card p-4">
            <div className="humi-eyebrow">ยืนยันแล้ว</div>
            <div className="font-display text-[22px] font-semibold text-accent">{confirmedCount}</div>
          </div>
        </div>
      </section>

      <section className="humi-card" aria-label="ตัวกรอง field catalogue">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
          <label className="text-xs font-medium text-ink-muted md:col-span-2">
            ค้นหา
            <input className="humi-input mt-1 w-full" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ค้นหาชื่อฟิลด์, section, DB reference" />
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Process
            <select className="humi-select mt-1 w-full" value={process} onChange={(event) => setProcess(event.target.value as typeof process)}>
              <option value="all">ทั้งหมด</option>
              <option value="Hiring">Hiring</option>
              <option value="Maintain">Maintain</option>
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Profile tab
            <select className="humi-select mt-1 w-full" value={profileTab} onChange={(event) => setProfileTab(event.target.value as typeof profileTab)}>
              <option value="all">ทุก tab</option>
              {PROFILE_TABS.map((tab) => <option key={tab.key} value={tab.key}>{tab.label}</option>)}
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Section
            <select className="humi-select mt-1 w-full" value={section} onChange={(event) => setSection(event.target.value)}>
              <option value="all">ทุก section</option>
              {allSections.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Sub-section
            <select className="humi-select mt-1 w-full" value={subSection} onChange={(event) => setSubSection(event.target.value)}>
              <option value="all">ทุก sub-section</option>
              {allSubSections.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Employee group
            <select className="humi-select mt-1 w-full" value={employeeGroup} onChange={(event) => setEmployeeGroup(event.target.value)}>
              <option value="all">ทุกกลุ่มพนักงาน</option>
              {allEmployeeGroups.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Mandatory
            <select className="humi-select mt-1 w-full" value={mandatory} onChange={(event) => setMandatory(event.target.value as typeof mandatory)}>
              <option value="all">ทั้งหมด</option>
              <option value="required">Required</option>
              <option value="conditional">Conditional</option>
              <option value="optional">Optional</option>
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Editability
            <select className="humi-select mt-1 w-full" value={editability} onChange={(event) => setEditability(event.target.value as typeof editability)}>
              <option value="all">ทั้งหมด</option>
              <option value="editable">Editable</option>
              <option value="fixed">Fixed</option>
              <option value="history_log">History log</option>
              <option value="unspecified">Unspecified</option>
            </select>
          </label>
          <label className="text-xs font-medium text-ink-muted">
            Review status
            <select className="humi-select mt-1 w-full" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}>
              <option value="all">ทุกสถานะ</option>
              {Object.entries(STATUS_COPY).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 pt-6 text-xs font-medium text-ink-muted">
            <input type="checkbox" checked={hrConfirmOnly} onChange={(event) => setHrConfirmOnly(event.target.checked)} />
            เฉพาะรายการที่ต้อง HR ตรวจ
          </label>
        </div>
        <div className="mt-3 text-small text-ink-muted" data-testid="ec-filtered-count">แสดง {filteredFields.length} ฟิลด์ตามตัวกรอง</div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
        <div className="humi-card" aria-label="รายการฟิลด์ EC">
          <div className="humi-row mb-3">
            <div>
              <div className="humi-eyebrow">Unified catalogue</div>
              <h2 className="font-display text-[18px] font-semibold text-ink">รายการฟิลด์สำหรับตรวจสอบ</h2>
            </div>
            <span className="humi-tag ml-auto">แสดงตัวอย่าง {visibleFields.length} รายการแรก</span>
          </div>
          <div className="space-y-3">
            {visibleFields.map((field) => {
              const currentStatus = statusFor(field, reviewState)
              return (
                <article key={field.fieldId} className="rounded-md border border-hairline bg-surface p-4" data-testid="ec-field-card">
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[16px] font-semibold text-ink">{field.label}</h3>
                        <span className="humi-tag">{field.process}</span>
                        <span className="humi-tag">{PROFILE_TABS.find((tab) => tab.key === field.profileTab)?.label}</span>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] ${STATUS_TONE[currentStatus]}`}>{STATUS_COPY[currentStatus]}</span>
                      </div>
                      <p className="mt-1 text-xs text-ink-muted">Source row {field.sourceRow} · {field.labelEn}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(STATUS_COPY).map(([status, label]) => (
                        <button
                          key={status}
                          type="button"
                          className="rounded-full border border-hairline px-2.5 py-1 text-[11px] text-ink-muted hover:border-accent hover:text-accent"
                          onClick={() => updateStatus(field, status as ECFieldValidationStatus)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3"><FieldMeta field={field} /></div>
                  {(field.validationNote || field.hrConfirmDetail || field.defaultValue || field.remark) && (
                    <div className="mt-3 rounded-md bg-canvas-soft p-3 text-xs text-ink-muted">
                      {field.defaultValue && <p><b className="text-ink">Default:</b> {field.defaultValue}</p>}
                      {field.validationNote && <p><b className="text-ink">Validation:</b> {field.validationNote}</p>}
                      {field.hrConfirmDetail && <p><b className="text-ink">HR confirm:</b> {field.hrConfirmDetail}</p>}
                      {field.remark && <p><b className="text-ink">Remark:</b> {field.remark}</p>}
                    </div>
                  )}
                  <label className="mt-3 block text-xs font-medium text-ink-muted">
                    Reviewer comment
                    <textarea
                      className="humi-input mt-1 w-full"
                      rows={2}
                      value={commentFor(field, reviewState)}
                      onChange={(event) => updateComment(field, event.target.value)}
                      placeholder="บันทึก comment สำหรับ HR validation"
                    />
                  </label>
                  {timestampFor(field, reviewState) && <p className="mt-1 text-[11px] text-ink-muted">Last updated: {timestampFor(field, reviewState)}</p>}
                </article>
              )
            })}
          </div>
        </div>

        <aside className="humi-card" aria-label="Expanded prototype forms">
          <div className="humi-eyebrow">Prototype forms</div>
          <h2 className="font-display text-[18px] font-semibold text-ink">ฟอร์มตัวอย่างตาม profile tabs เดิม</h2>
          <p className="mt-1 text-small text-ink-muted">ฟอร์มนี้เป็น mock/local state เพื่อ walkthrough เท่านั้น</p>
          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Profile tab prototype selector">
            {PROFILE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeFormTab === tab.key}
                onClick={() => setActiveFormTab(tab.key)}
                className={`rounded-full border px-3 py-1.5 text-xs ${activeFormTab === tab.key ? 'border-accent bg-accent-soft text-accent' : 'border-hairline bg-surface text-ink-muted'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {formFields.map((field) => {
              const value = sampleValues[field.fieldId] ?? ''
              const needsValue = field.mandatoryKind === 'required' && !value
              return (
                <div key={field.fieldId} className="rounded-md border border-hairline bg-canvas-soft p-3">
                  <label className="block text-xs font-medium text-ink">
                    {field.label}
                    {field.mandatoryKind !== 'optional' && <span className="ml-1 text-[color:var(--color-danger)]">*</span>}
                    <input
                      className="humi-input mt-1 w-full"
                      value={value}
                      onChange={(event) => setSampleValues((current) => ({ ...current, [field.fieldId]: event.target.value }))}
                      placeholder={field.defaultValue || field.validationNote || 'ระบุตัวอย่างข้อมูล'}
                    />
                  </label>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px] text-ink-muted">
                    <span className="humi-tag">{field.process}</span>
                    <span className="humi-tag">{field.mandatoryKind}</span>
                    <span className="humi-tag">{field.editabilityKind}</span>
                  </div>
                  {needsValue && <p className="mt-1 text-[11px] text-[color:var(--color-danger)]">ต้องกรอกตัวอย่างสำหรับฟิลด์ Required</p>}
                </div>
              )
            })}
          </div>
        </aside>
      </section>
    </div>
  )
}

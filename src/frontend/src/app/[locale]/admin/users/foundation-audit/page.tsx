// VALIDATION_EXEMPT: admin landing/audit page — filter inputs only, no submit form (per design-gates Track C 2026-04-26)
'use client'

// foundation-audit/page.tsx — Revised Foundation Audit (BRD #188)
// AC-7: Timeline view + expandable DiffViewer + filter chips
// Actor: HRIS Admin (Rule 70)
import { useState } from 'react'
import { Building2, Building, Folder, Wallet, AlertTriangle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { FoundationAuditEntry, FoundationEntityType } from '@/lib/admin/types/usersPermissions'

const ENTITY_LABELS: Record<FoundationEntityType, string> = {
  COMPANY: 'บริษัท',
  DIVISION: 'หน่วยงาน',
  DEPARTMENT: 'แผนก',
  COST_CENTER: 'Cost Center',
}

// icon ต่อ entity type
const ENTITY_ICON: Record<FoundationEntityType, LucideIcon> = {
  COMPANY: Building2,
  DIVISION: Building,
  DEPARTMENT: Folder,
  COST_CENTER: Wallet,
}

const ENTITY_OPTIONS: FoundationEntityType[] = ['COMPANY', 'DIVISION', 'DEPARTMENT', 'COST_CENTER']

// -----------------------------------------------------------------------
// DiffViewer — side-by-side before/after
// -----------------------------------------------------------------------
function DiffViewer({
  entry,
}: {
  entry: FoundationAuditEntry
}) {
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-hairline">
      <div className="grid grid-cols-2 text-xs">
        <div className="bg-danger-soft px-3 py-2 border-r border-hairline">
          <p className="font-medium text-danger-ink mb-1.5">ก่อนเปลี่ยน</p>
          <p className="font-mono text-ink-soft">
            <span className="font-semibold text-ink-muted">{entry.fieldChanged}:</span>{' '}
            {entry.oldValue !== null ? (
              <del className="text-danger-ink no-underline line-through">{String(entry.oldValue)}</del>
            ) : (
              <span className="text-ink-faint italic">ว่าง</span>
            )}
          </p>
        </div>
        <div className="bg-success-soft px-3 py-2">
          <p className="font-medium text-success mb-1.5">หลังเปลี่ยน</p>
          <p className="font-mono text-ink-soft">
            <span className="font-semibold text-ink-muted">{entry.fieldChanged}:</span>{' '}
            {entry.newValue !== null ? (
              <ins className="text-success no-underline">{String(entry.newValue)}</ins>
            ) : (
              <span className="text-ink-faint italic">ว่าง</span>
            )}
          </p>
        </div>
      </div>
      {entry.changeReason && (
        <div className="bg-canvas-soft px-3 py-2 border-t border-hairline">
          <p className="text-xs text-ink-muted">
            <span className="font-medium">เหตุผล:</span> {entry.changeReason}
          </p>
        </div>
      )}
    </div>
  )
}

// -----------------------------------------------------------------------
// TimelineEntry — single entry row
// -----------------------------------------------------------------------
function TimelineEntry({ entry }: { entry: FoundationAuditEntry }) {
  const [expanded, setExpanded] = useState(false)
  const EntityIcon = ENTITY_ICON[entry.entityType]
  const label = ENTITY_LABELS[entry.entityType]

  const isFutureHireSync = false // ใน Wave 1 ไม่มี futureHireSyncAffected field — placeholder

  return (
    <li className="relative flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border-2 border-accent-soft shrink-0">
          <EntityIcon size={16} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
        </div>
        <div className="flex-1 w-px bg-hairline mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium text-accent bg-accent-soft px-2 py-0.5 rounded">
              {label}
            </span>
            <span className="ml-2 text-sm font-semibold text-ink">{entry.entityName}</span>
            <span className="ml-2 text-xs text-ink-faint">({entry.entityId})</span>
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-accent hover:underline shrink-0 mt-0.5"
            aria-expanded={expanded}
            aria-label={expanded ? 'ย่อ diff' : 'ขยาย diff'}
          >
            {expanded ? 'ย่อ ▲' : 'ดูรายละเอียด ▼'}
          </button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
          <span className="text-xs text-ink-muted">
            แก้ไขโดย: <span className="font-medium">{entry.changedByName}</span>
          </span>
          <span className="text-xs text-ink-faint">
            {new Date(entry.changedAt).toLocaleString('th-TH')}
          </span>
        </div>

        {/* Future-Hire SYNC banner ตาม BRD #188 bug-fix */}
        {isFutureHireSync && (
          <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-warning-soft border border-warning rounded text-xs text-warning-ink">
            <AlertTriangle size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>Future-Hire SYNC applied (BRD #188 bug-fix)</span>
          </div>
        )}

        {/* DiffViewer — expandable */}
        {expanded && <DiffViewer entry={entry} />}
      </div>
    </li>
  )
}

// -----------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------
export default function FoundationAuditPage() {
  const foundationAudit = useUsersPermissions((s) => s.foundationAudit)

  const [filterEntity, setFilterEntity] = useState<FoundationEntityType | 'ALL'>('ALL')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  // Filter chips
  function toggleEntityFilter(entity: FoundationEntityType) {
    setFilterEntity((prev) => (prev === entity ? 'ALL' : entity))
  }

  // Apply filters
  const filtered = foundationAudit
    .filter((e) => filterEntity === 'ALL' || e.entityType === filterEntity)
    .filter((e) => {
      if (!filterDateFrom) return true
      return new Date(e.changedAt) >= new Date(filterDateFrom + 'T00:00:00.000Z')
    })
    .filter((e) => {
      if (!filterDateTo) return true
      return new Date(e.changedAt) <= new Date(filterDateTo + 'T23:59:59.999Z')
    })
    // reverse-chronological ตาม AC-7
    .sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime())

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-ink">ประวัติการแก้ไข Foundation</h1>
        <p className="text-sm text-ink-muted mt-0.5">
          BRD #188 — ประวัติการเปลี่ยนแปลง Foundation Data รวมถึง Position Changed events
        </p>
      </div>

      {/* Filter row */}
      <div className="bg-surface rounded-xl border border-hairline shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          {/* Entity filter chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-ink-muted self-center whitespace-nowrap">ประเภท:</span>
            {ENTITY_OPTIONS.map((entity) => {
              const ChipIcon = ENTITY_ICON[entity]
              return (
                <button
                  key={entity}
                  onClick={() => toggleEntityFilter(entity)}
                  aria-pressed={filterEntity === entity}
                  className={[
                    'flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-colors',
                    filterEntity === entity
                      ? 'bg-accent text-white border-accent'
                      : 'bg-surface text-ink-soft border-hairline hover:border-accent',
                  ].join(' ')}
                >
                  <ChipIcon size={12} strokeWidth={1.75} aria-hidden="true" />
                  <span>{ENTITY_LABELS[entity]}</span>
                </button>
              )
            })}
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2 ml-auto">
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="border border-hairline rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="วันเริ่มต้น filter"
            />
            <span className="text-ink-faint text-xs">—</span>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="border border-hairline rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label="วันสิ้นสุด filter"
            />
          </div>
        </div>

        {/* Result count */}
        <div className="mt-3 text-xs text-ink-faint">
          แสดง {filtered.length} รายการ{filterEntity !== 'ALL' && ` — filter: ${ENTITY_LABELS[filterEntity]}`}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-ink-faint">ไม่พบรายการที่ตรงกับเงื่อนไข</div>
      ) : (
        <ul className="space-y-0" aria-label="Timeline การเปลี่ยนแปลง Foundation">
          {filtered.map((entry) => (
            <TimelineEntry key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  )
}

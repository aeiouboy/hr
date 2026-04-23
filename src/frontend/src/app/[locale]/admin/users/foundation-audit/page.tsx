'use client'

// foundation-audit/page.tsx — Revised Foundation Audit (BRD #188)
// AC-7: Timeline view + expandable DiffViewer + filter chips
// Actor: HRIS Admin (Rule 70)
import { useState } from 'react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { FoundationAuditEntry, FoundationEntityType } from '@/lib/admin/types/usersPermissions'

const ENTITY_LABELS: Record<FoundationEntityType, string> = {
  COMPANY: 'บริษัท',
  DIVISION: 'หน่วยงาน',
  DEPARTMENT: 'แผนก',
  COST_CENTER: 'Cost Center',
}

// icon ต่อ entity type
const ENTITY_ICON: Record<FoundationEntityType, string> = {
  COMPANY: '🏢',
  DIVISION: '🏗️',
  DEPARTMENT: '📁',
  COST_CENTER: '💰',
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
    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
      <div className="grid grid-cols-2 text-xs">
        <div className="bg-red-50 px-3 py-2 border-r border-gray-200">
          <p className="font-medium text-red-700 mb-1.5">ก่อนเปลี่ยน</p>
          <p className="font-mono text-gray-700">
            <span className="font-semibold text-gray-500">{entry.fieldChanged}:</span>{' '}
            {entry.oldValue !== null ? (
              <del className="text-red-600 no-underline line-through">{String(entry.oldValue)}</del>
            ) : (
              <span className="text-gray-400 italic">ว่าง</span>
            )}
          </p>
        </div>
        <div className="bg-green-50 px-3 py-2">
          <p className="font-medium text-green-700 mb-1.5">หลังเปลี่ยน</p>
          <p className="font-mono text-gray-700">
            <span className="font-semibold text-gray-500">{entry.fieldChanged}:</span>{' '}
            {entry.newValue !== null ? (
              <ins className="text-green-700 no-underline">{String(entry.newValue)}</ins>
            ) : (
              <span className="text-gray-400 italic">ว่าง</span>
            )}
          </p>
        </div>
      </div>
      {entry.changeReason && (
        <div className="bg-gray-50 px-3 py-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
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
  const icon = ENTITY_ICON[entry.entityType]
  const label = ENTITY_LABELS[entry.entityType]

  const isFutureHireSync = false // ใน Wave 1 ไม่มี futureHireSyncAffected field — placeholder

  return (
    <li className="relative flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-blue-200 text-base shrink-0">
          {icon}
        </div>
        <div className="flex-1 w-px bg-gray-200 mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {label}
            </span>
            <span className="ml-2 text-sm font-semibold text-gray-900">{entry.entityName}</span>
            <span className="ml-2 text-xs text-gray-400">({entry.entityId})</span>
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-blue-600 hover:underline shrink-0 mt-0.5"
            aria-expanded={expanded}
            aria-label={expanded ? 'ย่อ diff' : 'ขยาย diff'}
          >
            {expanded ? 'ย่อ ▲' : 'ดูรายละเอียด ▼'}
          </button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
          <span className="text-xs text-gray-500">
            แก้ไขโดย: <span className="font-medium">{entry.changedByName}</span>
          </span>
          <span className="text-xs text-gray-400">
            {new Date(entry.changedAt).toLocaleString('th-TH')}
          </span>
        </div>

        {/* Future-Hire SYNC banner ตาม BRD #188 bug-fix */}
        {isFutureHireSync && (
          <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
            <span>⚠️</span>
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
        <h1 className="text-xl font-semibold text-gray-900">ประวัติการแก้ไข Foundation</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          BRD #188 — ประวัติการเปลี่ยนแปลง Foundation Data รวมถึง Position Changed events
        </p>
      </div>

      {/* Filter row */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-end">
          {/* Entity filter chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 self-center whitespace-nowrap">ประเภท:</span>
            {ENTITY_OPTIONS.map((entity) => (
              <button
                key={entity}
                onClick={() => toggleEntityFilter(entity)}
                aria-pressed={filterEntity === entity}
                className={[
                  'flex items-center gap-1 px-3 py-1 rounded-full text-xs border transition-colors',
                  filterEntity === entity
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400',
                ].join(' ')}
              >
                <span>{ENTITY_ICON[entity]}</span>
                <span>{ENTITY_LABELS[entity]}</span>
              </button>
            ))}
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2 ml-auto">
            <input
              type="date"
              value={filterDateFrom}
              onChange={(e) => setFilterDateFrom(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="วันเริ่มต้น filter"
            />
            <span className="text-gray-400 text-xs">—</span>
            <input
              type="date"
              value={filterDateTo}
              onChange={(e) => setFilterDateTo(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="วันสิ้นสุด filter"
            />
          </div>
        </div>

        {/* Result count */}
        <div className="mt-3 text-xs text-gray-400">
          แสดง {filtered.length} รายการ{filterEntity !== 'ALL' && ` — filter: ${ENTITY_LABELS[filterEntity]}`}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">ไม่พบรายการที่ตรงกับเงื่อนไข</div>
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

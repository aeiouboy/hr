'use client';

// admin/employees/page.tsx — Employee List (S2)
// 1K virtualized rows via @tanstack/react-virtual.
// Search: debounced 200ms, filter name_th / name_en / employee_id prefix.
// Row click → /[locale]/admin/employees/[id] (S3 territory).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Users2 } from 'lucide-react';
import { useEmployees } from '@/lib/admin/store/useEmployees';
import type { MockEmployee } from '@/mocks/employees';

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const ROW_HEIGHT = 48       // px — fixed height for virtualizer estimate
const HEADER_HEIGHT = 40    // px — thead row

// ──────────────────────────────────────────────
// Helpers — badge renderers (no JSX ternary chains)
// ──────────────────────────────────────────────

function classBadge(cls: MockEmployee['employee_class']) {
  const styles: Record<MockEmployee['employee_class'], React.CSSProperties> = {
    PERMANENT: {
      background: 'var(--color-accent-soft)',
      color: 'var(--color-accent)',
    },
    PARTIME: {
      background: 'var(--color-info-soft)',
      color: 'var(--color-info)',
    },
  }
  const labels: Record<MockEmployee['employee_class'], string> = {
    PERMANENT: 'ประจำ',
    PARTIME: 'พาร์ทไทม์',
  }
  return { style: styles[cls], label: labels[cls] }
}

function probationBadge(ps: MockEmployee['probation_status']) {
  type StyleMap = Record<MockEmployee['probation_status'], React.CSSProperties>
  type LabelMap = Record<MockEmployee['probation_status'], string>

  const styles: StyleMap = {
    in_probation: { background: 'var(--color-warning-soft)', color: '#92400E' },
    passed:       { background: 'var(--color-success-soft)', color: '#065F46' },
    extended:     { background: 'var(--color-danger-soft)',  color: 'var(--color-danger-ink)' },
    terminated:   { background: 'var(--color-canvas)',       color: 'var(--color-ink-muted)' },
  }
  const labels: LabelMap = {
    in_probation: 'ทดลองงาน',
    passed:       'ผ่าน',
    extended:     'ต่อเวลา',
    terminated:   'สิ้นสุด',
  }
  return { style: styles[ps], label: labels[ps] }
}

function statusBadge(status: MockEmployee['status']) {
  type StyleMap = Record<MockEmployee['status'], React.CSSProperties>
  const styles: StyleMap = {
    active:     { background: 'var(--color-success-soft)', color: '#065F46' },
    inactive:   { background: 'var(--color-canvas)',       color: 'var(--color-ink-muted)' },
    terminated: { background: 'var(--color-danger-soft)',  color: 'var(--color-danger-ink)' },
  }
  const labels: Record<MockEmployee['status'], string> = {
    active:     'ปกติ',
    inactive:   'ไม่ใช้งาน',
    terminated: 'พ้นสภาพ',
  }
  return { style: styles[status], label: labels[status] }
}

// ──────────────────────────────────────────────
// Badge component (shared style)
// ──────────────────────────────────────────────

function Chip({ label, style }: { label: string; style: React.CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        lineHeight: '18px',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {label}
    </span>
  )
}

// ──────────────────────────────────────────────
// Column config
// ──────────────────────────────────────────────

const COLUMNS = [
  { key: 'employee_id',      label: 'รหัสพนักงาน', width: 120 },
  { key: 'name_th',          label: 'ชื่อ (TH)',    width: 200 },
  { key: 'employee_class',   label: 'ประเภท',       width: 110 },
  { key: 'hire_date',        label: 'วันที่เริ่มงาน', width: 120 },
  { key: 'company',          label: 'บริษัท',       width: 90  },
  { key: 'position_title',   label: 'ตำแหน่ง',      width: 200 },
  { key: 'probation_status', label: 'ทดลองงาน',     width: 110 },
  { key: 'status',           label: 'สถานะ',        width: 90  },
]

// ──────────────────────────────────────────────
// Row component (memoized — skip re-render unless employee changes)
// ──────────────────────────────────────────────

const EmployeeRow = ({
  employee,
  style,
  onClick,
}: {
  employee: MockEmployee
  style: React.CSSProperties
  onClick: (id: string) => void
}) => {
  const cls = classBadge(employee.employee_class)
  const prob = probationBadge(employee.probation_status)
  const stat = statusBadge(employee.status)

  return (
    <div
      role="row"
      tabIndex={0}
      aria-label={`พนักงาน ${employee.first_name_th} ${employee.last_name_th}`}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--color-hairline-soft)',
        cursor: 'pointer',
        transition: 'background 80ms',
      }}
      onClick={() => onClick(employee.employee_id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(employee.employee_id)
        }
      }}
      className="humi-emp-row"
      // CSS var so sticky cells inherit hover state without overriding row class
      data-row="true"
    >
      {/* Employee ID — sticky-left so identity stays visible during horizontal scroll */}
      <div className="humi-emp-sticky" style={{ width: COLUMNS[0].width, flexShrink: 0, padding: '0 12px', fontSize: 12, fontWeight: 600, color: 'var(--color-ink-muted)', fontFamily: 'var(--font-mono)', position: 'sticky', left: 0, zIndex: 1, background: 'var(--row-bg)' }}>
        {employee.employee_id}
      </div>
      {/* Name TH — sticky-left, pinned right after Employee ID */}
      <div className="humi-emp-sticky" style={{ width: COLUMNS[1].width, flexShrink: 0, padding: '0 12px', fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', position: 'sticky', left: COLUMNS[0].width, zIndex: 1, background: 'var(--row-bg)' }}>
        {employee.first_name_th} {employee.last_name_th}
      </div>
      {/* Employee class */}
      <div style={{ width: COLUMNS[2].width, flexShrink: 0, padding: '0 12px' }}>
        <Chip label={cls.label} style={cls.style} />
      </div>
      {/* Hire date */}
      <div style={{ width: COLUMNS[3].width, flexShrink: 0, padding: '0 12px', fontSize: 12, color: 'var(--color-ink-soft)' }}>
        {employee.hire_date}
      </div>
      {/* Company */}
      <div style={{ width: COLUMNS[4].width, flexShrink: 0, padding: '0 12px', fontSize: 12, fontWeight: 600, color: 'var(--color-ink-soft)' }}>
        {employee.company}
      </div>
      {/* Position */}
      <div style={{ flex: 1, minWidth: COLUMNS[5].width, padding: '0 12px', fontSize: 12, color: 'var(--color-ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {employee.position_title}
      </div>
      {/* Probation status */}
      <div style={{ width: COLUMNS[6].width, flexShrink: 0, padding: '0 12px' }}>
        <Chip label={prob.label} style={prob.style} />
      </div>
      {/* Status */}
      <div style={{ width: COLUMNS[7].width, flexShrink: 0, padding: '0 12px' }}>
        <Chip label={stat.label} style={stat.style} />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────

export default function EmployeesPage() {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'th'

  const { setSearchQuery, searchQuery, getFiltered } = useEmployees()
  const allEmployeesCount = useEmployees((s) => s.all.length)
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Debounce 200ms before committing to store
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(localQuery), 200)
    return () => clearTimeout(t)
  }, [localQuery, setSearchQuery])

  // Empty-by-default: don't render the full 1K row list until the user actually
  // types a search. Ken 2026-04-24: "ข้อมูลยังไม่ควรโหลดขึ้นมาถ้ายังไม่มีการ
  // Search" — avoids accidental-weight first paint + signals search-driven UX.
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return []
    return getFiltered()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  const handleRowClick = useCallback(
    (id: string) => {
      router.push(`/${locale}/admin/employees/${id}`)
    },
    [router, locale],
  )

  // Virtualizer — row count × fixed row height
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // humi-main top padding consumed by sticky topbar
        minHeight: 0,
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <div
        style={{
          padding: '20px 0 16px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent-soft)',
              color: 'var(--color-accent)',
              flexShrink: 0,
            }}
          >
            <Users2 size={20} aria-hidden />
          </div>
          <div>
            <div className="humi-eyebrow">Employee Data</div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--color-ink)',
                lineHeight: 1.2,
              }}
            >
              ข้อมูลพนักงาน
            </h1>
          </div>
          <span
            style={{
              marginLeft: 'auto',
              padding: '3px 10px',
              borderRadius: 999,
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-ink-soft)',
            }}
          >
            {filtered.length.toLocaleString('th-TH')} รายการ
          </span>
        </div>

        {/* Search input */}
        <div style={{ position: 'relative', maxWidth: 440 }}>
          <Search
            size={15}
            aria-hidden
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-ink-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="search"
            placeholder="ค้นหาด้วยชื่อ หรือรหัสพนักงาน..."
            aria-label="ค้นหาพนักงาน"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)',
              background: 'var(--color-surface)',
              color: 'var(--color-ink)',
              fontSize: 13,
              outline: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'border-color 120ms, box-shadow 120ms',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-soft)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-hairline)'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
          />
        </div>
      </div>

      {/* ── Table container ─────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-hairline)',
          background: 'var(--color-surface)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Scrollable tbody — virtualized; thead lives inside as sticky so it
            survives narrow viewports where outer flex-height can collapse.
            position:sticky within the scroll parent keeps header pinned
            regardless of how the page around us behaves. */}
        <div
          ref={scrollRef}
          role="rowgroup"
          aria-label="รายการพนักงาน"
          style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}
        >
          <div
            role="rowgroup"
            aria-label="หัวตาราง"
            style={{
              display: 'flex',
              alignItems: 'center',
              height: HEADER_HEIGHT,
              background: 'var(--color-canvas)',
              borderBottom: '1px solid var(--color-hairline)',
              position: 'sticky',
              top: 0,
              zIndex: 2,
            }}
          >
            {COLUMNS.map((col, idx) => {
              const stickyLeft =
                idx === 0 ? 0 : idx === 1 ? COLUMNS[0].width : undefined
              const isSticky = stickyLeft !== undefined
              return (
                <div
                  key={col.key}
                  role="columnheader"
                  style={{
                    width: col.key === 'position_title' ? undefined : col.width,
                    flex: col.key === 'position_title' ? 1 : undefined,
                    minWidth: col.key === 'position_title' ? col.width : undefined,
                    flexShrink: col.key === 'position_title' ? undefined : 0,
                    padding: '0 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-muted)',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    ...(isSticky && {
                      position: 'sticky',
                      left: stickyLeft,
                      background: 'var(--color-canvas)',
                      zIndex: 3,
                    }),
                  }}
                >
                  {col.label}
                </div>
              )
            })}
          </div>
          {filtered.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: 220,
                gap: 8,
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--color-ink-muted)',
                fontSize: 13,
              }}
            >
              <Users2 size={32} style={{ opacity: 0.35 }} aria-hidden />
              {searchQuery.trim() ? (
                <span>ไม่พบพนักงานที่ตรงกับการค้นหา</span>
              ) : (
                <>
                  <span>เริ่มต้นด้วยการค้นหาชื่อหรือรหัสพนักงาน</span>
                  <span style={{ fontSize: 11, opacity: 0.75 }}>
                    มีพนักงานทั้งหมด {allEmployeesCount.toLocaleString('th-TH')} คนในระบบ
                  </span>
                </>
              )}
            </div>
          ) : (
            /* Outer div sized to total virtual height — virtualizer positions rows inside */
            <div style={{ height: totalSize, width: '100%', position: 'relative' }}>
              {virtualItems.map((vItem) => {
                const employee = filtered[vItem.index]
                return (
                  <EmployeeRow
                    key={employee.employee_id}
                    employee={employee}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: ROW_HEIGHT,
                      transform: `translateY(${vItem.start}px)`,
                    }}
                    onClick={handleRowClick}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Row hover + sticky-left cell bg — injected once */}
      <style>{`
        .humi-emp-row { --row-bg: var(--color-surface); }
        .humi-emp-row:hover { background: var(--color-canvas); --row-bg: var(--color-canvas); }
        .humi-emp-row:focus-visible { outline: 2px solid var(--color-accent); outline-offset: -2px; }
      `}</style>
    </div>
  )
}

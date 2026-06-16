'use client';

// admin/employees/page.tsx — Employee List (S2)
// 1K virtualized rows via @tanstack/react-virtual.
// Search: debounced 200ms, filter name_th / name_en / employee_id prefix.
// Row click → /[locale]/admin/employees/[id] (S3 territory).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Users2, Lock, Download, Upload, UserPlus } from 'lucide-react';
import { useEmployees } from '@/lib/admin/store/useEmployees';
import type { MockEmployee } from '@/mocks/employees';
import { useAuthStore } from '@/stores/auth-store';
import { pickScopeMode } from '@/lib/scope-filter';
import { exportToCSV, type CsvColumn } from '@/lib/admin/utils/csvExport';
import { maskValue } from '@/lib/date';
import { DraftFormTray } from './DraftFormTray';

// STA-114: tab keys for the Employees / Draft Form tab strip (URL ?tab=).
type EmployeesTab = 'employees' | 'drafts';

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

// CSV column config for the shared exportToCSV util (UTF-8 BOM + Thai headers).
// employee_id is treated as a sensitive identifier \u2192 masked via maskValue()
// (keeps last 4 chars visible) per the CLAUDE.md "mask sensitive fields in
// exports" rule. No real PII (bank / national id) exists on MockEmployee.
const EMPLOYEE_CSV_COLUMNS: CsvColumn<MockEmployee>[] = [
  { header: '\u0E23\u0E2B\u0E31\u0E2A\u0E1E\u0E19\u0E31\u0E01\u0E07\u0E32\u0E19', accessor: (e) => maskValue(e.employee_id, 4) },
  { header: '\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 (TH)', accessor: (e) => `${e.first_name_th} ${e.last_name_th}` },
  { header: '\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17', accessor: 'employee_class' },
  { header: '\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E34\u0E48\u0E21\u0E07\u0E32\u0E19', accessor: 'hire_date' },
  { header: '\u0E1A\u0E23\u0E34\u0E29\u0E31\u0E17', accessor: 'company' },
  { header: '\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07', accessor: 'position_title' },
  { header: '\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19', accessor: 'org_unit' },
  { header: '\u0E17\u0E14\u0E25\u0E2D\u0E07\u0E07\u0E32\u0E19', accessor: 'probation_status' },
  { header: '\u0E2A\u0E16\u0E32\u0E19\u0E30', accessor: 'status' },
]

function getUtcDateStamp() {
  return new Date().toISOString().slice(0, 10)
}

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
  const searchParams = useSearchParams()
  const locale = (params?.locale as string) ?? 'th'
  const tDrafts = useTranslations('drafts')

  // RBAC gate (Track A1, autopilot 2026-04-26): all-employees list is admin-tier
  // only. MockEmployee pool has no managerId/businessUnitId, so direct-reports/BU
  // scope modes are not computable; non-admin personas hit the barrier card and
  // are pointed to /profile/me for self-data.
  const currentRoles = useAuthStore((s) => s.roles)
  const scopeMode = pickScopeMode(currentRoles)

  // STA-114: Draft Form tab is gated on the SAME predicate that gates the whole
  // employees list — scopeMode === 'all' (spd / hr_admin / hr_manager, the Tier A
  // hire-capable personas per pickScopeMode in lib/scope-filter.ts). Non-'all'
  // roles never reach this UI (the barrier card returns below), so the tab is
  // REMOVED (not disabled) for them and ?tab=drafts is inert by construction.
  const tabParam = searchParams.get('tab')
  const activeTab: EmployeesTab =
    scopeMode === 'all' && tabParam === 'drafts' ? 'drafts' : 'employees'

  const setTab = useCallback(
    (tab: EmployeesTab) => {
      const next = new URLSearchParams(searchParams.toString())
      if (tab === 'drafts') next.set('tab', 'drafts')
      else next.delete('tab')
      const qs = next.toString()
      router.replace(qs ? `?${qs}` : '?', { scroll: false })
    },
    [router, searchParams],
  )

  const { setSearchQuery, searchQuery, getFiltered } = useEmployees()
  const allEmployees = useEmployees((s) => s.all)
  const allEmployeesCount = allEmployees.length
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Debounce 200ms before committing to store
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(localQuery), 200)
    return () => clearTimeout(t)
  }, [localQuery, setSearchQuery])

  // Default slice on empty search: show the first DEFAULT_PREVIEW_ROWS of the
  // pool so the demo opens with visible data + an enabled export, instead of an
  // empty table. Typing a query filters the full pool.
  const DEFAULT_PREVIEW_ROWS = 25
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return allEmployees.slice(0, DEFAULT_PREVIEW_ROWS)
    return getFiltered()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, allEmployees])

  const handleRowClick = useCallback(
    (id: string) => {
      router.push(`/${locale}/admin/employees/${id}`)
    },
    [router, locale],
  )

  const handleCsvDownload = useCallback(() => {
    if (filtered.length === 0) return
    exportToCSV(filtered, EMPLOYEE_CSV_COLUMNS, `employees-${getUtcDateStamp()}.csv`)
  }, [filtered])

  const handleImportClick = useCallback(() => {
    router.push(`/${locale}/admin/employees/import`)
  }, [router, locale])

  const handleAddEmployee = useCallback(() => {
    router.push(`/${locale}/admin/hire`)
  }, [router, locale])

  // Virtualizer — row count × fixed row height
  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 8,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const totalSize = virtualizer.getTotalSize()

  // Non-admin persona = no access. Hooks above must stay declared (rules of
  // hooks); barrier render goes here, after hook block.
  if (scopeMode !== 'all') {
    return (
      <div
        data-testid="employees-no-access"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 200px)',
          padding: '40px 24px',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-warning-soft)',
            color: '#92400E',
          }}
        >
          <Lock size={24} aria-hidden />
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--color-ink)',
          }}
        >
          ไม่มีสิทธิ์เข้าถึง
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-ink-soft)', maxWidth: 480 }}>
          รายการพนักงานทั้งหมด สงวนสิทธิ์เฉพาะผู้ดูแลระบบ HR (SPD / HR Admin / HR Manager).
          หากต้องการดูข้อมูลของคุณเอง ใช้หน้า{' '}
          <a
            href={`/${locale}/profile/me`}
            style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}
          >
            โปรไฟล์ของฉัน
          </a>
          {' '}แทน
        </p>
      </div>
    )
  }

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
            {searchQuery.trim()
              ? `${filtered.length.toLocaleString('th-TH')} รายการ`
              : `${allEmployeesCount.toLocaleString('th-TH')} คนในระบบ`}
          </span>
        </div>

        {/* Search input + WYSIWYG export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 'min(100%, 440px)' }}>
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
                minHeight: 44,
                padding: '9px 14px 9px 36px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-hairline)',
                background: 'var(--color-surface)',
                color: 'var(--color-ink)',
                fontSize: 13,
                outline: 'none',
                boxShadow: 'var(--shadow-[var(--shadow-sm)])',
                transition: 'border-color 120ms, box-shadow 120ms',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-soft)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-hairline)'
                e.currentTarget.style.boxShadow = 'var(--shadow-[var(--shadow-sm)])'
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleAddEmployee}
            aria-label="เพิ่มพนักงานใหม่ (จ้างงาน)"
            style={{
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '9px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-accent)',
              background: 'var(--color-accent)',
              color: 'white',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-[var(--shadow-sm)])',
              transition: 'border-color 120ms, box-shadow 120ms',
            }}
          >
            <UserPlus size={16} aria-hidden />
            เพิ่มพนักงาน
          </button>
          <button
            type="button"
            disabled={filtered.length === 0}
            aria-disabled={filtered.length === 0 ? 'true' : 'false'}
            onClick={handleCsvDownload}
            style={{
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '9px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)',
              background: filtered.length === 0 ? 'var(--color-canvas)' : 'var(--color-accent)',
              color: filtered.length === 0 ? 'var(--color-ink-muted)' : 'white',
              fontSize: 13,
              fontWeight: 700,
              cursor: filtered.length === 0 ? 'not-allowed' : 'pointer',
              opacity: filtered.length === 0 ? 0.58 : 1,
              boxShadow: 'var(--shadow-[var(--shadow-sm)])',
              transition: 'border-color 120ms, box-shadow 120ms',
            }}
          >
            <Download size={16} aria-hidden />
            ดาวน์โหลด CSV
          </button>
          <button
            type="button"
            onClick={handleImportClick}
            aria-label="นำเข้าพนักงานแบบกลุ่ม"
            style={{
              minHeight: 44,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '9px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-hairline)',
              background: 'var(--color-surface)',
              color: 'var(--color-ink)',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-[var(--shadow-sm)])',
              transition: 'border-color 120ms, box-shadow 120ms',
            }}
          >
            <Upload size={16} aria-hidden />
            นำเข้า CSV
          </button>
        </div>
      </div>

      {/* ── Tab strip (STA-114): Employees · Draft Form ─── */}
      <div
        role="tablist"
        aria-label={tDrafts('tabEmployees')}
        style={{
          display: 'flex',
          gap: 4,
          borderBottom: '1px solid var(--color-hairline)',
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        {([
          { key: 'employees' as const, label: tDrafts('tabEmployees') },
          { key: 'drafts' as const, label: tDrafts('tabDraftForm') },
        ]).map((tab) => {
          const selected = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(tab.key)}
              style={{
                minHeight: 44,
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: selected
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
                color: selected ? 'var(--color-accent)' : 'var(--color-ink-soft)',
                fontSize: 14,
                fontWeight: selected ? 700 : 600,
                cursor: 'pointer',
                transition: 'color 120ms, border-color 120ms',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Table container ─────────────────────────────── */}
      {/* STA-114: kept MOUNTED across tab switches (CSS show/hide) so the
          @tanstack/react-virtual scroll/measurement state survives. */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: activeTab === 'employees' ? 'flex' : 'none',
          flexDirection: 'column',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-hairline)',
          background: 'var(--color-surface)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-[var(--shadow-sm)])',
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

      {/* ── Draft Form tray (STA-114) ───────────────────── */}
      {activeTab === 'drafts' && (
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <DraftFormTray />
        </div>
      )}

      {/* Row hover + sticky-left cell bg — injected once */}
      <style>{`
        .humi-emp-row { --row-bg: var(--color-surface); }
        .humi-emp-row:hover { background: var(--color-canvas); --row-bg: var(--color-canvas); }
        .humi-emp-row:focus-visible { outline: 2px solid var(--color-accent); outline-offset: -2px; }
      `}</style>
    </div>
  )
}

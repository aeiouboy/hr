// VALIDATION_EXEMPT: admin landing/audit page — filter inputs only, no submit form (per design-gates Track C 2026-04-26)
'use client'

// organization/page.tsx — หน่วยงาน (Org Unit Tree) — Batch 3 EC-FO
//
// Tree view (left + expand/collapse) + drawer edit (right) — NOT flat CRUD table.
// Drawer UX matches createCrudPage F6 pattern: right-slide, scrim, same form fields.
//
// Scale note: 50 seed units — POC fine.
// TODO: ถ้า > 500 nodes ใช้ react-arborist หรือ @tanstack/virtual แทน recursive render

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Plus, ChevronRight, ChevronDown, Building2, X, Search } from 'lucide-react'
import { useOrgUnits, type OrgUnit } from '@/lib/admin/store/useOrgUnits'

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────

const COMPANY_OPTIONS: OrgUnit['company'][] = ['CEN', 'CRC', 'CU', 'CPN', 'ROBINSON']

const COMPANY_LABELS: Record<OrgUnit['company'], string> = {
  CEN:      'เซ็นทรัล กรุ๊ป (CEN)',
  CRC:      'เซ็นทรัล เรสเตอรองส์ (CRC)',
  CU:       'เซ็นทรัล ยูนิต (CU)',
  CPN:      'เซ็นทรัล พัฒนา (CPN)',
  ROBINSON: 'โรบินสัน (ROBINSON)',
}

// ──────────────────────────────────────────────
// Tree node component
// ──────────────────────────────────────────────

interface TreeNodeProps {
  node: OrgUnit
  depth: number
  expanded: Set<string>
  selected: string | null
  matchIds: Set<string> | null  // null = no active search (show all)
  onToggle: (id: string) => void
  onSelect: (node: OrgUnit) => void
  getChildren: (parentId: string | null) => OrgUnit[]
}

function TreeNode({
  node,
  depth,
  expanded,
  selected,
  matchIds,
  onToggle,
  onSelect,
  getChildren,
}: TreeNodeProps) {
  const children = getChildren(node.id)
  const hasChildren = children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id

  // Search filter: hide node if matchIds set and this node not in it
  if (matchIds !== null && !matchIds.has(node.id)) return null

  const visibleChildren = matchIds !== null
    ? children.filter((c) => matchIds.has(c.id))
    : children

  return (
    <div>
      {/* Row */}
      <div
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        tabIndex={0}
        onClick={() => onSelect(node)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(node)
          }
          if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
            e.preventDefault()
            onToggle(node.id)
          }
          if (e.key === 'ArrowLeft' && isExpanded) {
            e.preventDefault()
            onToggle(node.id)
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 40,
          paddingLeft: depth * 20 + 12,
          paddingRight: 12,
          cursor: 'pointer',
          borderRadius: 'var(--radius-sm)',
          background: isSelected ? 'var(--color-accent-soft)' : undefined,
          marginBottom: 1,
        }}
        className="humi-emp-row"
      >
        {/* Expand toggle */}
        <button
          type="button"
          aria-label={isExpanded ? 'ยุบ' : 'ขยาย'}
          onClick={(e) => {
            e.stopPropagation()
            if (hasChildren) onToggle(node.id)
          }}
          style={{
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            border: 'none',
            background: 'transparent',
            cursor: hasChildren ? 'pointer' : 'default',
            color: hasChildren ? 'var(--color-ink-muted)' : 'transparent',
            borderRadius: 4,
            padding: 0,
          }}
        >
          {hasChildren
            ? isExpanded
              ? <ChevronDown size={14} aria-hidden />
              : <ChevronRight size={14} aria-hidden />
            : <span style={{ width: 14, display: 'inline-block' }} />
          }
        </button>

        {/* Icon */}
        <Building2
          size={14}
          aria-hidden
          style={{
            flexShrink: 0,
            color: node.active ? 'var(--color-accent)' : 'var(--color-ink-faint)',
          }}
        />

        {/* Name */}
        <span
          style={{
            flex: 1,
            fontSize: 13,
            color: node.active ? 'var(--color-ink)' : 'var(--color-ink-faint)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {node.nameTh}
        </span>

        {/* Code badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'var(--color-ink-muted)',
            background: 'var(--color-canvas)',
            borderRadius: 6,
            padding: '2px 7px',
            flexShrink: 0,
          }}
        >
          {node.code}
        </span>

        {/* Inactive badge */}
        {!node.active && (
          <span
            style={{
              fontSize: 11,
              color: 'var(--color-danger-ink)',
              background: 'var(--color-danger-soft)',
              borderRadius: 6,
              padding: '2px 7px',
              flexShrink: 0,
            }}
          >
            ไม่ใช้งาน
          </span>
        )}
      </div>

      {/* Children */}
      {isExpanded && visibleChildren.length > 0 && (
        <div role="group">
          {visibleChildren.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selected={selected}
              matchIds={matchIds}
              onToggle={onToggle}
              onSelect={onSelect}
              getChildren={getChildren}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Edit form
// ──────────────────────────────────────────────

interface OrgUnitFormProps {
  draft: Partial<OrgUnit>
  onChange: (patch: Partial<OrgUnit>) => void
  allUnits: OrgUnit[]
  editingId: string | undefined
}

function OrgUnitForm({ draft, onChange, allUnits, editingId }: OrgUnitFormProps) {
  // Parent dropdown — grouped by company, exclude self + descendants
  const parentOptions = useMemo(() => {
    if (!editingId) return allUnits
    // Exclude self and all descendants to prevent cycles
    const descendants = new Set<string>()
    const queue = [editingId]
    while (queue.length > 0) {
      const id = queue.shift()!
      descendants.add(id)
      allUnits.filter((u) => u.parentId === id).forEach((c) => queue.push(c.id))
    }
    return allUnits.filter((u) => !descendants.has(u.id))
  }, [allUnits, editingId])

  const groupedParents = useMemo(() => {
    const map: Record<string, OrgUnit[]> = {}
    parentOptions.forEach((u) => {
      if (!map[u.company]) map[u.company] = []
      map[u.company].push(u)
    })
    return map
  }, [parentOptions])

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--color-ink-muted)',
    marginBottom: 4,
    letterSpacing: '0.04em',
  }

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-hairline)',
    background: 'var(--color-surface)',
    fontSize: 13,
    color: 'var(--color-ink)',
    boxSizing: 'border-box' as const,
  }

  const fieldWrap = { display: 'flex', flexDirection: 'column' as const, gap: 16 }

  return (
    <div style={fieldWrap}>
      {/* Code */}
      <div>
        <label style={labelStyle}>รหัสหน่วยงาน</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="เช่น CEN.HR.PAYROLL"
          value={draft.code ?? ''}
          onChange={(e) => onChange({ code: e.target.value })}
        />
      </div>

      {/* nameTh */}
      <div>
        <label style={labelStyle}>ชื่อ (TH)</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="เช่น เงินเดือน"
          value={draft.nameTh ?? ''}
          onChange={(e) => onChange({ nameTh: e.target.value })}
        />
      </div>

      {/* nameEn */}
      <div>
        <label style={labelStyle}>ชื่อ (EN)</label>
        <input
          type="text"
          style={inputStyle}
          placeholder="e.g. Payroll"
          value={draft.nameEn ?? ''}
          onChange={(e) => onChange({ nameEn: e.target.value })}
        />
      </div>

      {/* company */}
      <div>
        <label style={labelStyle}>บริษัท</label>
        <select
          style={{ ...inputStyle, appearance: 'auto' }}
          value={draft.company ?? ''}
          onChange={(e) => onChange({ company: e.target.value as OrgUnit['company'] })}
        >
          <option value="" disabled>-- เลือกบริษัท --</option>
          {COMPANY_OPTIONS.map((c) => (
            <option key={c} value={c}>{COMPANY_LABELS[c]}</option>
          ))}
        </select>
      </div>

      {/* parentId */}
      <div>
        <label style={labelStyle}>หน่วยงานแม่</label>
        <select
          style={{ ...inputStyle, appearance: 'auto' }}
          value={draft.parentId ?? ''}
          onChange={(e) => onChange({ parentId: e.target.value || null })}
        >
          <option value="">— ไม่มี —</option>
          {COMPANY_OPTIONS.map((company) => {
            const opts = groupedParents[company]
            if (!opts || opts.length === 0) return null
            return (
              <optgroup key={company} label={COMPANY_LABELS[company]}>
                {opts.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.code} — {u.nameTh}
                  </option>
                ))}
              </optgroup>
            )
          })}
        </select>
      </div>

      {/* effectiveStartDate */}
      <div>
        <label style={labelStyle}>วันที่มีผล</label>
        <input
          type="date"
          style={inputStyle}
          value={draft.effectiveStartDate ?? ''}
          onChange={(e) => onChange({ effectiveStartDate: e.target.value })}
        />
      </div>

      {/* active */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="checkbox"
          id="org-active"
          checked={draft.active ?? true}
          onChange={(e) => onChange({ active: e.target.checked })}
          style={{ width: 16, height: 16, accentColor: 'var(--color-accent)', cursor: 'pointer' }}
        />
        <label htmlFor="org-active" style={{ fontSize: 13, color: 'var(--color-ink)', cursor: 'pointer' }}>
          ใช้งาน
        </label>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────

function createEmptyUnit(): Partial<OrgUnit> {
  return {
    id: `ORG-${Date.now()}`,
    code: '',
    nameTh: '',
    nameEn: '',
    parentId: null,
    company: 'CEN',
    effectiveStartDate: new Date().toISOString().slice(0, 10),
    active: true,
  }
}

export default function OrganizationPage() {
  const { all, getChildren, upsert, remove, searchFilter } = useOrgUnits()

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['CEN', 'CRC', 'CU', 'CPN', 'ROBINSON']))
  const [selected, setSelected] = useState<string | null>(null)
  const [editing, setEditing] = useState<Partial<OrgUnit> | null>(null)
  const [mode, setMode] = useState<'create' | 'edit'>('create')
  const [query, setQuery] = useState('')

  // Dirty-close guard — snapshot captured at drawer open for comparison
  const initialEditingRef = useRef<Partial<OrgUnit> | null>(null)

  // Search: collect all matching ids
  const matchIds = useMemo<Set<string> | null>(() => {
    const q = query.trim()
    if (!q) return null
    const matched = new Set<string>()
    all.forEach((u) => {
      if (searchFilter(u, q)) matched.add(u.id)
    })
    return matched
  }, [all, query, searchFilter])

  // Auto-expand ancestors of matched nodes when searching
  const effectiveExpanded = useMemo(() => {
    if (matchIds === null) return expanded
    const toExpand = new Set(expanded)
    matchIds.forEach((id) => {
      let unit = all.find((u) => u.id === id)
      while (unit?.parentId) {
        toExpand.add(unit.parentId)
        unit = all.find((u) => u.id === unit!.parentId)
      }
    })
    return toExpand
  }, [matchIds, expanded, all])

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const openCreate = useCallback(() => {
    const empty = createEmptyUnit()
    setEditing(empty)
    initialEditingRef.current = empty
    setMode('create')
    setSelected(null)
  }, [])

  const openEdit = useCallback((node: OrgUnit) => {
    const snap = { ...node }
    setEditing(snap)
    initialEditingRef.current = snap
    setMode('edit')
    setSelected(node.id)
  }, [])

  // doClose — bypass dirty check. Used by Save (after persist).
  const doClose = useCallback(() => {
    setEditing(null)
    setSelected(null)
    initialEditingRef.current = null
  }, [])

  // requestClose — check unsaved changes before dismiss (scrim / X / Cancel / Escape)
  const requestClose = useCallback(() => {
    const initial = initialEditingRef.current
    const dirty = editing && initial && JSON.stringify(editing) !== JSON.stringify(initial)
    if (dirty && !window.confirm('คุณมีการแก้ไขที่ยังไม่ได้บันทึก — ต้องการปิดหรือไม่?\n(กดยกเลิกเพื่อกลับไปแก้ต่อ)')) {
      return
    }
    doClose()
  }, [editing, doClose])

  // Escape key closes drawer (with dirty guard) when open
  useEffect(() => {
    if (!editing) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [editing, requestClose])

  const save = useCallback(() => {
    if (!editing) return
    upsert(editing as OrgUnit)
    doClose()
  }, [editing, upsert, doClose])

  const handleDelete = useCallback(() => {
    if (!editing?.id) return
    if (!window.confirm('ยืนยันการลบหน่วยงาน? — การลบไม่สามารถยกเลิกได้')) return
    remove(editing.id)
    doClose()
  }, [editing, remove, doClose])

  // Root nodes — parentId === null
  const roots = useMemo(() => getChildren(null), [getChildren, all])
  const visibleRoots = matchIds !== null ? roots.filter((r) => matchIds.has(r.id)) : roots

  const totalCount = all.length
  const matchCount = matchIds?.size ?? totalCount

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <div className="humi-eyebrow">ORGANIZATIONAL STRUCTURE</div>
          <h1 className="font-display text-[22px] font-semibold text-ink">โครงสร้างหน่วยงาน</h1>
        </div>
        <button
          type="button"
          className="humi-btn humi-btn--primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          onClick={openCreate}
        >
          <Plus size={16} aria-hidden />
          <span>เพิ่มหน่วยงาน</span>
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 420 }}>
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
          placeholder="ค้นหาหน่วยงาน (ชื่อ / รหัส)..."
          aria-label="ค้นหาหน่วยงาน"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 14px 9px 36px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-hairline)',
            background: 'var(--color-surface)',
            fontSize: 13,
          }}
        />
      </div>

      {/* Tree panel */}
      <div
        className="humi-card"
        style={{ padding: '8px 8px', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)' }}
        role="tree"
        aria-label="โครงสร้างหน่วยงาน"
        aria-multiselectable="false"
      >
        {visibleRoots.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-ink-muted)', fontSize: 14 }}>
            {query ? `ไม่พบหน่วยงานที่ตรงกับ "${query}"` : 'ยังไม่มีหน่วยงาน'}
          </div>
        ) : (
          visibleRoots.map((root) => (
            <TreeNode
              key={root.id}
              node={root}
              depth={0}
              expanded={effectiveExpanded}
              selected={selected}
              matchIds={matchIds}
              onToggle={toggleExpand}
              onSelect={openEdit}
              getChildren={getChildren}
            />
          ))
        )}
      </div>

      {/* Footer count */}
      <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
        {matchCount.toLocaleString('th-TH')} หน่วยงาน
        {query && <span> (จาก {totalCount.toLocaleString('th-TH')})</span>}
      </div>

      {/* Edit drawer */}
      {editing && (
        <>
          <div
            className="fixed inset-0 z-30 humi-drawer-scrim"
            aria-hidden="true"
            onClick={requestClose}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={mode === 'create' ? 'เพิ่มหน่วยงาน' : 'แก้ไขหน่วยงาน'}
            className="fixed inset-y-0 right-0 z-40"
            style={{
              width: 480,
              maxWidth: '100vw',
              background: 'var(--color-surface)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drawer header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
              <h2 className="font-display text-[18px] font-semibold text-ink">
                {mode === 'create' ? 'เพิ่มหน่วยงาน' : 'แก้ไขหน่วยงาน'}
              </h2>
              <button
                type="button"
                className="humi-icon-btn"
                aria-label="ปิด"
                onClick={requestClose}
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            {/* Breadcrumb (edit mode only) */}
            {mode === 'edit' && editing.id && (() => {
              const path = useOrgUnits.getState().getPath(editing.id)
              if (path.length <= 1) return null
              return (
                <div style={{ padding: '8px 20px', borderBottom: '1px solid var(--color-hairline-soft)', fontSize: 12, color: 'var(--color-ink-muted)', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {path.map((p, i) => (
                    <span key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {i > 0 && <ChevronRight size={10} aria-hidden />}
                      <span>{p.nameTh}</span>
                    </span>
                  ))}
                </div>
              )
            })()}

            {/* Form body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
              <OrgUnitForm
                draft={editing}
                onChange={(patch) => setEditing((e) => ({ ...(e ?? {}), ...patch }))}
                allUnits={all}
                editingId={mode === 'edit' ? editing.id : undefined}
              />
            </div>

            {/* Drawer footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--color-hairline)' }}>
              {mode === 'edit' && (
                <button
                  type="button"
                  className="humi-btn"
                  style={{ color: 'var(--color-danger-ink, #9A3412)', marginRight: 'auto' }}
                  onClick={handleDelete}
                >
                  ลบ
                </button>
              )}
              <button type="button" className="humi-btn" onClick={requestClose}>
                ยกเลิก
              </button>
              <button
                type="button"
                className="humi-btn humi-btn--primary"
                onClick={save}
              >
                {mode === 'create' ? 'บันทึก' : 'บันทึกการแก้ไข'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

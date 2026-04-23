'use client'

// createCrudPage.tsx — F6 CRUD template (Archetype C)
//
// Reusable list + drawer-edit pattern for master-data maintenance.
// Used by Jobs / Positions / Organization in Phase 1 Batch 3.
//
// Design decisions:
// - Config-object signature (composition-patterns: no boolean props)
// - Template returns { Page } — caller wraps with AdminShell-route
// - Drawer uses right-sliding panel (Humi pattern, not modal) — keeps
//   list context visible for comparison during edit
// - Soft delete optional; default = disable button if remove not provided

import { useCallback, useMemo, useState } from 'react'
import { Plus, Pencil, Search, X } from 'lucide-react'

export interface CrudColumn<TItem> {
  key: keyof TItem
  label: string
  width?: number
  render?: (item: TItem) => React.ReactNode
}

export interface CrudPageConfig<TItem extends { id: string }> {
  name: string
  titleTh: string
  titleEn: string
  columns: CrudColumn<TItem>[]
  useItems: () => TItem[]
  createEmpty: () => Partial<TItem>
  upsert: (item: TItem) => void
  remove?: (id: string) => void
  searchFilter: (item: TItem, q: string) => boolean
  renderForm: (
    item: Partial<TItem>,
    onChange: (patch: Partial<TItem>) => void,
  ) => React.ReactNode
  emptyState?: { icon?: React.ReactNode; titleTh: string; bodyTh?: string }
}

export function createCrudPage<TItem extends { id: string }>(
  config: CrudPageConfig<TItem>,
) {
  function Page() {
    const items = config.useItems()
    const [query, setQuery] = useState('')
    const [editing, setEditing] = useState<Partial<TItem> | null>(null)
    const [mode, setMode] = useState<'create' | 'edit'>('create')

    const filtered = useMemo(
      () =>
        query.trim()
          ? items.filter((i) => config.searchFilter(i, query.trim()))
          : items,
      [items, query],
    )

    const openCreate = useCallback(() => {
      setEditing(config.createEmpty())
      setMode('create')
    }, [])

    const openEdit = useCallback((item: TItem) => {
      setEditing({ ...item })
      setMode('edit')
    }, [])

    const close = useCallback(() => setEditing(null), [])

    const save = useCallback(() => {
      if (!editing) return
      config.upsert(editing as TItem)
      close()
    }, [editing, close])

    return (
      <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div className="humi-eyebrow">{config.titleEn.toUpperCase()}</div>
            <h1 className="font-display text-[22px] font-semibold text-ink">{config.titleTh}</h1>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="humi-btn humi-btn--primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={16} aria-hidden />
            <span>เพิ่มรายการ</span>
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 420 }}>
          <Search size={15} aria-hidden style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-ink-muted)', pointerEvents: 'none' }} />
          <input
            type="search"
            placeholder={`ค้นหา${config.titleTh}...`}
            aria-label={`ค้นหา${config.titleTh}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 14px 9px 36px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-hairline)', background: 'var(--color-surface)', fontSize: 13 }}
          />
        </div>

        {/* List */}
        <div className="humi-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Header row */}
          <div role="row" style={{ display: 'flex', alignItems: 'center', height: 44, background: 'var(--color-canvas)', borderBottom: '1px solid var(--color-hairline)' }}>
            {config.columns.map((col) => (
              <div
                key={String(col.key)}
                role="columnheader"
                style={{
                  width: col.width,
                  flex: col.width ? undefined : 1,
                  padding: '0 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-muted)',
                }}
              >
                {col.label}
              </div>
            ))}
            <div style={{ width: 60, flexShrink: 0 }} />
          </div>

          {/* Body */}
          {filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-ink-muted)' }}>
              {config.emptyState?.titleTh ?? `ไม่พบ${config.titleTh}`}
              {config.emptyState?.bodyTh && (
                <div style={{ marginTop: 8, fontSize: 12 }}>{config.emptyState.bodyTh}</div>
              )}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                role="row"
                className="humi-emp-row"
                style={{ display: 'flex', alignItems: 'center', height: 48, borderBottom: '1px solid var(--color-hairline-soft)' }}
              >
                {config.columns.map((col) => (
                  <div
                    key={String(col.key)}
                    role="cell"
                    style={{
                      width: col.width,
                      flex: col.width ? undefined : 1,
                      padding: '0 12px',
                      fontSize: 13,
                      color: 'var(--color-ink)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.render ? col.render(item) : String(item[col.key] ?? '')}
                  </div>
                ))}
                <div style={{ width: 60, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="humi-icon-btn"
                    aria-label={`แก้ไข${config.titleTh}`}
                    onClick={() => openEdit(item)}
                    style={{ width: 32, height: 32, minWidth: 32, minHeight: 32, padding: 0 }}
                  >
                    <Pencil size={14} aria-hidden style={{ color: 'var(--color-ink-muted)' }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Count footer */}
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
          {filtered.length.toLocaleString('th-TH')} รายการ
          {query && <span> (จาก {items.length.toLocaleString('th-TH')})</span>}
        </div>

        {/* Drawer */}
        {editing && (
          <>
            <div
              className="fixed inset-0 z-30 humi-drawer-scrim"
              aria-hidden="true"
              onClick={close}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={mode === 'create' ? `สร้าง${config.titleTh}` : `แก้ไข${config.titleTh}`}
              className="fixed inset-y-0 right-0 z-40"
              style={{ width: 480, maxWidth: '100vw', background: 'var(--color-surface)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--color-hairline)' }}>
                <h2 className="font-display text-[18px] font-semibold text-ink">
                  {mode === 'create' ? `เพิ่ม${config.titleTh}` : `แก้ไข${config.titleTh}`}
                </h2>
                <button
                  type="button"
                  className="humi-icon-btn"
                  aria-label="ปิด"
                  onClick={close}
                >
                  <X size={18} aria-hidden />
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                {config.renderForm(editing, (patch) => setEditing((e) => ({ ...(e ?? {}), ...patch })))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 20px', borderTop: '1px solid var(--color-hairline)' }}>
                {mode === 'edit' && config.remove && (
                  <button
                    type="button"
                    className="humi-btn"
                    style={{ color: 'var(--color-danger-ink, #dc2626)' }}
                    onClick={() => {
                      if (editing.id) {
                        config.remove!(editing.id)
                        close()
                      }
                    }}
                  >
                    ลบ
                  </button>
                )}
                <button type="button" className="humi-btn" onClick={close}>
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

  return { Page }
}

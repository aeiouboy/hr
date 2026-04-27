'use client'

// tiles/page.tsx — Tile & Home Page Manager (BRD #183)
// drag-drop reorder + Size S/M/L + per-role tab filter + HomeGridPreview right panel
// AC-4 (drag-drop), AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-11
import { useState } from 'react'
import { EditorShell } from '@/components/admin/admin-ss/EditorShell'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import type { HomePageTile, RoleName } from '@/lib/admin/types/adminSelfService'
import { validateThaiPrimary } from '@/lib/admin/utils/thaiPrimary'

// Simple in-memory toast (same pattern as requests/page.tsx)
function useToast() {
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false })
  const show = (msg: string) => {
    setToast({ msg, visible: true })
    setTimeout(() => setToast({ msg: '', visible: false }), 3500)
  }
  return { toast, show }
}

const ROLES: RoleName[]    = ['Employee', 'Manager', 'HRBP', 'SPD']
const SIZES: HomePageTile['size'][] = ['S', 'M', 'L']

// grid col span ตาม size (AC-5: S=1col, M=2col, L=4col)
const SIZE_SPAN: Record<HomePageTile['size'], string> = {
  S: 'col-span-1',
  M: 'col-span-2',
  L: 'col-span-4',
}
const SIZE_LABEL: Record<HomePageTile['size'], string> = {
  S: 'เล็ก (S)',
  M: 'กลาง (M)',
  L: 'ใหญ่ (L)',
}

export default function TilesPage() {
  const tiles    = useAdminSelfService((s) => s.draft.tiles)
  const setTiles = useAdminSelfService((s) => s.setTiles)
  const { toast, show: showToast } = useToast()

  const [roleTab,   setRoleTab]   = useState<RoleName>('Employee')
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [editTarget, setEditTarget] = useState<HomePageTile | null>(null)
  const [modalLabel, setModalLabel] = useState('')
  const [modalSize,  setModalSize]  = useState<HomePageTile['size']>('M')
  const [modalRoles, setModalRoles] = useState<RoleName[]>([])

  // filter tiles ตาม role tab
  const filteredByRole = tiles.filter((t) => t.visibleTo.includes(roleTab))

  // ---- HTML5 drag-drop (AC-4) ----
  function handleDragStart(index: number) { setDragIndex(index) }
  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    // reorder ใน full list โดย map จาก filteredByRole index → full tiles index
    const fullUpdated = [...tiles]
    const filteredIds = filteredByRole.map((t) => t.id)
    const fromId = filteredIds[dragIndex]
    const toId   = filteredIds[index]
    const fromFull = fullUpdated.findIndex((t) => t.id === fromId)
    const toFull   = fullUpdated.findIndex((t) => t.id === toId)
    const [moved] = fullUpdated.splice(fromFull, 1)
    fullUpdated.splice(toFull, 0, moved)
    setTiles(fullUpdated.map((t, i) => ({ ...t, order: i + 1 })))
    setDragIndex(index)
  }
  function handleDrop(e: React.DragEvent) { e.preventDefault(); setDragIndex(null) }

  // ---- mobile up/down (AC-10) ----
  function moveUp(tileId: string) {
    const idx = tiles.findIndex((t) => t.id === tileId)
    if (idx <= 0) return
    const updated = [...tiles]
    ;[updated[idx - 1], updated[idx]] = [updated[idx], updated[idx - 1]]
    setTiles(updated.map((t, i) => ({ ...t, order: i + 1 })))
  }
  function moveDown(tileId: string) {
    const idx = tiles.findIndex((t) => t.id === tileId)
    if (idx === -1 || idx >= tiles.length - 1) return
    const updated = [...tiles]
    ;[updated[idx], updated[idx + 1]] = [updated[idx + 1], updated[idx]]
    setTiles(updated.map((t, i) => ({ ...t, order: i + 1 })))
  }

  // ---- size change ----
  function changeSize(id: string, size: HomePageTile['size']) {
    setTiles(tiles.map((t) => t.id === id ? { ...t, size } : t))
  }

  // ---- enable toggle ----
  function toggleEnabled(id: string) {
    setTiles(tiles.map((t) => t.id === id ? { ...t, enabled: !t.enabled } : t))
  }

  // ---- role visibility toggle ----
  function toggleRole(id: string, role: RoleName) {
    setTiles(tiles.map((t) => {
      if (t.id !== id) return t
      const has = t.visibleTo.includes(role)
      return {
        ...t,
        visibleTo: has ? t.visibleTo.filter((r) => r !== role) : [...t.visibleTo, role],
      }
    }))
  }

  // ---- edit modal ----
  function openEdit(tile: HomePageTile) {
    setEditTarget(tile)
    setModalLabel(tile.label)
    setModalSize(tile.size)
    setModalRoles([...tile.visibleTo])
  }
  function saveModal() {
    if (!editTarget) return
    if (!validateThaiPrimary(modalLabel)) {
      showToast(`"${modalLabel}" — label ต้องมีตัวอักษรไทย (Thai-primary required)`)
      return
    }
    setTiles(tiles.map((t) => t.id === editTarget.id ? { ...t, label: modalLabel, size: modalSize, visibleTo: modalRoles } : t))
    setEditTarget(null)
  }

  return (
    <>
    {/* Thai-primary validation toast */}
    {toast.visible && (
      <div
        role="alert"
        aria-live="assertive"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-3 bg-red-600 text-white shadow-lg text-sm font-medium"
      >
        {toast.msg}
      </div>
    )}
    <EditorShell editor="tiles" titleTh="จัดการ Tiles & Home Page" brd="#183">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main tiles panel */}
        <div className="flex-1 min-w-0">
          {/* Role tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex gap-0">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  role="tab"
                  aria-selected={roleTab === role}
                  onClick={() => setRoleTab(role)}
                  className={['px-4 py-2.5 text-sm font-medium border-b-2 transition-colors', roleTab === role ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'].join(' ')}
                >
                  {role}
                </button>
              ))}
            </nav>
          </div>

          {filteredByRole.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">ไม่มี Tile สำหรับ Role นี้</div>
          )}

          {/* Drag-drop list (sm+) */}
          <div className="hidden sm:flex flex-col gap-2">
            {filteredByRole.map((tile, index) => (
              <div
                key={tile.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={handleDrop}
                className={['flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors', dragIndex === index ? 'opacity-50' : ''].join(' ')}
              >
                {/* drag handle */}
                <div className="text-gray-300 select-none" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="4" y="3" width="8" height="1.5" rx="0.75"/>
                    <rect x="4" y="7" width="8" height="1.5" rx="0.75"/>
                    <rect x="4" y="11" width="8" height="1.5" rx="0.75"/>
                  </svg>
                </div>

                {/* Icon + label */}
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono">{tile.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{tile.label}</div>
                    <div className="flex gap-1 mt-0.5">
                      {tile.visibleTo.map((r) => (
                        <span key={r} className="text-xs bg-gray-100 text-gray-500 px-1 rounded">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Size radio S/M/L */}
                <div className="flex gap-1 shrink-0">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={tile.size === s}
                      aria-label={`ขนาด ${SIZE_LABEL[s]}`}
                      onClick={() => changeSize(tile.id, s)}
                      className={['w-8 h-8 text-xs rounded border font-medium transition-colors', tile.size === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'].join(' ')}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Enable toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={tile.enabled}
                  aria-label={`เปิดใช้ ${tile.label}`}
                  onClick={() => toggleEnabled(tile.id)}
                  className={['relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500', tile.enabled ? 'bg-emerald-600' : 'bg-gray-200'].join(' ')}
                >
                  <span className={['pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200', tile.enabled ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
                </button>

                {/* Edit */}
                <button type="button" onClick={() => openEdit(tile)} className="text-sm text-blue-600 hover:underline shrink-0">แก้ไข</button>
              </div>
            ))}
          </div>

          {/* Stacked mobile (AC-10) */}
          <div className="sm:hidden space-y-3">
            {filteredByRole.map((tile) => (
              <div key={tile.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-mono mr-1">{tile.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{tile.label}</span>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button type="button" onClick={() => moveUp(tile.id)} aria-label="เลื่อนขึ้น" className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">▲</button>
                    <button type="button" onClick={() => moveDown(tile.id)} aria-label="เลื่อนลง" className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">▼</button>
                  </div>
                </div>
                {/* Size + edit row */}
                <div className="mt-3 flex items-center gap-3">
                  {SIZES.map((s) => (
                    <button key={s} type="button" onClick={() => changeSize(tile.id, s)} aria-pressed={tile.size === s}
                      className={['w-8 h-8 text-xs rounded border font-medium', tile.size === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-500 border-gray-300'].join(' ')}>
                      {s}
                    </button>
                  ))}
                  <button type="button" onClick={() => openEdit(tile)} className="ml-auto text-sm text-blue-600 hover:underline">แก้ไข</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HomeGridPreview right panel (AC-5) */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Preview: <span className="text-emerald-600">{roleTab}</span>
            </h3>
            {/* 4-col CSS grid */}
            <div className="grid grid-cols-4 gap-2 auto-rows-[56px]">
              {filteredByRole.filter((t) => t.enabled).map((tile) => (
                <div
                  key={tile.id}
                  className={[
                    'rounded-md bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center px-1 min-w-0',
                    SIZE_SPAN[tile.size],
                  ].join(' ')}
                  aria-label={`Tile: ${tile.label} ขนาด ${tile.size}`}
                >
                  <span className="text-xs text-emerald-700 font-medium text-center leading-tight truncate w-full text-center px-1">{tile.label}</span>
                  <span className="text-[10px] text-emerald-400 mt-0.5">{tile.size}</span>
                </div>
              ))}
              {filteredByRole.filter((t) => t.enabled).length === 0 && (
                <div className="col-span-4 py-6 text-center text-xs text-gray-400">ไม่มี Tile ที่เปิดใช้สำหรับ Role นี้</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label={`แก้ไข Tile ${editTarget.label}`}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">แก้ไข Tile</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ชื่อ</label>
              <input type="text" value={modalLabel} onChange={(e) => setModalLabel(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ขนาด</label>
              <div className="flex gap-3">
                {SIZES.map((s) => (
                  <button key={s} type="button" onClick={() => setModalSize(s)} aria-pressed={modalSize === s}
                    className={['flex-1 py-2 text-sm rounded-md border font-medium', modalSize === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'].join(' ')}>
                    {SIZE_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Roles ที่มองเห็น</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map((role) => {
                  const selected = modalRoles.includes(role)
                  return (
                    <button
                      key={role}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setModalRoles(selected ? modalRoles.filter((r) => r !== role) : [...modalRoles, role])}
                      className={['px-3 py-2 text-sm rounded-md border transition-colors', selected ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'].join(' ')}
                    >
                      {role}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditTarget(null)} className="humi-button humi-button--ghost">ยกเลิก</button>
              <button type="button" onClick={saveModal} className="humi-button humi-button--primary">บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </EditorShell>
    </>
  )
}

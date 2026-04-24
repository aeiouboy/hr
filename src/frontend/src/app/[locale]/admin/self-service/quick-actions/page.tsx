'use client'

// quick-actions/page.tsx — Quick Actions Manager (BRD #182)
// HTML5 native drag-drop reorder + enable/disable toggle + edit label/icon modal
// AC-4, AC-6, AC-7, AC-8, AC-10, AC-11
import { useState } from 'react'
import { EditorShell } from '@/components/admin/admin-ss/EditorShell'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import type { QuickActionTile, RoleName } from '@/lib/admin/types/adminSelfService'

const ROLES: RoleName[] = ['Employee', 'Manager', 'HRBP', 'SPD']

// Lucide icon subset สำหรับ icon picker (hardcoded per spec §5.5)
const ICON_OPTIONS = [
  'FileText', 'MessageSquare', 'ThumbsUp', 'PlusCircle', 'UserCog',
  'Bell', 'CalendarOff', 'Clock', 'User', 'Calendar',
  'CheckCircle', 'Settings', 'Home', 'Mail', 'Star',
  'BarChart', 'Shield', 'Link', 'Briefcase', 'HelpCircle',
]

export default function QuickActionsPage() {
  const quickActions    = useAdminSelfService((s) => s.draft.quickActions)
  const setQuickActions = useAdminSelfService((s) => s.setQuickActions)

  // drag-drop state
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  // modal state
  const [editTarget, setEditTarget] = useState<QuickActionTile | null>(null)
  const [modalLabel, setModalLabel] = useState('')
  const [modalIcon,  setModalIcon]  = useState('')
  const [modalHref,  setModalHref]  = useState('')
  const [modalRoles, setModalRoles] = useState<RoleName[]>([])

  // ---- HTML5 drag-drop handlers (AC-4) ----
  function handleDragStart(index: number) {
    setDragIndex(index)
  }
  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    // reorder items
    const updated = [...quickActions]
    const [moved] = updated.splice(dragIndex, 1)
    updated.splice(index, 0, moved)
    // update order field
    const reordered = updated.map((item, i) => ({ ...item, order: i + 1 }))
    setQuickActions(reordered)
    setDragIndex(index)
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragIndex(null)
  }

  // ---- mobile up/down fallback (AC-10) ----
  function moveUp(index: number) {
    if (index === 0) return
    const updated = [...quickActions]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    setQuickActions(updated.map((item, i) => ({ ...item, order: i + 1 })))
  }
  function moveDown(index: number) {
    if (index === quickActions.length - 1) return
    const updated = [...quickActions]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    setQuickActions(updated.map((item, i) => ({ ...item, order: i + 1 })))
  }

  // ---- toggle enable/disable ----
  function toggleEnabled(id: string) {
    setQuickActions(quickActions.map((qa) => qa.id === id ? { ...qa, enabled: !qa.enabled } : qa))
  }

  // ---- edit modal ----
  function openEdit(qa: QuickActionTile) {
    setEditTarget(qa)
    setModalLabel(qa.label)
    setModalIcon(qa.icon)
    setModalHref(qa.href)
    // QuickActionTile type ไม่มี rolesVisible ใน Wave 1 types — ใช้ enabled proxy แทน
    setModalRoles([])
  }
  function saveModal() {
    if (!editTarget) return
    setQuickActions(quickActions.map((qa) =>
      qa.id === editTarget.id
        ? { ...qa, label: modalLabel, icon: modalIcon, href: modalHref }
        : qa
    ))
    setEditTarget(null)
  }

  // ---- add new quick action ----
  function addNew() {
    const newItem: QuickActionTile = {
      id:      `qa_new_${Date.now()}`,
      label:   'Quick Action ใหม่',
      icon:    'Star',
      href:    '/ess/new',
      enabled: false,
      order:   quickActions.length + 1,
    }
    setQuickActions([...quickActions, newItem])
  }

  return (
    <EditorShell editor="quick-actions" titleTh="จัดการ Quick Actions" brd="#182">
      {/* Add button */}
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={addNew}
          className="humi-button humi-button--primary"
        >
          + เพิ่ม Quick Action
        </button>
      </div>

      {/* Drag-drop list (desktop, sm+) */}
      <div className="hidden sm:block rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 grid grid-cols-[32px_1fr_80px_80px_96px] gap-4 px-4 py-3 text-xs font-medium text-gray-500 uppercase">
          <div />
          <div>ชื่อ / Icon</div>
          <div className="text-center">เปิดใช้</div>
          <div>ลำดับ</div>
          <div />
        </div>
        {quickActions.map((qa, index) => (
          <div
            key={qa.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            className={[
              'grid grid-cols-[32px_1fr_80px_80px_96px] gap-4 px-4 py-3.5 items-center border-b border-gray-100 bg-white',
              'hover:bg-gray-50 cursor-grab active:cursor-grabbing',
              dragIndex === index ? 'opacity-50' : '',
            ].join(' ')}
          >
            {/* drag handle */}
            <div className="text-gray-300 select-none text-center" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="4" y="3" width="8" height="1.5" rx="0.75"/>
                <rect x="4" y="7" width="8" height="1.5" rx="0.75"/>
                <rect x="4" y="11" width="8" height="1.5" rx="0.75"/>
              </svg>
            </div>

            {/* Label + icon */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-mono">{qa.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-800 truncate">{qa.label}</div>
                <div className="text-xs text-gray-400 truncate">{qa.href}</div>
              </div>
            </div>

            {/* Enable toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                role="switch"
                aria-checked={qa.enabled}
                aria-label={`เปิดใช้ ${qa.label}`}
                onClick={() => toggleEnabled(qa.id)}
                className={['relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-1', qa.enabled ? 'bg-teal-600' : 'bg-gray-200'].join(' ')}
              >
                <span className={['pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200', qa.enabled ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
              </button>
            </div>

            {/* Order badge */}
            <div className="text-sm text-gray-400 font-mono text-center">{qa.order}</div>

            {/* Edit button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => openEdit(qa)}
                className="text-sm text-blue-600 hover:underline"
              >
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stacked cards + up/down buttons (mobile, AC-10) */}
      <div className="sm:hidden space-y-3">
        {quickActions.map((qa, index) => (
          <div key={qa.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono mr-2">{qa.icon}</span>
                <span className="text-sm font-medium text-gray-800">{qa.label}</span>
                <div className="text-xs text-gray-400 mt-1">{qa.href}</div>
              </div>
              {/* ▲▼ buttons แทน drag-drop ที่ mobile */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  aria-label="เลื่อนขึ้น"
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === quickActions.length - 1}
                  aria-label="เลื่อนลง"
                  className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▼
                </button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={qa.enabled}
                aria-label={`เปิดใช้ ${qa.label}`}
                onClick={() => toggleEnabled(qa.id)}
                className={['relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500', qa.enabled ? 'bg-teal-600' : 'bg-gray-200'].join(' ')}
              >
                <span className={['pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200', qa.enabled ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
              </button>
              <span className="text-sm text-gray-500">{qa.enabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span>
              <button type="button" onClick={() => openEdit(qa)} className="ml-auto text-sm text-blue-600 hover:underline">
                แก้ไข
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label={`แก้ไข ${editTarget.label}`}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">แก้ไข Quick Action</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ชื่อ</label>
              <input type="text" value={modalLabel} onChange={(e) => setModalLabel(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon</label>
              <select value={modalIcon} onChange={(e) => setModalIcon(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500">
                {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Route (href)</label>
              <input type="text" value={modalHref} onChange={(e) => setModalHref(e.target.value)}
                placeholder="/ess/..."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setEditTarget(null)} className="humi-button humi-button--ghost">ยกเลิก</button>
              <button type="button" onClick={saveModal} className="humi-button humi-button--primary">บันทึก</button>
            </div>
          </div>
        </div>
      )}
    </EditorShell>
  )
}

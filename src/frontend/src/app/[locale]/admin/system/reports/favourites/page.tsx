'use client'

// admin/system/reports/favourites/page.tsx — Favourite Report list + reorder
// BRD #206 — Part E Wave 2a

import { useState } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

export default function FavouriteReportsPage() {
  const { reports, favouriteReports, toggleFavourite } = useDataManagement()

  const favReports = favouriteReports
    .map((id) => reports.find((r) => r.id === id))
    .filter(Boolean) as typeof reports

  // Local order state (drag-drop reorder)
  const [order, setOrder] = useState<string[]>(() => favouriteReports)
  const [dragging, setDragging] = useState<string | null>(null)

  // Sync order when favouriteReports changes
  const orderedFavs = order
    .filter((id) => favouriteReports.includes(id))
    .concat(favouriteReports.filter((id) => !order.includes(id)))

  function handleDrop(targetId: string) {
    if (!dragging || dragging === targetId) return
    setOrder((prev) => {
      const next = [...prev].filter((id) => id !== dragging)
      const idx = next.indexOf(targetId)
      next.splice(idx, 0, dragging)
      return next
    })
    setDragging(null)
  }

  const nonFavReports = reports.filter((r) => !favouriteReports.includes(r.id))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">รายงานโปรด</h2>
        <p className="text-sm text-gray-500 mt-1">Favourite Reports — ลากเพื่อเรียงลำดับ — BRD #206</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Favourites list */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            รายงานโปรด ({favReports.length})
          </h3>

          {orderedFavs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">ยังไม่มีรายงานโปรด</p>
          ) : (
            <ul className="space-y-2">
              {orderedFavs.map((id, idx) => {
                const rpt = reports.find((r) => r.id === id)
                if (!rpt) return null
                return (
                  <li
                    key={id}
                    draggable
                    onDragStart={() => setDragging(id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(id)}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 cursor-grab active:cursor-grabbing hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <span className="text-gray-400 text-sm select-none" aria-hidden>
                      {idx + 1}.
                    </span>
                    <span className="text-gray-300 text-sm select-none" aria-hidden>⠿</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{rpt.name}</p>
                      <p className="text-xs text-gray-400">{rpt.type} · {rpt.module}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavourite(id)}
                      aria-label="ลบออกจากโปรด"
                      className="text-amber-400 hover:text-amber-600 text-lg leading-none transition-colors"
                    >
                      ★
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* All reports — add to fav */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            รายงานอื่นๆ ({nonFavReports.length})
          </h3>
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {nonFavReports.map((rpt) => (
              <li
                key={rpt.id}
                className="flex items-center gap-3 rounded-lg border border-gray-100 px-3 py-2.5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{rpt.name}</p>
                  <p className="text-xs text-gray-400">{rpt.type} · {rpt.module}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavourite(rpt.id)}
                  aria-label="เพิ่มเป็นโปรด"
                  className="text-gray-300 hover:text-amber-400 text-lg leading-none transition-colors"
                >
                  ☆
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

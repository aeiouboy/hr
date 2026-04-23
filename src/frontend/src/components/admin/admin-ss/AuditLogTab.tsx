'use client'

// AuditLogTab.tsx — แสดง audit log ≤10 entries filtered by editor (AC-8)
// cols: timestamp / adminUser / target / before → after
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import type { EditorName } from '@/lib/admin/types/adminSelfService'

interface AuditLogTabProps {
  editor: EditorName
}

export function AuditLogTab({ editor }: AuditLogTabProps) {
  const audit = useAdminSelfService((s) => s.audit)

  // filter ตาม editor + cap ที่ 10 entries (AC-8)
  const filtered = audit
    .filter((e) => e.editor === editor)
    .slice(-10)
    .reverse()

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-400">
        ยังไม่มีประวัติการแก้ไขสำหรับ editor นี้
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">เวลา</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">ผู้แก้ไข</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">Target</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600 whitespace-nowrap">ก่อน → หลัง</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {filtered.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap text-xs">
                {new Date(entry.timestamp).toLocaleString('th-TH', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </td>
              <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{entry.adminUser}</td>
              <td className="px-4 py-3">
                <code className="text-xs bg-gray-100 rounded px-1.5 py-0.5 text-gray-600">
                  {entry.targetEntity}
                </code>
              </td>
              <td className="px-4 py-3 text-gray-600 text-xs">
                <span className="text-red-500">{entry.before ?? '—'}</span>
                <span className="mx-1.5 text-gray-400">→</span>
                <span className="text-green-600">{entry.after ?? '—'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

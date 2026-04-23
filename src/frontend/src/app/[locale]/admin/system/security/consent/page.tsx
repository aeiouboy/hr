'use client'

// security/consent/page.tsx — Consent Form management (BRD #199)
// AC: unsigned count + send reminder CTA (mock) + signed/pending/expired list

import { useState } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import type { ConsentRecord } from '@/lib/admin/types/dataManagement'

const STATUS_CONFIG: Record<ConsentRecord['status'], { label: string; cls: string }> = {
  signed:  { label: 'ลงนามแล้ว',  cls: 'bg-green-100 text-green-700' },
  pending: { label: 'รอลงนาม',    cls: 'bg-amber-100 text-amber-700' },
  expired: { label: 'หมดอายุ',    cls: 'bg-red-100 text-red-600' },
}

function ConsentBadge({ status }: { status: ConsentRecord['status'] }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, cls: 'bg-gray-100 text-gray-600' }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

export default function ConsentPage() {
  const consentForms = useDataManagement((s) => s.consentForms)
  const [filterStatus, setFilterStatus] = useState<'all' | ConsentRecord['status']>('all')
  const [reminderSent, setReminderSent] = useState(false)

  const signed  = consentForms.filter((c) => c.status === 'signed').length
  const pending = consentForms.filter((c) => c.status === 'pending').length
  const expired = consentForms.filter((c) => c.status === 'expired').length

  const filtered = filterStatus === 'all'
    ? consentForms
    : consentForms.filter((c) => c.status === filterStatus)

  function handleSendReminder() {
    if (pending === 0) {
      console.warn('[Consent] handleSendReminder: ไม่มี pending consent — ไม่ต้องส่ง reminder')
      return
    }
    // mock reminder action
    setReminderSent(true)
    setTimeout(() => setReminderSent(false), 3000)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Consent Form</h1>
        <p className="mt-1 text-sm text-gray-500">
          จัดการ PDPA Consent — ดูสถานะและส่ง reminder ให้พนักงานที่ยังไม่ลงนาม
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{signed}</p>
          <p className="text-xs text-green-600 mt-1 whitespace-nowrap">ลงนามแล้ว</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{pending}</p>
          <p className="text-xs text-amber-600 mt-1 whitespace-nowrap">รอลงนาม</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{expired}</p>
          <p className="text-xs text-red-600 mt-1 whitespace-nowrap">หมดอายุ</p>
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <label htmlFor="filter-status" className="text-sm text-gray-600">กรองสถานะ:</label>
          <select
            id="filter-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทั้งหมด ({consentForms.length})</option>
            <option value="signed">ลงนามแล้ว ({signed})</option>
            <option value="pending">รอลงนาม ({pending})</option>
            <option value="expired">หมดอายุ ({expired})</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleSendReminder}
          disabled={pending === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
          aria-label={`ส่ง Reminder ให้พนักงาน ${pending} คนที่รอลงนาม`}
        >
          {reminderSent ? '✓ ส่ง Reminder แล้ว' : `ส่ง Reminder (${pending} คน)`}
        </button>
      </div>

      {reminderSent && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700" role="alert">
          ส่ง Reminder ไปยังพนักงาน {pending} คนที่รอลงนามเรียบร้อยแล้ว (mock)
        </div>
      )}

      {/* Consent list */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="รายการ Consent Form">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">รหัสพนักงาน</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่อ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ประเภท Consent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">วันที่ลงนาม</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">หมดอายุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                    ไม่พบรายการที่ตรงกับเงื่อนไข
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{c.employeeId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{c.employeeName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.consentType}</td>
                    <td className="px-4 py-3">
                      <ConsentBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {c.signedAt ? new Date(c.signedAt).toLocaleDateString('th-TH') : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('th-TH') : <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
          แสดง {filtered.length} จาก {consentForms.length} รายการ
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">BRD #199 — Consent Form PDPA; การส่ง Reminder เป็น mock action ในระบบนี้</p>
    </div>
  )
}

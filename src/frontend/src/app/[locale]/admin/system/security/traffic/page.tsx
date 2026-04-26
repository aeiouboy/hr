// VALIDATION_EXEMPT: admin landing/audit page — filter inputs only, no submit form (per design-gates Track C 2026-04-26)
'use client'

// security/traffic/page.tsx — Traffic Report (BRD #200)
// AC: date-range filter + login activity table + CSV export (reuse csvExport)

import { useState, useMemo } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import { exportToCSV, type CsvColumn } from '@/lib/admin/utils/csvExport'
import type { TrafficEntry } from '@/lib/admin/types/dataManagement'

const TRAFFIC_CSV_COLUMNS: CsvColumn<TrafficEntry>[] = [
  { header: 'รหัสพนักงาน',     accessor: 'employeeId' },
  { header: 'ชื่อผู้ใช้',       accessor: 'employeeName' },
  { header: 'IP Address',      accessor: 'ipAddress' },
  { header: 'User Agent',      accessor: 'userAgent' },
  { header: 'เวลาเข้าสู่ระบบ', accessor: 'loginAt' },
  { header: 'เวลาออกจากระบบ', accessor: (r) => r.logoutAt ?? '-' },
  { header: 'สำเร็จ',          accessor: (r) => (r.isSuccess ? 'ใช่' : 'ไม่') },
  { header: 'สาเหตุที่ล้มเหลว', accessor: (r) => r.failureReason ?? '-' },
  { header: 'สถานที่',          accessor: (r) => r.location ?? '-' },
]

// 7 วันย้อนหลัง default
function defaultDateRange() {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - 7)
  return {
    from: start.toISOString().slice(0, 10),
    to: end.toISOString().slice(0, 10),
  }
}

export default function TrafficPage() {
  const trafficLog = useDataManagement((s) => s.trafficLog)
  const [range, setRange] = useState(defaultDateRange)
  const [showFailed, setShowFailed] = useState(false)

  const filtered = useMemo(() => {
    return trafficLog.filter((entry) => {
      const loginDate = entry.loginAt.slice(0, 10)
      const inRange = loginDate >= range.from && loginDate <= range.to
      const passedFilter = showFailed ? !entry.isSuccess : true
      return inRange && passedFilter
    })
  }, [trafficLog, range, showFailed])

  function handleExport() {
    if (filtered.length === 0) {
      console.warn('[Traffic] handleExport: ไม่มีข้อมูลในช่วงวันที่เลือก — ไม่ export')
      return
    }
    exportToCSV(filtered, TRAFFIC_CSV_COLUMNS, `traffic-report-${range.from}-${range.to}`)
  }

  const failedCount = filtered.filter((e) => !e.isSuccess).length

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Traffic Report</h1>
        <p className="mt-1 text-sm text-gray-500">
          รายงาน login activity — ดูและ export ข้อมูลการเข้าใช้งานระบบ
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <label htmlFor="date-from" className="text-sm text-gray-600 whitespace-nowrap">จากวันที่</label>
          <input
            id="date-from"
            type="date"
            value={range.from}
            max={range.to}
            onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="วันที่เริ่มต้น"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="date-to" className="text-sm text-gray-600 whitespace-nowrap">ถึงวันที่</label>
          <input
            id="date-to"
            type="date"
            value={range.to}
            min={range.from}
            onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="วันที่สิ้นสุด"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showFailed}
            onChange={(e) => setShowFailed(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          เฉพาะ login ล้มเหลว
        </label>
        <div className="ml-auto flex items-center gap-2">
          {failedCount > 0 && (
            <span className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full">
              {failedCount} ล้มเหลว
            </span>
          )}
          <button
            type="button"
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            aria-label="Export CSV"
          >
            Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Login Activity">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">รหัส</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่อ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">IP</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">เวลาเข้า</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">สถานที่</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                    ไม่พบข้อมูลในช่วงวันที่เลือก
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`transition-colors ${!entry.isSuccess ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{entry.employeeId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.employeeName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{entry.ipAddress}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(entry.loginAt).toLocaleString('th-TH')}
                    </td>
                    <td className="px-4 py-3">
                      {entry.isSuccess ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                          สำเร็จ
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 whitespace-nowrap" title={entry.failureReason ?? undefined}>
                          ล้มเหลว
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {entry.location ?? <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
          แสดง {filtered.length} จาก {trafficLog.length} รายการ
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        BRD #200 — Traffic Report; CSV export UTF-8 BOM + Thai headers (เปิดได้ใน Excel)
      </p>
    </div>
  )
}

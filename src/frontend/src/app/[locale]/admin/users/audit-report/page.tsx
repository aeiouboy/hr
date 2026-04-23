'use client'

// audit-report/page.tsx — Audit Report (BRD #189)
// AC-8: filter bar + DataTable + CSV export (UTF-8 BOM + Thai headers)
// Actor: Admin / HRIS Admin (Rule 70)
import { useState, useMemo } from 'react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import { exportToCSV } from '@/lib/admin/utils/csvExport'
import type { AuditEntry, AuditAction, AuditEntityType } from '@/lib/admin/types/usersPermissions'
import type { CsvColumn } from '@/lib/admin/utils/csvExport'

// Thai labels ตาม AC-8 + C10
const ACTION_LABELS: Record<AuditAction, string> = {
  LOGIN: 'เข้าสู่ระบบ',
  LOGOUT: 'ออกจากระบบ',
  VIEW: 'ดู',
  CREATE: 'สร้าง',
  UPDATE: 'แก้ไข',
  DELETE: 'ลบ',
  APPROVE: 'อนุมัติ',
  REJECT: 'ปฏิเสธ',
  EXPORT: 'Export',
  ASSIGN_ROLE: 'กำหนด Role',
  REVOKE_ROLE: 'ยกเลิก Role',
  CREATE_PROXY: 'สร้าง Proxy',
  REVOKE_PROXY: 'ยกเลิก Proxy',
}

const ENTITY_LABELS: Record<AuditEntityType, string> = {
  EMPLOYEE_PROFILE: 'ข้อมูลพนักงาน',
  HIRE_TRANSACTION: 'การจ้างงาน',
  LIFECYCLE_TRANSACTION: 'Lifecycle Transaction',
  ROLE: 'Role',
  USER_ASSIGNMENT: 'การกำหนดสิทธิ์',
  PROXY: 'Proxy',
  FOUNDATION_OBJECT: 'Foundation Data',
  AUDIT_REPORT: 'Audit Report',
}

const ITEMS_PER_PAGE = 10

// CSV columns ตาม spec T11 — Thai headers ตาม AC-8 (C10)
const auditCsvCols: CsvColumn<AuditEntry>[] = [
  { header: 'วันที่', accessor: 'timestamp' },
  { header: 'รหัสผู้ใช้', accessor: 'userId' },
  { header: 'ชื่อผู้ใช้', accessor: 'userName' },
  { header: 'การดำเนินการ', accessor: (r) => ACTION_LABELS[r.action] ?? r.action },
  { header: 'ประเภท Entity', accessor: (r) => ENTITY_LABELS[r.entityType] ?? r.entityType },
  { header: 'รหัส Entity', accessor: 'entityId' },
  { header: 'ชื่อ Entity', accessor: 'entityName' },
  { header: 'รายละเอียด', accessor: 'description' },
  { header: 'IP Address', accessor: 'ipAddress' },
  { header: 'สำเร็จ', accessor: (r) => (r.isSuccess ? 'ใช่' : 'ไม่') },
]

// -----------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------
export default function AuditReportPage() {
  const auditReport = useUsersPermissions((s) => s.auditReport)
  const users = useUsersPermissions((s) => s.users)

  // Filter state
  const [filterUser, setFilterUser] = useState('')
  const [filterAction, setFilterAction] = useState<AuditAction | 'ALL'>('ALL')
  const [filterEntity, setFilterEntity] = useState<AuditEntityType | 'ALL'>('ALL')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const isFilterApplied =
    !!filterUser || filterAction !== 'ALL' || filterEntity !== 'ALL' || !!filterDateFrom || !!filterDateTo

  // Apply filters
  const filtered = useMemo(() => {
    return auditReport
      .filter((e) => {
        if (!filterUser) return true
        const q = filterUser.toLowerCase()
        return (
          e.userId.toLowerCase().includes(q) ||
          e.userName.toLowerCase().includes(q)
        )
      })
      .filter((e) => filterAction === 'ALL' || e.action === filterAction)
      .filter((e) => filterEntity === 'ALL' || e.entityType === filterEntity)
      .filter((e) => {
        if (!filterDateFrom) return true
        return new Date(e.timestamp) >= new Date(filterDateFrom + 'T00:00:00.000Z')
      })
      .filter((e) => {
        if (!filterDateTo) return true
        return new Date(e.timestamp) <= new Date(filterDateTo + 'T23:59:59.999Z')
      })
      // sort timestamp desc
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [auditReport, filterUser, filterAction, filterEntity, filterDateFrom, filterDateTo])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  function handleExport() {
    if (!isFilterApplied) return
    try {
      const now = new Date()
      const ts = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`
      exportToCSV(filtered, auditCsvCols, `audit-report-${ts}.csv`)
    } catch (err) {
      console.warn('[AuditReport] handleExport error:', err)
    }
  }

  function resetFilters() {
    setFilterUser('')
    setFilterAction('ALL')
    setFilterEntity('ALL')
    setFilterDateFrom('')
    setFilterDateTo('')
    setCurrentPage(1)
  }

  // entity options จาก dataset จริง
  const entityOptions = Array.from(new Set(auditReport.map((e) => e.entityType))) as AuditEntityType[]
  const actionOptions = Array.from(new Set(auditReport.map((e) => e.action))) as AuditAction[]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">รายงาน Audit</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          BRD #189 — Log Add / Edit / Delete ทุก Module พร้อม Export CSV
        </p>
      </div>

      {/* Filter bar — sticky */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-4 sticky top-0 z-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* ผู้ดำเนินการ */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ผู้ดำเนินการ</label>
            <input
              type="text"
              value={filterUser}
              onChange={(e) => { setFilterUser(e.target.value); setCurrentPage(1) }}
              placeholder="ชื่อหรือรหัสพนักงาน"
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* การดำเนินการ */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">การดำเนินการ</label>
            <select
              value={filterAction}
              onChange={(e) => { setFilterAction(e.target.value as AuditAction | 'ALL'); setCurrentPage(1) }}
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">ทั้งหมด</option>
              {actionOptions.map((a) => (
                <option key={a} value={a}>{ACTION_LABELS[a] ?? a}</option>
              ))}
            </select>
          </div>

          {/* ประเภท Entity */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ประเภท Entity</label>
            <select
              value={filterEntity}
              onChange={(e) => { setFilterEntity(e.target.value as AuditEntityType | 'ALL'); setCurrentPage(1) }}
              className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">ทั้งหมด</option>
              {entityOptions.map((et) => (
                <option key={et} value={et}>{ENTITY_LABELS[et] ?? et}</option>
              ))}
            </select>
          </div>

          {/* Date range */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">ช่วงเวลา</label>
            <div className="flex items-center gap-1">
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => { setFilterDateFrom(e.target.value); setCurrentPage(1) }}
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="วันเริ่มต้น"
              />
              <span className="text-gray-400 text-xs">—</span>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => { setFilterDateTo(e.target.value); setCurrentPage(1) }}
                className="flex-1 border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="วันสิ้นสุด"
              />
            </div>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">
              พบ {filtered.length} รายการ
              {isFilterApplied && ` (filter แล้ว)`}
            </span>
            {isFilterApplied && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 hover:text-gray-700 underline"
              >
                ล้าง filter
              </button>
            )}
          </div>

          {/* CSV Export button — ตาม AC-8: disabled จนกว่า filter จะถูก apply */}
          <button
            onClick={handleExport}
            disabled={!isFilterApplied}
            title={!isFilterApplied ? 'กรุณา apply filter ก่อน export' : `Export ${filtered.length} รายการ`}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Export CSV"
          >
            <span>⬇</span>
            <span className="whitespace-nowrap">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table role="table" className="w-full text-sm" aria-label="ตารางรายงาน Audit">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">วันที่</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap hidden sm:table-cell">ผู้ดำเนินการ</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">การดำเนินการ</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap hidden md:table-cell">Entity</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 hidden lg:table-cell">รายละเอียด</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 w-16">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.length === 0 && (
                <tr role="row">
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    {isFilterApplied ? 'ไม่พบรายการที่ตรงกับเงื่อนไข' : 'ใส่ filter เพื่อดูรายการ'}
                  </td>
                </tr>
              )}
              {paginated.map((entry) => (
                <tr key={entry.id} role="row" className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                    {new Date(entry.timestamp).toLocaleString('th-TH')}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="font-medium text-gray-900 text-xs whitespace-nowrap">{entry.userName}</p>
                    <p className="text-xs text-gray-400">{entry.userId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={[
                        'text-xs px-2 py-0.5 rounded-full whitespace-nowrap',
                        entry.action === 'CREATE' ? 'bg-green-50 text-green-700' :
                        entry.action === 'DELETE' ? 'bg-red-50 text-red-600' :
                        entry.action === 'UPDATE' ? 'bg-blue-50 text-blue-700' :
                        'bg-gray-50 text-gray-600',
                      ].join(' ')}
                    >
                      {ACTION_LABELS[entry.action] ?? entry.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-xs text-gray-600 whitespace-nowrap">
                      {ENTITY_LABELS[entry.entityType] ?? entry.entityType}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-xs">{entry.entityName}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-xs text-gray-500 max-w-xs truncate">{entry.description}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={[
                        'text-xs',
                        entry.isSuccess ? 'text-green-600' : 'text-red-500',
                      ].join(' ')}
                      title={entry.isSuccess ? 'สำเร็จ' : (entry.errorMessage ?? 'ล้มเหลว')}
                    >
                      {entry.isSuccess ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              หน้า {currentPage} จาก {totalPages} ({filtered.length} รายการ)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← ก่อนหน้า
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

// system-features/edocuments/page.tsx — E-Document library (BRD #197)
// AC: list mock docs + filter by type + view/download mock action

import { useState } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import type { EDocument } from '@/lib/admin/types/dataManagement'

const DOC_TYPE_OPTIONS = [
  'ทั้งหมด',
  'สัญญาจ้าง',
  'ใบสมัครงาน',
  'โอนย้าย',
  'ใบลาออก',
  'ใบรับรองเงินเดือน',
  'ใบรับรองการทำงาน',
  'อื่นๆ',
] as const

function StatusBadge({ isTemplate }: { isTemplate: boolean }) {
  return isTemplate ? (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
      Template
    </span>
  ) : (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
      บุคคล
    </span>
  )
}

function handleMockAction(doc: EDocument, action: 'view' | 'download') {
  // mock action — log warning ถ้า fileUrl ไม่มี (C6)
  if (!doc.fileUrl) {
    console.warn(`[EDocuments] ${action}: fileUrl ไม่มีสำหรับ doc "${doc.id}" — mock only`)
    return
  }
  console.info(`[EDocuments] ${action}: ${doc.name} → ${doc.fileUrl}`)
  // ใน production จะ redirect/open fileUrl
}

export default function EDocumentsPage() {
  const eDocuments = useDataManagement((s) => s.eDocuments)
  const [filterType, setFilterType] = useState<string>('ทั้งหมด')
  const [search, setSearch] = useState('')

  const filtered = eDocuments.filter((doc) => {
    const matchType = filterType === 'ทั้งหมด' || doc.type === filterType
    const matchSearch =
      search === '' ||
      doc.name.includes(search) ||
      (doc.employeeId ?? '').includes(search)
    return matchType && matchSearch
  })

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">E-Document</h1>
        <p className="mt-1 text-sm text-gray-500">
          คลังเอกสารดิจิทัล — ดูและดาวน์โหลดเอกสาร HR ({eDocuments.length} รายการ)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="กรองประเภทเอกสาร"
        >
          {DOC_TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="ค้นหาชื่อเอกสาร หรือ รหัสพนักงาน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-64"
          aria-label="ค้นหาเอกสาร"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="รายการ E-Document">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่อเอกสาร</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ประเภท</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">รหัสพนักงาน</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">วันที่สร้าง</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wide">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                    ไม่พบเอกสารที่ตรงกับเงื่อนไข
                  </td>
                </tr>
              ) : (
                filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{doc.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{doc.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {doc.employeeId ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge isTemplate={doc.isTemplate} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('th-TH') : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleMockAction(doc, 'view')}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
                          aria-label={`ดูเอกสาร ${doc.name}`}
                        >
                          ดู
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMockAction(doc, 'download')}
                          className="text-xs text-green-600 hover:text-green-800 font-medium focus:outline-none focus:underline"
                          aria-label={`ดาวน์โหลด ${doc.name}`}
                        >
                          ดาวน์โหลด
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
          แสดง {filtered.length} จาก {eDocuments.length} รายการ
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">BRD #197 — การดูและดาวน์โหลดเป็น mock action ในระบบนี้</p>
    </div>
  )
}

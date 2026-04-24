'use client'

// admin/system/reports/builder/page.tsx — Report Builder
// Story Report + Customize Report: drag-drop columns + filters + preview
// BRD #193, #196 — Part E Wave 2a

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const ALL_COLUMNS = [
  'รหัสพนักงาน',
  'ชื่อ-สกุล',
  'แผนก',
  'ตำแหน่ง',
  'วันเริ่มงาน',
  'สถานะ',
  'เงินเดือน',
  'ผู้จัดการ',
  'ประเภทสัญญา',
]

const MODULE_OPTIONS = ['HR', 'Leave', 'Payroll', 'Recruitment'] as const
const REPORT_TYPES = ['story', 'customize'] as const

const MOCK_FILTERS = [
  { id: 'status',     label: 'สถานะ',    options: ['active', 'inactive', 'probation'] },
  { id: 'department', label: 'แผนก',     options: ['IT', 'HR', 'Finance', 'Operations'] },
  { id: 'year',       label: 'ปี',       options: ['2024', '2025', '2026'] },
]

// Mock preview rows (ไม่ใช่ real SQL)
const PREVIEW_ROWS = [
  { รหัสพนักงาน: 'EMP001', 'ชื่อ-สกุล': 'สมชาย ใจดี', แผนก: 'IT', ตำแหน่ง: 'Developer', วันเริ่มงาน: '2020-03-01', สถานะ: 'active' },
  { รหัสพนักงาน: 'EMP002', 'ชื่อ-สกุล': 'สมหญิง มีสุข', แผนก: 'HR', ตำแหน่ง: 'HR Officer', วันเริ่มงาน: '2021-07-15', สถานะ: 'active' },
  { รหัสพนักงาน: 'EMP003', 'ชื่อ-สกุล': 'ประสิทธิ์ ดีเด่น', แผนก: 'Finance', ตำแหน่ง: 'Accountant', วันเริ่มงาน: '2019-01-10', สถานะ: 'active' },
]

export default function ReportBuilderPage() {
  const { createReport } = useDataManagement()

  const [reportName, setReportName] = useState('')
  const [reportType, setReportType] = useState<'story' | 'customize'>('customize')
  const [module, setModule] = useState<string>('HR')
  const [selectedCols, setSelectedCols] = useState<string[]>(['รหัสพนักงาน', 'ชื่อ-สกุล', 'แผนก'])
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)
  const [saved, setSaved] = useState(false)
  const [dragging, setDragging] = useState<string | null>(null)

  function toggleCol(col: string) {
    setSelectedCols((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    )
  }

  function handleDragStart(col: string) {
    setDragging(col)
  }

  function handleDrop(target: string) {
    if (!dragging || dragging === target) return
    setSelectedCols((prev) => {
      const next = prev.filter((c) => c !== dragging)
      const idx = next.indexOf(target)
      next.splice(idx, 0, dragging)
      return next
    })
    setDragging(null)
  }

  function handleSave() {
    if (!reportName.trim()) return
    createReport({
      name: reportName.trim(),
      type: reportType,
      isBuiltIn: false,
      owner: 'EMP001',
      module,
      fields: selectedCols,
      filters: activeFilters,
      lastRun: null,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const previewRows = PREVIEW_ROWS.map((row) => {
    const filtered: Record<string, string> = {}
    selectedCols.forEach((col) => {
      filtered[col] = (row as Record<string, string>)[col] ?? '-'
    })
    return filtered
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">สร้างรายงาน</h2>
        <p className="text-sm text-gray-500 mt-1">Story Report / Customize Report — BRD #193, #196</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Config */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic info */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">ข้อมูลพื้นฐาน</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-xs text-gray-500 mb-1" htmlFor="rpt-name">
                  ชื่อรายงาน <span className="text-red-500">*</span>
                </label>
                <input
                  id="rpt-name"
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="เช่น รายงานพนักงานประจำเดือน เมษายน"
                  className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="rpt-type">
                  ประเภท
                </label>
                <select
                  id="rpt-type"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as typeof reportType)}
                  className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {REPORT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1" htmlFor="rpt-module">โมดูล</label>
              <select
                id="rpt-module"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MODULE_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Columns drag-drop */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">คอลัมน์ (ลากเพื่อเรียงลำดับ)</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {ALL_COLUMNS.map((col) => {
                const isSelected = selectedCols.includes(col)
                return (
                  <button
                    key={col}
                    type="button"
                    onClick={() => toggleCol(col)}
                    className={[
                      'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-500 hover:border-gray-400',
                    ].join(' ')}
                  >
                    {col}
                  </button>
                )
              })}
            </div>

            {/* Ordered selected cols — draggable */}
            {selectedCols.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-2">ลำดับคอลัมน์ที่เลือก:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCols.map((col) => (
                    <div
                      key={col}
                      draggable
                      onDragStart={() => handleDragStart(col)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(col)}
                      className="flex items-center gap-1 rounded border border-blue-300 bg-blue-50 px-2 py-1 text-xs text-blue-700 cursor-grab active:cursor-grabbing"
                    >
                      <span aria-hidden>⠿</span>
                      {col}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">ตัวกรอง</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {MOCK_FILTERS.map((f) => (
                <div key={f.id}>
                  <label className="block text-xs text-gray-500 mb-1" htmlFor={`filter-${f.id}`}>
                    {f.label}
                  </label>
                  <select
                    id={`filter-${f.id}`}
                    value={activeFilters[f.id] ?? ''}
                    onChange={(e) =>
                      setActiveFilters((prev) => ({ ...prev, [f.id]: e.target.value }))
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">— ทั้งหมด —</option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Preview panel */}
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">ตัวอย่างข้อมูล</h3>
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              className="w-full rounded-md bg-gray-100 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {showPreview ? 'ซ่อน Preview' : 'แสดง Preview'}
            </button>

            {showPreview && selectedCols.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {selectedCols.map((col) => (
                        <th key={col} className="px-2 py-1.5 text-left font-medium text-gray-500 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previewRows.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        {selectedCols.map((col) => (
                          <td key={col} className="px-2 py-1.5 text-gray-700 whitespace-nowrap">
                            {row[col] ?? '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showPreview && selectedCols.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">กรุณาเลือกคอลัมน์ก่อน</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!reportName.trim()}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saved ? <span className="inline-flex items-center gap-1.5"><Check size={16}/>บันทึกแล้ว</span> : 'บันทึกรายงาน'}
          </button>
        </div>
      </div>
    </div>
  )
}

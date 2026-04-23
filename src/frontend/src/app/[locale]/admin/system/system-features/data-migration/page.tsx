'use client'

// system-features/data-migration/page.tsx — Data Migration tool (BRD #198)
// AC: upload CSV stub + validate/dry-run preview + job history table

import { useState, useRef } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import type { MigrationJob } from '@/lib/admin/types/dataManagement'

const STATUS_CONFIG: Record<MigrationJob['status'], { label: string; cls: string }> = {
  queued:     { label: 'รอดำเนินการ',  cls: 'bg-gray-100 text-gray-600' },
  validating: { label: 'กำลังตรวจสอบ', cls: 'bg-yellow-100 text-yellow-700' },
  'dry-run':  { label: 'Dry Run',      cls: 'bg-blue-100 text-blue-700' },
  success:    { label: 'สำเร็จ',       cls: 'bg-green-100 text-green-700' },
  failed:     { label: 'ล้มเหลว',      cls: 'bg-red-100 text-red-700' },
}

function StatusBadge({ status }: { status: MigrationJob['status'] }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, cls: 'bg-gray-100 text-gray-600' }
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${cfg.cls}`}>
      {cfg.label}
    </span>
  )
}

function ProgressBar({ total, processed }: { total: number; processed: number }) {
  const pct = total > 0 ? Math.min(100, Math.round((processed / total) * 100)) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{pct}%</span>
    </div>
  )
}

export default function DataMigrationPage() {
  const jobs = useDataManagement((s) => s.dataMigrationJobs)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDryRun, setIsDryRun] = useState(false)
  const [dryRunRows, setDryRunRows] = useState<string[] | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.name.endsWith('.csv')) {
      console.warn('[DataMigration] handleFileChange: ไฟล์ต้องเป็น .csv เท่านั้น — reject')
      alert('กรุณาเลือกไฟล์ .csv เท่านั้น')
      e.target.value = ''
      return
    }
    setFileName(file.name)
    setDryRunRows(null)
    setIsDryRun(false)
  }

  function handleDryRun() {
    if (!fileName) return
    // mock dry-run preview
    setIsDryRun(true)
    setDryRunRows([
      'EMP001,สมชาย ใจดี,HR,2024-01-15 → ✓ valid',
      'EMP002,สมหญิง รักงาน,Finance,2024-02-01 → ✓ valid',
      'EMP003,วิชัย มีสุข,IT,2024-03-10 → ⚠ ซ้ำกับข้อมูลที่มีอยู่',
      'EMP004,รัตนา ดีมาก,Marketing, → ✗ วันที่ไม่ถูกต้อง',
      '... (mock preview — 4 จาก 120 rows)',
    ])
  }

  function handleValidate() {
    if (!fileName) return
    alert('Validate เสร็จสิ้น (mock) — พบ 1 warning, 1 error ใน preview ด้านล่าง')
    handleDryRun()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Data Migration</h1>
        <p className="mt-1 text-sm text-gray-500">
          นำเข้าข้อมูลจากระบบเก่า — อัปโหลด CSV → Validate → Dry Run ก่อน import จริง
        </p>
      </div>

      {/* Upload section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">อัปโหลดไฟล์ CSV</h2>

        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="csv-upload"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors focus-within:ring-2 focus-within:ring-blue-500"
          >
            <span>📁</span>
            <span>{fileName ?? 'เลือกไฟล์ .csv'}</span>
            <input
              id="csv-upload"
              ref={fileRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="sr-only"
              aria-label="อัปโหลดไฟล์ CSV สำหรับ Data Migration"
            />
          </label>

          <button
            type="button"
            onClick={handleValidate}
            disabled={!fileName}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Validate
          </button>

          <button
            type="button"
            onClick={handleDryRun}
            disabled={!fileName}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            Dry Run
          </button>
        </div>

        {/* Dry-run preview */}
        {isDryRun && dryRunRows && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4" role="region" aria-label="ผลลัพธ์ Dry Run">
            <p className="text-xs font-semibold text-gray-600 mb-2">Dry Run Preview (mock)</p>
            <ul className="space-y-1">
              {dryRunRows.map((row, i) => (
                <li key={i} className="text-xs font-mono text-gray-700">{row}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Job history */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">ประวัติ Migration Jobs ({jobs.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="ประวัติ Migration Jobs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ชื่อ Batch</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ระบบต้นทาง</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">สถานะ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">ความคืบหน้า</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Error</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">วันที่เริ่ม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">
                    ยังไม่มี Migration Jobs
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">{job.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{job.sourceSystem}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ProgressBar total={job.totalRecords} processed={job.processedRecords} />
                      <p className="text-xs text-gray-400 mt-0.5">
                        {job.processedRecords.toLocaleString()} / {job.totalRecords.toLocaleString()} records
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {job.errorCount > 0 ? (
                        <span className="text-red-600 font-medium">{job.errorCount} errors</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      {job.startedAt ? new Date(job.startedAt).toLocaleString('th-TH') : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">BRD #198 — Data Migration stub; import จริงต้องผ่าน validate + dry-run ก่อนเสมอ</p>
    </div>
  )
}

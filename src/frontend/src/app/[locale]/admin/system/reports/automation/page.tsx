'use client'

// admin/system/reports/automation/page.tsx — Report Automation
// active jobs list + pause/resume — BRD #207 — Part E Wave 2a

import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import { formatCron } from '@/lib/admin/utils/cronFormat'
import { useState } from 'react'

export default function ReportAutomationPage() {
  const { scheduledJobs, reports } = useDataManagement()

  // Local pause/resume state (mock — store doesn't expose toggle; keep UI minimal per C3)
  const [paused, setPaused] = useState<Set<string>>(new Set())

  function toggleJob(jobId: string) {
    setPaused((prev) => {
      const next = new Set(prev)
      if (next.has(jobId)) next.delete(jobId)
      else next.add(jobId)
      return next
    })
  }

  const allJobs = scheduledJobs.map((job) => ({
    ...job,
    isPaused: paused.has(job.id),
    reportName: reports.find((r) => r.id === job.reportId)?.name ?? job.reportId,
  }))

  const activeCount = allJobs.filter((j) => j.isActive && !j.isPaused).length
  const pausedCount = allJobs.filter((j) => j.isPaused).length

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">งานอัตโนมัติ</h2>
          <p className="text-sm text-gray-500 mt-1">Report Automation — BRD #207</p>
        </div>
        <div className="flex gap-3 text-center">
          <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <p className="text-lg font-bold text-green-700">{activeCount}</p>
            <p className="text-xs text-green-600">ทำงาน</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <p className="text-lg font-bold text-amber-700">{pausedCount}</p>
            <p className="text-xs text-amber-600">หยุดชั่วคราว</p>
          </div>
        </div>
      </div>

      {allJobs.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <p className="text-gray-400">ยังไม่มีงานอัตโนมัติ — ไปที่ &quot;กำหนดเวลารายงาน&quot; เพื่อสร้าง</p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">รายงาน</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">ความถี่</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">ช่องทาง</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">รันล่าสุด</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">สถานะ</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">การดำเนินการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allJobs.map((job) => {
                let freq = job.cron
                try { freq = formatCron(job.cron) } catch (err) { console.warn('[formatCron] invalid cron:', job.cron, err) }
                const lastRun = job.lastRunAt
                  ? new Date(job.lastRunAt).toLocaleDateString('th-TH')
                  : '—'
                const isRunning = job.isActive && !job.isPaused

                return (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{job.reportName}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{freq}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{job.delivery}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{lastRun}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={[
                          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap',
                          isRunning
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700',
                        ].join(' ')}
                      >
                        <span
                          className={[
                            'h-1.5 w-1.5 rounded-full',
                            isRunning ? 'bg-green-500' : 'bg-amber-500',
                          ].join(' ')}
                          aria-hidden
                        />
                        {isRunning ? 'กำลังทำงาน' : 'หยุดชั่วคราว'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => toggleJob(job.id)}
                        className={[
                          'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                          isRunning
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200',
                        ].join(' ')}
                      >
                        {isRunning ? 'หยุด' : 'เริ่ม'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

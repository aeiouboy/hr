'use client'

// admin/system/reports/schedule/page.tsx — Schedule Report
// CronPicker UI + delivery select (View/Email/CG-Gateway) — BRD #196 — Part E Wave 2a

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import { CronPicker } from '@/components/admin/admin-system/CronPicker'
import { formatCron } from '@/lib/admin/utils/cronFormat'

const DELIVERY_OPTIONS = [
  { value: 'view',       label: 'ดูในระบบ' },
  { value: 'email',      label: 'อีเมล' },
  { value: 'cg-gateway', label: 'CG Gateway' },
] as const

export default function ScheduleReportPage() {
  const { reports, scheduledJobs, scheduleReport } = useDataManagement()

  const [selectedReportId, setSelectedReportId] = useState('')
  const [cron, setCron] = useState('0 9 * * 1')
  const [delivery, setDelivery] = useState<'view' | 'email' | 'cg-gateway'>('view')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (!selectedReportId) return
    scheduleReport(selectedReportId, cron, delivery)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const activeJobs = scheduledJobs.filter((j) => j.isActive)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">กำหนดเวลารายงาน</h2>
        <p className="text-sm text-gray-500 mt-1">Schedule Report — BRD #196</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Schedule form */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">สร้างตารางกำหนดการ</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1" htmlFor="sched-report">
              รายงาน <span className="text-red-500">*</span>
            </label>
            <select
              id="sched-report"
              value={selectedReportId}
              onChange={(e) => setSelectedReportId(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">— เลือกรายงาน —</option>
              {reports.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">ความถี่</label>
            <CronPicker value={cron} onChange={setCron} />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1" htmlFor="sched-delivery">
              ช่องทางส่ง
            </label>
            <select
              id="sched-delivery"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value as typeof delivery)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DELIVERY_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedReportId}
            className="w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saved ? <span className="inline-flex items-center gap-1.5"><Check size={16}/>บันทึกแล้ว</span> : 'บันทึกกำหนดการ'}
          </button>
        </div>

        {/* Active jobs list */}
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            งานที่ใช้งานอยู่ ({activeJobs.length})
          </h3>
          {activeJobs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">ยังไม่มีงานกำหนดการ</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {activeJobs.map((job) => {
                const rpt = reports.find((r) => r.id === job.reportId)
                let freq = job.cron
                try { freq = formatCron(job.cron) } catch (err) { console.warn('[formatCron] invalid cron:', job.cron, err) }
                return (
                  <li key={job.id} className="py-2.5 flex items-start gap-3">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-green-400 flex-shrink-0" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-900 truncate">{rpt?.name ?? job.reportId}</p>
                      <p className="text-xs text-gray-500">{freq} · {job.delivery}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'

// admin/system/integration/page.tsx — Integration hub
// IC/API endpoints table + Teams Viva config form — BRD #192, #194 — Part E Wave 2a

import { useState } from 'react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

type Tab = 'endpoints' | 'teams-viva'

const STATUS_COLORS: Record<string, string> = {
  active:   'bg-green-100 text-green-700',
  pending:  'bg-amber-100 text-amber-700',
  failed:   'bg-red-100 text-red-700',
  inactive: 'bg-gray-100 text-gray-500',
}

export default function IntegrationPage() {
  const { integrationEndpoints, teamsVivaConfig } = useDataManagement()
  const [tab, setTab] = useState<Tab>('endpoints')

  // Local form state for Teams Viva (mock — no write action in store for viva config)
  const [tenantId, setTenantId] = useState(teamsVivaConfig.tenantId)
  const [syncEnabled, setSyncEnabled] = useState(teamsVivaConfig.syncEnabled)
  const [savedViva, setSavedViva] = useState(false)

  function handleSaveViva() {
    // mock save
    setSavedViva(true)
    setTimeout(() => setSavedViva(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">การเชื่อมต่อ</h2>
        <p className="text-sm text-gray-500 mt-1">Integration hub — IC/API Endpoints · Microsoft Teams Viva</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {([
          { key: 'endpoints' as Tab, label: 'IC/API Endpoints' },
          { key: 'teams-viva' as Tab, label: 'Microsoft Teams Viva' },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            role="tab"
            aria-selected={tab === key}
            className={[
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              tab === key
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-800',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Endpoints */}
      {tab === 'endpoints' && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="flex gap-3">
            {['active', 'pending', 'failed'].map((s) => {
              const count = integrationEndpoints.filter((e) => e.status === s).length
              return (
                <div key={s} className={`rounded-lg border px-3 py-2 text-center ${STATUS_COLORS[s] ?? ''} border-current border-opacity-20`}>
                  <p className="text-lg font-bold">{count}</p>
                  <p className="text-xs capitalize">{s}</p>
                </div>
              )
            })}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ชื่อ Endpoint</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">โมดูล</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">ทิศทาง</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Protocol</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Sync ล่าสุด</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {integrationEndpoints.map((ep) => {
                  const lastSync = ep.lastSyncAt
                    ? new Date(ep.lastSyncAt).toLocaleString('th-TH', {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })
                    : '—'
                  return (
                    <tr key={ep.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-900 whitespace-nowrap">{ep.name}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{ep.module}</td>
                      <td className="px-4 py-3">
                        <span className={[
                          'rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap',
                          ep.direction === 'inbound' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600',
                        ].join(' ')}>
                          {ep.direction === 'inbound' ? '← inbound' : 'outbound →'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{ep.protocol}</td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{lastSync}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={[
                          'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
                          STATUS_COLORS[ep.status] ?? 'bg-gray-100 text-gray-500',
                        ].join(' ')}>
                          {ep.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Teams Viva */}
      {tab === 'teams-viva' && (
        <div className="space-y-4">
          {/* Q10 banner — awaiting BA spec */}
          {teamsVivaConfig.baSpecPending && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-2">
              <span className="text-amber-500 flex-shrink-0" aria-hidden>⚠</span>
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Q10 — รอ BA Spec:</span>{' '}
                การเชื่อมต่อ Microsoft Teams Viva รอการระบุ requirements จาก BA ก่อนเปิดใช้งาน (BRD #194)
              </p>
            </div>
          )}

          <div className="rounded-lg border border-gray-200 bg-white p-5 space-y-4 max-w-lg">
            <h3 className="text-sm font-semibold text-gray-700">การตั้งค่าการเชื่อมต่อ</h3>

            <div>
              <label className="block text-xs text-gray-500 mb-1" htmlFor="viva-tenant">
                Tenant ID
              </label>
              <input
                id="viva-tenant"
                type="text"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">สถานะการเชื่อมต่อ</label>
              <span className={[
                'inline-block rounded-full px-3 py-1 text-xs font-medium',
                STATUS_COLORS[teamsVivaConfig.status] ?? 'bg-gray-100 text-gray-500',
              ].join(' ')}>
                {teamsVivaConfig.status}
              </span>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-2">Fields ที่ Sync</label>
              <div className="flex flex-wrap gap-2">
                {teamsVivaConfig.syncFields.map((f) => (
                  <span key={f} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-700" htmlFor="viva-sync">
                เปิดใช้งาน Sync
              </label>
              <input
                id="viva-sync"
                type="checkbox"
                checked={syncEnabled}
                onChange={(e) => setSyncEnabled(e.target.checked)}
                disabled={teamsVivaConfig.baSpecPending}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              {teamsVivaConfig.baSpecPending && (
                <span className="text-xs text-amber-600">(ปิดใช้งาน — รอ BA Spec)</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveViva}
              disabled={teamsVivaConfig.baSpecPending}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {savedViva ? '✓ บันทึกแล้ว' : 'บันทึกการตั้งค่า'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

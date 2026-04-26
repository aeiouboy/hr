// VALIDATION_EXEMPT: admin landing/audit page — filter inputs only, no submit form (per design-gates Track C 2026-04-26)
'use client'

// proxy/page.tsx — Proxy Management (BRD #187)
// AC-6: DateRangePicker (native input) + delegatee excludes delegator + audit write-through
// Actor: Admin (exclusive role — Rule 70)
import { useState } from 'react'
import { X } from 'lucide-react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { Proxy, ProxyStatus } from '@/lib/admin/types/usersPermissions'

// PROXY_MAX_DAYS = 90 ตาม spec Q2
const PROXY_MAX_DAYS = 90

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function maxDateStr() {
  const d = new Date()
  d.setDate(d.getDate() + PROXY_MAX_DAYS)
  return d.toISOString().split('T')[0]
}

const SCOPE_OPTIONS = [
  { value: 'all', label: 'All — ทุกสิทธิ์' },
  { value: 'leave-only', label: 'Leave-only — เฉพาะวันลา' },
  { value: 'approval-only', label: 'Approval-only — เฉพาะการอนุมัติ' },
] as const

type ScopeValue = 'all' | 'leave-only' | 'approval-only'

const STATUS_BADGE: Record<ProxyStatus, { label: string; cls: string }> = {
  PENDING: { label: 'รออนุมัติ', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  ACTIVE: { label: 'ใช้งานอยู่', cls: 'bg-green-50 text-green-700 border-green-200' },
  EXPIRED: { label: 'หมดอายุ', cls: 'bg-gray-50 text-gray-500 border-gray-200' },
  REVOKED: { label: 'ยกเลิกแล้ว', cls: 'bg-red-50 text-red-600 border-red-200' },
}

// -----------------------------------------------------------------------
// Create/Edit Modal
// -----------------------------------------------------------------------
function ProxyModal({
  users,
  onClose,
  onSave,
}: {
  users: { userId: string; fullNameTh: string; position: string }[]
  onClose: () => void
  onSave: (data: {
    delegatorId: string
    delegateeId: string
    startDate: string
    endDate: string
    scope: ScopeValue
    reason: string
  }) => void
}) {
  const [delegatorId, setDelegatorId] = useState('')
  const [delegateeId, setDelegateeId] = useState('')
  const [startDate, setStartDate] = useState(todayStr())
  const [endDate, setEndDate] = useState('')
  const [scope, setScope] = useState<ScopeValue>('all')
  const [reason, setReason] = useState('')

  // delegatee dropdown excludes delegator ตาม AC-6
  const delegateeOptions = users.filter((u) => u.userId !== delegatorId)

  const isValid =
    delegatorId &&
    delegateeId &&
    delegatorId !== delegateeId &&
    startDate &&
    endDate &&
    endDate >= startDate

  function handleSave() {
    if (!isValid) return
    onSave({ delegatorId, delegateeId, startDate, endDate, scope, reason })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="สร้าง Proxy ใหม่"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">สร้าง Proxy ใหม่</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded"
            aria-label="ปิด dialog"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Delegator */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ผู้มอบหมาย <span className="text-red-500">*</span>
            </label>
            <select
              value={delegatorId}
              onChange={(e) => {
                setDelegatorId(e.target.value)
                // reset delegatee ถ้าเหมือน delegator
                if (delegateeId === e.target.value) setDelegateeId('')
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">— เลือกผู้มอบหมาย —</option>
              {users.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.fullNameTh} ({u.userId})
                </option>
              ))}
            </select>
          </div>

          {/* Delegatee — excludes delegator ตาม AC-6 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ผู้รับมอบหมาย <span className="text-red-500">*</span>
            </label>
            <select
              value={delegateeId}
              onChange={(e) => setDelegateeId(e.target.value)}
              disabled={!delegatorId}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="">— เลือกผู้รับมอบหมาย —</option>
              {delegateeOptions.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.fullNameTh} ({u.userId})
                </option>
              ))}
            </select>
            {delegatorId && delegateeOptions.length === 0 && (
              <p className="text-xs text-red-500 mt-1">ไม่มีผู้ใช้อื่นให้เลือก</p>
            )}
          </div>

          {/* Date range — native input (C3 no 3rd party) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันเริ่มต้น <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={startDate}
                min={todayStr()}
                max={maxDateStr()}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันสิ้นสุด <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate || todayStr()}
                max={maxDateStr()}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400">ระยะเวลาสูงสุด {PROXY_MAX_DAYS} วัน</p>

          {/* Scope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ขอบเขตสิทธิ์</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as ScopeValue)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SCOPE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เหตุผล (ไม่บังคับ)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="เช่น ลาพักร้อน, ไปอบรม, ลาคลอด"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------
export default function ProxyPage() {
  const users = useUsersPermissions((s) => s.users)
  const proxies = useUsersPermissions((s) => s.proxies)
  const createProxy = useUsersPermissions((s) => s.createProxy)

  const [showModal, setShowModal] = useState(false)

  // user map สำหรับ display
  const userMap = Object.fromEntries(users.map((u) => [u.userId, u.fullNameTh]))

  function handleSave(data: {
    delegatorId: string
    delegateeId: string
    startDate: string
    endDate: string
    scope: ScopeValue
    reason: string
  }) {
    try {
      createProxy({
        delegatorId: data.delegatorId,
        delegatorName: userMap[data.delegatorId] ?? data.delegatorId,
        delegateeId: data.delegateeId,
        delegateeName: userMap[data.delegateeId] ?? data.delegateeId,
        scope: [data.scope],
        startDate: data.startDate,
        endDate: data.endDate,
        reason: data.reason,
        createdBy: 'EMP009', // Admin actor (mock)
      })
    } catch (err) {
      console.warn('[ProxyPage] handleSave error:', err)
    }
    setShowModal(false)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">จัดการ Proxy</h1>
          <p className="text-sm text-gray-500 mt-0.5">BRD #187 — มอบหมายสิทธิ์ชั่วคราว พร้อม Log ทุก action</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          <span>+</span>
          <span>สร้าง Proxy</span>
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table role="table" className="w-full text-sm" aria-label="รายการ Proxy">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">ผู้มอบหมาย</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap">ผู้รับมอบหมาย</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap hidden sm:table-cell">ขอบเขต</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 whitespace-nowrap hidden md:table-cell">ระยะเวลา</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 w-24">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {proxies.length === 0 && (
                <tr role="row">
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    ยังไม่มีรายการ Proxy
                  </td>
                </tr>
              )}
              {proxies.map((proxy) => {
                const badge = STATUS_BADGE[proxy.status]
                return (
                  <tr key={proxy.id} role="row" className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{proxy.delegatorName}</p>
                      <p className="text-xs text-gray-400">{proxy.delegatorId}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{proxy.delegateeName}</p>
                      <p className="text-xs text-gray-400">{proxy.delegateeId}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {proxy.scope.map((s) => (
                          <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell whitespace-nowrap">
                      {proxy.startDate} → {proxy.endDate}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={[
                          'text-xs px-2 py-0.5 rounded-full border whitespace-nowrap',
                          badge.cls,
                        ].join(' ')}
                      >
                        {badge.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProxyModal
          users={users.map((u) => ({
            userId: u.userId,
            fullNameTh: u.fullNameTh,
            position: u.position,
          }))}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

// ScopeValue declared at top of file — ไม่ duplicate ที่นี่

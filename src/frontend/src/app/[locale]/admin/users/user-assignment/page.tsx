'use client'

// user-assignment/page.tsx — User Assignment (BRD #186)
// AC-5: UserTypeahead + multi-role chips + multi-permission chips
// Actor: HRIS Admin (Rule 70)
import { useState, useMemo, useEffect } from 'react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { UserAssignment } from '@/lib/admin/types/usersPermissions'

// UserTypeahead — debounce 200ms, matches displayName / userId / email
function UserTypeahead({
  users,
  onSelect,
  placeholder = 'ค้นหาพนักงาน...',
}: {
  users: UserAssignment[]
  onSelect: (u: UserAssignment) => void
  placeholder?: string
}) {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [open, setOpen] = useState(false)

  // debounce 200ms ตาม AC-5
  useEffect(() => {
    if (!query) {
      setDebouncedQuery('')
      return
    }
    const t = setTimeout(() => setDebouncedQuery(query), 200)
    return () => clearTimeout(t)
  }, [query])

  const filtered = useMemo(() => {
    if (debouncedQuery.length < 2) return []
    const q = debouncedQuery.toLowerCase()
    return users.filter(
      (u) =>
        u.fullNameTh.toLowerCase().includes(q) ||
        u.fullNameEn.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    )
  }, [debouncedQuery, users])

  function handleSelect(u: UserAssignment) {
    onSelect(u)
    setQuery('')
    setDebouncedQuery('')
    setOpen(false)
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="ค้นหาพนักงาน"
        aria-autocomplete="list"
        aria-expanded={open && filtered.length > 0}
      />
      {open && filtered.length > 0 && (
        <ul
          role="listbox"
          aria-label="ผลการค้นหาพนักงาน"
          className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filtered.map((u) => (
            <li
              key={u.userId}
              role="option"
              aria-selected="false"
              onMouseDown={() => handleSelect(u)}
              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-900">{u.fullNameTh}</p>
              <p className="text-xs text-gray-500">{u.userId} · {u.department} · {u.position}</p>
            </li>
          ))}
        </ul>
      )}
      {open && debouncedQuery.length >= 2 && filtered.length === 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm text-gray-400">
          ไม่พบพนักงานที่ตรงกับ "{debouncedQuery}"
        </div>
      )}
    </div>
  )
}

// Multi-chip selector
function ChipSelector({
  label,
  options,
  selected,
  onToggle,
  colorClass = 'bg-blue-100 text-blue-700',
}: {
  label: string
  options: { id: string; name: string }[]
  selected: string[]
  onToggle: (id: string) => void
  colorClass?: string
}) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              aria-pressed={isSelected}
              className={[
                'px-3 py-1.5 rounded-full text-xs border transition-colors',
                isSelected
                  ? `${colorClass} border-current`
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400',
              ].join(' ')}
            >
              {opt.name}
              {isSelected && <span className="ml-1">✓</span>}
            </button>
          )
        })}
        {options.length === 0 && (
          <span className="text-xs text-gray-400">ไม่มีตัวเลือก</span>
        )}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------
export default function UserAssignmentPage() {
  const users = useUsersPermissions((s) => s.users)
  const roles = useUsersPermissions((s) => s.roles)
  const dataPermissions = useUsersPermissions((s) => s.dataPermissions)
  const assignUserRoles = useUsersPermissions((s) => s.assignUserRoles)

  const [selectedUser, setSelectedUser] = useState<UserAssignment | null>(null)
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([])
  const [selectedDpId, setSelectedDpId] = useState<string>('')
  const [saved, setSaved] = useState(false)

  function handleSelectUser(u: UserAssignment) {
    setSelectedUser(u)
    setSelectedRoleIds(u.roleIds)
    setSelectedDpId(u.dataPermissionId)
    setSaved(false)
  }

  function toggleRole(id: string) {
    setSelectedRoleIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
    setSaved(false)
  }

  function toggleDp(id: string) {
    setSelectedDpId((prev) => (prev === id ? '' : id))
    setSaved(false)
  }

  function handleSave() {
    if (!selectedUser) return
    if (selectedRoleIds.length === 0 && !selectedDpId) return
    try {
      assignUserRoles(selectedUser.userId, selectedRoleIds)
      setSaved(true)
    } catch (err) {
      console.warn('[UserAssignment] handleSave error:', err)
    }
  }

  const canSave = selectedRoleIds.length > 0 || !!selectedDpId

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">กำหนดสิทธิ์ผู้ใช้</h1>
        <p className="text-sm text-gray-500 mt-0.5">BRD #186 — Assign ผู้ใช้ → กลุ่มสิทธิ์แอปพลิเคชัน + กลุ่มสิทธิ์ข้อมูล</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left — ค้นหาผู้ใช้ */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-sm font-medium text-gray-700 mb-3">ค้นหาพนักงาน</p>
            <UserTypeahead users={users} onSelect={handleSelectUser} />
            <p className="text-xs text-gray-400 mt-2">พิมพ์อย่างน้อย 2 ตัวอักษร — ค้นหาจากชื่อ, รหัสพนักงาน, email</p>

            {/* รายชื่อพนักงานทั้งหมด */}
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">พนักงานทั้งหมด ({users.length} คน)</p>
              <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto rounded-lg border border-gray-100">
                {users.map((u) => (
                  <li key={u.userId}>
                    <button
                      onClick={() => handleSelectUser(u)}
                      className={[
                        'w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors',
                        selectedUser?.userId === u.userId ? 'bg-blue-50 border-l-2 border-blue-600' : '',
                      ].join(' ')}
                    >
                      <p className="text-sm font-medium text-gray-900">{u.fullNameTh}</p>
                      <p className="text-xs text-gray-400">{u.userId} · {u.department}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right — assignment panel */}
        <div>
          {!selectedUser ? (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center text-center h-full min-h-64">
              <p className="text-gray-400 text-sm">เลือกพนักงานทางซ้ายเพื่อกำหนดสิทธิ์</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-5">
              {/* User summary */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-900">{selectedUser.fullNameTh}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedUser.userId} · {selectedUser.position}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  แผนก: {selectedUser.department}
                </p>
                <p className={['text-xs mt-1', selectedUser.isActive ? 'text-green-600' : 'text-red-500'].join(' ')}>
                  {selectedUser.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>

              {/* Role chips */}
              <ChipSelector
                label="กลุ่มสิทธิ์แอปพลิเคชัน"
                options={roles.map((r) => ({ id: r.id, name: r.name }))}
                selected={selectedRoleIds}
                onToggle={toggleRole}
                colorClass="bg-purple-100 text-purple-700"
              />

              {/* Data permission chips */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">กลุ่มสิทธิ์ข้อมูล</p>
                <div className="flex flex-wrap gap-2">
                  {dataPermissions.map((dp) => (
                    <button
                      key={dp.id}
                      type="button"
                      onClick={() => toggleDp(dp.id)}
                      aria-pressed={selectedDpId === dp.id}
                      className={[
                        'px-3 py-1.5 rounded-full text-xs border transition-colors',
                        selectedDpId === dp.id
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : 'bg-white text-gray-600 border-gray-300 hover:border-green-400',
                      ].join(' ')}
                    >
                      {dp.label}
                      {selectedDpId === dp.id && <span className="ml-1">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                {saved && (
                  <span className="text-xs text-green-600">บันทึกสำเร็จ</span>
                )}
                <button
                  onClick={handleSave}
                  disabled={!canSave}
                  className="ml-auto px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  บันทึก
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

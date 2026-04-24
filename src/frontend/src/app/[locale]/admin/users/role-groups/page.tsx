'use client'

// role-groups/page.tsx — Application Role Group (BRD #185)
// AC-3: list + create/edit modal + capabilities matrix (Menu × View/Edit/Enable/Disable)
import { useState } from 'react'
import { X } from 'lucide-react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { RoleGroup } from '@/lib/admin/types/usersPermissions'

// 10 menus ตาม spec T7
const MENU_LIST = [
  'EC.EmpJob',
  'EC.Compensation',
  'EC.Employment',
  'EC.PersonalInfo',
  'EC.JobInfo',
  'EC.Position',
  'EC.OrgAssignment',
  'EC.EmploymentDetails',
  'EC.WorkPermit',
  'EC.Termination',
] as const

// 6 roles ตาม BRD #185 §2.4 — verbatim (Rule C8 + Rule 70)
const ROLE_OPTIONS = [
  'Employee',
  'Manager',
  'HRBP',
  'SPD',
  'HRIS Admin',
  'System Admin',
] as const

type RoleOption = (typeof ROLE_OPTIONS)[number]

type CapabilityRow = {
  menu: string
  view: boolean
  edit: boolean
  enable: boolean
  disable: boolean
}

function defaultCapabilities(): CapabilityRow[] {
  return MENU_LIST.map((menu) => ({ menu, view: false, edit: false, enable: false, disable: false }))
}

// แปลง CapabilityCode[] จาก store เป็น CapabilityRow[] สำหรับ edit
function roleToCapRows(role: RoleGroup): CapabilityRow[] {
  return MENU_LIST.map((menu) => ({
    menu,
    view: role.capabilities.some((c) => c.startsWith(menu) && c.endsWith('_VIEW')) || false,
    edit: role.capabilities.some((c) => c.startsWith(menu) && c.endsWith('_EDIT')) || false,
    enable: role.capabilities.some((c) => c.startsWith(menu) && c.endsWith('_ENABLE')) || false,
    disable: role.capabilities.some((c) => c.startsWith(menu) && c.endsWith('_DISABLE')) || false,
  }))
}

// สร้าง CapabilityCode[] จาก CapabilityRow[] สำหรับ save
function capRowsToCodes(rows: CapabilityRow[]): string[] {
  const codes: string[] = []
  for (const row of rows) {
    if (row.view) codes.push(`${row.menu}_VIEW`)
    if (row.edit) codes.push(`${row.menu}_EDIT`)
    if (row.enable) codes.push(`${row.menu}_ENABLE`)
    if (row.disable) codes.push(`${row.menu}_DISABLE`)
  }
  return codes
}

// -----------------------------------------------------------------------
// CapabilitiesMatrix component
// -----------------------------------------------------------------------
function CapabilitiesMatrix({
  rows,
  onChange,
}: {
  rows: CapabilityRow[]
  onChange: (updated: CapabilityRow[]) => void
}) {
  function toggle(menuIdx: number, field: keyof Omit<CapabilityRow, 'menu'>) {
    const updated = rows.map((r, i) =>
      i === menuIdx ? { ...r, [field]: !r[field] } : r
    )
    onChange(updated)
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table
        role="table"
        className="w-full text-sm"
        aria-label="CapabilitiesMatrix — สิทธิ์แต่ละเมนู"
      >
        <thead className="bg-gray-50">
          <tr role="row">
            <th className="px-4 py-2.5 text-left font-medium text-gray-700 whitespace-nowrap">เมนู</th>
            <th className="px-3 py-2.5 text-center font-medium text-gray-700 w-16">View</th>
            <th className="px-3 py-2.5 text-center font-medium text-gray-700 w-16">Edit</th>
            <th className="px-3 py-2.5 text-center font-medium text-gray-700 w-16">Enable</th>
            <th className="px-3 py-2.5 text-center font-medium text-gray-700 w-16">Disable</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <tr key={row.menu} role="row" className="hover:bg-gray-50">
              <td className="px-4 py-2 font-mono text-xs text-gray-600 whitespace-nowrap">{row.menu}</td>
              {(['view', 'edit', 'enable', 'disable'] as const).map((field) => (
                <td key={field} className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={row[field]}
                    onChange={() => toggle(idx, field)}
                    aria-label={`${row.menu} ${field}`}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// -----------------------------------------------------------------------
// Modal สำหรับ create/edit
// -----------------------------------------------------------------------
type ModalMode = { type: 'create' } | { type: 'edit'; role: RoleGroup }

function RoleGroupModal({
  mode,
  onClose,
  onSave,
}: {
  mode: ModalMode
  onClose: () => void
  onSave: (data: { name: string; roleType: RoleOption; capRows: CapabilityRow[] }) => void
}) {
  const isEdit = mode.type === 'edit'
  const existing = isEdit ? mode.role : null

  const [name, setName] = useState(existing?.name ?? '')
  const [roleType, setRoleType] = useState<RoleOption>(
    (existing?.name as RoleOption) ?? 'Employee'
  )
  const [capRows, setCapRows] = useState<CapabilityRow[]>(
    existing ? roleToCapRows(existing) : defaultCapabilities()
  )

  function handleSave() {
    if (!name.trim()) return
    onSave({ name: name.trim(), roleType, capRows })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'แก้ไขกลุ่มสิทธิ์แอปพลิเคชัน' : 'สร้างกลุ่มสิทธิ์แอปพลิเคชันใหม่'}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-16 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'แก้ไขกลุ่มสิทธิ์แอปพลิเคชัน' : 'สร้างกลุ่มสิทธิ์ใหม่'}
          </h2>
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
          {/* ชื่อ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อกลุ่มสิทธิ์ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น HRIS Admin Group"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={roleType}
              onChange={(e) => setRoleType(e.target.value as RoleOption)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Capabilities Matrix */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">สิทธิ์แต่ละเมนู</p>
            <CapabilitiesMatrix rows={capRows} onChange={setCapRows} />
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
            disabled={!name.trim()}
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
export default function RoleGroupsPage() {
  const roles = useUsersPermissions((s) => s.roles)
  const createRole = useUsersPermissions((s) => s.createRole)
  const updateRole = useUsersPermissions((s) => s.updateRole)
  const deleteRole = useUsersPermissions((s) => s.deleteRole)

  const [modal, setModal] = useState<ModalMode | null>(null)

  function handleSave(data: { name: string; roleType: RoleOption; capRows: CapabilityRow[] }) {
    const caps = capRowsToCodes(data.capRows) as ReturnType<typeof capRowsToCodes>
    if (modal?.type === 'edit') {
      updateRole(modal.role.id, {
        name: data.name,
        capabilities: caps as any,
        updatedAt: new Date().toISOString(),
      })
    } else {
      createRole({
        name: data.name,
        description: `Role Group: ${data.name}`,
        capabilities: caps as any,
      })
    }
    setModal(null)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">กลุ่มสิทธิ์แอปพลิเคชัน</h1>
          <p className="text-sm text-gray-500 mt-0.5">BRD #185 — สิทธิ์เมนูและฟังก์ชันระดับ Field</p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <span>+</span>
          <span className="whitespace-nowrap">เพิ่มกลุ่มสิทธิ์</span>
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table role="table" className="w-full text-sm" aria-label="รายการกลุ่มสิทธิ์แอปพลิเคชัน">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-4 py-3 text-left font-medium text-gray-700">ชื่อกลุ่มสิทธิ์</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 hidden sm:table-cell">คำอธิบาย</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 w-24">ประเภท</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 w-28">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.length === 0 && (
                <tr role="row">
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    ยังไม่มีกลุ่มสิทธิ์
                  </td>
                </tr>
              )}
              {roles.map((role) => (
                <tr key={role.id} role="row" className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {role.name}
                    {role.isSystemRole && (
                      <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        system
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell max-w-xs truncate">
                    {role.description}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {role.capabilities.length} สิทธิ์
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setModal({ type: 'edit', role })}
                        className="text-xs text-blue-600 hover:underline px-2 py-1"
                        aria-label={`แก้ไข ${role.name}`}
                      >
                        แก้ไข
                      </button>
                      {!role.isSystemRole && (
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-xs text-red-500 hover:underline px-2 py-1"
                          aria-label={`ลบ ${role.name}`}
                        >
                          ลบ
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <RoleGroupModal
          mode={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

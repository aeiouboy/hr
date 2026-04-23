'use client'

// data-permissions/page.tsx — Data Permission Group (BRD #184)
// AC-4: 4 preset chips + custom ScopeBuilder (BRD dimensions verbatim)
// Actors: HRIS Admin / SPD Admin (Rule 70)
import { useState } from 'react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { DataPermission } from '@/lib/admin/types/usersPermissions'

// Preset scopes — ตาม BRD #184 §2.4 (Rule C8)
type PresetKey = 'OWN_DATA' | 'TEAM_DATA' | 'COMPANY_WIDE' | 'GLOBAL'

const PRESET_CHIPS: { key: PresetKey; label: string; description: string }[] = [
  {
    key: 'OWN_DATA',
    label: 'ข้อมูลตัวเอง (Own)',
    description: 'เห็นข้อมูลตัวเองเท่านั้น',
  },
  {
    key: 'TEAM_DATA',
    label: 'ข้อมูลทีม (Team)',
    description: 'เห็นข้อมูลทีมที่ตัวเองดูแล',
  },
  {
    key: 'COMPANY_WIDE',
    label: 'ทั้งบริษัท (Company-wide)',
    description: 'เห็นข้อมูลทุกคนภายในบริษัทเดียวกัน',
  },
  {
    key: 'GLOBAL',
    label: 'ทั่วโลก (Global)',
    description: 'เห็นข้อมูลทุก entity cross-company',
  },
]

// ตัวอย่าง options สำหรับ custom scope builder
const BG_OPTIONS = ['Central Retail', 'Central Pattana', 'Central Food Retail', 'Central Department Store']
const COMPANY_OPTIONS = ['Central Group Co., Ltd.', 'Central Retail Corporation', 'CPN Co., Ltd.']
const DIVISION_OPTIONS = ['Operations Division', 'Finance Division', 'People Development Division', 'IT Division']
const DEPT_OPTIONS = ['Human Resources', 'Finance', 'Operations', 'Marketing', 'Information Technology']
const EMP_GROUP_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Temporary']
const PG_OPTIONS = ['M1', 'M2', 'M3', 'M4', 'M5', 'S1', 'S2', 'S3', 'S4']

// Custom scope state shape
type CustomScope = {
  businessGroups: string[]
  companies: string[]
  divisions: string[]
  departments: string[]
  employeeGroups: string[]
  personalGrades: string[]
  newSpd: boolean // BRD #184 — SPD ใหม่ เปิดสิทธิ์ทั้งหมดโดยไม่ restrict ช่วงเวลา
}

function emptyScope(): CustomScope {
  return {
    businessGroups: [],
    companies: [],
    divisions: [],
    departments: [],
    employeeGroups: [],
    personalGrades: [],
    newSpd: false,
  }
}

// Multi-select helper
function MultiSelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  function toggle(opt: string) {
    onChange(value.includes(opt) ? value.filter((x) => x !== opt) : [...value, opt])
  }

  return (
    <div>
      <p className="text-xs font-medium text-gray-600 mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={[
              'px-2.5 py-1 rounded-full text-xs border transition-colors',
              value.includes(opt)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400',
            ].join(' ')}
            aria-pressed={value.includes(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// ScopeBuilder component (ตาม BRD #184 dimensions verbatim — Rule C8)
// -----------------------------------------------------------------------
function ScopeBuilder({
  scope,
  onChange,
}: {
  scope: CustomScope
  onChange: (s: CustomScope) => void
}) {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      {/* Module — fixed "EC" per BRD #184 */}
      <div>
        <p className="text-xs font-medium text-gray-600 mb-1">Module</p>
        <span className="px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-200">
          EC (ค่าเริ่มต้น ไม่สามารถเปลี่ยนได้)
        </span>
      </div>

      <MultiSelectField
        label="กลุ่มธุรกิจ (Business Group)"
        options={BG_OPTIONS}
        value={scope.businessGroups}
        onChange={(v) => onChange({ ...scope, businessGroups: v })}
      />
      <MultiSelectField
        label="บริษัท (Company)"
        options={COMPANY_OPTIONS}
        value={scope.companies}
        onChange={(v) => onChange({ ...scope, companies: v })}
      />
      <MultiSelectField
        label="หน่วยงาน (Division)"
        options={DIVISION_OPTIONS}
        value={scope.divisions}
        onChange={(v) => onChange({ ...scope, divisions: v })}
      />
      <MultiSelectField
        label="แผนก (Department)"
        options={DEPT_OPTIONS}
        value={scope.departments}
        onChange={(v) => onChange({ ...scope, departments: v })}
      />
      <MultiSelectField
        label="กลุ่มพนักงาน (Employee Group)"
        options={EMP_GROUP_OPTIONS}
        value={scope.employeeGroups}
        onChange={(v) => onChange({ ...scope, employeeGroups: v })}
      />
      <MultiSelectField
        label="เกรด (Personal Grade / PG)"
        options={PG_OPTIONS}
        value={scope.personalGrades}
        onChange={(v) => onChange({ ...scope, personalGrades: v })}
      />

      {/* SPD ใหม่ toggle — BRD #184 line 425 */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
        <input
          type="checkbox"
          id="newSpd"
          checked={scope.newSpd}
          onChange={(e) => onChange({ ...scope, newSpd: e.target.checked })}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="newSpd" className="text-sm text-gray-700 cursor-pointer">
          SPD ใหม่ — เปิดสิทธิ์เห็นทั้งหมดโดยไม่ restrict ช่วงเวลา
        </label>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// Modal
// -----------------------------------------------------------------------
type ModalMode = { type: 'create' } | { type: 'edit'; dp: DataPermission }

function DataPermissionModal({
  mode,
  onClose,
  onSave,
}: {
  mode: ModalMode
  onClose: () => void
  onSave: (data: { label: string; scope: PresetKey; customScope: CustomScope }) => void
}) {
  const isEdit = mode.type === 'edit'
  const existing = isEdit ? mode.dp : null

  const [label, setLabel] = useState(existing?.label ?? '')
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>(
    (existing?.scope as PresetKey) ?? 'OWN_DATA'
  )
  const [customScope, setCustomScope] = useState<CustomScope>(emptyScope())

  // Auto-fill scope เมื่อ select preset
  function selectPreset(key: PresetKey) {
    setSelectedPreset(key)
    // preset shortcut ตาม spec T6
    if (key === 'OWN_DATA') {
      setCustomScope({ ...emptyScope(), departments: ['Human Resources'] })
    } else if (key === 'TEAM_DATA') {
      setCustomScope({ ...emptyScope(), divisions: ['Operations Division'] })
    } else if (key === 'COMPANY_WIDE') {
      setCustomScope({ ...emptyScope(), companies: [...COMPANY_OPTIONS] })
    } else if (key === 'GLOBAL') {
      setCustomScope({
        businessGroups: [...BG_OPTIONS],
        companies: [...COMPANY_OPTIONS],
        divisions: [...DIVISION_OPTIONS],
        departments: [...DEPT_OPTIONS],
        employeeGroups: [...EMP_GROUP_OPTIONS],
        personalGrades: [...PG_OPTIONS],
        newSpd: false,
      })
    }
  }

  function handleSave() {
    if (!label.trim()) return
    onSave({ label: label.trim(), scope: selectedPreset, customScope })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'แก้ไขกลุ่มสิทธิ์ข้อมูล' : 'สร้างกลุ่มสิทธิ์ข้อมูลใหม่'}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-12 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'แก้ไขกลุ่มสิทธิ์ข้อมูล' : 'สร้างกลุ่มสิทธิ์ข้อมูลใหม่'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded"
            aria-label="ปิด dialog"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* ชื่อ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อกลุ่มสิทธิ์ข้อมูล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="เช่น ทีม HR บริษัทแม่"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preset chips */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">ขอบเขตข้อมูล (เลือก preset หรือกำหนดเอง)</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_CHIPS.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => selectPreset(chip.key)}
                  className={[
                    'px-3 py-1.5 rounded-full text-sm border transition-colors',
                    selectedPreset === chip.key
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400',
                  ].join(' ')}
                  aria-pressed={selectedPreset === chip.key}
                  title={chip.description}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom scope builder */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">กำหนดขอบเขตเอง (Custom Scope)</p>
            <ScopeBuilder scope={customScope} onChange={setCustomScope} />
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
            disabled={!label.trim()}
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
export default function DataPermissionsPage() {
  const dataPermissions = useUsersPermissions((s) => s.dataPermissions)
  const [modal, setModal] = useState<ModalMode | null>(null)

  // หมายเหตุ: store Wave 1 ใช้ DataPermission type — เก็บ scope แบบ enum
  // ถ้า upsertPermissionGroup มีใน store ให้ใช้; ถ้าไม่มีให้ skip save (mock-only)
  function handleSave(_data: { label: string; scope: PresetKey; customScope: CustomScope }) {
    // Wave 1 store ใช้ DataPermission แบบ simple — save closes modal (mock-only UI)
    setModal(null)
  }

  const scopeLabel: Record<string, string> = {
    OWN_DATA: 'ข้อมูลตัวเอง',
    TEAM_DATA: 'ข้อมูลทีม',
    COMPANY_WIDE: 'ทั้งบริษัท',
    GLOBAL: 'ทั่วโลก',
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">กลุ่มสิทธิ์ข้อมูล</h1>
          <p className="text-sm text-gray-500 mt-0.5">BRD #184 — กำหนด Data Scope ตาม Module / BG / Company / Division / Department / EmpGroup / PG</p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 whitespace-nowrap"
        >
          <span>+</span>
          <span>เพิ่มกลุ่มสิทธิ์ข้อมูล</span>
        </button>
      </div>

      {/* Preset info */}
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESET_CHIPS.map((chip) => (
          <div key={chip.key} className="p-3 bg-white rounded-lg border border-gray-200 text-center">
            <p className="text-xs font-medium text-gray-700 whitespace-nowrap">{chip.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{chip.description}</p>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table role="table" className="w-full text-sm" aria-label="รายการกลุ่มสิทธิ์ข้อมูล">
            <thead className="bg-gray-50">
              <tr role="row">
                <th className="px-4 py-3 text-left font-medium text-gray-700">ชื่อกลุ่มสิทธิ์</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 hidden sm:table-cell">ขอบเขต</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 hidden md:table-cell">คำอธิบาย</th>
                <th className="px-4 py-3 text-center font-medium text-gray-700 w-24">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataPermissions.length === 0 && (
                <tr role="row">
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    ยังไม่มีกลุ่มสิทธิ์ข้อมูล
                  </td>
                </tr>
              )}
              {dataPermissions.map((dp) => (
                <tr key={dp.id} role="row" className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {dp.label}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {scopeLabel[dp.scope] ?? dp.scope}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-xs truncate">
                    {dp.description}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setModal({ type: 'edit', dp })}
                      className="text-xs text-blue-600 hover:underline px-2 py-1"
                      aria-label={`แก้ไข ${dp.label}`}
                    >
                      แก้ไข
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <DataPermissionModal
          mode={modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

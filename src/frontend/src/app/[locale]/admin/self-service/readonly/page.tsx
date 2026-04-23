'use client'

// readonly/page.tsx — Field Read-Only Editor (BRD #181)
// same matrix pattern as visibility/mandatory — Field × 4 Roles + preview
// AC-3 (pattern), AC-6, AC-7, AC-8, AC-9, AC-11
import { useState } from 'react'
import { EditorShell } from '@/components/admin/admin-ss/EditorShell'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import type { FormScope, RoleName } from '@/lib/admin/types/adminSelfService'

const ROLES: RoleName[]         = ['Employee', 'Manager', 'HRBP', 'SPD']
const FORM_SCOPES: FormScope[]  = ['Person', 'Employment', 'Job']

function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked:   boolean
  onChange:  (v: boolean) => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange(!checked) }
      }}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1',
        checked ? 'bg-purple-600' : 'bg-gray-200',
      ].join(' ')}
    >
      <span className={['pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200', checked ? 'translate-x-4' : 'translate-x-0'].join(' ')} />
    </button>
  )
}

export default function ReadOnlyPage() {
  const fieldConfig  = useAdminSelfService((s) => s.draft.fieldConfig)
  const readonlyMat  = useAdminSelfService((s) => s.draft.readonly)
  const setReadOnly  = useAdminSelfService((s) => s.setReadOnly)

  const [formFilter,  setFormFilter]  = useState<FormScope>('Person')
  const [previewRole, setPreviewRole] = useState<RoleName>('Employee')

  const filteredFields = fieldConfig.filter((f) => f.scope === formFilter)

  function getValue(fieldId: string, role: RoleName): boolean {
    return readonlyMat[fieldId]?.[role] ?? false
  }

  return (
    <EditorShell editor="readonly" titleTh="กำหนด Field Read-Only" brd="#181">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Matrix panel */}
        <div className="flex-1 min-w-0">
          {/* Form filter */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Form:</label>
            <div className="flex gap-2">
              {FORM_SCOPES.map((scope) => (
                <button key={scope} type="button" onClick={() => setFormFilter(scope)}
                  className={['px-3 py-1.5 text-sm rounded-md border transition-colors', formFilter === scope ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'].join(' ')}>
                  {scope}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix table (sm+) */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Field</th>
                  {ROLES.map((role) => (
                    <th key={role} className="px-4 py-3 text-center font-medium text-gray-600 whitespace-nowrap">{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredFields.map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 whitespace-nowrap">{field.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{field.id}</div>
                    </td>
                    {ROLES.map((role) => (
                      <td key={role} className="px-4 py-3 text-center">
                        <Toggle
                          checked={getValue(field.id, role)}
                          onChange={(v) => setReadOnly(field.id, role, v)}
                          ariaLabel={`readonly-${field.id}-${role}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stacked cards mobile (AC-10) */}
          <div className="sm:hidden space-y-3">
            {filteredFields.map((field) => (
              <div key={field.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="font-medium text-gray-800 mb-3">{field.label}</div>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((role) => (
                    <div key={role} className="flex items-center justify-between gap-2 rounded-md bg-gray-50 px-3 py-2">
                      <span className="text-sm text-gray-600">{role}</span>
                      <Toggle checked={getValue(field.id, role)} onChange={(v) => setReadOnly(field.id, role, v)} ariaLabel={`readonly-${field.id}-${role}`} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview panel (AC-9) */}
        <div className="lg:w-72 shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Preview as</h3>
            <select
              value={previewRole}
              onChange={(e) => setPreviewRole(e.target.value as RoleName)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm bg-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="space-y-2">
              {filteredFields.map((field) => {
                const isReadOnly = getValue(field.id, previewRole)
                return (
                  <div key={field.id} className={['rounded-md border px-3 py-2', isReadOnly ? 'bg-gray-100 border-gray-200' : 'bg-gray-50 border-gray-100'].join(' ')}>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      {field.label}
                      {isReadOnly && <span className="text-xs bg-gray-300 text-gray-600 px-1 rounded">Read-Only</span>}
                    </div>
                    <div className="text-sm text-gray-300 mt-0.5 italic">— ตัวอย่างข้อมูล —</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </EditorShell>
  )
}

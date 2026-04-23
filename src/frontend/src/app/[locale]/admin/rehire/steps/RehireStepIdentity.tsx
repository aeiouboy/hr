'use client'

// RehireStepIdentity.tsx — Rehire Wizard Step 1
// เลือกพนักงานเดิม (Terminated เท่านั้น) + auto-classify reason + manual override
// AC-2: filter Terminated only, AC-3: auto-classify LT1/GE1, AC-4: manual override, AC-5: okToRehire gate

import { useLifecycleWizard, type MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import { classifyRehireReason } from '@/lib/admin/utils/classifyRehireReason'
import { EmployeePicker } from '@/components/admin/lifecycle/EmployeePicker'
import { ReasonPicker } from '@/components/admin/lifecycle/ReasonPicker'

export default function RehireStepIdentity() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน rehire flow
  if (!active || active.flow !== 'rehire') return null

  const { selectedEmployee, eventReason } = active.formData.step1

  // ผู้ใช้เลือกพนักงาน → auto-classify reason จาก lastTermDate
  function handleSelectEmployee(emp: MockEmployee) {
    let classified: 'RE_REHIRE_LT1' | 'RE_REHIRE_GE1' | null = null

    if (emp.lastTermDate) {
      try {
        classified = classifyRehireReason(emp.lastTermDate, new Date())
      } catch (err) {
        // lastTermDate ไม่ถูกต้อง — ไม่ auto-classify, ให้ HR เลือกเอง
        console.warn('[RehireStepIdentity] classifyRehireReason error:', err)
      }
    }

    setStepData('rehire', 1, { selectedEmployee: emp, eventReason: classified })
  }

  // HR override reason manually
  function handleReasonChange(code: string) {
    setStepData('rehire', 1, { eventReason: code as 'RE_REHIRE_LT1' | 'RE_REHIRE_GE1' })
  }

  // ตรวจสอบ okToRehire gate (AC-5)
  const isBlocked = selectedEmployee !== null && selectedEmployee.okToRehire === false

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">เลือกพนักงานเดิม</h2>
        <p className="text-sm text-gray-500 mt-1">
          ค้นหาพนักงานที่ออกไปแล้วเพื่อดำเนินการจ้างใหม่ (Rehire)
        </p>
      </div>

      {/* EmployeePicker — Terminated employees only */}
      <EmployeePicker
        id="rehire-employee-picker"
        onSelect={handleSelectEmployee}
        filter="Terminated"
        required
        value={selectedEmployee}
      />

      {/* OK-to-Rehire gate — AC-5 */}
      {isBlocked && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-md border border-red-300 bg-red-50 px-4 py-3"
        >
          <span className="text-red-500 text-lg leading-none mt-0.5" aria-hidden="true">⚠️</span>
          <div>
            <p className="text-sm font-medium text-red-800">
              พนักงานนี้ไม่ได้รับอนุญาตให้จ้างใหม่ (OK-to-Rehire = No)
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              กรุณาติดต่อ HRBP เพื่อขออนุมัติก่อนดำเนินการต่อ
            </p>
          </div>
        </div>
      )}

      {/* แสดงข้อมูลพนักงานที่เลือก */}
      {selectedEmployee && !isBlocked && (
        <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm">
          <p className="font-medium text-blue-900">
            {selectedEmployee.firstName.th} {selectedEmployee.lastName.th} ({selectedEmployee.externalCode})
          </p>
          <p className="text-blue-700 mt-0.5">
            ตำแหน่ง: {selectedEmployee.position} · บริษัท: {selectedEmployee.company}
          </p>
          {selectedEmployee.lastTermDate && (
            <p className="text-blue-600 mt-0.5">
              วันที่ออก: {selectedEmployee.lastTermDate}
            </p>
          )}
        </div>
      )}

      {/* ReasonPicker — auto-classified หรือ HR override (AC-4) */}
      {selectedEmployee && !isBlocked && (
        <div>
          <ReasonPicker
            id="rehire-reason-picker"
            event="5584"
            value={eventReason}
            onChange={handleReasonChange}
            required
          />
          {eventReason && (
            <p className="mt-1 text-xs text-gray-500">
              {eventReason === 'RE_REHIRE_LT1'
                ? '* ถูกกำหนดอัตโนมัติ — ออกจากงานไม่เกิน 1 ปี'
                : '* ถูกกำหนดอัตโนมัติ — ออกจากงานเกิน 1 ปี'}
              {' '}(สามารถเปลี่ยนแปลงได้)
            </p>
          )}
        </div>
      )}
    </div>
  )
}

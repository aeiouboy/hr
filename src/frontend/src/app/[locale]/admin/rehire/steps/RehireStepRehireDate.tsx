'use client'

// RehireStepRehireDate.tsx — Rehire Wizard Step 2
// วันที่เริ่มงานใหม่ (Rehire Date) — required
// schema: rehireStep2Schema from lifecycleSchema.ts
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { EffectiveDatePicker } from '@/components/admin/lifecycle/EffectiveDatePicker'

export default function RehireStepRehireDate() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน rehire flow
  if (!active || active.flow !== 'rehire') return null

  const { rehireDate } = active.formData.step2

  function handleDateChange(date: string) {
    setStepData('rehire', 2, { rehireDate: date })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">วันที่เริ่มงานใหม่ (Rehire Date)</h2>
        <p className="text-sm text-gray-500 mt-1">
          ระบุวันที่พนักงานจะกลับมาเริ่มงานใหม่
        </p>
      </div>

      <EffectiveDatePicker
        id="rehire-date"
        label="วันที่เริ่มงานใหม่"
        value={rehireDate}
        onChange={handleDateChange}
        required
      />

      {/* ข้อมูลช่วยเหลือ */}
      <div className="rounded-md bg-blue-50 border border-blue-200 px-4 py-3 text-xs text-blue-800">
        <strong>หมายเหตุ:</strong> วันที่เริ่มงานใหม่นี้จะเป็นวันที่ Event Rehire มีผลบังคับใช้ใน SuccessFactors
      </div>
    </div>
  )
}

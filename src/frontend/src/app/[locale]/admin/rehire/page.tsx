'use client'

// rehire/page.tsx — Rehire Wizard entry point
// 7 ขั้นตอน: เลือกพนักงานเดิม → วันที่เริ่มงานใหม่ → ประวัติ → ข้อมูลพนักงาน → ที่อยู่ → ข้อมูลงาน → ค่าตอบแทน
// Wave 3: Steps 2-5 = component impl; Steps 6-7 = inline impl (budget cap)
import { useEffect, useState, useCallback } from 'react'
import { Stepper } from '@/components/admin/wizard/Stepper'
import { WizardFooter } from '@/components/admin/wizard/WizardFooter'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { loadBusinessUnits } from '@/lib/admin/store/loadBusinessUnits'
import type { BusinessUnit } from '@/lib/admin/store/loadBusinessUnits'
import { rehireStep6Schema, rehireStep7Schema } from '@/lib/admin/validation/lifecycleSchema'
import RehireStepIdentity from './steps/RehireStepIdentity'
import RehireStepRehireDate from './steps/RehireStepRehireDate'
import RehireStepBiographical from './steps/RehireStepBiographical'
import RehireStepEmploymentInfo from './steps/RehireStepEmploymentInfo'
import RehireStepPersonal from './steps/RehireStepPersonal'

// 7 ขั้นตอน Rehire Wizard (BRD #102 — skip Name/NationalID เพราะมีข้อมูล PerPerson อยู่แล้ว)
const REHIRE_STEPS = [
  { number: 1, labelTh: 'เลือกพนักงานเดิม',   labelEn: 'Employee Lookup' },
  { number: 2, labelTh: 'วันที่เริ่มงานใหม่',   labelEn: 'Rehire Date' },
  { number: 3, labelTh: 'ข้อมูลประวัติ',         labelEn: 'Biographical' },
  { number: 4, labelTh: 'ข้อมูลพนักงาน',         labelEn: 'Employee Info' },
  { number: 5, labelTh: 'ที่อยู่',               labelEn: 'Personal' },
  { number: 6, labelTh: 'ข้อมูลงาน',             labelEn: 'Job' },
  { number: 7, labelTh: 'ค่าตอบแทน',             labelEn: 'Compensation' },
] as const

// Step 6 inline — ข้อมูลงาน (Job): position + businessUnit
function RehireStepJobInline() {
  const { active, setStepData } = useLifecycleWizard()
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([])
  const [position, setPosition]     = useState('')
  const [buVal, setBuVal]           = useState<string>('')
  const [touched, setTouched]       = useState({ position: false, bu: false })
  const [errors, setErrors]         = useState<{ position?: string; bu?: string }>({})

  useEffect(() => {
    try { setBusinessUnits(loadBusinessUnits()) }
    catch (err) { console.warn('[RehireStepJob] loadBusinessUnits ล้มเหลว:', err) }
  }, [])

  // sync จาก store เมื่อ active เปลี่ยน (จาก step อื่น)
  useEffect(() => {
    if (active?.flow === 'rehire') {
      setPosition(active.formData.step6.position)
      setBuVal(active.formData.step6.businessUnit ?? '')
    }
  }, [active?.flow]) // eslint-disable-line react-hooks/exhaustive-deps

  const touch = (f: 'position' | 'bu') => setTouched((p) => ({ ...p, [f]: true }))

  const validate = useCallback(
    (pos: string, bu: string) => {
      const result = rehireStep6Schema.safeParse({
        position: pos || undefined,
        businessUnit: bu || undefined,
      })
      const fe: Record<string, string> = {}
      if (!result.success) {
        for (const iss of result.error.issues) {
          const k = String(iss.path[0])
          if (!fe[k]) fe[k] = iss.message
        }
      }
      setErrors(fe)
      setStepData('rehire', 6, { position: pos, businessUnit: bu || null })
    },
    [setStepData]
  )

  useEffect(() => { validate(position, buVal) }, [position, buVal, validate])

  // guard ใน render (ไม่ใช้ early return ก่อน hooks)
  if (!active || active.flow !== 'rehire') return null

  const cls = (err?: string) =>
    ['w-full max-w-sm rounded-md border px-3 py-2 text-sm',
     'focus:outline-none focus:ring-2 focus:ring-blue-500',
     err ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ข้อมูลงาน (Job)</h2>
        <p className="text-sm text-gray-500 mt-1">กำหนดตำแหน่งและหน่วยธุรกิจสำหรับการจ้างงานใหม่</p>
      </div>

      <fieldset>
        <label htmlFor="rehire-position" className="block text-sm font-medium text-gray-700 mb-1">
          ตำแหน่งงาน (Position)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input id="rehire-position" type="text" required aria-required="true"
          aria-invalid={touched.position && !!errors.position}
          placeholder="ระบุตำแหน่งงาน" value={position}
          onChange={(e) => setPosition(e.target.value)}
          onBlur={() => touch('position')}
          className={cls(touched.position ? errors.position : undefined)} />
        {touched.position && errors.position && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.position}</p>)}
      </fieldset>

      <fieldset>
        <label htmlFor="rehire-bu" className="block text-sm font-medium text-gray-700 mb-1">
          หน่วยธุรกิจ (Business Unit)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <select id="rehire-bu" required aria-required="true"
          aria-invalid={touched.bu && !!errors.bu}
          value={buVal}
          onChange={(e) => setBuVal(e.target.value)}
          onBlur={() => touch('bu')}
          className={[cls(touched.bu ? errors.bu : undefined), 'bg-white text-gray-900'].join(' ')}>
          <option value="">— เลือกหน่วยธุรกิจ —</option>
          {businessUnits.map((bu) => (
            <option key={bu.code} value={bu.code}>{bu.code} — {bu.labelTh || bu.labelEn}</option>
          ))}
        </select>
        {touched.bu && errors.bu && (
          <p role="alert" className="mt-1 text-xs text-red-600">{errors.bu}</p>)}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}

// Step 7 inline — ค่าตอบแทน (Compensation) + Submit
function RehireStepCompensationInline({ onSubmit }: { onSubmit: () => void }) {
  const { active, setStepData } = useLifecycleWizard()
  const [salaryInput, setSalaryInput] = useState<string>('')
  const [touched, setTouched]         = useState(false)
  const [error, setError]             = useState<string | undefined>()

  // sync จาก store เมื่อ active เปลี่ยน
  useEffect(() => {
    if (active?.flow === 'rehire' && active.formData.step7.baseSalary != null) {
      setSalaryInput(String(active.formData.step7.baseSalary))
    }
  }, [active?.flow]) // eslint-disable-line react-hooks/exhaustive-deps

  const validate = useCallback(
    (raw: string) => {
      const num = raw === '' ? NaN : Number(raw)
      const result = rehireStep7Schema.safeParse({ baseSalary: isNaN(num) ? undefined : num })
      if (result.success) {
        setError(undefined)
        setStepData('rehire', 7, { baseSalary: num })
        return true
      } else {
        setError(result.error.issues[0]?.message)
        return false
      }
    },
    [setStepData]
  )

  useEffect(() => { validate(salaryInput) }, [salaryInput, validate])

  // guard ใน render (ไม่ใช้ early return ก่อน hooks)
  if (!active || active.flow !== 'rehire') return null

  function handleSubmit() {
    setTouched(true)
    if (validate(salaryInput)) onSubmit()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">ค่าตอบแทน (Compensation)</h2>
        <p className="text-sm text-gray-500 mt-1">กำหนดเงินเดือนพื้นฐานสำหรับการจ้างงานใหม่ครั้งนี้</p>
      </div>

      <fieldset>
        <label htmlFor="rehire-salary" className="block text-sm font-medium text-gray-700 mb-1">
          เงินเดือนพื้นฐาน (Base Salary — บาท)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 select-none">฿</span>
          <input id="rehire-salary" type="number" min={1} step={1} required aria-required="true"
            aria-invalid={touched && !!error}
            aria-describedby={touched && error ? 'rehire-salary-error' : undefined}
            placeholder="ระบุจำนวนเงิน"
            value={salaryInput}
            onChange={(e) => setSalaryInput(e.target.value)}
            onBlur={() => setTouched(true)}
            className={['w-full rounded-md border pl-7 pr-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              touched && error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')} />
        </div>
        {touched && error && (
          <p id="rehire-salary-error" role="alert" className="mt-1 text-xs text-red-600">{error}</p>)}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>

      <div className="pt-2">
        <button type="button" onClick={handleSubmit}
          className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white
            hover:bg-blue-700 active:bg-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          ยืนยันการจ้างงานใหม่ (Submit)
        </button>
      </div>
    </div>
  )
}

export default function RehirePage() {
  const { active, setFlow, currentStep, maxUnlockedStep, goNext, goBack, jumpTo, isStepValid, reset } =
    useLifecycleWizard()

  // ตั้ง flow เป็น rehire เมื่อเข้าหน้านี้
  useEffect(() => {
    if (!active || active.flow !== 'rehire') {
      setFlow('rehire')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // guard รอ flow set
  if (!active || active.flow !== 'rehire') return null

  const totalSteps = active.maxStep

  // Submit handler (mock) — AC-13
  function handleSubmit() {
    const payload = {
      flow: 'rehire',
      ...active?.formData,
      sourceEmployee: active?.formData.step1.selectedEmployee?.externalCode,
    }
    console.log('[Rehire] Mock submit payload:', payload)
    // แสดง toast (browser alert เป็น fallback สำหรับ mock)
    alert('บันทึกสำเร็จ — Rehire ถูกดำเนินการ (mock)')
    reset()
  }

  // render step content
  function renderStep() {
    switch (currentStep) {
      case 1: return <RehireStepIdentity />
      case 2: return <RehireStepRehireDate />
      case 3: return <RehireStepBiographical />
      case 4: return <RehireStepEmploymentInfo />
      case 5: return <RehireStepPersonal />
      case 6: return <RehireStepJobInline />
      case 7: return <RehireStepCompensationInline onSubmit={handleSubmit} />
      default: return null
    }
  }

  // validate ทุก step ผ่าน store (checkRehireStepValid ครอบคลุมทุก step แล้ว)
  const isValid = isStepValid(currentStep)

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">จ้างพนักงานใหม่อีกครั้ง (Rehire)</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          ขั้นตอน {currentStep} จาก {totalSteps}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Stepper sidebar — desktop */}
        <div className="hidden md:flex flex-col w-56 bg-white border-r border-gray-200 overflow-y-auto py-4 px-2">
          <Stepper
            steps={[...REHIRE_STEPS]}
            currentStep={currentStep}
            maxUnlockedStep={maxUnlockedStep}
            onStepClick={jumpTo}
          />
        </div>

        {/* Mobile progress bar */}
        <div className="md:hidden w-full border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>ขั้นตอน {currentStep}/{totalSteps}</span>
            <span>{REHIRE_STEPS[currentStep - 1].labelTh}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
            />
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">{renderStep()}</div>
        </div>
      </div>

      {/* Footer navigation */}
      <WizardFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        isCurrentStepValid={isValid}
        onBack={goBack}
        onNext={goNext}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

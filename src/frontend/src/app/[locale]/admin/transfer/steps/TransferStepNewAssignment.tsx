'use client'

// TransferStepNewAssignment.tsx — Transfer Wizard Step 4
// สังกัดใหม่: company (conditional TRN_TRNACCOMP only) + BU + position
// schema: transferStep4AcrossSchema / transferStep4WithinSchema from lifecycleSchema.ts
// BRD #110 — conditional "New Company" ถ้า flow=TRN_TRNACCOMP
import { useState, useEffect, useCallback } from 'react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import { loadBusinessUnits } from '@/lib/admin/store/loadBusinessUnits'
import { loadCompanies } from '@/lib/admin/store/loadCompanies'
import type { BusinessUnit } from '@/lib/admin/store/loadBusinessUnits'
import type { Company } from '@/lib/admin/store/loadCompanies'

export default function TransferStepNewAssignment() {
  const { active, setStepData } = useLifecycleWizard()

  // guard: ต้องอยู่ใน transfer flow
  if (!active || active.flow !== 'transfer') return null

  const { transferReason }                        = active.formData.step2
  const { newCompany, businessUnit, position }    = active.formData.step4
  const isAcrossCompany                           = transferReason === 'TRN_TRNACCOMP'

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [companies, setCompanies]         = useState<Company[]>([])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    try { setBusinessUnits(loadBusinessUnits()) }
    catch (err) { console.warn('[TransferStepNewAssignment] loadBusinessUnits ล้มเหลว:', err) }
    try { setCompanies(loadCompanies()) }
    catch (err) { console.warn('[TransferStepNewAssignment] loadCompanies ล้มเหลว:', err) }
  }, [])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [companyVal, setCompanyVal]   = useState<string>(newCompany ?? '')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [buVal, setBuVal]             = useState<string>(businessUnit ?? '')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [positionVal, setPositionVal] = useState<string>(position)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [touched, setTouched]         = useState({ company: false, bu: false, position: false })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errors, setErrors]           = useState<{ company?: string; bu?: string; position?: string }>({})

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validate = useCallback(
    (co: string, bu: string, pos: string) => {
      const fe: typeof errors = {}
      if (isAcrossCompany && !co) fe.company = 'กรุณาเลือกบริษัทปลายทาง (Transfer across Company)'
      if (!bu) fe.bu = 'กรุณาเลือกหน่วยธุรกิจใหม่'
      if (!pos.trim()) fe.position = 'กรุณาระบุตำแหน่งใหม่'
      setErrors(fe)
      setStepData('transfer', 4, {
        newCompany:   co || null,
        businessUnit: bu || null,
        position:     pos,
      })
    },
    [isAcrossCompany, setStepData]
  )

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => { validate(companyVal, buVal, positionVal) }, [companyVal, buVal, positionVal, validate])

  const selectCls = (err?: string) =>
    ['w-full max-w-sm rounded-md border px-3 py-2 text-sm bg-white text-gray-900',
     'focus:outline-none focus:ring-2 focus:ring-blue-500',
     err ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')

  const inputCls = (err?: string) =>
    ['w-full max-w-sm rounded-md border px-3 py-2 text-sm',
     'focus:outline-none focus:ring-2 focus:ring-blue-500',
     err ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'].join(' ')

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">สังกัดใหม่ (New Assignment)</h2>
        <p className="text-sm text-gray-500 mt-1">
          กำหนดสังกัดใหม่สำหรับพนักงานหลังโอนย้าย (BRD #110)
        </p>
      </div>

      {/* บริษัทปลายทาง — conditional: แสดงเฉพาะ TRN_TRNACCOMP */}
      {isAcrossCompany && (
        <fieldset>
          <label htmlFor="transfer-new-company" className="block text-sm font-medium text-gray-700 mb-1">
            บริษัทปลายทาง (New Company)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
          </label>
          <select
            id="transfer-new-company"
            required
            aria-required="true"
            aria-invalid={touched.company && !!errors.company}
            aria-describedby={touched.company && errors.company ? 'trf-company-error' : undefined}
            value={companyVal}
            onChange={(e) => setCompanyVal(e.target.value)}
            onBlur={() => touch('company')}
            className={selectCls(touched.company ? errors.company : undefined)}
          >
            <option value="">— เลือกบริษัทปลายทาง —</option>
            {companies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.labelTh || c.labelEn}
              </option>
            ))}
          </select>
          {touched.company && errors.company && (
            <p id="trf-company-error" role="alert" className="mt-1 text-xs text-red-600">{errors.company}</p>
          )}
          {/* Banner แจ้งประเภท Transfer across Company */}
          <div className="mt-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
            Transfer across Company (TRN_TRNACCOMP) — ต้องระบุบริษัทปลายทาง
          </div>
        </fieldset>
      )}

      {/* หน่วยธุรกิจใหม่ */}
      <fieldset>
        <label htmlFor="transfer-new-bu" className="block text-sm font-medium text-gray-700 mb-1">
          หน่วยธุรกิจใหม่ (Business Unit)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <select
          id="transfer-new-bu"
          required
          aria-required="true"
          aria-invalid={touched.bu && !!errors.bu}
          aria-describedby={touched.bu && errors.bu ? 'trf-bu-error' : undefined}
          value={buVal}
          onChange={(e) => setBuVal(e.target.value)}
          onBlur={() => touch('bu')}
          className={selectCls(touched.bu ? errors.bu : undefined)}
        >
          <option value="">— เลือกหน่วยธุรกิจ —</option>
          {businessUnits.map((bu) => (
            <option key={bu.code} value={bu.code}>
              {bu.code} — {bu.labelTh || bu.labelEn}
            </option>
          ))}
        </select>
        {touched.bu && errors.bu && (
          <p id="trf-bu-error" role="alert" className="mt-1 text-xs text-red-600">{errors.bu}</p>
        )}
      </fieldset>

      {/* ตำแหน่งใหม่ */}
      <fieldset>
        <label htmlFor="transfer-new-position" className="block text-sm font-medium text-gray-700 mb-1">
          ตำแหน่งใหม่ (Position)<span aria-hidden="true" className="ml-1 text-red-500">*</span>
        </label>
        <input
          id="transfer-new-position"
          type="text"
          required
          aria-required="true"
          aria-invalid={touched.position && !!errors.position}
          aria-describedby={touched.position && errors.position ? 'trf-pos-error' : undefined}
          placeholder="ระบุตำแหน่งงานใหม่"
          value={positionVal}
          onChange={(e) => setPositionVal(e.target.value)}
          onBlur={() => touch('position')}
          className={inputCls(touched.position ? errors.position : undefined)}
        />
        {touched.position && errors.position && (
          <p id="trf-pos-error" role="alert" className="mt-1 text-xs text-red-600">{errors.position}</p>
        )}
      </fieldset>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> ช่องที่บังคับกรอก</p>
    </div>
  )
}

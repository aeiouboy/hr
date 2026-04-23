'use client'

// StepIdentity.tsx — Cluster 1 "Who"
// BA rows 1-19 + Personal Info row 1 = 20 fields
// 13 mandatory (*), 7 optional per BA-EC-SUMMARY.md
// Cross-field: DOB < HireDate (BA row 8 col F verbatim)
// Picklist source: @hrms/shared/picklists (C7: single source of truth)

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import { nextEmployeeCode } from '@/lib/admin/utils/employeeCode'
import { stepIdentitySchema } from '@/lib/admin/validation/hireSchema'
import {
  PICKLIST_EVENT_REASON_HIRE,
  PICKLIST_SALUTATION_EN,
  PICKLIST_ID_CARD_TYPE,
  PICKLIST_COUNTRY_ISO,
  PICKLIST_YES_NO,
  PICKLIST_COMPANY,
} from '@hrms/shared/picklists'

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

/** คำนวณอายุจาก dateOfBirth ณ วันนี้ */
function calcAge(dob: string): number | null {
  if (!dob) return null
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age >= 0 ? age : null
}

export interface StepIdentityProps {
  onValidChange?: (isValid: boolean) => void
}

type FieldErrors = {
  hireDate?: string; companyCode?: string; eventReason?: string; salutationEn?: string
  firstNameEn?: string; lastNameEn?: string; dateOfBirth?: string; employeeId?: string
  nationalIdCardType?: string; country?: string; nationalId?: string; isPrimary?: string
  salutationLocal?: string
}

type TouchedState = {
  hireDate: boolean; companyCode: boolean; eventReason: boolean; salutationEn: boolean
  firstNameEn: boolean; lastNameEn: boolean; dateOfBirth: boolean; employeeId: boolean
  nationalIdCardType: boolean; country: boolean; nationalId: boolean; isPrimary: boolean
  salutationLocal: boolean
}

export default function StepIdentity({ onValidChange }: StepIdentityProps) {
  const { formData, setStepData } = useHireWizard()
  const id = formData.identity
  const allEmployees = useEmployees((s) => s.all)

  // employeeId is system-generated per BRD #102 line 2267 (Invariant I1)
  const generatedEmployeeId = useMemo(
    () => id.employeeId || nextEmployeeCode(allEmployees),
    [allEmployees, id.employeeId]
  )

  // ── Local field state ───────────────────────────────────────────────────────
  const [hireDate,          setHireDate]          = useState(id.hireDate ?? todayISO())
  const [companyCode,       setCompanyCode]       = useState(id.companyCode ?? '')
  const [eventReason,       setEventReason]       = useState(id.eventReason ?? '')
  const [salutationEn,      setSalutationEn]      = useState(id.salutationEn ?? '')
  const [firstNameEn,       setFirstNameEn]       = useState(id.firstNameEn)
  const [middleNameEn,      setMiddleNameEn]      = useState(id.middleNameEn)
  const [lastNameEn,        setLastNameEn]        = useState(id.lastNameEn)
  const [dateOfBirth,       setDateOfBirth]       = useState(id.dateOfBirth ?? '')
  const [countryOfBirth,    setCountryOfBirth]    = useState(id.countryOfBirth ?? '')
  const [regionOfBirth,     setRegionOfBirth]     = useState(id.regionOfBirth)
  const [employeeId,        setEmployeeId]        = useState(id.employeeId || generatedEmployeeId)
  const [nationalIdCardType,setNationalIdCardType]= useState(id.nationalIdCardType ?? '')
  const [country,           setCountry]           = useState(id.country ?? '')
  const [nationalId,        setNationalId]        = useState(id.nationalId)
  const [issueDate,         setIssueDate]         = useState(id.issueDate ?? '')
  const [expiryDate,        setExpiryDate]        = useState(id.expiryDate ?? '')
  const [isPrimary,         setIsPrimary]         = useState(id.isPrimary ?? '')
  const [vnIssuePlace,      setVnIssuePlace]      = useState(id.vnIssuePlace)
  const [salutationLocal,   setSalutationLocal]   = useState(id.salutationLocal ?? '')

  // age คำนวณอัตโนมัติจาก dateOfBirth
  const age = useMemo(() => calcAge(dateOfBirth), [dateOfBirth])

  // ── Touched / errors ────────────────────────────────────────────────────────
  const [touched, setTouched] = useState<TouchedState>({
    hireDate: false, companyCode: false, eventReason: false, salutationEn: false,
    firstNameEn: false, lastNameEn: false, dateOfBirth: false, employeeId: false,
    nationalIdCardType: false, country: false, nationalId: false, isPrimary: false,
    salutationLocal: false,
  })
  const [errors, setErrors] = useState<FieldErrors>({})

  const touch = (field: keyof TouchedState) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // ── Validate + sync store ────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const result = stepIdentitySchema.safeParse({
      hireDate:           hireDate     || undefined,
      companyCode:        companyCode  || undefined,
      eventReason:        eventReason  || undefined,
      salutationEn:       salutationEn || undefined,
      firstNameEn:        firstNameEn  || undefined,
      middleNameEn,
      lastNameEn:         lastNameEn   || undefined,
      dateOfBirth:        dateOfBirth  || undefined,
      countryOfBirth:     countryOfBirth || null,
      regionOfBirth,
      age,
      employeeId:         employeeId   || undefined,
      nationalIdCardType: nationalIdCardType || undefined,
      country:            country      || undefined,
      nationalId:         nationalId   || undefined,
      issueDate:          issueDate    || null,
      expiryDate:         expiryDate   || null,
      isPrimary:          isPrimary    || undefined,
      vnIssuePlace,
      salutationLocal:    salutationLocal || undefined,
    })

    if (result.success) {
      setErrors({})
      setStepData('identity', {
        hireDate, companyCode, eventReason, salutationEn: salutationEn || null,
        firstNameEn, middleNameEn, lastNameEn, dateOfBirth: dateOfBirth || null,
        countryOfBirth: countryOfBirth || null, regionOfBirth, age,
        employeeId, nationalIdCardType: nationalIdCardType || null,
        country: country || null, nationalId,
        issueDate: issueDate || null, expiryDate: expiryDate || null,
        isPrimary: isPrimary || null, vnIssuePlace,
        salutationLocal: salutationLocal || null,
      })
      onValidChange?.(true)
    } else {
      const fe: FieldErrors = {}
      for (const issue of result.error.issues) {
        const f = issue.path[0] as keyof FieldErrors
        if (!fe[f]) fe[f] = issue.message
      }
      setErrors(fe)
      onValidChange?.(false)
    }
  }, [
    hireDate, companyCode, eventReason, salutationEn, firstNameEn, middleNameEn,
    lastNameEn, dateOfBirth, countryOfBirth, regionOfBirth, age, employeeId,
    nationalIdCardType, country, nationalId, issueDate, expiryDate,
    isPrimary, vnIssuePlace, salutationLocal, setStepData, onValidChange,
  ])

  useEffect(() => { validate() }, [validate])

  // sync hireDate default ครั้งแรก
  useEffect(() => {
    if (!id.hireDate && hireDate) setStepData('identity', { hireDate })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // helper render
  const errMsg = (field: keyof FieldErrors, touchField?: keyof TouchedState) => {
    const t = touchField ?? (field as keyof TouchedState)
    if (!touched[t] || !errors[field]) return null
    return <p role="alert" className="mt-1 text-xs text-warning">{errors[field]}</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">
        Cluster 1 — Who
      </h2>

      {/* ─── BA row 1 — Hire Date * ─── */}
      <fieldset>
        <label htmlFor="hire-date" className="humi-label">
          วันที่เริ่มงาน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="hire-date" type="date" required aria-required="true"
          aria-invalid={touched.hireDate && !!errors.hireDate}
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          onBlur={() => touch('hireDate')}
          className="humi-input w-full max-w-xs" />
        {errMsg('hireDate')}
      </fieldset>

      {/* ─── BA row 2 — Company * ─── */}
      <fieldset>
        <label htmlFor="company-code" className="humi-label">
          บริษัท<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="company-code" required aria-required="true"
          aria-invalid={touched.companyCode && !!errors.companyCode}
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          onBlur={() => touch('companyCode')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกบริษัท —</option>
          {PICKLIST_COMPANY.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.id} — {c.labelTh}</option>
          ))}
        </select>
        {errMsg('companyCode')}
      </fieldset>

      {/* ─── BA row 3 — Event Reason * ─── */}
      <fieldset>
        <label htmlFor="event-reason" className="humi-label">
          สาเหตุการจ้างงาน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="event-reason" required aria-required="true"
          aria-invalid={touched.eventReason && !!errors.eventReason}
          value={eventReason}
          onChange={(e) => setEventReason(e.target.value)}
          onBlur={() => touch('eventReason')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกสาเหตุ —</option>
          {PICKLIST_EVENT_REASON_HIRE.filter((r) => r.active).map((r) => (
            <option key={r.id} value={r.id}>{r.id} — {r.labelTh}</option>
          ))}
        </select>
        {errMsg('eventReason')}
      </fieldset>

      {/* ─── BA row 4 — Salutation (EN) * ─── */}
      <fieldset>
        <label htmlFor="salutation-en" className="humi-label">
          คำนำหน้า (EN)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="salutation-en" required aria-required="true"
          aria-invalid={touched.salutationEn && !!errors.salutationEn}
          value={salutationEn}
          onChange={(e) => setSalutationEn(e.target.value)}
          onBlur={() => touch('salutationEn')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกคำนำหน้า —</option>
          {PICKLIST_SALUTATION_EN.filter((s) => s.active).map((s) => (
            <option key={s.id} value={s.id}>{s.labelEn}</option>
          ))}
        </select>
        {errMsg('salutationEn')}
      </fieldset>

      {/* ─── BA row 5 — Firstname (EN) * ─── */}
      <fieldset>
        <label htmlFor="first-name-en" className="humi-label">
          ชื่อ (EN)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="first-name-en" type="text" required aria-required="true"
          aria-invalid={touched.firstNameEn && !!errors.firstNameEn}
          placeholder="First name (EN)"
          value={firstNameEn}
          onChange={(e) => setFirstNameEn(e.target.value)}
          onBlur={() => touch('firstNameEn')}
          className="humi-input w-full max-w-sm" />
        {errMsg('firstNameEn')}
      </fieldset>

      {/* ─── BA row 6 — Middle Name (EN) — optional ─── */}
      <fieldset>
        <label htmlFor="middle-name-en" className="humi-label">
          ชื่อกลาง (EN)
        </label>
        <input id="middle-name-en" type="text" placeholder="Middle name (optional)"
          value={middleNameEn}
          onChange={(e) => setMiddleNameEn(e.target.value)}
          className="humi-input w-full max-w-sm" />
      </fieldset>

      {/* ─── BA row 7 — Lastname (EN) * ─── */}
      <fieldset>
        <label htmlFor="last-name-en" className="humi-label">
          นามสกุล (EN)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="last-name-en" type="text" required aria-required="true"
          aria-invalid={touched.lastNameEn && !!errors.lastNameEn}
          placeholder="Last name (EN)"
          value={lastNameEn}
          onChange={(e) => setLastNameEn(e.target.value)}
          onBlur={() => touch('lastNameEn')}
          className="humi-input w-full max-w-sm" />
        {errMsg('lastNameEn')}
      </fieldset>

      {/* ─── BA row 8 — Date of Birth * ─── */}
      <fieldset>
        <label htmlFor="date-of-birth" className="humi-label">
          วันเกิด<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="date-of-birth" type="date" required aria-required="true"
          aria-invalid={touched.dateOfBirth && !!errors.dateOfBirth}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          onBlur={() => touch('dateOfBirth')}
          className="humi-input w-full max-w-xs" />
        {errMsg('dateOfBirth')}
        {/* อายุคำนวณอัตโนมัติ */}
        {age !== null && (
          <p className="mt-1 text-xs text-ink-soft">อายุ: {age} ปี</p>
        )}
      </fieldset>

      {/* ─── BA row 9 — Country of Birth — optional ─── */}
      <fieldset>
        <label htmlFor="country-of-birth" className="humi-label">
          ประเทศที่เกิด
        </label>
        <select id="country-of-birth"
          value={countryOfBirth}
          onChange={(e) => setCountryOfBirth(e.target.value)}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกประเทศ (optional) —</option>
          {PICKLIST_COUNTRY_ISO.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.labelTh}</option>
          ))}
        </select>
      </fieldset>

      {/* ─── BA row 10 — Region of Birth — optional ─── */}
      <fieldset>
        <label htmlFor="region-of-birth" className="humi-label">
          จังหวัด/ภูมิภาคที่เกิด
        </label>
        <input id="region-of-birth" type="text" placeholder="จังหวัด/ภูมิภาค (optional)"
          value={regionOfBirth}
          onChange={(e) => setRegionOfBirth(e.target.value)}
          className="humi-input w-full max-w-sm" />
      </fieldset>

      {/* ─── BA row 12 — Employee ID (Invariant I1: system-generated per BRD #102 line 2267) ─── */}
      <fieldset>
        <label htmlFor="employee-id" className="humi-label">
          รหัสพนักงาน
        </label>
        <div
          id="employee-id"
          aria-readonly="true"
          className="humi-input w-full max-w-xs bg-neutral-50 text-neutral-700 font-mono select-all"
        >
          {employeeId}
        </div>
        <p className="text-xs text-neutral-500 mt-1">ระบบสร้างอัตโนมัติต่อเนื่องจาก Employee Code Range</p>
      </fieldset>

      {/* ─── BA row 13 — National ID Card Type * ─── */}
      <fieldset>
        <label htmlFor="national-id-card-type" className="humi-label">
          ประเภทบัตรประชาชน<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="national-id-card-type" required aria-required="true"
          aria-invalid={touched.nationalIdCardType && !!errors.nationalIdCardType}
          value={nationalIdCardType}
          onChange={(e) => setNationalIdCardType(e.target.value)}
          onBlur={() => touch('nationalIdCardType')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกประเภทบัตร —</option>
          {PICKLIST_ID_CARD_TYPE.filter((t) => t.active).map((t) => (
            <option key={t.id} value={t.id}>{t.labelTh}</option>
          ))}
        </select>
        {errMsg('nationalIdCardType')}
      </fieldset>

      {/* ─── BA row 14 — Country * ─── */}
      <fieldset>
        <label htmlFor="country" className="humi-label">
          ประเทศ<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="country" required aria-required="true"
          aria-invalid={touched.country && !!errors.country}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={() => touch('country')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกประเทศ —</option>
          {PICKLIST_COUNTRY_ISO.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.labelTh}</option>
          ))}
        </select>
        {errMsg('country')}
      </fieldset>

      {/* ─── BA row 15 — National ID * ─── */}
      <fieldset>
        <label htmlFor="national-id" className="humi-label">
          เลขบัตร<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="national-id" type="text" required aria-required="true"
          aria-invalid={touched.nationalId && !!errors.nationalId}
          placeholder="เลขบัตรประชาชน / Passport / เลขอื่นๆ"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          onBlur={() => touch('nationalId')}
          className="humi-input w-full max-w-xs" />
        {errMsg('nationalId')}
      </fieldset>

      {/* ─── BA row 16 — Issue Date — optional ─── */}
      <fieldset>
        <label htmlFor="issue-date" className="humi-label">
          วันออกบัตร
        </label>
        <input id="issue-date" type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="humi-input w-full max-w-xs" />
      </fieldset>

      {/* ─── BA row 17 — Expiry Date — optional ─── */}
      <fieldset>
        <label htmlFor="expiry-date" className="humi-label">
          วันหมดอายุบัตร
        </label>
        <input id="expiry-date" type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="humi-input w-full max-w-xs" />
      </fieldset>

      {/* ─── BA row 18 — Is Primary * ─── */}
      <fieldset>
        <label htmlFor="is-primary" className="humi-label">
          บัตรหลัก<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="is-primary" required aria-required="true"
          aria-invalid={touched.isPrimary && !!errors.isPrimary}
          value={isPrimary}
          onChange={(e) => setIsPrimary(e.target.value)}
          onBlur={() => touch('isPrimary')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือก —</option>
          {PICKLIST_YES_NO.filter((y) => y.active).map((y) => (
            <option key={y.id} value={y.id}>{y.labelTh}</option>
          ))}
        </select>
        {errMsg('isPrimary')}
      </fieldset>

      {/* ─── BA row 19 — [VN] Issue Place — optional ─── */}
      <fieldset>
        <label htmlFor="vn-issue-place" className="humi-label">
          สถานที่ออกบัตร (Issue Place — VN)
          <span className="ml-1 text-xs text-ink-muted">(เฉพาะสัญชาติเวียดนาม)</span>
        </label>
        <input id="vn-issue-place" type="text" placeholder="สถานที่ออกบัตร (optional)"
          value={vnIssuePlace}
          onChange={(e) => setVnIssuePlace(e.target.value)}
          className="humi-input w-full max-w-sm" />
      </fieldset>

      {/* ─── BA Personal Info row 1 — Salutation (Local) * ─── */}
      <fieldset>
        <label htmlFor="salutation-local" className="humi-label">
          คำนำหน้า (Local)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="salutation-local" required aria-required="true"
          aria-invalid={touched.salutationLocal && !!errors.salutationLocal}
          value={salutationLocal}
          onChange={(e) => setSalutationLocal(e.target.value)}
          onBlur={() => touch('salutationLocal')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกคำนำหน้า —</option>
          {PICKLIST_SALUTATION_EN.filter((s) => s.active).map((s) => (
            <option key={s.id} value={s.id}>{s.labelTh} ({s.labelEn})</option>
          ))}
        </select>
        {errMsg('salutationLocal')}
      </fieldset>

      <p className="text-xs text-ink-soft">
        <span className="humi-asterisk">*</span> ช่องที่บังคับกรอก
      </p>
    </div>
  )
}

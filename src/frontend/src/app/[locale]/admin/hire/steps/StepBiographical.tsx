'use client'

// StepBiographical.tsx — Cluster 2 "Job" (Personal Information section)
// BA Personal Info rows 2-17 = 12 fields (all mandatory per BA-EC-SUMMARY.md)
// Picklist source: @hrms/shared/picklists (C7: single source of truth)

import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepBiographicalSchema } from '@/lib/admin/validation/hireSchema'
import {
  PICKLIST_MILITARY_STATUS,
  PICKLIST_GENDER,
  PICKLIST_NATIONALITY,
  PICKLIST_BLOOD_TYPE,
  PICKLIST_MARITAL_STATUS,
  PICKLIST_YES_NO,
} from '@hrms/shared/picklists'

export interface StepBiographicalProps {
  onValidChange?: (isValid: boolean) => void
}

type FieldErrors = {
  otherTitleTh?: string; firstNameLocal?: string; lastNameLocal?: string
  middleNameLocal?: string; nickname?: string; militaryStatus?: string
  gender?: string; nationality?: string; foreigner?: string
  bloodType?: string; maritalStatus?: string; maritalStatusSince?: string
}

type TouchedState = {
  otherTitleTh: boolean; firstNameLocal: boolean; lastNameLocal: boolean
  middleNameLocal: boolean; nickname: boolean; militaryStatus: boolean
  gender: boolean; nationality: boolean; foreigner: boolean
  bloodType: boolean; maritalStatus: boolean; maritalStatusSince: boolean
}

export default function StepBiographical({ onValidChange }: StepBiographicalProps) {
  const { formData, setStepData } = useHireWizard()
  const bio = formData.biographical

  // ── Local field state ───────────────────────────────────────────────────────
  const [otherTitleTh,     setOtherTitleTh]     = useState(bio.otherTitleTh)
  const [firstNameLocal,   setFirstNameLocal]   = useState(bio.firstNameLocal)
  const [lastNameLocal,    setLastNameLocal]    = useState(bio.lastNameLocal)
  const [middleNameLocal,  setMiddleNameLocal]  = useState(bio.middleNameLocal)
  const [nickname,         setNickname]         = useState(bio.nickname)
  const [militaryStatus,   setMilitaryStatus]   = useState(bio.militaryStatus ?? '')
  const [gender,           setGender]           = useState(bio.gender ?? '')
  const [nationality,      setNationality]      = useState(bio.nationality ?? '')
  const [foreigner,        setForeigner]        = useState(bio.foreigner ?? '')
  const [bloodType,        setBloodType]        = useState(bio.bloodType ?? '')
  const [maritalStatus,    setMaritalStatus]    = useState(bio.maritalStatus ?? '')
  const [maritalStatusSince,setMaritalStatusSince]= useState(bio.maritalStatusSince ?? '')

  // ── Touched / errors ────────────────────────────────────────────────────────
  const [touched, setTouched] = useState<TouchedState>({
    otherTitleTh: false, firstNameLocal: false, lastNameLocal: false,
    middleNameLocal: false, nickname: false, militaryStatus: false,
    gender: false, nationality: false, foreigner: false,
    bloodType: false, maritalStatus: false, maritalStatusSince: false,
  })
  const [errors, setErrors] = useState<FieldErrors>({})

  const touch = (field: keyof TouchedState) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // ── Validate + sync store ────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const result = stepBiographicalSchema.safeParse({
      otherTitleTh:      otherTitleTh     || undefined,
      firstNameLocal:    firstNameLocal   || undefined,
      lastNameLocal:     lastNameLocal    || undefined,
      middleNameLocal:   middleNameLocal  || undefined,
      nickname:          nickname         || undefined,
      militaryStatus:    militaryStatus   || undefined,
      gender:            gender           || undefined,
      nationality:       nationality      || undefined,
      foreigner:         foreigner        || undefined,
      bloodType:         bloodType        || undefined,
      maritalStatus:     maritalStatus    || undefined,
      maritalStatusSince:maritalStatusSince || undefined,
    })

    if (result.success) {
      setErrors({})
      setStepData('biographical', {
        otherTitleTh, firstNameLocal, lastNameLocal, middleNameLocal, nickname,
        militaryStatus: militaryStatus || null, gender: gender || null,
        nationality: nationality || null, foreigner: foreigner || null,
        bloodType: bloodType || null, maritalStatus: maritalStatus || null,
        maritalStatusSince: maritalStatusSince || null,
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
    otherTitleTh, firstNameLocal, lastNameLocal, middleNameLocal, nickname,
    militaryStatus, gender, nationality, foreigner, bloodType,
    maritalStatus, maritalStatusSince, setStepData, onValidChange,
  ])

  useEffect(() => { validate() }, [validate])

  const errMsg = (field: keyof FieldErrors) => {
    if (!touched[field as keyof TouchedState] || !errors[field]) return null
    return <p role="alert" className="mt-1 text-xs text-warning">{errors[field]}</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-ink">
        Cluster 2 — Job (Personal Information)
      </h2>

      {/* ─── BA Personal Info row 2 — Other Title (TH) * ─── */}
      <fieldset>
        <label htmlFor="other-title-th" className="humi-label">
          คำนำหน้า (TH) (Other Title TH)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="other-title-th" type="text" required aria-required="true"
          aria-invalid={touched.otherTitleTh && !!errors.otherTitleTh}
          placeholder="เช่น นาย / นาง / นางสาว"
          value={otherTitleTh}
          onChange={(e) => setOtherTitleTh(e.target.value)}
          onBlur={() => touch('otherTitleTh')}
          className="humi-input w-full max-w-sm" />
        {errMsg('otherTitleTh')}
      </fieldset>

      {/* ─── BA Personal Info row 3 — Firstname (Local) * ─── */}
      <fieldset>
        <label htmlFor="first-name-local" className="humi-label">
          ชื่อ (ภาษาท้องถิ่น) (Firstname Local)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="first-name-local" type="text" required aria-required="true"
          aria-invalid={touched.firstNameLocal && !!errors.firstNameLocal}
          placeholder="ชื่อภาษาไทย"
          value={firstNameLocal}
          onChange={(e) => setFirstNameLocal(e.target.value)}
          onBlur={() => touch('firstNameLocal')}
          className="humi-input w-full max-w-sm" />
        {errMsg('firstNameLocal')}
      </fieldset>

      {/* ─── BA Personal Info row 4 — Lastname (Local) * ─── */}
      <fieldset>
        <label htmlFor="last-name-local" className="humi-label">
          นามสกุล (ภาษาท้องถิ่น) (Lastname Local)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="last-name-local" type="text" required aria-required="true"
          aria-invalid={touched.lastNameLocal && !!errors.lastNameLocal}
          placeholder="นามสกุลภาษาไทย"
          value={lastNameLocal}
          onChange={(e) => setLastNameLocal(e.target.value)}
          onBlur={() => touch('lastNameLocal')}
          className="humi-input w-full max-w-sm" />
        {errMsg('lastNameLocal')}
      </fieldset>

      {/* ─── BA Personal Info row 5 — Middle Name (Local) * ─── */}
      <fieldset>
        <label htmlFor="middle-name-local" className="humi-label">
          ชื่อกลาง (Local) (Middle Name Local)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="middle-name-local" type="text" required aria-required="true"
          aria-invalid={touched.middleNameLocal && !!errors.middleNameLocal}
          placeholder="ชื่อกลาง"
          value={middleNameLocal}
          onChange={(e) => setMiddleNameLocal(e.target.value)}
          onBlur={() => touch('middleNameLocal')}
          className="humi-input w-full max-w-sm" />
        {errMsg('middleNameLocal')}
      </fieldset>

      {/* ─── BA Personal Info row 10 — Nickname * ─── */}
      <fieldset>
        <label htmlFor="nickname" className="humi-label">
          ชื่อเล่น (Nickname)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="nickname" type="text" required aria-required="true"
          aria-invalid={touched.nickname && !!errors.nickname}
          placeholder="ชื่อเล่น (EN/TH)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => touch('nickname')}
          className="humi-input w-full max-w-sm" />
        {errMsg('nickname')}
      </fieldset>

      {/* ─── BA Personal Info row 11 — Military Status * ─── */}
      <fieldset>
        <label htmlFor="military-status" className="humi-label">
          สถานะทางทหาร (Military Status)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="military-status" required aria-required="true"
          aria-invalid={touched.militaryStatus && !!errors.militaryStatus}
          value={militaryStatus}
          onChange={(e) => setMilitaryStatus(e.target.value)}
          onBlur={() => touch('militaryStatus')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกสถานะ —</option>
          {PICKLIST_MILITARY_STATUS.filter((m) => m.active).map((m) => (
            <option key={m.id} value={m.id}>{m.labelTh}</option>
          ))}
        </select>
        {errMsg('militaryStatus')}
      </fieldset>

      {/* ─── BA Personal Info row 12 — Gender * ─── */}
      <fieldset>
        <label htmlFor="gender" className="humi-label">
          เพศ (Gender)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="gender" required aria-required="true"
          aria-invalid={touched.gender && !!errors.gender}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onBlur={() => touch('gender')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกเพศ —</option>
          {PICKLIST_GENDER.filter((g) => g.active).map((g) => (
            <option key={g.id} value={g.id}>{g.labelTh}</option>
          ))}
        </select>
        {errMsg('gender')}
      </fieldset>

      {/* ─── BA Personal Info row 13 — Nationality * ─── */}
      <fieldset>
        <label htmlFor="nationality" className="humi-label">
          สัญชาติ (Nationality)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="nationality" required aria-required="true"
          aria-invalid={touched.nationality && !!errors.nationality}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          onBlur={() => touch('nationality')}
          className="humi-select w-full max-w-sm">
          <option value="">— เลือกสัญชาติ —</option>
          {PICKLIST_NATIONALITY.filter((n) => n.active).map((n) => (
            <option key={n.id} value={n.id}>{n.labelTh}</option>
          ))}
        </select>
        {errMsg('nationality')}
      </fieldset>

      {/* ─── BA Personal Info row 14 — Foreigner * ─── */}
      <fieldset>
        <label htmlFor="foreigner" className="humi-label">
          เป็นชาวต่างชาติ (Foreigner)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="foreigner" required aria-required="true"
          aria-invalid={touched.foreigner && !!errors.foreigner}
          value={foreigner}
          onChange={(e) => setForeigner(e.target.value)}
          onBlur={() => touch('foreigner')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือก —</option>
          {PICKLIST_YES_NO.filter((y) => y.active).map((y) => (
            <option key={y.id} value={y.id}>{y.labelTh}</option>
          ))}
        </select>
        {errMsg('foreigner')}
      </fieldset>

      {/* ─── BA Personal Info row 15 — Blood Type * ─── */}
      <fieldset>
        <label htmlFor="blood-type" className="humi-label">
          กรุ๊ปเลือด (Blood Type)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="blood-type" required aria-required="true"
          aria-invalid={touched.bloodType && !!errors.bloodType}
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          onBlur={() => touch('bloodType')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกกรุ๊ปเลือด —</option>
          {PICKLIST_BLOOD_TYPE.filter((b) => b.active).map((b) => (
            <option key={b.id} value={b.id}>{b.labelTh}</option>
          ))}
        </select>
        {errMsg('bloodType')}
      </fieldset>

      {/* ─── BA Personal Info row 16 — Marital Status * ─── */}
      <fieldset>
        <label htmlFor="marital-status" className="humi-label">
          สถานภาพสมรส (Marital Status)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="marital-status" required aria-required="true"
          aria-invalid={touched.maritalStatus && !!errors.maritalStatus}
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
          onBlur={() => touch('maritalStatus')}
          className="humi-select w-full max-w-xs">
          <option value="">— เลือกสถานภาพ —</option>
          {PICKLIST_MARITAL_STATUS.filter((m) => m.active).map((m) => (
            <option key={m.id} value={m.id}>{m.labelTh}</option>
          ))}
        </select>
        {errMsg('maritalStatus')}
      </fieldset>

      {/* ─── BA Personal Info row 17 — Marital Status Since * ─── */}
      <fieldset>
        <label htmlFor="marital-status-since" className="humi-label">
          วันที่เปลี่ยนสถานภาพ (Marital Status Since)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="marital-status-since" type="date" required aria-required="true"
          aria-invalid={touched.maritalStatusSince && !!errors.maritalStatusSince}
          value={maritalStatusSince}
          onChange={(e) => setMaritalStatusSince(e.target.value)}
          onBlur={() => touch('maritalStatusSince')}
          className="humi-input w-full max-w-xs" />
        {errMsg('maritalStatusSince')}
      </fieldset>

      <p className="text-xs text-ink-soft">
        <span className="humi-asterisk">*</span> ช่องที่บังคับกรอก
      </p>
    </div>
  )
}

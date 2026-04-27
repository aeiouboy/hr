'use client'

// StepBiographical.tsx — Cluster 2 "Job"
// BA Personal Info rows 2-17 = 12 fields (all mandatory per BA-EC-SUMMARY.md)
// Wave 2-A: BRD #12 gender/marital alignment, #13 spouse fields + nativePreferredLang + religion
// Picklist source: @hrms/shared/picklists (C7: single source of truth)

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { stepBiographicalSchema } from '@/lib/admin/validation/hireSchema'
import { AttachmentDropzone } from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import type { AttachedFile } from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import {
  PICKLIST_MILITARY_STATUS,
  PICKLIST_GENDER,
  PICKLIST_NATIONALITY,
  PICKLIST_BLOOD_TYPE,
  PICKLIST_MARITAL_STATUS,
  PICKLIST_YES_NO,
  PICKLIST_RELIGION,
} from '@hrms/shared/picklists'

// SF-aligned gender options — Female/Male only (SF externalCode: Female/Male; Humi id: F/M)
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.gender
// PICKLIST_GENDER uses Humi IDs 'M'/'F'/'X'; filter to M/F only (drop X — no SF counterpart)
const SF_GENDER_OPTIONS = PICKLIST_GENDER.filter((g) => g.id === 'M' || g.id === 'F')

// SF-aligned marital status — add 'E' (Engaged) which was missing; keep legacy options for compat
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.ecMaritalStatus
// SF codes: M/E/D/S/N — Humi legacy: SINGLE/MARRIED/DIVORCED/WIDOWED/SEPARATED/N
const ENGAGED_OPTION = { id: 'E', labelTh: 'คู่หมั้น (Engaged)', labelEn: 'Engaged', sortOrder: 1.5, active: true }
const MARITAL_OPTIONS = (() => {
  const base = [...PICKLIST_MARITAL_STATUS]
  const hasEngaged = base.some((m) => m.id === 'E')
  if (!hasEngaged) {
    // Insert after MARRIED (index 1)
    const marriedIdx = base.findIndex((m) => m.id === 'MARRIED')
    base.splice(marriedIdx >= 0 ? marriedIdx + 1 : 1, 0, ENGAGED_OPTION)
  }
  return base
})()

export interface StepBiographicalProps {
  onValidChange?: (isValid: boolean) => void
}

type FieldErrors = {
  otherTitleTh?: string; firstNameLocal?: string; lastNameLocal?: string
  middleNameLocal?: string; nickname?: string; militaryStatus?: string
  gender?: string; nationality?: string; foreigner?: string
  bloodType?: string; maritalStatus?: string; maritalStatusSince?: string
  spouseNameTh?: string; nativePreferredLang?: string
  religion?: string
}

type TouchedState = {
  otherTitleTh: boolean; firstNameLocal: boolean; lastNameLocal: boolean
  middleNameLocal: boolean; nickname: boolean; militaryStatus: boolean
  gender: boolean; nationality: boolean; foreigner: boolean
  bloodType: boolean; maritalStatus: boolean; maritalStatusSince: boolean
  spouseNameTh: boolean; nativePreferredLang: boolean
  religion: boolean
}

export default function StepBiographical({ onValidChange }: StepBiographicalProps) {
  const t = useTranslations('hireForm.biographical')
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
  const [attachmentFiles, setAttachmentFiles] = useState<AttachedFile[]>([])
  // BRD #13: Spouse fields
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].partnerName
  const [spouseNameTh,    setSpouseNameTh]    = useState((bio as Record<string, unknown>).spouseNameTh as string ?? '')
  // BRD #13: nativePreferredLang
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].nativePreferredLang
  const [nativePreferredLang, setNativePreferredLang] = useState((bio as Record<string, unknown>).nativePreferredLang as string ?? '')
  // BRD #12 MED: religion
  // SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].customString1
  const [religion, setReligion] = useState((bio as Record<string, unknown>).religion as string ?? '')

  // ── Touched / errors ────────────────────────────────────────────────────────
  const [touched, setTouched] = useState<TouchedState>({
    otherTitleTh: false, firstNameLocal: false, lastNameLocal: false,
    middleNameLocal: false, nickname: false, militaryStatus: false,
    gender: false, nationality: false, foreigner: false,
    bloodType: false, maritalStatus: false, maritalStatusSince: false,
    spouseNameTh: false, nativePreferredLang: false,
    religion: false,
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
      spouseNameTh:      spouseNameTh     || undefined,
      nativePreferredLang: nativePreferredLang || undefined,
      religion:          religion         || undefined,
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
      // BRD #13: persist spouse/lang fields via direct store update (extra props)
      // These are not in the original biographical interface but are tracked for SF PerPersonal
      if (spouseNameTh || nativePreferredLang || religion) {
        const extra: Record<string, unknown> = {}
        if (spouseNameTh)       extra.spouseNameTh = spouseNameTh
        if (nativePreferredLang) extra.nativePreferredLang = nativePreferredLang
        if (religion)           extra.religion = religion
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setStepData('biographical', extra as any)
      }
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
    maritalStatus, maritalStatusSince, spouseNameTh,
    nativePreferredLang, religion, setStepData, onValidChange,
  ])

  useEffect(() => { validate() }, [validate])

  // A2 — Auto-derive foreigner from nationality (SF rule XX-XXX-EIM-OI-SetFlagForeigner)
  // SF: PerPersonal.customString13 = 1 when nationality !== TH (Thai picklist id = 'TH')
  useEffect(() => {
    if (!nationality) return
    const derived = nationality !== 'TH' ? 'YES' : 'NO'
    setForeigner((prev) => (prev === derived ? prev : derived))
  }, [nationality])

  const errMsg = (field: keyof FieldErrors) => {
    if (!touched[field as keyof TouchedState] || !errors[field]) return null
    return <p role="alert" className="mt-1 text-xs text-warning">{errors[field]}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
      {/* ─── BA Personal Info row 2 — Other Title (TH) * ─── */}
      <fieldset>
        <label htmlFor="other-title-th" className="humi-label">
          {t('salutationLocal')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="other-title-th" type="text" required aria-required="true"
          aria-invalid={touched.otherTitleTh && !!errors.otherTitleTh}
          placeholder={t('salutationLocalPlaceholder')}
          value={otherTitleTh}
          onChange={(e) => setOtherTitleTh(e.target.value)}
          onBlur={() => touch('otherTitleTh')}
          className="humi-input w-full" />
        {errMsg('otherTitleTh')}
      </fieldset>

      {/* ─── BA Personal Info row 3 — Firstname (Local) * ─── */}
      <fieldset>
        <label htmlFor="first-name-local" className="humi-label">
          {t('firstNameLocal')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="first-name-local" type="text" required aria-required="true"
          aria-invalid={touched.firstNameLocal && !!errors.firstNameLocal}
          placeholder={t('firstNameLocalPlaceholder')}
          value={firstNameLocal}
          onChange={(e) => setFirstNameLocal(e.target.value)}
          onBlur={() => touch('firstNameLocal')}
          className="humi-input w-full" />
        {errMsg('firstNameLocal')}
      </fieldset>

      {/* ─── BA Personal Info row 4 — Lastname (Local) * ─── */}
      <fieldset>
        <label htmlFor="last-name-local" className="humi-label">
          {t('lastNameLocal')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="last-name-local" type="text" required aria-required="true"
          aria-invalid={touched.lastNameLocal && !!errors.lastNameLocal}
          placeholder={t('lastNameLocalPlaceholder')}
          value={lastNameLocal}
          onChange={(e) => setLastNameLocal(e.target.value)}
          onBlur={() => touch('lastNameLocal')}
          className="humi-input w-full" />
        {errMsg('lastNameLocal')}
      </fieldset>

      {/* ─── BA Personal Info row 5 — Middle Name (Local) — optional (SF PerPersonal.secondLastName sap_required=false) ─── */}
      <fieldset>
        <label htmlFor="middle-name-local" className="humi-label">
          {t('middleNameLocal')}
        </label>
        <input id="middle-name-local" type="text"
          aria-invalid={touched.middleNameLocal && !!errors.middleNameLocal}
          placeholder={t('middleNameLocalPlaceholder')}
          value={middleNameLocal}
          onChange={(e) => setMiddleNameLocal(e.target.value)}
          onBlur={() => touch('middleNameLocal')}
          className="humi-input w-full" />
        {errMsg('middleNameLocal')}
        {/* D1 — SF mapping note (SF parity 2026-04-27) */}
        <p className="mt-1 text-xs text-ink-soft">
          {t('middleNameLocalHelp')}
        </p>
      </fieldset>

      {/* ─── BA Personal Info row 10 — Nickname — optional (SF PerPersonal.preferredName sap_required=false) ─── */}
      <fieldset>
        <label htmlFor="nickname" className="humi-label">
          {t('nickname')}
        </label>
        <input id="nickname" type="text"
          aria-invalid={touched.nickname && !!errors.nickname}
          placeholder={t('nicknamePlaceholder')}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => touch('nickname')}
          className="humi-input w-full" />
        {errMsg('nickname')}
      </fieldset>

      {/* ─── BA Personal Info row 11 — Military Status — optional (not in SF schema; Thai-locale custom) ─── */}
      <fieldset>
        <label htmlFor="military-status" className="humi-label">
          {t('militaryStatus')}
        </label>
        <select id="military-status"
          aria-invalid={touched.militaryStatus && !!errors.militaryStatus}
          value={militaryStatus}
          onChange={(e) => setMilitaryStatus(e.target.value)}
          onBlur={() => touch('militaryStatus')}
          className="humi-select w-full">
          <option value="">{t('selectMilitaryStatus')}</option>
          {PICKLIST_MILITARY_STATUS.filter((m) => m.active).map((m) => (
            <option key={m.id} value={m.id}>{m.labelTh}</option>
          ))}
        </select>
        {errMsg('militaryStatus')}
      </fieldset>

      {/* ─── BA Personal Info row 12 — Gender — optional (SF PerPersonal.gender sap_required=false)
           SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.gender
           SF codes: Female / Male only (BRD #12) ─── */}
      <fieldset>
        <label htmlFor="gender" className="humi-label">
          {t('gender')}
        </label>
        <select id="gender"
          aria-invalid={touched.gender && !!errors.gender}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onBlur={() => touch('gender')}
          className="humi-select w-full">
          <option value="">{t('selectGender')}</option>
          {SF_GENDER_OPTIONS.filter((g) => g.active).map((g) => (
            <option key={g.id} value={g.id}>{g.labelTh}</option>
          ))}
        </select>
        {errMsg('gender')}
      </fieldset>

      {/* ─── BA Personal Info row 13 — Nationality * ─── */}
      <fieldset>
        <label htmlFor="nationality" className="humi-label">
          {t('nationality')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="nationality" required aria-required="true"
          aria-invalid={touched.nationality && !!errors.nationality}
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          onBlur={() => touch('nationality')}
          className="humi-select w-full">
          <option value="">{t('selectNationality')}</option>
          {PICKLIST_NATIONALITY.filter((n) => n.active).map((n) => (
            <option key={n.id} value={n.id}>{n.labelTh}</option>
          ))}
        </select>
        {errMsg('nationality')}
      </fieldset>

      {/* ─── BA Personal Info row 14 — Foreigner — auto-derived from nationality (SF rule XX-XXX-EIM-OI-SetFlagForeigner) ─── */}
      <fieldset>
        <label htmlFor="foreigner" className="humi-label">
          {t('foreigner')}
          <span className="ml-1 text-xs text-ink-muted">{t('foreignerAuto')}</span>
        </label>
        <select id="foreigner" disabled
          value={foreigner}
          className="humi-select w-full opacity-60 cursor-not-allowed">
          <option value="">{t('selectForeigner')}</option>
          {PICKLIST_YES_NO.filter((y) => y.active).map((y) => (
            <option key={y.id} value={y.id}>{y.labelTh}</option>
          ))}
        </select>
      </fieldset>

      {/* ─── BA Personal Info row 15 — Blood Type — optional (not in SF schema; Thai-locale custom) ─── */}
      <fieldset>
        <label htmlFor="blood-type" className="humi-label">
          {t('bloodType')}
        </label>
        <select id="blood-type"
          aria-invalid={touched.bloodType && !!errors.bloodType}
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          onBlur={() => touch('bloodType')}
          className="humi-select w-full">
          <option value="">{t('selectBloodType')}</option>
          {PICKLIST_BLOOD_TYPE.filter((b) => b.active).map((b) => (
            <option key={b.id} value={b.id}>{b.labelTh}</option>
          ))}
        </select>
        {errMsg('bloodType')}
      </fieldset>

      {/* ─── BA Personal Info row 16 — Marital Status — optional (SF PerPersonal.maritalStatus sap_required=false)
           SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json#aggregationByPicklist.ecMaritalStatus
           SF codes: M/E/D/S/N — added E (Engaged) which was missing (BRD #12) ─── */}
      <fieldset>
        <label htmlFor="marital-status" className="humi-label">
          {t('maritalStatus')}
        </label>
        <select id="marital-status"
          aria-invalid={touched.maritalStatus && !!errors.maritalStatus}
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
          onBlur={() => touch('maritalStatus')}
          className="humi-select w-full">
          <option value="">{t('selectMaritalStatus')}</option>
          {MARITAL_OPTIONS.filter((m) => m.active).map((m) => (
            <option key={m.id} value={m.id}>{m.labelTh}</option>
          ))}
        </select>
        {errMsg('maritalStatus')}
      </fieldset>

      {/* ─── BA Personal Info row 17 — Marital Status Since * (conditional: required when ≠ SINGLE)
           Fix per AUDIT #7 — asterisk and aria-required now reflect conditional rule ─── */}
      <fieldset>
        <label htmlFor="marital-status-since" className="humi-label">
          {t('maritalStatusSince')}
          {maritalStatus !== 'SINGLE' && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
        </label>
        <input id="marital-status-since" type="date"
          required={maritalStatus !== 'SINGLE'}
          aria-required={maritalStatus !== 'SINGLE'}
          aria-invalid={touched.maritalStatusSince && !!errors.maritalStatusSince}
          value={maritalStatusSince}
          onChange={(e) => setMaritalStatusSince(e.target.value)}
          onBlur={() => touch('maritalStatusSince')}
          className="humi-input w-full" />
        {errMsg('maritalStatusSince')}
      </fieldset>

      {/* ─── BRD #13 — spouseNameTh — ชื่อคู่สมรส (ภาษาไทย) (optional when married/engaged)
           SF: PerPersonal.partnerName (customString2=firstNameTH, customString3=lastNameTH)
           SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].partnerName ─── */}
      {(maritalStatus === 'MARRIED' || maritalStatus === 'M' || maritalStatus === 'E') && (
        <fieldset>
          <label htmlFor="spouse-name-th" className="humi-label">
            {t('spouseNameTh')}
          </label>
          <input id="spouse-name-th" type="text"
            placeholder={t('spouseNameThPlaceholder')}
            value={spouseNameTh}
            onChange={(e) => setSpouseNameTh(e.target.value)}
            onBlur={() => touch('spouseNameTh')}
            className="humi-input w-full" />
          {errMsg('spouseNameTh')}
          <p className="mt-1 text-xs text-ink-soft">
            {t('spouseNameThHelp')}
          </p>
        </fieldset>
      )}

      {/* ─── BRD #13 — nativePreferredLang — ภาษาแม่/ภาษาที่ต้องการใช้ (optional)
           SF: PerPersonal.customString5 = nativePreferredLang code
           SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].nativePreferredLang ─── */}
      <fieldset>
        <label htmlFor="native-preferred-lang" className="humi-label">
          {t('nativePreferredLang')}
        </label>
        <input id="native-preferred-lang" type="text"
          placeholder={t('nativePreferredLangPlaceholder')}
          value={nativePreferredLang}
          onChange={(e) => setNativePreferredLang(e.target.value)}
          onBlur={() => touch('nativePreferredLang')}
          className="humi-input w-full" />
        {errMsg('nativePreferredLang')}
        <p className="mt-1 text-xs text-ink-soft">
          {t('nativePreferredLangHelp')}
        </p>
      </fieldset>

      {/* ─── BRD #12 MED — religion — ศาสนา (optional)
           SF: PerPersonal.customString1 = RELIGION_THA code (29/24/99/46/43/36)
           SF cite: qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json#.d.results[0].customString1 ─── */}
      <fieldset>
        <label htmlFor="religion" className="humi-label">
          {t('religion')}
        </label>
        <select id="religion"
          value={religion}
          onChange={(e) => setReligion(e.target.value)}
          onBlur={() => touch('religion')}
          className="humi-select w-full">
          <option value="">{t('selectReligion')}</option>
          {PICKLIST_RELIGION.filter((r) => r.active).map((r) => (
            <option key={r.id} value={r.id}>{r.labelTh}</option>
          ))}
        </select>
        {errMsg('religion')}
      </fieldset>

      {/* SF parity 2026-04-27: attachments deferred to post-hire profile-edit (not in SF newhire scope) */}
      {false && (
        <div className="md:col-span-2">
          <AttachmentDropzone
            files={attachmentFiles}
            onFilesChange={setAttachmentFiles}
            label="เอกสารแนบ"
            accept="image/*,.pdf"
            maxFiles={5}
            maxSizeMB={5}
          />
        </div>
      )}
    </div>
  )
}

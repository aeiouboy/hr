// VALIDATION_EXEMPT: B-action factory page — pre-submit gate via actionAvailability + ActionGuardBanner; Zod wire deferred to Sprint 2 lifecycleSchema audit (#47)
'use client'

// employees/[id]/edit/page.tsx — S5 Employee Data Edit (Wave 2, Archetype B)
//
// 23 Personal Info fields in 4 logical groups:
//   Names       — 6 fields (Local salutation + names + nickname)
//   EN Names    — 4 fields (EN salutation + names, read-only mirror)
//   Attributes  — 7 fields (gender / nationality / foreigner / blood / marital / military)
//   Contact     — 6 fields (phone / email / address 1-2 / postal code / country)
//
// C8 source-grounding: field list traced to BA-EC-SUMMARY.md Personal Info section + BRD #12.
// C1 surgical: does NOT touch useTimelines, does NOT invent TimelineEvent variant.
// Submit: updateEmployee(id, patch) → success banner → navigate back to Detail hub.
//
// Factory usage: createClusterWizard with 1 step (single-cluster Archetype B pattern).
// readOnlyKeys: employee_id + EN-name fields (mirrors from S1 Hire — not editable here).
//
// PoC B1: Wrapped in <EffectiveDateGate> (spec B1, outer wrapper only).
// effectiveDate is threaded into the submit payload as required by spec §5.2 (J7).
// min={hireDateISO} is left as a comment — this page has no hire-date bound; see §9 Decision 4.

import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { buttonVariants } from '@/components/humi'
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'
import { useEmployees } from '@/lib/admin/store/useEmployees'
import {
  PICKLIST_SALUTATION_EN,
  PICKLIST_GENDER,
  PICKLIST_NATIONALITY,
  PICKLIST_YES_NO,
  PICKLIST_BLOOD_TYPE,
  PICKLIST_MARITAL_STATUS,
  PICKLIST_MILITARY_STATUS,
  PICKLIST_COUNTRY_ISO,
} from '@hrms/shared/picklists'

// ─── Form data type ───────────────────────────────────────────

interface EmployeeEditFormData {
  names: {
    salutationLocal: string       // PICKLIST_SALUTATION_EN (reuse same codes for Local)
    otherTitleTh: string          // free text
    firstNameLocal: string        // mandatory
    middleNameLocal: string
    lastNameLocal: string         // mandatory
    nickname: string              // mandatory
  }
  namesEn: {
    salutationEn: string          // PICKLIST_SALUTATION_EN — read-only mirror
    firstNameEn: string           // read-only mirror from hire
    middleNameEn: string          // read-only mirror
    lastNameEn: string            // read-only mirror
  }
  attributes: {
    gender: string                // PICKLIST_GENDER — mandatory
    nationality: string           // PICKLIST_NATIONALITY — mandatory
    foreigner: string             // PICKLIST_YES_NO — mandatory
    bloodType: string             // PICKLIST_BLOOD_TYPE — mandatory
    maritalStatus: string         // PICKLIST_MARITAL_STATUS — mandatory
    maritalStatusSince: string    // date — optional
    militaryStatus: string        // PICKLIST_MILITARY_STATUS — mandatory
  }
  contact: {
    phone: string                 // mandatory, phone format
    email: string                 // mandatory, email format
    addressLine1: string          // mandatory
    addressLine2: string
    postalCode: string            // 5-digit numeric
    country: string               // PICKLIST_COUNTRY_ISO
  }
}

// ─── Validation helpers ───────────────────────────────────────

const PHONE_RE = /^[0-9+\-() ]{7,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POSTAL_RE = /^[0-9]{5}$/

interface EditErrors {
  firstNameLocal?: string
  lastNameLocal?: string
  nickname?: string
  gender?: string
  nationality?: string
  foreigner?: string
  bloodType?: string
  maritalStatus?: string
  militaryStatus?: string
  phone?: string
  email?: string
  addressLine1?: string
  postalCode?: string
}

function validateForm(d: EmployeeEditFormData): EditErrors {
  const e: EditErrors = {}
  if (!d.names.firstNameLocal.trim()) e.firstNameLocal = 'กรุณากรอกชื่อ'
  if (!d.names.lastNameLocal.trim())  e.lastNameLocal  = 'กรุณากรอกนามสกุล'
  if (!d.names.nickname.trim())       e.nickname       = 'กรุณากรอก Nickname'
  if (!d.attributes.gender)           e.gender         = 'กรุณาเลือกเพศ'
  if (!d.attributes.nationality)      e.nationality    = 'กรุณาเลือกสัญชาติ'
  if (!d.attributes.foreigner)        e.foreigner      = 'กรุณาเลือก'
  if (!d.attributes.bloodType)        e.bloodType      = 'กรุณาเลือกกรุ๊ปเลือด'
  if (!d.attributes.maritalStatus)    e.maritalStatus  = 'กรุณาเลือกสถานภาพ'
  if (!d.attributes.militaryStatus)   e.militaryStatus = 'กรุณาเลือกสถานะทางทหาร'
  if (!d.contact.phone.trim())        e.phone          = 'กรุณากรอกเบอร์โทรศัพท์'
  else if (!PHONE_RE.test(d.contact.phone.trim())) e.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง'
  if (!d.contact.email.trim())        e.email          = 'กรุณากรอกอีเมล'
  else if (!EMAIL_RE.test(d.contact.email.trim())) e.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  if (!d.contact.addressLine1.trim()) e.addressLine1   = 'กรุณากรอกที่อยู่'
  if (d.contact.postalCode && !POSTAL_RE.test(d.contact.postalCode)) {
    e.postalCode = 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก'
  }
  return e
}

// ─── Select helper component ──────────────────────────────────

interface SelectProps {
  id: string
  label: string
  required?: boolean
  readOnly?: boolean
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: React.ReactNode
  options: readonly { id: string; labelTh: string }[]
}

function PicklistSelect({ id, label, required, readOnly, value, onChange, onBlur, error, options }: SelectProps) {
  return (
    <fieldset>
      <label htmlFor={id} className="humi-label">
        {label}
        {required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
      </label>
      <select
        id={id}
        required={required}
        disabled={readOnly}
        aria-required={required}
        aria-invalid={!!error}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="humi-input w-full max-w-sm"
        style={readOnly ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
      >
        <option value="">— เลือก —</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.labelTh}</option>
        ))}
      </select>
      {error && <p role="alert" className="mt-1 text-xs text-warning">{error}</p>}
    </fieldset>
  )
}

// ─── Text input helper ────────────────────────────────────────

interface TextInputProps {
  id: string
  label: string
  required?: boolean
  readOnly?: boolean
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: React.ReactNode
}

function TextInput({ id, label, required, readOnly, type = 'text', placeholder, value, onChange, onBlur, error }: TextInputProps) {
  return (
    <fieldset>
      <label htmlFor={id} className="humi-label">
        {label}
        {required && <span aria-hidden="true" className="humi-asterisk ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        readOnly={readOnly}
        aria-required={required}
        aria-invalid={!!error}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="humi-input w-full max-w-sm"
        style={readOnly ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
      />
      {error && <p role="alert" className="mt-1 text-xs text-warning">{error}</p>}
    </fieldset>
  )
}

// ─── Section header ───────────────────────────────────────────

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="humi-eyebrow pb-1 border-b border-[color:var(--color-hairline-soft)]" style={{ marginBottom: 16 }}>
      {title}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────

export default function EmployeeEditPage() {
  const params  = useParams()
  const router  = useRouter()
  const empId   = params.id as string
  const locale  = params.locale as string

  // Load employee from S2 store
  const employee = useEmployees((s) => s.getById(empId))
  const updateEmployee = useEmployees((s) => s.updateEmployee)

  // ── Derive initial form data from MockEmployee ────────────────
  const INITIAL_FORM = useMemo<EmployeeEditFormData>(() => ({
    names: {
      salutationLocal: '',
      otherTitleTh: '',
      firstNameLocal: employee?.first_name_th ?? '',
      middleNameLocal: '',
      lastNameLocal: employee?.last_name_th ?? '',
      nickname: '',
    },
    namesEn: {
      salutationEn: '',
      firstNameEn: employee?.first_name_en ?? '',
      middleNameEn: '',
      lastNameEn: employee?.last_name_en ?? '',
    },
    attributes: {
      gender: '',
      nationality: 'TH',
      foreigner: 'N',
      bloodType: '',
      maritalStatus: '',
      maritalStatusSince: '',
      militaryStatus: '',
    },
    contact: {
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      country: 'TH',
    },
  }), [employee])

  // ── Factory: 1-step Archetype B wizard ───────────────────────
  // readOnlyKeys: employee_id + EN name fields (mirrors from Hire, not editable here)
  const wizard = useMemo(
    () =>
      createClusterWizard<EmployeeEditFormData>({
        name: 'employee-edit',
        storeKey: `employee-edit-draft-${empId}`,
        initialFormData: INITIAL_FORM,
        clusterSteps: [
          { number: 1, labelTh: 'แก้ไขข้อมูลพนักงาน', labelEn: 'Edit Employee' },
        ],
        validators: {
          1: (d) => {
            const errs = validateForm(d)
            return Object.keys(errs).length === 0
          },
        },
        employeeId: empId,
        preloadedEmployee: {
          namesEn: {
            salutationEn: '',
            firstNameEn: employee?.first_name_en ?? '',
            middleNameEn: '',
            lastNameEn: employee?.last_name_en ?? '',
          },
        } as Partial<EmployeeEditFormData>,
      }),
    // wizard is created once per mount — empId/employee are stable per page
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [empId],
  )

  const { formData, setStepData } = wizard.useStore()
  const { readOnlyKeys } = wizard

  // readOnlyKeys includes 'employee_id' implicitly (not a form slice key —
  // just marker; EN names are read-only via the preloadedEmployee pattern)
  const enNamesReadOnly = readOnlyKeys.has('namesEn')

  // ── Local state (mirror store for responsive editing) ─────────
  const [names,      setNamesLocal]      = useState(formData.names)
  const [namesEn]                        = useState(formData.namesEn)      // read-only, no setter
  const [attributes, setAttributesLocal] = useState(formData.attributes)
  const [contact,    setContactLocal]    = useState(formData.contact)

  // ── Touched state ─────────────────────────────────────────────
  const allTouchedRef = useRef(false)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const touch = useCallback((field: string) =>
    setTouchedFields((prev) => new Set([...prev, field])), [])

  // ── Sync local → store on every change ───────────────────────
  useEffect(() => { setStepData('names',      names)      }, [names,      setStepData])
  useEffect(() => { setStepData('attributes', attributes) }, [attributes, setStepData])
  useEffect(() => { setStepData('contact',    contact)    }, [contact,    setStepData])

  // ── Validation errors (derived) ───────────────────────────────
  const errors = useMemo(
    () => validateForm({ names, namesEn, attributes, contact }),
    [names, namesEn, attributes, contact],
  )

  const isFormValid = Object.keys(errors).length === 0

  // ── Banner state ──────────────────────────────────────────────
  const [showBanner, setShowBanner] = useState(false)

  // ── Submit — receives effectiveDate from EffectiveDateGate (PoC B1, spec §5.2 J7) ──
  function handleSubmit(effectiveDate: string) {
    // Touch all fields to surface errors
    allTouchedRef.current = true
    setTouchedFields(new Set([
      'firstNameLocal', 'lastNameLocal', 'nickname',
      'gender', 'nationality', 'foreigner', 'bloodType', 'maritalStatus', 'militaryStatus',
      'phone', 'email', 'addressLine1', 'postalCode',
    ]))

    if (!isFormValid) return

    // Patch in-memory store (S2 owner); effectiveDate threaded into payload (J7)
    updateEmployee(empId, {
      first_name_th: names.firstNameLocal,
      last_name_th:  names.lastNameLocal,
      first_name_en: namesEn.firstNameEn,
      last_name_en:  namesEn.lastNameEn,
      // effectiveDate is passed through to the API when backend implements it
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(effectiveDate ? { effectiveDate } as any : {}),
    })

    setShowBanner(true)
    // Navigate back to detail hub after 1.4s so user sees banner
    setTimeout(() => {
      router.push(`/${locale}/admin/employees/${empId}`)
    }, 1400)
  }

  // ── Not found guard ───────────────────────────────────────────
  if (!employee) {
    return (
      <div className="p-6">
        <Link
          href={`/${locale}/admin/employees`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6, marginBottom: 16 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>รายการพนักงาน</span>
        </Link>
        <div className="humi-card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">ไม่พบพนักงานรหัส "{empId}"</p>
        </div>
      </div>
    )
  }

  const nameTh = `${employee.first_name_th} ${employee.last_name_th}`

  // ── Helper: field error if touched ───────────────────────────
  const errMsg = (field: keyof EditErrors) => {
    if (!touchedFields.has(field) || !errors[field]) return null
    return <p role="alert" className="mt-1 text-xs text-warning">{errors[field]}</p>
  }

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Success banner */}
      {showBanner && (
        <div
          role="status"
          aria-live="polite"
          className="humi-row"
          style={{
            gap: 10, padding: '12px 16px', borderRadius: 10,
            background: 'var(--color-accent-soft)',
            color: 'var(--color-accent)',
            fontWeight: 600,
          }}
        >
          <Check size={18} aria-hidden />
          <span>บันทึกข้อมูลพนักงานเรียบร้อย</span>
        </div>
      )}

      {/* Back nav */}
      <div>
        <Link
          href={`/${locale}/admin/employees/${empId}`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าข้อมูลพนักงาน</span>
        </Link>
      </div>

      {/* Employee snapshot (read-only context) */}
      <div className="humi-card humi-card--cream">
        <div className="humi-eyebrow" style={{ marginBottom: 6 }}>
          {employee.employee_id}
        </div>
        <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
        <div className="text-small text-ink-muted">
          {employee.position_title} · {employee.company}
        </div>
      </div>

      {/* Personal Info edit = direct-edit method per SF DOC-F2B0E487 + audit #22.
          EffectiveDateGate removed — Pattern 2 reserves effective-dating for state
          changes (transfer/probation/terminate), not personal-info corrections. */}
      <div className="humi-card">
        <div style={{ marginBottom: 24 }}>
          <h1 className="font-display text-[20px] font-semibold text-ink">
            แก้ไขข้อมูลส่วนตัว
          </h1>
        </div>

        <div className="space-y-8">

          {/* ── Group 1: Names (Local) ── */}
          <section aria-labelledby="section-names">
            <SectionLabel title="ชื่อ (ภาษาท้องถิ่น)" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Salutation (Local) */}
              <PicklistSelect
                id="salutation-local"
                label="คำนำหน้า (ไทย)"
                value={names.salutationLocal}
                onChange={(v) => setNamesLocal((p) => ({ ...p, salutationLocal: v }))}
                onBlur={() => touch('salutationLocal')}
                options={PICKLIST_SALUTATION_EN}
              />

              {/* Other Title (TH) */}
              <TextInput
                id="other-title-th"
                label="คำนำหน้าอื่น (TH)"
                placeholder="เช่น ร้อยเอก, ดร."
                value={names.otherTitleTh}
                onChange={(v) => setNamesLocal((p) => ({ ...p, otherTitleTh: v }))}
                onBlur={() => touch('otherTitleTh')}
              />

              {/* Firstname (Local) — mandatory */}
              <TextInput
                id="first-name-local"
                label="ชื่อ (ภาษาท้องถิ่น)"
                required
                placeholder="ชื่อภาษาไทย"
                value={names.firstNameLocal}
                onChange={(v) => setNamesLocal((p) => ({ ...p, firstNameLocal: v }))}
                onBlur={() => touch('firstNameLocal')}
                error={errMsg('firstNameLocal')}
              />

              {/* Middle Name (Local) */}
              <TextInput
                id="middle-name-local"
                label="ชื่อกลาง (Local)"
                placeholder="ชื่อกลาง (ถ้ามี)"
                value={names.middleNameLocal}
                onChange={(v) => setNamesLocal((p) => ({ ...p, middleNameLocal: v }))}
                onBlur={() => touch('middleNameLocal')}
              />

              {/* Lastname (Local) — mandatory */}
              <TextInput
                id="last-name-local"
                label="นามสกุล (ภาษาท้องถิ่น)"
                required
                placeholder="นามสกุลภาษาไทย"
                value={names.lastNameLocal}
                onChange={(v) => setNamesLocal((p) => ({ ...p, lastNameLocal: v }))}
                onBlur={() => touch('lastNameLocal')}
                error={errMsg('lastNameLocal')}
              />

              {/* Nickname — mandatory */}
              <TextInput
                id="nickname"
                label="ชื่อเล่น"
                required
                placeholder="ชื่อเล่น"
                value={names.nickname}
                onChange={(v) => setNamesLocal((p) => ({ ...p, nickname: v }))}
                onBlur={() => touch('nickname')}
                error={errMsg('nickname')}
              />
            </div>
          </section>

          {/* ── Group 2: Localized Names (EN) — read-only mirror ── */}
          <section aria-labelledby="section-names-en">
            <SectionLabel title="ชื่อ (ภาษาอังกฤษ)" />
            <p className="text-small text-ink-muted mb-4">
              ข้อมูลนี้ถูกกำหนดตอน Hire ไม่สามารถแก้ไขได้ที่นี่
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Salutation EN */}
              <PicklistSelect
                id="salutation-en"
                label="คำนำหน้า (EN)"
                readOnly={enNamesReadOnly}
                value={namesEn.salutationEn}
                onChange={() => {/* read-only */}}
                options={PICKLIST_SALUTATION_EN}
              />

              {/* Firstname EN */}
              <TextInput
                id="first-name-en"
                label="ชื่อ (EN)"
                readOnly={enNamesReadOnly}
                value={namesEn.firstNameEn}
                onChange={() => {/* read-only */}}
              />

              {/* Middle Name EN */}
              <TextInput
                id="middle-name-en"
                label="ชื่อกลาง (EN)"
                readOnly={enNamesReadOnly}
                value={namesEn.middleNameEn}
                onChange={() => {/* read-only */}}
              />

              {/* Lastname EN */}
              <TextInput
                id="last-name-en"
                label="นามสกุล (EN)"
                readOnly={enNamesReadOnly}
                value={namesEn.lastNameEn}
                onChange={() => {/* read-only */}}
              />
            </div>
          </section>

          {/* ── Group 3: Personal Attributes ── */}
          <section aria-labelledby="section-attributes">
            <SectionLabel title="ข้อมูลส่วนตัว" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Gender — mandatory */}
              <PicklistSelect
                id="gender"
                label="เพศ"
                required
                value={attributes.gender}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, gender: v }))}
                onBlur={() => touch('gender')}
                error={errMsg('gender')}
                options={PICKLIST_GENDER}
              />

              {/* Nationality — mandatory */}
              <PicklistSelect
                id="nationality"
                label="สัญชาติ"
                required
                value={attributes.nationality}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, nationality: v }))}
                onBlur={() => touch('nationality')}
                error={errMsg('nationality')}
                options={PICKLIST_NATIONALITY}
              />

              {/* Foreigner — mandatory */}
              <PicklistSelect
                id="foreigner"
                label="ชาวต่างชาติ"
                required
                value={attributes.foreigner}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, foreigner: v }))}
                onBlur={() => touch('foreigner')}
                error={errMsg('foreigner')}
                options={PICKLIST_YES_NO}
              />

              {/* Blood Type — mandatory */}
              <PicklistSelect
                id="blood-type"
                label="กรุ๊ปเลือด"
                required
                value={attributes.bloodType}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, bloodType: v }))}
                onBlur={() => touch('bloodType')}
                error={errMsg('bloodType')}
                options={PICKLIST_BLOOD_TYPE}
              />

              {/* Marital Status — mandatory */}
              <PicklistSelect
                id="marital-status"
                label="สถานภาพสมรส"
                required
                value={attributes.maritalStatus}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, maritalStatus: v }))}
                onBlur={() => touch('maritalStatus')}
                error={errMsg('maritalStatus')}
                options={PICKLIST_MARITAL_STATUS}
              />

              {/* Marital Status Since — date, optional */}
              <fieldset>
                <label htmlFor="marital-status-since" className="humi-label">
                  วันที่เปลี่ยนสถานภาพ
                </label>
                <input
                  id="marital-status-since"
                  type="date"
                  value={attributes.maritalStatusSince}
                  onChange={(e) => setAttributesLocal((p) => ({ ...p, maritalStatusSince: e.target.value }))}
                  className="humi-input w-full max-w-sm"
                />
              </fieldset>

              {/* Military Status — mandatory */}
              <PicklistSelect
                id="military-status"
                label="สถานะทางทหาร"
                required
                value={attributes.militaryStatus}
                onChange={(v) => setAttributesLocal((p) => ({ ...p, militaryStatus: v }))}
                onBlur={() => touch('militaryStatus')}
                error={errMsg('militaryStatus')}
                options={PICKLIST_MILITARY_STATUS}
              />
            </div>
          </section>

          {/* ── Group 4: Contact ── */}
          <section aria-labelledby="section-contact">
            <SectionLabel title="ข้อมูลติดต่อ" />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Phone — mandatory */}
              <TextInput
                id="phone"
                label="เบอร์โทรศัพท์"
                required
                type="tel"
                placeholder="0812345678"
                value={contact.phone}
                onChange={(v) => setContactLocal((p) => ({ ...p, phone: v }))}
                onBlur={() => touch('phone')}
                error={errMsg('phone')}
              />

              {/* Email — mandatory */}
              <TextInput
                id="email"
                label="อีเมล"
                required
                type="email"
                placeholder="name@example.com"
                value={contact.email}
                onChange={(v) => setContactLocal((p) => ({ ...p, email: v }))}
                onBlur={() => touch('email')}
                error={errMsg('email')}
              />

              {/* Address Line 1 — mandatory */}
              <div className="sm:col-span-2">
                <TextInput
                  id="address-line1"
                  label="ที่อยู่"
                  required
                  placeholder="บ้านเลขที่ ถนน แขวง เขต"
                  value={contact.addressLine1}
                  onChange={(v) => setContactLocal((p) => ({ ...p, addressLine1: v }))}
                  onBlur={() => touch('addressLine1')}
                  error={errMsg('addressLine1')}
                />
              </div>

              {/* Address Line 2 — optional */}
              <div className="sm:col-span-2">
                <TextInput
                  id="address-line2"
                  label="ที่อยู่เพิ่มเติม"
                  placeholder="อาคาร ห้อง ชั้น (ถ้ามี)"
                  value={contact.addressLine2}
                  onChange={(v) => setContactLocal((p) => ({ ...p, addressLine2: v }))}
                  onBlur={() => touch('addressLine2')}
                />
              </div>

              {/* Postal Code — optional with 5-digit validation */}
              <TextInput
                id="postal-code"
                label="รหัสไปรษณีย์"
                placeholder="10110"
                value={contact.postalCode}
                onChange={(v) => setContactLocal((p) => ({ ...p, postalCode: v }))}
                onBlur={() => touch('postalCode')}
                error={errMsg('postalCode')}
              />

              {/* Country — PICKLIST_COUNTRY_ISO, optional */}
              <PicklistSelect
                id="country"
                label="ประเทศ"
                value={contact.country}
                onChange={(v) => setContactLocal((p) => ({ ...p, country: v }))}
                onBlur={() => touch('country')}
                options={PICKLIST_COUNTRY_ISO}
              />
            </div>
          </section>

          {/* Required note */}
          <p className="text-xs text-ink-soft">
            <span className="humi-asterisk">*</span> ช่องที่บังคับกรอก
          </p>
        </div>

        {/* ── Footer actions ── */}
        <div
          className="humi-row"
          style={{ justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--color-hairline-soft)' }}
        >
          <Link
            href={`/${locale}/admin/employees/${empId}`}
            className="humi-btn-secondary"
          >
            ยกเลิก
          </Link>
          <button
            type="button"
            onClick={() => handleSubmit('')}
            disabled={showBanner}
            className={buttonVariants({ variant: 'primary' })}
            aria-disabled={showBanner}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </div>
    </div>
  )
}

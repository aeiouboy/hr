// VALIDATION_EXEMPT: validation in Zustand humi-profile-slice + emergency/dependents/address editors (per design-gates Track C 2026-04-26)
'use client'

// ess/profile/edit/page.tsx — ESS Personal Information edit
// Layout aligned to SAP SuccessFactors reference: Effective Date bar on top,
// Personal Information block (SF 17 fields), Attachment dropzone, collapsible
// Global Information block, Address block, Emergency block, sticky footer.
//
// Submit: workflow-approvals store → SPD inbox (BRD #166).
// Name-change gate: requires ≥1 attachment before submit.

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, UploadCloud, FileText, X, CalendarDays } from 'lucide-react'
import { useProfileEdit } from '@/lib/admin/store/useProfileEdit'
import type { Attachment } from '@/stores/workflow-approvals'
import { Button } from '@/components/humi'
import { cn } from '@/lib/utils'
import mockEmployee from '@/data/admin/mockEmployee.json'

const ALLOWED_MIME = ['application/pdf', 'image/jpeg', 'image/png'] as const
const ALLOWED_EXT = '.pdf,.jpg,.jpeg,.png'
const MAX_MB = 5
const MAX_BYTES = MAX_MB * 1024 * 1024

async function fileToAttachment(
  file: File,
): Promise<{ ok: true; attachment: Attachment } | { ok: false; reason: string }> {
  if (!(ALLOWED_MIME as readonly string[]).includes(file.type)) {
    return { ok: false, reason: `ไฟล์ประเภท ${file.type || 'ไม่รู้จัก'} ไม่รองรับ — ใช้ PDF, JPG, หรือ PNG เท่านั้น` }
  }
  if (file.size > MAX_BYTES) {
    const mb = (file.size / 1024 / 1024).toFixed(1)
    return { ok: false, reason: `ไฟล์ขนาด ${mb} MB เกินกว่า ${MAX_MB} MB ที่อนุญาต` }
  }
  const reader = new FileReader()
  const dataUrl = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
  return {
    ok: true,
    attachment: { filename: file.name, mimeType: file.type, size: file.size, dataUrl },
  }
}

// ── UI primitives (lightweight, match SF form look) ─────────────────────────

function Label({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-ink-soft mb-1">
      {children}
      {required && <span className="ml-1 text-[color:var(--color-danger)]">*</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-md border border-hairline bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:bg-canvas-soft disabled:text-ink-muted'

// ── Page ────────────────────────────────────────────────────────────────────

export default function ProfileEditPage() {
  const router = useRouter()
  const { draft, baseline, isDirty, isSubmitting, setField, loadFromEmployee, submit } = useProfileEdit()
  const [toast, setToast] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [globalOpen, setGlobalOpen] = useState(true)
  const [effectiveDate, setEffectiveDate] = useState<string>(() => new Date().toISOString().slice(0, 10))
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load mock → draft on first mount
  useEffect(() => {
    if (!isDirty && draft.firstNameTh === '') {
      loadFromEmployee({
        salutationEn: mockEmployee.salutationEn,
        salutationLocal: mockEmployee.salutationLocal,
        otherTitleTh: mockEmployee.otherTitleTh,
        firstNameEn: mockEmployee.firstNameEn,
        middleNameEn: mockEmployee.middleNameEn,
        lastNameEn: mockEmployee.lastNameEn,
        firstNameTh: mockEmployee.firstNameTh,
        middleNameTh: mockEmployee.middleNameTh,
        lastNameTh: mockEmployee.lastNameTh,
        nickname: mockEmployee.nickname,
        dateOfBirth: mockEmployee.dateOfBirth,
        gender: mockEmployee.gender,
        maritalStatus: mockEmployee.maritalStatus,
        maritalStatusSince: mockEmployee.maritalStatusSince,
        nationality: mockEmployee.nationality,
        militaryStatus: mockEmployee.militaryStatus,
        bloodType: mockEmployee.bloodType,
        country: mockEmployee.country,
        religion: mockEmployee.religion,
        disabilityStatus: mockEmployee.disabilityStatus,
        addressHouseNo: mockEmployee.addressDetail.houseNo,
        addressMoo: mockEmployee.addressDetail.moo,
        addressSoi: mockEmployee.addressDetail.soi,
        addressRoad: mockEmployee.addressDetail.road,
        addressSubdistrict: mockEmployee.addressDetail.subdistrict,
        addressDistrict: mockEmployee.addressDetail.district,
        addressProvince: mockEmployee.addressDetail.province,
        addressPostalCode: mockEmployee.addressDetail.postalCode,
        emergencyContactName: mockEmployee.emergencyContact.name,
        emergencyContactPhone: mockEmployee.emergencyContact.phone,
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nameChanged = useMemo(
    () =>
      draft.firstNameTh !== baseline.firstNameTh ||
      draft.lastNameTh !== baseline.lastNameTh ||
      draft.middleNameTh !== baseline.middleNameTh ||
      draft.firstNameEn !== baseline.firstNameEn ||
      draft.middleNameEn !== baseline.middleNameEn ||
      draft.lastNameEn !== baseline.lastNameEn,
    [draft, baseline],
  )

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  async function ingestFiles(files: File[]) {
    setAttachmentError(null)
    const next: Attachment[] = []
    for (const f of files) {
      const r = await fileToAttachment(f)
      if (!r.ok) {
        setAttachmentError(r.reason)
        return
      }
      next.push(r.attachment)
    }
    setAttachments((prev) => [...prev, ...next])
  }

  function removeAttachment(i: number) {
    setAttachments((prev) => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (nameChanged && attachments.length === 0) {
      setAttachmentError('การเปลี่ยนชื่อ/นามสกุลต้องแนบเอกสารรับรอง')
      return
    }
    try {
      const id = await submit(attachments)
      if (!id) {
        showToast('ไม่มีการเปลี่ยนแปลงให้ส่ง — กรุณาแก้ไขข้อมูลก่อน')
        return
      }
      showToast('ส่งคำขอแก้ไขข้อมูลส่วนตัวแล้ว — รอ SPD อนุมัติ')
      setAttachments([])
      setTimeout(() => router.push('/ess/workflows'), 1500)
    } catch (err) {
      console.warn('[ProfileEditPage] submit error:', err)
      showToast('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <div className="pb-24" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 right-4 z-50 rounded-md bg-accent text-white px-4 py-3 text-sm shadow-lg"
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">แก้ไขข้อมูลส่วนตัว</h1>
        <p className="mt-1 text-sm text-ink-muted">
          การแก้ไขจะถูกส่งให้ SPD พิจารณาอนุมัติก่อนมีผลในระบบ (BRD #166)
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* ── Effective Date bar (SF mandatory top field) ────────────── */}
        <section className="humi-card" style={{ padding: 16 }}>
          <Label htmlFor="effective-date" required>
            <CalendarDays size={12} className="inline mr-1" aria-hidden />
            การเปลี่ยนแปลงนี้จะมีผลเมื่อไหร่?
          </Label>
          <input
            id="effective-date"
            type="date"
            required
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className={cn(inputCls, 'max-w-xs')}
          />
        </section>

        {/* ── Personal Information ───────────────────────────────────── */}
        <section className="humi-card" style={{ padding: 20 }}>
          <div className="humi-eyebrow mb-4">ข้อมูลส่วนตัว (Personal Information)</div>

          {/* Row 1: EN salutation + EN name trio + nickname */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <Label htmlFor="salutationEn" required>Salutation (EN)</Label>
              <select
                id="salutationEn"
                required
                value={draft.salutationEn}
                onChange={(e) => setField('salutationEn', e.target.value)}
                className={inputCls}
              >
                <option value="">— เลือก —</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Miss">Miss</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div>
              <Label htmlFor="firstNameEn" required>Firstname (EN)</Label>
              <input
                id="firstNameEn"
                type="text"
                required
                value={draft.firstNameEn}
                onChange={(e) => setField('firstNameEn', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="middleNameEn">Middle Name (EN)</Label>
              <input
                id="middleNameEn"
                type="text"
                value={draft.middleNameEn}
                onChange={(e) => setField('middleNameEn', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="lastNameEn" required>Lastname (EN)</Label>
              <input
                id="lastNameEn"
                type="text"
                required
                value={draft.lastNameEn}
                onChange={(e) => setField('lastNameEn', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="nickname">Nickname (EN/TH)</Label>
              <input
                id="nickname"
                type="text"
                value={draft.nickname}
                onChange={(e) => setField('nickname', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 2: Local salutation + Other Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <Label htmlFor="salutationLocal" required>Salutation (Local)</Label>
              <select
                id="salutationLocal"
                required
                value={draft.salutationLocal}
                onChange={(e) => setField('salutationLocal', e.target.value)}
                className={inputCls}
              >
                <option value="">— เลือก —</option>
                <option value="นาย">นาย</option>
                <option value="นาง">นาง</option>
                <option value="นางสาว">นางสาว</option>
                <option value="ดร.">ดร.</option>
              </select>
            </div>
            <div>
              <Label htmlFor="otherTitleTh">Other Title (TH)</Label>
              <select
                id="otherTitleTh"
                value={draft.otherTitleTh}
                onChange={(e) => setField('otherTitleTh', e.target.value)}
                className={inputCls}
              >
                <option value="">No Selection</option>
                <option value="ร้อยเอก">ร้อยเอก</option>
                <option value="พ.ต.ท.">พ.ต.ท.</option>
                <option value="ศ.ดร.">ศ.ดร.</option>
              </select>
            </div>
          </div>

          {/* Row 3: Local name trio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="firstNameTh" required>Firstname (Local)</Label>
              <input
                id="firstNameTh"
                type="text"
                required
                value={draft.firstNameTh}
                onChange={(e) => setField('firstNameTh', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="middleNameTh">Middle Name (Local)</Label>
              <input
                id="middleNameTh"
                type="text"
                value={draft.middleNameTh}
                onChange={(e) => setField('middleNameTh', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="lastNameTh" required>Lastname (Local)</Label>
              <input
                id="lastNameTh"
                type="text"
                required
                value={draft.lastNameTh}
                onChange={(e) => setField('lastNameTh', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 4: Gender (RO) + Marital Status + Since */}
          {/* BRD #166: bilingual labels (Thai-primary) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="gender">เพศ (Gender)</Label>
              <input
                id="gender"
                type="text"
                disabled
                value={draft.gender}
                className={inputCls}
              />
            </div>
            <div>
              <Label htmlFor="maritalStatus">สถานภาพสมรส (Marital Status)</Label>
              <select
                id="maritalStatus"
                value={draft.maritalStatus}
                onChange={(e) => setField('maritalStatus', e.target.value)}
                className={inputCls}
              >
                <option value="Single">โสด (Single)</option>
                <option value="Married">สมรส (Married)</option>
                <option value="Divorced">หย่า (Divorced)</option>
                <option value="Widowed">หม้าย (Widowed)</option>
                <option value="Engaged">หมั้น (Engaged)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="maritalStatusSince">สถานภาพสมรสตั้งแต่ (Marital Status Since)</Label>
              <input
                id="maritalStatusSince"
                type="date"
                value={draft.maritalStatusSince}
                onChange={(e) => setField('maritalStatusSince', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Row 5: Nationality (editable via approval workflow) + Military */}
          {/* BRD #166: remove disabled from nationality — routes through useProfileEdit.submit() → workflow-approvals store → SPD inbox */}
          {/* SF cite: sf-extract/qas-fields-2026-04-26/sf-qas-PerPersonal-2026-04-26.json .d.results[0].nationality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="nationality" required>สัญชาติ (Nationality)</Label>
              <select
                id="nationality"
                value={draft.nationality}
                onChange={(e) => setField('nationality', e.target.value)}
                className={inputCls}
              >
                <option value="">— เลือก —</option>
                <option value="Thai">ไทย (Thai)</option>
                <option value="Lao">ลาว (Lao)</option>
                <option value="Myanmar">พม่า (Myanmar)</option>
                <option value="Vietnam">เวียดนาม (Vietnam)</option>
                <option value="Cambodia">กัมพูชา (Cambodia)</option>
                <option value="Malaysia">มาเลเซีย (Malaysia)</option>
                <option value="Other">อื่นๆ (Other)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="militaryStatus">สถานะทหาร (Military Status)</Label>
              <select
                id="militaryStatus"
                value={draft.militaryStatus}
                onChange={(e) => setField('militaryStatus', e.target.value)}
                className={inputCls}
              >
                <option value="">— เลือก —</option>
                <option value="Completed">ผ่านแล้ว (Completed)</option>
                <option value="Exempted">ยกเว้น (Exempted)</option>
                <option value="Studying RTC">รด. (Studying RTC)</option>
                <option value="Pending">รอคิว (Pending)</option>
                <option value="N/A">ไม่เกี่ยวข้อง (N/A)</option>
              </select>
            </div>
          </div>

          {/* Row 6: Blood type (RO) + Religion */}
          {/* BRD #166: bilingual labels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bloodType">หมู่เลือด (Blood Type)</Label>
              <input
                id="bloodType"
                type="text"
                disabled
                value={draft.bloodType}
                className={inputCls}
              />
            </div>
          </div>
        </section>

        {/* ── Attachment ─────────────────────────────────────────────── */}
        <section
          className={cn(
            'humi-card transition-colors',
            nameChanged && 'border-amber-300',
          )}
          style={{ padding: 20 }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <div className="humi-eyebrow mb-1">
                เอกสารแนบ (Attachment)
                {nameChanged && (
                  <span className="ml-2 text-xs font-semibold text-amber-700 normal-case">
                    · จำเป็นเมื่อเปลี่ยนชื่อ
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted">
                {nameChanged
                  ? 'เอกสารที่ยอมรับ: ใบเปลี่ยนชื่อ · ทะเบียนสมรส · หนังสือรับรองชื่อจากเขต/อำเภอ'
                  : 'แนบเอกสารประกอบการพิจารณา (ถ้ามี) — PDF, JPG, PNG'}
              </p>
            </div>
          </div>

          {attachments.length === 0 ? (
            /* SF-style empty state — big centered icon + placeholder text */
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
              onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragOver(false)
                void ingestFiles(Array.from(e.dataTransfer.files))
              }}
              className={cn(
                'flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer',
                'border border-dashed py-12',
                'transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                nameChanged
                  ? isDragOver
                    ? 'border-amber-500 bg-amber-50 focus-visible:ring-amber-400'
                    : 'border-amber-300 hover:bg-amber-50/40 focus-visible:ring-amber-400'
                  : isDragOver
                    ? 'border-accent bg-accent-soft/30 focus-visible:ring-accent'
                    : 'border-hairline hover:bg-canvas-soft focus-visible:ring-accent',
              )}
            >
              <FileText size={48} strokeWidth={1.25} className={nameChanged ? 'text-amber-400' : 'text-ink-faint'} aria-hidden />
              <p className="text-base font-medium text-ink">
                {isDragOver ? 'วางไฟล์ได้เลย' : 'ยังไม่มีเอกสารแนบ'}
              </p>
              <p className="text-sm text-ink-muted">
                ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์ · สูงสุด {MAX_MB} MB
              </p>
            </div>
          ) : (
            /* Populated list */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <ul className="flex flex-col gap-2" aria-label="ไฟล์ที่อัปโหลดแล้ว">
                {attachments.map((a, i) => (
                  <li
                    key={`${a.filename}-${i}`}
                    className="flex items-center gap-3 rounded-md border border-hairline bg-surface px-3 py-2"
                  >
                    <FileText size={16} className="text-ink-muted shrink-0" aria-hidden />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-ink truncate" title={a.filename}>
                        {a.filename}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        {(a.size / 1024).toFixed(0)} KB
                      </span>
                    </span>
                    <button
                      type="button"
                      aria-label={`ลบ ${a.filename}`}
                      onClick={() => removeAttachment(i)}
                      className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-canvas-soft hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <X size={14} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud size={14} aria-hidden />
                เพิ่มเอกสารอีก
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={ALLOWED_EXT}
            multiple
            className="sr-only"
            onChange={(e) => {
              void ingestFiles(Array.from(e.target.files ?? []))
              e.target.value = ''
            }}
          />

          {attachmentError && (
            <p role="alert" className="mt-2 text-xs font-medium text-[color:var(--color-danger-ink)]">
              {attachmentError}
            </p>
          )}
        </section>

        {/* ── Global Information (collapsible) ───────────────────────── */}
        <section className="humi-card" style={{ padding: 0, overflow: 'hidden' }}>
          <button
            type="button"
            onClick={() => setGlobalOpen((o) => !o)}
            aria-expanded={globalOpen}
            className="flex items-center gap-2 w-full px-5 py-4 text-left hover:bg-canvas-soft/50 transition-colors"
          >
            <ChevronDown
              size={16}
              className={cn('text-ink-muted transition-transform', !globalOpen && '-rotate-90')}
              aria-hidden
            />
            <span className="text-sm font-semibold text-ink">ข้อมูลเพิ่มเติม (Global Information)</span>
          </button>
          {globalOpen && (
            <div className="px-5 pb-5 border-t border-hairline-soft">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {/* BRD #166: bilingual labels for Global Information block */}
                <div>
                  <Label htmlFor="country" required>ประเทศ (Country/Region)</Label>
                  <select
                    id="country"
                    required
                    value={draft.country}
                    onChange={(e) => setField('country', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">— เลือก —</option>
                    <option value="Thailand">ไทย (Thailand)</option>
                    <option value="Vietnam">เวียดนาม (Vietnam)</option>
                    <option value="Malaysia">มาเลเซีย (Malaysia)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="religion">ศาสนา (Religion)</Label>
                  <input
                    id="religion"
                    type="text"
                    value={draft.religion}
                    onChange={(e) => setField('religion', e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  {/* BRD #166: bilingual label; SF cite: PerPersonal.customString9 */}
                  <Label htmlFor="disabilityStatus">ความพิการ (Disability Status)</Label>
                  <select
                    id="disabilityStatus"
                    value={draft.disabilityStatus}
                    onChange={(e) => setField('disabilityStatus', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">— ไม่ระบุ —</option>
                    <option value="None">ไม่มี (None)</option>
                    <option value="Physical">ทางกาย (Physical)</option>
                    <option value="Visual">ทางสายตา (Visual)</option>
                    <option value="Hearing">ทางการได้ยิน (Hearing)</option>
                    <option value="Cognitive">ทางสติปัญญา (Cognitive)</option>
                    <option value="Other">อื่นๆ (Other)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Address ────────────────────────────────────────────────── */}
        <section className="humi-card" style={{ padding: 20 }}>
          <div className="humi-eyebrow mb-4">ที่อยู่ปัจจุบัน (Current Address)</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="addressHouseNo" required>บ้านเลขที่</Label>
              <input id="addressHouseNo" type="text" required value={draft.addressHouseNo} onChange={(e) => setField('addressHouseNo', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressMoo">หมู่</Label>
              <input id="addressMoo" type="text" value={draft.addressMoo} onChange={(e) => setField('addressMoo', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressSoi">ซอย</Label>
              <input id="addressSoi" type="text" value={draft.addressSoi} onChange={(e) => setField('addressSoi', e.target.value)} className={inputCls} />
            </div>
            <div className="col-span-2 sm:col-span-3">
              <Label htmlFor="addressRoad">ถนน</Label>
              <input id="addressRoad" type="text" value={draft.addressRoad} onChange={(e) => setField('addressRoad', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressSubdistrict" required>ตำบล/แขวง</Label>
              <input id="addressSubdistrict" type="text" required value={draft.addressSubdistrict} onChange={(e) => setField('addressSubdistrict', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressDistrict" required>อำเภอ/เขต</Label>
              <input id="addressDistrict" type="text" required value={draft.addressDistrict} onChange={(e) => setField('addressDistrict', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressProvince" required>จังหวัด</Label>
              <input id="addressProvince" type="text" required value={draft.addressProvince} onChange={(e) => setField('addressProvince', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="addressPostalCode" required>รหัสไปรษณีย์</Label>
              <input id="addressPostalCode" type="text" required inputMode="numeric" pattern="[0-9]{5}" value={draft.addressPostalCode} onChange={(e) => setField('addressPostalCode', e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        {/* ── Emergency ──────────────────────────────────────────────── */}
        <section className="humi-card" style={{ padding: 20 }}>
          <div className="humi-eyebrow mb-4">ผู้ติดต่อฉุกเฉิน (Emergency Contact)</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContactName" required>ชื่อ-นามสกุล</Label>
              <input id="emergencyContactName" type="text" required value={draft.emergencyContactName} onChange={(e) => setField('emergencyContactName', e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label htmlFor="emergencyContactPhone" required>เบอร์โทรศัพท์</Label>
              <input id="emergencyContactPhone" type="tel" required value={draft.emergencyContactPhone} onChange={(e) => setField('emergencyContactPhone', e.target.value)} className={inputCls} />
            </div>
          </div>
        </section>

        {/* National ID — readonly */}
        <section className="humi-card humi-card--cream" style={{ padding: 20 }}>
          <div className="humi-eyebrow mb-1">
            เลขบัตรประชาชน (National ID)
            <span className="ml-2 text-xs font-normal text-ink-muted normal-case">แก้ไขไม่ได้ — ติดต่อ HR</span>
          </div>
          <p className="text-sm text-ink font-mono">
            {mockEmployee.nationalId.replace(/(\d)(\d{4})(\d{5})(\d{2})(\d)/, '$1-$2-$3-$4-$5')}
          </p>
        </section>

        {/* ── Sticky footer ──────────────────────────────────────────── */}
        <div
          className="humi-card"
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            padding: '12px 20px',
            display: 'flex',
            gap: 12,
            justifyContent: 'flex-end',
            alignItems: 'center',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <Button
            type="button"
            variant="ghost"
            onClick={() => showToast('บันทึกร่างแล้ว')}
            disabled={isSubmitting}
          >
            บันทึกร่าง
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || (nameChanged && attachments.length === 0)}
            title={
              nameChanged && attachments.length === 0
                ? 'กรุณาแนบเอกสารรับรองการเปลี่ยนชื่อ'
                : undefined
            }
          >
            {isSubmitting ? 'กำลังส่ง...' : 'ส่งเพื่ออนุมัติ'}
          </Button>
        </div>
      </form>
    </div>
  )
}

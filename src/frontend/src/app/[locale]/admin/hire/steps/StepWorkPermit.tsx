'use client'

// StepWorkPermit.tsx — Phase 5b-3: EmpWorkPermit SF entity
// 8 BA fields: Document Type, Country, Document Number, Issue Date,
// Expiry Date, Arrival Date (VISA), 90-day Report (VISA), Attachment
// Conditional UI: only rendered when nationality !== TH (foreigner)
// Required fields: documentType, country, documentNumber, issueDate

import { useState, useEffect, useCallback } from 'react'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'
import { workPermitEntrySchema } from '@/lib/admin/validation/hireSchema'
import { PICKLIST_COUNTRY_ISO } from '@hrms/shared/picklists'
import {
  AttachmentDropzone,
  type AttachedFile,
} from '@/components/admin/AttachmentDropzone/AttachmentDropzone'
import {
  attachmentNameFromFiles,
  filesFromAttachmentName,
} from '@/components/admin/AttachmentDropzone/attachmentFiles'
import { isForeignNationality } from '@/lib/admin/hire/conditional-sections'

// Work permit document type options (SF EmpWorkPermit.documentType picklist codes)
const DOCUMENT_TYPE_OPTIONS = [
  { id: 'WORK_PERMIT',   labelTh: 'ใบอนุญาตทำงาน (Work Permit)',  labelEn: 'Work Permit' },
  { id: 'VISA',          labelTh: 'วีซ่า (Visa)',                   labelEn: 'Visa' },
  { id: 'PASSPORT_VISA', labelTh: 'วีซ่าหนังสือเดินทาง',           labelEn: 'Passport Visa' },
] as const

export interface StepWorkPermitProps {
  onValidChange?: (isValid: boolean) => void
}

type FieldErrors = {
  documentType?: string
  country?: string
  documentNumber?: string
  issueDate?: string
}

type TouchedState = {
  documentType: boolean
  country: boolean
  documentNumber: boolean
  issueDate: boolean
  expiryDate: boolean
  arrivalDateVisa: boolean
  ninetyDayReportVisa: boolean
  attachmentName: boolean
}

export default function StepWorkPermit({ onValidChange }: StepWorkPermitProps) {
  const { formData, setStepData, setStepValidity } = useHireWizard()
  const wp = formData.workPermit
  const nationality = formData.biographical?.nationality ?? ''

  // Foreigner check — nationality ISO2 'TH' or ISO3 'THA' → Thai national
  const isForeigner = isForeignNationality(nationality)

  // ── Local field state ──────────────────────────────────────────────────────
  const [documentType,        setDocumentType]        = useState(wp.documentType ?? '')
  const [country,             setCountry]             = useState(wp.country ?? '')
  const [documentNumber,      setDocumentNumber]      = useState(wp.documentNumber ?? '')
  const [issueDate,           setIssueDate]           = useState(wp.issueDate ?? '')
  const [expiryDate,          setExpiryDate]          = useState(wp.expiryDate ?? '')
  const [arrivalDateVisa,     setArrivalDateVisa]     = useState(wp.arrivalDateVisa ?? '')
  const [ninetyDayReportVisa, setNinetyDayReportVisa] = useState(wp.ninetyDayReportVisa ?? '')
  const [attachmentName,      setAttachmentName]      = useState(wp.attachmentName ?? '')
  const [attachmentFiles,     setAttachmentFiles]     = useState<AttachedFile[]>(
    () => filesFromAttachmentName(wp.attachmentName ?? ''),
  )

  const [touched, setTouched] = useState<TouchedState>({
    documentType: false, country: false, documentNumber: false,
    issueDate: false, expiryDate: false, arrivalDateVisa: false,
    ninetyDayReportVisa: false, attachmentName: false,
  })
  const [errors, setErrors] = useState<FieldErrors>({})

  const touch = (field: keyof TouchedState) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // ── Validate + sync store ─────────────────────────────────────────────────
  const validate = useCallback(() => {
    // When not a foreigner, section is not required — always valid
    if (!isForeigner) {
      setErrors({})
      setStepValidity('workPermit', true)
      onValidChange?.(true)
      return
    }

    const result = workPermitEntrySchema.safeParse({
      documentType:        documentType        || undefined,
      country:             country             || undefined,
      documentNumber:      documentNumber      || undefined,
      issueDate:           issueDate           || null,
      expiryDate:          expiryDate          || null,
      arrivalDateVisa:     arrivalDateVisa     || null,
      ninetyDayReportVisa: ninetyDayReportVisa || null,
      attachmentName:      attachmentName,
    })

    // For foreigner, required fields are documentType, country, documentNumber, issueDate
    const allRequiredFilled = !!(
      documentType.trim() && country.trim() && documentNumber.trim() && issueDate
    )

    if (result.success) {
      setErrors({})
      setStepData('workPermit', {
        documentType,
        country,
        documentNumber,
        issueDate:           issueDate           || null,
        expiryDate:          expiryDate          || null,
        arrivalDateVisa:     arrivalDateVisa     || null,
        ninetyDayReportVisa: ninetyDayReportVisa || null,
        attachmentName,
      })
      setStepValidity('workPermit', allRequiredFilled)
      onValidChange?.(allRequiredFilled)
    } else {
      // Show field-level errors but only block if required fields missing
      const fe: FieldErrors = {}
      for (const issue of result.error.issues) {
        const f = issue.path[0] as keyof FieldErrors
        if (!fe[f]) fe[f] = issue.message
      }
      setErrors(fe)
      setStepValidity('workPermit', allRequiredFilled)
      onValidChange?.(allRequiredFilled)
    }
  }, [
    isForeigner, documentType, country, documentNumber, issueDate,
    expiryDate, arrivalDateVisa, ninetyDayReportVisa, attachmentName,
    setStepData, setStepValidity, onValidChange,
  ])

  useEffect(() => { validate() }, [validate])

  // ── Not a foreigner — skip rendering ──────────────────────────────────────
  if (!isForeigner) {
    return (
      <p className="text-sm text-ink-soft py-2">
        ไม่จำเป็นต้องใช้ใบอนุญาตทำงาน (สัญชาติไทย)
      </p>
    )
  }

  const errMsg = (field: keyof FieldErrors) => {
    if (!touched[field as keyof TouchedState] || !errors[field]) return null
    return <p role="alert" className="mt-1 text-small text-warning">{errors[field]}</p>
  }

  const isVisa = documentType === 'VISA' || documentType === 'PASSPORT_VISA'

  function handleAttachmentFilesChange(files: AttachedFile[]) {
    setAttachmentFiles(files)
    setAttachmentName(attachmentNameFromFiles(files))
    touch('attachmentName')
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">

      {/* ─── Document Type * ─── */}
      <fieldset>
        <label htmlFor="wp-document-type" className="humi-label">
          ประเภทเอกสาร (Document Type)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="wp-document-type" required aria-required="true"
          aria-invalid={touched.documentType && !!errors.documentType}
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          onBlur={() => touch('documentType')}
          className="humi-select w-full">
          <option value="">-- เลือกประเภทเอกสาร --</option>
          {DOCUMENT_TYPE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.labelTh}</option>
          ))}
        </select>
        {errMsg('documentType')}
      </fieldset>

      {/* ─── Country * ─── */}
      <fieldset>
        <label htmlFor="wp-country" className="humi-label">
          ประเทศ (Country)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <select id="wp-country" required aria-required="true"
          aria-invalid={touched.country && !!errors.country}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          onBlur={() => touch('country')}
          className="humi-select w-full">
          <option value="">-- เลือกประเทศ --</option>
          {PICKLIST_COUNTRY_ISO.filter((c) => c.active).map((c) => (
            <option key={c.id} value={c.id}>{c.labelTh}</option>
          ))}
        </select>
        {errMsg('country')}
      </fieldset>

      {/* ─── Document Number * ─── */}
      <fieldset>
        <label htmlFor="wp-document-number" className="humi-label">
          เลขที่เอกสาร (Document Number)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="wp-document-number" type="text" required aria-required="true"
          aria-invalid={touched.documentNumber && !!errors.documentNumber}
          placeholder="เลขที่ใบอนุญาต / เลขวีซ่า"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          onBlur={() => touch('documentNumber')}
          className="humi-input w-full" />
        {errMsg('documentNumber')}
      </fieldset>

      {/* ─── Issue Date * ─── */}
      <fieldset>
        <label htmlFor="wp-issue-date" className="humi-label">
          วันที่ออก (Issue Date)<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </label>
        <input id="wp-issue-date" type="date" required aria-required="true"
          aria-invalid={touched.issueDate && !!errors.issueDate}
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          onBlur={() => touch('issueDate')}
          className="humi-input w-full" />
        {errMsg('issueDate')}
      </fieldset>

      {/* ─── Expiry Date (optional) ─── */}
      <fieldset>
        <label htmlFor="wp-expiry-date" className="humi-label">
          วันหมดอายุ (Expiry Date)
        </label>
        <input id="wp-expiry-date" type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          onBlur={() => touch('expiryDate')}
          className="humi-input w-full" />
      </fieldset>

      {/* ─── Arrival Date VISA (conditional on VISA/PASSPORT_VISA) ─── */}
      {isVisa && (
        <fieldset>
          <label htmlFor="wp-arrival-date-visa" className="humi-label">
            วันที่เดินทางเข้าประเทศ (Arrival Date)
          </label>
          <input id="wp-arrival-date-visa" type="date"
            value={arrivalDateVisa}
            onChange={(e) => setArrivalDateVisa(e.target.value)}
            onBlur={() => touch('arrivalDateVisa')}
            className="humi-input w-full" />
        </fieldset>
      )}

      {/* ─── 90-day Report (conditional on VISA/PASSPORT_VISA) ─── */}
      {isVisa && (
        <fieldset>
          <label htmlFor="wp-ninety-day-report" className="humi-label">
            วันรายงานตัว 90 วัน (90-day Report)
          </label>
          <input id="wp-ninety-day-report" type="date"
            value={ninetyDayReportVisa}
            onChange={(e) => setNinetyDayReportVisa(e.target.value)}
            onBlur={() => touch('ninetyDayReportVisa')}
            className="humi-input w-full" />
        </fieldset>
      )}

      {/* ─── Attachment (mock upload; filename tracked for SF payload handoff) ─── */}
      <fieldset className="md:col-span-2">
        <AttachmentDropzone
          id="wp-attachment-files"
          files={attachmentFiles}
          onFilesChange={handleAttachmentFilesChange}
          label="ไฟล์แนบ (Attachment)"
          maxFiles={5}
          maxSizeMB={10}
        />
      </fieldset>

    </div>
  )
}

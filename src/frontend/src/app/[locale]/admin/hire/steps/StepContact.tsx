'use client'

// StepContact.tsx — A2 Multi-value Contact
// BA: Contact Information (phones[] + emails[]) + Job Relationships table
// rendered inside ClusterWho (Cluster 1 "Who")

import { useHireWizard, PhoneEntry, EmailEntry, JobRelationship } from '@/lib/admin/store/useHireWizard'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PHONE_TYPE_LABELS: Record<PhoneEntry['type'], string> = {
  mobile: 'มือถือ',
  office: 'ที่ทำงาน',
  home:   'ที่บ้าน',
}

const EMAIL_TYPE_LABELS: Record<EmailEntry['type'], string> = {
  personal: 'ส่วนตัว',
  work:     'ที่ทำงาน',
}

export default function StepContact() {
  const { formData, setStepData } = useHireWizard()
  // Defensive destructure — drafts persisted before the Area A2 schema bump
  // may have no `contact` slice (StepContact crashed with "Cannot destructure
  // property 'phones' of 'e.contact' as it is undefined" on fresh navigation
  // while Zustand rehydrated the old shape). Belt-and-braces with the
  // `migrate` callback in useHireWizard persist config.
  const {
    phones = [],
    emails = [],
    jobRelationships = [],
  } = formData.contact ?? {}

  // ── Phone helpers ──────────────────────────────────────────────────────────
  function setPhones(next: PhoneEntry[]) {
    setStepData('contact', { phones: next })
  }

  function addPhone() {
    if (phones.length >= 5) return
    setPhones([...phones, { type: 'mobile', value: '', isPrimary: false }])
  }

  function removePhone(idx: number) {
    if (phones.length <= 1) return
    setPhones(phones.filter((_, i) => i !== idx))
  }

  function updatePhone(idx: number, patch: Partial<PhoneEntry>) {
    setPhones(phones.map((p, i) => (i === idx ? { ...p, ...patch } : p)))
  }

  function setPrimaryPhone(idx: number) {
    setPhones(phones.map((p, i) => ({ ...p, isPrimary: i === idx })))
  }

  // ── Email helpers ──────────────────────────────────────────────────────────
  function setEmails(next: EmailEntry[]) {
    setStepData('contact', { emails: next })
  }

  function addEmail() {
    if (emails.length >= 5) return
    setEmails([...emails, { type: 'personal', value: '', isPrimary: false }])
  }

  function removeEmail(idx: number) {
    if (emails.length <= 1) return
    setEmails(emails.filter((_, i) => i !== idx))
  }

  function updateEmail(idx: number, patch: Partial<EmailEntry>) {
    setEmails(emails.map((e, i) => (i === idx ? { ...e, ...patch } : e)))
  }

  function setPrimaryEmail(idx: number) {
    setEmails(emails.map((e, i) => ({ ...e, isPrimary: i === idx })))
  }

  // ── Job Relationship helpers ───────────────────────────────────────────────
  function setRelationships(next: JobRelationship[]) {
    setStepData('contact', { jobRelationships: next })
  }

  function addRelationship() {
    setRelationships([...jobRelationships, { relationshipType: '', name: '' }])
  }

  function removeRelationship(idx: number) {
    setRelationships(jobRelationships.filter((_, i) => i !== idx))
  }

  function updateRelationship(idx: number, patch: Partial<JobRelationship>) {
    setRelationships(jobRelationships.map((r, i) => (i === idx ? { ...r, ...patch } : r)))
  }

  return (
    <div className="space-y-8">

      {/* ─── เบอร์ติดต่อ ──────────────────────────────────────────────────── */}
      <section aria-label="เบอร์ติดต่อ">
        <p className="humi-label mb-3">
          เบอร์ติดต่อ<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>

        <div className="space-y-3">
          {phones.map((phone, idx) => (
            <div key={idx} className="flex flex-wrap items-start gap-2">
              {/* ประเภท */}
              <select
                aria-label={`ประเภทเบอร์โทร ${idx + 1}`}
                value={phone.type}
                onChange={(e) => updatePhone(idx, { type: e.target.value as PhoneEntry['type'] })}
                className="humi-select w-32 shrink-0"
              >
                {(Object.keys(PHONE_TYPE_LABELS) as PhoneEntry['type'][]).map((t) => (
                  <option key={t} value={t}>{PHONE_TYPE_LABELS[t]}</option>
                ))}
              </select>

              {/* เบอร์ */}
              <input
                type="tel"
                aria-label={`เบอร์โทร ${idx + 1}`}
                aria-invalid={phone.value.trim() === '' ? 'true' : 'false'}
                placeholder="0XX-XXX-XXXX"
                value={phone.value}
                onChange={(e) => updatePhone(idx, { value: e.target.value })}
                className="humi-input min-w-0 flex-1"
              />

              {/* หลัก */}
              <label className="flex items-center gap-1.5 text-sm text-ink-soft whitespace-nowrap pt-2.5">
                <input
                  type="checkbox"
                  checked={phone.isPrimary}
                  onChange={() => setPrimaryPhone(idx)}
                  className="rounded"
                />
                หลัก
              </label>

              {/* ลบ */}
              <button
                type="button"
                aria-label={`ลบเบอร์โทร ${idx + 1}`}
                disabled={phones.length <= 1}
                onClick={() => removePhone(idx)}
                className="rounded px-2 py-1.5 text-sm text-warning hover:bg-warning/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled={phones.length >= 5}
          onClick={addPhone}
          className="mt-3 text-sm text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-40"
        >
          + เพิ่มเบอร์โทร
        </button>
      </section>

      {/* ─── อีเมล ────────────────────────────────────────────────────────── */}
      <section aria-label="อีเมล">
        <p className="humi-label mb-3">
          อีเมล<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>

        <div className="space-y-3">
          {emails.map((email, idx) => {
            const invalid = email.value.trim() !== '' && !EMAIL_RE.test(email.value.trim())
            return (
              <div key={idx} className="flex flex-wrap items-start gap-2">
                {/* ประเภท */}
                <select
                  aria-label={`ประเภทอีเมล ${idx + 1}`}
                  value={email.type}
                  onChange={(e) => updateEmail(idx, { type: e.target.value as EmailEntry['type'] })}
                  className="humi-select w-32 shrink-0"
                >
                  {(Object.keys(EMAIL_TYPE_LABELS) as EmailEntry['type'][]).map((t) => (
                    <option key={t} value={t}>{EMAIL_TYPE_LABELS[t]}</option>
                  ))}
                </select>

                {/* อีเมล */}
                <input
                  type="email"
                  aria-label={`อีเมล ${idx + 1}`}
                  aria-invalid={invalid ? 'true' : 'false'}
                  placeholder="example@email.com"
                  value={email.value}
                  onChange={(e) => updateEmail(idx, { value: e.target.value })}
                  className="humi-input min-w-0 flex-1"
                />

                {/* หลัก */}
                <label className="flex items-center gap-1.5 text-sm text-ink-soft whitespace-nowrap pt-2.5">
                  <input
                    type="checkbox"
                    checked={email.isPrimary}
                    onChange={() => setPrimaryEmail(idx)}
                    className="rounded"
                  />
                  หลัก
                </label>

                {/* ลบ */}
                <button
                  type="button"
                  aria-label={`ลบอีเมล ${idx + 1}`}
                  disabled={emails.length <= 1}
                  onClick={() => removeEmail(idx)}
                  className="rounded px-2 py-1.5 text-sm text-warning hover:bg-warning/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ลบ
                </button>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          disabled={emails.length >= 5}
          onClick={addEmail}
          className="mt-3 text-sm text-accent hover:underline disabled:cursor-not-allowed disabled:opacity-40"
        >
          + เพิ่มอีเมล
        </button>
      </section>

      {/* ─── บุคคลที่เกี่ยวข้อง ───────────────────────────────────────────── */}
      <section aria-label="บุคคลที่เกี่ยวข้อง">
        <p className="humi-label mb-3">บุคคลที่เกี่ยวข้อง</p>

        {jobRelationships.length > 0 && (
          <table className="mb-3 w-full text-sm">
            <thead>
              <tr className="border-b border-hairline-soft text-left text-ink-soft">
                <th className="pb-2 pr-4 font-medium">ประเภทความสัมพันธ์</th>
                <th className="pb-2 pr-4 font-medium">ชื่อ</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {jobRelationships.map((rel, idx) => (
                <tr key={idx} className="border-b border-hairline-soft/50">
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      aria-label={`ประเภทความสัมพันธ์ ${idx + 1}`}
                      placeholder="เช่น ผู้จัดการ / หัวหน้างาน"
                      value={rel.relationshipType}
                      onChange={(e) => updateRelationship(idx, { relationshipType: e.target.value })}
                      className="humi-input w-full"
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      aria-label={`ชื่อบุคคลที่เกี่ยวข้อง ${idx + 1}`}
                      placeholder="ชื่อ-นามสกุล"
                      value={rel.name}
                      onChange={(e) => updateRelationship(idx, { name: e.target.value })}
                      className="humi-input w-full"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      aria-label={`ลบบุคคลที่เกี่ยวข้อง ${idx + 1}`}
                      onClick={() => removeRelationship(idx)}
                      className="rounded px-2 py-1 text-xs text-warning hover:bg-warning/10"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          type="button"
          onClick={addRelationship}
          className="text-sm text-accent hover:underline"
        >
          + เพิ่ม
        </button>
      </section>

    </div>
  )
}

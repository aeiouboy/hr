'use client'

// StepContact.tsx — A2 Multi-value Contact
// Wave 2-A: BRD #15 email (SF ecEmailType, no 5-cap), #16 phone (countryCode + extension),
//           BRD #17 8-field Thai address (PerAddressDEFLT)
// Picklist source: SF cite in code comments

import { useHireWizard, type EmailEntry, type JobRelationship } from '@/lib/admin/store/useHireWizard'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// BRD #15: SF ecEmailType picklist codes
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json (ecEmailType)
// P = Personal, B = Business/Work
const EMAIL_TYPE_LABELS: Record<string, string> = {
  P:        'ส่วนตัว (Personal)',
  B:        'ที่ทำงาน (Business)',
  personal: 'ส่วนตัว',   // legacy compat
  work:     'ที่ทำงาน',  // legacy compat
}

// BRD #16: SF ecPhoneType picklist codes
// SF cite: qas-fields-2026-04-25/sf-qas-picklist-options-LINKED-2026-04-26.json (ecPhoneType)
// BI=Business IP, B=Business, H=Home, F=Fax, C=Cell/Mobile
const PHONE_TYPE_LABELS: Record<string, string> = {
  C:      'มือถือ (Cell)',
  B:      'ที่ทำงาน (Business)',
  H:      'ที่บ้าน (Home)',
  F:      'แฟกซ์ (Fax)',
  BI:     'IP ที่ทำงาน (Business IP)',
  mobile: 'มือถือ',  // legacy compat
  office: 'ที่ทำงาน', // legacy compat
  home:   'ที่บ้าน',  // legacy compat
}

const SF_PHONE_TYPES = ['C', 'B', 'H', 'F', 'BI'] as const
const SF_EMAIL_TYPES = ['P', 'B'] as const

// BRD #17: Thai address type — inline rather than reusing Address8Editor
// Address8 type uses postalCode + road; SF PerAddressDEFLT needs zipCode + moo (address11).
// Field-shape mismatch prevents safe reuse without modifying the shared Address8 type,
// which risks cross-Wave merge conflicts with the active Wave 2-D profile agent.
// SF cite: qas-fields-2026-04-26/sf-qas-PerAddressDEFLT-2026-04-26.json#.d.results[0]
interface ThaiAddress {
  houseNo:     string  // SF address5
  village:     string  // SF address4
  moo:         string  // SF address11
  soi:         string  // SF address7
  subdistrict: string  // SF address12
  district:    string  // SF city
  province:    string  // SF state
  zipCode:     string  // SF zipCode
  country:     string  // SF country (default THA)
}

const EMPTY_ADDRESS: ThaiAddress = {
  houseNo: '', village: '', moo: '', soi: '',
  subdistrict: '', district: '', province: '',
  zipCode: '', country: 'THA',
}

// Extended PhoneEntry with countryCode + extension (BRD #16)
// type is widened to string to accept both legacy ('mobile'|'office'|'home') and SF codes ('C'|'B'|'H'|'F'|'BI')
interface ExtendedPhoneEntry {
  type: string
  value: string
  isPrimary: boolean
  countryCode?: string
  extension?: string
}

export default function StepContact() {
  const { formData, setStepData } = useHireWizard()
  const {
    phones = [],
    emails = [],
    jobRelationships = [],
  } = formData.contact ?? {}

  // Retrieve address from contact store (extended beyond original schema)
  const address = (formData.contact as Record<string, unknown>)?.address as ThaiAddress | undefined ?? EMPTY_ADDRESS

  // ── Phone helpers ──────────────────────────────────────────────────────────
  function setPhones(next: ExtendedPhoneEntry[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setStepData('contact', { phones: next as any })
  }

  function addPhone() {
    // BRD #15: SF has no cap — removed phones.length >= 5 gate
    setPhones([...phones as ExtendedPhoneEntry[], { type: 'C', value: '', isPrimary: false, countryCode: '66', extension: '' }])
  }

  function removePhone(idx: number) {
    if (phones.length <= 1) return
    setPhones((phones as ExtendedPhoneEntry[]).filter((_, i) => i !== idx))
  }

  function updatePhone(idx: number, patch: Partial<ExtendedPhoneEntry>) {
    setPhones((phones as ExtendedPhoneEntry[]).map((p, i) => (i === idx ? { ...p, ...patch } : p)))
  }

  function setPrimaryPhone(idx: number) {
    setPhones((phones as ExtendedPhoneEntry[]).map((p, i) => ({ ...p, isPrimary: i === idx })))
  }

  // ── Email helpers ──────────────────────────────────────────────────────────
  function setEmails(next: EmailEntry[]) {
    setStepData('contact', { emails: next })
  }

  function addEmail() {
    // BRD #15: SF has no cap — removed emails.length >= 5 gate
    // 'P' = SF ecEmailType Personal; mapped to legacy 'personal' for type compat
    setEmails([...emails, { type: 'personal' as EmailEntry['type'], value: '', isPrimary: false }])
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

  // ── Address helpers ────────────────────────────────────────────────────────
  function updateAddress(patch: Partial<ThaiAddress>) {
    const next = { ...address, ...patch }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setStepData('contact', { address: next } as any)
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

      {/* ─── เบอร์ติดต่อ (BRD #16: countryCode + extension) ─────────────────── */}
      <section aria-label="เบอร์ติดต่อ">
        <p className="humi-label mb-3">
          เบอร์ติดต่อ<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerPhone-2026-04-26.json#.d.results[0].countryCode */}

        <div className="space-y-3">
          {(phones as ExtendedPhoneEntry[]).map((phone, idx) => (
            <div key={idx} className="flex flex-wrap items-start gap-2">
              {/* ประเภท — SF ecPhoneType codes */}
              <select
                aria-label={`ประเภทเบอร์โทร ${idx + 1}`}
                value={phone.type}
                onChange={(e) => updatePhone(idx, { type: e.target.value })}
                className="humi-select w-40 shrink-0"
              >
                {SF_PHONE_TYPES.map((t) => (
                  <option key={t} value={t}>{PHONE_TYPE_LABELS[t]}</option>
                ))}
                {/* legacy options for compat */}
                {!SF_PHONE_TYPES.includes(phone.type as typeof SF_PHONE_TYPES[number]) && (
                  <option value={phone.type}>{PHONE_TYPE_LABELS[phone.type] ?? phone.type}</option>
                )}
              </select>

              {/* รหัสประเทศ — SF PerPhone.countryCode e.g. "66" */}
              <input
                type="text"
                aria-label={`รหัสประเทศ ${idx + 1}`}
                placeholder="+66"
                value={phone.countryCode ?? '66'}
                onChange={(e) => updatePhone(idx, { countryCode: e.target.value })}
                className="humi-input w-16 shrink-0"
              />

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

              {/* ต่อ (extension) — SF PerPhone.extension */}
              <input
                type="text"
                aria-label={`ต่อ (extension) ${idx + 1}`}
                placeholder="ต่อ"
                value={phone.extension ?? ''}
                onChange={(e) => updatePhone(idx, { extension: e.target.value })}
                className="humi-input w-16 shrink-0"
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

        {/* BRD #16: no cap on phones — SF has no limit */}
        <button
          type="button"
          onClick={addPhone}
          className="mt-3 text-sm text-accent hover:underline"
        >
          + เพิ่มเบอร์โทร
        </button>
      </section>

      {/* ─── อีเมล (BRD #15: SF ecEmailType, no 5-cap) ───────────────────── */}
      <section aria-label="อีเมล">
        <p className="humi-label mb-3">
          อีเมล<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerEmail-2026-04-26.json#.d.results[0].emailType */}

        <div className="space-y-3">
          {emails.map((email, idx) => {
            const invalid = email.value.trim() !== '' && !EMAIL_RE.test(email.value.trim())
            return (
              <div key={idx} className="flex flex-wrap items-start gap-2">
                {/* ประเภท — SF ecEmailType codes */}
                <select
                  aria-label={`ประเภทอีเมล ${idx + 1}`}
                  value={email.type}
                  onChange={(e) => updateEmail(idx, { type: e.target.value as EmailEntry['type'] })}
                  className="humi-select w-44 shrink-0"
                >
                  {SF_EMAIL_TYPES.map((t) => (
                    <option key={t} value={t}>{EMAIL_TYPE_LABELS[t]}</option>
                  ))}
                  {/* legacy options for compat */}
                  {!SF_EMAIL_TYPES.includes(email.type as typeof SF_EMAIL_TYPES[number]) && (
                    <option value={email.type}>{EMAIL_TYPE_LABELS[email.type] ?? email.type}</option>
                  )}
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

        {/* BRD #15: no cap — SF has no limit */}
        <button
          type="button"
          onClick={addEmail}
          className="mt-3 text-sm text-accent hover:underline"
        >
          + เพิ่มอีเมล
        </button>
      </section>

      {/* ─── ที่อยู่ที่พักอาศัย (BRD #17: PerAddressDEFLT 8-field Thai address) ─── */}
      <section aria-label="ที่อยู่ที่พักอาศัย">
        <p className="humi-label mb-3">
          ที่อยู่ที่พักอาศัย
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerAddressDEFLT-2026-04-26.json#.d.results[0]
            address5=houseNo, address4=village, address11=moo, address7=soi,
            address12=subdistrict, city=district, state=province, zipCode, country=THA */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          {/* บ้านเลขที่ — SF address5 */}
          <fieldset>
            <label htmlFor="addr-house-no" className="humi-label">
              บ้านเลขที่<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-house-no" type="text" placeholder="เช่น 155"
              value={address.houseNo}
              onChange={(e) => updateAddress({ houseNo: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* หมู่บ้าน / ชื่อหมู่บ้าน — SF address4 */}
          <fieldset>
            <label htmlFor="addr-village" className="humi-label">
              หมู่บ้าน
            </label>
            <input id="addr-village" type="text" placeholder="เช่น หมู่บ้านตะวันนา"
              value={address.village}
              onChange={(e) => updateAddress({ village: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* หมู่ที่ — SF address11 */}
          <fieldset>
            <label htmlFor="addr-moo" className="humi-label">
              หมู่ที่
            </label>
            <input id="addr-moo" type="text" placeholder="เช่น 5"
              value={address.moo}
              onChange={(e) => updateAddress({ moo: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* ซอย — SF address7 */}
          <fieldset>
            <label htmlFor="addr-soi" className="humi-label">
              ซอย
            </label>
            <input id="addr-soi" type="text" placeholder="เช่น สนามบินน้ำ"
              value={address.soi}
              onChange={(e) => updateAddress({ soi: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* แขวง/ตำบล — SF address12 */}
          <fieldset>
            <label htmlFor="addr-subdistrict" className="humi-label">
              แขวง / ตำบล<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-subdistrict" type="text" placeholder="เช่น บางกระสอ"
              value={address.subdistrict}
              onChange={(e) => updateAddress({ subdistrict: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* เขต/อำเภอ — SF city */}
          <fieldset>
            <label htmlFor="addr-district" className="humi-label">
              เขต / อำเภอ<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-district" type="text" placeholder="เช่น นนทบุรี"
              value={address.district}
              onChange={(e) => updateAddress({ district: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* จังหวัด — SF state */}
          <fieldset>
            <label htmlFor="addr-province" className="humi-label">
              จังหวัด<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-province" type="text" placeholder="เช่น 12 (นนทบุรี)"
              value={address.province}
              onChange={(e) => updateAddress({ province: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* รหัสไปรษณีย์ — SF zipCode */}
          <fieldset>
            <label htmlFor="addr-zip" className="humi-label">
              รหัสไปรษณีย์<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-zip" type="text" inputMode="numeric" placeholder="เช่น 11000"
              value={address.zipCode}
              onChange={(e) => updateAddress({ zipCode: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* ประเทศ — SF country (default THA) */}
          <fieldset>
            <label htmlFor="addr-country" className="humi-label">
              ประเทศ
            </label>
            <input id="addr-country" type="text" placeholder="THA"
              value={address.country}
              onChange={(e) => updateAddress({ country: e.target.value })}
              className="humi-input w-full" />
          </fieldset>
        </div>
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

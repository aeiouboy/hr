'use client'

// StepContact.tsx — A2 Multi-value Contact
// Wave 2-A: BRD #15 email (SF ecEmailType, no 5-cap), #16 phone (countryCode + extension),
//           BRD #17 8-field Thai address (PerAddressDEFLT)
// Picklist source: SF cite in code comments

import { useTranslations } from 'next-intl'
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

type AddressLookupField = 'subdistrict' | 'district' | 'province' | 'zipCode'

interface ThaiAddressSuggestion {
  subdistrict: string
  district: string
  province: string
  zipCode: string
}

// Compact seed set for the hire form autocomplete. Kept local to avoid pulling a
// large Thai address dependency into the frontend bundle.
const THAI_ADDRESS_SUGGESTIONS: ThaiAddressSuggestion[] = [
  { subdistrict: 'บางกระสอ', district: 'เมืองนนทบุรี', province: 'นนทบุรี', zipCode: '11000' },
  { subdistrict: 'ตลาดขวัญ', district: 'เมืองนนทบุรี', province: 'นนทบุรี', zipCode: '11000' },
  { subdistrict: 'สวนใหญ่', district: 'เมืองนนทบุรี', province: 'นนทบุรี', zipCode: '11000' },
  { subdistrict: 'คลองตัน', district: 'วัฒนา', province: 'กรุงเทพมหานคร', zipCode: '10110' },
  { subdistrict: 'คลองเตย', district: 'คลองเตย', province: 'กรุงเทพมหานคร', zipCode: '10110' },
  { subdistrict: 'สีลม', district: 'บางรัก', province: 'กรุงเทพมหานคร', zipCode: '10500' },
  { subdistrict: 'ปทุมวัน', district: 'ปทุมวัน', province: 'กรุงเทพมหานคร', zipCode: '10330' },
  { subdistrict: 'ห้วยขวาง', district: 'ห้วยขวาง', province: 'กรุงเทพมหานคร', zipCode: '10310' },
  { subdistrict: 'ลาดยาว', district: 'จตุจักร', province: 'กรุงเทพมหานคร', zipCode: '10900' },
  { subdistrict: 'บางนา', district: 'บางนา', province: 'กรุงเทพมหานคร', zipCode: '10260' },
  { subdistrict: 'คูคต', district: 'ลำลูกกา', province: 'ปทุมธานี', zipCode: '12130' },
  { subdistrict: 'บางแก้ว', district: 'บางพลี', province: 'สมุทรปราการ', zipCode: '10540' },
]

function uniqueAddressValues(field: AddressLookupField): string[] {
  return Array.from(new Set(THAI_ADDRESS_SUGGESTIONS.map((item) => item[field]))).sort((a, b) =>
    a.localeCompare(b, 'th')
  )
}

function findAddressSuggestion(field: AddressLookupField, value: string): ThaiAddressSuggestion | undefined {
  const normalized = value.trim()
  if (!normalized) return undefined
  const matches = THAI_ADDRESS_SUGGESTIONS.filter((item) => item[field] === normalized)
  return matches.length === 1 ? matches[0] : undefined
}

function buildAddressAutofill(field: AddressLookupField, value: string): Partial<ThaiAddress> {
  const suggestion = findAddressSuggestion(field, value)
  if (!suggestion) return { [field]: value }

  return {
    subdistrict: suggestion.subdistrict,
    district: suggestion.district,
    province: suggestion.province,
    zipCode: suggestion.zipCode,
    country: 'THA',
  }
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
  const t = useTranslations('hireForm.contact')
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

  function updateAddressFromLookup(field: AddressLookupField, value: string) {
    updateAddress(buildAddressAutofill(field, value))
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
      <section aria-label={t('phoneSection')}>
        <p className="humi-label mb-3">
          {t('phoneSection')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerPhone-2026-04-26.json#.d.results[0].countryCode */}

        <div className="space-y-3">
          {(phones as ExtendedPhoneEntry[]).map((phone, idx) => (
            <div key={idx} className="flex flex-wrap items-start gap-2">
              {/* ประเภท — SF ecPhoneType codes */}
              <select
                aria-label={`${t('phoneType')} ${idx + 1}`}
                value={phone.type}
                onChange={(e) => updatePhone(idx, { type: e.target.value })}
                className="humi-select w-40 shrink-0"
              >
                {SF_PHONE_TYPES.map((pt) => (
                  <option key={pt} value={pt}>{PHONE_TYPE_LABELS[pt]}</option>
                ))}
                {/* legacy options for compat */}
                {!SF_PHONE_TYPES.includes(phone.type as typeof SF_PHONE_TYPES[number]) && (
                  <option value={phone.type}>{PHONE_TYPE_LABELS[phone.type] ?? phone.type}</option>
                )}
              </select>

              {/* รหัสประเทศ — SF PerPhone.countryCode e.g. "66" */}
              <input
                type="text"
                aria-label={`${t('countryCode')} ${idx + 1}`}
                placeholder={t('countryCodePlaceholder')}
                value={phone.countryCode ?? '66'}
                onChange={(e) => updatePhone(idx, { countryCode: e.target.value })}
                className="humi-input w-16 shrink-0"
              />

              {/* เบอร์ */}
              <input
                type="tel"
                aria-label={`${t('phoneNumber')} ${idx + 1}`}
                aria-invalid={phone.value.trim() === '' ? 'true' : 'false'}
                placeholder={t('phonePlaceholder')}
                value={phone.value}
                onChange={(e) => updatePhone(idx, { value: e.target.value })}
                className="humi-input min-w-0 flex-1"
              />

              {/* ต่อ (extension) — SF PerPhone.extension */}
              <input
                type="text"
                aria-label={`${t('extension')} ${idx + 1}`}
                placeholder={t('extensionPlaceholder')}
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
                {t('isPrimary')}
              </label>

              {/* ลบ */}
              <button
                type="button"
                aria-label={`${t('remove')} ${t('phoneNumber')} ${idx + 1}`}
                disabled={phones.length <= 1}
                onClick={() => removePhone(idx)}
                className="rounded px-2 py-1.5 text-sm text-warning hover:bg-warning/10 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {t('remove')}
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
          {t('addPhone')}
        </button>
      </section>

      {/* ─── อีเมล (BRD #15: SF ecEmailType, no 5-cap) ───────────────────── */}
      <section aria-label={t('emailSection')}>
        <p className="humi-label mb-3">
          {t('emailSection')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerEmail-2026-04-26.json#.d.results[0].emailType */}

        <div className="space-y-3">
          {emails.map((email, idx) => {
            const invalid = email.value.trim() !== '' && !EMAIL_RE.test(email.value.trim())
            return (
              <div key={idx} className="flex flex-wrap items-start gap-2">
                {/* ประเภท — SF ecEmailType codes */}
                <select
                  aria-label={`${t('emailType')} ${idx + 1}`}
                  value={email.type}
                  onChange={(e) => updateEmail(idx, { type: e.target.value as EmailEntry['type'] })}
                  className="humi-select w-44 shrink-0"
                >
                  {SF_EMAIL_TYPES.map((et) => (
                    <option key={et} value={et}>{EMAIL_TYPE_LABELS[et]}</option>
                  ))}
                  {/* legacy options for compat */}
                  {!SF_EMAIL_TYPES.includes(email.type as typeof SF_EMAIL_TYPES[number]) && (
                    <option value={email.type}>{EMAIL_TYPE_LABELS[email.type] ?? email.type}</option>
                  )}
                </select>

                {/* อีเมล */}
                <input
                  type="email"
                  aria-label={`${t('emailAddress')} ${idx + 1}`}
                  aria-invalid={invalid ? 'true' : 'false'}
                  placeholder={t('emailPlaceholder')}
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
                  {t('isPrimary')}
                </label>

                {/* ลบ */}
                <button
                  type="button"
                  aria-label={`${t('remove')} ${t('emailAddress')} ${idx + 1}`}
                  disabled={emails.length <= 1}
                  onClick={() => removeEmail(idx)}
                  className="rounded px-2 py-1.5 text-sm text-warning hover:bg-warning/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {t('remove')}
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
          {t('addEmail')}
        </button>
      </section>

      {/* ─── ที่อยู่ที่พักอาศัย (BRD #17: PerAddressDEFLT 8-field Thai address) ─── */}
      <section aria-label={t('addressSection')}>
        <p className="humi-label mb-3">
          {t('addressSection')}
        </p>
        {/* SF cite: qas-fields-2026-04-26/sf-qas-PerAddressDEFLT-2026-04-26.json#.d.results[0]
            address5=houseNo, address4=village, address11=moo, address7=soi,
            address12=subdistrict, city=district, state=province, zipCode, country=THA */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          {/* บ้านเลขที่ — SF address5 */}
          <fieldset>
            <label htmlFor="addr-house-no" className="humi-label">
              {t('houseNo')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-house-no" type="text" placeholder={t('houseNoPlaceholder')}
              autoComplete="address-line1"
              value={address.houseNo}
              onChange={(e) => updateAddress({ houseNo: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* หมู่บ้าน / ชื่อหมู่บ้าน — SF address4 */}
          <fieldset>
            <label htmlFor="addr-village" className="humi-label">
              {t('village')}
            </label>
            <input id="addr-village" type="text" placeholder={t('villagePlaceholder')}
              autoComplete="address-line2"
              value={address.village}
              onChange={(e) => updateAddress({ village: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* หมู่ที่ — SF address11 */}
          <fieldset>
            <label htmlFor="addr-moo" className="humi-label">
              {t('moo')}
            </label>
            <input id="addr-moo" type="text" placeholder={t('mooPlaceholder')}
              autoComplete="address-line3"
              value={address.moo}
              onChange={(e) => updateAddress({ moo: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* ซอย — SF address7 */}
          <fieldset>
            <label htmlFor="addr-soi" className="humi-label">
              {t('soi')}
            </label>
            <input id="addr-soi" type="text" placeholder={t('soiPlaceholder')}
              autoComplete="address-line3"
              value={address.soi}
              onChange={(e) => updateAddress({ soi: e.target.value })}
              className="humi-input w-full" />
          </fieldset>

          {/* แขวง/ตำบล — SF address12 */}
          <fieldset>
            <label htmlFor="addr-subdistrict" className="humi-label">
              {t('subdistrict')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-subdistrict" type="text" placeholder={t('subdistrictPlaceholder')}
              autoComplete="address-level3"
              list="hire-address-subdistricts"
              value={address.subdistrict}
              onChange={(e) => updateAddressFromLookup('subdistrict', e.target.value)}
              className="humi-input w-full" />
          </fieldset>

          {/* เขต/อำเภอ — SF city */}
          <fieldset>
            <label htmlFor="addr-district" className="humi-label">
              {t('district')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-district" type="text" placeholder={t('districtPlaceholder')}
              autoComplete="address-level2"
              list="hire-address-districts"
              value={address.district}
              onChange={(e) => updateAddressFromLookup('district', e.target.value)}
              className="humi-input w-full" />
          </fieldset>

          {/* จังหวัด — SF state */}
          <fieldset>
            <label htmlFor="addr-province" className="humi-label">
              {t('province')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-province" type="text" placeholder={t('provincePlaceholder')}
              autoComplete="address-level1"
              list="hire-address-provinces"
              value={address.province}
              onChange={(e) => updateAddressFromLookup('province', e.target.value)}
              className="humi-input w-full" />
          </fieldset>

          {/* รหัสไปรษณีย์ — SF zipCode */}
          <fieldset>
            <label htmlFor="addr-zip" className="humi-label">
              {t('zipCode')}<span aria-hidden="true" className="humi-asterisk ml-1">*</span>
            </label>
            <input id="addr-zip" type="text" inputMode="numeric" placeholder={t('zipCodePlaceholder')}
              autoComplete="postal-code"
              list="hire-address-zip-codes"
              value={address.zipCode}
              onChange={(e) => updateAddressFromLookup('zipCode', e.target.value)}
              className="humi-input w-full" />
          </fieldset>

          <datalist id="hire-address-subdistricts">
            {THAI_ADDRESS_SUGGESTIONS.map((item) => (
              <option
                key={`${item.subdistrict}-${item.district}-${item.zipCode}`}
                value={item.subdistrict}
                label={`${item.district}, ${item.province} ${item.zipCode}`}
              />
            ))}
          </datalist>
          <datalist id="hire-address-districts">
            {uniqueAddressValues('district').map((district) => (
              <option key={district} value={district} />
            ))}
          </datalist>
          <datalist id="hire-address-provinces">
            {uniqueAddressValues('province').map((province) => (
              <option key={province} value={province} />
            ))}
          </datalist>
          <datalist id="hire-address-zip-codes">
            {uniqueAddressValues('zipCode').map((zipCode) => (
              <option key={zipCode} value={zipCode} />
            ))}
          </datalist>

          {/* ประเทศ — SF country (default THA) */}
          <fieldset>
            <label htmlFor="addr-country" className="humi-label">
              {t('country')}
            </label>
            <input id="addr-country" type="text" placeholder={t('countryPlaceholder')}
              value={address.country}
              onChange={(e) => updateAddress({ country: e.target.value })}
              className="humi-input w-full" />
          </fieldset>
        </div>
      </section>

      {/* ─── บุคคลที่เกี่ยวข้อง ───────────────────────────────────────────── */}
      <section aria-label={t('relationsSection')}>
        <p className="humi-label mb-3">{t('relationsSection')}</p>

        {jobRelationships.length > 0 && (
          <table className="mb-3 w-full text-sm">
            <thead>
              <tr className="border-b border-hairline-soft text-left text-ink-soft">
                <th className="pb-2 pr-4 font-medium">{t('relationshipType')}</th>
                <th className="pb-2 pr-4 font-medium">{t('personName')}</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {jobRelationships.map((rel, idx) => (
                <tr key={idx} className="border-b border-hairline-soft/50">
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      aria-label={`${t('relationshipType')} ${idx + 1}`}
                      placeholder={t('relationshipTypePlaceholder')}
                      value={rel.relationshipType}
                      onChange={(e) => updateRelationship(idx, { relationshipType: e.target.value })}
                      className="humi-input w-full"
                    />
                  </td>
                  <td className="py-2 pr-4">
                    <input
                      type="text"
                      aria-label={`${t('personName')} ${idx + 1}`}
                      placeholder={t('personNamePlaceholder')}
                      value={rel.name}
                      onChange={(e) => updateRelationship(idx, { name: e.target.value })}
                      className="humi-input w-full"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      type="button"
                      aria-label={`${t('remove')} ${t('relationsSection')} ${idx + 1}`}
                      onClick={() => removeRelationship(idx)}
                      className="rounded px-2 py-1 text-xs text-warning hover:bg-warning/10"
                    >
                      {t('remove')}
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
          {t('addRelation')}
        </button>
      </section>

    </div>
  )
}

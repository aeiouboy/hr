'use client'

// system-features/language/page.tsx — Switch Language (BRD #195)
// AC: 3 radio options (th/en/vn) + current UI language indicator + save via store

import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const LANG_OPTIONS = [
  { value: 'th', label: 'ภาษาไทย', flag: '🇹🇭', description: 'Thai — ภาษาหลักของระบบ' },
  { value: 'en', label: 'English', flag: '🇬🇧', description: 'English — สำหรับผู้ใช้ต่างชาติ' },
  { value: 'vn', label: 'Tiếng Việt', flag: '🇻🇳', description: 'Vietnamese — สาขาเวียดนาม' },
] as const

type LangValue = 'th' | 'en' | 'vn'

export default function LanguagePage() {
  const language = useDataManagement((s) => s.language)
  const setLanguage = useDataManagement((s) => s.setLanguage)

  function handleChange(val: LangValue) {
    setLanguage(val)
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">ภาษาระบบ</h1>
        <p className="mt-1 text-sm text-gray-500">
          เลือกภาษา UI สำหรับผู้ใช้งาน — การเปลี่ยนภาษาจะมีผลทันทีในครั้งถัดไปที่ login
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            เลือกภาษาที่ต้องการ
          </span>
        </div>

        <fieldset className="divide-y divide-gray-100" aria-label="เลือกภาษาระบบ">
          <legend className="sr-only">เลือกภาษาระบบ</legend>
          {LANG_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <input
                type="radio"
                name="language"
                value={opt.value}
                checked={language === opt.value}
                onChange={() => handleChange(opt.value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-xl" aria-hidden="true">{opt.flag}</span>
              <div className="flex-1">
                <span className="block text-sm font-medium text-gray-900">{opt.label}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{opt.description}</span>
              </div>
              {language === opt.value && (
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                  ใช้งานอยู่
                </span>
              )}
            </label>
          ))}
        </fieldset>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        BRD #195 — การเปลี่ยนภาษาจะถูกบันทึกผ่าน audit log โดยอัตโนมัติ
      </p>
    </div>
  )
}

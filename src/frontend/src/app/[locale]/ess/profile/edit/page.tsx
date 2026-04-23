'use client'

// ess/profile/edit/page.tsx — Profile Edit Form (4 sections inline edit)
// - "บันทึกร่าง" = save to localStorage (via Zustand persist)
// - "ส่งเพื่ออนุมัติ" = mock submit → toast + redirect /ess/workflows
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfileEdit } from '@/lib/admin/store/useProfileEdit'
import mockEmployee from '@/data/admin/mockEmployee.json'

export default function ProfileEditPage() {
  const router = useRouter()
  const { draft, isDirty, isSubmitting, setField, loadFromEmployee, submit } = useProfileEdit()
  const [toast, setToast] = useState<string | null>(null)

  // โหลดข้อมูล mock เข้า draft เมื่อ mount ครั้งแรก (ถ้า draft ยังว่างอยู่)
  useEffect(() => {
    if (!isDirty && draft.firstNameTh === '') {
      loadFromEmployee({
        firstNameTh: mockEmployee.firstNameTh,
        lastNameTh: mockEmployee.lastNameTh,
        firstNameEn: mockEmployee.firstNameEn,
        lastNameEn: mockEmployee.lastNameEn,
        dateOfBirth: mockEmployee.dateOfBirth,
        address: mockEmployee.address,
        emergencyContactName: mockEmployee.emergencyContact.name,
        emergencyContactPhone: mockEmployee.emergencyContact.phone,
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // แสดง toast แล้ว auto-hide หลัง 3 วินาที
  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // บันทึกร่าง — Zustand persist จัดการ localStorage ให้อัตโนมัติ
  function handleSaveDraft() {
    showToast('บันทึกร่างแล้ว')
  }

  // ส่งเพื่ออนุมัติ
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await submit()
      showToast('ส่งคำขอแก้ไขข้อมูลส่วนตัวแล้ว — รอ SPD อนุมัติ')
      // redirect หลัง toast แสดง 1.5s
      setTimeout(() => router.push('/ess/workflows'), 1500)
    } catch (err) {
      console.warn('[ProfileEditPage] handleSubmit error:', err)
      showToast('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-4 right-4 z-50 rounded-md bg-green-600 text-white px-4 py-3 text-sm shadow-lg"
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">แก้ไขข้อมูลส่วนตัว</h1>
        <p className="mt-1 text-sm text-gray-500">
          การแก้ไขจะถูกส่งให้ SPD พิจารณาอนุมัติก่อนมีผลในระบบ
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Section 1: ชื่อ-นามสกุล */}
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">ชื่อ-นามสกุล</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstNameTh" className="block text-xs text-gray-500 mb-1">
                  ชื่อ (ไทย) <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstNameTh"
                  type="text"
                  required
                  value={draft.firstNameTh}
                  onChange={(e) => setField('firstNameTh', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastNameTh" className="block text-xs text-gray-500 mb-1">
                  นามสกุล (ไทย) <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastNameTh"
                  type="text"
                  required
                  value={draft.lastNameTh}
                  onChange={(e) => setField('lastNameTh', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="firstNameEn" className="block text-xs text-gray-500 mb-1">
                  ชื่อ (อังกฤษ)
                </label>
                <input
                  id="firstNameEn"
                  type="text"
                  value={draft.firstNameEn}
                  onChange={(e) => setField('firstNameEn', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastNameEn" className="block text-xs text-gray-500 mb-1">
                  นามสกุล (อังกฤษ)
                </label>
                <input
                  id="lastNameEn"
                  type="text"
                  value={draft.lastNameEn}
                  onChange={(e) => setField('lastNameEn', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Section 2: วันเกิด */}
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">วันเกิด</h2>
            <div>
              <label htmlFor="dateOfBirth" className="block text-xs text-gray-500 mb-1">
                วันเดือนปีเกิด <span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                required
                value={draft.dateOfBirth}
                onChange={(e) => setField('dateOfBirth', e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Section 3: ที่อยู่ */}
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">ที่อยู่</h2>
            <div>
              <label htmlFor="address" className="block text-xs text-gray-500 mb-1">
                ที่อยู่ปัจจุบัน <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={draft.address}
                onChange={(e) => setField('address', e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </section>

          {/* Section 4: ผู้ติดต่อฉุกเฉิน */}
          <section className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">ผู้ติดต่อฉุกเฉิน</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="emergencyContactName" className="block text-xs text-gray-500 mb-1">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  id="emergencyContactName"
                  type="text"
                  required
                  value={draft.emergencyContactName}
                  onChange={(e) => setField('emergencyContactName', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="emergencyContactPhone" className="block text-xs text-gray-500 mb-1">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <input
                  id="emergencyContactPhone"
                  type="tel"
                  required
                  value={draft.emergencyContactPhone}
                  onChange={(e) => setField('emergencyContactPhone', e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* National ID — readonly display only */}
          <section className="rounded-lg border border-gray-100 bg-gray-50 p-5">
            <h2 className="text-sm font-semibold text-gray-500 mb-2">
              เลขบัตรประชาชน
              <span className="ml-2 text-xs font-normal">(แก้ไขไม่ได้ — ติดต่อ HR)</span>
            </h2>
            <p className="text-sm text-gray-400 font-mono">
              {mockEmployee.nationalId.replace(/(\d)(\d{4})(\d{5})(\d{2})(\d)/, '$1-$2-$3-$4-$5')}
            </p>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            บันทึกร่าง
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'กำลังส่ง...' : 'ส่งเพื่ออนุมัติ'}
          </button>
        </div>
      </form>
    </div>
  )
}

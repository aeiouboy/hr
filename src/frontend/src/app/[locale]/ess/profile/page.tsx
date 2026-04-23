// ess/profile/page.tsx — Profile view (read-only)
// แสดง 4 cards: Personal Info / Address / Emergency Contact / National ID
// "Edit" button → navigate to /ess/profile/edit
import Link from 'next/link'
import mockEmployee from '@/data/admin/mockEmployee.json'

// helper — format วันเกิดเป็น Thai locale
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    console.warn('[profile/page] formatDate: invalid date', iso)
    return iso
  }
}

// helper — mask เลขบัตร: แสดง 4 ตัวสุดท้าย
function maskNationalId(id: string): string {
  if (id.length < 4) return '***'
  return 'X-XXXX-XXXXX-XX-' + id.slice(-1)
}

export default function ProfileViewPage() {
  const emp = mockEmployee

  return (
    <div className="p-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">ข้อมูลส่วนตัว</h1>
        <Link
          href="/ess/profile/edit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          แก้ไขข้อมูล
        </Link>
      </div>

      <div className="space-y-4">
        {/* Card 1: Personal Info */}
        <section
          className="rounded-lg border border-gray-200 bg-white p-5"
          aria-labelledby="section-personal"
        >
          <h2 id="section-personal" className="text-sm font-semibold text-gray-700 mb-3">
            ข้อมูลส่วนตัว
          </h2>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-gray-500">ชื่อ (ไทย)</dt>
            <dd className="text-gray-900 font-medium">{emp.firstNameTh} {emp.lastNameTh}</dd>
            <dt className="text-gray-500">ชื่อ (อังกฤษ)</dt>
            <dd className="text-gray-900 font-medium">{emp.firstNameEn} {emp.lastNameEn}</dd>
            <dt className="text-gray-500">วันเกิด</dt>
            <dd className="text-gray-900">{formatDate(emp.dateOfBirth)}</dd>
          </dl>
        </section>

        {/* Card 2: Address */}
        <section
          className="rounded-lg border border-gray-200 bg-white p-5"
          aria-labelledby="section-address"
        >
          <h2 id="section-address" className="text-sm font-semibold text-gray-700 mb-3">
            ที่อยู่
          </h2>
          <dl className="text-sm">
            <dt className="text-gray-500 mb-1">ที่อยู่ปัจจุบัน</dt>
            <dd className="text-gray-900">{emp.address}</dd>
          </dl>
        </section>

        {/* Card 3: Emergency Contact */}
        <section
          className="rounded-lg border border-gray-200 bg-white p-5"
          aria-labelledby="section-emergency"
        >
          <h2 id="section-emergency" className="text-sm font-semibold text-gray-700 mb-3">
            ผู้ติดต่อฉุกเฉิน
          </h2>
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-gray-500">ชื่อ-นามสกุล</dt>
            <dd className="text-gray-900">{emp.emergencyContact.name}</dd>
            <dt className="text-gray-500">เบอร์โทรศัพท์</dt>
            <dd className="text-gray-900">{emp.emergencyContact.phone}</dd>
          </dl>
        </section>

        {/* Card 4: National ID (readonly) */}
        <section
          className="rounded-lg border border-gray-200 bg-white p-5"
          aria-labelledby="section-nationalid"
        >
          <h2 id="section-nationalid" className="text-sm font-semibold text-gray-700 mb-3">
            เลขบัตรประชาชน
            <span className="ml-2 text-xs font-normal text-gray-400">(แก้ไขไม่ได้)</span>
          </h2>
          <dl className="text-sm">
            <dt className="text-gray-500 mb-1">เลขประจำตัวประชาชน</dt>
            <dd className="text-gray-900 font-mono tracking-wider">{maskNationalId(emp.nationalId)}</dd>
          </dl>
        </section>
      </div>
    </div>
  )
}

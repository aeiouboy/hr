// ess/page.tsx — ESS Home Dashboard
// "สวัสดี [ชื่อพนักงาน]" + quick action cards + pending workflow badge
import Link from 'next/link'
import { PencilLine, Calendar, Wallet } from 'lucide-react'
import mockEmployee from '@/data/admin/mockEmployee.json'

// mock pending count — ในอนาคตดึงจาก API
const PENDING_WORKFLOW_COUNT = 1

export default function EssHomePage() {
  const { firstNameTh, lastNameTh } = mockEmployee

  return (
    <div className="p-6 max-w-3xl">
      {/* ทักทายพนักงาน */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">
          สวัสดี {firstNameTh} {lastNameTh}
        </h1>
        <p className="mt-1 text-ink-muted text-sm">
          ระบบ Employee Self-Service — จัดการข้อมูลส่วนตัวและคำขอต่าง ๆ
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Edit Profile */}
        <Link
          href="/ess/profile/edit"
          className="block rounded-lg border border-hairline bg-surface p-5 hover:border-accent hover:shadow-sm transition-all"
        >
          <div className="text-accent mb-2" aria-hidden="true">
            <PencilLine size={20} strokeWidth={1.75} />
          </div>
          <div className="font-medium text-ink">แก้ไขข้อมูลส่วนตัว</div>
          <div className="text-xs text-ink-muted mt-1">ชื่อ ที่อยู่ ผู้ติดต่อฉุกเฉิน</div>
        </Link>

        {/* Request Time Off — placeholder */}
        <Link
          href="/ess/timeoff"
          className="block rounded-lg border border-hairline bg-surface p-5 hover:border-accent hover:shadow-sm transition-all"
        >
          <div className="text-info mb-2" aria-hidden="true">
            <Calendar size={20} strokeWidth={1.75} />
          </div>
          <div className="font-medium text-ink">ขอลางาน</div>
          <div className="text-xs text-ink-muted mt-1">ลาพักร้อน ลาป่วย ลากิจ</div>
        </Link>

        {/* View Payslip — placeholder */}
        <Link
          href="/employees/me/payslip"
          className="block rounded-lg border border-hairline bg-surface p-5 hover:border-accent hover:shadow-sm transition-all"
        >
          <div className="text-success mb-2" aria-hidden="true">
            <Wallet size={20} strokeWidth={1.75} />
          </div>
          <div className="font-medium text-ink">สลิปเงินเดือน</div>
          <div className="text-xs text-ink-muted mt-1">ดาวน์โหลดสลิปย้อนหลัง</div>
        </Link>
      </div>

      {/* Pending Workflow Badge */}
      {PENDING_WORKFLOW_COUNT > 0 && (
        <Link
          href="/ess/workflows"
          className="inline-flex items-center gap-2 rounded-full bg-warning-soft border border-warning px-4 py-2 text-sm text-warning hover:bg-warning-soft transition-colors"
          aria-label={`คำขอรออนุมัติ ${PENDING_WORKFLOW_COUNT} รายการ`}
        >
          <span className="font-semibold">{PENDING_WORKFLOW_COUNT}</span>
          <span>คำขอรออนุมัติ — คลิกเพื่อดูรายละเอียด</span>
        </Link>
      )}
    </div>
  )
}

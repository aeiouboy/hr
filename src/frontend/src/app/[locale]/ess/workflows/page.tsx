// ess/workflows/page.tsx — My Workflows list
// แสดงประวัติคำขอของพนักงาน: 1 pending (just submitted) + 1 approved
import Link from 'next/link'

// mock workflow entries — ในอนาคตดึงจาก API
const MOCK_WORKFLOWS = [
  {
    id: 'WF-2026-042301',
    type: 'แก้ไขข้อมูลส่วนตัว',
    submittedAt: '23 เมษายน 2569',
    status: 'pending' as const,
    statusLabel: 'รออนุมัติ',
    description: 'ขอแก้ไขชื่อ ที่อยู่ และผู้ติดต่อฉุกเฉิน',
  },
  {
    id: 'WF-2026-031501',
    type: 'แก้ไขข้อมูลส่วนตัว',
    submittedAt: '15 มีนาคม 2569',
    status: 'approved' as const,
    statusLabel: 'อนุมัติแล้ว',
    description: 'แก้ไขเบอร์โทรผู้ติดต่อฉุกเฉิน — อนุมัติโดย SPD',
  },
] as const

// สีและ style ของ status badge
const STATUS_STYLE: Record<'pending' | 'approved', string> = {
  pending:  'bg-amber-50 text-amber-700 border border-amber-200',
  approved: 'bg-green-50 text-green-700 border border-green-200',
}

export default function WorkflowsPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">คำขอของฉัน</h1>
        <Link
          href="/ess/profile/edit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          ยื่นคำขอใหม่
        </Link>
      </div>

      {/* Workflow list */}
      <ul className="space-y-3" aria-label="รายการคำขอของฉัน">
        {MOCK_WORKFLOWS.map((wf) => (
          <li
            key={wf.id}
            className="rounded-lg border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{wf.type}</span>
                  <span
                    className={[
                      'rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
                      STATUS_STYLE[wf.status],
                    ].join(' ')}
                  >
                    {wf.statusLabel}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{wf.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  ยื่นเมื่อ {wf.submittedAt} · รหัส {wf.id}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

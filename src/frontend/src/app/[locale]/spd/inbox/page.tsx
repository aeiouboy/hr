'use client';

// SPD inbox — final approver for personal-info change requests per BRD #166.
// Only sees requests in `pending_spd` step.

import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';

export default function SPDInboxPage() {
  return (
    <ApprovalInbox
      role="spd"
      expectedStep="pending_spd"
      title="กล่องอนุมัติ — SPD"
      subtitle="อนุมัติขั้นสุดท้ายสำหรับคำขอแก้ไขข้อมูลส่วนตัวของพนักงาน"
    />
  );
}

'use client';

// SPD inbox — sole approver for ESS personal-info change requests.
// Per BRD #166 + ess/profile/edit toast ("รอ SPD อนุมัติ"). 1-step workflow,
// no manager/HRBP intermediary (SF direct admin edit path is separate).

import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';

export default function SPDInboxPage() {
  return (
    <ApprovalInbox
      role="spd"
      expectedStep="pending_spd"
      title="กล่องอนุมัติ — SPD"
      subtitle="อนุมัติคำขอแก้ไขข้อมูลส่วนตัวที่พนักงานส่งผ่าน Self-Service (BRD #166)"
    />
  );
}

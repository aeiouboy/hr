'use client';

// SPD inbox — sole approver for:
//   • Chain 3: ESS personal-info change requests (BRD #166)
//   • Chain 1: ESS termination/resignation requests (BRD #172)
//   • Chain 4: Promotion requests (BRD #103)

import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';
import { TerminationInbox } from '@/components/workflow/TerminationInbox';
import { PromotionInbox } from '@/components/workflow/PromotionInbox';

export default function SPDInboxPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Chain 3 — Personal Info (BRD #166) */}
      <ApprovalInbox
        role="spd"
        expectedStep="pending_spd"
        title="กล่องอนุมัติ — SPD"
        subtitle="อนุมัติคำขอแก้ไขข้อมูลส่วนตัวที่พนักงานส่งผ่าน Self-Service (BRD #166)"
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-hairline-soft)' }} />

      {/* Chain 1 — Termination/Resignation (BRD #172) */}
      <TerminationInbox />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-hairline-soft)' }} />

      {/* Chain 4 — Promotion (BRD #103) */}
      <PromotionInbox />
    </div>
  );
}

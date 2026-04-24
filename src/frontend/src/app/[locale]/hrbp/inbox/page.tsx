'use client';

// HRBP inbox — second-line approver for personal-info change requests
// per BRD #166 approval chain. Only sees requests in `pending_hrbp` step.

import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';

export default function HRBPInboxPage() {
  return (
    <ApprovalInbox
      role="hrbp"
      expectedStep="pending_hrbp"
      title="กล่องอนุมัติ — HRBP"
      subtitle="ตรวจคำขอที่ผ่านหัวหน้าทีมแล้ว ก่อนส่งต่อให้ SPD อนุมัติขั้นสุดท้าย"
    />
  );
}

'use client';

// Manager inbox — first-line approver for personal-info change requests
// per BRD #166 approval chain. Only sees requests in `pending_manager` step.

import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';

export default function ManagerInboxPage() {
  return (
    <ApprovalInbox
      role="manager"
      expectedStep="pending_manager"
      title="กล่องอนุมัติ — หัวหน้าทีม"
      subtitle="ตรวจและอนุมัติคำขอแก้ไขข้อมูลจากลูกทีมในความดูแล"
    />
  );
}

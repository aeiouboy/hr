'use client';

// SPD inbox — sole approver for:
//   • Chain 3: ESS personal-info change requests (BRD #166)
//   • Chain 1: ESS termination/resignation requests (BRD #172)
//   • Chain 4: Promotion requests (BRD #103)
//
// BRD #134 — Refactored to use WorkflowRequestInbox as outer shell.
// Per-store action UIs (approve/reject) are still rendered by the existing
// specialised inboxes — WorkflowRequestInbox provides the unified frame + KPI chip.

import { WorkflowRequestInbox, type StoreSlot } from '@/components/workflow/WorkflowRequestInbox';
import { ApprovalInbox } from '@/components/workflow/ApprovalInbox';
import { TerminationInbox } from '@/components/workflow/TerminationInbox';
import { PromotionInbox } from '@/components/workflow/PromotionInbox';
import { useWorkflowApprovals } from '@/stores/workflow-approvals';
import { useTerminationApprovals } from '@/stores/termination-approvals';
import { usePromotionApprovals } from '@/stores/promotion-approvals';
import { STEP_LABEL } from '@/stores/workflow-approvals';
import { TERMINATION_STEP_LABEL } from '@/stores/termination-approvals';
import { PROMOTION_STEP_LABEL } from '@/stores/promotion-approvals';
import type { WorkflowRow } from '@/components/workflow/WorkflowRequestInbox';

function useSPDStoreSlots(): StoreSlot[] {
  const wfRequests   = useWorkflowApprovals((s) => s.requests);
  const termRequests = useTerminationApprovals((s) => s.requests);
  const promRequests = usePromotionApprovals((s) => s.requests);

  const wfRows: WorkflowRow[] = wfRequests.map((r) => ({
    id: r.id,
    requestType: 'แก้ไขข้อมูลส่วนตัว',
    requestedBy: r.employeeName,
    requestedOn: r.submittedAt,
    currentStep: STEP_LABEL[r.status],
    status: r.status === 'approved' ? 'approved' : r.status === 'rejected' ? 'rejected' : 'pending',
  }));

  const termRows: WorkflowRow[] = termRequests.map((r) => ({
    id: r.id,
    requestType: 'คำขอลาออก',
    requestedBy: r.employeeName,
    requestedOn: r.submittedAt,
    currentStep: TERMINATION_STEP_LABEL[r.status],
    status: r.status === 'approved' ? 'approved' : r.status === 'rejected' ? 'rejected' : 'pending',
  }));

  const promRows: WorkflowRow[] = promRequests.map((r) => ({
    id: r.id,
    requestType: 'คำขอเลื่อนตำแหน่ง',
    requestedBy: r.employeeName,
    requestedOn: r.submittedAt,
    currentStep: PROMOTION_STEP_LABEL[r.status],
    status: r.status === 'approved' ? 'approved' : r.status === 'rejected' ? 'rejected' : 'pending',
  }));

  return [
    { name: 'แก้ไขข้อมูลส่วนตัว (BRD #166)', rows: wfRows },
    { name: 'คำขอลาออก (BRD #172)',           rows: termRows },
    { name: 'คำขอเลื่อนตำแหน่ง (BRD #103)',   rows: promRows },
  ];
}

export default function SPDInboxPage() {
  const slots = useSPDStoreSlots();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Unified inbox header + KPI chip */}
      <div>
        <h1 className="font-display text-[22px] font-semibold text-ink">กล่องอนุมัติ — SPD</h1>
        <p className="text-small text-ink-muted mt-1">
          อนุมัติคำขอทั้งหมดที่พนักงานส่งผ่าน Self-Service (BRD #134)
        </p>
      </div>

      <WorkflowRequestInbox stores={slots} persona="spd" />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-hairline-soft)' }} />

      {/* Detailed action panels — each renders approve/reject UI for its chain */}
      <ApprovalInbox
        role="spd"
        expectedStep="pending_spd"
        title="Chain 3 — แก้ไขข้อมูลส่วนตัว"
        subtitle="อนุมัติคำขอแก้ไขข้อมูลส่วนตัวที่พนักงานส่งผ่าน Self-Service (BRD #166)"
      />

      <div style={{ borderTop: '1px solid var(--color-hairline-soft)' }} />

      {/* Chain 1 — Termination/Resignation (BRD #172) */}
      <TerminationInbox />

      <div style={{ borderTop: '1px solid var(--color-hairline-soft)' }} />

      {/* Chain 4 — Promotion (BRD #103) */}
      <PromotionInbox />
    </div>
  );
}

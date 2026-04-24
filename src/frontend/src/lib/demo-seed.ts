// demo-seed.ts — hydrate the workflow-approvals store with realistic mock
// requests so personas don't land on empty inboxes during a fresh demo.
//
// Called once by AppShell on mount. Guards against duplicate seeding by
// checking if the store already has any requests.

import { useWorkflowApprovals, type ApprovalRequest } from '@/stores/workflow-approvals';

const MOCK_REQUESTS: ApprovalRequest[] = [
  {
    id: 'WF-20260424-0842-A3FX',
    type: 'personal_info_change',
    employeeId: 'EMP-0142',
    employeeName: 'กมลรัตน์ จันทร์แดง',
    submittedBy: {
      id: 'EMP-0142',
      name: 'กมลรัตน์ จันทร์แดง',
      role: 'employee',
    },
    submittedAt: '2026-04-24T08:42:00+07:00',
    currentStep: 'pending_spd',
    diffs: [
      {
        path: 'contact.phone',
        label: 'เบอร์โทรศัพท์',
        before: '081-234-5678',
        after: '089-876-5432',
      },
      {
        path: 'contact.addressLine1',
        label: 'ที่อยู่',
        before: '123/4 ซอยสุขุมวิท 23 คลองเตย กรุงเทพ',
        after: '789/12 ซอยรัชดา 42 ห้วยขวาง กรุงเทพ',
      },
      {
        path: 'attributes.maritalStatus',
        label: 'สถานภาพสมรส',
        before: 'โสด',
        after: 'สมรส',
      },
    ],
    audit: [
      {
        actorRole: 'employee',
        actorName: 'กมลรัตน์ จันทร์แดง',
        action: 'submit',
        comment: 'แต่งงานเมื่อเดือนที่แล้ว ขออัปเดตที่อยู่ใหม่ด้วย',
        at: '2026-04-24T08:42:00+07:00',
      },
    ],
  },
  {
    id: 'WF-20260424-1015-B2KQ',
    type: 'personal_info_change',
    employeeId: 'EMP-0087',
    employeeName: 'ธนวัฒน์ สุขเกษม',
    submittedBy: {
      id: 'EMP-0087',
      name: 'ธนวัฒน์ สุขเกษม',
      role: 'employee',
    },
    submittedAt: '2026-04-24T10:15:00+07:00',
    currentStep: 'pending_spd',
    diffs: [
      {
        path: 'emergencyContact.name',
        label: 'ผู้ติดต่อฉุกเฉิน (ชื่อ)',
        before: 'นางสาวสุนิสา ว.',
        after: 'นางสุนิสา สุขเกษม',
      },
      {
        path: 'emergencyContact.phone',
        label: 'ผู้ติดต่อฉุกเฉิน (เบอร์)',
        before: '086-111-2222',
        after: '081-999-8877',
      },
    ],
    audit: [
      {
        actorRole: 'employee',
        actorName: 'ธนวัฒน์ สุขเกษม',
        action: 'submit',
        at: '2026-04-24T10:15:00+07:00',
      },
    ],
  },
  {
    id: 'WF-20260422-1430-C9PM',
    type: 'personal_info_change',
    employeeId: 'EMP-0031',
    employeeName: 'สมศรี พรมใจดี',
    submittedBy: {
      id: 'EMP-0031',
      name: 'สมศรี พรมใจดี',
      role: 'employee',
    },
    submittedAt: '2026-04-22T14:30:00+07:00',
    currentStep: 'approved',
    diffs: [
      {
        path: 'contact.email',
        label: 'อีเมลส่วนตัว',
        before: 'somsri.old@gmail.com',
        after: 'somsri.p@outlook.com',
      },
    ],
    audit: [
      {
        actorRole: 'employee',
        actorName: 'สมศรี พรมใจดี',
        action: 'submit',
        at: '2026-04-22T14:30:00+07:00',
      },
      {
        actorRole: 'spd',
        actorName: 'ดารณี ล. (SPD)',
        action: 'approve',
        comment: 'ยืนยันเอกสารแนบแล้ว',
        at: '2026-04-22T16:45:00+07:00',
      },
    ],
  },
];

let seeded = false;

/** Seed workflow-approvals once per browser session if the store is empty.
 *  Safe to call multiple times — idempotent via `seeded` flag + empty check. */
export function ensureDemoSeed(): void {
  if (seeded) return;
  seeded = true;
  const state = useWorkflowApprovals.getState();
  if (state.requests.length > 0) return;
  useWorkflowApprovals.setState({ requests: MOCK_REQUESTS });
}

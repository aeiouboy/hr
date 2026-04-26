// demo-seed.ts — hydrate workflow stores with realistic mock requests so
// personas don't land on empty inboxes during a fresh demo.
//
// Called once by AppShell on mount. Guards against duplicate seeding by
// checking if each store already has any requests.

import { useWorkflowApprovals, type ApprovalRequest } from '@/stores/workflow-approvals';
import { useLeaveApprovals, type LeaveRequest } from '@/stores/leave-approvals';
import { useTerminationApprovals, type TerminationRequest } from '@/stores/termination-approvals';
import { usePromotionApprovals, type PromotionRequest } from '@/stores/promotion-approvals';

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
    status: 'pending_spd',
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
    status: 'pending_spd',
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
    status: 'approved',
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

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LV-20260424-0900-A1BX',
    employeeId: 'EMP-0142',
    employeeName: 'กมลรัตน์ จันทร์แดง',
    leaveType: 'annual',
    startDate: '2026-05-02',
    endDate: '2026-05-04',
    reason: 'ท่องเที่ยวพักผ่อนกับครอบครัว',
    status: 'pending',
    submittedAt: '2026-04-24T09:00:00+07:00',
    audit: [
      {
        actorId: 'EMP-0142',
        actorName: 'กมลรัตน์ จันทร์แดง',
        action: 'submit',
        at: '2026-04-24T09:00:00+07:00',
      },
    ],
  },
  {
    id: 'LV-20260424-1030-B2CY',
    employeeId: 'EMP-0087',
    employeeName: 'ธนวัฒน์ สุขเกษม',
    leaveType: 'sick',
    startDate: '2026-04-25',
    endDate: '2026-04-25',
    reason: 'ไม่สบาย มีไข้',
    status: 'pending',
    submittedAt: '2026-04-24T10:30:00+07:00',
    audit: [
      {
        actorId: 'EMP-0087',
        actorName: 'ธนวัฒน์ สุขเกษม',
        action: 'submit',
        at: '2026-04-24T10:30:00+07:00',
      },
    ],
  },
  {
    id: 'LV-20260423-1400-C3DZ',
    employeeId: 'EMP-0031',
    employeeName: 'สมศรี พรมใจดี',
    leaveType: 'personal',
    startDate: '2026-04-28',
    endDate: '2026-04-28',
    reason: 'ธุระส่วนตัวสำคัญ ต้องไปติดต่อราชการ',
    status: 'pending',
    submittedAt: '2026-04-23T14:00:00+07:00',
    audit: [
      {
        actorId: 'EMP-0031',
        actorName: 'สมศรี พรมใจดี',
        action: 'submit',
        at: '2026-04-23T14:00:00+07:00',
      },
    ],
  },
];

const MOCK_TERMINATION_REQUESTS: TerminationRequest[] = [
  {
    // pending_manager — Manager will see this in quick-approve
    id: 'TR-20260424-0800-X1KM',
    employeeId: 'EMP-0055',
    employeeName: 'ประเสริฐ วัฒนชัย',
    requestedLastDay: '2026-05-31',
    reasonCode: 'TERM_RESIGN',
    reasonText: 'ได้รับข้อเสนองานใหม่ที่เหมาะสมกว่า ขอลาออกตามกำหนดแจ้งล่วงหน้า 30 วัน',
    status: 'pending_manager',
    submittedAt: '2026-04-24T08:00:00+07:00',
    submittedBy: { id: 'EMP-0055', name: 'ประเสริฐ วัฒนชัย', role: 'employee' },
    audit: [
      {
        actorRole: 'employee',
        actorName: 'ประเสริฐ วัฒนชัย',
        action: 'submit',
        at: '2026-04-24T08:00:00+07:00',
      },
    ],
  },
  {
    // pending_manager — second item in Manager inbox
    id: 'TR-20260423-1100-Y2NP',
    employeeId: 'EMP-0203',
    employeeName: 'อรณิชา ปานสุข',
    requestedLastDay: '2026-05-15',
    reasonCode: 'TERM_RETRIE',
    reasonText: 'เกษียณอายุตามครบกำหนด',
    status: 'pending_manager',
    submittedAt: '2026-04-23T11:00:00+07:00',
    submittedBy: { id: 'EMP-0203', name: 'อรณิชา ปานสุข', role: 'employee' },
    audit: [
      {
        actorRole: 'employee',
        actorName: 'อรณิชา ปานสุข',
        action: 'submit',
        at: '2026-04-23T11:00:00+07:00',
      },
    ],
  },
  {
    // pending_spd — already past Manager, SPD inbox will show this
    id: 'TR-20260422-0930-Z3QR',
    employeeId: 'EMP-0178',
    employeeName: 'วิชัย ศรีสุวรรณ',
    requestedLastDay: '2026-05-20',
    reasonCode: 'TERM_EOC',
    reasonText: 'ครบสัญญาจ้าง ไม่ต่อสัญญา',
    status: 'pending_spd',
    submittedAt: '2026-04-22T09:30:00+07:00',
    submittedBy: { id: 'EMP-0178', name: 'วิชัย ศรีสุวรรณ', role: 'employee' },
    audit: [
      {
        actorRole: 'employee',
        actorName: 'วิชัย ศรีสุวรรณ',
        action: 'submit',
        at: '2026-04-22T09:30:00+07:00',
      },
      {
        actorRole: 'manager',
        actorName: 'สมชาย หัวหน้าทีม',
        action: 'approve',
        comment: 'รับทราบ ยืนยันการสิ้นสุดสัญญา',
        at: '2026-04-22T11:15:00+07:00',
      },
    ],
  },
  {
    // approved — history record
    id: 'TR-20260420-1400-W4ST',
    employeeId: 'EMP-0091',
    employeeName: 'นภาพร จิตรดา',
    requestedLastDay: '2026-05-05',
    reasonCode: 'TERM_RESIGN',
    status: 'approved',
    submittedAt: '2026-04-20T14:00:00+07:00',
    submittedBy: { id: 'EMP-0091', name: 'นภาพร จิตรดา', role: 'employee' },
    audit: [
      {
        actorRole: 'employee',
        actorName: 'นภาพร จิตรดา',
        action: 'submit',
        at: '2026-04-20T14:00:00+07:00',
      },
      {
        actorRole: 'manager',
        actorName: 'สมชาย หัวหน้าทีม',
        action: 'approve',
        at: '2026-04-21T09:00:00+07:00',
      },
      {
        actorRole: 'spd',
        actorName: 'ดารณี ล. (SPD)',
        action: 'approve',
        comment: 'ยืนยันการลาออก เอกสารครบถ้วน',
        at: '2026-04-21T14:30:00+07:00',
      },
    ],
  },
];

const MOCK_PROMOTION_REQUESTS: PromotionRequest[] = [
  {
    id: 'PM-20260424-0930-D4HK',
    employeeId: 'EMP-0142',
    employeeName: 'กมลรัตน์ จันทร์แดง',
    fromPosition: 'HR Officer',
    toPosition: 'HR Senior Officer',
    effectiveDate: '2026-06-01',
    salaryDelta: 12,
    notes: 'ผลประเมินดีเยี่ยม 3 ปีติดต่อกัน',
    status: 'pending_spd',
    submittedAt: '2026-04-24T09:30:00+07:00',
    submittedBy: { id: 'ADM001', name: 'สมชาย HR Admin', role: 'hr_admin' },
    audit: [
      {
        actorRole: 'hr_admin',
        actorName: 'สมชาย HR Admin',
        action: 'submit',
        at: '2026-04-24T09:30:00+07:00',
      },
    ],
  },
  {
    id: 'PM-20260423-1145-E5JM',
    employeeId: 'EMP-0087',
    employeeName: 'ธนวัฒน์ สุขเกษม',
    fromPosition: 'Finance Analyst',
    toPosition: 'Finance Senior Analyst',
    effectiveDate: '2026-05-01',
    salaryDelta: 15,
    status: 'pending_spd',
    submittedAt: '2026-04-23T11:45:00+07:00',
    submittedBy: { id: 'ADM001', name: 'สมชาย HR Admin', role: 'hr_admin' },
    audit: [
      {
        actorRole: 'hr_admin',
        actorName: 'สมชาย HR Admin',
        action: 'submit',
        at: '2026-04-23T11:45:00+07:00',
      },
    ],
  },
];

let seeded = false;

/** Seed all workflow stores once per browser session if stores are empty.
 *  Safe to call multiple times — idempotent via `seeded` flag + empty checks. */
export function ensureDemoSeed(): void {
  if (seeded) return;
  seeded = true;

  const workflowState = useWorkflowApprovals.getState();
  if (workflowState.requests.length === 0) {
    useWorkflowApprovals.setState({ requests: MOCK_REQUESTS });
  }

  const leaveState = useLeaveApprovals.getState();
  if (leaveState.requests.length === 0) {
    useLeaveApprovals.setState({ requests: MOCK_LEAVE_REQUESTS });
  }

  const terminationState = useTerminationApprovals.getState();
  if (terminationState.requests.length === 0) {
    useTerminationApprovals.setState({ requests: MOCK_TERMINATION_REQUESTS });
  }

  const promotionState = usePromotionApprovals.getState();
  if (promotionState.requests.length === 0) {
    usePromotionApprovals.setState({ requests: MOCK_PROMOTION_REQUESTS });
  }
}

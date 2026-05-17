export type NotificationChannel = 'in_app' | 'email' | 'sms';
export type NotificationStatus = 'active' | 'inactive';
export type NotificationTrigger =
  | 'leave_submitted'
  | 'leave_approved'
  | 'leave_rejected'
  | 'overtime_submitted'
  | 'overtime_approved'
  | 'overtime_rejected'
  | 'claim_submitted'
  | 'claim_approved'
  | 'claim_rejected'
  | 'transfer_submitted'
  | 'transfer_approved'
  | 'probation_due'
  | 'contract_expiry'
  | 'resignation_submitted';

export interface NotificationTemplate {
  id: string;
  trigger: NotificationTrigger;
  triggerLabelTh: string;
  triggerLabelEn: string;
  channel: NotificationChannel;
  status: NotificationStatus;
}

export interface InAppNotification {
  id: string;
  titleTh: string;
  titleEn: string;
  bodyTh: string;
  bodyEn: string;
  href: string;
  read: boolean;
  createdAt: string;
}

export const MOCK_NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  { id: 'NT-001', trigger: 'leave_submitted',      triggerLabelTh: 'ยื่นคำขอลา',            triggerLabelEn: 'Leave Submitted',         channel: 'in_app', status: 'active' },
  { id: 'NT-002', trigger: 'leave_submitted',      triggerLabelTh: 'ยื่นคำขอลา',            triggerLabelEn: 'Leave Submitted',         channel: 'email',  status: 'active' },
  { id: 'NT-003', trigger: 'leave_approved',       triggerLabelTh: 'อนุมัติลา',              triggerLabelEn: 'Leave Approved',          channel: 'in_app', status: 'active' },
  { id: 'NT-004', trigger: 'leave_approved',       triggerLabelTh: 'อนุมัติลา',              triggerLabelEn: 'Leave Approved',          channel: 'email',  status: 'active' },
  { id: 'NT-005', trigger: 'leave_rejected',       triggerLabelTh: 'ปฏิเสธลา',               triggerLabelEn: 'Leave Rejected',          channel: 'in_app', status: 'active' },
  { id: 'NT-006', trigger: 'overtime_submitted',   triggerLabelTh: 'ยื่นคำขอล่วงเวลา',      triggerLabelEn: 'Overtime Submitted',      channel: 'in_app', status: 'active' },
  { id: 'NT-007', trigger: 'overtime_approved',    triggerLabelTh: 'อนุมัติล่วงเวลา',        triggerLabelEn: 'Overtime Approved',       channel: 'in_app', status: 'active' },
  { id: 'NT-008', trigger: 'overtime_approved',    triggerLabelTh: 'อนุมัติล่วงเวลา',        triggerLabelEn: 'Overtime Approved',       channel: 'email',  status: 'active' },
  { id: 'NT-009', trigger: 'overtime_rejected',    triggerLabelTh: 'ปฏิเสธล่วงเวลา',         triggerLabelEn: 'Overtime Rejected',       channel: 'in_app', status: 'inactive' },
  { id: 'NT-010', trigger: 'claim_submitted',      triggerLabelTh: 'ยื่นคำขอเบิก',           triggerLabelEn: 'Claim Submitted',         channel: 'in_app', status: 'active' },
  { id: 'NT-011', trigger: 'claim_submitted',      triggerLabelTh: 'ยื่นคำขอเบิก',           triggerLabelEn: 'Claim Submitted',         channel: 'email',  status: 'active' },
  { id: 'NT-012', trigger: 'claim_approved',       triggerLabelTh: 'อนุมัติเบิก',             triggerLabelEn: 'Claim Approved',          channel: 'in_app', status: 'active' },
  { id: 'NT-013', trigger: 'claim_rejected',       triggerLabelTh: 'ปฏิเสธเบิก',              triggerLabelEn: 'Claim Rejected',          channel: 'in_app', status: 'active' },
  { id: 'NT-014', trigger: 'claim_rejected',       triggerLabelTh: 'ปฏิเสธเบิก',              triggerLabelEn: 'Claim Rejected',          channel: 'sms',    status: 'inactive' },
  { id: 'NT-015', trigger: 'transfer_submitted',   triggerLabelTh: 'ยื่นคำขอโอนย้าย',        triggerLabelEn: 'Transfer Submitted',      channel: 'in_app', status: 'active' },
  { id: 'NT-016', trigger: 'transfer_approved',    triggerLabelTh: 'อนุมัติโอนย้าย',          triggerLabelEn: 'Transfer Approved',       channel: 'email',  status: 'active' },
  { id: 'NT-017', trigger: 'probation_due',        triggerLabelTh: 'ใกล้สิ้นสุดทดลองงาน',    triggerLabelEn: 'Probation Due',           channel: 'in_app', status: 'active' },
  { id: 'NT-018', trigger: 'probation_due',        triggerLabelTh: 'ใกล้สิ้นสุดทดลองงาน',    triggerLabelEn: 'Probation Due',           channel: 'email',  status: 'active' },
  { id: 'NT-019', trigger: 'contract_expiry',      triggerLabelTh: 'สัญญาใกล้หมดอายุ',       triggerLabelEn: 'Contract Expiry',         channel: 'in_app', status: 'active' },
  { id: 'NT-020', trigger: 'contract_expiry',      triggerLabelTh: 'สัญญาใกล้หมดอายุ',       triggerLabelEn: 'Contract Expiry',         channel: 'email',  status: 'inactive' },
  { id: 'NT-021', trigger: 'resignation_submitted',triggerLabelTh: 'ยื่นใบลาออก',            triggerLabelEn: 'Resignation Submitted',   channel: 'in_app', status: 'active' },
  { id: 'NT-022', trigger: 'resignation_submitted',triggerLabelTh: 'ยื่นใบลาออก',            triggerLabelEn: 'Resignation Submitted',   channel: 'email',  status: 'active' },
  { id: 'NT-023', trigger: 'leave_rejected',       triggerLabelTh: 'ปฏิเสธลา',               triggerLabelEn: 'Leave Rejected',          channel: 'email',  status: 'inactive' },
  { id: 'NT-024', trigger: 'overtime_rejected',    triggerLabelTh: 'ปฏิเสธล่วงเวลา',         triggerLabelEn: 'Overtime Rejected',       channel: 'email',  status: 'inactive' },
];

export const MOCK_IN_APP_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'N-001',
    titleTh: 'คำขอลาได้รับการอนุมัติ',
    titleEn: 'Leave Request Approved',
    bodyTh: 'สมชาย ใจดี ได้รับการอนุมัติวันลาพักร้อน 5 วัน',
    bodyEn: 'Somchai Jaidee — 5-day annual leave approved',
    href: '/th/quick-approve/WF-001',
    read: false,
    createdAt: '2026-05-02T08:30:00Z',
  },
  {
    id: 'N-002',
    titleTh: 'คำขอล่วงเวลาใหม่',
    titleEn: 'New Overtime Request',
    bodyTh: 'มณี สุขใจ ยื่นคำขอล่วงเวลา 3 ชม. — รอการอนุมัติ',
    bodyEn: 'Manee Sukjai submitted overtime 3 hrs — awaiting approval',
    href: '/th/quick-approve/WF-002',
    read: false,
    createdAt: '2026-05-02T07:15:00Z',
  },
  {
    id: 'N-003',
    titleTh: 'สัญญาใกล้หมดอายุ',
    titleEn: 'Contract Expiry Alert',
    bodyTh: 'สัญญาของ ประเสริฐ รุ่งเรือง จะหมดอายุใน 14 วัน',
    bodyEn: 'Prasert Rungrueang contract expires in 14 days',
    href: '/th/admin/employees/EMP004',
    read: false,
    createdAt: '2026-05-01T14:00:00Z',
  },
  {
    id: 'N-004',
    titleTh: 'ทดลองงานใกล้สิ้นสุด',
    titleEn: 'Probation Period Due',
    bodyTh: 'อนุชา พงษ์ไพร สิ้นสุดทดลองงานในวันที่ 15 พ.ค. 2026',
    bodyEn: 'Anucha Phongphai probation ends 15 May 2026',
    href: '/th/admin/employees/EMP006/probation',
    read: true,
    createdAt: '2026-04-30T09:00:00Z',
  },
  {
    id: 'N-005',
    titleTh: 'คำขอโอนย้ายรอการอนุมัติ',
    titleEn: 'Transfer Request Pending',
    bodyTh: 'รัตนา กิตติมา ยื่นคำขอโอนย้ายสาขา — ขั้นตอน SPD',
    bodyEn: 'Rattana Kittima branch transfer — awaiting SPD',
    href: '/th/quick-approve/WF-011',
    read: true,
    createdAt: '2026-04-29T11:30:00Z',
  },
  {
    id: 'N-006',
    titleTh: 'คำขอเบิกถูกปฏิเสธ',
    titleEn: 'Claim Rejected',
    bodyTh: 'คำขอเบิกค่าเดินทางของ กนกวรรณ สิงห์ทอง ถูกปฏิเสธ',
    bodyEn: 'Kanokwan Singthong travel claim rejected',
    href: '/th/quick-approve/WF-007',
    read: true,
    createdAt: '2026-04-28T16:45:00Z',
  },
  {
    id: 'N-007',
    titleTh: 'ยื่นใบลาออกใหม่',
    titleEn: 'Resignation Submitted',
    bodyTh: 'พนักงานยื่นใบลาออก — รอดำเนินการในระบบ',
    bodyEn: 'Employee submitted resignation — pending HR action',
    href: '/th/quick-approve',
    read: false,
    createdAt: '2026-04-27T10:00:00Z',
  },
];

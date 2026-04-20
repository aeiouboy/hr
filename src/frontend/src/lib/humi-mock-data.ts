// ════════════════════════════════════════════════════════════
// Humi — Mock HR Personas
// Realistic Thai corporate HR data (no retail personas)
// Used by: /home dashboard + /employees list
// ════════════════════════════════════════════════════════════

export type EmployeeStatus = 'active' | 'leave' | 'terminated';

export interface HumiEmployee {
  id: string;
  employeeCode: string;
  firstNameTh: string;
  lastNameTh: string;
  initials: string;
  position: string;
  department: string;
  status: EmployeeStatus;
  /** Tailwind-ish token class for avatar tint (reads tokens, not raw hex) */
  avatarTone: 'teal' | 'indigo' | 'sage' | 'butter' | 'ink';
}

export const HUMI_EMPLOYEES: HumiEmployee[] = [
  {
    id: 'emp-001',
    employeeCode: 'CG-0412',
    firstNameTh: 'วาสนา',
    lastNameTh: 'จิรวัฒน์',
    initials: 'วจ',
    position: 'ผู้จัดการฝ่ายทรัพยากรบุคคล',
    department: 'ทรัพยากรบุคคล',
    status: 'active',
    avatarTone: 'teal',
  },
  {
    id: 'emp-002',
    employeeCode: 'CG-0418',
    firstNameTh: 'อรุณ',
    lastNameTh: 'พงษ์ศิริ',
    initials: 'อพ',
    position: 'นักวิเคราะห์การเงินอาวุโส',
    department: 'การเงิน',
    status: 'active',
    avatarTone: 'indigo',
  },
  {
    id: 'emp-003',
    employeeCode: 'CG-0425',
    firstNameTh: 'ธนกร',
    lastNameTh: 'เลิศวงศ์',
    initials: 'ธล',
    position: 'วิศวกรซอฟต์แวร์อาวุโส',
    department: 'เทคโนโลยีสารสนเทศ',
    status: 'active',
    avatarTone: 'sage',
  },
  {
    id: 'emp-004',
    employeeCode: 'CG-0430',
    firstNameTh: 'ปิยะนุช',
    lastNameTh: 'สมบูรณ์',
    initials: 'ปส',
    position: 'เจ้าหน้าที่สรรหาและว่าจ้าง',
    department: 'ทรัพยากรบุคคล',
    status: 'leave',
    avatarTone: 'butter',
  },
  {
    id: 'emp-005',
    employeeCode: 'CG-0441',
    firstNameTh: 'กฤตนัย',
    lastNameTh: 'อินทรเดช',
    initials: 'กอ',
    position: 'ผู้อำนวยการฝ่ายกลยุทธ์',
    department: 'กลยุทธ์องค์กร',
    status: 'active',
    avatarTone: 'ink',
  },
  {
    id: 'emp-006',
    employeeCode: 'CG-0447',
    firstNameTh: 'สุพัตรา',
    lastNameTh: 'คงสุข',
    initials: 'สค',
    position: 'เจ้าหน้าที่บัญชี',
    department: 'การเงิน',
    status: 'active',
    avatarTone: 'teal',
  },
  {
    id: 'emp-007',
    employeeCode: 'CG-0453',
    firstNameTh: 'ณัฐพล',
    lastNameTh: 'ภักดีธรรม',
    initials: 'ณภ',
    position: 'หัวหน้าทีมพัฒนาองค์กร',
    department: 'ทรัพยากรบุคคล',
    status: 'active',
    avatarTone: 'indigo',
  },
  {
    id: 'emp-008',
    employeeCode: 'CG-0458',
    firstNameTh: 'มัลลิกา',
    lastNameTh: 'ธีรศักดิ์',
    initials: 'มธ',
    position: 'นักวิเคราะห์ข้อมูลอาวุโส',
    department: 'เทคโนโลยีสารสนเทศ',
    status: 'active',
    avatarTone: 'sage',
  },
  {
    id: 'emp-009',
    employeeCode: 'CG-0462',
    firstNameTh: 'รังสรรค์',
    lastNameTh: 'วัฒนธรรม',
    initials: 'รว',
    position: 'ผู้จัดการโครงการ',
    department: 'กลยุทธ์องค์กร',
    status: 'leave',
    avatarTone: 'butter',
  },
  {
    id: 'emp-010',
    employeeCode: 'CG-0471',
    firstNameTh: 'อัญชลี',
    lastNameTh: 'มงคลชัย',
    initials: 'อม',
    position: 'เจ้าหน้าที่ฝึกอบรมและพัฒนา',
    department: 'ทรัพยากรบุคคล',
    status: 'active',
    avatarTone: 'teal',
  },
  {
    id: 'emp-011',
    employeeCode: 'CG-0478',
    firstNameTh: 'พีรพัฒน์',
    lastNameTh: 'สุวรรณรัตน์',
    initials: 'พส',
    position: 'ที่ปรึกษากฎหมายองค์กร',
    department: 'กฎหมายและกำกับดูแล',
    status: 'active',
    avatarTone: 'ink',
  },
  {
    id: 'emp-012',
    employeeCode: 'CG-0484',
    firstNameTh: 'สมศักดิ์',
    lastNameTh: 'ธรรมเจริญ',
    initials: 'สธ',
    position: 'อดีตเจ้าหน้าที่ธุรการ',
    department: 'ธุรการกลาง',
    status: 'terminated',
    avatarTone: 'ink',
  },
];

/** Pending approval requests for dashboard. References employees above. */
export interface HumiApprovalRequest {
  id: string;
  employeeId: string;
  type: 'leave-vacation' | 'leave-sick' | 'expense' | 'overtime';
  typeLabel: string;
  dateRangeLabel: string;
  submittedLabel: string;
}

export const HUMI_PENDING_REQUESTS: HumiApprovalRequest[] = [
  {
    id: 'req-1',
    employeeId: 'emp-004',
    type: 'leave-vacation',
    typeLabel: 'ลาพักร้อน',
    dateRangeLabel: '28 เม.ย. – 2 พ.ค.',
    submittedLabel: 'ยื่นเมื่อวาน',
  },
  {
    id: 'req-2',
    employeeId: 'emp-009',
    type: 'leave-sick',
    typeLabel: 'ลาป่วย',
    dateRangeLabel: 'พรุ่งนี้',
    submittedLabel: '1 ชม. ที่แล้ว',
  },
  {
    id: 'req-3',
    employeeId: 'emp-002',
    type: 'expense',
    typeLabel: 'เบิกค่าใช้จ่าย',
    dateRangeLabel: '฿ 8,450',
    submittedLabel: '3 ชม. ที่แล้ว',
  },
  {
    id: 'req-4',
    employeeId: 'emp-007',
    type: 'overtime',
    typeLabel: 'ขอทำงานล่วงเวลา',
    dateRangeLabel: '24 เม.ย. · 4 ชม.',
    submittedLabel: 'วันนี้',
  },
];

/** Recent activity timeline items for dashboard. */
export interface HumiActivityItem {
  id: string;
  title: string;
  timeLabel: string;
  tone: 'success' | 'accent' | 'warning' | 'muted';
}

export const HUMI_RECENT_ACTIVITY: HumiActivityItem[] = [
  {
    id: 'act-1',
    title: 'คำขอลาพักร้อนของวาสนา จิรวัฒน์ ได้รับอนุมัติ',
    timeLabel: 'วันนี้ 09:42',
    tone: 'success',
  },
  {
    id: 'act-2',
    title: 'สลิปเงินเดือนประจำเดือนมีนาคม 2569 พร้อมใช้งาน',
    timeLabel: 'เมื่อวาน 08:00',
    tone: 'accent',
  },
  {
    id: 'act-3',
    title: 'คำขอเบิกค่าใช้จ่ายของอรุณ พงษ์ศิริ รอการอนุมัติ',
    timeLabel: '5 เม.ย. 2569',
    tone: 'warning',
  },
  {
    id: 'act-4',
    title: 'อัปเดตนโยบายการทำงานแบบผสมผสานเรียบร้อยแล้ว',
    timeLabel: '3 เม.ย. 2569',
    tone: 'muted',
  },
  {
    id: 'act-5',
    title: 'บันทึกคำขอลาป่วย 1 วัน ของปิยะนุช สมบูรณ์',
    timeLabel: '28 มี.ค. 2569',
    tone: 'muted',
  },
];

/** Dashboard KPI tiles. Values in Thai. */
export interface HumiKpi {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaTone?: 'up' | 'down' | 'neutral';
}

export const HUMI_KPIS: HumiKpi[] = [
  {
    id: 'kpi-headcount',
    label: 'พนักงานทั้งหมด',
    value: '1,284',
    delta: '+12 คน เดือนนี้',
    deltaTone: 'up',
  },
  {
    id: 'kpi-present',
    label: 'มาทำงานวันนี้',
    value: '1,147',
    delta: '89% ของทั้งหมด',
    deltaTone: 'neutral',
  },
  {
    id: 'kpi-pending',
    label: 'คำขอรออนุมัติ',
    value: '8',
    delta: '2 รายการใกล้ครบกำหนด',
    deltaTone: 'down',
  },
  {
    id: 'kpi-my-leave',
    label: 'วันลาคงเหลือ (ของฉัน)',
    value: '12.5',
    delta: 'จาก 15 วันต่อปี',
    deltaTone: 'neutral',
  },
];

/** "My leave" mini summary card data. */
export const HUMI_MY_LEAVE = {
  annualRemaining: 12.5,
  annualTotal: 15,
  sickRemaining: 27,
  sickTotal: 30,
  personalRemaining: 2,
  personalTotal: 3,
};

/** "Latest payroll" mini summary card data. */
export const HUMI_LATEST_PAYROLL = {
  periodLabel: 'มีนาคม 2569',
  netAmountLabel: '฿ 78,450.00',
  payDateLabel: '31 มี.ค. 2569',
  status: 'paid' as const,
};

/** Tone → Tailwind className mapping for avatars (tokens only, no raw hex). */
export const AVATAR_TONE_CLASS: Record<HumiEmployee['avatarTone'], string> = {
  teal: 'bg-accent-soft text-ink',
  indigo: 'bg-accent-alt-soft text-ink',
  sage: 'bg-[color:var(--color-sage-soft)] text-ink',
  butter: 'bg-[color:var(--color-butter-soft)] text-ink',
  ink: 'bg-ink text-canvas',
};

/** Status → badge tone/label mapping. */
export const STATUS_META: Record<
  EmployeeStatus,
  { label: string; toneClass: string }
> = {
  active: {
    label: 'ทำงาน',
    toneClass:
      'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  },
  leave: {
    label: 'ลา',
    toneClass: 'bg-warning-soft text-[color:var(--color-warning)]',
  },
  terminated: {
    label: 'พ้นสภาพ',
    toneClass:
      'bg-danger-soft text-[color:var(--color-danger-ink)]',
  },
};

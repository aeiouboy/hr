// ════════════════════════════════════════════════════════════
// Humi — Mock HR Personas
// Realistic Thai corporate HR data (no retail personas)
// Used by: /home dashboard + /employees list
// ════════════════════════════════════════════════════════════

import {
  calcYearOfService,
  calcYearsInJob,
  calcYearsInPosition,
  calcYearsInBU,
  calcYearsInCorpTitle,
} from './calculations'
import type { LifecycleEvent } from './calculations'

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

// ════════════════════════════════════════════════════════════
// Learning Directory (A12) — courses, certifications, team
// Ref: screens/learning_directory.jsx — retail → generic HR
// ════════════════════════════════════════════════════════════

export type LearningCourseTag = 'required' | 'live' | 'self' | 'assigned';
export type LearningCourseIcon =
  | 'shield'
  | 'coffee'
  | 'people'
  | 'plug'
  | 'mega'
  | 'heart';

export interface HumiLearningCourse {
  id: string;
  title: string;
  detailLabel: string; // "บังคับ · 25 นาที"
  statusLabel: string; // "ครบกำหนด 30 เม.ย."
  tag?: LearningCourseTag;
  tag_label?: string;
  tone: 'teal' | 'sage' | 'butter' | 'coral' | 'ink';
  icon: LearningCourseIcon;
  actionLabel: string; // "เริ่ม" / "เรียนต่อ"
}

export const HUMI_LEARNING_PATH = {
  eyebrow: 'เส้นทางของคุณ',
  title: 'ผู้นำฝ่ายบุคคล — ปีที่ 1',
  progressLabel: 'เรียนจบ 5 จาก 11 โมดูล · เหลือ 2.3 ชม. ในเดือนนี้',
  progressPct: 45,
  ctaLabel: 'เรียนต่อ',
} as const;

export const HUMI_LEARNING_CERTIFICATIONS: Array<{
  name: string;
  expiryLabel: string;
  tone: 'sage' | 'butter' | 'teal';
}> = [
  {
    name: 'ปฐมพยาบาลเบื้องต้น',
    expiryLabel: 'หมดอายุ ต.ค. 2570',
    tone: 'sage',
  },
  {
    name: 'ความปลอดภัยในการทำงาน',
    expiryLabel: 'หมดอายุ ก.พ. 2569',
    tone: 'butter',
  },
  {
    name: 'การลดความขัดแย้ง',
    expiryLabel: 'ออกเมื่อ มี.ค. 2568',
    tone: 'teal',
  },
];

export const HUMI_LEARNING_TEAM_READINESS = {
  eyebrow: 'ความพร้อมด้านกฎระเบียบ',
  title: 'ตรงเวลา 100%',
  subtitle: 'ไม่มีการอบรมล่าช้าในทีมของคุณ',
  teamInitials: [
    { initials: 'วจ', tone: 'teal' as const },
    { initials: 'อพ', tone: 'butter' as const },
    { initials: 'ธล', tone: 'sage' as const },
    { initials: 'กอ', tone: 'ink' as const },
    { initials: 'อม', tone: 'teal' as const },
  ],
};

export const HUMI_LEARNING_COURSES: HumiLearningCourse[] = [
  {
    id: 'course-1',
    title: 'ทบทวนการต่อต้านการคุกคามประจำปี 2568',
    detailLabel: 'บังคับ · 25 นาที',
    statusLabel: 'ครบกำหนด 30 เม.ย.',
    tag: 'required',
    tag_label: 'บังคับ',
    tone: 'butter',
    icon: 'shield',
    actionLabel: 'เริ่ม',
  },
  {
    id: 'course-2',
    title: 'ต่ออายุใบรับรองความปลอดภัย',
    detailLabel: 'บังคับ · 45 นาที',
    statusLabel: 'ครบกำหนด 12 พ.ค.',
    tag: 'required',
    tag_label: 'บังคับ',
    tone: 'sage',
    icon: 'coffee',
    actionLabel: 'เริ่ม',
  },
  {
    id: 'course-3',
    title: 'การโค้ชสำหรับหัวหน้าทีม',
    detailLabel: 'ได้รับมอบหมาย · 1 ชม. 20 นาที',
    statusLabel: 'โมดูล 3 จาก 6',
    tone: 'teal',
    icon: 'people',
    actionLabel: 'เรียนต่อ',
  },
  {
    id: 'course-4',
    title: 'ระบบ HRIS สำหรับผู้จัดการ (ใหม่)',
    detailLabel: 'เรียนเอง · 15 นาที',
    statusLabel: 'ยังไม่เริ่ม',
    tone: 'teal',
    icon: 'plug',
    actionLabel: 'เริ่ม',
  },
  {
    id: 'course-5',
    title: 'การสนทนาเรื่องยากกับพนักงาน',
    detailLabel: 'เวิร์คช็อป · 2 ชั่วโมง',
    statusLabel: 'ไลฟ์ · 6 พ.ค. 13:00',
    tag: 'live',
    tag_label: 'ไลฟ์',
    tone: 'teal',
    icon: 'mega',
    actionLabel: 'เริ่ม',
  },
  {
    id: 'course-6',
    title: 'ความหลากหลายและการมีส่วนร่วม',
    detailLabel: 'เรียนเอง · 35 นาที',
    statusLabel: 'เรียนจบ 50%',
    tone: 'sage',
    icon: 'heart',
    actionLabel: 'เรียนต่อ',
  },
];

// ════════════════════════════════════════════════════════════
// Org Chart (A13) — nodes for reference visual layout
// ════════════════════════════════════════════════════════════

export type HumiOrgTone = 'teal' | 'sage' | 'butter' | 'ink' | 'coral';

export interface HumiOrgPerson {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
  tone: HumiOrgTone;
  managerId: string | null;
  reportIds: string[];
  email?: string;
  phone?: string;
  tenure?: string;
  location?: string;
  timezone?: string;
  title?: string;
  hiredOn?: string;
  employmentType?: string;
  grade?: string;
  costCenter?: string;
  compensation?: string;
  language?: string;
  skills?: string[];
  goals?: Array<{ label: string; progress: number }>;
  certifications?: Array<{
    name: string;
    status: string;
    tone: 'sage' | 'butter' | 'teal';
  }>;
  upcoming?: Array<{ title: string; detail: string }>;
  reviewSummary?: string;
  leaveRemaining?: string;
  hrNote?: string;
}

export const HUMI_ORG_PEOPLE: Record<string, HumiOrgPerson> = {
  grace: {
    id: 'grace',
    name: 'วาสนา จิรวัฒน์',
    role: 'ประธานเจ้าหน้าที่ฝ่ายบุคคล',
    department: 'สำนักงานใหญ่ · กรุงเทพฯ',
    initials: 'วจ',
    tone: 'ink',
    managerId: null,
    reportIds: ['jordan_m'],
    email: 'wassana.j@central.co.th',
    phone: '02-555-0101',
    tenure: '4 ปี 2 เดือน',
    location: 'กรุงเทพฯ',
    timezone: 'ICT (UTC+7)',
    title: 'CHRO · ผู้บริหาร',
  },
  jordan_m: {
    id: 'jordan_m',
    name: 'ณัฐพล ภักดีธรรม',
    role: 'พันธมิตรฝ่ายบุคคล',
    department: 'สำนักงานใหญ่ · กรุงเทพฯ',
    initials: 'ณภ',
    tone: 'sage',
    managerId: 'grace',
    reportIds: ['dana', 'simone'],
    email: 'nuttapol.p@central.co.th',
    phone: '02-555-0112',
    tenure: '2 ปี 6 เดือน',
    location: 'กรุงเทพฯ',
    timezone: 'ICT (UTC+7)',
    title: 'People Operations',
  },
  dana: {
    id: 'dana',
    name: 'ปิยะ ชัยวัฒน์',
    role: 'ผู้จัดการฝ่ายเขตกลาง',
    department: 'เขตทองหล่อ',
    initials: 'ปช',
    tone: 'butter',
    managerId: 'jordan_m',
    reportIds: ['ava', 'jess', 'amir'],
    email: 'piya.c@central.co.th',
    phone: '02-555-0133',
    tenure: '3 ปี 8 เดือน',
    location: 'กรุงเทพฯ',
    timezone: 'ICT',
    title: 'ผู้จัดการเขต',
  },
  simone: {
    id: 'simone',
    name: 'พรทิพย์ เจริญสุข',
    role: 'ผู้จัดการฝ่ายเขตตะวันตก',
    department: 'เขตตะวันตก',
    initials: 'พจ',
    tone: 'teal',
    managerId: 'jordan_m',
    reportIds: [],
    email: 'porntip.j@central.co.th',
  },
  ava: {
    id: 'ava',
    name: 'จงรักษ์ ทานากะ',
    role: 'ผู้จัดการสำนักงาน II',
    department: 'สาขาทองหล่อ',
    initials: 'จท',
    tone: 'butter',
    managerId: 'dana',
    reportIds: ['marcus', 'priya', 'taylor', 'jordan_n'],
    email: 'chongrak.t@central.co.th',
  },
  jess: {
    id: 'jess',
    name: 'อรุณ พงษ์ศิริ',
    role: 'ผู้จัดการสำนักงาน',
    department: 'สาขาสีลม',
    initials: 'อพ',
    tone: 'teal',
    managerId: 'dana',
    reportIds: [],
  },
  amir: {
    id: 'amir',
    name: 'กฤตนัย อินทรเดช',
    role: 'ผู้จัดการสำนักงาน',
    department: 'สาขาอารีย์',
    initials: 'กอ',
    tone: 'butter',
    managerId: 'dana',
    reportIds: [],
  },
  marcus: {
    id: 'marcus',
    name: 'มาร์คัส เคลลี่',
    role: 'หัวหน้ากะ',
    department: 'สาขาทองหล่อ',
    initials: 'มค',
    tone: 'teal',
    managerId: 'ava',
    reportIds: [],
    email: 'marcus.k@central.co.th',
    phone: '02-555-0177',
    title: 'หัวหน้ากะ · ปฏิบัติการหน้างาน',
    tenure: '1 ปี 9 เดือน',
    location: 'กรุงเทพฯ',
    timezone: 'ICT (UTC+7)',
    hiredOn: '14 ก.ค. 2567',
    employmentType: 'เต็มเวลา · รายชั่วโมง',
    grade: 'R-04',
    costCenter: 'RTL-THL-0412',
    compensation: '฿680,000 / ปี · ฿320/ชม.',
    language: 'ไทย, อังกฤษ',
    skills: [
      'จัดการเงินสด',
      'ดูแลคลังและเบิกจ่าย',
      'เทรนพนักงานใหม่',
      'ตรวจนับสต็อก',
      'ใช้งานระบบ POS',
    ],
    goals: [
      { label: 'เรียนจบใบรับรอง LEAD-101', progress: 80 },
      { label: 'ติดตามการเปิดสาขา 3 ครั้งกับจงรักษ์', progress: 66 },
      { label: 'นำทีมวันตรวจนับสต็อกเสาร์', progress: 100 },
    ],
    certifications: [
      { name: 'ปฐมพยาบาลเบื้องต้น (L1)', status: 'ยังใช้ได้', tone: 'sage' },
      { name: 'ป้องกันการสูญเสีย 2568', status: 'ยังใช้ได้', tone: 'sage' },
      { name: 'ความปลอดภัยในการทำงาน', status: 'ต่ออายุภายใน ส.ค.', tone: 'butter' },
    ],
    upcoming: [
      { title: '1:1 กับ จงรักษ์', detail: 'พฤ. 24 เม.ย. · 11:00' },
      { title: 'เตรียมตรวจนับสต็อก', detail: 'ศ. 25 เม.ย. · 09:00' },
      { title: 'ประเมินจบทดลองงาน', detail: '1 พ.ค.' },
    ],
    reviewSummary: 'ดีเกินคาด · ครึ่งปีหลัง 2567',
    leaveRemaining: 'เหลือ 6.5 วัน',
    hrNote:
      'เลื่อนตำแหน่งจากพนักงานอาวุโสเมื่อ ม.ค. 2568 ถูกคัดเลือกเข้าสายผู้จัดการสาขา ภายในสิ้นปี 2570',
  },
  priya: {
    id: 'priya',
    name: 'พริยะ ชาห์',
    role: 'พนักงานอาวุโส',
    department: 'สาขาทองหล่อ',
    initials: 'พช',
    tone: 'butter',
    managerId: 'ava',
    reportIds: [],
  },
  taylor: {
    id: 'taylor',
    name: 'เทย์เลอร์ ซิมส์',
    role: 'พนักงาน',
    department: 'สาขาทองหล่อ',
    initials: 'ทซ',
    tone: 'sage',
    managerId: 'ava',
    reportIds: [],
  },
  jordan_n: {
    id: 'jordan_n',
    name: 'จอร์แดน ไนแลนด์',
    role: 'พนักงาน',
    department: 'สาขาทองหล่อ',
    initials: 'จน',
    tone: 'ink',
    managerId: 'ava',
    reportIds: [],
  },
};

// ════════════════════════════════════════════════════════════
// Integrations (A14) — system connectors
// ════════════════════════════════════════════════════════════

export type IntegrationStatus = 'connected' | 'available';
export type IntegrationShape =
  | 'square'
  | 'circle'
  | 'triangle'
  | 'bars'
  | 'split'
  | 'diamond';
export type IntegrationCategory =
  | 'all'
  | 'hris'
  | 'payroll'
  | 'schedule'
  | 'comms'
  | 'benefits'
  | 'training';

export interface HumiIntegration {
  id: string;
  name: string;
  category: Exclude<IntegrationCategory, 'all'>;
  description: string;
  status: IntegrationStatus;
  /** Reference visual shape inside the colored mark */
  shape: IntegrationShape;
  /** Humi token name (not raw hex) */
  markToneClass: string;
}

export const HUMI_INTEGRATION_CATEGORIES: Array<{
  key: IntegrationCategory;
  label: string;
}> = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'hris', label: 'HRIS' },
  { key: 'payroll', label: 'ระบบเงินเดือน' },
  { key: 'schedule', label: 'จัดตารางกะ' },
  { key: 'comms', label: 'การสื่อสาร' },
  { key: 'benefits', label: 'สวัสดิการ' },
  { key: 'training', label: 'ฝึกอบรม' },
];

export const HUMI_INTEGRATIONS: HumiIntegration[] = [
  {
    id: 'int-workday',
    name: 'Workday HRIS',
    category: 'hris',
    description: 'ซิงค์ข้อมูลพนักงานและโครงสร้างองค์กรกับระบบกลาง',
    status: 'connected',
    shape: 'square',
    markToneClass: 'bg-ink',
  },
  {
    id: 'int-payroll-cloud',
    name: 'PayrollCloud TH',
    category: 'payroll',
    description: 'ส่งชั่วโมงที่อนุมัติแล้วและรายการหักเข้าระบบเงินเดือน',
    status: 'connected',
    shape: 'bars',
    markToneClass: 'bg-ink',
  },
  {
    id: 'int-slack',
    name: 'Slack',
    category: 'comms',
    description: 'ส่งประกาศและแจ้งเตือนเข้าช่องของทีมอัตโนมัติ',
    status: 'connected',
    shape: 'circle',
    markToneClass: 'bg-[color:var(--color-accent)]',
  },
  {
    id: 'int-tempo',
    name: 'Tempo Scheduling',
    category: 'schedule',
    description: 'ข้อมูลการลาไหลเข้าปฏิทินกะงานของทีมโดยอัตโนมัติ',
    status: 'available',
    shape: 'triangle',
    markToneClass: 'bg-[color:var(--color-sage)]',
  },
  {
    id: 'int-pulse',
    name: 'PeoplePulse Analytics',
    category: 'hris',
    description: 'เปรียบเทียบ headcount กับผลลัพธ์ทีมในแดชบอร์ดเดียว',
    status: 'available',
    shape: 'split',
    markToneClass: 'bg-[color:var(--color-butter)]',
  },
  {
    id: 'int-bookwise',
    name: 'BookWise Payroll',
    category: 'payroll',
    description: 'ยื่นภาษีผ่านนักบัญชีของคุณโดยตรง',
    status: 'available',
    shape: 'diamond',
    markToneClass: 'bg-[color:var(--color-ink-soft)]',
  },
  {
    id: 'int-benefit-broker',
    name: 'Benefit Broker',
    category: 'benefits',
    description: 'ซิงค์การลงทะเบียนและการเปลี่ยนแปลงข้อมูลประกันกลุ่ม',
    status: 'available',
    shape: 'circle',
    markToneClass: 'bg-[color:var(--color-accent)]',
  },
  {
    id: 'int-learnfloor',
    name: 'LearnFloor LMS',
    category: 'training',
    description: 'มอบหมายหลักสูตรและติดตามใบรับรองสำหรับพนักงานใหม่',
    status: 'available',
    shape: 'square',
    markToneClass: 'bg-[color:var(--color-sage)]',
  },
  {
    id: 'int-google',
    name: 'Google Workspace',
    category: 'comms',
    description: 'SSO สำหรับผู้จัดการและพนักงานสำนักงานใหญ่',
    status: 'connected',
    shape: 'split',
    markToneClass: 'bg-[color:var(--color-ink-muted)]',
  },
];

export const HUMI_INTEGRATION_KPIS = [
  { key: 'connected', label: 'เชื่อมต่อแล้ว', value: '4', accentClass: 'bg-accent' },
  {
    key: 'syncing',
    label: 'กำลังซิงค์',
    value: '2',
    accentClass: 'bg-[color:var(--color-warning)]',
  },
  {
    key: 'events',
    label: 'เหตุการณ์วันนี้',
    value: '284',
    accentClass: 'bg-[color:var(--color-sage)]',
  },
  {
    key: 'time-saved',
    label: 'ประหยัดต่อสัปดาห์',
    value: '6.3 ชม.',
    accentClass: 'bg-[color:var(--color-butter)]',
  },
] as const;

// ════════════════════════════════════════════════════════════
// Home hero — team presence + on-deck docs + birthdays + cal.
// Ported from screens/home.jsx adapted retail → HR generic.
// ════════════════════════════════════════════════════════════

export const HUMI_TODAY_PRESENCE = {
  workingCount: 1147,
  totalCount: 1284,
  present: 1147,
  absent: 46,
  offShift: 91,
  teamInitials: ['วจ', 'อพ', 'ธล', 'ปส', 'กอ'] as const,
  moreLabel: '+ อีก 6 คนออนไลน์',
};

export interface HumiDocItem {
  id: string;
  title: string;
  sub: string;
  nearDue?: boolean;
  tagTone?: 'butter' | 'sage';
}

export const HUMI_PENDING_DOCS: HumiDocItem[] = [
  {
    id: 'doc-benefits',
    title: 'ลงทะเบียนสวัสดิการประจำปี 2569',
    sub: 'ครบกำหนดใน 6 วัน',
    nearDue: true,
    tagTone: 'butter',
  },
  {
    id: 'doc-wfh',
    title: 'นโยบายการทำงานแบบผสมผสานฉบับใหม่',
    sub: 'รับทราบและลงนาม',
    tagTone: 'sage',
  },
];

export const HUMI_WEEK_RECOGNITION = {
  eyebrow: 'สัปดาห์นี้',
  title: 'วันเกิด 2 คน · ครบรอบทำงาน 1 คน',
  initials: [
    { i: 'ธล', tone: 'teal' as const },
    { i: 'อพ', tone: 'butter' as const },
    { i: 'มธ', tone: 'sage' as const },
  ],
};

export interface HumiCalEvent {
  id: string;
  title: string;
  timeLabel: string;
  tone: 'accent' | 'warning';
}

export const HUMI_CAL_EVENTS: HumiCalEvent[] = [
  {
    id: 'cal-1',
    title: 'สัมมนาทีมผู้จัดการองค์กร',
    timeLabel: 'ศ. 25 · 09:00–14:00',
    tone: 'accent',
  },
  {
    id: 'cal-2',
    title: 'ปิยะนุช ส. — ลาคลอด',
    timeLabel: '28 เม.ย. – 2 พ.ค.',
    tone: 'warning',
  },
];

// ════════════════════════════════════════════════════════════
// Announcements feed — company / department posts.
// ════════════════════════════════════════════════════════════

export type HumiAnnouncementKind = 'ops' | 'policy' | 'recog';

export interface HumiAnnouncement {
  id: string;
  author: string;
  authorInitials: string;
  authorTone: 'teal' | 'sage' | 'butter' | 'ink';
  channel: string;
  timeLabel: string;
  title: string;
  body: string;
  reactions: string[];
  comments: number;
  kind: HumiAnnouncementKind;
  pinned?: boolean;
}

export const HUMI_ANNOUNCEMENTS: HumiAnnouncement[] = [
  {
    id: 'ann-1',
    author: 'ฝ่ายปฏิบัติการองค์กร',
    authorInitials: 'ปก',
    authorTone: 'teal',
    channel: 'ทุกแผนก',
    timeLabel: '2 ชม. ที่แล้ว',
    title: 'ตรวจสุขภาพประจำปี — เสาร์ 9 โมงเช้า',
    body: 'สำนักงานใหญ่จัดตรวจสุขภาพฟรีให้พนักงานทุกแผนกในวันเสาร์ กรุณาลงทะเบียนในระบบก่อนวันพฤหัสบดี มีอาหารว่างและเครื่องดื่มระหว่างตรวจ',
    reactions: ['👍 14', '🙌 6', '🥗 3'],
    comments: 8,
    kind: 'ops',
    pinned: true,
  },
  {
    id: 'ann-2',
    author: 'จริยา เมธี · ฝ่ายทรัพยากรบุคคล',
    authorInitials: 'จม',
    authorTone: 'sage',
    channel: 'ทั้งองค์กร',
    timeLabel: 'เมื่อวาน',
    title: 'นโยบายลาคลอดฉบับปรับปรุงเริ่มใช้ 1 พฤษภาคม',
    body: 'เราขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยได้รับค่าจ้างเต็มทุกสายงาน เซสชันถามตอบวันพฤหัสบดี 15:00 น. ลิงก์จะส่งทางอีเมลในเช้าพรุ่งนี้',
    reactions: ['❤️ 42', '🎉 21', '👏 9'],
    comments: 14,
    kind: 'policy',
  },
  {
    id: 'ann-3',
    author: 'ดารณี ล. · ผู้อำนวยการสายงาน',
    authorInitials: 'ดล',
    authorTone: 'butter',
    channel: 'ฝ่ายกลยุทธ์',
    timeLabel: 'วันจันทร์',
    title: 'ทีมเด่นประจำเดือนเมษายน: ฝ่ายกลยุทธ์ลดเวลาอนุมัติสูงสุด',
    body: 'ขอบคุณทีมกลยุทธ์องค์กรทุกคน — เราลดเวลาเฉลี่ยการอนุมัติข้อเสนอโครงการลง 31% เทียบกับเดือนมีนาคม เลี้ยงอาหารค่ำวันศุกร์หลังเลิกงาน ตอบกลับเพื่อยืนยันการเข้าร่วม',
    reactions: ['🎉 34', '❤️ 12'],
    comments: 22,
    kind: 'recog',
  },
  {
    id: 'ann-4',
    author: 'ฝ่ายไอทีและระบบ',
    authorInitials: 'ไอ',
    authorTone: 'ink',
    channel: 'ทุกแผนก',
    timeLabel: '18 เม.ย.',
    title: 'ช่วงเวลาบำรุงรักษาระบบ HRIS — อังคาร 02:00–04:00 น.',
    body: 'ไม่กระทบการใช้งานส่วนใหญ่ รายงานและการอนุมัติย้อนหลังอาจใช้งานไม่ได้ชั่วคราว แนะนำให้ยื่นคำขอก่อนช่วงเวลาดังกล่าว',
    reactions: ['👍 6'],
    comments: 1,
    kind: 'ops',
  },
];

export interface HumiChannel {
  id: string;
  name: string;
  size: string;
  tone: 'teal' | 'butter' | 'sage';
}

export const HUMI_CHANNELS: HumiChannel[] = [
  { id: 'ch-all', name: 'ทั้งองค์กร', size: '1,284 คน', tone: 'teal' },
  { id: 'ch-hr', name: 'ฝ่ายทรัพยากรบุคคล', size: '48 คน', tone: 'butter' },
  { id: 'ch-mgr', name: 'กลุ่มผู้จัดการ', size: '26 คน', tone: 'sage' },
  { id: 'ch-ops', name: 'ฝ่ายปฏิบัติการ', size: '312 คน', tone: 'teal' },
];

// ════════════════════════════════════════════════════════════
// My profile (employee self-service)
// Field schema = SAP SuccessFactors EC Core ground-truth, extracted
// 2026-04-22 from /sf/liveprofile (CENTRAL tenant) — see
// stark/projects/hr-platform-replacement/sf-extract/ec-core/EC_CORE_SCHEMA.md.
//   Personal Information section = 14 fields (bilingual EN+TH where applicable)
//   Employment Details section   = 12 fields (effective-dating + computed)
//   Organization Information     = 10 fields (5-tier hierarchy + Central retail-custom)
// Header card values use realistic Central retail context (not invented "CG-XXXX"
// stubs) so demo to HRBP/Rungrote reads as genuine cnext-shaped data.
// ════════════════════════════════════════════════════════════

// ── BRD #168 — lifecycle events seed for Years-in-X computation
// Dates derived from SF EC effective-date labels in the job portlet below.
// HIRE uses Original Start Date (2019-03-01) so Year of Service counts from
// first day of employment per I11, not re-hire date (2023-10-14).
const HUMI_LIFECYCLE_EVENTS: LifecycleEvent[] = [
  { type: 'HIRE', effectiveDate: '2019-03-01', meta: { toBU: 'Central Group HQ' } },
  { type: 'CHANGE_POSITION', effectiveDate: '2023-10-01' },
  { type: 'CHANGE_JOB', effectiveDate: '2023-10-01' },
  { type: 'PROMOTION', effectiveDate: '2024-01-01', meta: { fromJG: 'M3', toJG: 'M4' } },
]

// calcYearOfService takes (hireDate: string, events, asOf) — pass HIRE date + events
const _yos  = calcYearOfService('2019-03-01', HUMI_LIFECYCLE_EVENTS)
const _yij  = calcYearsInJob(HUMI_LIFECYCLE_EVENTS)
const _yip  = calcYearsInPosition(HUMI_LIFECYCLE_EVENTS)
const _yibu = calcYearsInBU(HUMI_LIFECYCLE_EVENTS)
const _yict = calcYearsInCorpTitle(HUMI_LIFECYCLE_EVENTS)

export const HUMI_MY_PROFILE = {
  employeeCode: '30100412',
  nameTh: 'จงรักษ์ ทานากะ',
  pronouns: '(เขา/Mr.)',
  initials: 'จท',
  avatarTone: 'butter' as const,
  position: 'HR Manager (ผู้จัดการฝ่ายทรัพยากรบุคคล)',
  department: 'HR Operations & People Services',
  reportsTo: 'Krittinai Indradet (กฤตนัย อินทรเดช)',
  status: 'active' as const,
  employmentType: 'Permanent · พนักงานประจำ',
  startLabel: 'Hire Date · 14 ต.ค. 2566',
  lifecycleEvents: HUMI_LIFECYCLE_EVENTS,

  // ── Personal Information (14 fields — SF EC Core "Personal Information" portlet)
  personal: [
    ['Salutation (EN) / Salutation (Local)', 'Mr. / นาย'],
    ['Firstname (EN) / Firstname (Local)', 'Chongrak / จงรักษ์'],
    ['Middle Name (EN)', '—'],
    ['Lastname (EN) / Lastname (Local)', 'Tanaka / ทานากะ'],
    ['Nickname (EN/TH)', 'Tan / ตั๋น'],
    ['Other Title (TH)', '—'],
    ['Gender', 'Male · ชาย'],
    ['Nationality', 'Thai · ไทย'],
    ['Marital Status', 'Married · สมรส'],
    ['Marital Status Since', '14 กุมภาพันธ์ 2563'],
    ['Date of Birth', '12 สิงหาคม 2534'],
    ['National ID', '•••-•••-•••-22-1'],
    ['Religion', 'Buddhist · พุทธ'],
    ['Blood Type', 'O+'],
  ] as ReadonlyArray<readonly [string, string]>,

  contact: [
    ['Work Email', 'chongrak.t@centralgroup.com'],
    ['Personal Email', 'chongrak.tanaka@proton.me'],
    ['Mobile Phone', '+66 (02) 555-0188'],
    ['Address (Home)', '241 ถ.สุขุมวิท แขวงคลองตัน กรุงเทพฯ 10110'],
    ['Preferred Language', 'ภาษาไทย / English'],
  ] as ReadonlyArray<readonly [string, string]>,

  // ── Employment Details (12) + Organization Information (10) — SF EC Core
  // ground-truth labels. Empty-value entry "──── ... ────" rows are visual
  // section dividers (FieldCard renders label on left, value on right).
  job: [
    ['──── Employment Details ────', ''],
    ['Hire Date', '14 ตุลาคม 2566'],
    ['Original Start Date', '1 มีนาคม 2562'],
    ['Seniority Start Date', '1 มีนาคม 2562'],
    ['Year of service', _yos.display],
    ['Pass Probation Date / Confirm Date', '14 มกราคม 2567'],
    ['Current Job Effective Date', '1 ตุลาคม 2566'],
    ['Current Years in Job', _yij.display],
    ['Current Corporate Title Effective Date', '1 มกราคม 2567'],
    ['Current Years in Corporate Title', _yict.display],
    ['Current Position Effective Date', '1 ตุลาคม 2566'],
    ['Current Years in Position', _yip.display],
    ['Current Store Branch Effective Date', '1 ตุลาคม 2566'],
    ['──── Organization Information ────', ''],
    ['Company', 'Central Retail Corporation PCL'],
    ['Group', 'Central Retail'],
    ['Business Unit', 'Central Group HQ'],
    ['Function', 'Human Resources'],
    ['Current Years in BU', _yibu.display],
    ['Organization', 'HR Operations & People Services'],
    ['Position', 'PSN-30412 — HR Manager (HQ)'],
    ['Store/Branch Code', 'HQ-BKK-001'],
    ['HR District', 'Bangkok Metro'],
    ['Cost Centre', 'CC-HR-104012'],
    ['Work Location', 'Central World Tower, Bangkok'],
  ] as ReadonlyArray<readonly [string, string]>,

  // Compensation portlet not yet extracted from SF (Phase 4 work).
  // Values below are illustrative — schema TBD via cnext follow-up.
  comp: {
    monthly: '฿ 82,500',
    cadence: 'Monthly · จ่ายทุกสิ้นเดือน · ครั้งถัดไป 30 เม.ย.',
    base: '฿ 82,500',
    bonus: 'สูงสุด 12% · Performance-linked',
    equity: 'N/A (CRC ยังไม่มี RSU/equity program)',
  },

  // Work history reflects effective-dating model — each row = one EmploymentState
  // (job_title + corp_title + position_code + effective_start..effective_end).
  // Locations use Central retail BU context (HQ vs Robinson vs Tops).
  workHistory: [
    { title: 'HR Manager · Central Retail HQ', dates: 'ต.ค. 2566 – ปัจจุบัน', loc: 'Central World Tower', tone: 'teal' as const },
    { title: 'Senior OD Specialist · Central Group HQ', dates: 'มี.ค. 2562 – ก.ย. 2566', loc: 'CentralWorld Office', tone: 'butter' as const },
    { title: 'HR Business Partner · Robinson Lifestyle', dates: 'พ.ค. 2559 – ก.พ. 2562', loc: 'Robinson Rangsit', tone: 'sage' as const },
  ],

  // Emergency Contact = SF EC Core sub-section "Emergency Contact & Dependents"
  // confirmed 3 fields: Name / Relationship / Phone (+ Humi adds initials/tone for UI).
  emergency: [
    { name: 'Somchai Tanaka (สมชาย ทานากะ)', relation: 'Spouse · คู่สมรส', phone: '+66 (02) 555-0233', initials: 'สท', tone: 'teal' as const },
    { name: 'Aumporn Tanaka (อัมพร ทานากะ)', relation: 'Mother · มารดา', phone: '+66 (02) 555-1144', initials: 'อท', tone: 'sage' as const },
  ],
};

// ════════════════════════════════════════════════════════════
// Batch B — /timeoff, /benefits-hub, /requests, /goals
// Ports retail reference screens to HR context. Token-only colors.
// ════════════════════════════════════════════════════════════

/** Subset of HumiEmployee.avatarTone that the Avatar primitive accepts directly. */
export type AvatarTone = 'teal' | 'sage' | 'butter' | 'ink';

export type LeaveKind = 'vacation' | 'sick' | 'personal';

export interface HumiLeaveBalance {
  kind: LeaveKind;
  label: string;
  remaining: string;
  unitLabel: string;
  percentUsed: number;
  note: string;
  barClass: string;
}

export const HUMI_LEAVE_BALANCES: HumiLeaveBalance[] = [
  {
    kind: 'vacation',
    label: 'ลาพักร้อน',
    remaining: '8.5',
    unitLabel: 'วันคงเหลือ',
    percentUsed: 42,
    note: 'จาก 15 วันต่อปี',
    barClass: 'bg-accent',
  },
  {
    kind: 'personal',
    label: 'ลากิจ',
    remaining: '3.0',
    unitLabel: 'วันคงเหลือ',
    percentUsed: 75,
    note: 'จาก 4 วันต่อปี',
    barClass: 'bg-[color:var(--color-accent-alt)]',
  },
  {
    kind: 'sick',
    label: 'ลาป่วย',
    remaining: 'ไม่จำกัด',
    unitLabel: 'ตามจำเป็น',
    percentUsed: 0,
    note: 'ใช้ไปแล้ว 2 วันในปีนี้',
    barClass: 'bg-[color:var(--color-sage)]',
  },
];

export interface HumiLeaveHistoryItem {
  id: string;
  when: string;
  type: string;
  status: 'approved' | 'rejected';
}

export const HUMI_LEAVE_HISTORY: HumiLeaveHistoryItem[] = [
  { id: 'lh-1', when: '14 – 17 มี.ค.', type: 'ลาพักร้อน', status: 'approved' },
  { id: 'lh-2', when: '2 ก.พ.', type: 'ลาป่วย', status: 'approved' },
  { id: 'lh-3', when: '22 ธ.ค. – 2 ม.ค.', type: 'ลาพักร้อน', status: 'approved' },
  { id: 'lh-4', when: '8 พ.ย.', type: 'ลากิจ', status: 'rejected' },
];

export interface HumiLeavePending {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  reason: string;
  when: string;
}

export const HUMI_LEAVE_PENDING: HumiLeavePending[] = [
  { id: 'lp-1', name: 'ปิยะนุช สมบูรณ์', initials: 'ปส', tone: 'butter', reason: 'ลาพักร้อน · 5 วัน', when: '28 เม.ย. – 2 พ.ค.' },
  { id: 'lp-2', name: 'รังสรรค์ วัฒนธรรม', initials: 'รว', tone: 'sage', reason: 'ลาป่วย · 1 วัน', when: '22 เม.ย.' },
];

export interface HumiLeaveCoverage {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  dateLabel: string;
  offsetPct: number;
}

export const HUMI_LEAVE_COVERAGE: HumiLeaveCoverage[] = [
  { id: 'cv-1', name: 'วาสนา จิรวัฒน์', initials: 'วจ', tone: 'teal', dateLabel: '28 เม.ย. – 2 พ.ค.', offsetPct: 55 },
  { id: 'cv-2', name: 'ปิยะนุช สมบูรณ์', initials: 'ปส', tone: 'butter', dateLabel: '22 เม.ย.', offsetPct: 18 },
  { id: 'cv-3', name: 'มัลลิกา ธีรศักดิ์', initials: 'มธ', tone: 'sage', dateLabel: '10 – 12 พ.ค.', offsetPct: 30 },
  { id: 'cv-4', name: 'ณัฐพล ภักดีธรรม', initials: 'ณภ', tone: 'ink', dateLabel: '20 – 25 พ.ค.', offsetPct: 70 },
];

// ─── /benefits-hub ─────────────────────────────────────────

export interface HumiBenefitPlan {
  id: string;
  title: string;
  plan: string;
  cost: string;
  percent: number;
  items: string[];
  barClass: string;
}

export const HUMI_BENEFIT_PLANS: HumiBenefitPlan[] = [
  {
    id: 'bp-health',
    title: 'ประกันสุขภาพและทันตกรรม',
    plan: 'แพลน Flex Plus · ครอบครัว',
    cost: '฿142/เดือน',
    percent: 85,
    items: ['ตรวจสุขภาพฟรี 100%', 'สายตา ฿500', 'ค่ารักษาพยาบาล ฿2,500'],
    barClass: 'bg-accent',
  },
  {
    id: 'bp-provident',
    title: 'กองทุนสำรองเลี้ยงชีพ',
    plan: 'สมทบ 5%',
    cost: '฿0/เดือน',
    percent: 100,
    items: ['บริษัทสมทบ 5%', 'ได้รับสิทธิ์ทันที', 'บริหารโดย Fidelity'],
    barClass: 'bg-[color:var(--color-accent-alt)]',
  },
  {
    id: 'bp-wellness',
    title: 'สุขภาวะองค์รวม',
    plan: 'บัญชีไลฟ์สไตล์',
    cost: '฿600/ปี',
    percent: 32,
    items: ['ใช้ไปแล้ว ฿192', 'ฟิตเนส บำบัด คลาส', 'ไม่ต้องเสียภาษี'],
    barClass: 'bg-[color:var(--color-sage)]',
  },
];

export interface HumiDependent {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  relation: string;
}

export const HUMI_DEPENDENTS: HumiDependent[] = [
  { id: 'dep-1', name: 'ปณิดา ทานากะ', initials: 'ปท', tone: 'teal', relation: 'คู่สมรส' },
  { id: 'dep-2', name: 'ไอริส ทานากะ', initials: 'อท', tone: 'butter', relation: 'บุตร · 8 ขวบ' },
  { id: 'dep-3', name: 'นิโก้ ทานากะ', initials: 'นท', tone: 'sage', relation: 'บุตร · 4 ขวบ' },
];

export interface HumiClaimAllowance {
  id: string;
  label: string;
  used: number;
  limit: number;
  sub: string;
  accent: 'accent' | 'alt' | 'sage' | 'butter';
}

export const HUMI_CLAIM_ALLOWANCES: HumiClaimAllowance[] = [
  { id: 'ca-medical', label: 'ค่ารักษาพยาบาล', used: 12400, limit: 38000, sub: 'ต่อปี · รวมผู้อุปการะ', accent: 'accent' },
  { id: 'ca-dental', label: 'ค่าทันตกรรม', used: 0, limit: 2000, sub: 'ต่อปี · รวมชุดเคลือบฟัน', accent: 'alt' },
  { id: 'ca-phone', label: 'ค่าโทรศัพท์', used: 4800, limit: 9600, sub: 'เดือนละ ฿800', accent: 'sage' },
  { id: 'ca-fuel', label: 'ค่าน้ำมันรถ', used: 2000, limit: 10000, sub: 'ไปราชการ · ยื่นรายเดือน', accent: 'butter' },
];

export type ClaimStatus = 'approved' | 'pending' | 'info';

export interface HumiClaimHistoryItem {
  id: string;
  date: string;
  type: string;
  desc: string;
  amount: string;
  status: ClaimStatus;
}

export const HUMI_CLAIM_HISTORY: HumiClaimHistoryItem[] = [
  { id: 'cl-1', date: '15 เม.ย. 2569', type: 'ค่ารักษาพยาบาล', desc: 'รพ.บำรุงราษฎร์ · ใบเสร็จ #RX-3381', amount: '฿4,820', status: 'approved' },
  { id: 'cl-2', date: '2 เม.ย. 2569', type: 'ค่าน้ำมันรถ', desc: 'ปตท. สาขาทองหล่อ · 230 กิโลเมตร', amount: '฿1,280', status: 'approved' },
  { id: 'cl-3', date: '28 เม.ย. 2569', type: 'ค่าโทรศัพท์', desc: 'AIS · บิลเดือน เม.ย.', amount: '฿800', status: 'pending' },
  { id: 'cl-4', date: '22 เม.ย. 2569', type: 'ค่ารักษาพยาบาล', desc: 'บีเอ็นเอชคลินิก · ใบเสร็จ #RX-3280', amount: '฿7,580', status: 'approved' },
  { id: 'cl-5', date: '10 เม.ย. 2569', type: 'ค่าทันตกรรม', desc: 'ต้องแนบใบเสร็จเพิ่ม', amount: '฿1,500', status: 'info' },
];

export interface HumiPayslip {
  id: string;
  date: string;
  gross: string;
  hours: string;
}

export const HUMI_PAYSLIPS: HumiPayslip[] = [
  { id: 'ps-1', date: '12 เม.ย. 2569', gross: '฿78,450.00', hours: '160.0 ชม.' },
  { id: 'ps-2', date: '29 มี.ค. 2569', gross: '฿78,450.00', hours: '160.0 ชม.' },
  { id: 'ps-3', date: '15 มี.ค. 2569', gross: '฿82,212.75', hours: '168.0 ชม.' },
  { id: 'ps-4', date: '1 มี.ค. 2569', gross: '฿74,980.00', hours: '152.0 ชม.' },
];

// ─── /requests ─────────────────────────────────────────────

export type RequestIconKey =
  | 'calendar'
  | 'heart'
  | 'shield'
  | 'doc'
  | 'clock'
  | 'globe'
  | 'book'
  | 'plug'
  | 'people'
  | 'arrow';

export type AccentKey = 'accent' | 'alt' | 'sage' | 'butter' | 'muted';

export interface HumiRequestFormType {
  id: string;
  title: string;
  subtitle: string;
  icon: RequestIconKey;
  accent: AccentKey;
  sla: string;
}

export const HUMI_REQUEST_CATALOG: HumiRequestFormType[] = [
  { id: 'leave', title: 'ขอลางาน', subtitle: 'ลาพักร้อน · ลาป่วย · ลากิจ · ลาคลอด', icon: 'calendar', accent: 'accent', sla: '2 วันทำการ' },
  { id: 'claim', title: 'เบิกค่าใช้จ่าย', subtitle: 'ค่ารักษาพยาบาล · ทันตกรรม · น้ำมัน · โทรศัพท์', icon: 'heart', accent: 'alt', sla: '5 วันทำการ' },
  { id: 'ot', title: 'ขอทำโอที', subtitle: 'ทำงานล่วงเวลา · ค่าล่วงเวลาวันหยุด', icon: 'shield', accent: 'butter', sla: '1 วันทำการ' },
  { id: 'cert-emp', title: 'หนังสือรับรองการทำงาน', subtitle: 'ออกโดยฝ่ายบุคคล · ลงนามโดยผู้จัดการ', icon: 'doc', accent: 'sage', sla: '3 วันทำการ' },
  { id: 'cert-salary', title: 'หนังสือรับรองเงินเดือน', subtitle: 'สำหรับยื่นกู้ · ทำวีซ่า · เปิดบัญชี', icon: 'doc', accent: 'sage', sla: '3 วันทำการ' },
  { id: 'shift', title: 'ขอเปลี่ยนกะ / สลับเวร', subtitle: 'สลับกับเพื่อนร่วมทีม · ปรับเวลาเข้า-ออก', icon: 'clock', accent: 'accent', sla: '24 ชั่วโมง' },
  { id: 'travel', title: 'เดินทางเพื่อธุรกิจ', subtitle: 'จองที่พัก · ตั๋วเดินทาง · เบี้ยเลี้ยง', icon: 'globe', accent: 'alt', sla: '5 วันทำการ' },
  { id: 'training', title: 'ขออบรม / สัมมนา', subtitle: 'หลักสูตรภายใน · คอร์สภายนอก · สัมมนา', icon: 'book', accent: 'sage', sla: '7 วันทำการ' },
  { id: 'asset', title: 'เบิกอุปกรณ์', subtitle: 'อุปกรณ์สำนักงาน · อุปกรณ์ไอที · เครื่องแบบ', icon: 'plug', accent: 'butter', sla: '3 วันทำการ' },
  { id: 'info', title: 'แก้ไขข้อมูลส่วนตัว', subtitle: 'ที่อยู่ · เลขบัญชีธนาคาร · ผู้อุปการะ', icon: 'people', accent: 'accent', sla: '1 วันทำการ' },
  { id: 'transfer', title: 'ขอโอนย้ายแผนก', subtitle: 'ย้ายแผนก · เปลี่ยนตำแหน่ง · ปรับโครงสร้าง', icon: 'arrow', accent: 'alt', sla: '14 วันทำการ' },
  { id: 'resign', title: 'ลาออก', subtitle: 'แจ้งลาออก · สัมภาษณ์ออก · คืนอุปกรณ์', icon: 'shield', accent: 'muted', sla: '30 วัน' },
];

export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'info';

export interface HumiApprovalStep {
  role: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  status: 'approved' | 'pending' | 'rejected' | 'skipped';
  when?: string;
  note?: string;
}

export interface HumiMyRequest {
  id: string;
  type: string;
  sub: string;
  submitted: string;
  status: RequestStatus;
  approvalChain: HumiApprovalStep[];
}

export const HUMI_MY_REQUESTS: HumiMyRequest[] = [
  {
    id: 'REQ-2481', type: 'เบิกค่าใช้จ่าย', sub: 'ค่ารักษาพยาบาล · รพ.บำรุงราษฎร์ · ฿4,820', submitted: '15 เม.ย. 2569', status: 'pending',
    approvalChain: [
      { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal', status: 'approved', when: '15 เม.ย. 16:20', note: 'อนุมัติ — แนบใบรับรองแพทย์ถูกต้อง' },
      { role: 'ผู้จัดการแผนก', name: 'สุภาวดี ธาราทอง', initials: 'สธ', tone: 'sage', status: 'pending', when: 'รอดำเนินการ' },
      { role: 'ฝ่ายบัญชี', name: 'อรุณ พงษ์ศิริ', initials: 'อพ', tone: 'butter', status: 'pending' },
    ],
  },
  {
    id: 'REQ-2475', type: 'ขอลางาน', sub: 'ลาพักร้อน · 24–26 เม.ย. (3 วัน)', submitted: '12 เม.ย. 2569', status: 'approved',
    approvalChain: [
      { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal', status: 'approved', when: '12 เม.ย. 14:05' },
      { role: 'ผู้จัดการแผนก', name: 'สุภาวดี ธาราทอง', initials: 'สธ', tone: 'sage', status: 'approved', when: '13 เม.ย. 09:30', note: 'อนุมัติ · ทีมมีผู้รับผิดชอบแทนแล้ว' },
    ],
  },
  {
    id: 'REQ-2460', type: 'ขอทำโอที', sub: 'เสาร์ที่ 19 เม.ย. · 4 ชั่วโมง', submitted: '10 เม.ย. 2569', status: 'approved',
    approvalChain: [
      { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal', status: 'approved', when: '10 เม.ย. 11:45' },
      { role: 'ผู้จัดการแผนก', name: 'สุภาวดี ธาราทอง', initials: 'สธ', tone: 'sage', status: 'approved', when: '11 เม.ย. 10:12' },
    ],
  },
  {
    id: 'REQ-2442', type: 'หนังสือรับรองเงินเดือน', sub: 'สำหรับยื่นกู้ธนาคารกสิกร', submitted: '5 เม.ย. 2569', status: 'info',
    approvalChain: [
      { role: 'ฝ่ายบุคคล', name: 'นภา ศรีวิโรจน์', initials: 'นศ', tone: 'ink', status: 'approved', when: '6 เม.ย. 10:00', note: 'ออกเอกสารเรียบร้อย · รับได้ที่ HR ชั้น 8' },
    ],
  },
  {
    id: 'REQ-2418', type: 'เบิกอุปกรณ์', sub: 'หูฟัง Jabra × 1 ชุด', submitted: '28 มี.ค. 2569', status: 'approved',
    approvalChain: [
      { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal', status: 'approved', when: '28 มี.ค. 15:10' },
      { role: 'ฝ่ายจัดซื้อ', name: 'วีระ สมบูรณ์ทรัพย์', initials: 'วส', tone: 'butter', status: 'approved', when: '30 มี.ค. 11:20', note: 'สั่งซื้อแล้ว · ETA 3 เม.ย.' },
    ],
  },
  {
    id: 'REQ-2401', type: 'ขอเปลี่ยนกะ', sub: 'สลับกะกับ ธนกร เลิศวงศ์ · 22 มี.ค.', submitted: '20 มี.ค. 2569', status: 'rejected',
    approvalChain: [
      { role: 'หัวหน้างาน', name: 'ปรีชา วัฒนกุล', initials: 'ปว', tone: 'teal', status: 'approved', when: '20 มี.ค. 13:30' },
      { role: 'ผู้จัดการแผนก', name: 'สุภาวดี ธาราทอง', initials: 'สธ', tone: 'sage', status: 'rejected', when: '21 มี.ค. 09:45', note: 'ไม่อนุมัติ · คู่สลับมีกะซ้ำวันเดียวกัน' },
    ],
  },
];

export interface HumiApprovalRow {
  id: string;
  who: string;
  initials: string;
  tone: AvatarTone;
  role: string;
  type: string;
  sub: string;
  when: string;
  urgent: boolean;
}

export const HUMI_APPROVAL_QUEUE: HumiApprovalRow[] = [
  { id: 'REQ-2490', who: 'ธนกร เลิศวงศ์', initials: 'ธล', tone: 'sage', role: 'วิศวกรซอฟต์แวร์ · เทคโนโลยีสารสนเทศ', type: 'ขอลางาน', sub: 'ลาป่วย 2 วัน · 21–22 เม.ย.', when: 'วันนี้ 09:12', urgent: true },
  { id: 'REQ-2489', who: 'มัลลิกา ธีรศักดิ์', initials: 'มธ', tone: 'sage', role: 'นักวิเคราะห์ข้อมูล · เทคโนโลยีสารสนเทศ', type: 'ขอทำโอที', sub: 'ศุกร์ 25 เม.ย. · 3 ชั่วโมง', when: 'วันนี้ 08:40', urgent: false },
  { id: 'REQ-2488', who: 'อรุณ พงษ์ศิริ', initials: 'อพ', tone: 'teal', role: 'นักวิเคราะห์การเงิน · การเงิน', type: 'เบิกค่าใช้จ่าย', sub: 'ค่าน้ำมัน เม.ย. · 230 กม. · ฿1,280', when: 'เมื่อวาน 16:22', urgent: false },
  { id: 'REQ-2487', who: 'อัญชลี มงคลชัย', initials: 'อม', tone: 'teal', role: 'เจ้าหน้าที่ฝึกอบรม · ทรัพยากรบุคคล', type: 'ขออบรม', sub: 'คอร์ส Excel ขั้นกลาง · ฿3,500', when: 'เมื่อวาน 14:05', urgent: false },
  { id: 'REQ-2486', who: 'สุพัตรา คงสุข', initials: 'สค', tone: 'teal', role: 'เจ้าหน้าที่บัญชี · การเงิน', type: 'เบิกอุปกรณ์', sub: 'หูฟังประชุม × 1 ชุด', when: '2 วันที่แล้ว', urgent: false },
];

// ─── /goals ────────────────────────────────────────────────

export interface HumiGoalKR {
  label: string;
  done: boolean;
}

export interface HumiGoal {
  id: string;
  title: string;
  category: string;
  percent: number;
  status: 'on-track' | 'at-risk';
  statusLabel: string;
  due: string;
  krs: HumiGoalKR[];
}

export const HUMI_GOALS: HumiGoal[] = [
  {
    id: 'goal-1',
    title: 'ลดอัตราการลาออกในไตรมาส 1 ลง 20% เมื่อเทียบกับปีก่อน',
    category: 'บุคลากร',
    percent: 72,
    status: 'on-track',
    statusLabel: 'อยู่ในแผน',
    due: '30 มิ.ย.',
    krs: [
      { label: 'วิเคราะห์สาเหตุการลาออกไตรมาส 1 เสร็จสิ้น', done: true },
      { label: 'เริ่มโปรแกรม Stay Interview กับหัวหน้าทุกแผนก', done: true },
      { label: 'ลดอัตราการลาออกได้ 14% จากเส้นฐาน', done: false },
    ],
  },
  {
    id: 'goal-2',
    title: 'โค้ชหัวหน้างาน 3 คนให้ก้าวขึ้นเป็นผู้จัดการฝ่าย',
    category: 'บุคลากร',
    percent: 66,
    status: 'on-track',
    statusLabel: 'อยู่ในแผน',
    due: '15 ส.ค.',
    krs: [
      { label: 'คัดเลือกผู้สมัคร', done: true },
      { label: 'อบรม LEAD-101 ร่วมกัน', done: true },
      { label: 'ติดตาม 1:1 รายสัปดาห์ × 3 เดือน', done: false },
    ],
  },
  {
    id: 'goal-3',
    title: 'เปิดตัวโครงการนำร่องให้พนักงานบริหารตารางเวลาเอง',
    category: 'การดำเนินงาน',
    percent: 30,
    status: 'at-risk',
    statusLabel: 'เสี่ยง',
    due: '20 พ.ค.',
    krs: [
      { label: 'ร่างนโยบาย', done: true },
      { label: 'ประสานกับทีมกฎหมาย', done: false },
      { label: 'ทดลองนำร่อง 4 สัปดาห์', done: false },
    ],
  },
  {
    id: 'goal-4',
    title: 'ส่วนตัว · เรียนจบใบรับรองผู้นำ People Analytics',
    category: 'พัฒนาตนเอง',
    percent: 45,
    status: 'on-track',
    statusLabel: 'อยู่ในแผน',
    due: '1 ก.ย.',
    krs: [
      { label: 'โมดูล 1–4', done: true },
      { label: 'โมดูล 5–8', done: false },
      { label: 'โครงงานสรุป', done: false },
    ],
  },
];

export interface HumiReviewCycle {
  id: string;
  cycle: string;
  due: string;
  status: string;
  tone: 'butter' | 'sage' | 'muted';
}

export const HUMI_REVIEW_CYCLES: HumiReviewCycle[] = [
  { id: 'rc-1', cycle: 'ครึ่งปีแรก 2569 (ประเมินกลางรอบ)', due: 'ส่งประเมินตนเองภายใน 15 มิ.ย.', status: 'กำลังดำเนินการ', tone: 'butter' },
  { id: 'rc-2', cycle: 'ครึ่งปีหลัง 2568 (ประจำปี)', due: 'เสร็จสิ้น ธ.ค. 2568', status: 'ดีเกินคาด', tone: 'sage' },
  { id: 'rc-3', cycle: 'ครึ่งปีแรก 2568 (ประเมินกลางรอบ)', due: 'เสร็จสิ้น ก.ค. 2568', status: 'ได้ตามเกณฑ์', tone: 'muted' },
  { id: 'rc-4', cycle: 'ครึ่งปีหลัง 2567 (ประจำปี)', due: 'เสร็จสิ้น ธ.ค. 2567', status: 'ได้ตามเกณฑ์', tone: 'muted' },
];

export interface HumiFeedback {
  id: string;
  who: string;
  initials: string;
  tone: AvatarTone;
  role: string;
  when: string;
  text: string;
}

export const HUMI_FEEDBACK: HumiFeedback[] = [
  {
    id: 'fb-1',
    who: 'กฤตนัย อินทรเดช',
    initials: 'กอ',
    tone: 'ink',
    role: 'หัวหน้าสายงาน',
    when: '2 สัปดาห์ก่อน',
    text: 'คุณจงรักษ์จัดการโครงการสรรหาตำแหน่งสำคัญไตรมาส 1 ได้เรียบร้อยมาก เตรียมทีมล่วงหน้าและสื่อสารกับผู้สมัครได้ดีเยี่ยม รอดูว่าจะโค้ชทีมสรรหาให้รับมือ Q2 ได้อย่างไร',
  },
  {
    id: 'fb-2',
    who: 'ธนกร เลิศวงศ์',
    initials: 'ธล',
    tone: 'sage',
    role: 'เพื่อนร่วมทีม',
    when: '1 เดือนก่อน',
    text: 'สื่อสารชัดเจนมากตอนเราทำโครงการ HRIS ร่วมกัน อธิบายทุกขั้นตอนโดยไม่ทำให้รู้สึกว่าเป็นมือใหม่',
  },
  {
    id: 'fb-3',
    who: 'อัญชลี มงคลชัย',
    initials: 'อม',
    tone: 'teal',
    role: 'ลูกทีม',
    when: '2 เดือนก่อน',
    text: 'คุณจงรักษ์ให้ข้อเสนอแนะที่เฉพาะเจาะจงและจริงใจหลังการอบรมครั้งแรกของฉัน ทำให้มั่นใจและอยากพัฒนาต่อ',
  },
];

export interface HumiGoalTeamMember {
  id: string;
  name: string;
  initials: string;
  tone: AvatarTone;
  role: string;
  goalsDone: string;
  percent: number;
}

export const HUMI_GOAL_TEAM: HumiGoalTeamMember[] = [
  { id: 'gt-1', name: 'ธนกร เลิศวงศ์', initials: 'ธล', tone: 'sage', role: 'วิศวกรอาวุโส', goalsDone: '4 / 4', percent: 82 },
  { id: 'gt-2', name: 'มัลลิกา ธีรศักดิ์', initials: 'มธ', tone: 'sage', role: 'นักวิเคราะห์ข้อมูล', goalsDone: '3 / 4', percent: 68 },
  { id: 'gt-3', name: 'สุพัตรา คงสุข', initials: 'สค', tone: 'teal', role: 'เจ้าหน้าที่บัญชี', goalsDone: '2 / 3', percent: 55 },
  { id: 'gt-4', name: 'อัญชลี มงคลชัย', initials: 'อม', tone: 'teal', role: 'เจ้าหน้าที่ฝึกอบรม', goalsDone: '3 / 3', percent: 91 },
];

/** Accent → icon tile className (token-only). */
export const ACCENT_ICON_CLASS: Record<AccentKey, string> = {
  accent: 'bg-accent-soft text-accent',
  alt: 'bg-accent-alt-soft text-[color:var(--color-accent-alt)]',
  sage: 'bg-[color:var(--color-sage-soft)] text-ink',
  butter: 'bg-[color:var(--color-butter-soft)] text-ink',
  muted: 'bg-[color:var(--color-canvas-soft)] text-ink-muted',
};

/** Accent → bar color (progress bars / left rules). */
export const ACCENT_BAR_CLASS: Record<AccentKey, string> = {
  accent: 'bg-accent',
  alt: 'bg-[color:var(--color-accent-alt)]',
  sage: 'bg-[color:var(--color-sage)]',
  butter: 'bg-[color:var(--color-butter)]',
  muted: 'bg-ink-faint',
};

/** Request status → badge. */
export const REQUEST_STATUS_META: Record<RequestStatus, { label: string; toneClass: string }> = {
  pending: { label: 'รออนุมัติ', toneClass: 'bg-warning-soft text-[color:var(--color-warning)]' },
  approved: { label: 'อนุมัติแล้ว', toneClass: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]' },
  rejected: { label: 'ไม่อนุมัติ', toneClass: 'bg-[color:var(--color-canvas-soft)] text-ink-muted' },
  info: { label: 'ขอข้อมูลเพิ่ม', toneClass: 'bg-accent-soft text-[color:var(--color-accent-ink)]' },
};

/** Claim status → badge. */
export const CLAIM_STATUS_META: Record<ClaimStatus, { label: string; toneClass: string }> = {
  approved: { label: 'อนุมัติแล้ว', toneClass: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]' },
  pending: { label: 'รออนุมัติ', toneClass: 'bg-warning-soft text-[color:var(--color-warning)]' },
  info: { label: 'ขอข้อมูลเพิ่ม', toneClass: 'bg-accent-soft text-[color:var(--color-accent-ink)]' },
};

/** Review cycle tone → badge. */
export const REVIEW_TONE_CLASS: Record<'butter' | 'sage' | 'muted', string> = {
  butter: 'bg-warning-soft text-[color:var(--color-warning)]',
  sage: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  muted: 'bg-[color:var(--color-canvas-soft)] text-ink-muted',
};

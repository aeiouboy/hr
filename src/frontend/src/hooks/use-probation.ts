'use client';

import { useState, useEffect, useCallback } from 'react';

export type ProbationStatus =
  | 'pending_manager'
  | 'pending_hr'
  | 'approved'
  | 'rejected'
  | 'extended'
  | 'escalated_ceo';

export interface ProbationTimelineEntry {
  actor: string;
  actorRole: string;
  action: string;
  date: string;
  comment?: string;
}

export interface ProbationCase {
  id: string;
  employeeId: string;
  fullNameTh: string;
  fullNameEn: string;
  photo?: string;
  position: string;
  department: string;
  hireDate: string;
  probationEndDate: string;
  status: ProbationStatus;
  currentApprover: { name: string; role: string };
  slaDeadline: string;
  timeline: ProbationTimelineEntry[];
}

const STATUS_LABEL: Record<ProbationStatus, string> = {
  pending_manager: 'รอหัวหน้างาน',
  pending_hr: 'รอ HR Director',
  approved: 'ผ่านทดลองงาน',
  rejected: 'ไม่ผ่าน',
  extended: 'ขยายเวลา',
  escalated_ceo: 'ส่ง CEO',
};

export { STATUS_LABEL };

// Mock data — matches Temporal POC workflow states
const MOCK_CASES: ProbationCase[] = [
  {
    id: 'PB-001',
    employeeId: 'EMP042',
    fullNameTh: 'สมชาย สุขใจ',
    fullNameEn: 'Somchai Sukjai',
    photo: 'https://i.pravatar.cc/150?img=33',
    position: 'Software Engineer',
    department: 'Product & Technology',
    hireDate: '2025-10-09',
    probationEndDate: '2026-04-09',
    status: 'pending_manager',
    currentApprover: { name: 'Rungrote Amnuaysopon', role: 'VP Product & Technology' },
    slaDeadline: '2026-04-11T17:00:00',
    timeline: [
      { actor: 'ระบบ', actorRole: 'System', action: 'สร้าง workflow อัตโนมัติ — probation ครบ 120 วัน', date: '2026-04-09T09:00:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'แจ้ง Rungrote Amnuaysopon (หัวหน้างาน) — SLA 48 ชม.', date: '2026-04-09T09:01:00' },
    ],
  },
  {
    id: 'PB-002',
    employeeId: 'EMP055',
    fullNameTh: 'พิมพ์ชนก รัตนกุล',
    fullNameEn: 'Pimchanok Ratanakul',
    photo: 'https://i.pravatar.cc/150?img=45',
    position: 'UX Designer',
    department: 'Product & Technology',
    hireDate: '2025-10-01',
    probationEndDate: '2026-04-01',
    status: 'pending_hr',
    currentApprover: { name: 'กัณณิกา ศรีสวัสดิ์', role: 'VP Human Resources' },
    slaDeadline: '2026-04-10T17:00:00',
    timeline: [
      { actor: 'ระบบ', actorRole: 'System', action: 'สร้าง workflow — probation ครบ 120 วัน', date: '2026-04-01T09:00:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'แจ้ง Rungrote Amnuaysopon (หัวหน้างาน)', date: '2026-04-01T09:01:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'หัวหน้างานไม่ตอบใน 48 ชม. — escalate ไป HR Director', date: '2026-04-03T09:01:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'แจ้ง กัณณิกา ศรีสวัสดิ์ (HR Director) — SLA 24 ชม.', date: '2026-04-03T09:02:00' },
    ],
  },
  {
    id: 'PB-003',
    employeeId: 'EMP061',
    fullNameTh: 'ธนวัฒน์ ชัยพร',
    fullNameEn: 'Thanawat Chaiyaporn',
    photo: 'https://i.pravatar.cc/150?img=52',
    position: 'Backend Developer',
    department: 'Product & Technology',
    hireDate: '2025-09-15',
    probationEndDate: '2026-03-15',
    status: 'approved',
    currentApprover: { name: 'Rungrote Amnuaysopon', role: 'VP Product & Technology' },
    slaDeadline: '2026-03-17T17:00:00',
    timeline: [
      { actor: 'ระบบ', actorRole: 'System', action: 'สร้าง workflow — probation ครบ 120 วัน', date: '2026-03-15T09:00:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'แจ้ง Rungrote Amnuaysopon (หัวหน้างาน)', date: '2026-03-15T09:01:00' },
      { actor: 'Rungrote Amnuaysopon', actorRole: 'Manager', action: 'อนุมัติ — ผ่านทดลองงาน', date: '2026-03-16T14:30:00', comment: 'ผลงานดีมาก deliver ตรงเวลา code quality สูง' },
      { actor: 'ระบบ', actorRole: 'System', action: 'อัพเดทสถานะ → พนักงานประจำ', date: '2026-03-16T14:30:01' },
    ],
  },
  {
    id: 'PB-004',
    employeeId: 'EMP058',
    fullNameTh: 'วรัญญา อินทรศรี',
    fullNameEn: 'Waranya Intarasri',
    photo: 'https://i.pravatar.cc/150?img=49',
    position: 'QA Analyst',
    department: 'Product & Technology',
    hireDate: '2025-09-01',
    probationEndDate: '2026-03-01',
    status: 'extended',
    currentApprover: { name: 'Rungrote Amnuaysopon', role: 'VP Product & Technology' },
    slaDeadline: '2026-06-01T17:00:00',
    timeline: [
      { actor: 'ระบบ', actorRole: 'System', action: 'สร้าง workflow — probation ครบ 120 วัน', date: '2026-03-01T09:00:00' },
      { actor: 'ระบบ', actorRole: 'System', action: 'แจ้ง Rungrote Amnuaysopon (หัวหน้างาน)', date: '2026-03-01T09:01:00' },
      { actor: 'Rungrote Amnuaysopon', actorRole: 'Manager', action: 'ไม่อนุมัติ — ขยายเวลาทดลองงาน 90 วัน', date: '2026-03-02T10:15:00', comment: 'ต้องปรับปรุงเรื่อง test coverage และ communication skill' },
      { actor: 'ระบบ', actorRole: 'System', action: 'ขยาย probation → ครบ 1 มิ.ย. 2026 — re-review scheduled', date: '2026-03-02T10:15:01' },
    ],
  },
];

export function useProbationCases() {
  const [cases, setCases] = useState<ProbationCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCases(MOCK_CASES);
      setLoading(false);
    }, 300);
  }, []);

  return { cases, loading };
}

export function useProbationCase(id: string) {
  const [probationCase, setProbationCase] = useState<ProbationCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProbationCase(MOCK_CASES.find((c) => c.id === id) ?? null);
      setLoading(false);
    }, 200);
  }, [id]);

  const approve = useCallback((comment: string) => {
    if (!probationCase) return;
    setProbationCase({
      ...probationCase,
      status: 'approved',
      timeline: [
        ...probationCase.timeline,
        { actor: 'You', actorRole: 'Manager', action: 'อนุมัติ — ผ่านทดลองงาน', date: new Date().toISOString(), comment },
        { actor: 'ระบบ', actorRole: 'System', action: 'อัพเดทสถานะ → พนักงานประจำ', date: new Date().toISOString() },
      ],
    });
  }, [probationCase]);

  const reject = useCallback((comment: string) => {
    if (!probationCase) return;
    setProbationCase({
      ...probationCase,
      status: 'extended',
      timeline: [
        ...probationCase.timeline,
        { actor: 'You', actorRole: 'Manager', action: 'ไม่อนุมัติ — ขยายเวลาทดลองงาน', date: new Date().toISOString(), comment },
        { actor: 'ระบบ', actorRole: 'System', action: 'ขยาย probation 90 วัน', date: new Date().toISOString() },
      ],
    });
  }, [probationCase]);

  return { probationCase, loading, approve, reject };
}

/**
 * Mock version history for beneficiaries — STA-26 §2.7 A-BN-02
 * UI mockup phase only. Not for production.
 */

export interface VersionEntry {
  versionId: string;
  date: string;
  actor: string;
  changes: string[];
  isCurrent: boolean;
}

/** Map from beneficiary row ID → ordered version list (newest first) */
export const MOCK_BENEFICIARY_VERSIONS: Record<string, VersionEntry[]> = {
  'BEN-001': [
    {
      versionId: 'v3',
      date: '2026-01-15',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['percentage 80% → 100%', 'status active (ไม่เปลี่ยนแปลง)'],
      isCurrent: true,
    },
    {
      versionId: 'v2',
      date: '2025-09-10',
      actor: 'HR Admin — ชลธิชา พรมมา',
      changes: ['percentage 50% → 80%', 'relationship คู่สมรส (ไม่เปลี่ยนแปลง)'],
      isCurrent: false,
    },
    {
      versionId: 'v1',
      date: '2024-06-01',
      actor: 'System import',
      changes: ['บันทึกครั้งแรก', 'percentage 50%', 'status active'],
      isCurrent: false,
    },
  ],

  'BEN-002': [
    {
      versionId: 'v2',
      date: '2026-02-03',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['percentage 60% → 50%', 'ปรับเพื่อรองรับ BEN-003 (มารดา)'],
      isCurrent: true,
    },
    {
      versionId: 'v1',
      date: '2024-08-15',
      actor: 'System import',
      changes: ['บันทึกครั้งแรก', 'percentage 60%', 'status active'],
      isCurrent: false,
    },
  ],

  'BEN-003': [
    {
      versionId: 'v2',
      date: '2026-02-03',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['เพิ่มผู้รับผลประโยชน์ใหม่', 'percentage 50%', 'status active'],
      isCurrent: true,
    },
    {
      versionId: 'v1',
      date: '2024-08-15',
      actor: 'System import',
      changes: ['บันทึกครั้งแรก', 'percentage 40%', 'status active'],
      isCurrent: false,
    },
  ],

  'BEN-004': [
    {
      versionId: 'v4',
      date: '2025-11-20',
      actor: 'HR Manager — วรรณา ทองดี',
      changes: ['percentage 80% → 70%', 'ปรับสัดส่วนพร้อม BEN-005 (บุตร)'],
      isCurrent: true,
    },
    {
      versionId: 'v3',
      date: '2025-06-01',
      actor: 'HR Admin — ชลธิชา พรมมา',
      changes: ['nationalId อัปเดต (แก้ไขข้อมูล)'],
      isCurrent: false,
    },
    {
      versionId: 'v2',
      date: '2025-01-10',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['percentage 100% → 80%'],
      isCurrent: false,
    },
    {
      versionId: 'v1',
      date: '2023-03-01',
      actor: 'System import',
      changes: ['บันทึกครั้งแรก', 'percentage 100%', 'status active'],
      isCurrent: false,
    },
  ],

  'BEN-005': [
    {
      versionId: 'v2',
      date: '2025-11-20',
      actor: 'HR Manager — วรรณา ทองดี',
      changes: ['เพิ่มผู้รับผลประโยชน์ใหม่ (บุตร)', 'percentage 30%', 'status active'],
      isCurrent: true,
    },
    {
      versionId: 'v1',
      date: '2025-11-15',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['draft — percentage 20% (ยังไม่ confirmed)'],
      isCurrent: false,
    },
  ],

  'BEN-011': [
    {
      versionId: 'v3',
      date: '2026-02-18',
      actor: 'HR Admin — ชลธิชา พรมมา',
      changes: ['status active → inactive', 'เหตุผล: บิดาเสียชีวิต'],
      isCurrent: true,
    },
    {
      versionId: 'v2',
      date: '2025-05-12',
      actor: 'HR Admin — สุดา วงษ์แก้ว',
      changes: ['percentage 80% → 100%'],
      isCurrent: false,
    },
    {
      versionId: 'v1',
      date: '2023-07-01',
      actor: 'System import',
      changes: ['บันทึกครั้งแรก', 'percentage 80%', 'status active'],
      isCurrent: false,
    },
  ],
};

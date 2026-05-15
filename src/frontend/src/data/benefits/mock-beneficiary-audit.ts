/**
 * Mock audit trail for beneficiary admin actions — STA-26 §2.7 A-BN-04
 * UI mockup phase only. Not for production.
 */

export type AuditAction = 'added' | 'edited' | 'archived' | 'pii_accessed';

export interface AuditEvent {
  id: string;
  action: AuditAction;
  actor: string;
  beneficiaryId: string;
  beneficiaryName: string;
  timestamp: string;
  reason?: string;
}

export const MOCK_BENEFICIARY_AUDIT: AuditEvent[] = [
  {
    id: 'AUD-001',
    action: 'pii_accessed',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-001',
    beneficiaryName: 'สมหญิง ใจดี',
    timestamp: '2026-05-15 09:42:11',
    reason: 'ตรวจสอบเอกสารเคลม',
  },
  {
    id: 'AUD-002',
    action: 'edited',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-001',
    beneficiaryName: 'สมหญิง ใจดี',
    timestamp: '2026-01-15 10:05:33',
    reason: 'ปรับสัดส่วน 80% → 100%',
  },
  {
    id: 'AUD-003',
    action: 'added',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-003',
    beneficiaryName: 'ศรีประภา รักงาน',
    timestamp: '2026-02-03 11:20:00',
    reason: 'เพิ่มมารดาเป็นผู้รับผลประโยชน์ร่วม',
  },
  {
    id: 'AUD-004',
    action: 'edited',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-002',
    beneficiaryName: 'ประยุทธ รักงาน',
    timestamp: '2026-02-03 11:22:45',
    reason: 'ปรับสัดส่วน 60% → 50% เพื่อรองรับผู้รับผลประโยชน์ใหม่',
  },
  {
    id: 'AUD-005',
    action: 'archived',
    actor: 'HR Admin — ชลธิชา พรมมา',
    beneficiaryId: 'BEN-011',
    beneficiaryName: 'ชัยวัฒน์ ศิริโชค',
    timestamp: '2026-02-18 14:30:07',
    reason: 'บิดาเสียชีวิต — เปลี่ยนสถานะเป็น inactive',
  },
  {
    id: 'AUD-006',
    action: 'pii_accessed',
    actor: 'HR Manager — วรรณา ทองดี',
    beneficiaryId: 'BEN-004',
    beneficiaryName: 'ธนพร มั่นคง',
    timestamp: '2026-03-08 15:10:22',
    reason: 'ตรวจสอบก่อน approve การเปลี่ยนแปลง',
  },
  {
    id: 'AUD-007',
    action: 'edited',
    actor: 'HR Manager — วรรณา ทองดี',
    beneficiaryId: 'BEN-004',
    beneficiaryName: 'ธนพร มั่นคง',
    timestamp: '2025-11-20 09:00:55',
    reason: 'ปรับสัดส่วน 80% → 70% + เพิ่มบุตร (BEN-005)',
  },
  {
    id: 'AUD-008',
    action: 'added',
    actor: 'HR Manager — วรรณา ทองดี',
    beneficiaryId: 'BEN-005',
    beneficiaryName: 'ธนวัฒน์ มั่นคง',
    timestamp: '2025-11-20 09:02:10',
    reason: 'เพิ่มบุตรเป็นผู้รับผลประโยชน์ 30%',
  },
  {
    id: 'AUD-009',
    action: 'added',
    actor: 'HR Admin — ชลธิชา พรมมา',
    beneficiaryId: 'BEN-006',
    beneficiaryName: 'ณัฐพงษ์ สุขสันต์',
    timestamp: '2026-03-10 10:45:00',
    reason: 'บันทึกพนักงานใหม่ EMP004',
  },
  {
    id: 'AUD-010',
    action: 'pii_accessed',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-012',
    beneficiaryName: 'พรพิมล แสงทอง',
    timestamp: '2026-04-01 08:55:40',
    reason: 'ตรวจสอบเพื่อส่งข้อมูลประกันชีวิต',
  },
  {
    id: 'AUD-011',
    action: 'edited',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-008',
    beneficiaryName: 'ภาณุวัฒน์ ประสิทธิ์',
    timestamp: '2025-12-05 13:15:30',
    reason: 'ปรับสัดส่วน 70% → 60% พร้อมเพิ่ม BEN-009',
  },
  {
    id: 'AUD-012',
    action: 'added',
    actor: 'HR Admin — สุดา วงษ์แก้ว',
    beneficiaryId: 'BEN-009',
    beneficiaryName: 'สิริยา ประสิทธิ์',
    timestamp: '2025-12-05 13:17:00',
    reason: 'เพิ่มบุตรเป็นผู้รับผลประโยชน์ 40%',
  },
];

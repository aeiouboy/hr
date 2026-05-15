'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button, Card, CardEyebrow, CardTitle, Modal, Toggle } from '@/components/humi';
import { Capability } from '@/components/humi';
import { RecordsFlatForm } from '@/components/benefits/templates/RecordsFlatForm';
import { getPlan } from '@/data/benefits/plan-registry';
import {
  MOCK_BENEFICIARY_VERSIONS,
  type VersionEntry,
} from '@/data/benefits/mock-beneficiary-versions';
import {
  MOCK_BENEFICIARY_AUDIT,
  type AuditAction,
} from '@/data/benefits/mock-beneficiary-audit';

// ── Beneficiary management page ───────────────────────────────────────────────
// STA-26 PR-G/G (FINAL): PII mask toggle + version history + audit trail + e-sign note
// Per §2.7 A-BN-01..05 — extends PR #150 baseline (RecordsFlatForm, useBeneficiariesStore).

interface BeneficiaryRow {
  id: string;
  employeeId: string;
  employeeName: string;
  beneficiaryName: string;
  relationship: string;
  relationshipEn: string;
  nationalId: string;
  percentage: number;
  updatedDate: string;
  status: 'active' | 'inactive';
}

const MOCK_BENEFICIARIES: BeneficiaryRow[] = [
  { id: 'BEN-001', employeeId: 'EMP001', employeeName: 'สมชาย ใจดี',      beneficiaryName: 'สมหญิง ใจดี',      relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '1-2345-67890-12-3', percentage: 100, updatedDate: '2026-01-15', status: 'active' },
  { id: 'BEN-002', employeeId: 'EMP002', employeeName: 'วิภา รักงาน',       beneficiaryName: 'ประยุทธ รักงาน',   relationship: 'บิดา',     relationshipEn: 'Father',  nationalId: '1-9876-54321-00-1', percentage: 50,  updatedDate: '2026-02-03', status: 'active' },
  { id: 'BEN-003', employeeId: 'EMP002', employeeName: 'วิภา รักงาน',       beneficiaryName: 'ศรีประภา รักงาน',  relationship: 'มารดา',    relationshipEn: 'Mother',  nationalId: '1-9876-54321-00-2', percentage: 50,  updatedDate: '2026-02-03', status: 'active' },
  { id: 'BEN-004', employeeId: 'EMP003', employeeName: 'ธนกร มั่นคง',       beneficiaryName: 'ธนพร มั่นคง',      relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '2-1111-22222-33-4', percentage: 70,  updatedDate: '2025-11-20', status: 'active' },
  { id: 'BEN-005', employeeId: 'EMP003', employeeName: 'ธนกร มั่นคง',       beneficiaryName: 'ธนวัฒน์ มั่นคง',   relationship: 'บุตร',     relationshipEn: 'Child',   nationalId: '2-1111-22222-33-5', percentage: 30,  updatedDate: '2025-11-20', status: 'active' },
  { id: 'BEN-006', employeeId: 'EMP004', employeeName: 'นภาพร สุขสันต์',    beneficiaryName: 'ณัฐพงษ์ สุขสันต์', relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '3-4567-89012-34-5', percentage: 100, updatedDate: '2026-03-10', status: 'active' },
  { id: 'BEN-007', employeeId: 'EMP005', employeeName: 'อาทิตย์ วิจิตร',    beneficiaryName: 'สุมาลี วิจิตร',    relationship: 'มารดา',    relationshipEn: 'Mother',  nationalId: '4-5678-90123-45-6', percentage: 100, updatedDate: '2026-01-28', status: 'active' },
  { id: 'BEN-008', employeeId: 'EMP006', employeeName: 'กมลา ประสิทธิ์',    beneficiaryName: 'ภาณุวัฒน์ ประสิทธิ์', relationship: 'คู่สมรส', relationshipEn: 'Spouse', nationalId: '5-6789-01234-56-7', percentage: 60,  updatedDate: '2025-12-05', status: 'active' },
  { id: 'BEN-009', employeeId: 'EMP006', employeeName: 'กมลา ประสิทธิ์',    beneficiaryName: 'สิริยา ประสิทธิ์',  relationship: 'บุตร',     relationshipEn: 'Child',   nationalId: '5-6789-01234-56-8', percentage: 40,  updatedDate: '2025-12-05', status: 'active' },
  { id: 'BEN-010', employeeId: 'EMP007', employeeName: 'พิชิต เจริญรุ่ง',   beneficiaryName: 'มานิตา เจริญรุ่ง',  relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '6-7890-12345-67-8', percentage: 100, updatedDate: '2026-04-02', status: 'active' },
  { id: 'BEN-011', employeeId: 'EMP008', employeeName: 'รัตนา ศิริโชค',     beneficiaryName: 'ชัยวัฒน์ ศิริโชค',  relationship: 'บิดา',     relationshipEn: 'Father',  nationalId: '7-8901-23456-78-9', percentage: 100, updatedDate: '2026-02-18', status: 'inactive' },
  { id: 'BEN-012', employeeId: 'EMP009', employeeName: 'ประสิทธิ์ แสงทอง', beneficiaryName: 'พรพิมล แสงทอง',   relationship: 'คู่สมรส',  relationshipEn: 'Spouse',  nationalId: '8-9012-34567-89-0', percentage: 100, updatedDate: '2026-03-25', status: 'active' },
];

const BEN_PLAN = getPlan('BE-BEN-001')!;

// ── PII masking helpers ───────────────────────────────────────────────────────

function maskNationalId(id: string): string {
  // "1-2345-67890-12-3" → "X-XXXX-XXXXX-XX-3" (keep last digit)
  return id.replace(/[0-9]/g, (ch, idx, arr) =>
    idx === arr.length - 1 ? ch : 'X',
  );
}

function maskName(name: string): string {
  if (name.length <= 1) return name;
  return name[0] + '***';
}

// ── Audit helpers ─────────────────────────────────────────────────────────────

const AUDIT_FILTERS: { key: AuditAction | 'all'; labelTh: string; labelEn: string }[] = [
  { key: 'all',          labelTh: 'ทั้งหมด',           labelEn: 'All' },
  { key: 'added',        labelTh: 'เพิ่ม',              labelEn: 'Added' },
  { key: 'edited',       labelTh: 'แก้ไข',              labelEn: 'Edited' },
  { key: 'archived',     labelTh: 'เก็บเข้าระบบ',       labelEn: 'Archived' },
  { key: 'pii_accessed', labelTh: 'ดูข้อมูลส่วนบุคคล',  labelEn: 'PII accessed' },
];

function auditActionLabel(action: AuditAction, isTh: boolean): string {
  const map: Record<AuditAction, [string, string]> = {
    added:        ['เพิ่ม',              'Added'],
    edited:       ['แก้ไข',             'Edited'],
    archived:     ['เก็บเข้าระบบ',       'Archived'],
    pii_accessed: ['ดูข้อมูลส่วนบุคคล', 'PII accessed'],
  };
  return isTh ? map[action][0] : map[action][1];
}

function auditActionColor(action: AuditAction): string {
  const map: Record<AuditAction, string> = {
    added:        'bg-success-soft text-success',
    edited:       'bg-info-soft text-info',
    archived:     'bg-canvas-soft text-ink-muted',
    pii_accessed: 'bg-warning-soft text-warning',
  };
  return map[action];
}

export default function AdminBeneficiariesPage() {
  const locale = useLocale();
  const routeParams = useParams<{ locale: string }>();
  const loc = routeParams?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  const [rows] = useState<BeneficiaryRow[]>(MOCK_BENEFICIARIES);
  const [search, setSearch] = useState('');

  // PII toggle (default masked)
  const [piiUnmasked, setPiiUnmasked] = useState(false);

  // Add/Edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<BeneficiaryRow | null>(null);

  // Version history modal
  const [versionRow, setVersionRow] = useState<BeneficiaryRow | null>(null);
  const [versionModalOpen, setVersionModalOpen] = useState(false);

  // Audit trail
  const [auditOpen, setAuditOpen] = useState(true);
  const [auditFilter, setAuditFilter] = useState<AuditAction | 'all'>('all');

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.employeeId.toLowerCase().includes(q) ||
      r.employeeName.toLowerCase().includes(q) ||
      r.beneficiaryName.toLowerCase().includes(q)
    );
  });

  const filteredAudit = auditFilter === 'all'
    ? MOCK_BENEFICIARY_AUDIT
    : MOCK_BENEFICIARY_AUDIT.filter((e) => e.action === auditFilter);

  const openAdd = () => { setEditRow(null); setModalOpen(true); };
  const openEdit = (row: BeneficiaryRow) => { setEditRow(row); setModalOpen(true); };
  const openVersion = (row: BeneficiaryRow) => { setVersionRow(row); setVersionModalOpen(true); };

  const activeCount  = rows.filter((r) => r.status === 'active').length;
  const empCount     = new Set(rows.map((r) => r.employeeId)).size;

  const versionEntries: VersionEntry[] = versionRow
    ? (MOCK_BENEFICIARY_VERSIONS[versionRow.id] ?? [])
    : [];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>
            {isTh ? 'สวัสดิการ · บันทึกโดย HR' : 'Benefits admin · HR records'}
          </CardEyebrow>
          <h1 className="font-display text-[28px] font-semibold text-ink">
            {isTh ? 'ผู้รับผลประโยชน์' : 'Beneficiaries'}
          </h1>
          <p className="mt-2 text-small text-ink-muted">
            {isTh
              ? 'รายชื่อผู้รับผลประโยชน์จากกรมธรรม์ประกันชีวิตและสวัสดิการของพนักงาน'
              : 'Life insurance and benefit policy beneficiaries for all employees.'}
          </p>
        </div>
        <Capability
          action="edit"
          fallback={
            <Button variant="primary" disabled>
              {isTh ? '+ เพิ่มผู้รับผลประโยชน์' : '+ Add Beneficiary'}
            </Button>
          }
        >
          <Button variant="primary" onClick={openAdd}>
            {isTh ? '+ เพิ่มผู้รับผลประโยชน์' : '+ Add Beneficiary'}
          </Button>
        </Capability>
      </header>

      {/* Summary strip */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'รายการทั้งหมด' : 'Total records'}</CardEyebrow>
          <p className="mt-1 font-display text-[24px] font-semibold text-ink tabular-nums">{rows.length}</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'ใช้งานอยู่' : 'Active'}</CardEyebrow>
          <p className="mt-1 font-display text-[24px] font-semibold text-ink tabular-nums">{activeCount}</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'จำนวนพนักงาน' : 'Employees covered'}</CardEyebrow>
          <p className="mt-1 font-display text-[24px] font-semibold text-ink tabular-nums">{empCount}</p>
        </Card>
      </div>

      {/* PII toggle */}
      <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-warning-soft bg-warning-soft/30 px-4 py-3">
        <Toggle
          checked={piiUnmasked}
          onChange={setPiiUnmasked}
          label={
            piiUnmasked
              ? (isTh ? 'ซ่อนข้อมูลส่วนบุคคล' : 'Hide PII')
              : (isTh ? 'แสดงข้อมูลส่วนบุคคล' : 'Show PII')
          }
        />
        <span className="text-small text-ink-muted">
          {isTh
            ? 'ค่าเริ่มต้น: ปิดบังข้อมูลส่วนบุคคล — '
            : 'Default: PII masked — '}
          <span className="font-medium text-warning">
            {isTh ? 'Q8 สิทธิ์ดู PII ยังรอ confirm' : 'Q8 PII access rule pending'}
          </span>
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isTh ? 'ค้นหา รหัสพนักงาน / ชื่อ…' : 'Search employee ID / name…'}
          className="h-10 w-full max-w-sm rounded-[var(--radius-md)] border border-hairline bg-surface px-3 text-small text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-canvas"
        />
        {search && (
          <span className="text-small text-ink-muted">
            {filtered.length} {isTh ? 'รายการ' : 'results'}
          </span>
        )}
      </div>

      {/* Table */}
      <Card variant="raised" size="lg" className="overflow-x-auto">
        <table className="min-w-full text-left text-small">
          <thead>
            <tr className="border-b border-hairline">
              {[
                isTh ? 'รหัส' : 'ID',
                isTh ? 'รหัสพนักงาน' : 'Emp ID',
                isTh ? 'ชื่อพนักงาน' : 'Employee',
                isTh ? 'ชื่อผู้รับผลประโยชน์' : 'Beneficiary',
                isTh ? 'ความสัมพันธ์' : 'Relationship',
                isTh ? 'เลขบัตรประชาชน' : 'National ID',
                isTh ? 'สัดส่วน %' : 'Share %',
                isTh ? 'อัปเดตล่าสุด' : 'Updated',
                isTh ? 'สถานะ' : 'Status',
                '',
              ].map((h, i) => (
                <th key={i} className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-hairline last:border-0 hover:bg-canvas-soft transition-colors">
                <td className="whitespace-nowrap px-3 py-2 font-mono text-ink-muted">{row.id}</td>
                <td className="whitespace-nowrap px-3 py-2 text-ink-soft">{row.employeeId}</td>
                <td className="whitespace-nowrap px-3 py-2 text-ink">{row.employeeName}</td>
                <td className="whitespace-nowrap px-3 py-2 font-medium text-ink">
                  {piiUnmasked ? row.beneficiaryName : maskName(row.beneficiaryName)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-ink-soft">
                  {isTh ? row.relationship : row.relationshipEn}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-ink-soft">
                  {piiUnmasked ? row.nationalId : maskNationalId(row.nationalId)}
                </td>
                <td className="whitespace-nowrap px-3 py-2 tabular-nums text-ink">{row.percentage}%</td>
                <td className="whitespace-nowrap px-3 py-2 text-ink-muted">{row.updatedDate}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <span
                    className={[
                      'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.12em]',
                      row.status === 'active'
                        ? 'bg-success-soft text-success'
                        : 'bg-canvas-soft text-ink-muted',
                    ].join(' ')}
                  >
                    {row.status === 'active'
                      ? (isTh ? 'ใช้งาน' : 'Active')
                      : (isTh ? 'ยกเลิก' : 'Inactive')}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Capability
                      action="edit"
                      fallback={
                        <button disabled className="text-small font-medium text-ink-faint cursor-not-allowed">
                          {isTh ? 'แก้ไข' : 'Edit'}
                        </button>
                      }
                    >
                      <button
                        onClick={() => openEdit(row)}
                        className="text-small font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
                      >
                        {isTh ? 'แก้ไข' : 'Edit'}
                      </button>
                    </Capability>
                    <button
                      onClick={() => openVersion(row)}
                      className="text-small font-medium text-ink-soft hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
                    >
                      {isTh ? 'ประวัติเวอร์ชัน' : 'Version history'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-3 py-8 text-center text-small text-ink-muted">
                  {isTh ? 'ไม่พบรายการ' : 'No records found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Audit trail */}
      <Card variant="raised" size="lg">
        <button
          onClick={() => setAuditOpen((v) => !v)}
          className="flex w-full items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
        >
          <div>
            <CardEyebrow>
              {isTh ? 'ประวัติการเปลี่ยนแปลง · BE-25 A-BN-04' : 'Audit Trail · BE-25 A-BN-04'}
            </CardEyebrow>
            <CardTitle>
              {isTh ? 'ประวัติการเปลี่ยนแปลง (Audit Trail)' : 'Audit Trail'}
            </CardTitle>
          </div>
          <span className="ml-4 text-small text-ink-muted select-none">
            {auditOpen ? '▲' : '▼'}
          </span>
        </button>

        {auditOpen && (
          <div className="mt-4 space-y-4">
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2">
              {AUDIT_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setAuditFilter(f.key)}
                  className={[
                    'rounded-full px-3 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.10em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    auditFilter === f.key
                      ? 'bg-accent text-white'
                      : 'bg-canvas-soft text-ink-muted hover:bg-canvas',
                  ].join(' ')}
                >
                  {isTh ? f.labelTh : f.labelEn}
                </button>
              ))}
            </div>
            {/* Event list */}
            <div className="space-y-2">
              {filteredAudit.map((evt) => (
                <div
                  key={evt.id}
                  className="flex flex-col gap-1 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-4 py-3 sm:flex-row sm:items-start sm:gap-4"
                >
                  <span
                    className={[
                      'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.12em]',
                      auditActionColor(evt.action),
                    ].join(' ')}
                  >
                    {auditActionLabel(evt.action, isTh)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-small font-medium text-ink">
                      {piiUnmasked ? evt.beneficiaryName : maskName(evt.beneficiaryName)}
                      <span className="ml-2 font-mono text-ink-muted">{evt.beneficiaryId}</span>
                    </p>
                    {evt.reason && (
                      <p className="text-small text-ink-muted">{evt.reason}</p>
                    )}
                    <p className="text-[length:var(--text-eyebrow)] text-ink-faint">
                      {evt.actor} · {evt.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {filteredAudit.length === 0 && (
                <p className="py-4 text-center text-small text-ink-muted">
                  {isTh ? 'ไม่พบรายการ' : 'No audit events.'}
                </p>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* E-signature placeholder (A-BN-05) */}
      <Card variant="flat" size="md" className="border border-dashed border-hairline">
        <CardEyebrow>
          A-BN-05 · {isTh ? 'ลายเซ็นอิเล็กทรอนิกส์' : 'E-signature'}
        </CardEyebrow>
        <p className="mt-1 text-small text-ink-muted">
          {isTh
            ? 'ลายเซ็นอิเล็กทรอนิกส์ (Q8) — รอกำหนดผู้ให้บริการ ยังไม่เปิดใช้งานในเวอร์ชันนี้'
            : 'E-signature (Q8) — pending vendor decision. Not active in this release.'}
        </p>
      </Card>

      {/* Q8 footer note */}
      <p className="text-[length:var(--text-eyebrow)] text-ink-faint">
        {isTh
          ? 'Q8 รอ confirm: สิทธิ์ดู PII / เก็บประวัติ / ลายเซ็นอิเล็กทรอนิกส์'
          : 'Q8 pending: PII access rule / audit retention / e-signature vendor'}
      </p>

      {/* Add / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          editRow
            ? (isTh ? `แก้ไขผู้รับผลประโยชน์ — ${editRow.beneficiaryName}` : `Edit Beneficiary — ${editRow.beneficiaryName}`)
            : (isTh ? 'เพิ่มผู้รับผลประโยชน์' : 'Add Beneficiary')
        }
        widthClass="max-w-2xl"
      >
        <RecordsFlatForm
          plan={BEN_PLAN}
          defaultEmployeeId={editRow?.employeeId}
          onSubmitted={() => setModalOpen(false)}
        />
      </Modal>

      {/* Version history modal */}
      <Modal
        open={versionModalOpen}
        onClose={() => setVersionModalOpen(false)}
        title={
          versionRow
            ? (isTh
                ? `ประวัติเวอร์ชัน — ${piiUnmasked ? versionRow.beneficiaryName : maskName(versionRow.beneficiaryName)} (${versionRow.id})`
                : `Version History — ${piiUnmasked ? versionRow.beneficiaryName : maskName(versionRow.beneficiaryName)} (${versionRow.id})`)
            : (isTh ? 'ประวัติเวอร์ชัน' : 'Version History')
        }
        widthClass="max-w-xl"
      >
        {versionEntries.length === 0 ? (
          <p className="py-6 text-center text-small text-ink-muted">
            {isTh ? 'ไม่พบประวัติเวอร์ชัน' : 'No version history available.'}
          </p>
        ) : (
          <div className="space-y-3">
            {versionEntries.map((v) => (
              <div
                key={v.versionId}
                className={[
                  'rounded-[var(--radius-md)] border px-4 py-3',
                  v.isCurrent
                    ? 'border-accent bg-accent/5'
                    : 'border-hairline bg-canvas-soft',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-small font-semibold text-ink">{v.versionId}</span>
                  {v.isCurrent && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.12em] text-white">
                      {isTh ? 'เวอร์ชันปัจจุบัน' : 'Current version'}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[length:var(--text-eyebrow)] text-ink-faint">
                  {v.date} · {v.actor}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {v.changes.map((ch, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-small text-ink-soft">
                      <span className="mt-0.5 shrink-0 text-ink-faint">·</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

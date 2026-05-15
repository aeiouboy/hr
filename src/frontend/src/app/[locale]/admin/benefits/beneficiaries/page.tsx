'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button, Card, CardEyebrow, CardTitle, Modal } from '@/components/humi';
import { Capability } from '@/components/humi';
import { RecordsFlatForm } from '@/components/benefits/templates/RecordsFlatForm';
import type { RecordsFlatFormValues } from '@/components/benefits/templates/RecordsFlatForm';
import { getPlan } from '@/data/benefits/plan-registry';
import { useBeneficiariesStore } from '@/stores/benefit-beneficiaries';
import type { BeneficiaryRow } from '@/stores/benefit-beneficiaries';

// ── Beneficiary management page ───────────────────────────────────────────────
// Table of beneficiaries + Modal-driven add/edit via RecordsFlatForm (BE-BEN-001).
// State is persisted via useBeneficiariesStore (Zustand + localStorage).

const BEN_PLAN = getPlan('BE-BEN-001')!;

export default function AdminBeneficiariesPage() {
  const locale = useLocale();
  const routeParams = useParams<{ locale: string }>();
  const loc = routeParams?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  const rows = useBeneficiariesStore((s) => s.rows);
  const upsertBeneficiary = useBeneficiariesStore((s) => s.upsertBeneficiary);
  const archiveBeneficiary = useBeneficiariesStore((s) => s.archiveBeneficiary);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<BeneficiaryRow | null>(null);

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.employeeId.toLowerCase().includes(q) ||
      r.employeeName.toLowerCase().includes(q) ||
      r.beneficiaryName.toLowerCase().includes(q)
    );
  });

  const openAdd = () => {
    setEditRow(null);
    setModalOpen(true);
  };

  const openEdit = (row: BeneficiaryRow) => {
    setEditRow(row);
    setModalOpen(true);
  };

  const handleSubmitted = (_wfId: string, formValues: RecordsFlatFormValues) => {
    upsertBeneficiary({
      id: editRow?.id,
      employeeId: formValues.employeeId,
      employeeName: editRow?.employeeName ?? formValues.employeeId,
      beneficiaryName: editRow?.beneficiaryName ?? (formValues.notes || formValues.employeeId),
      relationship: editRow?.relationship ?? 'คู่สมรส',
      relationshipEn: editRow?.relationshipEn ?? 'Spouse',
      nationalId: editRow?.nationalId,
      percentage: editRow?.percentage ?? 100,
      status: 'active',
    });
    setModalOpen(false);
  };

  const activeCount = rows.filter((r) => r.status === 'active').length;
  const empCount    = new Set(rows.map((r) => r.employeeId)).size;

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
                <td className="whitespace-nowrap px-3 py-2 font-medium text-ink">{row.beneficiaryName}</td>
                <td className="whitespace-nowrap px-3 py-2 text-ink-soft">
                  {isTh ? row.relationship : row.relationshipEn}
                </td>
                <td className="whitespace-nowrap px-3 py-2 font-mono text-ink-soft">{row.nationalId}</td>
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
                  <div className="flex items-center gap-3">
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
                    {row.status === 'active' && (
                      <Capability
                        action="edit"
                        fallback={
                          <button disabled className="text-small font-medium text-ink-faint cursor-not-allowed">
                            {isTh ? 'เก็บเข้าระบบ' : 'Archive'}
                          </button>
                        }
                      >
                        <button
                          onClick={() => archiveBeneficiary(row.id)}
                          className="text-small font-medium text-ink-muted hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
                        >
                          {isTh ? 'เก็บเข้าระบบ' : 'Archive'}
                        </button>
                      </Capability>
                    )}
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
          onSubmitted={handleSubmitted}
        />
      </Modal>
    </div>
  );
}

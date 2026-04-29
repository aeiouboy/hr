'use client';

import { Card, CardEyebrow, CardTitle, Button } from '@/components/humi';
import { useBenefitClaimsStore } from '@/stores/benefit-claims';

const masterData = [
  ['BEN-MED-OPD', 'Medical reimbursement', 'Medical', 'Reimbursement', 'INC-MED', '2026-01-01', '2026-12-31', 'Active'],
  ['BEN-FUEL', 'Gasoline reimbursement', 'Transportation', 'Reimbursement', 'INC-FUEL', '2026-01-01', '2026-12-31', 'Active'],
  ['BEN-MOBILE', 'Mobile reimbursement', 'Communication', 'Reimbursement', 'INC-MOB', '2026-01-01', '2026-12-31', 'Active'],
];
const eligibility = [
  ['CG-STAFF', 'BEN-MED-OPD', 'Central Group / People Ops', 'Monthly / Staff', 'M1-M4', 'PG1-PG6', '0', '2026-01-01', 'Active'],
  ['CG-FIELD', 'BEN-FUEL', 'Central Group / Operations', 'Monthly / Field', 'S1-M2', 'PG1-PG4', '3', '2026-01-01', 'Active'],
];
const amountRules = [
  ['CG-STAFF', 'Per claim', '5,000', 'Monthly', '30,000', '2026-01-01', 'Active'],
  ['CG-FIELD', 'Mileage', '8 THB/km', 'Monthly', '6,000', '2026-01-01', 'Active'],
];
const fieldConfig = [
  ['Receipt/document no.', 'Visible', 'Mandatory', 'Read/write', 'All reimbursement types'],
  ['OPD/IPD + hospital type', 'Visible', 'Mandatory', 'Read/write', 'Medical only'],
  ['Dependent name/relationship', 'Conditional', 'Mandatory', 'Read/write', 'Dependent claims only'],
  ['Attachment metadata', 'Visible', 'Mandatory', 'Read-only after submit', 'Medical requires first attachment'],
];
const workflowCutoff = [
  ['Medical reimbursement', 'Employee → SPD Benefits → Payment', '1-25 monthly', 'Next payroll date', 'Active'],
  ['Fuel/mobile reimbursement', 'Employee → SPD Benefits → Payment', '1-20 monthly', 'Month-end bank run', 'Active'],
];
const paymentSteps = ['Create period', 'Calculate', 'Post to finance', 'Upload bank file', 'Close period'];

export default function AdminBenefitsPage() {
  const claims = useBenefitClaimsStore((s) => s.claims);
  const pending = claims.filter((c) => c.status === 'pending_spd').length;
  const approved = claims.filter((c) => c.status === 'approved').length;
  const sendBack = claims.filter((c) => c.status === 'send_back').length;
  const totalClaimAmount = claims.reduce((sum, c) => sum + c.totalClaimAmount, 0);
  const remainingAmount = claims.reduce((sum, c) => sum + c.remainingAmount, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>Benefits admin · read-only first pass</CardEyebrow>
          <h1 className="font-display text-[28px] font-semibold text-ink">Benefit configuration, reporting, and payment</h1>
          <p className="mt-2 text-small text-ink-muted">BRD-backed read-only surface. Edit/import/export and integrations are planned follow-ups.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" disabled>Edit planned</Button>
          <Button variant="secondary" disabled>Import planned</Button>
          <Button variant="secondary" disabled>Export planned</Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Summary label="Pending claims" value={pending} />
        <Summary label="Approved claims" value={approved} />
        <Summary label="Send-back claims" value={sendBack} />
        <Summary label="Remaining amount" value={`฿${remainingAmount.toLocaleString('th-TH')}`} />
        <Summary label="Total claim amount" value={`฿${totalClaimAmount.toLocaleString('th-TH')}`} />
      </section>

      <DataSection title="Benefit master data" headers={['Benefit code','Name','Category','Type','Payroll income code','Effective date','End date','Status']} rows={masterData} />
      <DataSection title="Eligibility rules" headers={['Benefit group','Benefit code','Business unit/company','Employee group/subgroup','Job level','Personal grade','Min service month','Effective date','Status']} rows={eligibility} />
      <DataSection title="Amount rules" headers={['Benefit group','Amount type','Amount per claim','Frequency','Maximum amount','Effective date','Status']} rows={amountRules} />
      <DataSection title="Field configuration" headers={['Field name','Visibility','Mandatory','Read-only','Conditional rule']} rows={fieldConfig} />
      <DataSection title="Approval workflow and cutoff" headers={['Benefit plan','Approver lane','Cutoff range','Payment date','Status']} rows={workflowCutoff} />

      <Card variant="raised" size="lg">
        <CardTitle>CSV export preview and payment process</CardTitle>
        <p className="mt-2 text-small text-ink-muted">Preview columns: employee_id, benefit_code, receipt_no, receipt_date, claim_amount, approved_amount, payment_period, status. Actual CSV/Excel export remains disabled.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {paymentSteps.map((step) => <div key={step} className="rounded-md bg-canvas-soft p-3 text-small font-medium text-ink">{step}<div className="mt-1 text-[length:var(--text-eyebrow)] uppercase tracking-[0.14em] text-ink-muted">Read-only / deferred integration</div></div>)}
        </div>
        <p className="mt-4 text-small text-ink-muted">Deferred: bank file generation, finance posting, payroll calculation, real Excel import/export, BE User Management editing for data permission group/application role group/user assignment.</p>
      </Card>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: number | string }) {
  return <Card variant="raised" size="md"><CardEyebrow>{label}</CardEyebrow><p className="mt-1 font-display text-[24px] font-semibold text-ink tabular-nums">{value}</p></Card>;
}

function DataSection({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <Card variant="raised" size="lg" className="overflow-x-auto">
      <CardTitle>{title}</CardTitle>
      <table className="mt-4 min-w-full text-left text-small">
        <thead><tr className="border-b border-hairline">{headers.map((header) => <th key={header} className="whitespace-nowrap px-3 py-2 font-semibold text-ink-muted">{header}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row.join('|')} className="border-b border-hairline last:border-0">{row.map((cell, index) => <td key={`${cell}-${index}`} className="whitespace-nowrap px-3 py-2 text-ink-soft">{cell}</td>)}</tr>)}</tbody>
      </table>
    </Card>
  );
}

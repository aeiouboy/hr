'use client';

import { Card, CardEyebrow, CardTitle } from '@/components/humi';
import { BENEFIT_STATUS_LABEL, useBenefitClaimsStore } from '@/stores/benefit-claims';

const masterData = [
  { code: 'MED-OPD', name: 'Medical reimbursement', category: 'Health', type: 'Reimbursement', payroll: 'BE_MED', effective: '2026-01-01', end: '-', status: 'Active' },
  { code: 'GAS-MONTHLY', name: 'Gasoline reimbursement', category: 'Allowance', type: 'Monthly reimbursement', payroll: 'BE_GAS', effective: '2026-01-01', end: '-', status: 'Active' },
  { code: 'MOB-MONTHLY', name: 'Mobile reimbursement', category: 'Allowance', type: 'Monthly reimbursement', payroll: 'BE_MOB', effective: '2026-01-01', end: '-', status: 'Active' },
];

const eligibility = [
  { group: 'HQ Staff', code: 'MED-OPD', company: 'Central Group / Head Office', empGroup: 'Monthly Staff', subgroup: 'Regular', jobLevel: 'L3-L7', pg: 'PG3+', service: '0', effective: '2026-01-01', status: 'Active' },
  { group: 'Field Sales', code: 'GAS-MONTHLY', company: 'Central Retail / Store Ops', empGroup: 'Monthly Staff', subgroup: 'Sales', jobLevel: 'L2-L6', pg: 'PG2+', service: '3', effective: '2026-01-01', status: 'Active' },
];

const amountRules = [
  { group: 'HQ Staff', type: 'Per claim', amount: 'Actual', frequency: 'Monthly', max: '38,000 / year', effective: '2026-01-01', status: 'Active' },
  { group: 'Field Sales', type: 'Per month', amount: 'Actual', frequency: 'Monthly', max: '10,000 / year', effective: '2026-01-01', status: 'Active' },
  { group: 'All Staff', type: 'Per month', amount: '800', frequency: 'Monthly', max: '9,600 / year', effective: '2026-01-01', status: 'Active' },
];

const fieldConfig = [
  { field: 'Receipt/document no.', visible: 'Yes', mandatory: 'Yes', readOnly: 'No', rule: 'All claim types' },
  { field: 'OPD/IPD', visible: 'Conditional', mandatory: 'Yes', readOnly: 'No', rule: 'Medical only' },
  { field: 'Hospital name', visible: 'Conditional', mandatory: 'Yes', readOnly: 'No', rule: 'Medical only' },
  { field: 'Gasoline claim type', visible: 'Conditional', mandatory: 'Yes', readOnly: 'No', rule: 'Gasoline only' },
  { field: 'Dependent details', visible: 'Conditional', mandatory: 'Yes', readOnly: 'No', rule: 'Dependent claim' },
];

const workflowCutoff = [
  { plan: 'Medical reimbursement', approver: 'SPD Benefits', cutoff: '1-25 monthly', payment: 'Last business day', status: 'Active' },
  { plan: 'Gasoline reimbursement', approver: 'SPD Benefits', cutoff: '1-20 monthly', payment: 'Payroll next cycle', status: 'Active' },
];

const paymentSteps = ['Create period', 'Calculate', 'Post to finance', 'Upload bank file', 'Close period'];

export default function AdminBenefitsPage() {
  const claims = useBenefitClaimsStore((state) => state.claims);
  const pending = claims.filter((claim) => claim.status === 'pending_spd');
  const approved = claims.filter((claim) => claim.status === 'approved');
  const sendBack = claims.filter((claim) => claim.status === 'send_back');
  const totalAmount = claims.reduce((sum, claim) => sum + claim.claimAmount, 0);
  const remaining = claims.reduce((sum, claim) => sum + claim.remainingAmount, 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <CardEyebrow>Admin / Benefits</CardEyebrow>
        <h1 className="font-display text-[28px] font-semibold text-ink">Benefit module configuration, reports, and payment preview</h1>
        <p className="text-body text-ink-muted">Read-only pass 1 surface. Edit, import/export, posting, bank file and payroll integrations are intentionally disabled/planned.</p>
      </header>

      <section className="grid gap-4 md:grid-cols-5">
        <Metric label="Pending claims" value={pending.length.toString()} />
        <Metric label="Approved claims" value={approved.length.toString()} />
        <Metric label="Send-back claims" value={sendBack.length.toString()} />
        <Metric label="Remaining amount" value={`฿${remaining.toLocaleString('th-TH')}`} />
        <Metric label="Total claim amount" value={`฿${totalAmount.toLocaleString('th-TH')}`} />
      </section>

      <ReadonlyActions />
      <DataCard title="Benefit master data" rows={masterData} />
      <DataCard title="Eligibility rules" rows={eligibility} />
      <DataCard title="Amount rules" rows={amountRules} />
      <DataCard title="Field configuration" rows={fieldConfig} />
      <DataCard title="Workflow and cutoff schedule" rows={workflowCutoff} />

      <Card variant="raised" size="lg">
        <CardEyebrow>Reports / CSV export preview</CardEyebrow>
        <CardTitle>Benefit claim report fields</CardTitle>
        <p className="mt-2 text-small text-ink-muted">employeeId, employeeName, benefitCode, benefitName, receiptNo, receiptDate, claimAmount, remainingAmount, status, paymentPeriod</p>
        <div className="mt-3 rounded-[var(--radius-md)] bg-canvas-soft p-3 font-mono text-small text-ink-muted">
          EMP001,จงรักษ์ ทานากะ,MED-OPD,Medical reimbursement,RX-3381,2026-04-15,4820,25600,{claims[0] ? BENEFIT_STATUS_LABEL[claims[0].status] : 'pending_spd'},2026-04
        </div>
        <button type="button" disabled className="mt-4 rounded-full bg-canvas-soft px-4 py-2 text-small font-semibold text-ink-muted opacity-70">Export CSV planned</button>
      </Card>

      <Card variant="raised" size="lg">
        <CardEyebrow>Payment process</CardEyebrow>
        <CardTitle>Read-only payment period status</CardTitle>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {paymentSteps.map((step) => (
            <div key={step} className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3">
              <div className="text-small font-semibold text-ink">{step}</div>
              <div className="mt-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">Deferred integration</div>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="raised" size="lg">
        <CardEyebrow>Deferred BE User Management</CardEyebrow>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-small text-ink-muted">
          <li>Data permission group editing</li>
          <li>Application role group editing</li>
          <li>User assignment management</li>
        </ul>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="humi-stat-card humi-stat-card--accent">
      <CardEyebrow>{label}</CardEyebrow>
      <div className="mt-1 font-display text-[24px] font-semibold text-ink">{value}</div>
    </div>
  );
}

function ReadonlyActions() {
  return (
    <Card variant="raised" size="md">
      <div className="flex flex-wrap gap-2">
        {['Edit setup planned', 'Import Excel planned', 'Export Excel planned', 'Run payment planned'].map((label) => (
          <button key={label} type="button" disabled className="rounded-full bg-canvas-soft px-4 py-2 text-small font-semibold text-ink-muted opacity-70">{label}</button>
        ))}
      </div>
    </Card>
  );
}

function DataCard<T extends Record<string, string>>({ title, rows }: { title: string; rows: T[] }) {
  const headers = Object.keys(rows[0] ?? {});
  return (
    <Card variant="raised" size="lg">
      <CardTitle>{title}</CardTitle>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-left text-small">
          <thead className="text-ink-muted">
            <tr>{headers.map((header) => <th key={header} className="border-b border-hairline px-3 py-2 font-semibold">{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => <td key={header} className="border-b border-hairline-soft px-3 py-2 text-ink-muted">{row[header]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

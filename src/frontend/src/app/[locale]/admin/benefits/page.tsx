'use client';

import { Download, FileSpreadsheet, Lock, WalletCards } from 'lucide-react';
import { Button, Card, CardEyebrow, CardTitle, DataTable, type DataTableColumn } from '@/components/humi';
import { useBenefitClaimsStore } from '@/stores/benefit-claims';

interface BenefitMasterRow {
  code: string;
  name: string;
  category: string;
  type: string;
  payrollIncomeCode: string;
  effectiveDate: string;
  endDate: string;
  status: string;
}

interface EligibilityRow {
  group: string;
  code: string;
  company: string;
  employeeGroup: string;
  employeeSubgroup: string;
  jobLevel: string;
  personalGrade: string;
  minServiceMonth: string;
  effectiveDate: string;
  status: string;
}

const masters: BenefitMasterRow[] = [
  { code: 'MED-OPD', name: 'Medical reimbursement', category: 'Health', type: 'Reimbursement', payrollIncomeCode: 'INC-MED', effectiveDate: '2026-01-01', endDate: '9999-12-31', status: 'Active' },
  { code: 'GAS-001', name: 'Gasoline reimbursement', category: 'Allowance', type: 'Reimbursement', payrollIncomeCode: 'INC-GAS', effectiveDate: '2026-01-01', endDate: '9999-12-31', status: 'Active' },
  { code: 'MOB-CSV', name: 'Mobile reimbursement', category: 'Allowance', type: 'Reimbursement', payrollIncomeCode: 'INC-MOB', effectiveDate: '2026-01-01', endDate: '9999-12-31', status: 'Active' },
];

const eligibility: EligibilityRow[] = [
  { group: 'Retail HQ', code: 'MED-OPD', company: 'Central Group', employeeGroup: 'Monthly', employeeSubgroup: 'Permanent', jobLevel: 'L3+', personalGrade: 'PG3+', minServiceMonth: '0', effectiveDate: '2026-01-01', status: 'Active' },
  { group: 'Store Ops', code: 'GAS-001', company: 'CRC', employeeGroup: 'Monthly', employeeSubgroup: 'Field', jobLevel: 'L4+', personalGrade: 'PG4+', minServiceMonth: '6', effectiveDate: '2026-01-01', status: 'Active' },
];

const amountRules = [
  { group: 'Retail HQ', amountType: 'Per claim', amountPerClaim: '฿5,000', frequency: 'Monthly', maximumAmount: '฿20,000/year', effectiveDate: '2026-01-01', status: 'Active' },
  { group: 'Store Ops', amountType: 'Per month', amountPerClaim: '฿2,000', frequency: 'Monthly', maximumAmount: '฿24,000/year', effectiveDate: '2026-01-01', status: 'Active' },
];

const fieldConfig = [
  { fieldName: 'Receipt / document no.', visibility: 'Visible', mandatory: 'Yes', readOnly: 'No', conditionalRule: 'All reimbursement types' },
  { fieldName: 'Hospital type', visibility: 'Visible', mandatory: 'Medical only', readOnly: 'No', conditionalRule: 'benefitType = medical' },
  { fieldName: 'Dependent name', visibility: 'Visible', mandatory: 'Dependent only', readOnly: 'No', conditionalRule: 'benefitType = dependent' },
  { fieldName: 'Attachments', visibility: 'Visible', mandatory: 'Yes', readOnly: 'No', conditionalRule: 'max 5 files, 10 MB each' },
];

const workflowCutoff = [
  { benefitPlan: 'MED-OPD', approverLane: 'SPD Benefits', cutoffRange: '1-25 monthly', paymentDate: 'Last business day', status: 'Active' },
  { benefitPlan: 'GAS-001', approverLane: 'SPD Benefits → Payroll', cutoffRange: '1-20 monthly', paymentDate: 'Next payroll cycle', status: 'Planned' },
];

const paymentSteps = ['Create period', 'Calculate', 'Post to finance', 'Upload bank file', 'Close period'];
const csvPreview = ['employeeId', 'workflowRequestId', 'benefitCode', 'receiptNo', 'claimAmount', 'status', 'paymentPeriod'];

function columns<T extends object>(keys: Array<keyof T>): DataTableColumn<T>[] {
  return keys.map((key) => ({ id: String(key), header: String(key), cell: (row) => String(row[key] ?? '') }));
}

function PlannedButton({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="ghost" size="sm" disabled leadingIcon={<Lock size={13} />}>
      {children}
    </Button>
  );
}

export default function AdminBenefitsPage() {
  const claims = useBenefitClaimsStore((state) => state.claims);
  const pending = claims.filter((claim) => claim.status === 'pending_spd').length;
  const approved = claims.filter((claim) => claim.status === 'approved').length;
  const sendBack = claims.filter((claim) => claim.status === 'send_back').length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.claimAmount, 0);
  const remaining = claims.reduce((sum, claim) => sum + claim.remainingAmount, 0);

  const summary = [
    { label: 'Pending claims', value: pending.toLocaleString('th-TH') },
    { label: 'Approved claims', value: approved.toLocaleString('th-TH') },
    { label: 'Send-back claims', value: sendBack.toLocaleString('th-TH') },
    { label: 'Remaining amount', value: `฿${remaining.toLocaleString('th-TH')}` },
    { label: 'Total claim amount', value: `฿${totalAmount.toLocaleString('th-TH')}` },
  ];

  return (
    <div className="space-y-6 pb-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <CardEyebrow>Benefit administration</CardEyebrow>
          <h1 className="mt-1 font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] text-ink">
            Benefits master, workflow, reporting and payment readiness
          </h1>
          <p className="mt-2 max-w-3xl text-body text-ink-muted">
            Read-only BRD-backed pass 1 surface. Edit, import, export, bank file, finance posting and payroll calculation are deferred integrations.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PlannedButton>Edit</PlannedButton>
          <PlannedButton>Import Excel</PlannedButton>
          <PlannedButton>Export Excel</PlannedButton>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {summary.map((item) => (
          <Card key={item.label} variant="raised" size="md">
            <CardEyebrow>{item.label}</CardEyebrow>
            <p className="mt-2 font-display text-[length:var(--text-display-h2)] font-semibold text-ink">{item.value}</p>
          </Card>
        ))}
      </section>

      <Card variant="raised" size="lg">
        <div className="mb-4 flex items-center justify-between gap-3">
          <CardTitle>Benefit master data</CardTitle>
          <WalletCards className="text-ink-muted" size={18} />
        </div>
        <DataTable rows={masters} columns={columns<BenefitMasterRow>(['code', 'name', 'category', 'type', 'payrollIncomeCode', 'effectiveDate', 'endDate', 'status'])} caption="Benefit master data" rowKey={(row) => row.code} />
      </Card>

      <Card variant="raised" size="lg">
        <CardTitle>Eligibility rules</CardTitle>
        <div className="mt-4"><DataTable rows={eligibility} columns={columns<EligibilityRow>(['group', 'code', 'company', 'employeeGroup', 'employeeSubgroup', 'jobLevel', 'personalGrade', 'minServiceMonth', 'effectiveDate', 'status'])} caption="Eligibility rules" rowKey={(row) => `${row.group}-${row.code}`} /></div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card variant="raised" size="lg">
          <CardTitle>Amount rules</CardTitle>
          <div className="mt-4"><DataTable rows={amountRules} columns={columns(['group', 'amountType', 'amountPerClaim', 'frequency', 'maximumAmount', 'effectiveDate', 'status'])} caption="Amount rules" rowKey={(row) => `${row.group}-${row.amountType}`} /></div>
        </Card>
        <Card variant="raised" size="lg">
          <CardTitle>Field configuration</CardTitle>
          <div className="mt-4"><DataTable rows={fieldConfig} columns={columns(['fieldName', 'visibility', 'mandatory', 'readOnly', 'conditionalRule'])} caption="Field configuration" rowKey={(row) => row.fieldName} /></div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card variant="raised" size="lg">
          <CardTitle>Approval workflow and cutoff schedule</CardTitle>
          <div className="mt-4"><DataTable rows={workflowCutoff} columns={columns(['benefitPlan', 'approverLane', 'cutoffRange', 'paymentDate', 'status'])} caption="Approval workflow and cutoff schedule" rowKey={(row) => row.benefitPlan} /></div>
        </Card>
        <Card variant="raised" size="lg">
          <CardTitle>Reports / payment preview</CardTitle>
          <div className="mt-4 rounded-md bg-canvas-soft p-4">
            <div className="mb-2 flex items-center gap-2 text-small font-semibold text-ink"><FileSpreadsheet size={15} /> CSV export shape preview</div>
            <code className="block whitespace-pre-wrap text-small text-ink-muted">{csvPreview.join(', ')}</code>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {paymentSteps.map((step) => <div key={step} className="rounded-md border border-hairline bg-surface px-4 py-3 text-small font-medium text-ink-muted">{step} · read-only planned</div>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="ghost" disabled leadingIcon={<Download size={13} />}>Export CSV · planned</Button>
            <PlannedButton>Post to finance</PlannedButton>
            <PlannedButton>Generate bank file</PlannedButton>
          </div>
        </Card>
      </div>

      <Card variant="raised" size="lg" className="border border-accent/20">
        <CardTitle>Deferred BE User Management</CardTitle>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-small text-ink-muted">
          <li>Data permission group editing</li>
          <li>Application role group assignment</li>
          <li>User assignment and real role enforcement beyond existing app RBAC</li>
        </ul>
      </Card>
    </div>
  );
}

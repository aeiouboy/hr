import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import {
  deriveRecordTypeFromBenefitTypeGroup,
  type BenefitTypeGroup,
} from '@/data/benefits/plan-registry';
import {
  Tab1IdentityFields,
  type Tab1IdentityValues,
} from '@/components/benefits/Tab1IdentityFields';

const baseValues: Tab1IdentityValues = {
  ttt: '',
  planKey: 'BE-NEW-001',
  nameTh: 'แผนใหม่',
  nameEn: 'New plan',
  category: 'medical',
  schemaVersion: 'v2',
  template: 'simple-claim',
  effectiveFrom: '',
  effectiveTo: '',
  country: 'TH',
  status: 'active',
  benefitTypeGroup: 'reimbursement-employee-hr',
  enrolment: 'auto',
  claimPeriod: 'year',
  entitlementCalcMethod: 'full',
  eligibleClaimDate: '30',
  company: '',
};

function IdentityHarness() {
  const [values, setValues] = useState(baseValues);

  return (
    <Tab1IdentityFields
      values={values}
      onChange={(field, value) => setValues((prev) => ({ ...prev, [field]: value }))}
      mode="create"
      isTh={false}
    />
  );
}

describe('benefit plan record type derivation', () => {
  it.each<[BenefitTypeGroup, ReturnType<typeof deriveRecordTypeFromBenefitTypeGroup>]>([
    ['reimbursement-employee-hr', 'claimable'],
    ['reimbursement-hr', 'claimable'],
    ['info', 'info'],
    ['record', 'records'],
  ])('derives %s benefit groups as %s records', (benefitTypeGroup, recordType) => {
    expect(deriveRecordTypeFromBenefitTypeGroup(benefitTypeGroup)).toBe(recordType);
  });

  it('removes the plan-prefix radio surface and displays record type from benefit type', async () => {
    const user = userEvent.setup();
    render(<IdentityHarness />);

    expect(screen.queryByRole('radiogroup', { name: /plan name prefix/i })).not.toBeInTheDocument();
    expect(screen.getByText('Derived record type:')).toBeInTheDocument();
    expect(screen.getByText('claimable')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/Benefit type/), 'record');

    expect(screen.getByText('records')).toBeInTheDocument();
  });
});

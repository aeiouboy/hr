import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Capability } from '@/components/humi/atoms/Capability';
import { useAuthStore } from '@/stores/auth-store';
import type { Role } from '@/lib/rbac';

function loginAs(roles: Role[]) {
  useAuthStore.getState().setUser({
    id: `T-${roles.join('-')}`,
    name: roles.join('+'),
    email: `${roles[0]}@test.local`,
    roles,
  });
}

describe('<Capability> gate', () => {
  beforeEach(() => {
    useAuthStore.getState().clearUser();
  });

  it('hides children when entity is hidden for the current role', () => {
    loginAs(['manager']);
    render(
      <Capability entity="BenefitEmployeeClaim">
        <div>secret-claim-data</div>
      </Capability>,
    );
    expect(screen.queryByText('secret-claim-data')).toBeNull();
  });

  it('renders children when entity is visible for the current role', () => {
    loginAs(['hr_admin']);
    render(
      <Capability entity="BenefitEmployeeClaim">
        <div>secret-claim-data</div>
      </Capability>,
    );
    expect(screen.getByText('secret-claim-data')).toBeInTheDocument();
  });

  it('hides children when action is denied (Manager has no bulkApprove)', () => {
    loginAs(['manager']);
    render(
      <Capability action="bulkApprove">
        <button>Bulk Approve</button>
      </Capability>,
    );
    expect(screen.queryByText('Bulk Approve')).toBeNull();
  });

  it('renders children when action is allowed (HRBP has bulkApprove)', () => {
    loginAs(['hrbp']);
    render(
      <Capability action="bulkApprove">
        <button>Bulk Approve</button>
      </Capability>,
    );
    expect(screen.getByText('Bulk Approve')).toBeInTheDocument();
  });

  it('AND-gates entity + action — both must pass', () => {
    loginAs(['spd']); // SPD has bulkApprove + BenefitEmployeeClaim partial
    render(
      <Capability entity="BenefitEmployeeClaim" action="bulkApprove">
        <div>spd-bulk</div>
      </Capability>,
    );
    expect(screen.getByText('spd-bulk')).toBeInTheDocument();
  });

  it('AND-gate denies when one side fails (Manager has approve but no claim view)', () => {
    loginAs(['manager']);
    render(
      <Capability entity="BenefitEmployeeClaim" action="approve">
        <div>manager-claim-approve</div>
      </Capability>,
    );
    // Manager can approve generic workflows but cannot see BenefitEmployeeClaim → denied
    expect(screen.queryByText('manager-claim-approve')).toBeNull();
  });

  it('renders fallback when gate denies', () => {
    loginAs(['manager']);
    render(
      <Capability action="talentSearch" fallback={<span>denied</span>}>
        <button>Search</button>
      </Capability>,
    );
    expect(screen.queryByText('Search')).toBeNull();
    expect(screen.getByText('denied')).toBeInTheDocument();
  });

  it('Talent Search visible to HRBP only', () => {
    loginAs(['hrbp']);
    const { unmount } = render(
      <Capability action="talentSearch">
        <button>Talent</button>
      </Capability>,
    );
    expect(screen.getByText('Talent')).toBeInTheDocument();
    unmount();

    loginAs(['hr_admin']);
    render(
      <Capability action="talentSearch">
        <button>Talent</button>
      </Capability>,
    );
    expect(screen.queryByText('Talent')).toBeNull();
  });
});

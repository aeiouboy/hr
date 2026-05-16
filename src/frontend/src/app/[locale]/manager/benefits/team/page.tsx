'use client';

// STA-28 PR-A — Manager Benefits: Team Overview stub
// TODO(STA-28 PR-D): Implement team benefits summary — entitlement usage, pending claims per report
import { BenefitStubPage } from '@/components/benefits/BenefitStubPage';

export default function ManagerBenefitsTeamPage() {
  return (
    <BenefitStubPage
      prSlug="PR-D"
      titleTh="สวัสดิการทีม"
      titleEn="Team Benefits"
    />
  );
}

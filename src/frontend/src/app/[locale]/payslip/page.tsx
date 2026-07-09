'use client';

// ════════════════════════════════════════════════════════════
// /payslip — standalone employee pay-statement page
// The "สลิปเงินเดือน" menu leaf now lands here (no longer redirects to the
// Profile employment tab). Renders the shared <PayStatements/> list so the
// statements markup stays DRY with the profile Compensation card.
// AppShell owns sidebar+topbar; this file renders the main column only.
// ════════════════════════════════════════════════════════════

import { Wallet } from 'lucide-react';
import { Card, CardEyebrow } from '@/components/humi';
import { DemoValuesDisclaimer } from '@/components/humi/molecules/DemoValuesDisclaimer';
import PayStatements from '@/components/profile/PayStatements';
import { cn } from '@/lib/utils';

export default function PayslipPage() {
  return (
    <>
      <header className="humi-page-head mb-8">
        <div className="flex flex-col gap-1">
          <CardEyebrow>เงินเดือน</CardEyebrow>
          <h1
            className={cn(
              'flex items-center gap-2 font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]',
            )}
          >
            <Wallet size={28} aria-hidden />
            สลิปเงินเดือน
          </h1>
        </div>
      </header>

      <Card variant="raised" size="lg">
        <DemoValuesDisclaimer compact className="mb-4" />
        <PayStatements variant="standalone" />
      </Card>
    </>
  );
}

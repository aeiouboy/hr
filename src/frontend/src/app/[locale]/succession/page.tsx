'use client';

// AppShell is provided by [locale]/layout.tsx — no need to wrap with the
// legacy <PageLayout>, which renders its own Header+Sidebar and creates
// a doubled-nav "mixed design" against the Humi shell (Bug 2026-04-22).
// RBAC gating that PageLayout used to apply must be re-introduced at
// AppShell-level in a follow-up sprint.
import { SuccessionPage } from '@/components/succession/succession-page';

export default function SuccessionPlanning() {
  return <SuccessionPage />;
}

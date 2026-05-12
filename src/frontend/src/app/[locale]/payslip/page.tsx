import { redirect } from 'next/navigation';

// Legacy payslip page — salary statements now live inside Profile > Compensation.
// Server-side redirect so existing bookmarks and command-palette links still resolve.
export default async function LegacyPayslipRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/profile/me?tab=compensation#pay-statements`);
}

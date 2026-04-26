import { redirect } from 'next/navigation';

// Legacy shadcn payslip page — superseded by Humi route at /employees/me/payslip.
// Server-side redirect so existing bookmarks / inbound CompensationSummary links still resolve.
export default async function LegacyPayslipRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/employees/me/payslip`);
}

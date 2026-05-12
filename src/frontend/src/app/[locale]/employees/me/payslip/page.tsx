import { redirect } from 'next/navigation';

// Legacy payslip deep link — salary statements now live inside Profile > Compensation.
export default async function EmployeePayslipRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/profile/me?tab=compensation#pay-statements`);
}

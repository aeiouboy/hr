import { redirect } from 'next/navigation';
import { benefitProfileRoute } from '@/lib/benefit-routes';

export default async function EmployeeBenefitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(benefitProfileRoute(locale));
}

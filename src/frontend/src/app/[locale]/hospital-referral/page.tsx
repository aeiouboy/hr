import { redirect } from 'next/navigation';
import { benefitReferralRoute } from '@/lib/benefit-routes';

export default async function HospitalReferralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(benefitReferralRoute(locale));
}

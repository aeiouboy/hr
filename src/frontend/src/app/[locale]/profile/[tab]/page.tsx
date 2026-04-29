import { redirect } from 'next/navigation';

export default async function ProfileTabPage({
  params,
}: {
  params: Promise<{ locale: string; tab: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/profile/me`);
}

import { redirect } from 'next/navigation';

// /{locale} has no canonical surface — it used to host a legacy mockup home
// built on components/shared/* (pre-Humi sidebar), which double-rendered when
// the new locale/layout.tsx wraps everything in humi/shell/AppShell.
// The Humi-native home is /{locale}/home, so bounce there.

export default async function LocaleRoot({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/home`);
}

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AppShell } from '@/components/humi/AppShell';
import { ThemeProvider } from '@/components/shared/theme-provider';

export default async function LocaleLayout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 if (!hasLocale(routing.locales, locale)) {
 notFound();
 }

 const messages = (await import(`../../../messages/${locale}.json`)).default;

 return (
 <NextIntlClientProvider locale={locale} messages={messages}>
 <ThemeProvider>
 <AppShell>{children}</AppShell>
 </ThemeProvider>
 </NextIntlClientProvider>
 );
}

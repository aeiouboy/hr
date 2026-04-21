// humi-locale.ts
// Helper functions for locale switching: swap /th/ ↔ /en/ in pathname.

export type SupportedLocale = 'th' | 'en';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['th', 'en'];

/** Extract current locale from pathname. Defaults to 'th'. */
export function getLocaleFromPath(pathname: string): SupportedLocale {
  const m = pathname.match(/^\/(th|en)(\/|$)/);
  return (m?.[1] as SupportedLocale) ?? 'th';
}

/** Swap locale segment in pathname.
 *  /th/goals → /en/goals
 *  /en/profile/me → /th/profile/me
 *  / → /th/
 */
export function swapLocale(pathname: string, nextLocale: SupportedLocale): string {
  const current = getLocaleFromPath(pathname);
  if (current === nextLocale) return pathname;
  // Replace the leading /th or /en segment
  const replaced = pathname.replace(/^\/(th|en)/, `/${nextLocale}`);
  // If pathname had no locale prefix, prepend it
  if (replaced === pathname) return `/${nextLocale}${pathname}`;
  return replaced;
}

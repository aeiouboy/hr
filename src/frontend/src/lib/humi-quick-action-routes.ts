import { defaultLocale, type Locale } from '@/i18n/config';

const LOCALE_PREFIX_RE = /^\/(th|en)(?=\/|$)/;
const EXTERNAL_HREF_RE = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

export interface QuickActionRouteInput {
  href: string;
}

interface HrefParts {
  path: string;
  suffix: string;
}

export function normalizeQuickActionLocale(locale: string | null | undefined): Locale {
  return locale === 'en' || locale === 'th' ? locale : defaultLocale;
}

function splitHref(href: string): HrefParts {
  const hashIndex = href.indexOf('#');
  const queryIndex = href.indexOf('?');
  const suffixIndex = [queryIndex, hashIndex].filter((i) => i >= 0).sort((a, b) => a - b)[0];

  if (suffixIndex === undefined) {
    return { path: href, suffix: '' };
  }

  return {
    path: href.slice(0, suffixIndex),
    suffix: href.slice(suffixIndex),
  };
}

function stripLocalePrefix(path: string): string {
  const stripped = path.replace(LOCALE_PREFIX_RE, '');
  if (!stripped || stripped === '/') return '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

function localizeBarePath(path: string, locale: Locale): string {
  const barePath = stripLocalePrefix(path);
  return barePath === '/' ? `/${locale}` : `/${locale}${barePath}`;
}

export function localizeInternalQuickActionHref(href: string, localeInput: string | null | undefined): string {
  if (EXTERNAL_HREF_RE.test(href)) return href;

  const locale = normalizeQuickActionLocale(localeInput);
  const { path, suffix } = splitHref(href);

  return `${localizeBarePath(path || '/', locale)}${suffix}`;
}

/**
 * Normalizes admin/persisted quick-action hrefs before they reach the presentational tile.
 * Returns null for non-canonical entry points that should stay configured but hidden on Home.
 */
export function normalizeQuickActionHref(
  href: string,
  localeInput: string | null | undefined,
): string | null {
  if (EXTERNAL_HREF_RE.test(href)) return href;

  const locale = normalizeQuickActionLocale(localeInput);
  const { path, suffix } = splitHref(href);
  const barePath = stripLocalePrefix(path || '/');

  if (barePath === '/ess/profile/edit') {
    return null;
  }

  if (barePath === '/employees/me/payslip' || barePath === '/payslip') {
    return `/${locale}/profile/me?tab=employment#pay-statements`;
  }

  return `${localizeBarePath(barePath, locale)}${suffix}`;
}

export function normalizeQuickActionRoutes<T extends QuickActionRouteInput>(
  actions: T[],
  localeInput: string | null | undefined,
): T[] {
  return actions.flatMap((action) => {
    const normalizedHref = normalizeQuickActionHref(action.href, localeInput);
    return normalizedHref ? [{ ...action, href: normalizedHref }] : [];
  });
}

import { describe, expect, it } from 'vitest';
import {
  localizeInternalQuickActionHref,
  normalizeQuickActionHref,
  normalizeQuickActionLocale,
  normalizeQuickActionRoutes,
} from '@/lib/humi-quick-action-routes';

describe('humi quick action route normalization', () => {
  it('normalizes supported and unknown locales safely', () => {
    expect(normalizeQuickActionLocale('en')).toBe('en');
    expect(normalizeQuickActionLocale('th')).toBe('th');
    expect(normalizeQuickActionLocale('fr')).toBe('th');
    expect(normalizeQuickActionLocale(undefined)).toBe('th');
  });

  it.each([
    ['/th/employees/me/payslip', 'th', '/th/profile/me?tab=employment#pay-statements'],
    ['/en/employees/me/payslip', 'en', '/en/profile/me?tab=employment#pay-statements'],
    ['/employees/me/payslip', 'en', '/en/profile/me?tab=employment#pay-statements'],
    ['/th/payslip', 'en', '/en/profile/me?tab=employment#pay-statements'],
  ])('canonicalizes legacy payslip href %s for locale %s', (href, locale, expected) => {
    expect(normalizeQuickActionHref(href, locale)).toBe(expected);
  });

  it('localizes internal hrefs while preserving query/hash suffixes', () => {
    expect(localizeInternalQuickActionHref('/th/timeoff?tab=request#form', 'en')).toBe(
      '/en/timeoff?tab=request#form',
    );
    expect(normalizeQuickActionHref('/requests?type=doc#start', 'th')).toBe('/th/requests?type=doc#start');
  });

  it('leaves external hrefs unchanged', () => {
    expect(normalizeQuickActionHref('https://example.com/payslip', 'en')).toBe('https://example.com/payslip');
    expect(localizeInternalQuickActionHref('//example.com/path', 'th')).toBe('//example.com/path');
  });

  it('hides non-canonical profile edit entry point on Home without deleting config', () => {
    expect(normalizeQuickActionHref('/th/ess/profile/edit', 'th')).toBeNull();
    expect(normalizeQuickActionRoutes([
      { labelTh: 'จัดการข้อมูลของฉัน', href: '/th/ess/profile/edit' },
      { labelTh: 'ดูข้อมูลส่วนตัว', href: '/th/profile/me' },
    ], 'en')).toEqual([{ labelTh: 'ดูข้อมูลส่วนตัว', href: '/en/profile/me' }]);
  });
});

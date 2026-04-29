export const BENEFIT_PROFILE_ROUTE = '/profile/me?tab=benefits';

export function benefitProfileRoute(locale: string) {
  return `/${locale}${BENEFIT_PROFILE_ROUTE}`;
}

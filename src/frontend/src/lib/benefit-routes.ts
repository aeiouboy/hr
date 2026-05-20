export const BENEFIT_PROFILE_ROUTE = '/profile/me?tab=benefits';
export const BENEFITS_HUB_ROUTE = '/benefits-hub';
export const BENEFIT_REIMBURSEMENT_ROUTE = '/benefits-hub/reimbursement';
export const BENEFIT_HOSPITAL_CLAIM_ROUTE = '/benefits-hub/hospital-claim';
export const BENEFIT_REFERRAL_ROUTE = '/benefits-hub/referral';
export const BENEFIT_TAX_PLANNING_ROUTE = '/payroll/tax-planning';

function localizedRoute(locale: string | null | undefined, route: string) {
  return `/${locale || 'th'}${route}`;
}

export function benefitProfileRoute(locale: string | null | undefined) {
  return localizedRoute(locale, BENEFIT_PROFILE_ROUTE);
}

export function benefitReimbursementRoute(locale: string | null | undefined, allowanceId?: string) {
  const route = localizedRoute(locale, BENEFIT_REIMBURSEMENT_ROUTE);
  return allowanceId ? `${route}?allowance=${encodeURIComponent(allowanceId)}` : route;
}

export function benefitHospitalClaimRoute(locale: string | null | undefined) {
  return localizedRoute(locale, BENEFIT_HOSPITAL_CLAIM_ROUTE);
}

export function benefitReferralRoute(locale: string | null | undefined) {
  return localizedRoute(locale, BENEFIT_REFERRAL_ROUTE);
}

export function benefitTaxPlanningRoute(locale: string | null | undefined) {
  return localizedRoute(locale, BENEFIT_TAX_PLANNING_ROUTE);
}

export function benefitsHubRoute(locale: string | null | undefined) {
  return localizedRoute(locale, BENEFITS_HUB_ROUTE);
}

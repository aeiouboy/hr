/** salaryChangePct must be in 0-50 range */
export function isSalaryPctValid(pct: number): boolean {
  return pct >= 0 && pct <= 50
}

export const PROMOTION_POSITION_CHANGE_EVENT_REASONS = [
  'PRM_PRM',
  'PRM_DEMO',
  'PRCHG_PROMO',
  'PRCHG_ADJPOS',
] as const

export function promotionEventReasonRequiresPosition(eventReason: string | null): boolean {
  return eventReason
    ? PROMOTION_POSITION_CHANGE_EVENT_REASONS.includes(
        eventReason as (typeof PROMOTION_POSITION_CHANGE_EVENT_REASONS)[number],
      )
    : false
}

type PromotionFormValidityInput = {
  salaryChangePct: string
  effectiveDate: string | null
  eventReason: string | null
  hasSelectedPosition: boolean
}

export function isPromotionFormSubmittable({
  salaryChangePct,
  effectiveDate,
  eventReason,
  hasSelectedPosition,
}: PromotionFormValidityInput): boolean {
  const pct = parseFloat(salaryChangePct)
  const salaryInvalid = salaryChangePct !== '' && (Number.isNaN(pct) || !isSalaryPctValid(pct))
  const requiresPosition = promotionEventReasonRequiresPosition(eventReason)

  return !!effectiveDate && !!eventReason && !salaryInvalid && (!requiresPosition || hasSelectedPosition)
}

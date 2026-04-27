// thaiNationalId.ts — Thai National ID mod-11 checksum validator
//
// SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].nationalId
// SF cardType = "tni2" for Thai National ID (PerNationalId entity)
//
// Algorithm (Royal Thai Government standard):
//   weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
//   sum = sum(digit[i] * weights[i]) for i in 0..11
//   checkDigit = (11 - (sum % 11)) % 10
//   valid when checkDigit === digit[12]
//
// % 10 (not % 11) wraps the result into a single digit when (11 - sum%11) is 10 or 11.

/**
 * Validates Thai National ID (13-digit) using mod-11 checksum.
 * Returns true for valid IDs, false for invalid.
 * Only applies when cardType = "tni2" (Thai National ID).
 *
 * SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].cardType = "tni2"
 */
export function validateThaiNationalIdMod11(id: string): boolean {
  if (!id) return false
  const cleanId = id.replace(/\D/g, '')
  if (!/^\d{13}$/.test(cleanId)) return false

  const digits = cleanId.split('').map(Number)
  const weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weights[i]
  }

  const checkDigit = (11 - (sum % 11)) % 10
  return checkDigit === digits[12]
}

/**
 * Maps Humi cardType IDs to SF PerNationalId.cardType codes.
 * SF cite: qas-fields-2026-04-26/sf-qas-PerNationalId-2026-04-26.json#.d.results[0].cardType
 */
export const SF_CARD_TYPE_MAP: Record<string, string> = {
  // SF cite: PerNationalId.cardType = "tni2" for Thai National ID
  NATIONAL_ID: 'tni2',
  PASSPORT:    'passport',
  WORK_PERMIT: 'workPermit',
  ALIEN_ID:    'alienId',
  OTHER:       'other',
}

/** Returns true if the cardType requires Thai mod-11 validation */
export function requiresThaiMod11(cardType: string | null | undefined): boolean {
  return cardType === 'NATIONAL_ID'
}

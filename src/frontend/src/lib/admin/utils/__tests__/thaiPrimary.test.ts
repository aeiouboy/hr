import { describe, it, expect } from 'vitest'
import { validateThaiPrimary } from '../thaiPrimary'

describe('validateThaiPrimary', () => {
  it('accepts pure Thai', () => expect(validateThaiPrimary('สลิปเงินเดือน')).toBe(true))
  it('accepts mixed Thai+English', () => expect(validateThaiPrimary('สลิป Pay Slip')).toBe(true))
  it('rejects English-only', () => expect(validateThaiPrimary('Pay Statement')).toBe(false))
  it('rejects empty', () => expect(validateThaiPrimary('')).toBe(false))
  it('rejects whitespace-only', () => expect(validateThaiPrimary('   ')).toBe(false))
})

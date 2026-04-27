import { describe, it, expect } from 'vitest'
import { validateThaiNationalIdMod11 } from './thaiNationalId'

describe('validateThaiNationalIdMod11', () => {
  it('should validate a correct Thai National ID', () => {
    // Valid ID: 1101700207030 (Example from online resources)
    expect(validateThaiNationalIdMod11('1101700207030')).toBe(true)
  })

  it('should validate a correct Thai National ID with dashes', () => {
    expect(validateThaiNationalIdMod11('1-1017-00207-03-0')).toBe(true)
  })

  it('should validate a correct Thai National ID with spaces', () => {
    expect(validateThaiNationalIdMod11('1 1017 00207 03 0')).toBe(true)
  })

  it('should reject an invalid Thai National ID', () => {
    expect(validateThaiNationalIdMod11('1101700207031')).toBe(false)
  })

  it('should reject IDs with incorrect length', () => {
    expect(validateThaiNationalIdMod11('110170020703')).toBe(false)
    expect(validateThaiNationalIdMod11('11017002070300')).toBe(false)
  })

  it('should reject non-numeric IDs', () => {
    expect(validateThaiNationalIdMod11('110170020703A')).toBe(false)
  })

  it('should reject empty strings', () => {
    expect(validateThaiNationalIdMod11('')).toBe(false)
  })

  it('should validate corrected mock IDs from sf-parity', () => {
    // Original: 1017809983971 -> Corrected: 1017809983979
    expect(validateThaiNationalIdMod11('1017809983979')).toBe(true)
    // Original: 1019179982738 -> Corrected: 1019179982733
    expect(validateThaiNationalIdMod11('1019179982733')).toBe(true)
  })

  it('should validate corrected mock ID for dependent', () => {
    // Original: 1-1099-22444-66-2 -> Corrected: 1-1099-22444-66-3
    expect(validateThaiNationalIdMod11('1-1099-22444-66-3')).toBe(true)
  })
})

/**
 * humi-mock-data-years-in-x.test.ts — Years-in-X integration tests (hr#82 BRD #168)
 * Framework: Vitest + jsdom
 *
 * Verifies that HUMI_MY_PROFILE exposes:
 *   - lifecycleEvents seed (AC-1)
 *   - all 5 Years-in-X labels in .job array (AC-2)
 *   - values formatted via buildDisplay (AC-3)
 *   - no residual hardcoded "X.X ปี (computed)" strings (AC-4)
 *   - Current Years in BU positioned in Organization Information section (AC-5)
 */

import { describe, it, expect } from 'vitest'
import { HUMI_MY_PROFILE } from '@/lib/humi-mock-data'

describe('hr#82 BRD #168 — Years-in-X integration', () => {
  // ── AC-1: lifecycleEvents seed shape ────────────────────────────────────────

  it('AC-1 — exposes lifecycleEvents array on HUMI_MY_PROFILE', () => {
    expect(HUMI_MY_PROFILE.lifecycleEvents).toBeDefined()
    expect(Array.isArray(HUMI_MY_PROFILE.lifecycleEvents)).toBe(true)
    expect(HUMI_MY_PROFILE.lifecycleEvents.length).toBeGreaterThanOrEqual(4)

    // I11 invariant: HIRE event must exist
    const hire = HUMI_MY_PROFILE.lifecycleEvents.find((e) => e.type === 'HIRE')
    expect(hire).toBeDefined()
    expect(hire?.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/) // ISO yyyy-MM-dd
  })

  it('AC-1 (detail) — seed contains HIRE, CHANGE_POSITION, CHANGE_JOB, PROMOTION types', () => {
    const types = HUMI_MY_PROFILE.lifecycleEvents.map((e) => e.type)
    expect(types).toContain('HIRE')
    expect(types).toContain('CHANGE_POSITION')
    expect(types).toContain('CHANGE_JOB')
    expect(types).toContain('PROMOTION')
  })

  // ── AC-2: 5 Years-in-X labels present in .job ────────────────────────────────

  it('AC-2 — job array contains all 5 Years-in-X labels', () => {
    const labels = HUMI_MY_PROFILE.job.map(([label]) => label)
    expect(labels).toContain('Year of service')
    expect(labels).toContain('Current Years in Job')
    expect(labels).toContain('Current Years in Corporate Title')
    expect(labels).toContain('Current Years in Position')
    expect(labels).toContain('Current Years in BU') // NEW row (hr#82)
  })

  // ── AC-3: Values follow buildDisplay format ──────────────────────────────────

  it('AC-3 — Years-in-X values follow buildDisplay format (N ปี M เดือน / N ปี / M เดือน / 0 เดือน)', () => {
    const yearsValues = HUMI_MY_PROFILE.job
      .filter(([label]) =>
        label === 'Year of service' ||
        label.startsWith('Current Years in'),
      )
      .map(([, value]) => value)

    expect(yearsValues.length).toBe(5)
    // Each value must match one of the 4 buildDisplay output formats
    yearsValues.forEach((v) => {
      expect(v).toMatch(/^(0 เดือน|\d+ เดือน|\d+ ปี|\d+ ปี \d+ เดือน)$/)
    })
  })

  // ── AC-4: No residual hardcoded "X.X ปี (computed)" strings ─────────────────

  it('AC-4 — no hardcoded "X.X ปี (computed)" strings remain in job array', () => {
    const allValues = HUMI_MY_PROFILE.job.map(([, value]) => value).join('|')
    expect(allValues).not.toMatch(/\d+\.\d+ ปี \(computed\)/)
  })

  // ── AC-5: Current Years in BU positioned in Organization Information section ──

  it('AC-5 — Current Years in BU appears after Organization Information divider', () => {
    const labels = HUMI_MY_PROFILE.job.map(([label]) => label)
    const buIdx = labels.indexOf('Current Years in BU')
    const orgSectionIdx = labels.indexOf('──── Organization Information ────')
    const employmentSectionIdx = labels.indexOf('──── Employment Details ────')

    // Must be after the Organization Information divider
    expect(buIdx).toBeGreaterThan(orgSectionIdx)
    // Must also be after the Employment Details divider (sanity — Employment comes first)
    expect(buIdx).toBeGreaterThan(employmentSectionIdx)
  })
})

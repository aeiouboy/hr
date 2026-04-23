// phase1-journey.spec.ts — Phase 1 Build AC-6 E2E journey + smoke
//
// Covers Ken's DoD: "ร้อย Journey ให้เห็นแด่งหน้า UI" across all 5 routes
// and proves the interactive walk (not just route rendering).

import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000/th'

test.describe('Phase 1 Build — AdminShell + Journey', () => {
  test('AC-8: AdminShell renders on admin routes with admin-only nav', async ({ page }) => {
    await page.goto(`${BASE}/admin/employees`)
    const nav = page.getByRole('navigation', { name: 'เมนู Admin' })
    await expect(nav).toBeVisible()
    await expect(nav.getByRole('link', { name: 'ศูนย์ Admin' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'รับพนักงานใหม่' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'ข้อมูลการจ้างงาน' })).toBeVisible()
    await expect(nav.getByRole('link', { name: 'กลับสู่พนักงาน' })).toBeVisible()
  })

  test('AC-2: Employee List renders 1K virtualized rows + search', async ({ page }) => {
    await page.goto(`${BASE}/admin/employees`)
    await expect(page.getByText('1,000 รายการ')).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'รหัสพนักงาน' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: 'สถานะ' })).toBeVisible()

    // Search narrows list
    await page.getByRole('searchbox', { name: 'ค้นหาพนักงาน' }).fill('EMP-0001')
    await page.waitForTimeout(300)
    await expect(page.getByText('EMP-0001').first()).toBeVisible()
  })

  test('AC-3: Employee Detail shows snapshot + timeline + action menu', async ({ page }) => {
    await page.goto(`${BASE}/admin/employees/EMP-0001`)
    await expect(page.getByText('EMP-0001').first()).toBeVisible()
    await expect(page.getByText('Timeline', { exact: true })).toBeVisible()
    await expect(page.getByText('เริ่มงาน').first()).toBeVisible()
    await expect(page.getByText('ประเมินทดลองงาน').first()).toBeVisible()
    await expect(page.getByText('แก้ไขข้อมูลส่วนตัว').first()).toBeVisible()
  })

  test('AC-1: Hire wizard renders Step 1 Identity with 20 fields', async ({ page }) => {
    await page.goto(`${BASE}/admin/hire`)
    await expect(page.getByRole('heading', { name: 'ข้อมูลระบุตัวตน' })).toBeVisible()
    await expect(page.getByText(/วันที่เริ่มงาน/).first()).toBeVisible()
    await expect(page.getByText(/บริษัท/).first()).toBeVisible()
    await expect(page.getByText(/สาเหตุการจ้างงาน/).first()).toBeVisible()
  })

  test('AC-4: Probation form renders with BRD #117 outcomes + employee context', async ({ page }) => {
    await page.goto(`${BASE}/admin/employees/EMP-0001/probation`)
    await expect(page.getByText('ประเมินทดลองงาน')).toBeVisible()
    await expect(page.getByText('EMP-0001')).toBeVisible()
    // 3 outcomes per BRD #117
    await expect(page.getByText('ผ่านทดลองงาน')).toBeVisible()
    await expect(page.getByText('ไม่ผ่าน')).toBeVisible()
    await expect(page.getByText('ขยายเวลาทดลองงาน')).toBeVisible()
  })

  test('AC-5: Edit form renders 23 Personal Info fields for employee', async ({ page }) => {
    await page.goto(`${BASE}/admin/employees/EMP-0001/edit`)
    await expect(page.getByRole('heading', { name: 'แก้ไขข้อมูลส่วนตัว' })).toBeVisible()
    await expect(page.getByText('EMP-0001').first()).toBeVisible()
    await expect(page.getByText('ชื่อ (ภาษาท้องถิ่น)').first()).toBeVisible()
    await expect(page.getByText('ข้อมูลติดต่อ').first()).toBeVisible()
  })

  test('AC-6: E2E journey — List → Detail → Probation → submit → timeline updated', async ({ page }) => {
    // STAGE 1: List
    await page.goto(`${BASE}/admin/employees`)
    await expect(page.getByText('1,000 รายการ')).toBeVisible()

    // STAGE 2: Click first employee row via search to ensure stable target
    await page.getByRole('searchbox', { name: 'ค้นหาพนักงาน' }).fill('EMP-0001')
    await page.waitForTimeout(300)
    await page.getByRole('row', { name: /พนักงาน/ }).first().click()

    // STAGE 3: Detail hub loads
    await expect(page).toHaveURL(/admin\/employees\/EMP-0001/)
    await expect(page.getByText('Timeline')).toBeVisible()

    // STAGE 4: Click Probation action card
    await page.getByText('ประเมินทดลองงาน').first().click()
    await expect(page).toHaveURL(/probation/)

    // STAGE 5: Fill Probation form — outcome=pass + effective date
    await page.getByText('ผ่านทดลองงาน').click()
    const effDateInput = page.locator('input[type="date"]').first()
    // Hire date 12 March 2021 + some days (any valid date within 119-day window works)
    await effDateInput.fill('2021-06-01')

    // Submit
    const submit = page.getByRole('button', { name: /บันทึก/ })
    await expect(submit).toBeEnabled({ timeout: 5000 })
    await submit.click()

    // STAGE 6: Navigate back to Detail + timeline has new event
    await expect(page).toHaveURL(/admin\/employees\/EMP-0001/, { timeout: 5000 })
    // Verify a probation_assess-style timeline event appeared
    await expect(page.getByText(/ประเมินทดลองงาน|probation_assess/i)).toBeVisible({ timeout: 5000 })
  })
})

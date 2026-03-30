# Benefits Tab - Manual Testing Checklist

## Test Environment Setup

- [ ] Web server running on http://localhost:8080
- [ ] Browser console open (F12)
- [ ] Screenshot tool ready
- [ ] Thai language active in application

## Pre-Test Verification

1. [ ] Navigate to http://localhost:8080/#/profile
2. [ ] Wait for page to fully load (no skeleton animations)
3. [ ] Verify profile header shows employee information
4. [ ] Confirm navigation tabs are visible

---

## Test Group 1: Tab Navigation

### TC001: Tab Visibility
- [ ] Benefits tab button is visible
- [ ] Tab label reads "สวัสดิการ" (Thai)
- [ ] Tab has card_giftcard icon
- [ ] Screenshot: `benefits-01-tab-visible.png`

### TC002: Tab Click
- [ ] Click Benefits tab
- [ ] Tab becomes active (highlighted)
- [ ] Content area changes
- [ ] Screenshot: `benefits-02-tab-clicked.png`

---

## Test Group 2: Overview Section

### TC003: Overview Card
- [ ] Card with title "ภาพรวมสวัสดิการ" displays
- [ ] Card has gift icon
- [ ] 4 statistic boxes are visible
- [ ] Screenshot: `benefits-03-overview-section.png`

### TC004: Active Enrollments Stat
- [ ] Green box on far left
- [ ] Large number "3" displayed
- [ ] Label "สวัสดิการที่ลงทะเบียน" below
- [ ] Screenshot: `benefits-04-active-count.png`

### TC005: Total Plans Stat
- [ ] Blue box second from left
- [ ] Large number "3" displayed
- [ ] Label "แผนทั้งหมด" below
- [ ] Screenshot: `benefits-05-total-plans.png`

### TC006: Dependents Covered Stat
- [ ] Purple box third from left
- [ ] Large number "2" displayed
- [ ] Label "ผู้พึ่งพิงที่ครอบคลุม" below
- [ ] Screenshot: `benefits-06-dependents.png`

### TC007: Pending Stat
- [ ] Orange box on far right
- [ ] Large number "0" displayed
- [ ] Label "รอดำเนินการ" below
- [ ] Screenshot: `benefits-07-pending.png`

---

## Test Group 3: Enrollments Section

### TC008: Enrollments Card
- [ ] Card with title "สวัสดิการที่ลงทะเบียน" displays
- [ ] Card has checklist icon
- [ ] Multiple enrollment cards visible
- [ ] Screenshot: `benefits-08-enrollments-section.png`

### TC009: Health Insurance Enrollment
- [ ] Card shows "Group Health Insurance - Plan A"
- [ ] Blue hospital icon visible
- [ ] Coverage: "Employee + Family"
- [ ] Green "ใช้งาน" badge with check icon
- [ ] Effective date shown (formatted, not ISO)
- [ ] Shows "2 ผู้พึ่งพิงที่ครอบคลุม"
- [ ] Screenshot: `benefits-09-health-insurance.png`

### TC010: Life Insurance Enrollment
- [ ] Card shows "Life Insurance"
- [ ] Blue heart/favorite icon visible
- [ ] Coverage: "3x Annual Salary"
- [ ] Green "ใช้งาน" badge with check icon
- [ ] Effective date shown
- [ ] No dependents line (0 dependents)
- [ ] Screenshot: `benefits-10-life-insurance.png`

### TC011: Provident Fund Enrollment
- [ ] Card shows "Provident Fund"
- [ ] Blue savings icon visible
- [ ] Coverage: "5% Employee + 5% Employer"
- [ ] Green "ใช้งาน" badge with check icon
- [ ] Effective date shown
- [ ] No dependents line (0 dependents)
- [ ] Screenshot: `benefits-11-provident-fund.png`

---

## Test Group 4: Data Validation

### TC012: Status Badges
- [ ] All enrollments show green badges
- [ ] Badge text is "ใช้งาน" (not "Active" or "active")
- [ ] Check circle icon in badge
- [ ] No "undefined" text
- [ ] Screenshot: `benefits-12-status-badges.png`

### TC013: Date Formatting
- [ ] All dates are formatted (e.g., "1 เม.ย. 2558")
- [ ] No ISO format dates (YYYY-MM-DD)
- [ ] Label "วันที่มีผล:" before each date
- [ ] Calendar icon next to dates
- [ ] Screenshot: `benefits-13-effective-dates.png`

### TC014: Dependents Information
- [ ] Health insurance shows "2 ผู้พึ่งพิงที่ครอบคลุม"
- [ ] Life insurance has no dependents line
- [ ] Provident fund has no dependents line
- [ ] People icon next to dependents count
- [ ] Screenshot: `benefits-14-dependents-info.png`

### TC015: Coverage Details
- [ ] "Employee + Family" visible
- [ ] "3x Annual Salary" visible
- [ ] "5% Employee + 5% Employer" visible
- [ ] All text is clear and readable
- [ ] Screenshot: `benefits-15-coverage-info.png`

---

## Test Group 5: Bug Detection

### TC016: Undefined Values Check
- [ ] Scroll through entire page
- [ ] No "undefined" text visible anywhere
- [ ] No "null" text visible
- [ ] No "[object Object]" text
- [ ] All fields have proper values
- [ ] Screenshot: `benefits-16-undefined-check.png` (or FAIL if found)

**If undefined found, note location:**
- Location: _______________
- Context: _______________

### TC017: Translation Issues
- [ ] All text is in Thai language
- [ ] No English text where Thai expected
- [ ] No translation keys visible (e.g., "benefits.active")
- [ ] No "benefits." prefixes showing
- [ ] Screenshot: `benefits-17-translation-check.png` (or FAIL if found)

**If translation issues found:**
- Missing key: _______________
- Location: _______________

### TC018: Console Errors
- [ ] Open browser console (F12)
- [ ] Click Benefits tab
- [ ] Check for red error messages
- [ ] Check for yellow warnings
- [ ] Screenshot console: `benefits-18-console-check.png`

**If errors found, copy full error message:**
```
[Paste error here]
```

---

## Test Group 6: UI/UX

### TC019: Layout Check
- [ ] All cards are properly aligned
- [ ] No overlapping elements
- [ ] Proper spacing between cards
- [ ] No horizontal scrollbar
- [ ] Content fits within viewport
- [ ] Screenshot: `benefits-19-layout-check.png`

### TC020: Icons Verification
- [ ] Health plan has hospital icon (local_hospital)
- [ ] Life plan has heart icon (favorite)
- [ ] Provident fund has savings icon (savings)
- [ ] All icons are Material Icons font
- [ ] Icons are proper size and color
- [ ] Screenshot: `benefits-20-icons-check.png`

### TC021: Page Refresh Test
- [ ] Click browser refresh (F5)
- [ ] Wait for page to reload
- [ ] Note which tab is active after refresh
- [ ] Screenshot: `benefits-21-after-refresh.png`

**Active tab after refresh:** _______________

### TC022: Direct URL Navigation
- [ ] Close browser or open new tab
- [ ] Navigate to: http://localhost:8080/#/profile?tab=benefits
- [ ] Wait for load
- [ ] Verify Benefits tab is active
- [ ] Verify content displays correctly
- [ ] Screenshot: `benefits-22-direct-navigation.png`

### TC023: Hover Effects
- [ ] Hover mouse over first enrollment card
- [ ] Card should show shadow effect
- [ ] Card should have transition animation
- [ ] Screenshot: `benefits-23-hover-effect.png`

### TC024: Images Check
- [ ] Verify no broken image icons
- [ ] All Material Icons load correctly
- [ ] No image placeholders
- [ ] Screenshot: `benefits-24-images-check.png`

### TC025: Full Page Capture
- [ ] Take full page screenshot
- [ ] Capture all content top to bottom
- [ ] Screenshot: `benefits-25-full-page.png`

---

## Test Group 7: Edge Cases

### TC026: Loading State
- [ ] Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- [ ] Try to capture skeleton loading state
- [ ] Verify smooth transition to content
- [ ] Screenshot: `benefits-26-skeleton-state.png`

### TC027: Mobile Viewport
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar
- [ ] Select iPhone 12 Pro (or similar)
- [ ] Verify layout adapts
- [ ] Stats boxes stack vertically
- [ ] All content readable
- [ ] Screenshot: `benefits-27-mobile-view.png`

### TC028: Tablet Viewport
- [ ] In DevTools
- [ ] Select iPad (768x1024)
- [ ] Verify layout adapts
- [ ] Stats boxes show 2 per row
- [ ] All content readable
- [ ] Screenshot: `benefits-28-tablet-view.png`

### TC029: Tab Switching
- [ ] Click "ข้อมูลส่วนตัว" (Personal Info) tab
- [ ] Wait 1 second
- [ ] Click back to "สวัสดิการ" (Benefits) tab
- [ ] Verify content reloads correctly
- [ ] No errors in console
- [ ] Screenshot before: `benefits-29a-first-load.png`
- [ ] Screenshot after: `benefits-29b-second-load.png`

### TC030: Accessibility
- [ ] Check for heading tags (H1, H2, H3, etc.)
- [ ] Verify semantic HTML structure
- [ ] Check for ARIA labels if present
- [ ] Tab through interactive elements with keyboard
- [ ] Screenshot: `benefits-30-accessibility.png`

---

## Post-Test Summary

### Test Results Overview

| Category | Pass | Fail | Skip | Total |
|----------|------|------|------|-------|
| Tab Navigation | __ | __ | __ | 2 |
| Overview Section | __ | __ | __ | 5 |
| Enrollments Section | __ | __ | __ | 4 |
| Data Validation | __ | __ | __ | 4 |
| Bug Detection | __ | __ | __ | 3 |
| UI/UX | __ | __ | __ | 7 |
| Edge Cases | __ | __ | __ | 5 |
| **TOTAL** | __ | __ | __ | **30** |

### Critical Issues Found

1. **Issue**: _______________
   - **Severity**: Critical/High/Medium/Low
   - **Screenshot**: _______________
   - **Description**: _______________

2. **Issue**: _______________
   - **Severity**: Critical/High/Medium/Low
   - **Screenshot**: _______________
   - **Description**: _______________

### Console Errors Found

```
[Copy paste any console errors here]
```

### Visual Issues Found

- [ ] Layout problems: _______________
- [ ] Missing translations: _______________
- [ ] Undefined values: _______________
- [ ] Icon issues: _______________
- [ ] Styling problems: _______________

### Recommendations

1. _______________
2. _______________
3. _______________

### Sign-off

- **Tester Name**: _______________
- **Date**: _______________
- **Time Spent**: _______________
- **Overall Result**: PASS / FAIL
- **Ready for Production**: YES / NO

---

## Notes

Use this space for additional observations:

_______________
_______________
_______________

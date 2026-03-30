# Benefits Tab - Quick Test Guide

## Quick Start (5 Minutes)

### 1. Start Server
```bash
cd "/Users/tachongrak/Projects/RIS HR System/apps"
python3 -m http.server 8080
```

### 2. Run Automated Tests
```bash
cd "/Users/tachongrak/Projects/RIS HR System"
npx playwright test test-benefits-tab.js --reporter=list
```

### 3. Manual Verification
1. Open: http://localhost:8080/#/profile
2. Click "สวัสดิการ" tab
3. Check for these 3 critical items:

**PASS/FAIL Checklist:**
- [ ] ภาพรวมสวัสดิการ section shows 4 stat boxes
- [ ] 3 benefit enrollments display (Health, Life, Provident)
- [ ] No "undefined" text anywhere on page

---

## What to Look For

### Expected Display (Thai Language)

**Overview Section (4 boxes):**
1. Green box: "3" - สวัสดิการที่ลงทะเบียน
2. Blue box: "3" - แผนทั้งหมด
3. Purple box: "2" - ผู้พึ่งพิงที่ครอบคลุม
4. Orange box: "0" - รอดำเนินการ

**Enrollments Section (3 cards):**

1. **Group Health Insurance - Plan A**
   - Icon: local_hospital (hospital icon)
   - Coverage: Employee + Family
   - Status: ใช้งาน (green badge)
   - Dependents: 2 ผู้พึ่งพิงที่ครอบคลุม

2. **Life Insurance**
   - Icon: favorite (heart icon)
   - Coverage: 3x Annual Salary
   - Status: ใช้งาน (green badge)
   - Dependents: (none shown - 0 dependents)

3. **Provident Fund**
   - Icon: savings (piggy bank icon)
   - Coverage: 5% Employee + 5% Employer
   - Status: ใช้งาน (green badge)
   - Dependents: (none shown - 0 dependents)

---

## Common Issues to Check

### Critical Bugs
- [ ] "undefined" text visible → Missing data binding
- [ ] "benefits.active" visible → Missing translation
- [ ] Console errors → JavaScript issues
- [ ] YYYY-MM-DD dates showing → DateUtils not working

### Minor Issues
- [ ] Layout misalignment → CSS issues
- [ ] Icons not showing → Material Icons not loaded
- [ ] Hover effects missing → Transition CSS issue
- [ ] Mobile responsive issues → Tailwind classes issue

---

## Screenshot Locations

All test screenshots saved to:
```
/Users/tachongrak/Projects/RIS HR System/test-result/
```

**File naming:**
- `benefits-##-description.png` - Passed tests
- `benefits-##-FAIL-description.png` - Failed tests

---

## Quick Bug Report

If you find a bug:

1. **Take screenshot** (Cmd+Shift+4 on Mac)
2. **Copy console error** (F12 → Console tab)
3. **Note location** (which section/card)
4. **Report severity**: Critical/High/Medium/Low

**Example Bug Report:**
```
BUG: Undefined status text
Severity: HIGH
Location: Benefits tab → Life Insurance card → Status badge
Expected: "ใช้งาน"
Actual: "undefined"
Screenshot: benefits-bug-001.png
Console Error: i18n is not defined
```

---

## Files Created

1. **test-benefits-tab.js** - 30 automated test cases
2. **BENEFITS-TAB-TEST-REPORT.md** - Complete test documentation
3. **BENEFITS-TAB-MANUAL-TEST-CHECKLIST.md** - Step-by-step manual testing
4. **BENEFITS-TAB-QUICK-TEST-GUIDE.md** - This quick reference

---

## Test Status Summary

Run this after testing:

```bash
# Count screenshots
ls -1 "/Users/tachongrak/Projects/RIS HR System/test-result/benefits-*.png" | wc -l

# Check for failures
ls -1 "/Users/tachongrak/Projects/RIS HR System/test-result/benefits-*-FAIL-*.png" 2>/dev/null | wc -l
```

Expected: 30 screenshots, 0 failures

---

## Need Help?

**Code Location:**
- Benefits Page: `/apps/js/pages/benefits.js`
- Profile Page: `/apps/js/pages/profile.js`
- Mock Data: `/apps/js/data/mock-employee.js`
- Translations: `/apps/locales/th.json` (lines 250-264)

**Key Translation Keys:**
```json
{
  "benefits": {
    "title": "สวัสดิการ",
    "overview": "ภาพรวมสวัสดิการ",
    "activeEnrollments": "สวัสดิการที่ลงทะเบียน",
    "active": "ใช้งาน",
    "inactive": "ไม่ใช้งาน",
    "pending": "รอดำเนินการ",
    "effectiveDate": "วันที่มีผล",
    "dependentsCovered": "ผู้พึ่งพิงที่ครอบคลุม"
  }
}
```

**Component Dependencies:**
- CardComponent (for card rendering)
- SkeletonComponent (for loading state)
- DateUtils (for date formatting)
- i18n (for translations)
- Material Icons (for icons)

# Scorecard Tab Testing Suite

## Overview

This directory contains comprehensive testing materials for the Scorecard tab on the Profile page of the RIS HR System.

**Test Target**: http://localhost:8080/#/profile?tab=scorecard

---

## Testing Files

### 1. Automated Test Script
**File**: `/Users/tachongrak/Projects/RIS HR System/test-scorecard-tab.js`

Playwright-based automated testing script that performs:
- 15 comprehensive test cases
- Automatic screenshot capture
- Console error detection
- Undefined/null/NaN value checking
- Translation validation
- Responsive design testing

**Run**:
```bash
node /Users/tachongrak/Projects/RIS\ HR\ System/test-scorecard-tab.js
```

**Output**:
- `scorecard_test.json` (in this directory)
- Screenshots in `/.playwright-mcp/scorecard_*.png`

---

### 2. Manual Testing Guide
**File**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_TEST_MANUAL.md`

Detailed step-by-step manual testing guide with:
- 15 detailed test cases
- Visual verification checklists
- Bug report template
- Expected behavior documentation

**Best for**: Thorough human review and validation

---

### 3. Expected Data Reference
**File**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_EXPECTED_DATA.md`

Complete reference of all data that should appear on the Scorecard tab:
- All competencies with ratings
- Assessment history records
- Success metrics
- Development objectives
- 9-Box matrix positioning
- Color schemes and icons

**Use**: Validate that correct data is displaying

---

### 4. Test Summary
**File**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_TEST_SUMMARY.md`

Overview document covering:
- Testing approach
- Test coverage
- Success criteria
- Bug reporting process
- Next steps

**Use**: Understand the overall testing strategy

---

### 5. Quick Checklist
**File**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_QUICK_CHECKLIST.md`

Printable/fillable checklist for quick validation:
- Section-by-section checks
- Pass/fail tracking
- Issue logging
- Summary scoring

**Use**: Quick validation during development

---

## Quick Start

### Option 1: Automated Testing (Fast)

1. Ensure development server is running:
   ```bash
   # Check server
   curl -I http://localhost:8080
   ```

2. Run automated test:
   ```bash
   node /Users/tachongrak/Projects/RIS\ HR\ System/test-scorecard-tab.js
   ```

3. Review results:
   ```bash
   cat test-result/scorecard_test.json
   open .playwright-mcp/scorecard_*.png
   ```

### Option 2: Manual Testing (Thorough)

1. Open the manual testing guide:
   ```bash
   open /Users/tachongrak/Projects/RIS\ HR\ System/SCORECARD_TEST_MANUAL.md
   ```

2. Navigate to the Scorecard tab:
   http://localhost:8080/#/profile?tab=scorecard

3. Follow each test case in the guide

4. Document findings

---

## Test Coverage

### Sections Tested (11 total)
1. ✓ CG Competency (6 competencies)
2. ✓ Personal Assessment History (3 records)
3. ✓ Personal Assessment Summary
4. ✓ Key Successes (3 items)
5. ✓ Strengths & Development Areas (3+2 items)
6. ✓ Career Aspirations (2 goals)
7. ✓ Development Objectives (3 objectives)
8. ✓ Talent Reference (4 fields)
9. ✓ Performance-Potential Matrix (9-Box)
10. ✓ Overall Final Calibration
11. ✓ Full Page Validation

### Test Types
- ✓ Functional testing
- ✓ Data integrity testing
- ✓ UI/UX validation
- ✓ Translation completeness
- ✓ JavaScript error checking
- ✓ Responsive design
- ✓ Interactive elements
- ✓ Language switching

---

## Expected Results

### Data Summary
- **CG Competencies**: 6 (ratings: 4, 5, 4, 4, 5, 4)
- **Assessment Records**: 3
- **Overall Rating**: 4.3/5.0 (Exceeds Expectations)
- **Key Successes**: 3 (2 High impact, 1 Medium)
- **Strengths**: 3
- **Development Areas**: 2 (Medium & Low priority)
- **Development Objectives**: 3 (30%, 60%, 45% progress)
- **9-Box Position**: Stars (Performance: High, Potential: High)
- **Final Calibration**: 4.3/5.0 by Suthep Thuaksuban (CTO)

### Success Criteria
- ✓ No undefined values
- ✓ No JavaScript console errors
- ✓ All sections render correctly
- ✓ All Thai translations present
- ✓ All icons visible
- ✓ Responsive design works
- ✓ Success rate >= 95%

---

## Common Issues to Check

### Critical
- [ ] Undefined values displayed
- [ ] JavaScript errors in console
- [ ] Missing sections
- [ ] Data not loading

### High Priority
- [ ] Missing translations (showing keys like "scorecard.cgCompetency")
- [ ] Broken layout on mobile
- [ ] Icons not displaying
- [ ] Wrong data shown

### Medium Priority
- [ ] Console warnings
- [ ] Minor layout issues
- [ ] Color inconsistencies

### Low Priority
- [ ] Minor spacing issues
- [ ] Font size variations

---

## Bug Reporting

### Found a Bug?

1. **Document it**: Use the bug report template in `SCORECARD_TEST_MANUAL.md`

2. **Categorize severity**:
   - Critical: Page breaking, undefined values
   - High: Missing translations, broken features
   - Medium: Visual issues, warnings
   - Low: Minor cosmetic issues

3. **Include**:
   - Screenshot
   - Console log (if error)
   - Steps to reproduce
   - Expected vs actual behavior

4. **Save report**: Create `scorecard_bugs_YYYYMMDD.md` in this directory

---

## Test Results

### Automated Test Output
**File**: `scorecard_test.json`

Contains:
```json
{
  "timestamp": "...",
  "totalTests": 15,
  "passed": X,
  "failed": Y,
  "warnings": Z,
  "tests": [ ... ],
  "screenshots": [ ... ]
}
```

### Manual Test Output
**File**: `scorecard_manual_test_report.md` (create after testing)

Should include:
- Test date and tester name
- Results for each test case
- Screenshots
- Issues found
- Overall pass/fail

---

## Screenshots Location

All screenshots saved to:
```
/Users/tachongrak/Projects/RIS HR System/.playwright-mcp/
```

**Automated test screenshots**:
- `scorecard_01_profile_page.png`
- `scorecard_02_tab_loaded.png`
- `scorecard_03_competencies.png`
- ... (through 15)
- `scorecard_final_state.png`

**Manual test screenshots**: Name according to test case

---

## Test Maintenance

### When to Update Tests

1. **Mock data changes**: Update `SCORECARD_EXPECTED_DATA.md`
2. **UI changes**: Update test cases and screenshots
3. **New translations**: Update translation validation
4. **New sections**: Add new test cases

### Regular Review

- Review test coverage: Monthly
- Update expected data: When mock data changes
- Refresh screenshots: When UI updates
- Validate translations: When new languages added

---

## Browser Support

Tests should pass on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Contact

For questions about these tests or to report issues, refer to the documentation files or create a bug report in this directory.

---

## File Index

| File | Purpose | Location |
|------|---------|----------|
| `test-scorecard-tab.js` | Automated test script | Project root |
| `SCORECARD_TEST_MANUAL.md` | Manual testing guide | Project root |
| `SCORECARD_EXPECTED_DATA.md` | Expected data reference | Project root |
| `SCORECARD_TEST_SUMMARY.md` | Testing overview | Project root |
| `SCORECARD_QUICK_CHECKLIST.md` | Quick checklist | Project root |
| `scorecard_test.json` | Automated test results | `test-result/` |
| `scorecard_*.png` | Test screenshots | `.playwright-mcp/` |
| `SCORECARD_TEST_README.md` | This file | `test-result/` |

---

**Last Updated**: January 11, 2026
**Version**: 1.0
**Status**: Ready for Testing

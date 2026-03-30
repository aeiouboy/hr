# Scorecard Tab Testing - Summary & Instructions

## Overview

This document provides a complete testing guide for the Scorecard tab on the Profile page at http://localhost:8080/#/profile?tab=scorecard

## Testing Approach

Two testing methods are available:

### 1. Automated Testing (Requires Approval)
**File**: `/Users/tachongrak/Projects/RIS HR System/test-scorecard-tab.js`

**To Run**:
```bash
node /Users/tachongrak/Projects/RIS\ HR\ System/test-scorecard-tab.js
```

**Features**:
- 15 comprehensive automated test cases
- Automatic screenshot capture
- Console error detection
- Undefined value checking
- Translation completeness validation
- Responsive design testing
- JSON test results output

**Output**:
- Screenshots: `/Users/tachongrak/Projects/RIS HR System/.playwright-mcp/scorecard_*.png`
- Test results: `/Users/tachongrak/Projects/RIS HR System/test-result/scorecard_test.json`

### 2. Manual Testing (Recommended for Initial Review)
**Guide**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_TEST_MANUAL.md`

**Features**:
- 15 detailed test cases with step-by-step instructions
- Visual verification checklist
- Translation validation
- Interactive element testing
- Responsive design checks
- Bug report template

## Test Coverage

### Functional Tests
1. Page Navigation
2. CG Competency Section (6 competencies)
3. Personal Assessment History (3 records)
4. Personal Assessment Summary
5. Key Successes Section (3 items)
6. Strengths & Development Areas (3 strengths, 2 development areas)
7. Career Aspirations (short-term & long-term)
8. Development Objectives (3 objectives with progress bars)
9. Talent Reference (4 data points)
10. Performance-Potential Matrix (9-Box grid)
11. Overall Final Calibration
12. Full Page Validation (undefined/null/NaN checks)
13. Interactive Elements (collapsible cards)
14. Responsive Design (mobile, tablet, desktop)
15. Language Switching (Thai/English)

### Data Integrity Tests
- No undefined values
- No null values displayed
- No NaN values
- All translations present
- No untranslated keys visible
- Proper date formatting
- Correct Thai language display

### UI/UX Tests
- All icons visible (Material Icons)
- Color coding correct
- Layout not broken
- Progress bars functional
- Badges displayed correctly
- Grid layout works
- Responsive at all breakpoints

### JavaScript Tests
- No console errors
- No console warnings (logged but not failing)
- Proper page initialization
- Tab switching works
- Router updates correctly

## Expected Data Reference

**Document**: `/Users/tachongrak/Projects/RIS HR System/SCORECARD_EXPECTED_DATA.md`

Contains complete details of all data that should appear including:
- All 6 CG Competencies with ratings
- 3 Assessment History records
- Assessment Summary (4.3/5.0 rating)
- 3 Key Successes with impact levels
- 3 Strengths and 2 Development Areas
- Career aspirations (short & long term)
- 3 Development Objectives (30%, 60%, 45% progress)
- Talent Reference data
- 9-Box Matrix position (Stars/ดาว - top-right)
- Final Calibration (4.3/5.0 by Suthep Thuaksuban)

## Quick Start Testing

### Option A: Run Automated Test (Fast)
```bash
# Ensure server is running
# Then run:
node /Users/tachongrak/Projects/RIS\ HR\ System/test-scorecard-tab.js
```

### Option B: Manual Testing (Thorough)
1. Open http://localhost:8080/#/profile?tab=scorecard
2. Open browser DevTools (F12)
3. Follow the checklist in `SCORECARD_TEST_MANUAL.md`
4. Take screenshots as you go
5. Note any issues found

## Critical Test Points

### Must Pass
- [ ] No "undefined" anywhere on page
- [ ] No JavaScript console errors
- [ ] All 11 sections visible
- [ ] All Thai translations working
- [ ] All icons display correctly
- [ ] 9-Box matrix shows employee position
- [ ] Progress bars render correctly

### Should Pass
- [ ] No console warnings
- [ ] Mobile view works properly
- [ ] Language switching works
- [ ] All collapsible sections work
- [ ] Date formatting is correct
- [ ] Color coding is appropriate

### Nice to Have
- [ ] Smooth animations
- [ ] Hover effects work
- [ ] Accessibility features present
- [ ] Print layout works

## Known Data

### Test Employee
- **Name**: Chatchai Wongsawat (ฉัตรชัย วงศ์สวัสดิ์)
- **Position**: Product Manager
- **Department**: Product Development
- **Overall Rating**: 4.3/5.0
- **9-Box Position**: Stars (High Performance, High Potential)

### Section Count
- Total Sections: 11
- Total Competencies: 6
- Total Assessment History: 3
- Total Key Successes: 3
- Total Strengths: 3
- Total Development Areas: 2
- Total Development Objectives: 3
- Talent Reference Fields: 4
- 9-Box Grid Cells: 9

## Translation Validation

### Thai Translations Required
All section headers, labels, and competency names should appear in Thai when language is set to Thai.

### English Translations Required
Some content remains in English (descriptions, comments) as per design.

### No Translation Keys
These strings should NEVER appear on the page:
- `scorecard.cgCompetency`
- `scorecard.noCompetencies`
- `scorecard.personalAssessmentHistory`
- Any string pattern: `scorecard.*`

## Bug Severity Classification

### Critical (Must Fix Before Release)
- Undefined values displayed
- JavaScript errors breaking functionality
- Missing entire sections
- Data not loading
- Page crashes

### High (Should Fix Soon)
- Missing translations
- Broken layout on mobile
- Icons not displaying
- Progress bars not working
- Wrong data displayed

### Medium (Fix When Possible)
- Console warnings
- Minor layout issues
- Color inconsistencies
- Missing hover effects
- Animation glitches

### Low (Nice to Fix)
- Minor text alignment
- Spacing inconsistencies
- Font size variations
- Non-critical accessibility issues

## Test Environment Requirements

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Screen Resolutions
- Mobile: 375px width (iPhone SE)
- Tablet: 768px width (iPad)
- Desktop: 1920px width (Full HD)

### Development Server
- URL: http://localhost:8080
- Must be running before tests
- Should have mock data loaded

## Test Output Files

### Automated Test
```
test-result/scorecard_test.json          # Test results JSON
.playwright-mcp/scorecard_01_*.png       # Step-by-step screenshots
.playwright-mcp/scorecard_final_state.png # Final page state
```

### Manual Test
```
.playwright-mcp/01_scorecard_navigation.png
.playwright-mcp/02_competencies_section.png
.playwright-mcp/03_assessment_history.png
... (and so on for all 17 test cases)
test-result/scorecard_manual_test_report.md
```

## Running the Tests

### Step 1: Ensure Server is Running
```bash
# Check if server is running
curl -I http://localhost:8080

# If not running, start it (method depends on your setup)
# Example:
# python3 -m http.server 8080
# or
# npx http-server -p 8080
```

### Step 2: Choose Test Method

#### For Automated Testing:
```bash
cd /Users/tachongrak/Projects/RIS\ HR\ System
node test-scorecard-tab.js
```

#### For Manual Testing:
1. Open `SCORECARD_TEST_MANUAL.md`
2. Follow each test case
3. Take screenshots
4. Document findings

### Step 3: Review Results

#### Automated Test Results:
```bash
# View test results
cat test-result/scorecard_test.json

# View screenshots
open .playwright-mcp/scorecard_*.png
```

#### Manual Test Results:
- Review your screenshots
- Fill out the test report
- Document any bugs found

## Success Criteria

### Test Passes If:
- ✓ All 15 test cases pass
- ✓ No undefined values
- ✓ No JavaScript errors
- ✓ All sections render correctly
- ✓ All translations present
- ✓ All icons visible
- ✓ Responsive design works
- ✓ Success rate >= 95%

### Test Fails If:
- ✗ Any critical issues found
- ✗ More than 2 high priority issues
- ✗ Undefined values present
- ✗ JavaScript errors occur
- ✗ Missing sections
- ✗ Success rate < 80%

## Reporting Issues

### Bug Report Format
Use the template in `SCORECARD_TEST_MANUAL.md` section "Bug Report Template"

### Where to Report
- Create file: `test-result/scorecard_bugs_[date].md`
- Include screenshots
- Include console logs
- Include steps to reproduce

## Next Steps After Testing

### If All Tests Pass:
1. Document success in test report
2. Archive screenshots
3. Mark scorecard tab as validated
4. Move to next feature

### If Tests Fail:
1. Document all failures in bug report
2. Categorize by severity
3. Create fix tickets for critical/high issues
4. Retest after fixes

## Contact & Support

For questions about these tests:
- Review `SCORECARD_TEST_MANUAL.md` for detailed instructions
- Review `SCORECARD_EXPECTED_DATA.md` for data reference
- Check `test-scorecard-tab.js` for test implementation

## Appendix

### Files Created for Testing
1. `test-scorecard-tab.js` - Automated test script
2. `SCORECARD_TEST_MANUAL.md` - Manual testing guide
3. `SCORECARD_EXPECTED_DATA.md` - Expected data reference
4. `SCORECARD_TEST_SUMMARY.md` - This file

### Test Execution Time
- Automated: ~2-3 minutes
- Manual: ~15-20 minutes
- Full validation: ~25-30 minutes

### Test Maintenance
- Update mock data reference if data changes
- Update test cases if UI changes
- Update translation validation if new languages added
- Review test coverage quarterly

---

**Last Updated**: January 11, 2026
**Test Version**: 1.0
**Target URL**: http://localhost:8080/#/profile?tab=scorecard

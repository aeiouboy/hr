# Scorecard Tab Manual Testing Guide

## Test Environment
- **URL**: http://localhost:8080/#/profile?tab=scorecard
- **Browser**: Chrome/Firefox (latest version)
- **Language**: Thai (default)

## Pre-Test Setup
1. Ensure the development server is running on http://localhost:8080
2. Open browser DevTools (F12) and go to Console tab
3. Keep Console tab visible during testing to catch any JavaScript errors

---

## Test Cases

### Test 1: Page Navigation
**Steps:**
1. Navigate to http://localhost:8080/#/profile
2. Click on the "สกอร์การ์ด" (Scorecard) tab

**Expected Results:**
- [ ] Tab switches successfully
- [ ] No console errors
- [ ] URL updates to `#/profile?tab=scorecard`
- [ ] Page scrolls to top

**Screenshot**: `01_scorecard_navigation.png`

---

### Test 2: CG Competency Section
**Check for:**
- [ ] Section header shows "CG Competency"
- [ ] All 6 competencies are displayed with Thai names:
  - ขับเคลื่อนการเติบโตอย่างมีกำไร
  - มุ่งมั่นสร้างความพึงพอใจให้ลูกค้า
  - สร้างความเป็นเลิศให้องค์กร
  - ส่งเสริมความร่วมมืออย่างยั่งยืน
  - พัฒนาบุคลากร
  - นำนวัตกรรม
- [ ] Each competency shows a rating badge (e.g., "4/5" or "5/5")
- [ ] Star icons are visible
- [ ] English descriptions are shown below each competency
- [ ] No "undefined" values
- [ ] Rating badges have appropriate colors (green for 5, blue for 4, etc.)

**Screenshot**: `02_competencies_section.png`

---

### Test 3: Personal Assessment History Section
**Check for:**
- [ ] Section header shows "ประวัติการประเมิน" (Personal Assessment History)
- [ ] Assessment records are displayed with:
  - Thai program names (e.g., "การประเมินกลางปี 2023")
  - Assessor names
  - Formatted dates (e.g., "30 มิถุนายน 2023")
  - "เสร็จสิ้น" (Completed) status badge
- [ ] Green status badges are visible
- [ ] History icon is present
- [ ] No "undefined" or "null" values

**Screenshot**: `03_assessment_history.png`

---

### Test 4: Personal Assessment Summary Section
**Check for:**
- [ ] Section header shows "สรุปการประเมิน" (Personal Assessment Summary)
- [ ] Overall rating displayed prominently (e.g., "4.3/5.0")
- [ ] Rating label shows in Thai: "เกินความคาดหวัง" (Exceeds Expectations)
- [ ] Rating period shows year (e.g., "2023")
- [ ] Summary text is displayed
- [ ] Gradient background (blue to indigo) is visible
- [ ] No "undefined" values

**Screenshot**: `04_assessment_summary.png`

---

### Test 5: Key Successes Section
**Check for:**
- [ ] Section header shows "ความสำเร็จสำคัญ" (Key Successes)
- [ ] Multiple success items are displayed with:
  - Thai titles (e.g., "เปิดตัวแพลตฟอร์มแอปมือถือใหม่")
  - English descriptions
  - Formatted dates
  - Impact badges showing "สูง" (High), "ปานกลาง" (Medium), or "ต่ำ" (Low)
- [ ] Trophy icons (emoji_events) are visible
- [ ] Impact badges have appropriate colors
- [ ] No "undefined" values

**Screenshot**: `05_key_successes.png`

---

### Test 6: Strengths & Development Areas Section
**Check for:**
- [ ] Section header shows "จุดแข็งและการพัฒนา" (Top Strengths & Development)
- [ ] Two-column layout (Strengths | Development Areas)
- [ ] Left column (Strengths):
  - Green background items
  - Check circle icons
  - Thai area names
  - Descriptions
- [ ] Right column (Development Areas):
  - Orange background items
  - Trending up icons
  - Thai area names
  - Priority badges (if applicable)
- [ ] No "undefined" values

**Screenshot**: `06_strengths_development.png`

---

### Test 7: Career Aspirations Section
**Check for:**
- [ ] Section header shows "เป้าหมายอาชีพ" (Career Aspirations)
- [ ] Two-column layout (Short-term | Long-term)
- [ ] Short-term goal section:
  - Blue background
  - "เป้าหมายระยะสั้น" header
  - Thai goal name
  - Description
  - Timeframe
- [ ] Long-term goal section:
  - Purple background
  - "เป้าหมายระยะยาว" header
  - Thai goal name
  - Description
  - Timeframe
- [ ] Rocket/star icons are visible
- [ ] No "undefined" values

**Screenshot**: `07_career_aspirations.png`

---

### Test 8: Development Objectives Section
**Check for:**
- [ ] Section header shows "วัตถุประสงค์การพัฒนา" (Development Objectives)
- [ ] Each objective displays:
  - Thai objective name
  - Description
  - "กำลังดำเนินการ" (In Progress) status badge
  - Progress bar with percentage
  - Target date formatted in Thai (e.g., "พ.ค. 67")
- [ ] Progress bars are visually filled according to percentage
- [ ] Blue progress bars
- [ ] No "undefined" values

**Screenshot**: `08_development_objectives.png`

---

### Test 9: Talent Reference Section
**Check for:**
- [ ] Section header shows "อ้างอิง Talent" (Talent Reference)
- [ ] Four information boxes with colored backgrounds:
  - "กลุ่ม Talent" (Talent Pool) - Purple
  - "คะแนนศักยภาพ" (Potential Rating) - Blue
  - "ความพร้อมในการเลื่อนตำแหน่ง" (Readiness for Promotion) - Green
  - "ตำแหน่งในแผนสืบทอด" (Succession Position) - Indigo
- [ ] All values are displayed (not undefined)
- [ ] Notes section (if present)
- [ ] Thai translations are used

**Screenshot**: `09_talent_reference.png`

---

### Test 10: Performance-Potential Matrix (9-Box)
**Check for:**
- [ ] Section header shows "เมทริกซ์ผลงาน-ศักยภาพ" (Performance-Potential Matrix)
- [ ] Title: "เมทริกซ์ 9-Box ผลงาน-ศักยภาพ"
- [ ] Your position indicator with Thai box label
- [ ] 3x3 grid (9 boxes total) with different colors:
  - Red/Orange boxes (low performance/potential)
  - Yellow boxes (medium)
  - Green boxes (high)
- [ ] Employee position marked with:
  - Blue ring around the box
  - Person icon in corner
- [ ] Axis labels:
  - X-axis: "ผลงาน" (Performance)
  - Y-axis: "ศักยภาพ" (Potential)
- [ ] Thai box labels visible (e.g., "ดาว", "ผู้นำในอนาคต", etc.)
- [ ] Legend showing potential levels
- [ ] No "undefined" values

**Screenshot**: `10_9box_matrix.png`

---

### Test 11: Overall Final Calibration Section
**Check for:**
- [ ] Section header shows "Calibration สุดท้าย" (Overall Final Calibration)
- [ ] Overall rating displayed (e.g., "4.5/5.0")
- [ ] Rating label in Thai (e.g., "เกินความคาดหวัง")
- [ ] Calibration date formatted in Thai
- [ ] "ผู้ทำ Calibration" (Calibrated By) information
- [ ] Calibrator name and title
- [ ] Comments section (if present) with blue border
- [ ] Gradient background (indigo to purple)
- [ ] No "undefined" values

**Screenshot**: `11_final_calibration.png`

---

### Test 12: Full Page Validation
**Check for:**
1. **Undefined Values Check:**
   - [ ] Use browser Find (Ctrl/Cmd+F) to search for "undefined"
   - [ ] Verify result is 0 matches

2. **Null Values Check:**
   - [ ] Search for " null " (with spaces)
   - [ ] Verify no visible null values

3. **Translation Keys Check:**
   - [ ] Search for "scorecard."
   - [ ] Verify no untranslated keys are visible (should only be in code)

4. **NaN Check:**
   - [ ] Search for "NaN"
   - [ ] Verify result is 0 matches

5. **Console Errors:**
   - [ ] Check browser console
   - [ ] Verify no JavaScript errors (red messages)
   - [ ] Note any warnings (yellow messages)

**Screenshot**: `12_full_page_overview.png` (full page screenshot)

---

### Test 13: Interactive Elements
**Check for:**
1. **Collapsible Cards:**
   - [ ] Click collapse button on any section
   - [ ] Verify section collapses
   - [ ] Click expand button
   - [ ] Verify section expands
   - [ ] No console errors during collapse/expand

2. **Scroll Behavior:**
   - [ ] Scroll through entire page
   - [ ] Verify smooth scrolling
   - [ ] All sections load properly
   - [ ] No layout shifts or broken elements

**Screenshot**: `13_collapsed_section.png`

---

### Test 14: Responsive Design
**Test Mobile View (375px width):**
1. Open DevTools (F12)
2. Click device toolbar icon or press Ctrl+Shift+M
3. Select iPhone SE or set width to 375px
4. Navigate to Scorecard tab

**Check for:**
- [ ] Sections stack vertically
- [ ] Text is readable (not too small)
- [ ] No horizontal scrolling
- [ ] 9-Box grid scales appropriately
- [ ] Two-column layouts become single column
- [ ] Cards remain functional
- [ ] No overlapping elements

**Screenshot**: `14_mobile_view.png`

**Test Tablet View (768px width):**
1. Set viewport to iPad or 768px width

**Check for:**
- [ ] Proper layout scaling
- [ ] Readable text
- [ ] Grid layout works properly
- [ ] No broken elements

**Screenshot**: `15_tablet_view.png`

---

### Test 15: Language Switching
**Steps:**
1. Look for language switcher (usually top-right)
2. Switch to English
3. Review Scorecard tab

**Check for:**
- [ ] Section headers change to English
- [ ] Competency names change to English
- [ ] Assessment program names change to English
- [ ] Success titles change to English
- [ ] All labels and buttons in English
- [ ] Rating labels in English (e.g., "Exceeds Expectations")
- [ ] 9-Box labels in English
- [ ] No mixed Thai/English (except where intentional)

4. Switch back to Thai

**Check for:**
- [ ] All Thai labels restored
- [ ] No English remnants
- [ ] Consistent language throughout

**Screenshots**:
- `16_english_view.png`
- `17_thai_restored.png`

---

## Bug Report Template

If you find any issues, use this format:

```
### Bug #X: [Brief Description]

**Section**: [Which section - e.g., "CG Competency"]
**Severity**: Critical / High / Medium / Low
**Type**: Undefined Value / Missing Translation / Broken UI / Layout Issue / JS Error

**Description**:
[Detailed description of the issue]

**Steps to Reproduce**:
1.
2.
3.

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshot**: [filename]
**Console Error** (if applicable):
```
[Copy console error here]
```

**Browser**: [Chrome/Firefox version]
**Viewport**: [Desktop/Mobile/Tablet - dimensions]
```

---

## Test Result Summary

After completing all tests, fill out:

```
Total Tests: 15
Passed: __
Failed: __
Warnings: __

Success Rate: __%

Critical Issues: __
High Priority Issues: __
Medium Priority Issues: __
Low Priority Issues: __

Overall Assessment: [PASS / FAIL / PASS WITH WARNINGS]

Tester: [Your Name]
Date: [Test Date]
Browser: [Browser & Version]
```

---

## Screenshots Location

Save all screenshots to: `/Users/tachongrak/Projects/RIS HR System/.playwright-mcp/`

## Test Report Location

Save final report to: `/Users/tachongrak/Projects/RIS HR System/test-result/scorecard_manual_test_report.md`

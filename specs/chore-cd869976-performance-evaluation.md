# Chore: Performance Evaluation Form and Rating System

## Metadata
adw_id: `cd869976`
prompt: `Implement Performance Evaluation form and rating system. Reference: User Stories US-6PMS-006, US-6PMS-015, US-6PMS-017`

## Chore Description
Implement a comprehensive Performance Evaluation system that allows employees and managers to conduct performance reviews with structured evaluation components. The system includes:

1. **Multi-component evaluation** with configurable weights:
   - KPI Results (default 50%)
   - G-BEST Competency Rating (default 30%)
   - Attendance Factor (default 10%)
   - Manager Assessment (default 10%)

2. **5-point rating scale** with Thai descriptors:
   - 5: Outstanding (ดีเด่น)
   - 4: Exceeds Expectations (ดีมาก)
   - 3: Meets Expectations (ดี)
   - 2: Below Expectations (ต้องปรับปรุง)
   - 1: Unsatisfactory (ไม่เป็นที่พอใจ)

3. **Evaluation form sections**:
   - Section 1: KPI Achievement Summary (auto-calculated)
   - Section 2: G-BEST Competency Ratings
   - Section 3: Attendance Score (auto from attendance data)
   - Section 4: Manager Overall Assessment
   - Section 5: Strengths and Areas for Improvement
   - Section 6: Final Rating and Comments

4. **Multi-stage evaluation workflow**:
   - Self-assessment by employee
   - Manager assessment (independent rating)
   - HR Calibration review
   - Final confirmation
   - Employee acknowledgment

## Relevant Files
Use these files to complete the chore:

### Existing Files to Modify

- **apps/js/pages/performance.js** - Add new "Evaluation" tab alongside existing Goals, Progress, and History tabs. Implement evaluation form rendering and interaction logic.

- **apps/js/data/mock-employee.js** - Add mock evaluation data structure including:
  - `evaluations` array with evaluation records
  - `evaluationWeights` configuration object
  - `attendanceData` for attendance score calculation

- **apps/js/api.js** - Add evaluation-related API methods:
  - `getEvaluations()` - Fetch evaluation list
  - `getEvaluation()` - Get single evaluation details
  - `submitSelfAssessment()` - Employee self-assessment
  - `submitManagerAssessment()` - Manager assessment
  - `calibrateEvaluation()` - HR calibration
  - `confirmEvaluation()` - Final confirmation
  - `acknowledgeEvaluation()` - Employee acknowledgment

- **apps/locales/en.json** - Add English translations for evaluation terminology

- **apps/locales/th.json** - Add Thai translations for evaluation terminology including rating scale descriptors

- **apps/js/data/mock-lookups.js** - Add evaluation-related lookup data for rating scales and evaluation statuses

### New Files to Create

None required - all functionality will be added to existing files.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Evaluation Data Structure
- Open `apps/js/data/mock-employee.js`
- Add `evaluationWeights` configuration object with default weights:
  ```javascript
  evaluationWeights: {
      kpi: 50,
      gbest: 30,
      attendance: 10,
      manager: 10
  }
  ```
- Add `attendanceData` mock object with attendance metrics:
  ```javascript
  attendanceData: {
      workDays: 220,
      attendedDays: 215,
      lateDays: 3,
      absentDays: 2,
      attendanceScore: 4.5
  }
  ```
- Add `evaluations` array with sample evaluation records matching the specified structure

### 2. Add Evaluation Lookup Data
- Open `apps/js/data/mock-lookups.js`
- Add `evaluationStatuses` lookup array with workflow states:
  - `self_assessment` - Employee self-assessment in progress
  - `manager_review` - Manager review pending
  - `calibration` - HR calibration in progress
  - `confirmed` - Final rating confirmed
  - `acknowledged` - Employee acknowledgment complete
- Add `ratingScale` lookup array with 5-point ratings and bilingual labels

### 3. Add English Translations
- Open `apps/locales/en.json`
- Add `evaluation` section with comprehensive translations:
  - Tab labels and section headers
  - Rating scale labels (Outstanding, Exceeds Expectations, etc.)
  - Form field labels
  - Workflow status labels
  - Action button labels
  - Validation messages

### 4. Add Thai Translations
- Open `apps/locales/th.json`
- Add corresponding Thai translations for all evaluation terms:
  - Rating descriptors: ดีเด่น, ดีมาก, ดี, ต้องปรับปรุง, ไม่เป็นที่พอใจ
  - Section headers and form labels in Thai
  - Workflow status labels in Thai

### 5. Add Evaluation API Methods
- Open `apps/js/api.js`
- Add to `internalAPI` object:
  - `getEvaluations(employeeId, filters)` - Get evaluations list with filtering
  - `getEvaluation(evaluationId)` - Get single evaluation details
  - `createEvaluation(evaluationData)` - Create new evaluation period
  - `submitSelfAssessment(evaluationId, assessmentData)` - Save self-assessment
  - `submitManagerAssessment(evaluationId, assessmentData)` - Save manager assessment
  - `calibrateEvaluation(evaluationId, calibrationData)` - HR calibration
  - `confirmEvaluation(evaluationId)` - Finalize evaluation
  - `acknowledgeEvaluation(evaluationId)` - Employee acknowledgment
  - `calculateFinalRating(evaluationId)` - Calculate weighted final rating
- Add read methods to `retryableMethods` array

### 6. Implement Evaluation Tab in Performance Page
- Open `apps/js/pages/performance.js`
- Add 'evaluation' tab to tabs array with icon 'assessment'
- Add module-level variables:
  - `evaluations` array
  - `selectedEvaluation` object
  - `evaluationWeights` configuration
- Add `renderEvaluationTab()` method:
  - Period selector dropdown
  - Evaluation status indicator
  - Start evaluation button (when no active evaluation)
  - Evaluation summary cards when evaluation exists

### 7. Implement Evaluation Form Sections
- Add `renderEvaluationForm()` method with 6 sections:
  - Section 1: `renderKpiSummary()` - Auto-calculated KPI achievement from goals
  - Section 2: `renderGbestRatings()` - 5 G-BEST competency rating inputs (1-5)
  - Section 3: `renderAttendanceScore()` - Auto-calculated attendance display
  - Section 4: `renderManagerAssessment()` - Overall manager rating (1-5) with comments
  - Section 5: `renderStrengthsAreas()` - Textarea for strengths and improvement areas
  - Section 6: `renderFinalRating()` - Calculated final rating with Thai descriptor

### 8. Implement Rating Calculation Engine
- Add `calculateEvaluationRating()` function:
  - Calculate weighted KPI score from goal achievements
  - Calculate G-BEST average from individual competency ratings
  - Get attendance score from attendance data
  - Get manager assessment score
  - Apply weights to each component
  - Map weighted total to 5-point scale
  - Return final rating with descriptor (Thai/English)

### 9. Implement Evaluation Workflow Logic
- Add workflow state management:
  - `startSelfAssessment()` - Initialize employee self-assessment
  - `submitSelfAssessment()` - Submit and transition to manager_review
  - `startManagerAssessment()` - Load employee's assessment for comparison
  - `submitManagerAssessment()` - Submit and transition to calibration
  - `submitCalibration()` - HR updates and confirms
  - `confirmEvaluation()` - Final confirmation
  - `acknowledgeEvaluation()` - Employee acknowledgment
- Add role-based view switching (employee view vs manager view)

### 10. Add Self vs Manager Assessment Views
- Add `renderSelfAssessmentView()` - Employee's own rating inputs
- Add `renderManagerAssessmentView()` - Manager rating with employee's visible
- Add comparison display showing self vs manager ratings
- Add visual indicators for rating discrepancies

### 11. Implement Evaluation History and Details
- Add `viewEvaluationDetails(evaluationId)` - Open modal with full evaluation
- Add `renderEvaluationHistory()` - List of past evaluations
- Add rating trend visualization
- Add export/print functionality placeholder

### 12. Load Evaluation Data on Page Init
- Update `loadData()` method to also load:
  - Evaluation data via `API.getEvaluations()`
  - Evaluation weights configuration
  - Attendance data for score calculation
- Update `init()` to initialize evaluation-related variables

### 13. Validate Implementation
- Verify all translations render correctly in Thai and English
- Test workflow state transitions
- Verify rating calculation accuracy with sample data
- Test role-based access (employee vs manager views)
- Verify evaluation form saves and submits correctly

## Validation Commands
Execute these commands to validate the chore is complete:

- `grep -n "evaluation" apps/js/pages/performance.js | head -20` - Verify evaluation tab exists
- `grep -n "evaluations:" apps/js/data/mock-employee.js` - Verify mock evaluation data exists
- `grep -n "getEvaluations" apps/js/api.js` - Verify evaluation API methods exist
- `grep -n "evaluation" apps/locales/en.json | head -10` - Verify English translations
- `grep -n "ดีเด่น" apps/locales/th.json` - Verify Thai rating descriptors
- Open browser to `http://localhost:5500/apps/index.html` and navigate to Performance page
- Click on "Evaluation" tab to verify it renders
- Test language toggle to verify Thai translations display correctly

## Notes

### Rating Scale Mapping
The weighted final score (0-100%) maps to the 5-point scale as follows:
- 90-100%: 5 (Outstanding / ดีเด่น)
- 75-89%: 4 (Exceeds Expectations / ดีมาก)
- 60-74%: 3 (Meets Expectations / ดี)
- 40-59%: 2 (Below Expectations / ต้องปรับปรุง)
- 0-39%: 1 (Unsatisfactory / ไม่เป็นที่พอใจ)

### G-BEST Competencies
The system uses the existing G-BEST competency framework:
- G: Guest Focus (มุ่งเน้นลูกค้า)
- B: Business Acumen (ความเฉียบแหลมทางธุรกิจ)
- E: Execution Excellence (ความเป็นเลิศในการดำเนินงาน)
- S: Self Development (การพัฒนาตนเอง)
- T: Teamwork (การทำงานเป็นทีม)

### Workflow States
```
self_assessment → manager_review → calibration → confirmed → acknowledged
```

Each state has specific UI affordances:
- `self_assessment`: Employee can edit, manager sees "pending"
- `manager_review`: Manager can rate, employee sees "submitted"
- `calibration`: HR can adjust ratings, both parties see "in review"
- `confirmed`: Read-only, awaiting employee acknowledgment
- `acknowledged`: Complete, fully read-only

### KPI Score Auto-Calculation
The KPI achievement score is derived from the existing goals in the performance module:
1. Filter goals for the evaluation period
2. Calculate weighted progress across all KPI category goals
3. Convert to 5-point scale for the evaluation

### Attendance Score Auto-Calculation
Attendance score formula:
```
score = ((attendedDays / workDays) * 5) - (lateDays * 0.1) - (absentDays * 0.2)
```
Clamped to range 1-5.

# Chore: Implement Scorecard Tab for RIS HR System

## Metadata
adw_id: `02d839f9`
prompt: `Implement Scorecard Tab for RIS HR System. Create apps/js/pages/scorecard.js with the following sections from PRD: 1) CG Competency (6 competencies: Driving for Profitable Growth, Striving to Meet Customer Satisfaction, Building Organization Excellence, Promoting Sustainable Collaborations, Developing People, Leading Innovation) 2) Personal Assessment History with assessment program display 3) Personal Assessment Summary 4) Key Successes section 5) Top Strengths & Development areas 6) Career Aspirations 7) Development Objectives 8) Talent Reference 9) Performance-Potential Matrix (9-Box Grid visualization) 10) Overall Final Calibration. Add mock data to mock-employee.js and translations to en.json/th.json. Register route in router.js and add tab to profile page.`

## Chore Description
This chore implements a comprehensive Scorecard tab for the RIS HR System's employee profile section. The Scorecard displays performance assessment data including CG competencies, personal assessments, career aspirations, development plans, and a 9-Box Grid visualization for performance-potential matrix. The implementation follows the existing codebase patterns with vanilla JavaScript, modular page structure, bilingual Thai/English support, and mock data for development testing.

The Scorecard tab provides employees with visibility into their performance reviews, competency ratings, development areas, and career progression tracking within the Central Group HR system.

## Relevant Files

### Existing Files to Modify

- **apps/js/pages/profile.js** - Add 'scorecard' tab to the tabs array and handle routing in renderTabContent() and initTabPage() methods
- **apps/js/router.js** - Register scorecard route if needed for direct navigation (though it will mainly be accessed via profile tabs)
- **apps/js/data/mock-employee.js** - Add scorecard data structure with all 10 sections including competencies, assessments, strengths, career goals, and 9-Box matrix data
- **apps/locales/en.json** - Add English translations for all scorecard labels, competency names, assessment terms, and UI strings
- **apps/locales/th.json** - Add Thai translations for all scorecard labels, competency names, assessment terms, and UI strings
- **apps/index.html** - Add script tag to load the new scorecard.js page module (after other page scripts)

### New Files to Create

- **apps/js/pages/scorecard.js** - Main scorecard page module implementing all 10 sections with rendering logic following the existing page patterns (ProfileDetailsPage, EmploymentPage, etc.)

## Step by Step Tasks

### 1. Create Mock Data Structure
- Open `apps/js/data/mock-employee.js`
- Add `scorecard` object to the `employee` object with the following structure:
  - `competencies` array with 6 CG competencies (name, rating 1-5, description)
  - `assessmentHistory` array with historical assessment programs and dates
  - `assessmentSummary` object with overall ratings and summary text
  - `keySuccesses` array with achievement descriptions and dates
  - `strengths` array with top strength areas
  - `developmentAreas` array with areas for improvement
  - `careerAspirations` object with short-term and long-term goals
  - `developmentObjectives` array with specific development goals and timelines
  - `talentReference` object with talent pool designation and potential rating
  - `performancePotentialMatrix` object with performance rating (1-3), potential rating (1-3), and box position (1-9)
  - `finalCalibration` object with overall rating, calibration date, and comments

### 2. Add English Translations
- Open `apps/locales/en.json`
- Add new `scorecard` section with translations for:
  - Section titles (CG Competency, Personal Assessment History, etc.)
  - Competency names (Driving for Profitable Growth, etc.)
  - Field labels (Rating, Description, Assessment Program, Key Successes, etc.)
  - 9-Box Grid labels (Performance axis, Potential axis, grid quadrant names)
  - Assessment terms (Outstanding, Exceeds Expectations, Meets Expectations, etc.)
  - Common UI strings (No data messages, date labels, etc.)

### 3. Add Thai Translations
- Open `apps/locales/th.json`
- Add corresponding Thai translations for all scorecard strings
- Ensure competency names are accurately translated to Thai
- Translate 9-Box Grid quadrant labels appropriately for Thai HR context
- Maintain consistency with existing translation patterns in the file

### 4. Create Scorecard Page Module
- Create `apps/js/pages/scorecard.js`
- Implement module pattern following `ProfileDetailsPage.render()` structure
- Create main `render(employee)` function that checks for scorecard data
- Implement `init()` function for any initialization logic
- Create rendering functions for each of the 10 sections:
  - `renderCompetenciesSection()` - Display 6 competencies with rating badges and descriptions
  - `renderAssessmentHistorySection()` - Show timeline of assessment programs
  - `renderAssessmentSummarySection()` - Display summary cards with overall ratings
  - `renderKeySuccessesSection()` - List achievement items with dates and descriptions
  - `renderStrengthsSection()` - Show top strengths as cards with icons
  - `renderDevelopmentAreasSection()` - Display development areas with priority indicators
  - `renderCareerAspirationsSection()` - Show short-term and long-term career goals
  - `renderDevelopmentObjectivesSection()` - List objectives with progress indicators
  - `renderTalentReferenceSection()` - Display talent pool and potential ratings
  - `renderPerformancePotentialMatrixSection()` - Create visual 9-Box Grid with employee position highlighted
  - `renderFinalCalibrationSection()` - Show overall calibration results
- Use CardComponent.render() for section containers following existing patterns
- Implement rating badges with color coding (green for high, yellow for medium, red for low)
- Create 9-Box Grid visualization using HTML/CSS grid layout with proper styling
- Handle empty states gracefully using CardComponent.emptyState()
- Export module for usage

### 5. Add Scorecard Tab to Profile Page
- Open `apps/js/pages/profile.js`
- Add scorecard tab object to the `tabs` array:
  ```javascript
  { id: 'scorecard', label: 'Scorecard', labelTh: 'สกอร์การ์ด', icon: 'assessment' }
  ```
- Add case for 'scorecard' in `renderTabContent()` switch statement:
  ```javascript
  case 'scorecard':
      return ScorecardPage.render(employee);
  ```
- Add case for 'scorecard' in `initTabPage()` switch statement:
  ```javascript
  case 'scorecard':
      ScorecardPage.init();
      break;
  ```

### 6. Include Scorecard Script in HTML
- Open `apps/index.html`
- Add script tag in the pages section after profile-details.js:
  ```html
  <script src="js/pages/scorecard.js"></script>
  ```
- Ensure proper loading order (after dependencies but before app.js)

### 7. Validation and Testing
- Open the application in browser at `http://localhost:8080`
- Navigate to Profile page
- Verify scorecard tab appears in the tab list with correct icon
- Click on scorecard tab and verify content loads
- Test each section renders correctly:
  - Competencies show all 6 items with ratings
  - Assessment history displays chronologically
  - Assessment summary shows overall rating
  - Key successes list properly formatted
  - Strengths and development areas display as cards
  - Career aspirations show both short and long term goals
  - Development objectives list with proper formatting
  - Talent reference displays correctly
  - 9-Box Grid renders visually with employee position marked
  - Final calibration section shows complete information
- Switch language to Thai and verify all translations display correctly
- Test responsive layout on different screen sizes
- Verify empty states show appropriate messages when no data exists
- Check browser console for any JavaScript errors

## Validation Commands

Execute these commands to validate the chore is complete:

```bash
# Start local development server (if not already running)
python -m http.server 8080 -d apps

# Open browser to test
open http://localhost:8080/#/profile?tab=scorecard

# Validate JavaScript syntax (if node is installed)
node -c apps/js/pages/scorecard.js

# Check JSON syntax for locale files
python -m json.tool apps/locales/en.json > /dev/null && echo "en.json is valid JSON"
python -m json.tool apps/locales/th.json > /dev/null && echo "th.json is valid JSON"

# Verify all required files exist
ls -la apps/js/pages/scorecard.js
grep -q "scorecard" apps/js/pages/profile.js && echo "Profile page updated"
grep -q "scorecard" apps/locales/en.json && echo "English translations added"
grep -q "scorecard" apps/locales/th.json && echo "Thai translations added"
grep -q "scorecard.js" apps/index.html && echo "Script tag added to HTML"
```

## Notes

### Design Considerations
- Follow the exact same pattern as `ProfileDetailsPage.js` for consistency
- Use existing components: `CardComponent`, `TabsComponent` for UI consistency
- Implement proper i18n support using `i18n.t()` for all text strings
- Use Material Icons for section icons matching the Central Group design system
- Ensure WCAG 2.1 AA accessibility compliance (proper heading hierarchy, aria labels, keyboard navigation)

### 9-Box Grid Implementation
- Create a 3x3 CSS grid layout for the Performance-Potential Matrix
- Label axes: Y-axis = Potential (High/Medium/Low), X-axis = Performance (Low/Medium/High)
- Color code boxes appropriately:
  - High Performance + High Potential (top right) = Green (Stars)
  - Medium Performance + Medium Potential (center) = Yellow (Core)
  - Low Performance + Low Potential (bottom left) = Red (Questionable)
- Highlight the employee's current box position with a distinct visual indicator (border, shadow, or badge)
- Make grid responsive and ensure proper rendering on mobile devices

### Data Privacy
- No sensitive financial or personal data in scorecard mock data
- Performance ratings and assessments are mock data for demonstration purposes
- Follow RBAC patterns - employees see their own scorecard, managers may have additional access

### Future Enhancements (Not in Scope)
- Interactive drill-down into individual competency details
- Historical trend charts for performance over time
- Comparison with team or company averages
- Export scorecard as PDF
- Add comments or feedback capability

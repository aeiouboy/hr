# Chore: Implement Goal/KPI Setting Module for Performance Management

## Metadata
adw_id: `3dc188db`
prompt: `Implement Goal/KPI Setting module for performance management. Reference: User Stories US-6PMS-001 through US-6PMS-005`

## Chore Description
Implement a comprehensive Goal/KPI Setting module for employee performance management within the RIS HR System. This module enables employees to create, manage, and track their performance goals across three categories: KPI (Key Performance Indicators), G-BEST (Central Group behavioral competencies), and Development Goals. The module includes a goal creation form with bilingual support (EN/TH), goal list view with progress visualization, progress update functionality, and a multi-step approval workflow for manager review and sign-off.

Key features:
- Goal categories: KPI, G-BEST (Guest Focus, Business Acumen, Execution Excellence, Self Development, Teamwork), Development Goals
- Goal form with bilingual names, metric types, targets, weights (must sum to 100%), and review periods
- Goal list view with progress bars and status tracking (Draft, Submitted, Approved, In Progress, Completed)
- Progress entry with actual values, achievement calculation, comments, and optional evidence attachments
- Approval workflow: Employee creates (Draft) -> Submit -> Manager review -> Approve/Send back -> Both sign off

## Relevant Files
Use these files to complete the chore:

### Existing Files to Modify
- `apps/js/app.js` - Add route registration for `#/performance` and `#/performance/goals` routes
- `apps/index.html` - Add script tag for the new `performance.js` page module
- `apps/js/api.js` - Add API methods for goal CRUD operations, progress updates, and approval workflow
- `apps/js/data/mock-employee.js` - Add mock goal data, G-BEST competencies, and goal history
- `apps/js/data/mock-lookups.js` - Add goal categories, metric types, review periods, and status lookups
- `apps/locales/en.json` - Add English translations for all performance/goal-related UI text
- `apps/locales/th.json` - Add Thai translations for all performance/goal-related UI text

### New Files to Create
- `apps/js/pages/performance.js` - Main performance management page module with goal list, form, and progress views

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Data for Goals and G-BEST Competencies
- Add `goals` array to `MockEmployeeData` in `apps/js/data/mock-employee.js` with sample goals across all categories
- Add `gbestCompetencies` array with the 5 Central Group competencies (G, B, E, S, T) with EN/TH names
- Add `goalHistory` array for tracking goal progress updates
- Add `goalApprovals` array for workflow tracking
- Sample goal structure:
  ```javascript
  {
    id: "GOAL001",
    employeeId: "EMP001",
    name: { en: "Increase Sales Revenue", th: "เพิ่มยอดขาย" },
    description: { en: "Achieve 15% YoY sales growth", th: "เพิ่มยอดขาย 15% เมื่อเทียบกับปีก่อน" },
    category: "kpi", // kpi, gbest, development
    gbestCode: null, // G, B, E, S, T for gbest category
    metric: "percentage", // number, percentage, yesno, rating
    target: 15,
    actual: 12,
    weight: 30,
    period: "2024", // or Q1-2024, Q2-2024, etc.
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "in_progress", // draft, submitted, approved, in_progress, completed
    progress: 80,
    createdAt: "2024-01-15",
    updatedAt: "2024-06-15"
  }
  ```

### 2. Add Goal-Related Lookup Data
- Add to `MockLookupData` in `apps/js/data/mock-lookups.js`:
  - `goalCategories`: KPI, G-BEST, Development with EN/TH labels
  - `metricTypes`: number, percentage, yesno (yes/no), rating (1-5 scale) with EN/TH labels
  - `reviewPeriods`: Q1, Q2, Q3, Q4, Annual, H1, H2 with EN/TH labels
  - `goalStatuses`: draft, submitted, approved, in_progress, completed with EN/TH labels and status colors

### 3. Add Bilingual Translations
- Add `performance` section to `apps/locales/en.json` with keys:
  - Page titles: `title`, `goals`, `myGoals`, `teamGoals`
  - Tab labels: `goalsTab`, `progressTab`, `historyTab`
  - Goal form labels: `goalName`, `goalNameEn`, `goalNameTh`, `description`, `category`, `gbestCompetency`, `metricType`, `targetValue`, `actualValue`, `weight`, `weightPercentage`, `reviewPeriod`, `startDate`, `endDate`
  - Goal categories: `categoryKpi`, `categoryGbest`, `categoryDevelopment`
  - G-BEST competencies: `guestFocus`, `businessAcumen`, `executionExcellence`, `selfDevelopment`, `teamwork`
  - Metric types: `metricNumber`, `metricPercentage`, `metricYesNo`, `metricRating`
  - Status labels: `statusDraft`, `statusSubmitted`, `statusApproved`, `statusInProgress`, `statusCompleted`
  - Actions: `createGoal`, `editGoal`, `deleteGoal`, `updateProgress`, `submitForReview`, `approve`, `sendBack`, `signOff`
  - Validation: `weightMustEqual100`, `weightCurrentTotal`, `targetRequired`, `goalNameRequired`
  - Progress: `achievementRate`, `progressUpdate`, `addComment`, `attachEvidence`
  - Workflow: `pendingApproval`, `approvedBy`, `sentBackBy`, `reviewComments`
- Add corresponding Thai translations to `apps/locales/th.json`

### 4. Add API Methods for Goal Operations
- Add to `internalAPI` object in `apps/js/api.js`:
  - `getGoals(employeeId, year?)` - Fetch goals with optional year filter
  - `getGoal(goalId)` - Get single goal details
  - `createGoal(goalData)` - Create new goal (returns draft)
  - `updateGoal(goalId, goalData)` - Update existing goal
  - `deleteGoal(goalId)` - Delete draft goal
  - `submitGoalForReview(goalId)` - Submit goal for manager approval
  - `approveGoal(goalId, comments?)` - Manager approves goal
  - `sendBackGoal(goalId, comments)` - Manager sends back with feedback
  - `updateGoalProgress(goalId, progressData)` - Update actual value and add comment
  - `getGoalHistory(goalId)` - Get progress update history
  - `getGbestCompetencies()` - Get list of G-BEST competencies
  - `signOffGoal(goalId, signedBy)` - Both parties sign off on final goals
- Add these methods to `retryableMethods` array (for read operations only)
- Ensure mock data operations update `MockEmployeeData.goals`

### 5. Create Performance Page Module
- Create `apps/js/pages/performance.js` following the pattern from `LeaveRequestPage`:
  - Use revealing module pattern with IIFE
  - Implement tab-based navigation: Goals List, Goal Form, Progress Entry
  - Include skeleton loading states for data fetching
  - Track internal state: `activeTab`, `goals`, `selectedGoal`, `isEditing`

- Implement `render()` method:
  - Page header with title and "Create Goal" button
  - Tab navigation: My Goals, Team Goals (for managers), Progress Updates
  - Filter controls: year dropdown, category filter, status filter
  - Goal list table/cards view

- Implement `renderGoalsList()` method:
  - Table with columns: Goal Name, Category, Weight, Target, Progress, Status, Actions
  - Progress bar visualization (color-coded by achievement %)
  - Status badges with appropriate colors
  - Edit/Delete actions for draft goals
  - View details action for all goals
  - Weight sum indicator (should total 100%)

- Implement `renderGoalForm()` method:
  - Form fields using `FormFieldComponent`:
    - Goal name EN (text, required)
    - Goal name TH (text, required)
    - Description EN (textarea)
    - Description TH (textarea)
    - Category (select: KPI, G-BEST, Development)
    - G-BEST competency (select, shown only when category is G-BEST)
    - Metric type (select: number, percentage, yes/no, rating)
    - Target value (number, adapts to metric type)
    - Weight % (number, 0-100)
    - Review period (select: Q1, Q2, Q3, Q4, H1, H2, Annual)
    - Start date (date)
    - End date (date)
  - Weight validation: show running total and warning if sum != 100%
  - Save as Draft / Submit for Review buttons

- Implement `renderProgressEntry()` method:
  - Goal summary card with target and current progress
  - Actual value input (adapts to metric type)
  - Achievement percentage calculation (auto-calculated)
  - Comment textarea for progress notes
  - File upload for evidence (optional)
  - Progress history timeline

- Implement approval workflow UI:
  - Submit button changes goal status from draft to submitted
  - For managers: Approve/Send Back actions on submitted goals
  - Sign-off confirmation modal for both parties
  - Workflow status timeline showing approval steps

- Implement helper methods:
  - `calculateAchievement(goal)` - Calculate progress percentage
  - `validateWeightSum(goals)` - Ensure weights total 100%
  - `getProgressColor(percentage)` - Return color class based on progress
  - `getCategoryIcon(category)` - Return appropriate icon for category
  - `switchTab(tabId)` - Handle tab navigation
  - `handleSubmit(event)` - Form submission handler
  - `loadData()` - Fetch goals from API
  - `init()` - Initialize page and load data

### 6. Register Routes and Add Script Tag
- Add route registration in `apps/js/app.js` `registerRoutes()` function:
  ```javascript
  Router.register('performance', {
      render: () => PerformancePage.render(),
      onEnter: () => PerformancePage.init()
  });

  Router.register('performance/:tab', {
      render: (params) => PerformancePage.render(params),
      onEnter: (params) => PerformancePage.init(params)
  });
  ```
- Add script tag in `apps/index.html` before `app.js`:
  ```html
  <script src="js/pages/performance.js"></script>
  ```

### 7. Add Navigation Menu Item
- Update `HeaderComponent` in `apps/js/components/header.js` to include Performance link in navigation
- Update `MobileMenuComponent` in `apps/js/components/mobile-menu.js` for mobile navigation
- Add appropriate icon (e.g., `track_changes` or `trending_up`)

### 8. Implement Weight Validation Logic
- Create weight sum validation in the goal form
- Show real-time total weight as user enters values
- Disable submit if weights don't sum to 100%
- Allow bypass for draft saves (with warning)
- Color indicators: green (100%), yellow (incomplete), red (over 100%)

### 9. Add Progress Calculation and Visualization
- Calculate achievement percentage: `(actual / target) * 100`
- Handle different metric types:
  - Number: direct value comparison
  - Percentage: value is already a percentage
  - Yes/No: 0% or 100%
  - Rating: (actual / 5) * 100
- Progress bar colors:
  - Green: >= 90%
  - Yellow: 50-89%
  - Red: < 50%
- Show trend indicator (up/down arrow) based on last update

### 10. Validate Implementation
- Test goal creation with all categories
- Test weight validation (sum to 100%)
- Test progress updates and achievement calculation
- Test approval workflow (submit, approve, send back)
- Verify bilingual display (EN/TH switching)
- Test on mobile responsive view
- Verify G-BEST competency selection appears only for G-BEST category

## Validation Commands
Execute these commands to validate the chore is complete:

- `open apps/index.html` - Open the application in browser
- Navigate to `#/performance` route and verify:
  - Goal list displays with mock data
  - Progress bars show correct visualization
  - Status badges display correctly
  - Filter dropdowns work
- Click "Create Goal" and verify:
  - Form renders with all fields
  - Category selection shows/hides G-BEST competency field
  - Weight validation shows total
  - Metric type changes target input type
  - Form saves as draft or submits for review
- Test progress update:
  - Select an in-progress goal
  - Update actual value
  - Verify achievement calculation
  - Add comment and verify save
- Test language switching:
  - Toggle to Thai
  - Verify all labels translate
  - Verify goal names show Thai version
- Test responsive layout:
  - Resize browser to mobile width
  - Verify layout adapts appropriately

## Notes
- The G-BEST framework is specific to Central Group (Central Retail Corporation) and represents their corporate behavioral competency model
- Weight validation is critical for ensuring goals are properly balanced across categories
- The approval workflow should follow the existing pattern in `WorkflowEngine` for consistency
- Consider adding visual indicators for overdue goals (past end date with incomplete status)
- Progress calculation for "Yes/No" metrics should show either 0% or 100%, no in-between
- For rating-based metrics (1-5 scale), the achievement is calculated as `(actual_rating / 5) * 100`
- Managers should see both their own goals and their team's goals for review
- Consider adding goal templates for common KPI types in future iterations

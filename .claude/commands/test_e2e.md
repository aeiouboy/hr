# E2E Test Runner

Execute end-to-end (E2E) tests using Playwright browser automation (MCP Server). If any errors occur and assertions fail mark the test as failed and explain exactly what went wrong.

## Variables

adw_id: $1 if provided, otherwise generate a random 8 character hex string
agent_name: $2 if provided, otherwise use 'test_e2e'
e2e_test_file: $3 (optional - if not provided, run smoke test)
application_url: $4 if provided, otherwise determine from port configuration:
  - If `.ports.env` exists, source it and use http://localhost:${FRONTEND_PORT}
  - Otherwise use default http://localhost:8080

## Instructions

- If `application_url` was not provided, check for `.ports.env`:
  - If it exists, source it and use http://localhost:${FRONTEND_PORT}
  - Otherwise use default http://localhost:8080
- If `e2e_test_file` is provided:
  - If the value is "phase1" → Run the Phase 1 Test Suite
  - If the value is "phase2" → Run the Phase 2 Test Suite
  - If the value is "phase3" → Run the Phase 3 Test Suite
  - If the value is "phase4" → Run the Phase 4 Test Suite
  - If the value is "phase5" → Run the Phase 5 Test Suite
  - If the value is "additional" → Run the Additional Modules Test Suite
  - Otherwise read the `e2e_test_file` as a file path
  - Digest the `User Story` to first understand what we're validating
  - IMPORTANT: Execute the `Test Steps` detailed in the `e2e_test_file` using Playwright browser automation
  - Review the `Success Criteria` and if any of them fail, mark the test as failed
- If `e2e_test_file` is NOT provided:
  - Run the default smoke test (see "Default Smoke Test" section below)
- Review the steps that say '**Verify**...' and if they fail, mark the test as failed and explain exactly what went wrong
- Capture screenshots as specified
- IMPORTANT: Return results in the format requested by the `Output Format`
- Initialize Playwright browser in headed mode for visibility
- Use the determined `application_url`
- Allow time for async operations and element visibility
- IMPORTANT: After taking each screenshot, save it to `Screenshot Directory` with descriptive names. Use absolute paths to move the files to the `Screenshot Directory` with the correct name.
- Capture and report any errors encountered
- Ultra think about the `Test Steps` and execute them in order
- If you encounter an error, mark the test as failed immediately and explain exactly what went wrong and on what step it occurred. For example: '(Step 1 ❌) Failed to find element with selector "query-input" on page "http://localhost:8080"'
- Use `pwd` or equivalent to get the absolute path to the codebase for writing and displaying the correct paths to the screenshots

## Setup

Read and Execute `.claude/commands/prepare_app.md` now to prepare the application for the test.

## Default Smoke Test

When no `e2e_test_file` is provided, execute this smoke test for the RIS HR System:

### Test Name
RIS HR System - Smoke Test

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Check Header Elements**
   - **Verify**: Central Group logo is visible
   - **Verify**: Navigation menu contains "Employee Files"
   - **Verify**: Language toggle (TH/EN) is present
   - **Verify**: User menu is present

3. **Navigate to Employee Profile**
   - Click on "Employee Files" or navigate to `{application_url}/#/profile/EMP001`
   - Wait for profile to load (skeleton loading should disappear)
   - **Verify**: Profile header shows employee name
   - **Verify**: Tab navigation is visible (Personal Info, Employment, Compensation, Benefits, Profile Details)
   - **Screenshot**: `02_employee_profile.png`

4. **Test Tab Navigation**
   - Click on "Personal Info" tab
   - **Verify**: Personal information section loads
   - **Screenshot**: `03_personal_info_tab.png`

5. **Test Language Toggle**
   - Click on language toggle (switch to Thai or English)
   - **Verify**: UI labels change to the selected language
   - **Screenshot**: `04_language_toggle.png`

6. **Check for Console Errors**
   - Review browser console for any JavaScript errors
   - **Verify**: No critical errors (ignore favicon 404)

### Success Criteria
- Home page loads successfully
- Profile page displays employee data
- All tabs are clickable and render content
- Language toggle works
- No JavaScript errors in console

---

## Phase 1 Test Suite - Core Employee Functions

When `e2e_test_file` is "phase1", execute these tests for Leave Request, Payslip, Goal/KPI, and Performance Evaluation modules.

### Test Name
RIS HR System - Phase 1 Features

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Leave Request Module**
   - Navigate to `{application_url}/#/leave-request`
   - Wait for page to load (loading indicator should disappear)
   - **Verify**: Page title contains "ลา" (Leave) or "Leave Request"
   - **Verify**: Leave balance section displays leave types (Annual, Sick, Personal)
   - **Verify**: Tab navigation exists (New Request, My Requests, Calendar)
   - Click on "New Request" or "ยื่นคำขอใหม่" tab
   - **Verify**: Leave request form is visible with leave type dropdown
   - **Screenshot**: `02_leave_request.png`

3. **Test Leave Calendar**
   - Click on "Calendar" or "ปฏิทิน" tab
   - **Verify**: Calendar component renders with month navigation
   - **Verify**: Thai Buddhist Era year is displayed (e.g., 2569)
   - **Screenshot**: `03_leave_calendar.png`

4. **Test Payslip Module**
   - Navigate to `{application_url}/#/payslip`
   - Wait for page to load
   - **Verify**: Page title contains "สลิปเงินเดือน" or "Payslip"
   - **Verify**: Payslip list or recent payslips section is visible
   - **Verify**: Data masking is applied (amounts show *** or partial numbers)
   - **Screenshot**: `04_payslip.png`

5. **Test Tax Documents Section**
   - Look for "Tax Documents" or "เอกสารภาษี" section/tab
   - **Verify**: Tax document types are listed (50 ทวิ, ภ.ง.ด.91)
   - **Screenshot**: `05_tax_documents.png`

6. **Test Performance Management Module**
   - Navigate to `{application_url}/#/performance`
   - Wait for page to load
   - **Verify**: Page title contains "ผลงาน" or "Performance"
   - **Verify**: Tab navigation exists (Goals, Progress, Evaluation, History)
   - **Screenshot**: `06_performance_goals.png`

7. **Test Goals/KPI Tab**
   - Click on "Goals" or "เป้าหมาย" tab if not already active
   - **Verify**: Goals list displays with goal names and progress
   - **Verify**: Each goal shows weight percentage and status indicator
   - **Screenshot**: `07_goals_list.png`

8. **Test Performance Evaluation Tab**
   - Click on "Evaluation" or "ประเมิน" tab
   - **Verify**: Evaluation form displays with sections:
     - KPI Results section (50% weight indicator)
     - G-BEST Competency section (30% weight indicator)
     - Attendance Score section (10% weight indicator)
   - **Verify**: G-BEST competencies are listed (Guest Focus, Business Acumen, etc.)
   - **Screenshot**: `08_performance_evaluation.png`

9. **Test Language Toggle on Phase 1 Pages**
   - From any Phase 1 page, click language toggle to switch language
   - **Verify**: Labels change to the selected language (Thai/English)
   - **Screenshot**: `09_language_toggle.png`

10. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Phase 1 Success Criteria
- Leave Request page loads with balance display and form
- Leave Calendar renders with Thai Buddhist Era dates
- Payslip page displays with data masking
- Tax Documents section is accessible
- Performance page loads with Goals and Evaluation tabs
- G-BEST competency ratings are visible in evaluation
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## Phase 2 Test Suite - Time and Payroll

When `e2e_test_file` is "phase2", execute these tests for Time Management, Payroll Setup, Payroll Processing, and Government Reports.

### Test Name
RIS HR System - Phase 2 Features

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Time Management Module**
   - Navigate to `{application_url}/#/time-management`
   - Wait for page to load
   - **Verify**: Page title contains "เวลา" or "Time"
   - **Verify**: Shift information or attendance section is visible
   - **Screenshot**: `02_time_management.png`

3. **Test Shift Configuration (if accessible)**
   - Look for "Shift" or "กะ" section/tab
   - **Verify**: Shift types are listed (Regular, Morning, Evening, Night)
   - **Verify**: Working hours are displayed for each shift
   - **Screenshot**: `03_shift_config.png`

4. **Test Attendance Summary**
   - Look for attendance summary section
   - **Verify**: Working days, late arrivals, absences are displayed
   - **Verify**: Monthly summary or calendar view is available
   - **Screenshot**: `04_attendance_summary.png`

5. **Test Payroll Setup Module (Admin view)**
   - Navigate to `{application_url}/#/payroll-setup`
   - Wait for page to load
   - **Verify**: Page title contains "ค่าตอบแทน" or "Payroll"
   - **Verify**: Earning types section is visible (Base Salary, Allowances)
   - **Verify**: Deduction types section is visible (Tax, Social Security, Provident Fund)
   - **Screenshot**: `05_payroll_setup.png`

6. **Test Tax Configuration**
   - Look for "Tax" or "ภาษี" section
   - **Verify**: Thai tax brackets or withholding information is displayed
   - **Screenshot**: `06_tax_config.png`

7. **Test Payroll Processing Module**
   - Navigate to `{application_url}/#/payroll-processing`
   - Wait for page to load
   - **Verify**: Page displays payroll processing workflow or status
   - **Verify**: Pay period selection is available
   - **Screenshot**: `07_payroll_processing.png`

8. **Test Government Reports Module**
   - Navigate to `{application_url}/#/government-reports`
   - Wait for page to load
   - **Verify**: Page title contains "รายงาน" or "Government Reports"
   - **Verify**: Report types are listed:
     - Tax reports (ภ.ง.ด.1, ภ.ง.ด.1ก, 50 ทวิ)
     - Social Security reports (สปส. 1-10)
   - **Screenshot**: `08_government_reports.png`

9. **Test Report Generation**
   - Select a report type (e.g., ภ.ง.ด.1 Monthly Tax Report)
   - **Verify**: Report parameters form is displayed (period, company)
   - **Verify**: Generate/Preview button is available
   - **Screenshot**: `09_report_generation.png`

10. **Test Language Toggle on Phase 2 Pages**
    - From any Phase 2 page, click language toggle
    - **Verify**: Labels change to the selected language
    - **Screenshot**: `10_language_toggle.png`

11. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Phase 2 Success Criteria
- Time Management page loads with shift/attendance info
- Shift configuration displays Thai shift types
- Attendance summary shows working days statistics
- Payroll Setup displays earning and deduction types
- Tax configuration shows Thai tax brackets
- Payroll Processing workflow is accessible
- Government Reports page lists Thai compliance reports
- Report generation form works correctly
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## Phase 3 Test Suite - Organization & Planning

When `e2e_test_file` is "phase3", execute these tests for Organization Chart, Position Management, Manager Dashboard, and Employee Transfer modules.

### Test Name
RIS HR System - Phase 3 Features

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Organization Chart Module**
   - Navigate to `{application_url}/#/org-chart`
   - Wait for page to load (chart should render)
   - **Verify**: Page title contains "โครงสร้างองค์กร" or "Organization Chart"
   - **Verify**: Organization hierarchy is displayed as a tree/chart structure
   - **Verify**: Company selector or multi-company toggle is available
   - **Screenshot**: `02_org_chart.png`

3. **Test Org Chart Navigation**
   - Look for zoom/pan controls or interactive chart area
   - **Verify**: Nodes display employee names and positions
   - **Verify**: Reporting lines (manager-subordinate connections) are visible
   - Click on a node to expand or view details
   - **Verify**: Node expands or shows employee details popup
   - **Screenshot**: `03_org_chart_navigation.png`

4. **Test Multi-Company Hierarchy (if available)**
   - Look for company filter or dropdown
   - **Verify**: Different companies/business units can be selected
   - **Verify**: Chart updates to show selected company's structure
   - **Screenshot**: `04_multi_company.png`

5. **Test Position Management Module**
   - Navigate to `{application_url}/#/positions`
   - Wait for page to load
   - **Verify**: Page title contains "ตำแหน่ง" or "Position"
   - **Verify**: Position list is displayed with columns (Position Title, Department, Level)
   - **Screenshot**: `05_positions_list.png`

6. **Test Position Filters**
   - Look for filter controls (Department, Level, Status)
   - **Verify**: Filter dropdowns or search box is available
   - Apply a filter (e.g., select a department)
   - **Verify**: Position list updates based on filter selection
   - **Screenshot**: `06_positions_filtered.png`

7. **Test Position Details View**
   - Click on a position row to view details
   - **Verify**: Position details panel or modal opens
   - **Verify**: Details include: Job description, Requirements, Salary grade, Incumbents
   - **Screenshot**: `07_position_details.png`

8. **Test Manager Dashboard Module**
   - Navigate to `{application_url}/#/manager-dashboard`
   - Wait for page to load
   - **Verify**: Page title contains "ผู้จัดการ" or "Manager Dashboard"
   - **Verify**: Team overview section is visible
   - **Screenshot**: `08_manager_dashboard.png`

9. **Test Team Overview Section**
   - Look for team member list or summary cards
   - **Verify**: Team size and member names are displayed
   - **Verify**: Team statistics (headcount, on leave, pending tasks) are shown
   - **Screenshot**: `09_team_overview.png`

10. **Test Pending Approvals Section**
    - Look for "Pending Approvals" or "รอการอนุมัติ" section
    - **Verify**: Approval items are listed (Leave requests, Overtime, Transfers)
    - **Verify**: Approve/Reject action buttons are visible
    - **Screenshot**: `10_pending_approvals.png`

11. **Test Team Calendar**
    - Look for "Team Calendar" or "ปฏิทินทีม" section/tab
    - **Verify**: Calendar view displays team events/schedules
    - **Verify**: Leave and absence markers are visible on calendar
    - **Screenshot**: `11_team_calendar.png`

12. **Test Employee Transfer Module**
    - Navigate to `{application_url}/#/transfer-request`
    - Wait for page to load
    - **Verify**: Page title contains "โอนย้าย" or "Transfer"
    - **Verify**: Transfer request form or list is visible
    - **Screenshot**: `12_transfer_request.png`

13. **Test Transfer Request Form**
    - Look for "New Transfer" or "ขอโอนย้าย" button/tab
    - Click to open transfer request form
    - **Verify**: Form includes fields: Employee, Current Position, New Position, Effective Date
    - **Verify**: Transfer type options available (Promotion, Lateral, Demotion)
    - **Screenshot**: `13_transfer_form.png`

14. **Test Transfer Approval Workflow**
    - Look for transfer request list or workflow status
    - **Verify**: Requests show approval status (Pending, Approved, Rejected)
    - **Verify**: Workflow steps/approvers are displayed
    - **Screenshot**: `14_transfer_workflow.png`

15. **Test Language Toggle on Phase 3 Pages**
    - From any Phase 3 page, click language toggle
    - **Verify**: Labels change to the selected language (Thai/English)
    - **Screenshot**: `15_language_toggle.png`

16. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Phase 3 Success Criteria
- Organization Chart displays interactive hierarchy with zoom/pan
- Multi-company structure is navigable
- Reporting lines are clearly visible
- Position Management shows filterable position list
- Position details display job description and requirements
- Manager Dashboard shows team overview and statistics
- Pending approvals section lists actionable items
- Team calendar displays leave and events
- Transfer Request form captures required information
- Transfer workflow shows approval status
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## Phase 4 Test Suite - Talent & Learning

When `e2e_test_file` is "phase4", execute these tests for Talent Management, Learning/Training, and Succession Planning modules.

### Test Name
RIS HR System - Phase 4 Features

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Talent Management Module**
   - Navigate to `{application_url}/#/talent-management`
   - Wait for page to load
   - **Verify**: Page title contains "บริหารคนเก่ง" or "Talent Management"
   - **Verify**: Talent dashboard or overview section is visible
   - **Screenshot**: `02_talent_management.png`

3. **Test 9-Box Grid View**
   - Look for "9-Box Grid" or "ตาราง 9 ช่อง" section
   - **Verify**: 9-box matrix is displayed (Performance vs Potential axes)
   - **Verify**: Employee names/photos are plotted in appropriate boxes
   - **Verify**: Axes labels are correct (Low/Medium/High for both Performance and Potential)
   - Click on a box to filter employees
   - **Verify**: Employee list filters based on selected box
   - **Screenshot**: `03_9box_grid.png`

4. **Test Talent Profiles**
   - Look for "Talent Profiles" or "โปรไฟล์พนักงานดีเด่น" section
   - **Verify**: Individual talent cards or profiles are displayed
   - Click on a talent profile to view details
   - **Verify**: Profile shows: Performance history, Development plan, Career aspirations
   - **Screenshot**: `04_talent_profiles.png`

5. **Test Hi-Po Dashboard**
   - Look for "High Potential" or "พนักงานศักยภาพสูง" section/tab
   - **Verify**: Hi-Po employee list is displayed
   - **Verify**: Each Hi-Po shows: Readiness level, Development status, Risk of leaving
   - **Verify**: Filter or segment options available (by department, level)
   - **Screenshot**: `05_hipo_dashboard.png`

6. **Test Learning/Training Module**
   - Navigate to `{application_url}/#/learning`
   - Wait for page to load
   - **Verify**: Page title contains "อบรม" or "Learning" or "Training"
   - **Verify**: Learning dashboard or course section is visible
   - **Screenshot**: `06_learning_main.png`

7. **Test Course Catalog**
   - Look for "Course Catalog" or "รายการหลักสูตร" section
   - **Verify**: Course list displays with course names and categories
   - **Verify**: Course cards show: Title, Duration, Provider, Status
   - **Verify**: Search or filter options are available
   - **Screenshot**: `07_course_catalog.png`

8. **Test Course Enrollment**
   - Click on a course to view details
   - **Verify**: Course detail page shows: Description, Schedule, Prerequisites
   - Look for "Enroll" or "ลงทะเบียน" button
   - **Verify**: Enrollment action is available (or already enrolled status)
   - **Screenshot**: `08_course_enrollment.png`

9. **Test Training Calendar**
   - Look for "Training Calendar" or "ปฏิทินอบรม" tab/section
   - **Verify**: Calendar view displays scheduled training sessions
   - **Verify**: Training events are marked on appropriate dates
   - **Verify**: Can navigate between months
   - **Screenshot**: `09_training_calendar.png`

10. **Test Succession Planning Module**
    - Navigate to `{application_url}/#/succession-planning`
    - Wait for page to load
    - **Verify**: Page title contains "สืบทอดตำแหน่ง" or "Succession"
    - **Verify**: Succession planning dashboard is visible
    - **Screenshot**: `10_succession_main.png`

11. **Test Critical Positions View**
    - Look for "Critical Positions" or "ตำแหน่งสำคัญ" section
    - **Verify**: List of critical/key positions is displayed
    - **Verify**: Each position shows: Risk level, Successor count, Readiness
    - **Verify**: Color coding indicates risk (Red = high risk, Green = covered)
    - **Screenshot**: `11_critical_positions.png`

12. **Test Successor Nomination**
    - Click on a critical position to view succession details
    - **Verify**: Nominated successors are listed
    - **Verify**: Each successor shows: Name, Readiness (Ready Now/1-2 Years/3+ Years)
    - Look for "Add Successor" or "เพิ่มผู้สืบทอด" button
    - **Verify**: Nomination form or search is available
    - **Screenshot**: `12_successor_nomination.png`

13. **Test Succession Chart**
    - Look for "Succession Chart" or "แผนผังสืบทอด" view
    - **Verify**: Visual chart shows position-successor relationships
    - **Verify**: Chart displays readiness indicators for each successor
    - **Screenshot**: `13_succession_chart.png`

14. **Test Language Toggle on Phase 4 Pages**
    - From any Phase 4 page, click language toggle
    - **Verify**: Labels change to the selected language (Thai/English)
    - **Screenshot**: `14_language_toggle.png`

15. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Phase 4 Success Criteria
- Talent Management displays 9-box grid with employee placement
- Talent profiles show performance and development information
- Hi-Po dashboard identifies high-potential employees
- Learning module displays course catalog with categories
- Course enrollment functionality is accessible
- Training calendar shows scheduled sessions
- Succession Planning shows critical positions with risk indicators
- Successor nomination workflow is available
- Succession chart visualizes position-successor relationships
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## Phase 5 Test Suite - Recruitment

When `e2e_test_file` is "phase5", execute these tests for Recruitment, Candidate Screening, and Onboarding modules.

### Test Name
RIS HR System - Phase 5 Features

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Recruitment Module**
   - Navigate to `{application_url}/#/recruitment`
   - Wait for page to load
   - **Verify**: Page title contains "สรรหา" or "Recruitment"
   - **Verify**: Recruitment dashboard or job list is visible
   - **Screenshot**: `02_recruitment_main.png`

3. **Test Job Postings**
   - Look for "Job Postings" or "ตำแหน่งงานว่าง" section
   - **Verify**: Job posting list is displayed
   - **Verify**: Each posting shows: Title, Department, Status, Application count
   - **Verify**: Filter by status (Open, Closed, Draft) is available
   - **Screenshot**: `03_job_postings.png`

4. **Test Create Job Posting**
   - Look for "Create Job" or "สร้างตำแหน่งงาน" button
   - Click to open job creation form
   - **Verify**: Form includes fields: Title, Department, Requirements, Salary range
   - **Verify**: Job description editor is available
   - **Verify**: Publish options are visible (Internal only, External, Both)
   - **Screenshot**: `04_create_job.png`

5. **Test Job Board View**
   - Look for "Job Board" or "บอร์ดงาน" tab or navigate to careers page
   - **Verify**: Public-facing job list is displayed
   - **Verify**: Jobs show: Title, Location, Employment type
   - **Verify**: Apply button or link is visible for each job
   - **Screenshot**: `05_job_board.png`

6. **Test Application Form**
   - Click on a job posting's Apply button
   - **Verify**: Application form opens
   - **Verify**: Form includes: Personal info, Resume upload, Cover letter
   - **Verify**: Required fields are marked
   - **Screenshot**: `06_application_form.png`

7. **Test Candidate Screening Module**
   - Navigate to `{application_url}/#/candidate-screening`
   - Wait for page to load
   - **Verify**: Page title contains "คัดกรอง" or "Screening"
   - **Verify**: Candidate pipeline or list is visible
   - **Screenshot**: `07_candidate_screening.png`

8. **Test Screening Results**
   - Look for screening results or candidate evaluations
   - **Verify**: Candidates are listed with screening status
   - **Verify**: Each candidate shows: Name, Applied position, Screening score/status
   - **Verify**: Pipeline stages visible (Applied, Screening, Interview, Offer, Hired)
   - **Screenshot**: `08_screening_results.png`

9. **Test Interview Scheduling**
   - Click on a candidate to view details
   - Look for "Schedule Interview" or "นัดสัมภาษณ์" button
   - **Verify**: Interview scheduling form is available
   - **Verify**: Form includes: Date, Time, Interviewers, Location/Video link
   - **Verify**: Calendar integration or date picker is visible
   - **Screenshot**: `09_interview_scheduling.png`

10. **Test Candidate Evaluation**
    - Look for "Evaluation" or "ประเมินผู้สมัคร" section
    - **Verify**: Evaluation form or scorecard is available
    - **Verify**: Evaluation criteria are listed (Skills, Experience, Culture fit)
    - **Verify**: Rating scale or scoring options are visible
    - **Screenshot**: `10_candidate_evaluation.png`

11. **Test Onboarding Module**
    - Navigate to `{application_url}/#/onboarding`
    - Wait for page to load
    - **Verify**: Page title contains "ปฐมนิเทศ" or "Onboarding"
    - **Verify**: Onboarding dashboard or new hire list is visible
    - **Screenshot**: `11_onboarding_main.png`

12. **Test Onboarding Checklist**
    - Look for "Checklist" or "รายการเตรียมความพร้อม" section
    - **Verify**: Onboarding task checklist is displayed
    - **Verify**: Tasks include categories: Documents, IT Setup, Training, Orientation
    - **Verify**: Task completion status (checkbox or progress) is visible
    - **Screenshot**: `12_onboarding_checklist.png`

13. **Test Day-One Tasks**
    - Look for "Day-One" or "วันแรก" section
    - **Verify**: First day activities/tasks are listed
    - **Verify**: Tasks include: Welcome meeting, ID card, Equipment pickup
    - **Verify**: Assigned owner/responsible person is shown
    - **Screenshot**: `13_day_one_tasks.png`

14. **Test Probation Setup**
    - Look for "Probation" or "ทดลองงาน" section
    - **Verify**: Probation period information is displayed
    - **Verify**: Shows: Duration, Evaluation dates, Mentor/Buddy assignment
    - **Verify**: Probation goals or objectives are visible
    - **Screenshot**: `14_probation_setup.png`

15. **Test Language Toggle on Phase 5 Pages**
    - From any Phase 5 page, click language toggle
    - **Verify**: Labels change to the selected language (Thai/English)
    - **Screenshot**: `15_language_toggle.png`

16. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Phase 5 Success Criteria
- Recruitment module displays job postings with application counts
- Job creation form captures required position information
- Job board presents public-facing career opportunities
- Application form allows candidate submission
- Candidate Screening shows pipeline stages
- Interview scheduling functionality is accessible
- Candidate evaluation scorecard is available
- Onboarding displays task checklist with categories
- Day-one tasks are clearly outlined
- Probation setup shows duration and evaluation schedule
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## Additional Modules Test Suite

When `e2e_test_file` is "additional", execute these tests for Location Management, Resignation, Overtime, IDP, and Training Records modules.

### Test Name
RIS HR System - Additional Modules

### Test Steps

1. **Navigate to Home Page**
   - Go to `{application_url}`
   - **Verify**: Page loads without console errors
   - **Screenshot**: `01_home_page.png`

2. **Test Location Management Module**
   - Navigate to `{application_url}/#/locations`
   - Wait for page to load
   - **Verify**: Page title contains "สถานที่" or "Location"
   - **Verify**: Location list or hierarchy is visible
   - **Screenshot**: `02_locations_main.png`

3. **Test Location Hierarchy**
   - Look for location tree or hierarchy view
   - **Verify**: Hierarchy levels displayed (Country > Region > Province > Branch)
   - **Verify**: Expand/collapse functionality works for nested locations
   - **Screenshot**: `03_location_hierarchy.png`

4. **Test Thai Provinces**
   - Look for Thailand locations or province list
   - **Verify**: Thai provinces are listed (กรุงเทพ, เชียงใหม่, ภูเก็ต, etc.)
   - **Verify**: Province grouping by region (Central, North, South, etc.) if available
   - **Verify**: Location details show: Address, Contact, Headcount
   - **Screenshot**: `04_thai_provinces.png`

5. **Test Resignation Module**
   - Navigate to `{application_url}/#/resignation`
   - Wait for page to load
   - **Verify**: Page title contains "ลาออก" or "Resignation"
   - **Verify**: Resignation dashboard or request list is visible
   - **Screenshot**: `05_resignation_main.png`

6. **Test Resignation Recording**
   - Look for "New Resignation" or "บันทึกการลาออก" button/form
   - **Verify**: Resignation form is available
   - **Verify**: Form includes: Employee, Resignation date, Last working day, Reason
   - **Verify**: Reason options include common categories (Personal, New opportunity, etc.)
   - **Screenshot**: `06_resignation_form.png`

7. **Test Clearance Checklist**
   - Look for "Clearance" or "เคลียร์พนักงาน" section
   - **Verify**: Clearance checklist is displayed
   - **Verify**: Checklist items include: Equipment return, Access revocation, Final payment
   - **Verify**: Department-specific clearance items visible (IT, Finance, HR, Admin)
   - **Verify**: Sign-off status for each department is shown
   - **Screenshot**: `07_clearance_checklist.png`

8. **Test Overtime Module**
   - Navigate to `{application_url}/#/overtime`
   - Wait for page to load
   - **Verify**: Page title contains "ล่วงเวลา" or "Overtime" or "OT"
   - **Verify**: Overtime dashboard or request list is visible
   - **Screenshot**: `08_overtime_main.png`

9. **Test OT Request Form**
   - Look for "New OT Request" or "ขอทำงานล่วงเวลา" button
   - Click to open OT request form
   - **Verify**: Form includes: Date, Start time, End time, Reason
   - **Verify**: OT type selection available (Weekday, Weekend, Holiday)
   - **Verify**: Estimated hours calculated automatically
   - **Screenshot**: `09_ot_request_form.png`

10. **Test Thai Labor Law Rates**
    - Look for OT rate information or calculation preview
    - **Verify**: Thai OT rates are displayed or applied:
      - Weekday OT: 1.5x hourly rate
      - Weekend OT: 2x hourly rate (or 3x for no regular weekend work)
      - Holiday OT: 3x hourly rate
    - **Verify**: Rate multipliers are shown in form or help text
    - **Screenshot**: `10_ot_rates.png`

11. **Test IDP (Individual Development Plan) Module**
    - Navigate to `{application_url}/#/idp`
    - Wait for page to load
    - **Verify**: Page title contains "แผนพัฒนา" or "IDP" or "Development Plan"
    - **Verify**: IDP dashboard or plan list is visible
    - **Screenshot**: `11_idp_main.png`

12. **Test Competency Gap Analysis**
    - Look for "Competency Gap" or "ช่องว่างความสามารถ" section
    - **Verify**: Gap analysis chart or table is displayed
    - **Verify**: Shows: Required competency level vs Current level
    - **Verify**: Gap indicators (visual or numeric) are visible
    - **Screenshot**: `12_competency_gap.png`

13. **Test Development Plan**
    - Look for "Development Plan" or "แผนพัฒนา" section
    - **Verify**: Development activities are listed
    - **Verify**: Each activity shows: Type (Training, Coaching, Assignment), Timeline, Status
    - **Verify**: Progress tracking is visible (completion percentage)
    - **Screenshot**: `13_development_plan.png`

14. **Test Training Records Module**
    - Navigate to `{application_url}/#/training-records`
    - Wait for page to load
    - **Verify**: Page title contains "ประวัติอบรม" or "Training Records" or "Training History"
    - **Verify**: Training history list is visible
    - **Screenshot**: `14_training_records.png`

15. **Test Training History**
    - Look for training history list or table
    - **Verify**: Training records display: Course name, Date, Provider, Status
    - **Verify**: Filter by year or category is available
    - **Verify**: Completed vs In-progress training is distinguishable
    - **Screenshot**: `15_training_history.png`

16. **Test Certificates**
    - Look for "Certificates" or "ใบประกาศ" section/tab
    - **Verify**: Certificate list is displayed
    - **Verify**: Certificates show: Name, Issue date, Expiry date (if applicable)
    - **Verify**: Download or view certificate action is available
    - **Screenshot**: `16_certificates.png`

17. **Test Language Toggle on Additional Pages**
    - From any Additional module page, click language toggle
    - **Verify**: Labels change to the selected language (Thai/English)
    - **Screenshot**: `17_language_toggle.png`

18. **Check for Console Errors**
    - Review browser console for any JavaScript errors
    - **Verify**: No critical errors (ignore favicon 404, warnings are OK)

### Additional Modules Success Criteria
- Location Management displays hierarchical location structure
- Thai provinces are properly listed and categorized
- Location details show address and headcount
- Resignation form captures required termination information
- Clearance checklist covers all departments
- Overtime module displays Thai labor law OT rates
- OT request form calculates hours and applies correct rates
- IDP shows competency gap analysis
- Development plan lists activities with timelines
- Training Records displays course history
- Certificates are viewable and downloadable
- Bilingual support works (Thai/English toggle)
- No JavaScript errors in console

---

## RIS HR System - Common Selectors

Reference for test authors:

| Element | Selector/Text |
|---------|---------------|
| Logo | CENTRALGROUP logo image |
| Employee Files | "Employee Files" link/dropdown or "ข้อมูลพนักงาน" |
| Language Toggle | "TH" or "EN" button |
| Profile Tabs | Tab buttons: "Personal Info", "Employment", "Compensation", "Benefits", "Profile Details" |
| Loading State | Elements with class "animate-pulse" or "skeleton" |
| Notification Bell | Bell icon in header |
| User Menu | User avatar/dropdown in header |

### Phase 1 Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Leave Request Page | "ยื่นลา" / "Leave Request" |
| Leave Balance | "ยอดวันลา" / "Leave Balance" |
| Leave Types | "วันลาพักร้อน", "วันลาป่วย", "วันลากิจ" / "Annual", "Sick", "Personal" |
| Leave Form Tabs | "ยื่นคำขอใหม่", "คำขอของฉัน", "ปฏิทิน" / "New Request", "My Requests", "Calendar" |
| Payslip Page | "สลิปเงินเดือน" / "Payslip" |
| Tax Documents | "เอกสารภาษี" / "Tax Documents" |
| Performance Page | "ผลงาน" / "Performance" |
| Performance Tabs | "เป้าหมาย", "ความคืบหน้า", "ประเมิน", "ประวัติ" / "Goals", "Progress", "Evaluation", "History" |
| G-BEST Competencies | "Guest Focus", "Business Acumen", "Execution Excellence", "Self Development", "Teamwork" |
| KPI Weight | "KPI 50%", "G-BEST 30%", "Attendance 10%" |

### Phase 2 Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Time Management Page | "การจัดการเวลา" / "Time Management" |
| Shift Types | "กะปกติ", "กะเช้า", "กะบ่าย", "กะกลางคืน" / "Regular", "Morning", "Evening", "Night" |
| Attendance | "การเข้างาน" / "Attendance" |
| Payroll Setup Page | "ตั้งค่าเงินเดือน" / "Payroll Setup" |
| Earning Types | "เงินเดือน", "ค่าตำแหน่ง", "ค่าครองชีพ" / "Base Salary", "Position Allowance", "Cost of Living" |
| Deduction Types | "ภาษี", "ประกันสังคม", "กองทุนสำรอง" / "Tax", "Social Security", "Provident Fund" |
| Payroll Processing | "ประมวลผลเงินเดือน" / "Payroll Processing" |
| Government Reports | "รายงานราชการ" / "Government Reports" |
| Tax Reports | "ภ.ง.ด.1", "ภ.ง.ด.1ก", "50 ทวิ" |
| Social Security Reports | "สปส. 1-10" |

### Phase 3 Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Org Chart Page | "โครงสร้างองค์กร" / "Organization Chart" |
| Chart Controls | Zoom in/out buttons, pan controls |
| Position Page | "ตำแหน่งงาน" / "Position Management" |
| Position Filters | Department, Level, Status dropdowns |
| Manager Dashboard | "แดชบอร์ดผู้จัดการ" / "Manager Dashboard" |
| Team Overview | "ภาพรวมทีม" / "Team Overview" |
| Pending Approvals | "รอการอนุมัติ" / "Pending Approvals" |
| Team Calendar | "ปฏิทินทีม" / "Team Calendar" |
| Transfer Request | "ขอโอนย้าย" / "Transfer Request" |
| Transfer Types | "เลื่อนตำแหน่ง", "ย้ายแนวราบ", "ลดตำแหน่ง" / "Promotion", "Lateral", "Demotion" |
| Approval Status | "รอดำเนินการ", "อนุมัติ", "ปฏิเสธ" / "Pending", "Approved", "Rejected" |

### Phase 4 Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Talent Management Page | "บริหารคนเก่ง" / "Talent Management" |
| 9-Box Grid | "ตาราง 9 ช่อง" / "9-Box Grid" |
| Performance Axis | "ผลงาน" / "Performance" (Low/Medium/High) |
| Potential Axis | "ศักยภาพ" / "Potential" (Low/Medium/High) |
| Talent Profile | "โปรไฟล์พนักงานดีเด่น" / "Talent Profile" |
| Hi-Po Dashboard | "พนักงานศักยภาพสูง" / "High Potential" |
| Learning Page | "การเรียนรู้และพัฒนา" / "Learning & Development" |
| Course Catalog | "รายการหลักสูตร" / "Course Catalog" |
| Enroll Button | "ลงทะเบียน" / "Enroll" |
| Training Calendar | "ปฏิทินอบรม" / "Training Calendar" |
| Succession Page | "การสืบทอดตำแหน่ง" / "Succession Planning" |
| Critical Positions | "ตำแหน่งสำคัญ" / "Critical Positions" |
| Readiness Levels | "พร้อมทันที", "1-2 ปี", "3+ ปี" / "Ready Now", "1-2 Years", "3+ Years" |
| Add Successor | "เพิ่มผู้สืบทอด" / "Add Successor" |

### Phase 5 Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Recruitment Page | "สรรหาบุคลากร" / "Recruitment" |
| Job Postings | "ตำแหน่งงานว่าง" / "Job Postings" |
| Create Job | "สร้างตำแหน่งงาน" / "Create Job Posting" |
| Job Board | "บอร์ดงาน" / "Job Board" |
| Apply Button | "สมัครงาน" / "Apply" |
| Candidate Screening | "คัดกรองผู้สมัคร" / "Candidate Screening" |
| Pipeline Stages | "สมัคร", "คัดกรอง", "สัมภาษณ์", "ข้อเสนอ", "รับเข้า" / "Applied", "Screening", "Interview", "Offer", "Hired" |
| Schedule Interview | "นัดสัมภาษณ์" / "Schedule Interview" |
| Evaluation | "ประเมินผู้สมัคร" / "Candidate Evaluation" |
| Onboarding Page | "ปฐมนิเทศ" / "Onboarding" |
| Checklist | "รายการเตรียมความพร้อม" / "Onboarding Checklist" |
| Day-One Tasks | "งานวันแรก" / "Day-One Tasks" |
| Probation | "ทดลองงาน" / "Probation" |

### Additional Modules Selectors
| Element | Selector/Text (Thai/English) |
|---------|------------------------------|
| Location Page | "สถานที่ทำงาน" / "Location Management" |
| Location Hierarchy | Tree structure with expand/collapse |
| Thai Regions | "ภาคกลาง", "ภาคเหนือ", "ภาคใต้", "ภาคตะวันออก", "ภาคตะวันออกเฉียงเหนือ" / "Central", "North", "South", "East", "Northeast" |
| Thai Provinces | "กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต", "ชลบุรี", "ขอนแก่น" |
| Resignation Page | "ลาออก" / "Resignation" |
| New Resignation | "บันทึกการลาออก" / "Record Resignation" |
| Clearance | "เคลียร์พนักงาน" / "Employee Clearance" |
| Clearance Departments | "IT", "การเงิน", "ทรัพยากรบุคคล", "ธุรการ" / "IT", "Finance", "HR", "Admin" |
| Overtime Page | "ล่วงเวลา" / "Overtime" |
| OT Request | "ขอทำงานล่วงเวลา" / "OT Request" |
| OT Types | "วันธรรมดา", "วันหยุด", "วันหยุดนักขัตฤกษ์" / "Weekday", "Weekend", "Holiday" |
| OT Rates | "1.5 เท่า", "2 เท่า", "3 เท่า" / "1.5x", "2x", "3x" |
| IDP Page | "แผนพัฒนารายบุคคล" / "Individual Development Plan" |
| Competency Gap | "ช่องว่างความสามารถ" / "Competency Gap" |
| Development Activities | "กิจกรรมพัฒนา" / "Development Activities" |
| Training Records Page | "ประวัติการอบรม" / "Training Records" |
| Training History | "ประวัติหลักสูตร" / "Course History" |
| Certificates | "ใบประกาศนียบัตร" / "Certificates" |

## Common Routes

| Route | Description |
|-------|-------------|
| `/#/` | Home page |
| `/#/profile/EMP001` | Default employee profile |
| `/#/profile/EMP001/personal-info` | Personal info tab |
| `/#/profile/EMP001/employment` | Employment tab |
| `/#/profile/EMP001/compensation` | Compensation tab |
| `/#/profile/EMP001/benefits` | Benefits tab |
| `/#/profile/EMP001/profile-details` | Profile details tab |
| `/#/workflows` | Workflow approvals |

### Phase 1 Routes
| Route | Description |
|-------|-------------|
| `/#/leave-request` | Leave Request module |
| `/#/payslip` | Payslip and Tax Documents |
| `/#/performance` | Performance Management (Goals/KPI/Evaluation) |

### Phase 2 Routes
| Route | Description |
|-------|-------------|
| `/#/time-management` | Time Management (Shifts/Attendance) |
| `/#/payroll-setup` | Payroll Master Setup |
| `/#/payroll-processing` | Monthly Payroll Processing |
| `/#/government-reports` | Government Reports (Tax/SS) |

### Phase 3 Routes
| Route | Description |
|-------|-------------|
| `/#/org-chart` | Organization Chart (Hierarchy View) |
| `/#/positions` | Position Management |
| `/#/manager-dashboard` | Manager Dashboard (Team Overview) |
| `/#/transfer-request` | Employee Transfer Requests |

### Phase 4 Routes
| Route | Description |
|-------|-------------|
| `/#/talent-management` | Talent Management (9-Box Grid) |
| `/#/learning` | Learning & Training (Course Catalog) |
| `/#/succession-planning` | Succession Planning (Critical Positions) |

### Phase 5 Routes
| Route | Description |
|-------|-------------|
| `/#/recruitment` | Recruitment (Job Postings) |
| `/#/candidate-screening` | Candidate Screening (Pipeline) |
| `/#/onboarding` | Onboarding (New Hire Checklist) |

### Additional Module Routes
| Route | Description |
|-------|-------------|
| `/#/locations` | Location Management (Thai Provinces) |
| `/#/resignation` | Resignation Recording (Clearance) |
| `/#/overtime` | Overtime Request (Thai Labor Law Rates) |
| `/#/idp` | Individual Development Plan (Competency Gap) |
| `/#/training-records` | Training Records (History & Certificates) |

## Screenshot Directory

<absolute path to codebase>/agents/<adw_id>/<agent_name>/img/<directory name based on test file name>/*.png

Each screenshot should be saved with a descriptive name that reflects what is being captured. The directory structure ensures that:
- Screenshots are organized by ADW ID (workflow run)
- They are stored under the specified agent name (e.g., e2e_test_runner_0, e2e_test_resolver_iter1_0)
- Each test has its own subdirectory based on the test file name (e.g., test_basic_query → basic_query/)

For smoke tests (no test file), use subdirectory name: `smoke_test/`

## Test Result Directory

<absolute path to codebase>/test-result/

Save the JSON test result to this directory with the filename format:
- `<adw_id>_<test_name>.json` (e.g., `9c170302_smoke_test.json`)

Create the directory if it doesn't exist.

## Report

- Exclusively return the JSON output as specified in the test file
- Capture any unexpected errors
- IMPORTANT: Ensure all screenshots are saved in the `Screenshot Directory`
- IMPORTANT: Save the JSON result to the `Test Result Directory`

### Output Format

```json
{
  "test_name": "Test Name Here",
  "status": "passed|failed",
  "screenshots": [
    "<absolute path to codebase>/agents/<adw_id>/<agent_name>/img/<test name>/01_<descriptive name>.png",
    "<absolute path to codebase>/agents/<adw_id>/<agent_name>/img/<test name>/02_<descriptive name>.png",
    "<absolute path to codebase>/agents/<adw_id>/<agent_name>/img/<test name>/03_<descriptive name>.png"
  ],
  "steps_executed": [
    { "step": 1, "name": "Navigate to Home Page", "status": "passed" },
    { "step": 2, "name": "Check Header Elements", "status": "passed" },
    { "step": 3, "name": "Navigate to Employee Profile", "status": "failed", "error": "Profile failed to load" }
  ],
  "error": null
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Browser not installed | Run `mcp__playwright__browser_install` tool |
| Page not loading | Verify app is running with `curl http://localhost:8080` |
| Elements not found | Wait for loading states to complete, check for skeleton screens |
| Language not changing | Check AppState subscription is working |
| Console errors on init | Clear browser cache, reload page |

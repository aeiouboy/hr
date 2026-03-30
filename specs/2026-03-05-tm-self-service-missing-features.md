# Plan: TM Self Service - Missing Features Implementation

## Task Description
Implement the remaining features from the TM (Time Management) Self Service specification. The Employee Self Service is ~95% complete, but Manager Self Service and Admin Self Service have significant gaps. This plan covers 5 missing/partial features across 3 roles.

## Objective
Complete the full TM Self Service module covering all 3 roles (Employee, Manager, Admin) as specified in the TM Self Service requirements document, so the system provides end-to-end time management from employee clock-in through manager approval to admin configuration.

## Problem Statement
The current implementation covers Employee Self Service well (clock in/out, leave, time correction, OT, timesheet, workflows). However:
1. **SPD role** has no UI for viewing/editing team time data, OT, schedules, or leave documents
2. **HRBP role** has no reporting dashboard
3. **Admin** cannot configure geofencing zones or customize approval workflow steps
4. **2-step approval** (Manager -> HRBP) for document-required leaves is not wired up
5. **Cancel Leave** for already-approved items (sends to workflow) is not distinct from canceling pending ones

## Solution Approach
Build 5 new feature modules that integrate with the existing architecture:
- Extend `use-workflows.ts` for 2-step approval routing and `time_correction` workflow type
- Create new SPD page under manager-dashboard for team time data management
- Create HRBP report dashboard with summary analytics
- Extend Settings page with Geofencing admin and Workflow configuration panels
- Enhance leave history to support cancel-approved-leave via workflow submission

## Relevant Files
Use these files to complete the task:

### Existing Files to Modify
- `src/frontend/src/hooks/use-workflows.ts` - Add `time_correction` type, 2-step approval logic for document leaves
- `src/frontend/src/hooks/use-time.ts` - Add team attendance data for SPD view, extend mock data
- `src/frontend/src/hooks/use-leave.ts` - Add cancel-approved-leave function that creates workflow
- `src/frontend/src/hooks/use-overtime.ts` - Add team OT data for SPD view
- `src/frontend/src/lib/rbac.ts` - Add `spd-management`, `hrbp-reports` module access
- `src/frontend/src/components/leave/leave-history.tsx` - Enhance cancel to handle approved leaves
- `src/frontend/src/components/shared/sidebar.tsx` - Add new nav items for SPD, HRBP reports
- `src/frontend/src/app/[locale]/settings/page.tsx` - Add geofencing and workflow config tabs
- `src/frontend/messages/en.json` - Add all new i18n keys
- `src/frontend/messages/th.json` - Add all new Thai i18n keys

### New Files to Create
- `src/frontend/src/components/spd/spd-management-page.tsx` - SPD team data management page
- `src/frontend/src/hooks/use-spd.ts` - Hook for SPD team data (time, OT, schedule, leave docs)
- `src/frontend/src/app/[locale]/spd-management/page.tsx` - SPD route page
- `src/frontend/src/components/hrbp/hrbp-reports-page.tsx` - HRBP reporting dashboard
- `src/frontend/src/hooks/use-hrbp-reports.ts` - Hook for HRBP report data
- `src/frontend/src/app/[locale]/hrbp-reports/page.tsx` - HRBP route page
- `src/frontend/src/components/settings/geofencing-config.tsx` - Admin geofencing zone management
- `src/frontend/src/components/settings/workflow-config.tsx` - Admin approval workflow configuration
- `src/frontend/src/hooks/use-geofencing.ts` - Hook for geofencing zone CRUD
- `src/frontend/src/hooks/use-workflow-config.ts` - Hook for workflow template configuration

## Implementation Phases

### Phase 1: Foundation (Data Layer + RBAC)
- Create new hooks with mock data: `use-spd.ts`, `use-hrbp-reports.ts`, `use-geofencing.ts`, `use-workflow-config.ts`
- Update `rbac.ts` with new module permissions
- Extend `use-workflows.ts` with `time_correction` type and 2-step approval routing
- Add all i18n keys to en.json and th.json

### Phase 2: Core Implementation (5 Features)
Build the 5 feature UIs in parallel:
1. SPD Management page (view/edit team time, OT, schedule, leave docs)
2. HRBP Reports page (analytics dashboard)
3. Geofencing Config component (zone CRUD within Settings)
4. Workflow Config component (approval step configuration within Settings)
5. Cancel-approved-leave enhancement in leave history

### Phase 3: Integration & Polish
- Wire up navigation (sidebar, header menus)
- Create route pages
- RBAC-gate all new pages
- Visual QA across desktop/mobile
- Verify i18n completeness

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to do the building, validating, testing, deploying, and other tasks.

### Team Members

- Builder
  - Name: builder-foundation
  - Role: Create all new hooks, update RBAC, add i18n keys
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-spd
  - Role: Build SPD Management page with team time/OT/schedule/leave-doc tabs
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-hrbp
  - Role: Build HRBP Reports dashboard page
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-admin
  - Role: Build Geofencing Config and Workflow Config components in Settings
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-leave-enhancement
  - Role: Enhance leave cancel for approved items, wire 2-step approval
  - Agent Type: builder
  - Resume: true

- Builder
  - Name: builder-integration
  - Role: Wire up routes, navigation, RBAC gates, final polish
  - Agent Type: builder
  - Resume: true

- Validator
  - Name: validator-final
  - Role: Validate all features work, TypeScript compiles, i18n complete, RBAC correct
  - Agent Type: validator
  - Resume: false

## Step by Step Tasks

### 1. Foundation - RBAC & i18n Keys
- **Task ID**: foundation-rbac-i18n
- **Depends On**: none
- **Assigned To**: builder-foundation
- **Agent Type**: builder
- **Parallel**: true (can start immediately)
- Update `src/frontend/src/lib/rbac.ts`:
  - Add `'spd-management': ['manager', 'hr_admin', 'hr_manager']`
  - Add `'hrbp-reports': ['hr_admin', 'hr_manager']`
  - Add `'geofencing-config': ['hr_admin', 'hr_manager']`
  - Add `'workflow-config': ['hr_admin', 'hr_manager']`
- Add i18n keys to `messages/en.json` under new sections: `spd`, `hrbpReports`, `geofencing`, `workflowConfig`
- Add Thai translations to `messages/th.json` for all new keys
- Key groups needed:
  - `spd.title`, `spd.subtitle`, `spd.tabs.*` (timeRecords, otRecords, schedules, leaveDocuments)
  - `spd.columns.*` (employee, date, clockIn, clockOut, workHours, otHours, status, actions)
  - `spd.actions.*` (edit, save, cancel, viewDocument)
  - `hrbpReports.title`, `hrbpReports.subtitle`, `hrbpReports.tabs.*` (attendance, leave, overtime, summary)
  - `hrbpReports.metrics.*` (avgAttendance, lateRate, absentRate, leaveUtilization, otHours, headcount)
  - `geofencing.title`, `geofencing.zones`, `geofencing.addZone`, `geofencing.radius`, `geofencing.latitude`, `geofencing.longitude`, `geofencing.employees`
  - `workflowConfig.title`, `workflowConfig.templates`, `workflowConfig.steps`, `workflowConfig.addStep`, `workflowConfig.approverRole`, `workflowConfig.condition`

### 2. Foundation - New Hooks
- **Task ID**: foundation-hooks
- **Depends On**: none
- **Assigned To**: builder-foundation
- **Agent Type**: builder
- **Parallel**: true (can start with task 1)
- Create `src/frontend/src/hooks/use-spd.ts`:
  - Interface: `TeamMember { id, name, photo, position, department }`
  - Interface: `TeamTimeRecord { id, employeeId, employeeName, date, shift, clockIn, clockOut, workHours, otHours, status, isEdited }`
  - Interface: `TeamOTRecord { id, employeeId, employeeName, date, startTime, endTime, hours, type, status, amount }`
  - Interface: `TeamSchedule { id, employeeId, employeeName, weekSchedule: ShiftDay[] }`
  - Interface: `LeaveDocument { id, employeeId, employeeName, leaveType, startDate, endDate, days, status, hasDocument, documentUrl }`
  - Mock data: 5-8 team members with realistic Thai names, 14 days of time records, 5 OT records, schedules, 4 leave documents
  - Functions: `updateTimeRecord`, `updateOTRecord`, `updateSchedule`, `viewLeaveDocument`
  - Filters: by employee, date range, status
- Create `src/frontend/src/hooks/use-hrbp-reports.ts`:
  - Interface: `AttendanceReport { period, department, headcount, avgAttendanceRate, lateRate, absentRate, totalWorkHours, totalOTHours }`
  - Interface: `LeaveReport { period, department, leaveType, totalDays, employeeCount, utilizationRate }`
  - Interface: `OvertimeReport { period, department, totalHours, totalAmount, employeeCount, avgHoursPerPerson }`
  - Mock data: Monthly reports for 3 departments across 3 months
  - Summary metrics: company-wide attendance rate, leave utilization, OT cost trend
- Create `src/frontend/src/hooks/use-geofencing.ts`:
  - Interface: `GeofenceZone { id, name, latitude, longitude, radius, address, isActive, assignedEmployeeCount }`
  - Mock data: 3 zones (HQ Bangkok, Branch Chiang Mai, Branch Phuket) with realistic coordinates
  - Functions: `addZone`, `updateZone`, `deleteZone`, `toggleZoneActive`
- Create `src/frontend/src/hooks/use-workflow-config.ts`:
  - Interface: `WorkflowTemplate { id, name, type: WorkflowType, isActive, steps: WorkflowStepTemplate[] }`
  - Interface: `WorkflowStepTemplate { step, approverRole: Role | 'direct_manager' | 'hrbp', condition?, isRequired }`
  - Mock templates: leave (2-step: manager -> HR), leave_with_document (2-step: manager -> HRBP), overtime (2-step: manager -> HR), time_correction (1-step: manager), transfer (3-step)
  - Functions: `updateTemplate`, `addStep`, `removeStep`, `toggleTemplateActive`
- Extend `src/frontend/src/hooks/use-workflows.ts`:
  - Add `'time_correction'` to `WorkflowType` union
  - Add mock time_correction workflow item to MOCK_WORKFLOWS

### 3. SPD Management Page
- **Task ID**: build-spd-page
- **Depends On**: foundation-hooks
- **Assigned To**: builder-spd
- **Agent Type**: builder
- **Parallel**: true (can run alongside tasks 4, 5, 6)
- Create `src/frontend/src/components/spd/spd-management-page.tsx`:
  - Page header: "Team Data Management" with subtitle
  - 4 Tabs: Time Records, OT Records, Schedules, Leave Documents
  - **Time Records tab**:
    - Date range filter + employee dropdown
    - Table: Employee | Date | Shift | Clock In | Clock Out | Work Hours | OT | Status | Actions
    - Inline edit: click edit icon -> fields become editable inputs -> save/cancel
    - Color-code late clock-ins (red), early departures (amber)
    - Responsive: card list on mobile, table on desktop
  - **OT Records tab**:
    - Filter by employee, date range, status
    - Table: Employee | Date | Time Range | Hours | Type | Amount | Status | Actions
    - Edit modal for adjusting OT hours
  - **Schedules tab**:
    - Employee list with their weekly schedule grid
    - Edit mode: select shift template per day, save bulk changes
    - Visual: color-coded shift blocks
  - **Leave Documents tab**:
    - List of leave requests that have attached documents
    - View/download document button
    - Status: Pending Review | Reviewed | Requires Resubmission
    - Quick approve/reject action for document verification
  - Follow existing design patterns: use Card, CardHeader, CardContent, Badge, Button, Tabs, FormField, Modal
  - Padding: use `p-5 sm:p-6 lg:p-8` pattern for CardContent

### 4. HRBP Reports Page
- **Task ID**: build-hrbp-page
- **Depends On**: foundation-hooks
- **Assigned To**: builder-hrbp
- **Agent Type**: builder
- **Parallel**: true
- Create `src/frontend/src/components/hrbp/hrbp-reports-page.tsx`:
  - Page header: "HRBP Reports" with subtitle
  - 4 summary metric cards at top: Avg Attendance Rate, Late Rate, Leave Utilization, Monthly OT Cost
  - Department filter dropdown
  - 4 Tabs: Attendance, Leave, Overtime, Summary
  - **Attendance tab**:
    - Monthly trend display (text-based, no charts - just table/card format)
    - Table: Month | Headcount | Attendance Rate | Late Rate | Absent Rate | Total Work Hours
    - Department comparison cards
  - **Leave tab**:
    - Leave utilization by type (annual, sick, personal, etc.)
    - Table: Leave Type | Total Days Used | Employee Count | Utilization Rate
    - Department breakdown
  - **Overtime tab**:
    - Monthly OT summary
    - Table: Month | Total Hours | Total Amount | Employee Count | Avg Hours/Person
    - By type breakdown (weekday, weekend, holiday)
  - **Summary tab**:
    - Executive summary with key metrics
    - Compliance indicators (e.g., OT limit warnings)
    - Headcount by department
  - Use existing component patterns, responsive design, consistent padding

### 5. Admin Geofencing Configuration
- **Task ID**: build-geofencing-config
- **Depends On**: foundation-hooks
- **Assigned To**: builder-admin
- **Agent Type**: builder
- **Parallel**: true
- Create `src/frontend/src/components/settings/geofencing-config.tsx`:
  - Renders within the existing Settings page as a new tab
  - Zone list with cards: Zone Name | Address | Radius | Status (Active/Inactive) | Employee Count
  - Add New Zone button -> Modal with form:
    - Zone Name (text)
    - Address (text)
    - Latitude (number input)
    - Longitude (number input)
    - Radius in meters (number input, default 200)
    - Active toggle
  - Edit zone: same modal pre-filled
  - Delete zone: confirmation dialog
  - Toggle active/inactive status per zone
  - Show assigned employee count per zone
  - Responsive: stack cards vertically on mobile

### 6. Admin Workflow Configuration
- **Task ID**: build-workflow-config
- **Depends On**: foundation-hooks
- **Assigned To**: builder-admin
- **Agent Type**: builder
- **Parallel**: true (same builder as task 5, but sequential after it)
- Create `src/frontend/src/components/settings/workflow-config.tsx`:
  - Renders within the existing Settings page as a new tab
  - Template list: one card per workflow type (Leave, Leave with Document, Overtime, Time Correction, Transfer, Resignation)
  - Each template card shows:
    - Workflow name and type
    - Active/Inactive toggle
    - Step list: Step 1: Direct Manager -> Step 2: HR Admin -> etc.
    - Visual step flow with arrows
  - Edit template -> opens detail view:
    - Reorder steps (up/down buttons)
    - Add step: select approver role (Direct Manager, HRBP, HR Admin, HR Manager)
    - Remove step (if more than 1 step)
    - Set conditions per step (optional: "only if document attached", "only if > 3 days")
    - Save/Cancel buttons
  - Key template: "Leave with Document" must show 2-step: Direct Manager -> HRBP
  - Responsive design with consistent padding

### 7. Leave Cancel Enhancement
- **Task ID**: enhance-leave-cancel
- **Depends On**: foundation-hooks
- **Assigned To**: builder-leave-enhancement
- **Agent Type**: builder
- **Parallel**: true
- Modify `src/frontend/src/hooks/use-leave.ts`:
  - Add `cancelApprovedLeave(leaveId: string, reason: string)` function
  - This should create a new workflow item of type `'leave'` with description "Cancel Approved Leave"
  - The workflow goes through the approval chain defined in workflow config
- Modify `src/frontend/src/components/leave/leave-history.tsx`:
  - For leaves with status `approved` and dates in current/future period:
    - Show "Cancel" button (different from pending cancel)
    - On click: show modal asking for cancellation reason
    - Submit creates a workflow and shows toast "Cancellation request submitted for approval"
  - For leaves with status `pending`:
    - Keep existing instant cancel behavior
  - Add visual distinction between "Cancel Request" (pending) and "Request Cancellation" (approved)

### 8. Route & Navigation Integration
- **Task ID**: integration-routes-nav
- **Depends On**: build-spd-page, build-hrbp-page, build-geofencing-config, build-workflow-config, enhance-leave-cancel
- **Assigned To**: builder-integration
- **Agent Type**: builder
- **Parallel**: false (must wait for all features)
- Create route pages:
  - `src/frontend/src/app/[locale]/spd-management/page.tsx` - wraps SPDManagementPage in PageLayout with module="spd-management"
  - `src/frontend/src/app/[locale]/hrbp-reports/page.tsx` - wraps HRBPReportsPage in PageLayout with module="hrbp-reports"
- Update Settings page (`src/frontend/src/app/[locale]/settings/page.tsx`):
  - Add "Geofencing" tab that renders `<GeofencingConfig />`
  - Add "Workflow Config" tab that renders `<WorkflowConfig />`
- Update sidebar navigation (`src/frontend/src/components/shared/sidebar.tsx`):
  - Under "Organization" section: add "Team Data (SPD)" link to `/spd-management`
  - Under "Organization" section: add "HRBP Reports" link to `/hrbp-reports`
- Verify RBAC gates work correctly:
  - SPD page: accessible by manager, hr_admin, hr_manager
  - HRBP Reports: accessible by hr_admin, hr_manager
  - Settings tabs (Geofencing, Workflow): accessible by hr_admin, hr_manager (already gated by Settings page)

### 9. Final Validation
- **Task ID**: validate-all
- **Depends On**: integration-routes-nav
- **Assigned To**: validator-final
- **Agent Type**: validator
- **Parallel**: false
- Run TypeScript compilation: `cd src/frontend && npx tsc --noEmit`
- Verify all new pages load without errors at:
  - `http://localhost:3002/en/spd-management`
  - `http://localhost:3002/en/hrbp-reports`
  - `http://localhost:3002/en/settings` (check Geofencing and Workflow Config tabs)
  - `http://localhost:3002/en/leave` (check cancel approved leave flow)
- Verify RBAC: pages should show "Access Denied" for unauthorized roles
- Verify i18n: switch to Thai locale and confirm all new text is translated
- Check responsive design: desktop (1920px) and mobile (375px) viewports
- Verify no hardcoded `p-3`, `p-4`, or `p-6` without responsive variants on any new CardContent
- Run `grep -r 'CardContent className="p-[2-6]"' src/frontend/src/components/` to catch any violations

## Acceptance Criteria
- [ ] SPD Management page renders with 4 tabs (Time Records, OT Records, Schedules, Leave Documents)
- [ ] SPD page has inline edit functionality for time records and OT
- [ ] SPD page shows schedule grid with edit capability
- [ ] SPD page shows leave documents with view action
- [ ] HRBP Reports page renders with 4 tabs (Attendance, Leave, Overtime, Summary)
- [ ] HRBP Reports shows summary metric cards with department filter
- [ ] Settings page has Geofencing tab with zone CRUD (add, edit, delete, toggle)
- [ ] Settings page has Workflow Config tab showing all workflow templates
- [ ] Workflow Config allows editing step order and approver roles
- [ ] "Leave with Document" template shows 2-step: Direct Manager -> HRBP
- [ ] Leave history shows "Request Cancellation" button for approved future leaves
- [ ] Cancel approved leave creates a workflow for approval
- [ ] All new pages have proper RBAC gating
- [ ] All new text has both English and Thai translations
- [ ] TypeScript compiles without errors
- [ ] Responsive design works on desktop and mobile
- [ ] All CardContent uses `p-5 sm:p-6 lg:p-8` pattern (no hardcoded single values)

## Validation Commands
Execute these commands to validate the task is complete:

- `cd /Users/tachongrak/Projects/hr/src/frontend && npx tsc --noEmit` - Verify TypeScript compilation
- `grep -rn 'CardContent className="p-[2-6]"' src/frontend/src/components/` - Check for padding violations (should return 0 results)
- `grep -c '"spd\.' messages/en.json` - Verify SPD i18n keys exist
- `grep -c '"hrbpReports\.' messages/en.json` - Verify HRBP i18n keys exist
- `grep -c '"geofencing\.' messages/en.json` - Verify geofencing i18n keys exist
- `grep -c '"workflowConfig\.' messages/en.json` - Verify workflow config i18n keys exist

## Notes
- All mock data should use realistic Thai names and Bangkok-area locations
- Follow existing code patterns: IIFE-free, React hooks, `useTranslations()` for all user-facing text
- Use the existing Card component with responsive padding `p-5 sm:p-6 lg:p-8`
- The SPD page is essentially a "team view" version of the employee time page - reuse patterns from time-page.tsx
- HRBP reports are read-only analytics - no data modification, just aggregated views
- Geofencing config stores zone coordinates - actual GPS validation happens on the backend (mock for now)
- Workflow config is a template editor - actual workflow routing logic stays in use-workflows.ts
- The 2-step approval for document leaves is the most complex integration: when a leave has `hasDocument: true`, the workflow template switches from "Leave" to "Leave with Document" which includes HRBP step
- No external libraries needed - all features can be built with existing UI components

# Chore: Implement Leave Request Functionality for Employee Self-Service

## Metadata
adw_id: `d68a4fd1`
prompt: `Implement Leave Request functionality for employee self-service. Reference: User Stories US-5ESS-007, US-5ESS-008, US-5ESS-009`

## Chore Description
Implement a complete leave request system for the employee self-service portal that allows employees to:
- View their leave balances by type (annual, sick, personal, maternity, paternity, ordination, military, compensatory)
- Submit leave requests with date ranges, half-day options, reasons, and attachments
- See validation warnings for low balances and over-limit requests
- View leave history and pending requests
- Access a monthly calendar view showing approved leaves with color coding
- Receive approval workflow notifications (manager approval for all, HR approval for >5 consecutive days)

The system must support Thai/English bilingual display with Buddhist Era (BE) date formatting, integrate with the existing workflow engine, and follow established component patterns.

## Relevant Files
Use these files to complete the chore:

### Existing Files to Modify
- `apps/js/app.js` - Add route registration for `#/leave` and `#/leave/request`
- `apps/js/data/mock-employee.js` - Add `leaveBalances` and `leaveRequests` data structures
- `apps/locales/en.json` - Add leave-related translation keys
- `apps/locales/th.json` - Add leave-related Thai translations
- `apps/js/components/header.js` - Add "Leave" navigation link in Employee Files dropdown
- `apps/js/workflow/rules.js` - Add leave request workflow rules

### New Files to Create
- `apps/js/pages/leave-request.js` - Main leave page with balance cards, request form, and history
- `apps/js/components/calendar.js` - Monthly calendar component for leave visualization

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Data for Leave System
- Add `leaveBalances` object to `MockEmployeeData` in `apps/js/data/mock-employee.js`:
  - Define 8 leave types with Thai names: annual (วันลาพักร้อน), sick (วันลาป่วย), personal (วันลากิจ), maternity (วันลาคลอดบุตร), paternity (วันลาดูแลบุตร), ordination (วันลาบวช), military (วันลาทหาร), compensatory (วันหยุดชดเชย)
  - Include `entitled`, `used`, `pending`, `remaining` for each type
  - Add entitlement rules: sick=30 days, personal=3 days, maternity=98 days, paternity=15 days, ordination=15 days
- Add `leaveRequests` array with sample requests containing: id, employeeId, type, startDate, endDate, days, halfDay (null/morning/afternoon), reason, substitutePersonId, attachments, status, approvedBy, approvedDate
- Add `leaveTypes` lookup array to `MockLookupData` in `apps/js/data/mock-lookups.js`

### 2. Add i18n Translations for Leave System
- Add English translations in `apps/locales/en.json`:
  - `leave.title`, `leave.balances`, `leave.request`, `leave.history`, `leave.calendar`
  - `leave.type.annual`, `leave.type.sick`, `leave.type.personal`, `leave.type.maternity`, `leave.type.paternity`, `leave.type.ordination`, `leave.type.military`, `leave.type.compensatory`
  - `leave.startDate`, `leave.endDate`, `leave.duration`, `leave.halfDay`, `leave.morning`, `leave.afternoon`, `leave.reason`, `leave.substitute`, `leave.attachment`, `leave.medicalCert`
  - `leave.status.pending`, `leave.status.approved`, `leave.status.rejected`
  - `leave.warning.lowBalance`, `leave.warning.exceedsBalance`, `leave.warning.hrApprovalRequired`
  - `leave.submit`, `leave.cancel`, `leave.remaining`, `leave.entitled`, `leave.used`, `leave.days`
- Add Thai translations in `apps/locales/th.json` with corresponding keys

### 3. Create Calendar Component
- Create `apps/js/components/calendar.js` with module pattern:
  - `render(options)` - Render monthly calendar view with leave events
  - `renderHeader(year, month)` - Month navigation with previous/next buttons
  - `renderDays(year, month, events)` - Grid of days with color-coded leave events
  - `getLeaveColor(leaveType)` - Return CSS class for leave type coloring
  - Define color scheme: annual=blue, sick=orange, personal=purple, maternity=pink, paternity=teal, ordination=amber, military=gray, compensatory=green
  - Support click-to-request on empty dates
  - Handle Buddhist Era year display in Thai mode
  - Export as `CalendarComponent`

### 4. Create Leave Request Page
- Create `apps/js/pages/leave-request.js` with module pattern:
  - `render(params)` - Main page render with conditional view (balance/request/history/calendar)
  - `init(params)` - Initialize page state and load data
  - `renderBalanceCards()` - Card grid showing balance by leave type with visual progress bars, warning indicators for <3 days remaining
  - `renderLeaveRequestForm()` - Form with:
    - Leave type dropdown (required)
    - Start date picker (required, Buddhist Era support)
    - End date picker (required, auto-calculate duration)
    - Half-day radio buttons (morning/afternoon, optional)
    - Duration display (auto-calculated, read-only)
    - Reason textarea (required)
    - Substitute person selection (optional, search from team members)
    - Attachment upload (required for sick leave with medical certificate)
  - `calculateDuration(startDate, endDate, halfDay)` - Calculate working days, exclude weekends
  - `validateLeaveRequest(data)` - Validate balance, dates, required fields
  - `submitLeaveRequest(data)` - Submit via API, trigger workflow
  - `renderLeaveHistory()` - DataTable showing past requests with status badges
  - `renderCalendarView()` - Monthly calendar with team leaves for managers
  - `showLeaveDetails(requestId)` - Modal with full request details
  - Export as `LeaveRequestPage`

### 5. Add API Methods for Leave System
- Add methods to `apps/js/api.js`:
  - `getLeaveBalances(employeeId)` - Return leave balances
  - `getLeaveRequests(employeeId, options)` - Return leave requests with filtering
  - `getTeamLeaves(managerId, options)` - Return team leave calendar data
  - `submitLeaveRequest(employeeId, data)` - Submit new leave request
  - `cancelLeaveRequest(employeeId, requestId)` - Cancel pending request
  - `approveLeaveRequest(requestId, data)` - Approve leave request (manager)
  - `rejectLeaveRequest(requestId, data)` - Reject leave request

### 6. Add Workflow Rules for Leave Approval
- Modify `apps/js/workflow/rules.js`:
  - Add `leave_request` change type
  - Configure approval chain: Manager approval for all leave types
  - Add HR approval requirement for extended leave (>5 consecutive working days)
  - Add validation rules for balance checking

### 7. Register Routes and Navigation
- Modify `apps/js/app.js` to register routes:
  - `leave` - Main leave page (balances view)
  - `leave/:view` - Leave page with view parameter (request/history/calendar)
- Modify `apps/js/components/header.js`:
  - Add "Leave Request" link under Employee Files dropdown menu
- Modify `apps/js/components/mobile-menu.js` (if needed):
  - Add leave link to mobile navigation

### 8. Add Leave-Related Notifications
- Modify `apps/js/workflow/notifications.js`:
  - Add `notifyLeaveRequest(request)` - Notify manager of new leave request
  - Add `notifyLeaveApproval(request)` - Notify employee of approval
  - Add `notifyLeaveRejection(request)` - Notify employee of rejection
  - Add notification types to bell dropdown

### 9. Validate and Test Implementation
- Verify all 8 leave types display with correct Thai/English names
- Test balance card display with warning states
- Test leave request form validation:
  - Required fields validation
  - Date range validation (end >= start)
  - Balance validation (cannot exceed remaining)
  - Medical certificate required for sick leave
- Test half-day option duration calculation
- Test calendar component navigation and date click
- Test workflow submission and approval flow
- Verify Thai Buddhist Era date formatting
- Test manager view for team calendar

## Validation Commands
Execute these commands to validate the chore is complete:

- `python -m http.server 8080 -d apps` - Start development server
- Navigate to `http://localhost:8080/#/leave` - Verify leave page loads
- Check browser console for JavaScript errors
- Test language toggle (EN/TH) for all leave-related text
- Submit test leave request and verify workflow creation
- Check notification bell for leave request notification
- Navigate to `http://localhost:8080/#/leave/calendar` - Verify calendar view

## Notes

### Leave Type Entitlements (Thai Labor Law compliant)
| Type | Thai Name | Annual Entitlement | Notes |
|------|-----------|-------------------|-------|
| Annual | วันลาพักร้อน | Based on tenure | Accrued based on years of service |
| Sick | วันลาป่วย | 30 days | Medical certificate for 3+ days |
| Personal | วันลากิจ | 3 days | Personal business leave |
| Maternity | วันลาคลอดบุตร | 98 days | Female employees only |
| Paternity | วันลาดูแลบุตร | 15 days | Male employees only |
| Ordination | วันลาบวช | 15 days | Male employees only |
| Military | วันลาทหาร | As required | Thai male citizens only |
| Compensatory | วันหยุดชดเชย | Earned from OT | Expires end of year |

### Color Scheme for Calendar
- Annual Leave: `bg-blue-100 text-blue-800`
- Sick Leave: `bg-orange-100 text-orange-800`
- Personal Leave: `bg-purple-100 text-purple-800`
- Maternity Leave: `bg-pink-100 text-pink-800`
- Paternity Leave: `bg-teal-100 text-teal-800`
- Ordination Leave: `bg-amber-100 text-amber-800`
- Military Leave: `bg-gray-100 text-gray-800`
- Compensatory Leave: `bg-green-100 text-green-800`

### Integration Points
- Uses existing `FormFieldComponent` for form fields
- Uses existing `ModalComponent` for dialogs
- Uses existing `ToastComponent` for notifications
- Uses existing `DataTableComponent` for leave history
- Integrates with `WorkflowEngine` for approval flow
- Integrates with `RBAC` for permission checks (manager sees team calendar)
- Uses `DateUtils` for Buddhist Era formatting

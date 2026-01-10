# Feature: Employee Information Module

## Metadata
adw_id: `4g6ymsf7`
prompt: `Implement the Employee Information Module for Central Group HR System based on the PRD at docs/prd.md. This includes: 1) Profile Dashboard with employee photo, name, title, quick stats 2) Personal Information Management with CRUD for personal info, contacts, addresses, emergency contacts, dependents 3) Employment Information view (org chart, job details, organization info) 4) Compensation section (payment info, payroll, payslips) 5) Benefits overview 6) Workflow Engine with multi-level approvals, configurable rules, auto-routing, notifications 7) Tech stack: Tailwind CSS, Material Icons, Vanilla JS. Support Thai/English, RBAC, responsive design.`

## Feature Description
The Employee Information Module is a comprehensive self-service HR system for Central Group (SuccessFactors) that enables employees to view and manage their personal data, employment information, compensation, and benefits. The system includes a robust workflow approval engine for data change requests, supporting multiple user roles (Employee, Manager, HR Admin, HR Manager) with role-based access control.

**Key Business Objectives:**
- Reduce HR Admin workload by 60%
- Achieve 95% data accuracy
- Reduce data update time from 3-5 days to 1 day
- Improve employee satisfaction in accessing their own data

## User Story
As an **employee of Central Group**
I want to **view and manage my personal information, employment details, compensation, and benefits through a self-service portal**
So that **I can keep my information accurate, track my career progression, and submit change requests without relying on HR for routine updates**

## Problem Statement
Currently, employees must contact HR Admin for any information updates, leading to:
- Long processing times (3-5 days per request)
- High HR administrative burden
- Data accuracy issues due to manual processing
- Employee frustration with lack of self-service access
- No visibility into pending request status

## Solution Statement
Build a modern web-based Employee Information Module with:
1. **Profile Dashboard** - Central hub displaying employee information with quick actions
2. **Personal Information Management** - Self-service CRUD operations for personal data
3. **Employment Information View** - Read-only display of job, organization, and org chart
4. **Compensation & Benefits** - View payment info, download payslips, see benefit enrollments
5. **Workflow Engine** - Multi-level approval system with auto-routing and notifications
6. **Thai/English Support** - Bilingual interface for all data fields
7. **Responsive Design** - Works on desktop, tablet, and mobile devices

## Relevant Files
Use these files to implement the feature:

- `docs/prd.md` - Complete Product Requirements Document with data models, wireframes, and specifications

### New Files

#### Application Structure (`apps/`)
- `apps/index.html` - Main entry point with full page structure
- `apps/css/styles.css` - Custom styles extending Tailwind
- `apps/js/app.js` - Main application initialization
- `apps/js/router.js` - Client-side routing for SPA navigation
- `apps/js/state.js` - Global state management
- `apps/js/api.js` - API client for backend communication
- `apps/js/i18n.js` - Internationalization (Thai/English)

#### Components (`apps/js/components/`)
- `apps/js/components/header.js` - Main navigation header with search
- `apps/js/components/profile-header.js` - Profile banner with photo, name, actions
- `apps/js/components/tabs.js` - Tab navigation component
- `apps/js/components/card.js` - Reusable card component with edit/history actions
- `apps/js/components/modal.js` - Modal dialog for edit forms
- `apps/js/components/form-field.js` - Form input components
- `apps/js/components/data-table.js` - Table for displaying lists
- `apps/js/components/org-chart.js` - Interactive organization chart
- `apps/js/components/notification-bell.js` - Notification indicator
- `apps/js/components/toast.js` - Toast notifications

#### Pages (`apps/js/pages/`)
- `apps/js/pages/home.js` - Home page with quick actions
- `apps/js/pages/profile.js` - Main profile page container
- `apps/js/pages/personal-info.js` - Personal information tab
- `apps/js/pages/employment.js` - Employment information tab
- `apps/js/pages/compensation.js` - Compensation tab
- `apps/js/pages/benefits.js` - Benefits tab
- `apps/js/pages/profile-details.js` - Profile/Scorecard tab
- `apps/js/pages/workflows.js` - Pending workflows page

#### Data & Mock API (`apps/js/data/`)
- `apps/js/data/mock-employee.js` - Mock employee data
- `apps/js/data/mock-lookups.js` - Lookup tables (countries, provinces, etc.)
- `apps/js/data/mock-workflows.js` - Mock workflow data

#### Workflow Engine (`apps/js/workflow/`)
- `apps/js/workflow/engine.js` - Workflow processing engine
- `apps/js/workflow/rules.js` - Approval rule configuration
- `apps/js/workflow/notifications.js` - Notification system

#### Utilities (`apps/js/utils/`)
- `apps/js/utils/date.js` - Date formatting utilities
- `apps/js/utils/validation.js` - Form validation
- `apps/js/utils/mask.js` - Data masking (bank accounts, IDs)
- `apps/js/utils/rbac.js` - Role-based access control

#### Localization (`apps/locales/`)
- `apps/locales/en.json` - English translations
- `apps/locales/th.json` - Thai translations

## Implementation Plan

### Phase 1: Foundation
Set up the core application structure, build system, and foundational components:
- Create project scaffolding with proper directory structure
- Set up Tailwind CSS configuration
- Implement state management and routing
- Create reusable UI components (card, modal, form fields)
- Set up internationalization (i18n) framework
- Implement RBAC utility

### Phase 2: Core Implementation
Build the main features and pages:
- **Profile Dashboard**: Header, tabs, profile banner
- **Personal Information**: All sub-sections with CRUD
- **Employment Information**: View-only sections with org chart
- **Compensation**: Payment info, payroll display
- **Benefits**: Benefits overview

### Phase 3: Integration
Connect all pieces and add advanced features:
- **Workflow Engine**: Approval process, routing, notifications
- **History Tracking**: View change history for all sections
- **Validation**: Form validation with Thai/English error messages
- **Responsive Design**: Mobile and tablet optimizations
- **Accessibility**: WCAG 2.1 AA compliance

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Project Setup and Scaffolding
- Create `apps/` directory structure
- Create `index.html` with CDN dependencies (Tailwind, Material Icons, Google Fonts)
- Create basic CSS file for custom styles
- Set up Tailwind configuration for custom colors (Central Group red: #C8102E)

### 2. Core JavaScript Infrastructure
- Implement `apps/js/state.js` - Simple state management with pub/sub
- Implement `apps/js/router.js` - Hash-based client-side routing
- Implement `apps/js/api.js` - Mock API client with simulated delays
- Implement `apps/js/app.js` - Application initialization

### 3. Internationalization Setup
- Create `apps/locales/en.json` with all English strings
- Create `apps/locales/th.json` with all Thai strings
- Implement `apps/js/i18n.js` - Language switching and translation lookup

### 4. Mock Data Setup
- Create `apps/js/data/mock-employee.js` with sample employee data matching PRD schema
- Create `apps/js/data/mock-lookups.js` with reference data (countries, provinces, salutations)
- Create `apps/js/data/mock-workflows.js` with sample pending workflows

### 5. Utility Functions
- Implement `apps/js/utils/date.js` - Format dates in Thai/English
- Implement `apps/js/utils/validation.js` - Form field validation rules
- Implement `apps/js/utils/mask.js` - Mask sensitive data (bank accounts, national ID)
- Implement `apps/js/utils/rbac.js` - Permission checking based on user role

### 6. Base UI Components
- Implement `apps/js/components/card.js` - Section card with title, edit button, history button
- Implement `apps/js/components/modal.js` - Modal dialog with backdrop, close on escape
- Implement `apps/js/components/form-field.js` - Input, select, date picker, file upload
- Implement `apps/js/components/toast.js` - Success/error toast notifications
- Implement `apps/js/components/data-table.js` - Sortable, paginated table

### 7. Header and Navigation
- Implement `apps/js/components/header.js` - Top navigation with logo, search, icons
- Implement `apps/js/components/notification-bell.js` - Bell icon with badge count
- Implement `apps/js/components/tabs.js` - Tab navigation for profile sections

### 8. Profile Header Component
- Implement `apps/js/components/profile-header.js` - Photo, name, title, employee ID
- Add action buttons (Actions dropdown, Header edit, As of Date selector)
- Style with gradient background per PRD wireframe

### 9. Home Page
- Implement `apps/js/pages/home.js` - Quick Actions grid
- Add "View My Profile", "Manage My Data", "View Pending Workflows" cards
- Add "For You Today" section with relevant items
- Add "Team Summary" section for managers

### 10. Personal Information Tab
- Implement `apps/js/pages/personal-info.js` - Container for all sub-sections
- Create Personal Information section with name fields (EN/TH), gender, DOB, nationality
- Create Contact Information section with emails and phone numbers
- Create Address Information section with permanent/current address
- Create Emergency Contacts section with CRUD for contacts
- Create Dependents section with CRUD for dependents
- Add "Show More" expandable sections

### 11. Personal Information Edit Modals
- Create edit modal for Personal Information with effective date
- Create edit modal for Contact Information (self-service, no approval)
- Create edit modal for Address Information with file attachment
- Create edit modal for Emergency Contacts (self-service)
- Create add/edit modal for Dependents

### 12. Employment Information Tab
- Implement `apps/js/pages/employment.js` - Container for employment sections
- Create Employment Details section (hire date, service years, probation)
- Create Organization Information section (company, position, business unit)
- Create Job Information section (status, supervisor, job family)
- All sections read-only for employees

### 13. Organization Chart Component
- Implement `apps/js/components/org-chart.js` - Interactive tree visualization
- Show supervisor hierarchy (2 levels up)
- Show direct reports (for managers)
- Click to navigate to team member profiles

### 14. Compensation Tab
- Implement `apps/js/pages/compensation.js` - Container for compensation sections
- Create Payment Information section (bank, masked account number)
- Create Payroll Information section (gross amount summary)
- Add download button for payslips (PDF)
- Add download button for tax documents

### 15. Benefits Tab
- Implement `apps/js/pages/benefits.js` - Benefits overview
- Display active benefit enrollments
- Show enrollment dates and coverage details

### 16. Profile Details Tab
- Implement `apps/js/pages/profile-details.js` - Extended profile information
- Create sections for: Education, Previous Employment, Language Skills
- Create sections for: Certifications, Awards, Mobility preferences

### 17. Workflow Engine Core
- Implement `apps/js/workflow/engine.js` - Process workflow submissions
- Handle create, approve, reject, send-back actions
- Update request status and notify stakeholders

### 18. Workflow Rules Configuration
- Implement `apps/js/workflow/rules.js` - Define approval rules
- Configure rules by change type (self-service vs approval required)
- Configure approver routing by organization/role

### 19. Workflow Notifications
- Implement `apps/js/workflow/notifications.js` - In-app notifications
- Add bell icon badge for pending items
- Show notification dropdown with recent items
- Mark notifications as read

### 20. Pending Workflows Page
- Implement `apps/js/pages/workflows.js` - Workflow management page
- Create tabs: "For Approval", "Sent Back", "Approved", "Reassigned"
- Display workflow details with approve/reject actions for managers
- Show request history and comments

### 21. History Tracking
- Add history modal component showing change timeline
- Display old value vs new value
- Show who made the change and when
- Filter by date range

### 22. Form Validation
- Add client-side validation for all edit forms
- Display validation errors in Thai/English
- Validate required fields, email format, phone format
- Validate date ranges (effective date must be future)

### 23. Responsive Design
- Add mobile breakpoints for all components
- Create hamburger menu for mobile navigation
- Stack form fields vertically on mobile
- Ensure touch-friendly tap targets (min 44px)

### 24. Accessibility Enhancements
- Add ARIA labels to all interactive elements
- Ensure keyboard navigation works
- Add focus indicators for all focusable elements
- Test with screen reader

### 25. Final Integration and Polish
- Connect all pages through router
- Test complete user flows
- Add loading states and error handling
- Performance optimization (lazy loading, debouncing)

## Testing Strategy

### Unit Tests
- Test state management (state.js) - subscribe, update, reset
- Test router (router.js) - navigation, route matching, history
- Test i18n (i18n.js) - translation lookup, language switching
- Test validation (validation.js) - all validation rules
- Test masking (mask.js) - bank account, national ID masking
- Test RBAC (rbac.js) - permission checks for all roles

### Edge Cases
- Empty data states (no dependents, no emergency contacts)
- Long names that might overflow UI elements
- Thai character display and sorting
- Date handling across timezones
- Session timeout during form editing
- Network errors during API calls
- Concurrent edits by multiple users
- Large file uploads (attachment limit testing)
- Browser back/forward navigation
- Mobile touch gestures

## Acceptance Criteria
- [ ] Employee can view their complete profile (personal, employment, compensation, benefits)
- [ ] Employee can edit allowed fields (contact info, emergency contacts, address)
- [ ] Edit forms show effective date picker
- [ ] Changes requiring approval create workflow requests
- [ ] Manager can view pending approval requests
- [ ] Manager can approve/reject/send-back requests
- [ ] Employee receives notification when request is processed
- [ ] All data displays correctly in both Thai and English
- [ ] UI is responsive on desktop (1920px), tablet (768px), and mobile (375px)
- [ ] Sensitive data is masked (bank account, national ID)
- [ ] History shows all changes with timestamps
- [ ] Page load time is under 2 seconds
- [ ] All forms validate input before submission
- [ ] Keyboard navigation works throughout the application
- [ ] ARIA labels present for screen readers

## Validation Commands
Execute these commands to validate the feature is complete:

- `open apps/index.html` - Open the application in browser
- `npx serve apps` - Serve the application locally for testing
- Test responsive design using browser dev tools (Toggle device toolbar)
- Run Lighthouse audit for accessibility score (target: 90+)
- Test in Chrome, Firefox, Safari, Edge (latest 2 versions)
- Test Thai language by clicking language toggle

## Notes

### Technical Decisions
- **No build step required**: Using CDN for Tailwind, Material Icons to simplify deployment
- **Vanilla JS**: No framework dependency, keeping bundle size minimal
- **Hash-based routing**: Works without server configuration
- **Mock API**: Simulates real backend with realistic delays for UX testing

### Future Considerations
- Backend API integration when available
- Azure AD SSO integration
- Real-time notifications via WebSocket
- Offline support with Service Workers
- PDF generation for payslips (server-side)
- Export to Excel functionality

### Dependencies (CDN)
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Material Icons -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Google Fonts - Roboto -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

<!-- Optional: Noto Sans Thai for Thai text -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### Color Palette (Central Group Branding)
- Primary Red: `#C8102E`
- Dark Gray: `#333333`
- Light Gray: `#F5F5F5`
- Success Green: `#28A745`
- Warning Yellow: `#FFC107`
- Error Red: `#DC3545`
- Info Blue: `#17A2B8`

# Plan: Session Management, Error Handling & Input Validation Hardening

## Task Description
Harden the HRMP App's error handling, session management, and input validation layers. The current Vanilla JS SPA prototype has foundational implementations in `api.js` (session timeout), `error-boundary.js` (global error catching), `connection-status.js` (offline detection), `validation.js` (form rules), and `rbac.js` (role permissions). This plan audits these systems for gaps, adds missing capabilities per the PRD NFRs (Section 10.2 Security, 10.1 Performance), and produces a security-hardened, testable result with severity-rated issue reports.

## Objective
Deliver production-ready error handling, session management, and input validation across all 29+ app modules — ensuring XSS prevention, CSRF-safe patterns, session timeout UX, comprehensive form validation, and graceful degradation. All changes must pass existing tests and new validation tests.

## Problem Statement
The current prototype has:
1. **Session management** partially implemented in `api.js` (30-min timeout, warning at 5 min) but no session warning modal UI, no "extend session" action, no secure session cleanup on expiry
2. **Error handling** via `ErrorBoundary` catches runtime errors but doesn't handle API-specific errors (4xx/5xx) gracefully, and `innerHTML` usage across 33+ files creates XSS surface area
3. **Input validation** in `ValidationUtils` covers basic rules but lacks sanitization (no HTML stripping), no CSRF token patterns, and no server-side validation simulation
4. **No centralized error reporting** — errors log to console only

## Solution Approach
1. **Session Management**: Build a session warning modal component, add "extend session" flow, implement secure logout on expiry, add session activity tracking via mouse/keyboard events
2. **Error Handling**: Create a centralized API error handler with user-friendly messages, audit and fix XSS-prone `innerHTML` usage, add error severity classification
3. **Input Validation**: Add HTML sanitization utility, enhance `ValidationUtils` with XSS prevention, add CSRF token simulation, add field-level sanitize-on-input
4. **Testing**: Write comprehensive tests covering session flows, error scenarios, validation rules, and XSS prevention

## Relevant Files
Use these files to complete the task:

- `apps/js/api.js` — Session timeout logic, API client, retry/loading wrappers. Needs session warning modal trigger, secure cleanup on expiry, CSRF token headers
- `apps/js/state.js` — AppState pub/sub. Already has `sessionExpiry`, `sessionExpired`, `showSessionWarning` keys
- `apps/js/utils/validation.js` — Form validation rules. Needs HTML sanitization, XSS prevention rules
- `apps/js/components/error-boundary.js` — Global error handler. Needs API error classification, severity ratings
- `apps/js/components/connection-status.js` — Offline detection. Reference pattern for session status component
- `apps/js/utils/rbac.js` — Role-based access control. May need permission checks on sensitive actions
- `apps/js/router.js` — Hash-based routing. Needs route guard for expired sessions
- `apps/js/app.js` — Bootstrap. Needs to initialize session monitor and new components
- `apps/js/components/modal.js` — Existing modal component. Reuse for session warning dialog
- `apps/js/components/toast.js` — Existing toast component. Use for error notifications
- `apps/locales/en.json` — English translations. Add session/error/validation keys
- `apps/locales/th.json` — Thai translations. Add session/error/validation keys
- `apps/index.html` — Script loading. Add new component scripts
- `tests/scripts/verification-test.js` — Existing test suite. Reference for test patterns

### New Files
- `apps/js/components/session-monitor.js` — Session warning modal, extend/logout actions, inactivity tracking
- `apps/js/utils/sanitize.js` — HTML sanitization utility (strip tags, escape entities, prevent XSS)
- `apps/js/utils/csrf.js` — CSRF token simulation (generate, attach to requests, validate)
- `tests/scripts/test-session-validation-security.js` — Comprehensive test suite for all changes

## Implementation Phases
### Phase 1: Foundation — Sanitization & CSRF utilities
- Create `sanitize.js` with HTML stripping, entity escaping, attribute sanitization
- Create `csrf.js` with token generation, storage, and request attachment
- Enhance `ValidationUtils` with sanitization integration
- Add i18n keys for new error/session messages

### Phase 2: Core Implementation — Session Monitor & Error Handling
- Build `session-monitor.js` component with warning modal, extend/logout, inactivity tracking
- Enhance `api.js` error handling with severity classification and user-friendly messages
- Audit and fix `innerHTML` XSS vectors in components and pages (33+ files)
- Add route guards for expired sessions in `router.js`

### Phase 3: Integration & Testing
- Register new components in `app.js` bootstrap
- Add script tags to `index.html`
- Write comprehensive tests
- Run all existing tests to verify no regressions
- Generate security audit report with severity ratings

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to to the building, validating, testing, deploying, and other tasks.
  - This is critical. You're job is to act as a high level director of the team, not a builder.
  - You're role is to validate all work is going well and make sure the team is on track to complete the plan.
  - You'll orchestrate this by using the Task* Tools to manage coordination between the team members.
  - Communication is paramount. You'll use the Task* Tools to communicate with the team members and ensure they're on track to complete the plan.
- Take note of the session id of each team member. This is how you'll reference them.

### Team Members

- Builder
  - Name: builder-security-utils
  - Role: Build sanitization, CSRF, and validation utilities (Phase 1)
  - Agent Type: general-purpose
  - Resume: true

- Builder
  - Name: builder-session-errors
  - Role: Build session monitor component and enhance error handling (Phase 2)
  - Agent Type: general-purpose
  - Resume: true

- Builder
  - Name: builder-xss-audit
  - Role: Audit and fix innerHTML XSS vectors across all 33+ files
  - Agent Type: general-purpose
  - Resume: true

- Builder
  - Name: builder-tests
  - Role: Write comprehensive test suite for session, validation, and security
  - Agent Type: general-purpose
  - Resume: true

- Validator
  - Name: validator-final
  - Role: Run all tests, verify acceptance criteria, generate severity-rated issue report
  - Agent Type: validator
  - Resume: false

## Step by Step Tasks

- IMPORTANT: Execute every step in order, top to bottom. Each task maps directly to a `TaskCreate` call.
- Before you start, run `TaskCreate` to create the initial task list that all team members can see and execute.

### 1. Create HTML Sanitization Utility
- **Task ID**: create-sanitize-util
- **Depends On**: none
- **Assigned To**: builder-security-utils
- **Agent Type**: general-purpose
- **Parallel**: true
- Create `apps/js/utils/sanitize.js` as an IIFE module (following codebase patterns)
- Implement `SanitizeUtils.stripTags(html)` — remove all HTML tags
- Implement `SanitizeUtils.escapeHtml(text)` — escape `<>&"'` entities
- Implement `SanitizeUtils.sanitizeAttribute(value)` — escape for HTML attribute context
- Implement `SanitizeUtils.sanitizeUrl(url)` — prevent `javascript:` and `data:` protocol injection
- Implement `SanitizeUtils.sanitizeInput(value)` — combined strip + escape for form inputs
- Add `module.exports` guard for test compatibility
- Add `<script>` tag to `apps/index.html` in the utils section (after validation.js)

### 2. Create CSRF Token Simulation
- **Task ID**: create-csrf-util
- **Depends On**: none
- **Assigned To**: builder-security-utils
- **Agent Type**: general-purpose
- **Parallel**: true (can run alongside task 1)
- Create `apps/js/utils/csrf.js` as an IIFE module
- Implement `CSRFUtils.generateToken()` — generate random token using `crypto.getRandomValues`
- Implement `CSRFUtils.getToken()` — retrieve or generate token stored in sessionStorage
- Implement `CSRFUtils.attachToRequest(headers)` — add `X-CSRF-Token` header
- Implement `CSRFUtils.validateToken(token)` — compare against stored token
- Integrate token attachment in `api.js` `withLoading` wrapper
- Add `<script>` tag to `apps/index.html` in utils section

### 3. Enhance ValidationUtils with Sanitization
- **Task ID**: enhance-validation
- **Depends On**: create-sanitize-util
- **Assigned To**: builder-security-utils
- **Agent Type**: general-purpose
- **Parallel**: false
- Add `sanitize` rule to `ValidationUtils` that calls `SanitizeUtils.sanitizeInput`
- Add `noHtml` rule that rejects values containing HTML tags
- Add `safeUrl` rule using `SanitizeUtils.sanitizeUrl`
- Update `getRulesForType` to include sanitization for text/longText/name types
- Add `sanitizeFormData(formData)` method that sanitizes all string values before validation

### 4. Add i18n Keys for Session/Error/Validation Messages
- **Task ID**: add-i18n-keys
- **Depends On**: none
- **Assigned To**: builder-session-errors
- **Agent Type**: general-purpose
- **Parallel**: true
- Add to `apps/locales/en.json`:
  - `session.warning` — "Your session will expire in {minutes} minutes"
  - `session.expired` — "Your session has expired"
  - `session.extend` — "Extend Session"
  - `session.logout` — "Log Out"
  - `session.extendedSuccess` — "Session extended successfully"
  - `session.expiredDescription` — "Please log in again to continue"
  - `error.apiError` — "An error occurred while processing your request"
  - `error.unauthorized` — "You are not authorized to perform this action"
  - `error.forbidden` — "Access denied"
  - `error.notFound` — "The requested resource was not found"
  - `error.serverError` — "Server error. Please try again later"
  - `error.rateLimited` — "Too many requests. Please wait a moment"
  - `error.validationFailed` — "Please correct the errors below"
  - `validation.noHtml` — "HTML tags are not allowed"
  - `validation.safeUrl` — "Invalid or unsafe URL"
  - `validation.bankAccount` — "Invalid bank account number"
- Add equivalent Thai translations to `apps/locales/th.json`

### 5. Build Session Monitor Component
- **Task ID**: build-session-monitor
- **Depends On**: add-i18n-keys
- **Assigned To**: builder-session-errors
- **Agent Type**: general-purpose
- **Parallel**: false
- Create `apps/js/components/session-monitor.js` as IIFE module
- Subscribe to `showSessionWarning` and `sessionExpired` AppState changes
- Implement warning modal (reuse Modal component pattern) showing countdown timer
- Implement "Extend Session" button that calls `API.extendSession()` (add to api.js)
- Implement "Log Out" button that clears session and redirects to login/home
- Track user inactivity via `mousemove`, `keydown`, `click`, `scroll` events (debounced)
- Auto-extend session on user activity (reset timer)
- On session expiry: clear sensitive data from AppState, show expired modal, disable navigation
- Add `<script>` tag to `apps/index.html` in components section
- Initialize in `app.js` bootstrap sequence

### 6. Enhance API Error Handling
- **Task ID**: enhance-api-errors
- **Depends On**: add-i18n-keys
- **Assigned To**: builder-session-errors
- **Agent Type**: general-purpose
- **Parallel**: true (can run alongside task 5)
- Add error severity classification to `api.js`:
  - **CRITICAL** (P0): Session expired, auth failures → immediate action required
  - **HIGH** (P1): Server errors (5xx), data corruption → show error page
  - **MEDIUM** (P2): Validation errors (4xx), rate limiting → show toast + inline error
  - **LOW** (P3): Network timeouts, retryable errors → auto-retry with notification
- Add `API.handleApiError(error, context)` method with severity-based routing
- Show appropriate UI per severity: toast, modal, error page, or inline
- Add audit logging for CRITICAL and HIGH severity errors
- Integrate with `ErrorBoundary` for consistent error presentation

### 7. Add Route Guards for Expired Sessions
- **Task ID**: add-route-guards
- **Depends On**: build-session-monitor
- **Assigned To**: builder-session-errors
- **Agent Type**: general-purpose
- **Parallel**: false
- Add `beforeNavigate` hook in `router.js` that checks `AppState.get('sessionExpired')`
- If session expired, redirect to session-expired view instead of requested route
- Allow navigation to public routes (home, error) even when expired
- Block navigation to protected routes (profile, workflows, payroll, etc.) when expired

### 8. Audit and Fix innerHTML XSS Vectors
- **Task ID**: fix-xss-vectors
- **Depends On**: create-sanitize-util
- **Assigned To**: builder-xss-audit
- **Agent Type**: general-purpose
- **Parallel**: true (independent of session work)
- Audit all 33+ files that use `innerHTML` for XSS vulnerability
- For each file, categorize usage:
  - **Safe**: Static HTML templates with no user data interpolation → no change needed
  - **Unsafe**: User data interpolated via template literals → must sanitize
- Fix unsafe usages by:
  - Wrapping user-supplied data with `SanitizeUtils.escapeHtml()` before interpolation
  - Using `textContent` instead of `innerHTML` where only text is needed
  - For complex cases, use DOM API (`createElement`, `setAttribute`, `appendChild`)
- Priority files (contain user data rendering):
  - `apps/js/pages/profile.js` — employee names, contact info
  - `apps/js/components/header.js` — user name display
  - `apps/js/components/notification-bell.js` — notification messages
  - `apps/js/components/data-table.js` — table cell contents
  - `apps/js/pages/workflows.js` — workflow descriptions
  - `apps/js/components/form-field.js` — field labels and error messages
  - `apps/js/components/modal.js` — modal content
- Generate a severity-rated report of all findings:
  - **CRITICAL**: User input directly in innerHTML without escaping
  - **HIGH**: Mock data (soon to be real data) in innerHTML without escaping
  - **MEDIUM**: Static strings concatenated in innerHTML (low risk but should fix)
  - **LOW**: innerHTML with only static HTML (no data interpolation)

### 9. Write Comprehensive Test Suite
- **Task ID**: write-tests
- **Depends On**: create-sanitize-util, create-csrf-util, enhance-validation, build-session-monitor, enhance-api-errors
- **Assigned To**: builder-tests
- **Agent Type**: general-purpose
- **Parallel**: false
- Create `tests/scripts/test-session-validation-security.js`
- Test categories:
  - **Sanitization Tests**: stripTags, escapeHtml, sanitizeUrl (javascript: protocol), sanitizeInput edge cases
  - **CSRF Tests**: token generation uniqueness, token persistence, token attachment to headers
  - **Validation Tests**: noHtml rule, safeUrl rule, sanitizeFormData, existing rules regression
  - **Session Tests**: warning trigger at 5 min threshold, extend session flow, expiry cleanup, activity tracking reset
  - **Error Handling Tests**: severity classification (P0-P3), API error message mapping, error state cleanup
  - **XSS Prevention Tests**: verify escapeHtml handles `<script>`, `onerror=`, `javascript:`, encoded entities
- Add npm script to `package.json` for running the new test suite
- Ensure all existing tests still pass

### 10. Final Validation & Security Report
- **Task ID**: validate-all
- **Depends On**: create-sanitize-util, create-csrf-util, enhance-validation, add-i18n-keys, build-session-monitor, enhance-api-errors, add-route-guards, fix-xss-vectors, write-tests
- **Assigned To**: validator-final
- **Agent Type**: validator
- **Parallel**: false
- Run all validation commands listed below
- Verify every acceptance criterion is met
- Generate security audit report with severity ratings for any remaining issues
- Report format: issue description, file, line, severity (CRITICAL/HIGH/MEDIUM/LOW), status (FIXED/REMAINING)

## Acceptance Criteria
- [ ] `SanitizeUtils` module exists with `stripTags`, `escapeHtml`, `sanitizeUrl`, `sanitizeInput` methods
- [ ] `CSRFUtils` module exists with `generateToken`, `getToken`, `attachToRequest` methods
- [ ] `ValidationUtils` has `noHtml`, `safeUrl` rules and `sanitizeFormData` method
- [ ] `SessionMonitor` component shows warning modal 5 minutes before session expiry
- [ ] "Extend Session" button resets the 30-minute timer
- [ ] Session expiry clears sensitive data from AppState and blocks protected navigation
- [ ] API errors are classified by severity (P0-P3) and routed to appropriate UI
- [ ] All `innerHTML` usages with user data are sanitized via `SanitizeUtils.escapeHtml()`
- [ ] i18n keys for session, error, and validation messages exist in both en.json and th.json
- [ ] Route guards prevent navigation to protected routes when session is expired
- [ ] All new tests pass (`npm run test:security`)
- [ ] All existing tests pass (`npm run test:all`)
- [ ] Security audit report generated with severity ratings
- [ ] No new XSS vulnerabilities introduced (verified by test suite)

## Validation Commands
Execute these commands to validate the task is complete:

- `npm run test:all` — Run all existing tests to verify no regressions
- `npm run test:security` — Run new session/validation/security test suite
- `node -e "require('./apps/js/utils/sanitize.js')"` — Verify sanitize module loads
- `node -e "require('./apps/js/utils/csrf.js')"` — Verify CSRF module loads
- `node -e "require('./apps/js/utils/validation.js')"` — Verify enhanced validation loads
- `grep -r 'innerHTML' apps/js/ --include='*.js' | grep -v 'escapeHtml\|textContent\|sanitize\|static' | wc -l` — Count remaining unsanitized innerHTML (should be 0 for user data)
- `python -m http.server 8080 -d apps &` then manual smoke test of session warning flow

## Notes
- The app uses Vanilla JS IIFE pattern — all new modules must follow this pattern
- Script load order in `index.html` matters: utils must load before components, components before pages
- `sanitize.js` and `csrf.js` must load before `validation.js` and `api.js` respectively
- The `innerHTML` audit is the largest task — prioritize files that render user-supplied data
- Session monitor should not interfere with existing session timeout logic in `api.js`, but enhance it
- All string interpolation in `innerHTML` with user data must use `SanitizeUtils.escapeHtml()` — no exceptions
- Thai language support is mandatory for all new user-facing strings

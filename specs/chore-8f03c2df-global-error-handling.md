# Chore: Global Error Handling and Error Boundary UI

## Metadata
adw_id: `8f03c2df`
prompt: `Implement global error handling and error boundary UI. 1) Create apps/js/components/error-boundary.js to catch and display runtime errors gracefully 2) Create apps/js/pages/error.js for 404 and generic error pages with retry button and home link 3) Update router.js to handle undefined routes with 404 page 4) Add network error detection in api.js with offline indicator 5) Create connection-status component showing online/offline state 6) Add retry mechanism for failed API calls 7) Implement session timeout detection with modal warning 8) Add i18n translations for error messages: 'Page Not Found', 'Something went wrong', 'You are offline', 'Session expired' 9) Style error pages with Central Group branding.`

## Chore Description

Implement comprehensive global error handling throughout the RIS HR System to gracefully handle runtime errors, network failures, routing errors, and session timeouts. This includes creating dedicated error UI components, enhancing the API layer with retry logic and offline detection, updating the router to handle 404 cases, and providing user-friendly error messages in both English and Thai with Central Group branding.

The implementation will ensure a robust user experience by:
- Catching and displaying JavaScript runtime errors with a user-friendly error boundary
- Providing clear 404 and generic error pages with navigation options
- Detecting network connectivity status and displaying offline indicators
- Implementing automatic retry mechanisms for failed API calls
- Warning users about session timeouts before they occur
- Maintaining bilingual support (English/Thai) for all error messages
- Ensuring all error UI follows Central Group brand guidelines

## Relevant Files

### Existing Files to Modify

- **apps/js/router.js** (272 lines)
  - Currently has basic 404 fallback in `findRoute()` but doesn't render a proper error page
  - Need to register a proper 404 error page route and improve error handling in `executeRoute()`
  - Add route lifecycle hooks to detect navigation errors

- **apps/js/api.js** (516 lines)
  - Currently has basic error throwing but no retry mechanism or network detection
  - Need to add network connectivity detection using `navigator.onLine` and online/offline events
  - Implement exponential backoff retry logic for failed API calls
  - Add timeout detection for simulating session expiration

- **apps/js/state.js** (274 lines)
  - Has basic `setError()` method but needs enhancement for error categorization
  - Add state properties for connection status (`isOnline`), session status (`sessionExpired`), and error types
  - Create methods for managing connection status and session timeout warnings

- **apps/locales/en.json** (~750 lines)
  - Add error message translations under new `error` section
  - Include messages for: page not found, something went wrong, offline status, session timeout, retry prompts

- **apps/locales/th.json** (~750 lines)
  - Add Thai translations matching the English error messages
  - Ensure culturally appropriate messaging for error scenarios

- **apps/css/styles.css** (~600 lines)
  - Add styles for error pages with Central Group branding
  - Create styles for offline indicator banner and connection status component
  - Add error boundary container styles with proper visual hierarchy

- **apps/index.html** (~150 lines)
  - Add script tags to load new error-boundary.js, error.js, and connection-status.js components
  - Add connection status container element for displaying online/offline indicator

- **apps/js/app.js** (~120 lines)
  - Initialize error boundary on application bootstrap
  - Register error page routes (404, generic error)
  - Set up global error handlers for uncaught errors and unhandled promise rejections
  - Initialize connection status monitoring

### New Files to Create

#### Component Files

- **apps/js/components/error-boundary.js**
  - Create ErrorBoundary component that wraps the application
  - Listen to window `error` and `unhandledrejection` events
  - Display user-friendly error UI when runtime errors occur
  - Provide "Retry" and "Back to Home" actions
  - Log errors to console for debugging
  - Support bilingual error messages using i18n

- **apps/js/components/connection-status.js**
  - Create ConnectionStatus component showing online/offline state
  - Listen to window `online` and `offline` events
  - Display banner notification when connection is lost or restored
  - Update AppState with connection status
  - Auto-hide banner after connection is restored (after 3 seconds)
  - Use toast notifications for connection state changes

#### Page Files

- **apps/js/pages/error.js**
  - Create error page module with render functions for different error types
  - Implement `render404()` - Page Not Found with navigation suggestions
  - Implement `renderGenericError()` - Generic error page for runtime errors
  - Implement `renderOfflineError()` - Offline-specific error message
  - Include retry button that refreshes the current route
  - Include "Back to Home" button linking to #/home
  - Style with Central Group brand colors and maintain consistent layout
  - Support bilingual rendering based on AppState language

## Step by Step Tasks

### 1. Add i18n Error Message Translations
- Open `apps/locales/en.json` and add new `error` section with keys:
  - `pageNotFound` - "Page Not Found"
  - `pageNotFoundDescription` - "The page you're looking for doesn't exist or has been moved."
  - `somethingWentWrong` - "Something went wrong"
  - `errorDescription` - "An unexpected error occurred. Please try again."
  - `offline` - "You are offline"
  - `offlineDescription` - "Please check your internet connection and try again."
  - `sessionExpired` - "Session expired"
  - `sessionExpiredDescription` - "Your session has expired. Please refresh the page to continue."
  - `sessionExpiringSoon` - "Session expiring soon"
  - `sessionExpiringDescription` - "Your session will expire in {minutes} minutes. Please save your work."
  - `retryButton` - "Try Again"
  - `backToHome` - "Back to Home"
  - `connectionLost` - "Connection lost"
  - `connectionRestored` - "Connection restored"
  - `reload` - "Reload Page"
- Add corresponding Thai translations in `apps/locales/th.json`
- Ensure translation keys follow existing naming conventions

### 2. Create Error Page Module
- Create `apps/js/pages/error.js` with exports:
  - `render404(params)` - Render 404 Not Found page
  - `renderGenericError(params)` - Render generic error page
  - `renderOfflineError(params)` - Render offline error page
- Each render function should:
  - Use i18n for bilingual support (get current language from AppState)
  - Display appropriate icon (Material Icons: error_outline for errors, cloud_off for offline, search_off for 404)
  - Show error title and description from i18n
  - Include "Try Again" button that calls `Router.refresh()` or retries the failed action
  - Include "Back to Home" button that navigates to `#/home`
  - Apply Central Group branding (CG red #C8102E for error icons, proper spacing)
  - Use responsive layout with centered content
  - Support optional error details parameter for debugging (shown only in development)
- Create onEnter lifecycle hook for each error type to log to console

### 3. Create Error Boundary Component
- Create `apps/js/components/error-boundary.js` as IIFE module
- Implement initialization:
  - Listen to `window.error` event for JavaScript errors
  - Listen to `window.unhandledrejection` event for unhandled promise rejections
  - Store original content before showing error UI
- Create `handleError(error)` method:
  - Log error details to console.error
  - Update AppState with error information (`errorType`, `errorMessage`, `errorStack`)
  - Navigate to generic error page: `Router.navigate('error', { type: 'runtime' })`
  - Announce error to screen readers using AccessibilityUtils
- Create `reset()` method to clear error state and restore original content
- Export `ErrorBoundary.init()` for initialization in app.js

### 4. Create Connection Status Component
- Create `apps/js/components/connection-status.js` as IIFE module
- Implement initialization:
  - Check initial connection status using `navigator.onLine`
  - Listen to `window.online` event
  - Listen to `window.offline` event
  - Create banner element in DOM for displaying connection status
- Create `handleOnline()` method:
  - Update AppState: `set('isOnline', true)`
  - Show success toast: i18n `error.connectionRestored`
  - Hide offline banner with fade animation after 3 seconds
  - Announce to screen readers
- Create `handleOffline()` method:
  - Update AppState: `set('isOnline', false)`
  - Show error toast: i18n `error.connectionLost`
  - Display persistent offline banner at top of page
  - Announce to screen readers
- Create `render()` method to generate banner HTML:
  - Use warning colors (amber/yellow) for offline state
  - Include offline icon (Material Icons: cloud_off)
  - Show offline message from i18n
  - Position fixed at top with z-index above header
- Export `ConnectionStatus.init()` for initialization

### 5. Enhance API Module with Network Detection and Retry Logic
- Open `apps/js/api.js` and add network detection:
  - Create `checkOnlineStatus()` helper that returns `navigator.onLine`
  - Add `NetworkError` class extending Error for network-specific errors
- Create retry mechanism:
  - Add `withRetry(asyncFn, maxRetries = 3)` wrapper function
  - Implement exponential backoff: delays of 1s, 2s, 4s between retries
  - Only retry on network errors, not on validation or business logic errors
  - Log retry attempts to console
  - Throw final error after max retries exceeded
- Enhance `withLoading()` wrapper:
  - Check if online before making API calls
  - If offline, throw NetworkError immediately with i18n message
  - Catch network errors and update AppState with connection status
- Update API methods to use retry logic:
  - Wrap critical data fetching methods (getEmployee, getCurrentUser, etc.) with `withRetry`
  - Don't retry mutations (create, update, delete) to prevent duplicate operations
- Add session timeout simulation:
  - Create `SESSION_TIMEOUT` constant (e.g., 30 minutes)
  - Track last activity time in localStorage
  - Add `checkSessionTimeout()` method called before each API request
  - Show modal warning at 5 minutes before expiration
  - Set `sessionExpired` state when timeout reached

### 6. Update Router to Handle 404 Pages
- Open `apps/js/router.js`
- Register the error page route in app.js initialization (see step 8)
- Enhance `findRoute(path)` method:
  - When no route matches, return error route explicitly
  - Pass original requested path as parameter to error page
- Enhance `executeRoute(hash)` error handling:
  - Wrap route.render() and route.onEnter() in try-catch
  - On error, check error type:
    - If offline error (NetworkError), navigate to offline error page
    - Otherwise, navigate to generic error page with error details
  - Log routing errors to console with stack trace
  - Update state with error information
- Add `Router.handleError(error)` method:
  - Centralized error handling for routing errors
  - Determine error type and navigate to appropriate error page
  - Prevent infinite error loops by checking if already on error page

### 7. Implement Session Timeout Detection
- Open `apps/js/state.js`
- Add new state properties:
  - `sessionExpiry`: null (timestamp when session expires)
  - `sessionExpired`: false
  - `showSessionWarning`: false
  - `isOnline`: true (default to online)
- Create `setSessionExpiry(minutes)` method:
  - Calculate expiry timestamp
  - Update state with expiry time
  - Store in localStorage for persistence
- Create `checkSessionTimeout()` method:
  - Compare current time with expiry
  - If within 5 minutes of expiry and not already warned, set `showSessionWarning: true`
  - If expired, set `sessionExpired: true`
  - Return boolean indicating if session is still valid
- Create session warning modal:
  - In app.js, subscribe to `showSessionWarning` state changes
  - When true, show modal using ModalComponent with i18n message
  - Provide "Continue" button that extends session and resets timer
  - Provide "Logout" button that clears session and redirects to login

### 8. Update Application Bootstrap
- Open `apps/js/app.js`
- Add imports for new components and error page
- In `init()` method after existing initialization:
  - Initialize ErrorBoundary: `ErrorBoundary.init()`
  - Initialize ConnectionStatus: `ConnectionStatus.init()`
  - Register error routes:
    - `Router.register('404', { render: ErrorPage.render404, onEnter: ErrorPage.onEnter404 })`
    - `Router.register('error', { render: ErrorPage.renderGenericError, onEnter: ErrorPage.onEnterGenericError })`
    - `Router.register('offline', { render: ErrorPage.renderOfflineError, onEnter: ErrorPage.onEnterOfflineError })`
  - Set up session timeout monitoring:
    - Initialize session expiry (30 minutes from now)
    - Set up interval to check session status every minute
    - Subscribe to `sessionExpired` state changes to show modal
  - Add global error handlers:
    - `window.addEventListener('error', ErrorBoundary.handleError)`
    - `window.addEventListener('unhandledrejection', ErrorBoundary.handleUnhandledRejection)`

### 9. Update HTML to Load Error Components
- Open `apps/index.html`
- Add connection status banner container in body (before app-header):
  - `<div id="connection-status-banner" role="status" aria-live="polite" aria-atomic="true"></div>`
- Add script tags for new components in the script loading section (before app.js):
  - `<script src="js/components/error-boundary.js"></script>`
  - `<script src="js/components/connection-status.js"></script>`
  - `<script src="js/pages/error.js"></script>`
- Ensure scripts load in correct order: utils → components → pages → router → app

### 10. Style Error Components with Central Group Branding
- Open `apps/css/styles.css`
- Add error page styles:
  - `.error-page` - Container with centered content, padding, max-width
  - `.error-icon` - Large icon (72px) with CG red color for errors, gray for 404
  - `.error-title` - Large heading (text-2xl) with proper spacing
  - `.error-description` - Muted text with readable line-height
  - `.error-actions` - Button container with flexbox spacing
  - Error buttons using existing CG button styles (primary red, secondary gray)
- Add connection status banner styles:
  - `.connection-banner` - Fixed top bar, full width, amber background for offline
  - `.connection-banner-content` - Centered content with icon and message
  - `.connection-banner-icon` - Icon styling with proper alignment
  - Slide-in animation from top for banner appearance
  - Fade-out animation for dismissal
- Add offline indicator styles:
  - `.offline-indicator` - Small badge/pill showing offline status in header
  - Subtle pulsing animation to draw attention
  - Amber/yellow color scheme for warning
- Ensure all styles are responsive and maintain accessibility (color contrast, focus states)

### 11. Validate Error Handling Implementation
- Test all error scenarios systematically:
  - Navigate to non-existent route (e.g., `#/invalid-page`) → Should show 404 page
  - Simulate JavaScript error in console → Should catch and show error boundary
  - Simulate API error by modifying API.js temporarily → Should show retry option
  - Simulate offline by toggling network in DevTools → Should show offline banner and offline error page
  - Test retry mechanism by causing temporary failure → Should auto-retry and succeed
  - Test session timeout by setting short timeout → Should show warning modal then expiration
- Verify bilingual support:
  - Switch language to Thai → All error messages should display in Thai
  - Switch back to English → All error messages should display in English
- Verify accessibility:
  - All error announcements should be made to screen readers via ARIA live regions
  - Error pages should have proper heading hierarchy and keyboard navigation
  - Focus should move to error page title when error occurs
  - All interactive elements should have visible focus indicators
- Verify styling:
  - All error pages should use Central Group brand colors
  - Error icons should be clearly visible and appropriately sized
  - Buttons should follow existing button styles (hover states, active states)
  - Connection status banner should be visually distinct but not intrusive
  - All components should be responsive on mobile and desktop

### 12. Test Error Recovery and User Flows
- Test error recovery workflows:
  - From 404 page, click "Back to Home" → Should navigate to home page successfully
  - From generic error page, click "Try Again" → Should refresh current route
  - From offline error page, toggle online → Should show connection restored toast
  - After connection restored, manually retry → Should successfully load data
  - From session expiry modal, click "Continue" → Should extend session and close modal
  - From session expiry modal, click "Logout" → Should clear session and redirect appropriately
- Test error prevention:
  - All API calls should check online status before execution
  - Retry logic should prevent excessive retries (max 3 attempts)
  - Session timeout should be tracked across page refreshes (using localStorage)
  - Multiple errors should not create infinite loops or stack errors
- Test edge cases:
  - Error occurs while modal is open → Should handle gracefully
  - Error occurs during route transition → Should complete transition to error page
  - Multiple network status changes in rapid succession → Should debounce appropriately
  - Session expires while user is actively using app → Should warn without losing work

## Validation Commands

Execute these commands to validate the implementation:

- **Syntax validation**: Open browser DevTools Console, check for JavaScript errors on page load
  - No errors should appear in console during normal operation
  - Test by loading the page: `open apps/index.html` or via local server

- **404 Route test**: Navigate to `http://localhost:8080/#/invalid-page`
  - Should display "Page Not Found" error page with proper styling
  - Should show "Back to Home" and "Try Again" buttons
  - Check both English and Thai versions by toggling language

- **Offline detection test**: Open DevTools → Network tab → Toggle offline mode
  - Should immediately show connection status banner at top
  - Should show offline toast notification
  - Attempting to navigate should show offline error page
  - Toggle back online should show "Connection restored" toast and hide banner

- **Error boundary test**: Execute in browser console: `throw new Error('Test error')`
  - Should catch error and show error boundary UI
  - Should display generic error page with retry option
  - Should log error to console with stack trace

- **Session timeout test**: Temporarily set `SESSION_TIMEOUT` to 2 minutes in api.js
  - Wait 1.5 minutes → No warning yet
  - Wait 2.5 minutes total → Should show session warning modal
  - Click "Continue" → Should extend session
  - Wait another 2.5 minutes → Should show warning again

- **Retry mechanism test**: Temporarily modify API method to fail twice then succeed
  - Make API call (e.g., load profile page)
  - Should see retry attempts in console (attempt 1, 2, then success)
  - Should eventually display data successfully
  - Should show appropriate loading states during retries

- **Bilingual validation**: Switch language between English and Thai
  - All error messages should translate properly
  - Error page titles, descriptions, and button labels should update
  - Connection status messages should display in correct language
  - Session timeout modal should show correct language

- **Accessibility validation**: Test with screen reader (VoiceOver on Mac, NVDA on Windows)
  - Connection status changes should be announced
  - Error page titles should be announced when navigating to error
  - All buttons should have proper accessible names
  - ARIA live regions should announce dynamic status changes

- **Styling validation**: Test on different screen sizes
  - Desktop (1920x1080): Error pages should be centered with max-width
  - Tablet (768px): Error pages should remain readable with adjusted spacing
  - Mobile (375px): Error pages should be single column with stacked buttons
  - Connection banner should span full width on all sizes
  - All text should maintain proper contrast ratios for WCAG compliance

- **File existence check**: Verify all new files were created
  ```bash
  ls -la apps/js/components/error-boundary.js
  ls -la apps/js/components/connection-status.js
  ls -la apps/js/pages/error.js
  ```
  - All three files should exist with non-zero size

- **Integration test**: Perform complete user journey with errors
  1. Start from home page
  2. Navigate to invalid route → See 404 page
  3. Click "Back to Home" → Return to home successfully
  4. Toggle offline mode → See offline banner
  5. Try to navigate → See offline error page
  6. Toggle back online → See restoration message
  7. Navigate successfully → Page loads normally
  8. Trigger JavaScript error → See error boundary
  9. Click "Try Again" → Error clears and page reloads

## Notes

### Error Handling Strategy

The implementation follows a layered error handling approach:

1. **Network Layer** (api.js): Catches network errors, implements retry logic, detects offline state
2. **Routing Layer** (router.js): Handles route not found, catches route execution errors
3. **Application Layer** (error-boundary.js): Catches uncaught runtime errors as last resort
4. **Presentation Layer** (error.js): Provides user-friendly error UIs for all error types

### Retry Logic Considerations

- **Read operations**: Safe to retry (getEmployee, getCompensation, etc.)
- **Write operations**: Should NOT auto-retry (updatePersonalInfo, submitWorkflow, etc.) to prevent duplicate submissions
- **Idempotent operations**: Can safely retry (logout, markNotificationRead)
- **Maximum retries**: Limited to 3 attempts to prevent infinite loops and excessive load
- **Exponential backoff**: Delays increase (1s, 2s, 4s) to allow temporary issues to resolve

### Session Management

- **Timeout duration**: 30 minutes of inactivity (configurable constant)
- **Warning threshold**: Show warning 5 minutes before expiration
- **Persistence**: Store expiry time in localStorage to persist across page refreshes
- **Activity tracking**: Update activity timestamp on any API call or user interaction
- **Grace period**: Allow users to extend session by clicking "Continue" in warning modal

### Accessibility Compliance

All error handling maintains WCAG 2.1 AA compliance:

- **ARIA live regions**: Announce connection status changes and errors
- **Focus management**: Move focus to error page headings when displaying errors
- **Keyboard navigation**: All error recovery actions accessible via keyboard
- **Screen reader support**: All error messages have semantic HTML and proper labels
- **Color independence**: Error states indicated by text and icons, not color alone

### Development vs Production

Consider adding environment-specific behavior:

- **Development**: Show detailed error stack traces, enable verbose logging
- **Production**: Show user-friendly messages only, log errors to monitoring service
- **Configuration**: Use environment variable or feature flag to toggle behavior

This can be implemented later if needed by checking a global `ENV` variable.

### Central Group Branding Guidelines

All error UIs follow Central Group brand guidelines:

- **Primary color**: CG Red (#C8102E) for error states and primary buttons
- **Typography**: Sarabun font family for Thai, Noto Sans Thai for English
- **Icons**: Material Icons for consistency with rest of the application
- **Spacing**: 8px base unit for consistent spacing throughout
- **Error severity colors**:
  - Error/Critical: CG Red (#C8102E)
  - Warning: Amber (#F59E0B)
  - Info: Blue (#3B82F6)
  - Success: Green (#10B981)

### Future Enhancements (Not in Scope)

Potential improvements for future iterations:

- **Error reporting service**: Send errors to external monitoring (e.g., Sentry, LogRocket)
- **Error analytics**: Track error frequency and patterns for improvement insights
- **Smart retry**: Implement circuit breaker pattern to stop retrying if service is down
- **Offline queue**: Queue API requests made while offline and replay when connection returns
- **Service worker**: Implement PWA features for better offline experience
- **User feedback**: Allow users to report errors with context and screenshots

# Chore: Implement Loading States and Skeleton Screens

## Metadata
adw_id: `5b0e2e97`
prompt: `Implement loading states and skeleton screens for better UX. 1) Create apps/js/components/skeleton.js with skeleton loaders for: card skeleton, table skeleton, profile header skeleton, form skeleton 2) Add loading spinner component for buttons and actions 3) Update API.js to expose loading state via AppState 4) Update each page (home.js, personal-info.js, employment.js, compensation.js, benefits.js, profile-details.js, workflows.js) to show skeleton while data loads 5) Add shimmer animation to styles.css 6) Show loading spinner in buttons during form submissions 7) Add i18n translations for 'Loading...' in both languages.`

## Chore Description
Implement comprehensive loading states and skeleton screens throughout the RIS HR System to provide better user experience during data fetching and asynchronous operations. This includes creating reusable skeleton components, updating the API layer to manage loading states globally, integrating skeleton screens into all pages, adding shimmer animations, and implementing loading spinners for buttons during form submissions. The implementation will ensure users always have visual feedback during asynchronous operations, reducing perceived wait times and improving overall UX.

## Relevant Files

### Existing Files to Modify

- **apps/js/components/skeleton.js** (NEW) - Create comprehensive skeleton component library with:
  - Card skeleton for section cards
  - Table skeleton for data tables
  - Profile header skeleton for user profile headers
  - Form skeleton for form fields and inputs
  - Button loading spinner for form submissions
  - Consistent styling that matches existing components

- **apps/js/api.js** - Update API client to integrate with AppState loading management:
  - Wrap all async API calls to set loading state before execution
  - Clear loading state after completion or error
  - Ensure loading state is tracked globally via AppState

- **apps/js/state.js** - Already has `isLoading` state variable (line 14), confirm it's being used correctly and add any additional loading state management if needed

- **apps/css/styles.css** - Add shimmer animation CSS:
  - Keyframes for shimmer effect
  - Background gradient animation
  - Smooth, performant animation that works across browsers

- **apps/js/pages/home.js** - Integrate skeleton screens:
  - Show card skeletons for quick action cards while loading
  - Show list skeletons for "For You Today" section
  - Show team summary skeleton for manager view
  - Hide skeletons and show actual content after data loads

- **apps/js/pages/personal-info.js** - Integrate skeleton screens:
  - Show profile header skeleton
  - Show card skeletons for personal info, contact info sections
  - Show form skeleton during editing
  - Show button loading spinner during save operations

- **apps/js/pages/employment.js** - Integrate skeleton screens:
  - Show card skeletons for employment info, org chart sections
  - Show table skeleton for employment history if present

- **apps/js/pages/compensation.js** - Integrate skeleton screens:
  - Show card skeletons for salary, payslips sections
  - Show table skeleton for payslip list
  - Show button loading spinner during document downloads

- **apps/js/pages/benefits.js** - Integrate skeleton screens:
  - Show card skeletons for benefits sections
  - Show table skeleton for benefits enrollment table

- **apps/js/pages/profile-details.js** - Integrate skeleton screens:
  - Show card skeletons for document sections
  - Show table skeleton for document lists
  - Show button loading spinner during document downloads

- **apps/js/pages/workflows.js** - Integrate skeleton screens:
  - Show table skeleton for workflow lists
  - Show card skeletons for workflow details
  - Show button loading spinner during approve/reject/send back actions

- **apps/locales/en.json** - Add loading translations:
  - Already has `"loading": "Loading..."` at line 3
  - Verify it's being used consistently
  - Add any additional loading-related messages if needed

- **apps/locales/th.json** - Add loading translations:
  - Add Thai translation for "Loading..." (`"กำลังโหลด..."`)
  - Match structure with en.json

### New Files

#### apps/js/components/skeleton.js
New component file containing all skeleton loader variations following the existing component pattern from card.js, modal.js, etc.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create Skeleton Component Library
- Create `apps/js/components/skeleton.js` with IIFE pattern matching other components
- Implement `renderCardSkeleton()` method that mimics card structure with animated placeholders
- Implement `renderTableSkeleton(rows)` method for data tables with configurable row count
- Implement `renderProfileHeaderSkeleton()` method for profile header with avatar and text placeholders
- Implement `renderFormSkeleton(fields)` method for form fields with configurable field count
- Implement `renderListSkeleton(items)` method for list items with configurable count
- Implement `renderButtonSpinner()` method that returns inline spinner HTML for buttons
- Add utility method `renderTextLine(width)` for reusable text placeholder lines
- Add utility method `renderCircle(size)` for avatar/icon placeholders
- Ensure all skeletons use `shimmer` CSS class for animation

### 2. Add Shimmer Animation to Styles
- Open `apps/css/styles.css`
- Add shimmer keyframe animation that creates left-to-right sweep effect
- Add `.shimmer` class with background gradient animation
- Add `.skeleton` base class with gray background color
- Ensure animation is smooth at 1.5-2 second duration
- Add `@media (prefers-reduced-motion: reduce)` to disable animation for accessibility

### 3. Update API Module for Loading State Management
- Open `apps/js/api.js`
- Create helper function `withLoading(asyncFn)` that wraps async functions
- Before executing async function, call `AppState.setLoading(true)`
- After completion (success or error), call `AppState.setLoading(false)`
- Wrap all existing API methods with `withLoading()` helper
- Ensure loading state changes trigger AppState subscribers
- Test that loading state is set/cleared correctly for fast and slow operations

### 4. Verify AppState Loading Support
- Open `apps/js/state.js`
- Confirm `isLoading` state exists (line 14)
- Confirm `setLoading(isLoading)` method exists (lines 188-192)
- Verify subscribers can listen to `isLoading` state changes
- No modifications needed if existing implementation is sufficient

### 5. Update Home Page with Skeleton Screens
- Open `apps/js/pages/home.js`
- Subscribe to `isLoading` state in `init()` method
- In `render()` method, check `AppState.get('isLoading')`
- If loading, return skeleton template with:
  - 3 card skeletons for quick actions
  - List skeleton for "For You Today" section
  - Team summary skeleton if user is manager
- If not loading, render actual content as normal
- Ensure smooth transition when loading completes

### 6. Update Personal Info Page with Skeleton Screens
- Open `apps/js/pages/personal-info.js`
- Subscribe to `isLoading` state in lifecycle
- Show profile header skeleton while loading employee data
- Show card skeletons for each section (personal info, contact info, addresses, emergency contacts, dependents)
- During form submission (save operations), show button spinner
- Replace button text with spinner HTML from `SkeletonComponent.renderButtonSpinner()`
- Disable button during submission to prevent double-clicks

### 7. Update Employment Page with Skeleton Screens
- Open `apps/js/pages/employment.js`
- Show card skeletons for employment information and org chart sections
- Show table skeleton if employment history table exists
- Subscribe to loading state and conditionally render skeletons vs actual content

### 8. Update Compensation Page with Skeleton Screens
- Open `apps/js/pages/compensation.js`
- Show card skeletons for compensation details and payslips sections
- Show table skeleton for payslip list
- Add button loading spinner to payslip download buttons
- Handle loading state during download operations (downloadPayslip, downloadTaxDocument)
- Show spinner in button during download, restore normal state after completion

### 9. Update Benefits Page with Skeleton Screens
- Open `apps/js/pages/benefits.js`
- Show card skeletons for benefits sections
- Show table skeleton for benefits enrollment table if present
- Subscribe to loading state for page-level loading

### 10. Update Profile Details Page with Skeleton Screens
- Open `apps/js/pages/profile-details.js`
- Show card skeletons for all document sections (E-Letter, Learning History, OHS Certificate, OHS Document, Individual Documents)
- Show table/list skeletons for document lists
- Add button loading spinner to all download buttons
- Handle loading state during download operations (downloadELetter, downloadCertificate, downloadOHSDocument, downloadIndividualDocument)

### 11. Update Workflows Page with Skeleton Screens
- Open `apps/js/pages/workflows.js`
- Show table skeleton for workflow lists
- Show card skeleton for workflow detail views
- Add button loading spinner to approve/reject/send back buttons
- Handle loading state during workflow action operations
- Prevent multiple submissions during processing

### 12. Add Loading Translations
- Open `apps/locales/en.json`
- Verify `"loading": "Loading..."` exists in `common` object (line 3)
- Add `"loadingData": "Loading data..."` if needed for more specific contexts
- Open `apps/locales/th.json`
- Add `"loading": "กำลังโหลด..."` to `common` object
- Add `"loadingData": "กำลังโหลดข้อมูล..."` if needed
- Ensure translations are used consistently via `i18n.t('common.loading')`

### 13. Test Loading States End-to-End
- Start development server: `python -m http.server 8080 -d apps`
- Navigate to home page, verify skeleton appears briefly during initial load
- Navigate to profile pages, verify appropriate skeletons appear
- Test form submissions, verify button spinners appear
- Test document downloads, verify download button spinners appear
- Test on slow network (Chrome DevTools Network throttling) to see skeletons more clearly
- Verify shimmer animation works and is smooth
- Test with `prefers-reduced-motion` enabled to verify animation is disabled

### 14. Validate Syntax and Code Quality
- Run JavaScript syntax check: `node -c apps/js/components/skeleton.js`
- Verify all modified page files have valid syntax
- Check browser console for any errors
- Verify no console warnings related to loading states
- Confirm loading state is properly cleaned up (no stuck loading states)

## Validation Commands
Execute these commands to validate the chore is complete:

- `node -c apps/js/components/skeleton.js` - Validate skeleton component syntax
- `node -c apps/js/api.js` - Validate API module syntax
- `node -c apps/js/pages/home.js` - Validate home page syntax
- `node -c apps/js/pages/personal-info.js` - Validate personal info page syntax
- `node -c apps/js/pages/employment.js` - Validate employment page syntax
- `node -c apps/js/pages/compensation.js` - Validate compensation page syntax
- `node -c apps/js/pages/benefits.js` - Validate benefits page syntax
- `node -c apps/js/pages/profile-details.js` - Validate profile details page syntax
- `node -c apps/js/pages/workflows.js` - Validate workflows page syntax
- `python -m http.server 8080 -d apps` - Start dev server and manually test loading states in browser
- Browser DevTools Network tab with "Slow 3G" throttling - Verify skeletons appear during slow network conditions
- Browser DevTools Accessibility tab - Verify reduced motion preference disables shimmer animation

## Notes

### Design Consistency
- All skeleton components should match the visual structure of their real component counterparts
- Use consistent gray tones: `bg-gray-200` for skeleton backgrounds, `bg-gray-300` for shimmer highlights
- Skeleton heights and widths should approximate real content to minimize layout shift

### Performance Considerations
- Shimmer animation uses CSS transforms for GPU acceleration
- Avoid excessive DOM updates during loading state transitions
- Loading state should be managed globally via AppState to prevent redundant API calls

### Accessibility
- Always provide `aria-label` or `aria-live` attributes for loading states
- Respect `prefers-reduced-motion` media query to disable animations
- Ensure keyboard navigation still works during loading states
- Use semantic HTML and appropriate ARIA attributes

### Error Handling
- If API call fails, loading state should still be cleared
- Show appropriate error message instead of skeleton if data fetch fails
- Provide retry mechanism where appropriate

### Existing Patterns
- Follow IIFE module pattern used in all other components (card.js, modal.js, etc.)
- Use AppState pub/sub for state management, not direct DOM manipulation
- Use i18n.t() for all user-facing text, including loading messages
- Export component for potential module usage with `if (typeof module !== 'undefined')`

### Translation Keys
- English: Already has `"loading": "Loading..."` in common object
- Thai: Need to add `"loading": "กำลังโหลด..."` in common object
- Keep translations simple and consistent with existing patterns

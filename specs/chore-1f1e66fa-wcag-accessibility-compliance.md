# Chore: Enhance Accessibility to Meet WCAG 2.1 AA Compliance

## Metadata
adw_id: `1f1e66fa`
prompt: `Enhance accessibility to meet WCAG 2.1 AA compliance for RIS HR System. 1) Add skip-to-main-content link at top of page 2) Ensure all images have meaningful alt text 3) Add aria-label to all icon-only buttons across components 4) Implement focus trap in modal.js for keyboard users 5) Add visible focus rings (focus:ring-2 focus:ring-cg-info) to all interactive elements 6) Ensure color contrast ratio meets 4.5:1 minimum 7) Add aria-live regions for toast notifications and dynamic content updates 8) Make data tables navigable via keyboard with proper th scope attributes 9) Add role='alert' to error messages 10) Test tab order and fix any issues 11) Add aria-expanded to collapsible sections.`

## Chore Description
This chore focuses on enhancing the RIS HR System to meet WCAG 2.1 AA accessibility standards. The work includes implementing keyboard navigation improvements, ARIA attributes for screen readers, proper focus management, semantic HTML structure, color contrast compliance, and dynamic content announcements. This ensures the application is usable by people with disabilities including those who use screen readers, keyboard-only navigation, or have visual impairments.

## Relevant Files
Files that will be modified to implement accessibility enhancements:

**HTML Structure:**
- `apps/index.html` - Add skip-to-main-content link, ensure proper semantic structure, add aria-live regions for announcements

**CSS Styles:**
- `apps/css/styles.css` - Add visible focus ring styles for all interactive elements, verify color contrast ratios, add focus-within styles

**Core Components:**
- `apps/js/components/modal.js` - Implement keyboard focus trap, proper ARIA attributes, ESC key handling
- `apps/js/components/toast.js` - Add aria-live="polite" for announcements, proper role attributes
- `apps/js/components/data-table.js` - Add scope attributes to th elements, keyboard navigation, proper ARIA labels
- `apps/js/components/header.js` - Add aria-label to icon-only buttons, aria-expanded for dropdowns, proper button semantics
- `apps/js/components/notification-bell.js` - Add aria-label for icon button, badge announcements
- `apps/js/components/form-field.js` - Ensure proper aria-describedby, aria-invalid, role="alert" on errors
- `apps/js/components/tabs.js` - Add aria-expanded to collapsible sections, proper tablist semantics
- `apps/js/components/mobile-menu.js` - Add aria-expanded, proper focus management, keyboard navigation
- `apps/js/components/card.js` - Add alt text for any images, proper heading hierarchy
- `apps/js/components/org-chart.js` - Add descriptive labels for SVG elements, proper ARIA attributes
- `apps/js/components/profile-header.js` - Add alt text for profile images, semantic heading structure
- `apps/js/components/skeleton.js` - Add aria-busy and aria-label for loading states

**Page Components:**
- `apps/js/pages/home.js` - Add alt text for any images, proper heading hierarchy
- `apps/js/pages/profile.js` - Ensure proper tab order, collapsible section ARIA attributes
- `apps/js/pages/personal-info.js` - Form accessibility, proper labels and descriptions
- `apps/js/pages/employment.js` - Add alt text for org chart, proper semantic structure
- `apps/js/pages/compensation.js` - Download button labels, table accessibility
- `apps/js/pages/benefits.js` - Table navigation, proper semantics
- `apps/js/pages/profile-details.js` - Collapsible sections aria-expanded, proper structure
- `apps/js/pages/scorecard.js` - Chart accessibility, data table enhancements
- `apps/js/pages/workflows.js` - Action button labels, table keyboard navigation

**Internationalization:**
- `apps/locales/en.json` - Add accessibility labels and announcements
- `apps/locales/th.json` - Add Thai translations for accessibility labels

### New Files
- `apps/js/utils/accessibility.js` - Utility functions for focus management, keyboard traps, and ARIA announcements

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Skip-to-Main-Content Link
- Add skip link at the very beginning of the `<body>` in `apps/index.html`
- Style the skip link to be visually hidden until focused in `apps/css/styles.css` (already exists)
- Add translation keys for skip link in both `apps/locales/en.json` and `apps/locales/th.json`
- Test that the skip link receives focus on Tab and navigates correctly

### 2. Create Accessibility Utility Module
- Create `apps/js/utils/accessibility.js` with helper functions:
  - `trapFocus(element)` - Trap keyboard focus within an element (for modals)
  - `releaseFocus()` - Release focus trap and restore previous focus
  - `getFocusableElements(element)` - Get all focusable elements within a container
  - `announceToScreenReader(message, priority)` - Dynamically announce messages via aria-live
  - `manageFocusOrder()` - Ensure logical tab order throughout the application

### 3. Add Global ARIA Live Regions
- Add `<div id="aria-announcements" aria-live="polite" aria-atomic="true" class="sr-only"></div>` to `apps/index.html`
- Add `<div id="aria-alerts" aria-live="assertive" aria-atomic="true" class="sr-only"></div>` to `apps/index.html`
- Add `.sr-only` class to `apps/css/styles.css` for screen-reader-only content

### 4. Enhance Focus Visibility
- Update `apps/css/styles.css` to ensure all interactive elements have visible focus rings:
  - Add `focus:ring-2 focus:ring-cg-info focus:ring-offset-2` to buttons, links, inputs
  - Ensure focus ring has sufficient contrast (3:1 minimum against background)
  - Add `focus-within` styles for composite widgets
- Remove any `outline: none` without replacement focus indicator

### 5. Implement Modal Focus Trap
- Update `apps/js/components/modal.js`:
  - Import accessibility utilities
  - Store previously focused element before opening modal
  - Trap focus within modal using `trapFocus()`
  - Handle ESC key to close modal
  - Add aria-modal="true" and proper role="dialog"
  - Restore focus to previously focused element on close
  - Add aria-labelledby pointing to modal title
  - Add aria-describedby if modal has description

### 6. Enhance Toast Notifications
- Update `apps/js/components/toast.js`:
  - Change `aria-live="polite"` to `aria-live="assertive"` for error toasts
  - Keep `aria-live="polite"` for success/info toasts
  - Add proper role="status" or role="alert" based on type
  - Ensure toast message text is announced to screen readers
  - Add aria-label to close button with translated text

### 7. Add Icon Button Labels Throughout Components
- Update `apps/js/components/header.js`:
  - Add aria-label to all icon-only buttons (menu, search, help, settings, notifications)
  - Add aria-expanded to dropdown toggle buttons
  - Add aria-haspopup="true" to buttons that open menus
  - Ensure language toggle button has proper label

- Update `apps/js/components/notification-bell.js`:
  - Add aria-label describing notification count
  - Add aria-live region for count changes
  - Ensure badge is not focusable but is announced

- Update `apps/js/components/mobile-menu.js`:
  - Add aria-expanded to hamburger menu button
  - Add aria-label to close button
  - Trap focus within open menu
  - Handle ESC key to close menu
  - Add proper ARIA navigation landmarks

### 8. Enhance Data Table Accessibility
- Update `apps/js/components/data-table.js`:
  - Add `scope="col"` to all `<th>` elements (already exists, verify)
  - Add `scope="row"` to row headers if applicable
  - Add caption element with table description
  - Add aria-label or aria-labelledby to table
  - Add aria-sort attributes to sortable column headers
  - Ensure pagination controls have proper aria-labels
  - Add keyboard navigation for interactive table elements
  - Add aria-describedby for sorting instructions

### 9. Enhance Form Field Accessibility
- Update `apps/js/components/form-field.js`:
  - Verify all error messages have `role="alert"` (already exists, verify)
  - Ensure aria-invalid is set correctly on validation
  - Add aria-required to required fields
  - Ensure aria-describedby references all relevant descriptions
  - Add aria-label to file upload drag-drop zones
  - Verify label associations are correct

### 10. Add Collapsible Section ARIA Attributes
- Update `apps/js/components/tabs.js`:
  - Verify role="tablist", role="tab", role="tabpanel" (already exists)
  - Ensure aria-selected is properly managed
  - Ensure aria-controls and aria-labelledby relationships
  - Add keyboard navigation (Arrow keys, Home, End)

- Update `apps/js/pages/profile-details.js`:
  - Add aria-expanded to collapsible section toggle buttons
  - Add aria-controls pointing to collapsible content
  - Ensure proper heading hierarchy
  - Add keyboard support for expand/collapse

- Update `apps/js/components/card.js`:
  - Add aria-expanded to any collapsible cards
  - Ensure proper button semantics for expand/collapse triggers

### 11. Verify Color Contrast Compliance
- Review `apps/css/styles.css` and component styles:
  - Verify all text colors meet 4.5:1 contrast ratio (normal text)
  - Verify large text meets 3:1 contrast ratio
  - Check button colors, link colors, form field borders
  - Update any colors that fail contrast requirements
  - Document color combinations in comments
  - Special attention to:
    - CG Red (#C8102E) on white background
    - Gray text colors on backgrounds
    - Focus indicators
    - Disabled state colors

### 12. Add Image Alt Text
- Update `apps/js/components/profile-header.js`:
  - Add meaningful alt text to profile images
  - Use employee name or "Profile photo" as alt text
  - Add alt="" for decorative images

- Update `apps/js/components/org-chart.js`:
  - Add aria-label to SVG elements
  - Add role="img" to SVG with description
  - Provide text alternative for organizational structure

- Review all page components for inline images:
  - Ensure all `<img>` tags have alt attribute
  - Meaningful alt text for informative images
  - Empty alt="" for decorative images
  - Use Material Icons with aria-hidden="true" and provide text alternatives

### 13. Add Screen Reader Announcements for Dynamic Content
- Update `apps/js/api.js`:
  - Announce loading states via aria-live region
  - Announce operation completion/errors

- Update `apps/js/router.js`:
  - Announce page changes to screen readers
  - Update document title on route changes

- Update `apps/js/state.js`:
  - Trigger announcements for important state changes
  - Notify when data is loaded/updated

### 14. Enhance Keyboard Navigation
- Update `apps/js/components/mobile-menu.js`:
  - Ensure menu items are keyboard accessible
  - Add arrow key navigation for menu items
  - Handle ESC to close menu
  - Trap focus within open menu

- Update `apps/js/components/data-table.js`:
  - Add keyboard navigation for sortable headers (Enter/Space to sort)
  - Add keyboard support for pagination (Arrow keys)
  - Ensure action buttons in rows are keyboard accessible

- Review and fix tab order in all pages:
  - Ensure logical reading order
  - Remove tabindex > 0 (use 0 or -1 only)
  - Ensure custom widgets are keyboard accessible

### 15. Add Accessibility Translations
- Update `apps/locales/en.json`:
  - Add keys under "accessibility" section for all ARIA labels
  - Include: button labels, region labels, status messages, error announcements
  - Add loading announcements, success/error messages

- Update `apps/locales/th.json`:
  - Add corresponding Thai translations for all accessibility keys
  - Ensure culturally appropriate screen reader text

### 16. Update HTML Script Loading Order
- Update `apps/index.html`:
  - Add `<script src="js/utils/accessibility.js"></script>` after other utilities
  - Ensure proper loading order for dependencies

### 17. Add ARIA Landmarks
- Update `apps/index.html`:
  - Add role="banner" to header (or use `<header>` semantic element)
  - Add role="main" to main content (or use `<main>` semantic element)
  - Add role="navigation" to nav elements
  - Add role="search" to search form
  - Add role="contentinfo" to footer if it exists

### 18. Test and Validate Accessibility
- Test keyboard navigation throughout the entire application:
  - Verify all interactive elements are keyboard accessible
  - Verify focus indicators are visible
  - Verify tab order is logical
  - Verify modal focus trap works
  - Verify ESC key closes modals and menus

- Test with screen reader (VoiceOver on Mac, NVDA on Windows):
  - Verify all ARIA labels are announced
  - Verify form field associations work
  - Verify table structure is conveyed
  - Verify live region announcements work
  - Verify skip link functions

- Verify color contrast using browser tools:
  - Check all text/background combinations
  - Verify focus indicators meet 3:1 contrast
  - Document any exceptions

## Validation Commands
Execute these commands to validate the chore is complete:

- `find apps -name "*.js" -exec grep -l "aria-label" {} \;` - Verify ARIA labels are added throughout
- `find apps -name "*.js" -exec grep -l "aria-expanded" {} \;` - Verify aria-expanded is used for collapsible elements
- `find apps -name "*.js" -exec grep -l "role=\"alert\"" {} \;` - Verify role="alert" is used for error messages
- `grep -r "focus:ring-2" apps/css/styles.css` - Verify focus ring styles are defined
- `grep -r "aria-live" apps/index.html` - Verify ARIA live regions exist
- `grep -r "skip-link" apps/css/styles.css` - Verify skip link styles exist
- Manual testing: Tab through entire application to verify keyboard navigation
- Manual testing: Use VoiceOver (Cmd+F5 on Mac) to test screen reader announcements
- Manual testing: Use browser DevTools to verify color contrast ratios
- Manual testing: Verify ESC key closes modals and menus
- Manual testing: Verify focus trap in modal works correctly

## Notes

### WCAG 2.1 AA Requirements Addressed

**Perceivable:**
- 1.1.1 Non-text Content: All images have alt text
- 1.3.1 Info and Relationships: Proper semantic HTML and ARIA attributes
- 1.3.2 Meaningful Sequence: Logical tab order
- 1.4.3 Contrast (Minimum): 4.5:1 for normal text, 3:1 for large text
- 1.4.11 Non-text Contrast: 3:1 for UI components and focus indicators

**Operable:**
- 2.1.1 Keyboard: All functionality available via keyboard
- 2.1.2 No Keyboard Trap: Except modals with ESC escape
- 2.4.1 Bypass Blocks: Skip-to-main-content link
- 2.4.3 Focus Order: Logical tab order
- 2.4.7 Focus Visible: Visible focus indicators

**Understandable:**
- 3.1.1 Language of Page: HTML lang attribute
- 3.2.1 On Focus: No unexpected context changes
- 3.2.2 On Input: No unexpected context changes
- 3.3.1 Error Identification: Errors clearly identified
- 3.3.2 Labels or Instructions: Proper form labels
- 3.3.3 Error Suggestion: Helpful error messages

**Robust:**
- 4.1.2 Name, Role, Value: Proper ARIA attributes
- 4.1.3 Status Messages: ARIA live regions for announcements

### Implementation Considerations

1. **Focus Management:** Modal focus trap should be implemented carefully to allow ESC key escape and prevent keyboard users from being permanently trapped.

2. **Color Contrast:** The existing CG Red (#C8102E) has good contrast on white (4.96:1), but verify all gray text colors used throughout the application.

3. **ARIA Over-use:** Avoid redundant ARIA attributes. Use semantic HTML first, ARIA only when necessary.

4. **Announcement Frequency:** Be judicious with aria-live announcements to avoid overwhelming screen reader users.

5. **Internationalization:** All ARIA labels and screen reader text must be translated to Thai for complete accessibility in both languages.

6. **Testing Priority:** Keyboard navigation and screen reader testing are essential - automated tools only catch ~30% of accessibility issues.

7. **Material Icons:** When using Material Icons for icon-only buttons, add aria-hidden="true" to the icon span and aria-label to the button element.

8. **Progressive Enhancement:** Ensure core functionality works without JavaScript for maximum accessibility.

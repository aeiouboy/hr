# Chore: Implement Mobile-Responsive Hamburger Menu

## Metadata
adw_id: `d2b26834`
prompt: `Implement mobile-responsive hamburger menu for RIS HR System. 1) Create apps/js/components/mobile-menu.js with slide-out drawer navigation 2) Update apps/js/components/header.js to show hamburger icon (menu) on mobile (md:hidden), hide desktop nav on mobile 3) Add menu items: Home, My Profile, Personal Info, Employment, Compensation, Benefits, Workflows 4) Include language toggle in mobile menu 5) Add overlay backdrop with click-to-close 6) Implement swipe-to-close gesture 7) Add CSS transitions in styles.css for smooth slide-in/slide-out 8) Update index.html with mobile-menu container 9) Ensure touch targets are minimum 44px for accessibility.`

## Chore Description
Implement a fully-featured mobile-responsive hamburger menu for the RIS HR System to improve navigation on mobile devices. The implementation will create a new mobile menu component with slide-out drawer navigation, complete with gesture support, accessibility features, and smooth animations. The menu will display on mobile/tablet breakpoints (below md/768px) and hide on desktop, providing an optimized navigation experience across all device sizes.

The mobile menu will include:
- Slide-out drawer from left side with overlay backdrop
- Complete navigation links matching desktop navigation
- Language toggle functionality integrated into mobile menu
- Touch-friendly gesture support (swipe-to-close)
- Smooth CSS transitions for opening/closing
- WCAG 2.1 AA accessibility compliance with minimum 44px touch targets
- Proper ARIA attributes for screen readers

## Relevant Files

**Existing Files to Modify:**

- `apps/js/components/header.js` - Update to integrate mobile menu component, ensure hamburger icon shows on mobile (md:hidden breakpoint), and hide desktop navigation elements on mobile screens
- `apps/css/styles.css` - Add CSS transitions for smooth slide-in/slide-out animations, mobile menu positioning, overlay backdrop styling, and touch-friendly styles
- `apps/index.html` - Add mobile menu container element in the DOM structure for the new component to render into
- `apps/locales/en.json` - Add English translations for mobile menu items and accessibility labels (if needed beyond existing nav translations)
- `apps/locales/th.json` - Add Thai translations for mobile menu items and accessibility labels (if needed beyond existing nav translations)

### New Files

- `apps/js/components/mobile-menu.js` - New component implementing the slide-out drawer navigation with all menu items, language toggle, gesture support, and accessibility features

## Step by Step Tasks

### 1. Create Mobile Menu Component
- Create `apps/js/components/mobile-menu.js` with component structure following existing component patterns
- Implement render() method that generates mobile menu HTML with drawer structure
- Add navigation links: Home (#/home), My Profile (#/profile), Personal Info (#/profile/personal-info), Employment (#/profile/employment), Compensation (#/profile/compensation), Benefits (#/profile/benefits), Workflows (#/workflows)
- Include language toggle button integrated into menu (similar to header language toggle)
- Add close button in menu header
- Ensure all interactive elements have minimum 44px touch targets
- Add proper ARIA attributes (aria-label, aria-expanded, role="navigation")
- Implement accessibility support with keyboard navigation (Escape to close)

### 2. Implement Gesture and Interaction Logic
- Add swipe-to-close gesture detection using touch events (touchstart, touchmove, touchend)
- Implement click-to-close on overlay backdrop
- Add state management for menu open/close state
- Create methods: open(), close(), toggle(), handleSwipe()
- Ensure body scroll is locked when menu is open (overflow: hidden)
- Implement click handlers for navigation that close menu after navigation
- Add keyboard event handler for Escape key to close menu

### 3. Update Header Component Integration
- Modify `apps/js/components/header.js` to show hamburger icon on mobile (use md:hidden Tailwind class)
- Hide desktop "Employee Files" dropdown on mobile (add md:block class)
- Update mobile menu button to call MobileMenuComponent.toggle()
- Ensure hamburger icon is positioned correctly and has proper accessibility attributes
- Update aria-expanded state when menu opens/closes
- Remove duplicate mobile menu code currently in header.js (lines 148-184) and replace with MobileMenuComponent integration

### 4. Add CSS Transitions and Styles
- Add mobile menu positioning styles in `apps/css/styles.css` (fixed positioning, full height)
- Create smooth slide-in animation (transform: translateX(-100%) to translateX(0))
- Create smooth slide-out animation (transform: translateX(0) to translateX(-100%))
- Add overlay backdrop fade-in/fade-out animation
- Set transition duration to 300ms for all animations
- Add z-index layering (overlay: z-40, menu: z-50)
- Ensure menu is hidden by default with translateX(-100%)
- Add touch-action styles for better gesture handling

### 5. Update HTML Structure
- Add mobile menu container div in `apps/index.html` after header element
- Structure: `<div id="mobile-menu-container"></div>`
- Ensure container is at appropriate z-index level in DOM hierarchy
- Add script tag for mobile-menu.js component in correct loading order (after header.js, before app.js)

### 6. Add Translation Keys
- Review `apps/locales/en.json` and `apps/locales/th.json` for existing navigation keys
- Add any missing translation keys for mobile menu specific labels
- Add accessibility labels: "Open navigation menu", "Close navigation menu", "Mobile navigation"
- Ensure language toggle text matches header implementation

### 7. Initialize and Wire Up Component
- Add MobileMenuComponent.init() call in app initialization sequence
- Ensure component subscribes to language changes for i18n updates
- Wire up header hamburger button to MobileMenuComponent.toggle()
- Test menu state synchronization between header and mobile menu component

### 8. Validate Accessibility and Responsiveness
- Test keyboard navigation (Tab, Escape keys)
- Verify ARIA attributes with screen reader
- Validate touch targets are minimum 44px on mobile devices
- Test on multiple breakpoints: mobile (320px, 375px, 414px), tablet (768px), desktop (1024px+)
- Ensure hamburger menu is hidden on desktop (>= 768px)
- Verify swipe gesture works smoothly without conflicting with page scroll
- Test with reduced motion preference (animations should be minimal)

## Validation Commands

Execute these commands to validate the chore is complete:

- `python -m http.server 8080 -d apps` - Start local development server
- Open browser to `http://localhost:8080` and test mobile menu:
  - Resize browser to mobile width (< 768px) and verify hamburger icon appears
  - Click hamburger icon to open mobile menu - should slide in from left
  - Verify all 7 navigation links are present and functional
  - Test language toggle in mobile menu
  - Click overlay backdrop to close menu
  - Test swipe-to-close gesture on mobile menu
  - Verify smooth animations (300ms transitions)
  - Use browser DevTools to test touch targets are >= 44px
  - Test with keyboard: Tab through menu items, press Escape to close
- Resize browser to desktop width (>= 768px) and verify:
  - Hamburger icon is hidden
  - Desktop navigation is visible
  - Mobile menu does not appear
- Test accessibility:
  - Use browser accessibility inspector to verify ARIA attributes
  - Test with screen reader (VoiceOver on Mac, NVDA on Windows)
  - Verify focus management when opening/closing menu
- Manual syntax validation:
  - Open browser console and check for JavaScript errors
  - Verify no CSS rendering issues

## Notes

- The current header.js already has basic mobile menu implementation (lines 148-184) that should be replaced/refactored to use the new MobileMenuComponent
- Follow existing component patterns in the codebase (e.g., ToastComponent, ModalComponent structure)
- Use Tailwind CSS classes for responsive breakpoints (md:hidden, lg:block, etc.)
- Material Icons are already loaded, use "menu" and "close" icons
- The application uses hash-based routing (#/profile, #/home, etc.)
- Ensure i18n integration by using i18n.t() for all user-facing text
- Consider prefers-reduced-motion media query for accessibility
- Touch target size of 44px follows WCAG 2.1 AA Level compliance (Success Criterion 2.5.5)
- The swipe gesture should require minimum 50px horizontal movement to trigger close
- Test on actual mobile devices if possible, not just browser DevTools

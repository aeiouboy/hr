# PRD: Order Management UI Alignment with Mockup Design

## Introduction

Align the Order Management system UI with the approved mockup design at `https://v0-ris-oms.vercel.app/orders`. The current implementation has significant visual and structural differences from the mockup, including different column layouts, missing row highlighting for SLA issues, inconsistent filter layouts, and different sidebar navigation structure.

**Mockup Reference:** https://v0-ris-oms.vercel.app/orders
**Screenshots:** `/tmp/compare-screenshots/` and `/tmp/mockup-detail-capture/`

## Goals

- Match the Order Management page layout exactly to the mockup design
- Implement row-level highlighting for SLA breach/urgency indicators
- Update filter section to 2-row layout with dedicated Search button
- Align sidebar navigation with mockup structure
- Ensure consistent styling across all Order Management pages
- Maintain responsive design and mobile compatibility

## User Stories

### US-001: Update Sidebar Navigation Structure
**Description:** As a user, I want the sidebar navigation to match the mockup structure so I can navigate consistently.

**Acceptance Criteria:**
- [ ] Sidebar shows: Order Analysis, Order Management, Inventory Management (with expand arrow), Dashboard, Inventory, ATC Config, Escalations, Style Guide
- [ ] Active page highlighted with blue/primary color background
- [ ] Inventory Management shows chevron indicating expandable submenu
- [ ] Central OMS logo and "NAVIGATION" label at top
- [ ] Sidebar collapses properly on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-002: Restructure Order List Table Columns
**Description:** As a user, I want to see order data in the same column structure as the mockup so information is consistent with design specs.

**Acceptance Criteria:**
- [ ] Table columns in exact order: Order Number, Customer Name, Email, Phone Number, Order Total, Order No, Order Status, SLA & Status, Return, Order Type
- [ ] Remove columns not in mockup: Hold, Payment, Confirmed, Store ID
- [ ] Order Number column shows format like "ORD-15A9YFQV-BSEBBA" (or actual API format)
- [ ] Order Total shows Thai Baht symbol (฿) with proper formatting
- [ ] Phone Number column displays full phone numbers
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-003: Implement Order Status Badges Styling
**Description:** As a user, I want status badges to match the mockup color scheme so I can quickly identify order states.

**Acceptance Criteria:**
- [ ] DELIVERED badge: Green background (#22c55e or similar)
- [ ] PROCESSING badge: Yellow/amber background
- [ ] SLA MISSED badge: Orange/red background
- [ ] CANCELLED badge: Red background
- [ ] READY_FOR_PICKUP badge: Blue background
- [ ] OUT_FOR_DELIVERY badge: Purple/indigo background
- [ ] All badges have rounded corners (pill shape)
- [ ] Text is white or dark based on contrast requirements
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-004: Add SLA Status Column Styling
**Description:** As a user, I want to see SLA status in a dedicated column with clear visual indicators.

**Acceptance Criteria:**
- [ ] SLA & Status column shows combined SLA information
- [ ] BREACH status shows in red/orange styling
- [ ] NEAR_BREACH shows in yellow/warning styling
- [ ] COMPLIANT shows in green styling
- [ ] Display remaining time or breach duration
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-005: Implement Row Highlighting for SLA Issues
**Description:** As a user, I want rows with SLA breaches highlighted so urgent orders stand out visually.

**Acceptance Criteria:**
- [ ] Rows with SLA BREACH status have orange/amber background highlight
- [ ] Rows with NEAR_BREACH status have light yellow background highlight
- [ ] Normal rows have white/default background
- [ ] Highlighting does not interfere with row hover states
- [ ] Highlighting visible but not overwhelming (subtle tint)
- [ ] Row highlighting works with alternating row colors if applicable
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-006: Redesign Filter Section - Row 1
**Description:** As a user, I want the first filter row to match the mockup layout with status, store, channel, and payment filters.

**Acceptance Criteria:**
- [ ] Filter row contains: All Status, All Stores, All Channels, Payment dropdown, All Status (payment), All Methods
- [ ] Each filter is a dropdown/select component
- [ ] Filters are horizontally aligned with consistent spacing
- [ ] "All" option is default for each filter
- [ ] Filters have consistent minimum width (min-w-[160px])
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-007: Redesign Filter Section - Row 2
**Description:** As a user, I want the second filter row with date range and search button as shown in mockup.

**Acceptance Criteria:**
- [ ] Second row contains: Order Date label, From date picker, To date picker, Search button
- [ ] Search button is primary/blue styled
- [ ] Date pickers show calendar icon
- [ ] Date format matches Thai locale or ISO format
- [ ] "Show Advanced Filters" link below filter rows
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-008: Update Search Bar Styling
**Description:** As a user, I want the search bar to match mockup placeholder and styling.

**Acceptance Criteria:**
- [ ] Search bar placeholder: "Search by order #, customer name, email, phone..."
- [ ] Search bar spans appropriate width (not full width)
- [ ] Search icon on left side of input
- [ ] Search bar positioned above filter rows
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-009: Update Page Header and Title
**Description:** As a user, I want the page header to match the mockup styling.

**Acceptance Criteria:**
- [ ] Page title: "Order Management" in large font
- [ ] Subtitle: "View and manage orders across all channels" in muted color
- [ ] Export button in top-right area with download icon
- [ ] Refresh button near export
- [ ] Header section has proper spacing from navigation
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-010: Update Table Pagination
**Description:** As a user, I want pagination controls that match the mockup design.

**Acceptance Criteria:**
- [ ] Pagination shows page numbers (1, 2, 3, ... n)
- [ ] Current page highlighted
- [ ] Previous/Next arrow buttons
- [ ] "Show X" dropdown for page size selection
- [ ] Display "Showing X of Y orders" text
- [ ] Pagination positioned at bottom of table
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-011: Update Order Analysis Page Layout
**Description:** As a user, I want the Order Analysis page to match the mockup with charts and KPIs.

**Acceptance Criteria:**
- [ ] Page title: "Order Analysis" with subtitle
- [ ] Toggle buttons: Orders | Revenue | Both
- [ ] Date range picker in header
- [ ] Export and Refresh buttons
- [ ] Total Orders KPI card showing count and "in selected period"
- [ ] Total Revenue KPI card showing ฿ amount and "in selected period"
- [ ] "Orders by Channel" stacked bar chart (TOL in blue, MKP in orange)
- [ ] "Revenue by Channel" stacked bar chart below
- [ ] Charts show daily data with date labels (25-Jan, 26-Jan, etc.)
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-012: Update Top Navigation Bar
**Description:** As a user, I want the top navigation bar to match mockup styling.

**Acceptance Criteria:**
- [ ] Left side: Central Group OMS logo with "Enterprise Command Center" subtitle
- [ ] Right side: Refresh icon, "Last updated: HH:MM:SS" timestamp
- [ ] Organization dropdown: "All Organizations" with chevron
- [ ] User avatar/profile icon on far right
- [ ] Dark navy/blue background (#1e293b or similar)
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-013: Implement Advanced Filters Toggle
**Description:** As a user, I want to show/hide advanced filters as in the mockup.

**Acceptance Criteria:**
- [ ] "Show Advanced Filters" link visible below main filter row
- [ ] Clicking toggles additional filter options
- [ ] Text changes to "Hide Advanced Filters" when expanded
- [ ] Smooth expand/collapse animation
- [ ] Advanced filters include additional fields as needed
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-014: Update Return Column Display
**Description:** As a user, I want the Return column to show return status clearly.

**Acceptance Criteria:**
- [ ] Return column shows: NONE, YES, PARTIAL, etc.
- [ ] NONE displayed in neutral/gray styling
- [ ] YES displayed with indicator styling
- [ ] Column width appropriate for content
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-015: Update Order Type Column Display
**Description:** As a user, I want the Order Type column to identify order sources.

**Acceptance Criteria:**
- [ ] Order Type column shows: DELIVERY, PICKUP, etc.
- [ ] Each type has distinct styling/badge
- [ ] Column positioned as last column per mockup
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

---

### US-016: Responsive Design Verification
**Description:** As a user, I want the updated UI to work well on different screen sizes.

**Acceptance Criteria:**
- [ ] Desktop (1920x1080): Full layout as designed
- [ ] Tablet (768x1024): Sidebar collapses, table scrolls horizontally
- [ ] Mobile (375x667): Sidebar hidden, single-column layout
- [ ] All interactive elements have minimum 44px touch targets on mobile
- [ ] Table remains readable with horizontal scroll indicator
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill at multiple viewports

---

### US-017: Footer Styling Update
**Description:** As a user, I want the footer to match the mockup design.

**Acceptance Criteria:**
- [ ] Footer shows: "Enterprise OMS v1.0 © 2025 Central Group. All rights reserved."
- [ ] Footer has dark background matching top nav
- [ ] Footer positioned at bottom of page
- [ ] Footer visible on all pages
- [ ] Typecheck passes
- [ ] Verify in browser using playwright-skill

## Functional Requirements

- FR-1: Sidebar navigation must display all menu items from mockup in correct order
- FR-2: Order list table must have exactly 10 columns matching mockup specification
- FR-3: Status badges must use consistent color coding across all order states
- FR-4: Row highlighting must trigger based on SLA status (BREACH = orange, NEAR_BREACH = yellow)
- FR-5: Filter section must have 2-row layout with Search button
- FR-6: Date pickers must support range selection for order filtering
- FR-7: Pagination must show page numbers and allow page size selection
- FR-8: Order Analysis page must show dual bar charts for Orders and Revenue by Channel
- FR-9: All timestamps must display in GMT+7 (Asia/Bangkok) timezone
- FR-10: Export functionality must be accessible from page header
- FR-11: Advanced filters must be toggleable via link click
- FR-12: Search must support: order number, customer name, email, phone number

## Non-Goals

- No changes to backend API endpoints or data structure
- No changes to authentication flow
- No new features beyond matching mockup design
- No changes to Order Detail page (not in mockup scope)
- No internationalization changes (Thai locale already supported)
- No changes to real-time update functionality

## Design Considerations

**Color Palette (from mockup):**
- Primary/Active: Blue (#3b82f6)
- Navigation Background: Dark Navy (#1e293b)
- Success/Delivered: Green (#22c55e)
- Warning/Processing: Amber (#f59e0b)
- Error/Breach: Red/Orange (#ef4444 / #f97316)
- Muted Text: Gray (#6b7280)

**Typography:**
- Page titles: Large, semi-bold
- Subtitles: Small, muted color
- Table headers: Medium, uppercase or sentence case
- Table data: Regular weight

**Spacing:**
- Consistent padding in cards and sections
- Filter elements evenly spaced
- Table rows with adequate height for readability

**Existing Components to Reuse:**
- `components/ui/badge.tsx` - Update color variants
- `components/ui/select.tsx` - For filter dropdowns
- `components/ui/button.tsx` - For Search button
- `components/ui/table.tsx` - Base table structure
- `components/sidebar/` - Navigation sidebar

## Technical Considerations

- Use Tailwind CSS classes for all styling changes
- Maintain existing data fetching hooks and API integration
- Ensure changes don't break existing TypeScript types
- Table column configuration should be centralized for maintainability
- Row highlighting should use CSS classes, not inline styles
- Filter state should sync with URL parameters for shareability
- Consider using CSS Grid or Flexbox for filter row layout

## Success Metrics

- Visual parity with mockup at 95%+ accuracy
- All acceptance criteria pass verification
- No TypeScript or ESLint errors
- Page load time not increased by more than 10%
- Responsive design works at all breakpoints
- User can identify SLA issues within 2 seconds of viewing table

## Open Questions

1. Should the "Order No" column be separate from "Order Number" or merged?
2. What specific advanced filters should be available beyond basic ones?
3. Should row highlighting have configurable thresholds?
4. Is the Style Guide page needed for initial release?
5. What data should populate the Order Analysis charts (real API or calculated)?

---

## Appendix: Visual Comparison

### Current Implementation Issues:
1. **Column mismatch**: Current has Order ID, Hold, Payment, Confirmed columns not in mockup
2. **Missing row highlighting**: No visual distinction for SLA breaches
3. **Filter layout**: Single row vs mockup's 2-row layout
4. **Sidebar structure**: Different menu items and organization
5. **Status badge colors**: May not match mockup color scheme exactly
6. **Missing Order Analysis page**: Current may have different analytics layout

### Mockup Reference Screenshots:
- Order List: `/tmp/mockup-detail-capture/01-mockup-order-list.png`
- Order Analysis: `/tmp/mockup-detail-capture/02-mockup-order-detail-overview.png`
- Current Order List: `/tmp/compare-screenshots/current-orders.png`

# Mobile UI Improvement Plan

> **Goal:** ปรับปรุง UI บนมือถือให้ใช้งานง่ายที่สุด ลดข้อมูลที่ไม่จำเป็น เข้าถึงง่าย อ่านง่าย
>
> **Scope:** Next.js frontend at `src/frontend/` — all pages accessible on mobile (< 768px)
>
> **Testing:** E2E via Playwright MCP against `http://localhost:3000`

---

## Phase 0: Documentation & Current State Summary

### Architecture
- **Layout:** `page-layout.tsx` wraps all pages with Header + MobileMenu + Sidebar + main content
- **Sidebar:** `hidden lg:flex` — invisible on mobile, replaced by `MobileMenu` slide-in drawer
- **Breakpoints:** Tailwind v4 defaults — `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- **CSS Config:** `globals.css` with `@theme` block, custom colors (`cg-red`, `cg-dark`, `cg-light`)
- **No `useMediaQuery` hook** exists — all responsive logic is CSS-only via Tailwind
- **State:** Zustand `ui-store.ts` has `mobileMenuOpen`, `sidebarOpen`

### UI Components (`src/components/ui/`)
| Component | Mobile-Ready? | Gap |
|-----------|--------------|-----|
| Card | ❌ | Fixed `p-6` padding, no responsive variant |
| Modal | ❌ | Centered card, not a bottom drawer on mobile |
| Tabs | ✅ | `overflow-x-auto` scrollable |
| Button | ⚠️ | No `fullWidth` prop, no responsive sizing |
| Badge | ✅ | Fixed small size, fine |
| FormField | ✅ | `w-full` by default |
| Toast | ⚠️ | Corner-anchored, should be full-width on mobile |
| Skeleton | ✅ | Flexible |

### Page-Level Issues Found
| Page | Issue | Severity |
|------|-------|----------|
| **All pages** | `main` uses `p-6` always — wastes 48px on 375px screen | High |
| **Smart Claims history** | 8-column table, no mobile card view | High |
| **Quick Approve** | Table with only 2/6 columns hidden on mobile | High |
| **Modal dialogs** | Centered box, not bottom-sheet on mobile | Medium |
| **Home page** | `mb-8` welcome header, no responsive reduction | Medium |
| **Smart Claims form** | Upload zone `p-12`, step indicator fixed-width dividers | Medium |
| **Profile header** | Email no truncation, action buttons alignment | Medium |
| **Card component** | `p-6` fixed, no `p-4 sm:p-6` | Medium |
| **Toast** | `fixed bottom-4 right-4`, not full-width on mobile | Low |

### Best Pattern to Copy
`leave-history.tsx` lines 97–182: Desktop table wrapped in `hidden md:block`, mobile card list in `md:hidden` with truncation and badges.

---

## Phase 1: Foundation — Responsive Padding & Spacing

**Files to modify:**
1. `src/components/shared/page-layout.tsx` (line 25)
2. `src/components/ui/card.tsx` (CardHeader, CardContent, CardFooter)
3. `src/app/[locale]/page.tsx` (home page — lines 97-98)

### Tasks

#### 1.1 PageLayout main padding
**File:** `src/components/shared/page-layout.tsx:25`
```
Change: className="flex-1 p-6"
To:     className="flex-1 p-4 sm:p-6"
```
This reclaims 16px (8px each side) on mobile — content area goes from 327px to 343px on a 375px phone.

#### 1.2 Card responsive padding
**File:** `src/components/ui/card.tsx`
```
CardHeader: Change p-6 → p-4 sm:p-6
CardContent: Change p-6 pt-0 → p-4 pt-0 sm:p-6 sm:pt-0
CardFooter: Change p-6 pt-0 → p-4 pt-0 sm:p-6 sm:pt-0
```

#### 1.3 Home page spacing
**File:** `src/app/[locale]/page.tsx`
- Line 98: Change `mb-8` → `mb-4 sm:mb-8`
- Line 109: Already responsive (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) — no change needed

#### 1.4 Any page that duplicates layout (not using PageLayout)
Search for other pages using inline `p-6` on `<main>` and apply `p-4 sm:p-6`.

### Verification
- [ ] `grep -r "flex-1 p-6" src/` returns 0 matches (all converted to responsive)
- [ ] Visual check: home page on 375px wide viewport shows comfortable card spacing
- [ ] No content overflow on 320px width

---

## Phase 2: Mobile Card Views for Tables

**Goal:** Replace horizontal-scrolling tables with card lists on mobile (`md:hidden`).

### Tasks

#### 2.1 Smart Claims History — mobile card view
**File:** `src/components/claims/smart-claims-page.tsx` lines 448–497

Copy the pattern from `leave-history.tsx` lines 97–182:

1. Wrap existing `<table>` in `<div className="hidden md:block overflow-x-auto">`
2. Add new `<div className="md:hidden divide-y divide-gray-100">` block
3. Each card row shows:
   - **Row 1:** Claim type icon + Merchant name + Status badge (right-aligned)
   - **Row 2:** Date + Amount (bold, right-aligned)
   - **Row 3:** Claim ID (small, gray) — omit OCR confidence on mobile (not essential)
4. Make each card tappable to view details

**Data to HIDE on mobile:** OCR Confidence column, Claim ID (show only in detail view)
**Data to SHOW:** Type, Merchant, Date, Amount, Status

#### 2.2 Quick Approve RequestList — mobile card view
**File:** `src/components/quick-approve/RequestList.tsx` lines 158–240

1. Wrap existing `<table>` in `<div className="hidden md:block overflow-x-auto">`
2. Add `<div className="md:hidden divide-y divide-gray-100">` for mobile
3. Each card shows:
   - **Row 1:** Checkbox + Requester name + Urgency badge
   - **Row 2:** Request type icon + Description (1 line truncated)
   - **Row 3:** Submitted date (small, gray)
4. Keep batch action buttons (Approve All / Reject All) visible above the list

**Data to HIDE on mobile:** Description column (show truncated 1-line only), Submitted date (move to secondary line)

#### 2.3 Filter bar responsiveness (Quick Approve)
**File:** `src/components/quick-approve/RequestList.tsx`
- Remove `min-w-[200px]` from search input on mobile
- Date filter inputs: hide date range on mobile, show a single "Period" dropdown or collapse behind a filter icon button

### Verification
- [ ] Smart Claims history shows card list below 768px
- [ ] Quick Approve shows card list below 768px
- [ ] No horizontal scroll needed on either page at 375px
- [ ] All interactive elements (checkboxes, badges, buttons) have ≥44px touch targets

---

## Phase 3: Mobile-Friendly Modals (Bottom Sheet Pattern)

**Goal:** Convert centered modals to bottom-sheet drawers on mobile for thumb-friendly interaction.

### Tasks

#### 3.1 Enhance Modal component
**File:** `src/components/ui/modal.tsx`

Add mobile bottom-sheet behavior:
```tsx
// Inside the dialog content wrapper:
// Desktop (md+): centered card with max-w-lg (existing)
// Mobile (<md): fixed bottom, full-width, rounded-top, max-h-[85vh], scrollable

<div className={cn(
  'bg-white w-full overflow-y-auto',
  // Mobile: bottom sheet
  'fixed bottom-0 inset-x-0 rounded-t-2xl max-h-[85vh] animate-slide-up',
  // Desktop: centered dialog
  'md:static md:rounded-xl md:max-w-lg md:max-h-none md:animate-none',
  className
)}>
```

Add a drag indicator bar on mobile:
```tsx
<div className="md:hidden flex justify-center pt-2 pb-1">
  <div className="w-10 h-1 bg-gray-300 rounded-full" />
</div>
```

Add CSS animation in `globals.css`:
```css
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
```

#### 3.2 Apply to existing modal usages
Verify all pages using `<Modal>` work correctly with the new behavior:
- Leave request form modal
- Performance create goal modal
- Smart Claims detail modal
- Any confirmation dialogs

### Verification
- [ ] Modal opens as bottom sheet on 375px viewport
- [ ] Modal opens as centered card on 1024px viewport
- [ ] Scroll works inside modal when content exceeds 85vh
- [ ] Close button and backdrop click still work
- [ ] Drag indicator visible only on mobile

---

## Phase 4: Mobile Information Density Optimization

**Goal:** ลดข้อมูลที่ไม่จำเป็นต้องแสดงบนมือถือ เพื่อให้อ่านง่ายขึ้น

### Tasks

#### 4.1 Home page — simplify quick action cards on mobile
**File:** `src/app/[locale]/page.tsx`
- Hide card descriptions on mobile, show only icon + title:
  ```tsx
  <p className="text-sm text-gray-500 hidden sm:block">{item.description}</p>
  ```
- Reduce icon box size on mobile: `w-8 h-8 sm:w-10 sm:h-10`

#### 4.2 Leave Balance — compact mobile cards
**File:** `src/components/leave/leave-balance.tsx`
- On mobile, show only: Leave type name + remaining days (bold) + used/total (small text)
- Hide the progress bar on mobile:
  ```tsx
  <div className="hidden sm:block mt-2 w-full bg-gray-200 rounded-full h-2">
  ```

#### 4.3 Profile header — streamline for mobile
**File:** `src/components/profile/profile-header.tsx`
- Hide employee ID and department badge on mobile (show in profile details instead)
- Stack action buttons full-width on mobile:
  ```tsx
  <div className="flex gap-2 w-full sm:w-auto">
    <Button className="flex-1 sm:flex-none" ...>
  ```
- Add `truncate` to email address

#### 4.4 Smart Claims new claim — compact upload zone
**File:** `src/components/claims/smart-claims-page.tsx`
- Change upload area: `p-6 sm:p-12`
- Change step indicator dividers: `w-8 sm:w-12` or use `flex-1 max-w-[48px]`
- Hide policy sidebar summary items on mobile that aren't immediately useful (show only limits)

#### 4.5 Payslip expanded detail — 2-column on tablet, stacked on mobile
**File:** `src/app/[locale]/payslip/page.tsx`
- Already uses `grid-cols-1 md:grid-cols-2` — verify this is correct
- On mobile, show only the 3 most important earnings/deductions, with "Show all" toggle
- Mask amounts by default (already done), ensure toggle button is full-width on mobile

#### 4.6 Workflow cards — reduce info on mobile
**File:** `src/components/workflows/workflow-list.tsx`
- Hide timestamps on mobile, show only "2h ago" relative time
- Truncate descriptions to 1 line on mobile with `line-clamp-1`
- Make approve/reject buttons full-width stacked on mobile:
  ```tsx
  <div className="flex flex-col sm:flex-row gap-2">
  ```

### Verification
- [ ] Home page cards show icon + title only on mobile
- [ ] Leave balance cards are compact on mobile (no progress bars)
- [ ] Profile header doesn't overflow, buttons are full-width
- [ ] Claims upload zone is compact
- [ ] Workflow cards are scannable with 1-line descriptions

---

## Phase 5: Touch Interaction & Mobile UX Polish

**Goal:** Ensure all interactive elements are thumb-friendly and the app feels native-like on mobile.

### Tasks

#### 5.1 Toast full-width on mobile
**File:** `src/components/ui/toast.tsx`
```
Change: fixed bottom-4 right-4
To:     fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto
```

#### 5.2 Mobile menu improvements
**File:** `src/components/shared/mobile-menu.tsx`
- Group menu items with section headers (Self Service, Organization, etc.) matching sidebar
- Add user info at the top of the drawer (avatar + name + role)
- Add logout button at the bottom of the drawer

#### 5.3 Touch targets audit
Ensure ALL interactive elements have minimum 44x44px touch targets:
- Checkboxes in Quick Approve
- Tab items in Tabs component
- Calendar date cells in leave calendar
- Pagination buttons
- Any small icon buttons

#### 5.4 Pull-to-refresh indicator (optional enhancement)
For key data pages (Home, Leave Balance, Workflows):
- Add a visual "Updated at: X:XX PM" timestamp
- On mobile, show a subtle refresh button at the top

#### 5.5 Sticky action buttons on mobile
For pages with primary actions (Leave Request submit, Claims submit):
- Make the submit/action button sticky at the bottom of the viewport on mobile:
  ```tsx
  <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg md:static md:shadow-none md:border-0 md:p-0">
    <Button className="w-full md:w-auto">Submit</Button>
  </div>
  ```
- Add `pb-20` padding to the form container on mobile to account for the sticky button

### Verification
- [ ] Toast appears full-width on 375px viewport
- [ ] Mobile menu has grouped sections and user info
- [ ] All touch targets ≥ 44x44px (spot check with browser dev tools)
- [ ] Sticky submit buttons visible on leave request and claims pages
- [ ] No content hidden behind sticky buttons (padding applied)

---

## Phase 6: Final Verification & E2E Testing

### Tasks

#### 6.1 Visual regression check
Using Playwright MCP, take screenshots at **375px width** (iPhone SE) for:
1. Home page
2. Leave management (balance + request form + calendar)
3. Payslip (list + expanded detail)
4. Profile page
5. Smart Claims (new claim + history)
6. Quick Approve
7. Workflows
8. Mobile menu open

#### 6.2 Interaction testing
- Open and close mobile menu
- Submit a leave request via bottom-sheet modal
- Navigate through tabs on leave page
- Scroll through Smart Claims history (card view)
- Batch approve in Quick Approve
- Toggle language

#### 6.3 Edge cases
- Test at 320px width (smallest common phone)
- Test with long Thai text (ภาษาไทยมักยาวกว่า English)
- Test with many items in lists (scroll performance)
- Verify no horizontal overflow on any page

### Success Criteria
- [ ] No horizontal scroll needed on any page at 375px
- [ ] All forms are usable without zooming
- [ ] All buttons/links have ≥ 44px touch targets
- [ ] Information density is appropriate — key data visible without scrolling far
- [ ] Modal dialogs open as bottom sheets on mobile
- [ ] Tables replaced with card views on mobile
- [ ] Thai/English toggle works on all mobile views
- [ ] No JavaScript console errors

---

## Anti-Pattern Guards

- ❌ Do NOT use `@media` queries in CSS — use Tailwind responsive prefixes only
- ❌ Do NOT add JavaScript viewport detection hooks unless absolutely necessary (prefer CSS)
- ❌ Do NOT hide critical data on mobile — reduce secondary info, not primary
- ❌ Do NOT change desktop layout while fixing mobile
- ❌ Do NOT use fixed pixel widths on mobile containers
- ❌ Do NOT add new npm packages for mobile layout (use Tailwind only)
- ❌ Do NOT break existing E2E tests — desktop behavior must remain unchanged

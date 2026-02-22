# Org Chart UX Improvement Design

**Date:** 2026-02-22
**Status:** Approved
**Approach:** Option 1 — Me-Centered View + Side Panel

---

## Problem

Users find the org chart hard to navigate because:
1. **Drag vs Click conflict** — dragging to pan accidentally triggers node clicks, navigating away from the chart
2. **No "me" anchor** — chart loads at root (CEO level), user must scroll/pan to find themselves
3. **No preview** — clicking a node immediately navigates to the full profile page, losing org chart context

## Primary Use Case

Users open the org chart to:
1. See who their direct manager is
2. See who their direct reports are
3. Then explore upward/downward from there

---

## Design

### 1. Fix Drag vs Click Conflict

Introduce a **drag threshold** of 5px. Mouse movement under 5px is treated as a click; over 5px is treated as a drag/pan.

- Track `hasDragged` flag in mousedown/mousemove
- Only fire `handleNodeClick` if `!hasDragged`
- Reset `hasDragged` on mouseup

### 2. Me-Centered View on Load

On `init()`, after `fitToScreen()`:
- Find the current user's node (`data-employee-id` matching `currentUser.employeeId`)
- Scroll/translate the canvas to center that node in the viewport
- Highlight the node with existing `border-cg-red` style (already implemented)

### 3. Employee Side Panel

When a node is clicked (and not dragged), open a **slide-in side panel** from the right side of the org chart canvas.

**Panel content:**
- Employee photo (large, 64px)
- Full name + title
- Department / Cost Center
- Email and phone number (from mock employee data)
- Direct reports count + avatars (up to 3, then "+N more")
- Manager name + avatar
- CTA button: "View Full Profile" → navigates to `#/profile/{employeeId}`
- Close button (X) in top-right corner

**Behavior:**
- Panel overlays the right portion of the canvas (width: 320px)
- Canvas panning still works when panel is open
- Clicking another node updates the panel (doesn't close and reopen)
- Clicking outside the panel or pressing Escape closes it
- Panel is not shown for vacant nodes

**Layout:**
```
┌─────────────────────────────┬──────────────────┐
│                             │  [X]             │
│      Org Chart Canvas       │  [Photo]         │
│      (pannable/zoomable)    │  Name            │
│                             │  Title           │
│                             │  Dept / CC       │
│                             │  📧 email        │
│                             │  📞 phone        │
│                             │  ──────────────  │
│                             │  Manager: [img]  │
│                             │  Reports: [imgs] │
│                             │  ──────────────  │
│                             │ [View Full Profile]│
└─────────────────────────────┴──────────────────┘
```

---

## Files to Change

| File | Change |
|------|--------|
| `apps/js/components/org-chart.js` | Fix drag threshold, add `centerOnCurrentUser()`, add `renderSidePanel()`, update `handleNodeClick()`, update `init()` |
| `apps/locales/en.json` | Add side panel i18n keys |
| `apps/locales/th.json` | Add side panel i18n keys (Thai) |

---

## Out of Scope

- Minimap click-to-navigate (separate task)
- Mobile pinch-to-zoom improvements
- Search by name within org chart

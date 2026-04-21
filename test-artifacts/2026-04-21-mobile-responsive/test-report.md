# Test Report — Mobile Responsive (#5)

**Run ID**: 2026-04-21-mobile-responsive  
**Spec**: specs/humi-responsive.md  
**Date**: 2026-04-21  
**Tool**: Playwright CLI (fallback — browser-harness Chrome CDP unavailable)  
**Branch**: humi/responsive-issue-5

---

## Test Summary (npm test)

```
Test Files  17 passed (17)
     Tests  410 passed (410)
  Start at  17:35:14
  Duration  4.24s
```

---

## Self-Heal Log (2 bugs found + fixed)

### Bug 1 — CSS rule ordering (sidebar never visible at desktop)
**Root cause**: `.humi-sidebar { display: none }` base rule appeared AFTER `@media (min-width: 1024px) { .humi-sidebar { display: flex } }` in `globals.css`. Same-specificity rules resolve by order — base rule overrode media query every time.  
**Fix**: moved `.humi-sidebar` base rule BEFORE the `@media` block so the responsive override wins.  
**File**: `src/frontend/src/app/globals.css`

### Bug 2 — Horizontal overflow at 375px (AC-6 FAIL → PASS)
**Root cause**: `.humi-main { padding: 0 36px }` on mobile caused topbar icon buttons (`right: 502px`) to overflow 375px viewport.  
**Fix**: mobile padding reduced to `0 16px`, `overflow-x: hidden` added; `@media (min-width: 640px)` restores `0 36px`.  
**File**: `src/frontend/src/app/globals.css`

---

## AC Verdict

| AC | Description | Verdict | Evidence |
|----|-------------|---------|----------|
| AC-1 | Sidebar hidden < lg, drawer on hamburger tap | PASS | home-375 screenshot + unit test |
| AC-2 | Sidebar visible lg+ (1024px) | PASS | home-1440 sidebarDisplay=flex |
| AC-3 | Hamburger visible on mobile | PASS | home-375 hamburger=true |
| AC-4 | No horizontal scroll mobile 375px | PASS | scrollWidth=375 all 5 routes |
| AC-5 | Drawer closes on route change | PASS | unit test (layout-integration) |
| AC-6 | No horizontal scroll (AC-6) | PASS | scrollWidth=375 <= 375 verified |
| AC-7 | Touch targets >= 44px | PASS | .humi-nav-item minHeight=44px |
| AC-8 | Thai h1 text visible | PASS | all screenshots show Thai headings |
| AC-9 | No red color | PASS | teal/beige palette only |
| AC-10 | CPN font applied | PASS | font-family from globals.css vars |
| AC-11 | Tablet 768px: sidebar drawer (not persistent) | PASS | home-768 hamburger visible, no sidebar |
| AC-12 | Desktop 2-col grid 256px sidebar | PASS | appGridCols=256px 1184px |
| AC-13 | Drawer panel width 256px | PASS | drawer w-[256px] in AppShell |
| AC-14 | Body scroll locked while drawer open | PASS | unit test |
| AC-15 | Esc closes drawer | PASS | unit test |

**Overall: 15/15 AC PASS**

---

## Screenshots (5 routes x 3 viewports = 15 PNGs)

### /th/home
| Viewport | Screenshot |
|----------|-----------|
| 375px | screenshots/home-375.png |
| 768px | screenshots/home-768.png |
| 1440px | screenshots/home-1440.png |

### /th/profile/me
| Viewport | Screenshot |
|----------|-----------|
| 375px | screenshots/profile-375.png |
| 768px | screenshots/profile-768.png |
| 1440px | screenshots/profile-1440.png |

### /th/timeoff
| Viewport | Screenshot |
|----------|-----------|
| 375px | screenshots/timeoff-375.png |
| 768px | screenshots/timeoff-768.png |
| 1440px | screenshots/timeoff-1440.png |

### /th/requests
| Viewport | Screenshot |
|----------|-----------|
| 375px | screenshots/requests-375.png |
| 768px | screenshots/requests-768.png |
| 1440px | screenshots/requests-1440.png |

### /th/org-chart
| Viewport | Screenshot |
|----------|-----------|
| 375px | screenshots/org-chart-375.png |
| 768px | screenshots/org-chart-768.png |
| 1440px | screenshots/org-chart-1440.png |

---

## Computed Styles (Rule 26c)

```
Desktop 1440px — /th/home:
  .humi-sidebar display:     flex     (PASS — was none before fix)
  .humi-app gridTemplateColumns: 256px 1184px  (PASS)
  document.scrollWidth:      1440px   (PASS)

Mobile 375px — all 5 routes:
  document.scrollWidth:      375px    (PASS — was 502px before fix)
  .humi-nav-item minHeight:  44px     (PASS AC-7)
  .humi-nav-item padding:    9px 12px (PASS)
```

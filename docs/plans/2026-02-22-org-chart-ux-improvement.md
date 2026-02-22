# Org Chart UX Improvement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix drag-vs-click conflict, auto-center on current user, and add a slide-in side panel for employee preview without leaving the org chart.

**Architecture:** All changes are in `apps/js/components/org-chart.js` (vanilla JS IIFE module). Side panel is rendered inside the `org-chart-main` container. Drag threshold of 5px separates pan from click. Employee data for the panel is fetched from `MockOrgStructure` nodes which already contain email/phone.

**Tech Stack:** Vanilla JS, Tailwind CSS, Material Icons, existing `i18n`, `AppState`, `Router` globals.

---

### Task 1: Fix Drag vs Click Conflict

**Files:**
- Modify: `apps/js/components/org-chart.js` (state block ~line 9, handleMouseDown ~line 627, handleMouseMove ~line 641, handleMouseUp ~line 652, handleNodeClick ~line 921, handleTouchStart ~line 661, handleTouchEnd ~line 689)

**Step 1: Add `hasDragged` and `dragStartX/Y` to state**

In the `state` object (line ~9), add:
```javascript
hasDragged: false,
dragStartX: 0,
dragStartY: 0,
```

Also add to `resetState()` function:
```javascript
hasDragged: false,
dragStartX: 0,
dragStartY: 0,
```

**Step 2: Track drag start position in `handleMouseDown`**

Replace the existing `handleMouseDown`:
```javascript
handleMouseDown(e) {
    if (e.target.closest('button')) return; // allow buttons, but NOT org-node

    state.isDragging = true;
    state.hasDragged = false;
    state.dragStartX = e.clientX;
    state.dragStartY = e.clientY;
    state.startX = e.clientX - state.translateX;
    state.startY = e.clientY - state.translateY;

    const canvas = document.getElementById('org-chart-canvas');
    if (canvas) canvas.style.cursor = 'grabbing';
},
```

**Step 3: Set `hasDragged` flag in `handleMouseMove`**

Replace `handleMouseMove`:
```javascript
handleMouseMove(e) {
    if (!state.isDragging) return;

    const dx = Math.abs(e.clientX - state.dragStartX);
    const dy = Math.abs(e.clientY - state.dragStartY);
    if (dx > 5 || dy > 5) {
        state.hasDragged = true;
    }

    state.translateX = e.clientX - state.startX;
    state.translateY = e.clientY - state.startY;
    this.updateTransform();
},
```

**Step 4: Update `handleNodeClick` to guard against drag**

Replace the `onclick` on each node card (in `renderNode`) — change from inline `onclick` to using a data attribute, then handle in `init()`. Actually, the simpler fix: update `handleNodeClick` to check `hasDragged`. Replace the method:
```javascript
handleNodeClick(employeeId) {
    // Ignore clicks that were actually drags
    if (state.hasDragged) return;

    const currentUser = AppState.get('currentUser');

    if (typeof RBAC !== 'undefined' && !RBAC.canViewEmployee(employeeId) && employeeId !== currentUser?.employeeId) {
        ToastComponent.info(i18n.isThai()
            ? 'คุณไม่มีสิทธิ์ดูข้อมูลพนักงานนี้'
            : 'You do not have permission to view this employee');
        return;
    }

    this.openSidePanel(employeeId);
},
```

**Step 5: Reset `hasDragged` in `handleMouseUp`**

Replace `handleMouseUp`:
```javascript
handleMouseUp() {
    state.isDragging = false;
    // Note: do NOT reset hasDragged here — it must persist until after onclick fires
    // Reset it after a microtask so the click handler can check it
    setTimeout(() => { state.hasDragged = false; }, 0);
    const canvas = document.getElementById('org-chart-canvas');
    if (canvas) canvas.style.cursor = 'grab';
},
```

**Step 6: Also fix touch — update `handleTouchEnd`**

Replace `handleTouchEnd`:
```javascript
handleTouchEnd() {
    state.isDragging = false;
    setTimeout(() => { state.hasDragged = false; }, 0);
},
```

**Step 7: Verify manually**

- Open http://localhost:8080 → Employment tab → Org Chart
- Try dragging across several nodes — should NOT navigate away
- Click a node without dragging — should trigger (currently navigates, will be fixed in Task 3)

**Step 8: Commit**
```bash
git add apps/js/components/org-chart.js
git commit -m "fix: resolve drag-vs-click conflict in org chart with 5px threshold"
```

---

### Task 2: Auto-Center on Current User

**Files:**
- Modify: `apps/js/components/org-chart.js` (`init()` ~line 599, add new method `centerOnCurrentUser()`)

**Step 1: Add `centerOnCurrentUser()` method**

Add this method after `fitToScreen()` (~line 853):
```javascript
/**
 * Center the canvas view on the current user's node
 */
centerOnCurrentUser() {
    const currentUser = AppState.get('currentUser');
    if (!currentUser?.employeeId) return;

    const canvas = document.getElementById('org-chart-canvas');
    const node = document.querySelector(`[data-employee-id="${currentUser.employeeId}"]`);
    if (!canvas || !node) return;

    const canvasRect = canvas.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();

    // Calculate where the node currently is relative to canvas, accounting for current transform
    const nodeCenterX = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
    const nodeCenterY = nodeRect.top + nodeRect.height / 2 - canvasRect.top;

    // Shift translate so node lands in center of canvas
    state.translateX += canvasRect.width / 2 - nodeCenterX;
    state.translateY += canvasRect.height / 2 - nodeCenterY;

    this.updateTransform();
},
```

**Step 2: Call `centerOnCurrentUser()` in `init()` after `fitToScreen()`**

In `init()` (~line 621), replace:
```javascript
// Center the chart initially
this.fitToScreen();
```
With:
```javascript
// Fit chart then center on current user
this.fitToScreen();
// Use setTimeout to ensure DOM has rendered before measuring
setTimeout(() => this.centerOnCurrentUser(), 100);
```

**Step 3: Verify manually**

- Reload http://localhost:8080 → Org Chart tab
- Chart should auto-scroll/center to the red-bordered node (Chatchai / current user)

**Step 4: Commit**
```bash
git add apps/js/components/org-chart.js
git commit -m "feat: auto-center org chart on current user on load"
```

---

### Task 3: Add i18n Keys for Side Panel

**Files:**
- Modify: `apps/locales/en.json` (inside `"orgChart"` block, after `"error"` key ~line 1368)
- Modify: `apps/locales/th.json` (same location)

**Step 1: Add keys to `en.json`**

Inside the `"orgChart"` object, after the `"error"` key, add:
```json
"viewProfile": "View Full Profile",
"sidePanel": {
    "manager": "Reports To",
    "directReports": "Direct Reports",
    "email": "Email",
    "phone": "Phone",
    "noManager": "No manager",
    "noDirectReports": "No direct reports",
    "andMore": "and {n} more"
}
```

**Step 2: Add keys to `th.json`**

Inside the `"orgChart"` object, after the `"error"` key, add:
```json
"viewProfile": "ดูโปรไฟล์เต็ม",
"sidePanel": {
    "manager": "รายงานต่อ",
    "directReports": "ผู้ใต้บังคับบัญชา",
    "email": "อีเมล",
    "phone": "เบอร์โทร",
    "noManager": "ไม่มีผู้จัดการ",
    "noDirectReports": "ไม่มีผู้ใต้บังคับบัญชา",
    "andMore": "และอีก {n} คน"
}
```

**Step 3: Commit**
```bash
git add apps/locales/en.json apps/locales/th.json
git commit -m "feat: add i18n keys for org chart side panel"
```

---

### Task 4: Add Side Panel — Render & State

**Files:**
- Modify: `apps/js/components/org-chart.js`
  - state block (~line 9): add `sidePanelEmployeeId`
  - `resetState()`: add same
  - `render()`: add side panel HTML slot
  - Add new methods: `renderSidePanel()`, `openSidePanel()`, `closeSidePanel()`

**Step 1: Add `sidePanelEmployeeId` to state**

In state object and `resetState()`:
```javascript
sidePanelEmployeeId: null,
```

**Step 2: Add side panel slot in `render()` HTML**

In the `render()` method, inside `<div class="org-chart-main relative">`, add after the closing canvas div and minimap:
```javascript
<!-- Side Panel slot -->
<div id="org-chart-side-panel"></div>
```

The full `org-chart-main` block becomes:
```javascript
<div class="org-chart-main relative flex gap-0">
    <!-- Toolbar -->
    <div class="org-chart-toolbar absolute top-2 right-2 z-20 flex gap-2 bg-white rounded-lg shadow-md p-2" style="right: ${state.sidePanelEmployeeId ? '336px' : '8px'}">
        ${this.renderToolbar()}
    </div>

    <!-- Main canvas area -->
    <div id="org-chart-canvas"
         class="org-chart-canvas overflow-hidden bg-gray-50 rounded-lg border border-gray-200 flex-1"
         style="height: 600px; cursor: grab;"
         role="application"
         aria-label="${t('interactiveChart')}"
         tabindex="0">
        <div id="org-chart-content"
             class="org-chart-content"
             style="transform: translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale}); transform-origin: center center; transition: transform 0.1s ease-out;">
            ${orgData ? this.renderTree(orgData) : ''}
        </div>
    </div>

    <!-- Side Panel slot -->
    <div id="org-chart-side-panel">
        ${state.sidePanelEmployeeId ? this.renderSidePanel(state.sidePanelEmployeeId) : ''}
    </div>

    <!-- Minimap -->
    ${showMinimap ? this.renderMinimap(orgData) : ''}
</div>
```

**Step 3: Add `renderSidePanel(employeeId)` method**

Add after `renderMinimap()`:
```javascript
/**
 * Render the employee side panel
 */
renderSidePanel(employeeId) {
    if (!employeeId) return '';

    // Find node data from MockOrgStructure
    const orgData = typeof MockOrgStructure !== 'undefined'
        ? MockOrgStructure.buildOrgChartData({ showVacant: false, showDottedLines: false })
        : null;

    // Flatten tree to find the node
    const node = this.findNodeById(orgData, employeeId);
    if (!node) return '';

    const directReports = node.children || [];
    const visibleReports = directReports.slice(0, 3);
    const extraCount = directReports.length - visibleReports.length;

    return `
        <div class="org-side-panel w-80 bg-white border-l border-gray-200 shadow-xl flex flex-col animate-slide-in"
             style="height: 600px; overflow-y: auto;">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h3 class="text-sm font-semibold text-gray-700">${t('employee')}</h3>
                <button onclick="OrgChartComponent.closeSidePanel()"
                        class="p-1 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Close panel">
                    <span class="material-icons text-gray-500 text-lg">close</span>
                </button>
            </div>

            <!-- Employee info -->
            <div class="p-4 flex flex-col items-center text-center border-b border-gray-100">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mb-3">
                    <img src="${node.photo || 'https://via.placeholder.com/64'}"
                         alt="${node.name}"
                         class="w-full h-full object-cover"
                         onerror="this.src='https://via.placeholder.com/64?text=${encodeURIComponent(node.name?.charAt(0) || 'U')}'">
                </div>
                <p class="font-semibold text-gray-900">${node.name}</p>
                <p class="text-sm text-gray-500 mt-0.5">${node.title}</p>
                ${node.costCenter ? `
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="material-icons text-xs align-middle">account_balance</span>
                        ${node.costCenter}
                    </p>
                ` : ''}
            </div>

            <!-- Contact info -->
            <div class="p-4 border-b border-gray-100 space-y-2">
                ${node.email ? `
                    <div class="flex items-center gap-2 text-sm">
                        <span class="material-icons text-gray-400 text-base">email</span>
                        <a href="mailto:${node.email}" class="text-cg-red hover:underline truncate">${node.email}</a>
                    </div>
                ` : ''}
                ${node.phone ? `
                    <div class="flex items-center gap-2 text-sm">
                        <span class="material-icons text-gray-400 text-base">phone</span>
                        <span class="text-gray-700">${node.phone}</span>
                    </div>
                ` : ''}
            </div>

            <!-- Manager -->
            <div class="p-4 border-b border-gray-100">
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">${t('sidePanel.manager')}</p>
                ${node.manager ? `
                    <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition"
                         onclick="OrgChartComponent.openSidePanel('${node.manager.employeeId}')">
                        <img src="${node.manager.photo || 'https://via.placeholder.com/32'}"
                             alt="${node.manager.name}"
                             class="w-8 h-8 rounded-full object-cover border border-gray-200">
                        <div class="min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">${node.manager.name}</p>
                            <p class="text-xs text-gray-500 truncate">${node.manager.title}</p>
                        </div>
                    </div>
                ` : `<p class="text-sm text-gray-400">${t('sidePanel.noManager')}</p>`}
            </div>

            <!-- Direct Reports -->
            <div class="p-4 border-b border-gray-100">
                <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    ${t('sidePanel.directReports')} (${directReports.length})
                </p>
                ${directReports.length === 0 ? `
                    <p class="text-sm text-gray-400">${t('sidePanel.noDirectReports')}</p>
                ` : `
                    <div class="space-y-1">
                        ${visibleReports.map(r => `
                            <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition"
                                 onclick="OrgChartComponent.openSidePanel('${r.employeeId}')">
                                <img src="${r.photo || 'https://via.placeholder.com/28'}"
                                     alt="${r.name}"
                                     class="w-7 h-7 rounded-full object-cover border border-gray-200">
                                <div class="min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">${r.name}</p>
                                    <p class="text-xs text-gray-500 truncate">${r.title}</p>
                                </div>
                            </div>
                        `).join('')}
                        ${extraCount > 0 ? `
                            <p class="text-xs text-gray-400 pl-1">
                                ${t('sidePanel.andMore').replace('{n}', extraCount)}
                            </p>
                        ` : ''}
                    </div>
                `}
            </div>

            <!-- CTA -->
            <div class="p-4 mt-auto sticky bottom-0 bg-white border-t border-gray-100">
                <button onclick="Router.navigate('profile', { id: '${node.employeeId}' })"
                        class="w-full bg-cg-red text-white py-2 px-4 rounded-lg hover:bg-red-700 transition text-sm font-medium">
                    ${t('viewProfile')}
                </button>
            </div>
        </div>
    `;
},
```

**Step 4: Add `findNodeById()` helper method**

Add after `renderSidePanel()`:
```javascript
/**
 * Find a node in the org tree by employeeId (BFS)
 */
findNodeById(root, employeeId) {
    if (!root) return null;
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node.employeeId === employeeId) return node;
        if (node.children) queue.push(...node.children);
    }
    return null;
},
```

**Step 5: Add `openSidePanel()` and `closeSidePanel()` methods**

Add after `findNodeById()`:
```javascript
/**
 * Open the side panel for an employee
 */
openSidePanel(employeeId) {
    if (state.hasDragged) return;
    state.sidePanelEmployeeId = employeeId;
    const panelSlot = document.getElementById('org-chart-side-panel');
    if (panelSlot) {
        panelSlot.innerHTML = this.renderSidePanel(employeeId);
    }
    // Move toolbar left to avoid panel overlap
    const toolbar = document.querySelector('.org-chart-toolbar');
    if (toolbar) toolbar.style.right = '336px';
},

/**
 * Close the side panel
 */
closeSidePanel() {
    state.sidePanelEmployeeId = null;
    const panelSlot = document.getElementById('org-chart-side-panel');
    if (panelSlot) panelSlot.innerHTML = '';
    // Restore toolbar position
    const toolbar = document.querySelector('.org-chart-toolbar');
    if (toolbar) toolbar.style.right = '8px';
},
```

**Step 6: Update `handleNodeClick` to call `openSidePanel`** (already done in Task 1 Step 4)

Verify it reads:
```javascript
handleNodeClick(employeeId) {
    if (state.hasDragged) return;
    // ...permission check...
    this.openSidePanel(employeeId);
},
```

**Step 7: Add Escape key support in `handleKeydown`**

In the `handleKeydown` switch statement, add before `default`:
```javascript
case 'Escape':
    this.closeSidePanel();
    return;
```

**Step 8: Check that `MockOrgStructure` nodes have `email`, `phone`, and `manager` fields**

Run in browser console on org chart page:
```javascript
MockOrgStructure.buildOrgChartData({}).email
// Should return a string like 'suthep.t@central.co.th'
```

If `manager` field is missing from nodes, check `mock-org-structure.js` to see how to get parent. If not available on the node itself, you can skip manager display for now (show nothing) — the node does have `managerId` in the raw data.

**Step 9: Verify manually**

- Reload org chart
- Click any employee node (without dragging) → side panel slides in from right
- Panel shows name, title, email, phone, manager, direct reports
- Click another node → panel updates in place
- Press Escape → panel closes
- Click X button → panel closes
- "View Full Profile" button → navigates to profile page

**Step 10: Commit**
```bash
git add apps/js/components/org-chart.js apps/locales/en.json apps/locales/th.json
git commit -m "feat: add employee side panel to org chart with drag-safe click handling"
```

---

### Task 5: Handle Missing Manager Data in Side Panel

**Files:**
- Modify: `apps/js/data/mock-org-structure.js` — check if nodes include parent/manager reference
- Modify: `apps/js/components/org-chart.js` — `findNodeById` or `renderSidePanel` if needed

**Step 1: Check if nodes have manager data**

Search `mock-org-structure.js` for how `buildOrgChartData` builds nodes. Look for `managerId`, `manager`, or parent references. If nodes don't have a `manager` property, build a parent map during render.

**Step 2: If manager is not on the node, add a parent lookup**

In `openSidePanel()`, before calling `renderSidePanel()`, build a parent map:
```javascript
openSidePanel(employeeId) {
    if (state.hasDragged) return;
    state.sidePanelEmployeeId = employeeId;

    // Build parent map if not cached
    if (!state.parentMap) {
        state.parentMap = {};
        const orgData = typeof MockOrgStructure !== 'undefined'
            ? MockOrgStructure.buildOrgChartData({ showVacant: false })
            : null;
        this.buildParentMap(orgData, null, state.parentMap);
    }

    const panelSlot = document.getElementById('org-chart-side-panel');
    if (panelSlot) {
        panelSlot.innerHTML = this.renderSidePanel(employeeId);
    }
    const toolbar = document.querySelector('.org-chart-toolbar');
    if (toolbar) toolbar.style.right = '336px';
},
```

Add `buildParentMap()` helper:
```javascript
buildParentMap(node, parentNode, map) {
    if (!node) return;
    if (parentNode) map[node.employeeId] = parentNode;
    (node.children || []).forEach(child => this.buildParentMap(child, node, map));
},
```

Then in `renderSidePanel()`, get manager from the map:
```javascript
const manager = state.parentMap?.[employeeId] || null;
// use manager.name, manager.title, manager.photo, manager.employeeId
```

Also add `parentMap: null` to state and `resetState()`.

**Step 3: Verify manager shows correctly**

- Click Chatchai's node → manager should show "Prawit Wongsuwan, Head of Product"
- Click root node (Suthep) → manager section shows "No manager"

**Step 4: Commit**
```bash
git add apps/js/components/org-chart.js
git commit -m "fix: add parent map for manager lookup in org chart side panel"
```

---

### Task 6: Final Polish & Slide-In Animation

**Files:**
- Modify: `apps/index.html` or `apps/js/components/org-chart.js` — add CSS transition

**Step 1: Add slide-in animation**

In `apps/index.html`, inside the `<style>` tag (or add one if not present), add:
```css
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
}
.animate-slide-in {
    animation: slideInRight 0.2s ease-out;
}
```

**Step 2: Verify animation**

- Reload org chart
- Click a node — side panel should slide in smoothly from the right

**Step 3: Final end-to-end check**

- [ ] Dragging across nodes does NOT navigate away
- [ ] Chart auto-centers on current user (Chatchai) on load
- [ ] Clicking a node opens side panel without navigating away
- [ ] Side panel shows: photo, name, title, cost center, email, phone, manager, direct reports
- [ ] Clicking manager/report name in panel navigates within the panel (updates panel)
- [ ] "View Full Profile" navigates to profile page
- [ ] Escape key closes panel
- [ ] X button closes panel
- [ ] Thai/English i18n works

**Step 4: Commit**
```bash
git add apps/index.html
git commit -m "feat: add slide-in animation for org chart side panel"
```

---

### Task 7: Commit & Push

```bash
git log --oneline -6
git push origin claude/youthful-sinoussi
```

Verify all 5 commits are pushed, then create a PR from `claude/youthful-sinoussi` → `main`.

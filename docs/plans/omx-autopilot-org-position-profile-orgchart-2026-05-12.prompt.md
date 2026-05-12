# OMX Autopilot Task — Complete Org/Position UI and Profile Org Chart Link

พี่เคน requested: "เรา autopilot org/position ให้ ui ครบก่อน ตอนนี้มีแล้ว แต่ไม่สมบูณ์ และพนักงานยังกดดู org chart จาก profile ได้ด้วย"

## Goal

Finish the employee-facing UI slice for organization/position before deeper backend work:

1. Complete the current Org/Position UI that already exists but is incomplete.
2. Ensure employees can access/view the org chart from their profile.
3. Preserve current `profile/me` tabs and TH/EN switch behavior.
4. Follow Humi design system conventions in `src/frontend`.

## Repo Context

- Repo: `/Users/tachongrak/Projects/hr`
- Active frontend: `src/frontend`
- Framework: Next.js 16 App Router, React 19, TypeScript
- Important route: `src/frontend/src/app/[locale]/profile/me/page.tsx`
- Profile tabs are managed via `src/frontend/src/components/profile/profile-tabs.tsx` and `src/frontend/src/stores/humi-profile-slice.ts`
- Locale files: `src/frontend/messages/th.json`, `src/frontend/messages/en.json`
- Mock/reference data likely in `src/frontend/src/lib/humi-mock-data.ts` and related lib files

## Constraints

- Worktree is already dirty from prior work. Do **not** revert or overwrite unrelated existing changes.
- Make surgical changes only for Org/Position + profile org chart access.
- Prefer additive code and tests.
- No new dependencies unless absolutely necessary.
- Avoid internal source labels such as `SF:` in visible product UI.
- Use Humi tokens/components; no legacy card styling or hardcoded red tones.
- Employee profile must remain self-service friendly. Org/position is mainly read-only for employees unless current code already supports edit workflow.

## Expected UX

On employee profile (`/[locale]/profile/me`):

- Employment / Job tab should clearly show organization and position information, not just a sparse job card.
- Include useful organization/position fields such as:
  - Position title / job title
  - Position code or job code if available
  - Department / business unit / division / company if available
  - Location / cost center if available
  - Manager / reports-to if available
  - Employment type / status if already in data
- Add a clear employee action/link/button to view org chart from profile.
  - The link should route to an existing org chart page if one exists.
  - If no route exists, implement the smallest Humi-styled org chart page/prototype under the locale route using existing mock data.
  - Keep it employee-safe: current user centered, manager above, direct teammates/reports if data supports it.
- Ensure TH/EN labels exist and the UI works in both locales.

## Implementation Approach

1. Inspect current org/position-related files/routes/tests before editing.
2. Add or update focused tests first where practical:
   - profile employment tab renders org/position fields
   - profile has a "view org chart" action/link
   - org chart route renders current employee context
3. Run the focused test and confirm it fails for the missing behavior.
4. Implement minimal UI/data changes to pass.
5. Run focused tests, then broader frontend tests/build as appropriate.

## Verification Commands

Run from `src/frontend`:

```bash
npm test -- --run <focused-test-file-or-pattern>
npm run build
```

If build is too slow or blocked, report exactly what was run and the blocker.

## Final Report

Return concise Thai summary with:

- Files changed
- Tests/build run and result
- Any remaining TODO/blocker

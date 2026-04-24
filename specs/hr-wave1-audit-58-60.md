# Wave 1 Audit — #58 AttachmentDropzone + #60 Zustand Hydration

**Tracking**: aeiouboy/hr#71
**Date**: 2026-04-24

## #58 — AttachmentDropzone rollout audit

**Claimed target routes** (from issue body "grep suggests likely"):
- `/admin/employees/[id]/transfer/page.tsx`
- `/admin/employees/[id]/rehire/page.tsx`
- `/admin/employees/[id]/contract-renewal/page.tsx`
- `/admin/employees/[id]/promotion/page.tsx`

**Audit method**:
```bash
for r in transfer rehire contract-renewal promotion; do
  grep -n 'input.*type="file"|attachment|Attach|AttachmentDropzone|FileUploadField|แนบเอกสาร|แนบไฟล์' \
    src/frontend/src/app/[locale]/admin/employees/[id]/$r/page.tsx
done
```

**Result**: 0 hits across all 4 routes.

**Conclusion**: None of these 4 routes currently have attachment fields. Issue body assumption was incorrect. No conversion work needed.

**What actually uses AttachmentDropzone** (per #50 commit `492ac83`):
- `StepBiographical` (in Hire wizard)
- `terminate/page.tsx`

Expertise (`mk3-builder.yaml` + `forge-frontend.yaml`) captures "Attachment fields = AttachmentDropzone" as the default pattern — new attachment fields added in future work will auto-use it. No legacy cleanup required.

**Status**: ✅ Close as audit-confirmed — no code changes needed.

---

## #60 — Zustand `_hasHydrated` guard audit

**Context**: Pattern discovered in #48 — race condition when Zustand persist async rehydrate runs after sync auth redirect. Fixed in `auth-store.ts` + `admin/layout.tsx` + `AppShell.tsx`.

**Risk model**: A persist store needs the `_hasHydrated` guard ONLY if its consumer makes a **synchronous** decision (redirect / conditional render / feature gate) based on the hydrated state before async rehydration completes.

**18 persist stores audited**:

| Store | Decision based on hydration state? | Guard needed? |
|---|---|---|
| `auth-store` | ✅ yes — `admin/layout.tsx` sync-gates render on `isAuthenticated` | ✅ **has guard** (#48) |
| `humi-announcements-slice` | No — view-state only | ❌ |
| `humi-benefits-slice` | No — view-state only | ❌ |
| `humi-goals-slice` | No — view-state only | ❌ |
| `humi-integrations-slice` | No — view-state only | ❌ |
| `humi-learning-slice` | No — view-state only | ❌ |
| `humi-profile-slice` | No — form/view state, no redirect | ❌ |
| `humi-requests-slice` | No — view-state only | ❌ |
| `humi-timeoff-slice` | No — form state only | ❌ |
| `workflow-approvals` | No — view-state only | ❌ |
| `useAdminSelfService` | No — form/view state | ❌ |
| `useDataManagement` | No — view-state only | ❌ |
| `useEmploymentEvents` | No — view-state only | ❌ |
| `useOrgUnits` | No — form/view state | ❌ |
| `useUsersPermissions` | No — view-state only | ❌ |
| `useHireWizard` | No — form draft, no routing decision | ❌ |
| `useProfileEdit` | No — form draft | ❌ |
| `useTimelines` | No — view state | ❌ |

**Audit criteria**: scanned each store's known consumers for `router.push` / `router.replace` / early-return render gates that depend on the store's boolean state synchronously at mount. Only `auth-store`'s `admin/layout.tsx` + `AppShell.tsx` pattern matched.

**Conclusion**: No additional stores need the guard. Pattern is correctly scoped. Future: if a new consumer adds sync gating on a persist store, add `_hasHydrated` to that store then.

**Status**: ✅ Close as audit-confirmed — no code changes needed.

---

## Summary

| Issue | Audit verdict | Code changes |
|---|---|---|
| #58 | No attachment fields in 4 claimed routes | None |
| #60 | Only auth-store needs guard (already has) | None |

Both issues close on audit evidence — no-op outcome is a legitimate result when the initial hypothesis (attachment fields exist / other stores have sync consumers) proves false on verification.

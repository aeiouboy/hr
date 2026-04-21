# Archive — 2026-04

โฟลเดอร์นี้เก็บ page ที่ถูก archive ออกจาก reference bundle เพราะไม่มีใน Humi design-ref bundle
(`docs/design-ref/shelfly-bundle/project/`) — ไม่ได้ลบทิ้งเพื่อ preserve history

## Pages ที่ archive

| Path เดิม | Path ใหม่ | Route ที่ควรใช้แทน |
|---|---|---|
| `src/app/[locale]/employees/page.tsx` | `employees/page.tsx` | `/profile/me` |
| `src/app/[locale]/employees/[id]/page.tsx` | `employees/[id]/page.tsx` | `/profile/me` |
| `src/app/[locale]/settings/page.tsx` | `settings/page.tsx` | `/integrations` |

## Redirect Policy

- `/employees` → `/profile/me`
- `/employees/[id]` → `/profile/me`
- `/settings` → `/integrations`

## เหตุผล

Pages เหล่านี้ถูก invent ขึ้นมานอก reference bundle ใน sprint #2 ก่อน PO direction lock (Issue #3)
ตาม Rule C8 (strict source-grounding) ทุก page ต้อง trace กลับ `docs/design-ref/shelfly-bundle/project/screens/`
Pages ที่ไม่มี reference จึงต้องถูก archive ออกจาก active routing

## Sprint

Archive ใน: sprint #3 (humi/continue-functional-issue-3)

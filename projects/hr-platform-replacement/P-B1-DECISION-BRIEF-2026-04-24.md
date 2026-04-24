# P-B1 Infrastructure Decision Brief

**Tracking**: aeiouboy/hr#62
**Prepared by**: JARVIS (Opus 4.7)
**Date**: 2026-04-24
**Status**: 🔴 Awaiting Ken decision → unblocks #63-#70 Sprint 2 backend chain

## TL;DR — Recommended stack

| Decision | Recommendation | One-line why |
|---|---|---|
| **DB Provider** | **Neon PostgreSQL** | Cashflow precedent (820 rows migrated 2026-04-21) — same org, proven path |
| **Auth** | **next-auth v5 (already installed)** | `5.0.0-beta.25` in package.json, fastest to working Sprint 2, B2C add later if SSO required |
| **Prisma scaffold** | **Port from `hr-db-schema.sql`** | Schema already designed PostgreSQL-native (~60 tables, UUID PKs, effective dating, JSONB metadata) |
| **Env strategy** | **Vercel env vars + Neon branches** | dev/staging/prod via Neon DB branching, mirrors deploy target |
| **Secrets** | **Vercel env vars** | Same as current `hr-opal-gamma` deploy — no new vault to operate |

**Total cost estimate Sprint 2**: $0 for pilot (Neon free tier 512MB + 3GB storage covers ~60 tables easily), $19/mo Neon Pro if needed for prod (same as Cashflow).

**If Ken approves** → I scaffold Prisma + wire next-auth + verify migration in 1-2h.

---

## Decision matrix — DB Provider (Q1)

| Option | Cost (pilot) | Cost (prod) | Neon-to-Vercel | Branching | Thai timezone | Verdict |
|---|---|---|---|---|---|---|
| **Neon** ✅ | $0 free tier | $19/mo | Native integration | Yes (free) | Any — UTC store, app layer converts | **Recommended** — Cashflow precedent |
| Supabase | $0 free tier | $25/mo | Good integration | Yes ($25+) | Any | Alternative — more features (Auth, Storage) but dup with next-auth |
| Vercel Postgres | $0 / 256MB | $15/mo + usage | Native | No | Any | Risky — smallest free tier, usage-based bills |
| Cloud SQL (GCP) | Always paid | ~$10-50/mo | Needs setup | Manual | Any | Heavyweight for Sprint 2 pilot |
| Internal / on-prem | Ops cost | Ops cost | Manual VPN | Manual | Any | Blocked on org ops capacity |

**Why Neon**:
- Org already ran migration there (Cashflow 2026-04-21, 820 rows, 485/569 tests green)
- Developer already knows ops model (save JARVIS onboarding time)
- Branch-per-PR deploy pattern works well with Vercel preview URLs (HR deploy target)
- Postgres native — matches `hr-db-schema.sql` design exactly (pgcrypto, JSONB, timestamptz)

---

## Decision matrix — Auth (Q2)

| Option | Status in HR | Setup effort | Meets Phase 2 req | Verdict |
|---|---|---|---|---|
| **next-auth v5** ✅ | `5.0.0-beta.25` already installed | 30 min (config + DB adapter) | Yes — email/password + session | **Recommended** — fastest path |
| Azure AD B2C | Not installed | 1-2 days (OMS precedent exists) | Yes + SSO to org | Phase 2.5+ if SSO required |
| Azure AD (SSO direct) | Not installed | Multi-day (AD tenant coordination) | Yes | Phase 3+ enterprise |

**Why next-auth v5**:
- Zero new dependencies — already in package.json
- Has Prisma Adapter — plugs directly into the scaffold
- Can layer B2C provider later without rewriting (next-auth v5 supports multiple providers)
- Unblocks Sprint 2 immediately; SSO/B2C = Phase 3 scope

**OMS precedent note**: OMS uses B2C for customer-facing login (memory `project_oms_login_b2c.md`). HR is INTERNAL employee-facing — different threat model. B2C's external-focused design isn't required for Sprint 2 admin pilot.

---

## Decision matrix — Prisma scaffold (Q3)

**Existing asset**: `projects/hr-platform-replacement/hr-db-schema.sql` — full schema ~60 tables already designed.

**Action**: Port SQL → Prisma schema via:
1. Use `prisma db pull` against a local Neon branch seeded with `hr-db-schema.sql`
2. Clean up (custom enum → Prisma enum, ltree/array types)
3. Commit `src/frontend/prisma/schema.prisma`

**Phase 0 F1 field catalog** (195 entries from `src/lib/admin/field-catalog.ts`) already aligns with hr-db-schema.sql tables — no re-design needed.

---

## Decision matrix — Env strategy (Q4)

**Proposed**:
```
Local dev    → Neon dev branch "dev" + local .env
PR preview   → Neon dev branch, Vercel preview URL
Staging      → Neon "staging" branch, Vercel preview URL
Production   → Neon main branch, hr-opal-gamma.vercel.app
```

**Why branch-per-env**:
- Zero-cost isolation (Neon free tier = 10 branches)
- Prisma migration runs per branch, no cross-env contamination
- Mirrors Cashflow pattern (proven)

---

## Decision matrix — Secrets (Q5)

| Option | Ops overhead | Verdict |
|---|---|---|
| **Vercel env vars** ✅ | 0 — already use for HR | **Recommended** — no new infra |
| AWS Secrets Manager | Medium (IAM + rotation) | Overkill for Sprint 2 |
| Vault (HashiCorp) | High | Phase 3+ if compliance requires |

---

## If Ken says "go with recommendations" — execution plan

1. **JARVIS scaffolds Prisma** (30 min):
   - Port `hr-db-schema.sql` → `src/frontend/prisma/schema.prisma`
   - Add `@@map` annotations for snake_case tables
   - Commit

2. **JARVIS wires next-auth v5** (30 min):
   - `src/frontend/src/lib/auth.ts` with Prisma adapter
   - `[...nextauth]/route.ts` handler
   - `.env.example` template

3. **JARVIS creates Neon DB** (Ken action — 5 min):
   - Sign up neon.tech (if not already)
   - Create project `hr-opal` + dev branch
   - Paste DATABASE_URL into Vercel env vars

4. **JARVIS runs migration** (10 min):
   - `prisma migrate dev --name init`
   - Seed from existing `src/frontend/src/data/admin/*.json` (companies, picklists)
   - Verify with `prisma studio`

5. **JARVIS updates #62 + closes** → unblocks #63-#70

**Total Ken time to unblock Sprint 2**: ~10 min (create Neon account + paste URL).

---

## Alternative: if Ken says "use Azure B2C + Cloud SQL"

Legitimate if org policy requires. Time cost:
- +1 day B2C setup (need org admin for tenant config)
- +0.5 day Cloud SQL setup (IAM + VPC + Cloud SQL Proxy)
- +0.5 day integration test

JARVIS can execute either path once Ken picks.

---

## Question to Ken

**ขอ Ken decision 5 ข้อ หรือ "เอาตาม recommend" ก็ได้ครับ**:
1. DB: **Neon** (default) / Supabase / Vercel Postgres / Cloud SQL / อื่น
2. Auth: **next-auth v5** (default) / Azure B2C / Azure AD / อื่น
3. Prisma scaffold: ✅ (port from existing SQL) — ไม่ต้องตัดสินใจ, ทำเลย
4. Env: **Neon branches + Vercel envs** (default) / อื่น
5. Secrets: **Vercel env vars** (default) / อื่น

ถ้าตอบ "1" = เอา default ทั้งหมด → JARVIS scaffold ทันที (~2h dev time + 10 min Ken to create Neon account).

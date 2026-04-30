"use strict";
// FieldDef — shared contract for every EC-Core field.
//
// One entry = one admin-visible field. Every entry MUST trace back to either
// a BRD row (`brdRow`) or a SAP SuccessFactors entity column (`sfEntity` +
// `sfField`) — preferably both. No invented fields (Rule C8 source-grounding).
//
// `flowsUsedIn` is the primary index the wizard-template factory queries via
// `getFieldsByFlow('hire' | 'rehire' | ...)`. `section` is the secondary
// index used when a flow wants to group fields (e.g. Hire cluster "Who" =
// identity + name + nationalId + biographical).
//
// Sources:
//   - BRD-EC-summary.md (207 requirements, 11 flows)
//     at projects/hr-platform-replacement/BRD-EC-summary.md
//   - docs/entity-schemas/** (69 SF entities)
//     at projects/hr-platform-replacement/docs/entity-schemas/
//
// Deliberately zero framework deps (no React / NestJS / Zod) so this is
// consumable by FE (Zustand + Zod) and future BE (Prisma + class-validator)
// without rework — per phase0-foundation-progressive-plan.md §Architecture.
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=types.js.map
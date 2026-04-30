"use strict";
// field-catalog barrel — public API for @hrms/shared consumers.
//
// Consumers:
//   Frontend   → Zustand slice generation + Zod schema emission
//   Future BE  → Prisma model snippets + class-validator DTO skeletons
//
// Keep this file tiny: types re-export + the two lookup helpers the spec
// requires (getFieldsByFlow / getFieldsBySection). No other helpers — per
// Rule C3 Simplicity: add abstractions only when there is a second caller.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EC_CORE_FIELDS = void 0;
exports.getFieldsByFlow = getFieldsByFlow;
exports.getFieldsBySection = getFieldsBySection;
const ec_core_1 = require("./ec-core");
var ec_core_2 = require("./ec-core");
Object.defineProperty(exports, "EC_CORE_FIELDS", { enumerable: true, get: function () { return ec_core_2.EC_CORE_FIELDS; } });
/**
 * Return every FieldDef that participates in `flow`. Preserves declaration
 * order from `ec-core.ts` so the wizard renders fields in the order the
 * BRD author arranged them (identity → name → biographical → …).
 */
function getFieldsByFlow(flow) {
    return ec_core_1.EC_CORE_FIELDS.filter((f) => f.flowsUsedIn.includes(flow));
}
/**
 * Return every FieldDef that belongs to the given UI `section` bucket
 * (e.g. 'name', 'address', 'bankAccount'). Case-sensitive — sections are
 * spelled exactly as declared in ec-core.ts.
 */
function getFieldsBySection(section) {
    return ec_core_1.EC_CORE_FIELDS.filter((f) => f.section === section);
}
//# sourceMappingURL=index.js.map
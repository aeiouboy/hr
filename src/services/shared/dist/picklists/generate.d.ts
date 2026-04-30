/**
 * generate.ts — Picklist JSON → TypeScript generator
 *
 * Reads all data/*.json files and emits a typed index.ts with PICKLIST_* const exports.
 * Run: npx tsx generate.ts
 *
 * C6: throws on malformed JSON — no silent catch.
 */
export interface PicklistItem {
    id: string;
    labelTh: string;
    labelEn: string;
    sortOrder: number;
    active: boolean;
}
//# sourceMappingURL=generate.d.ts.map
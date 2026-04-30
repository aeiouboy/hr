"use strict";
/**
 * generate.ts — Picklist JSON → TypeScript generator
 *
 * Reads all data/*.json files and emits a typed index.ts with PICKLIST_* const exports.
 * Run: npx tsx generate.ts
 *
 * C6: throws on malformed JSON — no silent catch.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// ---- helpers ---------------------------------------------------------------
function toPascalCase(filename) {
    // e.g. "EmployeeClass" → "EmployeeClass", "EventReasonHire" → "EventReasonHire"
    return filename.replace(/\.[^.]+$/, ''); // strip extension
}
function toConstName(pascalName) {
    // e.g. "EmployeeClass" → "PICKLIST_EMPLOYEE_CLASS"
    // insert underscore before each uppercase letter that follows a lowercase letter
    return 'PICKLIST_' + pascalName
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .toUpperCase();
}
// ---- main ------------------------------------------------------------------
const dataDir = path.join(__dirname, 'data');
const outputFile = path.join(__dirname, 'index.ts');
let jsonFiles;
try {
    jsonFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json')).sort();
}
catch (err) {
    throw new Error(`[generate] ไม่พบ data directory: ${dataDir} — ${String(err)}`);
}
if (jsonFiles.length === 0) {
    throw new Error(`[generate] ไม่พบ JSON file ใน ${dataDir}`);
}
const entries = [];
for (const file of jsonFiles) {
    const filePath = path.join(dataDir, file);
    let raw;
    try {
        raw = fs.readFileSync(filePath, 'utf-8');
    }
    catch (err) {
        throw new Error(`[generate] อ่านไฟล์ล้มเหลว: ${filePath} — ${String(err)}`);
    }
    let items;
    try {
        items = JSON.parse(raw);
    }
    catch (err) {
        // C6: ไม่ swallow — throw ทันที
        throw new Error(`[generate] JSON ไม่ถูกต้องใน ${file}: ${String(err)}`);
    }
    if (!Array.isArray(items)) {
        throw new Error(`[generate] ${file} ต้องเป็น JSON array แต่ได้รับ ${typeof items}`);
    }
    // validate schema ของแต่ละ item
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (typeof item.id !== 'string' || item.id.trim() === '') {
            throw new Error(`[generate] ${file}[${i}] ต้องมี "id" เป็น non-empty string`);
        }
        if (typeof item.labelTh !== 'string' || item.labelTh.trim() === '') {
            throw new Error(`[generate] ${file}[${i}] ต้องมี "labelTh" เป็น non-empty string`);
        }
        if (typeof item.labelEn !== 'string' || item.labelEn.trim() === '') {
            throw new Error(`[generate] ${file}[${i}] ต้องมี "labelEn" เป็น non-empty string`);
        }
        if (typeof item.sortOrder !== 'number') {
            throw new Error(`[generate] ${file}[${i}] ต้องมี "sortOrder" เป็น number`);
        }
        if (typeof item.active !== 'boolean') {
            throw new Error(`[generate] ${file}[${i}] ต้องมี "active" เป็น boolean`);
        }
    }
    const pascalName = toPascalCase(file);
    const constName = toConstName(pascalName);
    entries.push({ constName, items: items });
    console.log(`  [generate] ${file} → ${constName} (${items.length} items)`);
}
// ---- emit index.ts ---------------------------------------------------------
// Standalone picklist re-exports — D2 S1 added picklists living as their own .ts
// modules (not driven by JSON yet). Generator preserves them so future re-runs
// don't break consumers.
const STANDALONE_REEXPORTS = [
    { const: 'PICKLIST_COUNTRY_ISO', type: 'CountryISOId', module: './country-iso' },
    { const: 'PICKLIST_ID_CARD_TYPE', type: 'IdCardTypeId', module: './id-card-type' },
    { const: 'PICKLIST_COMPANY', type: 'CompanyId', module: './company' },
    { const: 'PICKLIST_SALUTATION_EN', type: 'SalutationEnId', module: './salutation-en' },
    { const: 'PICKLIST_MILITARY_STATUS', type: 'MilitaryStatusId', module: './military-status' },
    { const: 'PICKLIST_YES_NO', type: 'YesNoId', module: './yes-no' },
];
const lines = [
    '// GENERATED — do not edit manually; run generate.ts',
    `// Generated at: ${new Date().toISOString()}`,
    `// Source: picklists/data/ (${entries.length} picklists) + ${STANDALONE_REEXPORTS.length} standalone re-exports`,
    ...STANDALONE_REEXPORTS.flatMap((r) => [
        `export { ${r.const} } from '${r.module}'`,
        `export type { ${r.type} } from '${r.module}'`,
    ]),
    '',
    '/** A single picklist entry with Thai and English labels. */',
    'export interface PicklistItem {',
    '  id: string',
    '  labelTh: string',
    '  labelEn: string',
    '  sortOrder: number',
    '  active: boolean',
    '}',
    '',
];
for (const { constName, items } of entries) {
    const activeItems = items.filter((it) => it.active);
    const jsonLiteral = JSON.stringify(activeItems, null, 2)
        .split('\n')
        .join('\n');
    lines.push(`export const ${constName}: readonly PicklistItem[] = ${jsonLiteral} as const`);
    lines.push('');
}
// emit union-of-ids type per picklist for compile-time safety
for (const { constName, items } of entries) {
    const activeIds = items.filter((it) => it.active).map((it) => JSON.stringify(it.id));
    if (activeIds.length > 0) {
        const typeName = constName.replace('PICKLIST_', '') // e.g. EMPLOYEE_CLASS
            .split('_')
            .map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase())
            .join('');
        lines.push(`export type ${typeName}Id = ${activeIds.join(' | ')}`);
    }
}
lines.push('');
try {
    fs.writeFileSync(outputFile, lines.join('\n'), 'utf-8');
}
catch (err) {
    throw new Error(`[generate] เขียน index.ts ล้มเหลว: ${String(err)}`);
}
console.log(`\n[generate] เสร็จสิ้น — เขียน ${outputFile} (${entries.length} PICKLIST_* exports)`);
//# sourceMappingURL=generate.js.map
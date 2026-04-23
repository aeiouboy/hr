#!/usr/bin/env tsx
/**
 * audit-field-coverage.ts — F5 Audit Script (Phase 0)
 *
 * Usage: npx tsx scripts/audit-field-coverage.ts --phase 0
 *        npm run audit:fields -- --phase 0
 *
 * Coverage metric (AC-5):
 *   Primary: per-flow field count vs expected minimum.
 *   Pass criterion: ALL flows meet or exceed their expected minimum count.
 *   Expected: Hire≥159, Rehire≥164, Transfer≥62, Terminate≥21,
 *             ContractRenewal≥15, Probation≥13, EmpData≥164.
 *
 *   Secondary: BRD row coverage (informational only — some BRD rows are system
 *   features / calculated fields that don't become catalog entries).
 *
 * Picklist mismatch metric:
 *   Only F2-intended picklists (those in F1 that should resolve to PICKLIST_* exports)
 *   are checked. SAP Foundation Objects (FO*, cust_*, TM*, EC*, etc.) are not flagged.
 *
 * Exit codes:
 *   0 = PASS (all per-flow counts >= expected AND true mismatches = 0)
 *   1 = FAIL
 */

import * as fs from 'fs';
import * as path from 'path';

const REPO_ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// BRD path resolution
// ---------------------------------------------------------------------------
const BRD_CANDIDATES = [
  path.join(REPO_ROOT, 'projects/hr-platform-replacement/BRD-EC-summary.md'),
  path.join(REPO_ROOT, '../stark/projects/hr-platform-replacement/BRD-EC-summary.md'),
  '/Users/tachongrak/stark/projects/hr-platform-replacement/BRD-EC-summary.md',
];

function resolveBrdPath(): string {
  for (const p of BRD_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error(
    `BRD-EC-summary.md not found. Tried:\n${BRD_CANDIDATES.map(p => `  ${p}`).join('\n')}`
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FieldDef {
  id: string;
  brdRow?: number | null;
  sfEntity?: string;
  sfField?: string;
  labelTh: string;
  labelEn?: string;
  type: string;
  required?: boolean;
  picklistId?: string;
  section: string;
  flowsUsedIn?: string[];
}

interface BrdRow {
  rowNumber: number;
  featureName: string;
  flows: string;
}

// ---------------------------------------------------------------------------
// Loaders
// ---------------------------------------------------------------------------
function loadCatalog(): FieldDef[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require(path.join(REPO_ROOT, 'src/services/shared/src/field-catalog/ec-core'));
  if (!Array.isArray(mod.EC_CORE_FIELDS)) {
    throw new Error('EC_CORE_FIELDS not found or not an array in ec-core.ts');
  }
  return mod.EC_CORE_FIELDS as FieldDef[];
}

function loadPicklistExports(): Set<string> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require(path.join(REPO_ROOT, 'src/services/shared/src/picklists/index'));
  return new Set(Object.keys(mod).filter(k => k.startsWith('PICKLIST_')));
}

function parseBrdRows(content: string): BrdRow[] {
  const seen = new Set<number>();
  const rows: BrdRow[] = [];
  // Match markdown table row: | **N** | Feature text | `flow-XX` |
  const re = /^\|\s*\*\*(\d+)\*\*\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) {
    const n = parseInt(m[1], 10);
    if (seen.has(n)) continue; // dedup — BRD has some intentional duplicates (#85, #92)
    seen.add(n);
    rows.push({ rowNumber: n, featureName: m[2].trim(), flows: m[3].trim() });
  }
  return rows.sort((a, b) => a.rowNumber - b.rowNumber);
}

// ---------------------------------------------------------------------------
// Per-flow spec (AC-5 expected minimums)
// ---------------------------------------------------------------------------
const FLOW_SPEC = [
  { flow: 'hire',           label: 'Hire',           expectedMin: 159 },
  { flow: 'rehire',         label: 'Rehire',         expectedMin: 164 },
  { flow: 'transfer',       label: 'Transfer',       expectedMin: 62  },
  { flow: 'terminate',      label: 'Terminate',      expectedMin: 21  },
  { flow: 'contractRenewal',label: 'ContractRenewal',expectedMin: 15  },
  { flow: 'probation',      label: 'Probation',      expectedMin: 13  },
  { flow: 'empData',        label: 'EmpData',        expectedMin: 164 },
] as const;

// ---------------------------------------------------------------------------
// Picklist F1→F2 mapping (F2-intended only)
//
// F2 exports 10 PICKLIST_*:
//   BLOOD_TYPE, CURRENCY, EMPLOYEE_CLASS, EVENT_REASON_HIRE, EVENT_REASON_TERM,
//   EVENT_REASON_TRANS, GENDER, MARITAL_STATUS, NATIONALITY, RELIGION
//
// F1 picklistIds that should map to the above (but may use different names):
// ---------------------------------------------------------------------------
const F2_INTENDED_MAP: Record<string, string> = {
  BLOODGROUP:          'PICKLIST_BLOOD_TYPE',
  Currency:            'PICKLIST_CURRENCY',
  'cust_EmployeeClass':'PICKLIST_EMPLOYEE_CLASS',
  GENDER:              'PICKLIST_GENDER',
  MARITAL_STATUS:      'PICKLIST_MARITAL_STATUS',
  Nationality:         'PICKLIST_NATIONALITY',
  RELIGION_THA:        'PICKLIST_RELIGION',
  // FOEventReason covers hire events but F2 has 3 separate picklists:
  FOEventReason:       '(split: PICKLIST_EVENT_REASON_HIRE/TERM/TRANS — see note)',
};

// SAP Foundation Object detection
function isSapFO(id: string): boolean {
  if (id.startsWith('FO')) return true;
  if (id.startsWith('TM')) return true;
  if (id.startsWith('cust_')) return true;
  if (id.startsWith('EC') && !['EVENT'].includes(id)) return true;
  // CamelCase start = SF object names (Bank, JobClassification, etc.)
  if (/^[A-Z][a-z]/.test(id) && id !== 'Currency' && id !== 'Nationality') return true;
  return false;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main(): void {
  const args = process.argv.slice(2);
  const phaseIdx = args.indexOf('--phase');
  const phase = phaseIdx >= 0 ? (args[phaseIdx + 1] ?? '0') : '0';

  console.log(`\nF5 Audit Script — Phase ${phase}`);
  console.log('='.repeat(52));

  // Load inputs (throw if missing — C6: no silent catch)
  const brdPath = resolveBrdPath();
  console.log(`BRD: ${brdPath}`);
  const brdContent = fs.readFileSync(brdPath, 'utf-8');
  const allBrdRows = parseBrdRows(brdContent);
  console.log(`BRD rows parsed: ${allBrdRows.length}`);

  const catalog = loadCatalog();
  console.log(`Catalog entries: ${catalog.length}`);

  const f2Exports = loadPicklistExports();
  console.log(`F2 PICKLIST_* exports: ${f2Exports.size}`);

  // ---------------------------------------------------------------------------
  // Per-flow field counts (primary AC-5 metric)
  // ---------------------------------------------------------------------------
  const flowResults = FLOW_SPEC.map(spec => {
    const count = catalog.filter(
      f => f.flowsUsedIn && f.flowsUsedIn.includes(spec.flow)
    ).length;
    return { ...spec, count, pass: count >= spec.expectedMin };
  });

  const allFlowsPass = flowResults.every(r => r.pass);

  // Derive an overall coverage % from per-flow results
  // = (sum of actual counts / sum of expected counts) — gives a weighted average
  const totalActual = flowResults.reduce((s, r) => s + r.count, 0);
  const totalExpected = flowResults.reduce((s, r) => s + r.expectedMin, 0);
  // NOTE: fields appear in multiple flows so totalActual >> 207.
  // This is intentional — each field contributes once per flow it covers.
  // We report per-flow pass/fail, not a single % for the AC gate.

  // BRD row coverage (informational)
  const catalogCoveredNums = new Set<number>();
  for (const f of catalog) {
    if (f.brdRow != null) catalogCoveredNums.add(f.brdRow);
  }
  const brdRowsCoveredCount = allBrdRows.filter(r => catalogCoveredNums.has(r.rowNumber)).length;
  const brdCoveragePct = allBrdRows.length > 0
    ? Math.round((brdRowsCoveredCount / allBrdRows.length) * 100)
    : 0;

  // In-scope BRD rows (field-definition rows only, not system feature rows)
  // These are the rows from flows 06/08/09/10 that represent actual field defs
  const FIELD_DEF_ROWS = new Set<number>([
    // flow-06: Personal Info field rows (12-24 are clearly field definitions)
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24,
    // flow-08: field-definition rows (calculated/system-feature rows excluded)
    86, 93, 97, 102,
    // flow-09: lifecycle event rows
    109, 110, 111, 112, 113, 114, 115, 116, 117,
    // flow-10: payment field rows
    118, 119, 120,
  ]);

  const fieldDefRows = allBrdRows.filter(r => FIELD_DEF_ROWS.has(r.rowNumber));
  const fieldDefCovered = fieldDefRows.filter(r => catalogCoveredNums.has(r.rowNumber));
  const fieldDefMissing = fieldDefRows.filter(r => !catalogCoveredNums.has(r.rowNumber));
  const fieldDefPct = fieldDefRows.length > 0
    ? Math.round((fieldDefCovered.length / fieldDefRows.length) * 100)
    : 100;

  console.log(`\nPer-flow results:`);
  for (const r of flowResults) {
    console.log(`  ${r.label}: ${r.count}/${r.expectedMin} ${r.pass ? '✅' : '❌'}`);
  }
  console.log(`All flows pass: ${allFlowsPass}`);
  console.log(`BRD field-def rows: ${fieldDefCovered.length}/${fieldDefRows.length} = ${fieldDefPct}%`);

  // ---------------------------------------------------------------------------
  // Picklist checks
  // ---------------------------------------------------------------------------
  const f1Ids = new Set<string>();
  for (const f of catalog) {
    if (f.picklistId) f1Ids.add(f.picklistId);
  }

  const f2IntendedChecks: { f1Id: string; expectedF2: string; found: boolean; note?: string }[] = [];
  const trueMismatches: { f1Id: string; expectedF2: string }[] = [];

  for (const [f1Id, expectedF2] of Object.entries(F2_INTENDED_MAP)) {
    if (!f1Ids.has(f1Id)) continue; // F1 doesn't use this — skip
    const isNote = expectedF2.startsWith('(');
    const found = !isNote && f2Exports.has(expectedF2);
    f2IntendedChecks.push({ f1Id, expectedF2, found, note: isNote ? expectedF2 : undefined });
    if (!isNote && !found) trueMismatches.push({ f1Id, expectedF2 });
  }

  const unsourced = catalog.filter(f => f.brdRow == null && (!f.sfEntity || !f.sfField));
  const sapFOIds = [...f1Ids].filter(id => isSapFO(id) && !(id in F2_INTENDED_MAP)).sort();
  const otherIds = [...f1Ids].filter(id => !isSapFO(id) && !(id in F2_INTENDED_MAP)).sort();

  console.log(`F1 picklist references: ${f1Ids.size} (${sapFOIds.length} SAP FO)`);
  console.log(`True F1→F2 mismatches: ${trueMismatches.length}`);
  console.log(`Unsourced entries: ${unsourced.length}`);

  // ---------------------------------------------------------------------------
  // Overall pass/fail
  // ---------------------------------------------------------------------------
  const pass = allFlowsPass && trueMismatches.length === 0;

  // ---------------------------------------------------------------------------
  // Build Markdown report
  // ---------------------------------------------------------------------------
  const ts = new Date().toISOString();
  const L: string[] = [];

  L.push(`# PRE-DROP-AUDIT-phase${phase}.md`);
  L.push('');
  L.push(`> Generated: ${ts}`);
  L.push(`> Script: \`npm run audit:fields -- --phase ${phase}\``);
  L.push(`> Catalog: \`src/services/shared/src/field-catalog/ec-core.ts\` (${catalog.length} entries)`);
  L.push(`> BRD: \`projects/hr-platform-replacement/BRD-EC-summary.md\` (${allBrdRows.length} rows total)`);
  L.push('');

  // Summary
  L.push('## Summary');
  L.push('');
  L.push('| Metric | Value | Gate |');
  L.push('|--------|-------|------|');
  L.push(`| Catalog entries | **${catalog.length}** | — |`);
  L.push(`| All flows meet AC-5 minimums | ${allFlowsPass ? '**YES**' : '**NO**'} | = YES ${allFlowsPass ? '✅' : '❌'} |`);
  L.push(`| BRD field-def rows covered | ${fieldDefCovered.length}/${fieldDefRows.length} (${fieldDefPct}%) | informational |`);
  L.push(`| BRD total rows covered | ${brdRowsCoveredCount}/${allBrdRows.length} (${brdCoveragePct}%) | informational |`);
  L.push(`| F1→F2 picklist mismatches | ${trueMismatches.length} | = 0 ${trueMismatches.length === 0 ? '✅' : '❌'} |`);
  L.push(`| Unsourced catalog entries | ${unsourced.length} | = 0 ${unsourced.length === 0 ? '✅' : '—'} |`);
  L.push('');
  L.push(`**Verdict**: ${pass ? '✅ PASS' : '❌ FAIL'}`);
  if (!pass) {
    if (!allFlowsPass) {
      const failing = flowResults.filter(r => !r.pass);
      L.push(`- ${failing.length} flow(s) below expected minimum: ${failing.map(r => `${r.label}(${r.count}<${r.expectedMin})`).join(', ')}`);
    }
    if (trueMismatches.length > 0) {
      L.push(`- ${trueMismatches.length} F1→F2 picklist mismatch(es): ${trueMismatches.map(m => m.f1Id).join(', ')}`);
    }
  }
  L.push('');

  // Per-flow table
  L.push('## Per-Flow Catalog Field Counts (AC-5 Primary Gate)');
  L.push('');
  L.push('> Field count = catalog entries where `flowsUsedIn` includes the flow.');
  L.push('> A field that appears in 3 flows is counted once per flow.');
  L.push('');
  L.push('| Flow | Fields in Catalog | AC-5 Min | Status |');
  L.push('|------|------------------|---------|--------|');
  for (const r of flowResults) {
    L.push(`| ${r.label} | **${r.count}** | ≥ ${r.expectedMin} | ${r.pass ? '✅' : `❌ need +${r.expectedMin - r.count}`} |`);
  }
  L.push('');
  L.push(`_Total field-flow assignments: ${totalActual} across ${catalog.length} unique fields / ${totalExpected} expected_`);
  L.push('');

  // BRD row coverage (informational)
  L.push('## BRD Row Coverage (Informational)');
  L.push('');
  L.push('> Not all BRD rows become catalog field entries. Some rows describe system features,');
  L.push('> reports, or calculated fields (e.g., #87-92 Year-In-* computed by SF, #98-108 EC Documents).');
  L.push('> The primary pass gate is per-flow field counts above, not this row count.');
  L.push('');
  L.push('| Section | Field-def rows in scope | Covered | Coverage |');
  L.push('|---------|------------------------|---------|----------|');
  const BRD_SECTIONS = [
    { label: 'flow-06 Personal Info (#12-24)',  rows: [12,13,14,15,16,17,18,19,20,21,23,24] },
    { label: 'flow-08 Emp Info (field-def subset)', rows: [86,93,97,102] },
    { label: 'flow-09 Lifecycle (#109-117)',    rows: [109,110,111,112,113,114,115,116,117] },
    { label: 'flow-10 Compensation (#118-120)', rows: [118,119,120] },
  ];
  for (const sec of BRD_SECTIONS) {
    const cov = sec.rows.filter(n => catalogCoveredNums.has(n)).length;
    const pct = Math.round((cov / sec.rows.length) * 100);
    L.push(`| ${sec.label} | ${sec.rows.length} | ${cov} | ${pct}% ${pct >= 80 ? '✅' : '⚠️'} |`);
  }
  L.push('');

  if (fieldDefMissing.length > 0) {
    L.push('### Missing field-def BRD rows:');
    L.push('');
    L.push('| BRD # | Feature | Flows |');
    L.push('|--------|---------|-------|');
    for (const r of fieldDefMissing) {
      L.push(`| #${r.rowNumber} | ${r.featureName} | ${r.flows} |`);
    }
    L.push('');
  }

  // Picklist consistency
  L.push('## Picklist ID Consistency');
  L.push('');
  L.push('### F2-Intended Picklists');
  L.push('');
  L.push('> These F1 `picklistId` values are intended to resolve to `PICKLIST_*` exports in F2.');
  L.push('> MISMATCH = the F1 name differs from what F2 exports — a rename or alias is needed.');
  L.push('');
  L.push('| F1 `picklistId` | Expected F2 export | Status |');
  L.push('|----------------|-------------------|--------|');
  for (const r of f2IntendedChecks) {
    if (r.note) {
      L.push(`| \`${r.f1Id}\` | ${r.note} | ℹ️ informational |`);
    } else {
      L.push(`| \`${r.f1Id}\` | \`${r.expectedF2}\` | ${r.found ? '✅ found' : '⚠️ MISMATCH — rename needed'} |`);
    }
  }
  // F2-intended not used in catalog
  for (const [f1Id, expectedF2] of Object.entries(F2_INTENDED_MAP)) {
    if (!f1Ids.has(f1Id)) {
      L.push(`| \`${f1Id}\` | \`${expectedF2}\` | ℹ️ not referenced in catalog |`);
    }
  }
  L.push('');

  if (otherIds.length > 0) {
    L.push('### Other SF Custom Picklists (not in F2 — runtime)');
    L.push('');
    L.push(otherIds.map(id => `\`${id}\``).join(' · '));
    L.push('');
  }

  L.push(`### SAP Foundation Objects (${sapFOIds.length} — NOT expected in F2)`);
  L.push('');
  L.push('> FO* / TM* / EC* / cust_* seeded from JSON files. These are correct — not mismatches.');
  L.push('');
  // Wrap at ~120 chars per line
  const chunks: string[] = [];
  let current = '';
  for (const id of sapFOIds) {
    const part = `\`${id}\``;
    if (current.length + part.length + 3 > 120) { chunks.push(current); current = part; }
    else { current = current ? `${current} · ${part}` : part; }
  }
  if (current) chunks.push(current);
  L.push(chunks.join('\n'));
  L.push('');

  // Unsourced
  L.push('## Unsourced Catalog Entries');
  L.push('');
  if (unsourced.length === 0) {
    L.push('All catalog entries have `brdRow` or `sfEntity/sfField` grounding. ✅');
  } else {
    L.push(`${unsourced.length} entries without grounding:`);
    for (const f of unsourced) L.push(`- \`${f.id}\` — ${f.labelTh}`);
  }
  L.push('');

  // F2 inventory
  L.push('## F2 PICKLIST_* Exports (10 total)');
  L.push('');
  for (const k of [...f2Exports].sort()) L.push(`- \`${k}\``);
  L.push('');

  // Write output
  const outDir = path.join(REPO_ROOT, 'src/frontend/test-artifacts/phase0-foundation');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `PRE-DROP-AUDIT-phase${phase}.md`);
  fs.writeFileSync(outFile, L.join('\n'), 'utf-8');

  console.log(`\nReport: ${outFile}`);

  if (!pass) {
    if (!allFlowsPass) {
      const failing = flowResults.filter(r => !r.pass);
      console.error(`\n❌ FAIL: ${failing.length} flow(s) below minimum`);
      for (const r of failing) console.error(`   ${r.label}: ${r.count} < ${r.expectedMin}`);
    }
    if (trueMismatches.length > 0) {
      console.error(`❌ FAIL: ${trueMismatches.length} picklist mismatch(es)`);
      for (const m of trueMismatches) {
        console.error(`   \`${m.f1Id}\` → expected \`${m.expectedF2}\``);
      }
    }
    process.exit(1);
  } else {
    console.log('\n✅ PASS — all flows meet AC-5 minimums, 0 picklist mismatches');
    process.exit(0);
  }
}

main();

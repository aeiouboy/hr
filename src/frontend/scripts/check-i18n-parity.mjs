#!/usr/bin/env node
/**
 * i18n TH/EN parity gate (cleanup Phase 5.3).
 *
 * Fails (exit 1) when messages/en.json and messages/th.json drift:
 *   - a key path present in one catalog but missing in the other
 *   - a leaf value that is an empty string in either catalog
 *
 * TH/EN parity is a hard project rule (CLAUDE.md); this turns the convention
 * into a gate so the mockup can't ship half-translated strings.
 *
 * Usage: node scripts/check-i18n-parity.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(here, '..', 'messages');

/** Collect every leaf key path ("a.b.c") and whether its value is an empty string. */
function collectLeaves(obj, prefix, out) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      collectLeaves(value, path, out);
    } else {
      out.set(path, value);
    }
  }
  return out;
}

function load(locale) {
  const raw = readFileSync(join(messagesDir, `${locale}.json`), 'utf8');
  return collectLeaves(JSON.parse(raw), '', new Map());
}

export function checkParity() {
  const en = load('en');
  const th = load('th');

  const missingInTh = [...en.keys()].filter((k) => !th.has(k));
  const missingInEn = [...th.keys()].filter((k) => !en.has(k));
  const emptyEn = [...en.entries()].filter(([, v]) => v === '').map(([k]) => k);
  const emptyTh = [...th.entries()].filter(([, v]) => v === '').map(([k]) => k);

  return { missingInTh, missingInEn, emptyEn, emptyTh };
}

function main() {
  const { missingInTh, missingInEn, emptyEn, emptyTh } = checkParity();
  const problems = [];
  const cap = (label, arr) => {
    if (!arr.length) return;
    problems.push(`${label} (${arr.length}):`);
    for (const k of arr.slice(0, 40)) problems.push(`  - ${k}`);
    if (arr.length > 40) problems.push(`  … and ${arr.length - 40} more`);
  };

  cap('Keys in en.json missing from th.json', missingInTh);
  cap('Keys in th.json missing from en.json', missingInEn);
  cap('Empty values in en.json', emptyEn);
  cap('Empty values in th.json', emptyTh);

  if (problems.length) {
    console.error('i18n parity FAILED — en.json/th.json are out of sync:\n');
    console.error(problems.join('\n'));
    process.exit(1);
  }
  console.log('i18n parity OK — en.json and th.json have identical, non-empty keys.');
}

if (import.meta.url === `file://${process.argv[1]}`) main();

#!/usr/bin/env python3
"""Generate src/data/ec-field-catalogue.ts from the EC Employee file CSV.

Source CSV is CP1252 encoded. The script is stdlib-only by design; it creates
one typed static catalogue artefact for the HR validation prototype and does not
add any runtime upload/import behaviour.
"""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
CSV_PATH = Path('/Users/tachongrak/Downloads/EC- list of fields(Employee file)_final.csv')
OUT_PATH = ROOT / 'src/frontend/src/data/ec-field-catalogue.ts'

EMPLOYEE_GROUP_HEADERS = {
    9: 'Permanent',
    10: 'Expat Outbound/Inbound',
    11: 'Retirement',
    12: 'Temporary/Internship/Contingent Worker',
    13: 'DVT',
}
OWNER_HEADERS = {19: 'HRIS', 20: 'HRBP', 21: 'SPD', 22: 'Supervisor', 23: 'Employee'}


def clean(value: str) -> str:
    return re.sub(r'\s+', ' ', (value or '').strip())


def display_clean(value: str) -> str:
    text = clean(value)
    text = re.sub(
        r"(?i)\bTBC\b|to be confirm(?:ed)?|pending confirm(?:\s*w/\s*[^,;)]+)?|P[’']?tik|พี่ติ๊ก",
        'Needs HR confirmation',
        text,
    )
    text = re.sub(r'\?{2,}', 'Needs HR review', text)
    return text.strip()


def profile_tab(section: str, sub_section: str, field: str) -> str:
    text = f'{section} {sub_section} {field}'.lower()
    if any(key in text for key in ['compensation', 'pay', 'salary', 'bank', 'payment', 'tax', 'provident', 'income']):
        return 'compensation'
    if any(key in text for key in ['emergency', 'dependent', 'family', 'child', 'spouse', 'father', 'mother']):
        return 'emergency'
    if any(key in text for key in ['document', 'attachment', 'certificate', 'license', 'permit', 'passport', 'visa', 'id card', 'identity', 'national id']):
        return 'documents'
    if any(key in text for key in ['job', 'position', 'department', 'division', 'manager', 'employment', 'company', 'location', 'cost center', 'hire date', 'event reason']):
        return 'employment'
    if any(key in text for key in ['time', 'holiday', 'shift', 'working']):
        return 'activity'
    return 'personal'


def mandatory_kind(row: list[str]) -> str:
    mandatory = clean(row[4]).lower() if len(row) > 4 else ''
    conditional = clean(row[5]).lower() if len(row) > 5 else ''
    if 'required' in mandatory and 'not' not in mandatory:
        return 'required'
    if 'required' in conditional and 'not' not in conditional:
        return 'conditional'
    return 'optional'


def editability_kind(row: list[str]) -> str:
    text = clean(row[6]).lower() if len(row) > 6 else ''
    if 'fix' in text:
        return 'fixed'
    if 'history' in text:
        return 'history_log'
    if 'edit' in text:
        return 'editable'
    return 'unspecified'


def initial_status(row: list[str]) -> str:
    joined = ' '.join(clean(row[index]) for index in range(min(len(row), 18))).lower()
    if re.search(r"tbc|pending confirm|p[’']?tik|to be confirm|\?\?\?", joined):
        return 'needs_change'
    return 'pending_review'


def generate() -> None:
    rows = list(csv.reader(CSV_PATH.read_text(encoding='cp1252').splitlines()))
    fields: list[dict[str, object]] = []

    for row_number, row in enumerate(rows[5:], start=6):
        process_key = clean(row[0]).lower() if row else ''
        if process_key == 'hirin g':
            process_key = 'hiring'
        if process_key not in {'hiring', 'maintain'} or len(row) <= 3 or not clean(row[3]):
            continue

        process = 'Hiring' if process_key == 'hiring' else 'Maintain'
        section = display_clean(row[1]) or 'Unsectioned'
        sub_section = display_clean(row[2]) or 'General'
        label = display_clean(row[3])
        slug = re.sub(r'[^a-z0-9]+', '-', f'{process} {section} {sub_section} {label}'.lower()).strip('-')[:70]

        employee_groups = [
            {'group': group_label, 'rule': display_clean(row[index])}
            for index, group_label in EMPLOYEE_GROUP_HEADERS.items()
            if len(row) > index and display_clean(row[index])
        ] or [{'group': 'All groups', 'rule': 'Applies unless filtered by HR'}]
        owners = [owner for index, owner in OWNER_HEADERS.items() if len(row) > index and clean(row[index])]
        status = initial_status(row)

        fields.append({
            'fieldId': f'ec-{row_number:03d}-{slug}',
            'sourceRow': row_number,
            'process': process,
            'section': section,
            'subSection': sub_section,
            'profileTab': profile_tab(section, sub_section, label),
            'label': label,
            'labelEn': label,
            'mandatoryRule': display_clean(row[4]) if len(row) > 4 else '',
            'conditionalRule': display_clean(row[5]) if len(row) > 5 else '',
            'mandatoryKind': mandatory_kind(row),
            'employeeGroups': employee_groups,
            'editability': display_clean(row[6]) if len(row) > 6 else '',
            'editabilityKind': editability_kind(row),
            'defaultValue': display_clean(row[7]) if len(row) > 7 else '',
            'validationNote': display_clean(row[8]) if len(row) > 8 else '',
            'hrConfirmLogic': display_clean(row[14]) if len(row) > 14 else '',
            'hrConfirmRequired': bool(
                (len(row) > 14 and clean(row[14]))
                or (len(row) > 15 and clean(row[15]))
                or (len(row) > 16 and clean(row[16]))
                or status == 'needs_change'
            ),
            'hrConfirmDetail': display_clean(row[16]) if len(row) > 16 else '',
            'remark': display_clean(row[17]) if len(row) > 17 else '',
            'maintainEditType': display_clean(row[18]) if len(row) > 18 else '',
            'maintainOwners': owners,
            'dbMapping': {
                'table': display_clean(row[24]) if len(row) > 24 else '',
                'field': display_clean(row[25]) if len(row) > 25 else '',
                'type': display_clean(row[26]) if len(row) > 26 else '',
                'length': display_clean(row[27]) if len(row) > 27 else '',
                'lov': display_clean(row[28]) if len(row) > 28 else '',
            },
            'validationStatus': status,
            'reviewerComment': '',
            'reviewTimestamp': '',
        })

    if len(fields) != 593:
        raise SystemExit(f'Expected 593 UI field rows, got {len(fields)}')

    summary = {
        'totalFields': len(fields),
        'byProcess': {process: sum(1 for field in fields if field['process'] == process) for process in ['Hiring', 'Maintain']},
        'bySection': {},
        'byProfileTab': {},
        'sourceCsv': str(CSV_PATH),
        'sourceEncoding': 'CP1252',
        'generatedAt': '2026-05-12T00:00:00.000Z',
    }
    for field in fields:
        summary['bySection'][field['section']] = summary['bySection'].get(field['section'], 0) + 1
        summary['byProfileTab'][field['profileTab']] = summary['byProfileTab'].get(field['profileTab'], 0) + 1

    OUT_PATH.write_text(
        "// Auto-generated from /Users/tachongrak/Downloads/EC- list of fields(Employee file)_final.csv\n"
        "// Source encoding: CP1252. Regenerate with scripts/generate-ec-field-catalogue.py.\n\n"
        "export type ECFieldProcess = 'Hiring' | 'Maintain';\n"
        "export type ECFieldProfileTab = 'personal' | 'employment' | 'compensation' | 'emergency' | 'documents' | 'activity';\n"
        "export type ECFieldMandatoryKind = 'required' | 'conditional' | 'optional';\n"
        "export type ECFieldEditabilityKind = 'editable' | 'fixed' | 'history_log' | 'unspecified';\n"
        "export type ECFieldValidationStatus = 'pending_review' | 'confirmed' | 'needs_change' | 'not_applicable';\n\n"
        "export type ECFieldCatalogueItem = {\n"
        "  fieldId: string;\n  sourceRow: number;\n  process: ECFieldProcess;\n  section: string;\n  subSection: string;\n"
        "  profileTab: ECFieldProfileTab;\n  label: string;\n  labelEn: string;\n  mandatoryRule: string;\n"
        "  conditionalRule: string;\n  mandatoryKind: ECFieldMandatoryKind;\n  employeeGroups: Array<{ group: string; rule: string }>;\n"
        "  editability: string;\n  editabilityKind: ECFieldEditabilityKind;\n  defaultValue: string;\n  validationNote: string;\n"
        "  hrConfirmLogic: string;\n  hrConfirmRequired: boolean;\n  hrConfirmDetail: string;\n  remark: string;\n"
        "  maintainEditType: string;\n  maintainOwners: string[];\n  dbMapping: { table: string; field: string; type: string; length: string; lov: string };\n"
        "  validationStatus: ECFieldValidationStatus;\n  reviewerComment: string;\n  reviewTimestamp: string;\n};\n\n"
        f"export const EC_FIELD_CATALOGUE_SUMMARY = {json.dumps(summary, ensure_ascii=False, indent=2)} as const;\n\n"
        f"export const EC_FIELD_CATALOGUE = {json.dumps(fields, ensure_ascii=False, indent=2)} satisfies ECFieldCatalogueItem[];\n",
        encoding='utf-8',
    )
    print(f'Generated {len(fields)} fields -> {OUT_PATH}')


if __name__ == '__main__':
    generate()

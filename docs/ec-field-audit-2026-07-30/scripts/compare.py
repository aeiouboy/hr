#!/usr/bin/env python3
# compare.py — BA "EC list of fields" (30 Jul) vs the rendered admin Employee File screen.
#
# Evidence: /{th,en}/admin/employees/EMP-0002 rendered from this repo at
# localhost:3000, signed in as admin@humi.test (hr_admin + hr_manager + spd, so
# every RBAC-gated section is visible), every collapsible expanded, then every
# label / <th> / card title harvested from the live DOM (ui-en-*.json, ui-th-*.json)
# and captured per section as PNG.
#
# Matching is a CURATED rule table, not fuzzy string matching: a label only counts
# as FOUND when the screen renders that same datum for that same entity. (A
# dependent's "Phone" is NOT satisfied by the employee's own "Phone" field.)
#
#   FOUND   — screen renders a labelled field for this BA field
#   PARTIAL — value is on screen but not as its own labelled field (composite
#             string, summary line, inline marker, or masked value)
#   MISSING — not on the screen at all
#
# Output: EC-field-vs-UI-employee-file.csv (per field)
#         EC-field-vs-UI-section-summary.csv (per BA section)
#         EC-field-vs-UI-extra-on-screen.csv (on screen, absent from the BA sheet)

import csv, re, unicodedata, os, collections

SCRATCH = os.path.dirname(os.path.abspath(__file__))
BA_CSV = '/root/.claude/uploads/2443db44-ed71-581d-8fc0-71208abc3420/e4e7effa-EClist_of_fields30Jul.csv'
SCREEN_URL = 'http://localhost:3000/en/admin/employees/EMP-0002'


def norm(s):
    s = unicodedata.normalize('NFKC', str(s or ''))
    s = s.replace('­', '').replace('​', '')
    s = re.sub(r"[\s\-_/.,:()\[\]?'’>]+", ' ', s).strip().lower()
    return s


# ─────────────────────────────────────────────────────────────────────────────
# UI sections actually rendered on the screen (from the DOM harvest)
#   id -> (EN card title, TH card title, screenshot file)
# ─────────────────────────────────────────────────────────────────────────────
UI_SECTIONS = {
    'header':                   ('Employee snapshot header', 'ส่วนหัวข้อมูลพนักงาน', 'en-emp-header.png'),
    'emp-personal-contact':     ('Personal Contact', 'ข้อมูลการติดต่อส่วนบุคคล', 'en-emp-personal-contact.png'),
    'emp-marital':              ('Marital status', 'สถานภาพสมรส', 'en-emp-marital.png'),
    'emp-bank':                 ('Bank details', 'บัญชีธนาคาร', 'en-emp-bank.png'),
    'emp-emergency':            ('Emergency contacts', 'ผู้ติดต่อฉุกเฉิน', 'en-emp-emergency.png'),
    'emp-dependents':           ('Dependents', 'ผู้อุปการะ', 'en-emp-dependents.png'),
    'emp-contact-address':      ('Contact & address', 'การติดต่อและที่อยู่', 'en-emp-contact-address.png'),
    'emp-advanced':             ('Advanced personal', 'ข้อมูลส่วนบุคคลเพิ่มเติม', 'en-emp-advanced.png'),
    'emp-work-experience':      ('Work experience', 'ประสบการณ์ทำงาน', 'en-emp-work-experience.png'),
    'emp-certifications':       ('Certifications & licenses', 'ใบรับรอง / ใบอนุญาต', 'en-emp-certifications.png'),
    'emp-assessments':          ('Performance & promotability', 'การประเมิน / ศักยภาพเลื่อนตำแหน่ง', 'en-emp-assessments.png'),
    'emp-memberships':          ('Professional memberships', 'สมาชิกภาพวิชาชีพ', 'en-emp-memberships.png'),
    'emp-projects':             ('Special projects', 'โครงการพิเศษ', 'en-emp-projects.png'),
    'emp-documents':            ('Documents & e-letter', 'เอกสารและหนังสือ', 'en-emp-documents.png'),
    'emp-employment':           ('Employment information', 'ข้อมูลการจ้างงาน', 'en-emp-employment.png'),
    'emp-current-benefits':     ('Current Benefits', 'สวัสดิการปัจจุบัน', 'en-emp-current-benefits.png'),
    'emp-benefit-enrollment':   ('Benefit enrollment', 'ลงทะเบียนสวัสดิการ', 'en-emp-benefit-enrollment.png'),
    'emp-claim-history':        ('Claim history', 'ประวัติการเบิกสวัสดิการ', 'en-emp-claim-history.png'),
    'emp-budget-reallocation':  ('Adjust entitlement amount history', 'ประวัติการปรับสิทธิ์ที่ได้รับ', 'en-emp-budget-reallocation.png'),
    'emp-timeline':             ('Timeline', 'ประวัติการเปลี่ยนแปลง', 'en-emp-timeline.png'),
    'emp-compensation-history': ('Compensation history', 'ประวัติค่าตอบแทน', 'en-emp-compensation-history.png'),
}

_ADDR = 'Address (composite string)'
_SUM = 'card summary line'

# ─────────────────────────────────────────────────────────────────────────────
# Curated rules per BA section.
#   ui      : UI section that carries this BA group ('' = nothing on the screen)
#   found   : normalised BA field -> the label as rendered on screen
#   partial : normalised BA field -> how the value shows up without its own label
# Anything not listed is MISSING.
# ─────────────────────────────────────────────────────────────────────────────
RULES = {
 ('Hiring','Employment','Compensation Information (ค่าตอบแทน)'): dict(
    ui='emp-bank',
    found={'bank':'Bank / ธนาคาร', 'account number':'Account number / เลขที่บัญชี'},
    partial={}),

 ('Hiring','Personal','Contact (ข้อมูลติดต่อ)'): dict(
    ui='emp-contact-address',
    found={'email address':'Email / อีเมล', 'phone number':'Phone / โทรศัพท์'},
    partial={'house number':_ADDR, 'village':_ADDR, 'street':_ADDR, 'district':_ADDR,
             'sub district':_ADDR, 'province':_ADDR, 'postal code':_ADDR,
             'is primary':'★ marker on the primary phone/email',
             'phone type':'shown inline in the phone value, e.g. "(มือถือ)"',
             'country code':'shown inline in the phone value, e.g. "+66"'}),

 ('Hiring','Personal','Dependents (บุคคลในอุปการะ)'): dict(
    ui='emp-dependents',
    found={},
    partial={'firstname en':_SUM, 'lastname en':_SUM, 'relationship':_SUM,
             'date of birth':_SUM}),

 ('Hiring','Employment','Employment Details (ข้อมูลการจ้างงาน)'): dict(
    ui='emp-employment',
    found={'hire date':'Hire Date / วันที่เริ่มงาน',
           'original start date':'Original Start Date / วันที่เริ่มงานครั้งแรก',
           'employee age y m d':'Age / อายุ (snapshot header)'},
    partial={}),

 ('Hiring','Personal','Formal Education (การศึกษา)'): dict(ui='', found={}, partial={}),

 ('Hiring','Personal','Global Information (ข้อมูลทั่วไป)'): dict(
    ui='emp-advanced',
    found={'disability status':'Disability / ความพิการ'},
    partial={'type of disability':'folded into the single Disability yes/no value'}),

 ('Hiring','Personal','Identity (ข้อมูลระบุตัวตน)'): dict(
    ui='header',
    found={'employee id':'Employee ID (snapshot header)',
           'age':'Age / อายุ (snapshot header)',
           'firstname en':'EN name line (snapshot header)',
           'lastname en':'EN name line (snapshot header)',
           'hire date':'Hire Date / วันที่เริ่มงาน (Employment information card)',
           'company':'Company / บริษัท (Employment information card)',
           'national id tax id':'National ID / เลขบัตรประชาชน — masked (Advanced personal card)'},
    partial={}),

 ('Hiring','Employment','Job Information (ข้อมูลงาน)'): dict(
    ui='emp-employment',
    found={'special benefit group':'Special benefit group / กลุ่มสิทธิพิเศษ',
           'personnel grade':'Pay Grade / ประเภท'},
    partial={}),

 ('Maintain','Personal','Advanced Information'): dict(ui='emp-advanced', found={}, partial={}),
 ('Maintain','Personal','COI Approval'): dict(ui='', found={}, partial={}),

 ('Hiring','Personal','Personal Information (ข้อมูลส่วนตัว)'): dict(
    ui='emp-marital',
    found={'marital status':'Status / สถานภาพ',
           'marital status since':'Since / มีผลตั้งแต่',
           'blood type':'Blood type / กรุ๊ปเลือด (Advanced personal card)',
           'military status':'Military status / สถานะทางทหาร (Advanced personal card)',
           'firstname local':'TH name line (snapshot header)',
           'lastname local':'TH name line (snapshot header)'},
    partial={}),

 ('Hiring','Employment','Position & Organization (ตำแหน่งและสังกัด)'): dict(
    ui='emp-employment',
    found={'organization':'Organization / หน่วยงาน',
           'position':'Position / ตำแหน่ง',
           'company':'Company / บริษัท'},
    partial={'business unit':'implied by "อายุงานใน BU" only — no BU field rendered'}),

 ('Hiring','Personal','Primary Emergency Contact (ผู้ติดต่อฉุกเฉิน)'): dict(
    ui='emp-emergency',
    found={},
    partial={'name':_SUM, 'relationship':_SUM, 'primary':'"Primary" badge on the summary line',
             'phone':_SUM}),

 ('Hiring','Employment','Time Information (ข้อมูลเวลางาน)'): dict(ui='', found={}, partial={}),

 ('Maintain','Employment','compensation Information'): dict(
    ui='emp-documents',
    found={},
    partial={'e letter':'card is titled "Documents & e-letter" but renders only a generic document row'}),

 ('Maintain','Employment','Employment Information'): dict(
    ui='emp-employment',
    found={'hire date':'Hire Date / วันที่เริ่มงาน',
           'original start date':'Original Start Date / วันที่เริ่มงานครั้งแรก',
           'year of service':'อายุงาน (บริษัท)',
           'current years in jg':'อายุงานในสายงาน',
           'current years in position':'อายุงานในตำแหน่ง',
           'current years in corporate title':'อายุงานในระดับ'},
    partial={}),

 ('Maintain','Employment','Job Information'): dict(ui='emp-employment', found={}, partial={}),
 ('Hiring','Employment','Work Permit Information (ใบอนุญาตทำงาน)'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Pending'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','compensation'): dict(
    ui='emp-compensation-history',
    found={},
    partial={'merit':'row reason text, e.g. "Merit increase"',
             'salary before review':'masked amount (฿ ••,•••)',
             'salary after review':'masked amount (฿ ••,•••)'}),

 ('Maintain','Profile','E-Letter'): dict(
    ui='emp-documents',
    found={},
    partial={'year':'document row date, e.g. "2019-05-01"',
             'attachment':'"PDF" chip on the document row'}),

 ('Maintain','Profile','Work Experience Within Company'): dict(
    ui='emp-work-experience',
    found={},
    partial={'company current start date':_SUM, 'company current end date':_SUM,
             'company current company':_SUM,
             'work experience within company history startdate':_SUM}),

 ('Maintain','Profile','Salary History'): dict(
    ui='emp-compensation-history',
    found={'start date':'"Effective:" date on each row'},
    partial={'salary amount':'masked amount (฿ ••,•••)',
             'changed amount':'masked before/after pair (฿ ••,••• → ฿ ••,•••)',
             'reason':'row title text, e.g. "Merit increase" — not a labelled field'}),

 ('Maintain','Profile','Previous Employment'): dict(
    ui='emp-work-experience',
    found={},
    partial={'previous work history startdate':_SUM, 'previous work history enddate':_SUM,
             'previous work history company name':_SUM, 'position':_SUM,
             'present employer':'summary shows "– ปัจจุบัน" for the open-ended row'}),

 ('Maintain','Profile','Language Skills'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Certification/License'): dict(
    ui='emp-certifications',
    found={},
    partial={'certification license':_SUM, 'institution':_SUM, 'effective date':'year on the summary line'}),

 ('Maintain','Profile','Goodness'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Disciplinary'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Company Loan'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Scholarship'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Guarantee'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Company Asset'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Mobility'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Individual Document'): dict(
    ui='emp-documents',
    found={},
    partial={'document name':_SUM, 'effective date':'document row date',
             'attachment':'"PDF" chip on the document row'}),

 ('Maintain','Profile','Benefit Election'): dict(ui='emp-benefit-enrollment', found={}, partial={}),
 ('Maintain','Profile','Community/Volunteer Involvement'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Courses/Workshops/Seminars'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Key Successes'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Assessment Program'): dict(
    ui='emp-assessments',
    found={},
    partial={'program':_SUM, 'year ad':'year on the summary line', 'result':_SUM}),

 ('Maintain','Profile','Coaching Feedback'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Development Goals'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Development Opportunities'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Overall Competency Rating (UA)'): dict(
    ui='emp-assessments', found={},
    partial={'year ad':'year on the summary line', 'rating label':_SUM}),
 ('Maintain','Profile','Overall KPI Rating (UA)'): dict(
    ui='emp-assessments', found={},
    partial={'year ad':'year on the summary line', 'rating label':_SUM}),
 ('Maintain','Profile','Overall Performance Rating (UA)'): dict(
    ui='emp-assessments', found={},
    partial={'year ad':'year on the summary line', 'rating label':_SUM}),

 ('Maintain','Profile','Business Driver Assessment'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Learning Activities'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','MT/MA Reference'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Top Strengths'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Talent Reference'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Performance Group'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','E-Letter_Password'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Personal Assessment Summary'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Individual Documents'): dict(
    ui='emp-documents', found={},
    partial={'document name':_SUM, 'effective date':'document row date',
             'attachment':'"PDF" chip on the document row'}),

 ('Maintain','Profile','Flexible Spending Accounts'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Functional Experience'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Leadership Experience'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Professional Memberships'): dict(ui='emp-memberships', found={}, partial={}),
 ('Maintain','Profile','Career Aspirations'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Promotability **Manager view only'): dict(ui='emp-assessments', found={}, partial={}),

 ('Maintain','Profile','Special Assignments/Projects'): dict(
    ui='emp-projects', found={},
    partial={'assignment project':_SUM, 'start date':'year on the summary line'}),

 ('Maintain','Profile','OHS Certificate'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','OHS Document'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Previous Work History'): dict(
    ui='emp-work-experience', found={},
    partial={'start date':_SUM, 'end date':_SUM, 'company name':_SUM, 'position':_SUM,
             'present employer':'summary shows "– ปัจจุบัน" for the open-ended row'}),

 ('Maintain','Profile','Employee Benefit Obligation(EBO)'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Honours/Awards'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Legal Execution Department'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Product Liability Insurance'): dict(ui='', found={}, partial={}),
 ('Maintain','Profile','Student Loan'): dict(ui='', found={}, partial={}),

 ('Maintain','Profile','Work Experience Within Company (History)'): dict(
    ui='emp-work-experience', found={},
    partial={'start date':_SUM, 'end date':_SUM, 'company':_SUM, 'position name':_SUM}),

 ('Maintain','Profile','Profile'): dict(ui='', found={}, partial={}),
}

# Section-level notes that explain a MISSING verdict better than the generic text
SECTION_NOTE = {
    'emp-memberships': 'Section card is on screen but renders "No records" — no fields at all',
    'emp-benefit-enrollment': 'Enrollment card lists plan names only — no dependent-level election fields',
}

# Fields the screen renders that the BA sheet does not list at all
EXTRA_ON_SCREEN = [
    ('emp-bank', 'Account holder / ชื่อบัญชี', 'Bank details'),
    ('header', 'EJ code (EJ-0002)', 'Employee snapshot header'),
    ('header', 'Employment status (ทำงานอยู่)', 'Employee snapshot header'),
    ('header', 'Employee class (Permanent)', 'Employee snapshot header'),
    ('header', 'Generation (Millennial)', 'Employee snapshot header'),
    ('emp-employment', 'Position code (รหัส: POS-CEN-0002)', 'Employment information'),
    ('emp-employment', 'Assignment type (ประเภทการมอบหมาย)', 'Employment information'),
    ('emp-employment', 'Current Years in BU (อายุงานใน BU)', 'Employment information'),
    ('emp-personal-contact', 'Personal Email / อีเมลส่วนตัว', 'Personal Contact'),
    ('emp-personal-contact', 'Mobile Phone / โทรศัพท์มือถือ', 'Personal Contact'),
    ('emp-current-benefits', 'Benefit name, Benefit plan ID, Type, Adjusted entitle amount, Entitle amount, Amount used, Remaining amount', 'Current Benefits (whole section absent from BA sheet)'),
    ('emp-claim-history', 'Benefit Name, Claim Type, Claim Amount, Submission Date, Status (+ filters)', 'Claim history (whole section absent from BA sheet)'),
    ('emp-budget-reallocation', 'Date, Plan, Adjusted entitle amount, Year, Entitle amount, Reason', 'Adjust entitlement amount history (whole section absent from BA sheet)'),
    ('emp-timeline', 'Event, Effective date, Recorded date', 'Timeline (whole section absent from BA sheet)'),
]


def load_ba():
    rows = list(csv.reader(open(BA_CSV, encoding='utf-8-sig')))
    hdr = [h.strip() for h in rows[3]]
    out = []
    for r in rows[5:]:
        if len(r) < 5 or not r[4].strip():
            continue
        r = r + [''] * (len(hdr) - len(r))
        out.append({hdr[i]: r[i].strip() for i in range(len(hdr))})
    return out


def main():
    ba = load_ba()
    rows = []
    unmapped = set()

    for i, r in enumerate(ba, 1):
        key = (r['Process'], r['Menu'], r['Section'])
        rule = RULES.get(key)
        if rule is None:
            unmapped.add(key)
            rule = dict(ui='', found={}, partial={})

        ui_id = rule['ui']
        n = norm(r['UI Field'])

        if n in rule['found']:
            status, matched, note = 'FOUND', rule['found'][n], ''
        elif n in rule['partial']:
            status, matched, note = 'PARTIAL', '(no dedicated label)', rule['partial'][n]
        elif ui_id:
            en, th, _s = UI_SECTIONS[ui_id]
            status, matched = 'MISSING', ''
            note = SECTION_NOTE.get(ui_id, f'Section "{en}" is on screen, but this field is not rendered')
        else:
            status, matched, note = 'MISSING', '', 'No section for this BA group on the Employee File screen'

        if ui_id:
            en, th, shot = UI_SECTIONS[ui_id]
            on_screen, shot_file = 'YES', f'shots/{shot}'
        else:
            en = th = ''
            on_screen, shot_file = 'NO', 'shots/en-EMP-0002-full.png'

        rows.append({
            'No': i,
            'Process': r['Process'],
            'Menu': r['Menu'],
            'BA Section': r['Section'],
            'BA Sub-section': r['Sub-section'],
            'BA UI Field': r['UI Field'],
            'BA Mandatory': r['UI Mandatory (overall)'],
            'BA Edit type (ESS)': r['Edit type (ESS)'],
            'BA Edit type (admin)': r['Edit type (admin)'],
            'Section on screen?': on_screen,
            'Screen section (EN)': en,
            'Screen section (TH)': th,
            'Status': status,
            'Matched UI label on screen': matched,
            'Note': note,
            'Evidence screenshot': shot_file,
        })

    assert not unmapped, f'unmapped BA sections: {unmapped}'

    out = os.path.join(SCRATCH, 'EC-field-vs-UI-employee-file.csv')
    with open(out, 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader(); w.writerows(rows)

    # per-section rollup
    secs = collections.OrderedDict()
    for r in rows:
        k = (r['Process'], r['Menu'], r['BA Section'])
        s = secs.setdefault(k, {'c': collections.Counter(), 'screen': r['Screen section (EN)'],
                                'shot': r['Evidence screenshot']})
        s['c'][r['Status']] += 1
    srows = []
    for (p, m, sec), s in secs.items():
        c = s['c']; n = sum(c.values())
        srows.append({
            'Process': p, 'Menu': m, 'BA Section': sec,
            'Section on screen?': 'YES' if s['screen'] else 'NO',
            'Screen section (EN)': s['screen'] or '(not on screen)',
            'BA fields': n, 'FOUND': c['FOUND'], 'PARTIAL': c['PARTIAL'], 'MISSING': c['MISSING'],
            'Coverage % (FOUND + ½ PARTIAL)': round((c['FOUND'] + .5 * c['PARTIAL']) * 100 / n, 1),
            'Evidence screenshot': s['shot'],
        })
    sp = os.path.join(SCRATCH, 'EC-field-vs-UI-section-summary.csv')
    with open(sp, 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.DictWriter(f, fieldnames=list(srows[0].keys()))
        w.writeheader(); w.writerows(srows)

    # extras
    ep = os.path.join(SCRATCH, 'EC-field-vs-UI-extra-on-screen.csv')
    with open(ep, 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['Screen section (EN)', 'Field(s) on screen', 'Comment', 'Evidence screenshot'])
        for uid, fld, cmt in EXTRA_ON_SCREEN:
            w.writerow([UI_SECTIONS[uid][0], fld, cmt, f'shots/{UI_SECTIONS[uid][2]}'])

    tot = collections.Counter(r['Status'] for r in rows)
    print(f'BA fields compared: {len(rows)}')
    for k in ('FOUND', 'PARTIAL', 'MISSING'):
        print(f'  {k:8} {tot[k]:4}  ({tot[k]*100/len(rows):.1f}%)')
    print(f'BA sections: {len(srows)}  |  present on screen: '
          f'{sum(1 for r in srows if r["Section on screen?"]=="YES")}  |  absent: '
          f'{sum(1 for r in srows if r["Section on screen?"]=="NO")}')
    print(f'UI sections rendered: {len(UI_SECTIONS)}')
    for f in (out, sp, ep):
        print(' ->', f)


if __name__ == '__main__':
    main()

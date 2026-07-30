#!/usr/bin/env python3
# compare-devint.py — BA "EC list of fields" (30 Jul) vs the humi-dev-int Employee File screen.
#
# Evidence: a full-page PDF capture of
#   https://humi-dev-int.central.co.th/humi/en/admin/employees/EMP-0002
# supplied by the user on 30 Jul 2026 (the host is blocked by this environment's
# egress proxy, so it could not be harvested from the DOM). The PDF carries no
# text layer, so the 18 page images were extracted at 2941x3866 and every card
# title and field label read off them and transcribed into SEEN below.
#
# Because the source is a transcription rather than a DOM harvest, SEEN is the
# part to re-check if a number here looks wrong.
#
#   FOUND   — dev-int renders a labelled field for this BA field
#   MISSING — no labelled field for it in the matching card
#   NO CARD — the BA section has no card on the screen at all
#
# Output: devint-field-vs-ui.csv, devint-section-summary.csv

import csv, re, os, collections

HERE = os.path.dirname(os.path.abspath(__file__))
BA_CSV = '/root/.claude/uploads/2443db44-ed71-581d-8fc0-71208abc3420/e4e7effa-EClist_of_fields30Jul.csv'

# --- what the dev-int screen renders, card by card, transcribed from the capture ---
SEEN = {
 'Identity information': ['Hire Date','Company','DVT Previous Employee ID','Salutation (EN)',
   'First Name (EN)','Middle Name (EN)','Last Name (EN)','Date Of Birth','Age','Country Of Birth',
   'Region Of Birth','Country','National ID / Tax ID','Issue Date','Expiry Date','Is Primary',
   'National ID (Attachment)'],
 'Personal information': ['Salutation','Other Title','First Name (local)','Last Name (local)',
   'Middle Name','Nickname','Military Status','Gender','Nationality','Foreigner','Blood Type',
   'Marital Status','Marital Status Since','Personal Information (Attachment)'],
 'Education': ['Degree','Country','University','Others','Faculty','Major','Other Majors','GPA',
   'Graduated Date','Formal education (Attachment)'],
 'Contact information': ['Phone Type','Phone Number','Email Type','Email Address','Domain',
   'Instant Messaging ID','Address Type','Country','Floor','Room No.','Building','Street',
   'House No.','Village','Moo','Lane/Soi','Province','District','Sub-District','Postal Code',
   'Address (Attachment)'],
 'Emergency contacts': ['Name','Relationship','Phone','Address Type','Country','Floor','Room No.',
   'Building','Street','House No.','Village','Moo','Lane/Soi','Province','District','Sub-District',
   'Postal Code','Emergency contact (Attachment)'],
 'General information': ['Country/Region','Number Of Children','Disability Status',
   'Type Of Disability','Disability Certificate ID','Disability Cert Start Date',
   'Disability Cert End Date','Disability Certificate (Attachment)','Spouse Father ID Number',
   'Spouse Mother ID Number','Additional Information'],
 'Dependents': ['Relationship','Salutation (EN)','First Name (EN)','Last Name (EN)',
   'Salutation (Local)','First Name (Local)','Last Name (Local)','Nationality','Date Of Birth',
   'National ID Card Type','ID Country','National ID / Tax ID','Address Type','Country','Floor',
   'Room No.','Building','Street','House No.','Village','Moo','Lane/Soi','Province','District',
   'Sub-District','Postal Code','Dependent (Attachment)'],
 'Advanced Information': ['Group Of People','Description','Additional Information - Name'],
 'COI Approval': ['Approval ID','Company Name','Business Type','Business Nature','Position Name',
   'Term','Start Date','Compensation Rate','End Date','Approved Date','Attachment','Attachment 2'],
 'Position & assignment': ['Company','Position','Organization','Cost Center','Function',
   'Point Of Sales','Zone','HR District','Work Location','Business Unit','Group',
   'Store Brand / Format','Store Size','Store / Branch Code','Brand','SSO Location','Time Zone'],
 'Job information': ['Band','Corporate Title','Supervisor ID','Special Benefit Group',
   'Employee Group','Employee Subgroup','Personnel Grade','Contract Type','Contract End Date',
   'Probationary Period End Date','Extended Retirement Date','Extended Probation Date',
   'Band Matching','Country','Transfer From','Transfer Out To','Transfer Into','Job Code','Job Role',
   'Job Family','Job Type','Job Grade','Function','Name','Relationship Type','DVT: Project Name',
   'DVT: Partner University','DVT: Type','DVT: Degree Level','DVT: Course','DVT: Course Of Time',
   'DVT: Academic Year','DVT: Graduation Date','DVT: Bonding End Date','Scholarship',
   'Job Information (Attachment)'],
 'Employment information': ['Hire Date','Original Start Date','Seniority Start Date',
   'Retirement Date','PF Service Date','PF Service End Date','DVT Previous ID',
   'CG Previous Employee ID','Employee Age (Y/M/D)','Year Of Service',
   'Pass Probation Date/Confirm Date','Current Job Effective Date',
   'Current Corporate Title Effective Date','Current JG Effective Date','Current PG Effective Date',
   'Current Position Effective Date','Current Store/Branch Effective Date',
   'Current Years In Corporate Title','Current Years In JG','Current Years In PG',
   'Current Years In Position','Current Years In Store/Branch','Org. Chart'],
 'Time information': ['Day Off Type','Time Management Status','Work Schedule',
   'Holiday Type Condition','O.T. Flag','Override Standard Weekly Hours','FTE',
   'Standard Weekly Hours','Daily Working Hours','Working Days Per Week','Holiday Calendar'],
 'Compensation': ['Payroll ID','Pay Group','Bank Code','Bank','Account Number','Bank Country/Region',
   'Currency','Payment Method','Payment (Attachment)','Cost Center','Allocation (%)','Pay Type',
   'Pay Component','Frequency','Amount'],
 'Compensation Information (Payroll)': ['Payslips','E-Letter','50BIS','Tax Deduction'],
 'Job Information (Termination)': ['Failed Probation Date','Probation Result','OK To Rehire',
   'Additional Information (Termination)'],
 'Compensation Review': ['Review Name','Review Start','Review End','Job Title',
   'Performance Management Rating','Salary Before Review','Merit','Salary After Review',
   'Compa-Ratio','Total Pay','Bonus','Stock','Option','Grant Date','Lump Sum'],
 'E-Letter': ['Year','Group','More Information','Attachment'],
 'Work Experience Within Company': ['Start Date (Current)','End Date (Current)','Event',
   'History Start Date','Company'],
 'Work Experience Within Company (History)': ['Start Date','End Date','Event','Event Reason',
   'Company','Business Unit','Function','Organization','Department','Store/Branch Code',
   'Work Location','Position Code','Position Name','Supervisor ID','Job Family','Job Code',
   'Job Role','Person Grade','Job Grade','Corporate Title','Band','Employee Group','Contract Type'],
 'Salary History': ['Start Date','Salary Amount','Changed Amount','Reason'],
 'Previous Employment': ['Start Date','End Date','Company Name','Type Of Business','Function',
   'Position','Additional Information','Present Employer?'],
 'Previous Work History': ['Start Date','End Date','Company Name','Type Of Business','Function',
   'Position','Additional Information','Present Employer?'],
 'Language Skills': ['Language','Certificate','Others','Speaking Proficiency','Reading Proficiency',
   'Writing Proficiency','Listening Proficiency','Attachment'],
 'Certification/License': ['Type Of Certificate','Certification/License','Description','Institution',
   'Effective Date','Expiration Date','Certification/License Number',
   'Name As Appears On Certification/License','Certification/License Country','Score','Attachment'],
 'Goodness': ['Effective Date','Detail','Point','Comment'],
 'Disciplinary': ['Start Date','Type','Detail','Status','Punishment Detail','Punishment Date',
   'Appeal Date','Point','Damage Amount','Supervisor','Attachment'],
 'Company Loan': ['Start Date','End Date','Type Of Loan','Amount','Additional Information'],
 'Scholarship': ['Scholarship Award Year','Graduation Year','Scholarship Start Year',
   'Scholarship End Year','Remarks','Attachment'],
 'Guarantee': ['Guarantee','Effective Date','Guarantor (Person Name Or Company Name)',
   'Warranty Amount','Contact No.','End Date'],
 'Company Asset': ['Receiving Date','Receiving Status','Volume','Asset Type','Returnable Date',
   'Return Status','Remark','Serial Number'],
 'Mobility': ['Willing To Relocate','Country','Province','Business Unit','Function','Comment'],
 'Individual Documents': ['Document Name','Effective Date','Attachment'],
 'Benefit Election': ['Dependent Name','Relation','Birth Date','National ID','Gender','Student?',
   'Smoker?','Disabled?','Health Plan','Dental Plan'],
 'Community/Volunteer Involvement': ['From Date','End Date',
   'Community/Volunteer Organization Name','Role'],
 'Courses/Workshops/Seminars': ['Course Name','Institution Name','Start Date','End Date'],
 'Key Successes': ['Year (AD)','Achievement','Attachment'],
 'Assessment Program': ['Program','Year (AD)','Result','MBTI Strength','MBTI Weakness','Attachment'],
 'Coaching Feedback': ['Type','Internal Name','External Name','Identified As Of Date',
   'Comment/Feedback','Attachment'],
 'Development Goals': ['Category','Development Goal ID','Development Goal','Description',
   'Expected Outcome','Competency','Start Date','Complete Date','Development Goal Status'],
 'Development Opportunities': ['Year (AD)','Development Needs','Description'],
 'Overall Competency Rating': ['Year (AD)','Rating Score','Rating Label'],
 'Overall KPI Rating': ['Year (AD)','Rating Score','Rating Label'],
 'Overall Performance Rating': ['Year (AD)','Rating Score','Rating Label','Remark'],
 'Business Driver Assessment': ['Driving For Profitable Growth',
   'Striving To Meet Customer Satisfaction','Building Organization Excellence',
   'Promoting Sustainable Collaborations & Partnerships','Developing People','Leading Innovation'],
 'Learning Activities': ['Category','Development Objective ID','Topic','Description',
   'Planned Start Date','Planned Completed Date','Status','Learning Activity ID','Type',
   'Learning Name','Learning Status','Learning Planned Start Date',
   'Learning Planned Completed Date','Learning Planned Expected Result'],
 'MT/MA Reference': ['Program','Sponser','Year(AD)','Remark','Attachment'],
 'Top Strengths': ['Year (AD)','Achievement','Attachment'],
 'Talent Reference': ['Program','Sponser','Year(AD)','Remark','Attachment'],
 'Performance Group': ['Year(AD)','Group'],
 'E-Letter Password': ['E-Letter Password','Year','PA Grade','New Salary','Extra Overceiling',
   'Bonus','Old Salary','Note'],
 'Personal Assessment Summary': ['1. Positive Side','2. Positive Side','3. Positive Side',
   '1. Need To Be Improved Side','2. Need To Be Improved Side','3. Need To Be Improved Side'],
 'Flexible Spending Accounts': ['Plan Name','Election Amount','Total Contributions',
   'Total Funds Out','Total Repayments','Available Balance'],
 'Functional Experience': ['Function','Years Of Experience','Comments'],
 'Leadership Experience': ['Area Of Leadership','Years Of Experience','Number Of People Managed',
   'Amount Managed (M)','Comments'],
 'Professional Memberships': ['Organisation','Position/Role','Start Date','End Date'],
 'Career Aspirations': ['Destination Role','Level','Function','Business Unit','Year(AD)','Type',
   'Comments','Status','Completed Date'],
 'Promotability': ['Level','Function','Timeframe'],
 'Special Assignments/Projects': ['Assignment/Project','Description','Comments','Start Date',
   'End Date'],
 'OHS Certificate': ['Completion Date','Institute ID','Description','Comments','Certificate Number',
   'Course'],
 'OHS Document': ['Registration Date','Inactive Date','Labour Department Area','Document Number',
   'Safety Officer Level','Direct Link - Name','Direct Link - URL','Attachment'],
 'Employee Benefit Obligation (EBO)': ['Description','EBO Amount'],
 'Honours/Awards': ['Honour Or Award','Description','Institution','Issue Date',
   'Additional Information','Attachment'],
 'Legal Execution Department': ['Legal Execution Department','Execution Case No.','Start Date',
   'End Date','Other Information','Attachment'],
 'Product Liability Insurance': ['Effective Date','Insurance Company','Bank','Value','Status',
   'Remark'],
 'Student Loan': ['Year Of Contract','Levels Of Education','Academic Year','Year Of Final Payment',
   'Remark','Attachment'],
}

# BA section -> the card on the dev-int screen that carries it (None = no card)
MAP = {
 'Identity (ข้อมูลระบุตัวตน)': 'Identity information',
 'Personal Information (ข้อมูลส่วนตัว)': 'Personal information',
 'Formal Education (การศึกษา)': 'Education',
 'Contact (ข้อมูลติดต่อ)': 'Contact information',
 'Primary Emergency Contact (ผู้ติดต่อฉุกเฉิน)': 'Emergency contacts',
 'Global Information (ข้อมูลทั่วไป)': 'General information',
 'Dependents (บุคคลในอุปการะ)': 'Dependents',
 'Advanced Information': 'Advanced Information',
 'COI Approval': 'COI Approval',
 'Position & Organization (ตำแหน่งและสังกัด)': 'Position & assignment',
 'Job Information (ข้อมูลงาน)': 'Job information',
 'Employment Details (ข้อมูลการจ้างงาน)': 'Employment information',
 'Employment Information': 'Employment information',
 'Time Information (ข้อมูลเวลางาน)': 'Time information',
 'Compensation Information (ค่าตอบแทน)': 'Compensation',
 # the BA sheet's lowercase "compensation" section is the pay-review field set,
 # which the screen renders as its own Compensation Review card
 'compensation': 'Compensation Review',
 'compensation Information': 'Compensation Information (Payroll)',
 'Job Information': 'Job Information (Termination)',
 'E-Letter': 'E-Letter',
 'Work Experience Within Company': 'Work Experience Within Company',
 'Work Experience Within Company (History)': 'Work Experience Within Company (History)',
 'Salary History': 'Salary History',
 'Previous Employment': 'Previous Employment',
 'Previous Work History': 'Previous Work History',
 'Language Skills': 'Language Skills',
 'Certification/License': 'Certification/License',
 'Goodness': 'Goodness',
 'Disciplinary': 'Disciplinary',
 'Company Loan': 'Company Loan',
 'Scholarship': 'Scholarship',
 'Guarantee': 'Guarantee',
 'Company Asset': 'Company Asset',
 'Mobility': 'Mobility',
 'Individual Document': 'Individual Documents',
 'Individual Documents': 'Individual Documents',
 'Benefit Election': 'Benefit Election',
 'Community/Volunteer Involvement': 'Community/Volunteer Involvement',
 'Courses/Workshops/Seminars': 'Courses/Workshops/Seminars',
 'Key Successes': 'Key Successes',
 'Assessment Program': 'Assessment Program',
 'Coaching Feedback': 'Coaching Feedback',
 'Development Goals': 'Development Goals',
 'Development Opportunities': 'Development Opportunities',
 'Overall Competency Rating (UA)': 'Overall Competency Rating',
 'Overall KPI Rating (UA)': 'Overall KPI Rating',
 'Overall Performance Rating (UA)': 'Overall Performance Rating',
 'Business Driver Assessment': 'Business Driver Assessment',
 'Learning Activities': 'Learning Activities',
 'MT/MA Reference': 'MT/MA Reference',
 'Top Strengths': 'Top Strengths',
 'Talent Reference': 'Talent Reference',
 'Performance Group': 'Performance Group',
 'E-Letter_Password': 'E-Letter Password',
 'Personal Assessment Summary': 'Personal Assessment Summary',
 'Flexible Spending Accounts': 'Flexible Spending Accounts',
 'Functional Experience': 'Functional Experience',
 'Leadership Experience': 'Leadership Experience',
 'Professional Memberships': 'Professional Memberships',
 'Career Aspirations': 'Career Aspirations',
 'Promotability **Manager view only': 'Promotability',
 'Special Assignments/Projects': 'Special Assignments/Projects',
 'OHS Certificate': 'OHS Certificate',
 'OHS Document': 'OHS Document',
 'Employee Benefit Obligation(EBO)': 'Employee Benefit Obligation (EBO)',
 'Honours/Awards': 'Honours/Awards',
 'Legal Execution Department': 'Legal Execution Department',
 'Product Liability Insurance': 'Product Liability Insurance',
 'Student Loan': 'Student Loan',
 # no card found anywhere in the capture
 'Work Permit Information (ใบอนุญาตทำงาน)': None,
 'Pending': None,
 'Profile': None,
}

def n(s):
    s = (s or '').lower().replace('&', 'and').replace("'s ", ' ')
    s = s.replace('centre', 'center')                  # BA mixes en-GB / en-US
    s = s.replace('posiiton', 'position').replace('corperate', 'corporate')  # BA typos
    return re.sub(r'[^a-z0-9฀-๿]', '', s)

def loose(s):
    """Drop qualifiers the two sources word differently: trailing parentheticals,
    'X (Attachment)' -> 'attachment', and the sheet's 'Parent (Q) -> child' form."""
    s = (s or '').strip()
    if '->' in s:                                   # "Company (Current) -> start date"
        head, tail = s.split('->', 1)
        q = re.findall(r'\(([^)]*)\)', head)
        s = tail.strip() + (f' ({q[0]})' if q else '')
    if re.search(r'\(attachment\)\s*$', s, re.I):
        return 'attachment'
    return n(re.sub(r'\s*\([^)]*\)\s*$', '', s))

# Same datum, different wording between the BA sheet and the screen. Curated, not
# fuzzy — each entry is a deliberate call that the two labels denote one field.
ALIAS = {
 'Personal information': {'nickname': 'nickname', 'salutationlocal': 'salutation',
   'othertitleth': 'othertitle', 'middlenamelocal': 'middlename'},
 'General information': {'disabilitycertificatestartdate': 'disabilitycertstartdate',
   'disabilitycertificateenddate': 'disabilitycertenddate',
   'certificateid': 'disabilitycertificateid',
   'spousefatheridnumber': 'spousefatheridnumber',
   'spousemotheridnumber': 'spousemotheridnumber'},
 'Contact information': {'housenumber': 'houseno'},
 'Dependents': {'housenumber': 'houseno'},
 'Emergency contacts': {'housenumber': 'houseno'},
 'Education': {'othermajor': 'othermajors'},
 # PF Service End Date is on screen, on the Employment information card rather
 # than Time information — same datum, so it counts.
 'Time information': {'pfserviceenddate': 'pfserviceenddate'},
}
ALIAS['Time information']['pfserviceenddate'] = 'pfserviceenddate'
CROSS_CARD = {
 ('Time Information (ข้อมูลเวลางาน)', 'pfserviceenddate'): 'Employment information',
 ('Profile', 'orgchart'): 'Employment information',   # rendered as "Org. Chart"
}

# Datum is visible but not as its own labelled field — a badge, a header line, or
# a link target. Mirrors the parent audit's PARTIAL status.
PARTIAL = {
 ('Contact (ข้อมูลติดต่อ)', 'isprimary'): 'rendered as a "Primary" badge on the phone/email row',
 ('Contact (ข้อมูลติดต่อ)', 'url'): 'social handle is a hyperlink; the URL is its href, not a field',
 ('Formal Education (การศึกษา)', 'isprimary'): 'rendered as a "Primary" badge on Education #1',
 ('Identity (ข้อมูลระบุตัวตน)', 'employeeid'): 'shown in the page header as "EMP-0002 · EJ: EJ-0002"',
 ('Advanced Information', 'additionalinformationurl'):
   '"Additional Information - Name" is a hyperlink; the URL is its href',
 ('Primary Emergency Contact (ผู้ติดต่อฉุกเฉิน)', 'primary'):
   'rendered as a "Primary Contact" badge on Contact #1',
}

NORM = {card: {n(f) for f in fields} for card, fields in SEEN.items()}
LOOSE = {card: {loose(f) for f in fields} for card, fields in SEEN.items()}

def hits(card, fld):
    if n(fld) in NORM[card]:
        return True
    lf = loose(fld)
    if lf and lf in LOOSE[card]:
        return True
    a = ALIAS.get(card, {}).get(n(fld)) or ALIAS.get(card, {}).get(lf)
    return bool(a and (a in NORM[card] or a in LOOSE[card]))

def main():
    rows = list(csv.reader(open(BA_CSV, encoding='utf-8-sig')))[4:]
    out, counts = [], collections.Counter()
    per_sec = collections.defaultdict(lambda: collections.Counter())

    for r in rows:
        if len(r) < 5:
            continue
        sec, sub, fld = (r[2] or '').strip(), (r[3] or '').strip(), (r[4] or '').strip()
        if not sec or not fld:
            continue
        card = MAP.get(sec, '__unmapped__')
        alt0 = CROSS_CARD.get((sec, n(fld)))
        if card in (None, '__unmapped__') and not alt0:
            st, matched = 'NO CARD', ''
        else:
            alt = alt0
            incard = card not in (None, '__unmapped__') and hits(card, fld)
            hit = incard or bool(alt and hits(alt, fld))
            note = PARTIAL.get((sec, n(fld)))
            if hit:
                st, matched = 'FOUND', (fld if incard else f'{fld} (on {alt})')
            elif note:
                st, matched = 'PARTIAL', note
            else:
                st, matched = 'MISSING', ''
        counts[st] += 1
        per_sec[sec][st] += 1
        out.append([sec, sub, fld, card or '(none)', st, matched])

    with open(os.path.join(HERE, 'devint-field-vs-ui.csv'), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['BA section', 'BA sub-section', 'BA UI field', 'dev-int card', 'Status',
                    'Matched label'])
        w.writerows(out)

    with open(os.path.join(HERE, 'devint-section-summary.csv'), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(['BA section','dev-int card','Fields','FOUND','PARTIAL','MISSING','NO CARD','Coverage %'])
        for sec in per_sec:
            c = per_sec[sec]
            tot = sum(c.values())
            w.writerow([sec, MAP.get(sec) or '(none)', tot, c['FOUND'], c['PARTIAL'], c['MISSING'], c['NO CARD'],
                        f"{c['FOUND'] / tot * 100:.0f}"])

    total = sum(counts.values())
    print(f'BA fields compared: {total}')
    for k in ('FOUND', 'PARTIAL', 'MISSING', 'NO CARD'):
        print(f'  {k:8s} {counts[k]:4d}  ({counts[k] / total * 100:.1f}%)')
    nocard = sorted({s for s in per_sec if MAP.get(s, '__x__') in (None, '__x__')})
    print(f'\nBA sections with a card on dev-int: {len(per_sec) - len(nocard)} / {len(per_sec)}')
    print('No card:', ', '.join(nocard) or '(none)')
    print('\nSections with MISSING fields:')
    for sec in per_sec:
        if per_sec[sec]['MISSING']:
            print(f"  {per_sec[sec]['MISSING']:3d} missing / {sum(per_sec[sec].values()):3d}  {sec}")

if __name__ == '__main__':
    main()

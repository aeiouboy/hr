/**
 * Mock Lookup Data
 * Reference data for dropdowns and selects
 */

const MockLookupData = {
    // Salutations
    salutations: {
        en: [
            { value: 'Mr.', label: 'Mr.' },
            { value: 'Mrs.', label: 'Mrs.' },
            { value: 'Ms.', label: 'Ms.' },
            { value: 'Miss', label: 'Miss' },
            { value: 'Dr.', label: 'Dr.' }
        ],
        th: [
            { value: 'นาย', label: 'นาย' },
            { value: 'นาง', label: 'นาง' },
            { value: 'นางสาว', label: 'นางสาว' },
            { value: 'ดร.', label: 'ดร.' }
        ]
    },

    // Genders
    genders: [
        { value: 'male', labelEn: 'Male', labelTh: 'ชาย' },
        { value: 'female', labelEn: 'Female', labelTh: 'หญิง' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ],

    // Marital Status
    maritalStatuses: [
        { value: 'single', labelEn: 'Single', labelTh: 'โสด' },
        { value: 'married', labelEn: 'Married', labelTh: 'สมรส' },
        { value: 'divorced', labelEn: 'Divorced', labelTh: 'หย่าร้าง' },
        { value: 'widowed', labelEn: 'Widowed', labelTh: 'หม้าย' }
    ],

    // Nationalities
    nationalities: [
        { value: 'Thai', labelEn: 'Thai', labelTh: 'ไทย' },
        { value: 'American', labelEn: 'American', labelTh: 'อเมริกัน' },
        { value: 'British', labelEn: 'British', labelTh: 'อังกฤษ' },
        { value: 'Chinese', labelEn: 'Chinese', labelTh: 'จีน' },
        { value: 'Japanese', labelEn: 'Japanese', labelTh: 'ญี่ปุ่น' },
        { value: 'Korean', labelEn: 'Korean', labelTh: 'เกาหลี' },
        { value: 'Singaporean', labelEn: 'Singaporean', labelTh: 'สิงคโปร์' },
        { value: 'Malaysian', labelEn: 'Malaysian', labelTh: 'มาเลเซีย' },
        { value: 'Vietnamese', labelEn: 'Vietnamese', labelTh: 'เวียดนาม' },
        { value: 'Indian', labelEn: 'Indian', labelTh: 'อินเดีย' },
        { value: 'Other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ],

    // Countries
    countries: [
        { value: 'Thailand', labelEn: 'Thailand', labelTh: 'ประเทศไทย' },
        { value: 'Singapore', labelEn: 'Singapore', labelTh: 'สิงคโปร์' },
        { value: 'Malaysia', labelEn: 'Malaysia', labelTh: 'มาเลเซีย' },
        { value: 'Vietnam', labelEn: 'Vietnam', labelTh: 'เวียดนาม' },
        { value: 'Indonesia', labelEn: 'Indonesia', labelTh: 'อินโดนีเซีย' },
        { value: 'Japan', labelEn: 'Japan', labelTh: 'ญี่ปุ่น' },
        { value: 'China', labelEn: 'China', labelTh: 'จีน' },
        { value: 'Hong Kong', labelEn: 'Hong Kong', labelTh: 'ฮ่องกง' },
        { value: 'USA', labelEn: 'United States', labelTh: 'สหรัฐอเมริกา' },
        { value: 'UK', labelEn: 'United Kingdom', labelTh: 'สหราชอาณาจักร' }
    ],

    // Thai Provinces
    provinces: [
        { value: 'Bangkok', labelEn: 'Bangkok', labelTh: 'กรุงเทพมหานคร' },
        { value: 'Nonthaburi', labelEn: 'Nonthaburi', labelTh: 'นนทบุรี' },
        { value: 'Pathum Thani', labelEn: 'Pathum Thani', labelTh: 'ปทุมธานี' },
        { value: 'Samut Prakan', labelEn: 'Samut Prakan', labelTh: 'สมุทรปราการ' },
        { value: 'Chiang Mai', labelEn: 'Chiang Mai', labelTh: 'เชียงใหม่' },
        { value: 'Phuket', labelEn: 'Phuket', labelTh: 'ภูเก็ต' },
        { value: 'Chonburi', labelEn: 'Chonburi', labelTh: 'ชลบุรี' },
        { value: 'Khon Kaen', labelEn: 'Khon Kaen', labelTh: 'ขอนแก่น' },
        { value: 'Nakhon Ratchasima', labelEn: 'Nakhon Ratchasima', labelTh: 'นครราชสีมา' },
        { value: 'Songkhla', labelEn: 'Songkhla', labelTh: 'สงขลา' }
    ],

    // Bangkok Districts
    bangkokDistricts: [
        { value: 'Watthana', labelEn: 'Watthana', labelTh: 'วัฒนา' },
        { value: 'Bang Rak', labelEn: 'Bang Rak', labelTh: 'บางรัก' },
        { value: 'Pathum Wan', labelEn: 'Pathum Wan', labelTh: 'ปทุมวัน' },
        { value: 'Khlong Toei', labelEn: 'Khlong Toei', labelTh: 'คลองเตย' },
        { value: 'Sathon', labelEn: 'Sathon', labelTh: 'สาทร' },
        { value: 'Chatuchak', labelEn: 'Chatuchak', labelTh: 'จตุจักร' },
        { value: 'Bang Kapi', labelEn: 'Bang Kapi', labelTh: 'บางกะปิ' },
        { value: 'Huai Khwang', labelEn: 'Huai Khwang', labelTh: 'ห้วยขวาง' },
        { value: 'Din Daeng', labelEn: 'Din Daeng', labelTh: 'ดินแดง' },
        { value: 'Lat Phrao', labelEn: 'Lat Phrao', labelTh: 'ลาดพร้าว' }
    ],

    // Relationships (Emergency Contact / Dependents)
    relationships: [
        { value: 'spouse', labelEn: 'Spouse', labelTh: 'คู่สมรส' },
        { value: 'parent', labelEn: 'Parent', labelTh: 'บิดา/มารดา' },
        { value: 'child', labelEn: 'Child', labelTh: 'บุตร' },
        { value: 'sibling', labelEn: 'Sibling', labelTh: 'พี่/น้อง' },
        { value: 'friend', labelEn: 'Friend', labelTh: 'เพื่อน' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ],

    // Dependent Types
    dependentTypes: [
        { value: 'spouse', labelEn: 'Spouse', labelTh: 'คู่สมรส' },
        { value: 'child', labelEn: 'Child', labelTh: 'บุตร' },
        { value: 'parent', labelEn: 'Parent', labelTh: 'บิดา/มารดา' }
    ],

    // Address Types
    addressTypes: [
        { value: 'permanent', labelEn: 'Permanent Address', labelTh: 'ที่อยู่ตามทะเบียนบ้าน' },
        { value: 'current', labelEn: 'Current Address', labelTh: 'ที่อยู่ปัจจุบัน' }
    ],

    // Banks (Thailand)
    banks: [
        { value: 'BBL', labelEn: 'Bangkok Bank', labelTh: 'ธนาคารกรุงเทพ' },
        { value: 'KBANK', labelEn: 'Kasikorn Bank', labelTh: 'ธนาคารกสิกรไทย' },
        { value: 'KTB', labelEn: 'Krungthai Bank', labelTh: 'ธนาคารกรุงไทย' },
        { value: 'SCB', labelEn: 'Siam Commercial Bank', labelTh: 'ธนาคารไทยพาณิชย์' },
        { value: 'BAY', labelEn: 'Bank of Ayudhya', labelTh: 'ธนาคารกรุงศรีอยุธยา' },
        { value: 'TMB', labelEn: 'TMBThanachart Bank', labelTh: 'ธนาคารทหารไทยธนชาต' },
        { value: 'UOB', labelEn: 'United Overseas Bank', labelTh: 'ธนาคารยูโอบี' },
        { value: 'CIMB', labelEn: 'CIMB Thai Bank', labelTh: 'ธนาคารซีไอเอ็มบี ไทย' }
    ],

    // Employee Status
    employeeStatuses: [
        { value: 'active', labelEn: 'Active', labelTh: 'ปกติ' },
        { value: 'on_leave', labelEn: 'On Leave', labelTh: 'ลา' },
        { value: 'probation', labelEn: 'Probation', labelTh: 'ทดลองงาน' },
        { value: 'terminated', labelEn: 'Terminated', labelTh: 'พ้นสภาพ' },
        { value: 'resigned', labelEn: 'Resigned', labelTh: 'ลาออก' }
    ],

    // Contract Types
    contractTypes: [
        { value: 'regular', labelEn: 'Regular', labelTh: 'ปกติ' },
        { value: 'fixed_term', labelEn: 'Fixed Term', labelTh: 'สัญญาจ้างชั่วคราว' },
        { value: 'part_time', labelEn: 'Part Time', labelTh: 'งานพาร์ทไทม์' },
        { value: 'intern', labelEn: 'Intern', labelTh: 'นักศึกษาฝึกงาน' }
    ],

    // Employee Groups
    employeeGroups: [
        { value: 'A', labelEn: 'A - Permanent', labelTh: 'A - พนักงานประจำ' },
        { value: 'B', labelEn: 'B - Contract', labelTh: 'B - พนักงานสัญญาจ้าง' },
        { value: 'C', labelEn: 'C - Part-time', labelTh: 'C - พนักงานพาร์ทไทม์' },
        { value: 'D', labelEn: 'D - Daily Worker', labelTh: 'D - ลูกจ้างรายวัน' }
    ],

    // Job Types
    jobTypes: [
        { value: 'back_office', labelEn: 'Back Office', labelTh: 'สำนักงาน' },
        { value: 'store_operations', labelEn: 'Store Operations', labelTh: 'ปฏิบัติการร้าน' },
        { value: 'warehouse', labelEn: 'Warehouse', labelTh: 'คลังสินค้า' },
        { value: 'field_sales', labelEn: 'Field Sales', labelTh: 'พนักงานขายภาคสนาม' }
    ],

    // Education Degrees
    degrees: [
        { value: 'high_school', labelEn: 'High School', labelTh: 'มัธยมศึกษา' },
        { value: 'vocational', labelEn: 'Vocational Certificate', labelTh: 'ปวช.' },
        { value: 'diploma', labelEn: 'High Vocational Certificate', labelTh: 'ปวส.' },
        { value: 'bachelor', labelEn: "Bachelor's Degree", labelTh: 'ปริญญาตรี' },
        { value: 'master', labelEn: "Master's Degree", labelTh: 'ปริญญาโท' },
        { value: 'doctorate', labelEn: 'Doctorate', labelTh: 'ปริญญาเอก' }
    ],

    // Language Proficiency Levels
    proficiencyLevels: [
        { value: 'native', labelEn: 'Native', labelTh: 'ภาษาแม่' },
        { value: 'fluent', labelEn: 'Fluent', labelTh: 'คล่องแคล่ว' },
        { value: 'advanced', labelEn: 'Advanced', labelTh: 'ขั้นสูง' },
        { value: 'intermediate', labelEn: 'Intermediate', labelTh: 'ปานกลาง' },
        { value: 'basic', labelEn: 'Basic', labelTh: 'พื้นฐาน' }
    ],

    // Languages
    languages: [
        { value: 'thai', labelEn: 'Thai', labelTh: 'ภาษาไทย' },
        { value: 'english', labelEn: 'English', labelTh: 'ภาษาอังกฤษ' },
        { value: 'chinese', labelEn: 'Chinese', labelTh: 'ภาษาจีน' },
        { value: 'japanese', labelEn: 'Japanese', labelTh: 'ภาษาญี่ปุ่น' },
        { value: 'korean', labelEn: 'Korean', labelTh: 'ภาษาเกาหลี' },
        { value: 'french', labelEn: 'French', labelTh: 'ภาษาฝรั่งเศส' },
        { value: 'german', labelEn: 'German', labelTh: 'ภาษาเยอรมัน' },
        { value: 'spanish', labelEn: 'Spanish', labelTh: 'ภาษาสเปน' }
    ],

    // Benefit Plan Types
    benefitPlanTypes: [
        { value: 'health', labelEn: 'Health Insurance', labelTh: 'ประกันสุขภาพ' },
        { value: 'life', labelEn: 'Life Insurance', labelTh: 'ประกันชีวิต' },
        { value: 'dental', labelEn: 'Dental Insurance', labelTh: 'ประกันทันตกรรม' },
        { value: 'retirement', labelEn: 'Retirement/Provident Fund', labelTh: 'กองทุนสำรองเลี้ยงชีพ' },
        { value: 'accident', labelEn: 'Accident Insurance', labelTh: 'ประกันอุบัติเหตุ' }
    ],

    // Workflow Request Types
    requestTypes: [
        { value: 'personal_info_change', labelEn: 'Personal Information Change', labelTh: 'เปลี่ยนแปลงข้อมูลส่วนตัว' },
        { value: 'address_change', labelEn: 'Address Change', labelTh: 'เปลี่ยนแปลงที่อยู่' },
        { value: 'bank_change', labelEn: 'Bank Account Change', labelTh: 'เปลี่ยนแปลงบัญชีธนาคาร' },
        { value: 'dependent_add', labelEn: 'Add Dependent', labelTh: 'เพิ่มผู้พึ่งพิง' },
        { value: 'dependent_remove', labelEn: 'Remove Dependent', labelTh: 'ลบผู้พึ่งพิง' },
        { value: 'benefit_enrollment', labelEn: 'Benefit Enrollment', labelTh: 'ลงทะเบียนสวัสดิการ' },
        { value: 'leave_request', labelEn: 'Leave Request', labelTh: 'ขอลางาน' },
        { value: 'leave_request_extended', labelEn: 'Extended Leave Request', labelTh: 'ขอลางานระยะยาว' }
    ],

    // Work Permit Types
    permitTypes: [
        { value: 'non_immigrant_b', labelEn: 'Non-Immigrant B Visa Work Permit', labelTh: 'ใบอนุญาตทำงานวีซ่า Non-Immigrant B' },
        { value: 'boi_permit', labelEn: 'BOI Work Permit', labelTh: 'ใบอนุญาตทำงาน BOI' },
        { value: 'teaching_license', labelEn: 'Teaching License Work Permit', labelTh: 'ใบอนุญาตประกอบวิชาชีพครู' },
        { value: 'digital_permit', labelEn: 'Digital Work Permit', labelTh: 'ใบอนุญาตทำงานดิจิทัล' },
        { value: 'specialized_permit', labelEn: 'Specialized Work Permit', labelTh: 'ใบอนุญาตทำงานเฉพาะทาง' }
    ],

    // Religions
    religions: [
        { value: 'buddhist', labelEn: 'Buddhist', labelTh: 'พุทธ' },
        { value: 'christian', labelEn: 'Christian', labelTh: 'คริสต์' },
        { value: 'muslim', labelEn: 'Muslim', labelTh: 'อิสลาม' },
        { value: 'hindu', labelEn: 'Hindu', labelTh: 'ฮินดู' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' },
        { value: 'none', labelEn: 'None', labelTh: 'ไม่มี' }
    ],

    // Blood Types
    bloodTypes: [
        { value: 'a_positive', labelEn: 'A+', labelTh: 'A+' },
        { value: 'a_negative', labelEn: 'A-', labelTh: 'A-' },
        { value: 'b_positive', labelEn: 'B+', labelTh: 'B+' },
        { value: 'b_negative', labelEn: 'B-', labelTh: 'B-' },
        { value: 'ab_positive', labelEn: 'AB+', labelTh: 'AB+' },
        { value: 'ab_negative', labelEn: 'AB-', labelTh: 'AB-' },
        { value: 'o_positive', labelEn: 'O+', labelTh: 'O+' },
        { value: 'o_negative', labelEn: 'O-', labelTh: 'O-' }
    ],

    // Military Statuses
    militaryStatuses: [
        { value: 'completed', labelEn: 'Completed', labelTh: 'ผ่านการเกณฑ์ทหาร' },
        { value: 'exempted', labelEn: 'Exempted', labelTh: 'ได้รับการยกเว้น' },
        { value: 'deferred', labelEn: 'Deferred', labelTh: 'รอการเกณฑ์' },
        { value: 'not_applicable', labelEn: 'Not Applicable', labelTh: 'ไม่ใช้บังคับ' }
    ],

    // Leave Types
    leaveTypes: [
        { value: 'annual', labelEn: 'Annual Leave', labelTh: 'วันลาพักร้อน', color: 'blue' },
        { value: 'sick', labelEn: 'Sick Leave', labelTh: 'วันลาป่วย', color: 'orange' },
        { value: 'personal', labelEn: 'Personal Leave', labelTh: 'วันลากิจ', color: 'purple' },
        { value: 'maternity', labelEn: 'Maternity Leave', labelTh: 'วันลาคลอดบุตร', color: 'pink' },
        { value: 'paternity', labelEn: 'Paternity Leave', labelTh: 'วันลาดูแลบุตร', color: 'teal' },
        { value: 'ordination', labelEn: 'Ordination Leave', labelTh: 'วันลาบวช', color: 'amber' },
        { value: 'military', labelEn: 'Military Leave', labelTh: 'วันลาทหาร', color: 'gray' },
        { value: 'compensatory', labelEn: 'Compensatory Leave', labelTh: 'วันหยุดชดเชย', color: 'green' }
    ],

    // Leave Status
    leaveStatuses: [
        { value: 'pending', labelEn: 'Pending', labelTh: 'รอดำเนินการ' },
        { value: 'approved', labelEn: 'Approved', labelTh: 'อนุมัติแล้ว' },
        { value: 'rejected', labelEn: 'Rejected', labelTh: 'ปฏิเสธ' },
        { value: 'cancelled', labelEn: 'Cancelled', labelTh: 'ยกเลิก' }
    ],

    // Half Day Options
    halfDayOptions: [
        { value: 'morning', labelEn: 'Morning (AM)', labelTh: 'ครึ่งเช้า' },
        { value: 'afternoon', labelEn: 'Afternoon (PM)', labelTh: 'ครึ่งบ่าย' }
    ],

    // Visa Types
    visaTypes: [
        { value: 'non_immigrant_b', labelEn: 'Non-Immigrant B (Work)', labelTh: 'วีซ่าทำงาน (Non-Immigrant B)' },
        { value: 'non_immigrant_o', labelEn: 'Non-Immigrant O (Family)', labelTh: 'วีซ่าครอบครัว (Non-Immigrant O)' },
        { value: 'tourist', labelEn: 'Tourist Visa', labelTh: 'วีซ่าท่องเที่ยว' },
        { value: 'business', labelEn: 'Business Visa', labelTh: 'วีซ่าธุรกิจ' },
        { value: 'digital_nomad', labelEn: 'Digital Nomad Visa', labelTh: 'วีซ่าดิจิทัลโนแมด' },
        { value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }
    ],

    // Tax Document Types
    taxDocumentTypes: [
        { value: 'withholding_cert', labelEn: 'Withholding Tax Certificate (50 ทวิ)', labelTh: 'หนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ)' },
        { value: 'social_security', labelEn: 'Social Security Statement', labelTh: 'ใบแจ้งยอดประกันสังคม' },
        { value: 'provident_fund', labelEn: 'Provident Fund Statement', labelTh: 'ใบแจ้งยอดกองทุนสำรองเลี้ยงชีพ' }
    ],

    // Earnings Types (for payslip line items)
    earningsTypes: [
        { value: 'baseSalary', labelEn: 'Base Salary', labelTh: 'เงินเดือน' },
        { value: 'positionAllowance', labelEn: 'Position Allowance', labelTh: 'ค่าตำแหน่ง' },
        { value: 'colAllowance', labelEn: 'Cost of Living Allowance', labelTh: 'ค่าครองชีพ' },
        { value: 'overtime', labelEn: 'Overtime', labelTh: 'ค่าล่วงเวลา' },
        { value: 'otherEarnings', labelEn: 'Other Earnings', labelTh: 'รายได้อื่นๆ' }
    ],

    // Deduction Types (for payslip line items)
    deductionTypes: [
        { value: 'tax', labelEn: 'Personal Income Tax', labelTh: 'ภาษีเงินได้บุคคลธรรมดา' },
        { value: 'socialSecurity', labelEn: 'Social Security', labelTh: 'ประกันสังคม' },
        { value: 'providentFund', labelEn: 'Provident Fund', labelTh: 'กองทุนสำรองเลี้ยงชีพ' },
        { value: 'loans', labelEn: 'Loans', labelTh: 'สินเชื่อ/เงินกู้' },
        { value: 'otherDeductions', labelEn: 'Other Deductions', labelTh: 'รายการหักอื่นๆ' }
    ],

    // Goal Categories
    goalCategories: [
        { value: 'kpi', labelEn: 'KPI', labelTh: 'KPI', descriptionEn: 'Key Performance Indicators', descriptionTh: 'ตัวชี้วัดผลการดำเนินงานหลัก' },
        { value: 'gbest', labelEn: 'G-BEST', labelTh: 'G-BEST', descriptionEn: 'Central Group Behavioral Competencies', descriptionTh: 'สมรรถนะพฤติกรรมกลุ่มเซ็นทรัล' },
        { value: 'development', labelEn: 'Development', labelTh: 'การพัฒนา', descriptionEn: 'Personal and Professional Development Goals', descriptionTh: 'เป้าหมายการพัฒนาส่วนบุคคลและวิชาชีพ' }
    ],

    // Goal Metric Types
    metricTypes: [
        { value: 'number', labelEn: 'Number', labelTh: 'ตัวเลข', descriptionEn: 'Numeric value (e.g., 5, 100)', descriptionTh: 'ค่าตัวเลข (เช่น 5, 100)' },
        { value: 'percentage', labelEn: 'Percentage', labelTh: 'เปอร์เซ็นต์', descriptionEn: 'Percentage value (0-100%)', descriptionTh: 'ค่าเปอร์เซ็นต์ (0-100%)' },
        { value: 'yesno', labelEn: 'Yes/No', labelTh: 'ใช่/ไม่ใช่', descriptionEn: 'Binary completion (Yes or No)', descriptionTh: 'ผลสำเร็จแบบใช่หรือไม่' },
        { value: 'rating', labelEn: 'Rating (1-5)', labelTh: 'คะแนน (1-5)', descriptionEn: 'Rating scale from 1 to 5', descriptionTh: 'มาตรวัดคะแนน 1 ถึง 5' }
    ],

    // Goal Review Periods
    reviewPeriods: [
        { value: 'Q1', labelEn: 'Q1', labelTh: 'ไตรมาส 1', fullLabelEn: 'Quarter 1', fullLabelTh: 'ไตรมาสที่ 1' },
        { value: 'Q2', labelEn: 'Q2', labelTh: 'ไตรมาส 2', fullLabelEn: 'Quarter 2', fullLabelTh: 'ไตรมาสที่ 2' },
        { value: 'Q3', labelEn: 'Q3', labelTh: 'ไตรมาส 3', fullLabelEn: 'Quarter 3', fullLabelTh: 'ไตรมาสที่ 3' },
        { value: 'Q4', labelEn: 'Q4', labelTh: 'ไตรมาส 4', fullLabelEn: 'Quarter 4', fullLabelTh: 'ไตรมาสที่ 4' },
        { value: 'H1', labelEn: 'H1', labelTh: 'ครึ่งปีแรก', fullLabelEn: 'First Half', fullLabelTh: 'ครึ่งปีแรก' },
        { value: 'H2', labelEn: 'H2', labelTh: 'ครึ่งปีหลัง', fullLabelEn: 'Second Half', fullLabelTh: 'ครึ่งปีหลัง' },
        { value: 'Annual', labelEn: 'Annual', labelTh: 'ประจำปี', fullLabelEn: 'Annual', fullLabelTh: 'ประจำปี' }
    ],

    // Goal Statuses
    goalStatuses: [
        { value: 'draft', labelEn: 'Draft', labelTh: 'ร่าง', color: 'gray', icon: 'edit_note' },
        { value: 'submitted', labelEn: 'Submitted', labelTh: 'ส่งแล้ว', color: 'blue', icon: 'send' },
        { value: 'approved', labelEn: 'Approved', labelTh: 'อนุมัติแล้ว', color: 'green', icon: 'check_circle' },
        { value: 'in_progress', labelEn: 'In Progress', labelTh: 'กำลังดำเนินการ', color: 'orange', icon: 'pending' },
        { value: 'completed', labelEn: 'Completed', labelTh: 'เสร็จสิ้น', color: 'teal', icon: 'task_alt' },
        { value: 'sent_back', labelEn: 'Sent Back', labelTh: 'ส่งกลับ', color: 'red', icon: 'reply' }
    ],

    // G-BEST Competency Codes
    gbestCodes: [
        { value: 'G', labelEn: 'Guest Focus', labelTh: 'มุ่งเน้นลูกค้า' },
        { value: 'B', labelEn: 'Business Acumen', labelTh: 'ความเฉียบแหลมทางธุรกิจ' },
        { value: 'E', labelEn: 'Execution Excellence', labelTh: 'ความเป็นเลิศในการดำเนินงาน' },
        { value: 'S', labelEn: 'Self Development', labelTh: 'การพัฒนาตนเอง' },
        { value: 'T', labelEn: 'Teamwork', labelTh: 'การทำงานเป็นทีม' }
    ],

    // Goal Years
    goalYears: [
        { value: '2024', labelEn: '2024', labelTh: '2567' },
        { value: '2025', labelEn: '2025', labelTh: '2568' },
        { value: '2026', labelEn: '2026', labelTh: '2569' },
        { value: '2027', labelEn: '2027', labelTh: '2570' }
    ],

    // Evaluation Statuses (workflow states)
    evaluationStatuses: [
        { value: 'self_assessment', labelEn: 'Self Assessment', labelTh: 'ประเมินตนเอง', color: 'blue', icon: 'person' },
        { value: 'manager_review', labelEn: 'Manager Review', labelTh: 'หัวหน้าประเมิน', color: 'orange', icon: 'supervisor_account' },
        { value: 'calibration', labelEn: 'HR Calibration', labelTh: 'ปรับเทียบโดย HR', color: 'purple', icon: 'tune' },
        { value: 'confirmed', labelEn: 'Confirmed', labelTh: 'ยืนยันแล้ว', color: 'teal', icon: 'verified' },
        { value: 'acknowledged', labelEn: 'Acknowledged', labelTh: 'รับทราบแล้ว', color: 'green', icon: 'check_circle' }
    ],

    // Rating Scale (5-point with Thai descriptors)
    ratingScale: [
        { value: 5, labelEn: 'Outstanding', labelTh: 'ดีเด่น', descriptionEn: 'Consistently exceeds all expectations with exceptional results', descriptionTh: 'ทำได้เกินความคาดหวังทุกด้านอย่างโดดเด่น', color: 'emerald' },
        { value: 4, labelEn: 'Exceeds Expectations', labelTh: 'ดีมาก', descriptionEn: 'Frequently exceeds expectations in most areas', descriptionTh: 'ทำได้เกินความคาดหวังในหลายด้าน', color: 'green' },
        { value: 3, labelEn: 'Meets Expectations', labelTh: 'ดี', descriptionEn: 'Consistently meets expectations and requirements', descriptionTh: 'ทำได้ตามความคาดหวังและข้อกำหนด', color: 'blue' },
        { value: 2, labelEn: 'Below Expectations', labelTh: 'ต้องปรับปรุง', descriptionEn: 'Occasionally meets expectations but needs improvement', descriptionTh: 'บางครั้งทำได้ตามความคาดหวังแต่ต้องปรับปรุง', color: 'amber' },
        { value: 1, labelEn: 'Unsatisfactory', labelTh: 'ไม่เป็นที่พอใจ', descriptionEn: 'Does not meet minimum expectations', descriptionTh: 'ไม่ถึงความคาดหวังขั้นต่ำ', color: 'red' }
    ],

    // Evaluation Component Weights (default configuration)
    evaluationWeightDefaults: {
        kpi: { value: 50, labelEn: 'KPI Results', labelTh: 'ผลลัพธ์ KPI' },
        gbest: { value: 30, labelEn: 'G-BEST Competencies', labelTh: 'สมรรถนะ G-BEST' },
        attendance: { value: 10, labelEn: 'Attendance', labelTh: 'การเข้างาน' },
        manager: { value: 10, labelEn: 'Manager Assessment', labelTh: 'การประเมินจากหัวหน้า' }
    },

    // Evaluation Periods
    evaluationPeriods: [
        { value: 'annual', labelEn: 'Annual Review', labelTh: 'ประเมินประจำปี' },
        { value: 'mid_year', labelEn: 'Mid-Year Review', labelTh: 'ประเมินกลางปี' },
        { value: 'probation', labelEn: 'Probation Review', labelTh: 'ประเมินทดลองงาน' },
        { value: 'quarterly', labelEn: 'Quarterly Review', labelTh: 'ประเมินรายไตรมาส' }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockLookupData;
}

/**
 * Internationalization (i18n) Module
 * Supports Thai and English languages
 */

const i18n = (function() {
    let currentLang = 'en';
    let translations = {};

    /**
     * Load translations from JSON files
     */
    async function loadTranslations() {
        try {
            const [enData, thData] = await Promise.all([
                fetch('locales/en.json').then(r => r.json()),
                fetch('locales/th.json').then(r => r.json())
            ]);
            translations = {
                en: enData,
                th: thData
            };
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Use inline fallback translations
            translations = {
                en: getEnglishFallback(),
                th: getThaiFallback()
            };
        }
    }

    /**
     * Get nested value from object using dot notation
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Replace placeholders in string with values
     */
    function interpolate(str, params) {
        if (!params) return str;
        return str.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    /**
     * Fallback English translations
     */
    function getEnglishFallback() {
        return {
            common: {
                loading: 'Loading...',
                save: 'Save',
                cancel: 'Cancel',
                edit: 'Edit',
                delete: 'Delete',
                add: 'Add',
                close: 'Close',
                confirm: 'Confirm',
                search: 'Search',
                backToHome: 'Back to Home',
                retry: 'Retry',
                viewMore: 'View More',
                showMore: 'Show More',
                showLess: 'Show Less',
                actions: 'Actions',
                history: 'History',
                effectiveDate: 'Effective Date',
                required: 'Required',
                optional: 'Optional',
                yes: 'Yes',
                no: 'No'
            },
            nav: {
                home: 'Home',
                profile: 'Profile',
                workflows: 'Workflows',
                settings: 'Settings',
                help: 'Help',
                logout: 'Logout',
                employeeFiles: 'Employee Files',
                searchPlaceholder: 'Search for actions or people'
            },
            profile: {
                title: 'Profile',
                personal: 'Personal Information',
                employment: 'Employment',
                compensation: 'Compensation',
                benefits: 'Benefits',
                profileDetails: 'Profile',
                scorecard: 'Scorecard',
                asOfToday: 'As of Today',
                header: 'Header'
            },
            personal: {
                title: 'Personal Information',
                basicInfo: 'Basic Information',
                salutation: 'Salutation',
                firstName: 'First Name',
                middleName: 'Middle Name',
                lastName: 'Last Name',
                nickname: 'Nickname',
                gender: 'Gender',
                dateOfBirth: 'Date of Birth',
                nationality: 'Nationality',
                nationalId: 'National ID',
                maritalStatus: 'Marital Status',
                maritalStatusSince: 'Marital Status Since',
                contact: 'Contact Information',
                businessEmail: 'Business Email',
                personalEmail: 'Personal Email',
                businessPhone: 'Business Phone',
                personalMobile: 'Personal Mobile',
                homePhone: 'Home Phone',
                address: 'Address Information',
                permanentAddress: 'Permanent Address',
                currentAddress: 'Current Address',
                addressLine1: 'Address Line 1',
                addressLine2: 'Address Line 2',
                district: 'District',
                subDistrict: 'Sub-District',
                province: 'Province',
                postalCode: 'Postal Code',
                country: 'Country',
                emergencyContacts: 'Emergency Contacts',
                emergencyContact: 'Emergency Contact',
                relationship: 'Relationship',
                phone: 'Phone',
                dependents: 'Dependents',
                dependent: 'Dependent',
                dependentType: 'Dependent Type',
                primary: 'Primary'
            },
            employment: {
                title: 'Employment Information',
                details: 'Employment Details',
                hireDate: 'Hire Date',
                originalStartDate: 'Original Start Date',
                seniorityStartDate: 'Seniority Start Date',
                yearsOfService: 'Years of Service',
                passProbationDate: 'Pass Probation Date',
                currentJobEffectiveDate: 'Current Job Effective Date',
                currentYearsInJob: 'Current Years in Job',
                organization: 'Organization Information',
                company: 'Company',
                position: 'Position',
                group: 'Group',
                businessUnit: 'Business Unit',
                function: 'Function',
                department: 'Organization',
                storeBranchCode: 'Store/Branch Code',
                hrDistrict: 'HR District',
                costCenter: 'Cost Center',
                workLocation: 'Work Location',
                job: 'Job Information',
                employeeStatus: 'Employee Status',
                supervisor: 'Supervisor',
                jobFamily: 'Job Family',
                jobCode: 'Job Code',
                jobRole: 'Job Role',
                jobType: 'Job Type',
                employeeGroup: 'Employee Group',
                contractType: 'Contract Type',
                contractEndDate: 'Contract End Date',
                orgChart: 'Organization Chart'
            },
            compensation: {
                title: 'Compensation',
                paymentInfo: 'Payment Information',
                jobCountry: 'Job Country/Region',
                paymentMethod: 'Payment Method',
                payType: 'Pay Type',
                bank: 'Bank',
                accountNumber: 'Account Number',
                payroll: 'Payroll Information',
                grossAmount: 'Gross Amount',
                payslips: 'Payslips',
                downloadPayslip: 'Download Payslip',
                taxDocuments: 'Tax Documents',
                downloadTax: 'Download Tax Document'
            },
            benefits: {
                title: 'Benefits',
                overview: 'Benefits Overview',
                activeEnrollments: 'My Active Enrollments',
                benefitPlan: 'Benefit Plan',
                coverage: 'Coverage',
                enrollmentDate: 'Enrollment Date',
                effectiveDate: 'Effective Date',
                dependentsCovered: 'Dependents Covered'
            },
            profileDetails: {
                title: 'Profile Details',
                education: 'Formal Education',
                previousEmployment: 'Previous Employment',
                learningHistory: 'Learning History',
                languages: 'Language Skills',
                certifications: 'Certifications/Licenses',
                awards: 'Honours/Awards',
                mobility: 'Mobility Preferences',
                documents: 'Individual Documents'
            },
            workflow: {
                title: 'Pending Workflows',
                forApproval: 'For Approval',
                sentBack: 'Sent Back',
                approved: 'Approved',
                reassigned: 'Reassigned',
                requestType: 'Request Type',
                requestedBy: 'Requested By',
                requestDate: 'Request Date',
                status: 'Status',
                approve: 'Approve',
                reject: 'Reject',
                sendBack: 'Send Back',
                comments: 'Comments',
                reason: 'Reason',
                pending: 'Pending',
                completed: 'Completed',
                rejected: 'Rejected',
                noRequests: 'No pending requests'
            },
            home: {
                quickActions: 'Quick Actions',
                viewMyProfile: 'View My Profile',
                manageMyData: 'Manage My Data',
                viewPendingWorkflows: 'View Pending Workflows',
                forYouToday: 'For You Today',
                teamSummary: 'Team Summary',
                pendingApprovals: 'Pending Approvals',
                directReports: 'Direct Reports'
            },
            error: {
                pageNotFound: 'Page Not Found',
                pageNotFoundDesc: 'The page you are looking for does not exist.',
                initFailed: 'Application Failed to Load',
                loadFailed: 'Failed to load data. Please try again.',
                saveFailed: 'Failed to save changes. Please try again.',
                validationFailed: 'Please correct the errors below.',
                networkError: 'Network error. Please check your connection.',
                unauthorized: 'You are not authorized to perform this action.',
                sessionExpired: 'Your session has expired. Please log in again.'
            },
            validation: {
                required: 'This field is required',
                email: 'Please enter a valid email address',
                phone: 'Please enter a valid phone number',
                date: 'Please enter a valid date',
                futureDate: 'Date must be in the future',
                pastDate: 'Date must be in the past',
                minLength: 'Must be at least {min} characters',
                maxLength: 'Must be no more than {max} characters',
                numeric: 'Must be a number',
                postalCode: 'Please enter a valid postal code'
            },
            accessibility: {
                skipToContent: 'Skip to main content',
                closeModal: 'Close dialog',
                openMenu: 'Open menu',
                closeMenu: 'Close menu',
                expandSection: 'Expand section',
                collapseSection: 'Collapse section',
                notifications: 'Notifications',
                unreadNotifications: '{count} unread notifications'
            },
            toast: {
                saveSuccess: 'Changes saved successfully',
                deleteSuccess: 'Item deleted successfully',
                approveSuccess: 'Request approved successfully',
                rejectSuccess: 'Request rejected successfully',
                sendBackSuccess: 'Request sent back successfully'
            }
        };
    }

    /**
     * Fallback Thai translations
     */
    function getThaiFallback() {
        return {
            common: {
                loading: 'กำลังโหลด...',
                save: 'บันทึก',
                cancel: 'ยกเลิก',
                edit: 'แก้ไข',
                delete: 'ลบ',
                add: 'เพิ่ม',
                close: 'ปิด',
                confirm: 'ยืนยัน',
                search: 'ค้นหา',
                backToHome: 'กลับหน้าหลัก',
                retry: 'ลองใหม่',
                viewMore: 'ดูเพิ่มเติม',
                showMore: 'แสดงเพิ่มเติม',
                showLess: 'แสดงน้อยลง',
                actions: 'การดำเนินการ',
                history: 'ประวัติ',
                effectiveDate: 'วันที่มีผล',
                required: 'จำเป็น',
                optional: 'ไม่บังคับ',
                yes: 'ใช่',
                no: 'ไม่'
            },
            nav: {
                home: 'หน้าหลัก',
                profile: 'โปรไฟล์',
                workflows: 'คำขอ',
                settings: 'การตั้งค่า',
                help: 'ช่วยเหลือ',
                logout: 'ออกจากระบบ',
                employeeFiles: 'ข้อมูลพนักงาน',
                searchPlaceholder: 'ค้นหาการดำเนินการหรือบุคคล'
            },
            profile: {
                title: 'โปรไฟล์',
                personal: 'ข้อมูลส่วนตัว',
                employment: 'ข้อมูลการจ้างงาน',
                compensation: 'ค่าตอบแทน',
                benefits: 'สวัสดิการ',
                profileDetails: 'โปรไฟล์',
                scorecard: 'สกอร์การ์ด',
                asOfToday: 'ณ วันนี้',
                header: 'ส่วนหัว'
            },
            personal: {
                title: 'ข้อมูลส่วนตัว',
                basicInfo: 'ข้อมูลพื้นฐาน',
                salutation: 'คำนำหน้า',
                firstName: 'ชื่อ',
                middleName: 'ชื่อกลาง',
                lastName: 'นามสกุล',
                nickname: 'ชื่อเล่น',
                gender: 'เพศ',
                dateOfBirth: 'วันเกิด',
                nationality: 'สัญชาติ',
                nationalId: 'เลขประจำตัวประชาชน',
                maritalStatus: 'สถานภาพสมรส',
                maritalStatusSince: 'สถานภาพสมรสตั้งแต่',
                contact: 'ข้อมูลติดต่อ',
                businessEmail: 'อีเมลธุรกิจ',
                personalEmail: 'อีเมลส่วนตัว',
                businessPhone: 'โทรศัพท์ธุรกิจ',
                personalMobile: 'มือถือส่วนตัว',
                homePhone: 'โทรศัพท์บ้าน',
                address: 'ที่อยู่',
                permanentAddress: 'ที่อยู่ตามทะเบียนบ้าน',
                currentAddress: 'ที่อยู่ปัจจุบัน',
                addressLine1: 'ที่อยู่บรรทัด 1',
                addressLine2: 'ที่อยู่บรรทัด 2',
                district: 'เขต/อำเภอ',
                subDistrict: 'แขวง/ตำบล',
                province: 'จังหวัด',
                postalCode: 'รหัสไปรษณีย์',
                country: 'ประเทศ',
                emergencyContacts: 'ผู้ติดต่อฉุกเฉิน',
                emergencyContact: 'ผู้ติดต่อฉุกเฉิน',
                relationship: 'ความสัมพันธ์',
                phone: 'โทรศัพท์',
                dependents: 'ผู้พึ่งพิง',
                dependent: 'ผู้พึ่งพิง',
                dependentType: 'ประเภทผู้พึ่งพิง',
                primary: 'หลัก'
            },
            employment: {
                title: 'ข้อมูลการจ้างงาน',
                details: 'รายละเอียดการจ้างงาน',
                hireDate: 'วันที่เริ่มงาน',
                originalStartDate: 'วันเริ่มงานครั้งแรก',
                seniorityStartDate: 'วันเริ่มนับอายุงาน',
                yearsOfService: 'อายุงาน',
                passProbationDate: 'วันผ่านทดลองงาน',
                currentJobEffectiveDate: 'วันมีผลตำแหน่งปัจจุบัน',
                currentYearsInJob: 'อายุงานในตำแหน่ง',
                organization: 'ข้อมูลหน่วยงาน',
                company: 'บริษัท',
                position: 'ตำแหน่ง',
                group: 'กลุ่ม',
                businessUnit: 'หน่วยธุรกิจ',
                function: 'ฟังก์ชัน',
                department: 'องค์กร',
                storeBranchCode: 'รหัสสาขา/ร้าน',
                hrDistrict: 'HR District',
                costCenter: 'ศูนย์ต้นทุน',
                workLocation: 'สถานที่ทำงาน',
                job: 'ข้อมูลตำแหน่งงาน',
                employeeStatus: 'สถานะพนักงาน',
                supervisor: 'หัวหน้างาน',
                jobFamily: 'กลุ่มงาน',
                jobCode: 'รหัสงาน',
                jobRole: 'บทบาทงาน',
                jobType: 'ประเภทงาน',
                employeeGroup: 'กลุ่มพนักงาน',
                contractType: 'ประเภทสัญญา',
                contractEndDate: 'วันสิ้นสุดสัญญา',
                orgChart: 'ผังองค์กร'
            },
            compensation: {
                title: 'ค่าตอบแทน',
                paymentInfo: 'ข้อมูลการจ่ายเงิน',
                jobCountry: 'ประเทศ/ภูมิภาคการทำงาน',
                paymentMethod: 'วิธีการจ่ายเงิน',
                payType: 'ประเภทการจ่าย',
                bank: 'ธนาคาร',
                accountNumber: 'เลขที่บัญชี',
                payroll: 'ข้อมูลเงินเดือน',
                grossAmount: 'เงินเดือนรวม',
                payslips: 'สลิปเงินเดือน',
                downloadPayslip: 'ดาวน์โหลดสลิปเงินเดือน',
                taxDocuments: 'เอกสารภาษี',
                downloadTax: 'ดาวน์โหลดเอกสารภาษี'
            },
            benefits: {
                title: 'สวัสดิการ',
                overview: 'ภาพรวมสวัสดิการ',
                activeEnrollments: 'สวัสดิการที่ลงทะเบียน',
                benefitPlan: 'แผนสวัสดิการ',
                coverage: 'ความคุ้มครอง',
                enrollmentDate: 'วันที่ลงทะเบียน',
                effectiveDate: 'วันที่มีผล',
                dependentsCovered: 'ผู้พึ่งพิงที่ครอบคลุม'
            },
            profileDetails: {
                title: 'รายละเอียดโปรไฟล์',
                education: 'ประวัติการศึกษา',
                previousEmployment: 'ประวัติการทำงาน',
                learningHistory: 'ประวัติการอบรม',
                languages: 'ทักษะภาษา',
                certifications: 'ใบรับรอง/ใบอนุญาต',
                awards: 'รางวัลและเกียรติยศ',
                mobility: 'ความพร้อมในการย้าย',
                documents: 'เอกสารส่วนตัว'
            },
            workflow: {
                title: 'คำขอที่รอดำเนินการ',
                forApproval: 'รอการอนุมัติ',
                sentBack: 'ส่งกลับแก้ไข',
                approved: 'อนุมัติแล้ว',
                reassigned: 'โอนไปให้ผู้อื่น',
                requestType: 'ประเภทคำขอ',
                requestedBy: 'ผู้ขอ',
                requestDate: 'วันที่ขอ',
                status: 'สถานะ',
                approve: 'อนุมัติ',
                reject: 'ปฏิเสธ',
                sendBack: 'ส่งกลับ',
                comments: 'ความคิดเห็น',
                reason: 'เหตุผล',
                pending: 'รอดำเนินการ',
                completed: 'เสร็จสิ้น',
                rejected: 'ปฏิเสธ',
                noRequests: 'ไม่มีคำขอที่รอดำเนินการ'
            },
            home: {
                quickActions: 'การดำเนินการด่วน',
                viewMyProfile: 'ดูโปรไฟล์ของฉัน',
                manageMyData: 'จัดการข้อมูลของฉัน',
                viewPendingWorkflows: 'ดูคำขอที่รอดำเนินการ',
                forYouToday: 'สำหรับคุณวันนี้',
                teamSummary: 'สรุปทีม',
                pendingApprovals: 'รอการอนุมัติ',
                directReports: 'ผู้ใต้บังคับบัญชา'
            },
            error: {
                pageNotFound: 'ไม่พบหน้าที่ต้องการ',
                pageNotFoundDesc: 'หน้าที่คุณกำลังค้นหาไม่มีอยู่',
                initFailed: 'ไม่สามารถโหลดแอปพลิเคชันได้',
                loadFailed: 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่',
                saveFailed: 'ไม่สามารถบันทึกการเปลี่ยนแปลงได้ กรุณาลองใหม่',
                validationFailed: 'กรุณาแก้ไขข้อผิดพลาดด้านล่าง',
                networkError: 'เกิดข้อผิดพลาดเครือข่าย กรุณาตรวจสอบการเชื่อมต่อ',
                unauthorized: 'คุณไม่ได้รับอนุญาตให้ดำเนินการนี้',
                sessionExpired: 'เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่'
            },
            validation: {
                required: 'จำเป็นต้องกรอกข้อมูลนี้',
                email: 'กรุณากรอกอีเมลที่ถูกต้อง',
                phone: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
                date: 'กรุณากรอกวันที่ที่ถูกต้อง',
                futureDate: 'วันที่ต้องเป็นวันในอนาคต',
                pastDate: 'วันที่ต้องเป็นวันในอดีต',
                minLength: 'ต้องมีอย่างน้อย {min} ตัวอักษร',
                maxLength: 'ต้องไม่เกิน {max} ตัวอักษร',
                numeric: 'ต้องเป็นตัวเลข',
                postalCode: 'กรุณากรอกรหัสไปรษณีย์ที่ถูกต้อง'
            },
            accessibility: {
                skipToContent: 'ข้ามไปยังเนื้อหาหลัก',
                closeModal: 'ปิดกล่องโต้ตอบ',
                openMenu: 'เปิดเมนู',
                closeMenu: 'ปิดเมนู',
                expandSection: 'ขยายส่วน',
                collapseSection: 'ยุบส่วน',
                notifications: 'การแจ้งเตือน',
                unreadNotifications: '{count} การแจ้งเตือนที่ยังไม่ได้อ่าน'
            },
            toast: {
                saveSuccess: 'บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว',
                deleteSuccess: 'ลบรายการเรียบร้อยแล้ว',
                approveSuccess: 'อนุมัติคำขอเรียบร้อยแล้ว',
                rejectSuccess: 'ปฏิเสธคำขอเรียบร้อยแล้ว',
                sendBackSuccess: 'ส่งกลับคำขอเรียบร้อยแล้ว'
            }
        };
    }

    return {
        /**
         * Initialize i18n
         */
        async init() {
            // Get saved language or detect from browser
            currentLang = localStorage.getItem('language') ||
                         (navigator.language.startsWith('th') ? 'th' : 'en');

            await loadTranslations();
            document.documentElement.lang = currentLang;
        },

        /**
         * Get translation for key
         * @param {string} key - Dot-notation key (e.g., 'common.save')
         * @param {object} params - Optional parameters for interpolation
         * @returns {string}
         */
        t(key, params) {
            const translation = getNestedValue(translations[currentLang], key) ||
                               getNestedValue(translations['en'], key) ||
                               key;
            return interpolate(translation, params);
        },

        /**
         * Get current language
         * @returns {string}
         */
        getLanguage() {
            return currentLang;
        },

        /**
         * Set language
         * @param {string} lang - 'en' or 'th'
         */
        setLanguage(lang) {
            if (lang === 'en' || lang === 'th') {
                currentLang = lang;
                localStorage.setItem('language', lang);
                document.documentElement.lang = lang;
                AppState.set('language', lang);
            }
        },

        /**
         * Toggle between languages
         */
        toggleLanguage() {
            this.setLanguage(currentLang === 'en' ? 'th' : 'en');
        },

        /**
         * Check if current language is Thai
         * @returns {boolean}
         */
        isThai() {
            return currentLang === 'th';
        },

        /**
         * Get all available languages
         * @returns {array}
         */
        getAvailableLanguages() {
            return [
                { code: 'en', name: 'English', nativeName: 'English' },
                { code: 'th', name: 'Thai', nativeName: 'ภาษาไทย' }
            ];
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}

# Chore: Implement Advanced Personal Information Section

## Metadata
adw_id: `1b8269b9`
prompt: `Implement Advanced Personal Information section from PRD Section 3.1. Add to apps/js/pages/personal-info.js after Personal Information section: 1) Create renderAdvancedInfoSection() method with fields: religion, blood type, military status, visa information (for non-Thai employees) 2) Add edit modal with conditional fields based on nationality 3) Add mock advanced info data to mock-employee.js 4) Add i18n translations for all fields: 'Religion', 'Blood Type', 'Military Status', 'Visa Type', 'Visa Expiry Date' 5) Apply RBAC - only HR Admin/Manager can edit most fields.`

## Chore Description
This chore implements the Advanced Personal Information section as specified in PRD Section 3.1. This section extends the basic personal information with additional employee details including religion, blood type, military status, and visa information for non-Thai nationals. The implementation provides:

1. A dedicated Advanced Information section displaying extended personal details
2. Edit functionality with conditional field visibility based on employee nationality
3. Field-level access control ensuring only HR Admin and HR Manager can edit sensitive information
4. Mock data structure for advanced personal information
5. Bilingual translations (Thai/English) for all advanced information fields
6. Workflow integration requiring appropriate approval for changes
7. Consistent UI/UX following existing patterns in the Personal Information page

The advanced information section is important for comprehensive employee records and enables HR to maintain complete personnel data while respecting data privacy through RBAC controls.

## Relevant Files
Use these files to complete the chore:

- **apps/js/pages/personal-info.js** - Personal Information page module. Will add `renderAdvancedInfoSection()` method to display advanced personal information fields, `editAdvancedInfo()` and `openAdvancedInfoModal()` methods for the edit modal with conditional field visibility, `saveAdvancedInfo()` async method for submission with workflow triggers, and integrate the section into the main `render()` method after the Personal Information section.

- **apps/js/data/mock-employee.js** - Employee mock data. Will add a new `advancedInfo` object to the employee structure (after line 38, after the `personalInfo` object) containing: religion, bloodType, militaryStatus (for Thai males), visaType, visaNumber, visaIssueDate, visaExpiryDate (for non-Thai nationals), and effectiveDate. Should include comprehensive sample data for testing.

- **apps/locales/en.json** - English translations. Will add new translation keys under the `personal` section for: advancedInfo (title), religion, bloodType, militaryStatus, visaType, visaNumber, visaIssueDate, visaExpiryDate, editAdvancedInfo, and all corresponding lookup values (religions, blood types, military statuses, visa types).

- **apps/locales/th.json** - Thai translations. Will add corresponding Thai translations for all advanced info fields under the `personal` section: advancedInfo (ข้อมูลส่วนตัวเพิ่มเติม), religion (ศาสนา), bloodType (หมู่เลือด), militaryStatus (สถานะทหาร), visaType (ประเภทวีซ่า), visaNumber (หมายเลขวีซ่า), visaIssueDate (วันออกวีซ่า), visaExpiryDate (วันหมดอายุวีซ่า), and all corresponding lookup value translations.

- **apps/js/workflow/rules.js** - Workflow rules configuration. Will add a new `advanced_info_change` rule to the appropriate approval array (likely `managerAndHRApproval`) since advanced information changes contain sensitive personal data requiring HR verification.

- **apps/js/api.js** - Mock API client. Will add a new async method: `updateAdvancedInfo(employeeId, advancedInfoData)` following the pattern of existing update methods with workflow submission for handling advanced information updates.

- **apps/js/data/mock-lookups.js** - Mock lookup data. Will add new lookup arrays for: religions (Buddhist, Christian, Muslim, Hindu, Other, None), bloodTypes (A, B, AB, O, A+, A-, B+, B-, AB+, AB-, O+, O-), militaryStatuses (Exempted, Completed, Deferred, Not Applicable), and visaTypes (Non-Immigrant B, Non-Immigrant O, Tourist, Business, Digital Nomad, Other).

- **apps/js/utils/rbac.js** - Role-based access control. Will add field permissions for the new `advancedInfo` section ensuring only HR Admin and HR Manager can edit these fields (employees can only view).

### New Files
None - all changes are additions to existing files.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Advanced Info Data
- Open `apps/js/data/mock-employee.js`
- Locate the employee object and find the `personalInfo` object (ends around line 38)
- After the closing brace of the `personalInfo` object (after line 38), add a comma and insert a new `advancedInfo` object
- Structure the advanced info object with the following fields:
  - `religion`: String - employee's religion (e.g., 'Buddhist', 'Christian', 'Muslim', 'Hindu', 'Other', 'None')
  - `bloodType`: String - employee's blood type (e.g., 'O+', 'A+', 'B+', 'AB+', 'O-', 'A-', 'B-', 'AB-')
  - `militaryStatus`: String - for Thai male employees (e.g., 'Completed', 'Exempted', 'Deferred', 'Not Applicable')
  - `visaType`: String or null - for non-Thai employees (e.g., 'Non-Immigrant B', 'Non-Immigrant O', null for Thai nationals)
  - `visaNumber`: String or null - visa number (e.g., 'TH-B-2024-123456' or null)
  - `visaIssueDate`: ISO date string or null - when visa was issued (e.g., '2024-01-15' or null)
  - `visaExpiryDate`: ISO date string or null - when visa expires (e.g., '2026-01-15' or null)
  - `effectiveDate`: ISO date string - when this data became effective (e.g., '2020-01-01')
- Add a comment above the advancedInfo object: `// Advanced Personal Information`
- For the mock Thai employee, set visa fields to null and include militaryStatus
- Ensure proper JSON syntax with commas between objects

### 2. Add Mock Lookup Data for Advanced Info
- Open `apps/js/data/mock-lookups.js`
- Add the following new arrays to the MockLookupData object:
  - `religions`: Array of religion objects
    - Buddhist: `{ value: 'buddhist', labelEn: 'Buddhist', labelTh: 'พุทธ' }`
    - Christian: `{ value: 'christian', labelEn: 'Christian', labelTh: 'คริสต์' }`
    - Muslim: `{ value: 'muslim', labelEn: 'Muslim', labelTh: 'อิสลาม' }`
    - Hindu: `{ value: 'hindu', labelEn: 'Hindu', labelTh: 'ฮินดู' }`
    - Other: `{ value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }`
    - None: `{ value: 'none', labelEn: 'None', labelTh: 'ไม่มี' }`
  - `bloodTypes`: Array of blood type objects
    - Include all 8 types: A+, A-, B+, B-, AB+, AB-, O+, O-
    - Format: `{ value: 'o_positive', labelEn: 'O+', labelTh: 'O+' }`
  - `militaryStatuses`: Array of military status objects
    - Completed: `{ value: 'completed', labelEn: 'Completed', labelTh: 'ผ่านการเกณฑ์ทหาร' }`
    - Exempted: `{ value: 'exempted', labelEn: 'Exempted', labelTh: 'ได้รับการยกเว้น' }`
    - Deferred: `{ value: 'deferred', labelEn: 'Deferred', labelTh: 'รอการเกณฑ์' }`
    - Not Applicable: `{ value: 'not_applicable', labelEn: 'Not Applicable', labelTh: 'ไม่ใช้บังคับ' }`
  - `visaTypes`: Array of visa type objects
    - Non-Immigrant B: `{ value: 'non_immigrant_b', labelEn: 'Non-Immigrant B (Work)', labelTh: 'วีซ่าทำงาน (Non-Immigrant B)' }`
    - Non-Immigrant O: `{ value: 'non_immigrant_o', labelEn: 'Non-Immigrant O (Family)', labelTh: 'วีซ่าครอบครัว (Non-Immigrant O)' }`
    - Tourist: `{ value: 'tourist', labelEn: 'Tourist Visa', labelTh: 'วีซ่าท่องเที่ยว' }`
    - Business: `{ value: 'business', labelEn: 'Business Visa', labelTh: 'วีซ่าธุรกิจ' }`
    - Digital Nomad: `{ value: 'digital_nomad', labelEn: 'Digital Nomad Visa', labelTh: 'วีซ่าดิจิทัลโนแมด' }`
    - Other: `{ value: 'other', labelEn: 'Other', labelTh: 'อื่นๆ' }`
- Export all arrays as part of MockLookupData
- Ensure proper JavaScript object syntax

### 3. Add English Translations for Advanced Info
- Open `apps/locales/en.json`
- Locate the `personal` section (starts around line 59)
- After the last key in the personal section (before the closing brace), add the following translation keys:
  - `advancedInfo`: "Advanced Information"
  - `religion`: "Religion"
  - `bloodType`: "Blood Type"
  - `militaryStatus`: "Military Status"
  - `visaType`: "Visa Type"
  - `visaNumber`: "Visa Number"
  - `visaIssueDate`: "Visa Issue Date"
  - `visaExpiryDate`: "Visa Expiry Date"
  - `editAdvancedInfo`: "Edit Advanced Information"
  - `visaInformation`: "Visa Information"
  - `militaryInformation`: "Military Information"
  - `healthInformation`: "Health Information"
- Add a new `religion` section with all religion value translations:
  - `buddhist`: "Buddhist"
  - `christian`: "Christian"
  - `muslim`: "Muslim"
  - `hindu`: "Hindu"
  - `other`: "Other"
  - `none`: "None"
- Add a new `bloodType` section with all blood type value translations
- Add a new `militaryStatus` section with all military status value translations
- Add a new `visaType` section with all visa type value translations
- Ensure proper JSON syntax with commas between entries

### 4. Add Thai Translations for Advanced Info
- Open `apps/locales/th.json`
- Locate the `personal` section (starts around line 59)
- Add the corresponding Thai translations for all advanced info keys:
  - `advancedInfo`: "ข้อมูลส่วนตัวเพิ่มเติม"
  - `religion`: "ศาสนา"
  - `bloodType`: "หมู่เลือด"
  - `militaryStatus`: "สถานะทหาร"
  - `visaType`: "ประเภทวีซ่า"
  - `visaNumber`: "หมายเลขวีซ่า"
  - `visaIssueDate`: "วันออกวีซ่า"
  - `visaExpiryDate`: "วันหมดอายุวีซ่า"
  - `editAdvancedInfo`: "แก้ไขข้อมูลส่วนตัวเพิ่มเติม"
  - `visaInformation`: "ข้อมูลวีซ่า"
  - `militaryInformation`: "ข้อมูลการทหาร"
  - `healthInformation`: "ข้อมูลสุขภาพ"
- Add corresponding Thai translations for all lookup values in religion, bloodType, militaryStatus, and visaType sections (matching the values from Step 2)
- Ensure proper JSON syntax with commas between entries

### 5. Add RBAC Field Permissions for Advanced Info
- Open `apps/js/utils/rbac.js`
- Locate the `fieldPermissions` object (around line 66)
- After the existing sections (personalInfo, contactInfo, address, etc.), add a new `advancedInfo` section:
  ```javascript
  advancedInfo: {
      employee: [], // Employees can only view, not edit
      manager: [], // Managers cannot edit advanced info
      hr_admin: ['all'], // HR Admin can edit all advanced info fields
      hr_manager: ['all'] // HR Manager can edit all advanced info fields
  }
  ```
- Ensure the object maintains proper JavaScript syntax with commas
- This ensures only HR roles can modify advanced information

### 6. Add Workflow Rule for Advanced Info Changes
- Open `apps/js/workflow/rules.js`
- Locate the `managerAndHRApproval` array in the rules object (around lines 26-32)
- Add `'advanced_info_change'` to the `managerAndHRApproval` array after the existing entries
- Add a comment above the entry: `// Advanced information changes require HR verification for sensitive personal data`
- This ensures advanced info changes go through Manager → HR Admin approval
- Verify the rules object structure maintains proper JavaScript syntax

### 7. Add API Method for Advanced Info
- Open `apps/js/api.js`
- Locate the update methods section (around lines 120-200 where other update methods like `updatePersonalInfo`, `updateContactInfo` exist)
- Add a new `updateAdvancedInfo()` async method:
  - Method signature: `async updateAdvancedInfo(employeeId, advancedInfoData)`
  - Add delay(1500) to simulate API call
  - Check if the change requires workflow approval using `WorkflowRules.requiresApproval('advanced_info_change')`
  - If approval required, call `WorkflowEngine.submitRequest()` with changeType 'advanced_info_change', including requester info, before/after snapshot, and employee object
  - If no approval required (for HR Manager direct edit), update MockEmployeeData.employee.advancedInfo directly
  - Return success response with message and updated data
  - Include JSDoc comment with parameters and return type: `@param {string} employeeId @param {object} advancedInfoData @returns {Promise<{success: boolean, message: string, data: object}>}`
- Follow the same error handling patterns as existing API methods
- Place the method near other personal info update methods for organization

### 8. Create Advanced Info Section Renderer
- Open `apps/js/pages/personal-info.js`
- After the `renderPersonalInfoSection()` method (around line 95), add a new `renderAdvancedInfoSection()` method
- Method signature: `renderAdvancedInfoSection(advancedInfo, nationality)`
- Handle null/undefined advancedInfo with early return showing empty state: `CardComponent.emptyState(i18n.t('common.noData'))`
- Check RBAC permissions for editing: `const canEdit = RBAC.canEditField('advancedInfo', 'religion');`
- Build conditional items array based on nationality:
  - Always show: Religion, Blood Type
  - Show Military Status only if: `nationality === 'Thai' && personal.gender === 'male'`
  - Show Visa Information only if: `nationality !== 'Thai'`
    - Visa Type
    - Visa Number
    - Visa Issue Date (formatted with DateUtils)
    - Visa Expiry Date (formatted with DateUtils)
- Create data grid items array with i18n translations:
  - Religion: `i18n.t(\`religion.\${advancedInfo.religion}\`)` or advancedInfo.religion
  - Blood Type: advancedInfo.bloodType
  - Military Status (conditional): `i18n.t(\`militaryStatus.\${advancedInfo.militaryStatus}\`)` or advancedInfo.militaryStatus
  - Visa fields (conditional): With proper i18n and date formatting
- Use `CardComponent.render()` with:
  - id: 'advanced-info-card'
  - title: `i18n.t('personal.advancedInfo')`
  - icon: 'info' (Material Icons)
  - editable: `canEdit`
  - onEdit: `"PersonalInfoPage.editAdvancedInfo()"`
  - showHistory: true
  - onHistory: `"PersonalInfoPage.showHistory('advancedInfo')"`
  - effectiveDate: advancedInfo.effectiveDate
  - content: `CardComponent.dataGrid(items)`
- Return the rendered card HTML

### 9. Add Advanced Info Edit Modal Methods
- In `apps/js/pages/personal-info.js`, after the `renderAdvancedInfoSection()` method, add `editAdvancedInfo()` method
- Method should get current employee from AppState and extract advancedInfo data and nationality
- Call `this.openAdvancedInfoModal(advancedInfo, nationality)` to open the modal
- Add `openAdvancedInfoModal(advancedInfo = null, nationality = 'Thai')` method
- Create modal with `ModalComponent.open()` containing:
  - title: `i18n.t('personal.editAdvancedInfo')`
  - size: 'lg'
  - Form fields using FormFieldComponent:
    - Effective Date (required, date picker)
    - Religion (select dropdown, using MockLookupData.religions)
    - Blood Type (select dropdown, using MockLookupData.bloodTypes)
    - Conditional field: Military Status (select, show only if nationality === 'Thai' and gender === 'male', using MockLookupData.militaryStatuses)
    - Conditional section: Visa Information (show only if nationality !== 'Thai')
      - Visa Type (select, required if visible, using MockLookupData.visaTypes)
      - Visa Number (text input, required if visible)
      - Visa Issue Date (date input, required if visible, max: today)
      - Visa Expiry Date (date input, required if visible, min: today)
  - Use FormFieldComponent conditional rendering or JavaScript to show/hide fields
  - Actions array with Cancel and Save buttons
  - Save button should call `'PersonalInfoPage.saveAdvancedInfo()'`
- Pre-populate form with existing data if editing

### 10. Add Advanced Info Save Handler
- In `apps/js/pages/personal-info.js`, add `async saveAdvancedInfo()` method after the modal methods
- Get form data using `FormFieldComponent.getFormData('advanced-info-form')`
- Get current employee to access nationality and gender for conditional validation
- Validate required fields using `ValidationUtils.validateForm()`:
  - effectiveDate: required, pastOrPresent: true
  - religion: optional (can be empty)
  - bloodType: optional
  - militaryStatus: required if nationality === 'Thai' and gender === 'male'
  - For non-Thai nationals (nationality !== 'Thai'):
    - visaType: required
    - visaNumber: required, minLength: 5
    - visaIssueDate: required, pastOrPresent: true
    - visaExpiryDate: required, futureDate: true
- If validation fails, show errors with `FormFieldComponent.showErrors()` and return
- Call `API.updateAdvancedInfo(employeeId, formData)` with await
- Handle response based on workflow submission:
  - If workflow required: Show workflow submission toast `ToastComponent.info(i18n.t('toast.workflowSubmitted'))`
  - If direct update: Show success toast `ToastComponent.success(i18n.t('toast.saveSuccess'))`
- Close modal with `ModalComponent.close()`
- Refresh the page with `Router.refresh()` to show updated data
- Wrap in try-catch block with error toast on failure: `ToastComponent.error(i18n.t('error.saveFailed'))`

### 11. Integrate Advanced Info Section into Main Render
- In `apps/js/pages/personal-info.js`, locate the main `render()` method (around line 13)
- After extracting personalInfo: `const personal = employee.personalInfo || {};`, add:
  - `const advancedInfo = employee.advancedInfo || null;`
- In the returned HTML template, locate the Personal Information section call: `${this.renderPersonalInfoSection(personal)}`
- Immediately after the Personal Information section, add:
  - HTML comment: `<!-- Advanced Personal Information Section -->`
  - Section call: `${this.renderAdvancedInfoSection(advancedInfo, personal.nationality)}`
- Ensure proper spacing and indentation matching the existing code style
- The advanced info section should appear second, right after basic personal info and before contact info

## Validation Commands
Execute these commands to validate the chore is complete:

- **Syntax Validation**: Open `apps/index.html` in a browser and check the browser console for JavaScript errors. No errors should appear related to personal-info.js, mock-employee.js, api.js, rbac.js, or mock-lookups.js.

- **Visual Inspection**: Navigate to a test employee's profile page, go to the Personal Information tab, and verify:
  - The Advanced Information section appears immediately after the Personal Information section
  - All advanced info fields display correctly with proper formatting
  - Conditional fields (military status for Thai males, visa info for non-Thai) display appropriately
  - Edit button visibility follows RBAC rules (visible for HR Admin/Manager, hidden for employees)
  - Effective date displays properly

- **Translation Check**: Switch between English and Thai language using the language toggle in the header. Verify:
  - All advanced info labels and field names display correctly in both languages
  - Lookup values (religions, blood types, military statuses, visa types) show localized labels
  - Section title and edit button text are properly translated

- **RBAC Testing**: Test with different user roles:
  - **Employee role**: Verify Advanced Info section shows data but Edit button is hidden
  - **Manager role**: Verify Edit button is hidden (managers cannot edit advanced info)
  - **HR Admin role**: Verify Edit button is visible and functional
  - **HR Manager role**: Verify Edit button is visible and functional

- **Conditional Field Logic**:
  - **Thai Male Employee**: Verify Military Status field appears and visa fields are hidden
  - **Thai Female Employee**: Verify neither military nor visa fields appear
  - **Non-Thai Employee**: Verify visa fields appear and military status is hidden
  - Test by temporarily modifying mock data nationality to 'American', 'Japanese', etc.

- **Workflow Integration**: As HR Admin, click the Edit button on Advanced Info section, make changes, and save. Verify:
  - A workflow request is created and appears in the Workflows page
  - The request shows the correct approval chain (Manager → HR Admin)
  - Toast notification confirms the submission with appropriate message
  - Workflow request contains before/after data snapshot

- **Form Validation**: Open the edit modal and test validation:
  - Try saving without effective date - should show error
  - For non-Thai employee: try saving without visa type, number, or dates - should show errors
  - For Thai male: try saving without military status - should show error
  - Verify all validation messages display properly in current language

- **Data Persistence**: After editing advanced info data, refresh the page and verify:
  - Changes are reflected in the view (in mock mode, within the session)
  - The workflow request appears in the pending workflows list
  - Effective date is stored and displayed correctly

- **Lookup Data**: Verify all dropdown fields in the edit modal:
  - Religion dropdown shows all 6 options with correct labels
  - Blood Type dropdown shows all 8 blood types
  - Military Status dropdown (when visible) shows all 4 options
  - Visa Type dropdown (when visible) shows all 6 visa types
  - All options display in the correct language

## Notes

### RBAC Considerations
- Only HR Admin and HR Manager roles can edit advanced personal information
- Employees and Managers can view but cannot edit
- The edit button visibility is controlled by `RBAC.canEditField('advancedInfo', 'religion')`
- Field-level permissions in rbac.js ensure employee and manager roles have empty permission arrays
- This protects sensitive personal data from unauthorized modification

### Conditional Field Display
- Military Status field is only applicable to Thai male employees
  - Check: `nationality === 'Thai' && gender === 'male'`
  - For Thai females, military service is not applicable
  - For non-Thai nationals, Thai military status is irrelevant
- Visa Information fields are only applicable to non-Thai employees
  - Check: `nationality !== 'Thai'`
  - Thai nationals don't require visas to work in Thailand
- Modal form should dynamically show/hide fields based on these conditions
- Use JavaScript conditional rendering or CSS display properties

### Data Privacy and Sensitivity
- Religion, blood type, and military status are sensitive personal information
- HR-only edit access ensures proper data governance
- Workflow approval provides an audit trail for all changes
- Consider implementing view-only access logs in production

### Workflow Approval Chain
- Advanced info changes are classified as "managerAndHRApproval"
- Approval chain: Manager → HR Admin
- Less stringent than "fullApproval" since it's supplementary information
- HR Manager can make direct edits without workflow (highest privilege)

### Internationalization
- All field labels must support Thai and English
- Lookup values (religions, blood types, etc.) have bilingual labels
- Use i18n.t() for all translatable strings
- Buddhist Era date format for Thai language display

### Validation Rules
- Effective Date: Required, cannot be future date
- Religion: Optional (some employees may prefer not to specify)
- Blood Type: Optional (may be unknown)
- Military Status: Required for Thai males, N/A otherwise
- Visa Information: All required fields when employee is non-Thai
  - Visa expiry date must be future date
  - Visa issue date must be past or present date

### Mock Data Considerations
- Sample Thai employee should have:
  - Religion: 'Buddhist' (most common in Thailand)
  - Blood Type: 'O+' or 'A+' (common types)
  - Military Status: 'Completed' or 'Exempted'
  - Visa fields: null
- For testing non-Thai employees, create additional mock data with:
  - Religion: variety for testing
  - Blood Type: any valid type
  - Military Status: 'Not Applicable'
  - Visa Type: 'Non-Immigrant B' (most common for work)
  - Visa dates: valid future expiry date

### Field Organization in UI
- Group related fields for better UX:
  - Health Information subsection: Blood Type
  - Religious Information subsection: Religion
  - Military Information subsection: Military Status (conditional)
  - Visa Information subsection: All visa fields (conditional)
- Consider using sub-headers or visual separators in the data grid

### Testing Scenarios
1. **Thai Male Employee (Manager role)**: Can view all fields including military status, cannot edit, no visa info
2. **Thai Female Employee (Employee role)**: Can view basic fields, no military status, no visa info, cannot edit
3. **Non-Thai Employee (HR Admin role)**: Can view and edit, sees visa fields, no military status
4. **HR Manager**: Can edit all fields for any employee nationality/gender
5. **Empty Data**: New employee with no advanced info should show empty state
6. **Partial Data**: Employee with only religion set, other fields empty

### Future Enhancements (Not in Scope)
- Automatic visa expiry alerts (similar to work permit)
- Integration with government military service verification
- Blood type verification through medical records integration
- Multi-religion support with denomination details
- Disability status and accommodations tracking
- Emergency medical information section
- Organ donor preference
- Dietary restrictions for religious/health reasons

### API Integration Notes
- In production, visa information might sync with immigration database
- Blood type might come from medical records system
- Military status verification against Thai military database
- Religion data should comply with local privacy laws (PDPA in Thailand)
- Consider soft-delete for historical tracking rather than hard updates

### Accessibility Considerations
- Conditional fields should announce presence/absence to screen readers
- Dropdown selections should be keyboard navigable
- Required field indicators must be visible and announced
- Error messages should be associated with form fields via ARIA
- Section should be navigable via heading hierarchy (h3 or h4)

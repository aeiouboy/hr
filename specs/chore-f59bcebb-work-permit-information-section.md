# Chore: Implement Work Permit Information Section

## Metadata
adw_id: `f59bcebb`
prompt: `Implement Work Permit Information section as specified in PRD Section 3.1. Add to apps/js/pages/personal-info.js: 1) Create renderWorkPermitSection() method showing work permit details (permit number, issue date, expiry date, issuing authority, status) 2) Add edit modal for work permit information with file attachment for permit document 3) Show expiry warning badge if permit expires within 90 days 4) Show expired badge if permit is expired 5) Add mock work permit data to mock-employee.js 6) Add i18n translations for work permit fields in en.json and th.json 7) Add workflow trigger for work permit changes requiring HR approval.`

## Chore Description
This chore implements the Work Permit Information section as part of the Personal Information module (PRD Section 3.1). The feature enables employees (particularly foreign nationals) to view and update their work permit details within the RIS HR System. The implementation includes:

1. A dedicated Work Permit section displaying permit details (number, dates, authority, status)
2. Edit functionality with file attachment support for uploading permit documents
3. Visual warning badges for permits expiring within 90 days or already expired
4. Mock data structure for work permit information
5. Bilingual translations (Thai/English) for all work permit fields
6. Workflow integration requiring HR approval for work permit changes
7. Consistent UI/UX following existing patterns in the Personal Information page

The work permit section is critical for compliance and HR administration, particularly for managing foreign employees' legal documentation.

## Relevant Files
Use these files to complete the chore:

- **apps/js/pages/personal-info.js** - Personal Information page module. Will add `renderWorkPermitSection()` method to display work permit details with status badges, `editWorkPermit()` and `openWorkPermitModal()` methods for the edit modal with file attachment support, `saveWorkPermit()` async method for submission with workflow triggers, and integrate the section into the main `render()` method between Dependents and final closing div.

- **apps/js/data/mock-employee.js** - Employee mock data. Will add a new `workPermit` object to the employee structure (after line 117, after the `dependents` array) containing work permit details: permit number, issue date, expiry date, issuing authority, status, and optional attachment URL. Should include sample data for testing expiry warnings (one permit expiring within 90 days).

- **apps/locales/en.json** - English translations. Will add new `workPermit` subsection under the `personal` section with keys for: workPermit (title), permitNumber, issueDate, expiryDate, issuingAuthority, permitStatus, permitDocument, editWorkPermit, expiresIn, expired, active, statusActive, statusExpired, statusExpiring, uploadPermit, and permitAttachment.

- **apps/locales/th.json** - Thai translations. Will add corresponding Thai translations for all work permit fields under the `personal` section: workPermit (ใบอนุญาทำงาน), permitNumber (เลขที่ใบอนุญาต), issueDate (วันที่ออกเอกสาร), expiryDate (วันหมดอายุ), issuingAuthority (หน่วยงานออกเอกสาร), and status-related translations.

- **apps/js/workflow/rules.js** - Workflow rules configuration. Will add a new `work_permit_change` rule to the `fullApproval` array (requiring Manager + HR Admin + HR Manager approval) since work permit changes affect legal compliance and require thorough review at lines 35-40 in the existing fullApproval section.

- **apps/js/api.js** - Mock API client. Will add two new async methods: `updateWorkPermit(employeeId, workPermitData)` following the pattern of existing update methods with workflow submission, and `uploadPermitDocument(employeeId, file)` for handling work permit document uploads (similar to attachment handling in the address update pattern).

### New Files
None - all changes are additions to existing files.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Work Permit Data
- Open `apps/js/data/mock-employee.js`
- Locate the employee object and find the `dependents` array (around line 98-117)
- After the closing bracket of the `dependents` array (after line 117), add a comma and insert a new `workPermit` object
- Structure the work permit object with the following fields:
  - `permitNumber`: String - work permit number (e.g., 'WP-2024-123456')
  - `issueDate`: ISO date string - when permit was issued (e.g., '2024-01-15')
  - `expiryDate`: ISO date string - when permit expires (e.g., '2026-03-20' for testing warning badge - set ~60 days from today)
  - `issuingAuthority`: String - authority that issued the permit (e.g., 'Department of Employment, Ministry of Labour')
  - `status`: Enum string - 'active', 'expiring', or 'expired'
  - `permitType`: String - type of work permit (e.g., 'Non-Immigrant B Visa Work Permit')
  - `attachmentUrl`: Optional string - URL to uploaded permit document (e.g., '/uploads/permits/WP-2024-123456.pdf' or null)
- Add a comment above the workPermit object: `// Work Permit Information (for foreign nationals)`
- Ensure proper JSON syntax with commas between objects

### 2. Add English Translations for Work Permit
- Open `apps/locales/en.json`
- Locate the `personal` section (starts around line 59)
- After the last key in the personal section (before the closing brace), add the following translation keys:
  - `workPermit`: "Work Permit Information"
  - `permitNumber`: "Permit Number"
  - `issueDate`: "Issue Date"
  - `expiryDate`: "Expiry Date"
  - `issuingAuthority`: "Issuing Authority"
  - `permitStatus`: "Status"
  - `permitType`: "Permit Type"
  - `permitDocument`: "Permit Document"
  - `editWorkPermit`: "Edit Work Permit"
  - `uploadPermit`: "Upload Permit Document"
  - `permitAttachment`: "Permit Attachment"
  - `expiresIn`: "Expires in"
  - `days`: "days"
  - `expired`: "Expired"
  - `statusActive`: "Active"
  - `statusExpired`: "Expired"
  - `statusExpiring`: "Expiring Soon"
- Ensure proper JSON syntax with commas between entries

### 3. Add Thai Translations for Work Permit
- Open `apps/locales/th.json`
- Locate the `personal` section (starts around line 59)
- Add the corresponding Thai translations for all work permit keys:
  - `workPermit`: "ข้อมูลใบอนุญาตทำงาน"
  - `permitNumber`: "เลขที่ใบอนุญาต"
  - `issueDate`: "วันที่ออกเอกสาร"
  - `expiryDate`: "วันหมดอายุ"
  - `issuingAuthority`: "หน่วยงานออกเอกสาร"
  - `permitStatus`: "สถานะ"
  - `permitType`: "ประเภทใบอนุญาต"
  - `permitDocument`: "เอกสารใบอนุญาต"
  - `editWorkPermit`: "แก้ไขใบอนุญาตทำงาน"
  - `uploadPermit`: "อัปโหลดเอกสารใบอนุญาต"
  - `permitAttachment`: "ไฟล์แนบใบอนุญาต"
  - `expiresIn`: "หมดอายุใน"
  - `days`: "วัน"
  - `expired`: "หมดอายุ"
  - `statusActive`: "ใช้งานได้"
  - `statusExpired`: "หมดอายุ"
  - `statusExpiring`: "ใกล้หมดอายุ"
- Ensure proper JSON syntax with commas between entries

### 4. Add Workflow Rule for Work Permit Changes
- Open `apps/js/workflow/rules.js`
- Locate the `fullApproval` array in the rules object (around lines 35-40)
- Add `'work_permit_change'` to the `fullApproval` array after the existing entries
- Add a comment above the entry: `// Work permit changes require full approval chain for legal compliance`
- This ensures work permit changes go through Manager → HR Admin → HR Manager approval
- Verify the rules object structure maintains proper JavaScript syntax

### 5. Add API Methods for Work Permit
- Open `apps/js/api.js`
- Locate the update methods section (around lines 120-200 where other update methods like `updatePersonalInfo`, `updateContactInfo` exist)
- Add a new `updateWorkPermit()` async method:
  - Method signature: `async updateWorkPermit(employeeId, workPermitData)`
  - Add delay(1500) to simulate API call
  - Check if the change requires workflow approval using `WorkflowRules.requiresApproval('work_permit_change')`
  - If approval required, call `WorkflowEngine.submitRequest()` with changeType 'work_permit_change'
  - Update the mock employee data's workPermit object
  - Return success response
  - Include JSDoc comment with parameters and return type
- Add a new `uploadPermitDocument()` async method after the update method:
  - Method signature: `async uploadPermitDocument(employeeId, file)`
  - Add delay(1000) to simulate file upload
  - Mock the file upload by generating a fake URL: `/uploads/permits/${employeeId}_${Date.now()}.pdf`
  - Return the mock URL in the response
  - Include JSDoc comment
- Ensure both methods follow the same error handling patterns as existing API methods

### 6. Create Work Permit Section Renderer
- Open `apps/js/pages/personal-info.js`
- After the `renderDependentsSection()` method (around line 223), add a new `renderWorkPermitSection()` method
- Method signature: `renderWorkPermitSection(workPermit)`
- Handle null/undefined workPermit with early return showing empty state: `CardComponent.emptyState(i18n.t('common.noData'))`
- Calculate days until expiry using DateUtils and today's date
- Determine status badge based on expiry:
  - If expired (expiry date < today): Show red badge with `i18n.t('personal.statusExpired')`
  - If expiring within 90 days: Show yellow/warning badge with `i18n.t('personal.statusExpiring')` and days remaining
  - Otherwise: Show green badge with `i18n.t('personal.statusActive')`
- Create data grid items array with:
  - Permit Number: `workPermit.permitNumber`
  - Permit Type: `workPermit.permitType`
  - Issue Date: `DateUtils.format(workPermit.issueDate, 'medium')`
  - Expiry Date: `DateUtils.format(workPermit.expiryDate, 'medium')` with status badge inline
  - Issuing Authority: `workPermit.issuingAuthority`
  - Permit Document: Link to download if `workPermit.attachmentUrl` exists, otherwise show '-'
- Use `CardComponent.render()` with:
  - id: 'work-permit-card'
  - title: `i18n.t('personal.workPermit')`
  - icon: 'badge' (Material Icons)
  - editable: `RBAC.canEditField('workPermit', 'permitNumber')` (HR only)
  - onEdit: `"PersonalInfoPage.editWorkPermit()"`
  - showHistory: true
  - onHistory: `"PersonalInfoPage.showHistory('workPermit')"`
  - content: `CardComponent.dataGrid(items)`
- Return the rendered card HTML

### 7. Add Work Permit Edit Modal Methods
- In `apps/js/pages/personal-info.js`, after the `renderWorkPermitSection()` method, add `editWorkPermit()` method
- Method should get current employee from AppState and extract workPermit data
- Call `this.openWorkPermitModal(workPermit)` to open the modal
- Add `openWorkPermitModal(workPermit = null)` method following the pattern of `openDependentModal()`
- Create modal with `ModalComponent.open()` containing:
  - title: `i18n.t('personal.editWorkPermit')`
  - size: 'lg'
  - Form fields using FormFieldComponent:
    - Hidden input for permitId if editing existing permit
    - Text input: permitNumber (required)
    - Select input: permitType (use MockLookupData.permitTypes array - you'll need to add this)
    - Date input: issueDate (required, max: today)
    - Date input: expiryDate (required, min: today)
    - Text input: issuingAuthority (required)
    - File upload: permitDocument (accept: '.pdf,.jpg,.jpeg,.png', hint about file size/types)
  - Actions array with Cancel and Save buttons
  - Save button should call `'PersonalInfoPage.saveWorkPermit()'`

### 8. Add Work Permit Save Handler
- In `apps/js/pages/personal-info.js`, add `async saveWorkPermit()` method after the modal methods
- Get form data using `FormFieldComponent.getFormData('work-permit-form')`
- Validate required fields using `ValidationUtils.validateForm()`:
  - permitNumber: required, minLength: 5
  - permitType: required
  - issueDate: required, pastDate: true
  - expiryDate: required, futureDate: true
  - issuingAuthority: required, minLength: 3
- If validation fails, show errors with `FormFieldComponent.showErrors()` and return
- Check if file was uploaded and call `API.uploadPermitDocument()` if present
- Call `API.updateWorkPermit(employeeId, formData)` with await
- Show success toast: `ToastComponent.success(i18n.t('toast.saveSuccess'))`
- Close modal with `ModalComponent.close()`
- Refresh the page with `Router.refresh()` to show updated data
- Wrap in try-catch block with error toast on failure: `ToastComponent.error(i18n.t('error.saveFailed'))`

### 9. Integrate Work Permit Section into Main Render
- In `apps/js/pages/personal-info.js`, locate the main `render()` method (around line 13)
- After extracting other data arrays, add: `const workPermit = employee.workPermit || null;`
- In the returned HTML template, locate the Dependents section call: `${this.renderDependentsSection(dependents)}`
- After the Dependents section and before the closing `</div>` tag, add:
  - HTML comment: `<!-- Work Permit Information Section -->`
  - Section call: `${this.renderWorkPermitSection(workPermit)}`
- Ensure proper spacing and indentation matching the existing code style
- The work permit section should be the last section before the closing div

### 10. Add Mock Lookup Data for Permit Types
- Open `apps/js/data/mock-lookups.js`
- Add a new `permitTypes` array to the MockLookupData object
- Include at least 4-5 common work permit types:
  - Non-Immigrant B Visa Work Permit
  - BOI Work Permit
  - Teaching License Work Permit
  - Digital Work Permit
  - Specialized Work Permit
- Each entry should have: `{ value: 'permit_type_code', labelEn: 'English Name', labelTh: 'ชื่อไทย' }`
- Export the permitTypes array as part of MockLookupData

## Validation Commands
Execute these commands to validate the chore is complete:

- **Syntax Validation**: Open `apps/index.html` in a browser and check the browser console for JavaScript errors. No errors should appear related to personal-info.js, mock-employee.js, or api.js.

- **Visual Inspection**: Navigate to a test employee's profile page, go to the Personal Information tab, and verify:
  - The Work Permit section appears after the Dependents section
  - All work permit fields display correctly with proper formatting
  - Status badge appears and shows correct color based on expiry date
  - Edit button is visible for users with HR permissions
  - File upload field appears in the edit modal

- **Translation Check**: Switch between English and Thai language using the language toggle in the header. Verify all work permit labels, field names, and status messages display correctly in both languages.

- **Workflow Integration**: Click the Edit button on the Work Permit section, make changes, and save. Verify:
  - A workflow request is created and appears in the Workflows page
  - The request shows the correct approval chain (Manager → HR Admin → HR Manager)
  - Toast notification confirms the submission

- **Badge Logic**: Manually test the badge display logic by:
  - Checking an active permit (expiry > 90 days) shows green "Active" badge
  - Checking a permit expiring within 90 days shows yellow "Expiring Soon" badge with day count
  - Checking an expired permit (expiry < today) shows red "Expired" badge

- **File Upload**: Test the file upload functionality in the edit modal:
  - Select a PDF or image file
  - Verify the file name appears after selection
  - Save the form and verify the permit document link appears in the view

- **Data Persistence**: After editing work permit data, refresh the page and verify:
  - Changes are reflected (note: in mock mode, changes won't persist across full page reloads, but should persist within the session)
  - The workflow request appears in the pending workflows list

## Notes

### RBAC Considerations
- Only HR Admin and HR Manager roles should be able to edit work permit information
- Employees can view their own work permit data but cannot edit it
- The edit button visibility is controlled by `RBAC.canEditField('workPermit', 'permitNumber')`
- Ensure RBAC permissions are properly configured for the workPermit entity

### Date Calculations
- Use `DateUtils` methods for all date formatting and calculations
- Calculate days until expiry using: `Math.floor((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24))`
- The 90-day threshold is a business rule that may need configuration in the future

### File Attachments
- Accepted file types: PDF, JPG, JPEG, PNG
- Maximum file size should be validated (recommend 5MB limit)
- In the mock environment, file uploads generate a fake URL path
- In production, this would integrate with a real file storage service (S3, Azure Blob, etc.)

### Workflow Approval Chain
- Work permit changes are classified as "fullApproval" requiring all three approval levels
- This is because work permits are legal documents requiring thorough verification
- The approval chain: Manager → HR Admin → HR Manager
- Each level can approve, reject, or send back for revision

### Internationalization
- All dates should display in Buddhist Era (BE) format when Thai language is selected
- Status badges should show translated text based on current language
- File upload hints should be bilingual

### Status Badge Colors
- Active (Green): `bg-green-100 text-green-800`
- Expiring Soon (Yellow/Warning): `bg-yellow-100 text-yellow-800`
- Expired (Red): `bg-red-100 text-red-800`
- Follow Tailwind CSS color classes for consistency

### Testing Scenarios
1. **Foreign National Employee**: Has work permit data, can view all fields
2. **Thai National Employee**: No work permit data, section shows "No data available"
3. **Expiring Permit**: Set expiry date to 60 days from today, verify yellow badge
4. **Expired Permit**: Set expiry date to past date, verify red badge
5. **New Permit**: Add work permit for employee without existing data
6. **Document Upload**: Upload permit scan and verify download link appears

### Future Enhancements (Not in Scope)
- Automatic email notifications 30/60/90 days before permit expiry
- Integration with government work permit verification API
- Bulk upload of work permits for HR Admin
- Work permit renewal workflow
- Dependent work permits tracking

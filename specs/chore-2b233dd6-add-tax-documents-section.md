# Chore: Add Tax Document Download Functionality to Compensation Page

## Metadata
adw_id: `2b233dd6`
prompt: `Add Tax Document download functionality to Compensation page. In apps/js/pages/compensation.js: 1) Create renderTaxDocumentsSection() method displaying available tax documents (50 Tawi form, annual tax summary) 2) Add download button for each tax document 3) Add mock tax document data to mock-employee.js with periods (e.g., 2024, 2025) 4) Implement downloadTaxDocument(docId) method similar to downloadPayslip 5) Add i18n translations for 'Tax Documents', 'Download Tax Document', 'Tax Year' in both en.json and th.json.`

## Chore Description
This chore extends the Compensation page with a new Tax Documents section that allows employees to view and download their tax-related documents. The feature will display available tax documents (such as 50 Tawi forms and annual tax summaries) in a table format with download functionality, following the same UI/UX patterns established by the existing Payslips section.

The implementation requires:
1. A new section renderer method in the CompensationPage module
2. Mock tax document data with tax years (2024, 2025, etc.)
3. A download handler method for tax documents
4. Bilingual translations for all UI labels
5. Integration with the existing API mock layer

## Relevant Files
Use these files to complete the chore:

- **apps/js/pages/compensation.js** - Main compensation page module. Will add `renderTaxDocumentsSection()` method to render the tax documents table, integrate it into the main `render()` method, and add `downloadTaxDocument()` method for download handling. Follows the same pattern as the existing payslips section.

- **apps/js/data/mock-employee.js** - Employee mock data. Will add a new `taxDocuments` array to the compensation object with sample tax documents for years 2024 and 2025, including 50 Tawi forms and annual tax summaries.

- **apps/js/api.js** - Mock API client. Will add a new `downloadTaxDocument()` method that simulates the API call for downloading tax documents, returning a mock Blob similar to the existing `downloadPayslip()` method.

- **apps/locales/en.json** - English translations. Will add new translation keys under the compensation section: `taxYear` for "Tax Year" label and `downloadTaxDocument` for "Download Tax Document" tooltip. Note: `taxDocuments` and `downloadTax` keys already exist.

- **apps/locales/th.json** - Thai translations. Will add the corresponding Thai translations: `taxYear` for "ปีภาษี" and `downloadTaxDocument` for "ดาวน์โหลดเอกสารภาษี". Note: `taxDocuments` and `downloadTax` keys already exist.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Tax Document Data
- Open `apps/js/data/mock-employee.js`
- Locate the `compensation` object (around line 200)
- Add a new `taxDocuments` array after the `payslips` array (after line 224)
- Include at least 4-6 tax document entries with the following structure:
  - `id`: Unique identifier (e.g., 'tax_2025_50tawi', 'tax_2024_annual')
  - `documentType`: Type of document (e.g., '50 Tawi Form', 'Annual Tax Summary')
  - `taxYear`: Tax year as string (e.g., '2025', '2024')
  - `issueDate`: Date the document was issued (ISO format)
  - `description`: Optional description of the document
- Use realistic dates and ensure documents span multiple years (2024, 2025)

### 2. Add Tax Document Download API Method
- Open `apps/js/api.js`
- Locate the existing download methods (around line 271-319)
- Add a new `downloadTaxDocument()` async method after the existing download methods
- Method signature: `async downloadTaxDocument(employeeId, taxDocId)`
- Use the same pattern as `downloadPayslip()`: add delay(1000) and return a mock Blob
- Add JSDoc comment with parameter descriptions

### 3. Add English Translations
- Open `apps/locales/en.json`
- Locate the `compensation` section (around line 157)
- Verify that `taxDocuments` and `downloadTax` keys exist (they should already be present)
- Add new translation key `taxYear` with value "Tax Year"
- Add new translation key `downloadTaxDocument` with value "Download Tax Document"
- Ensure proper JSON syntax with commas

### 4. Add Thai Translations
- Open `apps/locales/th.json`
- Locate the `compensation` section (around line 157)
- Verify that `taxDocuments` and `downloadTax` keys exist (they should already be present)
- Add new translation key `taxYear` with value "ปีภาษี"
- Add new translation key `downloadTaxDocument` with value "ดาวน์โหลดเอกสารภาษี"
- Ensure proper JSON syntax with commas

### 5. Create Tax Documents Section Renderer
- Open `apps/js/pages/compensation.js`
- Add a new `renderTaxDocumentsSection()` method after the `renderPayslipsSection()` method (after line 151)
- Method should accept `taxDocuments` array as parameter
- Handle empty state with `CardComponent.emptyState()` if no documents
- Create a table structure similar to payslips table with columns:
  - Document Type
  - Tax Year (use `i18n.t('compensation.taxYear')`)
  - Issue Date (format with `DateUtils.format(issueDate, 'medium')`)
  - Actions (download button)
- Use `CardComponent.render()` with:
  - title: `i18n.t('compensation.taxDocuments')`
  - icon: 'description' (Material Icons)
- Download button should call `CompensationPage.downloadTaxDocument(doc.id)`
- Use download icon with tooltip `i18n.t('compensation.downloadTaxDocument')`
- Follow the same styling patterns as the payslips table

### 6. Add Tax Documents Download Handler
- In `apps/js/pages/compensation.js`, add a new `downloadTaxDocument()` async method after the `downloadPayslip()` method (after line 175)
- Method signature: `async downloadTaxDocument(taxDocId)`
- Follow the same pattern as `downloadPayslip()`:
  - Show toast notification: `ToastComponent.info(i18n.t('toast.downloadStarted'))`
  - Get current employee from AppState
  - Call `API.downloadTaxDocument(employeeId, taxDocId)`
  - Create download link and trigger download
  - Use filename pattern: `tax_document_${taxDocId}.pdf`
  - Handle errors with `ToastComponent.error(i18n.t('error.generic'))`

### 7. Integrate Tax Documents Section into Main Render
- In `apps/js/pages/compensation.js`, locate the main `render()` method (line 13)
- Extract `taxDocuments` from compensation object: `const taxDocuments = employee.taxDocuments || [];`
- Add a call to `renderTaxDocumentsSection(taxDocuments)` in the returned HTML template
- Place it after the Payslips section (after line 28)
- Add proper spacing with comment: `<!-- Tax Documents -->`

### 8. Test and Validate the Implementation
- Start the local development server if not already running
- Navigate to the Compensation tab
- Verify the Tax Documents section appears with mock data
- Test download functionality for each tax document
- Verify toast notifications appear
- Switch language between English and Thai to verify translations
- Check browser console for any JavaScript errors
- Verify proper table formatting and styling consistency with payslips section

## Validation Commands
Execute these commands to validate the chore is complete:

- **Start Development Server**: `python -m http.server 8080 -d apps` - Start local server to test the application

- **Visual Inspection**: Open `http://localhost:8080/#/profile/EMP001/compensation` in browser and verify:
  - Tax Documents section appears below Payslips section
  - Table displays document type, tax year, issue date, and download button
  - Download buttons trigger download with proper filename
  - Toast notification appears on download
  - All labels are properly translated in both English and Thai
  - Section follows the same visual styling as Payslips section

- **Translation Verification**: Toggle language using the language switcher and verify:
  - Section title changes between "Tax Documents" and "เอกสารภาษี"
  - Column headers are properly translated
  - Tax Year column shows "Tax Year" / "ปีภาษี"
  - Download tooltip shows correct translation

- **Code Validation**: Check for JavaScript errors in browser console (F12)

- **File Integrity Check**:
  - `grep -n "taxDocuments" apps/js/data/mock-employee.js` - Verify mock data was added
  - `grep -n "downloadTaxDocument" apps/js/api.js` - Verify API method was added
  - `grep -n "renderTaxDocumentsSection" apps/js/pages/compensation.js` - Verify renderer was added
  - `grep -n "taxYear" apps/locales/en.json apps/locales/th.json` - Verify translations were added

## Notes
- The implementation follows the established patterns from the Payslips section for consistency
- Tax documents should include common Thai tax forms like "50 Tawi" (หนังสือรับรองการหักภาษี ณ ที่จ่าย) and annual tax summaries
- No RBAC permissions are required for tax documents (unlike salary information in payslips)
- The download functionality is currently mocked; in production, it would connect to actual document storage
- Consider adding a year filter dropdown in future enhancements if the number of tax documents grows significantly
- The `taxDocuments` and `downloadTax` translation keys already exist in the locale files from previous work

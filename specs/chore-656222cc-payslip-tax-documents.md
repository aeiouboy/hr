# Chore: Implement Payslip and Tax Document Self-Service Access

## Metadata
adw_id: `656222cc`
prompt: `Implement Payslip and Tax Document self-service access. Reference: User Stories US-5ESS-005, US-5ESS-011`

## Chore Description
Implement a comprehensive payslip and tax document self-service module that allows employees to view their monthly payslips with detailed earnings/deductions breakdown, access tax documents (50 ทวิ, social security statements, provident fund statements), and download documents with proper audit logging. The feature includes security measures with amount masking by default and confirmation toggle to reveal sensitive financial data.

Key features:
1. **Payslip List View**: Monthly payslips for last 12 months with masked amounts, year filter
2. **Payslip Detail View**: Full breakdown with earnings (เงินเดือน, ค่าตำแหน่ง, ค่าครองชีพ, ค่าล่วงเวลา), deductions (ภาษีเงินได้, ประกันสังคม, กองทุนสำรองเลี้ยงชีพ, สินเชื่อ), and YTD totals
3. **Tax Documents**: 50 ทวิ (Withholding Tax Certificate), social security statements, provident fund statements by year
4. **Security**: Default amount masking with toggle confirmation, download audit logging

## Relevant Files
Use these files to complete the chore:

### Existing Files to Modify

- **apps/js/app.js** (lines 12-58) - Register new payslip routes (`#/payslip` and `#/payslip/:month`)
- **apps/js/api.js** (lines 519-595) - Add API methods for payslips and tax documents (getPayslipDetail, getPayslipList, getTaxDocuments, downloadPayslip, downloadTaxDocument with audit logging)
- **apps/js/data/mock-employee.js** (lines 287-305) - Extend mock payslip data with detailed earnings/deductions, add comprehensive tax documents data
- **apps/js/data/mock-lookups.js** - Add lookup data for tax document types, earnings types, deduction types
- **apps/js/utils/mask.js** (lines 98-114) - Already has `salary()` method, may need enhancement for payslip-specific masking
- **apps/locales/en.json** (lines 224-244) - Add payslip and tax terminology translations
- **apps/locales/th.json** - Add Thai translations for payslip terms (เงินเดือน, ค่าตำแหน่ง, ภาษีเงินได้, etc.)
- **apps/index.html** (lines 114-125) - Add script reference for new payslip page

### New Files to Create

- **apps/js/pages/payslip.js** - Main payslip page module with:
  - `render()` - Page layout with tabs (Payslips, Tax Documents)
  - `renderPayslipList()` - Monthly payslip list with masking
  - `renderPayslipDetail()` - Full payslip breakdown
  - `renderTaxDocuments()` - Tax document list and viewer
  - `toggleAmountVisibility()` - Mask/unmask with confirmation
  - `downloadDocument()` - Download with audit logging
  - `init()` - Page initialization

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Payslip Translations
- Add English translations in `apps/locales/en.json` under a new `payslip` section:
  ```json
  "payslip": {
    "title": "Payslips & Tax Documents",
    "payslipList": "Payslips",
    "taxDocuments": "Tax Documents",
    "period": "Period",
    "payDate": "Pay Date",
    "grossPay": "Gross Pay",
    "netPay": "Net Pay",
    "showAmounts": "Show Amounts",
    "hideAmounts": "Hide Amounts",
    "confirmShowAmounts": "Are you sure you want to reveal salary amounts?",
    "earnings": "Earnings",
    "deductions": "Deductions",
    "baseSalary": "Base Salary",
    "positionAllowance": "Position Allowance",
    "colAllowance": "Cost of Living Allowance",
    "overtime": "Overtime",
    "otherEarnings": "Other Earnings",
    "totalEarnings": "Total Earnings",
    "incomeTax": "Personal Income Tax",
    "socialSecurity": "Social Security",
    "providentFund": "Provident Fund",
    "loans": "Loans",
    "otherDeductions": "Other Deductions",
    "totalDeductions": "Total Deductions",
    "ytd": "Year-to-Date",
    "ytdGross": "YTD Gross Pay",
    "ytdTax": "YTD Tax Paid",
    "ytdSocialSecurity": "YTD Social Security",
    "documentType": "Document Type",
    "year": "Year",
    "issueDate": "Issue Date",
    "withholdingCert": "Withholding Tax Certificate (50 ทวิ)",
    "socialSecurityStatement": "Social Security Statement",
    "providentFundStatement": "Provident Fund Statement",
    "downloadPdf": "Download PDF",
    "viewDocument": "View Document",
    "noPayslips": "No payslips available",
    "noTaxDocuments": "No tax documents available",
    "filterByYear": "Filter by Year",
    "allYears": "All Years",
    "downloadAuditNote": "Download will be logged for security purposes"
  }
  ```
- Add corresponding Thai translations in `apps/locales/th.json` with proper Thai tax terminology

### 2. Extend Mock Payslip Data
- Update `apps/js/data/mock-employee.js` to include detailed payslip structure:
  - Add `detailedPayslips` array with last 12 months of data
  - Each payslip includes:
    - `id`, `employeeId`, `period` (month, year)
    - `payDate`
    - `earnings` object: `baseSalary`, `positionAllowance`, `colAllowance`, `overtime`, `otherEarnings`, `total`
    - `deductions` object: `tax`, `socialSecurity`, `providentFund`, `loans`, `otherDeductions`, `total`
    - `netPay`
    - `ytd` object: `grossPay`, `tax`, `socialSecurity`, `providentFund`
  - Add `taxDocuments` array with:
    - `id`, `type` (withholding_cert, social_security, provident_fund)
    - `year`, `employeeId`, `issueDate`
    - `typeNameEn`, `typeNameTh`

### 3. Add Lookup Data for Tax Document Types
- Update `apps/js/data/mock-lookups.js` to include:
  - `taxDocumentTypes` array with value/labelEn/labelTh for each document type
  - `earningsTypes` array for payslip line items
  - `deductionTypes` array for payslip deductions

### 4. Add API Methods
- Update `apps/js/api.js` to add:
  - `getPayslipList(employeeId, year)` - Return list with masked amounts
  - `getPayslipDetail(employeeId, payslipId)` - Return full payslip detail
  - `getTaxDocuments(employeeId, year)` - Return tax documents list
  - `downloadPayslipPdf(employeeId, payslipId)` - Download with audit log
  - `downloadTaxDocumentPdf(employeeId, docId)` - Download with audit log
  - `logDocumentAccess(employeeId, docType, docId, action)` - Audit logging method
- Add these methods to the `retryableMethods` array for retry logic

### 5. Create Payslip Page Module
- Create `apps/js/pages/payslip.js` with the following structure:
  ```javascript
  const PayslipPage = (function() {
      let activeTab = 'payslips';
      let payslips = [];
      let taxDocuments = [];
      let showAmounts = false;
      let selectedYear = 'all';

      return {
          render() { ... },
          renderTabContent() { ... },
          renderPayslipList() { ... },
          renderPayslipRow(payslip) { ... },
          renderPayslipDetail(payslipId) { ... },
          renderEarningsSection(earnings) { ... },
          renderDeductionsSection(deductions) { ... },
          renderYTDSection(ytd) { ... },
          renderTaxDocuments() { ... },
          renderTaxDocumentRow(doc) { ... },
          toggleAmountVisibility() { ... },
          confirmShowAmounts() { ... },
          filterByYear(year) { ... },
          downloadPayslip(payslipId) { ... },
          downloadTaxDocument(docId) { ... },
          viewPayslipDetail(payslipId) { ... },
          loadData() { ... },
          init() { ... },
          renderSkeleton() { ... }
      };
  })();
  ```
- Use `MaskUtils.currency()` for displaying amounts when masked
- Use `MaskUtils.salary()` for masked amount display (shows `THB ***,***`)
- Implement tab navigation similar to `LeaveRequestPage`
- Use Buddhist Era dates via `DateUtils.format()`
- Use `CardComponent` for consistent UI
- Use `ModalComponent.confirm()` for show amounts confirmation

### 6. Register Routes
- Update `apps/js/app.js` `registerRoutes()` function to add:
  ```javascript
  Router.register('payslip', {
      render: () => PayslipPage.render(),
      onEnter: () => PayslipPage.init()
  });

  Router.register('payslip/:month', {
      render: (params) => PayslipPage.render(params),
      onEnter: (params) => PayslipPage.init(params)
  });
  ```

### 7. Add Script to index.html
- Add `<script src="js/pages/payslip.js"></script>` in `apps/index.html` before `app.js` (around line 125)

### 8. Implement Amount Masking Toggle
- In `PayslipPage.toggleAmountVisibility()`:
  - Show confirmation modal using `ModalComponent.confirm()`
  - On confirm, set `showAmounts = true` and re-render
  - Log access to audit trail
  - Provide toggle to hide amounts again without confirmation

### 9. Implement Download with Audit Logging
- In `PayslipPage.downloadPayslip()` and `PayslipPage.downloadTaxDocument()`:
  - Call `API.logDocumentAccess()` before download
  - Show toast notification about download
  - Create download link and trigger download
  - Handle errors gracefully

### 10. Add Navigation Link (Optional)
- Consider adding payslip link to header navigation or home page quick actions
- Could also be accessed from profile/compensation tab

### 11. Validate Implementation
- Test payslip list rendering with year filter
- Test payslip detail view with all earnings/deductions sections
- Test amount masking toggle with confirmation
- Test tax document list and download
- Test Thai language display with proper tax terminology
- Verify Buddhist Era date formatting
- Test responsive design on mobile

## Validation Commands
Execute these commands to validate the chore is complete:

- `python -m http.server 8080 -d apps` - Start local server to test the application
- Open `http://localhost:8080#/payslip` in browser - Verify payslip list loads
- Click on a payslip row - Verify detail view renders with all sections
- Click "Show Amounts" toggle - Verify confirmation modal appears
- Confirm to show amounts - Verify amounts are displayed correctly
- Click "Tax Documents" tab - Verify tax documents list loads
- Click download on a document - Verify download triggers
- Switch language to Thai - Verify Thai tax terms display correctly (เงินเดือน, ภาษีเงินได้, etc.)
- Test on mobile viewport - Verify responsive layout

## Notes

### Thai Tax Terminology Reference
- เงินเดือน (Base Salary)
- ค่าตำแหน่ง (Position Allowance)
- ค่าครองชีพ (Cost of Living Allowance)
- ค่าล่วงเวลา (Overtime)
- ภาษีเงินได้บุคคลธรรมดา (Personal Income Tax)
- ประกันสังคม (Social Security)
- กองทุนสำรองเลี้ยงชีพ (Provident Fund)
- สินเชื่อ/เงินกู้ (Loans)
- 50 ทวิ (Withholding Tax Certificate - Form 50 Tawi)
- ปีภาษี (Tax Year)
- รายได้รวม (Total Earnings)
- หักรวม (Total Deductions)
- เงินได้สุทธิ (Net Pay)
- ยอดสะสม (Year-to-Date/Cumulative)

### Security Considerations
- Amounts masked by default (shows `THB ***,***`)
- Confirmation required before revealing amounts
- All document downloads logged with timestamp, employee ID, document type, action
- Consider session timeout for sensitive financial data

### UI/UX Patterns from Existing Code
- Use `CardComponent.render()` for section cards
- Use `SkeletonComponent` for loading states
- Use `ToastComponent` for success/error messages
- Use `ModalComponent.confirm()` for confirmations
- Use `DateUtils.format()` with Buddhist Era for Thai dates
- Use `MaskUtils` for masking sensitive data
- Follow tab navigation pattern from `LeaveRequestPage`

### Existing Mock Data Structure Reference
Current payslips in mock-employee.js (lines 287-295):
```javascript
payslips: [
    { id: 'ps_202312', period: 'December 2023', payDate: '2023-12-25', grossAmount: 120000, netAmount: 95000 },
    ...
]
```

This needs to be extended with detailed earnings/deductions breakdown.

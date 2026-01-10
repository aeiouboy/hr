# Chore: Extend Profile Details Page with Additional PRD Sections

## Metadata
adw_id: `82adc142`
prompt: `Extend Profile Details page with additional PRD sections. Add to apps/js/pages/profile-details.js: 1) E-Letter section showing Annual Bonus and Merit Increment Letters with download capability 2) Learning History section showing training records with completion dates and certificates 3) OHS Certificate section for safety certifications 4) OHS Document section for safety documents 5) Individual Document section for personal documents with upload/download. Add corresponding mock data to mock-employee.js, add i18n translations for all new labels, and implement document download functionality similar to payslip download.`

## Chore Description
This chore extends the Profile Details page (`apps/js/pages/profile-details.js`) by adding five new sections according to PRD specifications:

1. **E-Letter Section** - Display Annual Bonus Letters and Merit Increment Letters with download functionality
2. **Learning History Section** - Show training/course records with completion dates, status, and certificate downloads
3. **OHS Certificate Section** - Display occupational health and safety certifications with expiry tracking
4. **OHS Document Section** - List safety-related documents with download capability
5. **Individual Documents Section** - Personal documents with upload and download functionality

All sections will follow the existing architectural pattern using CardComponent, include bilingual Thai/English support via i18n, and implement document download functionality similar to the existing payslip download pattern in CompensationPage.

## Relevant Files

### Existing Files to Modify

- **apps/js/pages/profile-details.js** - Add five new render methods for the new sections and integrate them into the main render() method
- **apps/js/data/mock-employee.js** - Add mock data for E-Letters, learning history, OHS certificates, OHS documents, and individual documents within the `profileDetails` object
- **apps/locales/en.json** - Add English translations for all new labels under the `profileDetails` section
- **apps/locales/th.json** - Add Thai translations for all new labels under the `profileDetails` section
- **apps/js/api.js** - Add API methods for downloading documents (eLetters, certificates, OHS documents, individual documents)

### New Files
None required - all changes are additions to existing files

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Data to mock-employee.js
- Add `eLetters` array with sample Annual Bonus and Merit Increment letters (at least 2-3 items)
  - Fields: id, letterType ('annual_bonus' | 'merit_increment'), title, fiscalYear, issueDate, downloadUrl
- Add `learningHistory` array with sample training records (at least 4-5 items)
  - Fields: id, courseName, courseCode, provider, startDate, endDate, status ('completed' | 'in_progress' | 'registered'), completionDate, certificateUrl, credits
- Add `ohsCertificates` array with sample safety certifications (at least 2-3 items)
  - Fields: id, certificateName, certificateNumber, issuer, issueDate, expiryDate, status ('active' | 'expired' | 'expiring_soon')
- Add `ohsDocuments` array with sample safety documents (at least 3-4 items)
  - Fields: id, documentName, documentType, issueDate, downloadUrl, description
- Add `individualDocuments` array with sample personal documents (at least 3-4 items)
  - Fields: id, documentName, documentType, uploadDate, fileSize, downloadUrl, uploadedBy
- Place all arrays inside the `employee.profileDetails` object

### 2. Add i18n Translations for English (en.json)
- Under `profileDetails` section, add translations for:
  - E-Letter labels: "eLetter", "annualBonusLetter", "meritIncrementLetter", "letterType", "fiscalYear", "downloadLetter"
  - Learning History labels: "learningHistory", "courseName", "courseCode", "provider", "completionDate", "credits", "certificate", "downloadCertificate", "inProgress", "completed", "registered"
  - OHS Certificate labels: "ohsCertificate", "certificateNumber", "active", "expired", "expiringSoon"
  - OHS Document labels: "ohsDocument", "documentType", "description"
  - Individual Document labels: "documents", "individualDocuments", "documentName", "uploadDate", "fileSize", "uploadedBy", "uploadDocument", "noDocuments"
  - Common labels: "download", "view", "status", "actions"

### 3. Add i18n Translations for Thai (th.json)
- Under `profileDetails` section, add Thai translations for all labels added in step 2
- Ensure proper Thai terminology for HR/training contexts:
  - E-Letter = "จดหมายอิเล็กทรอนิกส์"
  - Annual Bonus = "โบนัสประจำปี"
  - Merit Increment = "การขึ้นเงินเดือนตามผลงาน"
  - Learning History = "ประวัติการอบรม"
  - OHS = "ความปลอดภัยอาชีวอนามัย"

### 4. Implement E-Letter Section in profile-details.js
- Add `renderELetterSection(eLetters)` method
- Create a table or card list displaying letter type, title, fiscal year, issue date
- Add download button for each letter using Material Icons 'download' icon
- Include onclick handler: `ProfileDetailsPage.downloadELetter('${letter.id}')`
- Handle empty state with CardComponent.emptyState()
- Use CardComponent.render() with icon 'mail' and collapsible: true

### 5. Implement Learning History Section in profile-details.js
- Add `renderLearningHistorySection(learningHistory)` method
- Create a table showing course name, provider, dates, status, and actions
- Add status badges with colors: completed (green), in_progress (blue), registered (yellow)
- Add download certificate button (only for completed courses with certificateUrl)
- Include onclick handler: `ProfileDetailsPage.downloadCertificate('${course.id}')`
- Use CardComponent.render() with icon 'school' and collapsible: true

### 6. Implement OHS Certificate Section in profile-details.js
- Add `renderOHSCertificateSection(ohsCertificates)` method
- Display certificate cards with name, number, issuer, dates
- Add visual indicators for expiry status (expired: red, expiring soon: yellow, active: green)
- Use logic similar to existing certifications section for expiry date checking
- Use CardComponent.render() with icon 'health_and_safety' and collapsible: true

### 7. Implement OHS Document Section in profile-details.js
- Add `renderOHSDocumentSection(ohsDocuments)` method
- Display documents in a table or list format with document name, type, issue date
- Add download button for each document
- Include onclick handler: `ProfileDetailsPage.downloadOHSDocument('${doc.id}')`
- Use CardComponent.render() with icon 'description' and collapsible: true

### 8. Implement Individual Documents Section in profile-details.js
- Add `renderIndividualDocumentsSection(individualDocuments)` method
- Display documents table with name, type, upload date, file size, uploaded by
- Add download button for each document
- Include onclick handler: `ProfileDetailsPage.downloadIndividualDocument('${doc.id}')`
- Add upload button with onclick: `ProfileDetailsPage.uploadDocument()` (placeholder function)
- Use CardComponent.render() with icon 'folder' and collapsible: true

### 9. Add Download Handler Methods in profile-details.js
- Add `downloadELetter(letterId)` method following payslip download pattern
- Add `downloadCertificate(courseId)` method following payslip download pattern
- Add `downloadOHSDocument(docId)` method following payslip download pattern
- Add `downloadIndividualDocument(docId)` method following payslip download pattern
- Add `uploadDocument()` method as placeholder showing toast: "Upload functionality coming soon"
- All methods should use ToastComponent for user feedback and handle errors gracefully

### 10. Integrate New Sections into Main Render Method
- Update the main `render(employee)` method to include all five new sections
- Insert sections in order: Education → Previous Employment → Languages → Certifications → **E-Letter** → **Learning History** → **OHS Certificate** → **OHS Document** → Awards → Mobility → **Individual Documents**
- Ensure proper spacing with `space-y-6` class on container

### 11. Add API Methods to api.js
- Add `downloadELetter(employeeId, letterId)` method returning mock blob
- Add `downloadCertificate(employeeId, courseId)` method returning mock blob
- Add `downloadOHSDocument(employeeId, docId)` method returning mock blob
- Add `downloadIndividualDocument(employeeId, docId)` method returning mock blob
- Follow the existing `downloadPayslip` pattern with simulated delays
- Return simulated PDF blobs for download

### 12. Validate Implementation
- Test rendering of all five new sections with mock data
- Verify download buttons trigger appropriate handlers
- Confirm toast notifications appear for downloads
- Check bilingual support (Thai/English) for all new labels
- Verify empty states display correctly when no data exists
- Test collapsible behavior of all card sections
- Validate expiry date logic for OHS certificates
- Ensure consistent styling with existing sections

## Validation Commands
Execute these commands to validate the chore is complete:

- `python -m http.server 8080 -d apps` - Start local development server
- Navigate to `http://localhost:8080/#/profile/EMP001?tab=profile-details` in browser
- **Visual Tests:**
  - Verify all five new sections render correctly with mock data
  - Click each download button and confirm toast notification appears
  - Toggle language (Thai/English) and verify all labels translate correctly
  - Collapse and expand each new section to verify collapsible functionality
  - Test empty states by temporarily commenting out mock data
  - Verify certificate expiry badges show correct colors
- **Code Validation:**
  - Open browser console and check for JavaScript errors
  - Verify no console warnings about missing i18n keys
  - Confirm all onclick handlers are properly bound
  - Check that DateUtils.format() works for all date fields

## Notes

### Architectural Patterns to Follow
- Use revealing module pattern consistent with existing ProfileDetailsPage
- Follow CardComponent.render() wrapper for all sections
- Use i18n.t() for all user-facing text
- Implement Material Icons for visual elements
- Use DateUtils.format() for all date formatting
- Follow RBAC patterns if implementing permissions (optional for this chore)

### Mock Data Realism
- Use realistic Central Group employee training courses (e.g., "CG Leadership Program", "Fire Safety Training")
- E-Letter fiscal years should be recent (2023-2024)
- Learning history should include mix of completed, in-progress, and registered courses
- OHS certificates should include common safety certifications (First Aid, Fire Warden, etc.)
- File sizes should be realistic (50KB - 2MB for PDFs)

### Download Functionality
- All download methods should follow the same pattern as `CompensationPage.downloadPayslip()`
- Use `window.URL.createObjectURL()` for blob downloads
- Clean up blob URLs with `window.URL.revokeObjectURL()` after download
- Show "Download started" toast on success
- Show "An error occurred" toast on failure

### Future Enhancements (Out of Scope)
- Actual file upload implementation for Individual Documents
- Integration with real document storage system
- Workflow approval for document uploads
- Document versioning and history
- Access control for sensitive documents

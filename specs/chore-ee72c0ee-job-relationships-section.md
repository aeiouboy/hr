# Chore: Implement Job Relationships Section

## Metadata
adw_id: `ee72c0ee`
prompt: `Implement Job Relationships section from PRD Section 3.2. Add to apps/js/pages/employment.js: 1) Create renderJobRelationshipsSection() method showing: dotted-line manager, matrix manager, HR business partner, administrative assistant 2) Each relationship displays photo, name, title, and contact info 3) Make names clickable to navigate to their profiles 4) Add mock job relationships data to mock-employee.js 5) Add i18n translations: 'Job Relationships', 'Dotted-line Manager', 'Matrix Manager', 'HR Business Partner', 'Administrative Assistant' 6) Show empty state if no relationships configured.`

## Chore Description
This chore implements the Job Relationships section as specified in PRD Section 3.2 Employment Information. This section displays an employee's extended reporting and support relationships beyond their direct supervisor, including dotted-line managers, matrix managers, HR business partners, and administrative assistants. The implementation provides:

1. A dedicated Job Relationships section within the Employment Information page
2. Visual cards displaying each relationship with photo, name, title, and contact information
3. Clickable names that navigate to the related employee's profile for easy access
4. Support for multiple relationship types to reflect modern organizational structures
5. Empty state handling when no job relationships are configured for an employee
6. Mock data structure for various job relationship types
7. Bilingual translations (Thai/English) for all relationship labels
8. Responsive card-based layout for optimal viewing on all devices

The job relationships section is important for understanding an employee's full organizational context, particularly in matrix organizations where employees may report to multiple managers or work with dedicated support staff.

## Relevant Files
Use these files to complete the chore:

- **apps/js/pages/employment.js** - Employment Information page module. Will add `renderJobRelationshipsSection()` method to display job relationships in a card-based layout after the Job Information section (around line 153, after `renderJobSection()`). Each relationship card will show photo, name, title, email, and phone with clickable navigation to profiles.

- **apps/js/data/mock-employee.js** - Employee mock data. Will add a new `jobRelationships` object to the `employmentInfo` structure (around line 179, after the `job` object). The object will contain arrays for different relationship types: dottedLineManagers, matrixManagers, hrBusinessPartners, and administrativeAssistants. Each relationship will include: id, name, title, photo, email, phone.

- **apps/locales/en.json** - English translations. Will add new translation keys under the `employment` section for: jobRelationships (title), dottedLineManager, matrixManager, hrBusinessPartner, administrativeAssistant, noJobRelationships (empty state message), viewProfile.

- **apps/locales/th.json** - Thai translations. Will add corresponding Thai translations for all job relationships fields under the `employment` section: jobRelationships (ความสัมพันธ์ในงาน), dottedLineManager (ผู้จัดการแบบเส้นประ), matrixManager (ผู้จัดการแบบเมทริกซ์), hrBusinessPartner (พันธมิตร HR), administrativeAssistant (ผู้ช่วยธุรการ), and all other related translations.

### New Files
None - all changes are additions to existing files.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Add Mock Job Relationships Data
- Open `apps/js/data/mock-employee.js`
- Locate the `employmentInfo` object and find the closing brace of the `job` object (around line 179)
- After the closing brace of the `job` object, add a comma and insert a new `jobRelationships` object
- Structure the job relationships object with the following relationship type arrays:
  - `dottedLineManagers`: Array of manager objects who have indirect reporting relationships
  - `matrixManagers`: Array of manager objects in matrix reporting structures
  - `hrBusinessPartners`: Array of HR business partner objects who support the employee
  - `administrativeAssistants`: Array of administrative assistant objects who provide support
- Each relationship object should contain:
  - `id`: String - unique employee ID (e.g., 'EMP_DL001')
  - `name`: String - full name in English (e.g., 'Somchai Sukhothai')
  - `nameTh`: String - full name in Thai (e.g., 'สมชาย สุโขทัย')
  - `title`: String - job title (e.g., 'Regional Director')
  - `photo`: String - photo URL (e.g., 'https://i.pravatar.cc/150?img=15')
  - `email`: String - work email (e.g., 'somchai.s@central.co.th')
  - `phone`: String - work phone (e.g., '+66 2 123 4567 ext. 1234')
- Add a comment above the jobRelationships object: `// Job Relationships`
- Create diverse sample data with 1-2 entries for each relationship type
- For the mock employee, include at least:
  - 1 dotted-line manager (e.g., regional or functional leader)
  - 1 matrix manager (e.g., project or program manager)
  - 1 HR business partner
  - 1 administrative assistant
- Ensure proper JSON syntax with commas between objects and arrays

### 2. Add English Translations for Job Relationships
- Open `apps/locales/en.json`
- Locate the `employment` section (around line 122)
- After the last key in the employment section (after "orgChart" or similar), add the following translation keys:
  - `jobRelationships`: "Job Relationships"
  - `dottedLineManager`: "Dotted-line Manager"
  - `matrixManager`: "Matrix Manager"
  - `hrBusinessPartner`: "HR Business Partner"
  - `administrativeAssistant`: "Administrative Assistant"
  - `noJobRelationships`: "No job relationships configured"
  - `viewProfile`: "View Profile"
  - `contactInfo`: "Contact Information"
- Ensure proper JSON syntax with commas between entries
- Place these keys logically after other employment-related keys

### 3. Add Thai Translations for Job Relationships
- Open `apps/locales/th.json`
- Locate the `employment` section (around line 122)
- Add the corresponding Thai translations for all job relationships keys:
  - `jobRelationships`: "ความสัมพันธ์ในงาน"
  - `dottedLineManager`: "ผู้จัดการแบบเส้นประ"
  - `matrixManager`: "ผู้จัดการแบบเมทริกซ์"
  - `hrBusinessPartner`: "พันธมิตรทรัพยากรบุคคล"
  - `administrativeAssistant`: "ผู้ช่วยธุรการ"
  - `noJobRelationships`: "ไม่มีข้อมูลความสัมพันธ์ในงาน"
  - `viewProfile`: "ดูโปรไฟล์"
  - `contactInfo`: "ข้อมูลติดต่อ"
- Ensure proper JSON syntax with commas between entries
- Verify Thai text is properly encoded in UTF-8

### 4. Create Job Relationships Section Renderer
- Open `apps/js/pages/employment.js`
- After the `renderJobSection()` method (around line 153), add a new `renderJobRelationshipsSection()` method
- Method signature: `renderJobRelationshipsSection(jobRelationships)`
- Handle null/undefined jobRelationships with early return showing empty state:
  ```javascript
  if (!jobRelationships || (!jobRelationships.dottedLineManagers?.length &&
      !jobRelationships.matrixManagers?.length &&
      !jobRelationships.hrBusinessPartners?.length &&
      !jobRelationships.administrativeAssistants?.length)) {
      return CardComponent.render({
          id: 'job-relationships-card',
          title: i18n.t('employment.jobRelationships'),
          icon: 'people',
          content: CardComponent.emptyState(i18n.t('employment.noJobRelationships'))
      });
  }
  ```
- Create a helper function `renderRelationshipCard(person, relationshipType)` that generates HTML for a single relationship:
  - Display photo as circular avatar (w-16 h-16)
  - Name as clickable link that navigates to their profile using Router
  - Relationship type label using i18n
  - Job title
  - Email with mailto link and email icon
  - Phone with tel link and phone icon
  - Use Tailwind CSS for styling with hover effects
- Build the content HTML by mapping over each relationship type array:
  - Dotted-line Managers section
  - Matrix Managers section
  - HR Business Partners section
  - Administrative Assistants section
- Use grid layout (grid grid-cols-1 md:grid-cols-2 gap-4) for responsive display
- Only render sections that have data (skip empty arrays)
- Return the complete section using `CardComponent.render()` with:
  - id: 'job-relationships-card'
  - title: `i18n.t('employment.jobRelationships')`
  - icon: 'people' (Material Icons)
  - collapsible: true (allows users to collapse the section)
  - content: the built HTML with all relationship cards

### 5. Implement Clickable Profile Navigation
- In the relationship card renderer, make the person's name a clickable element
- Use an anchor tag with `href="#/profile/${person.id}"` to enable navigation
- Apply appropriate styling classes for links:
  - `text-primary-600 hover:text-primary-700`
  - `font-medium`
  - `cursor-pointer`
  - `transition-colors`
- Add `onclick="event.preventDefault(); Router.navigate('/profile/${person.id}');"` for SPA navigation
- Ensure the link is keyboard accessible and screen reader friendly
- The entire name should be clickable, not just underlined text

### 6. Style Relationship Cards
- Each relationship card should have:
  - White background with subtle border: `bg-white border border-gray-200`
  - Rounded corners: `rounded-lg`
  - Padding: `p-4`
  - Shadow on hover: `hover:shadow-md transition-shadow`
- Layout within each card:
  - Flex container with photo on left, info on right: `flex gap-4`
  - Photo: circular with border `rounded-full border-2 border-gray-200`
  - Info section: flex column with gap `flex flex-col gap-1`
- Contact information styling:
  - Email and phone as subtle links: `text-sm text-gray-600 hover:text-primary-600`
  - Icons before text using Material Icons: `email` and `phone`
  - Icon and text alignment: `flex items-center gap-1`
- Relationship type badge:
  - Small pill-shaped badge: `inline-block px-2 py-1 text-xs rounded-full`
  - Background color: `bg-blue-100 text-blue-800`
  - Positioned below the name

### 7. Integrate Job Relationships Section into Main Render
- In `apps/js/pages/employment.js`, locate the main `render()` method (around line 13)
- After extracting employment data: `const employment = employee.employmentInfo || {};`, add:
  - `const jobRelationships = employment.jobRelationships || null;`
- In the returned HTML template, locate the Job Information section call: `${this.renderJobSection(employment.job)}`
- Immediately after the Job Information section, add:
  - HTML comment: `<!-- Job Relationships Section -->`
  - Section call: `${this.renderJobRelationshipsSection(jobRelationships)}`
- Ensure proper spacing and indentation matching the existing code style
- The job relationships section should appear last, after all other employment sections

### 8. Test Empty State Handling
- Verify that the section gracefully handles:
  - Null or undefined jobRelationships object
  - Empty arrays for all relationship types
  - Missing relationship type arrays
  - Partial data (some types populated, others empty)
- Empty state should display a user-friendly message with appropriate icon
- Use `CardComponent.emptyState()` for consistent empty state styling

## Validation Commands
Execute these commands to validate the chore is complete:

- **Syntax Validation**: Open `apps/index.html` in a browser and check the browser console for JavaScript errors. No errors should appear related to employment.js, mock-employee.js, or translation files.

- **Visual Inspection**: Navigate to a test employee's profile page, go to the Employment tab, and verify:
  - The Job Relationships section appears after the Job Information section
  - Each relationship type (dotted-line manager, matrix manager, HR business partner, administrative assistant) displays in its own subsection
  - Each relationship card shows photo, name, title, email, and phone
  - Photos are circular and properly sized
  - Layout is responsive and looks good on different screen sizes
  - Section can be collapsed/expanded using the card header

- **Translation Check**: Switch between English and Thai language using the language toggle. Verify:
  - Section title "Job Relationships" / "ความสัมพันธ์ในงาน" displays correctly
  - All relationship type labels are properly translated
  - Contact information labels (Email, Phone) are translated
  - Empty state message is translated
  - Names display in the appropriate language (use nameTh in Thai mode)

- **Navigation Testing**: Click on any person's name in a job relationship card. Verify:
  - Clicking navigates to that person's profile page
  - Browser URL updates to #/profile/{personId}
  - The SPA navigation works smoothly without full page reload
  - Browser back button returns to the original profile
  - The link is keyboard accessible (can tab to it and press Enter)

- **Contact Links**: Test the email and phone links. Verify:
  - Clicking email opens default email client with correct address
  - Clicking phone initiates call on mobile devices
  - Links have proper hover states (color change)
  - Icons display correctly next to email and phone text

- **Empty State Testing**: Temporarily modify mock data to remove all job relationships. Verify:
  - The section still displays with the card header
  - An empty state message appears: "No job relationships configured"
  - The empty state uses appropriate icon and styling
  - No JavaScript errors appear in console

- **Responsive Layout**: Test the section at different viewport sizes:
  - Desktop (1920px): Relationship cards should display in 2-column grid
  - Tablet (768px): Should adapt to single column or 2 columns based on space
  - Mobile (375px): Should display as single column with full width cards
  - All elements remain readable and properly spaced at all sizes

- **Data Display**: Verify all relationship types display correctly:
  - Dotted-line Managers section shows all dotted-line managers
  - Matrix Managers section shows all matrix managers
  - HR Business Partners section shows all HR business partners
  - Administrative Assistants section shows all administrative assistants
  - Each section only appears if it has data
  - Missing relationship types are gracefully hidden

- **Accessibility Check**: Test keyboard navigation and screen reader support:
  - Tab through relationship cards and clickable names
  - Verify focus indicators are visible on interactive elements
  - Screen reader should announce person name, title, and contact info
  - Links should be announced with their purpose ("View Profile")
  - Card structure should be semantically correct

## Notes

### Job Relationships Types

1. **Dotted-line Manager**: A secondary or functional manager who has oversight but not direct reporting authority. Common in matrix organizations where employees report to both a direct manager and a functional leader.

2. **Matrix Manager**: A project or program manager in matrix organizational structures. Employees may work on multiple projects and have multiple matrix managers while maintaining one direct supervisor.

3. **HR Business Partner**: A dedicated HR professional assigned to support specific departments or employee groups. They provide HR guidance, handle employee relations, and support organizational development.

4. **Administrative Assistant**: An administrative professional who provides support to the employee or their team. May handle scheduling, travel, expenses, and other administrative tasks.

### Design Considerations

- **Card-based Layout**: Using individual cards for each relationship provides clear visual separation and makes information easy to scan
- **Photo Prominence**: Circular photos create visual interest and help users quickly identify people
- **Clickable Names**: Making names clickable enables quick navigation to related profiles, supporting network exploration
- **Responsive Grid**: Two-column layout on desktop scales down to single column on mobile for optimal readability
- **Collapsible Section**: Allows users to minimize the section if not relevant to their current task

### Data Privacy
- Only work-related contact information (business email and phone) should be displayed
- Personal mobile numbers or personal emails should not be included
- All displayed information should be appropriate for company-wide visibility
- Consider RBAC if certain relationships should only be visible to specific roles

### Organizational Context
- Not all employees will have job relationships configured
- Some employees may have multiple entries in one category (e.g., 2 matrix managers)
- Others may have no entries in certain categories (e.g., no administrative assistant)
- The structure should flexibly accommodate various organizational patterns

### Navigation Flow
- Clicking a relationship's name should navigate to their full employee profile
- This enables users to:
  - View the person's complete information
  - See their organization chart
  - Find additional contact methods
  - Understand their role and responsibilities

### Internationalization
- Person names should display in the appropriate language:
  - Use `name` field in English mode
  - Use `nameTh` field in Thai mode
- Contact information labels should be translated
- Relationship type labels must support both languages
- Empty state messages should be localized

### Empty State Scenarios
The section should handle these empty state cases:
1. No job relationships object in employee data
2. Job relationships object exists but all arrays are empty
3. Partial data with some relationship types populated
4. Individual relationship type arrays are null or undefined

### Testing Scenarios
1. **Full Data**: Employee with all relationship types populated
2. **Partial Data**: Employee with only 1-2 relationship types
3. **Empty Data**: New employee with no job relationships
4. **Multiple Entries**: Employee with 2+ entries in one category
5. **Missing Photos**: Relationship entries with missing photo URLs (should show placeholder)
6. **Long Names**: Test with names that might wrap on small screens
7. **Navigation**: Test clicking multiple relationship names to verify navigation works

### Future Enhancements (Not in Scope)
- Relationship history tracking (when relationships started/ended)
- Percentage of time allocation for matrix managers
- Ability for employees to request changes to job relationships
- Organizational chart visualization showing all relationships
- Notification when a job relationship person leaves the company
- Integration with calendar to show availability of relationships
- Quick message functionality to contact relationships directly
- Tags or categories for custom relationship types

### Visual Hierarchy
- Section title should be clear and prominent (h3 or h4)
- Relationship type subsection labels should be visible but secondary (h5 or bold text)
- Person names should be the most prominent text in each card
- Job titles should be secondary but readable
- Contact information should be tertiary but accessible

### Performance Considerations
- Photos should be lazy-loaded if many relationships exist
- Consider using CSS grid for better performance than flexbox for large lists
- Profile navigation should use client-side routing for instant transitions
- Render only visible relationships on initial load if performance is a concern

### Accessibility Best Practices
- Use semantic HTML (proper heading hierarchy)
- Provide alt text for all photos
- Ensure sufficient color contrast for all text
- Make all interactive elements keyboard accessible
- Provide clear focus indicators
- Use ARIA labels where helpful ("View [Name]'s profile")
- Announce dynamic content changes to screen readers

### Mock Data Variety
Create realistic mock data representing different scenarios:
- Regional manager as dotted-line manager
- Functional leader as matrix manager
- Dedicated HRBP supporting a business unit
- Shared administrative assistant supporting multiple managers
- Use realistic Thai and international names
- Use proper Central Group email format
- Include extension numbers in phone numbers
- Use varied job titles representing actual organizational roles

### Integration Points
- Profile navigation integrates with Router.js
- Contact links use standard mailto: and tel: protocols
- Photo URLs can be served from avatar service or company directory
- Employee IDs must match the profile page routing structure
- All person objects should match the standard employee data schema

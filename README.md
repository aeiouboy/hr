# RIS HR System - Employee Information Module

A comprehensive HR management system built for Central Group, featuring employee self-service, workflow approvals, and bilingual Thai/English support.

## Overview

The Employee Information Module provides a complete employee self-service portal with:
- Personal information management
- Employment details viewing
- Compensation and benefits overview
- Multi-level workflow approval system
- Role-based access control

## Features

### Employee Self-Service
- View and edit personal information
- Manage emergency contacts and dependents
- Update contact information (email, phone, address)
- View employment history and org chart
- Download payslips and tax documents

### Workflow System
- Multi-level approval routing (Manager → HR Admin → HR Manager)
- Self-service changes (no approval required) for non-sensitive data
- Request tracking and status notifications
- Send-back and revision capabilities

### Internationalization
- Full Thai/English language support
- Thai Buddhist Era date formatting (BE 2567)
- Bilingual labels and validation messages

### Security
- Role-based access control (Employee, Manager, HR Admin, HR Manager)
- Field-level permissions
- Data masking for sensitive information (bank accounts, national IDs)
- WCAG 2.1 AA accessibility compliance

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Material Icons (CDN)
- **Fonts**: Sarabun, Noto Sans Thai (Google Fonts)
- **Architecture**: Single Page Application (SPA)
- **Routing**: Hash-based client-side routing
- **State**: Pub/sub pattern with centralized state management

## Directory Structure

```
apps/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # Custom styles, animations
├── locales/
│   ├── en.json             # English translations
│   └── th.json             # Thai translations
└── js/
    ├── app.js              # Application bootstrap
    ├── state.js            # State management
    ├── router.js           # Client-side routing
    ├── api.js              # Mock API client
    ├── i18n.js             # Internationalization
    ├── components/         # Reusable UI components
    │   ├── card.js
    │   ├── data-table.js
    │   ├── form-field.js
    │   ├── header.js
    │   ├── modal.js
    │   ├── notification-bell.js
    │   ├── org-chart.js
    │   ├── profile-header.js
    │   ├── tabs.js
    │   └── toast.js
    ├── data/               # Mock data
    │   ├── mock-employee.js
    │   ├── mock-lookups.js
    │   └── mock-workflows.js
    ├── pages/              # Page modules
    │   ├── home.js
    │   ├── profile.js
    │   ├── personal-info.js
    │   ├── employment.js
    │   ├── compensation.js
    │   ├── benefits.js
    │   ├── profile-details.js
    │   └── workflows.js
    ├── utils/              # Utility functions
    │   ├── date.js
    │   ├── mask.js
    │   ├── rbac.js
    │   └── validation.js
    └── workflow/           # Workflow engine
        ├── engine.js
        ├── notifications.js
        └── rules.js
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Running the Application

**Option 1: Direct file opening**
```bash
open apps/index.html
```

**Option 2: Using a local server (recommended)**
```bash
# Using Python
python -m http.server 8080 -d apps

# Using Node.js
npx serve apps

# Using PHP
php -S localhost:8080 -t apps
```

Then open `http://localhost:8080` in your browser.

## Architecture

### State Management
The application uses a centralized state store with pub/sub pattern:

```javascript
// Subscribe to state changes
AppState.subscribe('currentEmployee', (employee) => {
    // Update UI
});

// Update state
AppState.set('currentEmployee', employeeData);
```

### Routing
Hash-based routing with lifecycle hooks:

```javascript
Router.register('/profile/:id/:tab?', ProfilePage);
// Matches: #/profile/EMP001/personal-info
```

### API Layer
Mock API with simulated network delays:

```javascript
const employee = await API.getEmployee('EMP001');
await API.updatePersonalInfo(employeeId, data);
```

## Role-Based Access Control

| Role | Permissions |
|------|-------------|
| Employee | View own profile, edit contact info, submit requests |
| Manager | + View team profiles, approve/reject requests |
| HR Admin | + View all profiles, edit employment data |
| HR Manager | + Edit compensation, approve sensitive changes |

## Workflow Rules

### Self-Service (No Approval)
- Personal email, mobile phone, home phone
- Emergency contacts (add/edit/delete)

### Manager Approval
- Nickname changes
- Business phone updates

### Manager + HR Approval
- Personal information changes
- Address updates
- Dependent additions/edits

### Full Approval (Manager + HR Admin + HR Manager)
- Bank account changes
- National ID updates
- Compensation changes

## Branding

Central Group brand colors:
- **Primary Red**: `#C8102E`
- **Secondary**: `#1E3A5F`
- **Success**: `#10B981`
- **Error**: `#EF4444`
- **Warning**: `#F59E0B`
- **Info**: `#3B82F6`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Statistics

- **Files**: 37
- **Lines of Code**: 10,604
- **Languages**: Thai, English
- **Components**: 10 reusable UI components
- **Pages**: 8 application pages

## License

Proprietary - Central Group

## Documentation

- [Product Requirements Document](docs/prd.md)
- [Feature Specification](specs/feature-4g6ymsf7-employee-information-module.md)

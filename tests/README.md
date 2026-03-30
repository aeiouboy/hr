# RIS HR System - Test Suite

Organized test infrastructure for the RIS HR System Employee Information Module.

## Directory Structure

```
tests/
├── README.md                    # This file
├── scripts/                     # Test scripts (Playwright/Node.js)
│   ├── test-benefits-tab.js     # Benefits tab tests (30 test cases)
│   ├── test-scorecard-tab.js    # Scorecard tab tests (15 test cases)
│   ├── test-profile-details.js  # Profile details tests (11 sections)
│   ├── test-additional-modules.js # Additional module tests
│   ├── verification-test.js     # Verification tests
│   └── debug-payroll-setup.js   # Payroll debug script
├── docs/                        # Test documentation
│   ├── benefits/                # Benefits tab documentation
│   │   ├── ANALYSIS-SUMMARY.md
│   │   ├── MANUAL-TEST-CHECKLIST.md
│   │   ├── QUICK-TEST-GUIDE.md
│   │   └── TEST-REPORT.md
│   ├── scorecard/               # Scorecard tab documentation
│   │   ├── EXPECTED_DATA.md
│   │   ├── QUICK_CHECKLIST.md
│   │   ├── TEST_MANUAL.md
│   │   ├── TEST_SUMMARY.md
│   │   └── TESTING_REPORT.md
│   └── profile-details/         # Profile details documentation
└── results/                     # Test outputs
    ├── json/                    # Test result JSON files
    ├── reports/                 # Generated reports (markdown)
    └── screenshots/             # Test screenshots
```

## Prerequisites

```bash
# Install dependencies
npm install

# Ensure Playwright browsers are installed
npx playwright install chromium
```

## Running Tests

### Start the Development Server

Before running tests, start the application server:

```bash
# From project root
python -m http.server 8080 -d apps
# OR
npx serve apps -p 8080
```

### Run All Tests

```bash
# Run Playwright tests (Benefits tab)
npx playwright test tests/scripts/test-benefits-tab.js

# Run Node.js tests (Scorecard, Profile Details)
node tests/scripts/test-scorecard-tab.js
node tests/scripts/test-profile-details.js
```

### Run Individual Test Suites

```bash
# Benefits Tab (30 test cases)
npx playwright test tests/scripts/test-benefits-tab.js

# Scorecard Tab (15 test cases)
node tests/scripts/test-scorecard-tab.js

# Profile Details Tab (11 sections)
node tests/scripts/test-profile-details.js

# Additional Modules
node tests/scripts/test-additional-modules.js

# Verification Tests
node tests/scripts/verification-test.js
```

## Test Output Locations

All test outputs are saved to `tests/results/`:

| Output Type | Location | Description |
|------------|----------|-------------|
| Screenshots | `tests/results/screenshots/` | Visual test captures |
| JSON Results | `tests/results/json/` | Structured test results |
| Reports | `tests/results/reports/` | Markdown test reports |

## Test Coverage

### Benefits Tab (30 tests)
- Tab navigation and visibility
- Overview section with 4 stat boxes
- Enrollment cards (Health, Life, Provident Fund)
- Status badges and effective dates
- Error detection (undefined, translation issues)
- Responsive design (mobile, tablet)
- Accessibility checks

### Scorecard Tab (15 tests)
- CG Competency section (6 competencies)
- Assessment History (3 records)
- Assessment Summary (rating display)
- Key Successes section
- Strengths & Development areas
- Career Aspirations
- Development Objectives
- Talent Reference
- 9-Box Matrix
- Final Calibration

### Profile Details Tab (11 sections)
- Education
- Previous Employment
- Languages
- Certifications
- E-Letter
- Learning History
- OHS Certificate
- OHS Document
- Awards
- Mobility
- Individual Documents

## Manual Testing

See the documentation in `tests/docs/` for:
- Step-by-step manual test procedures
- Expected data references
- Quick test checklists
- Bug report templates

## Test Result Files

Previous test results in `tests/results/json/`:
- `smoke_test.json` - Basic smoke tests
- `phase1_test.json` - Phase 1 implementation tests
- `phase2_test.json` - Phase 2 tests
- `phase4_test.json` - Phase 4 tests
- `phase5_test.json` - Phase 5 tests
- `additional_test.json` - Additional module tests
- `verification_test.json` - Verification tests

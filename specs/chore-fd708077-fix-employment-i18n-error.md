# Chore: Fix JavaScript error in employment.js - i18n.getCurrentLanguage is not a function

## Metadata
adw_id: `fd708077`
prompt: `Fix JavaScript error in employment.js:180 - TypeError: i18n.getCurrentLanguage is not a function. The renderRelationshipCard function calls i18n.getCurrentLanguage() but this method does not exist in the i18n module. Either add getCurrentLanguage() method to i18n.js or use the existing i18n API to get the current language.`

## Chore Description
The Employment tab in the RIS HR System is broken due to a JavaScript error. The `renderRelationshipCard` function in `apps/js/pages/employment.js` at line 176 attempts to call `i18n.getCurrentLanguage()`, but this method does not exist in the i18n module. The correct method name is `i18n.getLanguage()` (without "Current").

This error prevents the Employment tab from rendering properly, causing the end-to-end smoke test to fail at step 6 when attempting to click the Employment tab.

## Relevant Files
Use these files to complete the chore:

- `apps/js/pages/employment.js` (line 176) - Contains the incorrect method call that needs to be fixed. The `renderRelationshipCard` helper function calls `i18n.getCurrentLanguage()` which should be changed to `i18n.getLanguage()`.

- `apps/js/i18n.js` (line 542-544) - The i18n module that defines the correct method name `getLanguage()`. This file should be reviewed to confirm the correct API but does not need changes.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Fix the method call in employment.js
- Open `apps/js/pages/employment.js`
- Locate line 176 where `i18n.getCurrentLanguage()` is called
- Change `i18n.getCurrentLanguage()` to `i18n.getLanguage()` to match the actual i18n API

### 2. Verify no other incorrect calls exist
- Search the entire `apps/js/pages/employment.js` file for any other instances of `getCurrentLanguage()`
- Confirm that all calls to get the current language use the correct `getLanguage()` method

### 3. Test the fix
- Start the application server: `python -m http.server 8080 -d apps`
- Open the application in a browser at `http://localhost:8080`
- Navigate to an employee profile (e.g., EMP001)
- Click on the Employment tab to verify it loads without JavaScript errors
- Check browser console for any remaining errors
- Verify that job relationships display correctly with proper language handling (test both English and Thai)

## Validation Commands
Execute these commands to validate the chore is complete:

- `grep -n "getCurrentLanguage" apps/js/pages/employment.js` - Should return no results (method should be renamed to getLanguage)
- `grep -n "getLanguage" apps/js/pages/employment.js` - Should show the corrected line 176
- Run the smoke test: Execute the E2E test to verify Employment tab works: `/test_e2e`

## Notes
- The i18n module provides `getLanguage()` method (apps/js/i18n.js:542-544), not `getCurrentLanguage()`
- Other files like `error.js` and `connection-status.js` define their own local `getCurrentLanguage()` helper functions, which is fine
- This is a simple one-line fix to correct the method name from `getCurrentLanguage()` to `getLanguage()`
- The fix will restore functionality to the Employment tab which is currently broken

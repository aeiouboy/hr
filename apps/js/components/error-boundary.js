/**
 * Error Boundary Component
 * Catches uncaught JavaScript errors and unhandled promise rejections
 * Displays user-friendly error UI instead of crashing the application
 */

const ErrorBoundary = (() => {
    'use strict';

    let isInitialized = false;
    let originalContent = null;

    /**
     * Initialize error boundary
     */
    function init() {
        if (isInitialized) {
            console.warn('ErrorBoundary already initialized');
            return;
        }

        // Store original content
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            originalContent = appContainer.innerHTML;
        }

        // Listen to global error events
        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        isInitialized = true;
        console.log('ErrorBoundary initialized');
    }

    /**
     * Handle JavaScript runtime errors
     */
    function handleError(event) {
        // Prevent default browser error handling
        event.preventDefault();

        const error = event.error || new Error(event.message);
        const errorInfo = {
            message: error.message || 'Unknown error',
            stack: error.stack || '',
            filename: event.filename || '',
            lineno: event.lineno || 0,
            colno: event.colno || 0
        };

        logError('JavaScript Error', errorInfo);
        showErrorUI(errorInfo);
    }

    /**
     * Handle unhandled promise rejections
     */
    function handleUnhandledRejection(event) {
        // Prevent default browser error handling
        event.preventDefault();

        const reason = event.reason;
        const errorInfo = {
            message: reason?.message || reason || 'Promise rejection',
            stack: reason?.stack || '',
            type: 'promise'
        };

        logError('Unhandled Promise Rejection', errorInfo);
        showErrorUI(errorInfo);
    }

    /**
     * Log error to console
     */
    function logError(type, errorInfo) {
        console.group(`%c${type}`, 'color: #C8102E; font-weight: bold;');
        console.error('Message:', errorInfo.message);

        if (errorInfo.filename) {
            console.error('File:', errorInfo.filename);
            console.error('Line:', errorInfo.lineno, 'Column:', errorInfo.colno);
        }

        if (errorInfo.stack) {
            console.error('Stack trace:', errorInfo.stack);
        }

        console.groupEnd();
    }

    /**
     * Show error UI to user
     */
    function showErrorUI(errorInfo) {
        // Update AppState with error information
        if (window.AppState) {
            AppState.set('errorType', 'runtime');
            AppState.set('errorMessage', errorInfo.message);
            AppState.set('errorStack', errorInfo.stack);
        }

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            const lang = window.AppState?.get('language') || 'en';
            const translations = window.translations?.[lang] || {};
            const errorMessage = translations.error?.somethingWentWrong || 'An error occurred';

            AccessibilityUtils.announceToScreenReader(errorMessage);
        }

        // Navigate to error page
        if (window.Router) {
            // Prevent infinite loop if we're already on error page
            const currentHash = window.location.hash;
            if (!currentHash.includes('#/error')) {
                Router.navigate('error', {
                    type: 'runtime',
                    message: errorInfo.message,
                    stack: errorInfo.stack,
                    showDetails: isDevelopmentMode()
                });
            }
        } else {
            // Fallback if Router is not available
            renderFallbackErrorUI(errorInfo);
        }
    }

    /**
     * Render fallback error UI when Router is unavailable
     */
    function renderFallbackErrorUI(errorInfo) {
        const appContainer = document.getElementById('app-container');
        if (!appContainer) return;

        const lang = window.AppState?.get('language') || 'en';
        const translations = window.translations?.[lang] || {};
        const errorText = translations.error || {};

        const errorHTML = `
            <div class="error-page">
                <div class="error-content">
                    <div class="error-icon" style="color: #C8102E;">
                        <i class="material-icons">error_outline</i>
                    </div>
                    <h1 class="error-title" tabindex="-1">
                        ${errorText.somethingWentWrong || 'Something went wrong'}
                    </h1>
                    <p class="error-description">
                        ${errorText.errorDescription || 'An unexpected error occurred. Please try again.'}
                    </p>
                    ${isDevelopmentMode() ? `
                        <details class="error-details-section">
                            <summary>Technical Details</summary>
                            <pre>${escapeHtml(errorInfo.message)}</pre>
                            ${errorInfo.stack ? `<pre>${escapeHtml(errorInfo.stack)}</pre>` : ''}
                        </details>
                    ` : ''}
                    <div class="error-actions">
                        <button class="btn btn-primary" onclick="ErrorBoundary.reset()">
                            <i class="material-icons">refresh</i>
                            ${errorText.retryButton || 'Try Again'}
                        </button>
                        <a href="#/home" class="btn btn-secondary">
                            <i class="material-icons">home</i>
                            ${errorText.backToHome || 'Back to Home'}
                        </a>
                    </div>
                </div>
            </div>
        `;

        appContainer.innerHTML = errorHTML;

        // Focus on error title
        setTimeout(() => {
            const errorTitle = document.querySelector('.error-title');
            if (errorTitle) {
                errorTitle.focus();
            }
        }, 100);
    }

    /**
     * Reset error boundary and restore original content
     */
    function reset() {
        // Clear error state
        if (window.AppState) {
            AppState.set('errorType', null);
            AppState.set('errorMessage', null);
            AppState.set('errorStack', null);
        }

        // Navigate to home
        window.location.hash = '#/home';

        console.log('ErrorBoundary reset');
    }

    /**
     * Check if in development mode
     */
    function isDevelopmentMode() {
        // Check if running on localhost or file protocol
        const hostname = window.location.hostname;
        return hostname === 'localhost' ||
               hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Cleanup error boundary (for testing)
     */
    function destroy() {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        isInitialized = false;
        console.log('ErrorBoundary destroyed');
    }

    // Public API
    return {
        init,
        reset,
        destroy,
        handleError,
        handleUnhandledRejection
    };
})();

// Make globally available
window.ErrorBoundary = ErrorBoundary;

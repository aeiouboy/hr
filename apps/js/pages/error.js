/**
 * Error Pages Module
 * Provides render functions for different error types: 404, generic errors, and offline errors
 */

const ErrorPage = (() => {
    'use strict';

    /**
     * Get current language for i18n
     */
    function getCurrentLanguage() {
        return AppState.get('language') || 'en';
    }

    /**
     * Get translated text
     */
    function t(key) {
        const lang = getCurrentLanguage();
        const keys = key.split('.');
        let value = window.translations?.[lang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key;
            }
        }

        return value || key;
    }

    /**
     * Create error page container
     */
    function createErrorContainer(iconName, iconColor, title, description, actions) {
        return `
            <div class="error-page">
                <div class="error-content">
                    <div class="error-icon" style="color: ${iconColor};">
                        <i class="material-icons">${iconName}</i>
                    </div>
                    <h1 class="error-title" tabindex="-1">${title}</h1>
                    <p class="error-description">${description}</p>
                    <div class="error-actions">
                        ${actions}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create retry button
     */
    function createRetryButton() {
        return `
            <button
                class="btn btn-primary"
                onclick="ErrorPage.handleRetry()"
                aria-label="${t('error.retryButton')}"
            >
                <i class="material-icons">refresh</i>
                ${t('error.retryButton')}
            </button>
        `;
    }

    /**
     * Create back to home button
     */
    function createBackToHomeButton() {
        return `
            <a
                href="#/home"
                class="btn btn-secondary"
                aria-label="${t('error.backToHome')}"
            >
                <i class="material-icons">home</i>
                ${t('error.backToHome')}
            </a>
        `;
    }

    /**
     * Create reload button
     */
    function createReloadButton() {
        return `
            <button
                class="btn btn-primary"
                onclick="window.location.reload()"
                aria-label="${t('error.reload')}"
            >
                <i class="material-icons">refresh</i>
                ${t('error.reload')}
            </button>
        `;
    }

    /**
     * Handle retry action
     */
    function handleRetry() {
        // Refresh current route
        const currentHash = window.location.hash || '#/home';
        window.location.hash = '';
        setTimeout(() => {
            window.location.hash = currentHash;
        }, 100);
    }

    /**
     * Render 404 Not Found page
     */
    function render404(params = {}) {
        const requestedPath = params.path || window.location.hash;
        const actions = createRetryButton() + createBackToHomeButton();

        return createErrorContainer(
            'search_off',
            '#6B7280', // Gray color for 404
            t('error.pageNotFound'),
            t('error.pageNotFoundDescription'),
            actions
        );
    }

    /**
     * onEnter lifecycle for 404 page
     */
    function onEnter404(params = {}) {
        const requestedPath = params.path || window.location.hash;
        console.warn('404 Page Not Found:', requestedPath);

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            AccessibilityUtils.announceToScreenReader(
                `${t('error.pageNotFound')}. ${t('error.pageNotFoundDescription')}`
            );
        }

        // Focus on error title
        setTimeout(() => {
            const errorTitle = document.querySelector('.error-title');
            if (errorTitle) {
                errorTitle.focus();
            }
        }, 100);
    }

    /**
     * Render generic error page for runtime errors
     */
    function renderGenericError(params = {}) {
        const errorMessage = params.message || t('error.errorDescription');
        const errorDetails = params.details || '';
        const showDetails = params.showDetails !== false && errorDetails;

        let description = errorMessage;
        if (showDetails) {
            description += `<br><br><small class="error-details">${errorDetails}</small>`;
        }

        const actions = createRetryButton() + createBackToHomeButton();

        return createErrorContainer(
            'error_outline',
            '#C8102E', // CG Red for errors
            t('error.somethingWentWrong'),
            description,
            actions
        );
    }

    /**
     * onEnter lifecycle for generic error page
     */
    function onEnterGenericError(params = {}) {
        const errorMessage = params.message || 'Unknown error';
        const errorStack = params.stack || '';

        console.error('Runtime Error:', errorMessage);
        if (errorStack) {
            console.error('Stack trace:', errorStack);
        }

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            AccessibilityUtils.announceToScreenReader(
                `${t('error.somethingWentWrong')}. ${t('error.errorDescription')}`
            );
        }

        // Focus on error title
        setTimeout(() => {
            const errorTitle = document.querySelector('.error-title');
            if (errorTitle) {
                errorTitle.focus();
            }
        }, 100);
    }

    /**
     * Render offline error page
     */
    function renderOfflineError(params = {}) {
        const actions = createReloadButton() + createBackToHomeButton();

        return createErrorContainer(
            'cloud_off',
            '#F59E0B', // Amber for offline warning
            t('error.offline'),
            t('error.offlineDescription'),
            actions
        );
    }

    /**
     * onEnter lifecycle for offline error page
     */
    function onEnterOfflineError(params = {}) {
        console.warn('Offline Error: No internet connection');

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            AccessibilityUtils.announceToScreenReader(
                `${t('error.offline')}. ${t('error.offlineDescription')}`
            );
        }

        // Focus on error title
        setTimeout(() => {
            const errorTitle = document.querySelector('.error-title');
            if (errorTitle) {
                errorTitle.focus();
            }
        }, 100);

        // Listen for online event to auto-recover
        const onlineHandler = () => {
            console.log('Connection restored, redirecting to home...');
            window.removeEventListener('online', onlineHandler);
            setTimeout(() => {
                window.location.hash = '#/home';
            }, 1000);
        };
        window.addEventListener('online', onlineHandler);
    }

    // Public API
    return {
        render404,
        onEnter404,
        renderGenericError,
        onEnterGenericError,
        renderOfflineError,
        onEnterOfflineError,
        handleRetry
    };
})();

// Make globally available
window.ErrorPage = ErrorPage;

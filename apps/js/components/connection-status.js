/**
 * Connection Status Component
 * Monitors network connectivity and displays online/offline status
 */

const ConnectionStatus = (() => {
    'use strict';

    let isInitialized = false;
    let bannerElement = null;
    let hideTimeout = null;

    /**
     * Get current language for i18n
     */
    function getCurrentLanguage() {
        return window.AppState?.get('language') || 'en';
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
     * Initialize connection status monitoring
     */
    function init() {
        if (isInitialized) {
            console.warn('ConnectionStatus already initialized');
            return;
        }

        // Check initial connection status
        const isOnline = navigator.onLine;
        updateConnectionState(isOnline);

        // Listen to online/offline events
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Create banner element
        createBannerElement();

        isInitialized = true;
        console.log('ConnectionStatus initialized - Currently:', isOnline ? 'Online' : 'Offline');
    }

    /**
     * Create banner element in DOM
     */
    function createBannerElement() {
        // Check if banner container exists
        let container = document.getElementById('connection-status-banner');

        if (!container) {
            // Create container if it doesn't exist
            container = document.createElement('div');
            container.id = 'connection-status-banner';
            container.setAttribute('role', 'status');
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');

            // Insert at the beginning of body
            document.body.insertBefore(container, document.body.firstChild);
        }

        bannerElement = container;
    }

    /**
     * Handle online event
     */
    function handleOnline() {
        console.log('Connection restored');

        // Update AppState
        updateConnectionState(true);

        // Show success toast
        if (window.ToastComponent) {
            ToastComponent.show(t('error.connectionRestored'), 'success');
        }

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            AccessibilityUtils.announceToScreenReader(t('error.connectionRestored'));
        }

        // Hide offline banner with delay
        hideTimeout = setTimeout(() => {
            hideBanner();
        }, 3000);
    }

    /**
     * Handle offline event
     */
    function handleOffline() {
        console.warn('Connection lost');

        // Clear any pending hide timeout
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        // Update AppState
        updateConnectionState(false);

        // Show error toast
        if (window.ToastComponent) {
            ToastComponent.show(t('error.connectionLost'), 'error');
        }

        // Announce to screen readers
        if (window.AccessibilityUtils) {
            AccessibilityUtils.announceToScreenReader(t('error.connectionLost'));
        }

        // Show offline banner
        showBanner();
    }

    /**
     * Update connection state in AppState
     */
    function updateConnectionState(isOnline) {
        if (window.AppState) {
            AppState.set('isOnline', isOnline);
        }
    }

    /**
     * Show offline banner
     */
    function showBanner() {
        if (!bannerElement) return;

        const bannerHTML = `
            <div class="connection-banner offline">
                <div class="connection-banner-content">
                    <i class="material-icons connection-banner-icon">cloud_off</i>
                    <span class="connection-banner-text">${t('error.offlineDescription')}</span>
                </div>
            </div>
        `;

        bannerElement.innerHTML = bannerHTML;
        bannerElement.style.display = 'block';

        // Trigger animation
        setTimeout(() => {
            const banner = bannerElement.querySelector('.connection-banner');
            if (banner) {
                banner.classList.add('show');
            }
        }, 10);
    }

    /**
     * Hide offline banner
     */
    function hideBanner() {
        if (!bannerElement) return;

        const banner = bannerElement.querySelector('.connection-banner');
        if (banner) {
            banner.classList.remove('show');
            banner.classList.add('hide');

            // Remove from DOM after animation
            setTimeout(() => {
                bannerElement.innerHTML = '';
                bannerElement.style.display = 'none';
            }, 300);
        } else {
            bannerElement.innerHTML = '';
            bannerElement.style.display = 'none';
        }
    }

    /**
     * Get current connection status
     */
    function isOnline() {
        return navigator.onLine;
    }

    /**
     * Manually check and update connection status
     */
    function checkStatus() {
        const online = navigator.onLine;
        updateConnectionState(online);
        return online;
    }

    /**
     * Cleanup (for testing)
     */
    function destroy() {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);

        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }

        if (bannerElement) {
            bannerElement.innerHTML = '';
            bannerElement.style.display = 'none';
        }

        isInitialized = false;
        console.log('ConnectionStatus destroyed');
    }

    // Public API
    return {
        init,
        isOnline,
        checkStatus,
        destroy
    };
})();

// Make globally available
window.ConnectionStatus = ConnectionStatus;

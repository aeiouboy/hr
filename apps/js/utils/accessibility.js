/**
 * Accessibility Utilities
 * Helper functions for managing focus, keyboard traps, and screen reader announcements
 * Supports WCAG 2.1 AA compliance
 */

const AccessibilityUtils = (function() {
    'use strict';

    // Store the previously focused element for focus restoration
    let previousFocusedElement = null;

    // Store the current focus trap configuration
    let currentTrap = null;

    // Focusable element selectors
    const FOCUSABLE_SELECTORS = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
    ].join(', ');

    /**
     * Get all focusable elements within a container
     * @param {HTMLElement} container - The container element to search within
     * @returns {Array<HTMLElement>} Array of focusable elements
     */
    function getFocusableElements(container) {
        if (!container) return [];

        const elements = Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS));

        // Filter out elements that are not visible
        return elements.filter(el => {
            return el.offsetWidth > 0 &&
                   el.offsetHeight > 0 &&
                   !el.hasAttribute('aria-hidden');
        });
    }

    /**
     * Trap keyboard focus within a specific element (for modals and menus)
     * @param {HTMLElement} element - The element to trap focus within
     * @param {Object} options - Configuration options
     * @param {boolean} options.allowEscape - Allow ESC key to release trap (default: true)
     * @param {Function} options.onEscape - Callback when ESC is pressed
     * @returns {Object} Trap control object with release() method
     */
    function trapFocus(element, options = {}) {
        if (!element) {
            console.warn('AccessibilityUtils.trapFocus: No element provided');
            return { release: () => {} };
        }

        const {
            allowEscape = true,
            onEscape = null
        } = options;

        // Store the element that had focus before trapping
        previousFocusedElement = document.activeElement;

        // Get all focusable elements within the trap
        const focusableElements = getFocusableElements(element);

        if (focusableElements.length === 0) {
            console.warn('AccessibilityUtils.trapFocus: No focusable elements found in container');
            return { release: () => {} };
        }

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // Focus the first element
        setTimeout(() => firstFocusable.focus(), 10);

        // Handle Tab key to cycle focus
        function handleTab(e) {
            // Handle ESC key
            if (allowEscape && e.key === 'Escape') {
                if (typeof onEscape === 'function') {
                    onEscape();
                }
                releaseFocus();
                return;
            }

            // Handle Tab key
            if (e.key !== 'Tab') return;

            // Update focusable elements (in case they changed)
            const currentFocusable = getFocusableElements(element);
            if (currentFocusable.length === 0) return;

            const first = currentFocusable[0];
            const last = currentFocusable[currentFocusable.length - 1];

            // Shift + Tab (backward)
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
            // Tab (forward)
            else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        // Add event listener
        element.addEventListener('keydown', handleTab);

        // Store current trap configuration
        currentTrap = {
            element,
            handleTab,
            previousFocus: previousFocusedElement
        };

        return {
            release: releaseFocus
        };
    }

    /**
     * Release focus trap and restore focus to previous element
     */
    function releaseFocus() {
        if (!currentTrap) return;

        // Remove event listener
        currentTrap.element.removeEventListener('keydown', currentTrap.handleTab);

        // Restore focus to previous element
        if (currentTrap.previousFocus && typeof currentTrap.previousFocus.focus === 'function') {
            setTimeout(() => {
                try {
                    currentTrap.previousFocus.focus();
                } catch (e) {
                    // Element might no longer exist or be focusable
                    console.warn('Could not restore focus to previous element');
                }
            }, 10);
        }

        // Clear trap
        currentTrap = null;
        previousFocusedElement = null;
    }

    /**
     * Announce a message to screen readers via ARIA live region
     * @param {string} message - The message to announce
     * @param {string} priority - 'polite' or 'assertive' (default: 'polite')
     */
    function announceToScreenReader(message, priority = 'polite') {
        if (!message) return;

        const liveRegionId = priority === 'assertive' ? 'aria-alerts' : 'aria-announcements';
        const liveRegion = document.getElementById(liveRegionId);

        if (!liveRegion) {
            console.warn(`AccessibilityUtils.announceToScreenReader: Live region #${liveRegionId} not found`);
            return;
        }

        // Clear the live region
        liveRegion.textContent = '';

        // Set the new message after a brief delay to ensure screen readers pick it up
        setTimeout(() => {
            liveRegion.textContent = message;
        }, 100);

        // Clear the message after it's been announced (to allow the same message to be announced again)
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 2000);
    }

    /**
     * Ensure logical tab order throughout the application
     * Removes any tabindex > 0 values which disrupt natural flow
     */
    function manageFocusOrder() {
        const elementsWithTabIndex = document.querySelectorAll('[tabindex]');

        elementsWithTabIndex.forEach(element => {
            const tabIndex = parseInt(element.getAttribute('tabindex'), 10);

            // Remove any positive tabindex values (anti-pattern)
            if (tabIndex > 0) {
                console.warn('Removing positive tabindex from element:', element);
                element.setAttribute('tabindex', '0');
            }
        });
    }

    /**
     * Check if an element is visible and focusable
     * @param {HTMLElement} element - Element to check
     * @returns {boolean} True if element is visible and focusable
     */
    function isElementFocusable(element) {
        if (!element) return false;

        // Check if element is visible
        const isVisible = element.offsetWidth > 0 &&
                         element.offsetHeight > 0 &&
                         !element.hasAttribute('aria-hidden');

        if (!isVisible) return false;

        // Check if element is focusable
        const isFocusable = element.matches(FOCUSABLE_SELECTORS);

        return isFocusable;
    }

    /**
     * Move focus to a specific element
     * @param {HTMLElement|string} target - Element or selector to focus
     * @param {Object} options - Configuration options
     * @param {boolean} options.preventScroll - Prevent scrolling to element (default: false)
     * @returns {boolean} True if focus was successful
     */
    function moveFocusTo(target, options = {}) {
        const { preventScroll = false } = options;

        let element = target;
        if (typeof target === 'string') {
            element = document.querySelector(target);
        }

        if (!element || !isElementFocusable(element)) {
            console.warn('AccessibilityUtils.moveFocusTo: Target element not found or not focusable', target);
            return false;
        }

        try {
            element.focus({ preventScroll });
            return document.activeElement === element;
        } catch (e) {
            console.error('AccessibilityUtils.moveFocusTo: Error focusing element', e);
            return false;
        }
    }

    /**
     * Create an accessible loading announcement
     * @param {boolean} isLoading - Whether content is loading
     * @param {string} customMessage - Custom message (optional)
     */
    function announceLoadingState(isLoading, customMessage = null) {
        const i18n = window.I18n;
        if (!i18n) return;

        if (isLoading) {
            const message = customMessage || i18n.t('accessibility.loading');
            announceToScreenReader(message, 'polite');
        } else {
            const message = customMessage || i18n.t('accessibility.dataLoaded');
            announceToScreenReader(message, 'polite');
        }
    }

    /**
     * Announce a page navigation to screen readers
     * @param {string} pageName - Name of the page navigated to
     */
    function announcePageChange(pageName) {
        const i18n = window.I18n;
        if (!i18n || !pageName) return;

        const message = i18n.t('accessibility.pageChanged', { page: pageName });
        announceToScreenReader(message, 'polite');
    }

    /**
     * Set aria-busy attribute and announce loading state
     * @param {HTMLElement|string} target - Element or selector
     * @param {boolean} isBusy - Whether element is busy
     */
    function setAriaBusy(target, isBusy) {
        let element = target;
        if (typeof target === 'string') {
            element = document.querySelector(target);
        }

        if (!element) return;

        if (isBusy) {
            element.setAttribute('aria-busy', 'true');
        } else {
            element.removeAttribute('aria-busy');
        }
    }

    // Public API
    return {
        trapFocus,
        releaseFocus,
        getFocusableElements,
        announceToScreenReader,
        manageFocusOrder,
        isElementFocusable,
        moveFocusTo,
        announceLoadingState,
        announcePageChange,
        setAriaBusy
    };
})();

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.AccessibilityUtils = AccessibilityUtils;
}

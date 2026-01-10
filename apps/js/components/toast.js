/**
 * Toast Component
 * Success/error toast notifications
 */

const ToastComponent = (function() {
    const TOAST_DURATION = 5000;

    function createToast(message, type = 'info', duration = TOAST_DURATION) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        const id = `toast_${Date.now()}`;
        toast.id = id;

        const icons = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        const colors = {
            success: 'bg-cg-success',
            error: 'bg-cg-error',
            warning: 'bg-cg-warning text-gray-900',
            info: 'bg-cg-info'
        };

        // Use assertive for errors, polite for others
        const ariaLive = type === 'error' ? 'assertive' : 'polite';
        const role = type === 'error' ? 'alert' : 'status';

        toast.className = `
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white
            ${colors[type] || colors.info}
            toast-enter
        `;
        toast.setAttribute('role', role);
        toast.setAttribute('aria-live', ariaLive);
        toast.setAttribute('aria-atomic', 'true');

        // Get close button label
        const closeLabel = window.I18n ? window.I18n.t('common.close') : 'Close';

        // Get type label for screen readers
        const typeLabels = {
            success: window.I18n ? window.I18n.t('accessibility.successAlert') : 'Success',
            error: window.I18n ? window.I18n.t('accessibility.errorAlert') : 'Error',
            warning: window.I18n ? window.I18n.t('accessibility.warningAlert') : 'Warning',
            info: window.I18n ? window.I18n.t('accessibility.infoAlert') : 'Information'
        };

        const typeLabel = typeLabels[type] || typeLabels.info;

        toast.innerHTML = `
            <span class="material-icons" aria-hidden="true">${icons[type] || icons.info}</span>
            <span class="flex-1">
                <span class="sr-only">${typeLabel}: </span>${message}
            </span>
            <button class="p-1 hover:bg-white/20 rounded transition" onclick="ToastComponent.dismiss('${id}')" aria-label="${closeLabel}">
                <span class="material-icons text-sm" aria-hidden="true">close</span>
            </button>
        `;

        container.appendChild(toast);

        // Auto dismiss
        setTimeout(() => {
            this.dismiss(id);
        }, duration);

        return id;
    }

    return {
        /**
         * Show success toast
         * @param {string} message
         * @param {number} duration
         */
        success(message, duration) {
            return createToast.call(this, message, 'success', duration);
        },

        /**
         * Show error toast
         * @param {string} message
         * @param {number} duration
         */
        error(message, duration) {
            return createToast.call(this, message, 'error', duration);
        },

        /**
         * Show warning toast
         * @param {string} message
         * @param {number} duration
         */
        warning(message, duration) {
            return createToast.call(this, message, 'warning', duration);
        },

        /**
         * Show info toast
         * @param {string} message
         * @param {number} duration
         */
        info(message, duration) {
            return createToast.call(this, message, 'info', duration);
        },

        /**
         * Dismiss a toast by ID
         * @param {string} id
         */
        dismiss(id) {
            const toast = document.getElementById(id);
            if (toast) {
                toast.classList.remove('toast-enter');
                toast.classList.add('toast-exit');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }
        },

        /**
         * Dismiss all toasts
         */
        dismissAll() {
            const container = document.getElementById('toast-container');
            if (container) {
                container.innerHTML = '';
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ToastComponent;
}

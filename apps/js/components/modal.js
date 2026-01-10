/**
 * Modal Component
 * Modal dialog with backdrop, close on escape
 */

const ModalComponent = (function() {
    let activeModals = [];
    let focusTraps = new Map(); // Store focus traps for each modal

    function createBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-black/50 z-40 modal-backdrop';
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                ModalComponent.close();
            }
        });
        return backdrop;
    }

    return {
        /**
         * Open a modal
         * @param {object} options - Modal options
         * @param {string} options.title - Modal title
         * @param {string} options.content - Modal content HTML
         * @param {string} options.size - Modal size (sm, md, lg, xl, full)
         * @param {boolean} options.closeOnBackdrop - Close when clicking backdrop
         * @param {function} options.onClose - Callback when modal closes
         * @param {array} options.actions - Footer action buttons
         * @returns {string} Modal ID
         */
        open(options) {
            const {
                title = '',
                content = '',
                size = 'md',
                closeOnBackdrop = true,
                onClose = null,
                actions = [],
                showHeader = true,
                showFooter = true
            } = options;

            const container = document.getElementById('modal-container');
            if (!container) return null;

            const id = `modal_${Date.now()}`;

            const sizeClasses = {
                sm: 'max-w-sm',
                md: 'max-w-lg',
                lg: 'max-w-2xl',
                xl: 'max-w-4xl',
                full: 'max-w-full mx-4'
            };

            const modalWrapper = document.createElement('div');
            modalWrapper.id = id;
            modalWrapper.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';

            const closeButtonLabel = window.I18n ? window.I18n.t('accessibility.closeModal') : 'Close dialog';

            modalWrapper.innerHTML = `
                <div class="fixed inset-0 bg-black/50 modal-backdrop" ${closeOnBackdrop ? 'onclick="ModalComponent.close()"' : ''}></div>
                <div class="relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] flex flex-col modal-content"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="${id}-title"
                     ${content ? `aria-describedby="${id}-content"` : ''}>
                    ${showHeader ? `
                    <div class="flex items-center justify-between px-6 py-4 border-b">
                        <h2 id="${id}-title" class="text-lg font-semibold text-gray-900">${title}</h2>
                        <button type="button" class="p-2 hover:bg-gray-100 rounded-full transition" onclick="ModalComponent.close()" aria-label="${closeButtonLabel}">
                            <span class="material-icons text-gray-500" aria-hidden="true">close</span>
                        </button>
                    </div>
                    ` : ''}
                    <div id="${id}-content" class="flex-1 overflow-y-auto px-6 py-4">
                        ${content}
                    </div>
                    ${showFooter && actions.length > 0 ? `
                    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-lg">
                        ${actions.map(action => `
                            <button type="button"
                                class="${action.primary ? 'px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition' : 'px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition'}"
                                onclick="${action.onclick || ''}"
                                ${action.disabled ? 'disabled' : ''}
                                ${action.ariaLabel ? `aria-label="${action.ariaLabel}"` : ''}>
                                ${action.label}
                            </button>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            `;

            container.appendChild(modalWrapper);

            // Store modal info
            activeModals.push({ id, onClose });
            AppState.pushModal({ id });

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Setup focus trap and keyboard handling
            setTimeout(() => {
                const modalContent = modalWrapper.querySelector('.modal-content');

                if (modalContent && window.AccessibilityUtils) {
                    // Trap focus within modal
                    const trap = window.AccessibilityUtils.trapFocus(modalContent, {
                        allowEscape: true,
                        onEscape: () => {
                            ModalComponent.close();
                        }
                    });

                    // Store the trap
                    focusTraps.set(id, trap);

                    // Announce modal opened to screen readers
                    if (title) {
                        window.AccessibilityUtils.announceToScreenReader(
                            `${title}. ${window.I18n ? window.I18n.t('accessibility.modalOpened') : 'Dialog opened'}`,
                            'polite'
                        );
                    }
                }
            }, 100);

            return id;
        },

        /**
         * Open a confirmation modal
         * @param {object} options
         * @returns {Promise<boolean>}
         */
        confirm(options) {
            return new Promise((resolve) => {
                const {
                    title = i18n.t('common.confirm'),
                    message = '',
                    confirmText = i18n.t('common.confirm'),
                    cancelText = i18n.t('common.cancel'),
                    confirmClass = 'bg-cg-red',
                    icon = 'help_outline'
                } = options;

                const id = this.open({
                    title,
                    size: 'sm',
                    content: `
                        <div class="text-center py-4">
                            <span class="material-icons text-5xl text-gray-400 mb-4">${icon}</span>
                            <p class="text-gray-600">${message}</p>
                        </div>
                    `,
                    actions: [
                        {
                            label: cancelText,
                            onclick: `ModalComponent.close(); window.__modalResolve && window.__modalResolve(false);`
                        },
                        {
                            label: confirmText,
                            primary: true,
                            onclick: `ModalComponent.close(); window.__modalResolve && window.__modalResolve(true);`
                        }
                    ]
                });

                window.__modalResolve = resolve;
            });
        },

        /**
         * Open an alert modal
         * @param {string} message
         * @param {string} title
         */
        alert(message, title = i18n.t('common.info')) {
            return this.open({
                title,
                size: 'sm',
                content: `<p class="text-gray-600">${message}</p>`,
                actions: [
                    {
                        label: i18n.t('common.close'),
                        primary: true,
                        onclick: 'ModalComponent.close()'
                    }
                ]
            });
        },

        /**
         * Close the most recent modal
         */
        close() {
            const modalInfo = activeModals.pop();
            if (!modalInfo) return;

            // Release focus trap
            const trap = focusTraps.get(modalInfo.id);
            if (trap && trap.release) {
                trap.release();
                focusTraps.delete(modalInfo.id);
            } else if (window.AccessibilityUtils) {
                // Fallback: use global releaseFocus
                window.AccessibilityUtils.releaseFocus();
            }

            const modal = document.getElementById(modalInfo.id);
            if (modal) {
                modal.remove();
            }

            AppState.popModal();

            // Restore body scroll if no more modals
            if (activeModals.length === 0) {
                document.body.style.overflow = '';
            }

            // Announce modal closed to screen readers
            if (window.AccessibilityUtils && window.I18n) {
                window.AccessibilityUtils.announceToScreenReader(
                    window.I18n.t('accessibility.modalClosed'),
                    'polite'
                );
            }

            // Call onClose callback
            if (modalInfo.onClose) {
                modalInfo.onClose();
            }
        },

        /**
         * Close a specific modal by ID
         * @param {string} id
         */
        closeById(id) {
            const index = activeModals.findIndex(m => m.id === id);
            if (index === -1) return;

            const modalInfo = activeModals.splice(index, 1)[0];

            // Release focus trap
            const trap = focusTraps.get(id);
            if (trap && trap.release) {
                trap.release();
                focusTraps.delete(id);
            } else if (window.AccessibilityUtils) {
                window.AccessibilityUtils.releaseFocus();
            }

            const modal = document.getElementById(id);
            if (modal) {
                modal.remove();
            }

            AppState.popModal();

            if (activeModals.length === 0) {
                document.body.style.overflow = '';
            }

            // Announce modal closed
            if (window.AccessibilityUtils && window.I18n) {
                window.AccessibilityUtils.announceToScreenReader(
                    window.I18n.t('accessibility.modalClosed'),
                    'polite'
                );
            }

            if (modalInfo.onClose) {
                modalInfo.onClose();
            }
        },

        /**
         * Close all modals
         */
        closeAll() {
            while (activeModals.length > 0) {
                this.close();
            }
        },

        /**
         * Update modal content
         * @param {string} id
         * @param {string} content
         */
        updateContent(id, content) {
            const modal = document.getElementById(id);
            if (modal) {
                const contentDiv = modal.querySelector('.overflow-y-auto');
                if (contentDiv) {
                    contentDiv.innerHTML = content;
                }
            }
        },

        /**
         * Check if any modal is open
         * @returns {boolean}
         */
        isOpen() {
            return activeModals.length > 0;
        },

        /**
         * Get current modal ID
         * @returns {string|null}
         */
        getCurrentId() {
            return activeModals.length > 0 ? activeModals[activeModals.length - 1].id : null;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalComponent;
}

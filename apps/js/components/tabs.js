/**
 * Tabs Component
 * Tab navigation for profile sections
 */

const TabsComponent = (function() {
    return {
        /**
         * Render tabs
         * @param {object} options
         * @returns {string}
         */
        render(options) {
            const {
                id = 'tabs',
                tabs = [],
                activeTab = '',
                onChange = ''
            } = options;

            return `
                <div id="${id}" class="border-b border-gray-200 bg-white sticky top-14 z-30">
                    <nav class="flex overflow-x-auto scrollbar-hide" role="tablist" aria-label="Profile tabs">
                        ${tabs.map(tab => `
                            <button type="button"
                                    role="tab"
                                    id="tab-${tab.id}"
                                    aria-selected="${tab.id === activeTab}"
                                    aria-controls="panel-${tab.id}"
                                    class="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition
                                           ${tab.id === activeTab
                                               ? 'border-cg-red text-cg-red'
                                               : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                                    onclick="${onChange ? onChange.replace('{tab}', tab.id) : `TabsComponent.setActive('${id}', '${tab.id}')`}">
                                ${tab.icon ? `<span class="material-icons text-sm mr-1 align-text-bottom">${tab.icon}</span>` : ''}
                                ${tab.label}
                                ${tab.badge ? `<span class="ml-1 px-1.5 py-0.5 text-xs rounded-full ${tab.badgeColor || 'bg-gray-200 text-gray-600'}">${tab.badge}</span>` : ''}
                            </button>
                        `).join('')}
                    </nav>
                </div>
            `;
        },

        /**
         * Set active tab
         * @param {string} tabsId
         * @param {string} tabId
         */
        setActive(tabsId, tabId) {
            const container = document.getElementById(tabsId);
            if (!container) return;

            // Update tab buttons
            container.querySelectorAll('[role="tab"]').forEach(btn => {
                const isActive = btn.id === `tab-${tabId}`;
                btn.setAttribute('aria-selected', isActive);
                btn.classList.toggle('border-cg-red', isActive);
                btn.classList.toggle('text-cg-red', isActive);
                btn.classList.toggle('border-transparent', !isActive);
                btn.classList.toggle('text-gray-500', !isActive);
            });

            // Update state
            AppState.set('activeTab', tabId);
        },

        /**
         * Get active tab
         * @param {string} tabsId
         * @returns {string}
         */
        getActive(tabsId) {
            const container = document.getElementById(tabsId);
            if (!container) return null;

            const activeBtn = container.querySelector('[aria-selected="true"]');
            if (activeBtn) {
                return activeBtn.id.replace('tab-', '');
            }
            return null;
        },

        /**
         * Render tab panel wrapper
         * @param {string} tabId
         * @param {string} content
         * @param {boolean} active
         * @returns {string}
         */
        panel(tabId, content, active = false) {
            return `
                <div id="panel-${tabId}"
                     role="tabpanel"
                     aria-labelledby="tab-${tabId}"
                     class="${active ? '' : 'hidden'}">
                    ${content}
                </div>
            `;
        },

        /**
         * Show specific tab panel
         * @param {string} tabId
         */
        showPanel(tabId) {
            // Hide all panels
            document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
                panel.classList.add('hidden');
            });

            // Show target panel
            const panel = document.getElementById(`panel-${tabId}`);
            if (panel) {
                panel.classList.remove('hidden');
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TabsComponent;
}

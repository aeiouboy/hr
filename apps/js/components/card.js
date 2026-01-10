/**
 * Card Component
 * Section card with title, edit button, history button
 */

const CardComponent = (function() {
    return {
        /**
         * Render a card component
         * @param {object} options
         * @returns {string} HTML string
         */
        render(options) {
            const {
                id = '',
                title = '',
                subtitle = '',
                icon = '',
                content = '',
                editable = false,
                onEdit = '',
                showHistory = false,
                onHistory = '',
                effectiveDate = '',
                collapsed = false,
                collapsible = false,
                actions = [],
                className = ''
            } = options;

            const cardId = id || `card_${Date.now()}`;

            return `
                <div id="${cardId}" class="bg-white rounded-lg shadow-sm border border-gray-200 ${className}">
                    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div class="flex items-center gap-3">
                            ${icon ? `<span class="material-icons text-gray-500">${icon}</span>` : ''}
                            <div>
                                <h3 class="font-medium text-gray-900">${title}</h3>
                                ${subtitle ? `<p class="text-sm text-gray-500">${subtitle}</p>` : ''}
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            ${effectiveDate ? `
                                <span class="text-xs text-gray-500">
                                    ${i18n.t('common.effectiveDate')}: ${DateUtils.format(effectiveDate, 'medium')}
                                </span>
                            ` : ''}
                            ${showHistory ? `
                                <button type="button"
                                    class="p-2 hover:bg-gray-100 rounded-full transition"
                                    onclick="${onHistory}"
                                    aria-label="${i18n.t('common.history')}"
                                    title="${i18n.t('common.history')}">
                                    <span class="material-icons text-gray-500 text-sm">history</span>
                                </button>
                            ` : ''}
                            ${editable ? `
                                <button type="button"
                                    class="p-2 hover:bg-gray-100 rounded-full transition"
                                    onclick="${onEdit}"
                                    aria-label="${i18n.t('common.edit')}"
                                    title="${i18n.t('common.edit')}">
                                    <span class="material-icons text-gray-500 text-sm">edit</span>
                                </button>
                            ` : ''}
                            ${actions.map(action => `
                                <button type="button"
                                    class="p-2 hover:bg-gray-100 rounded-full transition"
                                    onclick="${action.onclick || ''}"
                                    aria-label="${action.label}"
                                    title="${action.label}">
                                    <span class="material-icons text-gray-500 text-sm">${action.icon}</span>
                                </button>
                            `).join('')}
                            ${collapsible ? `
                                <button type="button"
                                    class="p-2 hover:bg-gray-100 rounded-full transition min-h-[44px] min-w-[44px]"
                                    onclick="CardComponent.toggle('${cardId}')"
                                    aria-expanded="${!collapsed}"
                                    aria-controls="${cardId}-content"
                                    aria-label="${collapsed ? i18n.t('accessibility.expandSection') : i18n.t('accessibility.collapseSection')}"
                                    id="${cardId}-toggle">
                                    <span class="material-icons text-gray-500 text-sm transition-transform ${collapsed ? '' : 'rotate-180'}" id="${cardId}-chevron" aria-hidden="true">expand_more</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <div id="${cardId}-content" class="p-4 ${collapsed ? 'hidden' : ''}">
                        ${content}
                    </div>
                </div>
            `;
        },

        /**
         * Render a data row (label-value pair)
         * @param {string} label
         * @param {string} value
         * @param {object} options
         * @returns {string}
         */
        dataRow(label, value, options = {}) {
            const { colspan = false, masked = false, icon = '' } = options;

            const displayValue = value || '-';

            return `
                <div class="${colspan ? 'col-span-2' : ''}">
                    <dt class="text-sm text-gray-500">${label}</dt>
                    <dd class="mt-1 text-sm text-gray-900 flex items-center gap-1">
                        ${icon ? `<span class="material-icons text-sm text-gray-400">${icon}</span>` : ''}
                        ${masked ? `<span class="font-mono">${displayValue}</span>` : displayValue}
                    </dd>
                </div>
            `;
        },

        /**
         * Render a data grid (multiple label-value pairs)
         * @param {array} items - Array of {label, value, options}
         * @param {number} columns - Number of columns (default 2)
         * @returns {string}
         */
        dataGrid(items, columns = 2) {
            return `
                <dl class="grid grid-cols-1 md:grid-cols-${columns} gap-4">
                    ${items.map(item => this.dataRow(item.label, item.value, item.options || {})).join('')}
                </dl>
            `;
        },

        /**
         * Toggle card collapse state
         * @param {string} cardId
         */
        toggle(cardId) {
            const content = document.getElementById(`${cardId}-content`);
            const chevron = document.getElementById(`${cardId}-chevron`);
            const button = document.getElementById(`${cardId}-toggle`);

            if (content && chevron) {
                const isHidden = content.classList.contains('hidden');
                content.classList.toggle('hidden');
                chevron.classList.toggle('rotate-180');

                if (button) {
                    button.setAttribute('aria-expanded', isHidden);
                    button.setAttribute('aria-label', isHidden
                        ? i18n.t('accessibility.collapseSection')
                        : i18n.t('accessibility.expandSection')
                    );
                }
            }
        },

        /**
         * Render an empty state
         * @param {string} message
         * @param {string} icon
         * @returns {string}
         */
        emptyState(message, icon = 'inbox') {
            return `
                <div class="flex flex-col items-center justify-center py-8 text-gray-400">
                    <span class="material-icons text-4xl mb-2">${icon}</span>
                    <p class="text-sm">${message}</p>
                </div>
            `;
        },

        /**
         * Render a list item (for emergency contacts, dependents, etc.)
         * @param {object} options
         * @returns {string}
         */
        listItem(options) {
            const {
                id = '',
                title = '',
                subtitle = '',
                badge = '',
                badgeColor = 'bg-blue-100 text-blue-800',
                onEdit = '',
                onDelete = '',
                content = ''
            } = options;

            return `
                <div class="flex items-start justify-between p-4 border-b border-gray-100 last:border-b-0">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-medium text-gray-900">${title}</span>
                            ${badge ? `<span class="px-2 py-0.5 text-xs rounded-full ${badgeColor}">${badge}</span>` : ''}
                        </div>
                        ${subtitle ? `<p class="text-sm text-gray-500 mt-0.5">${subtitle}</p>` : ''}
                        ${content ? `<div class="mt-2">${content}</div>` : ''}
                    </div>
                    <div class="flex items-center gap-1 ml-4">
                        ${onEdit ? `
                            <button type="button"
                                class="p-1.5 hover:bg-gray-100 rounded-full transition"
                                onclick="${onEdit}"
                                aria-label="${i18n.t('common.edit')}">
                                <span class="material-icons text-gray-500 text-sm">edit</span>
                            </button>
                        ` : ''}
                        ${onDelete ? `
                            <button type="button"
                                class="p-1.5 hover:bg-red-50 rounded-full transition"
                                onclick="${onDelete}"
                                aria-label="${i18n.t('common.delete')}">
                                <span class="material-icons text-red-500 text-sm">delete</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render a "Show More" button
         * @param {string} onclick
         * @param {boolean} expanded
         * @returns {string}
         */
        showMoreButton(onclick, expanded = false) {
            return `
                <button type="button"
                    class="w-full py-2 text-sm text-cg-info hover:text-blue-700 flex items-center justify-center gap-1 transition"
                    onclick="${onclick}">
                    <span>${expanded ? i18n.t('common.showLess') : i18n.t('common.showMore')}</span>
                    <span class="material-icons text-sm ${expanded ? 'rotate-180' : ''}"">expand_more</span>
                </button>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardComponent;
}

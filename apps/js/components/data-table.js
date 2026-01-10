/**
 * Data Table Component
 * Sortable, paginated table for displaying lists
 */

const DataTableComponent = (function() {
    // Store table instances for sorting/pagination state
    const tableInstances = new Map();

    return {
        /**
         * Render a data table
         * @param {object} options
         * @returns {string}
         */
        render(options) {
            const {
                id,
                columns = [],
                data = [],
                sortable = true,
                paginated = true,
                pageSize = 10,
                emptyMessage = '',
                actions = [],
                selectable = false,
                className = ''
            } = options;

            const tableId = id || `table_${Date.now()}`;

            // Store instance data
            tableInstances.set(tableId, {
                columns,
                data,
                sortable,
                paginated,
                pageSize,
                currentPage: 1,
                sortColumn: null,
                sortDirection: 'asc',
                selectedRows: new Set()
            });

            if (data.length === 0) {
                return `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 ${className}">
                        ${CardComponent.emptyState(emptyMessage || i18n.t('common.noData'))}
                    </div>
                `;
            }

            return `
                <div id="${tableId}" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${options.ariaLabel || i18n.t('accessibility.dataTable')}">
                            <thead class="bg-gray-50">
                                <tr role="row">
                                    ${selectable ? `
                                        <th scope="col" class="px-4 py-3 w-10">
                                            <input type="checkbox"
                                                   class="w-4 h-4 text-cg-red border-gray-300 rounded"
                                                   aria-label="${i18n.t('accessibility.selectAll')}"
                                                   onchange="DataTableComponent.toggleSelectAll('${tableId}', this.checked)">
                                        </th>
                                    ` : ''}
                                    ${columns.map(col => `
                                        <th scope="col"
                                            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                                   ${sortable && col.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''}"
                                            ${sortable && col.sortable !== false ? `
                                                role="button"
                                                tabindex="0"
                                                aria-sort="none"
                                                aria-label="${col.label}, ${i18n.t('accessibility.sortable')}"
                                                onclick="DataTableComponent.sort('${tableId}', '${col.key}')"
                                                onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); DataTableComponent.sort('${tableId}', '${col.key}'); }"
                                            ` : `aria-label="${col.label}"`}
                                            id="${tableId}-header-${col.key}">
                                            <div class="flex items-center gap-1">
                                                <span>${col.label}</span>
                                                ${sortable && col.sortable !== false ? `
                                                    <span class="material-icons text-sm text-gray-400" id="${tableId}-sort-${col.key}" aria-hidden="true">unfold_more</span>
                                                ` : ''}
                                            </div>
                                        </th>
                                    `).join('')}
                                    ${actions.length > 0 ? `
                                        <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ${i18n.t('common.actions')}
                                        </th>
                                    ` : ''}
                                </tr>
                            </thead>
                            <tbody id="${tableId}-body" class="bg-white divide-y divide-gray-200">
                                ${this.renderRows(tableId)}
                            </tbody>
                        </table>
                    </div>
                    ${paginated && data.length > pageSize ? this.renderPagination(tableId) : ''}
                </div>
            `;
        },

        /**
         * Render table rows
         * @param {string} tableId
         * @returns {string}
         */
        renderRows(tableId) {
            const instance = tableInstances.get(tableId);
            if (!instance) return '';

            let { data, columns, pageSize, currentPage, sortColumn, sortDirection, selectedRows } = instance;

            // Sort data if needed
            if (sortColumn) {
                data = [...data].sort((a, b) => {
                    let aVal = a[sortColumn];
                    let bVal = b[sortColumn];

                    // Handle null/undefined
                    if (aVal == null) aVal = '';
                    if (bVal == null) bVal = '';

                    // String comparison
                    if (typeof aVal === 'string') {
                        return sortDirection === 'asc'
                            ? aVal.localeCompare(bVal)
                            : bVal.localeCompare(aVal);
                    }

                    // Number comparison
                    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
                });
            }

            // Paginate
            const start = (currentPage - 1) * pageSize;
            const pageData = data.slice(start, start + pageSize);

            return pageData.map((row, index) => {
                const rowId = row.id || `row_${start + index}`;
                const isSelected = selectedRows.has(rowId);

                return `
                    <tr class="${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} transition">
                        ${instance.selectable ? `
                            <td class="px-4 py-3 w-10">
                                <input type="checkbox"
                                       class="w-4 h-4 text-cg-red border-gray-300 rounded"
                                       ${isSelected ? 'checked' : ''}
                                       onchange="DataTableComponent.toggleSelect('${tableId}', '${rowId}', this.checked)">
                            </td>
                        ` : ''}
                        ${columns.map(col => {
                            let value = row[col.key];

                            // Apply formatter if provided
                            if (col.format) {
                                value = col.format(value, row);
                            }

                            // Apply renderer if provided
                            if (col.render) {
                                return `<td class="px-4 py-3 ${col.className || ''}">${col.render(value, row)}</td>`;
                            }

                            return `<td class="px-4 py-3 text-sm text-gray-900 ${col.className || ''}">${value ?? '-'}</td>`;
                        }).join('')}
                        ${instance.actions?.length > 0 ? `
                            <td class="px-4 py-3 text-right">
                                <div class="flex items-center justify-end gap-1">
                                    ${instance.actions.map(action => `
                                        <button type="button"
                                                class="p-1.5 hover:bg-gray-100 rounded transition min-h-[44px] min-w-[44px]"
                                                onclick="${action.onclick.replace('{id}', rowId).replace('{row}', JSON.stringify(row))}"
                                                aria-label="${action.label}"
                                                title="${action.label}">
                                            <span class="material-icons text-sm ${action.iconClass || 'text-gray-500'}" aria-hidden="true">${action.icon}</span>
                                        </button>
                                    `).join('')}
                                </div>
                            </td>
                        ` : ''}
                    </tr>
                `;
            }).join('');
        },

        /**
         * Render pagination controls
         * @param {string} tableId
         * @returns {string}
         */
        renderPagination(tableId) {
            const instance = tableInstances.get(tableId);
            if (!instance) return '';

            const { data, pageSize, currentPage } = instance;
            const totalPages = Math.ceil(data.length / pageSize);
            const start = (currentPage - 1) * pageSize + 1;
            const end = Math.min(currentPage * pageSize, data.length);

            return `
                <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50" role="navigation" aria-label="${i18n.t('accessibility.pagination')}">
                    <div class="text-sm text-gray-500" aria-live="polite" aria-atomic="true">
                        ${i18n.t('common.showing')} ${start} - ${end} ${i18n.t('common.of')} ${data.length} ${i18n.t('common.items')}
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button"
                                class="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                                ${currentPage === 1 ? 'disabled' : ''}
                                aria-label="${i18n.t('accessibility.previousPage')}"
                                onclick="DataTableComponent.goToPage('${tableId}', ${currentPage - 1})">
                            <span class="material-icons text-sm" aria-hidden="true">chevron_left</span>
                        </button>
                        <span class="text-sm text-gray-600" aria-current="page">${i18n.t('accessibility.pageInfo').replace('{current}', currentPage).replace('{total}', totalPages)}</span>
                        <button type="button"
                                class="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
                                ${currentPage === totalPages ? 'disabled' : ''}
                                aria-label="${i18n.t('accessibility.nextPage')}"
                                onclick="DataTableComponent.goToPage('${tableId}', ${currentPage + 1})">
                            <span class="material-icons text-sm" aria-hidden="true">chevron_right</span>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Sort table by column
         * @param {string} tableId
         * @param {string} column
         */
        sort(tableId, column) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            // Toggle sort direction if same column
            if (instance.sortColumn === column) {
                instance.sortDirection = instance.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                instance.sortColumn = column;
                instance.sortDirection = 'asc';
            }

            // Update sort icons and ARIA attributes
            instance.columns.forEach(col => {
                const header = document.getElementById(`${tableId}-header-${col.key}`);
                const icon = document.getElementById(`${tableId}-sort-${col.key}`);

                if (header) {
                    if (col.key === column) {
                        // Set aria-sort for active column
                        header.setAttribute('aria-sort', instance.sortDirection === 'asc' ? 'ascending' : 'descending');
                    } else {
                        // Reset aria-sort for inactive columns
                        header.setAttribute('aria-sort', 'none');
                    }
                }

                if (icon) {
                    if (col.key === column) {
                        icon.textContent = instance.sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
                        icon.classList.remove('text-gray-400');
                        icon.classList.add('text-cg-red');
                    } else {
                        icon.textContent = 'unfold_more';
                        icon.classList.add('text-gray-400');
                        icon.classList.remove('text-cg-red');
                    }
                }
            });

            // Announce sort to screen readers
            if (typeof AccessibilityUtils !== 'undefined' && AccessibilityUtils.announceToScreenReader) {
                const sortDir = instance.sortDirection === 'asc'
                    ? i18n.t('accessibility.sortedAscending')
                    : i18n.t('accessibility.sortedDescending');
                const colLabel = instance.columns.find(c => c.key === column)?.label || column;
                AccessibilityUtils.announceToScreenReader(`${colLabel} ${sortDir}`);
            }

            // Re-render rows
            this.refresh(tableId);
        },

        /**
         * Go to specific page
         * @param {string} tableId
         * @param {number} page
         */
        goToPage(tableId, page) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            const totalPages = Math.ceil(instance.data.length / instance.pageSize);
            instance.currentPage = Math.max(1, Math.min(page, totalPages));

            this.refresh(tableId);
        },

        /**
         * Toggle row selection
         * @param {string} tableId
         * @param {string} rowId
         * @param {boolean} selected
         */
        toggleSelect(tableId, rowId, selected) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            if (selected) {
                instance.selectedRows.add(rowId);
            } else {
                instance.selectedRows.delete(rowId);
            }

            this.refresh(tableId);
        },

        /**
         * Toggle select all
         * @param {string} tableId
         * @param {boolean} selected
         */
        toggleSelectAll(tableId, selected) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            if (selected) {
                instance.data.forEach((row, index) => {
                    instance.selectedRows.add(row.id || `row_${index}`);
                });
            } else {
                instance.selectedRows.clear();
            }

            this.refresh(tableId);
        },

        /**
         * Get selected rows
         * @param {string} tableId
         * @returns {array}
         */
        getSelected(tableId) {
            const instance = tableInstances.get(tableId);
            if (!instance) return [];

            return instance.data.filter((row, index) => {
                const rowId = row.id || `row_${index}`;
                return instance.selectedRows.has(rowId);
            });
        },

        /**
         * Refresh table display
         * @param {string} tableId
         */
        refresh(tableId) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            const tbody = document.getElementById(`${tableId}-body`);
            if (tbody) {
                tbody.innerHTML = this.renderRows(tableId);
            }

            // Update pagination
            const table = document.getElementById(tableId);
            if (table && instance.paginated) {
                const pagination = table.querySelector('.border-t.border-gray-200');
                if (pagination) {
                    pagination.outerHTML = this.renderPagination(tableId);
                }
            }
        },

        /**
         * Update table data
         * @param {string} tableId
         * @param {array} data
         */
        updateData(tableId, data) {
            const instance = tableInstances.get(tableId);
            if (!instance) return;

            instance.data = data;
            instance.currentPage = 1;
            instance.selectedRows.clear();

            this.refresh(tableId);
        },

        /**
         * Destroy table instance
         * @param {string} tableId
         */
        destroy(tableId) {
            tableInstances.delete(tableId);
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataTableComponent;
}

/**
 * Organization Chart Component
 * Interactive tree visualization
 */

const OrgChartComponent = (function() {
    return {
        /**
         * Render organization chart
         * @param {object} data
         * @returns {string}
         */
        render(data) {
            if (!data) {
                return CardComponent.emptyState(i18n.isThai() ? 'ไม่มีข้อมูลผังองค์กร' : 'No organization chart data');
            }

            const { supervisorOfSupervisor, supervisor, employee, directReports = [] } = data;

            return `
                <div class="org-chart-container overflow-x-auto py-6">
                    <div class="flex flex-col items-center min-w-max">
                        <!-- Supervisor's Supervisor -->
                        ${supervisorOfSupervisor ? `
                            <div class="mb-2">
                                ${this.renderNode(supervisorOfSupervisor, 'supervisor2')}
                            </div>
                            <div class="w-0.5 h-6 bg-gray-300"></div>
                        ` : ''}

                        <!-- Supervisor -->
                        ${supervisor ? `
                            <div class="mb-2">
                                ${this.renderNode(supervisor, 'supervisor')}
                            </div>
                            <div class="w-0.5 h-6 bg-gray-300"></div>
                        ` : ''}

                        <!-- Current Employee (Highlighted) -->
                        <div class="mb-2">
                            ${this.renderNode(employee, 'current', true)}
                        </div>

                        <!-- Direct Reports -->
                        ${directReports.length > 0 ? `
                            <div class="w-0.5 h-6 bg-gray-300"></div>

                            <!-- Horizontal connector line -->
                            <div class="relative">
                                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gray-300"
                                     style="width: ${Math.min(directReports.length * 150, 600)}px"></div>
                            </div>

                            <!-- Direct reports row -->
                            <div class="flex gap-4 mt-6">
                                ${directReports.map(report => `
                                    <div class="flex flex-col items-center">
                                        <div class="w-0.5 h-6 bg-gray-300 -mt-6"></div>
                                        ${this.renderNode(report, 'report')}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render a single node
         * @param {object} person
         * @param {string} type
         * @param {boolean} highlighted
         * @returns {string}
         */
        renderNode(person, type = 'normal', highlighted = false) {
            if (!person) return '';

            const borderColor = highlighted ? 'border-cg-red ring-2 ring-cg-red/20' : 'border-gray-200';
            const bgColor = highlighted ? 'bg-red-50' : 'bg-white';

            return `
                <div class="org-node ${bgColor} border-2 ${borderColor} rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-pointer w-40"
                     onclick="OrgChartComponent.handleNodeClick('${person.id}')"
                     role="button"
                     tabindex="0"
                     aria-label="${person.name}, ${person.title}">
                    <div class="flex flex-col items-center text-center">
                        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow mb-2">
                            <img src="${person.photo || 'https://via.placeholder.com/48'}"
                                 alt="${person.name}"
                                 class="w-full h-full object-cover"
                                 onerror="this.src='https://via.placeholder.com/48?text=${encodeURIComponent(person.name?.charAt(0) || 'U')}'">
                        </div>
                        <p class="font-medium text-sm text-gray-900 truncate w-full">${person.name}</p>
                        <p class="text-xs text-gray-500 truncate w-full">${person.title}</p>
                        ${highlighted ? '<span class="mt-1 text-xs text-cg-red font-medium">(You)</span>' : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Handle node click
         * @param {string} personId
         */
        handleNodeClick(personId) {
            const currentUser = AppState.get('currentUser');

            if (personId === currentUser?.employeeId) {
                // Clicking on self
                Router.navigate('profile');
            } else if (RBAC.canViewEmployee(personId)) {
                // Can view this employee
                Router.navigate('profile', { id: personId });
            } else {
                // Cannot view, show basic info only
                ToastComponent.info(i18n.isThai() ? 'คุณไม่มีสิทธิ์ดูข้อมูลพนักงานนี้' : 'You do not have permission to view this employee');
            }
        },

        /**
         * Render compact org chart (inline version)
         * @param {object} data
         * @returns {string}
         */
        renderCompact(data) {
            if (!data) return '';

            const { supervisor, employee, directReports = [] } = data;

            return `
                <div class="flex flex-col gap-4">
                    ${supervisor ? `
                        <div class="flex items-center gap-3">
                            <span class="text-sm text-gray-500 w-24">${i18n.t('employment.supervisor')}:</span>
                            <div class="flex items-center gap-2">
                                <img src="${supervisor.photo}" alt="${supervisor.name}"
                                     class="w-8 h-8 rounded-full object-cover">
                                <div>
                                    <p class="text-sm font-medium text-gray-900">${supervisor.name}</p>
                                    <p class="text-xs text-gray-500">${supervisor.title}</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    ${directReports.length > 0 ? `
                        <div>
                            <p class="text-sm text-gray-500 mb-2">${i18n.t('home.directReports')} (${directReports.length}):</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                ${directReports.map(report => `
                                    <div class="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                        <img src="${report.photo}" alt="${report.name}"
                                             class="w-8 h-8 rounded-full object-cover">
                                        <div class="min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate">${report.name}</p>
                                            <p class="text-xs text-gray-500 truncate">${report.title}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrgChartComponent;
}

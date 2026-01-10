/**
 * Benefits Page
 * Benefits overview and enrollments
 */

const BenefitsPage = (function() {
    return {
        /**
         * Render benefits tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            const isLoading = AppState.get('isLoading');

            // Show skeleton while loading
            if (isLoading) {
                return this.renderSkeleton();
            }

            if (!employee) return CardComponent.emptyState(i18n.t('common.noData'));

            const benefits = employee.benefits || {};
            const enrollments = benefits.enrollments || [];

            return `
                <div class="space-y-6">
                    <!-- Benefits Overview -->
                    ${this.renderOverviewSection(enrollments)}

                    <!-- Active Enrollments -->
                    ${this.renderEnrollmentsSection(enrollments)}
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            // Any initialization logic
        },

        /**
         * Render Benefits Overview section
         */
        renderOverviewSection(enrollments) {
            const activeCount = enrollments.filter(e => e.status === 'Active').length;
            const withDependents = enrollments.filter(e => e.dependentsCovered > 0).length;

            return CardComponent.render({
                id: 'benefits-overview-card',
                title: i18n.t('benefits.overview'),
                icon: 'card_giftcard',
                content: `
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-green-600">${activeCount}</p>
                            <p class="text-sm text-gray-600">${i18n.t('benefits.activeEnrollments')}</p>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-blue-600">${enrollments.length}</p>
                            <p class="text-sm text-gray-600">${i18n.isThai() ? 'แผนทั้งหมด' : 'Total Plans'}</p>
                        </div>
                        <div class="bg-purple-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-purple-600">${withDependents}</p>
                            <p class="text-sm text-gray-600">${i18n.t('benefits.dependentsCovered')}</p>
                        </div>
                        <div class="bg-orange-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-orange-600">0</p>
                            <p class="text-sm text-gray-600">${i18n.isThai() ? 'รอดำเนินการ' : 'Pending'}</p>
                        </div>
                    </div>
                `
            });
        },

        /**
         * Render Active Enrollments section
         */
        renderEnrollmentsSection(enrollments) {
            if (!enrollments || enrollments.length === 0) {
                return CardComponent.render({
                    id: 'enrollments-card',
                    title: i18n.t('benefits.activeEnrollments'),
                    icon: 'fact_check',
                    content: CardComponent.emptyState(i18n.isThai() ? 'ไม่มีสวัสดิการที่ลงทะเบียน' : 'No benefit enrollments')
                });
            }

            const content = enrollments.map(enrollment => {
                const statusConfig = {
                    'Active': { class: 'bg-green-100 text-green-800', icon: 'check_circle' },
                    'Inactive': { class: 'bg-gray-100 text-gray-800', icon: 'cancel' },
                    'Pending': { class: 'bg-yellow-100 text-yellow-800', icon: 'pending' }
                };

                const config = statusConfig[enrollment.status] || statusConfig['Pending'];

                const planTypeIcons = {
                    'Health': 'local_hospital',
                    'Life': 'favorite',
                    'Dental': 'mood',
                    'Retirement': 'savings',
                    'Accident': 'health_and_safety'
                };

                return `
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start gap-4">
                                <div class="p-3 bg-blue-100 rounded-lg">
                                    <span class="material-icons text-blue-600">${planTypeIcons[enrollment.planType] || 'card_giftcard'}</span>
                                </div>
                                <div>
                                    <h4 class="font-medium text-gray-900">${enrollment.planName}</h4>
                                    <p class="text-sm text-gray-500">${enrollment.coverage}</p>
                                    <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                        <span class="flex items-center gap-1">
                                            <span class="material-icons text-xs">event</span>
                                            ${i18n.t('benefits.effectiveDate')}: ${DateUtils.format(enrollment.effectiveDate, 'medium')}
                                        </span>
                                        ${enrollment.dependentsCovered > 0 ? `
                                            <span class="flex items-center gap-1">
                                                <span class="material-icons text-xs">people</span>
                                                ${enrollment.dependentsCovered} ${i18n.t('benefits.dependentsCovered')}
                                            </span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                            <span class="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.class}">
                                <span class="material-icons text-xs">${config.icon}</span>
                                ${i18n.t(`benefits.${enrollment.status.toLowerCase()}`)}
                            </span>
                        </div>
                    </div>
                `;
            }).join('');

            return CardComponent.render({
                id: 'enrollments-card',
                title: i18n.t('benefits.activeEnrollments'),
                icon: 'fact_check',
                content: `<div class="space-y-4">${content}</div>`
            });
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    ${SkeletonComponent.renderTableSkeleton(4, 5)}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BenefitsPage;
}

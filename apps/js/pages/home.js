/**
 * Home Page
 * Quick Actions and dashboard
 */

const HomePage = (function() {
    return {
        /**
         * Render home page
         * @returns {string}
         */
        render() {
            const user = AppState.get('currentUser');
            const employee = AppState.get('currentEmployee');
            const pendingWorkflows = AppState.get('pendingWorkflows') || [];
            const isManager = RBAC.isManager();

            // Show skeleton while data is not yet loaded
            if (!user || !employee) {
                return this.renderSkeleton(isManager);
            }

            const isThai = i18n.isThai();
            const greeting = this.getGreeting();
            const name = isThai
                ? (employee?.personalInfo?.firstNameTh || employee?.personalInfo?.firstNameEn || user?.username)
                : (employee?.personalInfo?.firstNameEn || user?.username);

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Welcome Message -->
                    <div class="mb-8">
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                            ${greeting}, ${name}!
                        </h1>
                        <p class="text-gray-500 mt-1">
                            ${isThai ? 'ยินดีต้อนรับสู่ระบบ HR' : 'Welcome to the HR System'}
                        </p>
                    </div>

                    <!-- Quick Actions -->
                    <section class="mb-8">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('home.quickActions')}</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${this.renderQuickActionCard({
                                icon: 'person',
                                iconBg: 'bg-blue-100',
                                iconColor: 'text-blue-600',
                                title: i18n.t('home.viewMyProfile'),
                                description: i18n.t('home.viewMyProfileDesc'),
                                href: '#/profile'
                            })}
                            ${this.renderQuickActionCard({
                                icon: 'edit_note',
                                iconBg: 'bg-green-100',
                                iconColor: 'text-green-600',
                                title: i18n.t('home.manageMyData'),
                                description: i18n.t('home.manageMyDataDesc'),
                                href: '#/profile/personal'
                            })}
                            ${this.renderQuickActionCard({
                                icon: 'assignment',
                                iconBg: 'bg-orange-100',
                                iconColor: 'text-orange-600',
                                title: i18n.t('home.viewPendingWorkflows'),
                                description: i18n.t('home.viewPendingWorkflowsDesc'),
                                href: '#/workflows',
                                badge: pendingWorkflows.length > 0 ? pendingWorkflows.length : null
                            })}
                        </div>
                    </section>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- For You Today -->
                        <section>
                            <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('home.forYouToday')}</h2>
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                ${this.renderForYouToday()}
                            </div>
                        </section>

                        <!-- Team Summary (for managers) -->
                        ${isManager ? `
                            <section>
                                <h2 class="text-lg font-semibold text-gray-900 mb-4">${i18n.t('home.teamSummary')}</h2>
                                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                    ${this.renderTeamSummary()}
                                </div>
                            </section>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize home page
         */
        init() {
            // Any initialization logic
        },

        /**
         * Get greeting based on time of day
         * @returns {string}
         */
        getGreeting() {
            const hour = new Date().getHours();
            const isThai = i18n.isThai();

            if (hour < 12) {
                return isThai ? 'สวัสดีตอนเช้า' : 'Good morning';
            } else if (hour < 17) {
                return isThai ? 'สวัสดีตอนบ่าย' : 'Good afternoon';
            } else {
                return isThai ? 'สวัสดีตอนเย็น' : 'Good evening';
            }
        },

        /**
         * Render quick action card
         * @param {object} options
         * @returns {string}
         */
        renderQuickActionCard(options) {
            const { icon, iconBg, iconColor, title, description, href, badge } = options;

            return `
                <a href="${href}"
                   class="block bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition card-hover">
                    <div class="flex items-start gap-4">
                        <div class="p-3 ${iconBg} rounded-lg">
                            <span class="material-icons ${iconColor}">${icon}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <h3 class="font-semibold text-gray-900">${title}</h3>
                                ${badge ? `<span class="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">${badge}</span>` : ''}
                            </div>
                            <p class="text-sm text-gray-500 mt-1">${description}</p>
                        </div>
                        <span class="material-icons text-gray-400">chevron_right</span>
                    </div>
                </a>
            `;
        },

        /**
         * Render For You Today section
         * @returns {string}
         */
        renderForYouToday() {
            const notifications = AppState.get('notifications') || [];
            const unreadNotifications = notifications.filter(n => !n.read).slice(0, 5);

            if (unreadNotifications.length === 0) {
                return `
                    <div class="p-6 text-center text-gray-500">
                        <span class="material-icons text-4xl mb-2">check_circle</span>
                        <p>${i18n.t('home.noItems')}</p>
                    </div>
                `;
            }

            const isThai = i18n.isThai();

            return `
                <ul class="divide-y divide-gray-100">
                    ${unreadNotifications.map(notification => {
                        const title = isThai ? (notification.titleTh || notification.title) : notification.title;
                        const message = isThai ? (notification.messageTh || notification.message) : notification.message;

                        const icons = {
                            workflow_pending: 'assignment',
                            info: 'info',
                            reminder: 'schedule'
                        };

                        const colors = {
                            workflow_pending: 'text-orange-500',
                            info: 'text-blue-500',
                            reminder: 'text-purple-500'
                        };

                        return `
                            <li class="p-4 hover:bg-gray-50 cursor-pointer" onclick="Router.navigate('workflows')">
                                <div class="flex items-start gap-3">
                                    <span class="material-icons ${colors[notification.type] || 'text-gray-500'}">
                                        ${icons[notification.type] || 'notifications'}
                                    </span>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium text-gray-900">${title}</p>
                                        <p class="text-sm text-gray-500 truncate">${message}</p>
                                        <p class="text-xs text-gray-400 mt-1">${DateUtils.formatRelative(notification.timestamp)}</p>
                                    </div>
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
                <div class="p-3 border-t text-center">
                    <a href="#/workflows" class="text-sm text-cg-info hover:text-blue-700">${i18n.t('common.viewMore')}</a>
                </div>
            `;
        },

        /**
         * Render Team Summary section
         * @returns {string}
         */
        renderTeamSummary() {
            const employee = AppState.get('currentEmployee');
            const teamMembers = employee?.orgChart?.directReports || [];
            const pendingWorkflows = MockWorkflowData.forApproval || [];

            return `
                <div class="p-5">
                    <!-- Stats -->
                    <div class="grid grid-cols-2 gap-4 mb-5">
                        <div class="bg-orange-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-orange-600">${pendingWorkflows.length}</p>
                            <p class="text-sm text-gray-600">${i18n.t('home.pendingApprovals')}</p>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-4 text-center">
                            <p class="text-3xl font-bold text-blue-600">${teamMembers.length}</p>
                            <p class="text-sm text-gray-600">${i18n.t('home.directReports')}</p>
                        </div>
                    </div>

                    <!-- Team Members -->
                    ${teamMembers.length > 0 ? `
                        <div>
                            <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('home.directReports')}</h4>
                            <div class="space-y-2">
                                ${teamMembers.slice(0, 3).map(member => `
                                    <div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                         onclick="Router.navigate('profile', { id: '${member.id}' })">
                                        <img src="${member.photo}" alt="${member.name}"
                                             class="w-10 h-10 rounded-full object-cover">
                                        <div class="flex-1 min-w-0">
                                            <p class="font-medium text-gray-900">${member.name}</p>
                                            <p class="text-sm text-gray-500 truncate">${member.title}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render skeleton loading state
         * @param {boolean} isManager - Whether to show manager sections
         * @returns {string}
         */
        renderSkeleton(isManager) {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Welcome Message Skeleton -->
                    <div class="mb-8">
                        <div class="skeleton shimmer" style="width: 300px; height: 36px; margin-bottom: 8px;"></div>
                        <div class="skeleton shimmer" style="width: 250px; height: 20px;"></div>
                    </div>

                    <!-- Quick Actions Skeleton -->
                    <section class="mb-8">
                        <div class="skeleton shimmer" style="width: 150px; height: 24px; margin-bottom: 16px;"></div>
                        ${SkeletonComponent.renderQuickActionsSkeletons()}
                    </section>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- For You Today Skeleton -->
                        <section>
                            <div class="skeleton shimmer" style="width: 150px; height: 24px; margin-bottom: 16px;"></div>
                            ${SkeletonComponent.renderForYouTodaySkeletons()}
                        </section>

                        <!-- Team Summary Skeleton (for managers) -->
                        ${isManager ? `
                            <section>
                                <div class="skeleton shimmer" style="width: 150px; height: 24px; margin-bottom: 16px;"></div>
                                ${SkeletonComponent.renderTeamSummarySkeleton()}
                            </section>
                        ` : ''}
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomePage;
}

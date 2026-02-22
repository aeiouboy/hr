/**
 * Profile Page
 * Main profile page container with tabs
 */

const ProfilePage = (function() {
    // Tab configuration
    const tabs = [
        { id: 'personal', label: 'Personal Information', labelTh: 'ข้อมูลส่วนตัว', icon: 'person' },
        { id: 'employment', label: 'Employment', labelTh: 'ข้อมูลการจ้างงาน', icon: 'work' },
        { id: 'compensation', label: 'Compensation', labelTh: 'ค่าตอบแทน', icon: 'payments' },
        { id: 'benefits', label: 'Benefits', labelTh: 'สวัสดิการ', icon: 'card_giftcard' },
        { id: 'profile-details', label: 'Profile', labelTh: 'โปรไฟล์', icon: 'account_circle' },
        { id: 'scorecard', label: 'Scorecard', labelTh: 'สกอร์การ์ด', icon: 'assessment' }
    ];

    return {
        /**
         * Render profile page
         * @param {object} params
         * @returns {string}
         */
        render(params = {}) {
            const employee = AppState.get('currentEmployee');
            const activeTab = params.tab || params.id || AppState.get('activeTab') || 'personal';

            const isThai = i18n.isThai();

            return `
                <!-- Profile Header -->
                ${ProfileHeaderComponent.render(employee)}

                <!-- Tabs -->
                ${TabsComponent.render({
                    id: 'profile-tabs',
                    tabs: tabs.map(tab => ({
                        ...tab,
                        label: isThai ? tab.labelTh : tab.label
                    })),
                    activeTab: activeTab,
                    onChange: "ProfilePage.switchTab('{tab}')"
                })}

                <!-- Tab Content -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="tab-content">
                    ${this.renderTabContent(activeTab, employee)}
                </div>
            `;
        },

        /**
         * Initialize profile page
         * @param {object} params
         */
        init(params = {}) {
            const activeTab = params.tab || params.id || 'personal';
            AppState.set('activeTab', activeTab);

            // Initialize the current tab page after DOM is ready
            setTimeout(() => {
                this.initTabPage(activeTab);
            }, 100);
        },

        /**
         * Switch tab
         * @param {string} tabId
         */
        switchTab(tabId) {
            // Update URL without full page reload
            Router.navigate('profile', { tab: tabId });

            // Update tab state
            AppState.set('activeTab', tabId);
            TabsComponent.setActive('profile-tabs', tabId);

            // Update content
            const contentContainer = document.getElementById('tab-content');
            if (contentContainer) {
                const employee = AppState.get('currentEmployee');
                contentContainer.innerHTML = this.renderTabContent(tabId, employee);

                // Initialize the tab page if needed
                this.initTabPage(tabId);
            }
        },

        /**
         * Render tab content
         * @param {string} tabId
         * @param {object} employee
         * @returns {string}
         */
        renderTabContent(tabId, employee) {
            switch (tabId) {
                case 'personal':
                    return PersonalInfoPage.render(employee);
                case 'employment':
                    return EmploymentPage.render(employee);
                case 'compensation':
                    return CompensationPage.render(employee);
                case 'benefits':
                    return BenefitsPage.render(employee);
                case 'profile-details':
                    return ProfileDetailsPage.render(employee);
                case 'scorecard':
                    return ScorecardPage.render(employee);
                default:
                    return PersonalInfoPage.render(employee);
            }
        },

        /**
         * Initialize tab page
         * @param {string} tabId
         */
        initTabPage(tabId) {
            switch (tabId) {
                case 'personal':
                    PersonalInfoPage.init?.();
                    break;
                case 'employment':
                    EmploymentPage.init?.();
                    break;
                case 'compensation':
                    CompensationPage.init?.();
                    break;
                case 'benefits':
                    BenefitsPage.init?.();
                    break;
                case 'profile-details':
                    ProfileDetailsPage.init?.();
                    break;
                case 'scorecard':
                    ScorecardPage.init?.();
                    break;
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfilePage;
}

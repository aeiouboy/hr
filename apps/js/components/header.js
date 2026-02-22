/**
 * Header Component
 * Main navigation header with logo, search, icons
 */

const HeaderComponent = (function() {
    return {
        /**
         * Render the header
         * @returns {string}
         */
        render() {
            const user = AppState.get('currentUser');
            const unreadCount = AppState.getUnreadCount();

            return `
                <header class="bg-white shadow-md sticky top-0 z-40">
                    <div class="flex items-center justify-between px-4 py-2">
                        <!-- Logo and Menu -->
                        <div class="flex items-center gap-4">
                            <!-- Mobile Menu Button -->
                            <button class="lg:hidden p-2 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px]"
                                    onclick="MobileMenuComponent.toggle()"
                                    aria-label="${i18n.t('accessibility.openMenu')}"
                                    aria-expanded="false"
                                    id="mobile-menu-btn">
                                <span class="material-icons" aria-hidden="true">menu</span>
                            </button>

                            <!-- Logo -->
                            <a href="#/home" class="flex items-center gap-2">
                                <div class="text-xl font-bold">
                                    <span class="text-cg-red">CENTRAL</span><span class="text-gray-800">GROUP</span>
                                </div>
                            </a>

                            <!-- Phase Navigation Dropdowns -->
                            <nav class="hidden lg:flex items-center gap-1" role="navigation" aria-label="${i18n.t('accessibility.mainNavigation') || 'Main Navigation'}">
                                ${this.renderSelfServiceDropdown()}
                                ${RBAC.isHR() ? this.renderTimePayrollDropdown() : ''}
                                ${this.renderOrganizationDropdown()}
                                ${(RBAC.isManager() || RBAC.isHR()) ? this.renderTalentDropdown() : ''}
                                ${RBAC.isHR() ? this.renderRecruitmentDropdown() : ''}
                            </nav>
                        </div>

                        <!-- Search Bar -->
                        <div class="flex-1 max-w-xl mx-4 hidden md:block" role="search">
                            <div class="relative">
                                <span class="material-icons absolute left-3 top-2.5 text-gray-400" aria-hidden="true">search</span>
                                <input type="text"
                                       placeholder="${i18n.t('nav.searchPlaceholder')}"
                                       class="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info focus:bg-white transition"
                                       aria-label="${i18n.t('common.search')}"
                                       onkeydown="if(event.key==='Enter') HeaderComponent.handleSearch(this.value)">
                            </div>
                        </div>

                        <!-- Action Icons -->
                        <div class="flex items-center gap-1">
                            <!-- Search Icon (Mobile) -->
                            <button class="md:hidden p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
                                    onclick="HeaderComponent.toggleMobileSearch()"
                                    aria-label="${i18n.t('common.search')}">
                                <span class="material-icons text-gray-600" aria-hidden="true">search</span>
                            </button>

                            <!-- Notifications -->
                            ${NotificationBellComponent.render(unreadCount)}

                            <!-- Help -->
                            <button class="hidden sm:block p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('nav.help')}"
                                    title="${i18n.t('nav.help')}">
                                <span class="material-icons text-gray-600" aria-hidden="true">help_outline</span>
                            </button>

                            <!-- Settings -->
                            <button class="hidden sm:block p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
                                    aria-label="${i18n.t('nav.settings')}"
                                    title="${i18n.t('nav.settings')}">
                                <span class="material-icons text-gray-600" aria-hidden="true">settings</span>
                            </button>

                            <!-- Language Toggle -->
                            <button class="p-2 hover:bg-gray-100 rounded-full min-h-[44px] min-w-[44px]"
                                    onclick="HeaderComponent.toggleLanguage()"
                                    aria-label="${i18n.isThai() ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}"
                                    title="${i18n.isThai() ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}">
                                <span class="text-sm font-medium text-gray-600" aria-hidden="true">${i18n.isThai() ? 'EN' : 'TH'}</span>
                            </button>

                            <!-- User Avatar -->
                            <div class="relative ml-2"
                                 onmouseenter="HeaderComponent.openDropdown('user-dropdown')"
                                 onmouseleave="HeaderComponent.closeDropdown('user-dropdown')">
                                <button class="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full min-h-[44px]"
                                        onclick="HeaderComponent.toggleDropdown('user-dropdown')"
                                        aria-label="${i18n.t('accessibility.userMenu')}"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        id="user-menu-btn">
                                    <div class="w-8 h-8 bg-cg-red rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        ${user ? (user.username || 'U').substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                    <span class="material-icons text-sm text-gray-500 hidden sm:block" aria-hidden="true">expand_more</span>
                                </button>
                                <div id="user-dropdown" class="dropdown-menu absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1" role="menu">
                                    <div class="px-4 py-2 border-b">
                                        <p class="font-medium text-gray-900">${user?.username || 'User'}</p>
                                        <p class="text-sm text-gray-500">${RBAC.getRoleDisplayName(user?.role)}</p>
                                    </div>
                                    <a href="#/profile" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">person</span>
                                        <span>${i18n.t('nav.profile')}</span>
                                    </a>
                                    <a href="#/settings" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">settings</span>
                                        <span>${i18n.t('nav.settings')}</span>
                                    </a>
                                    <hr class="my-1">
                                    <button class="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600"
                                            onclick="HeaderComponent.logout()"
                                            role="menuitem">
                                        <span class="material-icons text-sm" aria-hidden="true">logout</span>
                                        <span>${i18n.t('nav.logout')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Search (Hidden by default) -->
                    <div id="mobile-search" class="hidden px-4 pb-3 md:hidden" role="search">
                        <div class="relative">
                            <span class="material-icons absolute left-3 top-2.5 text-gray-400" aria-hidden="true">search</span>
                            <input type="text"
                                   placeholder="${i18n.t('nav.searchPlaceholder')}"
                                   class="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cg-info"
                                   aria-label="${i18n.t('common.search')}"
                                   onkeydown="if(event.key==='Enter') HeaderComponent.handleSearch(this.value)">
                        </div>
                    </div>
                </header>
            `;
        },

        /**
         * Render Phase 1 - Employee Self-Service dropdown
         * Visible to ALL users
         * @returns {string}
         */
        renderSelfServiceDropdown() {
            return `
                <div class="relative"
                     onmouseenter="HeaderComponent.openDropdown('self-service-dropdown')"
                     onmouseleave="HeaderComponent.closeDropdown('self-service-dropdown')">
                    <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                            onclick="HeaderComponent.toggleDropdown('self-service-dropdown')"
                            aria-label="${i18n.t('nav.selfService')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="self-service-dropdown-btn">
                        <span class="text-gray-700 text-sm">${i18n.t('nav.selfService')}</span>
                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                    </button>
                    <div id="self-service-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1" role="menu">
                        <a href="#/home" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">home</span>
                            <span>${i18n.t('nav.home')}</span>
                        </a>
                        <a href="#/leave" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">event_available</span>
                            <span>${i18n.t('leave.title')}</span>
                        </a>
                        <a href="#/payslip" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">receipt_long</span>
                            <span>${i18n.t('payslip.title')}</span>
                        </a>
                        <a href="#/performance" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">flag</span>
                            <span>${i18n.t('performance.title')}</span>
                        </a>
                        <a href="#/profile" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">person</span>
                            <span>${i18n.t('nav.profile')}</span>
                        </a>
                        <a href="#/workflows" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">assignment</span>
                            <span>${i18n.t('nav.workflows')}</span>
                        </a>
                    </div>
                </div>
            `;
        },

        /**
         * Render Phase 2 - Time & Payroll dropdown
         * Visible to HR and admin roles only
         * @returns {string}
         */
        renderTimePayrollDropdown() {
            return `
                <div class="relative"
                     onmouseenter="HeaderComponent.openDropdown('time-payroll-dropdown')"
                     onmouseleave="HeaderComponent.closeDropdown('time-payroll-dropdown')">
                    <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                            onclick="HeaderComponent.toggleDropdown('time-payroll-dropdown')"
                            aria-label="${i18n.t('nav.timePayroll')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="time-payroll-dropdown-btn">
                        <span class="text-gray-700 text-sm">${i18n.t('nav.timePayroll')}</span>
                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                    </button>
                    <div id="time-payroll-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1" role="menu">
                        <a href="#/time-management" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">schedule</span>
                            <span>${i18n.t('timeManagement.title')}</span>
                        </a>
                        <a href="#/payroll-setup" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">tune</span>
                            <span>${i18n.t('payrollSetup.title')}</span>
                        </a>
                        <a href="#/payroll-processing" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">calculate</span>
                            <span>${i18n.t('payroll.title')}</span>
                        </a>
                        <a href="#/government-reports" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">summarize</span>
                            <span>${i18n.t('govReports.title')}</span>
                        </a>
                        <a href="#/overtime" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">more_time</span>
                            <span>${i18n.t('overtime.title')}</span>
                        </a>
                    </div>
                </div>
            `;
        },

        /**
         * Render Phase 3 - Organization dropdown
         * Mixed visibility: Org Chart visible to all, Manager Dashboard for managers, others for HR
         * @returns {string}
         */
        renderOrganizationDropdown() {
            const isManager = RBAC.isManager();
            const isHR = RBAC.isHR();

            return `
                <div class="relative"
                     onmouseenter="HeaderComponent.openDropdown('organization-dropdown')"
                     onmouseleave="HeaderComponent.closeDropdown('organization-dropdown')">
                    <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                            onclick="HeaderComponent.toggleDropdown('organization-dropdown')"
                            aria-label="${i18n.t('nav.organization')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="organization-dropdown-btn">
                        <span class="text-gray-700 text-sm">${i18n.t('nav.organization')}</span>
                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                    </button>
                    <div id="organization-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1" role="menu">
                        <a href="#/org-chart" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">account_tree</span>
                            <span>${i18n.t('orgChart.title')}</span>
                        </a>
                        ${isHR ? `
                        <a href="#/positions" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">work</span>
                            <span>${i18n.t('position.title')}</span>
                        </a>
                        ` : ''}
                        ${isManager ? `
                        <a href="#/manager-dashboard" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-cg-red" role="menuitem">
                            <span class="material-icons text-sm" aria-hidden="true">dashboard</span>
                            <span>${i18n.t('managerDashboard.title')}</span>
                        </a>
                        ` : ''}
                        ${isHR ? `
                        <a href="#/transfer-request" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">swap_horiz</span>
                            <span>${i18n.t('transfer.title')}</span>
                        </a>
                        <a href="#/locations" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">location_on</span>
                            <span>${i18n.t('location.title')}</span>
                        </a>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Render Phase 4 - Talent Development dropdown
         * Visible to Managers and HR only
         * @returns {string}
         */
        renderTalentDropdown() {
            return `
                <div class="relative"
                     onmouseenter="HeaderComponent.openDropdown('talent-dropdown')"
                     onmouseleave="HeaderComponent.closeDropdown('talent-dropdown')">
                    <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                            onclick="HeaderComponent.toggleDropdown('talent-dropdown')"
                            aria-label="${i18n.t('nav.talentDevelopment')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="talent-dropdown-btn">
                        <span class="text-gray-700 text-sm">${i18n.t('nav.talentDevelopment')}</span>
                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                    </button>
                    <div id="talent-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1" role="menu">
                        <a href="#/talent-management" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">stars</span>
                            <span>${i18n.t('talent.title')}</span>
                        </a>
                        <a href="#/learning" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">school</span>
                            <span>${i18n.t('learning.title')}</span>
                        </a>
                        <a href="#/idp" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">trending_up</span>
                            <span>${i18n.t('idp.title')}</span>
                        </a>
                        <a href="#/training-records" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">history_edu</span>
                            <span>${i18n.t('training.title')}</span>
                        </a>
                        <a href="#/succession-planning" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">supervisor_account</span>
                            <span>${i18n.t('succession.title')}</span>
                        </a>
                    </div>
                </div>
            `;
        },

        /**
         * Render Phase 5 - Recruitment dropdown
         * Visible to HR only
         * @returns {string}
         */
        renderRecruitmentDropdown() {
            return `
                <div class="relative"
                     onmouseenter="HeaderComponent.openDropdown('recruitment-dropdown')"
                     onmouseleave="HeaderComponent.closeDropdown('recruitment-dropdown')">
                    <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                            onclick="HeaderComponent.toggleDropdown('recruitment-dropdown')"
                            aria-label="${i18n.t('nav.recruitment')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="recruitment-dropdown-btn">
                        <span class="text-gray-700 text-sm">${i18n.t('nav.recruitment')}</span>
                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                    </button>
                    <div id="recruitment-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border py-1" role="menu">
                        <a href="#/recruitment" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">person_add</span>
                            <span>${i18n.t('recruitment.title')}</span>
                        </a>
                        <a href="#/candidate-screening" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">how_to_reg</span>
                            <span>${i18n.t('candidateScreening.title')}</span>
                        </a>
                        <a href="#/onboarding" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">waving_hand</span>
                            <span>${i18n.t('onboarding.title')}</span>
                        </a>
                        <a href="#/resignation" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                            <span class="material-icons text-sm text-gray-500" aria-hidden="true">exit_to_app</span>
                            <span>${i18n.t('resignation.title')}</span>
                        </a>
                    </div>
                </div>
            `;
        },

        /**
         * Initialize header event listeners
         */
        init() {
            // Subscribe to notification changes
            AppState.subscribe('notifications', () => {
                this.updateNotificationCount();
            });

            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                const dropdowns = document.querySelectorAll('.dropdown-menu.open');
                dropdowns.forEach(dropdown => {
                    const parent = dropdown.parentElement;
                    if (parent && !parent.contains(e.target)) {
                        dropdown.classList.remove('open');
                        // Update aria-expanded
                        const btnId = dropdown.id + '-btn';
                        const btn = document.getElementById(btnId);
                        if (btn) {
                            btn.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
        },

        /**
         * Toggle dropdown visibility
         * @param {string} id
         */
        toggleDropdown(id) {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                const isOpen = dropdown.classList.toggle('open');

                // Update aria-expanded on the trigger button
                const btnId = id + '-btn';
                const btn = document.getElementById(btnId);
                if (btn) {
                    btn.setAttribute('aria-expanded', isOpen);
                }
            }
        },

        /**
         * Open dropdown
         * @param {string} id
         */
        openDropdown(id) {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                dropdown.classList.add('open');

                // Update aria-expanded on the trigger button
                const btnId = id + '-btn';
                const btn = document.getElementById(btnId);
                if (btn) {
                    btn.setAttribute('aria-expanded', 'true');
                }
            }
        },

        /**
         * Close dropdown
         * @param {string} id
         */
        closeDropdown(id) {
            const dropdown = document.getElementById(id);
            if (dropdown) {
                dropdown.classList.remove('open');

                // Update aria-expanded on the trigger button
                const btnId = id + '-btn';
                const btn = document.getElementById(btnId);
                if (btn) {
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        },

        /**
         * Toggle mobile search
         */
        toggleMobileSearch() {
            const search = document.getElementById('mobile-search');
            if (search) {
                search.classList.toggle('hidden');
                if (!search.classList.contains('hidden')) {
                    search.querySelector('input').focus();
                }
            }
        },

        /**
         * Handle search
         * @param {string} query
         */
        handleSearch(query) {
            if (query.trim()) {
                console.log('Search:', query);
                // Implement search functionality
                ToastComponent.info(`Searching for: ${query}`);
            }
        },

        /**
         * Toggle language
         */
        toggleLanguage() {
            i18n.toggleLanguage();
            ToastComponent.success(i18n.isThai() ? 'เปลี่ยนเป็นภาษาไทยแล้ว' : 'Switched to English');
        },

        /**
         * Update notification count in header
         */
        updateNotificationCount() {
            const count = AppState.getUnreadCount();
            const badge = document.getElementById('notification-badge');
            if (badge) {
                badge.textContent = count;
                badge.classList.toggle('hidden', count === 0);
            }
        },

        /**
         * Logout handler
         */
        logout() {
            ModalComponent.confirm({
                title: i18n.t('nav.logout'),
                message: i18n.isThai() ? 'คุณต้องการออกจากระบบหรือไม่?' : 'Are you sure you want to logout?',
                confirmText: i18n.t('nav.logout'),
                icon: 'logout'
            }).then(confirmed => {
                if (confirmed) {
                    // Clear state and redirect
                    AppState.reset();
                    ToastComponent.success(i18n.isThai() ? 'ออกจากระบบแล้ว' : 'Logged out successfully');
                    // In real app, redirect to login page
                    Router.navigate('home');
                }
            });
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponent;
}

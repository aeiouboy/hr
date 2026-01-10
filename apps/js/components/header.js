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

                            <!-- Employee Files Dropdown -->
                            <div class="relative hidden md:block">
                                <button class="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                                        onclick="HeaderComponent.toggleDropdown('nav-dropdown')"
                                        aria-label="${i18n.t('nav.employeeFiles')}"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        id="nav-dropdown-btn">
                                    <span class="text-gray-700">${i18n.t('nav.employeeFiles')}</span>
                                    <span class="material-icons text-sm text-gray-500" aria-hidden="true">expand_more</span>
                                </button>
                                <div id="nav-dropdown" class="dropdown-menu absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border py-1" role="menu">
                                    <a href="#/home" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50" role="menuitem">
                                        <span class="material-icons text-sm text-gray-500" aria-hidden="true">home</span>
                                        <span>${i18n.t('nav.home')}</span>
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
                            <div class="relative ml-2">
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
         * Initialize header event listeners
         */
        init() {
            // Subscribe to notification changes
            AppState.subscribe('notifications', () => {
                this.updateNotificationCount();
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

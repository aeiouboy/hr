/**
 * Mobile Menu Component
 * Slide-out drawer navigation for mobile devices
 */

const MobileMenuComponent = (function() {
    let isOpen = false;
    let touchStartX = 0;
    let touchCurrentX = 0;
    let isDragging = false;

    return {
        /**
         * Render the mobile menu HTML
         * @returns {string}
         */
        render() {
            const user = AppState.get('currentUser');

            return `
                <!-- Mobile Menu Overlay -->
                <div id="mobile-menu-overlay"
                     class="mobile-menu-overlay hidden fixed inset-0 bg-black/50 z-40 lg:hidden"
                     onclick="MobileMenuComponent.close()"
                     role="presentation"
                     aria-hidden="true"></div>

                <!-- Mobile Menu Sidebar -->
                <nav id="mobile-menu"
                     class="mobile-menu closed fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
                     role="navigation"
                     aria-label="${i18n.t('accessibility.openMenu')}">

                    <!-- Menu Header -->
                    <div class="p-4 border-b bg-gradient-to-r from-cg-red to-red-700">
                        <div class="flex items-center justify-between">
                            <span class="text-lg font-bold text-white">
                                <span>CENTRAL</span><span class="opacity-90">GROUP</span>
                            </span>
                            <button class="p-2 hover:bg-white/20 rounded-full transition min-h-[44px] min-w-[44px] flex items-center justify-center"
                                    onclick="MobileMenuComponent.close()"
                                    aria-label="${i18n.t('accessibility.closeMenu')}">
                                <span class="material-icons text-white" aria-hidden="true">close</span>
                            </button>
                        </div>

                        <!-- User Info in Mobile Menu -->
                        ${user ? `
                            <div class="mt-4 pt-4 border-t border-white/20">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-cg-red font-bold text-lg">
                                        ${(user.username || 'U').substring(0, 2).toUpperCase()}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium text-white truncate">${user.username || 'User'}</p>
                                        <p class="text-sm text-white/80 truncate">${RBAC.getRoleDisplayName(user.role)}</p>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Navigation Links -->
                    <div class="p-4">
                        <div class="space-y-1">
                            <!-- Home -->
                            <a href="#/home"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">home</span>
                                <span class="text-gray-800 font-medium">${i18n.t('nav.home')}</span>
                            </a>

                            <!-- My Profile -->
                            <a href="#/profile"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">person</span>
                                <span class="text-gray-800 font-medium">${i18n.t('nav.profile')}</span>
                            </a>

                            <!-- Personal Info -->
                            <a href="#/profile/personal-info"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px] ml-4"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-sm text-gray-500" aria-hidden="true">badge</span>
                                <span class="text-gray-700">${i18n.t('profile.personal')}</span>
                            </a>

                            <!-- Employment -->
                            <a href="#/profile/employment"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px] ml-4"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-sm text-gray-500" aria-hidden="true">work</span>
                                <span class="text-gray-700">${i18n.t('profile.employment')}</span>
                            </a>

                            <!-- Compensation -->
                            <a href="#/profile/compensation"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px] ml-4"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-sm text-gray-500" aria-hidden="true">payments</span>
                                <span class="text-gray-700">${i18n.t('profile.compensation')}</span>
                            </a>

                            <!-- Benefits -->
                            <a href="#/profile/benefits"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px] ml-4"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-sm text-gray-500" aria-hidden="true">health_and_safety</span>
                                <span class="text-gray-700">${i18n.t('profile.benefits')}</span>
                            </a>

                            <!-- Payslip & Tax Documents -->
                            <a href="#/payslip"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">receipt_long</span>
                                <span class="text-gray-800 font-medium">${i18n.t('payslip.title')}</span>
                            </a>

                            <!-- Leave Request -->
                            <a href="#/leave"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">event_available</span>
                                <span class="text-gray-800 font-medium">${i18n.t('leave.title')}</span>
                            </a>

                            <!-- Performance/Goals -->
                            <a href="#/performance"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">flag</span>
                                <span class="text-gray-800 font-medium">${i18n.t('performance.title')}</span>
                            </a>

                            <!-- Workflows -->
                            <a href="#/workflows"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">assignment</span>
                                <span class="text-gray-800 font-medium">${i18n.t('nav.workflows')}</span>
                            </a>

                            ${RBAC.isManager() ? `
                            <!-- Manager Dashboard -->
                            <a href="#/manager-dashboard"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition min-h-[44px] bg-red-50/50 border border-red-100"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-cg-red" aria-hidden="true">dashboard</span>
                                <span class="text-cg-red font-medium">${i18n.isThai() ? 'แดชบอร์ดผู้จัดการ' : 'Manager Dashboard'}</span>
                            </a>
                            ` : ''}
                        </div>

                        <hr class="my-4">

                        <!-- Settings & Language -->
                        <div class="space-y-1">
                            <!-- Settings -->
                            <a href="#/settings"
                               class="mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                               onclick="MobileMenuComponent.handleNavigation(event)">
                                <span class="material-icons text-gray-600" aria-hidden="true">settings</span>
                                <span class="text-gray-800">${i18n.t('nav.settings')}</span>
                            </a>

                            <!-- Language Toggle -->
                            <button class="w-full mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition min-h-[44px]"
                                    onclick="MobileMenuComponent.toggleLanguage()"
                                    aria-label="${i18n.isThai() ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}">
                                <span class="material-icons text-gray-600" aria-hidden="true">language</span>
                                <span class="text-gray-800">${i18n.isThai() ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}</span>
                                <span class="ml-auto text-sm font-medium text-cg-red" aria-hidden="true">${i18n.isThai() ? 'EN' : 'TH'}</span>
                            </button>

                            <!-- Logout -->
                            <button class="w-full mobile-menu-item flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition text-red-600 min-h-[44px]"
                                    onclick="MobileMenuComponent.logout()"
                                    aria-label="${i18n.t('nav.logout')}">
                                <span class="material-icons" aria-hidden="true">logout</span>
                                <span class="font-medium">${i18n.t('nav.logout')}</span>
                            </button>
                        </div>
                    </div>
                </nav>
            `;
        },

        /**
         * Initialize mobile menu event listeners
         */
        init() {
            // Subscribe to language changes for re-rendering
            AppState.subscribe('language', () => {
                if (isOpen) {
                    this.updateContent();
                }
            });

            // Add keyboard event listener for Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isOpen) {
                    this.close();
                }
            });

            // Render initial content
            const container = document.getElementById('mobile-menu-container');
            if (container) {
                container.innerHTML = this.render();
                this.attachGestureListeners();
            }
        },

        /**
         * Attach touch gesture listeners for swipe-to-close
         */
        attachGestureListeners() {
            const menu = document.getElementById('mobile-menu');
            if (!menu) return;

            menu.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchCurrentX = touchStartX;
                isDragging = false;
            }, { passive: true });

            menu.addEventListener('touchmove', (e) => {
                if (!isOpen) return;

                touchCurrentX = e.touches[0].clientX;
                const diff = touchCurrentX - touchStartX;

                // Only allow left swipe (to close)
                if (diff < -10) {
                    isDragging = true;
                    const translateX = Math.min(0, diff);
                    menu.style.transform = `translateX(${translateX}px)`;
                }
            }, { passive: true });

            menu.addEventListener('touchend', (e) => {
                if (!isDragging || !isOpen) {
                    menu.style.transform = '';
                    return;
                }

                const diff = touchCurrentX - touchStartX;

                // If swiped more than 50px to the left, close menu
                if (diff < -50) {
                    this.close();
                } else {
                    // Reset position
                    menu.style.transform = '';
                }

                isDragging = false;
            }, { passive: true });
        },

        /**
         * Open mobile menu
         */
        open() {
            isOpen = true;
            const menu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('mobile-menu-overlay');
            const btn = document.getElementById('mobile-menu-btn');

            if (menu && overlay) {
                menu.classList.remove('closed');
                menu.classList.add('open');
                overlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';

                // Set ARIA attributes
                menu.setAttribute('aria-hidden', 'false');
                overlay.setAttribute('aria-hidden', 'false');
            }

            if (btn) {
                btn.setAttribute('aria-expanded', 'true');
            }
        },

        /**
         * Close mobile menu
         */
        close() {
            isOpen = false;
            const menu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('mobile-menu-overlay');
            const btn = document.getElementById('mobile-menu-btn');

            if (menu && overlay) {
                menu.classList.add('closed');
                menu.classList.remove('open');
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
                menu.style.transform = ''; // Reset any gesture transforms

                // Set ARIA attributes
                menu.setAttribute('aria-hidden', 'true');
                overlay.setAttribute('aria-hidden', 'true');
            }

            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
            }
        },

        /**
         * Toggle mobile menu
         */
        toggle() {
            if (isOpen) {
                this.close();
            } else {
                this.open();
            }
        },

        /**
         * Handle navigation link clicks
         * @param {Event} event
         */
        handleNavigation(event) {
            // Close menu after navigation
            this.close();
        },

        /**
         * Toggle language and update menu
         */
        toggleLanguage() {
            i18n.toggleLanguage();
            ToastComponent.success(i18n.isThai() ? 'เปลี่ยนเป็นภาษาไทยแล้ว' : 'Switched to English');
            this.updateContent();
        },

        /**
         * Update menu content after language change
         */
        updateContent() {
            const container = document.getElementById('mobile-menu-container');
            if (container) {
                container.innerHTML = this.render();
                this.attachGestureListeners();
                if (isOpen) {
                    // Reopen menu if it was open
                    const menu = document.getElementById('mobile-menu');
                    const overlay = document.getElementById('mobile-menu-overlay');
                    if (menu && overlay) {
                        menu.classList.remove('closed');
                        menu.classList.add('open');
                        overlay.classList.remove('hidden');
                    }
                }
            }
        },

        /**
         * Handle logout
         */
        logout() {
            this.close();
            HeaderComponent.logout();
        },

        /**
         * Get current state
         * @returns {boolean}
         */
        isOpen() {
            return isOpen;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenuComponent;
}

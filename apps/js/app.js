/**
 * App Module
 * Main application initialization and lifecycle management
 */

const App = (function() {
    let initialized = false;

    /**
     * Register all routes
     */
    function registerRoutes() {
        // Home page
        Router.register('home', {
            render: () => HomePage.render(),
            onEnter: () => HomePage.init()
        });

        // Profile page (default to personal info tab)
        Router.register('profile', {
            render: (params) => ProfilePage.render(params),
            onEnter: (params) => ProfilePage.init(params)
        });

        // Profile with specific tab
        Router.register('profile/:tab', {
            render: (params) => ProfilePage.render(params),
            onEnter: (params) => ProfilePage.init(params)
        });

        // Workflows page
        Router.register('workflows', {
            render: () => WorkflowsPage.render(),
            onEnter: () => WorkflowsPage.init()
        });

        // Leave Request page
        Router.register('leave', {
            render: () => LeaveRequestPage.render(),
            onEnter: () => LeaveRequestPage.init()
        });

        // Payslip page
        Router.register('payslip', {
            render: () => PayslipPage.render(),
            onEnter: () => PayslipPage.init()
        });

        // Payslip with specific month
        Router.register('payslip/:month', {
            render: (params) => PayslipPage.render(params),
            onEnter: (params) => PayslipPage.init(params)
        });

        // Performance/Goals page
        Router.register('performance', {
            render: () => PerformancePage.render(),
            onEnter: () => PerformancePage.init()
        });

        // Government Reports page
        Router.register('government-reports', {
            render: () => GovernmentReportsPage.render(),
            onEnter: () => GovernmentReportsPage.init()
        });

        // Payroll Processing page
        Router.register('payroll-processing', {
            render: () => PayrollProcessingPage.render(),
            onEnter: () => PayrollProcessingPage.init()
        });

        // Time Management page
        Router.register('time-management', {
            render: () => TimeManagementPage.render(),
            onEnter: () => TimeManagementPage.init()
        });

        // Payroll Setup page
        Router.register('payroll-setup', {
            render: () => PayrollSetupPage.render(),
            onEnter: () => PayrollSetupPage.init()
        });

        // Position Management page (Epic 1.2)
        Router.register('positions', {
            render: (params) => PositionManagementPage.render(params),
            onEnter: (params) => PositionManagementPage.init(params)
        });

        // Position Details page
        Router.register('positions/:id', {
            render: (params) => PositionManagementPage.render(params),
            onEnter: (params) => PositionManagementPage.init(params)
        });

        // Manager Dashboard page (Epic 3.3)
        Router.register('manager-dashboard', {
            render: () => ManagerDashboardPage.render(),
            onEnter: () => ManagerDashboardPage.init()
        });

        // Transfer Request page (Epic 2.1)
        Router.register('transfer-request', {
            render: (params) => TransferRequestPage.render(params),
            onEnter: (params) => TransferRequestPage.init(params)
        });

        // Transfer Request with specific ID
        Router.register('transfer-request/:id', {
            render: (params) => TransferRequestPage.render(params),
            onEnter: (params) => TransferRequestPage.init(params)
        });

        // Organization Chart page (Epic 1.1)
        Router.register('org-chart', {
            render: () => OrgChartPage.render(),
            onEnter: () => OrgChartPage.init()
        });

        // Error pages
        Router.register('404', {
            render: (params) => ErrorPage.render404(params),
            onEnter: (params) => ErrorPage.onEnter404(params)
        });

        Router.register('error', {
            render: (params) => ErrorPage.renderGenericError(params),
            onEnter: (params) => ErrorPage.onEnterGenericError(params)
        });

        Router.register('offline', {
            render: (params) => ErrorPage.renderOfflineError(params),
            onEnter: (params) => ErrorPage.onEnterOfflineError(params)
        });
    }

    /**
     * Initialize header component
     */
    function initHeader() {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = HeaderComponent.render();
            HeaderComponent.init();
        }
    }

    /**
     * Initialize mobile menu component
     */
    function initMobileMenu() {
        MobileMenuComponent.init();
    }

    /**
     * Set up global event handlers
     */
    function setupGlobalHandlers() {
        // Handle Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.hasOpenModal()) {
                ModalComponent.close();
            }
        });

        // Handle clicks outside dropdowns to close them
        document.addEventListener('click', (e) => {
            const dropdowns = document.querySelectorAll('.dropdown-menu.open');
            dropdowns.forEach(dropdown => {
                const trigger = dropdown.previousElementSibling;
                if (!dropdown.contains(e.target) && !trigger?.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        });

        // Handle language change
        AppState.subscribe('language', (lang) => {
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            // Re-render current page
            Router.refresh();
            initHeader();
            initMobileMenu();
        });

        // Handle loading state
        AppState.subscribe('isLoading', (isLoading) => {
            const loader = document.getElementById('global-loader');
            if (loader) {
                loader.style.display = isLoading ? 'flex' : 'none';
            }
        });

        // Handle errors
        AppState.subscribe('error', (error) => {
            if (error) {
                ToastComponent.error(error);
                AppState.setError(null); // Clear error after showing
            }
        });

        // Handle session timeout warning
        AppState.subscribe('showSessionWarning', (show) => {
            if (show) {
                const expiryTime = AppState.get('sessionExpiry');
                const now = Date.now();
                const minutesLeft = Math.ceil((expiryTime - now) / 60000);

                ModalComponent.open({
                    title: i18n.t('error.sessionExpiringSoon'),
                    content: `
                        <p class="text-gray-600 mb-4">
                            ${i18n.t('error.sessionExpiringDescription').replace('{minutes}', minutesLeft)}
                        </p>
                    `,
                    actions: [
                        {
                            label: i18n.t('common.continue'),
                            variant: 'primary',
                            onClick: () => {
                                // Extend session
                                API.updateSessionActivity();
                                ModalComponent.close();
                            }
                        },
                        {
                            label: i18n.t('nav.logout'),
                            variant: 'secondary',
                            onClick: () => {
                                // Clear session and redirect
                                localStorage.clear();
                                window.location.reload();
                            }
                        }
                    ]
                });
            }
        });

        // Handle session expiry
        AppState.subscribe('sessionExpired', (expired) => {
            if (expired) {
                ModalComponent.open({
                    title: i18n.t('error.sessionExpired'),
                    content: `
                        <p class="text-gray-600 mb-4">
                            ${i18n.t('error.sessionExpiredDescription')}
                        </p>
                    `,
                    actions: [
                        {
                            label: i18n.t('error.reload'),
                            variant: 'primary',
                            onClick: () => {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }
                    ]
                });
            }
        });
    }

    /**
     * Load initial data
     */
    async function loadInitialData() {
        try {
            AppState.setLoading(true);

            // Load current user
            const user = await API.getCurrentUser();
            AppState.set('currentUser', user);

            // Load employee data
            const employee = await API.getEmployee(user.employeeId);
            AppState.set('currentEmployee', employee);

            // Load notifications
            const notifications = await API.getNotifications(user.id);
            AppState.set('notifications', notifications);

            // Load pending workflows
            const workflows = await API.getPendingWorkflows(user.id, 'forApproval');
            AppState.set('pendingWorkflows', workflows);

        } catch (error) {
            console.error('Failed to load initial data:', error);
            AppState.setError(i18n.t('error.loadFailed'));
        } finally {
            AppState.setLoading(false);
        }
    }

    /**
     * Add global loading indicator
     */
    function addLoadingIndicator() {
        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.className = 'fixed inset-0 bg-black/30 flex items-center justify-center z-50';
        loader.style.display = 'none';
        loader.innerHTML = `
            <div class="bg-white rounded-lg p-6 shadow-xl flex items-center gap-4">
                <div class="w-8 h-8 border-4 border-cg-red border-t-transparent rounded-full spinner"></div>
                <span class="text-gray-700">${i18n.t('common.loading')}</span>
            </div>
        `;
        document.body.appendChild(loader);
    }

    /**
     * Add skip link for accessibility
     */
    function addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = i18n.t('accessibility.skipToContent');
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Initialize error handling components
     */
    function initErrorHandling() {
        // Initialize error boundary
        if (window.ErrorBoundary) {
            ErrorBoundary.init();
        }

        // Initialize connection status monitoring
        if (window.ConnectionStatus) {
            ConnectionStatus.init();
        }
    }

    /**
     * Set up session timeout monitoring
     */
    function setupSessionMonitoring() {
        // Initialize session
        API.initializeSession();

        // Check session timeout every minute
        setInterval(() => {
            API.checkSessionTimeout();
        }, 60000); // 1 minute
    }

    return {
        /**
         * Initialize the application
         */
        async init() {
            if (initialized) {
                console.warn('App already initialized');
                return;
            }

            console.log('Initializing Central Group HR System...');

            try {
                // Initialize i18n
                await i18n.init();

                // Add accessibility features
                addSkipLink();
                addLoadingIndicator();

                // Initialize error handling
                initErrorHandling();

                // Register routes (including error pages)
                registerRoutes();

                // Set up global handlers
                setupGlobalHandlers();

                // Set up session monitoring
                setupSessionMonitoring();

                // Initialize header
                initHeader();

                // Initialize mobile menu
                initMobileMenu();

                // Load initial data
                await loadInitialData();

                // Initialize router (this will render the initial route)
                Router.init();

                // Re-render route after data is loaded to ensure content displays
                // (fixes race condition where route renders before data is available)
                setTimeout(() => Router.refresh(), 0);

                initialized = true;
                console.log('App initialized successfully');

            } catch (error) {
                console.error('App initialization failed:', error);
                document.getElementById('main-content').innerHTML = `
                    <div class="flex flex-col items-center justify-center min-h-[60vh]">
                        <span class="material-icons text-6xl text-red-500 mb-4">error</span>
                        <h1 class="text-2xl font-bold text-gray-700 mb-2">${i18n.t('error.initFailed')}</h1>
                        <p class="text-gray-500 mb-6">${error.message}</p>
                        <button onclick="location.reload()" class="px-6 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                            ${i18n.t('common.retry')}
                        </button>
                    </div>
                `;
            }
        },

        /**
         * Get initialization status
         */
        isInitialized() {
            return initialized;
        },

        /**
         * Destroy app (for testing)
         */
        destroy() {
            initialized = false;
            AppState.reset();
            Router.clearHooks();
        }
    };
})();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}

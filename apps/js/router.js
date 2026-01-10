/**
 * Router Module
 * Hash-based client-side routing for SPA navigation
 */

const Router = (function() {
    // Route definitions
    const routes = new Map();
    let currentRoute = null;
    let beforeHooks = [];
    let afterHooks = [];

    // Parse hash to extract route and params
    function parseHash(hash) {
        const cleanHash = hash.replace(/^#\/?/, '') || 'home';
        const parts = cleanHash.split('/');
        const path = parts[0].split('?')[0];  // Strip query params from path
        const params = {};

        // Extract query parameters
        const queryIndex = cleanHash.indexOf('?');
        if (queryIndex !== -1) {
            const queryString = cleanHash.substring(queryIndex + 1);
            const searchParams = new URLSearchParams(queryString);
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
        }

        // Extract path parameters (e.g., /profile/:id)
        if (parts.length > 1) {
            params.id = parts[1].split('?')[0];
        }

        return { path, params };
    }

    // Find matching route
    function findRoute(path) {
        // Direct match
        if (routes.has(path)) {
            return { route: routes.get(path), path };
        }

        // Pattern match (e.g., profile/:id)
        for (const [routePath, config] of routes) {
            if (routePath.includes(':')) {
                const pattern = routePath.replace(/:[^/]+/g, '([^/]+)');
                const regex = new RegExp(`^${pattern}$`);
                if (regex.test(path)) {
                    return { route: config, path: routePath };
                }
            }
        }

        // 404 fallback - explicitly return 404 route with original path
        const notFoundRoute = routes.get('404');
        if (notFoundRoute) {
            return { route: notFoundRoute, path: '404', originalPath: path };
        }

        // Final fallback to home if no 404 route registered
        return { route: routes.get('home'), path: 'home', originalPath: path };
    }

    // Execute route change
    async function executeRoute(hash) {
        const { path, params } = parseHash(hash);
        const { route, path: matchedPath, originalPath } = findRoute(path);

        if (!route) {
            console.error('Route not found:', path);
            return;
        }

        // Add original path to params if this is a 404
        if (originalPath) {
            params.path = originalPath;
        }

        // Execute before hooks
        for (const hook of beforeHooks) {
            const result = await hook(matchedPath, params, currentRoute);
            if (result === false) {
                return; // Navigation cancelled
            }
        }

        // Update state
        const previousRoute = currentRoute;
        currentRoute = { path: matchedPath, params, config: route };
        AppState.set('currentView', matchedPath);

        // Call route handler
        try {
            AppState.setLoading(true);
            const content = document.getElementById('main-content');

            if (route.render) {
                const html = await route.render(params);
                if (content) {
                    content.innerHTML = html;
                }
            }

            if (route.onEnter) {
                await route.onEnter(params);
            }

            // Scroll to top
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Route execution error:', error);
            AppState.setError(error.message);

            // Handle error based on type
            handleError(error, matchedPath, params);
        } finally {
            AppState.setLoading(false);
        }

        // Execute after hooks
        for (const hook of afterHooks) {
            await hook(matchedPath, params, previousRoute);
        }
    }

    /**
     * Handle routing errors
     */
    function handleError(error, currentPath, params) {
        // Prevent infinite error loops
        if (currentPath === 'error' || currentPath === 'offline') {
            console.error('Error on error page, not redirecting to prevent loop:', error);
            return;
        }

        // Check if it's a network error
        const isNetworkError = error.isNetworkError ||
                              error.name === 'NetworkError' ||
                              (window.AppState && !AppState.get('isOnline'));

        if (isNetworkError) {
            // Navigate to offline error page
            const offlineRoute = routes.get('offline');
            if (offlineRoute) {
                window.location.hash = '#/offline';
            }
        } else {
            // Navigate to generic error page
            const errorRoute = routes.get('error');
            if (errorRoute) {
                window.location.hash = '#/error?type=runtime&message=' +
                    encodeURIComponent(error.message);
            }
        }
    }

    // Handle hash change event
    function handleHashChange() {
        executeRoute(window.location.hash);
    }

    return {
        /**
         * Initialize router
         */
        init() {
            window.addEventListener('hashchange', handleHashChange);

            // Set default hash if none exists
            if (!window.location.hash) {
                window.location.hash = '#/home';
            }

            // Always execute the current route on init
            handleHashChange();
        },

        /**
         * Register a route
         * @param {string} path - Route path (e.g., 'profile', 'profile/:id')
         * @param {object} config - Route configuration
         */
        register(path, config) {
            routes.set(path, config);
        },

        /**
         * Navigate to a route
         * @param {string} path - Route path
         * @param {object} params - Optional query parameters
         */
        navigate(path, params = {}) {
            let hash = `#/${path}`;

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (key !== 'id') {
                    queryParams.append(key, value);
                }
            });

            if (params.id) {
                hash += `/${params.id}`;
            }

            const queryString = queryParams.toString();
            if (queryString) {
                hash += `?${queryString}`;
            }

            window.location.hash = hash;
        },

        /**
         * Go back in history
         */
        back() {
            window.history.back();
        },

        /**
         * Go forward in history
         */
        forward() {
            window.history.forward();
        },

        /**
         * Get current route info
         * @returns {object}
         */
        getCurrentRoute() {
            return currentRoute;
        },

        /**
         * Add before navigation hook
         * @param {function} hook - Hook function (return false to cancel)
         */
        beforeEach(hook) {
            beforeHooks.push(hook);
        },

        /**
         * Add after navigation hook
         * @param {function} hook - Hook function
         */
        afterEach(hook) {
            afterHooks.push(hook);
        },

        /**
         * Remove all hooks
         */
        clearHooks() {
            beforeHooks = [];
            afterHooks = [];
        },

        /**
         * Get all registered routes
         * @returns {Map}
         */
        getRoutes() {
            return new Map(routes);
        },

        /**
         * Generate URL for a route
         * @param {string} path
         * @param {object} params
         * @returns {string}
         */
        generateUrl(path, params = {}) {
            let url = `#/${path}`;

            if (params.id) {
                url += `/${params.id}`;
            }

            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (key !== 'id') {
                    queryParams.append(key, value);
                }
            });

            const queryString = queryParams.toString();
            if (queryString) {
                url += `?${queryString}`;
            }

            return url;
        },

        /**
         * Check if path matches current route
         * @param {string} path
         * @returns {boolean}
         */
        isActive(path) {
            return currentRoute && currentRoute.path === path;
        },

        /**
         * Refresh current route
         */
        refresh() {
            if (currentRoute) {
                executeRoute(window.location.hash);
            }
        },

        /**
         * Handle routing error
         * @param {Error} error
         */
        handleError(error) {
            const currentPath = currentRoute ? currentRoute.path : '';
            const params = currentRoute ? currentRoute.params : {};
            handleError(error, currentPath, params);
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Router;
}

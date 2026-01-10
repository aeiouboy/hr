/**
 * State Management Module
 * Simple pub/sub state management for the HR application
 */

const AppState = (function() {
    // Private state object
    let state = {
        currentUser: null,
        currentEmployee: null,
        language: localStorage.getItem('language') || 'en',
        notifications: [],
        pendingWorkflows: [],
        isLoading: false,
        error: null,
        currentView: 'home',
        activeTab: 'personal',
        modalStack: [],
        history: [],
        // Error handling and network status
        isOnline: true,
        errorType: null,
        errorMessage: null,
        errorStack: null,
        // Session management
        sessionExpiry: null,
        sessionExpired: false,
        showSessionWarning: false
    };

    // Subscribers for state changes
    const subscribers = new Map();

    // Deep clone utility with circular reference protection
    function deepClone(obj, excludeKeys = []) {
        if (obj === null || typeof obj !== 'object') return obj;

        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => deepClone(item, excludeKeys));
        }

        // Handle objects
        const cloned = {};
        for (const key of Object.keys(obj)) {
            if (!excludeKeys.includes(key)) {
                cloned[key] = deepClone(obj[key], excludeKeys);
            }
        }
        return cloned;
    }

    // Generate unique subscriber ID
    let subscriberId = 0;
    function generateId() {
        return `sub_${++subscriberId}`;
    }

    return {
        /**
         * Get current state or specific key
         * @param {string} key - Optional key to get specific state value
         * @returns {*} State value(s)
         */
        get(key) {
            if (key) {
                return deepClone(state[key]);
            }
            return deepClone(state);
        },

        /**
         * Set state value(s)
         * @param {string|object} keyOrUpdate - Key to update or object with updates
         * @param {*} value - Value to set (if key is string)
         */
        set(keyOrUpdate, value) {
            let updates = {};

            if (typeof keyOrUpdate === 'string') {
                updates[keyOrUpdate] = value;
            } else {
                updates = keyOrUpdate;
            }

            // Track previous state for history (exclude history to prevent recursion)
            const previousState = deepClone(state, ['history']);

            // Apply updates
            Object.keys(updates).forEach(key => {
                state[key] = updates[key];
            });

            // Store in history (limited to last 50 changes)
            state.history = [
                { timestamp: Date.now(), changes: updates, previous: previousState },
                ...state.history.slice(0, 49)
            ];

            // Notify subscribers
            this.notify(Object.keys(updates));
        },

        /**
         * Subscribe to state changes
         * @param {string|string[]} keys - Key(s) to subscribe to
         * @param {function} callback - Callback function
         * @returns {string} Subscriber ID for unsubscribing
         */
        subscribe(keys, callback) {
            const id = generateId();
            const keyArray = Array.isArray(keys) ? keys : [keys];

            keyArray.forEach(key => {
                if (!subscribers.has(key)) {
                    subscribers.set(key, new Map());
                }
                subscribers.get(key).set(id, callback);
            });

            return id;
        },

        /**
         * Unsubscribe from state changes
         * @param {string} id - Subscriber ID
         */
        unsubscribe(id) {
            subscribers.forEach(keySubscribers => {
                keySubscribers.delete(id);
            });
        },

        /**
         * Notify subscribers of state changes
         * @param {string[]} keys - Keys that changed
         */
        notify(keys) {
            keys.forEach(key => {
                if (subscribers.has(key)) {
                    subscribers.get(key).forEach(callback => {
                        try {
                            callback(state[key], key);
                        } catch (error) {
                            console.error('State subscriber error:', error);
                        }
                    });
                }
            });

            // Also notify '*' subscribers (listen to all changes)
            if (subscribers.has('*')) {
                subscribers.get('*').forEach(callback => {
                    try {
                        callback(state, keys);
                    } catch (error) {
                        console.error('State subscriber error:', error);
                    }
                });
            }
        },

        /**
         * Reset state to initial values
         * @param {string[]} keys - Optional keys to reset (defaults to all)
         */
        reset(keys) {
            const initialState = {
                currentUser: null,
                currentEmployee: null,
                language: localStorage.getItem('language') || 'en',
                notifications: [],
                pendingWorkflows: [],
                isLoading: false,
                error: null,
                currentView: 'home',
                activeTab: 'personal',
                modalStack: [],
                history: []
            };

            if (keys) {
                const updates = {};
                keys.forEach(key => {
                    if (key in initialState) {
                        updates[key] = initialState[key];
                    }
                });
                this.set(updates);
            } else {
                state = initialState;
                this.notify(Object.keys(state));
            }
        },

        /**
         * Toggle loading state
         * @param {boolean} isLoading
         */
        setLoading(isLoading) {
            this.set('isLoading', isLoading);
        },

        /**
         * Set error state
         * @param {string|null} error
         */
        setError(error) {
            this.set('error', error);
        },

        /**
         * Add notification
         * @param {object} notification
         */
        addNotification(notification) {
            const notifications = this.get('notifications');
            notifications.unshift({
                id: `notif_${Date.now()}`,
                timestamp: new Date().toISOString(),
                read: false,
                ...notification
            });
            this.set('notifications', notifications);
        },

        /**
         * Mark notification as read
         * @param {string} id
         */
        markNotificationRead(id) {
            const notifications = this.get('notifications');
            const notification = notifications.find(n => n.id === id);
            if (notification) {
                notification.read = true;
                this.set('notifications', notifications);
            }
        },

        /**
         * Get unread notification count
         * @returns {number}
         */
        getUnreadCount() {
            return state.notifications.filter(n => !n.read).length;
        },

        /**
         * Push modal to stack
         * @param {object} modal
         */
        pushModal(modal) {
            const modalStack = this.get('modalStack');
            modalStack.push(modal);
            this.set('modalStack', modalStack);
        },

        /**
         * Pop modal from stack
         * @returns {object|undefined}
         */
        popModal() {
            const modalStack = this.get('modalStack');
            const modal = modalStack.pop();
            this.set('modalStack', modalStack);
            return modal;
        },

        /**
         * Check if any modal is open
         * @returns {boolean}
         */
        hasOpenModal() {
            return state.modalStack.length > 0;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppState;
}

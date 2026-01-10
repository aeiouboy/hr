/**
 * Notification Bell Component
 * Bell icon with badge count and dropdown
 */

const NotificationBellComponent = (function() {
    let isOpen = false;

    return {
        /**
         * Render notification bell
         * @param {number} count - Unread count
         * @returns {string}
         */
        render(count = 0) {
            return `
                <div class="relative">
                    <button class="p-2 hover:bg-gray-100 rounded-full relative min-h-[44px] min-w-[44px]"
                            onclick="NotificationBellComponent.toggle()"
                            aria-label="${count > 0 ? i18n.t('accessibility.notificationsWithCount').replace('{count}', count) : i18n.t('accessibility.notifications')}"
                            aria-haspopup="true"
                            aria-expanded="false"
                            id="notification-btn">
                        <span class="material-icons text-gray-600" aria-hidden="true">notifications</span>
                        <span id="notification-badge"
                              class="${count === 0 ? 'hidden' : ''} absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center badge-pulse"
                              aria-hidden="true">
                            ${count > 99 ? '99+' : count}
                        </span>
                    </button>

                    <div id="notification-dropdown"
                         class="dropdown-menu absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-xl border"
                         role="menu">
                        <div class="flex items-center justify-between px-4 py-3 border-b">
                            <h3 class="font-semibold text-gray-900">${i18n.t('accessibility.notifications')}</h3>
                            <button class="text-sm text-cg-info hover:text-blue-700"
                                    onclick="NotificationBellComponent.markAllRead()">
                                ${i18n.isThai() ? 'อ่านทั้งหมด' : 'Mark all read'}
                            </button>
                        </div>
                        <div id="notification-list" class="max-h-96 overflow-y-auto">
                            ${this.renderNotifications()}
                        </div>
                        <div class="px-4 py-3 border-t text-center">
                            <a href="#/workflows" class="text-sm text-cg-info hover:text-blue-700" onclick="NotificationBellComponent.toggle()">
                                ${i18n.t('common.viewMore')}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render notification list
         * @returns {string}
         */
        renderNotifications() {
            const notifications = AppState.get('notifications') || [];

            if (notifications.length === 0) {
                return `
                    <div class="py-8 text-center text-gray-500">
                        <span class="material-icons text-3xl mb-2" aria-hidden="true">notifications_none</span>
                        <p class="text-sm">${i18n.isThai() ? 'ไม่มีการแจ้งเตือน' : 'No notifications'}</p>
                    </div>
                `;
            }

            return notifications.slice(0, 10).map(notification => {
                const isThai = i18n.isThai();
                const title = isThai ? (notification.titleTh || notification.title) : notification.title;
                const message = isThai ? (notification.messageTh || notification.message) : notification.message;
                const timeAgo = DateUtils.formatRelative(notification.timestamp);

                const icons = {
                    workflow_pending: 'assignment',
                    workflow_approved: 'check_circle',
                    workflow_rejected: 'cancel',
                    info: 'info',
                    reminder: 'schedule',
                    alert: 'warning'
                };

                const iconColors = {
                    workflow_pending: 'text-orange-500',
                    workflow_approved: 'text-green-500',
                    workflow_rejected: 'text-red-500',
                    info: 'text-blue-500',
                    reminder: 'text-purple-500',
                    alert: 'text-yellow-500'
                };

                return `
                    <div class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${notification.read ? '' : 'bg-blue-50/50'}"
                         onclick="NotificationBellComponent.handleClick('${notification.id}', '${notification.actionUrl || ''}')"
                         role="menuitem"
                         tabindex="0"
                         onkeydown="if(event.key==='Enter'||event.key===' ') NotificationBellComponent.handleClick('${notification.id}', '${notification.actionUrl || ''}')">
                        <div class="flex gap-3">
                            <span class="material-icons ${iconColors[notification.type] || 'text-gray-500'} mt-0.5" aria-hidden="true">
                                ${icons[notification.type] || 'notifications'}
                            </span>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 ${notification.read ? '' : 'font-semibold'}">${title}</p>
                                <p class="text-sm text-gray-600 truncate">${message}</p>
                                <p class="text-xs text-gray-400 mt-1">${timeAgo}</p>
                            </div>
                            ${!notification.read ? '<span class="w-2 h-2 bg-cg-info rounded-full mt-2" aria-label="' + (i18n.isThai() ? 'ยังไม่ได้อ่าน' : 'Unread') + '"></span>' : ''}
                        </div>
                    </div>
                `;
            }).join('');
        },

        /**
         * Toggle dropdown
         */
        toggle() {
            isOpen = !isOpen;

            const dropdown = document.getElementById('notification-dropdown');
            const btn = document.getElementById('notification-btn');

            if (dropdown) {
                dropdown.classList.toggle('open', isOpen);
            }

            if (btn) {
                btn.setAttribute('aria-expanded', isOpen);
            }
        },

        /**
         * Handle notification click
         * @param {string} id
         * @param {string} actionUrl
         */
        handleClick(id, actionUrl) {
            // Mark as read
            AppState.markNotificationRead(id);

            // Close dropdown
            this.toggle();

            // Navigate if action URL provided
            if (actionUrl) {
                window.location.hash = actionUrl;
            }

            // Refresh notification list
            this.refresh();
        },

        /**
         * Mark all notifications as read
         */
        markAllRead() {
            const notifications = AppState.get('notifications') || [];
            notifications.forEach(n => {
                n.read = true;
            });
            AppState.set('notifications', notifications);
            this.refresh();
            ToastComponent.success(i18n.isThai() ? 'อ่านทั้งหมดแล้ว' : 'All marked as read');
        },

        /**
         * Refresh notification list
         */
        refresh() {
            const list = document.getElementById('notification-list');
            if (list) {
                list.innerHTML = this.renderNotifications();
            }

            // Update badge
            const count = AppState.getUnreadCount();
            const badge = document.getElementById('notification-badge');
            if (badge) {
                badge.textContent = count > 99 ? '99+' : count;
                badge.classList.toggle('hidden', count === 0);
            }
        },

        /**
         * Add new notification
         * @param {object} notification
         */
        addNotification(notification) {
            AppState.addNotification(notification);
            this.refresh();

            // Show toast for important notifications
            if (notification.type === 'workflow_pending' || notification.type === 'alert') {
                const isThai = i18n.isThai();
                ToastComponent.info(isThai ? (notification.titleTh || notification.title) : notification.title);
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationBellComponent;
}

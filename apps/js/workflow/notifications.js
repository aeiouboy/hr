/**
 * Workflow Notifications
 * In-app notification system for workflow events
 */

const WorkflowNotifications = (function() {
    return {
        /**
         * Notify approver of new request
         * @param {object} workflow
         */
        notifyApprover(workflow) {
            const currentApprover = workflow.approvers[workflow.currentStep - 1];
            if (!currentApprover) return;

            const isThai = i18n.isThai();
            const requestType = MockLookupData.requestTypes.find(t => t.value === workflow.type);
            const typeLabel = requestType
                ? (isThai ? requestType.labelTh : requestType.labelEn)
                : workflow.type;

            const notification = {
                type: 'workflow_pending',
                title: isThai ? 'คำขออนุมัติใหม่' : 'New Approval Request',
                titleTh: 'คำขออนุมัติใหม่',
                message: `${workflow.requestedBy.name} submitted a ${typeLabel.toLowerCase()} request`,
                messageTh: `${workflow.requestedBy.nameTh || workflow.requestedBy.name} ส่งคำขอ${typeLabel}`,
                actionUrl: '#/workflows',
                relatedId: workflow.id,
                recipientId: currentApprover.user?.id
            };

            // Add to state
            AppState.addNotification(notification);

            // In real app, would also send email/push notification
            this.sendEmail(currentApprover.user, notification);
        },

        /**
         * Notify requester of workflow status change
         * @param {object} workflow
         * @param {string} status - approved, rejected, sentBack
         */
        notifyRequester(workflow, status) {
            const isThai = i18n.isThai();
            const requestType = MockLookupData.requestTypes.find(t => t.value === workflow.type);
            const typeLabel = requestType
                ? (isThai ? requestType.labelTh : requestType.labelEn)
                : workflow.type;

            const statusMessages = {
                approved: {
                    type: 'workflow_approved',
                    title: isThai ? 'คำขอได้รับการอนุมัติ' : 'Request Approved',
                    message: isThai
                        ? `คำขอ${typeLabel}ของคุณได้รับการอนุมัติแล้ว`
                        : `Your ${typeLabel.toLowerCase()} request has been approved`
                },
                rejected: {
                    type: 'workflow_rejected',
                    title: isThai ? 'คำขอถูกปฏิเสธ' : 'Request Rejected',
                    message: isThai
                        ? `คำขอ${typeLabel}ของคุณถูกปฏิเสธ`
                        : `Your ${typeLabel.toLowerCase()} request has been rejected`
                },
                sentBack: {
                    type: 'workflow_sentback',
                    title: isThai ? 'คำขอถูกส่งกลับ' : 'Request Sent Back',
                    message: isThai
                        ? `คำขอ${typeLabel}ของคุณถูกส่งกลับเพื่อแก้ไข`
                        : `Your ${typeLabel.toLowerCase()} request has been sent back for revision`
                }
            };

            const notifConfig = statusMessages[status];
            if (!notifConfig) return;

            const notification = {
                ...notifConfig,
                titleTh: notifConfig.title,
                messageTh: notifConfig.message,
                actionUrl: '#/workflows',
                relatedId: workflow.id,
                recipientId: workflow.requestedBy.id
            };

            // Add to state (for demo, add to current user's notifications)
            AppState.addNotification(notification);

            // In real app, would send to actual requester
            this.sendEmail({ id: workflow.requestedBy.id }, notification);
        },

        /**
         * Send email notification (mock)
         * @param {object} recipient
         * @param {object} notification
         */
        sendEmail(recipient, notification) {
            // In real app, would call email API
            console.log('Email notification sent:', {
                to: recipient?.id,
                subject: notification.title,
                body: notification.message
            });
        },

        /**
         * Send reminder for pending approvals
         * @param {array} workflows
         */
        sendReminders(workflows) {
            workflows.forEach(workflow => {
                const currentApprover = workflow.approvers[workflow.currentStep - 1];
                if (!currentApprover) return;

                // Check if request is older than 24 hours
                const submittedAt = new Date(workflow.submittedAt);
                const now = new Date();
                const hoursSinceSubmission = (now - submittedAt) / (1000 * 60 * 60);

                if (hoursSinceSubmission >= 24) {
                    const isThai = i18n.isThai();

                    const notification = {
                        type: 'reminder',
                        title: isThai ? 'เตือนคำขอรออนุมัติ' : 'Pending Approval Reminder',
                        titleTh: 'เตือนคำขอรออนุมัติ',
                        message: isThai
                            ? `คุณมีคำขอจาก ${workflow.requestedBy.nameTh || workflow.requestedBy.name} ที่รอการอนุมัติ`
                            : `You have a pending request from ${workflow.requestedBy.name}`,
                        messageTh: `คุณมีคำขอจาก ${workflow.requestedBy.nameTh || workflow.requestedBy.name} ที่รอการอนุมัติ`,
                        actionUrl: '#/workflows',
                        relatedId: workflow.id
                    };

                    AppState.addNotification(notification);
                }
            });
        },

        /**
         * Get unread notification count for workflow-related items
         * @returns {number}
         */
        getWorkflowNotificationCount() {
            const notifications = AppState.get('notifications') || [];
            return notifications.filter(n =>
                !n.read && n.type.startsWith('workflow_')
            ).length;
        },

        /**
         * Mark all workflow notifications as read
         */
        markAllWorkflowNotificationsRead() {
            const notifications = AppState.get('notifications') || [];
            notifications.forEach(n => {
                if (n.type.startsWith('workflow_')) {
                    n.read = true;
                }
            });
            AppState.set('notifications', notifications);
        },

        /**
         * Create system notification for effective date
         * @param {object} workflow
         */
        notifyEffectiveDateReached(workflow) {
            const today = new Date();
            const effectiveDate = new Date(workflow.effectiveDate);

            if (DateUtils.isToday(effectiveDate) && workflow.status === 'approved') {
                const isThai = i18n.isThai();
                const requestType = MockLookupData.requestTypes.find(t => t.value === workflow.type);
                const typeLabel = requestType
                    ? (isThai ? requestType.labelTh : requestType.labelEn)
                    : workflow.type;

                const notification = {
                    type: 'info',
                    title: isThai ? 'การเปลี่ยนแปลงมีผลแล้ว' : 'Change Effective Today',
                    titleTh: 'การเปลี่ยนแปลงมีผลแล้ว',
                    message: isThai
                        ? `การเปลี่ยนแปลง${typeLabel}ของคุณมีผลตั้งแต่วันนี้`
                        : `Your ${typeLabel.toLowerCase()} change is now effective`,
                    messageTh: `การเปลี่ยนแปลง${typeLabel}ของคุณมีผลตั้งแต่วันนี้`,
                    actionUrl: '#/profile',
                    relatedId: workflow.id
                };

                AppState.addNotification(notification);
            }
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowNotifications;
}

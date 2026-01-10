/**
 * Manager Dashboard Page
 * Manager Self-Service Dashboard (Epic 3.3)
 */

const ManagerDashboardPage = (function() {
    // State
    let currentTab = 'overview';
    let selectedMembers = new Set();
    let selectedApprovals = new Set();
    let memberFilter = 'all';
    let memberSearch = '';

    /**
     * Check if user is a manager
     * @returns {boolean}
     */
    function isManagerAccess() {
        return RBAC.isManager() || RBAC.isHR();
    }

    /**
     * Get filtered team members
     * @returns {array}
     */
    function getFilteredMembers() {
        let members = MockTeamData.teamMembers || [];

        // Apply status filter
        if (memberFilter !== 'all') {
            members = members.filter(m => {
                if (memberFilter === 'active') return m.status === 'active';
                if (memberFilter === 'on_leave') return m.status === 'on_leave';
                if (memberFilter === 'probation') return m.probationStatus === 'in_progress';
                return true;
            });
        }

        // Apply search filter
        if (memberSearch) {
            const search = memberSearch.toLowerCase();
            members = members.filter(m =>
                m.firstNameEn.toLowerCase().includes(search) ||
                m.lastNameEn.toLowerCase().includes(search) ||
                m.firstNameTh?.includes(search) ||
                m.lastNameTh?.includes(search) ||
                m.employeeId.toLowerCase().includes(search) ||
                m.nickname?.toLowerCase().includes(search)
            );
        }

        return members;
    }

    /**
     * Get approvals grouped by type
     * @returns {object}
     */
    function getGroupedApprovals() {
        const approvals = MockTeamData.pendingApprovals || [];
        return {
            leave: approvals.filter(a => a.type === 'leave'),
            expense: approvals.filter(a => a.type === 'expense'),
            change_request: approvals.filter(a => a.type === 'change_request')
        };
    }

    /**
     * Handle bulk approve
     */
    function handleBulkApprove() {
        if (selectedApprovals.size === 0) {
            ToastComponent.warning(i18n.isThai() ? 'กรุณาเลือกคำขอที่ต้องการอนุมัติ' : 'Please select requests to approve');
            return;
        }

        ModalComponent.confirm({
            title: i18n.isThai() ? 'ยืนยันการอนุมัติ' : 'Confirm Approval',
            message: i18n.isThai()
                ? `คุณต้องการอนุมัติ ${selectedApprovals.size} รายการหรือไม่?`
                : `Are you sure you want to approve ${selectedApprovals.size} request(s)?`,
            confirmText: i18n.isThai() ? 'อนุมัติ' : 'Approve',
            confirmVariant: 'success',
            onConfirm: () => {
                ToastComponent.success(i18n.isThai()
                    ? `อนุมัติ ${selectedApprovals.size} รายการสำเร็จ`
                    : `${selectedApprovals.size} request(s) approved successfully`);
                selectedApprovals.clear();
                Router.refresh();
            }
        });
    }

    /**
     * Handle bulk reject
     */
    function handleBulkReject() {
        if (selectedApprovals.size === 0) {
            ToastComponent.warning(i18n.isThai() ? 'กรุณาเลือกคำขอที่ต้องการปฏิเสธ' : 'Please select requests to reject');
            return;
        }

        ModalComponent.confirm({
            title: i18n.isThai() ? 'ยืนยันการปฏิเสธ' : 'Confirm Rejection',
            message: i18n.isThai()
                ? `คุณต้องการปฏิเสธ ${selectedApprovals.size} รายการหรือไม่?`
                : `Are you sure you want to reject ${selectedApprovals.size} request(s)?`,
            confirmText: i18n.isThai() ? 'ปฏิเสธ' : 'Reject',
            confirmVariant: 'danger',
            onConfirm: () => {
                ToastComponent.success(i18n.isThai()
                    ? `ปฏิเสธ ${selectedApprovals.size} รายการสำเร็จ`
                    : `${selectedApprovals.size} request(s) rejected`);
                selectedApprovals.clear();
                Router.refresh();
            }
        });
    }

    /**
     * Render access denied page
     * @returns {string}
     */
    function renderAccessDenied() {
        const isThai = i18n.isThai();
        return `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div class="text-center">
                    <span class="material-icons text-6xl text-red-500 mb-4">lock</span>
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">
                        ${isThai ? 'ไม่มีสิทธิ์เข้าถึง' : 'Access Denied'}
                    </h1>
                    <p class="text-gray-500 mb-6">
                        ${isThai ? 'หน้านี้สำหรับผู้จัดการเท่านั้น' : 'This page is for managers only'}
                    </p>
                    <a href="#/home" class="inline-flex items-center px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                        <span class="material-icons mr-2">arrow_back</span>
                        ${i18n.t('common.backToHome')}
                    </a>
                </div>
            </div>
        `;
    }

    return {
        /**
         * Render the manager dashboard
         * @returns {string}
         */
        render() {
            // Check access
            if (!isManagerAccess()) {
                return renderAccessDenied();
            }

            const isThai = i18n.isThai();
            const stats = MockTeamData.getTeamStats();
            const notifications = MockTeamData.teamNotifications || [];
            const highPriorityNotifications = notifications.filter(n => n.priority === 'high');

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="mb-6">
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                            ${isThai ? 'แดชบอร์ดผู้จัดการ' : 'Manager Dashboard'}
                        </h1>
                        <p class="text-gray-500 mt-1">
                            ${isThai ? 'จัดการทีมและอนุมัติคำขอของคุณ' : 'Manage your team and approve requests'}
                        </p>
                    </div>

                    <!-- Quick Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        ${this.renderStatCard({
                            icon: 'group',
                            iconBg: 'bg-blue-100',
                            iconColor: 'text-blue-600',
                            value: stats.totalMembers,
                            label: isThai ? 'สมาชิกทีม' : 'Team Members'
                        })}
                        ${this.renderStatCard({
                            icon: 'check_circle',
                            iconBg: 'bg-green-100',
                            iconColor: 'text-green-600',
                            value: stats.activeToday,
                            label: isThai ? 'ทำงานวันนี้' : 'Active Today'
                        })}
                        ${this.renderStatCard({
                            icon: 'beach_access',
                            iconBg: 'bg-orange-100',
                            iconColor: 'text-orange-600',
                            value: stats.onLeaveToday,
                            label: isThai ? 'ลาวันนี้' : 'On Leave Today'
                        })}
                        ${this.renderStatCard({
                            icon: 'pending_actions',
                            iconBg: 'bg-purple-100',
                            iconColor: 'text-purple-600',
                            value: stats.pendingApprovals,
                            label: isThai ? 'รออนุมัติ' : 'Pending',
                            link: '#pending-approvals'
                        })}
                        ${this.renderStatCard({
                            icon: 'hourglass_empty',
                            iconBg: 'bg-amber-100',
                            iconColor: 'text-amber-600',
                            value: stats.inProbation,
                            label: isThai ? 'ทดลองงาน' : 'In Probation'
                        })}
                    </div>

                    <!-- Urgent Alerts -->
                    ${highPriorityNotifications.length > 0 ? `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div class="flex items-start gap-3">
                                <span class="material-icons text-red-500">warning</span>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-red-800 mb-2">
                                        ${isThai ? 'แจ้งเตือนสำคัญ' : 'Important Alerts'}
                                    </h3>
                                    <ul class="space-y-1">
                                        ${highPriorityNotifications.map(n => `
                                            <li class="text-sm text-red-700">
                                                <span class="material-icons text-sm align-middle mr-1">${n.icon}</span>
                                                ${isThai ? n.messageTh : n.message}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Main Content Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Left Column: Team Members & Approvals -->
                        <div class="lg:col-span-2 space-y-6">
                            <!-- Team Members Section -->
                            <section id="team-members" class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="p-4 border-b">
                                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <h2 class="text-lg font-semibold text-gray-900">
                                            ${isThai ? 'สมาชิกในทีม' : 'Team Members'}
                                        </h2>
                                        <div class="flex flex-wrap gap-2">
                                            <!-- Search -->
                                            <div class="relative">
                                                <input type="text"
                                                       id="member-search"
                                                       placeholder="${isThai ? 'ค้นหา...' : 'Search...'}"
                                                       value="${memberSearch}"
                                                       class="pl-8 pr-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-cg-red focus:border-transparent w-40"
                                                       oninput="ManagerDashboardPage.handleMemberSearch(this.value)">
                                                <span class="material-icons text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 text-sm">search</span>
                                            </div>
                                            <!-- Filter -->
                                            <select id="member-filter"
                                                    class="px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-cg-red focus:border-transparent"
                                                    onchange="ManagerDashboardPage.handleMemberFilter(this.value)">
                                                <option value="all" ${memberFilter === 'all' ? 'selected' : ''}>${isThai ? 'ทั้งหมด' : 'All'}</option>
                                                <option value="active" ${memberFilter === 'active' ? 'selected' : ''}>${isThai ? 'ทำงาน' : 'Active'}</option>
                                                <option value="on_leave" ${memberFilter === 'on_leave' ? 'selected' : ''}>${isThai ? 'ลา' : 'On Leave'}</option>
                                                <option value="probation" ${memberFilter === 'probation' ? 'selected' : ''}>${isThai ? 'ทดลองงาน' : 'Probation'}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                ${this.renderTeamMembersList()}
                            </section>

                            <!-- Pending Approvals Section -->
                            <section id="pending-approvals" class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="p-4 border-b">
                                    <div class="flex items-center justify-between">
                                        <h2 class="text-lg font-semibold text-gray-900">
                                            ${isThai ? 'คำขอรออนุมัติ' : 'Pending Approvals'}
                                            <span class="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-800 rounded-full">
                                                ${stats.pendingApprovals}
                                            </span>
                                        </h2>
                                        ${stats.pendingApprovals > 0 ? `
                                            <div class="flex gap-2">
                                                <button onclick="ManagerDashboardPage.handleBulkApprove()"
                                                        class="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                                        ${selectedApprovals.size === 0 ? 'disabled' : ''}>
                                                    <span class="material-icons text-sm align-middle mr-1">check</span>
                                                    ${isThai ? 'อนุมัติ' : 'Approve'}
                                                </button>
                                                <button onclick="ManagerDashboardPage.handleBulkReject()"
                                                        class="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                                        ${selectedApprovals.size === 0 ? 'disabled' : ''}>
                                                    <span class="material-icons text-sm align-middle mr-1">close</span>
                                                    ${isThai ? 'ปฏิเสธ' : 'Reject'}
                                                </button>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                                ${this.renderPendingApprovals()}
                            </section>
                        </div>

                        <!-- Right Column: Calendar & Notifications -->
                        <div class="space-y-6">
                            <!-- Team Calendar -->
                            <section>
                                <h2 class="text-lg font-semibold text-gray-900 mb-3">
                                    ${isThai ? 'ปฏิทินทีม' : 'Team Calendar'}
                                </h2>
                                ${TeamCalendarComponent.render({
                                    teamLeaves: MockTeamData.teamLeaves,
                                    teamMembers: MockTeamData.teamMembers,
                                    containerId: 'team-calendar'
                                })}
                            </section>

                            <!-- Team Notifications -->
                            <section class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="p-4 border-b">
                                    <h2 class="text-lg font-semibold text-gray-900">
                                        ${isThai ? 'การแจ้งเตือน' : 'Notifications'}
                                    </h2>
                                </div>
                                ${this.renderTeamNotifications()}
                            </section>

                            <!-- Team Organization Mini-Chart -->
                            <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <h2 class="text-lg font-semibold text-gray-900 mb-3">
                                    ${isThai ? 'โครงสร้างทีม' : 'Team Structure'}
                                </h2>
                                ${this.renderMiniOrgChart()}
                            </section>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render stat card
         * @param {object} options
         * @returns {string}
         */
        renderStatCard(options) {
            const { icon, iconBg, iconColor, value, label, link } = options;
            const Tag = link ? 'a' : 'div';
            const linkAttrs = link ? `href="${link}"` : '';

            return `
                <${Tag} ${linkAttrs} class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${link ? 'hover:shadow-md hover:border-gray-300 transition cursor-pointer' : ''}">
                    <div class="flex items-center gap-3">
                        <div class="${iconBg} p-2 rounded-lg">
                            <span class="material-icons ${iconColor}">${icon}</span>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-gray-900">${value}</p>
                            <p class="text-xs text-gray-500">${label}</p>
                        </div>
                    </div>
                </${Tag}>
            `;
        },

        /**
         * Render team members list
         * @returns {string}
         */
        renderTeamMembersList() {
            const isThai = i18n.isThai();
            const members = getFilteredMembers();

            if (members.length === 0) {
                return `
                    <div class="p-8 text-center text-gray-500">
                        <span class="material-icons text-4xl mb-2">search_off</span>
                        <p>${isThai ? 'ไม่พบสมาชิก' : 'No members found'}</p>
                    </div>
                `;
            }

            return `
                <div class="divide-y">
                    ${members.map(member => {
                        const name = isThai
                            ? `${member.firstNameTh} ${member.lastNameTh}`
                            : `${member.firstNameEn} ${member.lastNameEn}`;
                        const position = isThai ? member.positionTh : member.position;

                        const statusConfig = {
                            active: { bg: 'bg-green-100', text: 'text-green-800', label: isThai ? 'ทำงาน' : 'Active' },
                            on_leave: { bg: 'bg-orange-100', text: 'text-orange-800', label: isThai ? 'ลา' : 'On Leave' },
                            probation: { bg: 'bg-amber-100', text: 'text-amber-800', label: isThai ? 'ทดลองงาน' : 'Probation' }
                        };

                        const displayStatus = member.probationStatus === 'in_progress' ? 'probation' : member.status;
                        const status = statusConfig[displayStatus] || statusConfig.active;

                        return `
                            <div class="p-4 hover:bg-gray-50 transition">
                                <div class="flex items-center gap-4">
                                    <img src="${member.photo}" alt="${name}"
                                         class="w-12 h-12 rounded-full object-cover flex-shrink-0">
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center gap-2">
                                            <p class="font-medium text-gray-900 truncate">${name}</p>
                                            <span class="px-2 py-0.5 text-xs rounded-full ${status.bg} ${status.text}">
                                                ${status.label}
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-500 truncate">${position}</p>
                                        <p class="text-xs text-gray-400">${member.employeeId}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button onclick="ManagerDashboardPage.viewProfile('${member.id}')"
                                                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                title="${isThai ? 'ดูโปรไฟล์' : 'View Profile'}">
                                            <span class="material-icons text-sm">person</span>
                                        </button>
                                        <button onclick="ManagerDashboardPage.requestLeaveFor('${member.id}')"
                                                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                title="${isThai ? 'ขอลาแทน' : 'Request Leave'}">
                                            <span class="material-icons text-sm">event_busy</span>
                                        </button>
                                        <button onclick="ManagerDashboardPage.editAssignment('${member.id}')"
                                                class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                title="${isThai ? 'แก้ไขมอบหมาย' : 'Edit Assignment'}">
                                            <span class="material-icons text-sm">edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render pending approvals
         * @returns {string}
         */
        renderPendingApprovals() {
            const isThai = i18n.isThai();
            const grouped = getGroupedApprovals();
            const allApprovals = MockTeamData.pendingApprovals || [];

            if (allApprovals.length === 0) {
                return `
                    <div class="p-8 text-center text-gray-500">
                        <span class="material-icons text-4xl mb-2">check_circle</span>
                        <p>${isThai ? 'ไม่มีคำขอรออนุมัติ' : 'No pending approvals'}</p>
                    </div>
                `;
            }

            const renderApprovalGroup = (title, icon, approvals) => {
                if (approvals.length === 0) return '';

                return `
                    <div class="border-b last:border-b-0">
                        <div class="px-4 py-2 bg-gray-50 flex items-center gap-2">
                            <span class="material-icons text-gray-500 text-sm">${icon}</span>
                            <span class="text-sm font-medium text-gray-700">${title}</span>
                            <span class="px-1.5 py-0.5 text-xs bg-gray-200 text-gray-600 rounded">${approvals.length}</span>
                        </div>
                        <div class="divide-y">
                            ${approvals.map(approval => this.renderApprovalItem(approval)).join('')}
                        </div>
                    </div>
                `;
            };

            return `
                <div>
                    ${renderApprovalGroup(isThai ? 'คำขอลา' : 'Leave Requests', 'event_busy', grouped.leave)}
                    ${renderApprovalGroup(isThai ? 'เบิกค่าใช้จ่าย' : 'Expense Claims', 'receipt_long', grouped.expense)}
                    ${renderApprovalGroup(isThai ? 'แก้ไขข้อมูล' : 'Change Requests', 'edit_note', grouped.change_request)}
                </div>
            `;
        },

        /**
         * Render single approval item
         * @param {object} approval
         * @returns {string}
         */
        renderApprovalItem(approval) {
            const isThai = i18n.isThai();
            const name = isThai ? approval.requesterNameTh : approval.requesterName;
            const typeName = isThai ? approval.typeNameTh : approval.typeNameEn;
            const isSelected = selectedApprovals.has(approval.id);

            const urgencyConfig = {
                high: { bg: 'bg-red-100', text: 'text-red-600', icon: 'priority_high' },
                normal: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'remove' },
                low: { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'keyboard_arrow_down' }
            };
            const urgency = urgencyConfig[approval.urgency] || urgencyConfig.normal;

            let detailsHtml = '';
            if (approval.type === 'leave') {
                const leaveType = i18n.t(`leave.type.${approval.details.leaveType}`);
                detailsHtml = `${leaveType}: ${DateUtils.format(new Date(approval.details.startDate))} - ${DateUtils.format(new Date(approval.details.endDate))}`;
            } else if (approval.type === 'expense') {
                detailsHtml = `${approval.details.category}: ${NumberUtils?.formatCurrency?.(approval.details.amount, approval.details.currency) || `${approval.details.amount} ${approval.details.currency}`}`;
            } else if (approval.type === 'change_request') {
                detailsHtml = approval.details.description;
            }

            return `
                <div class="p-4 hover:bg-gray-50 transition ${isSelected ? 'bg-blue-50' : ''}">
                    <div class="flex items-start gap-3">
                        <input type="checkbox"
                               id="approval-${approval.id}"
                               ${isSelected ? 'checked' : ''}
                               onchange="ManagerDashboardPage.toggleApprovalSelection('${approval.id}')"
                               class="mt-1 h-4 w-4 text-cg-red border-gray-300 rounded focus:ring-cg-red">
                        <img src="${approval.requesterPhoto}" alt="${name}"
                             class="w-10 h-10 rounded-full object-cover flex-shrink-0">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2">
                                <p class="font-medium text-gray-900">${name}</p>
                                ${approval.urgency === 'high' ? `
                                    <span class="px-1.5 py-0.5 text-xs ${urgency.bg} ${urgency.text} rounded flex items-center gap-0.5">
                                        <span class="material-icons text-xs">${urgency.icon}</span>
                                        ${isThai ? 'เร่งด่วน' : 'Urgent'}
                                    </span>
                                ` : ''}
                            </div>
                            <p class="text-sm text-gray-600">${detailsHtml}</p>
                            <p class="text-xs text-gray-400 mt-1">
                                ${isThai ? 'ส่งเมื่อ' : 'Submitted'}: ${DateUtils.format(new Date(approval.submittedDate))}
                            </p>
                        </div>
                        <div class="flex items-center gap-1">
                            <button onclick="ManagerDashboardPage.approveRequest('${approval.id}')"
                                    class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                    title="${isThai ? 'อนุมัติ' : 'Approve'}">
                                <span class="material-icons text-sm">check</span>
                            </button>
                            <button onclick="ManagerDashboardPage.rejectRequest('${approval.id}')"
                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="${isThai ? 'ปฏิเสธ' : 'Reject'}">
                                <span class="material-icons text-sm">close</span>
                            </button>
                            <button onclick="ManagerDashboardPage.viewRequestDetails('${approval.id}')"
                                    class="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
                                    title="${isThai ? 'ดูรายละเอียด' : 'View Details'}">
                                <span class="material-icons text-sm">visibility</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render team notifications
         * @returns {string}
         */
        renderTeamNotifications() {
            const isThai = i18n.isThai();
            const notifications = MockTeamData.teamNotifications || [];

            if (notifications.length === 0) {
                return `
                    <div class="p-6 text-center text-gray-500">
                        <span class="material-icons text-4xl mb-2">notifications_off</span>
                        <p>${isThai ? 'ไม่มีการแจ้งเตือน' : 'No notifications'}</p>
                    </div>
                `;
            }

            const colorConfig = {
                red: 'text-red-500 bg-red-50',
                orange: 'text-orange-500 bg-orange-50',
                blue: 'text-blue-500 bg-blue-50',
                pink: 'text-pink-500 bg-pink-50',
                purple: 'text-purple-500 bg-purple-50',
                green: 'text-green-500 bg-green-50'
            };

            return `
                <div class="divide-y max-h-80 overflow-y-auto">
                    ${notifications.map(notification => {
                        const colors = colorConfig[notification.color] || colorConfig.blue;
                        const title = isThai ? notification.titleTh : notification.title;
                        const message = isThai ? notification.messageTh : notification.message;

                        return `
                            <div class="p-3 hover:bg-gray-50 transition">
                                <div class="flex items-start gap-3">
                                    <div class="p-2 rounded-lg ${colors}">
                                        <span class="material-icons text-sm">${notification.icon}</span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900">${title}</p>
                                        <p class="text-xs text-gray-500 mt-0.5">${message}</p>
                                        ${notification.daysRemaining !== undefined ? `
                                            <p class="text-xs ${notification.daysRemaining <= 7 ? 'text-red-500' : 'text-gray-400'} mt-1">
                                                ${notification.daysRemaining === 0
                                                    ? (isThai ? 'วันนี้!' : 'Today!')
                                                    : `${notification.daysRemaining} ${isThai ? 'วัน' : 'days'}`}
                                            </p>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        },

        /**
         * Render mini org chart
         * @returns {string}
         */
        renderMiniOrgChart() {
            const isThai = i18n.isThai();
            const employee = AppState.get('currentEmployee');
            const members = MockTeamData.teamMembers || [];

            const managerName = isThai
                ? `${employee?.personalInfo?.firstNameTh || ''} ${employee?.personalInfo?.lastNameTh || ''}`
                : `${employee?.personalInfo?.firstNameEn || ''} ${employee?.personalInfo?.lastNameEn || ''}`;

            return `
                <div class="flex flex-col items-center">
                    <!-- Manager (Current User) -->
                    <div class="text-center mb-4">
                        <img src="${employee?.photo || 'https://i.pravatar.cc/150?img=11'}" alt="${managerName}"
                             class="w-16 h-16 rounded-full object-cover mx-auto border-2 border-cg-red shadow">
                        <p class="font-medium text-gray-900 mt-2">${managerName.trim() || 'Manager'}</p>
                        <p class="text-xs text-gray-500">${isThai ? 'คุณ' : 'You'}</p>
                    </div>

                    <!-- Connector Line -->
                    <div class="w-0.5 h-6 bg-gray-300"></div>

                    <!-- Horizontal Line -->
                    <div class="w-full max-w-xs h-0.5 bg-gray-300"></div>

                    <!-- Direct Reports -->
                    <div class="flex flex-wrap justify-center gap-3 mt-4">
                        ${members.slice(0, 5).map(member => {
                            const name = isThai ? member.firstNameTh : member.firstNameEn;
                            return `
                                <div class="text-center w-14">
                                    <img src="${member.photo}" alt="${name}"
                                         class="w-10 h-10 rounded-full object-cover mx-auto border border-gray-200">
                                    <p class="text-xs text-gray-600 mt-1 truncate">${name}</p>
                                </div>
                            `;
                        }).join('')}
                        ${members.length > 5 ? `
                            <div class="text-center w-14">
                                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto border border-gray-200">
                                    <span class="text-xs text-gray-500">+${members.length - 5}</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        },

        /**
         * Initialize the page
         */
        init() {
            // Reset state
            selectedMembers.clear();
            selectedApprovals.clear();
            memberFilter = 'all';
            memberSearch = '';
        },

        /**
         * Get calendar options for refresh
         * @returns {object}
         */
        getCalendarOptions() {
            return {
                teamLeaves: MockTeamData.teamLeaves,
                teamMembers: MockTeamData.teamMembers
            };
        },

        // Event handlers
        handleMemberSearch(value) {
            memberSearch = value;
            Router.refresh();
        },

        handleMemberFilter(value) {
            memberFilter = value;
            Router.refresh();
        },

        toggleApprovalSelection(id) {
            if (selectedApprovals.has(id)) {
                selectedApprovals.delete(id);
            } else {
                selectedApprovals.add(id);
            }
            Router.refresh();
        },

        handleBulkApprove,
        handleBulkReject,

        viewProfile(employeeId) {
            Router.navigate('profile', { id: employeeId });
        },

        requestLeaveFor(employeeId) {
            ToastComponent.info(i18n.isThai()
                ? 'ฟีเจอร์กำลังพัฒนา'
                : 'Feature coming soon');
        },

        editAssignment(employeeId) {
            ToastComponent.info(i18n.isThai()
                ? 'ฟีเจอร์กำลังพัฒนา'
                : 'Feature coming soon');
        },

        approveRequest(id) {
            ModalComponent.confirm({
                title: i18n.isThai() ? 'ยืนยันการอนุมัติ' : 'Confirm Approval',
                message: i18n.isThai() ? 'คุณต้องการอนุมัติคำขอนี้หรือไม่?' : 'Are you sure you want to approve this request?',
                confirmText: i18n.isThai() ? 'อนุมัติ' : 'Approve',
                confirmVariant: 'success',
                onConfirm: () => {
                    ToastComponent.success(i18n.isThai() ? 'อนุมัติสำเร็จ' : 'Request approved');
                    Router.refresh();
                }
            });
        },

        rejectRequest(id) {
            ModalComponent.confirm({
                title: i18n.isThai() ? 'ยืนยันการปฏิเสธ' : 'Confirm Rejection',
                message: i18n.isThai() ? 'คุณต้องการปฏิเสธคำขอนี้หรือไม่?' : 'Are you sure you want to reject this request?',
                confirmText: i18n.isThai() ? 'ปฏิเสธ' : 'Reject',
                confirmVariant: 'danger',
                onConfirm: () => {
                    ToastComponent.success(i18n.isThai() ? 'ปฏิเสธสำเร็จ' : 'Request rejected');
                    Router.refresh();
                }
            });
        },

        viewRequestDetails(id) {
            const approval = MockTeamData.pendingApprovals.find(a => a.id === id);
            if (!approval) return;

            const isThai = i18n.isThai();
            const name = isThai ? approval.requesterNameTh : approval.requesterName;
            const typeName = isThai ? approval.typeNameTh : approval.typeNameEn;

            let detailsContent = '';
            if (approval.type === 'leave') {
                const leaveType = i18n.t(`leave.type.${approval.details.leaveType}`);
                detailsContent = `
                    <div class="space-y-3">
                        <div><strong>${isThai ? 'ประเภท:' : 'Type:'}</strong> ${leaveType}</div>
                        <div><strong>${isThai ? 'วันที่:' : 'Dates:'}</strong> ${DateUtils.format(new Date(approval.details.startDate))} - ${DateUtils.format(new Date(approval.details.endDate))}</div>
                        <div><strong>${isThai ? 'เหตุผล:' : 'Reason:'}</strong> ${approval.details.reason}</div>
                    </div>
                `;
            } else if (approval.type === 'expense') {
                detailsContent = `
                    <div class="space-y-3">
                        <div><strong>${isThai ? 'หมวดหมู่:' : 'Category:'}</strong> ${approval.details.category}</div>
                        <div><strong>${isThai ? 'จำนวนเงิน:' : 'Amount:'}</strong> ${approval.details.amount} ${approval.details.currency}</div>
                        <div><strong>${isThai ? 'รายละเอียด:' : 'Description:'}</strong> ${approval.details.description}</div>
                    </div>
                `;
            } else {
                detailsContent = `
                    <div class="space-y-3">
                        <div><strong>${isThai ? 'ประเภทการเปลี่ยนแปลง:' : 'Change Type:'}</strong> ${approval.details.changeType}</div>
                        <div><strong>${isThai ? 'รายละเอียด:' : 'Description:'}</strong> ${approval.details.description}</div>
                    </div>
                `;
            }

            ModalComponent.open({
                title: `${typeName} - ${name}`,
                content: `
                    <div class="p-4">
                        <div class="flex items-center gap-4 mb-4 pb-4 border-b">
                            <img src="${approval.requesterPhoto}" alt="${name}" class="w-12 h-12 rounded-full">
                            <div>
                                <p class="font-medium">${name}</p>
                                <p class="text-sm text-gray-500">${isThai ? 'ส่งเมื่อ' : 'Submitted'}: ${DateUtils.format(new Date(approval.submittedDate))}</p>
                            </div>
                        </div>
                        ${detailsContent}
                    </div>
                `,
                actions: [
                    {
                        label: i18n.isThai() ? 'อนุมัติ' : 'Approve',
                        variant: 'success',
                        onClick: () => {
                            ModalComponent.close();
                            this.approveRequest(id);
                        }
                    },
                    {
                        label: i18n.isThai() ? 'ปฏิเสธ' : 'Reject',
                        variant: 'danger',
                        onClick: () => {
                            ModalComponent.close();
                            this.rejectRequest(id);
                        }
                    },
                    {
                        label: i18n.t('common.close'),
                        variant: 'secondary',
                        onClick: () => ModalComponent.close()
                    }
                ]
            });
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ManagerDashboardPage;
}

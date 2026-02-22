/**
 * Settings Page
 * Comprehensive settings and configuration module for HR System
 */

const SettingsPage = (function() {
    // Tab configuration
    const tabs = [
        { id: 'general', labelKey: 'settings.general', icon: 'tune' },
        { id: 'company', labelKey: 'settings.company', icon: 'business' },
        { id: 'leavePolicy', labelKey: 'settings.leavePolicy', icon: 'event_available' },
        { id: 'payroll', labelKey: 'settings.payroll', icon: 'payments' },
        { id: 'workflows', labelKey: 'settings.workflows', icon: 'account_tree' },
        { id: 'notifications', labelKey: 'settings.notifications', icon: 'notifications' }
    ];

    let activeTab = 'general';
    let settings = {};
    let isLoading = true;
    let hasUnsavedChanges = false;

    /**
     * Check if user has edit access
     */
    function canEdit() {
        return RBAC.hasRole('hr_admin') || RBAC.hasRole('hr_manager');
    }

    /**
     * Check if user can only edit notifications
     */
    function canEditNotificationsOnly() {
        return !canEdit();
    }

    /**
     * Load settings data
     */
    async function loadSettings() {
        isLoading = true;
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));
            settings = JSON.parse(JSON.stringify(MockSettingsData));
            isLoading = false;
        } catch (error) {
            console.error('Failed to load settings:', error);
            isLoading = false;
            ToastComponent.error(i18n.t('error.loadFailed'));
        }
    }

    /**
     * Get tab label with proper translation
     */
    function getTabLabel(tab) {
        return i18n.t(tab.labelKey);
    }

    /**
     * Check if tab is accessible based on role
     */
    function isTabAccessible(tabId) {
        if (tabId === 'notifications') return true;
        if (tabId === 'workflows' && RBAC.isManager()) return true;
        return canEdit();
    }

    return {
        /**
         * Render settings page
         */
        render() {
            const isThai = i18n.isThai();
            const accessibleTabs = tabs.filter(tab => isTabAccessible(tab.id));

            if (isLoading) {
                return this.renderSkeleton();
            }

            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <!-- Page Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">${i18n.t('settings.title')}</h1>
                            <p class="text-sm text-gray-500 mt-1">${i18n.t('settings.description')}</p>
                        </div>
                        ${canEdit() ? `
                            <button onclick="SettingsPage.saveAllSettings()"
                                    class="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]"
                                    aria-label="${i18n.t('common.save')}"
                                    ${!hasUnsavedChanges ? 'disabled' : ''}>
                                <span class="material-icons text-sm" aria-hidden="true">save</span>
                                ${i18n.t('common.save')}
                            </button>
                        ` : ''}
                    </div>

                    <!-- Settings Tabs -->
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <!-- Tab Navigation -->
                        <div class="border-b border-gray-200">
                            <nav class="flex overflow-x-auto scrollbar-hide" role="tablist" aria-label="${i18n.t('settings.title')}">
                                ${accessibleTabs.map(tab => `
                                    <button type="button"
                                            role="tab"
                                            id="settings-tab-${tab.id}"
                                            aria-selected="${tab.id === activeTab}"
                                            aria-controls="settings-panel-${tab.id}"
                                            class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition min-h-[44px]
                                                   ${tab.id === activeTab
                                                       ? 'border-cg-red text-cg-red'
                                                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
                                            onclick="SettingsPage.switchTab('${tab.id}')">
                                        <span class="material-icons text-sm" aria-hidden="true">${tab.icon}</span>
                                        ${getTabLabel(tab)}
                                    </button>
                                `).join('')}
                            </nav>
                        </div>

                        <!-- Tab Content -->
                        <div id="settings-tab-content" class="p-6">
                            ${this.renderTabContent(activeTab)}
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Initialize settings page
         */
        async init() {
            activeTab = 'general';
            hasUnsavedChanges = false;
            await loadSettings();
        },

        /**
         * Switch active tab
         */
        switchTab(tabId) {
            if (tabId === activeTab) return;

            if (hasUnsavedChanges) {
                ModalComponent.confirm({
                    title: i18n.t('settings.unsavedChanges'),
                    message: i18n.t('settings.unsavedChangesMessage'),
                    confirmText: i18n.t('settings.discardChanges'),
                    icon: 'warning'
                }).then(confirmed => {
                    if (confirmed) {
                        hasUnsavedChanges = false;
                        this.doSwitchTab(tabId);
                    }
                });
            } else {
                this.doSwitchTab(tabId);
            }
        },

        /**
         * Perform tab switch
         */
        doSwitchTab(tabId) {
            activeTab = tabId;

            // Update tab button states
            tabs.forEach(tab => {
                const btn = document.getElementById(`settings-tab-${tab.id}`);
                if (btn) {
                    const isActive = tab.id === activeTab;
                    btn.setAttribute('aria-selected', isActive);
                    btn.classList.toggle('border-cg-red', isActive);
                    btn.classList.toggle('text-cg-red', isActive);
                    btn.classList.toggle('border-transparent', !isActive);
                    btn.classList.toggle('text-gray-500', !isActive);
                }
            });

            // Update content
            const contentContainer = document.getElementById('settings-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderTabContent(activeTab);
            }
        },

        /**
         * Render tab content based on active tab
         */
        renderTabContent(tabId) {
            switch (tabId) {
                case 'general':
                    return this.renderGeneralSettings();
                case 'company':
                    return this.renderCompanySettings();
                case 'leavePolicy':
                    return this.renderLeavePolicySettings();
                case 'payroll':
                    return this.renderPayrollSettings();
                case 'workflows':
                    return this.renderWorkflowSettings();
                case 'notifications':
                    return this.renderNotificationSettings();
                default:
                    return this.renderGeneralSettings();
            }
        },

        /**
         * Render General Settings Tab
         */
        renderGeneralSettings() {
            const isThai = i18n.isThai();
            const disabled = !canEdit();

            return `
                <div class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.generalSettings')}</h2>

                    <!-- Language Preference -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${FormFieldComponent.select({
                            name: 'language',
                            label: i18n.t('settings.language'),
                            value: settings.general?.language || 'th',
                            disabled: disabled,
                            options: [
                                { value: 'th', label: 'ไทย (Thai)' },
                                { value: 'en', label: 'English' }
                            ],
                            hint: i18n.t('settings.languageHint')
                        })}

                        ${FormFieldComponent.select({
                            name: 'dateFormat',
                            label: i18n.t('settings.dateFormat'),
                            value: settings.general?.dateFormat || 'buddhist',
                            disabled: disabled,
                            options: [
                                { value: 'buddhist', label: isThai ? 'พ.ศ. (พุทธศักราช 2567)' : 'Buddhist Era (B.E. 2567)' },
                                { value: 'gregorian', label: isThai ? 'ค.ศ. (คริสต์ศักราช 2024)' : 'Gregorian (A.D. 2024)' }
                            ]
                        })}
                    </div>

                    <!-- Theme Preference -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${FormFieldComponent.select({
                            name: 'theme',
                            label: i18n.t('settings.theme'),
                            value: settings.general?.theme || 'system',
                            disabled: disabled,
                            options: [
                                { value: 'light', label: i18n.t('settings.themeLight') },
                                { value: 'dark', label: i18n.t('settings.themeDark') },
                                { value: 'system', label: i18n.t('settings.themeSystem') }
                            ]
                        })}
                    </div>

                    ${!disabled ? `
                        <div class="pt-4 border-t border-gray-200">
                            <button onclick="SettingsPage.saveGeneralSettings()"
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                                <span class="material-icons text-sm" aria-hidden="true">save</span>
                                ${i18n.t('settings.saveGeneral')}
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render Company Settings Tab
         */
        renderCompanySettings() {
            const isThai = i18n.isThai();
            const disabled = !canEdit();
            const company = settings.company || {};
            const address = isThai ? (company.addressTh || company.address) : company.address;

            return `
                <div class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.companySettings')}</h2>

                    <!-- Company Information -->
                    ${CardComponent.render({
                        title: i18n.t('settings.companyInfo'),
                        icon: 'business',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                ${FormFieldComponent.text({
                                    name: 'companyName',
                                    label: i18n.t('settings.companyName'),
                                    value: isThai ? company.nameTh : company.name,
                                    disabled: disabled,
                                    required: true
                                })}

                                ${FormFieldComponent.text({
                                    name: 'taxId',
                                    label: i18n.t('settings.taxId'),
                                    value: company.taxId || '',
                                    disabled: disabled,
                                    required: true,
                                    pattern: '[0-9]{13}',
                                    hint: i18n.t('settings.taxIdHint')
                                })}

                                ${FormFieldComponent.text({
                                    name: 'socialSecurityNo',
                                    label: i18n.t('settings.socialSecurityRegNo'),
                                    value: company.socialSecurityNo || '',
                                    disabled: disabled
                                })}
                            </div>

                            <!-- Logo Upload -->
                            <div class="mt-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">${i18n.t('settings.companyLogo')}</label>
                                <div class="flex items-center gap-4">
                                    <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                                        ${company.logo
                                            ? `<img src="${company.logo}" alt="Company Logo" class="w-full h-full object-contain rounded-lg">`
                                            : `<span class="material-icons text-4xl text-gray-400">business</span>`
                                        }
                                    </div>
                                    ${!disabled ? `
                                        <div class="flex flex-col gap-2">
                                            <button onclick="document.getElementById('logo-upload').click()"
                                                    class="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                                ${i18n.t('settings.uploadLogo')}
                                            </button>
                                            <input type="file" id="logo-upload" accept="image/*" class="hidden"
                                                   onchange="SettingsPage.handleLogoUpload(this)">
                                            <p class="text-xs text-gray-500">${i18n.t('settings.logoHint')}</p>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `
                    })}

                    <!-- Company Address -->
                    ${CardComponent.render({
                        title: i18n.t('settings.companyAddress'),
                        icon: 'location_on',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                ${FormFieldComponent.text({
                                    name: 'addressLine1',
                                    label: i18n.t('personal.addressLine1'),
                                    value: address?.line1 || '',
                                    disabled: disabled
                                })}

                                ${FormFieldComponent.text({
                                    name: 'addressLine2',
                                    label: i18n.t('personal.addressLine2'),
                                    value: address?.line2 || '',
                                    disabled: disabled
                                })}

                                ${FormFieldComponent.text({
                                    name: 'district',
                                    label: i18n.t('personal.district'),
                                    value: address?.district || '',
                                    disabled: disabled
                                })}

                                ${FormFieldComponent.text({
                                    name: 'province',
                                    label: i18n.t('personal.province'),
                                    value: address?.province || '',
                                    disabled: disabled
                                })}

                                ${FormFieldComponent.text({
                                    name: 'postalCode',
                                    label: i18n.t('personal.postalCode'),
                                    value: address?.postalCode || '',
                                    disabled: disabled
                                })}

                                ${FormFieldComponent.text({
                                    name: 'country',
                                    label: i18n.t('personal.country'),
                                    value: address?.country || '',
                                    disabled: disabled
                                })}
                            </div>
                        `
                    })}

                    ${!disabled ? `
                        <div class="pt-4 border-t border-gray-200">
                            <button onclick="SettingsPage.saveCompanySettings()"
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                                <span class="material-icons text-sm" aria-hidden="true">save</span>
                                ${i18n.t('settings.saveCompany')}
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        },

        /**
         * Render Leave Policy Settings Tab
         */
        renderLeavePolicySettings() {
            const isThai = i18n.isThai();
            const disabled = !canEdit();
            const leaveTypes = settings.leaveTypes || [];

            return `
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.leavePolicySettings')}</h2>
                        ${!disabled ? `
                            <button onclick="SettingsPage.openAddLeaveTypeModal()"
                                    class="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-cg-red text-white rounded-lg hover:bg-red-700 transition">
                                <span class="material-icons text-sm" aria-hidden="true">add</span>
                                ${i18n.t('settings.addLeaveType')}
                            </button>
                        ` : ''}
                    </div>

                    <!-- Leave Types Table -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${i18n.t('settings.leaveTypes')}">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('settings.leaveTypeName')}</th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('settings.daysPerYear')}</th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('settings.accrualType')}</th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('settings.carryForward')}</th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('settings.certificate')}</th>
                                    <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('benefits.status')}</th>
                                    ${!disabled ? `<th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">${i18n.t('common.actions')}</th>` : ''}
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${leaveTypes.map(lt => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">${isThai ? lt.nameTh : lt.name}</div>
                                            <div class="text-xs text-gray-500">${lt.code}</div>
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${lt.daysPerYear}</td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${i18n.t('settings.accrual.' + lt.accrualType)}</td>
                                        <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">${lt.carryForwardLimit > 0 ? lt.carryForwardLimit + ' ' + i18n.t('employment.days') : '-'}</td>
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            ${lt.requiresCertificate
                                                ? `<span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">
                                                    ${lt.certificateAfterDays > 0 ? i18n.t('settings.afterDays', { days: lt.certificateAfterDays }) : i18n.t('common.required')}
                                                   </span>`
                                                : `<span class="text-sm text-gray-400">-</span>`
                                            }
                                        </td>
                                        <td class="px-4 py-3 whitespace-nowrap">
                                            <span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full ${lt.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
                                                ${lt.active ? i18n.t('benefits.active') : i18n.t('benefits.inactive')}
                                            </span>
                                        </td>
                                        ${!disabled ? `
                                            <td class="px-4 py-3 whitespace-nowrap text-right text-sm">
                                                <button onclick="SettingsPage.editLeaveType('${lt.id}')"
                                                        class="text-cg-info hover:text-blue-700 p-1"
                                                        aria-label="${i18n.t('common.edit')}">
                                                    <span class="material-icons text-sm">edit</span>
                                                </button>
                                                <button onclick="SettingsPage.deleteLeaveType('${lt.id}')"
                                                        class="text-red-500 hover:text-red-700 p-1 ml-1"
                                                        aria-label="${i18n.t('common.delete')}">
                                                    <span class="material-icons text-sm">delete</span>
                                                </button>
                                            </td>
                                        ` : ''}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Leave Policy Notes -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                            <span class="material-icons text-blue-500">info</span>
                            <div class="text-sm text-blue-700">
                                <p class="font-medium mb-1">${i18n.t('settings.thaiLaborLaw')}</p>
                                <ul class="list-disc list-inside space-y-1">
                                    <li>${i18n.t('settings.laborLawNote1')}</li>
                                    <li>${i18n.t('settings.laborLawNote2')}</li>
                                    <li>${i18n.t('settings.laborLawNote3')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        /**
         * Render Payroll Settings Tab
         */
        renderPayrollSettings() {
            const isThai = i18n.isThai();
            const disabled = !canEdit();
            const taxBrackets = settings.taxBrackets || [];
            const ss = settings.socialSecurity || {};
            const pf = settings.providentFund || {};

            return `
                <div class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.payrollSettings')}</h2>

                    <!-- Tax Brackets -->
                    ${CardComponent.render({
                        title: i18n.t('settings.taxBrackets'),
                        subtitle: isThai ? 'อัตราภาษีเงินได้บุคคลธรรมดา ปี 2567' : 'Personal Income Tax Rates 2024',
                        icon: 'receipt',
                        content: `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200" role="table" aria-label="${i18n.t('settings.taxBrackets')}">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('settings.incomeRange')}</th>
                                            <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">${i18n.t('settings.taxRate')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${taxBrackets.map(bracket => `
                                            <tr>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${isThai ? bracket.descriptionTh : bracket.description} ${isThai ? 'บาท' : 'THB'}</td>
                                                <td class="px-4 py-3 whitespace-nowrap text-sm text-right ${bracket.rate === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}">${bracket.rate}%</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `
                    })}

                    <!-- Social Security -->
                    ${CardComponent.render({
                        title: i18n.t('settings.socialSecurity'),
                        icon: 'security',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.employeeRate')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${ss.employeeRate || 5}%</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.employerRate')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${ss.employerRate || 5}%</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.maxContributionBase')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${(ss.maxContributionBase || 15000).toLocaleString()} ${isThai ? 'บาท' : 'THB'}</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.maxMonthlyContribution')}</p>
                                    <p class="text-2xl font-bold text-cg-red">${(ss.maxEmployeeContribution || 750).toLocaleString()} ${isThai ? 'บาท/เดือน' : 'THB/month'}</p>
                                </div>
                            </div>
                        `
                    })}

                    <!-- Provident Fund -->
                    ${CardComponent.render({
                        title: i18n.t('settings.providentFund'),
                        icon: 'savings',
                        editable: !disabled,
                        onEdit: 'SettingsPage.editProvidentFundSettings()',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <dl class="grid grid-cols-2 gap-4">
                                        <div>
                                            <dt class="text-sm text-gray-500">${i18n.t('benefits.status')}</dt>
                                            <dd class="mt-1 text-sm font-medium ${pf.enabled ? 'text-green-600' : 'text-gray-500'}">${pf.enabled ? i18n.t('settings.enabled') : i18n.t('settings.disabled')}</dd>
                                        </div>
                                        <div>
                                            <dt class="text-sm text-gray-500">${i18n.t('settings.employerContribution')}</dt>
                                            <dd class="mt-1 text-sm font-medium text-gray-900">${pf.employerRate || 5}%</dd>
                                        </div>
                                        <div>
                                            <dt class="text-sm text-gray-500">${i18n.t('settings.employeeMinContribution')}</dt>
                                            <dd class="mt-1 text-sm font-medium text-gray-900">${pf.employeeMinRate || 3}%</dd>
                                        </div>
                                        <div>
                                            <dt class="text-sm text-gray-500">${i18n.t('settings.employeeMaxContribution')}</dt>
                                            <dd class="mt-1 text-sm font-medium text-gray-900">${pf.employeeMaxRate || 15}%</dd>
                                        </div>
                                    </dl>
                                </div>

                                <!-- Vesting Schedule -->
                                <div>
                                    <h4 class="text-sm font-medium text-gray-700 mb-3">${i18n.t('settings.vestingSchedule')}</h4>
                                    <div class="space-y-2">
                                        ${(pf.vestingSchedule || []).map(vs => `
                                            <div class="flex items-center justify-between text-sm">
                                                <span class="text-gray-500">${vs.years} ${i18n.t('employment.years')}</span>
                                                <div class="flex items-center gap-2">
                                                    <div class="w-24 bg-gray-200 rounded-full h-2">
                                                        <div class="bg-cg-red rounded-full h-2" style="width: ${vs.percentage}%"></div>
                                                    </div>
                                                    <span class="text-gray-900 font-medium w-12 text-right">${vs.percentage}%</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `
                    })}

                    <!-- Overtime Rates -->
                    ${CardComponent.render({
                        title: i18n.t('settings.overtimeRates'),
                        icon: 'schedule',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.regularDayOT')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${settings.payroll?.overtimeRates?.regularDay || 1.5}x</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.holidayWork')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${settings.payroll?.overtimeRates?.holiday || 3.0}x</p>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <p class="text-sm text-gray-500">${i18n.t('settings.holidayOT')}</p>
                                    <p class="text-2xl font-bold text-gray-900">${settings.payroll?.overtimeRates?.holidayOvertime || 3.0}x</p>
                                </div>
                            </div>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render Workflow Settings Tab
         */
        renderWorkflowSettings() {
            const isThai = i18n.isThai();
            const disabled = !canEdit();
            const workflows = settings.workflows || {};
            const approvalLevels = workflows.approvalLevels || [];
            const autoApproveRules = workflows.autoApproveRules || [];
            const delegation = workflows.delegationSettings || {};

            return `
                <div class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.workflowSettings')}</h2>

                    <!-- Approval Levels -->
                    ${CardComponent.render({
                        title: i18n.t('settings.approvalLevels'),
                        icon: 'account_tree',
                        content: `
                            <div class="space-y-3">
                                ${approvalLevels.map((level, index) => `
                                    <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-cg-red text-white text-sm font-medium">
                                            ${level.order}
                                        </div>
                                        <div class="flex-1">
                                            <p class="font-medium text-gray-900">${isThai ? level.nameTh : level.name}</p>
                                            <p class="text-sm text-gray-500">${i18n.t('settings.role')}: ${RBAC.getRoleDisplayName(level.role)}</p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            ${level.required
                                                ? `<span class="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">${i18n.t('common.required')}</span>`
                                                : `<span class="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">${i18n.t('common.optional')}</span>`
                                            }
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `
                    })}

                    <!-- Auto-Approve Rules -->
                    ${CardComponent.render({
                        title: i18n.t('settings.autoApproveRules'),
                        icon: 'auto_mode',
                        editable: !disabled,
                        onEdit: 'SettingsPage.editAutoApproveRules()',
                        content: `
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200" role="table">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('settings.leaveType')}</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('settings.maxDays')}</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('settings.description')}</th>
                                            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">${i18n.t('benefits.status')}</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        ${autoApproveRules.map(rule => {
                                            const leaveType = settings.leaveTypes?.find(lt => lt.id === rule.leaveType);
                                            return `
                                                <tr>
                                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                        ${leaveType ? (isThai ? leaveType.nameTh : leaveType.name) : rule.leaveType}
                                                    </td>
                                                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${rule.maxDays} ${i18n.t('employment.days')}</td>
                                                    <td class="px-4 py-3 text-sm text-gray-500">${isThai ? rule.descriptionTh : rule.description}</td>
                                                    <td class="px-4 py-3 whitespace-nowrap">
                                                        <span class="inline-flex items-center px-2 py-0.5 text-xs rounded-full ${rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
                                                            ${rule.active ? i18n.t('benefits.active') : i18n.t('benefits.inactive')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            `;
                                        }).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `
                    })}

                    <!-- Delegation Settings -->
                    ${CardComponent.render({
                        title: i18n.t('settings.delegationSettings'),
                        icon: 'swap_horiz',
                        editable: !disabled,
                        onEdit: 'SettingsPage.editDelegationSettings()',
                        content: `
                            <dl class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <dt class="text-sm text-gray-500">${i18n.t('settings.delegationEnabled')}</dt>
                                    <dd class="mt-1 text-sm font-medium ${delegation.enabled ? 'text-green-600' : 'text-red-600'}">
                                        ${delegation.enabled ? i18n.t('common.yes') : i18n.t('common.no')}
                                    </dd>
                                </div>
                                <div>
                                    <dt class="text-sm text-gray-500">${i18n.t('settings.maxDelegationDays')}</dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900">${delegation.maxDelegationDays || 30} ${i18n.t('employment.days')}</dd>
                                </div>
                                <div>
                                    <dt class="text-sm text-gray-500">${i18n.t('settings.allowRedelegation')}</dt>
                                    <dd class="mt-1 text-sm font-medium ${delegation.allowRedelegation ? 'text-green-600' : 'text-gray-500'}">
                                        ${delegation.allowRedelegation ? i18n.t('common.yes') : i18n.t('common.no')}
                                    </dd>
                                </div>
                                <div>
                                    <dt class="text-sm text-gray-500">${i18n.t('settings.notifyParties')}</dt>
                                    <dd class="mt-1 text-sm font-medium text-gray-900">
                                        ${[
                                            delegation.notifyDelegator ? i18n.t('settings.delegator') : '',
                                            delegation.notifyDelegatee ? i18n.t('settings.delegatee') : ''
                                        ].filter(Boolean).join(', ') || '-'}
                                    </dd>
                                </div>
                            </dl>
                        `
                    })}
                </div>
            `;
        },

        /**
         * Render Notification Settings Tab
         */
        renderNotificationSettings() {
            const isThai = i18n.isThai();
            const notifications = settings.notifications || {};
            const email = notifications.email || {};
            const inApp = notifications.inApp || {};
            const reminders = notifications.reminders || {};

            return `
                <div class="space-y-6">
                    <h2 class="text-lg font-semibold text-gray-900">${i18n.t('settings.notificationSettings')}</h2>

                    <!-- Email Notifications -->
                    ${CardComponent.render({
                        title: i18n.t('settings.emailNotifications'),
                        icon: 'email',
                        content: `
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">${i18n.t('settings.enableEmailNotifications')}</p>
                                        <p class="text-sm text-gray-500">${i18n.t('settings.emailNotificationsDesc')}</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" id="email-enabled"
                                               ${email.enabled ? 'checked' : ''}
                                               onchange="SettingsPage.toggleNotificationSetting('email', 'enabled', this.checked)">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red"></div>
                                    </label>
                                </div>

                                <div class="border-t pt-4">
                                    ${FormFieldComponent.select({
                                        name: 'emailDigestFrequency',
                                        label: i18n.t('settings.digestFrequency'),
                                        value: email.digestFrequency || 'immediate',
                                        options: [
                                            { value: 'immediate', label: i18n.t('settings.immediate') },
                                            { value: 'daily', label: i18n.t('settings.daily') },
                                            { value: 'weekly', label: i18n.t('settings.weekly') }
                                        ]
                                    })}
                                </div>

                                <div class="border-t pt-4">
                                    <p class="text-sm font-medium text-gray-700 mb-3">${i18n.t('settings.notificationTypes')}</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        ${Object.entries(email.types || {}).map(([key, value]) => `
                                            <label class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                                <input type="checkbox" ${value ? 'checked' : ''}
                                                       onchange="SettingsPage.toggleNotificationType('email', '${key}', this.checked)"
                                                       class="w-4 h-4 text-cg-red border-gray-300 rounded focus:ring-cg-red">
                                                <span class="text-sm text-gray-700">${i18n.t('settings.notifType.' + key)}</span>
                                            </label>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `
                    })}

                    <!-- In-App Notifications -->
                    ${CardComponent.render({
                        title: i18n.t('settings.inAppNotifications'),
                        icon: 'notifications_active',
                        content: `
                            <div class="space-y-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">${i18n.t('settings.enableInAppNotifications')}</p>
                                        <p class="text-sm text-gray-500">${i18n.t('settings.inAppNotificationsDesc')}</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer" id="inapp-enabled"
                                               ${inApp.enabled ? 'checked' : ''}
                                               onchange="SettingsPage.toggleNotificationSetting('inApp', 'enabled', this.checked)">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red"></div>
                                    </label>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="font-medium text-gray-900">${i18n.t('settings.showBadge')}</p>
                                        <p class="text-sm text-gray-500">${i18n.t('settings.showBadgeDesc')}</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer"
                                               ${inApp.showBadge ? 'checked' : ''}
                                               onchange="SettingsPage.toggleNotificationSetting('inApp', 'showBadge', this.checked)">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red"></div>
                                    </label>
                                </div>

                                <div class="border-t pt-4">
                                    <p class="text-sm font-medium text-gray-700 mb-3">${i18n.t('settings.notificationTypes')}</p>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        ${Object.entries(inApp.types || {}).map(([key, value]) => `
                                            <label class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                                <input type="checkbox" ${value ? 'checked' : ''}
                                                       onchange="SettingsPage.toggleNotificationType('inApp', '${key}', this.checked)"
                                                       class="w-4 h-4 text-cg-red border-gray-300 rounded focus:ring-cg-red">
                                                <span class="text-sm text-gray-700">${i18n.t('settings.notifType.' + key)}</span>
                                            </label>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `
                    })}

                    <!-- Reminder Settings -->
                    ${CardComponent.render({
                        title: i18n.t('settings.reminderSettings'),
                        icon: 'alarm',
                        content: `
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p class="font-medium text-gray-900">${i18n.t('settings.leaveBalanceReminder')}</p>
                                        <p class="text-sm text-gray-500">${i18n.t('settings.leaveBalanceReminderDesc', { days: reminders.leaveBalanceThreshold || 5 })}</p>
                                    </div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer"
                                               ${reminders.leaveBalanceReminder ? 'checked' : ''}
                                               onchange="SettingsPage.toggleReminderSetting('leaveBalanceReminder', this.checked)">
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cg-red/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cg-red"></div>
                                    </label>
                                </div>

                                ${FormFieldComponent.number({
                                    name: 'documentExpiryDays',
                                    label: i18n.t('settings.documentExpiryReminder'),
                                    value: reminders.documentExpiryDays || 30,
                                    min: 7,
                                    max: 90,
                                    hint: i18n.t('settings.documentExpiryHint')
                                })}

                                ${FormFieldComponent.number({
                                    name: 'performanceReviewDays',
                                    label: i18n.t('settings.performanceReviewReminder'),
                                    value: reminders.performanceReviewDays || 14,
                                    min: 7,
                                    max: 30,
                                    hint: i18n.t('settings.performanceReviewHint')
                                })}
                            </div>
                        `
                    })}

                    <div class="pt-4 border-t border-gray-200">
                        <button onclick="SettingsPage.saveNotificationSettings()"
                                class="inline-flex items-center gap-2 px-4 py-2 bg-cg-red text-white rounded-lg hover:bg-red-700 transition min-h-[44px]">
                            <span class="material-icons text-sm" aria-hidden="true">save</span>
                            ${i18n.t('settings.saveNotifications')}
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Toggle notification setting
         */
        toggleNotificationSetting(category, key, value) {
            if (!settings.notifications) settings.notifications = {};
            if (!settings.notifications[category]) settings.notifications[category] = {};
            settings.notifications[category][key] = value;
            hasUnsavedChanges = true;
        },

        /**
         * Toggle notification type
         */
        toggleNotificationType(category, type, value) {
            if (!settings.notifications) settings.notifications = {};
            if (!settings.notifications[category]) settings.notifications[category] = {};
            if (!settings.notifications[category].types) settings.notifications[category].types = {};
            settings.notifications[category].types[type] = value;
            hasUnsavedChanges = true;
        },

        /**
         * Toggle reminder setting
         */
        toggleReminderSetting(key, value) {
            if (!settings.notifications) settings.notifications = {};
            if (!settings.notifications.reminders) settings.notifications.reminders = {};
            settings.notifications.reminders[key] = value;
            hasUnsavedChanges = true;
        },

        /**
         * Save general settings
         */
        async saveGeneralSettings() {
            const formData = FormFieldComponent.getFormData('settings-tab-content');

            settings.general = {
                language: formData.language || settings.general?.language,
                dateFormat: formData.dateFormat || settings.general?.dateFormat,
                theme: formData.theme || settings.general?.theme
            };

            await this.saveSettings('general');
        },

        /**
         * Save company settings
         */
        async saveCompanySettings() {
            const formData = FormFieldComponent.getFormData('settings-tab-content');

            settings.company = {
                ...settings.company,
                name: formData.companyName,
                taxId: formData.taxId,
                socialSecurityNo: formData.socialSecurityNo,
                address: {
                    line1: formData.addressLine1,
                    line2: formData.addressLine2,
                    district: formData.district,
                    province: formData.province,
                    postalCode: formData.postalCode,
                    country: formData.country
                }
            };

            await this.saveSettings('company');
        },

        /**
         * Save notification settings
         */
        async saveNotificationSettings() {
            const formData = FormFieldComponent.getFormData('settings-tab-content');

            if (formData.emailDigestFrequency) {
                settings.notifications.email.digestFrequency = formData.emailDigestFrequency;
            }
            if (formData.documentExpiryDays) {
                settings.notifications.reminders.documentExpiryDays = parseInt(formData.documentExpiryDays);
            }
            if (formData.performanceReviewDays) {
                settings.notifications.reminders.performanceReviewDays = parseInt(formData.performanceReviewDays);
            }

            await this.saveSettings('notifications');
        },

        /**
         * Save settings to server
         */
        async saveSettings(section) {
            try {
                AppState.setLoading(true);

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                hasUnsavedChanges = false;
                ToastComponent.success(i18n.t('toast.saveSuccess'));

            } catch (error) {
                console.error('Failed to save settings:', error);
                ToastComponent.error(i18n.t('error.saveFailed'));
            } finally {
                AppState.setLoading(false);
            }
        },

        /**
         * Save all settings
         */
        async saveAllSettings() {
            await this.saveSettings('all');
        },

        /**
         * Handle logo upload
         */
        handleLogoUpload(input) {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = (e) => {
                    settings.company.logo = e.target.result;
                    hasUnsavedChanges = true;

                    // Update preview
                    const contentContainer = document.getElementById('settings-tab-content');
                    if (contentContainer) {
                        contentContainer.innerHTML = this.renderTabContent('company');
                    }

                    ToastComponent.success(i18n.t('toast.uploadSuccess'));
                };

                reader.readAsDataURL(file);
            }
        },

        /**
         * Open Add Leave Type Modal
         */
        openAddLeaveTypeModal() {
            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('settings.addLeaveType'),
                size: 'lg',
                content: `
                    <form id="add-leave-type-form" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'code',
                                label: i18n.t('settings.leaveCode'),
                                required: true,
                                maxLength: 5
                            })}

                            ${FormFieldComponent.text({
                                name: 'name',
                                label: i18n.t('settings.leaveNameEn'),
                                required: true
                            })}

                            ${FormFieldComponent.text({
                                name: 'nameTh',
                                label: i18n.t('settings.leaveNameTh'),
                                required: true
                            })}

                            ${FormFieldComponent.number({
                                name: 'daysPerYear',
                                label: i18n.t('settings.daysPerYear'),
                                required: true,
                                min: 1
                            })}

                            ${FormFieldComponent.select({
                                name: 'accrualType',
                                label: i18n.t('settings.accrualType'),
                                required: true,
                                options: [
                                    { value: 'yearly', label: i18n.t('settings.accrual.yearly') },
                                    { value: 'monthly', label: i18n.t('settings.accrual.monthly') },
                                    { value: 'front_loaded', label: i18n.t('settings.accrual.front_loaded') },
                                    { value: 'event_based', label: i18n.t('settings.accrual.event_based') }
                                ]
                            })}

                            ${FormFieldComponent.number({
                                name: 'carryForwardLimit',
                                label: i18n.t('settings.carryForwardLimit'),
                                value: 0,
                                min: 0
                            })}

                            ${FormFieldComponent.checkbox({
                                name: 'requiresCertificate',
                                label: i18n.t('settings.requiresCertificate')
                            })}

                            ${FormFieldComponent.number({
                                name: 'certificateAfterDays',
                                label: i18n.t('settings.certificateAfterDays'),
                                min: 0,
                                hint: i18n.t('settings.certificateAfterDaysHint')
                            })}
                        </div>
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('common.add'),
                        primary: true,
                        onclick: 'SettingsPage.submitAddLeaveType()'
                    }
                ]
            });
        },

        /**
         * Submit add leave type
         */
        async submitAddLeaveType() {
            const formData = FormFieldComponent.getFormData('add-leave-type-form');

            if (!formData.code || !formData.name || !formData.daysPerYear) {
                ToastComponent.error(i18n.t('validation.required'));
                return;
            }

            const newLeaveType = {
                id: formData.code.toLowerCase(),
                code: formData.code.toUpperCase(),
                name: formData.name,
                nameTh: formData.nameTh || formData.name,
                daysPerYear: parseInt(formData.daysPerYear),
                accrualType: formData.accrualType || 'yearly',
                carryForwardLimit: parseInt(formData.carryForwardLimit) || 0,
                carryForwardExpiry: null,
                requiresCertificate: formData.requiresCertificate === 'on',
                certificateAfterDays: parseInt(formData.certificateAfterDays) || null,
                paidLeave: true,
                minServiceDays: 0,
                maxConsecutiveDays: parseInt(formData.daysPerYear),
                advanceNoticeDays: 1,
                active: true
            };

            settings.leaveTypes.push(newLeaveType);
            hasUnsavedChanges = true;

            ModalComponent.close();
            ToastComponent.success(i18n.t('toast.addSuccess'));

            // Refresh the tab
            const contentContainer = document.getElementById('settings-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderTabContent('leavePolicy');
            }
        },

        /**
         * Edit leave type
         */
        editLeaveType(leaveTypeId) {
            const leaveType = settings.leaveTypes.find(lt => lt.id === leaveTypeId);
            if (!leaveType) return;

            const isThai = i18n.isThai();

            ModalComponent.open({
                title: i18n.t('settings.editLeaveType'),
                size: 'lg',
                content: `
                    <form id="edit-leave-type-form" class="space-y-4">
                        <input type="hidden" name="id" value="${leaveType.id}">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'code',
                                label: i18n.t('settings.leaveCode'),
                                value: leaveType.code,
                                required: true,
                                maxLength: 5
                            })}

                            ${FormFieldComponent.text({
                                name: 'name',
                                label: i18n.t('settings.leaveNameEn'),
                                value: leaveType.name,
                                required: true
                            })}

                            ${FormFieldComponent.text({
                                name: 'nameTh',
                                label: i18n.t('settings.leaveNameTh'),
                                value: leaveType.nameTh,
                                required: true
                            })}

                            ${FormFieldComponent.number({
                                name: 'daysPerYear',
                                label: i18n.t('settings.daysPerYear'),
                                value: leaveType.daysPerYear,
                                required: true,
                                min: 1
                            })}

                            ${FormFieldComponent.select({
                                name: 'accrualType',
                                label: i18n.t('settings.accrualType'),
                                value: leaveType.accrualType,
                                required: true,
                                options: [
                                    { value: 'yearly', label: i18n.t('settings.accrual.yearly') },
                                    { value: 'monthly', label: i18n.t('settings.accrual.monthly') },
                                    { value: 'front_loaded', label: i18n.t('settings.accrual.front_loaded') },
                                    { value: 'event_based', label: i18n.t('settings.accrual.event_based') }
                                ]
                            })}

                            ${FormFieldComponent.number({
                                name: 'carryForwardLimit',
                                label: i18n.t('settings.carryForwardLimit'),
                                value: leaveType.carryForwardLimit,
                                min: 0
                            })}

                            ${FormFieldComponent.checkbox({
                                name: 'requiresCertificate',
                                label: i18n.t('settings.requiresCertificate'),
                                checked: leaveType.requiresCertificate
                            })}

                            ${FormFieldComponent.checkbox({
                                name: 'active',
                                label: i18n.t('settings.leaveTypeActive'),
                                checked: leaveType.active
                            })}
                        </div>
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('common.save'),
                        primary: true,
                        onclick: 'SettingsPage.submitEditLeaveType()'
                    }
                ]
            });
        },

        /**
         * Submit edit leave type
         */
        async submitEditLeaveType() {
            const formData = FormFieldComponent.getFormData('edit-leave-type-form');

            const index = settings.leaveTypes.findIndex(lt => lt.id === formData.id);
            if (index === -1) return;

            settings.leaveTypes[index] = {
                ...settings.leaveTypes[index],
                code: formData.code.toUpperCase(),
                name: formData.name,
                nameTh: formData.nameTh,
                daysPerYear: parseInt(formData.daysPerYear),
                accrualType: formData.accrualType,
                carryForwardLimit: parseInt(formData.carryForwardLimit) || 0,
                requiresCertificate: formData.requiresCertificate === 'on',
                active: formData.active === 'on'
            };

            hasUnsavedChanges = true;
            ModalComponent.close();
            ToastComponent.success(i18n.t('toast.saveSuccess'));

            // Refresh the tab
            const contentContainer = document.getElementById('settings-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderTabContent('leavePolicy');
            }
        },

        /**
         * Delete leave type
         */
        async deleteLeaveType(leaveTypeId) {
            const leaveType = settings.leaveTypes.find(lt => lt.id === leaveTypeId);
            if (!leaveType) return;

            const isThai = i18n.isThai();
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('common.delete'),
                message: i18n.t('settings.confirmDeleteLeaveType', { name: isThai ? leaveType.nameTh : leaveType.name }),
                confirmText: i18n.t('common.delete'),
                icon: 'delete'
            });

            if (confirmed) {
                settings.leaveTypes = settings.leaveTypes.filter(lt => lt.id !== leaveTypeId);
                hasUnsavedChanges = true;
                ToastComponent.success(i18n.t('toast.deleteSuccess'));

                // Refresh the tab
                const contentContainer = document.getElementById('settings-tab-content');
                if (contentContainer) {
                    contentContainer.innerHTML = this.renderTabContent('leavePolicy');
                }
            }
        },

        /**
         * Edit provident fund settings
         */
        editProvidentFundSettings() {
            const pf = settings.providentFund || {};

            ModalComponent.open({
                title: i18n.t('settings.editProvidentFund'),
                size: 'md',
                content: `
                    <form id="pf-settings-form" class="space-y-4">
                        ${FormFieldComponent.checkbox({
                            name: 'enabled',
                            label: i18n.t('settings.providentFundEnabled'),
                            checked: pf.enabled
                        })}

                        <div class="grid grid-cols-2 gap-4">
                            ${FormFieldComponent.number({
                                name: 'employerRate',
                                label: i18n.t('settings.employerContribution') + ' (%)',
                                value: pf.employerRate || 5,
                                min: 1,
                                max: 15
                            })}

                            ${FormFieldComponent.number({
                                name: 'employeeDefaultRate',
                                label: i18n.t('settings.employeeDefaultRate') + ' (%)',
                                value: pf.employeeDefaultRate || 5,
                                min: 3,
                                max: 15
                            })}

                            ${FormFieldComponent.number({
                                name: 'employeeMinRate',
                                label: i18n.t('settings.employeeMinContribution') + ' (%)',
                                value: pf.employeeMinRate || 3,
                                min: 1,
                                max: 15
                            })}

                            ${FormFieldComponent.number({
                                name: 'employeeMaxRate',
                                label: i18n.t('settings.employeeMaxContribution') + ' (%)',
                                value: pf.employeeMaxRate || 15,
                                min: 5,
                                max: 15
                            })}
                        </div>
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    {
                        label: i18n.t('common.save'),
                        primary: true,
                        onclick: 'SettingsPage.submitProvidentFundSettings()'
                    }
                ]
            });
        },

        /**
         * Submit provident fund settings
         */
        async submitProvidentFundSettings() {
            const formData = FormFieldComponent.getFormData('pf-settings-form');

            settings.providentFund = {
                ...settings.providentFund,
                enabled: formData.enabled === 'on',
                employerRate: parseInt(formData.employerRate),
                employeeDefaultRate: parseInt(formData.employeeDefaultRate),
                employeeMinRate: parseInt(formData.employeeMinRate),
                employeeMaxRate: parseInt(formData.employeeMaxRate)
            };

            hasUnsavedChanges = true;
            ModalComponent.close();
            ToastComponent.success(i18n.t('toast.saveSuccess'));

            // Refresh the tab
            const contentContainer = document.getElementById('settings-tab-content');
            if (contentContainer) {
                contentContainer.innerHTML = this.renderTabContent('payroll');
            }
        },

        /**
         * Edit auto-approve rules
         */
        editAutoApproveRules() {
            ToastComponent.info(i18n.t('settings.featureComingSoon'));
        },

        /**
         * Edit delegation settings
         */
        editDelegationSettings() {
            ToastComponent.info(i18n.t('settings.featureComingSoon'));
        },

        /**
         * Render skeleton loading state
         */
        renderSkeleton() {
            return `
                <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div class="skeleton shimmer" style="width: 200px; height: 32px; margin-bottom: 24px;"></div>
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div class="border-b border-gray-200 p-4">
                            <div class="flex gap-4">
                                ${[1, 2, 3, 4, 5, 6].map(() =>
                                    '<div class="skeleton shimmer" style="width: 100px; height: 36px;"></div>'
                                ).join('')}
                            </div>
                        </div>
                        <div class="p-6 space-y-6">
                            ${SkeletonComponent.renderCardSkeleton({ lines: 4, hasHeader: true })}
                            ${SkeletonComponent.renderCardSkeleton({ lines: 3, hasHeader: true })}
                            ${SkeletonComponent.renderCardSkeleton({ lines: 5, hasHeader: true })}
                        </div>
                    </div>
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsPage;
}

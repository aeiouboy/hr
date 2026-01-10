/**
 * Personal Information Page
 * Personal info, contacts, addresses, emergency contacts, dependents
 */

const PersonalInfoPage = (function() {
    return {
        /**
         * Render personal information tab
         * @param {object} employee
         * @returns {string}
         */
        render(employee) {
            // Show skeleton only if employee data is not available
            // Note: isLoading state is used by router for route transitions, not for data loading
            if (!employee) {
                return this.renderSkeleton();
            }

            const personal = employee.personalInfo || {};
            const contact = employee.contactInfo || {};
            const addresses = employee.addresses || [];
            const emergencyContacts = employee.emergencyContacts || [];
            const dependents = employee.dependents || [];
            const workPermit = employee.workPermit || null;
            const advancedInfo = employee.advancedInfo || null;

            return `
                <div class="space-y-6">
                    <!-- Personal Information Section -->
                    ${this.renderPersonalInfoSection(personal)}

                    <!-- Advanced Personal Information Section -->
                    ${this.renderAdvancedInfoSection(advancedInfo, personal.nationality)}

                    <!-- Contact Information Section -->
                    ${this.renderContactSection(contact)}

                    <!-- Address Information Section -->
                    ${this.renderAddressSection(addresses)}

                    <!-- Emergency Contacts Section -->
                    ${this.renderEmergencyContactsSection(emergencyContacts)}

                    <!-- Dependents Section -->
                    ${this.renderDependentsSection(dependents)}

                    <!-- Work Permit Information Section -->
                    ${this.renderWorkPermitSection(workPermit)}
                </div>
            `;
        },

        /**
         * Initialize page
         */
        init() {
            // Any initialization logic
        },

        /**
         * Render Personal Information section
         */
        renderPersonalInfoSection(personal) {
            const isThai = i18n.isThai();
            const canEdit = RBAC.canEditField('personalInfo', 'firstName');

            const items = [
                { label: i18n.t('personal.salutationEn'), value: personal.salutationEn },
                { label: i18n.t('personal.salutationTh'), value: personal.salutationTh },
                { label: i18n.t('personal.firstNameEn'), value: personal.firstNameEn },
                { label: i18n.t('personal.firstNameTh'), value: personal.firstNameTh },
                { label: i18n.t('personal.middleNameEn'), value: personal.middleNameEn || '-' },
                { label: i18n.t('personal.lastNameEn'), value: personal.lastNameEn },
                { label: i18n.t('personal.lastNameTh'), value: personal.lastNameTh },
                { label: i18n.t('personal.nickname'), value: personal.nickname || '-' },
                { label: i18n.t('personal.gender'), value: i18n.t(`gender.${personal.gender}`) },
                { label: i18n.t('personal.dateOfBirth'), value: DateUtils.format(personal.dateOfBirth, 'long') },
                { label: i18n.t('personal.nationality'), value: personal.nationality },
                { label: i18n.t('personal.nationalId'), value: MaskUtils.nationalId(personal.nationalId), options: { masked: true } },
                { label: i18n.t('personal.maritalStatus'), value: i18n.t(`maritalStatus.${personal.maritalStatus}`) },
                { label: i18n.t('personal.maritalStatusSince'), value: DateUtils.format(personal.maritalStatusSince, 'medium') || '-' }
            ];

            return CardComponent.render({
                id: 'personal-info-card',
                title: i18n.t('personal.title'),
                icon: 'person',
                editable: canEdit,
                onEdit: "PersonalInfoPage.editPersonalInfo()",
                showHistory: true,
                onHistory: "PersonalInfoPage.showHistory('personalInfo')",
                effectiveDate: personal.effectiveDate,
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Advanced Information section
         */
        renderAdvancedInfoSection(advancedInfo, nationality) {
            // Handle null/undefined advancedInfo
            if (!advancedInfo) {
                return CardComponent.emptyState(i18n.t('common.noData'));
            }

            const canEdit = RBAC.canEditField('advancedInfo', 'religion');
            const employee = AppState.get('employee');
            const personal = employee?.personalInfo || {};
            const items = [];

            // Always show: Religion, Blood Type
            items.push(
                { label: i18n.t('personal.religion'), value: advancedInfo.religion ? i18n.t(`religion.${advancedInfo.religion}`) : '-' },
                { label: i18n.t('personal.bloodType'), value: advancedInfo.bloodType || '-' }
            );

            // Show Military Status only for Thai males
            if (nationality === 'Thai' && personal.gender === 'male') {
                items.push({
                    label: i18n.t('personal.militaryStatus'),
                    value: advancedInfo.militaryStatus ? i18n.t(`militaryStatus.${advancedInfo.militaryStatus}`) : '-'
                });
            }

            // Show Visa Information only for non-Thai nationals
            if (nationality !== 'Thai') {
                items.push(
                    { label: i18n.t('personal.visaType'), value: advancedInfo.visaType ? i18n.t(`visaType.${advancedInfo.visaType}`) : '-' },
                    { label: i18n.t('personal.visaNumber'), value: advancedInfo.visaNumber || '-' },
                    { label: i18n.t('personal.visaIssueDate'), value: advancedInfo.visaIssueDate ? DateUtils.format(advancedInfo.visaIssueDate, 'medium') : '-' },
                    { label: i18n.t('personal.visaExpiryDate'), value: advancedInfo.visaExpiryDate ? DateUtils.format(advancedInfo.visaExpiryDate, 'medium') : '-' }
                );
            }

            return CardComponent.render({
                id: 'advanced-info-card',
                title: i18n.t('personal.advancedInfo'),
                icon: 'info',
                editable: canEdit,
                onEdit: "PersonalInfoPage.editAdvancedInfo()",
                showHistory: true,
                onHistory: "PersonalInfoPage.showHistory('advancedInfo')",
                effectiveDate: advancedInfo.effectiveDate,
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Contact Information section
         */
        renderContactSection(contact) {
            const canEdit = RBAC.canEditField('contactInfo', 'personalEmail');

            const items = [
                { label: i18n.t('personal.businessEmail'), value: contact.businessEmail, options: { icon: 'email' } },
                { label: i18n.t('personal.personalEmail'), value: contact.personalEmail || '-', options: { icon: 'email' } },
                { label: i18n.t('personal.businessPhone'), value: contact.businessPhone || '-', options: { icon: 'phone' } },
                { label: i18n.t('personal.personalMobile'), value: contact.personalMobile, options: { icon: 'smartphone' } },
                { label: i18n.t('personal.homePhone'), value: contact.homePhone || '-', options: { icon: 'home' } }
            ];

            return CardComponent.render({
                id: 'contact-info-card',
                title: i18n.t('personal.contact'),
                icon: 'contact_phone',
                editable: canEdit,
                onEdit: "PersonalInfoPage.editContactInfo()",
                showHistory: true,
                onHistory: "PersonalInfoPage.showHistory('contactInfo')",
                content: CardComponent.dataGrid(items)
            });
        },

        /**
         * Render Address Information section
         */
        renderAddressSection(addresses) {
            const canEdit = RBAC.canEditField('address', 'addressLine1');

            const content = addresses.map(addr => {
                const typeLabelKey = addr.addressType === 'permanent' ? 'permanentAddress' : 'currentAddress';
                const fullAddress = [
                    addr.addressLine1,
                    addr.addressLine2,
                    addr.subDistrict,
                    addr.district,
                    addr.province,
                    addr.postalCode,
                    addr.country
                ].filter(Boolean).join(', ');

                return `
                    <div class="p-4 bg-gray-50 rounded-lg mb-4 last:mb-0">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-medium text-gray-900">${i18n.t(`personal.${typeLabelKey}`)}</span>
                            ${canEdit ? `
                                <button class="p-1 hover:bg-gray-200 rounded" onclick="PersonalInfoPage.editAddress('${addr.id}')">
                                    <span class="material-icons text-sm text-gray-500">edit</span>
                                </button>
                            ` : ''}
                        </div>
                        <p class="text-sm text-gray-600">${fullAddress}</p>
                        <p class="text-xs text-gray-400 mt-2">
                            ${i18n.t('common.effectiveDate')}: ${DateUtils.format(addr.effectiveDate, 'medium')}
                        </p>
                    </div>
                `;
            }).join('');

            return CardComponent.render({
                id: 'address-info-card',
                title: i18n.t('personal.address'),
                icon: 'home',
                showHistory: true,
                onHistory: "PersonalInfoPage.showHistory('addresses')",
                content: content || CardComponent.emptyState(i18n.t('common.noData'))
            });
        },

        /**
         * Render Emergency Contacts section
         */
        renderEmergencyContactsSection(emergencyContacts) {
            const canAdd = RBAC.hasPermission('add_own_emergency_contacts');

            const content = emergencyContacts.length > 0
                ? emergencyContacts.map(contact => CardComponent.listItem({
                    id: contact.id,
                    title: contact.name,
                    subtitle: `${i18n.t(`relationship.${contact.relationship}`)} - ${contact.phone}`,
                    badge: contact.isPrimary ? i18n.t('personal.primary') : '',
                    badgeColor: 'bg-green-100 text-green-800',
                    onEdit: `PersonalInfoPage.editEmergencyContact('${contact.id}')`,
                    onDelete: `PersonalInfoPage.deleteEmergencyContact('${contact.id}')`
                })).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีผู้ติดต่อฉุกเฉิน' : 'No emergency contacts');

            return CardComponent.render({
                id: 'emergency-contacts-card',
                title: i18n.t('personal.emergencyContacts'),
                icon: 'emergency',
                actions: canAdd ? [{
                    icon: 'add',
                    label: i18n.t('personal.addEmergencyContact'),
                    onclick: 'PersonalInfoPage.addEmergencyContact()'
                }] : [],
                content: content
            });
        },

        /**
         * Render Dependents section
         */
        renderDependentsSection(dependents) {
            const canAdd = RBAC.hasPermission('edit_own_contact');

            const content = dependents.length > 0
                ? dependents.map(dep => CardComponent.listItem({
                    id: dep.id,
                    title: dep.name,
                    subtitle: `${i18n.t(`relationship.${dep.relationship}`)} - ${DateUtils.format(dep.dateOfBirth, 'medium')}`,
                    onEdit: `PersonalInfoPage.editDependent('${dep.id}')`,
                    onDelete: `PersonalInfoPage.deleteDependent('${dep.id}')`
                })).join('')
                : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีผู้พึ่งพิง' : 'No dependents');

            return CardComponent.render({
                id: 'dependents-card',
                title: i18n.t('personal.dependents'),
                icon: 'family_restroom',
                actions: canAdd ? [{
                    icon: 'add',
                    label: i18n.t('personal.addDependent'),
                    onclick: 'PersonalInfoPage.addDependent()'
                }] : [],
                content: content
            });
        },

        renderWorkPermitSection(workPermit) {
            // Handle null or undefined work permit
            if (!workPermit) {
                return CardComponent.render({
                    id: 'work-permit-card',
                    title: i18n.t('personal.workPermit'),
                    icon: 'badge',
                    content: CardComponent.emptyState(i18n.t('common.noData'))
                });
            }

            // Calculate days until expiry
            const today = new Date();
            const expiryDate = new Date(workPermit.expiryDate);
            const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));

            // Determine status badge
            let statusBadge = '';
            if (daysUntilExpiry < 0) {
                // Expired
                statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">${i18n.t('personal.statusExpired')}</span>`;
            } else if (daysUntilExpiry <= 90) {
                // Expiring soon (within 90 days)
                statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">${i18n.t('personal.statusExpiring')} (${daysUntilExpiry} ${i18n.t('personal.days')})</span>`;
            } else {
                // Active
                statusBadge = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">${i18n.t('personal.statusActive')}</span>`;
            }

            // Get permit type label
            const permitType = MockLookupData.permitTypes.find(p => p.value === workPermit.permitType);
            const permitTypeLabel = permitType
                ? (i18n.isThai() ? permitType.labelTh : permitType.labelEn)
                : workPermit.permitType;

            // Create data grid items
            const items = [
                {
                    label: i18n.t('personal.permitNumber'),
                    value: workPermit.permitNumber
                },
                {
                    label: i18n.t('personal.permitType'),
                    value: permitTypeLabel
                },
                {
                    label: i18n.t('personal.issueDate'),
                    value: DateUtils.format(workPermit.issueDate, 'medium')
                },
                {
                    label: i18n.t('personal.expiryDate'),
                    value: `${DateUtils.format(workPermit.expiryDate, 'medium')} ${statusBadge}`
                },
                {
                    label: i18n.t('personal.issuingAuthority'),
                    value: workPermit.issuingAuthority
                },
                {
                    label: i18n.t('personal.permitDocument'),
                    value: workPermit.attachmentUrl
                        ? `<a href="${workPermit.attachmentUrl}" class="text-blue-600 hover:text-blue-800 flex items-center" download>
                            <span class="material-icons text-sm mr-1">download</span>
                            ${i18n.t('common.download')}
                        </a>`
                        : '-'
                }
            ];

            const content = CardComponent.dataGrid(items);

            return CardComponent.render({
                id: 'work-permit-card',
                title: i18n.t('personal.workPermit'),
                icon: 'badge',
                editable: RBAC.canEditField('workPermit', 'permitNumber'),
                onEdit: 'PersonalInfoPage.editWorkPermit()',
                showHistory: true,
                onHistory: "PersonalInfoPage.showHistory('workPermit')",
                content: content
            });
        },

        // Edit handlers
        editPersonalInfo() {
            const employee = AppState.get('currentEmployee');
            const personal = employee?.personalInfo || {};

            ModalComponent.open({
                title: i18n.t('personal.editPersonalInfo'),
                size: 'lg',
                content: `
                    <form id="personal-info-form" class="space-y-4">
                        ${FormFieldComponent.date({
                            name: 'effectiveDate',
                            label: i18n.t('common.effectiveDate'),
                            required: true,
                            value: DateUtils.today(),
                            min: DateUtils.today(),
                            hint: i18n.isThai() ? 'วันที่การเปลี่ยนแปลงจะมีผล' : 'When should these changes take effect?'
                        })}
                        <hr class="my-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.select({
                                name: 'salutationEn',
                                label: i18n.t('personal.salutationEn'),
                                value: personal.salutationEn,
                                options: MockLookupData.salutations.en
                            })}
                            ${FormFieldComponent.select({
                                name: 'salutationTh',
                                label: i18n.t('personal.salutationTh'),
                                value: personal.salutationTh,
                                options: MockLookupData.salutations.th
                            })}
                            ${FormFieldComponent.text({
                                name: 'firstNameEn',
                                label: i18n.t('personal.firstNameEn'),
                                value: personal.firstNameEn,
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'firstNameTh',
                                label: i18n.t('personal.firstNameTh'),
                                value: personal.firstNameTh
                            })}
                            ${FormFieldComponent.text({
                                name: 'lastNameEn',
                                label: i18n.t('personal.lastNameEn'),
                                value: personal.lastNameEn,
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'lastNameTh',
                                label: i18n.t('personal.lastNameTh'),
                                value: personal.lastNameTh
                            })}
                            ${FormFieldComponent.text({
                                name: 'nickname',
                                label: i18n.t('personal.nickname'),
                                value: personal.nickname
                            })}
                            ${FormFieldComponent.select({
                                name: 'maritalStatus',
                                label: i18n.t('personal.maritalStatus'),
                                value: personal.maritalStatus,
                                options: MockLookupData.maritalStatuses.map(s => ({
                                    value: s.value,
                                    label: i18n.isThai() ? s.labelTh : s.labelEn
                                }))
                            })}
                        </div>
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.savePersonalInfo()' }
                ]
            });
        },

        async savePersonalInfo() {
            const formData = FormFieldComponent.getFormData('personal-info-form');

            // Validate
            const validation = ValidationUtils.validateForm(formData, {
                effectiveDate: { required: true, futureDate: true },
                firstNameEn: { required: true, minLength: 2 },
                lastNameEn: { required: true, minLength: 2 }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                ToastComponent.error(i18n.t('error.validationFailed'));
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');
                await API.updatePersonalInfo(employee.employeeId, formData);
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        editContactInfo() {
            const employee = AppState.get('currentEmployee');
            const contact = employee?.contactInfo || {};

            ModalComponent.open({
                title: i18n.t('personal.editContactInfo'),
                size: 'md',
                content: `
                    <form id="contact-info-form" class="space-y-4">
                        ${FormFieldComponent.text({
                            name: 'personalEmail',
                            label: i18n.t('personal.personalEmail'),
                            value: contact.personalEmail,
                            type: 'email'
                        })}
                        ${FormFieldComponent.text({
                            name: 'personalMobile',
                            label: i18n.t('personal.personalMobile'),
                            value: contact.personalMobile,
                            type: 'tel',
                            required: true
                        })}
                        ${FormFieldComponent.text({
                            name: 'homePhone',
                            label: i18n.t('personal.homePhone'),
                            value: contact.homePhone,
                            type: 'tel'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveContactInfo()' }
                ]
            });
        },

        async saveContactInfo() {
            const formData = FormFieldComponent.getFormData('contact-info-form');

            const validation = ValidationUtils.validateForm(formData, {
                personalEmail: { email: true },
                personalMobile: { required: true, phone: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');
                await API.updateContactInfo(employee.employeeId, formData);
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        addEmergencyContact() {
            this.openEmergencyContactModal();
        },

        editEmergencyContact(contactId) {
            const employee = AppState.get('currentEmployee');
            const contact = employee?.emergencyContacts?.find(c => c.id === contactId);
            this.openEmergencyContactModal(contact);
        },

        openEmergencyContactModal(contact = null) {
            const isEdit = !!contact;

            ModalComponent.open({
                title: isEdit ? i18n.t('common.edit') + ' ' + i18n.t('personal.emergencyContact') : i18n.t('personal.addEmergencyContact'),
                size: 'md',
                content: `
                    <form id="emergency-contact-form" class="space-y-4">
                        <input type="hidden" name="id" value="${contact?.id || ''}">
                        ${FormFieldComponent.text({
                            name: 'name',
                            label: i18n.t('personal.contactName'),
                            value: contact?.name || '',
                            required: true
                        })}
                        ${FormFieldComponent.select({
                            name: 'relationship',
                            label: i18n.t('personal.relationship'),
                            value: contact?.relationship || '',
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: MockLookupData.relationships.map(r => ({
                                value: r.value,
                                label: i18n.isThai() ? r.labelTh : r.labelEn
                            }))
                        })}
                        ${FormFieldComponent.text({
                            name: 'phone',
                            label: i18n.t('personal.phone'),
                            value: contact?.phone || '',
                            required: true,
                            type: 'tel'
                        })}
                        ${FormFieldComponent.checkbox({
                            name: 'isPrimary',
                            label: i18n.t('personal.isPrimary'),
                            checked: contact?.isPrimary || false
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveEmergencyContact()' }
                ]
            });
        },

        async saveEmergencyContact() {
            const formData = FormFieldComponent.getFormData('emergency-contact-form');

            const validation = ValidationUtils.validateForm(formData, {
                name: { required: true, minLength: 2 },
                relationship: { required: true },
                phone: { required: true, phone: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');
                if (formData.id) {
                    await API.updateEmergencyContact(employee.employeeId, formData.id, formData);
                } else {
                    await API.addEmergencyContact(employee.employeeId, formData);
                }
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        async deleteEmergencyContact(contactId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('common.delete'),
                message: i18n.isThai() ? 'คุณต้องการลบผู้ติดต่อฉุกเฉินนี้หรือไม่?' : 'Are you sure you want to delete this emergency contact?',
                confirmText: i18n.t('common.delete'),
                icon: 'delete'
            });

            if (confirmed) {
                try {
                    const employee = AppState.get('currentEmployee');
                    await API.deleteEmergencyContact(employee.employeeId, contactId);
                    ToastComponent.success(i18n.t('toast.deleteSuccess'));
                    Router.refresh();
                } catch (error) {
                    ToastComponent.error(i18n.t('error.saveFailed'));
                }
            }
        },

        addDependent() {
            this.openDependentModal();
        },

        editDependent(dependentId) {
            const employee = AppState.get('currentEmployee');
            const dependent = employee?.dependents?.find(d => d.id === dependentId);
            this.openDependentModal(dependent);
        },

        openDependentModal(dependent = null) {
            const isEdit = !!dependent;

            ModalComponent.open({
                title: isEdit ? i18n.t('common.edit') + ' ' + i18n.t('personal.dependent') : i18n.t('personal.addDependent'),
                size: 'md',
                content: `
                    <form id="dependent-form" class="space-y-4">
                        <input type="hidden" name="id" value="${dependent?.id || ''}">
                        ${FormFieldComponent.text({
                            name: 'name',
                            label: i18n.t('personal.dependentName'),
                            value: dependent?.name || '',
                            required: true
                        })}
                        ${FormFieldComponent.select({
                            name: 'relationship',
                            label: i18n.t('personal.relationship'),
                            value: dependent?.relationship || '',
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: MockLookupData.dependentTypes.map(r => ({
                                value: r.value,
                                label: i18n.isThai() ? r.labelTh : r.labelEn
                            }))
                        })}
                        ${FormFieldComponent.date({
                            name: 'dateOfBirth',
                            label: i18n.t('personal.dateOfBirth'),
                            value: dependent?.dateOfBirth || '',
                            required: true,
                            max: DateUtils.today()
                        })}
                        ${FormFieldComponent.select({
                            name: 'gender',
                            label: i18n.t('personal.gender'),
                            value: dependent?.gender || '',
                            options: MockLookupData.genders.map(g => ({
                                value: g.value,
                                label: i18n.isThai() ? g.labelTh : g.labelEn
                            }))
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveDependent()' }
                ]
            });
        },

        async saveDependent() {
            const formData = FormFieldComponent.getFormData('dependent-form');

            const validation = ValidationUtils.validateForm(formData, {
                name: { required: true, minLength: 2 },
                relationship: { required: true },
                dateOfBirth: { required: true, pastDate: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');
                if (formData.id) {
                    await API.updateDependent(employee.employeeId, formData.id, formData);
                } else {
                    await API.addDependent(employee.employeeId, formData);
                }
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        async deleteDependent(dependentId) {
            const confirmed = await ModalComponent.confirm({
                title: i18n.t('common.delete'),
                message: i18n.isThai() ? 'คุณต้องการลบผู้พึ่งพิงนี้หรือไม่?' : 'Are you sure you want to delete this dependent?',
                confirmText: i18n.t('common.delete'),
                icon: 'delete'
            });

            if (confirmed) {
                try {
                    const employee = AppState.get('currentEmployee');
                    await API.deleteDependent(employee.employeeId, dependentId);
                    ToastComponent.success(i18n.t('toast.deleteSuccess'));
                    Router.refresh();
                } catch (error) {
                    ToastComponent.error(i18n.t('error.saveFailed'));
                }
            }
        },

        editWorkPermit() {
            const employee = AppState.get('currentEmployee');
            const workPermit = employee?.workPermit;
            this.openWorkPermitModal(workPermit);
        },

        openWorkPermitModal(workPermit = null) {
            ModalComponent.open({
                title: i18n.t('personal.editWorkPermit'),
                size: 'lg',
                content: `
                    <form id="work-permit-form" class="space-y-4">
                        ${FormFieldComponent.text({
                            name: 'permitNumber',
                            label: i18n.t('personal.permitNumber'),
                            value: workPermit?.permitNumber || '',
                            required: true
                        })}
                        ${FormFieldComponent.select({
                            name: 'permitType',
                            label: i18n.t('personal.permitType'),
                            value: workPermit?.permitType || '',
                            required: true,
                            placeholder: i18n.t('common.select'),
                            options: MockLookupData.permitTypes.map(p => ({
                                value: p.value,
                                label: i18n.isThai() ? p.labelTh : p.labelEn
                            }))
                        })}
                        ${FormFieldComponent.date({
                            name: 'issueDate',
                            label: i18n.t('personal.issueDate'),
                            value: workPermit?.issueDate || '',
                            required: true,
                            max: DateUtils.today()
                        })}
                        ${FormFieldComponent.date({
                            name: 'expiryDate',
                            label: i18n.t('personal.expiryDate'),
                            value: workPermit?.expiryDate || '',
                            required: true,
                            min: DateUtils.today()
                        })}
                        ${FormFieldComponent.text({
                            name: 'issuingAuthority',
                            label: i18n.t('personal.issuingAuthority'),
                            value: workPermit?.issuingAuthority || '',
                            required: true
                        })}
                        ${FormFieldComponent.file({
                            name: 'permitDocument',
                            label: i18n.t('personal.permitDocument'),
                            accept: '.pdf,.jpg,.jpeg,.png',
                            hint: i18n.isThai()
                                ? 'รองรับไฟล์ PDF, JPG, PNG (ขนาดไม่เกิน 5MB)'
                                : 'Accepts PDF, JPG, PNG (max 5MB)'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveWorkPermit()' }
                ]
            });
        },

        async saveWorkPermit() {
            const formData = FormFieldComponent.getFormData('work-permit-form');

            // Validate required fields
            const validation = ValidationUtils.validateForm(formData, {
                permitNumber: { required: true, minLength: 5 },
                permitType: { required: true },
                issueDate: { required: true, pastDate: true },
                expiryDate: { required: true, futureDate: true },
                issuingAuthority: { required: true, minLength: 3 }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');

                // Handle file upload if present
                const fileInput = document.querySelector('input[name="permitDocument"]');
                if (fileInput?.files?.length > 0) {
                    const file = fileInput.files[0];
                    const uploadResult = await API.uploadPermitDocument(employee.employeeId, file);
                    formData.attachmentUrl = uploadResult.url;
                }

                // Update work permit
                const result = await API.updateWorkPermit(employee.employeeId, formData);

                if (result.requiresApproval) {
                    ToastComponent.success(result.message);
                } else {
                    ToastComponent.success(i18n.t('toast.saveSuccess'));
                }

                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                console.error('Error saving work permit:', error);
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        /**
         * Edit Advanced Information
         */
        editAdvancedInfo() {
            const employee = AppState.get('currentEmployee');
            const advancedInfo = employee?.advancedInfo;
            const nationality = employee?.personalInfo?.nationality || 'Thai';
            const gender = employee?.personalInfo?.gender || 'male';
            this.openAdvancedInfoModal(advancedInfo, nationality, gender);
        },

        /**
         * Open Advanced Information modal
         */
        openAdvancedInfoModal(advancedInfo = null, nationality = 'Thai', gender = 'male') {
            const isThai = nationality === 'Thai';
            const isThaiMale = isThai && gender === 'male';

            ModalComponent.open({
                title: i18n.t('personal.editAdvancedInfo'),
                size: 'lg',
                content: `
                    <form id="advanced-info-form" class="space-y-4">
                        ${FormFieldComponent.date({
                            name: 'effectiveDate',
                            label: i18n.t('common.effectiveDate'),
                            value: advancedInfo?.effectiveDate || '',
                            required: true,
                            max: DateUtils.today()
                        })}

                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">
                            ${i18n.t('personal.healthInformation')}
                        </h4>
                        ${FormFieldComponent.select({
                            name: 'bloodType',
                            label: i18n.t('personal.bloodType'),
                            value: advancedInfo?.bloodType || '',
                            placeholder: i18n.t('common.select'),
                            options: MockLookupData.bloodTypes.map(b => ({
                                value: b.labelEn,
                                label: i18n.isThai() ? b.labelTh : b.labelEn
                            }))
                        })}

                        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">
                            ${i18n.t('personal.religion')}
                        </h4>
                        ${FormFieldComponent.select({
                            name: 'religion',
                            label: i18n.t('personal.religion'),
                            value: advancedInfo?.religion || '',
                            placeholder: i18n.t('common.select'),
                            options: MockLookupData.religions.map(r => ({
                                value: r.value,
                                label: i18n.isThai() ? r.labelTh : r.labelEn
                            }))
                        })}

                        ${isThaiMale ? `
                            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">
                                ${i18n.t('personal.militaryInformation')}
                            </h4>
                            ${FormFieldComponent.select({
                                name: 'militaryStatus',
                                label: i18n.t('personal.militaryStatus'),
                                value: advancedInfo?.militaryStatus || '',
                                required: true,
                                placeholder: i18n.t('common.select'),
                                options: MockLookupData.militaryStatuses.map(m => ({
                                    value: m.value,
                                    label: i18n.isThai() ? m.labelTh : m.labelEn
                                }))
                            })}
                        ` : ''}

                        ${!isThai ? `
                            <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-4">
                                ${i18n.t('personal.visaInformation')}
                            </h4>
                            ${FormFieldComponent.select({
                                name: 'visaType',
                                label: i18n.t('personal.visaType'),
                                value: advancedInfo?.visaType || '',
                                required: true,
                                placeholder: i18n.t('common.select'),
                                options: MockLookupData.visaTypes.map(v => ({
                                    value: v.value,
                                    label: i18n.isThai() ? v.labelTh : v.labelEn
                                }))
                            })}
                            ${FormFieldComponent.text({
                                name: 'visaNumber',
                                label: i18n.t('personal.visaNumber'),
                                value: advancedInfo?.visaNumber || '',
                                required: true
                            })}
                            ${FormFieldComponent.date({
                                name: 'visaIssueDate',
                                label: i18n.t('personal.visaIssueDate'),
                                value: advancedInfo?.visaIssueDate || '',
                                required: true,
                                max: DateUtils.today()
                            })}
                            ${FormFieldComponent.date({
                                name: 'visaExpiryDate',
                                label: i18n.t('personal.visaExpiryDate'),
                                value: advancedInfo?.visaExpiryDate || '',
                                required: true,
                                min: DateUtils.today()
                            })}
                        ` : ''}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveAdvancedInfo()' }
                ]
            });
        },

        /**
         * Save Advanced Information
         */
        async saveAdvancedInfo() {
            const formData = FormFieldComponent.getFormData('advanced-info-form');
            const employee = AppState.get('currentEmployee');
            const nationality = employee?.personalInfo?.nationality || 'Thai';
            const gender = employee?.personalInfo?.gender || 'male';

            // Build validation rules based on nationality and gender
            const validationRules = {
                effectiveDate: { required: true, pastOrPresent: true },
                religion: { required: false },
                bloodType: { required: false }
            };

            // Add military status validation for Thai males
            if (nationality === 'Thai' && gender === 'male') {
                validationRules.militaryStatus = { required: true };
            }

            // Add visa validation for non-Thai nationals
            if (nationality !== 'Thai') {
                validationRules.visaType = { required: true };
                validationRules.visaNumber = { required: true, minLength: 5 };
                validationRules.visaIssueDate = { required: true, pastOrPresent: true };
                validationRules.visaExpiryDate = { required: true, futureDate: true };
            }

            // Validate form
            const validation = ValidationUtils.validateForm(formData, validationRules);

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                // Update advanced info
                const result = await API.updateAdvancedInfo(employee.employeeId, formData);

                if (result.requiresApproval) {
                    ToastComponent.success(result.message);
                } else {
                    ToastComponent.success(i18n.t('toast.saveSuccess'));
                }

                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                console.error('Error saving advanced info:', error);
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        editAddress(addressId) {
            const employee = AppState.get('currentEmployee');
            const address = employee?.addresses?.find(a => a.id === addressId);

            if (!address) return;

            ModalComponent.open({
                title: i18n.t('personal.editAddress'),
                size: 'lg',
                content: `
                    <form id="address-form" class="space-y-4">
                        <input type="hidden" name="id" value="${address.id}">
                        <input type="hidden" name="addressType" value="${address.addressType}">
                        ${FormFieldComponent.date({
                            name: 'effectiveDate',
                            label: i18n.t('common.effectiveDate'),
                            required: true,
                            value: DateUtils.today(),
                            min: DateUtils.today()
                        })}
                        <hr>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${FormFieldComponent.text({
                                name: 'addressLine1',
                                label: i18n.t('personal.addressLine1'),
                                value: address.addressLine1,
                                required: true
                            })}
                            ${FormFieldComponent.text({
                                name: 'addressLine2',
                                label: i18n.t('personal.addressLine2'),
                                value: address.addressLine2
                            })}
                            ${FormFieldComponent.text({
                                name: 'subDistrict',
                                label: i18n.t('personal.subDistrict'),
                                value: address.subDistrict
                            })}
                            ${FormFieldComponent.text({
                                name: 'district',
                                label: i18n.t('personal.district'),
                                value: address.district
                            })}
                            ${FormFieldComponent.select({
                                name: 'province',
                                label: i18n.t('personal.province'),
                                value: address.province,
                                required: true,
                                options: MockLookupData.provinces.map(p => ({
                                    value: p.value,
                                    label: i18n.isThai() ? p.labelTh : p.labelEn
                                }))
                            })}
                            ${FormFieldComponent.text({
                                name: 'postalCode',
                                label: i18n.t('personal.postalCode'),
                                value: address.postalCode,
                                required: true
                            })}
                            ${FormFieldComponent.select({
                                name: 'country',
                                label: i18n.t('personal.country'),
                                value: address.country,
                                required: true,
                                options: MockLookupData.countries.map(c => ({
                                    value: c.value,
                                    label: i18n.isThai() ? c.labelTh : c.labelEn
                                }))
                            })}
                        </div>
                        ${FormFieldComponent.file({
                            name: 'attachment',
                            label: i18n.t('personal.attachment'),
                            accept: '.pdf,.jpg,.jpeg,.png',
                            hint: i18n.isThai() ? 'แนบเอกสารยืนยันที่อยู่ (ถ้ามี)' : 'Attach address verification document (if any)'
                        })}
                    </form>
                `,
                actions: [
                    { label: i18n.t('common.cancel'), onclick: 'ModalComponent.close()' },
                    { label: i18n.t('common.save'), primary: true, onclick: 'PersonalInfoPage.saveAddress()' }
                ]
            });
        },

        async saveAddress() {
            const formData = FormFieldComponent.getFormData('address-form');

            const validation = ValidationUtils.validateForm(formData, {
                effectiveDate: { required: true, futureDate: true },
                addressLine1: { required: true },
                province: { required: true },
                postalCode: { required: true, postalCode: true },
                country: { required: true }
            });

            if (!validation.valid) {
                FormFieldComponent.showErrors(validation.errors);
                return;
            }

            try {
                const employee = AppState.get('currentEmployee');
                await API.updateAddress(employee.employeeId, formData);
                ToastComponent.success(i18n.t('toast.saveSuccess'));
                ModalComponent.close();
                Router.refresh();
            } catch (error) {
                ToastComponent.error(i18n.t('error.saveFailed'));
            }
        },

        showHistory(section) {
            const employee = AppState.get('currentEmployee');
            const history = employee?.history?.[section] || [];

            ModalComponent.open({
                title: i18n.t('common.history'),
                size: 'lg',
                content: history.length > 0 ? `
                    <div class="space-y-4">
                        ${history.map(item => `
                            <div class="relative pl-6 pb-4 timeline-item">
                                <div class="absolute left-0 top-0 w-4 h-4 bg-cg-info rounded-full"></div>
                                <div class="bg-gray-50 rounded-lg p-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <span class="font-medium text-gray-900">${item.field}</span>
                                        <span class="text-xs text-gray-500">${DateUtils.formatDateTime(item.changedAt)}</span>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span class="text-gray-500">${i18n.isThai() ? 'ค่าเดิม:' : 'Old Value:'}</span>
                                            <span class="ml-2 text-red-600">${item.oldValue || '-'}</span>
                                        </div>
                                        <div>
                                            <span class="text-gray-500">${i18n.isThai() ? 'ค่าใหม่:' : 'New Value:'}</span>
                                            <span class="ml-2 text-green-600">${item.newValue || '-'}</span>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-400 mt-2">
                                        ${i18n.isThai() ? 'โดย:' : 'By:'} ${item.changedBy}
                                    </p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : CardComponent.emptyState(i18n.isThai() ? 'ไม่มีประวัติการเปลี่ยนแปลง' : 'No change history'),
                actions: [
                    { label: i18n.t('common.close'), primary: true, onclick: 'ModalComponent.close()' }
                ]
            });
        },

        /**
         * Render skeleton loading state
         * @returns {string}
         */
        renderSkeleton() {
            return `
                <div class="space-y-6">
                    ${SkeletonComponent.renderCardSkeleton({ lines: 5 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 4 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                    ${SkeletonComponent.renderCardSkeleton({ lines: 3 })}
                </div>
            `;
        }
    };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalInfoPage;
}

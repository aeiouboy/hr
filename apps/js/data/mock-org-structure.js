/**
 * Mock Organization Structure Data
 * Multi-company hierarchy data for enhanced org chart (Epic 1.1)
 */

const MockOrgStructure = {
    // Business Group (Top Level)
    businessGroup: {
        id: 'BG001',
        code: 'CG',
        nameEn: 'Central Group',
        nameTh: 'เซ็นทรัล กรุ๊ป',
        costCenter: 'CC-BG-001'
    },

    // Companies under Business Group
    companies: [
        {
            id: 'C015',
            code: 'RIS',
            nameEn: 'Retail Information System Co., Ltd.',
            nameTh: 'บริษัท รีเทล อินฟอร์เมชั่น ซิสเต็ม จำกัด',
            costCenter: 'CC-RIS-001',
            businessGroupId: 'BG001',
            headcount: 245,
            budget: 280,
            logoUrl: null
        },
        {
            id: 'C001',
            code: 'CDS',
            nameEn: 'Central Department Store Co., Ltd.',
            nameTh: 'บริษัท ห้างเซ็นทรัล ดีพาทเมนท์สโตร์ จำกัด',
            costCenter: 'CC-CDS-001',
            businessGroupId: 'BG001',
            headcount: 12500,
            budget: 13000,
            logoUrl: null
        },
        {
            id: 'C002',
            code: 'CRC',
            nameEn: 'Central Retail Corporation Ltd.',
            nameTh: 'บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด',
            costCenter: 'CC-CRC-001',
            businessGroupId: 'BG001',
            headcount: 8200,
            budget: 8500,
            logoUrl: null
        },
        {
            id: 'C003',
            code: 'COL',
            nameEn: 'Central Online Co., Ltd.',
            nameTh: 'บริษัท เซ็นทรัลออนไลน์ จำกัด',
            costCenter: 'CC-COL-001',
            businessGroupId: 'BG001',
            headcount: 520,
            budget: 600,
            logoUrl: null
        }
    ],

    // Departments/Organization Units
    departments: [
        // RIS Departments
        {
            id: 'D001',
            code: '30040490',
            nameEn: 'Product Management',
            nameTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            companyId: 'C015',
            parentDepartmentId: 'D000',
            costCenter: 'CC-RIS-PM-001',
            headcount: 25,
            budget: 28
        },
        {
            id: 'D000',
            code: '30040400',
            nameEn: 'Technology Division',
            nameTh: 'สายงานเทคโนโลยี',
            companyId: 'C015',
            parentDepartmentId: null,
            costCenter: 'CC-RIS-TECH-001',
            headcount: 180,
            budget: 200
        },
        {
            id: 'D002',
            code: '30040491',
            nameEn: 'Engineering',
            nameTh: 'ฝ่ายวิศวกรรม',
            companyId: 'C015',
            parentDepartmentId: 'D000',
            costCenter: 'CC-RIS-ENG-001',
            headcount: 85,
            budget: 95
        },
        {
            id: 'D003',
            code: '30040492',
            nameEn: 'Quality Assurance',
            nameTh: 'ฝ่ายประกันคุณภาพ',
            companyId: 'C015',
            parentDepartmentId: 'D000',
            costCenter: 'CC-RIS-QA-001',
            headcount: 20,
            budget: 22
        },
        {
            id: 'D004',
            code: '30040493',
            nameEn: 'DevOps & Infrastructure',
            nameTh: 'ฝ่ายดีฟออปส์และโครงสร้างพื้นฐาน',
            companyId: 'C015',
            parentDepartmentId: 'D000',
            costCenter: 'CC-RIS-DEVOPS-001',
            headcount: 30,
            budget: 35
        },
        {
            id: 'D010',
            code: '30040500',
            nameEn: 'Corporate Services',
            nameTh: 'ฝ่ายบริการองค์กร',
            companyId: 'C015',
            parentDepartmentId: null,
            costCenter: 'CC-RIS-CORP-001',
            headcount: 45,
            budget: 50
        },
        {
            id: 'D011',
            code: '30040501',
            nameEn: 'Human Resources',
            nameTh: 'ฝ่ายทรัพยากรบุคคล',
            companyId: 'C015',
            parentDepartmentId: 'D010',
            costCenter: 'CC-RIS-HR-001',
            headcount: 15,
            budget: 16
        },
        {
            id: 'D012',
            code: '30040502',
            nameEn: 'Finance & Accounting',
            nameTh: 'ฝ่ายการเงินและบัญชี',
            companyId: 'C015',
            parentDepartmentId: 'D010',
            costCenter: 'CC-RIS-FIN-001',
            headcount: 18,
            budget: 20
        },
        // CDS Department examples
        {
            id: 'D100',
            code: '40001000',
            nameEn: 'Store Operations',
            nameTh: 'ฝ่ายปฏิบัติการร้านค้า',
            companyId: 'C001',
            parentDepartmentId: null,
            costCenter: 'CC-CDS-OPS-001',
            headcount: 8500,
            budget: 9000
        },
        {
            id: 'D101',
            code: '40001001',
            nameEn: 'Marketing',
            nameTh: 'ฝ่ายการตลาด',
            companyId: 'C001',
            parentDepartmentId: null,
            costCenter: 'CC-CDS-MKT-001',
            headcount: 450,
            budget: 500
        }
    ],

    // Positions
    positions: [
        // RIS Positions - Technology Division
        {
            id: 'P001',
            code: '40128300',
            nameEn: 'Chief Technology Officer',
            nameTh: 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี',
            departmentId: 'D000',
            companyId: 'C015',
            costCenter: 'CC-RIS-TECH-001',
            level: 1,
            headcount: 1,
            budget: 1,
            isFilled: true
        },
        {
            id: 'P002',
            code: '40128301',
            nameEn: 'Head of Product',
            nameTh: 'หัวหน้าฝ่ายผลิตภัณฑ์',
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            level: 2,
            headcount: 1,
            budget: 1,
            isFilled: true
        },
        {
            id: 'P003',
            code: '40128307',
            nameEn: 'Product Manager',
            nameTh: 'ผู้จัดการผลิตภัณฑ์',
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            level: 3,
            headcount: 5,
            budget: 6,
            isFilled: true
        },
        {
            id: 'P004',
            code: '40128308',
            nameEn: 'Senior Product Analyst',
            nameTh: 'นักวิเคราะห์ผลิตภัณฑ์อาวุโส',
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            level: 4,
            headcount: 8,
            budget: 10,
            isFilled: true
        },
        {
            id: 'P005',
            code: '40128309',
            nameEn: 'Product Analyst',
            nameTh: 'นักวิเคราะห์ผลิตภัณฑ์',
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            level: 5,
            headcount: 10,
            budget: 12,
            isFilled: true
        },
        {
            id: 'P006',
            code: '40128310',
            nameEn: 'Associate Product Manager',
            nameTh: 'ผู้ช่วยผู้จัดการผลิตภัณฑ์',
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            level: 4,
            headcount: 3,
            budget: 5,
            isFilled: false // Vacant position
        },
        // Engineering positions
        {
            id: 'P010',
            code: '40128320',
            nameEn: 'Head of Engineering',
            nameTh: 'หัวหน้าฝ่ายวิศวกรรม',
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            level: 2,
            headcount: 1,
            budget: 1,
            isFilled: true
        },
        {
            id: 'P011',
            code: '40128321',
            nameEn: 'Engineering Manager',
            nameTh: 'ผู้จัดการวิศวกรรม',
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            level: 3,
            headcount: 4,
            budget: 5,
            isFilled: true
        },
        {
            id: 'P012',
            code: '40128322',
            nameEn: 'Senior Software Engineer',
            nameTh: 'วิศวกรซอฟต์แวร์อาวุโส',
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            level: 4,
            headcount: 25,
            budget: 30,
            isFilled: true
        },
        {
            id: 'P013',
            code: '40128323',
            nameEn: 'Software Engineer',
            nameTh: 'วิศวกรซอฟต์แวร์',
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            level: 5,
            headcount: 40,
            budget: 45,
            isFilled: true
        },
        // QA positions
        {
            id: 'P020',
            code: '40128330',
            nameEn: 'Head of QA',
            nameTh: 'หัวหน้าฝ่ายประกันคุณภาพ',
            departmentId: 'D003',
            companyId: 'C015',
            costCenter: 'CC-RIS-QA-001',
            level: 2,
            headcount: 1,
            budget: 1,
            isFilled: true
        },
        // HR positions
        {
            id: 'P030',
            code: '40128340',
            nameEn: 'HR Director',
            nameTh: 'ผู้อำนวยการฝ่ายทรัพยากรบุคคล',
            departmentId: 'D011',
            companyId: 'C015',
            costCenter: 'CC-RIS-HR-001',
            level: 2,
            headcount: 1,
            budget: 1,
            isFilled: true
        }
    ],

    // Employees in org structure (matching real Central Group hierarchy)
    employees: [
        // Executive Chairman & CEO
        {
            id: 'EMP_L0',
            employeeId: 'EMP_L0',
            nameEn: 'Tos Chirathivat',
            nameTh: 'ทศ จิราธิวัฒน์',
            positionId: 'P_CEO',
            departmentId: 'D_EXEC',
            companyId: 'C002',
            photo: 'https://i.pravatar.cc/150?img=23',
            email: 'tos.c@central.co.th',
            phone: '+66 2 021 9000',
            isVacant: false,
            headcount: 16,
            totalHeadcount: 67704
        },
        // CEO - CRC
        {
            id: 'EMP_L1',
            employeeId: 'EMP_L1',
            nameEn: 'Suthisarn Chirathivat',
            nameTh: 'สุทธิศาสน์ จิราธิวัฒน์',
            positionId: 'P_CEO_CRC',
            departmentId: 'D_EXEC',
            companyId: 'C002',
            photo: 'https://i.pravatar.cc/150?img=22',
            email: 'suthisarn.c@central.co.th',
            phone: '+66 2 021 9001',
            isVacant: false,
            headcount: 18,
            totalHeadcount: 59002
        },
        // CIO
        {
            id: 'EMP_L2',
            employeeId: 'EMP_L2',
            nameEn: 'Rutchapon Vongsatitporn',
            nameTh: 'รัชพล วงศ์สถิตย์พร',
            positionId: 'P001',
            departmentId: 'D000',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=21',
            email: 'rutchapon.v@central.co.th',
            phone: '+66 2 021 9100',
            isVacant: false,
            headcount: 5,
            totalHeadcount: 465
        },
        // Head of IT Strategy, Application & International
        {
            id: 'EMP_L3',
            employeeId: 'EMP_L3',
            nameEn: 'Maneerat Suramethakul',
            nameTh: 'มณีรัตน์ สุระเมทกุล',
            positionId: 'P_HEAD_IT',
            departmentId: 'D000',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=20',
            email: 'maneerat.s@central.co.th',
            phone: '+66 2 021 9110',
            isVacant: false,
            headcount: 7,
            totalHeadcount: 266
        },
        // Head of IT Strategy & Products
        {
            id: 'EMP_SUP002',
            employeeId: 'EMP_SUP002',
            nameEn: 'Kajorn Kanjanawarin',
            nameTh: 'ขจร กาญจนวรินทร์',
            positionId: 'P_HEAD_PROD',
            departmentId: 'D001',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=13',
            email: 'kajorn.k@central.co.th',
            phone: '+66 2 021 9120',
            isVacant: false,
            headcount: 20,
            totalHeadcount: 129
        },
        // Head of Product
        {
            id: 'EMP_SUP001',
            employeeId: 'EMP_SUP001',
            nameEn: 'Rungrote Amnuaysopon',
            nameTh: 'รุ่งโรจน์ อำนวยสพน',
            positionId: 'P002',
            departmentId: 'D001',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=12',
            email: 'rungrote.a@central.co.th',
            phone: '+66 2 021 9130',
            isVacant: false,
            headcount: 7,
            totalHeadcount: 9
        },
        // Product Manager (current user)
        {
            id: 'EMP001',
            employeeId: 'EMP001',
            nameEn: 'Chongrak Tanaka',
            nameTh: 'จงรักษ์ ทานากะ',
            positionId: 'P003',
            departmentId: 'D001',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=11',
            email: 'chongrak.t@central.co.th',
            phone: '+66 2 021 9140',
            isVacant: false,
            headcount: 2,
            totalHeadcount: 2
        },
        // Direct Reports - Functional Trainees
        {
            id: 'EMP_DR001',
            employeeId: 'EMP_DR001',
            nameEn: 'Naruechon Woraphatphawan',
            nameTh: 'นฤชล วรพัฒน์พาวัลย์',
            positionId: 'P_FT001',
            departmentId: 'D001',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=14',
            email: 'naruechon.w@central.co.th',
            phone: '+66 2 021 9141',
            isVacant: false
        },
        {
            id: 'EMP_DR002',
            employeeId: 'EMP_DR002',
            nameEn: 'Punnapa Thianchai',
            nameTh: 'ปุณณภา เทียนชัย',
            positionId: 'P_FT002',
            departmentId: 'D001',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=15',
            email: 'punnapa.t@central.co.th',
            phone: '+66 2 021 9142',
            isVacant: false
        },
        // Head of Engineering
        {
            id: 'EMP_ENG001',
            employeeId: 'EMP_ENG001',
            nameEn: 'Somchai Prasert',
            nameTh: 'สมชาย ประเสริฐ',
            positionId: 'P010',
            departmentId: 'D002',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=20',
            email: 'somchai.p@central.co.th',
            phone: '+66 2 123 4571',
            isVacant: false
        },
        // Head of QA
        {
            id: 'EMP_QA001',
            employeeId: 'EMP_QA001',
            nameEn: 'Wipawee Sukhothai',
            nameTh: 'วิภาวี สุโขทัย',
            positionId: 'P020',
            departmentId: 'D003',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=21',
            email: 'wipawee.s@central.co.th',
            phone: '+66 2 123 4572',
            isVacant: false
        },
        // HR Director
        {
            id: 'EMP_HR001',
            employeeId: 'EMP_HR001',
            nameEn: 'Nattaya Ayutthaya',
            nameTh: 'ณัฐยา อยุธยา',
            positionId: 'P030',
            departmentId: 'D011',
            companyId: 'C015',
            photo: 'https://i.pravatar.cc/150?img=17',
            email: 'nattaya.a@central.co.th',
            phone: '+66 2 345 6789',
            isVacant: false
        }
    ],

    // Reporting relationships (solid and dotted lines) - Real Central Group hierarchy
    reportingLines: [
        // Executive hierarchy
        {
            id: 'RL_EXEC1',
            fromEmployeeId: 'EMP_L1',
            toEmployeeId: 'EMP_L0',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL_EXEC2',
            fromEmployeeId: 'EMP_L2',
            toEmployeeId: 'EMP_L1',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL_EXEC3',
            fromEmployeeId: 'EMP_L3',
            toEmployeeId: 'EMP_L2',
            type: 'solid',
            relationshipType: 'direct'
        },
        // IT Strategy & Products hierarchy
        {
            id: 'RL001',
            fromEmployeeId: 'EMP_SUP002',
            toEmployeeId: 'EMP_L3',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL002',
            fromEmployeeId: 'EMP_SUP001',
            toEmployeeId: 'EMP_SUP002',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL003',
            fromEmployeeId: 'EMP001',
            toEmployeeId: 'EMP_SUP001',
            type: 'solid',
            relationshipType: 'direct'
        },
        // Direct reports to Product Manager (Chongrak)
        {
            id: 'RL004',
            fromEmployeeId: 'EMP_DR001',
            toEmployeeId: 'EMP001',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL005',
            fromEmployeeId: 'EMP_DR002',
            toEmployeeId: 'EMP001',
            type: 'solid',
            relationshipType: 'direct'
        },
        // Other departments
        {
            id: 'RL006',
            fromEmployeeId: 'EMP_ENG001',
            toEmployeeId: 'EMP_SUP002',
            type: 'solid',
            relationshipType: 'direct'
        },
        {
            id: 'RL007',
            fromEmployeeId: 'EMP_QA001',
            toEmployeeId: 'EMP_SUP002',
            type: 'solid',
            relationshipType: 'direct'
        },
        // Dotted line (matrix/functional reporting)
        {
            id: 'RL010',
            fromEmployeeId: 'EMP001',
            toEmployeeId: 'EMP_ENG001',
            type: 'dotted',
            relationshipType: 'matrix',
            relationshipLabel: { en: 'Technical Collaboration', th: 'ความร่วมมือด้านเทคนิค' }
        },
        {
            id: 'RL011',
            fromEmployeeId: 'EMP001',
            toEmployeeId: 'EMP_QA001',
            type: 'dotted',
            relationshipType: 'functional',
            relationshipLabel: { en: 'Quality Oversight', th: 'การกำกับดูแลคุณภาพ' }
        },
        {
            id: 'RL012',
            fromEmployeeId: 'EMP_DR001',
            toEmployeeId: 'EMP_ENG001',
            type: 'dotted',
            relationshipType: 'project',
            relationshipLabel: { en: 'Project Support', th: 'สนับสนุนโครงการ' }
        }
    ],

    // Vacant positions for display
    vacantPositions: [
        {
            id: 'VP001',
            positionId: 'P006',
            positionName: { en: 'Associate Product Manager', th: 'ผู้ช่วยผู้จัดการผลิตภัณฑ์' },
            departmentId: 'D001',
            companyId: 'C015',
            costCenter: 'CC-RIS-PM-001',
            reportsToEmployeeId: 'EMP001',
            postedDate: '2025-12-15',
            requisitionId: 'REQ-2025-0042'
        },
        {
            id: 'VP002',
            positionId: 'P012',
            positionName: { en: 'Senior Software Engineer', th: 'วิศวกรซอฟต์แวร์อาวุโส' },
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            reportsToEmployeeId: 'EMP_ENG001',
            postedDate: '2025-12-20',
            requisitionId: 'REQ-2025-0045'
        },
        {
            id: 'VP003',
            positionId: 'P013',
            positionName: { en: 'Software Engineer', th: 'วิศวกรซอฟต์แวร์' },
            departmentId: 'D002',
            companyId: 'C015',
            costCenter: 'CC-RIS-ENG-001',
            reportsToEmployeeId: 'EMP_ENG001',
            postedDate: '2026-01-05',
            requisitionId: 'REQ-2026-0003'
        }
    ],

    /**
     * Get company by ID
     */
    getCompany(companyId) {
        return this.companies.find(c => c.id === companyId);
    },

    /**
     * Get department by ID
     */
    getDepartment(departmentId) {
        return this.departments.find(d => d.id === departmentId);
    },

    /**
     * Get position by ID
     */
    getPosition(positionId) {
        return this.positions.find(p => p.id === positionId);
    },

    /**
     * Get employee by ID
     */
    getEmployee(employeeId) {
        return this.employees.find(e => e.id === employeeId || e.employeeId === employeeId);
    },

    /**
     * Get employees by department
     */
    getEmployeesByDepartment(departmentId) {
        return this.employees.filter(e => e.departmentId === departmentId);
    },

    /**
     * Get employees by company
     */
    getEmployeesByCompany(companyId) {
        return this.employees.filter(e => e.companyId === companyId);
    },

    /**
     * Get direct reports for an employee
     */
    getDirectReports(employeeId) {
        const directLines = this.reportingLines.filter(
            rl => rl.toEmployeeId === employeeId && rl.type === 'solid'
        );
        return directLines.map(rl => this.getEmployee(rl.fromEmployeeId)).filter(Boolean);
    },

    /**
     * Get manager for an employee
     */
    getManager(employeeId) {
        const line = this.reportingLines.find(
            rl => rl.fromEmployeeId === employeeId && rl.type === 'solid'
        );
        return line ? this.getEmployee(line.toEmployeeId) : null;
    },

    /**
     * Get dotted line relationships for an employee
     */
    getDottedLineRelationships(employeeId) {
        return this.reportingLines.filter(
            rl => (rl.fromEmployeeId === employeeId || rl.toEmployeeId === employeeId) && rl.type === 'dotted'
        ).map(rl => ({
            ...rl,
            employee: this.getEmployee(rl.fromEmployeeId === employeeId ? rl.toEmployeeId : rl.fromEmployeeId),
            direction: rl.fromEmployeeId === employeeId ? 'to' : 'from'
        }));
    },

    /**
     * Get vacant positions for a manager
     */
    getVacantPositionsForManager(employeeId) {
        return this.vacantPositions.filter(vp => vp.reportsToEmployeeId === employeeId);
    },

    /**
     * Get departments by company
     */
    getDepartmentsByCompany(companyId) {
        return this.departments.filter(d => d.companyId === companyId);
    },

    /**
     * Get full org hierarchy for a company
     */
    getCompanyHierarchy(companyId) {
        const company = this.getCompany(companyId);
        if (!company) return null;

        const departments = this.getDepartmentsByCompany(companyId);
        const rootDepartments = departments.filter(d => !d.parentDepartmentId);

        const buildDepartmentTree = (dept) => {
            const children = departments.filter(d => d.parentDepartmentId === dept.id);
            const employees = this.getEmployeesByDepartment(dept.id);
            const positions = this.positions.filter(p => p.departmentId === dept.id);

            return {
                ...dept,
                employees,
                positions,
                childDepartments: children.map(buildDepartmentTree)
            };
        };

        return {
            ...company,
            departments: rootDepartments.map(buildDepartmentTree)
        };
    },

    /**
     * Get cost centers by filter
     */
    getCostCenters(filter = {}) {
        const costCenters = new Set();

        // Add company cost centers
        this.companies.forEach(c => {
            if (!filter.companyId || c.id === filter.companyId) {
                costCenters.add(c.costCenter);
            }
        });

        // Add department cost centers
        this.departments.forEach(d => {
            if (!filter.companyId || d.companyId === filter.companyId) {
                costCenters.add(d.costCenter);
            }
        });

        // Add position cost centers
        this.positions.forEach(p => {
            if (!filter.companyId || p.companyId === filter.companyId) {
                costCenters.add(p.costCenter);
            }
        });

        return Array.from(costCenters).sort();
    },

    /**
     * Filter employees by cost center
     */
    getEmployeesByCostCenter(costCenter) {
        const positionIds = this.positions
            .filter(p => p.costCenter === costCenter)
            .map(p => p.id);

        return this.employees.filter(e => positionIds.includes(e.positionId));
    },

    /**
     * Build full org chart data for visualization
     */
    buildOrgChartData(options = {}) {
        const {
            rootEmployeeId = null,
            companyId = 'C015',
            showVacant = true,
            showDottedLines = true,
            maxDepth = 5
        } = options;

        const buildNode = (employeeId, depth = 0) => {
            if (depth > maxDepth) return null;

            const employee = this.getEmployee(employeeId);
            if (!employee) return null;

            const position = this.getPosition(employee.positionId);
            const department = this.getDepartment(employee.departmentId);
            const company = this.getCompany(employee.companyId);
            const directReports = this.getDirectReports(employeeId);
            const dottedLines = showDottedLines ? this.getDottedLineRelationships(employeeId) : [];
            const vacantPositions = showVacant ? this.getVacantPositionsForManager(employeeId) : [];

            return {
                id: employee.id,
                employeeId: employee.employeeId,
                name: i18n.isThai() ? employee.nameTh : employee.nameEn,
                title: position ? (i18n.isThai() ? position.nameTh : position.nameEn) : '',
                photo: employee.photo,
                email: employee.email,
                phone: employee.phone,
                department: department ? (i18n.isThai() ? department.nameTh : department.nameEn) : '',
                departmentCode: department?.code,
                company: company ? (i18n.isThai() ? company.nameTh : company.nameEn) : '',
                companyCode: company?.code,
                costCenter: position?.costCenter || department?.costCenter,
                headcount: position?.headcount,
                budget: position?.budget,
                isVacant: false,
                children: directReports.map(dr => buildNode(dr.id, depth + 1)).filter(Boolean),
                dottedLines: dottedLines.map(dl => ({
                    employeeId: dl.employee?.id,
                    name: dl.employee ? (i18n.isThai() ? dl.employee.nameTh : dl.employee.nameEn) : '',
                    title: dl.employee ? this.getPosition(dl.employee.positionId)?.nameEn : '',
                    type: dl.relationshipType,
                    label: dl.relationshipLabel ? (i18n.isThai() ? dl.relationshipLabel.th : dl.relationshipLabel.en) : '',
                    direction: dl.direction
                })),
                vacantPositions: vacantPositions.map(vp => ({
                    id: vp.id,
                    title: i18n.isThai() ? vp.positionName.th : vp.positionName.en,
                    costCenter: vp.costCenter,
                    postedDate: vp.postedDate,
                    requisitionId: vp.requisitionId,
                    isVacant: true
                }))
            };
        };

        // Find the root - either specified or CTO
        let rootId = rootEmployeeId;
        if (!rootId) {
            // Find top-level employee (CTO or highest in hierarchy)
            const cto = this.employees.find(e => {
                const pos = this.getPosition(e.positionId);
                return pos?.level === 1 && e.companyId === companyId;
            });
            rootId = cto?.id;
        }

        return rootId ? buildNode(rootId) : null;
    }
};

// Make i18n-safe version available globally
if (typeof window !== 'undefined') {
    window.MockOrgStructure = MockOrgStructure;
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockOrgStructure;
}

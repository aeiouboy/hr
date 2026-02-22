/**
 * Mock Position Data
 * Sample data for Position Management Module (Epic 1.2)
 */

const MockPositionData = {
    // Job Layers configuration
    jobLayers: [
        { level: 1, code: 'E', nameEn: 'Executive', nameTh: 'ผู้บริหาร', color: '#7C3AED' },
        { level: 2, code: 'M', nameEn: 'Manager', nameTh: 'ผู้จัดการ', color: '#2563EB' },
        { level: 3, code: 'S', nameEn: 'Supervisor', nameTh: 'หัวหน้างาน', color: '#059669' },
        { level: 4, code: 'P', nameEn: 'Professional', nameTh: 'ผู้เชี่ยวชาญ', color: '#0891B2' },
        { level: 5, code: 'O', nameEn: 'Staff', nameTh: 'พนักงาน', color: '#6B7280' }
    ],

    // Job Grades
    jobGrades: [
        { code: 'E1', layerCode: 'E', levelInLayer: 1, nameEn: 'Executive Director', nameTh: 'ผู้อำนวยการบริหาร' },
        { code: 'E2', layerCode: 'E', levelInLayer: 2, nameEn: 'Senior Vice President', nameTh: 'รองประธานอาวุโส' },
        { code: 'E3', layerCode: 'E', levelInLayer: 3, nameEn: 'Vice President', nameTh: 'รองประธาน' },
        { code: 'M1', layerCode: 'M', levelInLayer: 1, nameEn: 'Senior Manager', nameTh: 'ผู้จัดการอาวุโส' },
        { code: 'M2', layerCode: 'M', levelInLayer: 2, nameEn: 'Manager', nameTh: 'ผู้จัดการ' },
        { code: 'M3', layerCode: 'M', levelInLayer: 3, nameEn: 'Assistant Manager', nameTh: 'ผู้ช่วยผู้จัดการ' },
        { code: 'S1', layerCode: 'S', levelInLayer: 1, nameEn: 'Senior Supervisor', nameTh: 'หัวหน้างานอาวุโส' },
        { code: 'S2', layerCode: 'S', levelInLayer: 2, nameEn: 'Supervisor', nameTh: 'หัวหน้างาน' },
        { code: 'P1', layerCode: 'P', levelInLayer: 1, nameEn: 'Senior Specialist', nameTh: 'ผู้เชี่ยวชาญอาวุโส' },
        { code: 'P2', layerCode: 'P', levelInLayer: 2, nameEn: 'Specialist', nameTh: 'ผู้เชี่ยวชาญ' },
        { code: 'P3', layerCode: 'P', levelInLayer: 3, nameEn: 'Associate', nameTh: 'พนักงานวิชาชีพ' },
        { code: 'O1', layerCode: 'O', levelInLayer: 1, nameEn: 'Senior Staff', nameTh: 'พนักงานอาวุโส' },
        { code: 'O2', layerCode: 'O', levelInLayer: 2, nameEn: 'Staff', nameTh: 'พนักงาน' },
        { code: 'O3', layerCode: 'O', levelInLayer: 3, nameEn: 'Junior Staff', nameTh: 'พนักงานระดับต้น' }
    ],

    // Job Families
    jobFamilies: [
        { code: 'IT', nameEn: 'Information Technology', nameTh: 'เทคโนโลยีสารสนเทศ' },
        { code: 'HR', nameEn: 'Human Resources', nameTh: 'ทรัพยากรบุคคล' },
        { code: 'FIN', nameEn: 'Finance & Accounting', nameTh: 'การเงินและบัญชี' },
        { code: 'MKT', nameEn: 'Marketing', nameTh: 'การตลาด' },
        { code: 'OPS', nameEn: 'Operations', nameTh: 'ปฏิบัติการ' },
        { code: 'SALES', nameEn: 'Sales', nameTh: 'การขาย' },
        { code: 'LOG', nameEn: 'Logistics & Supply Chain', nameTh: 'โลจิสติกส์และซัพพลายเชน' },
        { code: 'ADM', nameEn: 'Administration', nameTh: 'ธุรการ' }
    ],

    // Companies
    companies: [
        { code: 'C015', nameEn: 'RIS', nameTh: 'อาร์ไอเอส' },
        { code: 'C001', nameEn: 'Central Retail', nameTh: 'เซ็นทรัล รีเทล' },
        { code: 'C002', nameEn: 'Central Food Retail', nameTh: 'เซ็นทรัล ฟู้ด รีเทล' },
        { code: 'C003', nameEn: 'Central Hardline', nameTh: 'เซ็นทรัล ฮาร์ดไลน์' }
    ],

    // Departments
    departments: [
        { code: 'D001', nameEn: 'Product Management', nameTh: 'การจัดการผลิตภัณฑ์', companyCode: 'C015' },
        { code: 'D002', nameEn: 'Software Engineering', nameTh: 'วิศวกรรมซอฟต์แวร์', companyCode: 'C015' },
        { code: 'D003', nameEn: 'Human Resources', nameTh: 'ทรัพยากรบุคคล', companyCode: 'C015' },
        { code: 'D004', nameEn: 'Finance', nameTh: 'การเงิน', companyCode: 'C015' },
        { code: 'D005', nameEn: 'IT Infrastructure', nameTh: 'โครงสร้างพื้นฐานไอที', companyCode: 'C015' },
        { code: 'D006', nameEn: 'Quality Assurance', nameTh: 'ประกันคุณภาพ', companyCode: 'C015' },
        { code: 'D007', nameEn: 'Business Analysis', nameTh: 'วิเคราะห์ธุรกิจ', companyCode: 'C015' },
        { code: 'D008', nameEn: 'Project Management Office', nameTh: 'สำนักงานบริหารโครงการ', companyCode: 'C015' }
    ],

    // Cost Centers
    costCenters: [
        { code: 'CC001', nameEn: 'Product Development', nameTh: 'พัฒนาผลิตภัณฑ์' },
        { code: 'CC002', nameEn: 'Corporate IT', nameTh: 'ไอทีองค์กร' },
        { code: 'CC003', nameEn: 'Shared Services', nameTh: 'บริการร่วม' },
        { code: 'CC004', nameEn: 'Digital Innovation', nameTh: 'นวัตกรรมดิจิทัล' }
    ],

    // Position Status
    positionStatuses: [
        { code: 'active', nameEn: 'Active', nameTh: 'ใช้งาน', color: 'green' },
        { code: 'vacant', nameEn: 'Vacant', nameTh: 'ว่าง', color: 'amber' },
        { code: 'frozen', nameEn: 'Frozen', nameTh: 'ระงับชั่วคราว', color: 'blue' },
        { code: 'inactive', nameEn: 'Inactive', nameTh: 'ไม่ใช้งาน', color: 'gray' }
    ],

    // Positions list (matching real org structure)
    positions: [
        // Current user's position
        {
            id: 'POS001',
            positionCode: '40128307',
            titleEn: 'Product Manager',
            titleTh: 'ผู้จัดการผลิตภัณฑ์',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'M2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'active',
            reportsToPositionId: 'POS002',
            matrixReportsToPositionId: null,
            createdDate: '2020-01-15',
            modifiedDate: '2024-06-01',
            jobDescription: {
                fileName: 'JD_Product_Manager.pdf',
                fileUrl: '/uploads/jd/JD_Product_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP001',
                    nameEn: 'Chongrak Tanaka',
                    nameTh: 'จงรักษ์ ทานากะ',
                    photo: 'https://i.pravatar.cc/150?img=11',
                    startDate: '2022-01-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2020-01-15', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2022-01-01', action: 'incumbent_assigned', description: 'Chongrak Tanaka assigned', byUser: 'HR Admin' },
                { date: '2024-06-01', action: 'modified', description: 'Job grade updated from M3 to M2', byUser: 'HR Manager' }
            ]
        },
        // Head of Product (supervisor)
        {
            id: 'POS002',
            positionCode: '40128301',
            titleEn: 'Head of Product',
            titleTh: 'หัวหน้าฝ่ายผลิตภัณฑ์',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'M1',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'active',
            reportsToPositionId: 'POS_HEAD_PROD',
            matrixReportsToPositionId: null,
            createdDate: '2019-06-01',
            modifiedDate: '2024-03-15',
            jobDescription: {
                fileName: 'JD_Head_of_Product.pdf',
                fileUrl: '/uploads/jd/JD_Head_of_Product.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP_SUP001',
                    nameEn: 'Rungrote Amnuaysopon',
                    nameTh: 'รุ่งโรจน์ อำนวยสพน',
                    photo: 'https://i.pravatar.cc/150?img=12',
                    startDate: '2021-03-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2019-06-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2021-03-01', action: 'incumbent_assigned', description: 'Rungrote Amnuaysopon assigned', byUser: 'HR Admin' }
            ]
        },
        // Team Positions - Filled (Functional Trainees)
        {
            id: 'POS_FT001',
            positionCode: '40128350',
            titleEn: 'Functional Trainee (ProNext)',
            titleTh: 'พนักงานฝึกหัด (ProNext)',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'P3',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'active',
            reportsToPositionId: 'POS001',
            matrixReportsToPositionId: null,
            createdDate: '2025-06-01',
            modifiedDate: '2025-07-15',
            jobDescription: {
                fileName: 'JD_Functional_Trainee.pdf',
                fileUrl: '/uploads/jd/JD_Functional_Trainee.pdf',
                uploadedDate: '2025-06-01'
            },
            incumbents: [
                {
                    employeeId: 'EMP_DR001',
                    nameEn: 'Naruechon Woraphatphawan',
                    nameTh: 'นฤชล วรพัฒน์พาวัลย์',
                    photo: 'https://i.pravatar.cc/150?img=14',
                    startDate: '2025-07-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2025-06-01', action: 'created', description: 'Position created for ProNext program', byUser: 'HR Admin' },
                { date: '2025-07-01', action: 'incumbent_assigned', description: 'Naruechon Woraphatphawan assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS_FT002',
            positionCode: '40128351',
            titleEn: 'Functional Trainee (ProNext)',
            titleTh: 'พนักงานฝึกหัด (ProNext)',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'P3',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'active',
            reportsToPositionId: 'POS001',
            matrixReportsToPositionId: null,
            createdDate: '2025-06-01',
            modifiedDate: '2025-07-15',
            jobDescription: {
                fileName: 'JD_Functional_Trainee.pdf',
                fileUrl: '/uploads/jd/JD_Functional_Trainee.pdf',
                uploadedDate: '2025-06-01'
            },
            incumbents: [
                {
                    employeeId: 'EMP_DR002',
                    nameEn: 'Punnapa Thianchai',
                    nameTh: 'ปุณณภา เทียนชัย',
                    photo: 'https://i.pravatar.cc/150?img=15',
                    startDate: '2025-07-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2025-06-01', action: 'created', description: 'Position created for ProNext program', byUser: 'HR Admin' },
                { date: '2025-07-01', action: 'incumbent_assigned', description: 'Punnapa Thianchai assigned', byUser: 'HR Admin' }
            ]
        },
        // Team Positions - Vacant (To be recruited)
        {
            id: 'POS_PM_VACANT1',
            positionCode: '40128352',
            titleEn: 'Product Manager',
            titleTh: 'ผู้จัดการผลิตภัณฑ์',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'M2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'vacant',
            reportsToPositionId: 'POS002',
            matrixReportsToPositionId: null,
            createdDate: '2025-10-01',
            modifiedDate: '2025-10-01',
            jobDescription: {
                fileName: 'JD_Product_Manager.pdf',
                fileUrl: '/uploads/jd/JD_Product_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [],
            recruitmentStatus: 'to_be_recruited',
            history: [
                { date: '2025-10-01', action: 'created', description: 'Position created for team expansion', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS_PM_VACANT2',
            positionCode: '40128353',
            titleEn: 'Product Manager',
            titleTh: 'ผู้จัดการผลิตภัณฑ์',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'M2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'vacant',
            reportsToPositionId: 'POS002',
            matrixReportsToPositionId: null,
            createdDate: '2025-10-01',
            modifiedDate: '2025-10-01',
            jobDescription: {
                fileName: 'JD_Product_Manager.pdf',
                fileUrl: '/uploads/jd/JD_Product_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [],
            recruitmentStatus: 'to_be_recruited',
            history: [
                { date: '2025-10-01', action: 'created', description: 'Position created for team expansion', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS_PO_VACANT',
            positionCode: '40128354',
            titleEn: 'Product Owner',
            titleTh: 'เจ้าของผลิตภัณฑ์',
            companyCode: 'C015',
            departmentCode: 'D001',
            jobGradeCode: 'M3',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC001',
            status: 'vacant',
            reportsToPositionId: 'POS001',
            matrixReportsToPositionId: null,
            createdDate: '2025-10-01',
            modifiedDate: '2025-10-01',
            jobDescription: {
                fileName: 'JD_Product_Owner.pdf',
                fileUrl: '/uploads/jd/JD_Product_Owner.pdf',
                uploadedDate: '2025-10-01'
            },
            incumbents: [],
            recruitmentStatus: 'to_be_recruited',
            history: [
                { date: '2025-10-01', action: 'created', description: 'Position created for product team', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS003',
            positionCode: '40128308',
            titleEn: 'Senior Software Engineer',
            titleTh: 'วิศวกรซอฟต์แวร์อาวุโส',
            companyCode: 'C015',
            departmentCode: 'D002',
            jobGradeCode: 'P1',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'active',
            reportsToPositionId: 'POS004',
            matrixReportsToPositionId: 'POS001',
            createdDate: '2020-03-01',
            modifiedDate: '2024-01-10',
            jobDescription: {
                fileName: 'JD_Senior_Software_Engineer.pdf',
                fileUrl: '/uploads/jd/JD_Senior_Software_Engineer.pdf',
                uploadedDate: '2023-02-15'
            },
            incumbents: [
                {
                    employeeId: 'EMP003',
                    nameEn: 'Somchai Srisawat',
                    nameTh: 'สมชาย ศรีสวัสดิ์',
                    photo: 'https://i.pravatar.cc/150?img=13',
                    startDate: '2021-06-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2020-03-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2021-06-01', action: 'incumbent_assigned', description: 'Somchai Srisawat assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS004',
            positionCode: '40128302',
            titleEn: 'Engineering Manager',
            titleTh: 'ผู้จัดการวิศวกรรม',
            companyCode: 'C015',
            departmentCode: 'D002',
            jobGradeCode: 'M2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'active',
            reportsToPositionId: 'POS010',
            matrixReportsToPositionId: null,
            createdDate: '2019-01-01',
            modifiedDate: '2023-12-01',
            jobDescription: {
                fileName: 'JD_Engineering_Manager.pdf',
                fileUrl: '/uploads/jd/JD_Engineering_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP004',
                    nameEn: 'Wichai Thongdee',
                    nameTh: 'วิชัย ทองดี',
                    photo: 'https://i.pravatar.cc/150?img=14',
                    startDate: '2020-01-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2019-01-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2020-01-01', action: 'incumbent_assigned', description: 'Wichai Thongdee assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS005',
            positionCode: '40128309',
            titleEn: 'Software Engineer',
            titleTh: 'วิศวกรซอฟต์แวร์',
            companyCode: 'C015',
            departmentCode: 'D002',
            jobGradeCode: 'P2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'vacant',
            reportsToPositionId: 'POS004',
            matrixReportsToPositionId: null,
            createdDate: '2021-01-15',
            modifiedDate: '2024-08-01',
            jobDescription: {
                fileName: 'JD_Software_Engineer.pdf',
                fileUrl: '/uploads/jd/JD_Software_Engineer.pdf',
                uploadedDate: '2023-02-15'
            },
            incumbents: [],
            history: [
                { date: '2021-01-15', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2023-01-01', action: 'incumbent_assigned', description: 'Narongrit Prasert assigned', byUser: 'HR Admin' },
                { date: '2024-08-01', action: 'status_changed', description: 'Status changed to Vacant (employee resigned)', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS006',
            positionCode: '40128310',
            titleEn: 'HR Business Partner',
            titleTh: 'หุ้นส่วนธุรกิจฝ่ายบุคคล',
            companyCode: 'C015',
            departmentCode: 'D003',
            jobGradeCode: 'M3',
            jobFamilyCode: 'HR',
            costCenterCode: 'CC003',
            status: 'active',
            reportsToPositionId: 'POS007',
            matrixReportsToPositionId: null,
            createdDate: '2020-06-01',
            modifiedDate: '2024-02-15',
            jobDescription: {
                fileName: 'JD_HR_Business_Partner.pdf',
                fileUrl: '/uploads/jd/JD_HR_Business_Partner.pdf',
                uploadedDate: '2023-03-01'
            },
            incumbents: [
                {
                    employeeId: 'EMP006',
                    nameEn: 'Suda Chaicharoen',
                    nameTh: 'สุดา ไชยเจริญ',
                    photo: 'https://i.pravatar.cc/150?img=5',
                    startDate: '2022-03-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2020-06-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2022-03-01', action: 'incumbent_assigned', description: 'Suda Chaicharoen assigned', byUser: 'HR Manager' }
            ]
        },
        {
            id: 'POS007',
            positionCode: '40128303',
            titleEn: 'HR Manager',
            titleTh: 'ผู้จัดการฝ่ายทรัพยากรบุคคล',
            companyCode: 'C015',
            departmentCode: 'D003',
            jobGradeCode: 'M1',
            jobFamilyCode: 'HR',
            costCenterCode: 'CC003',
            status: 'active',
            reportsToPositionId: 'POS010',
            matrixReportsToPositionId: null,
            createdDate: '2018-01-01',
            modifiedDate: '2023-06-01',
            jobDescription: {
                fileName: 'JD_HR_Manager.pdf',
                fileUrl: '/uploads/jd/JD_HR_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP007',
                    nameEn: 'Pornchai Suksawat',
                    nameTh: 'พรชัย สุขสวัสดิ์',
                    photo: 'https://i.pravatar.cc/150?img=8',
                    startDate: '2019-01-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2018-01-01', action: 'created', description: 'Position created', byUser: 'System' },
                { date: '2019-01-01', action: 'incumbent_assigned', description: 'Pornchai Suksawat assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS008',
            positionCode: '40128311',
            titleEn: 'QA Lead',
            titleTh: 'หัวหน้าทดสอบคุณภาพ',
            companyCode: 'C015',
            departmentCode: 'D006',
            jobGradeCode: 'S1',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'active',
            reportsToPositionId: 'POS004',
            matrixReportsToPositionId: null,
            createdDate: '2021-03-01',
            modifiedDate: '2024-01-15',
            jobDescription: {
                fileName: 'JD_QA_Lead.pdf',
                fileUrl: '/uploads/jd/JD_QA_Lead.pdf',
                uploadedDate: '2023-04-01'
            },
            incumbents: [
                {
                    employeeId: 'EMP008',
                    nameEn: 'Nattaporn Kittirat',
                    nameTh: 'ณัฐพร กิตติรัตน์',
                    photo: 'https://i.pravatar.cc/150?img=9',
                    startDate: '2021-06-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2021-03-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2021-06-01', action: 'incumbent_assigned', description: 'Nattaporn Kittirat assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS009',
            positionCode: '40128312',
            titleEn: 'Business Analyst',
            titleTh: 'นักวิเคราะห์ธุรกิจ',
            companyCode: 'C015',
            departmentCode: 'D007',
            jobGradeCode: 'P2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC004',
            status: 'frozen',
            reportsToPositionId: 'POS001',
            matrixReportsToPositionId: null,
            createdDate: '2022-01-01',
            modifiedDate: '2024-07-01',
            jobDescription: {
                fileName: 'JD_Business_Analyst.pdf',
                fileUrl: '/uploads/jd/JD_Business_Analyst.pdf',
                uploadedDate: '2023-05-01'
            },
            incumbents: [],
            history: [
                { date: '2022-01-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2024-07-01', action: 'status_changed', description: 'Status changed to Frozen (budget constraints)', byUser: 'HR Manager' }
            ]
        },
        {
            id: 'POS010',
            positionCode: '40128100',
            titleEn: 'Chief Technology Officer',
            titleTh: 'ประธานเจ้าหน้าที่ฝ่ายเทคโนโลยี',
            companyCode: 'C015',
            departmentCode: 'D005',
            jobGradeCode: 'E2',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'active',
            reportsToPositionId: null,
            matrixReportsToPositionId: null,
            createdDate: '2017-01-01',
            modifiedDate: '2024-01-01',
            jobDescription: {
                fileName: 'JD_CTO.pdf',
                fileUrl: '/uploads/jd/JD_CTO.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP010',
                    nameEn: 'Thawatchai Rattanakul',
                    nameTh: 'ธวัชชัย รัตนกุล',
                    photo: 'https://i.pravatar.cc/150?img=3',
                    startDate: '2018-01-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2017-01-01', action: 'created', description: 'Position created', byUser: 'System' },
                { date: '2018-01-01', action: 'incumbent_assigned', description: 'Thawatchai Rattanakul assigned', byUser: 'HR Manager' }
            ]
        },
        {
            id: 'POS011',
            positionCode: '40128313',
            titleEn: 'Junior Developer',
            titleTh: 'นักพัฒนาระดับต้น',
            companyCode: 'C015',
            departmentCode: 'D002',
            jobGradeCode: 'P3',
            jobFamilyCode: 'IT',
            costCenterCode: 'CC002',
            status: 'active',
            reportsToPositionId: 'POS003',
            matrixReportsToPositionId: null,
            createdDate: '2023-06-01',
            modifiedDate: '2024-01-15',
            jobDescription: {
                fileName: 'JD_Junior_Developer.pdf',
                fileUrl: '/uploads/jd/JD_Junior_Developer.pdf',
                uploadedDate: '2023-06-01'
            },
            incumbents: [
                {
                    employeeId: 'EMP011',
                    nameEn: 'Apinya Saetang',
                    nameTh: 'อภิญญา แซ่ตั้ง',
                    photo: 'https://i.pravatar.cc/150?img=20',
                    startDate: '2023-07-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2023-06-01', action: 'created', description: 'Position created', byUser: 'HR Admin' },
                { date: '2023-07-01', action: 'incumbent_assigned', description: 'Apinya Saetang assigned', byUser: 'HR Admin' }
            ]
        },
        {
            id: 'POS012',
            positionCode: '40128314',
            titleEn: 'Finance Manager',
            titleTh: 'ผู้จัดการฝ่ายการเงิน',
            companyCode: 'C015',
            departmentCode: 'D004',
            jobGradeCode: 'M2',
            jobFamilyCode: 'FIN',
            costCenterCode: 'CC003',
            status: 'active',
            reportsToPositionId: 'POS010',
            matrixReportsToPositionId: null,
            createdDate: '2018-06-01',
            modifiedDate: '2024-03-01',
            jobDescription: {
                fileName: 'JD_Finance_Manager.pdf',
                fileUrl: '/uploads/jd/JD_Finance_Manager.pdf',
                uploadedDate: '2023-01-10'
            },
            incumbents: [
                {
                    employeeId: 'EMP012',
                    nameEn: 'Wanida Poonsawat',
                    nameTh: 'วนิดา พูนสวัสดิ์',
                    photo: 'https://i.pravatar.cc/150?img=25',
                    startDate: '2019-06-01',
                    endDate: null,
                    isPrimary: true
                }
            ],
            history: [
                { date: '2018-06-01', action: 'created', description: 'Position created', byUser: 'System' },
                { date: '2019-06-01', action: 'incumbent_assigned', description: 'Wanida Poonsawat assigned', byUser: 'HR Admin' }
            ]
        }
    ],

    /**
     * Get position by ID
     * @param {string} positionId
     * @returns {object|null}
     */
    getPositionById(positionId) {
        return this.positions.find(p => p.id === positionId) || null;
    },

    /**
     * Get positions with filtering
     * @param {object} filters
     * @returns {array}
     */
    getPositions(filters = {}) {
        let result = [...this.positions];

        if (filters.companyCode) {
            result = result.filter(p => p.companyCode === filters.companyCode);
        }

        if (filters.departmentCode) {
            result = result.filter(p => p.departmentCode === filters.departmentCode);
        }

        if (filters.jobGradeCode) {
            result = result.filter(p => p.jobGradeCode === filters.jobGradeCode);
        }

        if (filters.status) {
            result = result.filter(p => p.status === filters.status);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(p =>
                p.positionCode.toLowerCase().includes(searchLower) ||
                p.titleEn.toLowerCase().includes(searchLower) ||
                p.titleTh.includes(filters.search)
            );
        }

        return result;
    },

    /**
     * Get department name by code
     * @param {string} code
     * @returns {object}
     */
    getDepartment(code) {
        return this.departments.find(d => d.code === code) || null;
    },

    /**
     * Get job grade by code
     * @param {string} code
     * @returns {object}
     */
    getJobGrade(code) {
        return this.jobGrades.find(g => g.code === code) || null;
    },

    /**
     * Get job layer by code
     * @param {string} code
     * @returns {object}
     */
    getJobLayer(code) {
        return this.jobLayers.find(l => l.code === code) || null;
    },

    /**
     * Get company by code
     * @param {string} code
     * @returns {object}
     */
    getCompany(code) {
        return this.companies.find(c => c.code === code) || null;
    },

    /**
     * Get cost center by code
     * @param {string} code
     * @returns {object}
     */
    getCostCenter(code) {
        return this.costCenters.find(c => c.code === code) || null;
    },

    /**
     * Get job family by code
     * @param {string} code
     * @returns {object}
     */
    getJobFamily(code) {
        return this.jobFamilies.find(f => f.code === code) || null;
    },

    /**
     * Get position status config
     * @param {string} code
     * @returns {object}
     */
    getPositionStatus(code) {
        return this.positionStatuses.find(s => s.code === code) || null;
    },

    /**
     * Get reporting hierarchy for a position
     * @param {string} positionId
     * @returns {array}
     */
    getReportingHierarchy(positionId) {
        const hierarchy = [];
        let currentPosition = this.getPositionById(positionId);

        while (currentPosition && currentPosition.reportsToPositionId) {
            const parent = this.getPositionById(currentPosition.reportsToPositionId);
            if (parent) {
                hierarchy.push(parent);
                currentPosition = parent;
            } else {
                break;
            }
        }

        return hierarchy;
    },

    /**
     * Get direct reports for a position
     * @param {string} positionId
     * @returns {array}
     */
    getDirectReports(positionId) {
        return this.positions.filter(p => p.reportsToPositionId === positionId);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockPositionData;
}

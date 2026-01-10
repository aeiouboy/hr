/**
 * Mock Team Data
 * Sample team data for manager dashboard
 */

const MockTeamData = {
    // Team members reporting to current manager (Chatchai Tangsiri - EMP001)
    teamMembers: [
        {
            id: 'EMP_DR001',
            employeeId: 'EMP_DR001',
            photo: 'https://i.pravatar.cc/150?img=14',
            firstNameEn: 'Natthapong',
            lastNameEn: 'Chai',
            firstNameTh: 'ณัฐพงษ์',
            lastNameTh: 'ชัย',
            nickname: 'Nat',
            position: 'Senior Product Analyst',
            positionTh: 'นักวิเคราะห์ผลิตภัณฑ์อาวุโส',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'active',
            hireDate: '2019-06-15',
            email: 'natthapong.c@centralgroup.com',
            phone: '+66 81 111 1111',
            passProbationDate: '2019-09-15',
            probationStatus: 'passed',
            workPermitExpiry: null,
            dateOfBirth: '1992-03-22'
        },
        {
            id: 'EMP_DR002',
            employeeId: 'EMP_DR002',
            photo: 'https://i.pravatar.cc/150?img=15',
            firstNameEn: 'Siriporn',
            lastNameEn: 'Kaewdee',
            firstNameTh: 'ศิริพร',
            lastNameTh: 'แก้วดี',
            nickname: 'Porn',
            position: 'Product Analyst',
            positionTh: 'นักวิเคราะห์ผลิตภัณฑ์',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'on_leave',
            hireDate: '2021-01-10',
            email: 'siriporn.k@centralgroup.com',
            phone: '+66 82 222 2222',
            passProbationDate: '2021-04-10',
            probationStatus: 'passed',
            workPermitExpiry: null,
            dateOfBirth: '1995-08-15',
            currentLeave: {
                type: 'annual',
                startDate: '2026-01-10',
                endDate: '2026-01-12'
            }
        },
        {
            id: 'EMP_DR003',
            employeeId: 'EMP_DR003',
            photo: 'https://i.pravatar.cc/150?img=16',
            firstNameEn: 'Worachai',
            lastNameEn: 'Limpakit',
            firstNameTh: 'วรชัย',
            lastNameTh: 'ลิ้มภาคิน',
            nickname: 'Chai',
            position: 'Associate Product Manager',
            positionTh: 'ผู้จัดการผลิตภัณฑ์ช่วย',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'probation',
            hireDate: '2025-11-01',
            email: 'worachai.l@centralgroup.com',
            phone: '+66 83 333 3333',
            passProbationDate: '2026-02-01',
            probationStatus: 'in_progress',
            workPermitExpiry: null,
            dateOfBirth: '1998-12-05'
        },
        {
            id: 'EMP_DR004',
            employeeId: 'EMP_DR004',
            photo: 'https://i.pravatar.cc/150?img=22',
            firstNameEn: 'James',
            lastNameEn: 'Wilson',
            firstNameTh: 'เจมส์',
            lastNameTh: 'วิลสัน',
            nickname: 'Jim',
            position: 'Technical Product Manager',
            positionTh: 'ผู้จัดการผลิตภัณฑ์เทคนิค',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'active',
            hireDate: '2023-03-20',
            email: 'james.w@centralgroup.com',
            phone: '+66 84 444 4444',
            passProbationDate: '2023-06-20',
            probationStatus: 'passed',
            workPermitExpiry: '2026-02-15',
            dateOfBirth: '1988-07-30'
        },
        {
            id: 'EMP_DR005',
            employeeId: 'EMP_DR005',
            photo: 'https://i.pravatar.cc/150?img=25',
            firstNameEn: 'Kanya',
            lastNameEn: 'Srisuwan',
            firstNameTh: 'กัญญา',
            lastNameTh: 'ศรีสุวรรณ',
            nickname: 'Kan',
            position: 'Business Analyst',
            positionTh: 'นักวิเคราะห์ธุรกิจ',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'active',
            hireDate: '2020-08-01',
            email: 'kanya.s@centralgroup.com',
            phone: '+66 85 555 5555',
            passProbationDate: '2020-11-01',
            probationStatus: 'passed',
            workPermitExpiry: null,
            dateOfBirth: '1994-01-18'
        }
    ],

    // Team leave requests (for team calendar)
    teamLeaves: [
        {
            id: 'tl_001',
            employeeId: 'EMP_DR002',
            employeeName: 'Siriporn Kaewdee',
            employeeNameTh: 'ศิริพร แก้วดี',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'ลาพักร้อน',
            startDate: '2026-01-10',
            endDate: '2026-01-12',
            status: 'approved',
            duration: 3
        },
        {
            id: 'tl_002',
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ชัย',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'ลาพักร้อน',
            startDate: '2026-01-15',
            endDate: '2026-01-17',
            status: 'approved',
            duration: 3
        },
        {
            id: 'tl_003',
            employeeId: 'EMP_DR004',
            employeeName: 'James Wilson',
            employeeNameTh: 'เจมส์ วิลสัน',
            type: 'sick',
            typeNameEn: 'Sick Leave',
            typeNameTh: 'ลาป่วย',
            startDate: '2026-01-20',
            endDate: '2026-01-20',
            status: 'approved',
            duration: 1
        },
        {
            id: 'tl_004',
            employeeId: 'EMP_DR005',
            employeeName: 'Kanya Srisuwan',
            employeeNameTh: 'กัญญา ศรีสุวรรณ',
            type: 'personal',
            typeNameEn: 'Personal Leave',
            typeNameTh: 'ลากิจ',
            startDate: '2026-01-22',
            endDate: '2026-01-22',
            status: 'pending',
            duration: 1
        },
        {
            id: 'tl_005',
            employeeId: 'EMP_DR001',
            employeeName: 'Natthapong Chai',
            employeeNameTh: 'ณัฐพงษ์ ชัย',
            type: 'annual',
            typeNameEn: 'Annual Leave',
            typeNameTh: 'ลาพักร้อน',
            startDate: '2026-01-22',
            endDate: '2026-01-24',
            status: 'pending',
            duration: 3
        }
    ],

    // Pending approvals for manager
    pendingApprovals: [
        {
            id: 'wa_001',
            type: 'leave',
            typeNameEn: 'Leave Request',
            typeNameTh: 'คำขอลา',
            requesterId: 'EMP_DR005',
            requesterName: 'Kanya Srisuwan',
            requesterNameTh: 'กัญญา ศรีสุวรรณ',
            requesterPhoto: 'https://i.pravatar.cc/150?img=25',
            submittedDate: '2026-01-08',
            urgency: 'normal',
            details: {
                leaveType: 'personal',
                startDate: '2026-01-22',
                endDate: '2026-01-22',
                reason: 'Personal matter'
            }
        },
        {
            id: 'wa_002',
            type: 'leave',
            typeNameEn: 'Leave Request',
            typeNameTh: 'คำขอลา',
            requesterId: 'EMP_DR001',
            requesterName: 'Natthapong Chai',
            requesterNameTh: 'ณัฐพงษ์ ชัย',
            requesterPhoto: 'https://i.pravatar.cc/150?img=14',
            submittedDate: '2026-01-09',
            urgency: 'normal',
            details: {
                leaveType: 'annual',
                startDate: '2026-01-22',
                endDate: '2026-01-24',
                reason: 'Family vacation'
            }
        },
        {
            id: 'wa_003',
            type: 'expense',
            typeNameEn: 'Expense Claim',
            typeNameTh: 'เบิกค่าใช้จ่าย',
            requesterId: 'EMP_DR004',
            requesterName: 'James Wilson',
            requesterNameTh: 'เจมส์ วิลสัน',
            requesterPhoto: 'https://i.pravatar.cc/150?img=22',
            submittedDate: '2026-01-07',
            urgency: 'high',
            details: {
                amount: 15000,
                currency: 'THB',
                category: 'Travel',
                description: 'Client visit to Chiang Mai'
            }
        },
        {
            id: 'wa_004',
            type: 'change_request',
            typeNameEn: 'Data Change Request',
            typeNameTh: 'คำขอแก้ไขข้อมูล',
            requesterId: 'EMP_DR003',
            requesterName: 'Worachai Limpakit',
            requesterNameTh: 'วรชัย ลิ้มภาคิน',
            requesterPhoto: 'https://i.pravatar.cc/150?img=16',
            submittedDate: '2026-01-05',
            urgency: 'low',
            details: {
                changeType: 'address',
                description: 'Update current address'
            }
        }
    ],

    // Team notifications/alerts
    teamNotifications: [
        {
            id: 'tn_001',
            type: 'probation_ending',
            title: 'Probation Ending Soon',
            titleTh: 'ใกล้หมดระยะทดลองงาน',
            message: 'Worachai Limpakit\'s probation ends on Feb 1, 2026',
            messageTh: 'วรชัย ลิ้มภาคิน จะผ่านทดลองงานวันที่ 1 ก.พ. 2569',
            employeeId: 'EMP_DR003',
            dueDate: '2026-02-01',
            daysRemaining: 22,
            priority: 'high',
            icon: 'hourglass_top',
            color: 'orange'
        },
        {
            id: 'tn_002',
            type: 'work_permit_expiring',
            title: 'Work Permit Expiring',
            titleTh: 'ใบอนุญาตทำงานใกล้หมดอายุ',
            message: 'James Wilson\'s work permit expires on Feb 15, 2026',
            messageTh: 'ใบอนุญาตทำงานของ เจมส์ วิลสัน จะหมดอายุวันที่ 15 ก.พ. 2569',
            employeeId: 'EMP_DR004',
            dueDate: '2026-02-15',
            daysRemaining: 36,
            priority: 'high',
            icon: 'badge',
            color: 'red'
        },
        {
            id: 'tn_003',
            type: 'training_due',
            title: 'Training Due',
            titleTh: 'การอบรมที่ต้องทำ',
            message: 'Annual compliance training due for 3 team members',
            messageTh: 'การอบรมปลอดภัยประจำปีสำหรับพนักงาน 3 คน',
            dueDate: '2026-01-31',
            daysRemaining: 21,
            priority: 'medium',
            icon: 'school',
            color: 'blue'
        },
        {
            id: 'tn_004',
            type: 'birthday',
            title: 'Upcoming Birthday',
            titleTh: 'วันเกิดที่จะมาถึง',
            message: 'Kanya Srisuwan\'s birthday is on Jan 18',
            messageTh: 'วันเกิด กัญญา ศรีสุวรรณ วันที่ 18 ม.ค.',
            employeeId: 'EMP_DR005',
            dueDate: '2026-01-18',
            daysRemaining: 8,
            priority: 'low',
            icon: 'cake',
            color: 'pink'
        },
        {
            id: 'tn_005',
            type: 'anniversary',
            title: 'Work Anniversary',
            titleTh: 'ครบรอบการทำงาน',
            message: 'Siriporn Kaewdee completes 5 years on Jan 10',
            messageTh: 'ศิริพร แก้วดี ครบรอบ 5 ปี วันที่ 10 ม.ค.',
            employeeId: 'EMP_DR002',
            dueDate: '2026-01-10',
            daysRemaining: 0,
            priority: 'low',
            icon: 'celebration',
            color: 'purple'
        }
    ],

    // Team quick stats
    getTeamStats() {
        const members = this.teamMembers;
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        const onLeaveToday = members.filter(m => {
            if (m.status === 'on_leave' && m.currentLeave) {
                const start = new Date(m.currentLeave.startDate);
                const end = new Date(m.currentLeave.endDate);
                return today >= start && today <= end;
            }
            return false;
        }).length;

        const inProbation = members.filter(m => m.probationStatus === 'in_progress').length;
        const active = members.filter(m => m.status === 'active').length;
        const pendingApprovals = this.pendingApprovals.length;

        return {
            totalMembers: members.length,
            activeToday: active,
            onLeaveToday,
            inProbation,
            pendingApprovals
        };
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockTeamData;
}

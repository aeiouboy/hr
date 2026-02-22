/**
 * Mock Team Data
 * Sample team data for manager dashboard (Chongrak Tanaka - EMP001)
 */

const MockTeamData = {
    // Team members reporting to current manager (Chongrak Tanaka - EMP001)
    // Based on real org structure: 2 Functional Trainees (ProNext program)
    teamMembers: [
        {
            id: 'EMP_DR001',
            employeeId: 'EMP_DR001',
            photo: 'https://i.pravatar.cc/150?img=14',
            firstNameEn: 'Naruechon',
            lastNameEn: 'Woraphatphawan',
            firstNameTh: 'นฤชล',
            lastNameTh: 'วรพัฒน์พาวัลย์',
            nickname: 'Non',
            position: 'Functional Trainee (ProNext)',
            positionTh: 'พนักงานฝึกหัด (ProNext)',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'probation',
            hireDate: '2025-07-01',
            email: 'naruechon.w@centralgroup.com',
            phone: '+66 81 111 1111',
            passProbationDate: '2026-01-01',
            probationStatus: 'in_progress',
            workPermitExpiry: null,
            dateOfBirth: '2001-05-15',
            program: 'ProNext'
        },
        {
            id: 'EMP_DR002',
            employeeId: 'EMP_DR002',
            photo: 'https://i.pravatar.cc/150?img=15',
            firstNameEn: 'Punnapa',
            lastNameEn: 'Thianchai',
            firstNameTh: 'ปุณณภา',
            lastNameTh: 'เทียนชัย',
            nickname: 'Pun',
            position: 'Functional Trainee (ProNext)',
            positionTh: 'พนักงานฝึกหัด (ProNext)',
            department: 'Product Management',
            departmentTh: 'ฝ่ายจัดการผลิตภัณฑ์',
            status: 'probation',
            hireDate: '2025-07-01',
            email: 'punnapa.t@centralgroup.com',
            phone: '+66 82 222 2222',
            passProbationDate: '2026-01-01',
            probationStatus: 'in_progress',
            workPermitExpiry: null,
            dateOfBirth: '2001-09-22',
            program: 'ProNext'
        }
    ],

    // Team leave requests (for team calendar)
    teamLeaves: [
        {
            id: 'tl_001',
            employeeId: 'EMP_DR001',
            employeeName: 'Naruechon Woraphatphawan',
            employeeNameTh: 'นฤชล วรพัฒน์พาวัลย์',
            type: 'personal',
            typeNameEn: 'Personal Leave',
            typeNameTh: 'ลากิจ',
            startDate: '2026-01-15',
            endDate: '2026-01-15',
            status: 'approved',
            duration: 1
        },
        {
            id: 'tl_002',
            employeeId: 'EMP_DR002',
            employeeName: 'Punnapa Thianchai',
            employeeNameTh: 'ปุณณภา เทียนชัย',
            type: 'sick',
            typeNameEn: 'Sick Leave',
            typeNameTh: 'ลาป่วย',
            startDate: '2026-01-20',
            endDate: '2026-01-20',
            status: 'pending',
            duration: 1
        }
    ],

    // Pending approvals for manager
    pendingApprovals: [
        {
            id: 'wa_001',
            type: 'leave',
            typeNameEn: 'Leave Request',
            typeNameTh: 'คำขอลา',
            requesterId: 'EMP_DR002',
            requesterName: 'Punnapa Thianchai',
            requesterNameTh: 'ปุณณภา เทียนชัย',
            requesterPhoto: 'https://i.pravatar.cc/150?img=15',
            submittedDate: '2026-01-09',
            urgency: 'normal',
            details: {
                leaveType: 'sick',
                startDate: '2026-01-20',
                endDate: '2026-01-20',
                reason: 'Not feeling well'
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
            message: 'Naruechon Woraphatphawan\'s probation ends on Jan 1, 2026',
            messageTh: 'นฤชล วรพัฒน์พาวัลย์ จะผ่านทดลองงานวันที่ 1 ม.ค. 2569',
            employeeId: 'EMP_DR001',
            dueDate: '2026-01-01',
            daysRemaining: 0,
            priority: 'high',
            icon: 'hourglass_top',
            color: 'orange'
        },
        {
            id: 'tn_002',
            type: 'probation_ending',
            title: 'Probation Ending Soon',
            titleTh: 'ใกล้หมดระยะทดลองงาน',
            message: 'Punnapa Thianchai\'s probation ends on Jan 1, 2026',
            messageTh: 'ปุณณภา เทียนชัย จะผ่านทดลองงานวันที่ 1 ม.ค. 2569',
            employeeId: 'EMP_DR002',
            dueDate: '2026-01-01',
            daysRemaining: 0,
            priority: 'high',
            icon: 'hourglass_top',
            color: 'orange'
        },
        {
            id: 'tn_003',
            type: 'training_due',
            title: 'ProNext Training Module',
            titleTh: 'การอบรม ProNext',
            message: 'ProNext Product Management training due for 2 team members',
            messageTh: 'การอบรม ProNext Product Management สำหรับพนักงาน 2 คน',
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
            message: 'Naruechon Woraphatphawan\'s birthday is on May 15',
            messageTh: 'วันเกิด นฤชล วรพัฒน์พาวัลย์ วันที่ 15 พ.ค.',
            employeeId: 'EMP_DR001',
            dueDate: '2026-05-15',
            daysRemaining: 125,
            priority: 'low',
            icon: 'cake',
            color: 'pink'
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

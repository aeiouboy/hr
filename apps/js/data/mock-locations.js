/**
 * Mock Location Data
 * Location hierarchy and employee assignment data for development and testing
 */

const MockLocationData = {
    // Location Types
    locationTypes: [
        { value: 'business_zone', labelEn: 'Business Zone', labelTh: 'โซนธุรกิจ' },
        { value: 'region', labelEn: 'Region', labelTh: 'ภูมิภาค' },
        { value: 'province', labelEn: 'Province', labelTh: 'จังหวัด' },
        { value: 'district', labelEn: 'District', labelTh: 'อำเภอ' },
        { value: 'branch', labelEn: 'Branch', labelTh: 'สาขา' },
        { value: 'building', labelEn: 'Building', labelTh: 'อาคาร' },
        { value: 'floor', labelEn: 'Floor', labelTh: 'ชั้น' }
    ],

    // Thai Provinces (Major ones)
    provinces: [
        {
            id: 'prov_bkk',
            code: 'BKK',
            nameEn: 'Bangkok',
            nameTh: 'กรุงเทพมหานคร',
            regionId: 'reg_central'
        },
        {
            id: 'prov_cbi',
            code: 'CBI',
            nameEn: 'Chonburi',
            nameTh: 'ชลบุรี',
            regionId: 'reg_eastern'
        },
        {
            id: 'prov_cnx',
            code: 'CNX',
            nameEn: 'Chiang Mai',
            nameTh: 'เชียงใหม่',
            regionId: 'reg_northern'
        },
        {
            id: 'prov_kkc',
            code: 'KKC',
            nameEn: 'Khon Kaen',
            nameTh: 'ขอนแก่น',
            regionId: 'reg_northeastern'
        },
        {
            id: 'prov_hkt',
            code: 'HKT',
            nameEn: 'Phuket',
            nameTh: 'ภูเก็ต',
            regionId: 'reg_southern'
        },
        {
            id: 'prov_urt',
            code: 'URT',
            nameEn: 'Surat Thani',
            nameTh: 'สุราษฎร์ธานี',
            regionId: 'reg_southern'
        },
        {
            id: 'prov_aya',
            code: 'AYA',
            nameEn: 'Ayutthaya',
            nameTh: 'พระนครศรีอยุธยา',
            regionId: 'reg_central'
        },
        {
            id: 'prov_nma',
            code: 'NMA',
            nameEn: 'Nakhon Ratchasima',
            nameTh: 'นครราชสีมา',
            regionId: 'reg_northeastern'
        },
        {
            id: 'prov_ntb',
            code: 'NTB',
            nameEn: 'Nonthaburi',
            nameTh: 'นนทบุรี',
            regionId: 'reg_central'
        },
        {
            id: 'prov_ptn',
            code: 'PTN',
            nameEn: 'Pathum Thani',
            nameTh: 'ปทุมธานี',
            regionId: 'reg_central'
        }
    ],

    // Location Hierarchy
    locations: [
        // Business Zones (Level 1)
        {
            id: 'bz_retail',
            locationCode: 'BZ-RETAIL',
            nameEn: 'Retail Operations Zone',
            nameTh: 'โซนค้าปลีก',
            locationType: 'business_zone',
            parentLocationId: null,
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 12500
        },
        {
            id: 'bz_corporate',
            locationCode: 'BZ-CORP',
            nameEn: 'Corporate Zone',
            nameTh: 'โซนสำนักงานใหญ่',
            locationType: 'business_zone',
            parentLocationId: null,
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 3500
        },
        {
            id: 'bz_logistics',
            locationCode: 'BZ-LOG',
            nameEn: 'Logistics Zone',
            nameTh: 'โซนโลจิสติกส์',
            locationType: 'business_zone',
            parentLocationId: null,
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 2800
        },

        // Regions (Level 2)
        {
            id: 'reg_central',
            locationCode: 'REG-CENTRAL',
            nameEn: 'Central Region',
            nameTh: 'ภาคกลาง',
            locationType: 'region',
            parentLocationId: 'bz_retail',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 5200
        },
        {
            id: 'reg_northern',
            locationCode: 'REG-NORTH',
            nameEn: 'Northern Region',
            nameTh: 'ภาคเหนือ',
            locationType: 'region',
            parentLocationId: 'bz_retail',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 1800
        },
        {
            id: 'reg_northeastern',
            locationCode: 'REG-NE',
            nameEn: 'Northeastern Region',
            nameTh: 'ภาคตะวันออกเฉียงเหนือ',
            locationType: 'region',
            parentLocationId: 'bz_retail',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 2100
        },
        {
            id: 'reg_eastern',
            locationCode: 'REG-EAST',
            nameEn: 'Eastern Region',
            nameTh: 'ภาคตะวันออก',
            locationType: 'region',
            parentLocationId: 'bz_retail',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 1600
        },
        {
            id: 'reg_southern',
            locationCode: 'REG-SOUTH',
            nameEn: 'Southern Region',
            nameTh: 'ภาคใต้',
            locationType: 'region',
            parentLocationId: 'bz_retail',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 1800
        },

        // Branches (Level 3 - Sample Branches)
        {
            id: 'branch_central_world',
            locationCode: 'BR-CTW',
            nameEn: 'Central World',
            nameTh: 'เซ็นทรัลเวิลด์',
            locationType: 'branch',
            parentLocationId: 'reg_central',
            provinceId: 'prov_bkk',
            address: {
                addressLine1: '4, 4/1-4/2, 4/4 Rajdamri Road',
                addressLine2: 'Pathumwan',
                district: 'Pathumwan',
                subDistrict: 'Pathumwan',
                province: 'Bangkok',
                postalCode: '10330',
                country: 'Thailand'
            },
            coordinates: { lat: 13.7466, lng: 100.5392 },
            status: 'active',
            headcount: 850
        },
        {
            id: 'branch_siam_paragon',
            locationCode: 'BR-SPG',
            nameEn: 'Siam Paragon',
            nameTh: 'สยามพารากอน',
            locationType: 'branch',
            parentLocationId: 'reg_central',
            provinceId: 'prov_bkk',
            address: {
                addressLine1: '991 Rama I Road',
                addressLine2: 'Pathumwan',
                district: 'Pathumwan',
                subDistrict: 'Pathumwan',
                province: 'Bangkok',
                postalCode: '10330',
                country: 'Thailand'
            },
            coordinates: { lat: 13.7460, lng: 100.5347 },
            status: 'active',
            headcount: 720
        },
        {
            id: 'branch_central_pattaya',
            locationCode: 'BR-CPT',
            nameEn: 'Central Pattaya',
            nameTh: 'เซ็นทรัลพัทยา',
            locationType: 'branch',
            parentLocationId: 'reg_eastern',
            provinceId: 'prov_cbi',
            address: {
                addressLine1: '333/99 Moo 9, Pattaya-Naklua Road',
                addressLine2: 'Nongprue',
                district: 'Banglamung',
                subDistrict: 'Nongprue',
                province: 'Chonburi',
                postalCode: '20150',
                country: 'Thailand'
            },
            coordinates: { lat: 12.9355, lng: 100.8884 },
            status: 'active',
            headcount: 420
        },
        {
            id: 'branch_central_chiang_mai',
            locationCode: 'BR-CCM',
            nameEn: 'Central Festival Chiang Mai',
            nameTh: 'เซ็นทรัลเฟสติวัล เชียงใหม่',
            locationType: 'branch',
            parentLocationId: 'reg_northern',
            provinceId: 'prov_cnx',
            address: {
                addressLine1: '99, 99/1-99/2 Moo 4',
                addressLine2: 'Super Highway Chiang Mai-Lampang Road',
                district: 'Muang',
                subDistrict: 'Faham',
                province: 'Chiang Mai',
                postalCode: '50000',
                country: 'Thailand'
            },
            coordinates: { lat: 18.8056, lng: 99.0172 },
            status: 'active',
            headcount: 380
        },
        {
            id: 'branch_central_khonkaen',
            locationCode: 'BR-CKK',
            nameEn: 'Central Khon Kaen',
            nameTh: 'เซ็นทรัล ขอนแก่น',
            locationType: 'branch',
            parentLocationId: 'reg_northeastern',
            provinceId: 'prov_kkc',
            address: {
                addressLine1: '99/9 Srichan Road',
                addressLine2: 'Muang',
                district: 'Muang',
                subDistrict: 'Nai Muang',
                province: 'Khon Kaen',
                postalCode: '40000',
                country: 'Thailand'
            },
            coordinates: { lat: 16.4419, lng: 102.8360 },
            status: 'active',
            headcount: 310
        },
        {
            id: 'branch_central_phuket',
            locationCode: 'BR-CPH',
            nameEn: 'Central Phuket',
            nameTh: 'เซ็นทรัล ภูเก็ต',
            locationType: 'branch',
            parentLocationId: 'reg_southern',
            provinceId: 'prov_hkt',
            address: {
                addressLine1: '74-75 Moo 5, Vichitsongkram Road',
                addressLine2: 'Wichit',
                district: 'Muang',
                subDistrict: 'Wichit',
                province: 'Phuket',
                postalCode: '83000',
                country: 'Thailand'
            },
            coordinates: { lat: 7.8764, lng: 98.3692 },
            status: 'active',
            headcount: 290
        },
        {
            id: 'branch_central_korat',
            locationCode: 'BR-CKR',
            nameEn: 'Central Korat',
            nameTh: 'เซ็นทรัล โคราช',
            locationType: 'branch',
            parentLocationId: 'reg_northeastern',
            provinceId: 'prov_nma',
            address: {
                addressLine1: '990, 998 Mittraphap Road',
                addressLine2: 'Nai Muang',
                district: 'Muang',
                subDistrict: 'Nai Muang',
                province: 'Nakhon Ratchasima',
                postalCode: '30000',
                country: 'Thailand'
            },
            coordinates: { lat: 14.9799, lng: 102.0978 },
            status: 'active',
            headcount: 340
        },

        // Buildings (Level 4)
        {
            id: 'bldg_silom_tower',
            locationCode: 'BLD-SLM',
            nameEn: 'Silom Tower',
            nameTh: 'อาคารสีลมทาวเวอร์',
            locationType: 'building',
            parentLocationId: 'bz_corporate',
            provinceId: 'prov_bkk',
            address: {
                addressLine1: '979 Silom Road',
                addressLine2: 'Silom, Bang Rak',
                district: 'Bang Rak',
                subDistrict: 'Silom',
                province: 'Bangkok',
                postalCode: '10500',
                country: 'Thailand'
            },
            coordinates: { lat: 13.7279, lng: 100.5214 },
            status: 'active',
            headcount: 1200
        },
        {
            id: 'bldg_central_office',
            locationCode: 'BLD-CTO',
            nameEn: 'Central Group Office',
            nameTh: 'อาคารสำนักงานกลาง',
            locationType: 'building',
            parentLocationId: 'bz_corporate',
            provinceId: 'prov_bkk',
            address: {
                addressLine1: '306 Silom Road',
                addressLine2: 'Suriyawong, Bang Rak',
                district: 'Bang Rak',
                subDistrict: 'Suriyawong',
                province: 'Bangkok',
                postalCode: '10500',
                country: 'Thailand'
            },
            coordinates: { lat: 13.7252, lng: 100.5178 },
            status: 'active',
            headcount: 980
        },

        // Floors (Level 5)
        {
            id: 'floor_silom_25',
            locationCode: 'FLR-SLM-25',
            nameEn: 'Silom Tower Floor 25',
            nameTh: 'สีลมทาวเวอร์ ชั้น 25',
            locationType: 'floor',
            parentLocationId: 'bldg_silom_tower',
            provinceId: 'prov_bkk',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 85
        },
        {
            id: 'floor_silom_26',
            locationCode: 'FLR-SLM-26',
            nameEn: 'Silom Tower Floor 26',
            nameTh: 'สีลมทาวเวอร์ ชั้น 26',
            locationType: 'floor',
            parentLocationId: 'bldg_silom_tower',
            provinceId: 'prov_bkk',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 92
        },
        {
            id: 'floor_silom_27',
            locationCode: 'FLR-SLM-27',
            nameEn: 'Silom Tower Floor 27',
            nameTh: 'สีลมทาวเวอร์ ชั้น 27',
            locationType: 'floor',
            parentLocationId: 'bldg_silom_tower',
            provinceId: 'prov_bkk',
            address: null,
            coordinates: null,
            status: 'active',
            headcount: 78
        }
    ],

    // Employee Location Assignments
    employeeAssignments: [
        {
            id: 'ela_001',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            employeePhoto: 'https://i.pravatar.cc/150?img=11',
            locationId: 'floor_silom_25',
            locationType: 'primary',
            effectiveDate: '2022-01-01',
            endDate: null,
            status: 'active'
        },
        {
            id: 'ela_002',
            employeeId: 'EMP001',
            employeeName: 'Chatchai Tangsiri',
            employeeNameTh: 'ชาติชาย ทังศิริ',
            employeePhoto: 'https://i.pravatar.cc/150?img=11',
            locationId: 'branch_central_world',
            locationType: 'secondary',
            effectiveDate: '2023-06-01',
            endDate: null,
            status: 'active'
        },
        {
            id: 'ela_003',
            employeeId: 'EMP002',
            employeeName: 'Prawit Wongsuwan',
            employeeNameTh: 'ประวิทย์ วงษ์สุวรรณ',
            employeePhoto: 'https://i.pravatar.cc/150?img=15',
            locationId: 'floor_silom_26',
            locationType: 'primary',
            effectiveDate: '2020-03-15',
            endDate: null,
            status: 'active'
        },
        {
            id: 'ela_004',
            employeeId: 'EMP003',
            employeeName: 'Siriporn Rattanakosin',
            employeeNameTh: 'ศิริพร รัตนโกสินทร์',
            employeePhoto: 'https://i.pravatar.cc/150?img=16',
            locationId: 'branch_central_chiang_mai',
            locationType: 'primary',
            effectiveDate: '2021-08-01',
            endDate: null,
            status: 'active'
        },
        {
            id: 'ela_005',
            employeeId: 'EMP004',
            employeeName: 'Somchai Sukhothai',
            employeeNameTh: 'สมชาย สุโขทัย',
            employeePhoto: 'https://i.pravatar.cc/150?img=17',
            locationId: 'branch_central_pattaya',
            locationType: 'primary',
            effectiveDate: '2019-11-01',
            endDate: null,
            status: 'active'
        }
    ],

    // Location Assignment History
    assignmentHistory: [
        {
            id: 'elah_001',
            employeeId: 'EMP001',
            fromLocationId: 'branch_siam_paragon',
            toLocationId: 'floor_silom_25',
            locationType: 'primary',
            effectiveDate: '2022-01-01',
            reason: 'Transfer to Corporate Office',
            approvedBy: 'HR Admin',
            approvedDate: '2021-12-15'
        },
        {
            id: 'elah_002',
            employeeId: 'EMP001',
            fromLocationId: null,
            toLocationId: 'branch_siam_paragon',
            locationType: 'primary',
            effectiveDate: '2015-04-01',
            reason: 'New Hire - Initial Assignment',
            approvedBy: 'HR Admin',
            approvedDate: '2015-03-20'
        }
    ],

    // Headcount Summary by Region
    headcountByRegion: [
        { regionId: 'reg_central', regionName: 'Central', count: 5200, percentage: 40 },
        { regionId: 'reg_northeastern', regionName: 'Northeastern', count: 2100, percentage: 16 },
        { regionId: 'reg_northern', regionName: 'Northern', count: 1800, percentage: 14 },
        { regionId: 'reg_southern', regionName: 'Southern', count: 1800, percentage: 14 },
        { regionId: 'reg_eastern', regionName: 'Eastern', count: 1600, percentage: 12 },
        { regionId: 'bz_corporate', regionName: 'Corporate', count: 3500, percentage: 4 }
    ],

    // Helper Functions
    getLocation(locationId) {
        return this.locations.find(l => l.id === locationId);
    },

    getLocationByCode(locationCode) {
        return this.locations.find(l => l.locationCode === locationCode);
    },

    getProvince(provinceId) {
        return this.provinces.find(p => p.id === provinceId);
    },

    getLocationType(typeValue) {
        return this.locationTypes.find(t => t.value === typeValue);
    },

    getLocationsByType(locationType) {
        return this.locations.filter(l => l.locationType === locationType);
    },

    getChildLocations(parentLocationId) {
        return this.locations.filter(l => l.parentLocationId === parentLocationId);
    },

    getLocationPath(locationId) {
        const path = [];
        let current = this.getLocation(locationId);
        while (current) {
            path.unshift(current);
            current = current.parentLocationId ? this.getLocation(current.parentLocationId) : null;
        }
        return path;
    },

    getEmployeesByLocation(locationId) {
        return this.employeeAssignments.filter(a => a.locationId === locationId && a.status === 'active');
    },

    getEmployeeLocations(employeeId) {
        return this.employeeAssignments.filter(a => a.employeeId === employeeId && a.status === 'active');
    },

    getEmployeeLocationHistory(employeeId) {
        return this.assignmentHistory.filter(h => h.employeeId === employeeId);
    },

    searchLocations(query) {
        const lowerQuery = query.toLowerCase();
        return this.locations.filter(l =>
            l.locationCode.toLowerCase().includes(lowerQuery) ||
            l.nameEn.toLowerCase().includes(lowerQuery) ||
            l.nameTh.includes(query)
        );
    },

    getHeadcountByProvince() {
        const summary = [];
        this.provinces.forEach(province => {
            const branchesInProvince = this.locations.filter(
                l => l.provinceId === province.id && l.locationType === 'branch'
            );
            const totalHeadcount = branchesInProvince.reduce((sum, b) => sum + (b.headcount || 0), 0);
            if (totalHeadcount > 0) {
                summary.push({
                    provinceId: province.id,
                    provinceCode: province.code,
                    provinceName: province.nameEn,
                    provinceNameTh: province.nameTh,
                    headcount: totalHeadcount
                });
            }
        });
        return summary.sort((a, b) => b.headcount - a.headcount);
    },

    getTotalHeadcount() {
        return this.locations
            .filter(l => l.locationType === 'business_zone')
            .reduce((sum, l) => sum + (l.headcount || 0), 0);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockLocationData;
}

/**
 * Seed Location Data
 * Migrates mock-locations.js to time-attendance Prisma schema (Location, EmployeeLocation)
 */
import { PrismaClient } from '../../services/time-attendance/generated/prisma';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Locations from MockLocationData.locations
// ---------------------------------------------------------------------------

const locations = [
  // Business Zones
  { location_code: 'BZ-RETAIL', name_en: 'Retail Operations Zone', name_th: 'โซนค้าปลีก', location_type: 'business_zone', parent_code: null, address: null, coordinates: null, status: 'active', headcount: 12500 },
  { location_code: 'BZ-CORP', name_en: 'Corporate Zone', name_th: 'โซนสำนักงานใหญ่', location_type: 'business_zone', parent_code: null, address: null, coordinates: null, status: 'active', headcount: 3500 },
  { location_code: 'BZ-LOG', name_en: 'Logistics Zone', name_th: 'โซนโลจิสติกส์', location_type: 'business_zone', parent_code: null, address: null, coordinates: null, status: 'active', headcount: 2800 },
  // Regions
  { location_code: 'REG-CENTRAL', name_en: 'Central Region', name_th: 'ภาคกลาง', location_type: 'region', parent_code: 'BZ-RETAIL', address: null, coordinates: null, status: 'active', headcount: 5200 },
  { location_code: 'REG-NORTH', name_en: 'Northern Region', name_th: 'ภาคเหนือ', location_type: 'region', parent_code: 'BZ-RETAIL', address: null, coordinates: null, status: 'active', headcount: 1800 },
  { location_code: 'REG-NE', name_en: 'Northeastern Region', name_th: 'ภาคตะวันออกเฉียงเหนือ', location_type: 'region', parent_code: 'BZ-RETAIL', address: null, coordinates: null, status: 'active', headcount: 2100 },
  { location_code: 'REG-EAST', name_en: 'Eastern Region', name_th: 'ภาคตะวันออก', location_type: 'region', parent_code: 'BZ-RETAIL', address: null, coordinates: null, status: 'active', headcount: 1600 },
  { location_code: 'REG-SOUTH', name_en: 'Southern Region', name_th: 'ภาคใต้', location_type: 'region', parent_code: 'BZ-RETAIL', address: null, coordinates: null, status: 'active', headcount: 1800 },
  // Branches
  { location_code: 'BR-CTW', name_en: 'Central World', name_th: 'เซ็นทรัลเวิลด์', location_type: 'branch', parent_code: 'REG-CENTRAL', address: { addressLine1: '4, 4/1-4/2, 4/4 Rajdamri Road', district: 'Pathumwan', province: 'Bangkok', postalCode: '10330', country: 'Thailand' }, coordinates: { lat: 13.7466, lng: 100.5392 }, status: 'active', headcount: 850 },
  { location_code: 'BR-SPG', name_en: 'Siam Paragon', name_th: 'สยามพารากอน', location_type: 'branch', parent_code: 'REG-CENTRAL', address: { addressLine1: '991 Rama I Road', district: 'Pathumwan', province: 'Bangkok', postalCode: '10330', country: 'Thailand' }, coordinates: { lat: 13.7460, lng: 100.5347 }, status: 'active', headcount: 720 },
  { location_code: 'BR-CPT', name_en: 'Central Pattaya', name_th: 'เซ็นทรัลพัทยา', location_type: 'branch', parent_code: 'REG-EAST', address: { addressLine1: '333/99 Moo 9, Pattaya-Naklua Road', district: 'Banglamung', province: 'Chonburi', postalCode: '20150', country: 'Thailand' }, coordinates: { lat: 12.9355, lng: 100.8884 }, status: 'active', headcount: 420 },
  { location_code: 'BR-CCM', name_en: 'Central Festival Chiang Mai', name_th: 'เซ็นทรัลเฟสติวัล เชียงใหม่', location_type: 'branch', parent_code: 'REG-NORTH', address: { addressLine1: '99, 99/1-99/2 Moo 4', district: 'Muang', province: 'Chiang Mai', postalCode: '50000', country: 'Thailand' }, coordinates: { lat: 18.8056, lng: 99.0172 }, status: 'active', headcount: 380 },
  { location_code: 'BR-CKK', name_en: 'Central Khon Kaen', name_th: 'เซ็นทรัล ขอนแก่น', location_type: 'branch', parent_code: 'REG-NE', address: { addressLine1: '99/9 Srichan Road', district: 'Muang', province: 'Khon Kaen', postalCode: '40000', country: 'Thailand' }, coordinates: { lat: 16.4419, lng: 102.8360 }, status: 'active', headcount: 310 },
  { location_code: 'BR-CPH', name_en: 'Central Phuket', name_th: 'เซ็นทรัล ภูเก็ต', location_type: 'branch', parent_code: 'REG-SOUTH', address: { addressLine1: '74-75 Moo 5, Vichitsongkram Road', district: 'Muang', province: 'Phuket', postalCode: '83000', country: 'Thailand' }, coordinates: { lat: 7.8764, lng: 98.3692 }, status: 'active', headcount: 290 },
  { location_code: 'BR-CKR', name_en: 'Central Korat', name_th: 'เซ็นทรัล โคราช', location_type: 'branch', parent_code: 'REG-NE', address: { addressLine1: '990, 998 Mittraphap Road', district: 'Muang', province: 'Nakhon Ratchasima', postalCode: '30000', country: 'Thailand' }, coordinates: { lat: 14.9799, lng: 102.0978 }, status: 'active', headcount: 340 },
  // Buildings
  { location_code: 'BLD-SLM', name_en: 'Silom Tower', name_th: 'อาคารสีลมทาวเวอร์', location_type: 'building', parent_code: 'BZ-CORP', address: { addressLine1: '979 Silom Road', district: 'Bang Rak', province: 'Bangkok', postalCode: '10500', country: 'Thailand' }, coordinates: { lat: 13.7279, lng: 100.5214 }, status: 'active', headcount: 1200 },
  { location_code: 'BLD-CTO', name_en: 'Central Group Office', name_th: 'อาคารสำนักงานกลาง', location_type: 'building', parent_code: 'BZ-CORP', address: { addressLine1: '306 Silom Road', district: 'Bang Rak', province: 'Bangkok', postalCode: '10500', country: 'Thailand' }, coordinates: { lat: 13.7252, lng: 100.5178 }, status: 'active', headcount: 980 },
  // Floors
  { location_code: 'FLR-SLM-25', name_en: 'Silom Tower Floor 25', name_th: 'สีลมทาวเวอร์ ชั้น 25', location_type: 'floor', parent_code: 'BLD-SLM', address: null, coordinates: null, status: 'active', headcount: 85 },
  { location_code: 'FLR-SLM-26', name_en: 'Silom Tower Floor 26', name_th: 'สีลมทาวเวอร์ ชั้น 26', location_type: 'floor', parent_code: 'BLD-SLM', address: null, coordinates: null, status: 'active', headcount: 92 },
  { location_code: 'FLR-SLM-27', name_en: 'Silom Tower Floor 27', name_th: 'สีลมทาวเวอร์ ชั้น 27', location_type: 'floor', parent_code: 'BLD-SLM', address: null, coordinates: null, status: 'active', headcount: 78 },
];

// Employee location assignments from MockLocationData.employeeAssignments
const employeeLocations = [
  { employee_id: 'EMP001', location_code: 'FLR-SLM-25', location_type: 'primary', effective_date: new Date('2022-01-01'), status: 'active' },
  { employee_id: 'EMP001', location_code: 'BR-CTW', location_type: 'secondary', effective_date: new Date('2023-06-01'), status: 'active' },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

export async function seedLocations() {
  console.log('Seeding locations...');
  const locIdMap: Record<string, string> = {};

  // First pass: create all locations without parent references
  for (const loc of locations) {
    const { parent_code, ...data } = loc;
    const record = await prisma.location.upsert({
      where: { location_code: loc.location_code },
      create: data,
      update: data,
    });
    locIdMap[loc.location_code] = record.id;
  }

  // Second pass: set parent references
  for (const loc of locations) {
    if (loc.parent_code) {
      const parentId = locIdMap[loc.parent_code];
      if (parentId) {
        await prisma.location.update({
          where: { location_code: loc.location_code },
          data: { parent_location_id: parentId },
        });
      }
    }
  }
  console.log(`  Seeded ${locations.length} locations`);

  // Seed employee locations
  console.log('Seeding employee location assignments...');
  for (const el of employeeLocations) {
    const locId = locIdMap[el.location_code];
    if (!locId) continue;
    await prisma.employeeLocation.upsert({
      where: {
        employee_id_location_id_location_type: {
          employee_id: el.employee_id,
          location_id: locId,
          location_type: el.location_type,
        },
      },
      create: {
        employee_id: el.employee_id,
        location_id: locId,
        location_type: el.location_type,
        effective_date: el.effective_date,
        status: el.status,
      },
      update: {
        effective_date: el.effective_date,
        status: el.status,
      },
    });
  }
  console.log(`  Seeded ${employeeLocations.length} employee locations`);
}

if (require.main === module) {
  seedLocations()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}

// country-iso.ts — COUNTRY picklist (ISOCountryList subset)
// Source: BA-EC-SUMMARY.md row 9 (Country of Birth) + row 14 (Country)
// Picklist ID: ISOCountryList
import type { PicklistItem } from './index'

export const PICKLIST_COUNTRY_ISO: readonly PicklistItem[] = [
  { id: 'TH', labelTh: 'ไทย',          labelEn: 'Thailand',          sortOrder: 1,  active: true },
  { id: 'VN', labelTh: 'เวียดนาม',      labelEn: 'Vietnam',           sortOrder: 2,  active: true },
  { id: 'MM', labelTh: 'เมียนมาร์',     labelEn: 'Myanmar',           sortOrder: 3,  active: true },
  { id: 'KH', labelTh: 'กัมพูชา',       labelEn: 'Cambodia',          sortOrder: 4,  active: true },
  { id: 'LA', labelTh: 'ลาว',           labelEn: 'Laos',              sortOrder: 5,  active: true },
  { id: 'SG', labelTh: 'สิงคโปร์',      labelEn: 'Singapore',         sortOrder: 6,  active: true },
  { id: 'MY', labelTh: 'มาเลเซีย',      labelEn: 'Malaysia',          sortOrder: 7,  active: true },
  { id: 'ID', labelTh: 'อินโดนีเซีย',   labelEn: 'Indonesia',         sortOrder: 8,  active: true },
  { id: 'PH', labelTh: 'ฟิลิปปินส์',    labelEn: 'Philippines',       sortOrder: 9,  active: true },
  { id: 'IN', labelTh: 'อินเดีย',       labelEn: 'India',             sortOrder: 10, active: true },
  { id: 'CN', labelTh: 'จีน',           labelEn: 'China',             sortOrder: 11, active: true },
  { id: 'JP', labelTh: 'ญี่ปุ่น',       labelEn: 'Japan',             sortOrder: 12, active: true },
  { id: 'KR', labelTh: 'เกาหลีใต้',     labelEn: 'South Korea',       sortOrder: 13, active: true },
  { id: 'US', labelTh: 'สหรัฐอเมริกา', labelEn: 'United States',     sortOrder: 14, active: true },
  { id: 'GB', labelTh: 'สหราชอาณาจักร', labelEn: 'United Kingdom',   sortOrder: 15, active: true },
  { id: 'AU', labelTh: 'ออสเตรเลีย',   labelEn: 'Australia',         sortOrder: 16, active: true },
  { id: 'DE', labelTh: 'เยอรมนี',       labelEn: 'Germany',           sortOrder: 17, active: true },
  { id: 'FR', labelTh: 'ฝรั่งเศส',      labelEn: 'France',            sortOrder: 18, active: true },
  { id: 'NL', labelTh: 'เนเธอร์แลนด์', labelEn: 'Netherlands',       sortOrder: 19, active: true },
  { id: 'OTHER', labelTh: 'อื่นๆ',      labelEn: 'Other',             sortOrder: 99, active: true },
] as const

export type CountryISOId =
  | 'TH' | 'VN' | 'MM' | 'KH' | 'LA' | 'SG' | 'MY' | 'ID' | 'PH'
  | 'IN' | 'CN' | 'JP' | 'KR' | 'US' | 'GB' | 'AU' | 'DE' | 'FR' | 'NL' | 'OTHER'

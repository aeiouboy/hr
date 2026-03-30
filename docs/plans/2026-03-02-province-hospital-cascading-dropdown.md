# Plan: Province → Hospital Cascading Dropdown for Hospital Referral

## Context

The hospital referral request form (`referral-request-form.tsx`) currently has a flat hospital dropdown with no province filtering. The requirement is to add a **Province → Hospital cascading selection** where:
1. User selects a Province (e.g., Bangkok, Nonthaburi, Pathum Thani, Samut Prakan)
2. Hospital dropdown filters to show only hospitals in that province
3. Hospital dropdown supports **typeahead/search filtering** (user can type Thai or English to filter)

## Files to Modify

1. **`src/frontend/src/hooks/use-hospital-referral.ts`** — Add `province` field to `Hospital` type, add province data, group hospitals by province
2. **`src/frontend/src/components/hospital-referral/referral-request-form.tsx`** — Add province dropdown + searchable hospital combobox
3. **`src/frontend/src/components/ui/form-field.tsx`** — Add `combobox` type with search/filter support
4. **`src/frontend/messages/en.json`** — Add province/hospital i18n keys
5. **`src/frontend/messages/th.json`** — Add province/hospital i18n keys

## Implementation

### Step 1: Extend Hospital data with province

In `use-hospital-referral.ts`:

- Add `province` field to `Hospital` interface
- Add `Province` type/interface with `id`, `nameEn`, `nameTh`
- Add `MOCK_PROVINCES` array: Bangkok/กรุงเทพ, Nonthaburi/นนทบุรี, Pathum Thani/ปทุมธานี, Samut Prakan/สมุทรปราการ
- Update `MOCK_HOSPITALS` to include `province: 'bangkok'` etc., and add hospitals per province:
  - Bangkok: กรุงเทพ/Bangkok, กรุงเทพคริสเตียน/The Bangkok Christian, เกษมราษฎร์ ประชาชื่น/Kasemrad Prachachuen, เกษมราษฎร์บางแค/Kasemrad Bangkae (+ existing Bangkok hospitals)
  - Nonthaburi: hospitals in Nonthaburi
  - Pathum Thani: hospitals in Pathum Thani
  - Samut Prakan: hospitals in Samut Prakan
- Export `provinces` from the hook alongside `hospitals`

### Step 2: Add searchable combobox to FormField

In `form-field.tsx`:

- Add `type: 'combobox'` to the union type
- Combobox renders: an input field that doubles as search + a dropdown list filtered by typed text
- Matches against both `label` and an optional `searchLabel` (for Thai+English matching)
- Shows dropdown on focus/click, filters as user types
- Selects on click or Enter, closes on blur/Escape

### Step 3: Update referral-request-form.tsx

- Add `provinceId` state
- Add Province `<FormField type="select">` before the hospital field
- Replace hospital `<FormField type="select">` with `<FormField type="combobox">`
- Filter hospitals by selected province: `hospitals.filter(h => h.province === provinceId)`
- Reset hospital selection when province changes
- Combobox options include both Thai and English names for search matching

### Step 4: Add i18n keys

Add to `hospitalReferral` namespace in both en.json and th.json:
- `province`: "Province" / "จังหวัด"
- `selectProvince`: "Select province" / "เลือกจังหวัด"

## Verification

1. Navigate to hospital referral page, click new request
2. Verify Province dropdown shows 4 provinces (bilingual labels)
3. Select Bangkok → Hospital dropdown shows only Bangkok hospitals
4. Type Thai text (e.g., "เกษม") in hospital combobox → filters to matching hospitals
5. Change province → hospital resets
6. Submit form → verify province/hospital data saved correctly
7. Test in Thai locale

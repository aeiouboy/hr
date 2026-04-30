"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PICKLIST_ID_CARD_TYPE = void 0;
// Q6 decision: only NATIONAL_ID/NATIONAL_ID_2/PASSPORT have SF bindings (tni/tni2/PN)
// WORK_PERMIT/ALIEN_ID/OTHER dropped — no SF cardType counterpart for THA scope.
exports.PICKLIST_ID_CARD_TYPE = [
    { id: 'NATIONAL_ID', labelTh: 'บัตรประชาชน', labelEn: 'National ID Card', sortOrder: 1, active: true },
    { id: 'PASSPORT', labelTh: 'หนังสือเดินทาง', labelEn: 'Passport', sortOrder: 2, active: true },
];
//# sourceMappingURL=id-card-type.js.map
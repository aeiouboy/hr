import { writeFileSync } from "node:fs";

const outExcalidraw = "docs/diagrams/hr-workflow-governance-q1-q4.excalidraw";
const outSvg = "docs/diagrams/hr-workflow-governance-q1-q4.svg";

let seed = 3000;
const elements = [];
const ink = "#1e1e1e";
const muted = "#5f6368";
const line = "#ced4da";
const panelBg = "#f8f9fa";
const fontFamily = 2;
const colors = {
  blue: "#a5d8ff",
  green: "#b2f2bb",
  yellow: "#ffec99",
  red: "#ffc9c9",
  purple: "#d0bfff",
  gray: "#e9ecef",
  white: "#ffffff",
};

function base(id, type, x, y, width, height) {
  return {
    id,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: ink,
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: seed++,
    version: 1,
    versionNonce: seed++,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
  };
}

function rect(id, x, y, w, h, bg = colors.white, stroke = line, width = 2) {
  elements.push({ ...base(id, "rectangle", x, y, w, h), backgroundColor: bg, strokeColor: stroke, strokeWidth: width });
}

function diamond(id, x, y, w, h, bg = colors.yellow) {
  elements.push({ ...base(id, "diamond", x, y, w, h), backgroundColor: bg, strokeColor: "#e67700" });
}

function text(id, x, y, value, size = 18, color = ink, opts = {}) {
  const lines = value.split("\n");
  elements.push({
    ...base(id, "text", x, y, opts.width ?? Math.max(...lines.map((l) => l.length)) * size * 0.56, opts.height ?? lines.length * size * 1.25),
    strokeColor: color,
    text: value,
    fontSize: size,
    fontFamily,
    textAlign: opts.align ?? "left",
    verticalAlign: "top",
    containerId: null,
    originalText: value,
    lineHeight: 1.25,
  });
}

function center(id, x, y, value, size = 18, color = ink, width = 220) {
  text(id, x, y, value, size, color, { align: "center", width });
}

function arrow(id, x1, y1, x2, y2, label) {
  elements.push({
    ...base(id, "arrow", x1, y1, x2 - x1, y2 - y1),
    strokeColor: "#495057",
    points: [[0, 0], [x2 - x1, y2 - y1]],
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    lastCommittedPoint: null,
  });
  if (label) text(`${id}_label`, (x1 + x2) / 2 - 55, (y1 + y2) / 2 - 24, label, 14, muted, { width: 120, align: "center" });
}

function panel(id, x, y, title, subtitle) {
  rect(`${id}_panel`, x, y, 1450, 900, panelBg, "#dee2e6");
  text(`${id}_title`, x + 34, y + 26, title, 30, ink);
  text(`${id}_sub`, x + 36, y + 70, subtitle, 17, muted);
  arrow(`${id}_div`, x + 34, y + 112, x + 1416, y + 112);
}

panel("q0", 80, 80, "แนวทางกำกับ Workflow HR: 4 คำถามหลัก", "ใช้คุยกับทีมเพื่อแยก security, Workflow, API contract, และ business logic ownership ให้ชัด");
const cards = [
  ["Q1", "UI Control", "ใครตัดสินใจว่าเห็นปุ่มอะไร", colors.blue],
  ["Q2", "Workflow Role", "Role / position setup อยู่ที่ไหน", colors.purple],
  ["Q3", "API Exposure", "ผู้ใช้แต่ละกลุ่มเห็นข้อมูลต่างกัน", colors.green],
  ["Q4", "Logic Boundary", "อะไรอยู่ใน Workflow / domain service", colors.yellow],
];
cards.forEach(([q, title, body, color], i) => {
  const x = 160 + i * 330;
  rect(`q0_c${i}`, x, 260, 285, 230, color, "#495057");
  text(`q0_c${i}_q`, x + 26, 290, q, 34, ink);
  text(`q0_c${i}_t`, x + 26, 345, title, 24, ink);
  text(`q0_c${i}_b`, x + 26, 395, body, 18, muted, { width: 225 });
});
text("q0_answer", 160, 620, "หลักคิดหลัก: Frontend ซ่อน/แสดงเพื่อ UX ได้ แต่ Backend ต้องเป็นคนตัดสินและ enforce สิทธิ์จริง ส่วน Workflow ควร orchestrate approval ไม่ใช่เป็นเจ้าของข้อมูลพนักงาน.", 26, ink, { width: 1180 });

panel("q1", 1650, 80, "Q1: UI Control และ Permission Enforcement", "ปลอดภัยและดูแลง่ายกว่าเมื่อ Backend ส่ง capability/status และ enforce ซ้ำที่ API");
rect("q1_front", 1740, 260, 340, 180, colors.red, "#c92a2a");
text("q1_front_t", 1775, 300, "Frontend-only decision\n(ตัดสินที่ UI อย่างเดียว)", 25, ink);
text("q1_front_b", 1775, 350, "ซ่อนปุ่มได้\nแต่ bypass API ได้\nlogic กระจายหลายหน้า", 18, muted);
rect("q1_back", 2260, 260, 390, 180, colors.green, "#2b8a3e");
text("q1_back_t", 2295, 300, "Backend capability model", 25, ink);
text("q1_back_b", 2295, 350, "API ส่ง canEdit/canApprove\nAPI enforce authorization\nUI แสดงตาม contract", 18, muted);
arrow("q1_a", 2080, 350, 2260, 350, "แนะนำ");
rect("q1_rule", 1780, 570, 800, 150, colors.yellow, "#e67700");
text("q1_rule_t", 1815, 610, "ข้อตกลงของทีม", 26, ink);
text("q1_rule_b", 1815, 660, "UI control = ความสะดวกในการใช้งาน. Backend authorization = source of truth ด้าน security.", 21, ink);

panel("q2", 3220, 80, "Q2: Role ของพนักงานใน Workflow", "Role, position, manager, org unit ควร resolve จาก HR domain service ก่อนส่งเข้า Workflow");
rect("q2_hr", 3310, 250, 300, 150, colors.green, "#2b8a3e");
center("q2_hr_t", 3345, 295, "HR Master Data\nEmployee, position, org", 19);
rect("q2_policy", 3810, 250, 300, 150, colors.yellow, "#e67700");
center("q2_policy_t", 3845, 295, "Policy / DMN\nApprover route", 19);
rect("q2_cam", 4310, 250, 300, 150, colors.purple, "#7048e8");
center("q2_cam_t", 4345, 295, "Camunda\nUser tasks by group", 19);
arrow("q2_a1", 3610, 325, 3810, 325, "attributes");
arrow("q2_a2", 4110, 325, 4310, 325, "route");
rect("q2_no", 3370, 570, 490, 160, colors.red, "#c92a2a");
text("q2_no_t", 3410, 610, "ควรเลี่ยง", 26, ink);
text("q2_no_b", 3410, 660, "อย่าให้ Workflow เป็นเจ้าของ org chart, position hierarchy หรือ employee profile.", 19, muted, { width: 400 });
rect("q2_yes", 3990, 570, 520, 160, colors.green, "#2b8a3e");
text("q2_yes_t", 4030, 610, "แนวทางที่แนะนำ", 26, ink);
text("q2_yes_b", 4030, 660, "Workflow เก็บ approver group/user snapshot เพื่อ audit; HR service ยังเป็น source.", 19, muted, { width: 420 });

panel("q3", 80, 1100, "Q3: Employee Profile API เดียว แต่เห็นข้อมูลต่างกัน", "ทำได้ แต่ต้องออกแบบเป็น policy-based projection ไม่ใช่ให้ client เลือก field เอง");
rect("q3_api", 620, 1260, 300, 130, colors.yellow, "#e67700");
center("q3_api_t", 660, 1300, "Profile API\nPolicy + projection", 20);
const consumers = [
  ["Employee UI", "self view\nmasked salary", 190, 1240, colors.blue],
  ["Manager UI", "team view\nwork info", 190, 1510, colors.purple],
  ["LMS", "learning fields\nno payroll", 1120, 1240, colors.green],
  ["PMS", "performance fields\njob context", 1120, 1510, colors.gray],
];
consumers.forEach(([name, body, x, y, color], i) => {
  rect(`q3_c${i}`, x, y, 300, 140, color, "#495057");
  text(`q3_c${i}_t`, x + 28, y + 28, name, 22, ink);
  text(`q3_c${i}_b`, x + 28, y + 70, body, 17, muted);
  arrow(`q3_a${i}`, x < 620 ? x + 300 : 920, y + 70, x < 620 ? 620 : x, 1325);
});
rect("q3_rule", 300, 1740, 900, 120, colors.green, "#2b8a3e");
text("q3_rule_t", 335, 1780, "Rule: resource เดียวกัน แต่ projection ต่างกันตาม actor + purpose + scope.", 23, ink);

panel("q4", 1650, 1100, "Q4: Boundary ของ Business Logic", "แยกจากคำถามว่า logic นั้นเป็น process orchestration หรือ domain truth");
diamond("q4_d", 1830, 1270, 260, 180, colors.yellow);
center("q4_d_t", 1888, 1330, "เป็น approval\nsequence/state?", 18);
rect("q4_wf", 2230, 1210, 390, 160, colors.purple, "#7048e8");
text("q4_wf_t", 2265, 1250, "อยู่ใน Workflow", 25, ink);
text("q4_wf_b", 2265, 1300, "approval steps\nSLA/escalation\nmanual task state\nprocess audit", 18, muted);
rect("q4_dom", 2230, 1510, 390, 160, colors.green, "#2b8a3e");
text("q4_dom_t", 2265, 1550, "อยู่นอก Workflow", 25, ink);
text("q4_dom_b", 2265, 1600, "leave balance\nsalary rules\nPII masking\norg hierarchy", 18, muted);
arrow("q4_yes", 2090, 1330, 2230, 1290, "ใช่");
arrow("q4_no", 1980, 1450, 2230, 1585, "ไม่ใช่");
rect("q4_rule", 1780, 1740, 880, 120, colors.blue, "#1864ab");
text("q4_rule_t", 1815, 1780, "Workflow เรียก service ให้ทำ domain work; ไม่ควร duplicate domain rules.", 23, ink);

panel("q5", 3220, 1100, "Operating Model เป้าหมาย", "Contract ที่ทีมควรตกลงก่อน implement Workflow replacement");
const lanes = [
  ["Frontend", "Render capability\nไม่ enforce security คนเดียว", colors.blue],
  ["Backend API", "Authorize ทุก action\nส่ง allowed actions + views", colors.green],
  ["HR Domain", "เป็นเจ้าของ employee data\nresolve roles และ positions", colors.yellow],
  ["Workflow", "เป็นเจ้าของ process state\nTasks, SLA, audit, escalation", colors.purple],
  ["Integration", "External tasks\nNotify, LMS/PMS/payroll sync", colors.gray],
];
lanes.forEach(([name, body, color], i) => {
  const y = 1240 + i * 115;
  rect(`q5_l${i}`, 3330, y, 1120, 85, color, "#495057");
  text(`q5_l${i}_n`, 3365, y + 22, name, 22, ink);
  text(`q5_l${i}_b`, 3625, y + 22, body, 18, muted, { width: 700 });
});
text("q5_close", 3330, 1810, "Decision ที่ต้อง align: Backend คือ control plane; Workflow คือ orchestration plane; HR domain คือ data authority.", 22, ink, { width: 1100 });

function scenarioPanel(id, x, y, title, subtitle, rows) {
  panel(id, x, y, title, subtitle);
  const cols = [
    ["Use case", x + 60, 260, colors.blue, "#1864ab"],
    ["ใช้ Camunda", x + 500, 390, colors.purple, "#7048e8"],
    ["ไม่ใช้ Camunda", x + 1020, 340, colors.green, "#2b8a3e"],
  ];
  cols.forEach(([name, cx, w, color, stroke]) => {
    rect(`${id}_${name}_h`, cx, y + 160, w, 72, color, stroke);
    text(`${id}_${name}_ht`, cx + 24, y + 184, name, 22, ink);
  });
  rows.forEach((row, i) => {
    const ry = y + 260 + i * 138;
    rect(`${id}_uc_${i}`, x + 60, ry, 260, 112, colors.white, "#adb5bd");
    text(`${id}_uc_${i}_t`, x + 84, ry + 24, row[0], 18, ink, { width: 210 });
    rect(`${id}_cam_${i}`, x + 500, ry, 390, 112, colors.purple, "#7048e8");
    text(`${id}_cam_${i}_t`, x + 524, ry + 20, row[1], 17, ink, { width: 330 });
    rect(`${id}_out_${i}`, x + 1020, ry, 340, 112, colors.green, "#2b8a3e");
    text(`${id}_out_${i}_t`, x + 1044, ry + 20, row[2], 17, ink, { width: 285 });
    arrow(`${id}_a1_${i}`, x + 320, ry + 56, x + 500, ry + 56);
    arrow(`${id}_a2_${i}`, x + 890, ry + 56, x + 1020, ry + 56);
  });
}

scenarioPanel("s1", 80, 2120, "สถานการณ์ A: UI Permission และ Action Control", "ใช้แยก UX visibility ออกจาก security enforcement", [
  ["ปุ่มแก้ไข Employee profile", "ใช้เฉพาะเมื่อ action ต้องมี approval state, task status หรือ SLA ใน process.", "Backend ส่ง canEdit/canSubmit. API ต้อง reject unauthorized edits."],
  ["ปุ่ม approve / reject", "ใช้. Task ownership, claim, complete และ audit ควรอยู่ใน Workflow.", "UI แค่ render allowedActions จาก Backend."],
  ["ดู salary / bank info", "ไม่ใช้. นี่คือ data access control ไม่ใช่ process orchestration.", "Policy engine / Backend projection mask หรือตัด field ออก."],
  ["Cancel approved leave", "ใช้ถ้า cancellation ต้องขอ approval และมี audit trail.", "Direct cancel ได้เฉพาะกรณี policy อนุญาตให้ reversal ทันที."],
]);

scenarioPanel("s2", 1650, 2120, "สถานการณ์ B: Role, Position และ Approver Routing", "Workflow consume approver ที่ resolve แล้ว; HR domain เป็นเจ้าของ org truth", [
  ["Manager approval route", "ใช้ Workflow สำหรับ task assignment และ approval sequence.", "Manager-of-employee มาจาก HR org service."],
  ["Position / job level rule", "ใช้ DMN เมื่อ rule มีผลต่อ route เช่น level >= M4 ต้องผ่าน HRBP.", "Position hierarchy source อยู่นอก Workflow."],
  ["Temporary delegation", "ใช้ Workflow ถ้า delegation กระทบ active tasks และ audit.", "Delegation source/policy เป็นของ identity หรือ HR service."],
  ["Org restructure", "ไม่ใช้. อย่า remodel org chart ใน BPMN.", "HR master data update; process ใหม่ค่อย resolve approver ใหม่."],
]);

scenarioPanel("s3", 3220, 2120, "สถานการณ์ C: Employee Profile API สำหรับ UI, LMS, PMS", "API เดียว serve หลาย consumer ได้ผ่าน policy-based projection", [
  ["Employee self profile", "ไม่ใช้ ยกเว้น submitted change ต้องเข้า approval.", "Backend ส่ง self projection พร้อม masked sensitive fields."],
  ["Manager team profile", "ไม่ใช้สำหรับ read access. ใช้ Workflow เฉพาะ change approval.", "Projection มี team work info แต่ไม่รวม private fields."],
  ["LMS integration", "ไม่ใช้สำหรับ read sync ยกเว้น sync เป็นส่วนหนึ่งของ onboarding workflow.", "Expose เฉพาะ minimum learning identity fields ตาม integration scope."],
  ["PMS integration", "ไม่ใช้สำหรับ profile read. ใช้ได้กับ performance review workflow.", "Expose job context และ reporting line ตาม PMS contract."],
]);

scenarioPanel("s4", 80, 3140, "สถานการณ์ D: Boundary ของ Business Logic", "ใส่ process logic ใน Camunda; เก็บ business truth ไว้ใน domain services", [
  ["Leave approval sequence", "ใช้. User tasks, escalation, reminders, approval audit.", "Leave balance calculation ยังอยู่ใน leave service."],
  ["Salary eligibility", "ใช้เฉพาะ route approval จาก compensation decision.", "Salary rules, limits และ calculations อยู่ใน comp service."],
  ["Document verification", "ใช้ external task เพื่อ request/check verification step.", "Document storage, virus scan, PII rules อยู่นอก Workflow."],
  ["Employee record update", "ใช้ external task เพื่อ trigger update หลัง approval.", "HR service validate และ commit final data."],
]);

scenarioPanel("s5", 1650, 3140, "สถานการณ์ E: Module สำหรับแทน SuccessFactors", "ใช้ Camunda เป็นราย module เฉพาะจุดที่มี durable process state", [
  ["Hire / onboarding", "ใช้. Multi-step checklist ข้าม HR, manager, IT, payroll.", "Employee master record เป็นของ HR domain."],
  ["Transfer / promotion", "ใช้. Multi-approver lifecycle action พร้อม audit.", "Job data validation และ effective dating อยู่นอก Workflow."],
  ["Benefits claim", "ใช้ถ้ามี review/approval/document workflow.", "Eligibility และ benefit balances อยู่ใน benefits service."],
  ["Reporting dashboard", "ไม่ใช้. Workflow ส่ง status ได้ แต่ไม่ใช่ analytics truth.", "ใช้ reporting/warehouse layer."],
]);

scenarioPanel("s6", 3220, 3140, "Team Decision Matrix", "Rule แบบใช้งานจริงเพื่อไม่ overuse Camunda", [
  ["Long-running human approval", "ใช้ Camunda.", "อย่าทำเป็น status flags กระจายหลาย service."],
  ["Single synchronous validation", "ส่วนใหญ่ไม่ใช้.", "ใช้ backend service validation."],
  ["ต้องมี SLA / escalation / audit", "ใช้ Camunda.", "Backend ยังต้อง enforce authorization."],
  ["Sensitive data access", "ไม่ใช้.", "ใช้ policy-based API projection และ masking."],
]);

const file = {
  type: "excalidraw",
  version: 2,
  source: "https://excalidraw.com",
  elements,
  appState: { gridSize: null, viewBackgroundColor: "#ffffff", currentItemFontFamily: fontFamily },
  files: {},
};
writeFileSync(outExcalidraw, `${JSON.stringify(file, null, 2)}\n`);

const scenarioSvg = [
  ["สถานการณ์ A: UI Permission และ Action Control", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "ปุ่ม approve/reject, cancel approved leave", "Task assignment, claim, complete, SLA, audit", "Backend capabilities enforce security"],
  ["สถานการณ์ B: Role, Position และ Approver Routing", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "Manager approval, delegation, level rule", "Approval sequence และ approver snapshot", "HR org service เป็นเจ้าของ role/position truth"],
  ["สถานการณ์ C: Employee Profile API", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "Employee UI, manager UI, LMS, PMS", "ใช้เฉพาะเมื่อ profile change เข้า approval", "Policy projection คุม visible fields"],
  ["สถานการณ์ D: Boundary ของ Business Logic", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "Leave approval, salary change, document review", "Process state, SLA, external task trigger", "Domain service เป็นเจ้าของ validation และ final write"],
  ["สถานการณ์ E: Module แทน SuccessFactors", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "Hire, transfer, benefits claim, offboarding", "Durable workflow ข้ามหลายทีม", "Master data และ reporting อยู่ใน HR platform"],
  ["Team Decision Matrix", "Use case", "ใช้ Camunda", "ไม่ใช้ Camunda", "Long-running approval หรือ escalation", "ใช่: workflow orchestration plane", "ไม่ใช่: synchronous validation หรือ data masking"],
];

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1800" viewBox="0 0 4800 5200">
<rect width="4800" height="5200" fill="#fff"/>
<style>
text{font-family:Inter,Arial,sans-serif;fill:#1e1e1e}.muted{fill:#5f6368}.title{font-size:54px;font-weight:700}.h{font-size:34px;font-weight:700}.b{font-size:24px}.s{font-size:20px}.panel{fill:#f8f9fa;stroke:#dee2e6;stroke-width:3}.box{stroke:#495057;stroke-width:3}.a{stroke:#495057;stroke-width:5;marker-end:url(#a);fill:none}
</style>
<defs><marker id="a" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path d="M2,2 L10,6 L2,10" fill="none" stroke="#495057" stroke-width="2"/></marker></defs>
<text x="120" y="90" class="title">แนวทางกำกับ Workflow HR: Q1-Q4</text>
<text x="120" y="135" class="b muted">เอกสารคุยกับทีมเรื่อง UI control, Workflow roles, API exposure และ business logic boundaries.</text>
<rect x="120" y="220" width="1450" height="760" class="panel"/><text x="170" y="290" class="h">Q1 UI Control</text>
<rect x="210" y="390" width="430" height="180" fill="#ffc9c9" class="box"/><text x="250" y="455" class="b">Frontend-only</text><text x="250" y="500" class="s muted">ใช้กับ UX เท่านั้น ไม่ใช่ security</text>
<rect x="840" y="390" width="500" height="180" fill="#b2f2bb" class="box"/><text x="880" y="455" class="b">Backend capability model</text><text x="880" y="500" class="s muted">ปลอดภัยกว่า และ govern ง่ายกว่า</text><path d="M640 480 H840" class="a"/>
<text x="210" y="700" class="b">คำตอบ: Frontend ซ่อนปุ่มได้ แต่ Backend ต้องส่ง capability และ enforce ทุก action.</text>
<rect x="1690" y="220" width="1450" height="760" class="panel"/><text x="1740" y="290" class="h">Q2 Workflow Role Setup</text>
<rect x="1790" y="410" width="330" height="140" fill="#b2f2bb" class="box"/><text x="1830" y="475" class="b">HR Master Data</text>
<rect x="2280" y="410" width="330" height="140" fill="#ffec99" class="box"/><text x="2320" y="475" class="b">DMN / Policy</text>
<rect x="2770" y="410" width="300" height="140" fill="#d0bfff" class="box"/><text x="2810" y="475" class="b">Camunda Task</text>
<path d="M2120 480 H2280 M2610 480 H2770" class="a"/><text x="1790" y="700" class="b">คำตอบ: resolve role/position นอก Workflow; ส่ง approver snapshot เข้า Workflow เพื่อ audit.</text>
<rect x="3260" y="220" width="1450" height="760" class="panel"/><text x="3310" y="290" class="h">Q3 API สำหรับหลาย consumer</text>
<rect x="3810" y="430" width="360" height="150" fill="#ffec99" class="box"/><text x="3860" y="500" class="b">Profile API</text><text x="3860" y="535" class="s muted">Policy + projection</text>
<rect x="3370" y="380" width="270" height="120" fill="#a5d8ff" class="box"/><text x="3410" y="450" class="s">Employee UI</text>
<rect x="3370" y="600" width="270" height="120" fill="#d0bfff" class="box"/><text x="3410" y="670" class="s">Manager UI</text>
<rect x="4350" y="380" width="270" height="120" fill="#b2f2bb" class="box"/><text x="4410" y="450" class="s">LMS</text>
<rect x="4350" y="600" width="270" height="120" fill="#e9ecef" class="box"/><text x="4410" y="670" class="s">PMS</text>
<text x="3370" y="820" class="b">คำตอบ: API เดียว serve projection ต่างกันได้ตาม actor, purpose และ scope.</text>
<rect x="120" y="1100" width="1450" height="760" class="panel"/><text x="170" y="1170" class="h">Q4 Logic Boundary</text>
<polygon points="420,1450 560,1340 700,1450 560,1560" fill="#ffec99" stroke="#e67700" stroke-width="3"/><text x="500" y="1445" class="s">Process?</text>
<rect x="900" y="1290" width="420" height="160" fill="#d0bfff" class="box"/><text x="950" y="1360" class="b">Workflow</text><text x="950" y="1400" class="s muted">approval, SLA, task state</text>
<rect x="900" y="1580" width="420" height="160" fill="#b2f2bb" class="box"/><text x="950" y="1650" class="b">Domain Service</text><text x="950" y="1690" class="s muted">data truth, validation, masking</text>
<path d="M700 1430 L900 1370 M640 1560 L900 1660" class="a"/><text x="170" y="1810" class="b">คำตอบ: Workflow orchestrate; domain services เป็นเจ้าของ business truth.</text>
<rect x="1690" y="1100" width="1450" height="760" class="panel"/><text x="1740" y="1170" class="h">Operating Model เป้าหมาย</text>
${lanes.map(([name, body, color], i) => `<rect x="1810" y="${1280 + i * 105}" width="1080" height="78" fill="${color}" class="box"/><text x="1850" y="${1330 + i * 105}" class="s">${name}</text><text x="2150" y="${1330 + i * 105}" class="s muted">${body.replace("\n", " / ")}</text>`).join("")}
${scenarioSvg.map((row, i) => {
  const col = i % 3;
  const pageRow = Math.floor(i / 3);
  const x = 120 + col * 1570;
  const y = 2100 + pageRow * 1020;
  return `<rect x="${x}" y="${y}" width="1450" height="850" class="panel"/>
<text x="${x + 50}" y="${y + 70}" class="h">${row[0]}</text>
<rect x="${x + 60}" y="${y + 160}" width="330" height="72" fill="#a5d8ff" class="box"/><text x="${x + 90}" y="${y + 207}" class="s">${row[1]}</text>
<rect x="${x + 500}" y="${y + 160}" width="390" height="72" fill="#d0bfff" class="box"/><text x="${x + 530}" y="${y + 207}" class="s">${row[2]}</text>
<rect x="${x + 1000}" y="${y + 160}" width="360" height="72" fill="#b2f2bb" class="box"/><text x="${x + 1030}" y="${y + 207}" class="s">${row[3]}</text>
<rect x="${x + 60}" y="${y + 290}" width="330" height="180" fill="#ffffff" class="box"/><text x="${x + 90}" y="${y + 350}" class="s">${row[4]}</text>
<rect x="${x + 500}" y="${y + 290}" width="390" height="180" fill="#d0bfff" class="box"/><text x="${x + 530}" y="${y + 350}" class="s">${row[5]}</text>
<rect x="${x + 1000}" y="${y + 290}" width="360" height="180" fill="#b2f2bb" class="box"/><text x="${x + 1030}" y="${y + 350}" class="s">${row[6]}</text>
<text x="${x + 60}" y="${y + 620}" class="b">Decision format: ใช้ Camunda เฉพาะจุดที่มี workflow state, approval, SLA, escalation หรือ audit.</text>`;
}).join("\n")}
</svg>`;
writeFileSync(outSvg, svg);
console.log(outExcalidraw);
console.log(outSvg);

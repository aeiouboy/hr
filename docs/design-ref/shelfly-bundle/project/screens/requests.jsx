// RequestsScreen.jsx (Thai) — central hub for all form requests
function RequestsScreen({ onNav }) {
  const Ic = window.I;
  const [view, setView] = React.useState("list"); // "list" | "detail" | "compose"
  const [selectedId, setSelectedId] = React.useState("REQ-2481");
  const [composeType, setComposeType] = React.useState(null);
  const [tab, setTab] = React.useState("mine"); // "catalog" | "mine" | "approvals"

  // Form catalog — all request types a retail HR system would need
  const CATALOG = [
    { id: "leave",       t: "ขอลางาน",                sub: "ลาพักร้อน · ลาป่วย · ลากิจ · ลาคลอด",           icon: "calendar", c: "var(--accent)",  sla: "2 วันทำการ" },
    { id: "claim",       t: "เบิกค่าใช้จ่าย",         sub: "ค่ารักษาพยาบาล · ทันตกรรม · น้ำมัน · โทรศัพท์", icon: "heart",    c: "var(--coral)",   sla: "5 วันทำการ" },
    { id: "ot",          t: "ขอทำโอที",               sub: "ทำงานล่วงเวลา · ค่าล่วงเวลาวันหยุด",             icon: "shield",   c: "var(--butter)",  sla: "1 วันทำการ" },
    { id: "cert-emp",    t: "หนังสือรับรองการทำงาน",  sub: "ออกโดยฝ่ายบุคคล · ลงนามโดยผู้จัดการ",            icon: "doc",      c: "var(--sage)",    sla: "3 วันทำการ" },
    { id: "cert-salary", t: "หนังสือรับรองเงินเดือน", sub: "สำหรับยื่นกู้ · ทำวีซ่า · เปิดบัญชี",            icon: "doc",      c: "var(--sage)",    sla: "3 วันทำการ" },
    { id: "shift",       t: "ขอเปลี่ยนกะ / สลับเวร",  sub: "สลับกับเพื่อนร่วมทีม · ปรับเวลาเข้า-ออก",        icon: "clock",    c: "var(--accent)",  sla: "24 ชั่วโมง" },
    { id: "travel",      t: "เดินทางเพื่อธุรกิจ",     sub: "จองที่พัก · ตั๋วเดินทาง · เบี้ยเลี้ยง",          icon: "globe",    c: "var(--plum)",    sla: "5 วันทำการ" },
    { id: "training",    t: "ขออบรม / สัมมนา",        sub: "หลักสูตรภายใน · คอร์สภายนอก · สัมมนา",          icon: "book",     c: "var(--sage)",    sla: "7 วันทำการ" },
    { id: "asset",       t: "เบิกอุปกรณ์",            sub: "เครื่องแบบ · อุปกรณ์ไอที · รองเท้ากันลื่น",      icon: "plug",     c: "var(--butter)",  sla: "3 วันทำการ" },
    { id: "info",        t: "แก้ไขข้อมูลส่วนตัว",      sub: "ที่อยู่ · เลขบัญชีธนาคาร · ผู้อุปการะ",          icon: "people",   c: "var(--accent)",  sla: "1 วันทำการ" },
    { id: "transfer",    t: "ขอโอนย้ายสาขา",          sub: "ย้ายสาขา · เปลี่ยนตำแหน่ง · ปรับโครงสร้าง",     icon: "arrow",    c: "var(--coral)",   sla: "14 วันทำการ" },
    { id: "resign",      t: "ลาออก",                  sub: "แจ้งลาออก · สัมภาษณ์ออก · คืนอุปกรณ์",           icon: "shield",   c: "var(--ink-3)",   sla: "30 วัน" },
  ];

  // My submitted requests
  const MINE = [
    { id: "REQ-2481", t: "เบิกค่าใช้จ่าย", sub: "ค่ารักษาพยาบาล · รพ.บำรุงราษฎร์ · ฿4,820", d: "15 เม.ย. 2568", s: "pending", step: 2 },
    { id: "REQ-2475", t: "ขอลางาน",         sub: "ลาพักร้อน · 24–26 เม.ย. (3 วัน)",        d: "12 เม.ย. 2568", s: "approved", step: 3 },
    { id: "REQ-2460", t: "ขอทำโอที",        sub: "เสาร์ที่ 19 เม.ย. · 4 ชั่วโมง",             d: "10 เม.ย. 2568", s: "approved", step: 3 },
    { id: "REQ-2442", t: "หนังสือรับรองเงินเดือน", sub: "สำหรับยื่นกู้ธนาคารกสิกร",       d: "5 เม.ย. 2568",  s: "info",     step: 1 },
    { id: "REQ-2418", t: "เบิกอุปกรณ์",     sub: "รองเท้ากันลื่น ไซส์ 38 × 1 คู่",             d: "28 มี.ค. 2568", s: "approved", step: 3 },
    { id: "REQ-2401", t: "ขอเปลี่ยนกะ",     sub: "สลับกะกับ เบน คิม · 22 มี.ค.",               d: "20 มี.ค. 2568", s: "rejected", step: 2 },
  ];

  // Pending approvals for manager
  const APPROVALS = [
    { id: "REQ-2490", who: "เบน คิม",       role: "พนักงานคลัง · กะเช้า",   t: "ขอลางาน",   sub: "ลาป่วย 2 วัน · 21–22 เม.ย.",          d: "วันนี้ 09:12",    urgent: true },
    { id: "REQ-2489", who: "ไมล์ส จอง",     role: "พนักงานขาย · กะบ่าย",   t: "ขอทำโอที",  sub: "ศุกร์ 25 เม.ย. · 3 ชั่วโมง",            d: "วันนี้ 08:40",    urgent: false },
    { id: "REQ-2488", who: "ทารา ซัลลิแวน", role: "หัวหน้ากะ",            t: "เบิกค่าใช้จ่าย", sub: "ค่าน้ำมัน เม.ย. · 230 กม. · ฿1,280", d: "เมื่อวาน 16:22", urgent: false },
    { id: "REQ-2487", who: "เบน คิม",       role: "พนักงานคลัง · กะเช้า",   t: "ขอเปลี่ยนกะ", sub: "สลับกะกับ มายา พาเทล · 24 เม.ย.",   d: "เมื่อวาน 14:05", urgent: false },
    { id: "REQ-2486", who: "มายา พาเทล",    role: "แคชเชียร์ · กะบ่าย",    t: "ขออบรม",    sub: "คอร์ส Excel ขั้นกลาง · ฿3,500",         d: "2 วันที่แล้ว",  urgent: false },
  ];

  const STATUS = {
    pending:  { tag: "butter", label: "รออนุมัติ" },
    approved: { tag: "sage",   label: "อนุมัติแล้ว" },
    rejected: { tag: "coral",  label: "ไม่อนุมัติ" },
    info:     { tag: "accent", label: "ขอข้อมูลเพิ่ม" },
  };

  const current = MINE.find(r => r.id === selectedId) || MINE[0];

  if (view === "detail") return <RequestDetail request={current} onBack={() => setView("list")} Ic={Ic}/>;
  if (view === "compose") return <RequestCompose type={composeType} catalog={CATALOG} onBack={() => setView("list")} onPick={(t) => setComposeType(t)} Ic={Ic}/>;

  return (
    <>
      <window.Topbar
        title="คำร้องและแบบฟอร์ม"
        subtitle="ส่งคำขอ ติดตามสถานะ และอนุมัติคำร้อง"
        onNav={onNav}
        actions={<button className="btn btn-primary" onClick={() => { setComposeType(null); setView("compose"); }}><Ic.plus size={14}/> สร้างคำร้องใหม่</button>}
      />

      <div className="tabs" style={{marginBottom: 20}}>
        {[["mine","คำร้องของฉัน",MINE.length],["catalog","แบบฟอร์มทั้งหมด",CATALOG.length],["approvals","รออนุมัติ",APPROVALS.length]].map(([k,l,n]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>
            {l}<span style={{marginLeft: 6, color:"var(--ink-3)", fontWeight: 400}}>{n}</span>
          </div>
        ))}
      </div>

      {tab === "mine" && (
        <>
          <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20}}>
            {[
              {l:"ส่งทั้งหมดปีนี้", n: 23, c:"var(--accent)"},
              {l:"รออนุมัติ",       n: 1,  c:"var(--butter)"},
              {l:"อนุมัติแล้ว",     n: 18, c:"var(--sage)"},
              {l:"ไม่อนุมัติ",      n: 4,  c:"var(--coral)"},
            ].map(s => (
              <div key={s.l} className="card tight" style={{borderLeft:`4px solid ${s.c}`}}>
                <div className="eyebrow">{s.l}</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 4, letterSpacing:"-0.02em"}}>{s.n}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="row" style={{marginBottom: 12}}>
              <h3>คำร้องของฉัน</h3>
              <div className="spacer"/>
              <div className="search" style={{maxWidth: 240}}>
                <Ic.search size={14}/><span>ค้นหารหัสหรือหัวข้อ…</span>
              </div>
            </div>
            <div className="list">
              {MINE.map(r => {
                const st = STATUS[r.s];
                return (
                  <div key={r.id} className="row-item" style={{cursor:"pointer"}} onClick={() => { setSelectedId(r.id); setView("detail"); }}>
                    <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <Ic.doc size={18}/>
                    </div>
                    <div>
                      <div style={{fontWeight: 600, fontSize: 14}}>{r.t} · <span style={{color:"var(--ink-3)", fontWeight: 400, fontSize: 12}}>{r.id}</span></div>
                      <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.sub} · ส่ง {r.d}</div>
                    </div>
                    <div className="row" style={{gap: 10}}>
                      <span className={"tag " + st.tag}>{st.label}</span>
                      <Ic.arrow size={14}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {tab === "catalog" && (
        <>
          <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 80%)", border: 0, padding: 24, marginBottom: 20, overflow:"hidden", position:"relative"}}>
            <div className="blob teal" style={{width: 120, height: 150, right: -20, top: -30, opacity: .55}}/>
            <div className="eyebrow">แบบฟอร์มคำร้องทั้งหมด · {CATALOG.length} ประเภท</div>
            <h1 style={{fontSize: 30, marginTop: 10, maxWidth: 560}}>เลือกแบบฟอร์มที่คุณต้องการยื่น</h1>
            <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 8, maxWidth: 520, lineHeight: 1.6}}>
              คำร้องทุกประเภทจะถูกส่งต่อไปยังผู้มีอำนาจอนุมัติโดยอัตโนมัติ คุณสามารถติดตามสถานะได้จากแท็บ "คำร้องของฉัน"
            </p>
          </div>

          <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 16}}>
            {CATALOG.map(f => {
              const Glyph = Ic[f.icon] || Ic.doc;
              return (
                <div key={f.id} className="card" style={{cursor:"pointer", transition:"transform .15s"}}
                     onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                     onMouseLeave={e => e.currentTarget.style.transform=""}>
                  <div className="row" style={{alignItems:"flex-start"}}>
                    <div style={{width: 44, height: 44, borderRadius: 12, background: f.c, opacity: .15, position:"absolute"}}/>
                    <div style={{width: 44, height: 44, borderRadius: 12, display:"flex", alignItems:"center", justifyContent:"center", color: f.c, position:"relative"}}>
                      <Glyph size={22}/>
                    </div>
                    <div className="spacer"/>
                    <span className="tag" style={{background:"var(--cream-2)", color:"var(--ink-3)"}}>SLA {f.sla}</span>
                  </div>
                  <h3 style={{marginTop: 14, fontSize: 17}}>{f.t}</h3>
                  <p style={{color:"var(--ink-2)", fontSize: 13, marginTop: 6, lineHeight: 1.55}}>{f.sub}</p>
                  <button className="btn btn-ghost" style={{marginTop: 14, width:"100%"}} onClick={() => { setComposeType(f); setView("compose"); }}>เริ่มกรอก <Ic.arrow size={13}/></button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab === "approvals" && (
        <div className="card">
          <div className="row" style={{marginBottom: 12}}>
            <div>
              <div className="eyebrow">ในฐานะ ผู้จัดการร้าน · สาขาฮัมเบอร์</div>
              <h3 style={{marginTop: 6}}>คำร้องที่รออนุมัติ</h3>
            </div>
            <div className="spacer"/>
            <button className="btn btn-ghost"><Ic.download size={14}/> ส่งออก CSV</button>
          </div>
          <div className="list">
            {APPROVALS.map(r => (
              <div key={r.id} className="row-item">
                <div className="avatar coral" style={{width: 36, height: 36, fontSize: 12}}>{r.who.slice(0,2)}</div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>
                    {r.who} · <span style={{color:"var(--ink-3)", fontWeight: 400}}>{r.t}</span>
                    {r.urgent && <span className="tag coral" style={{marginLeft: 8, fontSize: 10}}>ด่วน</span>}
                  </div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.role} · {r.sub} · {r.d}</div>
                </div>
                <div className="row" style={{gap: 8}}>
                  <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}} onClick={() => { setSelectedId("REQ-2481"); setView("detail"); }}>รายละเอียด</button>
                  <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13, color:"var(--coral)"}}>ปฏิเสธ</button>
                  <button className="btn btn-primary" style={{padding:"7px 14px", fontSize: 13}}>อนุมัติ</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Sample detail view with approval chain
function RequestDetail({ request, onBack, Ic }) {
  const chain = [
    { who: "อวา เรเยส",   role: "ผู้ยื่น · ผู้จัดการร้าน สาขาฮัมเบอร์", ini: "AR", tag: "coral",  d: "15 เม.ย. 2568 · 10:24", s: "submitted", label: "ยื่นคำร้อง", note: "แนบใบเสร็จ RX-3381 และสรุปผลการรักษา" },
    { who: "เดวิด โอเว่น", role: "ผู้อนุมัติขั้นที่ 1 · ผู้จัดการภาค",   ini: "DO", tag: "sage",   d: "15 เม.ย. 2568 · 14:02", s: "approved",  label: "อนุมัติแล้ว", note: "ตรวจสอบเอกสารครบถ้วน" },
    { who: "ฝ่ายการเงิน", role: "ผู้อนุมัติขั้นที่ 2 · แผนกบัญชี",      ini: "FN", tag: "butter", d: "รอดำเนินการ",            s: "pending",   label: "กำลังตรวจสอบ", note: "คาดว่าจะเสร็จภายใน 2 วันทำการ" },
    { who: "ฝ่ายบุคคล",   role: "ผู้จ่ายเงิน · HR Payroll",              ini: "HR", tag: "accent", d: "—",                       s: "waiting",   label: "รอคิว",       note: "โอนเงินพร้อมรอบเงินเดือนถัดไป" },
  ];

  return (
    <>
      <div className="row" style={{marginBottom: 16, gap: 10}}>
        <button className="btn btn-ghost" onClick={onBack} style={{padding:"8px 12px"}}>
          <Ic.arrow size={14} style={{transform:"rotate(180deg)"}}/> กลับ
        </button>
        <div className="eyebrow">คำร้อง / {request.id}</div>
      </div>

      <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 85%)", border: 0, padding: 26, marginBottom: 20, position:"relative", overflow:"hidden"}}>
        <div className="blob butter" style={{width: 100, height: 120, right: -10, top: -20, opacity: .6}}/>
        <div className="eyebrow">{request.t} · {request.id}</div>
        <h1 style={{fontSize: 30, marginTop: 8, maxWidth: 620}}>{request.sub}</h1>
        <div className="row" style={{marginTop: 14, gap: 12, flexWrap:"wrap"}}>
          <span className="tag butter">รออนุมัติ · ขั้นที่ 2/3</span>
          <span style={{fontSize: 13, color:"var(--ink-2)"}}>ส่งเมื่อ {request.d}</span>
          <span style={{fontSize: 13, color:"var(--ink-2)"}}>· คาดว่าแล้วเสร็จ 22 เม.ย. 2568</span>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns: "1.6fr 1fr", gap: 20}}>
        <div className="card">
          <h3 style={{marginBottom: 16}}>สายอนุมัติ</h3>
          <div style={{position:"relative"}}>
            {chain.map((step, i) => {
              const done = step.s === "submitted" || step.s === "approved";
              const active = step.s === "pending";
              const color = done ? "var(--sage)" : active ? "var(--butter)" : "var(--line-2)";
              return (
                <div key={i} style={{display:"flex", gap: 14, paddingBottom: i === chain.length-1 ? 0 : 22, position:"relative"}}>
                  {i < chain.length-1 && <div style={{position:"absolute", left: 17, top: 36, bottom: 0, width: 2, background: done ? "var(--sage)" : "var(--line-2)"}}/>}
                  <div style={{width: 36, height: 36, borderRadius: "50%", background: color, display:"flex", alignItems:"center", justifyContent:"center", color: "#fff", flexShrink: 0, fontSize: 14, fontWeight: 600, border: "3px solid var(--cream)"}}>
                    {done ? <Ic.check size={16}/> : active ? <span style={{width: 8, height: 8, background:"#fff", borderRadius:"50%"}}/> : i+1}
                  </div>
                  <div style={{flex: 1, paddingTop: 4}}>
                    <div className="row">
                      <div style={{fontWeight: 600, fontSize: 14}}>{step.label}</div>
                      <span className="spacer"/>
                      <span className={"tag " + step.tag} style={{fontSize: 11}}>{step.d}</span>
                    </div>
                    <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 4}}>
                      <span className={"avatar " + step.tag} style={{width: 20, height: 20, fontSize: 10, display:"inline-flex", marginRight: 6, verticalAlign:"middle"}}>{step.ini}</span>
                      {step.who} · <span style={{color:"var(--ink-3)"}}>{step.role}</span>
                    </div>
                    {step.note && <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 6, padding: "8px 12px", background:"var(--cream-2)", borderRadius: 8, borderLeft:"2px solid var(--line)"}}>{step.note}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col" style={{gap: 16}}>
          <div className="card">
            <h3 style={{marginBottom: 14, fontSize: 15}}>รายละเอียดคำร้อง</h3>
            <div className="col" style={{gap: 10, fontSize: 13}}>
              {[
                ["ประเภท",       "ค่ารักษาพยาบาล"],
                ["วันที่รักษา",  "12 เม.ย. 2568"],
                ["สถานพยาบาล", "รพ.บำรุงราษฎร์"],
                ["เลขใบเสร็จ",  "RX-3381"],
                ["ยอดที่เบิก",  "฿4,820"],
                ["วงเงินคงเหลือ", "฿25,600 / ฿38,000"],
              ].map(([k, v]) => (
                <div key={k} className="row" style={{padding:"6px 0", borderBottom:"1px solid var(--line-2)"}}>
                  <div style={{color:"var(--ink-3)"}}>{k}</div>
                  <span className="spacer"/>
                  <div style={{fontWeight: 600}}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{marginBottom: 12, fontSize: 15}}>เอกสารแนบ</h3>
            <div className="col" style={{gap: 8}}>
              {[
                {n:"ใบเสร็จ_RX-3381.pdf", s:"142 KB"},
                {n:"สรุปการรักษา.pdf",   s:"88 KB"},
              ].map(d => (
                <div key={d.n} className="row" style={{padding: 10, border:"1px solid var(--line)", borderRadius: 10}}>
                  <div style={{width: 28, height: 36, borderRadius: 4, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Ic.doc size={14}/>
                  </div>
                  <div>
                    <div style={{fontSize: 13, fontWeight: 600}}>{d.n}</div>
                    <div style={{fontSize: 11, color:"var(--ink-3)"}}>{d.s}</div>
                  </div>
                  <span className="spacer"/>
                  <button className="btn btn-ghost" style={{padding:"5px 10px", fontSize: 12}}><Ic.download size={12}/></button>
                </div>
              ))}
            </div>
          </div>

          <div className="col" style={{gap: 8}}>
            <button className="btn btn-primary" style={{width:"100%"}}>ส่งข้อความถึงผู้อนุมัติ</button>
            <button className="btn btn-ghost" style={{width:"100%", color:"var(--coral)"}}>ยกเลิกคำร้อง</button>
          </div>
        </div>
      </div>
    </>
  );
}

// Compose / fill-form view — picker + dynamic form based on request type
function RequestCompose({ type, catalog, onBack, onPick, Ic }) {
  const [submitted, setSubmitted] = React.useState(false);

  // Field schemas per form type
  const SCHEMAS = {
    leave: {
      title: "ขอลางาน", icon: "calendar", c: "var(--accent)",
      fields: [
        { k:"kind",    l:"ประเภทการลา",      t:"select", opts:["ลาพักร้อน","ลาป่วย","ลากิจ","ลาคลอด","ลาบวช"] },
        { k:"from",    l:"วันที่เริ่ม",       t:"date",   ph:"24 เม.ย. 2568" },
        { k:"to",      l:"วันที่สิ้นสุด",     t:"date",   ph:"26 เม.ย. 2568" },
        { k:"days",    l:"จำนวนวัน",         t:"text",   ph:"3 วันทำการ",   readonly: true },
        { k:"cover",   l:"ผู้ทดแทนกะ",       t:"select", opts:["มาร์คัส เคลลี่","พริยะ ชาห์","เทย์เลอร์ ซิมส์","ยังไม่กำหนด"] },
        { k:"reason",  l:"เหตุผล / หมายเหตุ", t:"textarea", ph:"เช่น พาครอบครัวเที่ยวต่างจังหวัด…" },
        { k:"file",    l:"เอกสารประกอบ",     t:"file",   ph:"แนบใบรับรองแพทย์ (ถ้ามี)" },
      ],
      balance: [["ลาพักร้อนคงเหลือ","12 วัน"],["ลาป่วยคงเหลือ","28 วัน"],["ลากิจคงเหลือ","5 วัน"]],
    },
    claim: {
      title: "เบิกค่าใช้จ่าย", icon: "heart", c: "var(--coral)",
      fields: [
        { k:"cat",     l:"หมวดการเบิก",      t:"select", opts:["ค่ารักษาพยาบาล","ค่าทันตกรรม","ค่าน้ำมันรถ","ค่าโทรศัพท์","ค่าสายตา"] },
        { k:"date",    l:"วันที่เกิดค่าใช้จ่าย", t:"date", ph:"12 เม.ย. 2568" },
        { k:"vendor",  l:"สถานพยาบาล / ผู้ขาย", t:"text", ph:"รพ.บำรุงราษฎร์" },
        { k:"amount",  l:"จำนวนเงิน (บาท)",  t:"text",   ph:"4,820" },
        { k:"receipt", l:"เลขใบเสร็จ",       t:"text",   ph:"RX-3381" },
        { k:"note",    l:"รายละเอียดเพิ่มเติม", t:"textarea", ph:"ระบุประเภทการรักษา / ชื่อยา / อื่น ๆ" },
        { k:"file",    l:"แนบใบเสร็จ *",     t:"file",   ph:"ลากไฟล์มาวาง หรือเลือกไฟล์" },
      ],
      balance: [["วงเงินรักษาพยาบาล","฿25,600 / ฿38,000"],["วงเงินทันตกรรม","฿2,000 / ฿2,000"],["โควตาน้ำมัน","฿8,000 / ฿10,000"]],
    },
    ot: {
      title: "ขอทำโอที", icon: "shield", c: "var(--butter)",
      fields: [
        { k:"date",    l:"วันที่",            t:"date",   ph:"25 เม.ย. 2568" },
        { k:"from",    l:"เวลาเริ่ม",         t:"text",   ph:"18:00" },
        { k:"to",      l:"เวลาสิ้นสุด",       t:"text",   ph:"21:00" },
        { k:"hours",   l:"ชั่วโมงรวม",        t:"text",   ph:"3 ชั่วโมง", readonly:true },
        { k:"type",    l:"ประเภทโอที",        t:"select", opts:["วันทำงานปกติ (×1.5)","วันหยุด (×2.0)","วันนักขัตฤกษ์ (×3.0)"] },
        { k:"reason",  l:"เหตุผล",            t:"textarea", ph:"ช่วยทีมเตรียมตรวจนับสินค้าไตรมาส 2" },
      ],
      balance: [["โอทีเดือนนี้","8 ชั่วโมง"],["โอทีสะสมปีนี้","42 ชั่วโมง"]],
    },
    "cert-emp": {
      title: "หนังสือรับรองการทำงาน", icon: "doc", c: "var(--sage)",
      fields: [
        { k:"lang",    l:"ภาษา",              t:"select", opts:["ไทย","อังกฤษ","ไทย + อังกฤษ"] },
        { k:"purpose", l:"วัตถุประสงค์",      t:"select", opts:["ยื่นวีซ่า","ยื่นสินเชื่อ","สมัครงานที่อื่น","อื่น ๆ"] },
        { k:"address", l:"ที่อยู่ที่ต้องการให้ระบุ", t:"text", ph:"ปัจจุบันตามบัตรประชาชน" },
        { k:"count",   l:"จำนวนชุด",          t:"text",   ph:"2 ชุด" },
        { k:"pickup",  l:"การรับเอกสาร",      t:"select", opts:["รับที่สำนักงานใหญ่","จัดส่งอีเมล (PDF)","จัดส่งไปรษณีย์"] },
        { k:"note",    l:"หมายเหตุ",          t:"textarea", ph:"ระบุเพิ่มเติมหากต้องการ" },
      ],
      balance: [["ประมาณการเสร็จ","3 วันทำการ"],["ลงนามโดย","ฝ่ายบุคคล + ผู้จัดการร้าน"]],
    },
    "cert-salary": {
      title: "หนังสือรับรองเงินเดือน", icon: "doc", c: "var(--sage)",
      fields: [
        { k:"purpose", l:"วัตถุประสงค์",      t:"select", opts:["ยื่นกู้ธนาคาร","ทำวีซ่า","เปิดบัญชี","อื่น ๆ"] },
        { k:"bank",    l:"ชื่อธนาคาร / หน่วยงาน", t:"text", ph:"ธนาคารกสิกรไทย" },
        { k:"show",    l:"ข้อมูลที่ให้ระบุ",   t:"select", opts:["เงินเดือนปัจจุบัน","ย้อนหลัง 3 เดือน","ย้อนหลัง 6 เดือน","ย้อนหลัง 12 เดือน"] },
        { k:"count",   l:"จำนวนชุด",          t:"text",   ph:"1 ชุด" },
        { k:"pickup",  l:"การรับเอกสาร",      t:"select", opts:["จัดส่งอีเมล (PDF)","รับที่สาขา","จัดส่งไปรษณีย์"] },
      ],
      balance: [["ประมาณการเสร็จ","3 วันทำการ"]],
    },
    shift: {
      title: "ขอเปลี่ยนกะ / สลับเวร", icon: "clock", c: "var(--accent)",
      fields: [
        { k:"date",    l:"วันที่ที่ต้องการเปลี่ยน", t:"date", ph:"24 เม.ย. 2568" },
        { k:"my",      l:"กะเดิมของฉัน",      t:"select", opts:["กะเช้า 07:00–15:00","กะบ่าย 15:00–23:00","กะดึก 23:00–07:00"] },
        { k:"swap",    l:"สลับกับ",           t:"select", opts:["เบน คิม","มายา พาเทล","ทารา ซัลลิแวน","ไมล์ส จอง"] },
        { k:"new",     l:"กะใหม่",            t:"select", opts:["กะเช้า","กะบ่าย","กะดึก"] },
        { k:"reason",  l:"เหตุผล",            t:"textarea", ph:"มีนัดแพทย์ช่วงเช้า" },
      ],
      balance: [["การสลับกะเดือนนี้","1 / 3 ครั้ง"]],
    },
    travel: {
      title: "เดินทางเพื่อธุรกิจ", icon: "globe", c: "var(--plum)",
      fields: [
        { k:"dest",    l:"ปลายทาง",           t:"text",   ph:"เชียงใหม่" },
        { k:"from",    l:"วันที่เริ่ม",       t:"date",   ph:"1 พ.ค. 2568" },
        { k:"to",      l:"วันที่สิ้นสุด",     t:"date",   ph:"3 พ.ค. 2568" },
        { k:"purpose", l:"วัตถุประสงค์",      t:"textarea", ph:"เปิดสาขาใหม่ · ร่วมพิธี" },
        { k:"budget",  l:"งบประมาณ (บาท)",    t:"text",   ph:"15,000" },
        { k:"need",    l:"สิ่งที่ต้องขอ",      t:"select", opts:["ตั๋วเครื่องบิน + ที่พัก","เฉพาะที่พัก","เบี้ยเลี้ยง","ครบชุด"] },
      ],
      balance: [["งบเดินทางคงเหลือ","฿34,000 / ปี"]],
    },
    training: {
      title: "ขออบรม / สัมมนา", icon: "book", c: "var(--sage)",
      fields: [
        { k:"course",  l:"ชื่อหลักสูตร",      t:"text",   ph:"Excel ขั้นกลาง · SkillLane" },
        { k:"when",    l:"วันที่อบรม",        t:"date",   ph:"15 พ.ค. 2568" },
        { k:"prov",    l:"ผู้จัด",             t:"text",   ph:"SkillLane" },
        { k:"cost",    l:"ค่าใช้จ่าย (บาท)",   t:"text",   ph:"3,500" },
        { k:"how",     l:"รูปแบบ",            t:"select", opts:["ออนไลน์","ในสถานที่","ผสม"] },
        { k:"benefit", l:"ประโยชน์ต่องาน",    t:"textarea", ph:"ใช้จัดทำรายงานยอดขายสาขา" },
      ],
      balance: [["งบฝึกอบรมคงเหลือ","฿12,000 / ปี"]],
    },
    asset: {
      title: "เบิกอุปกรณ์", icon: "plug", c: "var(--butter)",
      fields: [
        { k:"item",    l:"รายการ",            t:"select", opts:["รองเท้ากันลื่น","เครื่องแบบ","หูฟัง","เครื่องสแกนบาร์โค้ด","อื่น ๆ"] },
        { k:"size",    l:"ไซส์ / สเปก",        t:"text",   ph:"ไซส์ 38" },
        { k:"qty",     l:"จำนวน",             t:"text",   ph:"1 คู่" },
        { k:"reason",  l:"เหตุผล",            t:"textarea", ph:"คู่เดิมชำรุด" },
      ],
      balance: [["เบิกเครื่องแบบล่าสุด","ก.พ. 2568"]],
    },
    info: {
      title: "แก้ไขข้อมูลส่วนตัว", icon: "people", c: "var(--accent)",
      fields: [
        { k:"field",   l:"ข้อมูลที่ต้องแก้ไข", t:"select", opts:["ที่อยู่","เบอร์โทรศัพท์","เลขบัญชีธนาคาร","ผู้อุปการะ","ผู้ติดต่อฉุกเฉิน"] },
        { k:"old",     l:"ข้อมูลเดิม",        t:"text",   ph:"ระบบจะเติมให้อัตโนมัติ", readonly:true },
        { k:"new",     l:"ข้อมูลใหม่",        t:"textarea", ph:"ระบุข้อมูลใหม่" },
        { k:"file",    l:"เอกสารประกอบ",     t:"file",   ph:"สำเนาบัตรประชาชน / หน้าบุ๊ค" },
      ],
    },
    transfer: {
      title: "ขอโอนย้ายสาขา", icon: "arrow", c: "var(--coral)",
      fields: [
        { k:"from",    l:"สาขาปัจจุบัน",      t:"text",   ph:"สาขาฮัมเบอร์", readonly:true },
        { k:"to",      l:"สาขาที่ต้องการย้ายไป", t:"select", opts:["สาขาสีลม","สาขาอารีย์","สาขาทองหล่อ","สาขาอื่น ๆ"] },
        { k:"when",    l:"วันที่ต้องการเริ่ม", t:"date",   ph:"1 มิ.ย. 2568" },
        { k:"role",    l:"ตำแหน่งที่สนใจ",    t:"text",   ph:"คงตำแหน่งเดิม" },
        { k:"reason",  l:"เหตุผล",            t:"textarea", ph:"ย้ายที่พักใกล้สาขาใหม่" },
      ],
      balance: [["ระยะเวลาพิจารณา","14 วันทำการ"]],
    },
    resign: {
      title: "ลาออก", icon: "shield", c: "var(--ink-3)",
      fields: [
        { k:"last",    l:"วันสุดท้ายที่ทำงาน", t:"date",   ph:"31 พ.ค. 2568" },
        { k:"notice",  l:"ระยะเวลาบอกล่วงหน้า", t:"text", ph:"30 วัน", readonly:true },
        { k:"reason",  l:"เหตุผล",            t:"select", opts:["หาโอกาสใหม่","เหตุผลส่วนตัว","ย้ายถิ่นฐาน","ศึกษาต่อ","อื่น ๆ"] },
        { k:"note",    l:"ข้อเสนอแนะ",        t:"textarea", ph:"ความเห็นที่อยากฝากบริษัท (ไม่บังคับ)" },
      ],
      balance: [["วันลาพักร้อนคงเหลือ","12 วัน (จ่ายเป็นเงิน)"],["กองทุนสำรองฯ","ขอข้อมูลเพิ่มจาก HR"]],
    },
  };

  // Picker view — no type selected yet
  if (!type) {
    return (
      <>
        <div className="row" style={{marginBottom: 16, gap: 10}}>
          <button className="btn btn-ghost" onClick={onBack} style={{padding:"8px 12px"}}>
            <Ic.arrow size={14} style={{transform:"rotate(180deg)"}}/> กลับ
          </button>
          <div className="eyebrow">สร้างคำร้องใหม่</div>
        </div>

        <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 85%)", border: 0, padding: 28, marginBottom: 20, position:"relative", overflow:"hidden"}}>
          <div className="blob teal" style={{width: 120, height: 150, right: -20, top: -30, opacity:.5}}/>
          <div className="eyebrow">ขั้นที่ 1 / 2 · เลือกประเภทคำร้อง</div>
          <h1 style={{fontSize: 30, marginTop: 10, maxWidth: 560}}>อยากยื่นคำร้องเรื่องอะไร?</h1>
          <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 8, maxWidth: 520, lineHeight: 1.6}}>
            เลือกประเภทด้านล่างเพื่อกรอกแบบฟอร์ม ระบบจะส่งให้ผู้มีอำนาจอนุมัติตามลำดับโดยอัตโนมัติ
          </p>
        </div>

        <div className="grid" style={{gridTemplateColumns:"1fr 1fr 1fr", gap: 14}}>
          {catalog.map(f => {
            const Glyph = Ic[f.icon] || Ic.doc;
            return (
              <div key={f.id} className="card" style={{cursor:"pointer", transition:"transform .15s, border-color .15s"}}
                   onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.borderColor="var(--ink)"; }}
                   onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.borderColor=""; }}
                   onClick={() => onPick(f)}>
                <div className="row" style={{alignItems:"flex-start"}}>
                  <div style={{width: 40, height: 40, borderRadius: 12, background: f.c, opacity:.15, position:"absolute"}}/>
                  <div style={{width: 40, height: 40, borderRadius: 12, display:"flex", alignItems:"center", justifyContent:"center", color: f.c, position:"relative"}}>
                    <Glyph size={20}/>
                  </div>
                  <div className="spacer"/>
                  <span className="tag" style={{background:"var(--cream-2)", color:"var(--ink-3)"}}>{f.sla}</span>
                </div>
                <h3 style={{marginTop: 12, fontSize: 16}}>{f.t}</h3>
                <p style={{color:"var(--ink-2)", fontSize: 12.5, marginTop: 4, lineHeight: 1.5}}>{f.sub}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  // Submitted confirmation view
  if (submitted) {
    return (
      <>
        <div className="row" style={{marginBottom: 16, gap: 10}}>
          <button className="btn btn-ghost" onClick={onBack} style={{padding:"8px 12px"}}>
            <Ic.arrow size={14} style={{transform:"rotate(180deg)"}}/> กลับไปที่คำร้องของฉัน
          </button>
        </div>
        <div className="card" style={{textAlign:"center", padding: 56, background:"linear-gradient(135deg, var(--sage-soft) 0%, var(--cream) 80%)", border: 0, position:"relative", overflow:"hidden"}}>
          <div className="blob sage" style={{width: 160, height: 200, right: -40, top: -50, opacity:.5}}/>
          <div className="blob butter" style={{width: 80, height: 100, left: 40, bottom: -20, opacity:.55}}/>
          <div style={{width: 68, height: 68, borderRadius:"50%", background:"var(--sage)", color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center", position:"relative"}}>
            <Ic.check size={30}/>
          </div>
          <h1 style={{fontSize: 30, marginTop: 20, position:"relative"}}>ส่งคำร้องเรียบร้อย</h1>
          <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 8, maxWidth: 480, margin:"8px auto 0", lineHeight: 1.6, position:"relative"}}>
            รหัสคำร้อง <b>REQ-2492</b> · ส่งให้ผู้จัดการเขตแล้ว คุณจะได้รับการแจ้งเตือนทางอีเมลและใน Humi เมื่อมีการพิจารณา
          </p>
          <div className="row" style={{gap: 10, justifyContent:"center", marginTop: 24, position:"relative"}}>
            <button className="btn btn-primary" onClick={onBack}>ดูคำร้องของฉัน</button>
            <button className="btn btn-ghost" onClick={() => { setSubmitted(false); onPick(null); }}>ยื่นคำร้องอีก</button>
          </div>
        </div>
      </>
    );
  }

  // Form fill view
  const schema = SCHEMAS[type.id] || { title: type.t, icon: type.icon, c: type.c, fields: [
    { k:"title",  l:"หัวข้อคำร้อง",   t:"text",     ph:"ระบุหัวข้อโดยย่อ" },
    { k:"detail", l:"รายละเอียด",    t:"textarea", ph:"อธิบายเรื่องที่ต้องการ" },
    { k:"file",   l:"เอกสารประกอบ",  t:"file",     ph:"แนบเอกสาร (ถ้ามี)" },
  ], balance: [] };
  const Glyph = Ic[schema.icon] || Ic.doc;

  return (
    <>
      <div className="row" style={{marginBottom: 16, gap: 10}}>
        <button className="btn btn-ghost" onClick={() => onPick(null)} style={{padding:"8px 12px"}}>
          <Ic.arrow size={14} style={{transform:"rotate(180deg)"}}/> เลือกประเภทอื่น
        </button>
        <div className="eyebrow">สร้างคำร้องใหม่ / {schema.title}</div>
      </div>

      <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 85%)", border: 0, padding: 26, marginBottom: 20, position:"relative", overflow:"hidden"}}>
        <div className="blob butter" style={{width: 100, height: 120, right: -10, top: -20, opacity:.6}}/>
        <div className="row" style={{gap: 16, alignItems:"center"}}>
          <div style={{width: 52, height: 52, borderRadius: 14, background: schema.c, opacity:.15, position:"absolute"}}/>
          <div style={{width: 52, height: 52, borderRadius: 14, display:"flex", alignItems:"center", justifyContent:"center", color: schema.c, position:"relative"}}>
            <Glyph size={26}/>
          </div>
          <div>
            <div className="eyebrow">ขั้นที่ 2 / 2 · กรอกข้อมูล</div>
            <h1 style={{fontSize: 26, marginTop: 4}}>{schema.title}</h1>
          </div>
          <div className="spacer"/>
          <span className="tag" style={{background:"var(--cream-2)", color:"var(--ink-3)"}}>SLA {type.sla}</span>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:"1.6fr 1fr", gap: 20}}>
        <div className="card">
          <h3 style={{marginBottom: 16, fontSize: 16}}>รายละเอียดคำร้อง</h3>
          <form className="col" style={{gap: 16}} onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            {schema.fields.map(f => (
              <div key={f.k} className="col" style={{gap: 6}}>
                <label style={{fontSize: 12, fontWeight: 600, color:"var(--ink-2)", letterSpacing:"0.02em"}}>{f.l}</label>
                {f.t === "text" && (
                  <input type="text" placeholder={f.ph} readOnly={f.readonly}
                    style={{padding:"10px 12px", border:"1px solid var(--line)", borderRadius: 10, fontSize: 14, fontFamily:"inherit", background: f.readonly?"var(--cream-2)":"var(--paper)", color:"var(--ink)"}}/>
                )}
                {f.t === "date" && (
                  <div className="row" style={{padding:"10px 12px", border:"1px solid var(--line)", borderRadius: 10, background:"var(--paper)", cursor:"pointer"}}>
                    <Ic.calendar size={14}/>
                    <span style={{fontSize: 14, color:"var(--ink-3)"}}>{f.ph}</span>
                    <span className="spacer"/>
                    <Ic.arrow size={12} style={{transform:"rotate(90deg)", color:"var(--ink-3)"}}/>
                  </div>
                )}
                {f.t === "select" && (
                  <div className="row" style={{padding:"10px 12px", border:"1px solid var(--line)", borderRadius: 10, background:"var(--paper)", cursor:"pointer"}}>
                    <span style={{fontSize: 14, color:"var(--ink)"}}>{f.opts[0]}</span>
                    <span className="spacer"/>
                    <Ic.arrow size={12} style={{transform:"rotate(90deg)", color:"var(--ink-3)"}}/>
                  </div>
                )}
                {f.t === "textarea" && (
                  <textarea placeholder={f.ph} rows={3}
                    style={{padding:"10px 12px", border:"1px solid var(--line)", borderRadius: 10, fontSize: 14, fontFamily:"inherit", background:"var(--paper)", color:"var(--ink)", resize:"vertical"}}/>
                )}
                {f.t === "file" && (
                  <div style={{padding:"18px 14px", border:"2px dashed var(--line)", borderRadius: 10, textAlign:"center", background:"var(--cream-2)", cursor:"pointer"}}>
                    <Ic.plus size={18} style={{color:"var(--ink-3)"}}/>
                    <div style={{fontSize: 13, color:"var(--ink-2)", marginTop: 4}}>{f.ph}</div>
                    <div style={{fontSize: 11, color:"var(--ink-3)", marginTop: 2}}>PDF, JPG, PNG · ไม่เกิน 10 MB</div>
                  </div>
                )}
              </div>
            ))}

            <div className="row" style={{gap: 10, marginTop: 8, paddingTop: 16, borderTop:"1px solid var(--line-2)"}}>
              <button type="button" className="btn btn-ghost" onClick={() => onPick(null)}>ยกเลิก</button>
              <div className="spacer"/>
              <button type="button" className="btn btn-ghost">บันทึกแบบร่าง</button>
              <button type="submit" className="btn btn-primary">ส่งคำร้อง <Ic.arrow size={13}/></button>
            </div>
          </form>
        </div>

        <div className="col" style={{gap: 16}}>
          {schema.balance && schema.balance.length > 0 && (
            <div className="card">
              <h3 style={{marginBottom: 12, fontSize: 15}}>ข้อมูลของคุณ</h3>
              <div className="col" style={{gap: 10, fontSize: 13}}>
                {schema.balance.map(([k,v]) => (
                  <div key={k} className="row" style={{padding:"6px 0", borderBottom:"1px solid var(--line-2)"}}>
                    <div style={{color:"var(--ink-3)"}}>{k}</div>
                    <span className="spacer"/>
                    <div style={{fontWeight: 600}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card" style={{background:"var(--cream-2)", border:"1px dashed var(--line-2)"}}>
            <h3 style={{marginBottom: 10, fontSize: 14}}>สายการอนุมัติ</h3>
            <div className="col" style={{gap: 8}}>
              {[
                {who:"จงรักษ์ ทานากะ", role:"ผู้ยื่น", c:"จท", t:"coral"},
                {who:"ดานา หลิว",      role:"ผู้จัดการเขต · ขั้นที่ 1", c:"DL", t:"sage"},
                {who:"ฝ่ายบุคคล",      role:"ผู้ตรวจสอบ · ขั้นที่ 2",  c:"HR", t:"butter"},
              ].map((x, i) => (
                <div key={i} className="row">
                  <div className={"avatar " + x.t} style={{width: 28, height: 28, fontSize: 11}}>{x.c}</div>
                  <div style={{fontSize: 12.5}}>
                    <div style={{fontWeight: 600}}>{x.who}</div>
                    <div style={{color:"var(--ink-3)", fontSize: 11}}>{x.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 12, lineHeight: 1.5}}>
              ระบบจะส่งต่ออัตโนมัติเมื่อขั้นก่อนอนุมัติ หากเกิน SLA คำร้องจะถูกยกระดับให้ผู้บริหารเหนือขึ้นไป
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.RequestsScreen = RequestsScreen;

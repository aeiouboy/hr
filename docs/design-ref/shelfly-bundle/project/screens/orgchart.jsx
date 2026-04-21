// OrgChartScreen.jsx — org chart + detailed employee profile on click
function OrgChartScreen({ onNav }) {
  const Ic = window.I;
  const [selected, setSelected] = React.useState("marcus");

  const PEOPLE = {
    grace: {n:"เกรซ หวง", r:"ประธานเจ้าหน้าที่ฝ่ายบุคคล", d:"สำนักงานใหญ่ · กรุงเทพฯ", c:"GH", t:"ink", m:null, reports:["jordan_m"], email:"grace.huang@humi.shop", phone:"+66 2 555 0101", tenure:"4 ปี 2 เดือน", loc:"กรุงเทพฯ", tz:"ICT", title:"CHRO · ผู้บริหาร"},
    jordan_m: {n:"จอร์แดน เหมย", r:"พันธมิตรฝ่ายบุคคล", d:"สำนักงานใหญ่ · กรุงเทพฯ", c:"JM", t:"sage", m:"grace", reports:["dana","simone"], email:"jordan.mei@humi.shop", phone:"+66 2 555 0112", tenure:"2 ปี 6 เดือน", loc:"กรุงเทพฯ", tz:"ICT", title:"People Ops"},
    dana: {n:"ดานา หลิว", r:"ผู้จัดการเขต", d:"เขตทองหล่อ", c:"DL", t:"coral", m:"jordan_m", reports:["ava","jess","amir"], email:"dana.liu@humi.shop", phone:"+66 2 555 0133", tenure:"3 ปี 8 เดือน", loc:"กรุงเทพฯ", tz:"ICT", title:"ผู้จัดการเขต"},
    simone: {n:"ซิโมน ฟอง", r:"ผู้จัดการเขต", d:"เขตตะวันตก", c:"SF", t:"teal", m:"jordan_m", reports:[], email:"simone.fong@humi.shop"},
    ava: {n:"จงรักษ์ ทานากะ", r:"ผู้จัดการร้าน II", d:"สาขาทองหล่อ", c:"จท", t:"coral", m:"dana", reports:["marcus","priya","taylor","jordan_n"], email:"ava.reyes@humi.shop"},
    jess: {n:"เจส โอคอน", r:"ผู้จัดการร้าน", d:"สาขาสีลม", c:"JO", t:"teal", m:"dana", reports:[]},
    amir: {n:"อาเมียร์ คาลิล", r:"ผู้จัดการร้าน", d:"สาขาอารีย์", c:"AK", t:"butter", m:"dana", reports:[]},
    marcus: {n:"มาร์คัส เคลลี่", r:"หัวหน้ากะ", d:"สาขาทองหล่อ", c:"MK", t:"teal", m:"ava", reports:[],
      email:"marcus.kelley@humi.shop", phone:"+66 2 555 0177",
      title:"หัวหน้ากะ · หน้าร้าน", tenure:"1 ปี 9 เดือน", loc:"กรุงเทพฯ", tz:"ICT (UTC+7)",
      hired:"14 ก.ค. 2567", dob:"3 มี.ค.", pronouns:"เขา/เค้า", language:"ไทย, อังกฤษ",
      emp_type:"เต็มเวลา · รายชั่วโมง", grade:"R-04", cost:"RTL-THL-0412",
      comp:"฿680,000 / ปี · ฿320/ชม.", bonus:"รายไตรมาสสูงสุด 4%",
      skills:["จัดการเงินสด","จัดเรียงสินค้า","เทรนพนักงานใหม่","ตรวจนับสินค้า","จัดการ POS"],
      goals:[{t:"เรียนจบใบรับรอง LEAD-101", p:80},{t:"ติดตามการเปิดร้าน 3 ครั้งกับจงรักษ์", p:66},{t:"นำทีมวันตรวจนับสินค้าเสาร์", p:100}],
      training:[{n:"ปฐมพยาบาล (L1)", s:"ยังใช้ได้", t:"sage"},{n:"ป้องกันการสูญเสีย 2568", s:"ยังใช้ได้", t:"sage"},{n:"ความปลอดภัยอาหาร", s:"ต่ออายุภายใน ส.ค.", t:"butter"}],
      upcoming:[{t:"1:1 กับ จงรักษ์", d:"พฤ. 24 เม.ย. · 11:00"},{t:"เตรียมตรวจนับสินค้า", d:"ศ. 25 เม.ย. · 09:00"},{t:"ประเมินจบทดลองงาน", d:"1 พ.ค."}],
      reviews:{last:"ดีเกินคาด", cycle:"ครึ่งปีหลัง 2567"},
      timeoff:{vac:"เหลือ 6.5 วัน", sick:"ใช้ไป 2 วัน"},
      notes:"เลื่อนตำแหน่งจากพนักงานอาวุโสเมื่อ ม.ค. 2568 ถูกคัดเลือกเข้าสาย Store Manager ภายในสิ้นปี 2570"
    },
    priya: {n:"พริยะ ชาห์", r:"พนักงานอาวุโส", d:"สาขาทองหล่อ", c:"PS", t:"coral", m:"ava", reports:[]},
    taylor: {n:"เทย์เลอร์ ซิมส์", r:"พนักงาน", d:"สาขาทองหล่อ", c:"TS", t:"sage", m:"ava", reports:[]},
    jordan_n: {n:"จอร์แดน ไนแลนด์", r:"พนักงาน", d:"สาขาทองหล่อ", c:"JN", t:"ink", m:"ava", reports:[]},
  };

  const p = PEOPLE[selected];
  const manager = p.m ? PEOPLE[p.m] : null;
  const managerChain = [];
  let cur = p.m;
  while (cur && PEOPLE[cur]) { managerChain.unshift(PEOPLE[cur]); cur = PEOPLE[cur].m; }
  const directReports = (p.reports || []).map(k => PEOPLE[k]).filter(Boolean);
  const peers = manager ? (manager.reports || []).filter(k => k !== selected).map(k => PEOPLE[k]) : [];

  const Node = ({ person, size = "md", onClick, highlight }) => {
    const sizes = { sm:{w:140, pad:10, av:24}, md:{w:180, pad:14, av:32}, lg:{w:240, pad:18, av:44} };
    const s = sizes[size];
    return (
      <div onClick={onClick}
        style={{
          width: s.w, padding: s.pad,
          background: highlight ? "var(--accent-soft)" : "var(--paper)",
          border: "1px solid " + (highlight ? "transparent" : "var(--line)"),
          borderRadius: 14, cursor: onClick ? "pointer" : "default",
          boxShadow: highlight ? "0 2px 0 rgba(14,27,44,0.06), 0 12px 28px rgba(14,27,44,0.08)" : "none",
          textAlign:"center", transition:"all .15s ease",
        }}>
        <div className={"avatar " + person.t} style={{width: s.av, height: s.av, margin: "0 auto 8px", fontSize: size==="lg"? 16 : 12}}>{person.c}</div>
        <div style={{fontWeight: 600, fontSize: size==="lg"? 15 : 13, letterSpacing:"-0.01em"}}>{person.n}</div>
        <div style={{fontSize: size==="lg"? 12 : 11, color:"var(--ink-3)", marginTop: 2}}>{person.r}</div>
      </div>
    );
  };

  const Connector = ({ h = 22 }) => (
    <div style={{width: 2, height: h, background:"var(--line)", margin:"0 auto"}}/>
  );

  return (
    <>
      <window.Topbar title="ผังองค์กร" subtitle="ผังองค์กร · โปรไฟล์พนักงาน"  onNav={onNav}
        actions={<button className="btn btn-ghost"><Ic.download size={14}/> ส่งออกการ์ด</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1.1fr 1.5fr", gap: 20}}>
        {/* LEFT — Org chart */}
        <div className="card" style={{padding: 24, position:"sticky", top: 90, alignSelf:"start"}}>
          <div className="row">
            <div>
              <div className="eyebrow">สายบังคับบัญชา</div>
              <h3 style={{marginTop: 6}}>ผังองค์กร</h3>
            </div>
            <div className="spacer"/>
            <div className="tabs">
              <div className="tab active">ผัง</div>
              <div className="tab">รายการ</div>
            </div>
          </div>

          <div style={{marginTop: 22, textAlign:"center", overflowX:"auto"}}>
            {/* Manager chain (compact) */}
            {managerChain.map((m, i) => (
              <React.Fragment key={m.n}>
                <div style={{display:"inline-block"}}>
                  <Node person={m} size="sm" onClick={() => setSelected(Object.keys(PEOPLE).find(k => PEOPLE[k] === m))}/>
                </div>
                <Connector/>
              </React.Fragment>
            ))}

            {/* Selected person (large) */}
            <div style={{display:"inline-block"}}>
              <Node person={p} size="lg" highlight/>
            </div>

            {/* Peers line */}
            {peers.length > 0 && (
              <>
                <Connector h={14}/>
                <div style={{fontSize: 11, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".1em", marginBottom: 8}}>
                  เพื่อนร่วมทีม {peers.length} คน ใต้ {manager.n}
                </div>
                <div style={{display:"flex", gap: 10, justifyContent:"center", flexWrap:"wrap"}}>
                  {peers.map(pr => (
                    <Node key={pr.n} person={pr} size="sm" onClick={() => setSelected(Object.keys(PEOPLE).find(k => PEOPLE[k] === pr))}/>
                  ))}
                </div>
              </>
            )}

            {/* Direct reports */}
            {directReports.length > 0 && (
              <>
                <Connector/>
                <div style={{fontSize: 11, color:"var(--ink-4)", textTransform:"uppercase", letterSpacing:".1em", marginBottom: 8}}>
                  ลูกทีม · {directReports.length}
                </div>
                <div style={{display:"flex", gap: 10, justifyContent:"center", flexWrap:"wrap"}}>
                  {directReports.map(pr => (
                    <Node key={pr.n} person={pr} size="sm" onClick={() => setSelected(Object.keys(PEOPLE).find(k => PEOPLE[k] === pr))}/>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT — Employee profile detail */}
        <div className="col" style={{gap: 16}}>
          {/* Profile header */}
          <div className="card" style={{padding: 0, overflow:"hidden", borderRadius: 18}}>
            <div style={{height: 56, background:"linear-gradient(110deg, var(--ink) 0%, #1a2b42 100%)", position:"relative", overflow:"hidden"}}>
              <div className="blob teal"  style={{width: 90, height: 110, right: 30, top: -20, opacity:.45}}/>
              <div className="blob coral" style={{width: 60, height: 74, right: 120, top: 20, opacity:.45}}/>
            </div>
            <div style={{padding: "22px 22px"}}>
              <div className="row" style={{gap: 16, alignItems:"center", flexWrap:"wrap"}}>
                <div className={"avatar " + p.t} style={{width: 68, height: 68, fontSize: 22, borderRadius: 16, flexShrink: 0}}>{p.c}</div>
                <div style={{flex: "1 1 260px", minWidth: 0}}>
                  <h2 style={{fontSize: 24, letterSpacing:"-0.01em"}}>{p.n}</h2>
                  <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 4, lineHeight: 1.6}}>
                    {p.title || p.r} · {p.d}
                    {manager && <> · รายงานต่อ <b style={{color:"var(--ink-2)"}}>{manager.n}</b></>}
                  </div>
                </div>
              </div>
              <div className="row" style={{gap: 8, marginTop: 16, flexWrap:"wrap"}}>
                <button className="btn btn-ghost" style={{padding:"8px 12px", fontSize: 13}}><Ic.send size={13}/> ส่งข้อความ</button>
                <button className="btn btn-primary" style={{padding:"8px 12px", fontSize: 13, whiteSpace:"nowrap"}}>ดูโปรไฟล์เต็ม</button>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", borderTop:"1px solid var(--line-2)"}}>
              {[
                {l:"อายุงาน", v: p.tenure || "—"},
                {l:"ที่ตั้ง", v: p.loc || p.d},
                {l:"ผลประเมินล่าสุด", v: p.reviews ? p.reviews.last : "—"},
                {l:"วันลาคงเหลือ", v: p.timeoff ? p.timeoff.vac : "—"},
              ].map((s, i) => (
                <div key={s.l} style={{padding:"14px 18px", borderLeft: i===0 ? 0 : "1px solid var(--line-2)"}}>
                  <div className="eyebrow">{s.l}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 4, letterSpacing:"-0.01em"}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Employment */}
          <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 16}}>
            <div className="card">
              <div className="eyebrow">ช่องทางติดต่อ</div>
              <div className="col" style={{gap: 10, marginTop: 12, fontSize: 13}}>
                <div className="row"><Ic.globe size={14}/><span style={{color:"var(--ink-2)"}}>{p.email || "—"}</span></div>
                {p.phone && <div className="row"><Ic.clock size={14}/><span style={{color:"var(--ink-2)"}}>{p.phone}</span></div>}
                {p.tz && <div className="row"><Ic.clock size={14}/><span style={{color:"var(--ink-3)"}}>{p.tz} · ขณะนี้ {new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})} น.</span></div>}
                {p.language && <div className="row"><Ic.book size={14}/><span style={{color:"var(--ink-3)"}}>{p.language}</span></div>}
              </div>
            </div>
            <div className="card">
              <div className="eyebrow">ข้อมูลการจ้างงาน</div>
              <div className="col" style={{gap: 10, marginTop: 12, fontSize: 13}}>
                {[
                  ["ประเภท", p.emp_type],
                  ["เกรด", p.grade],
                  ["Cost center", p.cost],
                  ["เริ่มงาน", p.hired],
                  ["ผลตอบแทน", p.comp],
                ].filter(([,v]) => v).map(([l,v]) => (                                  
                  <div key={l} className="row">
                    <span style={{color:"var(--ink-3)", width: 110}}>{l}</span>
                    <span style={{color:"var(--ink-2)", fontWeight: 500}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills & Current goals */}
          {p.skills && (
            <div className="card">
              <div className="row">
                <div>
                  <div className="eyebrow">ทักษะและจุดแข็ง</div>
                  <h3 style={{marginTop: 6}}>สิ่งที่ {p.n.split(" ")[0]} ถนัด</h3>
                </div>
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}><Ic.plus size={12}/> รับรองทักษะ</button>
              </div>
              <div className="row" style={{marginTop: 14, gap: 8, flexWrap:"wrap"}}>
                {p.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          )}

          {p.goals && (
            <div className="card">
              <div className="eyebrow">เป้าหมายครึ่งปีแรก 2568</div>
              <h3 style={{marginTop: 6, marginBottom: 14}}>ความคืบหน้าปัจจุบัน</h3>
              <div className="col" style={{gap: 12}}>
                {p.goals.map(g => (
                  <div key={g.t}>
                    <div className="row"><span style={{fontSize: 13, fontWeight: 500}}>{g.t}</span><div className="spacer"/><span style={{fontSize: 12, color:"var(--ink-3)"}}>{g.p}%</span></div>
                    <div className="progress" style={{marginTop: 6}}><span style={{width: g.p+"%"}}/></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training + Upcoming */}
          <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 16}}>
            {p.training && (
              <div className="card">
                <div className="eyebrow">ใบรับรอง</div>
                <div className="col" style={{gap: 10, marginTop: 12}}>
                  {p.training.map(t => (
                    <div key={t.n} className="row" style={{fontSize: 13}}>
                      <span className={"tag " + t.t} style={{padding:"2px 8px"}}>●</span>
                      <span style={{flex:1}}>{t.n}</span>
                      <span style={{color:"var(--ink-3)", fontSize: 12}}>{t.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {p.upcoming && (
              <div className="card">
                <div className="eyebrow">กำหนดการที่จะถึง</div>
                <div className="col" style={{gap: 10, marginTop: 12}}>
                  {p.upcoming.map(u => (
                    <div key={u.t} className="row">
                      <div style={{width: 4, alignSelf:"stretch", background:"var(--accent)", borderRadius: 2}}/>
                      <div>
                        <div style={{fontSize: 13, fontWeight: 500}}>{u.t}</div>
                        <div style={{fontSize: 12, color:"var(--ink-3)"}}>{u.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {p.notes && (
            <div className="card ink" style={{overflow:"hidden", position:"relative"}}>
              <div className="blob teal" style={{width: 90, height: 110, right: -20, top: -30, opacity:.35}}/>
              <div className="eyebrow" style={{color:"var(--accent)"}}>บันทึก HR · สำหรับผู้จัดการ</div>
              <p style={{fontSize: 14, color:"rgba(231,227,216,0.85)", marginTop: 10, lineHeight: 1.55}}>{p.notes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

window.OrgChartScreen = OrgChartScreen;

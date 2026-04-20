// GoalsScreen.jsx (Thai)
function GoalsScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("goals");

  return (
    <>
      <window.Topbar title="เป้าหมายและผลงาน" subtitle="รอบการประเมิน · ครึ่งปีแรก 2568" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.plus size={14}/> เพิ่มเป้าหมาย</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20}}>
        {[
          {l:"เป้าหมายที่อยู่ในแผน", v:"4 / 6", c:"var(--accent)"},
          {l:"ความคืบหน้าของรอบ", v:"58%", c:"var(--coral)"},
          {l:"ผลประเมินล่าสุด", v:"ดีเกินคาด", c:"var(--sage)"},
          {l:"Check-in ครั้งถัดไป", v:"24 เม.ย.", c:"var(--butter)"},
        ].map(s => (
          <div key={s.l} className="card tight" style={{borderLeft: `4px solid ${s.c}`}}>
            <div className="eyebrow">{s.l}</div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 26, fontWeight: 700, marginTop: 4}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="tabs" style={{marginBottom: 18}}>
        {[["goals","เป้าหมายของฉัน"],["reviews","การประเมิน"],["feedback","ข้อเสนอแนะ"],["team","ทีมของฉัน"]].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      {tab === "goals" && (
        <div className="grid" style={{gridTemplateColumns: "1.4fr 1fr", gap: 20}}>
          <div className="col" style={{gap: 14}}>
            {[
              {t:"ลดการสูญเสียสินค้าที่สาขาฮัมเบอร์ลง 20% ภายในครึ่งปีแรก", cat:"ปฏิบัติการ", p:72, s:"อยู่ในแผน", due:"30 มิ.ย.", tone:"sage",
               kr:[{l:"ตรวจสอบการสูญเสียสินค้าไตรมาส 1 เสร็จสิ้น", done:true},{l:"เริ่มการเดินตรวจหน้าร้านทุกสัปดาห์", done:true},{l:"ลดการสูญเสียได้ 14% จากเส้นฐาน", done:false}]},
              {t:"โค้ชพนักงาน 3 คนให้ก้าวขึ้นเป็นหัวหน้ากะ", cat:"บุคลากร", p:66, s:"อยู่ในแผน", due:"15 ส.ค.", tone:"sage",
               kr:[{l:"คัดเลือกผู้สมัคร", done:true},{l:"อบรม LEAD-101 ร่วมกัน", done:true},{l:"ติดตามเปิด-ปิดร้าน 3 ครั้ง", done:false}]},
              {t:"เปิดตัวโครงการนำร่องให้พนักงานจัดกะเอง", cat:"ปฏิบัติการ", p:30, s:"เสี่ยง", due:"20 พ.ค.", tone:"coral",
               kr:[{l:"ร่าง SOP", done:true},{l:"ประสานกับทีมระดับเขต", done:false},{l:"ทดลองนำร่อง 4 สัปดาห์", done:false}]},
              {t:"ส่วนตัว · เรียนจบใบรับรองผู้นำค้าปลีก", cat:"พัฒนาตนเอง", p:45, s:"อยู่ในแผน", due:"1 ก.ย.", tone:"sage",
               kr:[{l:"โมดูล 1–4", done:true},{l:"โมดูล 5–8", done:false},{l:"โครงงานสรุป", done:false}]},
            ].map(g => (
              <div key={g.t} className="card">
                <div className="row" style={{alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div className="row" style={{gap: 8, marginBottom: 6, flexWrap:"wrap"}}>
                      <span className="tag">{g.cat}</span>
                      <span className={"tag " + g.tone}>{g.s}</span>
                      <span style={{fontSize: 12, color:"var(--ink-3)"}}>กำหนด {g.due}</span>
                    </div>
                    <h3 style={{fontSize: 18, lineHeight: 1.4}}>{g.t}</h3>
                  </div>
                  <div style={{textAlign:"right", flexShrink: 0, marginLeft: 12}}>
                    <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700}}>{g.p}%</div>
                    <div style={{fontSize: 11, color:"var(--ink-3)", textTransform:"uppercase", letterSpacing:".1em"}}>ความคืบหน้า</div>
                  </div>
                </div>
                <div className="progress" style={{marginTop: 12}}><span style={{width: g.p+"%"}}/></div>
                <div className="col" style={{gap: 8, marginTop: 14}}>
                  {g.kr.map(k => (
                    <div key={k.l} className="row" style={{fontSize: 13}}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 6,
                        border:"1.5px solid " + (k.done ? "var(--accent)" : "var(--line)"),
                        background: k.done ? "var(--accent)" : "transparent",
                        display:"inline-flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink: 0
                      }}>{k.done && <Ic.check size={11}/>}</span>
                      <span style={{color: k.done ? "var(--ink-3)" : "var(--ink)", textDecoration: k.done ? "line-through" : "none"}}>{k.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="col" style={{gap: 16}}>
            <div className="card">
              <div className="eyebrow">Check-in ครั้งถัดไป</div>
              <h3 style={{marginTop: 6}}>1:1 กับ ดานา แอล.</h3>
              <div style={{fontSize: 14, color:"var(--ink-2)", marginTop: 6}}>ศุกร์ 24 เม.ย. · 14:00 · 30 นาที</div>
              <hr className="divider"/>
              <div style={{fontSize: 13, color:"var(--ink-3)", marginBottom: 6}}>หัวข้อสนทนา</div>
              <div className="col" style={{gap: 8}}>
                {["ทบทวนความคืบหน้าการลดสูญเสียสินค้า","หารือความเสี่ยงโครงการจัดกะเอง","ไอเดียเป้าหมายขยาย Q2"].map(a =>
                  <div key={a} className="row" style={{fontSize: 13}}>
                    <span style={{width: 4, height: 4, borderRadius: 999, background:"var(--accent)"}}/>
                    <span>{a}</span>
                  </div>
                )}
              </div>
              <button className="btn btn-primary" style={{marginTop: 14, width:"100%"}}>เปิดห้อง 1:1</button>
            </div>
            <div className="card">
              <div className="eyebrow">แนวโน้มผลงาน</div>
              <h3 style={{marginTop: 6}}>การประเมิน 4 ครั้งล่าสุด</h3>
              <div className="row" style={{gap: 10, marginTop: 14, alignItems:"flex-end", height: 90}}>
                {[{h:50,l:"H1 '66"},{h:65,l:"H2 '66"},{h:82,l:"H1 '67"},{h:88,l:"H2 '67"}].map(b => (
                  <div key={b.l} style={{flex:1, textAlign:"center"}}>
                    <div style={{height: b.h+"%", background:"var(--accent)", borderRadius:"6px 6px 0 0"}}/>
                    <div style={{fontSize: 11, color:"var(--ink-3)", marginTop: 6}}>{b.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "reviews" && (
        <div className="card">
          <h3>รอบการประเมิน</h3>
          <div className="list" style={{marginTop: 10}}>
            {[
              {c:"ครึ่งปีแรก 2568 (ประเมินกลางรอบ)", d:"ส่งประเมินตนเองภายใน 15 มิ.ย.", s:"กำลังดำเนินการ", t:"butter"},
              {c:"ครึ่งปีหลัง 2567 (ประจำปี)",         d:"เสร็จสิ้น ธ.ค. 2567", s:"ดีเกินคาด", t:"sage"},
              {c:"ครึ่งปีแรก 2567 (ประเมินกลางรอบ)",   d:"เสร็จสิ้น ก.ค. 2567", s:"ได้ตามเกณฑ์", t:""},
              {c:"ครึ่งปีหลัง 2566 (ประจำปี)",         d:"เสร็จสิ้น ธ.ค. 2566", s:"ได้ตามเกณฑ์", t:""},
            ].map(r => (
              <div key={r.c} className="row-item">
                <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <Ic.doc size={18}/>
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{r.c}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.d}</div>
                </div>
                <div className="row" style={{gap: 8}}>
                  {r.t && <span className={"tag " + r.t}>{r.s}</span>}
                  <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>เปิด</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "feedback" && (
        <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 16}}>
          {[
            {who:"ดานา แอล.", r:"หัวหน้า", av:"DL", t:"coral", when:"2 สัปดาห์ก่อน",
             text:"คุณจงรักษ์จัดการสัปดาห์ตรวจนับสินค้าไตรมาส 1 ได้ดีมาก — เตรียมทีมล่วงหน้าและทำให้หน้าร้านสงบเรียบร้อย รอดูว่าเธอจะโค้ชพนักงานคนอื่นต่อไปอย่างไร"},
            {who:"มาร์คัส เค.", r:"เพื่อนร่วมทีม", av:"MK", t:"teal", when:"1 เดือนก่อน",
             text:"สื่อสารชัดเจนมาก ตอนที่ผมติดตามเธอทำงานกะปิดร้าน เธออธิบายทุกขั้นตอนโดยไม่ทำให้ผมรู้สึกว่าเป็นมือใหม่"},
            {who:"พริยะ เอส.", r:"ลูกทีม", av:"PS", t:"sage", when:"2 เดือนก่อน",
             text:"คุณจงรักษ์ให้ข้อเสนอแนะที่เฉพาะเจาะจงและจริงใจหลังจากที่ฉันเปิดร้านคนเดียวครั้งแรก นั่นคือเหตุผลที่ฉันสมัครตำแหน่งหัวหน้ากะ"},
          ].map(f => (
            <div key={f.who} className="card">
              <div className="row">
                <div className={"avatar " + f.t}>{f.av}</div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{f.who}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{f.r} · {f.when}</div>
                </div>
              </div>
              <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 12, lineHeight: 1.6}}>{f.text}</p>
            </div>
          ))}
          <div className="card cream" style={{display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"center"}}>
            <div className="eyebrow">ให้ข้อเสนอแนะกับคนอื่น</div>
            <h3 style={{marginTop: 6}}>เขียนข้อเสนอแนะให้เพื่อนร่วมงาน</h3>
            <p style={{fontSize: 13, color:"var(--ink-3)", marginTop: 6}}>ใช้เวลาแค่ 2 นาที จะถูกบันทึกในแฟ้มพัฒนาของเขา</p>
            <button className="btn btn-primary" style={{marginTop: 14}}><Ic.plus size={14}/> ข้อเสนอแนะใหม่</button>
          </div>
        </div>
      )}

      {tab === "team" && (
        <div className="card">
          <h3>ลูกทีมของฉัน</h3>
          <div className="list" style={{marginTop: 10}}>
            {[
              {n:"มาร์คัส เคลลี่", r:"หัวหน้ากะ", g:"4 / 4", p:82, c:"MK", t:"teal"},
              {n:"พริยะ ชาห์",    r:"พนักงานอาวุโส", g:"3 / 4", p:68, c:"PS", t:"coral"},
              {n:"เทย์เลอร์ ซิมส์", r:"พนักงาน",   g:"2 / 3", p:55, c:"TS", t:"sage"},
              {n:"จอร์แดน ไนแลนด์", r:"พนักงาน",  g:"3 / 3", p:91, c:"JN", t:"ink"},
            ].map(r => (
              <div key={r.n} className="row-item">
                <div className={"avatar " + r.t}>{r.c}</div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{r.n}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.r} · เป้าหมายอยู่ในแผน {r.g}</div>
                </div>
                <div className="row" style={{gap: 12}}>
                  <div style={{width: 140}}><div className="progress"><span style={{width: r.p+"%"}}/></div></div>
                  <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>เปิด 1:1</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
window.GoalsScreen = GoalsScreen;

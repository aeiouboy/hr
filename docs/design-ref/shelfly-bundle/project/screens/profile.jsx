// ProfileScreen.jsx — employee self-service profile (Thai)
function ProfileScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("personal");
  return (
    <>
      <window.Topbar title="โปรไฟล์ของฉัน" subtitle="รหัสพนักงาน · HMR-4421" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.check size={14}/> บันทึกการเปลี่ยนแปลง</button>}/>

      {/* Clean header card — no dark banner */}
      <div className="card" style={{padding: "22px 26px", marginBottom: 20, display:"flex", alignItems:"center", gap: 20, flexWrap:"wrap", position:"relative", overflow:"hidden"}}>
        <div className="blob" style={{width: 180, height: 180, right: -60, top: -60, background:"var(--accent-soft)", opacity:.45, position:"absolute"}}/>
        <div className="avatar coral" style={{width: 72, height: 72, fontSize: 24, borderRadius: 18, flexShrink: 0, position:"relative"}}>จท</div>
        <div style={{flex:"1 1 260px", minWidth: 0, position:"relative"}}>
          <div className="row" style={{gap: 10, alignItems:"baseline", flexWrap:"wrap"}}>
            <h2 style={{fontSize: 24}}>จงรักษ์ ทานากะ</h2>
            <span style={{fontSize: 13, color:"var(--ink-3)"}}>(เธอ/หล่อน)</span>
          </div>
          <div style={{fontSize: 14, color:"var(--ink-3)", marginTop: 4}}>
            ผู้จัดการร้าน · สาขาฮัมเบอร์ · รายงานต่อ ดานา แอล.
          </div>
        </div>
        <div className="row" style={{gap: 8, flexShrink: 0, position:"relative", flexWrap:"wrap"}}>
          <span className="tag sage">กำลังทำงาน</span>
          <span className="tag">พนักงานประจำ</span>
          <span className="tag">เริ่มงาน ต.ค. 2567</span>
        </div>
      </div>

      <div className="tabs" style={{marginBottom: 20}}>
        {[["personal","ข้อมูลส่วนตัว"],["job","ตำแหน่งและค่าตอบแทน"],["emergency","ติดต่อฉุกเฉิน"],["docs","เอกสาร"],["tax","ภาษี"]].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      {tab === "personal" && (
        <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 16}}>
          <div className="card">
            <div className="eyebrow">ข้อมูลส่วนตัว</div>
            <h3 style={{marginTop: 6, marginBottom: 16}}>รายละเอียดพื้นฐาน</h3>
            <div className="col" style={{gap: 14}}>
              {[
                ["ชื่อ-นามสกุลตามบัตรประชาชน","จงรักษ์ ทานากะ"],
                ["ชื่อเล่น","จงรักษ์"],
                ["วันเกิด","12 สิงหาคม 2534"],
                ["เพศ","หญิง"],
                ["สถานภาพสมรส","สมรส"],
                ["เลขบัตรประชาชน","•••-•••-221"],
              ].map(([l,v]) => (
                <div key={l} className="row" style={{borderBottom:"1px solid var(--line-2)", paddingBottom: 10}}>
                  <div style={{fontSize: 13, color:"var(--ink-3)", width: 180, flexShrink: 0}}>{l}</div>
                  <div style={{fontSize: 14, fontWeight: 500}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="eyebrow">ช่องทางติดต่อ</div>
            <h3 style={{marginTop: 6, marginBottom: 16}}>วิธีติดต่อคุณ</h3>
            <div className="col" style={{gap: 14}}>
              {[
                ["อีเมลที่ทำงาน","jongrak.tanaka@humi.shop"],
                ["อีเมลส่วนตัว","jongrak.tanaka@proton.me"],
                ["เบอร์มือถือ","+66 (02) 555-0188"],
                ["ที่อยู่","241 ถ.สุขุมวิท แขวงคลองตัน กรุงเทพฯ 10110"],
                ["ภาษาที่ใช้","ภาษาไทย"],
              ].map(([l,v]) => (
                <div key={l} className="row" style={{borderBottom:"1px solid var(--line-2)", paddingBottom: 10}}>
                  <div style={{fontSize: 13, color:"var(--ink-3)", width: 140, flexShrink: 0}}>{l}</div>
                  <div style={{fontSize: 14, fontWeight: 500}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "job" && (
        <div className="grid" style={{gridTemplateColumns: "1.3fr 1fr", gap: 16}}>
          <div className="card">
            <div className="eyebrow">ตำแหน่งปัจจุบัน</div>
            <h3 style={{marginTop: 6, marginBottom: 16}}>ข้อมูลตำแหน่งงาน</h3>
            <div className="col" style={{gap: 14}}>
              {[
                ["ชื่อตำแหน่ง","ผู้จัดการร้าน ระดับ 2"],
                ["สายงาน","ปฏิบัติการร้านค้าปลีก"],
                ["ระดับ","R-06"],
                ["ศูนย์ต้นทุน","RTL-HUM-0412"],
                ["สถานที่ทำงาน","สาขาฮัมเบอร์, กรุงเทพฯ"],
                ["ประเภทการจ้าง","พนักงานประจำ · เงินเดือน"],
                ["หัวหน้า","ดานา แอล., ผู้จัดการเขต"],
                ["วันเริ่มงาน","14 ตุลาคม 2567"],
              ].map(([l,v]) => (
                <div key={l} className="row" style={{borderBottom:"1px solid var(--line-2)", paddingBottom: 10}}>
                  <div style={{fontSize: 13, color:"var(--ink-3)", width: 160, flexShrink: 0}}>{l}</div>
                  <div style={{fontSize: 14, fontWeight: 500}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col" style={{gap: 16}}>
            <div className="card">
              <div className="eyebrow">ค่าตอบแทน</div>
              <h3 style={{marginTop: 6}}>฿72,400 / เดือน</h3>
              <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 4}}>จ่ายทุก 2 สัปดาห์ · ครั้งถัดไป 26 เม.ย.</div>
              <hr className="divider"/>
              <div className="col" style={{gap: 10, fontSize: 13}}>
                <div className="row"><span style={{color:"var(--ink-3)"}}>เงินเดือนพื้นฐาน</span><div className="spacer"/><b>฿72,400</b></div>
                <div className="row"><span style={{color:"var(--ink-3)"}}>โบนัสรายไตรมาส</span><div className="spacer"/><b>สูงสุด 8%</b></div>
                <div className="row"><span style={{color:"var(--ink-3)"}}>หุ้นบริษัท</span><div className="spacer"/><b>1,200 RSU</b></div>
              </div>
            </div>
            <div className="card">
              <div className="eyebrow">ประวัติการทำงาน</div>
              <div className="col" style={{gap: 14, marginTop: 10}}>
                {[
                  {t:"ผู้จัดการร้าน ระดับ 2", d:"ต.ค. 2567 – ปัจจุบัน", loc:"สาขาฮัมเบอร์", tone:"teal"},
                  {t:"ผู้ช่วยผู้จัดการ", d:"มิ.ย. 2566 – ต.ค. 2567", loc:"สาขาควีน", tone:"coral"},
                  {t:"พนักงานอาวุโส", d:"มี.ค. 2565 – มิ.ย. 2566", loc:"สาขาควีน", tone:"sage"},
                ].map(r => (
                  <div key={r.t} className="row">
                    <div style={{width: 6, alignSelf:"stretch", background:`var(--${r.tone === 'butter' ? 'butter' : r.tone})`, borderRadius: 3}}/>
                    <div>
                      <div style={{fontWeight: 600, fontSize: 14}}>{r.t}</div>
                      <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.d} · {r.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "emergency" && (
        <div className="card">
          <h3>ผู้ติดต่อกรณีฉุกเฉิน</h3>
          <p style={{color:"var(--ink-3)", fontSize: 13, marginTop: 6}}>กรุณาให้ข้อมูลอย่างน้อย 1 คนเป็นปัจจุบัน ใช้เฉพาะกรณีฉุกเฉินในที่ทำงานเท่านั้น</p>
          <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16}}>
            {[
              {n:"แซม เรเยส", r:"คู่สมรส", p:"+66 (02) 555-0233", c:"SR", t:"teal"},
              {n:"เอเลน่า เรเยส", r:"มารดา", p:"+66 (02) 555-1144", c:"ER", t:"sage"},
            ].map(c => (
              <div key={c.n} className="card tight" style={{background:"var(--cream-2)"}}>
                <div className="row">
                  <div className={"avatar " + c.t}>{c.c}</div>
                  <div>
                    <div style={{fontWeight: 600}}>{c.n}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)"}}>{c.r} · {c.p}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tab === "docs" || tab === "tax") && (
        <div className="card">
          <h3>{tab === "docs" ? "เอกสารของฉัน" : "แบบฟอร์มภาษี"}</h3>
          <div className="list" style={{marginTop: 10}}>
            {[
              {n: tab==="tax" ? "ภ.ง.ด. 91 ปี 2568" : "สัญญาจ้างงานที่ลงนาม", d:"ก.พ. 2568", s:"sage"},
              {n: tab==="tax" ? "หนังสือรับรองการหักภาษี ณ ที่จ่าย" : "เอกสารรับรองสิทธิทำงาน", d:"ม.ค. 2568", s:"sage"},
              {n: tab==="tax" ? "50 ทวิ — ปี 2567" : "ใบรับรองคู่มือพนักงาน", d:"ธ.ค. 2567", s:""},
            ].map(d => (
              <div key={d.n} className="row-item">
                <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <Ic.doc size={18}/>
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{d.n}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>ยื่นเมื่อ {d.d}</div>
                </div>
                <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}><Ic.download size={13}/> ดาวน์โหลด</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
window.ProfileScreen = ProfileScreen;

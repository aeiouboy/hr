// IntegrationsScreen.jsx + FeaturesScreen.jsx (Thai)
function IntegrationsScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("all");

  const Mark = ({ shape, color }) => (
    <div style={{width: 44, height: 44, borderRadius: 12, background: color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink: 0}}>
      {shape === "square" && <div style={{width: 18, height: 18, background:"#fff", borderRadius: 3}}/>}
      {shape === "circle" && <div style={{width: 18, height: 18, background:"#fff", borderRadius: 999}}/>}
      {shape === "triangle" && <div style={{width: 0, height: 0, borderLeft:"10px solid transparent", borderRight:"10px solid transparent", borderBottom:"16px solid #fff"}}/>}
      {shape === "bars" && <div style={{display:"flex", gap: 3}}><span style={{width: 4, height: 16, background:"#fff"}}/><span style={{width: 4, height: 10, background:"#fff"}}/><span style={{width: 4, height: 18, background:"#fff"}}/></div>}
      {shape === "split" && <div style={{width: 20, height: 20, background:"linear-gradient(90deg, #fff 50%, rgba(255,255,255,0.4) 50%)", borderRadius: 4}}/>}
      {shape === "diamond" && <div style={{width: 16, height: 16, background:"#fff", transform:"rotate(45deg)"}}/>}
    </div>
  );

  const integrations = [
    {n:"ShopRegister POS", cat:"pos", desc:"เชื่อมข้อมูลเวลาทำงานกับระบบเครื่องคิดเงิน", status:"connected", shape:"square", color:"#0E1B2C"},
    {n:"Payroll.ca", cat:"payroll", desc:"ส่งชั่วโมงที่อนุมัติแล้วและรายการหักเข้าระบบเงินเดือน", status:"connected", shape:"bars", color:"#0E1B2C"},
    {n:"SlackChat", cat:"comms", desc:"ส่งประกาศไปยังช่องของทีมอัตโนมัติ", status:"connected", shape:"circle", color:"#E08864"},
    {n:"Tempo Scheduling", cat:"schedule", desc:"ข้อมูลการลาไหลเข้าปฏิทินกะงาน", status:"available", shape:"triangle", color:"#9BB5A0"},
    {n:"RetailMetrics", cat:"pos", desc:"เปรียบเทียบคนกับยอดขายในแดชบอร์ดเดียว", status:"available", shape:"split", color:"#E8C46B"},
    {n:"BookWise Payroll", cat:"payroll", desc:"ยื่นภาษีผ่านนักบัญชีของคุณ", status:"available", shape:"diamond", color:"#243447"},
    {n:"Benefit Broker", cat:"benefits", desc:"ซิงค์การลงทะเบียนและเปลี่ยนแปลงข้อมูลประกัน", status:"available", shape:"circle", color:"#1FA8A0"},
    {n:"LearnFloor", cat:"training", desc:"มอบหมายหลักสูตรฝึกอบรมสำหรับพนักงานใหม่", status:"available", shape:"square", color:"#C8553D"},
    {n:"Google Workspace", cat:"comms", desc:"SSO สำหรับผู้จัดการและพนักงานสำนักงานใหญ่", status:"connected", shape:"split", color:"#5A6A7E"},
  ];

  const cats = [["all","ทั้งหมด"],["pos","POS"],["payroll","เงินเดือน"],["schedule","จัดตารางกะ"],["comms","การสื่อสาร"],["benefits","สวัสดิการ"],["training","ฝึกอบรม"]];
  const filtered = tab === "all" ? integrations : integrations.filter(i => i.cat === tab);

  return (
    <>
      <window.Topbar title="จัดการระบบ" subtitle="เชื่อมต่อเครื่องมือที่ธุรกิจค้าปลีกของคุณใช้อยู่แล้ว" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.plus size={16}/> ขอระบบใหม่</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 22}}>
        {[
          {l:"เชื่อมต่อแล้ว", v:"4", c:"var(--accent)"},
          {l:"กำลังซิงค์", v:"2", c:"var(--coral)"},
          {l:"เหตุการณ์วันนี้", v:"284", c:"var(--sage)"},
          {l:"ประหยัดต่อสัปดาห์", v:"6.3 ชม.", c:"var(--butter)"},
        ].map(s => (
          <div key={s.l} className="card tight" style={{borderLeft: `4px solid ${s.c}`}}>
            <div className="eyebrow">{s.l}</div>
            <div style={{fontFamily:"var(--font-display)", fontSize: 30, fontWeight: 700, marginTop: 4, letterSpacing:"-0.02em"}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="row" style={{marginBottom: 16}}>
        <div className="tabs">
          {cats.map(([k,l]) => (
            <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
          ))}
        </div>
        <div className="spacer"/>
        <div className="search" style={{maxWidth: 260}}>
          <Ic.search size={14}/><span>ค้นหาระบบ…</span>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 16}}>
        {filtered.map(i => (
          <div key={i.n} className="card">
            <div className="row">
              <Mark shape={i.shape} color={i.color}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{fontWeight: 600, fontSize: 15}}>{i.n}</div>
                <div style={{fontSize: 12, color:"var(--ink-3)"}}>{cats.find(c=>c[0]===i.cat)?.[1] || i.cat}</div>
              </div>
              {i.status === "connected"
                ? <span className="tag sage"><Ic.check size={11}/> เชื่อมต่อแล้ว</span>
                : <span className="tag">ยังไม่เชื่อม</span>}
            </div>
            <p style={{fontSize: 13, color:"var(--ink-2)", marginTop: 14, lineHeight: 1.6}}>{i.desc}</p>
            <hr className="divider"/>
            <div className="row">
              {i.status === "connected" ? (
                <>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>ซิงค์ล่าสุด · 4 นาทีที่แล้ว</div>
                  <div className="spacer"/>
                  <div className="toggle on" title="เปิดใช้"/>
                </>
              ) : (
                <>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>ติดตั้ง 5 นาที</div>
                  <div className="spacer"/>
                  <button className="btn btn-ghost" style={{padding:"7px 14px", fontSize: 13}}>เชื่อมต่อ <Ic.link size={13}/></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function FeaturesScreen({ onNav }) {
  const Ic = window.I;
  const feats = [
    {tone:"", t:"ลางานและวันหยุด", b:"คำขอ อนุมัติ วันคงเหลือ ดูการครอบคลุมของทีม — รวมในที่เดียว", i:"calendar"},
    {tone:"coral", t:"ประกาศ", b:"โพสต์ ปักหมุด รีแอค คอมเมนต์ แยกช่องตามสาขา เขต หรือบริษัท", i:"mega"},
    {tone:"sage", t:"สวัสดิการและเอกสาร", b:"ลงทะเบียน สลิปเงินเดือน แบบฟอร์มภาษี ผู้อุปการะ การลงนามนโยบาย", i:"heart"},
    {tone:"butter", t:"รายชื่อบุคลากร", b:"ใครอยู่ที่ไหน ทุกสาขา พร้อมผู้ติดต่อฉุกเฉินและประวัติฝึกอบรม", i:"people"},
    {tone:"", t:"คลังข้อมูลกฎระเบียบ", b:"นโยบายเฉพาะค้าปลีกและเทมเพลตกฎหมายแรงงานที่เป็นปัจจุบัน", i:"shield"},
    {tone:"coral", t:"เชื่อม POS และเงินเดือน", b:"เชื่อมต่อระบบเดียวคลิกสำหรับเครื่องมือที่ร้านคุณใช้อยู่", i:"plug"},
    {tone:"sage", t:"มือถือพร้อมใช้หน้าร้าน", b:"พนักงานเข้างาน ยื่นลา อ่านข่าวสารจากโทรศัพท์ได้ทันที", i:"clock"},
    {tone:"butter", t:"ติดตามการฝึกอบรม", b:"มอบหมาย เตือน ตรวจสอบ รู้ว่าพนักงานทุกคนผ่านการอบรมก่อนเปิดร้าน", i:"book"},
    {tone:"", t:"ปรับสีธีม", b:"ปรับ Humi ให้เข้ากับแบรนด์ของคุณ — หรืออัตลักษณ์ของร้าน", i:"palette"},
  ];

  return (
    <>
      <window.Topbar title="ฟีเจอร์ทั้งหมด" subtitle="ทุกอย่างที่ Humi ช่วยทีมค้าปลีกของคุณ" onNav={onNav}
        actions={<button className="btn btn-primary" onClick={() => onNav && onNav('requests')}><Ic.plus size={14}/> สร้างคำร้องใหม่</button>}/>

      <div className="card grain" style={{background: "linear-gradient(110deg, var(--ink) 0%, #1a2b42 100%)", color:"#FCFAF5", border: 0, padding: 40, marginBottom: 22, overflow:"hidden", position:"relative"}}>
        <div className="blob teal"   style={{width: 160, height: 200, right: -30, top: -40, opacity:.45}}/>
        <div className="blob coral"  style={{width: 100, height: 120, right: 140, bottom: -30, opacity:.5}}/>
        <div className="eyebrow" style={{color:"var(--accent)"}}>ออกแบบสำหรับค้าปลีก</div>
        <h1 style={{fontSize: 52, marginTop: 10, maxWidth: 700, color:"#FCFAF5"}}>Humi อยู่เคียงข้างทีมหน้าร้านของคุณ</h1>
        <p style={{fontSize: 16, color:"rgba(231,227,216,0.8)", marginTop: 12, maxWidth: 560, lineHeight: 1.6, textWrap:"pretty"}}>
          ที่เดียวครบสำหรับแบบฟอร์ม นโยบาย สลิปเงินเดือน และประกาศที่ทีมของคุณต้องใช้จริง — โดยไม่ต้องใช้ระบบใหญ่โตแบบองค์กรยักษ์
        </p>
      </div>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 16}}>
        {feats.map(f => {
          const G = Ic[f.i];
          return (
            <div key={f.t} className={"feature " + f.tone}>
              <div className="ico-wrap"><G size={22}/></div>
              <h3 style={{fontSize: 18}}>{f.t}</h3>
              <p style={{color:"var(--ink-2)", fontSize: 14, lineHeight: 1.6, textWrap:"pretty"}}>{f.b}</p>
              <a style={{fontSize: 13, fontWeight: 600, color:"var(--ink)", textDecoration:"none", marginTop:"auto", display:"inline-flex", gap: 6, alignItems:"center"}}>
                เรียนรู้เพิ่มเติม <Ic.arrow size={13}/>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

window.IntegrationsScreen = IntegrationsScreen;
window.FeaturesScreen = FeaturesScreen;

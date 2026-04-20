// LearningScreen.jsx (Thai)
function LearningScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("assigned");

  return (
    <>
      <window.Topbar title="การเรียนรู้" subtitle="หลักสูตรที่ได้รับมอบหมาย ใบรับรอง และคลังคอร์ส" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.book size={14}/> ดูคลังคอร์ส</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1.3fr 1fr 1fr", gap: 16, marginBottom: 20}}>
        <div className="card grain" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 80%)", border: 0, overflow:"hidden", position:"relative"}}>
          <div className="blob teal" style={{width: 90, height: 110, right: -20, bottom: -30, opacity:.55}}/>
          <div className="eyebrow">เส้นทางของคุณ</div>
          <h3 style={{marginTop: 6, fontSize: 22}}>ผู้นำค้าปลีก — ปีที่ 1</h3>
          <p style={{fontSize: 13, color:"var(--ink-2)", marginTop: 6}}>เรียนจบ 5 จาก 11 โมดูล · เหลือ 2.3 ชม. ในเดือนนี้</p>
          <div className="progress" style={{marginTop: 16}}><span style={{width: "45%"}}/></div>
          <button className="btn btn-primary" style={{marginTop: 14}}>เรียนต่อ</button>
        </div>
        <div className="card">
          <div className="eyebrow">ใบรับรอง</div>
          <h3 style={{marginTop: 6}}>ใช้งานอยู่ 3 ใบ</h3>
          <div className="col" style={{gap: 8, marginTop: 12}}>
            {[["ปฐมพยาบาล","หมดอายุ ต.ค. 2570","sage"],["ความปลอดภัยอาหาร","หมดอายุ ก.พ. 2569","butter"],["การลดความขัดแย้ง","ออกเมื่อ มี.ค. 2568","teal"]].map(([n,d,t]) => (
              <div key={n} className="row" style={{fontSize: 13}}>
                <span className={"tag " + t} style={{padding:"2px 8px", fontSize: 11}}>●</span>
                <div style={{flex:1}}>{n}</div>
                <span style={{fontSize: 12, color:"var(--ink-3)"}}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="eyebrow">ความพร้อมด้านกฎระเบียบ</div>
          <h3 style={{marginTop: 6}}>ตรงเวลา 100%</h3>
          <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 6}}>ไม่มีการอบรมล่าช้าในทีมของคุณ</div>
          <div className="row" style={{marginTop: 12, gap: -6}}>
            {["MK","PS","TS","JN","RP"].map((n,i) => (
              <div key={n} className={"avatar " + ["teal","coral","sage","ink","teal"][i]} style={{width: 26, height: 26, fontSize: 10, marginLeft: i===0?0:-6, border: "2px solid var(--paper)"}}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="tabs" style={{marginBottom: 16}}>
        {[["assigned","มอบหมายให้ฉัน (ครบกำหนด 2)"],["progress","กำลังเรียน"],["catalog","คลังคอร์ส"],["history","เรียนจบแล้ว"]].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 16}}>
        {[
          {t:"ทบทวนการต่อต้านการคุกคามปี 2568", d:"บังคับ · 25 นาที", due:"ครบกำหนด 30 เม.ย.", tag:"butter", tone:"coral", ic:"shield", act:"เริ่ม"},
          {t:"ต่ออายุใบรับรองความปลอดภัยอาหาร", d:"บังคับ · 45 นาที", due:"ครบกำหนด 12 พ.ค.", tag:"butter", tone:"sage", ic:"coffee", act:"เริ่ม"},
          {t:"การโค้ชสำหรับหัวหน้ากะ", d:"ได้รับมอบหมาย · 1 ชม. 20 นาที", due:"โมดูล 3 จาก 6", tag:"", tone:"", ic:"people", act:"เรียนต่อ"},
          {t:"การใช้ POS ระดับผู้จัดการ (ใหม่)", d:"เรียนเอง · 15 นาที", due:"ยังไม่เริ่ม", tag:"", tone:"", ic:"plug", act:"เริ่ม"},
          {t:"การสนทนาเรื่องยาก", d:"เวิร์คช็อป · 2 ชั่วโมง", due:"ไลฟ์ · 6 พ.ค. 13:00", tag:"accent", tone:"coral", ic:"mega", act:"เริ่ม"},
          {t:"ความหลากหลายและการมีส่วนร่วม", d:"เรียนเอง · 35 นาที", due:"เรียนจบ 50%", tag:"", tone:"sage", ic:"heart", act:"เรียนต่อ"},
        ].map(c => {
          const G = Ic[c.ic];
          return (
            <div key={c.t} className="feature">
              <div className="row">
                <div className="ico-wrap"><G size={20}/></div>
                {c.tag && <span className={"tag " + c.tag} style={{marginLeft:"auto"}}>{c.tag === "butter" ? "บังคับ" : "ไลฟ์"}</span>}
              </div>
              <h3 style={{fontSize: 17, lineHeight: 1.4}}>{c.t}</h3>
              <div style={{fontSize: 13, color:"var(--ink-3)"}}>{c.d}</div>
              <hr className="divider" style={{margin: "auto 0 10px"}}/>
              <div className="row">
                <span style={{fontSize: 13, color:"var(--ink-2)"}}>{c.due}</span>
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>{c.act} <Ic.arrow size={12}/></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

window.LearningScreen = LearningScreen;

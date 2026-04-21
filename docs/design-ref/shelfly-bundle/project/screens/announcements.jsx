// AnnouncementsScreen.jsx (Thai)
function AnnouncementsScreen({ onNav }) {
  const Ic = window.I;
  const [filter, setFilter] = React.useState("all");

  const posts = [
    {who:"ฝ่ายปฏิบัติการร้าน", av:"SO", c:"teal", when:"2 ชม. ที่แล้ว", channel:"ทุกสาขา", pin:true,
     title:"ตรวจนับสินค้าประจำฤดูใบไม้ผลิ — เสาร์ 9 โมงเช้า",
     body:"ทั้ง 5 สาขาในเขตฮัมเบอร์จะปิดก่อนกำหนด 30 นาทีในวันศุกร์เพื่อเตรียมงาน ค่าแรงตามอัตรากะ + มีอาหารให้ โปรดสวมรองเท้าที่สบาย เราต้องยืนตั้งแต่เปิดร้าน",
     r:["👍 14","🙌 6","🛒 3"], comments: 8, kind:"ops"},
    {who:"จอร์แดน เหมย · ฝ่ายบุคคล", av:"JM", c:"sage", when:"เมื่อวาน", channel:"บริษัท",
     title:"นโยบายลาคลอดใหม่เริ่มใช้ 1 พฤษภาคม",
     body:"เราขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยได้รับค่าจ้างเต็มทุกพื้นที่ เซสชันถามตอบวันพฤหัสบดี 15:00 น. — ลิงก์จะส่งให้ทุกคนในเช้าพรุ่งนี้",
     r:["❤️ 42","🎉 21","👏 9"], comments: 14, kind:"policy"},
    {who:"ดานา แอล. · ระดับเขต", av:"DL", c:"coral", when:"วันจันทร์", channel:"เขตฮัมเบอร์",
     title:"คนเด่นประจำเดือนเมษายน: สาขาฮัมเบอร์ลดการสูญเสียสินค้าสูงสุด",
     body:"ขอบคุณทีมหน้าร้านทุกคน — เราลดการสูญเสียสินค้าได้ 31% เทียบกับเดือนมีนาคม เลี้ยงอาหารค่ำศุกร์นี้หลังปิดร้าน ตอบกลับเพื่อยืนยันการเข้าร่วม",
     r:["🎉 34","❤️ 12"], comments: 22, kind:"recog"},
    {who:"ฝ่ายไอทีและระบบ", av:"IT", c:"ink", when:"18 เม.ย.", channel:"ทุกสาขา",
     title:"ช่วงเวลาบำรุงรักษา POS — อังคาร 02:00–04:00 น.",
     body:"ไม่กระทบกับลูกค้า รายงานหลังร้านจะใช้งานไม่ได้ชั่วระยะสั้น",
     r:["👍 6"], comments: 1, kind:"ops"},
  ];

  const filtered = filter === "all" ? posts : posts.filter(p => p.kind === filter);

  return (
    <>
      <window.Topbar title="ประกาศ" subtitle="ฟีดของทีมและบริษัท" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.plus size={16}/> โพสต์ใหม่</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1fr 320px", gap: 20}}>
        <div>
          <div className="card" style={{padding: 16, marginBottom: 18}}>
            <div className="row" style={{alignItems:"flex-start"}}>
              <div className="avatar coral">จท</div>
              <div style={{flex:1}}>
                <div style={{padding: "10px 14px", background: "var(--cream-2)", borderRadius: 12, color:"var(--ink-3)", fontSize: 14, cursor:"text"}}>
                  แบ่งปันข่าวสารกับทีมของคุณ…
                </div>
                <div className="row" style={{marginTop: 10, gap: 6}}>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}><Ic.mega size={13}/> ประกาศ</button>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}><Ic.smile size={13}/> ชื่นชม</button>
                  <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}><Ic.doc size={13}/> แนบไฟล์</button>
                  <div className="spacer"/>
                  <button className="btn btn-accent" style={{padding:"6px 12px", fontSize: 12}}><Ic.send size={12}/> โพสต์</button>
                </div>
              </div>
            </div>
          </div>

          <div className="row" style={{marginBottom: 14}}>
            <div className="tabs">
              {[["all","ทั้งหมด"],["ops","ปฏิบัติการ"],["policy","นโยบาย"],["recog","ยกย่องชมเชย"]].map(([k,l]) => (
                <div key={k} className={"tab " + (filter===k?"active":"")} onClick={() => setFilter(k)}>{l}</div>
              ))}
            </div>
            <div className="spacer"/>
            <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}><Ic.filter size={13}/> เขตฮัมเบอร์</button>
          </div>

          {filtered.map(p => (
            <div key={p.title} className="post" style={{...(p.pin ? {borderColor:"transparent", background:"var(--accent-soft)"} : {}), marginBottom: 12}}>
              <div className="row">
                <div className={"avatar " + p.c}>{p.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13}}><b>{p.who}</b> <span style={{color:"var(--ink-3)"}}>· {p.channel} · {p.when}</span></div>
                </div>
                {p.pin && <span className="tag ink"><Ic.pin size={11}/> ปักหมุด</span>}
                <button className="icon-btn" style={{width: 28, height: 28, background:"transparent", border: 0}}><Ic.more size={16}/></button>
              </div>
              <h3 style={{fontSize: 22, marginTop: 12, letterSpacing:"-0.015em"}}>{p.title}</h3>
              <p style={{color:"var(--ink-2)", fontSize: 14, marginTop: 8, lineHeight: 1.6, textWrap:"pretty"}}>{p.body}</p>
              <div className="row" style={{marginTop: 14, gap: 8, flexWrap:"wrap"}}>
                {p.r.map(x => <span key={x} className="tag">{x}</span>)}
                <span className="tag">+ <Ic.smile size={12}/></span>
                <div className="spacer"/>
                <span style={{fontSize: 13, color:"var(--ink-3)"}}>{p.comments} ความคิดเห็น</span>
              </div>
            </div>
          ))}
        </div>

        <div className="col" style={{gap: 16}}>
          <div className="card">
            <div className="eyebrow">ช่องทางของคุณ</div>
            <div className="col" style={{gap: 6, marginTop: 10}}>
              {[
                {n:"ทุกสาขา", s:"312 คน", d:"teal"},
                {n:"เขตฮัมเบอร์", s:"48 คน", d:"coral"},
                {n:"ทีมสาขาฮัมเบอร์", s:"16 คน", d:"sage"},
                {n:"กลุ่มผู้จัดการร้าน", s:"26 คน", d:"butter"},
              ].map(ch => (
                <div key={ch.n} className="row" style={{padding: "8px 4px", borderRadius: 8, cursor:"pointer"}}>
                  <div style={{width: 8, height: 8, borderRadius: 2, background:`var(--${ch.d==="butter"?"butter":ch.d})`}}/>
                  <div style={{flex:1, fontSize: 14, fontWeight: 500}}># {ch.n}</div>
                  <span style={{fontSize: 12, color:"var(--ink-3)"}}>{ch.s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{background:"var(--coral-soft)", border: 0}}>
            <div className="eyebrow" style={{color:"#7A3A1E"}}>ร่าง</div>
            <h3 style={{marginTop: 6, fontSize: 18}}>ผู้ชนะการแข่งขันยอดขายสิ้นเดือน</h3>
            <p style={{fontSize: 13, color:"var(--ink-2)", marginTop: 6}}>บันทึก 2 วันที่แล้ว · แก้ไข 3 ครั้ง</p>
            <button className="btn btn-primary" style={{marginTop: 12}}>เขียนต่อและโพสต์</button>
          </div>
          <div className="card">
            <div className="eyebrow">แนวทางการสื่อสาร</div>
            <p style={{fontSize: 13, color:"var(--ink-2)", marginTop: 8, lineHeight: 1.6}}>
              โพสต์ให้สั้น เริ่มจากสิ่งที่เปลี่ยนแปลงสำหรับทีม ไม่ใช่เหตุผล กดรีแอคชันเพื่อยืนยันว่าคุณได้อ่านแล้ว
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
window.AnnouncementsScreen = AnnouncementsScreen;

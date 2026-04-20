// HomeScreen.jsx — dashboard landing (Thai)
function HomeScreen({ onNav }) {
  const Ic = window.I;
  return (
    <>
      <window.Topbar title="หน้าหลัก" onNav={onNav} actions={
        <button className="btn btn-primary"><Ic.plus size={16}/> สร้างคำขอใหม่</button>
      }/>

      {/* Hero greeting card */}
      <div className="grid" style={{gridTemplateColumns: "1.35fr 1fr", gap: 20}}>
        <div className="card hero grain" style={{overflow:"hidden", paddingRight: 150}}>
          <div className="eyebrow" style={{marginBottom: 10}}>วันอังคาร · 21 เมษายน</div>
          <h1 style={{fontSize: 33, fontWeight: 600, maxWidth: 460, color:"var(--ink)"}}>ยินดีต้อนรับกลับมา คุณจงรักษ์<br/>
            <span style={{color: "var(--ink-3)"}}>มี 2 เรื่องที่ต้องดำเนินการวันนี้</span>
          </h1>
          <div className="row" style={{marginTop: 22, gap: 10, flexWrap:"wrap"}}>
            <button className="btn btn-accent" onClick={() => onNav("timeoff")}>
              <Ic.check size={16}/> อนุมัติคำขอลา 2 รายการ
            </button>
            <button className="btn btn-ghost" onClick={() => onNav("announce")}>
              <Ic.mega size={16}/> ตรวจสอบร่างประกาศ
            </button>
          </div>
          <div className="blob teal"  style={{width: 120, height: 150, right: -30, top: -30,  opacity: .85}}/>
          <div className="blob coral" style={{width: 80,  height: 100, right: 60,  bottom: -20, opacity: .7}}/>
          <div className="blob butter" style={{width: 44, height: 56, right: 110, top: 80,  opacity: .9}}/>
        </div>

        <div className="card">
          <div className="row" style={{alignItems:"flex-start"}}>
            <div>
              <div className="eyebrow">วันนี้ที่สาขาฮัมเบอร์</div>
              <h3 style={{marginTop: 6}}>ทีมพร้อมทำงาน</h3>
            </div>
            <span className="tag accent" style={{marginLeft:"auto"}}>สด</span>
          </div>
          <div className="row" style={{marginTop: 18, gap: 20}}>
            <div className="ring" style={{"--p": 68}}>
              <div style={{position:"relative", textAlign:"center", zIndex: 1}}>
                <div className="val">11/16</div>
                <div style={{fontSize: 10, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-3)"}}>กำลังทำงาน</div>
              </div>
            </div>
            <div className="col" style={{gap: 10, flex: 1}}>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--accent)"}}/> <span>เข้างานแล้ว</span></div>
                <b>11</b>
              </div>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--coral)"}}/> <span>ลางาน</span></div>
                <b>3</b>
              </div>
              <div className="row" style={{justifyContent:"space-between"}}>
                <div className="row"><span style={{width:8, height:8, borderRadius: 999, background:"var(--line)"}}/> <span>นอกกะ</span></div>
                <b>2</b>
              </div>
            </div>
          </div>
          <hr className="divider"/>
          <div className="row" style={{gap: -6}}>
            {["MK","TS","RP","JC","LN"].map((i, n) => (
              <div key={i} className={"avatar " + ["","teal","sage","coral","ink"][n]}
                   style={{marginLeft: n===0 ? 0 : -8, border: "2px solid var(--paper)", width: 30, height: 30, fontSize: 11}}>{i}</div>
            ))}
            <div style={{fontSize: 13, color:"var(--ink-3)", marginLeft: 8}}>+ อีก 6 คนกำลังทำงาน</div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid" style={{gridTemplateColumns: "1.35fr 1fr", gap: 20, marginTop: 20}}>
        <div className="card">
          <div className="row" style={{marginBottom: 6}}>
            <div>
              <div className="eyebrow">รออนุมัติจากคุณ</div>
              <h3 style={{marginTop: 6}}>คำขอลางาน</h3>
            </div>
            <span className="tag coral" style={{marginLeft:"auto"}}>รอ 2 รายการ</span>
          </div>
          <div className="list">
            {[
              {n:"มาร์คัส เคลลี่", r:"ลาพักร้อน", w:"28 เม.ย. – 2 พ.ค.", c:"MK", t:"teal", d:"ยื่นเมื่อวาน"},
              {n:"พริยะ ชาห์",    r:"ลาป่วย",     w:"พรุ่งนี้",         c:"PS", t:"coral", d:"1 ชม. ที่แล้ว"},
            ].map(row => (
              <div key={row.n} className="row-item">
                <div className={"avatar " + row.t}>{row.c}</div>
                <div>
                  <div style={{fontWeight:600, fontSize: 14}}>{row.n} <span style={{color:"var(--ink-3)", fontWeight: 400}}>· {row.r}</span></div>
                  <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 2}}>{row.w} &nbsp;•&nbsp; {row.d}</div>
                </div>
                <div className="row" style={{gap: 6}}>
                  <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>ปฏิเสธ</button>
                  <button className="btn btn-accent" style={{padding:"7px 12px", fontSize: 13}}>อนุมัติ</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card cream">
          <div className="eyebrow">รอการดำเนินการ</div>
          <h3 style={{marginTop: 6, marginBottom: 14}}>เอกสารรอลงนาม</h3>
          {[
            {t:"ลงทะเบียนสวัสดิการปี 2568", sub:"ครบกำหนดใน 6 วัน", tag: "butter", due:true},
            {t:"ระเบียบการปฏิบัติงานฉบับใหม่", sub:"รับทราบและลงนาม", tag:"sage"},
          ].map(d => (
            <div key={d.t} className="row" style={{padding:"12px 0", borderTop:"1px solid var(--line-2)"}}>
              <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--paper)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Ic.doc size={18}/>
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 600, fontSize: 14}}>{d.t}</div>
                <div style={{fontSize: 12, color:"var(--ink-3)"}}>{d.sub}</div>
              </div>
              {d.due && <span className="tag butter">ใกล้ครบกำหนด</span>}
            </div>
          ))}
          <button className="btn btn-ghost" style={{width:"100%", marginTop: 8}} onClick={() => onNav("benefits")}>
            เอกสารทั้งหมด <Ic.arrow size={14}/>
          </button>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid" style={{gridTemplateColumns: "1.35fr 1fr", gap: 20, marginTop: 20}}>
        <div className="card">
          <div className="row" style={{marginBottom: 12}}>
            <div>
              <div className="eyebrow">จากทีม</div>
              <h3 style={{marginTop: 6}}>ประกาศล่าสุด</h3>
            </div>
            <button className="btn btn-ghost" style={{marginLeft:"auto"}} onClick={() => onNav("announce")}>เปิดฟีด <Ic.arrow size={14}/></button>
          </div>

          {[
            {who:"ฝ่ายปฏิบัติการร้าน", av:"SO", color:"teal", when:"2 ชม. ที่แล้ว", pin: true,
             title:"ตรวจนับสินค้าประจำฤดูใบไม้ผลิ — เสาร์ 9 โมงเช้า",
             body:"ทั้ง 5 สาขาในเขตฮัมเบอร์จะปิดก่อนกำหนด 30 นาทีในวันศุกร์เพื่อเตรียมงาน ค่าแรงตามอัตรากะ + มีอาหารให้",
             r:["👍 14","🙌 6","🛒 3"]},
            {who:"จอร์แดน เหมย · ฝ่ายบุคคล", av:"JM", color:"sage", when:"เมื่อวาน",
             title:"นโยบายลาคลอดใหม่เริ่มใช้ 1 พฤษภาคม",
             body:"เราขยายสิทธิลาคลอดเป็น 16 สัปดาห์โดยได้รับค่าจ้างเต็ม มีเซสชันถามตอบวันพฤหัสบดี 15:00 น.",
             r:["❤️ 42","🎉 21"]},
          ].map(p => (
            <div key={p.title} className="post" style={p.pin ? {borderColor:"transparent", background:"var(--accent-soft)"} : {}}>
              <div className="row">
                <div className={"avatar " + p.color}>{p.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13}}><b>{p.who}</b> <span style={{color:"var(--ink-3)"}}>· {p.when}</span></div>
                </div>
                {p.pin && <span className="tag ink"><Ic.pin size={11}/> ปักหมุด</span>}
              </div>
              <h4 style={{fontFamily:"var(--font-display)", fontSize: 18, marginTop: 10, fontWeight: 600}}>{p.title}</h4>
              <p style={{color:"var(--ink-2)", fontSize: 14, marginTop: 6, lineHeight: 1.6}}>{p.body}</p>
              <div className="row" style={{marginTop: 12, gap: 10}}>
                {p.r.map(x => <span key={x} className="tag">{x}</span>)}
                <div className="spacer"/>
                <button className="btn btn-ghost" style={{padding:"6px 10px", fontSize: 12}}>ตอบกลับ</button>
              </div>
            </div>
          ))}
        </div>

        <div className="col" style={{gap: 20}}>
          <div className="card">
            <div className="row">
              <div>
                <div className="eyebrow">เมษายน 2568</div>
                <h3 style={{marginTop: 6}}>บนปฏิทิน</h3>
              </div>
              <div className="spacer"/>
              <button className="icon-btn" style={{width: 32, height: 32}}><Ic.chevron size={14} style={{transform:"rotate(180deg)"}}/></button>
              <button className="icon-btn" style={{width: 32, height: 32, marginLeft: 4}}><Ic.chevron size={14}/></button>
            </div>
            <div className="cal" style={{marginTop: 14}}>
              {["อา","จ","อ","พ","พฤ","ศ","ส"].map((d, i) => <div key={i} className="dow">{d}</div>)}
              {Array.from({length: 35}).map((_, i) => {
                const day = i - 2;
                const off = day < 1 || day > 30;
                const has = [8, 14, 17, 21, 28].includes(day);
                const sel = day === 21;
                const range = [28, 29, 30].includes(day);
                return (
                  <div key={i} className={"day " + (off?"off ":"") + (has?"has ":"") + (sel?"sel ":"") + (range?"range ":"")}>
                    {off ? "" : day}
                  </div>
                );
              })}
            </div>
            <hr className="divider"/>
            <div className="col" style={{gap: 10}}>
              <div className="row">
                <div style={{width: 6, height: 26, borderRadius: 3, background:"var(--accent)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>ตรวจนับสินค้าทุกสาขา</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>เสาร์ 25 · 9:00–14:00</div>
                </div>
              </div>
              <div className="row">
                <div style={{width: 6, height: 26, borderRadius: 3, background:"var(--coral)"}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize: 13, fontWeight: 600}}>มาร์คัส เค. — ลาพักร้อน</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>28 เม.ย. – 2 พ.ค.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="blob teal"  style={{width: 90, height: 110, right: -20, bottom: -30, opacity:.55}}/>
            <div className="eyebrow" style={{color:"var(--accent)"}}><Ic.party size={12} style={{display:"inline-block", verticalAlign:-2}}/> สัปดาห์นี้</div>
            <h3 style={{marginTop: 8}}>วันเกิด 2 คน · ครบรอบทำงาน 1 คน</h3>
            <div className="row" style={{marginTop: 14, gap: -6}}>
              <div className="avatar teal" style={{border:"2px solid var(--ink)"}}>TS</div>
              <div className="avatar coral" style={{border:"2px solid var(--ink)", marginLeft: -8}}>RP</div>
              <div className="avatar sage" style={{border:"2px solid var(--ink)", marginLeft: -8}}>JC</div>
              <button className="btn btn-accent" style={{marginLeft:"auto"}}>ส่งข้อความอวยพร</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.HomeScreen = HomeScreen;

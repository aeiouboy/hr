// TimeOffScreen.jsx (Thai)
function TimeOffScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("request");
  const [type, setType] = React.useState("vacation");
  const [from, setFrom] = React.useState("28 เม.ย.");
  const [to, setTo] = React.useState("2 พ.ค.");
  const [note, setNote] = React.useState("งานแต่งงานของครอบครัวที่เชียงใหม่");

  return (
    <>
      <window.Topbar title="ลางาน" subtitle="ยื่นคำขอ · อนุมัติ · ติดตาม" onNav={onNav}
        actions={<button className="btn btn-primary"><Ic.plus size={16}/> สร้างคำขอใหม่</button>}/>

      <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20}}>
        {[
          {l:"ลาพักร้อน", v:"8.5", u:"วันคงเหลือ", p:42, tag:"จาก 15 วันต่อปี", color:"var(--accent)"},
          {l:"ลากิจ", v:"3.0", u:"วันคงเหลือ", p:75, tag:"จาก 4 วันต่อปี",  color:"var(--coral)"},
          {l:"ลาป่วย",     v:"ไม่จำกัด", u:"ตามจำเป็น", p:0, tag:"ใช้ไปแล้ว 2 วันในปีนี้", color:"var(--sage)"},
        ].map(s => (
          <div key={s.l} className="card">
            <div className="eyebrow">{s.l}</div>
            <div className="row" style={{alignItems:"baseline", gap: 8, marginTop: 8}}>
              <h2 style={{fontSize: 42, letterSpacing:"-0.03em"}}>{s.v}</h2>
              <span style={{color:"var(--ink-3)", fontSize: 13}}>{s.u}</span>
            </div>
            {s.p > 0 && <div className="progress" style={{marginTop: 14}}><span style={{width: s.p+"%", background: s.color}}/></div>}
            <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 8}}>{s.tag}</div>
          </div>
        ))}
      </div>

      <div className="grid" style={{gridTemplateColumns: "1.2fr 1fr", gap: 20}}>
        <div className="card">
          <div className="tabs">
            <div className={"tab " + (tab==="request"?"active":"")} onClick={() => setTab("request")}>คำขอใหม่</div>
            <div className={"tab " + (tab==="history"?"active":"")} onClick={() => setTab("history")}>ประวัติของฉัน</div>
            <div className={"tab " + (tab==="approve"?"active":"")} onClick={() => setTab("approve")}>รออนุมัติ (2)</div>
          </div>

          {tab === "request" && (
            <div style={{marginTop: 22}}>
              <h3 style={{marginBottom: 4}}>ยื่นคำขอลางาน</h3>
              <p style={{color:"var(--ink-3)", fontSize: 14}}>คำขอที่น้อยกว่า 3 วัน ระบบจะส่งไปยังผู้จัดการร้านของคุณโดยอัตโนมัติ</p>

              <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20}}>
                {[
                  {k:"vacation", l:"ลาพักร้อน", ic:"sun", tone:"teal"},
                  {k:"sick",     l:"ลาป่วย",     ic:"heart", tone:"coral"},
                  {k:"personal", l:"ลากิจ", ic:"coffee", tone:"sage"},
                ].map(opt => {
                  const G = Ic[opt.ic];
                  const on = type === opt.k;
                  return (
                    <button key={opt.k} onClick={() => setType(opt.k)}
                      style={{
                        padding: "16px", borderRadius: 14,
                        border: "1.5px solid " + (on ? "var(--ink)" : "var(--line)"),
                        background: on ? "var(--cream-2)" : "var(--paper)",
                        textAlign: "left", cursor:"pointer", fontFamily:"inherit"
                      }}>
                      <div className={"avatar " + opt.tone} style={{width: 32, height: 32, borderRadius: 10, marginBottom: 10}}><G size={16}/></div>
                      <div style={{fontWeight: 600, fontSize: 14}}>{opt.l}</div>
                      <div style={{fontSize: 12, color:"var(--ink-3)"}}>ได้รับค่าจ้าง</div>
                    </button>
                  );
                })}
              </div>

              <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18}}>
                <div className="field"><label>ตั้งแต่วันที่</label>
                  <input value={from} onChange={e => setFrom(e.target.value)}/>
                </div>
                <div className="field"><label>ถึงวันที่</label>
                  <input value={to} onChange={e => setTo(e.target.value)}/>
                </div>
              </div>
              <div className="field" style={{marginTop: 12}}>
                <label>หมายเหตุถึงหัวหน้า <span style={{color:"var(--ink-4)", fontWeight: 400}}>(ไม่บังคับ)</span></label>
                <textarea value={note} onChange={e => setNote(e.target.value)}
                  style={{padding: 12, border: "1px solid var(--line)", borderRadius: 12, fontFamily:"inherit", fontSize: 14, minHeight: 80, resize:"vertical"}}/>
              </div>

              <div className="card accent" style={{marginTop: 16, padding: 14, display:"flex", gap: 12, alignItems:"center"}}>
                <Ic.check size={18}/>
                <div style={{fontSize: 13}}>
                  ขอลา <b>5 วันทำการ</b> · มีคนทดแทนกะของคุณเพียงพอ
                </div>
              </div>

              <div className="row" style={{marginTop: 18, gap: 10}}>
                <button className="btn btn-primary">ส่งคำขอ</button>
                <button className="btn btn-ghost">บันทึกร่าง</button>
                <div className="spacer"/>
                <span style={{fontSize: 12, color:"var(--ink-3)"}}>ผู้อนุมัติ: ดานา แอล. (เขต)</span>
              </div>
            </div>
          )}

          {tab === "history" && (
            <div style={{marginTop: 18}}>
              <div className="list">
                {[
                  {w:"14 – 17 มี.ค.", t:"ลาพักร้อน", s:"อนุมัติแล้ว", tone:"sage"},
                  {w:"2 ก.พ.",       t:"ลาป่วย",    s:"อนุมัติแล้ว", tone:"sage"},
                  {w:"22 ธ.ค. – 2 ม.ค.", t:"ลาพักร้อน", s:"อนุมัติแล้ว", tone:"sage"},
                  {w:"8 พ.ย.",       t:"ลากิจ",    s:"ไม่อนุมัติ", tone:"coral"},
                ].map(r => (
                  <div key={r.w} className="row-item">
                    <div className="avatar teal">{r.t[0]}</div>
                    <div>
                      <div style={{fontWeight: 600}}>{r.w}</div>
                      <div style={{fontSize: 13, color:"var(--ink-3)"}}>{r.t} · คุณ</div>
                    </div>
                    <span className={"tag " + r.tone}>{r.s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "approve" && (
            <div style={{marginTop: 18}}>
              <div className="list">
                {[
                  {n:"มาร์คัส เคลลี่", r:"ลาพักร้อน · 5 วัน", w:"28 เม.ย. – 2 พ.ค.", c:"MK", tone:"teal"},
                  {n:"พริยะ ชาห์",    r:"ลาป่วย · 1 วัน",   w:"22 เม.ย.",          c:"PS", tone:"coral"},
                ].map(row => (
                  <div key={row.n} className="row-item">
                    <div className={"avatar " + row.tone}>{row.c}</div>
                    <div>
                      <div style={{fontWeight: 600}}>{row.n}</div>
                      <div style={{fontSize: 13, color:"var(--ink-3)"}}>{row.r} · {row.w}</div>
                    </div>
                    <div className="row" style={{gap: 6}}>
                      <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>ปฏิเสธ</button>
                      <button className="btn btn-accent" style={{padding:"7px 12px", fontSize: 13}}>อนุมัติ</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col" style={{gap: 20}}>
          <div className="card">
            <div className="eyebrow">ใครลาเดือนนี้</div>
            <h3 style={{marginTop: 6, marginBottom: 14}}>การครอบคลุมของทีม</h3>
            <div className="col" style={{gap: 10}}>
              {[
                {n:"มาร์คัส เคลลี่", d:"28 เม.ย. – 2 พ.ค.", c:"MK", tone:"teal", w: "55%"},
                {n:"พริยะ ชาห์",    d:"22 เม.ย.",          c:"PS", tone:"coral", w: "18%"},
                {n:"เทย์เลอร์ ซิมส์", d:"10 – 12 พ.ค.",     c:"TS", tone:"sage", w: "30%"},
                {n:"จอร์แดน ไนแลนด์", d:"20 – 25 พ.ค.",    c:"JN", tone:"ink", w: "70%"},
              ].map(p => (
                <div key={p.n}>
                  <div className="row">
                    <div className={"avatar " + p.tone} style={{width: 28, height: 28, fontSize: 11}}>{p.c}</div>
                    <div style={{flex: 1, fontSize: 13}}>{p.n}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)"}}>{p.d}</div>
                  </div>
                  <div style={{marginTop: 6, height: 6, borderRadius: 999, background:"var(--line-2)", position:"relative"}}>
                    <div style={{position:"absolute", left: p.w, width: "12%", height: "100%", background:"var(--accent)", borderRadius: 999}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card ink" style={{overflow:"hidden", position:"relative"}}>
            <div className="blob teal" style={{width: 110, height: 140, right: -30, top: -30, opacity:.6}}/>
            <div className="eyebrow" style={{color:"var(--accent)"}}>นโยบาย</div>
            <h3 style={{marginTop: 6, color:"#FCFAF5"}}>การยกยอดวันลา</h3>
            <p style={{fontSize: 14, color:"rgba(231,227,216,0.8)", marginTop: 8, lineHeight: 1.6}}>
              วันลาพักร้อนที่ไม่ได้ใช้ สูงสุด 5 วัน สามารถยกยอดไปปีถัดไปได้ ส่วนที่เกินจะจ่ายเป็นเงินในเช็คเงินเดือนวันที่ 15 ธันวาคม
            </p>
            <button className="btn btn-accent" style={{marginTop: 14}}>อ่านนโยบายฉบับเต็ม</button>
          </div>
        </div>
      </div>
    </>
  );
}
window.TimeOffScreen = TimeOffScreen;

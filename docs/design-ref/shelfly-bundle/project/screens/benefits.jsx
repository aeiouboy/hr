// BenefitsScreen.jsx (Thai)
function BenefitsScreen({ onNav }) {
  const Ic = window.I;
  const [tab, setTab] = React.useState("benefits");

  return (
    <>
      <window.Topbar title="เงินเดือนและสวัสดิการ" subtitle="ความคุ้มครอง แบบฟอร์ม และนโยบาย" onNav={onNav}
        actions={<button className="btn btn-ghost"><Ic.download size={14}/> ดาวน์โหลดสลิปเงินเดือน</button>}/>

      <div className="tabs" style={{marginBottom: 20}}>
        {[["benefits","สวัสดิการ"],["claims","เบิกค่าใช้จ่าย"],["docs","เอกสาร"],["policies","นโยบาย"],["pay","สลิปเงินเดือน"]].map(([k,l]) => (
          <div key={k} className={"tab " + (tab===k?"active":"")} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      {tab === "benefits" && (
        <>
          <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 80%)", border: 0, padding: 26, marginBottom: 20, overflow:"hidden", position:"relative"}}>
            <div className="blob teal"   style={{width: 120, height: 150, right: -20, top: -30, opacity: .6}}/>
            <div className="blob butter" style={{width: 60, height: 76,   right: 80, top: 60,   opacity: .8}}/>
            <div className="eyebrow">ลงทะเบียนสวัสดิการปี 2568 · เปิดรับถึง 3 พ.ค.</div>
            <h1 style={{fontSize: 38, marginTop: 10, maxWidth: 560, color:"var(--ink)"}}>เลือกแผนสวัสดิการของคุณสำหรับปีนี้</h1>
            <p style={{fontSize: 15, color:"var(--ink-2)", marginTop: 8, maxWidth: 520, lineHeight: 1.6}}>
              คุณมีเวลา 13 วันในการทบทวนความคุ้มครอง เพิ่มผู้อุปการะ และยืนยัน ระบบจะใช้แผนเดิมของคุณโดยอัตโนมัติหากไม่มีการเปลี่ยนแปลง
            </p>
            <div className="row" style={{marginTop: 18, gap: 10}}>
              <button className="btn btn-primary">เริ่มลงทะเบียน</button>
              <button className="btn btn-ghost">เปรียบเทียบแผน</button>
            </div>
          </div>

          <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 20}}>
            {[
              {t:"สุขภาพและทันตกรรม", plan:"แพลน Flex Plus · ครอบครัว", co:"฿142/เดือน", c:"var(--accent)", pct: 85, items:["ตรวจสุขภาพฟรี 100%","สายตา ฿500","ค่ารักษาพยาบาล ฿2,500"]},
              {t:"กองทุนสำรองเลี้ยงชีพ", plan:"สมทบ 5%", co:"฿0/เดือน", c:"var(--coral)", pct: 100, items:["บริษัทสมทบ 5%","ได้รับสิทธิ์ทันที","บริหารโดย Fidelity"]},
              {t:"สุขภาวะองค์รวม", plan:"บัญชีไลฟ์สไตล์", co:"฿600/ปี", c:"var(--sage)", pct: 32, items:["ใช้ไปแล้ว ฿192","ฟิตเนส บำบัด คลาส","ไม่ต้องเสียภาษี"]},
            ].map(b => (
              <div key={b.t} className="card">
                <div className="row">
                  <div className="eyebrow">{b.t}</div>
                  <span className="tag sage" style={{marginLeft:"auto"}}>ลงทะเบียนแล้ว</span>
                </div>
                <h3 style={{marginTop: 10, fontSize: 22}}>{b.plan}</h3>
                <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 4}}>{b.co} · คุณจ่าย</div>
                <div className="progress" style={{marginTop: 16}}><span style={{width: b.pct+"%", background: b.c}}/></div>
                <ul style={{margin: "14px 0 0", paddingLeft: 20, fontSize: 13, color:"var(--ink-2)", lineHeight: 1.9}}>
                  {b.items.map(x => <li key={x}>{x}</li>)}
                </ul>
                <button className="btn btn-ghost" style={{marginTop: 16, width:"100%"}}>จัดการ</button>
              </div>
            ))}
          </div>

          <div className="card" style={{marginTop: 20}}>
            <div className="row">
              <div>
                <div className="eyebrow">ผู้อุปการะ</div>
                <h3 style={{marginTop: 6}}>ในแผนของคุณ</h3>
              </div>
              <button className="btn btn-ghost" style={{marginLeft:"auto"}}><Ic.plus size={14}/> เพิ่มผู้อุปการะ</button>
            </div>
            <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 14}}>
              {[
                {n:"แซม เรเยส", r:"คู่สมรส", c:"SR", t:"teal"},
                {n:"ไอริส เรเยส", r:"บุตร · 8 ขวบ", c:"IR", t:"coral"},
                {n:"นิโก้ เรเยส", r:"บุตร · 4 ขวบ", c:"NR", t:"sage"},
              ].map(d => (
                <div key={d.n} className="row" style={{padding: 14, border: "1px solid var(--line)", borderRadius: 14}}>
                  <div className={"avatar " + d.t}>{d.c}</div>
                  <div>
                    <div style={{fontWeight: 600, fontSize: 14}}>{d.n}</div>
                    <div style={{fontSize: 12, color:"var(--ink-3)"}}>{d.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "claims" && (
        <>
          <div className="card" style={{background:"linear-gradient(120deg, var(--accent-soft) 0%, var(--cream-2) 80%)", border: 0, padding: 24, marginBottom: 20, overflow:"hidden", position:"relative"}}>
            <div className="blob sage"   style={{width: 120, height: 150, right: -20, top: -30, opacity: .55}}/>
            <div className="blob coral" style={{width: 60, height: 76, right: 90, top: 50, opacity: .7}}/>
            <div className="row" style={{alignItems:"flex-start", gap: 20, flexWrap:"wrap"}}>
              <div style={{flex:"1 1 320px", minWidth: 0}}>
                <div className="eyebrow">วงเงินปี 2568 · ใช้ไป 32%</div>
                <h1 style={{fontSize: 32, marginTop: 10, maxWidth: 520}}>เบิกค่าใช้จ่ายสวัสดิการ</h1>
                <p style={{fontSize: 14, color:"var(--ink-2)", marginTop: 8, maxWidth: 480, lineHeight: 1.6}}>
                  แนบใบเสร็จรับเงินสดจะโอนเข้าบัญชีธนาคารของคุณใน 3–5 วันทำการ หลังการอนุมัติของหัวหน้างาน
                </p>
                <div className="row" style={{marginTop: 16, gap: 10}}>
                  <button className="btn btn-primary"><Ic.plus size={14}/> สร้างคำขอเบิก</button>
                  <button className="btn btn-ghost">ดูประวัติทั้งหมด</button>
                </div>
              </div>
              <div style={{flex:"0 0 220px", textAlign:"right"}}>
                <div className="eyebrow">ยอดรวมสิทธิ์ปีนี้</div>
                <div style={{fontFamily:"var(--font-display)", fontSize: 38, fontWeight: 700, letterSpacing:"-0.02em", lineHeight:1.1, marginTop: 6}}>฿60,000</div>
                <div style={{fontSize: 13, color:"var(--ink-3)", marginTop: 4}}>เบิกไปแล้ว ฿19,200 · คงเหลือ ฿40,800</div>
              </div>
            </div>
          </div>

          <div className="grid" style={{gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 20}}>
            {[
              {l:"ค่ารักษาพยาบาล", used: 12400, limit: 38000, c:"var(--accent)", ic:"heart", sub:"ต่อปี · รวมผู้อุปการะ"},
              {l:"ค่าทันตกรรม", used: 0, limit: 2000, c:"var(--coral)", ic:"shield", sub:"ต่อปี · รวมชุดเคลือบฟัน"},
              {l:"ค่าโทรศัพท์", used: 4800, limit: 9600, c:"var(--sage)", ic:"plug", sub:"เดือนละ ฿800"},
              {l:"ค่าน้ำมันรถ", used: 2000, limit: 10000, c:"var(--butter)", ic:"mega", sub:"ไปราชการ · ยื่นรายเดือน"},
            ].map(b => {
              const pct = Math.round(b.used / b.limit * 100);
              return (
                <div key={b.l} className="card tight" style={{borderLeft: `4px solid ${b.c}`}}>
                  <div className="eyebrow">{b.l}</div>
                  <div style={{fontFamily:"var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing:"-0.01em"}}>฿{b.used.toLocaleString()} <span style={{color:"var(--ink-3)", fontSize: 13, fontWeight: 400}}>/ {b.limit.toLocaleString()}</span></div>
                  <div className="progress" style={{marginTop: 10}}><span style={{width: pct+"%", background: b.c}}/></div>
                  <div style={{fontSize: 12, color:"var(--ink-3)", marginTop: 8}}>{b.sub}</div>
                </div>
              );
            })}
          </div>

          <div className="card">
            <div className="row" style={{marginBottom: 12}}>
              <div>
                <div className="eyebrow">คำขอเบิกล่าสุด</div>
                <h3 style={{marginTop: 6}}>ประวัติการเบิกค่าใช้จ่าย</h3>
              </div>
              <div className="spacer"/>
              <button className="btn btn-ghost"><Ic.download size={14}/> ส่งออกรายงาน</button>
            </div>
            <div className="list">
              {[
                {d:"15 เม.ย. 2568", t:"ค่ารักษาพยาบาล", desc:"รพ.บำรุงราษฎร์ · ใบเสร็จ #RX-3381", amt:"฿4,820", s:"อนุมัติแล้ว", t2:"sage"},
                {d:"2 เม.ย. 2568",  t:"ค่าน้ำมันรถ", desc:"ปตท. สาขาทองหล่อ · 230 กิโลเมตร", amt:"฿1,280", s:"อนุมัติแล้ว", t2:"sage"},
                {d:"28 เม.ย. 2568", t:"ค่าโทรศัพท์", desc:"AIS · บิลเดือน เม.ย.", amt:"฿800",  s:"รออนุมัติ", t2:"butter"},
                {d:"22 เม.ย. 2568", t:"ค่ารักษาพยาบาล", desc:"บีเอ็นเอชคลินิก · ใบเสร็จ #RX-3280", amt:"฿7,580", s:"อนุมัติแล้ว", t2:"sage"},
                {d:"10 เม.ย. 2568", t:"ค่าทันตกรรม", desc:"ต้องแนบใบเสร็จเพิ่ม", amt:"฿1,500", s:"ขอข้อมูล", t2:"coral"},
              ].map(r => (
                <div key={r.d + r.t} className="row-item">
                  <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Ic.doc size={18}/>
                  </div>
                  <div>
                    <div style={{fontWeight: 600, fontSize: 14}}>{r.t} · <span style={{color:"var(--ink-3)", fontWeight: 400}}>{r.d}</span></div>
                    <div style={{fontSize: 12, color:"var(--ink-3)"}}>{r.desc}</div>
                  </div>
                  <div className="row" style={{gap: 10}}>
                    <div style={{fontFamily:"var(--font-display)", fontWeight: 700, fontSize: 15}}>{r.amt}</div>
                    <span className={"tag " + r.t2}>{r.s}</span>
                    <button className="btn btn-ghost" style={{padding:"7px 12px", fontSize: 13}}>เปิด</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "docs" && (
        <div className="card">
          <div className="row" style={{marginBottom: 12}}>
            <h3>เอกสารทั้งหมด</h3>
            <div className="spacer"/>
            <div className="search" style={{maxWidth: 260}}>
              <Ic.search size={14}/><span>ค้นหาตามชื่อ…</span>
            </div>
          </div>
          <div className="list">
            {[
              {n:"ลงทะเบียนสวัสดิการปี 2568", k:"แบบฟอร์ม", d:"ครบกำหนด 29 เม.ย.", s:"sign", tag:"butter"},
              {n:"ระเบียบการปฏิบัติงาน (ฉบับที่ 4)", k:"นโยบาย", d:"รอรับทราบ", s:"sign", tag:"butter"},
              {n:"หนังสือรับรองภาษี 50 ทวิ — ปี 2567", k:"ภาษี", d:"พร้อมดาวน์โหลด", s:"view", tag:"sage"},
              {n:"หน้าบัญชีธนาคาร (สำเนา)", k:"การเงิน", d:"อัปโหลด 12 ก.พ.", s:"view", tag:""},
              {n:"อบรมความปลอดภัยหน้าร้าน", k:"การฝึกอบรม", d:"เสร็จสิ้น 8 ม.ค.", s:"view", tag:"sage"},
              {n:"สัญญาจ้างงาน", k:"เอกสารทางกฎหมาย", d:"ลงนามเมื่อ ต.ค. 2567", s:"view", tag:""},
            ].map(d => (
              <div key={d.n} className="row-item">
                <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <Ic.doc size={18}/>
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{d.n}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{d.k} · {d.d}</div>
                </div>
                <div className="row" style={{gap: 8}}>
                  {d.tag && <span className={"tag " + d.tag}>{d.s === "sign" ? "ต้องลงนาม" : "พร้อมใช้"}</span>}
                  <button className="btn btn-ghost" style={{padding: "7px 12px", fontSize: 13}}>
                    {d.s === "sign" ? "ลงนาม" : <><Ic.download size={13}/> ดาวน์โหลด</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "policies" && (
        <div className="grid" style={{gridTemplateColumns: "1fr 1fr", gap: 16}}>
          {[
            {t:"การลางานและวันหยุด", u:"อัปเดต มี.ค. 2568", body:"การสะสมวันลาพักร้อน กฎการยกยอด ค่าจ้างวันหยุดสำหรับกะร้านค้าปลีก"},
            {t:"ลาคลอด", u:"มีผล 1 พ.ค.", body:"ลา 16 สัปดาห์ได้รับค่าจ้างเต็ม ใช้ได้กับทุกประเภทการจ้างหลังทำงานครบ 6 เดือน"},
            {t:"ความปลอดภัยหน้าร้าน", u:"อัปเดต ม.ค. 2568", body:"การยกของ การทำความสะอาดของที่หก ขั้นตอนเปิด-ปิดร้าน การรายงานเหตุการณ์"},
            {t:"ระเบียบการปฏิบัติงาน", u:"ฉบับที่ 4 · เม.ย. 2568", body:"การเคารพในที่ทำงาน การต่อต้านการคุกคาม ผลประโยชน์ทับซ้อน การรายงาน"},
          ].map(p => (
            <div key={p.t} className="card">
              <div className="eyebrow">{p.u}</div>
              <h3 style={{marginTop: 6}}>{p.t}</h3>
              <p style={{color:"var(--ink-2)", fontSize: 14, marginTop: 8, lineHeight: 1.6}}>{p.body}</p>
              <button className="btn btn-ghost" style={{marginTop: 12}}>อ่านนโยบาย <Ic.arrow size={13}/></button>
            </div>
          ))}
        </div>
      )}

      {tab === "pay" && (
        <div className="card">
          <div className="row" style={{marginBottom: 14}}>
            <div>
              <div className="eyebrow">ทุก 2 สัปดาห์ · เงินเข้าครั้งถัดไป 26 เม.ย.</div>
              <h3 style={{marginTop: 6}}>สลิปเงินเดือน</h3>
            </div>
            <div className="spacer"/>
            <span className="tag accent">รายได้สะสมปีนี้ ฿24,180.44</span>
          </div>
          <div className="list">
            {[
              {d:"12 เม.ย. 2568", g:"฿2,148.50", h:"72.5 ชม.", s:"เงินเข้าแล้ว"},
              {d:"29 มี.ค. 2568", g:"฿2,094.00", h:"70.0 ชม.", s:"เงินเข้าแล้ว"},
              {d:"15 มี.ค. 2568", g:"฿2,212.75", h:"74.0 ชม.", s:"เงินเข้าแล้ว"},
              {d:"1 มี.ค. 2568",  g:"฿1,980.00", h:"66.0 ชม.", s:"เงินเข้าแล้ว"},
            ].map(p => (
              <div key={p.d} className="row-item">
                <div style={{width: 34, height: 42, borderRadius: 6, background:"var(--cream-2)", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <Ic.doc size={18}/>
                </div>
                <div>
                  <div style={{fontWeight: 600, fontSize: 14}}>{p.d}</div>
                  <div style={{fontSize: 12, color:"var(--ink-3)"}}>{p.h} · รวมก่อนหัก {p.g}</div>
                </div>
                <div className="row" style={{gap: 8}}>
                  <span className="tag sage">{p.s}</span>
                  <button className="btn btn-ghost" style={{padding: "7px 12px", fontSize: 13}}><Ic.download size={13}/> PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
window.BenefitsScreen = BenefitsScreen;

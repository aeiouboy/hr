// VALIDATION_EXEMPT: design-reference shelfly mockup — not application source (per design-gates Track C 2026-04-26)
// VALIDATION_EXEMPT: design-reference shelfly mockup — not application source (per design-gates Track C 2026-04-26)
// LoginScreen.jsx (Thai)
function LoginScreen({ onNav }) {
  const Ic = window.I;
  const [email, setEmail] = React.useState("ava.reyes@humi.shop");
  const [pw, setPw] = React.useState("••••••••••");

  return (
    <div className="login-wrap">
      <div className="login-art grain">
        <div className="blob teal"   style={{width: 280, height: 350, right: -80, top: -60, opacity:.35}}/>
        <div className="blob coral"  style={{width: 180, height: 220, left: -40, bottom: 80, opacity:.45}}/>
        <div className="blob butter" style={{width: 80, height: 100, right: 120, bottom: 180, opacity:.6}}/>

        <div className="row" style={{gap: 10}}>
          <div style={{fontFamily:"var(--font-display)", fontWeight: 700, fontSize: 36, letterSpacing:"-0.04em", color:"#FCFAF5", display:"flex", alignItems:"center", gap: 2}}>
            Humi<window.ShelflyMark size={30} color="var(--accent)"/>
          </div>
        </div>

        <div style={{marginTop:"auto", position:"relative", zIndex: 1}}>
          <div className="eyebrow" style={{color:"var(--accent)"}}>ระบบ HR สำหรับร้านค้าปลีก</div>
          <h1 style={{color:"#FCFAF5", fontSize: 52, marginTop: 14, maxWidth: 560, lineHeight: 1.15, letterSpacing:"-0.02em"}}>
            ระบบเบื้องหลังที่<br/>ทีมของคุณคู่ควร
          </h1>
          <p style={{color:"rgba(231,227,216,0.75)", fontSize: 16, marginTop: 18, maxWidth: 480, lineHeight: 1.65}}>
            ลางาน สลิปเงินเดือน นโยบาย และข่าวสารของทีม — รวมในที่เดียวที่ใช้งานง่าย ออกแบบเพื่อผู้จัดการร้าน พนักงานหน้าร้านก็ชอบใช้
          </p>

          <div style={{marginTop: 36, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 22, maxWidth: 500, backdropFilter: "blur(4px)"}}>
            <div style={{fontFamily:"var(--font-display)", fontSize: 17, color:"#FCFAF5", lineHeight: 1.6}}>
              "เราลดเวลาจัดการเงินเดือนได้ถึงหนึ่งในสาม ภายในไตรมาสแรกที่ใช้ Humi ทีมหน้าร้านก็อ่านฟีดข่าวสารจริงๆ แล้ว"
            </div>
            <div className="row" style={{marginTop: 14, gap: 10}}>
              <div className="avatar sage">DL</div>
              <div>
                <div style={{fontSize: 13, color:"#FCFAF5", fontWeight: 600}}>ดานา แอล.</div>
                <div style={{fontSize: 12, color:"rgba(231,227,216,0.6)"}}>ผู้จัดการเขต · 5 สาขา</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form">
        <div style={{maxWidth: 400, width:"100%"}}>
          <div className="eyebrow">ยินดีต้อนรับกลับ</div>
          <h1 style={{fontSize: 34, marginTop: 10}}>เข้าสู่ระบบ Humi</h1>
          <p style={{color:"var(--ink-3)", fontSize: 14, marginTop: 8, lineHeight: 1.6}}>ใช้อีเมลที่ทำงานของคุณ หากคุณเข้างานที่หน้าร้าน กรุณาสแกน QR บนโปสเตอร์ในห้องพนักงาน</p>

          <div className="col" style={{gap: 14, marginTop: 28}}>
            <div className="field">
              <label>อีเมลที่ทำงาน</label>
              <input value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="field">
              <label style={{display:"flex"}}>รหัสผ่าน <a style={{marginLeft:"auto", fontSize: 12, color:"var(--ink-3)", cursor:"pointer"}}>ลืมรหัสผ่าน?</a></label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)}/>
            </div>
            <label className="row" style={{fontSize: 13, color:"var(--ink-2)", cursor:"pointer"}}>
              <span style={{width: 16, height: 16, borderRadius: 4, background:"var(--accent)", color:"#fff", display:"inline-flex", alignItems:"center", justifyContent:"center"}}>
                <Ic.check size={11}/>
              </span>
              จดจำอุปกรณ์นี้
            </label>
            <button className="btn btn-primary" style={{padding: "13px 16px", fontSize: 15, marginTop: 6}} onClick={() => onNav("home")}>
              เข้าสู่ระบบ <Ic.arrow size={14}/>
            </button>
          </div>

          <div className="row" style={{margin: "22px 0", gap: 10}}>
            <hr style={{flex:1, border: 0, borderTop:"1px solid var(--line)"}}/>
            <span style={{fontSize: 12, color:"var(--ink-4)", letterSpacing:".1em"}}>หรือ</span>
            <hr style={{flex:1, border: 0, borderTop:"1px solid var(--line)"}}/>
          </div>

          <div className="col" style={{gap: 10}}>
            <button className="btn btn-ghost" style={{padding: 12}}><Ic.globe size={15}/> เข้าสู่ระบบด้วย Google Workspace</button>
            <button className="btn btn-ghost" style={{padding: 12}}><Ic.shield size={15}/> เข้าสู่ระบบด้วย SSO</button>
          </div>

          <div style={{marginTop: 28, fontSize: 13, color:"var(--ink-3)"}}>
            เป็นสมาชิกใหม่? <a style={{color:"var(--ink)", fontWeight: 600, cursor:"pointer"}}>ตั้งค่าบัญชีของคุณ</a>
          </div>
        </div>
      </div>
    </div>
  );
}
window.LoginScreen = LoginScreen;

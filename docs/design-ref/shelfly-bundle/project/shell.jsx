// Shell.jsx — sidebar + topbar layout (HR system · Thai)
const NAV = [
  { group: "พื้นที่ทำงานของฉัน", items: [
    { id: "home", label: "หน้าหลัก", icon: "home" },
    { id: "profile", label: "โปรไฟล์ของฉัน", icon: "people" },
    { id: "timeoff", label: "ลางาน", icon: "calendar", badge: "2" },
    { id: "benefits", label: "เงินเดือนและสวัสดิการ", icon: "heart", badge: "1" },
    { id: "requests", label: "คำร้องและแบบฟอร์ม", icon: "doc", badge: "1" },
  ]},
  { group: "บุคลากร", items: [
    { id: "goals", label: "เป้าหมายและผลงาน", icon: "shield" },
    { id: "learning", label: "การเรียนรู้", icon: "book" },
    { id: "directory", label: "ผังองค์กร", icon: "globe" },
  ]},
  { group: "บริษัท", items: [
    { id: "announce", label: "ประกาศ", icon: "mega" },
    { id: "integrations", label: "จัดการระบบ", icon: "plug" },
  ]},
];

function Sidebar({ current, onNav }) {
  const Ic = window.I;
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="wordmark">Hum<window.ShelflyMark size={20} color="var(--accent)"/></div>
      </div>
      {NAV.map(section => (
        <React.Fragment key={section.group}>
          <div className="nav-label">{section.group}</div>
          {section.items.map(item => {
            const Glyph = Ic[item.icon];
            const active = item.id === current;
            return (
              <div key={item.id}
                   className={"nav-item" + (active ? " active" : "")}
                   onClick={() => onNav(item.id)}>
                <span className="nav-icon"><Glyph size={16}/></span>
                {item.label}
                {item.badge && <span className="pill">{item.badge}</span>}
              </div>
            );
          })}
        </React.Fragment>
      ))}
      <div className="sidebar-foot">
        <div className="avatar coral">จท</div>
        <div style={{fontSize: 13, lineHeight: 1.3}}>
          <div style={{color:"#FCFAF5", fontWeight:600}}>จงรักษ์ ทานากะ</div>
          <div style={{color:"rgba(231,227,216,0.55)", fontSize: 11}}>ผู้จัดการร้าน · สาขาฮัมเบอร์</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ title, subtitle, actions, onNav }) {
  const Ic = window.I;
  return (
    <div className="topbar">
      <div>
        <div className="eyebrow" style={{marginBottom: 4}}>{subtitle || "สวัสดีตอนเช้าค่ะ คุณจงรักษ์"}</div>
        <h2 style={{fontSize: 24}}>{title}</h2>
      </div>
      <div className="spacer"/>
      <div className="search">
        <Ic.search size={16}/>
        <span>ค้นหาพนักงาน เอกสาร…</span>
        <kbd>⌘K</kbd>
      </div>
      <button className="icon-btn" title="การแจ้งเตือน" onClick={() => onNav && onNav("announce")}>
        <Ic.bell size={18}/>
        <span className="dot-badge"/>
      </button>
      {actions}
    </div>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;

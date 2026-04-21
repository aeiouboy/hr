// Icons.jsx — simple 1.5px stroke icon set
const Icon = ({ d, size = 18, fill = "none", stroke = "currentColor", sw = 1.75, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d ? <path d={d} /> : children}
  </svg>
);

const I = {
  home:    (p) => <Icon {...p}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></Icon>,
  calendar:(p) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></Icon>,
  mega:    (p) => <Icon {...p}><path d="M3 11v2a2 2 0 0 0 2 2h2l7 4V5L7 9H5a2 2 0 0 0-2 2Z"/><path d="M18 8a5 5 0 0 1 0 8"/></Icon>,
  doc:     (p) => <Icon {...p}><path d="M7 3h8l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 17h6"/></Icon>,
  heart:   (p) => <Icon {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></Icon>,
  plug:    (p) => <Icon {...p}><path d="M9 2v5M15 2v5"/><path d="M7 7h10v5a5 5 0 0 1-10 0z"/><path d="M12 17v5"/></Icon>,
  people:  (p) => <Icon {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="7" r="2.4"/><path d="M15 14c3 0 6 2 6 5"/></Icon>,
  cog:     (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.8a7 7 0 0 0-2.1-1.2L14 3h-4l-.4 2.4a7 7 0 0 0-2.1 1.2L5.1 5.8l-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.4-.8a7 7 0 0 0 2.1 1.2L10 21h4l.4-2.4a7 7 0 0 0 2.1-1.2l2.4.8 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"/></Icon>,
  search:  (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>,
  bell:    (p) => <Icon {...p}><path d="M6 16V10a6 6 0 1 1 12 0v6l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></Icon>,
  plus:    (p) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  check:   (p) => <Icon {...p}><path d="m5 12 4.5 4.5L19 7"/></Icon>,
  arrow:   (p) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  chevron: (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>,
  chevronD:(p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>,
  sun:     (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></Icon>,
  moon:    (p) => <Icon {...p}><path d="M20 14.5A8 8 0 1 1 9.5 4a6 6 0 0 0 10.5 10.5Z"/></Icon>,
  download:(p) => <Icon {...p}><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 21h16"/></Icon>,
  more:    (p) => <Icon {...p}><circle cx="6" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18" cy="12" r="1.2" fill="currentColor"/></Icon>,
  pin:     (p) => <Icon {...p}><path d="M12 2l3 5 5 1-3.5 3.5L17 17l-5-3-5 3 .5-5.5L4 8l5-1z"/></Icon>,
  clock:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Icon>,
  shield:  (p) => <Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></Icon>,
  coffee:  (p) => <Icon {...p}><path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M16 10h2a3 3 0 0 1 0 6h-2"/><path d="M7 3v2M10 3v2M13 3v2"/></Icon>,
  send:    (p) => <Icon {...p}><path d="m22 2-10 10M22 2l-6 20-4-9-9-4z"/></Icon>,
  filter:  (p) => <Icon {...p}><path d="M3 4h18l-7 9v7l-4-2v-5z"/></Icon>,
  link:    (p) => <Icon {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7L12 6.5"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7L12 17.5"/></Icon>,
  globe:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Icon>,
  smile:   (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></Icon>,
  palette: (p) => <Icon {...p}><path d="M12 3a9 9 0 1 0 0 18c1 0 2-1 2-2 0-1.5-1-1.5-1-3s1-2 2.5-2H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z"/><circle cx="7" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="10" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="7" r="1" fill="currentColor" stroke="none"/></Icon>,
  book:    (p) => <Icon {...p}><path d="M4 4h7v16H6a2 2 0 0 1-2-2z"/><path d="M13 4h7v14a2 2 0 0 1-2 2h-5z"/></Icon>,
  party:   (p) => <Icon {...p}><path d="m3 21 4-12 10 10z"/><path d="M14 4s1 1 1 2M17 7s1 1 3 0M19 4l1 1M13 11a4 4 0 0 1 4-4"/></Icon>,
  logout:  (p) => <Icon {...p}><path d="M9 4H5v16h4"/><path d="M15 8l4 4-4 4M19 12H10"/></Icon>,
};

// Gumdrop / person mark (original shape for brand)
const ShelflyMark = ({ size = 28, color = "var(--accent)" }) => (
  <svg width={size} height={size * 1.15} viewBox="0 0 28 32" aria-hidden="true">
    <circle cx="14" cy="7" r="6" fill={color}/>
    <path d="M5 30c0-6 4-11 9-11s9 5 9 11c0 1-1 2-2 2H7c-1 0-2-1-2-2z" fill={color}/>
  </svg>
);

window.I = I;
window.ShelflyMark = ShelflyMark;

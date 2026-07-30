import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'
import fs from 'fs'
const OUT='/tmp/claude-0/-home-user-hr/2443db44-ed71-581d-8fc0-71208abc3420/scratchpad'
const EMP = process.env.EMP || 'EMP-0002'
const LOCALE = process.env.LOC || 'en'
const b = await chromium.launch({ args:['--no-sandbox'] })
const p = await (await b.newContext({viewport:{width:1500,height:1100}})).newPage()
await p.goto(`http://localhost:3000/${LOCALE}/login`,{waitUntil:'domcontentloaded',timeout:120000}); await p.waitForTimeout(1500)
await p.locator('input[type="email"]').first().fill('admin@humi.test')
await p.locator('input[type="password"]').first().fill('admin2026')
await p.locator('button[type="submit"]').first().click(); await p.waitForTimeout(3500)
await p.goto(`http://localhost:3000/${LOCALE}/admin/employees/${EMP}`,{waitUntil:'networkidle',timeout:120000}); await p.waitForTimeout(4000)
console.log('URL:',p.url())

for(let pass=0;pass<10;pass++){
  const n = await p.evaluate(()=>{
    let c=0
    for(const el of document.querySelectorAll('button,[role="button"],summary')){
      const t=(el.innerText||'').trim(); const al=el.getAttribute('aria-label')||''
      if(el.getAttribute('aria-expanded')==='false' || /^(expand|ขยาย|show more|ดูเพิ่มเติม|view all|show all)/i.test(t) || /^(expand|ขยาย)/i.test(al)){
        try{el.click();c++}catch{}
      }
    }
    document.querySelectorAll('details:not([open])').forEach(d=>{d.open=true;c++})
    return c
  })
  await p.waitForTimeout(1500)
  console.log('pass',pass,'expanded',n)
  if(!n) break
}
await p.waitForTimeout(2500)

// section-aware extraction
const data = await p.evaluate(()=>{
  const cards=[...document.querySelectorAll('[id^="emp-"], section, .humi-card')]
  const out=[]
  const labelOf = el => {
    const l=[]
    for(const n of el.querySelectorAll('.humi-eyebrow, label, th, .humi-label')){
      // skip labels belonging to a nested card that is itself in the list
      const t=(n.textContent||'').trim().replace(/\s+/g,' ')
      if(t && t.length<90) l.push({t, tag:n.tagName.toLowerCase()})
    }
    return l
  }
  const seenEl=new Set()
  for(const c of cards){
    const id=c.id||''
    // card title: first heading-ish
    const h=c.querySelector('h1,h2,h3,h4,[class*="humi-card-title"]')
    const title=h?(h.textContent||'').trim().replace(/\s+/g,' ').slice(0,120):''
    const labels=labelOf(c)
    if(!labels.length) continue
    out.push({id, title, labels})
  }
  // also all distinct label texts globally with nearest card title
  const all=[]
  for(const n of document.querySelectorAll('.humi-eyebrow, label, th, .humi-label')){
    const t=(n.textContent||'').trim().replace(/\s+/g,' ')
    if(!t||t.length>90) continue
    let anc=n.closest('[id^="emp-"]')
    let card=n.closest('.humi-card, section')
    const h=card?card.querySelector('h1,h2,h3,h4'):null
    all.push({label:t, tag:n.tagName.toLowerCase(), secId:anc?anc.id:'', cardTitle:h?(h.textContent||'').trim().replace(/\s+/g,' ').slice(0,100):''})
  }
  const headings=[...document.querySelectorAll('h1,h2,h3,h4,h5')].map(h=>({tag:h.tagName.toLowerCase(),text:(h.textContent||'').trim().replace(/\s+/g,' ').slice(0,120)}))
  return {cards:out, all, headings}
})
fs.writeFileSync(`${OUT}/ui-${LOCALE}-${EMP}.json`, JSON.stringify(data,null,1))
console.log('labels:',data.all.length,'headings:',data.headings.length)
const bt = await p.evaluate(()=>document.body.innerText)
fs.writeFileSync(`${OUT}/bodytext-${LOCALE}-${EMP}.txt`, bt)
console.log('body chars:',bt.length)
fs.mkdirSync(`${OUT}/shots`,{recursive:true})
await p.screenshot({path:`${OUT}/shots/${LOCALE}-${EMP}-full.png`, fullPage:true})
const secs = await p.evaluate(()=>[...document.querySelectorAll('[id^="emp-"]')].map(e=>e.id))
console.log('sections:',secs.join(', '))
for(const id of secs){
  try{ const el=p.locator('#'+CSS.escape? id: id).first() }catch{}
}
for(const id of secs){
  try{
    const el=p.locator(`[id="${id}"]`).first()
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(300)
    await el.screenshot({path:`${OUT}/shots/${LOCALE}-${id}.png`})
  }catch(e){ console.log('shotfail',id,String(e).slice(0,60)) }
}
await b.close()

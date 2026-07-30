import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'
import fs from 'fs'
const OUT='/tmp/claude-0/-home-user-hr/2443db44-ed71-581d-8fc0-71208abc3420/scratchpad'
const LOC=process.env.LOC||'en', EMP='EMP-0002'
const b = await chromium.launch({args:['--no-sandbox']})
const p = await (await b.newContext({viewport:{width:1500,height:1100}})).newPage()
await p.goto(`http://localhost:3000/${LOC}/login`,{waitUntil:'domcontentloaded',timeout:120000}); await p.waitForTimeout(1500)
await p.locator('input[type="email"]').first().fill('admin@humi.test')
await p.locator('input[type="password"]').first().fill('admin2026')
await p.locator('button[type="submit"]').first().click(); await p.waitForTimeout(3500)
await p.goto(`http://localhost:3000/${LOC}/admin/employees/${EMP}`,{waitUntil:'networkidle',timeout:120000}); await p.waitForTimeout(4000)

// expand ONLY the page's own collapsible section cards (skip the topbar chrome)
for(let pass=0;pass<8;pass++){
  const n = await p.evaluate(()=>{
    let c=0
    const main=document.querySelector('main')||document.body
    for(const el of main.querySelectorAll('button,[role="button"],summary')){
      const t=(el.innerText||'').trim(); const al=el.getAttribute('aria-label')||''
      if(el.getAttribute('aria-expanded')==='false' || /^(expand|ขยาย)$/i.test(t) || /^(expand|ขยาย)$/i.test(al)){
        try{el.click();c++}catch{}
      }
    }
    main.querySelectorAll('details:not([open])').forEach(d=>{d.open=true;c++})
    return c
  })
  await p.waitForTimeout(1200)
  if(!n) break
}
// close any topbar/overlay panel that opened
await p.keyboard.press('Escape'); await p.waitForTimeout(300)
await p.evaluate(()=>{
  const main=document.querySelector('main')||document.body
  for(const el of document.querySelectorAll('[aria-expanded="true"]')){
    if(!main.contains(el)) { try{el.click()}catch{} }
  }
})
await p.keyboard.press('Escape'); await p.waitForTimeout(1200)

fs.mkdirSync(`${OUT}/shots`,{recursive:true})
await p.screenshot({path:`${OUT}/shots/${LOC}-${EMP}-full.png`, fullPage:true})
const h=p.locator('h1').first(); const box=await h.boundingBox()
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(400)
await p.screenshot({path:`${OUT}/shots/${LOC}-emp-header.png`, clip:{x:0,y:Math.max(0,box.y-150),width:1500,height:330}})

const ids=['emp-personal-contact','emp-marital','emp-bank','emp-emergency','emp-dependents',
 'emp-contact-address','emp-advanced','emp-work-experience','emp-certifications','emp-assessments',
 'emp-memberships','emp-projects','emp-documents','emp-employment','emp-current-benefits',
 'emp-benefit-enrollment','emp-claim-history','emp-budget-reallocation','emp-timeline','emp-compensation-history']
for(const id of ids){
  try{
    const el=p.locator(`[id="${id}"]`).first()
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(350)
    await el.screenshot({path:`${OUT}/shots/${LOC}-${id}.png`})
    console.log('ok',id)
  }catch(e){ console.log('FAIL',id,String(e).slice(0,70)) }
}
await b.close()

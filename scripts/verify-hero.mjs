import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { server } from './serve.mjs';
await new Promise(resolve=>server.listen(4324,'127.0.0.1',resolve));
const browser=await chromium.launch({channel:'chrome',headless:true});
const report=[];
try{
  const context=await browser.newContext();
  const page=await context.newPage();
  for(const width of [320,390,430,768,1024,1440,1920]){
    await page.setViewportSize({width,height:width<768?844:900});
    await page.goto('http://127.0.0.1:4324/',{waitUntil:'networkidle'});
    const image=page.locator('.hero-media');await image.evaluate(el=>el.decode());
    const dimensions=await page.evaluate(()=>{
      const hero=document.querySelector('.hero').getBoundingClientRect();
      const copy=document.querySelector('.hero-copy').getBoundingClientRect();
      const phone=document.querySelector('.hero-phone-stage').getBoundingClientRect();
      const img=document.querySelector('.hero-media');
      return {width:innerWidth,scroll:document.documentElement.scrollWidth,height:hero.height,copy:{x:copy.x,right:copy.right,bottom:copy.bottom},phone:{x:phone.x,y:phone.y,right:phone.right,bottom:phone.bottom},hero:{x:hero.x,y:hero.y,right:hero.right,bottom:hero.bottom},fit:getComputedStyle(img).objectFit,filter:getComputedStyle(img).filter,src:img.currentSrc};
    });
    assert(dimensions.scroll<=width+1,'Horizontal overflow '+width);
    assert.equal(dimensions.fit,'contain');assert(dimensions.filter.includes('drop-shadow'));
    assert(dimensions.phone.y>=dimensions.hero.y && dimensions.phone.bottom<=dimensions.hero.bottom,'Whole phone inside hero');
    if(width<768){assert(dimensions.phone.y>dimensions.copy.bottom,'Phone below copy');assert(dimensions.height<680,'Compact mobile hero');}
    else{assert(dimensions.phone.x>=dimensions.copy.right,'Phone right of copy');assert(dimensions.height<=600,'Compact desktop hero');}
    report.push(dimensions);
    if([390,1440].includes(width))await page.screenshot({path:`artifacts/hero-${width}.png`});
  }
  await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4324/');
  const axe=await new AxeBuilder({page}).include('.hero').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.deepEqual(axe.violations,[]);
  for(const width of [300,520,921])assert((await sharp(`public/images/hero/kacell-phone-${width}.webp`).metadata()).hasAlpha);
  await writeFile('artifacts/hero-verification.json',JSON.stringify({viewports:report,accessibility:'zero violations',transparency:'preserved'},null,2));
  console.log('Hero: seven viewports, complete phone, desktop/mobile arrangement, compact height, transparency and accessibility passed.');
}finally{await browser.close();server.close();}

import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const root=path.resolve('dist');
const config=JSON.parse(await readFile('vercel.json','utf8'));
const headers=Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]));
const types={'.svg':'image/svg+xml','.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
const server=createServer(async(req,res)=>{try{let rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(root,'.'+rel);if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}if((await stat(file)).isDirectory())file=path.join(file,'index.html');const body=await readFile(file);res.writeHead(200,{...headers,'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}});
await new Promise(resolve=>server.listen(4322,'127.0.0.1',resolve));
const origin='http://127.0.0.1:4322';
const browser=await chromium.launch({channel:'chrome',headless:true});
await mkdir('artifacts',{recursive:true});
const report={routes:[],responsive:[],accessibility:[],interaction:[],errors:[]};
const errors=[];
try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
  const page=await context.newPage();
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
  const slugs=await readdir(path.join(root,'servicos'));
  const routes=['/',...slugs.map(s=>`/servicos/${s}/`),'/privacidade/'];
  for(const route of routes){
    const response=await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,route);
    assert.equal(await page.locator('h1').count(),1,route+' H1');
    assert(await page.title());
    assert(await page.locator('meta[name="description"]').getAttribute('content'));
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex, follow');
    assert.equal(await page.locator('link[rel="canonical"]').count(),0);
    for(const json of await page.locator('script[type="application/ld+json"]').allTextContents())JSON.parse(json);
    await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode();}));});
    const imgs=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));assert.deepEqual(imgs,[],'Images '+route);
    const links=await page.locator('a').evaluateAll(els=>els.map(a=>a.getAttribute('href')));
    for(const href of links){if(href?.startsWith('https://wa.me/')){const url=new URL(href);assert.equal(url.pathname,'/5515997492826');assert(url.searchParams.get('text')?.startsWith('Olá, Kacell!'));}if(href?.startsWith('/')){const target=new URL(href,origin);const r=await page.request.get(target.href);assert.equal(r.status(),200,href);}}
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.accessibility.push({route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
    report.routes.push({route,status:200,h1:await page.locator('h1').textContent(),images:'ok',links:'ok'});
  }
  for(const route of ['/','/servicos/troca-de-bateria/']){
    for(const width of [320,360,390,430,768,1024,1440,1920]){
      await page.setViewportSize({width,height:width===1920?1080:900});await page.goto(origin+route,{waitUntil:'networkidle'});
      await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(async img=>{img.loading='eager';await img.decode();}));});
      const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length}));
      assert(layout.scroll<=width+1,`${route} overflow ${width}: ${layout.scroll}`);assert.equal(layout.broken,0);
      report.responsive.push({route,width,overflow:false});
      if([390,1440].includes(width)){await page.screenshot({path:`artifacts/${route==='/'?'home':'bateria'}-${width}.png`,fullPage:true});await page.screenshot({path:`artifacts/${route==='/'?'home':'bateria'}-${width}-viewport.png`});}
    }
  }
  await page.setViewportSize({width:390,height:844});await page.goto(origin,{waitUntil:'networkidle'});
  const menu=page.locator('.menu-toggle');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
  await page.locator('.services-dropdown summary').click();assert(await page.locator('.services-dropdown').getAttribute('open')!==null);
  await page.keyboard.press('Escape');assert.equal(await page.locator('.services-dropdown').getAttribute('open'),null);
  await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');assert(await menu.evaluate(el=>el===document.activeElement));
  await menu.click();await page.locator('.main-nav>a[href="/#localizacao"]').click();assert.equal(await menu.getAttribute('aria-expanded'),'false');
  const question=page.locator('.faq-item').first();await question.locator('summary').click();assert(await question.getAttribute('open')!==null);assert(await question.locator('.faq-answer').isVisible());
  assert.equal(await page.locator('iframe').count(),0);await page.getByRole('button',{name:'Carregar mapa'}).click();assert.equal(await page.locator('iframe').count(),1);assert((await page.locator('iframe').getAttribute('src')).startsWith('https://www.google.com/maps'));
  report.interaction.push('Mobile menu, dropdown, Escape and focus return','FAQ opens','Map only inserted after visitor action');
  await page.goto(origin,{waitUntil:'networkidle'});await page.evaluate(()=>{window.__event=null;window.addEventListener('kacell:conversion',e=>{window.__event=e.detail});document.querySelector('a[data-event]').addEventListener('click',e=>e.preventDefault());});await page.locator('a[data-event]').first().dispatchEvent('click');const event=await page.evaluate(()=>window.__event);assert(event?.event==='whatsapp_click');assert(!JSON.stringify(event).includes('551599'));report.interaction.push('Anonymous conversion hook fires without visitor data');
  await page.setViewportSize({width:844,height:390});await page.goto(origin);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.setViewportSize({width:640,height:450});await page.goto(origin);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));report.interaction.push('Landscape and 200% equivalent CSS viewport reflow');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto(origin);assert(await np.locator('h1').isVisible());assert(await np.locator('.main-nav').isVisible());assert(await np.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await nojs.close();report.interaction.push('Core content and navigation work without JavaScript');
  await page.goto(origin);await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('[data-gallery-src]').count(),3);
  assert.equal(await page.locator('.review-card').count(),3);
  assert.equal(await page.locator('a[href*="contato-com-liquido"]').count(),0);
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:900});
    for(const section of ['antes-e-depois','avaliacoes'])await page.locator('#'+section).screenshot({path:`artifacts/${section}-${width}.png`});
  }
  await page.setViewportSize({width:390,height:844});
  const trigger=page.locator('[data-gallery-src]').first();await trigger.click();
  assert(await page.locator('#gallery-dialog').isVisible());
  await page.locator('#gallery-dialog img').evaluate(img=>img.decode());
  await page.keyboard.press('Escape');assert(!(await page.locator('#gallery-dialog').isVisible()));
  assert(await trigger.evaluate(el=>el===document.activeElement));
  await page.locator('[data-direction="1"]').click();
  await page.waitForFunction(()=>document.querySelector('[data-carousel-status]').textContent==='Avaliação 2 de 3');
  const removed=await page.goto(origin+'/servicos/contato-com-liquido/');assert.equal(removed.status(),404);
  report.interaction.push('Three real result photos, gallery opens and Escape returns focus','Only three reviews; mobile next button advances to second review','Removed liquid service returns 404 and has no links');
  const missing=await page.goto(origin+'/nao-existe/');assert.equal(missing.status(),404);report.interaction.push('Unknown URL returns real 404');
  for(const file of await readdir('public/images'))if(file.endsWith('.webp')&&!['logo.webp','symbol.webp'].includes(file))assert((await sharp('public/images/'+file).metadata()).hasAlpha,file);
  report.errors=errors.filter(e=>!e.includes('404')&&!e.includes('google')&&!e.includes('ERR_INTERNET_DISCONNECTED'));
  await writeFile('artifacts/verification.json',JSON.stringify(report,null,2));
  assert(report.accessibility.every(a=>a.violations.length===0),'Accessibility findings: see artifacts/verification.json');
  assert.deepEqual(report.errors,[],'Console errors: see report');
  console.log(JSON.stringify({pages:report.routes.length,widths:report.responsive.length,accessibility:'zero WCAG A/AA violations',interactions:report.interaction,consoleErrors:report.errors},null,2));
} finally {await browser.close();server.close();}

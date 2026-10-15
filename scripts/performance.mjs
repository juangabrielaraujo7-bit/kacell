import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFile } from 'node:fs/promises';
import { server } from './serve.mjs';
await new Promise(resolve=>server.listen(4323,'127.0.0.1',resolve));
const chrome=await launch({chromePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',chromeFlags:['--headless','--disable-gpu'],logLevel:'silent'});
try{
  const result=await lighthouse('http://127.0.0.1:4323/',{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],formFactor:'mobile'});
  await writeFile('artifacts/lighthouse.json',result.report);
  const summary={profile:'Chrome headless, Lighthouse mobile simulated throttling, local static production build',scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,Math.round(value.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(key=>[key,result.lhr.audits[key].displayValue])),failed:Object.values(result.lhr.audits).filter(a=>a.score!==null&&a.score<1&&a.details?.type==='table').map(a=>({id:a.id,title:a.title,score:a.score}))};
  await writeFile('artifacts/lighthouse-summary.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));
}finally{await chrome.kill();server.close();}

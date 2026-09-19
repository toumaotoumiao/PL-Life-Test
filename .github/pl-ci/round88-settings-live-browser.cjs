'use strict';
// Synthetic-only acceptance: no personal account, browser profile, or real user backups.
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'../..');
const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
const shell=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const match=shell.match(/const APP_SHELL\s*=\s*\[([^\]]+)\]/);
if(!match)throw Error('App shell file list unavailable');
const allowed=new Set([...match[1].matchAll(/["']\.\/([^"']+)["']/g)].map(row=>row[1]));allowed.add('sw.js');
const mime=name=>name.endsWith('.js')?'text/javascript; charset=utf-8':name.endsWith('.webmanifest')?'application/manifest+json':'text/html; charset=utf-8';
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://127.0.0.1').pathname.slice(1);
 if(!allowed.has(name)||!['GET','HEAD'].includes(req.method)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':mime(name),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 res.end(req.method==='HEAD'?undefined:fs.readFileSync(path.join(root,name)));
});
const sections=['overview','appearance','rating','behavior','data','migration','version','advanced'];
(async()=>{
 let browser;const failures=[];let checks=0;
 try{
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
  browser=await chromium.launch({headless:true});
  for(const width of [375,768,1212]){
   const context=await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
   const page=await context.newPage();const errors=[];
   page.on('pageerror',e=>errors.push(String(e.message||e)));
   await page.goto('http://127.0.0.1:'+server.address().port+'/index.html',{waitUntil:'load',timeout:60000});
   await page.waitForFunction(()=>typeof openSettings==='function'&&typeof activateSettingsPanel==='function',null,{timeout:60000});
   if(await page.locator('#onboardingBackdrop').isVisible())await page.locator('#onboardingLaterBtn').click();
   await page.evaluate(()=>openSettings());
   for(const name of sections){
    await page.locator(`#settingsModal .settings-nav [data-settings-target="${name}"]`).click();
    const result=await page.evaluate(name=>{
      const m=document.getElementById('settingsModal'),panel=m.querySelector(`[data-settings-panel="${name}"]`);
      const active=[...m.querySelectorAll('[data-settings-panel]')].filter(x=>!x.hidden);
      const nav=m.querySelector('.settings-nav'),r=nav.getBoundingClientRect();
      const errors=[];
      if(active.length!==1||active[0]!==panel)errors.push('tab switching leaves multiple panels visible');
      if(nav.scrollWidth>nav.clientWidth+3)errors.push('settings nav clipped horizontally');
      if(r.width<200&&innerWidth>=761)errors.push('desktop nav is too narrow');
      if(m.scrollWidth>m.clientWidth+5)errors.push('settings modal overflows horizontally');
      if(name==='data'){
       const buttons=['exportBtn','importBtn'].map(id=>m.querySelector('#'+id));
       for(const btn of buttons){const b=btn.getBoundingClientRect();if(b.width<120||b.height<40||b.right>innerWidth+2)errors.push(btn.id+' is clipped or unreachable');}
       const inp=m.querySelector('#importFile');for(const ext of ['.zip','.json','.html','.plbackup','.plmove'])if(!inp.accept.includes(ext))errors.push('file selector missing '+ext);
      }
      if(name==='version'&&!m.querySelector('#releaseNotesBox'))errors.push('version history missing');
      return errors;
    },name);
    checks++; failures.push(...result.map(error=>({width,name,error})));
   }
   await page.locator('#settingsModal .settings-nav [data-settings-target="data"]').click();
   const chooser=page.waitForEvent('filechooser',{timeout:10000});
   await page.locator('#importBtn').click();const native=await chooser;
   if(!native||!native.element)failures.push({width,name:'data',error:'native import file chooser missing'});
   checks++;
   if(errors.length)failures.push({width,name:'runtime',error:errors.slice(0,3).join(' | ')});
   await context.close();
  }
  console.log('SETTINGS_LIVE_AUDIT',JSON.stringify({version:(source.match(/const APP_UI_VERSION = "([0-9.]+)"/)||[])[1],checks,failures:failures.slice(0,20)}));
  if(failures.length)process.exitCode=1;
 }catch(e){console.error('SETTINGS_LIVE_FAIL',String(e.stack||e));process.exitCode=1;}
 finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})();

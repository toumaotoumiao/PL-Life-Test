'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');

function extractFunction(name){
  const start=html.indexOf(`function ${name}(`);
  assert.ok(start>=0,`missing ${name}`);
  const brace=html.indexOf('{',start);
  let depth=0,quote='',escape=false,templateDepth=0;
  for(let i=brace;i<html.length;i++){
    const ch=html[i],prev=html[i-1];
    if(quote){
      if(escape){escape=false;continue;}
      if(ch==='\\'){escape=true;continue;}
      if(ch===quote){quote='';continue;}
      continue;
    }
    if(ch==='"'||ch==="'"){quote=ch;continue;}
    if(ch==='`'){quote='`';continue;}
    if(ch==='{')depth++;
    else if(ch==='}'&&--depth===0)return html.slice(start,i+1);
  }
  throw new Error(`unterminated ${name}`);
}

const src=[
  extractFunction('sensitiveExportResumeRef'),
  extractFunction('findSensitiveExportResumeTarget'),
  extractFunction('resumeSensitiveImageExport')
].join('\n');

test('privacy export resume is deferred until the confirm click has finished bubbling',async()=>{
  let clicks=0;
  const live={id:'selfIntroExportBtn',dataset:{},isConnected:true,click(){clicks++;}};
  const document={getElementById:id=>id==='selfIntroExportBtn'?live:null,querySelectorAll:()=>[]};
  const context={document,setTimeout,console,Object};
  vm.createContext(context);vm.runInContext(src,context);
  const stale={id:'selfIntroExportBtn',dataset:{},isConnected:true};
  const ref=context.sensitiveExportResumeRef(stale);
  context.resumeSensitiveImageExport(ref);
  assert.equal(clicks,0,'resume must not fire synchronously inside the dialog confirm click');
  await new Promise(r=>setTimeout(r,12));
  assert.equal(clicks,1);
  assert.equal(live.dataset.privacyExportBypassOnce,'1');
});

test('privacy export resume reacquires a rerendered dynamic record button',async()=>{
  let staleClicks=0,liveClicks=0;
  const stale={id:'',dataset:{recordShowcase:'record-42'},isConnected:false,click(){staleClicks++;}};
  const live={id:'',dataset:{recordShowcase:'record-42'},isConnected:true,
    getAttribute(name){return name==='data-record-showcase'?'record-42':null;},click(){liveClicks++;}};
  const document={getElementById:()=>null,querySelectorAll:selector=>selector==='[data-record-showcase]'?[live]:[]};
  const context={document,setTimeout,console,Object};
  vm.createContext(context);vm.runInContext(src,context);
  const ref=context.sensitiveExportResumeRef(stale);
  context.resumeSensitiveImageExport(ref);
  await new Promise(r=>setTimeout(r,12));
  assert.equal(staleClicks,0,'detached pre-render button must not be reused');
  assert.equal(liveClicks,1,'live replacement must receive the resumed action');
  assert.equal(live.dataset.privacyExportBypassOnce,'1');
});

test('current sensitive export flow captures a resume reference before opening the privacy dialog',()=>{
  assert.match(html,/const resumeRef=sensitiveExportResumeRef\(btn\);/);
  assert.match(html,/resumeSensitiveImageExport\(resumeRef\);/);
  assert.match(html,/\["hoImageStyle","recordShowcase","pcShowcase","nativeModuleShowcase"\]/);
});

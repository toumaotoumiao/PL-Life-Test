'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../../index.html'),'utf8');
const script=fs.readFileSync(path.join(__dirname,'round82-log-live-browser.cjs'),'utf8');
const strip=html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'');
function parentSectionOf(id){
 const tag=strip.match(new RegExp('<(?:div|section)\\b[^>]*\\bid="'+id+'"[^>]*>'));
 assert(tag,'missing element '+id);
 const start=strip.indexOf(tag[0]);
 const stack=[];const pattern=/<\/?(?:section|div)\b[^>]*>/gi;
 let token;
 while((token=pattern.exec(strip))&&token.index<start){
  if(token[0].startsWith('</'))stack.pop();else stack.push(token[0]);
 }
 return stack.filter(s=>/\bid="(?:profiles|pcs|modules|plans|records|selfIntro|stats)View"/.test(s));
}
test('all modal editors and periodic schedule are outside hidden main views',()=>{
 for(const id of ['planEditorBackdrop','periodicScheduleBackdrop','nativeModuleEditorBackdrop','moduleAdvancedBackdrop'])
  assert.deepEqual(parentSectionOf(id),[],id+' must not inherit hidden main view');
});
test('Log browser test opens a plan from another view and checks physical visibility',()=>{
 assert.match(script,/openPlanEditor\('round82-plan'\)/);
 assert.doesNotMatch(script,/switchView\('plans'\)/);
 assert.match(script,/await plan\.isVisible\(\)/);
 assert.match(script,/hiddenAncestor/);
 assert.match(script,/await record\.isVisible\(\)/);
});

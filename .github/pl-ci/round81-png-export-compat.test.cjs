'use strict';
// Synthetic PNG canvas tests only. No personal files or remote websites.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const site=path.resolve(__dirname,'../..');
const html=fs.readFileSync(path.join(site,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(site,'sw.js'),'utf8');
const start=html.indexOf('async function canvasToPngBlobCompat(canvas) {');
const end=html.indexOf('async function exportSelfIntroImage(',start);
assert(start>0&&end>start,'PNG helper must appear before preference image export');
const helper=html.slice(start,end);
function run(canvas){
  const ctx={Blob,Uint8Array,atob,console:{warn:()=>{}}};
  return vm.runInNewContext(helper+'\ncanvasToPngBlobCompat(canvas)',{...ctx,canvas},{timeout:3000});
}
const tiny='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL/nwAAAABJRU5ErkJggg==';
test('native canvas PNG blob is returned unchanged',async()=>{
 const png=new Blob([Buffer.from([1,2,3])],{type:'image/png'});
 const result=await run({width:100,height:100,toBlob(cb,mime){assert.equal(mime,'image/png');cb(png)},toDataURL(){throw Error('fallback should not run')}});
 assert.strictEqual(result,png);
});
test('older mobile browser without toBlob falls back to PNG data URL',async()=>{
 const result=await run({width:10,height:10,toDataURL:mime=>{assert.equal(mime,'image/png');return tiny;}});
 assert.equal(result.type,'image/png');assert.equal(result.size,Buffer.from(tiny.split(",")[1],"base64").length);assert.equal(Buffer.from(await result.arrayBuffer()).toString('hex').slice(0,16),'89504e470d0a1a0a');
});
test('null native blob attempts fallback, not a false successful download',async()=>{
 const result=await run({width:10,height:10,toBlob(cb){cb(null)},toDataURL(){return tiny}});
 assert.equal(result.type,'image/png');assert(result.size>0);
});
test('native toBlob synchronous exception attempts fallback',async()=>{
 const result=await run({width:10,height:10,toBlob(){throw Error('broken mobile canvas')},toDataURL(){return tiny}});
 assert(result.size>0);
});
test('failed or empty PNG fails clearly rather than initiating an empty download',async()=>{
 await assert.rejects(run({width:10,height:10,toDataURL(){return 'data:,'}}),/未返回有效图像/);
 await assert.rejects(run({width:0,height:10,toDataURL(){return tiny}}),/画布无效/);
 await assert.rejects(run({width:10,height:10}),/不支持 PNG/);
});
test('base64 compatibility path decodes large data in bounded chunks',async()=>{
 const raw=Buffer.alloc(70000,0x41),url='data:image/png;base64,'+raw.toString('base64');
 const result=await run({width:5,height:5,toDataURL(){return url}});
 assert.equal(result.size,raw.length);assert.deepEqual(Buffer.from(await result.arrayBuffer()),raw);
});
test('all six PNG export entrypoints share the same compatibility conversion',()=>{
 assert.equal((html.match(/canvasToPngBlobCompat\(canvas\)/g)||[]).length,7); // one declaration + six calls
 assert.match(html,/async function exportSelfIntroImage\([\s\S]*?canvasToPngBlobCompat\(canvas\)/);
 assert.match(html,/async function exportStatsImage\([\s\S]*?canvasToPngBlobCompat\(canvas\)/);
 assert.match(html,/async function exportHoOrganizerImage\([\s\S]*?canvasToPngBlobCompat\(canvas\)/);
 assert.match(html,/async function exportWeeklyAvailabilityImage\([\s\S]*?canvasToPngBlobCompat\(canvas\)/);
 assert.match(html,/async function exportPcSimpleCard\([\s\S]*?canvasToPngBlobCompat\(canvas\)/);
 assert.match(html,/uxExportPreviewDownload[\s\S]*?canvasToPngBlobCompat\(canvas\)/);
});
test('visible version labels, runtime identifier and offline cache agree',()=>{
 const version=html.match(/const APP_UI_VERSION = "([0-9.]+)";/)?.[1];assert(version);
 assert(sw.includes('v'+version));
 assert(html.includes('页面版本：v'+version));
 assert(html.includes('id="versionUpdateSummary">v'+version));
 assert(html.includes('class="footer-meta-inline">v'+version));
 assert(html.includes('版本：v'+version+'　·　更新时间：'));
});

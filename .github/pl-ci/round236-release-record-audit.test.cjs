'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const expected=require('./round236-legacy-release-baseline.json');
const found={};for (const [,version,copy] of html.matchAll(/<div class="version-log-item"><strong class="version-log-version">v([^<]+)<\/strong><span class="version-log-copy">(.*?)<\/span><\/div>/g)){
 if(!(version in expected))continue;
 (found[version]??=[]).push(crypto.createHash('sha256').update(copy).digest('hex'));
}
test('Round236 historical duplicate release records retain original ordering and content',()=>{for(const [v,hashes] of Object.entries(expected)){assert.ok(hashes.length>1,`expected prior ambiguity for ${v}`);assert.deepEqual(found[v],hashes,`historical release ${v} silently rewritten`);}});
test('Round236 legacy collisions are explicitly audited, not repaired by guessing dates or versions',()=>{assert.equal(Object.keys(expected).length,4);const stage=fs.readFileSync(path.join(root,'STAGE75_REPORT.md'),'utf8');assert.match(stage,/历史版本记录/);assert.match(stage,/保留/);});

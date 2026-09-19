"use strict";
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const site=fs.existsSync(path.join(root,'site/index.html'))?path.join(root,'site'):root;
const html=fs.readFileSync(path.join(site,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(site,'sw.js'),'utf8');
function csp(){const m=html.match(/<meta\s+content="([^"]+)"\s+http-equiv="Content-Security-Policy"\s*\/>/);assert(m,'CSP meta missing');return m[1];}
test('allow only same-origin fetch for built-in program version check',()=>{
 const policy=csp();
 assert.match(policy,/(?:^|;)\s*connect-src 'self'\s*;/);
 assert.doesNotMatch(policy,/connect-src[^;]*(?:\*|https?:|data:|blob:)/);
 assert.match(html,/new URL\("\.\/sw\.js", location\.href\)/);
 assert.match(html,/fetch\(url\.toString\(\), \{ cache: "no-store", credentials: "same-origin" \}\)/);
});
test('do not broaden other CSP permissions or module tool network access',()=>{
 const p=csp();
 for (const directive of ["object-src 'none'", "base-uri 'none'", "form-action 'none'", "media-src 'none'"]) assert(p.includes(directive));
 const moduleHtml=fs.readFileSync(path.join(site,'module-tools.html'),'utf8');
 assert.match(moduleHtml,/connect-src 'none'/);
});
test('new app and service worker versions agree after cache bust',()=>{
 assert.match(html,/const APP_UI_VERSION = "8\.1\.12\.73"/);
 assert.match(sw,/v8\.1\.12\.73/);
});

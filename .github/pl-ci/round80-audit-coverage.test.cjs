"use strict";
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const file=fs.readFileSync(path.join(__dirname,'round78-ui-browser-audit.cjs'),'utf8');
test('onboarding modal must be dismissed before UI screenshots',()=>{
 assert.match(file,/onboardingLaterBtn/);
 assert.match(file,/onboarding-still-blocks-page/);
 assert.match(file,/await page\.waitForTimeout\(850\)/);
});
test('mobile navigation must use the visible bottom nav, not hidden desktop button click',()=>{
 assert.match(file,/#mobileBottomNav \[data-view-target/);
 assert.match(file,/page\.locator\(selector\)\.click/);
 assert.doesNotMatch(file,/page\.evaluate\(id=>document\.getElementById\(id\)\?\.click\(\),button\)/);
});
test('failed navigation must preserve diagnostics and a screenshot',()=>{
 assert.match(file,/physical-view-switch-failed/);
 assert.match(file,/visibleViews/);
 assert.match(file,/ui-failure-/);
});

test('sensitive image export audit must complete the real privacy preflight instead of leaving a blocking modal',()=>{
 assert.match(file,/completeSensitiveExportPreflight/);
 assert.match(file,/actionDialogTitle/);
 assert.match(file,/导出前检查隐私？/);
 assert.match(file,/selectOption\('privacy'\)/);
 assert.match(file,/privacy-preflight-left-blocking-page/);
 assert.doesNotMatch(file,/preference-export-panel-will-not-open/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {historicalBulletins} from './historical-model.js';
import {buildShareNote} from './share-note-model.js';
const now=Date.parse('2026-10-30T06:00:00Z');
const sample=historicalBulletins[0];
test('Bangla share note includes explicit historical warning, dates, review, source and official route',()=>{
 const r=buildShareNote(sample,'bn',now);
 assert.equal(r.kind,'ready');
 for(const value of ['বর্তমান সতর্কতা নয়','2026-04-23','2026-04-28','2026-10-30','যাচাই করা হয়নি',sample.sourceUrl,'https://ffwc.gov.bd/'])assert.ok(r.text.includes(value),value);
});
test('English note does not imply a current warning or known expiry',()=>{
 const r=buildShareNote(sample,'en',now);
 assert.equal(r.kind,'ready');
 assert.match(r.text,/NOT A CURRENT WARNING/);
 assert.match(r.text,/validity end time was not verified/);
 assert.match(r.text,/Do not use this document for today/);
});
test('never include a visitor question or identity in share payload',()=>{
 const r=buildShareNote(sample,'en',now);
 assert.ok(!r.text.includes('passport'));
 assert.ok(!r.text.includes('OTP'));
 assert.equal(Object.keys(r).includes('question'),false);
});
test('invalid, changed, future or unsupported records fail closed',()=>{
 for(const record of [null,{...sample},{...sample,district:'Other'},{...sample,sourceUrl:'https://evil.test/flood'},{...sample,updatedDate:'2027-01-01'},{...sample,sourceReviewDate:'2027-01-01'},{...sample,sourceReviewDate:''}]){
  assert.equal(buildShareNote(record,'en',now).kind,'unavailable');
 }
});
test('share code parses and requires user-triggered controls with fallback',()=>{
 execFileSync(process.execPath,['--check','share-note.js']);
 execFileSync(process.execPath,['--check','share-note-model.js']);
 const ui=readFileSync('share-note.js','utf8');
 assert.match(ui,/addEventListener\('click'/);
 assert.match(ui,/navigator\.share/);
 assert.match(ui,/navigator\.clipboard/);
 assert.match(ui,/AbortError/);
 assert.match(ui,/showManual/);
 const html=readFileSync('share-note.html','utf8');
 assert.match(html,/role="status"/);
 assert.match(html,/NOT CURRENT/);
 assert.match(html,/rel="noopener noreferrer"/);
});

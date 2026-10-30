import test from 'node:test';
import assert from 'node:assert/strict';
import {historicalBulletins, dayMillis, safeOfficialUrl, assessHistoricalBulletin, bulletinForDistrict} from './historical-model.js';
const sample = historicalBulletins[0];
test('only the researched district has an example',()=>{
  assert.equal(bulletinForDistrict('Sunamganj').length,1);
  assert.deepEqual(bulletinForDistrict('Kurigram'),[]);
});
test('historical bulletin has no verified validity and cannot appear live',()=>{
  assert.equal(assessHistoricalBulletin(sample,Date.parse('2026-10-30T00:00:00Z')),'validity-unverified');
  assert.equal(assessHistoricalBulletin(sample,Date.parse('2026-04-01T00:00:00Z')),'unavailable');
});
test('reject malformed, reversed and impossible dates',()=>{
  assert.equal(dayMillis('2026-02-30'),null);
  assert.equal(dayMillis('2026-04-28'),Date.parse('2026-04-28T00:00:00Z'));
  assert.equal(assessHistoricalBulletin({...sample,issuedDate:'2026-05-01'}),'unavailable');
  assert.equal(assessHistoricalBulletin({...sample,updatedDate:'invalid'}),'unavailable');
});
test('reject external or insecure source URLs',()=>{
  for(const sourceUrl of ['http://www.bamis.gov.bd/a','https://bamis.gov.bd.evil.test/a','javascript:alert(1)','https://user:pass@bamis.gov.bd/a']){
    assert.equal(safeOfficialUrl(sourceUrl),false);
    assert.equal(assessHistoricalBulletin({...sample,sourceUrl}),'unavailable');
  }
  assert.equal(safeOfficialUrl(sample.sourceUrl),true);
});
test('expired and future expiry cannot imply a live alert',()=>{
  const r={...sample,validUntil:'2026-04-30'};
  assert.equal(assessHistoricalBulletin(r,Date.parse('2026-10-30T00:00:00Z')),'expired');
  assert.equal(assessHistoricalBulletin({...r,validUntil:'2027-01-01'},Date.parse('2026-10-30T00:00:00Z')),'not-live-verified');
  assert.equal(assessHistoricalBulletin({...r,validUntil:'2026-04-20'}),'unavailable');
});

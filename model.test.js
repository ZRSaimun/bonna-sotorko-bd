import {test} from 'node:test';
import assert from 'node:assert/strict';
import {feedState} from './model.js';
import {escapeHTML} from './common.js';
test('core workflow and failure cases',()=>{assert.equal(feedState(null),'unavailable');assert.equal(feedState({source:'official',issuedAt:'bad',validUntil:'bad'}),'unavailable');const r={source:'official',issuedAt:'2026-01-01T00:00:00Z',validUntil:'2026-01-01T01:00:00Z'};assert.equal(feedState(r,Date.parse('2026-01-01T00:30:00Z')),'available');assert.equal(feedState(r,Date.parse(r.validUntil)),'stale');assert.equal(feedState(r,Date.parse('2025-12-31T00:00:00Z')),'stale');});
test('escape untrusted text',()=>{assert.equal(escapeHTML('<script>'), '&lt;script&gt;');});

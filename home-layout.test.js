import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const css=readFileSync(new URL('./styles.css',import.meta.url),'utf8');
const app=readFileSync(new URL('./app.js',import.meta.url),'utf8');

test('public information and official sources come before optional planning',()=>{
  assert.ok(html.indexOf('id="sources"')>html.indexOf('id="main"'));
  assert.ok(html.indexOf('id="sources"')<html.indexOf('id="archive"'));
  assert.ok(html.indexOf('id="archive"')<html.indexOf('id="prepare"'));
  for(const url of ['https://ffwc.gov.bd/','https://rapid.ddm.gov.bd/home/weather/','https://www.bamis.gov.bd/en/page/alert/latest/']) assert.ok(html.includes(url));
});
test('existing live-unavailable and household checklist controls are preserved',()=>{
  for(const id of ['district','status','checks','progress','reset','storage']) {
    assert.match(html,new RegExp('id="'+id+'"'));
    assert.match(app,new RegExp('#'+id+'\\b'));
  }
  assert.match(html,/No current|বর্তমান সতর্কতা যাচাই করা যায় না/);
  assert.match(html,/তথ্য না পাওয়া মানে বিপদ নেই/);
});
test('home has no decorative film, 3D scene or heavy runtime dependency',()=>{
  assert.doesNotMatch(html,/living-scene|scene\.js|<video|<canvas|living-poster|\.mp4/i);
  assert.match(html,/src="\.\/app\.js"/);
  assert.doesNotMatch(html,/<script[^>]*src="https?:/i);
});
test('navigation, no-script route, focus and reduced-motion treatment are present',()=>{
  assert.match(html,/<html lang="bn">/);
  assert.match(html,/class="skip" href="#main"/);
  assert.match(html,/aria-label="মূল নেভিগেশন"/);
  assert.match(html,/<noscript>/);
  assert.match(css,/:focus-visible/);
  assert.match(css,/@media\(max-width:550px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/@media print/);
});
test('all main-page local assets use published text-file paths',()=>{
  const assets=[...html.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)].map(x=>x[1]);
  for(const path of assets) assert.ok(['./index.html','./styles.css','./historical.html','./app.js'].includes(path),path);
});

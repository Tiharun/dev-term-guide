// 데이터 점검: node tests/check.mjs [파일]  (기본 index.html)
// 다음 작업들은 아래 EXPECT·COUNT·REDRAWN만 고친다.
import fs from 'fs';
import vm from 'vm';

const EXPECT = {};   // sec: [영문명…]  → 그 하위항목에 있어야 할 카드
const COUNT = {};    // sec: 카드 수
const REDRAWN = [];  // 글자 상자형 그림(flow·big·stack)이 없어야 할 sec
const ALLOW_DUP = ['component', 'dark mode', 'row', 'column', 'tag'];

const file = process.argv[2] || 'index.html';
const html = fs.readFileSync(file, 'utf8');
const unwrap = s => s.replace(/^\s*\(\(\) => \{\n/, '').replace(/\n\}\)\(\);\s*$/, '');
const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => unwrap(m[1]));
const any = new Proxy(function(){}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : any, apply: () => any, construct: () => any });
const ctx = vm.createContext({ document: any, window: any, location: { hash: '', search: '' },
  matchMedia: () => ({ matches: false, addEventListener(){} }), localStorage: { getItem: () => null, setItem(){} },
  IntersectionObserver: function(){ return { observe(){} }; }, navigator: any, addEventListener(){}, scrollTo(){}, setTimeout, clearTimeout, console });
scripts.forEach(s => vm.runInContext(s, ctx));
const g = vm.runInContext(`({TERMS, CATS, SYMPTOMS, SYMPTOM_GROUPS, D, byId, find, slug, visual,
  MOVED: typeof MOVED === 'undefined' ? undefined : MOVED})`, ctx);

const fails = [];
let n = 0;
const check = (name, fn) => { n++; try { const r = fn(); if (r) fails.push(`FAIL ${name}: ${r}`); } catch (e) { fails.push(`FAIL ${name}: ${e.message}`); } };
const design = g.CATS.find(c => c.id === 'design');
const sec = id => design.secs.find(s => s.id === id);

check('v', () => g.TERMS.filter(t => !t.v || (typeof t.v === 'string' && !g.D[t.v])).map(t => t.en).join(', '));
check('dup', () => { const seen = new Set(), dup = new Set();
  g.TERMS.forEach(t => { const k = t.en.toLowerCase(); if (seen.has(k) && !ALLOW_DUP.includes(k)) dup.add(t.en); seen.add(k); });
  return [...dup].join(', '); });
check('ref', () => [...g.TERMS.flatMap(t => (t.r || []).map(r => [t.en, r])), ...g.SYMPTOMS.flatMap(s => s.t.map(r => [s.q, r]))]
  .filter(([, r]) => !g.find(r)).map(([a, r]) => `${a}→${r}`).join(', '));
check('moved', () => g.MOVED === undefined ? '' : Object.entries(g.MOVED)
  .filter(([o, nw]) => !g.byId.has(nw) || g.byId.has(o)).map(([o, nw]) => `${o}→${nw}`).join(', '));
check('init', () => Object.entries(g.D).filter(([, p]) => p.init && (typeof p.init !== 'function' || /\b(window|document)\b/.test(String(p.init))))
  .map(([k]) => k).join(', '));
for (const [s, list] of Object.entries(EXPECT))
  check('expect:' + s, () => list.filter(en => { const t = g.find(en); return !t || t.c !== 'design' || t.s !== s; }).join(', '));
for (const [s, c] of Object.entries(COUNT))
  check('count:' + s, () => { const k = sec(s) ? sec(s).terms.length : 'no sec'; return k === c ? '' : `${k} ≠ ${c}`; });
for (const s of REDRAWN)
  check('redrawn:' + s, () => (sec(s) ? sec(s).terms : []).filter(t => t.v && typeof t.v === 'object' && (t.v.flow || t.v.big || t.v.stack)).map(t => t.en).join(', '));
check('sym', () => g.SYMPTOM_GROUPS.length !== 8 ? 'groups ' + g.SYMPTOM_GROUPS.length
  : g.SYMPTOMS.filter(s => !g.SYMPTOM_GROUPS.includes(s.g)).map(s => s.q).join(', '));

if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('OK ' + n);

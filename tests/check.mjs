// 데이터 점검: node tests/check.mjs [파일]  (기본 index.html)
// 다음 작업들은 아래 EXPECT·COUNT·REDRAWN·LATER만 고친다. 키가 '카테고리/하위항목'이면 그 카테고리, '/'가 없으면 design이다.
import fs from 'fs';
import vm from 'vm';
import zlib from 'zlib';

const EXPECT = {   // sec: [영문명…]  → 그 하위항목에 있어야 할 카드
  form: ['Checkbox', 'Radio Button', 'Toggle Switch', 'Dropdown', 'Form', 'Input Field', 'Placeholder',
    'Label', 'Helper Text', 'Inline Validation', 'Required Field', 'Text Area', 'Select Box', 'Autocomplete', 'Search Bar', 'Date Picker',
    'Slider', 'Quantity Stepper', 'File Upload', 'Dropzone', 'Segmented Control', 'Password Toggle', 'Floating Label', 'Disabled State',
    'Submit Button', 'OTP Input', 'Input Mask', 'Rating'],
  feedback: ['Modal', 'Overlay', 'Toast', 'Tooltip', 'Skeleton UI', 'Empty State', 'Badge', 'Loading Spinner', 'Progress Bar', 'Loading State',
    'Snackbar', 'Banner', 'Confirm Dialog', 'Popover', 'Notification Dot', 'Error State', 'Success State', 'Inline Message',
    'Determinate vs Indeterminate', 'Optimistic UI', 'Status Indicator', 'Cookie Consent Banner', 'Destructive Action'],
  nav: ['Tab', 'Hamburger Menu', 'Drawer', 'Breadcrumb', 'Pagination', 'GNB', 'LNB', 'Tab Bar', 'Mega Menu', 'Stepper',
    'Back Button', 'FAB', 'Back to Top', 'Anchor Link', 'Table of Contents', 'Load More Button', 'Navigation Rail',
    'Skip Link', 'Active Menu', 'Kebab Menu'],
  data: ['Data Table', 'Table Header', 'Sortable Column', 'Filter Panel', 'List', 'Grid View', 'Tree View', 'Kanban Board',
    'Timeline', 'Zebra Stripes', 'Frozen Column', 'Bulk Action', 'Inline Edit', 'Expandable Row', 'Responsive Table',
    'Dashboard', 'Bar Chart', 'Line Chart', 'Pie Chart', 'Legend', 'Master-Detail'],
  style: ['Flat Design', 'Skeuomorphism', 'Glassmorphism', 'Neumorphism', 'Material Design', 'Human Interface Guidelines', 'Elevation',
    'Backdrop Blur', 'Stroke', 'Line Icon vs Solid Icon', 'Squircle', 'Grain Texture', 'Duotone', 'Minimalism', 'Brutalism',
    'Bento Grid', 'Inner Shadow', 'Glow', 'Mesh Gradient', 'Illustration', 'Isometric'],
  gesture: ['Tap', 'Double Tap', 'Long Press', 'Swipe', 'Pinch Zoom', 'Pan', 'Drag and Drop', 'Drag to Reorder', 'Pull to Refresh',
    'Swipe to Delete', 'Edge Swipe', 'Haptic Feedback', 'Pressed State', 'Tab Order', 'Cursor Style', 'Scroll Snap', 'Rubber Banding', 'Momentum Scroll'],
  device: ['Safe Area', 'Notch', 'Dynamic Island', 'Home Indicator', 'Screen Resolution', 'Pixel Density', 'Retina Display',
    'Physical vs CSS Pixel', 'Screen Size', 'Orientation', 'Foldable', 'Split Screen', 'Refresh Rate', 'Virtual Keyboard', 'Text Scaling', 'Bezel'],
  media: ['Carousel', 'Avatar', 'Thumbnail', 'Crop', 'Blur-up Placeholder', 'Lightbox', 'Gallery', 'Image Format', 'Vector vs Raster',
    'Alt Text', 'Responsive Image', 'Image Compression', 'Video Player', 'Autoplay', 'Poster Image', 'Background Video', 'Embed', 'GIF',
    'Masonry Layout', 'Watermark', 'Lottie'],
  basic: ['Consistency', 'Focal Point', 'Readability', 'Visual Weight', 'Balance', 'Grouping', 'Density'],
  core: ['Primary Button', 'Secondary Button', 'Ghost Button', 'Icon Button', 'Style Guide', 'UI Kit', 'User Flow', 'Design Spec'],
  motion: ['Crossfade', 'Shared Element Transition', 'Shimmer', 'Count-up', 'Typewriter Effect', 'Marquee', 'Scroll-linked Animation', 'Collapse / Expand', 'Reveal Mask', 'Path Drawing', 'Magnetic Button', 'Tilt Effect', 'Confetti'],
  adv: ['Progressive Disclosure', 'Cognitive Load', "Hick's Law", "Jakob's Law", 'F-pattern / Z-pattern', 'Information Architecture',
    'Mental Model', 'Usability Test', 'Heuristic Evaluation', 'Modular Scale'],
  app: ['Splash Screen', 'Onboarding', 'App Bar', 'Scrollbar', 'Split Pane', 'Shortcut Key', 'Window Controls', 'Tray Icon',
    'Settings Screen', 'Inspector Panel', 'Command Palette'],
  tool: ['Variables', 'Styles', 'Plugin', 'Smart Animate', 'Mask', 'Boolean Operation', 'Export', 'Team Library', 'Slice', 'Pen Tool',
    'Component Properties', 'Hug / Fill / Fixed', 'Layout Grid', 'Version History'],
  font: ['Font Family', 'Variable Font', 'Baseline', 'x-height', 'Cap Height', 'Ligature', 'Myeongjo vs Gothic', 'Subset', 'Italic',
    'Heading Levels', 'Body Text', 'Orphan / Widow', 'Font License'],
  color: ['Saturation', 'Brightness', 'Tint / Shade', 'Semantic Color', 'Brand Color', 'Complementary Color', 'Analogous Color', 'Monochrome',
    'Neutral Color', 'Color Blindness', 'RGB vs CMYK', 'Tone Down', 'Color Temperature', 'OKLCH'],
  tip: ['Develop', 'Asset', 'Design Review', 'Layout Frame', 'Dummy Data', 'Lorem Ipsum', 'Benchmarking', 'Moodboard'],
  'terminal/basic': ['Terminal', 'CLI', 'Path', 'Directory', 'Shell', 'Shell Prompt', 'Command', 'Working Directory', 'Home Directory',
    'Absolute vs Relative Path', 'Argument', 'Option', 'GUI'],
};
const COUNT = { form: 28, feedback: 23, nav: 20, data: 21, style: 21, gesture: 18, device: 16, media: 21, basic: 15, core: 14, motion: 31, adv: 19, app: 19, tool: 23, font: 27, color: 24, tip: 16,
  'basics/core': 8, 'terminal/basic': 13 };    // sec: 카드 수
const REDRAWN = ['basic', 'core', 'adv', 'tool', 'font', 'color', 'tip'];  // 글자 상자형 그림(flow·big·stack)이 없어야 할 sec
const LATER = ['font'];    // 실패해도 exit에 영향 없이 'LATER 이름:'으로만 알리는 점검(마무리 작업에서 비운다)
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
const later = [];
const check = (name, fn) => { n++; let r; try { r = fn(); } catch (e) { r = e.message; }
  if (r) (LATER.includes(name) ? later : fails).push(`${LATER.includes(name) ? 'LATER' : 'FAIL'} ${name}: ${r}`); };
const at = k => { const [c, s] = k.includes('/') ? k.split('/') : ['design', k], cat = g.CATS.find(x => x.id === c);
  return {c, s, sec: cat && cat.secs.find(x => x.id === s)}; };

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
for (const [k, list] of Object.entries(EXPECT))
  check('expect:' + k, () => { const {c, s} = at(k); return list.filter(en => { const t = g.find(en); return !t || t.c !== c || t.s !== s; }).join(', '); });
for (const [k, n] of Object.entries(COUNT))
  check('count:' + k, () => { const {sec} = at(k), m = sec ? sec.terms.length : 'no sec'; return m === n ? '' : `${m} ≠ ${n}`; });
for (const k of REDRAWN)
  check('redrawn:' + k, () => (at(k).sec ? at(k).sec.terms : []).filter(t => t.v && typeof t.v === 'object' && (t.v.flow || t.v.big || t.v.stack)).map(t => t.en).join(', '));
check('base', () => vm.runInContext(`(() => {
  const eq = (s, a) => s.size === a.length && a.every(x => s.has(x)), m = {'web-form': 'design-form'}, e = [];
  const s1 = new Set(['web-form', 'x']); if (migrateIds(s1, m) !== true || !eq(s1, ['design-form', 'x'])) e.push('바꾸기');
  const s2 = new Set(['web-form', 'design-form']); migrateIds(s2, m); if (!eq(s2, ['design-form'])) e.push('둘 다 있음');
  if (migrateIds(s1, m) !== false) e.push('두 번째 호출');
  if (migrateIds(new Set(), m) !== false) e.push('빈 Set');
  if (!phone('a').includes('mk-phone') || !browser('a').includes('mk-browser') || !pair('a', 'b').includes('mk-pair')) e.push('틀');
  if (typeof MOVED !== 'object') e.push('MOVED');
  if (!term([{c:'ls'},{o:'a'},{e:'b'}]).includes('mk-term')) e.push('term');
  const q = term([{c:'echo "<b>" > a && b | c'}]);
  if (q.includes('<b>') || !q.includes('&quot;&lt;b&gt;&quot; &gt; a &amp;&amp; b | c')) e.push('term esc');
  if (!term([{o:'a > b', h:'>'}]).includes('<span class="mk-hl">&gt;</span>')) e.push('term h');
  if (/ A\\b|mk-tl/.test(term([{c:'x'}], {still:true}))) e.push('term still');
  const k = tkeys(['Tab', '다시']); if (!k.includes('data-k="Tab"') || !k.includes('type="button"')) e.push('tkeys');
  if (!plate(Object.assign({}, TERMS[0], {ps:'\`Get-Item\`'})).includes('<b>Windows PowerShell</b><span><code>Get-Item</code></span>')) e.push('ps 행');
  return e.join(', ');
})()`, ctx));
check('cat', () => { const c = g.CATS[1]; return c && c.id === 'terminal' && c.secs.map(s => s.id).join() === 'basic,core,motion,adv,cmd,tip' ? '' : 'CATS[1] ' + (c && c.id); });
check('ps', () => g.TERMS.filter(t => 'ps' in t && (typeof t.ps !== 'string' || !t.ps.trim())).map(t => t.en).join(', '));
check('sym', () => g.SYMPTOM_GROUPS.length !== 8 ? 'groups ' + g.SYMPTOM_GROUPS.length
  : g.SYMPTOMS.filter(s => !g.SYMPTOM_GROUPS.includes(s.g)).map(s => s.q).join(', '));
const SYM_NEW = ['아이폰에서 위·아래 내용이 가려져요', '휴대폰을 가로로 돌리면 화면이 깨져요', '키보드가 올라오면 입력칸이 가려져요', '표가 휴대폰에서 옆으로 삐져나가요',
  '글자 크기 설정을 키우면 화면이 깨져요', '고해상도 화면에서 이미지가 흐릿해요', '입력하자마자 빨간 오류 글씨가 떠요', '끌어서 놓기가 안 돼요', '버튼을 눌러도 눌린 느낌이 없어요',
  'Tab 키를 누르면 엉뚱한 곳으로 이동해요', '아래로 당겨도 새로고침이 안 돼요', '눌렀는데 한참 뒤에야 화면이 바뀌어요', '알림이 너무 빨리 사라져요', '스크롤이 칸마다 딱 멈추지 않아요',
  '목록 끝에서 튕기는 느낌이 없어요', '뒤가 유리처럼 흐리게 비치게 하고 싶어요', '모서리가 아이폰 아이콘처럼 부드럽지 않아요', '색약인 사람이 구분을 못 해요', '색이 너무 쨍해요',
  '마지막 줄에 한 글자만 남아요', '제목 글꼴 중 일부 글자만 모양이 달라요', '긴 페이지에서 맨 위로 돌아가기 힘들어요', '이미지가 늦게 뜨고 덜컥 나타나요', '사진 때문에 페이지가 무거워요',
  '이미지가 안 보일 때 무슨 사진인지 몰라요', '동영상 자동 재생이 안 돼요'];    // 스펙 6장 26개(칩 말투에 맞춰 해요체)
check('symcount', () => g.SYMPTOMS.length !== 82 ? 'length ' + g.SYMPTOMS.length
  : SYM_NEW.filter(q => !g.SYMPTOMS.some(s => s.q === q)).join(', '));

check('total', () => g.TERMS.length === 987 ? '' : 'TERMS ' + g.TERMS.length);    // 737 + 새 용어 241(Fitts's Law는 기존 카드 보강) + 터미널
check('webparts', () => { const n = g.TERMS.filter(t => t.c === 'web' && t.s === 'parts').length; return n === 8 ? '' : 'parts ' + n; });
const fontCmap = () => {    // FONT 블록 안 woff(1.0)의 cmap에 든 글자
  const b = Buffer.from(html.match(/FONT:START[\s\S]*?base64,([A-Za-z0-9+/=]+)/)[1], 'base64'), set = new Set();
  let t;
  for (let i = 0; i < b.readUInt16BE(12); i++) { const o = 44 + i * 20; if (b.toString('latin1', o, o + 4) !== 'cmap') continue;
    const off = b.readUInt32BE(o + 4), len = b.readUInt32BE(o + 8); t = len < b.readUInt32BE(o + 12) ? zlib.inflateSync(b.subarray(off, off + len)) : b.subarray(off, off + len); }
  for (let i = 0; i < t.readUInt16BE(2); i++) { const s = t.readUInt32BE(8 + i * 8), f = t.readUInt16BE(s);
    if (f === 12) for (let j = 0; j < t.readUInt32BE(s + 12); j++) for (let c = t.readUInt32BE(s + 16 + j * 12); c <= t.readUInt32BE(s + 20 + j * 12); c++) set.add(c);
    if (f === 4) { const seg = t.readUInt16BE(s + 6) / 2, E = s + 14, S = E + seg * 2 + 2, D = S + seg * 2, R = D + seg * 2;
      for (let j = 0; j < seg; j++) { const a = t.readUInt16BE(S + j * 2), z = t.readUInt16BE(E + j * 2), d = t.readUInt16BE(D + j * 2), r = t.readUInt16BE(R + j * 2);
        for (let c = a; c <= z && c !== 0xFFFF; c++) { const gi = r ? t.readUInt16BE(R + j * 2 + r + (c - a) * 2) : c; if (gi && (gi + d) & 0xFFFF) set.add(c); } } } }
  return set;
};
check('font', () => { const set = fontCmap(), out = html.replace(/\/\* FONT:START \*\/[\s\S]*?\/\* FONT:END \*\//, '');
  const miss = [...new Set(out.match(/[ㄱ-ㆎ가-힣]/g))].filter(ch => !set.has(ch.codePointAt(0)));
  return miss.length ? miss.length + '자 없음: ' + miss.slice(0, 20).join('') : ''; });

if (later.length) console.log(later.join('\n'));
if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('OK ' + n);

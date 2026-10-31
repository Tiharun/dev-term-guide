// 데이터 점검: node tests/check.mjs [파일]  (기본 index.html)
// 다음 작업들은 아래 EXPECT·COUNT·REDRAWN만 고친다.
import fs from 'fs';
import vm from 'vm';

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
};
const COUNT = { form: 28, feedback: 23, nav: 20, data: 21, style: 21, gesture: 18, device: 16, media: 21 };    // sec: 카드 수
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
check('base', () => vm.runInContext(`(() => {
  const eq = (s, a) => s.size === a.length && a.every(x => s.has(x)), m = {'web-form': 'design-form'}, e = [];
  const s1 = new Set(['web-form', 'x']); if (migrateIds(s1, m) !== true || !eq(s1, ['design-form', 'x'])) e.push('바꾸기');
  const s2 = new Set(['web-form', 'design-form']); migrateIds(s2, m); if (!eq(s2, ['design-form'])) e.push('둘 다 있음');
  if (migrateIds(s1, m) !== false) e.push('두 번째 호출');
  if (migrateIds(new Set(), m) !== false) e.push('빈 Set');
  if (!phone('a').includes('mk-phone') || !browser('a').includes('mk-browser') || !pair('a', 'b').includes('mk-pair')) e.push('틀');
  if (typeof MOVED !== 'object') e.push('MOVED');
  return e.join(', ');
})()`, ctx));
check('sym', () => g.SYMPTOM_GROUPS.length !== 8 ? 'groups ' + g.SYMPTOM_GROUPS.length
  : g.SYMPTOMS.filter(s => !g.SYMPTOM_GROUPS.includes(s.g)).map(s => s.q).join(', '));

if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('OK ' + n);

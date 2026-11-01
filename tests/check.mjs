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
  'terminal/core': ['Bash', 'PowerShell', 'Command Prompt', 'Tab Completion', 'Command History', 'Interrupt', 'PATH Variable', 'Exit Code',
    'Standard Output', 'Standard Error', 'Pipe', 'Redirection', 'Wildcard', 'sudo', 'Run as Administrator'],
  'terminal/motion': ['Cursor Blink', 'Progress Output', 'Streaming Output', 'Scrollback', 'Watch Mode', 'Confirmation Prompt', 'Hidden Input', 'Pager', 'TUI'],
  'terminal/adv': ['Process', 'PID', 'Signal', 'Background Process', 'Standard Input', 'Shebang', 'chmod', 'Alias', 'Shell Profile', 'Dotfile', 'Quoting', 'Escape Character', 'Command Chaining', 'Execution Policy', 'WSL'],
  'terminal/cmd': ['cd', 'ls', 'pwd', 'mkdir', 'touch', 'cp', 'mv', 'rm', 'cat', 'echo', 'grep', 'find', 'which', 'clear', 'history', 'curl', 'tail', 'ps', 'kill', '--help'],
  'terminal/tip': ['Terminal vs Shell', 'Integrated Terminal', 'Copy-Paste Caution', 'Dry Run', 'Verbose Mode', 'rm -rf', 'Character Encoding', 'Line Ending', 'Sharing Terminal Output'],
  'net/basic': ['Network', 'Internet', 'IP Address', 'Port', 'DNS', 'Packet', 'Protocol', 'Router', 'Modem', 'Wi-Fi', 'Ethernet', 'Bandwidth'],
  'net/core': ['TCP', 'UDP', 'IPv4 vs IPv6', 'Private vs Public IP', 'NAT', 'DHCP', 'Default Gateway', 'Subnet', 'LAN vs WAN', 'Firewall', 'Proxy', 'VPN', 'Hostname', 'DNS Record', 'MAC Address'],
  'net/motion': ['Ping', 'Latency', 'Packet Loss', 'Jitter', 'TCP Handshake', 'Throughput', 'Upload vs Download', 'DNS Propagation', 'Retransmission'],
  'net/adv': ['OSI Model', 'TCP/IP Model', 'Network Routing', 'Hop', 'MTU', 'Socket', 'CIDR', 'ARP', 'TLS Handshake', 'QUIC', 'DNS Resolver', 'Port Forwarding', 'P2P'],
  'net/proto': ['Well-known Port', 'Ephemeral Port', 'Port 80 / 443', 'Dev Server Port', 'Database Port', 'ICMP', 'FTP / SFTP', 'SMTP', 'IMAP / POP3', 'WebRTC'],
  'net/tip': ['Port Already in Use', 'Connection Refused', 'Bind Address', 'Hosts File', 'DNS Cache', 'Localhost Tunnel', 'Same Wi-Fi Testing', 'Captive Portal', "It's Always DNS"],
  'test/basic': ['Testing', 'Test Case', 'Test Suite', 'Test Code', 'Test Runner', 'Assertion', 'Pass / Fail', 'Automated Test', 'Manual Testing', 'QA', 'Test Coverage'],
  'test/core': ['describe / it', 'expect', 'Matcher', 'Mock', 'Stub', 'Spy', 'Test Double', 'Fixture', 'beforeEach / afterEach', 'Arrange-Act-Assert', 'Snapshot Test', 'Test File Naming', 'Jest', 'Vitest', 'Playwright'],
  'test/motion': ['Red-Green-Refactor', 'Auto-waiting', 'Test Timeout', 'Test Retry', 'Parallel Test', 'Headless vs Headed', 'Trace Viewer', 'Snapshot Update', 'Flaky Test'],
  'test/adv': ['TDD', 'BDD', 'Test Pyramid', 'Test Isolation', 'Deterministic Test', 'Dependency Injection', 'Locator', 'Page Object Model', 'Coverage Threshold', 'Mutation Testing', 'Property-based Testing', 'Contract Testing'],
  'test/kind': ['Unit Test', 'Integration Test', 'E2E Test', 'Component Test', 'API Test', 'Smoke Test', 'Regression Test', 'Visual Regression Test', 'Acceptance Test', 'Exploratory Testing', 'Sanity Test', 'Performance / Load Test', 'Accessibility Test', 'Static Analysis'],
  'test/tip': ['Happy Path vs Unhappy Path', 'Given-When-Then', 'Bug First Test', 'Test Behavior Not Implementation', '.only / .skip', 'Required Check', 'Broken Build', 'Test Account', 'QA Sign-off', 'Test Report'],
};
const COUNT = { form: 28, feedback: 23, nav: 20, data: 21, style: 21, gesture: 18, device: 16, media: 21, basic: 15, core: 14, motion: 31, adv: 19, app: 19, tool: 23, font: 27, color: 24, tip: 16,
  'basics/core': 8, 'terminal/basic': 13, 'terminal/core': 15, 'terminal/motion': 9, 'terminal/adv': 15, 'terminal/cmd': 20, 'terminal/tip': 9,
  'server/basic': 5, 'server/motion': 6, 'net/basic': 12, 'net/core': 15, 'net/motion': 9, 'net/adv': 13, 'net/proto': 10, 'net/tip': 9,
  'bug/core': 8, 'bug/adv': 7, 'test/basic': 11, 'test/core': 15, 'test/motion': 9, 'test/adv': 12, 'test/kind': 14, 'test/tip': 10, 'deploy/tip': 7 };    // sec: 카드 수
const REDRAWN = ['basic', 'core', 'adv', 'tool', 'font', 'color', 'tip'];  // 글자 상자형 그림(flow·big·stack)이 없어야 할 sec
const LATER = [];    // 실패해도 exit에 영향 없이 'LATER 이름:'으로만 알리는 점검(마무리 작업에서 비운다)
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
  if (!term([{o:'<t', h:'t'}]).includes('&lt;<span class="mk-hl">t</span>')) e.push('term h 원문');
  if (/ A\\b|mk-tl/.test(term([{c:'x'}], {still:true}))) e.push('term still');
  const k = tkeys(['Tab', '다시']); if (!k.includes('data-k="Tab"') || !k.includes('type="button"')) e.push('tkeys');
  if (!plate(Object.assign({}, TERMS[0], {ps:'\`Get-Item\`'})).includes('<b>Windows PowerShell</b><span><code>Get-Item</code></span>')) e.push('ps 행');
  const nw = net([{k:'pc'},{k:'server'}], [{m:[{t:'요청'},{t:'응답', r:1}]}]);
  if (!nw.includes('mk-nw') || (nw.match(/class="mk-nwm[ "]/g) || []).length !== 2) e.push('net');
  const ne = net([{k:'pc', t:'<b>&'}]); if (ne.includes('<b>') || !ne.includes('&lt;b&gt;&amp;')) e.push('net esc');
  if (!net([{k:'dns'}]).includes('DNS 서버')) e.push('net 이름');
  const thr = f => { try { f(); return false; } catch (x) { return true; } };
  if (!thr(() => net(Array(6).fill({k:'pc'}))) || !thr(() => net([{k:'zz'}]))) e.push('net throw');
  if (/ A"|mk-tl|mk-nwx|mk-nwy/.test(net([{k:'pc'},{k:'pc'}], [{m:[{t:'a'}]}], {still:true}))) e.push('net still');
  const nl = net([{k:'pc'}], [], {label:'x'}); if (!nl.includes('role="group"') || !nl.includes('aria-label="x"')) e.push('net label');
  if (!net(Array(3).fill({k:'pc'})).startsWith('<div class="mk-nw s"') || net(Array(4).fill({k:'pc'})).startsWith('<div class="mk-nw s"')) e.push('net s');    // 아이콘 2~3개는 좁은 그림판에서도 가로
  const ru = runner([{n:'더하기', s:'pass'}, {n:'빼기', s:'fail', e:'1', a:'2'}]);
  if (!ru.includes('mk-ru') || (ru.match(/class="mk-rur /g) || []).length !== 2) e.push('runner');
  if (!['✓', '통과', '✕', '실패', '기대', '실제', '통과 1 · 실패 1'].every(x => ru.includes(x))) e.push('runner 글자');
  if (!/<span class="mk-ruw[^"]*" aria-hidden="true">실행 중/.test(ru)) e.push('runner 실행 중');    // "실행 중"은 읽지 않고 결과 글자만 읽는다
  const re = runner([{n:'<b>&', s:'pass'}], {file:'<i>', code:['a<b']}); if (re.includes('<b>') || re.includes('<i>') || !re.includes('&lt;b&gt;&amp;')) e.push('runner esc');
  if (!thr(() => runner(Array(7).fill({n:'a', s:'pass'}))) || !thr(() => runner([{n:'a', s:'ok'}]))) e.push('runner throw');
  if (/ A"|mk-tl|mk-rux|mk-ruy|실행 중/.test(runner([{n:'a', s:'pass'}], {still:true}))) e.push('runner still');
  const rl = runner([], {label:'x'}); if (!rl.includes('role="group"') || !rl.includes('aria-label="x"') || !rl.includes('통과 0 · 실패 0')) e.push('runner label');
  const rb = rbar(72, {goal:80, label:'커버리지'}); if (!['커버리지 72%', '기준 80%', 'width:72%', 'left:80%'].every(x => rb.includes(x))) e.push('rbar');
  if (!rbar(130).includes('width:100%') || !rbar(-5).includes('width:0%') || rbar(50).includes('기준')) e.push('rbar 범위');
  if (!runner([{n:'a', s:'skip'}]).includes('건너뜀 1') || runner([{n:'a', s:'pass'}]).includes('건너뜀')) e.push('runner skip');
  return e.join(', ');
})()`, ctx));
check('tframe', () => { const P = 10 * +html.match(/\.mk-tr\.A,\.mk-tc\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 멈춘 장면(%)은 줄·글자가 다 나온 뒤
  return [1, 2, 3, 4, 5, 6, 7, 8].filter(k => { const l = html.match(new RegExp(`@keyframes mk-tl${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%,([\\d.]+)%`)),
    t = html.match(new RegExp(`@keyframes mk-tt${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`)); return !l || !t || +l[1] > P || +l[2] < P || +t[1] > P; }).join(', '); });
check('nframe', () => { const P = 10 * +html.match(/\.mk-nwm\.A,\.mk-nwd\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 네트워크 그림의 멈춘 장면은 점이 다 도착한 뒤
  return [1, 2, 3, 4, 5, 6, 7, 8].filter(k => ['x', 'y'].some(a => { const m = html.match(new RegExp(`@keyframes mk-nw${a}${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`));
    return !m || +m[1] > P; })).join(', '); });
check('rframe', () => { const P = 10 * +html.match(/\.mk-rur\.A,[^{]*\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 테스트 실행 모형의 멈춘 장면은 결과가 다 나온 뒤
  return [1, 2, 3, 4, 5, 6].filter(k => ['x', 'y'].some(a => { const m = html.match(new RegExp(`@keyframes mk-ru${a}${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`));
    return !m || +m[1] > P; })).join(', '); });
check('tm', () => g.TERMS.filter(t => t.c === 'test' && g.D[t.v] && g.D[t.v].m && !/ A["\s]/.test(g.D[t.v].h)).map(t => t.en).join(', '));    // 재생 버튼이 붙는 테스트 그림에는 움직이는 것이 있어야 한다
check('thl', () => { const m = [...html.matchAll(/\{([coe]):'((?:[^'\\]|\\.)*)', h:'((?:[^'\\]|\\.)*)'\}/g)];    // 터미널 줄의 h는 그 줄 글자에 있어야 한다
  return !m.length ? 'h 없음' : m.filter(x => !x[2].includes(x[3])).map(x => x[3]).join(', '); });
check('cat', () => { const c = g.CATS[1], i = g.CATS.findIndex(x => x.id === 'server'), nt = g.CATS[i + 1];
  if (!(c && c.id === 'terminal' && c.secs.map(s => s.id).join() === 'basic,core,motion,adv,cmd,tip')) return 'CATS[1] ' + (c && c.id);
  if (!(nt && nt.id === 'net' && nt.secs.map(s => s.id).join() === 'basic,core,motion,adv,proto,tip')) return 'server 다음 ' + (nt && nt.id);
  const b = g.CATS.findIndex(x => x.id === 'bug'), ts = g.CATS[b + 1];
  if (!(ts && ts.id === 'test' && ts.secs.map(s => s.id).join() === 'basic,core,motion,adv,kind,tip')) return 'bug 다음 ' + (ts && ts.id);
  return g.CATS[i].desc === '웹사이트를 돌리는 컴퓨터와 그 운영에 관한 말' ? '' : 'server desc'; });
check('nv', () => g.TERMS.filter(t => t.c === 'net' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 네트워크 카드는 모두 도판 형식
check('tv', () => g.TERMS.filter(t => t.c === 'test' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 테스트 카드는 모두 도판 형식
check('ps', () => g.TERMS.filter(t => 'ps' in t && (typeof t.ps !== 'string' || !t.ps.trim())).map(t => t.en).join(', '));
const PS_CMD = ['ls', 'pwd', 'touch', 'grep', 'find', 'which', 'curl', 'tail', 'ps', 'kill', '--help'];    // Windows PowerShell 5.1에서 쳐 보니 그림의 bash 결과와 달랐던 명령(Task 6 측정)
check('pscmd', () => { const a = g.TERMS.filter(t => t.c === 'terminal' && t.s === 'cmd' && 'ps' in t).map(t => t.en).join(); return a === PS_CMD.join() ? '' : 'ps ' + a; });
check('sym', () => g.SYMPTOM_GROUPS.length !== 8 ? 'groups ' + g.SYMPTOM_GROUPS.length
  : g.SYMPTOMS.filter(s => !g.SYMPTOM_GROUPS.includes(s.g)).map(s => s.q).join(', '));
const SYM_NEW = ['아이폰에서 위·아래 내용이 가려져요', '휴대폰을 가로로 돌리면 화면이 깨져요', '키보드가 올라오면 입력칸이 가려져요', '표가 휴대폰에서 옆으로 삐져나가요',
  '글자 크기 설정을 키우면 화면이 깨져요', '고해상도 화면에서 이미지가 흐릿해요', '입력하자마자 빨간 오류 글씨가 떠요', '끌어서 놓기가 안 돼요', '버튼을 눌러도 눌린 느낌이 없어요',
  'Tab 키를 누르면 엉뚱한 곳으로 이동해요', '아래로 당겨도 새로고침이 안 돼요', '눌렀는데 한참 뒤에야 화면이 바뀌어요', '알림이 너무 빨리 사라져요', '스크롤이 칸마다 딱 멈추지 않아요',
  '목록 끝에서 튕기는 느낌이 없어요', '뒤가 유리처럼 흐리게 비치게 하고 싶어요', '모서리가 아이폰 아이콘처럼 부드럽지 않아요', '색약인 사람이 구분을 못 해요', '색이 너무 쨍해요',
  '마지막 줄에 한 글자만 남아요', '제목 글꼴 중 일부 글자만 모양이 달라요', '긴 페이지에서 맨 위로 돌아가기 힘들어요', '이미지가 늦게 뜨고 덜컥 나타나요', '사진 때문에 페이지가 무거워요',
  '이미지가 안 보일 때 무슨 사진인지 몰라요', '동영상 자동 재생이 안 돼요'];    // 스펙 6장 26개(칩 말투에 맞춰 해요체)
const SYM_TERM = ['명령어를 찾을 수 없다고 나와요', 'Permission denied(권한 없음)가 떠요', 'PowerShell에서 스크립트를 실행할 수 없대요', '파일이 분명히 있는데 없다고 나와요', '폴더 이름에 띄어쓰기가 있으면 명령이 깨져요', '명령이 실패했는지 성공했는지 모르겠어요', '비밀번호를 쳐도 아무것도 안 보여요', '터미널이 멈춰서 아무것도 안 쳐져요', 'git log 화면에서 빠져나올 수가 없어요', 'y/N이라고 묻는데 뭘 눌러야 할지 모르겠어요', '명령이 끝나지 않고 계속 켜져 있어요', '터미널에서 한글이 깨져 보여요', '출력이 길어서 앞부분이 안 보여요', '같은 줄 숫자만 계속 바뀌어요', '글자가 한 줄씩 계속 올라와요'];    // 터미널 스펙 7장 표
const SYM_NET = ['localhost:3000이 안 열려요', '포트가 이미 사용 중이래요', '휴대폰으로 내 PC 개발 서버가 안 열려요', '연결이 거부됐대요', '사이트 주소를 찾을 수 없대요', '도메인을 바꿨는데 옛 사이트가 보여요', '회사 와이파이에서만 접속이 안 돼요', '카페 와이파이에 붙었는데 인터넷이 안 돼요', '밖에서 우리 집 서버에 못 들어와요', 'VPN을 켜면 사이트가 안 열려요', '클릭하고 한참 뒤에 반응해요', '영상 통화가 끊겼다 붙었다 해요', '가끔만 요청이 실패해요', '업로드만 유난히 느려요'];    // 네트워크 스펙 6장 표
const SYM_TEST = ['테스트가 가끔만 실패해요', '내 PC에선 통과하는데 CI에서만 실패해요', '고친 버그가 다시 생겼어요', '테스트는 다 통과했는데 실제로 써 보면 안 돼요', '스냅샷 테스트가 갑자기 실패해요', '버튼을 못 찾는다며 테스트가 실패해요', '테스트가 시간 초과로 끝나요', '외부 API가 멈추면 테스트도 실패해요', '화면 디자인이 모르게 바뀌었어요', '검사가 실패해서 병합 버튼이 안 눌려요', '커버리지가 낮다며 CI가 실패해요', '테스트가 너무 오래 걸려요'];    // 테스트 스펙 6장 표
check('symcount', () => g.SYMPTOMS.length !== 123 ? 'length ' + g.SYMPTOMS.length
  : [...SYM_NEW, ...SYM_TERM, ...SYM_NET, ...SYM_TEST].filter(q => !g.SYMPTOMS.some(s => s.q === q)).join(', '));

check('total', () => g.TERMS.length === 1186 ? '' : 'TERMS ' + g.TERMS.length);    // 737 + 새 용어 241(Fitts's Law는 기존 카드 보강) + 터미널 + 네트워크 + 테스트
check('webparts', () => { const n = g.TERMS.filter(t => t.c === 'web' && t.s === 'parts').length; return n === 8 ? '' : 'parts ' + n; });
check('mac', () => { const t = g.byId.get('net-mac-address'), s = t.x + g.D[t.v].cap; return /그대로/.test(s) || !/와이파이마다/.test(s) ? s : ''; });    // 요즘 기기는 와이파이마다 다른 MAC을 쓰기도 한다(Apple 102509·Android 10+ 기본값)
check('signal', () => { const w = g.byId.get('net-webrtc').x, p = g.byId.get('net-p2p').x; return /신호 서버/.test(w) && /서버/.test(p) ? '' : w + ' / ' + p; });    // WebRTC는 연결 정보(SDP·ICE)를 신호 서버로 주고받아야 연결된다(MDN Signaling and video calling)
check('aaaa', () => { const x = g.byId.get('net-dns-record').x; return /AAAA[^,]*RFC 3596/.test(x) ? '' : x; });    // u는 RFC 1035라 AAAA 출처(RFC 3596)를 본문에 적는다
check('rngname', () => Object.entries(g.D).filter(([, p]) => typeof p.h === 'string' && /<label class="mk-rng">(?:(?!<\/label>)[\s\S])*<b>/.test(p.h)).map(([k]) => k).join(', '));    // 슬라이더 옆 숫자는 aria-valuetext가 읽으므로 이름에서 뺀다
check('live', () => Object.entries(g.D).filter(([, p]) => p.init && /\.mk-hint/.test(String(p.init)) && /textContent/.test(String(p.init)) && !/class="mk-hint" aria-live="polite"/.test(String(p.h))).map(([k]) => k).join(', '));    // 조작하면 바뀌는 결과 문장은 화면 낭독기가 읽게 aria-live
check('nwt', () => Object.entries(g.D).flatMap(([k, p]) => [...String(p.h || '').matchAll(/<span class="mk-nwt">([^<]*)<\/span>/g)].filter(m => m[1].split(/\s/).some(w => w.length > 15)).map(m => k + ':' + m[1])).join(', '));    // 세로 배치에서 긴 낱말이 옆 메시지를 한 줄 2~3글자로 좁힌다(320px 측정). 긴 값은 s로(DESIGN 네트워크 배치)
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
const NO_GLYPH = ['덈', '뀞'];    // 원본 Hahmlet에도 없는 확장 완성형. Character Encoding의 깨짐 예시라 본문·고정폭 글꼴로만 보인다
check('font', () => { const set = fontCmap(), out = html.replace(/\/\* FONT:START \*\/[\s\S]*?\/\* FONT:END \*\//, '');
  const miss = [...new Set(out.match(/[ㄱ-ㆎ가-힣]/g))].filter(ch => !set.has(ch.codePointAt(0)) && !NO_GLYPH.includes(ch));
  return miss.length ? miss.length + '자 없음: ' + miss.slice(0, 20).join('') : ''; });

if (later.length) console.log(later.join('\n'));
if (fails.length) { console.log(fails.join('\n')); process.exit(1); }
console.log('OK ' + n);

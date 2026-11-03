// 데이터 점검: node tests/check.mjs [파일]  (기본 index.html)
// 다음 작업들은 아래 EXPECT·COUNT·REDRAWN·LATER만 고친다. 키가 '카테고리/하위항목'이면 그 카테고리, '/'가 없으면 design이다.
import fs from 'fs';
import vm from 'vm';
import zlib from 'zlib';

const EXPECT = {   // sec: [영문명…]  → 그 하위항목에 있어야 할 카드
  'basics/basic': ['Programming Language', 'Source Code', 'Frontend', 'Backend', 'Full Stack', 'Bug', 'Debugging', 'Error Message', 'Software', 'Operating System', 'Bit·Byte', 'Script'],
  'basics/core': ['Library', 'Framework', 'Package', 'npm', 'Dependency', 'Code Editor', 'Semantic Versioning', 'Open Source', 'IDE', 'Linter', 'Formatter', 'Package Manager', 'Snippet'],
  'basics/motion': ['Compile', 'Build', 'Run', 'Event', 'Event Listener', 'Callback', 'Asynchronous', 'Hot Reload', 'Interpreter', 'Runtime', 'Promise', 'Async/Await', 'Event Loop', 'Thread', 'Garbage Collection'],
  'basics/adv': ['Algorithm', 'Data Structure', 'Big-O', 'Recursion', 'Refactoring', 'Technical Debt', 'Design Pattern', 'Static vs Dynamic Typing', 'OOP', 'Abstraction', 'Encapsulation', 'Inheritance', 'Interface', 'Functional Programming', 'Pure Function', 'Immutability', 'Closure', 'Higher-order Function', 'Stack vs Heap'],
  'basics/principle': ['DRY', 'KISS', 'YAGNI', 'Separation of Concerns', 'Single Responsibility', 'Coupling·Cohesion', 'Naming Convention', 'Magic Number', 'Code Smell', 'Clean Code'],
  'basics/code': ['Variable', 'Constant', 'Function', 'Parameter', 'Return', 'Conditional', 'Loop', 'Array', 'Object', 'Boolean', 'String', 'Comment', 'Class', 'Syntax', 'Operator', 'Expression', 'Method', 'Property', 'Module', 'Import', 'Indentation', 'Arrow Function', 'Key-Value', 'Truthy·Falsy', 'Template Literal', 'Variable Scope'],
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
  'mobile/basic': ['Mobile App', 'iOS', 'Android', 'Native App', 'Hybrid App', 'Cross-platform', 'WebView', 'Screen', 'App Icon', 'Push Notification', 'Permission Request'],
  'mobile/core': ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin', 'Xcode', 'Android Studio', 'Simulator vs Emulator', 'Navigation Stack', 'App Lifecycle', 'Deep Link', 'Offline Support', 'Local Notification', 'iOS vs Android Differences'],
  'mobile/motion': ['Screen Transition', 'Modal Presentation', 'Keyboard Avoiding', 'Fast Refresh', 'App Launch', 'Background Refresh', 'App Icon Badge', 'Notification Tap', 'Force Update'],
  'mobile/adv': ['Native Module', 'Development Build', 'Platform-specific Code', 'Universal Link / App Link', 'APNs / FCM', 'Push Token', 'Secure Storage', 'Biometric Authentication', 'App Sandbox', 'Background Task Limits', 'In-app Purchase'],
  'mobile/store': ['App Store vs Google Play', 'Developer Account', 'App Store Connect', 'Google Play Console', 'Bundle ID / Package Name', 'Code Signing', 'Version / Build Number', 'IPA / AAB', 'TestFlight', 'Internal Testing Track', 'App Review', 'App Rejection', 'Store Listing', 'Privacy Label / Data Safety', 'Staged Rollout', 'OTA Update'],
  'mobile/tip': ['App vs Web', 'Ask Permission in Context', 'Test on Real Device', 'Minimum OS Version', 'App Size', 'Crash Reporting', 'Tablet Support', 'VoiceOver / TalkBack', 'Ratings & Reviews', 'Expo Go'],
  'plan/basic': ['Planning', 'Requirement', 'Feature', 'User Story', 'Priority', 'Deadline', 'Stakeholder', 'Draft', 'Meeting', 'Owner', 'Goal'],
  'plan/core': ['Backlog', 'Roadmap', 'Milestone', 'Sprint', 'Agile', 'Ticket', 'Estimate', 'Retrospective', 'Daily Stand-up', 'Definition of Done', 'Markdown', 'Template', 'Review Request', 'Approval'],
  'plan/motion': ['Screen Flow', 'Flowchart', 'Storyboard', 'Wireflow', 'Screen List', 'Decision Point', 'Happy Path', 'Exception Flow', 'Task Flow', 'User Journey Map', 'State Diagram', 'Swimlane Diagram'],
  'plan/adv': ['ADR', 'RFC', 'Functional vs Non-functional Requirement', 'Traceability', 'Scope Creep', 'Trade-off', 'Assumption', 'Risk Register', 'Change Request', 'Single Source of Truth', 'Docs as Code', 'Mermaid'],
  'plan/docs': ['PRD', 'Functional Specification', 'Screen Design Document', 'Technical Design Document', 'Meeting Minutes', 'Project Proposal', 'WBS', 'Test Plan', 'User Manual', 'Runbook', 'FAQ', 'Glossary', 'One-pager', 'Gantt Chart'],
  'web/basic': ['Web App', 'Subdomain', 'Homepage'], 'web/core': ['Web Standards', 'Progressive Enhancement'], 'web/motion': ['Scroll Progress Indicator'],
  'web/adv': ['Service Worker', 'Web App Manifest', 'Hydration'],
  'web/parts': ['Feature Section', 'Logo', 'Pricing Section', 'Testimonial', 'About Page', 'Contact Page'], 'web/tip': ['Slug', 'No-code Builder', 'Coming Soon Page'],
  'web/search': ['Search Engine', 'Crawler', 'Indexing', 'Keyword', 'Title Tag', 'Meta Description', 'Canonical URL', 'robots.txt', 'Structured Data', 'Backlink', 'UTM Parameter', 'QR Code'],
  'web/browser': ['Address Bar', 'Rendering', 'Browser Engine', 'Refresh', 'Bookmark', 'Browser Extension', 'Pop-up Blocker', 'iframe', 'User Agent', 'Autofill', 'Browser History'],
  'web/traffic': ['Page View', 'Unique Visitor', 'Referrer', 'Bounce Rate', 'Time on Page', 'Funnel', 'Heatmap', 'Retention Rate', 'Event Tracking'],
  'front/css': ['Specificity', 'Cascade', 'CSS Inheritance', 'Pseudo-class', 'Pseudo-element', '!important', 'CSS Reset', 'Inline vs Block', 'Display None', 'Visibility', 'Float', 'Vendor Prefix'],
  'front/event': ['Event Bubbling', 'Event Delegation', 'preventDefault', 'stopPropagation', 'Input Event', 'Keyboard Event', 'Form Validation', 'Controlled Input', 'Two-way Binding', 'Fetch'],
  'front/react': ['JSX', 'useState', 'useEffect', 'Key', 'Ref', 'Fragment', 'Portal', 'Props Drilling', 'Context API', 'State Management', 'Redux', 'Lifecycle', 'Conditional Rendering', 'List Rendering', 'Error Boundary'],
  'front/basic': ['SVG', 'Canvas'],
  'front/adv': ['Vue', 'Svelte', 'Angular', 'Next.js'],
  'front/layout': ['Container Query'],
  'front/tip': ['ARIA'],
  'front/build': ['Vite', 'Webpack', 'Babel', 'Transpile', 'ES Module', 'Sass', 'PostCSS', 'CSS Modules', 'CSS-in-JS', 'Storybook'],
  'back/arch': ['Node.js', 'Backend Framework', 'Route Handler', 'Controller', 'Service Layer', 'Repository Pattern', 'MVC', 'Stateless vs Stateful', 'API Gateway', 'BFF', 'BaaS'],
  'back/data': ['Payload', 'Content-Type', 'Serialization', 'DTO', 'Error Response', 'Schema Validation', 'Multipart Form Data', 'UUID', 'Cursor vs Offset Pagination', 'API Versioning', 'OpenAPI', 'Request ID'],
  'back/api': ['Response Header', 'Response Body'],
  'back/job': ['Worker', 'Pub/Sub', 'Event-driven Architecture', 'Concurrency', 'Lock', 'Batch Processing', 'Dead Letter Queue', 'Exponential Backoff', 'Server-Sent Events', 'Long Polling', 'Streaming Response', 'Circuit Breaker'],
  'back/auth': ['Access Token', 'Bearer Token', 'OAuth Scope', 'RBAC', 'Cookie vs Token', 'Session Store', 'Redirect URI', 'Webhook Signature', 'Service Account'],
  'db/query': ['INNER JOIN', 'LEFT JOIN', 'Aggregate Function', 'COUNT', 'HAVING', 'DISTINCT', 'LIKE', 'IN', 'BETWEEN', 'Subquery', 'Column Alias', 'IS NULL'],
  'db/model': ['NOT NULL', 'Default Value', 'Auto Increment', 'Composite Key', 'Surrogate Key', 'Check Constraint', 'One-to-Many', 'Many-to-Many', 'Junction Table', 'Cascade Delete', 'Denormalization'],
  'db/tx': ['ACID', 'Autocommit', 'Savepoint', 'Isolation Level', 'Dirty Read', 'Lost Update', 'Deadlock', 'Optimistic Locking', 'Pessimistic Locking', 'Connection Pool'],
  'db/ops': ['Query Plan', 'Full Table Scan', 'Composite Index', 'Read Replica', 'Connection String', 'Too Many Connections', 'Query Timeout', 'Point-in-Time Recovery', 'Database Dump', 'Database Client'],
  'plan/tip': ['TL;DR', 'Action Item', '5 Whys', 'Out of Scope', 'Decision Log', 'Write for the Reader', 'Keep Docs Updated', 'Show with Example'],
};
const COUNT = { form: 28, feedback: 23, nav: 20, data: 21, style: 21, gesture: 18, device: 16, media: 21, basic: 15, core: 14, motion: 31, adv: 19, app: 19, tool: 23, font: 27, color: 24, tip: 16,
  'basics/basic': 12, 'basics/core': 13, 'basics/motion': 15, 'basics/code': 26, 'basics/adv': 19, 'basics/principle': 10, 'terminal/basic': 13, 'terminal/core': 15, 'terminal/motion': 9, 'terminal/adv': 15, 'terminal/cmd': 20, 'terminal/tip': 9,
  'server/basic': 5, 'server/motion': 6, 'net/basic': 12, 'net/core': 15, 'net/motion': 9, 'net/adv': 13, 'net/proto': 10, 'net/tip': 9,
  'bug/core': 8, 'bug/adv': 7, 'test/basic': 11, 'test/core': 15, 'test/motion': 9, 'test/adv': 12, 'test/kind': 14, 'test/tip': 10, 'mobile/basic': 11, 'mobile/core': 14, 'mobile/motion': 9, 'mobile/adv': 11, 'mobile/store': 16, 'mobile/tip': 10, 'deploy/tip': 7, 'plan/basic': 11, 'plan/core': 14, 'plan/motion': 12, 'plan/adv': 12, 'plan/docs': 14, 'plan/tip': 8,
  'web/basic': 11, 'web/core': 13, 'web/motion': 7, 'web/adv': 12, 'web/parts': 14, 'web/tip': 10, 'web/search': 12, 'web/browser': 11, 'web/traffic': 9,
  'front/basic': 11, 'front/core': 14, 'front/motion': 10, 'front/adv': 13, 'front/layout': 13,
  'front/unit': 8, 'front/css': 12, 'front/event': 10, 'front/react': 15, 'front/build': 10, 'front/tip': 9,
  'back/basic': 8, 'back/core': 12, 'back/motion': 7, 'back/adv': 8, 'back/api': 10, 'back/arch': 11, 'back/data': 12, 'back/job': 12, 'back/auth': 9, 'back/tip': 8,
  'db/basic': 8, 'db/core': 8, 'db/motion': 8, 'db/adv': 8, 'db/sql': 8, 'db/query': 12, 'db/model': 11, 'db/tx': 10, 'db/ops': 10, 'db/tip': 8 };    // sec: 카드 수
const REDRAWN = ['basic', 'core', 'adv', 'tool', 'font', 'color', 'tip', 'basics/basic', 'basics/core', 'basics/motion', 'basics/adv', 'basics/code', 'basics/principle', 'basics/tip', 'web/basic', 'web/core', 'web/motion', 'web/adv', 'web/parts', 'web/search', 'web/browser', 'web/traffic', 'web/tip',
  'front/basic', 'front/core', 'front/motion', 'front/adv', 'front/layout', 'front/unit', 'front/css', 'front/event', 'front/react', 'front/build', 'front/tip',
  'back/basic', 'back/core', 'back/motion', 'back/adv', 'back/api', 'back/arch', 'back/data', 'back/job', 'back/auth', 'back/tip',
  'db/basic', 'db/core', 'db/motion', 'db/adv', 'db/sql', 'db/query', 'db/model', 'db/tx', 'db/ops', 'db/tip'];  // 글자 상자형 그림(flow·big·stack)이 없어야 할 sec
const LATER = [];    // 실패해도 exit에 영향 없이 'LATER 이름:'으로만 알리는 점검(마무리 작업에서 비운다)
const ALLOW_DUP = ['component', 'dark mode', 'row', 'column', 'tag'];
const norm = s => s.toLowerCase().replace(/[\s/.\-]/g, '');    // 띄어쓰기·/·.·-만 다른 이름도 같은 이름으로 본다

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
  g.TERMS.forEach(t => { const k = norm(t.en); if (seen.has(k) && !ALLOW_DUP.map(norm).includes(k)) dup.add(t.en); seen.add(k); });
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
  const ap = app([{t:'홈', b:'a', tap:[50, 80]}, {t:'상세', b:'b', go:'modal'}], {label:'흐름'});
  if (!['mk-mo', 'mk-phone', 'role="group"', 'aria-label="흐름"', '9:41', 'class="mk-most" aria-hidden="true"', 'modal mk-mok2 A', 'mk-motap mk-motk1 A', 'left:50%;top:80%'].every(x => ap.includes(x))) e.push('app');
  if ((ap.match(/class="mk-mos[ "]/g) || []).length !== 2 || (ap.match(/<section class="mk-mos[^"]*" aria-hidden="true">/g) || []).length !== 1) e.push('app 장면');    // 맨 위 장면만 읽는다
  if (!/<i class="mk-motap[^"]*" style="[^"]*" aria-hidden="true">/.test(ap)) e.push('app 점');
  if (!app([{t:'a'}, {t:'b'}]).includes('push mk-mok2 A')) e.push('app 기본 전환');
  const ae = app([{t:'<b>&'}]); if (ae.includes('<b>&') || !ae.includes('&lt;b&gt;&amp;')) e.push('app esc');
  if (!thr(() => app([])) || !thr(() => app(Array(5).fill({t:'a'}))) || !thr(() => app([{t:'a'}, {t:'b', go:'zoom'}])) || !thr(() => app([{t:'a', tap:[1, 1]}]))) e.push('app throw');
  const as = app([{t:'a', tap:[1, 1]}, {t:'b', go:'fade'}], {still:true});
  if (/ A"|mk-mok|mk-motap/.test(as) || (as.match(/aria-hidden="true">/g) || []).length !== 2) e.push('app still');    // 상태 표시줄 1 + 지나간 장면 1
  const tr = track([{t:'빌드', s:'done'}, {t:'심사', s:'fail', w:'거절', n:'설명 부족'}, {t:'출시', s:'wait'}]);
  if (!['✓', '완료', '✕', '거절', '…', '대기', '설명 부족', 'mk-rux2 A', 'mk-mty3 A'].every(x => tr.includes(x)) || tr.includes('실패') || (tr.match(/class="mk-mtc /g) || []).length !== 3) e.push('track');
  if (!/<i class="mk-mtr[^"]*" aria-hidden="true">/.test(tr) || !tr.includes('<b aria-hidden="true">✓</b>')) e.push('track 읽기');
  const tn = track([{t:'a', s:'now'}]); if (!tn.includes('●') || !tn.includes('진행 중')) e.push('track now');
  if (!thr(() => track([])) || !thr(() => track(Array(6).fill({t:'a', s:'done'}))) || !thr(() => track([{t:'a', s:'ok'}])) || !thr(() => track([{t:'a', s:'toString'}]))) e.push('track throw');
  if (/ A"|mk-rux|mk-mty|mk-mtr/.test(track([{t:'a', s:'done'}], {still:true}))) e.push('track still');
  if (track([{t:'<i>', s:'done', n:'&'}]).includes('<i>')) e.push('track esc');
  const tl = track([{t:'a', s:'done'}], {label:'x'}); if (!tl.includes('role="group"') || !tl.includes('aria-label="x"')) e.push('track label');
  const dc = doc([{h:'회의록'}, {p:'<b>&'}, {ul:['a','b']}, {tb:[['이름','할 일'],['민지','견적']]}, {ck:[['검토', true], ['배포', false]]}], {title:'회의록.md', hl:2, label:'문서'});
  if (!['mk-dc', 'role="group"', 'aria-label="문서"', '회의록.md', '&lt;b&gt;&amp;', '<th>이름</th>', '<td>견적</td>', '☑', '☐', '<span class="sr">완료: </span>', '<span class="sr">안 함: </span>', 'mk-rux5 A'].every(x => dc.includes(x)) || dc.includes('<b>&')) e.push('doc');
  if ([...dc.matchAll(/class="mk-dck([^"]*)"/g)].map(x => x[1].includes('mk-hl')).join() !== 'false,false,true,false,false') e.push('doc hl');
  if (/ A"|mk-rux/.test(doc([{p:'a'}], {still:true}))) e.push('doc still');
  if (!thr(() => doc([])) || !thr(() => doc(Array(7).fill({p:'a'}))) || !thr(() => doc([{x:1}]))) e.push('doc throw');
  const fw = flow([[{t:'담기'}], [{t:'로그인?', k:'q'}], [{t:'장바구니', k:'end', e:'예'}, {t:'로그인 화면', k:'end', e:'아니오'}]], {path:[0,0,1], label:'흐름'});
  if (!['mk-fw', 'role="group"', 'aria-label="흐름"', '<span class="mk-fwe">예</span>', '<span class="mk-fwe">아니오</span>', 'mk-fwy1 A', 'mk-fwy2 A', 'mk-fwz3 A'].every(x => fw.includes(x))) e.push('flow');
  if ([...fw.matchAll(/class="mk-fwn (\\w+)( on)?"/g)].map(x => !!x[2]).join() !== 'true,true,false,true') e.push('flow on');
  if ((fw.match(/<span class="sr">지나는 길: <\\/span>/g) || []).length !== 3 || (fw.match(/<b class="mk-fwm" aria-hidden="true">●<\\/b>/g) || []).length !== 3 || !/<i class="mk-fwd[^"]*" aria-hidden="true">/.test(fw)) e.push('flow 읽기');
  if (flow([[{t:'<i>&'}]]).includes('<i>&')) e.push('flow esc');
  const fs1 = flow([[{t:'a'}]], {still:true}); if (/ A"|mk-fwd/.test(fs1) || !fs1.includes('●')) e.push('flow still');
  if (!thr(() => flow([])) || !thr(() => flow(Array(6).fill([{t:'a'}]))) || !thr(() => flow([[{t:'a'},{t:'b'},{t:'c'}]])) || !thr(() => flow([[{t:'a', k:'x'}]]))) e.push('flow throw');
  if (!thr(() => flow([[{t:'a'}],[{t:'b'},{t:'c'}]])) || !thr(() => flow([[{t:'q',k:'q'}],[{t:'b'},{t:'c'}],[{t:'d'}]])) || !thr(() => flow([[{t:'a'}]], {path:[1]}))
    || !thr(() => flow([[{t:'q',k:'q'}],[{t:'b'},{t:'c'}],[{t:'d'},{t:'e'}]], {path:[0,0,1]}))) e.push('flow 갈래 throw');
  const cd = ide(['let n = 1;', 'n = n + 1;', 'console.log(n);'], [{l:1, vars:{n:'1'}}, {l:2, vars:{n:'2'}}, {l:3, out:['2'], vars:{n:'2'}}], {title:'a.js', label:'코드'});
  if (!['mk-cd', 'role="group"', 'aria-label="코드"', 'a.js', 'let n = 1;', 'mk-cdy1 A', 'mk-cdy2 A', 'mk-cdz3 A', '--l:3', '3단계: 3번째 줄, 출력 2', 'n = 2'].every(x => cd.includes(x)) || (cd.match(/class="mk-cds/g) || []).length !== 3) e.push('ide');
  const ce = ide(['<b>&'], [{l:1}]); if (ce.includes('<b>&') || !ce.includes('&lt;b&gt;&amp;')) e.push('ide esc');
  const cs = ide(['a','b'], [{l:1},{l:2}], {still:true}); if ((cs.match(/class="mk-cds/g) || []).length !== 1 || cs.includes(' A"') || !cs.includes('--l:2')) e.push('ide still');
  if (!thr(() => ide([], [{l:1}])) || !thr(() => ide(Array(9).fill('a'), [{l:1}])) || !thr(() => ide(['a'.repeat(29)], [{l:1}])) || !thr(() => ide(['a'], []))
    || !thr(() => ide(['a'], Array(9).fill({l:1}))) || !thr(() => ide(['a','b','c'], [{l:4}])) || !thr(() => ide(['a'], [{l:1, out:['1','2','3','4']}])) || !thr(() => ide(['a'], [{l:1, vars:{a:'1',b:'2',c:'3',d:'4',e:'5'}}]))) e.push('ide throw');
  if (!thr(() => ide(['가'.repeat(15)], [{l:1}])) || thr(() => ide(['const 결과 = sum.toFixed(2);'], [{l:1}]))) e.push('ide 넓은 글자');    // 한글은 2자로 센다(28자 한도)
  const mr = mem([{stack:[{n:'a', to:'A'}, {n:'b', to:'A'}], heap:[{id:'A', v:'[1, 2]'}]}, {stack:[{n:'a', to:'B'}], heap:[{id:'A', v:'[1, 2]', gc:true}, {id:'B', v:'[1, 2, 3]'}]}], {label:'메모리'});
  if (!['mk-mr', 'aria-label="메모리"', 'a → A', 'b → A', 'mk-cdy1 A', 'mk-cdz2 A', '치울 대상', 'a → 상자 B, 치울 대상: 상자 A'].every(x => mr.includes(x))) e.push('mem');
  const ms = [{stack:[{n:'a', v:'1'}], heap:[]}];
  if (!thr(() => mem([])) || !thr(() => mem(Array(5).fill(ms[0]))) || !thr(() => mem([{stack:[], heap:[]}])) || !thr(() => mem([{stack:Array(5).fill({n:'a', v:'1'}), heap:[]}]))
    || !thr(() => mem([{stack:[{n:'a', v:'1'}], heap:Array(6).fill({id:'A', v:'1'})}])) || !thr(() => mem([{stack:[{n:'a', to:'Z'}], heap:[]}]))) e.push('mem throw');
  const sp = serp('웹 공부', [{t:'웹 기초 정리', u:'example.com/web', d:'처음 보는 말을 그림으로', tag:'광고'}, {t:'<b>&', u:'a.com', d:''}], {hl:1, label:'검색'});
  if (!['mk-sp', 'role="group"', 'aria-label="검색"', '웹 공부', '광고', 'mk-rux1 A', 'mk-rux2 A', '내 사이트', '&lt;b&gt;&amp;', '검색어 웹 공부, 결과 2개, 내 사이트 2번째'].every(x => sp.includes(x))
    || sp.includes('<b>&') || (sp.match(/class="mk-spr on/g) || []).length !== 1) e.push('serp');
  const s0 = serp('a', [{t:'x', u:'u'}], {hl:0}); if (!s0.includes('내 사이트 1번째') || s0.includes('mk-spno')) e.push('serp hl0');
  const sn = serp('a', [{t:'x', u:'u'}]); if (!['mk-spno', '내 사이트는 결과에 없어요', '내 사이트 없음'].every(x => sn.includes(x))) e.push('serp 없음');
  const ss = serp('a', [{t:'x', u:'u'}], {still:true}); if (ss.includes(' A"') || ss.includes('mk-rux')) e.push('serp still');
  const r1 = [{t:'x', u:'u'}];
  if (!thr(() => serp('a', [])) || !thr(() => serp('a', Array(5).fill(r1[0]))) || !thr(() => serp('a'.repeat(21), r1)) || !thr(() => serp('a', [{t:'a'.repeat(33), u:'u'}]))
    || !thr(() => serp('a', [{t:'가'.repeat(17), u:'u'}])) || !thr(() => serp('a', [{t:'x', u:'u', d:'a'.repeat(61)}])) || !thr(() => serp('a', [{t:'x', u:'a'.repeat(41)}]))
    || !thr(() => serp('a', [{t:'x', u:'u', tag:'a'.repeat(13)}])) || !thr(() => serp('a', [r1[0], r1[0]], {hl:2})) || !thr(() => serp('a', r1, {hl:-1}))
    || !thr(() => serp('a', r1, {hl:0.5})) || !thr(() => serp('a', r1, {hl:'0'}))) e.push('serp throw');
  if (!thr(() => serp('a', [{u:'u'}])) || !thr(() => serp('a', [{t:'x'}])) || !thr(() => serp(undefined, r1)) || !thr(() => serp('', r1))) e.push('serp 누락');
  if (thr(() => serp('a', [{t:'a'.repeat(32), u:'u'}])) || thr(() => serp('a', [{t:'가'.repeat(16), u:'u'}]))) e.push('serp 한도');
  return e.join(', ');
})()`, ctx));
check('fhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(devtools|domtree|ide): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const dv = devtools({tab:'요소', dom:[[0, '<div id="main">'], [1, '<h2 class="title">']], css:['#main h2 { color: red }', {t:'h2 { color: blue }', off:1}], hl:1});
  has(dv, ['class="mk-dvt" aria-hidden="true"', '<span class="on">요소</span>', 'mk-dvon', '선택', 'mk-dvoff', '덮임', '&lt;div id=&quot;main&quot;&gt;',
    '<p class="sr">개발자 도구 요소 탭, 2번째 줄 선택, 덮인 규칙 1개</p>'], 'dv요소');
  has(devtools({tab:'요소', dom:[[0, 'a']], hl:0}), ['1번째 줄 선택', 'class="mk-dvg one"'], 'dv hl0'); if (dv.includes('mk-dvg one')) bad.push('dv 규칙 있는데 한 칸');    // 규칙이 없으면 dom 칸이 전체 폭을 쓴다
  has(devtools({tab:'콘솔', con:['불러옴', {t:'posts is not defined', err:1}]}), ['<span class="on">콘솔</span>', 'mk-dverr', '오류', '개발자 도구 콘솔 탭, 2줄, 오류 1개'], 'dv콘솔');
  has(devtools({tab:'네트워크', net:[{name:'posts', status:200, type:'fetch'}, {name:'users', status:404, type:'fetch'}]}), ['mk-dvf', '실패', '404', '개발자 도구 네트워크 탭, 요청 2개, 실패 1개'], 'dv네트워크');
  const d1 = [[0, 'a']], w29 = 'x'.repeat(29);
  no(() => devtools({tab:'소스', dom:d1}), '탭 이름'); no(() => devtools({tab:'요소'}), 'dom 없음'); no(() => devtools({tab:'요소', dom:d1, con:['a']}), '요소에 con');
  no(() => devtools({tab:'콘솔', con:['a'], dom:d1}), '콘솔에 dom'); no(() => devtools({tab:'네트워크', net:[]}), 'net 0줄');
  no(() => devtools({tab:'요소', dom:Array(7).fill([0, 'a'])}), 'dom 7줄'); no(() => devtools({tab:'요소', dom:[[4, 'a']]}), '깊이 4');
  no(() => devtools({tab:'요소', dom:[[3, 'x'.repeat(23)]]}), '들여쓰기 포함 29자'); no(() => devtools({tab:'요소', dom:d1, css:Array(5).fill('a')}), 'css 5줄');
  no(() => devtools({tab:'요소', dom:d1, css:['x'.repeat(25)]}), 'css 25자'); no(() => devtools({tab:'요소', dom:d1, hl:1}), 'hl 범위');
  no(() => devtools({tab:'콘솔', con:Array(5).fill('a')}), 'con 5줄'); no(() => devtools({tab:'콘솔', con:[w29]}), 'con 29자');
  no(() => devtools({tab:'네트워크', net:[{name:'x'.repeat(17), status:200, type:'fetch'}]}), '요청 이름 17자');
  const dt = domtree([[0, 'div'], [1, 'ul'], [2, 'li'], [3, 'button', '누른 곳']], {path:[3, 2, 1, 0]});
  has(dt, ['class="mk-dtl" aria-hidden="true"', 'mk-rux1 A', 'mk-rux4 A', '4번째', '&lt;button&gt;',
    '<p class="sr">div 안에 ul, ul 안에 li, li 안에 button(누른 곳). 누른 곳 button에서 li, ul, div 순서로 전해져요</p>'], 'dt');
  const ds = domtree([[0, 'div'], [1, 'ul'], [2, 'li']], {path:[2, 1], still:true});
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(ds) || (ds.match(/mk-dtw/g) || []).length !== 2) bad.push('dt still');
  has(domtree([[0, 'App'], [1, 'List'], [2, 'Item']], {hl:[2]}), ['mk-dthl', '강조'], 'dt hl');
  has(domtree([[0, 'ul'], [1, 'li', '누른 곳']], {path:[1]}), ['누른 곳 li에서만 반응해요'], 'dt 1칸');
  const t3 = [[0, 'div'], [1, 'ul'], [2, 'li']];
  no(() => domtree([[0, 'a']]), '1노드'); no(() => domtree(Array(9).fill([0, 'a'])), '9노드'); no(() => domtree([[1, 'a'], [2, 'b']]), '첫 깊이');
  no(() => domtree([[0, 'a'], [2, 'b']]), '깊이 건너뜀'); no(() => domtree([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']]), '깊이 5');
  no(() => domtree(t3, {hl:[3]}), 'hl 범위'); no(() => domtree(t3, {path:[2, 0]}), '부모 아님'); no(() => domtree(t3, {path:Array(7).fill(0)}), 'path 7칸');
  no(() => domtree([[0, 'a'.repeat(13)], [1, 'b']]), '태그 13자'); no(() => domtree([[0, 'a', '가나다라마바사'], [1, 'b']]), '꼬리표 14자');
  const ie = ide(['let a = 1;', {t:'a = "삼";', err:'숫자 자리예요'}, 'log(a);'], [{l:3}], {still:true});
  has(ie, ['<code class="mk-cdw">a = &quot;삼&quot;;</code>', '<li class="mk-cdem"><b>오류</b> 숫자 자리예요</li>', '<li value="3">', '--l:4'], 'ide 오류');
  if ((ie.match(/value=/g) || []).length !== 1) bad.push('ide value 수');
  no(() => ide([{t:'a', err:'x'.repeat(24)}], [{l:1}]), 'err 24자'); no(() => ide([{t:'a', err:''}], [{l:1}]), 'err 빈 글');
  const plain = ide(['let n = 1;', 'n = n + 1;', 'console.log(n);'], [{l:2}]);
  if (/mk-cdw|mk-cdem|value=/.test(plain) || !plain.includes('--l:2')) bad.push('ide 기존 출력');
  return bad.join(', ');
})()`, ctx));
check('bkhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(seq|httpmsg): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const sq = seq(['브라우저', '서버', '저장소'], [{from:0, to:1, t:'POST /login'}, {from:1, to:1, t:'비밀번호 확인'}, {from:1, to:2, t:'세션 저장'}, {from:2, to:1, t:'저장됨', wait:1}, {from:1, to:0, t:'401', err:1}]);
  has(sq, ['class="mk-sdh" aria-hidden="true"', 'class="mk-sdl" aria-hidden="true"', 'mk-cdz1 A', 'mk-cdz5 A', '브라우저가 서버에', '서버 처리', 'mk-sda l', 'mk-sdb', '>실패<', '>기다림<',
    '<p class="sr">브라우저가 서버에 POST /login, 서버가 처리: 비밀번호 확인, 서버가 저장소에 세션 저장, 저장소가 서버에 저장됨 기다림, 서버가 브라우저에 401 실패 (실패 1개).</p>'], 'seq');
  has(seq(['로그인', 'DB'], [{from:0, to:1, t:'a'}]), ['로그인이 DB에 a.'], '조사 받침');
  has(seq(['API 관문', 'BFF'], [{from:1, to:0, t:'a'}]), ['BFF가 API 관문에 a.'], '조사 영문');
  has(seq(['서버 1', '서버 2'], [{from:0, to:1, t:'a'}, {from:1, to:0, t:'b'}]), ['서버 1이 서버 2에 a, 서버 2가 서버 1에 b.'], '조사 숫자');
  const st = seq(['a', 'b'], [{from:0, to:1, t:'x'}, {from:1, to:0, t:'y'}], {still:true});
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(st) || /\\(실패/.test(st)) bad.push('seq still·실패 0개');
  const L2 = ['a', 'b'], m1 = [{from:0, to:1, t:'x'}];
  has(sq, ['<i class="mk-sda" style="--a:0;--b:1">', '<i class="mk-sda l" style="--a:0;--b:1">', 'class="mk-sdm mk-sdf mk-cdz5 A"'], 'seq 화살표·실패 행');
  has(seq(L2, [{from:0, to:1, t:'제목 길이 검사', err:1}, {from:1, to:0, t:'y', err:1}], {label:'로그인 순서'}), ['(실패 2개).', 'role="group" aria-label="로그인 순서"', '>제목 길이 검사<'], 'seq 실패 2개·label·14자');
  if (seq(L2, m1, {label:'a'}).includes('tabindex') || httpmsg({kind:'요청', start:'GET /', label:'a'}).includes('tabindex')) bad.push('정적 그림에 tabindex');
  no(() => seq(['a'], m1), '세로줄 1개'); no(() => seq(['a', 'b', 'c', 'd', 'e'], m1), '세로줄 5개'); no(() => seq(['a', '가나다라a'], m1), '이름 9자'); no(() => seq(['앱', 'BFF', '글', '저장소a'], m1), '4줄 이름 7자'); seq(['앱', 'BFF', '글', '저장소'], m1); no(() => seq(['', 'b'], m1), '빈 이름');    // 4줄은 320px에서 이름이 한 줄에 들도록 6자까지
  no(() => seq(L2, []), '메시지 0개'); no(() => seq(L2, Array(9).fill(m1[0])), '메시지 9개'); no(() => seq(L2, [{from:0, to:2, t:'x'}]), 'to 범위');
  no(() => seq(L2, [{from:-1, to:1, t:'x'}]), 'from 음수'); no(() => seq(L2, [{from:0.5, to:1, t:'x'}]), 'from 소수'); no(() => seq(L2, [{from:0, to:1, t:''}]), '빈 글');
  no(() => seq(L2, [{from:0, to:1, t:'가나다라마바사아'}]), '글 16자'); no(() => seq(L2, [{from:0, to:1, t:'x', err:1, wait:1}]), '실패+기다림');
  const hm = httpmsg({kind:'요청', start:'POST /api/posts', head:['Content-Type: application/json', 'Authorization: Bearer …'], body:['{', '  "title": "첫 글"', '}'], hl:['h0', 'b1']});
  has(hm, ['class="mk-hmt" aria-hidden="true">HTTP 요청<span>(버전 줄임)</span>', 'class="mk-hmb" aria-hidden="true"', 'mk-hmgap', 'mk-hmon', '>강조<', '<code>  &quot;title&quot;: &quot;첫 글&quot;</code>',
    '<p class="sr">HTTP 요청, POST /api/posts, 헤더 2줄, 본문 3줄, 강조: Content-Type 줄, 본문 2번째 줄 (버전 줄임)</p>'], 'httpmsg');
  has(httpmsg({kind:'요청', start:'GET /', head:['Accept: */*'], body:['a', 'b'], hl:['b1', 'h0']}), ['강조: Accept 줄, 본문 2번째 줄 (버전 줄임)</p>'], 'httpmsg 강조 순서');
  has(httpmsg({kind:'응답', start:'404 Not Found'}), ['>실패<', 'HTTP 응답, 404 Not Found, 헤더 0줄, 본문 0줄, 실패 (버전 줄임)'], 'httpmsg 실패');
  has(httpmsg({kind:'응답', start:'400 Bad Request'}), ['>실패<'], 'httpmsg 400'); if (httpmsg({kind:'응답', start:'399 X'}).includes('실패')) bad.push('httpmsg 399 실패');
  const ok = httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: text/plain']});
  if (ok.includes('실패') || ok.includes('mk-hmgap')) bad.push('httpmsg 200·본문 없음');
  has(httpmsg({kind:'요청', start:'OPTIONS /api', hl:['start']}), ['강조: 첫 줄'], 'httpmsg OPTIONS');
  no(() => httpmsg({kind:'질문', start:'GET /'}), 'kind'); no(() => httpmsg({kind:'요청', start:'FETCH /'}), '메서드');
  no(() => httpmsg({kind:'응답', start:'99 Low'}), '상태 99'); no(() => httpmsg({kind:'응답', start:'600 X'}), '상태 600'); no(() => httpmsg({kind:'응답', start:'2000 X'}), '상태 네 자리');
  no(() => httpmsg({kind:'요청', start:'GET /' + 'a'.repeat(26)}), '첫 줄 31자'); no(() => httpmsg({kind:'요청', start:'GET /', head:Array(5).fill('A: b')}), '헤더 5줄');
  no(() => httpmsg({kind:'요청', start:'GET /', body:Array(5).fill('a')}), '본문 5줄'); no(() => httpmsg({kind:'요청', start:'GET /', head:['']}), '빈 헤더');
  no(() => httpmsg({kind:'요청', start:'GET /', hl:['h0']}), '없는 헤더 강조'); no(() => httpmsg({kind:'요청', start:'GET /', body:['a'], hl:['b1']}), '없는 본문 강조');
  return bad.join(', ');
})()`, ctx));
check('dbhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(dbtab|qrun|erd): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const U = {name:'users', cols:[{n:'id', key:'PK'}, 'name', 'phone'], rows:[['1', '민수', '010-…'], ['2', '지영', 'NULL'], ['3', '준호', '']]};
  has(dbtab({...U, hl:[{row:1}, {col:2}], label:'회원 표'}), ['class="mk-db" role="group" aria-label="회원 표"', 'class="mk-dbh" aria-hidden="true"', 'users 테이블', 'class="mk-dbt" aria-hidden="true"', '<b class="mk-dbk">PK</b>',
    '<i class="mk-dbn">NULL</i>', '<b class="mk-dbk">빈 글자</b>', 'mk-dbon', '>강조<',
    '<p class="sr">users 테이블, 열 3개(id PK, name, phone), 행 3줄. 1줄: 1, 민수, 010-…. 2줄: 2, 지영, NULL. 3줄: 3, 준호, 빈 글자. 강조: 2줄, phone 열.</p>'], 'dbtab');
  has(dbtab({name:'users', cols:['email'], rows:[['a@a.com'], ['m@a.com']], mark:['', '읽음'], hl:{cell:[1, 0]}}), ['>읽음<', '1줄: a@a.com. 2줄: m@a.com (읽음). 강조: 2줄 email 칸.</p>'], 'dbtab mark');
  has(dbtab({name:'orders', tag:'나누기 전', cols:['id'], rows:[]}), ['<b class="mk-dbg">나누기 전</b>', '결과 없음(0줄)', '<p class="sr">나누기 전, orders 테이블, 열 1개(id), 행 0줄, 결과 없음.</p>'], 'dbtab 0줄');
  if (dbtab(U).includes('tabindex') || dbtab(U).includes('강조')) bad.push('dbtab 기본');
  if (!dbtab({name:'t', cols:['a'], empty:'<i>x'}).includes('>&lt;i&gt;x</p>')) bad.push('empty esc');
  no(() => dbtab({...U, name:'a'.repeat(13)}), '이름 13폭'); no(() => dbtab({...U, tag:'a'.repeat(13)}), '이름표 13폭'); no(() => dbtab({...U, cols:[]}), '열 0개');
  no(() => dbtab({name:'t', cols:['a', 'b', 'c', 'd'], rows:[]}), '열 4개'); no(() => dbtab({name:'t', cols:['a'.repeat(11)], rows:[]}), '열 11폭'); no(() => dbtab({name:'t', cols:[{n:'a', key:'UK'}], rows:[]}), 'key');
  no(() => dbtab({name:'t', cols:[{n:'a', type:'글자'}], rows:[]}), 'dbtab type'); no(() => dbtab({name:'t', cols:['a'], rows:Array(6).fill(['1'])}), '행 6개');
  no(() => dbtab({name:'t', cols:['a'], rows:[['a'.repeat(11)]]}), '칸 11폭'); no(() => dbtab({name:'t', cols:['a', 'b'], rows:[['1']]}), '칸 수'); no(() => dbtab({name:'t', cols:['a'], rows:[[1]]}), '칸 숫자');
  no(() => dbtab({...U, hl:{row:3}}), '없는 행'); no(() => dbtab({...U, hl:{col:3}}), '없는 열'); no(() => dbtab({...U, hl:{cell:[0, 5]}}), '없는 칸');
  const cH = dbtab({...U, hl:{col:2}}); if ((cH.match(/<td class="mk-dbon"/g) || []).length !== 3 || (cH.match(/>강조</g) || []).length !== 1) bad.push('열 강조 칸');
  no(() => dbtab({...U, hl:[1]}), 'hl 숫자'); no(() => dbtab({...U, hl:null}), 'hl null'); no(() => dbtab({...U, hl:{row:0, col:1}}), 'hl 둘'); no(() => dbtab({...U, hl:{}}), 'hl 빈 객체'); no(() => dbtab({...U, tag:''}), '이름표 빈 글');
  no(() => dbtab({...U, mark:['읽음']}), 'mark 수'); no(() => dbtab({...U, mark:['abcdefg', '', '']}), '꼬리표 7폭');
  const P = {name:'posts', cols:['id', 'title', 'likes'], rows:[['1', '공지', '3'], ['2', '후기', '25'], ['3', '질문', '12']]};
  const q = qrun({sql:['SELECT title FROM posts', 'WHERE likes > 10'], from:[P], pick: r => r.likes > 10, show:['title']});
  has(q, ['class="mk-dq"', 'class="mk-dqr" aria-hidden="true"', '<b>실행</b>', 'class="mk-dqh" aria-hidden="true">결과 2줄', 'mk-dqm mk-cdz1 A', 'mk-dqm mk-cdz2 A',
    '<p class="sr">쿼리 SELECT title FROM posts WHERE likes &gt; 10 실행. 실행 전 posts 3줄. 결과 2줄(title): 후기, 질문.</p>'], 'qrun pick');
  if ((q.match(/class="sr"/g) || []).length !== 1 || q.includes('mk-cdz3')) bad.push('qrun sr 하나·결과 2줄');
  if (!qrun({sql:['a'], from:[P], pick: r => r.likes === 25}).includes('결과 1줄')) bad.push('숫자로 바꿈');
  if (!qrun({sql:['a'], from:[U], pick: r => r.phone === null}).includes('결과 1줄(id, name, phone): 2 지영 NULL.')) bad.push('NULL은 null');
  has(qrun({sql:['DELETE FROM users', 'WHERE id = 3'], from:[U], pick: r => r.id === 3, del:1}), ['>지움<', '지운 뒤 남은 줄 2줄', '지운 줄 1줄: 3 준호 빈 글자, 지운 뒤 남은 줄 2줄(id, name, phone): 1 민수 010-…, 2 지영 NULL.</p>'], 'qrun del');
  const e1 = qrun({sql:['INSERT INTO users', "VALUES (4, 'x')"], from:[U], err:'이미 있는 이메일이에요'});
  has(e1, ['>실패<', '이미 있는 이메일이에요', '표는 그대로예요', 'mk-cdz1 A', '실패: 이미 있는 이메일이에요, 표는 그대로예요.</p>'], 'qrun err'); if (e1.includes('mk-cdz2')) bad.push('qrun err 한 줄');
  const U2 = {name:'users', cols:['id', 'name'], rows:[['1', '민수'], ['2', '지영']]}, O = {name:'orders', cols:['id', 'user_id'], rows:[['1', '1'], ['2', '2']]};
  has(qrun({sql:['DELETE FROM users', 'WHERE id = 1'], from:[U2, O], after:[{name:'users', cols:['id', 'name'], rows:[['2', '지영']]}, {name:'orders', cols:['id', 'user_id'], rows:[['2', '2']]}]}),
    ['결과 표 2개', 'mk-cdz2 A', '실행 전 users 2줄, orders 2줄. 결과 users 1줄(id, name): 2 지영; orders 1줄(id, user_id): 2 2.</p>'], 'qrun 표 둘');
  has(qrun({sql:['INSERT INTO users', "VALUES (3, '준호')"], from:[U2], after:{name:'users', cols:['id', 'name'], rows:[['1', '민수'], ['2', '지영'], ['3', '준호']]}, hl:{row:2}}), ['결과 3줄(id, name): 1 민수, 2 지영, 3 준호, 강조: 3줄.</p>'], 'qrun after hl');
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(qrun({sql:['a'], from:[P], pick: () => true, still:true}))) bad.push('qrun still');
  const A1 = {name:'users', cols:['id', 'name'], rows:[['1', '민수']]};
  no(() => qrun({sql:[], from:[U2], after:A1}), 'SQL 0줄'); no(() => qrun({sql:Array(5).fill('a'), from:[U2], after:A1}), 'SQL 5줄'); no(() => qrun({sql:['a'.repeat(29)], from:[U2], after:A1}), 'SQL 29폭');
  no(() => qrun({sql:['a'], from:[], after:A1}), '표 0개'); no(() => qrun({sql:['a'], from:[U2, U2, U2], after:A1}), '표 3개'); no(() => qrun({sql:['a'], from:[U2]}), '결과 없음');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, after:A1}), 'pick+after'); no(() => qrun({sql:['a'], from:[U2], pick:'x'}), 'pick 함수 아님');
  no(() => qrun({sql:['a'], from:[U2], after:A1, show:['id']}), 'show 홀로'); no(() => qrun({sql:['a'], from:[U2], pick: () => true, show:['id'], del:1}), 'show+del');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, show:['age']}), 'show 없는 열'); no(() => qrun({sql:['a'], from:[U2], after:A1, del:1}), 'del+after');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, hl:{row:0}}), 'hl+pick'); no(() => qrun({sql:['a'], from:[U2], err:'a'.repeat(29)}), 'err 29폭');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, err:'a'}), 'pick+err'); no(() => qrun({sql:['a'], from:[U2], err:'a', del:1}), 'err+del'); no(() => qrun({sql:['a'], from:[U2, U2], after:[A1, A1], hl:{row:0}}), '표 2개 hl');
  no(() => qrun({sql:['a'], from:[U2], after:[A1, A1, A1]}), 'after 3개'); no(() => qrun({sql:['a'], from:[U2], after:{name:'users', cols:['id', 'name'], rows:[['1', '하늘']]}}), '결과 값 밖');
  const ok = (f, a, w) => { try { has(f(), a, w); } catch (e) { bad.push(w + ' ' + e.message); } };
  ok(() => qrun({sql:['a'], from:[{name:'t', cols:['a']}], pick: () => true}), ['결과 0줄(a).</p>'], 'from rows 없음'); ok(() => qrun({sql:['a'], from:[U2], after:{name:'users', cols:['id']}}), ['결과 0줄(id).</p>'], 'after rows 없음');
  no(() => qrun({sql:['a'], from:[{name:'t', cols:'x'}], pick: () => true}), 'pick 전 표 검사'); no(() => qrun({sql:['a'], from:[{name:'t', cols:['a', 'a'], rows:[['1', '2']]}], pick: () => true}), '같은 열 이름');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, show:['id', 'id']}), 'show 겹침');
  const z = qrun({sql:['a'], from:[{name:'t', cols:['a'], rows:[]}, P], after:[{name:'t', cols:['a'], rows:[]}, P]}); if (z.includes('결과 없음') || (z.match(/>빈 표</g) || []).length !== 2) bad.push('qrun 빈 표 문구');
  const F5 = {name:'t', cols:['a'], rows:Array(5).fill(['1'])}; no(() => qrun({sql:['a'], from:[U2], after:[F5, F5]}), '결과 10줄');
  const e = erd({tables:[{name:'users', cols:[{n:'id', key:'PK'}, {n:'email', type:'글자'}]}, {name:'orders', cols:[{n:'id', key:'PK'}, {n:'user_id', key:'FK'}]}], links:[{a:0, b:1, kind:'1:N', fk:'user_id'}], hl:['orders.user_id']});
  has(e, ['class="mk-er"', 'class="mk-erl" aria-hidden="true"', '>1 : N<', 'orders.user_id로 이어져요', '<span class="mk-ert">글자</span>', 'mk-eron',
    '<p class="sr">관계도. users 표(id PK, email 글자), orders 표(id PK, user_id FK). users 하나에 orders 여럿, orders.user_id로 이어져요. 강조: orders.user_id.</p>'], 'erd');
  const S = {name:'students', cols:[{n:'id', key:'PK'}]}, C = {name:'courses', cols:[{n:'id', key:'PK'}]}, EN = {name:'enrollments', cols:[{n:'course_id', key:'FK'}]};
  has(erd({tables:[S, C], links:[{a:0, b:1, kind:'N:M'}]}), ['>N : M<', '중간 표가 필요해요', 'students 여럿과 courses 여럿, 중간 표가 필요해요.'], 'erd N:M');
  has(erd({tables:[EN, C], links:[{a:0, b:1, kind:'N:1', fk:'course_id'}]}), ['enrollments 여럿에 courses 하나, enrollments.course_id로 이어져요.'], 'erd N:1');
  has(erd({tables:[{name:'users', cols:['id']}, {name:'profiles', cols:[{n:'user_id', key:'FK'}]}], links:[{a:0, b:1, kind:'1:1', fk:'user_id'}]}), ['users 하나에 profiles 하나, profiles.user_id로 이어져요.'], 'erd 1:1');
  const T2 = [S, C], T3 = [S, EN, C];
  no(() => erd({tables:[S]}), '표 1개'); no(() => erd({tables:[S, C, S, C]}), '표 4개'); no(() => erd({tables:[{name:'a'.repeat(13), cols:['id']}, C]}), '이름 13폭');
  no(() => erd({tables:[{name:'t', cols:[]}, C]}), '열 0개'); no(() => erd({tables:[{name:'t', cols:['a', 'b', 'c', 'd', 'e']}, C]}), '열 5개'); no(() => erd({tables:[{name:'t', cols:['a'.repeat(11)]}, C]}), '열 11폭');
  no(() => erd({tables:[{name:'t', cols:[{n:'a', type:'가나다라'}]}, C]}), 'type 8폭'); no(() => erd({tables:[{name:'t', cols:[{n:'a', key:'UK'}]}, C]}), 'erd key');
  no(() => erd({tables:T3, links:[{a:0, b:2, kind:'1:N', fk:'course_id'}]}), '이웃 아님'); no(() => erd({tables:T2, links:[{a:0, b:1, kind:'2:1'}]}), 'kind');
  no(() => erd({tables:[EN, C], links:[{a:0, b:1, kind:'1:N', fk:'course_id'}]}), '1:N fk 자리'); no(() => erd({tables:[{name:'a', cols:['x']}, {name:'b', cols:['x']}], links:[{a:0, b:1, kind:'1:N', fk:'x'}]}), 'fk 아닌 열');
  no(() => erd({tables:T2, links:[{a:0, b:1, kind:'N:M', fk:'id'}]}), 'N:M fk'); no(() => erd({tables:T2, hl:['posts']}), '없는 표 강조'); no(() => erd({tables:T2, hl:['students.age']}), '없는 열 강조');
  no(() => erd({tables:T2, links:[{a:0, b:1, kind:'N:M'}, {a:1, b:0, kind:'N:M'}]}), '같은 쌍 link 둘'); no(() => erd({tables:[S, S]}), '같은 표 이름');
  no(() => erd({tables:T2, links:{}}), 'links 배열 아님'); no(() => erd({tables:T2, hl:'students'}), 'hl 배열 아님');
  return bad.join(', ');
})()`, ctx));
check('dbstill', () => vm.runInContext(`(() => { const bad = [], n = (h, re) => (h.match(re) || []).length;
  if (n(dindex(false, true), />읽음</g) !== 5 || n(dindex(true, true), />읽음</g) !== 1 || dindex(true, false).includes('읽음') || !dindex(false, false).includes('인덱스 없음')) bad.push('dindex');
  if (dindexSay(false, true) !== '5줄을 다 읽었어요' || dindexSay(true, true) !== '색인으로 1줄만 읽었어요' || !dindexSay(true, false).includes('찾기')) bad.push('dindexSay');
  const ok = dtx(false, true), ng = dtx(true, true);
  if (n(ok, /<li/g) !== 4 || !ok.includes('40000') || !ok.includes('COMMIT') || ok.includes('실패') || !ng.includes('50000') || ng.includes('40000') || !ng.includes('ROLLBACK') || !ng.includes('>실패<') || n(dtx(false, false), /<li/g) !== 0) bad.push('dtx');
  if (!dtxSay(false, true).startsWith('COMMIT') || !dtxSay(true, true).startsWith('ROLLBACK') || !dtxSay(true, false).includes('실행')) bad.push('dtxSay');
  const i = djoin('INNER'), l = djoin('LEFT');
  if (!i.includes('결과 2줄') || i.includes('준호 NULL') || !l.includes('결과 3줄(name, item): 민수 책, 지영 펜, 준호 NULL') || /class="(?:[^"]*\s)?A(?:\s[^"]*)?"/.test(i + l)) bad.push('djoin');
  if (!djoinSay('INNER').includes('빠졌어요') || !djoinSay('LEFT').includes('NULL')) bad.push('djoinSay');
  [() => dindex('y', true), () => dtx(1, true), () => djoin('RIGHT'), () => dindexSay(true, 'n'), () => dtxSay('x', true), () => djoinSay('FULL')].forEach((f, k) => { try { f(); bad.push('안 막음 ' + k); } catch (e) { if (!/^(dindex|dtx|djoin): /.test(e.message)) bad.push('메시지 ' + k); } });
  if (!dwhere(0).includes('결과 2줄(name, city, age): 민수 서울 25, 준호 서울 19') || !dwhere(1).includes('결과 2줄(name, city, age): 민수 서울 25, 지영 부산 31') || !dwhere(2).includes('결과 1줄(name, city, age): 지영 부산 31')) bad.push('dwhere');
  if (dwhereSay(0) !== '3줄 중 2줄이 조건에 맞아요' || dwhereSay(2) !== '3줄 중 1줄이 조건에 맞아요') bad.push('dwhereSay');
  [() => dwhere(3), () => dwhere(0.5), () => dwhereSay(-1)].forEach((f, k) => { try { f(); bad.push('안 막음 w' + k); } catch (e) { if (!/^dwhere: /.test(e.message)) bad.push('메시지 w' + k); } });
  return bad.join(', '); })()`, ctx));
check('srvhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(srvmap|metric): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); }), WA = h => /class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(h);
  const M = srvmap({front:'LB', servers:[{n:'서버 1', got:3}, {n:'서버 2', st:'down'}, {n:'서버 3', got:3, tag:'민수'}], db:'DB', note:'고장 난 서버는 빼요', label:'배치도 예'});
  has(M, ['class="mk-sv" role="group" aria-label="배치도 예"', 'class="mk-svp" aria-hidden="true"', 'class="mk-svs mk-svdb" style="--n:3"', 'mk-sv-down', '<b class="mk-svk">고장</b>', '<span class="mk-svq">요청 3</span>',
    '<span class="mk-svt">민수</span>', '<p class="mk-svn">고장 난 서버는 빼요</p>', 'mk-svd mk-srv1 A', 'mk-svd mk-srv3 A',
    '<p class="sr">배치도. 사용자, LB, 서버 3대: 서버 1 요청 3, 서버 2 고장, 서버 3 요청 3(민수). DB. 고장 난 서버는 빼요.</p>'], 'srvmap');
  if (M.includes('mk-srv2') || M.includes('요청 0')) bad.push('고장 서버 점·요청');
  if (M.split('<i class="mk-svl"></i>').length !== 4) bad.push('db 세로선 서버마다');
  const S1 = srvmap({servers:[{n:'web-1', got:1}], still:true});
  has(S1, ['class="mk-svs" style="--n:1"', '<p class="sr">배치도. 사용자, 서버 1대: web-1 요청 1.</p>'], 'srvmap 최소'); if (S1.includes('mk-svl') || S1.includes('mk-svdb')) bad.push('db 없을 때 세로선'); if (WA(S1) || S1.includes('mk-svd') || S1.includes('mk-svk') || S1.includes('role=')) bad.push('srvmap still·기본');
  const M4 = srvmap({user:{n:'민수', st:'ok'}, servers:[{n:'a', st:'busy', got:2}, {n:'b', st:'new'}, {n:'c', st:'drain', got:1}, {n:'d', st:'off'}], db:{n:'DB', st:'down'}});
  has(M4, ['>바쁨<', '>새로 켬<', '>정리 중<', '>꺼짐<', 'style="--n:4"', 'mk-svd mk-srv1 A', '배치도. 민수, 서버 4대: a 바쁨 요청 2, b 새로 켬 요청 0, c 정리 중 요청 1, d 꺼짐. DB 고장.</p>'], 'srvmap 상태');
  if (/mk-srv[234]/.test(M4)) bad.push('새로 켬 0·정리 중·꺼짐 서버 점');
  const sv = [{n:'a', got:1}];
  no(() => srvmap({servers:[]}), '서버 0대'); no(() => srvmap({servers:Array(5).fill({n:'a', got:1})}), '서버 5대'); no(() => srvmap({}), '서버 없음');
  no(() => srvmap({user:'a'.repeat(11), servers:sv}), 'user 11폭'); no(() => srvmap({front:'a'.repeat(11), servers:sv}), 'front 11폭'); no(() => srvmap({db:'a'.repeat(11), servers:sv}), 'db 11폭');
  no(() => srvmap({servers:[{n:'a'.repeat(7), got:1}]}), '서버 이름 7폭'); no(() => srvmap({servers:[{n:'a', got:1, tag:'a'.repeat(7)}]}), 'tag 7폭'); no(() => srvmap({servers:sv, note:'a'.repeat(29)}), 'note 29폭');
  no(() => srvmap({servers:[{n:'a', st:'bad', got:1}]}), '서버 st'); no(() => srvmap({front:{n:'LB', st:'x'}, servers:sv}), 'front st'); no(() => srvmap({db:{n:'DB', st:'x'}, servers:sv}), 'db st');
  no(() => srvmap({servers:[{n:'a', got:100}]}), 'got 100'); no(() => srvmap({servers:[{n:'a', got:1.5}]}), 'got 1.5'); no(() => srvmap({servers:[{n:'a', got:-1}]}), 'got -1');
  no(() => srvmap({servers:[{n:'a', got:1}, {n:'b', st:'down', got:1}]}), 'down got'); no(() => srvmap({servers:[{n:'a', got:1}, {n:'b', st:'off', got:2}]}), 'off got'); no(() => srvmap({servers:[{n:'a'}, {n:'b'}]}), '받은 서버 없음'); no(() => srvmap({servers:[, {n:'a', got:1}]}), '빈 칸 서버');
  const X6 = ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'];
  const G = metric({lines:[{n:'CPU', pts:[20, 40, 60, 95, 50, 30]}], x:X6, unit:'%', limit:{v:70, n:'늘림 기준'}, mark:{i:3, n:'이벤트'}, label:'CPU 그래프'});
  has(G, ['class="mk-mg" role="group" aria-label="CPU 그래프"', 'class="mk-mgl" aria-hidden="true"', '<i class="mk-mgs mk-mgs1"></i>CPU', 'class="mk-mgb" aria-hidden="true"', '<svg class="mk-mgv"', 'class="mk-mgp1"',
    'vector-effect="non-scaling-stroke"', 'class="mk-mgh"', 'class="mk-mgm"', '>늘림 기준 70%<', '>이벤트<', '>100%<', '>14:20<', 'class="mk-mgx" aria-hidden="true"',
    '<p class="sr">그래프, 14:00부터 14:50까지. CPU 처음 20%, 가장 높음 95%(14:30), 끝 30%. 한도 늘림 기준 70%. 표시: 14:30 이벤트.</p>'], 'metric');
  if (WA(G)) bad.push('metric 움직임'); if (G.includes('>14:10<') || G.includes('>14:40<')) bad.push('metric 6점 이름표');
  const X7 = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];
  const G2 = metric({lines:[{n:'요청 수', pts:[1, 2, 3, 4, 5, 6, 7]}, {n:'b', pts:[7, 6, 5, 4, 3, 2, 1]}, {n:'c', pts:[1, 1, 1, 1, 1, 1, 1]}], x:X7, max:10, unit:'건', mark:{i:0, n:'첫 요청'}});
  has(G2, ['>a1<', '>a4<', '>a7<', 'class="mk-mgp2"', 'class="mk-mgp3"', '>10건<', '>첫 요청<',
    '그래프, a1부터 a7까지. 요청 수 처음 1건, 가장 높음 7건(a7), 끝 7건. b 처음 7건, 가장 높음 7건(a1), 끝 1건. c 처음 1건, 가장 높음 1건(a1), 끝 1건. 표시: a1 첫 요청.</p>'], 'metric 3선');
  if (G2.includes('>a2<') || G2.includes('>a6<') || G2.includes('mk-mgh') || G2.includes('role=')) bad.push('metric 빈 이름표·기본');
  has(metric({lines:[{n:'z', pts:[0, 0, 0, 0]}], x:['a', 'b', 'c', 'd'], unit:'%'}), ['z 처음 0%, 가장 높음 0%(a), 끝 0%.</p>'], 'metric 0');
  const L = [{n:'a', pts:[1, 2, 3, 4]}], X4 = ['a', 'b', 'c', 'd'];
  has(metric({lines:L, x:X4, unit:'%'}), ['>b<', '>c<'], 'metric 4점 이름표');
  has(metric({lines:[{n:'a', pts:[0.1 + 0.2, 1, 2, 3]}], x:X4, unit:'%', limit:{v:0.1 + 0.2, n:'b'}}), ['a 처음 0.3%', '한도 b 0.3%', '>b 0.3%<'], 'metric 소수');
  no(() => metric({lines:[{n:'a', pts:[1, , 3, 4]}], x:X4, unit:'%'}), '빈 칸 값'); no(() => metric({lines:L, x:['a', , 'c', 'd'], unit:'%'}), '빈 칸 x'); no(() => metric({lines:[L[0], , ], x:X4, unit:'%'}), '빈 칸 선'); has(metric({lines:[{n:'a', pts:[0, 0.1, 0.2, 0.3]}], x:X4, max:0.1 * 3, unit:'%'}), ['>0.3%<'], 'metric max 소수');
  no(() => metric({lines:[], x:X4, unit:'%'}), '선 0개'); no(() => metric({lines:Array(4).fill(L[0]), x:X4, unit:'%'}), '선 4개'); no(() => metric({lines:[{n:'a'.repeat(11), pts:[1, 2, 3, 4]}], x:X4, unit:'%'}), '선 이름 11폭');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3]}], x:['a', 'b', 'c'], unit:'%'}), 'pts 3개'); no(() => metric({lines:[{n:'a', pts:Array(13).fill(1)}], x:Array(13).fill('a'), unit:'%'}), 'pts 13개');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3, 101]}], x:X4, unit:'%'}), 'max 넘음'); no(() => metric({lines:[{n:'a', pts:[-1, 2, 3, 4]}], x:X4, unit:'%'}), '0 밑'); no(() => metric({lines:[{n:'a', pts:['1', 2, 3, 4]}], x:X4, unit:'%'}), '숫자 아님');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3, NaN]}], x:X4, unit:'%'}), 'NaN'); no(() => metric({lines:[L[0], {n:'b', pts:[1, 2, 3, 4, 5]}], x:X4, unit:'%'}), 'pts 길이 다름');
  no(() => metric({lines:L, x:['a', 'b', 'c'], unit:'%'}), 'x 길이'); no(() => metric({lines:L, x:['a', 'b', 'c', 'abcdef'], unit:'%'}), 'x 6폭');
  no(() => metric({lines:L, x:X4}), 'unit 없음'); no(() => metric({lines:L, x:X4, unit:'abcde'}), 'unit 5폭'); no(() => metric({lines:L, x:X4, unit:'%', max:0}), 'max 0'); no(() => metric({lines:L, x:X4, unit:'%', max:'100'}), 'max 글자');
  no(() => metric({lines:L, x:X4, unit:'%', limit:{v:101, n:'a'}}), 'limit 넘음'); no(() => metric({lines:L, x:X4, unit:'%', limit:{v:-1, n:'a'}}), 'limit 0 밑'); no(() => metric({lines:L, x:X4, unit:'%', limit:{v:50, n:'a'.repeat(11)}}), 'limit 11폭');
  no(() => metric({lines:L, x:X4, unit:'%', mark:{i:4, n:'a'}}), 'mark 범위'); no(() => metric({lines:L, x:X4, unit:'%', mark:{i:1.5, n:'a'}}), 'mark 정수'); no(() => metric({lines:L, x:X4, unit:'%', mark:{i:0, n:'a'.repeat(11)}}), 'mark 11폭');
  return bad.join(', ');
})()`, ctx));
check('srvcss', () => [['figcap sv', /[,(]\.mk-sv[,)][^{]*\.figcap\{position:static/], ['figcap mg', /[,(]\.mk-mg[,)][^{]*\.figcap\{position:static/], ['고장 점선', /\.mk-sv-down\{border-style:dashed\}/],
  ['2열', /@media \(max-width:420px\)\{\.mk-svs\[style\*="--n:4"\]\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/], ['서버 가로선', /\.mk-svs\{[^}]*background:linear-gradient/], ['db 가로선', /\.mk-svdb\{[^}]*center bottom/],
  ['db 세로선', /\.mk-svl\{[^}]*flex:1/], ['2열 점 끔', /\.mk-svs\[style\*="--n:4"\] \.mk-svd\{display:none\}/]].filter(([, re]) => !re.test(html)).map(([k]) => k).join(', '));    // 서버 배치도의 선·점선·2열 규칙
check('bkpad', () => ['mk-sd', 'mk-hm', 'mk-db', 'mk-dq', 'mk-er', 'mk-sv', 'mk-mg'].filter(k => !new RegExp(`[,(]\\.${k}[,)][^{]*\\.stage\\{padding-bottom:14px\\}`).test(html)).join(', '));    // 설명이 아래로 내려간 그림은 그림판 아래 여백도 줄인다
check('tframe', () => { const P = 10 * +html.match(/\.mk-tr\.A,\.mk-tc\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 멈춘 장면(%)은 줄·글자가 다 나온 뒤
  return [1, 2, 3, 4, 5, 6, 7, 8].filter(k => { const l = html.match(new RegExp(`@keyframes mk-tl${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%,([\\d.]+)%`)),
    t = html.match(new RegExp(`@keyframes mk-tt${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`)); return !l || !t || +l[1] > P || +l[2] < P || +t[1] > P; }).join(', '); });
check('nframe', () => { const P = 10 * +html.match(/\.mk-nwm\.A,\.mk-nwd\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 네트워크 그림의 멈춘 장면은 점이 다 도착한 뒤
  return [1, 2, 3, 4, 5, 6, 7, 8].filter(k => ['x', 'y'].some(a => { const m = html.match(new RegExp(`@keyframes mk-nw${a}${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`));
    return !m || +m[1] > P; })).join(', '); });
check('rframe', () => { const P = 10 * +html.match(/\.mk-rur\.A,[^{]*\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 테스트 실행 모형의 멈춘 장면은 결과가 다 나온 뒤
  return [1, 2, 3, 4, 5, 6].filter(k => ['x', 'y'].some(a => { const m = html.match(new RegExp(`@keyframes mk-ru${a}${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,100%`));
    return !m || +m[1] > P; })).join(', '); });
check('aframe', () => { const P = 10 * +html.match(/\.mk-mos\.A,\.mk-motap\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 앱 화면 모형의 멈춘 장면은 장면이 다 들어오고 손가락 점이 사라진 뒤
  const s = [2, 3, 4].flatMap(k => ['pu', 'mo', 'fa'].map(a => [a, k])).filter(([a, k]) => { const m = html.match(new RegExp(`@keyframes mk-mo${a}${k}\\{0%,[\\d.]+%\\{[^}]*\\}([\\d.]+)%,([\\d.]+)%\\{(?:transform:none|opacity:1)\\}`));
    return !m || +m[1] > P || +m[2] < P; }).map(([a, k]) => a + k);
  const t = [1, 2, 3].filter(k => { const m = html.match(new RegExp(`@keyframes mk-motk${k}\\{0%,[\\d.]+%\\{opacity:0\\}[\\d.]+%,[\\d.]+%\\{opacity:1\\}([\\d.]+)%,100%`)); return !m || +m[1] > P; }).map(k => 'tk' + k);
  return [...s, ...t].join(', '); });
check('kframe', () => { const P = 10 * +html.match(/\.mk-mtr\.A,\.mk-mts\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 단계 띠의 멈춘 장면은 고리가 사라진 뒤
  return [1, 2, 3, 4, 5].filter(k => { const m = html.match(new RegExp(`@keyframes mk-mty${k}\\{0%,[\\d.]+%\\{opacity:0\\}[\\d.]+%,[\\d.]+%\\{opacity:1\\}([\\d.]+)%,100%`)); return !m || +m[1] > P; }).join(', '); });
check('dframe', () => { const P = 10 * +html.match(/\.mk-dck\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 문서 모형의 멈춘 장면은 블록이 다 보인 뒤
  return [1, 2, 3, 4, 5, 6].filter(k => { const m = html.match(new RegExp(`@keyframes mk-rux${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%,100%\\{opacity:1\\}`)); return !m || +m[1] > P; }).join(', '); });
check('fframe', () => { const P = 10 * +html.match(/\.mk-fwd\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/)[1];    // 흐름도의 멈춘 장면은 점이 마지막 칸에만 있다
  const z = [1, 2, 3, 4, 5].filter(k => { const m = html.match(new RegExp(`@keyframes mk-fwz${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%,100%\\{opacity:1\\}`)); return !m || +m[1] > P; }).map(k => 'z' + k);
  const y = [1, 2, 3, 4].filter(k => { const m = html.match(new RegExp(`@keyframes mk-fwy${k}\\{0%,[\\d.]+%\\{opacity:0\\}[\\d.]+%,[\\d.]+%\\{opacity:1\\}([\\d.]+)%,100%\\{opacity:0\\}`)); return !m || +m[1] > P; }).map(k => 'y' + k);
  return [...z, ...y].join(', '); });
check('tm', () => g.TERMS.filter(t => t.c === 'test' && g.D[t.v] && g.D[t.v].m && !/ A["\s]/.test(g.D[t.v].h)).map(t => t.en).join(', '));    // 재생 버튼이 붙는 테스트 그림에는 움직이는 것이 있어야 한다
check('mm', () => g.TERMS.filter(t => t.c === 'mobile' && g.D[t.v] && g.D[t.v].m && !/ A["\s]/.test(g.D[t.v].h)).map(t => t.en).join(', '));    // 재생 버튼이 붙는 모바일 그림에는 움직이는 것이 있어야 한다
check('pm', () => g.TERMS.filter(t => t.c === 'plan' && g.D[t.v] && g.D[t.v].m && !/ A["\s]/.test(g.D[t.v].h)).map(t => t.en).join(', '));    // 재생 버튼이 붙는 기획 그림에는 움직이는 것이 있어야 한다
check('thl', () => { const m = [...html.matchAll(/\{([coe]):'((?:[^'\\]|\\.)*)', h:'((?:[^'\\]|\\.)*)'\}/g)];    // 터미널 줄의 h는 그 줄 글자에 있어야 한다
  return !m.length ? 'h 없음' : m.filter(x => !x[2].includes(x[3])).map(x => x[3]).join(', '); });
check('cat', () => { const c = g.CATS[1], i = g.CATS.findIndex(x => x.id === 'server'), nt = g.CATS[i + 1];
  if (!(c && c.id === 'terminal' && c.secs.map(s => s.id).join() === 'basic,core,motion,adv,cmd,tip')) return 'CATS[1] ' + (c && c.id);
  if (!(nt && nt.id === 'net' && nt.secs.map(s => s.id).join() === 'basic,core,motion,adv,proto,tip')) return 'server 다음 ' + (nt && nt.id);
  const b = g.CATS.findIndex(x => x.id === 'bug'), ts = g.CATS[b + 1];
  if (!(ts && ts.id === 'test' && ts.secs.map(s => s.id).join() === 'basic,core,motion,adv,kind,tip')) return 'bug 다음 ' + (ts && ts.id);
  const f = g.CATS.findIndex(x => x.id === 'front'), mo = g.CATS[f + 1];
  if (!(mo && mo.id === 'mobile' && mo.secs.map(s => s.id).join() === 'basic,core,motion,adv,store,tip')) return 'front 다음 ' + (mo && mo.id);
  const a = g.CATS.findIndex(x => x.id === 'ai'), pl = g.CATS[a - 1];
  if (!(pl && pl.id === 'plan' && pl.secs.map(s => s.id).join() === 'basic,core,motion,adv,docs,tip')) return 'ai 앞 ' + (pl && pl.id);
  return g.CATS[i].desc === '웹사이트를 돌리는 컴퓨터와 그 운영에 관한 말' ? '' : 'server desc'; });
check('nv', () => g.TERMS.filter(t => t.c === 'net' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 네트워크 카드는 모두 도판 형식
check('tv', () => g.TERMS.filter(t => t.c === 'test' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 테스트 카드는 모두 도판 형식
check('mv', () => g.TERMS.filter(t => t.c === 'mobile' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 모바일 카드는 모두 도판 형식
check('pv', () => g.TERMS.filter(t => t.c === 'plan' && !(typeof t.v === 'string' && t.v.startsWith('u-'))).map(t => t.en).join(', '));    // 기획 카드는 모두 도판 형식
const PDM = {'Definition of Done': ['완료로 옮기기', 'type="checkbox"'], 'Markdown': ['쓴 글', '보이는 모습', 'aria-pressed'], 'Decision Point': ['예', '아니오', 'aria-pressed'], 'Scope Creep': ['요청 하나 더', '처음으로'] };    // 직접 조작 기획 카드 → 그림에 있어야 할 버튼 이름·표시
check('pdm', () => Object.entries(PDM).filter(([en, w]) => { const t = g.find(en), p = t && g.D[t.v]; return !p || !p.init || !w.every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
check('pl', () => { const p = g.D['u-gantt-chart']; return p && p.h.includes('<span class="sr">2~3주</span>') && p.h.includes('scope="row"') ? '' : 'gantt'; });    // 간트 막대는 "N~M주"로 읽히고 줄 머리글이 있다
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
const SYM_MOBILE = ['키보드가 입력창을 가려요', '앱이 켜지는 데 오래 걸려요', '뒤로 가기를 눌렀더니 앱이 꺼져요', '푸시 알림이 안 와요', '링크를 누르면 앱 대신 웹사이트가 열려요', '앱을 내렸다 열면 처음 화면으로 돌아가요', '권한을 거부했더니 다시 안 물어봐요', '앱 심사에서 거절됐어요', '인터넷이 끊기면 빈 화면만 나와요', '앱이 갑자기 꺼져요', '시뮬레이터에선 되는데 내 폰에서 안 돼요', '업데이트를 올렸는데 사용자 앱이 안 바뀌어요'];    // 모바일 스펙 6장 표
const SYM_PLAN = ['일정이 자꾸 밀려요', '할 일이 계속 늘어나요', '화면이 몇 개 필요한지 몰라요', '만든 게 원한 것과 달라요', 'Claude가 원하지 않은 기능까지 만들어요', '어디까지 하면 끝인지 몰라요', '오류 날 때 화면을 안 정했어요', '왜 이렇게 만들었는지 기억이 안 나요', '같은 내용 문서가 여러 개라 뭐가 맞는지 몰라요', '회의 뒤 누가 할지 안 정해졌어요'];
const SYM_BASICS = ['await를 썼는데 기다리지 않아요', '배열을 바꿨는데 다른 변수도 같이 바뀌었어요', '반복이 한 번 더(덜) 돌아요', '함수 결과가 undefined로 나와요', '같은 코드를 여러 군데 고쳐야 해요', '숫자 하나가 무슨 뜻인지 모르겠어요', '사람마다 코드 모양이 달라요', '한 곳 고치면 다른 곳이 깨져요', '파일 하나가 너무 길어요', '무거운 작업 중 화면이 멈춰요', '패키지 설치 뒤 버전이 안 맞아요', 'import 했는데 못 찾는대요'];    // 개발 기본 스펙 6장 표
const SYM_WEB = ['검색해도 내 사이트가 안 나와요', '링크를 공유하면 미리보기가 이상해요', '검색 결과 제목·설명이 엉뚱하게 나와요', '같은 글이 주소 두 개로 검색돼요',
  'Safari에서만 화면이 깨져요', '버튼을 눌러도 새 창이 안 떠요', '방문은 많은데 구매가 없어요', '둘러보지 않고 바로 나가는 사람이 많아요',
  '손님이 어디서 왔는지 모르겠어요', '로그인이 자꾸 풀려요', '다른 사이트에 넣은 내 페이지가 안 보여요', '주소 끝에 utm_ 같은 글자가 붙어 있어요'];
const SYM_FRONT = ['CSS가 다른 규칙에 밀려 적용이 안 돼요', '안쪽 버튼을 눌렀는데 바깥 상자도 같이 반응해요', '버튼을 누르면 페이지가 새로고침돼요', '입력칸에 글자가 안 쳐져요',
  '같은 요청이 끝없이 반복돼요', '목록 순서를 바꾸면 입력값이 엉뚱한 줄에 남아요', '배열에 값을 넣었는데 화면이 그대로예요', 'props를 여러 단계로 계속 넘기고 있어요',
  '화면 낭독기가 버튼을 이상하게 읽어요', '숨겼는데 빈자리가 그대로 남아요', '브라우저마다 기본 여백이 달라요', '옛 브라우저에서 새 문법이 안 돼요'];
const SYM_BACK = ['429가 떠요', '로그인했는데 401이 떠요', '로그인은 되는데 403이 떠요', '서버가 보낸 데이터를 못 읽어요', '웹훅이 같은 알림을 여러 번 보내요', '업로드한 파일이 서버에서 비어 있어요', '로그인 뒤 redirect_uri 오류가 나요', '동시에 사면 재고가 마이너스가 돼요', '다음 페이지에 같은 글이 또 나와요', '오류가 난 요청을 로그에서 못 찾겠어요', '외부 API가 멈추면 우리 서버도 멈춰요', '오래 걸리는 작업 때문에 응답이 늦어요'];    // 백엔드 계획서 ② Task 4 표
const SYM_DB = ['데이터가 쌓일수록 목록이 느려져요', '목록 하나 여는데 쿼리가 수백 번 나가요', 'JOIN했더니 같은 회원이 여러 줄 나와요', '주문 없는 회원이 목록에서 빠져요', '개수가 실제보다 적게 나와요', '= NULL로 찾으면 아무것도 안 나와요', 'DB 연결이 꽉 찼다는 오류가 떠요', 'deadlock 오류가 떠요', '회원을 지웠더니 주문이 같이 사라졌어요', '같은 이메일로 두 번 가입돼요', '실수로 지운 데이터를 되살리고 싶어요', '둘이 동시에 고치면 한 사람 것이 사라져요'];
check('symcount', () => g.SYMPTOMS.length !== 205 ? 'length ' + g.SYMPTOMS.length
  : [...SYM_NEW, ...SYM_TERM, ...SYM_NET, ...SYM_TEST, ...SYM_MOBILE, ...SYM_PLAN, ...SYM_BASICS, ...SYM_WEB, ...SYM_FRONT, ...SYM_BACK, ...SYM_DB].filter(q => !g.SYMPTOMS.some(s => s.q === q)).join(', '));

check('total', () => g.TERMS.length === 1572 ? '' : 'TERMS ' + g.TERMS.length);    // 737 + 새 용어 241(Fitts's Law는 기존 카드 보강) + 터미널 + 네트워크 + 테스트 + 모바일 + 기획 + DB
check('webparts', () => { const n = g.TERMS.filter(t => t.c === 'web' && t.s === 'parts').length; return n === 14 ? '' : 'parts ' + n; });
check('mac', () => { const t = g.byId.get('net-mac-address'), s = t.x + g.D[t.v].cap; return /그대로/.test(s) || !/와이파이마다/.test(s) ? s : ''; });    // 요즘 기기는 와이파이마다 다른 MAC을 쓰기도 한다(Apple 102509·Android 10+ 기본값)
check('planfix', () => ['plan-wbs', 'plan-gantt-chart'].map(id => g.byId.get(id)).filter(t => t.r.includes('Dependency')).map(t => t.en)
  .concat(/마줘/.test(g.byId.get('plan-out-of-scope').p) ? ['마줘'] : []).join(', '));    // Dependency 카드는 패키지 뜻이라 작업 선후 관계 카드에 달지 않음
check('planminor', () => [[g.byId.get('plan-glossary'), 'Glossary Habit'], [g.byId.get('plan-state-diagram'), 'State'], [g.byId.get('plan-change-request'), 'Version History']]
  .filter(([t, r]) => t.r.includes(r)).map(([t]) => t.en)
  .concat(/GitHub/.test(g.byId.get('plan-mermaid').x) ? ['Mermaid GitHub'] : [], /\$\{3 \+ n\}/.test(html) ? ['3 + n'] : [],
    /<li>\d\./.test(g.D['u-user-manual'].h) ? ['manual'] : [], /mk-dch2/.test(html) && /h2:PMD/.test(html) ? [] : ['md h2'],
    /scope="col"/.test(g.D['u-gantt-chart'].h) && /aria-label/.test(g.D['u-gantt-chart'].h) ? [] : ['gantt'],
    (html.match(/psay\(say,/g) || []).length >= 3 ? [] : ['psay']).join(', '));    // 최종 검토 미룬 Minor 7건
check('signal', () => { const w = g.byId.get('net-webrtc').x, p = g.byId.get('net-p2p').x; return /신호 서버/.test(w) && /서버/.test(p) ? '' : w + ' / ' + p; });    // WebRTC는 연결 정보(SDP·ICE)를 신호 서버로 주고받아야 연결된다(MDN Signaling and video calling)
check('aaaa', () => { const x = g.byId.get('net-dns-record').x; return /AAAA[^,]*RFC 3596/.test(x) ? '' : x; });    // u는 RFC 1035라 AAAA 출처(RFC 3596)를 본문에 적는다
check('rngname', () => Object.entries(g.D).filter(([, p]) => typeof p.h === 'string' && /<label class="mk-rng">(?:(?!<\/label>)[\s\S])*<b>/.test(p.h)).map(([k]) => k).join(', '));    // 슬라이더 옆 숫자는 aria-valuetext가 읽으므로 이름에서 뺀다
check('live', () => Object.entries(g.D).filter(([, p]) => p.init && /\.mk-hint/.test(String(p.init)) && /textContent/.test(String(p.init)) && !/class="mk-hint" aria-live="polite"/.test(String(p.h))).map(([k]) => k).join(', '));    // 조작하면 바뀌는 결과 문장은 화면 낭독기가 읽게 aria-live
check('nwt', () => Object.entries(g.D).flatMap(([k, p]) => [...String(p.h || '').matchAll(/<span class="mk-nwt">([^<]*)<\/span>/g)].filter(m => m[1].split(/\s/).some(w => w.length > 15)).map(m => k + ':' + m[1])).join(', '));    // 세로 배치에서 긴 낱말이 옆 메시지를 한 줄 2~3글자로 좁힌다(320px 측정). 긴 값은 s로(DESIGN 네트워크 배치)
const MB_WRONG = {'In-app Purchase': 'Checkout', 'Push Token': 'Token', 'App Lifecycle': 'Cold Start'};    // 이름만 같고 뜻이 다른 카드(git·AI·서버)로 가는 연결
check('mbref', () => Object.entries(MB_WRONG).filter(([en, r]) => (g.find(en).r || []).includes(r)).map(([en, r]) => en + '→' + r).join(', '));
const ALIAS = {'콜드 스타트': 'mobile-app-launch', '웜 스타트': 'mobile-app-launch', '키체인': 'mobile-secure-storage', '키스토어': 'mobile-secure-storage', 'IDE': 'basics-ide', '패키지 관리자': 'basics-package-manager'};    // spec: 괄호 풀이(Cold·Warm Start, Keychain·Keystore)는 ko에
check('alias', () => Object.entries(ALIAS).filter(([q, id]) => !vm.runInContext(`search(${JSON.stringify(q)})`, ctx).slice(0, 5).some(t => t.id === id)).map(([q]) => q).join(', '));
check('mtword', () => Object.entries(g.D).filter(([, p]) => [...String(p.h || '').matchAll(/<span class="mk-mts[^"]*"><b aria-hidden="true">[^<]*<\/b>([^<]*)<\/span>/g)].some(m => /^[\d.,%\s]*$/.test(m[1]))).map(([k]) => k).join(', '));    // 단계 상태는 기호가 아니라 글자로 읽혀야 한다(숫자만이면 완료·진행 중을 못 읽음)
check('itt', () => { const t = g.byId.get('mobile-internal-testing-track'), s = t.x + g.D[t.v].h; return /몇 시간/.test(s) && !/몇 분 안에/.test(s) ? '' : t.x; });    // 처음 올리면 테스트 링크가 열리기까지 몇 시간 걸릴 수 있다(support.google.com 9845334)
const BS = () => g.TERMS.filter(t => t.c === 'basics');
check('bcat', () => g.CATS.find(c => c.id === 'basics').secs.map(s => s.id).join() === 'basic,core,motion,adv,code,principle,tip' ? '' : g.CATS.find(c => c.id === 'basics').secs.map(s => s.id).join());
const BOBJ = ["Source Code","Error Message","npm","Dependency","Code Editor","Event Listener","Data Structure","Recursion","Refactoring","Static vs Dynamic Typing","Constant","Parameter","Array","String","Comment","Hardcoding","Pseudocode","Spec","Boilerplate"];    // 아직 옛 형식(객체 v)으로 남은 개발 기본 카드. 다시 그리면 여기서 뺀다
check('bobj', () => { const a = BS().filter(t => typeof t.v === 'object').map(t => t.en); return [...a.filter(x => !BOBJ.includes(x)).map(x => '+' + x), ...BOBJ.filter(x => !a.includes(x)).map(x => '-' + x)].join(', '); });
check('bx', () => BS().filter(t => !t.x).map(t => t.en).join(', '));    // 헷갈림 칸
check('bm', () => BS().filter(t => g.D[t.v] && g.D[t.v].m && !/[" ]A["\s]/.test(g.D[t.v].h)).map(t => t.en).join(', '));    // 재생 버튼이 붙는 개발 기본 그림에는 움직이는 것이 있어야 한다
const BDM = {'Async/Await': ['await 있음', 'await 없음', 'aria-pressed'], 'Immutability': ['복사 후 수정', '직접 수정', 'aria-pressed'], 'Loop': ['1번', '3번', '5번', 'aria-pressed'], 'Conditional': ['age = 15', 'age = 20', 'aria-pressed']};    // 직접 조작 개발 기본 카드 → 그림에 있어야 할 버튼 이름·표시
check('bdm', () => Object.entries(BDM).filter(([en, w]) => { const t = g.find(en), p = t && g.D[t.v]; return !p || !p.init || !w.every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
check('bko', () => [['Code Editor', 'IDE'], ['npm', '패키지 관리자']].filter(([en, w]) => g.find(en).ko.includes(w)).map(([en]) => en).join(', '));    // 새 카드 IDE·Package Manager와 한글명이 겹치지 않게
check('bou', () => BS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const WS = () => g.TERMS.filter(t => t.c === 'web');
check('wcat', () => { const a = g.CATS.find(c => c.id === 'web').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,parts,search,browser,traffic,tip' ? '' : a; });
const WOBJ = ['Website', 'Web Page', 'Browser', 'Favicon', 'Meta Tag', 'Local Storage', 'Landing Page', 'Routing', 'DOM', 'PWA', 'Sitemap',
  'Header', 'Hero Section', 'Footer', 'Sidebar', 'Admin Page', 'A/B Test'];    // 옛 형식 그림이 남은 웹 카드(측정)
check('wobj', () => { const a = WS().filter(t => typeof t.v === 'object').map(t => t.en); return [...a.filter(x => !WOBJ.includes(x)).map(x => '+' + x), ...WOBJ.filter(x => !a.includes(x)).map(x => '-' + x)].join(', '); });
check('wx', () => WS().filter(t => !t.x).map(t => t.en).join(', '));    // 헷갈림 칸
const WA = h => /class="(?:[^"]*\s)?A(?:\s[^"]*)?"/.test(h);    // 움직임 클래스 A가 따로 붙었는지
check('wmre', () => WA('<i class="mk-A">') || !WA('<i class="x A y">') || !WA('<i class="A">') ? 'A 클래스 정규식' : '');
check('wm', () => WS().filter(t => typeof t.v === 'string' && t.v.startsWith('u-') && g.D[t.v].m && !WA(g.D[t.v].h)).map(t => t.en).join(', '));
const WDM = {'robots.txt': ['허용', '차단', 'aria-pressed', 'User-agent'], 'UTM Parameter': ['카톡', '인스타', '메일', 'utm_source', 'aria-pressed'],
  'HTML': ['HTML만', '+ CSS', '+ JavaScript', 'aria-pressed'], 'Conversion Rate': ['구매 4명', '구매 10명', 'aria-pressed', '(예시)']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글자
check('wdm', () => Object.entries(WDM).filter(([en, w]) => { const t = g.find(en), p = t && g.D[t.v]; return !p || !p.init || !w.every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
check('wlayers', () => ['u-web-layers', 'u-web-css', 'u-web-js'].filter(k => (g.D[k].h.match(/mk-ln/g) || []).length !== 2).join(', '));    // 본문 줄은 HTML만일 때부터 있어요(CSS는 모양만)
check('wdomain', () => (g.D['u-web-domain'].h.match(/class="y"/g) || []).length !== 2 || !g.D['u-web-domain'].h.includes('하위 이름') ? 'example.com 두 칸·하위 이름' : '');
check('wfix', () => [    // 디렉터 검토 B: 다른 사이트에서 오면 Referer는 보통 도메인까지만(기본 strict-origin-when-cross-origin), 세션 뜻, 제목은 검색 엔진이 바꿀 수 있음, 이탈 조건 셋
  [!g.find('Referrer').x.includes('도메인까지만'), 'Referrer x'], [!g.D['u-referrer'].cap.includes('도메인'), 'Referrer cap'],
  [!g.find('Bounce Rate').x.includes('세션은'), 'Bounce Rate 세션'], [!g.D['u-title-tag'].cap.includes('보통'), 'Title Tag cap'],
  [!g.D['u-bounce-rate'].h.includes('주요 이벤트'), 'Bounce Rate 그림']].filter(([b]) => b).map(([, n]) => n).join(', '));
check('wou', () => WS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
check('spcss', () => { const c = html.replace(/\/\*[\s\S]*?\*\//g, '');    // 주석 속 글자는 세지 않아요
  return c.includes('.mk-spr.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}')
    && [1, 2, 3, 4].every(k => c.includes(`@keyframes mk-rux${k}{`)) ? '' : '검색 결과 줄이 움직이지 않아요'; });
check('wmin', () => { const f = en => g.find(en), h = k => g.D[k].h;    // 디렉터 최종 검토의 미룬 항목
  const memo = ['HTML', 'SSR', 'Static Site', 'Infinite Scroll'].filter(en => f(en).x.includes('=') || !/요\.?$/.test(f(en).x));
  const src = k => html.slice(html.indexOf(`'${k}':{h:`), html.indexOf('\n', html.indexOf(`'${k}':{h:`)));
  return [[f('robots.txt').p.includes('관리자'), 'robots.txt p'], [html.includes('열 수 있어야 보여요'), 'robots 차단 말'],
    [f('Heatmap').d.includes('진한 색'), 'Heatmap d'], [!f('Autofill').r.includes('Autocomplete'), 'Autofill r'],
    [f('Pop-up Blocker').x.includes('누른 효과'), 'Pop-up Blocker x'], [!f('Browser Extension').x.includes('권한'), 'Browser Extension x'],
    [!f('PWA').x.includes('Chrome'), 'PWA x'], [!f('Local Storage').x.includes('Safari를 쓰는 동안'), 'Local Storage x'], [!f('PWA').x.includes('스토어 없이도'), 'PWA 스토어'],
    [f('Pop-up Blocker').x.includes('따로 연 창'), 'Pop-up 말'], [!h('u-browser-extension').includes('를 번역하면'), '확장 그림 읽기'],
    [!f('Meta Tag').x.includes('og:로 시작'), 'Meta Tag x'], [!f('A/B Test').x.includes('보통'), 'A/B Test x'], [!f('CMS').x.includes('보통'), 'CMS x'],
    [memo.length > 0, '메모 말투 ' + memo.join('·')], [!h('u-web-url').includes('프로토콜'), 'URL 그림'], [!h('u-web-static-site').includes('(예시)'), 'Static Site 그림'],
    [!f('Bounce Rate').x.includes('기본 10초') || !h('u-bounce-rate').includes('기본 10초'), 'Bounce Rate 10초'], [!f('Unique Visitor').x.includes('로그인'), 'Unique Visitor x'],
    [!html.includes('/* Browser Engine x 확인 2026-11'), 'Browser Engine 확인일'], [!f('Service Worker').x.includes('localhost'), 'Service Worker x'],
    [!g.SYMPTOMS.find(s => s.q === 'Safari에서만 화면이 깨져요').t.includes('Browser Engine'), 'Safari 증상'],
    [src('u-logo').includes('.replace(') || !h('u-logo').includes('<b class="mk-hl">로고</b>'), 'u-logo'],
    [src('u-address-bar').includes('.replace(') || !h('u-address-bar').includes('class="mk-url mk-hl"'), 'u-address-bar']].filter(([b]) => b).map(([, n]) => n).join(', '); });
const WSYM = h => /[✓✕★→←↑↓]|&(?:rarr|larr|uarr|darr|check|times|starf?|#8594|#10003|#9733);/.test(h.replace(/<([a-z]+)[^>]*aria-hidden="true"[^>]*>[^<]{1,2}<\/\1>/g, ''));    // 숨긴 칸은 기호 1~2자만
check('wsymre', () => !WSYM('<b>&rarr; 다음</b>') || !WSYM('<span aria-hidden="true">→ 진짜 글</span>') || WSYM('<span aria-hidden="true">→</span> 다음') ? '기호 검사 구멍' : '');
check('wsym', () => WS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)};    // 기호는 읽지 않게 숨겨요
  return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('symcss', () => (html.match(/content:'[^']*[→←↑↓✓✕★][^']*'(?! \/ '')/g) || []).filter(c => !html.includes(c + " / ''")).join(' '));    // CSS 기호도 대체 글 ''
const WB_WRONG = {'Bounce Rate': ['Bounce', 'Debounce'], 'Event Tracking': ['Event'], 'Time on Page': ['Session'], 'Pop-up Blocker': ['Popover', 'Modal'], 'Logo': ['Brand Color']};    // 이름만 비슷한 카드
check('wwrong', () => Object.entries(WB_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'web' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
check('dupre', () => norm('Async/Await') !== norm('async / await') || norm('Dark Mode') !== norm('dark mode') || norm('Next.js') !== norm('nextjs') || norm('CSS-in-JS') === norm('CSS') ? '이름 정규화' : '');
const FS = () => g.TERMS.filter(t => t.c === 'front');
check('fcat', () => { const a = g.CATS.find(c => c.id === 'front').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,layout,unit,css,event,react,build,tip' ? '' : a; });
check('fobj', () => FS().filter(t => typeof t.v === 'object').map(t => t.en).join(', '));    // 옛 형식 그림 0장
const FKEEP = ['Box Model', 'Margin', 'Padding', 'Border', 'Flexbox', 'CSS Grid', 'Gap', 'Position Sticky', 'Z-index', 'Overflow',
  'Component', 'Media Query', 'Border Radius', 'Box Shadow', 'Transition', 'Keyframes', 'Transform', 'Hover', 'Focus', 'Animation Duration', 'Intersection Observer',
  'Rotate', 'State', 'Row', 'Center Alignment', 'Flex Wrap', 'Aspect Ratio', 'Breakpoint', 'Viewport', 'vw / vh'];    // 그대로 두는 그림 30장(측정)
check('fpre', () => { const ws = [...html.replace(/base64,[A-Za-z0-9+/=]+/g, 'base64,').matchAll(/([^{}]*\.mk-fcd[^{}]*\bp)\{[^}]*white-space:([a-z-]+)/g)].map(m => m[2]); return ws.length && ws.every(w => w === 'pre-wrap') && !/\.mk-dcb p\{[^}]*white-space:(?!pre-wrap)/.test(html.slice(html.indexOf('.mk-fcd .mk-dcb p{'))) ? '' : 'fcss 줄 앞 공백이 사라짐'; });    // 디렉터 D
check('fdvw', () => /\.mk-mobox>\.mk-fst\{width:100%\}/.test(html) ? '' : '직접 조작 안 개발자 도구 칸이 내용 폭으로 줄어듦');    // 320px에서 .mk-dv(container:inline-size)가 111px로 좁아지던 문제
check('fdfix', () => { const f = en => g.TERMS.find(t => t.c === 'front' && t.en === en), bad = [];    // 디렉터 D 지적: 사실·그림 고침이 되돌아가지 않게
  if (/붙여요/.test(f('Lifecycle').x) || /흐름에 할 일을 붙이는/.test(f('useEffect').x) || !/시작하고 정리/.test(f('Lifecycle').x) || !/시작하고 정리/.test(f('useEffect').x)) bad.push('Lifecycle·useEffect');
  if (!/보통 설정 파일/.test(f('Webpack').x) || /꼭|반드시/.test(f('Webpack').x)) bad.push('Webpack'); if (!/중첩을 바로 지원/.test(f('Sass').x)) bad.push('Sass');
  if (FS().some(t => /styled-components/.test(t.p + t.x))) bad.push('CSS-in-JS');
  if (!f('Transpile').r.includes('Babel') || !f('Context API').r.includes('Props Drilling')) bad.push('r');
  const src = k => html.slice(html.indexOf(`'${k}':{h:`), html.indexOf('cap:', html.indexOf(`'${k}':{h:`)));
  if (/n => n \+ 1\);'|function \(n\) \{'/.test(src('u-front-babel').replace(/'  (n =>|function)/g, '')) || !/'  n => n \+ 1\);'/.test(src('u-front-babel'))) bad.push('babel');
  if (/http:\/\//.test(src('u-front-vite'))) bad.push('vite'); if (!/'Modal'/.test(src('u-front-portal'))) bad.push('portal');
  return bad.join(', '); });
check('fukey', () => FS().filter(t => !FKEEP.includes(t.en) && !(typeof t.v === 'string' && t.v.startsWith('u-front-') && g.D[t.v])).map(t => t.en).join(', '));
check('fsym', () => FS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('fshare', () => ['boxmodel', 'zindex', 'jank', 'fade', 'flicker', 'responsive', 'contrast', 'aspect', 'fontsize', 'transition', 'shadow'].filter(k => !g.D[k]).join(', '));    // 공유 그림 키는 남긴다
const FC = en => g.TERMS.find(t => t.c === 'front' && t.en === en) || {};
const FDM = {'Specificity': ['h2', '.title', '#main', 'aria-pressed', 'aria-live'], 'Event Bubbling': ['button', 'li', 'stopPropagation', 'aria-pressed', 'aria-live'],
  'Visibility': ['display:none', 'visibility:hidden', 'opacity:0', 'aria-pressed', 'aria-live'],
  'Key': ['key 있음', 'key 없음', '맨 앞에 추가', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
check('fdm', () => Object.entries(FDM).filter(([en, w]) => { const t = g.find(en), p = t && g.D[t.v]; return !p || !p.init || !String(p.init).includes('psay') || !w.every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));    // 결과 문장은 psay로 다시 읽힌다
check('fdmrun', () => vm.runInContext(`(() => { const bad = [], s = new Set(['h2', '#main']);
  if (!fspecSay(new Set()).includes('규칙 없음')) bad.push('모두 끔');
  if (!fspecSay(s).includes('#main') || !fspecSay(s).includes('아이디')) bad.push('아이디 승');
  if ((fspec(s).match(/덮임/g) || []).length !== 1 || fspec(s).includes('.title')) bad.push('덮임 1개');
  if (!fspecSay(s).includes('#main 규칙이 이겨요')) bad.push('조사');
  if ((fvis('opacity:0').match(/mk-fvon/g) || []).length !== 1) bad.push('표 한 행');
  if (!fbub('button', false).includes('지나간 곳: button, li, ul')) bad.push('버블링');
  if (!fbub('button', true).includes('지나간 곳: button, li') || fbub('button', true).includes('li, ul')) bad.push('전파 막기');
  if (!fbub('li', true).includes('지나간 곳: li') || fbub('li', true).includes('li, ul')) bad.push('li 막기');
  const kr = h => h.split('<li').slice(1), k0 = kr(fkey(false, 1)), k1 = kr(fkey(true, 1));
  if (!(k0[0].includes('귤') && k0[0].includes('빨강') && k0[0].includes('엉뚱한 줄')) || !k0[1].includes('사과') || !k0[1].includes('value=""')) bad.push('key 없음');
  if (!k1.find(r => r.includes('사과')).includes('빨강') || fkey(true, 1).includes('엉뚱한 줄')) bad.push('key 있음');
  if (fkeySay(true, 0) !== fkeySay(false, 0) || !fkeySay(false, 1).includes('줄 번호(index)')) bad.push('key 문장');
  if (!fkeySay(false, 0, true).startsWith('귤을 뺐어요') || fkeySay(false, 0).includes('뺐어요')) bad.push('귤 뺌 문장');    // 디렉터 F: 다시 누르면 귤이 빠진다고 알림
  return bad.join(', '); })()`, ctx));
check('fdirf', () => (FC('useEffect').x || '').includes('끝없이 반복') ? '' : 'useEffect 끝없는 반복 원인');    // 디렉터 F: 증상 연결 카드에 원인
check('fdire', () => { const r = [], x = en => FC(en).x || '', D = g.D;    // 디렉터 E 지적
  if (/아무리 키워도/.test(x('Z-index')) || !/부모보다 위에 있는 바깥 요소/.test(x('Z-index'))) r.push('Z-index');
  ['Margin', 'Padding', 'Flexbox', 'Gap', 'Transition', 'Props', 'rem', 'vw / vh'].forEach(en => { if (x(en).split(/(?<=[.])\s/).some(t => !/요$/.test(t.replace(/\.$/, '')))) r.push('해요체 ' + en); });
  [['Keyframes', 'transition'], ['Position Sticky', 'fixed'], ['Container', '래퍼'], ['Canvas', 'SVG']].forEach(([en, w]) => { if (!x(en).split('. ')[0].includes(w)) r.push('짝 먼저 ' + en); });
  if (/바로 부모 크기/.test(x('rem')) || !/부모나 자기 글자 크기/.test(x('rem'))) r.push('rem');
  if (/부모에 overflow/.test(x('Position Sticky')) || !/감싸는 상자 중 하나/.test(x('Position Sticky'))) r.push('sticky 조건');
  if (/맨 위에서만/.test(x('Hook')) || !/가장 바깥/.test(x('Hook'))) r.push('Hook');
  if (!(FC('Container Query').r || []).includes('Responsive Web Design') || !D['u-front-container-query'].h.includes('container-type: inline-size')) r.push('Container Query');
  if (!D['u-front-next-js'].h.includes("'use client';")) r.push('Next.js use client');
  if (D.sticky.h.includes('고정된') || (D.sticky.lab || []).length) r.push('sticky 꼬리표');
  if (/<div class="track">(?:(?!<\/div>).)*<em>/.test(D.duration.h)) r.push('duration 글 가림');
  if ((FC('vw / vh').ko || '').includes('·')) r.push('vw/vh 캡션');
  if (!/\.mk-fmw\.n\{width:min\(100%,40px\)\}/.test(html)) r.push('Max Width 차이');
  if (/하나로 묶/.test(x('Vite'))) r.push('Vite 하나로');
  return r.join(', '); });
check('ffinal', () => { const r = [], x = en => FC(en).x || '';    // 최종 검토 지적: 런타임·사실 회귀를 잡게
  if (!html.includes("e.style.left = `clamp(${h}px, ${e.style.left}, calc(100% - ${h}px))`")) r.push('꼬리표 clamp');
  if (!/이벤트|클릭 처리기/.test(x('Error Boundary')) || !/잡지 못해/.test(x('Error Boundary'))) r.push('Error Boundary');
  if (!/빈 배열 \[\]이면 처음 한 번/.test(x('useEffect')) || !/빼면 그릴 때마다/.test(x('useEffect'))) r.push('useEffect 의존성');
  if (vm.runInContext("find('Component', 'front').id", ctx) !== 'front-component' || vm.runInContext("find('Component').id", ctx) === 'front-component') r.push('같은 카테고리 r');
  if (/키보드로 지금 선택/.test(FC('Focus').d)) r.push('Focus d');
  return r.join(', '); });
check('freact', () => [['Controlled Input', 'useState'], ['State', 'Immutability'], ['Vendor Prefix', 'PostCSS']].filter(([en, w]) => !(FC(en).r || []).includes(w)).map(([en]) => en).join(', '));
check('fdirb', () => { const r = [], D = g.D;    // 디렉터 B 지적
  if (!D['u-front-visibility'].h.includes('<b>고름</b><code>visibility:<wbr>hidden')) r.push('visibility 고름·끊김');
  if (!html.includes('.mk-card.mk-fih{') || !html.includes('.mk-f.mk-frs{')) r.push('fih·frs 명시도');
  if (!(FC('Pseudo-class').x || '').includes('보통 콜론')) r.push('Pseudo-class 보통');
  if (!D['u-front-vendor-prefix'].h.includes('요즘의 Edge')) r.push('접두사 Edge');
  if (D['u-front-preventdefault'].h.includes('example.com/join')) r.push('주소 잘림');
  const tw = D['u-front-two-way-binding'].h; if (!(tw.indexOf('mk-in') < tw.indexOf('<b>안녕'))) r.push('양방향 순서');
  if (/쓸 수 없어요/.test(FC('Event Delegation').x) || FC('Event Delegation').o !== 1 || !FC('Event Delegation').u) r.push('위임');
  if ((FC('Form Validation').x || '').includes('서버가 받은 값')) r.push('폼 검사 x');
  if ((FC('Fetch').x || '').includes('reject')) r.push('Fetch reject');
  if (D['u-front-css-inheritance'].h.includes('navy')) r.push('상속 색');
  return r.join(', '); });
check('fdirc', () => { const r = [], D = g.D, cb = FC('Cache Busting');    // 디렉터 C 지적
  if (/Ctrl/.test(cb.d) || !/버전/.test(cb.d) || !/Ctrl\+Shift\+R/.test(cb.x || '') || /강제 새로고침/.test(cb.ko)) r.push('캐시 d·x·ko');
  if (!D['u-front-visibility'].h.includes('opacity') || !vm.runInContext(`FVIS['opacity:0'].say`, ctx).includes('읽을 수 있어요')) r.push('opacity 말');
  if (!vm.runInContext(`fbub('button', false)`, ctx).includes('지나간 곳: button, li, ul')) r.push('지나간 곳');
  if (!D['u-front-position'].h.includes('위치를 정한 조상 기준')) r.push('position 조상');
  if (!D['u-front-request-animation-frame'].h.includes('계속하려면 다시 요청해요')) r.push('rAF 다시 요청');
  const one = vm.runInContext(`[fspecSay(new Set(['#main'])), fspecSay(new Set(['h2'])), fspec(new Set(['h2']))]`, ctx);
  if (!one[0].includes('#main만 켜져서 주황이에요') || !one[1].includes('h2만 켜져서 초록이에요') || !one[2].includes('var(--moss)')) r.push('한 규칙 말·색');
  if (/"--ch3"|"--mark"/.test(vm.runInContext(`JSON.stringify(FSPEC)`, ctx))) r.push('대비 낮은 색');
  if (!/위치를 정한/.test(FC('Position').x) || /부모 기준/.test(FC('Position').x)) r.push('Position x');
  if (!/강력 새로고침/.test(cb.x || '')) r.push('강력 새로고침');
  const say = vm.runInContext(`[fbubSay('button', false), fbubSay('li', true)]`, ctx);
  if (!say[0].includes('ul까지 올라가요') || !say[1].includes('ul은 반응하지 않아요')) r.push('fbubSay');
  if (!['aria-pressed', 'fspec(on)'].every(x => String(D['u-front-specificity'].init).includes(x)) || !['stop = !stop', 'fbub(t, stop)'].every(x => String(D['u-front-event-bubbling'].init).includes(x))) r.push('init');
  if (!html.includes('.stage:has(>.mk-mobox){padding-top:50px;padding-bottom:22px}')) r.push('조작 그림 아래 여백');    // 다시 보기 단추가 없어 44px가 빈칸
  return r.join(', '); });
check('ftext', () => FS().filter(t => WSYM(t.d + (t.x || '')) || !/줘$/.test(t.p)).map(t => t.en).join(', '));    // d·x에 기호 없음, p는 ~줘
check('fxn', () => FS().filter(t => { const n = (t.x || '').match(/[.?!](?=\s|$)/g)?.length || 0; return t.x && (n < 2 || n > 3); }).map(t => t.en).join(', '));    // x는 2~3문장
check('fx', () => FS().filter(t => !t.x).map(t => t.en).join(', '));
check('fm', () => FS().filter(t => typeof t.v === 'string' && t.v.startsWith('u-front-') && g.D[t.v].m && !WA(g.D[t.v].h)).map(t => t.en).join(', '));
check('fou', () => FS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const FB_WRONG = {'Key': ['Key-Value', 'API Key'], 'Input Event': ['Event'], 'CSS Inheritance': ['Inheritance'], 'Context API': ['Context'], 'Lifecycle': ['App Lifecycle']};    // 이름만 비슷한 다른 뜻
check('fwrong', () => Object.entries(FB_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'front' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
const BKS = () => g.TERMS.filter(t => t.c === 'back');
check('bkcat', () => { const a = g.CATS.find(c => c.id === 'back').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,api,arch,data,job,auth,tip' ? '' : a; });
const BK_TODO = [];    // 아직 u-back- 그림이 아닌 옛 백엔드 카드. 다시 그리면 여기서 뺀다
const BK_NOX = [];    // x를 아직 안 쓴 옛 카드. 계획서 ②가 비운다
const BK_SYM = [];    // 기호가 남은 옛 카드. Task 4가 비운다
const bkdiff = (a, list) => [...a.filter(x => !list.includes(x)).map(x => '+' + x), ...list.filter(x => !a.includes(x)).map(x => '-' + x)].join(', ');
check('bkukey', () => bkdiff(BKS().filter(t => !(typeof t.v === 'string' && t.v.startsWith('u-back-') && g.D[t.v])).map(t => t.en), BK_TODO));
check('bkobj', () => BKS().filter(t => typeof t.v === 'object' && !BK_TODO.includes(t.en)).map(t => t.en).join(', '));    // 옛 형식 그림은 남은 목록 안에만
check('bksym', () => bkdiff(BKS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en), BK_SYM));
check('bkx', () => bkdiff(BKS().filter(t => !t.x).map(t => t.en), BK_NOX));
const BKX_HAS = {'CORS': ['OPTIONS'], 'Authentication': ['401'], 'Authorization': ['403'], 'Idempotent': ['PUT']};    // x에 꼭 있어야 할 사실
check('bkxhas', () => Object.entries(BKX_HAS).filter(([en, w]) => !w.every(x => (g.find(en).x || '').includes(x))).map(([en]) => en).join(', '));
check('bkm', () => BKS().filter(t => { const p = typeof t.v === 'string' && t.v.startsWith('u-back-') && g.D[t.v]; return p && !!p.m !== WA(p.h); }).map(t => t.en).join(', '));    // 재생 버튼(m)과 움직임(A)은 함께 있다
check('bkou', () => BKS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
check('bkstill', () => vm.runInContext(`(() => { const bad = [], n = (h, re) => (h.match(re) || []).length;
  if (n(brate(0), /<li/g) !== 0 || n(brate(4), /200 OK/g) !== 4 || brate(4).includes('429') || brate(4).includes('실패')) bad.push('brate 0·4');
  if (n(brate(5), /200 OK/g) !== 5 || brate(5).includes('429') || !brate(5).includes('1분에 5번')) bad.push('brate 5');
  if (n(brate(6), /429 Too Many Requests/g) !== 1 || n(brate(6), /200 OK/g) !== 5 || !brate(6).includes('실패')) bad.push('brate 6');
  if (n(brate(9), /<li/g) !== 6) bad.push('brate 6행');
  if (!brateSay(0).includes('없어요') || !brateSay(4).includes('1번 더') || !brateSay(5).includes('이제 더 보낼 수 없어요') || !brateSay(6).includes('429')) bad.push('brateSay');
  const u = bauthz('일반 회원'), a = bauthz('관리자');
  if (!u.includes('403 Forbidden') || u.includes('200 OK') || !a.includes('200 OK') || a.includes('403') || !bauthzSay('일반 회원').includes('권한이 없어요')) bad.push('bauthz');
  [() => brate(-1), () => brate(1.5), () => bauthz('손님')].forEach((f, i) => { try { f(); bad.push('안 막음 ' + i); } catch (e) { if (!/^(brate|bauthz): /.test(e.message)) bad.push('메시지 ' + i); } });
  if (!bcache(['miss', 'hit']).includes('느림') || !bcache(['miss', 'hit']).includes('빠름') || (bcache(Array(8).fill('hit')).match(/<li/g) || []).length !== 6) bad.push('bcache');
  if (!bcacheSay([]).includes('없어요') || !bcacheSay(['miss']).includes('DB까지') || !bcacheSay(['miss', 'hit']).includes('바로')) bad.push('bcacheSay');
  if ((bidem('POST', 3).match(/<li/g) || []).length !== 3 || (bidem('PUT', 3).match(/<li/g) || []).length !== 1 || (bidem('PUT', 0).match(/<li/g) || []).length !== 0) bad.push('bidem');
  if (!bidemSay('POST', 3).includes('3개') || !bidemSay('PUT', 3).includes('1개') || !bidemSay('PUT', 3).startsWith('PUT을')) bad.push('bidemSay');
  const p9 = bidem('POST', 9); if (n(p9, /<li/g) !== 6 || !p9.includes('새 글 9번') || p9.includes('새 글 3번')) bad.push('bidem 6행');
  [() => brateSay(-1), () => bauthzSay('손님'), () => bcacheSay(['x']), () => bidemSay('GET', 1), () => bidemSay('PUT', -1)].forEach((f, i) => { try { f(); bad.push('안 막음 s' + i); } catch (e) { if (!/^(brate|bauthz|bcache|bidem): /.test(e.message)) bad.push('메시지 s' + i); } });
  [() => bcache(['x']), () => bidem('GET', 1), () => bidem('POST', -1), () => bidem('PUT', 1.5)].forEach((f, i) => { try { f(); bad.push('안 막음 c' + i); } catch (e) { if (!/^(bcache|bidem): /.test(e.message)) bad.push('메시지 c' + i); } });
  return bad.join(', '); })()`, ctx));
const BKDM = {'Rate Limit': ['요청 보내기', '시간 지나기', 'aria-live'], 'Idempotent': ['POST', 'PUT', '요청 보내기', '처음으로', 'aria-pressed', 'aria-live'],
  'Cache': ['요청 보내기', '캐시 비우기', 'aria-live'], 'Authorization': ['일반 회원', '관리자', '글 삭제', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
const BKP = en => { const t = g.TERMS.find(x => x.c === 'back' && x.en === en); return t && g.D[t.v]; };
check('bkdm', () => Object.entries(BKDM).filter(([en, w]) => { const p = BKP(en); return !p || !p.init || !String(p.init).includes('psay') || ![...w, 'class="mk-mobox"', 'class="mk-hint"'].every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
const board = h => {    // 가짜 그림판: init이 쓰는 API만 흉내 낸다
  const el = () => ({innerHTML: '', textContent: '', attrs: {}, dataset: {}, on: {}, setAttribute(k, v) { this.attrs[k] = String(v); }, addEventListener(e, f) { (this.on[e] = this.on[e] || []).push(f); }, click() { (this.on.click || []).forEach(f => f()); }});
  const box = el(), hint = el(); box.innerHTML = (h.match(/<div class="mk-mobox">([\s\S]*?)<\/div><div (?:class="mk-tkeys"|role="group")/) || [])[1] || ''; hint.textContent = (h.match(/<span class="mk-hint"[^>]*>([^<]*)<\/span>/) || [])[1] || '';
  const keys = [...h.matchAll(/<button([^>]*class="mk-tkey"[^>]*)>([^<]*)<\/button>/g)].map(m => { const b = el(), k = m[1].match(/data-k="([^"]*)"/), a = m[1].match(/aria-pressed="([^"]*)"/);
    b.textContent = m[2]; if (k) b.dataset.k = k[1]; if (a) b.attrs['aria-pressed'] = a[1]; return b; });
  return {box, hint, keys, key: t => keys.find(b => b.textContent === t), querySelector: q => q === '.mk-mobox' && h.includes('class="mk-mobox"') ? box : q === '.mk-hint' && h.includes('class="mk-hint"') ? hint : q === '.mk-tkey' ? keys[0] : null,
    querySelectorAll: q => q === '.mk-tkey' ? keys : []};
};
check('bkdmrun', () => { const bad = [], st = ctx.setTimeout; ctx.setTimeout = f => f();
  try { const V = k => vm.runInContext(k, ctx), first = {'Rate Limit': V('brateSay(0)'), 'Idempotent': V("bidemSay('POST', 0)"), 'Cache': V('bcacheSay([])'), 'Authorization': V('BAZ_IDLE')};
    const pic = {'Rate Limit': V('brate(0)'), 'Idempotent': V("bidem('POST', 0)"), 'Cache': V('bcache([])'), 'Authorization': V('whelp(BAZ_HELP)')};
    const run = en => { const p = BKP(en), s = board(p.h); if (s.hint.textContent !== first[en]) bad.push(en + ' 첫 문장'); if (s.box.innerHTML !== pic[en]) bad.push(en + ' 첫 그림'); p.init(s); return s; };
    const r = run('Rate Limit'), rs = () => r.key('요청 보내기').click();
    for (let i = 0; i < 6; i++) rs(); if (!r.box.innerHTML.includes('429') || !r.hint.textContent.includes('429')) bad.push('rate 6');
    r.key('시간 지나기').click(); if (r.hint.textContent !== V('BRL_RESET')) bad.push('rate 리셋');
    rs(); if (r.box.innerHTML.includes('429') || !r.hint.textContent.includes('1번째 요청은 통과')) bad.push('rate 1');
    const d = run('Idempotent'), ds = () => d.key('요청 보내기').click();
    if (!d.box.innerHTML.includes('POST /posts')) bad.push('idem 첫 그림');
    ds(); ds(); ds(); if (!d.hint.textContent.includes('3개') || !d.box.innerHTML.includes('새 글 3번')) bad.push('idem POST');
    d.key('PUT').click(); if (!d.hint.textContent.includes('아직 보내지 않았어요') || d.key('POST').attrs['aria-pressed'] !== 'false' || d.key('PUT').attrs['aria-pressed'] !== 'true') bad.push('idem PUT 고르기');
    ds(); ds(); ds(); if (!d.hint.textContent.includes('1개') || !d.box.innerHTML.includes('PUT /posts/7') || !d.box.innerHTML.includes('7번 글')) bad.push('idem PUT');
    d.key('처음으로').click(); if (!d.hint.textContent.includes('아직')) bad.push('idem 처음');
    const c = run('Cache'), cs = () => c.key('요청 보내기').click();
    cs(); cs(); if (!c.hint.textContent.includes('바로')) bad.push('cache 2');
    c.key('캐시 비우기').click(); if (c.hint.textContent !== V('BCK_CLEAR') || !c.box.innerHTML.includes(V('BCK_EMPTY'))) bad.push('cache 비우기');
    cs(); if (!c.hint.textContent.includes('DB까지') || c.box.innerHTML.includes(V('BCK_EMPTY'))) bad.push('cache 3');
    const a = run('Authorization');
    a.key('글 삭제').click(); if (!a.hint.textContent.includes('로그인은 됐지만 권한이 없어요') || !a.box.innerHTML.includes('403')) bad.push('authz 회원');
    a.key('관리자').click(); if (a.hint.textContent !== V('BAZ_IDLE') || a.key('관리자').attrs['aria-pressed'] !== 'true' || a.key('일반 회원').attrs['aria-pressed'] !== 'false') bad.push('authz 고르기');
    a.key('글 삭제').click(); if (!a.box.innerHTML.includes('200 OK')) bad.push('authz 관리자');
  } finally { ctx.setTimeout = st; }
  return bad.join(', '); });
const DBDM = {'WHERE': ["city = '서울'", 'age &gt; 20', 'age &gt; 30', 'aria-pressed', 'aria-live'], 'Join': ['INNER', 'LEFT', 'aria-pressed', 'aria-live'],
  'Index': ['인덱스 없음', '인덱스 있음', '찾기', 'aria-pressed', 'aria-live'], 'Transaction': ['중간에 실패', '실행', '처음으로', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
const DBP = en => { const t = g.TERMS.find(x => x.c === 'db' && x.en === en); return t && g.D[t.v]; };
check('dbdm', () => Object.entries(DBDM).filter(([en, w]) => { const p = DBP(en); return !p || !p.init || !String(p.init).includes('psay') || ![...w, 'class="mk-mobox"', 'class="mk-hint"'].every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
check('dbdmrun', () => { const bad = [], st = ctx.setTimeout; ctx.setTimeout = f => f();
  try { const V = k => vm.runInContext(k, ctx), first = {'WHERE': V('dwhereSay(0)'), 'Join': V("djoinSay('INNER')"), 'Index': V('dindexSay(false, false)'), 'Transaction': V('dtxSay(false, false)')};
    const pic = {'WHERE': V('dwhere(0)'), 'Join': V("djoin('INNER')"), 'Index': V('dindex(false, false)'), 'Transaction': V('dtx(false, false)')};
    const run = en => { const p = DBP(en); if (!p || !p.init) { bad.push(en + ' init'); return null; } const s = board(p.h); if (s.hint.textContent !== first[en]) bad.push(en + ' 첫 문장'); if (s.box.innerHTML !== pic[en]) bad.push(en + ' 첫 그림'); p.init(s); return s; };
    const pk = (s, i) => s.keys.filter(b => b.dataset.k)[i], on = s => s.keys.filter(b => b.dataset.k).map(b => b.attrs['aria-pressed']).join();
    const w = run('WHERE');
    if (w) { pk(w, 1).click(); if (w.box.innerHTML !== V('dwhere(1)') || w.hint.textContent !== V('dwhereSay(1)') || on(w) !== 'false,true,false') bad.push('where 2번');
      pk(w, 2).click(); if (!w.hint.textContent.includes('1줄')) bad.push('where 3번'); }
    const j = run('Join');
    if (j) { pk(j, 1).click(); if (j.box.innerHTML !== V("djoin('LEFT')") || !j.hint.textContent.includes('NULL') || on(j) !== 'false,true') bad.push('join LEFT');
      pk(j, 0).click(); if (!j.hint.textContent.includes('빠졌어요')) bad.push('join INNER'); }
    const x = run('Index'), rd = s => (s.box.innerHTML.match(/>읽음</g) || []).length;
    if (x) { x.key('찾기').click(); if (x.hint.textContent !== '5줄을 다 읽었어요' || rd(x) !== 5) bad.push('index 없음 찾기');
      pk(x, 1).click(); if (!x.hint.textContent.includes('찾기') || x.box.innerHTML.includes('읽음')) bad.push('index 있음 고르기');
      x.key('찾기').click(); if (x.hint.textContent !== '색인으로 1줄만 읽었어요') bad.push('index 있음 찾기'); }
    const t = run('Transaction');
    if (t) { t.key('실행').click(); if (!t.hint.textContent.startsWith('COMMIT') || !t.box.innerHTML.includes('40000')) bad.push('tx 실행');
      t.key('처음으로').click(); if (t.hint.textContent !== '실행을 눌러 보세요' || t.box.innerHTML.includes('40000')) bad.push('tx 처음');
      pk(t, 0).click(); if (pk(t, 0).attrs['aria-pressed'] !== 'true') bad.push('tx 실패 켬');
      t.key('실행').click(); if (!t.hint.textContent.startsWith('ROLLBACK') || !t.box.innerHTML.includes('>실패<') || !t.box.innerHTML.includes('50000')) bad.push('tx 실패 실행');
      pk(t, 0).click(); if (pk(t, 0).attrs['aria-pressed'] !== 'false') bad.push('tx 실패 끔'); }
  } finally { ctx.setTimeout = st; }
  return bad.join(', '); });
check('bktext', () => BKS().filter(t => WSYM(t.d + (t.x || '')) || !/줘$/.test(t.p)).map(t => t.en).join(', '));    // d·x에 기호 없음, p는 ~줘
check('bkxn', () => BKS().filter(t => { const n = (t.x || '').match(/[.?!](?=\s|$)/g)?.length || 0; return t.x && (n < 2 || n > 3); }).map(t => t.en).join(', '));    // x는 2~3문장
const BK_WRONG = {'Access Token': ['Token'], 'Bearer Token': ['Token'], 'Streaming Response': ['Streaming', 'Streaming Output'], 'OAuth Scope': ['Scope'],
  'Event-driven Architecture': ['Event'], 'Worker': ['Service Worker', 'Web Worker'], 'Lock': ['Lock File', 'Account Lockout'], 'Route Handler': ['Routing']};    // 이름만 비슷한 다른 뜻
const BK_FIXD = [    // 검토 D: [카드, 들어가야 할 말, 빠져야 할 말]. 'v.'로 시작하면 그 카드 그림(h+cap)을 본다
  ['Bearer Token', 'x', ['성질', 'AI'], ['보내는 방식이고', '흔한 액세스']], ['Access Token', 'd', ['써도 되는지'], ['누구인지']], ['Access Token', 'x', ['유효 시간이 짧은', '유효 시간이 긴'], ['쓰는 짧은', '오래 쓰는']],
  ['Cookie vs Token', 'x', ['CSRF', 'SameSite'], []], ['Cookie vs Token', 'v.', ['빼 가기 어려워요'], ['더 안전해요']], ['Service Account', 'x', ['긴 문자열', '새어 나가기'], ['글자 하나', '새기 쉬워']],
  ['Event-driven Architecture', 'x', ['서버에서 일어난 일'], ['한 방법이고, 화면']], ['Streaming Response', 'u', ['Streams_API'], []], ['Streaming Response', 'x', ['모습'], ['비슷해 보여도']],
  ['Long Polling', 'x', ['빈 답'], []], ['Exponential Backoff', 'd', [], ['예시']], ['Exponential Backoff', 'v.', ['무작위'], []], ['Lock', 'v.', ['음수'], []],
  ['Session Store', 'v.', ['저장소'], ['보관소']], ['Batch Processing', 'v.', ['시각·건수는 예시'], []], ['Response Header', 'x', ['브라우저나 앱'], []]];
check('bkfixd', () => BK_FIXD.filter(([en, k, yes, no]) => { const t = g.find(en), s = k === 'v.' ? g.D[t.v].h + g.D[t.v].cap : t[k] || ''; return !yes.every(w => s.includes(w)) || no.some(w => s.includes(w)); }).map(([en, k]) => en + ' ' + k).join(', '));
check('bkwrong', () => Object.entries(BK_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'back' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
const BK_SECRET = s => (s.match(/[A-Za-z0-9_-]{24,}/g) || []).some(w => /\d/.test(w) && /[A-Za-z]/.test(w)) || /\bat\b[^\n]{0,40}\.(?:m?js|ts):\d+/.test(s) || /localStorage\.setItem\([^)]*(?:token|jwt|session)/i.test(s);    // 긴 영숫자 키·스택 추적·토큰 저장 모습
check('bksafe', () => [...['ab12'.repeat(7), 'at run (/app/server.js:12:5)', "localStorage.setItem('JWT', t)"].filter(x => !BK_SECRET(x)).map(x => '못 잡음 ' + x), ...(BK_SECRET('Access-Control-Allow-Origin') ? ['헤더 이름 오탐'] : []),
  ...BKS().filter(t => { const p = typeof t.v === 'string' && g.D[t.v]; return p && BK_SECRET(p.h.replace(/<[^>]+>/g, ' ') + ' ' + (p.cap || '')); }).map(t => t.en)].join(', '));
check('bkshare', () => ['input', 'progress', 'scale', 'pulse', 'spinner', 'stagger', 'typing', 'shake', 'pagination'].filter(k => !g.D[k]).join(', '));    // 옛 back 카드가 쓰던 공유 그림 키는 남긴다
const DBS = () => g.TERMS.filter(t => t.c === 'db');
check('dbcat', () => { const a = g.CATS.find(c => c.id === 'db').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,sql,query,model,tx,ops,tip' ? '' : a; });
const DB_TODO = [];    // 아직 u-db- 그림이 아닌 옛 DB 카드. 다시 그리면 여기서 뺀다
const DB_NOX = [];    // x를 아직 안 쓴 옛 카드 48장. DB_TODO와 같은 이름이지만 따로 적는다(DB_TODO는 Task 4·5에서 줄어듦). 계획서 ②가 비운다
check('dbukey', () => bkdiff(DBS().filter(t => !(typeof t.v === 'string' && t.v.startsWith('u-db-') && g.D[t.v])).map(t => t.en), DB_TODO));
check('dbobj', () => DBS().filter(t => typeof t.v === 'object' && !DB_TODO.includes(t.en)).map(t => t.en).join(', '));    // 옛 형식 그림은 남은 목록 안에만
check('dbsym', () => DBS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('dbx', () => bkdiff(DBS().filter(t => !t.x).map(t => t.en), DB_NOX));
check('dbm', () => DBS().filter(t => { const p = typeof t.v === 'string' && t.v.startsWith('u-db-') && g.D[t.v]; return p && !!p.m !== WA(p.h); }).map(t => t.en).join(', '));    // 재생 버튼(m)과 움직임(A)은 함께 있다
check('dbou', () => DBS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const DB_WRONG = {'Column Alias': ['Alias'], 'Cascade Delete': ['Cascade'], 'Isolation Level': ['Test Isolation'], 'Optimistic Locking': ['Optimistic UI', 'Optimistic Update'],
  'Autocommit': ['Commit'], 'Check Constraint': ['Constraint'], 'Database Client': ['Client']};    // 이름만 비슷한 다른 뜻
check('dbwrong', () => Object.entries(DB_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'db' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
const DB_FACT = [['Column Alias', '이름이 없는 열'], ['NOT NULL', '빈 칸 대신 기본값'], ['Check Constraint', '화면에서 하는 검증']];    // 검토 B: 사실과 다르거나 이어진 카드와 어긋난 말
check('dbfact', () => [...DB_FACT.filter(([en, w]) => (g.find(en)?.x || '').includes(w)).map(([en]) => en), ...(g.D['u-db-subquery'].h.split('users 테이블</').length > 2 ? ['Subquery 결과 표 이름'] : [])].join(', '));
const DB_FIGFACT = [['u-db-transaction', 'h', '더하기<b'], ['u-db-join', 'cap', 'user_id가 같은 줄끼리'], ['u-db-replication', 'cap', '승격해 이어받아요'], ['u-db-soft-delete', 'h', "deleted_at = '11-03'"]];    // 검토 C: 붙어 읽히는 글·조건과 어긋난 말·저절로 승격·연도 없는 날짜
check('dbfigfact', () => DB_FIGFACT.filter(([k, f, w]) => (g.D[k]?.[f] || '').includes(w)).map(([k]) => k).join(', '));
check('dbtext', () => DBS().filter(t => WSYM(t.d + (t.x || '')) || !/줘$/.test(t.p)).map(t => t.en).join(', '));    // d·x에 기호 없음, p는 ~줘
check('dbxn', () => DBS().filter(t => { const n = (t.x || '').match(/[.?!](?=\s|$)/g)?.length || 0; return t.x && (n < 2 || n > 3); }).map(t => t.en).join(', '));    // x는 2~3문장
const DB_XHAS = {'Isolation Level': ['READ COMMITTED'], 'Dirty Read': ['PostgreSQL'], 'Deadlock': ['deadlock detected'], 'Pessimistic Locking': ['SELECT'],
  'Too Many Connections': ['too many clients already', 'Too many connections'], 'Query Timeout': ['statement timeout'], 'Composite Index': ['왼쪽'],
  'Autocommit': ['BEGIN'], 'Optimistic Locking': ['version'],
  'NULL': ['IS NULL'], 'LIMIT': ['ORDER BY'], 'UPDATE': ['WHERE'], 'DELETE': ['WHERE'], 'Foreign Key': ['NO ACTION'], 'Index': ['쓰기'], 'Primary Key': ['NULL'], 'Soft Delete': ['WHERE'], 'Sharding': ['Replication']};    // x에 꼭 있어야 할 말(Review Focus 3·4). Task 2가 옛 카드를 더한다
check('dbxhas', () => Object.entries(DB_XHAS).filter(([en, w]) => { const t = g.find(en); return !t || !w.every(s => (t.x || '').includes(s)); }).map(([en]) => en).join(', '));
const DB_SECRET = s => /\b01\d-\d{3,4}-\d{4}\b/.test(s) || /:\/\/[^:\s/]+:(?!\*{4}@)[^@\s]+@/.test(s);    // 전화번호 전체·가리지 않은 접속 비밀번호
check('dbsafe', () => [...['010-1234-5678', 'postgres://app:pw1@db'].filter(x => !DB_SECRET(x)).map(x => '못 잡음 ' + x), ...(DB_SECRET('postgres://app:****@db') || DB_SECRET('010-…') ? ['오탐'] : []),
  ...DBS().filter(t => { const p = typeof t.v === 'string' && g.D[t.v]; return p && DB_SECRET(p.h.replace(/<[^>]+>/g, ' ') + ' ' + (p.cap || '')); }).map(t => t.en)].join(', '));
check('dbshare', () => ['stagger', 'chip', 'spring', 'rotate', 'progress', 'shake'].filter(k => !g.D[k]).join(', '));    // 옛 db 카드가 쓰던 공유 그림 키는 남긴다
check('dbrevd', () => [...(['Atomicity', 'Consistency', 'Isolation', 'Durability'].every(w => (g.find('ACID')?.d || '').includes(w)) ? [] : ['ACID d']),
  ...((g.find('Connection String')?.x || '').includes('PostgreSQL 주소 형식은') ? [] : ['Connection String x'])].join(', '));    // 검토 D: ACID는 영어 앞 글자, libpq는 키=값 형식도 받음
check('dbreve', () => [['Hard Delete', 'COMMIT'], ['ERD', '1:N'], ['Timestamp', 'UTC로 바꿔 저장']].filter(([en, w]) => !(g.find(en)?.x || '').includes(w)).map(([en]) => en + ' x').join(', '));    // 검토 E: ROLLBACK 가능 시점, 그림의 1:N 표시, timestamptz는 시간대가 아니라 UTC 시각을 저장
check('falsy', () => { const t = g.find('Truthy·Falsy'), h = g.D['u-truthy-falsy'].h;    // MDN Glossary/Falsy 목록과 맞춘다
  return ['-0', '0n'].filter(v => !t.x.includes(v + ',') || !h.includes(`<code>${v}</code>`)).join(', '); });
check('cmpc', () => /\.cmp\.mk-cmpc\{grid-template-columns:minmax\(0,1fr\)\}/.test(html) && /\.mk-cmpc code\{font:12px\/1\.6 var\(--mono\)\}/.test(html) ? '' : '비교 그림 코드가 16px·두 칸이라 넘쳐요');    // BCMP는 위아래로, 코드 칸 글꼴로
check('bfw', () => /<span>요청 오면/.test(g.D['u-framework'].h) ? '콘솔에 안 찍히는 설명이 실제 출력처럼 보여요' : /object Object/.test(g.D['u-framework'].h) ? '흐린 줄 요약이 깨져요' : '');    // 설명 줄은 흐린 글자(mk-cdx)로
check('berr', () => ['Recursion', 'Constant'].filter(en => !g.find(en).x.includes('Chrome·Node')).join(', '));    // 오류 문구는 엔진마다 달라 V8 문구임을 밝힌다(MDN Errors)
check('bel', () => g.D['u-event-loop'].h.includes('타이머 = 콜백 기다림') ? '' : 'setTimeout 줄에서 콜백이 바로 대기열에 들어간 것처럼 보여요');    // 타이머가 끝난 뒤 대기열에 들어간다(MDN Event loop)
check('fcode', () => /\.mk-f>code\{white-space:pre\}/.test(html) ? '' : '줄 앞 공백이 사라져요');    // bcode 들여쓰기
check('cdframe', () => { const P = 10 * +html.match(/\.mk-cds\.A\{[^}]*animation-delay:-([\d.]+)s/)[1], mr = html.match(/\.mk-mrs\.A\{[^}]*animation-delay:-([\d.]+)s/);    // 코드 칸·메모리 그림의 멈춘 장면은 마지막 단계만
  const z = [1, 2, 3, 4, 5, 6, 7, 8].filter(k => { const m = html.match(new RegExp(`@keyframes mk-cdz${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%,100%\\{opacity:1\\}`)); return !m || +m[1] > P; }).map(k => 'z' + k);
  const y = [1, 2, 3, 4, 5, 6, 7].filter(k => { const m = html.match(new RegExp(`@keyframes mk-cdy${k}\\{0%,[\\d.]+%\\{opacity:0\\}[\\d.]+%,[\\d.]+%\\{opacity:1\\}([\\d.]+)%,100%\\{opacity:0\\}`)); return !m || +m[1] > P; }).map(k => 'y' + k);
  const ln = [1, 2, 3, 4, 5, 6, 7, 8].flatMap(k => ['y', 'z'].filter(t => !(t === 'y' && k === 8) && !html.includes(`.mk-cd${t}${k}{animation-name:mk-cd${t}${k}}`)).map(t => 'link ' + t + k));    // 연결 규칙이 빠지면 그 판은 늘 빈칸
  const at = [1, 2, 3, 4, 5, 6, 7, 8].flatMap(k => ['y', 'z'].filter(t => { const m = html.match(new RegExp(`@keyframes mk-cd${t}${k}\\{0%,[\\d.]+%\\{opacity:0\\}([\\d.]+)%`)); return m ? +m[1] !== 10 * k : !(t === 'y' && k === 8); }).map(t => 'at ' + t + k));    // 단계 k는 10k%에 나타난다
  const dw = html.match(/\.mk-dtw\.A\{[^}]*animation-delay:-([\d.]+)s/);    // 전파 경로 칩도 마지막 단계에서 멈춘다
  const sd = html.match(/\.mk-sdm\.A\{[^}]*animation-delay:-([\d.]+)s/);    // 순서도 행도 마지막 단계에서 멈춘다
  const dq = html.match(/\.mk-dqm\.A\{[^}]*animation-delay:-([\d.]+)s/);    // 쿼리 결과 행도 마지막 단계에서 멈춘다
  const sv = html.match(/\.mk-svd\.A\{[^}]*animation-delay:-([\d.]+)s/);    // 서버 배치도의 요청 점은 멈춘 장면 전에 사라진다
  const srv = [1, 2, 3, 4].flatMap(k => { const m = html.match(new RegExp(`@keyframes mk-srv${k}\\{((?:[^{}]*\\{[^}]*\\})*)\\}`)), e = m && m[1].match(/([\d.]+)%,100%\{opacity:0/);
    if (!html.includes(`.mk-srv${k}{animation-name:mk-srv${k}}`)) return ['link srv' + k]; const a = m && m[1].match(/^0%,[\d.]+%\{opacity:0;[^}]*\}([\d.]+)%\{opacity:1/);
    if (!a || +a[1] !== 10 * k) return ['at srv' + k];
    if (!m || !e || +e[1] > P) return ['srv' + k]; return [...m[1].matchAll(/([a-z-]+):/g)].some(x => !['opacity', 'transform'].includes(x[1])) ? ['srv' + k + ' 속성'] : []; });
  return [...z, ...y, ...ln, ...at, ...(!mr || 10 * +mr[1] !== P ? ['mrs'] : []), ...(!dw || 10 * +dw[1] !== P ? ['dtw'] : []), ...(!sd || 10 * +sd[1] !== P ? ['sdm'] : []), ...(!dq || 10 * +dq[1] !== P ? ['dqm'] : []), ...(!sv || 10 * +sv[1] !== P ? ['svd'] : []), ...srv].join(', '); });
check('doccount', () => { const rd = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8'), pr = rd('PRODUCT.md'), pn = rd('docs/PLAN.md'), num = (s, re) => +(s.match(re) || [])[1];    // 문서에 적은 개수가 실제와 같아야 한다
  return [['카테고리', num(pr, /카테고리 (\d+)개/), g.CATS.length], ['용어', num(pr, /용어 (\d+)개/), g.TERMS.length], ['증상', num(pr, /증상 색인 (\d+)개/), g.SYMPTOMS.length],
    ['오류 칩', num(pn, /"오류·안 됨" 칩 (\d+)개/), g.SYMPTOMS.filter(s => s.g === '오류·안 됨').length]].filter(([, a, b]) => a !== b).map(([k, a, b]) => `${k} ${a} ≠ ${b}`).join(', '); });
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

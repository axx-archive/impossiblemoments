#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'downloads');
const BASE_URL = process.env.IM_PUBLIC_BASE_URL || 'https://onenight.vercel.app';

function requireDependency(name) {
  try {
    return require(name);
  } catch (err) {
    const bundled = path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules', name);
    return require(bundled);
  }
}

const { chromium } = requireDependency('playwright');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const MODES = [
  {
    name: 'desktop',
    width: 1440,
    height: 810,
    output: 'impossible-moments-desktop.pdf',
  },
  {
    name: 'mobile',
    width: 430,
    height: 1500,
    output: 'impossible-moments-mobile.pdf',
    isMobile: true,
  },
];

function serve(root) {
  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, 'http://127.0.0.1');
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';

    const absolute = path.normalize(path.join(root, pathname));
    if (!absolute.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(absolute, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(absolute).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, origin: `http://127.0.0.1:${address.port}` });
    });
  });
}

function chromeExecutable() {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return fs.existsSync(macChrome) ? macChrome : undefined;
}

function exportCss(mode) {
  const desktop = mode.name === 'desktop';
  return `
@page { size: ${mode.width}px ${mode.height}px; margin: 0; }
html, body {
  width: ${mode.width}px !important;
  margin: 0 !important;
  background: #0A0908 !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
body.im-export-mode {
  overflow: visible !important;
}
body.im-export-mode #im-site-gate,
body.im-export-mode header,
body.im-export-mode footer,
body.im-export-mode #im-pdf-chooser,
body.im-export-mode #im-land-photo-viewer,
body.im-export-mode .im-land-photo-mobile,
body.im-export-mode .im-hero-mobile-pdf,
body.im-export-mode .im-grain,
body.im-export-mode .im-vignette,
body.im-export-mode .me-progress,
body.im-export-mode .me-nav-toggle,
body.im-export-mode .me-overlay {
  display: none !important;
}
body.im-export-mode #dc-root,
body.im-export-mode #dc-root > .sc-host,
body.im-export-mode #dc-root > .sc-host > div {
  width: ${mode.width}px !important;
  height: auto !important;
  overflow: visible !important;
  background: #0A0908 !important;
}
body.im-export-mode section[data-screen-label] {
  width: ${mode.width}px !important;
  height: ${mode.height}px !important;
  min-height: ${mode.height}px !important;
  max-height: ${mode.height}px !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  page-break-after: always;
  break-after: page;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  padding: ${desktop ? '64px 72px' : '56px 20px'} !important;
}
body.im-export-mode section[data-screen-label]:last-of-type {
  page-break-after: auto;
  break-after: auto;
}
body.im-export-mode section[data-screen-label] *,
body.im-export-mode section[data-screen-label] *::before,
body.im-export-mode section[data-screen-label] *::after {
  animation: none !important;
  transition-duration: 0s !important;
  caret-color: transparent !important;
}
body.im-export-mode [data-reveal],
body.im-export-mode .me-stagger {
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
}
body.im-export-mode .im-marker {
  flex-wrap: nowrap !important;
  justify-content: center !important;
}
body.im-export-mode .im-marker__text {
  white-space: normal !important;
}
body.im-export-mode .im-marker__tick {
  display: none !important;
}
body.im-export-mode video {
  display: none !important;
}
body.im-export-mode img[data-export-video-poster="true"] {
  display: block !important;
}
body.im-export-desktop [style*="margin:52px auto 0"] { margin-top: 34px !important; }
body.im-export-desktop [style*="margin:48px auto 0"] { margin-top: 28px !important; }
body.im-export-desktop [style*="margin:42px 0 0"] { margin-top: 26px !important; }
body.im-export-desktop [style*="padding:2.8rem"],
body.im-export-desktop [style*="padding:2.6rem"],
body.im-export-desktop [style*="padding:2.4rem"],
body.im-export-desktop [style*="padding:2.2rem"] { padding: 1.7rem !important; }
body.im-export-desktop #format [style*="height:340px"] { height: 146px !important; }
body.im-export-desktop #format {
  padding-top: 44px !important;
  padding-bottom: 44px !important;
  justify-content: flex-start !important;
}
body.im-export-desktop #format h2 {
  font-size: 2.62rem !important;
  line-height: 1.02 !important;
  margin-top: 6px !important;
}
body.im-export-desktop #format > div[style*="display:grid"] {
  margin-top: 18px !important;
}
body.im-export-desktop #format [style*="padding:2.4rem 2.6rem 2.8rem"] {
  padding: 1.05rem 1.3rem 1.15rem !important;
}
body.im-export-desktop #format [style*="font-size:5rem"] { font-size: 2.7rem !important; }
body.im-export-desktop #format [style*="font-size:2.6rem"] { font-size: 1.75rem !important; }
body.im-export-desktop #format p {
  font-size: 0.84rem !important;
  line-height: 1.34 !important;
}
body.im-export-desktop #format [style*="padding-top:20px"] {
  padding-top: 9px !important;
}
body.im-export-desktop #format button {
  display: none !important;
}
body.im-export-desktop #location .im-frame { max-width: 760px !important; }
body.im-export-desktop #location img[src="/land-location-night.png"] {
  height: 300px !important;
  object-fit: cover !important;
  object-position: center !important;
}
body.im-export-desktop #conviction [style*="margin:36px auto 0"] { margin-top: 24px !important; }
body.im-export-desktop #conviction {
  padding: 34px 72px !important;
  justify-content: flex-start !important;
}
body.im-export-desktop #conviction h2 {
  font-size: 2.7rem !important;
  line-height: 1.02 !important;
  margin-top: 12px !important;
}
body.im-export-desktop #conviction [style*="padding:2rem 2.2rem"] {
  padding: 1rem 1.35rem !important;
}
body.im-export-desktop #conviction [style*="font-size:2.4rem"] {
  font-size: 1.62rem !important;
}
body.im-export-desktop #conviction [style*="margin:36px auto 0"],
body.im-export-desktop #conviction [style*="margin:30px auto 0"] {
  margin-top: 14px !important;
}
body.im-export-desktop #conviction [style*="padding:2.4rem"] {
  padding: 1rem !important;
}
body.im-export-desktop #conviction p[style*="font-size:clamp(1.35rem"] {
  font-size: 1.22rem !important;
  line-height: 1.26 !important;
}
body.im-export-desktop #conviction p[style*="font-size:clamp(1.12rem"] {
  font-size: 0.98rem !important;
  line-height: 1.4 !important;
}
body.im-export-desktop #conviction [style*="margin-top:20px"] {
  margin-top: 10px !important;
}
body.im-export-desktop #model h2 {
  font-size: 2.68rem !important;
  line-height: 1.08 !important;
}
body.im-export-desktop #model [style*="margin:52px auto 0"] {
  margin-top: 28px !important;
}
body.im-export-desktop #model [style*="padding:16px 0"] {
  padding: 10px 0 !important;
}
body.im-export-desktop #model [style*="padding:14px 0"] {
  padding: 9px 0 !important;
}
body.im-export-desktop #model [style*="font-size:1.85rem"] {
  font-size: 1.52rem !important;
  min-width: 100px !important;
}
body.im-export-desktop #model p[data-reveal] {
  margin-top: 18px !important;
  font-size: 0.82rem !important;
}
body.im-export-desktop #raise [style*="margin:40px auto 0"] { margin-top: 28px !important; }
body.im-export-mobile section[data-screen-label] {
  padding: 54px 20px !important;
}
body.im-export-mobile #top,
body.im-export-mobile section[data-screen-label="Closing"] {
  padding: 88px 22px 58px !important;
}
body.im-export-mobile h2 {
  font-size: 2.22rem !important;
  line-height: 1.08 !important;
  text-wrap: balance !important;
}
body.im-export-mobile #raise h2 {
  font-size: 2.58rem !important;
}
body.im-export-mobile #top .im-neon {
  font-size: 4.8rem !important;
}
body.im-export-mobile #top .im-lumen {
  font-size: 2.72rem !important;
}
body.im-export-mobile [style*="margin:52px auto 0"],
body.im-export-mobile [style*="margin:48px auto 0"],
body.im-export-mobile [style*="margin:42px 0 0"],
body.im-export-mobile [style*="margin:40px auto 0"] {
  margin-top: 22px !important;
}
body.im-export-mobile [style*="grid-template-columns"] {
  grid-template-columns: 1fr !important;
  gap: 8px !important;
}
body.im-export-mobile [style*="padding:2.8rem"],
body.im-export-mobile [style*="padding:2.6rem"],
body.im-export-mobile [style*="padding:2.4rem"],
body.im-export-mobile [style*="padding:2.2rem"] {
  padding: 1rem 1.05rem !important;
}
body.im-export-mobile [style*="font-size:1.08rem"],
body.im-export-mobile [style*="font-size:1.05rem"],
body.im-export-mobile [style*="font-size:1.02rem"] {
  font-size: 0.86rem !important;
  line-height: 1.42 !important;
}
body.im-export-mobile [style*="font-size:1.15rem"],
body.im-export-mobile [style*="font-size:1.12rem"],
body.im-export-mobile [style*="font-size:1.1rem"] {
  font-size: 0.98rem !important;
  line-height: 1.52 !important;
}
body.im-export-mobile #format [style*="height:340px"] {
  height: 98px !important;
  min-height: 98px !important;
  aspect-ratio: auto !important;
}
body.im-export-mobile #format {
  justify-content: flex-start !important;
  padding-top: 42px !important;
  padding-bottom: 42px !important;
}
body.im-export-mobile #format > div[style*="display:grid"] {
  margin-top: 20px !important;
}
body.im-export-mobile #format div[style*="background-image"] {
  height: 126px !important;
  min-height: 126px !important;
  aspect-ratio: auto !important;
}
body.im-export-mobile #format [style*="font-size:5rem"] {
  font-size: 2.25rem !important;
}
body.im-export-mobile #format [style*="font-size:2.6rem"] {
  font-size: 1.65rem !important;
}
body.im-export-mobile #format p {
  font-size: 0.82rem !important;
  line-height: 1.36 !important;
}
body.im-export-mobile #format button[onclick],
body.im-export-mobile #format button[onClick],
body.im-export-mobile #format button {
  display: none !important;
}
body.im-export-mobile #format [style*="padding-top:20px"] {
  padding-top: 10px !important;
}
body.im-export-mobile #location {
  justify-content: flex-start !important;
  padding-top: 44px !important;
}
body.im-export-mobile #location .im-frame {
  display: block !important;
  margin-top: 24px !important;
  padding: 8px !important;
}
body.im-export-mobile #location img[src="/land-location-night.png"] {
  height: 210px !important;
  object-fit: cover !important;
  object-position: center !important;
}
body.im-export-mobile #location p[style*="font-display"] {
  margin-top: 18px !important;
}
body.im-export-mobile #model [style*="font-size:1.85rem"] {
  font-size: 1.28rem !important;
  min-width: 86px !important;
}
body.im-export-mobile #model [style*="padding:14px 0"] {
  padding: 8px 0 !important;
}
body.im-export-mobile #leadership [style*="gap:14px"] {
  gap: 7px !important;
}
body.im-export-mobile #leadership [style*="width:54px"] {
  width: 42px !important;
  height: 42px !important;
}
body.im-export-mobile #conviction [style*="margin:36px auto 0"] {
  margin-top: 20px !important;
}
body.im-export-mobile #raise [style*="font-size:0.82rem"] {
  font-size: 0.72rem !important;
}
`;
}

async function preparePage(page, mode, localOrigin) {
  await page.addInitScript(() => {
    try { sessionStorage.setItem('im_site_authed', '1'); } catch (err) {}
  });
  await page.goto(`${localOrigin}/?pdf=${mode.name}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => {
    return !document.querySelector('x-dc') &&
      document.querySelectorAll('section[data-screen-label]').length >= 10;
  }, null, { timeout: 15000 });
  await page.emulateMedia({ media: 'screen' });
  await page.addStyleTag({ content: exportCss(mode) });
  await page.evaluate(({ modeName, baseUrl }) => {
    document.body.classList.add('im-export-mode', `im-export-${modeName}`);
    document.documentElement.classList.add('im-export-root');

    document.querySelectorAll('a[href="/dataroom/"], a[href="/dataroom"]').forEach((anchor) => {
      anchor.href = `${baseUrl.replace(/\/$/, '')}/dataroom/`;
    });

    document.querySelectorAll('video').forEach((video) => {
      const poster = video.getAttribute('poster');
      if (!poster) return;
      const img = document.createElement('img');
      img.src = poster;
      img.alt = '';
      img.setAttribute('data-export-video-poster', 'true');
      img.setAttribute('style', video.getAttribute('style') || '');
      img.style.animation = 'none';
      img.style.transition = 'none';
      img.style.objectFit = video.style.objectFit || 'cover';
      if (video.style.objectPosition) img.style.objectPosition = video.style.objectPosition;
      video.replaceWith(img);
    });

    document.querySelectorAll('[data-reveal], .me-stagger').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  }, { modeName: mode.name, baseUrl: BASE_URL });

  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete), null, { timeout: 15000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

async function exportMode(browser, mode, localOrigin) {
  const page = await browser.newPage({
    viewport: { width: mode.width, height: mode.height },
    deviceScaleFactor: 1,
    isMobile: !!mode.isMobile,
  });
  await preparePage(page, mode, localOrigin);
  const outPath = path.join(OUT_DIR, mode.output);
  await page.pdf({
    path: outPath,
    width: `${mode.width}px`,
    height: `${mode.height}px`,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    printBackground: true,
    preferCSSPageSize: true,
  });
  await page.close();
  return outPath;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const { server, origin } = await serve(ROOT);
  let browser;
  try {
    const launchOptions = { headless: true };
    const executablePath = chromeExecutable();
    if (executablePath) launchOptions.executablePath = executablePath;
    browser = await chromium.launch(launchOptions);
    for (const mode of MODES) {
      const outPath = await exportMode(browser, mode, origin);
      console.log(`Exported ${mode.name}: ${path.relative(ROOT, outPath)}`);
    }
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

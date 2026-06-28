#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'downloads');
const BASE_URL = process.env.IM_PUBLIC_BASE_URL || 'https://impossiblemoments.com';
const DATAROOM_URL = process.env.IM_DATAROOM_URL || 'https://impossiblemoments.com/dataroom/';
const PDF_TARGET_BYTES = Number(process.env.IM_PDF_TARGET_BYTES || 10 * 1024 * 1024);
const PDF_QUALITY_STEPS = (process.env.IM_PDF_JPEG_QUALITIES || '84,78,72,66,60')
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value > 0 && value <= 100);

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
  --im-neon-text: none !important;
  --im-neon-text-soft: none !important;
  --im-lumen-text: none !important;
  --im-glow-gilt-sm: none !important;
  --im-glow-gilt-md: none !important;
  --im-glow-gilt-lg: none !important;
  --im-glow-lumen-sm: none !important;
  --im-glow-lumen-md: none !important;
}
body.im-export-mode .im-stat__num,
body.im-export-mode .im-display-number,
body.im-export-mode .im-raise-figure,
body.im-export-mode .im-number-strong,
body.im-export-mode .im-number-gilt,
body.im-export-mode #conviction h2,
body.im-export-mode #conviction [style*="font-size:2.4rem"],
body.im-export-mode #model [style*="font-size:1.85rem"],
body.im-export-mode #raise h2 {
  font-weight: 700 !important;
  font-style: normal !important;
  font-variant-numeric: lining-nums tabular-nums !important;
  text-shadow: none !important;
}
body.im-export-mode .im-raise-figure {
  font-family: var(--im-font-sans) !important;
  -webkit-text-stroke: 0.28px currentColor !important;
}
body.im-export-mode #im-site-gate,
body.im-export-mode header,
body.im-export-mode footer,
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
  text-shadow: none !important;
  box-shadow: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
  mix-blend-mode: normal !important;
}
body.im-export-mode [data-hero-reveal],
body.im-export-mode [data-reveal],
body.im-export-mode [data-reveal-group] > *,
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
body.im-export-mode .im-neon,
body.im-export-mode .im-lumen {
  text-shadow: none !important;
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
body.im-export-desktop #location .im-frame {
  max-width: 760px !important;
  margin-left: auto !important;
  margin-right: auto !important;
  transform: translateX(-5%) !important;
}
body.im-export-desktop #location .im-frame + div {
  transform: translateX(0) !important;
}
body.im-export-desktop #location img[src="/land-location-night.png"] {
  width: 100% !important;
  max-width: 100% !important;
  height: 300px !important;
  object-fit: cover !important;
  object-position: center !important;
  transform: none !important;
}
body.im-export-desktop #conviction [style*="margin:36px auto 0"] { margin-top: 24px !important; }
body.im-export-desktop #conviction {
  padding: 96px 72px 22px !important;
  justify-content: flex-start !important;
}
body.im-export-desktop #conviction h2 {
  font-size: 2.48rem !important;
  line-height: 1.02 !important;
  margin-top: 10px !important;
}
body.im-export-desktop #conviction [style*="margin:46px auto 0"] {
  margin-top: 24px !important;
}
body.im-export-desktop #conviction [style*="padding:2rem 2.2rem"] {
  padding: 0.92rem 1.2rem !important;
}
body.im-export-desktop #conviction [style*="font-size:2.4rem"] {
  font-size: 1.5rem !important;
}
body.im-export-desktop #conviction [style*="margin:36px auto 0"],
body.im-export-desktop #conviction [style*="margin:30px auto 0"] {
  margin-top: 12px !important;
}
body.im-export-desktop #conviction [style*="padding:2.4rem"] {
  padding: 0.86rem 1rem !important;
}
body.im-export-desktop #conviction p[style*="font-size:clamp(1.35rem"] {
  font-size: 1.06rem !important;
  line-height: 1.22 !important;
}
body.im-export-desktop #conviction p[style*="font-size:clamp(1.12rem"] {
  font-size: 0.9rem !important;
  line-height: 1.3 !important;
}
body.im-export-desktop #conviction [style*="margin-top:20px"] {
  margin-top: 8px !important;
}
body.im-export-desktop #conviction > div[style*="max-width:760px"][style*="margin:36px auto 0"] {
  max-width: 1120px !important;
  margin-top: 16px !important;
}
body.im-export-desktop #conviction > div[style*="max-width:760px"][style*="margin:36px auto 0"] p {
  font-size: 0.9rem !important;
  line-height: 1.28 !important;
}
body.im-export-desktop #conviction > div:nth-of-type(6) {
  max-width: 1120px !important;
  margin: 12px auto 0 !important;
}
body.im-export-desktop #conviction > div:nth-of-type(6) p {
  font-size: 0.9rem !important;
  line-height: 1.28 !important;
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
  await page.evaluate(({ modeName, dataroomUrl }) => {
    document.body.classList.add('im-export-mode', `im-export-${modeName}`);
    document.documentElement.classList.add('im-export-root');

    document.querySelectorAll('a[href="/dataroom/"], a[href="/dataroom"]').forEach((anchor) => {
      anchor.href = dataroomUrl;
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

    document.querySelectorAll('[data-hero-reveal], [data-reveal], [data-reveal-group] > *, .me-stagger').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  }, { modeName: mode.name, dataroomUrl: DATAROOM_URL });

  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete), null, { timeout: 15000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
}

function pdfNum(value) {
  return Number(value.toFixed(3)).toString();
}

function pdfString(value) {
  return String(value).replace(/[\\()]/g, '\\$&');
}

function buildSlidePdf({ mode, images, sectionLinks }) {
  const pageWidth = mode.width * 0.75;
  const pageHeight = mode.height * 0.75;
  const objects = [null, null, null];
  const catalogId = 1;
  const pagesId = 2;
  const pageIds = [];

  function setObject(id, body) {
    objects[id] = Buffer.isBuffer(body) ? body : Buffer.from(body);
  }

  function addObject(body) {
    const id = objects.length;
    setObject(id, body);
    return id;
  }

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const imageId = addObject(Buffer.concat([
      Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${mode.width} /Height ${mode.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`),
      image,
      Buffer.from('\nendstream'),
    ]));

    const content = Buffer.from(`q\n${pdfNum(pageWidth)} 0 0 ${pdfNum(pageHeight)} 0 0 cm\n/Im0 Do\nQ\n`);
    const contentId = addObject(Buffer.concat([
      Buffer.from(`<< /Length ${content.length} >>\nstream\n`),
      content,
      Buffer.from('endstream'),
    ]));

    const annotations = [];
    for (const link of sectionLinks[i] || []) {
      const left = Math.max(0, Math.min(pageWidth, link.rect.left * 0.75));
      const right = Math.max(0, Math.min(pageWidth, link.rect.right * 0.75));
      const top = Math.max(0, Math.min(pageHeight, link.rect.top * 0.75));
      const bottom = Math.max(0, Math.min(pageHeight, link.rect.bottom * 0.75));
      if (right - left < 1 || bottom - top < 1) continue;
      const rect = [
        pdfNum(left),
        pdfNum(pageHeight - bottom),
        pdfNum(right),
        pdfNum(pageHeight - top),
      ].join(' ');
      annotations.push(addObject(`<< /Type /Annot /Subtype /Link /Rect [${rect}] /Border [0 0 0] /A << /S /URI /URI (${pdfString(link.href)}) >> >>`));
    }

    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pdfNum(pageWidth)} ${pdfNum(pageHeight)}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R${annotations.length ? ` /Annots [${annotations.map((id) => `${id} 0 R`).join(' ')}]` : ''} >>`);
    pageIds.push(pageId);
  }

  setObject(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  setObject(pagesId, `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);

  const chunks = [Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary')];
  const offsets = [0];
  for (let id = 1; id < objects.length; id++) {
    offsets[id] = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    chunks.push(Buffer.from(`${id} 0 obj\n`));
    chunks.push(objects[id]);
    chunks.push(Buffer.from('\nendobj\n'));
  }
  const xrefOffset = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const xref = [
    `xref\n0 ${objects.length}`,
    '0000000000 65535 f ',
    ...offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `),
    `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>`,
    `startxref\n${xrefOffset}`,
    '%%EOF\n',
  ].join('\n');
  chunks.push(Buffer.from(xref));
  return Buffer.concat(chunks);
}

async function collectSectionLinks(page) {
  return page.evaluate(({ dataroomUrl }) => {
    return Array.from(document.querySelectorAll('section[data-screen-label]')).map((section) => {
      const sectionRect = section.getBoundingClientRect();
      return Array.from(section.querySelectorAll('a[href]'))
        .map((anchor) => {
          const href = anchor.href;
          if (!href || href !== dataroomUrl) return null;
          const rect = anchor.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return null;
          return {
            href,
            rect: {
              left: rect.left - sectionRect.left,
              top: rect.top - sectionRect.top,
              right: rect.right - sectionRect.left,
              bottom: rect.bottom - sectionRect.top,
            },
          };
        })
        .filter(Boolean);
    });
  }, { dataroomUrl: DATAROOM_URL });
}

async function captureSlideImages(page, quality) {
  const sections = await page.$$('section[data-screen-label]');
  const images = [];
  for (const section of sections) {
    images.push(await section.screenshot({
      type: 'jpeg',
      quality,
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
    }));
  }
  return images;
}

async function exportMode(browser, mode, localOrigin) {
  const page = await browser.newPage({
    viewport: { width: mode.width, height: mode.height },
    deviceScaleFactor: 1,
    isMobile: !!mode.isMobile,
  });
  await preparePage(page, mode, localOrigin);
  const outPath = path.join(OUT_DIR, mode.output);
  const sectionLinks = await collectSectionLinks(page);
  let exported = null;
  for (const quality of PDF_QUALITY_STEPS) {
    const images = await captureSlideImages(page, quality);
    const pdf = buildSlidePdf({ mode, images, sectionLinks });
    exported = { quality, pdf };
    if (pdf.length <= PDF_TARGET_BYTES) break;
  }
  fs.writeFileSync(outPath, exported.pdf);
  await page.close();
  return { outPath, quality: exported.quality, bytes: exported.pdf.length };
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
      const result = await exportMode(browser, mode, origin);
      console.log(`Exported ${mode.name}: ${path.relative(ROOT, result.outPath)} (${(result.bytes / 1024 / 1024).toFixed(1)} MB, JPEG q${result.quality})`);
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

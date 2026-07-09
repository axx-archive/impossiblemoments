#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'downloads');
const PDF_TARGET_BYTES = Number(process.env.IM_PDF_TARGET_BYTES || 10 * 1024 * 1024);
const DEBUG_SLIDES = process.env.IM_DEBUG_SLIDES === '1';
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
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

const MODE = {
  name: 'desktop',
  width: 1440,
  height: 810,
  pixelRatio: 2,
  output: 'impossible-fights-desktop.pdf',
};

const SLIDE_SELECTOR = '#top, section.imfi-section';

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
      resolve({ server, origin: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

function chromeExecutable() {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  return fs.existsSync(macChrome) ? macChrome : undefined;
}

function exportCss(mode) {
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
}
body.im-export-mode #im-site-gate,
body.im-export-mode #imfi-score-toggle,
body.im-export-mode #imfi-pdf-button,
body.im-export-mode .plat-triptych,
body.im-export-mode .im-grain,
body.im-export-mode .im-vignette,
body.im-export-mode .imfi-grain,
body.im-export-mode .imfi-vignette {
  display: none !important;
}
body.im-export-mode #top,
body.im-export-mode section.imfi-section {
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
  padding: 56px 72px !important;
}
body.im-export-mode section.imfi-section:last-of-type {
  page-break-after: auto;
  break-after: auto;
}
body.im-export-mode #top *,
body.im-export-mode section.imfi-section *,
body.im-export-mode #top *::before,
body.im-export-mode section.imfi-section *::before,
body.im-export-mode #top *::after,
body.im-export-mode section.imfi-section *::after {
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
body.im-export-mode [data-reveal-group] > * {
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
}
body.im-export-mode video { display: none !important; }
body.im-export-mode img[data-export-video-poster="true"] { display: block !important; }
body.im-export-mode .imfi-section-head { margin-bottom: 0 !important; }
body.im-export-mode .imfi-h2 { font-size: 2.6rem !important; line-height: 1.05 !important; margin-top: 10px !important; }
body.im-export-mode .imfi-deck { margin-top: 12px !important; }
body.im-export-mode .imfi-body { font-size: 1.02rem !important; line-height: 1.55 !important; margin-top: 14px !important; }

/* Restore full width under the export flex layout too */
body.im-export-mode section.imfi-section > * { width: 100%; box-sizing: border-box; }

/* Slate: carousel flattened to three stills side by side */
body.im-export-mode #slate { padding: 36px 64px !important; }
body.im-export-mode #slate .imfi-h2 { font-size: 2.2rem !important; }
body.im-export-mode #slate .imfi-carousel { max-width: 100% !important; margin-top: 28px !important; }
body.im-export-mode #slate .imfi-carousel__track { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 12px !important; overflow: visible !important; }
body.im-export-mode #slate .imfi-carousel__slide { flex: none !important; width: auto !important; }
body.im-export-mode #slate figure { margin: 0 !important; }
body.im-export-mode #slate .imfi-still__img { width: 100% !important; height: auto !important; object-fit: cover !important; }
body.im-export-mode #slate .imfi-still__credit { padding: 10px 10px 6px !important; }
body.im-export-mode #slate .imfi-still__no { font-size: 0.55rem !important; }
body.im-export-mode #slate .imfi-still__name { font-size: 0.92rem !important; }
body.im-export-mode #slate .imfi-carousel__arrow,
body.im-export-mode #slate .imfi-carousel__dots { display: none !important; }

/* Model: the flywheel scaled to fit a slide */
body.im-export-mode #model { padding: 40px 72px !important; }
body.im-export-mode #model .imfi-flywheel { width: 470px !important; margin-top: 40px !important; }
body.im-export-mode #model .imfi-flywheel__hub { width: 168px !important; padding: 14px !important; gap: 5px !important; }
body.im-export-mode #model .imfi-flywheel__hub-name { font-size: 1.15rem !important; }
body.im-export-mode #model .imfi-flywheel__hub-sub { font-size: 0.7rem !important; }
body.im-export-mode #model .imfi-flywheel__node { min-width: 84px !important; padding: 8px 10px !important; gap: 3px !important; }
body.im-export-mode #model .imfi-flywheel__no { font-size: 0.5rem !important; }
body.im-export-mode #model .imfi-flywheel__name { font-size: 0.58rem !important; }

  `;
}

async function preparePage(page, mode, localOrigin) {
  await page.addInitScript(() => {
    try { sessionStorage.setItem('im_fights_authed', '1'); } catch (err) {}
    try { sessionStorage.setItem('im_fights_score', 'off'); } catch (err) {}
  });
  await page.goto(`${localOrigin}/fights/?pdf=${mode.name}`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'screen' });
  await page.addStyleTag({ content: exportCss(mode) });
  await page.evaluate(() => {
    document.body.classList.add('im-export-mode', 'im-export-desktop');
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
      if (!img.complete && img.src) { const s = img.src; img.src = ''; img.src = s; }
    });
    document.querySelectorAll('video').forEach((video) => {
      const poster = video.getAttribute('poster');
      if (!poster) { video.remove(); return; }
      const img = document.createElement('img');
      img.src = poster;
      img.alt = '';
      img.setAttribute('data-export-video-poster', 'true');
      img.className = video.className;
      img.setAttribute('style', video.getAttribute('style') || '');
      img.style.animation = 'none';
      img.style.transition = 'none';
      if (!img.style.objectFit) img.style.objectFit = 'cover';
      video.replaceWith(img);
    });
    document.querySelectorAll('[data-hero-reveal], [data-reveal], [data-reveal-group] > *').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  });
  await page.waitForFunction(() => Array.from(document.images).every((img) => img.complete || !img.src), null, { timeout: 30000 });
  await page.evaluate(() => Promise.all(Array.from(document.images).map((img) => img.decode ? img.decode().catch(() => {}) : null)));
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(400);
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
      Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${mode.width * (mode.pixelRatio || 1)} /Height ${mode.height * (mode.pixelRatio || 1)} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`),
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

async function collectSectionLinks(page, selector) {
  return page.evaluate((sel) => {
    return Array.from(document.querySelectorAll(sel)).map((section) => {
      const sectionRect = section.getBoundingClientRect();
      return Array.from(section.querySelectorAll('a[href^="mailto:"]'))
        .map((anchor) => {
          const rect = anchor.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return null;
          return {
            href: anchor.href,
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
  }, selector);
}

async function captureSlideImages(page, selector, quality) {
  const sections = await page.$$(selector);
  const images = [];
  for (const section of sections) {
    images.push(await section.screenshot({
      type: 'jpeg',
      quality,
      animations: 'disabled',
      caret: 'hide',
      scale: 'device',
    }));
  }
  return images;
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
    const page = await browser.newPage({
      viewport: { width: MODE.width, height: MODE.height },
      deviceScaleFactor: MODE.pixelRatio || 1,
    });
    await preparePage(page, MODE, origin);
    const sectionLinks = await collectSectionLinks(page, SLIDE_SELECTOR);
    let exported = null;
    for (const quality of PDF_QUALITY_STEPS) {
      const images = await captureSlideImages(page, SLIDE_SELECTOR, quality);
      if (DEBUG_SLIDES) {
        const dbg = path.join(OUT_DIR, 'fights-slides-debug');
        fs.mkdirSync(dbg, { recursive: true });
        images.forEach((img, i) => fs.writeFileSync(path.join(dbg, `slide-${String(i + 1).padStart(2, '0')}.jpg`), img));
      }
      const pdf = buildSlidePdf({ mode: MODE, images, sectionLinks });
      exported = { quality, pdf };
      if (pdf.length <= PDF_TARGET_BYTES) break;
    }
    const outPath = path.join(OUT_DIR, MODE.output);
    fs.writeFileSync(outPath, exported.pdf);
    console.log(`Exported: ${path.relative(ROOT, outPath)} (${(exported.pdf.length / 1024 / 1024).toFixed(1)} MB, JPEG q${exported.quality}, ${sectionLinks.length} slides)`);
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

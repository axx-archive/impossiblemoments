/* ============================================================================
   IMPOSSIBLE MOMENTS — MOBILE "WOAH" EXPERIENCE LAYER (progressive enhancement)
   ----------------------------------------------------------------------------
   Loaded with `defer` on BOTH the marketing site and the data room.
   - No-ops on desktop (>700px): every motion path is gated on MOBILE.matches.
   - Never hides content and never locks scrolling. Reveals are transform-only,
     with a 6s failsafe + try/catch that force everything visible.
   - On the dc-runtime site it waits for the React-rendered markup to mount
     (MutationObserver for the Closing section) with an 8s failsafe.
   - Honors prefers-reduced-motion (no parallax, no wash; reveals are instant).
   The whole thing is wrapped so a thrown error can never affect the page.
   ============================================================================ */
(function () {
  'use strict';

  var MOBILE, REDUCE;
  try {
    MOBILE = window.matchMedia('(max-width:700px)');
    REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');
  } catch (e) {
    MOBILE = { matches: false, addEventListener: function () {} };
    REDUCE = { matches: false };
  }

  function onMediaChange(mq, fn) {
    try {
      if (mq.addEventListener) mq.addEventListener('change', fn);
      else if (mq.addListener) mq.addListener(fn);
    } catch (e) {}
  }

  try {
    // Data room is a self-contained static page (no dc runtime).
    var isDataroom = document.getElementById('drMain') || document.getElementById('passwordGate');
    if (isDataroom) {
      initDataroom();
      return;
    }
    // Marketing site: wait for the dc-rendered template to mount.
    whenSiteMounted(function () {
      try { initSite(); } catch (e) {}
    });
  } catch (e) {}

  /* --------------------------------------------------------------------------
     MOUNT GATE — fire once the Closing section exists (template rendered),
     else observe the body, with an 8s failsafe so we always run eventually.
     -------------------------------------------------------------------------- */
  function whenSiteMounted(cb) {
    function present() { return !!document.querySelector('section[data-screen-label="Closing"]'); }
    if (present()) { cb(); return; }
    var done = false, obs = null, t = null;
    function fire() {
      if (done) return; done = true;
      try { if (obs) obs.disconnect(); } catch (e) {}
      try { clearTimeout(t); } catch (e) {}
      cb();
    }
    try {
      obs = new MutationObserver(function () { if (present()) fire(); });
      obs.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
    t = setTimeout(fire, 8000);
  }

  /* ==========================================================================
     SITE ENHANCEMENTS
     ========================================================================== */
  function initSite() {
    // FAILSAFE FIRST — register before anything that could throw, and run it
    // regardless of viewport so reveals can never strand content invisible.
    var failsafe = setTimeout(function () {
      try {
        var nodes = document.querySelectorAll('.me-stagger');
        for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('me-in');
      } catch (e) {}
    }, 6000);

    try { buildMobileNav(); } catch (e) {}
    try { initReveals(); } catch (e) {}
    try { initParallax(); } catch (e) {}

    // Re-check on breakpoint change (rotation / resize): nav visibility is
    // CSS-driven; here we just make sure nothing stays stranded if we cross out.
    onMediaChange(MOBILE, function () {
      try {
        if (!MOBILE.matches) {
          var nodes = document.querySelectorAll('.me-stagger');
          for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('me-in');
        }
      } catch (e) {}
    });

    // Belt-and-suspenders: clear failsafe reference is unnecessary (harmless).
    void failsafe;
  }

  function sectionList() {
    return Array.prototype.slice.call(document.querySelectorAll('section[data-screen-label]'));
  }

  // The positioned z-index:0 backdrop layer for a section (duotone on hero,
  // image wrapper elsewhere). Null for the gradient-only sections (model/leadership).
  function backdropLayer(section) {
    return section.querySelector(':scope > .im-duotone') ||
           section.querySelector(':scope > div[style*="z-index:0"]');
  }

  /* ---- (a) PARALLAX on the backdrop container (NOT the kenburns <img>) ------ */
  function initParallax() {
    var sections = sectionList();
    var layers = [];
    for (var i = 0; i < sections.length; i++) {
      var l = backdropLayer(sections[i]);
      if (l) layers.push(l);
    }
    if (!layers.length) return;

    var ticking = false;
    function update() {
      ticking = false;
      if (!MOBILE.matches || REDUCE.matches) {
        // Reset any prior transform when leaving mobile / reduced motion.
        for (var j = 0; j < layers.length; j++) layers[j].style.transform = '';
        return;
      }
      for (var k = 0; k < layers.length; k++) {
        var rect = layers[k].getBoundingClientRect();
        layers[k].style.transform = 'translate3d(0,' + (rect.top * -0.06) + 'px,0)';
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onMediaChange(REDUCE, update);
    update();
  }

  /* ---- (b) STAGGERED REVEALS + (d) per-section ENTER WASH ------------------- */
  function initReveals() {
    if (!MOBILE.matches) return; // desktop untouched — no reveal classes added
    if (REDUCE.matches) return; // instant — content already visible, do nothing

    var sections = sectionList();
    for (var s = 0; s < sections.length; s++) {
      var section = sections[s];
      var backdrop = backdropLayer(section);
      var children = section.children;
      var idx = 0;
      for (var c = 0; c < children.length; c++) {
        var child = children[c];
        if (child === backdrop) continue;
        var pos = '';
        try { pos = window.getComputedStyle(child).position; } catch (e) {}
        if (pos === 'absolute' || pos === 'fixed') continue; // skip decorative layers
        child.classList.add('me-stagger');
        child.style.transitionDelay = Math.min(idx, 3) * 90 + 'ms';
        idx++;
      }
    }

    var io;
    try {
      io = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
          var en = entries[e];
          if (!en.isIntersecting) continue;
          en.target.classList.add('me-in');
          io.unobserve(en.target);
          // "lights up as you arrive" wash on this section's backdrop
          if (!REDUCE.matches) {
            var sec = en.target.closest ? en.target.closest('section[data-screen-label]') : null;
            if (sec) {
              var bg = backdropLayer(sec);
              if (bg && !bg.getAttribute('data-me-washed')) {
                bg.setAttribute('data-me-washed', '1');
                bg.classList.add('me-arrive-wash');
              }
            }
          }
        }
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    } catch (err) {
      // No IO support — reveal everything immediately.
      var all = document.querySelectorAll('.me-stagger');
      for (var a = 0; a < all.length; a++) all[a].classList.add('me-in');
      return;
    }

    var staggers = document.querySelectorAll('.me-stagger');
    for (var i = 0; i < staggers.length; i++) io.observe(staggers[i]);
  }

  /* ---- (c) MOBILE NAV — progress hairline + hamburger + full-screen overlay - */
  function buildMobileNav() {
    if (document.querySelector('.me-nav-toggle')) return; // once

    // Scroll-progress hairline
    var progress = document.createElement('div');
    progress.className = 'me-progress';

    // Hamburger
    var toggle = document.createElement('button');
    toggle.className = 'me-nav-toggle';
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';

    // Overlay
    var overlay = document.createElement('nav');
    overlay.className = 'me-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    var links = [
      ['#category', 'The Category'],
      ['#format', 'The Format'],
      ['#location', 'The Venue'],
      ['#model', 'The Model'],
      ['/dataroom/', 'Data Room']
    ];
    var html = '<div class="me-overlay-kicker">Impossible Moments</div>';
    for (var i = 0; i < links.length; i++) {
      var isDR = links[i][0].charAt(0) !== '#';
      html += '<a href="' + links[i][0] + '"' + (isDR ? ' class="me-overlay-dr"' : '') + '>' + links[i][1] + '</a>';
    }
    overlay.innerHTML = html;

    function closeMenu() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
    function openMenu() {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    }
    toggle.addEventListener('click', function () {
      if (overlay.classList.contains('open')) closeMenu(); else openMenu();
    });
    // Native anchor scroll (respects existing scroll-margin-top); just close.
    var anchors = overlay.querySelectorAll('a');
    for (var a = 0; a < anchors.length; a++) {
      anchors[a].addEventListener('click', function () { closeMenu(); });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    });

    document.body.appendChild(progress);
    document.body.appendChild(toggle);
    document.body.appendChild(overlay);

    // Progress hairline tracking
    var pTick = false;
    function updateProgress() {
      pTick = false;
      try {
        var doc = document.documentElement;
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        var pct = Math.max(0, Math.min(1, (window.scrollY || doc.scrollTop || 0) / max));
        progress.style.width = (pct * 100) + '%';
      } catch (e) {}
    }
    window.addEventListener('scroll', function () {
      if (pTick) return; pTick = true; window.requestAnimationFrame(updateProgress);
    }, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /* ==========================================================================
     DATA ROOM ENHANCEMENT — only adds a tap-to-close scrim behind the existing
     bottom-sheet preview. Reads existing elements, calls the existing
     closePanel(); zero touchpoints on auth/load/render/password.
     ========================================================================== */
  function initDataroom() {
    function ready(fn) {
      if (document.readyState !== 'loading') fn();
      else document.addEventListener('DOMContentLoaded', fn);
    }
    ready(function () {
      try {
        var panel = document.getElementById('drPanel');
        if (!panel) return;

        var scrim = null, removeTimer = null;

        function doClose() {
          try {
            if (typeof window.closePanel === 'function') window.closePanel();
            else panel.classList.remove('open');
          } catch (e) { panel.classList.remove('open'); }
        }
        function addScrim() {
          if (scrim) return;
          if (!window.matchMedia('(max-width:700px)').matches) return; // bottom-sheet is mobile-only
          clearTimeout(removeTimer);
          scrim = document.createElement('div');
          scrim.className = 'me-sheet-scrim';
          scrim.addEventListener('click', doClose);
          document.body.appendChild(scrim);
          window.requestAnimationFrame(function () { if (scrim) scrim.classList.add('open'); });
        }
        function removeScrim() {
          if (!scrim) return;
          var s = scrim; scrim = null;
          s.classList.remove('open');
          removeTimer = setTimeout(function () {
            if (s && s.parentNode) s.parentNode.removeChild(s);
          }, 320);
        }

        var obs = new MutationObserver(function () {
          if (panel.classList.contains('open')) addScrim();
          else removeScrim();
        });
        obs.observe(panel, { attributes: true, attributeFilter: ['class'] });
      } catch (e) {}
    });
  }

})();

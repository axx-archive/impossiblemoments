/* @ds-bundle: {"format":3,"namespace":"ImpossibleMomentsDesignSystem_f55fdc","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Marker","sourcePath":"components/core/Marker.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"0c5b030b24f3","components/core/Badge.jsx":"f8434353b548","components/core/Button.jsx":"602362f538b0","components/core/Card.jsx":"b4d3faf42d9a","components/core/Divider.jsx":"c8576d77edf8","components/core/Marker.jsx":"e965d368fbac","components/core/SectionLabel.jsx":"60e708df9e85","components/core/Stat.jsx":"93e39fb555e2","components/forms/Input.jsx":"7ca2f7a2fb6c","ui_kits/dataroom/Gate.jsx":"41cca5168b9d","ui_kits/dataroom/Room.jsx":"493264dbae85","ui_kits/dataroom/boot.jsx":"a23d9d3ef09d","ui_kits/marketing/Chrome.jsx":"c8918e00c24e","ui_kits/marketing/Hero.jsx":"3a50890beccf","ui_kits/marketing/Sections.jsx":"80b47bed81d4","ui_kits/marketing/Slate.jsx":"ef9cab8cb786","ui_kits/marketing/boot.jsx":"648870cac1eb"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ImpossibleMomentsDesignSystem_f55fdc = window.ImpossibleMomentsDesignSystem_f55fdc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-logo { display: inline-flex; align-items: center; gap: 0.7em; line-height: 1; text-decoration: none; }
.im-logo__mono {
  font-family: var(--im-font-display);
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--im-gold-200);
  border: 1px solid var(--im-border-strong);
  display: flex; align-items: center; justify-content: center;
  aspect-ratio: 1;
}
.im-logo__word { display: inline-flex; flex-direction: column; }
.im-logo__l1 {
  font-family: var(--im-font-display);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--im-cream-100);
  text-transform: uppercase;
}
.im-logo__l2 {
  font-family: var(--im-font-sans);
  font-weight: 400;
  letter-spacing: 0.52em;
  text-indent: 0.52em;
  text-transform: uppercase;
  color: var(--im-gold-400);
}
.im-logo--neon .im-logo__l1 { color: var(--im-filament); text-shadow: var(--im-neon-text-soft); }
.im-logo--horizontal .im-logo__word { flex-direction: row; align-items: baseline; gap: 0.4em; }
.im-logo--horizontal .im-logo__l1 { letter-spacing: 0.02em; }
.im-logo--horizontal .im-logo__l2 { letter-spacing: 0.02em; text-indent: 0; font-style: italic; font-family: var(--im-font-display); color: var(--im-gold-300); text-transform: none; }
`;
const SIZES = {
  sm: {
    l1: '0.95rem',
    l2: '0.42rem',
    mono: '28px',
    monoF: '0.95rem',
    gap2: '5px'
  },
  md: {
    l1: '1.5rem',
    l2: '0.6rem',
    mono: '40px',
    monoF: '1.4rem',
    gap2: '8px'
  },
  lg: {
    l1: '2.4rem',
    l2: '0.78rem',
    mono: '60px',
    monoF: '2.1rem',
    gap2: '12px'
  }
};

/**
 * Impossible Moments — Logo
 * The typographic identity. `variant`: stacked lockup (default), horizontal
 * wordmark, or monogram "IM". `neon` lights the wordmark for dark hero use.
 */
function Logo({
  variant = 'stacked',
  size = 'md',
  neon = false,
  href,
  className = '',
  ...rest
}) {
  useOnce('im-logo-css', CSS);
  const s = SIZES[size] || SIZES.md;
  const cls = ['im-logo', `im-logo--${variant}`, neon ? 'im-logo--neon' : '', className].filter(Boolean).join(' ');
  const Tag = href ? 'a' : 'span';
  let inner;
  if (variant === 'monogram') {
    inner = /*#__PURE__*/React.createElement("span", {
      className: "im-logo__mono",
      style: {
        width: s.mono,
        fontSize: s.monoF
      }
    }, "IM");
  } else if (variant === 'horizontal') {
    inner = /*#__PURE__*/React.createElement("span", {
      className: "im-logo__word"
    }, /*#__PURE__*/React.createElement("span", {
      className: "im-logo__l1",
      style: {
        fontSize: s.l1
      }
    }, "Impossible"), /*#__PURE__*/React.createElement("span", {
      className: "im-logo__l2",
      style: {
        fontSize: s.l1
      }
    }, "Moments"));
  } else {
    inner = /*#__PURE__*/React.createElement("span", {
      className: "im-logo__word",
      style: {
        gap: s.gap2
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "im-logo__l1",
      style: {
        fontSize: s.l1
      }
    }, "Impossible"), /*#__PURE__*/React.createElement("span", {
      className: "im-logo__l2",
      style: {
        fontSize: s.l2
      }
    }, "Moments"));
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    href: href
  }, rest), inner);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-badge {
  font-family: var(--im-font-sans);
  font-weight: 500;
  font-size: 0.6rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  padding: 0.5em 1.1em;
  border: 1px solid var(--im-border);
  border-radius: var(--im-radius-pill);
  color: var(--im-cream-400);
  background: transparent;
  white-space: nowrap;
  line-height: 1;
}
.im-badge__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.im-badge--secured { color: var(--im-success); border-color: rgba(111,168,106,0.4); }
.im-badge--development { color: var(--im-gold-400); border-color: var(--im-border-strong); }
.im-badge--pending { color: var(--im-gold-300); border-color: var(--im-border-strong); }
.im-badge--neutral { color: var(--im-cream-400); border-color: var(--im-border); }
.im-badge--solid { color: var(--im-text-on-gold); background: var(--im-gold-500); border-color: var(--im-gold-500); }
.im-badge--secured .im-badge__dot { box-shadow: 0 0 6px rgba(111,168,106,0.7); }
.im-badge--development .im-badge__dot, .im-badge--pending .im-badge__dot { box-shadow: 0 0 6px rgba(196,148,60,0.7); }
`;

/**
 * Impossible Moments — Badge
 * Status pill for deal stage and metadata ("LOI Secured", "In Development").
 * Set `dot` for a glowing status indicator.
 */
function Badge({
  variant = 'neutral',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  useOnce('im-badge-css', CSS);
  const cls = ['im-badge', `im-badge--${variant}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "im-badge__dot",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject a component's CSS rules once. Keeps hover/focus/active in real CSS
   instead of JS state — components stay self-contained, no CSS-in-JS deps. */
function useOnce(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-btn {
  font-family: var(--im-font-sans);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6em;
  border: 1px solid transparent;
  border-radius: var(--im-radius-sm);
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: background var(--im-dur) var(--im-ease),
              color var(--im-dur) var(--im-ease),
              border-color var(--im-dur) var(--im-ease),
              box-shadow var(--im-dur) var(--im-ease),
              transform var(--im-dur-fast) var(--im-ease);
  -webkit-tap-highlight-color: transparent;
}
.im-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--im-bg), 0 0 0 4px var(--im-focus-ring); }
.im-btn:active { transform: translateY(1px); }
.im-btn[disabled], .im-btn[aria-disabled="true"] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

/* sizes */
.im-btn--sm { height: var(--im-control-h-sm); padding: 0 18px; font-size: 0.66rem; }
.im-btn--md { height: var(--im-control-h-md); padding: 0 28px; font-size: 0.72rem; }
.im-btn--lg { height: var(--im-control-h-lg); padding: 0 40px; font-size: 0.8rem; letter-spacing: 0.22em; }

/* primary — filled gold, blooms on hover */
.im-btn--primary { background: var(--im-gold-500); color: var(--im-text-on-gold); }
.im-btn--primary:hover { background: var(--im-gold-400); box-shadow: var(--im-glow-gold-sm); }
.im-btn--primary:active { background: var(--im-gold-600); }

/* secondary — gold hairline outline */
.im-btn--secondary { background: transparent; color: var(--im-gold-300); border-color: var(--im-border-strong); }
.im-btn--secondary:hover { background: var(--im-accent-tint); border-color: var(--im-gold-500); color: var(--im-gold-200); box-shadow: var(--im-glow-gold-sm); }

/* ghost — quiet text action */
.im-btn--ghost { background: transparent; color: var(--im-cream-400); }
.im-btn--ghost:hover { color: var(--im-gold-300); background: var(--im-accent-tint); }

.im-btn--block { width: 100%; }
.im-btn__icon { display: inline-flex; font-size: 1.1em; }
`;

/**
 * Impossible Moments — Button
 * Marquee-styled action. Filled gold (primary), gold hairline (secondary),
 * or quiet text (ghost). Renders an <a> when `href` is supplied.
 */
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  href,
  iconLeft,
  iconRight,
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  useOnce('im-button-css', CSS);
  const cls = ['im-btn', `im-btn--${variant}`, `im-btn--${size}`, block ? 'im-btn--block' : '', className].filter(Boolean).join(' ');
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, iconLeft && /*#__PURE__*/React.createElement("span", {
    className: "im-btn__icon"
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    className: "im-btn__icon"
  }, iconRight));
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-card {
  position: relative;
  background: var(--im-surface);
  border: 1px solid var(--im-border-faint);
  border-radius: var(--im-radius-sm);
  padding: 2.4rem 2.6rem;
  transition: background var(--im-dur) var(--im-ease),
              border-color var(--im-dur) var(--im-ease),
              transform var(--im-dur) var(--im-ease),
              box-shadow var(--im-dur) var(--im-ease);
}
.im-card--panel { background: var(--im-surface-panel); }
.im-card--glass {
  background: rgba(196,148,60,0.05);
  border-color: var(--im-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.im-card--glass::before {
  content: ''; position: absolute; inset: -1px; border-radius: inherit; pointer-events: none;
  background: linear-gradient(135deg, rgba(196,148,60,0.14), transparent 58%);
}
.im-card--bordered { background: transparent; border-color: var(--im-border); }
.im-card--interactive { cursor: pointer; }
.im-card--interactive:hover {
  background: var(--im-accent-tint);
  border-color: var(--im-border-strong);
  transform: translateY(-2px);
  box-shadow: var(--im-glow-gold-sm);
}
.im-card__inner { position: relative; z-index: 1; }
`;

/**
 * Impossible Moments — Card
 * A warm noir surface with a gold hairline. `glass` adds blur + a corner
 * sheen for overlay cards on imagery; `interactive` lifts and blooms on hover.
 */
function Card({
  variant = 'surface',
  interactive = false,
  className = '',
  children,
  ...rest
}) {
  useOnce('im-card-css', CSS);
  const map = {
    surface: '',
    panel: 'im-card--panel',
    glass: 'im-card--glass',
    bordered: 'im-card--bordered'
  };
  const cls = ['im-card', map[variant] || '', interactive ? 'im-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "im-card__inner"
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-divider { display: flex; align-items: center; gap: 1.2rem; width: 100%; }
.im-divider__line { flex: 1; height: 1px; background: var(--im-border); }
.im-divider--glow .im-divider__line { background: var(--im-gold-600); box-shadow: 0 0 4px rgba(196,148,60,0.4), 0 0 10px rgba(196,148,60,0.2); }
.im-divider__label {
  font-family: var(--im-font-sans);
  font-weight: 500;
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--im-cream-400);
  white-space: nowrap;
}
.im-divider__node { flex-shrink: 0; }
`;

/**
 * Impossible Moments — Divider
 * Gold hairline rule. Optional centered label or node (e.g. a signature
 * glyph), echoing the site's timeline lines. `glow` lights the rule.
 */
function Divider({
  label,
  children,
  glow = false,
  className = '',
  ...rest
}) {
  useOnce('im-divider-css', CSS);
  const cls = ['im-divider', glow ? 'im-divider--glow' : '', className].filter(Boolean).join(' ');
  const node = children || (label ? /*#__PURE__*/React.createElement("span", {
    className: "im-divider__label"
  }, label) : null);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    role: "separator"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "im-divider__line"
  }), node && /*#__PURE__*/React.createElement("span", {
    className: "im-divider__node"
  }, node), node && /*#__PURE__*/React.createElement("span", {
    className: "im-divider__line"
  }));
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Marker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-marker {
  font-family: var(--im-font-mono);
  font-weight: 400;
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  color: var(--im-ivory-400);
  line-height: 1.2;
  white-space: nowrap;
}
.im-marker--gilt { color: var(--im-gilt-500); }
.im-marker--lumen { color: var(--im-lumen-300); }
.im-marker--bright { color: var(--im-ivory-100); }
.im-marker--sm { font-size: 0.62rem; letter-spacing: 0.2em; }
.im-marker__idx { color: var(--im-gilt-500); }
.im-marker--gilt .im-marker__idx, .im-marker--lumen .im-marker__idx { color: inherit; }
.im-marker__tick { width: 16px; height: 1px; background: currentColor; opacity: 0.5; flex-shrink: 0; }
.im-marker__dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
`;

/**
 * Impossible Moments — Marker
 * The archival mono "timecode" label: an optional index (NO. 001 / REEL 01),
 * an optional leading rule or dot, then text. Carries dates, places, and
 * status metadata in the brand's technical voice.
 */
function Marker({
  index,
  tone = 'dim',
  size = 'md',
  rule = false,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  useOnce('im-marker-css', CSS);
  const toneCls = {
    dim: '',
    gilt: 'im-marker--gilt',
    lumen: 'im-marker--lumen',
    bright: 'im-marker--bright'
  }[tone] || '';
  const cls = ['im-marker', toneCls, size === 'sm' ? 'im-marker--sm' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    className: "im-marker__tick",
    "aria-hidden": "true"
  }), dot && /*#__PURE__*/React.createElement("span", {
    className: "im-marker__dot",
    "aria-hidden": "true"
  }), index != null && /*#__PURE__*/React.createElement("span", {
    className: "im-marker__idx"
  }, index), children != null && /*#__PURE__*/React.createElement("span", {
    className: "im-marker__text"
  }, children));
}
Object.assign(__ds_scope, { Marker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Marker.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-kicker-c {
  font-family: var(--im-font-sans);
  font-weight: 500;
  font-size: 0.7rem;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.9em;
  margin: 0;
}
.im-kicker-c--gold { color: var(--im-gold-500); }
.im-kicker-c--dim { color: var(--im-cream-400); }
.im-kicker-c--bright { color: var(--im-cream-100); }
.im-kicker-c__tick { width: 22px; height: 1px; background: currentColor; opacity: 0.6; flex-shrink: 0; }
`;

/**
 * Impossible Moments — SectionLabel (the kicker / eyebrow)
 * The letterspaced uppercase line that introduces nearly every section.
 * Optional leading rule for a more editorial treatment.
 */
function SectionLabel({
  tone = 'gold',
  rule = false,
  className = '',
  children,
  ...rest
}) {
  useOnce('im-kicker-css', CSS);
  const cls = ['im-kicker-c', `im-kicker-c--${tone}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    className: "im-kicker-c__tick",
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-stat { display: flex; flex-direction: column; gap: 0.5rem; }
.im-stat--center { align-items: center; text-align: center; }
.im-stat__num {
  font-family: var(--im-font-display);
  font-weight: 400;
  font-style: italic;
  line-height: 0.95;
  color: var(--im-gold-500);
  text-shadow: 0 0 30px rgba(196,148,60,0.18);
}
.im-stat--upright .im-stat__num { font-style: normal; }
.im-stat--cream .im-stat__num { color: var(--im-gold-200); text-shadow: none; }
.im-stat--sm .im-stat__num { font-size: 1.9rem; }
.im-stat--md .im-stat__num { font-size: 2.8rem; }
.im-stat--lg .im-stat__num { font-size: clamp(2.8rem, 4vw, 3.6rem); }
.im-stat__label {
  font-family: var(--im-font-sans);
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  line-height: 1.5;
  color: var(--im-cream-400);
  max-width: 200px;
}
.im-stat--center .im-stat__label { margin-inline: auto; }
`;

/**
 * Impossible Moments — Stat
 * The big gilt number + quiet sans label. The brand's primary
 * way of stating evidence (grosses, listeners, occupancy).
 */
function Stat({
  value,
  label,
  size = 'md',
  align = 'left',
  tone = 'gold',
  upright = false,
  className = '',
  ...rest
}) {
  useOnce('im-stat-css', CSS);
  const cls = ['im-stat', `im-stat--${size}`, align === 'center' ? 'im-stat--center' : '', tone === 'cream' ? 'im-stat--cream' : '', upright ? 'im-stat--upright' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "im-stat__num"
  }, value), label && /*#__PURE__*/React.createElement("span", {
    className: "im-stat__label"
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useOnce(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.im-field { display: flex; flex-direction: column; gap: 0.6rem; }
.im-field__label {
  font-family: var(--im-font-sans);
  font-weight: 500;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--im-cream-400);
}
.im-input {
  width: 100%;
  font-family: var(--im-font-sans);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  color: var(--im-cream-100);
  background: transparent;
  border: 1px solid var(--im-border-strong);
  border-radius: var(--im-radius-sm);
  height: var(--im-control-h-md);
  padding: 0 1rem;
  outline: none;
  transition: border-color var(--im-dur) var(--im-ease), box-shadow var(--im-dur) var(--im-ease), background var(--im-dur) var(--im-ease);
}
.im-input::placeholder { color: var(--im-cream-600); letter-spacing: 0.12em; }
.im-input:hover { border-color: var(--im-gold-600); }
.im-input:focus { border-color: var(--im-gold-500); box-shadow: var(--im-glow-gold-sm); background: var(--im-accent-tint); }
.im-input--center { text-align: center; letter-spacing: 0.16em; }
.im-input--lg { height: var(--im-control-h-lg); font-size: 1rem; }
.im-input--error { border-color: var(--im-danger); }
.im-input--error:focus { box-shadow: 0 0 16px rgba(196,86,74,0.3); }
.im-field__hint { font-family: var(--im-font-sans); font-size: 0.7rem; color: var(--im-cream-600); }
.im-field__hint--error { color: var(--im-danger); }
`;

/**
 * Impossible Moments — Input
 * Transparent dark field with a gold hairline that blooms on focus.
 * The same treatment used by the data-room access gate.
 */
function Input({
  label,
  hint,
  error = false,
  size = 'md',
  center = false,
  className = '',
  id,
  ...rest
}) {
  useOnce('im-input-css', CSS);
  const fieldId = id || (label ? `im-${String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : undefined);
  const inputCls = ['im-input', size === 'lg' ? 'im-input--lg' : '', center ? 'im-input--center' : '', error ? 'im-input--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "im-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "im-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    className: inputCls,
    id: fieldId,
    "aria-invalid": error || undefined
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    className: `im-field__hint${error ? ' im-field__hint--error' : ''}`
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dataroom/Gate.jsx
try { (() => {
/* Impossible Moments — Data Room: access gate */
const DRG = window.ImpossibleMomentsDesignSystem_f55fdc;
function Gate({
  onUnlock
}) {
  const [val, setVal] = React.useState('');
  const [error, setError] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (val.trim().toUpperCase() === 'VOYAGE') {
      onUnlock();
    } else {
      setError(true);
      setVal('');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dr-gate"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dr-gate__beam"
  }), /*#__PURE__*/React.createElement("form", {
    className: "dr-gate__inner",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement(DRG.Logo, {
    variant: "stacked",
    size: "lg",
    neon: true
  }), /*#__PURE__*/React.createElement(DRG.Marker, {
    tone: "lumen",
    size: "sm"
  }, "Data Room \xB7 Series A"), /*#__PURE__*/React.createElement("p", {
    className: "dr-gate__note"
  }, "Confidential investor materials.", /*#__PURE__*/React.createElement("br", null), "Access by invitation only."), /*#__PURE__*/React.createElement("div", {
    className: "dr-gate__field"
  }, /*#__PURE__*/React.createElement(DRG.Input, {
    center: true,
    size: "lg",
    value: val,
    error: error,
    onChange: e => {
      setVal(e.target.value);
      setError(false);
    },
    placeholder: "Enter access code",
    hint: error ? 'Incorrect code \u2014 try again' : 'Demo code: VOYAGE'
  })), /*#__PURE__*/React.createElement(DRG.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    block: true
  }, "Enter the Data Room"), /*#__PURE__*/React.createElement("a", {
    className: "dr-gate__back",
    href: "../marketing/index.html"
  }, "\u2190 Back to site")));
}
Object.assign(window, {
  Gate
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dataroom/Gate.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dataroom/Room.jsx
try { (() => {
/* Impossible Moments — Data Room: the portal (sidebar + documents) */
const DR = window.ImpossibleMomentsDesignSystem_f55fdc;
const NAV = [{
  id: 'overview',
  label: 'Overview'
}, {
  id: 'thesis',
  label: 'The Thesis'
}, {
  id: 'evidence',
  label: 'Evidence'
}, {
  id: 'documents',
  label: 'Documents'
}, {
  id: 'sources',
  label: 'Sources'
}];
const EVIDENCE = [{
  v: '$137.7M',
  l: 'Piece of Me gross, 2013\u20132017'
}, {
  v: '$113M',
  l: 'ABBA Voyage 2024 gross, >90% occupancy'
}, {
  v: '43.6',
  l: 'Avg. Vegas visitor age, 2024 (was 46.6)'
}, {
  v: '26\u201330M',
  l: 'Britney monthly Spotify listeners'
}, {
  v: '1.1M',
  l: 'The Woman in Me, week-one U.S. copies'
}, {
  v: '$1.3B',
  l: 'Pophouse Fund I institutional raise'
}];
const DOCS = [{
  title: 'Why Britney Will Be a Big Draw',
  kind: 'Investor Memo',
  badge: 'secured',
  badgeText: 'Available',
  meta: 'PDF · 11 pages',
  featured: true
}, {
  title: 'Talent Rights & Deal Status',
  kind: 'Legal',
  badge: 'development',
  badgeText: 'In Review',
  meta: 'PDF · 6 pages'
}, {
  title: 'Sources & Uses',
  kind: 'Financial Model',
  badge: 'secured',
  badgeText: 'Available',
  meta: 'XLSX · live'
}, {
  title: 'Unit Economics — Residency',
  kind: 'Financial Model',
  badge: 'secured',
  badgeText: 'Available',
  meta: 'XLSX · live'
}, {
  title: 'Competitive Supply Map',
  kind: 'Market',
  badge: 'pending',
  badgeText: 'Q3 2026',
  meta: 'PDF · pending'
}, {
  title: 'Venue & Site Plan — Las Vegas',
  kind: 'Development',
  badge: 'development',
  badgeText: 'In Review',
  meta: 'PDF · 18 pages'
}];
const SOURCES = [['[1]', 'Billboard Boxscore', 'Piece of Me final figures & Domination guarantee'], ['[6]', 'Music Business Worldwide', 'ABBA Voyage 2024 financials; Pophouse / KISS'], ['[8]', 'LVCVA 2024 Visitor Profile Study', 'Strip demographic age reset'], ['[9]', 'Pollstar · Live Nation FY2024', 'Live category pricing & growth']];
function Sidebar({
  active,
  onNav,
  onLock
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "dr-side"
  }, /*#__PURE__*/React.createElement(DR.Logo, {
    variant: "horizontal",
    size: "sm"
  }), /*#__PURE__*/React.createElement(DR.Badge, {
    variant: "neutral",
    dot: true,
    className: "dr-side__status"
  }, "Unlocked"), /*#__PURE__*/React.createElement("nav", {
    className: "dr-side__nav"
  }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    "data-active": active === n.id,
    onClick: () => onNav(n.id)
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    className: "dr-side__foot"
  }, /*#__PURE__*/React.createElement(DR.Divider, null), /*#__PURE__*/React.createElement("button", {
    className: "dr-side__lock",
    onClick: onLock
  }, "Lock the room"), /*#__PURE__*/React.createElement("p", {
    className: "dr-side__conf"
  }, "Confidential \xB7 Do not distribute")));
}
function DocRow({
  doc
}) {
  return /*#__PURE__*/React.createElement(DR.Card, {
    variant: doc.featured ? 'glass' : 'surface',
    interactive: true,
    className: "dr-doc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dr-doc__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dr-doc__kind"
  }, doc.kind), /*#__PURE__*/React.createElement("div", {
    className: "dr-doc__title"
  }, doc.title), /*#__PURE__*/React.createElement("div", {
    className: "dr-doc__meta"
  }, doc.meta)), /*#__PURE__*/React.createElement("div", {
    className: "dr-doc__right"
  }, /*#__PURE__*/React.createElement(DR.Badge, {
    variant: doc.badge,
    dot: doc.badge === 'secured'
  }, doc.badgeText), /*#__PURE__*/React.createElement(DR.Button, {
    variant: "secondary",
    size: "sm"
  }, "Open")));
}
function Room({
  onLock
}) {
  const [active, setActive] = React.useState('overview');
  const scrollTo = id => {
    setActive(id);
    const el = document.getElementById('dr-' + id);
    const main = document.querySelector('.dr-main');
    if (el && main) main.scrollTo({
      top: el.offsetTop - 24,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dr-room"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    onNav: scrollTo,
    onLock: onLock
  }), /*#__PURE__*/React.createElement("main", {
    className: "dr-main"
  }, /*#__PURE__*/React.createElement("section", {
    id: "dr-overview",
    className: "dr-block dr-overview"
  }, /*#__PURE__*/React.createElement(DR.Marker, {
    index: "No. 001",
    tone: "lumen",
    rule: true
  }, "Data Room \xB7 Series A"), /*#__PURE__*/React.createElement("h1", {
    className: "dr-h1"
  }, "The only way to see her again."), /*#__PURE__*/React.createElement("p", {
    className: "dr-lead"
  }, "Britney Spears\u2019 proven Vegas audience, a multi-year refusal to perform live in the U.S., and a structurally younger Strip establish the demand conditions under which an avatar residency \u2014 benchmarked to ABBA Voyage \u2014 can price and fill at scale."), /*#__PURE__*/React.createElement("div", {
    className: "dr-overview__tags"
  }, /*#__PURE__*/React.createElement(DR.Badge, {
    variant: "secured",
    dot: true
  }, "LOI Secured"), /*#__PURE__*/React.createElement(DR.Badge, {
    variant: "neutral"
  }, "3,000-Seat Venue"), /*#__PURE__*/React.createElement(DR.Badge, {
    variant: "neutral"
  }, "Powered by ILM"))), /*#__PURE__*/React.createElement("section", {
    id: "dr-thesis",
    className: "dr-block"
  }, /*#__PURE__*/React.createElement(DR.Marker, {
    index: "No. 02",
    tone: "dim",
    rule: true
  }, "The Thesis"), /*#__PURE__*/React.createElement("div", {
    className: "dr-thesis"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dr-thesis__col"
  }, /*#__PURE__*/React.createElement("h3", null, "Britney has sold this room before."), /*#__PURE__*/React.createElement("p", null, "Piece of Me ran 248 shows at Planet Hollywood, grossing $137.7M on 916,184 tickets \u2014 the #3 highest-grossing Vegas residency of all time. As late as 2019, Caesars guaranteed $500K per show.")), /*#__PURE__*/React.createElement("div", {
    className: "dr-thesis__col"
  }, /*#__PURE__*/React.createElement("h3", null, "The only way to see her."), /*#__PURE__*/React.createElement("p", null, "Seven years of withdrawal plus an explicit, reiterated U.S. refusal is the relevant scarcity signal. An avatar residency is the only format that converts that constraint into a monetizable product.")))), /*#__PURE__*/React.createElement("section", {
    id: "dr-evidence",
    className: "dr-block"
  }, /*#__PURE__*/React.createElement(DR.Marker, {
    index: "No. 03",
    tone: "dim",
    rule: true
  }, "Evidence"), /*#__PURE__*/React.createElement("div", {
    className: "dr-evidence"
  }, EVIDENCE.map(e => /*#__PURE__*/React.createElement("div", {
    className: "dr-evidence__cell",
    key: e.v
  }, /*#__PURE__*/React.createElement(DR.Stat, {
    value: e.v,
    label: e.l,
    size: "md"
  }))))), /*#__PURE__*/React.createElement("section", {
    id: "dr-documents",
    className: "dr-block"
  }, /*#__PURE__*/React.createElement(DR.Marker, {
    index: "No. 04",
    tone: "dim",
    rule: true
  }, "Documents"), /*#__PURE__*/React.createElement("div", {
    className: "dr-docs"
  }, DOCS.map(d => /*#__PURE__*/React.createElement(DocRow, {
    key: d.title,
    doc: d
  })))), /*#__PURE__*/React.createElement("section", {
    id: "dr-sources",
    className: "dr-block"
  }, /*#__PURE__*/React.createElement(DR.Marker, {
    index: "No. 05",
    tone: "dim",
    rule: true
  }, "Sources"), /*#__PURE__*/React.createElement("ul", {
    className: "dr-sources"
  }, SOURCES.map(s => /*#__PURE__*/React.createElement("li", {
    key: s[0]
  }, /*#__PURE__*/React.createElement("span", {
    className: "dr-sources__n"
  }, s[0]), /*#__PURE__*/React.createElement("span", {
    className: "dr-sources__name"
  }, s[1]), /*#__PURE__*/React.createElement("span", {
    className: "dr-sources__desc"
  }, s[2])))), /*#__PURE__*/React.createElement("p", {
    className: "dr-sources__foot"
  }, "Figures are sourced from public filings and trade reporting; subject to standard fact-check prior to publication."))));
}
Object.assign(window, {
  Room
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dataroom/Room.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dataroom/boot.jsx
try { (() => {
/* Impossible Moments — Data Room: app shell */
function DataRoomApp() {
  const [unlocked, setUnlocked] = React.useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "im-grain"
  }), unlocked ? /*#__PURE__*/React.createElement(Room, {
    onLock: () => setUnlocked(false)
  }) : /*#__PURE__*/React.createElement(Gate, {
    onUnlock: () => setUnlocked(true)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(DataRoomApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dataroom/boot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Chrome.jsx
try { (() => {
/* Impossible Moments — Marketing site: fixed nav + atmospheric overlays + footer */
const {
  Logo,
  Button,
  Divider
} = window.ImpossibleMomentsDesignSystem_f55fdc;
function Atmosphere() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "im-grain"
  }), /*#__PURE__*/React.createElement("div", {
    className: "im-vignette"
  }));
}
function Nav({
  onEnter
}) {
  const [solid, setSolid] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('.mk-scroll') || window;
    const onScroll = () => {
      const y = el === window ? window.scrollY : el.scrollTop;
      setSolid(y > 80);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: "mk-nav",
    "data-solid": solid
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "horizontal",
    size: "sm",
    href: "#top"
  }), /*#__PURE__*/React.createElement("nav", {
    className: "mk-nav__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#slate"
  }, "The Slate"), /*#__PURE__*/React.createElement("a", {
    href: "#genesis"
  }, "The Category"), /*#__PURE__*/React.createElement("a", {
    href: "#venue"
  }, "The Venue")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: onEnter
  }, "Data Room"));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "mk-footer"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "stacked",
    size: "md",
    neon: true
  }), /*#__PURE__*/React.createElement("p", {
    className: "mk-footer__tag"
  }, "The past, made present."), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("div", {
    className: "mk-footer__meta"
  }, /*#__PURE__*/React.createElement("span", null, "Impossible Moments, Inc."), /*#__PURE__*/React.createElement("span", null, "Las Vegas \xB7 est. 2026"), /*#__PURE__*/React.createElement("span", null, "Confidential \u2014 Investor Materials")));
}
Object.assign(window, {
  Atmosphere,
  Nav,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Hero.jsx
try { (() => {
/* Impossible Moments — Marketing site: Hero ("The Threshold" title card) */
const HIM = window.ImpossibleMomentsDesignSystem_f55fdc;
function Hero({
  onEnter
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "im-duotone mk-hero__bg"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/abba-voyage-stage.png",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__spot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__beam"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__frame im-frame"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__slate"
  }, /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "gilt",
    size: "sm"
  }, "Impossible Moments"), /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "dim",
    size: "sm"
  }, "Confidential \xB7 Series A")), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__content"
  }, /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "lumen",
    rule: true,
    className: "mk-hero__index"
  }, "No. 001 \u2014 The Avatar Residency"), /*#__PURE__*/React.createElement("h1", {
    className: "mk-hero__title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-hero__word im-neon"
  }, "Impossible"), /*#__PURE__*/React.createElement("span", {
    className: "mk-hero__word mk-hero__word--lumen im-lumen"
  }, "Moments")), /*#__PURE__*/React.createElement("p", {
    className: "mk-hero__tag"
  }, "The ", /*#__PURE__*/React.createElement("em", {
    className: "mk-hero__past"
  }, "past"), ", made ", /*#__PURE__*/React.createElement("em", {
    className: "mk-hero__present"
  }, "present"), "."), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__cta"
  }, /*#__PURE__*/React.createElement(HIM.Button, {
    variant: "primary",
    size: "lg",
    onClick: onEnter
  }, "Enter the Data Room"), /*#__PURE__*/React.createElement(HIM.Button, {
    variant: "ghost",
    size: "lg",
    href: "#slate",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2193")
  }, "See the Slate"))), /*#__PURE__*/React.createElement("div", {
    className: "mk-hero__strip"
  }, /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "dim",
    size: "sm",
    dot: true
  }, "Est. 1977 \u2014 Present"), /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "dim",
    size: "sm",
    dot: true
  }, "Las Vegas \xB7 NV"), /*#__PURE__*/React.createElement(HIM.Marker, {
    tone: "dim",
    size: "sm",
    dot: true
  }, "Powered by ILM")));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Sections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Impossible Moments — Marketing site: Taxonomy, Genesis, Infrastructure, Venue */
const IM = window.ImpossibleMomentsDesignSystem_f55fdc;
function Reveal({
  children,
  className = '',
  delay = 0,
  tag = 'div',
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    }), {
      threshold: 0.15
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = tag;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: `im-reveal ${className}`,
    style: {
      transitionDelay: `${delay}s`
    }
  }, rest), children);
}

/* ---------- Taxonomy ---------- */
const TAXONOMY = [{
  k: 'The Impossible Venue',
  ex: 'Sphere',
  body: 'Architecture as experience. A $2.3 billion structure where the building itself is the show.'
}, {
  k: 'The Impossible Immersion',
  ex: 'Disneyland',
  body: 'Stepping inside alternate worlds with no fixed path and no fixed runtime. Exploration as mass entertainment.'
}, {
  k: 'The Impossible Moment',
  ex: 'Impossible Moments',
  body: 'Spending the evening with someone who isn\u2019t there. A living performance from a moment that no longer exists.',
  active: true
}];
function Taxonomy() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-sec mk-taxonomy",
    id: "category"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-sec__bg mk-taxonomy__bg"
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    index: "No. 02",
    tone: "lumen",
    rule: true
  }, "The New Experiential Economy")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "Three kinds of impossible are reshaping live entertainment.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "mk-taxonomy__unclaimed"
  }, "Only one is still unclaimed.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-taxonomy__grid"
  }, TAXONOMY.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.ex,
    delay: 0.1 + i * 0.08
  }, /*#__PURE__*/React.createElement("div", {
    className: `mk-taxonomy__card${t.active ? ' is-active' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-taxonomy__k"
  }, t.k), /*#__PURE__*/React.createElement("div", {
    className: "mk-taxonomy__ex"
  }, t.ex), /*#__PURE__*/React.createElement("p", {
    className: "mk-taxonomy__body"
  }, t.body))))));
}

/* ---------- Genesis ---------- */
function Genesis() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-sec mk-genesis",
    id: "genesis"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-sec__bg mk-genesis__bg"
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    index: "No. 03",
    tone: "lumen",
    rule: true
  }, "The Genesis \xB7 Stockholm 2022")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2 mk-genesis__h"
  }, "ABBA Voyage didn\u2019t prove a model.", /*#__PURE__*/React.createElement("br", null), "It revealed a category.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("p", {
    className: "mk-lead"
  }, "In a purpose-built theatre outside London, four artists appeared on stage as their younger selves. The audience knew it was technology. They didn\u2019t care. They sang every word. Because for ninety minutes, it was 1977 again.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-statband"
  }, /*#__PURE__*/React.createElement(IM.Stat, {
    value: "$500M+",
    label: "Total revenue since 2022",
    size: "lg"
  }), /*#__PURE__*/React.createElement(IM.Stat, {
    value: "$175M",
    label: "Initial build investment",
    size: "lg"
  }), /*#__PURE__*/React.createElement(IM.Stat, {
    value: "$135M",
    label: "Annual revenue",
    size: "lg"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement(IM.Card, {
    variant: "glass",
    className: "mk-genesis__quote"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mk-quote"
  }, "In ABBA Voyage, we saw an opportunity to scale impossible moments globally."))));
}

/* ---------- Infrastructure ---------- */
const INFRA = [{
  h: 'The Ultimate Moat',
  n: 'Name, Image & Likeness',
  p: 'Exclusive rights to the most iconic figures in culture. In an AI era, these are prime assets. Once secured, no one else can build what we build.'
}, {
  h: 'Cinematic-Grade Tech',
  n: 'Powered by ILM',
  p: 'Industrial Light & Magic \u2014 the team behind ABBA Voyage \u2014 bringing 40+ years of cinematic tools to make the impossible feel real.'
}, {
  h: 'Purpose-Built Venue',
  n: 'A 3,000-Seat House',
  p: 'The scale of IMAX with the energy of a live show. Engineered for 360\u00b0 immersive production and life-like avatars on stage.'
}];
function Infrastructure() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-sec mk-infra",
    id: "infrastructure"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-sec__bg mk-infra__bg"
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    index: "No. 04",
    tone: "lumen",
    rule: true
  }, "Infrastructure")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "How do you make the impossible possible?")), /*#__PURE__*/React.createElement("div", {
    className: "mk-infra__grid"
  }, INFRA.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.n,
    delay: 0.1 + i * 0.08
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-infra__card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-infra__h"
  }, c.h), /*#__PURE__*/React.createElement("div", {
    className: "mk-infra__n"
  }, c.n), /*#__PURE__*/React.createElement("p", {
    className: "mk-infra__p"
  }, c.p))))));
}

/* ---------- Venue ---------- */
function Venue() {
  const [night, setNight] = React.useState(true);
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-sec mk-venue",
    id: "venue"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    index: "No. 05",
    tone: "lumen",
    rule: true
  }, "The Location \xB7 Las Vegas")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2"
  }, "The best land in Vegas.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-statband mk-venue__stats"
  }, /*#__PURE__*/React.createElement(IM.Stat, {
    value: "50M+",
    label: "Annual foot traffic from the Strip",
    align: "center",
    tone: "cream"
  }), /*#__PURE__*/React.createElement(IM.Stat, {
    value: "$50B+",
    label: "In surrounding resort & casino infrastructure",
    align: "center",
    tone: "cream"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-venue__viewer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-venue__frame"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/venue-night.png",
    alt: "The venue site, illuminated, on the Las Vegas Strip",
    style: {
      opacity: night ? 1 : 0
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/venue-day.jpg",
    alt: "The venue site by day",
    style: {
      opacity: night ? 0 : 1
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mk-venue__toggle"
  }, /*#__PURE__*/React.createElement("button", {
    "data-on": night,
    onClick: () => setNight(true)
  }, "Night"), /*#__PURE__*/React.createElement("button", {
    "data-on": !night,
    onClick: () => setNight(false)
  }, "Day")))));
}

/* Marker shorthand bound to the design system */
const {
  Marker
} = IM;
function HeroLabelSafe({
  children
}) {
  return /*#__PURE__*/React.createElement(IM.SectionLabel, {
    tone: "gold",
    rule: true
  }, children);
}
Object.assign(window, {
  Reveal,
  Taxonomy,
  Genesis,
  Infrastructure,
  Venue
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Slate.jsx
try { (() => {
/* Impossible Moments — Marketing site: Launch Slate (the shows) */
const IMS = window.ImpossibleMomentsDesignSystem_f55fdc;
const SHOWS = [{
  id: 'britney',
  format: 'One Night With',
  name: 'Britney',
  img: '../../assets/imagery/britney-snake.webp',
  accent: 'var(--im-britney)',
  desc: 'The megastar format. A single icon with the cultural gravity to sustain a permanent residency \u2014 the night her fans have imagined for twenty years.',
  stat: '50M+',
  statLabel: 'Monthly Spotify listeners',
  badge: 'secured',
  badgeText: 'LOI Secured',
  why: ['Access to peak-era Britney \u2014 a performance that can no longer exist live.', 'A global catalog with multi-generational reach and proven Vegas demand.', 'A high-impact, era-driven set with seamless transitions and nonstop hits.', 'A megastar template that is repeatable across icons and globally portable.']
}, {
  id: 'nashville',
  format: 'One Night In',
  name: 'Nashville',
  img: '../../assets/imagery/nashville-duet-square.png',
  accent: 'var(--im-nashville)',
  desc: 'The collective format. Legends past and present on one stage \u2014 the depth of a genre\u2019s history colliding in a single impossible night.',
  stat: '139M+',
  statLabel: 'U.S. country music consumers',
  badge: 'development',
  badgeText: 'In Development',
  why: ['Cross-era duets that never existed \u2014 legends and modern stars together.', 'Country is at a cultural peak with a broad and growing audience.', 'A structured, story-driven night that moves through eras with emotional flow.', 'A repeatable format across genres, with a flexible, expandable cast.']
}];
function ShowCard({
  show
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: `mk-show${open ? ' is-open' : ''}`,
    style: {
      '--accent': show.accent
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-show__visual",
    style: {
      backgroundImage: `linear-gradient(160deg, rgba(10,7,6,0.45), rgba(10,7,6,0.6)), url(${show.img})`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-show__bigname"
  }, show.name)), /*#__PURE__*/React.createElement("div", {
    className: "mk-show__info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-show__format"
  }, show.format), /*#__PURE__*/React.createElement("div", {
    className: "mk-show__name"
  }, show.name), /*#__PURE__*/React.createElement("p", {
    className: "mk-show__desc"
  }, show.desc), /*#__PURE__*/React.createElement("div", {
    className: "mk-show__meta"
  }, /*#__PURE__*/React.createElement(IMS.Stat, {
    value: show.stat,
    label: show.statLabel,
    size: "sm"
  }), /*#__PURE__*/React.createElement(IMS.Badge, {
    variant: show.badge,
    dot: true
  }, show.badgeText)), /*#__PURE__*/React.createElement("button", {
    className: "mk-show__toggle",
    onClick: () => setOpen(v => !v)
  }, open ? 'Hide the thesis' : `Why ${show.name}?`, " ", /*#__PURE__*/React.createElement("span", null, open ? '\u2212' : '+')), /*#__PURE__*/React.createElement("ul", {
    className: "mk-show__why",
    hidden: !open
  }, show.why.map((w, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, w)))));
}
function Slate() {
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-sec mk-slate",
    id: "slate"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(IMS.Marker, {
    index: "No. 06",
    tone: "lumen",
    rule: true
  }, "Launch Slate")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.1
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-h2 mk-slate__h"
  }, "One venue. Two impossible nights.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.18
  }, /*#__PURE__*/React.createElement("p", {
    className: "mk-slate__sub"
  }, "Walk in knowing this night shouldn\u2019t exist. Walk out knowing you\u2019ll never forget it.")), /*#__PURE__*/React.createElement("div", {
    className: "mk-slate__grid"
  }, SHOWS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.id,
    delay: 0.1 + i * 0.1
  }, /*#__PURE__*/React.createElement(ShowCard, {
    show: s
  })))));
}
Object.assign(window, {
  Slate
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Slate.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/boot.jsx
try { (() => {
/* Impossible Moments — Marketing site: App shell */
function MarketingApp() {
  const enter = () => {
    window.location.href = '../dataroom/index.html';
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mk-scroll"
  }, /*#__PURE__*/React.createElement(Atmosphere, null), /*#__PURE__*/React.createElement(Nav, {
    onEnter: enter
  }), /*#__PURE__*/React.createElement(Hero, {
    onEnter: enter
  }), /*#__PURE__*/React.createElement(Taxonomy, null), /*#__PURE__*/React.createElement(Genesis, null), /*#__PURE__*/React.createElement(Infrastructure, null), /*#__PURE__*/React.createElement(Slate, null), /*#__PURE__*/React.createElement(Venue, null), /*#__PURE__*/React.createElement(Closing, {
    onEnter: enter
  }), /*#__PURE__*/React.createElement(Footer, null));
}
function Closing({
  onEnter
}) {
  const {
    Button: B,
    Marker
  } = window.ImpossibleMomentsDesignSystem_f55fdc;
  return /*#__PURE__*/React.createElement("section", {
    className: "mk-closing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__scrim"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__beam"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__content"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "mk-closing__poem"
  }, "A night that, by every rational measure,", /*#__PURE__*/React.createElement("br", null), "cannot happen.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "And yet."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.15
  }, /*#__PURE__*/React.createElement("h2", {
    className: "mk-closing__brand im-neon"
  }, "Impossible")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.2
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__sub"
  }, /*#__PURE__*/React.createElement(Marker, {
    tone: "lumen",
    size: "sm"
  }, "The past, made present"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 0.3
  }, /*#__PURE__*/React.createElement("div", {
    className: "mk-closing__cta"
  }, /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    size: "lg",
    onClick: onEnter
  }, "Enter the Data Room")))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(MarketingApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/boot.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Marker = __ds_scope.Marker;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

})();

# Performance & Load Snappiness

Changes applied to make BeBrave feel faster on first paint and during gameplay.

## Font loading (biggest win)

**Before:** Google Fonts were pulled in via `@import` inside `css/style.css`, which blocked rendering until the stylesheet was parsed and then triggered a second network round-trip.

**After:**
- Removed the CSS `@import`.
- Every HTML page now loads fonts directly in `<head>` with:
  - `rel="preconnect"` to `fonts.googleapis.com` and `fonts.gstatic.com`
  - A trimmed Google Fonts stylesheet (only weights actually used: Fredoka 600/700, Nunito 400/600/700, Poppins 600/700, Righteous)
  - `display=swap` so text shows immediately with system fallbacks

## JavaScript refactor (`js/script.js`)

- **Event delegation** — answer buttons use `data-choice="correct|wrong"` instead of inline `onclick`. One listener on `#scene` handles all choices.
- **Retry button** — delegated document click on `.retry-btn` (no inline handler).
- **Mobile nav** — single delegated click on `#nav-menu` instead of per-link listeners.
- **Bug fix** — `showCorrect()` now writes points once before animating (previously called `readPoints()` twice).
- **Faster init** — runs immediately if `DOMContentLoaded` already fired.
- **Removed** GitHub icon hover JS (now pure CSS).

## Images

| Page type | Scene / hero image | Result panels |
|-----------|-------------------|---------------|
| Scenario levels | `fetchpriority="high"` + `decoding="async"` | `loading="lazy"` + `decoding="async"` |
| Home | `self-awareness.svg` with `fetchpriority="high"` | — |

Scenario pages also `<link rel="preload" as="image">` the active scene artwork in `<head>` so the LCP image starts downloading early.

## CSS

- GitHub footer icon uses `.footer-github-link` background swap (no extra JS or second `<img>` fetch on hover setup).
- `prefers-reduced-motion: reduce` short-circuits animations/transitions for users who prefer less motion.

## Files touched

- `css/style.css` — font import removed, motion prefs, footer icon CSS
- `js/script.js` — full refactor
- All 9 HTML pages — head preconnect/fonts, footer link, scenario buttons & image hints

## Optional next steps (not done)

- Compress `assets/physical/*.jpg` (largest payload on scenario pages)
- Add a service worker or HTTP cache headers on the host for `style.css` / `script.js`
- Split CSS into critical vs deferred if the stylesheet grows further

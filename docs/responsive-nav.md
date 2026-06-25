# Responsive Navigation

The site navigation collapses into a hamburger menu on viewports **760px wide or narrower**.

## Markup

Every page with a `<nav>` includes:

- A `.nav-toggle` button with `aria-label`, `aria-expanded`, and `aria-controls="nav-menu"`
- A `<ul id="nav-menu">` containing the main links and the Bullying dropdown

## Behavior

| Viewport | Layout |
|----------|--------|
| > 760px | Horizontal bar (unchanged desktop layout); hamburger hidden |
| ≤ 760px | Logo + hamburger on one row; menu panel slides open below |

On mobile:

1. Tap the hamburger to open/close the menu (`nav.nav-open` toggles the panel).
2. Tap **Bullying** to expand/collapse the Physical / Cyber submenu inline (accordion).
3. Tap any other link to navigate and close the menu.
4. Tap outside the nav or resize above 760px to close the menu.

## Files

- **CSS:** `css/style.css` — `.nav-toggle`, `@media (max-width: 760px)` block
- **JS:** `js/script.js` — `initMobileNav()` wired on `DOMContentLoaded`

## Full-bleed submenu (Physical / Cyber)

The expanded Bullying submenu spans the **entire viewport width** edge-to-edge:

- `ul ul` uses a full-bleed technique — `width: 100vw` with `margin-left/right: calc(-50vw + 50%)` — so the dark panel reaches both viewport edges regardless of the nav's side padding.
- `#nav-menu` keeps `overflow: hidden` for its collapse animation, but `nav.nav-open #nav-menu` switches to `overflow: visible` so the full-bleed panel isn't clipped back inside the nav padding while open. On close, removing `nav-open` restores `overflow: hidden` so the collapse animation still clips cleanly.

## Design tokens

The mobile panel reuses `--brand-darker`, `--brand-dark`, `--font-nav`, `--ease`, `--radius-sm`, and `--accent` for focus/chevron cues.

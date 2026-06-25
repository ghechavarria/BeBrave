# Info Page Redesign (`info.html`)

A layout/visual-hierarchy redesign of the **What is Bullying?** page. All original
educational content is preserved verbatim — only its structure and presentation
changed. The page still lives inside the shared `#main-landing` hero (the blue
`--hero` gradient), with readable white/glass cards on top, matching the rest of
the site.

## Goals

- Stronger visual hierarchy and a clear, scannable reading flow.
- Comfortable line length and left-aligned body copy for long passages.
- Break dense bullet lists into modern, scannable components (fact cards,
  checklist grids, numbered steps, resource cards).
- Stay consistent with the existing design system (tokens, fonts, radii,
  shadows, easing) — no new palette.
- Fully responsive; the shared nav and 760px hamburger behavior are untouched.

## Structure

The page is now a sequence of `.info-section` blocks under
`#main-landing.info-page`:

1. **Hero** (`.info-hero`) — floating `assets/empathy.svg` illustration, an
   `.info-eyebrow` label, and the `What is Bullying?` `.section-title`.
2. **Definition** — the CDC definition + "what bullying is not" in an
   `.info-callout` (left-accent readable card).
3. **Common Types of Bullying** — `.fact-grid` of 5 `.fact-card`s (icon + term +
   definition).
4. **Warning Signs** — `.check-grid.is-warning` checklist.
5. **What to Do If You're Bullied** — `.steps` numbered list.
6. **To Stay Safe In The Future** — `.steps` numbered list.
7. **Online & Cyber Bullying** (`.info-section--major`) — eyebrow + second
   `.section-title` + intro `.info-callout`.
8. **Common Forms Online** — `.check-grid` checklist.
9. **Signs of Cyberbullying** — `.check-grid.is-warning` checklist.
10. **What to Do Online** — `.steps` numbered list.
11. **How It Differs From Physical Bullying** — `.fact-grid` of 5 `.fact-card`s.
12. **Stand Up for Others** — feature `.info-callout.is-feature` with an icon
    `.callout-title`.
13. **Practice What You Learn** — `.info-cta` banner with two `.info-btn`s.
14. **Resources** — `.resource-grid` of external `.resource-card` links.

Each sub-section heading uses `.info-subhead` (white over the gradient with an
accent underline); the two top-level titles keep the shared `.section-title`.

## New CSS classes (all in `css/style.css`, scoped to the info page)

| Class | Purpose |
| --- | --- |
| `.info-page` | Page hook on `#main-landing` (tightens vertical rhythm) |
| `.info-hero` | Centered hero (image, eyebrow, title) |
| `.info-eyebrow` | Small uppercase accent pill label |
| `.info-section` / `.info-section--major` | Section wrapper / extra top space before a major title |
| `.info-subhead` | White sub-section heading with accent underline |
| `.info-callout` / `.is-feature` / `.callout-title` | Readable highlighted text block; feature variant; icon heading |
| `.fact-grid` / `.fact-card` / `.fact-icon` | Icon + term + definition card grid |
| `.check-grid` / `.is-warning` / `.check-item` | Compact checklist grid (chevron marker; amber `!` for warnings) |
| `.steps` / `.step` | CSS-counter numbered advice steps (gradient number badge) |
| `.info-cta` / `.info-btn` / `.is-accent` / `.info-btn-row` | Practice call-to-action banner + buttons |
| `.resource-grid` / `.resource-card` / `.resource-name` / `.resource-host` / `.resource-go` | External resource link cards |

All components draw on existing tokens only (`--brand`, `--accent`,
`--accent-deep`, `--surface`, `--surface-2`, `--surface-glass-strong`, `--hero`,
`--ink`, `--ink-soft`, `--radius*`, `--shadow*`, `--ease`, font variables).

## Responsiveness

- All grids use `repeat(auto-fit, minmax(...))`, so they collapse to a single
  column on narrow screens with no extra breakpoints.
- Spacing uses `clamp()` throughout.
- Hover/transition polish uses `--ease` and is disabled under
  `prefers-reduced-motion` by the existing global rule.

## Shared-CSS impact / regression safety

- The legacy info-only classes `.para-center`, `.bully-list`, and `.info-list`
  are no longer used by `info.html`; their rules remain in `style.css` but are
  inert (they were never referenced by any other page).
- No shared selectors were modified. `.section-title`, `#main-landing`,
  `#center-title`, the nav, and the footer are unchanged, so `index.html`,
  `about.html`, and the scenario pages are unaffected. New rules are namespaced
  to info-page-only class names.

# BeBrave! — Modernization & Game Mechanics

This document describes the visual modernization of the BeBrave! site and the
game-like behavior added to the interactive bullying scenarios.

## Goals

- Modernize the look and feel of every page.
- Make the scenario pages feel like a small game (progress, scoring, feedback).
- Keep the **BeBrave!** logo exactly as-is (the `Righteous` font is the brand mark).

Core styling and game logic live in:

- `css/style.css` — full visual redesign (design tokens + components).
- `js/script.js` — game logic injected at runtime.

Scenario pages in `physical_bully/` and `online_bully/` use a shared **game-stage**
markup pattern (full-screen scene image, scrim, prompt bubble, A/B answer grid,
and hidden result panels). See `physical_bully/scenario1.html` as the reference.

## Design system (`css/style.css`)

### Fonts

| Role | Font | Where |
| --- | --- | --- |
| Logo (unchanged) | `Righteous` | `#logo`, `.logo-notnav` |
| Headings / game UI | `Fredoka` | titles, HUD, choice CTAs |
| Body copy | `Nunito` | paragraphs, lists |

### Tokens

Colors, radii, shadows, and easing are defined as CSS custom properties under
`:root` (e.g. `--brand`, `--accent`, `--good`, `--bad`, `--radius`, `--shadow-md`).
Change a value once to re-theme the whole site.

### Key component updates

- **Nav** — clean corporate bar (see **Navigation fixes** below).
- **Hero (`#main-landing`)** — radial blue gradient with soft accent glows; the
  centered illustration gently floats.
- **Home option cards (`.option`)** — translucent cards that lift on hover and
  reveal a `Play →` cue.
- **Info / About** — content now sits on readable light cards (`.para-center`,
  `.info-list`, `.about-member`) with accent borders and custom list markers.
- **Footer** — solid dark-navy band with a hover-animated GitHub icon.
- **Responsive** — layout collapses gracefully under 720px; honors
  `prefers-reduced-motion`.

## Navigation fixes

The nav bar was reworked for usability and a cleaner, more corporate look
(inspired by poweruppersonnel.com) using the existing `:root` BeBrave tokens.

- **"Play →" cue scoped to games** — the home **What is Bullying?** card links to
  `info.html` (educational content, not a game), so it carries the `option-learn`
  class and is excluded from the `.option::after` `Play →` hover cue via
  `.option:not(.option-learn)`. The Physical and Cyber cards still show `Play →`.
- **Dropdown no longer disappears** — the previous `margin-top: 6px` on the
  dropdown created a dead gap, so moving the cursor toward Physical/Cyber dropped
  the `:hover`. The dropdown now sits flush under its parent via `top: 100%` (no
  margin), an invisible `.has-dropdown::before` bridge spans any sub-pixel gap,
  and `li:hover > ul, li:focus-within > ul` keeps it open (including for keyboard
  users).
- **Markup** — each Bullying `<li>` now carries `class="has-dropdown"` across all
  pages (`index.html`, `info.html`, `about.html`, and the six `scenarioN.html`
  pages) to anchor the bridge and dropdown reliably.
- **Restyled bar** — solid `--brand-darker → --brand-dark` vertical gradient,
  taller bar (`min-height: 74px`), evenly spaced right-aligned links, and a
  subtle animated **accent underline** on hover/focus instead of pill buttons.
  The `Righteous` `#logo` is untouched. Mobile rules under 720px still stack the
  bar, hide the underline cue, and inline the dropdown.

## Scenario game (`js/script.js`)

The scenario pages use delegated click handlers on `#scene` via `data-choice="correct|wrong"`
(see `js/script.js` and `docs/performance.md`), replacing the original inline
`onclick` hooks. Vanilla JavaScript (no jQuery) drives the HUD, points, and feedback.

### HUD

On any `scenarioN.html` page, a heads-up display is injected above the scene:

- **Progress** — `Level X of 3` plus an animated progress bar.
- **Bravery Points** — a running score with a star badge.

### Scoring & state

- A correct ("brave") choice awards `POINTS_PER_CORRECT` (default **10**).
- The score is stored in `sessionStorage` under `bebrave_points`, so it
  **persists across the three scenario pages** within a track.
- The score resets automatically when the player lands on scenario 1.

### Feedback

- **Correct** → green banner `✓ Brave choice! +10 Bravery`, points pop/animate,
  progress bar advances.
- **Incorrect** → red banner `↺ Let's rethink that one` with a shake animation.
- The relevant feedback panel scrolls into view smoothly.

### Tunable constants

At the top of `js/script.js`:

```js
const POINTS_PER_CORRECT = 10; // points per brave choice
const TOTAL_STEPS = 3;         // scenarios per track
const STORAGE_KEY = "bebrave_points";
```

## Testing notes

Because the scenario links use root-absolute paths (e.g.
`/physical_bully/scenario1.html`), serve the folder from its root rather than
opening files directly:

```bash
python -m http.server 8123
# then visit http://127.0.0.1:8123/index.html
```

Verified flows: home → scenario, correct/incorrect feedback, points increment,
progress bar advance, and score persistence from scenario 1 → 2.

## Scenario tracks

Both bullying tracks follow the same three-scenario arc:

| # | Physical (`physical_bully/`) | Cyber (`online_bully/`) |
| --- | --- | --- |
| 1 | Witnessing someone bullied (Jorge / Trevor) | Witnessing cyberbullying (mean comments on Jorge's post) |
| 2 | You are being bullied (lunch table) | You are being cyberbullied (embarrassing photo in group chat) |
| 3 | Your best friend confides she is bullied | Your best friend confides about fake online rumors |

Each track ends at `info.html` after scenario 3.

### Physical scenario images

Scene and result art lives in `assets/physical/`. Scenario 3 uses
`yourFriendIsGettingBullied.jpg` (scene) and `YourFriendIsGettingBulliedHAPPY.jpg` /
`YourFriendIsGettingBulliedSAD.jpg` (results).

### Cyber scenario images (placeholder)

Final cyber illustrations are not ready yet. All three `online_bully/scenarioN.html`
pages reference `assets/cyber/placeholder.svg` for scene and result panels.

The placeholder uses BeBrave colors (`#1b527b`, `#2f7fd1`, `#ffcb45`) with a phone/chat
motif and an "Art coming soon" label. See `docs/cyber-placeholder.md` for swap-in notes
when real art is added.

### Viewport-bounce fix (answer selection)

Clicking an answer used to make the page visibly jump/bounce. The cause was the
`panel.scrollIntoView({ behavior: "smooth", block: "center" })` call in `showPanel()`
(`js/script.js`): because every `.game-stage` is sized to a full viewport
(`min-height: calc(100dvh - 74px)`), centering a full-height panel always forced a
scroll. That call was removed. The question stage and result panels are siblings of
identical height anchored just below the sticky nav, so hiding `#scene` and revealing
the result swaps them in place with no scroll. Result stages (`#right-answer` /
`#wrong-answer`) now use `justify-content: center` instead of inheriting `flex-end`, so
the banner + prompt + Next button stay in view without clipping. The page now only
moves when the user scrolls.

### Footer-peek / residual jump fix

After removing `scrollIntoView`, a smaller jump remained: answer screens shifted enough
to reveal the footer. Root cause was `min-height` on `.game-stage`. With `min-height`,
a tall question stage (long prompt) grew past the viewport, while the shorter result
stage collapsed back to the minimum — so swapping them changed the document height, and
browser scroll anchoring nudged the scroll position, letting the footer peek in.

Fix: both stages are now pinned to an exact `height: calc(100dvh - 74px)` (mobile:
`calc(100dvh - 120px)`) so question and result occupy identical viewport space and swap
with zero layout shift. `nav (74px) + stage = exactly 100dvh`, keeping the footer fully
below the fold. Tall content is guarded with `max-height: 100%; overflow-y: auto` on
`.stage-content` (the immersive full-bleed background is untouched), and
`overflow-anchor: none` on the scenario `#main-landing` disables anchoring jumps. No
programmatic scrolling was reintroduced — the page only moves when the user scrolls.

## Site-wide consistency pass (2026)

A follow-up pass aligned every page to the same modern, kid-friendly structure while
keeping all original content, links, and game flows intact.

### Page structure

Every HTML page now shares:

- `lang="en"` on `<html>`
- `<meta name="viewport">` for mobile-first layout
- Descriptive `<title>` and `<meta name="description">` per page
- Skip link (`.skip-link`) → `#main-content` for keyboard users
- `aria-label="Main navigation"` on `<nav>`
- Mobile hamburger (`.nav-toggle` + `#nav-menu`) — see `docs/responsive-nav.md`
- `defer` on `js/script.js`; **jQuery removed** from all scenario pages
- Correct stylesheet path `../css/style.css` from scenario folders (was `../../css/style.css`)

`physical_bully/scenario1.html` is the reference markup for scenario pages.

### Accessibility

- Meaningful `alt` text on hero illustrations, scene images, and result panels
- `rel="noopener noreferrer"` on external links (GitHub, stopbullying.gov)
- `aria-label` on icon-only GitHub footer link
- Visible keyboard focus on skip link, nav toggle, answer buttons, and CTAs
- Semantic headings restored on About (team member names as `<h2 class="member-name">`)

### CSS utilities added

| Class | Purpose |
| --- | --- |
| `.skip-link` | Off-screen until focused; jumps to main content |
| `.section-title` | Info / About hero headings over the blue gradient |
| `.member-name` | Team member names on the About page |

### Hero illustrations

- **Home** uses the original committed `assets/self-awareness.svg` (do not replace).
- **Info** uses `assets/empathy.svg`; **About** uses `assets/friends.svg` — simple branded flat SVGs in BeBrave colors.
- Cyber scenario panels still use `assets/cyber/placeholder.svg` until final art is ready.

### Scenario content fixes

- Replaced placeholder *lorem ipsum* feedback copy in physical scenarios 1–2 with kid-friendly outcome text.
- Removed broken references to missing SVGs (`scaredgirl.svg`, `scaredboy.svg`, `huge.svg`) from scenario pages — the immersive `.game-stage` is the only visible hero on those pages.
- Fixed malformed markup in `online_bully/scenario1.html` (missing `#wrong-answer` wrapper).

### Blue background refresh

- Replaced the corner radial `--hero` (which faded into a muddy mid-blue `#2a649f`) with a clean **152° azure-to-indigo diagonal** (`#5ea3f2 → #3d7fdd → #29539f`). Smoother transitions, airier top-left, calmer deep base — a more contemporary feel with strong contrast for white text.
- Refined the `#main-landing::before` glow into a subtle two-layer mesh (soft white top-right, soft light-blue bottom-left) — fewer, gentler glows and no yellow tint, so the hero reads cleaner.
- Lightly cooled the two darker brand navies for cohesion (`--brand-dark` `#1b527b → #1f548c`, `--brand-darker` `#11385a → #102c4f`); these drive nav/footer backgrounds and dark text and still meet contrast. `--brand`, `--accent`/`--accent-deep` are unchanged.

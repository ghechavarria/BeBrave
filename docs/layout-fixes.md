# Scenario Layout Fixes

## White strip at bottom (mobile / narrow viewports)

### Symptom
On scenario pages, a white band appeared below the stage artwork on smaller
viewports — the body background (`--surface-2`) showing through between the
game stage and the footer.

### Root cause
`#main-landing:has(.game-stage)` used `min-height: calc(100dvh - 74px)` while
`.game-stage` on mobile used a shorter `height: calc(100dvh - 120px)`. The
container was taller than its child by ~46px, leaving an empty gap that showed
the page background.

The mobile nav is actually ~60px tall (not 120px), so the 120px subtraction
also under-filled the viewport.

### Fix (in `css/style.css`)
- Added `--nav-offset` CSS variable (`74px` desktop, `60px` mobile).
- Both `#main-landing:has(.game-stage)` and `.game-stage` now use the same
  `calc(100dvh - var(--nav-offset))` height so they always match.
- Set scenario `#main-landing` background to `#081a2b` (matches the stage scrim)
  and hid the hero gradient `::before` overlay on scenario pages.
- Removed the mismatched mobile `120px` override on `.game-stage`.

This fix applies to all scenario pages (physical and online) because they share
the same CSS.

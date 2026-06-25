# Home Page Full-Viewport Hero

## Goal
Make the home page landing content fill the full viewport height (below the sticky nav) so the title, tagline, and option cards sit centered on screen without leaving empty space.

## Change
Added a height rule in `css/style.css` scoped to the home variant of the shared `#main-landing` container:

```css
#main-landing:has(#main-options) {
    min-height: calc(100svh - var(--nav-offset));
    min-height: calc(100dvh - var(--nav-offset));
}
```

## Why this selector
`#main-landing` is reused across `index.html`, `info.html`, and `about.html`. Using `:has(#main-options)` targets only the home page (the only page containing the `#main-options` card grid), leaving the other pages unaffected.

## Notes
- `100svh`/`100dvh` are used (with `svh` first as a fallback) so the layout accounts for mobile browser UI chrome.
- `var(--nav-offset)` (74px desktop / 60px mobile) is subtracted so the hero fills the space remaining under the sticky nav.
- `#main-landing` already uses `justify-content: center`, so the content stays vertically centered within the now-taller container.

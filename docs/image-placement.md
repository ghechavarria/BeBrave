# Scenario Stage Image Placement

This document records the `object-position` focal placement chosen for every
full-bleed scenario artwork (`.stage-img`) used across the BeBrave scenario
game pages, and the reasoning behind each value.

## Why these values

Each scenario page renders an artwork image with `object-fit: cover` behind a
dark scrim and a prompt bubble + answer buttons that are pinned to the **bottom**
of the screen (`.game-stage { justify-content: flex-end; }`). Because the lower
portion of every image is visually covered by the scrim and UI, the key subject
(faces, the bullying interaction) reads best when kept in the **upper-middle**
region of the frame.

`object-fit: cover` crops the **top/bottom** on wide viewports and the **sides**
on narrow/portrait viewports. Percentage-based `object-position` adapts
reasonably across both, so a single well-chosen value per image keeps the
subject visible without per-breakpoint overrides.

## Implementation

- Base default in `css/style.css` on `.stage-img`: `object-position: center 30%;`
  (favors the upper-middle for any image that doesn't override it).
- Per-image tuned values are set with an inline `style="object-position: …;"`
  on each `<img class="stage-img">` so each artwork gets its own focal point.
- `object-fit: cover` and the bubble/answer layout were left unchanged.

## Path fix

Several result-state images used absolute root paths (`src="/assets/physical/…"`),
which break on GitHub Pages project sites and when opened locally. These were
corrected to the relative form (`src="../assets/physical/…"`) to match the
working `#scene` images in the same files. No other structure/JS/text changed.

## Per-image placements

| Image file | Used on | Focal subject location | object-position | Mobile override | Rationale |
|---|---|---|---|---|---|
| `assets/physical/SomeoneGetsBulliedSIGNED.jpg` | physical scenario1 `#scene` | Sitting victim (left), standing bully (center), observer (right) | `24% 52%` | `18% 55%` @ ≤720px | Victim sits on the left at ground level; left + lower bias keeps him visible on narrow crops instead of cropping to the standing bully only. |
| `assets/physical/SomeoneGetsBulliedHAPPY.jpg` | physical scenario1 right answer | Single girl, centered, face ~upper-middle | `center 35%` | – | Centered subject; keeps her face well above the prompt bubble. |
| `assets/physical/SomeoneGetsBulliedREGRET.jpg` | physical scenario1 wrong answer | Same composition as HAPPY (sad expression) | `center 35%` | – | Matches HAPPY framing for a consistent before/after read. |
| `assets/physical/youAreGettingBullied.jpg` | physical scenario2 `#scene` | Three characters; all faces in the upper third, main (hijab) girl centered | `center 28%` | – | Pulls the three faces high; the central main subject stays visible even when the side faces are cropped on narrow screens. |
| `assets/physical/YourFriendIsGettingBulliedHAPPY.jpg` | physical scenario2 & scenario3 right answer | Single blonde girl, centered, face upper-middle | `center 32%` | – | Centered subject; face sits above the bottom UI on all viewports. |
| `assets/physical/YourFriendIsGettingBulliedSAD.jpg` | physical scenario2 & scenario3 wrong answer | Same composition as HAPPY (sad expression) | `center 32%` | – | Matches HAPPY framing for a consistent before/after read. |
| `assets/physical/yourFriendIsGettingBullied.jpg` | physical scenario3 `#scene` | Crying girl on a couch, slightly left of center, face in upper area | `45% 25%` | – | Keeps her tearful face high and visible; slight left bias matches her position so she isn't cut on narrow crops. |
| `assets/cyber/placeholder.svg` | online scenario1/2/3 (all 9 stage images) | Compact centred speech bubble | `center 42%` via `.stage-img--placeholder` | – | Uses `object-fit: contain` (not cover) so the small bubble stays visible; stage background matches the SVG gradient. |

## Follow-up

When the online (cyber) scenarios receive real artwork, replace the
`assets/cyber/placeholder.svg` references and revisit each `object-position`
using the same upper-middle-subject approach used for the physical scenarios.

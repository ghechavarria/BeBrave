# Retry on Wrong Answer

## Goal
Let players who pick the unhelpful answer go **back to the question and try again**, with the retry control sitting right next to the **Next** button.

## Behavior
- **Correct answer:** unchanged — shows the green "Brave choice! +10 Bravery" banner at the top, then the explanation and **Next**.
- **Wrong answer:** instead of a top banner, a red **"↺ Let's rethink that one"** button appears inline, immediately to the left of **Next**. Clicking it returns to the scene (the question) so the player can choose again. **Next** still advances to the following scenario.

## Implementation

### `js/script.js`
- `showPanel()` now branches on the result type:
  - `bad` → injects a `.retry-btn` as the first child of the panel's `<form>` (so it renders next to the submit `Next` button) and keeps the shake animation. No top banner.
  - `good` → injects the `.result-banner` as before.
- New `retryQuestion()` function:
  - Hides `#wrong-answer`, clears its `show-feedback`/`shake` state, and removes the injected retry button.
  - Re-shows `#scene`.
  - Rewinds the progress-bar fill to the start of the current step (`(currentStep() - 1) / TOTAL_STEPS`), since a wrong attempt awards no points.

### `css/style.css`
- `form` is now a centered flex row with a gap and `flex-wrap`, so the retry button and **Next** sit side-by-side (and wrap on very narrow screens).
- Added `.retry-btn` (red gradient, pill, matches the wrong-answer color language) and `.retry-icon` (the circular ↺ badge).

## Scope
Handled entirely in shared JS/CSS, so it applies automatically to all six wrong-answer panels — physical scenarios 1–3 and cyber scenarios 1–3 — with no per-page HTML edits.

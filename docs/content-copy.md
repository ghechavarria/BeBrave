# Content Copy Updates

Summary of placeholder replacement and scenario wording improvements across the BeBrave site (June 2026).

## Placeholder Text Replaced

### `physical_bully/scenario1.html`
- **Lorem ipsum** in `#right-answer` and `#wrong-answer` feedback panels replaced with outcome narratives:
  - Correct: adult intervention helps Jorge; speaking up safely is brave.
  - Wrong: walking away leaves Jorge alone and may let bullying continue.
- **Empty `alt` attributes** on result-stage images filled with descriptive text.

### `physical_bully/scenario2.html`
- **Lorem ipsum** in both result panels replaced with:
  - Correct: telling a teacher addresses bullying without fighting back.
  - Wrong: punching escalates the situation and may get you in trouble.
- **Empty `alt` attributes** on result-stage images filled with descriptive text.

### `physical_bully/scenario3.html`
- No lorem ipsum (already had real feedback). **Empty `alt` attributes** on result images updated.

### `online_bully/scenario1.html`, `scenario2.html`, `scenario3.html`
- No lorem ipsum in body copy. **Empty `alt` attributes** on result-stage placeholder images updated with scenario-appropriate descriptions.
- Image `src` paths to `placeholder.svg` left unchanged (intentional asset placeholders per `docs/cyber-placeholder.md`).

### `about.html`
- Added missing **`alt` text** on team illustration, three profile photos, and GitHub icon.

### `index.html`
- Added missing **`alt` text** on footer GitHub icon.

### No changes needed
- `info.html` — educational content was already complete with proper alt text on images.

---

## Scenario Wording Improvements

All six scenarios now use the consistent question **"What will you do?"** and shorter, parallel answer-option phrasing (imperative style without leading "You choose to…" / "You screenshot…").

### Physical track

| File | Changes |
|------|---------|
| `scenario1.html` | Tightened walk-home narrative; answers → "Find a trusted adult to help" / "Ignore it and keep walking". |
| `scenario2.html` | Condensed lunch-table story; answers → "Punch one of them" / "Stay calm, ignore them, and tell a teacher what happened". |
| `scenario3.html` | Streamlined friend-confides setup; aligned wrong answer with online track ("Why didn't you tell your parents or ask an adult for help?"); improved empathetic correct response wording. |

**onclick wiring verified:** `showCorrect()` / `showWrong()` match the pedagogically better choice in every physical scenario.

### Online (cyber) track

| File | Changes |
|------|---------|
| `scenario1.html` | Grammar and tense polish on Jorge cyberbullying story; shortened answer options. |
| `scenario2.html` | Question consistency; answers shortened to parallel imperative form. |
| `scenario3.html` | Opening line aligned with physical scenario 3; wrong/correct friend responses matched to physical track wording for consistency across tracks. |

**onclick wiring verified:** `showCorrect()` / `showWrong()` match the pedagogically better choice in every online scenario.

---

## Files Touched

- `physical_bully/scenario1.html`
- `physical_bully/scenario2.html`
- `physical_bully/scenario3.html`
- `online_bully/scenario1.html`
- `online_bully/scenario2.html`
- `online_bully/scenario3.html`
- `about.html`
- `index.html`
- `docs/content-copy.md` (this file)

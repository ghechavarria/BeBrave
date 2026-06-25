# Netlify Deploy Notes

## Build failure: Node 12 vs Puppeteer (prerender extension)

**Symptom:** Production build failed during "Installing extensions → prerender":

```
Failed at the puppeteer@24.35.0 postinstall script.
SyntaxError: Unexpected reserved word   (puppeteer/install.mjs)
npm WARN notsup Unsupported engine ... (current: {"node":"12.18.0"})
```

**Cause:** Netlify built on Node 12.18.0. The auto-enabled prerender extension installs Puppeteer, whose `postinstall` requires Node ≥ 18, so it crashed and aborted the deploy.

**Fix:** `netlify.toml` + `.nvmrc` pin Node 20:

```toml
[build]
  publish = "."
  command = "echo 'Static site — nothing to build.'"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--no-optional"
```

## HUD not showing on Netlify (pretty URLs)

**Symptom:** The "Level X of 3" progress bar and Bravery points HUD appeared locally (pages open as `scenario1.html`) but **not on Netlify**.

**Cause:** Netlify serves "pretty URLs" — it strips the `.html` extension, so `location.pathname` is `/physical_bully/scenario1` instead of `/physical_bully/scenario1.html`. The detection regex in `js/script.js` required a trailing `.html`, so `isScenarioPage()` returned `false` and the HUD was never built.

**Fix:** Made the extension optional (also tolerates a trailing slash):

```js
const SCENARIO_RE = /scenario([123])(?:\.html)?\/?$/;
```

This matches `scenario1`, `scenario1.html`, and `scenario1/` so the HUD builds in every environment. `currentStep()` uses the same regex, so the level number is also detected correctly.

## Notes

- BeBrave is a fully static HTML/CSS/JS site; no `package.json` is required.
- If you don't want prerendering, disable the prerender extension in the Netlify UI (Site configuration → Build & deploy → Extensions). Pinning Node 20 fixes the build regardless.

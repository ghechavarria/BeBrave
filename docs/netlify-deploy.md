# Netlify Deploy Configuration

## The failure

The production build failed during **"Installing extensions → prerender"** with:

```
Failed at the puppeteer@24.35.0 postinstall script.
SyntaxError: Unexpected reserved word   (puppeteer/install.mjs)
npm WARN notsup Unsupported engine ... (current: {"node":"12.18.0","npm":"6.14.4"})
```

### Root cause
- Netlify was building on **Node 12.18.0** (a very old default for this site).
- Netlify's auto-enabled **prerender** extension installs **Puppeteer**, whose `postinstall` (`install.mjs`) uses modern ESM syntax and requires **Node ≥ 18**.
- On Node 12 the install script throws `Unexpected reserved word`, so dependency installation exits non-zero and the whole build fails — before our static files are ever published.

This was **not** a problem with the site's HTML/CSS/JS. BeBrave is a fully static site with no build step.

## The fix

Added `netlify.toml` and `.nvmrc` at the repo root.

### `netlify.toml`
```toml
[build]
  publish = "."
  command = "echo 'Static site — nothing to build.'"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--no-optional"
```

- **`NODE_VERSION = "20"`** — the key fix; lets the prerender extension's Puppeteer postinstall run successfully.
- **`publish = "."`** — serves the repo root, where `index.html` and the `assets/`, `css/`, `js/` folders live.
- **`command`** — a harmless no-op so Netlify doesn't look for a missing build script.
- **`NPM_FLAGS = "--no-optional"`** — skips unnecessary optional platform binaries to speed up the extension install.

### `.nvmrc`
```
20
```
Belt-and-suspenders: ensures Node 20 is selected even if the TOML environment is overridden.

## Notes / alternatives
- If you don't want prerendering at all, you can disable the **prerender** extension in the Netlify UI (Site configuration → Build & deploy → Extensions). Pinning Node 20 fixes the build regardless.
- No `package.json` is required for this static site; none was added.

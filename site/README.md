# site/

The goalfeed.ca landing page and docs shell. Plain HTML/CSS, no framework, no
build step, no bundler — the whole site is what's checked in here.

## What's hand-written vs. generated

Hand-written, edit these directly:

- `index.html`, `404.html`, `docs/*.html` (content pages) — page markup.
- `docs/_shell.html` — reference template for new docs pages (not published
  itself; copy it, don't link it).
- `styles.css` — the whole design system (tokens, components, page rules).
  Read `DESIGN.md` before changing anything in here.
- `site.js` — vanilla JS for the install tabs, copy buttons, and the
  simulated goal-feed demo. No dependencies, no build step.

Generated, **do not hand-edit** — regenerate instead (see below):

- `assets/wordmark-dark.svg`, `assets/wordmark-light.svg`, `assets/mark.svg`
  — plain copies of the masters in `../branding/`. The masters are canonical;
  these copies exist only because GitHub Pages publishes `site/` alone (see
  Deploy, below), so `../branding/*.svg` isn't servable.
- `assets/favicon.svg`, `assets/favicon-16.png`, `assets/favicon-32.png`,
  `assets/favicon.ico`, `assets/apple-touch-icon.png`, `assets/og-image.png`
  — rasterized/composited from the SVG masters by `../branding/build.py`.

## Regenerating brand assets

```
python3 branding/build.py
```

Run from the repo root. Requires `rsvg-convert` (librsvg) on `PATH` and
Pillow (`pip install pillow`) — the script checks for `rsvg-convert` and
fails with an install hint if it's missing. It's idempotent: every output is
rebuilt from the masters every run, nothing needs cleaning first, and running
it twice in a row produces byte-identical output.

Run it whenever `branding/wordmark-dark.svg`, `branding/wordmark-light.svg`,
or `branding/mark.svg` change. It writes everything listed under "Generated"
above into `site/assets/`.

## Deploy

Push to `main` → `.github/workflows/pages.yml` runs → it packages `./site`
(no build step, just the directory as-is) and publishes it to GitHub Pages →
`site/CNAME` points the custom domain at `goalfeed.ca`. There is no staging
environment; whatever is in `site/` on `main` is what's live, usually within
a minute or two of the push.

If you changed brand assets, run `python3 branding/build.py` and commit the
regenerated files in `site/assets/` — the workflow does not run the script
for you.

## Local preview

```
cd site && python3 -m http.server 8099
```

Then open `http://localhost:8099/`. This serves the site exactly as Pages
will (static files, no server-side behavior to diverge), including
`404.html` if you request a path that doesn't exist and `docs/` if you `cd`
into it. Check both color schemes — the whole site is CSS-only dark/light via
`prefers-color-scheme`, no toggle button and no flash, so switching your OS
or browser appearance setting is the way to see both.

## Content Security Policy

Every page ships a strict `<meta http-equiv="Content-Security-Policy">`: only
this origin plus Google Fonts (`fonts.googleapis.com`/`fonts.gstatic.com`) can
load anything, `object-src` and default script sources are locked to
same-origin, and there are no third-party trackers or analytics anywhere on
the site. One limitation worth knowing: `frame-ancestors` (clickjacking
protection) is intentionally **not** in the meta tag — the CSP spec ignores
that directive when delivered via `<meta>`, so including it would just be a
false sense of security. GitHub Pages doesn't support custom HTTP response
headers, so there's currently no way to set `frame-ancestors` for this site at
all; that's an accepted gap of static GH Pages hosting, not an oversight.

## Before shipping a design or content change

- Re-run `python3 branding/build.py` if any brand asset source changed.
- Preview locally (above) in both color schemes.
- Check 360px width and something wide (1440px+) — the layout has to hold at
  both; wide tables and code blocks scroll inside their own container, the
  page itself never scrolls horizontally.
- If you touched `styles.css` tokens, re-run `python3 branding/contrast.py`
  from the repo root and update `branding/BRAND.md`'s contrast tables if
  anything changed (it shouldn't — the palette is closed, see BRAND.md).

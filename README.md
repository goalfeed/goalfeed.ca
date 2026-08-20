<picture>
  <source srcset="site/assets/wordmark-light.svg" media="(prefers-color-scheme: light)">
  <img src="site/assets/wordmark-dark.svg" alt="Goalfeed" width="360" height="91">
</picture>

# goalfeed.ca

This repository is the source for [goalfeed.ca](https://goalfeed.ca), the marketing/docs site for the
[Goalfeed](https://github.com/goalfeed/goalfeed) project.

The site is hand-written static HTML and CSS — no framework, no build step, no `package.json`. What's
in `site/` is what gets deployed, byte for byte.

## Directory layout

```
branding/
├── BRAND.md              # canonical brand: palette, voice, mark usage — read this first
├── contrast.py            # recomputes the contrast tables in BRAND.md
├── wordmark-dark.svg       # wordmark master, dark grounds
├── wordmark-light.svg      # wordmark master, light grounds
├── mark.svg                # goal-light mark alone (favicon/avatar source)
└── build.py                 # generates favicons, apple-touch-icon, OG card from the masters above

site/
├── index.html      # home page
├── 404.html        # not-found page
├── styles.css      # shared design system — read site/DESIGN.md first
├── site.js         # vanilla JS: install tabs, copy buttons, demo feed
├── DESIGN.md       # how styles.css implements branding/BRAND.md; component reference
├── README.md       # generation/deploy/preview details for this directory
├── assets/         # generated only — favicons, OG card, wordmark copies (branding/build.py)
├── docs/           # documentation pages, plus _shell.html (reference template, not published)
├── CNAME           # custom domain (goalfeed.ca) for GitHub Pages
└── .nojekyll       # tells GitHub Pages not to run Jekyll over the output
```

## Local preview

No install, no build. From the repo root:

```bash
cd site
python3 -m http.server 8099
```

Then open http://localhost:8099 in a browser.

## Brand assets

`branding/BRAND.md` is canonical for the palette, voice, and mark usage rules.
Everything under `site/assets/` is generated from `branding/*.svg` by
`branding/build.py` — never hand-edit those files. To regenerate:

```bash
python3 branding/build.py
```

Requires `rsvg-convert` (librsvg) and Pillow (`pip install pillow`); see
`site/README.md` for details.

## Deploys

Pushing to `main` triggers `.github/workflows/pages.yml`, which packages the `site/` directory and
publishes it via GitHub Pages to the custom domain goalfeed.ca. There is no build job — the workflow
just checks out the repo and uploads `site/` as-is.

## Related

The main Goalfeed project (the goal-detection service this site documents) lives at
[github.com/goalfeed/goalfeed](https://github.com/goalfeed/goalfeed).

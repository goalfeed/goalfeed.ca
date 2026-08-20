# Contributing to goalfeed.ca

This repo is the source for [goalfeed.ca](https://goalfeed.ca) — the
documentation and marketing site for the [Goalfeed](https://github.com/goalfeed/goalfeed)
project. It's a small, mostly-solo project, so this doc is short on purpose.

## Which repo does this belong in?

Goalfeed is three repos. Filing an issue or PR in the right one saves everyone
time:

- **This repo, `goalfeed/goalfeed.ca`** — anything about the site itself:
  broken links, typos, missing or outdated documentation, layout/design bugs
  on goalfeed.ca.
- **[`goalfeed/goalfeed`](https://github.com/goalfeed/goalfeed)** — the Go
  service that actually detects goals and talks to Home Assistant. Bugs in
  goal detection, the API, config, or the bundled web UI belong there, not
  here.
- **[`goalfeed/hassio-goalfeed-repository`](https://github.com/goalfeed/hassio-goalfeed-repository)** —
  the Home Assistant Supervisor add-on packaging. Install/Configuration-tab
  issues belong there.

If you're not sure, open it here and it'll get redirected.

## No build step, on purpose

The site is hand-written static HTML and CSS. There is no bundler, no
framework, no `package.json`, no build step — `site/` is what gets deployed,
byte for byte. This is a deliberate choice for a small, mostly-static
documentation site, not a placeholder for a future framework migration.
**Please don't introduce one** (no Webpack/Vite/Next.js, no templating
engine, no client-side framework) without discussing it first — it would
change the deploy story (see below) and the maintenance burden for what is
currently a handful of plain files.

## Previewing locally

No install, no build:

```bash
cd site
python3 -m http.server 8099
```

Then open `http://localhost:8099`. Any static file server works equally well
if you prefer something else — there's nothing Python-specific about the
site itself.

## The design token system

`site/styles.css` defines the whole visual language as CSS custom properties
in `:root` — colors (`--bg`, `--surface`, `--accent`, `--text`, `--muted`,
etc.), type (`--font-display`, `--font-text`, `--font-mono`, the `--fs-*`
scale), spacing (`--sp-1` through `--sp-12`), and radius/shadow tokens. Read
the file header and **`site/DESIGN.md`** before touching styles — the
stylesheet documents its own section map (tokens → reset/base → layout
primitives → components → page-specific rules).

**New pages must use these existing tokens** (`var(--accent)`,
`var(--sp-6)`, etc.) rather than introducing one-off hex colors, pixel
spacing, or font stacks. If a page genuinely needs something the token set
doesn't cover, add a new token to the `:root` block in `styles.css` and use
it everywhere that need occurs — don't hardcode the value inline in the
page. The whole point of the token system is that the site reads as one
consistent thing across pages; one-off values are how that erodes.

## Adding or editing a page

Pages are plain HTML files under `site/` (docs pages under `site/docs/`).
Link to `../styles.css` (or `styles.css` from the root), reuse the existing
header/footer/nav markup from `site/index.html` rather than inventing a new
shell, and use the components already defined in `styles.css` (`.btn`,
`.card`, `.code-block`, `.callout`, `.badge`, table styles, etc.) instead of
new ad hoc markup where an existing component fits.

## Deploys

Pushing to `main` runs `.github/workflows/pages.yml`, which uploads the
`site/` directory as-is to GitHub Pages — there is no build job in that
workflow, because there's nothing to build. If your change works when
previewed locally with `python3 -m http.server`, it will look the same in
production.

## Reporting issues

Use the issue forms in `.github/ISSUE_TEMPLATE/` — the bug report form asks
for the page URL and browser up front, which is almost always what's needed
to reproduce a site issue.

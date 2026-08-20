# Changelog

All notable changes to this repo (the source for [goalfeed.ca](https://goalfeed.ca)),
written for the person reading the site — what changed for you, not what
changed in the diff. Format follows [Keep a
Changelog](https://keepachangelog.com/en/1.1.0/). This repo isn't versioned/
tagged (it's a site, deployed on every push to `main`), so entries are dated
instead.

## [Unreleased] — 2026-08

### Fixed

- **The site was serving a completely unstyled page.** The previous deploy
  workflow used `actions/configure-pages` with `static_site_generator: next`,
  which automatically injects a `/goalfeed.ca` basePath into the build.
  Every CSS, JS, and image request 404'd because nothing in the page actually
  lived under that path — visitors got raw, unstyled HTML.
- **Deploys had been silently failing since 2026-02-20.** A Dependabot bump
  of `next` from 13.4.2 to 15.5.10 removed `next export` (dropped in Next
  15), which the deploy workflow depended on to produce static output. Every
  push to `main` from that point built successfully in CI but never actually
  produced a deployable site.

### Changed

- **Replaced the Next.js app with a hand-written static site.** `site/` is
  now plain HTML and CSS — no framework, no bundler, no `package.json`, no
  build step. The deploy workflow (`.github/workflows/pages.yml`) now just
  packages `site/` and ships it directly; there is nothing left to break in
  a dependency bump.
- Removed the unused Next.js scaffold entirely: `next.config.js`,
  `tailwind.config.js`, `tsconfig.json`, `.eslintrc.json`, `package.json`,
  `yarn.lock`, and the placeholder `src/app/` page it shipped since project
  creation.
- Added `CONTRIBUTING.md`, `LICENSE`, `SECURITY.md`, and `CODE_OF_CONDUCT.md`.

## Before this pass

The repo began as an unmodified `create-next-app` scaffold (May 2023) with a
single placeholder page and a "goodbye message" commit, then sat mostly
untouched aside from dependency bumps until the Next 15 upgrade broke
deploys in February 2026. It never had a changelog before now because it
never had a release users could observe — the site was the only artifact,
and for most of that window it wasn't rendering correctly.

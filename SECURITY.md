# Security Policy

## Supported versions

This repo has no versioned releases — `main` is deployed to
[goalfeed.ca](https://goalfeed.ca) automatically on every push. There's one
supported version: whatever is currently live on the site.

## Reporting a vulnerability

goalfeed.ca is a static HTML/CSS site with no backend, no database, and no
user accounts, so the realistic scope here is narrow (e.g. a content-injection
issue, a malicious link, or a supply-chain concern in the GitHub Pages deploy
workflow) — but if you find something, please don't open a public issue for
it.

Use GitHub's private vulnerability reporting instead:

1. Go to the [Security tab on this repo](https://github.com/goalfeed/goalfeed.ca/security).
2. Click **Report a vulnerability**.
3. Describe the issue and how to reproduce it.

Or go directly to
[github.com/goalfeed/goalfeed.ca/security/advisories/new](https://github.com/goalfeed/goalfeed.ca/security/advisories/new).

If the issue is actually in the Goalfeed **service** (the Go binary, its API,
or its Home Assistant integration) rather than this documentation site, report
it against [`goalfeed/goalfeed`](https://github.com/goalfeed/goalfeed/security/advisories/new)
instead — see that repo's `SECURITY.md` for details, including its documented
no-auth/open-CORS posture (which is intentional there and not something to
re-report here).

This project doesn't publish a contact email for security reports — GitHub's
private advisory flow is the supported channel.

## Response time

This is a small, largely solo-maintained project. Expect an initial response
within about a week.

## Scope

In scope: the content and markup served from `site/`, and the GitHub Actions
deploy workflow (`.github/workflows/pages.yml`) that publishes it.

Out of scope: GitHub Pages itself, and the Goalfeed service in the separate
`goalfeed/goalfeed` repo (report there instead, as above).

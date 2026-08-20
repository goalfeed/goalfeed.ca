# Goalfeed — site design brief

**Canonical brand definition is `branding/BRAND.md`.** Palette values, voice,
name treatment, mark/wordmark rules, and the "what not to do" list all live
there and are not repeated here — this file only documents how `styles.css`
*implements* that brand for the site, plus the components pages are built
from. If something here looks like it disagrees with BRAND.md, BRAND.md wins;
fix this file.

Goalfeed is a self-hosted service, not a product with a marketing department.
The site should read like the thing itself: sports broadcast infrastructure.
The concept — **a warm siren in a cold arena** — is BRAND.md's, verbatim: dark
plate or ice-white plate, precise tabular numerals, one accent (the goal
light) that flares red the instant something scores, and otherwise gets out
of the way. Reference points: broadcast lower-thirds, arena centre-hung
scoreboards, penalty-box countdown clocks. NOT: SaaS gradients, glassmorphism,
floating 3D cards, hero blobs.

This file is the contract for `styles.css`. Anyone building more pages (docs,
etc.) on top of this site should read this first and reuse the tokens and
components below rather than inventing new ones.

## The one rule that matters most

**Accent is a signal, not a theme** (BRAND.md). `--accent` ships on exactly
four things:

1. The primary CTA (`.btn-primary`).
2. The goal-flare in the live demo (`.event-row.is-goal`, the `row-flare`
   keyframe, `.scoreline .team.is-flaring .team-score`).
3. The score digit that just changed (same `.is-flaring` rule as above).
4. The wordmark gradient (`branding/wordmark-*.svg`, not CSS).

Every other place that used to carry the old orange/cream accent — section
eyebrows, card hovers, tab underlines, nav underlines, the focus ring, text
selection, callout rules, code-block rules, syntax-highlight keywords, the
pipeline step numbers and connector line, the skip link, the hero's ambient
glow — now uses `--ice`, `--muted`, or `--border` instead. Before adding a new
`var(--accent)` anywhere, check this list; if what you're building isn't one
of the four things above, it doesn't get the goal light.

## Palette

Both themes are CSS custom properties on `:root`, values copied verbatim from
`branding/BRAND.md`'s tables (dark is the default expression of the concept —
an arena at night; light is **ice white**, never cream — two other fleet
projects, mail-muncher and katra, already own warm cream grounds, so
Goalfeed's light theme stays cold on purpose).

| token | dark | light | role |
|---|---|---|---|
| `--bg` | `#070b14` | `#f2f6fb` | page ground |
| `--surface` | `#0d1522` | `#ffffff` | header/footer, base cards |
| `--surface-2` | `#131d2e` | `#e7eef7` | raised cards, code blocks |
| `--border` | `#1e2b40` | `#cbd8e8` | hairlines |
| `--text` | `#e8eef7` | `#0b1626` | body text |
| `--muted` | `#93a4bd` | `#4a5c75` | secondary text, labels |
| `--accent` | `#ff3b2f` | `#d81f14` | **goal light — see the rule above** |
| `--accent-hot` | `#ff6a3d` | `#b8430d` | wordmark gradient partner, flare only |
| `--ice` | `#5cc8ff` | `#0a6ea8` | links, structural highlights, hovers |
| `--live` | `#3ddc97` | `#0d7a4f` | connection-alive indicators (`.badge--live`) |
| `--warn` | `#ffc447` | `#8a5a00` | caveats, work-in-progress badges |

`--surface-3` (hover-state lift) and `--border-soft` (soft divider) are
**derived**, not new colors: `color-mix()` blends of the tokens above, kept as
named custom properties only so component rules stay readable. `--*-wash` and
`--*-glow` tokens (`--accent-wash`, `--ice-wash`, `--live-wash`, `--warn-wash`,
`--accent-glow`) are translucent blends of their base color for backgrounds
and glows — same rule: they intensify an existing token, they never introduce
a new one.

**One documented contrast exception** (from BRAND.md, unchanged by this
file): light-mode `--accent` on `--surface-2` measures 4.36:1 — large
text/UI only, never body copy. It doesn't come up in practice since accent
never appears as body text on a code block; if a layout ever needs it, use
`--accent-hot` (4.67:1, AA) instead.

Re-run `python3 branding/contrast.py` after any palette edit — the tables in
BRAND.md are measurements, not decoration, and this file has no palette of
its own to keep in sync.

## Type

Three faces, three jobs, matching `branding/BRAND.md`'s typography table
exactly:

- **Display — "Big Shoulders Display"** (condensed, athletic, built for
  signage). Headings, the hero wordline, and anywhere a number needs to look
  like it belongs on a scoreboard. Fallback stack:
  `"Big Shoulders Display", "Oswald", "Arial Narrow", sans-serif`.
- **Text — "Public Sans"** (USWDS's face: neutral, highly legible, not a SaaS
  default). Body copy, nav, buttons. Fallback:
  `"Public Sans", -apple-system, "Segoe UI", Roboto, sans-serif`.
- **Mono — "JetBrains Mono"**. Code blocks, the JSON/event demo, labels,
  timestamps, badges — anything that should read as data. Fallback:
  `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`.

All three are open-licensed (SIL OFL 1.1) and served from Google Fonts with
real fallback stacks — see BRAND.md for the license note.

**Tabular numerals are mandatory anywhere a number can change**: score
digits, the event-feed timestamps, clock/period, and any future countdown or
count all carry the `.tabular` class (`font-variant-numeric: tabular-nums`),
so digits don't jitter or reflow as they update. If you add a new place a
score, count, or timestamp renders, add `.tabular` to it.

Type scale (fluid, `clamp()`-based, defined as custom properties):
`--fs-h1`, `--fs-h2`, `--fs-h3`, `--fs-lede`, `--fs-body` (1rem / 16px base),
`--fs-small`, `--fs-micro`.

## Spacing, radius, shadow

- Spacing scale: `--sp-1` (0.25rem) through `--sp-12` (6rem), power-of-flow
  rather than strict geometric, tuned for section rhythm.
- Radius: `--radius-sm` (6px) for buttons/badges, `--radius` (10px) for
  cards/code blocks, `--radius-lg` (16px) for the hero demo panel.
- Shadow: `--shadow-flare` is the only accent-colored shadow in the system —
  a soft red glow used behind the goal-light demo and on primary-button
  hover. Everything else stays flat; depth comes from border + surface
  steps, not drop shadows.
- Max widths: `--wrap` (1120px) is the page/content column;
  `--wrap-narrow` (760px) for prose-heavy sections and docs pages.

## Components (reusable — docs pages use these verbatim)

- **`.btn` / `.btn-primary` / `.btn-ghost`** — buttons. Primary carries the
  accent and the flare shadow on hover (one of the four permitted accent
  uses); default/ghost hover to `--ice`, never accent.
- **`.card`** — bordered surface block, used for the "how it works" steps,
  league grid, and dev-docs teaser cards. Hover moves the border to `--ice`.
- **`.code-block`** — `<pre>`-based code panel with a `data-lang` label, a
  copy button (`.copy-btn`), and a left rule in `--ice` (not accent — it's
  decorative, not a signal). Works standalone or inside `.tabs`.
- **`.tabs` / `.tab-list` / `.tab-panel`** — small dependency-free tab
  component (vanilla JS toggles `hidden` + `aria-selected`); used for the
  Install section. Selected tab's underline is `--ice`.
- **`.callout`** — bordered note block with a `.callout-tag`; `--warn` left
  rule by default (caution / work-in-progress). **`.callout--info`** swaps
  the rule to `--ice` for "good to know" asides — this replaced a
  `.callout--accent` modifier that no longer exists; accent doesn't belong on
  a note block.
- **`.badge`** — small pill label. Neutral by default. **`.badge--live`**
  uses the `--live` token (not accent) for "supported"/connection-alive
  status — the token name and the use finally match. **`.badge--wip`** uses
  `--warn`.
- **`.table-scroll` + `<table>`** — horizontally scrollable table wrapper;
  never let a wide table scroll the page.
- **`.breadcrumb`** — small mono trail (`Goalfeed / Docs / Page`), used on
  docs pages under the header. Current page is `<span aria-current="page">`,
  not a link.
- **`.doc-layout` / `.doc-sidebar` / `.doc-content`** — the docs page shell:
  a two-column grid (240px sidebar + fluid content column) that collapses to
  one column under 860px. The sidebar is grouped by Diátaxis mode (Get
  started / How-to / Reference / Explanation, per
  `PROJECT-STANDARDS.md`'s DOCS STANDARD) with the active page marked
  `aria-current="page"` (ice left-rule + `--surface-2` background). See
  `site/docs/_shell.html` for the reference markup — copy it for new docs
  pages rather than rebuilding the shell by hand.
- **Header (`.site-header`) / Footer (`.site-footer`)** — sticky header with
  wordmark (light/dark `<picture>`, `prefers-color-scheme`) + nav, plain
  footer with link groups. Both are structurally page-agnostic; a docs page
  drops them in unchanged (with `../` asset paths) and just adjusts which nav
  link carries `aria-current="page"`.
- **`.eyebrow`** — small caps/mono label above section headings, dot marker
  in `--ice` (not accent — it's structural, not a score).
- **`.pipeline`** — the 4-step "how it works" diagram, pure CSS/SVG, no JS.
  Step numbers and the connector line are `--ice`.
- **`.event-feed` / `.event-row`** — the goal-event demo list rows. `.is-goal`
  and the `.is-new` → `row-flare` keyframe are accent — this is the actual
  goal-flare, one of the four permitted uses.

## Rationale notes for whoever extends this

- Keep the accent rare — see "The one rule that matters most" above before
  reaching for `var(--accent)` on anything new.
- Every interactive element needs a visible `:focus-visible` ring — already
  global (`outline: 2px solid var(--ice)`), don't override it away and don't
  swap it back to accent.
- Wide content (tables, code) must live inside `.table-scroll` or
  `.code-block`'s own `overflow-x: auto` — never let the body scroll
  horizontally.
- `prefers-reduced-motion: reduce` is handled once, globally, by collapsing
  all animation/transition durations — new animated components don't need
  their own media query, just don't fight the global collapse with
  `!important`. The goal-flare specifically must never fire on page load or
  scroll (BRAND.md) — only in response to an actual simulated event tick.
- New score/clock/count displays get `.tabular` — see the Type section.

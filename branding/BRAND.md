# Goalfeed — Brand

Canonical brand definition for Goalfeed. Applies to the service repo
(`goalfeed/goalfeed`), the site (`goalfeed/goalfeed.ca`), and the Home Assistant
add-on repo (`goalfeed/hassio-goalfeed-repository`). Where any of those conflict
with this file, this file wins.

---

## Concept

**A warm siren in a cold arena.**

Goalfeed's whole job is one moment: the instant a number changes, something in
your house wakes up. The brand is built around the contrast that makes that
moment legible. The environment is cold — rink ice, arena dark, blue-grey
structural chrome, tabular numerals sitting still. The goal light is the only
warm thing anywhere in the system, and it appears only when something actually
scored. Red is not decoration here; it is a signal with a meaning, and spending
it on a section heading or a hover state devalues the one place it has to land.

That is also why the interface is quiet almost everywhere. A scoreboard is
mostly dark, mostly still, mostly waiting. The design has to be comfortable
waiting, so that the flare reads.

## Name treatment

- **`Goalfeed`** — one word, capital G, lowercase f. Never "GoalFeed",
  "goalFeed", "Goal Feed", or "GOALFEED" outside the wordmark artwork itself.
- The wordmark lockup may set the name in all caps as a graphic; running text
  never does.
- The domain is `goalfeed.ca`; the GitHub org is `goalfeed`. Both lowercase.
- The Home Assistant add-on is "the Goalfeed add-on", not "Hassio Goalfeed".

## Voice

**Precise, plain, unhyped, quietly enthusiastic about the moment.**

Goalfeed talks like someone explaining infrastructure they actually run at
home. It states what fires, when, and what does not fire. It gets to be a
little delighted about the goal horn going off, because that is the entire
point of the project — but the delight lives in the *thing described*, never
in adjectives about the software.

**What this voice refuses to do:** it does not say "seamless", "blazing fast",
"powerful", or "just works". It does not promise real-time and then mean
"within thirty seconds" without saying so. It does not describe a league as
supported when the code only half-supports it, and it does not bury a caveat
in a footnote when it belongs in the sentence. When something fires seven
events for one touchdown, the docs say that in the same breath as the feature.

## Palette

Closed palette. Anything not in this table does not ship.

### Dark (default)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#070b14` | Page ground — deep rink blue-black, never neutral grey |
| `--surface` | `#0d1522` | Cards, panels |
| `--surface-2` | `#131d2e` | Raised/nested surfaces, code blocks |
| `--border` | `#1e2b40` | Hairlines, dividers |
| `--text` | `#e8eef7` | Body text — cool white, never pure `#fff` |
| `--muted` | `#93a4bd` | Secondary text, labels, captions |
| `--accent` | `#ff3b2f` | **Goal light.** Score flare, primary CTA. Nothing else. |
| `--accent-hot` | `#ff6a3d` | Gradient partner for the wordmark and flare only |
| `--ice` | `#5cc8ff` | Links, structural highlights, "watching" state |
| `--live` | `#3ddc97` | Connection-alive indicators |
| `--warn` | `#ffc447` | Caveats, work-in-progress badges |

### Light

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#f2f6fb` | Page ground — **ice white, cold.** Never cream, never warm. |
| `--surface` | `#ffffff` | Cards, panels |
| `--surface-2` | `#e7eef7` | Raised/nested surfaces, code blocks |
| `--border` | `#cbd8e8` | Hairlines, dividers |
| `--text` | `#0b1626` | Body text |
| `--muted` | `#4a5c75` | Secondary text |
| `--accent` | `#d81f14` | Goal light, darkened for contrast on light ground |
| `--accent-hot` | `#b8430d` | Gradient partner |
| `--ice` | `#0a6ea8` | Links, structural highlights |
| `--live` | `#0d7a4f` | Connection-alive indicators |
| `--warn` | `#8a5a00` | Caveats, WIP badges |

### Measured contrast (WCAG 2.1, computed — `branding/contrast.py`)

Every pair that ships text. `AA` = ≥ 4.5:1 body text, `AAA` = ≥ 7:1,
`AA-lg` = ≥ 3:1 large text/UI only.

**Dark**

| Foreground | on `--bg` | on `--surface` | on `--surface-2` |
|---|---|---|---|
| `--text` | 16.87 AAA | 15.69 AAA | 14.49 AAA |
| `--muted` | 7.77 AAA | 7.22 AAA | 6.67 AA |
| `--accent` | 5.55 AA | 5.16 AA | 4.76 AA |
| `--accent-hot` | 6.92 AA | 6.43 AA | 5.94 AA |
| `--ice` | 10.46 AAA | 9.73 AAA | 8.98 AAA |
| `--live` | 11.14 AAA | 10.36 AAA | 9.56 AAA |
| `--warn` | 12.41 AAA | 11.54 AAA | 10.65 AAA |

**Light**

| Foreground | on `--bg` | on `--surface` | on `--surface-2` |
|---|---|---|---|
| `--text` | 16.73 AAA | 18.15 AAA | 15.53 AAA |
| `--muted` | 6.28 AA | 6.82 AA | 5.84 AA |
| `--accent` | 4.69 AA | 5.09 AA | **4.36 AA-lg** |
| `--accent-hot` | 5.03 AA | 5.46 AA | 4.67 AA |
| `--ice` | 5.08 AA | 5.51 AA | 4.72 AA |
| `--live` | 4.94 AA | 5.37 AA | 4.59 AA |
| `--warn` | 5.46 AA | 5.93 AA | 5.07 AA |

**One documented exception:** light-mode `--accent` on `--surface-2` measures
4.36:1 — large text and UI elements only, never body copy. In practice accent
text on a code block does not occur; if a layout ever needs it, use
`--accent-hot` (4.67, AA) instead. Re-run `python3 branding/contrast.py` after
any palette edit and update these tables; they are measurements, not decoration.

## Typography

| Role | Face | Fallback | License |
|---|---|---|---|
| Display / headings / scores | **Big Shoulders Display** | `"Arial Narrow", system-ui, sans-serif` | SIL OFL 1.1 |
| Body | **Public Sans** | `system-ui, -apple-system, "Segoe UI", sans-serif` | SIL OFL 1.1 |
| Code / data / labels | **JetBrains Mono** | `ui-monospace, SFMono-Regular, Menlo, monospace` | SIL OFL 1.1 |

All three are open-licensed and served from Google Fonts with real fallback
stacks. Big Shoulders is condensed and athletic — it reads as arena signage and
sets scores at large sizes without going cartoonish. Numerals are always
tabular (`font-variant-numeric: tabular-nums`) anywhere a score, clock, or
count can change, so digits do not jitter as they update.

## Mark and wordmark

- The wordmark is the existing GOALFEED lockup: the letterforms with a goal
  light replacing the A, plus the "REAL-TIME GOAL SERVICE" tagline.
- **The wordmark gradient is artwork, not a UI token.** It runs
  `#ff8c4d → #ff393a` on dark grounds — measured from the original raster, not
  taken from the palette above. This is deliberate: `--accent` is a *signal*
  colour with a job (the goal fired), while the wordmark is a fixed piece of
  brand artwork that predates the token system. They are close but not equal,
  and syncing them would be a mistake in both directions.
  The light variant darkens to `#b8430d → #d81f14` for contrast on ice white.
- The tagline renders in `--muted` rather than the original artwork's maroon,
  which fails contrast on both grounds.
- **SVG masters live in `branding/`**, with light and dark variants. Derived
  rasters — favicons, apple-touch-icon, the 1280×640 OG/social card — are
  generated by `branding/build.py` and never hand-exported.
- On dark grounds the wordmark sits on `--bg` or `--surface` unmodified. On
  light grounds it uses the light variant, whose gradient is darkened to the
  light-palette accent values so it stays legible on ice white.
- Minimum width 120px. Clear space on all sides equal to the height of the
  goal light element.

## What not to do

- **Do not use `--accent` as a general-purpose brand color.** It is the goal
  light. Section headings, borders, hovers, icons, and decorative rules use
  `--ice`, `--muted`, or `--border`. If red is everywhere, the goal means
  nothing.
- **Do not warm the light theme.** No cream, no beige, no paper. Two other
  fleet projects (mail-muncher, katra) own warm cream grounds; Goalfeed's light
  theme is cold ice white and that separation is deliberate.
- **Do not set the wordmark in a system font.** It is artwork, not text.
- **Do not animate the goal flare on page load or on scroll.** It fires when an
  event fires, in the demo, and honors `prefers-reduced-motion`. A flare that
  goes off for no reason is the visual equivalent of a false positive.
- **Do not use team logos or league marks.** They are trademarked and Goalfeed
  has no license to them. Team *codes* (`WPG`, `TOR`, `NYY`) set in the display
  face are the visual shorthand instead.
- **Do not add stock photography of sports.** Real payloads, real terminal
  output, and real scoreboards are the visual language.
- **No emoji in headings, CLI output, or docs prose.**

## Distinctness from the rest of the fleet

Checked side by side before adoption:

| Project | Ground | Accent | Metaphor |
|---|---|---|---|
| getvect | `#12141a` neutral dark | magenta `#ff2d95` + amber | sticker-art cat, before/after slider |
| mail-muncher | warm cream `#F1EBE4` | terracotta `#E0533D` | retro pixel terminal |
| katra | warm cream `#f4efe4` | burnt orange `#b5502f` | archival, editorial, typographic |
| **Goalfeed** | **cold `#070b14` / ice `#f2f6fb`** | **goal-light red, signal-only** | **arena scoreboard, live event** |

Goalfeed is the only cold-ground project in the fleet and the only one that
reserves its accent as a state rather than spending it as a theme.

## File inventory

| Path | What |
|---|---|
| `branding/BRAND.md` | This file — canonical |
| `branding/contrast.py` | Contrast calculator; regenerates the tables above |
| `branding/wordmark-dark.svg` | Wordmark master, dark grounds |
| `branding/wordmark-light.svg` | Wordmark master, light grounds |
| `branding/mark.svg` | Goal-light mark alone (favicon/avatar source) |
| `branding/build.py` | Generates favicons, apple-touch-icon, OG card |
| `branding/logo-original.png` | The original raster wordmark — provenance record |
| `site/assets/` | Generated site assets (do not hand-edit) |

## Asset provenance

The original GOALFEED wordmark raster (`logo-original.png`) predates this
standards pass; its author is the project owner. The SVG masters in `branding/`
are **traced** from that raster during this pass — with `potrace` on the
extracted alpha silhouette, recombined into a single coordinate system, then
optimised with `svgo`. They are not a redraw: an earlier hand-drawn attempt was
rejected for diverging from the source, and fidelity to the original letterforms
is the acceptance criterion for any future edit. Regenerate derived rasters with
`python3 branding/build.py`.

No asset in this project was generated with AI assistance. Any that ever is
gets disclosed here.

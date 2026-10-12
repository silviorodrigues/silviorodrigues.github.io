# Implementation Plan: Field Notes Website Design

**Branch**: `main` | **Feature identifier**: `001-field-notes-design` | **Date**: 2026-10-12

**Spec**: [spec.md](spec.md) | **Input**: `specs/001-field-notes-design/spec.md`

Spec Kit setup returned `BRANCH=001-field-notes-design` from feature context. This is the feature
identifier; the actual Git branch remains `main`. No feature branch was created.

## Summary

Build the single Field Notes homepage using semantic HTML, native CSS, and a small JavaScript
theme controller. Match desktop Day/Evening and mobile Day with the supplied portrait, logos,
icons, local fonts, asymmetric cards, paper grain, and organic motion. Use normal-flow responsive
layout, native links/buttons, guarded storage, and CSS reduced-motion rules. A small Node copy
script produces static `out/` output.

The experiment explores a personal paper-like identity and organic decoration. Application files
are intentionally deleted; create only the homepage and local tooling. Blog, newsletter, worker,
analytics, and deployment restoration are outside scope.

## Technical Context

**Language/Version**: HTML5, CSS, standard browser JavaScript; Node.js 24.x for local tooling
(24.20.0 is installed through asdf but not selected).

**Primary Dependencies**: No runtime packages. Development-only `@playwright/test`, pinned in
`package-lock.json` during implementation. Native layout, animation, and storage.

**Storage**: Checked-in content/assets; optional `localStorage` string `field-notes-theme`,
accepting only `day` or `evening`. No backend or database.

**Testing**: Focused Playwright Chromium/Firefox/WebKit scenarios; human visual, keyboard,
contrast, text-enlargement, motion, and actual-browser/device checks in [quickstart.md](quickstart.md).

**Target Platform**: Static hosting compatible with GitHub Pages; latest two stable versions
of desktop Chrome, Edge, Firefox, Safari, iOS Safari, and Android Chrome. Record exact versions
at acceptance time; automated engines do not certify branded browsers or real devices.

**Project Type**: Single-page static website.

**Performance Goals**: Theme changes within 0.5 seconds without reload, scroll change, or layout
shift (SC-004). Hover preserves neighbors and page length. Initial HTML contains all content
and links. No runtime font or design-service requests.

**Constraints**: 320–1440px layouts; 200% text enlargement; 44px theme/social targets; visible
keyboard focus; 4.5:1 ordinary and 3:1 large-text contrast; denied-storage/missing-resource
fallbacks; 10s/22s/7s decorative cycles; reduced-motion support. Preserve unrelated deletions
and deployment scope. Use local assets and retain supplied SVG geometry.

**Scale/Scope**: One route `/`, three work cards, three social actions, one theme control, two
palettes, three page frames, and one card-state reference.

## Constitution Check

Gates evaluated before Phase 0 and re-evaluated after Phase 1 against
`.specify/memory/constitution.md` v1.0.0.

| Principle / gate | Before research | After design |
| --- | --- | --- |
| I. Keep It Simple | PASS: static page, no framework/backend | PASS: Playwright serves repeated behavior checks; Node standard library serves tooling |
| II. Exploration Is the Point | PASS: paper identity, themes, organic motion | PASS: reference comparison and motion observation assess the experiment |
| III. Make It Personal | PASS: exact supplied copy/artwork | PASS: durable source assets; no generic sections added |
| IV. Take Small, Reversible Steps | PASS: homepage only, preserve deletions | PASS: isolated source/assets/tooling; one removable preference key |
| V. Keep the Space Usable | PASS: browser, narrow viewport, keyboard review planned | PASS: contracts and guide cover contrast, failures, responsive layout, keyboard, and actual browsers before publication |

No exceptions or unresolved research decisions. These results certify design alignment; acceptance
execution and owner visual review remain implementation work.

## Project Structure

### Documentation (this feature)

```text
specs/001-field-notes-design/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── homepage.md
└── references/
    ├── README.md
    ├── asset-manifest.json
    ├── day.png
    ├── evening.png
    ├── mobile-day.png
    ├── card.png
    ├── assets/          # supplied artwork and original portrait
    └── fonts/           # four WOFF2 files, three OFL licenses, manifest
```

`tasks.md` belongs to the subsequent `$speckit-tasks` phase and is not generated here.

### Source Code (planned, not created by this command)

```text
src/
├── index.html           # semantic content, controls, early theme initializer
├── styles.css           # tokens, layout, states, texture, motion
├── theme.js             # button events and guarded persistence
└── assets/
    ├── portrait.jpeg
    ├── day/
    ├── evening/
    ├── mobile-day/      # supplied mobile divider
    ├── card/            # supplied hover arrow
    ├── paper-grain.svg  # annotated effect absent from Figma frames
    └── fonts/           # WOFF2 files and licenses
scripts/
├── build.mjs            # validate required files; copy src/ into out/
└── preview.mjs          # local static HTTP server for out/
tests/
└── homepage.spec.js
package.json
package-lock.json
.tool-versions           # select installed Node 24.20.0
playwright.config.js
out/                     # generated, already gitignored
```

**Structure Decision**: HTML is the single content source; the data model describes it without
introducing a runtime model layer or templates. Build copies only `src/`, excluding planning
references. Deduplicate byte-identical supplied assets. Static `out/` supports hosting without
claiming publishing is configured. Do not restore legacy application/workflow files.

## Phase 0: Research Outcome

[research.md](research.md) resolves tooling, assets/fonts, responsive composition, theme policy,
motion, focus contrast, and validation. Two research agents investigated static architecture and
interaction/browser behavior. Figma context and variables verified frames `8:5`, `8:101`, `8:140`
and component `7:42`; notes `8:236` define code-only effects. Supplied assets, original portrait,
fonts/licenses, and screenshots are durable local files with hashes. No product question remains open.

## Phase 1: Design Outcome

- [data-model.md](data-model.md): static content/resource relationships and theme transitions.
- [contracts/homepage.md](contracts/homepage.md): route, semantics, palettes, layout, motion, failures.
- [quickstart.md](quickstart.md): planned commands and focused acceptance scenarios.
- [references/README.md](references/README.md): asset nodes, slots, provenance, and usage rules.

Implementation increments: static content/responsive composition; themes; artwork/texture/motion;
then validation and visual refinement. Narrow/enlarged-text cases wrap naturally rather than
using fixed reference heights. Add an accent keyboard-focus outline because the Day sprig border
alone has insufficient contrast. No supplied text palette needs a deviation.

## Complexity Tracking

No constitution violations or complexity exceptions.

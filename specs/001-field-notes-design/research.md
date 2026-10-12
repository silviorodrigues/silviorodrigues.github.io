# Research: Field Notes Homepage

**Date**: 2026-10-12 | **Feature**: [spec.md](spec.md)

All planning unknowns are resolved. Browser versions are recorded at acceptance time per FR-020;
they are not an unresolved implementation choice.

## 1. Static architecture and build

**Decision**: Semantic HTML, native CSS, vanilla JavaScript; Node 24 standard-library build/preview
scripts; static `out/` output. Pin development-only Playwright during implementation.

**Rationale**: One static page needs no framework or server. GitHub Pages serves HTML/CSS/JS.
Git history shows the intentionally deleted workflow used Node 24 and `out/`; keeping that output
shape avoids new hosting infrastructure. asdf has 24.20.0 installed but not selected.

**Alternatives considered**: Restoring Next.js brings irrelevant architecture. Astro/Vite, React,
Tailwind, and animation packages add tooling without serving this feature. Manual-only testing
makes repeated storage/media-state checks unnecessarily difficult.

**Sources**: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages),
[Node filesystem APIs](https://nodejs.org/docs/latest-v24.x/api/fs.html),
[Playwright browsers](https://playwright.dev/docs/browsers).

## 2. Durable artwork and fonts

**Decision**: Use supplied Figma assets, the original portrait source, and local licensed WOFF2.
Planning downloaded 40 design files (36 artwork files including source portrait, four reference
images), 424,614 bytes; four fonts, 140,656 bytes; three OFL licenses. Manifests under
[references/](references/README.md) record hashes and provenance.

**Rationale**: Export URLs expire. The raw portrait permits changing its clipping outline while
retaining the photograph and crop. Supplied theme SVGs preserve artwork. Genuine Fraunces italic
avoids synthetic slant. Latin subsets cover current copy including Paraíba; check coverage if
content changes. Roman weights 300–400, italic 300, `SOFT=0`, `WONK=1`, and optical sizes 9–144
are acquired; compare optical sizing with the reference before acceptance. Instrument Sans and
IBM Plex Mono use 400. Use `font-display: swap` and readable fallbacks; retain licenses in output.

**Alternatives considered**: Runtime font-CDN requests or expiring exports weaken durability.
Replacement/generated artwork departs from the design. Screenshots are never page assets.
Grain is generated from its explicit annotation because it is absent from the Figma frames.

**Sources**: [Figma Home](https://www.figma.com/design/WM76FJZj2IipsyAGoXOpvr/silviorodrigues.dev-%E2%80%94-Field-Notes?node-id=0-1),
[Fraunces](https://github.com/undercasetype/Fraunces),
[Instrument Sans](https://github.com/Instrument/instrument-sans),
[IBM Plex](https://github.com/IBM/plex),
[font-display](https://www.w3.org/TR/css-fonts-4/#font-display-desc).

## 3. Responsive composition and stable hover

**Decision**: Centered 760px maximum outer column, 24px padding, normal-flow sections, natural
heights, wrapping title/badge rows, shrinkable text columns. Use 54px name at narrow widths and
96px where desktop fits (initial breakpoint 768px), expressed in rem. Attach squiggle to an inline
positioned wrapper around “better”. Transform hovered cards; reserve the arrow in upper-right padding.

**Rationale**: Reference dimensions emerge from copy, metrics, and gaps. Fixed heights and canvas
coordinates clip enlarged text. The exported hover prototype adds an arrow as a flex child;
an absolute decorative slot avoids rewrapping the description when highlighted.

**Alternatives considered**: Fixed heights, forced one-line content, and inserting an in-flow
hover arrow conflict with wrapping and stable geometry.

**Sources**: Figma frames/component; [CSS transforms](https://drafts.csswg.org/css-transforms-1/#transform-rendering).

## 4. Appearance policy

**Decision**: Early initialization sets root `data-theme`: valid saved `field-notes-theme`
(`day`/`evening`), otherwise device preference, otherwise Day. Guard storage property access,
read, and write. Keep explicit choice in memory if saving fails. Share one resolution policy
between initial appearance and button state. Update palette, icon, and target-theme name synchronously.

**Rationale**: Native storage/media queries suffice. Early initialization avoids an incorrect
first appearance. Failed saving must not undo a switch. Device theme is consulted on load;
the spec does not require a live system-theme listener. CSS retains readable fallback colors.

**Alternatives considered**: Cookies/server state, libraries, and experimental preferences APIs
add complexity. Persisting inferred device appearance creates a false explicit choice.

**Sources**: [WHATWG storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-localstorage-attribute),
[device theme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme).

## 5. Motion and texture

**Decision**: Static baseline. CSS elliptical border-radius keyframes clip the source portrait
at 10s ease-in-out; an absolute wrapper orbits supplied ochre artwork at 22s linear; a separate
clip wrapper morphs at 7s. Preserve initial 22px right/−14px up offset and reserve the complete,
bounded decoration envelope. Enable continuous motion and 0.35s hover lift/rotation only for
`prefers-reduced-motion: no-preference`; pointer hover requires `hover: hover`. Focus is static.

Use local SVG fractal noise in a fixed overlay: 0.22 opacity, Day `multiply`, Evening `soft-light`,
no pointer events or accessibility-tree content. Isolate blending; avoid root transforms that
change fixed positioning. Measure final composited contrast.

**Rationale**: Established CSS covers browser engines without dependencies. Separate wrappers
prevent competing transforms. Media queries respond to motion changes. Supplied artwork remains
intact; wrapper clipping/movement supplies annotated live effects.

**Alternatives considered**: Path interpolation, canvas/WebGL, and JS animation libraries add
machinery. First-tap hover activation and JS-only motion detection are unnecessary.

**Sources**: [border-radius](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius),
[reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion),
[hover capability](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/hover),
[blending](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode).

## 6. Contrast and focus

**Decision**: Preserve text palettes. Add an accent focus outline alongside sprig border, shadow,
and arrow. Control names do not depend on icon files. Portrait gets meaningful alternative text;
decorative resources have empty alternatives.

**Rationale**: W3C sRGB luminance calculation, before grain compositing:

| Foreground/background | Day | Evening |
| --- | ---: | ---: |
| Ink/paper | 14.01 | 15.08 |
| Ink/card | 14.91 | 14.06 |
| Muted/paper | 6.48 | 8.39 |
| Muted/card | 6.89 | 7.82 |
| Accent/paper | 5.25 | 7.82 |
| Accent/card (badge included) | 5.59 | 7.29 |
| Sprig/paper | 2.77 | 5.69 |
| Sprig/card | 2.94 | 5.31 |

All text pairs exceed 4.5:1. Day sprig `#a08c76` fails 3:1 as the sole authored focus cue; an accent
outline solves this without changing supplied styling. Decorative lines must not become text
colors or sole indications of operability.

**Alternatives considered**: Changing borders globally alters the reference unnecessarily.
Rounding 2.94 up to 3 gives a false pass.

**Sources**: [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html),
[non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html),
[focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible).

## 7. Acceptance scope

**Decision**: Focused Playwright scenarios plus visual, keyboard, contrast, and motion review.
Record latest/previous stable browser releases at acceptance start; test actual branded browsers
and devices for FR-020. Engine smoke checks and emulation supplement the matrix.

**Rationale**: Storage denial, theme precedence, stable layout, motion policy, and link actions
merit reusable browser tests. Artwork/font fidelity, texture, real Safari/mobile support, and
owner acceptance require direct review. Patched Firefox/upstream WebKit are not stock Firefox/Safari.

**Alternatives considered**: Static-markup unit/component tests mirror implementation without
proving the visitor experience. Unreviewed screenshot baselines encode errors. Guessed browser
versions do not satisfy the review-time recording requirement.

**Sources**: [Playwright limitations](https://playwright.dev/docs/browsers),
[Chrome releases](https://chromereleases.googleblog.com/),
[Edge releases](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel),
[Firefox releases](https://www.mozilla.org/en-US/firefox/releases/),
[Safari release notes](https://developer.apple.com/documentation/safari-release-notes).

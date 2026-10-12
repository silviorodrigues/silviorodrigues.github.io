# Homepage Interface Contract

**Route**: `/` | **Requirements**: FR-001–FR-020 | **Content**: [data-model.md](../data-model.md)

## Document and actions

Serve a static HTML document with English language metadata, a meaningful page title, a `main`
landmark, one name heading, an ordered work list, and a social footer. All copy and six outbound
links exist in initial HTML. A native button controls themes. No public API is introduced.

Tab order: theme button → KOHO → alugaTI → Front In Vale → Email → LinkedIn → GitHub.
Seven focusable controls; decorative assets add no stops. Links activate with Enter; the button
with Enter or Space. Each work card is one anchor named by its project title with associated
description; badge remains readable. Theme name identifies the destination mode. Social names
are explicit even when icons fail. Portrait alternative identifies Silvio.

Project/profile anchors use the exact data-model destinations, `target="_blank"` and
`rel="noopener noreferrer"`. Email is a native `mailto:` action without new-tab handling.
No first-tap hover gate, nested card controls, or client-side routing.

## Layout and typography

| Property | Desktop reference (1280px) | Mobile reference (390px) |
| --- | --- | --- |
| Outer column | 760px centered | Viewport width |
| Horizontal padding | 24px; usable width 712px | 24px; usable width 342px |
| Theme row | 32px top; 44px tall; aligned right | Same |
| Portrait | 112×112px, 24px below theme row | Same |
| Intro gaps | 22px portrait/name/bio gaps; name top 8px; bio top 4px | Same |
| Name | Fraunces 300, 96px, line-height 0.92; italic surname | 54px, same two-line identity |
| Biography | Instrument Sans 400, 19px, line-height 1.55; up to 570px | Available width; wraps |
| Work placement | Hero bottom gap 72px; list top 8px | Same |
| Card list | 8px gap; each stable wrapper has 4px lift allowance | Same |
| Card padding/layout | 28px horizontal/24px vertical; logo/text gap 20px | Same, text can shrink/wrap |
| Logo slot | 36×38px; actual KOHO/alugaTI 36px; Front In Vale about 36×32px | Same |
| Titles/body/badge | Fraunces 400 24px; Instrument Sans 400 15px/1.6; IBM Plex Mono 400 12px | Same; badge moves below title |
| Footer gap | 48px after projects plus 72px main bottom padding | Same |
| Divider/social/bottom | 14px divider slot, 20px gap, 44px social row, 40px bottom | Same |

Reference section coordinates and page heights are comparison measurements, not fixed layout
constraints: Day/Evening 1280×1203, mobile Day 390×1306. Natural heights must grow at 200% text
enlargement. Use rem typography, `min-width: 0` text columns, and wrapping rather than clipped
overflow. Initial desktop name breakpoint: 768px; refine only if required to retain hierarchy
at intermediate widths. Do not force oversized name/title/badge strings to remain unbroken.

Name tracking follows frame text: −2.4px desktop and proportional mobile tracking; titles −0.24px.
Fraunces uses `SOFT=0`, `WONK=1`; use local genuine italic. Check optical size against screenshots.
Keep the 65×10 squiggle attached to “better”, not positioned against the whole paragraph.

Cards have 28px corners except KOHO top-right 8px, alugaTI bottom-left 8px, Front In Vale
bottom-right 8px. Keep upper-right space for an absolute 18px decorative arrow; it must not
change description width on hover. All theme/social activation areas are at least 44×44px.

## Palettes and artwork

| Token | Day | Evening |
| --- | --- | --- |
| paper | `#f2ede3` | `#17140f` |
| ink | `#231f1c` | `#efe8dc` |
| muted | `#5a534c` | `#b7aea2` |
| card | `#f8f4ec` | `#1f1b16` |
| line | `#ddd3c4` | `#352e26` |
| accent | `#9c4a2a` | `#e0987a` |
| ochre | `#b9772e` | `#b9772e` |
| sprig | `#a08c76` | `#a08c76` |

Figma supplies only the Day hover component; retain its sprig and shadow in Evening, with
Evening title tokens. Use supplied local theme-specific logos/icons/decorations. Mobile Evening
uses mobile geometry and Evening palette; apply line color to the unchanged supplied mobile
divider silhouette through CSS masking. Responsive divider wrappers may scale the supplied
geometry; preserve SVG root dimensions/viewBox and avoid blanket SVG sizing rules.

Grain is code-only: fixed full-page fractal-noise overlay, 22% opacity; `multiply` in Day,
`soft-light` in Evening, no pointer events, no focus/reading-order content. Validate composited
readability. Every text style meets 4.5:1, or 3:1 for large text; an accent focus outline supplements
the low-contrast Day sprig border. Record and review any necessary visual deviation.

## Appearance behavior

Use root `data-theme="day"` or `"evening"`. Initialize before visible content, from valid saved
`field-notes-theme`, otherwise device preference, otherwise Day. Invalid values are ignored;
storage property/get/set exceptions are caught. Never persist an inferred preference.

Day shows moon and `Switch to Evening`; Evening shows sun and `Switch to Day`. Activation
synchronously changes all palette surfaces/text/borders/artwork/icon state, retains focus and
scroll position, and finishes within 0.5 seconds. A failed write retains the visit's explicit
choice. Reload restores a successfully saved choice. Theme changes cause no geometry transitions.

## Motion and interaction states

- Portrait clipping outline: 10s ease-in-out repeating morph from reference shape and back.
- Ochre: separate orbit wrapper, 22s linear full revolution; separate clipping morph, 7s loop
  (ease-in-out chosen because the annotation specifies no morph easing).
- Decorations remain absolutely positioned in a bounded portrait envelope, behind the image;
  no surrounding-flow movement or interference with theme/name.
- Pointer hover on hover-capable devices: translateY(−4px), rotate(−0.3deg), 0.35s ease, accent
  title, sprig border, shadow `0 18px 40px -24px rgba(60,40,25,0.4)`, northeast arrow.
- Keyboard focus: same static title/border/shadow/arrow cues plus visible accent outline; no lift.
- Reduced motion: continuous animations and card movement disabled, including when the preference
  changes during a visit; static decorations/highlights remain. Touch taps navigate immediately.

States retain all descriptions/badges, neighboring card positions, scroll height, and content order.

## Failures and browser acceptance

Storage failure affects only persistence. Blocked fonts use readable fallback stacks. Broken
portrait/logo/decorative resources preserve content, reserved slots, and link names; failed
theme/social icons expose visible text fallbacks within usable controls. No decorative resource
can block page interaction. The homepage remains readable/navigable without JavaScript; hide an
unavailable theme enhancement instead of exposing an inert button.

Support the latest two stable versions of each FR-020 browser. Record the vendor-supported
baseline and actual tested versions at acceptance start. Playwright engine coverage and mobile
emulation are supplementary; actual desktop browsers, iOS Safari, and Android Chrome must be
reviewed. Unexecuted combinations remain recorded acceptance gaps, not passes.

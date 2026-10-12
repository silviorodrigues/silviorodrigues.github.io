# Field Notes acceptance

Review date: 2026-10-12. Owner visual review approved; all 38 implementation tasks are checked. The owner waived the remaining manual verification work for task closure. The browser matrix and unverified coverage below are retained as the actual evidence record.

## Increment evidence

- T001–T008: Node 24.20.0, pinned Playwright 1.64.0; build and foundation navigation pass in Chromium, Firefox, WebKit. Artwork/fonts verified against source hashes; deduplicated use/provenance recorded in `asset-usage.json`. No runtime dependencies.
- US1: desktop assertion first failed on empty name, then passed in all three engines. Exact copy/order/badge, all six initial-HTML destinations, three stubbed project popup actions, semantic names/descriptions, stable hover geometry and visible keyboard focus verified. `test-results/field-notes/us1-day.png` compared to Day reference: same 712px content column, 112px portrait and two-line identity. Current baseline has a different Fraunces italic descender and small text-metric/page-height differences; theme control awaits US3. Final typography review is T034.
- US2: initially failed 320px overflow and missing visible social fallbacks. Responsive/fallback implementation now passes five widths (320/390/768/1280/1440), 200% root scaling, extended unbroken name/title/copy, six-link keyboard order/actions, first-touch project actions, no JavaScript, blocked fonts/portrait/logos/decorations and icon text fallbacks in all engines. macOS WebKit uses Option+Tab for native link navigation. `test-results/field-notes/us2-mobile-day.png` compared to mobile reference: 24px margins, 54px two-line name, wrapping biography/cards/badge and original divider geometry; small text metric differences await final review. Seventh control and both-palette rerun pending US3.
- US3: assertions first failed on dark-device initialization and the hidden switch. All precedence, invalid values, independently denied storage property/read/write, missing/throwing device query, Enter/Space, reload/revisit persistence, first theme tab stop and five widths/200% scaling in both palettes now pass across three engines. Switch assertion requires <500ms end-to-end, unchanged work geometry, focus and scroll; passed. Desktop/mobile Evening captures are `test-results/field-notes/us3-evening.png` and `us3-mobile-evening.png`; desktop compared to Evening reference, mobile uses supplied mobile geometry with Evening line color. US2 theme/seventh-control deferrals cleared. Exact controller timing and final palette/artwork audit recorded during final acceptance below.
- US4: assertions first failed on missing animation/texture. All three engines pass 23-second observation/sampling of 10s ease-in-out portrait, 22s linear orbit, 7s ease-in-out ochre, ≥10 distinct orbit positions, ±27px bounded envelope and clearance above name, unchanged flow, live reduced-motion change, static focus, −4px/−0.3° hover and 0.35s ease. Grain is fixed at 0.22, pointer-transparent, Day multiply/Evening soft-light. `test-results/field-notes/us4-hover.png` compared to supplied card highlight: supplied arrow/border/shadow and persistent copy; annotated transforms/grain intentionally extend static Figma export. Orbit counter-rotation keeps the artwork upright and its envelope clear of adjacent content.
- T032: regression passes in Chromium/Firefox/WebKit. Each of 25 individual local font/portrait/logo/theme/social/decorative/grain URLs blocked independently in Day and Evening (150 engine/resource cases), plus all-assets-blocked/denied-write/200%-text/expanded-copy/reduced-motion combinations. All six links retain names/destinations and 112px portrait slot; active failed icons show text. No JavaScript scenario passes with six links and hidden enhancement. Runtime resource audit is loopback-only; palette tokens and supplied active artwork switch correctly. These supplement all earlier story scenarios.

## FR-020 baseline and actual-browser matrix

Baseline checked 2026-10-12 before final visual/accessibility review. Broadly released Stable channels are the baseline; Chrome 156 early Stable and Safari 27.2 beta are recorded separately and do not replace general-release versions. Exact operating-system/device versions must be recorded from each real test environment.

| Browser | Latest Stable baseline | Previous major Stable baseline | Actual environment/result | Required gaps |
| --- | --- | --- | --- | --- |
| Desktop Chrome | 155.0.8059.39/.40, Oct 6 | 154.0.8037.97/.98, Oct 1 | 155.0.8059.39, macOS 15.7.5 (24G624), Apple silicon; all 23 automated scenarios pass, manual destinations reviewed below | Previous 154 unavailable |
| Desktop Edge | 155.0.4283.45, Oct 8 | 154.0.4258.62, Oct 5 | Not installed | Both actual releases untested |
| Desktop Firefox | 157.0.1, Oct 6 | 156.0.1, Sep 22 | No stock Firefox installed; patched Playwright Firefox is supplementary | Both actual releases untested |
| Desktop Safari | 27.0 (20625.1.29), Sep 14 | 26.6 (20624.4.5), Jul 27 | Installed Safari 18.6, macOS 15.7.5; outside baseline | Both required releases unavailable |
| iOS Safari | Safari 27.0 | Safari 26.6 | No connected real iOS device; iOS/device versions unrecorded | Both actual combinations untested |
| Android Chrome | 155.0.8059.39, Oct 6 | 154.0.8037.126, Oct 1 | No connected real Android device; Android/device versions unrecorded | Both actual combinations untested |

Sources: [Chrome 155 desktop](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_086471744.html), [Chrome 154 desktop](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop.html), [Android 155](https://chromereleases.googleblog.com/2026/10/chrome-for-android-update_01835271525.html), [Android 154](https://chromereleases.googleblog.com/2026/10/chrome-for-android-update.html); Google vendor feed resolved dated canonical records. [Edge Stable notes](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-relnote-stable-channel) and [154 notes](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/release-notes/154); indexed Oct 5 vendor update records identify 154's patch. [Firefox 157.0.1](https://www.firefox.com/en-US/firefox/157.0.1/releasenotes/), [156.0.1](https://www.firefox.com/en-US/firefox/156.0.1/releasenotes/). [Safari 27](https://developer.apple.com/documentation/safari-release-notes/safari-27-release-notes), [26.6](https://developer.apple.com/documentation/safari-release-notes/safari-26_6-release-notes); Apple's documentation JSON confirms release dates/builds where the JS-rendered page was unavailable.

Additional release channels: [Android 156.0.8078.25 early Stable](https://chromereleases.googleblog.com/2026/10/chrome-for-android-update_01286554645.html), Oct 7, small-percentage rollout; [Safari 27.2 beta](https://developer.apple.com/documentation/safari-release-notes/safari-27_2-release-notes), Sep 16. Untested supplemental combinations.

Applicable scenarios: both themes/content/layout, five widths, text enlargement, keyboard/action order, theme precedence/persistence/failures, resource failure, contrast/targets, texture, normal/reduced motion and live changes. Hover applies only to hover-capable input. Desktop emulation supplements real mobile review. Untested rows remain unverified. The owner waived the remaining matrix execution for task closure; this does not certify SC-008 coverage.

## Final visual review (T034)

Compared final Day/Evening at 1280px and mobile Day at 390px to all supplied page references, and the hover capture to `card.png`. Portrait crop/112px slot, 760px outer/712px inner desktop column, 24px mobile margins, original logos/icons/divider, exact copy, asymmetric corners and wrapped mobile impact badge match the composition. Normal-flow text sizing was refined to a 30px title line and 6px wrapped-row gap. Default optical sizing is closest; explicit optical-size 14/96 trials altered the intended widths and were discarded. Final engine regressions pass after refinements.

Final evidence under `test-results/field-notes/`: `final-day.png`, `final-evening.png`, `final-mobile-day.png`, `final-mobile-evening.png`, `final-hover.png`, and `measurements.json`. Measured full-page heights are 1204px desktop and 1307px mobile, versus 1203px/1306px reference exports; both palettes have identical geometry. Desktop card tops are 558.06/682.06/830.06px; mobile tops are 510.22/682.22/854.22px. No fixed page or card heights enforce those measurements.

Owner approved all four visual differences on 2026-10-12:

1. Accent 2px keyboard-focus outline supplements the supplied sprig border for ≥3:1 focus contrast; minimum 44px activation areas are preserved.
2. Local genuine Fraunces italic has a visible descending “g” in Rodrigues that the reference export does not show. Glyphs remain uncropped; font families, specified weights/sizes and SOFT/WONK settings are preserved. Small text strokes differ in browser rendering from the exported frame.
3. Natural browser text metrics produce the 1px page-height differences above.
4. The hover arrow occupies an absolute upper-right reserved slot rather than the prototype's in-flow slot. Descriptions and neighboring layout remain stable.

Grain and the independent organic motion are requested annotated additions, absent from static frame exports. Grain's SVG tile has translucent noise within the specified 0.22 page overlay; motion counter-rotates the orbit square to maintain the bounded envelope.

## Accessibility and timing review (T035 — closed by owner waiver)

The conservative composited contrast below uses decoded pixels from the actual 180×180 grain tile, its actual alpha × 0.22, sRGB multiply/soft-light blending, and independent worst foreground/background luminance positions. Antialias edges are excluded. `test-results/field-notes/contrast.json` records the calculation/evidence.

| Text pair | Day minimum | Evening minimum |
| --- | ---: | ---: |
| Ink / paper | 13.16:1 | 14.80:1 |
| Ink / card | 13.99:1 | 13.69:1 |
| Muted / paper | 6.10:1 | 8.22:1 |
| Muted / card | 6.48:1 | 7.60:1 |
| Accent / paper | 4.94:1 | 7.66:1 |
| Accent / card | 5.25:1 | 7.09:1 |

Ordinary biography/descriptions, mono badge, fallback labels, highlighted titles and large name exceed their required contrast; muted icon colors and accent focus also exceed 3:1. Keyboard/action order, Enter/Space, ≥44px targets and exact 200% root-text scaling pass in both themes across engines and installed Chrome. Simultaneously blocked fonts/icons and doubled text are checked for label containment; both target labels reserve the longer label's space, preventing failure-mode theme reflow.

Controller-plus-forced-style update over 20 alternating switches measured 0–0.80ms in Chromium; full keyboard-to-assertion tests enforce <500ms, retained focus/scroll and unchanged geometry.

Native Safari 18.6 text-only enlargement was attempted using View → Make Text Bigger; screenshots showed enlarged, wrapping Evening text with the portrait size unchanged. Native controls do not display a numeric percentage in this view. The Safari window became unavailable before exact 200%, both themes and footer checks could be completed. This remains partial supplementary evidence. On 2026-10-12, the owner instructed “mark those as checked as well”; the remaining native 200% review was waived and T035 was checked at that request.

## Actual-browser execution (T036 — closed by owner waiver)

- Installed branded Chrome 155.0.8059.39 on macOS 15.7.5: full 23-scenario automated suite passes in isolated contexts, including five widths/both themes, keyboard/touch actions, preferences/failures, resources, grain/motion and live reduced motion. This is actual Chrome evidence; its touch/viewport emulation is not real mobile evidence. Manual exact text-only enlargement remains unverified and was waived by the owner for task closure.
- Native Chrome manual destinations: KOHO opened its banking homepage; alugaTI redirected to `https://www.alugati.com/`; Front In Vale opened its technology-event homepage; GitHub opened Silvio's profile. LinkedIn redirected to its auth wall while retaining the requested profile as the return destination; no sign-in was performed.
- Native Email activation focused the correctly addressed `mailto:hi@silviorodrigues.dev` link, but the mail-client handoff could not be observed. The homepage stayed available; a mail composer was not verified and no message was sent.
- Stock previous Chrome, Edge, Firefox, required Safari versions and real iOS/Android combinations in the matrix are unavailable/untested. No OS upgrades or personal browser settings changes are part of this implementation. The owner waived the remaining matrix and mail-client handoff checks for task closure on 2026-10-12. T036 is checked at that request; SC-008 coverage remains unverified.

## Owner walkthrough (T037 — complete)

On 2026-10-12, Silvio replied “approved” to the explicit owner-review request covering desktop/mobile Day and Evening, expression of his identity and curiosity, and acceptance of all four recorded visual differences. Disposition: accent focus outline accepted; uncropped descending “g” and browser text rendering accepted; 1px page-height differences accepted; absolute upper-right hover-arrow placement accepted.

T037 and SC-007 are complete. No refinements were requested, so implementation and prior validation remain unchanged. This approval covers visual acceptance; it does not certify the untested native text-only/browser/device checks or authorize publication. No screenshot-test baselines were added.


## Final command/output checks (T038)

- `node --version`: v24.20.0 selected by repository `.tool-versions`.
- Clean `npm ci`: three development packages installed, zero reported vulnerabilities; no runtime packages.
- `npm run build`: succeeds; all 31 files under `out/` match `src/` byte-for-byte, including four fonts and three OFL licenses. References, manifests, old app/blog/worker/CNAME/workflow are excluded.
- `npm run preview`: serves loopback port 4173 with HTML/CSS/JS/SVG/JPEG/WOFF2/text MIME types, correct root index, missing-path 404, and rejected encoded traversal/malformed paths.
- Missing font and injected remote image build checks fail clearly **before** replacing existing output; source restored afterward.
- Final clean-install default suite: **69/69 pass** (23 per Chromium/Firefox/WebKit), 52.6 seconds. Installed Chrome full suite: **23/23 pass**, 45.0 seconds. A prior parallel Chrome startup timed out before page/context creation; the optional branded project now uses one worker, and its full rerun passes. Default engine projects retain four workers.
- Affected failure-mode theme-geometry assertions pass after reserving both target labels' maximum size; no reflow even with all artwork/fonts blocked and doubled text.
- `git diff --check`: passes. Quickstart updated for implemented commands, rebuild/refresh workflow, Chrome option, owner acceptance and recorded verification waivers. Existing unrelated deletions remain; Git branch is `main`.
- Extension hooks: `.specify/extensions.yml` absent at preflight and final check; no before/after hooks registered or dispatched.

## Success criteria and owner-directed closure

| Criterion | Status | Evidence / disposition |
| --- | --- | --- |
| SC-001 | PASS — technical design review | Three page references/card reviewed; exact source assets/copy/order/tokens/typography/geometry, four explained visual differences accepted by the owner on 2026-10-12 |
| SC-002 | PARTIAL — remainder waived | Both themes/five widths/exact 200% root scaling/expanded copy pass; native exact 200% text-only review waived by owner |
| SC-003 | PARTIAL — remainder waived | Seven-control keyboard order, all five web popups/actions and six correct native hrefs pass; five web destinations manually verified; unverified email composer handoff waived by owner |
| SC-004 | PASS | Complete synchronous palettes/artwork, precedence/persistence/failures, <500ms, retained scroll/focus/geometry |
| SC-005 | PASS | 23-second sampling across engines/Chrome, specified durations/easing/hover and live reduced-motion changes |
| SC-006 | PASS — tested environments | Composited contrast bounds, labels/focus, ≥44px targets, failure-mode containment verified |
| SC-007 | PASS | Owner approved identity/curiosity expression and all four visual differences on 2026-10-12 |
| SC-008 | UNVERIFIED — execution waived | Owner waived the remaining actual browser/release/device combinations in the FR-020 matrix for task closure |

All tasks T001–T038 are checked (38/38). T035 and T036 were closed at the owner’s explicit request on 2026-10-12, with their remaining verification work waived. The implementation and 92 passing browser checks remain unchanged. This administrative closure does not add test evidence or authorize publication.

Constitution alignment: static code and zero runtime dependencies keep scope simple; paper identity/themes/motion explore the supplied personal direction; exact personal content/artwork preserve expression; source/output separation and unchanged unrelated deletions keep work reversible; narrow/keyboard/motion/failure checks preserve usability. Native/browser coverage gaps, owner visual approval and owner-directed verification waivers are explicit. Published-content checks remain governed by the constitution; no publication occurred.


## Publishing follow-up

On 2026-10-12, after all implementation tasks were checked and the owner approved the visual result,
the owner instructed “do it” in response to adding the GitHub Pages workflow, committing/pushing and
verifying the live site/custom domain. This separately authorizes publishing beyond the original
homepage-only implementation scope.

Added `.github/workflows/deploy.yml` to build `out/`, run Chromium checks and publish the generated
site. The existing repository Pages configuration uses workflow publishing with `silviorodrigues.dev`,
whose A records already point to GitHub Pages. The custom domain is retained in Pages settings;
workflow publishing does not require restoring the legacy `public/CNAME` file. Release commit: `d2efbc4345c41c4a38f35833355c5c6ce8f0a5a5`, pushed to `main`.

[GitHub Actions run 38306735029](https://github.com/silviorodrigues/silviorodrigues.github.io/actions/runs/38306735029)
succeeded: build/check job 1m10s, deploy job 10s, deployment completed 2026-10-12 at 20:51:15 UTC.
The Linux runner selected Node 24.20.0, built `out/`, and passed all 23 Chromium scenarios in 32.6s.
Workflow syntax also passed actionlint v1.7.12 locally. The pinned Node file was explicitly included
in the commit because the machine's global Git ignore otherwise excludes `.tool-versions`.

Published site: [silviorodrigues.dev](https://silviorodrigues.dev/). GitHub Pages reports `built`, with
workflow publishing and the original custom domain retained. HTTPS requests for every one of the
31 generated files returned 200 and matched the local output byte-for-byte, including fonts/licenses.

Live browser verification covered 1280px desktop and 390px mobile in Day and Evening: no horizontal
overflow, no failed images, unchanged heights of 1204px/1307px across themes, six links, functional
switching and persistence after reload. All runtime resource requests stayed on the custom domain;
there were no script errors or failed requests. Native Chrome also confirmed loaded fonts/artwork,
keyboard Space switching, and a reachable mobile footer. Temporary viewport overrides were reset,
and the published homepage was left open.

Live captures/evidence under `test-results/field-notes/`: `live-day.png`, `live-evening.png`,
`live-mobile-day.png`, `live-mobile-evening.png`, `live-assets.json` and `live-verification.json`.
The prior owner-waived native text-only and full real-device/version matrix checks retain their
recorded disposition; publishing verification does not relabel those gaps as executed passes.

# Tasks: Field Notes Website Design

**Input**: Design documents from `/specs/001-field-notes-design/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/homepage.md`, `quickstart.md`, `references/README.md`, and `.specify/memory/constitution.md`.

**Tests**: Focused Playwright tasks implement the specification's acceptance scenarios and the plan's requested browser validation. Write each story's assertions first, run them against the preceding increment, and confirm meaningful failures before implementation. Do not add snapshot baselines until the owner has reviewed the visuals; screenshots are comparison evidence.

**Organization**: Four story phases in specification priority order, followed by acceptance work. Logical entities live directly in HTML/CSS/assets; no database, model classes, framework, backend, or API is needed.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: May execute alongside the explicitly paired task after the dependencies listed below are complete; files do not overlap.
- **[Story]**: Maps to the corresponding user story in `spec.md`.
- Every task names its implementation or evidence file. Paths are relative to the repository root.

## Path Conventions

- Homepage: `src/index.html`, `src/styles.css`, `src/theme.js`, `src/assets/`.
- Tooling: `.tool-versions`, `package.json`, `package-lock.json`, `scripts/build.mjs`, `scripts/preview.mjs`, `playwright.config.js`.
- Browser assertions: `tests/homepage.spec.js`; captures: `test-results/field-notes/`.
- Acceptance evidence: `specs/001-field-notes-design/acceptance.md`.
- Generated site: `out/`; copy only `src/`, with local fonts/licenses. References are never page assets.
- Preserve existing unrelated deletions. Replace only planned homepage/tooling paths; do not restore the old application, blog, newsletter, worker, CNAME, or deployment workflow. No branch creation or publishing task is included.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Provide the small static build and preview workflow from the plan.

- [X] T001 Select installed Node 24.20.0 in `.tool-versions` and create `package.json`/`package-lock.json` with no runtime dependencies, development-only pinned `@playwright/test`, and `build`, `preview`, and `test` scripts calling the planned Node scripts and Playwright.
- [X] T002 [P] Implement `scripts/build.mjs` using Node standard-library APIs to validate `src/index.html`, `src/styles.css`, `src/theme.js`, and referenced local assets/fonts/licenses, replace only generated `out/`, and copy only `src/` without planning references or legacy files; report missing required resources clearly.
- [X] T003 [P] Implement `scripts/preview.mjs` using Node standard-library APIs to serve `out/` at `http://127.0.0.1:4173/` with correct HTML/CSS/JS/SVG/font/image MIME types, root index handling, 404 responses, and path containment.
- [X] T004 Update `.gitignore` to exclude Playwright `test-results/` and `playwright-report/` while retaining the existing `out/` and dependency exclusions.

**Checkpoint**: Tooling is defined; a successful build awaits the foundation source files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish durable resources, shared document hooks, and the test runner before any story implementation.

- [X] T005 [P] Copy the original `specs/001-field-notes-design/references/assets/portrait-source.jpeg` to `src/assets/portrait.jpeg`, needed Day/Evening assets to `src/assets/day/` and `src/assets/evening/`, the mobile divider to `src/assets/mobile-day/divider.svg`, the hover arrow to `src/assets/card/arrow.svg`, and four WOFF2/three OFL files to `src/assets/fonts/`; deduplicate byte-identical artwork using `references/asset-manifest.json` and `references/fonts/font-manifest.json`. Enforce AssetResource.localPath "Nonempty local file; temporary URLs never enter source HTML/CSS", sourceNode "Provenance from the design manifest", theme "Day/Evening/shared; mobile Evening derives palette with mobile geometry", geometry "Preserve SVG root/viewBox and reference slot; no broad 100%×100% sizing", sha256 "Hash recorded in planning manifests", and FontResource "Family, style, weight, Latin subset, local path, OFL license"; verify copied bytes against the recorded hashes and retain the manifests as provenance.
- [X] T006 [P] Create `src/index.html` with English metadata, viewport metadata, meaningful title, linked stylesheet/deferred theme script, root `data-theme="day"`, main/name-heading/ordered-work-list/social-footer structure, and an empty `src/theme.js` placeholder. Establish shared selectors for intro, portrait/orbit/morph wrappers, work IDs/titles/descriptions/badge/arrow, social icons/fallbacks, and theme control; reserve the top-right control row while hiding its native button until enhancement is working, so the page remains usable without JavaScript.
- [X] T007 Add baseline box sizing, normal-flow layout, Day palette variables, readable fallback stacks, and local `@font-face` declarations in `src/styles.css` using `font-display: swap`, genuine Fraunces italic 300, Roman 300–400, `SOFT=0`, `WONK=1`, Instrument Sans 400, and IBM Plex Mono 400; use rem text sizing and avoid fixed page/card heights or global SVG sizing.
- [X] T008 Configure `playwright.config.js` for Chromium, Firefox, and WebKit, isolated test contexts, loopback preview startup/reuse, and screenshots under `test-results/field-notes/`; initialize `tests/homepage.spec.js` with shared navigation/action helpers and outbound-request stubbing, install browser binaries, and verify `npm run build`/`npm run preview` serve the foundation page with local resources.

**Checkpoint**: All stories have their assets, document hooks, styles baseline, and browser harness. No user-story work starts before T001–T008 are complete.

---

## Phase 3: User Story 1 — Meet Silvio and Explore His Work (Priority: P1) — MVP

**Goal**: Deliver the useful Desktop — Day introduction, three project cards, and social footer with stable static highlights.

**Independent Test**: At 1280px in Day, read the exact introduction/card copy, inspect the three ordered whole-card links and their new-tab actions, compare the desktop composition with `references/day.png`, and confirm static hover/focus leaves descriptions, neighbors, and page length unchanged. Grain, animated transforms, other palettes, and final narrow-layout acceptance belong to later increments.

### Tests for User Story 1

- [X] T009 [US1] Add failing desktop contract/journey assertions in `tests/homepage.spec.js` for the main/heading/list/footer semantics, exact introduction and FR-003 copy/order/badge, title-based card names and description association, six initial-HTML destinations, three project new-tab actions, and stable geometry during static highlight; collect a Day screenshot for human comparison rather than auto-accepting a baseline.

### Implementation for User Story 1

- [X] T010 [P] [US1] Implement the introduction in `src/index.html`: givenName "Silvio", familyName "`Rodrigues`; italic accent, second line at reference widths", biography "Curious about how things work, and how they could work better.", emphasizedWord "`better`; ink color, attached decorative squiggle", portrait "Original local JPEG from Figma node `8:15`; preserve reference crop", portraitAlt "Meaningful description identifying Silvio Rodrigues", and decorations "Supplied ochre and squiggle resources; omitted from reading order"; use supplied artwork and keep the 65×10 squiggle inside the inline word wrapper.
- [X] T011 [US1] Populate the ordered cards in `src/index.html` with IDs following "Unique stable identifier: `koho`, `alugati`, `front-in-vale`", order "Integer 1–3; never sort by title", title "Exact visible project name", description "Exact FR-003 text", logo "Local supplied resource, theme variants where applicable", destination "Exact HTTPS destination below", smallCorner "`top-right`, `bottom-left`, or `bottom-right`", badge "Optional exact impact string; only Front In Vale has one", and navigation "Native anchor, whole card, new tab". Use the exact FR-003 descriptions, `3k+ people impacted` only on Front In Vale, and destinations `https://www.koho.ca/`, `https://alugati.com`, `https://frontinvale.com.br`; each card has one title-named anchor with associated description, no nested controls, `target="_blank"`, and `rel="noopener noreferrer"`.
- [X] T012 [US1] Populate the footer in `src/index.html` with the supplied Day divider and icons, ordered Email/LinkedIn/GitHub named native anchors to `mailto:hi@silviorodrigues.dev`, `https://www.linkedin.com/in/silviorrr/`, and `https://github.com/silviorodrigues`; enforce action "Initiate composition" for Email and "New tab" for profiles with `rel="noopener noreferrer"`, and keep logos/divider/arrow decorative.
- [X] T013 [P] [US1] Implement desktop composition against foundation selectors in `src/styles.css`: centered 760px outer column/24px inner padding, 32px theme-row top, 112px portrait, reference intro gaps, Fraunces name 96px/0.92 with −2.4px tracking, biography 19px/1.55 up to 570px, 72px hero bottom gap/list 8px top gap, 8px card gaps, 28px horizontal/24px vertical card padding, 20px logo/text gap, 36×38px logo slots, 24px titles/15px descriptions/12px badge, asymmetric 28px/8px corners, and footer spacing from `contracts/homepage.md`; reserve upper-right arrow and 4px lift space without adding in-flow hover content.
- [X] T014 [US1] Add static card hover/focus cues in `src/styles.css` using accent titles, sprig `#a08c76` borders, `0 18px 40px -24px rgba(60,40,25,0.4)` shadow, and the absolute 18px supplied arrow; gate pointer hover with `(hover: hover)`, add a visible accent keyboard-focus outline, and keep all card copy and geometry stable. Animated lift/rotation is deferred to US4.
- [X] T015 [US1] Run the US1 Playwright scenarios, inspect `test-results/field-notes/us1-day.png` against `specs/001-field-notes-design/references/day.png` and the static portion of `references/card.png`, and record action results, geometry measurements, visual differences, and screenshot location in `specs/001-field-notes-design/acceptance.md`; correct US1 failures in `src/index.html`/`src/styles.css` before marking the story complete.

**Checkpoint**: The Day desktop MVP is useful with all six outbound actions; no theme or motion feature is needed to read it or follow a project.

---

## Phase 4: User Story 2 — Browse and Connect on a Small Screen (Priority: P1)

**Goal**: Make the same content, contact actions, and static cues usable at narrow widths, enlarged text, keyboard input, and first touch.

**Independent Test**: At 390px Day compare with `references/mobile-day.png`, navigate the six existing links by keyboard, and tap each card once with touch/no-hover input. At 320/390/768/1280/1440px and 200% root text scaling confirm wrapping and reachable footer. The seventh control and both-theme rerun are integrated when US3 supplies the working theme enhancement; actual text-only browser enlargement remains a final manual check.

### Tests for User Story 2

- [X] T016 [US2] Add failing Day responsive/input/resource scenarios in `tests/homepage.spec.js`: five specified widths, 200% root text scaling and longer-copy injection, name/biography/card/badge wrapping, no horizontal scrolling or overlap, attached squiggle, footer reachability, 44×44px social targets, visible keyboard focus and six-link order, Enter actions, first-touch project navigation, font/icon/logo/portrait/decorative request failures, and readable page with JavaScript disabled; stub outbound services rather than require their uptime.

### Implementation for User Story 2

- [X] T017 [P] [US2] Implement mobile/intermediate layouts in `src/styles.css` with 24px page margins, 54px/0.92 two-line name below the initial 768px breakpoint, proportional tracking, shrinkable text columns, natural card heights, wrapped title/badge rows, 200% text-compatible word wrapping, responsive mobile divider geometry, and centered 44×44px social targets; preserve squiggle attachment, reserved artwork slots, no-horizontal-overflow layout, and visible focus without relying on hover.
- [X] T018 [P] [US2] Complete input and icon-failure semantics in `src/index.html`: maintain six-link reading/tab order and meaningful names, descriptive portrait alternative, decorative empty alternatives, and native first-tap navigation; implement social icon load/error handling with visible text fallbacks and no-JavaScript usability, satisfying "Names remain available without the icon file; failed icon loading must show a usable visible text fallback." Keep fallback handling independent of theme activation and preserve the hidden theme-button hook for US3.
- [X] T019 [US2] Run US2 assertions, capture `test-results/field-notes/us2-mobile-day.png`, inspect against `specs/001-field-notes-design/references/mobile-day.png`, and record narrow-layout, text-scaling, keyboard, first-touch, and individual-resource results in `specs/001-field-notes-design/acceptance.md`; correct US2 failures in `src/index.html`/`src/styles.css` and list the pending US3 theme-control/both-palette checks explicitly.

**Checkpoint**: Mobile Day, contact actions, keyboard links, and no-hover touch input are usable. Theme-specific scenarios are explicitly deferred, not recorded as passes.

---

## Phase 5: User Story 3 — Choose Day or Evening (Priority: P2)

**Goal**: Switch complete palettes and artwork without reflow, preserve explicit choices when storage works, and handle device/storage failures.

**Independent Test**: Verify fresh light/dark contexts, saved and invalid values, Day fallback, repeated button activation and reload, then storage property/read/write failures. Compare 1280px Evening with `references/evening.png` and mobile Evening with mobile Day geometry. Theme activation must update within 0.5s while preserving focus, scroll, and layout; all seven controls now work by keyboard.

### Tests for User Story 3

- [X] T020 [US3] Add failing appearance assertions in `tests/homepage.spec.js` for saved-choice/device/Day precedence, no inferred preference writes, invalid stored values, unavailable/throwing device query, independently throwing localStorage getter/getItem/setItem, explicit persistence after reload/revisit, moon/sun and target-theme names, Enter/Space switching, seven-control tab order, complete palette/artwork updates, ≤0.5s switching with stable geometry/focus/scroll, and the US2 five-width/200%-scaling scenarios in both palettes.

### Implementation for User Story 3

- [X] T021 [US3] Implement early guarded appearance initialization in `src/index.html` before visible content using storageKey "`field-notes-theme`", storedValue "Exact `day` or `evening`; all other values are ignored", activeTheme "`day` or `evening`, held in root `data-theme` and visit memory", source "Logical provenance: saved explicit choice, device, fallback, or current-visit explicit choice", and savingAvailable "Storage operations may fail independently; no user-facing error needed"; resolve saved choice, then device, then Day, never write on initialization, and expose one resolved root state for the deferred controller without duplicating resolution.
- [X] T022 [P] [US3] Implement Evening variables and resource selection in `src/styles.css` using paper/ink/muted/card/line/accent `#17140f`/`#efe8dc`/`#b7aea2`/`#1f1b16`/`#352e26`/`#e0987a`, alongside Day `#f2ede3`/`#231f1c`/`#5a534c`/`#f8f4ec`/`#ddd3c4`/`#9c4a2a`; keep ochre `#b9772e` and sprig `#a08c76`, use supplied theme variants, and apply Evening line color to the unchanged mobile divider silhouette by CSS masking without altering layout or SVG geometry.
- [X] T023 [P] [US3] Implement the native-button controller in `src/theme.js` after T021: read the already-resolved root theme, synchronously toggle root state/icon/target name, use "Switch to Evening" with the Day moon and "Switch to Day" with the Evening sun, attempt only explicit-choice writes of `day`/`evening`, guard storage property/setItem failures, and retain the new visit-memory theme if saving fails; preserve focus/scroll and do not add a live device-theme listener or layout transitions.
- [X] T024 [US3] Wire the circular ≥44×44px theme button and both supplied icon resources in `src/index.html`, reveal it only after `src/theme.js` successfully enables interaction, reuse visible text fallbacks if the active icon fails, and keep it first in tab order; verify all surfaces, decorations, logos, social icons, and divider update using the T022 resource hooks.
- [X] T025 [US3] Run US3 plus the US2 both-theme/seventh-control scenarios, capture `test-results/field-notes/us3-evening.png` and `test-results/field-notes/us3-mobile-evening.png`, and record reference comparison, initialization/failure outcomes, exact switch timing, geometry/focus/scroll stability, and cleared US2 deferrals in `specs/001-field-notes-design/acceptance.md`; correct failures in `src/index.html`, `src/styles.css`, or `src/theme.js`.

**Checkpoint**: Both palettes work across widths; storage failures affect persistence only; all seven controls are keyboard operable.

---

## Phase 6: User Story 4 — Experience the Handcrafted Details (Priority: P3)

**Goal**: Add bounded organic motion, theme-aware paper grain, and animated pointer highlights while honoring reduced motion.

**Independent Test**: Observe normal motion for 22 seconds, inspect the 10s/22s/7s loops and 0.35s card transition, compare the highlight with `references/card.png`, and repeat with reduced motion both on load and changed during the visit. Texture cannot intercept input; neighbors and page length remain stable.

### Tests for User Story 4

- [X] T026 [US4] Add failing motion/texture assertions in `tests/homepage.spec.js` for 10s ease-in-out portrait morph, 22s linear orbit, 7s ease-in-out ochre morph, bounded decoration geometry, full-page grain at 0.22 opacity with Day multiply/Evening soft-light and no pointer interception, hover translation −4px/rotation −0.3deg over 0.35s ease, stable neighbors/description/badge/page length, static keyboard focus, and suppression of continuous/card motion when reduced-motion changes before or during the visit.

### Implementation for User Story 4

- [X] T027 [P] [US4] Create the annotation-only fractal-noise resource in `src/assets/paper-grain.svg`; use an SVG noise tile suitable for the fixed page overlay, introduce no external dependency, and leave all supplied portrait/logo/icon/decorative artwork unchanged.
- [X] T028 [P] [US4] Complete separate portrait clipping, ochre orbit, and ochre clipping wrappers in `src/index.html`, keeping the original 112px portrait crop, supplied 112px ochre silhouette, initial 22px-right/−14px-up offset, decorative reading-order exclusion, and a reserved bounded envelope behind the portrait that never intersects the theme button or name.
- [X] T029 [US4] Implement independent CSS border-radius morph/orbit keyframes in `src/styles.css` for 10s ease-in-out portrait, 22s linear full orbit, and 7s ease-in-out ochre morph; enable them only for `(prefers-reduced-motion: no-preference)`, retain a complete static composition for reduce, and handle live media-preference changes without affecting document flow.
- [X] T030 [US4] Add the fixed full-page grain overlay in `src/styles.css` at 22% opacity, Day multiply/Evening soft-light, isolated blending, no pointer events or accessibility content; add −4px/−0.3deg/0.35s ease card transforms only for hover-capable input with no reduced-motion preference, retaining static accent/border/shadow/arrow cues for keyboard and reduced motion with no movement or geometry transition.
- [X] T031 [US4] Run US4 and previous-story regressions, observe live motion for 22 seconds in both themes, capture `test-results/field-notes/us4-card-hover.png`, and record durations/easing, orbit bounds, texture/readability, stable hover geometry, and loaded/live reduced-motion outcomes in `specs/001-field-notes-design/acceptance.md`; correct failures in `src/index.html`, `src/styles.css`, or `src/assets/paper-grain.svg`.

**Checkpoint**: All four stories are implemented; final visual, actual-browser, and owner acceptance still require evidence.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Complete SC-001–SC-008 acceptance without treating engine emulation or unreviewed captures as launch evidence.

- [X] T032 Complete and run combined failure/regression coverage in `tests/homepage.spec.js` for both themes with each font, portrait, logo, icon, and decorative request individually blocked, no JavaScript, denied storage, expanded copy, and reduced motion; confirm preserved reserved slots, meaningful names, visible icon text fallbacks, reachable links, and local-only runtime resource requests, then record Chromium/Firefox/WebKit results in `specs/001-field-notes-design/acceptance.md`.
- [X] T033 At acceptance-review start, consult the vendor release records linked from `specs/001-field-notes-design/research.md` and create the FR-020 matrix in `specs/001-field-notes-design/acceptance.md` with review date, latest/previous stable Chrome, Edge, Firefox, Safari, iOS Safari, and Android Chrome baselines, actual tested browser/OS/device versions, applicable scenarios, results, and explicit untested gaps; do not guess releases or equate Playwright engines with branded browsers.
- [X] T034 Compare final full-page captures at 1280px Day/Evening and 390px Day against `specs/001-field-notes-design/references/day.png`, `references/evening.png`, `references/mobile-day.png`, and hover against `references/card.png`; refine crop, typography/optical sizing, assets, asymmetric corners, wrapping, spacing, and state cues in `src/index.html`/`src/styles.css` as needed, rerun affected assertions, and record screenshot locations and every remaining visual deviation in `specs/001-field-notes-design/acceptance.md`.
- [X] T035 Manually check actual browser text-only enlargement at 200%, keyboard focus/action order, ≥44×44px theme/social targets, and composited text contrast in both themes including badge, fallback text, icons, focus, and grain; measure ordinary text ≥4.5:1 and large text ≥3:1, correct issues in `src/styles.css`/`src/index.html`, and record measurements and the deliberate accent focus-outline deviation in `specs/001-field-notes-design/acceptance.md`.
- [X] T036 Execute the applicable `specs/001-field-notes-design/quickstart.md` scenarios on every required actual browser/version/device combination, manually open all six destinations once, and record outcomes/evidence in `specs/001-field-notes-design/acceptance.md`; fix applicable homepage failures in `src/index.html`/`src/styles.css`/`src/theme.js` and rerun affected checks. Record inaccessible combinations as untested; SC-008 remains incomplete until all applicable required combinations pass, and external-service downtime does not imply a homepage failure.
- [X] T037 Conduct the SC-007 owner walkthrough at desktop/mobile sizes and both themes using the final captures and deviations in `specs/001-field-notes-design/acceptance.md`; record the owner's identity/curiosity assessment and explicit disposition of each visual deviation, make requested homepage refinements in `src/index.html`/`src/styles.css`/`src/theme.js`, and rerun affected checks. Leave acceptance pending if the owner has not reviewed it.
- [X] T038 Validate the clean-install/build/preview/test commands from `specs/001-field-notes-design/quickstart.md`, verify `out/index.html` plus assets/fonts/licenses exclude planning references and legacy features, update that guide to match the implemented commands and limitations, and finalize `specs/001-field-notes-design/acceptance.md` with SC-001–SC-008 status and a brief constitution alignment check; preserve unrelated working-tree deletions and do not publish or restore deployment files.


**Owner-directed closure — 2026-10-12**: The owner instructed “mark those as checked as well” for T035 and T036. Their remaining native 200% text-only, mail-client handoff, and actual-browser/version/device checks are waived for task closure. Existing executed results and unverified coverage gaps remain recorded in `acceptance.md`; these checkmarks do not represent additional tests having run.

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup T001–T004 precedes foundation T005–T008.
- Foundation blocks all stories: T005 and T006 may run together; T007 follows both, and T008 follows T001–T007.
- Priority sequence is US1 → US2 → US3 → US4; their shared HTML/CSS/test files make concurrent whole-story implementation unsafe.
- US1 uses only foundation assets/hooks and is the desktop Day MVP.
- US2 builds on US1 content. Its Day/input checks are independent of themes; its full specification acceptance also needs US3 to provide the seventh control and both-theme checks.
- US3 uses US1 content and US2 responsive/fallback hooks; T025 closes the deferred US2 checks.
- US4 uses US1 static artwork/highlights and US3 palettes, and preserves US2 wrapping/input behavior.
- Polish requires all four stories. T033 records the browser baseline at the start of acceptance review, before T034–T036 acceptance execution; after recording it, perform final visual/accessibility review before the full actual-browser matrix. T037 uses the final visual evidence; T038 follows all executed checks and reports any unresolved acceptance gaps honestly.

### Dependency Graph

```text
T001 → (T002 ∥ T003), T004
  ↓ setup complete
(T005 ∥ T006) → T007 → T008
  ↓ foundation complete
US1: T009 → (T010 ∥ T013); T010 → T011 → T012
     T010–T013 → T014 → T015
  ↓
US2: T016 → (T017 ∥ T018) → T019
  ↓
US3: T020 → T021 → (T022 ∥ T023) → T024 → T025
  ↓ also completes US2 theme acceptance
US4: T026 → (T027 ∥ T028) → T029 → T030 → T031
  ↓
Polish: T032 → T033 → T034 → T035 → T036 → T037 → T038
```

T029 specifically needs T028; T030 needs T027 and T029. Numbered order is the default within phases; T033 records the release baseline before final acceptance checks begin. Acceptance gaps or missing owner review do not become passes when the local implementation is finished.

### Within Each User Story

- Complete its failing acceptance assertions before implementation; test tasks share `tests/homepage.spec.js` and must not run concurrently.
- Respect the explicit paired-file opportunities below. A `[P]` marker does not remove the preceding-test or phase prerequisites.
- Complete content/resource hooks before integrated rendering, then run story validation and record evidence.
- Later stories rerun earlier affected scenarios; each checkpoint has a visitor journey that can be assessed without running the entire matrix.

### Parallel Opportunities

- Setup: T002 build and T003 preview after T001.
- Foundation: T005 assets and T006 document shell after setup.
- US1: T010 introduction markup and T013 desktop CSS after T009; T011/T012 follow T010 in the same HTML file while CSS is independent. T014 waits for all of them.
- US2: T017 responsive CSS and T018 semantics/icon fallback markup after T016.
- US3: T022 palette CSS and T023 controller after T021; T024 then integrates their hooks.
- US4: T027 grain asset and T028 motion markup after T026.
- Do not concurrently edit `src/index.html`, `src/styles.css`, `tests/homepage.spec.js`, or `acceptance.md` across tasks/stories.

---

## Parallel Example: User Story 1

After T009 has failed against the foundation page:

```text
T010: Implement exact introduction and supplied artwork in src/index.html.
T013: Implement desktop composition using agreed foundation selectors in src/styles.css.
```

Then finish T011/T012 HTML and T014 integrated static highlights before T015.

## Parallel Example: User Story 2

After T016 has failed against US1:

```text
T017: Implement mobile/intermediate and enlarged-text layout in src/styles.css.
T018: Complete native input semantics and social-icon text fallbacks in src/index.html.
```

Join both before T019; do not claim theme-control coverage until T025.

## Parallel Example: User Story 3

After T020 has failed and T021 has established early appearance state:

```text
T022: Add Evening tokens and theme artwork selectors in src/styles.css.
T023: Add guarded activation and explicit persistence in src/theme.js.
```

Join both before T024 markup integration and T025 validation.

## Parallel Example: User Story 4

After T026 has failed against the themed static page:

```text
T027: Create annotation-only noise tile in src/assets/paper-grain.svg.
T028: Complete independent motion wrappers in src/index.html.
```

Join the asset/markup work, implement CSS motion/overlay/highlights, and run T031.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete setup and foundation, preserving the intentionally deleted application.
2. Complete US1 and validate the Desktop — Day content, project actions, footer, and stable highlights.
3. Demonstrate the static Day MVP locally. Mobile, theme, motion, and launch acceptance remain later work; this checkpoint is not authorization to publish.

### Incremental Delivery

1. Add US2 and verify Mobile — Day, all six link actions, wrapping, keyboard navigation, first touch, and fallbacks.
2. Add US3 and verify the complete two-palette experience, seventh control, preference precedence/persistence/failures, and US2 both-theme acceptance.
3. Add US4 and verify texture, organic loops, stable animated hover, and live reduced-motion handling.
4. Complete the final visual, contrast/text-enlargement, actual-browser, and owner acceptance record. Launch readiness requires SC-001–SC-008 evidence, including no untested required browser combinations.

### Parallel Execution Strategy

Use only the explicitly paired tasks once their prerequisites are complete. Whole-story work remains sequential because the page uses one HTML file, one stylesheet, and one test suite. Parallel examples describe available scheduling opportunities; they do not require spawning agents.

## Notes

- Exact copy, field constraints, and destinations are governed by `data-model.md` and `spec.md`; supplied artwork/geometry and resource hashes are governed by the local manifests.
- Planning screenshots are comparison targets; grain and motion are annotated additions absent from those frames.
- Do not add tests mirroring static implementation details; assert visitor behavior, actions, wrapping, resource failures, and layout stability.
- Record real results and acceptance limitations. Do not certify visual identity, actual Safari/mobile devices, or previous stable releases from automated engine tests alone.
- No remote design/font fetch is required to implement the acquired reference assets. Browser releases are verified when acceptance begins, rather than frozen at task generation time.

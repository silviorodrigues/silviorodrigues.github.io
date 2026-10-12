# Quickstart and Acceptance Guide

**Feature**: [spec.md](spec.md) | **Contract**: [contracts/homepage.md](contracts/homepage.md)

The static homepage and commands below are implemented, and all 38 tasks are checked. Browser-engine
checks pass. Owner visual acceptance was approved on 2026-10-12; the owner then waived the remaining
manual text-only, mail-client handoff and actual-browser/device checks for task closure. Executed
results and unverified coverage remain tracked in [acceptance.md](acceptance.md).

## Prerequisites and local run

Node 24.x, npm, and Playwright browser binaries. `.tool-versions` selects installed asdf Node
24.20.0. Use a loopback HTTP origin for storage tests. The only package is pinned development-only
`@playwright/test`; there are no runtime dependencies.

From the repository root after implementation:

```sh
node --version
npm ci
npx playwright install chromium firefox webkit
npm run build
npm run preview
```

Expected: Node 24.x; build creates `out/index.html` and local assets, excluding planning references.
Preview serves `http://127.0.0.1:4173/` and stays running until Ctrl+C. After source changes, rebuild
and refresh the browser; preview does not watch source files. No temporary Figma or runtime font-CDN requests. Scripts
use Node standard library; preview defaults to loopback. Deployment is configured by the publishing follow-up below.

In another terminal:

```sh
npm test
```

Expected: focused `tests/homepage.spec.js` passes in configured Chromium, Firefox, and WebKit
projects. Playwright starts/reuses the local preview server; tests isolate browser storage and
media preferences. Screenshot outputs aid human review rather than automatically accepting baselines. The default
suite has 23 scenarios per engine (69 total), including grouped independent resource failures.
Reports/traces are under `playwright-report/` and `test-results/runs/`; review captures and measured
evidence are under `test-results/field-notes/`, all ignored by Git. macOS WebKit link traversal uses
Option+Tab, matching its native keyboard setting.

To also run the suite against an already installed branded Google Chrome in an isolated context:

```sh
FIELD_NOTES_CHROME=1 npm test
```

This adds actual Chrome evidence, while previous releases, other brands, and real devices remain
separate checks in the acceptance matrix. No browser installation or OS upgrade is performed by tests.

## Focused scenarios

| Scenario | Procedure | Expected outcome / criteria |
| --- | --- | --- |
| Reference composition | Capture 1280px Day/Evening and 390px Day; compare full page to `references/day.png`, `evening.png`, `mobile-day.png` | Exact copy, correct assets, order, typography, corners, badge and spacing; SC-001 |
| Responsive layout | Both themes at 320, 390, 768, 1280, 1440px; scroll to footer | No horizontal overflow/overlap; every item reachable; SC-002 |
| Text enlargement | Use 200% browser text-only enlargement at mobile/desktop widths; also check root text scaling and fallback fonts | Copy/badge/name wrap, cards grow, footer and all controls usable; SC-002/006 |
| Keyboard/actions | Tab through seven controls; Enter activates links; Enter/Space toggles theme; inspect all destinations | Visible focus, meaningful names, correct order, three project/two profile popups and one mailto; SC-003/006 |
| First touch | Tap each card with touch/no-hover input | First tap navigates; no hover-reveal gate |
| Theme precedence | Fresh light/dark context; stored Day with dark device; stored Evening with light device; invalid stored string; unavailable device query | Saved choice wins; device otherwise; Day fallback; correct target icon/name |
| Theme persistence | Toggle, reload and revisit same origin | Explicit choice restored when saving works; no inferred choice saved; SC-004 |
| Storage failure | Inject throwing storage property getter, getItem, and setItem separately before page scripts | Initialization/switching remain usable; failed write does not undo current appearance |
| Stable geometry | Measure neighbor positions, descriptions, page scroll height and scroll offset before/after hover/theme | Theme completes within 0.5s; hover transforms only target; descriptions/badges do not reflow |
| Normal motion | Observe 22s, inspect computed animation durations/easing, then hover card | 10s portrait morph, 22s linear orbit, 7s ochre morph; −4px/−0.3°/0.35s hover; SC-005 |
| Reduced motion | Load with reduce, hover/focus, then change media preference while open | No continuous decoration or card movement; static cues and actions preserved; SC-005 |
| Resource failure | Block font URLs, portrait, logo, each icon and decoration individually | Readable fallbacks, preserved copy/destinations, visible icon-control fallback labels; FR-019 |
| Contrast/targets | Inspect all text and interactive states in both themes, including badge, icons, focus and composited grain | Text 4.5:1/large 3:1; distinct visible focus; theme/social ≥44×44px; SC-006 |

Automated tests cover behavior, semantic names, destination attributes/actions, persistence/failure,
motion media, and layout stability. Stub outbound navigation where needed to inspect the intended
action without depending on third-party uptime. Manually open destinations once to verify the
visitor experience; an unavailable external service does not make the homepage fail.

## Actual-browser acceptance

At review start, obtain latest and previous stable releases from vendor records referenced in
[research.md](research.md). Record the review date, required releases, actual tested versions,
OS/device, applicable scenarios, results, and remaining gaps in a short acceptance record under
this feature directory. Safari records include Safari and iOS/macOS versions. Android records
include Chrome and Android/device versions.

Run applicable scenarios in both versions of desktop Chrome, Edge, Firefox, Safari, iOS Safari,
and Android Chrome. Hover is applicable to hover-capable input; keyboard testing uses supported
keyboard input. Playwright WebKit is not branded Safari, patched Firefox is not stock Firefox,
and emulation is not a real mobile-device result. Record inaccessible combinations as untested;
SC-008 requires no remaining applicable failures or untested required combinations before launch.

## Visual review and completion evidence

Inspect every local asset's slot, crop/layer order, and actual rendered geometry against references.
Compare card highlight to `references/card.png`; texture/motion are annotated additions, absent
from static frame screenshots. Check mobile Evening using mobile Day geometry and Evening tokens.

Record browser/test results, screenshot locations, measured contrast, motion observations, and
any smallest necessary visual deviation. The accent focus outline supplements supplied styling
because the Day sprig border alone fails focus contrast. Have the project owner assess identity
and accept recorded deviations for SC-007; do not report owner acceptance before it occurs.


## Publishing

The owner authorized publishing after implementation and visual acceptance. `.github/workflows/deploy.yml`
runs on site/tooling/test changes pushed to `main` or manual dispatch. Documentation-only changes
do not redeploy the site. It selects Node from `.tool-versions`, installs locked
dependencies, builds `out/`, runs the Chromium browser suite, uploads only `out/`, and deploys through
the `github-pages` environment after successful checks. Deployment write/OIDC permissions are limited
to the deploy job. One deployment runs at a time.

GitHub Pages is already configured to use GitHub Actions and the custom domain `silviorodrigues.dev`.
For this workflow-based publishing source, the custom domain is retained in repository Pages settings;
a CNAME file is not required. DNS already points the apex domain to GitHub Pages.

```sh
npm ci
npm run build
npm test -- --project chromium
git push origin main
```

Monitor the **Deploy to GitHub Pages** run, then verify `https://silviorodrigues.dev/` at desktop/mobile
sizes, check Day/Evening switching, and confirm local assets load without errors. The earlier owner-waived
manual browser/device gaps remain recorded in `acceptance.md`.

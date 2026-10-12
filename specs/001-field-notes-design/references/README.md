# Durable Design References

Retrieved 2026-10-12 from Figma file `WM76FJZj2IipsyAGoXOpvr` through design context, variables,
screenshot, and source-image export tools. Temporary asset URLs are intentionally omitted from
the design manifest. Source provenance, sizes, root SVG metadata, and SHA-256 hashes are in
[asset-manifest.json](asset-manifest.json).

## Comparison targets

| File | Figma node | Purpose |
| --- | --- | --- |
| `day.png` | `8:5` | 1280×1203 Desktop — Day |
| `evening.png` | `8:101` | 1280×1203 Desktop — Evening |
| `mobile-day.png` | `8:140` | 390×1306 Mobile — Day |
| `card.png` | `7:42` | Default/hover component including rendered overflow |

Screenshots are visual targets only, never implementation assets. The card export includes shadow
overflow and therefore measures 762×311 rather than the component's 762×306 canvas metadata.

## Supplied assets and slots

Frame asset directories `assets/day/`, `assets/evening/`, `assets/mobile-day/` contain their
theme/geometry variants; hashes identify byte-identical files suitable for deduplication.

| Resource | Slot / source |
| --- | --- |
| `assets/portrait-source.jpeg` | Original uploaded photograph from `8:15`; use in moving portrait crop |
| `portrait-reference.png` | Exported photo layer per frame; static crop/shape comparison, not the moving image source |
| `koho.png` | `7:4`/`7:5`; 36px mark, 10px corner radius, in 36×38px logo slot |
| `alugati.svg` | `7:6`; 36×36px mark, 2px vertical slot offset |
| `front-in-vale.svg` | `7:11`; intrinsic about 35.79×32px, in 36×38px slot |
| `ochre.svg` | 112×112px artwork; behind portrait, initial offset 22px/−14px |
| `squiggle.svg` | 65×10px; attached beneath “better” |
| `theme.svg` | 18×18px moon (Day) or sun (Evening); centered in 44px control |
| `divider.svg` | Desktop 712×14px or mobile 342×14px slot; mobile Evening uses mobile shape and Evening line color |
| `email.svg`, `github.svg` | 18×18px icons inside 44px activation areas |
| `linkedin.svg` | 17×17px icon inside 44px activation area |
| `assets/card/arrow.svg` | 18×18px supplied hover arrow, upper-right card decoration |

Copy needed assets into planned `src/assets/` during implementation. Preserve SVG files/root
dimensions/viewBox and exact artwork; position/clip wrappers for motion, use original portrait
with reference crop, and avoid broad SVG sizing rules. Do not replace logos/icons with generic
libraries. The only generated resource is annotated fractal-noise grain, absent from supplied frames.

## Fonts

[fonts/font-manifest.json](fonts/font-manifest.json) records Google Fonts catalog request,
public source URLs, family/style/weight/subset, hashes, and acquisition date.

- `fraunces-normal.woff2`: Roman weights 300–400, optical sizes 9–144; SOFT 0, WONK 1.
- `fraunces-italic.woff2`: genuine italic 300, same optical/shape settings.
- `instrument-sans-normal.woff2`: 400, normal width.
- `ibm-plex-mono-normal.woff2`: 400.

Latin subsets include current copy's accented characters. Keep the three `*-OFL.txt` files with
fonts in source and static output; runtime font-CDN access is unnecessary. Compare optical sizing
and fallback behavior during visual review.

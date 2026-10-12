# Data Model: Field Notes

**Feature**: [spec.md](spec.md) | **Design**: [homepage contract](contracts/homepage.md)

These are logical entities represented directly by static HTML/CSS and local files. They do not
require a database, API, runtime model classes, or a content-generation layer.

## PersonalIntroduction (one)

| Field | Value / validation |
| --- | --- |
| givenName | `Silvio` |
| familyName | `Rodrigues`; italic accent, second line at reference widths |
| biography | `Curious about how things work, and how they could work better.` |
| emphasizedWord | `better`; ink color, attached decorative squiggle |
| portrait | Original local JPEG from Figma node `8:15`; preserve reference crop |
| portraitAlt | Meaningful description identifying Silvio Rodrigues |
| decorations | Supplied ochre and squiggle resources; omitted from reading order |

Related to the single ordered work list and social footer on the homepage. Source copy is exact;
enlargement or future content must wrap rather than disappear.

## WorkItem (three ordered records)

| Field | Type / rule |
| --- | --- |
| id | Unique stable identifier: `koho`, `alugati`, `front-in-vale` |
| order | Integer 1–3; never sort by title |
| title | Exact visible project name |
| description | Exact FR-003 text |
| logo | Local supplied resource, theme variants where applicable |
| destination | Exact HTTPS destination below |
| smallCorner | `top-right`, `bottom-left`, or `bottom-right` |
| badge | Optional exact impact string; only Front In Vale has one |
| navigation | Native anchor, whole card, new tab |

| Order / ID | Title | Description | Destination | Small corner | Badge |
| --- | --- | --- | --- | --- | --- |
| 1 / koho | KOHO | Staff Software Engineer, working out how everyday banking could feel simpler. | `https://www.koho.ca/` | top-right | None |
| 2 / alugati | alugaTI | Rethinking how companies get their tech: rent it, keep it current, and get support built in. | `https://alugati.com` | bottom-left | None |
| 3 / front-in-vale | Front In Vale | A front-end conference in Brazil's Vale do Paraíba, sharing how the web works and how to build it better. | `https://frontinvale.com.br` | bottom-right | `3k+ people impacted` |

Each item has one focusable anchor, no nested buttons/links, a title-based accessible name and
description association. Logos and arrow are decorative when the title already identifies the
project. The badge wraps below the title when needed and may wrap its own text at extreme enlargement.

## SocialDestination (three ordered records)

| Order | Channel/name | Destination | Action |
| --- | --- | --- | --- |
| 1 | Email | `mailto:hi@silviorodrigues.dev` | Initiate composition |
| 2 | LinkedIn | `https://www.linkedin.com/in/silviorrr/` | New tab |
| 3 | GitHub | `https://github.com/silviorodrigues` | New tab |

Each has a local theme-specific icon and a minimum 44×44px target. Names remain available without
the icon file; failed icon loading must show a usable visible text fallback.

## AppearancePreference (optional persisted scalar)

| Field | Rule |
| --- | --- |
| storageKey | `field-notes-theme` |
| storedValue | Exact `day` or `evening`; all other values are ignored |
| activeTheme | `day` or `evening`, held in root `data-theme` and visit memory |
| source | Logical provenance: saved explicit choice, device, fallback, or current-visit explicit choice |
| savingAvailable | Storage operations may fail independently; no user-facing error needed |

Only explicit activation writes the stored scalar. Provenance and saving availability do not
need a serialized object.

| Event | Next appearance | Persistence |
| --- | --- | --- |
| Load with valid saved choice | Saved choice, regardless of device | No write |
| Load without valid choice, device dark | Evening | No write |
| Load without valid choice, device light/unavailable | Day | No write |
| Storage read/property access throws | Device choice, otherwise Day | No write |
| Activate switch in Day | Evening; sun icon; name `Switch to Day` | Attempt to save `evening` |
| Activate switch in Evening | Day; moon icon; name `Switch to Evening` | Attempt to save `day` |
| Saving throws | Keep newly selected appearance during visit | No durable guarantee |
| Reload | Resolve precedence again | Restore explicit choice if saving succeeded |

Theme changes retain all content, focus, scroll, and geometry. No live system-theme listener is
required; reduced-motion media changes are handled dynamically by CSS.

## DesignReference and AssetResource

| Entity / field | Rule |
| --- | --- |
| DesignReference.fileKey | `WM76FJZj2IipsyAGoXOpvr` |
| frameNodes | `8:5` Day, `8:101` Evening, `8:140` mobile Day |
| componentNodes | `7:42` work card; `7:4`, `7:6`, `7:11` logos |
| annotationNode | `8:236` texture/motion notes |
| AssetResource.localPath | Nonempty local file; temporary URLs never enter source HTML/CSS |
| AssetResource.sourceNode | Provenance from the design manifest |
| AssetResource.theme | Day/Evening/shared; mobile Evening derives palette with mobile geometry |
| AssetResource.geometry | Preserve SVG root/viewBox and reference slot; no broad 100%×100% sizing |
| AssetResource.sha256 | Hash recorded in planning manifests |
| FontResource | Family, style, weight, Latin subset, local path, OFL license |

No network fetch or external-service availability is needed to render the homepage after assets
are served. Artwork failure preserves reserved space and content; fonts fall back to readable stacks.

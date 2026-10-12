# Feature Specification: Field Notes Website Design

**Feature Branch**: `main` (existing branch; no branch-creation hook configured)

**Created**: 2026-10-12

**Status**: Draft — validated for planning

**Input**: User description: "implement my new website design. Full spec on
https://www.figma.com/design/WM76FJZj2IipsyAGoXOpvr/silviorodrigues.dev-%E2%80%94-Field-Notes?node-id=0-1&p=f&m=dev"

## Clarifications

### Session 2026-10-12

- Q: Which browsers must the website fully support at launch? → A: Latest two stable versions
  of Chrome, Edge, Firefox, and Safari, including mobile Safari and Chrome on Android.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Meet Silvio and Explore His Work (Priority: P1)

As a visitor, I want a distinctive, readable introduction to Silvio and his work so I can
understand his interests and follow a project that interests me.

**Why this priority**: The introduction and work cards are the purpose of this personal space
and provide a complete useful experience without theme switching or animation.

**Independent Test**: Open the homepage, read the introduction and three work cards, then follow
each project link. Compare the page with the desktop Day reference.

**Acceptance Scenarios**:

1. **Given** a visitor opens the homepage at the reference desktop width, **When** the page is
   displayed, **Then** the portrait, two-line name, biography, three ordered work cards, and footer
   appear with the composition, typography, colors, artwork, and spacing of Desktop — Day.
2. **Given** the introduction is displayed, **When** the visitor reads it, **Then** the name is
   "Silvio Rodrigues" and the biography is "Curious about how things work, and how they could work
   better.", with the designed emphasis and squiggle beneath "better".
3. **Given** the work list, **When** a visitor reviews the cards, **Then** KOHO, alugaTI, and
   Front In Vale appear in that order with the exact copy and badge listed in FR-003.
4. **Given** any work card, **When** it is activated by click or keyboard, **Then** its project
   destination opens; the whole card is one clearly named link.
5. **Given** a pointer is over a work card, **When** hover begins or ends, **Then** its designed
   highlight appears or clears without moving neighboring cards or changing the page length.

---

### User Story 2 - Browse and Connect on a Small Screen (Priority: P1)

As a visitor on a phone or using a keyboard, I want all content and contact options to remain
accessible so I can explore and contact Silvio without relying on a desktop or pointer hover.

**Why this priority**: The supplied mobile design is part of the requested experience, and
visitors must be able to use the personal space across devices and input methods.

**Independent Test**: At a 390-pixel viewport, compare the page with Mobile — Day, scroll to the
footer, and activate the three social links. Repeat navigation with only a keyboard.

**Acceptance Scenarios**:

1. **Given** a 390-pixel-wide viewport, **When** the homepage is displayed, **Then** it matches
   Mobile — Day's 24-pixel side margins, smaller two-line name, wrapping biography and cards,
   wrapped impact badge, and centered social links, with no horizontal scrolling.
2. **Given** a viewport between 320 and 1440 pixels wide, **When** it is resized, **Then** all
   copy and controls remain visible and usable, and the squiggle stays beneath "better".
3. **Given** a visitor reaches the footer, **When** Email, LinkedIn, or GitHub is activated,
   **Then** the email action or correct profile destination in FR-010 opens.
4. **Given** keyboard navigation, **When** the visitor moves through the controls, **Then**
   theme switching, each work card, and each social link have visible focus and meaningful names.
5. **Given** a touch device without hover, **When** a card is tapped, **Then** its destination
   opens directly without requiring an initial tap to reveal a hover state.

---

### User Story 3 - Choose Day or Evening (Priority: P2)

As a visitor, I want to switch between the warm Day and Evening appearances and retain my choice
so the page suits my reading preference.

**Why this priority**: Both desktop themes are explicitly designed, and the switch gives visitors
control while preserving the same content and layout.

**Independent Test**: Switch the theme twice, reload after an explicit selection, and compare
both appearances with their desktop references. Repeat at mobile width.

**Acceptance Scenarios**:

1. **Given** Day mode, **When** the theme control is activated, **Then** Evening colors and the
   sun icon appear across the page without changing content, scroll position, or layout.
2. **Given** Evening mode, **When** the theme control is activated, **Then** Day colors and the
   moon icon appear, and its accessible name identifies the mode that activation will select.
3. **Given** an explicit theme choice, **When** the visitor reloads or returns in the same
   browser where preferences can be saved, **Then** that choice is restored.
4. **Given** no saved choice, **When** the visitor first opens the page, **Then** their device's
   light or dark appearance selects Day or Evening respectively; Day is the fallback.
5. **Given** mobile width, **When** Evening is selected, **Then** the mobile composition remains
   unchanged while the corresponding Evening palette is applied.

---

### User Story 4 - Experience the Handcrafted Details (Priority: P3)

As a visitor, I want subtle texture and organic motion that convey curiosity and personality
without distracting from reading or preventing interaction.

**Why this priority**: These details are explicitly annotated in the design and support its
identity, while the content and links remain independently useful.

**Independent Test**: Observe the portrait and ochre shape over 22 seconds, inspect the page's
paper texture and card hover, then repeat with a reduced-motion preference.

**Acceptance Scenarios**:

1. **Given** ordinary motion preferences, **When** the page is observed, **Then** the portrait
   outline changes shape on a 10-second ease-in-out loop, while the ochre shape completes an
   orbit every 22 seconds at a constant pace and changes shape on a 7-second loop.
2. **Given** either theme, **When** the visitor reads and interacts, **Then** a subtle paper-grain
   texture covers the page without obscuring text or intercepting actions.
3. **Given** a hovered card, **When** its highlight appears, **Then** the card lifts 4 pixels,
   rotates −0.3 degrees over 0.35 seconds with easing, shows the accent title, sprig border,
   soft shadow, and northeast arrow specified by the Work card reference.
4. **Given** a reduced-motion preference, **When** the page is displayed or a card is highlighted,
   **Then** continuous shape/orbit motion and animated lift/rotation are suppressed while static
   decorations, clear highlights, content, and all actions remain available.

---

### Edge Cases

- If saved preferences cannot be read or written, theme switching still works for the visit.
- If the device appearance cannot be determined, the initial theme is Day.
- If fonts or artwork fail to load, text remains readable, links retain their names, and controls
  retain their purpose; decorative failures do not block the page.
- At 200% text enlargement or with longer future copy, content wraps without overlap or clipping;
  cards grow as needed and the footer remains reachable.
- Hover, keyboard focus, and theme changes do not reflow the work list or hide descriptions/badges.
- Reduced-motion visitors receive a complete static composition and equivalent interaction cues.
- If an external destination is unavailable, the homepage remains usable; it does not promise
  that an external company or profile is online.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The website MUST provide the single public homepage shown on the Figma Home canvas:
  introduction, work list, and social footer. It MUST preserve their order and the centered,
  narrow desktop composition, adapting to the supplied mobile composition.
- **FR-002**: The introduction MUST use the supplied portrait, ochre shape behind it, two-line
  name with an italic accent-colored surname, and the exact biography in Story 1. The squiggle
  MUST stay attached visually to "better" as the biography wraps.
- **FR-003**: The work list MUST contain the following content without rewriting it:

  | Order | Title | Description | Badge |
  | --- | --- | --- | --- |
  | 1 | KOHO | Staff Software Engineer, working out how everyday banking could feel simpler. | None |
  | 2 | alugaTI | Rethinking how companies get their tech: rent it, keep it current, and get support built in. | None |
  | 3 | Front In Vale | A front-end conference in Brazil's Vale do Paraíba, sharing how the web works and how to build it better. | 3k+ people impacted |

- **FR-004**: Each card MUST use its supplied project logo and distinct asymmetric corners:
  KOHO has the smaller top-right corner, alugaTI the smaller bottom-left corner, and Front In
  Vale the smaller bottom-right corner. The impact badge MUST wrap below its title when needed.
- **FR-005**: Each entire card MUST act as a single link: KOHO to `https://www.koho.ca/`, alugaTI
  to `https://alugati.com`, and Front In Vale to `https://frontinvale.com.br`. Project links MUST
  open in a new tab so the personal homepage remains available.
- **FR-006**: Hovered cards MUST match the supplied Work card Hover state, including 4-pixel
  lift, accent title, sprig border, shadow, northeast arrow, and the annotated −0.3-degree
  rotation over 0.35 seconds. Highlighting MUST preserve surrounding layout and all card copy.
  Keyboard focus MUST provide the same static visual cues with a visible focus indicator.
- **FR-007**: A circular theme control in the top-right of the content column MUST switch all
  page surfaces, text, borders, accent artwork, and icons between Day and Evening. The control
  MUST show a moon in Day and a sun in Evening and name the target theme accessibly.
- **FR-008**: The initial theme MUST use a saved explicit choice, otherwise the device appearance,
  otherwise Day. An explicit choice MUST persist between visits when preference saving is available.
- **FR-009**: Mobile Evening MUST use the Mobile — Day layout and Desktop — Evening palette.
  Both themes MUST support widths from 320 to 1440 pixels without horizontal scrolling,
  overlapping content, or inaccessible controls.
- **FR-010**: The footer MUST include the supplied wavy divider and centered Email, LinkedIn,
  and GitHub icons in that order. Destinations MUST be `mailto:hi@silviorodrigues.dev`,
  `https://www.linkedin.com/in/silviorrr/`, and `https://github.com/silviorodrigues` respectively.
  Profile links MUST open in a new tab; Email MUST initiate composition to the specified address.
- **FR-011**: Theme and social controls MUST retain at least 44-by-44-pixel activation areas.
  All interactive controls MUST be keyboard operable, have visible focus, and expose meaningful
  names. The portrait MUST have a meaningful text alternative; purely decorative artwork MUST
  not add redundant reading-order content.
- **FR-012**: The page MUST reproduce the design's typography: Fraunces for the name and card
  titles, Instrument Sans for biography and descriptions, and IBM Plex Mono for the badge.
  Reference sizes are 96 pixels for the desktop name, 54 for the mobile name, 19 for biography,
  24 for titles, 15 for descriptions, and 12 for the badge.
- **FR-013**: At the reference widths, the page MUST reproduce the supplied composition:
  a 760-pixel desktop column with 24-pixel inner margins at 1280 pixels wide, and 24-pixel
  page margins at 390 pixels wide. The portrait is 112 pixels square; project logos are about
  36 pixels wide. Intermediate widths MUST preserve the hierarchy while allowing content to wrap.
- **FR-014**: Day MUST use the supplied warm paper, ink, muted text, card, line, and accent colors
  (`#f2ede3`, `#231f1c`, `#5a534c`, `#f8f4ec`, `#ddd3c4`, `#9c4a2a`). Evening MUST use the
  corresponding colors (`#17140f`, `#efe8dc`, `#b7aea2`, `#1f1b16`, `#352e26`, `#e0987a`).
  Remaining artwork and interaction colors MUST follow the referenced Figma components.
- **FR-015**: A fixed, full-page paper-grain appearance MUST use the annotated 22% opacity,
  with the darkening effect specified for Day and the soft-light effect specified for Evening.
  Texture MUST neither block controls nor reduce text legibility.
- **FR-016**: The portrait outline MUST morph on the annotated 10-second ease-in-out loop;
  the ochre shape MUST orbit every 22 seconds at constant pace and morph every 7 seconds.
  These decorations MUST stay in the portrait area and never move surrounding content.
- **FR-017**: Reduced-motion preferences MUST disable continuous decorative motion and animated
  card movement. All content, static artwork, navigation, and static interaction cues MUST remain.
- **FR-018**: Text and controls MUST remain legible in both themes, with text contrast of at
  least 4.5:1 for ordinary text and 3:1 for large text. Content MUST remain usable at 200%
  text enlargement. If exact decorative styling conflicts with readability, preserve usability
  and record the smallest necessary deviation during design review.
- **FR-019**: The delivered homepage MUST remain usable when preference saving, a font, or an
  individual artwork resource is unavailable, as described in Edge Cases.
- **FR-020**: At launch, the homepage MUST fully support the latest two stable versions of
  desktop Chrome, Edge, Firefox, and Safari, plus mobile Safari on iOS and Chrome on Android.
  Full support includes the specified layout, navigation, theme behavior, texture, motion,
  and accessibility features applicable to each device. The supported version baseline MUST
  be recorded at the start of acceptance review.

### Key Entities *(include if feature involves data)*

- **Personal introduction**: Silvio's name, biography, portrait, and associated decorative artwork.
- **Work item**: Ordered project title, exact description, logo, destination, corner treatment,
  and optional impact badge.
- **Social destination**: Channel name, icon, destination, and email or external-navigation action.
- **Appearance preference**: Day or Evening selection, with an explicit visitor choice taking
  precedence over the device appearance.
- **Design reference**: Named Figma frames, Work card states, logos, and motion/texture annotations
  that define the intended visitor experience.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Design review at 1280 pixels in Day and Evening and at 390 pixels in Day confirms
  all reference content, artwork, colors, typography, order, asymmetric corners, and major
  spacing relationships; there are no unexplained visible departures from the three frames.
- **SC-002**: At 320, 390, 768, 1280, and 1440 pixels in both themes, 100% of homepage content
  and controls remain reachable without horizontal scrolling or overlap. Text enlargement to
  200% preserves access to every item and action.
- **SC-003**: All six outbound actions (three work cards and three social links) reach the
  specified destinations through their intended actions, and all seven controls including the
  theme switch can be reached and activated using only a keyboard.
- **SC-004**: Theme switching changes the complete page appearance within 0.5 seconds without
  changing scroll position or layout. Reloading restores an explicit choice when saving is
  available; a fresh visit follows the specified initial-theme rules.
- **SC-005**: A 22-second observation confirms the specified 10-second portrait morph,
  22-second orbit, and 7-second ochre morph. Card hover confirms 4-pixel lift and −0.3-degree
  rotation without shifting neighboring cards. Reduced-motion review confirms no continuous
  decorative motion or animated card movement.
- **SC-006**: Every text style passes its stated contrast target in both themes, every theme
  and social control meets the 44-pixel activation-area requirement, and every control has a
  meaningful accessible name and visible keyboard focus.
- **SC-007**: In a walkthrough at desktop and mobile sizes, the project owner confirms that the
  page expresses his identity and curiosity and accepts every recorded visual deviation.
- **SC-008**: Acceptance review confirms that all applicable homepage scenarios pass in every
  browser/version covered by FR-020, with no unresolved failures in layout, navigation, theme
  switching, texture, motion, or accessibility. The review records the tested browser versions.

## Assumptions

- Scope is the Home canvas linked by the user, inspected on 2026-10-12, comprising Desktop — Day
  (`8:5`, 1280 × 1203), Desktop — Evening (`8:101`, 1280 × 1203), Mobile — Day
  (`8:140`, 390 × 1306), Work card (`7:42`), logos (`7:4`, `7:6`, `7:11`), and
  "Notes: not built in Figma" (`8:236`). These are the authoritative design dependencies.
- Only a mobile Day frame is supplied. Applying Evening colors to that layout is the default;
  there is no separate mobile Evening composition.
- Project links, preference persistence, initial device-theme selection, keyboard-focus behavior,
  and reduced-motion behavior are reasonable defaults where the design supplies no full
  interaction specification. The moon/sun icons indicate the theme available after activation.
- alugaTI, Front In Vale, and the three social destinations carry forward values in the previous
  site's Git history. KOHO's public homepage is the assumed destination for the new KOHO card.
- Reference frame heights describe the sample content composition, not a fixed page height that
  would clip text on other viewports or when text is enlarged.
- The supplied portrait, logos, decorative artwork, and fonts are required design dependencies;
  planning must obtain durable usable assets from the design rather than rely on expiring exports.
- This specification covers the visitor experience. Technology selection and implementation
  details belong to planning, guided by the constitution's preference for simplicity.
- Blog/feed pages, newsletter signup, search, accounts, an editing dashboard, analytics, and
  deployment changes are outside this design's scope. Previously deleted application files are
  not treated as features that must be restored by this specification.
- The exploration is the new paper-like visual identity, paired Day/Evening appearances, and
  organic decoration. Work should remain small and reversible; validation is focused on the
  supplied page, its links, accessibility, and motion rather than adding unrelated process.

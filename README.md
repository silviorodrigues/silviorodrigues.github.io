# Handoff: Silvio Rodrigues — Personal Website Revamp

## Overview
Single-page revamp of silviorodrigues.dev, replacing the current multi-page Next.js site (/, /about, /projects, /tools) with one scrolling page: hero, a filterable Writing/Projects feed, and a newsletter signup. Adds a simple git-based blog. The Tools page is dropped.

## About the Design Files
The bundled `Personal-Website.dc.html` is a **design reference built in HTML** — it shows the intended look, content and interaction behavior. It is not production code to copy verbatim. Implement it in the stack below, using that stack's own conventions (components, routing, data fetching) rather than porting the inline-styled markup as-is.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final. Build pixel-accurate to this reference; the "Design Tokens" section below has the exact values.

## Recommended stack
- **Framework/SSG: Next.js (App Router), static export** (`output: 'export'` in `next.config.js`). This is the repo's existing stack (see `silviorodrigues/silviorodrigues.github.io` on GitHub) — reusing it avoids a rewrite and it's the most heavily-documented framework for an AI coding agent to work in.
- **Styling:** Tailwind, matching the existing `globals.css` tokens (see below).
- **Blog content:** MDX files under `content/posts/*.mdx` (frontmatter: `title`, `date`, `tag`, `excerpt`, `readMins`). Parse with `gray-matter` + render with `next-mdx-remote` or `@next/mdx`. No CMS.
- **Newsletter: Resend.** Resend's API key must stay server-side, and GitHub Pages only serves static files — so add one small serverless endpoint outside the static bundle: a **Cloudflare Worker** (single `worker.js`, deployed via `wrangler`) that receives the form POST and calls Resend's contacts/audience API. The static site's subscribe form POSTs to that Worker's URL. This keeps the main site fully static while giving the form a real backend.
- **Deploy:** GitHub Pages for the static export (GitHub Actions workflow: build → `actions/deploy-pages`), Worker deployed separately via `wrangler deploy`.

## Screens / Views

### 1. Header (sticky)
- Sticky top, `backdrop-filter: blur(10px)`, background `rgba(23,23,23,.82)`, bottom border `1px solid #262626`.
- Left: home icon (SVG, `currentColor`), links to `#top`.
- Right: nav links `Writing` (`#work`), `Contact` (`#subscribe`). Pill hover state: `background:#262626; color:#fafafa`, `border-radius:8px`.

### 2. Hero (`#top`)
- 84×84 circular avatar (`public/images/profile-picture.png`), 2px border `#262626`.
- H1 "Silvio Rodrigues" — gradient text (see Design Tokens), `clamp(34px,6vw,52px)`.
- Role line, bold 18px, white: "Staff Software Engineer @ KOHO" (KOHO links to koho.ca).
- Muted 16px line: "part-time builder, writing about design systems, front-end and AI 🧪".
- CTA row: solid pill "Say hi 👋" (`mailto:hi@silviorodrigues.dev`), LinkedIn icon link, GitHub icon link.

### 3. Writing & Projects feed (`#work`)
- Gradient H2 "Writing & projects 🧪".
- Filter chip row: All / Writing / Projects. Active chip: solid `#fafafa` bg, `#171717` text. Inactive: transparent bg, `1px solid #333`, `#a3a3a3` text. Toggling filters which cluster(s) below are shown.
- **Writing cluster:** one card per MDX post, sorted newest first. Card: tag pill (`color:#6dd5ed`, bg `rgba(109,213,237,.12)`), date + read time (muted, 12px), title (bold 17px), excerpt (14.5px, `#a3a3a3`), "Read post →" (`#6dd5ed`). Clicking opens the post detail view.
- **Projects cluster:** 2 static cards (alugaTI, Front In Vale) — logo SVG, name, description, external link "Visit site →"; Front In Vale also shows a "3k+ people impacted" pill badge.

### 4. Subscribe (`#subscribe`)
- Gradient H2 "Subscribe 📬" + one-line description.
- Email input + "Subscribe" button, POSTs to the Resend Worker endpoint.
- On success: swap the form for a confirmation message ("You're in! Thanks for subscribing 🎉"). On error: show an inline error state (not in the HTML reference — add one).

### 5. Post detail (opened from a Writing card)
- Full-viewport overlay (in the HTML reference) — **in the real build, make this its own route**, e.g. `/blog/[slug]`, statically generated from the MDX files.
- "← Back" button, tag + date/read-time row, gradient H1 title, MDX body content.
- Footer block: "Want to talk more about it?" line + solid "Email me →" pill (`mailto:hi@silviorodrigues.dev?subject=Re:%20<post title>`), and the same Subscribe form repeated below it.

### Footer (all pages)
- Centered icon row: mail (mailto), LinkedIn, GitHub — same icons as header/hero.
- "© 2026 Silvio Rodrigues", 12.5px, `#525252`.

## Interactions & Behavior
- Filter chips: client-side state, no navigation.
- Writing card click → navigate to post route (or, if kept single-page, open an overlay).
- Subscribe form: `fetch(WORKER_URL, { method:'POST', body: JSON.stringify({ email }) })` → on 2xx show success state; on failure show error copy under the input.
- All external links (`koho.ca`, LinkedIn, GitHub, project URLs) open in a new tab.
- No scroll-spy / active-nav-highlight in the reference — fine to add if desired, not required.

## State Management
- `filter`: `'all' | 'writing' | 'projects'` — local UI state, not persisted.
- Subscribe form: `email`, `status: 'idle' | 'submitting' | 'success' | 'error'`.
- Post detail: server-rendered per MDX slug at build time — no client state needed if it's a real route.

## Design Tokens
- **Background:** `#171717` (page), `#1c1c1c` (cards), border `#262626` / hover `#404040`.
- **Text:** primary `#fafafa`, secondary `#e5e5e5`, muted `#a3a3a3`, faint `#737373` / `#525252`.
- **Accent:** `#6dd5ed` (links, tag pills, "read more"); gradient text uses `linear-gradient(to right, #2193b0 20%, #6dd5ed 40%, #6dd5ed 60%, #2193b0 80%)`, `background-size:200% auto`, clipped to text, animated via `@keyframes shine { to { background-position: 200% center } }` over 3s linear infinite.
- **Font:** Raleway (400/500/600/700/800), Google Fonts.
- **Radius:** cards/inputs `10–12px`, pills `999px`, avatar `50%`.
- **Selection color:** `#2193b0` bg / `#fafafa` text.

## Assets
- Profile photo: `public/images/profile-picture.png` (already in the repo).
- Project logos: inline SVGs, `currentColor`/`#6dd5ed` fill — copy the path data straight from `src/data/projects.ts` in the current repo.
- Icons (home, mail, LinkedIn, GitHub): inline SVGs, already in `src/components/header.tsx` / `footer.tsx` in the current repo — reuse as-is.

## Files
- `Personal-Website.dc.html` — full design reference (all screens/states as one HTML file with mock interactivity).

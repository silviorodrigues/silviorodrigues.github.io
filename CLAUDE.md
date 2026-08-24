@AGENTS.md

## Project-specific notes

- Stack: Next.js 16 (App Router), React 19, Tailwind 3, static export (`output: 'export'` in `next.config.js`, `images.unoptimized: true` since the default Image Optimization loader isn't supported with static export).
- `next lint` was removed in Next.js 16. Lint runs via `eslint .` (see `lint` script in package.json), configured by `eslint.config.mjs` (flat config), which imports `eslint-config-next/core-web-vitals` directly — ESLint 9 is required as a peer of `eslint-config-next@16`.
- Design tokens (colors, radii, gradient/shine animation, selection color) live in `tailwind.config.ts` (theme.extend) and `src/app/globals.css` (`.linear-wipe` gradient-text utility + `@keyframes shine`). Reuse `.linear-wipe` for any gradient headings.
- Raleway is loaded via `next/font/google` in `src/app/layout.tsx` (variable `--font-raleway`), not a `<link>` tag — do not add a Google Fonts `<link>` when reusing markup from `Personal-Website.dc.html`.
- Reference for old site conventions (deleted in commit `5eb8899`): `git show b5e4821:<path>`, e.g. `src/components/header.tsx`, `src/components/footer.tsx`, `src/data/projects.ts` for SVG icon/logo paths.
- `Personal-Website.dc.html` is missing some structural elements present in `README.md`/`scripts/ralph/prd.json` (e.g. it has no sticky `<header>` at all). Where the two diverge, README.md/prd.json win — the .dc.html file is a pixel/copy reference for content that IS present in it, not a complete structural spec.
- Icon-link hover pattern used throughout the design (hero social icons, footer icons, header nav pills): resting `color:#a3a3a3` (`text-text-muted`), hover `color:#fafafa;background:#262626;border-radius:8px`. Reuse this for any new icon/pill link.
- Frontmatter dates: YAML parses an unquoted `2026-08-18` into a JS `Date`, not a string. `src/lib/posts.ts` normalizes every post's `date` to `YYYY-MM-DD` via `toFrontmatter()` before it leaves the module — add any new date-ish frontmatter field there too, or `formatPostDate` renders "Invalid Date".
- MDX post bodies render through `next-mdx-remote/rsc` (`<MDXRemote source={...} components={mdxComponents} />`) in the server component at `src/app/blog/[slug]/page.tsx`; `@next/mdx` is deliberately NOT installed (posts live outside `app/`, and gray-matter already strips frontmatter). Prose styling for the body lives in `src/components/mdx-components.tsx` — edit that map, not the MDX files.
- Header nav uses root-relative hashes (`/#top`, `/#work`, `/#subscribe`) via `next/link` so it works from `/blog/[slug]` too; `@next/next/no-html-link-for-pages` fails lint on a plain `<a href="/#...">`.

@AGENTS.md

## Project-specific notes

- Stack: Next.js 16 (App Router), React 19, Tailwind 3, static export (`output: 'export'` in `next.config.js`, `images.unoptimized: true` since the default Image Optimization loader isn't supported with static export).
- `next lint` was removed in Next.js 16. Lint runs via `eslint .` (see `lint` script in package.json), configured by `eslint.config.mjs` (flat config), which imports `eslint-config-next/core-web-vitals` directly — ESLint 9 is required as a peer of `eslint-config-next@16`.
- Design tokens (colors, radii, gradient/shine animation, selection color) live in `tailwind.config.ts` (theme.extend) and `src/app/globals.css` (`.linear-wipe` gradient-text utility + `@keyframes shine`). Reuse `.linear-wipe` for any gradient headings.
- Raleway is loaded via `next/font/google` in `src/app/layout.tsx` (variable `--font-raleway`), not a `<link>` tag — do not add a Google Fonts `<link>` when reusing markup from `Personal-Website.dc.html`.
- Reference for old site conventions (deleted in commit `5eb8899`): `git show b5e4821:<path>`, e.g. `src/components/header.tsx`, `src/components/footer.tsx`, `src/data/projects.ts` for SVG icon/logo paths.

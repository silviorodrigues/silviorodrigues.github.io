# Subscribe Worker

Cloudflare Worker backing the newsletter form on [silviorodrigues.dev](https://silviorodrigues.dev).

The site is a static export hosted on GitHub Pages, so it can't hold the Resend
API key. This Worker is the one piece of server-side code: it accepts
`POST { "email": "..." }` from the subscribe form and adds the address to a
Resend audience.

It lives outside the Next.js app on purpose — `next build` never sees it, and it
is deployed separately (the GitHub Pages workflow does **not** deploy it).

## Endpoint

`POST /` with `Content-Type: application/json` and body `{ "email": "you@example.com" }`.

| Response | Meaning |
| --- | --- |
| `200 { ok: true }` | Contact created in the Resend audience |
| `400` | Missing/invalid JSON body or invalid email |
| `403` | Request `Origin` is not in `ALLOWED_ORIGINS` |
| `405` | Method other than `POST`/`OPTIONS` |
| `500` | Worker is missing `RESEND_API_KEY` / `RESEND_AUDIENCE_ID` |
| `502` | Resend rejected the request or was unreachable |

`OPTIONS` is handled for CORS preflight. `Access-Control-Allow-Origin` is echoed
back only for origins listed in `ALLOWED_ORIGINS`.

## Configuration

| Name | Kind | Set via | Purpose |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | secret | `wrangler secret put RESEND_API_KEY` | Resend API key. **Never** commit it or put it in `wrangler.toml`. |
| `RESEND_AUDIENCE_ID` | var | `[vars]` in `wrangler.toml` | Audience new contacts are added to (Resend dashboard → Audiences). |
| `ALLOWED_ORIGINS` | var | `[vars]` in `wrangler.toml` | Comma-separated list of origins allowed to call the Worker. Add `http://localhost:3000` while developing. |

## Deploy

```sh
npm install -g wrangler        # or: npx wrangler ...
wrangler login

# One-time: store the Resend key as an encrypted secret
wrangler secret put RESEND_API_KEY

# Edit RESEND_AUDIENCE_ID (and ALLOWED_ORIGINS) in wrangler.toml first
wrangler deploy
```

`wrangler deploy` prints the Worker URL (e.g.
`https://silviorodrigues-subscribe.<subdomain>.workers.dev`). Put that URL in the
site's build environment as `NEXT_PUBLIC_SUBSCRIBE_WORKER_URL` (see
`.env.example` at the repo root) — Next inlines `NEXT_PUBLIC_*` values at build
time, so it must be present when the static export is built, not at runtime.

## Local development

```sh
wrangler dev
```

Then point the site at it, e.g. `NEXT_PUBLIC_SUBSCRIBE_WORKER_URL=http://localhost:8787`
in `.env.local`, and add `http://localhost:3000` to `ALLOWED_ORIGINS`.

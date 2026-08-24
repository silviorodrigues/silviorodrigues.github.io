/**
 * Subscribe endpoint for silviorodrigues.dev.
 *
 * The site is a static export on GitHub Pages, so the newsletter form needs a
 * tiny backend to hold the Resend API key. This Worker takes the form's
 * `POST { email }`, validates it, and adds the address to a Resend audience.
 *
 * Environment (see README.md in this directory):
 *   RESEND_API_KEY     secret  — Resend API key (never hardcode it)
 *   RESEND_AUDIENCE_ID var     — id of the Resend audience to add contacts to
 *   ALLOWED_ORIGINS     var     — comma-separated list of allowed site origins
 */

const DEFAULT_ALLOWED_ORIGINS = 'https://silviorodrigues.dev'

// Deliberately loose: real validation is Resend's job, this only rejects
// obvious junk before spending an API call on it.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin')
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }

  if (origin && allowedOrigins(env).includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }

  return headers
}

function json(body, status, request, env) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request, env),
    },
  })
}

async function subscribe(email, env) {
  const response = await fetch(
    `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  )

  return response
}

const handler = {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) })
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, request, env)
    }

    const origin = request.headers.get('Origin')
    if (origin && !allowedOrigins(env).includes(origin)) {
      return json({ error: 'Origin not allowed' }, 403, request, env)
    }

    if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
      return json({ error: 'Subscription is not configured' }, 500, request, env)
    }

    let payload
    try {
      payload = await request.json()
    } catch {
      return json({ error: 'Invalid JSON body' }, 400, request, env)
    }

    const email = typeof payload?.email === 'string' ? payload.email.trim() : ''
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return json({ error: 'Please provide a valid email address' }, 400, request, env)
    }

    let response
    try {
      response = await subscribe(email, env)
    } catch {
      return json({ error: 'Could not reach the mail provider' }, 502, request, env)
    }

    if (!response.ok) {
      // Don't leak Resend's response body back to the browser; log it instead.
      console.error('Resend contact create failed', response.status, await response.text())
      return json({ error: 'Could not subscribe right now' }, 502, request, env)
    }

    return json({ ok: true }, 200, request, env)
  },
}

export default handler

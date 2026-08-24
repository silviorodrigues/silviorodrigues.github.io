'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Set in .env.local / the deploy environment — see .env.example.
// Inlined at build time by Next, so it must be a literal property access.
const WORKER_URL = process.env.NEXT_PUBLIC_SUBSCRIBE_WORKER_URL

export default function Subscribe({ asSection = true }: { asSection?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')

    try {
      if (!WORKER_URL) {
        throw new Error('NEXT_PUBLIC_SUBSCRIBE_WORKER_URL is not configured')
      }

      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error(`Subscribe request failed with status ${response.status}`)
      }

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const content = (
    <>
      <h2 className="linear-wipe m-0 mb-2.5 text-[28px] font-extrabold">Subscribe 📬</h2>
      <p className="m-0 mb-[18px] text-[15.5px] leading-[1.6] text-text-muted">
        New posts on design systems, front-end and AI, straight to your inbox. No spam, unsubscribe
        anytime.
      </p>

      {status === 'success' ? (
        <div className="rounded-input border border-accent/30 bg-accent/10 px-[18px] py-3.5 text-[14.5px] font-semibold text-[#8fe3f7]">
          You&apos;re in! Thanks for subscribing 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2.5">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Email address"
            aria-invalid={status === 'error'}
            className="min-w-[200px] flex-1 rounded-input border border-[#333] bg-card px-3.5 py-3 font-sans text-[14.5px] text-text-primary outline-none transition-colors placeholder:text-text-faint focus:border-accent"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="cursor-pointer rounded-input bg-text-primary px-5 py-3 text-[14.5px] font-bold text-bg transition-colors hover:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>

          {status === 'error' && (
            <p role="alert" className="m-0 w-full text-[13.5px] text-[#f8a5a5]">
              Something went wrong. Please try again, or email{' '}
              <a href="mailto:hi@silviorodrigues.dev" className="text-accent underline">
                hi@silviorodrigues.dev
              </a>
              .
            </p>
          )}
        </form>
      )}
    </>
  )

  if (!asSection) {
    return <div>{content}</div>
  }

  return (
    <section id="subscribe" className="scroll-mt-[70px] border-t border-border py-10">
      {content}
    </section>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Subscribe from '@/components/subscribe'
import { mdxComponents } from '@/components/mdx-components'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatPostDate } from '@/lib/format-date'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} — Silvio Rodrigues`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-6 pb-24 pt-8">
        <Link
          href="/"
          className="inline-block rounded-pill border border-[#333] px-3.5 py-2 text-[13.5px] font-semibold text-text-muted transition-colors hover:border-text-faintest hover:text-text-primary"
        >
          ← Back
        </Link>

        <article className="mt-7">
          <div className="mb-3.5 flex items-center gap-2.5">
            <span className="rounded-pill bg-accent/[.12] px-[9px] py-[3px] text-[11px] font-bold tracking-[.03em] text-accent">
              {post.tag}
            </span>
            <span className="text-[12.5px] text-text-faint">
              {formatPostDate(post.date)} · {post.readMins} min read
            </span>
          </div>

          <h1 className="linear-wipe m-0 mb-7 text-[clamp(28px,5vw,40px)] font-extrabold leading-[1.15]">
            {post.title}
          </h1>

          <div className="flex flex-col gap-[18px]">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        <div className="mt-12 flex flex-col gap-8 border-t border-border pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="m-0 text-[15.5px] text-text-muted">Want to talk more about it?</p>
            <a
              href={`mailto:hi@silviorodrigues.dev?subject=Re:%20${encodeURIComponent(post.title)}`}
              className="rounded-pill bg-text-primary px-[18px] py-2.5 text-sm font-bold text-bg transition-colors hover:bg-text-secondary"
            >
              Email me →
            </a>
          </div>

          <Subscribe asSection={false} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

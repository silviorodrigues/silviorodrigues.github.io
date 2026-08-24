'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'
import type { Post } from '@/lib/posts'
import { formatPostDate } from '@/lib/format-date'

type Filter = 'all' | 'writing' | 'projects'

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'writing', label: 'Writing' },
  { key: 'projects', label: 'Projects' },
]

export default function WorkSection({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const showWriting = filter === 'all' || filter === 'writing'
  const showProjects = filter === 'all' || filter === 'projects'

  return (
    <section id="work" className="scroll-mt-[70px] border-t border-border py-10">
      <h2 className="linear-wipe m-0 mb-[18px] text-[28px] font-extrabold">Writing &amp; projects 🧪</h2>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={
              filter === key
                ? 'rounded-pill border border-text-primary bg-text-primary px-4 py-2 text-[13.5px] font-semibold text-bg'
                : 'rounded-pill border border-[#333] bg-transparent px-4 py-2 text-[13.5px] font-semibold text-text-muted'
            }
          >
            {label}
          </button>
        ))}
      </div>

      {showWriting && (
        <div className={`flex flex-col gap-3 ${showProjects ? 'mb-6' : ''}`}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-2 rounded-card border border-border bg-card px-5 py-[18px] transition-colors hover:border-border-hover"
            >
              <div className="flex items-center gap-2.5">
                <span className="rounded-pill bg-accent/[.12] px-[9px] py-[3px] text-[11px] font-bold tracking-[.03em] text-accent">
                  {post.tag}
                </span>
                <span className="text-xs text-text-faint">
                  {formatPostDate(post.date)} · {post.readMins} min read
                </span>
              </div>
              <p className="m-0 text-[17px] font-bold text-text-primary">{post.title}</p>
              <p className="m-0 text-[14.5px] leading-[1.55] text-text-muted">{post.excerpt}</p>
              <span className="text-[13px] font-semibold text-accent">Read post →</span>
            </Link>
          ))}
        </div>
      )}

      {showProjects && (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3.5 rounded-card border border-border bg-card px-5 py-[18px] transition-colors hover:border-border-hover"
            >
              <span className="mt-0.5 shrink-0 text-accent">{project.logo}</span>
              <div className="flex flex-col gap-1.5">
                <p className="m-0 text-base font-bold text-text-primary">{project.name}</p>
                <p className="m-0 text-[14.5px] leading-[1.55] text-text-muted">{project.description}</p>
                {project.highlight && (
                  <span className="w-fit rounded-pill bg-accent px-[9px] py-[3px] text-[11px] font-bold text-bg">
                    {project.highlight}
                  </span>
                )}
                <span className="text-[13px] font-semibold text-accent">Visit site →</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

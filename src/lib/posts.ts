import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

/**
 * YAML parses an unquoted `2026-08-18` into a `Date`, so frontmatter dates come
 * back as Date objects rather than strings. Normalize to `YYYY-MM-DD`.
 */
function toDateString(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value)
}

function toFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return { ...(data as PostFrontmatter), date: toDateString(data.date) }
}

export type PostFrontmatter = {
  title: string
  date: string
  tag: string
  excerpt: string
  readMins: number
}

export type Post = PostFrontmatter & {
  slug: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.mdx'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const source = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
    const { data } = matter(source)
    return { slug, ...toFrontmatter(data) }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export type PostWithContent = Post & {
  content: string
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (!filePath.startsWith(POSTS_DIR) || !fs.existsSync(filePath)) {
    return null
  }

  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  return { slug, ...toFrontmatter(data), content }
}

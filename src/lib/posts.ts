import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

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
    return { slug, ...(data as PostFrontmatter) }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

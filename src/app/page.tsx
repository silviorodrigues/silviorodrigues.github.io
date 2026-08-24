import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import WorkSection from '@/components/work-section'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-6">
        <Hero />
        <WorkSection posts={posts} />
      </main>
      <Footer />
    </div>
  )
}

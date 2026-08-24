import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-6">
        <h1 id="top" className="linear-wipe py-24 text-[clamp(34px,6vw,52px)] font-extrabold">
          Silvio Rodrigues
        </h1>
      </main>
      <Footer />
    </div>
  )
}

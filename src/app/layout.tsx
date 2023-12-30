import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Silvio Rodrigues',
    default: 'Silvio Rodrigues',
  },
  description: 'Senior Front End developer, beginner maker.',
  openGraph: {
    images: 'https://www.silviorodrigues.dev/images/social.jpg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={raleway.className}>
      <body className="bg-neutral-900 text-neutral-50 flex flex-col min-h-svh">
        <Header/>
        <main className="container mx-auto p-8 flex-1 flex">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}

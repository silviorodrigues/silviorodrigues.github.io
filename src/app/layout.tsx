import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Raleway } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/footer'
import Header from '@/components/header'
import type { Metadata } from 'next'

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
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer/>
      </body>
    </html>
  )
}

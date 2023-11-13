import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Silvio Rodrigues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={raleway.className}>
      <body>
        <Header/>
        {children}
      </body>
    </html>
  )
}

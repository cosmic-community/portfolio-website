import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio | Web Developer',
  description: 'Professional web developer portfolio showcasing projects, skills, and experience',
  keywords: 'web developer, portfolio, React, Next.js, TypeScript, frontend, backend',
  authors: [{ name: 'Portfolio Owner' }],
  openGraph: {
    title: 'Portfolio | Web Developer',
    description: 'Professional web developer portfolio showcasing projects, skills, and experience',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
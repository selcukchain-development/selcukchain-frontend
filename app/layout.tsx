"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import Loading from './loading'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith('/dashboard')

  
  return (
    <html lang="en" className={inter.className}>
      <Suspense fallback={<Loading />} >
      <body className={isDashboard ? "" : "flex flex-col min-h-screen bg-background text-foreground"}>
        {!isDashboard && <Navbar />}
        {children}
        {!isDashboard && <Footer />}
      </body>
      </Suspense>
    </html>
  )
}

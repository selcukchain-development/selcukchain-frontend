// app/page.tsx veya pages/index.tsx
"use client"

import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { Events } from "@/components/home/Events"
import { Stats } from "@/components/home/Stats"
import { Resources } from "@/components/home/Resources"
import { Gallery } from '@/components/home/Gallery'

export default function HomePage() {
  return (
    <main className="flex-1 font-sans"> {/* Add font-sans class here */}
      <Hero />
      <Features />

      <Events />
      <Stats />

      <Resources />
      <Gallery />

    </main>
  )
}

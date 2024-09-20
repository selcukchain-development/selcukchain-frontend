"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const AnimatedText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(intervalId)
      }
    }, delay)

    return () => clearInterval(intervalId)
  }, [text, delay])

  return <span>{displayedText}</span>
}

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image 
        src="/selcukk.jpeg"
        alt="SelcukChain Topluluğu"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      
      <div className="relative z-20 text-center px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          <AnimatedText text="SelcukChain Topluluğu" delay={100} />
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
          <AnimatedText text="Blockchain tutkunlarının buluşma noktası" delay={50} />
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            Topluluğa Katıl
          </Button>
          <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
            Etkinliklerimiz
          </Button>
        </div>
      </div>
    </section>
  )
}
